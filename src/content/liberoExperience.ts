export const liberoCases = [
  {
    sampleId: "libero-dataset-episode-0",
    label: "双杯归位",
    kind: "train",
    badge: "train · 真实观测",
  },
  {
    sampleId: "libero-pi05-spatial-task0-trial0",
    label: "找对黑碗",
    kind: "rollout",
    badge: "第三方 · 单次运行",
  },
] as const;
export function findLiberoCase(id: unknown) {
  if (id === undefined || id === null || id === "") return liberoCases[0];
  return liberoCases.find((c) => c.sampleId === id);
}
export function isUnknownLiberoSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "libero" &&
    (!path || path === "/benchmarks/libero/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((s) => s.id === id)
  );
}
export const liberoOfficialRoot =
  "https://github.com/Lifelong-Robot-Learning/LIBERO/blob/8f1084e3132a39270c3a13ebe37270a43ece2a01/";
export const liberoVideoSource =
  "https://huggingface.co/datasets/ctegdf/pi05-libero-rollouts/blob/4b03350d65593f39b2f12fe83c866f1ac1902b7d/videos/official/full/libero_spatial_task-00_trial-00_attempt-00_success-fb443e5254.mp4";
export function readLiberoFrame(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const frame = (raw as Record<string, unknown>).first_frame as
    | Record<string, unknown>
    | undefined;
  if (!frame) return null;
  const state = frame["observation.state"],
    action = frame.action;
  if (
    !Array.isArray(state) ||
    state.length !== 8 ||
    !Array.isArray(action) ||
    action.length !== 7 ||
    ![...state, ...action].every(
      (v) => typeof v === "number" && Number.isFinite(v),
    )
  )
    return null;
  return { state: state as number[], action: action as number[] };
}
/** Teaching truth table only. Not an environment evaluation or an image classifier. */
export function liberoGoalSatisfied(first: boolean, second: boolean) {
  return first && second;
}
export function readLiberoTask(raw: unknown, train: boolean): string | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  if (!train)
    return typeof record.task_description === "string"
      ? record.task_description
      : null;
  const episode = record.episode as Record<string, unknown> | undefined;
  return Array.isArray(episode?.tasks) && typeof episode.tasks[0] === "string"
    ? episode.tasks[0]
    : null;
}
