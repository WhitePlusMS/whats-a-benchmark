# 具身评测数据使用需求补查

核查日期：2026-11-10。以下为公开讨论、官方仓库与本地评测条目的只读对照；未下载数据、运行代码或访谈本站用户。

## RoboCasa365：子任务标注

[使用者讨论](https://github.com/robocasa/robocasa/issues/194)询问复合任务演示是否包含逐帧子任务边界，以及如何生成；另一位参与者表示标注可用于数据处理和实验。项目贡献者于 2026-07-06 表示部分 composite target 任务标注已加入 LeRobot 数据，需重新下载；又解释其通过回放仿真状态并运行手写事件检测规则生成。该回复不证明所有任务都提供标注，也不是本次对下载文件的验证。

[官方首页](https://robocasa.ai/)随后记录 2026-10-14 发布覆盖全部 300 个复合任务的子任务标注生成流程。工具覆盖范围与已发布数据中预先包含的标注范围不同；尚未下载数据或运行流程，不能断言全部演示已有标注。

本站 [RoboCasa365](../../content/benchmarks/robocasa365.json)已介绍任务和资源。这条讨论可作为「数据包含哪些标注、适用哪些任务和版本」的具体需求线索，但不证明参与者会使用本站。

## LIBERO-Pro2.0：存储记录与来源轨迹

本站 [LIBERO-Pro2.0](../../content/benchmarks/libero-pro2.json)写明训练集 40,470 条存储演示。[官方仓库](https://github.com/LIBERO-Pro-Team/LIBERO-Pro2.0)补充称其中 106 个实例各将一条来源轨迹复制成 30 条记录，共 37,396 条不同来源轨迹。原有记录数不因此错误，但不等于不同轨迹数。仓库还称按实例组织的 HDF5 需要专门加载器或转换，不能直接套用原 LIBERO 按任务组织的加载方式；未下载验证。

## RoboTwin：图像编码

[官方仓库](https://github.com/RoboTwin-Platform/RoboTwin)说明下载和自行采集的轨迹可能使用两种编码格式，并提供解码函数以避免通道顺序误读。本站 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)有数据入口和榜单协议，当前未在数据字段中说明该编码问题。此处未测试具体数据版本或函数。

这些资料支持测试「使用者能否快速找到数据规模口径、格式与下载入口」；官方已经提供相关说明，能否由本站增加价值尚需与官方入口进行用户任务对照。

## RoboReel：从人类视频学习机器人操作

[官方项目](https://roboreel.github.io/)介绍 10 类操作任务、2,000 段真实人类示范视频及配对的仿真机器人环境，分别测试干净场景、干扰物和姿态信息等条件；真实人类示范不是机器人实机成绩。[论文 v4](https://arxiv.org/abs/2609.08209v4)称作者在部分任务上做了真机验证，未由本站复现。

2026-11-10 在本地 `content/benchmarks` JSON 与研究 Markdown 中按 RoboReel 和论文编号搜索，未发现独立同名条目或已有记录；不排除别名及其他未搜索字段。它与本站 LIBERO、RoboCasa 和 VLABench 的操作任务相关，但被测对象与协议不应直接等同。未核实下载文件、许可或真实读者需求，不据此推断收录优先级。

补查：[代码仓库](https://github.com/gupta-anmol99/roboreel)提供任务与评测流程，声明代码为 MIT，第三方组件另有条款；其安装说明要求 Linux 和 NVIDIA GPU，Docker 镜像约 45 GB。[数据卡](https://huggingface.co/datasets/LogosRoboticsLab/roboreel)当次显示仓库总量约 2.58 TB，不等于单项实验必需下载量。数据卡说明 `pose_defined` 的部分训练录制与 `no_distraction` 的评估录制相同；这是跨套件关系，不自动证明论文存在数据泄漏。[项目限制](https://roboreel.github.io/)说明只测单臂、目标状态任务，不覆盖双臂和软体对象。未下载数据或运行验证。
