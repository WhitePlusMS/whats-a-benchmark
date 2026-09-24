# SkillsBench

核验日期：2026-09-23

## 官方身份

SkillsBench 由 SkillsBench Team / BenchFlow 维护，评估智能体如何使用 Agent Skills，并同时考察 skills 的效果与 agent 行为。当前可确认的正式任务快照为 GitHub release `v1.1`（2026-06-16），不要将 2026-02 发布的论文 v1 快照与当前任务清单混为一版。[v1.1 发布说明](https://www.skillsbench.ai/blogs/skillsbench-1-1)；[v1.1 GitHub release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)

## 官方定义与忠实中文概述

SkillsBench 将结构化 skills（指令、脚本和参考材料）挂载到 agent 推理时运行环境中，比较无 skill、使用人工策划 skill，以及特定实验中的 agent 自行生成 skill 等条件下的任务表现。v1.1 将默认题集以 BenchFlow 原生 `task.md` 包形式发布；衡量对象是包含任务、环境、agent harness 和模型的实验配置，而非只对裸模型提问。[SkillsBench v1.1 发布说明](https://www.skillsbench.ai/blogs/skillsbench-1-1)；[官方仓库](https://github.com/benchflow-ai/skillsbench)

## 任务输入/输出/环境

- 输入：任务指令、任务环境文件和可选的任务专属 skill 包；比较组应明确 `no-skill` 或 `with-skill` 等运行模式。[官方 v1.1 release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)
- 输出：agent 在任务环境内留下的结果，由任务自带 verifier 判定；有 skill 运行还记录是否读取/调用了任务专属 skill。[SkillsBench v1.1 发布说明](https://www.skillsbench.ai/blogs/skillsbench-1-1)
- 环境：BenchFlow 任务沙箱及所选 agent harness；仓库默认任务可运行，但部分 `tasks-extra/` 依赖外部凭据或暂不兼容，不能当作默认题集。[官方仓库 README](https://github.com/benchflow-ai/skillsbench)

## 数据规模/split/字段/文件

- v1.1 manifest 固定 87 个 active tasks、8 个专业领域；难度为 easy 6、medium 53、hard 28。任务包按 `task.md`、`environment/`、`oracle/`、`verifier/` 组织；任务快照 pin 在 commit `b63b7b2`。[v1.1 release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)；[官方任务注册表](https://www.skillsbench.ai/tasks)
- 其余带凭据/集成问题的项目收在 `tasks-extra/`，不计入默认 87 项。v1.1 历史 release 同时说明任务清单、摘要与 SHA256 manifest，复现实验应使用该快照而非浮动 main。[v1.1 release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)
- 不把论文初版“86 tasks / 11 domains”等摘要数字套到 v1.1；它们对应先前快照。[早期发布说明](https://www.skillsbench.ai/blogs/introducing-skillsbench)

## 访问状态

官方 v1.1 GitHub release 与任务注册表公开；BenchFlow CLI 可按发布任务运行。实际推理还需可用 agent/model 接口；默认任务和需外部凭据的 `tasks-extra/` 区分明确。本研究没有下载、运行任务或重算排行榜。[v1.1 release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)；[SkillsBench Task Registry](https://www.skillsbench.ai/tasks)

## 数据/代码/媒体许可与使用边界

官方仓库标注 Apache-2.0，release 页也以仓库许可证为准。但任务可能嵌入来源不同的数据或第三方素材；没有逐 task 审核上游权利前，不据仓库 LICENSE 推断所有嵌入内容都可单独转载。官网还展示 benchmark 数据防训练污染提示。此处不把许可范围延伸至独立来源素材。[官方仓库](https://github.com/benchflow-ai/skillsbench)；[官网](https://www.skillsbench.ai/)

## 官方样例与是否可在公开 GitHub Pages 转载

官方 Task Registry 可浏览任务清单和部分任务展示，且 v1.1 仓库公开 task package。没有对具体任务、其内嵌素材及页面抓取/训练污染边界做逐项权利核验，因此**本站只链接官方任务注册表和固定 release，不复制题面、技能包、oracle、verifier 或截图**。Apache-2.0 的仓库级标识不是对第三方素材的独立授权。[官方 Task Registry](https://www.skillsbench.ai/tasks)；[官方仓库](https://github.com/benchflow-ai/skillsbench)

## 指标

发布页使用任务 resolution rate（解决率）；常见成对对比须分开报告 no-skill 与 with-skill，另有 Skill Lift 和 Skill Invocation Rate。官方论文聚合使用 87 任务 roster，每任务最多 3 次 trial；公开 leaderboard 的配置数与论文实验配置数不同。不能仅记录一个分数而省略 harness、模型、skill 条件和 trial 设置。[v1.1 release 说明](https://www.skillsbench.ai/blogs/skillsbench-1-1)；[SkillsBench leaderboard](https://www.skillsbench.ai/)

## 版本关系

本候选应记录 `SkillsBench v1.1`。官方早期发布页明确将其称为历史 paper-v1 snapshot；其早期资料中的 task/domain 数量与当前 registry 不同。复现或引用成绩时固定 v1.1 release、任务 manifest、harness、模型、skill 条件及重复次数。[早期发布说明](https://www.skillsbench.ai/blogs/introducing-skillsbench)；[v1.1 release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)

## 官方来源按角色分组

- **定义/发布**：[SkillsBench v1.1 发布说明](https://www.skillsbench.ai/blogs/skillsbench-1-1)，发布日期 2026-06-16；发布方 SkillsBench Team。
- **版本/数据/任务包**：[固定 v1.1 GitHub release](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1)、[任务注册表](https://www.skillsbench.ai/tasks)。
- **代码与仓库许可证**：[官方仓库 README](https://github.com/benchflow-ai/skillsbench)。
- **论文**：[SkillsBench arXiv 论文](https://arxiv.org/abs/2602.12670)，用于方法和研究实验背景；发布任务快照以 v1.1 release 为准。

## 模型发布引用

Qwen 官方 [Qwen3.8-2.4T-A95B 模型卡](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)列有 SkillsBench 行，并在脚注称其依据公开 v1.1、87 tasks；每任务三次运行取平均，比较对象的 harness 包含 Claude Code、Codex，Qwen 系列用 OpenCode。该卡是 `vendor-report`，只能证明厂商如何报告成绩，不能替代 SkillsBench 定义或独立复测。卡中没有把某一个 benchmark 分数等同于完整复现实验配置之外的通用能力。

## 未核实项

- 本轮没有下载 v1.1 任务包逐项核验内嵌数据来源、单任务许可或 verifier 内容；不产生站内题目样例。
- 早期论文版本与当前 1.1 roster 的完整迁移对照表未在本轮逐条核验；明确以 1.1 release 任务 manifest 为本候选边界。
- 厂商表格的模型版本、harness 和分数只记录其官方卡片所述，不独立复算或背书。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方身份、当前版本、默认任务规模、任务包目录、对照模式和发布方 leaderboard 口径均有第一方依据；具体样例再发布应逐项核权。项目现有 75 项目录中没有 SkillsBench；建议新增独立候选 `skillsbench`，归入 `agents`，不得把它并入通用 agent leaderboard 项。
