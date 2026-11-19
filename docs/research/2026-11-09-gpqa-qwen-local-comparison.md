# GPQA 同题对照：发布分数与本地部署结果

核查日期：2026-11-09。本案例用于分析用户的模型选择与来源追溯问题；未运行模型、审计全部配置或核实用户身份。厂商自报和论坛自报均不是本次独立测量。

后续补充：[量化用户问题、现有专门榜与可复算的 500 题结果](2026-11-10-quantization-local-benchmark-demand.md)，区分准确率与测速硬件。

后续补查：[同模型推理档位与竞品](2026-11-10-reasoning-effort-score-competitors.md)核对 AA 的档位比较、BenchLeader 的多来源同题表及本地部署者案例；第三方转录不等于本次核验原始成绩。

长上下文专项：[请求完成率、答题正确率与统计分母](2026-11-09-long-context-completion-accuracy.md)对照 LongBench v2、AWS 的 15 题样例及固定提交脚本；未运行模型或证明已有榜单受影响。

另一个同题案例：[GLM-5.2 发布与第三方 GPQA 成绩](2026-11-09-glm52-gpqa-independent-comparison.md)核对厂商、Vals 和第三方转录，并发现已有网站展示同一对来源；未独立复测。

归一化补查：[DeepSeek 发布值与 Open LLM Leaderboard GPQA 字段](2026-11-10-gpqa-score-normalization-crosscheck.md)通过官方 Parquet 核对 4.59 与 0.2844 的关系，区分榜单归一化、评测口径和官方已回答的用户问题。

## 后续补查：同一模型在第三方目录中的 AA 来源成绩

