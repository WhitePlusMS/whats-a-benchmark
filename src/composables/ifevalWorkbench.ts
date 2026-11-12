import { ref, watch } from "vue";
export function useIfevalWorkbench(getId: () => string | undefined) {
  const draft = ref(""),
    selectedVariant = ref(0),
    showMatrix = ref(false);
  function reset() {
    draft.value = "";
    selectedVariant.value = 0;
    showMatrix.value = false;
  }
  watch(getId, reset, { flush: "sync" });
  watch(draft, () => (selectedVariant.value = 0), { flush: "sync" });
  return { draft, selectedVariant, showMatrix, reset };
}
