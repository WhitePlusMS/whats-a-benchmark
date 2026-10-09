# Agents/work/context：原始来源精简字段取证

更新时间：2026-10-08 14:06 UTC。范围为当前44条agents/work/context editorial样例。逐项完整解析当前benchmark JSON中的sampleSet及匹配的采纳/来源proof；本记录仅描述来源载体和可见字段，不修改正式样例或许可状态。

结构化数据按原字段名投影；JSON/JSONL/TOML/YAML保留原容器标记与字段路径。HTML、PDF、Markdown只按官方页面已有标签、图题或正文节选显示，不把中文解读伪装成源记录。所有受保护文本只留必要短摘录；附件、gated数据、完整题库、solution和canary不放入投影。数据许可与仓库代码许可分别记载。

机器可读逐项信息、source SHA、定位、版本、当前reusePolicy及对应proof路径见 [raw-source-b.json](../../artifacts/candidates/2026-10-08-raw-source-b.json)。

| Benchmark | 官方来源载体 | 原始定位 | 原生字段/标签 | 精简投影边界 |
|---|---|---|---|---|
| `aa-analyst-agent` | HTML 页面示例 | Artificial Analysis 评测页公开示例；题型/示例标题/附件名/参考值为页面标签 | page text: example title<br>page text: task type<br>page text: named supporting file<br>page text: reference answer | 按原页面标签显示真实字段值及短题目引文；页面未给JSON/CSV record ID。 |
| `apex-agents-1-1` | HTML leaderboard 示例 | Mercor corporate-lawyer-agent leaderboard / displayed sample 1/80 | visible sample counter<br>displayed prompt<br>named JV Agreement<br>page disclaimer | 沿用原网页标签和短任务摘录；页内未标版本，不能把页面计数包装为v1.1记录。 |
| `apex-agents` | HTML leaderboard 示例 | Mercor management-consultant agent leaderboard / displayed sample 1/160 | visible sample counter<br>displayed prompt<br>named input email and spreadsheet<br>page disclaimer | 保留页面样例计数、实际prompt短摘录和附件标签；不是已定位数据行。 |
| `automationbench-aa` | HTML 评测页示例 | AA finance.grant_expense_tracking / task prompt and environment detail | officialTaskId<br>environmentApplications<br>displayedSheetContext<br>taskObjectives | 显示AA页面任务ID、应用环境、真实公开表格输入字段/值及用户目标，忠实复制源字段的网页形式。 |
| `biomysterybench` | HTML 研究文章 | Anthropic BioMysteryBench文章公开RNA-seq knockout问题示例 | article heading<br>example question text<br>described input type | 展示文章原有问题标签和必要短题目引文；无公开JSON行或题目ID。 |
| `browsecomp-zh` | PDF 论文图示 | arXiv:2504.19314v2 p.2 Figure 1 / Art example | figure caption<br>sample topic label<br>visible example question<br>published answer | 按图中主题标签、题面可见文字的短引及公布答案展示；是revised variant论文图示。 |
| `browsecomp` | HTML 官方创题示例 | OpenAI BrowseComp文章的作者创题worked example及其答案 | authoring example prompt<br>article supplied answer | 标明是创题示例，按文章可见prompt/answer块呈现，不显示为dataset schema。 |
| `ebr-bench` | HTML 官方结果更新文章 | Epoch更新文章的模型运行事件段；不是逐题prompt | reported model<br>reported original-version outcome<br>reported behavior<br>subsequent rule change | 使用文章段落原有事件事实与短引，明确原版card-unbanned运行；不造task record。 |
| `excel-emb` | Markdown 任务指令 | 公开instructions.md / Dataroom Summaries M003-scratch | instruction prose<br>role/context<br>named deliverables | 呈现原Markdown标题/字段及短任务正文片段；附件不存在可验证的行结构。 |
| `finance-agent` | HTML benchmark 页面示例 | Vals Finance Agent Benchmark v2公开示例题 | visible question text<br>listed ticker and reporting period<br>page sample label | 保留原页面实际问题段落标签和短引；不假设底层固定行ID。 |
| `finbenchmark` | Markdown任务目录 | TASKS.md / task set v2 / Knowledge (v1) / knowledge_001 | task set heading<br>task ID<br>question text<br>catalog answer mark | 使用原目录任务编号/章节/原答案标记的Markdown行结构，不转成臆造JSON。 |
| `gaia` | HTML 论文示例 | arXiv 2311.12983公开GAIA示例任务段 | paper example label<br>displayed question<br>published answer/source note when present | 按论文的示例块/表格原样呈现字段，短引问题；没有公开JSON对象时不伪造schema。 |
| `gdp-pdf` | HTML benchmark页面示例 | SurgeHQ GDP-PDF公开示例问句 | question text<br>equipment model/serial as displayed<br>requested PDF-grounded fact | 按网页中实际问题文本标签展示最短原文片段与事实性字段；无确认的dataset row ID。 |
| `gdpval-aa-v2-1` | HTML AA公开任务示例 | GDPval-AA v2.1 Example Tasks & Submissions / Task 1 | example task title<br>occupation label<br>displayed task constraints<br>final PDF output | 按当前v2.1页真实字段展示，作为代表性演示；不补造task_id。 |
| `gdpval-aa` | HTML AA公开任务示例 | GDPval-AA Example Tasks & Submissions / Task 1 Band Stage Plot | example task title<br>occupation label<br>displayed task constraints<br>final PDF output | 按AA页面标题、角色和演示要求展示；声明为v2共享上游例题，非v2分数行。 |
| `gdpval` | HTML 官方任务演示 | OpenAI GDPval文章公开任务例及交付说明 | role/date context<br>task request<br>required deliverable | 使用官方演示原来的段落/列表标签；按已核事实保留最终PDF-only交付。 |
| `harvey-lab` | JSON task.json | Harvey LAB v1.0 / corporate-ma/review-data-room-red-flag-review/task.json | title<br>work_type<br>tags<br>instructions<br>deliverables<br>criteria | 沿JSON原键显示title/work_type/deliverables及少量实际输入约束，长instructions/criteria仅作截断预览。 |
| `legal-research-vals` | JSON public suite | data/public.json / dataset_version 1.0.0 / tests[0] P-001 | dataset_name<br>dataset_version<br>tests[].id<br>tests[].question | 保持suite JSON嵌套层级，仅显示P-001 id和短题面原文片段；不补答案字段。 |
| `lhtb` | Markdown instruction.md | tasks/langchain-version-migration/instruction.md / dependency target | task ID from path<br>dependency target<br>migration requirements<br>tests/expected behavior if stated | 显示Markdown中的实际依赖版本行及原任务小段，不改写成源JSON。 |
| `lifescibench` | PDF 论文示例 | preprint Appendix D.1 / Analysis—Spatial Transcriptomics / Figure 15 | figure number<br>example task label<br>specimen/data type<br>analysis goals | 保留PDF原有标题/图号/字段标签及短文字摘录；附件本身无开放JSON row。 |
| `longbench-v2` | JSON row | HF Rows API config=default / split=train / row_idx=0 / _id=66fcffd9bb02136c067c94c5 | _id<br>domain<br>sub_domain<br>difficulty<br>length<br>question<br>choice_A<br>choice_B<br>choice_C<br>choice_D<br>answer<br>context | 原JSON字段投影示例：_id=66fcffd9bb02136c067c94c5; domain=Long In-context Learning; sub_domain=New language translation; difficulty=hard; length=long; answer=D。question只给10词以内源文片段；context省略并显示其字符长度/省略说明。 |
| `longbench` | JSONL row（已核行摘要；源归档不由API单行提供） | commit 5e628be450b7e67fb7ae6e201bd6d8f7056f7672 / data/multi_news.jsonl row 0 / _id=e45abfcb82a3c862c0f772e6f461866839955c11ea2f46a8 | _id<br>input<br>context<br>answers<br>length | 以已核row SHA为证据，逐字段展示原JSONL键的必要值/摘要；单独标明API对此归档返回404，勿伪称在线API行。 |
| `medscribe` | HTML 页面中的医患transcript演示 | Vals MedScribe / Methodology / Sample Doctor-Patient Transcript | sample transcript label<br>displayed dialogue turns<br>symptom/timing facts | 保持网页真实的transcript标签和对话顺序，至多展示短原文片段及来源事实。 |
| `mind2web` | HTML 项目页示例(a) | official project page / example (a); no record ID or split | example letter<br>task description text<br>site/operation trace if visible | 页面提供的是文本任务示例，不是已映射JSON行；可呈现原HTML示例标签及短题面原文。 |
| `mlcr-aa` | HTML AA评测页示例 | AA MLCR-AA page / one of three Example Tasks | example label<br>displayed task prompt<br>stated task type/tier | 以网页列出的实际问题块及原字段标签展示；不映射到Wisedocs公开数据集行。 |
| `officeqa-pro` | PDF 论文Figure 3 | OfficeQA Pro public case proof / v1 paper p.4 Figure 3 / UID0013 | figure number<br>UID<br>task input facts<br>requested output format | 按论文图中UID/字段事实展示，中文解读旁保留短原文；明确官方Pro子集成员事实和无答案。 |
| `osworld-2` | HTML 官方项目站Task035示例 | OSWorld 2.0 Task035 / Purchase Requests; official site version 2.0 | task identifier<br>task title<br>displayed instruction facts<br>site version label | 按官网显示的Task035及Purchase Requests事实/标签展示，精确标2.0，不把2.1 gated Python task classes当来源。 |
| `osworld` | JSON task record | evaluation_examples/examples/chrome/030eeff7-b492-4218-b312-701ec99ee0cc.json; test_all.json chrome membership | id<br>snapshot<br>instruction<br>evaluator.func<br>evaluator.result.type<br>evaluator.expected.rules.expected | 原JSON键和值：id、snapshot、instruction（10词以内摘录）、evaluator.func/result/expected；省略setup trajectory细节。 |
| `paperbench` | JSON rubric | frontier-evals main / project/paperbench/data/papers/adaptive-pruning/rubric.json | id<br>requirements<br>weight<br>sub_tasks<br>task_category<br>finegrained_task_category | 保留源JSON键/嵌套结构，仅展示rubric id、weight和分类字段；requirements以短摘录截断。 |
| `prbench` | HF Viewer JSON row | dataset ScaleAI/PRBench / config=default / split=finance / row_idx=0 / task=ea67e314b6c2e8fc70627c19 | task<br>turns<br>field<br>topic<br>expert<br>prompt_0<br>response_0<br>model_0<br>reference_texts_0<br>rubric<br>canary | 按原JSON键投影task/turns/field/topic/expert/prompt_0；prompt_0只展示≤10英文词片段。API实测turns=10、field=Finance、topic=Risk Management & Stress Testing、expert=Expert。 |
| `ruler` | 论文Table 2 / PDF或HTML | RULER paper arXiv:2404.06654 / Table 2 concrete example row | table caption<br>task type<br>input length/parameters<br>specific query/result where printed | 仅以Table 2实际行标签/数字值作短摘录；论文CC BY 4.0事实只覆盖论文表述，不外推全部synthetic data。 |
| `skillsbench` | Markdown task.md with YAML front matter | SkillsBench v1.1 / tasks/sec-financial-report/task.md | schema_version<br>metadata.difficulty/category/subcategory/task_type/modality/interface<br>task prompt/questions<br>verifier.type/timeout_sec | 保留YAML原键和实际metadata值，任务正文选一条具体SEC查询目标的短原文；不复制电子申报文件。 |
| `spreadsheetbench-v2` | HTML 官方项目页示例 | SpreadsheetBench 2 / Version 2 / Example 1 / Financial Modeling | version label<br>example number/title<br>displayed workbook instructions<br>named sheets/metrics | 使用网页原字段标签及明确sheet/metric名称；不存在已定位record ID。 |
| `tau2-bench` | JSON array tasks record | τ²-bench v0.1.0 commit 37199f36924c8896f5e048360691f8476cd89ba1 / telecom/tasks.json row 0 / 114 tasks | id<br>description<br>user_scenario.instructions<br>ticket<br>initial_state<br>evaluation_criteria.actions<br>evaluation_criteria.env_assertions | 保持JSON原字段路径，展示task id、scenario约束、toggle_data/refuel_data及2GB目标值；姓名/号码省略。 |
| `tau3-banking` | JSON task object | repo main / data/tau2/domains/banking_knowledge/tasks/task_001.json | id<br>description<br>user_scenario.instructions<br>initial_state<br>evaluation_criteria.actions[].arguments<br>required_documents | 沿原JSON键展示id、明确的申请card_type/年收入/订阅布尔值；移除persona姓名并标示该值省略。 |
| `tax-agent-bench` | JSON public suite | data/public.json / suite_version 2 / tests[] / P-001; five public non-scored cases | dataset_name<br>suite_title<br>suite_version<br>suite_number_of_tests<br>suite_number_of_checks<br>tests[].id/question/checks | 原JSON层级只投影suite_version、P-001 id及问题中的数值事实字段；不取check正文为gold答案。 |
| `terminal-bench-2-1` | HTML Harbor dataset/task pages | official Harbor dataset Version 2.1 tasks list includes dna-assembly; task page latest | dataset title/version<br>Tasks-list slug<br>task page visible instruction facts | 展示Harbor页面实际版本标签和slug/任务简介，不把同slug 2.0文件当冻结2.1文件。 |
| `terminal-bench-2` | TOML task.toml + Markdown instruction.md | terminal-bench-2 official repo / dna-assembly; task directory member in 2.0 | task.name<br>metadata.difficulty/category/tags<br>instruction sequences.fasta input labels<br>primer constraints<br>required output filename | 使用原TOML `[task] name`/`[metadata]`值及Markdown真实输出文件/数量字段；2.0目录成员与2.1重合。 |
| `terminal-bench-3` | TOML task.toml + Markdown instruction.md | Terminal-Bench v3.0.0 / tasks/foodstuff-beta-activity; release list + PR #906 | task.name<br>metadata.author/category/subcategory/tags<br>artifacts<br>instruction inputs/outputs<br>required report format | 按固定v3.0.0原任务文件的TOML键和值及Markdown报告字段精简呈现；该task贡献有独立LICENSE.md。 |
| `terminal-bench-4` | TOML task.toml + Markdown instruction.md | Terminal-Bench v4.0.0 / tasks/layout-config-recreation2; release lists modified | task.name<br>metadata.category/subcategory/tags<br>artifacts<br>instruction output schema components/style fields | 真实原文要求生成config.json，抽取其实际顶层键和少量字段名；画面、reference渲染不复制。 |
| `terminal-bench-science-0-1` | HTML Harbor task page + release notes | Terminal-Bench-Science v0.1.0 / symbolic-regression / Harbor task rev2 | release task slug<br>task rev<br>fixed-seed synthetic-data parameters<br>verifier sample size/metric | 以官方页面/发布说明真实字段、数值和synthetic标签展示，不制造JSON task object；来源当前为网页渲染。 |
| `toolathlon-verified` | Markdown task.md | official README Quick Example / finalpool/find-alita-paper/docs/task.md | task path<br>search constraints<br>required output labels<br>file naming pattern | 保留任务Markdown里的实际搜索条件与所需输出标签；注明main未固定release且无唯一gold。 |
| `vending-bench-2` | HTML 官方运行回顾文章 | Andon Labs 2026-02-05 / expired Snickers refund example | article date<br>customer event<br>model statement/amount<br>reported outcome<br>benchmark variant | 呈现文章中的真实事件段落/数值，并标记这是单人Vending-Bench 2运行回顾，不是固定题行。 |
| `wandr` | Markdown fixed task instruction | fixed commit ccb0baeb96f1c77a48e47f92122c57479ee99700 / accounting-ai-claims/instruction.md | platform-count requirement<br>claim-count requirement<br>evidence-family requirements<br>date threshold<br>output JSONL path/fields | 按源Markdown实际数量、日期阈值和交付文件名/字段显示；任务是开放研究，不列出预填平台名单。 |

