import { computed, reactive, readonly, ref, toRefs, watch } from "vue";
import { useSampleLoader } from "./sampleLoader";

/** 当前任务的交互状态与加载结果共同管理，媒体组件只报告失败。 */
export function useSampleViewer(
  getBenchmarkId: () => string,
  canLoad: () => boolean,
  baseUrl: string,
) {
  const { data, error, reload } = useSampleLoader(
    getBenchmarkId,
    canLoad,
    baseUrl,
  );
  const index = ref(0);
  const current = computed(() => data.value?.samples[index.value]);
  const state = reactive({
    mode: "read" as "read" | "raw",
    showAnswer: false,
    selectedOption: null as number | null,
    failedAssets: [] as string[],
  });

  // 新的加载结果总从第一题开始；题目对象变化统一重置交互状态。
  watch(
    data,
    () => {
      index.value = 0;
    },
    { flush: "sync" },
  );
  watch(
    current,
    () => {
      state.mode = "read";
      state.showAnswer = false;
      state.selectedOption = null;
      state.failedAssets = [];
    },
    { flush: "sync" },
  );

  function markAssetFailed(path: string) {
    if (
      current.value?.assets?.some((asset) => asset.path === path) &&
      !state.failedAssets.includes(path)
    )
      state.failedAssets.push(path);
  }

  const { mode, showAnswer, selectedOption } = toRefs(state);
  return {
    data,
    error,
    reload,
    index,
    current,
    mode,
    showAnswer,
    selectedOption,
    // 展示模式切换不会清除此状态；切题或重新加载才会清除。
    failedAssets: computed(() => readonly(state.failedAssets)),
    markAssetFailed,
  };
}
