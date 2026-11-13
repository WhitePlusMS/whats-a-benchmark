import { ref, watch } from "vue";
import type { Gsm8kCase } from "../content/gsm8kExperience";
export function useGsm8kWorkbench(getCase: () => Gsm8kCase | undefined) {
  const step = ref(0),
    draft = ref(""),
    checked = ref(false),
    referenceRevealed = ref(false);
  function reset() {
    step.value = 0;
    draft.value = "";
    checked.value = false;
    referenceRevealed.value = false;
  }
  watch(() => getCase()?.sampleId, reset, { flush: "sync" });
  watch(draft, () => (checked.value = false), { flush: "sync" });
  function seek(value: number) {
    if (Number.isInteger(value))
      step.value = Math.max(0, Math.min(value, getCase()?.steps.length || 0));
  }
  return { step, draft, checked, referenceRevealed, reset, seek };
}
