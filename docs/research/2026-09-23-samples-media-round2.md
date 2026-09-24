# 多媒体 Benchmark 样例来源核查（第二批）

日期：2026-09-23

## 结论

本批确认 1 个可本地展示真实音频的新增 Benchmark 候选：LAION 的 **Small Overlapping Speech Bench**。官方 Hugging Face 数据卡将数据集标为 CC BY 4.0，说明 100 条测试音频由 Multilingual LibriSpeech (MLS) 语音混合生成，并明确沿用 MLS 的 CC BY 4.0。官方 MLS 数据卡也标注 CC BY 4.0。候选文件收录了真实测试记录 `clip_000`、`clip_001` 的逐说话人 transcript、时间区间、音频 URL 和官方文件列表所示体积。

这是待目录收录评估的新条目，不属于现有 74 项 benchmark。页面须展示 benchmark / MLS 署名、CC BY 4.0 许可链接，并说明样例属于公开 test split、会显示参考 transcript。原始记录没有逐条 prompt 字段，因此候选把 `originalPromptField` 标成 `null`；页面任务说明取自官方数据卡的整体任务描述，并明确标记为任务说明，不冒充单条记录字段。

本次没有下载媒体。候选已具备官方明确的许可依据，项目负责人可以按 CC BY 4.0 署名要求决定是否把两段 MP3 加入正式静态资源。

## Small Overlapping Speech Bench

