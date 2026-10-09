import assert from "node:assert/strict";
import { test } from "node:test";
import { byId } from "../src/content/catalog";
import { compositionSample } from "../src/lib/sampleAccess";
import type { Benchmark } from "../src/types/benchmark";

test("an index displays a real constituent case without inheriting ordinary relations", () => {
  const index = byId.get("aa-intelligence-index")!;
  const science: Benchmark = {
    ...byId.get("scicode")!,
    sampleAccess: { ...byId.get("scicode")!.sampleAccess, status: "local" },
    sampleCount: 1,
  };
  const missingCase: Benchmark = {
    ...byId.get("aa-briefcase")!,
    sampleAccess: { ...byId.get("aa-briefcase")!.sampleAccess, status: "official" },
    sampleCount: 0,
  };
  const catalog = new Map([
    [science.id, science],
    [missingCase.id, missingCase],
  ]);
  assert.equal(compositionSample(index, catalog), science);
  // 普通条目即使与有题目的条目相关，也不能被算成已含案例。
  assert.equal(compositionSample(science, catalog), undefined);
  assert.equal(compositionSample(index, new Map()), undefined);
  catalog.set(science.id, { ...science, sampleCount: 0 });
  assert.equal(compositionSample(index, catalog), undefined);
});
