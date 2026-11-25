import { computed } from "vue";
import type { LocationQuery, LocationQueryRaw, Router } from "vue-router";
import {
  benchmarks,
  categories,
  categoryById,
  embodiedBenchmarks,
  embodiedCategories,
} from "../content/catalog";
import { searchBenchmarks } from "./search";
import type { Benchmark } from "../types/benchmark";
import {
  healthcareBenchmarks,
  healthcareCategory,
  healthcareCategoryByBenchmarkId,
} from "../content/healthcare";

export const modelFilterCategories = [...categories, healthcareCategory];

export type CatalogSort = "featured" | "name" | "year";
export type CatalogView = "grid" | "list";
export interface CatalogQuery {
  q: string;
  category: string;
  publisher: string;
  sample: string;
  kind: string;
  sort: CatalogSort;
  view: CatalogView;
}
export type CatalogFilterKey = keyof CatalogQuery;

/** Build the reader-facing catalog state from the application's real router. */
export function createCatalogQuery(router: Router) {
  const isEmbodied = computed(
    () => router.currentRoute.value.path === "/embodied/",
  );
  const query = computed(() => {
    const parsed = parseCatalogQuery(router.currentRoute.value.query);
    return isEmbodied.value
      ? { ...parsed, publisher: "", sample: "", kind: "" }
      : parsed;
  });
  const results = computed(() => filterCatalog(query.value, isEmbodied.value));
  const hasFilters = computed(() => hasCatalogFilters(query.value));
  const groupedResults = computed(() => {
    if (hasFilters.value || query.value.view === "list") return [];
    const categoryList = isEmbodied.value ? embodiedCategories : categories;
    return categoryList
      .map((category) => {
        const items = results.value.filter((item) =>
          isEmbodied.value
            ? item.embodied?.tasks.some((task) => task === category.id)
            : item.category === category.id,
        );
        return {
          category,
          items:
            query.value.sort === "featured" ? groupByPublisher(items) : items,
        };
      })
      .filter((group) => group.items.length);
  });
  let queuedQuery: LocationQueryRaw | undefined;

  function navigate(nextQuery: LocationQueryRaw) {
    queuedQuery = nextQuery;
    return router
      .replace({
        path: isEmbodied.value ? "/embodied/" : "/",
        query: nextQuery,
      })
      .finally(() => {
        if (queuedQuery === nextQuery) queuedQuery = undefined;
      });
  }

  return {
    query,
    currentCategory: computed(() =>
      isEmbodied.value
        ? embodiedCategories.find(
            (category) => category.id === query.value.category,
          )
        : query.value.category === healthcareCategory.id
          ? healthcareCategory
          : categoryById.get(query.value.category),
    ),
    results,
    groupedResults,
    hasFilters,
    stats: computed(() =>
      isEmbodied.value ? embodiedCatalogStats : catalogStats,
    ),
    setFilter(key: CatalogFilterKey, value: string) {
      const current = queuedQuery ?? router.currentRoute.value.query;
      return navigate(updateCatalogQuery(current, key, value));
    },
    reset() {
      const current = queuedQuery ?? router.currentRoute.value.query;
      return navigate(resetCatalogQuery(current));
    },
    // 无结果时先放宽筛选，保留读者已经输入的搜索词和显示偏好。
    relaxFilters() {
      const current = queuedQuery ?? router.currentRoute.value.query;
      return navigate({ ...resetCatalogQuery(current), q: current.q });
    },
  };
}

/** Query arrays and unsupported display modes cannot become UI state. */
export function parseCatalogQuery(query: LocationQuery): CatalogQuery {
  const text = (key: CatalogFilterKey) =>
    typeof query[key] === "string" ? query[key] : "";
  return {
    q: text("q"),
    category: text("category"),
    publisher: text("publisher"),
    sample: text("sample"),
    kind: text("kind"),
    sort:
      query.sort === "name" || query.sort === "year" ? query.sort : "featured",
    view: query.view === "list" ? "list" : "grid",
  };
}

