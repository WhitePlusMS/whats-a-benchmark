import { computed, ref, watch } from "vue";
export function useIfevalWorkbench(getId: () => string | undefined) {
  const draft = ref(""),
    selectedVariant = ref(0),
    showMatrix = ref(false);
  const previousDraft = ref<string | null>(null);
  function replaceDraft(text: string) {
    if (text === draft.value) return;
    const previous = draft.value;
    draft.value = text;
    previousDraft.value = previous;
  }
  function undo() {
    if (previousDraft.value === null) return;
    draft.value = previousDraft.value;
    previousDraft.value = null;
  }
  function reset() {
    replaceDraft("");
    selectedVariant.value = 0;
    showMatrix.value = false;
  }
  watch(
    getId,
    () => {
      reset();
      previousDraft.value = null;
    },
    { flush: "sync" },
  );
  watch(
    draft,
    () => {
      selectedVariant.value = 0;
      // 继续手写后，旧的替换撤销不能覆盖新输入。
      previousDraft.value = null;
    },
    { flush: "sync" },
  );
  watch(
    showMatrix,
    (open) => {
      if (!open) selectedVariant.value = 0;
    },
    { flush: "sync" },
  );
  return {
    draft,
    selectedVariant,
    showMatrix,
    reset,
    replaceDraft,
    undo,
    canUndo: computed(() => previousDraft.value !== null),
  };
}
