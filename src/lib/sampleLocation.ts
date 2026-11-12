import { watch } from "vue";
import type { Router } from "vue-router";
import type { useSampleViewer } from "../composables/sampleViewer";

type Viewer = Pick<
  ReturnType<typeof useSampleViewer>,
  "data" | "index" | "mode" | "current"
>;

/** 图解区选题时保留其他查询参数，清除原始模式和锚点，避免跳到样例区。 */
export function selectSampleFromWalkthrough(router: Router, sampleId: string) {
  const route = router.currentRoute.value;
  return router.replace({
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
      viewer.index.value = Math.max(0, index);
      viewer.mode.value = route.query.sampleView === "raw" ? "raw" : "read";
    },
    { immediate: true },
  );

  function writeLocation() {
    // 指南复用查看器时只切换本地状态；只有对应详情页把题目写入 URL。
    if (
      !viewer.current.value ||
      router.currentRoute.value.path !==
        `/benchmarks/${viewer.data.value?.benchmarkId}/`
    )
      return;
    return router.replace({
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
    return writeLocation();
  }
  function setMode(mode: "read" | "raw") {
    viewer.mode.value = mode;
    return writeLocation();
  }
  return { selectSample, setMode };
}