重点字段复核：

- **LongBench-v2**：公开Rows API实际返回JSON row，路径 `default/train/0`，`_id=66fcffd9bb02136c067c94c5`；字段包括 `_id/domain/sub_domain/difficulty/length/question/choice_A-D/answer/context`。原context约1,000,567字符并以canary GUID开头；建议字段展示中省略context，原问题只保留短摘录。Rows响应SHA256 `27dea3e44a4759cbb89447b2005af99b50ef68d8b254536e1923eeedf1121569`。
- **PRBench**：HF Rows API实际返回finance split JSON row，`task=ea67e314b6c2e8fc70627c19`，`turns=10`，`field=Finance`，`topic=Risk Management & Stress Testing`，`expert=Expert`；`prompt_0`开场文本字段可作短截取。行另含response/scratchpad/rubric/reference_texts/canary等，均不进建议投影。Rows响应SHA256 `d7666c136eb835c6f5986ec2f2b715c84b1e91261d9c6f1ab0dd8dd1ce164379`；官方数据卡CC BY 4.0事实与底层各字段再发布范围分开。
- **τ³ banking task_001**：原生JSON对象字段 `id/description/user_scenario/initial_state/evaluation_criteria/annotations/user_tools/required_documents`；`evaluation_criteria.actions[0].arguments`含真实 `card_type=Gold Rewards Card`、`annual_income=100000`、`rho_bank_subscription=true`。投影可保留这些任务参数并省略persona姓名；文件仍在当前main的legacy `data/tau2/`路径，不能当作冻结版发布。SHA256 `9a797288dd215e89c0fab9d0063581a3a64d433f06af6179eaad795521b23ef0`。
- **OSWorld**：公开JSON任务的 `id/snapshot/instruction/evaluator.func/evaluator.result.type/evaluator.expected.rules.expected` 是真实键；`id=030eeff7-b492-4218-b312-701ec99ee0cc`、snapshot `chrome`、expected=`true`。短展示不需复制postconfig脚本和轨迹。SHA256 `87760f82205787708a1a3a9cf5e0dfb6bab405919a7733d761786054346c41c6`。
- **PaperBench**：源是实际rubric JSON，不是任务JSON；包含 `id/requirements/weight/sub_tasks/task_category/finegrained_task_category`。`id=40ff2859-e14d-46ba-af52-0ba4595e2bce`，`weight=1`。只取ID/权重/分类字段，论文和附档不复用。SHA256 `5dadc6dd588a3843ca106364ba6412688dcbb460d06aaca6a90b78d86fedbbaa`。
- **Tax Agent / Legal Research**：均为suite `tests[]`结构；Tax P-001公开非计分样题含question/checks，但不从check文本生成gold；Legal P-001仅有question，无gold。源许可事实以benchmark自身数据说明为准，MIT代码许可不代替question许可。
- **Terminal-Bench**：2.0、v3.0.0和v4.0.0公开任务目录可直接读 `task.toml` 与 `instruction.md`。2.0路径 `dna-assembly`，当前检查的toml/instruction SHA分别为 `7b571544b64d9be1c91526837e5d805c2181afe0e6fd57a7f0676bba36c868d7` 与 `88998c98beabdd966ab46c04ede822bbc74796696aa1bf87c567a9131210533c`；v3.0.0的该任务贡献有独立 `LICENSE.md`，文本将该贡献按Apache-2.0授权，SHA `79dcb7a87de1fc1d6711e1014891296a231e650ede3b1c3807c9f93aee87f012`。v4任务路径未找到单独LICENSE.md（HTTP 404）；不能从仓库根代码许可证外推到图像/fixture。2.1仅确认Harbor官方Version 2.1目录成员，未找到冻结任务文件快照。
- **Mind2Web**：官方项目页示例(a)是HTML文本目标；页面没有记录ID/split。HF公开metadata API报告数据集public、gated=false、CC BY 4.0且列出train JSON文件与test.zip；没有取得网页示例到JSON文件行的映射。test zip的README限制仍单独记录，不下载或展示。
- **LongBench v1**：官方固定数据归档proof保存 `data/multi_news.jsonl` row 0的行SHA与context SHA；Datasets Rows API对该dataset/config返回404，当前不能声称API逐行读取成功。原归档是JSONL数据文件；上下文是新闻素材，展示仅保留现有记录短摘录。

