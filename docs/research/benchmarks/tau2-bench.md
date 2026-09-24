# τ²-bench

核验日期：2026-09-23。

## 官方身份

τ²-bench 由 Sierra Research 作者团队于 2025 年提出，是在 τ-bench Tool-Agent-User 对话基准基础上扩展的 dual-control 对话代理评测。核心新增是 telecom 领域：代理与模拟用户各有工具，并能共同改变共享任务环境。它和 τ-bench 的原版 retail/airline 不是同一任务集。[τ²-bench 作者论文 v1](https://arxiv.org/abs/2506.07982v1)

## 官方定义与忠实中文概述

τ²-bench 将代理和用户建模为 Dec-POMDP 中的两个参与方。用户除了通过语言提供目标或偏好，也能调用受限工具改变自己的设备状态；代理必须诊断问题、指导用户、调用自己的业务工具，并共同达到可程序化验证的最终状态。论文还给出 no-user 等消融设置，用于分辨自主推理和人机协调的影响。[作者论文：方法](https://arxiv.org/html/2506.07982v1)

## 任务输入/输出/环境

- 输入由领域政策、任务场景/用户指令、代理和用户可用工具以及 mock 数据库构成。用户模拟器的动作会与代理共享世界状态交互；不同领域任务对最终成功采用数据库检查、状态断言、自然语言断言、沟通信息或动作匹配等 criteria 的组合。[作者论文：Dec-POMDP 与评估](https://arxiv.org/html/2506.07982v1)
- 输出是多轮对话、双方的工具轨迹及最终状态。论文原始 telecom 实验以 assertion 函数验证目标状态；运行结果依 agent 和 user simulator 的配置而变。[作者论文](https://arxiv.org/html/2506.07982v1)
- 论文实验用 function-calling agent 和 LLM user simulator；官方实现提供 τ-bench harness。完整复现须固定 agent/user 模型、prompt、运行模式、trial 数及任务数据版本。[作者论文：实验配置](https://arxiv.org/html/2506.07982v1)；[官方仓库](https://github.com/sierra-research/tau2-bench)

## 数据规模/split/字段/文件

- 论文对 τ² 版本统计：原有 verified retail 115 题、airline 50 题；新 telecom 组合任务生成空间为 2,285 题，并从中抽取 114 题用于平衡评测。数据库规模、agent tools 和 user tools 也按领域分列，不能把这些领域的题目/工具数字合并成单项未注明口径的数值。[作者论文：Table 1 与任务构造](https://arxiv.org/html/2506.07982v1)
- 任务由初始化函数、解决函数和断言函数等原子组件组合；`tasks.json` 保存任务配置，拆分另由 `split_tasks.json` 表达。当前 repo 域目录文档说明了该 schema，但这描述的是后来维护的 Tau2/Tau³ 项目数据布局，不应反向当成论文首发 snapshot 的逐字段保证。[官方 domains README](https://github.com/sierra-research/tau2-bench/blob/main/src/tau2/domains/README.md)
- 论文称 114 条是 2,285 个 telecom 组合任务的平衡抽样结果；不要将 2,285 当成 2025 论文实验实际逐项评测数量。[作者论文](https://arxiv.org/html/2506.07982v1)

## 访问状态

论文和 Sierra 官方仓库公开。仓库当前 README 已公告 τ³-bench，包含新 banking_knowledge 领域、语音评测以及任务修订；`main` 分支已不能简单等同于 2025 年论文对应的冻结 τ² 实验快照。复现实验应固定 τ² 时代的 commit/tag 和运行配置，并明确领域、split 与版本。[官方 τ²/τ³ 仓库 README](https://github.com/sierra-research/tau2-bench#readme)；[官方 changelog](https://github.com/sierra-research/tau2-bench/blob/main/CHANGELOG.md)

## 数据/代码/媒体许可与使用边界

官方 arXiv 论文标注 CC BY 4.0；这是论文文本许可，不自动许可代码库中的全部任务和数据库材料。当前官方 GitHub 根 `LICENSE` 为 MIT，授予文字明确描述 Software 及其相关文档；该文本没有逐项列出 `data/tau2/domains/**` 任务 JSON、领域政策和数据库文件的独立数据授权。不得仅因仓库有 MIT LICENSE 就断言整套任务数据可复制进公开页面。τ² 任务也没有在本轮查到数据卡或逐文件 license 声明。[论文许可与代码数据指针](https://arxiv.org/html/2506.07982v1)；[官方根许可证](https://github.com/sierra-research/tau2-bench/blob/main/LICENSE)；[零售任务目录](https://github.com/sierra-research/tau2-bench/tree/main/data/tau2/domains/retail)

## 官方样例与是否可在公开 GitHub Pages 转载

本站 `tau2-bench` 条目当前没有内嵌具体任务记录，只展示官方仓库来源并标记 `availability=unknown`。专项样例核验记录曾审查官方 retail `tasks.json` 与根 MIT License，结论为暂缓：未找到明确覆盖任务 JSON/领域数据的独立许可。因此目前只链接官方任务目录，不复制任务题面、目标动作、政策或数据库。τ² 论文中出现的示例轨迹可用于解释论文方法，不应误标为官方 release 数据行。[本站条目](../../content/benchmarks/tau2-bench.json)；[样例许可审查记录](../2026-09-23-samples-agent-round2.md)；[官方 retail task JSON](https://github.com/sierra-research/tau2-bench/blob/main/data/tau2/domains/retail/tasks.json)

## 指标

论文报告 **pass^k**，即同一任务 k 次独立运行全都成功的比率；成功由所选任务 criteria 对最终环境/交互状态的检查决定。论文实验为每题运行四次，pass^1 为单次成功率。它不是 pass@k，亦不能在未注明领域和模式的情况下把 retail、airline、telecom 或 no-user 成绩混成单一数字。[作者论文：任务评估及实验配置](https://arxiv.org/html/2506.07982v1)

## 版本关系

τ²-bench（2025）沿用 τ-bench 的 airline/retail 环境并新增 dual-control telecom。τ³-bench 是后续仓库正式标注的演进版本，增加 knowledge 与 voice 能力并修订多个任务；官方明确指出部分版本的 `banking_knowledge` 评分会因 v1.0.1 修复而不可比较，且 75+ 任务修订会改变评测语义。不要把当前 τ³ 仓库的行为/得分说成 τ² 论文首发版。[τ² 作者论文](https://arxiv.org/abs/2506.07982v1)；[官方 τ³ 仓库变更说明](https://github.com/sierra-research/tau2-bench#readme)；[官方 changelog](https://github.com/sierra-research/tau2-bench/blob/main/CHANGELOG.md)

## 官方来源按角色分组

- **dual-control 设计、领域统计、任务构造、指标：**[τ²-bench 作者论文 v1](https://arxiv.org/html/2506.07982v1)。
- **官方实现、当前任务数据布局与版本演进：**[Sierra Research tau2-bench / τ³-bench](https://github.com/sierra-research/tau2-bench)。
- **任务 schema 与 split 文件组织：**[官方 domains README](https://github.com/sierra-research/tau2-bench/blob/main/src/tau2/domains/README.md)。
- **代码许可文本：**[官方根 LICENSE](https://github.com/sierra-research/tau2-bench/blob/main/LICENSE)；该证据本身未确认任务数据许可。

## 模型发布引用

引用成绩时，应将来源标为 τ²-bench 论文实验或某个具体 τ²/τ³ 官方 leaderboard run，并同时给出论文/代码版本、领域、split、agent 与 user simulator、交互模式、trial 数和指标。τ³ 仓库当前结果不可自动归入 τ²-bench。[论文](https://arxiv.org/html/2506.07982v1)；[官方仓库](https://github.com/sierra-research/tau2-bench)

## 未核实项

- 2025 论文发布时每个域任务文件与当前 `main` 任务集的完整逐题映射尚未核实；需对指定 Git commit/tag 进行差异审计。
- 没有查到明确覆盖 τ² task JSON、政策文本和 mock database 的独立数据许可；公开页面转载权未确认。
- 本站当前无 τ² 具体任务样例；本次对已有条目的核对仅确认字段链接、未知访问状态及既有“暂缓复制”的样例决策，不以论文示例轨迹填充任务样例。

## 研究结论

**PASS_WITH_LIMITATIONS** — 作者论文明确支持 τ² 的 dual-control 定义、任务构造、领域统计和 pass^k 口径；Sierra 官方仓库支持公开代码、任务文件结构及其后续转为 τ³ 的版本边界。任务数据的单独授权仍不明确，本站无具体任务样例，现阶段应仅链接原始来源并维持不转载结论。
