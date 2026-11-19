# RoboCasa-Shift：相同总分下的配对变化与阶段诊断

核查时间：2026-11-10。只下载公开 JSONL 到内存做数值检查，没有保存原始数据、运行仿真、执行策略或核验真实机器人。站内已有 [RoboCasa365](../../content/benchmarks/robocasa365.json)，未发现同名 `RoboCasa-Shift` 正式条目；按名称搜索不排除其他别名或站外内容。

## 它与本站 RoboCasa365 的关系

[RoboCasa-Shift 论文](https://arxiv.org/abs/2610.27861)与 [作者数据卡](https://huggingface.co/datasets/HaochengWang23/robocasa-shift)说明它是在 RoboCasa365 上构建的第三方仿真诊断：从预先确定的 16 项 Composite-Seen 候选中，以无扰动表现门槛筛出四项长步骤任务；对 GR00T N1.5 的一个策略配置，比较光照、相机角度、机器人底座初始位置和高斯模糊四类因素，每种三档强度。

四项分别是 PreSoakPan、RinseSinkBasin、StackBowlsCabinet、WashLettuce；它们不包含本站展示的 OpenDrawer。作者对另外两个公开策略做筛选但未达到该方案的进入条件，不应解读为所有模型均已比较或否定其在其他任务上的能力。该报告未说明这四项可以代表全部 365 项，更不能推断真实机器人结果。

每任务有 20 个配对基础实例，各自运行一次 clean 和 12 种单因素条件，即 `4 × 20 × (1 + 12) = 1,040` 条记录。每种扰动和 clean 可形成 80 对，同一个 clean 被重复用于 12 种条件的对照；**1,040 条记录不是 1,040 对独立场景**。

## 固定数据核算

2026-11-10 查得 HF 仓库修订 [`c65a06b0622e531f291c59d009bc12916861bf3c`](https://huggingface.co/datasets/HaochengWang23/robocasa-shift/tree/c65a06b0622e531f291c59d009bc12916861bf3c)，在内存读取 [4 份 episodes.jsonl 与清单](https://huggingface.co/datasets/HaochengWang23/robocasa-shift/tree/c65a06b0622e531f291c59d009bc12916861bf3c/formal_evaluation)：每任务 260 条，均标 `VALID_FORMAL`；计算出的 4 个文件 SHA-256 均与发布清单一致。按 task + pair_id 分组得到 80 个组、每组 13 个条件，没有重复条件；每个 clean 与其 12 条扰动记录的 `base_state_hash`、`env_seed` 和 `policy_seed` 均一致。这只验证记录字段一致，不能独立证明内部模拟状态或代码没有其他差异。

对每个 80 对按 `official_success` 复算：

| 条件 | clean 成功 | 扰动成功 | 成功→失败 | 失败→成功 | 两次都成功 / 两次都失败 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 相机 L1（第三人称相机角度最大扰动 2°） | 59/80 | 59/80 | 4 | 4 | 55 / 17 |
| 相机 L2 | 59/80 | 44/80 | 21 | 6 | 38 / 15 |
| 高斯模糊 L1 | 59/80 | 44/80 | 22 | 7 | 37 / 14 |
| 高斯模糊 L3 | 59/80 | 0/80 | 59 | 0 | 0 / 21 |

相机 L1 的两个总分都为 73.75%，但各有 4 个实例朝相反方向变化，净变化被抵消；这与[论文配对表](https://arxiv.org/html/2610.27861)一致。不能把那 4 次失败→成功理解成相机扰动普遍有益，也不能把同一 clean 记录重复视作新模型测量。

两个具体记录均按配对键查得：

- `StackBowlsCabinet__p018`：clean 的 `official_success=true`，相机 L1 为 `false`；二者记录的环境与策略种子和基础状态 hash 一致。作者自定义阶段追踪由 2/2 变为 1/2，首个未完成阶段为 `place_stack_in_cabinet`。
- `PreSoakPan__p002`：clean 为失败、相机 L1 为成功；记录的环境与策略种子和基础状态 hash 同样一致。其阶段追踪由 1/3 变为 3/3。

轨迹记录未包含视频或底层仿真状态文件；以上只是数据中的标签及配对信息，没有独立观察操作过程、证实扰动物理效果或复演。

## 同一总分下降，不等于同一失败阶段

相机 L2 与模糊 L1 的 clean→扰动净减少都为 `15/80 = 18.75` 个百分点；但成功→失败回合分别为 21 与 22。读取 `completed_subgoals=0`：前者 4/21 = 19.0%，后者 8/22 = 36.4%；后一组还有 1 条官方失败但自定义 tracker 标记全部阶段完成。阶段追踪是作者构造的诊断标准，不等同于 RoboCasa 官方完成判定，且这些条件有不同失效回合集合，不能认为发生在相同的 15 次执行上。

## 与已有产品和用户问题的关系

作者已发布论文、配对记录、哈希、诊断字段和 [代码库](https://github.com/HaochengWang23/RoboCasa-Shift)，因此“把成功率拆成扰动前后变化与失败阶段”已经有同题方案；公开记录不包含原始视频、模拟器状态或模型权重，重新运行仍需另行获取上游资源。许可分别是记录的 CC BY 4.0 与代码仓库许可，不自动扩展至模型及其他素材。

本地现有 [RoboCasa 单任务与重放研究](2026-11-10-robocasa-open-drawer-replay-protocol.md)记录使用者询问演示重放与成功判定；这是一条相邻但不同的问题，不能将其视为 RoboCasa-Shift 用户或本站潜在客户。对产品而言，可把“相同总分下哪些任务实际变了”作为需要测试的阅读任务；目前无读者对照、用户规模或付费证据。
