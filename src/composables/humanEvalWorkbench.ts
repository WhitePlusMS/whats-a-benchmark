import { computed, ref, watch } from "vue";
import type {
  HumanEvalCase,
  HumanEvalExample,
} from "../content/humanEvalExperience";
import { illustrationLength } from "../lib/humanEvalIllustration";

export function useHumanEvalWorkbench(
  getCase: () => HumanEvalCase | undefined,
  getExamples: () => HumanEvalExample[],
) {
  const exampleId = ref<string>(getCase()?.defaultExample || "prompt-1");
  const testsRevealed = ref(false);
  const solutionRevealed = ref(false);
  const step = ref(0);
  const example = computed(() =>
    getExamples().find(
      (item) =>
        item.id === exampleId.value &&
        (item.origin === "prompt" || testsRevealed.value),
    ),
  );
  const length = computed(() =>
    getCase() && example.value
      ? illustrationLength(getCase()!.kind, example.value)
      : 0,
  );
  function reset() {
    exampleId.value = getCase()?.defaultExample || "prompt-1";
    testsRevealed.value = false;
    solutionRevealed.value = false;
    step.value = 0;
  }
  watch(() => getCase()?.sampleId, reset, { flush: "sync" });
  watch(
    example,
    () => {
      step.value = 0;
      solutionRevealed.value = false;
    },
    { flush: "sync" },
  );
  function selectExample(id: string) {
    if (
      !getExamples().some(
        (item) =>
          item.id === id && (item.origin === "prompt" || testsRevealed.value),
      )
    )
      return;
    exampleId.value = id;
    step.value = 0;
    solutionRevealed.value = false;
  }
  function toggleTests() {
    testsRevealed.value = !testsRevealed.value;
    if (!testsRevealed.value && exampleId.value.startsWith("test-"))
      selectExample(getCase()?.defaultExample || "prompt-1");
  }
  function seek(value: number) {
    if (Number.isInteger(value))
      step.value = Math.max(0, Math.min(value, length.value));
  }
  return {
    example,
    exampleId,
    testsRevealed,
    solutionRevealed,
    step,
    length,
    reset,
    selectExample,
    toggleTests,
    seek,
  };
}
