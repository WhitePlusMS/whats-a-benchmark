import { benchmarks, categoryById } from "../content/catalog";
import type { Benchmark } from "../types/benchmark";

/** Normalize presentation differences without throwing away meaningful version numbers. */
export function normalizeName(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[\s_‐‑–—-]/g, "");
}

// 公开目录在本次运行期间不变；名称和全文只标准化一次，输入时仅做匹配。
const searchIndex = benchmarks.map((item) => ({
  item,
  names: [item.name, ...item.aliases].map(normalizeName),
  corpus: normalizeName(
    [
      item.subtitle,
      item.officialDefinition.summary,
      item.officialDefinition.task,
      item.taskContract.input,
      item.taskContract.output,
      item.dataProfile.summary,
      item.publisher,
      ...item.tags,
      categoryById.get(item.category)?.name || "",
    ].join(" "),
  ),
}));

export function searchBenchmarks(query: string): Benchmark[] {
  const normalized = normalizeName(query.trim());
  if (!normalized) return benchmarks;
  return searchIndex
    .map(({ item, names, corpus }) => {
      const score = names.includes(normalized)
        ? 3
        : names.some((name) => name.includes(normalized))
          ? 2
          : corpus.includes(normalized)
            ? 1
            : 0;
      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}

export function recognizeNames(
  input: string,
): { input: string; matches: Benchmark[] }[] {
  const names = [
    ...new Set(
      input
        .split(/[\n,，;；]+/)
        .map((name) => name.trim())
        .filter(Boolean),
    ),
  ];
  return names.slice(0, 60).map((name) => {
    const normalized = normalizeName(name);
    if (!normalized) return { input: name, matches: [] };
    const exact = searchIndex
      .filter((entry) => entry.names.includes(normalized))
      .map((entry) => entry.item);
    return {
      input: name,
      matches: exact.length ? exact : searchBenchmarks(name).slice(0, 5),
    };
  });
}
