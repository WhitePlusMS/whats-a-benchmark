# Small Overlapping Speech Bench

核验日期：2026-09-23。

## 官方身份

Small Overlapping Speech Bench 由 LAION 发布在其 Hugging Face 数据集空间，页面 profile 显示 LAION e.V.；数据账号由 Christoph Schuhmann 上传。数据集卡称其为可复现的多语种重叠语音小型 benchmark，并要求引用其上游 Multilingual LibriSpeech (MLS)。[作者数据集与卡片](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)；[上游 MLS 论文](https://arxiv.org/abs/2012.03411)

## 官方定义与忠实中文概述

每段混音中三个人同时说话，每人使用不同的欧洲语言，目标是评估自动语音识别模型对并发语音内容的恢复程度，也可看模型能否估计说话人数。官方将其定位为小型、快速的压力测试，不代表自然多人对话的完整特征。[官方 README](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)

## 任务输入/输出/环境

- **输入**：单声道 16 kHz MP3 重叠语音片段。
- **输出**：模型为重叠语音生成的逐说话人/语言转录；数据提供每个说话人的语言、起止时间戳和参考 transcript。具备说话人数预测的系统可以另报告人数。
- **环境**：三路源语音取自 MLS 有声书朗读后混音；它不是自然插话录音。官方结果包含多种 ASR 模型和评测脚本。[数据卡与字段 schema](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)

## 数据规模/split/字段/文件

- 数据集卡当前列出 test split 共 100 条，每条恰有 3 人/3 种语言，时长约 15–26 秒；语言池为德语、法语、西班牙语、意大利语、荷兰语、葡萄牙语。[官方数据集页](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)
- 文件包括 `data/clip_000.mp3` 至 `clip_099.mp3`、`metadata.jsonl`、`ground_truth.jsonl`、评测脚本和 `metrics.json`。记录字段有 `clip_id`、`duration`、`num_speakers`、`languages`、speaker 列表（id、language/code、`src_speaker_id`、时间区间、transcript）及 `audio_file`。[官方 README](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)

## 访问状态

官方 HF 数据卡、记录 viewer、文件列表、音频文件和评测材料公开可访问；卡片列出 100 行和约 67.1 MB 总文件大小。官网 README 可查看加载方式与机器可读 ground-truth schema。[官方数据集页](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)

## 数据/代码/媒体许可与使用边界

官方数据卡明确标注 CC BY 4.0，并称继承 Multilingual LibriSpeech 来源语料的同一许可。可转载真实音频和必要标注时，应署名 Small Overlapping Speech Bench、LAION/上传者，并注明底层 MLS 与论文来源、链接 CC BY 4.0 许可，且标出任何剪辑或转码。不要暗示 LAION 或 Meta 对本站背书。[官方许可及归属](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)；[MLS 上游](https://huggingface.co/datasets/facebook/multilingual_librispeech)

## 官方样例与是否可在公开 GitHub Pages 转载

现有两个真实 test 样例逐条与官方 viewer/`ground_truth.jsonl` 复核：

- `clip_000`：官方值为 26.18 秒、3 人、Italian/Portuguese/French；保存记录中的语言、说话人 ID、`src_speaker_id`、时间范围、transcript 和音频路径逐项相符。本地音频路径所标来源 URL 指向官方 `data/clip_000.mp3`。
- `clip_001`：官方值为 20.764 秒、3 人、Portuguese/German/Spanish；保存的上述字段逐项相符，来源 URL 指向官方 `data/clip_001.mp3`。

两段音频均来自官方 test split 且附带参考答案，展示即公开了这些条目的 test ground truth；页面应明确其为已披露样例，不得当作隐藏评测题。音频和文字允许按卡片 CC BY 4.0 条件再发布，须随附署名与许可说明。

## 指标

官方指标包括按长度至少 3 个字符的参考内容词计算的 recall、捕获到的说话人数及说话人数量预测统计；不使用普通 WER，因为不同语言的并发发言没有定义唯一词序。结果材料应按作者 `RESULTS.md`/`metrics.json` 的精确定义报告各语言和人数统计，不能将“识别率”简化成 WER 或直接视作常规分轨 diarization 分数。[官方结果与指标文件](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)

## 版本关系

官方 README/结果文件未声明 benchmark 版本号；页面元数据也没有正式版本标记，故记为未标注版本。数据来自 MLS，但该评测定义了新的三路同步混音、时间对齐标注与对应指标，不应与 MLS 原始 ASR 任务合并。[官方数据集页](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)；[MLS 论文](https://arxiv.org/abs/2012.03411)

## 官方来源按角色分组

- **身份、卡片声明、原始样例和记录行**：[LAION 官方 Hugging Face 数据集页](https://huggingface.co/datasets/laion/small-overlapping-speech-bench)。
- **任务、schema、许可、限制与引用要求**：[官方 README](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/README.md)。
- **指标计算和结果约定**：[官方 RESULTS.md](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/RESULTS.md) 与 [`metrics.json`](https://huggingface.co/datasets/laion/small-overlapping-speech-bench/blob/main/metrics.json)。
- **来源语料**：[Multilingual LibriSpeech 数据页](https://huggingface.co/datasets/facebook/multilingual_librispeech) 与[论文](https://arxiv.org/abs/2012.03411)。

## 模型发布引用

报告时固定 benchmark 数据 revision、模型/ASR 解码设置、转录规范化方法、speaker-count 输出要求及指标脚本版本。原始结果页的六个模型数据应按其实际实现引用，不能仅因评测名称相同就直接比较采用不同文本归一化或人数阈值的结果。

## 未核实项

- 本轮逐条核对了已收录 `clip_000`、`clip_001` 的记录字段与官方公开源；没有对 100 条记录全部独立校验。
- 未为音频文件记录哈希或核对每字节媒体内容；当前本地文件命名/链接与源记录对应。
- 指标说明采用官方 README/结果文件；未在本轮重跑六个模型或重算所有分数。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方数据卡明确公开了 100 条 test 记录、任务/schema、CC BY 4.0 来源链和指标入口。已有 `clip_000` 与 `clip_001` 样例逐条匹配官方记录；它们披露了公开 test 答案，页面需保留 attribution、许可文件并标明样例非隐藏集。
