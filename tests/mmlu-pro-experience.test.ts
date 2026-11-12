import { computed } from "vue";
import { createSampleLocation } from "../src/lib/sampleLocation";
import type { SampleFile } from "../src/types/benchmark";
import { useSampleLoader } from "../src/composables/sampleLoader";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import test from "node:test";
import { createSSRApp, effectScope, ref, nextTick } from "vue";
import { renderToString } from "@vue/server-renderer";
import { parse, compileScript } from "@vue/compiler-sfc";
import ts from "typescript";
import {
  mmluProCases,
  readMmluProRecord,
  findMmluProCase,
  isUnknownMmluProSample,
  checkMmluPro,
  mmluProPipeline,
  mmluProDataSource,
  mmluProCardSource,
} from "../src/content/mmluProExperience";
import { useMmluProPractice } from "../src/composables/mmluProPractice";
import { createMemoryHistory, createRouter } from "vue-router";
import { selectSampleFromWalkthrough } from "../src/lib/sampleLocation";
const read = (p: string) =>
  readFile(new URL("../" + p, import.meta.url), "utf8");
const source = JSON.parse(await read("content/benchmarks/mmlu-pro.json"));
const samples = source.sampleSet.samples;
const records = samples.map((s: any) => readMmluProRecord(s.raw)!);
test("MMLU-Pro preserves all ten original records and historical provenance", () => {
  assert.equal(
    createHash("sha256")
      .update(
        JSON.stringify([
          samples.map((s: any) => [s.id, s.raw]),
          source.verifiedAt,
          source.sampleSet.retrievedAt,
          source.researchNotes,
        ]),
      )
      .digest("hex"),
    "c7cc231ba4fde4a96b0af43b3e3079eca1ceafd41bc2012a2c9a1bb81391aa45",
  );
  assert.equal(samples.length, 10);
  assert.deepEqual(
    records.map((r: any) => r.answer),
    ["H", "E", "J", "E", "F", "B", "B", "B", "A", "I"],
  );
  assert.deepEqual(
    records.map((r: any) => r.options.length),
    [10, 9, 10, 9, 10, 4, 10, 8, 8, 9],
  );
});
test("MMLU-Pro validates answer mapping and filters only literal N/A placeholders", () => {
  for (let i = 0; i < records.length; i++) {
    assert.equal(records[i].questionId, mmluProCases[i].questionId);
    assert.equal(samples[i].id, mmluProCases[i].sampleId);
    assert.ok(records[i].options.every((o: any) => o.text !== "N/A"));
    assert.equal(checkMmluPro(records[i], null), "waiting");
    assert.equal(checkMmluPro(records[i], 99), "waiting");
    assert.equal(checkMmluPro(records[i], records[i].answerIndex), "correct");
    assert.equal(
      checkMmluPro(
        records[i],
        (records[i].answerIndex + 1) % records[i].options.length,
      ),
      "incorrect",
    );
  }
  assert.equal(readMmluProRecord(null), null);
  assert.equal(readMmluProRecord({ ...samples[0].raw, answer_index: 0 }), null);
  assert.equal(
    readMmluProRecord({ ...samples[0].raw, options: ["N/A"] }),
    null,
  );
});
test("MMLU-Pro separates data MIT declaration from code license, no wrong local license path", () => {
  assert.match(mmluProDataSource, /b189ec765aa7ed75c8acfea42df31fdae71f97be/);
  assert.match(mmluProCardSource, /README.md$/);
  for (const s of samples) {
    assert.equal(s.licensePath, undefined);
    assert.match(s.license, /数据.*MIT.*代码 Apache/);
    assert.equal(s.source, mmluProDataSource);
  }
});
test("MMLU-Pro only relevant examples carry visible corrections", () => {
  assert.deepEqual(
    mmluProCases.filter((c) => c.correction).map((c) => c.questionId),
    [10, 20, 30],
  );
  assert.match(mmluProCases[3].correction, /500 mm/);
  assert.match(mmluProCases[5].correction, /细胞壁/);
  assert.match(mmluProCases[7].correction, /AB²C/);
  assert.match(mmluProCases[7].explanation.join(" "), /不是.*穷举/);
});
test("MMLU-Pro pipeline has one immediate dependency, six cycles and unchanged inputs", () => {
  const outputs = mmluProPipeline.map((r) => r.instruction.split(",")[2]);
  const inputs = mmluProPipeline.map((r) =>
    r.instruction.split(" ")[1].split(",").slice(0, 2),
  );
  assert.deepEqual(
    outputs.filter((o) => ["R0", "R1", "R2"].includes(o)),
    [],
  );
  assert.deepEqual(
    outputs
      .map((o, i) => (i < 4 && inputs[i + 1].includes(o) ? i : -1))
      .filter((i) => i >= 0),
    [3],
  );
  assert.equal(
    mmluProPipeline.reduce((a, r) => a + r.cycles, 0),
    6,
  );
  for (const [A, B, C] of [
    [2, 3, 5],
    [-2, 7, 0],
    [1, 1, 1],
  ]) {
    const reg: Record<string, number> = { R0: A, R1: B, R2: C };
    for (const row of mmluProPipeline) {
      const [op, args] = row.instruction.split(" ");
      const [a, b, out] = args.split(",");
      reg[out] = op === "MUL" ? reg[a] * reg[b] : reg[a] + reg[b];
    }
    assert.equal(reg.R7, A * B + A * B * C + B * C);
  }
});
test("MMLU-Pro real practice state resets selections, explanations, original CoT and pipeline step", () => {
  const record = ref(records[0]),
    scope = effectScope();
  const s = scope.run(() => useMmluProPractice(() => record.value))!;
  assert.equal(s.revealed.value, false);
  assert.equal(s.result.value, "waiting");
  s.selected.value = 7;
  s.revealed.value = true;
  s.explanation.value = true;
  s.original.value = true;
  s.step.value = 4;
  s.selected.value = 0;
  assert.equal(s.revealed.value, false);
  assert.equal(s.original.value, false);
  assert.equal(s.step.value, 0);
  s.revealed.value = true;
  record.value = records[1];
  assert.equal(s.selected.value, null);
  assert.equal(s.revealed.value, false);
  s.selected.value = 4;
  s.reset();
  assert.equal(s.result.value, "waiting");
  scope.stop();
});
test("MMLU-Pro unknown ids are explicit and case selection shares URL/history/raw mode", async () => {
  assert.equal(findMmluProCase(undefined), mmluProCases[0]);
  assert.equal(findMmluProCase("bad"), undefined);
  assert.equal(findMmluProCase(["x", "y"]), undefined);
  assert.equal(
    isUnknownMmluProSample(
      "mmlu-pro",
      "bad",
      ({ benchmarkId: "mmlu-pro", ...source.sampleSet } as SampleFile).samples,
    ),
    true,
  );
  assert.equal(
    isUnknownMmluProSample(
      "mmlu-pro",
      "bad",
      ({ benchmarkId: "mmlu-pro", ...source.sampleSet } as SampleFile).samples,
      "/guide/",
    ),
    false,
  );
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/mmlu-pro/", component: {} }],
  });
  await router.push("/benchmarks/mmlu-pro/?keep=1");
  await router.isReady();
  const data = ref({
      benchmarkId: "mmlu-pro",
      ...source.sampleSet,
    } as SampleFile),
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
  await selectSampleFromWalkthrough(router, mmluProCases[7].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 7);
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
  assert.equal(index.value, 7);
  await router.push("/benchmarks/mmlu-pro/?sample=missing");
  await nextTick();
  assert.equal(index.value, -1);
  await router.push("/benchmarks/mmlu-pro/?sample=x&sample=y");
  await nextTick();
  assert.equal(index.value, -1);
  await selectSampleFromWalkthrough(router, mmluProCases[0].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 0);
  scope.stop();
});
test("MMLU-Pro default SSR never includes answer panel, explanation, corrections or original CoT", async () => {
  const { descriptor } = parse(await read("src/components/MmluProTask.vue"));
  let code = compileScript(descriptor, { id: "mp-test", inlineTemplate: true })
    .content.replace(
      /from ['"]vue['"]/g,
      `from ${JSON.stringify(import.meta.resolve("vue"))}`,
    )
    .replace(
      /from ['"]..\/content\/mmluProExperience['"]/g,
      `from ${JSON.stringify(new URL("../src/content/mmluProExperience.ts", import.meta.url).href)}`,
    )
    .replace(
      /from ['"]..\/composables\/mmluProPractice['"]/g,
      `from ${JSON.stringify(new URL("../src/composables/mmluProPractice.ts", import.meta.url).href)}`,
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
      createSSRApp(component, { record: records[i], entry: mmluProCases[i] }),
    );
    assert.doesNotMatch(
      html,
      /id="mp-answer"|id="mp-original"|id="mp-explanation"|公开解释纠错/,
    );
    assert.match(html, /查看标注与解读/);
    assert.ok(!html.includes(records[i].cot));
  }
});
test("MMLU-Pro shared navigation, asynchronous anchor handshake, independent retry and scoped styles wired", async () => {
  const [main, detail, viewer, card, pilot, task, css] = await Promise.all(
    [
      "src/main.ts",
      "src/views/DetailView.vue",
      "src/components/SampleViewer.vue",
      "src/components/BenchmarkCard.vue",
      "src/components/MmluProPilot.vue",
      "src/components/MmluProTask.vue",
      "src/styles/mmlu-pro-pilot.css",
    ].map(read),
  );
  assert.match(main, /to.path === "\/benchmarks\/mmlu-pro\/"/);
  assert.match(detail, /<MmluProPilot/);
  assert.match(viewer, /isUnknownMmluProSample/);
  assert.match(card, /'mmlu-pro'\].includes/);
  assert.match(pilot, /:key="entry.sampleId"/);
  assert.match(pilot, /loaded \|\| failed/);
  assert.ok(
    pilot.includes("record.value.questionId !== entry.value.questionId"),
  );
  assert.ok(
    !pilot.includes("String(record.value.questionId) !== entry.value.sampleId"),
  );
  assert.match(pilot, /@click="reload"/);
  assert.match(task, /v-if="revealed"/);
  assert.match(task, /v-if="original"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.doesNotMatch(task, /<img|<canvas|v-html/);
});

async function settle() {
  await new Promise<void>((r) => setImmediate(r));
  await nextTick();
}
test("MMLU-Pro independent loaders recover after a real failed request", async (t) => {
  let fail = true;
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () =>
    fail
      ? new Response("", { status: 404 })
      : Response.json({ benchmarkId: "mmlu-pro", ...source.sampleSet }),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const upper = scope.run(() =>
      useSampleLoader(
        () => "mmlu-pro",
        () => true,
        "/",
      ),
    )!,
    lower = scope.run(() =>
      useSampleLoader(
        () => "mmlu-pro",
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
  assert.deepEqual(upper.data.value, {
    benchmarkId: "mmlu-pro",
    ...source.sampleSet,
  });
  assert.equal(lower.error.value, true);
  lower.reload();
  await settle();
  assert.equal(lower.error.value, false);
});