export function updateCatalogQuery(
  query: LocationQueryRaw,
  key: CatalogFilterKey,
  value: string,
): LocationQueryRaw {
  return { ...query, [key]: value || undefined };
}

/** Clearing filters retains the URL's chosen display and sort options. */
export function resetCatalogQuery(query: LocationQueryRaw): LocationQueryRaw {
  return { view: query.view, sort: query.sort };
}

export function hasCatalogFilters(query: CatalogQuery): boolean {
  return !!(
    query.q ||
    query.category ||
    query.publisher ||
    query.sample ||
    query.kind
  );
}

/**
 * Group within the caller's existing category only. Exact publisher labels match
 * the publisher filter; joint attribution is not split into separate names.
 */
export function groupByPublisher(items: readonly Benchmark[]): Benchmark[] {
  const byPublisher = new Map<string, Benchmark[]>();
  const groups: Benchmark[][] = [];
  for (const item of items) {
    const publisher = item.publisher;
    if (
      /^(?:unknown|n\/a|未知(?:发布方)?|未公开|待确认|[—-])?$/i.test(
        publisher.trim(),
      )
    ) {
      groups.push([item]);
      continue;
    }
    const existing = byPublisher.get(publisher);
    if (existing) {
      existing.push(item);
    } else {
      const group = [item];
      byPublisher.set(publisher, group);
      groups.push(group);
    }
  }
  return groups.flat();
}

export function filterCatalog(query: CatalogQuery, embodied = false) {
  const items = searchBenchmarks(query.q, embodied).filter(
    (item) =>
      (!query.category ||
        (embodied
          ? item.embodied?.tasks.some((task) => task === query.category)
          : query.category === healthcareCategory.id
            ? healthcareCategoryByBenchmarkId.has(item.id)
            : item.category === query.category)) &&
      (!query.publisher || item.publisher === query.publisher) &&
      (!query.sample || item.sampleAccess.status === query.sample) &&
      (!query.kind || item.kind === query.kind),
  );
  if (query.sort === "name")
    return items.sort((a, b) => a.name.localeCompare(b.name));
  if (query.sort === "year")
    return items.sort((a, b) => (b.year || 0) - (a.year || 0));
  // A pinned category remains one category in grid or list mode.
  return query.category && !query.q ? groupByPublisher(items) : items;
}

// Catalog metadata is immutable during an application run, so compute totals once.
export const catalogStats = {
  publishers: [...new Set(benchmarks.map((item) => item.publisher))].sort(
    (a, b) => a.localeCompare(b, "zh"),
  ),
  localCount: benchmarks.filter((item) => item.sampleAccess.status === "local")
    .length,
  sampleCount: benchmarks.reduce((total, item) => total + item.sampleCount, 0),
  categoryCounts: new Map(categories.map((category) => [category.id, 0])),
};
for (const item of benchmarks) {
  catalogStats.categoryCounts.set(
    item.category,
    (catalogStats.categoryCounts.get(item.category) || 0) + 1,
  );
}
catalogStats.categoryCounts.set(
  healthcareCategory.id,
  healthcareBenchmarks.length,
);

export const embodiedCatalogStats = {
  publishers: [
    ...new Set(embodiedBenchmarks.map((item) => item.publisher)),
  ].sort((a, b) => a.localeCompare(b, "zh")),
  localCount: embodiedBenchmarks.filter(
    (item) => item.sampleAccess.status === "local",
  ).length,
  sampleCount: embodiedBenchmarks.reduce(
    (total, item) => total + item.sampleCount,
    0,
  ),
  categoryCounts: new Map(
    embodiedCategories.map((category) => [
      category.id,
      embodiedBenchmarks.filter((item) =>
        item.embodied?.tasks.some((task) => task === category.id),
      ).length,
    ]),
  ),
};
export { categoryById };
