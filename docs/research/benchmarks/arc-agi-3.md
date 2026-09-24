# ARC-AGI-3

核验日期：2026-09-23。

## 官方身份

ARC Prize Foundation 发布的交互式推理 benchmark，面向需主动探索、发现目标、形成环境模型并逐步调整策略的 agent。[官方 benchmark 页面](https://arcprize.org/arc-agi/3#what-is-arc-agi-3)

## 官方定义与忠实中文概述

与给定输入后直接产出答案的静态任务不同，agent 在没有自然语言指令的回合制环境中观察网格、执行动作、接收状态反馈，再通过经验推断规则和目标并完成关卡。官方设计目标是衡量探索、建模、目标发现、规划执行和学习效率。[官方页面](https://arcprize.org/arc-agi/3#how-it-measures-intelligence)；[技术报告](https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf#page=1)

## 任务输入/输出/环境

- 输入是交互式游戏环境的观察帧和可用动作；提交动作后环境返回一帧或多帧以及游戏状态元数据，游戏 ID 含名称和版本。[官方 Game Schema](https://github.com/arcprize/docs/blob/main/game-schema.mdx#L1-L38)
- 状态包含 `NOT_PLAYED`、`NOT_FINISHED`、`WIN`、`GAME_OVER`；格子最大 64×64、值为 0–15；动作集合由游戏明示且因游戏不同而异。[官方 Game Schema](https://github.com/arcprize/docs/blob/main/game-schema.mdx#L1-L38)
- agent 通过 ARC Toolkit 或在线 API 与环境交互；官方 starter agent 展示本地运行和按 game 运行的入口。[官方 Agents repo](https://github.com/arcprize/ARC-AGI-3-Agents#quickstart)；[ARC-AGI Toolkit](https://github.com/arcprize/ARC-AGI)

## 数据规模/split/字段/文件

- ARC Prize Technical Report 的数据集表列出：Public Demo 25 个环境、Semi-Private 55 个、Fully Private 55 个，共 135 个环境；两类 holdout 均非公开，其中 fully-private 仅提供给非常有限的合作方。[官方技术报告，第 3 节/Table 1](https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf#page=6)
- `FrameData` 字段名随 Toolkit 版本变化：0.9.3 changelog 将 `score` 改为 `levels_completed`、`win_score` 改为 `win_levels`；数据记录/字段需绑定工具版本。[官方 Agents repo changelog](https://github.com/arcprize/ARC-AGI-3-Agents#changelog)
- 本核验未打开或下载任何半私有/私有环境文件。公开 demo 游戏集可从官方页面/API 游玩，但完整文件清单与逐环境文件字段未按文件逐项盘点。[官方 benchmark 页面](https://arcprize.org/arc-agi/3#links)

## 访问状态

官方页面提供 Public Game Set、Play Humans、Docs + SDK、Leaderboard 等入口；开发者需在官方站点获取 API key。半私有、私有集合不是公开下载数据。[官方 ARC-AGI-3 页面](https://arcprize.org/arc-agi/3#links)；[Agents repo](https://github.com/arcprize/ARC-AGI-3-Agents#quickstart)

## 数据/代码/媒体许可与使用边界

- `ARC-AGI-3-Agents` 工具/agent 仓库标 MIT；此许可针对代码仓库，不能自动推及游戏环境数据、API replay、截图或网站媒体。[官方 Agents repo license](https://github.com/arcprize/ARC-AGI-3-Agents#license)
- 本次访问的官方 benchmark、Game Schema、技术报告未找到可明确覆盖全部游戏题面/状态轨迹/截图的独立开放数据许可证。公开可玩不等于可复制再发布；GitHub Pages 只能链接官方游戏/SDK，并展示自行撰写的高层描述。未取得明确数据/媒体许可前不复制游戏帧、关卡资产、replay、截图、hidden set 内容。[官方 benchmark 页面](https://arcprize.org/arc-agi/3#links)；[官方 Game Schema](https://github.com/arcprize/docs/blob/main/game-schema.mdx#L1-L38)

## 官方样例与是否可在公开 GitHub Pages 转载

可链接官方 Public Game Set、游戏试玩页和 SDK 文档。未确认公开 demo 的题面/帧/replay 的再发布许可，因此不把真实环境截图或状态记录下载并内嵌 GitHub Pages。官方技术报告演示图只引用报告链接，不另行复制媒体。[官方页面](https://arcprize.org/arc-agi/3#links)；[报告数据集划分](https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf#page=6)

## 指标

- RHAE（Relative Human Action Efficiency）以每关动作数相对人类基线效率评分，对每关单独计算、按环境归一化后跨环境汇总；技术报告以动作效率的平方比率刻画效率，单关分值范围 0–115%，总分为环境平均、范围 0–100%。[官方技术报告评分章节](https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf#page=12)
- 官方 2026 年后续评分更新将基线从每关第二名人类调整为中位人类，并把单关上限从 100% 提至 115%；引用技术报告旧稿公式时需同步注明这一已发布修订。[官方评分更新](https://arcprize.org/blog/arc-agi-3-human-dataset#arc-agi-3-scoring-updates)

## 版本关系

ARC-AGI-3 是 ARC-AGI-1/2 静态任务之后的交互式系列新成员。早期 ARC-AGI-3 Preview/Developer Preview 与当前 ARC-AGI-3 竞赛/benchmark 应分开；Toolkit 的 API 和字段也持续版本化。[官方发布说明](https://arcprize.org/blog/arc-agi-3-launch)；[官方 Agents changelog](https://github.com/arcprize/ARC-AGI-3-Agents#changelog)

## 官方来源按角色分组

- 发布方 benchmark 页面： [ARC-AGI-3](https://arcprize.org/arc-agi/3)
- 官方技术报告： [ARC-AGI-3 Technical Report](https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf)
- Toolkit/运行代码： [ARC-AGI Toolkit](https://github.com/arcprize/ARC-AGI)
- starter agent： [ARC-AGI-3-Agents](https://github.com/arcprize/ARC-AGI-3-Agents)
- API/schema 文档： [Game Schema](https://github.com/arcprize/docs/blob/main/game-schema.mdx)
- 评分修订： [Measuring Human Performance on ARC-AGI-3](https://arcprize.org/blog/arc-agi-3-human-dataset)
- 榜单： [ARC Prize Leaderboard](https://arcprize.org/leaderboard)

## 模型发布引用

模型厂商报告可作为其提交配置与成绩的二级引用，不替代 ARC Prize 对 harness、半私有测试或正式榜单条目的说明。此研究条目未收录厂商成绩。

## 未核实项

- 未核对当前 API 每个游戏的最新版本 ID、全部可用动作和访问配额；游戏版本可能更新，需按官方 schema 的 game ID 版本号记录。
- 未确认 Public Demo 全量环境素材、人体测试图表、replay 轨迹在静态网站上的再分发权。
- 官方页面对当前版本规模并未以一个易检索的单页清单呈现；135 环境数据此引用 Technical Report 中的 25+55+55 划分，未推断页面其它动态目录数量。

## 研究结论

**PASS_WITH_LIMITATIONS** — benchmark 设计、互动 schema、官方技术报告规模和评分均有第一方证据。工具代码 MIT 不构成数据素材许可；公开页面建议只做文字概述与来源跳转，不转载真实游戏记录/媒体。
