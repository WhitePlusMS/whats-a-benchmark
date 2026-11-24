import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { parse, compileScript } from "@vue/compiler-sfc";
import {
  parse as parseHtml,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
} from "@vue/compiler-dom";
import ts from "typescript";
import { entrySchema } from "../src/content/schema";

async function loadWalkthrough() {
  const componentUrl = new URL(
    "../src/components/SampleWalkthrough.vue",
    import.meta.url,
  );
  const { descriptor } = parse(await readFile(componentUrl, "utf8"), {
    filename: componentUrl.pathname,
  });
  const compiled = compileScript(descriptor, {
    id: "healthcare-default-record",
    inlineTemplate: true,
  })
    .content.replace(
      /from ['"]vue['"]/g,
      "from " + JSON.stringify(import.meta.resolve("vue")),
    )
    .replace(
      /from ['"]\.\.\/lib\/sampleSourceText['"]/g,
      "from " +
        JSON.stringify(
          new URL("../src/lib/sampleSourceText.ts", import.meta.url).href,
        ),
    );
  const code = ts.transpileModule(compiled, {
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

function visibleText(node: RootNode | TemplateChildNode): string {
  if (node.type === NodeTypes.TEXT) return node.content;
  if (node.type === NodeTypes.ROOT)
    return node.children.map(visibleText).join(" ");
  if (node.type !== NodeTypes.ELEMENT) return "";
  const attrs = new Map(
    node.props.flatMap((attr) =>
      attr.type === NodeTypes.ATTRIBUTE
        ? [[attr.name, attr.value?.content] as const]
        : [],
    ),
  );
  if (
    attrs.has("hidden") ||
    attrs.get("aria-hidden") === "true" ||
    /(?:^|;)\s*(?:display:\s*none|visibility:\s*hidden)\b/i.test(
      attrs.get("style") ?? "",
    )
  )
    return "";
  if (node.tag === "details" && !attrs.has("open")) {
    const summary = node.children.find(
      (child) => child.type === NodeTypes.ELEMENT && child.tag === "summary",
    );
    return summary ? visibleText(summary) : "";
  }
  return node.children.map(visibleText).join(" ");
}

const cases = [
  {
    id: "inclusionmed-index",
    original:
      "You are working on a Linux R biostatistics simulation benchmark.",
    provenance: /ALE-CLI.*不是综合指数独立题/s,
  },
  {
    id: "medguardbench",
    original:
      "- Record dates, duration, service line, call obligations, clinic templates, and current staffing levels.",
    provenance: /safe.*3,579.*MedSafetyBench/s,
  },
] as const;

test("医疗评测默认任务内容渲染原文：关闭的来源折叠不计可见", async (t) => {
  const Walkthrough = await loadWalkthrough();
  for (const { id, original, provenance } of cases) {
    await t.test(id, async () => {
      const entry = entrySchema.parse(
        JSON.parse(
          await readFile("content/benchmarks/" + id + ".json", "utf8"),
        ),
      );
      const sample = entry.sampleSet!.samples[0]!;
      // 详情页静态壳随后加载样例；这里渲染正常“任务内容”使用的生产组件。
      const html = await renderToString(createSSRApp(Walkthrough, { sample }));
      assert.ok(html.includes(original), "记录不应该缺少提供的原始节选");
      const dom = parseHtml('<section id="samples">' + html + "</section>");
      const shown = visibleText(dom);
      assert.ok(
        shown.includes(original),
        "原文不能只存在于关闭的来源折叠或原始数据",
      );
      assert.match(shown, provenance);
      assert.doesNotMatch(shown, /user_question/);
    });
  }
});
