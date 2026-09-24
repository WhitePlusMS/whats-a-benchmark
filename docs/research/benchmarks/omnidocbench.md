# OmniDocBench

核验日期：2026-09-23。

## 官方身份

OmniDocBench 是 OpenDataLab 发布的文档解析评测基准，论文发表于 CVPR 2025。官方仓库同时提供评测工具和数据集入口；仓库的 Apache-2.0 标识不能代替数据集对 PDF 内容给出的单独使用边界。[官方 GitHub README](https://github.com/opendatalab/OmniDocBench)；[论文](https://arxiv.org/abs/2412.07626)

## 官方定义与忠实中文概述

评估模型从 PDF 页面解析文档内容与结构的能力，覆盖端到端解析、文本 OCR、版面检测、表格识别、公式识别及阅读顺序等维度。数据带有文本、公式、表格和页面组件的区域定位与识别标注，并含页面/块级属性标签。[官方 README](https://github.com/opendatalab/OmniDocBench#benchmark-introduction)

## 任务输入/输出/环境

- 输入：PDF 页面或对应图像；单模块评测也可输入组件裁切与标注数据。
- 输出：端到端为结构化文本/Markdown 等解析结果；单模块按任务产生文本、LaTeX、HTML、版面框或阅读顺序预测。
- 环境：官方提供 end-to-end 与单模块评测代码；主仓库 README 描述 Python 3.10 环境，公式 CDM 另依赖 TeX Live、ImageMagick、Ghostscript 等系统工具。具体运行应按锁定版本与配置复核。[官方 README](https://github.com/opendatalab/OmniDocBench)

## 数据规模/split/字段/文件

官方 README 当前介绍 1,651 个 PDF 页面、10 种文档类型、5 种版面类型和 5 种语言类型；页面组件包含 28 类块级、4 类行内/跨度级标注。Hugging Face 数据页目前显示 1,657 rows，和 README 所称页面数不一致；row 数不能直接当作 PDF 页数或版本规模，正式比较须固定数据快照。[官方 README](https://github.com/opendatalab/OmniDocBench)；[官方数据集页](https://huggingface.co/datasets/opendatalab/OmniDocBench)

官方更新记录显示 v1.6 于 2026-04-10 更新，加入 296 页并调整标注；v1.7 于 2026-04-30 加入榜单结果并支持 skills-based evaluation。README 同时说数据集主分支随 v1.6 更新，故 v1.7 的具体数据快照变化未由该记录说明，比较时应分开记录数据版本和评测代码版本。[官方更新记录](https://github.com/opendatalab/OmniDocBench#updates)

## 访问状态

评测代码与数据入口公开可访问，数据可从官方 Hugging Face、OpenDataLab 页面获取。公开下载不表示 PDF 页面及其识别内容可无限制转载；官方声明数据仅供研究使用、不可商用。[官方 GitHub](https://github.com/opendatalab/OmniDocBench)；[官方 Hugging Face 数据页版权声明](https://huggingface.co/datasets/opendatalab/OmniDocBench)

## 数据/代码/媒体许可与使用边界

- GitHub 仓库标注 Apache-2.0，适用于按其 LICENSE 条款使用仓库中受该许可覆盖的代码/文件；不能据此推导每个 PDF、图像、ground truth 或其他第三方作品均获同一许可。[官方 LICENSE](https://github.com/opendatalab/OmniDocBench/blob/main/LICENSE)
- 官方数据页明确 PDF 收集自公开网络和社区贡献，并声明仅供研究、不可商用；未发现一项能清楚覆盖所有底层 PDF 与媒体的统一再分发许可。数据发布方允许其在该项目中出现，也不等于其拥有所有第三方材料的转授权权利。[官方版权声明](https://huggingface.co/datasets/opendatalab/OmniDocBench)
- 因此本站只链接官方数据与展示页，不转载 PDF 页面、截图、题目材料或逐样本标注；逐项授权和适用范围未核清前不作例外。代码如被复用，需保留 Apache-2.0 所要求的许可与归属信息。

## 官方样例与是否可在公开 GitHub Pages 转载

仓库有 demo JSON 和图像/解析演示，但 demo 可能展示源 PDF 的内容。当前未逐项确认其中原始文件、图片和标注可再分发；**不复制官方样例或页面截图到公开站点，仅提供官方链接**。如后续确需展示，应先核对该条目的原始来源和许可，不以仓库 Apache-2.0 或“公开可下载”替代权利判断。[官方 demo 与版权声明](https://github.com/opendatalab/OmniDocBench)

## 指标

官方支持 Normalized Edit Distance、BLEU、METEOR、TEDS 与 COCO detection metrics（如 mAP/mAR）；依任务配置组合，不能把不同模块的分数视作同一指标。官方更新说明 v1.5 leaderboard 的 Overall 公式为文本归一化编辑分、表格 TEDS、公式 CDM 三项平均，但该公式与数据/代码版本关联，不应自动套用到所有版本。[官方 README](https://github.com/opendatalab/OmniDocBench)；[官方更新记录](https://github.com/opendatalab/OmniDocBench#updates)

## 版本关系

仓库记录了 v1.0、v1.5、v1.6、v1.7。v1.5 更新了匹配逻辑、页面分辨率、数据规模和 Overall 口径；v1.6 增加高难页面并提出预测侧多粒度自适应匹配；v1.7 的记录为榜单和 skills-based evaluation 更新。报告结果时须写清数据集 revision、代码 tag/commit、指标配置和输入分辨率，不能仅写“OmniDocBench”。[官方更新记录](https://github.com/opendatalab/OmniDocBench#updates)

## 官方来源按角色分组

- 基准定义、规模、结构、指标和版本：[OpenDataLab 官方仓库 README](https://github.com/opendatalab/OmniDocBench)
- 数据分发、字段和版权边界：[OpenDataLab 官方 Hugging Face 数据页](https://huggingface.co/datasets/opendatalab/OmniDocBench)
- 仓库代码许可：[官方 LICENSE](https://github.com/opendatalab/OmniDocBench/blob/main/LICENSE)
- 论文：[arXiv:2412.07626](https://arxiv.org/abs/2412.07626)

## 模型发布引用

本记录不引用厂商模型分数。官方仓库榜单用于记录提交方报告结果，不能替代对数据版本、评测配置和模型提交的独立核验。

## 未核实项

- Hugging Face 页面显示 1,657 rows，而仓库 README 记载 1,651 PDF 页面；条目与页面的映射及当前数据快照差异未逐项核查。
- v1.7 的记录没有明确说明数据文件是否同步更新；不可假定其与 v1.6 数据完全相同或不同。
- PDF、图片及数据集中每个第三方作品的具体授权未逐项查验；公开 GitHub Pages 再分发权限未知。

## 研究结论

**PASS_WITH_LIMITATIONS** — 基准任务、标注、指标与版本演进有官方材料支撑；代码 Apache-2.0 与数据本身的非商业研究限制分别适用。底层 PDF/媒体权利未逐项核验，因此公开站点只链接官方资源，不转载样例内容。
