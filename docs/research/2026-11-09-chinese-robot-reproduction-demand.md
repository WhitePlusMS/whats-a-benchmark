# 中文机器人复现：具体问题、现有资料与成绩边界

调查日期：2026-11-09。基于本地条目、公开问题和作者报告；未运行模型、播放或审核全部轨迹、访问用户或核实其身份。个案反映存在具体工作，不代表市场规模、网站留存或付费意愿。

## 公开开发问题

[RLinf #1388](https://github.com/RLinf/RLinf/issues/1388) 中，一位中文提问者自述在 RoboTwin 的 `hanging_mug` 任务复现 STEAM，原有监督数据 1,000 条、另加 100 条 rollout（其中 25 条成功）时成功率提高 7%，但增加 rollout 后反而降低，询问训练数据与正负样本比例。其具体配置、日志、对照试验和下降原因未由本站核验。

该讨论不只有疑问：一位协作者回复称，他们的实验没有观察到明确同样趋势，建议检查低质量轨迹并分享训练曲线；讨论者也提出数据量公平对照问题，作者回复解释 STEAM 与后续 CFGRL 阶段使用数据的区别，并称 RECAP 比较也使用含失败的 rollout。上述均为线程参与者观点和作者解释，不把讨论中的具体调参建议当作普适方案，也不推断报告者最终解决问题。当前问题是模型训练与复现工作流，并非其本人要求新的 benchmark 百科。

## 同一检查点：官方值与第三方中文复现

本站 [LIBERO](../../content/benchmarks/libero.json) 是基准资料而非统一模型成绩库。[openpi 官方固定版本 README](https://github.com/Physical-Intelligence/openpi/blob/15a9616a00943ada6c20a0f158e3adb39df2ccac/examples/libero/README.md) 报告 `pi05_libero` 微调检查点四套件成绩；[中文复现记录固定提交](https://github.com/GUOHC803/pi05-libero-reproduction/blob/7dd41eb68bc8b1feb1883544a48f5cce0279d1d9/README.md)称使用同一官方检查点、每任务 50 次试验，自报环境与四个套件结果。

| LIBERO 套件 | 官方 README | 复现作者报告 | 差值（复现减官方，百分点） |
| --- | ---: | ---: | ---: |
| Spatial | 98.8% | 98.2% | −0.6 |
| Object | 98.2% | 98.8% | +0.6 |
| Goal | 98.0% | 97.0% | −1.0 |
| Long / LIBERO-10 | 92.4% | 93.8% | +1.4 |
| 四项平均 | 96.85% | 96.95% | +0.10 |

两份 README 的官方数值一致，平均值差 0.1 个百分点，但分项差异有正有负。复现作者列 openpi、LeRobot 修订和自用补丁；本次未审计权重哈希、任务种子、运行日志或逐项环境一致性，不能将平均值相近说成严格同协议或证明任意第三方可复现。模型数据、指标与版本信息已经由官方和第三方公开，跨来源对照不是无人做。

同一中文仓库自报微调后干净 Spatial 为 99.2%，其扰动小节列改写指令 92.5%、物体位置扰动 90.0%；作者以 99.2% 计算差值，但 README 将前者列为每任务 50 次、消融列为每任务 20 次。它们不是公开证明相同初始状态下的配对试验，不应把差值直接解释为单一扰动导致的精确因果效应，也不是官方 LIBERO-Plus 总榜成绩。

另一位作者在[固定提交的中文记录](https://github.com/ZhihaoZhang01/openvla-libero-spatial-finetune/blob/3f8c8e0ba928967549b3d74015962892a6885314/README.md)展示 OpenVLA 多个实验的成功/失败视频和自述原因，并称对同一 `pi05_libero` 的 LIBERO-Spatial **前三个任务各 10 次全部成功**。30/30 只适用于其列出的配置、任务和试验，不能当完整 10 任务套件成功率；录像和模型配置尚未由本站验证。

## 已有中文资料及产品含义

[机器人知识库 VLA 评测导航](https://kb.platorobotics.ai/6-eval/VLA/)已有常见基准中文介绍、官方出处和看榜时的样本量、训练条件及仿真/真机提醒；页面自身说明部分内容由 Claude 整理并提醒回查原文。此处只是核对该资料的存在和呈现，未将生成式内容当一手事实，也未使用网页 GPT 做评审。

[具身开发者社区榜单](https://robotics.hellobike.com/leaderboards/)已经展示部分 LIBERO 模型的套件成绩、来源与输入配置；本项目可以尝试围绕“复现的是哪个 checkpoint、哪些任务、多少次、训练和评测设定是否一致”提供资料导航，但真实问题可能需要脚本、数据与具体调试，单纯页面解释并不能替代。

可测试的读者任务：给两段上面的 π0.5 描述，请读者判断 30/30 能否代表完整 LIBERO-Spatial，以及两份四套件平均值是否意味着分项完全一致。应同时提供官方、复现仓库和现成中文资料作对照；目前没有进行此测试或验证访问量。

## 补充：一位中文作者从资料调查转向动手复现

[一篇中文工程记录](https://zdwktlj.top/projects/openvla-libero/)的作者表示此前整理过多个 VLA 模型与评测，但希望实际运行 OpenVLA；他自报用 Kaggle T4 运行 LIBERO-Spatial 的 10 个仿真任务，记录了依赖、图像处理、环境启动等问题。这说明至少这一位作者认为介绍资料不足以替代动手实践，并非对所有中文读者的判断。本文没有运行其环境或核验日志。

作者报告 4-bit 为 **32/50（64%）**、8-bit 为 **23/30（76.7%）**，另列 84.7% 为论文数字而非自己跑出的 bf16 结果；他也主动指出先前仅测两个任务的 83.3% 不代表完整 10 任务。每个任务的试验次数很少，4-bit 与 8-bit 分母不同；虽然作者认为量化是差距主因，本次未找到足以独立核对所有种子、逐次结果和控制变量的材料，不能把他的归因当作已证实结论，也不能据某任务几次失败就断言模型在该任务上必然失败。

现成中文资料已有较强的操作深度：[StarVLA LIBERO 文档](https://starvla.github.io/docs/zh-cn/benchmarks/libero/)提供其检查点、环境、运行流程和反归一化配置；[云飞机器人中文维基](https://yfrobotics.github.io/robowiki-cn/simulation/robot-learning-benchmarks/)已有选环境、实验记录、控制时钟和统计解释。本次仅核对文档内容，未实测命令或保证文档准确。StarVLA 页面所述的四套件 40 项是其选定评测范围，而 [LIBERO 原仓库](https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/README.md)另介绍总计 130 项和 LIBERO-100 的 90/10 划分；不可把两个范围误读成互相推翻。

[LoongForge 中文评测指南](https://loongforge.readthedocs.io/zh-cn/latest/embodied_tutorial/eval_user_guide.html)还按模型、LIBERO／CALVIN／SimplerEnv／RoboTwin／ManiSkill 列配置和支持情况，明确其中“任务成功”只表示至少一个 episode 通过对应判定，不等于整套基准的成功率；未评分的部分组合使用随机初始化验证 RPC。它是面向实际运行的既有替代资料，本次未安装或验证其运行。[All Agent 百科的一篇中文比较](https://www.allagent.wiki/blog/embodied-foundation-models-one-week/)也将三个具身模型的任务数量、仿真榜单成绩及预测误差分开，标明成绩来源和部分未披露项；此次只核对其内容呈现，未逐条复核各厂商数字或开源状态。

对本站的含义：可以让评测条目连接**对应套件、检查点、具体复现步骤和结果分母**，但这些链接与说明已经有作者和中文文档提供；需要验证读者是否真的能更快找到正确材料。公开作者的动机不代表其需要本站，也不是留存或付费证据。

## 补充：套件命名容易混淆，但解释资料已有替代品

[中文具身学习资料的固定版本](https://github.com/Dld0621/Embodied-AI-Zero-to-Hero/blob/fe24aaaeffb844ff03bf6c1fc09b298e94db8b43/docs/05-interview-prep.md)在 Q40 将 LIBERO 描述为 130 个任务，却把 Spatial、Object、Long、LIBERO-10 分列为四个套件，没有列 Goal。这与 [LIBERO 官方 README](https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/README.md)对 130 项的划分不一致：官方列 Spatial、Object、Goal、LIBERO-100，后者再分 90/10；[ActionMap 作者的评测文档](https://github.com/showlab/ActionMap/blob/main/actionmap_oft/LIBERO.md)所用四个评测套件则是 Spatial、Object、Goal、Long，并将 Long 对应 `libero_10`。两种说法的范围不同，不应把 Long 与 LIBERO-10 算成两个不同套件，也不能把这四个常用的 10 任务评测套件称作总共 130 项。本站 LIBERO 条目已列出官方划分，但没有明确写出 Long 这一常见别名。

这只是一个公开教程中的具体问题，不代表其全部内容错误，也不能证明用户会因此选择本站。已有 [Bifrost 的 LIBERO 复现指南](https://www.bifrost.ai/blog/how-to-run-libero-evaluation/)解释 LIBERO-10 与 Long、列成绩及运行条件，并推广其产品，竞争已经延伸到复现指南。另一方面，[官方仓库 issue #68](https://github.com/Lifelong-Robot-Learning/LIBERO/issues/68)中有开发者提出 Goal 任务排列顺序的设计疑问；该问题本次查看时无公开回复。这是具体阅读疑问，但不是对本站的需求或付费承诺。本次未运行评测，也没有联系提问者。

## 2026-11-10：中文排障库与两条同题原始证据

[具身开发者社区](https://robotics.hellobike.com/)不仅列 LIBERO 成绩，还组织模型、数据集、硬件和[排障条目](https://robotics.hellobike.com/pitfalls/)。主页本次显示 880 条排障，而本次读取排障页显示筛选结果 866；页面会更新，统计或缓存口径未确认，不把两个数字合并当做已核验的独立故障数、真机数或使用人数。目录标注部分内容为 AI 摘要，需回查来源；本次只读来源，不使用网页端 GPT 评审。

- **与本站 LIBERO 的连接已有实际深度。**该站将 [FastWAM × LIBERO 问题整理为中文条目](https://robotics.hellobike.com/pitfalls/2026-10-27-lerobot-5116)，链接 [LeRobot #5116](https://github.com/huggingface/lerobot/issues/5116)。报告者称，特定 checkpoint 修订的预处理和模型内部都做图像归一化，导致仿真评测异常；其自报 0/2 冒烟和修改预处理后的 2,000 回合是不同规模及条件，不能把二者当严格控制的效果证明。报告者称后者用自己的 harness、按回合噪声及 fp32，不能当作官方统一成绩或真实机器人表现。
- [LeRobot PR #5121](https://github.com/huggingface/lerobot/pull/5121)于 2026-10-28 合并，修改文档中的 checkpoint 链接并解释预处理约束；PR 作者声明没有重跑 LIBERO，已有成绩表未改变。**这是文档引用的修正，不是本站已重测、模型问题在所有版本均已修复，或所有其他 checkpoint 都受影响。**两份固定版 checkpoint 的配置内容，本次网页读取失败，仅记录原 issue 和 PR 的报告，不称已经自行核对配置文件。
- **“有绕过办法”不自动证明原问题已解决。**该站 [SmolVLA 复现页](https://robotics.hellobike.com/pitfalls/2026-10-25-lerobot-5082)为既有 [LeRobot #5082](https://github.com/huggingface/lerobot/issues/5082)提供中文摘要、排查建议、来源、机型和模型关联；原帖描述 SO-101，网页列出的 PiPER、FR3、G1 为关联机型，不应写成原帖已在这些机器复现。原帖评论提出多个可能方向，尚不足确认唯一原因；相关 [PR #5091](https://github.com/huggingface/lerobot/pull/5091)当次仍 Open，内容是在统计量替换时增加警告，不改变该数值流程，且没有跑完整 SmolVLA 训练和原始私有数据。网页的“有绕过办法”和列表的“已验证排障方案”不能替代复现证据。
- **同一来源也应保留现场条件差异。**[Unitree R1 排障页](https://robotics.hellobike.com/pitfalls/2026-11-04-unitree-rl-mjlab-51)汇总 [原 issue #51](https://github.com/unitreerobotics/unitree_rl_mjlab/issues/51)中的参数建议。原帖实际是一名使用者提问，另一名评论者自报对一台空载悬挂机器人测量，并提醒加载状态不同；另一个评论者称还看到相差较大的测量。无官方最终结论和本站实测，不能把这些值写成所有 R1 的标准参数或直接作为真机调参建议。该案例与本站 [HumanoidBench](../../content/benchmarks/humanoidbench.json)的人形仿真方向相关，但不属于其官方评测成绩。

这三个案例显示，中文“评测资料＋配置＋问题＋相关硬件”已有具体替代，同时来源状态、作者身份、版本及是否实测会影响读者判断。可测试本站是否能更清楚区分“问题报告／待验证建议／已合并文档修正／实际复测结果”，但目前尚无读者对照、用户留存或付费证据。不能因外站标签可能概括过度就认定本站总体更准确。

## 2026-11-10：中文综述、实际复现与训练教程的交叉核查

[《具身智能模型评测：从感知到执行》](https://castjournals.cast.org.cn/joweb/zgtxtxxb/CN/1322960864705393559)是一篇中文期刊综述，按静态、仿真和真机组织评测，并列任务、指标、对象和规模；它说明系统化中文评测介绍已有公开替代，不是开发者对本站的需求访谈。论文作者包含上海人工智能实验室人员，其文中亦关联 OpenCompass 具身评测资料，不能把两者简单计作互不关联的独立产品。

对综述表 4 的 **29 个数据行**，逐行摘录名称，与本地所有 `status=published` 的 benchmark JSON 顶层 `id`、`name`、`aliases` 做 Unicode NFKC、小写化并仅保留字母数字后的完全匹配，得到 **5 行名称命中**：RLBench、Meta-World、LIBERO、ManiSkill3、RoboCasa。其余 24 行未被该机械规则命中；例如论文写 `RoboTwin 2.0 Benchmark`，本地另有 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)，只是完整字符串不同。GRUtopia 两个子项与主项分作不同行，Isaac Gym 等也可能是平台或混合资源，因此 5/29 不是版本完全一致的数量，也不是本站、该论文或行业的评测覆盖率；未命中不等于本站确实缺失。原始全表和论文分类须逐项核对，不能自动批量导入。

一个需要回到原文的口径：综述真机评测表列出 `VLABench` 的“100 个任务 + 2 000 个物体”和 Franka；[VLABench 论文第 3.3 节](https://arxiv.org/html/2412.18194)明确其框架建立于 MuJoCo 和 dm_control，物体库为 3D 资产。本站 [VLABench 条目](../../content/benchmarks/vlabench.json)也将操作环境描述为仿真，并区分预训练轨迹与静态 VLM 评测。因此不能仅因综述表标题就断定上述 100 类任务的成绩来自真机；此处未穷举项目后续真机实验，也不以单点推断整篇综述准确性。

[OpenDM 固定提交的中文 RoboTwin 2.0 指南](https://github.com/dexmal/opendm/blob/03f799120d425ead51d9482bb1da950b6dabade9/docs/zh/dm05_robotwin2.md)已经给出 DM0.5 检查点、三路相机顺序、绝对动作、训练配方、环境和结果保存方法，且列自报 Clean 93.6、Randomized 93.3。该文的参考训练配置为 4 机每机 8 卡，这是该配方的训练要求，不可泛化为所有 RoboTwin 测试或推理的硬件门槛。文中明确每个任务、每种设置 100 个 episode，若按其步骤覆盖 50 个任务及两种设置，是 **50 × 2 × 100 = 10,000 个 episode**；其训练数据的 100 个加权视图是 50 个任务乘两种设置，不是 100 个不同任务。本次未运行指南或重算成绩。

[FastWAM issue #23](https://github.com/yuantianyuan01/FastWAM/issues/23) 中，开发者称使用发布的 `robotwin_uncond_3cam_384.pt` 得到 64.7%，低于他所引述论文的 91.8%；维护者回复应核查依赖、CUDA、GPU 和使用的 RoboTwin 版本。后续一位评论者自称将 SAPIEN 从 3.0.3 换为 3.0.0b1 并调整 setuptools 后解决了自己的问题，但无法据此判定最初提问者的差距原因，也未独立重跑或确认所有成绩设置。

相邻的 [FastWAM issue #65](https://github.com/yuantianyuan01/FastWAM/issues/65)属于**自行训练检查点**而非直接运行上述发布检查点：提问者称已使用 SAPIEN 3.0.0b1，仍出现较低分数，怀疑训练批量等因素；未验证因果。既有 [RoboTwin 图像与复现核查](2026-11-09-robotwin-image-contract-and-reproductions.md)已保存其逐项与平均结果。中文 [Resilient 复现指南](https://github.com/Morimorerain/Resilient/blob/main/README.zh-CN.md)还给出了 FastWAM 的固定版本、资产校验、逐级测试和完整 10,000 回合命令；这是作者报告的现成方案，本次未安装或验收，也不意味着其完整 RoboTwin 复现结果已经完成。

产品含义：围绕同一评测同时连接“哪份指南、哪个检查点、多少任务与回合、模拟器和训练条件、问题是否有已验证修复”可以形成具体阅读任务；但中文操作指南、issue 聚合及版本说明已有竞争者，这些帖子也不能证明作者会使用本站或付费。下步须与现有资料做真实用户任务对照，验证查找和判断是否更快、更准确。

## 2026-11-10：兼容矩阵、原始来源及已有部署手册

[具身开发者社区的模型与真机兼容矩阵](https://robotics.hellobike.com/compat/)本次显示 132 条关联；它明确说明依据模型卡和论文的作者声明整理，**并非第三方复现**，也提供模型、机器人及来源入口。训练、微调和部署混在同一个矩阵的收录范围里，有关联不等于模型开箱即可控制目标机器人。132 是页面显示的动态记录数，不是已独立验证的真机部署数。

逐条核查发现一个明确错误：[该站 piper-voices 模型档案](https://robotics.hellobike.com/models/vlad-grig-piper-voices)将 `vlad-grig/piper-voices` 描述为机器人策略并关联松灵 PiPER 机械臂，还给出 LeRobot 推理命令；其所链接的 [Hugging Face 原模型卡](https://huggingface.co/vlad-grig/piper-voices)明确标为 Text-to-Speech，说明它是 Piper 语音文件镜像。两者说法不符，不应据该条记录或命令判断机器人兼容。这只是一个已核对条目，不能估算整站错误率，也不能仅凭名称相同确定产生错误的内部机制；页面今后可能更新。

这与上一节 SmolVLA 的接口差异共同说明：可追溯需要核对来源是否真正支持具体主张，例如核实实体身份、具体 checkpoint、训练或真机部署类别、输入输出与版本。**但这只是可测试的质量控制方向，并不是证明本站现有数据更准或用户愿意为此付费。**本次没有运行该命令、评估模型或控制机器人。

竞争者也不只提供目录。[VLA-Handbook 真机部署目录](https://github.com/sou350121/VLA-Handbook/blob/main/deployment/README.md)已按硬件、标定、同步、仿真、迁移与社区问题组织资料，并自述汇集中文笔记、英文社区材料和 GitHub issues，还提醒区分作者自述、论文转述与编辑建议；数量为作者自报，本次未逐条核验。若本站做中文资料或问题索引，必须与这类现成资源比较，不能把中文、来源链接或踩坑汇总当作独占能力。

