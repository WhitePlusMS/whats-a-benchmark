# LIBERO-Plus 失败录像：首次评测与选择性重跑的分母

调查日期：2026-11-10。对照本站已有 LIBERO-Plus 条目、第三方公开资料卡及固定版本配置和日志；本次只读取文本元数据，在内存复算，未运行评测、检查视频、核验原始模型权重，也没有向发布者求证。这里是第三方的一次仿真工作流，不是 LIBERO-Plus 官方榜单，也不能推断其他评测有同样问题。

## 用户可能遇到的具体问题

本站 [LIBERO-Plus](../../content/benchmarks/libero-plus.json) 已介绍机器人初始姿态等七类扰动，并收录一条第三方单次仿真记录；单次记录不能代表模型的整套成绩。复现者在 [LIBERO-Plus issue #63](https://github.com/sylvestf/LIBERO-plus/issues/63) 请求逐变体成功和失败记录，用于分析扰动。另一个公开来源 [π0.5 失败资料卡](https://huggingface.co/datasets/d3d3shan/pi05-libero-plus-robot-initial-failures/blob/1807a9af5ce972c57d2bb35fd040587f5adedb22/README.md)恰好提供针对 libero_10、Robot Initial States 的失败录像索引和日志。这些是不同人和不同运行，不证明 issue 提问者使用了该资料或需要本站。

资料卡写 393 个任务、每任务 5 次，同时写总计 2,430 次、成功 1,738 次、成功率 71.52%。393 × 5 是 1,965；多出的 465 次等于对 93 个任务各重跑 5 次。区别能够从同一固定 revision 的原始文本进一步验证。

## 核对配置、重跑及日志

下列文件均来自数据仓库 revision `1807a9af5ce972c57d2bb35fd040587f5adedb22`：

- [eval_manifest.json](https://huggingface.co/datasets/d3d3shan/pi05-libero-plus-robot-initial-failures/blob/1807a9af5ce972c57d2bb35fd040587f5adedb22/metadata/eval_manifest.json) 的首次运行配置分别列低难度 241 个任务、高难度 50、50、50、2 个任务，共 393 个不重复任务 ID，每任务 5 次。SHA-256：`8112617fb881e9ec97c21caa5a034e747c174c372ef54c99b7ee56aed726d306`。
- [重跑 manifest](https://huggingface.co/datasets/d3d3shan/pi05-libero-plus-robot-initial-failures/blob/1807a9af5ce972c57d2bb35fd040587f5adedb22/metadata/robot_initial_low_l1_l3_failed_rerun_manifest.json)列出 93 个失败任务 ID；选择的是任务而非仅失败的单次 episode，重跑配置每任务仍运行 5 次。文件 SHA-256：`81aa894464ff1c93117a7e1b38706ad6f3aedfc35e7e5bc13c01e4b3ef80eace`。
- [队列日志](https://huggingface.co/datasets/d3d3shan/pi05-libero-plus-robot-initial-failures/blob/1807a9af5ce972c57d2bb35fd040587f5adedb22/logs/robot_initial_queue.log)约 8.8 MB，在内存读取后提取六段 `Local Eval Info` 中每个任务的 `successes` 列表；日志 SHA-256：`b6e3dd4196d90612d6b4a32b1c672f1e97a5044e580e3e23391033243f60068d`。

| 日志分组 | 任务数 | 运行次数 | 成功 | 失败 |
| --- | ---: | ---: | ---: | ---: |
| 低难度首次评测 | 241 | 1,205 | 1,017 | 188 |
| 高难度首次评测，四组相加 | 152 | 760 | 413 | 347 |
| 低难度选中失败任务重跑 | 93 | 465 | 308 | 157 |
| 首次评测合计 | 393 | 1,965 | 1,430 | 535 |
| 首次及重跑合计 | 包含重复任务 | 2,430 | 1,738 | 692 |

首次评测按日志成功项数除以运行数得到 **1,430 / 1,965 ≈ 72.77%**；首次和选择性重跑合起来得到 **1,738 / 2,430 ≈ 71.52%**，恰好复现资料卡。两者均是对现有日志字段的算术整理，而不是本项目重跑出来的成绩；后者包含有选择地重复运行的任务，不是 393 个任务各 5 次的等权均值。此处不判断发布者是否原本有意把 71.52% 作为模型通用成绩，也不能将任一结果外推到整个 LIBERO-Plus 或真实机器人。

## 录像、原评测和重跑不是一一等同

[failure grids 元数据](https://huggingface.co/datasets/d3d3shan/pi05-libero-plus-robot-initial-failures/blob/1807a9af5ce972c57d2bb35fd040587f5adedb22/metadata/robot_initial_full_failure_grids.json)列出 504 条带视频的失败记录及 71 条缺少视频的失败记录，合计 575，不等于汇总中的 692 次失败。按元数据来源字段，504 条中 157 条来自低难度重跑、347 条来自高难度首次运行；71 条缺视频记录来自低难度首次运行。元数据中带视频与缺视频的任务 ID、episode 编号和 seed 三元组互不重合。本次只核查索引，没有下载或观看视频，也不证明所有外链视频可访问。

按日志中的任务 ID 与列表位置配对，对低难度首次运行和重跑可找到 465 个相同组合，其中 111 个布尔结果不同：71 个首次失败而重跑成功，40 个首次成功而重跑失败。例如任务 291 的首次列表是 `[true, false, false, true, true]`，重跑为 `[true, true, true, true, true]`。资料卡写 seed 从 1000 到 1004，元数据也逐条列 seed；但这里没有独立验证环境完全确定、每次实际初始状态一致或失败原因。改变只是日志报告的结果差异，不应据此归因模型、仿真或具体随机过程，也不能把重跑录像当成同一首次失败过程的原始录像。

## 竞品与产品含义

[LeRobot 的 LIBERO-plus 文档](https://huggingface.co/docs/lerobot/en/libero_plus)已有运行、动作接口与重置条件的说明，并提示软重置和硬重置可能产生不同观测和结果；这不能自动解释以上日志变化。原发布者也已经公开重跑策略、索引和日志，本站并非唯一能提供来源的地方。

与现有 [任务数量与复现对照](2026-11-09-libero-plus-task-count-reproduction.md)相比，本案例补充一个不同的阅读问题：分数里是否混入为生成失败录像而追加的选择性重跑？可以把“首跑总数、重跑选择规则、是否重新计入汇总、录像来自哪一轮”作为小规模阅读测试的问题。现无证据说明用户会在本站完成该任务，亦无留存或付费证据；无需据此建设执行或日志分析平台。
