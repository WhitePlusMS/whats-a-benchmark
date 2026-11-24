import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { compileScript, parse } from "@vue/compiler-sfc";
import ts from "typescript";
import { brands } from "../src/content/brands";
import { healthcareBenchmarks } from "../src/content/healthcare";
import { brandSchema } from "../src/content/schema";

const marks = [
  {
    entryId: "medguardbench",
    brandId: "inclusion-ai",
    alt: "inclusionAI（蚂蚁集团） 标识",
    url: "https://www.inclusion-ai.org/img/favicon.png",
  },
  {
    entryId: "inclusionmed-index",
    brandId: "inclusionmed-collaboration",
    alt: "The InclusionMed Collaboration 标识",
    url: "https://raw.githubusercontent.com/panuvi/inclusionmed/bfa63c526093a38dc1476e4740157fa9145dae57/assets/brand/inclusionmed-favicon.svg",
  },
] as const;

test("医疗官方标识严格绑定发布方和源 URL，不接受任意域、替换或双模式", () => {
  for (const { entryId, brandId, url } of marks) {
    const entry = healthcareBenchmarks.find((item) => item.id === entryId);
    assert.deepEqual(entry?.brandIds, [brandId]);
    const brand = brands[brandId]!;
    assert.equal(brand.assetUrl, url);
    assert.equal(brandSchema.safeParse(brand).success, true);
    for (const bad of [
      { ...brand, id: "other-publisher" },
      { ...brand, assetUrl: url + "?other=1" },
      { ...brand, assetUrl: "https://another.example/mark.png" },
      { ...brand, file: "logos/openai.png" },
    ])
      assert.equal(brandSchema.safeParse(bad).success, false);
  }
  assert.equal(
    brandSchema.safeParse({
      ...brands[marks[0].brandId],
      assetUrl: marks[1].url,
    }).success,
    false,
  );
});

test("真实发布方组件在卡片和详情渲染原标识，不用文字占位", async () => {
  const componentUrl = new URL(
    "../src/components/PublisherMarks.vue",
    import.meta.url,
  );
  const { descriptor } = parse(await readFile(componentUrl, "utf8"), {
    filename: componentUrl.pathname,
  });
  const script = compileScript(descriptor, {
    id: "official-brand-marks",
    inlineTemplate: true,
  })
    .content.replace(
      /from ['"]vue['"]/g,
      "from " + JSON.stringify(import.meta.resolve("vue")),
    )
    .replace(
      /from ['"]\.\.\/content\/brands['"]/g,
      "from " +
        JSON.stringify(
          new URL("../src/content/brands.ts", import.meta.url).href,
        ),
    )
    .replace(
      /from ['"]\.\/Icon\.vue['"]/g,
      "from " + JSON.stringify("data:text/javascript,export default {}"),
    )
    .replace("import.meta.env.BASE_URL", '"/base/"');
  const code = ts.transpileModule(script, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  const Mark = (
    await import(
      "data:text/javascript;base64," + Buffer.from(code).toString("base64")
    )
  ).default;
  for (const large of [false, true]) {
    for (const { entryId, url, alt } of marks) {
      const html = await renderToString(
        createSSRApp(Mark, {
          benchmarkId: entryId,
          publisher: "fallback-name",
          large,
        }),
      );
      assert.ok(html.includes('src="' + url + '"'));
      assert.ok(html.includes('alt="' + alt + '"'));
      assert.match(html, /<img[^>]*referrerpolicy="no-referrer"[^>]*src=/);
      assert.doesNotMatch(html, /fallback-name|publisher-name|is-fallback/);
    }
  }
  const local = await renderToString(
    createSSRApp(Mark, { benchmarkId: "healthbench", publisher: "OpenAI" }),
  );
  assert.match(local, /src="\/base\/logos\/openai\.png"/);
  assert.doesNotMatch(local, /referrerpolicy/);
});
