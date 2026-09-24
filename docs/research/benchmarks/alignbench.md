# AlignBench

核验日期：2026-09-23

## 官方身份

AlignBench 是清华大学 THUDM 团队提出的中文大语言模型多维度对齐评测基准；论文发表于 ACL 2024，代码和数据由作者仓库公开。[论文摘要/版本信息](https://arxiv.org/abs/2311.18743#L0-L6)；[官方 GitHub README](https://github.com/THUDM/AlignBench#L171-L187)

## 官方定义与忠实中文概述

基准用真实使用情境中的中文用户指令评估 instruction-tuned LLM 与用户意图的对齐表现。数据按八类组织，每条任务带人工核验参考答案；模型作答后由规则校准、多维度的 LLM-as-Judge 给出解释和 1–10 分评分。[论文摘要](https://arxiv.org/abs/2311.18743#L3-L6)；[官方 README：类别/评分](https://github.com/THUDM/AlignBench#L190-L204)；[官方 README：评价方法](https://github.com/THUDM/AlignBench#L234-L243)

## 任务输入/输出/环境

- 输入：一个中文开放式用户问题、该题的人工修订参考答案，知识密集型题目还含 `evidences` 来源链接和引文；评测时再提供待测模型回答。[官方 README：字段与样例](https://github.com/THUDM/AlignBench#L204-L232)；[评价方法](https://github.com/THUDM/AlignBench#L234-L243)
- 输出：评测模型对作答进行多维度分析、解释和最终评分，整体分数范围 1–10；仓库示例使用 GPT-4-0613 作 judge。[官方 README](https://github.com/THUDM/AlignBench#L234-L243)
- 运行环境：需调用目标模型生成 answers、调用 GPT-4 judge，再运行结果汇总脚本；仓库提供脚本和 config，模型 API 部署不包含在数据仓库中。[官方 README：评测步骤](https://github.com/THUDM/AlignBench#L246-L292)

## 数据规模/split/字段/文件

- 官方 README 报告共 683 条，八类数量如下：基本任务 68、中文理解 58、综合问答 38、文本写作 75、逻辑推理 92、数学计算 112、角色扮演 116、专业能力 124。[官方 README](https://github.com/THUDM/AlignBench#L190-L204)
- 每行一个 JSON 样例，文件路径为 `data/data_release.jsonl`；README 列出的字段为 `question_id`、`category`、`subcategory`、`question`、`reference`，示例另显示可选/扩展 `evidences`（含 url、quote）。[官方 README](https://github.com/THUDM/AlignBench#L204-L232)
- 论文摘要与 README 的 683 条规模一致；未见官方 train/dev/test split，使用全数据作为评测输入。[论文摘要](https://arxiv.org/abs/2311.18743#L3-L6)；[官方数据文件说明](https://github.com/THUDM/AlignBench#L204-L212)

## 访问状态

GitHub 公开仓库包含数据、评测代码、`config/`、`inference/`、`scripts/` 等目录；README 给出各阶段调用示例。[官方仓库文件清单](https://github.com/THUDM/AlignBench#L148-L164)；[官方运行说明](https://github.com/THUDM/AlignBench#L246-L292)

## 数据/代码/媒体许可与使用边界

本轮检查到的官方仓库文件清单没有列出根目录 `LICENSE`，README 亦未对数据和代码分别给出复用许可；论文可访问不等于数据集可再发布。[官方仓库文件清单](https://github.com/THUDM/AlignBench#L148-L164) 论文引用了代码和数据的公开地址，但没有在所查摘要/仓库说明中授予其数据集整体复制许可。[论文摘要](https://arxiv.org/abs/2311.18743#L3-L6) 数据中的 `evidences` 又含外部网页引文，不能推定这些第三方材料随仓库一并授权。

## 官方样例与是否可在公开 GitHub Pages 转载

官方 README 在 `data/data_release.jsonl` 的字段说明后提供“专业能力”类别 JSON 样例，其中含用户问题、参考答案及外部证据摘录。[官方 README 样例](https://github.com/THUDM/AlignBench#L204-L232) **结论：可以链接官方样例；未取得明确许可前，不在公开 GitHub Pages 复制数据集题目、参考答案或证据引文。**可展示由本站撰写的结构解释，不应把它标成原题或官方内容。

## 指标

官方方法为每题 1–10 的单点评分，先按任务类别和评价维度分析，再按规则校准得到评分；榜单还区分 overall、reasoning 与 language 等聚合维度，并列出数学、逻辑、中文理解、写作、角色扮演、专业能力等子分。[官方 README：评分](https://github.com/THUDM/AlignBench#L234-L243)；[官方 leaderboard](https://github.com/THUDM/AlignBench#L295-L320)

## 版本关系

论文最初于 2023-11-30 提交，后修订至 v4（2024-08-25，ACL 2024）。官方仓库在 2024-06-15 发布 AlignBench v1.1，对事实性问题参考答案进行人工检查修订，约 22% 的答案除修订外还补充来源网页和引文；README 使用 `data/data_v1.1_release.jsonl` 运行生成，另有 `data/data_release.jsonl` 汇总输入路径，比较结果时需明确所用快照。[arXiv 版本历史](https://arxiv.org/abs/2311.18743#L24-L30)；[官方 README 更新/数据路径](https://github.com/THUDM/AlignBench#L177-L180)；[运行指令](https://github.com/THUDM/AlignBench#L257-L263)

## 官方来源按角色分组

- **定义、构造、论文发表版本**：[arXiv 论文页](https://arxiv.org/abs/2311.18743#L0-L6)，提交时间、摘要、规模及方法。
- **数据格式、类别、样例、运行代码说明**：[THUDM/AlignBench README](https://github.com/THUDM/AlignBench#L190-L212)；[样例](https://github.com/THUDM/AlignBench#L213-L232)；[运行/评分](https://github.com/THUDM/AlignBench#L234-L292)。
- **版本修订及官方 leaderboard**：[README 更新说明](https://github.com/THUDM/AlignBench#L177-L180)；[榜单](https://github.com/THUDM/AlignBench#L295-L320)。

## 模型发布引用

论文称 ChatGLM、Qwen、DeepSeek、Yi、Baichuan、Abab 等中文模型发布方曾采用 AlignBench；这说明其被采用，不代表这些模型厂商的报告可替代官方基准定义。[论文摘要](https://arxiv.org/abs/2311.18743#L3-L6) 本轮未逐一核验厂商发布报告，故不列厂商分数。

## 未核实项

- 官方仓库未见整体数据/代码许可声明；公开 GitHub 可访问不等于允许转载。需联系作者或核对仓库后续新增的正式 license 文件。
- `data_release.jsonl` 与 `data_v1.1_release.jsonl` 的逐记录差异、数量是否完全相等及字段演进未逐行比较。
- `evidences` 引用的外部网页和示例图片是否有独立转载许可未核实。
- Judge prompt/config 中 GPT-4-0613 的温度、采样和具体聚合公式应按选定 commit 查看；摘要数据不足以复现特定榜单。

## 研究结论

**PASS_WITH_LIMITATIONS**：论文、官方仓库、类别与规模、schema、评分方法及 v1.1 变更均有第一方资料；数据集复用许可缺失，且文件版本差异尚未逐条核验。
