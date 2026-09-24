# 文本与代码类 benchmark 样例来源核查（第二批，2026-09-23）

本次只查看了用户指定的 MATH-500、C-Eval、LiveCodeBench、BFCL、LongBench、RULER、Humanity's Last Exam、BrowseComp。候选 JSON 只收录来源文件中的两条 BFCL 记录；没有把 README 教程片段或自行生成的内容当作正式样例。其他项目的原始题面与答案均未复制。

## 可进入正式内容的候选

### BFCL：2 条

- **第一方数据记录：**[官方 BFCL V4 `BFCL_v4_simple_python.json`](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/BFCL_v4_simple_python.json)。文件记录 `id=simple_python_0` 和 `id=simple_python_1`，字段包括 `question`（用户消息）及 `function`（工具定义）；这是数据文件内容，不是 README 示例。
- **数据许可：**[BFCL 官方数据目录 README](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/README.md) 的 YAML front matter 明确写 `license: apache-2.0`，同一文件的贡献说明还明确写明其数据采用 Apache 2.0。许可覆盖数据，而不只是评测代码。许可全文及分发义务见 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)；Gorilla 仓库的 [LICENSE](https://github.com/ShishirPatil/gorilla/blob/main/LICENSE) 也为 Apache 2.0。
- **判断：**允许在本站摘录这两条数据。展示时附 BFCL/Gorilla 来源、原始数据文件链接和 Apache 2.0 许可；Apache 第 4 条要求分发许可文本并保留适用的版权、专利、商标和归属声明。样例没有标准答案字段，不应自行把计算结果包装成官方答案。
- **split 口径：**官方数据文件提供 V4 版本和 `simple_python` 类别，并为记录提供 id；文件和目录说明没有将其称为 train/validation/test split。因此候选中使用版本/类别说明，不声称其为 test split。
- **候选范围：**只摘录 `simple_python_0` 与 `simple_python_1` 两条，原样保留 JSON 字段和英文文本。其他记录未纳入本批候选。

候选原始数据与许可元信息保存在 [`artifacts/candidates/samples-text-round2.json`](../../artifacts/candidates/samples-text-round2.json)。

## 检查过但未摘录

| Benchmark | 第一方证据 | 许可和数据情况 | 结论 |
|---|---|---|---|
| MATH-500 | [官方 Hugging Face 数据集页](https://huggingface.co/datasets/HuggingFaceH4/MATH-500/tree/main)列有 `test.jsonl`；当前数据集页未声明许可并提示添加许可。 | MATH 上游代码/数据集许可不能自动证明 HuggingFaceH4 的这个派生数据发布包含相同授权。 | 不复制记录，等待该数据发布的明确授权。 |
| C-Eval | [官方数据卡](https://huggingface.co/datasets/ceval/ceval-exam)和[官方仓库](https://github.com/hkust-nlp/ceval)说明完整数据及 dev/val/test 划分；Hugging Face 文件页列出 `computer_network` 的 Parquet 文件。 | [官方 `LICENSE-DATA`](https://github.com/hkust-nlp/ceval/blob/main/LICENSE-DATA) 是 CC BY-NC-SA 4.0；代码另有 MIT 许可。该数据许可只允许非商业使用，要求署名；分享改编内容时须采用同元素许可。此次读取工具未能打开具体 Parquet 行。 | 不用 README 中 `dataset['val'][0]` 的教程展示行，因为本任务明确排除 README 示例；没有直接校对其他一条原始行，所以本批不复制。后续若从正式数据文件直接取得记录，可在明确遵守非商业、署名和相同方式共享后评估接入。 |
| LiveCodeBench | [官方仓库](https://github.com/LiveCodeBench/LiveCodeBench)说明它按时间发布编程题数据；[官方 LICENSE](https://github.com/LiveCodeBench/LiveCodeBench/blob/main/LICENSE) 是 MIT。 | 该 LICENSE 没有明确将竞赛来源的题面和测试纳入许可；竞赛题材料可能来自第三方平台。代码许可不足以确立题目再发布权。 | 不复制题面、样例输入输出或测试。 |
| LongBench | [官方仓库](https://github.com/THUDM/LongBench)及[官方数据脚本](https://github.com/THUDM/LongBench/blob/main/LongBench/retrieval/LongBench.py)显示数据来自多个具体数据集；脚本将数据规范成 `input`、`context`、`answers` 等字段。 | [仓库 LICENSE](https://github.com/THUDM/LongBench/blob/main/LICENSE) 为 MIT，但其条文不能当然替各上游数据集授予再发布权。 | 未逐条核验记录的上游权利链，不复制混合来源文本。 |
| RULER | [NVIDIA 官方仓库](https://github.com/NVIDIA/RULER)说明其用程序生成可配置的长上下文样例；README 提到 NIAH 的 Paul Graham 文章，以及从 SQuAD、HotpotQA 下载问答数据。 | [Apache-2.0 LICENSE](https://github.com/NVIDIA/RULER/blob/main/LICENSE) 覆盖仓库内容，但 README 明确引入第三方文本/数据，不能据此认定这些来源全部可再发布。静态仓库也未给出本次可直接引用的固定运行记录。 | 不把自行生成的 prompt 冒称官方已发布记录；不摘录第三方内容。 |
| Humanity's Last Exam | [官方数据卡](https://huggingface.co/datasets/cais/hle)显示数据访问需接受条件，并标出 MIT。 | 同一数据卡明确写明不要公开分享、重新上传或分发数据集，并标注 benchmark 数据不应出现在训练语料中。 | 尊重官方反泄漏要求，不公开摘录题目，即使数据卡标注 MIT。 |
| BrowseComp | [OpenAI 官方发布说明](https://openai.com/index/browsecomp/)与[官方论文](https://cdn.openai.com/pdf/5e10f4ab-d6f7-442e-9508-59515c65e35d/browsecomp.pdf)开放基准数据供评测。 | 官方明确请求不要在线以文字或图片公开样例；这是直接针对公开展示样例的要求。[simple-evals 的 MIT LICENSE](https://github.com/openai/simple-evals/blob/main/LICENSE) 是仓库许可，不能覆盖官方明确提出的防泄漏要求。 | 不在本站展示题面或答案。 |

## 核验限制

- C-Eval 的正式 Parquet 文件页面可以核实文件位置、字段和数据许可，但当前研究接口无法取出具体数据行。因而本批不提供 C-Eval 题目原文，也没有用官方 README 里的教学示例顶替数据记录。
- MATH-500 页面列有真实数据文件，但数据发布本身没有显式许可；不能只根据上游 MATH 项目的许可自行推定。
- 本批候选数据全部来自第一方 BFCL 数据文件；候选条目保存逐字原字段、记录 id、类别、来源和数据许可链接，供后续正式接入时再校验。
