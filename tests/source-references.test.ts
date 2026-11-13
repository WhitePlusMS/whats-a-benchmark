import assert from "node:assert/strict";
import { test } from "node:test";
import { allBenchmarks } from "../src/content/catalog";
import { groupSourceReferences } from "../src/lib/sourceReferences";

test("来源索引按实际文件和记录区分旧核验条目，保留引用号与原始链接", () => {
  let dated = 0;
  for (const item of allBenchmarks) {
    const references = groupSourceReferences(item.sources)
      .flatMap((group) => [group.first, ...group.locations])
      .sort((left, right) => left.number - right.number);
    assert.deepEqual(
      references.map((reference) => reference.source),
      item.sources,
    );
    const datedUrls = new Map<string, string>();
    for (const [index, reference] of references.entries()) {
      assert.equal(reference.id, "source-" + (index + 1));
      if (!reference.verifiedAt) continue;
      dated++;
      assert.ok(reference.source.label.includes(reference.verifiedAt));
      assert.ok(!reference.title.includes(reference.verifiedAt));
      const previousUrl = datedUrls.get(reference.title);
      assert.ok(
        !previousUrl || previousUrl === reference.source.url,
        item.id + " 使用了相同的来源标题 " + reference.title,
      );
      datedUrls.set(reference.title, reference.source.url);
    }
  }
  assert.ok(dated > 0);
});
