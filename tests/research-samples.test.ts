import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  basename,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
} from "node:path";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  assertResearchBatchReady,
  runResearchBatch,
} from "../scripts/research-batch.mjs";

const inputs: Array<[string, string, "json"]> = [
  ["one", "https://example.invalid/one", "json"],
  ["two", "https://example.invalid/two", "json"],
];
const quietLogger = { info() {}, error() {} };
const okJson = (value: unknown) => ({
  ok: true,
  text: async () => JSON.stringify(value),
});

async function withTempRoot(run: (root: string) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), "research-batch-"));
  try {
    await run(root);
  } finally {
    const resolvedRoot = resolve(root);
    const resolvedTempDir = resolve(tmpdir());
    const fromTempDir = relative(resolvedTempDir, resolvedRoot);
    if (
      !fromTempDir ||
      fromTempDir.startsWith("..") ||
      isAbsolute(fromTempDir) ||
      dirname(resolvedRoot) !== resolvedTempDir ||
      !basename(resolvedRoot).startsWith("research-batch-")
    ) {
      throw new Error(`Refusing to remove unexpected test directory: ${root}`);
    }
    await rm(resolvedRoot, { recursive: true, force: true });
  }
}

test("全来源失败时批次失败且旧记录不能进入整理", async () => {
  await withTempRoot(async (root) => {
    const researchDir = join(root, "artifacts", "research");
    await mkdir(researchDir, { recursive: true });
    await writeFile(
      join(researchDir, "one.json"),
      JSON.stringify({ rows: [{ stale: true }] }),
    );
    const succeeded = await runResearchBatch({
      root,
      inputs,
      fetchImpl: async () => ({
        ok: false,
        status: 503,
        statusText: "down",
        text: async () => "",
      }),
      logger: quietLogger,
    });
    assert.equal(succeeded, false);
    const manifest = JSON.parse(
      await readFile(join(researchDir, "batch.json"), "utf8"),
    );
    assert.equal(manifest.status, "failed");
    assert.equal(manifest.sources.one.status, "failed");
    await assert.rejects(
      assertResearchBatchReady(root, ["one"]),
      /latest successful batch/,
    );
  });
});

test("部分失败保留来源状态并阻止整个候选整理批次", async () => {
  await withTempRoot(async (root) => {
    const succeeded = await runResearchBatch({
      root,
      inputs,
      fetchImpl: async (url) =>
        url.endsWith("one")
          ? okJson([{ id: 1 }])
          : Promise.reject(new Error("offline")),
      logger: quietLogger,
    });
    assert.equal(succeeded, false);
    const manifest = JSON.parse(
      await readFile(join(root, "artifacts/research/batch.json"), "utf8"),
    );
    assert.equal(manifest.sources.one.status, "succeeded");
    assert.equal(manifest.sources.two.status, "failed");
    await assert.rejects(
      assertResearchBatchReady(root, ["one", "two"]),
      /latest successful batch/,
    );
  });
});

test("成功批次才允许 prepare 读取本批记录", async () => {
  await withTempRoot(async (root) => {
    const succeeded = await runResearchBatch({
      root,
      inputs,
      fetchImpl: async () => okJson([{ id: 1 }]),
      logger: quietLogger,
    });
    assert.equal(succeeded, true);
    await assertResearchBatchReady(root, ["one", "two"]);

    const failed = await runResearchBatch({
      root,
      inputs,
      fetchImpl: async () => ({
        ok: false,
        status: 503,
        statusText: "down",
        text: async () => "",
      }),
      logger: quietLogger,
    });
    assert.equal(failed, false);
    await assert.rejects(
      assertResearchBatchReady(root, ["one", "two"]),
      /latest successful batch/,
    );
  });
});

test("running 批次及缺失的本批记录均拒绝 prepare", async () => {
  await withTempRoot(async (root) => {
    const researchDir = join(root, "artifacts", "research");
    await mkdir(researchDir, { recursive: true });
    await writeFile(
      join(researchDir, "one.json"),
      JSON.stringify({ rows: [{ id: "old" }] }),
    );
    await writeFile(
      join(researchDir, "batch.json"),
      JSON.stringify({
        status: "running",
        sources: { one: { status: "pending" } },
      }),
    );
    await assert.rejects(
      assertResearchBatchReady(root, ["one"]),
      /latest successful batch/,
    );

    await writeFile(
      join(researchDir, "batch.json"),
      JSON.stringify({
        status: "success",
        sources: { one: { status: "succeeded" } },
      }),
    );
    await rm(join(researchDir, "one.json"));
    await assert.rejects(assertResearchBatchReady(root, ["one"]));
    await writeFile(
      join(researchDir, "one.json"),
      JSON.stringify({ rows: [] }),
    );
    await assert.rejects(
      assertResearchBatchReady(root, ["one"]),
      /has no rows/,
    );
  });
});

test("没有本批清单时 prepare 在联网前拒绝旧记录", async () => {
  await withTempRoot(async (root) => {
    const researchDir = join(root, "artifacts", "research");
    await mkdir(researchDir, { recursive: true });
    await writeFile(
      join(researchDir, "one.json"),
      JSON.stringify({ rows: [{ stale: true }] }),
    );
    const prepareScript = fileURLToPath(
      new URL("../scripts/prepare-samples.mjs", import.meta.url),
    );
    const result = spawnSync(process.execPath, [prepareScript], {
      cwd: root,
      encoding: "utf8",
    });
    assert.notEqual(result.status, 0);
    assert.equal(existsSync(join(root, "artifacts/candidates")), false);
    assert.equal(
      await readFile(join(researchDir, "one.json"), "utf8").then(
        (raw) => JSON.parse(raw).rows[0].stale,
      ),
      true,
    );
  });
});

test("采集 CLI 全失败时设置非零退出码", async () => {
  await withTempRoot(async (root) => {
    const scriptPath = fileURLToPath(
      new URL("../scripts/research-samples.mjs", import.meta.url),
    );
    const preloadPath = join(root, "mock-fetch.cjs");
    await writeFile(
      preloadPath,
      "globalThis.fetch = async () => new Response('', { status: 503 });\n",
    );
    const result = spawnSync(
      process.execPath,
      ["--require", preloadPath, scriptPath],
      { cwd: root, encoding: "utf8" },
    );
    assert.equal(result.status, 1, result.stderr);
    const manifest = JSON.parse(
      await readFile(join(root, "artifacts/research/batch.json"), "utf8"),
    );
    assert.equal(manifest.status, "failed");
  });
});
