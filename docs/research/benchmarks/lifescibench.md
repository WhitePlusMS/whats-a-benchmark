# LifeSciBench

核验日期：2026-09-23

## 官方身份

LifeSciBench 是 OpenAI 与 Tacit Labs 研究人员提出的生命科学研究任务 benchmark；OpenAI 于 2026-06-17 发布介绍，随附论文预印本。任务由生命科学专家撰写并审阅。[OpenAI 官方介绍](https://openai.com/index/introducing-life-sci-bench/)；[OpenAI 论文 PDF](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 官方定义与忠实中文概述

它测量模型在真实研究工作流中的证据解读、分析、设计优化、科学推理、验证与操作、转化研究和科学沟通能力。与封闭式生物学问答不同，任务可能包含不完整证据、附件、多步决策和开放式回答，由任务专属专家 rubric 评估。[OpenAI 介绍](https://openai.com/index/introducing-life-sci-bench/)；[论文 §1、§3](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 任务输入/输出/环境

- 输入：单轮科学研究问题、相关上下文和可选附件；论文列举序列、分子结构、表格、PDF、仪器输出、显微/凝胶图像等类型。[论文 §3.3](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)
- 输出：自由文本/科学产物回答。不同任务的 rubric 对科学主张、计算、决策、论证、限制条件和格式逐条给分；论文评测为单轮，不允许追问或纠正。[论文 §3.3、§5.1](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)
- 评测允许 unrestricted Internet browsing；结果解释应注意模型的浏览与附件处理条件，并记录工具可用性。[论文 §5.1](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 数据规模/split/字段/文件

- 750 个 expert-authored tasks，横跨七类 workflow 与七个生命科学 domain；1,062 个 task artifacts、19,020 项 rubric criteria，37 个任务带 prompt-provided URL，53% 任务要求使用一个或多个附件。[OpenAI 官方介绍](https://openai.com/index/introducing-life-sci-bench/)；[论文表 2](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)
- 论文定义每题由 prompt、支持材料（若有）和专属 rubric 组成；无公开 train/dev/test split 声明，公开的是论文、分类法和若干经选择的示例，不等于 750 题完整数据包已公开。[论文 §3.3、§3.5、数据可用性声明](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 访问状态

当前可访问 OpenAI 官方介绍和研究论文。论文指出完整任务、rubric、附件或评测材料的公开可能受许可、隐私、专有信息或生物安全因素限制；构建及发布审查期间有内容因扩大传播可能造成生物安全风险而被排除或限制。未找到向公众下载完整 750 题及附件的入口。[OpenAI 数据可用性与安全说明](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)；[OpenAI 官方介绍](https://openai.com/index/introducing-life-sci-bench/)

## 数据/代码/媒体许可与使用边界

截至核验日，未发现 benchmark 全量任务数据或专属 harness 的公开 license。论文明确提示任务、rubric、附件和评测材料的发布会受到许可、隐私、专有信息及生物安全约束。论文附件示例涉及实验文件、序列类材料和详细评分要求，因此不能把论文可阅读等同于许可整份材料被本站复制。OpenAI 页面和预印本的文字/图表也没有在该项目页面另行授予整套 benchmark 内容转载权；采用原创概述、链接和不含任务细节的统计即可。[论文附录 A.5](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 官方样例与是否可在公开 GitHub Pages 转载

论文和 OpenAI 介绍展示了精选任务示例与 rubric 节选。[OpenAI 官方介绍](https://openai.com/index/introducing-life-sci-bench/)；[论文附录 D](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf) **不转载示例题全文、附件/序列/文件内容、详细 rubric 或任何可能落入受限安全材料的部分**；仅自写任务类型摘要和总量统计并链接原文。即便单个示例目前可见，也不能据此推断其他附件同样可以公开。

## 指标

- **Normalized rubric score**：每个回答获得的 rubric 分除以该题满分，再对题目等权平均，保留部分得分。
- **Task pass rate**：回答达到该题专属 rubric 分的 70% 阈值的题目比例。应与 normalized score 并报，因为获得部分分不代表达到任务级通过门槛。[论文 §5.2](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)；[OpenAI 介绍](https://openai.com/index/introducing-life-sci-bench/)
- 论文另按 workflow、domain、artifact 类型、rubric 类别和回答格式分层；该类子组结果应保留各子集大小并考虑小样本波动。[论文 §5.2、§6](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 版本关系

官方当前介绍与所链接预印本定义的是 750 题 benchmark。公开资料未列出版本号、版本化数据下载、数据哈希或 split 变更记录。评测方应注明所获任务包的日期/版本与访问条件，避免把当前发布页的总体定义误当成完整可复现的数据分发规格。[OpenAI 官方介绍](https://openai.com/index/introducing-life-sci-bench/)；[论文](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 官方来源按角色分组

- **官方概览、总体统计、指标和部分样例：**[OpenAI: Introducing LifeSciBench](https://openai.com/index/introducing-life-sci-bench/)。
- **方法、任务/附件结构、指标、数据可用性与安全限制：**[LifeSciBench 论文 PDF](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)。

## 模型发布引用

OpenAI 官方页面/论文报告了 GPT-Rosalind、GPT-5.5 等系统的分数，但论文披露 benchmark 由 OpenAI 开发且评测包含 OpenAI 模型，需在引用时说明这一机构背景；这些成绩仍由 benchmark 发布方报告，不是独立复现结论。[论文附录 A.4 与 §6](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf)

## 未核实项

- 全量任务、附件、标准 rubric、grading 实现和版本化数据包的公开访问与授权条件未公开说明。
- 每项附件所含第三方文章、数据库、临床/专有信息及文件格式的逐项许可未提供统一清单。
- 生物安全审查具体排除了哪些任务或附件未披露；不得从公开示例推断未公开附件内容。
- 论文可公开任务示例中可见的具体内容仍应逐项遵循作者/原始材料的权利与安全限制；本站本记录不复刻这些内容。

## 研究结论

**PASS_WITH_LIMITATIONS**：OpenAI 一手资料支持 750 题、1,062 个附件、七类工作流/领域、单轮 rubric 评测和两项主指标；同一论文明确说明许可、隐私、专有信息及生物安全会限制公开材料。完整题目和附件不应转载；当前可安全发布自写说明、经核实的聚合统计和官方链接。
