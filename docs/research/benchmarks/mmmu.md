# MMMU

核验日期：2026-09-23

## 官方身份

MMMU（Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI）由 MMMU 研究团队发布，论文发表于 CVPR 2024。官方项目仓库和数据卡提供评测代码、题目数据与榜单入口。[作者仓库](https://github.com/MMMU-Benchmark/MMMU)；[论文](https://arxiv.org/abs/2311.16502)

## 官方定义与忠实中文概述

MMMU 收录来自大学考试、测验和教材的多模态问题，考查模型结合大学层次学科知识，对题目和图像进行感知与推理的能力。范围覆盖六大领域、30 个学科和 183 个子领域，视觉材料类型包括图表、示意图、地图、表格、乐谱和化学结构等。[作者仓库介绍](https://github.com/MMMU-Benchmark/MMMU#introduction)

## 任务输入/输出/环境

- **输入**：英文专业问题、候选选项和零个或多个图像字段；图片可能是解题所必需的信息。公开字段 `question`、`options`、`image_1` 至 `image_7` 等对应图文样本结构。
- **输出**：选择题答案；在官方评测中对模型回答进行答案解析并判断正确与否。
- **环境**：静态多学科视觉问答；模型视觉输入处理和提示方式应与报告一起记录。[作者数据卡](https://huggingface.co/datasets/MMMU/MMMU)；[作者评测说明](https://github.com/MMMU-Benchmark/MMMU)

## 数据规模/split/字段/文件

作者报告总计约 11.5K 道题，30 个学科子集。官方仓库说明 150 条 development、900 条 validation、10,500 条 test；test 答案最初由官方评测服务保留。当前 Hugging Face Viewer 提供 3 个 split，并能查看开发/验证记录；schema 包含 `id`、`question`、`options`、`explanation`、`image_1` 至 `image_7`、`img_type`、`answer`、`topic_difficulty`、`question_type`、`subfield`。[作者仓库评测说明](https://github.com/MMMU-Benchmark/MMMU#evaluation)；[官方数据卡](https://huggingface.co/datasets/MMMU/MMMU)

## 访问状态

作者 GitHub 和 Hugging Face 数据集公开。数据卡当前列出 30 个子集和 3 个 split；仓库记录显示 2026-02 已发布 test set 答案，使本地评分成为可能。这个发布状态与论文初版“答案保留、通过 EvalAI 提交”的时期不同，应以当前数据 revision 为准。[作者仓库新闻与评测说明](https://github.com/MMMU-Benchmark/MMMU#news)；[数据卡](https://huggingface.co/datasets/MMMU/MMMU)

## 数据/代码/媒体许可与使用边界

Hugging Face 数据卡标注 Apache-2.0；代码仓库 LICENSE 独立适用于仓库中相应代码。作者声明采集阶段要求遵守原始网站的版权与许可规则，避免使用禁止复制和再分发的材料，也欢迎报告潜在违规样本。[数据卡许可](https://huggingface.co/datasets/MMMU/MMMU)；[作者版权说明](https://github.com/MMMU-Benchmark/MMMU#disclaimers)；[代码 LICENSE](https://github.com/MMMU-Benchmark/MMMU/blob/main/LICENSE)。这些声明未为每一道题、解释和图片列出逐项来源许可，故不能仅凭 Apache-2.0 标签得出全部内嵌媒体均可公开转载。

## 官方样例与是否可在公开 GitHub Pages 转载

官方 Viewer 可浏览实际问题、答案、解释和图片，但未在每条记录旁提供完整的逐条权利清单。本站只发布结构性描述和官方入口，不复制真实题面、候选项、答案、解释或图片；具体转载应先核对对应上游来源和媒体许可。[官方数据卡](https://huggingface.co/datasets/MMMU/MMMU)；[作者版权说明](https://github.com/MMMU-Benchmark/MMMU#disclaimers)

## 指标

主要指标为选择题准确率，按答对题目数与评测题目数计算。总体成绩受领域分布、题目子集、视觉输入、提示、答案解析和是否使用工具影响；报告应标出 split 或榜单设置。[作者论文](https://arxiv.org/abs/2311.16502)；[官方仓库](https://github.com/MMMU-Benchmark/MMMU)

## 版本关系

本条指原始 MMMU 数据与评测。MMMU-Pro 是后续衍生版本，作者通过过滤文本可答问题、增加选项及加入 vision-only 模式提高难度；其题目、配置和分数不能并入原版 MMMU。[官方仓库](https://github.com/MMMU-Benchmark/MMMU#introduction)；[MMMU-Pro 论文](https://arxiv.org/abs/2409.02813)

## 官方来源按角色分组

- **定义、规模、split 和评测**：[MMMU 作者仓库](https://github.com/MMMU-Benchmark/MMMU)。
- **论文**：[CVPR 2024 论文](https://arxiv.org/abs/2311.16502)。
- **数据、字段与数据许可标签**：[官方 Hugging Face 数据卡](https://huggingface.co/datasets/MMMU/MMMU)。
- **版权边界**：[作者版权与数据收集说明](https://github.com/MMMU-Benchmark/MMMU#disclaimers)。

## 模型发布引用

模型发布材料中的 MMMU 数字须区分官方 test、validation 或其他子集，并说明视觉处理、提示、答案解析和工具配置。不要把 MMMU-Pro、MMMU 的成绩或不同 split 的成绩互换。

## 未核实项

- 未逐题核对题目和媒体的原始出处、许可文本及权利状态；test 答案虽公开，也不代表媒体可不受限制地转载。
- 未复跑基准或校准第三方/厂商分数。
- Hugging Face 仓库可能持续更新；本轮未固定 revision 或逐文件哈希。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方身份、任务、总规模、split 和字段有作者仓库及数据卡支持；数据卡标注 Apache-2.0，作者也发布了采集版权要求。由于没有逐条媒体权利清单，本站限于介绍基准和链接官方资源，不转载题目及图片。
