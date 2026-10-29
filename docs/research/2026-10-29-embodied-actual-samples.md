# 具身评测真实样例取证记录

核查日期：2026-10-29。以实际下载并读取的记录为准；演示、轨迹、候选标注、单次结果与汇总评测成绩不是同一种数据。部分数据来自第三方格式转换，已在条目中标明；许可证及资产范围以原始来源为准。

## Meta-World

- 样例：把螺母套到销钉上 · 演示轨迹 0。这三帧来自 LeRobot 转换的 Meta-World MT50 训练数据，帧 0、44、87 属于同一 episode；末帧成功标记为 true。它是单次轨迹数据，不能当成模型汇总成功率；原始数值中的图像链接已替换为本站对应文件名和校验值。
- 来源：https://huggingface.co/datasets/lerobot/metaworld_mt50/tree/b46a1c185a2368660650a82ac5a5083a56722f48
- 范围：train / episode_index 0 / task_index 0
- 使用条件：LeRobot metaworld_mt50 数据集卡标注 Apache-2.0；图像未修改，按来源标注和许可使用。
- dataset：`lerobot/metaworld_mt50`
- revision：`b46a1c185a2368660650a82ac5a5083a56722f48`
- 取证：2026-10-29 取得数据集版本 b46a1c185a2368660650a82ac5a5083a56722f48 的 train 轨迹 0，第 0、44、87 帧及相应原始状态与动作；三帧的 SHA-256 记录在样例原始数据中。

## Room-to-Room (R2R)

- 样例：从卧室到房间隔断附近。这是 val_seen 划分中 path_id 5593 的一条导航路径；原始记录包含三条英文指令。本站展示路径参数和中文说明，未转载场景图像或完整原文。
- 来源：https://www.dropbox.com/s/8ye4gqce7v8yzdm/R2R_val_seen.json?dl=1
- 范围：val_seen / path_id 5593
- 使用条件：R2R 标注数据的独立转载许可尚未核实；此处展示路径参数及本站整理的说明，完整记录见官方文件。
- 取证：2026-10-29 下载官方脚本指向的 R2R_val_seen.json，共 340 条路径；文件 SHA-256：755633db9d5e64d5ca71d329c5046bb722781a09f0d1d501d7e8d094c83652ec。

## VLABench

- 样例：选择方块 4 扑克牌 · 轨迹 0。实际文件包含 81 帧和三个相机视角；这里展示 image 视角的第 0、40、80 帧，以及相应状态和动作。原始指令来自同版本任务索引。这是训练轨迹，不是模型成绩，也不据最后一帧推断成功。
- 来源：https://huggingface.co/datasets/VLABench/vlabench_primitive_pretrain_lerobot/blob/aaa042a8ffb56c931ad738bd220c0c944d8479e7/data/chunk-000/episode_000000.parquet
- 范围：train / episode_index 0 / task_index 0
- 使用条件：VLABench 官方训练集数据卡标注 MIT；按来源注明发布方和版本。
- dataset：`VLABench/vlabench_primitive_pretrain_lerobot`
- revision：`aaa042a8ffb56c931ad738bd220c0c944d8479e7`
- file_sha256：`179a139b7352c575a9b265581a421f0518f231de41800c5a29ec34b4aaa4d854`
- 取证：2026-10-29 实际下载固定版本 episode_000000.parquet，大小 45,390,259 字节，SHA-256 179a139b7352c575a9b265581a421f0518f231de41800c5a29ec34b4aaa4d854；数据卡标 MIT，未找到独立版权声明文件。

## EmbodiedBench

- 样例：导航至面包 · 模型轨迹节选。此记录来自官方发布的多步模型轨迹，而非人类示范。原始文件对整条 episode 记录 success=1.0；这只是该条记录的字段，不是模型在整个基准上的总成绩。本站未转载模型原始文本和图像。
- 来源：https://huggingface.co/datasets/EmbodiedBench/EB-Nav_trajectory_dataset/blob/c8e0ed66aa62432267ba19f59d87fe9724c18f45/eb-nav_dataset_multi_step.json
- 范围：base / episode 1 / multi-step
- 使用条件：数据集未标明明确的转载许可；展示记录编号、动作编号和结果等事实及本站整理说明，完整内容见来源。
- 取证：2026-10-29 下载官方多步轨迹 JSON（61,267,651 字节），共 3,300 条记录；文件 SHA-256 c620e62e13e709592c5c5b57d8d38aeea02e7b89d39080033540e4cc46d29014，未发现明确数据许可证。

