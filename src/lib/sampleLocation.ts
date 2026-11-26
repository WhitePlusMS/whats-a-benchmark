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
export function createSampleLocation(
  router: Router,
  viewer: Viewer,
  detailId = () => viewer.data.value?.benchmarkId,
) {
  let pendingSample: ReturnType<typeof writeLocation>;
  watch(
    [router.currentRoute, viewer.data],
    ([route, data]) => {
      if (!data || route.path !== `/benchmarks/${detailId()}/`) return;
      const sample = route.query.sample;
      // 未知编号保留恢复入口；仅无编号的链接默认展示首题。
      viewer.index.value =
        sample === undefined || sample === null || sample === ""
          ? 0
          : data.samples.findIndex((task) => task.id === sample);
      viewer.mode.value = route.query.sampleView === "raw" ? "raw" : "read";
    },
    { immediate: true },
  );

  function writeLocation(history: "push" | "replace" = "replace") {
    // 指南复用查看器时只切换本地状态；只有对应详情页把题目写入 URL。
    if (
      !viewer.current.value ||
      router.currentRoute.value.path !== `/benchmarks/${detailId()}/`
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
  function pushSampleLocation() {
    const navigation = writeLocation("push");
    if (!navigation) return;
    pendingSample = navigation;
    return navigation.finally(() => {
      if (pendingSample === navigation) pendingSample = undefined;
    });
  }
  function selectSample(index: number) {
    if (!viewer.data.value?.samples[index]) return;
    // 同步更新保证连续点击换题与模式时，后一次操作使用最新题目。
    viewer.index.value = index;
    viewer.mode.value = "read";
    return pushSampleLocation();
  }
  function setMode(mode: "read" | "raw") {
    if (viewer.mode.value === mode) return;
    viewer.mode.value = mode;
    // 如果后一笔导航会取消仍在提交的换题，保留其 push 语义。
    return pendingSample ? pushSampleLocation() : writeLocation();
  }
  return { selectSample, setMode };
}
