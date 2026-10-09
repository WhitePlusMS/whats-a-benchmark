# 全部151项的真实案例覆盖核对

覆盖核对日期：2026-10-08；原始数据展示于2026-10-09修正。计数来自 `content/benchmarks/*.json`，组合页按正式 `composition.items` 解析。本文记录采纳范围和仍未满足的条件，不将公开方法、模型总分或相邻版本例题计为当前条目的独立案例。

| 口径 | 数量 |
| --- | ---: |
| 已发布 benchmark 条目 | 151 |
| 有自身案例的条目 | 138 |
| 原始来源采样条目 / 记录 | 42 / 53 |
| 官方公开案例解读条目 / 记录 | 96 / 96 |
| 通过正式组成基准展示案例的综合指数页 | 1 |
| 有案例可看的详情页 | 139 |
| 站内案例记录（不重复计综合指数） | 149 |
| 尚缺可登记具体案例的条目 | 12 |

## 什么算本次案例

- **原始来源**：从已确认来源、展示字段许可及定位的数据或任务文件采样，保留原始输入或必要字段投影。53条中19条明确标为节选，不一概声称是全量可复现任务。原始数据字段和媒体均保留独立来源及复用依据。
- **公开案例解读**：官方论文、项目页、任务展示或公开评测运行中的具体实例；本站中文任务说明以 `promptOrigin: editorial` 标注。2026-10-09已将这96项的 `raw` 修正为32项真实JSON字段投影与64项源文本、表格或配置片段；原始字段和所选值保留来源形式，删节范围单独说明。未公开的附件、图像、答案及评分器不补写。
- **组成基准案例**：AA Intelligence Index 本身是指数，详情通过已有 `composition.items` 显示 AA Briefcase 的真实任务，保留成员名称及链接，不创造指数题目、不重复存储同一案例。普通 `related`、子集或衍生关系不会自动继承样例。
- **仍有缺口**：没有本站可登记案例；即使有任务结构和官方资源链接，也不算已有案例。明确禁止在线披露、需要授权、缺少当前版本归属或只发布汇总结果均逐项记录。

EBR-bench 展示的是官方公开的具体评测运行，不是完整游戏局面或输入行；其公开运行版本与当前默认禁卡设置分别说明。FrontierMath v2 公共题来自该版本 hub 明确链接的公开题页及对应 tier，不猜测稳定题库行号。OSWorld 条目及采纳案例均明确为 2.0，不将它推断为 2.1。视觉及文档案例中，未获媒体转载依据的图像或工作簿仍需通过对应原始来源查看。

## 仍有缺口的12项

以下是已检查公开来源的具体边界，不能据单次401/403、动态页面或公开入口缺失推断全网永远没有其他材料。

