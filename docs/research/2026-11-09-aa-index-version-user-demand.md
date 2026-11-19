# AA 指数更新、用户选型和中文聚合站对照

调查日期：2026-11-09。本记录使用公开网站、项目本地资料和论坛发言；未访问用户或开展读者实验，模型排名及网页可能随时变化。论坛评论不能证明 AA 故意偏向某家公司。

## 用户究竟希望解决什么

[一名本地模型用户](https://www.reddit.com/r/LocalLLaMA/comments/1xhk7hp/aa_is_getting_ridiculous_now_zero_open_weights_in/)称自己会用榜单决定先下载哪个开放权重模型，也会查单项评测判断是否适合具体工作；他对 AA 综合指数变动不满，但原帖说明截图时新结果仍在更新，其关于动机的猜测没有证据。该帖是个人经验，不证明综合榜普遍无用或用户会用本站。

[另一条讨论](https://www.reddit.com/r/singularity/comments/1xhc5kv/artificial_analysis_intelligence_index_v5_released/)中，有评论者称综合排名和自己的长期编程体验不符，特别希望看到其关心的 Program-Bench；评论者对 AA 未纳入该评测的动机猜测未经证实。同帖其他人则称新排名更符合个人体验。单独讨论不能证明某一评测一定更贴近用户任务，也不能按每条回复推断市场人数。

## 用户最初提到的 GPQA 和 AA 指数不是同一个对象

[AA 的 GPQA Diamond 页面](https://artificialanalysis.ai/evaluations/gpqa-diamond)仍可访问，提供评测说明和榜单，页面称成绩由 AA 独立执行。AA [方法版本历史](https://artificialanalysis.ai/methodology/intelligence-benchmarking)写明，它在 Intelligence Index **v4.2 移除了 GPQA Diamond**；当前 v5.0.1 方法表包含九项其他评测。指数不包含 GPQA，不代表 AA 删除了 GPQA 页面；AA 方法页明确称仍将其作为单独评测用于新发布模型，本次未逐个核验每个新模型的覆盖情况。

AA 公开方法称 v5.0 引入 FrontierCode 2.0、Terminal-Bench-Science 及 HLE-Diamond，移出指数中的 GDPval-AA、SciCode、AA-LCR 等，并调整权重；v5.0.1 则重新评分 CritPt v2。这些是 AA 自己对指数的定义更新。跨版本分数和排序不能直接解释为同一模型能力发生升降；本次没有核验帖子中截图的具体模型分数变化原因。

## 发布成绩与评测版本：AA.LCR 的待核实案例

[Xing4.0 的官方模型卡](https://github.com/XingChen-AGI/Xing4.0-29B-A4B/blob/main/README.md)列出一行 `AA.LCR`，给三个模型分别报告 61、66、62，但该处没有链接评测定义或指明版本。[VibeLeaderboard](https://www.vibeleaderboard.ai/tools/capabilities/benchmarks)也收录了这一名称，将其标为待审核并注明版本未明。本站 [AA-LCR 条目](../../content/benchmarks/aa-lcr.json)关联的是 [AA-LCR v1.1 官方页面](https://artificialanalysis.ai/evaluations/artificial-analysis-long-context-reasoning)。

名称相似不足以确认模型卡的成绩与该 v1.1 版本完全一致，也不能据此断定两者不同；模型卡中这三个成绩属于模型发布方报告，不能直接标成 AA 独立测得。若以后收录，应保留原名称、原始来源、报告方及版本待核实状态，确认评测定义、设置和数据来源后再决定能否并表。这个例子展示了发布数据整理的实际工作量，但不证明用户愿意为此使用本站。

## 已有中文产品及其时效

[模型坐标](https://models.latent.vip/)自称中文 AI benchmark 聚合和选型站，提供模型、成本/速度、编码 Agent、评测拆分、方法和来源导航，其主页说明展示 AA 的公开数据并区分不同版本。这与“中文解释评测 + 整理成绩和来源”的设想直接重叠；页面功能和每条转录准确性未逐一验收。

具体时效例子：[其评测页](https://models.latent.vip/evaluations/)标注数据快照 2026-09-25，同时文字称 AA 的**当前**方法为 v4.3.2；[方法页](https://models.latent.vip/methodology/)标注方法核验 2026-09-20，保留 10 项和旧权重。调查当日 AA 的原始方法页已经列出 v5.0.1、九项及四大类各 25%。中文站准确展示了历史版本身份，却没有在这些页面把“当前”同步为本次查看到的上游最新版本；它保留快照与版本也有助于读者判断。不能因此断言整个网站没有更新、所有数据过期或数字有错。

这个例子同时展示聚合产品的价值与成本：读者能在一个中文页面理解历史方法，但上游更换基准、权重、评委或状态后，需要持续维护明确的“历史/当前”标识。不是要求本站立即复制其数据或宣称本站时效更好。

## 中文镜像：榜单日期与方法说明需要分别看

[大模型榜单镜像](https://lmarena.yuzhonghai.cloud/)在同一中文页面展示通用、编程、视频及机器人榜单。它标称 AA 指数数据快照为 2026-11-09，文字仍说指数聚合 GPQA 等十项基准；机器人部分列 RoboChallenge Table 30 真机成绩并标明季度手工维护。本次未逐行核验镜像成绩，也未成功从官方动态页面读取完整原始机器人榜；“快照日期”并不证明每条结果都是当日重新采集。

对比[AA 当前方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)，GPQA 自 v4.2 起移出其综合指数，v5.0.1 使用九项。镜像没有在该说明处明确所述指数方法版本，因此其文字至少不能作为当前方法的可靠描述；若镜像数字对应历史版本，应分开标注版本，本次未核实其各模型分数所属版本，不能据此断言全部数值错误。AA 仍单独评测 GPQA，这与是否计入指数是两回事。

这也是对产品维护成本的具体反例：自动更新榜单数字并不会自动更新评测构成、样本口径和解释文字。这个镜像已有中文分项导航与机器人入口，不能认为中文或具身分类本身没有竞争；单一过期说明也不能证明本站整体质量更高。

## 与本站内容、产品判断

本地 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)以基准解释为主，没有统一模型成绩库；[AA 产品对照](2026-11-09-artificial-analysis-product-comparison.md)已经记录 AA 当前指数和其他中文竞品。一个待验证的阅读任务是：给读者 AA 的 GPQA 页面、AA 版本历史与中文站快照，问“GPQA 是否在当前综合指数中？中文站展示的是哪个时间的版本？能否拿前后两版指数差值证明模型变化？”

官方方法已直接提供事实，中文站也解释版本可比性；本站是否能让特定读者更快找到并正确理解这些信息尚未测试。论坛支持存在具体的选型困惑，不能证明其普遍程度、用户会重复访问或愿意付费。
