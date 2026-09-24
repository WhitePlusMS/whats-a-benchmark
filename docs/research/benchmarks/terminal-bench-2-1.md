# Terminal-Bench 2.1

核验日期：2026-09-23

## 官方身份

Terminal-Bench 由 Terminal-Bench 团队与 Harbor 生态发布。官方 2.1 公告标题明确称其为 2.0 的修订版，并写明修复 89 个 2.0 tasks 中的 28 个；官方专用仓库称 2.1 是更经验证的 2.0 迭代版。它是明确版本数据集，不应与 2.0 或 4.0 合并成一个无版本条目。[官方公告](https://www.tbench.ai/news/terminal-bench-2-1)；[2.1 仓库 README](https://github.com/harbor-framework/terminal-bench-2-1)

## 官方定义与忠实中文概述

Terminal-Bench 是在容器任务环境中测量 agent 完成有价值、复杂工作的 benchmark collection。2.1 针对 2.0 任务的问题做了修订，包括外部依赖漂移、资源不足或不匹配，以及提示与 verifier 不一致等。官网公告说变更 28 项，专用仓库 README 说修改 26 项；两者存在数字不一致，暂不自行调和。[官方 2.1 公告](https://www.tbench.ai/news/terminal-bench-2-1)；[官方 2.1 仓库](https://github.com/harbor-framework/terminal-bench-2-1)

## 任务输入/输出/环境

- 输入：容器化终端任务的 prompt、工作目录和依赖环境；具体输入随任务变化。[官方 2.1 仓库 README](https://github.com/harbor-framework/terminal-bench-2-1)
- 输出：agent 在容器任务中产生的工作结果，由 task-specific verifier 检查。排行榜成绩还依赖 agent harness、模型、资源、trial 次数与 Harbor 运行环境。[官方运行说明](https://www.tbench.ai/run)
- 环境：通过 Harbor Hub 数据标识 `terminal-bench/terminal-bench-2-1` 运行；官方提交流程要求每 task 至少 5 次 trial 并公开上传 job。README 当时说明社区 leaderboard submissions 关闭，提交状态可能变化。[官方 2.1 仓库 README](https://github.com/harbor-framework/terminal-bench-2-1)

## 数据规模/split/字段/文件

- 2.1 公告明确基于 2.0 共 89 tasks；公告列举三类变更及具体 task 名。专用 README 说 26 tasks 修改；官网公告说 28 tasks。应把这理解为 2.1 与 2.0 同 roster 的修订关系，变更计数冲突保留待核验，不能写成新增 28 项或独立全新 89 项。[2.1 公告](https://www.tbench.ai/news/terminal-bench-2-1)；[README](https://github.com/harbor-framework/terminal-bench-2-1)
- task 内容在仓库 `tasks/`，数据包由 Harbor Hub 发布；具体字段/逐 task 文件 schema 应以固定数据包与对应 README 为准，本研究未下载全量包，不虚构统一字段清单。[GitHub 仓库](https://github.com/harbor-framework/terminal-bench-2-1)；[Harbor Hub 2.1](https://hub.harborframework.com/datasets/terminal-bench/terminal-bench-2-1/latest)

## 访问状态

官方仓库、leaderboard 和 Harbor Hub 数据集入口公开；运行需 Harbor、容器/云 sandbox 和模型接口。没有在本轮下载数据、运行任务或核验逐 task 许可证。[官方 README](https://github.com/harbor-framework/terminal-bench-2-1)；[Harbor Hub 数据集](https://hub.harborframework.com/datasets/terminal-bench/terminal-bench-2-1/latest)

## 数据/代码/媒体许可与使用边界

2.1 GitHub 仓库显示 Apache-2.0，但官方公告和任务页有“benchmark data must never appear in training corpora” canary。仓库许可证不能自动确立每个 task、第三方材料和数据集 bundle 的转载范围；本站只链接官方数据集，不复制题面、解法、测试或截图。[仓库 LICENSE/README](https://github.com/harbor-framework/terminal-bench-2-1)；[官方 2.1 公告](https://www.tbench.ai/news/terminal-bench-2-1)

## 官方样例与是否可在公开 GitHub Pages 转载

任务目录和 Harbor Hub 是官方浏览/访问入口。考虑 canary、防训练污染要求以及未逐项确认第三方材料权限，**本站不转载 task 文件、oracle、test、trajectory 或排行榜图像**；可以引用版本变更事实并链接官方公告/仓库/Hub。[官方公告](https://www.tbench.ai/news/terminal-bench-2-1)；[官方数据仓库](https://github.com/harbor-framework/terminal-bench-2-1)

## 指标

官方公告图表使用 accuracy 对比 2.0 与 2.1；官网 leaderboard 对应任务解题比例/通过率。以 verifier 通过计任务成功，再按 leaderboard 指定的 agent、模型、资源及重复配置聚合。官方 README 的提交最低要求是每任务 5 trials；厂商卡片中的其他 harness 或 trial 策略不等于该最低要求下的完全同配置成绩。[官方公告](https://www.tbench.ai/news/terminal-bench-2-1)；[官方 README](https://github.com/harbor-framework/terminal-bench-2-1)

## 版本关系

**和 2.0：**2.1 是直接修订分支，官方公告称修复原 89 项中的 28 项；仓库 README 数为 26 项，差异未解。**和 4.0：**4.0 是后续持续 benchmark 的新 major release；官方说明 4.0 相对前版删 8 项、改 19 项并调整 agent 资源，属于需重跑的 breaking change。2.1、2.0、4.0 共享 Terminal-Bench 家族，但有独立数据版本与任务状态，不能仅凭相同名称或 agent leaderboard 关系合并。项目中 `terminal-bench-2` 应关联本条，`terminal-bench-4` 也可作后续系列关系，保留三个 ID。[2.1 公告](https://www.tbench.ai/news/terminal-bench-2-1)；[4.0 版本说明](https://www.tbench.ai/news/terminal-bench-4-0)

## 官方来源按角色分组

- **定义/版本说明**：[Terminal-Bench 2.1 官方公告](https://www.tbench.ai/news/terminal-bench-2-1)，官网 news index 标注发布日期 2026-05-06。
- **任务仓库、运行方式及 Harbor 标识**：[官方 2.1 GitHub repository](https://github.com/harbor-framework/terminal-bench-2-1)。
- **任务包访问**：[Harbor Hub 2.1 dataset](https://hub.harborframework.com/datasets/terminal-bench/terminal-bench-2-1/latest)。
- **论文**：[Terminal-Bench 论文 arXiv:2601.11868](https://arxiv.org/abs/2601.11868)；2.1 仓库引用该 benchmark 论文，具体 revision 事实优先取公告与 2.1 README。
- **后续版本**：[Terminal-Bench 4.0 官方说明](https://www.tbench.ai/news/terminal-bench-4-0)。

## 模型发布引用

Qwen 官方 [Qwen3.8-27B 模型卡](https://huggingface.co/Qwen/Qwen3.8-27B)将结果行命名为 “Terminal Bench 2.1 (Terminus)”；[Qwen3.8-2.4T-A95B 卡](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)列 “Terminal Bench 2.1”，脚注说明其中部分对比来自厂商选取的已发布 harness 成绩，Qwen 自家测试用 Claude Code、avg@10、5 小时时限和 max_tokens 131,072。二者均作为 `vendor-report`，不得当成 benchmark 官方 leaderboard 结果。

GLM-5.3-Flash、DeepSeek-V4.1-Flash、Kimi K3 与 MiniMax M3 的官方发布材料也明确列出 Terminal-Bench 2.1，但分别使用或省略不同 harness、资源和重复运行设置，只作为 `vendor-report`。[GLM-5.3-Flash](https://autoclaw.z.ai/blog/model/glm-5.3-flash/)、[DeepSeek 更新日志](https://api-docs.deepseek.com/updates/)、[Kimi K3](https://github.com/MoonshotAI/Kimi-K3)、[MiniMax M3](https://www.minimax.io/blog/minimax-m3)

StepFun 官方 [Step 5 Preview 发布页](https://www.stepfun.com/step-5-preview)展示的是 **Terminal-Bench v4**，不是 2.1，因此没有登记为本条的 vendor-report；它应指向项目已有 `terminal-bench-4`。

## 未核实项

- 公告“28 tasks changed”与仓库 README“26 tasks modified”不一致。本轮没有比对 2.0、2.1 task manifest/commit diff 来确定统计口径。
- 未确定 2.1 是否曾在家族后续版本之间提供可一一对应的 task ID 或稳定 split；未运行 benchmark。
- 未逐项审查数据包与任务所引用第三方软件、数据或媒体的许可范围。
- Qwen model card 的结果设置/对比来源是厂商陈述；未独立复算或核验 trajectory。

## 研究结论

**PASS_WITH_LIMITATIONS**：第一方公告、2.1 仓库、Hub 和 4.0 官方说明足以确认 2.1 为 2.0 的独立修订版本，且后续 4.0 为另一 major 数据版本。当前站内 75 项中有 `terminal-bench-2` 与 `terminal-bench-4`，没有 2.1；建议独立新增 `terminal-bench-2-1`，明确关联二者。关键未决点是修订 task 计数 26/28 的冲突。
