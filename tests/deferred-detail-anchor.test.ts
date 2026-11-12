import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  createDeferredDetailAnchor,
  preserveSavedDetailPosition,
  shouldWaitForDetailLayout,
} from "../src/lib/deferredDetailAnchor";

test("HumanEval 首次深链等待上下两处最终布局，不受完成顺序影响", async () => {
  for (const hash of ["#samples", "#score", "#task-walkthrough"]) {
    for (const first of ["pilot", "samples"] as const) {
      const anchor = createDeferredDetailAnchor();
      const key = `/benchmarks/human-eval/?sample=HumanEval/0${hash}`;
      anchor.begin(key);
      let finished = false;
      const promise = anchor.wait(key).then((ready) => {
        finished = true;
        return ready;
      });
      anchor.settled(key, first);
      anchor.settled(key, first); // repeated emissions are not a second section
      await Promise.resolve();
      assert.equal(finished, false);
      anchor.settled(key, first === "pilot" ? "samples" : "pilot");
      assert.equal(await promise, true);
      assert.equal(anchor.matches(key), true); // still cancellable until actual scroll
      anchor.cancel();
      assert.equal(anchor.matches(key), false);
    }
  }
});

test("HumanEval 未知编号、失败界面与先于路由滚动的就绪事件都能结束等待", async () => {
  const anchor = createDeferredDetailAnchor();
  const key = "/benchmarks/human-eval/?sample=missing#score";
  anchor.begin(key);
  // Ready means rendered success OR rendered failure, not successful data only.
  anchor.settled(key, "samples");
  anchor.settled(key, "pilot");
  assert.equal(await anchor.wait(key), true);
  anchor.cancel();
  // Retry emissions after the one initial alignment do not re-arm it.
  anchor.settled(key, "samples");
  anchor.settled(key, "pilot");
  assert.equal(await anchor.wait(key), false);
});

test("HumanEval 手动操作或新导航取消未完成等待，旧加载完成不能重启定位", async () => {
  const anchor = createDeferredDetailAnchor();
  const first = "/benchmarks/human-eval/?sample=HumanEval/0#score";
  const second = "/benchmarks/human-eval/?sample=HumanEval/3#samples";
  anchor.begin(first);
  const pending = anchor.wait(first);
  anchor.settled(first, "pilot");
  anchor.cancel();
  assert.equal(await pending, false);
  anchor.settled(first, "samples");
  assert.equal(await anchor.wait(first), false);
  anchor.begin(first);
  const oldRequest = anchor.wait(first);
  anchor.begin(second);
  assert.equal(await oldRequest, false);
  anchor.settled(first, "pilot");
  anchor.settled(first, "samples");
  let secondFinished = false;
  const nextRequest = anchor.wait(second).then((ready) => {
    secondFinished = true;
    return ready;
  });
  await Promise.resolve();
  assert.equal(secondFinished, false);
  anchor.settled(second, "pilot");
  anchor.settled(second, "samples");
  assert.equal(await nextRequest, true);
  anchor.cancel();
  assert.equal(anchor.matches(second), false);
});

test("HumanEval 初次定位仅绑定本页跨页/刷新深链，保留历史和同页滚动并可由手动输入取消", async () => {
  const read = (path: string) =>
    readFile(new URL(`../${path}`, import.meta.url), "utf8");
  const [main, detail, pilot, viewer] = await Promise.all([
    read("src/main.ts"),
    read("src/views/DetailView.vue"),
    read("src/components/HumanEvalPilot.vue"),
    read("src/components/SampleViewer.vue"),
  ]);
  assert.match(
    main,
    /to\.path === "\/benchmarks\/human-eval\/" &&\s*to\.path !== from\.path/,
  );
  assert.match(
    main,
    /if \(restoreSaved && saved\) return \{ \.\.\.saved, behavior: "instant" \}/,
  );
  for (const event of ["wheel", "touchstart", "pointerdown", "keydown"])
    assert.ok(main.includes(`"${event}"`));
  assert.match(main, /window\.removeEventListener\(event, cancel\)/);
  assert.match(
    main,
    /waitedForInitialLayout \? \{ behavior: "instant" as const \} : \{\}/,
  );
  assert.match(main, /router\.currentRoute\.value\.fullPath !== to\.fullPath/);
  assert.match(detail, /@settled="reportHumanEvalReady\('pilot'\)"/);
  assert.match(detail, /@settled="reportHumanEvalReady\('samples'\)"/);
  for (const component of [pilot, viewer]) {
    assert.match(component, /if \(loaded \|\| failed\) emit\("settled"\)/);
    assert.match(component, /flush: "post"/);
  }
});

