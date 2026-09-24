import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  loadContent,
  referencedAssets,
  type ContentWorkspace,
} from "./content-pipeline";

export async function listFiles(root: string): Promise<string[]> {
  const results: string[] = [];
  async function walk(directory: string, prefix: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const name = prefix + entry.name;
      if (entry.isDirectory())
        await walk(join(directory, entry.name), name + "/");
      else results.push(name);
    }
  }
  await walk(root, "");
  return results.sort();
}
/** Verify actual disk output, not merely the in-memory catalog. */
export async function verifyPublicFiles(
  directory: string,
  workspace: ContentWorkspace,
) {
  const expected = [
    "favicon.svg",
    ...referencedAssets(workspace),
    ...workspace.entries
      .filter((entry) => entry.sampleSet)
      .map((entry) => `samples/${entry.id}.json`),
  ].sort();
  const actual = (await listFiles(directory)).filter(
    (name) =>
      name === "favicon.svg" ||
      /^(samples|logos|licenses|images|audio|videos|captions|files)\//.test(name),
  );
  assert.deepEqual(
    actual,
    expected,
    "公开样例或附件存在遗漏、删除残留或未审核文件",
  );
  for (const entry of workspace.entries)
    if (entry.sampleSet) {
      const actual = JSON.parse(
        await readFile(join(directory, `samples/${entry.id}.json`), "utf8"),
      );
      assert.deepEqual(
        actual,
        { benchmarkId: entry.id, ...entry.sampleSet },
        `样例产物已过期：${entry.id}`,
      );
    }
}
export async function verifyBuild(root = process.cwd()) {
  const workspace = await loadContent(root);
  const directory = join(root, "dist");
  await verifyPublicFiles(directory, workspace);
  const expected = workspace.entries
    .map((entry) => `benchmarks/${entry.id}/index.html`)
    .sort();
  const actual = (await listFiles(directory)).filter((name) =>
    name.startsWith("benchmarks/"),
  );
  assert.deepEqual(actual, expected, "详情页面存在遗漏或删除残留");
  return workspace;
}
