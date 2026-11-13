import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { effectScope, nextTick, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  findHumanEvalCase,
  humanEvalCases,
  humanEvalExamples,
  isUnknownHumanEvalSample,
  readHumanEvalRecord,
} from "../src/content/humanEvalExperience";
import {
  balanceTrace,
  bracketTrace,
  decimalParts,
  deviationParts,
  distanceTrace,
  distanceDisplay,
  illustrationLength,
  insertionTokens,
} from "../src/lib/humanEvalIllustration";
import { useHumanEvalWorkbench } from "../src/composables/humanEvalWorkbench";
import { useSampleViewer } from "../src/composables/sampleViewer";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import type { SampleFile } from "../src/types/benchmark";
const source = JSON.parse(
  await readFile(
    new URL("../content/benchmarks/human-eval.json", import.meta.url),
    "utf8",
  ),
);
const fixture: SampleFile = { benchmarkId: "human-eval", ...source.sampleSet };
const records = fixture.samples.map(
  (sample, index) => readHumanEvalRecord(sample.raw, humanEvalCases[index])!,
);
const allExamples = records.map(humanEvalExamples);
const settle = async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
};

test("HumanEval 六场景精确映射原始记录，35个输入/预期从原文提取而非手写官方测试", () => {
  assert.deepEqual(
    humanEvalCases.map((item) => item.sampleId),
    fixture.samples.map((item) => item.id),
  );
  assert.deepEqual(
    allExamples.map((examples) => examples.length),
    [9, 5, 4, 8, 4, 5],
  );
  assert.equal(allExamples.flat().length, 35);
  assert.equal(new Set(humanEvalCases.map((item) => item.kind)).size, 6);
  fixture.samples.forEach((sample, index) => {
    const record = records[index];
    assert.equal(record.prompt, sample.prompt);
    assert.equal(record.canonical_solution, sample.answer);
    assert.equal(record.entry_point, humanEvalCases[index].entryPoint);
    assert.equal(sample.excerpt, false);
    assert.match(sample.license, /MIT/);
    assert.equal(sample.licensePath, "licenses/human-eval.txt");
    for (const example of allExamples[index]) {
      assert.ok(
        record[example.origin].includes(example.sourceText),
        `${sample.id} ${example.id} must be verbatim`,
      );
      assert.equal(example.call.startsWith(record.entry_point), true);
      assert.ok(illustrationLength(humanEvalCases[index].kind, example) >= 1);
    }
    assert.ok(
      allExamples[index].find(
        (example) => example.id === humanEvalCases[index].defaultExample,
      )?.origin === "prompt",
    );
  });
  assert.equal(readHumanEvalRecord({}, humanEvalCases[0]), null);
  assert.equal(
    readHumanEvalRecord(fixture.samples[1].raw, humanEvalCases[0]),
    null,
  );
  assert.throws(
    () =>
      humanEvalExamples({
        ...records[2],
        prompt: records[2].prompt.replace("3.5", "__import__('os')"),
      }),
    /Unsupported public literal/,
  );
});

test("HumanEval 每个公开输入的图解计算与其原始预期一致，浮点按原断言容差", () => {
  allExamples.forEach((examples, index) => {
    for (const example of examples) {
      const numbers = example.args[0] as number[];
      let actual: unknown;
      switch (humanEvalCases[index].kind) {
        case "distance":
          actual = distanceTrace(numbers, example.args[1] as number).some(
            (pair) => pair.close,
          );
          break;
        case "brackets":
          actual = bracketTrace(example.args[0] as string).at(-1)?.groups || [];
          break;
        case "decimal":
          actual = decimalParts(example.args[0] as number).decimal;
          break;
        case "balance":
          actual = balanceTrace(numbers).some((item) => item.below);
          break;
        case "deviation":
          actual = deviationParts(numbers).result;
          break;
        case "insertion":
          actual = insertionTokens(numbers, example.args[1] as number).map(
            (token) => token.value,
          );
          break;
      }
      if (example.tolerance)
        assert.ok(
          Math.abs((actual as number) - (example.expected as number)) <
            example.tolerance,
          `${index}: ${example.id}`,
        );
      else
        assert.deepEqual(actual, example.expected, `${index}: ${example.id}`);
    }
  });
});