- **官方数据页和文件：**[LAION 官方 Hugging Face 数据集](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)。数据卡列出 test split 与数据格式，并称 100 段音频各含三种欧洲语言的重叠说话人、逐说话人时间戳、语言和 transcript；卡片列出 `clip_000.mp3` 至 `clip_099.mp3`，支持直接查验媒体文件。
- **记录字段：**[官方 README](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)定义 `clip_id`、`duration`、`num_speakers`、`languages`、`speakers[].start_time/end_time/transcript` 和 `audio_file`。官方 [ground_truth.jsonl](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/ground_truth.jsonl) 的前两行给出 `clip_000`、`clip_001` 原始记录。候选保留这些源字段及原文，不翻译 transcript。
- **媒体文件：**[`clip_000.mp3`](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/resolve/main/data/clip_000.mp3) 是 MP3，官方文件目录显示 422 kB；[`clip_001.mp3`](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/resolve/main/data/clip_001.mp3) 是 MP3，官方目录显示 336 kB。目录总计显示 `data/` 为 33.4 MB。候选采用原始 MP3 文件 URL；若后续托管到本站，应保持字节不变，转码或裁剪时标注改动。
- **媒体许可核验：**官方数据卡 front matter 和 Hugging Face metadata 都标注 `cc-by-4.0`，README 的许可说明明确写出 benchmark 依照 MLS 的 CC-BY-4.0 发布。官方 [Meta MLS 数据卡](https://huggingface.co/datasets/facebook/multilingual_librispeech)也标记 CC BY 4.0。根据 [Creative Commons BY 4.0 deed](https://creativecommons.org/licenses/by/4.0/)，该许可允许以任何媒介复制、再分发（包括商业用途）和改编，条件包括适当署名、附许可证链接、注明改动，并不得暗示许可方背书。
- **署名建议：**`Small Overlapping Speech Bench, LAION e.V.（Hugging Face 上传者 Christoph Schuhmann）；音频来源 Multilingual LibriSpeech，Pratap et al., 2020。CC BY 4.0。` 同时链接 benchmark 数据卡、MLS 数据卡和许可文本。官方数据卡要求引用 MLS 论文。
- **样例注意事项：**官方卡片说明底层为有声书朗读素材，随后把三个单人语音片段混音，所以重叠结构是合成的，并非自然对话。参考 transcript 会暴露答案，展示时应明确样例来自公开测试集。

### 可追溯记录

| ID | 时长 | 语言 | 音频 | 官方记录 |
|---|---:|---|---|---|
| `clip_000` | 26.18 秒 | 意大利语、葡萄牙语、法语 | [`clip_000.mp3`（422 kB）](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/resolve/main/data/clip_000.mp3) | [ground_truth.jsonl](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/ground_truth.jsonl) |
| `clip_001` | 20.764 秒 | 葡萄牙语、德语、西班牙语 | [`clip_001.mp3`（336 kB）](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/resolve/main/data/clip_001.mp3) | [ground_truth.jsonl](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/ground_truth.jsonl) |

精确 JSON 字段、transcript、源 ID、时间戳、媒体 URL 和体积记录在 [`samples-media-round2.json`](../../artifacts/candidates/samples-media-round2.json)。

## 仅官方链接或暂缓接入

| Benchmark | 核查结果 |
|---|---|
| Chartography | 数据卡虽标 CC BY 4.0，但其图表可追溯到外部论文、标准和网页。数据集整体许可不能证明各来源图表的转载权；保留官方页面链接，不镜像图片。 |
| Video-MME | [官方仓库](https://github.com/MME-Benchmarks/Video-MME)说明视频版权归各自权利人，未经许可不得传播或复制。只链接官方主页。 |
| HealthBench Professional | [官方说明](https://openai.com/index/healthbench/)要求不要在线公开例题以降低训练泄漏；不复制文本或图像。 |
| Perception Test | [原论文](https://arxiv.org/abs/2305.13786)说明 fine-tuning / validation split 按 CC-BY 提供；但官方仓库的 Apache-2.0 是仓库材料许可，本次没有逐条核实某个 sample 包记录对应的视频、标注与项目页面展示许可，因此不把它当成已确认的媒体转载授权。后续若增加，应先查清具体 split 与素材条款。 |

本批只写候选与来源研究文件，没有修改正式 benchmark JSON、应用源码或下载媒体文件。

## 官方目录元数据补充核验

下列字段已补入候选对象 `benchmarkEntryCandidate`，字段口径按站内 benchmark entry schema 组织；它仍是审核材料，不是正式发布数据。

### 发布方、年份、版本与别名

- **名称：**官方卡片名称为 `Small Overlapping Speech Bench`，未发现其他正式名称或缩写，因此 `aliases` 留空。
- **发布方：**数据集位于 Hugging Face 的 `laion/` 命名空间，页面身份显示 LAION eV；首次数据文件提交的上传账号为 `ChristophSchuhmann`。站内发布方建议写 `LAION e.V.（Hugging Face 数据集由 ChristophSchuhmann 账号发布）`，不把个人上传账号混写成组织名称。
- **首次年份：**官方历史页显示新增数据文件提交日期为 `Jun 5`，但渲染页没有年份；官方数据卡没有单独的 publication date，也未找到该 benchmark 自己的论文。因此现阶段无法用第一方证据填年份，候选的 `year` 保持 `null`。这不是断言其没有年份，而是发布年份尚未核实。
- **版本：**官方数据卡、README、结果页、机器可读指标和已查看的提交记录都没有给出版本编号，站内候选标作“官方未标注版本号”。

### 官方任务、格式和指标

- **任务：**官方卡片将其描述为多语种重叠语音压力测试：模型识别三个同时说话者的语音，并衡量说话人数估计能力。
- **数据格式：**100 条 test 音频，每条由三种不同欧洲语言的语音混合而成；源 utterance 从 MLS 六种语言的 test split 选取。条目携带 speaker 语言、source speaker ID、混音起止秒数及参考 transcript。输出音频规格为 16 kHz、单声道、MP3；官方卡片标注每段约 15–26 秒。
- **主要指标：**官方 `README.md` / `RESULTS.md` 定义内容词召回率。对每位说话者，计算参考内容词（至少 3 个字母）有多少出现在模型 transcript 中；短词排除以减少跨语言共同小词带来的分数。对全部 100 × 3 = 300 个 speaker-sentence 求均值，并报告总体、分语言、每条片段最佳/最差说话者召回，以及 `capt/3`（召回达到 30% 的说话者平均数）。
- **说话人数指标：**能输出说话人数的系统另报告平均预测人数、预测恰好 3 人的比例、与真实人数 3 的 MAE。召回率越高越好；说话人数 MAE 越低越好，因此目录 `metric.direction` 应为 `mixed`。
- **WER：**官方说明明确不采用常规 Word Error Rate，因为三种语言的并发语音不存在有定义的统一词序；这应作为指标说明，不能把 WER 填成主指标。

### 官方写出的局限

官方 `README.md` 的 Limitations & notes 明确列出：来源是有声书朗读而非自然会话，因此 prosody / overlap 是合成的；荷兰语来源池小、出现更少；100 条只适合作为快速、低成本的 stress test；同响度混合没有覆盖真实多人场景的音量差、混响和噪声。候选限制文字对应这四项，没有扩写成来源未陈述的结论。

### 本节来源

- [官方数据卡和仓库历史](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)：名称、组织命名空间、任务标签、test split、规模、录音格式、许可、文件和提交记录。
- [官方 README](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)：任务、数据结构、生成方法、指标定义、局限、许可和引用要求。
- [官方 RESULTS.md](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/RESULTS.md)：指标面向读者的定义及榜单结果说明。
- [官方 metrics.json](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/metrics.json)：机器可读指标和试验记录。
- [Multilingual LibriSpeech 原始论文](https://arxiv.org/abs/2012.03411)：官方 README 要求引用的上游语料论文，不是 Small Overlapping Speech Bench 自身的论文，也不能据此替该 benchmark 填年份。
