# 语音识别与实时语音交互：任务、需求与已有方案

调查日期：2026-11-09。以下基于当前本地条目、公开页面及作者报告；未复现测试、收集用户录音、验证媒体权限或开展用户访谈。

中文方言、多人会议与转写归一化的专项对照见[补充调查](2026-11-09-chinese-speech-dialect-overlap.md)。

## 本站已有内容与任务边界

| 本地条目 | 关注什么 | 阅读边界 |
| --- | --- | --- |
| [Small Overlapping Speech Bench](../../content/benchmarks/small-overlapping-speech-bench.json) | 多语言多人重叠语音内容词召回及说话人数统计。 | [官方 README](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)解释多人同时说话的词序没有唯一答案，因此使用内容词召回而非普通 WER。不能把该召回率直接当普通转写准确率；这是小型压力测试。 |
| [τ-Voice](../../content/benchmarks/tau-voice.json) | 电话式多轮语音任务、工具使用、任务完成和交互。 | 站内展示的是官方任务和语音配置字段，不包含完整的生成音频及评测轨迹；任务完成率不等同单纯 ASR 的 WER。 |
| [Artificial Analysis Speech-to-Speech Index](../../content/benchmarks/artificial-analysis-speech-to-speech-index.json) | 原生语音输入输出的多维综合评测。 | 本地条目区分 v1.0 和后续更新；[AA 当前方法](https://artificialanalysis.ai/methodology/speech-to-speech-benchmarking)列语音推理、τ-Voice 代理任务、Arena 偏好和任务成功四项等权。不能把 v1.0 与当前指数默认视为相同组成，也不能把指数等同会议转写分数。 |

## 已有榜单、评测与实用工具

1. [Hugging Face Open ASR Leaderboard](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard) 是用户讨论中提及的现有识别榜；本次只读到 Space 入口，未读取 iframe 实时表格，因此不确认当下完整模型及语言覆盖。单条评论声称大模型与 turbo 分行，不视为本次已复核的现状。
2. [PERIT-STT 榜单](https://perit.ai/research/benchmark/speech-to-text/leaderboard)当前页面显示英文转写模型、WER、CER、完全匹配率、P90 WER 和中位延迟，并有错误、鲁棒性等栏目。该站销售语音数据及标注服务，结果为站方所述；未独立核验音频、分数或其他语种筛选。英文页快照不能代表中文口音或噪声场景。
3. [OpenBenchmarks 的电话延迟项目](https://github.com/openbenchmarks-labs/voice-agent-latency)公布录音分析方法、每轮记录和不同分位数；作者以电话录音中用户说完到检测到回复起始的间隔计量，记录无回复、检测不一致等剔除情况。其作者明确录音路径开销未校准，不同平台默认模型和配置也不一致，因此它衡量的是该设置下的平台体验，不能归因于单一模型内在延迟。其社区贴较早快照与仓库目前样本量不同，不混用。
4. [InteractionBench 论文](https://arxiv.org/html/2611.02430)在同一批预录用户音频上研究时机、任务、音量及长对话；作者披露各系统提示、网络延迟和中断注入时间不尽相同，并明确部分跨系统中断成绩不能直接比较。它是作者报告的研究结果，未运行验证，不能据论文总分断言生产环境优劣。

## 使用者问题及其限制

- [本地语音转写开发者提问](https://www.reddit.com/r/LocalLLaMA/comments/1vxmuue/)：发帖者寻找适用于北美英语的识别榜并询问不同 Whisper 版本和 whisper.cpp；回复者称前两者为不同模型行，而后者是推理引擎。本次无法通过 Space 正文独立确认全部排行；这个求助反映找榜及理解对象的问题，不证明需要再建榜，也不证明回复者对运行时性能的所有判断。
- [会议转写工具维护者的评论](https://www.reddit.com/r/speechtech/comments/1utpb5z/)自述用真实法语会议与编辑过的人工转写对照；发言人提醒，删去犹豫词的参考文本会让忠实识别犹豫词被计为错误，并分享了语言设置发生意外导致错译的经历。其[工具及方法](https://github.com/Martossien/transcria/blob/main/docs/STT_BENCHMARK_REAL_MEETINGS.md)与产品有作者关联，结果未经本站复算；不能把其会议 WER 与另一套朗读语料的数字直接比较。
- [电话延迟讨论](https://www.reddit.com/r/voiceagents/comments/1vjdwxj/)中，一位自称语音 API 开发者提醒首个音频字节可能包含静音，因此字节到达与可听语音开始不一定相同。该评论者与产品有商业关联；这是对可能指标差异的解释，不是对该项目每条录音都含静音的验证。OpenBenchmarks 项目自己的定义以录音中检测回复起点为准，不应只据名称将其简化为网络首包时间。

## 对项目定位的含义

可针对一个具体读者任务试验：给出会议转写、多人重叠或电话客服的场景，让读者从本站解释和上述现有资源中找出适用评测、指标方向、语言、音频条件及缺失项，比较能否正确判断成绩能否互比。该方案需要真实读者验证，不能把两三条社区讨论当市场规模；若用户实际需要私有音频实测或端到端调试，资料站本身未必能替代执行工具。
