# 持续更新产品：竞品入口、同题对照与用户线索

核查时间：2026-11-10，北京时间。范围是公开网站页面、研究论文与本地工作树；页面是会变化的快照。没有网站流量、订阅者、转化或留存数据，没有招募受访者，也没有开展产品对照测试。部分 Eval Handbook 页面通过搜索索引内容及 [2026-11-09 本地核查](2026-11-09-eval-handbook-comparison.md)交叉参考，本轮直接抓取该站详情页失败；其最新实际内容应以网页为准。

## 判断

“收集 benchmark，并展示模型发布时的成绩”已经遇到多个直接替代品。它们不仅有成绩：公开页面还存在中文解释、具体任务、来源、版本提示、新内容入口和订阅。因此单靠增加这些通用功能，不能推定足以吸引稳定用户。

这不等于本站没有用：本地 [README](../../README_ZH.md) 与 [GPQA Diamond 条目](../../content/benchmarks/gpqa-diamond.json)显示，它已提供中文任务解释、数据访问条件及可比较性提示；部分其他条目提供获准展示的具体样例。但对方也有解释和例子，尚无同题用户测试证明本站更快、更清楚或更可靠。持续更新入口是一种让人可能回来的设计，不等于实际有人持续回来。

## 已观察到的产品入口

