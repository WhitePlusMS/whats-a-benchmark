# RLBench：任务判定、运行成绩与已有资料

核查日期：2026-11-09。对照当前本地工作树和公开网页；不运行仿真、不验证每条成绩、不代表穷尽全网或用户需求。

## 本站样本与评测协议

[本地 RLBench 条目](../../content/benchmarks/rlbench.json)列出仿真环境、few-shot 设置与示范素材。`open_drawer` 样例来自 PerAct 测试划分中的预生成演示：第 19 条、97 帧，站内将其合成视频并明确标为演示，不能当作某个模型的测试运行或成绩。另一段放两个杯子的第三方转换数据，仓库名称含 test，但内部元数据标 train；本站未确认其与上游划分的对应关系。此次未重新下载或播放样本。

[PerAct 仓库](https://github.com/peract/peract/blob/main/README.md)说明其多任务检查点覆盖 18 个任务、每任务 100 条训练演示；另提供论文使用的每任务 25 条验证与 25 条测试演示。示范数量、用于初始化/评估的回合数和模型成功回合数是不同量；各论文不必然都使用同一设置。[RLBench 官方](https://github.com/stepjam/RLBench)又提供按训练任务数分别为 10、25、50、95 且有 5 个测试任务的 few-shot 设置，不能把 PerAct 的 test 和官方 few-shot 测试任务混同。

## 对站内“打开抽屉”样例核对任务代码

固定 RLBench `master` 当次提交 [02720bba](https://github.com/stepjam/RLBench/blob/02720bba4c73fe02eb75df946b8791b806028a9d/rlbench/tasks/open_drawer.py)：`open_drawer` 有 bottom、middle、top 三种选项，每次按索引注册对应抽屉关节的 `JointCondition(..., 0.15)`；本站样例文字是 bottom，但**未核实该历史演示的源版本是否等于此提交**。

同一提交的 [JointCondition](https://github.com/stepjam/RLBench/blob/02720bba4c73fe02eb75df946b8791b806028a9d/rlbench/backend/conditions.py#L27-L37) 保存创建条件时的关节位置，并以当前位置与该值的差的绝对值**严格大于** 0.15 判定条件成立。源码注释说明量纲依关节类型而定；本次未检查该抽屉 `.ttm` 资产内具体关节配置，因此不擅自把 0.15 写成具体长度或角度。这里只是静态代码阅读，没有运行样例、核对后续稳定性或证明任何成绩对错。

## 可核实的问题与已提供的解释

- [RVT issue #91](https://github.com/NVlabs/RVT/issues/91)一位复现者自述 `slide_block_to_color_target` 原论文成绩 92%、其实现 48%，并报告手动强制 `ignore_collision` 后达到 92–100%；他怀疑 replay buffer 的标签来源，向作者请求澄清。该数值、干预和原因均为提问者自述，手动改变执行设置不能算同协议复现。页面当次开放、未显示答复；本次未核原论文该项数值、运行代码或验证缺陷。
- [RVT 说明](https://github.com/NVlabs/RVT#faqs)针对 PerAct 与论文结果差别解释：PerAct 论文按任务从验证表现选择检查点，而 RVT 对照采用最后一个检查点；作者还将同检查点波动可能归因于采样式运动规划，明确是其假设，并称重复评估五次。此解释不证明 issue #91 的原因。
- [RVT issue #93](https://github.com/NVlabs/RVT/issues/93)中一位用户反映无图形界面集群下载 Google Drive 数据困难，想取得允许后另行托管；同一用户的 [#94](https://github.com/NVlabs/RVT/issues/94)询问能否将训练与 RLBench/PyRep 解耦并描述其集群环境限制。两个帖子属于同一人的相关工作流，不应算两个独立用户；无法据此判断所有用户的网络条件或许可证。

## 已有竞品与资料口径

| 资料 | 当前页面已提供 | 本轮边界 |
| --- | --- | --- |
| [Embodied Data Atlas 中文 RLBench](https://embodieddataatlas.com/zh/datasets/rlbench/?lang=zh) | 环境、任务、模态、few-shot 划分、来源及未确认的数据/代码许可 | 页面可见官方样本入口；未验收交互或播放 |
| [DClaw 中文 RLBench](https://www.dclawai.com/zh/simready/rlbench/) | 任务、PerAct-18 口径、抓取简化物理与许可提示 | 介绍和许可概括未逐项验真；下方列出与原文需核对处 |
| [HumanoidVersus RLBench](https://humanoidversus.com/benchmarks/rlbench) | 分开展示不同研究的 18 任务和 10 任务结果、模型适配、来源、试验设置和未知字段，标注不可直接比较 | 分类名称不表示此条实际运行的是人形机器人；数据由站方归集，本次未逐行核查原论文或交互 |
| [WorldFoundry RLBench](https://openenvision.org/WorldFoundry/docs/evaluation/benchmark-hub/rlbench) | 条目、指标及官方结果导入和归一化说明；该页明确没有自带仿真器 | 是项目自述，未安装运行；少样本解释应以 RLBench 原论文和官方代码为准 |
| [CodeSOTA RLBench](https://www.codesota.com/benchmark/rlbench) | 模型成绩、来源入口、标记和报告错误入口 | 页面展示的标记不等于本次独立验证；未提交任何更正或验收交互 |

[另一中文 RLBench 综述](https://github.com/ai-guru-global/mechanic-romance/blob/master/corpus/benchmarks/manipulation/rlbench.md)已讲任务、子集、指标和限制，说明中文深度解释也不是空白；文中的各种横向判断未逐项核实，不作为本记录事实依据。

## 许可与信息不一致线索

[RLBench 固定版本软件许可](https://github.com/stepjam/RLBench/blob/02720bba4c73fe02eb75df946b8791b806028a9d/LICENSE)第 2(b) 条将软件使用限定于非商业、内部或学术研究，列举多种商业用途并要求拟商业使用者联系许可方；第 2(f) 条还规定发布研究结果或数据的条件。DClaw 页面在写“仅限研究”同时，另有“可自由用于研究并将成果用于产品”的概括，这与原文所列限制可能造成理解冲突，具体活动须按原文和适用对象判断，不能凭该概括推定授权。

该许可针对指定的软件和衍生物；[本站条目](../../content/benchmarks/rlbench.json)引用的第三方转换数据或视频各自适用范围、上游素材权利及发布权仍需单独核查，不能把软件限制自动套到所有素材，也不能把数据卡上的 Apache-2.0 自动视为上游全部授权。本记录不是法律意见，未作许可结论或修改资源。

## 产品含义

用户从训练示范、测试配置走到复现模型会碰到不同问题：数据能否获取、子集和动作配置是否相同、检查点如何选、单次视频和总体成绩分别代表什么。站内样例能帮助解释流程，但官方文档、中文资料及竞争站已经覆盖不少部分；没有证据表明追加聚合页面可替代仿真调试或解决集群部署，也没有已验证的用户量、留存或付费意愿。可用具体问题测试读者是否能快速查到出处并区分条件，之后再判断是否值得投入。
