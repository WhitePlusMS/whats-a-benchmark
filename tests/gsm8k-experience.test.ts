import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { effectScope, nextTick, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  gsm8kCases,
  findGsm8kCase,
  readGsm8kRecord,
  extractGsm8kAnswer,
  checkGsm8kAnswer,
  isUnknownGsm8kSample,
} from "../src/content/gsm8kExperience";
import { useGsm8kWorkbench } from "../src/composables/gsm8kWorkbench";
import {
  createSampleLocation,
  selectSampleFromWalkthrough,
} from "../src/lib/sampleLocation";
import {
  createDeferredDetailAnchor,
  shouldWaitForDetailLayout,
} from "../src/lib/deferredDetailAnchor";
import type { SampleFile } from "../src/types/benchmark";
const source = JSON.parse(
  await readFile(
    new URL("../content/benchmarks/gsm8k.json", import.meta.url),
    "utf8",
  ),
);
const fixture: SampleFile = { benchmarkId: "gsm8k", ...source.sampleSet };
const read = (path: string) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("GSM8K 七场景逐一对应七条原文、固定版本行号和许可，参考数值正确", () => {
  assert.deepEqual(
    gsm8kCases.map((c) => c.sampleId),
    fixture.samples.map((s) => s.id),
  );
  assert.equal(new Set(gsm8kCases.map((c) => c.kind)).size, 7);
  assert.deepEqual(
    fixture.samples.map((s) => extractGsm8kAnswer(s.answer!)),
    ["18", "3", "70000", "540", "160", "366", "7"],
  );
  fixture.samples.forEach((s, i) => {
    const raw = readGsm8kRecord(s.raw)!;
    assert.equal(raw.question, s.prompt);
    assert.equal(raw.answer, s.answer);
    assert.ok(s.source.endsWith(`#L${gsm8kCases[i].index + 1}`));
    assert.ok(s.source.includes("3101c7d5072418e28b9008a6636bde82a006892c"));
    assert.equal(s.licensePath, "licenses/gsm8k.txt");
    assert.equal(s.excerpt, false);
  });
  assert.equal((16 - 3 - 4) * 2, 18);
  assert.equal(2 + 2 / 2, 3);
  assert.equal(80000 * (1 + 1.5) - (80000 + 50000), 70000);
  assert.equal(3 * 3 * 60, 540);
  assert.equal((200 * 0.4) / 2 + 20 + 200 / 2, 160);
  assert.equal(60 + 180 + 180 * 0.7, 366);
  assert.equal((3 * 7 * 4) / 12, 7);
  assert.match(fixture.samples[3].explanation!, /3 次/);
  assert.match(fixture.samples[4].prompt!, /How load/);
});

test("GSM8K 提取原始首个匹配，不数值归一、不取最后一条、不校验思路", () => {
  assert.equal(extractGsm8kAnswer("#### 70,000"), "70000");
  assert.equal(checkGsm8kAnswer("#### 18.0", "#### 18").matches, false);
  for (const text of ["18", "####18", "#### $18", "####\n18"])
    assert.equal(extractGsm8kAnswer(text), null);
  assert.equal(extractGsm8kAnswer("#### 3\n#### 18"), "3");
  assert.equal(extractGsm8kAnswer("#### invalid\n#### -2"), "-2");
  assert.equal(
    checkGsm8kAnswer("wrong reasoning\n#### 18", "#### 18").matches,
    true,
  );
  assert.equal(extractGsm8kAnswer("#### 1.2.3"), "1.2.3"); // original regex is not a numeric parser
  assert.equal(extractGsm8kAnswer("#### 18 dollars"), "18");
  assert.equal(readGsm8kRecord({ question: "q", answer: "no marker" }), null);
});

test("GSM8K 默认隐藏答案，步进有界，换题与未知题立即重置练习和揭示", () => {
  const scope = effectScope();
  scope.run(() => {
    const selected = ref("0");
    const state = useGsm8kWorkbench(() => findGsm8kCase(selected.value));
    assert.equal(state.step.value, 0);
    state.seek(99);
    assert.equal(state.step.value, 2);
    state.seek(NaN);
    assert.equal(state.step.value, 2);
    state.seek(-4);
    assert.equal(state.step.value, 0);
    state.draft.value = "#### 18";
    state.checked.value = true;
    state.draft.value = "#### 18.0";
    assert.equal(state.checked.value, false);
    state.seek(2);
    state.referenceRevealed.value = true;
    state.checked.value = true;
    selected.value = "2";
    assert.equal(state.step.value, 0);
    assert.equal(state.draft.value, "");
    assert.equal(state.referenceRevealed.value, false);
    assert.equal(state.checked.value, false);
    state.seek(3);
    selected.value = "missing";
    assert.equal(state.step.value, 0);
    state.seek(1);
    assert.equal(state.step.value, 0);
  });
  scope.stop();
});

