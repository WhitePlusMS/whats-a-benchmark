import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { sampleSourceText } from "../src/lib/sampleSourceText";
import { entrySchema } from "../src/content/schema";

test("source text pointers read nested arrays without flattening original records", () => {
  const raw = { tasks: ["Original task"], "a/b": { "~key": "Exact value" } };
  assert.equal(sampleSourceText(raw, "/tasks/0"), "Original task");
  assert.equal(sampleSourceText(raw, "/a~1b/~0key"), "Exact value");
  assert.equal(
    sampleSourceText({ problem_statement: "Issue" }, "problem_statement"),
    "Issue",
  );
  assert.equal(sampleSourceText("Native source"), "Native source");
  for (const path of [
    "/tasks/1",
    "/tasks/length",
    "/missing",
    "/toString",
    "/__proto__/toString",
  ])
    assert.equal(sampleSourceText(raw, path), undefined);
  assert.equal(sampleSourceText({ tasks: null }, "/tasks/0"), undefined);
  assert.equal(sampleSourceText(raw), undefined);
});

test("RoboQuest separates demonstration, single-step training, and evaluation records", () => {
  const entry = entrySchema.parse(
    JSON.parse(readFileSync("content/benchmarks/roboquest.json", "utf8")),
  );
  const [demo, step, result, overview] = entry.sampleSet!.samples;
  assert.equal(demo!.id, "roboquest-puzzle-box-demo-000000");
  assert(demo!.assets?.some((asset) => asset.kind === "video"));
  assert(demo!.walkthrough!.note.includes("不是同一实例"));
  assert.equal(demo!.walkthrough!.sourceField, "/tasks/0");
  assert.equal(
    step!.walkthrough!.sourceField,
    "/target/tool_calls/0/function/arguments",
  );
  assert.equal(
    step!.assets?.filter((asset) => asset.kind === "image").length,
    3,
  );
  assert.equal(
    sampleSourceText(step!.raw, step!.walkthrough!.sourceField),
    '{"position_world_m":[1.944,-3.775,1.16],"ticks":40}',
  );
  assert.equal(result!.assets, undefined);
  assert(result!.walkthrough!.note.includes("未提供这次运行的录像"));
  assert.equal(overview!.id, "roboquest-official-task");
  assert.equal(entry.sampleSet!.samples.length, 4);
});
