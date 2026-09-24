import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  cp,
  unlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { entrySchema, sampleSchema } from "../src/content/schema";
import {
  loadContent,
  generateContent,
  publicProjection,
  deletionImpact,
  writeJson,
  readJson,
} from "../scripts/content-pipeline";
import {
  createDraft,
  setStatus,
  deleteEntry,
} from "../scripts/content-maintenance";
import {
  listFiles,
  verifyPublicFiles,
  verifyBuild,
} from "../scripts/verify-public-output";

async function fixture(t: TestContext) {
  const root = await mkdtemp(join(tmpdir(), "whats-a-benchmark-content-"));
  t.after(async () => {
    // Only remove the exact temporary workspace created by this test.
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    assert(root.includes("whats-a-benchmark-content-"));
    await rm(root, { recursive: true, force: true });
  });
  await mkdir(join(root, "content/benchmarks"), { recursive: true });
  await mkdir(join(root, "public"), { recursive: true });
  await cp("content/assets", join(root, "content/assets"), { recursive: true });
  await cp("content/templates", join(root, "content/templates"), {
    recursive: true,
  });
  await cp("public/favicon.svg", join(root, "public/favicon.svg"));
  await cp("content/categories.json", join(root, "content/categories.json"));
  await cp("content/brands.json", join(root, "content/brands.json"));
  await writeJson(join(root, "content/releases.json"), []);
  const entry = entrySchema.parse(
    await readJson("content/benchmarks/mmlu-pro.json"),
  );
  entry.related = [];
  await writeJson(join(root, "content/benchmarks/mmlu-pro.json"), entry);
  return {
    root,
    entry,
    path: join(root, "content/benchmarks/mmlu-pro.json"),
  };
}

test("新增草稿不进入任何生成数据、附件或样例；发布必须先通过完整校验", async (t) => {
  const { root } = await fixture(t);
  await createDraft(root, "new-benchmark");
  await assert.rejects(createDraft(root, "new-benchmark"), /EEXIST/);
  await assert.rejects(createDraft(root, "../escape"));
  const path = join(root, "content/benchmarks/new-benchmark.json");
  const draft = await readJson(path);
  await assert.rejects(
    setStatus(root, "new-benchmark", "published"),
    /name|sources/,
  );
  assert.deepEqual(await readJson(path), draft, "校验失败不能改动源文件");
  await writeJson(path, {
    id: "new-benchmark",
    status: "draft",
    prompt: "DO_NOT_PUBLISH_DRAFT",
    sampleSet: { samples: [{ raw: "DO_NOT_PUBLISH_DRAFT" }] },
  });
  await mkdir(join(root, "public/samples"), { recursive: true });
  await writeJson(join(root, "public/samples/unreviewed.json"), {
    value: "DO_NOT_PUBLISH_DRAFT",
  });
  await generateContent(root);
  const files = await listFiles(join(root, ".generated"));
  assert(
    !files.some(
      (file) => file.includes("new-benchmark") || file.includes("unreviewed"),
    ),
  );
  for (const file of files.filter((file) => file.endsWith(".json")))
    assert(
      !(await readFile(join(root, ".generated", file), "utf8")).includes(
        "DO_NOT_PUBLISH_DRAFT",
      ),
    );
});

test("更新只改变指定条目的日期与内容，样例不进入目录模块", async (t) => {
  const { root, entry, path } = await fixture(t);
  await writeJson(join(root, "content/benchmarks/second.json"), {
    ...entry,
    id: "second",
    verifiedAt: "2026-09-22",
    sampleSet: undefined,
    sampleAccess: {
      ...entry.sampleAccess,
      status: "restricted",
      reason: "测试条目已撤回站内样例。",
    },
  });
  entry.verifiedAt = "2026-09-23";
  entry.officialDefinition.summary = "已更新的说明";
  await writeJson(path, entry);
  const projection = publicProjection(await generateContent(root));
  assert.equal(
    projection.catalog.find((item) => item.id === "mmlu-pro")?.verifiedAt,
    "2026-09-23",
  );
  assert.equal(
    projection.catalog.find((item) => item.id === "second")?.verifiedAt,
    "2026-09-22",
  );
  assert.equal(
    projection.catalog.find((item) => item.id === "mmlu-pro")?.sampleCount,
    2,
  );
  assert.equal(
    projection.catalog.find((item) => item.id === "second")?.sampleCount,
    0,
  );
  assert(!JSON.stringify(projection).includes('"sampleSet"'));
  assert(!JSON.stringify(projection).includes('"raw"'));
});

