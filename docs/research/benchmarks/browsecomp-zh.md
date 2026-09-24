# BrowseComp-ZH

核验日期：2026-09-23

## 官方身份

BrowseComp-ZH 由 Peilin Zhou 等作者团队发布，官方仓库为 PALIN2018/BrowseComp-ZH，论文 arXiv:2504.19314。它受 BrowseComp 启发，但任务使用中文网络环境中的独立题目，不是 BrowseComp 英文数据的翻译版。[作者仓库 README-ZH](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md)（行 190–204）；[论文摘要](https://arxiv.org/abs/2504.19314)

## 官方定义与忠实中文概述

评估 LLM/搜索代理在中文网络环境中，通过多跳搜索和推理找出简短、客观、易核验答案的能力。作者称题目由中文母语标注员原生构造，要求跨平台检索，并考虑中文语言、信息平台碎片化及内容限制。[README-ZH 项目亮点](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md)（行 190–204）

## 任务输入/输出/环境

- 输入：中文问题；据论文，每题从短小客观、可核验答案逆向构造为多跳线索。
- 输出：题目预设的简短答案；发布资料含答案提取、预测和统计阶段。
- 环境：原论文报告了浏览/不浏览语言模型与搜索代理，但基准定义本身不限定单一搜索引擎或代理 harness。[论文摘要](https://arxiv.org/abs/2504.19314)；[官方 README-ZH 评测运行及输出目录](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E8%AF%84%E6%B5%8B%E8%BF%90%E8%A1%8C)（行 235–250）

## 数据规模/split/字段/文件

289 道全中文多跳检索推理题，覆盖 11 个领域；官方资料没有公布 train/validation/test 三分法。仓库主要包含 `data/browsecomp-zh-encrypted.xlsx`、解密脚本、论文/附录和图片；解密后的表格字段含 Topic、Question、Answer、canary（脚本会读这些字段）。[README-ZH 数据规模/结构](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE)（行 205–233）；[官方解密脚本](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/data/browsecomp-zh-decrypt.py)（行 20–30）。

## 访问状态

仓库、论文、构造指南、代码和加密数据文件公开可取；题目和答案以逐行 canary token 加密。解密脚本提示输入 canary，可解出 Topic/Question/Answer。访问到密文并不等同于明文可公开。[README-ZH 数据访问](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md)（行 223–243）；[decrypt.py](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/data/browsecomp-zh-decrypt.py)（行 20–30、45–52）

## 数据/代码/媒体许可与使用边界

仓库 README 声明项目遵循 MIT License，并明确称数据集仅限学术研究使用；因此不可把仓库代码许可扩大解释成任何商业用途下题目转载皆可。公开站点转载与“数据仅限学术研究”边界不相容，故不转载题目/答案或题目截图。代码按仓库 MIT 许可；论文/仓库图片媒体没有逐项核验独立授权，本站不转载媒体。[README-ZH License](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E8%AE%B8%E5%8F%AF%E5%8D%8F%E8%AE%AE)（行 302–305）；[加密政策](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE)（行 223–233）。

## 官方样例与是否可在公开 GitHub Pages 转载

当前本站 `content/benchmarks/browsecomp-zh.json` 没有原题样例。`artifacts/candidates/samples-text-round3.json` 将该项列为 excluded/held，原因是官方加密和 canary 防泄漏；本次没有解密、摘录或转述题目/答案。公开 GitHub Pages 不转载。可只展示由我们撰写、与原题无关的任务类型说明，并链接官方来源；不得包装成原题。[官方数据访问说明](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md#%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE)（行 223–233）

## 指标

官方论文/README 报告准确率（accuracy）和校准误差（calibration error）；README 表中模型分数以 accuracy 百分数和 calibration error (%) 展示。它们反映不同性质，不能合为单一分数。统计脚本名为 `run_acc_calibration_error.py`。[README-ZH 运行、统计表](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md)（行 235–286）；[论文摘要](https://arxiv.org/abs/2504.19314)。

## 版本关系

论文于 2025 年发布，当前官方仓库提供加密数据和构造指南；未见公开的语义版本号或多个版本间题数映射。应记录论文/仓库 revision，避免将论文报告的系统分数不加说明地视为对未来数据版本的评测。[论文](https://arxiv.org/abs/2504.19314)；[仓库 README-ZH](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md)

## 官方来源按角色分组

- 作者任务定义、题数、许可和防泄漏政策： [官方中文 README](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/README-ZH.md)（行 190–233、302–305）。
- 作者论文： [arXiv:2504.19314](https://arxiv.org/abs/2504.19314)（摘要及论文正文）。
- 密文访问字段与解密实现： [官方 decrypt.py](https://github.com/PALIN2018/BrowseComp-ZH/blob/main/data/browsecomp-zh-decrypt.py)（行 20–30）。
- 代码与文件： [PALIN2018/BrowseComp-ZH](https://github.com/PALIN2018/BrowseComp-ZH)。

## 模型发布引用

DeepSeek-V3.2-Exp 的官方发布材料在 Agentic Tool Use 表格中列出 `BrowseComp-zh`。这只能作为该模型方发布评测结果的引用，不证明其模型运行配置等于论文原始评测配置：[DeepSeek-V3.2-Exp 官方发布页](https://www.deepseek.com/)。尚未核实其确切指标定义和 BrowseComp-ZH 数据 revision，因此不记录具体成绩。

## 未核实项

- 官方未声明标准 train/test split 或公开语义版本号。
- MIT 项目许可与“数据仅限学术研究”的范围需要按代码/数据分别理解；本研究据明示数据限制不转载原题。
- 本次未解密数据，也未逐条验证隐藏记录内容，避免破坏 canary 防泄漏目的。
- 未核实任何模型厂商报告所使用的 BrowseComp-ZH 题集 revision/harness。

## 研究结论

**PASS_WITH_LIMITATIONS** — 任务身份、定义、题数、数据结构、指标与加密/canary 防泄漏策略有第一方证据。题目访问需 canary 解密，且官方标示数据仅限学术研究；本站公开 GitHub Pages 不应转载样题或答案。模型成绩引用需另核数据 revision 和运行配置。
