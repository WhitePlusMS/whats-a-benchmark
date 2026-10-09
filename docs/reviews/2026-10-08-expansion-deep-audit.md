# 新增 59 个 Benchmark 的逐项深度审查与实施

日期：2026-10-08。范围是上一轮明确新增的 59 项，不把其它工作树改动算入本轮。

## 对用户问题的直接回答

- 上轮不是只增加标题：59 条 JSON 已经通过同一个内容 schema 和生成管线进入卡片、详情、检索、分类与对比；但图标和站内原题接入遗漏，详情中的部分数据结构与执行步骤也较泛。上轮完成声明没有清楚区分这些层次。
- 联网按条目回到发布者的官网、论文、README、真实数据卡与代码文件；来源链接数量不能单独作为联网或内容完整的证据。本轮再次逐条阅读，补充具体结构与执行/评分边界，详见每行第一方依据和正文位置。
- 图标基线为 57 项空 brandIds、2 项复用 Epoch。现59项都有实际本地发布者/项目标识引用，新增27种素材，品牌总数58；少量使用官方作者/组织账户标识，明确不称专属Logo。
- 站内新题面基线为0。现在采用9条真实记录/7项评测；全站27→36条、18→25项有站内样例。其余52项按各自真实官方入口、受控条件或未公开状态说明，不能称作都有完整原题包。

## 原有架构如何承接

| 内容 | 原有入口 | 本轮实现 |
| --- | --- | --- |
| 任务、数据和评分 | content/benchmarks/<id>.json 的已有字段 | 深化59条的354处内容字段；不新增第二套内容模型 |
| 图标 | content/brands.json + content/assets/logos/ + brandIds | 注册27素材、绑定全部59项；卡片和详情继续调用 PublisherMarks |
| 真题 | sampleSet / sampleAccess / reusePolicy | 采用许可明确、固定版本的9条官方记录，不自编题目或答案 |
| 生成与加载 | content-pipeline → catalog + 独立样例JSON | 目录不携带样例正文，原 sampleLoader / SampleViewer 按需加载 |
| 私有或许可不明 | 现有 private/gated/restricted 与官方说明回退 | 明示获取边界，不把方法页当可下载题库 |

本轮没有新增 Vue 组件、schema 字段、前端数据获取服务或 npm 依赖。使用系统已有 PyArrow 只做离线原始 Parquet 复核，不添加项目依赖。

## 59 项逐项清单

“联网依据”是第一方定义入口；每条 JSON 中还保存具体数据、代码、方法等栏目对应来源。完整内容均在原统一详情页显示。标识不是“模型厂商使用了此评测便挂该厂商Logo”。

