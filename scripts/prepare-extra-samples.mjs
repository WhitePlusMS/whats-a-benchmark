// These two public collections have explicit upstream licenses. No private test data is fetched.
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("artifacts/candidates/samples", { recursive: true });
await mkdir("artifacts/candidates/licenses", { recursive: true });
const fetchText = async (url) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r.text();
};
const save = (id, samples) =>
  writeFile(
    `artifacts/candidates/samples/${id}.json`,
    JSON.stringify(
      {
        benchmarkId: id,
        retrievedAt: new Date().toISOString().slice(0, 10),
        samples: samples.map((item) => ({
          ...item,
          type: item.gridTask ? "grid" : "choice",
        })),
      },
      null,
      2,
    ),
  );
const arcUrl =
  "https://raw.githubusercontent.com/arcprize/ARC-AGI-2/main/data/training/6e19193c.json";
const arc = JSON.parse(await fetchText(arcUrl));
await writeFile(
  "artifacts/candidates/licenses/arc-agi-2.txt",
  await fetchText(
    "https://raw.githubusercontent.com/arcprize/ARC-AGI-2/main/LICENSE",
  ),
);
await save("arc-agi-2", [
  {
    id: "6e19193c",
    title: "从输入与输出网格中发现规则",
    prompt:
      "观察下方公开训练任务中的示范对，推断规则，再尝试判断测试输入应该变成什么样。网格由原始整数矩阵直接渲染；此句为本站操作提示。",
    raw: arc,
    gridTask: arc,
    answer: "参考输出见上方展开后的测试网格；全部原始矩阵可在“原始数据”查看。",
    explanation:
      "没有文字说明规则。颜色由 0–9 的整数表示，模型要从示范对归纳出变换，再生成完整矩阵。本例来自公开训练划分，不是私有测试题，也不代表全部任务的难度。",
    source:
      "https://github.com/arcprize/ARC-AGI-2/blob/main/data/training/6e19193c.json",
    license: "Apache-2.0 · ARC Prize",
    licensePath: "licenses/arc-agi-2.txt",
    split: "public training / 6e19193c",
    excerpt: false,
  },
]);
const mmmlu = JSON.parse(
  await fetchText(
    "https://datasets-server.huggingface.co/rows?dataset=openai%2FMMMLU&config=ZH_CN&split=test&offset=0&length=2",
  ),
);
await save(
  "mmmlu",
  mmmlu.rows.map(({ row: r }, i) => ({
    id: `ZH_CN-${r["Unnamed: 0"]}`,
    title: i ? "置换生成子群的指数" : "域扩张的次数",
    prompt: r.Question,
    options: [r.A, r.B, r.C, r.D],
    answer: `${r.Answer}. ${r[r.Answer]}`,
    raw: r,
    explanation:
      "中文题面来自 OpenAI 发布的人工翻译版本。Question 是问题，A–D 是候选答案，Subject 标明学科。它考查多语言知识问答，不包含 MMMU 式的图像输入。",
    source: "https://huggingface.co/datasets/openai/MMMLU/viewer/ZH_CN/test",
    license: "MIT · OpenAI / 原 MMLU 作者；数据卡见来源，MMLU 许可见下方原文",
    licensePath: "licenses/mmlu.txt",
    split: "ZH_CN / test",
    excerpt: false,
  })),
);
console.info(
  "[candidates] Prepared ARC and MMMLU outside the publication source. Review before adopting.",
);
