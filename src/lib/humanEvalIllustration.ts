import type {
  HumanEvalExample,
  HumanEvalKind,
  Literal,
} from "../content/humanEvalExperience";

export const formatIllustrationNumber = (value: number) =>
  Number(value.toFixed(6)).toString();
/** Simplify labels only when rounding cannot obscure the strict threshold boundary. */
export function distanceDisplay(distance: number, threshold: number) {
  const compact = formatIllustrationNumber(distance);
  const rounded = Number(compact);
  const retainPrecision =
    rounded < threshold !== distance < threshold ||
    (rounded === threshold && distance !== threshold);
  return {
    text: retainPrecision ? String(distance) : compact,
    approximate: !retainPrecision && rounded !== distance,
    raw: String(distance),
    retainPrecision,
  };
}
export function pythonLiteral(value: Literal): string {
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "string") return `'${value}'`;
  if (Array.isArray(value)) return `[${value.map(pythonLiteral).join(", ")}]`;
  return formatIllustrationNumber(value);
}
export function distanceTrace(numbers: number[], threshold: number) {
  const pairs: {
    left: number;
    right: number;
    distance: number;
    close: boolean;
  }[] = [];
  for (let left = 0; left < numbers.length; left++) {
    for (let right = left + 1; right < numbers.length; right++) {
      const distance = Math.abs(numbers[left] - numbers[right]);
      const close = distance < threshold;
      pairs.push({ left, right, distance, close });
      if (close) return pairs;
    }
  }
  return pairs;
}
export function bracketTrace(text: string) {
  let depth = 0,
    current = "";
  const groups: string[] = [];
  return [...text].map((char, index) => {
    if (char === "(") {
      depth++;
      current += char;
    }
    if (char === ")") {
      depth--;
      current += char;
    }
    const boundary = char === ")" && depth === 0;
    if (boundary) {
      groups.push(current);
      current = "";
    }
    return { char, index, depth, boundary, current, groups: [...groups] };
  });
}
export function decimalParts(number: number) {
  return { integer: Math.floor(number), decimal: number % 1 };
}
export function balanceTrace(operations: number[]) {
  let balance = 0,
    stopped = false;
  return operations.map((operation, index) => {
    if (stopped) return { index, operation, balance: null, below: false };
    balance += operation;
    const below = balance < 0;
    stopped = below;
    return { index, operation, balance, below };
  });
}
export function deviationParts(numbers: number[]) {
  if (!numbers.length)
    throw new Error("Empty list is outside the selected public cases");
  const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
  const distances = numbers.map((n) => Math.abs(n - mean));
  return {
    mean,
    distances,
    total: distances.reduce((sum, n) => sum + n, 0),
    result: distances.reduce((sum, n) => sum + n, 0) / numbers.length,
  };
}
export function insertionTokens(numbers: number[], delimiter: number) {
  return numbers.flatMap((value, index) => [
    ...(index ? [{ value: delimiter, inserted: true, inputIndex: null }] : []),
    { value, inserted: false, inputIndex: index },
  ]);
}
/** Number of site illustration states, not execution steps in the Python harness. */
export function illustrationLength(
  kind: HumanEvalKind,
  example: HumanEvalExample,
) {
  const numbers = example.args[0] as number[];
  switch (kind) {
    case "distance":
      return Math.max(
        1,
        distanceTrace(numbers, example.args[1] as number).length,
      );
    case "brackets":
      return Math.max(1, (example.args[0] as string).length);
    case "decimal":
      return 2;
    case "balance":
      return Math.max(
        1,
        balanceTrace(numbers).filter((item) => item.balance !== null).length,
      );
    case "deviation":
      return numbers.length + 2;
    case "insertion":
      return Math.max(
        1,
        insertionTokens(numbers, example.args[1] as number).length,
      );
  }
}
