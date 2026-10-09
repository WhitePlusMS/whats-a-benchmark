import {
  readFile,
  readdir,
  mkdir,
  writeFile,
  copyFile,
  rm,
  lstat,
  stat,
  realpath,
} from "node:fs/promises";
import { resolve, relative, dirname, join, sep, isAbsolute } from "node:path";
import { z } from "zod";
import {
  entrySchema,
  draftSchema,
  categorySchema,
  brandSchema,
  releaseSchema,
  type ContentDocument,
  type ContentEntry,
  type Brand,
  type Category,
  type Release,
} from "../src/content/schema";

export const MAX_PUBLISHED_ASSET_BYTES = 25 * 1024 * 1024;

export interface ContentWorkspace {
  documents: ContentDocument[];
  entries: ContentEntry[];
  categories: Category[];
  brands: Brand[];
  releases: Release[];
}
export async function readJson(path: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    throw new Error(
      `${path}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
function parse<T>(schema: z.ZodType<T>, value: unknown, file: string): T {
  const result = schema.safeParse(value);
  if (!result.success)
    throw new Error(
      result.error.issues
        .map(
          (issue) =>
            `${file} → ${issue.path.join(".") || "文件"}: ${issue.message}`,
        )
        .join("\n"),
    );
  return result.data;
}
function unique(items: { id: string }[], file: string) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`${file} → id: 重复 ID ${item.id}`);
    seen.add(item.id);
  }
}
function checkReference(
  valid: boolean,
  file: string,
  field: string,
  id: string,
) {
  if (!valid) throw new Error(`${file} → ${field}: 不存在或未发布的引用 ${id}`);
}
/** Authoring files are read by Node only; frontend modules only consume generated projections. */
export async function loadContent(
  root = process.cwd(),
  overrides = new Map<string, unknown>(),
): Promise<ContentWorkspace> {
  const categories = parse(
    z.array(categorySchema).min(1),
    await readJson(join(root, "content/categories.json")),
    "content/categories.json",
  );
  const brands = parse(
    z.array(brandSchema),
    await readJson(join(root, "content/brands.json")),
    "content/brands.json",
  );
  const releases = parse(
    z.array(releaseSchema),
    await readJson(join(root, "content/releases.json")),
    "content/releases.json",
  );
  unique(categories, "content/categories.json");
  unique(brands, "content/brands.json");
  unique(releases, "content/releases.json");
  const documents: ContentDocument[] = [];
  for (const name of (await readdir(join(root, "content/benchmarks"))).sort()) {
    if (!name.endsWith(".json")) continue;
    const file = `content/benchmarks/${name}`;
    const value = overrides.has(name)
      ? overrides.get(name)
      : await readJson(join(root, file));
    const isDraft =
      typeof value === "object" &&
      value !== null &&
      "status" in value &&
      value.status === "draft";
    const doc = isDraft
      ? parse(draftSchema, value, file)
      : parse(entrySchema, value, file);
    if (name !== `${doc.id}.json`)
      throw new Error(`${file} → id: 必须与文件名一致，已有 ID 请保持稳定`);
    documents.push(doc);
  }
  unique(documents, "content/benchmarks");
  const entries = documents
    .filter((doc): doc is ContentEntry => doc.status !== "draft")
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  const allIds = new Set(documents.map((doc) => doc.id));
  const publishedIds = new Set(entries.map((doc) => doc.id));
  const brandIds = new Set(brands.map((brand) => brand.id));
  for (const doc of documents) {
    const file = `content/benchmarks/${doc.id}.json`;
    for (const id of doc.brandIds || [])
      checkReference(brandIds.has(id), file, "brandIds", id);
    for (const relation of doc.related || [])
      checkReference(
        relation.id !== doc.id &&
          (doc.status === "draft" ? allIds : publishedIds).has(relation.id),
        file,
        "related",
        relation.id,
      );
    for (const component of doc.composition?.items || [])
      checkReference(
        component.id !== doc.id &&
          (doc.status === "draft" ? allIds : publishedIds).has(component.id),
        file,
        "composition.items",
        component.id,
      );
    if (doc.status === "draft") continue;
    checkReference(
      categories.some((cat) => cat.id === doc.category),
      file,
      "category",
      doc.category,
    );
  }
  for (const release of releases)
    for (const id of release.benchmarkIds)
      checkReference(
        publishedIds.has(id),
        "content/releases.json",
        `${release.id}.benchmarkIds`,
        id,
      );
  for (const brand of brands) {
    const bytes = await readFile(await sourceAssetPath(root, brand.file));
    if (!bytes.length)
      throw new Error(`content/brands.json → ${brand.id}.file: 空文件`);
    if (
      brand.file.endsWith(".svg") &&
      (!bytes.toString().includes("<svg") ||
        /<script\b|<foreignObject\b|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|\/\/|javascript:)/i.test(
          bytes.toString(),
        ))
    )
      throw new Error(
        `content/brands.json → ${brand.id}.file: SVG 含主动或远程内容`,
      );
  }
  const workspace = { documents, entries, categories, brands, releases };
  for (const file of referencedAssets(workspace)) {
    const path = await sourceAssetPath(root, file);
    const bytes = await readFile(path);
    if (!bytes.length) throw new Error(`content/assets/${file}: 空文件`);
    if ((await stat(path)).size > MAX_PUBLISHED_ASSET_BYTES)
      throw new Error(
        `content/assets/${file}: 单个发布附件不得超过 25 MiB，请改用经许可的轻量真实片段或官方入口`,
      );
  }
  return workspace;
}
// Resolve asset symlinks too: a content reference must not read outside the asset root.
async function sourceAssetPath(root: string, file: string): Promise<string> {
  const assetRoot = await realpath(join(root, "content/assets"));
  const path = await realpath(join(assetRoot, file));
  const rel = relative(assetRoot, path);
  if (
    !rel ||
    isAbsolute(rel) ||
    rel.startsWith(`..${sep}`) ||
    rel === ".." ||
    resolve(assetRoot, rel) !== path
  )
    throw new Error(`非法资源路径: ${file}`);
  return path;
}
export function referencedAssets(workspace: ContentWorkspace): string[] {
  const ids = new Set(workspace.entries.flatMap((entry) => entry.brandIds));
  return [
    ...new Set([
      ...workspace.brands
        .filter((brand) => ids.has(brand.id))
        .map((brand) => brand.file),
      ...workspace.entries.flatMap((entry) =>
        (entry.sampleSet?.samples || []).flatMap((sample) =>
          [
            sample.licensePath,
            ...(sample.assets || []).flatMap((asset) => [
              asset.path,
              asset.kind === "video" ? asset.poster : undefined,
              asset.kind === "video" ? asset.captions?.path : undefined,
            ]),
          ].filter((file): file is string => !!file),
        ),
      ),
    ]),
  ].sort();
}
export function publicProjection(workspace: ContentWorkspace) {
  const catalog = workspace.entries.map(({ sampleSet, ...entry }) => ({
    ...entry,
    sampleCount: sampleSet?.samples.length || 0,
  }));
  const brandIds = new Set(
    workspace.entries.flatMap((entry) => entry.brandIds),
  );
  return {
    catalog,
    categories: workspace.categories,
    brands: workspace.brands.filter((brand) => brandIds.has(brand.id)),
    releases: workspace.releases,
  };
}
export function deletionImpact(workspace: ContentWorkspace, id: string) {
  const references = [
    ...workspace.documents
      .filter((doc) => doc.composition?.items.some((item) => item.id === id))
      .map((doc) => `content/benchmarks/${doc.id}.json → composition.items`),
    ...workspace.documents.flatMap((doc) =>
      (doc.related || [])
        .filter((r) => r.id === id)
        .map(() => `content/benchmarks/${doc.id}.json → related`),
    ),
    ...workspace.releases
      .filter((release) => release.benchmarkIds.includes(id))
      .map((release) => `content/releases.json → ${release.id}.benchmarkIds`),
  ];
  const entry = workspace.entries.find((entry) => entry.id === id);
  const retained = new Set(
    referencedAssets({
      ...workspace,
      entries: workspace.entries.filter((entry) => entry.id !== id),
    }),
  );
  return {
    references,
    sampleFile: entry?.sampleSet ? `samples/${id}.json` : null,
    unusedAssets: referencedAssets(workspace).filter(
      (file) => !retained.has(file),
    ),
  };
}
export async function writeJson(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(value, null, 2) + "\n");
}
/** The only recursive removal target is the explicitly owned .generated directory. */
async function resetGenerated(root: string) {
  const target = resolve(root, ".generated");
  if (dirname(target) !== resolve(root)) throw new Error("拒绝清理项目外目录");
  const info = await lstat(target).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (info?.isSymbolicLink()) throw new Error("生成目录不能是符号链接");
  await rm(target, { recursive: true, force: true });
  await mkdir(join(target, "public"), { recursive: true });
}
export async function generateContent(root = process.cwd()) {
  // Complete validation before replacing previously generated output.
  const workspace = await loadContent(root);
  const projection = publicProjection(workspace);
  // favicon 不属于条目附件，必须同样在清理旧产物前读取并验证。
  const favicon = await readFile(join(root, "public/favicon.svg"));
  if (!favicon.length) throw new Error("public/favicon.svg: 空文件");
  await resetGenerated(root);
  for (const [name, value] of Object.entries(projection))
    await writeJson(join(root, `.generated/${name}.json`), value);
  for (const entry of workspace.entries)
    if (entry.sampleSet)
      await writeJson(
        join(root, `.generated/public/samples/${entry.id}.json`),
        { benchmarkId: entry.id, ...entry.sampleSet },
      );
  for (const file of referencedAssets(workspace)) {
    const destination = join(root, ".generated/public", file);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(await sourceAssetPath(root, file), destination);
  }
  await writeFile(join(root, ".generated/public/favicon.svg"), favicon);
  return workspace;
}
