# RULER

核验日期：2026-09-23。

## 官方身份

RULER（“What’s the Real Context Size of Your Long-Context Language Models?”）由 NVIDIA 作者团队发布，用于检验长上下文语言模型在不同输入长度及任务复杂度下的有效上下文能力。本文“RULER”指原始 RULER v1；官方仓库另提供 RULERv2 pipeline，二者必须分开报告。[NVIDIA/RULER 官方仓库](https://github.com/NVIDIA/RULER)；[论文](https://arxiv.org/abs/2404.06654)

## 官方定义与忠实中文概述

RULER 通过可配置长度和复杂度的长上下文任务，测试模型是否能完成简单 needle retrieval 以外的上下文定位、变量追踪、文本抽取和问答。目的在于估计模型实际可用的上下文能力，而非只采纳模型声明的最大 token 窗口。[官方 README](https://github.com/NVIDIA/RULER)

## 任务输入/输出/环境

- 输入：按模型 tokenizer 和目标序列长度生成的长文本及任务查询。
- 输出：文本答案；通过官方 task-specific evaluator 与目标答案比较。
- v1 原始论文与仓库的 13 项任务由 NIAH（needle-in-a-haystack）变体、variable tracking、common/frequent words extraction、QA 组成；长度可配置，论文基线涵盖 4K–128K。
- 运行环境需加载被测模型并执行推理；当前官方 README 指向 NeMo-Skills 的 `rulerv1-ns` 和 `rulerv2-ns` 两个不同 pipeline，运行比较要记录分支、生成设置、模型 tokenizer 和 context length。[官方 README](https://github.com/NVIDIA/RULER)；[原始论文](https://arxiv.org/abs/2404.06654)

## 数据规模/split/字段/文件

原始 v1 采用脚本生成的合成任务，支持指定长度运行；13 个 task 名称见论文附录和官方配置，不是单个固定的 13 行下载集。官方旧 pipeline 还会下载 needle 背景文本及 QA 数据源，因此不能把所有可运行输入都说成完全人工合成或同一许可。[官方 README](https://github.com/NVIDIA/RULER)

原论文报告在 17 个开源模型上评测，覆盖四个任务类别/13 个任务。该数字是论文实验范围，不是最新 pipeline 的固定模型榜单或数据行数。[原始论文](https://arxiv.org/abs/2404.06654)

## 访问状态

评测代码、脚本和配置在公开 NVIDIA GitHub；v1/v2 现行 NeMo-Skills pipeline 通过各自公开分支运行，并按模型 tokenizer 生成数据。部分基准输入来自外部来源，访问与使用权仍受那些来源自身条款约束。[官方仓库及分支说明](https://github.com/NVIDIA/RULER)

## 数据/代码/媒体许可与使用边界

- RULER 仓库 LICENSE 为 Apache-2.0，按许可复用仓库覆盖的代码时应保留所需版权与许可通知。[官方 LICENSE](https://github.com/NVIDIA/RULER/blob/main/LICENSE)
- 仓库 README 说明旧 pipeline 使用 Paul Graham essays/blog 作为 NIAH 背景文本，并下载 SQuAD 与 HotpotQA 作为 QA 数据。Apache-2.0 不能授予这些第三方文本/数据的额外再分发权；其各自许可须逐项遵守。[官方 README](https://github.com/NVIDIA/RULER)
- 因此本站只链接代码与论文，不复制外部文章、QA 条目或由其构成的任务样例。若生成自有合成例，须独立生成并记录输入来源，不能含第三方原文。

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库公开运行脚本与任务配置，但具体示例输入可由外部文章或 QA 数据源构成。**不把 README 中的数据下载或生成样例复制到本站**；只链接 NVIDIA 仓库。Apache 许可对代码的覆盖不等于许可转载背景文本和 QA 数据。[官方 README](https://github.com/NVIDIA/RULER)

## 指标

基础任务按各自 evaluator 计算准确率，论文的主要汇总为 13 个任务准确率的平均分，并按序列长度分别比较。长度、NIAH 位置/复杂度、任务集合和实现分支都会影响结果；单一汇总值不应脱离这些运行条件解释。[原始论文](https://arxiv.org/abs/2404.06654)；[官方 README](https://github.com/NVIDIA/RULER)

## 版本关系

NVIDIA 官方仓库当前明确分别指向 `rulerv1-ns` 与 `rulerv2-ns` 分支及 `ruler` / `ruler2` 数据集定义。本文记录原始论文所述 RULER v1；当前分支/NeMo-Skills pipeline 是后续运行形态，不把 v2 新配置、生成规则或分数回写成原始 v1 结果。复现实验应记录 commit/tag、任务配置、长度、样本数、模型 tokenizer 与生成参数。[官方仓库](https://github.com/NVIDIA/RULER)；[RULERv1 pipeline](https://github.com/NVIDIA/RULER/tree/rulerv1-ns)；[RULERv2 pipeline](https://github.com/NVIDIA/RULER/tree/rulerv2-ns)

## 官方来源按角色分组

- 基准定义、运行入口和当前 v1/v2 分支：[NVIDIA/RULER GitHub](https://github.com/NVIDIA/RULER)
- 原始方法与论文实验：[arXiv:2404.06654](https://arxiv.org/abs/2404.06654)
- v1 NeMo-Skills pipeline：[rulerv1-ns](https://github.com/NVIDIA/RULER/tree/rulerv1-ns)
- v2 NeMo-Skills pipeline：[rulerv2-ns](https://github.com/NVIDIA/RULER/tree/rulerv2-ns)
- 仓库代码许可：[Apache-2.0 LICENSE](https://github.com/NVIDIA/RULER/blob/main/LICENSE)

## 模型发布引用

本记录不采用模型厂商分数。后续发布引用只有在明确 RULER v1/v2、长度、任务配置、推理参数和汇总方法时才可比较；本文不据厂商材料改写基准定义。

## 未核实项

- 原始论文 appendix、当前 NeMo-Skills 的 `ruler` 定义与主仓库旧 pipeline 的逐项 task mapping 未逐项对照；不同实现间的对等性不能默认成立。
- Paul Graham、SQuAD、HotpotQA 当前版本的独立许可文本和各来源内容分布未逐条复核，因而不作再发布许可判断。
- 论文中的数据长度、样本生成和聚合细节应针对固定论文版本/commit 复现；本次没有运行评测。

## 研究结论

**PASS_WITH_LIMITATIONS** — RULER v1 的任务目标、四类/13 项任务、长度参数化和官方代码许可证有第一方来源支持。仓库另有 v2 pipeline；第三方背景文本及 QA 数据权利不由 RULER 的 Apache-2.0 代码许可覆盖。本站只链接官方材料，不转载具体样例。
