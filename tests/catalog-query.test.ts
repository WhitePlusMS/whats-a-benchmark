import assert from "node:assert/strict";
import test from "node:test";
import { createMemoryHistory, createRouter } from "vue-router";
import { benchmarks } from "../src/content/catalog";
import {
  catalogStats,
  createCatalogQuery,
  filterCatalog,
  hasCatalogFilters,
  parseCatalogQuery,
  resetCatalogQuery,
  updateCatalogQuery,
} from "../src/lib/catalogQuery";

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/other", component: { template: "<div />" } },
    ],
  });
}

test("catalog URLs reject repeated scalar values and unsupported display modes", () => {
  const query = parseCatalogQuery({
    q: ["math", "code"],
    category: null,
    sort: "random",
    view: "table",
  });
  assert.equal(query.q, "");
  assert.equal(query.category, "");
  assert.equal(query.sort, "featured");
  assert.equal(query.view, "grid");
  assert.equal(hasCatalogFilters(query), false);
});

test("filter changes preserve other URL values; reset retains only display choices", () => {
  const original = {
    q: "math",
    publisher: "OpenAI",
    sort: "year",
    view: "list",
  };
  assert.deepEqual(updateCatalogQuery(original, "category", "reasoning"), {
    ...original,
    category: "reasoning",
  });
  assert.deepEqual(resetCatalogQuery(original), { sort: "year", view: "list" });
  assert.equal(
    hasCatalogFilters(
      parseCatalogQuery(resetCatalogQuery(original) as typeof original),
    ),
    false,
  );
});

test("catalog filters intersect, sort without mutating content, and preserve unknown-filter empty results", () => {
  const item = benchmarks[0]!;
  const originalIds = benchmarks.map((entry) => entry.id);
  const query = parseCatalogQuery({
    category: item.category,
    publisher: item.publisher,
    kind: item.kind,
    sample: item.sampleAccess.status,
    sort: "year",
  });
  const results = filterCatalog(query);
  assert.ok(results.some((entry) => entry.id === item.id));
  assert.ok(
    results.every(
      (entry) =>
        entry.category === item.category &&
        entry.publisher === item.publisher &&
        entry.kind === item.kind &&
        entry.sampleAccess.status === item.sampleAccess.status,
    ),
  );
  assert.deepEqual(
    results.map((entry) => entry.year || 0),
    results.map((entry) => entry.year || 0).sort((a, b) => b - a),
  );
  assert.deepEqual(
    benchmarks.map((entry) => entry.id),
    originalIds,
  );
  assert.deepEqual(
    filterCatalog({ ...query, publisher: "nonexistent publisher" }),
    [],
  );
  assert.equal(
    [...catalogStats.categoryCounts.values()].reduce(
      (sum, count) => sum + count,
      0,
    ),
    benchmarks.length,
  );
});

test("router-backed catalog interface merges rapid filters and restores URL state from history", async () => {
  const router = createTestRouter();
  await router.push({
    path: "/",
    query: { category: benchmarks[0]!.category, view: "list", sort: "year" },
  });
  const catalog = createCatalogQuery(router);

  // Calls made before the first replace completes must merge from its target URL.
  await Promise.all([
    catalog.setFilter("publisher", benchmarks[0]!.publisher),
    catalog.setFilter("kind", benchmarks[0]!.kind),
  ]);
  assert.equal(
    router.currentRoute.value.query.category,
    benchmarks[0]!.category,
  );
  assert.equal(
    router.currentRoute.value.query.publisher,
    benchmarks[0]!.publisher,
  );
  assert.equal(router.currentRoute.value.query.kind, benchmarks[0]!.kind);
  assert.ok(
    catalog.results.value.some((item) => item.id === benchmarks[0]!.id),
  );

  await catalog.setFilter("publisher", "unknown publisher");
  assert.deepEqual(catalog.results.value, []);
  await catalog.reset();
  assert.deepEqual(router.currentRoute.value.query, {
    view: "list",
    sort: "year",
  });
  assert.equal(catalog.results.value.length, benchmarks.length);
  assert.equal(catalog.query.value.view, "list");
  assert.equal(catalog.query.value.sort, "year");

  await router.push("/other");
  const restored = new Promise<void>((resolve) =>
    router.afterEach(() => resolve()),
  );
  router.back();
  await restored;
  assert.equal(router.currentRoute.value.path, "/");
  assert.equal(catalog.query.value.view, "list");
  assert.equal(catalog.query.value.sort, "year");
});

test("leaving the catalog cancels pending filter replacements", async () => {
  const router = createTestRouter();
  await router.push("/");
  const catalog = createCatalogQuery(router);

  const pending = [
    catalog.setFilter("publisher", benchmarks[0]!.publisher),
    catalog.setFilter("kind", benchmarks[0]!.kind),
  ];
  await router.push("/other");
  await Promise.all(pending);

  assert.equal(router.currentRoute.value.path, "/other");
});