test("GSM8K 已知、缺省、未知、重复 query 不偷换题，URL上下联动保留其他参数与历史", async () => {
  assert.equal(findGsm8kCase(undefined)?.sampleId, "0");
  assert.equal(findGsm8kCase("missing"), undefined);
  assert.equal(findGsm8kCase(["0", "1"]), undefined);
  assert.equal(
    isUnknownGsm8kSample(
      "gsm8k",
      ["0", "1"],
      fixture.samples,
      "/benchmarks/gsm8k/",
    ),
    true,
  );
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/gsm8k/", component: {} }],
  });
  await router.push("/benchmarks/gsm8k/?other=kept");
  await router.isReady();
  const data = ref(fixture),
    index = ref(0),
    mode = ref<"read" | "raw">("read");
  const { computed } = await import("vue");
  const current = computed(() => data.value.samples[index.value]);
  const scope = effectScope();
  const location = scope.run(() =>
    createSampleLocation(router, { data, index, mode, current }),
  )!;
  await selectSampleFromWalkthrough(router, "public-test-7", "push");
  await nextTick();
  assert.equal(index.value, 4);
  assert.equal(router.currentRoute.value.query.other, "kept");
  await location.selectSample(2);
  await nextTick();
  assert.equal(router.currentRoute.value.query.sample, "2");
  assert.equal(router.currentRoute.value.hash, "#samples");
  await location.setMode("raw");
  await nextTick();
  assert.equal(mode.value, "raw");
  await router.push("/benchmarks/gsm8k/?sample=unknown");
  await nextTick();
  assert.equal(index.value, -1);
  assert.equal(current.value, undefined);
  await router.push("/benchmarks/gsm8k/?sample=0&sample=1");
  await nextTick();
  assert.equal(index.value, -1);
  scope.stop();
});

test("GSM8K 跨页深链和无hash返回等案例布局，失败亦能完成，取消不会恢复", async () => {
  for (const suffix of ["#samples", "#score", ""]) {
    const key = "/benchmarks/gsm8k/?sample=public-test-18" + suffix;
    const anchor = createDeferredDetailAnchor();
    anchor.begin(key);
    assert.equal(shouldWaitForDetailLayout(true, !!suffix, !suffix), true);
    let done = false;
    const wait = anchor.wait(key).then((v) => (done = v));
    await Promise.resolve();
    assert.equal(done, false);
    anchor.settled(key);
    await wait;
    assert.equal(done, true);
    anchor.begin(key);
    const canceled = anchor.wait(key);
    anchor.cancel();
    anchor.settled(key);
    assert.equal(await canceled, false);
  }
  const [detail, viewer] = await Promise.all([
    read("src/views/DetailView.vue"),
    read("src/components/SampleViewer.vue"),
  ]);
  assert.ok(detail.includes("gsm8k: Gsm8kPilot"));
  assert.ok(viewer.includes("reload"));
});

test("GSM8K 仅下载题保留时间轴，答案仍由公共案例卡揭示", async () => {
  const [pilot, viewer] = await Promise.all([
    read("src/components/Gsm8kPilot.vue"),
    read("src/components/SampleViewer.vue"),
  ]);
  assert.match(pilot, /entry\?\.kind === 'download'/);
  assert.match(pilot, /revealed \? 3 : 0/);
  assert.match(viewer, /含参考推导与答案/);
  assert.match(viewer, /current\.answer && showAnswer/);
});

test("GSM8K 参考答案仅主动揭示时挂载，比例图不受标签布局压缩", async () => {
  const [pilot, viewer, css] = await Promise.all([
    read("src/components/Gsm8kPilot.vue"),
    read("src/components/SampleViewer.vue"),
    read("src/styles/gsm8k-scene.css"),
  ]);
  assert.ok(pilot.includes("revealed ? 3 : 0"));
  assert.match(viewer, /current\.answer && showAnswer/);
  assert.ok(!viewer.includes('v-show="showAnswer"'));
  assert.match(css, /\.gsm-month-plot\s*\{[^}]*height: 180px/s);
  assert.match(css, /\.gsm-timeline\s*\{[^}]*display: grid/s);
});

test("目录案例按钮直达唯一案例区", async () => {
  const card = await read("src/components/BenchmarkCard.vue");
  assert.match(card, /#samples/);
  assert.doesNotMatch(card, /#task-walkthrough/);
});

test("GSM8K 窄屏时间轴保留比例但将完整阶段说明移到独立可读图例", async () => {
  const [scene, css] = await Promise.all([
    read("src/components/Gsm8kScene.vue"),
    read("src/styles/gsm8k-scene.css"),
  ]);
  assert.ok(scene.includes("minmax(0, 2fr) minmax(0, 1fr) minmax(0, 5fr)"));
  assert.ok(scene.includes("时间轴说明，单位为分钟"));
  for (const label of ["① 首次下载", "② 系统重启", "③ 完整重下"])
    assert.ok(scene.includes(label));
  assert.match(css, /\.gsm-time-key\s*\{[^}]*display: grid/s);
  assert.match(css, /\.gsm-timeline strong\s*\{[^}]*white-space: nowrap/s);
});

test("GSM8K 区分原始代码仓库归档与数据集使用状态", () => {
  const note = source.limitations.find((item: { text: string }) =>
    item.text.includes("2026-04-08"),
  );
  assert.ok(note);
  assert.match(note.text, /只读/);
  assert.match(note.text, /不等于数据集停止使用/);
  assert.match(note.text, /不表示 GSM8K 已弃用/);
  assert.ok(
    note.sourceUrls[0].includes("3101c7d5072418e28b9008a6636bde82a006892c"),
  );
});