test("HumanEval 距离严格小于阈值、不同索引可同值，保留浮点比较而不先四舍五入", () => {
  // Unit-test-only boundary probes; these are not presented as official examples.
  assert.equal(
    distanceTrace([1, 2], 1).some((pair) => pair.close),
    false,
  );
  assert.equal(distanceTrace([2, 2], 0.1)[0].close, true);
  assert.equal(distanceTrace([2, 2], 0)[0].close, false);
  const trace = distanceTrace([1.1, 2.2, 3.1, 4.1, 5.1], 1);
  assert.equal(trace.at(-1)!.close, true);
  assert.equal(trace.at(-1)!.distance, 0.8999999999999999);
  assert.equal(distanceTrace([3.1, 4.1], 1)[0].distance, 0.9999999999999996);
  assert.equal(distanceTrace([3.1, 4.1], 1)[0].close, true);
  assert.ok(trace.every((pair) => pair.left < pair.right));
  assert.equal(
    new Set(trace.map((pair) => `${pair.left}:${pair.right}`)).size,
    trace.length,
  );
});

test("HumanEval 括号忽略原文空格，仅在深度回到0时切组，不切内部闭合括号", () => {
  const text = allExamples[1][0].args[0] as string;
  const trace = bracketTrace(text);
  assert.equal(trace.length, text.length);
  assert.deepEqual(trace.at(-1)!.groups, ["()", "(())", "(()())"]);
  assert.equal(trace.filter((item) => item.boundary).length, 3);
  trace.forEach((item, index) => {
    if (item.char === " ") {
      assert.equal(item.depth, trace[index - 1]?.depth || 0);
      assert.equal(item.boundary, false);
    }
    if (item.boundary) assert.equal(item.depth, 0);
    if (item.depth > 0) assert.equal(item.boundary, false);
  });
  const nested = allExamples[1].find((example) => example.id === "test-3")!;
  assert.equal(
    bracketTrace(nested.args[0] as string).filter((item) => item.boundary)
      .length,
    1,
  );
});

test("HumanEval 小数图解区分精确断言和1e-6容差，不扩大正数任务域", () => {
  assert.deepEqual(decimalParts(3.5), { integer: 3, decimal: 0.5 });
  assert.deepEqual(
    allExamples[2].map((example) => example.tolerance),
    [undefined, undefined, 1e-6, 1e-6],
  );
  for (const example of allExamples[2])
    assert.ok((example.args[0] as number) > 0);
  assert.equal(decimalParts(123.456).integer, 123);
  assert.ok(Math.abs(decimalParts(123.456).decimal - 0.456) < 1e-6);
});

test("HumanEval 余额从零开始并在首次负值早停，空列表与恰好归零都不误判", () => {
  assert.deepEqual(balanceTrace([]), []);
  assert.deepEqual(
    balanceTrace([1, 2, -3, 1, 2, -3]).map((item) => item.balance),
    [1, 3, 0, 1, 3, 0],
  );
  const trace = balanceTrace([1, 2, -4, 5, 6]);
  assert.deepEqual(
    trace.map((item) => item.balance),
    [1, 3, -1, null, null],
  );
  assert.deepEqual(
    trace.map((item) => item.below),
    [false, false, true, false, false],
  );
  assert.equal(
    illustrationLength(
      "balance",
      allExamples[3].find((example) => example.id === "test-3")!,
    ),
    3,
  );
});

