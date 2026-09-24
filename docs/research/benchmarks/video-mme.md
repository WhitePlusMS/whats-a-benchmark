# Video-MME

核验日期：2026-09-23

## 官方身份

Video-MME 是由 MME-Benchmarks 作者团队提出的多模态大语言模型视频分析评测集，论文发表于 CVPR 2025。官方将其描述为覆盖不同时长、视频类型以及视频、字幕和音频信息的视频理解基准。[作者论文](https://arxiv.org/abs/2405.21075)；[官方 GitHub](https://github.com/MME-Benchmarks/Video-MME)

## 官方定义与忠实中文概述

Video-MME 评估模型对视频序列的理解，支持视频 MLLM，也可作为多图像模型输入设置。官方仓库报告 900 段视频、总计 254 小时和 2,700 个人工标注问答，视频长度从 11 秒到 1 小时，并含短、中、长时长设置。数据形式涉及视频帧、字幕和音频等模态。[官方 README](https://github.com/MME-Benchmarks/Video-MME)

## 任务输入/输出/环境

- **输入**：视频内容与一道四选一问题；可选字幕设置将对应采样帧时点的字幕加入 prompt。官方另提供无字幕设置。
- **输出**：模型返回选项字母，整理为官方 JSON 格式后由评估脚本计算准确率。
- **环境**：评测需要依照官方流程获取视频/字幕、抽帧并运行模型；可以使用官方建议的 VLMEvalKit 或 LMMs-Eval 工具，也可按仓库脚本提交结果。工具并不会改变原始媒体授权限制。[官方 README](https://github.com/MME-Benchmarks/Video-MME)

## 数据规模/split/字段/文件

官方报告 900 videos、744 subtitles 和 2,700 QA；按视频 duration、domain、subcategory 与 task type 统计成绩。官方评估脚本要求提供 `results_file` JSON 和 `video_duration_type`（short/medium/long）。本轮未下载或统计全部数据文件，也不将项目说明中的类别文字误差自行补全。[官方 README](https://github.com/MME-Benchmarks/Video-MME)

## 访问状态

官方 GitHub、项目主页及作者提供的数据入口公开可访问；运行需获取视频、字幕和标注资源并准备待测模型。本轮未下载、展示或播放数据媒体，也未执行模型评测。[官方仓库](https://github.com/MME-Benchmarks/Video-MME)

## 数据/代码/媒体许可与使用边界

官方数据区声明：仅用于学术研究，任何商业用途均被禁止；视频版权属于各自视频权利人；未事先批准不得以任何形式分发、发布、复制、传播或修改 Video-MME 的全部或部分内容。README 还指明数据及标注由 LMMS-Lab 提供。故视频、帧截图、字幕、题目与标注均不可因代码公开或 GitHub 可访问而转载；本轮不据此推断对单独数据部分存在更宽许可。代码与媒体/数据权利须分别看待。[官方数据许可声明](https://github.com/MME-Benchmarks/Video-MME)

## 官方样例与是否可在公开 GitHub Pages 转载

不在公开 GitHub Pages 转载视频、截帧、字幕、题目或标注。官方明确禁止未经先前批准而分发、发布、复制、传播或修改 Video-MME 全部或部分内容，并将视频版权归于各视频拥有者。页面可写自有文字概述并链接官方项目和论文；如需嵌入样例媒体，应先获得官方事先批准和相应权利人许可。[官方许可原文所在 README](https://github.com/MME-Benchmarks/Video-MME)

## 指标

主要指标为多项选择题准确率；官方脚本还返回按视频时长、领域、子类别、任务类型划分的准确率。成绩须标明是否使用字幕、采样帧数/策略和覆盖的 duration 类别，因为这些设置改变输入。[官方评测说明](https://github.com/MME-Benchmarks/Video-MME)

## 版本关系

作者在 2024-06 首次发布并于 2024-06-15 更新评估数据/视频链接和采帧设置；论文提交版本 v3 日期为 2025-05-30，基准于 CVPR 2025 发表。复现实验需要同时注明代码/数据 revision 和输入设置；不要把后来出现的 Video-MME-v2 当作本条原始 Video-MME。[官方 README](https://github.com/MME-Benchmarks/Video-MME)；[作者论文版本记录](https://arxiv.org/abs/2405.21075)

## 官方来源按角色分组

- **论文定义及研究背景**：[作者论文 arXiv:2405.21075](https://arxiv.org/abs/2405.21075)。
- **数据规模、字段、运行评估及媒体许可**：[Video-MME 官方 README](https://github.com/MME-Benchmarks/Video-MME)。
- **官方项目与 leaderboard 入口**：[项目主页](https://video-mme.github.io/)。

## 模型发布引用

发布分数时记录 Video-MME 具体数据/代码 revision、视频抽帧方式、分辨率、字幕有无、长短视频覆盖和预测 JSON。官方页面列出的论文成绩与各模型后续发布分数均对应各自方法和时间点；不要将不同设置下的准确率直接等同。[官方 README](https://github.com/MME-Benchmarks/Video-MME)；[作者论文](https://arxiv.org/abs/2405.21075)

## 未核实项

- 未下载、播放或逐条审查 900 段视频和标注；不确认每条视频 URL 的现行可用状态。
- 未逐项获取视频权利人或字幕素材的单独授权；官方声明已足以支持本站不再发布任何该基准媒体/内容。
- 未在本轮复跑评测或固定仓库 commit。

## 研究结论

**PASS_WITH_LIMITATIONS** — 官方论文与 README 支持身份、任务规模、流程和指标；README 对研究用途、商业用途及未授权再分发有明确限制。公开 GitHub Pages 仅做自有概述并链接官方来源，不重新发布视频、截图、字幕或题目数据。
