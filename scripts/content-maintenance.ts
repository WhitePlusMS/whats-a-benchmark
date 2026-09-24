import { appendFile, writeFile, rename, unlink } from "node:fs/promises";
import { join } from "node:path";
import { idSchema } from "../src/content/schema";
import { readJson, loadContent, deletionImpact } from "./content-pipeline";

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("内容文件必须是对象");
  return value as Record<string, unknown>;
}
const entryPath = (root: string, id: string) =>
  join(root, "content/benchmarks", `${idSchema.parse(id)}.json`);
async function logChange(root: string, message: string) {
  await appendFile(
    join(root, "UPDATE_LOG.md"),
    `\n- ${new Date().toISOString()} 内容维护：${message}。需重新构建后发布生效。\n`,
  );
}
export async function createDraft(root: string, id: string) {
  const path = entryPath(root, id);
  const template = record(
    await readJson(join(root, "content/templates/benchmark.json")),
  );
  await writeFile(
    path,
    JSON.stringify({ ...template, id, status: "draft" }, null, 2) + "\n",
    { flag: "wx" },
  );
  await logChange(root, `新建 content/benchmarks/${id}.json 草稿，尚不公开`);
  return path;
}
export async function setStatus(
  root: string,
  id: string,
  status: "published" | "draft" | "archived",
  note?: string,
) {
  const path = entryPath(root, id);
  const value = { ...record(await readJson(path)), status };
  const next: Record<string, unknown> = value;
  if (status === "archived") next.archiveNote = note;
  else delete next.archiveNote;
  // Validate the proposed workspace before touching the source file.
  await loadContent(root, new Map([[`${id}.json`, next]]));
  const temporary = `${path}.tmp`;
  await writeFile(temporary, JSON.stringify(next, null, 2) + "\n");
  await rename(temporary, path);
  await logChange(
    root,
    `content/benchmarks/${id}.json 状态更新为 ${status}${note ? `，原因：${note}` : ""}`,
  );
}
export async function inspectDeletion(root: string, id: string) {
  idSchema.parse(id);
  const workspace = await loadContent(root);
  if (!workspace.documents.some((doc) => doc.id === id))
    throw new Error(`条目不存在：${id}`);
  return deletionImpact(workspace, id);
}
export async function deleteEntry(root: string, id: string) {
  const impact = await inspectDeletion(root, id);
  if (impact.references.length)
    throw new Error(
      `暂不能删除 ${id}，请先处理引用：\n${impact.references.join("\n")}`,
    );
  // Delete exactly one authoring file. Shared assets are not removed implicitly.
  await unlink(entryPath(root, id));
  await logChange(
    root,
    `删除 content/benchmarks/${id}.json；重新构建将移除页面、样例及失去引用的公开附件，共享素材源文件保留`,
  );
  return impact;
}
