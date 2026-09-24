# Agents’ Last Exam（ALE）

核验日期：2026-09-23

## 官方身份

ALE 是 UC Berkeley RDI 与 RDI Foundation 牵头的开放式智能体评测框架及持续扩展的专业工作流 benchmark。论文将其定义为覆盖非体力行业、长时程且结果可核验的真实工作任务；不是单一静态题集或单一排行榜。[论文摘要与引言](https://arxiv.org/abs/2606.05405#L3-L5)；[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L178-L196)

## 官方定义与忠实中文概述

论文称 ALE 面向真实且具有经济价值的专业任务，任务结果由隐藏参考答案和可执行 grader 验证，按 55 个子领域归入 13 个行业簇，并与 O*NET / SOC 2018 对照。[论文摘要](https://arxiv.org/abs/2606.05405#L3-L5) 仓库介绍当前公开框架包含约 150 个公开任务；论文总体描述则为 1,000+ 任务，因此两者是“研究语料总体规模”与“当前公开子集”两个口径，不能混为可下载样本数。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L185-L196)

评测把任务说明交给完整 agent harness，在真实机器式沙箱内自行操作；任务结束后才装入隐藏参考并评分产物。一个实验配置由 agent、环境和 task 组成，任务以可执行 `main.py` 表达说明、输入和隐藏参考，grader 的 `evaluate()` 返回 0–1 分。[官方仓库 README：How ALE works](https://github.com/rdi-berkeley/agents-last-exam#L227-L242)

## 任务输入/输出/环境

- 输入：任务指令及阶段化的任务文件/数据；不同任务所需软件和上下文依任务而定。隐藏参考不在 agent 作答前提供。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L227-L242)
- 输出：agent 在沙箱中留下的文件或其他产物，以及可回放轨迹、日志和 grader 结果；单个 task 分数范围为 0–1。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L233-L242)
- 环境：Windows 或 Linux 的机器式工作区；官方列有云 VM、QEMU/KVM、AWS、阿里云、Docker（较小 Ubuntu 子集）及既有 CUA 沙箱等 provider。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L199-L223)

## 数据规模/split/字段/文件