许可事实均按每条对应proof逐项附带；本研究不重新赋予或撤销任何reuse状态。现有源材料的许可范围可能分别限于数据行、任务贡献、论文或代码，机器记录同时保留benchmark `reusePolicy` 与样例页对本站解读/短引的描述。


补充来源核验（2026-10-08 14:09 UTC）：τ² v0.1.0任务文件SHA256 192a2c143b3b512c37c3775fdf6c5040c33717388620c38b140c731dc6153cd7；WANDR固定commit instruction SHA256 760552bc3c2d416bb316dc5613e3025bdfa3297d57ba03e95d3d107aca336243；BrowseComp-ZH v2 PDF SHA256  da298790f8fa1e31fd68c7700002bc342d9da80e4a404c919e8854c8f6c41e4；OfficeQA Pro论文原proof SHA256  cf442159f94e109edeaa99d0b01f0ecc80839e853c82fcf204960ebcdf2aca2；OSWorld 2.0 Task035页面原proof SHA256 91138b5d752d7d5242bfc147c6a1bd6430e81f89f36eb9ffe0af3a40feca6b5b；LongBench v1保留行级SHA256  693dfb9c59f65767f9a29396b1ad6ce06faea551e24695b5bcc4f2b300ee336（不是归档文件哈希）。本轮对OpenAI BrowseComp/GDPval官方页直接HTTP GET均为403，故这两项无本轮正文hash，保留先前官方页面定位proof。


