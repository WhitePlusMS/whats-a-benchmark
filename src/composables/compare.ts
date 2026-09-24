import { inject } from "vue";
import type { InjectionKey, Ref } from "vue";
export interface Comparison {
  selected: Ref<string[]>;
  toggle: (id: string) => void;
  clear: () => void;
  notice: Ref<string>;
}
export const comparisonKey: InjectionKey<Comparison> = Symbol("comparison");
export function useComparison(): Comparison {
  const state = inject(comparisonKey);
  if (!state) throw new Error("Comparison state must be provided by App.");
  return state;
}
