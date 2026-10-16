import test from "node:test";
import assert from "node:assert/strict";
import { normalizeName, searchBenchmarks } from "../src/lib/search";

function firstId(query: string) {
  return searchBenchmarks(query)[0]?.id;
}

test("指数、AA实施与原版名称各自识别，Terminal-Bench版本不混合", () => {
  const expected = new Map([
    ["AA 智能指数", "aa-intelligence-index"],
    ["AA-Briefcase", "aa-briefcase"],
    ["AA-Omniscience", "aa-omniscience"],
    ["AA-LCR", "aa-lcr"],
    ["GDP.pdf", "gdp-pdf"],
    ["GDPval", "gdpval"],
    ["CritPt", "critpt"],
    ["AutomationBench-AA", "automationbench-aa"],
    ["AutomationBench", "automationbench"],
    ["Terminal-Bench 3.0", "terminal-bench-3"],
    ["Terminal-Bench 4.0", "terminal-bench-4"],
  ]);
  for (const [label, id] of expected) assert.equal(firstId(label), id);
});

test("发布图中的大小写、空格和连字符差异不影响名称识别", () => {
  assert.equal(
    normalizeName("ＳＷＥ–bench Verified"),
    normalizeName("swe_bench verified"),
  );
  assert.equal(firstId("GPQA Diamond"), "gpqa-diamond");
  assert.equal(firstId("人类最后的考试"), "hle");
});
test("保留年份和版本差异，不把不同考试混为一谈", () => {
  assert.equal(firstId("AIME 2024"), "aime-2024");
  assert.equal(firstId("AIME 2025"), "aime-2025");
  assert.notEqual(normalizeName("tau-bench"), normalizeName("tau2-bench"));
  assert.equal(firstId("OpenAI MRCR"), "mrcr");
  assert.equal(firstId("DeepMind MRCR v2"), "mrcr-v2");
  assert.equal(firstId("MRCR v2"), "mrcr-v2");
  // 普通空搜索返回全部目录。
  assert.ok(searchBenchmarks("").length > 0);
});

test("官方 Opus 5.5 表中九个名称精确识别，旧版不替代新版本", () => {
  // 使用发布表的原始拼写，特别保留 Main 括号及版本号。
  const labels = [
    "Terminal-Bench 4.0",
    "FrontierCode v1.1 (Main)",
    "CursorBench 4.0",
    "GDPval-AA v2.1",
    "AutomationBench",
    "Humanity’s Last Exam",
    "Terminal-Bench-Science 0.1",
    "OSWorld 2.0",
    "Chartography",
  ];
  const ids = [
    "terminal-bench-4",
    "frontiercode-1-1-main",
    "cursorbench-4",
    "gdpval-aa-v2-1",
    "automationbench",
    "hle",
    "terminal-bench-science-0-1",
    "osworld-2",
    "chartography",
  ];
  labels.forEach((label, index) => assert.equal(firstId(label), ids[index]));
  assert.equal(firstId("Terminal-Bench 2.0"), "terminal-bench-2");
  assert.equal(firstId("OSWorld"), "osworld");
  assert.equal(firstId("GDPval-AA"), "gdpval-aa");
});

test("国内模型发布页中的新增名称能唯一识别，版本不会串线", () => {
  // 覆盖本轮六家发布资料反复出现且完成一手来源审核的名称。
  const expected = new Map([
    ["DeepSWE v1.1", "deep-swe-v1-1"],
    ["Toolathlon Verified", "toolathlon-verified"],
    ["NL2Repo-Bench", "nl2repo-bench"],
    ["PaperBench", "paperbench"],
    ["BabyVision", "babyvision"],
    ["SkillsBench v1.1", "skillsbench"],
    ["IFBench", "ifbench"],
    ["Terminal-Bench 2.1", "terminal-bench-2-1"],
    ["Vending Bench 2", "vending-bench-2"],
  ]);
  for (const [label, id] of expected) assert.equal(firstId(label), id);
  assert.notEqual(firstId("Terminal-Bench 2.0"), firstId("Terminal-Bench 2.1"));
  assert.notEqual(firstId("Terminal-Bench 2.1"), firstId("Terminal-Bench 4.0"));
});
