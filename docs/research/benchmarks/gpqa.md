# GPQA

核验日期：2026-09-23

## 官方身份

GPQA（Graduate-Level Google-Proof Q&A）是 Rein 等作者提出的研究型科学问答数据集/benchmark，包含领域专家编写的生物、物理、化学多项选择题。它用于研究模型和人工验证者应对高难度科学问题的表现；数据集本身不是某一家模型厂商的成绩榜。[GPQA 论文](https://arxiv.org/abs/2311.12022)；[作者官方仓库](https://github.com/idavidrein/gpqa)

## 官方定义与忠实中文概述

原论文报告 GPQA 包含 448 道多项选择问题，由生物、物理、化学领域专家撰写与验证。作者将题目设计为非本领域高技能验证者即使可上网、平均花费 30 分钟以上仍难回答的问题；“Google-Proof”是设计目标和论文描述，不代表所有搜索系统或模型运行均无法查到答案。[GPQA 论文](https://arxiv.org/abs/2311.12022)

## 任务输入/输出/环境

- **输入**：英文科学问题及四个选项，问题属于生物、物理或化学。[作者数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)
- **输出**：从选项中选择正确答案。实现可要求模型直接输出选项字母，或生成解释后由解析器提取；评测细节以运行协议为准。
- **环境**：可采用 closed-book 或联网检索方案。作者基线仓库提供 zero-shot、few-shot、chain-of-thought 及 retrieval 等提示/运行方式；是否给模型网络访问会改变任务条件。[作者官方仓库](https://github.com/idavidrein/gpqa)

## 数据规模/split/字段/文件

- GPQA 主集为 448 题；数据卡还提供 `gpqa_extended`（546 题）、`gpqa_diamond`（198 题）和 `gpqa_experts` 配置。这里的总集、Main 和 Diamond 是嵌套/筛选关系，不可将其当成互不相交集合相加。[官方数据卡配置](https://huggingface.co/datasets/Idavidrein/gpqa)
- 作者仓库包含 dataset 压缩包和基线脚本；HF 卡以 CSV 配置各 split。当前可见卡片列出 split 名，但复现时应固定具体仓库 revision，而非只记 `main` 分支名。[作者仓库](https://github.com/idavidrein/gpqa)；[HF 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)
- Diamond 是 198 题的严格子集，单独建条目详述；此页的 GPQA 主体身份与整体 split 关系不替代该子集说明。[GPQA Diamond 条目](gpqa-diamond.md)

## 访问状态

作者 GitHub 提供评测代码，并指向数据下载；README 中 `dataset.zip` 需密码，仓库同时指向 Hugging Face。HF dataset 受控访问，用户须接受页面条件后访问，故应区分“来源与文件存在”与“匿名直下”。[作者仓库 README](https://github.com/idavidrein/gpqa)；[HF GPQA 页面](https://huggingface.co/datasets/Idavidrein/gpqa)

## 数据/代码/媒体许可与使用边界

作者 Hugging Face 数据卡声明数据采用 CC BY 4.0，同时将数据集访问设为 gated，并要求访问者不得在线以纯文本或图片披露数据集样例，以减少题目泄漏进基础模型训练语料。仓库的 MIT LICENSE 针对仓库软件/代码，不应用来覆盖题目数据。公开网站因此应遵守作者的数据卡披露条件，不复制题目或答案。[HF 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)；[仓库 MIT LICENSE](https://github.com/idavidrein/gpqa/blob/main/LICENSE)

## 官方样例与是否可在公开 GitHub Pages 转载

GPQA 数据卡将不得在线发布样例文字或图片作为明确请求，并非仅因题目具有公开下载地址就可忽略。[官方 HF 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa) **结论：GitHub Pages 不展示原题、选项、正确答案或截图；只提供不泄漏内容的领域、题型、规模说明和来源链接。**

## 指标

常用成绩为准确率；但官方基线仓库指出实验设置包括多种提示模式、closed-book/retrieval 设置以及选项顺序 shuffle 等选择。报告成绩必须连带说明模型快照、提示、是否联网、采样和答案解析；名称相同不能保证协议一致。[官方基线仓库](https://github.com/idavidrein/gpqa)

## 版本关系

GPQA 数据卡分别提供 Extended、Main、Diamond 与 Experts 配置；这几个名字描述数据集内不同范围，不应把 Diamond 或 Main 的结果标作全部 GPQA 的结果。引用结果须记录 split 和 dataset revision；后来者自行纠错或过滤所得变体须单独标注为派生集。[官方 HF 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)

## 官方来源按角色分组

- **原始任务与研究定义**：[GPQA 论文](https://arxiv.org/abs/2311.12022)。
- **数据访问条件、split、CC BY 4.0 与不披露样例请求**：[作者 Hugging Face 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)。
- **代码、baseline 配置和下载说明**：[作者官方 GitHub 仓库](https://github.com/idavidrein/gpqa)。

## 模型发布引用

各模型发布页上标作 GPQA 的结果属于发布方所选模型配置和评测协议；不应直接横比，除非 split、检索权限、提示模板、推理预算、答案抽取规则及重复次数相同。模型厂商分数仅是使用 benchmark 的报告，不是 GPQA 作者出具的评测认证。

## 未核实项

- HF 文件精确版本、hash 与每个 split 的字段 schema 未固定到 commit 核验。
- 各模型厂商报告的运行协议与答案解析器尚未逐条比对。
- 公开数据卡的许可声明和 no-online-examples 条件应一并遵循；本条目不将许可范围扩张解释到所有引用材料或第三方依赖。

## 研究结论

**PASS_WITH_LIMITATIONS**：作者一手来源确认 GPQA 的科学问答性质、448 题 Main 与相关 split、基线运行方式和数据访问条件。公开展示的核心约束是不得在线发布题目样例文字或图片；站点只链接并概述，不复刻题目内容。
