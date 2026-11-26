import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { loadCatalogInclusion } from "../scripts/catalog-inclusion";

test("收录日期取主线纳入时间，北京时区，后续编辑或删后重加不重置", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-inclusion-"));
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      stdio: "pipe",
      encoding: "utf8",
    }).trim();
  const commit = (date: string, message: string, ...args: string[]) =>
    execFileSync(
      "git",
      [
        "-c",
        "user.name=Test",
        "-c",
        "user.email=test@example.invalid",
        ...args,
        "-m",
        message,
      ],
      {
        cwd: root,
        stdio: "pipe",
        env: {
          ...process.env,
          GIT_AUTHOR_DATE: date,
          GIT_COMMITTER_DATE: date,
        },
      },
    );
  const add = (id: string, text: string) => {
    writeFileSync(join(root, "content/benchmarks", id + ".json"), text);
    git("add", "content/benchmarks");
  };
  try {
    git("init", "-q", "-b", "main");
    mkdirSync(join(root, "content/benchmarks"), { recursive: true });
    add("early", "{}");
    commit("2026-09-24T15:00:00Z", "first", "commit");
    git("switch", "-c", "proposal");
    add("later", "{}");
    commit("2026-10-31T15:00:00Z", "proposal", "commit");
    git("switch", "main");
    commit("2026-10-31T16:30:00Z", "merge", "merge", "--no-ff", "proposal");
    add("early", '{"updated":true}');
    commit("2026-11-02T00:00:00Z", "edit", "commit");
    git("rm", "content/benchmarks/early.json");
    commit("2026-11-03T00:00:00Z", "delete", "commit");
    add("early", "{}");
    commit("2026-11-04T00:00:00Z", "restore", "commit");
    assert.deepEqual(
      [...loadCatalogInclusion(root)],
      [
        ["early", "2026-09-24"],
        ["later", "2026-11-01"],
      ],
    );
    const shallow = join(root, "shallow");
    git("clone", "--depth", "1", "file://" + root, shallow);
    assert.equal(loadCatalogInclusion(shallow).size, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
