import { benchmarks } from "./catalog";
import type { Category } from "../types/benchmark";

export const legacyHealthcarePath = "/healthcare/";
export const healthcareCategory: Category = {
  id: "healthcare",
  name: "医疗健康",
  description: "面向临床推理、医疗工作流和专业安全的模型评测。",
  glyph: "check",
  color: "#587d91",
};

// 同一张评测卡保留原能力分类和详情路径；这里只维护它在专区内的主专题。
const groups: Array<{ category: Category; ids: string[] }> = [
  {
    category: {
      id: "clinical-reasoning",
      name: "医疗问答与临床推理",
      description: "医疗对话、临床咨询和基于长篇病历的推理。",
      glyph: "book",
      color: "#5575d7",
    },
    ids: [
      "healthbench",
      "healthbench-hard",
      "healthbench-professional",
      "mlcr-aa",
      "inclusionmed-index",
    ],
  },
  {
    category: {
      id: "clinical-workflow",
      name: "临床与医疗管理工作流",
      description: "电子病历操作、临床文书和住院诊断编码。",
      glyph: "workflow",
      color: "#587d91",
    },
    ids: ["physicianbench", "medscribe", "medcode"],
  },
  {
    category: {
      id: "medical-safety",
      name: "医疗安全与专业行为",
      description: "心理健康对话中的回应质量、适当性与安全性。",
      glyph: "check",
      color: "#708847",
    },
    ids: ["mentalhealthbench"],
  },
];
export const healthcareCategories = groups.map(({ category }) => category);
export const healthcareCategoryByBenchmarkId = new Map(
  groups.flatMap(({ category, ids }) =>
    ids.map((id) => [id, category.id] as const),
  ),
);
export const healthcareBenchmarks = benchmarks.filter((item) =>
  healthcareCategoryByBenchmarkId.has(item.id),
);
