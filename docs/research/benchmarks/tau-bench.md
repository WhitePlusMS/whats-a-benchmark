# τ-bench

核验日期：2026-09-23。

## 官方身份

τ-bench（Tool-Agent-User Interaction Benchmark）由 Sierra 研究团队提出，用于评估语言代理在领域政策约束下与模拟用户多轮交流并操作 API 工具的表现。首发论文定义 τ-retail 与 τ-airline 两个客户服务领域。需将这项 2024 原版与论文后续明确命名的 τ²-bench、以及 τ² 仓库后来演进的 τ³-bench 分开记录。[τ-bench 作者论文](https://arxiv.org/abs/2406.12045v1)；[官方仓库当前说明](https://github.com/sierra-research/tau-bench)

## 官方定义与忠实中文概述

基准把每个任务建模为代理、模拟用户、业务数据库/API 和领域政策组成的交互环境。代理须从用户对话中获取信息、遵守政策、调用工具；结束时比较数据库最终状态与标注的目标状态，并检查必要的回复内容。用户模拟由语言模型生成，因此同一任务可以有不同对话轨迹，但仍对应唯一目标状态。[作者论文：任务与奖励定义](https://arxiv.org/html/2406.12045v1)

## 任务输入/输出/环境

- 输入材料包括模拟用户的任务指令、领域政策文本、领域数据库和 API 工具。任务中的指令供 user simulator 使用，标注的目标动作/输出用于评估，并不是应直接暴露给被测代理的输入。[作者论文](https://arxiv.org/html/2406.12045v1)
- 输出是一段代理—用户—工具交互及其产生的状态变化。原论文的奖励为二元值：目标数据库写入状态一致且回复包含必要信息才成功；论文同时提醒，仅此自动奖励未必覆盖所有政策违规。[作者论文](https://arxiv.org/html/2406.12045v1)
- 官方仓库提供可运行 harness、LLM user simulator、模型调用配置和历史轨迹；运行分数受 agent strategy、agent 模型、user simulator 模型/策略和具体任务版本影响。[官方运行说明](https://github.com/sierra-research/tau-bench#run)

## 数据规模/split/字段/文件

- 论文初版统计为 τ-retail 115 题、τ-airline 50 题；零售数据库含 500 个用户、50 类商品和 1,000 笔订单，航空数据库含 500 个用户、300 个航班和 2,000 笔预订。这些是论文所述原版规模，不应外推到后续修订任务集。[作者论文：Table 1](https://arxiv.org/html/2406.12045v1)
- 官方仓库按环境目录保存政策、数据库/API 实现和任务代码；零售任务含 `instruction`、目标 `actions` 及可选 `outputs` 等字段。没有证据表明原版任务集有统一的 train/validation/test 三分法；各类 `tasks_dev.py` 等文件名应按源文件名记录，不改写成通用 split。[官方 retail dev tasks](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/tasks_dev.py)
- 不同版本的任务数不可混用。当前 tau-bench 仓库 README 明确说仓库中的 retail/airline tasks 是过时版本，且指向 τ³-bench 的修订任务。[官方仓库警告](https://github.com/sierra-research/tau-bench#readme)

## 访问状态

原版代码、任务和 mock 环境可在 Sierra 官方 GitHub 仓库公开浏览并运行；运行需配置所用模型供应商的 API 凭证。官方同时提供部分历史轨迹。当前仓库自述其 airline/retail 任务未更新，若报告为当前基准结果，必须明确具体任务快照、代码版本和运行配置，不能只写 τ-bench。[官方仓库](https://github.com/sierra-research/tau-bench)

## 数据/代码/媒体许可与使用边界

官方仓库称其为 “Code and Data for Tau-Bench”，根目录提供 MIT License；retail mock-data 的 README 另明确允许将其中部分数据库数据用于其他用途。上述依据支持按 MIT 通知要求使用该仓库发布的材料，但不应把这一许可延展为对任意第三方模型、外部服务或衍生数据库内容的授权。原论文在 arXiv 标为 CC BY 4.0，该许可适用于论文文本，不自动替代仓库文件的许可。[官方仓库与 LICENSE](https://github.com/sierra-research/tau-bench)；[retail mock-data 说明](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/data/readme.md)；[作者论文许可](https://arxiv.org/html/2406.12045v1)

## 官方样例与是否可在公开 GitHub Pages 转载

本站现有一条原版零售 `tasks_dev.py` 样例。已逐字段与官方 `TASKS_DEV[0]` 核对：`user_id=olivia_ito_3591`；展示题面与 `instruction` 相同，保留原文中的拼写 `do't`；本站 `raw` 只含 `user_id` 和 `instruction`，没有复制源记录中的 `actions` 目标答案。任务 ID 使用列表位置加 user ID 定位，不是官方 task ID。发布说明应保留其“旧版、过时任务”标签；仓库 MIT 许可须按要求附归属通知。此样例不是当前 τ³/修订任务集的代表题。[本站样例记录](../../content/benchmarks/tau-bench.json)；[官方任务源](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/tasks_dev.py#L903-L925)；[仓库许可证](https://github.com/sierra-research/tau-bench/blob/main/LICENSE)

## 指标

原论文定义 **pass^k**（pass hat k）：在同一任务的 k 次独立运行都成功的概率，再跨任务平均；它衡量稳定性，不等同于至少一次成功的 `pass@k`。成功的单次 episode 以目标数据库状态和必要回复信息计算二元 reward，默认 `pass^1` 为主指标。报告需写明领域、k、任务快照、agent/user 模型及策略。[作者论文：pass^k 定义](https://arxiv.org/html/2406.12045v1)

## 版本关系

τ-bench 是 2024 原版；τ²-bench 于 2025 年提出，在通信任务中增加用户一侧也能操作共享环境的 dual-control 能力；该后续不能视为简单的同一任务集版本号升级。τ² 项目后来进一步更新为 τ³-bench；τ-bench 官方仓库和 τ² 仓库当前 README 均提示转向 τ³ 的修订任务。[τ-bench 论文](https://arxiv.org/abs/2406.12045v1)；[τ²-bench 论文](https://arxiv.org/abs/2506.07982v1)；[当前 τ² 仓库 README](https://github.com/sierra-research/tau2-bench#readme)

## 官方来源按角色分组

- **原版 benchmark 定义、任务规模、奖励和 pass^k：**[τ-bench 作者论文 v1](https://arxiv.org/html/2406.12045v1)。
- **官方代码、原版任务、执行配置、当前版本警示：**[Sierra Research tau-bench](https://github.com/sierra-research/tau-bench)。
- **mock retail 数据复用说明：**[官方 retail data README](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/data/readme.md)。
- **后续 τ² 定义与双控制设计：**[τ²-bench 作者论文 v1](https://arxiv.org/html/2506.07982v1)。

## 模型发布引用

引用模型成绩时，应标明报告者、原版/后续任务版本、领域、pass^k 的 k、agent 和 user simulator 的模型及策略、harness commit 与任务快照。官方仓库榜单数字属于特定历史配置，不能仅凭指标名称视为当前成绩。[官方仓库榜单与运行参数](https://github.com/sierra-research/tau-bench)

## 未核实项

- 当前 `main` 中原版任务与论文提交快照的逐题差异尚未审计；严格复现实验需固定仓库 commit。
- 根 MIT License 对仓库 task 文件的授权依据来自仓库层面的 “Code and Data” 声明，未见单独的逐文件数据许可证或逐任务第三方权利清单。
- 当前 τ³ 修订任务的完整语义、任务数量及许可边界属于独立版本核验范围，不纳入原版 τ-bench 的规模描述。

## 研究结论

**PASS_WITH_LIMITATIONS** — 原版定义、领域、规模、奖励和 pass^k 有作者论文与 Sierra 官方仓库支持。本站现有一条 retail dev 样例与官方首条任务逐字段一致，且未带出目标动作；应继续明确标作过时原版样例，并保留许可归属信息，不能代表后续 τ²/τ³ 任务集。
