# 中文语音：方言、多说话人与评测口径

调查日期：2026-11-09。以下是公开材料与本地条目对照，未自行运行模型、复算结果、收集录音或访谈用户。

## 具体需求和现有替代

[LINUX DO 的讨论](https://linux.do/t/topic/2639971)中，提问者称本地 FunASR 说话人区分效果不理想，询问中文及将来方言支持；回复者分别自述中文测试、普通话方案和粤语视频/会议经验。讨论者没有公开统一测试集或可核验成绩，这只是一组用户自报，不能推断市场规模、比较模型优劣或证明方言识别根因。

| 读者想解决的问题 | 已有资源与实际覆盖 | 不应推断的结论 |
| --- | --- | --- |
| 中文方言是什么、说了什么 | [ChinaVoices 2026](https://aslp-lab.github.io/ChinaVoices-Challenge/)有方言种类识别与语音转写两项任务，各分限定数据和开放数据方案，官网列有四个榜单入口和最终结果。 | 方言榜已经存在；比赛结果并不直接评估多人会议中的说话人归属或在线对话。 |
| 自己的中文音频转写准不准、快不快 | [asr-eval](https://github.com/lixuanqun/asr-eval)自述支持多引擎、人工校对的参考转写、micro-CER、速度和自定义场景字段；提供迷你测试集。 | 这是既有运行工具；README 样例只有三条，不足以判断生产表现。本轮未运行或测试其隐私处理。 |
| 多人同时说话时能否听到内容 | 本站 [Small Overlapping Speech Bench](../../content/benchmarks/small-overlapping-speech-bench.json)提供真实样例和内容词召回；[官方数据卡](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)称语料由德、法、西、意、荷、葡六种欧洲语言的朗读叠加而成，并可统计预测人数。 | 这里没有中文或粤语，不是自然中文会议。内容词召回、人数预测也不能直接当普通转写 CER 或标准说话人区分错误率。 |
| 语音客服能否完成任务 | 本站 [τ-Voice](../../content/benchmarks/tau-voice.json)与 [AA 语音指数](../../content/benchmarks/artificial-analysis-speech-to-speech-index.json)涉及语音交互和任务；[AA 方法](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking)还列出语音推理、偏好和任务成功等成分。 | 对话任务成功率或综合指数不能直接当方言转写或会议说话人区分成绩；本地 τ-Voice 样例未提供完整生成音频及轨迹。 |

## 同名指标为什么不能直接拼榜

[ChinaVoices 总结论文](https://arxiv.org/html/2609.03471)表 4 给出限定数据方案正式排名前三系统在公开评测集按方言的 CER；例如 TeleASR 的粤语 7.60%、吴语 14.48%，这是不同方言子集，不是同一用户录音测试。论文说明榜单采用 16 个方言的宏平均，而表 5 使用参考字符总数作分母的 micro-CER。即便都叫 CER，两个聚合值也不能直接当相同口径；这些系统也不是所有商业语音模型。

[UltraEval-Audio 的 Qwen3-ASR 复现记录](https://github.com/OpenBMB/UltraEval-Audio/blob/main/replication/qwen3_asr.md)报告，同一模型的 CV-15 中文集转写未做繁转简时 CER 为 7.68%，对转写做繁转简后约 5.56%，模型卡报告 5.35%。这是复现作者的报告，本站没有重跑；仍有模型配置、数据和其他预处理条件可能影响差异，不能说 5.56% 精确复现了 5.35%，也不能将差异全部归因于单一因素。它说明展示成绩时需要保留归一化、版本和来源。

## 对项目的意义

已有公开方言评测、榜单和自有语料评测工具，单独添加一个中文语音总榜仍会面临直接替代。可以用现有条目试做一张“中文会议/客服选什么评测”的对照：分别交代语言、样本、转写、说话人、交互任务和指标，明确无法回答的部分，并链接已有工具。能否帮助读者比现有资源更快做出正确判断，仍需用真实任务和读者验证；本资料站也无法代替私有录音实测。
