/** Original explanatory UI. Rules are cited, not a simulation or copied evaluator. */
export const calvinRoot =
  "https://github.com/mees/calvin/blob/fa03f01f19c65920e18cf37398a9ce859274af76/";
export const calvinEnvironmentRules =
  "https://github.com/mees/calvin_env/blob/1431a46bd36bde5903fb6345e68b5ccc30def666/calvin_env/envs/tasks.py";
export const calvinThirdParty =
  "https://github.com/OpenBMB/MiniCPM-Robot/blob/f666593066641d2c0cef06bc17bfb1e954547674/MiniCPM-RobotManip/evaluation/calvin/";
export const calvinCases = [
  {
    sampleId: "calvin-openbmb-eval-sequence-0",
    kind: "chain",
    label: "五任务链",
    badge: "评测配置 · 无运行结果",
  },
  {
    sampleId: "calvin-abc-pink-block-episode0",
    kind: "pink",
    label: "推动粉块",
    badge: "训练记录 · 保存首帧",
  },
  {
    sampleId: "calvin-converted-train-episode-0",
    kind: "door",
    label: "移动滑门",
    badge: "训练记录 · 保存三帧",
  },
  {
    sampleId: "calvin-kyujin-validation-0032068",
    kind: "frame",
    label: "未标注单帧",
    badge: "第三方 validation · 无指令",
  },
] as const;
export type CalvinKind = (typeof calvinCases)[number]["kind"];
export function findCalvinCase(id: unknown) {
  return id === undefined || id === null || id === ""
    ? calvinCases[0]
    : calvinCases.find((c) => c.sampleId === id);
}
export function isUnknownCalvinSample(
  benchmarkId: string,
  id: unknown,
  samples?: readonly { id: string }[],
  path?: string,
) {
  return (
    benchmarkId === "calvin" &&
    (!path || path === "/benchmarks/calvin/") &&
    id !== undefined &&
    id !== null &&
    id !== "" &&
    !!samples &&
    !samples.some((s) => s.id === id)
  );
}
export const calvinSteps = [
  {
    key: "rotate_blue_block_right",
    title: "旋转蓝块",
    language: "take the blue block and rotate it to the right",
    relation: "蓝块：相对旋转，不是移动到另一侧",
    rule: "相对 Euler z 角须满足 −180° < z < −60°；|x|、|y| < 30°，位移范数 ≤ 0.1 米，结束时还须接触机器人之外的物体。",
    warning: "不是转到 −60° 就通过，也不是按相机画面的顺时针判定。",
  },
  {
    key: "move_slider_right",
    title: "向右移滑门",
    language: "push the sliding door to the right side",
    relation: "滑门：关节末值 − 初值 < −0.15",
    rule: "检查 base__slide 关节的相对变化，小于 −0.15 才满足。阈值严格，不包括 −0.15。",
    warning: "任务名的 right 对应该关节负向，不等于世界 x 正向或画面右方。",
  },
  {
    key: "lift_red_block_slider",
    title: "提起红块",
    language: "lift the red block from the sliding cabinet",
    relation: "红块：柜区支撑 → 仅机器人接触",
    rule: "红块 z 增量 > 0.03 米；起始接触 table / plank_link，结束时存在机器人接触且只接触机器人。",
    warning: "仅坐标升高不够，还检查起末接触关系。",
  },
  {
    key: "place_in_slider",
    title: "放入柜区",
    language: "store the grasped block in the sliding cabinet",
    relation: "所持物体：仅机器人接触 → 柜区支撑、机器人松开",
    rule: "子任务开始时机器人接触的对象集合须总共只有一个，且它是可移动物体；该物体起始仅接触机器人，结束接触 table / plank_link 且不再接触机器人。",
    warning: "检查器不硬编码颜色；这条链的上下文预期它是前一步拿起的红块。",
  },
  {
    key: "turn_off_lightbulb",
    title: "关闭灯泡",
    language: "use the switch to turn off the light bulb",
    relation: "灯泡逻辑状态：1 → 0",
    rule: "比较子任务开始与结束的 lightbulb 状态，要求从 1 变为 0。",
    warning: "本来就关着、结束仍为 0，不满足这项变化检查。",
  },
] as const;
export type CalvinFrame = {
  frame_index: number;
  timestamp: number;
  state: number[];
  actions: number[];
};
export type CalvinRecord =
  | { kind: "chain"; initial: Record<string, string | number>; tasks: string[] }
  | {
      kind: "pink";
      task: string;
      length: number;
      fields: Record<string, number[]>;
    }
  | { kind: "door"; frames: CalvinFrame[] }
  | { kind: "frame"; key: string; fields: Record<string, number[]> };
