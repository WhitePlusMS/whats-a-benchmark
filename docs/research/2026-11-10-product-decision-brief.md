# 「到底测什么？」产品判断：面向稳定用户

日期：2026-11-10。本文把此前调研压缩成决策依据，**不是调研完结报告，也不是用户访谈结果**。目标是吸引稳定用户、持续更新；目前未取得本站访问、回访或付费数据，未做受访者对照试验。产品现状以本地工作树和所列网页快照为准，不能假定线上与工作树完全同步。

## 先说判断

项目仍值得以有限成本验证，但不建议现在投入建设覆盖所有模型和所有成绩的数据库。原因有三：第一，成绩、解释和中文目录已有直接替代；第二，自动获取分数仍需要核对模型版本、来源、测试条件及使用条款；第三，当前没有证据证明访问者会因这些功能反复回来。

优先测试的方向是：**服务经常阅读中文或英文模型发布报告的人，让他们快速弄懂一张成绩表中的评测是什么、数字从哪来、有哪些比较条件。** 这是利用当前已有内容提出的假设，不是已证明的差异化。此前将 README 描述的批量查询当成已验证能力不准确，具体核查见下文。具身操作研究者作为第二类单独测试的人群，不能因为评测目录已有相关条目就假设他们需要同一种产品。

## 现有能力与直接重叠