test("归档保留详情投影；撤回样例后旧样例和独占许可退出生成目录", async (t) => {
  const { root, path } = await fixture(t);
  await setStatus(root, "mmlu-pro", "archived", "维护测试归档");
  let workspace = await generateContent(root);
  assert.equal(workspace.entries[0]?.status, "archived");
  assert.equal(
    publicProjection(workspace).catalog.filter(
      (item) => item.status === "published",
    ).length,
    0,
  );
  assert(
    (await listFiles(join(root, ".generated/public"))).includes(
      "samples/mmlu-pro.json",
    ),
  );
  const entry = entrySchema.parse(await readJson(path));
  delete entry.sampleSet;
  entry.sampleAccess = {
    ...entry.sampleAccess,
    status: "restricted",
    reason: "测试撤回样例后只保留来源说明。",
  };
  await writeJson(path, entry);
  workspace = await generateContent(root);
  const files = await listFiles(join(root, ".generated/public"));
  assert(
    !files.some(
      (file) => file.startsWith("samples/") || file.startsWith("licenses/"),
    ),
  );
  await verifyPublicFiles(join(root, ".generated/public"), workspace);
  await setStatus(root, "mmlu-pro", "published");
  assert.equal((await loadContent(root)).entries[0]?.archiveNote, undefined);
});

test("硬删除列出评测、草稿和报告引用；阻止公开内容指向草稿", async (t) => {
  const { root, entry } = await fixture(t);
  await writeJson(join(root, "content/benchmarks/referrer.json"), {
    ...entry,
    id: "referrer",
    related: [
      {
        id: "mmlu-pro",
        label: "关联",
        detail: "测试引用",
        sourceUrls: [entry.sources[0]!.url],
      },
    ],
  });
  await writeJson(join(root, "content/benchmarks/draft-ref.json"), {
    id: "draft-ref",
    status: "draft",
    related: [{ id: "mmlu-pro", label: "关联", detail: "草稿引用" }],
  });
  await writeJson(join(root, "content/releases.json"), [
    {
      id: "report",
      title: "测试报告",
      publisher: "测试",
      date: "2026-09-22",
      url: "https://example.org/report",
      description: "测试",
      benchmarkIds: ["mmlu-pro"],
      note: "测试",
    },
  ]);
  const impact = deletionImpact(await loadContent(root), "mmlu-pro");
  assert.equal(impact.references.length, 3);
  await assert.rejects(deleteEntry(root, "mmlu-pro"), /referrer|draft-ref/);
  await assert.rejects(
    setStatus(root, "mmlu-pro", "draft"),
    /不存在或未发布/,
  );
  assert.equal(
    entrySchema.parse(
      await readJson(join(root, "content/benchmarks/mmlu-pro.json")),
    ).status,
    "published",
  );
});

