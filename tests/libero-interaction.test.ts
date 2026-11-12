import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { computed, effectScope, nextTick, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  findLiberoCase,
  isUnknownLiberoSample,
  liberoCases,
  liberoGoalSatisfied,
  readLiberoFrame,
} from "../src/content/liberoExperience";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import {
  createDeferredDetailAnchor,
  shouldWaitForDetailLayout,
} from "../src/lib/deferredDetailAnchor";
import { useSampleViewer } from "../src/composables/sampleViewer";
import type { SampleFile } from "../src/types/benchmark";
const read = (path: string) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");
const source = JSON.parse(await read("content/benchmarks/libero.json"));
const fixture: SampleFile = { benchmarkId: "libero", ...source.sampleSet };

test("LIBERO selection defaults, malformed IDs and records do not fabricate cases", () => {
  assert.deepEqual(
    liberoCases.map((c) => c.sampleId),
    fixture.samples.map((s) => s.id),
  );
  for (const id of [undefined, null, ""])
    assert.equal(findLiberoCase(id), liberoCases[0]);
  for (const id of [
    "unknown",
    [liberoCases[0].sampleId, liberoCases[1].sampleId],
    0,
  ]) {
    assert.equal(findLiberoCase(id), undefined);
    assert.equal(
      isUnknownLiberoSample(
        "libero",
        id,
        fixture.samples,
        "/benchmarks/libero/",
      ),
      true,
    );
  }
  assert.equal(isUnknownLiberoSample("libero", "unknown", undefined), false);
  assert.equal(
    isUnknownLiberoSample("gsm8k", "unknown", fixture.samples),
    false,
  );
  assert.equal(
    isUnknownLiberoSample("libero", "unknown", fixture.samples, "/guide/"),
    false,
  );
  const frame = readLiberoFrame(fixture.samples[0]!.raw)!;
  assert.equal(frame.state.length, 8);
  assert.equal(frame.action.length, 7);
  assert.equal(readLiberoFrame(fixture.samples[1]!.raw), null);
  for (const raw of [
    null,
    {},
    { first_frame: {} },
    {
      first_frame: {
        "observation.state": Array(8).fill(0),
        action: Array(7).fill(NaN),
      },
    },
    {
      first_frame: {
        "observation.state": Array(7).fill(0),
        action: Array(7).fill(0),
      },
    },
  ])
    assert.equal(readLiberoFrame(raw), null);
  assert.deepEqual(
    [
      [false, false],
      [true, false],
      [false, true],
      [true, true],
    ].map(([a, b]) => liberoGoalSatisfied(a!, b!)),
    [false, false, false, true],
  );
});

test("LIBERO upper/lower selection shares URL, reload state and Back/Forward", async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/libero/", component: {} }],
  });
  await router.push("/benchmarks/libero/?keep=yes");
  await router.isReady();
  const data = ref(fixture),
    index = ref(0),
    mode = ref<"read" | "raw">("read");
  const current = computed(() => data.value.samples[index.value]);
  const scope = effectScope();
  const location = scope.run(() =>
    createSampleLocation(router, { data, index, mode, current }),
  )!;
  assert.equal(current.value?.id, liberoCases[0].sampleId);
  await selectSampleFromWalkthrough(router, liberoCases[1].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 1);
  assert.equal(router.currentRoute.value.query.keep, "yes");
  assert.equal(router.currentRoute.value.hash, "");
  await location.selectSample(0);
  await nextTick();
  assert.equal(
    findLiberoCase(router.currentRoute.value.query.sample),
    liberoCases[0],
  );
  assert.equal(router.currentRoute.value.hash, "#samples");
  await location.setMode("raw");
  await nextTick();
  assert.equal(mode.value, "raw");
  async function go(delta: number) {
    await new Promise<void>((resolve) => {
      const stop = router.afterEach(() => {
        stop();
        resolve();
      });
      router.go(delta);
    });
    await nextTick();
  }
  await go(-1);
  assert.equal(index.value, 1);
  assert.equal(mode.value, "read");
  await go(1);
  assert.equal(index.value, 0);
  assert.equal(mode.value, "raw");
  // Reconstruct a fresh viewer at a shared URL, as on refresh.
  const reloadIndex = ref(-1),
    reloadMode = ref<"read" | "raw">("read");
  scope.run(() =>
    createSampleLocation(router, {
      data,
      index: reloadIndex,
      mode: reloadMode,
      current: computed(() => data.value.samples[reloadIndex.value]),
    }),
  );
  assert.equal(reloadIndex.value, 0);
  assert.equal(reloadMode.value, "raw");
  await router.push("/benchmarks/libero/?sample=unknown");
  await nextTick();
  assert.equal(index.value, -1);
  assert.equal(current.value, undefined);
  await router.push(
    `/benchmarks/libero/?sample=${liberoCases[0].sampleId}&sample=${liberoCases[1].sampleId}`,
  );
  await nextTick();
  assert.equal(index.value, -1);
  await selectSampleFromWalkthrough(router, liberoCases[1].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 1);
  assert.equal(mode.value, "read");
  scope.stop();
});

test("LIBERO lower media retry preserves selection/mode and case change clears failures", () => {
  const scope = effectScope();
  scope.run(() => {
    const viewer = useSampleViewer(
      () => "libero",
      () => false,
      "/",
    );
    viewer.data.value = fixture;
    const path = fixture.samples[0]!.assets![0]!.path;
    viewer.markAssetFailed(path);
    viewer.markAssetFailed(path);
    viewer.mode.value = "raw";
    assert.deepEqual([...viewer.failedAssets.value], [path]);
    viewer.retryMedia();
    assert.equal(viewer.failedAssets.value.length, 0);
    assert.equal(viewer.mode.value, "raw");
    assert.equal(viewer.index.value, 0);
    viewer.markAssetFailed(path);
    viewer.index.value = 1;
    assert.equal(viewer.failedAssets.value.length, 0);
    viewer.markAssetFailed(path);
    assert.equal(viewer.failedAssets.value.length, 0);
  });
  scope.stop();
});

