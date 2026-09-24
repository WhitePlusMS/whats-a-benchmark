import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";

export async function runResearchBatch({
  root,
  inputs,
  fetchImpl = fetch,
  logger = console,
}) {
  const researchDir = join(root, "artifacts", "research");
  await mkdir(researchDir, { recursive: true });
  const manifestPath = join(researchDir, "batch.json");
  const results = new Map(inputs.map(([id]) => [id, { status: "pending" }]));
  const writeManifest = (status) =>
    writeFile(
      manifestPath,
      JSON.stringify(
        {
          status,
          startedAt,
          completedAt: status === "running" ? null : new Date().toISOString(),
          sources: Object.fromEntries(results),
        },
        null,
        2,
      ),
    );
  const startedAt = new Date().toISOString();
  // 先标记本批正在运行，崩溃或采集失败时 prepare 就不会消费目录里的旧记录。
  await writeManifest("running");

  await Promise.all(
    inputs.map(async ([id, url, format]) => {
      try {
        const response = await fetchImpl(url, {
          signal: AbortSignal.timeout(45000),
        });
        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);
        const content =
          format === "gz"
            ? gunzipSync(Buffer.from(await response.arrayBuffer())).toString()
            : await response.text();
        const parsed =
          format === "jsonl" || format === "gz"
            ? content
                .trim()
                .split("\n")
                .slice(0, 3)
                .map((line) => JSON.parse(line))
            : format === "text"
              ? content.trim().split("\n").slice(0, 3)
              : JSON.parse(content);
        const rows =
          format === "hf"
            ? parsed.rows.map((item) => item.row)
            : Array.isArray(parsed)
              ? parsed.slice(0, 3)
              : parsed;
        await writeFile(
          join(researchDir, `${id}.json`),
          JSON.stringify({ url, rows }, null, 2),
        );
        results.set(id, { status: "succeeded" });
        logger.info(id, JSON.stringify(rows).slice(0, 1600));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        results.set(id, { status: "failed", error: message });
        logger.error(id, message);
      }
    }),
  );

  const succeeded = [...results.values()].every(
    (result) => result.status === "succeeded",
  );
  await writeManifest(succeeded ? "success" : "failed");
  return succeeded;
}

export async function assertResearchBatchReady(root, requiredIds) {
  const researchDir = join(root, "artifacts", "research");
  const manifest = JSON.parse(
    await readFile(join(researchDir, "batch.json"), "utf8"),
  );
  if (
    manifest.status !== "success" ||
    requiredIds.some((id) => manifest.sources?.[id]?.status !== "succeeded")
  ) {
    throw new Error(
      "Research batch is not complete and successful; prepare candidates only from the latest successful batch.",
    );
  }
  for (const id of requiredIds) {
    const source = JSON.parse(
      await readFile(join(researchDir, `${id}.json`), "utf8"),
    );
    if (!Array.isArray(source.rows) || !source.rows.length)
      throw new Error(`Research input has no rows: ${id}`);
  }
}
