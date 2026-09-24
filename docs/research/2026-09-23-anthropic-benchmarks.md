# Anthropic Claude Opus 5.5 基准条目核验（2026-09-23）

## 报告映射

Anthropic 2026-09-22 报告成绩表有九行：Terminal-Bench 4.0、FrontierCode v1.1 (Main)、CursorBench 4.0、GDPval-AA v2.1、AutomationBench、Humanity’s Last Exam、Terminal-Bench-Science 0.1、OSWorld 2.0、Chartography。HLE 已有正式条目，本批不重复。WANDR 只在报告正文提到，不在九行表中，故单独列为报告关联候选。新增候选 status=published 仅表示完整候选建议，不等于正式发布；order 从 500 起。没有收录样例。

## 方法来源与核验状态

| 候选 | 方法来源与报告位置 | 核验摘要 / 限制 |
|---|---|---|
| terminal-bench-4 | [4.0 说明](https://www.tbench.ai/news/terminal-bench-4-0)、[运行说明](https://www.tbench.ai/run)；表格第 1 行 | Harbor Hub 4.0.0；8 小时超时，调整资源、修 19 项、移除 8 项；应重跑旧版比较。
| frontiercode-1-1-main | [榜单方法](https://cognition.com/frontiercode)、[1.1 修订](https://cognition.com/blog/frontier-code-1.1)；第 2 行 | 真实 PR 任务，维护者规准结合测试与验证器；解题来源互联网访问会令运行记零。评分规准仍含主观性。
| cursorbench-4 | [CursorBench](https://cursor.com/cursorbench)；第 3 行 | 真实会话中的含糊多文件任务；4.0 增长程编辑、调查、意图理解、任务管理、设计遵循。发布方提示结果有方差。
| gdpval-aa-v2-1 | [AA 榜单](https://artificialanalysis.ai/evaluations/gdpval-aa)、[原始论文](https://arxiv.org/abs/2510.04374)；第 4 行 | AA 用 Stirrup shell/browser 代理及盲测比较评估 220 项任务，报告 Elo；不能等同原始 1,320 题数据集。
| automationbench | [Zapier 榜单](https://zapier.com/benchmarks)、[官方仓库](https://github.com/zapier/AutomationBench)、[发布说明](https://zapier.com/blog/introducing-automationbench/)；第 5 行 | 六个业务域的模拟跨应用流程，以最终状态断言验收；公开任务和私有留出榜单集不同。Anthropic 称 Opus 5.5 未用 fallback，安全拦截计失败。
| terminal-bench-science-0-1 | [0.1 介绍](https://www.tbench.ai/news/terminal-bench-science-0-1)、[官方代码](https://github.com/harbor-framework/terminal-bench-science)；第 7 行 | 70 项真实科学研究工作流，专属可复现测试验证成果；Anthropic 报告标准误 3.5–5 点，并注明 3 次试验、Claude Code harness 的公开榜配置。
| osworld-2 | [论文](https://arxiv.org/abs/2606.29537)、[代码](https://github.com/xlang-ai/OSWorld-V2)；第 8 行 | 108 项长程工作流；官方任务位于 gated HF。此访问控制不等于已核实转载限制，因此可用性记 unknown；报告指标是 partial completion，需区分完整成功率。
| chartography | [论文](https://arxiv.org/abs/2608.10677)、[数据集卡](https://huggingface.co/datasets/surgeai/chartography)；第 9 行 | HF 数据集卡确认公开 100 项；问题经专家复核。CC BY 元数据不等于第三方图片的转载许可，故不转载样例。
| wandr | [论文](https://arxiv.org/abs/2608.14747)、[数据集](https://huggingface.co/datasets/perplexity-ai/wandr)、[代码](https://github.com/perplexityai/wandr)；报告正文，非表格行 | 500 项结构化网页研究任务；动态重抓引用并用 task-specific verifier 计 soft/hard precision、recall、F1。Anthropic 使用离线 web search/web fetch、程序化工具调用、代码执行和 980k token 预算；与 Perplexity 发布配置不同，分数不可直接比较。公开数据集固定提交版也不等于论文时快照。

## 报告共通说明

除另注外，Opus 5.5 使用 adaptive thinking max effort；Terminal-Bench 4.0 为 xhigh。报告提示基准分差不一定映射真实工作差距。AutomationBench 由 Zapier 运行并报告。原报告：[Introducing Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)。

## 品牌候选

Cognition、Zapier、Surge AI、Perplexity 的 GitHub 官方组织头像可追溯至其组织页，清单与图片置于候选目录。Cursor 官方 GitHub 组织 cursor 的主页链接为 cursor.com，采用其官方组织头像作为品牌候选。其他四个头像同样来自各组织自身 GitHub 主页。



