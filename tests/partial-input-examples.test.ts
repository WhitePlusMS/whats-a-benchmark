import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { effectScope, nextTick } from "vue";
import { useSampleViewer } from "../src/composables/sampleViewer";

test("部分公开的三项样例默认呈现实际输入及边界，不借用原始数据标签代替", async (t) => {
  const ids = ["robotrack-bench", "lifeval", "terminal-bench-4-1"] as const;
  const samples = new Map(
    await Promise.all(
      ids.map(async (id) => {
        const path = new URL(
          `../.generated/public/samples/${id}.json`,
          import.meta.url,
        );
        return [id, JSON.parse(await readFile(path, "utf8"))] as const;
      }),
    ),
  );
  t.mock.method(globalThis, "fetch", async (url: string) => {
    const id = ids.find((id) => url.endsWith(`/samples/${id}.json`));
    assert.ok(id);
    return Response.json(samples.get(id));
  });

  const scope = effectScope();
  t.after(() => scope.stop());
  const viewers = scope.run(() =>
    ids.map((id) =>
      useSampleViewer(
        () => id,
        () => true,
        "/",
      ),
    ),
  )!;
  await new Promise<void>((resolve) => setImmediate(resolve));
  await nextTick();
  for (const viewer of viewers) {
    assert.equal(viewer.mode.value, "read");
    assert.equal(viewer.index.value, 0);
    assert.ok(viewer.current.value);
    assert.equal(viewer.current.value.walkthrough, undefined);
    assert.equal(viewer.current.value.answer, undefined);
  }

  const [tracking, travel, cad] = viewers.map((v) => v.current.value!);
  assert.ok(tracking && travel && cad);
  assert.equal(tracking.id, "robotrack-so100-battery-point0-occlusion");
  assert.match(tracking.prompt, /query_frames\[0\] = 61/);
  assert.match(tracking.prompt, /189\.83871459960938, 15\.483870506286621/);
  assert.match(
    tracking.prompt,
    /官方真值.*visibility\[126, 0\] = 1.*visibility\[127, 0\] = 0/,
  );
  assert.ok(typeof tracking.raw === "object");
  assert.deepEqual(tracking.raw.query_frame_slice, {
    trajs_2d: [[[189.83871459960938, 15.483870506286621]]],
    visibility: [[1]],
    query_frames: [61],
  });
  assert.equal(
    tracking.assets?.[0]?.path,
    "images/robotrack-so100-query-frame-61.webp",
  );
  assert.match(tracking.assets?.[0]?.source ?? "", /\/video\.mp4$/);
  assert.ok(
    tracking.assets
      ?.slice(1)
      .every((asset) => /point_tracks_preview\.mp4$/.test(asset.source ?? "")),
  );

  assert.equal(travel.id, "lifeval-figure1-reward-travel");
  assert.equal(travel.prompt, travel.raw);
  assert.match(
    travel.prompt,
    /Chicago to Geneva, departing March 9th, 2026\. One stop maximum\.$/,
  );
  assert.match(travel.explanation, /没有该题的.*独立评分表/);
  assert.equal(
    travel.assets?.[0]?.path,
    "images/lifeval-figure-1-reward-travel.webp",
  );

  assert.equal(cad.id, "terminal-bench-4-1-freecad-platform-drawing");
  assert.ok(typeof cad.raw === "string" && cad.raw.includes(cad.prompt));
  assert.match(cad.explanation, /唯一几何输入.*只提供链接.*完整可执行工作区/);
  assert.match(
    cad.references?.[0]?.url ?? "",
    /\/environment\/e0fe7718e6\.png$/,
  );
  assert.equal(cad.assets, undefined);
});
