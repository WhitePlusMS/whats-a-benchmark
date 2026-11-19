# GPQA：同名模型的发布成绩与榜单归一化

核查日期：2026-11-10。只读公开模型卡、榜单快照和社区讨论；未运行模型或下载原始受限题目。本例不把不同来源成绩视作同协议对照。

## 一个模型的两个成绩

[DeepSeek-R1-Distill-Qwen-32B 模型卡](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B)的 Distilled Model Evaluation 表报告 GPQA Diamond **62.1 pass@1**。模型卡一般评估说明写最长生成 32,768 tokens，需采样的测试按温度 0.6、top-p 0.95、每题 64 个回答估计 pass@1；该一般说明是否完整覆盖表中此单元格的每项配置，还需逐项核实。

[StackTicker 的榜单](https://stackticker.com/benchmarks)另外列出相同名称的 `deepseek-r1-distill-qwen-32b` 在 **GPQA** 项为 **4.59**，标明来源是 Open LLM Leaderboard，并将 GPQA Diamond 另设榜单。页面显示来源核验与抓取日期，但该数字不应直接读成 Diamond 的答对率，也不能把 `Source verified` 自动解释为 StackTicker 自己独立测试。

为追溯该行，2026-11-10 使用只读方式下载并解析 Hugging Face 官方 [open-llm-leaderboard/contents Parquet](https://huggingface.co/datasets/open-llm-leaderboard/contents/resolve/main/data/train-00000-of-00001.parquet)，共 4,576 行；按 `fullname` 精确匹配模型得到一行：`eval_name=deepseek-ai_DeepSeek-R1-Distill-Qwen-32B_bfloat16`、`Precision=bfloat16`、`GPQA Raw=0.28439597315436244`、`GPQA=4.5861297539149914`。后者四舍五入为 4.59，与聚合站该行一致。文件动态可变，单次下载文件 1,109,997 字节、SHA-256 `f13a7061e63133bc8745d89f8c7a56148584940ede22d3b27e21cad1e078dca5`；未逐条复核其余记录或运行评测。

[HF 的归一化文档](https://github.com/huggingface/leaderboards/blob/main/docs/source/en/open_llm_leaderboard/normalization.md)把四选项的随机基线设为 0.25，对不低于基线的原分计算 `(raw − 0.25) / 0.75 × 100`。把该行 `GPQA Raw` 代入得到约 **4.586**，与 `GPQA` 字段一致。这里 `Raw` 是榜单中的字段名；维护者在[讨论 #928](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard/discussions/928)说明它对应 harness 的 `acc_norm,none`，不能未经核查将其简单改名为普通选择题正确率，也不能认定其就是 DeepSeek 模型卡所用 Diamond 子集。

因此 4.59、0.2844 和 62.1 不是三个同尺度分数；来源、测试子集、回答方式、采样及评分均须另核，不能直接相减、认定厂商夸大或把 4.59 解释为 4.59% 正确率。该例同样不说明 AA 的 GPQA 数字有误。

## 用户问题和现有解决方案

HF [讨论 #928](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard/discussions/928)中，用户询问另一个模型的榜单值 7.38 与详情中的原始值为何不一致；维护者给出准确字段与公式，并指出先将原始数四舍五入再计算会带来差异。它是一条真实历史困惑，但官方已提供解释；不能据此声称本站有独占答案，或推断这名用户愿意使用本站。

另一个已存在的成绩目录 [LLM•DIR](https://llm-dir.com/benchmarks)提供模型和多项基准矩阵、缺失值留空、来源与口径提示；其[方法页](https://llm-dir.com/methodology)还描述来源层级、版本与核查日期。页面当次标注来源检查时间为 2026-07-19，这是页面快照，不代表当前值仍准确或本次逐行核验。它进一步说明“汇总成绩并强调来源、缺项和可比性”已有直接替代。

本站已有 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)说明但无上述结构化模型成绩。一个可测试的阅读任务是让读者判断 4.59 是否为正确率、62.1 是否可直接对照，并找到计分公式；实际读者测试、维护成本及回访意愿均尚未调查。
