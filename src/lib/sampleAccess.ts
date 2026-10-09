import type { Benchmark } from "../types/benchmark";

export function sampleSectionTitle(item: Benchmark) {
  if (item.composition) return "组成评测的样例";
  return item.sampleAccess.status === "local" ? "真实案例" : "样例与获取方式";
}

/** 按真实动作命名；许可或申请状态先展示获取说明。 */
export function sampleAction(item: Benchmark) {
  if (item.composition)
    return { href: "#samples", label: "查看组成样例", external: false };
  if (item.sampleAccess.status === "local")
    return { href: "#samples", label: "查看真实案例", external: false };
  if (item.sampleAccess.status === "official" && item.sampleAccess.url)
    return {
      href: item.sampleAccess.url,
      label: "查看官方样例入口",
      external: true,
    };
  return { href: "#samples", label: "查看样例获取方式", external: false };
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
