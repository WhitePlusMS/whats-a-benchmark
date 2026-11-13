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
  ifevalCases,
  findIfevalCase,
  isUnknownIfevalSample,
  readIfevalRecord,
  checkIfevalRule,
  inspectIfeval,
  looseVariants,
  ifevalPresets,
  pythonStrip,
  placeholders,
  highlights,
  titles,
  asciiWords,
  asciiSections,
  allChecks,
  anyCheck,
} from "../src/content/ifevalExperience";
import { useIfevalWorkbench } from "../src/composables/ifevalWorkbench";
import { useSampleLoader } from "../src/composables/sampleLoader";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import { createDeferredDetailAnchor } from "../src/lib/deferredDetailAnchor";
import type { SampleFile } from "../src/types/benchmark";
const read = (p: string) =>
  readFile(new URL("../" + p, import.meta.url), "utf8");
const source = JSON.parse(await read("content/benchmarks/ifeval.json"));
const fixture: SampleFile = { benchmarkId: "ifeval", ...source.sampleSet };
const records = fixture.samples.map((s) => readIfevalRecord(s.raw)!);
const c = (id: string, text: string, args: Record<string, unknown> = {}) =>
  checkIfevalRule(id, args, text);
const words = (n: number) => Array(n).fill("word").join(" ");
const hashes = [
  "813e0869899d84ed8d31b9339838b863e346e4144c410528b59d3592b138d080",
  "ad14da383a439ef0a42b9077fcc3f2bc027f6860411415628b21eaeb60a3714e",
  "841226a9fc881b5008f33fa43e96f7164d401da02b6d8932bbcb1758dd3587f9",
  "92db22b567dee3d62e1e193614e1ca8a66ca30a12a50c65b4f070f3b8aba99b5",
  "5b1b5f7f89d8f1dcba2d00560ec9ae2968935e758013cb5c20e11f964ef47341",
  "bf89abf3ef03c10278da33187da1ced1b33670febe7e52d1d7b205fef8a6e69c",
];
test("IFEval retains six original raw records and historical verification dates", () => {
  assert.equal(source.verifiedAt, "2026-10-19");
  assert.equal(source.sampleSet.retrievedAt, "2026-10-19");
  assert.deepEqual(
    fixture.samples.map((s) => s.id),
    ifevalCases.map((c) => c.sampleId),
  );
  fixture.samples.forEach((s, i) => {
    assert.ok(records[i]);
    assert.equal(
      createHash("sha256").update(JSON.stringify(s.raw)).digest("hex"),
      hashes[i],
    );
  });
  for (const bad of [
    null,
    {},
    { key: 1, prompt: "x", instruction_id_list: ["x"], kwargs: [] },
  ])
    assert.equal(readIfevalRecord(bad), null);
});
test("IFEval punctuation and whitespace match Python boundaries", () => {
  assert.equal(c("punctuation:no_comma", "a,b").state, "fail");
  assert.equal(c("punctuation:no_comma", "a，b").state, "pass");
  for (const s of ["", " \n\t", "\x1c", "\u0085"])
    assert.equal(c("punctuation:no_comma", s).state, "fail");
  assert.equal(pythonStrip("\ufeff"), "\ufeff");
  assert.equal(c("punctuation:no_comma", "\ufeff").state, "pass");
});
test("IFEval placeholders match empty repeats nested brackets and CR, but not LF", () => {
  assert.equal(placeholders("[] [x] [[x]] [\r] [\u2028] [x\ny]").length, 5);
  assert.equal(
    c(
      "detectable_content:number_placeholders",
      Array(12).fill("[]").join(" "),
      { num_placeholders: 12 },
    ).state,
    "pass",
  );
  assert.equal(
    c(
      "detectable_content:number_placeholders",
      Array(11).fill("[same]").join(" "),
      { num_placeholders: 12 },
    ).state,
    "fail",
  );
});
test("IFEval highlight checker is not Markdown heading parsing", () => {
  for (const s of ["*x*", "**x**"]) assert.equal(highlights(s).length, 1);
  for (const s of ["# Heading", "* *", "*x\ny*"])
    assert.equal(highlights(s).length, 0);
  assert.equal(highlights("***x***").length, 2);
  assert.equal(highlights("*x* **y** ***z***").length, 4);
  assert.equal(
    c("detectable_format:number_highlighted_sections", "*x* **y** ***z***", {
      num_highlights: 3,
    }).state,
    "pass",
  );
});
test("IFEval ASCII word counts and unsupported Unicode retain source targets", () => {
  assert.equal(asciiWords("can't well-being 1,000 foo_bar")!.length, 7);
  assert.equal(
    c("length_constraints:number_words", words(299), {
      num_words: 300,
      relation: "at least",
    }).state,
    "fail",
  );
  assert.equal(
    c("length_constraints:number_words", words(300), {
      num_words: 300,
      relation: "at least",
    }).state,
    "pass",
  );
  for (const target of [300, 500])
    for (const text of ["", "中文", "é"]) {
      const r = c("length_constraints:number_words", text, {
        num_words: target,
        relation: "at least",
      });
      assert.equal(r.target, target);
      assert.equal(r.state, text ? "unknown" : "fail");
    }
  assert.equal(asciiWords("中文"), null);
});
test("IFEval section counter checks at least two markers, not paragraph semantics", () => {
  assert.equal(asciiSections("PARAGRAPH1 PARAGRAPH1 PARAGRAPH3")!.length, 3);
  assert.equal(
    c("detectable_format:multiple_sections", "PARAGRAPH1 PARAGRAPH1", {
      section_spliter: "PARAGRAPH",
      num_sections: 2,
    }).state,
    "pass",
  );
  assert.equal(
    c("detectable_format:multiple_sections", "paragraph 1 paragraph 2", {
      section_spliter: "PARAGRAPH",
      num_sections: 2,
    }).state,
    "fail",
  );
  assert.equal(
    c("detectable_format:multiple_sections", "PARAGRAPH ١ PARAGRAPH ٢", {
      section_spliter: "PARAGRAPH",
      num_sections: 2,
    }).state,
    "unknown",
  );
});
test("IFEval repeated request alone can meet both checks without writing an email", () => {
  const r = records[3]!;
  const prefix = String(r.kwargs[0]!.prompt_to_repeat);
  assert.equal(inspectIfeval(r, prefix).strictAll, "pass");
  assert.equal(
    inspectIfeval(r, " \n" + prefix.toUpperCase() + "  ").strictAll,
    "pass",
  );
  assert.equal(inspectIfeval(r, "extra " + prefix).strict[0], "fail");
  assert.equal(
    inspectIfeval(r, prefix.replace("Write an", "Write  an")).strict[0],
    "fail",
  );
  assert.equal(titles("<<<x>>>").length, 1);
  assert.equal(titles("<< >>").length, 0);
  assert.equal(titles("<<x\ny>>").length, 0);
});
test("IFEval keywords use substrings and capital-English never claims full support", () => {
  assert.equal(
    c("keywords:existence", "UNCORRELATED experiencing", {
      keywords: ["correlated", "experiencing"],
    }).state,
    "pass",
  );
  assert.equal(
    c("keywords:existence", "correlated experience", {
      keywords: ["correlated", "experiencing"],
    }).state,
    "fail",
  );
  assert.equal(
    c("keywords:existence", "CORRELATED EXPERİENCİNG", {
      keywords: ["correlated", "experiencing"],
    }).state,
    "unknown",
  );
  for (const text of ["UPPER CASE", "lower case", "123", "ΕΛΛΗΝΙΚΑ"])
    assert.equal(c("change_case:english_capital", text).state, "unknown");
  assert.equal(
    inspectIfeval(records[4]!, ifevalPresets(records[4]!)[1]!.text).strictAll,
    "unknown",
  );
});
test("IFEval loose independently ORs rules even when no candidate satisfies every rule", () => {
  const result = inspectIfeval(records[2]!, `*a* *b* *c*,\n${words(300)}`);
  assert.equal(result.strictAll, "fail");
  assert.equal(result.looseAll, "pass");
  assert.equal(
    result.variants.some((_, i) =>
      result.rows.every((row) => row[i]!.state === "pass"),
    ),
    false,
  );
  assert.equal(result.rows[0]![0]!.state, "fail");
  assert.equal(result.rows[1]![0]!.state, "pass");
  assert.equal(result.rows[0]![2]!.state, "pass");
  assert.equal(result.rows[1]![2]!.state, "fail");
  assert.deepEqual(looseVariants("*one*\nmid\n*last*"), [
    "*one*\nmid\n*last*",
    "one\nmid\nlast",
    "mid\n*last*",
    "*one*\nmid",
    "mid",
    "mid\nlast",
    "one\nmid",
    "mid",
  ]);
  assert.deepEqual(looseVariants("one").slice(2), ["", "", "", "", "", ""]);
  assert.equal(anyCheck(["fail", "unknown"]), "unknown");
  assert.equal(allChecks(["pass", "unknown"]), "unknown");
  assert.equal(allChecks(["fail", "unknown"]), "fail");
});
test("IFEval presets are bounded teaching fragments and reset state on case change", () => {
  for (const r of records) {
    assert.equal(ifevalPresets(r).length, 2);
    for (const p of ifevalPresets(r)) assert.ok(p.text.length <= 12000);
  }
  assert.equal(
    inspectIfeval(records[5]!, ifevalPresets(records[5]!)[1]!.text).strictAll,
    "pass",
  );
  const scope = effectScope(),
    id = ref("1001");
  const state = scope.run(() => useIfevalWorkbench(() => id.value))!;
  state.draft.value = "draft";
  state.selectedVariant.value = 3;
  state.showMatrix.value = true;
  id.value = "1005";
  assert.equal(state.draft.value, "");
  assert.equal(state.selectedVariant.value, 0);
  assert.equal(state.showMatrix.value, false);
  state.draft.value = "again";
  state.selectedVariant.value = 2;
  state.draft.value += "!";
  assert.equal(state.selectedVariant.value, 0);
  state.reset();
  assert.equal(state.draft.value, "");
  scope.stop();
  for (const id of ["bad", ["1001", "1005"]])
    assert.equal(findIfevalCase(id), undefined);
  assert.equal(findIfevalCase(undefined)?.key, 1001);
  assert.equal(isUnknownIfevalSample("ifeval", "bad", fixture.samples), true);
  assert.equal(
    isUnknownIfevalSample("ifeval", "bad", fixture.samples, "/guide/"),
    false,
  );
});

