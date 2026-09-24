# Chatbot Arena

核验日期：2026-09-23。这里将 Chatbot Arena 视为持续运行的众包评测平台；公开数据发布是有限、带快照的数据产品，不等于全量榜单数据。

## 官方身份

Arena（原 LMSYS / Chatbot Arena）维护的开放式 LLM 人类偏好评测平台。匿名随机模型对战由用户提问并投票；官方榜单反映成对偏好统计，而非固定题库上的客观正确率。[原始官方介绍](https://arena.ai/blog/arena#introduction)；[当前 FAQ](https://arena.ai/faq#battle-mode)

## 官方定义与忠实中文概述

在 Battle Mode 中，用户向两个匿名模型发送问题，查看回答并选出更喜欢的一方；完成投票后才显示模型身份。仅匿名状态下的投票进入官方排名。由大量成对人类选择形成社区偏好榜单。[当前 FAQ](https://arena.ai/faq#battle-mode)；[官方方法说明](https://arena.ai/blog/arena#data-collection)

## 任务输入/输出/环境

- 输入由真实用户在 Arena 中自选的 prompt（可多轮）；两模型回答同一对话，再由用户选择偏好，或判平。[官方原始方法说明](https://arena.ai/blog/arena#data-collection)
- 评测平台持續增加模型和投票，不是静态封闭测试集；排名依赖参与用户、采样策略、参赛模型池与时间快照。[官方政策](https://arena.ai/blog/policy#sampling-policy)
- `Side by Side` 是可见模型身份的对比模式，投票不纳入公开排名；`Direct Mode` 无投票；两者 prompt 会按平台 FAQ 收集用于研究。[当前 FAQ](https://arena.ai/faq#side-by-side-mode)

## 数据规模/split/字段/文件

- 平台整体持续增长，公开提供的是部分匿名投票数据；FAQ 明确不发布完整对话日志，公开数据可含 prompt text、投票结果、模型配对。[当前 FAQ](https://arena.ai/faq#supporting--contributing)
- 一个公开历史快照 `lmsys/chatbot_arena_conversations` 为 33,000 条 2023-04 至 2023-06 的 cleaned conversations；含 20 models、13,383 users、96 languages，平均 1.2 回合/样本。字段包括 question id、model names、完整对话、vote、匿名 user id、语言/moderation/toxic tags 与 timestamp。[官方 HF 数据卡](https://huggingface.co/datasets/lmsys/chatbot_arena_conversations#chatbot-arena-conversations-dataset)
- 另一个后续 HF 快照 `lmarena-ai/arena-human-preference-55k` 页面显示单个 `train` split、57.5k rows；字段包括 `id`、`model_a`、`model_b`、`prompt`、`response_a`、`response_b`、`winner_model_a`、`winner_model_b`、`winner_tie`。[官方 HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k#dataset-viewer)
- 上述 33K 和 57.5K 是不同命名与快照，不能描述成当前平台总数据规模或当作同一个 split。[官方 33K 发布说明](https://arena.ai/blog/dataset#dataset-1-33k-chatbot-arena-conversation-data)；[57.5k HF snapshot](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k#L83-L90)

## 访问状态

- 榜单和 Battle Mode 可在线浏览与参与；官方只定期分享平台部分数据，而不发布完整对话日志。[官方 FAQ](https://arena.ai/faq#supporting--contributing)；[Leaderboard Policy](https://arena.ai/blog/policy#sharing-data)。本条数据访问入口直达已公开的 57.5K 历史快照；它不代表平台完整或实时数据。[lmarena-ai/arena-human-preference-55k](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k)
- 33K HF 数据卡要求用户登录并同意其数据使用条件；页面标许可证字段 `cc`（非明确版本/具体 CC 子许可），并含不尝试确定数据中个体身份的要求。[HF 数据卡](https://huggingface.co/datasets/lmsys/chatbot_arena_conversations#L70-L85)
- `arena-human-preference-55k` HF 页面标注 Apache-2.0。[HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k#L74-L90)

## 数据/代码/媒体许可与使用边界

- Chatbot Arena 是平台/评测，不存在一个统一题库许可证。公开数据许可须按具体发布与快照分别识别，不能由当前平台开放投票推导。
- 33K HF 快照的 license 元数据 `cc` 未指定具体 CC 版本；页面同时要求同意条件、不得尝试识别数据个体，并警告内容可能 unsafe/offensive。数据发布说明建议适当过滤，遵守适用法律以及模型输出对应条款。[HF 数据卡](https://huggingface.co/datasets/lmsys/chatbot_arena_conversations#L70-L85)；[官方发布说明](https://arena.ai/blog/dataset#disclaimers-and-terms)
- `arena-human-preference-55k` 页面显示 Apache-2.0，但其样本含用户 prompts、完整模型回答；转载具体记录会扩大公开暴露。需按该数据卡的具体 license 文本、模型条款和隐私约束逐项核实。当前只把字段层级用于描述，不复制用户对话或模型回答。[HF 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k#L74-L90)；[Arena FAQ privacy/data](https://arena.ai/faq#transparency--privacy)
- Arena 官方称公开或提供给模型供应方的数据经去标识/移除个人与敏感数据工具处理；这并不等于保证零隐私风险，原始 33K 页面也明确说明保留 unsafe 内容。[官方政策](https://arena.ai/blog/policy#sharing-data)；[33K HF 卡](https://huggingface.co/datasets/lmsys/chatbot_arena_conversations#chatbot-arena-conversations-dataset)
- 平台代码仓库的代码许可不覆盖人类用户文本、模型输出、Logo 或网页截图；本报告没有将代码许可证用于推断数据权利。

## 官方样例与是否可在公开 GitHub Pages 转载

不转载真实用户 prompt、对话、回复、投票记录或头像/媒体。样例入口直达官方 57.5K HF Viewer，但该链接只供查看上游数据，不代表本站取得转载权；公开前仍须逐记录核对隐私、安全和适用许可。官方 FAQ 说明完整对话日志不公开。[57.5K HF Viewer](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k#dataset-viewer)；[当前 FAQ](https://arena.ai/faq#supporting--contributing)

## 指标

- 当前平台使用 Bradley–Terry rating 从成对投票估计模型偏好，并支持 style control 等额外因素；与 Elo 类似但不是固定静态题的准确率。[当前 FAQ](https://arena.ai/faq#battle-mode)
- 早期 2023 发布展示基于 Elo 的初始榜单；官方当时只公开投票结果而不公开对话历史。当前官方 FAQ 的 Bradley–Terry 方法应优先于早期 Elo 描述。[早期文章](https://arena.ai/blog/arena#elo-rating-system)；[当前 FAQ](https://arena.ai/faq#battle-mode)
- 榜单公开资格、至少约 1,000 票/评分稳定要求和抽样重加权会影响分数解释，引用某一排名需记录日期、榜单类别和模型是否 preliminary。[Leaderboard Policy](https://arena.ai/blog/policy#evaluating-publicly-released-models)；[抽样规则](https://arena.ai/blog/policy#sampling-policy)

## 版本关系

平台持续更新、模型池和方法变化；2023 首发论文/数据快照不是当前 leaderboard 的固定版本。当前 `arena-human-preference-55k` 与 33K 历史数据集是不同独立快照，应分开展示、说明日期及各自许可。[2023 首发文章](https://arena.ai/blog/arena)；[33K 数据发布](https://arena.ai/blog/dataset)；[57.5K 数据卡](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k)

## 官方来源按角色分组

- benchmark 平台/方法： [Chatbot Arena](https://arena.ai/blog/arena)
- 当前规则、隐私和数据公开范围： [Arena FAQ](https://arena.ai/faq)
- 榜单准入、抽样、发布策略： [Leaderboard Policy](https://arena.ai/blog/policy)
- 历史数据 release： [33K Conversations Dataset Release](https://arena.ai/blog/dataset)
- 数据快照： [lmsys/chatbot_arena_conversations](https://huggingface.co/datasets/lmsys/chatbot_arena_conversations)；[lmarena-ai/arena-human-preference-55k](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k)
- 学术论文： [Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference](https://arxiv.org/abs/2403.04132)
- 当前榜单： [Arena Leaderboard](https://arena.ai/leaderboard)

## 模型发布引用

厂商报告中的 Arena 排名应记录为厂商引用的具体榜单类别、采集时间及版本；Arena 是众包动态榜单，厂商报告不是该排名的原始规则或数据来源。报告不写实时排名或模型分数。

## 未核实项

- 本轮未逐条复核两个 HF 快照的 license 文件正文、隐私筛除实现或所有模型输出的上游服务条款；对 33K 的 `cc` 字段不猜测具体 Creative Commons 版本。
- 当前榜单具体评分统计模型的公式、类别筛选、实时置信区间与发布日期须针对具体榜单页及 methodology paper 继续核查，本文仅写 FAQ 确认的 Bradley–Terry 方法。
- 当前累计总对话、投票数会随平台变化，本报告避免将新闻稿某时点数字表述为当前总量。

## 研究结论

**PASS_WITH_LIMITATIONS** — 平台定义、匿名投票机制、当前 Bradley–Terry 指标、有限数据公开边界和具体历史快照均已找到第一方来源；因数据条款、个人信息和模型输出使用边界不同，不建议在公开 GitHub Pages 转载真实记录。
