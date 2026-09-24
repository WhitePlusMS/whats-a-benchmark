# CursorBench 4.0

核验日期：2026-09-23。

## 官方身份

CursorBench 4.0 是 Cursor（Anysphere）在其官方模型评估页发布的内部 coding-agent 评测版本。官方当前公开页面介绍它用于评估来自真实 Cursor 会话的模糊、多文件任务，并公布模型 Score、成本、token 与步骤数据。[CursorBench 4.0 官方页面](https://cursor.com/cursorbench)

## 官方定义与忠实中文概述

官方称 4.0 评估来自真实 Cursor 会话的多文件、存在歧义的任务。2026-09-10 的官方 changelog 说明 4.0 引入较长周期任务，聚焦编辑、重构、调查、意图理解、作业管理和设计遵循。[官方 CursorBench 页面](https://cursor.com/cursorbench)

## 任务输入/输出/环境

- 按官方公开定义，任务来自真实 Cursor 会话，并涉及多文件工作；agent 面对开发者任务后进行代码库操作。公开 4.0 页面没有披露具体 task prompt、repo snapshot、可用工具、任务终止条件、grader 细节或逐题输入输出格式。[官方 4.0 页面](https://cursor.com/cursorbench)
- Cursor 2026-03 官方研究博文对早前 CursorBench 版本说明：基于内部 eval，任务由真实会话及 Cursor Blame 等内部流程形成 query / ground-truth 配对，采用 agentic graders。该博文明确当时现行版本为 3.1；其中方法细节不能直接认定为 4.0 的完整协议。[Cursor 官方研究博文](https://cursor.com/blog/cursorbench)

## 数据规模/split/字段/文件

- CursorBench 4.0 官方页面没有披露题目数、split、逐任务字段、仓库清单或数据文件；也没有发布可下载任务集。页面公开模型级 Score、Cost、Tokens、Steps。[官方 4.0 页面](https://cursor.com/cursorbench)
- 因任务数据未公开，本报告不填补未披露规模，不从榜单行数推断任务数或 split。

## 访问状态

可以公开访问 CursorBench 4.0 的说明、changelog 和模型结果表；未见官方公开 benchmark task 数据或独立复现包。官方将其称为内部 eval suite。页面榜单是可引用的结果来源，不代表可获取任务数据。[官方 4.0 页面](https://cursor.com/cursorbench)；[Cursor 官方研究博文](https://cursor.com/blog/cursorbench)

## 数据/代码/媒体许可与使用边界

- 本次在官方 4.0 页面及解释博文中未发现任务数据/任务仓库的公开许可证；任务被描述为内部评测，不能推定页面公开即允许复制任务、会话、代码库或评测材料。[官方 4.0 页面](https://cursor.com/cursorbench)；[官方研究博文](https://cursor.com/blog/cursorbench)
- 对外页面可介绍 benchmark 并链接 Cursor 官方来源；不转载任务 prompt、代码库内容、运行轨迹或页面截图。单纯引用文字结果时注明 Cursor 官方报告、版本与核验日期；逐项榜单数字会变化，引用前需重新核对。[官方 4.0 页面](https://cursor.com/cursorbench)

## 官方样例与是否可在公开 GitHub Pages 转载

没有发现公开任务样例或任务包。CursorBench 页面有动态结果表，但不含可公开复用的任务数据授权。公开 Pages 仅使用自己的简要概述并链接官方页面；不要重印内部任务、模型会话或代码片段。若展示成绩，应保留准确版本与日期，且不将模型厂商自身对 CursorBench 的提及当成基准方验证。[官方 4.0 页面](https://cursor.com/cursorbench)

## 指标

官方结果表列出 Score（越高越好）、Cost、Tokens 和 Steps；成本按模型公开的每百万 token 价格（含 input、cache read、cache write、output）乘以任务 token 使用量计算。Cursor 提醒结果有方差，小幅分差未必具有统计意义。4.0 的 Score 精确定义、逐任务聚合方式、样本数和置信区间未在页面说明，不能擅自称为特定通过率或 accuracy。[官方 4.0 页面](https://cursor.com/cursorbench)

## 版本关系

官方 changelog 记载 2026-03-11 发布 CursorBench 3.0、2026-05-19 发布 3.1、2026-07-08 发布 3.2，2026-09-10 引入 4.0。版本之间任务分布发生变化，成绩应只在同版本内比较；结果页也注明小分差可能在方差范围内。[官方 CursorBench changelog](https://cursor.com/cursorbench)

## 官方来源按角色分组

- 4.0 当前定义、结果表、成本口径与版本 changelog：[CursorBench 4.0](https://cursor.com/cursorbench)
- 内部评估背景及 3.1 历史方法说明（不能等同于 4.0 协议）：[How we compare model quality in Cursor](https://cursor.com/blog/cursorbench)

## 模型发布引用

官方 4.0 页面自身发布了模型结果。模型厂商的新闻稿或报告若引用 CursorBench，均属模型厂商自报；应与 Cursor 原始结果页分开记录，并核对模型精确版本、推理强度、Score、成本、token、步骤和页面日期。本报告不抄录动态榜单分数。

## 未核实项

- 官方没有公开 CursorBench 4.0 全量任务、task 数量、split、repo snapshot、grader、逐题结果或统计区间。
- 官方早期研究博文讨论 3.1；是否以及哪些 grader、任务生成和内部会话采集细节沿用到 4.0 未披露。
- 任务材料和网页媒体的再分发许可未发现；没有对 Cursor 服务条款作针对 benchmark 内容的法律解释。
- 官网排行榜持续更新；本文不保存可复现的榜单快照，也不陈述任何当前模型排名。

## 研究结论

**PASS_WITH_LIMITATIONS** — 4.0 的官方身份、当前任务概述、版本日期及公开 score/cost/token/step 指标均可核验。任务集和详细协议仍属未公开信息；GitHub Pages 只作介绍与官方链接，不转载任务或运行材料，动态成绩引用需另存快照。
