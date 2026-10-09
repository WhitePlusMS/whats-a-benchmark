import type { Source } from "../content/schema";

export interface SourceReference {
  source: Source;
  number: number;
  id: string;
}
export interface SourceReferenceGroup {
  first: SourceReference;
  locations: SourceReference[];
  host: string;
  roles: Source["role"][];
  vendorReport: boolean;
}

export function sourceReference(
  source: Source,
  index: number,
): SourceReference {
  return { source, number: index + 1, id: `source-${index + 1}` };
}

/** 合并同一页面的显示卡片，保留每个带 hash 的原始定位与稳定引用号。 */
export function groupSourceReferences(
  sources: Source[],
): SourceReferenceGroup[] {
  const groups = new Map<string, SourceReferenceGroup>();
  sources.forEach((source, index) => {
    const url = new URL(source.url);
    url.hash = "";
    const vendorReport = source.role === "vendor-report";
    const key = `${vendorReport}:${url.href}`;
    const reference = sourceReference(source, index);
    const existing = groups.get(key);
    if (existing) {
      existing.locations.push(reference);
      if (!existing.roles.includes(source.role))
        existing.roles.push(source.role);
    } else {
      groups.set(key, {
        first: reference,
        locations: [],
        host: url.hostname,
        roles: [source.role],
        vendorReport,
      });
    }
  });
  return [...groups.values()];
}
