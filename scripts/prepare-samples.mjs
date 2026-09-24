// Prepare candidates only. Review and copy selected samples into a content entry before publication.
import { readFile, writeFile, mkdir } from "node:fs/promises";
await mkdir("artifacts/candidates/samples", { recursive: true });
await mkdir("artifacts/candidates/licenses", { recursive: true });
const read = async (id) =>
  JSON.parse(await readFile(`artifacts/research/${id}.json`, "utf8")).rows;
const output = async (id, samples) =>
  writeFile(
    `artifacts/candidates/samples/${id}.json`,
    JSON.stringify(
      {
        benchmarkId: id,
        preparedAt: new Date().toISOString(),
        samples: samples.map((item) => ({
          ...item,
          type: item.options ? "choice" : id === "human-eval" ? "code" : "text",
        })),
      },
      null,
      2,
    ),
  );
const sample = (row, index, fields) => ({
  id: String(row.task_id ?? row.question_id ?? index),
  title: `公开样例 ${index + 1}`,
  raw: row,
  split: "见来源",
  excerpt: false,
  ...fields,
});
const licenseSources = [
  [
    "human-eval",
    "https://raw.githubusercontent.com/openai/human-eval/master/LICENSE",
  ],
  [
    "gsm8k",
    "https://raw.githubusercontent.com/openai/grade-school-math/master/LICENSE",
  ],
  [
    "google-research",
    "https://raw.githubusercontent.com/google-research/google-research/master/LICENSE",
  ],
  ["mmlu", "https://raw.githubusercontent.com/hendrycks/test/master/LICENSE"],
  [
    "mmlu-pro",
    "https://raw.githubusercontent.com/TIGER-AI-Lab/MMLU-Pro/main/LICENSE",
  ],
  [
    "finance-agent",
    "https://raw.githubusercontent.com/vals-ai/finance-agent/main/LICENSE",
  ],
];
for (const [id, url] of licenseSources) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`License unavailable: ${id}`);
  await writeFile(
    `artifacts/candidates/licenses/${id}.txt`,
    await response.text(),
  );
}
await output(
  "human-eval",
  (await read("human-eval")).slice(0, 2).map((r, i) =>
    sample(r, i, {
      title: i ? "分开嵌套括号组" : "找出距离足够近的两个数",
      prompt: r.prompt,
      answer: r.canonical_solution,
      explanation:
        "模型需要补全函数体，而不是口头解释算法。docstring 给出要求与例子，test 保存用于检验函数行为的代码。参考实现来自原始记录。",
      source:
        "https://github.com/openai/human-eval/blob/master/data/HumanEval.jsonl.gz",
      license: "MIT · OpenAI",
      licensePath: "licenses/human-eval.txt",
      split: "HumanEval 原始集",
    }),
  ),
);
await output(
  "gsm8k",
  (await read("gsm8k")).slice(0, 3).map((r, i) =>
    sample(r, i, {
      title: ["卖鸭蛋的收入", "制作长袍需要多少布料", "翻修房屋后的利润"][i],
      prompt: r.question,
      answer: r.answer,
      explanation: [
        "题目要先扣除吃掉和烘焙用的鸭蛋，再计算剩余鸭蛋的销售额。它测试从文字情景建立多步算式的能力。",
        "先算白色布料用量，再加上蓝色布料。最终数字与解释步骤是两个层次。",
        "需要分清成本、增值额与最终利润。看起来熟悉的生活用语也要求准确建立计算关系。",
      ][i],
      source:
        "https://github.com/openai/grade-school-math/blob/master/grade_school_math/data/test.jsonl",
      license: "MIT · OpenAI",
      licensePath: "licenses/gsm8k.txt",
      split: "test",
    }),
  ),
);
await output(
  "mbpp",
  (await read("mbpp")).slice(0, 2).map((r, i) =>
    sample(r, i, {
      title: i ? "识别非质数" : "找出两组数据的共同元素",
      prompt: r.prompt,
      answer: r.code,
      explanation:
        "自然语言是任务输入，test_list 是验证程序行为的断言。sanitized 文件使用 prompt 字段记录题目。",
      source:
        "https://github.com/google-research/google-research/blob/master/mbpp/sanitized-mbpp.json",
      license: "Apache-2.0 · Google Research",
      licensePath: "licenses/google-research.txt",
      split: "sanitized 公开文件",
    }),
  ),
);
await output(
  "mmlu",
  (await read("mmlu")).slice(0, 2).map((r, i) =>
    sample(r, i, {
      title: i ? "商群的阶" : "循环子群的阶",
      prompt: r.question,
      options: r.choices,
      answer: `${String.fromCharCode(65 + r.answer)}. ${r.choices[r.answer]}`,
      explanation:
        "这是抽象代数学科的选择题。原始分发记录的 answer 是从 0 开始的选项索引；本站把它同时显示为字母和选项内容。",
      source: "https://huggingface.co/datasets/cais/mmlu/viewer/all/validation",
      license: "MIT · MMLU 作者",
      licensePath: "licenses/mmlu.txt",
      split: "all / validation · abstract_algebra",
    }),
  ),
);
await output(
  "mmlu-pro",
  (await read("mmlu-pro")).slice(1, 3).map((r, i) =>
    sample(r, i, {
      title: i ? "整数约束下的最大负值" : "多项式上的两个变换",
      prompt: r.question,
      options: r.options,
      answer: `${r.answer}. ${r.options[r.answer_index]}`,
      explanation:
        "这里有十个候选项。除了理解定义，还要比较多个相似表达式。原始记录中的 src 保留题源标识，cot_content 是数据提供方附带的解答文本。",
      source:
        "https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/viewer/default/validation",
      license: "MIT · TIGER-Lab",
      licensePath: "licenses/mmlu-pro.txt",
      split: "validation / math",
    }),
  ),
);
await output(
  "ifeval",
  (await read("ifeval")).slice(1, 3).map((r, i) =>
    sample(r, i, {
      title: i ? "简历中必须有足够多的占位符" : "写旅行计划，但不能出现逗号",
      prompt: r.prompt,
      explanation:
        "重点是回答是否满足可检查约束。原始 instruction_id_list 指出要运行的规则，kwargs 保存参数。这里没有唯一参考答案，程序检查生成的文本是否满足要求。",
      source:
        "https://github.com/google-research/google-research/blob/master/instruction_following_eval/data/input_data.jsonl",
      license: "Apache-2.0 · Google Research",
      licensePath: "licenses/google-research.txt",
      split: "公开 input_data",
      id: String(r.key),
    }),
  ),
);
await output(
  "finance-agent",
  (await read("finance-agent")).slice(0, 2).map((r, i) => ({
    id: `public-line-${i + 1}`,
    title: i ? "研究 Netflix 的用户收入变化" : "研究公司并购影响",
    prompt: r,
    raw: r,
    explanation:
      "问题来自官方 public.txt，需要查询相关时期的公司材料并综合信息；该文件未提供答案。",
    source:
      "https://github.com/vals-ai/finance-agent/blob/main/data/public.txt",
    license: "MIT · Vals AI",
    licensePath: "licenses/finance-agent.txt",
    split: "public.txt",
    excerpt: false,
  })),
);
// An attributed, short excerpt illustrates a repository task without redistributing its full patch.
const swe = (await read("swe-bench-verified"))[0];
await output("swe-bench-verified", [
  {
    id: swe.instance_id,
    title: "Astropy：嵌套模型的可分离性计算",
    prompt: swe.problem_statement.split("\n")[0],
    raw: {
      instance_id: swe.instance_id,
      repo: swe.repo,
      base_commit: swe.base_commit,
      problem_statement: swe.problem_statement.split("\n")[0],
    },
    explanation:
      "任务来自 Astropy，涉及嵌套复合模型的 separability_matrix。模型需要读取仓库并修复计算行为；本站仅摘录原题标题与定位元数据，完整题目、补丁和测试请查看来源。",
    source:
      "https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified/viewer/default/test",
    license: "短摘录与出处标注；原仓库材料权利见来源",
    split: "Verified / test",
    excerpt: true,
  },
]);
console.info(
  "[candidates] Prepared 8 collections outside the publication source. Review before adopting.",
);
