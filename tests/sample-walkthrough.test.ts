import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { entrySchema, sampleSchema } from "../src/content/schema";

const entry = entrySchema.parse(
  JSON.parse(
    readFileSync("content/benchmarks/swe-bench-verified.json", "utf8"),
  ),
);
const sample = entry.sampleSet!.samples[0]!;

test("SWE-bench task guides retain all four source records without answer patches", () => {
  assert.equal(entry.sampleSet!.samples.length, 4);
  assert.equal(entry.reusePolicy.status, "unknown");
  for (const item of entry.sampleSet!.samples) {
    assert.equal(item.promptOrigin, "editorial");
    assert.equal(item.excerpt, true);
    assert.equal(item.walkthrough?.sourceField, "problem_statement");
    assert.equal(typeof item.raw, "object");
    assert.deepEqual(Object.keys(item.raw).sort(), [
      "base_commit",
      "instance_id",
      "problem_statement",
      "repo",
      "version",
    ]);
    assert.equal(item.answer, undefined);
    assert.equal(sampleSchema.safeParse(item).success, true);
  }
  const reproduction =
    entry.sampleSet!.samples[1]!.walkthrough!.excerpts[0]!.text;
  assert(reproduction.includes("from astropy.time import Time"));
  assert(reproduction.includes('ts.remove_column("flux")'));
  assert(!reproduction.includes("<!--"));
  assert(!reproduction.includes("-->"));
});

test("task guides reject invented excerpts and missing source fields", () => {
  const guide = sample.walkthrough!;
  assert.equal(
    sampleSchema.safeParse({
      ...sample,
      walkthrough: { ...guide, sourceField: "not_a_field" },
    }).success,
    false,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...sample,
      walkthrough: {
        ...guide,
        excerpts: [{ label: "Claim", text: "A newly invented test result" }],
      },
    }).success,
    false,
  );
  assert.equal(
    sampleSchema.safeParse({ ...sample, walkthrough: { ...guide, checks: [] } })
      .success,
    false,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...sample,
      walkthrough: { ...guide, excerpts: [] },
    }).success,
    false,
  );
  assert.equal(
    sampleSchema.safeParse({ ...sample, walkthrough: { ...guide, input: " " } })
      .success,
    false,
  );
});

test("task guides can cite native source text and normalize line endings only", () => {
  const guide = sample.walkthrough!;
  const source = "line one\r\nline two\r\n";
  const textSample = {
    ...sample,
    raw: source,
    walkthrough: {
      ...guide,
      sourceField: undefined,
      excerpts: [{ label: "Original", text: "line one\nline two" }],
    },
  };
  const parsed = sampleSchema.parse(textSample);
  assert.equal(parsed.raw, source);
  assert.equal(
    sampleSchema.safeParse({
      ...textSample,
      walkthrough: {
        ...textSample.walkthrough,
        excerpts: [{ label: "Changed", text: "line one\nchanged line two" }],
      },
    }).success,
    false,
  );
});

test("Terminal-Bench guides explain native instructions without replacing source prompts", () => {
  const terminal = entrySchema.parse(
    JSON.parse(
      readFileSync("content/benchmarks/terminal-bench-4.json", "utf8"),
    ),
  );
  assert.equal(terminal.sampleSet!.samples.length, 4);
  for (const item of terminal.sampleSet!.samples) {
    assert.equal(item.prompt, item.raw);
    assert.equal(item.promptOrigin, undefined);
    assert(item.walkthrough!.summary);
    assert.equal(item.walkthrough!.sourceField, undefined);
    assert.equal(sampleSchema.safeParse(item).success, true);
    assert.equal(item.answer, undefined);
    assert.equal(
      sampleSchema.safeParse({
        ...item,
        walkthrough: { ...item.walkthrough, summary: " " },
      }).success,
      false,
    );
  }
  const command =
    terminal.sampleSet!.samples[3]!.walkthrough!.excerpts[1]!.text;
  assert.equal(
    command,
    "python3 /app/anon.py /app/input --policy /app/policy.yaml --output /app/output --seed 42 --max-memory 64MB",
  );
});
