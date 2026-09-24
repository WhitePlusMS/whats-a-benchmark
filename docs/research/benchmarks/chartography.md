# Chartography

核验日期：2026-09-23。

## 官方身份

Chartography 是 Surge AI evals 团队发布的专业图表理解基准，面向真实工作中阅读图表的视觉推理任务。发布仓库链接到其 Hugging Face 完整数据集。[官方 GitHub](https://github.com/surge-ai/chartography)；[官方数据集](https://huggingface.co/datasets/surgeai/chartography)

## 官方定义与忠实中文概述

每项任务将一张真实图表图像与专家编写的问题、标准答案配对，涉及 STEM（包括工程分支）、金融/投资、制造/供应链和医疗。所用图表包括 Kaplan–Meier 曲线、蜡烛图、等值线图、Sankey 图和 Bode 图等专业形式，要求从图中读取、估算、比较或组合信息。[官方仓库](https://github.com/surge-ai/chartography)

## 任务输入/输出/环境

- 输入包含图表图像和问题，模型输出文本答案；任务 YAML/数据字段包括 `task_id`、`prompt`、`golden_answer`、`chart_path`、`domain_combined`、`source_type`、`source_url`。[官方仓库](https://github.com/surge-ai/chartography)
- 官方评测代码以 Inspect AI harness 运行；发布 README 说明样例 chart pack 只有两个 dry-run 虚构任务，不属于正式数据。正式数据由 `hf_repo=surgeai/chartography` 获取。[官方仓库](https://github.com/surge-ai/chartography)

## 数据规模/split/字段/文件

- 官方集包含 100 个任务。Hugging Face 发布数据集当前显示单一 `test` split、100 行，含图像字段及 `prompt`、`golden_answer`、`task_id`、`domain_combined`、`source_type`、`source_url`。[官方仓库](https://github.com/surge-ai/chartography)；[官方数据集浏览器](https://huggingface.co/datasets/surgeai/chartography)
- 官方仓库还含 `src/chartography/` 评测实现、`task_packs/sample_charts/` 两个非正式 dry-run 样例和离线结构测试。任务图像在正式 HF 数据集中，公开仓库样例不能替代正式集。[官方仓库](https://github.com/surge-ai/chartography)
- 官方说明每个问题由专业读图者编写，配有计算路径，另由三位专家独立核验；标准答案可含按图表可读精度设定的可接受范围。[官方仓库](https://github.com/surge-ai/chartography)

## 访问状态

完整 100 项数据公开托管于 Surge AI 官方 Hugging Face 账户，评测代码公开在其 GitHub 仓库；仓库内两个 sample charts 为演示格式的 dummy tasks，不是该基准的正式题目。[官方 GitHub](https://github.com/surge-ai/chartography)；[官方数据集](https://huggingface.co/datasets/surgeai/chartography)

## 数据/代码/媒体许可与使用边界

- Hugging Face 数据集页面将数据集标示为 CC BY 4.0；可据该数据集标注在署名条件下复用相应数据内容。GitHub 仓库未展示独立 LICENSE 文件，因此不能把数据集许可延伸为代码许可。[官方数据集许可元数据](https://huggingface.co/datasets/surgeai/chartography)；[官方仓库文件清单](https://github.com/surge-ai/chartography)
- 每行保留 `source_type` 和 `source_url`，部分图表来自外部网站、论文或政府文件，部分标记为 expert-created。数据集页面的 CC BY 4.0 标签不能据此证明其中所有第三方图像均由数据集发布者拥有完整再许可权；须按图表逐项回到来源检查权利与使用条款。不能把图像连同 CC BY 4.0 标签整体视为可任意转载。
- 官方还将数据标注 `not-for-training`；这是发布者对数据用途的标记，应与纯评测用途边界一并保留。[官方数据集](https://huggingface.co/datasets/surgeai/chartography)

## 官方样例与是否可在公开 GitHub Pages 转载

官方 HF 浏览器直接展示了含图表、问题、答案与来源字段的测试样例，仓库里的两个 dummy tasks 则是明确不属于正式集的格式演示。公开 Pages 建议只介绍基准并跳转官方页面；不复制正式任务或图像。若未来要展示单张图表，先依据该条 `source_url` 和来源权利逐项核对，并保留作者、来源及许可信息。[官方仓库](https://github.com/surge-ai/chartography)；[官方数据集](https://huggingface.co/datasets/surgeai/chartography)

## 指标

评测器报告 `accuracy/mean`：由一次模型裁判调用判断最终答案是否匹配标准答案的比例；裁判看到问题、标准答案和模型回应，但不看图表。排行榜配置建议每题 10 次运行，并报告 Pass@1、Pass@10 与 10 次全通过率；README 另提供 Inspect 计算 Pass@K / Pass^K 的说明。准确率受裁判模型与任务运行配置影响。[官方仓库评分说明](https://github.com/surge-ai/chartography)

## 版本关系

官方仓库将这一完整集称为 100-task Chartography benchmark；HF 当前文件以单个 `test` split 发布。此次核验未见官方语义版本号或版本变更记录，正式引用应记录 Git commit 与 HF dataset revision，而不要将仓库内 dummy dry-run 样例称作某个正式版本。[官方仓库](https://github.com/surge-ai/chartography)；[官方数据集](https://huggingface.co/datasets/surgeai/chartography)

## 官方来源按角色分组

- 发布方基准介绍、字段、harness 和评分：[surge-ai/chartography](https://github.com/surge-ai/chartography)
- 发布方完整任务集、当前 split 和许可元数据：[surgeai/chartography](https://huggingface.co/datasets/surgeai/chartography)
- 作者论文：[Chartography: A Benchmark for Professional Chart Understanding](https://arxiv.org/abs/2608.10677)
- 发布方模型榜单入口由 GitHub README 指向 Surge AI leaderboard，具体成绩应按该页面配置单独核验。[官方仓库](https://github.com/surge-ai/chartography)

## 模型发布引用

模型厂商发布的 Chartography 成绩仅为该厂商自报结果；须同时注明模型版本、推理设置、重复次数、裁判配置和数据 revision。本记录不引用模型厂商分数。

## 未核实项

- GitHub 仓库未见独立代码许可证；不能仅根据 HF 上的数据集许可证确定评测代码的复用边界。
- 100 张图表的原始来源权利没有逐项审核；每张图像的第三方转载资格均未由本次核验确认。
- 官方仓库所述“在整理时 100 项均至少难倒两种前沿模型之一”及“无前沿模型超过 45%”没有在本文逐一重跑或复核其榜单快照。
- 本次未固定 HF 与 GitHub 的不可变 revision；正式复现实验应保存快照标识。

## 研究结论

**PASS_WITH_LIMITATIONS** — 任务定义、100 项规模、数据字段、裁判指标与公开访问均有发布方材料支持。HF 声明数据集 CC BY 4.0，但原图来源各异；本站目前宜仅作文字介绍和来源链接，不转载正式任务或图表。