test("删除后重建不遗留样例；共享原始素材保留；产物检查拒绝孤立样例与旧页面", async (t) => {
  const { root } = await fixture(t);
  await generateContent(root);
  await deleteEntry(root, "mmlu-pro");
  const workspace = await generateContent(root);
  assert.equal(workspace.entries.length, 0);
  assert.deepEqual(await listFiles(join(root, ".generated/public")), [
    "favicon.svg",
  ]);
  assert(
    (await readFile(join(root, "content/assets/logos/openai.png"))).length > 0,
  );
  await cp(join(root, ".generated/public"), join(root, "dist"), {
    recursive: true,
  });
  await writeJson(join(root, "dist/samples/mmlu-pro.json"), {});
  await assert.rejects(
    verifyPublicFiles(join(root, "dist"), workspace),
    /残留/,
  );
  await unlink(join(root, "dist/samples/mmlu-pro.json"));
  await mkdir(join(root, "dist/benchmarks/mmlu-pro"), { recursive: true });
  await writeFile(join(root, "dist/benchmarks/mmlu-pro/index.html"), "旧页面");
  await assert.rejects(verifyBuild(root), /详情页面存在遗漏或删除残留/);
});

test("严格校验未知字段、真实日期、重复品牌、资源缺失和错名文件", async (t) => {
  const { root, entry, path } = await fixture(t);
  await writeJson(path, { ...entry, verifiedAt: "2026-02-30" });
  await assert.rejects(loadContent(root), /verifiedAt/);
  await writeJson(path, { ...entry, summray: "拼写错误" });
  await assert.rejects(loadContent(root), /summray/);
  await writeJson(path, { ...entry, id: "other" });
  await assert.rejects(loadContent(root), /文件名/);
  await writeJson(path, entry);
  const brand = {
    id: "test-brand",
    name: "Test",
    file: "logos/openai.png",
    sourceUrl: "https://example.org",
    assetUrl: "https://example.org/logo",
  };
  await writeJson(join(root, "content/brands.json"), [brand, brand]);
  await assert.rejects(loadContent(root), /重复 ID/);
  await cp("content/brands.json", join(root, "content/brands.json"));
  entry.sampleSet!.samples[0]!.licensePath = "licenses/missing.txt";
  await writeJson(path, entry);
  await assert.rejects(loadContent(root), /missing.txt/);
});

test("题型结构和转载限制在构建前拦截，不让坏数据进入组件", async () => {
  const entry = entrySchema.parse(
    await readJson("content/benchmarks/mmlu-pro.json"),
  );
  const sample = entry.sampleSet!.samples[0]!;
  assert.equal(
    sampleSchema.safeParse({ ...sample, options: ["只有一个选项"] }).success,
    false,
  );
  assert.equal(sampleSchema.safeParse({ ...sample, answer: 2 }).success, false);
  assert.equal(
    sampleSchema.safeParse({ ...sample, type: "text" }).success,
    false,
  );
  const { options: _options, ...base } = sample;
  assert.equal(
    sampleSchema.safeParse({
      ...base,
      type: "image",
      assets: [
        { kind: "image", path: "images/example.png", alt: "测试图片" },
      ],
    }).success,
    true,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...base,
      type: "image",
      assets: [{ kind: "image", path: "../secret.png", alt: "测试" }],
    }).success,
    false,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...base,
      type: "audio",
      assets: [
        {
          kind: "audio",
          path: "audio/official-sample.mp3",
          caption: "官方音频样例",
          transcript: "官方转录文本",
        },
      ],
    }).success,
    true,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...base,
      type: "video",
      assets: [
        {
          kind: "video",
          path: "videos/official-sample.mp4",
          captions: {
            path: "captions/official-sample.vtt",
            language: "zh-CN",
            label: "官方中文字幕",
          },
        },
      ],
    }).success,
    true,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...base,
      type: "video",
      assets: [{ kind: "audio", path: "audio/wrong-kind.mp3" }],
    }).success,
    false,
  );
  assert.equal(
    sampleSchema.safeParse({
      ...base,
      type: "grid",
      gridTask: { train: [{ input: [[1], [2, 3]], output: [[10]] }], test: [] },
    }).success,
    false,
  );
  assert.equal(
    entrySchema.safeParse({
      ...entry,
      sampleAccess: { ...entry.sampleAccess, status: "restricted" },
    }).success,
    false,
  );
  assert.equal(
    entrySchema.safeParse({ ...entry, status: "archived" }).success,
    false,
  );
});
