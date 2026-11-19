# ScanBot：真实扫描轨迹、版本与成绩口径

核查日期：2026-11-10。仅在线只读论文和数据文件，没有下载 123 GB 数据集、运行模型或控制机器人。

## 可以回答的具体问题

机械臂扫描时，不只要回答“扫哪里”，还要设置扫描器参数并保持测量距离和姿态。[论文 v2](https://arxiv.org/html/2505.17295v2)描述真实设备为 UR3 机械臂、Keyence LJ-X8200/LJ-X8000A 激光轮廓仪与控制器，以及 RealSense D435i。这个工作聚焦平面或局部平面、单次直线扫描；执行期间不做在线自适应，不能据此宣称验证了曲面连续扫描或动态纠偏。

## 固定数据版本的一条训练/采集轨迹

数据仓库固定修订 [`d1cfd090e582f0f12bfcddc454028b5b05fde4a0`](https://huggingface.co/datasets/ed1son/ScanBot/tree/d1cfd090e582f0f12bfcddc454028b5b05fde4a0) 的 `V1/cube1/top_surface/path_0001` 目录包含 `metadata.json`、关节状态 CSV、工具位姿 CSV、RGB/depth 目录和第三视角视频。仓库 [README](https://huggingface.co/datasets/ed1son/ScanBot/blob/d1cfd090e582f0f12bfcddc454028b5b05fde4a0/README.md)称 V1 有 12 个物体及 197 项任务；这里只检查一条记录，未独立清点 197 项，也不把它归为某个测试集。

- [metadata.json](https://huggingface.co/datasets/ed1son/ScanBot/blob/d1cfd090e582f0f12bfcddc454028b5b05fde4a0/V1/cube1/top_surface/path_0001/metadata.json) 的 `path_id=1`，指令是扫描一个缺角白色立方体的顶面；其中有初始、起始和终止位姿，标注录制帧率为 30。文件 SHA-256 为 `97c0e01f03e83dd571a168920c28e41b4b19ee282e48e363b28006c6e126232d`。
- [关节状态](https://huggingface.co/datasets/ed1son/ScanBot/blob/d1cfd090e582f0f12bfcddc454028b5b05fde4a0/V1/cube1/top_surface/path_0001/robot_joint_states.csv)和[工具位姿](https://huggingface.co/datasets/ed1son/ScanBot/blob/d1cfd090e582f0f12bfcddc454028b5b05fde4a0/V1/cube1/top_surface/path_0001/robot_tcp_poses.csv)各含 89 行数据，首尾时间戳分别约 `1746226188.685` 与 `1746226197.497`。两文件对应首尾时间戳一致，但这并不证明所有相机、激光数据逐帧同步，也未核对时间戳来源和坐标单位。
- 位姿 CSV 的末行位置数值接近元数据的 `p_end`；仅凭这一点不能证明扫描质量、成功率、完整评测结果或视频内容。本次未下载视频或解读实际点云。
- 对应 [ground_truth/3D_printed/cube1/top_surface](https://huggingface.co/datasets/ed1son/ScanBot/tree/d1cfd090e582f0f12bfcddc454028b5b05fde4a0/ground_truth/3D_printed/cube1/top_surface)目录列出 `.lhix` 和 `.pcd` 文件。目录名与路径可关联该物体/特征，但未验证与 `path_0001` 为逐帧配对，也没有下载文件；参考扫描不能直接当作模型输出。

## 同一项目的数据和代码边界

固定修订 `V1` 顶层列出 12 个物体目录，恰好与数据卡的 12 个物体一致；这不是对目录内所有文件、轨迹或对象身份的完整核验。后续论文 v2 写 20 个物体，其新增八个对象的公开数据位置和版本映射本次未找到。不能把 V1 条记录写成论文 v2 新增物体或用 12 个对象替代 20 个对象的实验。

作者[项目的 GitHub 仓库](https://github.com/Ed1sonChen/Scan-Bot)在本次查看时只展示 README 和 `static/figures`，README 的发布评测代码项仍列在待办。不能据此断言代码不存在于任何其他地址；但当前项目页所链接仓库本身不足以证明论文 v2 评测实现已公开或可复现。数据卡标注 Apache-2.0，论文、网页、第三方硬件素材的复用范围应分开核查。

## 同一成绩里的不同指标

论文 v2 表 II 报告固定模板扫描（FTS）的目标覆盖率为 99.92%，其微调 π0.5 配置为 24.64%；这两个数是论文的特定实验报告，不是全行业生产线成功率。π0.5 是任务数据上 LoRA 微调，而不是开箱零样本。论文没有在所核查表格和相邻设置中明确提供每个单元格对应的扫描次数或独立对象清单，不能自定分母或假定 ± 为置信区间。

尤其需要澄清：论文的 `Valid Data Ratio` 定义为**工具 Z 方向的距离误差在阈值内的时间步比例**，它是几何条件代理指标；不能改写为激光轮廓仪实际返回有效点的比例。覆盖率基于有效时间步覆盖的目标扫描区间分箱，和缺陷识别准确率也不是同一件事。论文没有提供充分信息让本次独立复算这些表格。

## 对网站的启示与未知

这个例子适合展示“真实采集记录—评测任务—指标分母—原始来源”的链条，能让读者理解一个工业具身分数；同样应显示版本和代码可用性的限制。作者已经公开论文、数据和介绍，因此这是一项待验证的整理价值，而非独占数据。是否有人需要这样的中文说明、能否缩短排查时间、是否值得持续维护，均没有用户实测证据。
