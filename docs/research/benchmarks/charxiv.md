# CharXiv

核验日期：2026-09-23。

## 官方身份

CharXiv 是 Princeton Language and Intelligence 团队与合作者发布的多模态图表理解评测套件，论文发表于 NeurIPS 2024 Datasets & Benchmarks Track。项目网站链接至官方代码、数据及榜单。[项目网站](https://charxiv.github.io/)；[官方 GitHub](https://github.com/princeton-nlp/CharXiv)

## 官方定义与忠实中文概述

CharXiv 使用科学论文中的自然图表，分别评估对图表基本元素的描述性理解，以及综合复杂视觉元素的推理。作者称图表和问题由专家人工筛选、整理和核验，目标是测量多模态大模型在真实科学图表上的理解能力。[官方论文页](https://arxiv.org/abs/2406.18521)；[官方仓库](https://github.com/princeton-nlp/CharXiv)

## 任务输入/输出/环境

- 模型输入为图表图像及问题文本，输出文本回应。仓库生成接口中单条记录含 `question` 和 `figure_path`；评价分 descriptive 与 reasoning 两种模式。[官方仓库](https://github.com/princeton-nlp/CharXiv)
- 可自定义模型生成接口；官方 `evaluate.py` 以 GPT API 调用对模型响应评分，再由 `get_stats.py` 聚合结果。它是静态图像问答评测，没有仿真或交互式工具环境。[官方仓库](https://github.com/princeton-nlp/CharXiv)

## 数据规模/split/字段/文件

- 项目介绍称含 2,323 张科学论文图表。README 的代码库导览称图像目录共有 2,333 张图，标号范围 0–2399 且不连续；两处数量口径不同，本报告不擅自合并或解释。[官方介绍](https://charxiv.github.io/)；[官方仓库数据说明](https://github.com/princeton-nlp/CharXiv)
- `data` 包含问答与图像元数据，描述题、推理题及对应图像信息；仓库采用 `val`、`test` split，模式为 `descriptive`、`reasoning`。test 的答案故意置为 `null` 以避免泄漏。图像包需从官方 Hugging Face 下载。[官方仓库](https://github.com/princeton-nlp/CharXiv)
- Hugging Face 浏览器显示图像与文本模态，Parquet 格式；可见列包括 `image`、`category`、`year`、原始图表路径/标识、`figure_path`、子图数与位置、多个 descriptive 问题/答案字段、`reasoning_q`、问题来源类别、`reasoning_a` 及答案类型。[官方数据集](https://huggingface.co/datasets/princeton-nlp/CharXiv)

## 访问状态

代码与问答数据公开；官方 README 提供下载图像 zip 的 Hugging Face 链接。test 问题及图片公开可用，但 test 答案被设为 null；README 建议内部端到端评测使用 val，不能将测试标签当作公开真值。[官方仓库](https://github.com/princeton-nlp/CharXiv)；[官方数据集](https://huggingface.co/datasets/princeton-nlp/CharXiv)

## 数据/代码/媒体许可与使用边界

- 作者 README 指出原创数据贡献（不含图表）采用 CC BY-SA 4.0，代码采用 Apache 2.0；图表版权属于原作者，出处列于 `image_metadata_val.json` 与 `image_metadata_test.json`。Hugging Face 整体卡片虽显示 CC BY-SA 4.0，仍不能覆盖 README 明确排除在该许可之外的图表。[官方许可说明](https://github.com/princeton-nlp/CharXiv#license)；[官方数据集卡](https://huggingface.co/datasets/princeton-nlp/CharXiv)
- 转载问题文本等原创数据应遵守 CC BY-SA 4.0；转载代码按 Apache 2.0 条件。每张图表的原作者权利单独处理。公开页面不得仅凭数据集卡的总许可重发 chart image；应查看逐图元数据并核查原始论文权利与许可。

## 官方样例与是否可在公开 GitHub Pages 转载

样例入口现直达官方 Hugging Face 数据 Viewer；这只提供官方查看途径，不改变站内转载边界。本站不复刻真实题目或图表图片，公开 test 的答案为空是为避免泄漏。[官方 HF Viewer](https://huggingface.co/datasets/princeton-nlp/CharXiv#dataset-viewer)；[官方仓库](https://github.com/princeton-nlp/CharXiv)

## 指标

官方榜单按 descriptive 与 reasoning 分别报告准确率及子类结果。评测流水线生成模型响应，再由 GPT-4o 对答案评分；作者论文报告其评测数据与人类表现对比，但本记录不把论文发布时模型成绩作为当前榜单值。[官方仓库](https://github.com/princeton-nlp/CharXiv)；[官方项目榜单](https://charxiv.github.io/)

## 版本关系

官方仓库标注当前版本为 v1.0，且在 2024-07-24 发布完整评测流水线。项目论文为 NeurIPS 2024 Datasets & Benchmarks Track。后续榜单更新属于模型结果更新，不代表本次已核实数据集文件改变；重新评测应固定仓库与 HF revision。[官方仓库](https://github.com/princeton-nlp/CharXiv)

## 官方来源按角色分组

- 项目身份、描述及榜单：[CharXiv 项目网站](https://charxiv.github.io/)
- 发布方代码、数据、split、评分流程、版本及许可：[princeton-nlp/CharXiv](https://github.com/princeton-nlp/CharXiv)
- 数据镜像及列/模态/许可元数据：[princeton-nlp/CharXiv on Hugging Face](https://huggingface.co/datasets/princeton-nlp/CharXiv)
- 作者论文：[CharXiv: Charting Gaps in Realistic Chart Understanding in Multimodal LLMs](https://arxiv.org/abs/2406.18521)

## 模型发布引用

模型团队自报的 CharXiv 分数应注明模型具体版本、descriptive/reasoning 模式、评测 split、图像预处理和 GPT-4o 评分配置；不要把论文初始评测或旧榜单成绩说成当前值。本记录未引用模型厂商报告。

## 未核实项

- 官方介绍的 2,323 charts 与仓库导览的 2,333 image files 数字不同；未对当前数据包按唯一 figure ID 重新计数。
- 各图片来源对应的逐图版权、许可与再分发权限未逐项核验；不能把 CharXiv 原创问答许可视为图像许可。
- README 的评测脚本调用 GPT API；本次未对当前代码逐行确认 GPT-4o 评分 prompt、解析逻辑或是否所有榜单条目都用相同 grader revision。
- 数据集页面展示字段和版本不等于固定快照；正式复现时仍须记录不可变 commit/revision。

## 研究结论

**PASS_WITH_LIMITATIONS** — benchmark 定义、v1.0 流程、问答字段和原创数据/代码许可均有官方材料支撑。图表由原作者持有版权，且统计数量有 2,323/2,333 的官方文字差异；GitHub Pages 不转载图表，题目文本也应避免暴露公开 test 内容。
