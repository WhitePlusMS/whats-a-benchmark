# Mind2Web

核验日期：2026-09-23。

## 官方身份

Mind2Web 是俄亥俄州立大学研究团队于 2023 年发布的网页代理数据集和评测，论文题名为 *Mind2Web: Towards a Generalist Agent for the Web*。本条指原始 Mind2Web，不包括后续独立发布的 Multimodal-Mind2Web、Online-Mind2Web 或 Mind2Web-2。[作者论文](https://arxiv.org/abs/2306.06070)；[作者仓库](https://github.com/OSU-NLP-Group/Mind2Web)

## 官方定义与忠实中文概述

基准用真实网站上的开放式自然语言任务和人工采集的操作序列研究网页通用代理。作者数据覆盖 137 个网站、31 个领域、2,000 多项任务；网站页面以 HTML 快照记录。跨任务、跨站点和跨领域 split 分别检查不同粒度的泛化，不能将离线动作预测精度直接说成当前网页在线任务完成率。[论文](https://arxiv.org/abs/2306.06070)；[README](https://github.com/OSU-NLP-Group/Mind2Web)

## 任务输入/输出/环境

- 输入为自然语言任务、对应页面快照/HTML 及候选 DOM 元素；动作包括 CLICK、TYPE、SELECT，部分原操作 HOVER、ENTER 会映射到评测动作定义。模型可按一条任务轨迹逐步预测网页元素和操作。[作者 README](https://github.com/OSU-NLP-Group/Mind2Web)
- 输出为所选 DOM 元素和操作类型/参数，评估可按动作位置预测，也可在其他交互 harness 中评价在线任务完成。原论文报告 action prediction；作者仓库特别说明直接对照论文必须使用 macro average，代码最初默认 micro average 会偏重动作步骤更多的任务。[作者仓库](https://github.com/OSU-NLP-Group/Mind2Web)
- 原始主要设置使用记录下来的页面快照，而不是持续可用的线上网站；网页变更使实时回放可能失效。不要把原始 snapshot 评测和后续 Online-Mind2Web 或 Mind2Web-2 评测结果混为一个分数。[作者主页](https://osu-nlp-group.github.io/Mind2Web/)；[原始论文](https://arxiv.org/abs/2306.06070)

## 数据规模/split/字段/文件

- 作者 README 列出 train 1,009、test_task 252、test_website 177、test_domain 912 条；三个 test split 分别对应训练期间见过相同网站上的新任务、未见网站、未见领域。三者总量与“2,000+ 开放任务”的总体摘要口径不同，应分别报告而不要用单一整数覆盖。[作者 README 数据结构](https://github.com/OSU-NLP-Group/Mind2Web)
- 顶层记录包含 `annotation_id`、`website`、`domain`、`subdomain`、`confirmed_task`、`action_reprs`、`actions`。每个 action 含 `action_uid`、动作前 `raw_html`/`cleaned_html`、`operation`（`op`、`original_op`、可选 `value`）、`pos_candidates` 和 `neg_candidates`；候选元素有 tag、目标标志、backend node id、序列化 attributes 等。[作者 README](https://github.com/OSU-NLP-Group/Mind2Web)
- 原始仓库还提供 raw dump/完整轨迹与快照、fine-tuning 实现及模型；这些增强发布与基础任务 JSON 不宜默认为相同 split 或再发布权限。[作者仓库更新记录](https://github.com/OSU-NLP-Group/Mind2Web)

## 访问状态

训练数据托管于作者 HF 数据仓库；测试数据以带密码 ZIP 单独提供，以降低模型爬取测试集用于训练造成的污染。作者明确要求不要将解压后的测试文件在线再分发。代码仓库及项目页公开，受测者若申请原 test split 应遵照原始交付方式和作者要求。[作者 README](https://github.com/OSU-NLP-Group/Mind2Web)

## 数据/代码/媒体许可与使用边界

作者 README 声明 Mind2Web 数据集采用 CC BY 4.0，代码采用 MIT。数据许可不解除作者对测试文件的明确在线再分发限制；因此本站可链接并概述数据结构，不托管或嵌入解压后的 test JSON/HTML/轨迹。数据包含真实网站 HTML 和潜在页面文本，CC BY 数据集许可不应被解释为对页面内第三方素材授予额外权利。原始本文不是视觉图像基准；后续 Multimodal-Mind2Web 包含截图，应单独核验。[作者 README](https://github.com/OSU-NLP-Group/Mind2Web)；[NeurIPS D&B 论文材料](https://papers.nips.cc/paper_files/paper/2023/file/5950bf290a1570ea401bf98882128160-Paper-Datasets_and_Benchmarks.pdf)

## 官方样例与是否可在公开 GitHub Pages 转载

现有条目没有嵌入具体记录。官方公开了数据字段和 train 入口，但 test 的解压文件不能在线再分发；页面适宜自写抽象示例或链接作者浏览器，不摘录 test split 的任务、HTML、候选元素或人工动作轨迹。若使用训练记录，也需署名并避免把第三方页面内容作为自己授权的材料。[作者 README](https://github.com/OSU-NLP-Group/Mind2Web)

## 指标

原论文指标为 element accuracy（预测元素与所有可接受元素比较）、operation F1（对预测操作和值计算 token-level F1；Click 相当于准确率）、step success rate（元素和操作都正确）及全任务 success rate（所有步骤均成功）。论文对 step-wise 指标采用跨任务 macro average；作者仓库后来补充 micro 结果并提醒直接比较论文应使用 macro。报告需写明候选元素生成方式、split 和宏/微口径。此离线逐步预测结果不能与当前网站上的在线端到端成功率等同。[原论文指标定义](https://arxiv.org/abs/2306.06070)；[作者评测代码说明](https://github.com/OSU-NLP-Group/Mind2Web)

## 版本关系

2023 原始版本含基于 HTML 快照的监督轨迹；2024 Multimodal-Mind2Web 在快照配对网页截图，2025 Online-Mind2Web 用真实网站、维护可用任务，Mind2Web-2 面向 agentic search。它们是后续扩展/独立基准，不可只因名称相似便互换 split、任务规模或成绩。当前未找到原始数据的语义版本编号，报告须固定数据仓库 revision 和 test 文件来源。[原始仓库更新历史](https://github.com/OSU-NLP-Group/Mind2Web)；[Online-Mind2Web 作者仓库](https://github.com/OSU-NLP-Group/Online-Mind2Web)；[Mind2Web-2 作者仓库](https://github.com/OSU-NLP-Group/Mind2Web-2)

## 官方来源按角色分组

- **原始 benchmark 构造、定义及指标：**[作者论文](https://arxiv.org/abs/2306.06070)。
- **字段、split、访问限制和许可：**[OSU-NLP-Group/Mind2Web README](https://github.com/OSU-NLP-Group/Mind2Web)。
- **作者项目页和数据浏览：**[Mind2Web project page](https://osu-nlp-group.github.io/Mind2Web/)。

## 模型发布引用

报告应标注原始 Mind2Web、cross-task/website/domain 的具体 split、离线快照或在线网站、macro/micro、top-k/action 指标、模型可见的 HTML/候选元素、数据 revision 和测试文件获取方式。不要以 Online-Mind2Web 或 Mind2Web-2 成绩充作原版 Mind2Web 结果。

## 未核实项

- 本轮未下载并校验各 split JSON 的逐条数量和 HTML 媒体权利；数量引用作者 README。
- GitHub README 当前指向更新后的 HF 工件；原始原始 dump、Multimodal-Mind2Web 和 Online-Mind2Web 的具体 revision 边界仍需逐版固定。
- 原始仓库对 test 压缩文件要求不得在线分发；未将 CC BY 4.0 解释为可忽略该专门要求。

## 研究结论

**PASS_WITH_LIMITATIONS** — 原作者资料支持任务目标、三个跨域测试切分、字段 schema、宏平均提示、CC BY 4.0 数据许可及测试文件反再分发要求。公开页面可介绍并链接原站；不得公开托管解压后的测试文件，且后续同名扩展需作为独立版本处理。
