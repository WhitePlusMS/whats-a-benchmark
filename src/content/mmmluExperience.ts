export const mmmluCases = [
  {
    sampleId: "mmmlu-zh-cn-test-row-0-2fba2ac8a8",
    label: "根式真的独立吗",
    kind: "field",
    index: 0,
  },
  {
    sampleId: "mmmlu-zh-cn-test-row-1",
    label: "绕一圈，再数分块",
    kind: "permutation",
    index: 1,
  },
  {
    sampleId: "mmmlu-zh-cn-test-row-2",
    label: "只需检查五个元素",
    kind: "roots",
    index: 2,
  },
  {
    sampleId: "mmmlu-zh-cn-test-row-3",
    label: "用反例拆开断言",
    kind: "groups",
    index: 3,
  },
] as const;
export type MmmluCase = (typeof mmmluCases)[number];
export const mmmluEnglishSource =
  "https://openaipublic.blob.core.windows.net/simple-evals/mmlu.csv";
export const mmmluCodeSource =
  "https://github.com/openai/simple-evals/blob/652c89d0ca9df547706735883097e9537d40dc47/mmlu_eval.py";
export function findMmmluCase(id: unknown) {
  if (id === undefined || id === null || id === "") return mmmluCases[0];
  return mmmluCases.find((c) => c.sampleId === id);
}
export function isUnknownMmmluSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "mmmlu" &&
    (!path || path === "/benchmarks/mmmlu/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((s) => s.id === id)
  );
}
export function readMmmluRecord(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (
    typeof r.Question !== "string" ||
    typeof r.Answer !== "string" ||
    !/^[ABCD]$/.test(r.Answer) ||
    !["A", "B", "C", "D"].every((k) => typeof r[k] === "string") ||
    r.Subject !== "abstract_algebra"
  )
    return null;
  return {
    question: r.Question,
    options: [r.A, r.B, r.C, r.D] as string[],
    answer: r.Answer,
    subject: r.Subject,
  };
}
export function polynomialMod5(x: number) {
  if (!Number.isInteger(x) || x < 0 || x > 4) return null;
  const value = x ** 5 + 3 * x ** 3 + x ** 2 + 2 * x;
  return { value, residue: value % 5, quotient: Math.floor(value / 5) };
}
/** p=(1 2 5 4)(2 3), with the right permutation applied first. */
export const mmmluPermutation = [2, 3, 5, 1, 4] as const;
export function permutationPower(value: number, exponent: number) {
  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > 5 ||
    !Number.isInteger(exponent) ||
    exponent < 0
  )
    return null;
  let result = value;
  for (let i = 0; i < exponent % 5; i++) result = mmmluPermutation[result - 1]!;
  return result;
}
export function composePermutation(a: readonly number[], b: readonly number[]) {
  return b.map((v) => a[v - 1]!);
}
export function inversePermutation(a: readonly number[]) {
  return a.map((_, i) => a.indexOf(i + 1) + 1);
}
