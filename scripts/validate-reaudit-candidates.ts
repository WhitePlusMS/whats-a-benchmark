import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { entrySchema } from "../src/content/schema";
import { readJson } from "./content-pipeline";

const root = process.cwd();
const candidateDir = join(root, "artifacts/candidates/reaudit");
const baselineDir = join(root, "artifacts/content-pre-reaudit/benchmarks");
const researchDir = join(root, "docs/research/benchmarks");
const releaseValue = await readJson(join(root, "content/releases.json"));
if (!Array.isArray(releaseValue))
  throw new Error("content/releases.json: 顶层必须是数组");
const releases: unknown[] = releaseValue;
const canonicalUrl = (value: string) => {
  const url = new URL(value);
  url.hash = "";
  return url.href;
};
const releaseUrls = new Set(
  releases.flatMap((release) => {
    const value = record(release, "content/releases.json").url;
    return typeof value === "string" ? [canonicalUrl(value)] : [];
  }),
);
const requestedIds = process.argv.slice(2);
const names = requestedIds.length
  ? requestedIds.map((id) => `${id}.json`).sort()
  : (await readdir(candidateDir)).filter((name) => name.endsWith(".json")).sort();
const failures: string[] = [];
const stableFields = [
  "id",
  "order",
  "name",
  "category",
  "publisher",
  "year",
  "kind",
] as const;
const researchStatuses = {
  PASS: "pass",
  PASS_WITH_LIMITATIONS: "pass-with-limitations",
  PARTIAL: "partial",
  BLOCKED: "blocked",
} as const;
function record(value: unknown, file: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${file}: 顶层必须是对象`);
  return value as Record<string, unknown>;
}
if (!requestedIds.length) {
  const baselineNames = (await readdir(baselineDir))
    .filter((name) => name.endsWith(".json"))
    .sort();
  if (JSON.stringify(names) !== JSON.stringify(baselineNames))
    failures.push("候选文件集合必须与迁移前 75 份正式内容完全一致");
}
for (const name of names) {
  const result = entrySchema.safeParse(await readJson(join(candidateDir, name)));
  if (!result.success) {
    failures.push(
      ...result.error.issues.map(
        (issue) => `${name} → ${issue.path.join(".") || "文件"}: ${issue.message}`,
      ),
    );
    continue;
  }
  if (name !== `${result.data.id}.json`)
    failures.push(`${name} → id: 必须与文件名一致`);
  const baseline = record(
    await readJson(join(baselineDir, name)),
    `artifacts/content-pre-reaudit/benchmarks/${name}`,
  );
  for (const field of stableFields)
    if (result.data[field] !== baseline[field])
      failures.push(`${name} → ${field}: 与迁移前稳定身份不一致`);
  const research = await readFile(join(researchDir, `${result.data.id}.md`), "utf8");
  const conclusion = research.match(
    /\*\*(PASS_WITH_LIMITATIONS|PARTIAL|BLOCKED|PASS)\*\*/g,
  )?.at(-1);
  const researchStatus = conclusion
    ? researchStatuses[
        conclusion.slice(2, -2) as keyof typeof researchStatuses
      ]
    : null;
  if (!researchStatus)
    failures.push(`${name} → researchStatus: 研究档案缺少明确结论`);
  else if (result.data.researchStatus !== researchStatus)
    failures.push(
      `${name} → researchStatus: 候选为 ${result.data.researchStatus}，研究结论为 ${researchStatus}`,
    );
  for (const [index, source] of result.data.sources.entries())
    if (
      releaseUrls.has(canonicalUrl(source.url)) &&
      source.role !== "vendor-report"
    )
      failures.push(
        `${name} → sources.${index}.role: 模型发布资料必须标为 vendor-report`,
      );
}
if (failures.length) throw new Error(failures.join("\n"));
console.log(`[reaudit] ${names.length} candidates passed strict validation.`);
