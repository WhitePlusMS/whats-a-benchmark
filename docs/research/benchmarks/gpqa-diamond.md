# GPQA Diamond

核验日期：2026-09-23

## 官方身份

GPQA Diamond 是 GPQA 中的高质量 198 题子集，不是独立作者发布的另一套 benchmark，也不是 GPQA 的全部 448 题。GPQA 由 David Rein 等作者提出，题目涵盖生物、物理和化学。[GPQA 论文](https://arxiv.org/abs/2311.12022)；[官方 Hugging Face 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)

## 官方定义与忠实中文概述

GPQA Diamond 通常指数据卡 `gpqa_diamond` 配置。它聚焦专家标注者答对、非本领域验证者多数答错的高质量问题子集。任务是科学知识驱动的四选一问答；“Diamond”是 GPQA 的子集标记，不代表由另一个机构建立的独立版本或官方模型榜单。[官方数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)；[GPQA 论文](https://arxiv.org/abs/2311.12022)

## 任务输入/输出/环境

- **输入**：一条英语科学问题和四个候选选项，主题属于生物、物理或化学。[官方 GPQA 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)
- **输出**：选择一个选项；具体报告可采用生成式回答后抽取选项，也可能使用不同提示格式或解码设置，因此要记录答案解析规则。
- **环境**：基准任务本身为问答；闭卷/可联网、是否提供推理提示、候选项顺序和抽样方式由运行报告确定。原论文包含闭卷与开放网络访问等人类/模型实验方案，不能仅凭“Google-Proof”名称推定某个模型成绩的工具条件。[GPQA 论文](https://arxiv.org/abs/2311.12022)；[官方基线仓库](https://github.com/idavidrein/gpqa)

## 数据规模/split/字段/文件

- 原论文及数据卡说明 GPQA 总计 448 道问题；数据卡将不同配置分别列为 `gpqa_extended`、`gpqa_main`、`gpqa_diamond` 和 `gpqa_experts`。[GPQA 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)
- `gpqa_diamond` 是 198 题配置；它是 Main 的子集，适合单独报告，不应把 198 与 448 相加或叫作完整 GPQA。[官方数据卡配置](https://huggingface.co/datasets/Idavidrein/gpqa)；[原论文](https://arxiv.org/abs/2311.12022)
- Hugging Face card 标注 CSV，配置文件分别提供各 split。具体原始列名应按固定 revision 读取，本轮不根据第三方导出格式外推 schema。

## 访问状态

官方 GitHub 仓库公开基线代码，并提供密码保护的 `dataset.zip` 下载；README 同时链接 Hugging Face 数据集。HF 数据集设置为 gated，访问者需接受数据集条件后方可访问题目文件。[官方 GPQA 仓库](https://github.com/idavidrein/gpqa)；[HF GPQA 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)

## 数据/代码/媒体许可与使用边界

Hugging Face 数据卡标明题目数据采用 CC BY 4.0；GitHub 仓库中的代码 `LICENSE` 是 MIT，代码许可不能替代题目许可。更关键的是，作者在 HF 数据卡设置了访问条件，要求**不得在线以纯文本或图片形式披露题目样例**，以降低题目进入模型训练语料造成污染的风险。此项是明确的公开披露要求，即使数据可申请访问、数据卡标注 CC BY 4.0，也不应把原题截图或全文放到公开 Pages。[HF 数据卡与 gating 条件](https://huggingface.co/datasets/Idavidrein/gpqa)；[GitHub 代码许可](https://github.com/idavidrein/gpqa/blob/main/LICENSE)

## 官方样例与是否可在公开 GitHub Pages 转载

GPQA 数据卡的作者明确请求不要在线发布任何题目样例的纯文本或图片；原始仓库还包含用于追踪基准污染的 canary 字符串。[HF 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)；[官方仓库 README](https://github.com/idavidrein/gpqa) **结论：公开 GitHub Pages 不转载 GPQA Diamond 题目、选项、答案或截图；仅展示不含题文的概述、数量和官方来源链接。**

## 指标

常见指标为准确率（正确题数/该 split 题数），但生成式测评还依赖答案抽取、prompt、选项顺序、工具访问、采样温度和重复次数。官方 baseline 仓库显式支持多种 closed-book 与 retrieval prompt 类型，并提供选项 shuffle seed 参数；比较成绩应附相应运行条件。[官方基线仓库](https://github.com/idavidrein/gpqa)

## 版本关系

引用“GPQA Diamond”时应注明数据仓库 revision、198 题子集和提示/评分配置。第三方“clean”修订版或筛题重算不是原作者的 GPQA Diamond 更新，不能覆盖标准原版身份。本研究条目只描述原始 Diamond 子集。[官方数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)

## 官方来源按角色分组

- **基准定义与研究设计**：[Rein et al., GPQA 论文](https://arxiv.org/abs/2311.12022)。
- **公开 split、许可及不披露样例要求**：[官方 Hugging Face 数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)。
- **基线代码、数据访问指引与 canary 提示**：[作者官方 GitHub 仓库](https://github.com/idavidrein/gpqa)。

## 模型发布引用

模型厂商发布的 GPQA Diamond 成绩属于厂商自行选定的模型快照、推理预算与评分流程；厂商成绩不是数据集作者颁发的统一排行榜结果。引用时须记录是否无工具、推理设置、提示方式与评分器。相关模型发布报告不作为本文关于题目公开限制或许可的依据。

## 未核实项

- 此轮未逐列核验 HF 固定 revision 的题目 CSV schema 与题目/答案文件哈希。
- 不同厂商 GPQA Diamond 分数报告中的 prompt、是否多次采样、解码限制与答案抽取器并不统一，未逐一对照。
- 可再分发或衍生发布数据的义务应以 HF CC BY 4.0 条款及数据卡 no-online-example disclosure 条件共同核对；本文不作法律解释。

## 研究结论

**PASS_WITH_LIMITATIONS**：原论文、作者数据卡和仓库确认 GPQA Diamond 是 GPQA 的 198 题子集，访问需接受 HF 条件；作者明确请求不要在线披露题目样例。网站只能展示不泄题的说明与链接，不能转载题文、选项、答案或截图。
