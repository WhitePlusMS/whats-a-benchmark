# LiveCodeBench Pro

核验日期：2026-09-23

## 官方身份

LiveCodeBench Pro 是研究者提出的动态竞赛编程评测，论文链接其项目 leaderboard、评测代码和题集。本文专指带有“Pro”的 olympiad/竞赛题基准，不与 LiveCodeBench 原版（LeetCode、AtCoder、Codeforces 多能力 benchmark）混为一谈。[LiveCodeBench Pro 原论文及项目入口](https://arxiv.org/html/2506.11928)

## 官方定义与忠实中文概述

题目来自 Codeforces、ICPC、IOI 系列并持续更新；研究团队在比赛进行期间采集，尽量早于 accepted solutions、editorials 或讨论上线。除自动判题结果外，竞赛编程专家/奥赛奖牌获得者对算法类别与失败原因做细粒度标注。论文将其设计目标表述为降低污染、检视竞赛级代码推理。[论文摘要与 §1–2](https://arxiv.org/html/2506.11928)

## 任务输入/输出/环境

- 输入：竞赛题目、公开样例和程序约束；具体运行时向模型提供的工具取决于评测设置。论文主体报告的主要模型测试为无外部工具；附录单独研究终端/搜索等工具的影响。[论文 §1、§8、§11](https://arxiv.org/html/2506.11928)
- 输出：可提交的程序；官方在线判题给出 Accepted/Rejected 等二值结果，模型生成多样本时才以 pass@k 分析。官方论文说明主结果的主要度量为 pass@1。[论文 §7、§13](https://arxiv.org/html/2506.11928)
- 官方论文链接的评测代码 README 要求 Docker/受控 judge 环境；其被链接的 GitHub 仓库提供自行实现模型接口并加载 Hugging Face 题集的工具说明。[论文项目链接](https://arxiv.org/html/2506.11928)；[论文链接的评测仓库](https://github.com/GavinZhengOI/LiveCodeBench-Pro)

## 数据规模/split/字段/文件

- 论文在 2025-04-25 前记录 584 道题，来源 Codeforces、ICPC/IOI 系列及其他指定竞赛；难度 Easy（官方 rating ≤2000）、Medium（2000–3000）、Hard（>3000）。[论文 §1–2、表 2](https://arxiv.org/html/2506.11928)
- 论文链接的 Hugging Face 题库仓库目前以 Parquet 格式列出，文件需要登录并接受联系信息共享条件后访问，页面暂未显示 dataset card 内容；论文没有公开 train/dev/test split 定义。[论文题集链接](https://arxiv.org/html/2506.11928)；[链接到的题集页面](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)
- Hugging Face 页面标注 Apache-2.0，但此 metadata 标签不能替代题目来源站点对原始题面/测试的条款，也不能视为竞赛主办方授权。复现须记录下载到的数据 revision、题目来源/比赛标识、judge/testset 版本、是否可联网/用工具和采样数。[题集页面](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)；[论文题目采集与测试流程](https://arxiv.org/html/2506.11928#S7.SS1)

## 访问状态

论文可公开阅读，并链接评测代码与 Hugging Face 题集。当前题集页面虽公开可见，但文件访问要求用户同意共享联系信息；页面 Dataset card 内容为空。不能把它描述成无需条件下载的开放题库。[论文项目链接](https://arxiv.org/html/2506.11928)；[Hugging Face 题集页面](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)

## 数据/代码/媒体许可与使用边界

**必须区分三个许可层次：**（1）Hugging Face 数据卡 metadata 标为 Apache-2.0；（2）论文链接的工具仓库未在文件列表中显示 LICENSE，不能据此认定工具代码可按 Apache 或 MIT 转载；（3）题面/比赛测试来自 Codeforces、ICPC、IOI 等第三方主办方，数据卡 Apache 标签本身不足以证明这些原始竞赛内容均由汇编者取得再分发权。没有发现作者对外部竞赛题目的统一转载授权声明。本站应只作自行撰写的概述并指向论文/官方页面，不复制题面、完整样例或 hidden tests。[论文链接的代码仓库](https://github.com/GavinZhengOI/LiveCodeBench-Pro)；[题集许可证与访问条件](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)；[论文所列题源](https://arxiv.org/html/2506.11928#S7.SS1)

## 官方样例与是否可在公开 GitHub Pages 转载

论文附有按题型的样例说明，并链接原始 contest/problem 页面、human accepted submissions 与模型失败提交。[论文 §15](https://arxiv.org/html/2506.11928#S15) **不将论文样例、源站题面或提交代码复制到本站；可以用原创概述说明题目挑战，并链接论文和原题来源。**作者发布论文样例不等于赋予第三方竞赛题面与代码再发布许可。

## 指标

- **pass@1**：一次生成结果通过官方判题的题目比例，是论文指定的主要结果指标。[论文 §13](https://arxiv.org/html/2506.11928#S13)
- **pass@k**：附录用于观察多次尝试对通过率的影响；并非论文的唯一/主要默认指标。须同时披露 k、采样数、是否允许工具及题目版本。[论文 §3.3、§13](https://arxiv.org/html/2506.11928)
- **Codeforces-equivalent Bayesian Elo**：在 Codeforces 子集上，以题目 rating 与 Accepted/Rejected 提交结果估计模型 Elo，可调整难度并映射到人类 rating/percentile。它与 pass@1 是不同统计量；模型在全 benchmark 的 percentile 或跨赛制结论应注明估计范围。[论文附录 §7.2](https://arxiv.org/html/2506.11928#S7.SS2)

## 版本关系

论文称题集持续更新；可核实的论文统计快照是截至 2025-04-25 的 584 道题。Hugging Face 仓库的当前文件与页面 metadata 是滚动状态，尚未在其 dataset card 展示正式语义版本/split。引用分数应标注题集 revision/抓取日期及运行协议，不能直接沿用论文快照作现行总题数。[论文 §1 与 §7.1](https://arxiv.org/html/2506.11928)；[题集页面](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)

## 官方来源按角色分组

- **benchmark 定义、584 题论文快照、难度、指标、题源及项目链接：**[LiveCodeBench Pro 论文](https://arxiv.org/html/2506.11928)。
- **论文链接的评测工具说明：**[GavinZhengOI/LiveCodeBench-Pro](https://github.com/GavinZhengOI/LiveCodeBench-Pro)；仅作为工具仓库说明，不假定其与benchmark数据拥有相同许可。
- **论文链接的题集、当前 access gate 与 license metadata：**[Hugging Face 题集页面](https://huggingface.co/datasets/QAQAQAQAQ/LiveCodeBench-Pro)。
- **论文链接的 leaderboard：**[LiveCodeBench Pro leaderboard](https://www.livecodebenchpro.com/)。

## 模型发布引用

论文报告多个模型的分难度 pass@1、Elo-equivalent rating、在人类参赛者中的 percentile、平均 token 和估算成本。表格对应作者特定日期/题目快照和推理设置；模型发布材料引用时要标出 LiveCodeBench Pro 及其版本/日期、工具条件与指标口径，不能把 Pro 成绩混成原版 LiveCodeBench 分数。[论文表 1 与 §8](https://arxiv.org/html/2506.11928)

## 未核实项

- 当前 Hugging Face 数据访问协议的全文、数据包内部 schema 与各竞赛资源的逐项再分发许可；页面要求先登录/同意，但 Dataset card 为空。
- 作者题目仓库是否曾发布独立代码 LICENSE，当前 GitHub 文件列表未显示该文件；在未确认前不得将代码包装仓库认作 permissive licensed。
- 当前滚动题集的题数、revision、testset 完整性和 leaderboard 跑分是否仍对应论文 584 题快照。
- 竞赛站点的源题条款及不同主办方的题面/测试所有权需逐来源审核。

## 研究结论

**PASS_WITH_LIMITATIONS**：作者一手论文清楚定义 LiveCodeBench Pro、584 题（截至 2025-04-25）、题源、主要 pass@1 与 Elo 分析；论文链接到评测代码和当前 gated 题集。题集页面的 Apache-2.0 metadata、工具代码许可和第三方竞赛内容权利不能合并推断。公开 Pages 宜仅用原创说明和官方链接，不镜像题目或测试。
