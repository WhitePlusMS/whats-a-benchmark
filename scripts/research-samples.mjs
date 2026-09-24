// Read-only upstream collection. Only explicitly selected public datasets are fetched.
// Raw records stay outside public/ until fields and licensing have been reviewed.
import { runResearchBatch } from "./research-batch.mjs";
const hf = (dataset, config, split) =>
  `https://datasets-server.huggingface.co/rows?dataset=${encodeURIComponent(dataset)}&config=${config}&split=${split}&offset=0&length=3`;
const inputs = [
  ["mmlu-pro", hf("TIGER-Lab/MMLU-Pro", "default", "validation"), "hf"],
  [
    "swe-bench-verified",
    hf("princeton-nlp/SWE-bench_Verified", "default", "test"),
    "hf",
  ],
  ["math-500", hf("HuggingFaceH4/MATH-500", "default", "test"), "hf"],
  ["gdpval", hf("openai/gdpval", "default", "train"), "hf"],
  ["mmlu", hf("cais/mmlu", "all", "validation"), "hf"],
  [
    "gsm8k",
    "https://raw.githubusercontent.com/openai/grade-school-math/master/grade_school_math/data/test.jsonl",
    "jsonl",
  ],
  [
    "human-eval",
    "https://raw.githubusercontent.com/openai/human-eval/master/data/HumanEval.jsonl.gz",
    "gz",
  ],
  [
    "mbpp",
    "https://raw.githubusercontent.com/google-research/google-research/master/mbpp/sanitized-mbpp.json",
    "json",
  ],
  [
    "ifeval",
    "https://raw.githubusercontent.com/google-research/google-research/master/instruction_following_eval/data/input_data.jsonl",
    "jsonl",
  ],
  [
    "finance-agent",
    "https://raw.githubusercontent.com/vals-ai/finance-agent/main/data/public.txt",
    "text",
  ],
  [
    "arc-tree",
    "https://api.github.com/repos/arcprize/ARC-AGI-2/contents/data/training",
    "json",
  ],
];
const succeeded = await runResearchBatch({ root: process.cwd(), inputs });
if (!succeeded) process.exitCode = 1;
