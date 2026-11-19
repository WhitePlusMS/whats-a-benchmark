# Benchmark 项目：社区需求与产品方向调研

调查日期：2026-11-09。问题：除模型成绩排行榜外，「到底测什么？」是否能解决真实用户提出的问题，与 Artificial Analysis（AA）等形成有意义的区别？

中文编程选型补充：[前后端榜单需求与现有工具](2026-11-09-chinese-coding-model-selection-demand.md)核对社区问题、本站 WebDev/DeepSWE，以及私有测试和多榜聚合的竞争；未开展读者实验。

后续同题核查：[SWE-bench 题目与运行轨迹](2026-11-09-swe-verified-task-trajectory-crosswalk.md)对照本站样例、第三方轨迹和提交/评测区别，记录现有工具及一个具体说明不一致；未运行评测。

直接竞品和小样本调查补充：[BenchNavigator 从业者调查与产品对照](2026-11-10-benchnavigator-survey-competition.md)；该原型已有评测筛选、对比和 Robotics 领域选项，23 人问卷不代表中国或机器人市场。

## 方法、范围和限制

- 检索 Reddit、Hacker News、GitHub issues、V2EX、LINUX DO、X、日文 Qiita/Zenn，以及法文和西语的一手用户或项目作者材料；辅助核查 AA、LLM Stats、OpenCompass 等产品和评测指南。关键词包含 benchmark meaning、different leaderboard、reproduce、real-world task、evaluate locally、榜单、评测口径、日语ベンチマーク等。
- 下列列出 28 条社区/项目作者线索（按编号计数，个别为同一讨论的不同评论；不是 28 个独立市场样本）。其中中文 5 条、英文 19 条、日文 2 条、法文 1 条、西语 1 条；X 内容包含在英文线索内。时间跨度包括 2024–2026，但部分帖子的精确日期未独立核实，以原帖为准；平台显示的阅读数、点赞和评论数是当时快照，不等于独立需求人数。
- 检索受搜索索引、语言、关键词、登录、排序及公开可读性限制。LINUX DO 页面有直接抓取失败的情况，相关线索来自搜索索引和协作者的页面核验；X 网页部分返回 403，其公开 syndication 接口返回的长帖可能截断。没有访问私人群聊，也没有系统性覆盖小红书、微信、各语言社区。没有访谈、转化、使用或付费意愿数据，不可推断市场规模。
- Reddit、V2EX 等帖子记录的是作者观点或问题，不等于其原因已经成立；自荐和项目 README 可能包含推广。技术事实以相应官方文档或评测原始材料另行核实。分类是研究者归纳，不代表提出者要求实现某个功能。

## 一手需求线索

### 读懂评测、成绩与榜单

