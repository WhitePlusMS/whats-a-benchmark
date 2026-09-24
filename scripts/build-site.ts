import { lstat, rm } from "node:fs/promises";
import { resolve, relative, isAbsolute, sep } from "node:path";
import { build } from "vite-ssg/node";

const root = process.cwd();
const temporary = resolve(root, ".vite-ssg-temp");

async function cleanGeneratedDirectory(name: ".vite-ssg-temp" | "dist") {
  const target = resolve(root, name);
  const info = await lstat(target).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (info?.isSymbolicLink()) throw new Error(`${name} 不能是符号链接`);
  // Node's bounded retry handles transient Windows directory locks.
  // Only the two explicitly owned generated directories can be removed.
  await rm(target, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 200,
  });
}

// Remove old temporary output first so a cleanup error below cannot be an
// initial-cleanup failure mistaken for a completed rendering pass.
await cleanGeneratedDirectory(".vite-ssg-temp");
await cleanGeneratedDirectory("dist");
try {
  await build();
} catch (error) {
  const failure = error as NodeJS.ErrnoException;
  const path = failure.path ? resolve(failure.path) : null;
  const rel = path === null ? null : relative(temporary, path);
  if (
    failure.code !== "EBUSY" ||
    failure.syscall !== "rmdir" ||
    rel === null ||
    isAbsolute(rel) ||
    rel === ".." ||
    rel.startsWith(`..${sep}`)
  )
    throw error;
  console.info("[build] SSG 临时目录被短暂占用，重试清理并核验完整产物。");
  await cleanGeneratedDirectory(".vite-ssg-temp");
}

// Rendering/compilation failures are never swallowed. Even after successful
// cleanup, all expected pages, samples and assets must pass the existing audit.
await import("./postbuild");
