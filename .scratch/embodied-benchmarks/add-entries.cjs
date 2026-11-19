const fs = require('node:fs');
const path = require('node:path');

// 已核对的官方材料；每项入口单独保留，避免把平台、数据集和成绩混为一谈。
const rows = [
  {id:'rlbench',name:'RLBench',subtitle:'视觉引导的机器人操作任务与学习评测',publisher:'Imperial College London',year:2020,tasks:['manipulation'],url:'https://github.com/stepjam/RLBench/blob/master/README.md',data:'https://github.com/stepjam/RLBench/tree/master/rlbench/tasks',summary:'在仿真环境中评估机器人视觉引导操作，覆盖模仿学习、强化学习、多任务及少样本设置。',input:'机器人视觉观测、任务及演示，具体输入取决于实验配置。',output:'机器人动作序列，完成具体操作任务。',environment:'CoppeliaSim 与 PyRep；默认机器人可替换，任务和 variation 由配置决定。',scale:'官方 few-shot 设置含 10、25、50 或 95 个训练任务，另有 5 个测试任务。',metric:'任务成功率',measure:'按具体任务的完成条件评估；比较时须核对任务、variation、观测和训练设置。',sample:'官方任务目录提供具体任务代码；README 示例说明通过 get_demos 获取演示，本次未取得完整单条演示记录。',license:'官方软件使用定制许可，限非商业内部或学术研究；任务媒体及数据授权需另核。',resource:'官方任务目录'},
  {id:'calvin',name:'CALVIN',subtitle:'语言条件下的长步骤机器人操作',publisher:'University of Freiburg',year:2021,tasks:['manipulation','long-horizon'],url:'https://github.com/mees/calvin',data:'https://github.com/mees/calvin/blob/main/dataset/README.md',summary:'评估机器人在仿真环境中按照语言指令连续完成操作任务，以及跨环境泛化。',input:'语言指令、视觉观测和机器人状态，依实验设置而定。',output:'连续执行多个语言指定的操作。',environment:'仿真桌面操作环境；官方定义 D→D、ABC→D 与 ABCD→D 等环境划分。',scale:'官方数据说明每个环境约 6 小时遥操作 play data。',metric:'连续任务完成情况',measure:'依据连续指令序列完成情况评估；应同时报告环境划分与任务序列。',sample:'官方数据页提供各划分、debug 数据和可视化说明；本站尚未取得并核实单条轨迹。',license:'仓库代码采用 MIT；数据及媒体独立授权尚未核实。',resource:'官方数据与下载说明'},
  {id:'graspnet-1billion',name:'GraspNet-1Billion',subtitle:'真实场景中的 RGB-D 物体抓取',publisher:'GraspNet',year:2020,tasks:['manipulation'],url:'https://graspnet.net/',data:'https://graspnet.net/datasets.html',summary:'利用实物场景中的 RGB-D 数据评估机器人对物体的六自由度抓取。',input:'场景 RGB-D 图像等观测；具体形式取决于评测协议。',output:'候选六自由度抓取位姿和置信度。',environment:'真实拍摄的杂乱场景，评测包含不同对象与场景泛化条件。',scale:'官方公布 190 个场景、97,280 张图像和 88 个物体，超过 11 亿抓取位姿。',metric:'抓取平均精度',measure:'按官方抓取评测流程计算；测试场景划分为 seen、similar、novel，结果须分别说明。',sample:'官方数据页提供训练图像、抓取标签与测试图像下载；测试真值不预先公开。',license:'官方数据页许可名称与缩写表述不一致；复制图像和标签前需权利方澄清。',resource:'官方数据集下载'},
  {id:'libero',name:'LIBERO',subtitle:'机器人操作中的知识迁移与持续学习',publisher:'LIBERO Team',year:2023,tasks:['manipulation','long-horizon'],url:'https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/README.md',data:'https://huggingface.co/datasets/yifengzhu-hf/LIBERO-datasets/tree/main/libero_spatial',summary:'在多个模拟操作任务上研究机器人策略的知识迁移和持续学习。',input:'任务语言描述、相机图像与机器人状态；演示数据用于学习。',output:'机器人操作动作，按场景和目标条件完成任务。',environment:'MuJoCo 与 robosuite 仿真，包含 Spatial、Object、Goal 和 LIBERO-100 任务组。',scale:'官方 README 描述 130 项任务；LIBERO-100 中 90 项预训练、10 项用于下游持续学习。',metric:'任务成功率',measure:'按任务和评测配置统计成功；对比必须区分任务组、初始状态、随机种子与演示数据。',sample:'官方 Hugging Face 提供任务级 HDF5 演示文件；例如 libero_spatial 的黑碗放到盘子任务。站内节选另来自第三方转换集的一帧数值，非官方原始 HDF5 文件。',license:'官方 README 标注数据 CC BY 4.0；官方 HF 卡标 Apache-2.0，转换集也标 Apache-2.0，许可范围存在差异。',resource:'官方 Spatial 演示文件目录'},
  {id:'behavior-1k',name:'BEHAVIOR-1K',subtitle:'家庭场景中的长步骤具身任务',publisher:'Stanford University',year:2024,tasks:['navigation','manipulation','long-horizon','reasoning'],url:'https://behavior.stanford.edu/',data:'https://behavior.stanford.edu/challenge/dataset.html',summary:'在家庭尺度的模拟环境中评估机器人完成日常活动的能力。',input:'任务、环境观测及机器人状态；具体输入取决于所选评测协议。',output:'在环境中移动并操作物体，使任务目标条件成立。',environment:'OmniGibson 家庭场景；2026 Challenge 采用 100 个任务，与完整 1,000 项活动范围不同。',scale:'完整项目为 1,000 项活动；2026 Challenge 挑选 100 个任务。',metric:'目标条件部分成功分数',measure:'2026 Challenge 根据 BDDL 目标谓词计算部分成功，并对任务汇总；其他协议应另行核实。',sample:'Challenge 数据页和官方任务画廊提供演示入口，完整数据约 3.27 TB，须接受数据协议。',license:'代码 MIT 不代表场景资产或演示可自由转载；数据集协议与第三方资产条件需单独遵守。',resource:'2026 Challenge 数据'},
  {id:'robocasa365',name:'RoboCasa365',subtitle:'厨房环境中的机器人操作与多任务学习',publisher:'RoboCasa Team',year:2026,tasks:['manipulation','navigation','long-horizon'],url:'https://github.com/robocasa/robocasa',data:'https://robocasa.ai/docs/build/html/datasets/datasets_overview.html',summary:'在多样厨房场景中评测机器人执行原子与复合日常任务。',input:'任务指令、视觉观测与机器人状态，依具体实验协议配置。',output:'机器人动作序列，使厨房任务目标成立。',environment:'MuJoCo / robosuite 模拟厨房；区分预训练场景和保留的目标场景。',scale:'365 项任务：65 项原子任务与 300 项复合任务；官方数据概览列 2,200 小时以上演示。',metric:'任务成功率',measure:'按任务和评估设置统计 rollout 成功率；v1.0.1 将任务 horizon 调整为原来的 1.5 倍，版本不可混比。',sample:'官方 registry 提供 PickPlaceCounterToCabinet 的 pretrain、human 演示数据包；包内 episode 元数据及 MP4 需下载解压，本次尚未提取单条轨迹。',license:'官方 README 标注代码 MIT、assets 与 datasets CC BY 4.0；第三方资产和具体媒体仍应核对。',resource:'官方数据概览'},
  {id:'robotwin-2',name:'RoboTwin 2.0',subtitle:'双臂协作与机器人操作评测',publisher:'RoboTwin Team',year:2025,tasks:['manipulation','bimanual'],url:'https://github.com/RoboTwin-Platform/RoboTwin/blob/main/README.md',data:'https://robotwin-platform.github.io/doc/tasks/handover_block.html',summary:'通过双臂仿真任务评估机器人在不同具身和环境扰动下的操作能力。',input:'相机观测和任务信息；具体状态和动作空间依机器人及策略配置。',output:'协调双臂完成物体抓取、传递或放置等任务。',environment:'官方列出 50 项任务、5 种机器人具身，区分 clean 与 randomized 条件。',scale:'官方 2.0 榜单协议每任务使用 50 条 clean 演示，两个测试条件各 100 次试验。',metric:'任务成功率',measure:'按官方 clean 与 randomized 条件分别统计成功率；任务页的数据生成成功率不等于模型榜单成绩。',sample:'Handover Block 官方任务要求左臂抓取红色积木，传给右臂并放在蓝垫上；任务页还给出演示视频。本站尚未取得单条可重托管轨迹。',license:'代码许可为 MIT；HF 数据卡虽标 MIT，但第三方物体资产和视频的转载范围仍需核实。',resource:'Handover Block 官方任务与视频'},
  {id:'r2r',name:'Room-to-Room (R2R)',subtitle:'根据自然语言指令进行室内导航',publisher:'R2R Authors',year:2018,tasks:['navigation'],url:'https://bringmeaspoon.org/',data:'https://arxiv.org/abs/1711.07280',summary:'评估导航智能体在真实建筑扫描构成的环境中，依据自然语言路线指令到达目标。',input:'自然语言导航指令与环境视觉观测。',output:'依指令移动并停在目标附近。',environment:'Matterport3D 建筑扫描构成的仿真导航环境。',scale:'原论文描述 7,189 条路径和 21,567 条自然语言指令，覆盖 90 个建筑场景。',metric:'导航成功率及路径效率',measure:'比较时区分导航误差、成功率和路径长度加权成功率，并注明 seen / unseen 场景划分。',sample:'项目站提供官方演示、数据和模拟器入口；本站尚未固定原始记录版本并取得可转载样例。',license:'Matterport3D 场景资产有独立使用条款；R2R 标注与图像的再发布许可尚未逐项核实。',resource:'原始论文'},
  {id:'meta-world',name:'Meta-World',subtitle:'多任务与元强化学习的机器人操作',publisher:'Meta-World Authors',year:2019,tasks:['manipulation'],url:'https://arxiv.org/abs/1910.10897',data:'https://github.com/Farama-Foundation/Metaworld/blob/main/docs/benchmark/benchmark_descriptions.md',summary:'通过一组模拟机器人操作任务研究多任务强化学习和元强化学习。',input:'机器人和物体状态或视觉观测，取决于环境与策略设置。',output:'执行连续控制动作完成抓取、推拉、开门等任务。',environment:'MuJoCo 操作环境；MT 和 ML 协议分别定义训练任务及保留任务。',scale:'基准包含 50 个机器人操作任务；ML10 使用 10 个训练任务和 5 个保留测试任务。',metric:'任务成功率',measure:'按官方协议统计任务完成情况；对比时核对 MT / ML 协议、目标位置与软件版本。',sample:'官方任务及专家轨迹文档说明如何运行环境和获取演示；本站尚未取得可展示的具体轨迹。',license:'官方代码仓库为 MIT；场景媒体和具体数据的许可范围需另行核对。',resource:'官方任务协议说明'},
  {id:'alfred',name:'ALFRED',subtitle:'按语言指令完成室内长步骤任务',publisher:'ALFRED Authors',year:2020,tasks:['navigation','manipulation','long-horizon'],url:'https://github.com/askforalfred/alfred',data:'https://github.com/askforalfred/alfred/blob/master/data/README.md',summary:'在交互式室内仿真环境中，根据语言指令执行需要导航与物体操作的家务任务。',input:'目标与步骤语言指令、第一人称视觉观测。',output:'通过导航和物体交互动作完成任务目标。',environment:'AI2-THOR 室内交互环境；比较时区分 seen 和 unseen 场景。',scale:'官方数据说明包含 8,000 多条专家演示，每条轨迹至少对应三种语言标注。',metric:'任务成功率与目标条件完成率',measure:'完整目标条件全部满足为任务成功；另可报告部分目标条件完成率与路径长度加权指标。',sample:'官方提供 35 MB Lite 轨迹 JSON 下载及轨迹结构说明；本站尚未取得并核实单条记录。',license:'代码仓库为 MIT；演示数据、场景资产及媒体的独立转载许可尚未核实。',resource:'官方轨迹数据说明'},
  {id:'maniskill2',name:'ManiSkill2',subtitle:'物理仿真中的通用机器人操作',publisher:'ManiSkill Team',year:2023,tasks:['manipulation','navigation','bimanual'],url:'https://arxiv.org/abs/2302.04659',data:'https://github.com/haosulab/ManiSkill2/blob/main/README.md',summary:'通过多种物理仿真任务评估机器人操作策略，涵盖不同机器人、物体与物理交互。',input:'视觉或状态观测与任务配置，取决于具体环境。',output:'控制机器人完成抓取、移动、双臂或其他操作任务。',environment:'SAPIEN 物理仿真；各任务的机器人、物体实例与初始条件不同。',scale:'论文描述 20 类操作任务、2,000 多个物体模型和超过 400 万演示帧。',metric:'任务成功率',measure:'按具体环境的成功条件评估；比较时须核对任务、对象划分和版本。',sample:'旧版官方说明给出 PickSingleYCB-v0 演示下载及 HDF5 / JSON 回放流程；本站尚未取得单条演示。',license:'代码、软体组件及对象资产采用不同条款；演示视频和轨迹的再发布许可需单独核对。',resource:'ManiSkill2 旧版演示与代码说明'},
  {id:'libero-pro',name:'LIBERO-PRO',subtitle:'LIBERO 任务的多维泛化评测',publisher:'LIBERO-PRO Authors',year:2025,tasks:['manipulation'],url:'https://github.com/Zxy-MLlab/LIBERO-PRO',data:'https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro',summary:'在 LIBERO 操作任务上引入多维扰动，评估视觉语言动作模型的泛化能力。',input:'任务指令与机器人环境观测；扰动依实验配置选择。',output:'机器人动作，使操作目标在扰动条件下完成。',environment:'沿用 LIBERO 仿真环境，并改变物体、位置、语义、任务或环境。',scale:'官方定义五类核心扰动；数据卡另列七类扩展案例和 280 个 BDDL 文件。',metric:'任务成功率',measure:'按任务组与扰动条件分别报告成功率；应标明评测代码和数据版本。',sample:'官方 Hugging Face 数据集公开 BDDL 与初始状态文件；本站尚未抽取单条文件。',license:'数据卡标注数据 CC BY 4.0、代码 MIT；第三方资产仍需核对。',resource:'官方扰动配置数据集'},
  {id:'libero-plus',name:'LIBERO-Plus',subtitle:'LIBERO 上的七维鲁棒性评测',publisher:'LIBERO-Plus Authors',year:2025,tasks:['manipulation'],url:'https://github.com/sylvestf/LIBERO-plus',data:'https://huggingface.co/datasets/Sylvest/libero_plus_lerobot',summary:'通过多种可控环境扰动评估视觉语言动作模型在机器人操作中的鲁棒性。',input:'语言指令与机器人观测，具体扰动根据任务设置。',output:'执行机器人操作，在改变的场景中完成目标。',environment:'基于 LIBERO 的仿真操作环境，包含相机、机器人初始状态与语言等扰动。',scale:'官方仓库描述 10,030 个任务，覆盖七个扰动维度。',metric:'不同扰动条件下的成功率',measure:'分别报告扰动类别及总成功率；不要与原始 LIBERO 或 LIBERO-PRO 结果直接混比。',sample:'官方链接 LeRobot 训练数据；训练轨迹不等于评测成绩，本站尚未抽取样例。',license:'训练数据卡标注 MIT；其具体范围及其他资产的再发布条款尚需核对。',resource:'官方链接的 LeRobot 训练数据'},
  {id:'robotwin-1',name:'RoboTwin 1.0',subtitle:'早期双臂协作仿真与评测',publisher:'RoboTwin Team',year:2025,tasks:['manipulation','bimanual'],url:'https://github.com/Tengbo-Yu/robotwin',data:'https://arxiv.org/abs/2504.13059',summary:'利用双臂机器人仿真任务及生成式数字孪生评测操作策略。',input:'任务与相机观测，依机器人、相机和策略配置确定。',output:'协调双臂执行任务指定的物体操作。',environment:'双臂机器人仿真；仓库列举与不同真实相机对齐的设置。',scale:'官方 1.0 仓库任务表列 17 项任务。',metric:'任务成功率',measure:'仓库说明每策略测试 100 次，并对三个训练随机种子的成功率计算均值和标准差。',sample:'官方仓库提供任务表和数据收集代码；本站尚未取得 1.0 的单条演示轨迹。',license:'代码仓库标注 MIT；模型资产与演示数据许可需分别核对。',resource:'1.0 论文'},
  {id:'robocasa',name:'RoboCasa',subtitle:'原版厨房模拟任务与机器人学习',publisher:'RoboCasa Team',year:2024,tasks:['manipulation','navigation','long-horizon'],url:'https://arxiv.org/abs/2406.02523',data:'https://github.com/robocasa/robocasa',summary:'在多样厨房场景中提供机器人学习、数据生成和系统性评测任务。',input:'任务指令与模拟场景中的机器人观测。',output:'控制机器人完成厨房物体和设施操作。',environment:'原版厨房仿真环境，包含不同场景、物品与设施。',scale:'原版论文设计 100 项系统评测任务；这不等于后续 RoboCasa365 的 365 项。',metric:'任务成功率',measure:'比较时应核对原版任务、演示数据与实验设置；后续版本协议不能直接套用。',sample:'官方仓库提供数据和演示入口；本站尚未核对原版独立轨迹。',license:'当前仓库区分代码与数据资产许可；原版具体数据和第三方媒体使用范围需核对。',resource:'官方仓库与数据入口'},
  {id:'suctionnet-1billion',name:'SuctionNet-1Billion',subtitle:'面向吸盘抓取的真实场景评测',publisher:'GraspNet',year:2021,tasks:['manipulation'],url:'https://graspnet.net/suction',data:'https://graspnet.net/datasets.html',summary:'在 RGB-D 场景中评测机器人吸盘对物体的抓取。',input:'场景观测和吸盘抓取候选，依官方协议配置。',output:'预测可形成密封且能承受重力力矩的吸盘抓取。',environment:'沿用 GraspNet 的真实场景和训练测试划分。',scale:'数据和划分与 GraspNet-1Billion 相同，另提供密封、力矩和碰撞标签。',metric:'吸盘抓取评测',measure:'官方提供在线评测；具体评分口径以评测工具为准。',sample:'官方项目页提供吸盘标签、点云下载和真实机器人演示入口；本站尚未取得单条标签。',license:'官方数据页面许可名称和缩写存在不一致；复制标签或媒体前需澄清。',resource:'共享场景数据说明'},
  {id:'toto',name:'TOTO',subtitle:'离线训练、真实机器人在线测试',publisher:'TOTO Authors',year:2023,tasks:['manipulation'],url:'https://arxiv.org/abs/2306.00942',data:'https://github.com/AGI-Labs/toto_benchmark',summary:'以离线数据训练机器人策略，再在共享真实机器人上评估操作泛化。',input:'离线演示数据与机器人观测，依具体任务设置。',output:'在桌面任务中执行舀取或倾倒动作。',environment:'真实机器人评测与仿真数据资源；需区分物理测试和模拟演示。',scale:'官方仓库包含舀取、倾倒任务及其数据入口；真实数据总条数尚未核实。',metric:'任务完成情况',measure:'应按所选任务和当期真实机器人评测协议核对评分方法。',sample:'官方仓库提供真实和仿真数据包入口；本站尚未取得单条轨迹。',license:'代码仓库标注 BSD-2-Clause；数据独立许可尚未核实。',resource:'官方数据与评测仓库'},
  {id:'simpler',name:'SIMPLER',subtitle:'用仿真评估真实机器人操作策略',publisher:'SIMPLER Authors',year:2024,tasks:['manipulation'],url:'https://arxiv.org/abs/2405.05941',data:'https://github.com/simpler-env/SimplerEnv',summary:'构建与真实机器人设置相对应的仿真环境，评估操作策略并研究与真实结果的关系。',input:'仿真环境相机观测及任务设置。',output:'执行抓取、移动物体或开关抽屉等操作。',environment:'基于 SAPIEN / ManiSkill 的模拟环境，包含 Google Robot 和 WidowX 设置。',scale:'官方仓库列出多项 Google Robot 与 WidowX 操作任务，并区分环境设置。',metric:'任务成功率',measure:'任务成功率衡量单项操作；仿真与真实结果的一致性应另按论文指标分析。',sample:'官方仓库提供环境、任务代码和复现说明；本站尚未取得单条可展示轨迹。',license:'代码、仿真资产与上游数据许可范围需分别核实。',resource:'官方仿真评测仓库'},
  {id:'vlabench',name:'VLABench',subtitle:'视觉语言动作模型的具身任务评测',publisher:'VLABench Authors',year:2024,tasks:['manipulation','long-horizon','reasoning'],url:'https://github.com/OpenMOSS/VLABench',data:'https://vlabench.github.io/',summary:'通过语言条件下的操作任务评估视觉语言动作模型及具身智能体。',input:'任务语言、环境视觉观测和策略所需机器人状态。',output:'执行操作或生成任务技能序列，具体取决于评测轨道。',environment:'模拟操作任务，涉及对象、空间、常识和多步骤组合。',scale:'项目描述 100 类任务：60 类基础任务与 40 类组合任务。',metric:'成功率与任务进度',measure:'交互式策略和非交互式技能预测使用不同指标，须按轨道核对。',sample:'官方项目页展示任务示例并链接代码；本站尚未取得可确认转载的轨迹。',license:'演示媒体、数据及场景资产的转载授权尚未逐项核实。',resource:'官方项目与演示'},
  {id:'embodiedbench',name:'EmbodiedBench',subtitle:'多环境具身智能体能力评测',publisher:'EmbodiedBench Authors',year:2025,tasks:['navigation','manipulation','long-horizon','reasoning'],url:'https://github.com/EmbodiedBench/EmbodiedBench',data:'https://arxiv.org/abs/2502.09560',summary:'在多个具身环境和任务中评估多模态模型作为具身智能体的能力。',input:'任务指令及相应环境的视觉或状态观测。',output:'按环境要求输出规划或控制动作。',environment:'包含 ALFRED、Habitat、导航和操作等不同环境设置。',scale:'官方介绍 1,128 个测试任务及四个评测环境。',metric:'任务完成情况',measure:'不同环境的任务与评分条件不同；比较时应分别报告具体环境和协议。',sample:'官方代码库提供评估环境和轨迹数据入口；训练轨迹不能等同于测试集成绩。',license:'不同环境、数据和资产的授权应分别核对。',resource:'原始论文'},
  {id:'simple-embodied',name:'SIMPLE',subtitle:'人形机器人全身移动与操作',publisher:'SIMPLE Authors',year:2026,tasks:['navigation','manipulation','long-horizon'],url:'https://psi-lab.ai/SIMPLE/index.html',data:'https://arxiv.org/abs/2606.08278',summary:'在模拟环境中评估人形机器人结合全身移动与物体操作的任务。',input:'任务和机器人环境观测，依具体控制配置确定。',output:'协调移动与全身动作完成室内物体操作。',environment:'MuJoCo 物理仿真结合 Isaac Sim 渲染；不同随机化等级分别评测。',scale:'项目介绍 60 项任务、50 个室内场景及 1,000 多个物体。',metric:'任务成功率',measure:'按任务、随机化等级及 rollout 设置报告成功率，不能把仿真结果当成实机测试结果。',sample:'项目页提供任务展示、文档和轨迹生成说明；本站尚未取得可确认转载的演示。',license:'数据与媒体再发布许可尚未确认。',resource:'原始论文'},
  {id:'robotwin-early',name:'RoboTwin Early Version',subtitle:'早期双臂数字孪生与操作评测',publisher:'RoboTwin Team',year:2024,tasks:['manipulation','bimanual'],url:'https://github.com/RoboTwin-Platform/RoboTwin/tree/early_version',data:'https://huggingface.co/datasets/YaoMarkMu/robotwin_dataset',summary:'早期版本利用生成式数字孪生和专家演示研究双臂操作任务。',input:'任务配置、相机与点云等观测，依具体策略设置。',output:'控制双臂完成指定物体操作。',environment:'早期数字孪生仿真环境；论文还讨论真实机器人实验。',scale:'早期分支说明每项任务发布 50 条演示；数据包分别提供点云或 RGB-D。',metric:'任务完成情况',measure:'应按早期版本论文及任务设置核对；不要将 1.0 和 2.0 的评测设置直接套用。',sample:'官方早期分支链接按任务下载的演示数据；本站尚未取得单条演示。',license:'代码、对象资产和演示数据的独立使用许可尚未逐项核实。',resource:'早期版官方演示数据'}
];

