import { z } from "zod";

// One definition drives validation and TypeScript types without rewriting original text.
const text = z.string().refine((value) => value.trim().length > 0, "不能为空");
export const idSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "使用小写英文、数字与短横线");
const date = z.iso.date();
const https = z.url({ protocol: /^https$/ });
const strings = z.array(text);
const ids = z
  .array(idSchema)
  .refine((values) => new Set(values).size === values.length, "ID 不能重复");
export const categorySchema = z.strictObject({
  id: idSchema,
  name: text,
  description: text,
  glyph: z.enum([
    "code",
    "sigma",
    "book",
    "workflow",
    "image",
    "files",
    "check",
    "briefcase",
    "grid",
  ]),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});
export const brandSchema = z.strictObject({
  id: idSchema,
  name: text,
  file: z.string().regex(/^logos\/[a-z0-9-]+\.(svg|png|jpg|jpeg|webp)$/),
  sourceUrl: https,
  assetUrl: https,
  wide: z.boolean().optional(),
  // 浅色原始标识可声明承载底色，保持素材自身颜色与透明度不变。
  background: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});
const grid = z
  .array(z.array(z.number().int().min(0).max(9)).min(1).max(30))
  .min(1)
  .max(30)
  .refine(
    (rows) => rows.every((row) => row.length === rows[0]?.length),
    "网格各行长度必须一致",
  );
const pair = z.strictObject({ input: grid, output: grid });
const assetSource = https.optional();
export const sampleAssetSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    kind: z.literal("image"),
    path: z.string().regex(/^images\/[a-z0-9-]+\.(png|jpg|jpeg|webp)$/),
    alt: text,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    caption: text.optional(),
    source: assetSource,
  }),
  z.strictObject({
    kind: z.literal("audio"),
    path: z.string().regex(/^audio\/[a-z0-9-]+\.(mp3|wav|ogg|m4a)$/),
    caption: text.optional(),
    transcript: text.optional(),
    source: assetSource,
  }),
  z.strictObject({
    kind: z.literal("video"),
    path: z.string().regex(/^videos\/[a-z0-9-]+\.(mp4|webm|ogv)$/),
    poster: z
      .string()
      .regex(/^images\/[a-z0-9-]+\.(png|jpg|jpeg|webp)$/)
      .optional(),
    caption: text.optional(),
    transcript: text.optional(),
    captions: z
      .strictObject({
        path: z.string().regex(/^captions\/[a-z0-9-]+\.vtt$/),
        language: z.string().regex(/^[a-z]{2,3}(?:-[A-Z]{2})?$/),
        label: text,
      })
      .optional(),
    source: assetSource,
  }),
  z.strictObject({
    kind: z.literal("file"),
    path: z.string().regex(/^files\/[a-z0-9-]+\.(json|jsonl|csv|txt|pdf|zip)$/),
    label: text,
    description: text.optional(),
    source: assetSource,
  }),
]);
export const sampleSchema = z
  .strictObject({
    id: text,
    title: text,
    type: z.enum([
      "text",
      "code",
      "choice",
      "grid",
      "image",
      "audio",
      "video",
      "record",
    ]),
    prompt: text,
    // 这个标记只说明任务说明由本站整理；raw 始终保留真实来源的数据格式。
    promptOrigin: z.literal("editorial").optional(),
    options: z.array(text).min(2).optional(),
    answer: text.optional(),
    explanation: text,
    raw: z.union([
      text,
      z.record(z.string(), z.unknown()).refine(
        (value) => Object.keys(value).length > 0,
        "原始数据至少保留一个真实来源字段",
      ),
    ]),
    source: https,
    license: text,
    licensePath: z
      .string()
      .regex(/^licenses\/[a-z0-9-]+\.txt$/)
      .optional(),
    split: text,
    excerpt: z.boolean(),
    assets: z.array(sampleAssetSchema).min(1).max(8).optional(),
    gridTask: z
      .strictObject({ train: z.array(pair).min(1), test: z.array(pair).min(1) })
      .optional(),
  })
  .superRefine((sample, ctx) => {
    const check = (valid: boolean, field: string, message: string) => {
      if (!valid) ctx.addIssue({ code: "custom", path: [field], message });
    };
    if (sample.promptOrigin === "editorial") {
      check(sample.excerpt, "excerpt", "本站案例解读必须标注节选");
    }
    check(
      sample.type === "choice" ? !!sample.options : !sample.options,
      "options",
      "只有 choice 题型必须提供选项",
    );
    check(
      sample.type === "grid" ? !!sample.gridTask : !sample.gridTask,
      "gridTask",
      "只有 grid 题型必须提供网格",
    );
    const requiredAssetKind = ["image", "audio", "video"].includes(sample.type)
      ? sample.type
      : null;
    if (requiredAssetKind)
      check(
        !!sample.assets?.some((asset) => asset.kind === requiredAssetKind),
        "assets",
        `${requiredAssetKind} 题型必须提供对应的真实媒体附件`,
      );
    if (sample.type === "grid")
      check(!!sample.answer, "answer", "网格答案需要展开提示");
  });
