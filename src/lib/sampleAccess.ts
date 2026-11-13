import type { Benchmark } from "../types/benchmark";

export function sampleSectionTitle(item: Benchmark) {
  if (item.composition) return "组成评测的样例";
  return item.sampleAccess.status === "local" ? "真实案例" : "样例与获取方式";
}

/** 按真实动作命名；许可或申请状态先展示获取说明。 */
export function sampleAction(item: Benchmark) {
  if (item.composition) return "查看组成样例";
  if (item.sampleAccess.status === "local") return "查看真实案例";
  if (item.embodied?.taskExample) return "查看任务示例";
  return "查看样例获取方式";
}

export function sampleExternalUrl(item: Benchmark) {
  return item.sampleAccess.url || item.sampleAccess.sourceUrls[0];
}

/** 指数只展示明确组成项的原样例；普通关联、子集和衍生关系不继承题目。 */
export function compositionSample(
  item: Benchmark,
  catalog: ReadonlyMap<string, Benchmark>,
) {
  return item.composition?.items
    .map((component) => catalog.get(component.id))
    .find(
      (component) =>
        component?.sampleAccess.status === "local" && component.sampleCount > 0,
    );
}
