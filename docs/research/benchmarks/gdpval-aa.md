# GDPval-AA

核验日期：2026-09-23

## 官方身份

GDPval-AA 是 Artificial Analysis（AA）基于 OpenAI GDPval 公开 gold 子集开展的独立模型评测。它复用 GDPval 的专业工作任务，但加入 AA 的 Stirrup agent harness、沙箱与盲法成品对比评分；因此它是有自身运行协议和版本的第三方评测，不等同于 OpenAI GDPval 原始专家评测。[AA GDPval-AA v2.1 页面](https://artificialanalysis.ai/evaluations/gdpval-aa)；[AA 评测方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## 官方定义与忠实中文概述

AA 将 GDPval-AA v2.1 描述为对 OpenAI GDPval 数据集的评测，覆盖 44 个职业，任务要求模型完成真实工作交付物。模型在 Stirrup agent 流程中获得 shell、文件系统和网页浏览能力；同一任务上不同模型的交付物经匿名成对比较，聚合为 Elo。该流程衡量的是模型、agent harness、工具环境和评分流程的联合结果，不是只对裸模型做闭卷问答。[AA 页面](https://artificialanalysis.ai/evaluations/gdpval-aa#L13-L23)；[方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## 任务输入/输出/环境

- **输入**：公开 GDPval gold 任务及其参考文件。GDPval 原始说明称其任务包括自然语言指令和支持文件；AA 页面展示的例题也包含提示和参考材料。[OpenAI GDPval 数据集卡](https://huggingface.co/datasets/openai/gdpval)；[AA 示例任务](https://artificialanalysis.ai/evaluations/gdpval-aa)
- **输出**：一个或多个工作成品文件，例如文档、演示文稿、图表或表格；模型可在 agent 回合中操作工作区。[AA 页面 FAQ](https://artificialanalysis.ai/evaluations/gdpval-aa#L271-L276)
- **环境**：AA Stirrup agent harness、shell/网页浏览与隔离沙箱。AA 方法页记录每任务 1 次运行；模型推理设置和模型版本按具体 leaderboard 条目区分。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking#L85-L87)

## 数据规模/split/字段/文件

- AA v2.1 使用 220 个 GDPval 公开 gold 任务，覆盖 44 个职业和 9 个行业；这不是 OpenAI 所述的 1,320 任务完整语料。[AA GDPval-AA 页面](https://artificialanalysis.ai/evaluations/gdpval-aa#L16-L20)；[OpenAI GDPval 页面](https://openai.com/index/gdpval/)
- 原始公开数据的 Hugging Face viewer 显示一个 `train` split、220 行，字段包括 `task_id`、`sector`、`occupation`、`prompt`、参考文件 URL、交付物 URL、`rubric_pretty`、`rubric_json` 等。该仓库的 `train` 是数据发布格式标签，不应解释成模型训练用途或完整 GDPval 训练集。[OpenAI GDPval 数据集卡](https://huggingface.co/datasets/openai/gdpval)
- AA 报告对少数 Microsoft Office 文件做了打开兼容性修复（补齐缺失元数据、修正损坏关系项），并称未改正文、幻灯内容或布局。因此 AA 运行所用文件快照并非可在每个字节层面都与原包相同。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## 访问状态

AA leaderboard、方法说明和代表任务/模型提交可在 AA 网站浏览；上游 220 题由 OpenAI 在 Hugging Face 公开。访问上游原始文件和 AA 复现实验时应分别固定 dataset revision、Stirrup/harness 版本和评测页面版本。[AA 页面](https://artificialanalysis.ai/evaluations/gdpval-aa)；[OpenAI GDPval 数据集](https://huggingface.co/datasets/openai/gdpval)

## 数据/代码/媒体许可与使用边界

本轮查看的 OpenAI Hugging Face 数据卡没有核实到可覆盖整套 GDPval 任务、参考材料与成品的明确统一许可证；公开可下载不等于获准整体转载。AA 页面和方法说明提供其评测方法与展示内容，但 AA 的榜单/文件使用应遵循其网站条款。**公开页面建议只链接原始任务与 AA 页面，不复制任务正文、参考文件或模型交付物；发布前分别核验 OpenAI 数据及第三方素材条款。**[OpenAI 数据集卡](https://huggingface.co/datasets/openai/gdpval)；[AA 数据/API 条款说明](https://artificialanalysis.ai/data-api/docs)

## 官方样例与是否可在公开 GitHub Pages 转载

AA 页面允许浏览代表性任务提示、参考文件说明和模型提交；OpenAI 发布 220 题公开 gold 数据集。[AA 样例任务区](https://artificialanalysis.ai/evaluations/gdpval-aa)；[OpenAI 数据集卡](https://huggingface.co/datasets/openai/gdpval) **结论：本站以链接、自己的中文概述和不包含原题内容的结构说明为宜；不转载题目、参考文件或成品，除非逐项核实对应许可。**

## 指标

主指标为盲法成对提交比较聚合出的 Elo。当前 v2.1 将 DeepSeek V4.1 Flash（max）锚定为 1600，并通过 Crowd-BT 拟合比较结果；排行榜还展示置信区间、成本、token 用量和每任务平均回合数等辅助量。v2.1 Elo 不是 GDPval 原始专家对模型/人类交付物的胜平负比例，不能把两种数字互换。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking)；[AA leaderboard](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 版本关系

当前所查页面为 GDPval-AA v2.1。AA 方法页说明 v2.1 变更的是 Elo 标尺锚点与拟合方法；此前 v2 使用不同标尺，故跨版本直接比较原始 Elo 不合适。AA 页面指出公开任务源自 GDPval gold，任务集与上游 GDPval 的身份需分开记录。[AA 版本史与方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking)；[AA GDPval-AA 页面](https://artificialanalysis.ai/evaluations/gdpval-aa)

## 官方来源按角色分组

- **上游 benchmark 与任务数据**：[OpenAI GDPval 介绍](https://openai.com/index/gdpval/)；[OpenAI 公开数据集卡](https://huggingface.co/datasets/openai/gdpval)；[GDPval 论文](https://arxiv.org/abs/2510.04374)。
- **GDPval-AA 身份、榜单和样例**：[Artificial Analysis GDPval-AA](https://artificialanalysis.ai/evaluations/gdpval-aa)。
- **GDPval-AA 协议、规模和版本**：[Artificial Analysis Intelligence Benchmarking Methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)。

## 模型发布引用

AA leaderboard 是第三方自运行结果；任何 OpenAI 或其他厂商在发布材料中报告的 GDPval 分数应单独视为相应厂商配置下的结果，不能记作 AA Elo。此条仅记录 AA 独立评测身份；本轮未将厂商发布分数用于描述 AA 协议。[AA 方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## 未核实项

- AA v2.1 的具体任务级提示、评审配对总数、judge 各任务抽样和当前模型参数，需以所引用页面当日快照及其完整方法附件为准；此处未从汇总网页推导未披露字段。
- 对 OpenAI Hugging Face 数据包中的全部任务附件和第三方素材逐文件许可未核实。
- AA 的兼容性修复文件与对应上游 dataset revision 的逐文件差异未在本轮下载比对。

## 研究结论

**PASS_WITH_LIMITATIONS**：AA 对 GDPval-AA 的上游关系、220 题范围、agent 工具环境和 v2.1 Elo 协议有第一方说明；它应作为独立第三方运行协议展示，不能和 GDPval 原始基准或其厂商成绩混为一项。题目与附件转载权仍需逐项核验。