| 产品 | 可见功能与可能的更新触发 | 证据边界 |
| --- | --- | --- |
| [Artificial Analysis GPQA](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond) | 该页同时有 198 题说明、方法入口、分数、成本、Token、速度与示例，分数与发布日期图表也是页面的一部分。页面声明测试由 AA 独立进行。 | 提供榜单和图表不证明用户回访；本次未验证所有结果。不要把其独立测试与厂商发布数字混成同一次测评。 |
| [AI Benchmark Radar](https://aibenchmarkradar.com/about?lang=zh) | 中英目录、原始成绩与来源、阅读导读、收藏、“最新发现”，并提供文章、单条发现和分类简报的 RSS/JSON Feed。其 [GPQA 页面](https://aibenchmarkradar.com/benchmarks/artificial-analysis-gpqa-diamond?lang=en)解释子集、比较条件并列出模型成绩。 | 站方称发现是网站发布的采集快照，部分简报有未独立复核的 AI 概述；其目录数量为来源记录而非去重评测数。它整理已发布结果，明确不自行运行或复现。未验证订阅数和更新周期。 |
| [Eval Handbook](https://evals.zenheart.site/) | 中文评测介绍、模型发布资料、[模型时间轴](https://evals.zenheart.site/releases/)和[厂商报告解读](https://evals.zenheart.site/book/chapter-08/)；[GPQA 详情](https://evals.zenheart.site/benchmarks/gpqa/)的搜索索引可见模型成绩。 | 本轮部分内容来自搜索索引及前次核查，不是本轮完整交互验收。不能由页面数量判断维护质量或回访。 |
| [BenchNavigator](https://benchnavigator.github.io/) | 检索、筛选、比较 benchmark，原型关联论文等来源。此前本地研究已在同一 RoboTwin 2.0 和 EmbodiedBench 上与本站做对照。 | 页面可用性及数据快照依前次[浏览器核查](2026-11-10-benchnavigator-survey-competition.md)；其资料卡标注 AI 生成。未找到订阅或持续访问数据，不能说没有。 |
| [Sotabase](https://sotabase.com/) | 首页有作者访谈、新评测征集和邮件更新订阅；[FrontierCS 2 页面](https://sotabase.com/benchmarks/frontiercs-2)及任务页提供分数和任务解释。 | 首页当时只基于一个 benchmark、48 项任务；该页说明成绩来自 FrontierCS 2 团队，不能说这些成绩由 Sotabase 独立复测。未提交订阅，未核验邮件更新频率或订阅人数。 |
| [具身开发者社区](https://robotics.hellobike.com/leaderboards/) | 2026-11-10 只读切换核验 LIBERO、CALVIN ABC→D 和 SimplerEnv Google Robot Visual Matching：均显示模型成绩、分项、来源入口及部分协议提示。 | 仅核验三个选项，未逐条校对成绩；选择器存在其他选项不证明全都已核验。没有留存、用户规模或维护稳定性证据。 |
| [RobotWorld](https://robot.agientry.com/zh/leaderboard) | 2026-11-10 浏览器显示 RoboDojo 仿真和真机独立入口，仿真板块标注官方更新 2026-11-03、本站同步 2026-11-09，并提供官方榜入口。 | 页面读取工具返回过 8 月旧缓存，以本次浏览器当前展示为准；一次同步快照不证明长期稳定，也未逐条比对官方榜或核验真机板块。 |

本站 README 描述搜索、分类、批量查询、2–3 项 benchmark 对比及官方模型发布资料入口；但[线上搜索复核](2026-11-10-product-decision-brief.md)显示首页将四项逗号分隔输入时返回 0 项，单项可找到，批量查询不能再按 README 描述视为已验证能力。README 也明确当前不执行模型评测、不生成统一模型榜单。发布资料索引不是结构化的全模型成绩时间轴；本轮没有对线上部署与本地工作树做逐项同步验收。有关线上可访问性和统计未知项见[现有核查](2026-11-10-recurring-product-evidence.md)。

## 同题一：DeepSeek-R1 的 GPQA Diamond 该怎么看？

给读者的任务：**找到 GPQA Diamond 测什么、DeepSeek-R1 发布报告中的成绩与其来源，再判断另一个榜单的分数是否可以当成同一次结果。**

1. [DeepSeek 原始论文 v1](https://arxiv.org/html/2501.12948v1) Table 4 报告 DeepSeek-R1 的 GPQA Diamond **Pass@1 为 71.5%**。这是厂商论文中的报告，不是本站或 AA 的实测。
2. [Eval Handbook 的 GPQA 页面](https://evals.zenheart.site/benchmarks/gpqa/)索引列有同一模型的 71.5%；前次核查其模型页时，还看到厂商报告来源标注及协议定位未核验的提示，见[详细记录](2026-11-09-eval-handbook-comparison.md)。这证明在该单点上已有中文成绩及追溯入口；不代表其全部数据都已核验。
3. [AI Benchmark Radar 的 GPQA 页面](https://aibenchmarkradar.com/benchmarks/artificial-analysis-gpqa-diamond?lang=en)列 **DeepSeek R1 (Jan '25) = 0.708080808080808**，显示来源为 Artificial Analysis，另有报告日期等字段；页面同时说明 198 题、答案抽取与采样等比较条件。该条记录本身仍有未记录的协议字段。
4. [AA 的 GPQA 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)说明其成绩为独立测试；本站 [GPQA 条目](../../content/benchmarks/gpqa-diamond.json)说明任务、198 题及协议差异，但没有结构化的 R1 发布成绩。本次没有逐项核对 AA 与 DeepSeek 的运行版本、样本或设置，也无法断言 70.8% 与 71.5% 差异的具体原因，不能把一个视为另一个的纠错。

这不是用户计时实验；以上是按同一问题查看公开页面与本地数据后得到的功能对照。尤其不能把 Radar 展示的 AA 结果说成厂商发布成绩，仅凭同模型和同 benchmark 名称也不能证明两次测试设置一致。GPQA 数据作者要求不在线展示数据集样例，本站记录了这一请求；AA 页面可见示例，但本次未核查其授权情况，不推断其合规与否。[GPQA 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)

## 同题二：综合分高，机器人任务就通过了吗？

给读者的任务：**查看 FrontierCS 2 中 Diffusion Policy 任务，解释为什么智能体分数高于参考代码却仍未通过。**

[Sotabase 的任务页](https://sotabase.com/benchmarks/frontiercs-2/tasks/diffusion-policy)在该快照列出原代码综合分 13.4、GLM 5.3 综合分 59.8，但结果为未解决；页面说明任务是在仿真推 T 块时改进动作采样，成功率、奖励与运行时间都参与约束，且每个智能体只有一次、最多 5 小时。其文字区分单一综合分和每项指标、隐藏测试的通过条件。[FrontierCS 官方站](https://frontier-cs.org/)也解释通过规则。因此“看具体任务和解释成绩”已是可用替代，不是本站独占的产品想法。

前次本地文件名称与内容检索没有发现 FrontierCS 2 独立条目；相关详细证据和快照日期见[Sotabase 对照](2026-11-10-sotabase-frontiercs2-robotics.md)。该任务主要评估智能体改进机器人研究代码，并非真机实验；均值或综合分不能定位具体哪一个隐藏工况失败。本次没有运行代码或机器人，也没有证明读者更容易理解哪个页面。

## 独立用户表达了什么

- 一位 [r/LocalLLaMA 发帖者](https://www.reddit.com/r/LocalLLaMA/comments/1nomrj7/leaderboards_benchmarks/)说自己经常查看几个榜单，因为笔记本需要 1–35B 级模型，抱怨部分榜单缺少新模型并希望约每月至少更新；回复中的一位维护者自述手动测一个模型或变体通常至少四小时。前者是单人自报，不证明大多数人要求月更或会用本站；后者也不是本站成本测量，但提醒持续覆盖本身需要资源。
- 在另一条[端侧榜单讨论](https://www.reddit.com/r/LocalLLaMA/comments/1gkfbrk/built_an_ondevice_small_language_model_slm/)中，一名评论者希望看到测试设备、推理栈及版本，并比较不同硬件/软件栈，因为这些会影响性能。发帖者是该榜单建设方；这条来自另一位评论者的建议支持“运行条件是某些读者关心的问题”，不证明他们会为通用评测百科回访。
- [BenchNavigator 论文](https://aclanthology.org/2026.evaleval-1.29/)附录 C 调查了 23 人，20 人选择领域相关性、17 人选择目标能力、14 人选择搭建容易程度作为挑选因素；可多选。样本主要来自学术界且 18 人在美国，问题是自报，不能外推中国从业者、估算本站需求规模或证明读者会回来。作者也未证明原型比现有方法更有效。详细口径见[本地研究](2026-11-10-benchnavigator-survey-competition.md)。

## 如何决定是否继续

补充一组与 AA 替代品直接相关的公开讨论：在[同一条 Reddit 帖子](https://www.reddit.com/r/LocalLLaMA/comments/1xhse0l/alternatives_to_artificial_analysis/)中，一位评论者说难以找到像 AA 那样及时更新的榜单，因此仍用它看单项能力；另一位提出按科学、编程等用途调整综合分权重的想法；还有人表示自己会结合多个来源、用工具整理适合自己用途的评测和限制。它们是不同人的自述或想法，不代表这些人使用了本站，也不能作为留存、样本比例或对 AA 客观准确性的证据。帖子中对 AA 动机或资助的猜测未核实，本研究不将其当作事实。同一帖子此前已在[模型资料竞争研究](2026-11-10-model-card-registry-competition.md)记录过，不将它重复计作新讨论。

另一位[普通读者](https://www.reddit.com/r/artificial/comments/1ut87cn/what_is_the_meaning_of_ai_benchmarks/)看到新模型发布中 80%、90% 等分数，直接询问这些数字的意义，以及所有 benchmark 达到 100% 是否代表模型不能再进步。这与“读懂发布报告”的目标场景相符，但只是一个英文社区提问；此前已有类似线索，不能据此估算中文受众数量或回访。

证据支持继续进行**有限验证**，不支持马上投入建设广覆盖成绩数据库：榜单、发布成绩与中文说明已有竞争，自动收集也无法消除来源、版本、授权及修正成本。与本站现有内容最接近的待检验假设是：持续阅读新发布报告的中文读者，会在遇到陌生 benchmark 或矛盾成绩时回来核对任务与来源。已有竞品也在解决这一问题，能否比它们好必须实测。

可以先选 5–10 名确实会看模型报告的目标读者，以同一份报告给出 GPQA 这类有标准答案的问题，让他们分别使用本站、AA、Radar、Eval Handbook 与原报告；记录正确率、完成时间、是否把厂商成绩误当独立成绩和每条资料整理耗时。随后在 2–4 周观察自然出现的新报告时，他们是否主动回来解决新问题。避免只问“觉得有用吗”，也不要把 RSS、更新次数、PV 或 star 当留存。样本和时间仅是可行性试验建议，不能代表市场；当前没有完成招募、实验或留存测量。