test("HumanEval 平均绝对偏差的中心、距离与分母均正确，不为未定义空列表编造输出", () => {
  assert.deepEqual(deviationParts([1, 2, 3, 4]), {
    mean: 2.5,
    distances: [1.5, 0.5, 0.5, 1.5],
    total: 4,
    result: 1,
  });
  assert.equal(deviationParts([1, 2, 3]).result, 2 / 3);
  assert.equal(deviationParts([1, 2, 3, 4, 5]).result, 6 / 5);
  assert.throws(() => deviationParts([]), /outside the selected public cases/);
});

test("HumanEval 插入项与原元素独立标记，同值仍可辨认，不在首尾额外插入", () => {
  assert.deepEqual(insertionTokens([], 7), []);
  const tokens = insertionTokens([2, 2, 2], 2);
  assert.deepEqual(
    tokens.map((token) => token.value),
    [2, 2, 2, 2, 2],
  );
  assert.deepEqual(
    tokens.map((token) => token.inserted),
    [false, true, false, true, false],
  );
  assert.deepEqual(
    tokens.map((token) => token.inputIndex),
    [0, null, 1, null, 2],
  );
  for (const example of allExamples[5]) {
    const tokens = insertionTokens(
      example.args[0] as number[],
      example.args[1] as number,
    );
    assert.equal(
      tokens.filter((token) => token.inserted).length,
      Math.max(0, (example.args[0] as number[]).length - 1),
    );
    assert.notEqual(tokens.at(0)?.inserted, true);
    assert.notEqual(tokens.at(-1)?.inserted, true);
  }
});

test("HumanEval 输入/题目切换重置步进与参考，测试必须主动揭示，快速重复操作有界", () => {
  const scope = effectScope();
  const selected = ref<unknown>("HumanEval/0");
  const getCase = () => findHumanEvalCase(selected.value);
  const getExamples = () =>
    getCase() ? allExamples[humanEvalCases.indexOf(getCase()!)] : [];
  const state = scope.run(() => useHumanEvalWorkbench(getCase, getExamples))!;
  try {
    assert.equal(state.example.value?.id, "prompt-2");
    assert.equal(state.testsRevealed.value, false);
    assert.equal(state.solutionRevealed.value, false);
    state.selectExample("test-1");
    assert.equal(state.example.value?.id, "prompt-2");
    state.toggleTests();
    state.selectExample("test-1");
    state.seek(10000);
    assert.equal(state.step.value, state.length.value);
    state.solutionRevealed.value = true;
    state.selectExample("test-2");
    assert.equal(state.step.value, 0);
    assert.equal(state.solutionRevealed.value, false);
    state.solutionRevealed.value = true;
    state.toggleTests();
    assert.equal(state.example.value?.id, "prompt-2");
    assert.equal(state.solutionRevealed.value, false);
    for (const id of ["HumanEval/5", "HumanEval/3", "missing", "HumanEval/0"]) {
      state.solutionRevealed.value = true;
      state.testsRevealed.value = true;
      selected.value = id;
      assert.equal(state.testsRevealed.value, false);
      assert.equal(state.solutionRevealed.value, false);
      assert.equal(state.step.value, 0);
    }
    state.seek(-100);
    assert.equal(state.step.value, 0);
    state.seek(NaN);
    assert.equal(state.step.value, 0);
    state.seek(0.5);
    assert.equal(state.step.value, 0);
    state.seek(1);
    state.selectExample("prompt-2");
    assert.equal(state.step.value, 0);
  } finally {
    scope.stop();
  }
});

test("HumanEval 无编号选首题，未知/畸形编号不冒充首题，指南不受影响", () => {
  for (const id of [undefined, null, ""])
    assert.equal(findHumanEvalCase(id)?.sampleId, "HumanEval/0");
  for (const id of ["missing", ["HumanEval/0"], 2]) {
    assert.equal(findHumanEvalCase(id), undefined);
    assert.equal(
      isUnknownHumanEvalSample("human-eval", id, fixture.samples),
      true,
    );
    assert.equal(
      isUnknownHumanEvalSample("human-eval", id, fixture.samples, "/guide/"),
      false,
    );
    assert.equal(
      isUnknownHumanEvalSample("arc-agi-2", id, fixture.samples),
      false,
    );
  }
  assert.equal(isUnknownHumanEvalSample("human-eval", "missing"), false);
});

