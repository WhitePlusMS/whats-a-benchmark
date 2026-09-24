# LongBench

核验日期：2026-09-23

## 官方身份

LongBench 是 THUDM 发布的中英文多任务长上下文理解基准，论文发表于 ACL 2024。它由多个既有数据集的验证/测试数据改造而成，同时含作者构造或人工标注任务；LongBench-E 是按长度区间重新均匀抽样形成的扩展评测切片。[论文](https://arxiv.org/abs/2308.14508)；[作者官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)

## 官方定义与忠实中文概述

作者将 LongBench 定义为双语、多任务、综合评估长上下文理解能力的基准，覆盖单文档问答、多文档问答、摘要、少样本学习、合成任务和代码补全六大类。[作者官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)

## 任务输入/输出/环境

- **输入**：任务指令或问题、长上下文及任务可能需要的类别/选项等信息。所有任务被整理为统一记录格式。[官方仓库数据格式](https://github.com/THUDM/LongBench/tree/main/LongBench#data-format)
- **输出**：任务特定的生成文本、答案或类别。评测脚本按不同数据集分别采用相应指标，不是所有任务都按完全相同方式评分。[官方仓库评测说明](https://github.com/THUDM/LongBench/tree/main/LongBench)
- **环境**：静态长文本输入/输出评测；仓库报告 zero-shot leaderboard，并提供模型上下文超长时从中间截断的策略。运行报告需说明模型上下文限制与截断设置。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)

## 数据规模/split/字段/文件

- 作者 README 报告 21 项任务（14 项英语、5 项中文、2 项代码），共 4,750 条测试记录；多数任务平均长度在 5k–15k。另发布 LongBench-E，用长度区间抽样分析不同输入长度下的表现。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)
- 官方任务清单逐项为：NarrativeQA、Qasper、MultiFieldQA-en、MultiFieldQA-zh、HotpotQA、2WikiMQA、MuSiQue、DuReader、GovReport、QMSum、MultiNews、VCSUM、TREC、TriviaQA、SAMSum、LSHT、PassageCount、PassageRetrieval-en、PassageRetrieval-zh、LCC、RepoBench-P。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)
- LongBench-E README 列出的 13 项为 Qasper、MultiFieldQA-en、HotpotQA、2WikiMQA、GovReport、MultiNews、TREC、TriviaQA、SAMSum、PassageCount、PassageRetrieval-en、LCC、RepoBench-P；不要把其子集条数与原版总数相加。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)
- 统一字段为 `input`、`context`、`answers`、`length`、`dataset`、`language`、`all_classes`、`_id`。长度以中文字符数、英文词数计数。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)

## 访问状态

