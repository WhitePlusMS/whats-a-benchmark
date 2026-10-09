import assert from "node:assert/strict";
import test from "node:test";
import { splitCitationTail } from "../src/lib/citationText";

test("引用随完整的句末词移动，不拆英文或组合字符，也不改写原文", () => {
  for (const [text, expectedTail] of [
    ["并通过测试。", "测试。"],
    ["Keep the MIT license.", "license."],
    ["保留 e\u0301。", "e\u0301。"],
    ["通过测试😊", "测试😊"],
    ["…", "…"],
    ["", ""],
  ]) {
    const parts = splitCitationTail(text);
    assert.equal(parts.tail, expectedTail);
    assert.equal(parts.leading + parts.tail, text);
  }
});
