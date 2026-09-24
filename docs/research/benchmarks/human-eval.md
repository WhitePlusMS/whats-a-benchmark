# HumanEval

核验日期：2026-09-23

## 官方身份

HumanEval 是 OpenAI 在 Codex 论文中提出并发布的手写 Python 程序合成功能正确性测试集；本文指原始 HumanEval，不把 HumanEval+、HumanEval-X、HumanEval.org 等衍生项目合并为同一版本。[OpenAI 原始论文](https://arxiv.org/html/2107.03374#S2.SS2)；[OpenAI 官方代码与数据仓库](https://github.com/openai/human-eval)

## 官方定义与忠实中文概述

模型根据函数签名与 docstring 补全独立 Python 函数，再由题目单元测试检查功能正确性。OpenAI 的动机是用人工编写的题目降低其训练代码与公开题解直接重叠带来的污染风险；这不等于此后训练数据绝不包含 HumanEval。[原始论文](https://arxiv.org/html/2107.03374#S2.SS2)

## 任务输入/输出/环境

- 输入：函数签名、自然语言 docstring/上下文和待补全位置；仓库 `HumanEval.jsonl.gz` 的问题记录包括 `task_id`、`prompt`、`canonical_solution`、`test`、`entry_point` 等字段。评测样本 JSONL 每行至少包含 `task_id` 与 `completion`。[OpenAI 仓库 README](https://github.com/openai/human-eval#usage)；[OpenAI 论文](https://arxiv.org/html/2107.03374#S2.SS2)
- 输出：补全代码；官方 harness 执行单元测试，逐题记录 passed/timeout/failed，并计算 pass@k。[官方 README](https://github.com/openai/human-eval#usage)
- 环境：官方仓库明确警告生成代码是不可信程序，必须在稳健隔离环境中执行；仓库默认把实际执行入口注释掉以促使使用者先阅读安全说明。[官方 README](https://github.com/openai/human-eval#usage)

## 数据规模/split/字段/文件

- 原始集共 164 道手写 Python 函数题；论文称每题平均有 7.7 个单元测试。没有官方 train/validation/test 多 split 设计，整个集合是用于评测的问题集。[OpenAI 论文](https://arxiv.org/html/2107.03374#S2.SS2)
- 官方仓库提供压缩 JSONL 题库和评测 harness；另含用于调试的 example problem/sample 文件。[仓库文件与 README](https://github.com/openai/human-eval)
- 报告具体成绩时应记下代码仓库 commit、问题文件、prompt、生成样本数、采样温度、超时设置与所报 k；仅写“HumanEval 分数”不足以唯一确定实验协议。[论文 pass@k 协议](https://arxiv.org/html/2107.03374#S2.SS1)；[官方评测代码说明](https://github.com/openai/human-eval#usage)

## 访问状态

官方 GitHub 仓库公开题目文件和 harness，可直接获取。执行代码仍需自行配置隔离环境；OpenAI 特别说明不应在不安全的环境中运行生成程序。[OpenAI 官方仓库](https://github.com/openai/human-eval)

## 数据/代码/媒体许可与使用边界

OpenAI `human-eval` 仓库根目录附有 MIT 许可，但仓库未另设“题库数据 vs. harness”许可清单。可以据该仓库许可核对并遵循仓库文件的 MIT 条款；不应把论文/arXiv 页面、第三方题解或其代码自动视为同一许可。若镜像问题正文、测试或标准解，应保留仓库版权/许可声明并记录具体仓库版本；本站较稳妥的呈现方式是自写概述并链接官方题库。[仓库及 MIT 文件](https://github.com/openai/human-eval)

## 官方样例与是否可在公开 GitHub Pages 转载

仓库 README 提供样本格式示例，也随仓库提供 debug example 文件。[官方 README](https://github.com/openai/human-eval#usage) **建议只用自写的抽象示意，或在确认遵循仓库 MIT 许可并保留 notice 后再复制原始题目、测试/答案；不要从论文图表另行截取或复制。**本页不内嵌原题和参考解。

## 指标

- **pass@k**：每题采样 n≥k 个程序，若 c 个通过测试，则以无偏估计量 `1 − C(n−c,k)/C(n,k)` 估计从 k 个样本中至少有一个正确程序的比例，再对题目取平均。它不是简单地把经验 pass@1 代入 `1−(1−p)^k`。[OpenAI 原始论文](https://arxiv.org/html/2107.03374#S2.SS1)
- 论文使用 n=200 并报告 k≤100 的若干值；官方仓库默认展示 pass@1/10/100，并要求每题的生成样本数达到相应 k。[论文](https://arxiv.org/html/2107.03374#S2.SS1)；[官方 README](https://github.com/openai/human-eval#usage)
- 运行超时、采样方案及温度都会影响结果；必须随数值报告评测条件。运行生成代码的安全隔离也属于协议的一部分。[论文评测协议](https://arxiv.org/html/2107.03374#S2.SS3)

## 版本关系

原始 HumanEval 是 2021 年论文定义的 164 题集。官方仓库未在 README 中提供按语义版本编号的多个 release；复现时以题库文件哈希/仓库 commit 固定版本。HumanEval+ 等扩大测试集的结果不得直接标成原版 HumanEval。[原始论文](https://arxiv.org/html/2107.03374#S2.SS2)；[官方仓库](https://github.com/openai/human-eval)

## 官方来源按角色分组

- **基准原始定义、题数和 pass@k：**[OpenAI Codex 论文](https://arxiv.org/html/2107.03374#S2.SS1)。
- **官方题库、样本格式、执行安全说明及仓库许可证：**[openai/human-eval](https://github.com/openai/human-eval)。
- **实际计分实现：**[官方 evaluation.py](https://github.com/openai/human-eval/blob/master/human_eval/evaluation.py)。

## 模型发布引用

OpenAI 原始论文列有 Codex 与其他模型的 HumanEval pass@k 结果；这些数值是在该论文的采样设置与测试集版本下得到。第三方模型报告需保留模型快照、解码参数、n/k 和评测 harness 信息，不能把单次贪心 pass@1 与论文中多样本估计直接并列而不标协议。[OpenAI 论文](https://arxiv.org/html/2107.03374#S3.SS1)

## 未核实项

- 官方仓库根许可证未将题库、测试、示例和 harness 分别列出许可范围；正式大规模镜像前应按具体文件和许可文本复核。
- 当前任务文件与原始 2021 论文所述数据是否逐字一致，需固定 commit 后比对；上游仓库并无正式语义版本标签。
- 不同论文使用的停止序列、prompt 封装、采样配置、超时和测试分叉不一定相同；成绩差异不能只归因于模型。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 一手论文和官方仓库清楚支持原版定义、164 题规模、输入字段、隔离运行要求及 pass@k。仓库提供 MIT 许可，但未拆分数据与 harness 的许可口径；公开页面应优先采用自行撰写的说明和官方链接，完整转载前保留并核验许可适用范围。
