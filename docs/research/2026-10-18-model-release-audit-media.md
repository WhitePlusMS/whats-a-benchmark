# 2026-10-18 媒体与专项模型发布核查

核查窗口为 2026-10-04 至 2026-10-18（含首尾）。本记录只纳入可从厂商第一方资料核实身份、日期或评测图表的图像、视频、语音/音频、嵌入及专项模型；不代表已穷尽全网。日期以厂商公告、官方发行说明或官方模型生命周期记录为准。图表与原表按其原始评测名称记载，不把内部测试、厂商自报分数或人工偏好榜混称为同一个 benchmark。

## 窗口内确认候选

### Fish Audio Drama 3 — 2026-10-13

官方发布页明确写明“October 13, 2026”及“available today”，并将 Drama 3 标为文本转语音模型。页面发布链接：[Fish Audio Drama 3](https://beta.fish.audio/blog/fish-audio-drama-3/)。本地留存原始页面于 `artifacts/research/2026-10-18-model-release-audit/media/fish-drama3/official-release-page.html`。

页面的评测图是 Artificial Analysis Pronunciation Robustness leaderboard（English）截图/图片，图注说明 Drama 3 Preview 93.2%，Fish Audio S2.1 Pro (Oct 2026) 88.1%。本地原图 `artifacts/research/2026-10-18-model-release-audit/media/fish-drama3/pronunciation-robustness-leaderboard.webp`，source URL 为 `https://public-platform.r2.fish.audio/cdn-cgi/image/width=2048,format=webp/media/blog-images/17de7d5a3c504f4f9933cc129e0c4b99`；已实际用 `view_image` 查看。页面另有 HTML 表格（不是图片）：Names of brands, places and technical terms；Words whose reading depends on context；Shorthand: numbers, dates, units, notation；Exact sequences: codes, paths, emails；Overall。公布 Drama 3 / S2.1 Pro 分别为 95.9/87.3%、95.3/86.1%、93.6/92.7%、86.3/79.4%、93.2/88.1%。发布页称评测独立进行，由人工听众检查英语句子中的难读词；页面未给 benchmark 版本号、样本量或更细实验条件，故不补写。页面 HTML 表原值可在保存的浏览器截图 `artifacts/research/2026-10-18-model-release-audit/media/fish-drama3/pronunciation-category-table.png` 查看。页面另指向 Artificial Analysis leaderboard：[Pronunciation Robustness](https://artificialanalysis.ai/speech-to-speech)。

### Google EmbeddingGemma 2 — 2026-10-06

Google 官方发布文写明 2026-10-06 发布 EmbeddingGemma 2，740M 参数，支持文本、图像、视频、音频及代码的多模态嵌入：[EmbeddingGemma 2](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/)。本地保留原始发布页 `artifacts/research/2026-10-18-model-release-audit/media/google-embeddinggemma2/official-release-page.html`。

发布页列出并配图的评测名称：MTEB Code（Massive Text Embedding Benchmark, Code）；Massive Image Embedding Benchmark Lite（图片图注标注仅支持图像/文本的模型）；Massive Audio Embedding Benchmark / MAEB（图注标注仅支持音频/文本的模型）。三个原图分别保存在 `mteb-code.webp`、`maeb-lite.webp`、`maeb-audio.webp`，原始图 URL 及本地路径见 manifest；已用 `view_image` 实际查看。发布页文字称 MTEB Code 从 68.76 提升到 78.68，但不据折线图推算未标注的其他精确值。页面未提供这些评测的具体版本号、工具条件、样本量或子集定义，留空待主任务追溯评测方资料。

### Google Nano Banana 2.1 — 2026-10-06

Gemini API 官方 release notes 明确列出 2026-10-06 “generally available (GA)”及模型标识 `gemini-nano-banana-2.1`：[Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog?release=09-18-2026)；官方模型页：[Nano Banana 2.1 model](https://ai.google.dev/gemini-api/docs/models/gemini-nano-banana-2.1?hl=en)。本次检查未在发布说明或模型页找到官方 benchmark 成绩图/表；不将能力描述转写成成绩。相关原页存于 `artifacts/research/2026-10-18-model-release-audit/media/google-nano-banana-2-1/official-release-notes.html`。模型页记录的版本最新更新时间只精确到 October 2026，不替代发布说明中的 GA 日期。

DeepMind 的第一方 model card 同样标示 Published 6 October 2026，并另附评测结果：[Nano Banana 2.1 model card](https://deepmind.google/models/model-cards/nano-banana-2-1/)；[官方 PDF](https://storage.googleapis.com/deepmind-media/Model-Cards/Nano-Banana-2-1-Model-Card.pdf)。PDF 已本地保存，评测方法页 (PDF p.4) 和结果页 (p.5) 已栅格化并用 `view_image` 实际检查。结果页有两张表：Capabilities: Text-to-Image，含 Overall Preference、Infographic Design、Infographic Factuality；Capabilities: Editing，含 General Editing、Single-Character Consistency、Multi-Character Consistency、Mask/Ink-Based Editing、Product Consistency、Stylization、Multi-Reference Editing。对照列为 Nano Banana 2.1 Thinking / No Thinking、Gemini 3.1 Flash Image (“Nano Banana 2” Thinking)、Gemini 3 Pro Image (“Nano Banana Pro”)。model card 称 SxS human eval 生成跨 T2I/Editing 的 Elo，另以 single-sided AutoRater 评 factuality；公开范围包括一般/多语言文字生成、知识事实性、工具使用、设计质量、常见编辑、多轮和回归组。未给各单项的具体公开数据集名或版本；不会把内部 capability 标签误说成已公开 benchmark 名称。

### Alibaba Qwen-Image-2.1-Turbo — 2026-10-09

Alibaba Cloud Model Studio 官方模型生命周期表列出 International / Image Generation / `qwen-image-2.1-turbo`，发布日期为 2026-10-09：[official model lifecycle table](https://www.alibabacloud.com/help/en/model-studio/newly-released-models)；[official model info](https://www.alibabacloud.com/help/en/model-studio/qwen-image-2-1-turbo)。本轮检索到的 Qwen-Image-2.1 对比成绩图来自 2026-09-21 原始 2.1 发布博客，不是 Turbo 专属，故不把该图/成绩归给 10 月 9 日的 Turbo，也未找到 Turbo 专属官方 benchmark 图或表。

### GPT-Live-1.1 与 GPT-Live-1.1 Quip — 2026-10-15

OpenAI 的 ChatGPT release notes 记录 2026-10-15 推出两款语音模型；Deployment Safety Hub 的 system card 同日发布，明确 GPT-Live-1.1 是 GPT-Live-1 的后继型号、GPT-Live-1.1 Quip 是 GPT-Live-1 mini 的后继型号：[release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)、[system card](https://deploymentsafety.openai.com/gpt-live-1-1/)、[PDF system card](https://deploymentsafety.openai.com/gpt-live-1-1/gpt-live-1-1.pdf)。PDF 已保存至 `artifacts/research/2026-10-18-model-release-audit/media/openai-gpt-live-1-1/gpt-live-1-1-system-card.pdf`，九页均用 pypdfium2 渲染为 PNG；含表和图的第 4–8 页已逐页用 `view_image` 检查。

System card 内全部两张表和三张图均为 OpenAI 自身的安全/对齐评估，并非外部通用语音能力榜单：Table 1 “Voice-Native Evaluations: Production Prompts”；Table 2 “Voice-Native Evaluations: Synthetic Prompts”；Figure 1 “Conditional failure rates for successful circumvention of environmental restrictions” / chart title “Circumventing Warnings - STOP”；Figure 2 “Blocker-related disclosure failure rates on coding tasks” / chart title “Blocker Deception”；Figure 3 “Broken Search Tool evaluation results”。图 1 与图 2 为较低更好，图 3 为 failure rate；比较对象包含 GPT-Live-1、GPT-Live-1.1、GPT-Live-1 mini、GPT-Live-1.1 Quip，图 3 另含 GPT-5.6 Terra。表格以性/非法行为/心理健康/个人数据/情感依赖/自伤等类别报告。Production prompts 使用用户选择分享的真实语音交互示例且刻意挑选困难案例、未按使用频率加权；Synthetic prompts 为按政策构造的挑战案例。卡片明确指出其不能代表真实流量总体安全表现，两组评估互补，且部分 synthetic 类别对 GPT-Live-1.1 有统计显著回退。PDF 没有标出外部 benchmark 名称或公开 benchmark 版本号；不臆测。

### xAI Grok Voice 3.0 — 2026-10-14

xAI 官方发布页写明 2026-10-14：[Introducing Grok Voice 3.0](https://x.ai/news/grok-voice-3)。发布页 HTML 原文和三个 inline SVG 图表本地留存于 `artifacts/research/2026-10-18-model-release-audit/media/xai-grok-voice-3-page.html` 与同目录 `tau-voice-performance.svg`、`tau-voice-performance-responsive.svg`、`average-cost-per-task.svg`。前两份 SVG 是同一 τ-Voice 性能图的桌面/响应式版本；本地 SVG 不被 `view_image` 支持，故以官方页面在浏览器中的原生渲染和可访问文本逐图核查，未声称用 `view_image` 查看。页面中另有一个 HTML 对照表；官方渲染截图保存为 `artifacts/research/2026-10-18-model-release-audit/media/grok-voice-3/speech-to-speech-table.png`，已实际目视检查。

页面引用的 Artificial Analysis Speech-to-Speech Index 表按其原始名包含：AA Speech-to-Speech Index（Overall）；Big Bench Audio（Speech Reasoning）；Speech Agent Arena Elo（Human Preference）；Task Success Rate（Task Completion）；Full Duplex Bench（Conversational Dynamics）。表列 Grok Voice 3.0、Grok Voice 2.0、GPT-Live-1 (Astra, Medium)、Gemini 3.8 Live (Ext. Thinking, High)，其日期标为 Oct 13, 2026。SVG 图 1 为 τ-Voice score vs. average time to first audio（16 个 speech-to-speech models，Artificial Analysis），Grok Voice 3.0 页面标值 71.6% / 0.81s；图 2 为 Big Bench Audio 每任务平均成本，低成本更好。正文另自报 EVA-Bench 74% accuracy，但不是页面内图表。未见 benchmark 版本号或更多运行条件；保持未知。EVA-Bench 外链为 [EVA](https://servicenow.github.io/eva)。

### Black Forest Labs FLUX 3 Image Klein — 2026-10-15

BFL 官方发布页：[FLUX 3 Image Klein](https://bfl.ai/blog/flux-3-image-klein)，页内声明采用 internal evaluations。发布页已保存到 `artifacts/research/2026-10-18-model-release-audit/media/bfl-flux3-klein/official-release-page.html`。本地四张原始图已分别用 `view_image` 查看，来源 URL 见 manifest。

官方评测图清单： (1) “Elo rating vs generator parameters (billions)”分别展示 text-to-image 与 image editing，属于 BFL 内部评估，图中对比多个厂商模型，不宣称独立榜单；(2) “Step-distilled model runtime”——16-step 配置的每图耗时，按 GPU、任务（text-to-image / editing）和 1024²、2048² 分组；(3) “Base model runtime”——50-step 配置，同类 GPU / 任务 / 分辨率条件；两张 runtime 图单位秒/图，低值更快。(4) “Elo vs median API latency at 1MP”分 text-to-image / editing，注明 Elo 和端到端 API 延迟；厂商说明其自测与第三方的计时边界不同，并注有 Krea Medium/大模型计时例外。发布日期为 BFL 页面发布日 2026-10-15。官方资料未提供可与公开固定 benchmark ID 对应的版本号；Elo 来自内部评估，不能映射成用户榜单排名。

## 窗口外或不是新模型的已核对线索

| 线索 | 第一方证据 | 排除理由 |
|---|---|---|
| Microsoft MAI-Voice-2.1、MAI-Voice-2.1-Flash、MAI-Transcribe-2-Streaming | [Microsoft AI news](https://microsoft.ai/news/our-first-streaming-transcription-model/) | 该篇为 2026-10-01，早于窗口开始日。 |
| Microsoft MAI-Transcribe-2 | [Microsoft AI news](https://microsoft.ai/news/mai-transcribe-2-is-the-fastest-most-accurate-and-cheapest-speech-recognition-model-in-the-world/) | 2026-09-03，窗口外。 |
| Microsoft MAI-Image-2.6 | [launch](https://microsoft.ai/news/mai-image-2-6-launches-at-no-2-on-arena-ahead-of-google-meta-and-xai/)；[quality/cost follow-up](https://microsoft.ai/news/pushing-the-quality-cost-frontier-with-mai-image-2-6/) | 初始公告 2026-08-10，后续评测/更新 2026-09-04，窗口外。 |
| Google Gemini 3.8 Flash TTS / Flash-Lite TTS | [Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog?release=09-18-2026) | 官方 GA 日期为 2026-09-22，窗口外。 |
| Google Gemini 3.5 Transcribe | [DeepMind news](https://deepmind.google/blog/) | DeepMind 官方新闻流显示 2026-08 上线，窗口外。 |
| Gemini Robotics On-Device 2 | [Google DeepMind model card](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/) | 官方 card 标注 Published 2026-07-30。卡片含 Gemini Robotics On-Device 1 vs 2 data-scaling success-rate 图（GRODv2 vs GRODv1；SO101 与 Dexmate；横轴 task hours、纵轴 success rate），但日期不在本次窗口。 |
| Gemini Robotics ER 2 | [Google DeepMind model card](https://deepmind.google/models/model-cards/gemini-robotics-er-2/) | 官方 card 标注 Published 2026-07-30；其模型卡将 Figure 1–4 评测结果和 Figure 5 安全评测指向 7 月 release post，整体窗口外。 |
| Lyria 3.5 | [Google DeepMind model card](https://deepmind.google/models/model-cards/lyria-3-5/) | 官方 card 标注 Published 2026-07-29，窗口外；卡片给出定性评估描述，未展示成绩表/图。 |
| Google Gemini Omni / Veo 3.1 | [Gemini API media models](https://ai.google.dev/gemini-api/docs/models.md) | 当前官方目录有该媒体模型，但此检索未找到窗口内发布证据；不以目录现存代替发布日期。 |
| OpenAI GPT Image 2.5 Flare / Sunburst | [OpenAI launch](https://openai.com/index/introducing-chatgpt-images-2-5/) | 正式公告 2026-09-08，窗口外。 |
| ElevenLabs Instant Soundtracks | [ElevenLabs announcement](https://elevenlabs.io/blog/introducing-instant-soundtracks) | 2026-10-15 是产品/功能公告；未核实为新模型发布，未找到相应模型 benchmark 成绩图。 |
| Runway Gen-4.5、Praxis-1及 Runway 内第三方媒体模型接入 | [Runway News](https://runway.com/news)、[changelog](https://runway.com/changelog) | 官方新闻与更新列表本次显示窗口内项目为产品、整合或 10/2 对第三方模型的接入，不据此判作 Runway 新基座模型；Gen-4.5/Praxis-1 自身发布在窗口前。 |
| Runway Solaris / GWM Worlds 2 | [Runway research](https://runway.com/news/research/towards-instant-video-generation) | 官方页日期 2026-09-10，窗口外。 |
| Stability AI Stable Audio 3.0 | [official launch](https://stability.ai/news-updates/meet-stable-audio-3-the-model-family-built-for-artistic-experimentation-with-open-weight-models) | 模型家族发布日期 2026-05-20；10/16 官方文章是训练数据许可说明，不是新模型公告。 |
| Stability AI Arbor、4Director、SemanTok | [Stability research listing](https://stability.ai/research) | 官方研究流标注 10/07；条目描述为技术附件/方法研究或视频 world-model 控制研究，当前证据不足以认定为该日新发布的专项模型，须逐篇核对文章与论文后再定。 |
| Midjourney V8.2 | [Midjourney announcement](https://updates.midjourney.com/version-8-2/) | 官方发布日期 2026-07-24，窗口外；10/1 Alpha changelog是编辑行为更新，不是新版本模型。 |
| Pika / Cartesia / Step / ByteDance Seed / MiniMax / Kling | 官方产品/公告栏目均纳入本次定向检索 | 本轮有限定向检索中未找到窗口内第一方模型发布页；已知能检索到的 Pika/Cartesia/Step/Seed 历史型号落在窗口前。不能据此称这些厂商该期间没有发布。 |
| Fish Audio Image/Video Generation MCP | [Fish Audio MCP guide](https://beta.fish.audio/blog/image-video-generation-mcp/) | 2026-10-07 是把既有第三方图像/视频/唇形模型连接至 agent 的产品集成指南，不是新媒体模型。 |

## 检索边界

按用户指定厂商，对第一方 news/blog/release notes/model lifecycle/official docs 做了窗口日期查询，并以跨厂商组合查询补入 Google、Alibaba、Runway、Stability、OpenAI、Fish Audio、xAI 等候选。凡官方页面只呈现产品内选择器、页面更新月，或二手目录宣称模型日期，未以此确认发布日期。已实际核查的媒体候选图像与各图可读性状态登记于同目录 manifest；尚未找到页面、被机器人阻挡或页面无评分表图的情况逐项如实记载。本记录没有写正式 benchmark catalog ID；可能相关的名称只作为 description candidate 留给主任务映射。

## 补充核验：Krea、Stability 与跨厂商多模态线索

### 窗口内发布或研究披露

| 候选 | 第一方发布日期与证据 | 发布页中的评测/性能材料与边界 | 本地证据 |
|---|---|---|---|
| Krea 3 | [Krea 官方文章](https://www.krea.ai/blog/introducing-krea-3) 日期为 2026-10-15；正文称当天发布图像编辑模型。 | “How Krea 3 compares”HTML 表：Time per edit 为 Krea 3 <8s / Nano Banana Pro 33s / GPT Image 2 90s；Price per image 为 $0.06 at 2K / $0.135 / $0.22。脚注说后两者为 2026-09-24 至 10-01 Krea 编辑任务从请求到成图的中位时间（含排队），Krea 3 为 2K；价格为无参考图 list price。另一段“Seconds per edit”图/表给 Krea 3 <8s、Nano Banana 2 27s、Nano Banana Pro 33s、GPT Image 2 90s，脚注相同。另有“Monthly cost of 100,000 edits”HTML 表：$6,000 / $13,500 / $22,000。以上是厂商编辑耗时和价格比较，不是固定外部 benchmark。网页中比较表和速度图已用 CUA 实际查看并保存官方页面截图 `krea-3/krea-comparison-table.png`、`krea-3/krea-seconds-per-edit.png`；它们是 HTML/CSS，不是可下载的原始图像，另保存官方文章 HTML，未重绘或伪造图片。 | `krea-3/official-release-page.html` |
| SemanTok | [Stability 官方研究文章](https://stability.ai/research/semantok-predictable-semantic-tokens-for-efficient-autoregressive-video-generation)标注 2026-10-07；文章自述介绍一种 flexible video tokenizer。其链接论文 arXiv v1 页首标注 2026-09-30，因此 10-07 是厂商文章日期，不是论文首发日；这里归为研究披露，不判作商业模型产品发布。 | 文章称 201M SemanTok AR 匹配或超过 3.4 倍规模的 VideoFlexTok AR；文章正文没有 benchmark 成绩图/表。论文 Figure 1 是视频重建定性示例图，不是分数图：uCO3D 篮球 prompt 比较 SemanTok 201M、VideoFlexTok 201M、VideoFlexTok 2.29B，预算 k=1/4/9/17；Kinetics-600 yoga 比较两种 2.29B AR，预算同前。论文方法和其余定量实验未在此补录为发布页图；本次按主任务要求只保存厂商介绍链接所指的关键图。 | `stability-semantok/official-research-page.html`、`stability-semantok/semantok-paper.pdf`、`stability-semantok/teaser-results.png`（已用 `view_image` 检查） |
| Amazon Nova 2.5 Sonic | [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-nova-2.5-Sonic/) 标注 Posted on: Oct 5, 2026，并称为 GA speech-to-speech 模型。 | 公告讲 reasoning、instruction-following、tool-calling 和 latency 改进；在这篇 GA 公告中未找到 benchmark 图/表或量化成绩。 | `aws-nova-2-5-sonic/official-release-page.html` |
| Reka Rho-1 | [Reka 官方文章](https://reka.ai/news/rho-1-collapsing-the-multimodal-stack) 日期 2026-10-05；正文称 research preview、19B omni-reasoning 模型，可处理/生成文本、图像、视频及动作。 | 官方 HTML/CSS 性能时间条比较 multi-agent pipeline first clip 13.8s（明确标为 illustrative）与 Rho-1 7.0s（measured）；分段标注 pipeline route 0.4s、prompt expansion 1.1s、queue 2.3s、generation 9.4s、return 0.6s，Rho-1 plan 0.8s、generate 6.2s。另有 Rho-1 Flash 固定 seed 1234 的 5 次 5.3s clip 编辑耗时 2.01s、1.11s、1.11s、1.11s、1.15s。这些是公司演示/内部时延披露，不是外部 benchmark；页面未找到标准 benchmark 成绩表/图。图形由 HTML/CSS 构成，已保存原文页，并保存浏览器截图 `reka-rho-1/rho-first-clip-latency.png`；已检查图形代码、可访问标签和页面呈现。 | `reka-rho-1/official-release-page.html` |
| Iris-3B | [Sperid Labs 官方 Hugging Face 仓库提交记录](https://huggingface.co/speridlabs/iris-3b/commits/main) 显示 2026-10-05 15:20 初始提交 “Iris-3B 665K SFT release”；arXiv v1 于 10-07 提交。 | 官方模型卡有 Markdown 成绩表（源文已保存）：GenEval、DPG-Bench、LongText-Bench (EN)、OneIG-Bench (EN)，另列 OneIG 的 Alignment / Text / Reasoning / Style / Diversity。统一条件为 1024×1024、官方 scorer、相同 prompts/seeds；Iris base 用默认采样。卡内当前表同时有 10-12 加入的 Iris-3B Turbo 和 community adapter 对照，故这些列不能混作 10-05 同日新模型；版本号均未明示。模型卡成绩源为 Markdown 表，不是官方图表；已从官方 Hugging Face 渲染页保存两张可视截图 `sperid-iris-3b/benchmark-tables.png`、`sperid-iris-3b/benchmark-submetrics.png`，覆盖主表及 OneIG 子指标表，均实际目视检查，未重绘。 | `sperid-iris-3b/official-model-card.md` |
| Voxtral Mini 4B Realtime Arabic | [Mistral 官方 Hugging Face 模型卡](https://huggingface.co/mistralai/Voxtral-Mini-4B-Realtime-Arabic)；[HF 第一方 model metadata API](https://huggingface.co/api/models/mistralai/Voxtral-Mini-4B-Realtime-Arabic) 的 `createdAt` 为 2026-10-08 11:36:06Z。该模型为 Voxtral-Mini-4B-Realtime-2602 的阿拉伯语微调。 | 模型卡原始 Markdown嵌入三张图，均下载并用 `view_image` 检查：① “Average performances by delay” CER 对配置延迟 80/160/320/480/720ms；Voxtral realtime 为 10.64/9.76/9.17/8.82/8.80%；对照固定线 Voxtral Transcribe Arabic、MAI-Transcribe 2、Scribe v2、Muse、Gemini 3.8 Flash、Cohere Transcribe Arabic。② “Benchmark performances”列七项及七基准平均：ISMA、Darija in the Wild、MGB-2、SADA、Casablanca、FLEURS、MASC clean；图列 Voxtral Transcribe Arabic、Realtime Arabic、MAI-Transcribe 2、ElevenLabs Scribe v2、Meta Muse Transcribe、Gemini 3.8 Flash、Cohere Transcribe Arabic。Realtime 480ms/temperature 0 的平均 CER 8.82%；公开图中各 benchmark 的具体 CER 逐图见原文件。③ “ISMA and Darija in the Wild Benchmark composition”分别展示 357 / 109 clips 的领域/场景构成。模型卡说明 lower CER is better、MTNRA 共同开发的阿语归一化方案（含方言拼写、clitic、借词、口语数字），并注明 Gemini safety filter 阻挡部分 FLEURS 样本。图中未标各外部 benchmark 的版本号。 | `mistral-voxtral-arabic/official-model-card.md`、三张官方图 `avg-evals-by-delay.png`、`benchmark-scores.png`、`benchmark-composition.png`，另保存 `model-metadata.json`、`commit-history.html`。 |

SemanTok 论文定量实验中还有更多结果图表；由于该项是 10-07 Stability 研究文章而论文 v1 早在 9-30，且任务后续明确要求收“厂商介绍页图”，此处不把论文全套实验扩张成窗口内商业模型发布成绩。若后续要收研究结果全量图，应另按论文实验章节完整逐图审查。

### 额外窗口排除

| 线索 | 第一方发布日期/模型身份 | 处理 |
|---|---|---|
| MAI-Voice-2.1、MAI-Transcribe-2.1 / Streaming | [Microsoft AI](https://microsoft.ai/news/our-first-streaming-transcription-model/) | 公告 2026-10-01，早于窗口起始日；Model Center 当前导航出现不能代替窗口发布证据。 |
| MAI-Image-2.6 | [Microsoft AI](https://microsoft.ai/news/mai-image-2-6-launches-at-no-2-on-arena-ahead-of-google-meta-and-xai/) | 发布为 2026-08-10，后续质量/成本文 2026-09-04，窗口外。 |
| Sperid Iris-3B Turbo | [官方仓库提交历史](https://huggingface.co/speridlabs/iris-3b/commits/main) | 这是 Iris-3B 的独立 4-step distilled variant；仓库 2026-10-12 才加入权重，虽然当前模型卡包含其对比成绩，不把 Turbo 的发布日期回填为 10-05。 |

本轮对新增候选的日期、来源页与全部已识别的官方性能图/表均加入同目录 `manifest.json`。HTML/CSS 图表和 Markdown 表按原内容保存并标注为非独立图片；不存在的benchmark图如实列为未找到。
