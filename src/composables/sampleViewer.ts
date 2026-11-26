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
    failedAssets: [] as string[],
  });
  const choices = reactive(new Map<string, number>());
  const selectedOption = computed({
    get: () => choices.get(current.value?.id ?? "") ?? null,
    set(value: number) {
      if (current.value) choices.set(current.value.id, value);
    },
  });

  // 换题后允许返回继续作答，只有加载新题集才清除原来记录的选项。
  watch(
    data,
    () => {
      choices.clear();
      index.value = 0;
    },
    { flush: "sync" },
  );
  watch(
    current,
    () => {
      state.mode = "read";
      state.showAnswer = false;
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

  // 只重试当前媒体，不重新获取样例或改变模式、答案与选题。
  function retryMedia() {
    state.failedAssets = [];
  }

  const { mode, showAnswer } = toRefs(state);
  return {
    data,
    error,
    reload,
    index,
    current,
    mode,
    showAnswer,
    selectedOption,
    // 展示模式切换不会清除此状态；媒体重试、切题或重新加载会清除。
    failedAssets: computed(() => readonly(state.failedAssets)),
    markAssetFailed,
    retryMedia,
  };
}
