import { inject } from "vue";
import type { InjectionKey, Ref } from "vue";

interface CatalogNavigation {
  catalogLocation: Ref<string>;
}

// 每个应用实例单独提供，避免预生成页面之间共享浏览状态。
export const catalogNavigationKey: InjectionKey<CatalogNavigation> =
  Symbol("catalogNavigation");

export function useCatalogNavigation(): CatalogNavigation {
  const state = inject(catalogNavigationKey);
  if (!state)
    throw new Error("Catalog navigation must be provided by the app.");
  return state;
}
