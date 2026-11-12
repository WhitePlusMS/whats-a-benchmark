/** TypeScript teaching adaptation of Google Research IFEval (Apache-2.0).
 * Copyright 2024 The Google Research Authors. Adapted for this site in 2026.
 * Source: google-research/google-research @ 26d8ccdab6fec61b5c83ad6327ea8bda9e580288,
 * instruction_following_eval/{instructions,evaluation_main}.py.
 * License retained in content/assets/licenses/google-research.txt.
 * This is a bounded teaching adaptation, NOT the complete official Python harness.
 */
export const ifevalRevision = "26d8ccdab6fec61b5c83ad6327ea8bda9e580288";
export const ifevalSourceRoot = `https://github.com/google-research/google-research/blob/${ifevalRevision}/instruction_following_eval/`;
export const ifevalCases = [
  {
    sampleId: "1001",
    key: 1001,
    label: "一枚逗号的差别",
    line: 2,
    note: "任务还要求旅行内容与莎士比亚风格；这条检查器不判断这两件事。",
  },
  {
    sampleId: "1005",
    key: 1005,
    label: "填满十二个槽位",
    line: 3,
    note: "数的是方括号匹配次数，不是简历质量，也不要求字段互不相同。",
  },
  {
    sampleId: "ifeval-1000",
    key: 1000,
    label: "三种约束一起过",
    line: 1,
    note: "本站没有所链接的 Wikipedia 正文。演示片段不是摘要，也不是模型回答。",
  },
  {
    sampleId: "ifeval-1012",
    key: 1012,
    label: "复述 ≠ 完成请求",
    line: 4,
    note: "仅引用数据集里的请求来观察格式边界。本站不撰写或发送辞职邮件。",
  },
  {
    sampleId: "ifeval-1021",
    key: 1021,
    label: "段标与大写热区",
    line: 7,
    note: "只观察文本形式，不作法律评价。英语识别依赖未运行，不能给此题完整通过结论。",
  },
  {
    sampleId: "ifeval-1069",
    key: 1069,
    label: "找词，再数词",
    line: 10,
    note: "中性重复词用于演示阈值，不是邮件模板，也没有发送任何内容。",
  },
] as const;
export type IfevalCase = (typeof ifevalCases)[number];
export type CheckState = "pass" | "fail" | "unknown";
export type IfevalRecord = {
  key: number;
  prompt: string;
  instruction_id_list: string[];
  kwargs: Record<string, unknown>[];
};
export function findIfevalCase(id: unknown) {
  return id === undefined || id === null || id === ""
    ? ifevalCases[0]
    : ifevalCases.find((c) => c.sampleId === id);
}
export function isUnknownIfevalSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "ifeval" &&
    (!path || path === "/benchmarks/ifeval/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((s) => s.id === id)
  );
}
export function readIfevalRecord(raw: unknown): IfevalRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (
    typeof r.key !== "number" ||
    typeof r.prompt !== "string" ||
    !Array.isArray(r.instruction_id_list) ||
    !r.instruction_id_list.every((x) => typeof x === "string") ||
    !Array.isArray(r.kwargs) ||
    r.kwargs.length !== r.instruction_id_list.length ||
    !r.kwargs.every((x) => x && typeof x === "object" && !Array.isArray(x))
  )
    return null;
  return r as IfevalRecord;
}
// Python str.strip whitespace; deliberately not JS trim (which also strips BOM).
export const pythonStrip = (s: string) =>
  s.replace(
    /^[\u0009-\u000d\u001c-\u0020\u0085\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]+|[\u0009-\u000d\u001c-\u0020\u0085\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
    "",
  );
export const isAscii = (s: string) => /^[\x00-\x7f]*$/.test(s);
export type Match = { text: string; start: number; end: number };
function matches(s: string, re: RegExp): Match[] {
  return Array.from(s.matchAll(re), (m) => ({
    text: m[0],
    start: m.index!,
    end: m.index! + m[0].length,
  }));
}
export function placeholders(s: string) {
  return matches(s, /\[[^\n]*?\]/g);
}
export function highlights(s: string) {
  return [
    ...matches(s, /\*[^\n*]*\*/g).filter((m) =>
      pythonStrip(m.text.replace(/^\*+|\*+$/g, "")),
    ),
    ...matches(s, /\*\*[^\n*]*\*\*/g).filter((m) =>
      pythonStrip(m.text.slice(2, -2)),
    ),
  ];
}
export function titles(s: string) {
  return matches(s, /<<[^\n]+>>/g).filter((m) =>
    pythonStrip(m.text.replace(/^<+|>+$/g, "")),
  );
}
export function asciiWords(s: string) {
  return isAscii(s) ? matches(s, /[A-Za-z0-9_]+/g) : null;
}
export function asciiSections(s: string) {
  return isAscii(s)
    ? matches(
        s,
        /[\t\n\v\f\r\x1c-\x20]?PARAGRAPH[\t\n\v\f\r\x1c-\x20]?[0-9]+[\t\n\v\f\r\x1c-\x20]?/g,
      )
    : null;
}
export const ruleLabels: Record<string, string> = {
  "punctuation:no_comma": "ASCII 逗号 = 0",
  "detectable_content:number_placeholders": "方括号匹配 ≥ 12",
  "detectable_format:number_highlighted_sections": "星号高亮 ≥ 3",
  "length_constraints:number_words": "词数下限",
  "combination:repeat_prompt": "开头复述请求",
  "detectable_format:title": "双尖括号标题",
  "change_case:english_capital": "全大写且英语",
  "detectable_format:multiple_sections": "PARAGRAPH 标记 ≥ 2",
  "keywords:existence": "两个关键词均命中",
};
export type RuleResult = {
  id: string;
  label: string;
  state: CheckState;
  detail: string;
  count?: number;
  target?: number;
  matches: Match[];
};
export function checkIfevalRule(
  id: string,
  args: Record<string, unknown>,
  text: string,
): RuleResult {
  const r: RuleResult = {
    id,
    label: ruleLabels[id] || id,
    state: "unknown",
    detail: "此规则未实现。",
    matches: [],
    target:
      typeof args.num_words === "number"
        ? args.num_words
        : typeof args.num_placeholders === "number"
          ? args.num_placeholders
          : typeof args.num_highlights === "number"
            ? args.num_highlights
            : typeof args.num_sections === "number"
              ? args.num_sections
              : undefined,
  };
  const decide = (ok: boolean, detail: string) => {
    r.state = ok ? "pass" : "fail";
    r.detail = detail;
  };
  if (!pythonStrip(text)) {
    r.state = "fail";
    r.detail = "空白回答由评测包装判为不满足。";
    return r;
  }
  const asciiOnly = () => {
    if (isAscii(text)) return true;
    r.detail = "含非 ASCII 字符；该教学子检查不判定 Unicode 边界。";
    return false;
  };
  if (id === "punctuation:no_comma") {
    r.matches = matches(text, /,/g);
    r.count = r.matches.length;
    r.target = 0;
    decide(!r.count, "仅扫描英文逗号 U+002C；中文逗号不触发。");
  } else if (id === "detectable_content:number_placeholders") {
    r.matches = placeholders(text);
    r.count = r.matches.length;
    r.target = Number(args.num_placeholders);
    decide(r.count >= r.target, "单行方括号匹配；空 [] 和重复 [x] 也计数。");
  } else if (id === "detectable_format:number_highlighted_sections") {
    r.matches = highlights(text);
    r.count = r.matches.length;
    r.target = Number(args.num_highlights);
    decide(
      r.count >= r.target,
      "两组星号正则分别匹配再相加；不是 Markdown 标题解析器。",
    );
  } else if (id === "length_constraints:number_words" && asciiOnly()) {
    r.matches = asciiWords(text)!;
    r.count = r.matches.length;
    r.target = Number(args.num_words);
    decide(
      args.relation === "at least" && r.count >= r.target,
      "仅对 ASCII 片段按字母/数字/下划线连续串计数；标点会分词。",
    );
  } else if (id === "detectable_format:multiple_sections" && asciiOnly()) {
    r.matches = asciiSections(text)!;
    r.count = r.matches.length;
    r.target = Number(args.num_sections);
    decide(
      args.section_spliter === "PARAGRAPH" && r.count >= r.target,
      "至少两个大写段标；不验证编号顺序、正文或恰好两段。",
    );
  } else if (id === "detectable_format:title") {
    r.matches = titles(text);
    r.count = r.matches.length;
    r.target = 1;
    decide(!!r.count, "任意位置的非空 <<…>> 即可；不是只检查首行。");
  } else if (id === "combination:repeat_prompt" && asciiOnly()) {
    const expected = pythonStrip(String(args.prompt_to_repeat || ""));
    const actual = pythonStrip(text);
    const ok = actual.toLowerCase().startsWith(expected.toLowerCase());
    if (ok)
      r.matches = [
        {
          text: actual.slice(0, expected.length),
          start: text.indexOf(actual),
          end: text.indexOf(actual) + expected.length,
        },
      ];
    decide(ok, "去首尾空白并忽略大小写；不要求复述后真的追加答复。");
  } else if (id === "keywords:existence" && asciiOnly()) {
    const words = Array.isArray(args.keywords)
      ? (args.keywords as string[])
      : [];
    if (words.join("|") !== "correlated|experiencing") return r;
    for (const word of words)
      r.matches.push(...matches(text, new RegExp(word, "gi")));
    r.count = words.filter((w) => new RegExp(w, "i").test(text)).length;
    r.target = 2;
    decide(
      r.count === 2,
      "ASCII 忽略大小写且无单词边界；uncorrelated 也含 correlated。",
    );
  } else if (id === "change_case:english_capital") {
    r.matches = matches(text, /[a-z]/g);
    r.count = r.matches.length;
    r.detail = isAscii(text)
      ? `大写子检查：${/[A-Z]/.test(text) && !/[a-z]/.test(text) ? "满足" : "不满足"}；英语 langdetect 未运行，完整条件未判定。`
      : "非 ASCII 大小写未模拟；英语 langdetect 未运行，完整条件未判定。";
  }
  return r;
}
export const variantLabels = [
  "原片段",
  "删除 *",
  "删首行",
  "删末行",
  "删首末",
  "删首行 + *",
  "删末行 + *",
  "删首末 + *",
];
export function looseVariants(text: string) {
  const lines = text.split("\n");
  const first = pythonStrip(lines.slice(1).join("\n")),
    last = pythonStrip(lines.slice(0, -1).join("\n")),
    both = pythonStrip(lines.slice(1, -1).join("\n"));
  return [
    text,
    text.replaceAll("*", ""),
    first,
    last,
    both,
    first.replaceAll("*", ""),
    last.replaceAll("*", ""),
    both.replaceAll("*", ""),
  ];
}
export const anyCheck = (s: CheckState[]): CheckState =>
  s.includes("pass") ? "pass" : s.includes("unknown") ? "unknown" : "fail";
export const allChecks = (s: CheckState[]): CheckState =>
  s.includes("fail") ? "fail" : s.includes("unknown") ? "unknown" : "pass";
export function inspectIfeval(record: IfevalRecord, text: string) {
  const variants = looseVariants(text);
  const rows = record.instruction_id_list.map((id, i) =>
    variants.map((v) => checkIfevalRule(id, record.kwargs[i]!, v)),
  );
  const strict = rows.map((row) => row[0]!.state),
    loose = rows.map((row) => anyCheck(row.map((r) => r.state)));
  return {
    variants,
    rows,
    strict,
    loose,
    strictAll: allChecks(strict),
    looseAll: allChecks(loose),
  };
}
export function ifevalPresets(
  record: IfevalRecord,
): { label: string; text: string }[] {
  const words = (n: number) => Array(n).fill("sample").join(" ");
  switch (record.key) {
    case 1001:
      return [
        { label: "含英文逗号", text: "Sample, fragment." },
        { label: "换成中文逗号", text: "Sample，fragment." },
      ];
    case 1005:
      return [
        { label: "只有 3 个槽位", text: "[name] [address] [skill]" },
        { label: "12 次匹配边界", text: Array(12).fill("[]").join(" ") },
      ];
    case 1000:
      return [
        { label: "短片段：两项满足", text: "*alpha*\n*beta*\n*gamma*" },
        {
          label: "观察 loose 分行",
          text: "*alpha* *beta* *gamma*,\n" + words(300),
        },
      ];
    case 1012:
      return [
        {
          label: "只复述原请求",
          text: String(record.kwargs[0]?.prompt_to_repeat || ""),
        },
        {
          label: "在复述前加一行",
          text:
            "FORMAT DEMO\n" + String(record.kwargs[0]?.prompt_to_repeat || ""),
        },
      ];
    case 1021:
      return [
        {
          label: "两段标 + 小写",
          text: "PARAGRAPH 1\nSample fragment.\nPARAGRAPH 2\nAnother fragment.",
        },
        {
          label: "大写格式片段",
          text: "PARAGRAPH 1\nSAMPLE FRAGMENT.\nPARAGRAPH 2\nANOTHER FRAGMENT.",
        },
      ];
    case 1069:
      return [
        { label: "关键词子串边界", text: "uncorrelated experiencing" },
        {
          label: "500 个计数单元",
          text: "correlated experiencing " + words(498),
        },
      ];
    default:
      return [];
  }
}