[AI Atlas 的 GPQA 详情](https://www.ai-atlas.co/benchmarks/gpqa-diamond?model=qwen3.8-27b)列 Qwen3.8 27B 的多个来源记录，标称评估方为 Artificial Analysis：非推理 81.82%、low 84.55%、medium 84.55%，以及一个没有在该历史列表展开推理档位的 AA slug 对应 90.51%。[Benchmark Radar](https://benchmark-radar.org/benchmarks/artificial-analysis-gpqa-diamond/)将相应 90.505…% 一行标为 xhigh；[LLMBenchmark.ai](https://llmbenchmark.ai/models/qwen3-8-27b)也将 90.5% 标为 xHigh，并列出其他档位。三个站点可能使用同一 AA 上游，不是三次独立评估。

[AA 的 Qwen3.8 27B 页面](https://artificialanalysis.ai/models/qwen3-8-27b)页面标题确有 xhigh 档位，但本次正文抓取未直接返回该模型的 GPQA 数字；因此上述数值必须表述为**第三方转录、标称 AA 来源**，不能写成本站直接核验的 AA 原始成绩。各站抓取时间、榜单和上游结果可能变化。[Qwen 模型卡](https://huggingface.co/Qwen/Qwen3.8-27B)在自己的该模型列报告 89.2；不同来源的采样、量化、推理配置与运行条件未完整对齐，不能据分差宣布谁测错或归因于某一个设置。

AI Atlas 将同一组数值分别显示在 `Diamond` 和 `GPQA Diamond` 两个标签下，各有历史观察日期。它的页面也说明至少部分日期是首次观察日期；**不能把这八行直接认作八次独立运行，或把观察日期写成实际评测日期**。各条记录是否重复、上游修订是否真实变化，需核原始数据。该站已有条件筛选、来源、历史和成本入口；这进一步表明相关展示不是空白，但本次未做完整交互或数据审计。

## 一个实际用户提出的同类问题

[LocalLLaMA 用户提问](https://www.reddit.com/r/LocalLLaMA/comments/1oas6ki/)称看到同一 GPT-OSS-20B 的 GPQA 分数在一份 Ring 模型卡及 AA 页面存在差异，想知道是否测评有误、推理档位是否造成差异，以及如何比较两个模型。这个帖子的具体数字是发帖者转述；本次未找到可复核其当时截图和完整 Ring 模型卡版本，不能把它当成已验证的 AA 历史分数，也不能从现在的数字反推当时网站错误。

评论者建议找条件一致的对比或自行测试；这说明至少一位用户明确遇到了跨来源分数理解问题，但不代表本项目目标用户规模，也不证明其愿意使用本站。

## 国产模型 GPQA 复现：论文与 issue 的可核实条件

[Step 3.5 Flash 论文](https://arxiv.org/html/2602.10604)的成绩表在该模型列报告 GPQA Diamond **83.5**，并在表格说明中写明该测试每题采用 8 次独立生成的平均 pass@1。[模型的 Hugging Face 页面](https://huggingface.co/stepfun-ai/Step-3.5-Flash)也展示 83.5，来源指向该论文；不能把这两处视作两次独立评测。

[公开 issue #41](https://github.com/stepfun-ai/Step-3.5-Flash/issues/41)的提问者自报两套评测分别约 **58.1** 和 **62.6**，使用的框架、温度及最大生成 token 等设置并不相同；他还报告部分回复没有输出所需的最终选项。他询问评测数据版本、模板、推理和答案抽取等细节。2026-11-10 查看时 issue 显示开放且无答复；以上为提问者自报，并非本站复测。论文的 8 次平均和帖中的运行条件需要对齐，但帖中没有足够信息证明任何单一设置导致了分差，也不能据此认定论文成绩有误。

[BenchLeader 的 Step 3.5 Flash 0202 页面](https://www.benchleader.com/models/step-3-5-flash-0202)另列 GPQA Diamond **83.1**，标来源为 AA；这属于第三方转录。本站读取 [AA 对应页面](https://artificialanalysis.ai/models/step-3-5-flash-0202)时没有从动态内容中直接读到该数值，不能说已核对 AA 原始成绩。AA 页将 0202 与后来发布的 2603 版本区分；因此其他网站写的简短模型名不能自动证明与论文或该页使用完全相同的版本与评测条件。即使 83.1 和论文 83.5 数值接近，也不能仅凭接近推断是同一次运行或所有设置一致。

## 一个模型、两个具体报告

| 来源 | 被测对象及数值 | 实际能核实什么 |
| --- | --- | --- |
| [Qwen3.8-27B 模型卡](https://huggingface.co/Qwen/Qwen3.8-27B) | `Qwen3.8-27B` 列的 GPQA Diamond 为 **89.2**。 | 原始表格确有该数字；模型卡中的其他测试脚注并不能自动套到 GPQA。具体 GPQA 的权重精度、推理框架、重复次数和提示等，在本次所查看的成绩表与脚注中未明确，不能用后文一般推荐采样设置代替实际跑分配置。 |
| [社区本地部署分享](https://www.reddit.com/r/LocalLLaMA/comments/1w2g5se/) | 作者报告在 RTX 5090 上运行该模型的 NVFP4 量化服务配置，使用 SGLang、特定模板和推测解码；GPQA Diamond 为 **84.8%**。 | 发帖者称使用 lm-evaluation-harness、xhigh、16k 思考上限；测试命令、数据修订、种子、逐题结果及重复次数本次未找到或未核实。它是作者对其特定配置的报告，不是本站复测。 |

这两个报告相差 4.4 个**百分点**，但模型精度、提示模板、推理框架、采样及其他条件未全部对齐；**无法据此归因于量化，或断定任一方成绩错误**。该用户自己报告调整思考上限后另有结果，但没有可供本次验证的逐题输出，不据此推断因果或统计显著性。另一个评论者也自报多档思考预算的结果，其使用配置及测量条件未经核实，不能作为受控实验。

用户最初给出的 [Artificial Analysis GPQA 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)自述独立测评，并已有成绩、成本、输出 token、耗时及样例等展示。本次可读页面的图表仅返回动态展示框架和部分头部模型，未读到 Qwen3.8-27B 对应行；**不能由此推断 AA 没有该模型，也不能编造其数值**。如果要比较 AA 的 API/服务结果与上述本地量化结果，还需要核对服务版本、模型精度、思考设置及测评细节。

本地 [GPQA Diamond 条目](../../content/benchmarks/gpqa-diamond.json)已有评测任务、198 题、选项顺序和提示等解释；尚无模型成绩记录，不能说用户目前能在本站直接完成上述比较。

## 已观察到的真实阅读问题

[另一位用户制作的本地模型对照表](https://www.reddit.com/r/LocalLLaMA/comments/1w4a043/)包含 Qwen3.8-27B 的模型卡数据。作者解释自己原本在多个 HF 页面间来回查成绩，为选模型把数字整理成表；同时承认没有亲自跑那些模型。评论中有人询问“这些运行”的上下文和显存，作者澄清数字来自官方页面；还有人提出增加量化格式、引擎、显存、速度和工具框架等部署条件。

这是一条真实的公开交流，能支持“至少在这一场景中，汇总表可能被误读为用户本地实测，且有人想了解部署条件”。评论者身份和需求规模未核实，作者关于厂商配置的概括也未经验证；不能说所有用户都会误读、会使用本站或愿意付费。其表格本身是现成的手工替代方案，不是完整统一协议的测评。

## 可行的对照问题及既有替代品

针对本地部署者，阅读任务可以具体到：**“89.2 和 84.8 分别由谁报告？哪个是量化配置？这些材料足以证明量化造成差距吗？”** 原模型卡和论坛已分别提供答案的一部分；[HF Community Evals](2026-11-09-huggingface-community-evals-competition.md)、[LLM Benchmarks Tracker](https://alloevil.github.io/llm-benchmarks-tracker/b/gpqa-diamond/)以及 AA 已提供成绩及不同程度的来源和设置。Tracker 本次可读账本未显示这条 27B 记录，不代表其其他页面不存在；AA 动态图表同样不能以未读到数字推断缺失。

若做试点，需要记录读者在原模型卡、现有平台和候选卡上找到答案所需时间、来源辨认及对缺失条件的判断，并计入人工核查和更新成本。当前只是试点设计，没有测试、留存或付费数据。

## 新线索：用户不知道该用哪些评测检查本地配置

- [一位 LocalLLaMA 发帖者](https://www.reddit.com/r/LocalLLaMA/comments/1wi2en4/what_benchmarks_do_you_run_locally/)称已接入 GPQA Diamond、MMLU-Pro、RULER 等，想检测 KV cache 量化、上下文长度、推测解码和聊天模板对质量与工具调用的影响，但担心测试越来越多，却无法衡量具体配置变化。他说明前两项主要是接入验证；有评论建议自己的固定任务集，另一评论推荐 AA-LCR。评论只是经验建议，不证明某个评测必然更灵敏，也不证明单次针测能保证所有任务质量。
- 对照本站：[GPQA Diamond](../../content/benchmarks/gpqa-diamond.json)是科学选择题，[MMLU-Pro](../../content/benchmarks/mmlu-pro.json)是学科选择题；[RULER](../../content/benchmarks/ruler.json)按多类长上下文任务与长度评估，不只是单个找针题；[AA-LCR](../../content/benchmarks/aa-lcr.json)是长文档开放问答，采用语义一致性判分。它们回答的问题和评分机制不同；不能未经实验就说哪个必然能发现某项量化问题。
- [另一条性能帖讨论](https://www.reddit.com/r/LocalLLaMA/comments/1wsq0pa/can_we_get_some_quality_control_on_all_these/)的发帖者希望速度报告附硬件、模型与量化、运行时、上下文和质量证据。两篇帖子的作者是不同账号，本次没有核实其背景或是否为本站潜在用户；这是个人提出的问题，不是需求比例。

## 现有替代品：速度与质量已有人一起做

- [Local LLM Advisor](https://localllmadvisor.com/leaderboard.html)按硬件、模型和量化列本地生成速度，并区分公开结果与站方运行；本次页面未见质量列，不代表其全站都没有质量资料，也未独立核实数据。
- [Dyno + Quality](https://yashj9.github.io/llm-benchmarks/)的[公开仓库](https://github.com/yashj9/llm-benchmarks)称同时保存速度、任务质量与资源指标，并允许按模型、引擎、上下文等查看。其质量和速度**通常来自不同运行**，设置可能不同；仓库说明质量是选定测试集的加权通过率，综合分也是其自定义权重。它是作者公开的分数快照，不等于在同一配置下独立验证了通用能力。本次未运行或核验其所有数据。
- [llm-speed](https://llm-speed.com/)列硬件、模型、量化及来源运行，以吞吐测量为重点；其页面自报的运行及设备数量是站内数据规模，不等于独立用户数量。已有这些产品，不能把“速度加质量、设置及来源”宣称为无人提供。

对项目的待测方向是：针对一个用户问题解释**应该看哪类测试、不同结果需要哪些设置、哪些结论仍缺证据**，并链接原资料；而不是假定只增加更多分数就能回答。要判断本站是否比既有资料更有用，仍须做真实读者任务对照和维护成本核算。
