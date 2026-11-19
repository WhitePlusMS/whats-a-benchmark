# 医疗评测：回答分数、工作流与现有竞争

核查日期：2026-11-09。本文仅为评测产品研究，不提供临床建议；未运行评测、复核病历环境或验证目标用户需求。

## 本站已有条目与 AA 的直接重叠

| 条目 | 任务与分数 | 不能据此推断 |
| --- | --- | --- |
| [本站 HealthBench](../../content/benchmarks/healthbench.json) | 5,000 段健康相关对话；医生编写的逐例 rubric 交由模型裁判判断 | 单一总分不能保证实际临床效果 |
| [本站 HealthBench Professional](../../content/benchmarks/healthbench-professional.json) | 525 个公开医生对话任务，覆盖临床咨询、文书及研究；有长度调整口径 | 与原版不是同一个测试；长度调整后的 rubric 分数不是答对题目的百分比 |
| [本站 PhysicianBench](../../content/benchmarks/physicianbench.json) | 根据作者仓库，100 项长任务、670 个检查点；智能体在电子病历/FHIR 环境中检索、操作并生成记录 | 属于受控评测环境，不是对实际部署安全性的证明；不能直接与对话 rubric 分数横排 |

[Artificial Analysis 的 HealthBench Professional 页面](https://artificialanalysis.ai/evaluations/healthbench)已有基准介绍及模型榜单，尽管 URL 的末尾是 `healthbench`，页面标题和描述明确为 Professional。将两个版本仅按 URL 或名称自动合并可能混淆。页面动态数据和所有功能未逐项验收。

OpenAI 的 [Professional 论文](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)说明题目有意富集困难案例，分数不代表常规临床任务表现；题集不覆盖所有工作流，如 EHR 集成。本站上述两个 HealthBench 条目均记录作者不在线披露样例的请求，因此本记录不转载题目或评分细则。

## 为什么同一个成绩需要协议

长度调整是每条回答按最终文本字符数修正再汇总；论文系数来自作者所述的有限长度区间和特定模型实验，不能把长度短简单等同质量好。专业版公开代码和论文内部实现也不能默认完全一致。

[simple-evals issue #127](https://github.com/openai/simple-evals/issues/127)中，复现者针对固定代码版本报告：主 `score` 字段是未调整分，另有长度调整指标；公开数据文件格式还需要转换。此处仅记其报告和所附复现步骤，未独立运行或确认该问题在其他版本仍存在，也不能由此推断某个榜单用错字段。[另一位复现者](https://github.com/openai/simple-evals/issues/96)称原版 HealthBench 测出 0.64、未复现 0.67，但未完整披露运行条件，原因未知。

成本也是复现者关切：[一位使用者](https://www.reddit.com/r/OpenAI/comments/1m5c96h/)自报一次原版 HealthBench 使用 GPT-4.1 裁判花约 175 美元，询问替代方案；价格、配置和统计范围未核实，不能作为现在的报价或市场均价。

## 现有解释、审计及复现材料

- [HealthBench Professional Guide](https://healthbenchprofessional.ai/)已有论文中同一基础模型三种系统配置的对照、长度调整计算器和协议记录清单。其计算器是说明工具，不能作为模型实测；该站并非 OpenAI 官网。
- [Epoch AI 的评测审计](https://epoch.ai/benchmarks/healthbench-professional/review)报告按类别抽取 50/525 题，借助模型发现候选问题并人工检查，认为其中 25 题存在其定义下的问题。该数是审计方结论，本次未独立检查题目或做临床专家复核，也不推断所有榜单名次因此改变；该页按原作者请求不发布题目原文。
- [Greenbook 的复现仓库](https://github.com/greenbookai/greenbook-healthbench-eval)描述自身实验、分数来源及运行步骤，并区分未发布的基准题目、模型输出及内部配置；其结果和费用估计未独立验真。
- [PhysicianBench 官方仓库](https://github.com/HealthRex/PhysicianBench)已经提供任务、运行方式、模型成绩和轨迹查看入口；当前未实装或验证轨迹内容。

这些例子表明，单靠医疗榜单、评分解释或复现指南，也不能称为无人提供的功能。

## 一个真实工作流研究及其边界

[一项预印本](https://arxiv.org/abs/2610.11069)分析单个学术医疗系统的 127,833 条请求：作者归类文书和行政占 36.2%、知识检索占 28.9%、诊断占 3.7%。其 58 个公开 benchmark 的任务分布与这套系统的实际请求有差异；其中 HealthBench Professional 在研究比较的评测中更接近该系统任务分布，但仍不完全一致。

研究仅涉及一个机构和一个助手，主要分析对话首轮，未检验助手回答的实际效果；基准及请求分类含模型标注，并非全部由临床人员逐条标定。因此这些比例不能外推到所有医院，也不证明本站已找到客户。它支持一个可验证的问题：读者能否据任务、环境和计分，选到贴近自己用途的评测；这仍需针对具体用户测试。
