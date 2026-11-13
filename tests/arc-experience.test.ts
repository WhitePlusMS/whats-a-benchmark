import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { effectScope, nextTick, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  arcCases,
  findArcCase,
  isUnknownArcSample,
} from "../src/content/arcExperience";
import {
  arcColors,
  arcSymbolInk,
  cloneGrid,
  exactGridMatch,
  gridDifferences,
  isArcGrid,
  resizeGrid,
} from "../src/lib/arcGrid";
import { useArcGridCursor } from "../src/composables/arcGridCursor";
import { useArcPractice } from "../src/composables/arcPractice";
import { useSampleViewer } from "../src/composables/sampleViewer";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import type { SampleFile } from "../src/types/benchmark";
const source = JSON.parse(
  await readFile(
    new URL("../content/benchmarks/arc-agi-2.json", import.meta.url),
    "utf8",
  ),
);
const fixture: SampleFile = { benchmarkId: "arc-agi-2", ...source.sampleSet };
const settle = async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
};

test("ARC 工作台四题对应完整公开 training 矩阵，不包含自造网格", () => {
  assert.deepEqual(
    arcCases.map((item) => item.sampleId),
    fixture.samples.map((item) => item.id),
  );
  assert.deepEqual(
    fixture.samples.map((item) => item.gridTask?.train.length),
    [2, 2, 5, 5],
  );
  assert.equal(arcColors.length, 10);
  for (const sample of fixture.samples) {
    assert.match(sample.source, /ARC-AGI-2\/blob\/.+\/data\/training\//);
    assert.match(sample.license, /Apache-2.0/);
    assert.deepEqual(sample.gridTask, sample.raw);
    assert.equal(sample.gridTask!.test.length, 1);
    for (const pair of [...sample.gridTask!.train, ...sample.gridTask!.test]) {
      assert.equal(isArcGrid(pair.input), true);
      assert.equal(isArcGrid(pair.output), true);
      assert.equal(exactGridMatch(pair.output, cloneGrid(pair.output)), true);
    }
  }
});

test("ARC 无参数选首题，未知或畸形编号不冒充首题，指南保持原行为", () => {
  for (const id of [undefined, null, ""]) {
    assert.equal(findArcCase(id)?.sampleId, "6e19193c");
    assert.equal(isUnknownArcSample("arc-agi-2", id, fixture.samples), false);
  }
  for (const id of ["not-found", ["6e19193c"], 1]) {
    assert.equal(findArcCase(id), undefined);
    assert.equal(isUnknownArcSample("arc-agi-2", id, fixture.samples), true);
    assert.equal(
      isUnknownArcSample("arc-agi-2", id, fixture.samples, "/guide/"),
      false,
    );
    assert.equal(isUnknownArcSample("roboquest", id, fixture.samples), false);
  }
  assert.equal(isUnknownArcSample("arc-agi-2", "unknown"), false);
});

test("ARC 精确匹配要求尺寸和每格均相同，异尺寸不伪造逐格差异", () => {
  const a = [
    [0, 1],
    [2, 3],
  ];
  assert.equal(
    exactGridMatch(a, [
      [0, 1],
      [2, 3],
    ]),
    true,
  );
  assert.equal(
    exactGridMatch(a, [
      [0, 1],
      [2, 4],
    ]),
    false,
  );
  assert.equal(exactGridMatch(a, [[0, 1, 2, 3]]), false);
  assert.deepEqual(
    gridDifferences(a, [
      [0, 1],
      [2, 4],
    ]),
    [
      [false, false],
      [false, true],
    ],
  );
  assert.equal(gridDifferences(a, [[0, 1, 2, 3]]), null);
  assert.deepEqual(resizeGrid(a, 3, 3), [
    [0, 1, 0],
    [2, 3, 0],
    [0, 0, 0],
  ]);
  assert.deepEqual(resizeGrid(a, 1, 1), [[0]]);
  for (const value of [0, -1, 31, 1.5, NaN, Infinity])
    assert.equal(resizeGrid(a, value, 2), null);
  for (const invalid of [
    [],
    [[]],
    [[0], [1, 2]],
    [[10]],
    [[-1]],
    [[0.5]],
    [[NaN]],
    [["0"]],
  ])
    assert.equal(isArcGrid(invalid), false);
});

test("ARC 四题练习初始尺寸只取输入，检查不揭示答案，编辑和切题正确重置", () => {
  const scope = effectScope();
  const index = ref(0);
  const original = JSON.stringify(fixture.samples);
  const practice = scope.run(() =>
    useArcPractice(
      () => fixture.samples[index.value]!.gridTask!.test[0]!,
      () => fixture.samples[index.value]!.id,
    ),
  )!;
  try {
    for (let i = 0; i < fixture.samples.length; i++) {
      index.value = i;
      const pair = fixture.samples[i]!.gridTask!.test[0]!;
      assert.deepEqual(
        practice.draft.value,
        pair.input.map((row) => row.map(() => 0)),
      );
      assert.equal(practice.revealed.value, false);
      assert.equal(practice.checked.value, null);
      assert.equal(practice.history.value.length, 0);
      practice.check();
      assert.equal(practice.checked.value, false);
      assert.equal(practice.revealed.value, false);
      practice.copyInput();
      assert.deepEqual(practice.draft.value, pair.input);
      assert.equal(practice.checked.value, null);
      practice.paint(0, 0, 9);
      assert.notDeepEqual(practice.draft.value, pair.input);
      practice.undo();
      assert.deepEqual(practice.draft.value, pair.input);
      practice.resize(pair.output.length, pair.output[0]!.length);
      for (const [y, row] of pair.output.entries())
        for (const [x, color] of row.entries()) practice.paint(y, x, color);
      practice.check();
      assert.equal(practice.checked.value, true);
      assert.equal(practice.revealed.value, false);
      practice.reveal();
      assert.equal(practice.revealed.value, true);
      practice.paint(0, 0, (pair.output[0]![0]! + 1) % 10);
      assert.equal(practice.checked.value, null);
      practice.check();
      assert.equal(practice.checked.value, false);
      practice.undo();
      practice.check();
      assert.equal(practice.checked.value, true);
      assert.equal(practice.revealed.value, true);
      practice.color.value = 9;
    }
    practice.reset();
    assert.equal(practice.checked.value, null);
    assert.equal(practice.revealed.value, false);
    assert.equal(practice.color.value, 0);
    assert.equal(practice.history.value.length, 0);
    assert.equal(JSON.stringify(fixture.samples), original);
  } finally {
    scope.stop();
  }
});

test("ARC 画板拒绝非法尺寸/颜色，支持清空撤销和有界历史", () => {
  const scope = effectScope();
  const practice = scope.run(() =>
    useArcPractice(
      () => fixture.samples[1]!.gridTask!.test[0]!,
      () => "00576224",
    ),
  )!;
  try {
    const before = cloneGrid(practice.draft.value);
    for (const value of [0, 31, 1.5, NaN])
      assert.equal(practice.resize(value, 2), false);
    for (const value of [-1, 10, 2.5, NaN]) practice.paint(0, 0, value);
    practice.paint(-1, 0, 1);
    practice.paint(0, 100, 1);
    assert.deepEqual(practice.draft.value, before);
    assert.equal(practice.history.value.length, 0);
    practice.copyInput();
    practice.clear();
    assert.deepEqual(practice.draft.value, before);
    practice.undo();
    assert.deepEqual(
      practice.draft.value,
      fixture.samples[1]!.gridTask!.test[0]!.input,
    );
    for (let n = 0; n < 100; n++) practice.paint(0, 0, n % 10);
    assert.equal(practice.history.value.length, 50);
    assert.equal(practice.resize(30, 30), true);
    assert.equal(practice.draft.value.length, 30);
    assert.equal(practice.draft.value[0]!.length, 30);
  } finally {
    scope.stop();
  }
});

test("ARC 上下选题共享 URL，刷新恢复，前进后退回到正确题目且隐藏答案", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(fixture));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/arc-agi-2/", component: { template: "<div />" } },
    ],
  });
  await router.push({
    path: "/benchmarks/arc-agi-2/",
    query: { sample: "00576224", sampleView: "raw", from: "catalog" },
    hash: "#samples",
  });
  const scope = effectScope();
  t.after(() => scope.stop());
  const { viewer, location } = scope.run(() => {
    const viewer = useSampleViewer(
      () => "arc-agi-2",
      () => true,
      "/",
    );
    return { viewer, location: createSampleLocation(router, viewer) };
  })!;
  await settle();
  assert.equal(viewer.current.value?.id, "00576224");
  assert.equal(viewer.mode.value, "raw");
  viewer.showAnswer.value = true;
  await selectSampleFromWalkthrough(router, "007bbfb7", "push");
  await nextTick();
  assert.equal(viewer.current.value?.id, "007bbfb7");
  assert.equal(viewer.mode.value, "read");
  assert.equal(viewer.showAnswer.value, false);
  assert.equal(router.currentRoute.value.hash, "");
  assert.equal(router.currentRoute.value.query.from, "catalog");
  await location.selectSample(3);
  await nextTick();
  assert.equal(
    findArcCase(router.currentRoute.value.query.sample)?.sampleId,
    "009d5c81",
  );
  assert.equal(router.currentRoute.value.hash, "#samples");
  viewer.showAnswer.value = true;
  router.back();
  await settle();
  assert.equal(viewer.current.value?.id, "007bbfb7");
  assert.equal(viewer.showAnswer.value, false);
  router.back();
  await settle();
  assert.equal(viewer.current.value?.id, "00576224");
  assert.equal(viewer.mode.value, "raw");
  router.forward();
  await settle();
  assert.equal(viewer.current.value?.id, "007bbfb7");
  await router.push({
    path: "/benchmarks/arc-agi-2/",
    query: { sample: "unknown" },
  });
  await nextTick();
  assert.equal(findArcCase(router.currentRoute.value.query.sample), undefined);
  assert.equal(
    isUnknownArcSample(
      "arc-agi-2",
      router.currentRoute.value.query.sample,
      viewer.data.value?.samples,
    ),
    true,
  );
  await selectSampleFromWalkthrough(router, "6e19193c", "push");
  await nextTick();
  assert.equal(viewer.current.value?.id, "6e19193c");
  assert.equal(
    isUnknownArcSample(
      "arc-agi-2",
      router.currentRoute.value.query.sample,
      viewer.data.value?.samples,
    ),
    false,
  );
});

