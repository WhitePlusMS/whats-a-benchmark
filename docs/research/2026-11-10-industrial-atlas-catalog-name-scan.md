# 工业数据目录与本站名称扫描

调查日期：2026-11-10。针对 [Awesome Industrial Datasets 固定提交 `ff20652c`](https://github.com/jonathanwvd/awesome-industrial-datasets/tree/ff20652c0e25e56cb5818f88224c951230532813) 的 199 个 `json/*.json` 项，与本地 `content/benchmarks/*.json` 中 `status=published` 的 318 项顶层 `name` 比较。将名字转小写并移除非英文字母和数字，未发现完全一致的名称；没有搜索正文、ID、缩写、别名和上游从属关系，也没有逐项查外站所有更新。本站统计按评测条目、对方按工业数据目录，两边范围与计数单位不同；零精确命中不代表没有实质重叠、本站独有或覆盖更好。

同一目录的[站点版本 Industrial Atlas](https://www.indatlas.com/datasets/)已有搜索、领域/设备/数据来源筛选和比较入口，界面本次未交互验收。[目录 README](https://github.com/jonathanwvd/awesome-industrial-datasets/blob/ff20652c0e25e56cb5818f88224c951230532813/README.md)也指向该站，不能将该仓库和网站算成两份互相独立的用户需求证据。

## 与机器人和制造相关的候选

按固定目录 `Asset / Process` 包含 robot 或 `Domain` 为 robotics and automation 的字段机械筛选，得到 10 条候选。其字段由目录维护者提供，不代表每条都是机器人闭环评测。以下核对了部分原始项目：

| 项目 | 实际对象 | 与模型排行榜的边界 |
| --- | --- | --- |
| [Robot Execution Failures](https://archive.ics.uci.edu/dataset/138/robot+execution+failures) | UCI 列 463 个样本及五类不同学习问题；每个失败样本是检测后 315 ms 内的力和扭矩记录。 | 是失败后数据分类，不是机器人策略完成任务的成功率或故障发生前预警。 |
| [IMAD-DS](https://zenodo.org/records/12665499) | 缩比机械臂和无刷电机的多传感器数据，人工设置异常，并变化负载、速度和背景噪声。 | 属实验台异常检测，不能把变化条件下的分类表现当真实产线全故障识别率。 |
| [NIST 机械臂定位精度退化](https://www.nist.gov/el/intelligent-systems-division-73500/degradation-measurement-robot-arm-position-accuracy) | UR5 在不同温度、载荷及速度条件下的定位误差和关节信号。 | 是机械臂精度与工况数据，不是 LLM 推理或 VLA 模型成绩。 |
| [REASSEMBLE](https://tuwien-asl.github.io/REASSEMBLE_page/) | 项目称 4,551 次多模态装配／拆卸示范，其中 4,035 次成功，基于 NIST 装配板。 | 示范成功计数不是任意机器人模型的评测分数；项目本身也已有同步数据可视化。 |
| [MVTec ITODD](https://www.mvtec.com/research-teaching/datasets/mvtec-itodd) | 工业物体检测与姿态估计。 | 看的是物体感知，不能仅凭属于机器人应用就认定做过抓取执行。 |

这些是可继续查的数据集与评测来源，不是新增正式收录，也不是对网站用户需求的直接证明。要判断本站是否有价值，仍需把候选与实际读者的问题、原始许可、展示成本和现成工具逐条核对。
