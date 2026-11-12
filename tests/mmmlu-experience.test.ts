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
  mmmluCases,
  findMmmluCase,
  isUnknownMmmluSample,
  readMmmluRecord,
  polynomialMod5,
  permutationPower,
  composePermutation,
  inversePermutation,
} from "../src/content/mmmluExperience";
import { useMmmluWorkbench } from "../src/composables/mmmluWorkbench";
import { useSampleLoader } from "../src/composables/sampleLoader";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import { createDeferredDetailAnchor } from "../src/lib/deferredDetailAnchor";
import type { SampleFile } from "../src/types/benchmark";
const read = (p: string) =>
  readFile(new URL("../" + p, import.meta.url), "utf8");
const source = JSON.parse(await read("content/benchmarks/mmmlu.json"));
const fixture: SampleFile = { benchmarkId: "mmmlu", ...source.sampleSet };
const hashes = [
  "cfde148ed563eee9235d8f936d80446083e657d85382321441892a96214b9a09",
  "ef7fb6b0aa6316f8bc559b5ceafd3a59e533d5f6bc1b9a5dc895bd86bc0bb527",
  "c7194e1adde293a442132465e95dd6a6b00b941b9740f5218793976d88792416",
  "a7721947bec8c5dc2ab45022cc58e08a68f62c2b521cf10a6c1e657d0fffa3a1",
];
test("MMMLU preserves four source records, options, answers and original dates", () => {
  assert.equal(source.verifiedAt, "2026-10-19");
  assert.equal(source.sampleSet.retrievedAt, "2026-10-19");
  assert.deepEqual(
    fixture.samples.map((s) => s.id),
    mmmluCases.map((c) => c.sampleId),
  );
  fixture.samples.forEach((s, i) => {
    const raw = s.raw as Record<string, unknown>;
    const sorted = Object.fromEntries(
      Object.keys(raw)
        .sort()
        .map((k) => [k, raw[k]]),
    );
    assert.equal(
      createHash("sha256").update(JSON.stringify(sorted)).digest("hex"),
      hashes[i],
    );
    const r = readMmmluRecord(raw)!;
    assert.equal(s.prompt, r.question);
    assert.deepEqual(s.options, r.options);
    assert.equal(s.answer, r.answer);
    assert.equal(s.licensePath, "licenses/mmlu.txt");
  });
  assert.deepEqual(
    fixture.samples.map((s) => s.answer),
    ["B", "C", "D", "B"],
  );
  for (const bad of [
    null,
    {},
    {
      Question: "q",
      Answer: "E",
      A: "a",
      B: "b",
      C: "c",
      D: "d",
      Subject: "abstract_algebra",
    },
  ])
    assert.equal(readMmmluRecord(bad), null);
});
test("MMMLU finite field arithmetic checks all five residues and invalid inputs", () => {
  assert.deepEqual(
    [0, 1, 2, 3, 4].map((x) => polynomialMod5(x)?.value),
    [0, 7, 64, 339, 1240],
  );
  assert.deepEqual(
    [0, 1, 2, 3, 4].map((x) => polynomialMod5(x)?.residue),
    [0, 2, 4, 4, 0],
  );
  for (const x of [-1, 5, 1.5, NaN, Infinity])
    assert.equal(polynomialMod5(x), null);
});
test("MMMLU permutation acts right first, has order five, index twenty-four", () => {
  const left = [2, 5, 3, 1, 4],
    right = [1, 3, 2, 4, 5];
  assert.deepEqual(composePermutation(left, right), [2, 3, 5, 1, 4]);
  assert.deepEqual(
    [0, 1, 2, 3, 4, 5].map((p) => permutationPower(1, p)),
    [1, 2, 3, 5, 4, 1],
  );
  for (let v = 1; v <= 5; v++) assert.equal(permutationPower(v, 5), v);
  assert.equal(120 / 5, 24);
  for (const args of [
    [0, 1],
    [6, 0],
    [1, -1],
    [1, 1.5],
    [NaN, 1],
  ])
    assert.equal(permutationPower(args[0]!, args[1]!), null);
  const g = [2, 3, 1, 4];
  const k = [2, 1, 4, 3];
  assert.deepEqual(
    composePermutation(composePermutation(g, k), inversePermutation(g)),
    [4, 3, 2, 1],
  );
});
test("MMMLU question changes clear local practice and reference state synchronously", () => {
  const id = ref<string | undefined>(mmmluCases[0].sampleId),
    scope = effectScope();
  const state = scope.run(() => useMmmluWorkbench(() => id.value))!;
  assert.equal(state.revealed.value, false);
  assert.equal(state.selectedOption.value, null);
  state.choose(1);
  state.revealed.value = true;
  id.value = mmmluCases[1].sampleId;
  assert.equal(state.revealed.value, false);
  assert.equal(state.selectedOption.value, null);
  state.choose(3);
  state.choose(4);
  assert.equal(state.selectedOption.value, 3);
  state.reset();
  assert.equal(state.selectedOption.value, null);
  state.revealed.value = true;
  id.value = undefined;
  assert.equal(state.revealed.value, false);
  scope.stop();
});
test("MMMLU unknown and malformed IDs never stand in for the first question", () => {
  for (const id of [null, undefined, ""])
    assert.equal(findMmmluCase(id), mmmluCases[0]);
  for (const id of ["missing", 0, [mmmluCases[0].sampleId]]) {
    assert.equal(findMmmluCase(id), undefined);
    assert.equal(isUnknownMmmluSample("mmmlu", id, fixture.samples), true);
  }
  assert.equal(
    isUnknownMmmluSample("libero", "missing", fixture.samples),
    false,
  );
  assert.equal(
    isUnknownMmmluSample("mmmlu", "missing", fixture.samples, "/guide/"),
    false,
  );
});
test("MMMLU upper/lower selection, raw view, refresh and browser history share URL", async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/mmmlu/", component: {} }],
  });
  await router.push("/benchmarks/mmmlu/?keep=1");
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
  await selectSampleFromWalkthrough(router, mmmluCases[2].sampleId, "push");
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
  await router.push("/benchmarks/mmmlu/?sample=missing");
  await nextTick();
  assert.equal(index.value, -1);
  await router.push("/benchmarks/mmmlu/?sample=x&sample=y");
  await nextTick();
  assert.equal(index.value, -1);
  await selectSampleFromWalkthrough(router, mmmluCases[3].sampleId, "push");
  await nextTick();
  assert.equal(index.value, 3);
  scope.stop();
});
async function settle() {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
}
test("MMMLU records fail explicitly and independent retries recover real fixture", async (t) => {
  let fail = true;
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () =>
    fail ? new Response("", { status: 404 }) : Response.json(fixture),
  );
  const scope = effectScope();
  t.after(() => scope.stop());
  const upper = scope.run(() =>
      useSampleLoader(
        () => "mmmlu",
        () => true,
        "/",
      ),
    )!,
    lower = scope.run(() =>
      useSampleLoader(
        () => "mmmlu",
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
test("MMMLU scene server-rendering hides all explanations until explicitly revealed", async () => {
  const filename = new URL("../src/components/MmmluScene.vue", import.meta.url)
    .pathname;
  const { descriptor } = parse(await read("src/components/MmmluScene.vue"), {
    filename,
  });
  let code = compileScript(descriptor, {
    id: "mm-test",
    inlineTemplate: true,
  }).content;
  code = code
    .replace(
      /from ['"]vue['"]/g,
      `from ${JSON.stringify(import.meta.resolve("vue"))}`,
    )
    .replaceAll(
      'from "../content/mmmluExperience"',
      `from ${JSON.stringify(new URL("../src/content/mmmluExperience.ts", import.meta.url).href)}`,
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
  const secret = ["总次数", "120 ÷ 5 = 24", "零点集是", "陈述 1 为假"];
  for (const [i, c] of mmmluCases.entries()) {
    const hidden = await renderToString(
      createSSRApp(component, { kind: c.kind, revealed: false }),
    );
    for (const text of secret) assert.equal(hidden.includes(text), false);
    const shown = await renderToString(
      createSSRApp(component, { kind: c.kind, revealed: true }),
    );
    assert.ok(shown.includes(secret[i]!));
    assert.ok(shown.includes("本站数学图解"));
    if (c.kind === "permutation") {
      assert.equal(
        (shown.match(/marker-end="url\(#mm-cycle-arrow\)"/g) ?? []).length,
        5,
      );
    }
  }
});
test("MMMLU integration retains deferred layout, source distinction and answer gating", async () => {
  const [main, detail, pilot, viewer, card, css] = await Promise.all(
    [
      "src/main.ts",
      "src/views/DetailView.vue",
      "src/components/MmmluPilot.vue",
      "src/components/SampleViewer.vue",
      "src/components/BenchmarkCard.vue",
      "src/styles/mmmlu-pilot.css",
    ].map(read),
  );
  assert.ok(
    main.includes('to.path === "/benchmarks/mmmlu/" && to.path !== from.path'),
  );
  assert.ok(detail.includes("MmmluPilot"));
  assert.ok(pilot.includes('emit("settled")'));
  assert.ok(pilot.includes("loaded || failed"));
  assert.ok(viewer.includes("isUnknownMmmluSample"));
  assert.ok(
    card.includes(
      "'mmmlu', 'ifeval', 'calvin', 'bfcl'].includes(item.id) ? '#task-walkthrough'",
    ),
  );
  assert.match(pilot, /v-if="revealed"\s+id="mm-reference"/);
  assert.match(pilot, /:revealed="revealed"/);
  assert.ok(pilot.includes("不是阶或幂"));
  assert.match(
    pilot,
    /<style scoped src="\.\.\/styles\/pilot-common\.css"><\/style>/,
  );
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("var(--accent-text)"));
  const anchor = createDeferredDetailAnchor();
  anchor.begin("/benchmarks/mmmlu/#score");
  let ready = false;
  const pending = anchor
    .wait("/benchmarks/mmmlu/#score")
    .then((v) => (ready = v));
  anchor.settled("/benchmarks/mmmlu/#score", "pilot");
  await Promise.resolve();
  assert.equal(ready, false);
  anchor.settled("/benchmarks/mmmlu/#score", "samples");
  await pending;
  assert.equal(ready, true);
  assert.ok(source.reusePolicy.license.includes("不含 README"));
  assert.ok(
    source.sources.some((s: { url: string }) => s.url.includes("325a01dc")),
  );
});
