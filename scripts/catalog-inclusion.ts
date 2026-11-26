import { execFileSync } from "node:child_process";

const shanghaiDay = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The first commit adding each card to the checked-out first-parent history. */
export function loadCatalogInclusion(root: string): Map<string, string> {
  let shallow: string;
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 16 * 1024 * 1024,
    }).trim();
  try {
    // --show-prefix prevents a local source archive nested in a different
    // repository from accidentally inheriting that repository's history.
    if (git("rev-parse", "--show-prefix")) return new Map();
    shallow = git("rev-parse", "--is-shallow-repository");
    git("rev-parse", "--verify", "HEAD");
  } catch {
    return new Map();
  }
  // A shallow root makes all its files look newly added; never report that.
  if (shallow !== "false") return new Map();
  const dates = new Map<string, string>();
  let day = "";
  for (const line of git(
    "log",
    "--first-parent",
    "--reverse",
    "--diff-merges=first-parent",
    "--no-renames",
    "--diff-filter=A",
    "--name-only",
    "--format=@%cI",
    "HEAD",
    "--",
    "content/benchmarks",
  ).split("\n")) {
    if (line.startsWith("@")) {
      day = shanghaiDay.format(new Date(line.slice(1)));
    } else {
      const id = /^content\/benchmarks\/([a-z0-9-]+)\.json$/.exec(line)?.[1];
      if (id && day && !dates.has(id)) dates.set(id, day);
    }
  }
  return dates;
}
