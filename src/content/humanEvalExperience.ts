export const humanEvalCases = [
  {
    sampleId: "HumanEval/0",
    entryPoint: "has_close_elements",
    defaultExample: "prompt-2",
    kind: "distance",
    label: "两个数有多近",
    caption: "距离严格小于阈值",
    glyph: "↔",
    contract:
      "只要存在一对不同位置的数，绝对差严格小于 threshold，就返回 True；等于阈值不够。",
  },
  {
    sampleId: "HumanEval/1",
    entryPoint: "separate_paren_groups",
    defaultExample: "prompt-1",
    kind: "brackets",
    label: "括号在哪里分组",
    caption: "深度回到零，才切开",
    glyph: "()",
    contract:
      "忽略空格，把互不嵌套的平衡括号组分别返回。内部的一对括号不是新的外层分组。",
  },
  {
    sampleId: "HumanEval/2",
    entryPoint: "truncate_number",
    defaultExample: "prompt-1",
    kind: "decimal",
    label: "留下小数部分",
    caption: "整数部分与余量",
    glyph: ".5",
    contract:
      "输入是正浮点数。去掉整数部分，返回小于 1 的小数余量，不是四舍五入。",
  },
  {
    sampleId: "HumanEval/3",
    entryPoint: "below_zero",
    defaultExample: "prompt-2",
    kind: "balance",
    label: "途中有没有透支",
    caption: "每一次余额都要看",
    glyph: "±",
    contract:
      "余额从 0 开始。按顺序累计，只要中途低于 0 就返回 True，即使后面又补回来。",
  },
  {
    sampleId: "HumanEval/4",
    entryPoint: "mean_absolute_deviation",
    defaultExample: "prompt-1",
    kind: "deviation",
    label: "离均值有多远",
    caption: "绝对距离再取平均",
    glyph: "μ",
    contract:
      "先求均值，再计算每个数到均值的绝对距离，最后把这些距离取平均。这不是方差。",
  },
  {
    sampleId: "HumanEval/5",
    entryPoint: "intersperse",
    defaultExample: "prompt-2",
    kind: "insertion",
    label: "只在中间插入",
    caption: "两端不添加分隔数",
    glyph: "⋮",
    contract:
      "在相邻元素之间插入 delimeter；保留原顺序，首尾不多加。空列表仍返回空列表。",
  },
] as const;
export type HumanEvalCase = (typeof humanEvalCases)[number];
export type HumanEvalKind = HumanEvalCase["kind"];
export interface HumanEvalRecord {
  task_id: string;
  entry_point: string;
  prompt: string;
  canonical_solution: string;
  test: string;
}
export type Literal = number | string | boolean | Literal[];
export interface HumanEvalExample {
  id: string;
  origin: "prompt" | "test";
  ordinal: number;
  args: Literal[];
  call: string;
  expected: Literal;
  expectedText: string;
  tolerance?: number;
  sourceText: string;
}

export function findHumanEvalCase(sampleId: unknown) {
  if (sampleId === undefined || sampleId === null || sampleId === "")
    return humanEvalCases[0];
  return humanEvalCases.find((item) => item.sampleId === sampleId);
}
export function isUnknownHumanEvalSample(
  benchmarkId: string,
  sampleId: unknown,
  samples?: readonly { id: string }[],
  routePath = `/benchmarks/${benchmarkId}/`,
) {
  return (
    benchmarkId === "human-eval" &&
    routePath === "/benchmarks/human-eval/" &&
    !!samples &&
    sampleId !== undefined &&
    sampleId !== null &&
    sampleId !== "" &&
    !samples.some((sample) => sample.id === sampleId)
  );
}
export function readHumanEvalRecord(
  raw: unknown,
  entry: HumanEvalCase,
): HumanEvalRecord | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const record = raw as Record<string, unknown>;
  return record.task_id === entry.sampleId &&
    record.entry_point === entry.entryPoint &&
    ["prompt", "canonical_solution", "test"].every(
      (key) => typeof record[key] === "string" && record[key],
    )
    ? (record as unknown as HumanEvalRecord)
    : null;
}

