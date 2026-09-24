import assert from "node:assert/strict";
import test from "node:test";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { allBenchmarks } from "../src/content/catalog";
import { createComparison } from "../src/composables/compare";
import {
  COMPARISON_LIMIT,
  normalizeComparisonIds,
  parseComparisonIds,
} from "../src/lib/comparison";

const ids = allBenchmarks.slice(0, COMPARISON_LIMIT + 1).map((item) => item.id);
function setupRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: ["/", "/compare/", "/guide/"].map((path) => ({
      path,
      component: {},
    })),
  });
}
function navigated(router: Router): Promise<void> {
  return new Promise((resolve) => {
    const stop = router.afterEach(() => {
      stop();
      resolve();
    });
  });
}
function routeSettled(router: Router, matches: () => boolean) {
  if (matches()) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    let stop = () => {};
    const timeout = setTimeout(() => {
      stop();
      reject(new Error("Timed out waiting for comparison navigation"));
    }, 3000);
    stop = router.afterEach(() => {
      if (matches()) {
        clearTimeout(timeout);
        stop();
        resolve();
      }
    });
  });
}

test("comparison IDs filter invalid entries before limiting and retain archived share entries", () => {
  assert.deepEqual(
    normalizeComparisonIds(["unknown", ids[0]!, ids[0]!, ...ids.slice(1)]),
    ids.slice(0, COMPARISON_LIMIT),
  );
  assert.deepEqual(parseComparisonIds([ids[0]!]), []);
  const archived = allBenchmarks.filter((item) => item.status === "archived");
  for (const item of archived)
    assert.deepEqual(parseComparisonIds(item.id), [item.id]);
});

test("shared URL hydrates consistently, removal and clearing update both URL and selection", async () => {
  const router = setupRouter();
  await router.push({
    path: "/compare/",
    query: { ids: ids.slice(0, 3).join(",") },
  });
  const state = createComparison(router);
  assert.deepEqual(
    state.selected.value,
    [],
    "SSG and hydration start with the same empty selection",
  );
  state.activate();
  assert.deepEqual(state.selected.value, ids.slice(0, 3));
  let navigation = navigated(router);
  state.toggle(ids[0]!);
  await navigation;
  assert.equal(router.currentRoute.value.query.ids, ids.slice(1, 3).join(","));
  assert.deepEqual(state.selected.value, ids.slice(1, 3));
  navigation = navigated(router);
  state.clear();
  await navigation;
  assert.equal(router.currentRoute.value.query.ids, undefined);
  assert.deepEqual(state.selected.value, []);
  state.dispose();
});

test("history restores URL choices while other pages retain application-local selection", async () => {
  const router = setupRouter();
  await router.push("/");
  const state = createComparison(router);
  state.activate();
  state.toggle(ids[0]!);
  state.toggle(ids[1]!);
  await router.push("/guide/");
  assert.deepEqual(state.selected.value, ids.slice(0, 2));
  await router.push({
    path: "/compare/",
    query: { ids: ids.slice(1, 3).join(",") },
  });
  await router.push({
    path: "/compare/",
    query: { ids: ids.slice(0, 3).join(",") },
  });
  let navigation = navigated(router);
  router.back();
  await navigation;
  assert.deepEqual(state.selected.value, ids.slice(1, 3));
  navigation = navigated(router);
  router.forward();
  await navigation;
  assert.deepEqual(state.selected.value, ids.slice(0, 3));
  await router.push("/");
  state.toggle(ids[3]!);
  assert.deepEqual(state.selected.value, ids.slice(0, 3));
  assert.ok(state.notice.value);
  const anotherApp = createComparison(router);
  anotherApp.activate();
  assert.deepEqual(anotherApp.selected.value, []);
  state.dispose();
  anotherApp.dispose();
});

test("synchronous removals and clear combinations merge pending URL updates", async () => {
  const router = setupRouter();
  await router.push({
    path: "/compare/",
    query: { ids: ids.slice(0, 3).join(",") },
  });
  const state = createComparison(router);
  state.activate();

  let settled = routeSettled(
    router,
    () => router.currentRoute.value.query.ids === ids[2],
  );
  state.toggle(ids[0]!);
  state.toggle(ids[1]!);
  await settled;
  assert.equal(router.currentRoute.value.query.ids, ids[2]);
  assert.deepEqual(state.selected.value, [ids[2]!]);

  settled = routeSettled(
    router,
    () => router.currentRoute.value.query.ids === ids[0],
  );
  state.clear();
  state.toggle(ids[0]!);
  await settled;
  assert.equal(router.currentRoute.value.query.ids, ids[0]);
  assert.deepEqual(state.selected.value, [ids[0]!]);

  settled = routeSettled(
    router,
    () => router.currentRoute.value.query.ids === undefined,
  );
  state.toggle(ids[0]!);
  state.clear();
  await settled;
  assert.equal(router.currentRoute.value.query.ids, undefined);
  assert.deepEqual(state.selected.value, []);
  state.dispose();
});

test("leaving comparison cancels a pending URL replacement and remembers committed IDs", async () => {
  const router = setupRouter();
  await router.push({ path: "/compare/", query: { ids: ids[0]! } });
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  router.beforeEach(async (to) => {
    if (to.path === "/compare/" && to.query.ids === `${ids[0]},${ids[1]}`)
      await gate;
  });
  const state = createComparison(router);
  state.activate();
  state.toggle(ids[1]!);
  const departed = routeSettled(
    router,
    () => router.currentRoute.value.path === "/guide/",
  );
  void router.push("/guide/");
  await departed;
  release();
  assert.equal(router.currentRoute.value.path, "/guide/");
  assert.deepEqual(state.selected.value, [ids[0]!]);
  state.dispose();
});
