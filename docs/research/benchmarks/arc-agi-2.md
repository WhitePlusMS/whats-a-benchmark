# ARC-AGI-2

核验日期：2026-09-23。

## 官方身份

ARC Prize Foundation 发布的 Abstraction and Reasoning Corpus 第二代，面向抽象、组合和上下文规则推理的静态网格任务；官方仓库提供公开 task 数据。[官方介绍](https://arcprize.org/arc-agi/2#dataset-structure)；[官方 GitHub](https://github.com/arcprize/ARC-AGI-2#dataset-composition)

## 官方定义与忠实中文概述

任务要求从少量输入/输出示范中归纳规则，然后对测试输入生成匹配的输出网格；设计目标包括测试模型能否将符号解释为含义、组合多条规则以及根据上下文改变规则应用方式。[官方 ARC-AGI-2 介绍](https://arcprize.org/arc-agi/2#capability-test)

## 任务输入/输出/环境

- 静态任务由 `train` 示范输入/输出对和 `test` 输入/待预测输出组成；网格为整数 0–9 构成的矩形二维数组。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#task-file-format)
- 评测要求精确还原输出网格的尺寸、颜色和位置。公开 evaluation 使用 2 次尝试规则；输出形状和所有格值均须正确。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#task-success-criterion)；[官方 guide](https://arcprize.org/guide/1#test)
- 官方代码仓库说明 task viewer 可由 JSON 文件加载；这里没有需要启动的模拟器或 agent 工具环境。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#usage-of-the-testing-interface)

## 数据规模/split/字段/文件

- 仓库包含 1,000 个 public training tasks 与 120 个 public evaluation tasks。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#dataset-composition)
- 官方另定义 semi-private 与 fully-private evaluation，各 120 项且不在该公开仓库；前者用于远程商用模型及公开榜单，后者用于竞赛最终评测。[官方介绍](https://arcprize.org/arc-agi/2#dataset-structure)
- 仓库文件位于 `data/training/` 和 `data/evaluation/`，每个 JSON 有 `train` 与 `test` 数组，数组记录为 `input` / `output` 的 grid pair；仓库文档对 test split 的描述与交互说明有“允许 2 次”/另一段“3 trials”文字不一致，应以官方 task-success criterion 中统一 2 次规则为准并在有争议的场景复核原始版本。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#task-file-format)
- 训练数据混合 ARC-AGI-1 数据与新题。Evaluation 禁止泄漏到开发算法。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#task-file-format)

## 访问状态

公开训练及 evaluation JSON 可从 ARC Prize Foundation 官方 GitHub 仓库浏览和下载；semi-private、private 不在仓库提供。[官方 GitHub](https://github.com/arcprize/ARC-AGI-2#dataset-composition)

## 数据/代码/媒体许可与使用边界

- 官方数据仓库标注 Apache-2.0；其许可证可作为公开 task 文件复用依据，但再分发时须遵守仓库 LICENSE 的条件。[官方仓库许可证标注](https://github.com/arcprize/ARC-AGI-2#license)
- ARC Prize Toolkit 是另一个仓库，独立标注 MIT；不能用 toolkit 的 MIT 许可证替代 ARC-AGI-2 数据仓库的 Apache-2.0。[Toolkit README](https://github.com/arcprize/ARC-AGI#license)
- 可转载经核对的公开训练样例并带 Apache-2.0 许可证、来源和版本；不建议将公开 evaluation 题作为产品样例发布或反复暴露，因为官方明确要求避免泄漏 evaluation 信息。半私密/私有集合不可转载。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#task-file-format)；[官方仓库 LICENSE](https://github.com/arcprize/ARC-AGI-2/blob/main/LICENSE)
- 数据为整数网格，无需复制外部图片/媒体；官方页面的图像/示意图另有权利状态未核，公开页面应链接而不下载转载。[官方介绍](https://arcprize.org/arc-agi/2)

## 官方样例与是否可在公开 GitHub Pages 转载

候选仅限 `data/training/*.json` 中的公开训练任务，保留 task 文件来源和许可证标识；不挑用 evaluation、semi-private 或 private 样例。理由是 repo 已公开且标注 Apache-2.0，同时官方将 evaluation 泄漏作为公平性风险。[官方 repo](https://github.com/arcprize/ARC-AGI-2#dataset-composition)；[泄漏说明](https://github.com/arcprize/ARC-AGI-2#task-file-format)

## 指标

- 每项任务在首次见到时须为每个测试输入给出预测；任一允许尝试的结果完整匹配全部测试输入输出，任务计为解决。官方公开说明每个 test input 允许 2 次尝试。[官方 GitHub README](https://github.com/arcprize/ARC-AGI-2#task-success-criterion)
- ARC-AGI-2 同时强调效率/成本；官方介绍将能力和效率视为不同衡量维度。比赛评分另受 Kaggle 竞赛规则约束，不应把像素正确率替代官方 exact task accuracy。[官方介绍](https://arcprize.org/arc-agi/2#efficiency-measurement)；[官方 guide](https://arcprize.org/guide/1#test)

## 版本关系

ARC-AGI-2 采用 2025 新版本静态任务格式，承接 ARC-AGI-1（2020–2024）数据格式；版本更新增设不同难度校准的评测集合，移除易被暴力搜索解出的旧任务，并新增挑战符号解释、组合推理与上下文规则应用的任务。[官方 ARC-AGI-2 changelog](https://arcprize.org/arc-agi/2#changelog)；[官方 2026 competition page](https://arcprize.org/competitions/2026/arc-agi-2#previous-years)

## 官方来源按角色分组

- 发布方介绍与数据结构： [ARC-AGI-2](https://arcprize.org/arc-agi/2)
- 官方数据与 license： [arcprize/ARC-AGI-2](https://github.com/arcprize/ARC-AGI-2)
- 使用指南： [ARC-AGI-1 & 2 Guide](https://arcprize.org/guide/1)
- 官方竞赛入口/评分规则： [ARC Prize 2026 ARC-AGI-2](https://arcprize.org/competitions/2026/arc-agi-2)
- 技术论文：官方页面链接的 ARC-AGI-2 Technical Report，入口见 [ARC-AGI-2](https://arcprize.org/arc-agi/2)
- 榜单： [ARC Prize Leaderboard](https://arcprize.org/leaderboard)

## 模型发布引用

厂商报告可以记录为该厂商自行报告的 ARC-AGI-2 成绩与运行设置，不据此改写官方任务定义、许可、benchmark 版本或基准真值。本记录未引用模型厂商分数。

## 未核实项

- 技术论文 PDF 的公开评价配置与官方当前榜单每个条目的 harness/cost细节未在本报告逐一复核；没有作当前成绩陈述。
- README 中试题次数存在文字不一致（主定义写 2 次，界面说明段另写 3 次）；展示 benchmark 规则前应以仓库当前版本或官方澄清复核，不展示有争议描述。
- 全部任务与文件总字节数、逐条题目差异未重新下载/逐项核对。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方规模、结构、公开访问、基础评分和仓库数据许可均可核验。若公开展示样例，限制为带归属与许可证的训练任务；不公开 evaluation 任务。
