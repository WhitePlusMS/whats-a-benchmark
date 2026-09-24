# WANDR

核验日期：2026-09-23

## 官方身份

WANDR（Wide ANd Deep Research）是 Perplexity 发布的研究型 agent 基准，官方技术报告于 2026-08 提交至 arXiv。作者代码仓库把 source data、Harbor 转换适配器、生成后的 Harbor task 和 Relay 运行层分开维护。[作者论文](https://arxiv.org/abs/2608.14747)；[Perplexity 官方仓库](https://github.com/perplexityai/wandr)

## 官方定义与忠实中文概述

WANDR 包含 500 个真实且具挑战性的数据收集任务，要求系统发现符合条件的大量实体（广度）、对每个实体进行多个协同网页搜索和信息补充（深度），并提交带有支持来源和摘录、可独立验证的记录。其 qualification key hierarchy 描述实体、关系、证据及各层数量要求，适用于市场地图、尽调、文献综述、产品比较和人才搜寻等流程。[作者论文](https://arxiv.org/abs/2608.14747)；[官方仓库](https://github.com/perplexityai/wandr)

## 任务输入/输出/环境

- **输入**：结构化任务指令，含研究目标、层级/资格条件及期望记录数；具体任务还可能有 prompt、schema、artifacts 和公开证据材料。
- **输出**：按任务要求提交的实体/关系/证据文件。Harbor verifier 会重新抓取引用页面、规范化实体、去重并评判证据。
- **环境**：官方提供 Docker 本地环境与可选 E2B；运行依赖 Python 3.12、Docker 和所选 Solver、Fetcher、Judge providers 的 API keys。多 provider 完整配置会发起付费 API 调用。[官方 README](https://github.com/perplexityai/wandr)

## 数据规模/split/字段/文件

作者论文给出 500 个任务。官方源格式位于 `reference/wandr_tasks/`，含任务配置、schema、prompts 与 artifacts；`datasets/wandr/` 是 Harbor 格式生成任务。独立 task 包含 `instruction.md`、`task.toml`、`environment/`、`tests/wandr_task/`、`tests/wandr_core/` 和 `tests/manifest.json`。README 提供 smoke、validation 与 full scored task set 三种运行覆盖层级；具体 schema 应按对应版本的任务配置读取。[论文](https://arxiv.org/abs/2608.14747)；[官方仓库 README](https://github.com/perplexityai/wandr)

## 访问状态

作者公开 GitHub 仓库、技术报告和 Harbor-format 数据目录。运行可使用官方 wrapper 的本地 Docker 或可选 E2B 路径，并需要相关 provider credentials。本轮未克隆仓库、下载任务数据或运行 API 实验。[官方仓库](https://github.com/perplexityai/wandr)

## 数据/代码/媒体许可与使用边界

GitHub 将 WANDR repository 标注为 Apache-2.0；这不能自动为其中第三方来源材料授予相同许可。官方 README 明确指出任务 artifacts 可能含有衍生自公开记录的材料，第三方源材料仍受其自身条款约束，重用或再分发须遵循链接来源的条款。因而代码许可、WANDR 自有结构化数据和每项第三方来源材料必须区分。已检查的官方 README/论文未发现明确的训练排除 canary 或专门防污染制度；这表示未找到公开说明，不等于确认无数据污染风险。[官方仓库](https://github.com/perplexityai/wandr)；[作者论文](https://arxiv.org/abs/2608.14747)

## 官方样例与是否可在公开 GitHub Pages 转载

可介绍 WANDR 的结构、评测方式并链接官方仓库/论文。不要整体复制源 task configs 或 artifacts 到公开 GitHub Pages；特别是每项内容中引用的第三方页面、图文或记录，需先满足各自来源服务条款与版权条件。若展示自行整理的示例，应使用自创或已确认许可的来源，并标注其不是 WANDR 原始任务。[官方第三方来源声明](https://github.com/perplexityai/wandr)

## 指标

task-specific judge 对逐条记录验证并汇总 soft/hard precision、recall 与 F1，用以区分事实质量、覆盖率和层级完整度。论文对六个生产 research systems 的实验报告最高 high-effort 系统 soft F1 为 0.363、hard F1 为 0.133；这是特定系统/运行强度的报告结果。[作者论文](https://arxiv.org/abs/2608.14747)；[官方结果文件说明](https://github.com/perplexityai/wandr)

## 版本关系

arXiv 技术报告版本 v1 日期为 2026-08-14；作者仓库把任务源与 Harbor 生成任务分层，代码还包含用于对齐/检查源任务、vendored evaluator、wrapper 和数据 digest 的脚本。复现实验需同时固定 Git revision、source task data、Harbor task/package、provider/model 配置和运行参数；不能只引用可变 `main` 或把不同 provider 的结果混成同一设置。[论文版本记录](https://arxiv.org/abs/2608.14747)；[官方仓库](https://github.com/perplexityai/wandr)

## 官方来源按角色分组

- **任务定义、500 题规模、指标及论文实验**：[WANDR 技术报告](https://arxiv.org/abs/2608.14747)。
- **源数据和 Harbor 任务层次、运行配置、任务材料及第三方版权边界**：[Perplexity 官方仓库 README](https://github.com/perplexityai/wandr)。
- **代码仓库许可标记**：[官方 LICENSE](https://github.com/perplexityai/wandr/blob/main/LICENSE)。

## 模型发布引用

成绩需注明 WANDR 源数据和代码 revision、所选 Harbor task release、agent/endpoint 与模型版本、research effort、Fetcher/Judge 配置及运行时间。软/硬 F1 都应报告，且不要把论文中最高 high-effort 成绩直接解释为当前所有系统的上限；任务使用动态网页证据，结果也受引用页面可访问性与时间影响。[作者论文](https://arxiv.org/abs/2608.14747)；[官方 README](https://github.com/perplexityai/wandr)

## 未核实项

- 未固定仓库 commit 或逐一统计 500 个 source task 的当前文件清单。
- 未逐 task 检查所有第三方来源、网页条款、授权和转载边界；README 已明确要求继承原始来源条款。
- 未找到公开 canary/训练排除政策；未据此推断许可训练或确认未污染。
- 未运行 benchmark 或付费 API 配置。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方论文支持定义、500 题规模、任务结构和指标；作者仓库支持 Harbor 工程结构、访问方式、Apache-2.0 仓库标记及第三方材料权利边界。逐任务来源授权和运行配置尚未核验，公开页面应做自有概述并直接指向官方材料；未发现的防污染说明保持为未知。