1. **英文、普通模型使用者**：[GeminiAI 评论](https://www.reddit.com/r/GeminiAI/comments/1l4nmkk/comment/mwb58im/) 在一张含 HLE、GPQA、AIME 等成绩的对照表下明确问各项指标是什么、分数高低如何解读。另一位评论者不理解 HLE 缩写并求资料：[评论](https://www.reddit.com/r/GeminiAI/comments/1l4nmkk/comment/mwbw7og/)。这证明读表困难，不证明读者愿意转到另一网站。
2. **中文、开发者**：[V2EX：大模型排行榜到底哪个权威](https://v2ex.com/t/1231896)，2026-08-04，发帖者看到同一模型在 Arena、LLM Stats、AA 排名不同，问该信哪个。回复分别讨论匿名偏好、评测集和自己体验；63 条回复是讨论数，不是需求人数。排名不同不能单凭此认定谁错。
3. **英文、本地模型用户**：[AA 指数更新讨论](https://www.reddit.com/r/LocalLLM/comments/1wc5ex8/) 中，发帖者看到同一模型分数下降，问模型是否变笨。评论给出对测试集变化的解释，是评论者观点；具体变更须查 AA 版本文档。
4. **日文、读者自述**：[Qiita：用 Benchmark 理解 AI 模型](https://qiita.com/kentawata/items/9d050dafe72f4d371b1f) 作者表示看到厂商柱状图时不清楚测试内容，按用途整理介绍。文章是个人整理，不是已验证产品需求规模。
5. **英文、普通使用者**：[r/OpenAI：用哪些 benchmark 比较模型](https://www.reddit.com/r/OpenAI/comments/1kdt32e/) 直接询问编程、写作等任务应参考哪些测试；同帖讨论也指出测试覆盖的语言与自己的开发语言可能不同。
6. **英文、评测工程师**：[lm-evaluation-harness #2872](https://github.com/EleutherAI/lm-evaluation-harness/issues/2872) 的提问者读过资料后仍不清楚榜单具体用什么 prompt template、few-shot；维护者给出配置入口，提问者表示有帮助，issue 关闭。这是定位来源困难，非独立新产品请求。
7. **中文、评测工程师**：[OpenCompass #1435](https://github.com/open-compass/opencompass/issues/1435) 询问官网多个数据集分别为 0-shot、5-shot 还是其他设置；这是与上一条不同用户的类似问题。

### 来源、口径和结果为何不同

8. **英文、评测工程师**：[lm-evaluation-harness #2091](https://github.com/EleutherAI/lm-evaluation-harness/issues/2091) 用户询问本地成绩和榜单差异；讨论涉及原始分数和归一化值、运行设置。应查看完整线程，不能断言所有差异只有一个原因。[HF FAQ](https://github.com/huggingface/leaderboards/blob/main/docs/source/en/open_llm_leaderboard/faq.md) 已提供相关解释，是已有解决方案。
9. **中文、评测工程师**：[OpenCompass #1752](https://github.com/open-compass/opencompass/issues/1752) 自定义数据集回答看似正确却得 0 分，维护者建议导出细节，用户随后发现答案抽取为空、切换 evaluator 后有成绩。这是单个排查案例，不代表所有零分都由抽取造成。
10. **中文、评测工程师**：[OpenCompass #1818](https://github.com/open-compass/opencompass/issues/1818) 用户针对 GSM8K 输出质疑答案抽取和评分稳定性；这是问题报告，不是对全部成绩错误的定论。
11. **英文、使用者**：[SWE-bench Verified 榜单讨论](https://www.reddit.com/r/LocalLLaMA/comments/1qnt8vp/) 用户困惑不同来源的模型结果和榜单收录。其关于作弊或偏见的推测未证实，不作为事实；适合说明有人需要追溯来源和协议。
12. **英文、分析者**：[OpenCompass #2574](https://github.com/open-compass/opencompass/issues/2574) 讨论同分仍严格排序以及是否需要不确定性区间。作者给出的概率依赖其统计假设，不作为已确认事实；该 issue 也指出 CompassArena 已提供区间。
13. **英文、评测工具使用者**：[SWE-bench #665](https://github.com/SWE-bench/SWE-bench/issues/665) 询问能否在结果中区分智能体失败和环境/启动失败。[官方指南](https://github.com/SWE-bench/SWE-bench/blob/main/docs/guides/evaluation.md)已有相关失败类型说明；这类问题不一定需要另一资料站解决。
14. **英文、榜单使用者**：[SWE-bench #691](https://github.com/SWE-bench/SWE-bench/issues/691) 因依赖榜单选择工具而询问提交结果与页面更新时间；是否实际停更只是提问者疑问，不是本次核实结论。

### 任务相关性与实际使用

15. **英文、本地模型用户**：[最贴近实际的 Benchmark？](https://www.reddit.com/r/LocalLLaMA/comments/1xevwim/most_realistic_benchmarks/) 发帖者询问编程、研究和办公应看什么测试，认为部分公开成绩和实际使用不符；评论推荐具体测试，也有人只信自己的私有测试。该判断是参与者观点。
16. **英文、本地用户**：[本地评测用什么](https://www.reddit.com/r/LocalLLaMA/comments/1wi2en4/what_benchmarks_do_you_run_locally/) 提问者想比较量化、工具调用、上下文长度和不同配置，又担心自选测试不能反映真实差别。
17. **英文、应用开发者**：[个人评测套件讨论](https://www.reddit.com/r/LocalLLaMA/comments/1qz86f3/do_you_have_your_own_benchmark_for_an_llm_do_you/) 用户描述用自己关心的问题/答案持续比较模型。它反映个人习惯，不证明普遍需求。
18. **英文、软件开发者**：[SWE-bench #672](https://github.com/SWE-bench/SWE-bench/issues/672) 用户称遇到代码通过任务却有连接管理和效率问题，提出质量、性能等是否被评估。生产事故是发帖者自述，未独立验证。
19. **中文、社区讨论**：[LINUX DO：中文日常场景评测](https://linux.do/t/topic/966623) 发帖者希望覆盖中文写作、工具调用、上下文等；评论也质疑盲测、多轮成本和严谨性。直连本工具不稳定，未将互动数字作为统计结论。
20. **X、开发者观点**：[Karpathy 的任务示例讨论](https://x.com/karpathy/status/2083749667410727319) 讨论用更复杂的生成任务观察模型。X 常规网页受限，公开 syndication 返回长文不完整；此为个人观点与演示，不是用户需求问卷或有统计代表性的证明。
21. **日文、本地开发者**：[Zenn：本地模型实际编码任务测试](https://zenn.dev/koki_n22/articles/dd6a4bbffca166) 作者想知道在自己的硬件、量化、上下文和工具框架下任务如何完成及失败，于是自建测试；文章明确每个模型每题只运行一次，不能由此泛化排名。
22. **法文、职业培训者**：[r/ollama：法语实际任务评测](https://www.reddit.com/r/ollama/comments/1w0tx7i/tests_de_ma%C3%AEtrise_du_fran%C3%A7ais_les_mod%C3%A8les_chinois/) 作者称法语输出质量比编码榜单更贴近自身工作，并自行设计任务；其结果与观点属于个人经验。
23. **西语、项目作者**：[西语业务测试项目](https://github.com/ctala/ai-benchmarks-alternativos) 作者称想针对西语、商业和自动化使用选择模型而建设测试；它同时证明有相关动机和已有方案，不能当独立用户反馈。

### 看任务与过程，以及动手评测的成本

24. **英文、本地模型用户**：[64 个模型、139 个提示的输出对照](https://www.reddit.com/r/LocalLLaMA/comments/1dlxyo8/) 作者明确说想了解模型如何回答，成绩难以建立对行为的直觉；有评论进一步希望看拒答率。结果来自作者自己的测试，不证明他人愿意持续浏览。
25. **英文、工具作者**：[逐题对照工具](https://www.reddit.com/r/LocalLLaMA/comments/1w9ad9q/i_built_an_llm_benchmark_harness_that_lets_you/) 作者表示 JSONL/Parquet 结果难阅读，因此实现浏览模型每题回答的工具；也是已有竞品，不是空白。
26. **英文、本地模型用户**：[24GB 模型对照](https://www.reddit.com/r/LocalLLaMA/comments/1i8tx5z/) 作者报告自跑测试时遇到工具文档难用等问题。它支持运行指导需求，但文档状态可能已变化。
27. **英文、使用者**：[小模型用什么测试套件](https://www.reddit.com/r/LocalLLaMA/comments/1x403ka/im_testing_small_local_models_is_metrillm/) 询问如何选择；回复同时建议标准套件、少量测试和关注运行成本。少量题目结果不能冒充完整基准成绩。
28. **英文、反例**：[HN：AI 评估讨论](https://news.ycombinator.com/item?id=45856804) 多名参与者讨论评测复杂、缺乏真实业务对应关系，也有人强调产品测试或人工评估。并非每位用户都希望阅读详细过程，更不能把愿意自己做评测的用户视为资料站用户。

**补充研究**：[19 位从业者访谈](https://arxiv.org/abs/2412.05520) 研究 Benchmark 对使用或选择不使用它的从业者的信息价值。它是独立定性支持，样本较小，不能外推市场规模或确认本项目需要何种产品。

## 现有产品和反例

**BenchScout 同题补查（2026-11-10）：**[BenchScout](https://evalpro.online/search.html) 面向软件工程评测发现；其 [22 人问卷](https://github.com/AISE-TUDelft/AI4SE-benchmarks/blob/main/scout/README.md)含 9 位产业界、13 位学术界参与者，属于体验后的自报评分，不证明持续使用或本站效果。浏览器实测搜索 `SWE-bench` 并切换列表，返回原版 SWE-bench、SWE-bench Goes Live、Multi-SWE-bench 等；打开原版详情，可见英文摘要、年份、DOI、编程语言和任务类别。此前网页抓取曾遇到验证页，本次浏览器可用，不能将前次情况推断为站点不可用。此为单次搜索，不代表所有条目均存在或版本口径一致；尚未对比使用者完成任务的效率，也未核查是否显示题目样例或模型成绩。原版 SWE-bench 与本站 SWE-bench Verified 是相关但不同的评测条目。

| 已有方案 | 实际覆盖 | 约束与启示 |
| --- | --- | --- |
| [AA 评测目录](https://artificialanalysis.ai/evaluations)及 [GPQA 中文页](https://artificialanalysis.ai/zh/evaluations/gpqa-diamond) | 说明、成绩、成本、速度、例题；部分中文 | 解读、中文和样例均非独占，AA 同时独立测试。 |
| [AA MicroEvals](https://artificialanalysis.ai/microevals) | 页面说明可将用户自己的提示词用于多个模型比较 | 自定义 prompt 比较并非空白；本次未登录实测完整操作、价格或隐私细则。 |
| [LLM Stats](https://llm-stats.com/methodology/llm-stats-score) | 汇集来源、原始成绩及综合索引 | 发布成绩聚合已有竞争，不应只做另一份表格。 |
| [Eval Handbook](https://evals.zenheart.site/benchmarks/) | 中文评测档案、模型发布时间轴、厂商报告解读和任务选型；其 [GPQA 页面](https://evals.zenheart.site/benchmarks/gpqa/)直接关联发布成绩 | 与“解读发布图/报告”的候选路线高度重叠；[同题验证及局限](2026-11-09-eval-handbook-comparison.md)不代表对方数据全已验真。 |
| [OpenCompass](https://github.com/open-compass/opencompass/blob/main/README_zh-CN.md) | 中文资料、评测框架、导航和榜单 | 不能把中文 benchmark 目录说成没有竞品。 |
| [HF 评测指南](https://github.com/huggingface/evaluation-guidebook/blob/main/contents/troubleshooting/troubleshooting-reproducibility.md) | 复现、测试设计与排障 | 如果只写通用指南，已有较成熟文档。 |
| [ModelDial 项目自荐](https://v2ex.com/t/1254563) | 作者称做中文模型实测、套餐对比及型号辅助检测 | 作者自报数据及覆盖未独立验证；中文实测与价格也有竞争。 |
| [lm-eval-ledger 讨论](https://www.reddit.com/r/LocalLLaMA/comments/1w9ad9q/i_built_an_llm_benchmark_harness_that_lets_you/) | 作者开发逐题回答查看与对比 | 要展示模型行为需真实运行或取得可复用来源；评测工具有竞争。 |
| [法语 LLM Benchmarks 指南](https://llmbenchmarks.io/fr/guides/) | 明确成绩可比性规则与来源 | 版本、工具、评分口径对照并非独创。 |

## 基于证据的候选方向：仍是待验证假设

1. **解释一张发布图/榜单的阅读入口（优先试验）**。受线索 1–4、6–7 启发：用户输入报告里一组 benchmark 名称，得到各项测什么、分数方向、具体任务和来源，链接已有条目；再点进所选榜单的方法与版本。项目已有中文解释和条目关系，但批量名称识别不能视为已验证：线上首页曾以逗号分隔输入四个名称得到 0 项，单项搜索可找到结果；未穷尽检查其他入口，详见[产品决策简报](2026-11-10-product-decision-brief.md)。AA 也提供介绍和中文，因此要验证面向一张真实发布图的阅读流程是否更有用，不能假定具备批量识别能力、节省时间或用户回访。
2. **评测口径和版本差异说明（聚焦少量高频案例）**。受线索 2、3、6–13 启发：针对一个已核实案例，用原始出处解释两个结果是否能直接比较、已知差异和未披露项。比如 [Anthropic Opus 4.6 系统卡](https://www-cdn.anthropic.com/0dd865075ad3132672ee0ab40b05a53f14cf5288.pdf) 展示同一 GPT-5.2-Codex 在两个 harness 下的不同结果。AA、HF、其他网站也解释方法，差别假设是将证据与具体困惑串起来；不能未经证据断言哪方作弊，也不能用“风险分”自动判定可信度。
3. **按工作任务选择“看哪些评测、还需要自己测什么”（第三项）**。受线索 5、15–23、27 启发：用编码、文档、工具调用等场景，关联任务、覆盖范围、测试所需条件和无法推出的结论。先覆盖一个可核实场景，不能仅凭标签预测业务效果；AA、OpenCompass、HF 已有指南和任务评测。需要定期维护，不表示用户一定需要单独导航。
4. **可复用的任务与输出/失败案例阅读**。线索 18、21、24–25 显示有人想看过程，但 AA、独立工具已做部分展示。此方向的难点是数据和输出授权、使用条件、模型运行与复验成本，私人任务和防污染要求会限制公开；只可链接明确允许的样例，不能捏造输出，也不要承诺实时实测。适合作为少量来源清晰的案例，不建议马上建设全模型展示平台。
5. **自建业务测试的上手与排障**。线索 9、13、16–17、26–27 反映实践难度，但 HF、OpenCompass、AA 等已有方案；这更像新的工具和支持业务，持续维护与隐私负担较大。现阶段建议链接现有指南，而非自行建设评测平台。

这些方向都有竞争，社区发帖只说明问题存在；是否会专门访问本站、重复使用、愿意贡献或付费，都未验证。满足搜索需求与形成长期产品优势也是不同问题。

## 最小验证，不先开发大功能

- 挑一张真实模型发布成绩图：保留报告链接、发布日期和图中可见评测名称；手工把其 5–8 项与现有条目连接，制作可阅读的静态样稿，明确记录未覆盖项。不要擅自转载受限题目或 AA 的数据。
- 用现有 AA、模型原始报告和搜索引擎作为对照，邀请实际读模型发布资料的人完成三个任务：指出某测试测什么；找到两项结果的来源和条件；判断基于现有披露能否直接比较。记录是否完成、耗时、误判、使用路径及是否愿意再次使用；不引导受访者给好评。
- 预先约定小样本可接受的制作及维护时间、正确率、用时、回访信号与停止条件，再执行。样本量小只能作方向筛选；结果不好就停，不将试验完成包装为需求成立。未经用户明确要求，本研究没有联络任何参与者。

## 对项目现状的依据

本地 `README_ZH.md`、`src/views/ReleasesView.vue`、`docs/ARCHITECTURE.md` 和 `content/benchmarks/` 表明项目已有中文评测资料、样例、搜索及发布资料索引；当前架构没有模型成绩库。详情请见 [前次对照报告](2026-11-09-artificial-analysis-product-comparison.md)。本报告不假定线上已同步本地工作树，也未更改应用功能。
