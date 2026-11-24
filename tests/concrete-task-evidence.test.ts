import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { compileScript, parse } from "@vue/compiler-sfc";
import {
  NodeTypes,
  parse as parseHtml,
  type RootNode,
  type TemplateChildNode,
} from "@vue/compiler-dom";
import { renderToString } from "@vue/server-renderer";
import ts from "typescript";
import { createSSRApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { entrySchema } from "../src/content/schema";
import { compositionSample } from "../src/lib/sampleAccess";
import type { Benchmark, SampleFile } from "../src/types/benchmark";

const dataUrl = (js: string) =>
  "data:text/javascript;base64," + Buffer.from(js).toString("base64");

function visibleText(node: RootNode | TemplateChildNode): string {
  if (node.type === NodeTypes.TEXT) return node.content;
  if (node.type === NodeTypes.ROOT)
    return node.children.map(visibleText).join(" ");
  if (node.type !== NodeTypes.ELEMENT) return "";
  const hidden = node.props.some(
    (attr) =>
      attr.type === NodeTypes.ATTRIBUTE &&
      (attr.name === "hidden" ||
        (attr.name === "aria-hidden" && attr.value?.content === "true") ||
        (attr.name === "style" &&
          /(?:display:\s*none|visibility:\s*hidden)/.test(
            attr.value?.content ?? "",
          ))),
  );
  if (hidden) return "";
  if (
    node.tag === "details" &&
    !node.props.some(
      (attr) => attr.type === NodeTypes.ATTRIBUTE && attr.name === "open",
    )
  ) {
    const title = node.children.find(
      (child) => child.type === NodeTypes.ELEMENT && child.tag === "summary",
    );
    return title ? visibleText(title) : "";
  }
  return node.children.map(visibleText).join(" ");
}

async function load(id: string) {
  const data = entrySchema.parse(
    JSON.parse(
      await readFile(
        new URL(`../content/benchmarks/${id}.json`, import.meta.url),
        "utf8",
      ),
    ),
  );
  const { sampleSet, ...metadata } = data;
  return {
    item: {
      ...metadata,
      sampleCount: sampleSet?.samples.length ?? 0,
    } satisfies Benchmark,
    sampleFile: sampleSet && { benchmarkId: id, ...sampleSet },
  };
}

async function component(url: URL, loader: string): Promise<string> {
  const { descriptor } = parse(await readFile(url, "utf8"), {
    filename: url.pathname,
  });
  const script = compileScript(descriptor, {
    id: url.pathname,
    inlineTemplate: true,
  }).content;
  const imports = [...script.matchAll(/from ["']([^"']+)["']/g)];
  let code = script.replace("import.meta.env.BASE_URL", '"/"');
  for (const [statement, name] of imports) {
    // The transport is still the only replaced behavior. Keep the real
    // useSampleViewer but redirect just its useSampleLoader dependency.
    if (name === "../composables/sampleViewer") {
      const viewerUrl = new URL(name + ".ts", url);
      const viewer = (await readFile(viewerUrl, "utf8"))
        .replace('"vue"', JSON.stringify(import.meta.resolve("vue")))
        .replace('"./sampleLoader"', JSON.stringify(loader));
      code = code.replace(
        statement,
        "from " + JSON.stringify(dataUrl(transpile(viewer))),
      );
    } else {
      const resolved = !name.startsWith(".")
        ? import.meta.resolve(name)
        : name.endsWith(".vue")
          ? await component(new URL(name, url), loader)
          : new URL(name + ".ts", url).href;
      code = code.replace(statement, "from " + JSON.stringify(resolved));
    }
  }
  return dataUrl(transpile(code));
}

function transpile(code: string) {
  return ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
}

async function renderDefault(
  item: Benchmark,
  sampleFile?: SampleFile,
  detailId = item.id,
  query = "",
) {
  // Feed the fetched sample file at the transport boundary: SSG otherwise
  // intentionally serves the loading shell until onMounted fetches the data.
  const loader = dataUrl(`
    import { ref } from ${JSON.stringify(import.meta.resolve("vue"))};
    export function useSampleLoader() {
      return { data: ref(${JSON.stringify(sampleFile ?? null)}), error: ref(""), reload() {} };
    }`);
  const url = new URL("../src/components/SampleViewer.vue", import.meta.url);
  const { default: Viewer } = await import(await component(url, loader));
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/benchmarks/:id/", component: Viewer }],
  });
  const app = createSSRApp(Viewer, { item, detailId });
  app.use(router);
  await router.push(`/benchmarks/${detailId}/${query}`);
  const html = await renderToString(app);
  const shown = visibleText(
    parseHtml('<section id="samples">' + html + "</section>"),
  );
  if (!query.includes("sampleView=raw"))
    assert.doesNotMatch(html, /class="raw-content"/);
  return { html, shown };
}