const numeric = (v: unknown, n: number): v is number[] =>
  Array.isArray(v) &&
  v.length === n &&
  v.every((x) => typeof x === "number" && Number.isFinite(x));
const object = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
export function readCalvinRecord(
  raw: unknown,
  kind: CalvinKind,
): CalvinRecord | null {
  try {
    const v: unknown = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (kind === "chain") {
      if (
        !Array.isArray(v) ||
        v.length !== 2 ||
        !object(v[0]) ||
        !Array.isArray(v[1]) ||
        !calvinSteps.every((s, i) => v[1][i] === s.key) ||
        v[1].length !== 5
      )
        return null;
      const expected = {
        led: 1,
        lightbulb: 1,
        slider: "left",
        drawer: "open",
        red_block: "slider_left",
        blue_block: "table",
        pink_block: "slider_right",
        grasped: 0,
      };
      if (!Object.entries(expected).every(([k, val]) => v[0][k] === val))
        return null;
      return { kind, initial: expected, tasks: v[1] };
    }
    if (!object(v)) return null;
    if (kind === "pink") {
      if (
        !object(v.episode) ||
        !object(v.first_frame) ||
        v.episode.length !== 46 ||
        !Array.isArray(v.episode.tasks) ||
        v.episode.tasks[0] !== "push the pink block to the left" ||
        v.first_frame.frame_index !== 0
      )
        return null;
      const sizes: Record<string, number> = {
        "state.ee_pos": 3,
        "state.ee_rot": 3,
        "state.joints": 7,
        "state.gripper": 1,
        "action.delta_ee_pos": 3,
        "action.delta_ee_rot": 3,
        "action.gripper": 1,
      };
      const fields: Record<string, number[]> = {};
      for (const [key, size] of Object.entries(sizes)) {
        const value = v.first_frame[key];
        if (!numeric(value, size)) return null;
        fields[key] = value;
      }
      return { kind, task: v.episode.tasks[0], length: 46, fields };
    }
    if (kind === "door") {
      if (!Array.isArray(v.frames) || v.frames.length !== 3) return null;
      const frames: CalvinFrame[] = [];
      for (let i = 0; i < 3; i++) {
        const f = v.frames[i];
        if (
          !object(f) ||
          f.frame_index !== [0, 32, 64][i] ||
          typeof f.timestamp !== "number" ||
          !Number.isFinite(f.timestamp) ||
          !numeric(f.state, 8) ||
          !numeric(f.actions, 7)
        )
          return null;
        frames.push({
          frame_index: f.frame_index as number,
          timestamp: f.timestamp,
          state: f.state,
          actions: f.actions,
        });
      }
      return { kind, frames };
    }
    const fields: Record<string, number[]> = {};
    for (const [key, size] of Object.entries({
      robot_obs: 15,
      scene_obs: 24,
      actions: 7,
      rel_actions: 7,
    })) {
      const value = v[key];
      if (!numeric(value, size)) return null;
      fields[key] = value;
    }
    return v.__key__ === "validation/episode_0032068"
      ? { kind, key: v.__key__, fields }
      : null;
  } catch {
    return null;
  }
}
export function calvinPrefixStatuses(length: number | null) {
  if (
    length !== null &&
    (!Number.isInteger(length) || length < 0 || length > 5)
  )
    length = null;
  return calvinSteps.map((_, i) =>
    length === null
      ? "未设定"
      : i < length
        ? "假设通过"
        : i === length
          ? "在此停止"
          : "未执行",
  );
}
export function calvinScore(lengths: readonly number[]) {
  if (
    !lengths.length ||
    lengths.some((n) => !Number.isInteger(n) || n < 0 || n > 5)
  )
    return null;
  return {
    mean: lengths.reduce((a, b) => a + b, 0) / lengths.length,
    counts: [1, 2, 3, 4, 5].map((k) => lengths.filter((n) => n >= k).length),
    total: lengths.length,
  };
}
export function calvinNumber(n: number) {
  return n.toFixed(5);
}
