import { writeFile, mkdir } from "node:fs/promises";
import { loadContent } from "./content-pipeline";
const { entries: benchmarks, releases } = await loadContent();
// Optional maintenance check: an HTTP block is not treated as evidence that a source is false.
const urls = [
  ...new Set([
    ...benchmarks.flatMap((b) => b.sources.map((s) => s.url)),
    ...releases.map((r) => r.url),
  ]),
];
const results: { url: string; status: number | string }[] = [];
let index = 0;
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (index < urls.length) {
      const url = urls[index++]!;
      try {
        const response = await fetch(url, {
          method: "HEAD",
          signal: AbortSignal.timeout(15000),
        });
        results.push({ url, status: response.status });
      } catch (error) {
        results.push({
          url,
          status: error instanceof Error ? error.name : "Request failed",
        });
      }
    }
  }),
);
await mkdir("artifacts", { recursive: true });
await writeFile(
  "artifacts/source-link-audit.json",
  JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2),
);
console.info(
  JSON.stringify(
    {
      total: results.length,
      needsReview: results.filter((r) => r.status !== 200),
    },
    null,
    2,
  ),
);
