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

test("语音条目默认在正常任务内容中显示实际字段和验收，官方游戏回放不冒充本地原始数据", () => {
  const load = (id: string) =>
    entrySchema.parse(
      JSON.parse(readFileSync(`content/benchmarks/${id}.json`, "utf8")),
    );
  const banking = load("tau-banking-voice-aa");
  const bankDefault = banking.sampleSet?.samples[0];
  assert.equal(bankDefault?.id, "tau-banking-voice-task-012");
  assert.match(bankDefault?.walkthrough?.summary ?? "", /travel notification/);
  assert.match(
    bankDefault?.walkthrough?.checks.join(" ") ?? "",
    /kb_search_unsuccessful_customer_requests_transfer/,
  );
  assert.equal(bankDefault?.answer, undefined);
  assert.deepEqual(
    load("tau3-banking").sampleSet?.samples.map((sample) => {
      const raw = sample.raw;
      return typeof raw === "object" ? raw.id : undefined;
    }),
    ["task_001", "task_006", "task_008"],
  );
  const entity = load("tau-entity-aa");
  const entityDefault = entity.sampleSet?.samples[0];
  assert.equal(entityDefault?.id, "tau-entity-en-drop-off-date");
  assert.match(
    entityDefault?.walkthrough?.output ?? "",
    /drop_off_date.*2025-09-20/,
  );
  assert.match(
    entityDefault?.walkthrough?.checks.join(" ") ?? "",
    /三种音频条件/,
  );
  assert.equal(entityDefault?.assets?.[0]?.kind, "image");
  assert(!JSON.stringify(entityDefault?.raw).includes("REC-1061"));
  for (const item of [banking, entity])
    assert.equal(item.releaseDate, undefined);
  const rct = load("rctbench");
  assert.equal(rct.sampleAccess.status, "official");
  assert.equal(rct.sampleSet, undefined);
  assert.match(rct.sampleAccess.reason, /1\.10.*86%.*1\.20/);
  assert.match(rct.sampleAccess.url ?? "", /#example-decisions$/);
  assert.equal(rct.reusePolicy.status, "restricted");
});
