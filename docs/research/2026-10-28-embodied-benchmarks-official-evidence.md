# 具身评测候选：官方任务、评测、数据与展示证据

核查日期：2026-10-28

## 范围与读法

本稿只记录官方仓库、项目站、数据集卡和许可证页能直接支持的事实。`main` / `master` 是可变分支；除非条目明确列出 tag、release 或数据 split，否则不能当作固定复现实验版本。代码许可不自动覆盖演示、视频帧、对象模型或数据集。官方页面提供视频或 Gallery 也不等同于授予第三方重新托管素材的权利。

“可引用/展示”分三种证据：官方公开页面链接（可以引用链接）；可依法依许可再利用的数据/媒体（需要逐项识别许可和署名）；未找到明确授权（只引用链接或自己制作概览，不复制素材）。本稿不构成法律意见。

## 汇总

| 项目 / 版本线索 | 官方任务与评测环境 | 数据 / 案例入口 | 许可证据 | 站内展示边界 |
|---|---|---|---|---|
| LIBERO：当前官方仓库 `master`；130 tasks 的扩展表述 | MuJoCo / robosuite 操作任务；Spatial、Object、Goal、LIBERO-100；官方评估脚本按 suite、task、policy、seed 等执行 | 仓库下载脚本支持下载 demonstrations；README 链接官方 Hugging Face；官方页面展示 task 文档和示例 | README 分列 codebase MIT、datasets CC BY 4.0 | 数据许可有官方声明；具体媒体/资产应逐项校验，页面 GIF 不等于可直接转载授权 |
| RLBench：官方仓库 `master`；README 历史公告含 v1.2.0 | CoppeliaSim 4.1.0 + PyRep；few-shot Task Sets 和 RL/IL、多任务等；默认 Panda，可换机械臂 | 任务目录/官方 task GIF；`get_demos(n)`可按任务生成/获取演示，未发现一个统一可下载全量 demonstrations 包 | Imperial 定制软件许可限定非商业内部或学术研究；BSD 组件另有条款 | 可链接官方任务和 GIF 页；软件许可不能证明场景模型、GIF 等第三方资产可转载 |
| CALVIN：官方仓库 `main`；README 维护过数据/任务修复 | 长时序语言条件操作；4 个环境及 D→D、ABC→D、ABCD→D 泛化划分 | 官方数据页给下载脚本、split 压缩包、debug set、校验和及数据可视化脚本 | 仓库 LICENSE 是 MIT；官方数据页未见独立数据许可 | 数据许可及第三方媒体转载权未核实；优先只链接官方可视化/数据页 |
| GraspNet-1Billion：官方数据页与评测页当前描述 | 实物 RGB-D 抓取；190 场景，100 train / 90 test（seen、similar、novel 各 30），在线评测 | 官方数据页列训练图像、标签、测试图像下载入口；官方评测/API | 官方页面的许可字符串自相矛盾：称 “Creative Commons Attribution 4.0 Non Commercial License (BY-NC-SA)” | 不应自行将矛盾改写成单一标准许可；公开链接可引，复制样本/图像须先澄清授权 |
| BEHAVIOR-1K：benchmark 1,000 activities；2026 Challenge 使用 100 tasks；challenge 指定代码 tag `v3.9.3` | OmniGibson 中 house-scale 长时序移动操作；challenge 输入 RGB+depth+proprioception，BDDL 部分成功评分 | challenge 数据页 / Hugging Face `behavior-1k/2026-challenge-demos`；官方 Demo Gallery、Leaderboard；全数据 3.27 TB | 仓库代码 MIT；核心资产来源包含 ShapeNet/TurboSquid，数据集加密以遵循各自许可，并要求接受 dataset agreement | 可引用官方 gallery/leaderboard 链接；不能从 MIT 推出资产或演示素材可任意重托管 |
| RoboCasa：原版 2024；RoboCasa365 `v1.0`（2026-02）及 `v1.0.1`（2026-05） | RoboCasa365 365 tasks：65 atomic + 300 composite；基于 MuJoCo/RoboSuite，官方 benchmark 提供原子/组合任务评估 | 官方 docs 数据 overview / download script；LeRobot 数据；官方任务页、demo、leaderboard | 官方 README 明确 code MIT，assets and datasets CC BY 4.0 | 许可允许条件须按 CC BY 履行；第三方资源与视频逐项核对，官网展示不是无限再发布授权 |
| RoboTwin：当前 README 的 RoboTwin 2.0；另有 1.0 / early-version / 2025 challenge | 双臂操作平台，2.0 官方列 50 tasks、5 robot embodiments；clean 与 randomized 两种评测条件，50 demos/task，两个条件各 100 trials/task | 官方任务页含任务说明、视频及成功率；README 指向官方数据入口并称 100,000+ demonstrations | 仓库 MIT；官方 Hugging Face dataset card 也列 MIT，但 card 内容空；第三方对象资产范围未逐项核清 | 可链接官方任务页和 leaderboard；未发现第三方复制视频/帧的 blanket permission；数据卡 MIT 不代表 Objaverse 等全部资产可任意再发布 |