## RoboTwin Early Version

- 样例：抓取不同瓶子 · 双臂演示轨迹 0。实际下载的官方包中，episode0 含 186 帧；本站展示第 0、93、185 帧的完整关节动作、末端位姿及各两点点云。没有附加 RGB 图片；记录本身不能代表模型总体成功率。
- 来源：https://huggingface.co/datasets/YaoMarkMu/robotwin_dataset/blob/53fda493155c73c4a1829a6638535f787ca11009/diverse_bottles_pick.zip
- 范围：diverse_bottles_pick / episode0
- 使用条件：官方数据集卡标注 MIT；保留发布方、固定版本及许可说明。
- dataset：`YaoMarkMu/robotwin_dataset`
- revision：`53fda493155c73c4a1829a6638535f787ca11009`
- archive_sha256：`1ab94717331353e509272963f7dbe94756a53073bbb7d7a15f79c34e50583a48`
- 取证：2026-10-29 下载官方 diverse_bottles_pick.zip（195,514,308 字节），SHA-256 1ab94717331353e509272963f7dbe94756a53073bbb7d7a15f79c34e50583a48；使用受限解析读取 episode0 中 0、93、185 帧。

## RLBench

- 样例：关闭盒子 · 训练轨迹 0。该文件由第三方转换为 LeRobot 格式，包含 193 帧。这里只选取 3 帧数值，并未转载图像；这是演示数据，不是模型榜单成绩。
- 来源：https://huggingface.co/datasets/nvkartik/rlbench-lerobot-groot/blob/1e7468f40edf487f24215b355df33a99de5c7566/data/chunk-000/episode_000000.parquet
- 范围：train / episode 0 / 第三方转换集
- 使用条件：第三方转换集标 Apache-2.0；RLBench 软件许可有非商业研究限制，源数据和媒体许可范围须分别核对。
- dataset：`nvkartik/rlbench-lerobot-groot`
- revision：`1e7468f40edf487f24215b355df33a99de5c7566`
- file_sha256：`eb897edc702c2856735beadb7d44d9c390c4882572222700c30175c3dc3a702b`
- 取证：2026-10-29 下载并解析固定版本的 episode_000000.parquet，共 193 帧；文件 SHA-256 eb897edc702c2856735beadb7d44d9c390c4882572222700c30175c3dc3a702b。

## CALVIN

- 样例：将门向左移动 · 训练轨迹 0。该文件由第三方转换为 LeRobot 格式，包含 65 帧。这里只选取 3 帧数值，并未转载图像；这是演示数据，不是模型榜单成绩。
- 来源：https://huggingface.co/datasets/CollisionCode/calvin_d_d_lerobot_v2.1/blob/437ab85fe61d38fb68ac235db9c3965a05cece18/data/chunk-000/episode_000000.parquet
- 范围：train / episode 0 / 第三方转换集
- 使用条件：第三方转换数据卡标 Apache-2.0；CALVIN 上游演示数据的独立许可尚未核实。
- dataset：`CollisionCode/calvin_d_d_lerobot_v2.1`
- revision：`437ab85fe61d38fb68ac235db9c3965a05cece18`
- file_sha256：`b2669ed310f5b1701caf5d010dbaf19e8f18828f471311c22d32e217212a1af2`
- 取证：2026-10-29 下载并解析固定版本的 episode_000000.parquet，共 65 帧；文件 SHA-256 b2669ed310f5b1701caf5d010dbaf19e8f18828f471311c22d32e217212a1af2。

## BEHAVIOR-1K

- 样例：打开收音机 · 任务过程。这是 BEHAVIOR-1K 2026 Challenge 100 项任务范围内的一条演示标注，记录了每个技能的对象与帧区间；不是完整运动轨迹，也不是模型评测结果。
- 来源：https://huggingface.co/datasets/behavior-1k/2026-challenge-demos/blob/4f50b44796641a4d526a19d9aeadc8aa51e2f2c2/annotations/task-0000/episode_00000010.json
- 范围：task-0000 / episode_00000010
- 使用条件：BEHAVIOR-1K 2026 Challenge Demos，MIT；版权声明和许可文本随站点提供。
- 取证：2026-10-29 实际下载技能标注，固定版本 4f50b44796641a4d526a19d9aeadc8aa51e2f2c2，文件 SHA-256 48f9ea43dac254b18616355499d07371c9365aeee2539c336b7cee484d92cb81；未获取受独立资产协议约束的场景或图像。

