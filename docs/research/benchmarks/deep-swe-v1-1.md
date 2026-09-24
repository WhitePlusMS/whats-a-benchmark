# DeepSWE v1.1

核验日期：2026-09-23

## 官方身份

DeepSWE v1.1 是 DataCurve 发布的长时程软件工程 agent 基准版本。官方 changelog 明确记载 2026-06-15 发布 v1.1，包含 113 个任务，并采用隔离验证与结构化测试报告；仓库称其任务来自活跃开源代码库，覆盖 TypeScript、Go、Python、JavaScript、Rust。[官方 changelog](https://deepswe.datacurve.ai/changelog)；[官方仓库 README](https://github.com/datacurve-ai/deep-swe)

## 官方定义与忠实中文概述

基准让 coding agent 在隔离的软件项目环境中完成原创建立的长时程工程任务，再由程序化 verifier 检查指令要求的可观察行为。它不要求照抄参考 patch；官方说明 grader 接受任何行为正确的实现，参考 patch 仅供离线抽查。[官方仓库 README](https://github.com/datacurve-ai/deep-swe)

## 任务输入/输出/环境

- **输入**：`instruction.md` 中给 agent 的任务指令及固定仓库基线；`task.toml` 记录仓库、base commit、语言、镜像和资源限制。
- **输出**：agent 完成后提交的改动 patch，由独立 verifier 容器在 pristine 环境中应用并执行隐藏测试；run 还产生 `reward.json`、`ctrf.json`、测试输出和日志。
- **环境**：Harbor 格式任务，含 Docker 环境定义和隔离执行。v1.1 使用独立 verifier 环境，官方说明需 Pier >0.3.0；官方 leaderboard 的结果统一由 Pier + mini-swe-agent 运行。[官方仓库 README](https://github.com/datacurve-ai/deep-swe)

## 数据规模/split/字段/文件

- 官方仓库说明共有 **113 个任务**、跨 **5 种语言**；官网进一步列出 **91 个仓库**。官网 leaderboard 当前显示 v1.1，页面更新时间为 2026-09-22。[官方仓库 README](https://github.com/datacurve-ai/deep-swe)；[官方 leaderboard](https://deepswe.datacurve.ai/)
- 数据格式：每个任务目录按 `task.toml`、`instruction.md`、`environment/`、`tests/`、`solution/` 组织；提交及评分输出按 README 的 verifier 输出结构写入。来源没有声明传统训练/验证/测试 split；官方 leaderboard 当前覆盖 113-task 基准，不把它推断为独立数据切分。[官方仓库 README](https://github.com/datacurve-ai/deep-swe)
- 官网还列出 `reward.json` 中的 binary reward 与 pass fractions 等结构化输出，并展示任务百分比、置信区间、成本、输出 token 和 agent steps；这些是评测记录字段，不是 benchmark 输入数据字段。[官方仓库 README](https://github.com/datacurve-ai/deep-swe)；[官方 leaderboard](https://deepswe.datacurve.ai/)

## 访问状态

官方 GitHub 仓库公开且包含 tasks 目录；官网提供 v1.1 leaderboard 与任务示例。可按仓库 README 使用 Pier 运行；完整复现需要模型 API 凭据以及运行环境。未下载全量数据或本地运行评测。[官方仓库](https://github.com/datacurve-ai/deep-swe)；[官方 leaderboard](https://deepswe.datacurve.ai/)

## 数据/代码/媒体许可与使用边界

GitHub 仓库标注 Apache-2.0，但 `PROVENANCE.md` 将范围限定为 DataCurve 的原创贡献（任务规格、评测 harness、verifier、整理工作）；上游开源项目各自许可继续适用。官网明确写有 benchmark data 不得进入训练语料的 canary 声明。故本候选按 **受限** 处理：不能以仓库 Apache-2.0 标记推定所有任务材料或上游代码可转载，也不得把任务文本或测试用于训练；不复制题面、解答、测试或媒体。[官方仓库许可与来源说明](https://github.com/datacurve-ai/deep-swe/blob/main/PROVENANCE.md)；[官方 benchmark 页面](https://deepswe.datacurve.ai/)

## 官方样例与是否可在公开 GitHub Pages 转载

官网提供任务标题/摘要示例与“全部 113 项任务”入口；没有确认对外复制完整题面或测试的许可。可发布自写概述和官方链接，不转载 benchmark 数据、reference patch、测试或截图；未建立 `sampleSet`。[官方 leaderboard 与任务入口](https://deepswe.datacurve.ai/)；[官方仓库来源及许可边界](https://github.com/datacurve-ai/deep-swe/blob/main/PROVENANCE.md)

## 指标

官网排行榜以任务百分比作为主要 score，同时展示置信区间、成本、输出 token 数及 agent steps；仓库说明 verifier 输出 binary reward 与 pass fractions。本文仅记录官方显示的任务得分口径，不把未在该入口明确命名的聚合项擅自称为 pass@k。[官方 leaderboard](https://deepswe.datacurve.ai/)；[官方仓库 README](https://github.com/datacurve-ai/deep-swe)

## 版本关系

本候选只指 2026-06-15 发布的 v1.1，不合并早期 v1。v1.1 使用独立 verifier 环境、Pier 版本要求与结构化报告；后续 leaderboard 增补的是模型记录，不等同于新的 benchmark 版本。[官方 changelog](https://deepswe.datacurve.ai/changelog)

## 官方来源按角色分组

- **发布/版本定义**：[DeepSWE 官方 changelog](https://deepswe.datacurve.ai/changelog)，记录 v1.1 发布日期与 113-task 口径。
- **定义、任务结构、运行和许可范围**：[DataCurve 官方 GitHub README](https://github.com/datacurve-ai/deep-swe)；[PROVENANCE.md](https://github.com/datacurve-ai/deep-swe/blob/main/PROVENANCE.md)。
- **当前版本、榜单展示和反训练污染声明**：[DeepSWE 官方 leaderboard](https://deepswe.datacurve.ai/)。

## 模型发布引用

本条的定义、规模和许可均来自 DataCurve 一手页面。Step 5 Preview、Qwen3.8-Max、GLM-5.3-Flash、DeepSeek-V4.1-Flash 与 Kimi K3 的官方发布材料均列出 DeepSWE / DeepSWE v1.1；这些只登记为 `vendor-report`，不能支撑基准定义或指标。引用成绩时仍须记录 agent、reasoning effort、任务版本与 harness。

厂商入口：[Step 5 Preview](https://www.stepfun.com/step-5-preview)、[Qwen3.8-Max](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)、[GLM-5.3-Flash](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)、[DeepSeek 更新日志](https://api-docs.deepseek.com/updates/)、[Kimi K3](https://github.com/MoonshotAI/Kimi-K3)。

## 未核实项

- 未固定 Git commit 或下载全量任务，因此未重新逐任务统计语言、repo 数、字段与许可例外。
- `reward.json` 的 binary reward / pass fractions 不足以单独确认官网 leaderboard 百分比对部分分数的具体聚合细节；本候选不宣称它等于特定 pass@k。
- 未在本轮核对任务中引用的每个上游项目、第三方附件和媒体的许可。
- 现有 75 条目录未发现同名 ID 或 alias；`SWE-bench Pro` 等属于相邻但不同的仓库修复类基准，不据此视为重复。

## 研究结论

**PASS_WITH_LIMITATIONS**：发布主体、v1.1 日期、任务数、任务格式、独立 verifier 运行方式及防训练污染提示均有官方一手来源；细粒度评分聚合和逐任务权利边界仍有限制。

## 项目目录比对与候选判定

在当前 `content/benchmarks` 的 75 条记录中，按 ID、名称和 alias 未找到 DeepSWE / DeepSWE v1.1。建议作为 **值得新增** 的独立 coding 基准候选。与现有 SWE-bench Pro 的任务对象不同：DeepSWE 是原创长时程工程任务，SWE-bench Pro 是既有代码库 issue 修复基准；无同名疑似重复项。
