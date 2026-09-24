# PaperBench

核验日期：2026-09-23

## 官方身份

PaperBench 由 OpenAI 发布，用来衡量 AI agent 从零复现 AI 研究的能力。官方发布页日期为 2025-04-02；论文标题为 *PaperBench: Evaluating AI’s Ability to Replicate AI Research*。[OpenAI 发布页](https://openai.com/index/paperbench/)；[论文](https://arxiv.org/abs/2504.01848)

## 官方定义与忠实中文概述

基准要求 agent 复现 ICML 2024 的 20 篇 Spotlight / Oral 论文，含理解论文贡献、实现代码并执行实验。每篇论文配有与论文作者协作开发的层级 rubric；总计 8,316 个可单独评分子任务。完整评测包括 agent 构建提交、在新容器中执行提交、按 rubric 自动评分三阶段。[OpenAI 发布页](https://openai.com/index/paperbench/)；[官方仓库 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)

## 任务输入/输出/环境

- 输入：一篇研究论文及其复现 rubric、addendum 和配套资产；仓库还可能包含禁止参考来源清单及配置文件。
- 输出：agent 创建的复现代码库；它在隔离的后续容器执行，所得代码/实验产物由 LLM judge 对照分层 rubric 打分。
- 环境：agent rollout、提交执行、judge 分阶段隔离；正式复现需要 GPU 环境，agent 可用工具由 solver 配置决定。官方 README 给出的一个 canonical GPT-5 配置包含 web_search、高 reasoning effort 和 24 小时时限，这只是一个运行配置，不是 benchmark 固定条件。[官方 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)

## 数据规模/split/字段/文件

- 公开任务总体为 20 篇 ICML 2024 Spotlight / Oral 论文、8,316 个可评分 rubric 节点；每篇目录可含论文 PDF/Markdown、作者补充说明、assets、`rubric.json`、`blacklist.txt`、`config.yaml`，以及可选 judge addendum。[论文](https://arxiv.org/abs/2504.01848)；[官方 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)
- 官方实现存在 `debug`、`dev`、`all` 等 paper split；Code-Dev 是另一个较轻变体，只评分代码开发要求，跳过复现执行与结果匹配要求。不能把 Code-Dev 结果与完整 PaperBench 当同一个评测设置。[官方 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)
- 不把某个 run 的模型、工具、token budget 或 judge 版本当作固定基准定义；重跑需记录 split、agent harness、执行资源和 grader 配置。

## 访问状态

官方代码仓库公开；数据通过 Git LFS 获取。完整复现可能需要 Docker/GPU、OpenAI API key、Hugging Face token，部分任务依赖受控数据（README 点名 ImageNet、Llama 2）或外部 API。JudgeEval 某些 tarball 不能自动再分发，需按官方工具单独生成。[官方 README：data/setup](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)

## 数据/代码/媒体许可与使用边界

本次核验到仓库公开及 Git LFS 获取说明，但没有从所查 PaperBench 一手页面确认所有论文 PDF、图像资产、rubric 和第三方数据的统一再分发许可。仓库首页显示的代码许可不能自动推及这些组成数据。故本站不复制题目、rubric、论文资产或样例；只链接官方来源，等待逐项许可核查。[官方仓库](https://github.com/openai/frontier-evals)

## 官方样例与是否可在公开 GitHub Pages 转载

官方仓库包含按论文组织的任务目录及 rubric；判定为**暂不可站内转载样例**：没有确认数据/论文资产的统一再分发许可，而且有部分数据/材料不能自动再分发。可链接 PaperBench 官方仓库或论文，不镜像文件。[官方 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)

## 指标

完整 PaperBench 使用 rubric 子任务得分汇总成 replication score（百分比）；官方实现也提供 judge 输出。Code-Dev 只计代码开发要求，省略执行和结果匹配部分。比较结果必须注明变体、split、agent/time limit、run 数及评分配置；此处不抄录模型成绩。[官方发布页](https://openai.com/index/paperbench/)；[官方 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)

## 版本关系

当前所核为 2025 年发布的 PaperBench；仓库另列 PaperBench Code-Dev 和辅助 judge evaluation JudgeEval。Code-Dev 是明确降低严格度的变体，不与完整版本混名；仓库当前 main 内容可能演进，具体复现实验应固定 commit 与数据 split。[官方 README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)

## 官方来源按角色分组

- **发布与定义**：[OpenAI 发布页](https://openai.com/index/paperbench/)（2025-04-02）。
- **方法论文**：[arXiv:2504.01848](https://arxiv.org/abs/2504.01848)。
- **实现/数据说明**：[OpenAI Frontier Evals PaperBench README](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)。
- **代码仓库**：[openai/frontier-evals](https://github.com/openai/frontier-evals)，MIT repository badge 不足以证明其中所有 benchmark 内容与第三方素材均可转载。

## 模型发布引用

- **Kimi K2.5**：Moonshot 官方 README 的 Evaluation Results 表列有 `PaperBench`，这是 Moonshot 的模型结果报告，不是 PaperBench 定义或独立 leaderboard。[Kimi K2.5 官方 README](https://github.com/MoonshotAI/Kimi-K2.5)
- **MiniMax M3**：MiniMax 官方评测方法页称使用 Claude Code + Ralph-Loop 跑 12 小时，并以 Opus-4.6 评分；这是厂商自报设置。不能将其视为 PaperBench 官方配置或独立成绩表。[MiniMax M3 官方评测方法](https://www.minimax.io/blog/minimax-m3)
- **Qwen3.8-Max**：Qwen 官方模型卡列有 PaperBench，并注明 agent、judge 与重复运行设置；同样只作为厂商报告。[Qwen3.8-Max 官方模型卡](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)

## 未核实项

- 各文件/资产的逐项许可与第三方权利未逐项审查；未确认统一数据许可。
- Kimi K2.5 发布表与 MiniMax M3 方法页的具体结果条件不等同官方评测默认条件；本条不转录分数。
- 发布页报告 8,316 rubric 节点；不同后续仓库快照中数据和 split 的具体内容需要以 commit 固定后再确认。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方身份、定义、任务和评分结构均由 OpenAI 第一方页面、论文及仓库支持；数据文件复用权利未确认为统一开放许可，因此候选不含站内样例。