可直接恢复的源字段值（以下是原始字段路径/值，不是把中文解读伪装成JSON）：

- LongBench-v2：`_id=66fcffd9bb02136c067c94c5`、`domain=Long In-context Learning`、`sub_domain=New language translation`、`difficulty=hard`、`length=long`、`answer=D`；`context`字段存在但不展示。
- PRBench finance：`task=ea67e314b6c2e8fc70627c19`、`turns=10`、`field=Finance`、`topic=Risk Management & Stress Testing`、`expert=Expert`；源字段`prompt_0`实际存在，建议只保留已见短摘录 `credit loss forecasting model`。
- τ³ Banking：`id=task_001`；`evaluation_criteria.actions[0].arguments.card_type=Gold Rewards Card`、`annual_income=100000`、`rho_bank_subscription=true`。`customer_name`不展示。
- OSWorld：`id=030eeff7-b492-4218-b312-701ec99ee0cc`、`snapshot=chrome`、`evaluator.func=exact_match`、`evaluator.result.type=enable_do_not_track`、`evaluator.expected.rules.expected=true`；`trajectory`与初始化脚本不展示。
- PaperBench：rubric `id=40ff2859-e14d-46ba-af52-0ba4595e2bce`、`weight=1`，`sub_tasks`是同字段形状的嵌套列表。真实任务字段是`requirements`，不是answer。
- Legal Research：`dataset_version=1.0.0`、`tests[0].id=P-001`，题目有短词组 `incorrect address`；该公开对象没有gold answer。
- Tax Agent：`suite_version=2`、`suite_number_of_tests=5`、`tests[0].id=P-001`、`checks`共12项；不把checks内容作为答案展示。
- SkillsBench YAML front matter：`schema_version=1.3`、`metadata.difficulty=hard`、`category=finance-economics`、`subcategory=sec-filings-analysis`、`task_type=[search,analysis]`、`modality=[database,json]`、`verifier.timeout_sec=900`。
- Terminal-Bench 2.0 TOML：`task.name=terminal-bench/dna-assembly`、`metadata.difficulty=hard`、`keywords=[biology,cloning,scientific-computing]`；原Markdown要求`primers.fasta`、8对引物。Terminal-Bench 3.0.0 TOML/Markdown：`task.name=terminal-bench/foodstuff-beta-activity`、`metadata.category=Science`、`artifacts[0]=/app/results.txt`，且该任务贡献的`LICENSE.md`明确声明按Apache 2.0授权。v4.0.0 task.toml有`task.name=terminal-bench/layout-config-recreation2`、`metadata.category=Media`、`artifacts[0]=/app/output/config.json`；任务目录中独立LICENSE路径HTTP 404，源任务文本带canary标记；此处不作线上展示许可判断。
- Mind2Web页面示例(a)原文是HTML目标文本`one-way flights from New York to Toronto`；官方项目页不给该示例的record ID或split。公开HF元数据为`gated=false`，数据卡标CC BY 4.0；不把任一train JSON文件行推断成这个页面例子。



