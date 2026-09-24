# SWE-bench Pro

核验日期：2026-09-23。

## 官方身份

SWE-bench Pro 是 Scale AI 发布的软件工程 agent 基准，论文标题为 *SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?*。它受 SWE-bench 启发，但不是 SWE-bench 原始集或 Verified 子集。当前官方仓库在 2026-09-22 发布 V2，Hugging Face `default` 指向 V2；引用旧结果时必须辨明其使用 V1、V2，或论文中不可公开访问的商业集。[Scale AI 官方仓库](https://github.com/scaleapi/SWE-bench_Pro-os)；[论文](https://arxiv.org/abs/2509.16941)；[官方数据卡](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)

## 官方定义与忠实中文概述

该基准衡量模型/agent 能否处理较长程的软件工程问题：从指定版本的真实代码库和 issue/PR 说明出发，提交能够满足需求的代码补丁，并通过任务测试。V1 论文所述全基准有 1,865 个问题、分布在 41 个仓库，其中 11 仓库构成公开集，另有 12 个 held-out 仓库和 18 个商业合作仓库；这不是 V2 的公开题数。V2 是经验证的公开部分，642 题来自 11 个仓库。[论文摘要](https://arxiv.org/abs/2509.16941)；[V2 发布说明](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)

## 任务输入/输出/环境

- V2 每项任务给 agent 一个固定 base commit 的代码仓库，以及由 PR 描述、要求和接口说明组成的 `instruction.md`；agent 输出代码差异补丁。
- Harbor 任务目录把运行配置、容器环境、参考解法和 verifier 分开。verifier 执行 fail-to-pass 与 pass-to-pass 测试，检查目标行为得到修复且既有行为未回归。[V2 目录与协议](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)
- V2 官方锁定协议将 agent 阶段的网络限制为模型端点、禁用网页搜索/抓取工具，并在全新沙箱重放最终 diff 后评分；每题预算 50 分钟。官方也提供 locked Codex、Claude Code 与 mini-SWE-agent 的 scaffold 示例。此协议/agent scaffold 是评测运行方式，不等同于任务数据本身；非该锁定协议的成绩需明确写出 agent harness、模型工具、网络策略、预算和重评分方式。

## 数据规模/split/字段/文件

- V1：731 个公开问题，官方保留为 Hugging Face `v1` config / `v1.0` tag。论文另述全基准 1,865 项，包括公开、held-out 与商业集合；后两者不等同于可下载的 731 项公开集。[论文](https://arxiv.org/abs/2509.16941)；[V1/V2 版本说明](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)
- V2：2026-09-22 起为 `default` config，test split 共 642 项，分布在 Go 256、Python 237、JavaScript 145、TypeScript 4 项；`hard` config 为 51 项 HARD-51 子集。官方称 V2 从 V1 删除 89 个无效或无法修复的测试任务；重写 529 条说明，并修订了部分测试列表、214 个 test patch、38 个 gold patch 及 211 个镜像依赖。[官方数据卡](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)；[V2 发布说明](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)
- V2 数据卡字段包括 `repo`、`instance_id`、`base_commit`、`patch`、`test_patch`、`problem_statement`、`requirements`、`interface`、`repo_language`、`fail_to_pass`、`pass_to_pass`、镜像字段、`hard` 与 `version`。任务目录另含 `instruction.md`、`task.toml`、Dockerfile、参考方案和 verifier 文件。字段和列名会随 V1/V2 改变，复现实验应固定配置、数据 revision 和仓库 tag。

## 访问状态

V1 的 731 题与 V2 的 642 题、任务目录、容器镜像及评测代码均由 Scale AI 公开提供；HARD-51 可作为 V2 `hard` config 取得。论文所述 held-out 12 仓库与商业 18 仓库并未公开题目，不能将其成绩或总数误报为可下载公开 split。V2 公开镜像为 Linux/amd64；官方说明可匿名拉取。[官方数据卡](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)；[V2 README](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)

## 数据/代码/媒体许可与使用边界

- `SWE-bench_Pro-os` 仓库的 MIT 许可覆盖其软件和文档，不自动授予全部基准内容的统一再发布权。[仓库 LICENSE](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/LICENSE)
- 官方数据卡明确说明 task content（问题说明、patch、tests）来自 11 个上游开源仓库并仍受各自许可证约束。补丁和测试包含上游代码；代码仓库快照、issue/PR 原文也各有来源与权利边界，不能因 Scale 仓库 MIT 或 HF 可下载就推断均可转载。[官方数据卡许可说明](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro#license)
- 本站只写原创概述并链接官方入口；不复制题面、PR 要求、gold patch、test patch、测试内容、仓库快照或运行镜像。逐仓库及逐字段权利链未在本记录中审查。

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库、数据卡和 V2 task tree 提供可查看样例，但任务文件含第三方项目文本/代码、参考解法及测试。当前未确认逐任务的公开页面转载授权，不复制任何原始题面、patch、测试、截图或容器内容。可链接 [Scale AI 官方仓库](https://github.com/scaleapi/SWE-bench_Pro-os) 与[官方数据卡](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)，并用自写的抽象流程说明任务结构。

## 指标

主要结果是 resolved rate：成功解决的任务数除以所报 split 的任务数；论文和官方 leaderboard 还可能区分 public 与 commercial set。V2 官方要求将模型 diff 在 pristine image 中重新评分，并报告重评分结果；协议版 agent 运行结果与未锁定 harness 的结果不应只按同一 benchmark 名称直接横比。引用分数需注明 V1/V2、split/config、任务数、模型与 scaffold、工具权限/网络策略、时间预算及 grader。[V2 锁定协议](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)；[官方排行榜](https://scale.com/leaderboard/swe_bench_pro_public)

## 版本关系

SWE-bench Pro 是独立于 Princeton/SWE-bench 的基准。其 V1 有 731 个公开样本；论文所述总数 1,865 包含无法公开的集合。2026-09-22 发布的 V2 将公开集调整为 642 题、重写部分任务说明并修复测试和镜像；HARD-51 是按特定五个模型家族在锁定协议下失败情况筛出的 V2 子集。HF 数据卡目前把 V2 设为 `default`，而 V1 通过 `v1` config 保留。历史结果必须按原始版本引用，不可将 V1 分数改标为 V2。[V2 更新记录](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro#changelog)；[官方 V2 README](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)

## 官方来源按角色分组

- **定义、首发规模和公开/私有集合边界：**[Scale AI 论文](https://arxiv.org/abs/2509.16941)。
- **当前 V2 任务文件、协议、版本变更和评测脚手架：**[Scale AI 官方仓库 V2 README](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/v2/README.md)。
- **当前 HF config、字段、V1/V2 数量与第三方数据权利声明：**[Scale AI 官方数据卡](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)。
- **代码许可：**[官方仓库 MIT LICENSE](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/LICENSE)。
- **公开集 leaderboard：**[Scale AI leaderboard](https://scale.com/leaderboard/swe_bench_pro_public)。

## 模型发布引用

模型发布中出现“SWE-bench Pro”不表示使用同一版本或运行协议。尤其是 2026-09-22 之前的发布通常对应 V1 或论文时期结果；当前 HF 默认 config 已是 V2。引用须保留原始来源对版本、split、harness、agent scaffold、工具访问、时限和 resolved-rate 分母的说明；没有这些细节时标记为厂商报告快照，不反推当前 V2 成绩。

## 未核实项

- 未逐一核查 11 个上游仓库在题面、gold patch、测试 patch 和仓库快照层面的具体许可及平台内容条款；因此不建议本站转载原始任务材料。
- 本次没有重新执行官方 Harbor 评测或校验所有 642 个镜像；文中 release gate 结果是 Scale 官方对 V2 发布所作的说明。
- 论文和 README 的历史实验配置不必然等同当前 leaderboard 默认 harness；各模型具体使用的 scaffold 与调用参数仍须回到相应提交记录核对。

## 研究结论

**PASS_WITH_LIMITATIONS** — 第一方资料确认 Scale AI SWE-bench Pro 的论文范围、V1/V2/HARD-51 关系、公开题数、V2 任务字段、锁定 agent 协议及官方 harness。代码 MIT 不覆盖全部第三方问题、patch、测试与仓库材料；本站只链接官方资源，不转载原始样本。
