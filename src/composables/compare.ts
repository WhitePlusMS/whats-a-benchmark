import { computed, inject, ref } from "vue";
import type { ComputedRef, InjectionKey, Ref } from "vue";
import type { Router } from "vue-router";
import {
  COMPARISON_LIMIT,
  normalizeComparisonIds,
  parseComparisonIds,
} from "../lib/comparison";
export interface Comparison {
  selected: ComputedRef<string[]>;
  toggle: (id: string) => void;
  clear: () => void;
  notice: Ref<string>;
}
export const comparisonKey: InjectionKey<Comparison> = Symbol("comparison");

const selectionKey = "benchmark-comparison";

/** 结果页以 URL 为准，目录选择随当前标签页保存。 */
export function createComparison(
  router: Router,
  session = (): Pick<Storage, "getItem" | "setItem"> | undefined =>
    globalThis.window?.sessionStorage,
) {
  const remembered = ref<string[]>([]);
  const notice = ref("");
  // SSG generates query-free pages. Read shared selections after hydration only.
  const active = ref(false);
  let pendingIds: string[] | undefined;
  const isCompare = (path: string) =>
    path === "/compare/" || path === "/compare";
  const selected = computed(() =>
    active.value && isCompare(router.currentRoute.value.path)
      ? parseComparisonIds(router.currentRoute.value.query.ids)
      : remembered.value,
  );
  function remember(ids: string[]) {
    remembered.value = ids;
    try {
      session()?.setItem(selectionKey, ids.join(","));
    } catch {
      // 禁用浏览器存储时仍保留本次页面会话中的选择。
    }
  }
  const dispose = router.afterEach((to, from, failure) => {
    if (!active.value) return;
    if (failure) {
      if (!isCompare(router.currentRoute.value.path)) pendingIds = undefined;
      return;
    }
    if (isCompare(to.path)) {
      remember(parseComparisonIds(to.query.ids));
    } else if (isCompare(from.path)) {
      remember(parseComparisonIds(from.query.ids));
      pendingIds = undefined;
    }
    notice.value = "";
  });
  function update(ids: string[]) {
    const next = normalizeComparisonIds(ids);
    if (isCompare(router.currentRoute.value.path)) {
      const route = router.currentRoute.value;
      const query = {
        ...route.query,
        ids: next.join(",") || undefined,
      };
      pendingIds = next;
      void router
        .replace({ path: route.path, hash: route.hash, query })
        .finally(() => {
          if (pendingIds === next) pendingIds = undefined;
        });
    } else remember(next);
  }
  function toggle(id: string) {
    notice.value = "";
    const current = isCompare(router.currentRoute.value.path)
      ? (pendingIds ?? selected.value)
      : selected.value;
    if (current.includes(id)) update(current.filter((value) => value !== id));
    else if (!normalizeComparisonIds([id]).length) return;
    else if (current.length < COMPARISON_LIMIT) update([...current, id]);
    else notice.value = `最多对比 ${COMPARISON_LIMIT} 个评测，请先移除一个。`;
  }
  function clear() {
    notice.value = "";
    update([]);
  }
  return {
    selected,
    notice,
    toggle,
    clear,
    activate: () => {
      try {
        remembered.value = parseComparisonIds(session()?.getItem(selectionKey));
      } catch {
        // 存储不可用时可照常使用目录和分享链接。
      }
      active.value = true;
    },
    dispose,
  };
}

export function useComparison(): Comparison {
  const state = inject(comparisonKey);
  if (!state) throw new Error("Comparison state must be provided by App.");
  return state;
}
