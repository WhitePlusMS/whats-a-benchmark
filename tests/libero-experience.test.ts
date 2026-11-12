import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { entrySchema, sampleSchema } from "../src/content/schema";
import { sampleSourceText } from "../src/lib/sampleSourceText";

const entry = entrySchema.parse(
  JSON.parse(
    readFileSync(
      new URL("../content/benchmarks/libero.json", import.meta.url),
      "utf8",
    ),
  ),
);
const [demo, run] = entry.sampleSet!.samples;

test("LIBERO defaults to train; third-party result stays independent and external-only", () => {
  assert.deepEqual(
    entry.sampleSet!.samples.map((s) => s.id),
    ["libero-dataset-episode-0", "libero-pi05-spatial-task0-trial0"],
  );
  assert.match(demo!.split, /^train/);
  assert.match(demo!.walkthrough!.summary!, /不是模型评测/);
  assert.deepEqual(
    demo!.assets!.map((a) => a.kind),
    ["video", "image", "image"],
  );
  assert.equal(run!.assets, undefined);
  assert.match(run!.walkthrough!.note, /不表示 LIBERO 官方发布/);
  assert.match(run!.walkthrough!.output, /79 个环境动作步/);
  assert.match(run!.walkthrough!.output, /不能直接读成模型做了 79 次决策/);
  assert.match(run!.walkthrough!.output, /replan=5、wait_steps=10/);
  assert.match(run!.walkthrough!.checks.join(" "), /未证明第三方历史运行/);
  assert.equal(entry.verifiedAt, "2026-10-28");
  assert.equal(entry.sampleSet!.retrievedAt, "2026-10-28");
});

test("LIBERO original-language excerpts resolve exact source pointers", () => {
  assert.equal(demo!.walkthrough!.sourceField, "/episode/tasks/0");
  assert.equal(run!.walkthrough!.sourceField, "task_description");
  for (const sample of entry.sampleSet!.samples) {
    const source = sampleSourceText(
      sample.raw,
      sample.walkthrough!.sourceField,
    )!;
    assert.equal(sample.answer, undefined);
    assert.equal(sample.promptOrigin, "editorial");
    assert(sample.walkthrough!.excerpts.every((e) => source.includes(e.text)));
    assert.equal(sampleSchema.safeParse(sample).success, true);
    assert.equal(
      sampleSchema.safeParse({
        ...sample,
        walkthrough: { ...sample.walkthrough!, sourceField: "/success" },
      }).success,
      false,
    );
    assert.equal(
      sampleSchema.safeParse({
        ...sample,
        walkthrough: {
          ...sample.walkthrough!,
          excerpts: [
            {
              label: "Invented",
              text: "An evaluator confirmed this training episode succeeded.",
            },
          ],
        },
      }).success,
      false,
    );
  }
});

test("LIBERO task rules distinguish target relations, camera orientation and timestamps", () => {
  const guide = demo!.walkthrough!;
  assert.match(guide.checks.join(" "), /On porcelain_mug_1 plate_1/);
  assert.match(guide.checks.join(" "), /On white_yellow_mug_1 plate_2/);
  assert.match(guide.checks.join(" "), /AND/);
  assert.match(guide.checks.join(" "), /白杯在屏幕右、黄白杯在屏幕左/);
  assert.match(guide.checks.join(" "), /示意不代表相机方位/);
  assert.match(guide.checks.join(" "), /不能代替评测器/);
  assert.match(guide.note, /21.4 秒.*21.3 秒/);
  assert.match(run!.walkthrough!.input, /两只黑碗/);
  assert.match(run!.walkthrough!.input, /akita_black_bowl_1/);
  const raw = demo!.raw as Record<string, unknown>;
  assert.equal(raw.success, undefined);
  const result = run!.raw as Record<string, unknown>;
  assert.equal(result.action_steps, 79);
  assert.equal(result.success, true);
  assert.equal(result.status, "success");
  assert.equal(result.decisions, undefined);
});

test("LIBERO preservation fingerprints cover original prompt, raw, media, source and license", () => {
  // Baseline fingerprints before this editorial revision, not upstream re-verification.
  const expected: Record<string, string> = {
    "libero-dataset-episode-0":
      "defb5b5e4b0b4180c9f6478149c8bd1836bf4053e6231370ee324de4c0b86b44",
    "libero-pi05-spatial-task0-trial0":
      "e323b8f88fe90c1929a9aa6956964f1898a723bb5a41caea0360612c15563466",
  };
  const fields = [
    "id",
    "type",
    "prompt",
    "raw",
    "assets",
    "source",
    "license",
    "licensePath",
    "split",
    "excerpt",
  ] as const;
  for (const sample of entry.sampleSet!.samples) {
    const evidence = Object.fromEntries(
      fields.map((key) => [key, sample[key]]),
    );
    assert.equal(
      createHash("sha256").update(JSON.stringify(evidence)).digest("hex"),
      expected[sample.id],
    );
  }
});

test("LIBERO licenses only existing train derivatives; rules are fixed and protocols separate", () => {
  assert.equal(entry.reusePolicy.status, "permitted");
  assert.match(entry.reusePolicy.scope!, /仅限本站现有 train/);
  assert.match(entry.reusePolicy.scope!, /不包含黑碗/);
  assert.match(entry.reusePolicy.license!, /不能覆盖上游/);
  assert.match(entry.reusePolicy.boundaries.join(" "), /LIBERO Team/);
  assert.match(entry.reusePolicy.boundaries.join(" "), /license: other/);
  assert.match(entry.reusePolicy.boundaries.join(" "), /10 Hz 重新编码/);
  const sources = entry.sources;
  assert.equal(
    sources.filter((s) =>
      s.url.includes("8f1084e3132a39270c3a13ebe37270a43ece2a01"),
    ).length,
    7,
  );
  assert(sources.some((s) => s.label === "LIBERO-PRO 独立衍生协议"));
  assert(sources.some((s) => s.label === "LIBERO-Plus 独立衍生协议"));
  assert.match(entry.researchNotes!.at(-2)!.text, /未逐像素重建全部 214 帧/);
});