test("HumanEval 同一深链快速离开再返回时，旧已就绪请求不能完成新请求的定位", async () => {
  const anchor = createDeferredDetailAnchor();
  const key = "/benchmarks/human-eval/?sample=HumanEval/0#score";
  anchor.begin(key);
  const oldToken = anchor.token(key);
  anchor.settled(key, "pilot");
  anchor.settled(key, "samples");
  assert.equal(await anchor.wait(key), true);
  anchor.cancel();
  anchor.begin(key);
  assert.notEqual(anchor.token(key), oldToken);
  let ready = false;
  const next = anchor.wait(key).then((value) => {
    ready = value;
    return value;
  });
  await Promise.resolve();
  assert.equal(ready, false);
  anchor.settled(key, "pilot");
  anchor.settled(key, "samples");
  assert.equal(await next, true);
});

test("HumanEval 刷新深链不沿用过期像素位置，但浏览器和站内前进后退保留历史位置", () => {
  assert.equal(preserveSavedDetailPosition(false, true, "reload"), false);
  assert.equal(preserveSavedDetailPosition(false, true, "navigate"), false);
  assert.equal(preserveSavedDetailPosition(false, true, "back_forward"), true);
  assert.equal(preserveSavedDetailPosition(true, true, "reload"), true);
  assert.equal(preserveSavedDetailPosition(false, false, "reload"), true);
});

test("HumanEval 跨页历史返回有无hash都等布局，首次无目标与同页选题不等待", () => {
  assert.equal(shouldWaitForDetailLayout(true, true, true), true);
  assert.equal(shouldWaitForDetailLayout(true, false, true), true);
  assert.equal(shouldWaitForDetailLayout(true, true, false), true);
  assert.equal(shouldWaitForDetailLayout(true, false, false), false);
  assert.equal(shouldWaitForDetailLayout(false, true, true), false);
  assert.equal(shouldWaitForDetailLayout(false, false, true), false);
});

test("HumanEval 无hash返回的saved像素在两处就绪后才恢复，手动取消不会恢复", async () => {
  const key = "/benchmarks/human-eval/?sample=HumanEval/3";
  const saved = { left: 17, top: 3542 };
  for (const cancel of [false, true]) {
    const anchor = createDeferredDetailAnchor();
    anchor.begin(key);
    const token = anchor.token(key);
    let result: typeof saved | undefined;
    const restore = anchor.wait(key).then((ready) => {
      if (ready && anchor.token(key) === token) result = { ...saved };
    });
    anchor.settled(key, "pilot");
    await Promise.resolve();
    assert.equal(result, undefined);
    if (cancel) anchor.cancel();
    anchor.settled(key, "samples");
    await restore;
    assert.deepEqual(result, cancel ? undefined : saved);
  }
  const main = await readFile(
    new URL("../src/main.ts", import.meta.url),
    "utf8",
  );
  assert.ok(
    main.indexOf("await humanEvalInitialAnchor.wait(to.fullPath)") <
      main.indexOf("if (restoreSaved && saved) return"),
  );
  assert.match(main, /shouldWaitForDetailLayout\(/);
});