## 2026-10-09 — 已核原始字段投影

此轮将候选中的字段清单扩展为可逐键核对的源投影，数据状态与许可判断沿用原条目。JSON对象保留来源键名、嵌套关系及实际值；对于受保护长题面，只保留源文本中的短片段并注明字段路径；任务配置以原TOML、YAML及Markdown原文块呈现。`sourceSha256`对应所列原始响应或文件，具体记录ID、路径和省略项随每条投影保存。

| benchmarkId | 原始格式与定位 | 真实内容投影 | 省略项/范围 |
|---|---|---|---|
| `harvey-lab` | JSON，v1.0 `task.json` | `title`、`work_type`、`tags`、`instructions`、`deliverables`原键值 | `criteria`与数据室附件 |
| `legal-research-vals` | JSON，`tests[0]` P-001 | `dataset_version`、`tests[0].id`及question原文首句 | 余下长题面；无答案字段 |
| `tax-agent-bench` | JSON，suite v2 `tests[0]` P-001 | `suite_version`、公开样题数、id与question原句 | 其余题面与checks |
| `osworld` | JSON，Chrome任务记录 | `id`、`snapshot`、`instruction`、`evaluator.func/result/expected` | postconfig与trajectory |
| `paperbench` | JSON rubric，`sub_tasks[0].sub_tasks[0].sub_tasks[0]` | rubric id/requirements/weight及实际嵌套节点字段 | 其他rubric节点、论文附件 |
| `prbench` | HF Rows JSON，finance row 0 | `task`、`turns`、`field`、`topic`、`expert`、`prompt_0` | 响应、scratchpad、rubric、references及canary |
| `tau2-bench` | JSON数组，固定v0.1.0 telecom row 0 | `id`、`description.purpose`、场景约束、真实动作与环境断言数值 | persona联系信息和含客户标识的初始化字段 |
| `tau3-banking` | JSON对象，`task_001.json` | `id`及申请卡动作的`card_type`、`annual_income`、订阅布尔值 | 姓名、persona全文和文件标识 |
| `skillsbench` | YAML front matter + Markdown问题 | 原YAML字段和真实Q3 AUM问题 | 联系信息、SEC文件、答案 |
| `terminal-bench-2` | TOML `task.toml` + Markdown instruction | 原`task`/`metadata`配置和输出文件原句 | 邮箱、完整序列、解答与verifier |
| `terminal-bench-3` | v3.0.0 TOML + Markdown instruction | 原任务名、Science/Chemistry标签、`/app/results.txt`和实际要求计算项 | 输入表格/PDF、隐藏测试和解答 |
| `terminal-bench-4` | v4.0.0 TOML + Markdown instruction | 原任务名、Media/Design标签、`/app/output/config.json`及实际配置文件要求 | 图片、组件素材、reference render与hidden fixtures |

