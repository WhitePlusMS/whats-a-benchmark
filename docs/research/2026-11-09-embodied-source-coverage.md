# 已收录具身评测的需求与官方材料补查

核查日期：2026-11-09。本文件延续[具身与跨领域需求台账](2026-11-09-embodied-demand-ledger.md)，是进行中的调研记录，不是模型实测、商业可行性结论或全部互联网内容的穷尽。项目内容以当前本地工作树为准，线上状态未核。

RoboTwin 同任务训练示范、开发者对评测成功条件的疑问、固定版本源码及现有视频判定工具的对照，见 [机器人视频与成功证据](2026-11-09-robot-rollout-success-evidence.md)。

## RLE-Bench：有人明确要求成绩附可机器读取的运行依据

- 本地 [RLE-Bench](../../content/benchmarks/rle-bench.json) 已作为机器人学习工程方向的评测条目收录。其[官方仓库](https://github.com/RLE-Bench/RLE-Bench)已有任务分类、运行和结果查看入口，因此不能说用户只能看到一个总榜。本次没有部署或运行。
- 在 [issue #7](https://github.com/RLE-Bench/RLE-Bench/issues/7)，KnownRobot 项目的维护者建议在榜单结果旁提供评测/任务/模型/执行框架版本、预算、试验次数、随机种子、制品摘要和明确缺失项，以便其他工具理解结果来源。他自述正在开发相关溯源工具，存在项目利益关联；这是一位具体工具建设者的需求，不是用户或付费规模统计。
- 同帖贡献者指出 Harbor 的 `results.json` 已记录任务与框架版本、成本和制品；提问者认可已有大部分信息，进一步询问稳定的导出和缺失字段。说明要先核对已有数据，再判断问题是缺少记录、缺少发现入口还是缺少标准化导出，不能笼统说没人提供这些数据。
- 关联 [issue #8](https://github.com/RLE-Bench/RLE-Bench/issues/8) 讨论逐次运行失败原因的汇总，贡献者于 2026-11-09 表示由 [PR #9](https://github.com/RLE-Bench/RLE-Bench/pull/9) 修复并关闭；PR 页面显示已合并。本次未运行验证。#7 与 #8 是相关讨论，不能当作两个独立客户验证。

## GM-100：同一任务，官方站已有视频、数据入口与成绩界面

- 本地 [GM-100](../../content/benchmarks/gm-100.json) 保存了任务定义、真实机器人条件、公开来源，以及“试管转移”的一段官方遥操作示范。本站原始条目没有确认该片段属于训练还是测试划分；它不是模型自主评测，也不是整个任务的成功率。文件和许可未在本轮重新核验。
- [GM-100 官方任务与榜单页面](https://www.rhos.ai/research/gm-100/results/)展示 #008 “Transferring Test Tubes”，有训练/测试入口标签，并提供机器人型号、模型与成功率/部分成功率的选择界面；页面称提供多项基线结果及视频，同时声明站点仍为预览、部分数据可能缺失。本次只确认网页可见文本，没有逐项点击、播放视频或验证标签与文件划分。
- [Embodied Data Atlas 的 GM-100 中文条目](https://embodieddataatlas.com/zh/datasets/gm100/?lang=zh)已可读取：它整理任务、设备、两种数据格式、获取入口和划分注意事项，并显示加入对比的入口；本轮未验证对比交互或逐项审计数据准确性。说明中文具身资料目录并非空白，本地内容是否更易理解仍需真实用户测试。

### 同一试管任务：样例、完成率与进度分

[GM-100 论文 v1 表 1](https://arxiv.org/html/2601.11421v1)报告 Xtrainer 真机上 #0008 试管转移任务的 π0.5 **完整成功率 66.7%**、**部分成功率 78.9%**；后者衡量任务内子步骤完成情况，不是整项任务成功的概率。论文还报告任务 0008 的离线动作预测 MSE 为 0.0007，不能把数值低直接转换成实机成功率。上述数字属于论文作者的特定平台和基线实验；本站视频来自 Cobot Magic 的一次遥操作，两者是同任务不同平台和运行，不是同一回合，也不构成本站对论文成绩的复测。

论文描述每任务收集 100 条训练轨迹和另外 30 条相似分布的测试轨迹；但[官方项目页面](https://www.rhos.ai/research/gm-100/)中，#008 的 Train 与 Test 两个可见链接当前均指向同一个 Cobot Magic 任务目录，不能仅据链接文字识别具体 episode 划分或认定两部分相同。[Xtrainer 数据卡](https://huggingface.co/datasets/rhos-ai/gm100-xtrainer)另以示例结构描述 `train/` 和 `eval/`；不同平台存储格式不同，本次未下载核对具体文件及轨迹划分。官方 Cobot 数据卡还称当前是预览，少数任务提示可能有问题，不推断 #008 一定受影响。

### 论文修订与已有第三方解读

[LingBot-VLA 论文 v3](https://arxiv.org/html/2601.18692v3) 表 1 对三种机器人报告带深度的 LingBot-VLA 平均成功率 **17.30%**，π0.5 为 **13.02%**；[v4](https://arxiv.org/html/2601.18692v4)增加 Leju KUAVO 4 Pro 的结果，四平台表中对应平均为 **16.87%**、**13.00%**。按表中显示的四平台值做简单平均，前者约 16.87%。因此 17.30% 与 16.87% 的平台范围不同，不能当作同一个固定分母上的性能变化或声称之前结果错误。v4 正文对采集仍描述三平台，第四平台的独立采集预算未明确；本次未核查原始运行记录。相关结果由 LingBot 作者团队报告，不标为 GM-100 官方独立复测。

[Superdata RobotAI 中文页](https://superdata-robotai.com/standards/gm-100/)列出约 17.3% 和 13.0% 的早期数字，但页面文字未明确三平台及论文修订；不能据此断言其必然过时或错误。[Humanoidversus 的 GM-100 页面](https://humanoidversus.com/benchmarks/gm-100)已列 v4 的平台分项、报告者、未披露字段，且把 LingBot-VLA 2.0 的九任务结果单独展示，不与全任务成绩合榜；这是实际存在的带来源条件的竞品。[中文 LingBot-VLA 2.0 论文笔记](https://www.siyuanluoembodied.xin/papers/lingbot-vla2.html)也按任务列进度和成功率及机器人平台。以上网页本轮仅读取公开文本，未验收交互或逐项复算全部表格；本轮没有找到可直接证明读者需要本站这一对照的独立访谈。

## EBiM：官方最终榜与早期 FAQ 需要按时间区分

### 真实提交中的环境依赖问题

[EBiM 的一项 Task 2 第二阶段提交讨论](https://github.com/EBiM-Benchmark/submissions/issues/36)记录：评测人员反馈视觉部分可运行，但缺少运行程序的文件、环境配置和依赖，导致机械臂未按演示动作运行；队伍随后回复称已补充代码和配置并请求再次测试。讨论记录是具体交付与复现问题，不是本站实测；本次未看到后续成功验收的明确证据，不能推断最终失败原因，也不能把该事件自动对应到比赛结果里的零分或名次。

[EBiM 仓库](https://github.com/EBiM-Benchmark/benchmark)明确开发环境中的评价代码是辅助工具，正式评分按比赛规则；[最终结果页](https://ebim-benchmark.github.io/results.html)称 Task 2、3 零分队伍由组委会在赛后按不同的动作进展顺序区分。训练视频、开发自评、真机正式得分和零分名次分别回答不同问题；这些说明官方本身已有，不能当本站独有。真机讨论与本地喂食视频属于不同队伍、任务和记录。

- 本地 [EBiM](../../content/benchmarks/ebim.json) 描述了三个任务，以及 Task 3 的训练视频，清楚标注训练记录不等于模型成绩；它引用的[官方 FAQ](https://ebim-benchmark.github.io/faq.html)页面标明 2026-08-19 更新，仍使用比赛将进行/开放提交的叙述。
- 截至本次浏览，[官方最终结果页面](https://ebim-benchmark.github.io/results.html)已公布各任务独立排名，称 Task 1 唯一第二阶段提交无法在真机运行，Task 2 与 3 有队伍排序及部分视频入口。组织方说明：少数提交在真机得到高于零的分数；对零分队伍，组委会在评估后另按任务执行进度排序。排名不等同所有队伍完成任务，也不应将赛后细则说成赛前统一约定。
- 这是本地条目和外部资料可能存在时效差的具体线索；最终结果页未在本次查到明确发布日期，不能推断其一定晚于本地 `verifiedAt`。本轮不修改评测内容：其他工作已接手样例与资料核验，应结合固定版本、保存态和素材许可统一处理。

## DexArena：分任务和跨场景统计，官方已经提供

- 本地 [DexArena](../../content/benchmarks/dexarena.json) 收录 10 个长流程任务、30 个阶段任务，并列出“打开笔记本”阶段的物理成功条件和官方人工遥操作演示；示范不代表自主模型运行结果。本轮未播放或重验许可。
- [DexArena 官方榜单](https://sipair-elastic.github.io/DexArena-website/leaderboard/)按阶段、跨场景、完整长任务分成三条轨道，公开方法比较、逐阶段结果、任务热力图入口和下载入口；页面称目前是论文基线，社区提交尚未开放。本次读取页面，没有对交互或实际运行做验收。

### 站内视频说明的内部冲突（2026-11-10）

- 本地 DexArena 的 `researchNotes` 说本站展示未经重新渲染的官网短片，而两个样例的 `license` 和视频 `caption` 又写本站进行了缩短处理；这些字段对本站操作的描述互相矛盾。样例都正确区分了遥操作阶段演示和自主模型成绩，这一边界不受该文字冲突影响。
- 对本地文件和当次官网原始预览文件计算 SHA-256：`dexarena-package-opening.mp4` 与[官网 package-opening.mp4](https://sipair-elastic.github.io/DexArena-website/assets/task-previews/package-opening.mp4)均为 `cce1d7c481747e8bf7d51649f9a128e5ed5c4d33f5ad5d78300628d438e7948a`，大小均为 109,086 字节；`dexarena-office-desk.mp4` 与[官网 office-desk.mp4](https://sipair-elastic.github.io/DexArena-website/assets/task-previews/office-desk.mp4)均为 `e5c14c58190aa11298160927da6bc9f3da2ac64d5a1dd5d7f382adc03ca3e68e`，大小均为 85,102 字节。
- 上述摘要还分别匹配[官方固定提交的素材清单](https://github.com/SIPAIR-Elastic/DexArena-website/blob/d221b76d59e9681aaf4778ccb43339f2504e13ea/src/task-preview-videos.json)中对应预览文件的 `original_output_sha256`。清单描述相关素材为人工遥操作阶段演示，并另外列出场景呈现版本；本次哈希核对的是站内指定的预览文件，不是 `/scenes/` 文件或数据集原始采集视频。**文件相同支持“本站文件与当次官方预览一致”，但不能据此证明官方制作预览前没有剪辑，也不能单凭现存文件还原整个处理历史。**
- 待后续集中维护条目时，可考虑删除无法证实的“本站缩短处理”表述并保留来源、仿真、人工遥操作及非模型成绩说明；这次仅记录证据，未修改条目、媒体、线上页面或重新审查许可。

### 同源成绩与策略描述冲突（2026-11-09 复查）

- [官网榜单](https://sipair-elastic.github.io/DexArena-website/leaderboard/)列 π0.5 长任务平均 **1.6%**、Cabinet & Pouring **2%**、Package Opening **14%**；它注明 10 个任务等权、每任务 50 episodes，称该行采用阶段策略切换。页面还称成绩是论文基线，数据导入快照为 `411442196821`、记录日期 2026-10-15，界面更新日期 2026-11-04；这些日期不能自动当作实验日期。[固定提交的结果文件](https://github.com/SIPAIR-Elastic/DexArena-website/blob/411442196821/src/paper-results.json)可追溯，但未核验其每项实验日志。
- [论文 v2 正文 A.9 与表 16](https://arxiv.org/html/2611.02629v2)却称 π0.5 每个完整任务使用合并阶段示范训练的单个模型、同一 episode 内固定检查点并切换指令；表中上述两项与平均值均显示 0。作者紧接着说明，仅四个指定任务的零成功结果已独立核实，其余任务结果尚待最终接受，显示的十任务平均也未验证；Cabinet & Pouring 和 Package Opening 均属于后者。该说明及表格已用[论文 v2 PDF](https://arxiv.org/pdf/2611.02629v2)复核，不能把待确认项目的 0 解释成已测得失败率。
- 两处**数字和策略组织文字均有差异**，可能涉及不同配置或结果快照，但仅凭公开页面不能确认原因、对应检查点或哪一组可作为最终成绩。官网注明缺少匹配的模型运行视频与日志；论文对待确认项也给出警示。不能将两处静默合并、宣布真实成绩为 0 或 1.6%，也不能据此裁定网站全站质量。本站 DexArena 条目目前只介绍评测和人工遥操作示例，未收录上述排名，因此不推断本站已有错误成绩。
- 阶段、跨场景和完整任务不是同一统计对象；前者独立重置，后者阶段间不重置。官网的跨场景 `±` 是三个场景均值之间的标准差，不是训练种子置信区间。对照案例用于考察读者能否发现来源和未确认状态，不证明市场需求或本站更易用。
- 页面所列方法中，GR00T 的阶段平均为 61.4%，完整长任务平均为 0.0%；π0.5 在对应两个轨道为 52.1% 与 1.6%。这是官方展示的特定评测结果，不是本次独立复测，不应推及其他任务或现实机器人。这个例子说明阶段与完整序列不宜混成一个能力结论，也说明官方已经提供比总分更细的分析。
- 页面将 2026-11-04 标为界面更新，明确不是新一轮评测；2026-10-15 标为论文结果导入快照，亦不是实验日期。本地文件 `verifiedAt` 为 2026-11-05；本轮未核实官方代码历史，不以界面更新日期判断本地内容是否过期。

## CodeActionBench：本地收录的同一条模型运行，官方已有逐任务对比

- 本地 [CodeActionBench](../../content/benchmarks/codeactionbench.json) 已整理任务、接口和限制，包含 `lift_pot` 的一次仿真模型运行记录，明确区分单次评测与整体成功率，并将视频留在官方页面；本轮没有逐项验证样例或许可。
- [官方页面](https://codeactionbench.org/benchmark)已有模型成绩、成功次数、任务覆盖、耗时和工具调用数，并提供具体演示、模型可见画面、部分代码与运行轨迹入口；页面同时写有完整结果“Coming soon”，不能以此推断所有数据和轨迹均已开放或可以复现。网页有中英文切换按钮，本轮未验证全部中文内容。
- [官方 Arena](https://codeactionbench.org/arena?a=agent-codex-astra) 把同一任务两个智能体的三次尝试结果并排列出。例如 `lift_pot` 页面显示 GPT-6 Astra（Codex）3/3，Opus 5（Claude Code）0/3；这是官方公布的特定配置、特定三次尝试，不是本项目实测，也不能推广到通用机器人或真实环境。对比涉及模型及其运行框架，不能把差异全部归因于模型本身。
- 与 CaP-X、Agent as Policy、SEAR、ALRM 的任务、仿真/真机及样本数对照，以及一条机械臂适配提问见[代码控制机器人专项](2026-11-09-code-action-robot-benchmark.md)；CaP-X 论文与仓库的任务规模不同，原因待核实。
- 这说明“具身任务案例＋成绩＋同题对比＋部分过程证据”在该评测中已有官方实现，并非天然独占机会。潜在区别仍可能是跨评测检索、将不同来源的口径放在一起或中文解释，但能否节省用户时间、形成持续使用尚无证据，必须与包括原站在内的替代方案实测。

## GraspNet 与 SuctionNet：共享场景不意味着成绩能互换

- 本地分别收录 [GraspNet-1Billion](../../content/benchmarks/graspnet-1billion.json) 和 [SuctionNet-1Billion](../../content/benchmarks/suctionnet-1billion.json)，均有场景及样例说明；本轮未核验本地媒体或模型表现。
- [GraspNet 官方评测页](https://graspnet.net/evaluation.html)说明 190 个场景中 100 个用于训练、90 个用于抓取测试，测试再分已见、相似新物体和新物体三个类别；它用基于物理解析的抓取姿态正确性计算精度，而非直接对每个预测都做真机抓取。页面另列 6D 姿态估计任务及不同测试划分，因此不能把两个任务的成绩混同。
- [SuctionNet 官方页](https://graspnet.net/suction)说明其与 GraspNet 使用相同场景及数据划分，但添加吸附密封、重力抗扰和碰撞相关标签，并提供吸附抓取的评估代码及真实机器人演示。数据共享不意味着平行夹爪抓取与吸盘抓取指标可直接横向排名；本次未运行代码，也未将网页演示视为独立验证。
- 实际 [GraspNet #107](https://github.com/graspnet/graspnet-baseline/issues/107) 中有人找已见/未见物体，维护者指出从场景文件和 API 查找的路径。这提示可以测试跨来源查找是否费时，但仅凭该个案不能证明需要建立新目录或有付费意愿；相关其余问题及纠正见[需求台账](2026-11-09-embodied-demand-ledger.md)。

## 对产品判断的作用

### ManiSkill3：同题项目同时展示成功率、输入差异与离线误差

本站 [ManiSkill3](../../content/benchmarks/maniskill3.json)的 PickCube-v1 遥操作样例，是官方仿真示范轨迹，原始记录标明单次成功，不是模型基准成绩。[VIRENA 固定版本 README](https://github.com/BuceaGeorgia/VIRENA/blob/00f220490874b4b50bb626eb315bba657ac22d74/README.md)的作者则对同名仿真任务报告不同模型输入的运行：腕部或外部相机、是否输入三维目标坐标、动作块设置等均会影响其结果；作者称加入目标坐标后解决了相机看不到目标的问题。这是作者的实现和实验报告，本次未运行、审计初始状态或复核置信区间，不能视作本站示范轨迹的模型成绩。

同一 README 还使用真实 SO-101 数据及仿真 ALOHA 数据做离线动作预测，分别报告验证集 MSE；作者明确这部分没有测试闭环任务成功率。即使读取真实机器人录制数据，模型的离线预测误差也不等于模型在实机执行的成功率。[作者自荐帖](https://www.reddit.com/r/learnmachinelearning/comments/1urpqn6/virena_a_minimal_visionlanguageaction_model_and_a/)还称其诊断工具曾给出错误结论后修复，这是作者自述，不等于本次验证修复有效，也提醒不能把工具自动归因当成事实。

本站和 VIRENA 都能引导读者认识同一类任务，但一个是评测资料/示范，另一个是特定策略实验与诊断工具；要理解实际差异还需对应模型、目标输入、相机、训练数据及测试设置。项目作者的发帖不是独立用户或付费意愿证据。

以上例子支持继续验证：读者可能需要知道任务视频属于训练还是评测、同一成绩的执行条件，以及榜单的版本或排序变化。与此同时，官方项目、Harbor 和垂直资料站已经提供一部分来源、视频、分项及运行字段；现有资料并非不存在。

目前没有证据表明将这些信息集中展示后会带来更高效率、持续回访或付费。可在既有 LIBERO/RoboTwin 试点之外，拿上述 GM-100、EBiM 或 RLE-Bench 作为单项对照题，让目标读者在本站与官方来源分别完成同一项具体查找，再观察实际耗时、误判与维护成本；这仍是待执行的研究设计，不是已验证结果。
# RobotArena∞：原版、360 与长流程衍生任务

核查日期：2026-11-09。本节依据公开网页、论文及本地条目；未运行仿真、模型或判分器，也未访谈读者。

本站 [RobotArena∞](../../content/benchmarks/robotarena-infinity.json)记录真实演示到仿真的配对资料，例如玩具狗入锅；它们是演示与场景示例，不是策略的实机成功率。[原论文](https://arxiv.org/html/2510.23571v3)报告两条评估路径：自动评估器参考轨迹帧及仿真状态，为各帧估计任务进度，并取末尾 30% 帧的均值；另对同场景、同初始状态及指令的视频进行人工成对偏好比较。自动进度和人工偏好不是同一指标，且模拟中的结论不能直接当作真实机器人实测。

[RobotArena∞ 360 项目](https://robotarena360.github.io/)署名与原项目存在作者重合，称从真实记录的单张参考图重建可交互仿真环境，使用编码智能体生成基于仿真状态的确定性评分程序，运行评分时不再调用模型。其[榜单方法](https://robotarena360.github.io/leaderboard/)说明 20 个任务，每项 6 次、每次最多 1,200 个仿真步，分别报告二值成功率和连续进度；这些数字不能与原版 VLM 尾段平均进度或人工偏好混同。每任务六次亦不能用全部 120 次代替某一单任务的分母。页面标明论文、arXiv 和代码“Soon”，当前证据为作者网页自述，不能宣称已独立验证或复现；本次未完成动态榜单交互验收。

360 页面称对原版的 80 段视频，与人工进度评分比较，其程序化评分和 VLM 评分 Pearson 相关系数分别为 0.88 和 0.81；这是该样本及该比较的作者报告，不是对所有真实任务或所有评估器的正确率。页面也呈现控制器、阴影和异步推理敏感性；异步实验的成功率差异区间均包含零，不能将方向直接说成已证实的总体性能增减。

本站 [LADDER](../../content/benchmarks/ladder.json)关联的 [LADDER 仓库](https://github.com/insait-institute/ladder)提供 `robotarena_long` 套件的评估入口与长流程比较；它与原版和 360 的任务范围、目标及配置需要分别核对，不能仅凭继承名称把成绩合榜。[Physical AI Lab 的原版解读](https://physicalailab.io/en/robotarena-infinity-final-window-progress-score/)已有具体的末 30% 分数计算示例和人工偏好解释，因此“把判分方法讲清楚”本身也已有竞品；未核实该文章是否具有对应中文译文。

原项目的[公开问题 #8](https://github.com/offjangir/RobotArena/issues/8)询问自动场景生成及数据创建代码的发布时间，目前页面未见答复。它是一个具体的资源获取问题，并不证明仓库无任何相关代码、提问者需要本站，或存在付费需求。

# ManiSkill：示范复现、成绩归属和同项竞品

核查日期：2026-11-09。仅依据本地条目与公开来源，未安装或运行模拟器、转换数据、训练模型或调查本站读者。

本站 [ManiSkill2](../../content/benchmarks/maniskill2.json) 展示 PickCube-v0 的官方演示 0：原始记录为 88 个动作与 89 个环境状态，控制为 `pd_joint_pos`；另一个处理版记录相同 episode 编号、seed 和步数，但控制为 `pd_ee_delta_pose`。它们是演示记录，不是独立模型成功率，也不能只因编号与步数相同就认定动作向量逐项相同。[ManiSkill3](../../content/benchmarks/maniskill3.json) 的 PickCube-v1 样例又是不同版本的遥操作数据。官方 [3.0.1 回放文档](https://maniskill.readthedocs.io/en/latest/user_guide/datasets/replay.html)说明，原始数据通常不含观测，重放可生成观测并尝试转换控制模式；不同控制器不能保证均成功转换。上述 2 代处理版与 3 代文档分别记录，不由现行文档倒推旧文件具体生成过程。

[ManiSkill #601](https://github.com/mani-skill/ManiSkill/issues/601)中，使用者报告 StackCube、PushCube 演示重放及转换的问题，并比较过不同控制模式；维护者当时称部分演示因环境改动需重新生成、StackCube 数据已重新上传。此后使用者在 `max_episode_steps=100` 仍报告训练表现差；维护者称自己看到上限设为 200 时更好并建议关注示范长度。该问题后来关闭；这些是 2024 年特定版本、设置和参与者报告，未独立复现，不能判断所有转换都失败或把 200 步当通用标准。[官方评估说明](https://maniskill.readthedocs.io/en/latest/user_guide/learning_from_demos/setup.html)目前区分 `success_once` 与 `success_at_end`，并建议对齐演示采集的 CPU/GPU 仿真后端；两种成功指标和不同步数预算不能不加说明混排。

同题资料已存在：[Embodied Data Atlas 中文页](https://embodieddataatlas.com/zh/datasets/maniskill/?lang=zh)介绍 ManiSkill3 演示格式、动作与状态长度关系、控制格式和数据来源；该页当次标示部分许可与版本字段未确认，未逐项核验其数据或比较交互。[WorldFoundry ManiSkill 页面](https://openenvision.org/WorldFoundry/docs/evaluation/benchmark-hub/maniskill)称它整理已有结果且不自行运行仿真；这也是现成的评测资料和成绩导入方案，未实际安装其工具。

对同一论文表格发现可验证的单点归属差异：WorldFoundry 页面将 PickCube 点云 **0.22** 和 RGBD **0.01** 标为从头训练的 PPO；[ManiSkill2 原论文表 2](https://arxiv.org/html/2302.04659)中这两个均值对应 **behavior cloning（行为克隆）**，分别为 0.22±0.06 与 0.01±0.02。论文表 3 则报告另一个 DAPG+PPO 实验，PickCube 分别为 0.94±0.03 和 0.91±0.05，训练预算 2500 万步。这里是按数字、任务和表注进行的单点对照，未运行训练或推断 WorldFoundry 全站质量，也未向对方报告。论文表 3 的结果不能替代任何未披露设置下的 PPO 成绩。

[Reddit 上的一位 ManiSkill 使用者](https://www.reddit.com/r/robotics/comments/1fswl22/action_space_limitation_in_robotics_simulation/)提问：自定义任务使用末端位姿动作时，某些输出超出机械臂限制而不动，怎样处理。该帖是个体的技术问题；回复建议未经本站验证，不应视为安全控制或现场解决方案，也不代表发帖者需要新的资料站。

# RoboQuest：单次样例、榜单和逐次数据快照

核查日期：2026-11-09。以下逐次结果仅对官方公开 CSV 做本地内存聚合，未运行模型或机器人，也未独立核验原始仿真轨迹。站点与仓库可能更新。

本站 [RoboQuest](../../content/benchmarks/roboquest.json)区分 Puzzle Box 开发示范、Tool-Call 训练示范和一条 GPT-6 Astra 的官方评测记录。该评测记录是 `eval50` 中实例 `059f7f6ecc3ee5e7`：表中记 80 次决策、正确提交。它不是该模型总体成功率，也没有该次运行的视频。对本站引用的[固定提交逐次 CSV](https://github.com/declare-lab/RoboQuest/blob/c2a1d3df1526850a0a4c51de1a7ad40173dc4d47/results/eval50/episodes.csv)读取 2,500 行，按 `model` 和 `task` 分组、求 `success`：GPT-6 Astra 的 Puzzle Box 为 **48/50**，十个任务合计 **116/500**；Search Room 与 Blackout Search 各为 **0/50**。这是同一份作者数据的简单汇总，不代表真实机器人表现；单条成功不能推出该模型在所有任务都成功。

该固定文件及本次读取的 [main 同路径](https://github.com/declare-lab/RoboQuest/blob/main/results/eval50/episodes.csv) SHA-256 均为 `11b917d07290da7d2288af682bbcc33c90a793508ab766f866da2d3bb5878944`，均只含 5 个模型、每个 500 行；[官网](https://declare-lab.github.io/RoboQuest/)则展示 6 个模型，并称 Gemini 4 Argon 为 119/500、Astra 为 116/500。固定和当前读取的这两个文件均没有 Argon 逐次行，GitHub 提交历史 API 本次因限流未能读取；不据此断言 Argon 结果不存在或错误，也不能用这份 CSV 验证两者逐实例配对差异。官网标示榜单更新日期为 2026-10-15；其对应的 Argon 原始数据位置及与仓库快照关系尚未确认。

官网已经展示各任务成功和进度、成本、输出时间及[失败分析](https://declare-lab.github.io/RoboQuest/analysis.html)。后者仅对 Astra、Claude Opus 5.5 和 GPT-6.1 Sol 分析，称失败中 43%–46% 的归类为未收集所需证据；作者按任务未满足项追踪首个未修复错误，再等权汇总失败回合。这是该研究定义下的仿真归因，并非所有模型或真实机器人失败原因的总体比例。官方亦指出孤立技能测试提供隐藏信息，每技能 20 个场景；不能把它与十项完整任务的成功率当成相同测试。

一位 [Reddit 读者](https://www.reddit.com/r/GeminiAI/comments/1x6gge3/gemini_4_argon_ties_with_gpt6_astra_on/)询问两个模型看似并列是否只是 10 个任务集的结果，回复者指出每任务 50 次并讨论失败原因。该问题表明有人在意排名对任务选择的敏感性，但一次提问不能证明两模型相同、差异有统计显著性或更换任务后排序如何，更不能证明对本站的付费意向。官方已经提供按任务拆分的结果，能否比官方更好地解释任务组成，仍需做读者对照。

# RLE-Bench 与跨环境 Kinex：任务、证据与状态

核查日期：2026-11-09。以下区分官网介绍、第三方发布资料和本次读取的数据索引；未运行智能体、机器人或评分器，未对网页交互及视频逐项验收。

本站 [RLE-Bench](../../content/benchmarks/rle-bench.json)针对编码智能体的机器人学习工程能力；[其介绍页](https://rle-bench.github.io/blog/)列 9 个任务族、4 类工作流、51 个任务，覆盖控制、策略训练、感知和机械设计。[另一 Kinex Benchmark Space 说明](https://huggingface.co/spaces/RLE-Bench/kinex-benchmark/blob/main/README.md)介绍跨 RoboCasa、LIBERO、RoboTwin、RoboDojo、BEHAVIOR 和 SIMPLE 的 164 任务目录，比较 Codex 与 Kinex 等设置；这些与原 RLE Index 的任务和统计口径不同，不能把 164 加到 51、当作同一版本，或把其结果直接当机器人基础策略的官方排行榜。

Kinex 说明页称提供逐任务原始判定、视频、指令、来源、执行会话、制品和历史尝试，区分 Token 子项，保留已记录的原判定及其局限；说明页同时称基准仍在进行。[数据格式说明](https://huggingface.co/datasets/RLE-Bench/kinex-benchmark/blob/main/DATA_FORMAT.md)称保留原始快照和来源，并提醒不能用上传日期推断运行版本。它与本站 [LIBERO](../../content/benchmarks/libero.json)、[RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)、[RoboDojo](../../content/benchmarks/robodojo.json)及 [SIMPLE](../../content/benchmarks/simple-embodied.json)构成同题竞争，说明逐任务视频、运行证据和协议说明已有具体方案；这些功能为对方自述，本轮未逐项验证交互、视频及正确性。

一个具体判定边界：Kinex 的任务注释称 RoboTwin `adjust_bottle` 的原成功判断未检查瓶子朝向；其链接的[固定提交代码](https://github.com/RoboTwin-Platform/RoboTwin/blob/ea8b21121ebb3cd201ff5b3fe361944ac94eda3f/envs/adjust_bottle.py#L63-L67)中 `check_success` 检查功能点的左右位置和高度，未显式检查姿态。该观察只针对所链接函数和版本；本次未运行该环境、审计全部调用或复核具体视频，不能推断所有 RoboTwin 分数错误。

**当前公开状态不一致：**Space README 称 BEHAVIOR 的 10 个任务待完成；本次用标准库读取[数据集 `main` 的 `data.json`](https://huggingface.co/datasets/RLE-Bench/kinex-benchmark/blob/main/data.json)，`updated_at` 为 2026-10-15，含 164 个任务和 328 个 `episodes` 项，两个 `variants` 都写 `completed=164`、`pending=0`，其中 BEHAVIOR 对应 20 个 episode 的 `status` 均为 `completed`，但根级 `benchmark_complete=false`、variant `state=partial`。另一个[数据集卡](https://huggingface.co/datasets/RLE-Bench/kinex-benchmark)称 `data.json` 有 680 条选中 episode；本次读到的同名文件只有 328 条。页面和动态索引可能不同步，原因未确认，不据此断言哪一处最新或所有任务已验收；需要后续以固定提交和实际报告逐条核对。

此前登记的 [RLE-Bench #7](https://github.com/RLE-Bench/RLE-Bench/issues/7)是一位相关工具维护者希望获取机器可读运行依据的实际请求；项目本身及 Kinex 均已有部分证据能力。该个体反馈与资料状态差异是调查线索，不构成独立访谈、需求规模或付费证据。

