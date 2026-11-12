import { watch } from "vue";
import type { Router } from "vue-router";
import type { useSampleViewer } from "../composables/sampleViewer";

type Viewer = Pick<
  ReturnType<typeof useSampleViewer>,
  "data" | "index" | "mode" | "current"
>;

/** 图解区选题时保留其他查询参数，清除原始模式和锚点，避免跳到样例区。 */
export function selectSampleFromWalkthrough(
  router: Router,
  sampleId: string,
  history: "push" | "replace" = "replace",
) {
  const route = router.currentRoute.value;
  return router[history]({
    path: route.path,
    query: { ...route.query, sample: sampleId, sampleView: undefined },
    hash: "",
  });
}

/** URL 只保存题目 ID 与阅读模式，答案和选项仍是本地临时状态。 */
export function createSampleLocation(router: Router, viewer: Viewer) {
  watch(
    [router.currentRoute, viewer.data],
    ([route, data]) => {
      if (!data || route.path !== `/benchmarks/${data.benchmarkId}/`) return;
      const sampleId =
        typeof route.query.sample === "string" ? route.query.sample : "";
      const index = data.samples.findIndex((sample) => sample.id === sampleId);
      // Interactive tasks' unknown selections also clear underlying answer state,
      // rather than only hiding a silently selected first record in the UI.
      const invalidInteractiveSelection =
        [
          "arc-agi-2",
          "human-eval",
          "gsm8k",
          "libero",
          "mmmlu",
          "ifeval",
          "calvin",
          "bfcl",
        ].includes(data.benchmarkId) &&
        route.query.sample !== undefined &&
        route.query.sample !== null &&
        route.query.sample !== "" &&
        index < 0;
      viewer.index.value = invalidInteractiveSelection
        ? -1
        : Math.max(0, index);
      viewer.mode.value = route.query.sampleView === "raw" ? "raw" : "read";
    },
    { immediate: true },
  );

  function writeLocation(history: "push" | "replace" = "replace") {
    // 指南复用查看器时只切换本地状态；只有对应详情页把题目写入 URL。
    if (
      !viewer.current.value ||
      router.currentRoute.value.path !==
        `/benchmarks/${viewer.data.value?.benchmarkId}/`
    )
      return;
    return router[history]({
      path: router.currentRoute.value.path,
      query: {
        ...router.currentRoute.value.query,
        sample: viewer.current.value.id,
        sampleView: viewer.mode.value === "raw" ? "raw" : undefined,
      },
      hash: "#samples",
    });
  }
  function selectSample(index: number) {
    if (!viewer.data.value?.samples[index]) return;
    // 同步更新保证连续点击换题与模式时，后一次操作使用最新题目。
    viewer.index.value = index;
    viewer.mode.value = "read";
    return writeLocation(
      [
        "arc-agi-2",
        "human-eval",
        "gsm8k",
        "libero",
        "mmmlu",
        "ifeval",
        "calvin",
        "bfcl",
      ].includes(viewer.data.value?.benchmarkId || "")
        ? "push"
        : "replace",
    );
  }
  function setMode(mode: "read" | "raw") {
    viewer.mode.value = mode;
    return writeLocation();
  }
  return { selectSample, setMode };
}
