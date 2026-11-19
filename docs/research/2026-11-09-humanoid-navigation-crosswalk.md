# 人形控制与语言导航：同题对照

调查日期：2026-11-09。比较本地条目和公开页面；未运行评测、复算图表、审核所有竞争网站数据，也没有用户访谈。站点内容可能变化。

跌倒恢复补充：[行走、恢复和约束指标](2026-11-10-locomotion-fall-recovery-demand.md)对照本地条目、开发者问题及现有仿真工具；未运行策略或评估真机安全。

## HumanoidBench：同名数字可能测不同东西

[本地 HumanoidBench 条目](../../content/benchmarks/humanoidbench.json)介绍 27 项仿真任务及不同观测配置，提供官网视频引用和一条未标训练/测试或成功结果的第三方 stand 轨迹。本轮只检查条目内容，不重新核验媒体。官方仓库说明[默认观测含环境特权状态](https://github.com/carlosferrazza/humanoid-bench)，可另行选择本体、视觉与触觉；读取特权状态的分数不能直接解释为纯摄像头真机能力。

| 公开页面 | 展示的指标 | 需要保留的边界 |
| --- | --- | --- |
| [HumanoidVersus](https://humanoidversus.com/benchmarks) | 对 HumanoidBench 的任务、机器人、模拟器和评测范围作文字概述；该条标为无记录分数。 | 有 40 条目录记录，但混合测试、比赛、数据集和标准；不能拿 40 与本站评测数比较。该网站也收录 CALVIN 等非人形专属评测并标明相关程度。 |
| [SOTA2](https://www.sota2.com/research/sota/humanoid-locomotion-and-manipulation-on-humanoidbench) | 将 WIMLE 的 0.898、0.715、0.393 等作为 IQM 列出，并分别标注 1M、500k、200k 环境步。 | [WIMLE 论文表 5](https://arxiv.org/html/2602.14351)列同样值；其 14 个 h1 任务按随机分数和目标成功分数归一化后汇总。0.898 是归一化指标的 IQM，不是 89.8% 的机器人成功率。不能直接与不同任务集、训练预算或带灵巧手配置相比。 |
| [VLA Leaderboard 的 HumanoidBench 搜索缓存](https://vlaleaderboard.com/benchmark/humanoidbench) | 页面搜索快照列 FastDSAC 在篮球与 Balance Hard 相对 FastTD3 的 180%、350%，并说明为相对回报而非绝对成功率。 | 动态页面本次正文读取为空，未验证交互。对应 [FastDSAC 论文](https://arxiv.org/html/2603.12612)摘要写 gains of 180%/350%，图注又写 final returns 1.8×/3.5× higher；这两种用语的分母及“增幅还是倍数”容易歧义，本轮未从原始数值复算，不改写成确定的提升百分比。不同任务的相对增益不应与 SOTA2 跨任务 IQM 混排。 |

例如，将 SOTA2 的 0.898 直接写作“WIMLE 完成 89.8% 任务”，或者将 FastDSAC 的 180% 当成成功率，都会改变指标含义。原论文数字本次未重新实验。第三方 [CQN-AS 运行说明](https://github.com/younggyoseo/CQN-AS)也特别区分 `h1` 和带手的 `h1hand`，并列出该项目环境依赖；不能笼统把所有 H1 结果当作同一设置。

**需求线索：**[#58](https://github.com/carlosferrazza/humanoid-bench/issues/58) 的研究者希望取得多个算法的训练日志用于比较，报告自己只找到 DreamerV3；[#68](https://github.com/carlosferrazza/humanoid-bench/issues/68)仅在标题问仿真到真机。前者是寻找原始材料的真实提问，后者细节很少；两者均没有可见答复，也没有证明愿意使用新的聚合站。

## R2R-CE：导航任务本身、划分与环境版本要对齐

### R2R、连续环境和路线忠实度

本站 [R2R](../../content/benchmarks/r2r.json) 的 `val_seen` 和 `val_unseen` 样例是带指令的**参考路径记录**，不是策略实际走过的轨迹；[R2R-CE 样例](../../content/benchmarks/r2r-vlnce.json)则是 SenseNova 的一次仿真运行，且记录其起始朝向和官方数据不同。前者的路线节点不能作为后者的执行结果；即使两者名称相近，原版使用视点图、后者迁移到 Habitat 连续环境，动作和比较协议需区分。

[R4R 原论文](https://arxiv.org/html/1905.12255)用 R2R 的路径对拼接构造更长、可能绕行的 Room-for-Room 路线，提出 CLS 评估轨迹对参考路径的覆盖和长度；该论文指出，只关注抵达目标及最短路径效率的 SPL 在绕行指令下可能偏好走捷径。CLS 衡量与给定参考路径的接近程度，并不自动证明理解语言、实际安全，或适用于所有真实路线。论文称 R2R 原参考路径为最短路，二者在 R2R 上的关系与 R4R 的绕行情况不能笼统等同。

以当前 `content/benchmarks` JSON 的名称和别名按 `R4R`、`Room-for-Room` 检索，未发现独立 R4R 条目；这不是对全文、所有别名或全网覆盖的证明。[中文《视觉语言导航研究进展》](https://www.aas.net.cn/cn/article/doi/10.16383/j.aas.c210352?viewType=HTML)已经解释 R4R 路线一致性并列 SR、CLS、SDTW 表；[SOTA2 的 R4R 页面](https://www.sota2.com/research/sota/vision-and-language-navigation-on-r4r-in-domain-unseen-portion)也整理多项指标。两者页面标注的数据范围名称不同，本次没有逐条向论文核对，不把其表格合并，也不能说中文讲解和多指标汇总是本站独有。

[VLN-CE 官方数据版本说明](https://jacobkrantz.github.io/vlnce/data)称 v1-3 修正早期版本的初始朝向，并报告同一发布基线在 `val_unseen` 的 SR 从 29 到 30、SPL 从 27 到 28；作者同时称该变化处于重复实验常见波动范围，且原有榜单路径评估不受该更改影响。这里引用的是官方历史实验，不能将本站单次样例的朝向差异等同于该 1 点变化，或断言其他模型也有相同结果。

[本地 R2R-CE 条目](../../content/benchmarks/r2r-vlnce.json)区分原版 R2R 的离散节点与 Habitat 连续环境，列训练/验证/测试划分，并记录第三方 episode 与官方验证样本初始朝向不同。单次运行的成功及 SPL 不能当成模型总体分数；本轮未复现该运行。

[VLN-CE 仓库](https://github.com/jacobkrantz/VLN-CE)已有明确的同模型差异案例：作者说明其 CMA 基线原论文的 val-unseen SPL 为 0.30，而排行榜评估为 0.27，并讨论当时硬件与 Habitat 构建对复现的影响，建议官方比较用排行榜口径。这是作者报告的单项历史比较，并非本站确认当前任意模型或环境会发生同方向变化。

已有的 [VLN 整理仓库](https://github.com/winnk123/awesome-vln/blob/main/VLN_LEADERBOARD.md)对 R2R-CE 结果分别列有无额外数据、目标先验等设置；[个人研究笔记](https://garylee1210.github.io/en/VLN-Papers/)也明确区分 R2R-CE、RxR-CE 与离散 R2R，并提醒传感器差异。这些已是现成的“按协议解释与对照”，本轮只核对页面形式及部分条目，未逐项核验分数。

[#76](https://github.com/jacobkrantz/VLN-CE/issues/76)中研究者在 2026-02 询问能否重开其认为已关闭的 VLN-CE Challenge，以便公平比较；仓库 README 又写可提交。EvalAI 目标页在本次浏览中无可读取正文，因而现状和是否可提交均未验证，不能将旧帖或 README 的描述视为当前事实。

### 单次成功、碰撞与完整评测日志

- [本站 R2R-CE](../../content/benchmarks/r2r-vlnce.json)收录一条 SenseNova 第三方 `rand100` 仿真运行，文本记录 `success=true`，并说明其 episode 起始旋转与官方 v1-3 记录不同。该样例不等于原项目的总体成绩；没有碰撞判定字段，不能由成功标记推断途中无接触或机器人可安全部署。
- [VLN-Safe 论文 v1](https://arxiv.org/html/2610.14682)在 R2R-CE `val_unseen` 的 1,839 个 episode 上，报告同一套测试系统内 6 个已发布智能体在滑动设置下的结果。作者称成功 episode 中有 **38.5%–56.8%** 至少出现一次其定义的接触；分母是各智能体的成功 episode，而非全部回合。以 OmniNav 为例，同论文表 1 报告允许滑动时成功率 67.5%，阻挡时为 31.4%；两种机制改变的是仿真环境如何处理前进动作，且论文调整了执行层，不能直接代表原作者每个公开结果，也不能推断真实机器人碰撞率。
- 论文的接触特指导航网格缩短了受命平移动作；它没有测冲击力、损坏或动态障碍物，不是安全认证。论文称分析脚本公开，但其所链接的[仓库](https://github.com/dinhhieufam/vln-safe)本次直接打开返回 404；无法据此断言永久不可用，也未取得代码或复现实验。类似名称的 [Safe-VLN](https://arxiv.org/abs/2311.02817) 是另一项研究，不应合并。
- 有实际读者希望获取比总分更细的内容：[Qwen-RobotNav #2](https://github.com/QwenLM/Qwen-RobotNav/issues/2)的提问者请求逐 episode ID、轨迹、停止位置、成功与 Oracle Success、导航误差、SPL 及逐步动作；读取时 issue 开放、无可见回复，不能据此断言项目完全没有发布过相关数据。另一 [NaVid-VLN-CE #59](https://github.com/jzhzhang/NaVid-VLN-CE/issues/59)使用者报告多 GPU 日志覆盖和重复运行分数波动；维护者称提交 `cf066cc` 已修复所指问题，提问者随后关闭 issue。其因果、当前版本与所有分数是否已修复，本次未复现。
- 不应把这些线索当作本站独有机会：[VLN 成绩整理](https://github.com/winnk123/awesome-vln/blob/main/VLN_LEADERBOARD.md)已有按离散/连续及额外数据等分组的榜单；[SimpleNav 指南](https://github.com/OpenBMB/SimpleNav/blob/main/docs/guides/VLNCE_TRAINING_AND_EVALUATION.md)提供 R2R-CE 运行配置与 SR、SPL 等汇总输出；已有[中文导航周报](https://tingdeliu.github.io/vln-weekly-2026-10-17/)也解释 VLN-Safe 的滑动/接触口径。工具文档未在本次运行，周报不是独立复测。下一步只能把“逐回合证据和条件能否帮助诊断”作为可测试假设，公开 issue 数不等于市场或付费人数。

### 发布分数实例：Qwen-RobotNav 的单目与全景

[Qwen 技术报告 v3 表 1](https://arxiv.org/html/2606.18112v3)将 VLN-CE R2R `val_unseen` 结果按观测方式分组：8B 单目为 SR **65.7%**、SPL **59.6%**，8B 全景为 SR **72.1%**、SPL **66.6%**；4B 分别为单目 **66.9% / 60.5%** 与全景 **69.5% / 63.6%**。这些是作者自报的仿真结果，不是本站实测；不能仅据两行断定视角是唯一差异原因，也不能推广为所有设备或任务的能力排序。技术报告另有在 500 条 episode 子集上的参数消融，不能与表 1 的完整划分成绩直接混排。

[Qwen 项目 README](https://github.com/QwenLM/Qwen-RobotNav)的摘要表列出 4B 和 8B 的 69.5% 与 72.1%，对应报告中的全景行，但该摘要表未在行内注明视角；仓库当次说明暂时没有发布 Qwen-RobotNav 权重的计划，具体可用性可能变化。不能仅以“开源项目有分数”判断权重可用，也不能因为摘要表不含字段就认定其论文没有披露。

[SimpleNav 成绩整理](https://github.com/OpenBMB/SimpleNav/blob/main/docs/guides/BENCHMARKS_RELEASE01.md)已经把 4B/8B 的单目和全景结果分行，列出输入、训练数据、模型大小与来源，并标注对应报告仓库无代码/权重；这里的 Qwen 数字是整理者引用的发布成绩，未证实是 SimpleNav 重新测试。其说明表中部分距离值按一位小数展示（例如 4.36 写成 4.4），不应把四舍五入当作不同实验。本地条目暂无此模型成绩，且已有单条不同团队运行样例；它们不是同一系统的逐回合证据。

## 候选方向及反例

可以用两个既有条目构造可读性实验：请研究者判断一条 HumanoidBench 数字的指标与机器人配置，或判断两条 R2R-CE 数字能否比较；记录是否需要跨原论文、代码和已有目录查找。若跨来源说明无法比现有目录更省时或更可信，就不值得大规模维护成绩库。官方文档、论文、第三方导航与榜单都已经提供部分信息，这只是待验证的资料组织机会，不是空白市场。

另外，[HumanoidArena](https://humanoidarena.github.io/)是另一套模拟人形任务，并非 HumanoidBench 的版本。静态正文可读到任务和指标说明，视频及榜单依赖 JavaScript，本次未验收具体榜单；不因同含 humanoid 就合并。Asim 项目方关于真机评测的[征求意见帖](https://www.reddit.com/r/humanoidrobotics/comments/1xok5q8/were_building_a_real_world_benchmark_for_humanoid/)是作者有商业关联的自述，而非独立需求调查。

## 补充：HumanCLAW、本站 SIMPLE 与成绩分母

2026-11-10 复查本地 `content/benchmarks` 的名称及别名，未找到 HumanCLAW 独立条目；现有[具身综合评测对照](2026-11-10-embodied-first-exam-crosswalk.md)曾提到它。它与站内 [SIMPLE](../../content/benchmarks/simple-embodied.json)、[HumanoidBench](../../content/benchmarks/humanoidbench.json)相关，但不是同一 benchmark 或同一成绩口径。

[HumanCLAW 论文 v2](https://arxiv.org/html/2607.27180v2)使用 41 个室内场景的 1,218 个回合，评估视觉语言模型通过固定技能接口做寻找、导航和交互决策。论文将 597 个床、沙发、马桶回合作为完整寻找—导航—坐下任务；621 个椅子、盆栽、电视回合只做到导航。因此 FindSR、NavSR 的分母为 1,218，InteractSR 的分母为 597；不能把网页表格中的三项百分比当成同一分母下的漏斗。这个划分也写在[固定提交配置](https://github.com/Human-CLAW/HumanCLAW/blob/6323d938795afd27d66ab926216bf4ba7b003ee6/configs/paper_fullval_v1.json)。

论文中身体由生成动作驱动，场景保留碰撞、接触和重力，但刻意抽象掉低层平衡与电机跟踪失败，用于侧重评估高层动作决策；它不是实机控制成功率，也不能用于判断真实人形机器人摔倒概率。相对地，SIMPLE 将 MuJoCo 动力学和 Isaac Sim 渲染结合，研究移动操作策略，并有特定任务的仿真与真机对照；任务、控制和样本不同，成绩不能直接混排。[SIMPLE 官网](https://psi-lab.ai/SIMPLE/index.html)给出的 sim-to-real 数字是作者报告，不能推广为所有设备或场景都能迁移。

成绩与时间也需区分：[HumanCLAW 官网](https://human-claw.github.io/)当前表中 Gemini-3.1 的 InteractSR 为 16.8%，GPT-6 的 InteractSR 为 46.6%；站方称后者是在最初九模型论文评测后新增，并使用同一框架和完整验证集。它们是作者报告的仿真成绩，交互分母是 597，不是对全体真实人形机器人的成功率估计。本次未获取原始 rollout 或复算分数。官网还提供分项表、失败过程及视频案例，固定仓库提供指标文档和运行配置；按任务解释和展示案例已有直接方案，不是本站独占。

**待核对的发布差异：**论文 v2 的 FindSR 描述为第一视角 512×512 中目标至少 100 像素；固定提交的[指标文档](https://github.com/Human-CLAW/HumanCLAW/blob/6323d938795afd27d66ab926216bf4ba7b003ee6/docs/METRICS.md)和上述配置分别写第一视角语义图及渲染分辨率为 448×448，阈值仍为 100 像素。配置另列第三视角 512×512。我们尚未获得论文实验原始配置或运行日志，不能判断是文档、历史设置或代码差异，更不能断言已发布分数有误。

**本站条目的版本口径也需标记：**SIMPLE 本地条目的 60 项来自当前项目官网；但 [SIMPLE 论文 v2](https://arxiv.org/html/2606.08278v2)摘要和附录写 16 项，附录多任务表列每级一般 20 次、DreamZero 为 10 次。两者可能对应不同资料快照或统计范围，本次没有核查 60 与 16 的任务清单映射，不能断言任一数字错误，或把论文表归为覆盖官网所述 60 项。当前只记录待核实项，未修改正式条目。

需求线索：[一位社区提问者](https://www.reddit.com/r/humanoidrobotics/comments/1w2c6g9/any_sim_benchmark_that_actually_gives_you_a/)希望知道哪些仿真评测与真实机器人表现有过对照、是否值得投入真机时间。该帖是个人提问，并非代表性用户调研；现有 SIMPLE 和其他 sim-to-real 项目已有部分回答，尚无证据说明本站更有用或有人愿意付费。

### 后续核对：SIMPLE 任务清单及使用者反馈

对 [SIMPLE 固定提交 `da33553` 的环境注册文件](https://github.com/physical-superintelligence-lab/SIMPLE/blob/da335538abd13bfc7a5f3fe1a50978c462a922c0/src/simple/envs/__init__.py)做静态 AST 统计，顶层有 31 个不同 ID 的注册调用：7 个桌面机械臂环境、11 个 `LocoManipulationEnv`、13 个 `SonicLocoManipEnv`，与同提交的[任务文档](https://github.com/physical-superintelligence-lab/SIMPLE/blob/da335538abd13bfc7a5f3fe1a50978c462a922c0/docs/source/tasks/index.md)所列数量一致。注册 ID 包含不同机器人、任务和数据采集管线，不能将 31 当作 31 个互不重叠的人形任务；没有安装运行，不能保证每个环境均能成功创建。

将[论文 v2 附录 Table 8](https://arxiv.org/html/2606.08278v2) 的 16 个任务行名，加上 `simple/G1Wholebody` 前缀和 `-v0` 后缀，与上述注册 ID 精确比较，16 个都能找到对应名称。这只证明**名称映射**，不证明当前代码的任务条件、数据或成绩与论文实验完全一致。官网声明的 60 项与已读清单的对应关系仍未找到，不能据此认定官网错误；本地条目的 60 项仍应附官网口径并待进一步核实。

用户使用问题与维护方回应：

- [SIMPLE #22](https://github.com/physical-superintelligence-lab/SIMPLE/issues/22)：使用者报告固定代码与评测数据中的少量初始场景异常，例如一个随机化等级的 10 回合中有 5 回合垃圾桶倒地或倾斜，询问这些情况如何影响跨论文比较。维护者随后称已更新相关数据并建议重新下载、另有一个任务待处理；提问者称会重试并关闭 issue，但可见记录没有其复测结论。我们未复现，无法判断现行数据、论文分数或本站样例是否受影响。
- [SIMPLE #27](https://github.com/physical-superintelligence-lab/SIMPLE/issues/27)：使用者希望将重渲染深度与已有 RGB、状态和动作逐帧对齐，报告重放画面与原图存在视角和物体位置差异。维护者建议配置深度采集并在轨迹重放时同时生成 RGB 和深度；这是作者建议，本次未核验重放一致性，不能理解成已证明与原始训练 RGB 逐帧对齐。
- [SIMPLE #23](https://github.com/physical-superintelligence-lab/SIMPLE/issues/23)：有人询问触觉数据，维护者在 2026-09 表示当时没有触觉仿真、可扩展；不能据此推断现在所有版本都不支持触觉，也不能把刚体接触仿真直接写成已有触觉传感数据。
- [Psi0 #39](https://github.com/physical-superintelligence-lab/Psi0/issues/39)：使用者在真机微调鞋子拾取任务后，报告有个别成功运行，但位置变化和恢复仍不稳定；后续比较多组自采数据。项目维护者给出具体回复，因此已有协作答疑；这属于独立使用者自述，不是本站实测、受控对照或产品需求/付费验证。

这些案例使“让读者找到数据版本、评测场景、输入模态及复现材料”成为可验证的工作假设；但上游 issue、官方文档本身已提供一部分答案，需和这些现有入口比较后才能判断新产品是否省时。
