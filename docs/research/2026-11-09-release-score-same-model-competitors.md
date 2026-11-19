# 模型发布成绩：同一案例与现有竞争

核查时间：2026-11-09。这里研究用户提出的“已经有 benchmark，再把每次模型发布的成绩填上去”，并区分当前产品、拟议功能、厂商报告与独立实测。本次未进行读者访谈，也没有逐条审计竞品的全部数据。

## 同一模型、同一张发布表

[DeepSeek-V4.1-Flash-1017 官方模型卡固定版本](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/blob/1bae0e1088993b9b82de08f59de5be5a34e42170/README.md)的表有 11 行评测、6 个模型列，66 个格子中 63 个有数字、3 个空缺；其中两个格子还含括号内的 HLE 文本子集成绩。数字格数不等于独立实验次数。报告者是 DeepSeek，表中其他模型的各项成绩不能因此都归为其他模型厂商自己测试。

| 对照 | 这次可核实的内容 | 对原设想的意义 |
| --- | --- | --- |
| 官方模型卡与[发布日志](https://api-docs.deepseek.com/updates/#date-2026-10-17) | 新模型 Terminal-Bench 4.0 为 42.3、DeepSWE v1.1 为 77.0、Agents’ Last Exam 为 35.4。卡片披露前两项分别使用 Claude Code 和 Mini-SWE-V2；日志指出 ZeroBench-main 使用 Pass@5。 | 原始分数、所用工具和不同文档里的设置都要保留。 |
| [BenchBoard 页面](https://syuan03.github.io/benchboard/)及其[固定版本数据包](https://raw.githubusercontent.com/SYuan03/benchboard/be56c57c31ce5e2477383f896c902a8a1cb6bb7c/data-packs/deepseek-1017-2026-10-22.js) | 中文站展示成绩来源、设置、模型比较、覆盖矩阵和 CSV；该数据包已为此模型录入原表 11 行的 12 个数值，其中 HLE 包括两个口径。 | 不只是产品构想相似：同一发布表已经有人实际整理。页面功能是站点描述，本次未执行完整交互验收。 |
| [AIEvals 的 Agents’ Last Exam](https://aievals.app/benchmarks/agents-last-exam) | 收录并分组展示这份表的 6 个模型成绩，关联发布来源；详情说明该组是 DeepSeek 的报告、缺失值不填零，以及部分配置未披露。页面说明整表拆分后为 65 个数字，并非 65 次独立实测。 | 以评测为入口汇总同一份厂商发布表、注明来源和条件也已有产品。 |
| 本地 [发布资料索引](../../content/releases.json) | 已登记此次发布和 10 个相关 benchmark 的关联，并链接原始资料；没有这些成绩的结构化数值。 | 现状是资料导航，和拟议的成绩数据库是不同阶段；缺少的功能不能算已经完成。 |

例如官方表中 Agents’ Last Exam 写 35.4，但未在该表明确注明具体子指标。[该评测论文](https://arxiv.org/html/2606.05405)区分不同计分方式，因此不应仅凭数字自行确定它具体属于哪一种。其他来源可能提供解释，但仍须核实其证据链。

## 分数历史与信息归属

[AI Change Watch](https://aichangewatch.com/zh/benchmarks)此前抓取的中文页面描述收录厂商公开值、来源、条件及历史修订，并说明它不自行运行评测。它和原始设想高度重合；复查时该页面返回 502，因此此处不将先前页面的规模数字当作当前可用性或全面覆盖的保证。

一个可独立核验的修订：[Qwen 模型卡的固定提交](https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/commit/bbd8c67a909655d659d4deb8784c8fcd47ac87a4)将同一表中 Claude Opus 4 Non-thinking 的 GPQA 数字由 88.9 改为 74.9。这里是 **Qwen 报告了另一个厂商模型的数据**，不能记成 Anthropic 的自报；原表写 GPQA，不能无依据标为 Diamond。提交没有给出本次调查能确认的改动原因，也不能据此说模型实际能力发生变化。保存来源版本和变更时间有用途，但历史修订功能本身已有竞争者。

## 国产模型的发布值、复录值和独立评测

以 Qwen3.5-397B-A17B 为例，[模型卡固定版本](https://huggingface.co/Qwen/Qwen3.5-397B-A17B/blob/8472618112abcbd45acbcdc58436aff4233c23f7/README.md)在模型自身一列报告 `GPQA` 为 **88.4**。该表行名只写 GPQA；同仓库随后出现的 [GPQA Diamond 结构化记录提交](https://huggingface.co/Qwen/Qwen3.5-397B-A17B/commit/d426276b92f402bdadd38fca3d66f56784cc5acf)把 88.4 标为 Diamond，并将 `source` 指向模型卡；因此这是带子集标签的一次结构化复录，不能当作 Hugging Face 又独立测得一次。原始运行的逐题结果、完整参数和子集依据本次未核实。

本次只读打开 [Epoch AI 官方数据包](https://epoch.ai/data/benchmark_data.zip)中的 `gpqa_diamond.csv`，发现两条不同模型标识的记录：`qwen3.5-397b-a17b` 的 `mean_score` 为 0.8585858586，`qwen3.5-397b-a17b_none` 为 0.8636363636；两条均记载 2026-08-07 开始，标准误字段分别约 0.02483 和 0.02445，另各有日志链接。其 `model_metadata.csv` 把两种标识归入同一个展示组，但本次没有读取受 CAPTCHA 保护的日志，不知 `_none` 的具体运行含义，也未核实二者的采样、服务商及提示是否一致。上述是 Epoch 文件中的字段和记录，不是重复实验次数；不要将标准误直接称为 95% 区间。

[AIMap 模型页](https://aimap.page/zh-hans/benchmarks/model/qwen3-5-397b-a17b/)将该模型的 GPQA 列为 85.9%、来源为 Epoch；其 GPQA JSON 当前对应 85.86，和上述第一条原始均值四舍五入一致。该页列出 `_none` 等其他名称，但未显示第二条 86.36% 的 GPQA 记录；聚合规则不能仅凭此断言漏数或错误。它同页还展示四个 τ²-bench 领域的不同分项，体现现成中文产品已有模型、评测、来源和设置导航。本次未对全站数据或关联规则做审计。

[Epoch 方法说明](https://epoch.ai/benchmarks)介绍其标准化任务定义、模型调用和结果日志；该站通常在 GPQA 多次运行，但我们没有检查本例逐题结果，不能套用默认重复次数。发布值 88.4 与上述 85.86 相差约 2.54 个百分点，只能说来源和运行记录不同；在缺少完整条件和配对数据时，不能断言厂商夸大、模型真实能力下降或差异由某个参数造成。[Epoch 的历史样本分析](https://epoch.ai/data-insights/self-reported-gpqa)也没有发现其筛选样本存在显著差异，但不覆盖这次 Qwen3.5 比较，且不证明所有发布值都准确。

为便于后续复查，本次 2026-11-09 读取的 ZIP SHA-256 为 `52257d420f8181bf35ccf6eff5dea553d9d1da5b43a1d1200d0127c8500df28c`，其中 GPQA CSV SHA-256 为 `3836a34ab5bbe6ceb6f94fd6edacb00d615ce7ebae7e980f9c7755f0fd4e4cbc`。Epoch 官方数据包是动态文件，链接未来内容可能变化；我们未将数据导入本站，也未就复用条款作法律判断。

同一 Qwen 模型卡还列出具身相关的 ERQA 与 EmbSpatialBench，分别是 67.5 和 84.5；两项是空间/具身推理能力的报告，不能解释为实体机器人操作成功率。其评测身份和现有目录关系见[具身目录核对](2026-11-09-rlresearch-embodied-crosswalk.md)，这里没有独立核验这些分数。

## 与本地具身条目连接的可能性

同一 DeepSeek 模型在 [EmbodiedLab 论文](https://arxiv.org/html/2610.35385v1)中使用 DSH、high thinking 在物理仿真环境评测。论文给出的 30 个实验均等加权的总体成功率：T0 为 10.0%，T2 为 40.0%；T2 有额外的操作技能，过程分分别为 36.0 和 57.7。这是不同系统配置的结果，不能当作同一裸模型条件下的直接比较，也不能声称是真机成绩。

进一步核查：[论文 §3.2 和表 3](https://arxiv.org/html/2610.35385v1)明确 T2 技能从其他强模型同一批实验的成功运行提炼，属于复用已知解法的诊断条件，不是公开评测协议的一部分；T0/T1 才是论文的评估等级。DeepSeek 的 40.0% 不能与另一模型的 T0 40.0% 混排成同条件并列。模型分别在各自开发者的编码智能体中运行，测试的是模型、工具及设置共同构成的系统。

本站的 Hooke 实验是[任务卡模板](../../content/benchmarks/embodiedlab.json)，不是测得的成绩。原论文附录表 9 报告 Hooke 项目 T0 下 Astra 成功率 100、过程分 100，而 Opus 成功率 0、过程分 35；这是作者各模型在该实验多次运行后的平均值，不是本站样例的输出。论文的总体成功率先在各实验内平均，再对 30 个实验等权平均，不能不确认重复次数便反算总成功回合数。此次未运行仿真，未复算逐回合结果。

[Physical AI Report 的 EmbodiedLab 摘要](https://physical-ai.report/research/arxiv-2026-10-26-embodiedlab-benchmarking-embodied-agents)搜索快照已经说明成功率、模型框架和 T2 使用既有解法的边界；本次直接打开该站未成功，不声称已验证其交互或所有数据。EmbodiedLab 的[官方仓库](https://github.com/HexaFuture/EmbodiedLab)亦有分等级成绩和过程评分，因此这一解释已有公开来源，并非本站独有。

本地已有 [EmbodiedLab 条目](../../content/benchmarks/embodiedlab.json)，但当前发布索引没有把这项独立论文成绩与该发布条目连接，也没有结构化记录这些数值。这个例子展示了可尝试的阅读路径：从模型发布表转到同一模型的独立具身研究，再看测试任务、配置和来源。它不是独占功能的证明，也不能据此认定用户需要或愿意付费。

## 对继续投入的判断

“采集 benchmark，再补上发布时厂商成绩”与 BenchBoard、AIEvals 等已发生直接重叠，不能依赖该功能本身形成明显区别。来源追溯、缺失项、冲突并列与修订历史同样有现成实现。AA 还提供独立运行的测试，不能把其结果与厂商发布值当成同一性质。

可做的低成本验证：挑选一类读者，用这一份发布表和一篇相关具身论文组织少量有出处的记录，邀请读者分别使用现成站点和本站资料回答“这个数来自谁、测了什么、哪些条件不同、能否比较”，记录任务完成、理解偏差、回访意愿和人工维护成本。先设定可以接受的结果；如不能更快更可靠地完成任务，停止扩张成绩功能。这个验证尚未实施，不能把假设写成需求或优势。
