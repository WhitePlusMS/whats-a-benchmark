import type { ContentEntry } from "./schema";

// 详情与对比共用栏目顺序和措辞，新增内容不需要再写一个展示分支。
export const interpretationFields = [
  { key: "judge", label: "谁来评分" },
  { key: "comparison", label: "比较成绩前先核对" },
  { key: "disclosure", label: "哪些可以核验" },
  { key: "versionChanges", label: "版本变化与影响" },
] as const satisfies readonly {
  key: keyof NonNullable<ContentEntry["interpretation"]>;
  label: string;
}[];
