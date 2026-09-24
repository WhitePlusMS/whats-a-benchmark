# IFBench

核验日期：2026-09-23

## 官方身份

IFBench（论文题名 *Generalizing Verifiable Instruction Following*）由 Allen Institute for AI（Ai2）发布，旨在评估精确、可验证的指令遵循，论文被 NeurIPS 2025 Datasets and Benchmarks track 接收。该基准是 IFEval 的扩展，但有独立 OOD 约束集，不能和项目已收录的 `ifeval` 作为同一条或同义名称处理。[官方 IFBench README](https://github.com/allenai/IFBench/blob/main/README.md)；[官方论文](https://arxiv.org/abs/2507.02833)

## 官方定义与忠实中文概述

官方测试集包含 58 个新 OOD（分布外）指令约束及对应 verifier，并将约束模板与 WildChat 留出 prompts 组合。可选多轮设置把原始 prompt 与后续约束拆为两轮，用于隔离“理解原请求”和“根据附加约束修改回答”。同仓库还发布 29 个 IF-RLVR 训练约束；训练约束不是 IFBench 测试题数。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)

## 任务输入/输出/环境

- 输入：IFBench 测试 JSONL prompt/约束，以及模型生成回复 JSONL；单轮或可选双轮 constraint-isolation 格式。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)
- 输出：逐 prompt 的 completion 与 verifier 结果，汇总严格或宽松准确率；thinking model 允许更长输出，评估时从输出提取最终答案、剥离推理链。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)
- 环境：官方 Python 包/仓库中的规则 verifier；论文报告生成时 temperature=0，最大 token 数按模型类型调整。仓库中存在 83 项 verifier key 是 25 个经典 IFEval key 加 58 个 OOD key，不能误述成 83 个 IFBench OOD 测试约束。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)

## 数据规模/split/字段/文件

- 官方 README 列出 58 OOD 测试约束、可选多轮测试数据、以及独立的 29 个 IF-RLVR 训练约束；还有经典 IFEval verifier registry。数据集链接由官方 Hugging Face collection 汇总。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)
- 官方公开的具体数据文件包括 `IFBench_test.jsonl`；运行端另提供生成结果 JSONL，README 示例名 `sample_output.jsonl`。本页不外推单条 JSONL 的完整 schema，也不把 verifier 数量当成 prompt 行数。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)
- 分数通常以 prompt-level loose accuracy 汇报；另有 strict 与 instruction-level 项目，但具体均须按论文/运行脚本的 aggregation 口径解释。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)

## 访问状态

官方 GitHub 仓库公开，README 链接 test、multi-turn test 和 IF-RLVR 数据集。运行需按 README 安装包/依赖并准备模型回复 JSONL；本轮未下载测试集或运行 evaluator。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)；[官方测试数据集卡](https://huggingface.co/datasets/allenai/IFBench_test)

## 数据/代码/媒体许可与使用边界

官方仓库声明代码 Apache-2.0，数据 ODC-BY-1.0，面向研究和教育用途并受 Ai2 Responsible Use Guidelines 约束。README 另提醒数据内包含第三方模型生成输出，可能受到各自独立条款约束。虽然存在 dataset license，本研究未逐条审查第三方生成输出权利，因此不将题目/回复样例复制进本站。[官方 README 许可说明](https://github.com/allenai/IFBench/blob/main/README.md)

## 官方样例与是否可在公开 GitHub Pages 转载

官方 README 指向公开 JSONL 测试集，也以 `sample_output.jsonl` 示范运行输入。数据标注 ODC-BY-1.0，但对由第三方模型生成的内容存在独立 terms 提示；**本站可链接官方测试入口，不直接再发布测试行或模型回复样例**，除非逐条审完来源/许可并遵守 Ai2 Responsible Use Guidelines。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)；[测试集卡](https://huggingface.co/datasets/allenai/IFBench_test)

## 指标

论文通常报告 prompt-level loose accuracy；仓库评估允许 strict/loose 变体，也提供 prompt-level、instruction-level 聚合。默认复现需要按 README 使用 temperature 0；thinking model 的最大生成 token 预算不同且会抽取最终答案。厂商表格若只写“IFBench”而未说明 strict/loose、模型类型和 generation policy，视为 vendor-report，不能自动与论文默认结果等价。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)；[官方论文](https://arxiv.org/abs/2507.02833)

## 版本关系

IFBench 是独立于 IFEval 的基准条目，尽管仓库同时打包经典 IFEval verifier，也明确说自身扩展自 IFEval。项目已有 `ifeval`，候选应使用新 ID `ifbench`，关联而非合并。仓库 main/HF 数据版本可能变化；候选发布后需记录 commit、数据集 revision、单轮/多轮、scoring mode 和 generation 配置。[官方 README](https://github.com/allenai/IFBench/blob/main/README.md)；[官方论文](https://arxiv.org/abs/2507.02833)

## 官方来源按角色分组

- **定义/代码/复现/许可**：[Ai2 官方 IFBench README](https://github.com/allenai/IFBench/blob/main/README.md)，含 OOD 约束、多轮、评分和许可说明。
- **论文**：[arXiv:2507.02833](https://arxiv.org/abs/2507.02833)，论文身份和评测方法。
- **数据/访问**：[官方 Hugging Face 数据集卡](https://huggingface.co/datasets/allenai/IFBench_test)；README 中官方 dataset collection 链接同时提供 multi-turn 和训练数据入口。
- **数据许可与限制**：仍以 README 所述 ODC-BY-1.0、Ai2 使用指南及第三方模型输出的独立条款为边界。

## 模型发布引用

Qwen 官方 [Qwen3.8-27B 模型卡](https://huggingface.co/Qwen/Qwen3.8-27B) 与 [Qwen3.8-2.4T-A95B 模型卡](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)在 benchmark 表中均出现 IFBench 原名，属于 `vendor-report`。这些卡片证明厂商表格中有该名称，不足以证明其各自严格/宽松口径、数据 revision、thinking budget 等与论文默认实验完全一致；不把表格分数抄作官方 benchmark 成绩。

## 未核实项

- 本轮没有检查每条测试记录和多轮记录的完整 schema、行数、数据 revision 或所有第三方模型输出来源。
- 不同公开模型卡可能省略 strict/loose、temperature、thinking token budget 等设置；未逐个复现厂商结果。
- 各类规则的详细通过语义应查对应 verifier 实现，本文只记录 README 概述，不推断每个规则如何判定。

## 研究结论

**PASS_WITH_LIMITATIONS**：Ai2 README、论文和数据入口可以确认定义、测试部件、典型聚合指标、公开访问及许可限制。项目已有 IFEval，但 IFBench 是独立扩展条目，建议以 `ifbench` 单列并关联 `ifeval`，不共享别名或分数。
