import { computed } from "vue";
import type { LocationQuery, LocationQueryRaw, Router } from "vue-router";
import { benchmarks, categories, categoryById } from "../content/catalog";
import { searchBenchmarks } from "./search";

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
  const query = computed(() =>
    parseCatalogQuery(router.currentRoute.value.query),
  );
  let queuedQuery: LocationQueryRaw | undefined;

  function navigate(nextQuery: LocationQueryRaw) {
    queuedQuery = nextQuery;
    return router.replace({ path: "/", query: nextQuery }).finally(() => {
      if (queuedQuery === nextQuery) queuedQuery = undefined;
    });
  }

  return {
    query,
    currentCategory: computed(() => categoryById.get(query.value.category)),
    results: computed(() => filterCatalog(query.value)),
    hasFilters: computed(() => hasCatalogFilters(query.value)),
    stats: catalogStats,
    setFilter(key: CatalogFilterKey, value: string) {
      const current = queuedQuery ?? router.currentRoute.value.query;
      return navigate(updateCatalogQuery(current, key, value));
    },
    reset() {
      const current = queuedQuery ?? router.currentRoute.value.query;
      return navigate(resetCatalogQuery(current));
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

export function filterCatalog(query: CatalogQuery) {
  const items = searchBenchmarks(query.q).filter(
    (item) =>
      (!query.category || item.category === query.category) &&
      (!query.publisher || item.publisher === query.publisher) &&
      (!query.sample || item.sampleAccess.status === query.sample) &&
      (!query.kind || item.kind === query.kind),
  );
  if (query.sort === "name")
    return items.sort((a, b) => a.name.localeCompare(b.name));
  if (query.sort === "year")
    return items.sort((a, b) => (b.year || 0) - (a.year || 0));
  return items;
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
export { categoryById };