| # | 新增 Benchmark | 主要具体内容 | 第一方联网依据 | 图标身份 | 原题/样例现状 |
| ---: | --- | --- | --- | --- | --- |
| 1 | [Earthborne Rangers (EBR-bench)](../../content/benchmarks/ebr-bench.json) | 借重复尝试与笔记检验智能体学习陌生复杂任务的能力。 | [官方来源](https://epoch.ai/benchmarks/ebr-bench) | Epoch AI（复用发布方标识） | 限制公开：官方只公开方法、目标统计和分析图，不分发底层版权游戏；本条没有官方题库下载或游戏试玩授权入口。 |
| 2 | [Long-Horizon Terminal-Bench (LHTB)](../../content/benchmarks/lhtb.json) | 测量 LLM agents 能否在有状态容器终端中持续数百步完成多类长程任务，并由隐藏验证器评分。 | [官方来源](https://github.com/zli12321/LHTB) | Agent Intelligence-Lab（发布方Logo） | 官方任务/数据入口：可逐任务打开 instruction.md 与 task.toml，了解输入和资源配置；tests/ 与 solution/ 应留给评分器，不能作为 agent 答案提示。 |
| 3 | [EQ-Bench 4](../../content/benchmarks/eq-bench-4.json) | 与模拟用户进行多轮互动，评估情绪和社会理解、适应与关系修复。 | [官方来源](https://github.com/EQ-bench/eqbench4) | EQ-bench（项目标识） | 官方任务/数据入口：官方 EQ4 页面提供对话、persona 与模型分析入口；仓库 test.json 可看隐藏 persona 结构，二者不是被测模型收到的全部输入。 |
| 4 | [Code Migration](../../content/benchmarks/code-migration.json) | 评估模型能否在另一种语言中重建程序行为。 | [官方来源](https://www.vals.ai/benchmarks/code-migration) | Vals AI（复用发布方标识） | 未公开完整原题：官方只公开迁移形式、方法与分项结果，未给完整任务目录或可下载题面；本条不把榜单页面当成公开代码任务包。 |
| 5 | [CyberBench Patch v1.1](../../content/benchmarks/cyberbench-patch-v1-1.json) | 在 OSS-Fuzz 真实漏洞任务上提交代码修补，需消除已知崩溃并通过隐藏 holdout。 | [官方来源](https://www.vals.ai/benchmarks/cyber) | Vals AI（复用发布方标识） | 官方任务/数据入口：官方Patch案例展示漏洞项目、修复方式与评分说明；完整56项离线任务和holdout输入私有，不是可下载完整题库。 |
| 6 | [FrontierSWE v2](../../content/benchmarks/frontierswe-v2.json) | 超长时程技术工程与研究任务，官方 v2 harness 衡量 agent 在20小时内能推进到的任务得分。 | [官方来源](https://www.frontierswe.com/blog/v2) | FrontierSWE（项目标识） | 官方任务/数据入口：v2文章列出34项任务并链接各任务页/轨迹，可查看输入说明与验证器口径；它不是所有任务数据和运行包的统一下载入口。 |
| 7 | [τ^τ-bench (Hyper-τ)](../../content/benchmarks/hyper-tau-bench.json) | 评估 coding agent 能否根据业务证据、客户需求和生产API构建客服agent，并让其服务模拟客户。 | [官方来源](https://github.com/sierra-research/hyper-tau-bench/blob/main/README.md) | Sierra Research（复用发布方标识） | 官方任务/数据入口：任务目录可读取 53 项构造任务及 MANIFEST；其中列出的内层测试和性能约束是执行配置，不是可直接喂给开发者的答案。 |
| 8 | [MirrorCode](../../content/benchmarks/mirrorcode.json) | 在无原始源码条件下端到端重建现有程序，要求匹配隐藏测试输出。 | [官方来源](https://epoch.ai/benchmarks/mirrorcode) | Epoch AI（复用发布方标识） | 官方任务/数据入口：官方页包含任务范围与运行方法，并链接22个公开目标和脚手架；3个私有目标未分发，页面本身不是完整题库下载。 |
| 9 | [ProgramBench](../../content/benchmarks/programbench.json) | 从可执行程序及其文档重建程序，不提供实现源码。 | [官方来源](https://programbench.com/) | ProgramBench（项目标识） | 官方任务/数据入口：官方仓库链接此测试档案目录，可按 instance_id 浏览评分材料；求解模型只应接触 cleanroom 可执行程序与文档。 |
| 10 | [SWE-rebench](../../content/benchmarks/swe-rebench.json) | 基于新近公开软件仓库问题构建连续更新的软件工程agent评测。 | [官方来源](https://swe-rebench.com/about) | SWE-rebench（项目标识） | 官方任务/数据入口：HF Dataset Viewer 可逐条查看 V2 的问题、仓库和环境字段；完整记录还含参考补丁，应区分求解输入与训练/评分资产。 |
| 11 | [TapTap Maker Benchmark](../../content/benchmarks/taptap-maker.json) | 让 AI agent 使用 Lua 为 UrhoX 引擎编写或修改游戏功能，由真实引擎执行并按确定性断言判分。 | [官方来源](https://maker.taptap.cn/leaderboard/methodology.html) | TapTap Maker Benchmark（项目标识） | 入口尚未核实：官方方法与edition archive公开执行和版本指纹；本次未找到具体公开题面或可下载任务包，不能把方法页当作样例。 |
| 12 | [Vibe Code Bench 1–100](../../content/benchmarks/vibe-code-bench-1-100.json) | 对已工作的 web 应用连续实现最多十个相互依赖的产品请求，并保留先前行为。 | [官方来源](https://www.vals-ai.com/benchmarks/vcb-1-100) | Vals AI（复用发布方标识） | 官方任务/数据入口：官网演示区可查看应用连续变化、新功能与选定回归测试；100 条 arc 和 939 请求的完整私有测试/验证材料没有公开下载。 |
| 13 | [Vibe Code Bench v1.1](../../content/benchmarks/vibe-code-bench-v1-1.json) | 从自然语言产品规格构建可工作的完整 web 应用，并由浏览器流程检查功能。 | [官方来源](https://www.vals-ai.com/benchmarks/vibe-code) | Vals AI（复用发布方标识） | 官方任务/数据入口：官方 Results 区链接的 Zeeter 完整产品规格，包含角色、注册/资料、280 字帖子、关注、互动和通知流程；这是公开示例，完整 v1.1 题库仍私有。 |
| 14 | [WeirdML v2](../../content/benchmarks/weirdml-v2.json) | 在新颖、非标准机器学习问题上编写 PyTorch 训练代码，按测试集准确率评估并提供多轮反馈。 | [官方来源](https://epoch.ai/benchmarks/weirdml) | Håvard Tveit Ihle（作者头像） | 官方任务/数据入口：作者页的早期任务段落链接真实task prompt，并展示输入形态与逐run最高准确率；后续新任务详情隐藏，不能当作完整v2下载包。 |
| 15 | [MLCR-AA](../../content/benchmarks/mlcr-aa.json) | AA 使用 MLCR 的私有高难题，衡量长篇碎片化医疗记录的综合推理。 | [官方来源](https://artificialanalysis.ai/evaluations/mlcr-aa) | Artificial Analysis（复用发布方标识） | 官方任务/数据入口：AA页面可看事实提取、时序和临床综合示例；公开HF只提供上游低层问题/文本记录，不能据此下载或复现AA的私有60道expert/compound评分题。 |
| 16 | [Artificial Analysis Multilingual Index](../../content/benchmarks/aa-multilingual-index.json) | 基于 Global-MMLU-Lite 的支持语言成绩，概括多语言知识与推理表现。 | [官方来源](https://artificialanalysis.ai/methodology/intelligence-benchmarking) | Artificial Analysis（复用发布方标识） | 官方任务/数据入口：上游HF Viewer可选择语言与test/dev，查看四选项和文化标注；AA当前支持语言及其归一化/绝对分图仍需在AA页面另看。 |
| 17 | [LiveBench](../../content/benchmarks/livebench.json) | 持续补充新题、以客观答案自动评分的综合能力评测体系。 | [官方来源](https://github.com/livebench/livebench) | LiveBench（官方账户identicon） | 站内 1 条真实记录 |
| 18 | [BullshitBench v2](../../content/benchmarks/bullshitbench-v2.json) | 检验模型是否识别无意义问题，并拒绝沿错误前提继续编造。 | [官方来源](https://github.com/petergpt/bullshit-benchmark) | Peter Gostev（官方账户identicon） | 官方任务/数据入口：V2查看器可筛选domain/模型，逐问比较回复和裁判结果；manifest将问题快照与不可变结果分片绑定，比只看最新CSV更可追溯。 |
| 19 | [FACTS Parametric](../../content/benchmarks/facts-parametric.json) | FACTS 套件中只依赖模型内部知识的文本事实问答分项。 | [官方来源](https://deepmind.google/blog/facts-benchmark-suite-systematically-evaluating-the-factuality-of-large-language-models/) | Google Research（复用发布方标识）；Google DeepMind（复用发布方标识） | 官方任务/数据入口：官方Kaggle入口管理Parametric榜单和公开集；本次未完整提取具体题目viewer/文件下载条件，不能把leaderboard路径保证为直接下载。 |
| 20 | [RWS M-GATE](../../content/benchmarks/rws-mgate.json) | 检查多语言语法、往返翻译语义保持及 tokenizer 效率。 | [官方来源](https://arxiv.org/abs/2608.03803) | RWS（发布方Logo） | 官方任务/数据入口：论文指定此站为活榜和非 live 示例入口；本次抓取未返回页面内容，本站只提供官方链接。 |
| 21 | [SimpleQA Verified](../../content/benchmarks/simpleqa-verified.json) | 在 OpenAI SimpleQA 基础上重新核验标签、去重、平衡主题并改进评委提示的事实性评测。 | [官方来源](https://huggingface.co/datasets/google/simpleqa-verified) | Google Research（复用发布方标识）；Google DeepMind（复用发布方标识） | 站内 2 条真实记录 |
| 22 | [Arena Vision](../../content/benchmarks/arena-vision.json) | Arena 平台中对视觉输入回答的匿名人类偏好专项榜。 | [官方来源](https://arena.ai/leaderboard/vision) | Arena（项目标识） | 官方任务/数据入口：视觉专项榜可看类别/排名/票量；完整当期图像和投票记录不由该榜页下载，公开研究快照与当前Vision分开。 |
| 23 | [Roboflow Vision Evals](../../content/benchmarks/roboflow-vision-evals.json) | 对相同真实图片任务测目标检测、计数、识别、OCR、提取和推理。 | [官方来源](https://playground.roboflow.com/evals) | Roboflow（发布方Logo） | 官方任务/数据入口：官方 Results by task 的六个入口可查看专项说明、样本/模型输出及 strict/judged 分数；上传自己的图片是在 Playground 试用模型，不是下载完整评测题库。 |
| 24 | [Chess Puzzles](../../content/benchmarks/chess-puzzles.json) | 模型读取棋局FEN并选出当前玩家唯一最佳下一步。 | [官方来源](https://epoch.ai/benchmarks/chess-puzzles) | Epoch AI（复用发布方标识） | 官方任务/数据入口：官方方法展示精选FEN局面与模型日志链接，可看到局面和最终着法形态；完整100局面的下载/数据许可未确认。 |
| 25 | [FrontierMath v2 · Tier 4](../../content/benchmarks/frontiermath-v2-tier-4.json) | 在修订后的 FrontierMath Tier 4 题集上求解更困难的研究级数学问题，由 verifier 核验精确答案。 | [官方来源](https://epoch.ai/benchmarks/frontiermath-tier-4-v2) | Epoch AI（复用发布方标识） | 限制公开：官方分Tier样题页含v2 Tier4的2个公开问题及解答；主hub通常报告私有集，样题不等于完整43题下载。 |
| 26 | [FrontierMath v2 · Tiers 1–3](../../content/benchmarks/frontiermath-v2-tiers-1-3.json) | 在修订后的 FrontierMath Tiers 1–3 题集上求解从高年级本科到早期科研的数学问题，由 verifier 核验精确答案。 | [官方来源](https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2) | Epoch AI（复用发布方标识） | 限制公开：官方分Tier样题页含v2 Tiers1–3的10个公开问题及解答；主hub通常报告私有集，样题不等于完整295题下载。 |
| 27 | [ArXivLean](../../content/benchmarks/matharena-arxivlean.json) | 要求模型把近期数学研究中的定理正式化并提供可由 Lean 校验的证明。 | [官方来源](https://matharena.ai/arxivlean/) | MathArena（项目标识） | 站内 1 条真实记录 |
| 28 | [ArXivMath](../../content/benchmarks/matharena-arxivmath.json) | 从近期 arXiv 论文摘要构造研究级数学题，要求模型给出可验证的最终答案。 | [官方来源](https://matharena.ai/arxivmath/) | MathArena（项目标识） | 站内 1 条真实记录 |
| 29 | [BrokenArXiv](../../content/benchmarks/matharena-brokenarxiv.json) | 评估模型面对貌似合理但与近期数学论文结果矛盾的假命题时，是否指出问题而非伪造证明。 | [官方来源](https://matharena.ai/brokenarxiv/) | MathArena（项目标识） | 站内 1 条真实记录 |
| 30 | [Mystery Game Puzzles](../../content/benchmarks/mystery-game-puzzles.json) | 在不公开游戏身份的游戏局面中选择唯一最佳下一步。 | [官方来源](https://epoch.ai/benchmarks/mystery-game-puzzles) | Epoch AI（复用发布方标识） | 未公开完整原题：官方为避免针对性准备，暂不公开游戏身份、prompt、样例局面或模型轨迹；方法页不作为公开样例。 |
| 31 | [MysteryMechanism](../../content/benchmarks/mysterymechanism.json) | 从匿名变量的输入输出观察和有限主动实验中恢复可执行数学关系。 | [官方来源](https://www.vals.ai/benchmarks/mysterymechanism) | Vals AI（复用发布方标识） | 官方任务/数据入口：官网的三个冻结例子给真实agent-visible问题与构造的成功路径；示范不是某模型原始轨迹，也不属于隐藏验证/测试机制。 |
| 32 | [SimpleBench](../../content/benchmarks/simplebench.json) | 包含空间/时间推理、社会智能与语言陷阱题的文字多选题 benchmark。 | [官方来源](https://simple-bench.com/) | SimpleBench（官方账户identicon） | 官方任务/数据入口：该 JSON 文件可直接查看 eval_data 的 10 个公开题和评分键；完整超过 200 题题集未由此文件提供。 |
| 33 | [AA-AnalystAgent](../../content/benchmarks/aa-analyst-agent.json) | 针对业务与数据分析员工作，考察从原始文件到定量答案的完整分析。 | [官方来源](https://artificialanalysis.ai/evaluations/aa-analyst-agent) | Artificial Analysis（复用发布方标识） | 官方任务/数据入口：官方Example Tasks提供两项California Medicaid问题、参考答案和源zip链接；可看真实问题/档案形态，不能获取全部80题和私有答案。 |
| 34 | [APEX-Agents 1.1](../../content/benchmarks/apex-agents-1-1.json) | 从投行、咨询和法律项目材料中完成专业任务，提交工作成果；1.1 修订任务并惩罚含糊的多答案。 | [官方来源](https://huggingface.co/datasets/mercor/apex-agents-v1.1) | Mercor（发布方Logo） | 受控访问：公开HF数据卡说明240个任务的Harbor包、31个world seed和1.1.1 delivery revision；文件访问需先接受条件，数据卡不是原始任务viewer。 |
| 35 | [BioMysteryBench](../../content/benchmarks/biomysterybench.json) | 使用有客观依据的生物信息学问题检验数据分析与研究能力。 | [官方来源](https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench) | Anthropic（发布方Logo） | 受控访问：公开数据卡可看问题id、人可解标签与概览；problems和逐题数据zip须登录并接受用途条件，本站不替代该受控下载。 |
| 36 | [Excel Modeling Benchmark (EMB)](../../content/benchmarks/excel-emb.json) | 从业务指令和原始资料生成包含公式、数值和格式的完整金融模型。 | [官方来源](https://www.vals.ai/benchmarks/emb) | Vals AI（复用发布方标识） | 官方任务/数据入口：官网展示一个公开建模任务、输入要求及numerical/formula/presentation检查；51题验证集需许可、51题测试集保留，网页不是103题完整下载。 |
| 37 | [FinanceBenchmark](../../content/benchmarks/finbenchmark.json) | 以数值、代码和结构化输出验证真实金融工作流程的完成情况。 | [官方来源](https://finbenchmark.ai/methodology) | Finance Benchmark（项目标识） | 官方任务/数据入口：官方 tasks/ 按金融类别列出公开 JSON，可查看 prompt、type 和容差配置；同文件中的 answer/参考实现用于验证，不等于模型输入。 |
| 38 | [Harvey Legal Agent Benchmark (LAB)](../../content/benchmarks/harvey-lab.json) | 依据客户事项和文件制作可审阅的法律工作成品。 | [官方来源](https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark) | Harvey（发布方Logo） | 官方任务/数据入口：官方仓库及 tutorial 可从事项材料、task.json 和交付要求一路读到评分报告；这是可运行任务/执行器入口，而非当前所有客户材料的统一转载许可。 |
| 39 | [Legal Research Bench (Vals AI)](../../content/benchmarks/legal-research-vals.json) | 跨美国联邦和州法进行多来源法律研究，产出有依据的回答。 | [官方来源](https://www.vals.ai/benchmarks/legal_research) | Vals AI（复用发布方标识） | 官方任务/数据入口：此公开 JSON 直接列出样本 id/法律问题；不含整个413题集或gold答案，完整200题验证集需许可、208题测试集保留。 |
| 40 | [MedCode](../../content/benchmarks/medcode.json) | 根据脱敏住院记录预测主诊断和次诊断的 ICD-10-CM 编码。 | [官方来源](https://www.vals.ai/benchmarks/medcode) | Vals AI（复用发布方标识） | 未公开完整原题：官方未公开可读取的患者级文档/编码样例或下载；仅有方法、模型分项与错误类型图，不能当病例viewer。 |
| 41 | [MedScribe](../../content/benchmarks/medscribe.json) | 考察从医患对话文本生成符合专家标准的临床文档。 | [官方来源](https://www.vals.ai/benchmarks/medscribe) | Vals AI（复用发布方标识） | 官方任务/数据入口：官方页面的Sample Doctor-Patient Transcript展示真实公开的模拟对话文本，并说明专家SOAP模板/rubric；没有提供100份计分材料的完整下载。 |
| 42 | [PRBench](../../content/benchmarks/prbench.json) | 覆盖金融和法律开放式专业任务的专家 rubric 评测体系。 | [官方来源](https://labs.scale.com/papers/prbench) | Scale AI（复用发布方标识） | 官方任务/数据入口：官方 README 指定此 Explorer 浏览专业问题、对话与 rubric；完整发布文件也可在 HF 四个 split 查看，Hard 与完整领域有重叠。 |
| 43 | [PRBench Finance](../../content/benchmarks/prbench-finance.json) | PRBench 的金融分项，按该领域专家准则评价开放式专业推理。 | [官方来源](https://labs.scale.com/papers/prbench) | Scale AI（复用发布方标识） | 站内 2 条真实记录 |
| 44 | [PRBench Legal](../../content/benchmarks/prbench-legal.json) | PRBench 的法律分项，按该领域专家准则评价开放式专业推理。 | [官方来源](https://labs.scale.com/papers/prbench) | Scale AI（复用发布方标识） | 站内 1 条真实记录 |
| 45 | [SpreadsheetBench 2](../../content/benchmarks/spreadsheetbench-v2.json) | 以多步、跨工作表操作完成建模、纠错和可视化等业务工作。 | [官方来源](https://arxiv.org/html/2606.29955v1) | RUCKBReasoning（发布方Logo） | 官方任务/数据入口：此官方 Files 入口提供完整 V2 工作簿下载包；数据卡暂无自动 Viewer。仓库 README 另说明 dataset.json、输入/黄金文件与重算步骤。 |
| 46 | [τ³-Banking](../../content/benchmarks/tau3-banking.json) | 在银行客服中结合非结构化政策检索和工具操作，完成可验证的业务状态变化。 | [官方来源](https://arxiv.org/abs/2603.04370) | Sierra Research（复用发布方标识）；Artificial Analysis（复用发布方标识） | 官方任务/数据入口：AA 页面有三项真实银行流程示例、所需行动与成功条件；上游仓库提供 banking_knowledge 任务和模型定义，查看示例时应区分 agent 输入与评分答案。 |
| 47 | [Tax Agent Bench](../../content/benchmarks/tax-agent-bench.json) | 评估智能体对复杂美国企业税问题的端到端研究。 | [官方来源](https://www.vals.ai/benchmarks/tax_agent_bench) | Vals AI（复用发布方标识） | 官方任务/数据入口：此文件提供五个真实公开问题及severity/must_pass检查，可直接理解任务和部分评分；不是391题或私有193题榜单下载。 |
| 48 | [Arena Creative Writing](../../content/benchmarks/arena-creative-writing.json) | Text Arena 中的创意写作类别，比较用户在匿名回答间的偏好。 | [官方来源](https://arena.ai/leaderboard/text/creative-writing) | Arena（项目标识） | 官方任务/数据入口：官方Creative Writing类别是Text Arena投票切片；本次未取得该类别完整当期prompt/投票数据包，不等同固定创作题库。 |
| 49 | [Arena WebDev](../../content/benchmarks/arena-webdev.json) | Arena 的网页开发专项，用户运行两份生成应用后比较偏好。 | [官方来源](https://arena.ai/blog/webdev-arena) | Arena（项目标识） | 官方任务/数据入口：当前WebDev榜可按技术/领域/harness查看运行成果；历史官方文章展示React输出结构，但没有当前所有生成应用和投票的统一下载。 |
| 50 | [Creative Writing v3](../../content/benchmarks/creative-writing-v3.json) | 在固定创作提示下生成英语作品，通过 rubric 和两两对比评估写作质量。 | [官方来源](https://github.com/EQ-bench/creative-writing-bench) | EQ-bench（项目标识） | 官方任务/数据入口：此目录含完整提示和裁判材料；逐模型作品与评分可另沿官方榜单查看，本站不将提示集与模型输出混称为同一数据。 |
| 51 | [Design Arena](../../content/benchmarks/design-arena.json) | 在同提示生成结果间匿名投票，比较前端及图片、视频等设计成果。 | [官方来源](https://www.designarena.ai/about) | Design Arena（项目标识） | 官方任务/数据入口：官方leaderboard目录可进入前端Text-to-HTML、图像/视频/音频等子榜，在线生成是新任务试用，未发现完整历史prompt/投票下载。 |
| 52 | [Longform Writing](../../content/benchmarks/longform-writing.json) | 从简短提示规划、修改并写出多章故事，评估叙事与角色的一致性。 | [官方来源](https://github.com/EQ-bench/longform-writing-bench) | EQ-bench（项目标识） | 官方任务/数据入口：可读取五步规划、章节生成模板与评分标准；完整作品和逐章评分沿官方长篇榜单/报告查看。 |
| 53 | [NC Bench](../../content/benchmarks/nc-bench.json) | 围绕创作者的编辑、生成、提取、摘要和语言任务检查写作助手表现。 | [官方来源](https://www.nc-bench.com/about) | Novelcrafter（发布方Logo） | 官方任务/数据入口：官方tests目录可进入场景提示、规则和逐模型输出；未确认完整执行器/数据下载，项目仍early access，不能把目录当文件包。 |
| 54 | [OpenVibeEval](../../content/benchmarks/openvibeeval.json) | 用相同公开提示生成单文件网页，记录可访问性和生成成果。 | [官方来源](https://openvibeeval.com/methodology/) | OpenVibeEval（项目标识） | 官方任务/数据入口：官方页面可进入公开prompt的sandbox预览，并用Open单独查看生成页面；它展示运行成果，不提供源码viewer，不能称为下载原始HTML档案。 |
| 55 | [Rapidata SVG Generation](../../content/benchmarks/rapidata-svg.json) | 将同提示 SVG 渲染成图片，由真人比较偏好、连贯性和提示匹配。 | [官方来源](https://huggingface.co/datasets/Rapidata/svg-benchmark) | Rapidata Benchmarks（发布方Logo） | 官方任务/数据入口：HF Viewer可看同提示的两份SVG及渲染图、preference/coherence/alignment反馈，Files可取发布数据；它是静态发布集，不能当作live v1全部投票。 |
| 56 | [Lech Mazur Short-Story](../../content/benchmarks/short-story.json) | 在相同约束下写短篇故事，比较指定元素融合与整体文字质量。 | [官方来源](https://github.com/lechmazur/writing) | Lech Mazur（官方账户identicon） | 官方任务/数据入口：作者prompt目录直接给十元素brief；同仓库stories_wc按模型提供作品，data目录另给比较结果，不能把作品文本当标准答案。 |
| 57 | [svgbench.ai](../../content/benchmarks/svgbench.json) | 比较同一提示生成的 SVG 插图，通过人类盲投建立专项排名。 | [官方来源](https://svgbench.ai/) | svgbench.ai（项目标识） | 官方任务/数据入口：官方Best SVGs和Sandbox可看生成插图/对战，leaderboard有覆盖/支持度；本次未确认全部prompt、SVG源码与投票的下载包。 |
| 58 | [ToneBench](../../content/benchmarks/tonebench.json) | 根据真实视频 brief 和研究材料写完整脚本，检查频道语气与内容质量。 | [官方来源](https://benchmark.towardsai.com/methodology.html) | Towards AI（发布方Logo） | 官方任务/数据入口：官方榜单可查看十个视频任务和写作结果说明；精确rubric保持私有，未提供所有reference/script原始文件统一下载。 |
| 59 | [TubeLab Scriptwriting Benchmark](../../content/benchmarks/tubelab.json) | 在 TubeLab Scriptwriter 的固定流程内生成脚本，比较六项写作表现。 | [官方来源](https://tubelab.net/benchmark/scriptwriting) | TubeLab（发布方Logo） | 官方任务/数据入口：官方12任务及脚本入口展示固定TubeLab工作流产生的脚本，并给rubric概述和原视频对照；未确认完整harness源码/私有research pack可下载。 |

## 真实样例的来源与验证

所选记录均来自实际下载的固定 SHA Parquet/CSV。主 agent 重读源文件并验证完整源文件哈希、完整原记录规范 JSON 哈希、题面/答案哈希、逐字段 raw 投影和实际许可材料哈希，9/9 通过。

| 评测 | 数量 | 展示内容 | 原文与许可边界 |
| --- | ---: | --- | --- |
| ArXivMath | 1 | 研究数学极值计数题及官方参考答案 | 0626 固定记录3，数据 CC BY-SA 4.0，来源论文 CC BY 4.0；不复制论文正文/媒体 |
| ArXivLean | 1 | formal_statement 的真实 Lean 证明目标 | 固定记录1，保留自然语言 problem 于 raw；含 sorry 不是完成证明，不生成参考答案 |
| BrokenArXiv | 1 | 研究数学命题审查任务及原始评分字段 | 固定记录15，来源论文 CC0；区分模型输入与原命题/评分材料 |
| PRBench Finance | 2 | 专业金融原题与作者 rubric | 固定 data_v2 / finance，所选第三方 reference_texts 全空，不复制模型结果，不捏造标准作答 |
| PRBench Legal | 1 | 专业法律原题与作者 rubric | 同一固定快照 legal，第三方 reference_texts 全空 |
| SimpleQA Verified | 2 | 固定 CSV 的短事实问答 | original_index 5/8、MIT，题面及答案取原字段，链接网页正文不复制 |
| LiveBench | 1 | 纯合成 Web of Lies V2 逻辑题 | 官方 DATASHEET 明确数据 Apache-2.0；2024-06-24 release 已在2025移除，只示范题型 |

PRBench 的 finance/legal 确为固定数据卡声明的 split，config 为 default；没有把 config 当作 split。记录原题语言保留，中文题名/解读单独表达。

原始候选、固定地址与哈希见 [样例研究](../research/2026-10-08-expansion-sample-candidates.md) 和 [独立采用检查](../../artifacts/2026-10-08-expansion-sample-adoption-check.json)。原题只通过已有 sampleSet 导入，所有公开来源/许可仍登记于原 sources 机制。

## 重要内容纠正

- ProgramBench、Hyper-τ、SWE-rebench：补实际任务字段、构建/安装交付路径、环境与基提交、两类测试和工具预算。
- PRBench：固定多轮历史后仅生成末轮回答，分开正权重分母、负分及总体下限；rubric 不是模型额外输入。
- EQ-bench 三类：补真实提示/persona/章节/result 文件结构；Longform按官网当前v1.11/Sonnet4.6修订，原README旧描述不代替当前协议。
- LiveBench：真实浏览器实读当前官网 release 2026-06-25、7类23任务、每六个月更新；原论文6类18任务及首发公开样例另列，不推定当期题库全部公开。
- ArXivLean：按固定 Parquet 实际6字段描述，formal_statement含sorry，不添加不存在的完整answer字段。
- Tax/MLCR等：公开代码默认设置和官方执行配置分开；公开Tier1–3材料不当作AA的私有60题。

## 标识与来源

新增27种：11项目标识、11发布方Logo、1作者头像、4官方账户identicon。LiveBench、SimpleBench、BullshitBench、Short-Story所用identicon是其官方账户身份图，不称专属Logo；WeirdML用官方作者头像。默认React图、空白RWS头像、TubeLab的404图、浅底不可读的NC图均未采用。

[标识来源与本地文件](../LOGO_SOURCES.md)、[实际素材核验与映射](../../artifacts/candidates/2026-10-08-expansion-brand-assets.json)。

## 检查结果与边界

- 严格 TypeScript、151条公开内容/36样例/17报告生成与校验通过；现有44项测试通过。
- 原18个含站内样例的文件逐文件SHA-256与本轮开始相同，原27条样例未改变。
- 全59项均有已登记并经文件核验的标识，9条新增原文均独立哈希验证；新模板/渲染器/字段/依赖数量均为0。
- 实际浏览器验收待完成：当前5173与5174是另一个RAG项目，已向用户询问图鉴现有运行地址。不能把RAG页面或单纯文件/类型检查算作本项目可见验收。
- 未启动开发服务、未生产构建、未运行真实benchmark、未下载受控任务、未提交推送发布。

