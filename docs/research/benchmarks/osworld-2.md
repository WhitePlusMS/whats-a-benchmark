# OSWorld 2.0

核验日期：2026-09-23。

## 官方身份

OSWorld 2.0 是 XLANG Lab 发布的长时程真实桌面任务 computer-use agent 评测，论文与环境于 2026-06 发布。2026-06-24 的首个公开 release 标为 `osworld-v2-2026.06.24`；官方仓库现将 `osworld-v2.1` 标为 active/recommended。因此本文保留 2.0 的首次发布事实，并将当前推荐版本单独标明，不能把 v2.1 任务结果回填成初版 2.0 结果。[官方 OSWorld-V2 仓库](https://github.com/xlang-ai/OSWorld-V2)；[版本发布清单](https://github.com/xlang-ai/OSWorld-V2/blob/main/benchmark_releases/README.md)

## 官方定义与忠实中文概述

评估 computer-use agent 在真实桌面环境中完成长时程、端到端工作流的能力。论文摘要描述的工作流通常需人类约 1.6 小时完成，并涉及大量交互步骤；这描述任务复杂度，不代表所有题目耗时或调用数固定。[OSWorld 2.0 论文](https://arxiv.org/abs/2606.29537)

## 任务输入/输出/环境

- 输入：自然语言任务指令、预置桌面状态及相应资源/网站服务。
- 操作：agent 经屏幕观察和桌面交互在操作系统、应用和跨应用工作流中执行动作。
- 输出与评估：任务完成后的桌面/文件状态由任务评估器核验；具体 task class 与 assets 随 release 获取。
- 环境：真实桌面 VM、模拟网站和可选服务组合。可比运行须将代码、Python task files、完整 assets、网站版本和 provider VM images 固定为同一官方 release。[官方 OSWorld-V2 README](https://github.com/xlang-ai/OSWorld-V2)；[Benchmark Releases](https://github.com/xlang-ai/OSWorld-V2/blob/main/benchmark_releases/README.md)

## 数据规模/split/字段/文件

2026-06-24 首个公开 release 公告列出 108 项任务，并提供 `xlangai/osworld_v2_tasks`、网站代码和运行镜像入口。[首发 release](https://github.com/xlang-ai/OSWorld-V2/releases/tag/v2026.06.24)

OSWorld 2.0 官方任务实现通过 gated Hugging Face task dataset 分发，不直接放在公开 GitHub checkout；完整任务资产也只在 gated 数据集。名为 `xlangai/osworld_v2_assets` 的公开 dataset 仅含需匿名访问的 runtime assets，并非完整任务资产。任务实施、评测器或答案细节未公开可浏览，不应把 Hugging Face 的 gated 请求流程说成数据完全开放。[官方 gated task/asset 说明](https://github.com/xlang-ai/OSWorld-V2)

## 访问状态

`dataAccess.url` 与样例访问入口现直达官方 gated `xlangai/osworld_v2_tasks`；完整资产另由 `xlangai/osworld_v2_assets_gated` 提供。下载须接受 HF 条款，首发 2.0 release 与当前 v2.1 分开固定。[gated task classes](https://huggingface.co/datasets/xlangai/osworld_v2_tasks)；[gated assets](https://huggingface.co/datasets/xlangai/osworld_v2_assets_gated)；[2026-06-24 首发 release](https://github.com/xlang-ai/OSWorld-V2/releases/tag/v2026.06.24)

## 数据/代码/媒体许可与使用边界

- OSWorld-V2 GitHub 仓库标注 Apache-2.0，适用于仓库中由该许可覆盖的代码与文件；它不自动授予 gated task/asset 数据或第三方网站材料的公开转载许可。[官方 LICENSE](https://github.com/xlang-ai/OSWorld-V2/blob/main/LICENSE)
- 任务实现和完整 assets gated，已公开的 runtime asset repo 也只是子集。本站不复制 task instructions、task classes、assets、ground truth、评估器或执行轨迹；只链接官方 release、论文和 repo。
- 不从任务运行截图、应用 UI 或模拟站点内容推导图像/品牌资产授权；任何具体媒体转载许可须分别核验。

## 官方样例与是否可在公开 GitHub Pages 转载

首发公告公开了任务数量和数据集入口，但正式任务文件经 gated access 分发。**本站不转载题目、评估器、资产、轨迹或页面截图**。可以链接公开 README/release；对于可见的公开轨迹或 viewer 内容，本次未发现覆盖再发布的独立许可。[官方 release](https://github.com/xlang-ai/OSWorld-V2/releases/tag/v2026.06.24)；[官方访问说明](https://github.com/xlang-ai/OSWorld-V2)

## 指标

该基准以任务完成评估为核心。官方代码为每项任务提供 evaluator；论文与发布结果必须结合任务版本、agent、provider 和执行配置解释。首发论文的任务中位人工完成时长及示例模型调用数不是成绩指标。本文不录入模型成绩，当前推荐版的结果不能与首发 release 默认视作相同评测集。[论文](https://arxiv.org/abs/2606.29537)；[官方版本清单](https://github.com/xlang-ai/OSWorld-V2/blob/main/benchmark_releases/README.md)

## 版本关系

- **首发 OSWorld 2.0**：release `osworld-v2-2026.06.24`，108 tasks。
- **后续版本**：`osworld-v2-2026.08.08` 更新了代码、任务、assets、mock websites；`osworld-v2.1` 于 2026-09-16 作为新的 bug-fix release 发布，并被标为 active/recommended。
- 1.0 与 2.0 的任务格式和来源不同：v1 为 JSON task files，v2 官方 task class 作为 gated Python 文件分发。不可混用任务、assets、网站或镜像，也不可把初版 108 题与后续版本成绩混称同一固定集。[官方版本清单](https://github.com/xlang-ai/OSWorld-V2/blob/main/benchmark_releases/README.md)；[迁移指南](https://github.com/xlang-ai/OSWorld-V2/blob/main/docs/MIGRATING_FROM_OSWORLD_V1.md)

## 官方来源按角色分组

- 论文与任务设计：[OSWorld 2.0 arXiv](https://arxiv.org/abs/2606.29537)
- 评测代码、访问要求和运行环境：[XLANG Lab 官方 GitHub](https://github.com/xlang-ai/OSWorld-V2)
- release 标签与状态：[Benchmark Releases](https://github.com/xlang-ai/OSWorld-V2/blob/main/benchmark_releases/README.md)
- 首发版本信息：[2026-06-24 release](https://github.com/xlang-ai/OSWorld-V2/releases/tag/v2026.06.24)

## 模型发布引用

OpenAI GPT-5.6 发布材料披露其 OSWorld 2.0 成绩，但这里只记录 benchmark 身份、版本和方法边界，不采用或核验厂商分数。[OpenAI GPT-5.6 发布说明](https://openai.com/index/gpt-5-6/)

## 未核实项

- 首发 release 的 108 项与后续 2.1 的任务总量差异、逐题增删未在本报告重算；不同 release 需按官方 manifest 和任务哈希复核。
- Gated task class、完整 assets 和轨迹内容未下载/逐条检查，故不陈述题面字段、任务分布或其各自许可。
- 各 provider 的镜像、并行数、agent 工具配置和任务成绩未复现。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方论文、仓库和 release manifest 支撑 OSWorld 2.0 的用途、首发 108 题和版本边界。2.0 数据与完整 assets gated；初版和当前推荐 2.1 必须按 release 分开，本站仅链接，不复制题目或轨迹。
