# 无站内样例评测：可再发布真实样例候选核查

核查日期：2026-09-23。研究开始时，`E:\项目demo\benchmark show\content\benchmarks` 有 84 个 benchmark，其中 **71 个没有 `sampleSet`**。本轮已从 5 个 A 类项目的官方固定版本各接入一条真实记录；当前共有 18 个 benchmark、27 条站内样例，剩余 **66 个没有 `sampleSet`**。

本报告判断“是否能从官方公开发布中选一条真实记录，在本网站公开展示”。公开可下载、能在第三方镜像看到、代码带许可证，都不能单独证明数据可复制。A 类仅包含发布者明确把数据/样例置于可再发布许可下、并有公开官方访问路径的项目；若一条记录包含第三方媒体、API 回答、个人数据等，须从样例字段中剔除或重新核验。本轮没有下载任何 gated 数据；A 类正式样例来自官方固定版本，本文本身不重复刊载题目。

## A. 已从官方固定版本接入一条

| Benchmark | 官方数据入口 / 已有公开样例 | 数据许可 | 建议展示一条记录 | 归属和边界 |
|---|---|---|---|---|
| GeneBench-Pro | [官方 HF 数据卡与 Viewer](https://huggingface.co/datasets/openai/genebench-pro-public-package/viewer)：官方明确称这是面向公开发布的自包含案例包，`release` split 有 10 个案例，并提供 `eval_id`、公开标题、`eval_config` 与文件清单。 | [官方数据卡](https://huggingface.co/datasets/openai/genebench-pro-public-package) 标注 MIT，卡片明确描述整个 public case-study package intended for public distribution。 | 只从 `release` split 选一个案例；将 `eval_id`、标题、`split=release`、该案例的官方记录路径/修订号作为身份。可展示官方公开任务字段及其公开答案，但不要把这个公开案例说成隐藏测试题。 | 标注 OpenAI GeneBench-Pro Public Case Studies；保留 MIT notice/许可链接；注明这是 public case-study/reproducibility release，ground truth 已公开。[卡片](https://huggingface.co/datasets/openai/genebench-pro-public-package/blob/main/README.md) |
| MCP-Atlas | [官方 HF 数据卡及 Viewer](https://huggingface.co/datasets/ScaleAI/MCP-Atlas)：官方公开 release 为 500 条任务，`train` split；字段包括 `TASK` 稳定 ID、`PROMPT`、工具集合、claims 和 trajectory。 | [官方数据卡许可与 Dataset card](https://huggingface.co/datasets/ScaleAI/MCP-Atlas) 明确 CC BY 4.0；不是由 harness 代码许可推断。 | 用 `TASK` 作稳定 ID，记录 `split=train`、数据集修订号；展示 `PROMPT` 和经权利筛选的工具名即可。**不要复制 `TRAJECTORY` 中外部 MCP/API 返回文本、网页摘录或媒体**；若要显示这些字段，须按其实际上游来源另核权利。 | 署名 Scale AI / MCP-Atlas，附 CC BY 4.0 和原数据链接，说明是否删减字段。[官方数据结构与用途](https://huggingface.co/datasets/ScaleAI/MCP-Atlas#dataset-summary) |
| MMMLU | [OpenAI 官方 HF 数据集和 Viewer](https://huggingface.co/datasets/openai/MMMLU)：公开 `test` split，按 15 种语言子集组织，Viewer 可按 subject 浏览。 | [官方数据卡](https://huggingface.co/datasets/openai/MMMLU) 标注 MIT。 | 用 `config/subset + split=test + 官方 revision + viewer row index` 定位一条；因页面没有公开稳定 record ID，另保存规范化行的 SHA-256，不能只依赖随 Viewer 排序变化的序号。 | 署名 OpenAI MMMLU，并引原始 MMLU 作者/论文；在样例旁链接 MIT 数据卡和 [原始 MMLU 论文](https://arxiv.org/abs/2009.03300)。注明该条来自公开测试集，展示会增加 benchmark 暴露/污染风险，不可称为未泄漏样例。 |
| MRCR（OpenAI 公开集） | [OpenAI 官方 HF 数据卡和 Viewer](https://huggingface.co/datasets/openai/mrcr)：公开 `train` split，约 2.4k 行，字段含 `prompt`、`answer`、`date_added` 等。 | [官方数据卡](https://huggingface.co/datasets/openai/mrcr) 标注 MIT；这是数据集自身标签，不是从代码 LICENSE 推断。 | 用 pinned dataset revision + `split=train` + row index/行哈希定位，附 `date_added`；只展示一条官方记录，并按 MIT 保留许可说明。 | 署名 OpenAI MRCR；按卡片提示引用 [Michelangelo 论文](https://arxiv.org/abs/2409.12640)。记录其公开来源及数据版本，不把该数据集与 DeepMind MRCR v2 混称。 |
| MRCR v2（DeepMind） | [DeepMind 官方 MRCR v2 目录](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)；[官方 README](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/README.md) 说明公开开放原始任务，数据通过 `download.sh` 按 needle 数与上下文长度选择。 | [该数据子目录 LICENSE](https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/LICENSE) 明确 Apache-2.0，直接覆盖 MRCR v2 子目录材料。 | 从公开 CSV 选条，使用 pinned commit + 官方 CSV 文件名 + 行号/行哈希作为身份；声明实际文件、needle 数、context-length 档。不要以重新生成的记录冒充原始 release 行。 | 署名 Google DeepMind MRCR v2；附 Apache-2.0、官方 README，并按官方要求引用 [Michelangelo 论文](https://arxiv.org/abs/2409.12640v2)。 |

### 样例记录统一格式

```json
{
  "benchmarkId": "官方 benchmark id",
  "recordId": "官方稳定 id；若没有则用版本 + split + 行哈希",
  "split": "官方 split / 配置 / 文件档",
  "raw": "仅写入许可覆盖且已确认无第三方限制的字段",
  "sourceUrl": "第一方数据卡或发布文件中的该记录入口",
  "sourceRevision": "官方不可变 commit / dataset revision",
  "license": "适用于数据本身的许可证名称及版本",
  "attribution": "发布方、作者及需保留的上游归属",
  "retrievedAt": "实际下载日期",
  "excerpt": "若有删节，标注删节；不要改写成官方原文"
}
```

高风险公开测试集（MMMLU、MRCR、MRCR v2）即使许可允许公开展示，也会增加题目在网页抓取、索引和未来训练语料中的暴露。若网站不需要展示答案，优先只展示许可覆盖的题面字段、隐藏答案并保留公开测试集说明；若官方条款明确要求不得进入训练语料，则不应发布其题面。本报告所列五个 A 类官方发布未发现针对建议展示字段的“不得在线展示/不得进训练语料”条款，但展示行为仍会扩大公开传播。

## B. 用户下载后仍需逐条核验

以下项目有公开或部分公开官方访问入口，但许可范围、上游素材权利、登录申请条款、数据卫生要求或稳定记录身份仍有一项未闭环。表内许可证链接优先指向数据卡/数据文件说明；如果链接指向仓库 LICENSE，则它只说明当前已核范围，**不能**作为题面/图片/对话均可复制的凭证。按统一格式记录候选；`recordId` 使用官方 ID，缺 ID 时使用 pinned revision、官方 split/文件名及行哈希。每条发布时署名发布者，附实际数据许可证和修改说明，并保留上游作者/原始来源归属。任何 user-provided download 均需将许可文件、数据卡、申请/点击接受的条款与本地文件版本一起核验；“我能下载”不等于“我能公开再分发”。

| ID / Benchmark | 官方数据访问 | 许可/权利核验入口 | 当前仍需核验 |
|---|---|---|---|
| `aider-polyglot` Aider Polyglot | [public](https://github.com/Aider-AI/polyglot-benchmark) | [来源](https://github.com/Aider-AI/polyglot-benchmark#L148-L187) | 题目源自 Exercism，需按涉及的语言仓库和具体文件核对许可与署名条件。Aider harness 的软件许可不代表 Exercism 练习内容的许可。 |
| `aime-2024` AIME 2024 | [unknown](https://maa.org/maa-invitational-competitions/) | [来源](https://maa.org/wp-content/uploads/2026/08/2026-27-AIME-Policies.pdf#page=3) | MAA 现行规则对竞赛窗口内题目传播设有限制；窗口结束不等同于取得公开网站转载授权。 |
| `aime-2025` AIME 2025 | [unknown](https://maa.org/maa-invitational-competitions/) | [来源](https://maa.org/wp-content/uploads/2026/08/2026-27-AIME-Policies.pdf#page=3) | 现行规则中的考试期传播限制不构成考试结束后的普遍转载授权。 |
| `alignbench` AlignBench | [public](https://github.com/THUDM/AlignBench) | [来源](https://github.com/THUDM/AlignBench#L148-L164)<br>[来源](https://arxiv.org/abs/2311.18743#L3-L6) | 仓库可访问及论文可下载不等于数据集再发布授权；evidences 中的外部网页摘录也有各自权利。 |
| `arc-agi-3` ARC-AGI-3 | [partial](https://arcprize.org/arc-agi/3) | [来源](https://github.com/arcprize/ARC-AGI-3-Agents#license)<br>[来源](https://arcprize.org/arc-agi/3#links) | 可按代码许可证复用评测工具；游戏任务数据、画面和媒体仅作官方链接与概述。 |
| `arena-hard-v2` Arena-Hard v2.0 | [public](https://github.com/lmarena/arena-hard-auto/blob/main/data/arena-hard-v2.0/question.jsonl) | [来源](https://github.com/lmarena/arena-hard-auto/blob/main/LICENSE)<br>[来源](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto) | 复用代码和明确由发布者授权的内容时遵循 Apache-2.0，并保留 attribution。 |
| `arena` Chatbot Arena | [partial](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k) | [来源](https://huggingface.co/datasets/lmsys/chatbot_arena_conversations)<br>[来源](https://huggingface.co/datasets/lmarena-ai/arena-human-preference-55k) | 只按指定数据快照各自声明的许可证处理记录；不将某一快照许可外推至平台全部对话。 |
| `babyvision` BabyVision | [partial](https://huggingface.co/collections/UnipatAI/babyvision) | [来源](https://github.com/UniPat-AI/BabyVision) | 代码、数据、图片、标注与评测结果的权利范围尚不明确；不得将研究用途说明等同于内容可转载授权。 |
| `browsecomp-zh` BrowseComp-ZH | [public](https://github.com/PALIN2018/BrowseComp-ZH) | [来源](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E8%AE%B8%E5%8F%AF%E5%8D%8F%E8%AE%AE)<br>[来源](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE) | 只作学术评测并遵守 README 的数据使用条件；题目及答案不面向商业再分发。 |
| `ceval` C-Eval | [public](https://huggingface.co/datasets/ceval/ceval-exam) | [来源](https://github.com/hkust-nlp/ceval#licenses)<br>[来源](https://huggingface.co/datasets/ceval/ceval-exam) | 许可冲突厘清前只链接和描述数据，不在候选中转载题干、选项、答案或解析。 |
| `chartography` Chartography | [public](https://huggingface.co/datasets/surgeai/chartography) | [来源](https://huggingface.co/datasets/surgeai/chartography)<br>[来源](https://github.com/surge-ai/chartography) | 仅对确认由数据集发布者授权的文字记录依 CC BY 4.0 署名复用；图像先核对 source_url 和上游权利。 |
| `charxiv` CharXiv | [public](https://huggingface.co/datasets/princeton-nlp/CharXiv) | [来源](https://github.com/princeton-nlp/CharXiv#license)<br>[来源](https://huggingface.co/datasets/princeton-nlp/CharXiv) | 按对应许可证分别处理代码和问答文本；图表图像仅在核对其原始来源授权后复用。 |
| `cmmlu` CMMLU | [public](https://github.com/haonan-li/CMMLU) | [来源](https://github.com/haonan-li/CMMLU)<br>[来源](https://huggingface.co/datasets/haonan-li/cmmlu) | 在数据许可冲突解决前，限于概述和官方链接，不复制题面、选项、答案或解析。 |
| `finance-agent` Finance Agent | [partial](https://www.vals.ai/benchmarks/fabv2) | [来源](https://github.com/vals-ai/finance-agent-v2/blob/main/LICENSE)<br>[来源](https://www.vals.ai/benchmarks/fabv2) | 仅在许可状态明确前链接公开样例和代码；不得将 MIT 代码许可外推到题目及 reference materials。 |
| `gdpval-aa-v2-1` GDPval-AA v2.1 | [partial](https://huggingface.co/datasets/openai/gdpval) | [来源](https://huggingface.co/datasets/openai/gdpval)<br>[来源](https://github.com/ArtificialAnalysis/Stirrup) | 许可未明确前只概述与链接，不转载 prompt、rubric、reference files、gold deliverables、媒体或 AA 模型提交。 |
| `gdpval-aa` GDPval-AA | [public](https://huggingface.co/datasets/openai/gdpval) | [来源](https://huggingface.co/datasets/openai/gdpval)<br>[来源](https://artificialanalysis.ai/data-api/docs) | 公开下载不等于允许整体转载。任务、参考文件、交付物及其中的第三方材料须分别核对权利。 |
| `gdpval` GDPval | [partial](https://huggingface.co/datasets/openai/gdpval) | [来源](https://huggingface.co/datasets/openai/gdpval) | 不能仅凭公开下载推定任务、附件、图像、参考答案和第三方素材均可整体复制。 |
| `ifbench` IFBench | [public](https://huggingface.co/datasets/allenai/IFBench_test) | [来源](https://github.com/allenai/IFBench/blob/main/README.md) | 许可按官方仓库声明适用于相应代码和数据；数据中的第三方模型生成输出还受各自独立条款约束。 |
| `lifescibench` LifeSciBench | [partial](https://openai.com/index/introducing-life-sci-bench/) | [来源](https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf) | 可阅读论文不代表取得复制 benchmark 任务、附件、rubric 或第三方材料的许可。 |
| `livecodebench` LiveCodeBench | [public](https://huggingface.co/datasets/livecodebench/code_generation_lite) | [来源](https://github.com/LiveCodeBench/LiveCodeBench/blob/main/LICENSE)<br>[来源](https://huggingface.co/datasets/livecodebench/code_generation_lite) | 代码许可不自动覆盖来自 LeetCode、AtCoder、Codeforces 等站点的题面、样例和测试。 |
| `longbench-v2` LongBench v2 | [public](https://huggingface.co/datasets/THUDM/LongBench-v2) | [来源](https://huggingface.co/datasets/THUDM/LongBench-v2)<br>[来源](https://github.com/THUDM/LongBench/blob/main/LICENSE) | 发布标签不证明书籍、文档和代码仓库等上下文材料的原始权利均已清理；本轮未逐条追溯。 |
| `longbench` LongBench | [public](https://huggingface.co/datasets/THUDM/LongBench) | [来源](https://github.com/THUDM/LongBench/tree/main/LongBench)<br>[来源](https://github.com/THUDM/LongBench/blob/main/LICENSE) | 21 项任务复用多种数据集、长文、新闻、政府文件、Wikipedia 和代码来源；逐项再发布权利未清。 |
| `math-500` MATH-500 | [public](https://huggingface.co/datasets/HuggingFaceH4/MATH-500) | [来源](https://github.com/openai/prm800k/blob/main/LICENSE)<br>[来源](https://github.com/hendrycks/math/blob/main/LICENSE) | 仓库中的 MIT 文件不能在未核验具体覆盖范围和题目来源权利链时自动作为派生题库再发布授权。 |
| `mathvista` MathVista | [public](https://huggingface.co/datasets/AI4Math/MathVista) | [来源](https://github.com/lupantech/MathVista) | 须逐 pid 追踪 metadata.source 与 source.json，核对原始媒体/题目的许可、署名和再发布条件；作者还禁止将数据用于训练。 |
| `mmlu` MMLU | [public](https://github.com/hendrycks/test) | [来源](https://github.com/hendrycks/test/blob/master/LICENSE)<br>[来源](https://github.com/hendrycks/test) | 仓库级许可及论文引用信息未逐题厘清各学科材料的上游权利，不能据代码许可推定所有题目均可重新发布。 |
| `mmmu-pro` MMMU-Pro | [public](https://huggingface.co/datasets/MMMU/MMMU_Pro) | [来源](https://huggingface.co/datasets/MMMU/MMMU_Pro)<br>[来源](https://github.com/MMMU-Benchmark/MMMU#disclaimers) | 数据卡许可按其声明记录；代码许可仅适用于仓库中受 LICENSE 覆盖的代码。作者要求遵守题目和图片原始来源的版权与许可。 |
| `mmmu` MMMU | [public](https://github.com/MMMU-Benchmark/MMMU#news) | [来源](https://huggingface.co/datasets/MMMU/MMMU)<br>[来源](https://github.com/MMMU-Benchmark/MMMU#disclaimers) | 数据卡许可按其声明记录；代码许可仅适用于仓库中受 LICENSE 覆盖的代码。作者要求遵守题目和图片原始来源的版权与许可。 |
| `nl2repo-bench` NL2Repo-Bench | [public](https://github.com/multimodal-art-projection/NL2RepoBench) | [来源](https://github.com/multimodal-art-projection/NL2RepoBench)<br>[来源](https://github.com/multimodal-art-projection/NL2RepoBench/issues/18) | 取得作者明确许可前仅链接官方来源并使用自写概述，不复制题目、测试、环境镜像或媒体。 |
| `omnidocbench` OmniDocBench | [public](https://github.com/opendatalab/OmniDocBench) | [来源](https://github.com/opendatalab/OmniDocBench/blob/main/LICENSE)<br>[来源](https://huggingface.co/datasets/opendatalab/OmniDocBench) | Apache-2.0 仅按仓库 LICENSE 用于受其覆盖的代码/文件；PDF、图片和标注的统一再发布许可未确认。 |
| `openai-internal-coding` OpenAI 前端偏好评测 | partial | [来源](https://openai.com/index/gpt-5-6/) | 可链接并引用发布页披露的比较摘要；精选作品示例不属于偏好评测数据集。 |
| `osworld` OSWorld | [partial](https://github.com/xlang-ai/OSWorld/tree/main/evaluation_examples/examples) | [来源](https://github.com/xlang-ai/OSWorld/blob/main/LICENSE)<br>[来源](https://os-world.github.io/) | 仓库许可证不自动覆盖受版权限制的 Windows 任务或任务涉及的第三方应用、网站及用户材料。 |
| `paperbench` PaperBench | [partial](https://github.com/openai/frontier-evals/tree/main/project/paperbench) | [来源](https://github.com/openai/frontier-evals/blob/main/project/paperbench/README.md)<br>[来源](https://github.com/openai/frontier-evals) | 仓库代码许可信息不能自动延伸到 benchmark 文件及第三方论文/数据。本站候选不复制原始题目、图像或 rubric。 |
| `ruler` RULER | [public](https://github.com/NVIDIA/RULER) | [来源](https://github.com/NVIDIA/RULER/blob/main/LICENSE)<br>[来源](https://github.com/NVIDIA/RULER) | Apache-2.0 按仓库 LICENSE 覆盖的代码/文件适用；旧 pipeline 的背景文本和 QA 数据沿用各自来源条款。 |
| `screenspot-pro` ScreenSpot-Pro | [public](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro) | [来源](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro/blob/main/README.md)<br>[来源](https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding/blob/main/LICENSE) | MIT 声明按发布仓库/数据集元数据记录；未发现覆盖逐张截图、软件界面或图标的权利清单。 |
| `simpleqa` SimpleQA | [partial](https://openaipublic.blob.core.windows.net/simple-evals/simple_qa_test_set.csv) | [来源](https://github.com/openai/simple-evals/blob/main/README.md)<br>[来源](https://github.com/openai/simple-evals/blob/main/LICENSE) | 仓库 LICENSE 适用于相应代码；README 的 benchmark 许可声明单独记录，不将代码许可自动延伸到外部 CSV 文件。 |
| `skillsbench` SkillsBench | [public](https://github.com/benchflow-ai/skillsbench/releases/tag/v1.1) | [来源](https://github.com/benchflow-ai/skillsbench)<br>[来源](https://www.skillsbench.ai/) | Apache-2.0 仅按许可证对其覆盖的仓库材料适用；不从仓库级标识推断独立上游素材许可。 |
| `swe-bench-multilingual` SWE-bench Multilingual | [public](https://www.swebench.com/multilingual.html) | [来源](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual)<br>[来源](https://www.swebench.com/multilingual.html) | 这些声明分别记录数据集元数据与项目代码；没有逐实例确定其是否覆盖上游 issue、PR、patch 和测试内容。 |
| `swe-bench-pro` SWE-bench Pro | [public](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro) | [来源](https://github.com/scaleapi/SWE-bench_Pro-os/blob/main/LICENSE)<br>[来源](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro#license) | MIT 按仓库 LICENSE 适用于其覆盖的软件/文档；上游 issue、源码快照、patch 与测试须遵守各来源条款。 |
| `swe-bench-verified` SWE-bench Verified | [public](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) | [来源](https://github.com/SWE-bench/SWE-bench/blob/main/LICENSE)<br>[来源](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) | MIT 仅按仓库 LICENSE 用于相应软件代码；issue、PR、patch、测试和人工标注分别保留来源权利。 |
| `swe-bench` SWE-bench | [public](https://github.com/SWE-bench/SWE-bench) | [来源](https://github.com/SWE-bench/SWE-bench/blob/main/LICENSE)<br>[来源](https://huggingface.co/datasets/princeton-nlp/SWE-bench) | MIT 按 LICENSE 适用于相应软件代码；issue 文本、上游 patch、测试与代码快照须遵守其各自来源条款。 |
| `tau2-bench` τ²-bench | [public](https://github.com/sierra-research/tau2-bench#readme) | [来源](https://arxiv.org/html/2506.07982v1)<br>[来源](https://github.com/sierra-research/tau2-bench/blob/main/LICENSE) | 两项许可分别适用于论文和受软件许可证覆盖的代码；未见单独覆盖任务 JSON、政策或数据库的许可。 |
| `toolathlon-verified` Toolathlon-Verified | [partial](https://github.com/hkust-nlp/Toolathlon) | [来源](https://github.com/hkust-nlp/Toolathlon/blob/main/README.md)<br>[来源](https://huggingface.co/datasets/hkust-nlp/Toolathlon-Verified_Trajectories) | 在取得逐项内容许可或官方明确授权前，仅链接和使用自写概述，不复制原始任务及评测素材。 |
| `vending-bench-2` Vending-Bench 2 | [unknown](https://andonlabs.com/evals/vending-bench-2) | [来源](https://andonlabs.com/evals/vending-bench-2)<br>[来源](https://andonlabs.com/evals/vending-bench-arena) | 只链接官方页面并撰写原创摘要；不复制完整提示、运行数据、排行榜或图像。 |
| `wandr` WANDR | [public](https://github.com/perplexityai/wandr) | [来源](https://github.com/perplexityai/wandr)<br>[来源](https://arxiv.org/abs/2608.14747) | Apache-2.0 按 LICENSE 适用于受其覆盖的代码/文件；WANDR 自有结构数据与第三方证据材料分别处理。 |
### B 类记录格式与候选控制

对每条 B 类候选，先由用户提供下载文件、来源 URL、下载日期及许可页面快照；逐条确认记录所属 split 和发布版本、是否需要申请/接受协议、许可是否覆盖数据行而非只覆盖代码、是否含第三方图片/网页/源代码/模型输出/医疗或个人信息、以及是否有不进入训练语料或不得在线展示的要求。无法验证字段权利时只保留原创说明和官方链接，不将该条转成 `sampleSet`。

建议样例只保存权利明确的必要字段，并加 `officialRecordId`、`datasetRevision`、`split`、文件内行号/哈希、`licenseUrl`、`attribution`、`sourceUrl`、`retrievedAt`、`fieldsIncluded`、`fieldsOmitted`。图片/音视频优先链接官方 Viewer，不热链或下载到站点；直接展示前确认许可明确覆盖复制和公开展示。若官方许可允许商业再分发，还要继续核查记录自身的第三方来源和隐私条款。

## C. 禁止 / 目前不建议复制

“C”表示本次网站样例不应从该数据集中复制；有些是明确禁止在线分享/重新分发，有些是 gated/private 且尚未获得适用于公开展示的权限，有些官方要求防止 benchmark 进入训练语料。用户日后即使自行下载，仍需以最新官方条款或书面授权重新评估。仅保留官方来源链接和自写简介。

| ID / Benchmark | 公开复制判断 | 第一方依据 |
|---|---|---|
| `apex-agents` APEX-Agents | 数据卡中的 CC BY 4.0 元数据不覆盖明确的 evaluation-only 限制；代码仓库许可仅适用于实现。 保留 gated 访问边界，不把任务提示、rubric、gold output、metadata 或 world 文件转存为公开样例。 | [官方](https://huggingface.co/datasets/mercor/apex-agents)<br>[官方](https://huggingface.co/datasets/mercor/apex-agents-v1.1) |
| `browsecomp` BrowseComp | MIT 保持加密题目不进入公开网页、训练语料或可被搜索索引的明文语料；只引用官方加密数据与方法入口。 | [官方](https://openaipublic.blob.core.windows.net/simple-evals/browse_comp_test_set.csv)<br>[官方](https://github.com/openai/simple-evals#evals)<br>[官方](https://github.com/openai/simple-evals/blob/main/LICENSE) |
| `cursorbench-4` CursorBench 4.0 | 未发现 benchmark 任务数据许可证；公开页面和结果不构成题目数据再发布授权。 公开页面中的分数不能当作可下载逐题数据。 | [官方](https://cursor.com/cursorbench)<br>[官方](https://cursor.com/blog/cursorbench) |
| `deep-swe-v1-1` DeepSWE v1.1 | 仓库标注 Apache-2.0；PROVENANCE.md 将其范围限定为 DataCurve 原创贡献，上游项目许可各自适用；官网声明 benchmark 数据不得进入训练语料。 不得将 benchmark 数据纳入训练语料。 | [官方](https://github.com/datacurve-ai/deep-swe)<br>[官方](https://github.com/datacurve-ai/deep-swe/blob/main/PROVENANCE.md)<br>[官方](https://deepswe.datacurve.ai/) |
| `frontiercode-1-1-main` FrontierCode 1.1 Main | 没有找到任务数据的公开再分发许可证；公开 benchmark 介绍不授予任务包转载权。 遵守官方的 anti-leak 规则和来源扫描限制。 | [官方](https://cognition.com/frontiercode)<br>[官方](https://cognition.com/blog/frontier-code-1.1) |
| `frontiermath` FrontierMath | 未核实覆盖全部问题与 verifier 的数据集许可证；页面内容许可声明不能自动覆盖题目、解答及嵌入媒体。 官方页面提示 benchmark data 不应进入训练语料；不得用于训练抓取或参数拟合。 | [官方](https://epoch.ai/frontiermath/tiers-1-4/benchmark-problems)<br>[官方](https://epoch.ai/frontiermath/tiers-1-4/about) |
| `gaia` GAIA | 未核实 此次核对的 Hugging Face dataset card 未发现明确的 SPDX/data license 声明，因此题目、答案、元数据及附件的再分发许可为未明确；不能从页面可申请访问推断复制授权。 | [官方](https://huggingface.co/datasets/gaia-benchmark/GAIA) |
| `gpqa` GPQA | 作者 Hugging Face 数据卡标注题目数据为 CC BY 4.0；GitHub MIT 许可适用于仓库代码。 不得在公开网站复制题目或答案；代码许可不能替代题目数据许可或作者的样例披露要求。 | [官方](https://huggingface.co/datasets/Idavidrein/gpqa)<br>[官方](https://github.com/idavidrein/gpqa/blob/main/LICENSE) |
| `gpqa-diamond` GPQA Diamond | Hugging Face 数据卡标注题目数据为 CC BY 4.0；GitHub MIT 许可针对代码。 公开网站不转载题目、选项、答案或截图；其他用途应同时遵守 HF 数据访问条件和 CC BY 4.0。 | [官方](https://huggingface.co/datasets/Idavidrein/gpqa)<br>[官方](https://github.com/idavidrein/gpqa/blob/main/LICENSE) |
| `healthbench` HealthBench | simple-evals README 和 HF 页面标注 MIT；OpenAI 发布页明确提出不在线披露样例。 不在线复制对话、参考答案、rubric、图片或截图；数据集可下载或标 MIT 不取消该请求。 | [官方](https://huggingface.co/datasets/openai/healthbench)<br>[官方](https://github.com/openai/simple-evals#evals) |
| `healthbench-hard` HealthBench Hard | simple-evals README 将 HealthBench 列为 MIT；发布页同时给出在线样例披露请求。 不在线转载 Hard 对话、回答、rubric、图片或可还原题目的截图；MIT 标签不取消该请求。 | [官方](https://github.com/openai/simple-evals/blob/main/healthbench_eval.py)<br>[官方](https://github.com/openai/simple-evals#evals)<br>[官方](https://openai.com/index/healthbench/) |
| `healthbench-professional` HealthBench Professional | OpenAI Hugging Face 数据卡标注 MIT；同一评测论文明确要求不要在线以纯文本或图片展示样例。 不在线转载对话、模型回答、rubric、医生参考回答或截图；此处不对数据隐私或法律授权作独立判断。 | [官方](https://huggingface.co/datasets/openai/healthbench-professional)<br>[官方](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf) |
| `hle` Humanity’s Last Exam | HF 元数据标注 MIT，但数据卡明确禁止公开分享、重新上传或分发数据集；arXiv 论文许可不自动适用于数据、题目、答案或图像。 不转载或镜像题目、答案、rationale、图像或截图；遵循作者关于避免训练语料污染和 canary 过滤的说明。 | [官方](https://huggingface.co/datasets/cais/hle)<br>[官方](https://github.com/centerforaisafety/hle) |
| `livecodebench-pro` LiveCodeBench Pro | HF metadata 标注 Apache-2.0，但题库还包含第三方竞赛题面和测试；工具仓库当前未显示独立 LICENSE。 只作原创概述并链接论文/数据页；不复制竞赛题面、完整样例、提交代码或 hidden tests，逐来源核查权利。 | [官方](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)<br>[官方](https://github.com/GavinZhengOI/LiveCodeBench-Pro) |
| `mind2web` Mind2Web | 作者 README 声明数据集为 CC BY 4.0、代码为 MIT；另对解压后的 test 文件提出不得在线再分发的明确要求。 不托管或嵌入解压后的 test JSON、HTML 或动作轨迹；发布训练记录也需署名并关注网页内容来源。 | [官方](https://github.com/OSU-NLP-Group/Mind2Web)<br>[官方](https://papers.nips.cc/paper_files/paper/2023/file/5950bf290a1570ea401bf98882128160-Paper-Datasets_and_Benchmarks.pdf) |
| `officeqa-pro` OfficeQA Pro | 数据卡将 benchmark dataset 标注 CC BY-SA 4.0；代码和脚本为 Apache-2.0。 Pro 题目与答案受 gated 访问控制；本站不转载题目、答案、源文件或截图。 | [官方](https://github.com/databricks/officeqa#data-access)<br>[官方](https://huggingface.co/datasets/databricks/officeqa#license)<br>[官方](https://github.com/databricks/officeqa) |
| `osworld-2` OSWorld 2.0 | OSWorld-V2 仓库代码标注 Apache-2.0；完整任务和 assets 需 gated 访问。 本站不复制 task instructions、task classes、assets、ground truth、评估器或轨迹。 | [官方](https://huggingface.co/datasets/xlangai/osworld_v2_tasks)<br>[官方](https://github.com/xlang-ai/OSWorld-V2/blob/main/LICENSE)<br>[官方](https://github.com/xlang-ai/OSWorld-V2/releases/tag/v2026.06.24) |
| `terminal-bench-2` Terminal-Bench 2.0 | 仓库标注 Apache-2.0；该标记对 Harbor 任务包和逐项第三方材料的覆盖范围未核实。 官方要求基准数据不得进入训练语料；该防污染要求不等同于通用数据再分发许可。 | [官方](https://github.com/harbor-framework/terminal-bench-2)<br>[官方](https://www.tbench.ai/news/leaderboard-integrity-update) |
| `terminal-bench-2-1` Terminal-Bench 2.1 | GitHub 仓库标注 Apache-2.0；未逐项确认所有 Harbor task、第三方依赖或其他材料的再分发权。 官方 benchmark 材料包含不得进入训练语料的 canary。 | [官方](https://hub.harborframework.com/datasets/terminal-bench/terminal-bench-2-1/latest)<br>[官方](https://github.com/harbor-framework/terminal-bench-2-1)<br>[官方](https://www.tbench.ai/news/terminal-bench-2-1) |
| `terminal-bench-4` Terminal-Bench 4.0 | 仓库代码标注 Apache-2.0；4.0 Harbor 数据包的统一许可和第三方素材权利未逐项确认。 4.0 官方说明要求基准数据不得进入训练语料；该限制不能替代任务包的再分发授权。 | [官方](https://hub.harborframework.com/datasets/terminal-bench/terminal-bench/4)<br>[官方](https://www.tbench.ai/news/terminal-bench-4-0)<br>[官方](https://www.tbench.ai/news/leaderboard-integrity-update) |
| `terminal-bench-science-0-1` Terminal-Bench-Science 0.1 | 仓库标注 Apache-2.0，并要求保留特定 Harbor canary；任务数据权利未逐项核实。 官方要求 benchmark data 不进入训练语料；派生或摘引内容须保留 canary。 | [官方](https://github.com/harbor-framework/terminal-bench-science/releases/tag/v0.1.0)<br>[官方](https://github.com/harbor-framework/terminal-bench-science#canary) |
| `video-mme` Video-MME | 官方数据区限定学术研究、禁止商业用途，并禁止未经事先批准分发、发布、复制、传播或修改数据内容。 视频版权属于各自权利人；复用媒体还须取得官方批准和必要的权利人许可。 | [官方](https://github.com/MME-Benchmarks/Video-MME) |
## 现有官方在线样例 / Viewer

- [GeneBench-Pro public case-study Viewer](https://huggingface.co/datasets/openai/genebench-pro-public-package/viewer)：10 个 `release` 案例，官方许可明确、稳定 `eval_id`。
- [MCP-Atlas Viewer](https://huggingface.co/datasets/ScaleAI/MCP-Atlas/viewer/default/train)：500 条公开任务，`TASK` 为 24 字符 ID；许可证 CC BY 4.0。展示时限于自己创作且许可覆盖的字段，剔除 trajectory 中的上游输出。
- [MMMLU Viewer](https://huggingface.co/datasets/openai/MMMLU)：15 个语言 subset 的公开 `test` split，MIT。
- [OpenAI MRCR Viewer](https://huggingface.co/datasets/openai/mrcr)：公开 `train` split，MIT；当前 Viewer 有行浏览入口。
- [DeepMind MRCR v2 官方数据目录](https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2)：官方 README 指向数据下载脚本与多个配置文件；不是第三方镜像。
- [IFBench 官方数据集合](https://huggingface.co/collections/allenai/ifbench)：已有 test、多轮和训练集 Viewer；它不是 A 类，因为原始公开卡说明数据来自 WildChat held-out prompts，且模型输出数据适用第三方单独条款，须逐字段核对。

以上 Viewer 证明网络上已有官方公开记录/结构化数据；它们不代表其余 benchmark 可从第三方上传页面合法复制。HF/GitHub 等镜像页面只能帮助发现，不代替原作者/发布方的许可。本报告只把官方维护的数据页、官方仓库和官方许可文本作为权利依据。

## 样例导入前的最终门槛

1. 从官方入口获取或由用户提供数据；禁止绕过登录、申请、访问控制、点击协议或 API 限制。保留具体下载 revision、日期和原始许可快照。
2. 确认许可明确允许公开再分发/公开展示，并覆盖具体数据记录和拟展示字段。代码许可证不能代替数据许可；数据卡的汇总标签也不能覆盖第三方素材、图片、音频、视频、用户对话和源代码。
3. 检查数据卫生要求：`no-train`、benchmark contamination/canary、仅评估/学术研究、禁止在线公布、需保密、个人或敏感数据。网站页面、爬虫抓取和搜索索引都可能把样例带入训练语料；若官方禁止训练，不能仅靠页面声明“不可训练”就假设达到要求。
4. 保留稳定官方身份和完整归属：publisher/author、数据集名称与版本、split、原记录 ID、许可版本/链接、修改/删减说明、下载日期、第一方入口；不要声称自有或把自写摘要伪装成官方记录。
5. 只有完成以上核验的单条记录才进入正式 `sampleSet`。B 类数据到手后再逐项复核；许可含糊或与数据卡、仓库、HF metadata 相冲突时保持无站内样例。

## 来源与限制

项目条目中的 `dataAccess`、`reusePolicy` 和 `sources` 用于确定 71 项核验清单及补充第一方入口。本报告只选择 A 类与外部授权边界清楚的真实数据记录；没有因为其他网站已经上传而推定许可。在线查询截至 2026-09-23。动态网页、许可证和数据版本可能变更，正式发布时应保存当日的官方条款快照。本文不是法律意见。
