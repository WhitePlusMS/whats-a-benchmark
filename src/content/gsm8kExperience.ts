export const gsm8kCases = [
  {
    sampleId: "0",
    index: 0,
    kind: "eggs",
    label: "鸭蛋去哪了",
    glyph: "16",
    question:
      "每天产 16 枚鸭蛋，早餐吃 3 枚，烘焙用 4 枚。剩余每枚卖 2 美元，每天收入多少？",
    target: "每天收入 · 美元",
    steps: [
      "先从每天的 16 枚中扣除早餐 3 枚和烘焙 4 枚：16 − 3 − 4 = 9 枚可出售。",
      "每枚 2 美元：9 × 2 = 18 美元 / 天。",
    ],
  },
  {
    sampleId: "1",
    index: 1,
    kind: "fabric",
    label: "两种布的比例",
    glyph: "½",
    question: "蓝布需要 2 卷，白布用量是蓝布的一半。一共需要多少卷？",
    target: "布料总量 · 卷",
    steps: ["白布是蓝布的一半：2 ÷ 2 = 1 卷。", "两种布相加：2 + 1 = 3 卷。"],
  },
  {
    sampleId: "2",
    index: 2,
    kind: "house",
    label: "房价不等于利润",
    glyph: "$",
    question:
      "买房花 80,000 美元，翻修花 50,000 美元。房屋价值增加原价的 150%，利润是多少？",
    target: "净利润 · 美元",
    steps: [
      "先合计成本：80,000 + 50,000 = 130,000 美元。",
      "增加的是原价的 150%：80,000 × 1.5 = 120,000；最终价值为 80,000 + 120,000 = 200,000 美元。",
      "卖出价值减去全部成本：200,000 − 130,000 = 70,000 美元。",
    ],
  },
  {
    sampleId: "public-test-3",
    index: 3,
    kind: "sprints",
    label: "重复的冲刺组",
    glyph: "3×3",
    question: "每周训练 3 次，每次进行 3 段冲刺，每段 60 米。一周共跑多少米？",
    target: "每周距离 · 米",
    steps: [
      "3 次训练，每次 3 段：3 × 3 = 9 段冲刺。",
      "每段 60 米：9 × 60 = 540 米 / 周。",
    ],
  },
  {
    sampleId: "public-test-7",
    index: 7,
    kind: "download",
    label: "重启后从零下载",
    glyph: "↺",
    question:
      "200 GB 文件以 2 GB/分钟下载，完成 40% 时重启 20 分钟，然后从头下载。总耗时多少？",
    target: "总耗时 · 分钟",
    steps: [
      "中断前已下载 200 × 40% = 80 GB，用时 80 ÷ 2 = 40 分钟。",
      "系统更新占用 20 分钟；已下载的进度不能接着使用。",
      "重新下载整个 200 GB 需 200 ÷ 2 = 100 分钟。总时间 40 + 20 + 100 = 160 分钟。",
    ],
  },
  {
    sampleId: "public-test-10",
    index: 10,
    kind: "months",
    label: "三个月的下载量",
    glyph: "↗↘",
    question:
      "首月下载量 60 次，第二月是首月的 3 倍，第三月比第二月少 30%。三个月总量是多少？",
    target: "三个月总量 · 次",
    steps: [
      "第二月为首月的 3 倍：60 × 3 = 180 次。",
      "第三月相对第二月减少 30%：180 × 30% = 54；180 − 54 = 126 次。",
      "按月累加：60 + 180 + 126 = 366 次。",
    ],
  },
  {
    sampleId: "public-test-18",
    index: 18,
    kind: "dozens",
    label: "把鸡蛋装成打",
    glyph: "12",
    question: "每天吃 3 枚鸡蛋，连续 4 周，一共吃多少打？一打是 12 枚。",
    target: "四周用量 · 打",
    steps: [
      "每周 7 天，每天 3 枚：7 × 3 = 21 枚 / 周。",
      "4 周合计：21 × 4 = 84 枚。",
      "每打 12 枚：84 ÷ 12 = 7 打。",
    ],
  },
] as const;
export type Gsm8kCase = (typeof gsm8kCases)[number];
export function findGsm8kCase(id: unknown) {
  if (id === undefined || id === null || id === "") return gsm8kCases[0];
  return gsm8kCases.find((entry) => entry.sampleId === id);
}
/** Faithful to the original dataset.py FIRST regex match and comma removal. */
export function extractGsm8kAnswer(text: string): string | null {
  return (
    text
      .match(/#### (\-?[0-9\.\,]+)/)?.[1]
      .replaceAll(",", "")
      .trim() ?? null
  );
}
export function checkGsm8kAnswer(text: string, reference: string) {
  const extracted = extractGsm8kAnswer(text);
  const expected = extractGsm8kAnswer(reference);
  return {
    extracted,
    matches: extracted !== null && expected !== null && extracted === expected,
  };
}
export function readGsm8kRecord(
  raw: unknown,
): { question: string; answer: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  return typeof record.question === "string" &&
    typeof record.answer === "string" &&
    extractGsm8kAnswer(record.answer) !== null
    ? (record as { question: string; answer: string })
    : null;
}
export function isUnknownGsm8kSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "gsm8k" &&
    (!path || path === "/benchmarks/gsm8k/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((sample) => sample.id === id)
  );
}