本阶段新增12项 `rawProjection`，其余32项仍待按相同标准恢复；LongBench-v2由root另行完成，未在本次覆盖。未改正式样例、benchmark JSON、许可状态或共享代码。

## 2026-10-09 — 扩展为可直接核对的原生来源投影

候选JSON现在有43/44项带 `rawProjection`；本轮新增31项，未重复或改写LongBench-v2（由root另行处理）。投影保留原载体和可定位事实：JSON只放已核字段/值并列明省略字段；网页/PDF按HTML标签、图表标签或真实文本块展示；Markdown、YAML、TOML保留原文片段或配置内容。所有已有数据许可状态均未改动，来源短引与解读事实分开标记。

本轮新增的31个benchmarkId：`aa-analyst-agent`、`apex-agents-1-1`、`apex-agents`、`automationbench-aa`、`biomysterybench`、`browsecomp-zh`、`browsecomp`、`ebr-bench`、`excel-emb`、`finance-agent`、`finbenchmark`、`gaia`、`gdp-pdf`、`gdpval-aa-v2-1`、`gdpval-aa`、`gdpval`、`lhtb`、`lifescibench`、`longbench`、`medscribe`、`mind2web`、`mlcr-aa`、`officeqa-pro`、`osworld-2`、`ruler`、`spreadsheetbench-v2`、`terminal-bench-2-1`、`terminal-bench-science-0-1`、`toolathlon-verified`、`vending-bench-2`、`wandr`。

