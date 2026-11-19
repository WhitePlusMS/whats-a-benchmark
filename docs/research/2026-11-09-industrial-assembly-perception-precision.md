# 工业装配：定位、插入与现场条件

核查日期：2026-11-09。对照当前工作树和公开论文、仓库、社区发言；未运行评测、下载完整数据、操作机器人或采访用户。公开求助为个人自述，不代表普遍需求、实际故障原因或付费意愿。

## 从本站已有实物任务出发

本站 [ManipulationNet](../../content/benchmarks/manipulationnet.json)已有 Peg-in-Hole 实物装配样例：五种插销形状、四档间隙 3、1、0.1、0.02 毫米。样例展示的是官方任务说明与平台图，不是一次机器人插入记录或模型成功率。[论文](https://arxiv.org/html/2603.04363)说明插销为不锈钢、板材为透明亚克力，板材制造公差在 20 微米内。间隙与零件制造公差是不同量，不能直接当作机器人定位精度。

## 相关评测：名称相近，测量不同

| 来源 | 测量或提供什么 | 与站内任务的边界 |
| --- | --- | --- |
| [Peg-in-Bench 论文](https://arxiv.org/html/2609.00906)和[仓库](https://github.com/aistairc/peg-in-bench) | 可重组的 3D 打印插销、孔与底座；五种形状、0.1/1/3 毫米三档间隙，可生成场景及 JSON 描述。 | 作者参考了 ManipulationNet 的容差设定，但称常见 3D 打印技术难以可靠重现 0.02 毫米，因而不包含该档。不同材料、固定与结构也会影响任务，不能仅凭同名间隙合并成绩。论文将建立基线成绩和标准化评估协议列为后续工作；实物演示不是模型榜单。 |
| [IndustryShapes 论文](https://arxiv.org/html/2602.05555)和[项目页](https://pose-lab.github.io/IndustryShapes/) | 采用 RGB-D 图像和标注，评估工业工具及零件的 6D 位姿估计。 | 对象定位评估不是让机械臂实际完成插入。Classic 数据包括工业、实验室及合成场景；Extended 的测试场景是办公环境，不能说所有照片均来自工厂生产线。其 Recall 等结果不是装配成功率。 |
| [IndustReal 库](https://github.com/NVlabs/industreallib) | 包含感知、抓取与插销等流程说明和参考配置。 | 官方说明插入示例需要用户先引导机械臂抓住已插入的销钉，然后机器人取出、扰动并执行插入；它是该示例的初始条件，不能称为全流程无人介入。 |

仅按 `Peg-in-Bench`、`IndustryShapes` 名称搜索本地评测和研究文档未命中，不排除别名或其他位置的内容。IndustryShapes 项目页已有图集、划分和数据入口，其作者也公开了[数据卡](https://huggingface.co/datasets/POSE-Lab/IndustryShapes)；[Benchmark Radar](https://benchmark-radar.org/benchmarks/claire-radar-2609-00906/)已有 Peg-in-Bench 条目和论文、代码链接，核查时该站称暂无收录成绩。因此“中文解释相近 benchmark”并不是没有现有替代方案。

## 追加对照：装配板、仿真与多零件结构

本轮按名称检索本站 benchmark JSON 与研究文档，未见下列三个独立条目；仅为检索结论，不排除别名或其他位置。它们与本站 ManipulationNet 都涉及装配，但对象、设备和任务条件不同，不能将成功率直接合并成统一榜单。

| 资源 | 测试与已有入口 | 阅读成绩时的边界 |
| --- | --- | --- |
| [AssembleBench 仓库](https://github.com/hud-evals/assemble-bench)及[作者说明](https://www.hud.ai/research/assemble-benchmark) | Isaac 仿真中的 14 项桌面任务，含圆／方销、齿轮和螺母；参考 NIST ATB-1 结构。作者已提供环境、检查点和 [1,355 条示范数据](https://huggingface.co/datasets/hud-evals/AssembleBench)。 | 仓库描述的是使用装配几何判定的**仿真**，不是实物装配成绩；作者说明示范由使用仿真特权状态的脚本生成，不是人工遥操作或真机轨迹。默认评测使用稀疏成功，训练还提供阶段奖励，不能把奖励值当成功率。作者报告部分零样本检查点在其设置下为 0%，将摄像机视角列为可能原因，并非已证实根因；数据清洗前后的效果也不构成单因素对照。 |
| [KIT wbk Industrial Assembly Task Board](https://industrial-assembly-taskboard.readthedocs.io/en/latest/) | 实体模块化任务板，提供构建指南、可 3D 打印文件和逐模块任务／成功条件；包括插销、齿轮、螺钉及弹性变形等。 | 这是可自行搭建和执行实物实验的任务板及方法，不代表已提供统一模型榜或自动得分。本次没有制作硬件、核对全部零件的材料及许可，也没找到可直接与上述仿真成绩比较的统一结果。 |
| [WorkBenchMark 项目页](https://workbenchmark.github.io/)与[论文](https://arxiv.org/html/2606.19358) | 四档各 100 项积木目标装配；既报告仿真对比，也报告作者结构化方法在 UR5 上的实物实验。其[数据仓库](https://github.com/WorkBenchMark/dataset)已有目标及用于评估的初始布局 YAML。 | 论文 77.5% 总成功率是作者结构化方法在四档仿真任务上的平均；真机 83.33% 是该方法在第 1–3 档、每档 10 个任务的结果，未含第 4 档，也不是 VLA 真机对比。仓库说明初始布局文件只供环境准备与评估，不应给求解器替代视觉感知。项目页虽描述提供仿真及基线，但运行指南和链接当时仍标 TBD，许可证亦写待确认；不能据此保证可复现或自由复用。 |

[NIST 官方 ATB 页面](https://www.nist.gov/el/intelligent-systems-division-73500/robotic-grasping-and-manipulation-assembly/assembly)已有装配任务板、性能指标与设计资料；这说明相关标准和原始材料已有长期积累，而非本站独有机会。可进一步验证读者能否通过一页来源对照回答“任务是单件插入还是整件装配、成绩来自仿真还是实机、评估是否允许使用初始状态”。能否因此吸引真实读者仍未验证。

## 两种真实提出的问题

1. [机器人社区的车床上下料讨论](https://www.reddit.com/r/Fanuc/comments/1wi2oaz/strategies_for_robot_placing_a_part_with_very/)中，发帖者自述机器人向卡盘放件时间隙约 0.0035 英寸，并描述碰撞后位置问题和反复示教，询问末端传感器等应对方法。评论者提到柔顺末端、自定位和视觉等思路，也有人质疑机器人状态或工艺设计；均为未核实的个别意见，不能据帖子诊断设备或推荐现场控制方案。卡盘单边/整体间隙的具体测量定义未核实，不与上面的轴孔数字直接比较。
2. [插孔研究生的提问](https://www.reddit.com/r/reinforcementlearning/comments/1tjihyn/peginhole_insertion_using_sensor_fusion_rl/)描述 Doosan M1013、ROS 2、手眼 RGB-D 相机，以及预估的孔位误差，询问先做视觉精定位还是由力/力矩加策略在接触后处理。回复者追问相对于传统力控的需求，并建议区分位姿估计与接触后剩余误差。这是一次具体讨论，设备、精度估计和效果未独立验证。

两条提问分别来自现场放件和研究性插孔，既不是同一个用户，也不证明本站用户会使用这些内容；其价值在于显示“实验任务与我的零件、夹具、传感器和控制条件是否相符”可以作为后续读者测试的问题。

## 对本项目的判断

补充资料：[NIST 装配训练、评估与真机数据对照](2026-11-10-nist-assembly-training-evaluation.md)区分同任务板下的仿真训练成绩、独立实现、脚本数据、真机遥操作与评测设计问题。

值得测试的阅读任务是：给读者本站 ManipulationNet 样例、Peg-in-Bench 原文和 IndustryShapes 原文，问“哪一个评估定位、哪一个涉及真实执行；0.02 毫米是否存在于两套装置；有没有模型实测成绩？”记录正确率和查找时间，并比较官方资料和已有目录。未做该测试前，不能据此断言本站整理比官方页面更有用，也不能将学术评测结果当现场验收、工位节拍或安全性证明。
