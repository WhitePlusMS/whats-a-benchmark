import assert from "node:assert/strict";
import test from "node:test";
import { createMemoryHistory, createRouter } from "vue-router";
import {
  benchmarks,
  categories,
  embodiedBenchmarks,
  embodiedCategories,
} from "../src/content/catalog";
import {
  healthcareBenchmarks,
  healthcareCategory,
  healthcareCategoryByBenchmarkId,
  legacyHealthcarePath,
} from "../src/content/healthcare";
import { benchmarkSearchTarget, searchBenchmarks } from "../src/lib/search";
import {
  catalogStats,
  catalogFacetOptions,
  catalogInclusionMonths,
  createCatalogQuery,
  filterCatalog,
  groupByPublisher,
  hasCatalogFilters,
  parseCatalogQuery,
  modelFilterCategories,
  resetCatalogQuery,
  updateCatalogQuery,
} from "../src/lib/catalogQuery";

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/embodied/", component: { template: "<div />" } },
      { path: "/other", component: { template: "<div />" } },
      {
        path: legacyHealthcarePath,
        redirect: (to) => ({
          path: "/",
          query: { ...to.query, category: healthcareCategory.id },
          hash: to.hash,
        }),
      },
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

test("收录月份可叠加搜索、与发布日期分开，能清空且保留排序", (t) => {
  assert.equal(parseCatalogQuery({ included: "2026-13" }).included, "");
  assert.equal(parseCatalogQuery({ included: ["2026-11"] }).included, "");
  const months = catalogInclusionMonths(benchmarks);
  if (!months.length) return t.skip("浅克隆或无 Git 历史的预览不推断收录日期");
  const [latest] = months;
  const selected = filterCatalog(
    parseCatalogQuery({ included: latest, sort: "included" }),
  );
  assert.ok(selected.length);
  assert.ok(selected.every((item) => item.includedOn?.slice(0, 7) === latest));
  assert.ok(
    selected.every(
      (item, i) => i === 0 || item.includedOn! <= selected[i - 1]!.includedOn!,
    ),
  );
  assert.ok(selected.some((item) => item.releaseDate?.slice(0, 7) !== latest));
  const item = selected[0]!;
  const narrowed = filterCatalog(
    parseCatalogQuery({ included: latest, q: item.name }),
  );
  assert.ok(narrowed.some((candidate) => candidate.id === item.id));
  assert.deepEqual(
    resetCatalogQuery({ included: latest, view: "list", sort: "included" }),
    {
      sort: "included",
      view: "list",
    },
  );
});

test("收录月份和动态选项一起生效，具身目录保留月份", async (t) => {
  const [month] = catalogInclusionMonths(benchmarks);
  const [embodiedMonth] = catalogInclusionMonths(embodiedBenchmarks);
  if (!month || !embodiedMonth) return t.skip("无 Git 历史时没有收录月份");
  const query = parseCatalogQuery({
    included: month, publisher: "不匹配的分享值", view: "list",
  });
  const facets = catalogFacetOptions(query);
  assert.deepEqual(facets.publishers, new Set([
    ...filterCatalog({ ...query, publisher: "" }).map((item) => item.publisher),
    query.publisher,
  ]));
  assert.equal(facets.localMatches, 0);
  const router = createTestRouter();
  await router.push({ path: "/embodied/", query: {
    included: embodiedMonth, publisher: query.publisher, sort: "included",
  } });
  const catalog = createCatalogQuery(router);
  assert.equal(catalog.query.value.publisher, "");
  assert.equal(catalog.query.value.included, embodiedMonth);
  assert.ok(catalog.results.value.length);
  assert.ok(catalog.results.value.every(
    (item) => item.includedOn?.slice(0, 7) === embodiedMonth,
  ));
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
    categories.reduce(
      (sum, category) =>
        sum + (catalogStats.categoryCounts.get(category.id) ?? 0),
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
  await catalog.relaxFilters();
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

test("具身目录只包含具身评测，同一评测可按多个任务找到", async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/embodied/", component: { template: "<div />" } }],
  });
  await router.push("/embodied/");
  const catalog = createCatalogQuery(router);
  assert.equal(catalog.results.value.length, embodiedBenchmarks.length);
  assert.ok(!benchmarks.some((item) => item.id === "robotwin-2"));
  await catalog.setFilter("category", "bimanual");
  assert.ok(catalog.results.value.some((item) => item.id === "robotwin-2"));
  await catalog.setFilter("category", "manipulation");
  assert.ok(catalog.results.value.some((item) => item.id === "robotwin-2"));
  assert.equal(router.currentRoute.value.path, "/embodied/");
  assert.ok(
    filterCatalog(parseCatalogQuery({ q: "bimanual" }), true).some(
      (item) => item.id === "robotwin-2",
    ),
  );
  assert.deepEqual(
    filterCatalog(parseCatalogQuery({ q: "Agent 与工具使用" }), true),
    [],
  );
});