## LIBERO-Plus

- 样例：将两个杯子分别放在左右盘子上。这是 LIBERO-Plus 公开链接的 LeRobot 训练数据；同一 episode 共 277 帧，此处摘出首、中、末帧的状态与动作。它不是鲁棒性测试的模型成绩。 原始动作中的负零以字符串 -0.0 保留，以避免 JSON 序列化丢失符号。
- 来源：https://huggingface.co/datasets/Sylvest/libero_plus_lerobot/blob/22c57433fef692b5b9ecc0795344daac7fa867a5/data/chunk-000/episode_000000.parquet
- 范围：train / episode_index 0 / task_index 0
- 使用条件：训练集数据卡标 MIT；上游 LIBERO 官方数据许可及其他资产范围需一并核对，本站不复制图像视频。
- dataset：`Sylvest/libero_plus_lerobot`
- revision：`22c57433fef692b5b9ecc0795344daac7fa867a5`
- file_sha256：`8f85e526154c47ad0d18bfa4c23c96bd5b24097163f399909d10edfedc3f3693`
- 取证：2026-10-29 实际下载并解析 episode_000000.parquet（24,717 字节、277 帧）；SHA-256 8f85e526154c47ad0d18bfa4c23c96bd5b24097163f399909d10edfedc3f3693。

## SIMPLE

- 样例：人形机器人桌面抓取 · 轨迹 0。PSI 发布的数据包包含 100 条轨迹；选中的 episode 0 有 121 帧，包含手臂、手部、腿部关节观测和动作。源包还有第一视角视频；因数据许可未明确，本站未转载视频，也不据此宣称模型成功率。
- 来源：https://huggingface.co/datasets/USC-PSI-Lab/psi-data/blob/e78fb93cc28912a3031a10b8656d32d7f0a2b867/simple/G1WholebodyTabletopGraspMP-v0.zip
- 范围：SIMPLE / G1WholebodyTabletopGraspMP-v0 / episode 0
- 使用条件：数据集未明确声明可再发布许可；仅展示状态与动作的数值节选及本站说明，媒体未转载。
- dataset：`USC-PSI-Lab/psi-data`
- revision：`e78fb93cc28912a3031a10b8656d32d7f0a2b867`
- archive_sha256：`9930fe06f67b34cc408e4bf82c1e693460202fa3edcd6adead3af9cf8056005e`
- episode_file_sha256：`8102a64197b6a956c4369cb980321587bf044b4093098caf5a993e613efd34b6`
- 取证：2026-10-29 实际下载任务包（34,395,427 字节），SHA-256 9930fe06f67b34cc408e4bf82c1e693460202fa3edcd6adead3af9cf8056005e；从中读取 episode_000000.parquet，共 121 帧。

## GraspNet-1Billion

- 样例：对象 083 · 抓取候选点。数据来自第三方镜像 grasp_label.tar 中的 083_labels.npz。points.npy 含 1,296 个三维坐标，此处仅展示前三个；角度、抓取评分和场景图像没有取出，不能把这些点当成完整抓取姿态或模型成绩。
- 来源：https://huggingface.co/datasets/DravenALG/GraspNet-1Billion/blob/c7a03dfc391bcb12ce7d6031850b83295635e39c/grasp_label.tar
- 范围：object 083 / grasp_label / points
- 使用条件：GraspNet 数据页许可名称与缩写不一致，镜像权限与第三方资产范围需核实；这里只展示坐标数据节选。
- array_sha256：`f7acc180610495cce4a1fe1dc970efda694a3e541f082a86dc3570be40c46983`
- 取证：2026-10-29 通过 HTTP Range 读取固定版本镜像 tar 内对象 083 的 NPZ，再取得其中 points.npy（15,680 字节，SHA-256 f7acc180610495cce4a1fe1dc970efda694a3e541f082a86dc3570be40c46983），未下载完整 25.85 GB 归档。

## RoboTwin 2.0

