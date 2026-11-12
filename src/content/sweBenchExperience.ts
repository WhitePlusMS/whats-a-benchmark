export interface SweBenchCase {
  sampleId: string;
  label: string;
  investigation: string;
  visual: "matrix" | "missing-column" | "migration" | "coordinates";
}

// 每个图解只对应站内保留的真实案例；说明和原文继续从样例数据读取。
export const sweBenchCases: readonly SweBenchCase[] = [
  {
    sampleId: "public-case-swe-bench-verified",
    label: "模型依赖",
    investigation: "同样的模型，嵌套后关系变了",
    visual: "matrix",
  },
  {
    sampleId: "astropy__astropy-13033",
    label: "缺列异常",
    investigation: "缺少 flux，报错却指向 time",
    visual: "missing-column",
  },
  {
    sampleId: "astropy__astropy-13236",
    label: "类型迁移",
    investigation: "先给出提醒，再调整类型行为",
    visual: "migration",
  },
  {
    sampleId: "astropy__astropy-13398",
    label: "坐标变换",
    investigation: "从地心位置换算到观测方向",
    visual: "coordinates",
  },
];

/** 空查询使用首题，未知样例不冒充成其他任务。 */
export function findSweBenchCase(sampleId: unknown): SweBenchCase | undefined {
  if (typeof sampleId !== "string" || !sampleId) return sweBenchCases[0];
  return sweBenchCases.find((item) => item.sampleId === sampleId);
}
