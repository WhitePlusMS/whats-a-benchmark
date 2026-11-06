import assert from "node:assert/strict";
import test from "node:test";
import { formatDate } from "../src/lib/displayFormats";

test("发布日期按已知日或月精度显示，不虚构首日", () => {
  assert.equal(formatDate("2026-11"), "2026年11月");
  assert.equal(formatDate("2026-11-06"), "2026年11月6日");
  assert.equal(formatDate("2024-02-29"), "2024年2月29日");
});
