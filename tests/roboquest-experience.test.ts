import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { effectScope, nextTick } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  findRoboQuestCase,
  isUnknownRoboQuestSample,
  roboQuestCases,
} from "../src/content/roboQuestExperience";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import { useSampleViewer } from "../src/composables/sampleViewer";
import type { SampleFile } from "../src/types/benchmark";
const source = JSON.parse(
  await readFile(
    new URL("../content/benchmarks/roboquest.json", import.meta.url),
    "utf8",
  ),
);
const fixture: SampleFile = { benchmarkId: "roboquest", ...source.sampleSet };

test("RoboQuest 四份独立材料均有对应体验，不混淆未知编号", () => {
  assert.deepEqual(
    roboQuestCases.map((x) => x.sampleId).sort(),
    fixture.samples.map((x) => x.id).sort(),
  );
  assert.deepEqual(
    roboQuestCases.map((x) => x.kind),
    ["demo", "observation", "result", "search"],
  );
  assert.equal(findRoboQuestCase(undefined)?.sampleId, fixture.samples[0]?.id);
  for (const id of ["unknown", [fixture.samples[0]?.id], 1]) {
    assert.equal(findRoboQuestCase(id), undefined);
    assert.equal(
      isUnknownRoboQuestSample("roboquest", id, fixture.samples),
      true,
    );
    assert.equal(
      isUnknownRoboQuestSample("swe-bench-verified", id, fixture.samples),
      false,
    );
  }
  for (const id of [undefined, null, ""])
    assert.equal(
      isUnknownRoboQuestSample("roboquest", id, fixture.samples),
      false,
    );
  assert.equal(isUnknownRoboQuestSample("roboquest", "unknown"), false);
  assert.equal(
    isUnknownRoboQuestSample(
      "roboquest",
      "unknown",
      fixture.samples,
      "/guide/",
    ),
    false,
  );
  assert.equal(fixture.samples[0]?.assets?.[0]?.kind, "video");
  assert.equal(
    fixture.samples[1]?.assets?.filter((x) => x.kind === "image").length,
    3,
  );
  assert.equal(fixture.samples[2]?.assets, undefined);
  assert.equal(fixture.samples[3]?.assets, undefined);
});

test("RoboQuest 上下四题双向共享 URL，刷新恢复并保留其他查询参数", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(fixture));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/roboquest/", component: { template: "<div />" } },
    ],
  });
  await router.push({
    path: "/benchmarks/roboquest/",
    query: {
      sample: fixture.samples[2]!.id,
      sampleView: "raw",
      from: "catalog",
    },
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const { viewer, location } = scope.run(() => {
    const viewer = useSampleViewer(
      () => "roboquest",
      () => true,
      "/",
    );
    return { viewer, location: createSampleLocation(router, viewer) };
  })!;
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
  assert.equal(viewer.current.value?.id, fixture.samples[2]!.id);
  assert.equal(viewer.mode.value, "raw");
  for (const [index, sample] of fixture.samples.entries()) {
    await selectSampleFromWalkthrough(router, sample.id);
    await nextTick();
    assert.equal(viewer.current.value?.id, sample.id);
    assert.equal(viewer.mode.value, "read");
    assert.equal(router.currentRoute.value.hash, "");
    await location.selectSample((index + 1) % fixture.samples.length);
    await nextTick();
    assert.equal(
      findRoboQuestCase(router.currentRoute.value.query.sample)?.sampleId,
      viewer.current.value?.id,
    );
    assert.equal(router.currentRoute.value.hash, "#samples");
    assert.equal(router.currentRoute.value.query.from, "catalog");
  }
  await router.push({
    path: "/benchmarks/roboquest/",
    query: { sample: "unknown" },
  });
  await nextTick();
  assert.equal(
    findRoboQuestCase(router.currentRoute.value.query.sample),
    undefined,
  );
  assert.equal(
    isUnknownRoboQuestSample(
      "roboquest",
      router.currentRoute.value.query.sample,
      viewer.data.value?.samples,
    ),
    true,
  );
});

test("RoboQuest 媒体重试不写入 URL，切换原始模式与任务不串题", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(fixture));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/roboquest/", component: { template: "<div />" } },
    ],
  });
  await router.push({
    path: "/benchmarks/roboquest/",
    query: { from: "catalog" },
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const { viewer, location } = scope.run(() => {
    const viewer = useSampleViewer(
      () => "roboquest",
      () => true,
      "/",
    );
    return { viewer, location: createSampleLocation(router, viewer) };
  })!;
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
  for (const index of [0, 1, 0]) {
    await location.selectSample(index);
    await nextTick();
    const asset = viewer.current.value!.assets![0]!;
    assert.deepEqual([...viewer.failedAssets.value], []);
    viewer.markAssetFailed(asset.path);
    await location.setMode("raw");
    await nextTick();
    await location.setMode("read");
    await nextTick();
    assert.deepEqual([...viewer.failedAssets.value], [asset.path]);
    const url = router.currentRoute.value.fullPath;
    for (let attempt = 0; attempt < 2; attempt++) {
      viewer.retryMedia();
      await nextTick();
      assert.deepEqual([...viewer.failedAssets.value], []);
      assert.equal(router.currentRoute.value.fullPath, url);
      assert.equal(viewer.current.value!.id, fixture.samples[index]!.id);
      viewer.markAssetFailed(asset.path);
      assert.deepEqual([...viewer.failedAssets.value], [asset.path]);
    }
  }
});

test("Search Room 明确区分本站收录范围和官方说明，并保留原始来源", async () => {
  const pilot = await readFile(
    new URL("../src/components/RoboQuestPilot.vue", import.meta.url),
    "utf8",
  );
  const { searchConcepts } = await import("../src/content/roboQuestExperience");
  assert.match(pilot, /本站该条记录仅保存任务名称「Search\s+Room」/);
  assert.match(
    pilot,
    /href="https:\/\/declare-lab\.github\.io\/RoboQuest\/tasks\.html"/,
  );
  assert.match(pilot, /:href="sample.source"/);
  assert.match(searchConcepts[1].text, /本站该条记录未收录逐步动作或轨迹/);
  assert.match(searchConcepts[2].text, /本站该条记录仅保存任务名称/);
  assert.doesNotMatch(
    pilot + searchConcepts.map((x) => x.text).join(""),
    /这份资料只有官方任务名称|没有可公开的逐步动作/,
  );
  const viewer = await readFile(
    new URL("../src/components/SampleViewer.vue", import.meta.url),
    "utf8",
  );
  assert.match(pilot, /重新加载上方媒体/);
  assert.match(pilot, /与下方原始记录的媒体独立加载/);
  assert.match(viewer, /@click="retryMedia"/);
  assert.match(viewer, /重新加载本条记录媒体/);
});
