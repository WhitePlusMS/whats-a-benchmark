import { ref, watch } from "vue";
import { cloneGrid, exactGridMatch, resizeGrid } from "../lib/arcGrid";
import type { ArcGrid, ArcPair } from "../lib/arcGrid";

/** Local, unlimited practice. Never stores answers or a model score in URL/storage. */
export function useArcPractice(
  getPair: () => ArcPair,
  getSampleId: () => string,
) {
  const draft = ref<ArcGrid>([]);
  const history = ref<ArcGrid[]>([]);
  const color = ref(0);
  const revealed = ref(false);
  const checked = ref<boolean | null>(null);
  function reset() {
    draft.value = getPair().input.map((row) => row.map(() => 0));
    history.value = [];
    color.value = 0;
    revealed.value = false;
    checked.value = null;
  }
  watch([getPair, getSampleId], reset, { immediate: true, flush: "sync" });
  function replace(next: ArcGrid) {
    if (exactGridMatch(draft.value, next)) return;
    history.value = [...history.value.slice(-49), cloneGrid(draft.value)];
    draft.value = cloneGrid(next);
    checked.value = null;
  }
  function paint(row: number, column: number, value = color.value) {
    if (
      !Number.isInteger(value) ||
      value < 0 ||
      value > 9 ||
      draft.value[row]?.[column] === undefined
    )
      return;
    const next = cloneGrid(draft.value);
    next[row][column] = value;
    replace(next);
  }
  function resize(rows: number, columns: number) {
    const next = resizeGrid(draft.value, rows, columns);
    if (!next) return false;
    replace(next);
    return true;
  }
  function undo() {
    const previous = history.value.at(-1);
    if (!previous) return;
    draft.value = cloneGrid(previous);
    history.value = history.value.slice(0, -1);
    checked.value = null;
  }
  function check() {
    checked.value = exactGridMatch(draft.value, getPair().output);
  }
  function reveal() {
    revealed.value = true;
  }
  function copyInput() {
    replace(getPair().input);
  }
  function clear() {
    replace(draft.value.map((row) => row.map(() => 0)));
  }
  return {
    draft,
    history,
    color,
    revealed,
    checked,
    reset,
    paint,
    resize,
    undo,
    check,
    reveal,
    copyInput,
    clear,
  };
}