- 样例：拿起窄口瓶 · 双臂轨迹 0。该轨迹来自 LeRobot 转换的 RoboTwin 2.0 数据，episode 0 共 139 帧；任务文本来自同版本任务索引。本站仅显示数值节选，未转载相机视频，不应将单条轨迹当作模型评测成绩。
- 来源：https://huggingface.co/datasets/lerobot/robotwin_unified/blob/1287871839fae2296bc27b88a5457c3e1eba8e1f/data/chunk-000/file-000.parquet
- 范围：episode_index 0 / task_index 0 / LeRobot 转换集
- 使用条件：LeRobot 文档描述 Apache-2.0；本次数据卡未明确标注许可，RoboTwin 上游数据卡标 MIT，媒体与资产范围需分别核对。
- dataset：`lerobot/robotwin_unified`
- revision：`1287871839fae2296bc27b88a5457c3e1eba8e1f`
- file_sha256：`a6afe2c46a97fe507f6eea52f48b283c225662ad3bed0567eabc041f94d364a2`
- 取证：2026-10-29 下载 LeRobot 固定版本的 36,540,076 字节 Parquet；SHA-256 a6afe2c46a97fe507f6eea52f48b283c225662ad3bed0567eabc041f94d364a2；从中读取 episode 0 的 139 帧。

## SuctionNet-1Billion

- 样例：对象 000 · 吸盘密封标签。官方数据包中对象 000 的 seal 标签含 4,723 个候选点；这里只取前三条并保留原始字段。这里的 scores 是密封标签分数，不能直接解读为模型成功率。
- 来源：https://drive.google.com/file/d/1BaZ60u5ZkudDlYHvH2mcu2EVfUc9wGK_/view
- 范围：object 000 / seal_label
- 使用条件：官方数据许可名称与缩写表述不一致；这里只展示少量数值节选，完整许可范围待澄清。
- member_sha256：`225b491dfb4f9d59f7502575c33f04be7b1b736eaea00659761d76eb79ea2016`
- 取证：2026-10-29 下载官方 suction_label.zip（10,888,424 字节）；SHA-256 8df042ed51bb4971967f4f9636ac5e7c9e89d8a5b78b2453d74403b344bba694。对象 000 标签包含 4,723 个候选点。

## ManiSkill2

- 样例：PickCube · 官方演示轨迹 0。官方 ManiSkill2 PickCube-v0 轨迹 0 共 88 个动作，控制模式为 pd_joint_pos；最终成功标志是该条演示的结果，不是模型榜单成绩。原文件还包含 89 个环境状态。
- 来源：https://huggingface.co/datasets/haosulab/ManiSkill2/blob/0c367447d26e4e2de13fbf5e5d2ab09a258187da/demos/v0/rigid_body/PickCube-v0/trajectory.h5
- 范围：PickCube-v0 / traj_0
- 使用条件：官方 ManiSkill2 数据卡标注 Apache-2.0；第三方资产使用范围需分别核对。
- dataset：`haosulab/ManiSkill2`
- revision：`0c367447d26e4e2de13fbf5e5d2ab09a258187da`
- h5_sha256：`a5920e22e4a9ae49e16d6c56aeb728a082d6ea9c32b62d979b6a95208f27dcd1`
- metadata_sha256：`aab69b6f89a2e6f2b6c168b7b85a97d3d0ed5ca78326b6a80484660f42d1665f`
- 取证：2026-10-29 下载 34,238,682 字节 HDF5 与元数据；HDF5 SHA-256 a5920e22e4a9ae49e16d6c56aeb728a082d6ea9c32b62d979b6a95208f27dcd1；traj_0 含 88 个动作、89 个环境状态。

## RoboCasa

- 样例：关闭橱柜门 · 合成演示轨迹 0。来自原版 RoboCasa 的 MG_100 合成数据第三方转换集，episode 0 共 415 帧；任务标签来自同版本索引。合成演示不代表模型评测成绩，也不能与 RoboCasa365 混同。
- 来源：https://huggingface.co/datasets/DAVIAN-Robotics/robocasa-MG_100/blob/510a2940a66e0debc9818803cdb62b140a6c4bb6/data/chunk-000/file-000.parquet
- 范围：MG_100 / episode_index 0 / task_index 0
- 使用条件：转换数据卡标 Apache-2.0；原版及第三方场景资产的具体转载范围需分别核实。
- dataset：`DAVIAN-Robotics/robocasa-MG_100`
- revision：`510a2940a66e0debc9818803cdb62b140a6c4bb6`
- file_sha256：`b81b1d2594c6fa6771f10a4a2f9728484b39e8d35d068694e84377df1ca2828d`
- 取证：2026-10-29 下载 60,639,847 字节转换 Parquet，SHA-256 b81b1d2594c6fa6771f10a4a2f9728484b39e8d35d068694e84377df1ca2828d；提取 episode 0 的 415 帧中的 3 帧。

## RoboTwin 1.0