test("InclusionMed 默认展示同一正式组成题的输入、交付和二元验证", async () => {
  const { item, sampleFile } = await load("inclusionmed-index");
  const { shown } = await renderDefault(item, sampleFile);
  assert.match(shown, /ALE-CLI v1\.0/);
  assert.match(
    shown,
    /01_data_generation_longitudinal\.R.*study_plan_public\.json.*n=200、n=1,000/s,
  );
  assert.match(
    shown,
    /Your job is to reconstruct.*02_variance_methods_longitudinal\.R.*summary\.csv.*report\.pdf/s,
  );
  assert.match(
    shown,
    /0 或 1.*非空.*列结构和行键.*绝对公差.*干净的临时目录独立复跑/s,
  );
  assert.match(shown, /不是综合指数独立题/);
});

test("AutoformBench 默认保留实际 Lean 代码，并显示同工作区的全套计分目标", async () => {
  const { item, sampleFile } = await load("autoformbench");
  const { html, shown } = await renderDefault(item, sampleFile);
  assert.match(html, /class="[^"]*code-prompt/);
  assert.match(shown, /theorem bezout_plane_projective_curves[\s\S]*sorry/);
  for (const original of [
    "vanishesAt_scaling_forward",
    "vanishesAt_scaling_reverse",
    "affinePointIdeal_isPrime",
    "bezout_plane_projective_curves",
    "propext",
    "Quot.sound",
    "Classical.choice",
  ])
    assert.ok(shown.includes(original), original);
  assert.match(shown, /不是完整输入/);
});

test("AA v2.1 默认沿用正式 Terminal 成员的原题而不再存一份", async () => {
  const { item: index, sampleFile: native } = await load(
    "artificial-analysis-coding-agent-index-v2-1",
  );
  const { item: terminal, sampleFile } = await load("terminal-bench-4-1");
  const { item: frontier, sampleFile: frontierFile } = await load(
    "frontiercode-aa-2-0",
  );
  const { item: swe } = await load("swe-atlas-qna");
  const catalog = new Map(
    [terminal, frontier, swe].map((item) => [item.id, item]),
  );
  assert.equal(native, undefined);
  assert.equal(compositionSample(index, catalog), terminal);
  assert.equal(
    sampleFile?.samples[0]?.id,
    "terminal-bench-4-1-freecad-platform-drawing",
  );
  const { shown } = await renderDefault(terminal, sampleFile, index.id);
  assert.match(shown, /e0fe7718e6\.png/);
  assert.match(shown, /build_part\.py.*part\.FCStd/s);
  assert.match(shown, /重放.*0\.9/s);
  assert.equal(compositionSample(index, catalog, "unknown"), terminal);
  const oldId = "msw-fix-reset-generator-state";
  const oldMember = compositionSample(index, catalog, oldId);
  assert.equal(oldMember, frontier);
  assert.equal(compositionSample(terminal, catalog, oldId), undefined);
  const old = await renderDefault(
    oldMember!,
    frontierFile,
    index.id,
    `?sample=${oldId}&sampleView=raw#samples`,
  );
  assert.match(old.html, /class="raw-content"/);
  assert.doesNotMatch(old.shown, /没有匹配此编号/);
  assert.match(old.shown, /MSW|msw/);
});

test("MedGuard 默认说明是片段而非完整输入，只渲染安全候选句与原标签", async () => {
  const { item, sampleFile } = await load("medguardbench");
  const { shown } = await renderDefault(item, sampleFile);
  assert.match(shown, /不是可从头复现的完整测试题/);
  assert.match(
    shown,
    /Record dates, duration, service line, call obligations, clinic templates, and current staffing levels\./,
  );
  assert.match(shown, /标签为 safe.*不是.*独立验证.*3,579.*MedSafetyBench/s);
  assert.deepEqual(Object.keys(sampleFile?.samples[0]?.raw ?? {}).sort(), [
    "id",
    "label",
    "model_response",
    "source",
    "upstream_dataset",
  ]);
});

test("RCTBench 默认仅描述同一个外部真实动作，不把它当作原始任务或标准答案", async () => {
  const { item, sampleFile } = await load("rctbench");
  assert.equal(sampleFile, undefined);
  const { html, shown } = await renderDefault(item, sampleFile);
  assert.match(
    shown,
    /外部官方回放.*第 1 年 5 月第 1 周.*1\.10.*52 位.*86%.*1\.20.*不是标准答案或整局评分/s,
  );
  assert.doesNotMatch(shown, /Decider|1,042/);
  assert.match(
    html,
    /href="https:\/\/www\.vals\.ai\/benchmarks\/rctbench#example-decisions"/,
  );
});
