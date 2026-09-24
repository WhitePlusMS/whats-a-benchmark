# Vending-Bench 2

核验日期：2026-09-23

## 官方身份

Vending-Bench 2 由 Andon Labs 发布，是评估模型长时程经营模拟生意能力的 benchmark。当前官方评测页有动态 leaderboard；本次核验以 2026-09-23 页面状态为准。[Andon Labs 官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 官方定义与忠实中文概述

Agent 获得一个模拟自动售货机业务，在约一年模拟周期内经营；主要结果是周期末银行余额。第二版在第一版的商业模拟核心上加入更复杂的供货与售后情形，包括供应商欺诈/诱导报价、谈判、配送延误、供应商停止营业、客户退款；并加入笔记/提醒等计划工具。官方页注明可优化的目标及破产终止条件。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 任务输入/输出/环境

- 输入：模拟系统提示及业务环境，起始余额 $500、地点与库存/采购规则；agent 可用邮件联系供应商、采购并管理仓储/机器库存，也可使用网站描述的其他环境工具。
- 输出：agent 的业务操作序列与年度结束时银行余额；若连续 10 天无法支付每天 $2 机器费则提前终止。
- 这是长期多轮 tool-use agent 任务；官方页面称完整一年通常产生 3,000–6,000 条消息。该消息量是发布页的一般描述，并不构成强制的推理、工具调用或 pass@k 协议。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 数据规模/split/字段/文件

- 公开页面提供当前榜单、五次运行均值、余额随模拟天数的曲线、成本对比分组；表格可切换 Frontier/Open/All 与算术/几何均值。榜单为动态页面，不是静态 benchmark 样本清单。[官方评测页](https://andonlabs.com/evals/vending-bench-2)
- 本次所查官方页面未公开声明完整任务数据库、标准 train/dev/test split、统一数据字段或固定题目样本包。其引用信息标年份 2025；页面没有明确的 v2.0 数据快照/tag 号。
- `Vending-Bench Arena` 是新增多 agent 竞争设置的独立变体；不要把 Arena leaderboard 与单 agent Vending-Bench 2 结果混同。[Arena 与 v2 关系说明](https://andonlabs.com/evals/vending-bench-2)

## 访问状态

定义、系统提示说明与实时 leaderboard 可在官方网页公开阅读。本轮未确认到官方固定版本的完整 benchmark 数据包、可独立复现的公开代码仓库或标准提交接口；不能将网页榜单可见等同于数据集可下载/可再分发。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 数据/代码/媒体许可与使用边界

在所查评测页未找到任务数据、仿真内容、系统提示、图表或榜单数据的明确再分发许可。故不转载完整系统提示、数据、成绩表或图表；只保留官方外链与原创摘要。页面公开显示不构成允许复制发布的许可。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 官方样例与是否可在公开 GitHub Pages 转载

页面公开展示系统提示片段与动态结果图，但没有明确再分发许可。**不在本站复制提示词、图表或榜单内容**；只链接 Andon Labs 页面。榜单会持续变化，若未来记录某次公开结果，应注明抓取日期、筛选分组及算术/几何聚合按钮状态。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 指标

官方主要指标为模拟年度结束时 bank balance（美元）；当前 leaderboard 标记平均 5 runs，并提供 arithmetic mean 与 geometric mean 切换及误差显示。该指标不存在百分比封顶，官方指出理论上没有 score ceiling。不得把某一次运行、其他聚合口径或 Arena 成绩混作当前榜单均值。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 版本关系

Vending-Bench 2 是原始 Vending-Bench 后续版：保留“经营售货机”的核心销售模拟，增加供应商/订单与客户退款等现实复杂性并调整了评分解释。Arena 在此之上增加多 agent 同地点竞争，是明确不同的变体。页面实时变化且未公开固定 v2.0 tag，应以查询日和榜单筛选条件描述。[官方评测页](https://andonlabs.com/evals/vending-bench-2)

## 官方来源按角色分组

- **定义、任务合同、评分、实时 leaderboard 与版本差异**：[Andon Labs Vending-Bench 2 页面](https://andonlabs.com/evals/vending-bench-2)。页面引用给出 `andonlabs2025vendingbench2`，年份 2025；未注明单独发布日期。
- **变体区分**：[Andon Labs Vending-Bench Arena 页面](https://andonlabs.com/evals/vending-bench-arena)，用于区分竞争版，不作为 Vending-Bench 2 单 agent 定义依据。

## 模型发布引用

智谱官方 [GLM-5.1 模型卡](https://huggingface.co/zai-org/GLM-5.1)列出 `Vending Bench 2`，该页面仅作为模型厂商自报引用，不支撑 benchmark 定义。此前核对的 Kimi K2/K2.5/K2.6/K3 与 MiniMax M2.1/M2.5/M2.7/M3 发布材料未确认这一行；这不表示这些模型从未运行过该评测。Andon Labs 自有 leaderboard 属于 benchmark owner 报告。

## 未核实项

- 官方可运行仓库、固定 benchmark tag / commit、完整环境/API schema 和公开的任务数据集入口未核实。
- 排名页面随时间更新；当前页面的完整 63 行未静态导出，不能把所见前十行当完整榜单。
- 网页未指明 v2 页面首次发布日期；引用年份为 2025，不从抓取时间推断具体发布日期。
- 任务数据、系统提示、图片和图表的再分发许可未确认，因此不站内展示原始样例或成绩图。

## 研究结论

**PARTIAL**：官方页面足以确认长时程业务模拟、输入/输出、核心评分、运行数概览及 Arena 区别；固定数据/代码、版本快照和再分发许可尚未确认，不应按可复现开放数据集处理。
