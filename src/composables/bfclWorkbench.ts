import { computed, ref, watch } from "vue";
import {
  bfclExample,
  bfclPreview,
  inspectBfcl,
  type BfclRecord,
} from "../content/bfclExperience";
export function useBfclWorkbench(getRecord: () => BfclRecord) {
  const selectedName = ref(""),
    inputs = ref<Record<string, string>>({}),
    included = ref<Record<string, boolean>>({}),
    revealed = ref(false),
    checked = ref(false);
  const selectedFunction = computed(() =>
    getRecord().function.find((f) => f.name === selectedName.value),
  );
  function clearDraft() {
    inputs.value = {};
    included.value = {};
    revealed.value = false;
    checked.value = false;
  }
  function reset() {
    selectedName.value = "";
    clearDraft();
  }
  watch(getRecord, reset, { flush: "sync" });
  watch(selectedName, clearDraft, { flush: "sync" });
  watch(
    [inputs, included],
    () => {
      checked.value = false;
    },
    { deep: true, flush: "sync" },
  );
  const result = computed(() =>
    inspectBfcl(getRecord(), selectedName.value, inputs.value, included.value),
  );
  const preview = computed(() =>
    bfclPreview(selectedFunction.value, inputs.value, included.value),
  );
  function loadExample() {
    const example = bfclExample(getRecord());
    if (!example) return;
    selectedName.value = example.name;
    inputs.value = { ...example.inputs };
    included.value = {};
    revealed.value = true;
    checked.value = false;
  }
  return {
    selectedName,
    inputs,
    included,
    revealed,
    checked,
    selectedFunction,
    result,
    preview,
    reset,
    loadExample,
  };
}