for (const [i, r] of rows.entries()) {
  const sources = [{label:'官方项目与说明',url:r.url,role:'definition'},{label:r.resource,url:r.data,role:'data'}];
  const e = {
    id:r.id,status:'published',order:10000+(r.year-1900)*100+i,name:r.name,subtitle:r.subtitle,category:'agents',
    embodied:{tasks:r.tasks,resources:[{label:r.resource,type:'数据 / 任务',url:r.data}]},
    tags:r.tasks.map(t=>({'manipulation':'抓取与操作','navigation':'导航与移动','bimanual':'双臂协作','long-horizon':'长步骤任务','reasoning':'具身推理'})[t]),
    publisher:r.publisher,brandIds:[],year:r.year,version:r.id==='robotwin-2'?'2.0':r.id==='robocasa365'?'365 / v1.0.1':r.id==='maniskill2'?'ManiSkill2（旧版 v0.5.3）':'官方资料所述版本',kind:'original',aliases:[],researchStatus:'pass-with-limitations',
    officialDefinition:{summary:r.summary,task:r.summary,sourceUrls:[r.url]},
    taskContract:{input:r.input,output:r.output,environment:r.environment,sourceUrls:[r.url]},
    dataProfile:{summary:r.scale,disclosure:'partial',scale:[r.scale],splits:[],fields:[],files:[],sourceUrls:[r.data]},
    dataAccess:{status:'public',requirements:['以官方数据页面的下载、运行和使用条件为准。'],url:r.data,sourceUrls:[r.data]},
    reusePolicy:{status:'unknown',license:r.license,scope:'按各资源实际许可证和权利范围核对。',boundaries:[],sourceUrls:[r.url,r.data]},
    sampleAccess:{status:'official',reason:r.sample,url:r.data,sourceUrls:[r.data]},
    metric:{name:r.metric,description:r.measure,direction:'higher',sourceUrls:[r.url]},
    limitations:[{text:'不同任务、环境和评测协议的结果不能直接混合比较。',sourceUrls:[r.url]}],
    sources,related:[],verifiedAt:'2026-10-28'
  };
  const profiles = {
    'r2r':{splits:['train','val_seen','val_unseen','test_unseen']},
    'calvin':{splits:['D→D','ABC→D','ABCD→D'],files:['官方提供 split 下载脚本、debug 数据和校验和。']},
    'alfred':{splits:['train','valid_seen / valid_unseen','test_seen / test_unseen'],fields:['任务目标、语言标注、专家动作和场景设置'],files:['Lite 包含 traj_data.json；完整包另含原始图像、PDDL 和视频。']},
    'libero':{splits:['LIBERO-Spatial、LIBERO-Object、LIBERO-Goal','LIBERO-90 预训练与 LIBERO-10 下游任务'],fields:['工作区及腕部相机观测、机器人状态、任务语言'],files:['官方按任务提供 HDF5 演示文件。']},
    'robocasa365':{splits:['pretrain 和 target 场景','human 遥操作与 MimicGen 合成演示'],fields:['episode 元数据、观测、动作和相机视频'],files:['LeRobot 数据包含 Parquet、JSONL 和 MP4 文件。']},
    'libero-pro':{splits:['LIBERO-Spatial、Object、Goal 与 LIBERO-10 扰动设置'],files:['BDDL 任务定义与 init 初始状态文件。']},
    'robotwin-early':{files:['按任务提供点云包及包含 RGB-D 的数据包。']}
  };
  Object.assign(e.dataProfile, profiles[r.id] || {});
  e.embodied.resources[0].type = r.data.includes('arxiv.org') ? '论文' : r.data.includes('huggingface.co/datasets') ? '数据集' : r.id === 'rlbench' ? '任务代码' : '项目资料';
  if (r.id === 'libero') {
    const converted='https://huggingface.co/datasets/zcyqyq/libero';
    e.sources.push({label:'第三方 LIBERO 转换数据及逐帧预览',url:converted,role:'data'});
    e.embodied.resources.push({label:'第三方转换集逐帧数据',type:'转换数据集',url:converted});
    e.sampleAccess={status:'local',reason:r.sample,sourceUrls:[r.data,converted]};
    e.sampleSet={retrievedAt:'2026-10-28',samples:[{
      id:'zcyqyq-libero-train-episode-0-frame-0',title:'LIBERO 转换集：第 0 条轨迹的第 0 帧',type:'record',
      prompt:'一条仿真机器人演示轨迹在起始时刻记录了机器人状态和动作。以下数值来自第三方转换集的 train 预览；这里展示的是一帧，不代表完整轨迹或模型成绩。',promptOrigin:'editorial',
      explanation:'数据同时提供场景图和腕部图像；本站仅展示可核对的首帧数值节选。原始任务指令、全轨迹和图像需到转换集查阅。',
      raw:{timestamp:0,frame_index:0,episode_index:0,index:0,task_index:0,state:[-0.05338004603981972,0.007029631175100803,0.6783280968666077,3.1407692432403564,0.0017593271331861615,-0.08994418382644653,0.03878866136074066,-0.03878721222281456],actions:[0.01607142947614193,0,0,0,0,0,-1]},
      source:converted,license:'第三方数据卡标注 Apache-2.0；LIBERO 官方 README 标注数据 CC BY 4.0。此处引用首帧数值节选并保留来源，图片与视频未转载。',split:'train；第三方转换集，核验时 main 为 304c840',excerpt:true
    }]};
  }
  if (r.id === 'robotwin-2') {
    const leaderboard = 'https://robotwin-platform.github.io/leaderboard';
    const dataset = 'https://huggingface.co/datasets/TianxingChen/RoboTwin2.0';
    e.sources.push({label:'RoboTwin 2.0 官方榜单协议',url:leaderboard,role:'leaderboard'},{label:'RoboTwin 2.0 数据集',url:dataset,role:'data'});
    e.dataProfile.sourceUrls = [leaderboard];
    e.dataAccess.url = dataset;
    e.dataAccess.sourceUrls = [dataset];
    e.reusePolicy.sourceUrls = [r.url,dataset];
    e.embodied.taskExample = {
      title:'官方任务：Handover Block',
      steps:['左臂抓起桌上的红色积木。','将积木交给右臂。','右臂把积木放到蓝色垫上。'],
      note:'这是官方任务描述的动作顺序，不是一条已取得的演示轨迹或模型结果；视频见下方官方任务页。',
      sourceUrl:r.data
    };
  }
  if (['rlbench','libero','behavior-1k','robotwin-1','robotwin-early','robocasa','suctionnet-1billion'].includes(r.id)) e.dataProfile.sourceUrls = [r.url];
  if (r.id === 'robotwin-1' || r.id === 'r2r') {
    e.dataAccess.url = r.url;
    e.dataAccess.sourceUrls = [r.url];
    e.sampleAccess.url = r.url;
    e.sampleAccess.sourceUrls = [r.url];
  }
  if (r.id === 'robotwin-1') e.version = '1.0';
  if (r.id === 'robotwin-early') e.version = '2024 early version';
  if (r.id === 'robocasa') e.version = '2024 原版';
  if (r.id === 'suctionnet-1billion') {
    e.dataAccess.url=r.url; e.dataAccess.sourceUrls=[r.url];
    e.sampleAccess.url=r.url; e.sampleAccess.sourceUrls=[r.url];
  }
  if (['simpler','vlabench','embodiedbench','simple-embodied'].includes(r.id)) {
    e.dataAccess.status='partial'; delete e.dataAccess.url;
    e.dataAccess.requirements=['官方公开项目或论文；本站尚未逐项核实数据包及其访问条件。'];
    e.sampleAccess.status='unverified'; delete e.sampleAccess.url; e.sampleAccess.sourceUrls=[r.url];
  }
  if (r.id === 'libero-pro' || r.id === 'libero-plus') e.kind = 'derivative';
  const relations = {
    'libero':[['libero-pro','衍生评测','LIBERO-PRO 在原版任务上引入泛化扰动。','https://github.com/Zxy-MLlab/LIBERO-PRO'],['libero-plus','衍生评测','LIBERO-Plus 基于原版引入七维鲁棒性扰动。','https://github.com/sylvestf/LIBERO-plus']],
    'libero-pro':[['libero','基础评测','LIBERO-PRO 基于 LIBERO，扰动协议与原版不同。',r.url]],
    'libero-plus':[['libero','基础评测','LIBERO-Plus 基于 LIBERO，七维扰动协议与原版不同。',r.url]],
    'robotwin-1':[['robotwin-early','早期版本','早期版本和 1.0 的任务数据及评测设置需分别核对。','https://github.com/RoboTwin-Platform/RoboTwin/tree/early_version'],['robotwin-2','后续版本','RoboTwin 2.0 扩展了任务及机器人具身；评测协议应分别核对。','https://github.com/RoboTwin-Platform/RoboTwin/blob/main/README.md']],
    'robotwin-early':[['robotwin-1','后续版本','RoboTwin 1.0 与早期版本分属不同代码分支和评测设置。','https://github.com/Tengbo-Yu/robotwin']],
    'robotwin-2':[['robotwin-1','早期版本','RoboTwin 1.0 与 2.0 的任务及评测设置不同。','https://github.com/Tengbo-Yu/robotwin']],
    'robocasa':[['robocasa365','后续版本','RoboCasa365 扩展了原版的任务和数据；版本的评测条件不同。','https://github.com/robocasa/robocasa']],
    'robocasa365':[['robocasa','原版','RoboCasa 2024 原版与 RoboCasa365 的任务规模和设置不同。','https://arxiv.org/abs/2406.02523']],
    'graspnet-1billion':[['suctionnet-1billion','关联评测','SuctionNet 共享场景及划分，增加吸盘抓取标签。','https://graspnet.net/suction']],
    'suctionnet-1billion':[['graspnet-1billion','共享数据','SuctionNet 与 GraspNet 共享场景数据和划分，抓取标签及评测任务不同。',r.url]]
  };
  for (const [id,label,detail,url] of relations[r.id] || []) {
    if (!e.sources.some(source => source.url === url)) e.sources.push({label:'相关版本官方资料',url,role:'definition'});
    e.related.push({id,label,detail,sourceUrls:[url]});
  }
  if (r.id === 'alfred') {
    const archive='https://ai2-vision-alfred.s3-us-west-2.amazonaws.com/json_2.1.0.7z';
    e.sources.push({label:'ALFRED 官方 Lite 轨迹包',url:archive,role:'data'});
    e.embodied.resources.push({label:'ALFRED Lite 官方轨迹包（约 35 MB）',type:'数据集',url:archive});
    e.sampleAccess={status:'local',reason:'本站展示已下载官方 Lite 轨迹包中的一条记录的参数和步骤解读；数据许可尚未明确。',sourceUrls:[r.data,archive]};
    e.sampleSet={retrievedAt:'2026-10-28',samples:[{
      id:'trial-T20190908-122510-105385',title:'把喷雾瓶放入垃圾桶',type:'record',
      prompt:'在模拟房间中，先转身走到马桶旁，再拿起马桶水箱上的喷雾瓶，向右移动后把它放入垃圾桶。这是本站依据该条轨迹的语言标注整理的过程。',promptOrigin:'editorial',
      explanation:'官方 Lite 包中的 train 轨迹记录了专家动作与多份语言标注；本站只展示任务参数和中文过程说明，不含图像、全部动作或原始标注。',
      raw:{task_id:'trial_T20190908_122510_105385',task_type:'pick_and_place_simple',pddl_params:{object_target:'SprayBottle',parent_target:'GarbageCan',mrecep_target:'',toggle_target:'',object_sliced:false},scene:{floor_plan:'FloorPlan410',scene_num:410}},
      source:archive,license:'数据包的独立转载许可尚未核实；仅展示任务参数和本站整理的过程，完整轨迹请从官方包获取。',split:'train / json_2.1.0',excerpt:true
    }]};
    e.researchNotes=[{text:'2026-10-28 下载官方 json_2.1.0.7z 并解出 trial_T20190908_122510_105385；压缩包 SHA-256 为 c2e9e4256f94ccb2451dcaf99ff26124777eda0f256110489d1f0eaf6a3f02e9。',sourceUrls:[r.data,archive]}];
  }
  if (r.id === 'libero-pro') {
    const sampleUrl='https://huggingface.co/datasets/zhouxueyang/LIBERO-Pro/blob/e9f3a53/bddl_files/libero_spatial_lan/pick_up_the_black_bowl_between_the_plate_and_the_ramekin_and_place_it_on_the_plate.bddl';
    const lines=fs.readFileSync('.scratch/embodied-benchmarks/libero-pro-example.bddl','utf8').split(/\r?\n/);
    const goal=lines.findIndex(line=>line.includes('(:goal'));
    if (goal < 0) throw new Error('BDDL goal not found');
    e.sources.push({label:'LIBERO-PRO 固定版本 BDDL 任务文件',url:sampleUrl,role:'data'});
    e.reusePolicy={status:'permitted',license:'官方数据卡将数据标为 CC BY 4.0、代码标为 MIT。',scope:'站内任务文件节选按数据许可署名；其他场景资产另行核对。',boundaries:['场景对象和第三方素材不自动由此节选的许可覆盖。'],sourceUrls:[r.data]};
    e.sampleAccess={status:'local',reason:'站内展示官方数据集中一条 BDDL 任务文件的语言与目标条件节选。',sourceUrls:[sampleUrl]};
    e.sampleSet={retrievedAt:'2026-10-28',samples:[{
      id:'libero-spatial-lan-black-bowl-between-plate-ramekin',title:'黑碗放到盘子上 · 语言扰动',type:'record',
      prompt:'将位于盘子和小碗之间的黑碗拿起，放到盘子上。此任务属于 LIBERO-PRO 的 Spatial 语言扰动配置。',promptOrigin:'editorial',
      explanation:'官方 BDDL 文件定义了任务语言、场景物体、初始位置和目标条件。这里仅摘出原始语言与目标，省略场景配置；不是机器人执行轨迹或模型成绩。',
      raw:lines.slice(0,3).join('\n')+'\n...\n'+lines.slice(goal,goal+3).join('\n'),source:sampleUrl,
      license:'LIBERO-PRO 数据集，CC BY 4.0；依据原始 BDDL 文件节选并添加中文说明。',licensePath:'licenses/cc-by-4-0.txt',split:'libero_spatial_lan；文件版本 e9f3a53',excerpt:true
    }]};
    e.researchNotes=[{text:'2026-10-28 取得官方 BDDL 文件；文件 SHA-256 为 45bd633fc5920555eca0f8b58b4e2e8fe2c8d46c968ee4c3f7ed11d9acaeb565。',sourceUrls:[sampleUrl]}];
  }
  if (r.id === 'robocasa365') {
    const card='https://huggingface.co/datasets/nvidia/PhysicalAI-Robotics-Manipulation-Kitchen-Demos';
    const commit='https://huggingface.co/datasets/nvidia/PhysicalAI-Robotics-Manipulation-Kitchen-Demos/commit/f3b185045b416ec9e0d05b60018e538ca3c459b1';
    e.sources.push({label:'NVIDIA 厨房演示数据卡',url:card,role:'data'},{label:'NVIDIA 数据固定版本与视频文件记录',url:commit,role:'data'});
    e.embodied.resources.push({label:'NVIDIA 厨房演示数据集',type:'数据集',url:card});
    e.reusePolicy={status:'permitted',license:'NVIDIA 数据卡将该演示数据集标为 CC BY 4.0；RoboCasa 官方 README 将 assets 和 datasets 标为 CC BY 4.0。',scope:'本站所展示的视频按数据卡许可注明作者、来源和许可；其他素材仍需逐项核对。',boundaries:['视频未经修改，来自 NVIDIA 发布的固定数据版本；其他第三方素材不得据此推定可转载。'],sourceUrls:[r.url,card]};
    e.sampleAccess={status:'local',reason:'站内展示一条 NVIDIA 分发的人类遥操作仿真演示；完整轨迹和动作数据见数据集。',sourceUrls:[card,commit]};
    e.sampleSet={retrievedAt:'2026-10-28',samples:[{
      id:'adjust-toaster-oven-temperature-episode-000000',title:'调整烤面包机温度 · 演示轨迹 0',type:'video',
      prompt:'在厨房仿真场景中调整烤面包机的温度。下面的视频来自预训练数据中的人类遥操作演示；它不是模型评测结果。',promptOrigin:'editorial',
      explanation:'视频为右侧第三人称相机的一段观察记录；动作与状态数据需查看同一 episode 的其他文件。此样本来自 NVIDIA 分发的 RoboCasa 厨房数据，未将它作为模型成绩。',
      raw:{dataset:'nvidia/PhysicalAI-Robotics-Manipulation-Kitchen-Demos',revision:'f3b185045b416ec9e0d05b60018e538ca3c459b1',split:'pretrain',task:'AdjustToasterOvenTemperature',date:'20250820',episode_index:0,camera:'robot0_agentview_right',sha256:'ffa15eca205ed2b2c50e76438202b9232fed344b44fcb67569d56c30d7fa726e'},
      source:commit,license:'NVIDIA / RoboCasa 数据集，CC BY 4.0；视频未经修改，来源及固定版本见链接。',licensePath:'licenses/cc-by-4-0.txt',split:'pretrain / atomic；human demonstration；episode 000000',excerpt:true,
      assets:[{kind:'video',path:'videos/robocasa-adjust-temperature-episode-0.mp4',caption:'人类遥操作的仿真演示，右侧第三人称相机；NVIDIA / RoboCasa，CC BY 4.0。',source:commit}]
    }]};
  }
  fs.writeFileSync(path.join('content','benchmarks',`${r.id}.json`),JSON.stringify(e,null,2)+'\n');
}
