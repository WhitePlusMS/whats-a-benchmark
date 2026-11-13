import { ref, watch } from "vue";
export function useMmmluWorkbench(getId: () => string | undefined) {
  const selectedOption = ref<number | null>(null),
    revealed = ref(false);
  function reset() {
    selectedOption.value = null;
    revealed.value = false;
  }
  function choose(index: number) {
    if (Number.isInteger(index) && index >= 0 && index <= 3)
      selectedOption.value = index;
  }
  watch(getId, reset, { flush: "sync" });
  return { selectedOption, revealed, choose, reset };
}
