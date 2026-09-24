# HealthBench Professional

核验日期：2026-09-23

## 官方身份

HealthBench Professional 是 OpenAI 发布的临床专业聊天评测，用于补充 HealthBench 的较广泛健康对话评测；它不是 HealthBench 的改名，也不是 Hard 的另一个名称。论文题为 *HealthBench Professional: Evaluating Large Language Models on Real Clinician Chats*。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 官方定义与忠实中文概述

Professional 收录医生在 ChatGPT for Clinicians 中进行的真实工作任务对话，并由多名医生撰写和审定评分 rubric。它覆盖 care consult、writing and documentation、medical research 三类临床工作；官方将其定位为 HealthBench 的补充，重点是临床医生与模型的聊天任务。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 任务输入/输出/环境

- **输入**：医生与模型之间的单轮或多轮对话，始终以医生/用户消息结束；任务聚焦咨询、文书与医学研究。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)
- **输出**：回答最后一条消息。每例 rubric 由医生撰写，criteria 可奖励应包含的信息，也可对不安全或不理想行为扣分。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)
- **环境**：基准输入输出是聊天回答，但实验系统可能包含不同 harness/工具。论文单独区分基础模型与 ChatGPT for Clinicians 等产品 harness；比较分数时必须记录模型、harness、工具和推理 effort。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 数据规模/split/字段/文件

- 最终评测集为 525 例，从 15,079 个候选中按难度、质量和代表性筛选；约三分之一为 red-teaming 例子，困难例子相对于候选池约 3.5 倍富集。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)
- 三个用途类别：care consult、writing and documentation、medical research。官方论文的字段说明包括 `conversation`、`rubric items`（criterion text 与 points）、`use case`、`type`、`difficulty`、`specialty` 和 `physician response`。[论文数据访问章节](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)
- OpenAI 官方 Hugging Face 数据卡显示一个 `test` split、525 行，字段展示还包括 `id`、`conversation`、`rubric_items`、`use_case`、`type`、`difficulty`、`specialty`、`physician_response`、`canary_string`。论文数据 access 则保留内部小型 private held-out set；公开 525 例不等于完整防污染评估集。[官方数据卡](https://huggingface.co/datasets/openai/healthbench-professional)；[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 访问状态

论文指向 OpenAI 公共 Blob 上的 `assets.zip`；OpenAI 官方 Hugging Face 数据卡当前公开显示 525 行并将许可标为 MIT。论文同时说明作者保留一小份私有留出集，用来识别意外训练或隐式过拟合；官方内部评测实现未作为官方外部实现发布，论文只说 simple-evals 提供非官方外部实现和匹配设置选项。[论文数据访问章节](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)；[OpenAI 官方数据卡](https://huggingface.co/datasets/openai/healthbench-professional)

## 数据/代码/媒体许可与使用边界

OpenAI 官方 Hugging Face 页面将 Professional 数据标记为 MIT；但同一评测论文明确请求不要在线以纯文本或图片公开该数据集的样例，理由是避免进入训练语料或让联网模型检索，并设置 canary 以帮助过滤训练数据。[官方数据卡](https://huggingface.co/datasets/openai/healthbench-professional)；[论文数据访问章节](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf) **这条明确请求适用于 Professional 本身**。记录 MIT 标签的同时必须遵守不在线披露样例的请求；MIT 元数据不应被解释为推翻该请求。论文没有为外部用户提供官方评测实现。

## 官方样例与是否可在公开 GitHub Pages 转载

**不转载题目对话、模型回答、评分 rubric、医生参考回答及截图。**OpenAI Professional 论文直接请求不要在线以纯文本或图像披露本数据集样例；公共数据访问并不取消该完整性请求。可呈现任务类别、字段结构、数量、评分机制和官方数据链接，不展示可还原任务的文本。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 指标

逐例评分由模型 grader 对每条 rubric criterion 独立打标；满足时加该 criterion 的分值，负分 criteria 用于惩罚不良行为。例分以满足项分值总和（包含负项）除以正向最大可能分数，可能为负；论文还给出长度校正分及不同配置结果。报告需区分原始/长度校正、grader 版本、重复采样数及是否平均。[官方论文评分章节](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 版本关系

Professional 是对 HealthBench 的补充评测，专注临床医生工作对话；不是原 HealthBench 的子集或 Hard 的重命名。论文区分公开 525 例和私有 held-out 例。引用时注明评测名、数据版本、公开/私有范围、评测 harness、grader、长度校正和采样条件。[官方论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 官方来源按角色分组

- **基准定义、数据构成、得分机制、访问与样例披露请求**：[OpenAI HealthBench Professional 论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)（重点看摘要、评分章节及第 8 节 Data access）。
- **可访问数据、公开 525 行、字段与许可标签**：[OpenAI 官方 Hugging Face 数据卡](https://huggingface.co/datasets/openai/healthbench-professional)。
- **HealthBench 原评测参考实现和相关代码入口**：[OpenAI `simple-evals`](https://github.com/openai/simple-evals)。论文声明该 Professional 外部实现不是官方内部实现。

## 模型发布引用

论文报告了特定 GPT-5 系列和产品 harness、外部模型及医生基线的结果；这些数字不能脱离论文给出的 harness、工具、推理 effort、采样、grader 与长度调整条件。论文还警告由于困难样本过采样，绝对分数不等于真实世界发生率或平均临床表现。[官方论文讨论](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)

## 未核实项

- 未下载当前 `assets.zip` 固定版本并核验各例与公开 Hugging Face 525 行是否完全一致。
- 本轮只记录官方 HF 页面的 MIT 元数据和论文的明确不披露请求，不对数据中真实临床对话的来源/隐私或法律授权作独立判断。
- 论文提及的内部评测实现不公开；simple-evals 的具体匹配程度需按固定代码 revision 核查。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 论文和官方数据卡确认 Professional 是 525 例医生聊天 rubric 评测，数据可公开访问且页面标注 MIT；同一论文明确禁止在线公开样例，并说明保留私有 held-out 数据、内部评分器实现未作为官方实现发布。公开页面只展示概述和来源入口。
