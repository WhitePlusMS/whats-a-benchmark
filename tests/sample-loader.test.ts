import assert from "node:assert/strict";
import { test } from "node:test";
import { effectScope, nextTick, ref } from "vue";
import { useSampleLoader } from "../src/composables/sampleLoader";
import type { SampleFile } from "../src/types/benchmark";

function sampleFile(benchmarkId: string): SampleFile {
  return {
    benchmarkId,
    retrievedAt: "2026-09-24",
    samples: [
      {
        id: "example",
        title: "Example",
        type: "text",
        prompt: "Question",
        explanation: "Explanation",
        raw: "Question",
        source: "https://example.com",
        license: "Example license",
        split: "test",
        excerpt: false,
      },
    ],
  };
}

function pendingResponse() {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function settle() {
  // fetch 与 response.json 各有一次异步边界，最后等待 Vue 的 watcher 队列。
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
}

test("sample loading waits for mount, cancels changes, and rejects stale responses", async (t) => {
  const requests: {
    url: string;
    signal: AbortSignal;
    response: ReturnType<typeof pendingResponse>;
  }[] = [];
  t.mock.method(globalThis, "fetch", (url: string, init: RequestInit) => {
    const response = pendingResponse();
    requests.push({ url, signal: init.signal as AbortSignal, response });
    return response.promise;
  });
  const id = ref("first");
  const mounted = ref(false);
  const scope = effectScope();
  t.after(() => scope.stop());
  const loader = scope.run(() =>
    useSampleLoader(
      () => id.value,
      () => mounted.value,
      "/base/",
    ),
  )!;
  assert.equal(requests.length, 0);
  mounted.value = true;
  await nextTick();
  assert.equal(requests[0]!.url, "/base/samples/first.json");
  id.value = "second";
  await nextTick();
  assert.equal(requests[0]!.signal.aborted, true);
  requests[1]!.response.resolve(Response.json(sampleFile("second")));
  await settle();
  assert.equal(loader.data.value?.benchmarkId, "second");
  // 模拟无法真正终止的旧请求，其较晚响应也不得覆盖当前页面。
  requests[0]!.response.resolve(Response.json(sampleFile("first")));
  await settle();
  assert.equal(loader.data.value?.benchmarkId, "second");
  assert.equal(loader.error.value, false);
  loader.reload();
  await nextTick();
  assert.equal(loader.data.value, null);
  scope.stop();
  assert.equal(requests[2]!.signal.aborted, true);
});

test("sample loading exposes malformed responses and retries cleanly", async (t) => {
  const failures: unknown[][] = [];
  t.mock.method(console, "error", (...args: unknown[]) => failures.push(args));
  let count = 0;
  t.mock.method(globalThis, "fetch", async () => {
    count++;
    return Response.json(
      count === 1 ? sampleFile("wrong-id") : sampleFile("selected"),
    );
  });
  const enabled = ref(true);
  const scope = effectScope();
  t.after(() => scope.stop());
  const loader = scope.run(() =>
    useSampleLoader(
      () => "selected",
      () => enabled.value,
      "/",
    ),
  )!;
  await settle();
  assert.equal(loader.error.value, true);
  assert.equal(loader.data.value === null, true);
  assert.equal(failures.length, 1);
  loader.reload();
  await settle();
  assert.equal(loader.error.value, false);
  assert.deepEqual(loader.data.value, sampleFile("selected"));
  enabled.value = false;
  await nextTick();
  assert.equal(loader.data.value, null);
  assert.equal(count, 2);
});

test("sample loading rejects malformed entries and retries successfully", async (t) => {
  t.mock.method(console, "error", () => undefined);
  let count = 0;
  t.mock.method(globalThis, "fetch", async () => {
    count++;
    return Response.json(
      count === 1
        ? { benchmarkId: "selected", samples: [{}] }
        : sampleFile("selected"),
    );
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const loader = scope.run(() =>
    useSampleLoader(
      () => "selected",
      () => true,
      "/",
    ),
  )!;
  await settle();
  assert.equal(loader.error.value, true);
  // 仅断言当前值，避免 TypeScript 将重试后的可变 ref 也收窄成 null。
  assert.equal(loader.data.value === null, true);
  loader.reload();
  await settle();
  assert.equal(loader.error.value, false);
  const loadedId = loader.data.value?.samples[0]?.id;
  assert.equal(loadedId, "example");
});

test("sample loading rejects empty required text and unsafe optional containers", async (t) => {
  t.mock.method(console, "error", () => undefined);
  const sample = sampleFile("selected").samples[0]!;
  const pair = { input: [[0]], output: [[0]] };
  const invalid = [
    { benchmarkId: "selected", samples: [{ ...sample, title: " " }] },
    { benchmarkId: "selected", samples: [{ ...sample, assets: [{}] }] },
    {
      benchmarkId: "selected",
      samples: [{ ...sample, gridTask: { train: [null], test: [pair] } }],
    },
  ];
  let index = 0;
  t.mock.method(globalThis, "fetch", async () =>
    Response.json(invalid[index++] ?? sampleFile("selected")),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const loader = scope.run(() =>
    useSampleLoader(
      () => "selected",
      () => true,
      "/",
    ),
  )!;

  for (let current = 0; current < invalid.length; current++) {
    if (current) loader.reload();
    await settle();
    assert.equal(loader.error.value, true);
    assert.equal(loader.data.value === null, true);
  }
  loader.reload();
  await settle();
  assert.equal(loader.error.value, false);
  const loadedId = loader.data.value?.samples[0]?.id;
  assert.equal(loadedId, "example");
});
