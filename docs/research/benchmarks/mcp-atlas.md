# MCP-Atlas

核验日期：2026-09-23。

## 官方身份

MCP-Atlas 由 Scale AI 研究团队提出，用于衡量智能体在真实 Model Context Protocol (MCP) 服务上的工具使用能力。当前作者论文为 arXiv:2602.00933 v3（2026-05-19）；论文定义 1,000 条总任务，其中公开 500 条、私有保留 500 条。[作者论文](https://arxiv.org/abs/2602.00933)；[官方代码仓库](https://github.com/scaleapi/mcp-atlas)

## 官方定义与忠实中文概述

模型接收不点名工具或服务器的自然语言请求，需在多个真实 MCP 服务中发现合适工具、执行多步调用并综合结果。基准覆盖 36 个真实服务器、220 个工具；公开和私有任务各 500 条。论文称 98.6% 任务需要跨至少两个服务器协作。它测试端到端工具工作流，不是仅判断函数调用格式是否正确。[作者论文](https://arxiv.org/abs/2602.00933)

## 任务输入/输出/环境

- 输入为单轮自然语言任务、受控工具子集和可用的真实 MCP 服务器；受评智能体须自行识别工具并完成调用。论文报告每项公开任务暴露 6–37 个工具，其中 2–8 个相关；公开卡对任务调用数量描述为 3–6 次，而论文轨迹统计的平均最小参考轨迹为 9.8 步，两种数字的口径不同，不应合并。[论文](https://arxiv.org/abs/2602.00933)；[官方数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)
- 输出为最终回答以及可审计的调用轨迹。计分器对参考事实主张逐项评为完整、部分或未满足，取主张覆盖率；论文主要结果以覆盖率至少 0.75 的任务比例作为 pass rate。参考轨迹用于复现、可解性检查和诊断，不作为要求模型逐步照抄的评分目标。[论文方法与访问说明](https://arxiv.org/abs/2602.00933)
- 环境由版本锁定的真实 MCP 服务、容器化 harness 和评估器构成。完整复跑部分服务需第三方账户/API 凭证，实时服务状态会带来漂移；必须记录服务镜像、启用工具、调用预算、模型提示和 judge 版本。[官方仓库](https://github.com/scaleapi/mcp-atlas)

## 数据规模/split/字段/文件

- 完整基准 1,000 任务，随机分为公开 500 与私有 500；公开集按原基准领域/复杂度分布保留全部 36 个服务器与 220 个工具。私有部分不发布，用于暴露监测和榜单完整性。[论文](https://arxiv.org/abs/2602.00933)
- 官方 Hugging Face 发布物是一份 Parquet，500 行公开子集，卡片没有命名为 `train` 的 split。字段为 `TASK`（24 字符唯一 ID）、`ENABLED_TOOLS`（暴露工具列表的字符串）、`PROMPT`、`GTFA_CLAIMS`（可独立核验的参考主张）、`TRAJECTORY`（工具调用、参数、依赖和返回证据的序列化轨迹）。运行结果 CSV 另有 `task_id`、`raw_conversation_history`、`response`；勿将输出表字段当成数据集原始 schema。[官方数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)；[官方 README](https://github.com/scaleapi/mcp-atlas/blob/main/README.md)
- 论文按 1,000 任务版描述基准，HF 卡明示 500 条公开 release；论文 v3 和仓库当前实现体现更新后的任务规模。对早期资料或排行榜快照引用需标明具体论文版本/日期，不要把先前公开的 500 行说成全部任务。[论文版本记录](https://arxiv.org/abs/2602.00933)；[官方数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)

## 访问状态

500 条公开任务可从作者 HF 页面读取，仓库提供 harness 和评分/诊断流程；私有 500 条不开放。完整线上复现还可能需要第三方服务凭证及导入专用样例数据。[官方数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)；[官方仓库](https://github.com/scaleapi/mcp-atlas)

## 数据/代码/媒体许可与使用边界

- 论文和数据卡明确将公开任务数据（提示、主张、轨迹、干扰工具选择）按 CC BY 4.0 发布；转载需署名、链接许可并标明修改。代码/harness 为 Apache-2.0。第三方 MCP server 保留其各自许可；工具输出受上游 API 条款约束，论文说明发布的是整理后的审计片段和派生分数，而非完整原始快照。[论文许可说明](https://arxiv.org/abs/2602.00933)；[HF 数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)
- 本数据集为文本任务，无图像/视频文件；环境导出数据可能触及相应服务/数据源条款，不能仅凭 benchmark CC BY 视为可再发布。[官方仓库数据导出说明](https://github.com/scaleapi/mcp-atlas/blob/main/data_exports/README.md)

## 官方样例与是否可在公开 GitHub Pages 转载

本地已有一条拟用公开样例：`TASK=689f4d693e212e8ef3390731`，标题是 AssaultCube 仓库创建时间与官网域名注册时间差，页面只展示 `TASK` 与 `PROMPT`，没有复制 `GTFA_CLAIMS`、`TRAJECTORY` 或工具清单。字段选择符合数据卡 schema，CC BY 4.0 覆盖公开任务；但本轮 HF Viewer 对 Parquet 行查询返回内容过大错误，无法从可读取的官方页面逐字比对这条记录。因此 ID/题面目前只能说在既有核验记录中出现，尚未完成当前源逐字复核。更正此前样例记录的 split 描述：官方公开数据卡称“500 sample tasks”，并未标成 `train`；不应把它叫 train split。[数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)；[样例记录审计底稿](../2026-09-23-samples-agent-round2.md)

公开页面可在完成当前官方行记录复核后转载这条任务题面，须按 CC BY 4.0 署名并链接原数据集。保留仅题面、不带参考 claims/轨迹的展示边界；目前不宜把现存样例标为“已实时复核”。

## 指标

主指标为 claim coverage（每项 claim 记 1、0.5 或 0，求任务平均）及 coverage ≥ 0.75 的 pass rate；也可报告 ≥0.50、≥0.90 阈值、平均 coverage、时长、工具调用数和按失败类别的诊断。需固定 judge，因为三种 judge 对同一模型可有 2.1–4.6 个百分点差异。分 public/private 的分数差是暴露审计信号，不是污染的直接证明。[作者论文](https://arxiv.org/abs/2602.00933)

## 版本关系

论文 v3（2026-05-19）定义 1,000 任务、36 servers/220 tools 的版本，公开切片 500、私有切片 500。仓库 README 当前也描述公开 500 条及容器化重现环境；页面中的旧指标、旧 server/tool 数或 500-task 全量说法需检查其所指版本。此次未发现语义版本化的任务快照号；报告应锁定 HF commit、Git commit、镜像 tag 和私有/公开范围。[论文版本历史](https://arxiv.org/abs/2602.00933)；[仓库](https://github.com/scaleapi/mcp-atlas)

## 官方来源按角色分组

- **任务定义、规模、评分、隔离和数据授权：**[Scale AI 作者论文](https://arxiv.org/abs/2602.00933)。
- **500 条公开数据、原始字段和 CC BY 4.0：**[ScaleAI/MCP-Atlas 数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)。
- **harness、服务环境、运行输出和评分流程：**[scaleapi/mcp-atlas](https://github.com/scaleapi/mcp-atlas)。
- **榜单：**[Scale AI MCP-Atlas Leaderboard](https://scale.com/leaderboard/mcp_atlas)。

## 模型发布引用

模型成绩应注明公开或私有集、MCP server 与启用工具配置、调用预算、模型工具接口/harness、judge 和 pass coverage 阈值，并把评估时间及服务镜像 tag 固定。因私有集隔离和环境漂移，不应将公开子集成绩表述成全量私有榜单成绩。[作者论文](https://arxiv.org/abs/2602.00933)

## 未核实项

- 本轮无法从 HF Viewer 读取目标记录进行 ID 与题面逐字核验；现有样例不得视为本轮重新验证。
- HF 默认 Parquet 暴露字段为字符串化的工具列表、claims 和轨迹；尚未读取全部 500 条逐行确认数据质量。
- 论文同时说公开卡 3–6 tool calls/task、正文参考轨迹均值 9.8 steps，统计口径有别，本文不将其强行对齐。
- 第三方工具实现和工具返回内容适用其上游许可及 API 条款，不能由数据集许可证覆盖。

## 研究结论

**PASS_WITH_LIMITATIONS** — 作者论文、数据卡和仓库支持该项 benchmark 的身份、真实工具任务、500/500 公私切分、schema、评分及许可。公开集可作为任务样例来源；现有具体行本次无法复核，且动态第三方服务与模型暴露程度会限制分数解释。


## 2026-09-23 样例实源复核（本节为当前结论，取代前文相应旧结论）

- 官方 Hugging Face Viewer API 返回公开表格首行，稳定 TASK ID 为 `689f4d693e212e8ef3390731`；该 Viewer 页面目前标记为 `train · 500 rows`。这是 Hub Viewer 的切片标签；论文/数据卡说明基准范围为 public 500 / private 500，不能由标签推断为基准训练集。
- 来源 revision 固定为官方数据文件最后变更 commit `f7b28d11335d12047d843b3294a1b95c4ff42f35`。本站只保留 `TASK`、`PROMPT`、`ENABLED_TOOLS`，不保留 `GTFA_CLAIMS`、`TRAJECTORY`、外部 API/MCP 返回值。
- 数据卡明确将数据集按 CC BY 4.0 发布；原文已存于 `content/assets/licenses/cc-by-4-0.txt`（Creative Commons 官方 legalcode SHA-256 `9ba9550ad48438d0836ddab3da480b3b69ffa0aac7b7878b5a0039e7ab429411`）。页面署名 Scale AI / MCP-Atlas，并标注仅选取字段的修改。
- 原始入口：[固定 revision Parquet](https://huggingface.co/datasets/ScaleAI/MCP-Atlas/blob/f7b28d11335d12047d843b3294a1b95c4ff42f35/MCP-Atlas.parquet)，[官方 Viewer 首行](https://huggingface.co/datasets/ScaleAI/MCP-Atlas/viewer/default/train?p=0)，[数据卡](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)。
