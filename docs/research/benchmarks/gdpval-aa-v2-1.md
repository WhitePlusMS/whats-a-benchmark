# GDPval-AA v2.1

核验日期：2026-09-23。

## 官方身份

GDPval-AA v2.1 是 Artificial Analysis 基于 OpenAI GDPval gold dataset 实施的第三方评测协议。底层 GDPval 由 OpenAI 发布；`AA` 表示 Artificial Analysis 自行运行其 agent harness 并用盲化模型对比生成 Elo。它与 OpenAI 论文中由行业专家评阅的 GDPval 原始实验不是同一套评分结果。[Artificial Analysis leaderboard](https://artificialanalysis.ai/evaluations/gdpval-aa)；[OpenAI GDPval 论文](https://arxiv.org/abs/2510.04374)

## 官方定义与忠实中文概述

底层 GDPval 测试模型能否完成美国 44 种职业、九个主要产业中具有经济价值的专业工作，产出可交付文件，例如文档、幻灯片、图示和电子表格。任务由行业从业者参与设计。[OpenAI GDPval 论文](https://arxiv.org/abs/2510.04374)

GDPval-AA v2.1 在同一题上比较两个模型提交，隐藏模型身份，由评审模型选择相对更好的输出，再将多组盲评映射为 Elo。此指标测量的是 Artificial Analysis 自己的 agent 与 pairwise judge 协议下的相对质量，不能与 OpenAI 原始专家评审中的 win/tie rate 互换。[Artificial Analysis 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)

## 任务输入/输出/环境

- 输入：任务文字提示及配套 reference files；GDPval public gold data 每题含一条 prompt 和支持材料。[OpenAI 数据卡](https://huggingface.co/datasets/openai/gdpval)
- 输出：模型需在 agentic 环境中提交一个或多个实际文件。AA 使用 Stirrup harness、E2B sandbox、网页搜索/抓取、文件图像查看、代码执行、完成与放弃工具。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)
- 评分：同题不同模型输出做匿名盲配对，由三位前沿 judge 中抽样一位进行比较，再以 Crowd-BT 模型最大似然估计拟合 Elo，并估算置信区间。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)

## 数据规模/split/字段/文件

- OpenAI 论文完整 GDPval 记录为 1,320 任务，覆盖 44 个职业、9 个产业；公开 gold subset 为 220 题。[OpenAI 论文](https://arxiv.org/abs/2510.04374)
- `openai/gdpval` Hugging Face dataset card 显示公开 `train` split 共 220 行，字段包含 `task_id`、`sector`、`occupation`、`prompt`、reference files、deliverable files 与 rubric 信息等。[OpenAI dataset card](https://huggingface.co/datasets/openai/gdpval)
- AA 的 v2.1 Intelligence Index 方法表列出 220 tasks、每 task 1 次；同一任务输出的人工/专家参考物料用于内容比较语境，最终模型间 Elo 仍来自 pairwise LLM judging。[AA methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## 访问状态

OpenAI 的 220 题 gold subset 可从 Hugging Face 公开访问；AA leaderboard、方法和部分任务/提交示例公开可浏览。OpenAI 完整 1,320 任务数据不等于 Hugging Face 上 220 题的公开子集，不能将 220 行表述为 full GDPval。[OpenAI 论文](https://arxiv.org/abs/2510.04374)；[OpenAI dataset](https://huggingface.co/datasets/openai/gdpval)；[AA 页面](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 数据/代码/媒体许可与使用边界

- Hugging Face 上游数据卡沒有显示明确的数据 license 标识；OpenAI 论文/发布页称公开 gold subset 为 open-source，但这不等于已核实所有文件、金标准交付物和嵌入第三方材料均适用某一标准再分发许可证。[OpenAI dataset card](https://huggingface.co/datasets/openai/gdpval)；[OpenAI paper](https://arxiv.org/abs/2510.04374)
- 数据卡指出部分内容含 NSFW/政治主题，并包含第三方品牌和商标引用；图像/视频可能包括获准使用的真人或 AI 生成形象，私人人名则为虚构。故不应把公开可下载解释成对所有 prompt、reference file、gold deliverable 或媒体的无条件公开转载许可。[OpenAI dataset card](https://huggingface.co/datasets/openai/gdpval)
- Artificial Analysis 的 [Stirrup 仓库](https://github.com/ArtificialAnalysis/Stirrup) 标注 MIT，许可仅覆盖该 harness 软件，不覆盖 GDPval 题集或AA 的 leaderboard 图表/模型提交。未找到 AA 页面媒体单独许可；本站不复制题面或整份成果文件，采用链接与自述说明。

## 官方样例与是否可在公开 GitHub Pages 转载

AA 页面提供代表任务及模型提交浏览；OpenAI 的 220 行数据也公开可下载。不过本次未核实任务内容、rubric、reference files、human deliverables 与附件具备适用于本站再发布的明确数据许可证；并且存在第三方商标、图像/视频和敏感内容披露。**只链接 AA 示例和 OpenAI 数据卡，不复制任务 prompt、附件、rubric、专家交付物或模型提交。**[AA 示例入口](https://artificialanalysis.ai/evaluations/gdpval-aa)；[OpenAI 数据卡](https://huggingface.co/datasets/openai/gdpval)

## 指标

GDPval-AA v2.1 的主指标是 **Elo**。当前 v2.1 标尺将 DeepSeek V4.1 Flash (max) 固定为 1600，以 Crowd-BT 对盲配对结果拟合；Intelligence Index 中每个模型录入时冻结 Elo，并通过 `(Elo − 500) / 2000` 的 clamp 变换计入指数。排行榜上的 Elo 是相对评分，不是百分比准确率。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)

OpenAI 原始 GDPval 的人类评审结果以任务输出相对专家交付物的胜/平为主；OpenAI 另提供实验自动 grader。两者与 AA 盲配对模型间 Elo 不应混写或直接比较。[OpenAI GDPval 论文](https://arxiv.org/abs/2510.04374)；[OpenAI 发布页](https://openai.com/index/gdpval/)

## 版本关系

`GDPval-AA v2.1` 是 Artificial Analysis 自己版本号：其相较 AA v2 **仅固定了 Elo 标尺**，把 DeepSeek V4.1 Flash (max) 锚定为 1600，并使用 Crowd-BT 模型拟合；它不是 OpenAI “GDPval v2.1”数据集版本。[AA methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)

OpenAI 的任务集版本则通过数据仓库/论文快照识别。若引用 Anthropic 发布报告中的 “GDPval-AA v2.1” 数字，应保持此命名、保留 effort/fallback 配置，并把供应商表述与 AA 当前 live leaderboard 分开记录。[Anthropic Opus 5.5 发布页](https://www.anthropic.com/claude-opus-5-5)；[AA leaderboard](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 官方来源按角色分组

- **底层任务定义、设计与原始专家评审：**[OpenAI GDPval 论文](https://arxiv.org/abs/2510.04374)、[OpenAI 介绍](https://openai.com/index/gdpval/)。
- **gold subset 数据与字段/敏感内容披露：**[OpenAI Hugging Face dataset card](https://huggingface.co/datasets/openai/gdpval)。
- **GDPval-AA v2.1 第三方协议、当前 Elo、AA 版本和 harness：**[Artificial Analysis evaluation 页面](https://artificialanalysis.ai/evaluations/gdpval-aa)、[AA methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)。
- **AA 开源 harness（MIT，不是数据许可）：**[ArtificialAnalysis/Stirrup](https://github.com/ArtificialAnalysis/Stirrup)。
- **模型供应商发布引用：**[Anthropic Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)。

## 模型发布引用

Anthropic 2026-09-22 的 Opus 5.5 发布页将 GDPval-AA v2.1 报为 1846 Elo，并同时说明其模型 effort/fallback。该数字与 Artificial Analysis 当前 leaderboard 所示记录相符，但 benchmark 的评测协议与原始结果归属 Artificial Analysis；Anthropic 文档应标为供应商引用，不写作 Anthropic 自行评测。[Anthropic 发布页](https://www.anthropic.com/claude-opus-5-5)；[AA leaderboard](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 未核实项

- `openai/gdpval` 数据卡未声明可覆盖整份数据和全部媒体的 SPDX license；任何具体题目逐项第三方权利仍未审查。
- AA 每个模型任务 pairing 的实际配对数、评审提示全文、公开 example subset 与在线分数的精确快照不是本文逐项复算对象；当前 leaderboard 会随新增运行变化。
- AA 对部分 Microsoft Office 文件进行兼容性修复；AA 表示只修元数据/关系，不改正文、幻灯片内容和布局。该修复清单及对应文件未在本报告逐一比对。[AA methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking#gdpval-aa)

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 第一方来源定义底层 GDPval 及 220 题 gold subset；Artificial Analysis 第一方来源说明 v2.1 独立 harness、220 题协议及 Elo 锚定。AA 分数不可与 OpenAI 专家 win/tie 指标互换；数据卡没有明确 dataset license，本站只链接官方数据和示例、不转载题目与交付文件。