- 公开量：仓库称约 150 个公开任务，分布在 55 个子领域；论文称总体为 1K+ tasks。公开 Task Gallery 提供示例任务，并标注 `ALE-V1, 2026/06` benchmark split。[仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L185-L196)；[官方 Task Gallery](https://agents-last-exam.org/demo#L4-L8)
- split：官方运行入口提供 `near-term`、`full-spectrum`、`last-exam` 三个难度 task lists，另有 provider-specific 与 `unlicensed` 子集；不能假设每个 split 任务都能在任意沙箱运行。[仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L246-L249)
- 任务文件：官方说明 task 是 `main.py` 可执行单元，含 instruction、input data、hidden reference 及 grader；完整字段 schema 应按仓库当前任务实现读取，本文不从个别任务外推统一 JSON 字段。[仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L230-L242)
- 官方网页可查看样例任务/结果；完整总体语料是否公开、是否在未来持续增长，官方称为 living benchmark，规模可能变化。[论文摘要](https://arxiv.org/abs/2606.05405#L4-L5)；[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L196-L196)

## 访问状态

代码与约 150 个公开 task 可从官方 GitHub 仓库访问；官方 Task Gallery 可浏览示例及结果。运行需自行配置 agent、沙箱 provider 和任务依赖，完整云端运行通常还需要对应云服务/凭据。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L196-L210)；[官方 Task Gallery](https://agents-last-exam.org/demo#L4-L17)

## 数据/代码/媒体许可与使用边界

- 官方仓库按组件明确：框架软件 Apache-2.0；`tasks/`、`selected_tasks/`、`sample_run/` 等 benchmark content 为 CC BY 4.0。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L258-L263)
- 官方网站同样声明 dataset 为 CC BY 4.0、code 为 Apache-2.0，并链接 contributor terms。[官方 Docs 首页](https://agents-last-exam.org/docs#L18-L20)
- 公开 GH Pages 可转载许可范围内的 task 片段，需遵守 CC BY 4.0 的署名、许可链接和改动标识要求；逐项排除官方标为 `unlicensed` 的内容。媒体资源没有在所查官方许可声明中单列权利，故不据此授权转载图像/截图。保守做法是展示自制说明并链接官方 Task Gallery。[官方仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L246-L263)；[官方 Docs 首页](https://agents-last-exam.org/docs#L18-L20)

## 官方样例与是否可在公开 GitHub Pages 转载

官方 Task Gallery 是可访问的样例入口，当前标记 ALE-V1（2026/06）；仓库还有 `sample_run/` 样例内容。[Task Gallery](https://agents-last-exam.org/demo#L4-L8)；[仓库许可范围](https://github.com/rdi-berkeley/agents-last-exam#L258-L263) **结论：可在符合 CC BY 4.0 署名条件并逐项检查状态后转载已许可数据文本；未单列许可的媒体与 `unlicensed` 任务不转载。**推荐直接链接官方原样例，若本站展示任务文本需附作者/项目、原始链接、许可及改动说明。

## 指标

grader 为每任务产出 `[0,1]` 分值；官方任务/结果系统另按 run 汇总。论文摘要报告 hardest tier 主流 harness/backbone 配置的平均 full-pass rate 为 2.6%，这是论文中指定实验范围的结果，不是 ALE 固定指标或永久榜单成绩。[论文摘要](https://arxiv.org/abs/2606.05405#L4-L5)；[仓库 README](https://github.com/rdi-berkeley/agents-last-exam#L233-L242)

## 版本关系

ALE 是持续增补的 living benchmark。当前官方 Task Gallery 标识 `ALE-V1, 2026/06`；论文说明任务池会随新工作流和行业接入而增长。跨日期结果需记录具体 split、任务清单、环境镜像、agent harness 与模型，不能仅写“ALE”。[论文摘要](https://arxiv.org/abs/2606.05405#L4-L5)；[Task Gallery](https://agents-last-exam.org/demo#L4-L8)

## 官方来源按角色分组

- **定义/方法论文**：[arXiv:2606.05405](https://arxiv.org/abs/2606.05405#L3-L5)，摘要/正文，定义、覆盖规模与 living benchmark 特性。
- **代码/数据及许可**：[官方 GitHub README](https://github.com/rdi-berkeley/agents-last-exam#L185-L196)（定位 lines 185–196、227–263），公开规模、任务机制、环境及许可。
- **样例入口/当前 split**：[官方 Task Gallery](https://agents-last-exam.org/demo#L4-L8)，ALE-V1, 2026/06。
- **官方文档与贡献许可**：[Docs 首页](https://agents-last-exam.org/docs#L18-L20)，研究项目身份和 dataset/code 许可。

## 模型发布引用

本条以 ALE 官方论文、仓库、任务页为 benchmark 事实来源。暂未在本轮核验到需要引用的模型厂商发布报告；官方 leaderboard 是更直接的结果来源，应按具体配置单独记录。[官方仓库 leaderboard/task gallery 指引](https://github.com/rdi-berkeley/agents-last-exam#L246-L249)

## 未核实项

- 论文总体 1K+ tasks 与仓库公开约 150 tasks 的精确版本对应清单/完整私有题数未核实；不得将总体规模写成全量公开规模。
- 每个 task 的文件字段、操作系统/软件依赖、许可例外和 grader 语义需要按所选 task 逐项核验；此页仅记录官方共性定义。
- 当前 GitHub Pages 对所有许可任务的逐字转载边界、图片/截图媒体权利未逐项法律审查；不可将数据 CC BY 推及第三方素材。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方身份、机制、公开规模、split 名称、访问入口和代码/数据许可均有第一方来源；全量任务可得性、逐任务环境/权利和媒体许可仍需逐项检查。