作者 GitHub README 提供 Hugging Face 下载加载方式及各任务配置名，数据可公开访问。该基准确实复用了多个上游数据集，故公开可下载不能被解释成全部上游素材已有统一再分发许可。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)；[作者数据集入口](https://huggingface.co/datasets/THUDM/LongBench)

## 数据/代码/媒体许可与使用边界

作者仓库标注 MIT 许可证；这是仓库层面的代码许可。官方 LongBench README 对任务构造明确区分了既有来源与新构造数据：HotpotQA、2WikiMultihopQA、MuSiQue、DuReader 使用原始数据基础；NarrativeQA、Qasper、GovReport、QMSum、MultiNews 直接使用论文提供的数据；SAMSum、TREC、LSHT 等也取自既有数据集；MultiFieldQA 由多种论文、司法文件、政府报告等长文组织并人工标注；PassageRetrieval-en 涉及 Wikipedia 段落。各来源的上游许可与再分发条件并不相同。[作者官方仓库构造说明](https://github.com/THUDM/LongBench/tree/main/LongBench)；[代码许可](https://github.com/THUDM/LongBench/blob/main/LICENSE)

以下为本次逐来源权利判断边界（以作者 README 明示的来源清单为准）：

| 上游/来源 | 作者说明的关系 | 本次权利判断 |
| --- | --- | --- |
| NarrativeQA | 直接使用原论文数据 | 上游材料许可未在 LongBench README 逐项说明；待查来源许可 |
| Qasper | 直接使用原论文数据 | 上游许可未由 LongBench MIT 代码许可覆盖；待查 |
| MultiFieldQA-en / MultiFieldQA-zh | 约十类公开长文来源、作者组织问题并标注 | 每条长文来源及权利人不同；待逐条核验 |
| HotpotQA | 验证集问题及证据/干扰文档改造 | 依赖 HotpotQA 及嵌入文档来源许可；待逐条核验 |
| 2WikiMQA | 原数据基础上选证据与干扰文档改造 | 依赖上游数据与嵌入文本许可；待逐条核验 |
| MuSiQue | 原数据基础上选证据与干扰文档改造 | 依赖上游数据与嵌入文本许可；待逐条核验 |
| DuReader | 原数据基础上构造长上下文任务 | 依赖上游条款；本次未确认可再发布 LongBench 导出文本 |
| GovReport | 直接使用论文数据 | 政府报告与数据集发布条款需分别核验；未确认逐篇授权 |
| QMSum | 直接使用论文数据 | 上游会议材料/数据条款需进一步逐项确认 |
| MultiNews | 直接使用论文数据 | 新闻文章来源及上游数据条款需进一步逐项确认 |
| VCSUM | 基于原数据构造并做模板整理 | 上游来源和再分发权利未在 LongBench README 说明清楚 |
| TREC | 验证集问题及训练样本少样本上下文 | 原始语料与 LongBench 组合内容需核上游条款 |
| TriviaQA | 按文档问答方式构造 | 官方 README 指向原来源；网页/文档文本需逐条核验 |
| SAMSum | 验证集任务及少样本上下文 | 上游数据集许可需明确核对 |
| LSHT | 验证集任务及少样本上下文 | 上游数据集许可需明确核对 |
| PassageCount | 重复段落计数合成任务 | 合成任务具体文本来源/构造文件需对照固定 revision |
| PassageRetrieval-en | Wikipedia 段落及生成摘要 | Wikipedia 许可、来源署名和生成摘要链条需逐条核对 |
| PassageRetrieval-zh | C4 中文段落及生成摘要 | C4 上游与嵌入段落许可需逐条核对 |
| LCC | 代码补全任务 | 代码片段来自代码语料；仓库代码 MIT 不清除片段各自许可 |
| RepoBench-P | GitHub 仓库跨文件代码任务 | 涉及不同仓库与源文件许可；须按 repo/文件核验 |

上述表格是逐上游的状态判定，不代表尚未完成的条目已获授权。当前页面不得复制各任务原文、长上下文、代码、摘要或其截图；后续若要展示具体内容，须先固定 revision 并逐项保存上游许可证/条款、来源标识及必要归属信息。作者说明和任务来源列表见[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)；代码 MIT 许可见[LICENSE](https://github.com/THUDM/LongBench/blob/main/LICENSE)。

## 官方样例与是否可在公开 GitHub Pages 转载

LongBench 仓库展示任务模式与字段，也链接数据文件。由于数据是多上游混合，且本轮未逐一清完表中列出的上游素材许可，**公开 GitHub Pages 仅保留概述、任务名称和官方链接，不转载题面、答案、长文、文章段落、代码片段或数据截图**。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)

## 指标

各任务使用任务适配指标，官方榜单报告分类任务类别的平均分，并提供 LongBench-E 长度区间表现。官方要求按评测配置处理超长模型输入；引用分数时须注明逐任务指标、汇总方法、截断方式、提示及模型上下文窗口。[官方仓库](https://github.com/THUDM/LongBench/tree/main/LongBench)

## 版本关系

LongBench-E 是 LongBench 的长度均匀抽样评测集；它不是独立的第二个原始 LongBench 版本。LongBench v2 为后续独立版本，不能将二者数据、任务数或指标合并。[LongBench README](https://github.com/THUDM/LongBench/tree/main/LongBench)；[LongBench v2 仓库](https://github.com/THUDM/LongBench)

## 官方来源按角色分组

- **定义、任务列表、规模、字段、构造和指标**：[作者官方 README](https://github.com/THUDM/LongBench/tree/main/LongBench)；[论文](https://arxiv.org/abs/2308.14508)。
- **作者发布的数据入口**：[THUDM/LongBench Hugging Face](https://huggingface.co/datasets/THUDM/LongBench)。
- **代码许可**：[作者仓库 LICENSE](https://github.com/THUDM/LongBench/blob/main/LICENSE)。

## 模型发布引用

不同发布的 LongBench 分数取决于模型快照、提示格式、可用上下文长度、截断及逐任务评分器。引用时注明 LongBench 或 LongBench-E、数据 revision、各配置、指标和汇总方式，不把第三方重制或修订集的结果标作原版成绩。

## 未核实项

- 上表所列既有数据及嵌入文本/代码未完成逐条权利人、来源许可、署名义务和再分发条款的原件级审查。
- 本轮未固定 Hugging Face revision、逐配置记录文件哈希或审查每条 LongBench-E 派生样本的血缘。
- 各任务评分器的固定版本和第三方模型分数运行条件未逐一复核。

## 研究结论

**PASS_WITH_LIMITATIONS**：官方定义、任务数、规模、统一字段、LongBench-E 与混合数据构造方式均有第一方来源；代码仓库标 MIT。数据来自多个上游，许可不随代码许可证统一，本轮逐上游状态清单仍有待核验项。公开 GitHub Pages 只宜发布非样本性概述和官方链接，不转载题目、文档、文章、答案或代码。
