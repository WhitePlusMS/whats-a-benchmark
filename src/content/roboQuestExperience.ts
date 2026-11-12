export const roboQuestCases = [
  {
    sampleId: "roboquest-puzzle-box-demo-000000",
    label: "看开发示范",
    kind: "demo",
    badge: "开发示范 · episode 000000",
  },
  {
    sampleId: "roboquest-toolcall-002e-step1",
    label: "看机器人所见",
    kind: "observation",
    badge: "训练实例 · 002e0374cb9719d0",
  },
  {
    sampleId: "roboquest-eval50-astra-puzzle-059f",
    label: "读一次评测结果",
    kind: "result",
    badge: "独立评测 · 059f7f6ecc3ee5e7",
  },
  {
    sampleId: "roboquest-official-task",
    label: "理解房间搜索",
    kind: "search",
    badge: "Search Room · 任务概览",
  },
] as const;

/** No query selects the first record; malformed or unknown IDs must not alias it. */
export function findRoboQuestCase(sampleId: unknown) {
  if (sampleId === undefined || sampleId === null || sampleId === "")
    return roboQuestCases[0];
  return roboQuestCases.find((item) => item.sampleId === sampleId);
}

export const searchConcepts = [
  {
    label: "搜索隐藏目标",
    text: "先搜索环境，找齐隐藏目标。图中的位置和目标数量仅用于解释任务，不是官方房间布局或一次运行的观测。",
  },
  {
    label: "搬运到托盘",
    text: "找到目标后还要把它们放到托盘。识别出物体不等于完成操作；本站该条记录未收录逐步动作或轨迹，官方说明见下方任务页面。",
  },
  {
    label: "主动提交",
    text: "完成目标后需要主动提交。本站该条记录仅保存任务名称，配以本站概览，未收录某次运行的提交结果或模型成绩；完整任务说明见下方官方任务页面。",
  },
] as const;

/** Keep legacy viewers unchanged; RoboQuest never substitutes another record. */
export function isUnknownRoboQuestSample(
  benchmarkId: string,
  sampleId: unknown,
  samples?: readonly { id: string }[],
  routePath = `/benchmarks/${benchmarkId}/`,
) {
  return (
    benchmarkId === "roboquest" &&
    routePath === "/benchmarks/roboquest/" &&
    !!samples &&
    sampleId !== undefined &&
    sampleId !== null &&
    sampleId !== "" &&
    !samples.some((sample) => sample.id === sampleId)
  );
}
