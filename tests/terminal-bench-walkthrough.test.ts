import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  findTerminalBenchCase,
  terminalBenchCases,
} from "../src/content/terminalBenchWalkthrough";

test("每道 Terminal-Bench 图解对应一个真实样例，未知编号不误显示其他题", async () => {
  const data = JSON.parse(
    await readFile(
      new URL("../content/benchmarks/terminal-bench-4.json", import.meta.url),
      "utf8",
    ),
  ) as {
    sampleSet: {
      samples: { id: string; source: string; excerpt: boolean }[];
    };
  };
  const sampleIds = data.sampleSet.samples.map((sample) => sample.id).sort();
  const walkthroughIds = terminalBenchCases.map((item) => item.sampleId).sort();
  assert.deepEqual(walkthroughIds, sampleIds);
  assert.equal(new Set(walkthroughIds).size, walkthroughIds.length);
  assert.equal(
    findTerminalBenchCase(undefined)?.sampleId,
    data.sampleSet.samples[0].id,
  );
  for (const id of sampleIds)
    assert.equal(findTerminalBenchCase(id)?.sampleId, id);
  assert.equal(findTerminalBenchCase("unknown-sample"), undefined);
  for (const sample of data.sampleSet.samples) {
    assert.equal(sample.excerpt, false, `${sample.id} 保留完整任务指令`);
    assert.match(sample.source, /452bf305c6daa62fc59061d22133a7cbc7c1572e/);
  }
  const verificationTasks = [
    "cad-model",
    "coq-block-bound",
    "data-anonymization",
  ];
  for (const task of verificationTasks) {
    const walkthrough = findTerminalBenchCase(
      `official-task-terminal-bench-4-${task}`,
    );
    assert.ok(walkthrough?.verificationUrl);
    assert.ok(walkthrough.verificationUrl.includes(`/tasks/${task}/tests/`));
    assert.match(
      walkthrough.verificationUrl,
      /452bf305c6daa62fc59061d22133a7cbc7c1572e/,
    );
  }
});