test("LIBERO upper/lower media has explicit independent retries and square reservations", async () => {
  const [pilot, viewer, media, css] = await Promise.all([
    read("src/components/LiberoPilot.vue"),
    read("src/components/SampleViewer.vue"),
    read("src/components/SampleMedia.vue"),
    read("src/styles/libero-pilot.css"),
  ]);
  assert.match(
    pilot,
    /function retryMedia\(\)\s*\{\s*failed.value = \[\];\s*retry.value\+\+;/,
  );
  assert.ok(pilot.includes(':key="`${media.path}:${retry}`"'));
  assert.match(pilot, /function retryMedia\(\)[\s\S]*?\}/);
  const retryBody = pilot.match(/function retryMedia\(\)\s*\{([^}]+)\}/)![1]!;
  assert.ok(!/panel|observation|select|reload/.test(retryBody));
  assert.ok(pilot.includes("独立"));
  assert.ok(viewer.includes("item.id === 'libero'"));
  assert.ok(viewer.includes("此处与上方任务图解的媒体独立加载，请分别重试"));
  assert.ok(viewer.includes('@click="retryMedia"'));
  assert.match(css, /\.libero-screen\s*\{[^}]*aspect-ratio: 1/s);
  assert.ok(media.includes("videos/libero-episode0-reconstructed.mp4"));
  assert.ok(media.includes("aspectRatio"));
});

test("LIBERO deferred layout waits for both settled sections, cancels stale navigation", async () => {
  for (const suffix of ["#samples", "#score", ""]) {
    const key = "/benchmarks/libero/?sample=libero-dataset-episode-0" + suffix;
    const anchor = createDeferredDetailAnchor();
    anchor.begin(key);
    assert.equal(shouldWaitForDetailLayout(true, !!suffix, !suffix), true);
    let done = false;
    const waiting = anchor.wait(key).then((v) => (done = v));
    anchor.settled(key, "pilot");
    await Promise.resolve();
    assert.equal(done, false);
    anchor.settled(key, "samples");
    await waiting;
    assert.equal(done, true);
    anchor.begin(key);
    const token = anchor.token(key);
    const canceled = anchor.wait(key);
    anchor.begin(key + "new");
    assert.equal(await canceled, false);
    anchor.settled(key, "pilot");
    anchor.settled(key, "samples");
    assert.equal(anchor.matches(key), false);
    assert.notEqual(anchor.token(key + "new"), token);
    anchor.cancel();
  }
  assert.equal(shouldWaitForDetailLayout(false, true, false), false);
  const [main, detail, pilot, viewer] = await Promise.all([
    read("src/main.ts"),
    read("src/views/DetailView.vue"),
    read("src/components/LiberoPilot.vue"),
    read("src/components/SampleViewer.vue"),
  ]);
  assert.match(
    main,
    /to.path === "\/benchmarks\/libero\/" && to.path !== from.path/,
  );
  assert.ok(detail.includes("LiberoPilot"));
  assert.ok(pilot.includes('emit("settled")'));
  assert.ok(viewer.includes('emit("settled")'));
  assert.ok(pilot.includes("loaded || err"));
  assert.ok(viewer.includes("loaded || failed"));
});

test("LIBERO explicit retry bypasses failed video caches without changing local evidence paths or other media", async () => {
  const { liberoMediaUrl, nextLiberoMediaRetryToken, isCurrentMediaEvent } =
    await import("../src/lib/liberoMediaRetry");
  const path = "videos/libero-episode0-reconstructed.mp4";
  assert.equal(liberoMediaUrl("/", path), "/" + path);
  const first = nextLiberoMediaRetryToken(),
    second = nextLiberoMediaRetryToken();
  assert.notEqual(first, second);
  assert.notEqual(
    liberoMediaUrl("/", path, first),
    liberoMediaUrl("/", path, second),
  );
  assert.equal(
    new URL(liberoMediaUrl("/", path, first), "https://example.test").pathname,
    "/" + path,
  );
  assert.equal(
    liberoMediaUrl("/", "videos/other.mp4", first),
    "/videos/other.mp4",
  );
  assert.match(
    liberoMediaUrl("/", "images/libero-episode0-first.png", first),
    /libero_retry=/,
  );
  assert.equal(
    isCurrentMediaEvent({ target: { isConnected: false } } as unknown as Event),
    false,
  );
  assert.equal(
    isCurrentMediaEvent({ target: { isConnected: true } } as unknown as Event),
    true,
  );
  const pilot = await read("src/components/LiberoPilot.vue"),
    viewer = await read("src/components/SampleViewer.vue"),
    media = await read("src/components/SampleMedia.vue");
  assert.ok(pilot.includes("liberoMediaUrl(base, media.path, retryToken)"));
  assert.ok(pilot.includes("retryToken.value = nextLiberoMediaRetryToken()"));
  assert.ok(
    viewer.includes("mediaRetryToken.value = nextLiberoMediaRetryToken()"),
  );
  assert.ok(media.includes("liberoMediaUrl(baseUrl, path, props.retryToken)"));
  assert.ok(media.includes("isCurrentMediaEvent(event)"));
  assert.ok(pilot.includes("isCurrentMediaEvent(event)"));
});