test("ARC 保留原始矩阵与来源入口；参考只在明确揭示后渲染，支持键盘和减少动态", async () => {
  const read = (path: string) =>
    readFile(new URL(`../${path}`, import.meta.url), "utf8");
  const [pilot, practice, editor, rawViewer, shared, styles, details, card] =
    await Promise.all([
      read("src/components/ArcAgiPilot.vue"),
      read("src/components/ArcPractice.vue"),
      read("src/components/ArcGridEditor.vue"),
      read("src/components/SampleViewer.vue"),
      read("src/components/ArcTask.vue"),
      read("src/styles/arc-pilot.css"),
      read("src/views/DetailView.vue"),
      read("src/components/BenchmarkCard.vue"),
    ]);
  assert.match(rawViewer, /:href="current.source"/);
  assert.match(pilot, /:sample-id="sample.id"/);
  assert.match(pilot, /不将放大后的画面对齐/);
  assert.match(practice, /v-if="revealed" class="arc-reference"/);
  assert.match(practice, /revealed.value \? gridDifferences/);
  assert.match(practice, /不运行模型，不计正式成绩/);
  assert.match(practice, /重开练习/);
  assert.match(editor, /role="grid"/);
  assert.match(editor, /ArrowRight/);
  assert.match(editor, /ArrowLeft/);
  assert.match(editor, /ArrowUp/);
  assert.match(editor, /ArrowDown/);
  assert.match(editor, /role="gridcell"/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /animation: none/);
  assert.match(rawViewer, /含参考输出/);
  assert.match(rawViewer, /没有匹配此编号的样例/);
  assert.match(shared, /<ArcGrid/);
  assert.match(details, /"arc-agi-2": ArcAgiPilot/);
  assert.match(card, /#samples/);
});

test("ARC 非首格绘色不会重置键盘 Tab 位置，实际尺寸变动才重置", async () => {
  const scope = effectScope();
  const grid = ref([
    [0, 0],
    [0, 0],
  ]);
  const cursor = scope.run(() => useArcGridCursor(() => grid.value))!;
  try {
    cursor.value = 3;
    grid.value = [
      [0, 0],
      [0, 7],
    ];
    await nextTick();
    assert.equal(cursor.value, 3);
    grid.value = [
      [0, 0],
      [0, 0],
    ];
    await nextTick();
    assert.equal(cursor.value, 3);
    grid.value = [[0, 0, 0]];
    await nextTick();
    assert.equal(cursor.value, 0);
  } finally {
    scope.stop();
  }
});

test("ARC 每个颜色上的小数字对比度至少 4.5:1，深浅主题均沿用原始色板", () => {
  function luminance(hex: string) {
    const full =
      hex.length === 4
        ? "#" + [...hex.slice(1)].map((c) => c + c).join("")
        : hex;
    const linear = [1, 3, 5]
      .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
  }
  for (const [index, hex] of arcColors.entries()) {
    const a = luminance(hex),
      b = luminance(arcSymbolInk(index));
    const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    assert.ok(contrast >= 4.5, `Color ${index}: ${contrast}`);
  }
});

test("ARC 首题揭晓后经过未知编号再返回，原题查看器也重新隐藏答案", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(fixture));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/benchmarks/arc-agi-2/", component: { template: "<div />" } },
    ],
  });
  await router.push("/benchmarks/arc-agi-2/?sample=6e19193c");
  const scope = effectScope();
  t.after(() => scope.stop());
  const viewer = scope.run(() => {
    const viewer = useSampleViewer(
      () => "arc-agi-2",
      () => true,
      "/",
    );
    createSampleLocation(router, viewer);
    return viewer;
  })!;
  await settle();
  viewer.showAnswer.value = true;
  await router.push("/benchmarks/arc-agi-2/?sample=missing");
  await nextTick();
  assert.equal(viewer.index.value, -1);
  assert.equal(viewer.showAnswer.value, false);
  await selectSampleFromWalkthrough(router, "6e19193c", "push");
  await nextTick();
  assert.equal(viewer.current.value?.id, "6e19193c");
  assert.equal(viewer.showAnswer.value, false);
});

test("ARC 作答与参考使用同一格尺度，较宽参考只在局部滚动", async () => {
  const editor = await readFile(
    new URL("../src/components/ArcGridEditor.vue", import.meta.url),
    "utf8",
  );
  const practice = await readFile(
    new URL("../src/components/ArcPractice.vue", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../src/styles/arc-practice.css", import.meta.url),
    "utf8",
  );
  const { arcCellSize } = await import("../src/lib/arcGrid");
  assert.equal(arcCellSize, 28);
  assert.match(editor, /'--cell-size': `\$\{arcCellSize\}px`/);
  assert.match(editor, /repeat\(var\(--columns\), var\(--cell-size\)\)/);
  assert.match(practice, /pair.output\[0\].length \* arcCellSize \+ 2/);
  assert.match(practice, /pair.output.length \* arcCellSize \+ 2/);
  assert.match(practice, /class="arc-reference-scroll"/);
  assert.match(
    css,
    /\.arc-reference-scroll\s*\{[^}]*overflow: auto;[^}]*max-width: 100%;/,
  );
  assert.match(
    css,
    /\.arc-reference :deep\(\.arc-grid\)\s*\{[^}]*max-height: none;[^}]*max-width: none;/,
  );
});