test("医疗健康是模型目录的一个筛选项，原能力和详情路径不变", () => {
  const id = healthcareCategory.id;
  assert.deepEqual(modelFilterCategories.slice(0, -1), categories);
  assert.equal(modelFilterCategories.at(-1)?.name, "医疗健康");
  assert.ok(healthcareBenchmarks.length >= 8);
  assert.equal(
    healthcareBenchmarks.length,
    healthcareCategoryByBenchmarkId.size,
  );
  assert.equal(
    catalogStats.categoryCounts.get(id),
    healthcareBenchmarks.length,
  );

  const healthcare = filterCatalog(parseCatalogQuery({ category: id }));
  assert.deepEqual(
    healthcare.map((item) => item.id).sort(),
    healthcareBenchmarks.map((item) => item.id).sort(),
  );
  assert.equal(
    filterCatalog(parseCatalogQuery({ category: id }), true).length,
    0,
  );
  assert.equal(filterCatalog(parseCatalogQuery({})).length, benchmarks.length);
  const fromDoctorFilter = filterCatalog(
    parseCatalogQuery({ category: "agents", q: "PhysicianBench" }),
  )[0];
  const fromHealthFilter = healthcare.find(
    (item) => item.id === "physicianbench",
  );
  assert.ok(fromHealthFilter);
  assert.equal(fromDoctorFilter, fromHealthFilter);
  assert.equal(
    benchmarkSearchTarget(fromHealthFilter),
    "/benchmarks/physicianbench/",
  );
});

test("模型目录医疗健康和搜索叠加，清空回到模型目录，旧网址跳转", async () => {
  const router = createTestRouter();
  await router.push(
    "/healthcare/?category=clinical-workflow&q=PhysicianBench&view=list#catalog",
  );
  const catalog = createCatalogQuery(router);
  assert.equal(router.currentRoute.value.path, "/");
  assert.equal(router.currentRoute.value.hash, "#catalog");
  assert.equal(catalog.query.value.category, healthcareCategory.id);
  assert.equal(catalog.query.value.q, "PhysicianBench");
  assert.equal(catalog.query.value.view, "list");
  assert.equal(catalog.currentCategory.value?.name, "医疗健康");
  assert.deepEqual(
    catalog.results.value.map((item) => item.id),
    ["physicianbench"],
  );
  await catalog.setFilter("q", "Terminal-Bench 4.0");
  assert.equal(catalog.results.value.length, 0);
  assert.equal(router.currentRoute.value.path, "/");
  await catalog.relaxFilters();
  assert.equal(catalog.query.value.category, "");
  assert.equal(catalog.query.value.view, "list");
  assert.equal(catalog.query.value.q, "Terminal-Bench 4.0");
  assert.ok(catalog.results.value.some((item) => item.id === "terminal-bench-4"));
});

test("医疗健康分类可检索 InclusionMed，保留原能力分类和详情路径", () => {
  const fromHealthcare = filterCatalog(
    parseCatalogQuery({ category: healthcareCategory.id, q: "InclusionMed" }),
  );
  assert.deepEqual(
    fromHealthcare.map((item) => item.id),
    ["inclusionmed-index"],
  );
  const fromCapability = filterCatalog(
    parseCatalogQuery({ category: "general", q: "InclusionMed" }),
  )[0];
  assert.equal(fromHealthcare[0], fromCapability);
  assert.equal(
    benchmarkSearchTarget(fromHealthcare[0]!),
    "/benchmarks/inclusionmed-index/",
  );
});

test("医疗健康分类可检索 MedGuardBench，保留原能力分类和详情路径", () => {
  const fromHealthcare = filterCatalog(
    parseCatalogQuery({ category: healthcareCategory.id, q: "MedGuardBench" }),
  );
  assert.deepEqual(
    fromHealthcare.map((item) => item.id),
    ["medguardbench"],
  );
  const fromCapability = filterCatalog(
    parseCatalogQuery({ category: "alignment", q: "MedGuardBench" }),
  )[0];
  assert.equal(fromHealthcare[0], fromCapability);
  assert.equal(
    benchmarkSearchTarget(fromHealthcare[0]!),
    "/benchmarks/medguardbench/",
  );
});

const frontierPairs = [
  ["frontierscience", "frontierscience-research"],
  ["frontiermath-v2-tiers-1-3", "frontiermath-v2-tier-4"],
] as const;

function assertFrontierPairs(ids: readonly string[]) {
  for (const [first, second] of frontierPairs) {
    const i = ids.indexOf(first);
    assert.notEqual(i, -1);
    assert.equal(ids[i + 1], second);
  }
}