| 条目 | 当前原因 | 已核对的具体边界与官方来源 |
| --- | --- | --- |
| GPQA Diamond (`gpqa-diamond`) | 明确限制在线披露 | Diamond 是 GPQA 子集，保留作者对题目文字及图片的在线披露限制。 [官方来源](https://github.com/idavidrein/gpqa) |
| GPQA (`gpqa`) | 明确限制在线披露 | 作者数据卡要求不要在线发布题目文字或图片；不把题面、答案或重述题目转成站内案例。 [官方来源](https://huggingface.co/datasets/Idavidrein/gpqa) |
| Video-MME (`video-mme`) | 发布或复制须事先批准 | 官方README要求分发、发布、复制、传播或修改Video-MME全部或部分内容前取得批准，视频另属原权利人；不转存视频、帧、字幕或题目。 [官方来源](https://github.com/MME-Benchmarks/Video-MME) |
| HealthBench (`healthbench`) | 明确限制在线披露 | OpenAI 要求不要在线展示 HealthBench 题目；不转载对话、答案、rubric 或截图。 [官方来源](https://openai.com/index/healthbench/) |
| MedCode (`medcode`) | 公开页面未定位病例 | Vals 官方页及其客户端脚本显示 data-has-examples=false；F32.A 等是汇总诊断类别，不是具体患者病历与答案编码。 [官方来源](https://www.vals.ai/benchmarks/medcode) |
| HealthBench Hard (`healthbench-hard`) | 明确限制在线披露 | Hard 子集沿用 HealthBench 的在线披露边界，不用母集题目自动代替当前子集案例。 [官方来源](https://openai.com/index/healthbench/) |
| OpenAI 前端偏好评测 (`openai-internal-coding`) | 公开展示不等于评测记录 | 发布页展示精选前端作品，未确认其为内部偏好评测实际样例；不把展示作品登记为 benchmark 题目。 [官方来源](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering) |
| CursorBench 4.0 (`cursorbench-4`) | 当前版本案例未确认 | CursorBench 4.0 页面给出成绩、成本和任务类别；Composer 2 报告公开例题明确属于 CursorBench-3，未发现映射到4.0的证据，不跨版本登记。 [官方来源](https://prod.cursor.com/evals) |
| HealthBench Professional (`healthbench-professional`) | 明确限制在线披露 | 官方 Professional 报告要求不要以文本或图像在线披露样例；保留任务结构说明及官方入口。 [官方来源](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf) |
| Code Migration (`code-migration`) | 公开页面未定位具体任务 | Vals 官方页及其声明的客户端脚本显示 data-has-examples=false；已查路径只有迁移类型和汇总成绩，没有具体源仓库、目标语言组合或任务输入。 [官方来源](https://www.vals.ai/benchmarks/code-migration) |
| TapTap Maker Benchmark (`taptap-maker`) | 官方保留 held-out 任务 | edition archive、board.js/common.js与公开快照给出版本指纹和模型汇总；方法页说明held-out prompts、answers、traces不公开，没有可登记的单项任务。 [官方来源](https://maker.taptap.cn/leaderboard/methodology.html) |
| Mystery Game Puzzles (`mystery-game-puzzles`) | 官方保留任务内容 | 官方为防污染未发布具体游戏任务、局面、prompt、答案和模型轨迹；方法或评分说明不计为案例。 [官方来源](https://epoch.ai/benchmarks/mystery-game-puzzles) |

OfficeQA Pro 已采用 [官方论文 v1 第4页 Figure 3](https://arxiv.org/pdf/2603.08655v1#page=4)明确标为 Pro 的 UID0013；它与旧博客 USDA 示例不同，未读取 gated CSV 或补写未公开答案。OSWorld 2.0 的 Task035 与实际条目版本一致，已采用；不推断2.1成员身份。[OfficeQA / OSWorld 最终核查](../research/2026-10-08-officeqa-osworld-final-public-check.md)保留公开例题、版本与访问边界。[Vals / Cursor 最终核查](../research/2026-10-08-final-gap-b.md)保留页面脚本、版本及没有定位具体输入的边界。

## 全151项逐项清单

原始来源与公开案例解读在样例组件中分别标注。下面逐项列出首条案例及对应来源；多条记录完整保存在条目的 sampleSet 中。综合指数不增加存储记录数。

| 条目 | 模式 | 自身记录数 | 首条具体案例 / 当前状态 | 原始来源 |
| --- | --- | ---: | --- | --- |
| MMMLU (`mmmlu`) | 原始来源 | 1 | ZH_CN test 第 1 条 · mmmlu-zh-cn-test-row-0-2fba2ac8a8 | [来源](https://huggingface.co/datasets/openai/MMMLU/blob/64d5b3a05a263d14426f109345c38abaa7c7948d/test/mmlu_ZH-CN.csv) |
| SWE-bench Verified (`swe-bench-verified`) | 公开案例解读 | 1 | Astropy · 嵌套组合模型可分离矩阵 · public-case-swe-bench-verified | [来源](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Verified&config=default&split=test&offset=0&length=1) |
| Artificial Analysis Intelligence Index (`aa-intelligence-index`) | 组成基准案例 | 0 | AA-Briefcase v1.1 / Lite公开任务 · 新西兰鸡蛋市场结构图 | [来源](https://huggingface.co/datasets/ArtificialAnalysis/AA-Briefcase-Lite/resolve/4dec557b47d43867a1648c0974db1d8208c8b677/tasks/w1_t1.md) |
| LiveBench (`livebench`) | 原始来源 | 1 | 合成逻辑：谁在说真话 · 0daa7ca38beec4441b9d5c04d0b98912322926f0a3ac28a5097889d4ed83506f | [来源](https://huggingface.co/datasets/livebench/reasoning/resolve/6fc6498a5dfba553f69f4413feabade1f1a2d384/data/test-00000-of-00001.parquet) |
| GPQA Diamond (`gpqa-diamond`) | 缺口 | 0 | Diamond 是 GPQA 子集，保留作者对题目文字及图片的在线披露限制。 | [来源](https://github.com/idavidrein/gpqa) |
| Humanity’s Last Exam (`hle`) | 公开案例解读 | 1 | 作者公开例题 · 蜂鸟尾部籽骨 · public-case-hle | [来源](https://scale.com/blog/humanitys-last-exam-results) |
| AIME 2025 (`aime-2025`) | 公开案例解读 | 1 | 公开第 1 题 · 进制整除 · public-case-aime-2025 | [来源](https://huggingface.co/datasets/MathArena/aime_2025/resolve/c94da77eb22bbd6439e62a323bec18493a421302/data/train-00000-of-00001.parquet) |
| Terminal-Bench 2.0 (`terminal-bench-2`) | 公开案例解读 | 1 | 公开任务成员 · Golden Gate 引物设计 · official-case-terminal-bench-2-dna-assembly | [来源](https://hub.harborframework.com/tasks/terminal-bench/dna-assembly/latest) |
| MMMU (`mmmu`) | 原始来源 | 1 | Accounting / dev · dev_Accounting_1 · dev_Accounting_1 | [来源](https://huggingface.co/datasets/MMMU/MMMU/viewer/Accounting/dev?row=0) |
| MMLU (`mmlu`) | 原始来源 | 1 | 解剖学 · test 第 0 行 · anatomy-test-row-0 | [来源](https://huggingface.co/datasets/cais/mmlu/resolve/c30699e8356da336a370243923dbaf21066bb9fe/anatomy/test-00000-of-00001.parquet) |
| MMLU-Pro (`mmlu-pro`) | 原始来源 | 2 | 多项式上的两个变换 · 1 | [来源](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/viewer/default/validation) |
| GPQA (`gpqa`) | 缺口 | 0 | 作者数据卡要求不要在线发布题目文字或图片；不把题面、答案或重述题目转成站内案例。 | [来源](https://huggingface.co/datasets/Idavidrein/gpqa) |
| SimpleQA (`simpleqa`) | 原始来源 | 1 | 短事实问答 · IEEE 奖项 · test-csv-row-0 | [来源](https://openaipublic.blob.core.windows.net/simple-evals/simple_qa_test_set.csv) |
| C-Eval (`ceval`) | 原始来源 | 1 | 计算机网络 · dev 第 0 题 · computer-network-dev-0 | [来源](https://huggingface.co/datasets/ceval/ceval-exam/resolve/617524a00b307ff6f9933702f724131fe12ca7ce/computer_network/dev-00000-of-00001.parquet) |
| HumanEval (`human-eval`) | 原始来源 | 2 | 找出距离足够近的两个数 · HumanEval/0 | [来源](https://github.com/openai/human-eval/blob/master/data/HumanEval.jsonl.gz) |
| MBPP (`mbpp`) | 原始来源 | 2 | 找出两组数据的共同元素 · 2 | [来源](https://github.com/google-research/google-research/blob/master/mbpp/sanitized-mbpp.json) |
| LiveCodeBench (`livecodebench`) | 公开案例解读 | 1 | Codeforces 1873_A · 最多一次交换排序 · public-case-livecodebench | [来源](https://huggingface.co/datasets/livecodebench/code_generation_lite/resolve/0fe84c3912ea0c4d4a78037083943e8f0c4dd505/test.jsonl) |
| SWE-bench (`swe-bench`) | 公开案例解读 | 1 | Astropy · 非线性 WCS 绘图异常 · public-case-swe-bench | [来源](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench&config=default&split=test&offset=0&length=1) |
| SWE-bench Pro (`swe-bench-pro`) | 公开案例解读 | 1 | NodeBB · 缓存初始化和 slug 批量检查 · public-case-swe-bench-pro | [来源](https://datasets-server.huggingface.co/rows?dataset=ScaleAI%2FSWE-bench_Pro&config=default&split=test&offset=0&length=1) |
| Aider Polyglot (`aider-polyglot`) | 公开案例解读 | 1 | Python wordy · 从左到右的自然语言运算 · public-case-aider-polyglot | [来源](https://raw.githubusercontent.com/Aider-AI/polyglot-benchmark/7e0611e77b54e2dea774cdc0aa00cf9f7ed6144f/python/exercises/practice/wordy/.docs/instructions.md) |
| GSM8K (`gsm8k`) | 原始来源 | 3 | 卖鸭蛋的收入 · 0 | [来源](https://github.com/openai/grade-school-math/blob/master/grade_school_math/data/test.jsonl) |
| MATH-500 (`math-500`) | 公开案例解读 | 1 | MATH-500 · 直角坐标转极坐标 · public-case-math-500 | [来源](https://datasets-server.huggingface.co/rows?dataset=HuggingFaceH4%2FMATH-500&config=default&split=test&offset=0&length=1) |
| AIME 2024 (`aime-2024`) | 公开案例解读 | 1 | AIME I 2024 第 1 题 · 步行与停留时间 · public-case-aime-2024 | [来源](https://huggingface.co/datasets/MathArena/aime_2024_I/resolve/ea5b061c3e8039dc9858defaafc407d04b995e9f/data/train-00000-of-00001.parquet) |
| BullshitBench v2 (`bullshitbench-v2`) | 公开案例解读 | 1 | V2 · 把热传导概念套进 CI/CD · public-case-bullshitbench-v2 | [来源](https://raw.githubusercontent.com/petergpt/bullshit-benchmark/main/questions.v2.json) |
| FACTS Parametric (`facts-parametric`) | 公开案例解读 | 1 | 官方表 5 · 电视剧主题曲口琴演奏者 · public-case-facts-parametric | [来源](https://storage.googleapis.com/deepmind-media/FACTS/FACTS_benchmark_suite_paper.pdf) |
| SimpleQA Verified (`simpleqa-verified`) | 原始来源 | 2 | 历史判决中的赔偿金额 · 5 | [来源](https://huggingface.co/datasets/google/simpleqa-verified/resolve/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/simpleqa_verified.csv) |
| ARC-AGI-2 (`arc-agi-2`) | 原始来源 | 1 | 从输入与输出网格中发现规则 · 6e19193c | [来源](https://github.com/arcprize/ARC-AGI-2/blob/main/data/training/6e19193c.json) |
| FrontierMath (`frontiermath`) | 公开案例解读 | 1 | Tier 2 · 大排列上的递归变换 · public-case-frontiermath | [来源](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierMath v2 · Tiers 1–3 (`frontiermath-v2-tiers-1-3`) | 公开案例解读 | 1 | Tier 1 · 有限域齐次方程非零解 · public-case-frontiermath-v2-tiers-1-3 | [来源](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| FrontierMath v2 · Tier 4 (`frontiermath-v2-tier-4`) | 公开案例解读 | 1 | Tier 4 · BMO 空间优化问题 · public-case-frontiermath-v2-tier-4 | [来源](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems) |
| BrowseComp (`browsecomp`) | 公开案例解读 | 1 | 官方创题演示 · 反向检索论文 · official-case-browsecomp | [来源](https://openai.com/index/browsecomp/) |
| τ-bench (`tau-bench`) | 原始来源 | 1 | 出行前取消待收货订单 · TASKS_DEV[0]:olivia_ito_3591 | [来源](https://github.com/sierra-research/tau-bench/blob/main/tau_bench/envs/retail/tasks_dev.py) |
| τ²-bench (`tau2-bench`) | 公开案例解读 | 1 | Telecom：移动数据速度故障 · tau2-telecom-v010-task-row-0 | [来源](https://raw.githubusercontent.com/sierra-research/tau2-bench/37199f36924c8896f5e048360691f8476cd89ba1/data/tau2/domains/telecom/tasks.json) |
| BFCL (`bfcl`) | 原始来源 | 2 | 三角形面积函数调用 · simple_python_0 | [来源](https://github.com/ShishirPatil/gorilla/blob/main/berkeley-function-call-leaderboard/bfcl_eval/data/BFCL_v4_simple_python.json) |
| OSWorld (`osworld`) | 公开案例解读 | 1 | 公开任务行 · 开启Chrome Do Not Track · official-case-osworld-chrome-dnt | [来源](https://raw.githubusercontent.com/xlang-ai/OSWorld/main/evaluation_examples/examples/chrome/030eeff7-b492-4218-b312-701ec99ee0cc.json) |
| GAIA (`gaia`) | 公开案例解读 | 1 | 论文公开例题 · 临床试验人数 · official-case-gaia | [来源](https://arxiv.org/html/2311.12983) |
| MCP-Atlas (`mcp-atlas`) | 原始来源 | 1 | MCP-Atlas 公开任务 689f4d693e212e8ef3390731 · 689f4d693e212e8ef3390731 | [来源](https://huggingface.co/datasets/ScaleAI/MCP-Atlas/blob/f7b28d11335d12047d843b3294a1b95c4ff42f35/MCP-Atlas.parquet) |
| MMMU-Pro (`mmmu-pro`) | 原始来源 | 1 | History / test · test_History_1 · test_History_1 | [来源](https://huggingface.co/datasets/MMMU/MMMU_Pro/viewer/standard%20%2810%20options%29/test?row=0) |
| MathVista (`mathvista`) | 公开案例解读 | 1 | SciBench 春簧与香料罐视觉题 · mathvista-testmini-pid-1 | [来源](https://huggingface.co/datasets/AI4Math/MathVista/viewer/default/testmini?row=0) |
| CharXiv (`charxiv`) | 公开案例解读 | 1 | 论文图表中的曲线比较 · charxiv-validation-row-1-2005-07253 | [来源](https://huggingface.co/datasets/princeton-nlp/CharXiv/viewer/default/validation?row=1) |
| Earthborne Rangers (EBR-bench) (`ebr-bench`) | 公开案例解读 | 1 | 官方旧版运行 · 卡组实验突破回合限制 · public-case-ebr-bench | [来源](https://epoch.ai/publications/ebr-bench-update) |
| ScreenSpot-Pro (`screenspot-pro`) | 公开案例解读 | 1 | DaVinci Resolve 图标定位任务 · screenspot-pro-davinci-blur-dissolve | [来源](https://arxiv.org/html/2504.07981v1) |
| Video-MME (`video-mme`) | 缺口 | 0 | 官方README要求分发、发布、复制、传播或修改Video-MME全部或部分内容前取得批准，视频另属原权利人；不转存视频、帧、字幕或题目。 | [来源](https://github.com/MME-Benchmarks/Video-MME) |
| OmniDocBench (`omnidocbench`) | 公开案例解读 | 1 | PPT 转 PDF 第 7 页文档解析 · omnidocbench-demo-index-0-page-7 | [来源](https://raw.githubusercontent.com/opendatalab/OmniDocBench/main/demo_data/omnidocbench_demo/OmniDocBench_demo.json) |
| LongBench (`longbench`) | 公开案例解读 | 1 | Multi-News：占领运动新闻摘要主题 · longbench-multi-news-row-0 | [来源](https://huggingface.co/datasets/THUDM/LongBench/resolve/5e628be450b7e67fb7ae6e201bd6d8f7056f7672/data.zip) |
| LongBench v2 (`longbench-v2`) | 公开案例解读 | 1 | 公開資料列 · Kalamang 語句翻譯 · official-case-longbench-v2-row-66fcffd9 | [来源](https://datasets-server.huggingface.co/rows?dataset=zai-org%2FLongBench-v2&config=default&split=train&offset=0&length=1) |
| RULER (`ruler`) | 公开案例解读 | 1 | 论文合成演示 · 长上下文单针检索 · official-case-ruler-s-niah-magic-number | [来源](https://arxiv.org/html/2404.06654v3) |
| MRCR（OpenAI 公开集） (`mrcr`) | 原始来源 | 1 | OpenAI MRCR 2-needle 长对话片段 · mrcr-openai-2needle-train-0 | [来源](https://huggingface.co/datasets/openai/mrcr/blob/f4c69fae7cf81f7ca26b9fee34b392a50f6b8a1d/2needle/2needle_0.parquet) |
| MRCR v2（DeepMind） (`mrcr-v2`) | 原始来源 | 1 | DeepMind MRCR v2 2-needle 长对话片段 · mrcr-v2-deepmind-2needle-4096-8192-row-2 | [来源](https://storage.googleapis.com/download/storage/v1/b/mrcr_v2/o/mrcr_v2p1_2needle_in_(4096%2C8192)_dynamic_fewshot_text_style_fast.csv?generation=1752091035115105&alt=media) |
| MLCR-AA (`mlcr-aa`) | 公开案例解读 | 1 | 官方任务演示 · 腰椎MRI日期与开立者 · official-case-mlcr-aa-mri-fact-retrieval | [来源](https://artificialanalysis.ai/evaluations/mlcr-aa) |
| IFEval (`ifeval`) | 原始来源 | 2 | 写旅行计划，但不能出现逗号 · 1001 | [来源](https://github.com/google-research/google-research/blob/master/instruction_following_eval/data/input_data.jsonl) |
| Chatbot Arena (`arena`) | 公开案例解读 | 1 | 函数调用问题与偏好平局记录 · arena-55k-row-65089 | [来源](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k/viewer/default/train?row=2) |
| GDPval (`gdpval`) | 公开案例解读 | 1 | 官方演示 · 单人电缆卷筒测试工装 · official-case-gdpval | [来源](https://openai.com/index/gdpval/) |
| Harvey Legal Agent Benchmark (LAB) (`harvey-lab`) | 公开案例解读 | 1 | 公开任务 · 并购尽调红旗审查 · official-case-harvey-lab-v1-ma-red-flag-review | [来源](https://raw.githubusercontent.com/harveyai/harvey-labs/v1.0/tasks/corporate-ma/review-data-room-red-flag-review/task.json) |
| AA-AnalystAgent (`aa-analyst-agent`) | 公开案例解读 | 1 | 公开演示 · 加州医疗交通支出 · official-case-aa-analyst-agent | [来源](https://artificialanalysis.ai/evaluations/aa-analyst-agent) |
| GDPval-AA (`gdpval-aa`) | 公开案例解读 | 1 | 公开任务演示 · 乐队舞台图 · official-case-gdpval-aa-v2-shared-stage-plot | [来源](https://artificialanalysis.ai/evaluations/gdpval-aa) |
| FinanceBenchmark (`finbenchmark`) | 公开案例解读 | 1 | 公开任务 · IFRS 研究成本 · official-case-finbenchmark-knowledge-001 | [来源](https://raw.githubusercontent.com/gaschwanden/finbenchmark/main/TASKS.md) |
| PRBench (`prbench`) | 公开案例解读 | 1 | 公开任务行 · CCAR尾部损失低估与六周申报 · official-case-prbench-finance-ccar-tail-risk | [来源](https://huggingface.co/datasets/ScaleAI/PRBench) |
| PRBench Finance (`prbench-finance`) | 原始来源 | 2 | 利率冲击下的资本开支与分配政策 · 643796de687003869b5de46a | [来源](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/finance-00000-of-00001.parquet) |
| PRBench Legal (`prbench-legal`) | 原始来源 | 1 | 公共机关违反权利后的法律分析 · 88707440664b79c6b4448135 | [来源](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/legal-00000-of-00001.parquet) |
| HealthBench (`healthbench`) | 缺口 | 0 | OpenAI 要求不要在线展示 HealthBench 题目；不转载对话、答案、rubric 或截图。 | [来源](https://openai.com/index/healthbench/) |
| SpreadsheetBench 2 (`spreadsheetbench-v2`) | 公开案例解读 | 1 | 公开任务示例 · 多表财务建模 · official-case-spreadsheetbench-v2-financial-modeling | [来源](https://spreadsheetbench.github.io/) |
| Excel Modeling Benchmark (EMB) (`excel-emb`) | 公开案例解读 | 1 | M003 · SaaS 客户留存模型 · official-case-excel-emb | [来源](https://raw.githubusercontent.com/vals-ai/emb-public-dataset/main/problems/06%20Dataroom%20Summaries/M003-scratch/instructions.md) |
| Legal Research Bench (Vals AI) (`legal-research-vals`) | 公开案例解读 | 1 | 公开样题 · RFE 邮寄错误与缺席递解 · official-case-legal-research-vals-p001 | [来源](https://raw.githubusercontent.com/vals-ai/legal-research-bench/main/data/public.json) |
| Tax Agent Bench (`tax-agent-bench`) | 公开案例解读 | 1 | 公开样题 · §382股权变更与NOL限制 · official-case-tax-agent-bench-public-p001 | [来源](https://raw.githubusercontent.com/vals-ai/tax-agent-bench/main/data/public.json) |
| MedCode (`medcode`) | 缺口 | 0 | Vals 官方页及其客户端脚本显示 data-has-examples=false；F32.A 等是汇总诊断类别，不是具体患者病历与答案编码。 | [来源](https://www.vals.ai/benchmarks/medcode) |
| HealthBench Hard (`healthbench-hard`) | 缺口 | 0 | Hard 子集沿用 HealthBench 的在线披露边界，不用母集题目自动代替当前子集案例。 | [来源](https://openai.com/index/healthbench/) |
| MedScribe (`medscribe`) | 公开案例解读 | 1 | 官方示例 · 咽痛与耳痛就诊对话 · official-case-medscribe-doctor-transcript | [来源](https://www.vals.ai/benchmarks/medscribe) |
| BioMysteryBench (`biomysterybench`) | 公开案例解读 | 1 | 官方例题 · 找出被敲除基因 · official-case-biomysterybench | [来源](https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench) |
| τ³-Banking (`tau3-banking`) | 公开案例解读 | 1 | 公开任务 · 高返现且避免年费的个人信用卡 · official-case-tau3-banking-knowledge-task-001 | [来源](https://raw.githubusercontent.com/sierra-research/tau2-bench/main/data/tau2/domains/banking_knowledge/tasks/task_001.json) |
| Finance Agent (`finance-agent`) | 公开案例解读 | 1 | v2 演示 · Centene 医疗赔付率 · official-case-finance-agent | [来源](https://www.vals.ai/benchmarks/fabv2) |
| OpenAI 前端偏好评测 (`openai-internal-coding`) | 缺口 | 0 | 发布页展示精选前端作品，未确认其为内部偏好评测实际样例；不把展示作品登记为 benchmark 题目。 | [来源](https://openai.com/index/introducing-gpt-5-for-developers/#frontend-engineering) |
| Terminal-Bench 4.0 (`terminal-bench-4`) | 公开案例解读 | 1 | v4.0.0任务 · 从扁平图稿重建可编辑布局 · official-case-terminal-bench-4-layout-config-recreation2 | [来源](https://hub.harborframework.com/tasks/terminal-bench/layout-config-recreation2) |
| FrontierCode 1.1 Main (`frontiercode-1-1-main`) | 公开案例解读 | 1 | 公开工程任务 · 统一警告输出 · public-case-frontiercode-1-1-main | [来源](https://cognition.com/frontiercode) |
| CursorBench 4.0 (`cursorbench-4`) | 缺口 | 0 | CursorBench 4.0 页面给出成绩、成本和任务类别；Composer 2 报告公开例题明确属于 CursorBench-3，未发现映射到4.0的证据，不跨版本登记。 | [来源](https://prod.cursor.com/evals) |
| GDPval-AA v2.1 (`gdpval-aa-v2-1`) | 公开案例解读 | 1 | 公开任务演示 · 乐队舞台图 · official-case-gdpval-aa-v2-1-stage-plot | [来源](https://artificialanalysis.ai/evaluations/gdpval-aa) |
| AutomationBench (`automationbench`) | 原始来源 | 1 | 邮件触发的联系人电话更新 · simple.email_sf_contact_phone_update:3001 | [来源](https://github.com/zapier/AutomationBench/blob/main/automationbench/domains/simple/tasks.py) |
| Terminal-Bench-Science 0.1 (`terminal-bench-science-0-1`) | 公开案例解读 | 1 | v0.1.0任务 · 合成表格中的稀疏非线性规则 · official-case-terminal-bench-science-0-1-symbolic-regression | [来源](https://hub.harborframework.com/tasks/terminal-bench-science/symbolic-regression/2) |
| OSWorld 2.0 (`osworld-2`) | 公开案例解读 | 1 | Task035：汇总采购请求与动态审批 · osworld-2-task035-public-case | [来源](https://osworld-v2.xlang.ai/) |
| Chartography (`chartography`) | 公开案例解读 | 1 | 工程图表：下游防护宽度 · chartography-official-engineering-example-1 | [来源](https://surgehq.ai/blog/chartography) |
| WANDR (`wandr`) | 公开案例解读 | 1 | accounting_ai_claims · 财务平台主张取证 · public-case-wandr | [来源](https://raw.githubusercontent.com/perplexityai/wandr/ccb0baeb96f1c77a48e47f92122c57479ee99700/datasets/wandr/accounting-ai-claims/instruction.md) |
| Agents’ Last Exam (`agents-last-exam`) | 原始来源 | 1 | Demo: Acme Code Generator (GUI) · demo/hello | [来源](https://github.com/rdi-berkeley/agents-last-exam/blob/main/tasks/demo/hello/task_card.json) |
| BenchCAD (`benchcad`) | 原始来源 | 2 | threaded_adapter · 几何属性问答 · threaded_adapter_000240_s4420 | [来源](https://github.com/BenchCAD/BenchCAD-main/blob/main/QA/test_data/records.jsonl) |
| ARC-AGI-3 (`arc-agi-3`) | 公开案例解读 | 1 | ls20：地图中的符号变换目标 · arc-agi-3-ls20-preview | [来源](https://arcprize.org/blog/arc-agi-3-preview-30-day-learnings) |
| OfficeQA Pro (`officeqa-pro`) | 公开案例解读 | 1 | UID0013：联邦所得税收入的线性回归 · officeqa-pro-paper-uid0013 | [来源](https://arxiv.org/pdf/2603.08655v1#page=4) |
| HealthBench Professional (`healthbench-professional`) | 缺口 | 0 | 官方 Professional 报告要求不要以文本或图像在线披露样例；保留任务结构说明及官方入口。 | [来源](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf) |
| GeneBench-Pro (`genebench-pro`) | 原始来源 | 1 | Synthetic structural-variant driven tumor therapy decision · txr1_mtb_causal_sv | [来源](https://huggingface.co/datasets/openai/genebench-pro-public-package/blob/eb75a3c0996b3cedcc9af685bad02fd166848fa2/problems/txr1_mtb_causal_sv/eval_config.json) |
| LifeSciBench (`lifescibench`) | 公开案例解读 | 1 | 论文示例 · 宫颈癌空间转录组分析 · official-case-lifescibench-spatial-transcriptomics | [来源](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf) |
| Mind2Web (`mind2web`) | 公开案例解读 | 1 | 公开任务例 · 纽约至多伦多单程航班 · official-case-mind2web-example-a-flight-search | [来源](https://osu-nlp-group.github.io/Mind2Web/) |
| Creative Writing v3 (`creative-writing-v3`) | 公开案例解读 | 1 | 罗马角斗士日常片段写作 · creative-writing-v3-gladiator | [来源](https://github.com/EQ-bench/creative-writing-bench/blob/main/data/creative_writing_prompts_v3.json) |
| Longform Writing (`longform-writing`) | 公开案例解读 | 1 | 诸神穿上运动鞋的多章节故事提示 · longform-writing-pony-alpha-gods-sneakers | [来源](https://eqbench.com/results/creative-writing-longform/openrouter__pony-alpha_longform_report.html) |
| EQ-Bench 4 (`eq-bench-4`) | 公开案例解读 | 1 | 模拟家庭责任关系情境 · eq-bench-4-generated-persona-29 | [来源](https://github.com/EQ-bench/EQ-bench-site/blob/108382e3f5017dce6f90c643e6bb4842825f62df/eqbench4/eqbench4_docs/transcripts/claude-fable-5/29.json) |
| Lech Mazur Short-Story (`short-story`) | 公开案例解读 | 1 | 洪水后温室中的中子星研究者故事 · short-story-prompt-wc-0-elements | [来源](https://raw.githubusercontent.com/lechmazur/writing/main/prompts_wc/prompt_wc_0.txt) |
| ToneBench (`tonebench`) | 公开案例解读 | 1 | AI 岗位招聘与求职指南 · tonebench-script-9-ai-hiring-guide | [来源](https://benchmark.towardsai.com/methodology.html) |
| TubeLab Scriptwriting Benchmark (`tubelab`) | 公开案例解读 | 1 | PFOA 污染科学纪录片脚本任务 · tubelab-science-documentary-pfoa | [来源](https://tubelab.net/benchmark/scriptwriting) |
| NC Bench (`nc-bench`) | 原始来源 | 1 | Definition request · Index fund vs. mutual fund · basic-0 | [来源](https://huggingface.co/datasets/ibm-research/nc-bench/viewer/default/basic?row=0) |
| Design Arena (`design-arena`) | 公开案例解读 | 1 | 绿色白色杂货电商登录页 · design-arena-tournament-33d366af | [来源](https://www.designarena.ai/tournaments/33d366af-ea0b-4220-8cb1-c275096a452e) |
| OpenVibeEval (`openvibeeval`) | 公开案例解读 | 1 | Digital Garden 交互网页生成任务 · openvibeeval-digital-garden | [来源](https://openvibeeval.com/prompt/digital-garden/) |
| svgbench.ai (`svgbench`) | 公开案例解读 | 1 | Lion SVG 插图提示 · svgbench-prompt-daf3f932ceaa | [来源](https://svgbench.ai/api/prompt/prompt_daf3f932ceaa) |
| Rapidata SVG Generation (`rapidata-svg`) | 原始来源 | 1 | SVG seed prompt · horse riding an astronaut · train-0 | [来源](https://huggingface.co/datasets/Rapidata/svg-benchmark/viewer/default/train?row=0) |
| Roboflow Vision Evals (`roboflow-vision-evals`) | 公开案例解读 | 1 | 技术图纸水平距离测量 · roboflow-visual-reasoning-technical-drawing-03 | [来源](https://playground.roboflow.com/evals/visual-reasoning) |
| RWS M-GATE (`rws-mgate`) | 公开案例解读 | 1 | 官方难句 · 多层嵌套转述 · public-case-rws-mgate | [来源](https://www.rws.com/about/news/2026/TrainAI-launches-m-gate/) |
| Arena Vision (`arena-vision`) | 公开案例解读 | 1 | 照片英文描述任务 · arena-vision-public-blog-captioning-example | [来源](https://arena.ai/blog/re-introducing-vision-arena-categories) |
| Arena WebDev (`arena-webdev`) | 公开案例解读 | 1 | Hacker News 克隆应用任务 · arena-webdev-hacker-news-clone | [来源](https://arena.ai/blog/webdev-arena) |
| Arena Creative Writing (`arena-creative-writing`) | 公开案例解读 | 1 | 神秘小说标题创作提示 · arena-creative-writing-mystery-titles | [来源](https://arena.ai/blog/arena-category) |
| Artificial Analysis Multilingual Index (`aa-multilingual-index`) | 原始来源 | 1 | Global-MMLU-Lite · 中文商业伦理题 · global-mmlu-lite-zh-business-ethics-57 | [来源](https://huggingface.co/datasets/CohereLabs/Global-MMLU-Lite/resolve/36c2fd756f19ccf13a9a96c8e53ccecc02192b8b/zh/test-00000-of-00001.parquet) |
| LiveCodeBench Pro (`livecodebench-pro`) | 公开案例解读 | 1 | A11 String 示例：CF2050D 数字串最大化 · livecodebench-pro-a11-cf2050d | [来源](https://arxiv.org/pdf/2506.11928v1) |
| Small Overlapping Speech Bench (`small-overlapping-speech-bench`) | 原始来源 | 2 | 三语重叠音频 · clip_000 · clip_000 | [来源](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/ground_truth.jsonl) |
| SciCode (`scicode`) | 原始来源 | 1 | Ewald 求和参数 alpha · ewald_summation:10.1 | [来源](https://huggingface.co/datasets/SciCode1/SciCode/blob/main/problems_dev.jsonl) |
| APEX-Agents (`apex-agents`) | 公开案例解读 | 1 | 咨询演示 · SKU 生命周期分析 · official-case-apex-agents | [来源](https://www.mercor.com/apex/apex-agents-leaderboard/management-consultant-agent/) |
| APEX-Agents 1.1 (`apex-agents-1-1`) | 公开案例解读 | 1 | 法律演示 · 合资协议签署检查 · official-case-apex-agents-1-1 | [来源](https://www.mercor.com/apex/apex-agents-leaderboard/corporate-lawyer-agent/) |
| CMMLU (`cmmlu`) | 原始来源 | 1 | 畜牧学：肉牛胴体部位 · cmmlu-dev-agronomy-row-0 | [来源](https://raw.githubusercontent.com/haonan-li/CMMLU/master/data/dev/agronomy.csv) |
| BrowseComp-ZH (`browsecomp-zh`) | 公开案例解读 | 1 | 传统绘画形式的多线索检索题 · browsecomp-zh-art-paper-figure1 | [来源](https://arxiv.org/pdf/2504.19314v2#page=2) |
| SWE-bench Multilingual (`swe-bench-multilingual`) | 公开案例解读 | 1 | Apache Druid · 添加幂运算聚合 · public-case-swe-bench-multilingual | [来源](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Multilingual&config=default&split=test&offset=0&length=1) |
| Arena-Hard v2.0 (`arena-hard-v2`) | 公开案例解读 | 1 | Zig 解题程序任务 · arena-hard-v2-uid-2edbb5f36f5b42be | [来源](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto/resolve/15f3746e21432264ce9b453999bde4f3c946d2e6/data/arena-hard-v2.0/question.jsonl) |
| AlignBench (`alignbench`) | 公开案例解读 | 1 | 麦哲伦远航与六分仪的历史问题 · alignbench-history-qid-8 | [来源](https://raw.githubusercontent.com/THUDM/AlignBench/5b79d4a84e566db26e755c719935c62a0e1b0527/data/data_v1.1_release.jsonl) |
| BabyVision (`babyvision`) | 公开案例解读 | 1 | 堆叠立方体的最少计数 · babyvision-gallery-count-3d-blocks-4597 | [来源](https://www.unipat.ai/blog/BabyVision) |
| DeepSWE v1.1 (`deep-swe-v1-1`) | 原始来源 | 1 | ts-pattern：收集所有匹配结果 · deep-swe-ts-pattern-match-each | [来源](https://raw.githubusercontent.com/datacurve-ai/deep-swe/main/tasks/ts-pattern-match-each/instruction.md) |
| IFBench (`ifbench`) | 原始来源 | 1 | 物理问答 · 至少五种并列连词约束 · test-key-5 | [来源](https://raw.githubusercontent.com/allenai/IFBench/main/ifbench/data/IFBench_test.jsonl) |
| NL2Repo-Bench (`nl2repo-bench`) | 公开案例解读 | 1 | fastapi-users · 生成认证管理项目 · public-case-nl2repo-bench | [来源](https://raw.githubusercontent.com/multimodal-art-projection/NL2RepoBench/main/test_files/fastapi-users/start.md) |
| PaperBench (`paperbench`) | 公开案例解读 | 1 | 公开rubric目标 · APT论文复现 · official-case-paperbench-adaptive-pruning-reproduction | [来源](https://raw.githubusercontent.com/openai/frontier-evals/main/project/paperbench/data/papers/adaptive-pruning/rubric.json) |
| SkillsBench (`skillsbench`) | 公开案例解读 | 1 | 官方任务 · 对比2025年Q2/Q3对冲基金持仓 · official-case-skillsbench-sec-financial-report | [来源](https://raw.githubusercontent.com/benchflow-ai/skillsbench/main/tasks/sec-financial-report/task.md) |
| Terminal-Bench 2.1 (`terminal-bench-2-1`) | 公开案例解读 | 1 | 公开任务成员 · Golden Gate 引物设计 · official-case-terminal-bench-2-1-dna-assembly | [来源](https://hub.harborframework.com/tasks/terminal-bench/dna-assembly/latest) |
| Toolathlon-Verified (`toolathlon-verified`) | 公开案例解读 | 1 | 公开任务 · 查找 Alita 论文 · official-case-toolathlon-find-alita-paper-001 | [来源](https://raw.githubusercontent.com/hkust-nlp/Toolathlon/main/tasks/finalpool/find-alita-paper/docs/task.md) |
| Vending-Bench 2 (`vending-bench-2`) | 公开案例解读 | 1 | 公开运行示例 · 过期零食退款 · official-case-vending-bench-2-expired-snickers-refund-001 | [来源](https://andonlabs.com/blog/opus-4-6-vending-bench) |
| AA-Briefcase v1.1 (`aa-briefcase`) | 原始来源 | 1 | Lite公开任务 · 新西兰鸡蛋市场结构图 · lite-w1-t1 | [来源](https://huggingface.co/datasets/ArtificialAnalysis/AA-Briefcase-Lite/resolve/4dec557b47d43867a1648c0974db1d8208c8b677/tasks/w1_t1.md) |
| AA-Omniscience (`aa-omniscience`) | 原始来源 | 1 | 公开子集 · 会计准则条款 · public-question-1 | [来源](https://huggingface.co/datasets/ArtificialAnalysis/AA-Omniscience-Public/resolve/e4883edbb9f5ccf2b2a8fdc6fb65e01a58e99849/AA-Omniscience_dataset_public.csv) |
| AA-LCR v1.1 (`aa-lcr`) | 原始来源 | 1 | 长文档推理 · 行业违规次数排序 · test-question-1 | [来源](https://huggingface.co/datasets/ArtificialAnalysis/AA-LCR/resolve/9a77ef56b717057ade24ceab4d273712a0b4f19e/AA-LCR_Dataset.csv) |
| GDP.pdf (`gdp-pdf`) | 公开案例解读 | 1 | 公开例题 · 炸锅接线图查部件 · official-case-gdp-pdf | [来源](https://surgehq.ai/benchmarks/gdp-pdf) |
| CritPt (`critpt`) | 原始来源 | 1 | Challenge_1_main：全息 Weyl anomaly 系数 · critpt-challenge-1-main | [来源](https://huggingface.co/datasets/CritPt-Benchmark/CritPt/resolve/e0892bc952bd95cdd28f4c73c5f04d963243ed1a/data/train-00000-of-00001.parquet) |
| AutomationBench-AA (`automationbench-aa`) | 公开案例解读 | 1 | 公开任务 · 科研经费分配 · official-case-automationbench-aa | [来源](https://artificialanalysis.ai/evaluations/automationbench-aa) |
| Terminal-Bench 3.0 (`terminal-bench-3`) | 公开案例解读 | 1 | v3.0.0任务 · 食品Sr-90放射性分析 · official-case-terminal-bench-3-foodstuff-beta-activity | [来源](https://github.com/harbor-framework/terminal-bench/pull/906) |
| Code Migration (`code-migration`) | 缺口 | 0 | Vals 官方页及其声明的客户端脚本显示 data-has-examples=false；已查路径只有迁移类型和汇总成绩，没有具体源仓库、目标语言组合或任务输入。 | [来源](https://www.vals.ai/benchmarks/code-migration) |
| ProgramBench (`programbench`) | 原始来源 | 1 | entr：空输入行拒绝测试 · programbench-entr-empty-input-line | [来源](https://huggingface.co/datasets/programbench/ProgramBench-Tests/resolve/de0ddfb637590c7ecb54fa0b5301f6dc7dfbcee5/eradman__entr.8e2e8b4/tests/aa2ac39b58a8.tar.gz) |
| Vibe Code Bench v1.1 (`vibe-code-bench-v1-1`) | 公开案例解读 | 1 | Zeeter · 短内容社区初始应用 · public-case-vibe-code-bench-v1-1 | [来源](https://gist.githubusercontent.com/lgnashold/e9bba36be5e468d8f8a2f330ae8d6aea/raw/0bd7400df1f9d444c54350f13af2a02aac72bd67/app_instructions.txt) |
| Vibe Code Bench 1–100 (`vibe-code-bench-1-100`) | 公开案例解读 | 1 | Zeeter · 逐轮改造私人收藏区 · public-case-vibe-code-bench-1-100 | [来源](https://www.vals-ai.com/benchmarks/vcb-1-100) |
| CyberBench Patch v1.1 (`cyberbench-patch-v1-1`) | 公开案例解读 | 1 | Patch 演示 · libxml2 生命周期修复 · public-case-cyberbench-patch-v1-1 | [来源](https://www.vals.ai/benchmarks/cyber) |
| MirrorCode (`mirrorcode`) | 公开案例解读 | 1 | cal · 大年份的周一起始月历输入 · public-case-mirrorcode | [来源](https://raw.githubusercontent.com/epoch-research/MirrorCode/main/mc/cal/cal_util_linux.jsonl) |
| TapTap Maker Benchmark (`taptap-maker`) | 缺口 | 0 | edition archive、board.js/common.js与公开快照给出版本指纹和模型汇总；方法页说明held-out prompts、answers、traces不公开，没有可登记的单项任务。 | [来源](https://maker.taptap.cn/leaderboard/methodology.html) |
| τ^τ-bench (Hyper-τ) (`hyper-tau-bench`) | 公开案例解读 | 1 | 航空客服域 · 从材料构建双旅程 · public-case-hyper-tau-bench | [来源](https://raw.githubusercontent.com/sierra-research/hyper-tau-bench/main/data/tau2/hyper/tasks/002_airline_plus_construction_core_evidence_seeded_performance_hard.json) |
| SWE-rebench (`swe-rebench`) | 原始来源 | 1 | spectree：查询参数 schema 描述未显示 · swe-rebench-spectree-64 | [来源](https://datasets-server.huggingface.co/rows?dataset=nebius%2FSWE-rebench&config=default&split=test&offset=0&length=1) |
| Long-Horizon Terminal-Bench (LHTB) (`lhtb`) | 公开案例解读 | 1 | 公开任务 · LangChain 主版本迁移 · official-case-lhtb-langchain-version-migration | [来源](https://raw.githubusercontent.com/zli12321/LHTB/main/tasks/langchain-version-migration/instruction.md) |
| FrontierSWE v2 (`frontierswe-v2`) | 公开案例解读 | 1 | 任务 27 · SGLang 服务性能优化 · public-case-frontierswe-v2 | [来源](https://raw.githubusercontent.com/Proximal-Labs/frontier-swe-v2/main/tasks/sglang-inference-system-optimization/instruction.md) |
| WeirdML v2 (`weirdml-v2`) | 公开案例解读 | 1 | Shapes Easy · 噪声点云形状分类 · public-case-weirdml-v2 | [来源](https://htihle.github.io/prompts/task_prompt_shapes_easy.html) |
| SimpleBench (`simplebench`) | 公开案例解读 | 1 | 公开第 4 题 · 两个都说假话的姐妹 · public-case-simplebench | [来源](https://raw.githubusercontent.com/simple-bench/SimpleBench/main/simple_bench_public.json) |
| Chess Puzzles (`chess-puzzles`) | 公开案例解读 | 1 | 公开日志样例 1 · 黑方最佳着法 · public-case-chess-puzzles | [来源](https://epoch-benchmarks-staging-public.s3.us-east-2.amazonaws.com/inspect_ai_logs/6DcmBdRZz57U5cusZNBeGW.eval) |
| Mystery Game Puzzles (`mystery-game-puzzles`) | 缺口 | 0 | 官方为防污染未发布具体游戏任务、局面、prompt、答案和模型轨迹；方法或评分说明不计为案例。 | [来源](https://epoch.ai/benchmarks/mystery-game-puzzles) |
| MysteryMechanism (`mysterymechanism`) | 公开案例解读 | 1 | 冻结示例 · 血细胞比容与剪切黏度机制 · public-case-mysterymechanism | [来源](https://www.vals.ai/benchmarks/mysterymechanism) |
| ArXivLean (`matharena-arxivlean`) | 原始来源 | 1 | 子水平集凸性的 Lean 证明目标 · 1 | [来源](https://huggingface.co/datasets/MathArena/arxivlean-0626/resolve/1ced46a1d45d57c6de242d51c0baf574b96022ea/data/train-00000-of-00001.parquet) |
| BrokenArXiv (`matharena-brokenarxiv`) | 原始来源 | 1 | 检查热带子簇的欧拉示性数命题 · 15 | [来源](https://huggingface.co/datasets/MathArena/brokenarxiv-0626/resolve/73dd424784fbdeab599557fcba3d77559c89d1ee/data/train-00000-of-00001.parquet) |
| ArXivMath (`matharena-arxivmath`) | 原始来源 | 1 | 禁止特定子图后的极值计数 · 3 | [来源](https://huggingface.co/datasets/MathArena/arxivmath-0626/resolve/dca0d771ab20c1b8e8c50d0921bf693f7bfe663d/data/train-00000-of-00001.parquet) |

## 实现与复核边界

继续使用 `content/benchmarks → schema → content-pipeline → .generated/public/samples → sampleLoader → SampleViewer` 原链路，没有另建采样框架或渲染器。`promptOrigin`只标明任务说明的整理方式；原始数据允许非空源JSON字段投影或原始文本，不再限制为240字符的短引。字段、选项、网格和媒体按实际来源与展示范围核对。

与 Git HEAD `1f8d2fa96c73102e6c337bd2dc5f18ac6637be7f` 对照，其84个条目中的18项共27条原有样例均保留，题面、raw、答案、媒体及字段存在性差异均为0；当前工作树相对该提交新增122条样例。此前59项扩充阶段的25项 / 36条，是阶段快照，不应再作为当前覆盖数字。

2026-10-08的覆盖快照与源文件SHA位于 `artifacts/2026-10-08-all-cases-coverage.json`；本次原始数据修正的逐项记录位于 `artifacts/2026-10-09-raw-data-adoption.json`。后者包含真实字段、来源版本、哈希及删节范围。临时采集证据仍位于Git忽略的 `artifacts/candidates/`，不进入站点公开数据；没有虚构额外provenance字段。

最终类型检查、内容生成、内容校验、自动测试与页面验证结果见 [UPDATE_LOG](../../UPDATE_LOG.md)。用户要求的本地审核服务运行于 `http://127.0.0.1:5173/`；未进行生产构建或发布。本次原始数据展示修正不代表全部151项均有案例，原有12项缺口仍保留。
