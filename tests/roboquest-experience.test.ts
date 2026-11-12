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
