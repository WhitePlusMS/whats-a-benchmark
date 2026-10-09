import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeName,
  recognizeNames,
  searchBenchmarks,
} from "../src/lib/search";

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
  for (const [label, id] of expected)
    assert.deepEqual(
      recognizeNames(label)[0]?.matches.map((item) => item.id),
      [id],
    );
});

test("发布图中的大小写、空格和连字符差异不影响名称识别", () => {
  assert.equal(
    normalizeName("ＳＷＥ–bench Verified"),
    normalizeName("swe_bench verified"),
  );
  assert.equal(searchBenchmarks("GPQA Diamond")[0]?.id, "gpqa-diamond");
  assert.equal(searchBenchmarks("人类最后的考试")[0]?.id, "hle");
});
test("保留年份和版本差异，不把不同考试混为一谈", () => {
  assert.equal(recognizeNames("AIME 2024")[0]?.matches[0]?.id, "aime-2024");
  assert.equal(recognizeNames("AIME 2025")[0]?.matches[0]?.id, "aime-2025");
  assert.notEqual(normalizeName("tau-bench"), normalizeName("tau2-bench"));
  assert.equal(recognizeNames("OpenAI MRCR")[0]?.matches[0]?.id, "mrcr");
  assert.equal(
    recognizeNames("DeepMind MRCR v2")[0]?.matches[0]?.id,
    "mrcr-v2",
  );
  assert.deepEqual(
    recognizeNames("MRCR v2")[0]?.matches.map((item) => item.id),
    ["mrcr-v2"],
  );
});
test("批量粘贴能处理中文分隔符、重复值和未收录名称", () => {
  const rows = recognizeNames("HLE，GPQA Diamond;HLE\n未收录的测试 xyz987");
  assert.equal(rows.length, 3);
  assert.equal(rows[0]?.matches[0]?.id, "hle");
  assert.equal(rows[2]?.matches.length, 0);
  assert.equal(
    recognizeNames(Array.from({ length: 90 }, (_, i) => String(i)).join("\n"))
      .length,
    60,
  );
});

test("批量识别忽略标准化后为空的名称，普通空搜索仍返回全部目录", () => {
  const rows = recognizeNames("-;___");
  assert.deepEqual(
    rows.map((row) => row.input),
    ["-", "___"],
  );
  assert.ok(rows.every((row) => row.matches.length === 0));
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
  assert.deepEqual(
    recognizeNames(labels.join("\n")).map((row) =>
      row.matches.map((item) => item.id),
    ),
    ids.map((id) => [id]),
  );
  assert.equal(
    recognizeNames("Terminal-Bench 2.0")[0]?.matches[0]?.id,
    "terminal-bench-2",
  );
  assert.equal(recognizeNames("OSWorld")[0]?.matches[0]?.id, "osworld");
  assert.equal(recognizeNames("GDPval-AA")[0]?.matches[0]?.id, "gdpval-aa");
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
  for (const [label, id] of expected)
    assert.deepEqual(
      recognizeNames(label)[0]?.matches.map((item) => item.id),
      [id],
    );
  assert.notEqual(
    recognizeNames("Terminal-Bench 2.0")[0]?.matches[0]?.id,
    recognizeNames("Terminal-Bench 2.1")[0]?.matches[0]?.id,
  );
  assert.notEqual(
    recognizeNames("Terminal-Bench 2.1")[0]?.matches[0]?.id,
    recognizeNames("Terminal-Bench 4.0")[0]?.matches[0]?.id,
  );
});