export const sampleSetSchema = z.strictObject({
  retrievedAt: date,
  samples: z
    .array(sampleSchema)
    .min(1)
    .max(6)
    .refine(
      (samples) => new Set(samples.map((s) => s.id)).size === samples.length,
      "样例 ID 不能重复",
    ),
});
const evidenceUrls = z.array(https).min(1);
const researchSourceRoleSchema = z.enum([
  "definition",
  "readme",
  "paper",
  "code",
  "data",
  "access",
  "leaderboard",
  "release",
  "vendor-report",
]);
export const sourceSchema = z.strictObject({
  label: text,
  url: https,
  role: researchSourceRoleSchema,
});
const sourcedTextSchema = z.strictObject({
  text,
  sourceUrls: evidenceUrls,
});
const dataProfileSchema = z.strictObject({
  summary: text,
  disclosure: z.enum(["complete", "partial", "not-public", "unknown"]),
  scale: strings,
  splits: strings,
  fields: strings,
  files: strings,
  sourceUrls: evidenceUrls,
});
const dataAccessSchema = z.strictObject({
  status: z.enum([
    "public",
    "gated",
    "partial",
    "private",
    "blocked",
    "unknown",
  ]),
  requirements: strings,
  url: https.optional(),
  sourceUrls: evidenceUrls,
});
const reusePolicySchema = z.strictObject({
  status: z.enum(["permitted", "restricted", "prohibited", "unknown"]),
  license: text,
  scope: text,
  boundaries: strings,
  sourceUrls: evidenceUrls,
});
const sampleAccessSchema = z.strictObject({
  status: z.enum([
    "local",
    "official",
    "gated",
    "restricted",
    "private",
    "license-pending",
    "unverified",
  ]),
  reason: text,
  url: https.optional(),
  sourceUrls: evidenceUrls,
});
const sourcedRelationSchema = z.strictObject({
  id: idSchema,
  label: text,
  detail: text,
  sourceUrls: evidenceUrls,
});

