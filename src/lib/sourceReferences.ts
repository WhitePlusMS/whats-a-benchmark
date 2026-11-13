import type { Source } from "../content/schema";

export interface SourceReference {
  source: Source;
  number: number;
  id: string;
  title: string;
  verifiedAt?: string;
}
export interface SourceReferenceGroup {
  first: SourceReference;
  locations: SourceReference[];
  host: string;
  roles: Source["role"][];
  vendorReport: boolean;
}

// 旧资料把同一次核验日期当作名称。用链接中可核对的对象命名，日期仍保留。
const verificationLabel =
  /^(?:(\d{4}-\d{2}-\d{2}) (?:核验的官方原始记录|公开数据与案例核查入口)|已核对的数据结构与版本来源（(\d{4}-\d{2}-\d{2})）)$/;

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function sourceObject(url: URL) {
  const segments = url.pathname.split("/").filter(Boolean).map(decodeSegment);
  const location = decodeSegment(url.hash.slice(1));
  const offset = url.searchParams.get("offset");
  const row = url.searchParams.get("row");
  if (offset !== null || row !== null) {
    const dataset = url.searchParams.get("dataset")?.split("/").at(-1);
    const length = url.searchParams.get("length");
    return [
      dataset ?? segments[2],
      url.searchParams.get("config") ?? segments.at(-2),
      url.searchParams.get("split") ?? segments.at(-1),
      row !== null ? "记录索引 " + row : "数据接口 · 偏移 " + offset,
      length ? length + " 条" : "",
    ]
      .filter(Boolean)
      .join(" · ");
  }
  // 文件型来源优先显示任务名或仓库名，根目录文件附上固定版本。
  if (
    url.hostname === "raw.githubusercontent.com" ||
    (url.hostname === "github.com" && segments[2] === "blob")
  ) {
    const pinIndex = url.hostname === "github.com" ? 3 : 2;
    const file = segments.slice(pinIndex + 1);
    const filename = file.at(-1);
    const parent = file
      .slice(0, -1)
      .filter((part) => !/^\.?docs$/i.test(part))
      .at(-1);
    const pin = segments[pinIndex];
    const version =
      !parent && pin && /^[a-f\d]{40}$/i.test(pin) ? pin.slice(0, 8) : "";
    return [parent || segments[1], filename, location, version]
      .filter(Boolean)
      .join(" / ");
  }
  const filesIndex = segments.lastIndexOf("files");
  if (url.hostname === "hub.harborframework.com" && filesIndex >= 2) {
    return [
      segments[filesIndex - 2],
      segments.at(-1),
      "版本 " + segments[filesIndex - 1],
      segments[0] === "api" ? "数据接口" : "",
    ]
      .filter(Boolean)
      .join(" · ");
  }
  const path = segments.filter((part) => !/^[a-f\d]{40}$/i.test(part));
  return (
    [
      path.at(-2),
      path.at(-1),
      location,
      segments[0] === "api" ? "数据接口" : "",
    ]
      .filter(Boolean)
      .join(" / ") || url.hostname
  );
}

export function sourceReference(
  source: Source,
  index: number,
): SourceReference {
  const match = source.label.match(verificationLabel);
  return {
    source,
    number: index + 1,
    id: "source-" + (index + 1),
    title: match ? sourceObject(new URL(source.url)) : source.label,
    verifiedAt: match?.[1] ?? match?.[2],
  };
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
