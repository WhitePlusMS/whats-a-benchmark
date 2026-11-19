# 视频理解：帧数、字幕、评分与用户需求

核查日期：2026-11-09。基于当前本地工作树与公开资料；没有运行模型、复算成绩、验证所有视频可访问性，也未做目标用户访谈。

## 本站条目实际覆盖

- [Video-MME](../../content/benchmarks/video-mme.json)：900 视频、2,700 道单选题，条目已说明不同视频时长、字幕、抽帧和音频配置会影响输入及成绩。数据源视频由第三方提供；本地依据来源限制没有转载视频或原题，提供官方链接。
- [Video-MME v2](../../content/benchmarks/video-mme-v2.json)：800 视频、3,200 问题，条目区分逐题准确率与相关性、逻辑分组指标；这是不同评测设计，不能把 v1 的 accuracy 与 v2 的 grouped score 混成一个排行榜。[官方仓库](https://github.com/MME-Benchmarks/Video-MME-v2)说明每组四题，Relevance 采用基于答对数的非线性映射，Logic 考虑连续正确的依赖；提供无字幕/字幕和推理提示等配置。仓库对数据转发、发布及商业使用设有限制，其他视频权利归原持有人，须按各来源核对。
- [LVBench](../../content/benchmarks/lvbench.json)：面向较长视频，本地有真实 QA 和时间范围字段的一条记录，但没有本地播放原视频，不等于完整测试过程。

## 相同模型和评测，帧数也能改变结果

[Meta-Video 论文](https://arxiv.org/html/2610.18535)表 2(b)在其 Qwen2.5-VL-7B 实验中，固定 Hugging Face 后端、均匀抽帧、视频输入、0 温度等条件，Video-MME 在 4 帧为 50.0%，128 帧为 65.5%，差 15.5 个百分点。作者还发现其他评测在更多帧时可能饱和或下降；该结果不证明所有模型都是越多帧越好，也不是本站运行结果。论文部分其他表格采用不同分批设置及四舍五入，不能随意合并对应行。

同一论文基于黑帧基线从多个既有评测中抽取 Meta-Video 问题，并提供记录模型、数据、解码、采样、分辨率、提示和后端的 evaluation card。这说明“记录成绩背后的协议”已有直接研究与模板；黑帧筛选只针对作者选择的模型与协议，不证明保留下来的所有问题必须看视频，也不能代表所有视频场景。

[Video-MME 原论文](https://arxiv.org/html/2405.21075)说明在其带字幕实验中，字幕与抽样帧对应；因此不应假定一定向模型提供完整字幕或音轨。实际发布报告如何使用输入仍需回到对应报告核对。

## 用户询问及已获得的回应

1. [Video-MME #42](https://github.com/MME-Benchmarks/Video-MME/issues/42)：一位使用者说难以对每个模型完整本地运行，希望官方增加模型结果以便比较及核对设置。公开讨论不是新站的留存或付费证据。
2. [Video-MME #33](https://github.com/MME-Benchmarks/Video-MME/issues/33)：一位使用者请求闭源模型的原始评测记录。帖子当次未显示回复，不代表其他地方不存在相关记录。
3. [LLaVA-OneVision-2 #192](https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2/issues/192)：提问者发现复现分支为短、中、长视频采用不同帧数/分辨率，询问论文中 token 预算及基线配置。协作者解释按时长分别处理，并称对部分缺少原报告成绩的开源基线也做了超参搜索；提问者称已回答疑问并关闭 issue。协作者的可复现性及公平性说法未由本站运行验证，关闭不是复现成功证明。
4. [视频理解讨论](https://www.reddit.com/r/deeplearning/comments/1u8elvp/how_are_you_all_evaluating_vlms_for_video/)发帖人提到抽帧、长视频切块和实际任务评价问题，并披露在视频基础设施公司工作；同帖一位回复者也称来自同一团队，不能当作两个独立机构的客户验证。

## 已有榜单、工具和一个可复核的文档差异

| 资料 | 已有能力 | 边界 |
| --- | --- | --- |
| [Village LLM Atlas](https://atlas.village.dev/benchmarks/videomme-with-subtitles) | 有字幕 Video-MME 单独页面、模型成绩和报告来源，并说明区别于无字幕与音视频字幕条件 | 来源包含其他厂商对比结果，列出报告方不等同已查明实际运行方；本次未逐行核验报告、分数或帧数。 |
| [EvalScope 中文 v2 文档](https://evalscope.readthedocs.io/zh-cn/latest/benchmarks/videomme_v2.html) | 任务、数据集、子集、是否加字幕、字幕词数、测试命令等说明 | 文档列 accuracy，与官方的分组评分不自动等价；未运行验证。文档中的 `limit=10` 是示例，非完整评测。 |
| [Video-MME v2 官方仓库](https://github.com/MME-Benchmarks/Video-MME-v2) | 两种输入模式、运行脚本、示例和分组评分说明 | 固定提交 `b2834bd4091d6234ccaf0fa1f149a7ef4eac5875` 的 [README](https://github.com/MME-Benchmarks/Video-MME-v2/blob/b2834bd4091d6234ccaf0fa1f149a7ef4eac5875/README.md)中，一条注释称示例为 Qwen2.5-VL-7B，但紧随命令的 `--model` 实参是 Qwen3-VL-8B-Instruct；这是文档文字与命令不一致，不证明代码错误或实际成绩受影响。 |

## 对项目定位的含义

这是“把模型发布时的分数填进现有评测”的具体难题：一个名称相同的分数还需要版本、字幕/音频、帧数、采样、运行框架和指标等条件。当前站内已解释部分条件，但并未维护成绩表或做用户对照试验；官方文档、中文运行器、现有成绩站和论文 evaluation cards 已各覆盖其中一部分，不能称为独占需求。适合验证的假设是：针对少数模型报告，给读者清楚呈现可找到的配置和明确未知项，能否帮助其判断成绩是否可比较；维护时间、回访及付费意愿均未知。
