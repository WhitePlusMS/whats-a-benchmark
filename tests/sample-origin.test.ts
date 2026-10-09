import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { entrySchema } from "../src/content/schema";

test("editorial prompts preserve structured source excerpts without widening media permissions", () => {
  const entry = entrySchema.parse(
    JSON.parse(readFileSync("content/benchmarks/finbenchmark.json", "utf8")),
  );
  const summary = entry.sampleSet!.samples[0]!;
  const unknownPolicy = { ...entry.reusePolicy, status: "unknown" as const };
  const parse = (sample: typeof summary) => entrySchema.safeParse({
    ...entry,
    reusePolicy: unknownPolicy,
    sampleSet: { ...entry.sampleSet!, samples: [sample] },
  });
  assert.equal(parse(summary).success, true);
  const raw = {
    id: "example",
    turns: [{ role: "user", content: "Source task input" }],
    metadata: { category: "knowledge", reference_answer: null },
  };
  const structured = parse({ ...summary, raw });
  assert.equal(structured.success, true);
  if (structured.success)
    assert.deepEqual(structured.data.sampleSet!.samples[0]!.raw, raw);
  assert.equal(parse({ ...summary, promptOrigin: undefined }).success, false);
  assert.equal(parse({ ...summary, options: ["A", "B"], type: "choice" }).success, false);
  assert.equal(parse({ ...summary, raw: {} }).success, false);
  // 原始内容按字段和展示范围删节，不再按解读标记硬截成240字符。
  assert.equal(parse({ ...summary, raw: "x".repeat(241) }).success, true);
});
