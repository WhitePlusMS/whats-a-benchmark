# OfficeQA Pro

核验日期：2026-09-23

## 官方身份

OfficeQA 是 Databricks 发布的 grounded reasoning 基准套件。此条目特指原 Treasury Bulletin 语料上的 **OfficeQA Pro** 子集，不能与 OfficeQA Full 或采用另一语料的 OfficeQA Pro V2 混称。[Databricks 官方仓库](https://github.com/databricks/officeqa)；[OfficeQA Pro 数据卡](https://huggingface.co/datasets/databricks/officeqa)

## 官方定义与忠实中文概述

OfficeQA Pro 衡量模型或代理能否在真实、密集的美国财政部公报中找到并组合财务表格、图表和正文证据，完成端到端文档推理。问题需基于 1939–2025 年 Treasury Bulletin 语料作答；它测试检索、工具使用和多步计算/推理。[官方数据卡](https://huggingface.co/datasets/databricks/officeqa)；[官方仓库](https://github.com/databricks/officeqa)

## 任务输入/输出/环境

- **输入**：问题，以及 697 期 Treasury Bulletin 的 PDF、解析 JSON 或转写文本语料。端到端 agent harness 可提供文件检索、网页搜索、代码执行等能力；不同工具环境属于不同测量设置。
- **输出**：数值、货币或标签/数值类答案；通过官方 `reward.py` 依配置容差判分。
- **参考评估方式**：官方同时列出 agent harness 端到端评测和提供 oracle page(s) 的 LLM+网页搜索评测；二者不可合并报告。[官方仓库与评测说明](https://github.com/databricks/officeqa)；[Pro 数据卡](https://huggingface.co/datasets/databricks/officeqa)

## 数据规模/split/字段/文件

OfficeQA Pro 是 133 道 curated/hard 问题，官方 HF 文件为 `officeqa_pro.csv`（`train` split）；OfficeQA Full 是 246 题，含这 133 道 hard 题及 113 道 easy 题。两者使用同一 697 期、1939–2025 年 Treasury Bulletin 语料。字段为 `uid`、`question`、`answer`、`source_docs`、`source_files`、`difficulty`。数据文件还包括原始 PDF（约 4 GB）、解析 JSON（约 730 MB）和转写 TXT（约 460 MB）。[官方仓库](https://github.com/databricks/officeqa)；[数据卡 schema](https://huggingface.co/datasets/databricks/officeqa)

## 访问状态

**题目与答案集 gated**：Databricks 说明需在 Hugging Face 申请并获准访问，问题 CSV 和真值答案仅向有访问权用户提供；网页浏览代理不能直接看到答案键。仓库及评分代码公开，语料亦在 Hugging Face 数据集仓库，但资料下载同样取决于 HF 访问授权。这里分别区分题目/答案访问和代码公开，不把“仓库可见”当作免审批取用。[官方访问说明](https://github.com/databricks/officeqa#data-access)；[数据卡](https://huggingface.co/datasets/databricks/officeqa)

## 数据/代码/媒体许可与使用边界

Databricks/Hugging Face 为 benchmark dataset 标注 CC BY-SA 4.0，代码和脚本为 Apache-2.0；其仓库另有 `NOTICE` 文件说明政府来源 PDF 及解析文件的逐文件公共领域依据。[官方数据许可说明](https://huggingface.co/datasets/databricks/officeqa#license)；[代码仓库](https://github.com/databricks/officeqa)；[NOTICE](https://github.com/databricks/officeqa/blob/main/NOTICE)。许可证标签与来源材料的权利依据分别看待。数据 gated 且含答案键，本站不转载题目、答案、源文件或文档截图；公开页面只做概述并链接官方入口。

## 官方样例与是否可在公开 GitHub Pages 转载

Pro CSV 包含问题与 ground-truth answer，且需经 HF 授权访问；GitHub 仓库公开 schema、访问流程和评分接口。本站不展示任何真实问题、答案、来源页截图或 PDF 摘录，也不尝试从搜索结果重建答案键。只展示规模、字段名、任务说明和数据卡/仓库链接。[官方访问与 schema 说明](https://github.com/databricks/officeqa#data-access)；[官方数据卡](https://huggingface.co/datasets/databricks/officeqa)

## 指标

官方 `reward.py` 按指定相对误差容差检查数值答案，并支持货币、括号负数、百分比及标签/数值答案。官方报告区分端到端 Agent Harness Performance 与给定 oracle 页的模型评测；比较时还要统一工具、文档解析方式、可搜索语料和容差。[官方评分代码](https://github.com/databricks/officeqa/blob/main/reward.py)；[官方仓库结果定义](https://github.com/databricks/officeqa)

## 版本关系

OfficeQA 套件有三个官方变体：OfficeQA Pro（133 hard、Treasury Bulletins）、OfficeQA Full（246，Pro 的严格超集并含 113 easy）、OfficeQA Pro V2（90 题、全新 1793–2024 年联邦 receipts/expenditures 语料，1,435 份文档）。当前条目只记 OfficeQA Pro；Full 可作同语料训练/分析集，V2 是新语料泛化测试，数据集、答案、分数均需分别标注。[官方仓库变体对照](https://github.com/databricks/officeqa#overview)；[V2 数据卡](https://huggingface.co/datasets/databricks/officeqa-pro-v2)

## 官方来源按角色分组

- **身份、Pro/Full/V2 变体、访问门槛、文件字段、语料规模及运行方式**：[Databricks 官方仓库](https://github.com/databricks/officeqa)。
- **Pro 问题数据、字段及 CC BY-SA 数据许可标签**：[Hugging Face 数据卡](https://huggingface.co/datasets/databricks/officeqa)。
- **评分实现与容差**：[官方 `reward.py`](https://github.com/databricks/officeqa/blob/main/reward.py)。
- **Pro V2 的独立语料及字段**：[V2 数据卡](https://huggingface.co/datasets/databricks/officeqa-pro-v2)。
- **技术报告**：[OfficeQA Technical Report](https://arxiv.org/abs/2603.08655)。

## 模型发布引用

官方报告中的数字包括 Pro agent harness、oracle-page LLM 评测等不同条件。引用必须写出 Pro/Full/V2、运行代理及其工具、语料解析方式、答案容差和报告时间；Pro V2 是不同语料，不应并入 Pro 排名。厂商若只写 OfficeQA 而不指出变体，则应保留为未明确配置的报告，不擅自补齐。[官方结果与变体说明](https://github.com/databricks/officeqa)

## 未核实项

- 当前 CSV gated，本轮未取得许可或读取题目/答案键；未逐条核验题目与答案内容。
- 未下载完整语料，也未按 `NOTICE` 对每份 PDF 和解析文件独立进行哈希及来源检查。
- 未重跑任何官方模型结果；未将不同 agent、oracle-page 设置或答案容差下的结果换算为等价成绩。
- 数据卡、仓库及 HF 授权状态可能更新；本轮未固定 revision。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方资料核实了 OfficeQA Pro 的 133 题、gated 答案集、Schema、语料、指标及与 Full/V2 的区别。题目和答案键须获批后访问；本站公开页面不转载具体题目、答案或媒体，只提供概述及官方链接。
