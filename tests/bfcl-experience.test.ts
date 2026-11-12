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
  bfclCases,
  bfclAnnotations,
  bfclSource,
  readBfclRecord,
  findBfclCase,
  isUnknownBfclSample,
  inspectBfclValue,
  inspectBfcl,
  bfclExample,
  bfclPreview,
  normalizeBfclString,
} from "../src/content/bfclExperience";
import { useBfclWorkbench } from "../src/composables/bfclWorkbench";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import { createDeferredDetailAnchor } from "../src/lib/deferredDetailAnchor";
import { useSampleLoader } from "../src/composables/sampleLoader";
import type { SampleFile } from "../src/types/benchmark";
const read = (p: string) =>
  readFile(new URL("../" + p, import.meta.url), "utf8");
const source = JSON.parse(await read("content/benchmarks/bfcl.json"));
const fixture: SampleFile = { benchmarkId: "bfcl", ...source.sampleSet };
const records = fixture.samples.map((s) => readBfclRecord(s.raw)!);
test("BFCL preserves five original tasks and historical evidence while separating new answers", () => {
  const preserved = [
    source.sampleSet.samples.map((s: any) => [s.id, s.raw]),
    source.verifiedAt,
    source.sampleSet.retrievedAt,
    source.researchNotes,
  ];
  assert.equal(
    createHash("sha256").update(JSON.stringify(preserved)).digest("hex"),
    "6aa08e650aa3cd3f045541b88882b396e09fb51351c9b3fe4eccd7a7d113033a",
  );
  assert.deepEqual(
    bfclCases.map((c) => c.sampleId),
    records.map((r) => r.id),
  );
  assert.ok(records.every(Boolean));
  assert.ok(fixture.samples.every((s) => !(s.raw as any).ground_truth));
  assert.match(source.limitations[2].text, /simple_python 与 multiple/);
  assert.match(source.metric.description, /Non-live 10%/);
  assert.ok(
    !source.sampleAccess.sourceUrls.some((u: string) => u.includes("L990")),
  );
});
test("BFCL quotes exact official annotations separately from function return values", () => {
  assert.deepEqual(bfclAnnotations, [
    {
      id: "simple_python_0",
      ground_truth: [
        {
          calculate_triangle_area: {
            base: [10],
            height: [5],
            unit: ["units", ""],
          },
        },
      ],
    },
    {
      id: "simple_python_1",
      ground_truth: [{ "math.factorial": { number: [5] } }],
    },
    {
      id: "multiple_2",
      ground_truth: [{ "country_info.capital": { country: ["Brazil"] } }],
    },
    {
      id: "multiple_3",
      ground_truth: [
        {
          "EuclideanDistance.calculate": {
            pointA: [[3, 4]],
            pointB: [[1, 2]],
            rounding: ["", 0],
          },
        },
      ],
    },
    {
      id: "multiple_4",
      ground_truth: [
        {
          "kinematics.calculate_displacement": {
            initial_speed: [20],
            acceleration: [10],
            time: [5],
            rounding: ["", 2],
          },
        },
      ],
    },
  ]);
  for (const c of bfclCases) {
    assert.ok(bfclSource(c, true).includes("possible_answer/"));
    assert.ok(bfclSource(c).endsWith("#L" + c.line));
    assert.ok(
      bfclSource(c).includes("6ea57973c7a6097fd7c5915698c54c17c5b1b6c8"),
    );
  }
});
test("BFCL rejects missing or malformed task schemas instead of substituting another case", () => {
  for (const raw of [null, {}, [], { id: "wrong" }, "x"])
    assert.equal(readBfclRecord(raw), null);
  const bad = structuredClone(records[0]);
  bad.function[0].parameters.required = ["missing"];
  assert.equal(readBfclRecord(bad), null);
  assert.equal(findBfclCase(undefined), bfclCases[0]);
  assert.equal(findBfclCase("unknown"), undefined);
});
test("BFCL distinguishes JSON integer lexemes, booleans, safe precision and input limits", () => {
  const p = { type: "integer", description: "" };
  for (const input of ["5", " -5 ", "0", "-0"])
    assert.equal(inspectBfclValue(input, p).status, "pass");
  for (const input of ["5.0", "5e0", "true", '"5"', "null", "[5]", "05", "+5"])
    assert.equal(inspectBfclValue(input, p).status, "fail");
  assert.equal(inspectBfclValue("", p).status, "waiting");
  assert.equal(inspectBfclValue("9007199254740992", p).status, "unknown");
  assert.equal(inspectBfclValue("1".repeat(501), p).status, "unknown");
  assert.equal(
    inspectBfclValue("5", { type: "float", description: "" }).status,
    "pass",
  );
});
test("BFCL array checks retain integer lexemes, nesting boundary and coordinate order", () => {
  const p = { type: "array", description: "", items: { type: "integer" } };
  assert.equal(inspectBfclValue("[3,4]", p).status, "pass");
  for (const v of ["[3.0,4]", "[3e0,4]", "[true,4]", "[[3],4]", '["3",4]'])
    assert.equal(inspectBfclValue(v, p).status, "fail");
  const r = records[3],
    f = "EuclideanDistance.calculate";
  assert.equal(
    inspectBfcl(r, f, { pointA: "[3,4]", pointB: "[1,2]" }, {}).status,
    "pass",
  );
  assert.equal(
    inspectBfcl(r, f, { pointA: "[1,2]", pointB: "[3,4]" }, {}).status,
    "fail",
  );
  assert.equal(
    inspectBfcl(r, f, { pointA: "[4,3]", pointB: "[1,2]" }, {}).status,
    "fail",
  );
});
test("BFCL optional omission is not an empty integer value", () => {
  const r = records[3],
    f = "EuclideanDistance.calculate",
    args = { pointA: "[3,4]", pointB: "[1,2]" };
  for (const rounding of ["0"])
    assert.equal(
      inspectBfcl(r, f, { ...args, rounding }, { rounding: true }).status,
      "pass",
    );
  for (const rounding of ['""', "2", "0.0", "true"])
    assert.equal(
      inspectBfcl(r, f, { ...args, rounding }, { rounding: true }).status,
      "fail",
    );
  assert.equal(
    inspectBfcl(r, f, { ...args, rounding: '""' }, { rounding: false }).status,
    "pass",
  );
  const area = records[0];
  assert.equal(
    inspectBfcl(
      area,
      "calculate_triangle_area",
      { base: "10", height: "5", unit: '""' },
      { unit: true },
    ).status,
    "pass",
  );
  assert.equal(
    inspectBfcl(
      area,
      "calculate_triangle_area",
      { base: "10", height: "5", unit: '"___ / "' },
      { unit: true },
    ).status,
    "pass",
  );
});
test("BFCL ASCII strings match the documented normalization but tabs and Unicode do not silently pass", () => {
  assert.equal(normalizeBfclString(" B-R_A/Z.I,L*^ "), "brazil");
  assert.equal(normalizeBfclString("Brazil\t"), "brazil\t");
  assert.equal(
    inspectBfcl(records[2], "country_info.capital", { country: '"bRaZiL"' }, {})
      .status,
    "pass",
  );
  assert.equal(
    inspectBfcl(
      records[2],
      "country_info.capital",
      { country: JSON.stringify("Brazil\t") },
      {},
    ).status,
    "fail",
  );
  assert.equal(
    inspectBfcl(records[2], "country_info.capital", { country: '"巴西"' }, {})
      .status,
    "unknown",
  );
});
test("BFCL initial, wrong function, missing and extra args cannot look like a success", () => {
  assert.equal(inspectBfcl(records[0], "", {}, {}).status, "waiting");
  assert.equal(
    inspectBfcl(records[0], "calculate_triangle_area", {}, {}).status,
    "waiting",
  );
  assert.equal(
    inspectBfcl(
      records[2],
      "country_info.population",
      { country: '"Brazil"' },
      {},
    ).status,
    "fail",
  );
  assert.equal(
    inspectBfcl(
      records[0],
      "calculate_triangle_area",
      { base: "10", height: "5", extra: "1" },
      { extra: true },
    ).status,
    "fail",
  );
  assert.equal(
    inspectBfcl(
      records[4],
      "kinematics.calculate_final_speed",
      { initial_speed: "20", acceleration: "10", time: "5" },
      {},
    ).status,
    "fail",
  );
});
test("BFCL each sourced example is accepted locally without execution or invented results", () => {
  for (const r of records) {
    const e = bfclExample(r)!;
    assert.equal(inspectBfcl(r, e.name, e.inputs, {}).status, "pass");
    const f = r.function.find((f) => f.name === e.name)!;
    const draft = JSON.parse(bfclPreview(f, e.inputs, {}));
    assert.equal(draft.name, e.name);
    assert.ok(!("result" in draft));
  }
  assert.ok(
    bfclPreview(records[1].function[0], { number: "5.0" }, {}).includes("5.0"),
  );
  const e = bfclExample(records[4])!;
  assert.equal(
    inspectBfcl(
      records[4],
      e.name,
      { ...e.inputs, rounding: "2" },
      { rounding: true },
    ).status,
    "pass",
  );
  assert.equal(
    inspectBfcl(
      records[4],
      e.name,
      { ...e.inputs, rounding: "0" },
      { rounding: true },
    ).status,
    "fail",
  );
});
test("BFCL live workbench state clears drafts, stale results and revealed annotations when appropriate", async () => {
  const record = ref(records[0]),
    scope = effectScope(),
    s = scope.run(() => useBfclWorkbench(() => record.value))!;
  assert.equal(s.selectedName.value, "");
  assert.equal(s.revealed.value, false);
  s.loadExample();
  s.checked.value = true;
  assert.equal(s.result.value.status, "pass");
  s.inputs.value.base = "11";
  assert.equal(s.checked.value, false);
  s.checked.value = true;
  s.included.value.unit = true;
  assert.equal(s.checked.value, false);
  record.value = records[2];
  assert.deepEqual(s.inputs.value, {});
  assert.equal(s.revealed.value, false);
  assert.equal(s.selectedName.value, "");
  s.selectedName.value = "country_info.capital";
  s.inputs.value.country = '"Brazil"';
  s.revealed.value = true;
  s.checked.value = true;
  s.selectedName.value = "country_info.population";
  assert.deepEqual(s.inputs.value, {});
  assert.equal(s.checked.value, false);
  assert.equal(s.revealed.value, false);
  s.reset();
  assert.equal(s.selectedName.value, "");
  scope.stop();
});
test("BFCL unknown ids are explicit and case selection shares URL/history/raw mode", async () => {
  assert.equal(findBfclCase(undefined), bfclCases[0]);
  assert.equal(findBfclCase("bad"), undefined);
  assert.equal(findBfclCase(["x", "y"]), undefined);
  assert.equal(isUnknownBfclSample("bfcl", "bad", fixture.samples), true);
  assert.equal(
    isUnknownBfclSample("bfcl", "bad", fixture.samples, "/guide/"),
    false,
  );
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/bfcl/", component: {} }],
  });
  await router.push("/benchmarks/bfcl/?keep=1");
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
  await selectSampleFromWalkthrough(router, bfclCases[2].sampleId, "push");
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
  await router.push("/benchmarks/bfcl/?sample=missing");
  await nextTick();
  assert.equal(index.value, -1);
  await router.push("/benchmarks/bfcl/?sample=x&sample=y");
  await nextTick();
  assert.equal(index.value, -1);
  await selectSampleFromWalkthrough(router, bfclCases[0].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 0);
  scope.stop();
});
async function settle() {
  await new Promise<void>((r) => setImmediate(r));
  await nextTick();
}
test("BFCL independent loaders recover after a real failed request", async (t) => {
  let fail = true;
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () =>
    fail ? new Response("", { status: 404 }) : Response.json(fixture),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const upper = scope.run(() =>
      useSampleLoader(
        () => "bfcl",
        () => true,
        "/",
      ),
    )!,
    lower = scope.run(() =>
      useSampleLoader(
        () => "bfcl",
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
test("BFCL actual Vue workbench starts with hidden answers, empty draft and intact real schema", async () => {
  const filename = new URL(
    "../src/components/BfclWorkbench.vue",
    import.meta.url,
  ).pathname;
  const { descriptor } = parse(await read("src/components/BfclWorkbench.vue"), {
    filename,
  });
  let code = compileScript(descriptor, { id: "bf-test", inlineTemplate: true })
    .content.replace(
      /from ['"]vue['"]/g,
      `from ${JSON.stringify(import.meta.resolve("vue"))}`,
    )
    .replace(
      /from ['"]..\/content\/bfclExperience['"]/g,
      `from ${JSON.stringify(new URL("../src/content/bfclExperience.ts", import.meta.url).href)}`,
    )
    .replace(
      /from ['"]..\/composables\/bfclWorkbench['"]/g,
      `from ${JSON.stringify(new URL("../src/composables/bfclWorkbench.ts", import.meta.url).href)}`,
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
  for (let i = 0; i < records.length; i++) {
    const html = await renderToString(
      createSSRApp(component, { record: records[i], entry: bfclCases[i] }),
    );
    assert.match(html, /尚未选择函数/);
    assert.match(html, /查看官方调用标注/);
    assert.doesNotMatch(html, /id="bf-answer"/);
    assert.doesNotMatch(html, /class="bf-result"/);
    assert.ok(html.includes(records[i].function[0].name));
  }
});
test("BFCL integrates deep anchors, unknown selections, source separation and responsive keyboard UI", async () => {
  const [main, detail, viewer, card, pilot, bench, css] = await Promise.all(
    [
      "src/main.ts",
      "src/views/DetailView.vue",
      "src/components/SampleViewer.vue",
      "src/components/BenchmarkCard.vue",
      "src/components/BfclPilot.vue",
      "src/components/BfclWorkbench.vue",
      "src/styles/bfcl-pilot.css",
    ].map(read),
  );
  assert.ok(main.includes('to.path === "/benchmarks/bfcl/"'));
  assert.ok(detail.includes("<BfclPilot"));
  assert.ok(viewer.includes("isUnknownBfclSample"));
  assert.ok(viewer.includes('item.id === "bfcl" && findBfclCase(current.id)'));
  assert.ok(viewer.includes("该任务原文不含 ground_truth；可在上方调用练习查看另一个官方文件的标注。"));
  assert.ok(viewer.includes("此公开记录未附参考答案，完成标准见评分方法。"));
  assert.ok(card.includes("'bfcl'].includes(item.id) ? '#task-walkthrough'"));
  assert.match(pilot, /:key="entry.sampleId"/);
  assert.match(pilot, /loaded \|\| failed/);
  assert.match(bench, /v-if="revealed"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(css, /overflow-wrap:.*anywhere/);
  assert.doesNotMatch(bench, /v-html|<iframe|<canvas|<img/);
  const a = createDeferredDetailAnchor();
  a.begin("/benchmarks/bfcl/#score");
  let ready = false;
  const pending = a.wait("/benchmarks/bfcl/#score").then((v) => (ready = v));
  a.settled("/benchmarks/bfcl/#score", "pilot");
  await nextTick();
  assert.equal(ready, false);
  a.settled("/benchmarks/bfcl/#score", "samples");
  await pending;
  assert.equal(ready, true);
});