test("HumanEval 上下共用题目URL，保留查询参数、支持刷新/前进后退并清除答案状态", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(fixture));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/human-eval/", component: { template: "<div />" } },
      { path: "/guide/", component: { template: "<div />" } },
    ],
  });
  await router.push({
    path: "/benchmarks/human-eval/",
    query: { sample: "HumanEval/4", sampleView: "raw", from: "catalog" },
    hash: "#samples",
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const { viewer, location } = scope.run(() => {
    const viewer = useSampleViewer(
      () => "human-eval",
      () => true,
      "/",
    );
    return { viewer, location: createSampleLocation(router, viewer) };
  })!;
  await settle();
  assert.equal(viewer.current.value?.id, "HumanEval/4");
  assert.equal(viewer.mode.value, "raw");
  viewer.showAnswer.value = true;
  await selectSampleFromWalkthrough(router, "HumanEval/5", "push");
  await nextTick();
  assert.equal(viewer.current.value?.id, "HumanEval/5");
  assert.equal(viewer.mode.value, "read");
  assert.equal(viewer.showAnswer.value, false);
  assert.equal(router.currentRoute.value.hash, "");
  assert.equal(router.currentRoute.value.query.from, "catalog");
  await location.selectSample(1);
  await nextTick();
  assert.equal(
    findHumanEvalCase(router.currentRoute.value.query.sample)?.sampleId,
    "HumanEval/1",
  );
  assert.equal(router.currentRoute.value.hash, "#samples");
  router.back();
  await settle();
  assert.equal(viewer.current.value?.id, "HumanEval/5");
  router.back();
  await settle();
  assert.equal(viewer.current.value?.id, "HumanEval/4");
  assert.equal(viewer.mode.value, "raw");
  router.forward();
  await settle();
  assert.equal(viewer.current.value?.id, "HumanEval/5");
  viewer.showAnswer.value = true;
  await router.push("/benchmarks/human-eval/?sample=missing");
  await nextTick();
  assert.equal(viewer.index.value, -1);
  assert.equal(viewer.showAnswer.value, false);
  await selectSampleFromWalkthrough(router, "HumanEval/5", "push");
  await nextTick();
  assert.equal(viewer.showAnswer.value, false);
  await Promise.all([
    location.selectSample(0),
    location.selectSample(2),
    location.setMode("raw"),
  ]);
  await nextTick();
  assert.equal(viewer.current.value?.id, "HumanEval/2");
  assert.equal(viewer.mode.value, "raw");
  await router.push("/guide/#metrics");
  await location.selectSample(3);
  await location.setMode("raw");
  assert.equal(router.currentRoute.value.fullPath, "/guide/#metrics");
  assert.equal(viewer.current.value?.id, "HumanEval/3");
});

test("HumanEval 记录失败后重试恢复URL选题且不继承参考状态", async (t) => {
  let failed = true;
  t.mock.method(globalThis, "fetch", async () =>
    failed ? new Response(null, { status: 503 }) : Response.json(fixture),
  );
  t.mock.method(console, "error", () => {});
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/human-eval/", component: { template: "<div />" } },
    ],
  });
  await router.push("/benchmarks/human-eval/?sample=HumanEval%2F3");
  const scope = effectScope();
  t.after(() => scope.stop());
  const viewer = scope.run(() => {
    const viewer = useSampleViewer(
      () => "human-eval",
      () => true,
      "/",
    );
    createSampleLocation(router, viewer);
    return viewer;
  })!;
  const currentId = () => viewer.current.value?.id;
  await settle();
  assert.equal(viewer.error.value, true);
  assert.equal(viewer.current.value, undefined);
  failed = false;
  viewer.reload();
  viewer.reload();
  await settle();
  assert.equal(viewer.error.value, false);
  assert.equal(currentId(), "HumanEval/3");
  viewer.showAnswer.value = true;
  failed = true;
  viewer.reload();
  await settle();
  assert.equal(viewer.error.value, true);
  failed = false;
  viewer.reload();
  await settle();
  assert.equal(currentId(), "HumanEval/3");
  assert.equal(viewer.showAnswer.value, false);
});

