# LongBench v2

核验日期：2026-09-23

## 官方身份

LongBench v2 是清华大学 THUDM 团队发布的长上下文理解与推理基准，论文题为 *LongBench v2: Towards Deeper Understanding and Reasoning on Realistic Long-context Multitasks*。它是 LongBench 系列的后续版本，和原始 LongBench 的任务集、题型、统计口径应分开记录。[官方仓库](https://github.com/THUDM/LongBench)；[论文](https://arxiv.org/abs/2412.15204)

## 官方定义与忠实中文概述

该基准测量模型在长上下文中进行深入理解与推理的能力，强调真实任务、多选形式与较长材料。官方说明收录单文档问答、多文档问答、长上下文学习、长对话历史理解、代码仓库理解、长结构化数据理解六类任务。[官方仓库](https://github.com/THUDM/LongBench)；[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)

## 任务输入/输出/环境

- **输入**：问题、四个候选选项和所需长上下文。上下文可为文档、书籍、代码仓库等。[官方仓库数据格式](https://github.com/THUDM/LongBench#data-format)
- **输出**：在 A、B、C、D 中选出一个答案。数据格式还包含领域、子领域、难度、长度类别和唯一 ID。[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)
- **环境**：主要是给定上下文的静态问答。作者评测代码可配置直接推理、CoT、无上下文对照及检索增强设置；比较结果时必须标明所用设置和模型上下文窗口。[官方仓库评测说明](https://github.com/THUDM/LongBench)

## 数据规模/split/字段/文件

- 官方发布 503 道多选题；官方描述的上下文长度约 8K 至 2M words，多数低于 128K words。[官方仓库](https://github.com/THUDM/LongBench)；[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)
- Hugging Face 数据卡显示单一 `train` split、503 行；仓库示例以 `load_dataset('THUDM/LongBench-v2', split='train')` 载入。该名称是发布文件的 split 名称，不代表用于模型训练的训练集。[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)
- 核心字段为 `_id`、`domain`、`sub_domain`、`difficulty`、`length`、`question`、`choice_A` 至 `choice_D`、`answer`、`context`。[官方仓库](https://github.com/THUDM/LongBench)

## 访问状态

作者仓库和 Hugging Face 均公开提供数据下载；Hugging Face 当前显示 503 行，数据文件较大。数据可访问不代表每条嵌入上下文都可再次公开转载。[官方仓库](https://github.com/THUDM/LongBench)；[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)

## 数据/代码/媒体许可与使用边界

Hugging Face 数据卡为该发布标注 Apache-2.0；作者 GitHub 仓库根目录也标有 MIT 代码许可。两处声明属于各自发布页面/代码仓库层面的许可信息，不能单独证明书籍、外部文件、代码仓库等每条上下文材料的原始权利均已清理。[官方数据卡许可元数据](https://huggingface.co/datasets/THUDM/LongBench-v2)；[官方 GitHub 代码许可](https://github.com/THUDM/LongBench/blob/main/LICENSE)

作者称题目由近百位受教育背景多样的标注者提出，并经自动和人工审核；数据 schema 的上下文类型包含文档、书籍、代码仓库等。但公开字段说明没有给出可用于完整逐条版权核验的来源清单或授权记录，因此原始材料的转载权利仍需按条目追溯。当前公开页面仅作文字介绍和官方链接，不展示原始上下文、问题、选项、答案或截图。[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)；[官方仓库](https://github.com/THUDM/LongBench)

## 官方样例与是否可在公开 GitHub Pages 转载

官方页面展示了示例入口和统计图，但本卡不复制任何真实上下文、题面、选项或答案。由于数据包含多种来源的长文与代码，而 Apache-2.0 数据卡标签不足以逐条确认这些嵌入材料的许可，**公开 GitHub Pages 只发布不含题文/材料的基准概述、规模及官方链接**；如需转载某条材料，先取得该条原始来源及许可依据。[官方仓库](https://github.com/THUDM/LongBench)；[官方数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)

## 指标

官方主要以选择题准确率报告表现，并提供不同任务与上下文长度切片的统计。论文/仓库中的模型成绩对应各自提示与推理设置；不能把不同 CoT、检索、上下文截断或预算下的分数直接视为同一条件。[官方论文](https://arxiv.org/abs/2412.15204)；[官方仓库](https://github.com/THUDM/LongBench)

## 版本关系

LongBench v2 是相对 LongBench v1 的独立版本升级，官方称其更长、更难，且统一为多选题。引用需标记 v2，不能将 v1 的 4,750 条测试样本或 21 项任务统计移用于 v2。[官方仓库](https://github.com/THUDM/LongBench)

## 官方来源按角色分组

- **定义、规模、任务、字段和运行方式**：[作者官方仓库](https://github.com/THUDM/LongBench)；[作者数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)。
- **研究设计与论文结果**：[LongBench v2 论文](https://arxiv.org/abs/2412.15204)。
- **数据发布许可标签**：[Hugging Face 数据卡](https://huggingface.co/datasets/THUDM/LongBench-v2)；该标签不替代长上下文原始材料的逐项核查。

## 模型发布引用

厂商或实验室公布的 LongBench v2 分数属于其自行选择的模型快照、提示、推理预算及答案解析方案。引用时注明 v2、数据 revision、直接回答/CoT/RAG、上下文截断和评分规则；官方排行榜是动态页面，应另存带日期快照。[官方排行榜入口](https://longbench2.github.io/)

## 未核实项

- 当前公开 schema 未提供足以逐条追溯上下文来源和权利的完整 manifest；上下文材料的公开转载许可尚未逐条确认。
- 本轮未对 503 条记录逐条检查内容来源、权利人、引用/授权信息及文件哈希。
- 未冻结数据仓库 revision；Hugging Face 发布页面及排行榜可能继续更新。

## 研究结论

**PASS_WITH_LIMITATIONS**：作者、任务、503 题规模、六类任务、split 和字段均有第一方资料支持；Hugging Face 标注 Apache-2.0，仓库代码许可为 MIT。长文、书籍和代码上下文的逐条来源授权没有由上述声明自动解决，公开页面应只介绍基准并链接官方来源，不转载真实数据或媒体。
