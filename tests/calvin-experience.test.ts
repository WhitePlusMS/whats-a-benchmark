import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import test from "node:test";
import { createSSRApp, computed, effectScope, nextTick, ref } from "vue";
import { renderToString } from "@vue/server-renderer";
import { parse, compileScript } from "@vue/compiler-sfc";
import ts from "typescript";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  calvinCases,
  calvinSteps,
  readCalvinRecord,
  findCalvinCase,
  isUnknownCalvinSample,
  calvinPrefixStatuses,
  calvinScore,
  calvinRoot,
  calvinEnvironmentRules,
  calvinNumber,
} from "../src/content/calvinExperience";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import { createDeferredDetailAnchor } from "../src/lib/deferredDetailAnchor";
import { useSampleLoader } from "../src/composables/sampleLoader";
import type { SampleFile } from "../src/types/benchmark";
const read = (p: string) =>
  readFile(new URL("../" + p, import.meta.url), "utf8");
const source = JSON.parse(await read("content/benchmarks/calvin.json"));
const fixture: SampleFile = { benchmarkId: "calvin", ...source.sampleSet };
const records = calvinCases.map(
  (c, i) => readCalvinRecord(fixture.samples[i].raw, c.kind)!,
);

test("CALVIN four real records retain raw values, licenses and historical verification", () => {
  const preservedHash = createHash("sha256")
    .update(
      JSON.stringify([
        source.sampleSet,
        source.verifiedAt,
        source.researchNotes,
        source.reusePolicy,
      ]),
    )
    .digest("hex");
  assert.equal(
    preservedHash,
    "fac5d99488496c047f0c0986c9e23e6211dc8f13dcad52176a881967a22f1f55",
  );
  assert.equal(source.reusePolicy.status, "unknown");
  assert.equal(records.length, 4);
  assert.ok(records.every(Boolean));
  assert.deepEqual(
    calvinCases.map((c) => c.sampleId),
    fixture.samples.map((s) => s.id),
  );
  assert.ok(fixture.samples.every((s) => !s.assets?.length));
});
test("CALVIN rejects missing/malformed records rather than fabricated substitutes", () => {
  for (const c of calvinCases) {
    for (const raw of [null, "bad", {}, [], { frames: [] }])
      assert.equal(readCalvinRecord(raw, c.kind), null);
  }
  const changed = JSON.parse(fixture.samples[0].raw as string);
  changed[1][0] = "other";
  assert.equal(readCalvinRecord(changed, "chain"), null);
  const pink = structuredClone(fixture.samples[1].raw) as any;
  pink.first_frame["state.ee_pos"] = [Infinity, 0, 0];
  assert.equal(readCalvinRecord(pink, "pink"), null);
  const door = structuredClone(fixture.samples[2].raw) as any;
  door.frames[1].frame_index = 31;
  assert.equal(readCalvinRecord(door, "door"), null);
  const frame = structuredClone(fixture.samples[3].raw) as any;
  frame.robot_obs.pop();
  assert.equal(readCalvinRecord(frame, "frame"), null);
});
test("CALVIN sequence and numeric schemas do not conflate independent records", () => {
  const [chain, pink, door, frame] = records;
  assert.equal(chain.kind, "chain");
  if (chain.kind === "chain") {
    assert.equal(chain.initial.grasped, 0);
    assert.equal(chain.initial.slider, "left");
    assert.deepEqual(
      chain.tasks,
      calvinSteps.map((s) => s.key),
    );
  }
  assert.equal(pink.kind, "pink");
  if (pink.kind === "pink") {
    assert.equal(pink.length, 46);
    assert.equal(pink.fields["state.joints"].length, 7);
    assert.equal(pink.fields["action.delta_ee_pos"][0], -0.4978483319282532);
  }
  assert.equal(door.kind, "door");
  if (door.kind === "door") {
    assert.deepEqual(
      door.frames.map((f) => f.frame_index),
      [0, 32, 64],
    );
    assert.equal(door.frames[2].state[0], -0.17559468746185303);
    assert.equal(door.frames[2].actions[6], -1);
  }
  assert.equal(frame.kind, "frame");
  if (frame.kind === "frame")
    assert.deepEqual(
      Object.values(frame.fields).map((a) => a.length),
      [15, 24, 7, 7],
    );
  assert.equal(calvinNumber(0.0096104322001338), "0.00961");
});
test("CALVIN prefix failure stops later tasks; default is not a result", () => {
  assert.deepEqual(calvinPrefixStatuses(null), Array(5).fill("未设定"));
  assert.deepEqual(calvinPrefixStatuses(2), [
    "假设通过",
    "假设通过",
    "在此停止",
    "未执行",
    "未执行",
  ]);
  assert.deepEqual(calvinPrefixStatuses(0), [
    "在此停止",
    ...Array(4).fill("未执行"),
  ]);
  assert.deepEqual(calvinPrefixStatuses(5), Array(5).fill("假设通过"));
  for (const n of [-1, 6, 2.5, NaN])
    assert.deepEqual(calvinPrefixStatuses(n), Array(5).fill("未设定"));
});
test("CALVIN success@k uses cumulative chain counts, not independent task rates", () => {
  assert.deepEqual(calvinScore([0, 2, 5]), {
    mean: 7 / 3,
    counts: [2, 2, 1, 1, 1],
    total: 3,
  });
  assert.deepEqual(calvinScore([5, 5]), {
    mean: 5,
    counts: [2, 2, 2, 2, 2],
    total: 2,
  });
  assert.deepEqual(calvinScore([0]), {
    mean: 0,
    counts: [0, 0, 0, 0, 0],
    total: 1,
  });
  for (const values of [[], [-1], [6], [1.5], [NaN]])
    assert.equal(calvinScore(values), null);
});
test("CALVIN rules preserve strict rotation/slider/lift bounds and contact meaning", () => {
  assert.match(calvinSteps[0].rule, /−180° < z < −60°/);
  assert.match(calvinSteps[0].rule, /≤ 0.1/);
  assert.match(calvinSteps[1].rule, /不包括 −0.15/);
  assert.match(calvinSteps[2].rule, /> 0.03/);
  assert.match(calvinSteps[3].rule, /对象集合须总共只有一个/);
  assert.match(calvinSteps[3].rule, /不再接触机器人/);
  assert.doesNotMatch(calvinSteps[3].rule, /只接触.*plank/);
  assert.match(calvinSteps[3].warning, /不硬编码颜色/);
  assert.match(calvinSteps[4].rule, /从 1 变为 0/);
  assert.ok(calvinRoot.includes("fa03f01f19c65920e18cf37398a9ce859274af76"));
  assert.ok(
    calvinEnvironmentRules.includes("1431a46bd36bde5903fb6345e68b5ccc30def666"),
  );
});
test("CALVIN unknown ids are explicit and case selection shares URL/history/raw mode", async () => {
  assert.equal(findCalvinCase(undefined), calvinCases[0]);
  assert.equal(findCalvinCase("bad"), undefined);
  assert.equal(findCalvinCase(["x", "y"]), undefined);
  assert.equal(isUnknownCalvinSample("calvin", "bad", fixture.samples), true);
  assert.equal(
    isUnknownCalvinSample("calvin", "bad", fixture.samples, "/guide/"),
    false,
  );
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/calvin/", component: {} }],
  });
  await router.push("/benchmarks/calvin/?keep=1");
  await router.isReady();
  const data = ref(fixture),
    index = ref(0),
    mode = ref<"read" | "raw">("read"),
    scope = effectScope();
  const location = scope.run(() =>
    createSampleLocation(router, {
      data,
      index,
      mode,
      current: computed(() => data.value.samples[index.value]),
    }),
  )!;
  await selectSampleFromWalkthrough(router, calvinCases[2].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 2);
  await location.selectSample(1);
  await location.setMode("raw");
  await nextTick();
  assert.equal(mode.value, "raw");
  assert.equal(router.currentRoute.value.hash, "#samples");
  assert.equal(router.currentRoute.value.query.keep, "1");
  const fi = ref(-1),
    fm = ref<"read" | "raw">("read");
  scope.run(() =>
    createSampleLocation(router, {
      data,
      index: fi,
      mode: fm,
      current: computed(() => data.value.samples[fi.value]),
    }),
  );
  assert.equal(fi.value, 1);
  assert.equal(fm.value, "raw");
  await new Promise<void>((resolve) => {
    const stop = router.afterEach(() => {
      stop();
      resolve();
    });
    router.back();
  });
  await nextTick();
  assert.equal(index.value, 2);
  await router.push("/benchmarks/calvin/?sample=missing");
  await nextTick();
  assert.equal(index.value, -1);
  await router.push("/benchmarks/calvin/?sample=x&sample=y");
  await nextTick();
  assert.equal(index.value, -1);
  await selectSampleFromWalkthrough(router, calvinCases[0].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 0);
  scope.stop();
});
async function settle() {
  await new Promise<void>((r) => setImmediate(r));
  await nextTick();
}
test("CALVIN independent loaders recover after a real failed request", async (t) => {
  let fail = true;
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () =>
    fail ? new Response("", { status: 404 }) : Response.json(fixture),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const upper = scope.run(() =>
      useSampleLoader(
        () => "calvin",
        () => true,
        "/",
      ),
    )!,
    lower = scope.run(() =>
      useSampleLoader(
        () => "calvin",
        () => true,
        "/",
      ),
    )!;
  await settle();
  assert.equal(upper.error.value, true);
  assert.equal(lower.error.value, true);
  upper.reload();
  await settle();
  assert.equal(upper.error.value, true);
  fail = false;
  upper.reload();
  await settle();
  assert.deepEqual(upper.data.value, fixture);
  assert.equal(lower.error.value, true);
  lower.reload();
  await settle();
  assert.equal(lower.error.value, false);
});
test("CALVIN actual Vue workbench renders all records without media or pretend success", async () => {
  const filename = new URL(
    "../src/components/CalvinWorkbench.vue",
    import.meta.url,
  ).pathname;
  const { descriptor } = parse(
    await read("src/components/CalvinWorkbench.vue"),
    { filename },
  );
  let code = compileScript(descriptor, { id: "cv-test", inlineTemplate: true })
    .content.replace(
      /from ['"]vue['"]/g,
      `from ${JSON.stringify(import.meta.resolve("vue"))}`,
    )
    .replace(
      /from ['"]..\/content\/calvinExperience['"]/g,
      `from ${JSON.stringify(new URL("../src/content/calvinExperience.ts", import.meta.url).href)}`,
    );
  code = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  const component = (
    await import(
      "data:text/javascript;base64," + Buffer.from(code).toString("base64")
    )
  ).default;
  const html = await Promise.all(
    records.map((record) =>
      renderToString(createSSRApp(component, { record })),
    ),
  );
  assert.match(html[0], /尚未设定，没有成绩/);
  assert.match(html[0], /rotate_blue_block_right/);
  assert.match(html[0], /配置文件未记录实际模型 prompt/);
  assert.match(html[1], /不是加载失败/);
  assert.match(html[1], /-0.49785/);
  assert.match(html[2], /不是门的关节状态/);
  assert.match(html[2], /0.08048/);
  assert.match(html[3], /没有任务指令/);
  assert.match(html[3], /robot_obs/);
  html.forEach((h) => assert.doesNotMatch(h, /<video|<img|<canvas/));
});
test("CALVIN integration includes anchors, local state reset and accessible narrow layout", async () => {
  const [main, detail, viewer, card, pilot, bench, css] = await Promise.all(
    [
      "src/main.ts",
      "src/views/DetailView.vue",
      "src/components/SampleViewer.vue",
      "src/components/BenchmarkCard.vue",
      "src/components/CalvinPilot.vue",
      "src/components/CalvinWorkbench.vue",
      "src/styles/calvin-pilot.css",
    ].map(read),
  );
  assert.ok(main.includes('to.path === "/benchmarks/calvin/"'));
  assert.ok(detail.includes("<CalvinPilot"));
  assert.ok(viewer.includes("isUnknownCalvinSample"));
  assert.ok(card.includes("'calvin'].includes(item.id) ? '#task-walkthrough'"));
  assert.ok(
    pilot.includes('emit("settled")') || pilot.includes("emit('settled')"),
  );
  assert.match(pilot, /:key="entry.sampleId"/);
  assert.match(bench, /trials.value\s*=\s*\[\]/);
  assert.match(bench, /trials.length\s*>=\s*20/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(css, /overflow-x:\s*auto/);
  const a = createDeferredDetailAnchor();
  a.begin("/benchmarks/calvin/#score");
  let ready = false;
  const promise = a.wait("/benchmarks/calvin/#score").then((v) => (ready = v));
  a.settled("/benchmarks/calvin/#score", "pilot");
  await nextTick();
  assert.equal(ready, false);
  a.settled("/benchmarks/calvin/#score", "samples");
  await promise;
  assert.equal(ready, true);
});
