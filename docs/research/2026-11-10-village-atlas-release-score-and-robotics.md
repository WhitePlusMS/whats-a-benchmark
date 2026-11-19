# Village LLM Atlas：发布成绩、AA 结果与具身相关内容

核查日期：2026-11-10。基于公开页面、原始模型卡和当前本地工作树；没有运行模型、核验网站所有条目或确认其与各数据发布方的具体授权合同。页面数字会更新，不将不同抓取快照混合计算。

## 对本站原计划的直接竞争

[Village LLM Atlas](https://atlas.village.dev/)按 benchmark 列模型成绩，也按模型提供对照和综合能力估计；[方法页](https://atlas.village.dev/methodology)称其来源包括厂商模型卡、评测组织和 benchmark 作者，并描述模型配置、benchmark 版本、来源、重复结果与冲突处理。方法和置信区间均是该站自述，本次未复算拟合或逐条核验原始记录。

本地 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)提供评测介绍、资料及限制，不是完整模型分数表。Atlas 同时有 [GPQA Diamond](https://atlas.village.dev/benchmarks/gpqa-diamond)和 [AA 的 avg@5 口径](https://atlas.village.dev/benchmarks/gpqa-diamond-average-5-artificial-analysis)页面；后者明确写 AA 数据源，而不是 Atlas 重新测试。两页展示的模型数及成绩不是本次逐行核对的覆盖率。用户设想的“整理各模型发布成绩、按 benchmark 展示并注明来源”，这一网站已有较完整的现成实现。

## 具身同题与来源追溯

1. 本站 [AA-Robotics](../../content/benchmarks/aa-robotics.json)引用 AA 的单机械臂任务和一次 GPT-6 Astra 按按钮的记录。[Atlas 的 AA-Robotics 页面](https://atlas.village.dev/benchmarks/aa-robotics)也列任务说明与模型分数；GPT-6 Astra 的 **69.4** 与 [AA 原文结果表](https://artificialanalysis.ai/articles/aa-robotics/)一致。两者均标注 AA 来源，属于同源展示，不是两次实机测试；分数是带部分分的八项平均，不是成功率。Atlas 页面称每题一次，本次 AA 原文未明确核实该重复次数，先保留为 Atlas 自述。
2. [EmbSpatial-Bench](https://atlas.village.dev/benchmarks/embspatial-bench)是图像空间关系选择题，属于具身相关的上游感知/推理，不是机器人闭环操作。Atlas 将 Qwen3.5-397B-A17B 的 **84.5** 和 GPT-5.2 的 **81.3** 均链接至 [Qwen 模型卡](https://huggingface.co/Qwen/Qwen3.5-397B-A17B)。只读解析该模型卡当前 README 的表格：`EmbSpatialBench` 行在 GPT5.2、Claude 4.5 Opus、Gemini-3 Pro、Qwen3-VL-235B-A22B、K2.5-1T-A32B、Qwen3.5-397B-A17B 六列分别为 `81.3 / 75.7 / 61.2 / 84.3 / 77.4 / 84.5`。这说明 **GPT-5.2 的 81.3 是 Qwen 发布的对照表所报告的成绩**，不是据此证明 OpenAI 自报或 Atlas 独立运行；具体跑测方、测试设置和表内其他数据未进一步确认。

按 `EmbSpatial` 名称在本地 benchmark JSON 中未找到独立同名条目；这只是名称检索，不排除别名。本项目 [具身空间研究](2026-11-09-spatial-language-action-crosswalk.md)此前已记录 Qwen 的 84.5 和 Atlas 同源链接，本次补充同一模型卡的跨厂商对照列，以区分被测模型与发布来源。

## 覆盖、许可与不确定性

Atlas [来源页面](https://atlas.village.dev/sources)说明它整理其他机构已发布结果，并列出来源和各自条款；页面称 Atlas 自有的整理、映射和估计采用 CC BY-SA 4.0，同时说明上游结果仍受各自条款约束。该说明不证明第三方可将全部源数据按同一许可再发布。[AA API 页面](https://artificialanalysis.ai/data-api)区分免费接口内部使用与面向外部产品的商业授权；不能根据另一网站展示了 AA 数据，就推断本站可以不经确认批量同步。

Atlas 来源页也列有 Dual-ArmSim 数据集，但本次没有确定其全部对应结果页面或实际覆盖，因此不能声称它已收录该评测全部成绩；其列出来源也不代表为每个资源独立评测。不同时间页面显示不同统计总数，属于动态状态，不拿其与本站 318 个条目直接比较覆盖率或推算市场份额。

产品层面，Atlas 的存在削弱了“把厂商成绩、不同来源和配置整理在一处”作为独占卖点的假设；但是否能为中文读者、机器人研发者或工业工程师提供更方便的具体任务入口，仍需要按同一问题与现有网站做真实读者对照，不能由功能表或搜索结果推断留存和付费意愿。