// 编辑解读仍逐项附来源；缺少栏目表示本站尚未整理，不等于官方未披露。
const interpretationSchema = z
  .strictObject({
    judge: sourcedTextSchema.optional(),
    comparison: sourcedTextSchema.optional(),
    disclosure: sourcedTextSchema.optional(),
    versionChanges: sourcedTextSchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "至少填写一项有依据的解读");
const compositionItemsSchema = z
  .array(
    z.strictObject({
      id: idSchema,
      group: text,
      weight: z.number().positive().max(100),
      detail: text,
    }),
  )
  .min(1)
  .refine(
    (items) => new Set(items.map((item) => item.id)).size === items.length,
    "指数组成 ID 不能重复",
  )
  .refine(
    (items) =>
      Math.abs(items.reduce((total, item) => total + item.weight, 0) - 100) <
      0.000001,
    "完整指数的组成权重必须合计 100%",
  );
const compositionSchema = z.strictObject({
  items: compositionItemsSchema,
  sourceUrls: evidenceUrls,
});

/**
 * Strict replacement structure prepared in an isolated candidate directory.
 * It becomes the only published entry schema after every candidate passes.
 */
export const entrySchema = z
  .strictObject({
    id: idSchema,
    status: z.enum(["published", "archived"]),
    archiveNote: text.optional(),
    order: z.number().int().nonnegative(),
    name: text,
    subtitle: text,
    category: idSchema,
    tags: strings,
    publisher: text,
    brandIds: ids,
    year: z.number().int().min(1900).max(2200).nullable(),
    version: text,
    kind: z.enum(["original", "subset", "derivative", "suite", "internal"]),
    aliases: strings,
    researchStatus: z.enum([
      "pass",
      "pass-with-limitations",
      "partial",
      "blocked",
    ]),
    officialDefinition: z.strictObject({
      summary: text,
      task: text,
      sourceUrls: evidenceUrls,
    }),
    taskContract: z.strictObject({
      input: text,
      output: text,
      environment: text,
      sourceUrls: evidenceUrls,
    }),
    dataProfile: dataProfileSchema,
    dataAccess: dataAccessSchema,
    reusePolicy: reusePolicySchema,
    sampleAccess: sampleAccessSchema,
    metric: z.strictObject({
      name: text,
      description: text,
      direction: z.enum(["higher", "lower", "mixed"]),
      sourceUrls: evidenceUrls,
    }),
    limitations: z.array(sourcedTextSchema),
    // 本站的取样、版本定位与未核验范围单独保留，避免混入评测适用限制。
    researchNotes: z.array(sourcedTextSchema).min(1).optional(),
    interpretation: interpretationSchema.optional(),
    composition: compositionSchema.optional(),
    sources: z.array(sourceSchema).min(1),
    related: z
      .array(sourcedRelationSchema)
      .refine(
        (items) =>
          new Set(items.map((relation) => relation.id)).size === items.length,
        "关联 ID 不能重复",
      ),
    verifiedAt: date,
    updatedAt: date.optional(),
    sampleSet: sampleSetSchema.optional(),
  })
  .superRefine((entry, ctx) => {
    const sourceByUrl = new Map(
      entry.sources.map((source) => [source.url, source]),
    );
    if (sourceByUrl.size !== entry.sources.length)
      ctx.addIssue({
        code: "custom",
        path: ["sources"],
        message: "来源 URL 不能重复",
      });
    const checkUrls = (path: (string | number)[], urls: string[]) => {
      for (const url of urls)
        if (!sourceByUrl.has(url))
          ctx.addIssue({
            code: "custom",
            path,
            message: `证据 URL 未登记到 sources: ${url}`,
          });
    };
    checkUrls(
      ["officialDefinition", "sourceUrls"],
      entry.officialDefinition.sourceUrls,
    );
    checkUrls(["taskContract", "sourceUrls"], entry.taskContract.sourceUrls);
    checkUrls(["dataProfile", "sourceUrls"], entry.dataProfile.sourceUrls);
    checkUrls(["dataAccess", "sourceUrls"], entry.dataAccess.sourceUrls);
    checkUrls(["reusePolicy", "sourceUrls"], entry.reusePolicy.sourceUrls);
    checkUrls(["sampleAccess", "sourceUrls"], entry.sampleAccess.sourceUrls);
    checkUrls(["metric", "sourceUrls"], entry.metric.sourceUrls);
    entry.limitations.forEach((item, index) =>
      checkUrls(["limitations", index, "sourceUrls"], item.sourceUrls),
    );
    entry.researchNotes?.forEach((item, index) =>
      checkUrls(["researchNotes", index, "sourceUrls"], item.sourceUrls),
    );
    entry.related.forEach((item, index) =>
      checkUrls(["related", index, "sourceUrls"], item.sourceUrls),
    );
    for (const [key, value] of Object.entries(entry.interpretation || {}))
      checkUrls(["interpretation", key, "sourceUrls"], value.sourceUrls);
    if (entry.composition) {
      checkUrls(["composition", "sourceUrls"], entry.composition.sourceUrls);
      if (entry.kind !== "suite")
        ctx.addIssue({
          code: "custom",
          path: ["composition"],
          message: "只有评测体系可以声明指数组成",
        });
    }
    // Editorial buckets must not repeat the same sentence under different labels.
    const profileBuckets = [
      ["scale", entry.dataProfile.scale],
      ["splits", entry.dataProfile.splits],
      ["fields", entry.dataProfile.fields],
      ["files", entry.dataProfile.files],
    ] as const;
    const profileText = new Map<string, string>();
    for (const [bucket, values] of profileBuckets)
      values.forEach((value, index) => {
        const normalized = value.replace(/\s+/g, " ").trim();
        const previous = profileText.get(normalized);
        if (previous)
          ctx.addIssue({
            code: "custom",
            path: ["dataProfile", bucket, index],
            message: `与 dataProfile.${previous} 重复，请按字段职责拆分`,
          });
        else profileText.set(normalized, bucket);
      });
    const normalizedScope = entry.reusePolicy.scope.replace(/\s+/g, " ").trim();
    entry.reusePolicy.boundaries.forEach((boundary, index) => {
      if (boundary.replace(/\s+/g, " ").trim() === normalizedScope)
        ctx.addIssue({
          code: "custom",
          path: ["reusePolicy", "boundaries", index],
          message: "边界条目不能逐字重复适用范围",
        });
    });
    const displayText = [
      entry.officialDefinition.summary,
      entry.officialDefinition.task,
      entry.taskContract.input,
      entry.taskContract.output,
      entry.taskContract.environment,
      entry.dataProfile.summary,
      entry.reusePolicy.license,
      entry.reusePolicy.scope,
      ...entry.reusePolicy.boundaries,
      entry.sampleAccess.reason,
      entry.metric.description,
      ...entry.limitations.map((item) => item.text),
    ];
    if (displayText.some((value) => /；\s*；|。\s*；|；\s*。/.test(value)))
      ctx.addIssue({
        code: "custom",
        path: [],
        message: "展示文案含连续异常标点，请清理资料拼接痕迹",
      });
    const definitionRoles = entry.officialDefinition.sourceUrls.map(
      (url) => sourceByUrl.get(url)?.role,
    );
    if (entry.kind !== "internal" && definitionRoles.includes("vendor-report"))
      ctx.addIssue({
        code: "custom",
        path: ["officialDefinition", "sourceUrls"],
        message: "模型厂商报告不能支撑非内部评测的官方定义",
      });
    const linkedSampleStatuses = new Set([
      "official",
      "gated",
      "license-pending",
    ]);
    if (
      linkedSampleStatuses.has(entry.sampleAccess.status) &&
      !entry.sampleAccess.url
    )
      ctx.addIssue({
        code: "custom",
        path: ["sampleAccess", "url"],
        message: "此样例状态必须提供官方入口",
      });
    if (
      ["public", "gated"].includes(entry.dataAccess.status) &&
      !entry.dataAccess.url
    )
      ctx.addIssue({
        code: "custom",
        path: ["dataAccess", "url"],
        message: "公开或受控数据必须提供访问入口",
      });
    if (entry.sampleSet) {
      if (entry.sampleAccess.status !== "local")
        ctx.addIssue({
          code: "custom",
          path: ["sampleAccess", "status"],
          message: "发布站内样例时状态必须为 local",
        });
      // 原题、选项、网格和媒体仍需确认许可。本站任务解读可以附真实的
      // 来源字段节选，格式不决定许可；具体字段范围在逐条取证与 license 中核对。
      // 不据本站文字的版权去改写官方数据集的许可状态。
      const includesSourceData = entry.sampleSet.samples.some(
        (sample) =>
          sample.promptOrigin !== "editorial" ||
          !!sample.assets ||
          !!sample.options ||
          !!sample.gridTask,
      );
      if (includesSourceData && entry.reusePolicy.status !== "permitted")
        ctx.addIssue({
          code: "custom",
          path: ["reusePolicy", "status"],
          message: "发布站内样例前必须确认复用许可",
        });
    } else if (entry.sampleAccess.status === "local")
      ctx.addIssue({
        code: "custom",
        path: ["sampleAccess", "status"],
        message: "local 状态必须提供 sampleSet",
      });
    if (entry.status === "archived" && !entry.archiveNote)
      ctx.addIssue({
        code: "custom",
        path: ["archiveNote"],
        message: "归档时填写本站归档原因",
      });
    if (entry.status === "published" && entry.archiveNote)
      ctx.addIssue({
        code: "custom",
        path: ["archiveNote"],
        message: "发布状态不应保留归档提示",
      });
  });
// 草稿可暂缺依据；撤回正式条目时必须原样保留已经登记的关系来源。
const draftRelationSchema = sourcedRelationSchema.partial({ sourceUrls: true });
// Drafts may be incomplete. Their bodies never enter client modules or public files.
export const draftSchema = z
  .object({
    id: idSchema,
    status: z.literal("draft"),
    related: z.array(draftRelationSchema).optional(),
    composition: compositionSchema.partial({ sourceUrls: true }).optional(),
    brandIds: ids.optional(),
  })
  .catchall(z.unknown());
export const releaseSchema = z.strictObject({
  id: idSchema,
  title: text,
  publisher: text,
  date,
  url: https,
  description: text,
  benchmarkIds: ids.min(1),
  note: text,
  chartUrl: https.optional(),
});
export type ContentEntry = z.infer<typeof entrySchema>;
export type DraftEntry = z.infer<typeof draftSchema>;
export type ContentDocument = ContentEntry | DraftEntry;
export type TaskSample = z.infer<typeof sampleSchema>;
export type SampleAsset = z.infer<typeof sampleAssetSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Release = z.infer<typeof releaseSchema>;
export type Source = z.infer<typeof sourceSchema>;
