import { ref, watch, computed } from "vue";
import { checkMmluPro, type MmluProRecord } from "../content/mmluProExperience";
export function useMmluProPractice(getRecord: () => MmluProRecord) {
  const selected = ref<number | null>(null),
    revealed = ref(false),
    explanation = ref(false),
    original = ref(false),
    step = ref(0);
  const result = computed(() => checkMmluPro(getRecord(), selected.value));
  function reset() {
    selected.value = null;
    revealed.value = false;
    explanation.value = false;
    original.value = false;
    step.value = 0;
  }
  watch(getRecord, reset, { flush: "sync" });
  watch(
    selected,
    () => {
      revealed.value = false;
      explanation.value = false;
      original.value = false;
      step.value = 0;
    },
    { flush: "sync" },
  );
  return { selected, revealed, explanation, original, step, result, reset };
}
