import assert from "node:assert/strict";
import { test } from "node:test";
import { effectScope, nextTick } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { useSampleViewer } from "../src/composables/sampleViewer";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import type { SampleFile } from "../src/types/benchmark";

test("样例在详情页同步 URL，在指南中只修改查看器状态", async (t) => {
  const fixture: SampleFile = {
    benchmarkId: "selected",
    retrievedAt: "2026-10-08",
    samples: ["first/id", "second:id"].map((id) => ({
      id,
      title: id,
      type: "text",
      prompt: "Question",
      answer: "Answer",
      explanation: "Explanation",
      raw: "Question",
      source: "https://example.org",
      license: "Test",
      split: "test",
      excerpt: false,
    })),
  };
  t.mock.method(globalThis, "fetch", async () => Response.json(fixture));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/selected/", component: { template: "<div />" } },
    ],
  });
  await router.push({
    path: "/benchmarks/selected/",
    query: { sample: "second:id", sampleView: "raw" },
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const { viewer, location } = scope.run(() => {
    const viewer = useSampleViewer(
      () => "selected",
      () => true,
      "/",
    );
    return { viewer, location: createSampleLocation(router, viewer) };
  })!;
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
  assert.equal(viewer.current.value?.id, "second:id");
  assert.equal(viewer.mode.value, "raw");
  viewer.showAnswer.value = true;
  // 模拟换题后立即切原始模式，后一次 replace 应保留刚选的题目。
  const select = location.selectSample(0);
  const mode = location.setMode("raw");
  await Promise.all([select, mode]);
  await nextTick();
  assert.equal(router.currentRoute.value.query.sample, "first/id");
  assert.equal(router.currentRoute.value.query.sampleView, "raw");
  assert.equal(viewer.showAnswer.value, false);
  await router.push({
    path: "/benchmarks/selected/",
    query: { sample: "unknown", sampleView: "invalid" },
  });
  await nextTick();
  assert.equal(viewer.current.value?.id, "first/id");
  assert.equal(viewer.mode.value, "read");
  router.back();
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
  assert.equal(viewer.mode.value, "raw");
  assert.equal(viewer.current.value?.id, "first/id");

  // 上方图解切题不跳转到原题区；下方查看器仍通过同一 URL 恢复题目。
  await router.replace({
    path: "/benchmarks/selected/",
    query: { sample: "first/id", sampleView: "raw", from: "reading" },
    hash: "#samples",
  });
  await selectSampleFromWalkthrough(router, "second:id");
  await nextTick();
  assert.equal(viewer.current.value?.id, "second:id");
  assert.equal(viewer.mode.value, "read");
  assert.equal(router.currentRoute.value.hash, "");
  assert.equal(router.currentRoute.value.query.from, "reading");
  assert.equal(router.currentRoute.value.query.sampleView, undefined);
  await location.selectSample(0);
  await nextTick();
  assert.equal(router.currentRoute.value.query.sample, "first/id");
  assert.equal(router.currentRoute.value.hash, "#samples");

  await t.test("嵌入指南后换题和切原始模式不改动页面地址或锚点", async () => {
    router.addRoute({ path: "/guide/", component: { template: "<div />" } });
    await router.push({
      path: "/guide/",
      query: { from: "reading" },
      hash: "#metrics",
    });
    const guideLocation = router.currentRoute.value.fullPath;
    await location.selectSample(1);
    await location.setMode("raw");
    await nextTick();
    assert.equal(viewer.current.value?.id, "second:id");
    assert.equal(viewer.mode.value, "raw");
    assert.equal(router.currentRoute.value.fullPath, guideLocation);
  });
});
