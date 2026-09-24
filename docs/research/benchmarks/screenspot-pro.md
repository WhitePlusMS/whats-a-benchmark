# ScreenSpot-Pro

核验日期：2026-09-23。

## 官方身份

ScreenSpot-Pro 由 Kaixin Li 等作者提出，论文发表于 2025 年，作者维护项目页、评测榜单及 Hugging Face 数据集。[作者论文](https://arxiv.org/abs/2504.07981)；[作者项目与榜单](https://gui-agent.github.io/grounding-leaderboard/)；[作者 Hugging Face 数据集](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)

## 官方定义与忠实中文概述

该评测面向专业桌面软件的高分辨率 GUI 元素定位。给定屏幕截图和自然语言操作指令，模型需将指令对应到截图中的目标元素。作者论文强调高分辨率、小目标及复杂专业软件界面造成的 grounding 难度；这项能力不等同于完成多步 GUI agent 工作流。[作者论文](https://arxiv.org/abs/2504.07981)

## 任务输入/输出/环境

- **输入**：专业软件截图与描述目标控件的指令；标注包含目标位置及元素类别。
- **输出**：目标元素的屏幕坐标/区域定位。官方榜单报告 grounding accuracy，并区分文本和图标等结果视图；模型协议须注明坐标解码和命中判定方式。
- **环境**：高分辨率专业桌面软件界面，跨多种操作系统和应用。截图里出现的第三方软件 UI 与其内容仍属各自权利主体，不能因基准任务文件公开就推断获得转发权。[作者榜单](https://gui-agent.github.io/grounding-leaderboard/)；[作者数据卡](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)

## 数据规模/split/字段/文件

- 作者论文摘要确认覆盖 23 个应用、5 个行业和 3 种操作系统；作者数据卡列出 Development and Programming、Creative、CAD and Engineering、Scientific and Analytical、Office Suite、Operating System Commons 六个应用类别，并列出应用、版本、OS、图标数及文本目标数。[作者论文](https://arxiv.org/abs/2504.07981)；[官方数据卡](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro/blob/main/README.md)
- 作者 HF 文件区显示按应用划分的 annotations JSON 文件和图片目录；Dataset Viewer 未配置，页面说明是大图可能导致加载错误。HF 发布标签只给出范围 `1K<n<10K`。本轮不采用第三方镜像提供的精确样本计数。
- 官方公开说明没有在可读 dataset card 中完整解释字段 schema、split 与精确记录数，需按固定文件 revision 查看原始 annotations 才能逐项确定。

## 访问状态

数据访问入口直达作者 Hugging Face 文件区；官方 Viewer 未配置（作者说明高分辨率图片导致加载问题），文件可访问不代表截图取得再发布授权。[作者数据集文件区](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)；[作者 leaderboard](https://gui-agent.github.io/grounding-leaderboard/)

## 数据/代码/媒体许可与使用边界

作者 Hugging Face 数据集元数据标记 MIT，作者 GitHub 项目亦有 MIT LICENSE。该标签是发布仓库/数据集的许可声明；目前未找到逐张截图、软件界面、图标、商标或截图中可见第三方内容的权利清单与单独授权。第三方官方文档描述该类截图权利信息为待补充，仅作为风险提示线索，不作为本站事实来源。故不能据 MIT 元数据确认所有界面截图可在本站复制托管。仅引用作者论文、榜单及数据入口，不镜像截图或提取界面内容。[作者数据卡与 MIT 元数据](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro/blob/main/README.md)；[作者代码许可](https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding/blob/main/LICENSE)

## 官方样例与是否可在公开 GitHub Pages 转载

本条不复刻任何截图、指令、坐标标注或软件界面素材。作者提供公开数据入口，但第三方软件画面/元素的逐项授权尚未核实；使用官方链接和原创任务说明即可。当前无经权利核验的站内样例。

## 指标

官方榜单注明结果使用 greedy decoding，并报告 micro-average。指标为目标 UI 元素 grounding accuracy；官方表格按软件和元素类型展示。复现结果应标出输入分辨率、缩放、坐标映射/判定实现、greedy decoding、微平均方式和各类子分数，不把定位准确率解释为整套界面任务成功率。[官方榜单](https://gui-agent.github.io/grounding-leaderboard/)

## 版本关系

ScreenSpot-Pro 是 ScreenSpot 系列中面向专业高分辨率软件场景的独立版本；名称相近不表示与 ScreenSpot 或 ScreenSpot-v2 共用数据或评测难度。作者论文标注 2025 年，当前 HF 主分支及榜单仍持续维护，结果需注明数据、代码和榜单日期。[作者榜单](https://gui-agent.github.io/grounding-leaderboard/)；[作者论文](https://arxiv.org/abs/2504.07981)

## 官方来源按角色分组

- **定义、方法与应用覆盖**：[ScreenSpot-Pro 作者论文](https://arxiv.org/abs/2504.07981)。
- **应用清单、可访问文件、媒体入口与作者许可标签**：[作者 Hugging Face 数据页](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)。
- **榜单及结果聚合约定**：[作者 leaderboard](https://gui-agent.github.io/grounding-leaderboard/)。
- **作者代码仓库 MIT LICENSE**：[ScreenSpot-Pro-GUI-Grounding](https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding/blob/main/LICENSE)。

## 模型发布引用

作者榜单列出的数字按其说明使用 greedy decoding 和 micro-average。引用某模型成绩时应保留模型版本、视觉输入分辨率、推理配置、坐标命中规则、数据及官方评测代码版本，并注明成绩来源；第三方模型卡或二次汇总不替代作者基准定义。

## 未核实项

- 未通过作者原始文件逐项统计精确截图/指令记录数及 splits；本记录只用作者论文确认的 23 应用、5 行业、3 OS。
- MIT 数据集元数据没有逐项界定其覆盖的第三方软件 UI/截图资产；未取得软件厂商或其他权利人的额外授权证据。
- 未复核 annotations JSON 所有字段，也未下载截图文件。

## 研究结论

**PARTIAL** — 作者论文、作者数据卡和榜单确认了基准身份、任务和主要覆盖面。HF 的 MIT 标签不能单独证明第三方软件截图/界面资产获准公开托管；样例保持链接模式，截图素材权利未清前不做站内转载。
