# 公开成绩追溯：真实案例、竞品与读者问题

补充：[GPQA 同题对照](2026-11-09-gpqa-qwen-local-comparison.md)连接 Qwen3.8-27B 原模型卡、公开量化部署报告与选型表交流；区分未对齐配置、来源和真实读者误解，未将分差归因于量化。

后续补查：上述报告现已补充同一模型在第三方网站标称来自 AA 的多档位转录，以及一条用户询问 AA 与模型卡分数差异的历史讨论；AA 图表对应数字本次仍未直接读取，不能把转录视为本站直接核验。

调查日期：2026-11-09。项目现状依据当前本地工作树，外部网站为公开页面快照；本次未重新跑模型、未核验所有竞品数据或进行读者测试。结果不能用于估计本项目市场规模。

## 需求线索：研究者如何呈现复现差异

[研究者社区提问](https://www.reddit.com/r/MachineLearning/comments/1xm64of/)中，发帖者自述使用原论文代码和超参数，多数测试接近原结果，但两个基准在多个种子和多次复现后仍低若干分；他询问论文中如何并列报告原值及复现值、如何提供使读者信服的证据。评论者提出不同报告方式。这是个人陈述，作者、任务与实验均未独立核验；不能因此认定原论文错误，也不能推定他需要本站或愿意付费。

[Hugging Face 的历史 MMLU 对照](https://huggingface.co/blog/open-llm-leaderboard-mmlu)提供一手实验示例：作者在 2023 年按三个具体实现比较同一数据集，报告 LLaMA-65B 为 HELM 63.7%、当时旧版 Harness 48.8%、原始实现 63.6%。差别包括提示格式和计算选项概率或生成答案的方式，作者未将全部差异归因于某一单独因素。文末称 Harness 已更新以接近原实现；这些历史值不能用于断言最新版仍差 14.8 个百分点。

本站 [MMLU](../../content/benchmarks/mmlu.json) 与 [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) 已记录任务、评分和来源；目前并无结构化模型成绩库。因此把不同来源的成绩和运行条件连起来是**可测试的扩展假设**，不是当前已经实现的产品能力。

## 和现有产品比较：同一个具体问题

| 读者问题 | 已有网站实际提供什么 | 限制 |
| --- | --- | --- |
| “这些来源的 GPQA 分数是什么？” | [LLM Benchmarks Tracker 的 GPQA 页](https://alloevil.github.io/llm-benchmarks-tracker/b/gpqa-diamond/)逐行展示来源类别、日期、部分条件，且会在备注中写同模型其他来源数值。 | 部分行条件为空；该站数据不是本次逐条复算；引用转述值仍应回查原始报告。 |
| “Epoch 的 o3 不同推理设置能否区分？” | [Benchmark Registry 的 GPQA／Epoch 页面](https://benchmarkregistry.org/benchmarks/gpqa/diamond-epoch-ai?result=edf92ade37902c5adaf17893d5cb8235806c4dd54d18c76770a907ba9d0e7c56&view=history)将 o3 的 high、medium、low 分行，列评估方、来源、评估日期和归档入口，并提供历史视图。 | 是第三方转录，不等同重新运行；本轮 [Epoch 原站](https://epoch.ai/benchmarks/gpqa-diamond)动态内容未展示对应 o3 行，未直接核实其数值。不能因有归档或来源字段就判定记录一定正确。 |
| “Terminal-Bench 最高分是哪个版本的？” | [Tracker 的 Terminal-Bench 页](https://alloevil.github.io/llm-benchmarks-tracker/b/terminal-bench/)逐行标注 `2.0`、`4.0` 或 `science`，有来源、部分框架和成本；页面也说明各版本不可直接比较。 | 当前页面标题和顶部突出显示 64.6%，但对应账本行明确是 **Science**；4.0 行另为 58.18%。不同测试集、设置和来源不能靠这两个数排名，也不能把 64.6% 当成 4.0 分数。这里记录单页面展示和阅读风险，不声称对方数据造假或所有访客都会误读。 |

Tracker 的[中文首页](https://alloevil.github.io/llm-benchmarks-tracker/zh/)明确区分厂商自报、独立复现、官方榜单和聚合站，也指出顶部“最高分”是账本内最佳一行而非统一排名，并提供 JSON API。因此“中文解释 + 厂商成绩 + 运行条件 + 来源”已经有直接竞品，不应当作为本站独有功能。

## 可以采取的验证，而非已证实优势

对模型报告读者，可先问一个具体任务：“这份 Terminal-Bench Science 成绩能不能和 4.0 排名直接比较？原文在哪里？”记录是否进入来源、是否识别版本及缺失设置；以 Tracker、原始论文和本站候选卡比较。对评测工程师，另问复现记录中数据版本、提示、抽取方式和运行环境是否可定位。两个群体任务不同，不能用一种榜单需求概括。

现成解决方案还包括 [HF Evaluation Guidebook](https://github.com/huggingface/evaluation-guidebook/blob/main/contents/troubleshooting/troubleshooting-reproducibility.md)与 [HELM](https://crfm.stanford.edu/helm/) 等评测方法和工具，不能将这些信息称为目前不存在。研究者能否借助本站更快、更准确地回答问题仍未测量；现有[读者测试方案](2026-11-09-reader-study-protocol.md)尚未执行。
# 2026-11-10：多来源中位数与原始成绩

[whatmodel 的 Qwen GPQA 同题核查](2026-11-10-whatmodel-claims-median-provenance.md)复算网页 611 对显示值，并发现一行显示值与两个独立来源的中位数一致；网页披露有中位数聚合，尚未审计内部实现或完整交互。强调其已经提供这类跨来源比较。

后续读取网站返回的图表数据和客户端代码，确认该图表点的第三方计数为 2，悬浮说明会标出两条中位数；模型详情页以 85.9% 展示 Epoch 成绩并提示有其他来源。服务端聚合代码仍未核验，不能断言所有交互均已覆盖。

