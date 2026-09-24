# Terminal-Bench 2.0

核验日期：2026-09-23

## 官方身份

Terminal-Bench 2.0 是 Laude Institute / Terminal-Bench 团队发布的终端智能体基准版本，官方定义为在容器化环境中衡量 agent 与语言模型完成有价值工作的能力。该版本应按 Harbor 数据集 `terminal-bench@2.0` 固定运行，不与早期 Terminal-Bench harness 或 2.1、3.0、4.0 版本混用。[官方仓库 README](https://github.com/harbor-framework/terminal-bench-2)；[2.0 论文](https://arxiv.org/abs/2601.11868)

## 官方定义与忠实中文概述

官方论文将 2.0 描述为由 89 个经过策划的终端环境任务组成，任务取材于真实工作流，覆盖多种技术任务。官方 README 举例包括蛋白质合成设计、异步代码调试和安全漏洞处理。2.0 是具体发布版，不是对所有 Terminal-Bench 版本规模和运行结果的统称。[论文](https://arxiv.org/abs/2601.11868)；[官方仓库](https://github.com/harbor-framework/terminal-bench-2)

## 任务输入/输出/环境

- **输入**：任务指令及该任务容器中的文件、依赖和工作环境。
- **输出**：agent 在容器内完成的工作产物，由任务 verifier 判定是否解决；不同任务的输出与验证规则不同，不归纳成单一文件 schema。
- **环境**：官方建议通过 Harbor 运行，任务在 Docker 容器内执行；运行命令指定 `terminal-bench@2.0` 和 agent/model。完整评测依赖容器运行时、模型接口和相应 API 凭据。[官方 README](https://github.com/harbor-framework/terminal-bench-2)

## 数据规模/split/字段/文件

官方 2.0 论文报告 89 个任务。官方 Harbor 命令通过版本标识 `terminal-bench@2.0` 下载任务；本轮未下载并固定数据包 revision，因此不报告字段清单或当前 task 文件统计。官方说明 2.0 任务经过数小时人工与语言模型辅助验证，目标是可解、真实且规格清楚。[论文](https://arxiv.org/abs/2601.11868)；[官方仓库 README](https://github.com/harbor-framework/terminal-bench-2)

## 访问状态

官方 GitHub 仓库公开，官方 README 给出 Harbor 运行入口；本轮未执行 benchmark，也未下载整套任务。运行需自行准备 Docker 与模型服务凭据。[官方仓库](https://github.com/harbor-framework/terminal-bench-2)

## 数据/代码/媒体许可与使用边界

GitHub 仓库页显示 Apache-2.0，但本轮未逐项核对该许可是否明确覆盖每项 benchmark 内容、第三方输入或每个任务附件；不能把代码仓库许可自动推及所有任务材料。Terminal-Bench 官方的防污染要求见官网：基准数据不得进入训练语料，页面带有 GUID canary；2.0 leaderboard 同时要求通过任务的 ATIF 轨迹，并对通过项用 judge 检查通过互联网查找解法等 reward hacking。[官方仓库](https://github.com/harbor-framework/terminal-bench-2)；[官方完整性说明](https://www.tbench.ai/news/leaderboard-integrity-update)

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库 README 和任务页面可作为介绍及链接入口。由于本轮未核对每项任务数据、代码和潜在第三方材料的许可范围，GitHub Pages 仅建议用自写概述并链接官方仓库，不复制真实题面、解答、测试或任务文件。官方明确的数据训练限制也应遵守。[官方仓库](https://github.com/harbor-framework/terminal-bench-2)；[官方完整性说明](https://www.tbench.ai/news/leaderboard-integrity-update)

## 指标

核心指标为任务解决率/通过率；具体统计依赖任务、agent、模型、试验次数与 Harbor/verifier 版本。排行榜结果应引用对应 2.0 数据版与提交记录，不能与其他版本分数横向视作同一试验。[官方论文](https://arxiv.org/abs/2601.11868)；[官方完整性说明](https://www.tbench.ai/news/leaderboard-integrity-update)

## 版本关系

Terminal-Bench 2.0 于 2025-11-07 发布，使用 Harbor 运行。后续官方持续发布了 2.1 及更新版本；版本更新可能改任务、验证器、资源或环境。复现实验需固定 `terminal-bench@2.0`，不可用当前默认版代替。[官方版本目录](https://www.tbench.ai/benchmarks)；[2.0 官方 README](https://github.com/harbor-framework/terminal-bench-2)

## 官方来源按角色分组

- **版本定义、构造与规模**：[Terminal-Bench 2.0 论文](https://arxiv.org/abs/2601.11868)。
- **代码、运行方式及仓库许可标记**：[Terminal-Bench 2.0 官方仓库](https://github.com/harbor-framework/terminal-bench-2)。
- **版本历史**：[Terminal-Bench 官方版本目录](https://www.tbench.ai/benchmarks)。
- **训练污染及排行榜反作弊政策**：[官方完整性说明](https://www.tbench.ai/news/leaderboard-integrity-update)。

## 模型发布引用

引用模型成绩时记录 2.0 数据集标识、Harbor 版本、agent 与模型版本、运行环境、试验次数、提交轨迹及评分口径。官方 leaderboard 要求通过试验提供 ATIF 轨迹，并说明通过互联网访问任务解法会被视为 reward hacking；厂商报告中的分数若未使用同一固定配置，不可标成直接复现的官方成绩。[官方完整性说明](https://www.tbench.ai/news/leaderboard-integrity-update)

## 未核实项

- 未下载 Harbor 发布包或固定 Git commit，未重新统计任务文件及其 schema。
- 未逐项核查 89 个任务、附件和第三方材料的独立许可；仓库 Apache-2.0 标记不能单独证明所有材料可转载。
- 本轮未运行评测或核验任何特定模型的 2.0 成绩。

## 研究结论

**PASS_WITH_LIMITATIONS** — 版本身份、89 任务规模、Harbor 运行标识及 2.0 leaderboard 的反作弊政策有官方第一方来源。仓库许可标记不替代逐任务内容授权审查；公开网页建议只写自有概述并链接原项目。