test("HumanEval 在案例卡内显示可选图解，公开测试和参考答案分别揭示", async () => {
  const read = (path: string) =>
    readFile(new URL("../" + path, import.meta.url), "utf8");
  const [pilot, scene, css, viewer, detail] = await Promise.all([
    read("src/components/HumanEvalPilot.vue"),
    read("src/components/HumanEvalScene.vue"),
    read("src/styles/human-eval-pilot.css"),
    read("src/components/SampleViewer.vue"),
    read("src/views/DetailView.vue"),
  ]);
  assert.match(pilot, /查看函数行为图解/);
  assert.match(pilot, /不执行 Python/);
  assert.match(pilot, /v-if="testsRevealed"/);
  assert.match(pilot, /record\.test/);
  assert.match(viewer, /current\.answer && showAnswer/);
  assert.match(viewer, /含参考代码与测试/);
  assert.match(viewer, /:href="current.source"/);
  assert.match(scene, /:data-scene="kind"/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /focus-visible/);
  assert.match(detail, /"human-eval": HumanEvalPilot/);
});

test("HumanEval 参考按钮焦点不被面板裁剪，跳过操作文字保留完整对比度", async () => {
  const css = await readFile(
    new URL("../src/styles/human-eval-pilot.css", import.meta.url),
    "utf8",
  );
  const scene = await readFile(
    new URL("../src/styles/human-eval-scene.css", import.meta.url),
    "utf8",
  );
  const panel = css.match(/\.he-solution-panel\s*\{([^}]+)\}/)?.[1] || "";
  const skipped =
    scene.match(/\.he-operation-strip \.skipped\s*\{([^}]+)\}/)?.[1] || "";
  assert.ok(panel);
  assert.doesNotMatch(panel, /overflow:\s*(hidden|clip)/);
  assert.ok(skipped);
  assert.doesNotMatch(skipped, /opacity:/);
  assert.match(skipped, /border-style: dashed/);
});

test("HumanEval 距离显示简洁近似值但不改变判断，舍入碰到阈值时保留原精度", () => {
  const display = distanceDisplay(Math.abs(2.8 - 3), 0.3);
  assert.equal(display.text, "0.2");
  assert.equal(display.approximate, true);
  assert.equal(display.raw, "0.20000000000000018");
  assert.equal(display.retainPrecision, false);
  assert.deepEqual(distanceDisplay(1, 1), {
    text: "1",
    approximate: false,
    raw: "1",
    retainPrecision: false,
  });
  for (const [distance, threshold] of [
    [0.9999999999999996, 1],
    [1.0000000000000002, 1],
    [0.20000004, 0.20000002],
  ]) {
    const display = distanceDisplay(distance, threshold);
    assert.equal(display.text, String(distance));
    assert.equal(display.approximate, false);
    assert.equal(display.retainPrecision, true);
  }
  for (const example of allExamples[0]) {
    for (const pair of distanceTrace(
      example.args[0] as number[],
      example.args[1] as number,
    )) {
      const display = distanceDisplay(pair.distance, example.args[1] as number);
      assert.equal(
        Number(display.text) < (example.args[1] as number),
        pair.close,
      );
      assert.equal(display.raw, String(pair.distance));
    }
  }
});

test("HumanEval 中屏括号图标不换行", async () => {
  assert.equal(humanEvalCases[1].glyph, "()");
  const css = await readFile(
    new URL("../src/styles/human-eval-pilot.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /\.he-case-glyph\s*\{[^}]*white-space: nowrap/);
});