test("default directory and selected category keep the actual Frontier publishers adjacent", async () => {
  const router = createTestRouter();
  const catalog = createCatalogQuery(router);
  await router.push("/");
  const groups = catalog.groupedResults.value;
  assert.deepEqual(
    groups.map(({ category }) => category.id),
    categories.map(({ id }) => id),
  );
  for (const { category, items } of groups) {
    const original = benchmarks.filter(
      (entry) => entry.category === category.id,
    );
    assert.deepEqual(
      items.map(({ id }) => id).sort(),
      original.map(({ id }) => id).sort(),
    );
    const publishers = [...new Set(original.map(({ publisher }) => publisher))];
    assert.deepEqual(
      items.map(({ publisher }) => publisher),
      publishers.flatMap((p) =>
        original
          .filter((entry) => entry.publisher === p)
          .map(({ publisher }) => publisher),
      ),
    );
    for (const publisher of publishers) {
      const ids = (entries: typeof items) =>
        entries
          .filter((item) => item.publisher === publisher)
          .map(({ id }) => id);
      assert.deepEqual(ids(items), ids(original));
    }
  }
  const reasoning = groups.find(({ category }) => category.id === "reasoning")!;
  assertFrontierPairs(reasoning.items.map(({ id }) => id));
  for (const view of ["grid", "list"]) {
    await router.push({ path: "/", query: { category: "reasoning", view } });
    assert.equal(catalog.groupedResults.value.length, 0);
    assert.deepEqual(
      catalog.results.value.map(({ id }) => id),
      reasoning.items.map(({ id }) => id),
    );
  }
  await router.push({ path: "/", query: { category: healthcareCategory.id } });
  assert.deepEqual(
    catalog.results.value.map(({ id }) => id).sort(),
    healthcareBenchmarks.map(({ id }) => id).sort(),
  );

  await router.push("/embodied/");
  assert.deepEqual(
    catalog.groupedResults.value.map(({ category }) => category.id),
    embodiedCategories.map(({ id }) => id),
  );
  for (const { category, items } of catalog.groupedResults.value) {
    assert.deepEqual(
      items.map(({ id }) => id).sort(),
      embodiedBenchmarks
        .filter((item) =>
          item.embodied?.tasks.some((task) => task === category.id),
        )
        .map(({ id }) => id)
        .sort(),
    );
  }
});

test("publisher grouping leaves the global flat list, query relevance, and explicit sorts alone", async () => {
  const router = createTestRouter();
  const catalog = createCatalogQuery(router);
  const ids = (items: typeof benchmarks) => items.map(({ id }) => id);
  await router.push({ path: "/", query: { view: "list" } });
  assert.equal(catalog.groupedResults.value.length, 0);
  assert.deepEqual(ids(catalog.results.value), ids(benchmarks));

  await router.push({
    path: "/",
    query: { q: "Frontier", category: "reasoning" },
  });
  const relevance = searchBenchmarks("Frontier").filter(
    (item) => item.category === "reasoning",
  );
  assert.ok(relevance.length >= 4);
  assert.equal(catalog.groupedResults.value.length, 0);
  assert.deepEqual(ids(catalog.results.value), ids(relevance));

  for (const sort of ["name", "year"] as const) {
    const compare =
      sort === "name"
        ? (a: (typeof benchmarks)[number], b: (typeof benchmarks)[number]) =>
            a.name.localeCompare(b.name)
        : (a: (typeof benchmarks)[number], b: (typeof benchmarks)[number]) =>
            (b.year || 0) - (a.year || 0);
    const expected = benchmarks
      .filter((item) => item.category === "reasoning")
      .sort(compare);
    await router.push({ path: "/", query: { sort } });
    assert.deepEqual(
      ids(
        catalog.groupedResults.value.find(
          ({ category }) => category.id === "reasoning",
        )!.items,
      ),
      ids(expected),
    );
    await router.push({ path: "/", query: { category: "reasoning", sort } });
    assert.deepEqual(ids(catalog.results.value), ids(expected));
  }
});

test("complete co-publisher names are distinct; missing and unknown names do not become a bucket", () => {
  const labels = [
    "OpenAI",
    "OpenAI / Partner",
    "未知",
    "OpenAI",
    "Other",
    "未知",
    "",
    "Other",
    "",
    "OpenAI / Partner",
  ];
  const items = labels.map((publisher, i) => ({
    ...benchmarks[0]!,
    id: String(i),
    publisher,
  }));
  assert.deepEqual(
    groupByPublisher(items).map(({ id }) => id),
    ["0", "3", "1", "9", "2", "4", "7", "5", "6", "8"],
  );
  assert.deepEqual(
    items.map(({ publisher }) => publisher),
    labels,
  );
});
