import assert from "node:assert/strict";
import { test } from "node:test";
import { effectScope, nextTick } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { useSampleViewer } from "../src/composables/sampleViewer";
import { createSampleLocation } from "../src/lib/sampleLocation";
import type { SampleFile } from "../src/types/benchmark";

test("指定题目/原始模式在延迟加载、连续操作和历史返回时保持 URL 一致", async (t) => {
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
});