test("IFEval upper/lower selection, raw view, refresh and browser history share URL", async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/ifeval/", component: {} }],
  });
  await router.push("/benchmarks/ifeval/?keep=1");
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
  await selectSampleFromWalkthrough(router, ifevalCases[2].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 2);
  await location.selectSample(1);
  await nextTick();
  assert.equal(router.currentRoute.value.hash, "#samples");
  assert.equal(router.currentRoute.value.query.keep, "1");
  await location.setMode("raw");
  await nextTick();
  assert.equal(mode.value, "raw");
  async function go(n: number) {
    await new Promise<void>((resolve) => {
      const stop = router.afterEach(() => {
        stop();
        resolve();
      });
      router.go(n);
    });
    await nextTick();
  }
  await go(-1);
  assert.equal(index.value, 2);
  assert.equal(mode.value, "read");
  await go(1);
  assert.equal(index.value, 1);
  assert.equal(mode.value, "raw");
  const freshIndex = ref(-1),
    freshMode = ref<"read" | "raw">("read");
  scope.run(() =>
    createSampleLocation(router, {
      data,
      index: freshIndex,
      mode: freshMode,
      current: computed(() => data.value.samples[freshIndex.value]),
    }),
  );
  assert.equal(freshIndex.value, 1);
  assert.equal(freshMode.value, "raw");
  await router.push("/benchmarks/ifeval/?sample=missing");
  await nextTick();
  assert.equal(index.value, -1);
  await router.push("/benchmarks/ifeval/?sample=x&sample=y");
  await nextTick();
  assert.equal(index.value, -1);
  await selectSampleFromWalkthrough(router, ifevalCases[3].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 3);
  scope.stop();
});
async function settle() {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
}
test("IFEval records fail explicitly and independent retries recover real fixture", async (t) => {
  let fail = true;
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () =>
    fail ? new Response("", { status: 404 }) : Response.json(fixture),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const upper = scope.run(() =>
      useSampleLoader(
        () => "ifeval",
        () => true,
        "/",
      ),
    )!,
    lower = scope.run(() =>
      useSampleLoader(
        () => "ifeval",
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
  assert.equal(upper.error.value, false);
  assert.equal(lower.error.value, true);
  assert.deepEqual(upper.data.value, fixture);
  lower.reload();
  await settle();
  assert.equal(lower.error.value, false);
});
test("IFEval rule visuals render source thresholds, unknown states and all nine rule displays", async () => {
  const filename = new URL(
    "../src/components/IfevalRuleVisual.vue",
    import.meta.url,
  ).pathname;
  const { descriptor } = parse(
    await read("src/components/IfevalRuleVisual.vue"),
    { filename },
  );
  let code = compileScript(descriptor, {
    id: "if-test",
    inlineTemplate: true,
  }).content.replace(
    /from ['"]vue['"]/g,
    `from ${JSON.stringify(import.meta.resolve("vue"))}`,
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
  const seen = new Set<string>();
  for (const r of records)
    for (const [i, id] of r.instruction_id_list.entries()) {
      const text = ifevalPresets(r)[1]!.text;
      const result = checkIfevalRule(id, r.kwargs[i]!, text);
      const html = await renderToString(
        createSSRApp(component, { result, text, active: true }),
      );
      assert.ok(html.includes(result.label));
      assert.ok(html.includes(id));
      seen.add(id);
    }
  assert.equal(seen.size, 9);
  for (const target of [300, 500])
    for (const text of ["", "中文"]) {
      const result = c("length_constraints:number_words", text, {
        num_words: target,
        relation: "at least",
      });
      const html = await renderToString(
        createSSRApp(component, { result, text, active: !!text }),
      );
      assert.ok(html.includes(`阈值 ${target}`));
      assert.ok(html.includes(text ? "未判定" : "等待片段"));
    }
});
test("IFEval integration preserves origins, local-only drafts and async layout readiness", async () => {
  const [main, detail, pilot, workbench, css, viewer] = await Promise.all(
    [
      "src/main.ts",
      "src/views/DetailView.vue",
      "src/components/IfevalPilot.vue",
      "src/components/IfevalWorkbench.vue",
      "src/styles/ifeval-pilot.css",
      "src/components/SampleViewer.vue",
    ].map(read),
  );
  assert.match(main, /benchmark\?\.sampleAccess\.status === "local"/);
  assert.match(detail, /ifeval: IfevalPilot/);
  assert.match(viewer, /current.prompt/);
  assert.match(pilot, /record.instruction_id_list/);
  assert.match(pilot, /试用格式检查/);
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("focus-visible"));
  assert.ok(workbench.includes('maxlength="12000"'));
  assert.ok(workbench.includes("未判定"));
  assert.ok(!workbench.includes("v-html"));
  assert.ok(!workbench.includes("localStorage"));
  assert.ok(!workbench.includes("fetch("));
  const visual = await read("src/components/IfevalRuleVisual.vue");
  assert.ok(visual.includes("if-match-context"));
  assert.ok(visual.includes("未扫描 / 未判定"));
  assert.ok(!visual.includes("if-hit-map"));
  assert.ok(!visual.includes("if-prefix-track"));
  assert.ok(!visual.includes("if-title-window"));
  assert.ok(!css.includes(".if-slots .filled,\n.if-budget"));
  const a = createDeferredDetailAnchor();
  a.begin("/benchmarks/ifeval/#score");
  let ready = false;
  const pending = a.wait("/benchmarks/ifeval/#score").then((v) => (ready = v));
  await Promise.resolve();
  assert.equal(ready, false);
  a.settled("/benchmarks/ifeval/#score");
  await pending;
  assert.equal(ready, true);
});
