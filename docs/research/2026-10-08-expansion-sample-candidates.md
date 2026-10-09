# 2026-10-08 扩充条目的真实样例候选与许可核验

本报告只研究可接入的原题、固定来源和数据权利。生产 `content/benchmarks/*.json`、品牌、样例与生成目录均未改动。候选保存在 [public-sample-records.json](../../artifacts/candidates/2026-10-08-public-sample-records.json)，9 条、7 个评测 ID，状态全部为 `awaiting-parent-adoption`。母 PRBench 不重复复制领域子集样例。

“有官网”“能读榜单”“公开原题”“允许本站转载”分别核验。以下“可读”表示本次取得第一方正文、字段或固定文件内容，不表示已在浏览器运行远程应用、验收交互或重新执行评测。未采集、下载或嵌入未确认权利的媒体；不执行 SVG 或代码。

## 已保存的九条固定记录

| 本站目标 ID | 原始 ID / split / 零起始行号 | 数据许可与不可变依据 | 源论文边界 | 展示映射 |
| --- | --- | --- | --- | --- |
| matharena-arxivmath | 3 / train / 2 | CC-BY-SA-4.0；[固定数据卡](https://huggingface.co/datasets/MathArena/arxivmath-0626/raw/dca0d771ab20c1b8e8c50d0921bf693f7bfe663d/README.md)；[固定数据](https://huggingface.co/datasets/MathArena/arxivmath-0626/resolve/dca0d771ab20c1b8e8c50d0921bf693f7bfe663d/data/train-00000-of-00001.parquet) | [CC-BY-4.0 来源](https://arxiv.org/abs/2606.02855v1) | problem → prompt；answer → 最终数值 |
| matharena-arxivlean | 1 / train / 0 | CC-BY-SA-4.0；[固定数据卡](https://huggingface.co/datasets/MathArena/arxivlean-0626/raw/1ced46a1d45d57c6de242d51c0baf574b96022ea/README.md)；[固定数据](https://huggingface.co/datasets/MathArena/arxivlean-0626/resolve/1ced46a1d45d57c6de242d51c0baf574b96022ea/data/train-00000-of-00001.parquet) | [CC-BY-4.0 来源](https://arxiv.org/abs/2606.00316v1) | problem → prompt；formal_statement → 正式目标；省略答案 |
| matharena-brokenarxiv | 15 / train / 14 | CC-BY-SA-4.0；[固定数据卡](https://huggingface.co/datasets/MathArena/brokenarxiv-0626/raw/73dd424784fbdeab599557fcba3d77559c89d1ee/README.md)；[固定数据](https://huggingface.co/datasets/MathArena/brokenarxiv-0626/resolve/73dd424784fbdeab599557fcba3d77559c89d1ee/data/train-00000-of-00001.parquet) | [CC0-1.0 来源](https://arxiv.org/abs/2606.10817v1) | problem → 假命题；original_problem 只在 raw 标原始命题 |
| prbench-finance | 643796de687003869b5de46a / finance / 1 | CC-BY-4.0；[固定数据卡](https://huggingface.co/datasets/ScaleAI/PRBench/raw/01947c6ef913df518e6e52626a7b29f132b12d4f/README.md)；[固定数据](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/finance-00000-of-00001.parquet) | 不复制外部参考文章 | prompt_0 → prompt；rubric → raw；无标准答案 |
| prbench-finance | cc44401239817f46b56b4835 / finance / 3 | CC-BY-4.0；[固定数据卡](https://huggingface.co/datasets/ScaleAI/PRBench/raw/01947c6ef913df518e6e52626a7b29f132b12d4f/README.md)；[固定数据](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/finance-00000-of-00001.parquet) | 不复制外部参考文章 | prompt_0 → prompt；rubric → raw；无标准答案 |
| simpleqa-verified | 5 / eval / 0 | MIT；[固定数据卡](https://huggingface.co/datasets/google/simpleqa-verified/raw/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/README.md)；[固定数据](https://huggingface.co/datasets/google/simpleqa-verified/resolve/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/simpleqa_verified.csv) | 不复制外部参考文章 | problem → prompt；answer → answer；其余 CSV 字段 → raw |
| simpleqa-verified | 8 / eval / 1 | MIT；[固定数据卡](https://huggingface.co/datasets/google/simpleqa-verified/raw/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/README.md)；[固定数据](https://huggingface.co/datasets/google/simpleqa-verified/resolve/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/simpleqa_verified.csv) | 不复制外部参考文章 | problem → prompt；answer → answer；其余 CSV 字段 → raw |
| prbench-legal | 88707440664b79c6b4448135 / legal / 67 | CC-BY-4.0；[固定数据卡](https://huggingface.co/datasets/ScaleAI/PRBench/raw/01947c6ef913df518e6e52626a7b29f132b12d4f/README.md)；[固定数据](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/legal-00000-of-00001.parquet) | 不复制外部参考文章 | prompt_0 → prompt；rubric → raw；无标准答案 |
| livebench | 0daa7ca38beec4441b9d5c04d0b98912322926f0a3ac28a5097889d4ed83506f / test / 100 | Apache-2.0；[固定数据级 DATASHEET](https://raw.githubusercontent.com/LiveBench/LiveBench/24364d65076429adfcba7be18af4d44fddc43dce/docs/DATASHEET.md)；[固定数据](https://huggingface.co/datasets/livebench/reasoning/resolve/6fc6498a5dfba553f69f4413feabade1f1a2d384/data/test-00000-of-00001.parquet) | 软件生成 web_of_lies_v2，无第三方文章/考试内容 | turns[0] → prompt；ground_truth → answer；原记录 → raw |

MathArena 数据卡明确提供 `problem_idx` 和原题字段，三份 June 2026 数据的实际 split 均名为 `train`；不能为了展示改叫 test。已筛选出处许可相容的题目：ArXivMath 3 来源论文 2606.02855v1 为 CC BY 4.0，ArXivLean 1 来源 2606.00316v1 为 CC BY 4.0，BrokenArXiv 15 来源 2606.10817v1 为 CC0。来源、作者和标题原文保留；样例材料仍按 MathArena 的 CC BY-SA 4.0 处理，不复制论文正文或图片。[MathArena 数据声明](https://huggingface.co/datasets/MathArena/arxivmath-0626)、[论文 2606.02855v1](https://arxiv.org/abs/2606.02855v1)、[论文 2606.00316v1](https://arxiv.org/abs/2606.00316v1)、[论文 2606.10817v1](https://arxiv.org/abs/2606.10817v1)。

ArXivLean 数据卡的 `answer` 是为加载器兼容而重复的形式化 statement，内容含 `sorry`。它不是完成证明。本候选建议 `type=code`，展示正式目标及原记录，顶层 `answer` 省略。BrokenArXiv 的 `original_problem` 也不是反例证明，不能包装成标准解答。[固定 ArXivLean 数据卡](https://huggingface.co/datasets/MathArena/arxivlean-0626/raw/1ced46a1d45d57c6de242d51c0baf574b96022ea/README.md)、[BrokenArXiv 数据卡](https://huggingface.co/datasets/MathArena/brokenarxiv-0626)。

PRBench 选中的三条均为单轮记录，已逐行检查 `reference_texts_0` 到 `reference_texts_9` 全空。保存专家原题与完整 rubric 的字段投影，去掉 scratchpad、模型响应和空 follow-up；不把 rubric 宣称为唯一正确回答。法律题 `88707440664b79c6b4448135` 对应法律子集，金融两题对应金融子集，不给母 suite 复制一遍。[固定 PRBench 数据卡](https://huggingface.co/datasets/ScaleAI/PRBench/raw/01947c6ef913df518e6e52626a7b29f132b12d4f/README.md)。

SimpleQA Verified 的稳定 ID 是 CSV 中的 `original_index`，真实 split 是 `eval`。本次两条的 prompt、answer 和 raw 从固定 CSV 原样提取，未重写、翻译或清理其 URL 字符串；`urls` 只保存来源字符串，没有下载引用文章或图片。数据卡声明 MIT，正式采用时还应保留许可和作者署名；本轮未重新审计每个事实答案。[固定数据卡](https://huggingface.co/datasets/google/simpleqa-verified/raw/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/README.md)。

PRBench 固定 README 的 configs 明确是 config_name=default，data_files 下把 finance、legal、finance_hard、legal_hard 分别声明为 split；dataset_info 也分别统计这些 split。因此这里 finance/legal 是实际 HF split，不是把文件名或 config 当作 split。候选 manifest 已分别增加 datasetConfig、split、sourceFile。SimpleQA Verified 的 datasetConfig=simpleqa_verified、split=eval；MathArena 与 LiveBench 的 config=default。以上来源文件与许可证据的本地副本路径/哈希写入 candidate 的 localSourceFile/localLicenseEvidence，便于主 agent 独立复核。

## 哈希与原文复核

源文件 SHA-256 对下载的固定版本字节计算。原记录哈希对解析后的原记录做 UTF-8 JSON：键排序、`ensure_ascii=false`、逗号/冒号无额外空格、无末尾换行，再计算 SHA-256。CSV 原记录字段保持 CSV 字符串类型；Parquet 原记录采用其已解析类型。另分别保留 prompt 和可用 answer 的 UTF-8 哈希。

| 目标 / 原始 ID | 原记录 SHA-256 |
| --- | --- |
| matharena-arxivmath / 3 | 6060ee86b396c942d6a18e04ed79a22019fd9c3fec2bb338c0741ff5e675804d |
| matharena-arxivlean / 1 | df2bbf2a6438da1901ba51ed183bd3925f0126b5c0bbfcf063ec0d4f1d94b147 |
| matharena-brokenarxiv / 15 | 90a3c64214930f52d96c133fba2729e83fd64480fb12707eecf50ffeb2ae1513 |
| prbench-finance / 643796de687003869b5de46a | ab9c75dafb07c26e3e0d360a8d75bf2595e6bbfbba26d4db01491c316957baa2 |
| prbench-finance / cc44401239817f46b56b4835 | 29d0f250573db81ee59909827881bd0679e8ab6a5ea7f1a9eff043d6dbc00e07 |
| simpleqa-verified / 5 | 35d7f9837b82543f79e345076540d9012375d275760f46f32035c8b199ae5e4c |
| simpleqa-verified / 8 | 2100b6bbb18fe8a93e2ad691678321fea3a1d3dd1e4130960bdb811ac048df92 |
| prbench-legal / 88707440664b79c6b4448135 | 6ff7c1a7ac136e0a9fd80f083e96dd138a6f0032c3e0735907b0e708fa2cbf35 |
| livebench / 0daa7ca38beec4441b9d5c04d0b98912322926f0a3ac28a5097889d4ed83506f | e0641f6afd6228579a9dfd315e8c94b1fc81ab9746cd2c77b7eede9c8e4431c3 |

| 固定数据文件 | 文件 SHA-256 |
| --- | --- |
| [matharena-arxivmath train](https://huggingface.co/datasets/MathArena/arxivmath-0626/resolve/dca0d771ab20c1b8e8c50d0921bf693f7bfe663d/data/train-00000-of-00001.parquet) | 67e038c57192b6c2aaf5131d6877ce82684551ae44282c17c3906cef68de7446 |
| [matharena-arxivlean train](https://huggingface.co/datasets/MathArena/arxivlean-0626/resolve/1ced46a1d45d57c6de242d51c0baf574b96022ea/data/train-00000-of-00001.parquet) | 0bc14398faf9fe0f108effbafecdca589793fc0db56fe359c3b7b26b14860c9a |
| [matharena-brokenarxiv train](https://huggingface.co/datasets/MathArena/brokenarxiv-0626/resolve/73dd424784fbdeab599557fcba3d77559c89d1ee/data/train-00000-of-00001.parquet) | bcda4822752b3e469a76aac29a6b00fbe17379e45a5ff482f412ce979435a899 |
| [prbench-finance finance](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/finance-00000-of-00001.parquet) | 4e3d790d00eefdc9ec7090a2e19459e74c1788921c525b3d14ed0dbf1f155dc0 |
| [simpleqa-verified eval](https://huggingface.co/datasets/google/simpleqa-verified/resolve/0dc97e0d28d8233463e005cdc4475cc2a13ba2dc/simpleqa_verified.csv) | b5db21155444763543fe31b67e7cf28ce2bb225742a5b889421c5f182e2f92f5 |
| [prbench-legal legal](https://huggingface.co/datasets/ScaleAI/PRBench/resolve/01947c6ef913df518e6e52626a7b29f132b12d4f/data/legal-00000-of-00001.parquet) | 3d80ca175eaf5072880f33fd28e74a610ab99cc74e6c5b173d89312365a7c67f |
| [livebench reasoning/test](https://huggingface.co/datasets/livebench/reasoning/resolve/6fc6498a5dfba553f69f4413feabade1f1a2d384/data/test-00000-of-00001.parquet) | 4204bb94c812690ef8ba5f4c1f10b5b1082ca0b7bc532166834f798aa56e2a3c |

复核实际通过：9 条记录的原记录哈希、prompt/answer 哈希、每个 raw 投影字段与固定文件一致；每项最多 2 条；三条 PRBench 无第三方 referenceTexts；未把 `sorry` 目标当作完成证明。候选文件尚未按生产 `sampleSet` 结构发布，未运行内容生成、构建、开发服务或评测。

## 写作、设计、视觉、语言十七项

| ID | 实际原题 / 结果入口及本轮读取事实 | 固定版本与权利状态 | 本轮处置 |
| --- | --- | --- | --- |
| creative-writing-v3 | [固定原始 prompt JSON](https://github.com/EQ-bench/creative-writing-bench/blob/c7c3ceef54c40a8ae02dc1c2e1a5e40970fe5c0b/data/creative_writing_prompts_v3.json) 能取得 32 个原题键，字段含 category/title/writing_prompt/seed_modifiers；官网榜单本身不是这个原题文件。 | commit c7c3ceef54c40a8ae02dc1c2e1a5e40970fe5c0b；本轮固定文件与根 README 未确认覆盖这些任务的明确数据级再发布许可，常见 LICENSE 路径未取得。 | 只给准确原题入口，不把模型生成故事当原题，不保存转载候选。 |
| longform-writing | [固定真实 prompt JSON](https://raw.githubusercontent.com/EQ-bench/longform-writing-bench/34f60a028c3f973c19cde98dc5a9e8f9875a87e3/data/longform_creative_writing_prompts_minimalist.json) 已取得 12 个 prompt；key 1 是 Gods Wore Sneakers，字段 category/title/writing_prompt。 | commit 34f60a028c3f973c19cde98dc5a9e8f9875a87e3；[固定 README](https://github.com/EQ-bench/longform-writing-bench/blob/34f60a028c3f973c19cde98dc5a9e8f9875a87e3/README.md) 总体写 MIT，但本轮未找到完整许可通知或明确单独的数据适用范围。 | 作者的真实输入与结果分开；原题入口可改善，数据许可范围/通知缺口保留，暂不保存故事或 prompt 本地候选。 |
| eq-bench-4 | [官方仓库](https://github.com/EQ-bench/eqbench4) 含 persona 与场景；对话 transcript 是模拟结果，不是固定原题答案。 | commit 93dcb7f5d430433ad49d501e672a98bcff2c9678；[LICENSE](https://github.com/EQ-bench/eqbench4/blob/93dcb7f5d430433ad49d501e672a98bcff2c9678/LICENSE) 是 BSD-3-Clause 加 Commons Clause；未单独确认 persona/data 再发布范围。 | 留官方入口和许可差异，不能按 MIT 自动转载。 |
| short-story | [作者 prompts_wc](https://github.com/lechmazur/writing/tree/c8d5b3524af3bfe897a20a8ae51a81df54fdd6d2/prompts_wc) 为输入，stories_wc 为生成结果，二者不能混用。 | commit c8d5b3524af3bfe897a20a8ae51a81df54fdd6d2；根页面与 LICENSE 未找到明确数据授权；固定目录工具抓取受限，完整 prompt 条目未采录。 | 只推荐作者原题目录，未保存结果故事。 |
| tonebench | [官方方法](https://benchmark.towardsai.com/methodology.html) 能读 10 项任务概述，但完整 brief/research/reference 与精确 rubric 并非本页公开原题包。 | 未找到原题数据许可或不可变 release；真实视频资料与作者 reference 的权利需独立确认。 | 不能把方法页标为“完整原题 Viewer”，也不引用频道剧本作本站题目。 |
| tubelab | [官方 scriptwriting 页](https://tubelab.net/benchmark/scriptwriting) 有 12 项任务概述、生成脚本 breakdown 入口；它不是有数据许可的固定题集下载。 | 未找到统一数据许可和固定原题 release；原视频 transcript 与生成结果不等同原创题面授权。 | 保留在线任务/结果入口，未复制原片或生成脚本。 |
| nc-bench | [官方真实场景](https://www.nc-bench.com/tests/text-replacement/scenarios/character-rename-generic) 可读改名任务和成绩；[tests 目录](https://www.nc-bench.com/tests) 可导航场景。 | 未确认场景数据许可、独立固定 release 或完整原始文件。 | 改善为真实场景入口，而非只有 about；不以 IBM 同名数据许可替代。 |
| design-arena | [前端榜](https://www.designarena.ai/leaderboard/code) 是人类偏好和任务分类；[官方方法](https://www.designarena.ai/about) 解释对战，不是固定原题 Viewer。 | 原题、投票、代码及渲染成果的统一再授权未确认；未找到可引用完整固定 prompt 数据 release。 | 只链接在线平台，不复制参与者内容或渲染媒体。 |
| openvibeeval | [首页](https://openvibeeval.com/) 是 prompt/run 预览目录；[FAQ](https://openvibeeval.com/faq/) 明示结果 sandbox 可查看，刻意没有源码 Viewer。 | 未确认 prompt 与结果的再发布许可、不可变完整 release。 | 不把可运行预览视为可复制源码/截图；不保存网页媒体。 |
| svgbench | [榜单](https://svgbench.ai/leaderboard) 是真人偏好排名；首页为匿名 SVG 对比，不是获授权 prompt/SVG 数据包。 | 未确认题面或输出 SVG 的再发布许可证、固定版本和记录 ID。 | 只导航官方 Arena/榜单，未执行、嵌入或复制 SVG。 |
| rapidata-svg | [HF Viewer](https://huggingface.co/datasets/Rapidata/svg-benchmark) 实际可读 prompt、svg1/svg2、模型、渲染图和人工反馈字段。 | dataset SHA f5c382c80029a2b8f9a58ab0056515471cbb4599；[固定数据卡](https://huggingface.co/datasets/Rapidata/svg-benchmark/raw/f5c382c80029a2b8f9a58ab0056515471cbb4599/README.md) 声明 CC BY 4.0。题面与模型输出/媒体应分别标清；尚未从该固定 Parquet 提取并哈希特定行。 | 可作为下一批候选；本轮未下载渲染媒体或执行/热链 SVG，不能仅按可变 Viewer 行号声称已固定记录。 |
| roboflow-vision-evals | [OCR 任务页](https://playground.roboflow.com/evals/ocr) 可读任务和分项成绩；[总榜](https://playground.roboflow.com/evals) 是六任务聚合，未取得统一下载的原图/标准转录文件。 | 原图、标准答案和每个媒体来源许可未确认；不套用 Roboflow COCO/RF100 的许可。 | 保留任务入口，未知媒体权利不下载。 |
| rws-mgate | [论文 v1 §7](https://arxiv.org/html/2608.03803v1) 指定 m-gate.ai 提供非 live 示例，live 测试项保密；[官方活榜入口](https://m-gate.ai/) 本轮抓取未返回内容。 | 未采录该站当前原题 ID/原文，也未确认公开示例再发布许可；论文存档许可不能代替数据许可。 | 抓取失败不判定链接失效；只给论文指认的入口，不能报当前 Viewer 已核验。 |
| arena-vision | [Vision 子榜](https://arena.ai/leaderboard/vision) 实际是专项排名，不是固定图像题目数据集。 | [Arena FAQ](https://arena.ai/faq) 只声明部分匿名数据公开；不能将历史文本快照许可外推到当前图像或对话。 | 只改善平台入口；不从排名页面造图像原题。 |
| arena-webdev | [WebDev 子榜](https://arena.ai/leaderboard/code/webdev) 是生成应用偏好排名，不能等同可下载固定任务/源码。 | 特定任务、应用代码、截图、投票数据及版本许可未确认。 | 不复制应用代码或渲染素材；保留实时子榜。 |
| arena-creative-writing | [Creative Writing 子榜](https://arena.ai/leaderboard/text/creative-writing) 是文本类别切片。 | 当前类别的完整固定提示、对话与适用快照许可未核实；历史平台许可不能无条件外推。 | 不与 EQ 固定 prompt 数据混用，不造额外原题。 |
| aa-multilingual-index | [Global-MMLU-Lite Viewer](https://huggingface.co/datasets/CohereLabs/Global-MMLU-Lite) 真正含题干、选项和标准字母答案；v3 zh/test 已读取 astronomy/test/58。 | 上游 SHA 36c2fd756f19ccf13a9a96c8e53ccecc02192b8b，Apache-2.0；但 [AA 方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking) 未锁定其现榜等于这一上游 SHA。 | 仅列官方上游 Viewer，不把 v3 行包装成 AA 当前题目；未给该指数本地样例。 |

实际页面复核还发现内容资料应另行更正：Longform 官方榜单写明 v1.11（2026-02-19），并使用 Sonnet 4.6；旧 README 与前一轮条目中的未标版本/Sonnet 4 不宜继续代表现榜。本研究只报告证据，不改生产字段。[官网更新段](https://eqbench.com/creative_writing_longform.html)。

## 编程相关补查

| 项目 | 第一方数据与真实记录 | 数据级权利及固定范围 | 缺口/下一步 |
| --- | --- | --- | --- |
| ProgramBench | [官方 HF ProgramBench-Tests](https://huggingface.co/datasets/programbench/ProgramBench-Tests) 有 200 个 task 文件夹；本次 Viewer 实际显示 SplitsNotFoundError，文件目录仍可访问。 | SHA de0ddfb637590c7ecb54fa0b5301f6dc7dfbcee5；[固定数据卡](https://huggingface.co/datasets/programbench/ProgramBench-Tests/raw/de0ddfb637590c7ecb54fa0b5301f6dc7dfbcee5/README.md) 明确生成测试可能衍生上游测试，逐任务 ATTRIBUTION/LICENSE 优先，非 blanket MIT。 | 已读 task ajeetdsouza__zoxide.67ca1bc 的 [固定 ATTRIBUTION](https://huggingface.co/datasets/programbench/ProgramBench-Tests/resolve/de0ddfb637590c7ecb54fa0b5301f6dc7dfbcee5/ajeetdsouza__zoxide.67ca1bc/ATTRIBUTION.md)，指向上游 commit 67ca1bc9592854dd4957b8b02f16292638475659、MIT。这是测试材料，不是完整题面/二进制授权；本轮未下载 8.2GB 或伪装测试成原题。 |
| SWE-rebench V2 | [官方 Viewer](https://huggingface.co/datasets/nebius/SWE-rebench-V2) 有 instance_id、problem_statement、patch、repo/base_commit、license。读到 elastic__synthetics-316（MIT）的记录入口。 | SHA 10483de0f50fe5da545942705a76c6150171af7f；[固定 LICENSE](https://huggingface.co/datasets/nebius/SWE-rebench-V2/raw/10483de0f50fe5da545942705a76c6150171af7f/LICENSE) 本轮实际读取为 CC BY 4.0；数据卡要求尊重每个上游 repo 的许可。 | 尚未从固定 429MB Parquet 提取并哈希该行、核对上游 base_commit 许可全文；未保存可采用候选，不把单一数据许可替代项目代码权利。 |
| Code Migration | [官方页](https://www.vals.ai/benchmarks/code-migration) 可读方法、proprietary 标签、30 个 CLI repo/120 项迁移说明。 | 没找到可再发布固定任务包、标准输出或数据级许可。 | 方法页是定义/榜单，不能标成已验证原题 Viewer；不复制上游程序。 |
| Vibe Code Bench v1.1 | [官方页](https://www.vals-ai.com/benchmarks/vibe-code) 给出 Zeeter 的 [真实 specification](https://gist.github.com/lgnashold/e9bba36be5e468d8f8a2f330ae8d6aea) 和 [evaluation rubric](https://gist.github.com/lgnashold/cccd841aea07974e94f87a5ff83996ea)；二者正文已读。 | Gist 有 revision，但本轮未找到覆盖完整 specification/rubric 的数据再发布许可。论文许可不替代它们。 | 可改善为真正原题/评分材料外链，未复制 Gist 或生成 App。 |

ProgramBench 的代码仓库固定至 27f02157c785f8da3647aa6dbbe6b9137f99f10e（v1.2.5）；这只能固定 harness。任务目录中每份 ATTRIBUTION 的源 repo/commit/license 才是该测试材料的实际权利依据。[官方使用指南](https://github.com/facebookresearch/ProgramBench/blob/27f02157c785f8da3647aa6dbbe6b9137f99f10e/docs/README.md)。

## 未采用记录与执行边界

初选 ArXivMath/train/5 的原论文 2606.03799 是 arXiv 非独占分发授权；ArXivLean/train/4 的原论文 2606.01519 为 CC BY-NC-SA 4.0；BrokenArXiv/train/2 来源 2606.02968 是 arXiv 非独占分发授权。它们没有进入候选文件，已换为前述许可相容记录。不能只依 MathArena 总卡 CC BY-SA 就忽略来源权利。[2606.03799 许可入口](https://arxiv.org/abs/2606.03799)、[2606.01519 许可入口](https://arxiv.org/abs/2606.01519)、[2606.02968 许可入口](https://arxiv.org/abs/2606.02968)。

本轮 GitHub API 触发 rate limit、git 网络 TLS 连接失败，不作为文件/页面失效证据。已通过第一方网页嵌入 currentOid 取得仓库 SHA，并通过固定 raw URL 验证可读内容；HF SHA 来自其第一方 dataset API，固定文件下载成功后计算字节哈希。部分浏览工具无法抓取 fixed tree/raw 页面时，使用 PowerShell HTTP 直接读取同一第一方固定 URL，没有请求用户登录或绕过访问控制。

采用阶段应继续沿用现有 SampleViewer/schema，不新增样例组件。先选择这 9 条记录及其合法字段，保留对应署名和许可文件，再由主 agent 写生产 sampleSet、运行内容管道和浏览器验收。本报告没有把候选数量当作已公开展示数量，也没有报告图标或真实 UI 已补齐。


## LiveBench 合成逻辑专项补查

HF reasoning 卡没有 license 元数据；不能从不存在的字段推断许可。固定官方 DATASHEET 的 Dataset Distribution 明确说明数据按 Apache License 2.0 分发，Collection Process 明确 Web of Lies V2 和 House Traversal 用软件生成。因而这里只选一条 web_of_lies_v2 逻辑记录，没有采集 Guardian、考试、论文或 IMDb 内容。[固定 DATASHEET](https://github.com/LiveBench/LiveBench/blob/24364d65076429adfcba7be18af4d44fddc43dce/docs/DATASHEET.md)、[HF reasoning Viewer](https://huggingface.co/datasets/livebench/reasoning)。

选定 question_id 为 0daa7ca38beec4441b9d5c04d0b98912322926f0a3ac28a5097889d4ed83506f，test split 第 100 行，原字段 livebench_release_date=2024-06-24。它是当前可取公开文件内的旧 release 示例，不能称为当前私有榜单完整题集的记录。原 raw 中 Parquet timestamp 转成 ISO 8601 字符串，规范化方式已写入候选哈希定义；prompt 和 ground_truth 原文未改。[固定 HF 卡](https://huggingface.co/datasets/livebench/reasoning/raw/6fc6498a5dfba553f69f4413feabade1f1a2d384/README.md)。
