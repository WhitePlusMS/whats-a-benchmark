# Terminal-Bench 旧版具身关联、版本预算与逐次结果

核查时间：2026-11-10。本研究不执行评测、不运行仿真，也不修改项目的评测数据。项目中对应条目是 [Terminal-Bench 2.0](../../content/benchmarks/terminal-bench-2.json)、[2.1](../../content/benchmarks/terminal-bench-2-1.json)、[3.0](../../content/benchmarks/terminal-bench-3.json)和 [4.0](../../content/benchmarks/terminal-bench-4.json)。

## 固定版本任务正文检索

从 GitHub 固定修订的任务目录提取任务名并请求每份 `instruction.md`，对正文按英文词边界扫描 robot、manipulator、grasp、locomotion、biped、quadruped、humanoid、drone、unmanned、autonomous、SLAM、lidar、navigation、trajectory、kinematics、dynamics、mujoco、mjcf、actuator、motor、flight、vehicle、physical、sensor 及常用词形。目录中 `dataset.toml` 不是任务，起初误请求其 `instruction.md` 而得到 404，已从任务计数中排除。

| 对象 | 固定修订 | 读取情况 | 命中及解释 |
| --- | --- | --- | --- |
| 2.0 | [`2fd12b88aafdd04a52c298e3940bcb189f9766d6`](https://github.com/harbor-framework/terminal-bench-2/tree/2fd12b88aafdd04a52c298e3940bcb189f9766d6) | 89/89 正文成功 | 仅 `tune-mjcf` 命中；物理仿真性能调优，非机器人操控成绩。 |
| 2.1 | [`12b7565679ce5006230b820666353673a133db93`](https://github.com/harbor-framework/terminal-bench-2-1/tree/12b7565679ce5006230b820666353673a133db93/tasks)，核查时仓库 HEAD | 89/89 正文成功 | 同一名称 `tune-mjcf` 命中。该 HEAD 是此刻仓库快照，不自动等同历史排行榜所有运行的固定包。 |
| 3.0 | [`v3.0.0` 指向 `2b0442c3c583b710ca8da14c8e601b99f2f1f244`](https://github.com/harbor-framework/terminal-bench/tree/2b0442c3c583b710ca8da14c8e601b99f2f1f244/tasks) | 74/74 正文成功 | 9 项命中；`biped-contact-dynamics` 是轨迹与动力学，货运调度、数据处理、光波导、音频等其他命中不因词形出现就归类机器人。 |

本轮全量仅指上述固定版本的任务**指令正文**和所列关键词；附件、代码、隐藏测试及未命中的语义均不在覆盖范围，不能推出其他任务绝无具身关联。一次 `dataset.toml` 路径 404 是筛选文件时包含了非任务清单文件，并非缺失任务。

## 2.0 / 2.1：仿真性能工程而不是机器人策略

[2.0 原始任务](https://github.com/harbor-framework/terminal-bench-2/blob/2fd12b88aafdd04a52c298e3940bcb189f9766d6/tune-mjcf/instruction.md)和 [2.1 原始任务](https://github.com/harbor-framework/terminal-bench-2-1/blob/12b7565679ce5006230b820666353673a133db93/tasks/tune-mjcf/instruction.md)都要求调整 MuJoCo MJCF，使模拟同一场景两秒的耗时不超过参考模型的 60%，同时满足末态精度要求。两份任务指令都是 635 字节，SHA-256 同为 `c7fb299b6c6d6c9a2dcd95c5938e6f902ddad1cb02aee875d369cb7eae584b1f`。该比较只覆盖指令文件，不说明环境、测试或两个版本整体完全一致。

这是优化仿真模型/求解设置的编码智能体任务，与机器人研发中常见的 MuJoCo 工具链有关；任务本身没有要求操作实体机器人，也不能根据模拟器名称将其当作机械臂成功率或 VLA 策略榜。官方 [Harbor 任务说明](https://hub.harborframework.com/tasks/terminal-bench/tune-mjcf/latest)提供任务、资源及验证概述，但它是动态 latest 页面，不能替代上述两份固定版本文件。

已有替代资料覆盖到具体任务：[MarginLab 的 2.0 任务页面](https://marginlab.ai/explorers/terminal-bench/tune-mjcf/)提供指令、测试、解答和环境入口；[benchmarks.wiki 的 2.1 页面](https://benchmarks.wiki/benchmarks/terminal-bench-2-1/tasks/tasks--tune~2dmjcf)提供题目、讨论及版本信息。不能把“集中展示一道真实任务”当作本站独有功能。两站的运行与转载授权本次未核实。

## 3.0 → 4.0：同名双足任务的资源条件不同

[3.0 指令](https://github.com/harbor-framework/terminal-bench/blob/2b0442c3c583b710ca8da14c8e601b99f2f1f244/tasks/biped-contact-dynamics/instruction.md)和 [4.0 指令](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/instruction.md)要求生成双足行走、跳跃和奔跑数值轨迹，检查接触、动力学等，而不是控制真机。

逐行比较这两份固定指令，唯一文字差异是 agent 允许时间从 14,400 秒增至 28,800 秒。[3.0 的 task.toml](https://github.com/harbor-framework/terminal-bench/blob/2b0442c3c583b710ca8da14c8e601b99f2f1f244/tasks/biped-contact-dynamics/task.toml)与 [4.0 的 task.toml](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/task.toml)同时将任务 CPU 从 2 调至 4，其他配置文件仍应单独核验。[4.0 README](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/README.md)把这两项调整归于上游 PR #1800。

两版的 `tests/test_state.py` 内容一致，SHA-256 均为 `a2fc641435045239e75909cc72c04a3219acfc8ef01c602f4805c330eb601ff2`；这只证明该文件一致，不能证明全部环境、模型、测试及整体协议一致。预算变化本身足以要求比较结果时保留版本与资源条件，不能据此断言某个分数差异完全由资源造成。

该案例还有具体的评分解释问题：[第三方审计](https://preferencemodel.com/blog/terminal-bench-4-is-saturated/issues)认为跳跃与奔跑的 flight interior 判定窗口未在指令中充分明确。对照 [4.0 固定测试文件](https://github.com/harbor-framework/terminal-bench/blob/452bf305c6daa62fc59061d22133a7cbc7c1572e/tasks/biped-contact-dynamics/tests/test_state.py)，跳跃轨迹相关检查使用 `block[3:-3]`，奔跑使用 `block[5:-5]`。这证实测试存在不同的排除窗口；“未充分明确”及对实际失败次数的影响仍是审计者判断，本轮未复跑失败轨迹或独立复核通过率。

## 逐次结果与已有分析

- [Harbor 一次公开运行](https://hub.harborframework.com/jobs/5aebbab5-1f8f-4cdb-8073-c6ce785a930d/trials/e2ad609d-6d8d-4ead-a020-a256d3fdad8c)记录 `codex@0.149.1`、模型标识 `openai/gpt-5.6-sol`、状态 completed 和 reward 1.00，并提供执行轨迹。该页面的命令没有固定版本标识；这是一轮编码智能体轨迹生成，不是独立机器人模型分数或实机测试，也不能据此推断 3.0 或 4.0 综合排名。
- [AgentTime 同任务页面](https://agenttimebench.com/benchmarks/terminal-bench/biped-contact-dynamics/)展示其不同要求时长的多次运行，提示结束标注和截断等限制；这是其他产品已经提供的同任务、多次过程对照。页面会更新，本次未逐次复算或认定其统计有代表性。
- [Terminal-Bench Viewer](https://terminal-bench.omnara.com/webroot/index.php/_environment)搜索快照也展示过该任务不同 agent 脚手架的每次通过、成本和耗时，但动态页面不能证明后续数据不变；其报告属于项目作者的实验，不代表统一官方排行榜。
- [测试系统的维护问题 #1262](https://github.com/harbor-framework/terminal-bench/issues/1262)将本任务列为需要同时阅读额外规范文件的例子；这是开发与维护者视角的具体问题线索，不能推断终端用户规模或付费意愿。

产品含义：项目若提供“同一任务跨版本资源变化、测试条件、来源与运行记录”，这里有可供读者核验的例子；但官方仓库、逐题浏览器和第三方运行分析已经覆盖部分信息，真正的增量需要拿实际读者任务测试，不能凭例子断言市场空白。