- 已取得 D-Robotics 明确标注 RoboTwin 1.0 的 211 帧完整预处理训练轨迹，站内提供全部帧数值和部分画面。此前 YimouWu 采样对的上游代码版本仍未锁定；两者都不是官方测试集。
- 详细取证：2026-10-29-robotwin-1-trajectory-evidence.md
- 资料：https://huggingface.co/datasets/YimouWu/RoboTwin_instruct-pix2pix

## TOTO

- 样例：真实机器人舀取杏仁 · 轨迹 22-04-01。官方数据桶中的真实舀取轨迹，材料为杏仁，共 626 个时间步；观测与动作都是七维关节角。normalized_reward 是此条记录字段，不是模型榜单成绩。原图由官方数据桶提供，数据转载许可尚未核实，本站不复制图片。
- 来源：https://storage.googleapis.com/toto-dataset/cloud-data-scooping/parsed.pkl
- 范围：real-world scooping / trajectory 22-04-01-14-12-17
- 使用条件：官方数据的独立许可未核实；本站仅展示有限数值摘录和原图链接。
- dataset：`toto-dataset/cloud-data-scooping/parsed.pkl`
- file_sha256：`75e08fbf3f45f8aa544009b3c12ba2c6c6f30140a9ea0437734813b6643177a5`
- first_color_sha256：`11a7de2127073ee02f44ba819340bfa34a1c99e6640d9528bd3552f8d4811805`
- 取证：2026-10-29 下载 367,640,015 字节官方 parsed.pkl，SHA-256 75e08fbf3f45f8aa544009b3c12ba2c6c6f30140a9ea0437734813b6643177a5；限制反序列化可调用类型后读取 1,895 条记录，首条 626 帧。官方文档列 1,900 条，该文件与文档数量不一致。

## SIMPLER

- 样例：抓取可乐罐 · 失败案例。官方 SIMPLER 示例录像集中的 RT-1 评测片段，使用视觉匹配设置；这是一次仿真运行，不是真机录像，也不是整项成功率。文件名包含物体位置和抓取状态，具体成功判定以官方评测代码为准。
- 来源：https://huggingface.co/datasets/xuanlinli17/simpler-env-eval-example-videos/blob/610a6204d46cbc6fd9feb2c79d9a98117ce5bc22/rt1_cokecan_000240240.zip
- 范围：RT-1 / visual matching / Google Robot / pick coke can
- 使用条件：录像数据集卡标 MIT；仿真场景及叠加素材的独立许可仍需核对。
- archive_sha256：`9ede9653a97fa1ad56a8478bb1deaf668887215a4185ec3e2e39e21005afcaf1`
- video_sha256：`c5eac15a6ce20c44d46bb0ba57ef38663426e6abf15041ee40e10537f8233654`
- 样例：抓取可乐罐 · 成功案例。官方 SIMPLER 示例录像集中的 RT-1 评测片段，使用视觉匹配设置；这是一次仿真运行，不是真机录像，也不是整项成功率。文件名包含物体位置和抓取状态，具体成功判定以官方评测代码为准。
- 来源：https://huggingface.co/datasets/xuanlinli17/simpler-env-eval-example-videos/blob/610a6204d46cbc6fd9feb2c79d9a98117ce5bc22/rt1_cokecan_000240240.zip
- 范围：RT-1 / visual matching / Google Robot / pick coke can
- 使用条件：录像数据集卡标 MIT；仿真场景及叠加素材的独立许可仍需核对。
- archive_sha256：`9ede9653a97fa1ad56a8478bb1deaf668887215a4185ec3e2e39e21005afcaf1`
- video_sha256：`0cf3c1c544183f48277adf790e6cb6487251fa37294a639a8c4f4b0eb21cd8ce`
- 取证：2026-10-29 下载 28,572,167 字节录像包，SHA-256 9ede9653a97fa1ad56a8478bb1deaf668887215a4185ec3e2e39e21005afcaf1；按原始文件名提取成功和失败各一段。

## 取证边界

- Meta-World 和 VLABench 已取得并展示原始数据帧；其余案例以数值、轨迹动作、导航路径或标注摘录为主，未经许可确认的媒体没有复制到站内。
- 单条成功标志只属于该轨迹；不得把训练、合成演示、标注候选或单条轨迹当成模型榜单成绩。
- 完整下载文件保留于本机 `.scratch/embodied-benchmarks/`；产品数据中仅存可审阅摘录、出处和校验信息。
