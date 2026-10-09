import assert from "node:assert/strict";
import { test } from "node:test";
import { effectScope, nextTick, ref } from "vue";
import { useSampleViewer } from "../src/composables/sampleViewer";
import type { SampleFile } from "../src/types/benchmark";

// 仅用于交互生命周期的合成夹具，不作为站点正式样例发布。
function fixture(benchmarkId: string): SampleFile {
  return {
    benchmarkId,
    retrievedAt: "2026-09-24",
    samples: ["first", "second"].map((id) => ({
      id,
      title: id,
      type: "text",
      prompt: "Question",
      answer: "Answer",
      options: ["A", "B"],
      explanation: "Explanation",
      raw: "Question",
      source: "https://example.com",
      license: "Test fixture",
      split: "test",
      excerpt: false,
      assets: [
        { kind: "image", path: `${id}.png`, alt: id, width: 100, height: 80 },
      ],
    })),
  };
}

async function settle() {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
}

test("sample viewer preserves interaction across modes and resets when selecting another task", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    Response.json(fixture("selected")),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const viewer = scope.run(() =>
    useSampleViewer(
      () => "selected",
      () => true,
      "/",
    ),
  )!;
  await settle();
  viewer.selectedOption.value = 1;
  viewer.showAnswer.value = true;
  viewer.markAssetFailed("first.png");
  viewer.markAssetFailed("first.png");
  viewer.markAssetFailed("unrelated.png");
  viewer.mode.value = "raw";
  await nextTick();
  viewer.mode.value = "read";
  assert.deepEqual([...viewer.failedAssets.value], ["first.png"]);
  assert.equal(viewer.selectedOption.value, 1);
  assert.equal(viewer.showAnswer.value, true);
  viewer.mode.value = "raw";
  viewer.index.value = 1;
  assert.equal(viewer.current.value?.id, "second");
  assert.equal(viewer.mode.value, "read");
  assert.equal(viewer.selectedOption.value, null);
  assert.equal(viewer.showAnswer.value, false);
  assert.deepEqual([...viewer.failedAssets.value], []);
  viewer.markAssetFailed("first.png");
  assert.deepEqual([...viewer.failedAssets.value], []);
});

test("sample viewer resets on retry and benchmark changes, and never loads before enabled", async (t) => {
  let requests = 0;
  const id = ref("selected");
  const enabled = ref(false);
  t.mock.method(globalThis, "fetch", async () => {
    requests++;
    return Response.json(fixture(id.value));
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const viewer = scope.run(() =>
    useSampleViewer(
      () => id.value,
      () => enabled.value,
      "/",
    ),
  )!;
  assert.equal(requests, 0);
  enabled.value = true;
  await settle();
  viewer.index.value = 1;
  viewer.markAssetFailed("second.png");
  viewer.showAnswer.value = true;
  viewer.selectedOption.value = 1;
  viewer.mode.value = "raw";
  viewer.reload();
  await settle();
  assert.equal(requests, 2);
  assert.equal(viewer.index.value, 0);
  assert.equal(viewer.mode.value, "read");
  assert.equal(viewer.showAnswer.value, false);
  assert.equal(viewer.selectedOption.value, null);
  assert.deepEqual([...viewer.failedAssets.value], []);
  viewer.index.value = 1;
  viewer.mode.value = "raw";
  id.value = "another";
  await settle();
  assert.equal(viewer.data.value?.benchmarkId, "another");
  assert.equal(viewer.index.value, 0);
  assert.equal(viewer.mode.value, "read");
  enabled.value = false;
  await nextTick();
  assert.deepEqual(viewer.current.value, undefined);
  assert.equal(requests, 3);
});

test("sample viewer exposes malformed sample data and recovers after retry", async (t) => {
  let requests = 0;
  t.mock.method(console, "error", () => undefined);
  t.mock.method(globalThis, "fetch", async () => {
    requests++;
    return Response.json(
      requests === 1
        ? { benchmarkId: "selected", samples: [{}] }
        : fixture("selected"),
    );
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const viewer = scope.run(() =>
    useSampleViewer(
      () => "selected",
      () => true,
      "/",
    ),
  )!;
  await settle();
  assert.equal(viewer.error.value, true);
  assert.equal(viewer.current.value === undefined, true);
  viewer.reload();
  await settle();
  assert.equal(viewer.error.value, false);
  const currentId = viewer.current.value?.id;
  assert.equal(currentId, "first");
});