补充核查：本站 [BenchCAD](../../content/benchmarks/benchcad.json) 标注为 1.0；在已发布条目的名称、ID 与别名检索中，尚未发现明确的 2.0 或 2.1 独立条目。[官方 2.1 说明](https://benchcad.com/blog/benchcad-2-1)指出 Core 测试样本与 2.0 相同，但交互轮次、推理保留和一项评分规则发生变化，官方明确不建议直接比较两个版本的分数。[官方榜单](https://benchcad.com/leaderboard)也区分标准框架与厂商自定义框架，列出模型档位、来源与成本。该例说明维护发布成绩需核对版本与运行条件，同时上述区分已由官方提供；尚未做用户对照试验，也不能把 CAD 建模自动归为机器人执行评测。

| 同一个问题 | 现有项目能提供什么 | 已有替代与结论 |
| --- | --- | --- |
| GPQA Diamond 测什么，DeepSeek-R1 发布成绩是多少？ | [本地条目](../../content/benchmarks/gpqa-diamond.json)解释评测与条件；发布资料有原始报告入口，但当前没有结构化发布成绩。 | [AA](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)提供说明和自称独立测试的榜单；[Eval Handbook](https://evals.zenheart.site/benchmarks/gpqa/)提供中文解释和发布成绩；[Radar](https://aibenchmarkradar.com/benchmarks/artificial-analysis-gpqa-diamond?lang=en)也列来源和成绩。仅加成绩或中文介绍不是独特优势；不同来源的成绩不能混成同一次测试。 |
| 一张发布报告里多个 benchmark 分别测什么？ | 本地 [README](../../README_ZH.md)描述名称搜索、批量查询、条目说明和 2–3 项比较；本次线上逗号分隔输入四项未找到结果，不能将其视为已验证批量查询。单项 BenchCAD 可搜索。 | Eval Handbook 已有[模型时间轴](https://evals.zenheart.site/releases/)和[报告阅读](https://evals.zenheart.site/book/chapter-08/)；Radar 有评测介绍、来源、成绩和更新入口。待验证的是同一张真实发布表能否在本站更容易读懂，而非假定没人做过。 |
| 机器人模型在 LIBERO / RoboTwin 上成绩如何，能否比较？ | 本地 [LIBERO](../../content/benchmarks/libero.json)和 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)有任务、来源和部分示例；示例不是各模型的完整成绩。 | [司南中文分项榜](https://robo.sinanlab.com/benchmarks)已有模型成绩、论文定位和部分设置；[RoboAtlas](https://www.roboatlas.ai/en-US/benchmarks/libero)已有发布成绩及模型关联；官方文档和运行工具覆盖复现操作。若只搬运相同成绩，同样有竞争。 |
| 一次机器人运行为什么失败？ | 本地部分条目有单次轨迹、视频或失败示例，覆盖与权限随条目而异。 | [AA-Robotics](https://artificialanalysis.ai/articles/aa-robotics/)已有任务视频和分析；[PRM-as-a-Judge](https://prm-as-a-judge.github.io/leaderboard.html?benchmark=robodojo)对已有运行做过程评分。过程展示不是空白，也不能把第三方模型判分当作本站独立实测。 |

上述比较是页面和工作树核查，不是使用者完成任务的计时实验；不能据此说本站更好或对方覆盖全部情况。GPQA 和具身案例的具体来源及限制见[持续竞品调查](2026-11-10-recurring-competitors-and-user-signals.md)、[中文评测站对照](2026-11-09-eval-handbook-comparison.md)和[具身榜单对照](2026-11-09-aa-robotics-same-task-crosswalk.md)。

对同一 Kimi K3.1 Pro，[AIMap 的 GPQA 页面](https://aimap.page/zh-hans/benchmarks/gpqa-diamond/)也给出中文任务简介、局限、模型成绩及来源类型，该页将 K3.1 Pro 的 94.2% 标为 Epoch AI 运行；[模型发布方的模型卡](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)也列出 GPQA Diamond 94.2。**两处数字相同不证明它们是同一次测试、两次独立复测或运行条件相同**：本轮未完成来源链和协议核对。AIMap 的数据快照、行级标注和中文简介说明“中文解释加来源分数”已有另一个直接替代，但不证明该页面涵盖本站全部评测，也不证明任何一方的留存。

### AA 目录与本站的机械交集快照

2026-11-10 读取 [AA 评测目录](https://artificialanalysis.ai/evaluations)的 HTML，提取去重的 `/evaluations/` 详情链接末段，共 39 个；以本站 `content/benchmarks/*.json` 中 `status=published` 的 318 项 `id` 做大小写敏感的精确字符串匹配，其中 19 个匹配：`aa-analyst-agent`、`aa-briefcase`、`aime-2025`、`automationbench-aa`、`critpt`、`gdp-pdf`、`gdpval-aa`、`gpqa-diamond`、`healthbench`、`hle-diamond`、`ifbench`、`livecodebench`、`math-500`、`mlcr-aa`、`mmlu-pro`、`mmmu-pro`、`scicode`、`tau2-bench`、`tau3-banking`。

这是**链接 ID 的机械交集，不是经过身份与版本审核的覆盖率**：AA 路由包括综合指数且只反映此次页面可见链接；同名链接和 ID 也不能单凭名字证明任务协议完全相同。其余 20 个未精确匹配不代表本站未收录，例如 AA 路由 `humanitys-last-exam` 对应本站 `hle`，`terminalbench-2-1` 对应本站 `terminal-bench-2-1`。本站 318 项是本地工作树数据，不是线上部署数量；不同评测的需求热度也不相同，因此不能用 19/39 推算市场份额或用户价值。该快照仅说明用户担心的目录重叠有具体依据，仍须逐项确认来源和能力。

对上述未精确匹配项的进一步人工核对，至少以下关联可从名称、版本及来源确认：AA `harvey-lab-aa` → 本地 `harvey-lab-aa-v1-1`；`humanitys-last-exam` → `hle`；`omniscience` → `aa-omniscience`；`artificial-analysis-long-context-reasoning` → `aa-lcr`；`terminal-bench-science` → `terminal-bench-science-0-1`；`terminalbench-2-1` → `terminal-bench-2-1`；`terminalbench-4-0` → `terminal-bench-4`。这些是**基准／索引条目之间的关联**，不表示两站运行结果相同或已比较页面质量。

另有重要版本差异：本地 [AA Intelligence Index 条目](../../content/benchmarks/aa-intelligence-index.json)的 `version` 字段是 v4.3.2，AA 的[方法页](https://artificialanalysis.ai/methodology/intelligence-benchmarking)本次显示 v5.0.1。可以确认同一指数家族，但不能将两个版本的构成和分数视为完全相同。本轮仅对照这些字段，未逐节审计本地正文、线上部署或确认其他未匹配项均不存在；也未修改评测条目。版本演进见[专项研究](2026-11-09-aa-index-version-user-demand.md)。

对其余未精确匹配项，本轮再核对如下（均为本地数据与当次 AA 页面快照）：

- **同一版本的关联入口：**AA [FrontierCode 1.1 页面](https://artificialanalysis.ai/evaluations/frontiercode)明确其结果使用 1.1 Main，可对应本站 `frontiercode-1-1-main`；AA 的结果由 AA 运行，不能当作本站或 Cognition 独立运行成绩。
- **同家族或相关实现，不能直接算同版：**[APEX-Agents-AA](https://artificialanalysis.ai/evaluations/apex-agents-aa)是 AA 的实现，页面称使用公开集中的 452 个任务；本站有原版 `apex-agents` 和 `apex-agents-1-1`，不据名称断言数据与协议相同。AA `critpt-v2` 对应的本地 `critpt` 不是明确 v2 条目；AA `frontiercode-2-0` 与本地 1.1 Main/Extended 不同版；AA `global-mmlu-lite` 与本地完整集 `global-mmlu` 不同版本。AA 指数 v5.0.1 与本地 v4.3.2 也属此类。
- **限定范围内未发现独立条目：**对 AA 目录的 `aa-3d`、`aa-personalitybench`、`code2video-aa`、`enterprise-ops-gym-aa`、`itbench-aa`、`terminalbench-hard`、`vials-aa`，在本地已发布 JSON 的 `id`、`name`、`aliases` 和 `sources` 字段检查未发现明确对应项；这不是全文、待发布内容或站外资源的穷尽核验，不等于项目完全没有涉及。

至此，上一轮 39 个目录链接均已按精确 ID、不同 ID 但可关联、同家族/版本有差异，或限定范围未发现明确条目做初步归类；19 个精确 ID 项尚未逐个复核协议，故仍不能给出严谨的最终覆盖率。该对照说明双方在主流评测资料上有大量重叠，同时 AA 的独立测试与本站资料整理仍是不同能力。

**对 19 个相同 ID 的版本检查：**逐个请求对应 AA 详情页后，所有请求返回 200，页面标题有两个特别需要纠正的对应关系：

- AA 的 [`/evaluations/healthbench`](https://artificialanalysis.ai/evaluations/healthbench)详情当前标题为 HealthBench Professional，并说明其 525 条临床对话与 HealthBench 的 5,000 条一般健康对话不同；本地精确 ID 命中的是原版 [HealthBench](../../content/benchmarks/healthbench.json)，但正确的同版本阅读入口是另一个 [HealthBench Professional](../../content/benchmarks/healthbench-professional.json)。AA 目录页抓取快照的卡片仍写原版 HealthBench；本轮无法确认其不同页面展示差异的原因，也不推断其他时间页面状态。
- AA 的 [`/evaluations/gdpval-aa`](https://artificialanalysis.ai/evaluations/gdpval-aa)详情标题为 GDPval-AA v2.1；本站同时有通用 [GDPval-AA](../../content/benchmarks/gdpval-aa.json) 和专门的 [GDPval-AA v2.1](../../content/benchmarks/gdpval-aa-v2-1.json)，不应只按 URL 命中通用条目后丢掉版本。
- AA 的 [`/evaluations/tau2-bench`](https://artificialanalysis.ai/evaluations/tau2-bench)明确为 Telecom 领域；本站 [τ²-bench](../../content/benchmarks/tau2-bench.json)是包含多领域的条目，阅读成绩时需要保留 Telecom 条件。

这里完成的是 19 个详情页 HTTP 与标题层面的快速核对，以及上述三项的本地版本字段对照；**不是 19 项全部题集、提示词、评分器和测试设置的逐条验收**。同名匹配数仍只反映机械 ID，不能直接作为完全一致的评测数或覆盖率。

## 已有发布资料入口：以 DeepSeek-R1 为例

此前对本站现状的表述遗漏了一个已有入口：[发布资料索引](../../src/views/ReleasesView.vue)按月份列出模型发布资料，卡片链接官方资料和相关评测条目，并展示备注；评测详情中的“模型发布资料中的引用”也可链接回对应卡片（[实现](../../src/views/DetailView.vue)）。这已经覆盖“从一份发布资料找到多项评测解释”的一部分流程，而不只是单个 benchmark 搜索。

在本地 [发布资料数据](../../content/releases.json)中，DeepSeek-R1 条目关联 8 个评测，包括 GPQA Diamond、AIME 2024、MATH-500 与 SWE-bench Verified，另链接[官方仓库](https://github.com/deepseek-ai/DeepSeek-R1)；本地数据中的 Kimi K3 条目关联 18 个评测。索引卡片本身列出评测链接及备注，并非逐项结构化展示模型成绩与测试协议；要查看原始数值仍需访问原资料。该轮核对是本地源码和数据，不是对线上所有发布卡片的交互验收，也不能据此判断使用者能否容易找到入口。

对照方面，[Eval Handbook 时间轴](https://evals.zenheart.site/releases/)也提供模型发布资料与成绩记录，[AA 的 GPQA 页面](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond)提供评测说明和独立测试结果。三者的来源及测试口径不同。本站的关联能力是现有基础，但其是否更易发现、是否足够让读者回来，以及补齐成绩后的维护成本，仍需通过同题实验和实际整理记录验证。

## 一份真实报告的阅读入口：Kimi K3.1 Pro

选择[发布方模型卡](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)的公开成绩表做一次**人工抽样**，并不代表报告全文或所有模型发布的覆盖率。以下按报告原名查本地已发布条目：

| 报告中的名称 | 本站可供阅读的相关条目 | 限制 |
| --- | --- | --- |
| Terminal-Bench 4.0 | [Terminal-Bench 4.0](../../content/benchmarks/terminal-bench-4.json) | 同名；具体模型的运行框架仍需读报告。 |
| Terminal-Bench-Science 0.1 | [Terminal-Bench-Science 0.1](../../content/benchmarks/terminal-bench-science-0-1.json) | 同名版本；不等于通用 Terminal-Bench。 |
| SWE Marathon v1.1 | [SWE-Marathon](../../content/benchmarks/swe-marathon.json) | 名称相关；本地条目未明确写 v1.1，此次不确认版本完全相同。 |
| BenchCAD，含 w/ tools、w/o tools | [BenchCAD](../../content/benchmarks/benchcad.json) | 同一评测的工具条件须分开；不能将两个数字自动合并。 |
| Program Bench | [ProgramBench](../../content/benchmarks/programbench.json) | 名称形式不同；报告脚注说明该表采用二元阈值口径。 |
| DeepSWE v1.1 | [DeepSWE v1.1](../../content/benchmarks/deep-swe-v1-1.json) | 同名版本；具体运行条件仍需回到报告。 |
| HLE-Full、HLE-Full w/ tools | [Humanity’s Last Exam](../../content/benchmarks/hle.json) | 指向 HLE；工具条件和 Full 数据划分需核对，不能把条目名称当作协议等同。 |
| HLE-Diamond | [HLE-Diamond](../../content/benchmarks/hle-diamond.json) | 与 HLE-Full 分开阅读。 |
| GPQA-Diamond | [GPQA Diamond](../../content/benchmarks/gpqa-diamond.json) | 同名；分数是发布方报告，非本站独立评测。 |
| BrowseComp | [BrowseComp](../../content/benchmarks/browsecomp.json) | 与本站 BrowseComp-ZH 条目区分。 |

上表是手工选择的 10 组名称，存在一项明确的版本待确认，不能说“整个报告都已覆盖”；尚未完成全面的批量识别评估或真实读者测试。此次线上十个对应 URL 均返回 HTTP 200，其中对四页原始 HTML 确认包含相应名称；这不构成十页的完整线上内容或交互验收。

**整张发布表的工作量快照：**2026-11-10 读取[模型卡原始文件](https://huggingface.co/moonshotai/Kimi-K3.1-Pro/raw/main/README.md)第 3 节的第一张 HTML 表，解析出 47 个含六个模型结果列的评测行、282 个结果单元格，其中 247 个非空、35 个为破折号；8 行名称明确带 `Internal`。这是**表格行与单元格数量**，不是 47 个不同 benchmark 或 247 次独立实验：同一评测可能分工具条件或子集，`ZeroBench_main (avg@5 / pass@5)` 等一个单元格也含多个数字。该表当前有脚注说明，GDPval-AA v2.1、AA-Briefcase v1.1 和 AutomationBench-AA 成绩引用 AA，APEX-Agents 引官方榜；不能把表内所有数字标为发布方自行测试。缺失单元格也不能写为零。

初步以本地已发布条目的 `id`、名称、别名匹配表中名称时，候选结果含 HLE-Full 的名称别名及 OSWorld V2.1 的具体版本待人工核查；宽松匹配还产生 `tau-bench` 等无关误命中。`PerceptionBench` 在本地已发布 benchmark JSON 文本检索未找到，模型卡脚注称其为内部评测。本轮没有完成全部 47 行的版本映射或审核每个外部结果的转载权限，因此不能给出整表准确覆盖率。它表明整理“发布表的所有成绩”至少涉及行级对象、不同条件、来源与未知字段，不应按截图数字直接批量转成统一榜单；上述 247 是该模型卡里六个模型的记录，不应当成本站实际录入成本或目标用户数量。

按固定版本模型卡逐行人工建立了[47 行对应清单](2026-11-10-kimi-release-row-crosswalk.md)：46 行找到相关已发布条目，PerceptionBench 未找到明确条目；这个统计包含宽泛条目与待确认版本，不是协议覆盖率，也不代表成绩已录入。OSWorld V2.1 对应本地 `osworld-2-1`；SWE-Marathon 的 v1.1 身份、Agents’ Last Exam 的细版本及 HLE-Full 划分仍须核对。

**同一份表已有直接竞品：**[AIEvals 的 Moonshot 来源页](https://aievals.app/sources/kimi-ai)声称保留 Kimi K3.1 Pro 发布表的全部 47 行及六个对比模型列，并处理缺失值和部分复合指标。2026-11-10 抽查其 [SWE-Marathon](https://aievals.app/benchmarks/swe-marathon)、[Agents’ Last Exam CLI](https://aievals.app/benchmarks/agents-last-exam-1-1-cli)及 [PerceptionBench](https://aievals.app/benchmarks/perceptionbench)三页，Kimi 分别是 51.7、44.2、68.3，与本次固定模型卡对应格一致；页面提供来源和设置说明，并将这份报告作为发布资料分组。其来源说明也明确表内含其他榜单引用和不同运行框架，不能把整表所有模型结果都说成 Moonshot 自己测试。**47 行全部已收录是对方自述；本站本次只复核三行，未逐格审计完整性、是否有翻译或实际用户体验。**

这比“有人也做成绩榜”更直接：**我们选择的同一张真实模型发布表，已经有产品按评测拆分展示成绩与来源。**因此，用本站已收录的 46 个相关评测条目补上这张表，单凭该组合仍不能证明有独特优势；下一步应通过实际读者任务比较，而不是继续只增加同类记录。

**同模型报告的不同来源快照不能直接合并：**[固定版本 Hugging Face 模型卡](https://huggingface.co/moonshotai/Kimi-K3.1-Pro/blob/d9e99b0792a5e93b78ea9bea62a68167e36ddd9e/README.md)在 ALE ALL 的 GPT-6 Astra 列为 41.8、CLI 为 44.2；[AIEvals 的 ALL 页面](https://aievals.app/benchmarks/agents-last-exam-1-1-all)为该模型列 32.8，[CLI 页面](https://aievals.app/benchmarks/agents-last-exam-1-1-cli)列 38.8。AIEvals 标注来源是 [Kimi 发布博客](https://www.kimi.ai/blog/kimi-k3-1-pro)，并称 2026-10-24 读取；本轮在浏览器放大核对[博客当前图表](https://kimi-img.kimi.ai/pub/slides/kimi-fs/managed-assets/43394bf2-0bfe-4f41-8f93-bb7fb3a079c2.webp)：`Agents’ Last Exam` 中 GPT-6 Astra 显示 41.8，与固定模型卡的 ALL 行一致；图表该处未单独标明 ALL 或 CLI。图表未见 CLI 对照行，且没有取得 AIEvals 声称的 2026-10-24 历史图片，无法确认当时原图是什么或两处协议、修订是否相同。因此差异仍待查，不认定 AIEvals 抄错，也不能据此认为模型能力发生变化。前述三项 Kimi 自身数值一致只是抽样，不能外推整表。

**线上搜索实际检查：**2026-11-10 在[线上首页](https://whiteplusms.github.io/whats-a-benchmark/)的搜索框输入 `Terminal-Bench 4.0, BenchCAD, GPQA Diamond, BrowseComp`，页面显示 0 项；换成单个 `BenchCAD` 显示 1 项并出现对应条目。[本地搜索实现](../../src/lib/search.ts)也将整个查询字符串标准化后匹配，而非在该函数中按逗号拆分。此前根据 README 说“已有批量查询能力”应更正为“README 有此描述，但这次输入方式不支持”；此次没有排查所有页面或所有可能入口，也没有做读者可用性测试。线上首页当时显示模型评测 267 项，不能与本地包括具身在内的 318 个生成条目直接对比。

同一[Eval Handbook 模型页](https://evals.zenheart.site/models/kimi-k3-1-pro/)当次可访问，页面已有 Terminal-Bench 4.0 的 65.7% 和 BenchCAD 使用工具的 92.7% 等记录，标注厂商报告和来源；HLE 行显示图表中无可读数值。模型卡当前可读 HLE-Full 及工具版结果，但两处引用的发布材料、更新时间可能不同；不能直接据此认定竞品错误或所有条目均滞后。这是非常直接的竞争：竞品已经把**同一模型、部分成绩和来源**串起来；本站是否能让人更容易理解整张表、找到任务样例或识别版本，必须通过同题用户测试。

## 具身同题对照：π0.5 在 LIBERO 上的成绩能直接比较吗？

任务是让机器人模型使用者找到 π0.5 的 LIBERO 成绩、模型检查点和评测口径，判断另外一次运行能否直接比较。

- 本地 [LIBERO 条目](../../content/benchmarks/libero.json)介绍模拟操作任务、成功率及任务组、初始状态和随机种子等限制，并给出训练示范和第三方单次评测录像；这些例子不是模型成绩榜，也不是该模型的完整复现实验。
- [司南 LIBERO 分项表](https://robo.sinanlab.com/benchmarks)列 π0.5 在 Spatial、Object、Goal、Long 上分别为 98.8、98.2、98.0、92.4，标注 `pi05_libero` 检查点和 30k 微调步数，并链接其所引的官方 README；对该记录注明来源未写试验次数。它也记录其他模型的不同测试条件，因此不能把同一表格默认理解成完全相同协议下的独立横评。
- [RoboAtlas LIBERO 页](https://www.roboatlas.ai/en-US/benchmarks/libero)列出 π0.5 的对应分项成绩，将其标为发布方报告、未独立复现；页面版块同时显示“LeRobot 400-episode protocol”。本轮没有拿到该 π0.5 条目所指原始实验的完整协议，不能仅根据版块标签认定原始成绩一定采用该次数，也不认定两个网站存在错误。
- 一位中文开发者在 [RLinf issue #656](https://github.com/RLinf/RLinf/issues/656)自报同一个 RLinf π0.5 检查点，在两套流程中运行同一 LIBERO-10 单任务得到不同结果；协作者建议对齐其所列的动作和去噪配置，提问者后来自报调整后正常，但没有贴出完整复测成绩和记录。这里的检查点和单任务结果不能等同上面官方分项表。该讨论表明复现者实际会追问具体配置，不证明原因已被本站独立验证。
- [vla-eval 论文 v3](https://arxiv.org/abs/2603.13966)介绍仿真评测框架及论文成绩汇总，作者报告复现实验并公开配置；其[榜单](https://allenai.github.io/vla-evaluation-harness/leaderboard/)称数据来自已发表论文。论文中的复现实验和榜单中的所有汇总记录不是同一个集合，不能说每条榜单成绩都经过独立复现。

**决策含义：**具身方向同样已有带来源和部分协议的成绩产品，也有解决实际运行的工具。如果本站只添加通用成功率表，现有证据不足以说明用户会因此稳定回访。更具体的可测假设是：把任务组、检查点、微调、试验次数、原始出处和已知问题放在一起，可以帮助读者定位适用资料；但维护者必须追查版本、记录缺失项和更正，且用户是否采用、能否节省时间以及维护成本尚未测试。

## 中文具身模型发布报告：本站现有评测能帮助读什么？

本轮重算 `content/benchmarks/*.json`：有 50 个 `status=published` 且具备 `embodied` 字段的条目，其中 47 个带操作标签、15 个带导航标签、15 个带双臂标签；一个条目可有多个标签，不能将这些数相加。这只是该字段下的快照，不等于涵盖所有具身相关内容或全部外部 benchmark。

[SenseNova-RoboRSI-27B-Preview 中文模型卡](https://huggingface.co/sensenova/sensenova-roborsi-27b-preview/blob/9f793e6/README_zh.md)提供一个可用的真实阅读任务：报告引用 [LIBERO-PRO](../../content/benchmarks/libero-pro.json)、[RoboCasa365](../../content/benchmarks/robocasa365.json) 和 [RoboDojo](../../content/benchmarks/robodojo.json)，三者都有本站条目。模型卡对 LIBERO-Pro 区分 VLA 配合执行和 VLM 直接控制，并分别报告 92.5% 与 95.0% 成功率；对 RoboDojo 同时报告 26.13 平均得分和 20.83% 成功率。数字来自模型发布方，不能把平均得分当作成功率，也不能将不同执行架构的结果视为同一配置。

模型卡自身已提供中文说明、LIBERO-Pro 和 RoboCasa365 的运行示例，并称 RoboDojo 复现支持待后续开放；其真机演示与三个仿真评测分开展示。本文没有运行这些命令、核验数字或证明本站覆盖该模型报告全部信息。可用于用户测试的问题是：读者能否从模型卡及本站三个条目区分三个测试在测什么、两套 LIBERO 执行架构以及 RoboDojo 两种指标，再与只看模型卡及官方资料对照。**目前没有受访者结果，不能声称增加条目链接就形成独有价值。**

## 持续更新的具体取舍：官方榜单是否必须镜像？

[vla-evaluation-harness 的榜单维护说明](https://github.com/allenai/vla-evaluation-harness/blob/main/leaderboard/CONTRIBUTING.md)提供一个可参考的实际取舍：对 RoboTwin 2.0、RoboDojo 等已有官方榜单的评测，项目维护者要求展示官方链接，而不把成绩复制到自己的榜单数据中。说明列出的原因包括镜像同步间隔造成过时、模型与论文的映射需要人工核对，以及镜像与权威来源发生偏离；它也写明，当论文开始经常报告某个协议的成绩时，可以另行启用论文提取。

这不是证明所有官方榜都不应汇总，也不是本站的实际维护工时。它提示可以按需求决定资料粒度：先保存官方榜入口、评测含义与核查日期；只有用户确实需要跨来源对照，且能够维护来源、版本、协议和更正时，再考虑结构化收录特定成绩。是否按此调整本站产品，需要结合实际读者测试，不以竞品维护策略替代自己的判断。

涉及 AA 数据时，[其数据 API 文档](https://artificialanalysis.ai/data-api/docs)要求署名，并要求另行联系确认再分发或特定合同条款；[其数据 API 产品页面](https://artificialanalysis.ai/data-api)将再分发列入商业方案用途。不能因为结果页面可见、免费 API 可用或标注出处，就假定可以在本站公开转载；具体能否使用以适用条款和实际授权为准，本研究不作法律结论。

## 哪些人可能回来

| 候选人群 | 可观察的回访触发 | 现有证据和最大缺口 |
| --- | --- | --- |
| 关注新模型发布的中文读者、内容作者 | 每出现新模型报告，又遇到不认识的评测或不清楚分数条件。 | [公开问题](2026-11-09-benchmark-user-needs.md)显示有人询问评测含义和榜单差异；尚无证据表明他们会选择本站或下次再来。 |
| 需要了解机器人评测的开发者 | 开始复现或换模型时，需要确认任务、数据集、硬件、版本和评分。 | [中文开发者记录](2026-11-10-chinese-embodied-practitioner-workflows.md)显示实际查找和复现问题；已有官方文档、中文笔记和专业榜。本站能否节省时间未验证。 |
| 持续选模型的开发者 | 新模型、价格、延迟或业务要求发生变化时重新比较。 | 更新频率、价格和实际表现是潜在回访原因，但 AA 等是强替代；本站当前没有独立测评、实时价格或完整成绩，覆盖成本较高。 |

这些人群是研究者据公开问题归纳的假设，不是已经识别出的本站用户。一次搜索解决问题也不自动形成稳定回访。

## 接下来如何验证

先从现有内容中选一份真实发布报告，保留原报告链接和日期，选 5–8 个已收录与未收录评测，手工做一张来源清晰的阅读样稿。**先记录准备耗时和信息缺口，不建设全量成绩系统。**

邀请少量确实经常阅读发布报告的人执行相同任务：找到某一评测测什么、一个成绩来自厂商还是独立测试、两条数字能否直接比较。以原报告和现有竞品作为可用对照，记录正确性、出处、耗时和不知道的原因；预试后再决定样本规模和阈值。研究材料可沿用[阅读测试](2026-11-09-reader-study-protocol.md)，但需针对所选报告重新核对。

随后观察 2–4 周内自然出现的新报告，记录参与者是否主动再次查找，以及内容从发现、核对到更新实际花费多少时间。小样本只能帮助排除不合适的方向，不代表市场规模；在没有受访者和访问数据前，不宣传“用户喜欢”“提升效率”或“已有留存”。具体招募和发送邀请尚未进行。

如果读者完成任务时现有竞品已经足够，或不愿在新报告出现时回来，就应停止扩大该方向的建设；如果他们多次主动使用且维护成本可承受，再讨论增加来源明确的成绩与更新机制。具身方向使用另一组真正阅读机器人报告或做评测的人执行同样对照，避免把普通读者的结果外推给研究者。
## 补充：更新频率与具体任务需求

2026-11-10 对当前本地 `content/releases.json` 的 19 条发布资料进行关联核对，共引用 73 个不同 benchmark ID，所有引用均对应本地已发布条目。该检查只核对内部 ID 和状态，没有验证所有外部链接、成绩或版本。当前索引包含 Kimi K3，但没有 Kimi K3.1 Pro；其模型卡首表的 47 行中，46 行有相关本地条目，包含版本待核项，详见[逐行清单](2026-11-10-kimi-release-row-crosswalk.md)。这说明现有解释可复用，但新增报告仍需单独发现、关联和核对，不能证明线上已同步。

- **更新的两种含义。** 一位中文榜单使用者[询问能否查看模型每月成绩变化](https://github.com/llm2014/llm_benchmark/issues/38)，因为切换月份不方便；这是一人提出的功能建议，不等于本站已有回访。模型发布时的单次成绩不构成后续变化序列；即便有历史分数，模型版本、测试题及评分协议也可能改变，不能据分差断言模型能力变化。[LLM Stats 开发者页](https://llm-stats.com/developer)已列模型历史数据接口；[DailyBench](https://github.com/jacobphillips99/daily-bench)描述定期运行测试，未在本站部署验证。
- **SQL 选型线索。** 一位中文使用者[寻找较新的 SQL 模型榜单](https://github.com/llm2014/llm_benchmark/issues/11)，未说明数据库或业务场景。[Spider 2.0](https://spider2-sql.github.io/)提供 text-to-SQL 工作流和官方榜；本地名称及关键词筛查未找到明确独立条目，不排除别名。[SyneHQ](https://synehq.com/evaluations/text-to-sql-leaderboard/)已有跨 SQL 评测的公开成绩汇总，明确不由其自行评测。AA 的 [EnterpriseOps-Gym-AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)使用 SQL 验证器检查数据库状态；评分使用 SQL 不等于被测模型正在执行 Spider 2.0 的 SQL 生成任务。尚未穷举 AA 子任务，不能声称其没有 SQL 相关能力。
- **具身范围与表达。** 当前本地 50 条带 `embodied` 字段的已发布记录包括不同版本且允许多标签；另有未标记的 EmbodiedX 和通用评测中的机器人相关子任务，因此 50 不是全部关联内容。[样例审查](2026-11-09-robot-rollout-success-evidence.md)记录五条标题含“真实轨迹”但材料描述为仿真训练示范，可能使读者误认为真机；未验证线上状态或读者是否误解，也未修改产品。相关公开资料和竞品已有视频、结果和配置，不能据此宣称独占。

上述是不同人提出的问题及限定范围核对，不是本站用户访谈、留存或付费数据；不能因这些问题存在就自动扩建 SQL 榜、长期实测系统或具身产品。
