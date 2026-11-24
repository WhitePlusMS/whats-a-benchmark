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
import {
  healthcareBenchmarks,
  healthcareCategories,
  healthcareCategoryByBenchmarkId,
  healthcarePath,
  healthcareRouteName,
} from "../content/healthcare";

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
export type CatalogScope = "model" | "embodied" | "healthcare";

export function matchesCatalogCategory(
  item: (typeof benchmarks)[number],
  category: string,
  scope: CatalogScope,
): boolean {
  if (scope === "embodied")
    return item.embodied?.tasks.some((task) => task === category) ?? false;
  if (scope === "healthcare")
    return healthcareCategoryByBenchmarkId.get(item.id) === category;
  return item.category === category;
}

/** Build the reader-facing catalog state from the application's real router. */
export function createCatalogQuery(router: Router) {
  const path = computed(() => router.currentRoute.value.path);
  const scope = computed<CatalogScope>(() =>
    path.value === "/embodied/"
      ? "embodied"
      : router.currentRoute.value.name === healthcareRouteName
        ? "healthcare"
        : "model",
  );
  const query = computed(() => {
    const parsed = parseCatalogQuery(router.currentRoute.value.query);
    return scope.value === "embodied"
      ? { ...parsed, publisher: "", sample: "", kind: "" }
      : parsed;
  });
  let queuedQuery: LocationQueryRaw | undefined;

  function navigate(nextQuery: LocationQueryRaw) {
    queuedQuery = nextQuery;
    return router
      .replace({
        path:
          scope.value === "healthcare"
            ? healthcarePath
            : scope.value === "embodied"
              ? "/embodied/"
              : "/",
        query: nextQuery,
      })
      .finally(() => {
        if (queuedQuery === nextQuery) queuedQuery = undefined;
      });
  }

  return {
    query,
    scope,
    currentCategory: computed(() =>
      catalogCategories[scope.value].find(
        (category) => category.id === query.value.category,
      ),
    ),
    results: computed(() => filterCatalog(query.value, scope.value)),
    hasFilters: computed(() => hasCatalogFilters(query.value)),
    stats: computed(() => catalogStatsByScope[scope.value]),
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

export function filterCatalog(
  query: CatalogQuery,
  scope: CatalogScope = "model",
) {
  const items = searchBenchmarks(query.q, scope === "embodied").filter(
    (item) =>
      (scope !== "healthcare" ||
        healthcareCategoryByBenchmarkId.has(item.id)) &&
      (!query.category ||
        matchesCatalogCategory(item, query.category, scope)) &&
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
export const catalogCategories = {
  model: categories,
  embodied: embodiedCategories,
  healthcare: healthcareCategories,
} satisfies Record<CatalogScope, typeof categories>;

export const catalogCollections = {
  model: benchmarks,
  embodied: embodiedBenchmarks,
  healthcare: healthcareBenchmarks,
} satisfies Record<CatalogScope, typeof benchmarks>;

function buildStats(scope: CatalogScope) {
  const collection = catalogCollections[scope];
  return {
    publishers: [...new Set(collection.map((item) => item.publisher))].sort(
      (a, b) => a.localeCompare(b, "zh"),
    ),
    localCount: collection.filter(
      (item) => item.sampleAccess.status === "local",
    ).length,
    sampleCount: collection.reduce(
      (total, item) => total + item.sampleCount,
      0,
    ),
    categoryCounts: new Map(
      catalogCategories[scope].map((category) => [
        category.id,
        collection.filter((item) =>
          matchesCatalogCategory(item, category.id, scope),
        ).length,
      ]),
    ),
  };
}

const catalogStatsByScope = {
  model: buildStats("model"),
  embodied: buildStats("embodied"),
  healthcare: buildStats("healthcare"),
};
export const catalogStats = catalogStatsByScope.model;
export const embodiedCatalogStats = catalogStatsByScope.embodied;
export { categoryById };
