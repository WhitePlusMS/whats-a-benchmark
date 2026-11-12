export const mmluProDataSource =
  "https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/blob/b189ec765aa7ed75c8acfea42df31fdae71f97be/data/validation-00000-of-00001.parquet";
export const mmluProCardSource =
  "https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/blob/b189ec765aa7ed75c8acfea42df31fdae71f97be/README.md";
export const mmluProCodeSource =
  "https://github.com/TIGER-AI-Lab/MMLU-Pro/blob/f418b116db00b065c2aea046518d8fcf74d39872/evaluate_from_local.py";
export const mmluProCases = [
  {
    sampleId: "1",
    questionId: 1,
    label: "组合顺序",
    category: "math",
    explanation: [
      "ST 表示 S∘T，即先乘 x，再求导。",
      "ST(p) = (xp)′ = p + xp′；TS(p) = xp′。",
      "相减得到 ST(p) − TS(p) = p，因此 ST − TS = I。这是对任意多项式的证明，不只是单个例子。",
    ],
    correction: "",
  },
  {
    sampleId: "2",
    questionId: 2,
    label: "整数通解",
    category: "math",
    explanation: [
      "7m + 12n = 22 的所有整数解为 m = −2 + 12t、n = 3 − 7t（t∈ℤ）。",
      "所以 m+n = 1+5t。要为负数须 t≤−1；最大值在 t=−1，得到 −4。",
      "对应 m=−14、n=10，代回原式成立。",
    ],
    correction: "",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-5",
    questionId: 5,
    label: "垂体所在体腔",
    category: "health",
    explanation: [
      "题库选择更具体的 Cranial（颅腔）。垂体位于蝶骨的蝶鞍区域。",
      "Dorsal（背侧体腔）是更上位的分类，不能据此说它不包含颅腔。本页仅解释样题，不是医学诊断。",
    ],
    correction: "",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-10",
    questionId: 10,
    label: "集光量之比",
    category: "physics",
    explanation: [
      "集光量与孔径面积成正比：A = πD²/4。",
      "50 cm = 500 mm，因此比值 (500/5)² = 10000。",
      "这里比较集光量，不是放大倍数或角分辨率。",
    ],
    correction:
      "原始 CoT 写了 diameter 50mm，却在算式使用 50cm。题干为 50 cm，应换算为 500 mm；这是单位笔误，参考答案 10000 不变。",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-15",
    questionId: 15,
    label: "商业伦理四空",
    category: "business",
    explanation: [
      "四空依次为 Boycotts（抵制购买）、Buycotts（支持性购买）、Digital technology（数字技术）、Increased Sales（销售增加）。",
      "抵制与主动购买是两种不同消费行动；后两空描述促成方式与可能结果。这里是本站中文整理，不是新增原题。",
    ],
    correction: "",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-20",
    questionId: 20,
    label: "节肢动物",
    category: "biology",
    explanation: [
      "题库正确项是开放式循环系统及背侧心脏。节肢动物有成对关节附肢，外骨骼主要成分是几丁质。",
      "原始解释中关于肽聚糖的错误不影响该选项的标注，但不应照抄为生物学事实。",
    ],
    correction:
      "原始 CoT 把肽聚糖称为细菌 plasma membrane 的成分，不准确。肽聚糖是细胞壁的特征成分，位于质膜之外。",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-25",
    questionId: 25,
    label: "EPR 分裂计数",
    category: "chemistry",
    explanation: [
      "一个 ¹³C 核（I=1/2）产生 2I+1 = 2 重分裂。",
      "三个等价 ¹H 核产生 2nI+1 = 4 重分裂；按题目条件互不重叠，总数 2×4 = 8。",
      "这是分裂条数的计数，不是实测谱图；未提供耦合常数或峰位。",
    ],
    correction: "",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-30",
    questionId: 30,
    label: "流水线依赖",
    category: "computer science",
    explanation: [
      "下面是本站纠正的一个可达到参考 6 周期的安排，不是对全部指令序列的穷举最优性证明。",
      "题面规则：若后一条立即使用前一条结果，前一条耗 2 周期；否则 1 周期。更少指令不必然更少周期。",
      "另一种四指令方案是 A+C、AC、两者相加、再乘 B；它有两处相邻依赖，也是 4+2=6 周期。",
    ],
    correction:
      "原始 CoT 的 (AB)×(BC) 实际为 AB²C，不是 ABC；应以 AB 乘 C。其“至少三乘两加”的下界也不成立：B(A+C+AC) 可用四指令。下面纠正安排仍达到参考 6 周期，不沿用错误证明。",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-55",
    questionId: 55,
    label: "史料里的线索",
    category: "history",
    explanation: [
      "官方标注选择 Communist。题库依据是文本中共同劳动、共同占有与劳动阶层福利等线索。",
      "这不是对人物 Souvarine 思想归属的完整文学定论，也不意味着其他思想流派不关心工人。",
    ],
    correction: "",
  },
  {
    sampleId: "mmlu-pro-validation-diverse-65",
    questionId: 65,
    label: "专案法官",
    category: "law",
    explanation: [
      "关键条件：争端当事国在法官席没有本国籍法官时，可为该具体案件选择专案法官。",
      "不是每方在每案中都能任命，不是固定任期，也不要求专案法官一定具有该国国籍。第 31 条还有同利益多方等限制。",
      "这是样题解释，不是具体案件的法律意见。",
    ],
    correction: "",
  },
] as const;
export type MmluProCase = (typeof mmluProCases)[number];
export function findMmluProCase(id: unknown) {
  if (id === undefined || id === null || id === "") return mmluProCases[0];
  return mmluProCases.find((c) => c.sampleId === id);
}
export function isUnknownMmluProSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "mmlu-pro" &&
    (!path || path === "/benchmarks/mmlu-pro/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((s) => s.id === id)
  );
}
export function readMmluProRecord(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (
    !Number.isInteger(r.question_id) ||
    typeof r.question !== "string" ||
    !Array.isArray(r.options) ||
    !r.options.every((o) => typeof o === "string") ||
    typeof r.answer !== "string" ||
    !/^[A-J]$/.test(r.answer) ||
    !Number.isInteger(r.answer_index) ||
    typeof r.cot_content !== "string" ||
    typeof r.category !== "string"
  )
    return null;
  const options = (r.options as string[])
    .map((text, index) => ({
      text,
      index,
      letter: String.fromCharCode(65 + index),
    }))
    .filter((o) => o.text !== "N/A");
  if (!options.some((o) => o.index === r.answer_index && o.letter === r.answer))
    return null;
  return {
    questionId: r.question_id as number,
    question: r.question,
    options,
    answer: r.answer,
    answerIndex: r.answer_index as number,
    cot: r.cot_content,
    category: r.category,
    omitted: (r.options as string[]).length - options.length,
  };
}
export type MmluProRecord = NonNullable<ReturnType<typeof readMmluProRecord>>;
export function checkMmluPro(record: MmluProRecord, selected: number | null) {
  if (selected === null || !record.options.some((o) => o.index === selected))
    return "waiting";
  return selected === record.answerIndex ? "correct" : "incorrect";
}
export const mmluProPipeline = [
  { instruction: "MUL R0,R1,R3", result: "R3 = AB", cycles: 1 },
  { instruction: "MUL R1,R2,R4", result: "R4 = BC", cycles: 1 },
  { instruction: "MUL R3,R2,R5", result: "R5 = ABC", cycles: 1 },
  { instruction: "ADD R3,R4,R6", result: "R6 = AB + BC", cycles: 2 },
  { instruction: "ADD R5,R6,R7", result: "R7 = AB + ABC + BC", cycles: 1 },
] as const;