/** A deliberately narrow literal reader for these six public records, never a Python evaluator. */
function splitLiterals(text: string): string[] {
  const parts: string[] = [];
  let depth = 0,
    quote = "",
    start = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === quote && text[i - 1] !== "\\") quote = "";
      continue;
    }
    if (c === "'" || c === '"') quote = c;
    else if (c === "[") depth++;
    else if (c === "]") depth--;
    else if (c === "," && depth === 0) {
      parts.push(text.slice(start, i));
      start = i + 1;
    }
  }
  if (quote || depth !== 0) throw new Error("Unsupported public literal");
  if (text.slice(start).trim()) parts.push(text.slice(start));
  return parts;
}
function literal(text: string): Literal {
  const value = text.trim();
  if (value === "True" || value === "False") return value === "True";
  if (/^[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?$/i.test(value)) return Number(value);
  if (value.startsWith("[") && value.endsWith("]"))
    return splitLiterals(value.slice(1, -1)).map(literal);
  if (/^'[^'\\]*'$/.test(value) || /^"[^"\\]*"$/.test(value))
    return value.slice(1, -1);
  const fraction = value.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (fraction && Number(fraction[2]) !== 0)
    return Number(fraction[1]) / Number(fraction[2]);
  throw new Error("Unsupported public literal");
}
function callParts(source: string, name: string) {
  const start = source.indexOf(`${name}(`);
  if (start < 0) throw new Error("Missing public function call");
  const from = start + name.length + 1;
  let depth = 1,
    quote = "";
  for (let i = from; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (c === quote && source[i - 1] !== "\\") quote = "";
      continue;
    }
    if (c === "'" || c === '"') quote = c;
    else if (c === "(") depth++;
    else if (c === ")" && --depth === 0)
      return {
        args: splitLiterals(source.slice(from, i)).map(literal),
        call: source.slice(start, i + 1),
        rest: source.slice(i + 1).trim(),
      };
  }
  throw new Error("Unclosed public function call");
}
/** Extract verbatim examples/assertions, not a second handwritten set of official tests. */
export function humanEvalExamples(record: HumanEvalRecord): HumanEvalExample[] {
  const examples: HumanEvalExample[] = [];
  for (const match of record.prompt.matchAll(/>>> ([^\n]+)\n([^\n]+)/g)) {
    const parsed = callParts(match[1], record.entry_point);
    const expectedText = match[2].trim();
    const ordinal = examples.length + 1;
    examples.push({
      id: `prompt-${ordinal}`,
      origin: "prompt",
      ordinal,
      args: parsed.args,
      call: parsed.call,
      expected: literal(expectedText),
      expectedText,
      sourceText: match[0],
    });
  }
  const assertions =
    record.test.match(
      /^[ \t]*assert[^\n]*(?:\n(?![ \t]*assert)[ \t]+[^\n]+)*/gm,
    ) || [];
  assertions.forEach((sourceText, index) => {
    sourceText = sourceText.trim();
    const parsed = callParts(sourceText, "candidate");
    const exact = parsed.rest.match(/^==\s*([\s\S]+)$/);
    const approximate = parsed.rest.match(/^-\s*([^\n]+)\)\s*<\s*([\de.-]+)$/);
    if (!exact && !approximate) throw new Error("Unsupported public assertion");
    const expectedText = (exact?.[1] || approximate![1]).trim();
    examples.push({
      id: `test-${index + 1}`,
      origin: "test",
      ordinal: index + 1,
      args: parsed.args,
      call: parsed.call.replace(/^candidate/, record.entry_point),
      expected: literal(expectedText),
      expectedText,
      ...(approximate ? { tolerance: Number(approximate[2]) } : {}),
      sourceText,
    });
  });
  if (!examples.length || !assertions.length)
    throw new Error("Public examples are missing");
  return examples;
}
