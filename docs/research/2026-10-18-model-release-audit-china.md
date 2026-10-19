# 2026-10-18 中国大模型发布审计：第一方来源笔记

核查窗口：北京时间 2026-10-04 至 2026-10-18（含首尾）。本篇负责 DeepSeek、Qwen/阿里、ByteDance Seed/豆包、Z.ai/GLM、MiniMax、Moonshot/Kimi、StepFun、百度、腾讯混元、Xiaomi MiMo、华为、蚂蚁/百灵、讯飞、商汤，并以跨厂商中英文宽搜索补漏。这里记录官方来源可支持的候选与查找边界；不对最终正式收录作结论，也不声称穷尽全网。

## 日期内候选

| 候选 | 发布方 | 日期及事件类别 | 第一方日期证据 |
|---|---|---|---|
| DeepSeek-V4.1-Flash-1017 | DeepSeek | 2026-10-17，模型更新 / 新版本基准表 | [DeepSeek API 更新日志](https://api-docs.deepseek.com/updates/)在 `Date: 2026-10-17` 下列出 `DeepSeek-V4.1-Flash-1017 Update`；[官方 HF 模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/blob/main/README.md)称其为 minor update，并附完整比较表。官方 README 与更新页原文保存在 `artifacts/research/2026-10-18-model-release-audit/china/`。表格不是外链图片，属 Markdown/HTML 表。用户提供截图另保存为 `deepseek-1017-user-supplied-table.png` 并已人工查看；它只能证明用户附件内容，不能称为官方图。 |
| Hy-Memory-30B-A3B（Hy-Memory 2.0） | 腾讯混元 | 2026-10-16，专用长期记忆写入模型与开源发布 | [混元发布页](https://memory.hunyuan.tencent.com/)页眉标注 `2026.10.16`；[腾讯混元 GitHub README](https://github.com/Tencent-Hunyuan/Hy-Memory/blob/main/README.zh.md)记 2026-10 发布；[HF 模型卡](https://huggingface.co/tencent/Hy-Memory-30B-A3B)称其为约 3B 激活的长期记忆写入模型。它偏垂直用途，是否属于本次主任务的模型类别由主任务决定。完整网页 HTML 保存在 `hy-memory-2.0.html`；发布页 5 张区域图已由主任务实际截图并查看，见下文。 |
| GLM-Legal | Z.ai / 智谱 | 2026-10-12，法律垂直大模型 | [Z.ai 官方文章](https://z.ai/blog/glm-legal)标题及文章元数据标记 2026-10-12；官方页面脚本和 benchmark 图已保存为 `glm-legal-page.js`、`glm-legal-img-1.png`，图像已人工视觉查看。 |
| Step 5 Preview | StepFun | 2026-10-15 候选：Preview 模型权重公开；模型本身 9 月已发布 | [官方新闻](https://www.stepfun.com/news/step-5-preview)明确发布日期为 2026-09-20，并称权重将在 10 月 15 日释放；[HF commit history](https://huggingface.co/stepfun-ai/Step-5-Preview/commits/main)显示 README 在 Oct 15 更新，但也显示模型文件于 Sep 20 有上传记录。因此 10/15 开放事件及其确切可访问性存在证据歧义，只作权重发布候选，不说它是 10 月首次发布的新模型。模型卡关联的[官方 benchmark PNG](https://cdn-uploads.huggingface.co/production/uploads/65dc9de42a6348b052a3286e/mfY2eltwq9TlXWlK6lx7K.png)已下载并视觉查看；文件名为 `step-5-preview-benchmark.png`。StepFun 更完整的模型评测页 [step-5-preview](https://www.stepfun.com/step-5-preview)多次抓取超时，整页所有 benchmark 项未能完整核验。 |

DeepSeek 1017 表内名称依次为 HLE（w/o tools，†/星号指 text-only）、Terminal-Bench 4.0（Claude Code harness）、DeepSWE v1.1（Mini-SWE-V2 harness）、ProgramBench、NL2Repo-Bench、Automation-Bench v1.0.6、Agents' Last Exam、Apex Bench v1.1、Chartography（w/tools）、BabyVision（w/tools）、ZeroBench-main（w/tools；Pass@5）。对照本地 ID 的候选为 `hle`、`terminal-bench-4`、`deep-swe-v1-1`、`programbench`、`nl2repo-bench`、`automationbench`、`agents-last-exam`、`chartography`、`babyvision`、`zerobench-main`。`Apex Bench v1.1`不映射到 `apex-agents-1-1`：已有 [DeepSeek 覆盖核查笔记](2026-10-17-deepseek-flash-1017-coverage.md)说明无一方来源证明二者等价。主任务另保存并视觉检查两张官方原生 PNG：`../global/deepseek-v4.1_261017_benchmark_table_en.png`与`../global/deepseek-v4.1_261017_perf_cost_en.png`。后图标题为 DeepSWE v1.1 Pass@1 vs. cost per task，Harness 为 `mini_swe_v2`；底注说明 public DeepSWE v1.1 leaderboard、`mini-swe-agent` harness、数据日期 2026-09-22。该 PNG 独立登记于 China manifest，路径指向 global 目录；不与用户提供的截图混同。

GLM-Legal 官方评测图 `glm-legal-img-1.png`包含 Harvey's Legal Agent Benchmark（Harvey LAB；全通过口径，文章称覆盖 24 个执业领域，19.2；文中称由 Vals 独立评测）、LegalBench（文章称表现持平，也称 Vals 独立评测）及 PLawBench（法律咨询、案例分析、文书起草细粒度评分）。图内对照模型包括 GLM-Legal、GLM-5.3-Flash、Kimi K3、Claude Fable 5、GPT-6 Astra。图上的数值分别为 Harvey LAB 19.2/6.7/12.9/11.3/5.4，LegalBench 86.2/83.9/86.2/88.6/87.1，PLawBench 77.3/73.8/76.2/77.7/69.1。只有 Harvey LAB 可暂候选映射本地 `harvey-lab`；LegalBench 与 PLawBench 暂不作目录映射。

Step HF PNG 上有 8 个图块：DeepSWE v1.1、StepCodeBench、ProgramBench、Terminal-Bench v4、Agents' Last Exam (ALE-CLI)、GDPval-AA v2.1、FrontierFinance、DRACO。图中 Step 5 配置为 High；官方 README 说明 DeepSWE 使用 SWE-agent harness，temperature=1.0、top_p=0.95；GDPval-AA v2.1 使用 Artificial Analysis 截至 2026-09-20 的最新结果。其他设置未披露。相应候选 ID：`deep-swe-v1-1`、`programbench`、`agents-last-exam`、`gdpval-aa-v2-1`；StepCodeBench、FrontierFinance、DRACO 当前本地目录未找到同名条目。

## 其他官方页面中检查到的评测名称

Hy-Memory 混元发布页展示框架评测与模型评测。框架部分称四个 benchmark：LoCoMo、MemoryArena、CodeMemoryBench、SWE-ContextBench。MemoryArena 拆成 Group Travel Planner SPS（270 题）与 Bundled Shopping PS（149 题），发布页将二者分数取均值；代码记忆项目还列 CodeMemoryBench QA/solve 与 SWE-ContextBench solve。官方 Coding 区域截图脚注把 `SWE-ContextBench`限定为 Lite Related 子集，并注明 CodeMemoryBench 的 QA/Code 共用同份记忆。Hy-Memory-30B-A3B 模型矩阵则展示 LoCoMo、LongMemEval、PersonaMem v2、Travel、Shopping、CMB 六列，在四套记忆框架（Hy-Memory、Mem0、MemOS、EverMemOS）上比较；页面注明前 3 套训练可见、EverMemOS 留出，六指标等权均分。页面没有展开 CMB 的全称。以上这些名称在本地 benchmark JSON 中未搜索到同名 ID；不按近名猜测映射。发布页工作、Coding、Chat、模型矩阵、内部应用 5 张页面区域截图已由主任务实际截图并逐张视觉查看，保存在 china 目录下 `hy-memory-framework-working.png`、`hy-memory-framework-coding.png`、`hy-memory-framework-chat.png`、`hy-memory-model-matrix.png`、`hy-memory-internal-applications.png`。它们是网页区域截图，不是官方提供的原生 PNG；页面完整 HTML 仍保留为原始来源材料。

该发布页还带有业务专项结果：腾讯自选股 A 股投研记忆评测（脚注称底层模型是 DeepSeek V4 Flash，而非 Hy-Memory-30B-A3B）；iWiki CTX 记忆插件 251 问题对比；腾讯新闻长期偏好理解评测（10 位用户、41 个复杂对话案例）。这些均为页面展示的应用/框架结果，不能归作该新模型的公开通用能力分数。

## 已排除或日期外页面

| 厂商 / 名称 | 官方页面与已核实信息 | 边界 |
|---|---|---|
| Qwen / 阿里 | [Qwen 官方博客目录](https://qwen.ai/blog)（旧目录 [qwenlm.github.io/blog](https://qwenlm.github.io/blog/)会导向新站）与[官方 GitHub 组织](https://github.com/QwenLM)；可见 Qwen-Image-2.1 仓库最后更新 2026-09-30，Qwen3.8 型号为更早版本。 | 此轮无 10/04–10/18 模型发布确证；新博客渲染及索引覆盖不完整，不能据此说没有发布。 |
| ByteDance Seed / 豆包 | [Seed Research](https://seed.bytedance.com/en/research/)可见 Seed2.0 Model Card 2026-05-29；官网可见其他旧发布。 | 未见窗口内通用/推理/代码/视觉理解模型；未覆盖所有豆包 API rollout。 |
| Z.ai / GLM | [GLM-5.3](https://z.ai/blog/glm-5.3)日期为 2026-08-14。 | GLM-Legal 已作为 10-12 窗口内法律垂直模型候选单列；未证实窗口内通用类 GLM 新版。 |
| MiniMax | [M3 官方博客](https://www.minimax.io/blog/minimax-m3)日期 2026-06-01；官方新闻/研究目录列出的 M3、H3 等版本日期均在窗口前。 | 未确认窗口内通用/推理/代码/视觉理解模型；H3 等视频生成不属本子任务。 |
| Moonshot / Kimi | [Kimi K3 官方论坛公告](https://forum.moonshot.ai/t/kimi-k3-is-here-our-most-capable-model/480)日期 2026-07-22。 | 未从已查官方发布页发现窗口内模型新版本；官方公开模型更新页较少。 |
| 百度 ERNIE | [ERNIE 官方博客目录](https://ernie.baidu.com/blog/zh/)最新通用发布可见 ERNIE 5.1（2026-05-09）；[ERNIE-Image](https://ernie.baidu.com/blog/zh/posts/ernie-image/)属于文生图，转交图像生成方向。 | 无窗口内本范围新版本确证。 |
| Xiaomi MiMo | [官方模型更新页](https://mimo.mi.com/docs/zh-CN/updates/model)列 MiMo-V2.6 于 2026-09-22 发布。 | 10 月技术报告不单独构成新模型版本证据。 |
| Huawei Pangu | 检查了[华为云模型能力说明](https://support.huaweicloud.com/intl/en-us/productdesc-pangulm/pangulm_01_0010.html)与[产品目录](https://www.huaweicloud.com/intl/en-us/product/pangu.html)。 | 未见窗口内新版本 benchmark 报告；公开目录稀疏，不是完整发布日志。 |
| Ant Ling / 百灵 | 检查了[百灵官方模型家族说明](https://www.antgroup.com/technology/new-tech-Technology-Antfocuses-Tabcomnent-detail/20241028001)，其中提到 Ling-1T、Ring-1T 等 2025 年发布。 | 页面无窗口内更新信息；本轮无新模型确证，来源边界有限。 |
| iFlytek Spark | 定向检查讯飞官网及智慧教育新闻页，命中材料均为旧版模型/历史回顾。 | 未确认窗口内本范围模型发布；新闻索引覆盖有限。 |
| SenseTime SenseNova | [SenseNova U1.5 技术报告](https://www.sensetime.com/cn/news/sensenova-u1-5-20260917-1850)日期 2026-09-17；官方 10 月新闻中命中的是应用部署类新闻。 | U1.5 时间窗外，没有确认 10 月内新模型。 |
| DeepSeek | 官方新闻目录 [DeepSeek News](https://deepseek.com/en/news/)可见 V4.1-Flash（2026-09-10），另在 API 更新日志单独发现 10-17 update。 | 本轮仅纳入明确 10-17 版本更新，不把旧版本报道计入。 |

## 检索边界与留存材料

除厂商官方目录定向搜索外，使用了这些跨厂商宽搜索线索（结果仅用于发现，时间/身份/发布日均回到一方页面核实）：`2026年10月 大模型 新模型 发布 国产 10月 2026 基准 测评`、`2026 October Chinese AI model release benchmark Qwen Kimi GLM DeepSeek model October 2026`、`2026年10月 模型发布 大模型 benchmark 阶跃 混元 百灵 小米`、`China foundation model release October 2026 benchmark new model October 2026`。命中的二手榜单与汇总文章没有直接作为确认依据。

`artifacts/research/2026-10-18-model-release-audit/china/manifest.json`保存候选结构、逐图名称/版本/条件、可能的本地 benchmark ID 和尚未读出的图表边界。当前可交付材料：DeepSeek 1017 官方 README 与 updates HTML、用户提供 DeepSeek 截图（明确标作附件）、Step 5 Preview 官方 README 和官方 benchmark PNG、腾讯混元官方发布页 HTML 与五张网页区域截图、GLM-Legal 官方页面脚本和评测图。Step 5 官网综合评测页因超时未保存。Step 5 Preview 仍只作权重日期边界候选，不计作本窗口首次模型发布已确认项。
