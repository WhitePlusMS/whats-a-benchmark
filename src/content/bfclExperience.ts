/** Original local teaching checker; not BFCL's model decoder or an executor.
 * Quoted task annotations: Gorilla / BFCL team, Apache-2.0; fixed sources linked in the UI.
 */
export const bfclRoot =
  "https://github.com/ShishirPatil/gorilla/blob/6ea57973c7a6097fd7c5915698c54c17c5b1b6c8/";
export const bfclBase =
  bfclRoot + "berkeley-function-call-leaderboard/bfcl_eval/";
export const bfclCases = [
  {
    sampleId: "simple_python_0",
    label: "面积调用",
    category: "simple_python",
    line: 1,
    note: "提交函数与参数，不是口头回答面积。",
  },
  {
    sampleId: "simple_python_1",
    label: "阶乘接口",
    category: "simple_python",
    line: 2,
    note: "参数名按本题 schema 的 number，不擅自换成真实 Python API 的签名。",
  },
  {
    sampleId: "multiple_2",
    label: "首都还是人口",
    category: "multiple",
    line: 3,
    note: "三个工具都接受 country，但请求的操作不同；multiple 在这里是多选一，不是全部调用。",
  },
  {
    sampleId: "multiple_3",
    label: "距离还是夹角",
    category: "multiple",
    line: 4,
    note: "两个点的顺序按标注对照，不能因为数学距离对称就交换参数。",
  },
  {
    sampleId: "multiple_4",
    label: "位移还是末速度",
    category: "multiple",
    line: 5,
    note: "参数相似，不代表工具等价；两套 schema 的 integer / float 也不同。",
  },
] as const;
export type BfclCase = (typeof bfclCases)[number];
export function findBfclCase(id: unknown) {
  return id === undefined || id === null || id === ""
    ? bfclCases[0]
    : bfclCases.find((c) => c.sampleId === id);
}
export function isUnknownBfclSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "bfcl" &&
    (!path || path === "/benchmarks/bfcl/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((s) => s.id === id)
  );
}
export function bfclSource(c: BfclCase, answer = false) {
  return `${bfclBase}data/${answer ? "possible_answer/" : ""}BFCL_v4_${c.category}.json#L${c.line}`;
}
export type BfclProperty = {
  type: string;
  description: string;
  items?: { type: string };
  default?: unknown;
};
export type BfclFunction = {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, BfclProperty>;
    required: string[];
  };
};
export type BfclRecord = {
  id: string;
  question: { role: string; content: string }[][];
  function: BfclFunction[];
};
const obj = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);
export function readBfclRecord(raw: unknown): BfclRecord | null {
  if (
    !obj(raw) ||
    typeof raw.id !== "string" ||
    !findBfclCase(raw.id) ||
    !Array.isArray(raw.question) ||
    raw.question.length !== 1 ||
    !Array.isArray(raw.question[0]) ||
    raw.question[0].length !== 1 ||
    !obj(raw.question[0][0]) ||
    raw.question[0][0].role !== "user" ||
    typeof raw.question[0][0].content !== "string" ||
    !Array.isArray(raw.function) ||
    !raw.function.length
  )
    return null;
  for (const f of raw.function) {
    if (
      !obj(f) ||
      typeof f.name !== "string" ||
      typeof f.description !== "string" ||
      !obj(f.parameters) ||
      f.parameters.type !== "dict" ||
      !obj(f.parameters.properties) ||
      !Array.isArray(f.parameters.required)
    )
      return null;
    const properties = f.parameters.properties;
    if (
      !f.parameters.required.every(
        (k) => typeof k === "string" && Object.hasOwn(properties, k),
      )
    )
      return null;
    for (const p of Object.values(properties)) {
      if (
        !obj(p) ||
        typeof p.type !== "string" ||
        typeof p.description !== "string"
      )
        return null;
    }
  }
  return raw as unknown as BfclRecord;
}
export type BfclAnnotation = {
  id: string;
  ground_truth: Record<string, Record<string, unknown[]>>[];
};
export const bfclAnnotations: BfclAnnotation[] = [
  {
    id: "simple_python_0",
    ground_truth: [
      {
        calculate_triangle_area: {
          base: [10],
          height: [5],
          unit: ["units", ""],
        },
      },
    ],
  },
  {
    id: "simple_python_1",
    ground_truth: [
      {
        "math.factorial": {
          number: [5],
        },
      },
    ],
  },
  {
    id: "multiple_2",
    ground_truth: [
      {
        "country_info.capital": {
          country: ["Brazil"],
        },
      },
    ],
  },
  {
    id: "multiple_3",
    ground_truth: [
      {
        "EuclideanDistance.calculate": {
          pointA: [[3, 4]],
          pointB: [[1, 2]],
          rounding: ["", 0],
        },
      },
    ],
  },
  {
    id: "multiple_4",
    ground_truth: [
      {
        "kinematics.calculate_displacement": {
          initial_speed: [20],
          acceleration: [10],
          time: [5],
          rounding: ["", 2],
        },
      },
    ],
  },
];
export function bfclAnnotation(id: string) {
  return bfclAnnotations.find((a) => a.id === id);
}
export type BfclStatus = "waiting" | "pass" | "fail" | "unknown";
export type BfclCheck = { name: string; status: BfclStatus; reason: string };
export const bfclStatusLabels: Record<BfclStatus, string> = {
  waiting: "待填写",
  pass: "符合本例标注",
  fail: "不符合",
  unknown: "未判定",
};
export const bfclInputLimit = 500;
export function normalizeBfclString(value: string) {
  return value
    .toLowerCase()
    .replace(/[ ,./\-_*^]/g, "")
    .replace(/'/g, '"');
}
export function inspectBfclValue(
  text: string,
  p: BfclProperty,
): { status: BfclStatus; reason: string; value?: unknown } {
  if (!text.trim())
    return { status: "waiting", reason: "尚未填写 JSON 字面量。" };
  if (text.length > bfclInputLimit)
    return { status: "unknown", reason: "超过本站每参数 500 字符范围。" };
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return {
      status: "fail",
      reason: "不是合法的单个 JSON 值。字符串须用双引号。",
    };
  }
  const t = text.trim();
  if (p.type === "integer") {
    if (typeof value !== "number" || !/^[-]?(0|[1-9]\d*)$/.test(t))
      return {
        status: "fail",
        reason:
          "本题要求 integer；布尔值、小数或指数形式不是 Python 整数字面量。",
      };
    if (!Number.isSafeInteger(value))
      return {
        status: "unknown",
        reason: "超出本站可精确比较的安全整数范围。",
      };
  } else if (p.type === "float") {
    if (typeof value !== "number")
      return { status: "fail", reason: "要求数值，不能使用字符串或布尔值。" };
    if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER)
      return { status: "unknown", reason: "数值超出本站精度范围。" };
  } else if (p.type === "string") {
    if (typeof value !== "string")
      return { status: "fail", reason: "要求 JSON 字符串。" };
    if (/[^\x00-\x7f]/.test(value))
      return {
        status: "unknown",
        reason:
          "本站字符串规范化仅对照 ASCII；不冒充完整 Unicode / 模型解码器。",
      };
  } else if (p.type === "array" && p.items?.type === "integer") {
    if (!Array.isArray(value) || value.some((v) => typeof v !== "number"))
      return { status: "fail", reason: "要求一维 integer 数组。" };
    if (value.length > 20)
      return { status: "unknown", reason: "本站数组最多比较 20 个分量。" };
    const parts = t.slice(1, -1).trim()
      ? t
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim())
      : [];
    if (parts.some((v) => !/^[-]?(0|[1-9]\d*)$/.test(v)))
      return {
        status: "fail",
        reason: "数组各分量须为整数字面量，不接受 3.0 或 3e0。",
      };
    if (value.some((v) => !Number.isSafeInteger(v)))
      return { status: "unknown", reason: "数组包含无法精确比较的整数。" };
  } else {
    return { status: "unknown", reason: "本站未实现这类 schema 检查。" };
  }
  return { status: "pass", reason: "类型在本站支持范围内。", value };
}
export function inspectBfcl(
  record: BfclRecord,
  name: string,
  inputs: Record<string, string>,
  included: Record<string, boolean>,
) {
  const rows: BfclCheck[] = [];
  if (!name)
    return {
      status: "waiting" as BfclStatus,
      rows: [
        {
          name: "函数",
          status: "waiting" as BfclStatus,
          reason: "先选择一个给定函数。",
        },
      ],
    };
  const f = record.function.find((f) => f.name === name),
    answer = bfclAnnotation(record.id)?.ground_truth[0]?.[name];
  if (!f || !answer)
    return {
      status: "fail" as BfclStatus,
      rows: [
        {
          name: "函数",
          status: "fail" as BfclStatus,
          reason: "所选函数不符合本例标注。请比较函数描述与用户要做的操作。",
        },
      ],
    };
  rows.push({
    name: "函数",
    status: "pass",
    reason: "函数选择与本例标注一致。",
  });
  for (const key of Object.keys(included).filter(
    (k) => included[k] && !Object.hasOwn(f.parameters.properties, k),
  ))
    rows.push({
      name: key,
      status: "fail",
      reason: "本题 schema 未定义此参数。",
    });
  for (const [key, p] of Object.entries(f.parameters.properties)) {
    const required = f.parameters.required.includes(key),
      candidates = answer[key];
    if (!required && !included[key]) {
      rows.push({
        name: key,
        status: candidates?.includes("") ? "pass" : "unknown",
        reason: candidates?.includes("")
          ? "省略可选参数；官方候选含允许省略标记。"
          : "没有核实此参数的省略规则。",
      });
      continue;
    }
    const typed = inspectBfclValue(inputs[key] ?? "", p);
    if (typed.status !== "pass") {
      rows.push({ name: key, status: typed.status, reason: typed.reason });
      continue;
    }
    if (!candidates) {
      rows.push({
        name: key,
        status: "unknown",
        reason: "标注中没有此参数的候选值。",
      });
      continue;
    }
    const matched = candidates.some((candidate) =>
      typeof typed.value === "string" && typeof candidate === "string"
        ? normalizeBfclString(typed.value) === normalizeBfclString(candidate)
        : JSON.stringify(typed.value) === JSON.stringify(candidate),
    );
    rows.push({
      name: key,
      status: matched ? "pass" : "fail",
      reason: matched
        ? "类型与候选值一致。"
        : "类型可读，但值与本例候选不符；数组保持原顺序。",
    });
  }
  const status: BfclStatus = rows.some((r) => r.status === "fail")
    ? "fail"
    : rows.some((r) => r.status === "unknown")
      ? "unknown"
      : rows.some((r) => r.status === "waiting")
        ? "waiting"
        : "pass";
  return { status, rows };
}
export function bfclExample(record: BfclRecord) {
  const annotation = bfclAnnotation(record.id)?.ground_truth[0];
  if (!annotation) return null;
  const name = Object.keys(annotation)[0],
    f = record.function.find((f) => f.name === name);
  if (!f) return null;
  const inputs: Record<string, string> = {};
  for (const k of f.parameters.required)
    inputs[k] = JSON.stringify(annotation[name][k][0]);
  return { name, inputs };
}
export function bfclPreview(
  f: BfclFunction | undefined,
  inputs: Record<string, string>,
  included: Record<string, boolean>,
) {
  if (!f) return "先选择函数，再组装参数。";
  const entries = Object.keys(f.parameters.properties)
    .filter((k) => f.parameters.required.includes(k) || included[k])
    .map((k) => `    ${JSON.stringify(k)}: ${inputs[k]?.trim() || "<待填写>"}`);
  return `{\n  "name": ${JSON.stringify(f.name)},\n  "arguments": {\n${entries.join(",\n")}\n  }\n}`;
}
