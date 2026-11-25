import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { compileScript, parse } from "@vue/compiler-sfc";
import ts from "typescript";
import {
  createRenderer,
  defineComponent,
  h,
  nextTick,
  onUnmounted,
  ref,
} from "vue";
import type { Component } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { byId } from "../src/content/catalog";
import type { SampleFile, TaskSample } from "../src/types/benchmark";

// 用真实查看器的编译结果验证子组件生命周期，不需要浏览器或额外 DOM 依赖。
interface HostNode {
  tag: string;
  text: string;
  props: Record<string, unknown>;
  children: HostNode[];
  parent: HostNode | null;
  style: { display: string };
  querySelectorAll: () => Array<{ pause: () => void }>;
}
function node(tag: string, text = ""): HostNode {
  return {
    tag,
    text,
    props: {},
    children: [],
    parent: null,
    style: { display: "" },
    querySelectorAll: () => [],
  };
}
function remove(child: HostNode) {
  if (!child.parent) return;
  const siblings = child.parent.children;
  const index = siblings.indexOf(child);
  if (index >= 0) siblings.splice(index, 1);
  child.parent = null;
}
const renderer = createRenderer<HostNode, HostNode>({
  createElement: (tag) => node(tag),
  createText: (text) => node("#text", text),
  createComment: (text) => node("#comment", text),
  setText: (element, text) => {
    element.text = text;
  },
  setElementText: (element, text) => {
    element.text = text;
    element.children = [];
  },
  parentNode: (element) => element.parent,
  nextSibling: (element) => {
    const siblings = element.parent?.children ?? [];
    return siblings[siblings.indexOf(element) + 1] ?? null;
  },
  patchProp: (element, key, _previous, value: unknown) => {
    element.props[key] = value;
  },
  insert: (child, parent, anchor) => {
    remove(child);
    const index = anchor ? parent.children.indexOf(anchor) : -1;
    if (index < 0) parent.children.push(child);
    else parent.children.splice(index, 0, child);
    child.parent = parent;
  },
  remove,
});
function text(element: HostNode): string {
  return element.text + element.children.map(text).join("");
}
function find(
  root: HostNode,
  matches: (element: HostNode) => boolean,
): HostNode | undefined {
  if (matches(root)) return root;
  for (const child of root.children) {
    const found = find(child, matches);
    if (found) return found;
  }
  return undefined;
}
async function component(): Promise<Component> {
  const url = new URL("../src/components/SampleViewer.vue", import.meta.url);
  const { descriptor } = parse(await readFile(url, "utf8"));
  let code = compileScript(descriptor, {
    id: "lifecycle",
    inlineTemplate: true,
  })
    .content.replace(
      /import (\w+) from ["']\.\/[^"']+\.vue["'];/g,
      "const $1 = { render() { return null; } };",
    )
    .replace(
      /from ["'](\.\.[^"']+)["']/g,
      (_match, path: string) =>
        `from ${JSON.stringify(new URL(path + ".ts", url).href)}`,
    )
    .replace(
      /from ["'](vue|vue-router)["']/g,
      (_match, name: string) =>
        `from ${JSON.stringify(import.meta.resolve(name))}`,
    )
    .replace("import.meta.env.BASE_URL", JSON.stringify("/"));
  code = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  return (
    await import(
      "data:text/javascript;base64," + Buffer.from(code).toString("base64")
    )
  ).default;
}

test("同题切换原始数据保留练习实例、草稿及撤销历史，换题重新创建", async (t) => {
  const source: { sampleSet: Omit<SampleFile, "benchmarkId"> } = JSON.parse(
    await readFile(
      new URL("../content/benchmarks/ifeval.json", import.meta.url),
      "utf8",
    ),
  );
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ benchmarkId: "ifeval", ...source.sampleSet }),
  );
  const Viewer = await component();
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/ifeval/", component: {} }],
  });
  await router.push("/benchmarks/ifeval/");
  let mounts = 0,
    unmounts = 0;
  const draft = ref(""),
    history = ref<string[]>([]);
  const Practice = defineComponent({
    setup() {
      mounts++;
      draft.value = "";
      history.value = [];
      onUnmounted(() => {
        unmounts++;
      });
      return () => h("textarea", { value: draft.value });
    },
  });
  const root = node("root");
  const app = renderer.createApp({
    render: () =>
      h(
        Viewer,
        { item: byId.get("ifeval") },
        {
          visual: ({ sample }: { sample: TaskSample }) =>
            h(Practice, { key: sample.id }),
        },
      ),
  });
  app.use(router);
  app.mount(root);
  t.after(() => app.unmount());
  async function settle() {
    await new Promise<void>((resolve) => setImmediate(resolve));
    await nextTick();
  }
  await settle();
  assert.equal(mounts, 1);
  draft.value = "my handwritten answer";
  history.value = ["previous answer"];
  async function click(label: string) {
    const button = find(
      root,
      (element) => element.tag === "button" && text(element).trim() === label,
    );
    assert.ok(button, label);
    const handler = button.props.onClick;
    assert.equal(typeof handler, "function");
    if (typeof handler === "function") handler();
    await settle();
  }
  const reading = find(
    root,
    (element) => element.props.class === "sample-reading",
  );
  assert.ok(reading);
  let pauses = 0;
  reading.querySelectorAll = () => [
    {
      pause: () => {
        pauses++;
      },
    },
  ];
  await click("原始数据");
  assert.equal(reading.style.display, "none");
  assert.equal(pauses, 1);
  assert.equal(unmounts, 0);
  await click("任务内容");
  assert.equal(reading.style.display, "");
  assert.equal(mounts, 1);
  assert.equal(draft.value, "my handwritten answer");
  assert.deepEqual(history.value, ["previous answer"]);
  await router.push({
    path: "/benchmarks/ifeval/",
    query: { sample: source.sampleSet.samples[1].id },
  });
  await settle();
  assert.equal(mounts, 2);
  assert.equal(unmounts, 1);
  assert.equal(draft.value, "");
});
