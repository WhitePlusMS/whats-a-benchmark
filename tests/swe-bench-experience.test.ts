import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  findSweBenchCase,
  sweBenchCases,
} from "../src/content/sweBenchExperience";

test("SWE-bench 图解与真实样例一一对应，未知编号不显示其他题", async () => {
  const data = JSON.parse(
    await readFile(
      new URL("../content/benchmarks/swe-bench-verified.json", import.meta.url),
      "utf8",
    ),
  ) as { sampleSet: { samples: { id: string; walkthrough?: unknown }[] } };
  const samples = data.sampleSet.samples;
  assert.deepEqual(
    sweBenchCases.map((item) => item.sampleId).sort(),
    samples.map((item) => item.id).sort(),
  );
  assert.equal(
    new Set(sweBenchCases.map((item) => item.sampleId)).size,
    samples.length,
  );
  assert(samples.every((item) => item.walkthrough));
  assert.equal(findSweBenchCase(undefined)?.sampleId, samples[0].id);
  for (const item of samples)
    assert.equal(findSweBenchCase(item.id)?.sampleId, item.id);
  assert.equal(findSweBenchCase("unknown-sample"), undefined);
});