## 逐项目证据

### LIBERO

- **任务与环境。** 当前官方 README 将 LIBERO 描述为知识迁移与终身机器人学习 benchmark，列 130 项任务，分 LIBERO-Spatial、LIBERO-Object、LIBERO-Goal、LIBERO-100。前三者针对特定知识转移；LIBERO-100 中 LIBERO-90 用于预训练、LIBERO-10 用于下游 lifelong learning。需保留当前 suite 名称；其他论文中常用的 4×10 标准子集不应与官方当前 130 项总数混写。
- **评测与数据。** 官方脚本 `benchmark_scripts/download_libero_datasets.py` 支持按 suite 下载，也支持 Hugging Face 路径；evaluation 脚本支持独立评估。仓库依赖 MuJoCo / robosuite；此处依据当前仓库 README，不把 floating branch 当成锁定版本。任务、数据和入口见[官方 LIBERO README](https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/README.md)及[项目站](https://libero-project.github.io/)。
- **许可证与展示。** README 的 License 表将 codebase 标为 MIT、datasets 标为 CC BY 4.0。按 attribution 条件引用许可覆盖的内容仍应保留来源、版本和许可证；README 的总括声明没有逐张视频帧/外部模型资产清单，不能证明其中所有媒体都在同一授权范围。可使用官方页面链接或自制任务概览；若要内嵌原始媒体，先检查具体数据卡与许可。

### RLBench

- **任务与环境。** 官方 README 将其定位为视觉引导机器人操作 benchmark/environment，支持 reinforcement learning、imitation learning、multi-task 和 few-shot 等使用方式。few-shot task sets 包含 10/25/50/95 个训练任务，另配 5 个测试任务；任务可设 variation。安装文档钉到 CoppeliaSim Edu 4.1.0，使用 PyRep；README 记录 2022-02-18 的 v1.2.0 breaking API 更新，当前 `master` 仍是浮动头。
- **演示入口。** 官方示例用 `task.get_demos(n)` 获得 demos；README 中的数据示例从 `DATASET` 路径读取。场景 `.ttm` 含 demo waypoints。当前核对未确认统一下载全套 demonstrations 的官方包入口。官方 task 清单和 GIF 可从[仓库 README](https://github.com/stepjam/RLBench/blob/master/README.md)跳转，任务源位于[官方任务目录](https://github.com/stepjam/RLBench/tree/master/rlbench/tasks)。
- **许可证与展示。** [官方 LICENSE](https://github.com/stepjam/RLBench/blob/master/LICENSE)是 Imperial College 的定制许可；适用软件仅限非商业的内部或学术研究。它也单独提到 BSD 组件。该许可不能扩展解释为授权重新分发第三方模型/图像或 task GIF。站内可以放官方 task/项目页链接，若要复制媒体需核对应素材的来源和许可。

### CALVIN

- **任务与评测环境。** 官方将其定位为长时序、语言条件操作策略 benchmark。数据页描述 D→D、ABC→D、ABCD→D 等环境训练/测试划分，以及每个环境 6 小时 teleoperated play data。这里的 play data 是模拟环境轨迹，不能称作真实机器人采集。详见[官方仓库](https://github.com/mees/calvin)及[官方数据说明](https://github.com/mees/calvin/blob/main/dataset/README.md)。
- **获取与版本。** 官方数据说明提供 D、ABC、ABCD split 的下载脚本/压缩包、debug dataset、SHA256 校验和及数据结构说明。官方 README 另有旧数据修复提示：不同下载时间可能对应旧 ABC/ABCD 注释、任务分布或成功条件；引用数据时需要写明 split 和采用的修正版本，不能只记为“CALVIN dataset”。
- **许可证与展示。** [仓库 LICENSE](https://github.com/mees/calvin/blob/main/LICENSE)标为 MIT，但本次核查的官方 dataset README 没有独立数据许可声明。故 MIT 只作为仓库代码许可证据，不推断下载数据或媒体可再分发。官方提供可视化脚本只证明可在本地查看，不构成站内转载授权。未核实边界：数据条目级许可、视频/帧的第三方嵌入条款。

### GraspNet

- **任务与评测。** 官方页面将 GraspNet-1Billion 描述为 190 个杂乱场景、97,280 张图像、88 个对象和超过 11 亿抓取位姿。官方评测划分为 100 train、90 test；test 按 30 seen、30 unseen but similar、30 novel scenes 划分，并采用 online evaluation，不预先公开 test ground truth。见[官方首页](https://graspnet.net/)、[数据页](https://graspnet.net/datasets.html)、[评测页](https://graspnet.net/evaluation)。
- **下载入口。** 官方数据页列 train images、6DoF grasp/collision labels、test_seen 与 test_similar 等包，以及网盘下载入口和 API 文档。GraspNet-1Billion 的结果不要和同站其他独立项目（如 AnyGrasp、SuctionNet）合并成同一 benchmark。
- **许可冲突。** 数据页原文把许可写成 “Creative Commons Attribution 4.0 Non Commercial License (BY-NC-SA)”，名称与缩写无法一致映射到一个确定标准。本文保留原始矛盾并把许可状态视为需要权利方澄清；不要自行改成 CC BY-NC-SA 或 CC BY-NC。公开页面本身可链接；转载图像或标签样例需确认授权范围。来源为[官方数据页许可段](https://graspnet.net/datasets.html)。

### BEHAVIOR-1K

- **任务规模与版本。** 项目总 benchmark 是 1,000 个日常活动；2026 Challenge 当前页面选取 100 个长时序家务任务，单独设评测协议。2026 challenge baselines 当前要求使用 BEHAVIOR-1K `v3.9.3`；更新页曾为早期 evaluation workflow 指定 `v3.9.2`，并记录数据字段/资产兼容修复。复现实验时应按目标页面的 tag，不把历史指引与当前 baseline 指引混用。来源：[项目站](https://behavior.stanford.edu/)、[challenge 评测规则](https://behavior.stanford.edu/challenge/evaluation.html)、[当前 baselines](https://behavior.stanford.edu/challenge/baselines.html)、[updates](https://behavior.stanford.edu/challenge/updates.html)。
- **评测与数据。** 2026 单轨允许 RGB、depth、proprioception 作为输入，禁止评测期使用模拟器特权信息；排名以 100 task 的 BDDL goal predicate 部分成功分数平均。官方 demonstrations 在 Hugging Face `behavior-1k/2026-challenge-demos`，官方说明数据总计约 3.27 TB，按 task chunk 取用。[dataset 页面](https://behavior.stanford.edu/challenge/dataset.html)和[Demo Gallery](https://behavior.stanford.edu/challenge/tasks/index.html)提供官方案例/浏览入口。
- **资产/许可。** GitHub [LICENSE](https://github.com/StanfordVL/BEHAVIOR-1K/blob/main/LICENSE)是 MIT 代码许可。官方文档说明对象/场景资产来自 ShapeNet、TurboSquid 等，分发数据集加密以遵循原权利条款；下载器会要求接受 dataset agreement。不得把 MIT 代码许可外推到 dataset assets，亦不要抓取/转载经加密许可约束的资产。官方[asset sources](https://behavior.stanford.edu/behavior_components/asset_sources.html)列出了来源与使用说明；challenge gallery/leaderboard 可作为链接式引用，第三方媒体复制授权未由已核页面单独确认。

### RoboCasa / RoboCasa365

- **版本区分。** RoboCasa 原始版本发布于 2024；RoboCasa365 是 2026 发布的扩展版本，官方 README 在 v1.0 记录 365 tasks、2,500+ kitchen scenes、3,200+ objects 和 demonstration data；v1.0.1（2026-05）调整各任务 horizon 为 1.5 倍。不同版本的数据体量与评测不可互换。依据[官方 GitHub README](https://github.com/robocasa/robocasa)和[官方文档站](https://robocasa.ai/docs/build/html/index.html)。
- **任务、评测与数据。** RoboCasa365 包含 65 atomic 和 300 composite tasks；官方 benchmark overview 提供多任务等评估流程和 held-out 设置，target tasks 分 seen/unseen，随机多次 rollout 汇报成功率。官方数据采用 LeRobot 格式，下载脚本支持按 pretrain/target、human/MimicGen 和 task 筛选。[数据概览](https://robocasa.ai/docs/build/html/datasets/datasets_overview.html)、[下载说明](https://robocasa.ai/docs/build/html/datasets/using_datasets.html)、[benchmarking overview](https://robocasa.ai/docs/build/html/benchmarking/benchmarking_overview.html)。
- **许可与案例。** 官方 README 明确区分 code MIT 与 assets/datasets CC BY 4.0；官方 docs 和 leaderboard 展示任务/数据使用案例。按 CC BY 使用需保留归属、许可及修改说明；此许可证据仍不能替每项第三方内容（如对象模型、嵌入媒体）作统一清权。宜先以任务页链接和自制概要呈现，复制演示视频/帧前核具体资源许可。

### RoboTwin

- **版本与任务。** 当前官方 README 标为 RoboTwin 2.0，并把 RoboTwin-1.0、early version、2025 Challenge 分开；2.0 是主仓库 `main` 的可变状态，页面提供日期版本线索，不等同不可变发布 tag。官方项目介绍 2.0 为双臂操作平台，50 tasks、5 种机器人 embodiment，含 clean 与 domain-randomized 设置。[官方 README](https://github.com/RoboTwin-Platform/RoboTwin/blob/main/README.md)、[项目站](https://robotwin-platform.github.io/)、[官方任务清单](https://robotwin-platform.github.io/doc/tasks/)。
- **评测与数据。** 官方 leaderboard 协议以 Aloha-AgileX 为数据设置，每 task 使用 50 clean demos；clean / randomized 两条件各运行 100 次并列出 clean-to-clean、clean-to-random 及均值。README 称提供 100,000+ trajectories，指向 Hugging Face 数据集及下载脚本；该规模声明应作为仓库当前说明引用，不代表已独立核验文件数量/哈希。[官方 leaderboard](https://robotwin-platform.github.io/leaderboard)、[HF 数据页](https://huggingface.co/datasets/TianxingChen/RoboTwin2.0)。
- **许可与展示。** [仓库 README](https://github.com/RoboTwin-Platform/RoboTwin/blob/main/README.md)和[LICENSE](https://github.com/RoboTwin-Platform/RoboTwin/blob/main/LICENSE)支持代码 MIT；HF 数据集元数据列 MIT，但数据卡正文为空，因此数据许可范围与逐文件资产链尚未由卡片说明充分解释。官方任务页公开视频与成功率表，说明可链接引用这些官方页面；本次没有发现许可明确授予第三方站点重托管任务视频/画面的条款。因对象资产包含第三方来源对象，不能用代码或数据卡 MIT 一概覆盖所有模型/媒体。

## 收录或展示前仍需逐项核实

1. 固定不可变版本：仓库 tag/commit、数据 split、数据卡 revision、文件 hash；对当前 `main`/`master` 明确记录抓取日期。
2. 具体嵌入媒体：源 URL、版权所有者、逐项许可、署名字段、允许修改/缓存/重托管范围。官方页面展示只能证明页面本身公开，不自动证明第三方复制权。
3. GraspNet：权利方澄清官方页面许可名称与缩写矛盾。
4. CALVIN：数据许可和媒体转载条款；其代码 MIT 不应当作数据授权。
5. BEHAVIOR：按挑战版本确认 dataset agreement、加密资产约束、Hugging Face 数据卡及各资产来源要求。
6. RoboTwin：当前数据卡内容为空；对 dataset license 的范围、第三方对象资产和视频媒体的再利用授权进行单独核验。

## 官方来源目录

- LIBERO：[Repository](https://github.com/Lifelong-Robot-Learning/LIBERO) · [Project](https://libero-project.github.io/)
- RLBench：[Repository](https://github.com/stepjam/RLBench) · [License](https://github.com/stepjam/RLBench/blob/master/LICENSE)
- CALVIN：[Repository](https://github.com/mees/calvin) · [Dataset documentation](https://github.com/mees/calvin/blob/main/dataset/README.md)
- GraspNet：[Project](https://graspnet.net/) · [Datasets](https://graspnet.net/datasets.html) · [Evaluation](https://graspnet.net/evaluation)
- BEHAVIOR-1K：[Project](https://behavior.stanford.edu/) · [Challenge](https://behavior.stanford.edu/challenge/index.html) · [Repository](https://github.com/StanfordVL/BEHAVIOR-1K)
- RoboCasa：[Repository](https://github.com/robocasa/robocasa) · [Docs](https://robocasa.ai/docs/build/html/index.html)
- RoboTwin：[Repository](https://github.com/RoboTwin-Platform/RoboTwin) · [Project](https://robotwin-platform.github.io/)
