import assert from "node:assert/strict";
import test from "node:test";
import { effectScope, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { createComparison } from "../src/composables/compare";
import { useIfevalWorkbench } from "../src/composables/ifevalWorkbench";
import { useArcPractice } from "../src/composables/arcPractice";
import { createCatalogQuery } from "../src/lib/catalogQuery";
import { allBenchmarks } from "../src/content/catalog";
import { initTheme, useTheme } from "../src/lib/theme";

function routerFixture() {
  return createRouter({
    history: createMemoryHistory(),
    routes: ["/", "/compare/"].map((path) => ({ path, component: {} })),
  });
}

test("无结果放宽条件保留搜索词和显示偏好，并合并尚未完成的输入", async () => {
  const router = routerFixture();
  await router.push(
    "/?q=human&publisher=unknown&category=code&view=list&sort=year",
  );
  const catalog = createCatalogQuery(router);
  assert.equal(catalog.results.value.length, 0);
  await catalog.relaxFilters();
  assert.deepEqual(router.currentRoute.value.query, {
    q: "human",
    view: "list",
    sort: "year",
  });
  assert.ok(catalog.results.value.some((item) => item.id === "human-eval"));
  await Promise.all([catalog.setFilter("q", "ARC"), catalog.relaxFilters()]);
  assert.equal(catalog.query.value.q, "ARC");
});

test("清空后立即撤销在目录、对比页及会话存储中恢复同一组选择", async () => {
  const router = routerFixture();
  const ids = allBenchmarks.slice(0, 2).map((item) => item.id);
  let stored = "";
  const state = createComparison(router, () => ({
    getItem: () => stored,
    setItem: (_key: string, value: string) => {
      stored = value;
    },
  }));
  await router.push("/");
  state.activate();
  for (const id of ids) state.toggle(id);
  state.clear();
  assert.equal(state.canUndoClear.value, true);
  assert.deepEqual(state.selected.value, []);
  state.undoClear();
  assert.deepEqual(state.selected.value, ids);
  assert.equal(stored, ids.join(","));
  await router.push({ path: "/compare/", query: { ids: ids.join(",") } });
  const settled = new Promise<void>((resolve) => {
    const stop = router.afterEach((to, _from, failure) => {
      if (!failure && to.query.ids === ids.join(",")) {
        stop();
        resolve();
      }
    });
  });
  state.clear();
  state.undoClear();
  // 连续清空/撤销可能回到当前 URL，不会产生新的导航。
  await Promise.resolve();
  assert.deepEqual(state.selected.value, ids);
  assert.equal(state.canUndoClear.value, false);
  state.clear();
  await new Promise<void>((resolve) => {
    const stop = router.afterEach((to, _from, failure) => {
      if (!failure && !to.query.ids) {
        stop();
        resolve();
      }
    });
  });
  assert.equal(stored, "");
  state.undoClear();
  await settled;
  assert.deepEqual(state.selected.value, ids);
  assert.equal(stored, ids.join(","));
  state.dispose();
});

test("IFEval 覆盖和清空可撤回，收起候选后只检查当前输入", () => {
  const scope = effectScope();
  const id = ref("first");
  const state = scope.run(() => useIfevalWorkbench(() => id.value))!;
  state.draft.value = "my draft";
  state.replaceDraft("teaching fragment");
  state.undo();
  assert.equal(state.draft.value, "my draft");
  state.reset();
  assert.equal(state.draft.value, "");
  state.undo();
  assert.equal(state.draft.value, "my draft");
  state.showMatrix.value = true;
  state.selectedVariant.value = 4;
  state.showMatrix.value = false;
  assert.equal(state.selectedVariant.value, 0);
  state.reset();
  id.value = "second";
  assert.equal(state.canUndo.value, false, "切题不恢复其他题目的输入");
  scope.stop();
});

test("ARC 收起参考保留作答、撤销历史及已看参考的事实", () => {
  const scope = effectScope();
  const state = scope.run(() =>
    useArcPractice(
      () => ({ input: [[0, 0]], output: [[1, 0]] }),
      () => "case",
    ),
  )!;
  state.paint(0, 0, 1);
  state.reveal();
  assert.equal(state.referenceVisible.value, true);
  state.reveal();
  assert.equal(state.referenceVisible.value, false);
  assert.equal(state.revealed.value, true);
  assert.deepEqual(state.draft.value, [[1, 0]]);
  state.clear();
  state.undo();
  assert.deepEqual(state.draft.value, [[1, 0]]);
  scope.stop();
});

test("浏览器禁止存储时主题初始化和切换仍可完成", (t) => {
  const properties = ["window", "document", "localStorage", "matchMedia"];
  const originals = properties.map((name) =>
    Object.getOwnPropertyDescriptor(globalThis, name),
  );
  t.after(() =>
    properties.forEach((name, index) => {
      const original = originals[index];
      if (original) Object.defineProperty(globalThis, name, original);
      else Reflect.deleteProperty(globalThis, name);
    }),
  );
  const variables = new Map<string, string>();
  const dataset: Record<string, string> = {};
  Object.defineProperties(globalThis, {
    window: { configurable: true, value: {} },
    document: {
      configurable: true,
      value: {
        documentElement: {
          style: {
            setProperty: (key: string, value: string) =>
              variables.set(key, value),
          },
          dataset,
          removeAttribute: () => {
            delete dataset.colorMode;
          },
        },
        querySelector: () => ({ setAttribute: () => {} }),
      },
    },
    localStorage: {
      configurable: true,
      get() {
        throw new Error("Storage denied");
      },
    },
    matchMedia: {
      configurable: true,
      value: () => ({ matches: false, addEventListener: () => {} }),
    },
  });
  assert.doesNotThrow(initTheme);
  const theme = useTheme();
  assert.doesNotThrow(() => theme.applyTheme(theme.presets[1]!));
  assert.equal(theme.activeId.value, theme.presets[1]!.id);
  assert.equal(variables.get("--theme-brand"), theme.presets[1]!.brand);
  assert.doesNotThrow(theme.cycleColorMode);
  assert.equal(dataset.colorMode, "light");
  assert.doesNotThrow(theme.cycleColorMode);
  assert.equal(dataset.colorMode, "dark");
  assert.doesNotThrow(theme.cycleColorMode);
  assert.equal(dataset.colorMode, undefined);
});
