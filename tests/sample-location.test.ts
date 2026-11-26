import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { effectScope, nextTick } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { useSampleViewer } from "../src/composables/sampleViewer";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import type { SampleFile } from "../src/types/benchmark";
import { entrySchema } from "../src/content/schema";

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
  router.back();
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(viewer.current.value?.id, "second:id");
  assert.equal(viewer.mode.value, "raw");
  router.forward();
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(viewer.current.value?.id, "first/id");
  assert.equal(viewer.mode.value, "raw");
  await router.push({
    path: "/benchmarks/selected/",
    query: { sample: "unknown", sampleView: "invalid" },
  });
  await nextTick();
  assert.equal(viewer.index.value, -1);
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
  router.back();
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(viewer.current.value?.id, "second:id");
  assert.equal(router.currentRoute.value.hash, "");

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

test("Hy-Nomas 与 τ-Voice 在无查询参数时直接展示有证据的任务内容，旧案例地址仍可打开", async (t) => {
  const fixtures = [
    {
      benchmarkId: "hy-nomas-bench",
      first: "hy-nomas-b3-0007",
      previous: "hy-nomas-b1-0001",
      summary: /W → A → W/,
      evidence: /官方交替控制视频.*另例/,
    },
    {
      benchmarkId: "tau-voice-2-0-aa",
      first: "tau-voice-2-en-telecom-mobile-data",
      previous: "tau-voice-2-en-retail-8",
      summary: /mobile data is not working/,
      evidence: /Sierra 同题.*非 AA/,
    },
  ];
  for (const fixture of fixtures) {
    await t.test(fixture.benchmarkId, async (subtest) => {
      const entry = entrySchema.parse(
        JSON.parse(
          readFileSync(
            `content/benchmarks/${fixture.benchmarkId}.json`,
            "utf8",
          ),
        ),
      );
      assert(entry.sampleSet);
      const route = `/benchmarks/${fixture.benchmarkId}/`;
      const router = createRouter({
        history: createMemoryHistory(),
        routes: [{ path: route, component: { template: "<div />" } }],
      });
      await router.push(route);
      subtest.mock.method(globalThis, "fetch", async () =>
        Response.json({
          benchmarkId: fixture.benchmarkId,
          ...entry.sampleSet,
        }),
      );
      const scope = effectScope();
      subtest.after(() => scope.stop());
      const viewer = scope.run(() => {
        const viewer = useSampleViewer(
          () => fixture.benchmarkId,
          () => true,
          "/",
        );
        createSampleLocation(router, viewer);
        return viewer;
      })!;
      await new Promise<void>((resolve) => setImmediate(resolve));
      await nextTick();
      assert.equal(viewer.mode.value, "read");
      assert.equal(viewer.current.value?.id, fixture.first);
      assert.match(
        viewer.current.value?.walkthrough?.summary ?? "",
        fixture.summary,
      );
      assert.match(
        viewer.current.value?.references?.[0]?.label ?? "",
        fixture.evidence,
      );
      assert(viewer.current.value!.walkthrough!.checks.length >= 2);
      assert.equal(router.currentRoute.value.fullPath, route);
      await router.push({
        path: route,
        query: { sample: fixture.previous, sampleView: "raw" },
      });
      await nextTick();
      assert.equal(viewer.current.value?.id, fixture.previous);
      assert.equal(viewer.mode.value, "raw");
    });
  }
});