可直接复核的实际字段/内容示例包括：

- `finbenchmark`：Markdown `knowledge_001` 原题及标注选项B；未扩展展示其余选项。
- `longbench`：固定revision的 `multi_news.jsonl` 行投影保留真实 `_id` 和 `input`，注明长 `context`、`answers`、`length` 未复制，行SHA与上下文SHA分开保存。
- `mind2web`：官网HTML示例(a)的真实任务文本；没有把页面示例映射成数据行。
- `osworld-2`：官网 `Task035 - Purchase Requests` 的Context、Goal、Design point原标签和内容，官网版本为2.0。
- `terminal-bench-2-1`：Harbor官方v2.1数据集页提供成员证据；当前投影保留任务页真实slug、输入类型/序列名及两条约束原文，省略其余约束、酶规格、预期引物对数与附件；latest任务页本身未当作版本冻结文件。
- `terminal-bench-4`：在既有配置投影外补入instruction.md真实JSON格式代码块，保留 `components`、IMAGE/TEXT、`src`、`style` 与配置值占位符；没有改成本站造出的任务对象。
- `toolathlon-verified`、`wandr`：保留各自任务Markdown中的确切搜索条件/输出标签，以及WANDR的原JSONL格式模板；未填充研究结果。

`officeqa-pro`投影的UID0013位于论文PDF图像中：保留图号、UID和原文连续短题面片段；后续回归/输出句省略，未补答案或gated CSV。`ebr-bench`的三个已检查官方页面没有定位到逐题prompt/game state/replay，因此只记录官方公开协议事实和本轮检查范围，不将该项记作已恢复的原题数据。此说明限于现有来源路径，不推断未查页面。

机器候选文件还保留每项来源URL、路径/图号、source hash、省略字段与既有许可说明。校验记录：44项ID唯一；43项有投影；LongBench-v2为唯一未改候选；已填写SHA-256均为64位。未修改正式benchmark条目、共享代码、许可状态或生成产物。
## 2026-10-09 — 原文投影校正补记

本轮按来源实际载体复核研究候选：保留公开JSON原键值、任务配置原文、网页/PDF原生标签与连续短文本；Terminal-Bench 4增加的格式示例来自官方 `instruction.md` 原JSON代码块。OfficeQA Pro Figure 3 / UID0013保留连续原文短节选和明确省略项，不新增虚构的JSON参数。Terminal-Bench 2.1只保留所选真实约束行并注明省略约束。EBR-Bench的已查官方页面仍未给出可定位的单条任务记录，因此候选标注为来源查验，不作为已展示逐题原始数据。仅更新候选审计和研究记录，不改正式样例、许可或共享代码；未运行服务、构建或测试。