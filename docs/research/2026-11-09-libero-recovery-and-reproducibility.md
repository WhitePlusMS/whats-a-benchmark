# LIBERO 失败恢复与复现：新增评测、需求和替代方案

调查日期：2026-11-09。本记录基于本地条目及公开帖子、论文和仓库；没有运行模型、模拟器或真实机器人，也没有访问使用者。社区陈述和论文实验均按来源限定，不是付费意向或产品需求验证。

中文开发者补充：[π0.5 同检查点复现与 RoboTwin 提问](2026-11-09-chinese-robot-reproduction-demand.md)按四套件核对官方与复现报告，并区分三任务小样及完整套件。

Pro2.0 补查：[任务实例数量与演示来源](2026-11-10-libero-pro2-manifest-provenance.md)对照论文、作者说明和固定版清单，并区分存储复制与独立来源；未运行评测或逐条验算 HDF5。

π0-FAST 补查：[训练变换、权重与归一化](2026-11-10-openpi-fast-libero-config-evidence.md)对照官方历史分数、开发者三种子消融及待合并问题；区分重新训练和已有权重的推理兼容性，未独立复现。

## 与本站现有 LIBERO 条目的关系

- 本地 [LIBERO-Plus](../../content/benchmarks/libero-plus.json)描述在物体布局、相机、初始状态、指令、光照、纹理及传感器等条件变化下的仿真任务成功率；其公开训练轨迹与测试成绩分开。本站还有 [LIBERO](../../content/benchmarks/libero.json)、[LIBERO-PRO](../../content/benchmarks/libero-pro.json) 和 [LIBERO-Pro2.0](../../content/benchmarks/libero-pro2.json)。
- 新发现的 [LIBERO-Recover 项目页](https://liulin815.github.io/LIBERO-Recovery/)和[同题预印本](https://arxiv.org/html/2609.05178)聚焦于策略进入失败状态后恢复并完成原任务；作者称使用 2,178 个恢复场景，另收集 3,184 条人工遥操作恢复训练轨迹。论文附录说明恢复场景使用 MuJoCo 状态文件；此处的模型失败轨迹发生在仿真中，不能因“真实发生的失败”措辞误说是真机实验。恢复成功率与普通初始状态下的任务成功率、Plus 扰动条件成功率不是同一指标。
- 该预印本称场景采集、数据及部分实验有指定的训练和测试边界；论文还表示录用后将公开复现材料，而当前项目页已有代码和数据入口。本次未逐文件下载、运行或核对开放范围，不推断两处版本状态及授权是否完全一致。项目页标记投稿和审稿中；不能将其视为已通过同行评审。
- 对 `content/benchmarks` 中名称及文本按 `LIBERO-Recover`、`LIBERO-Recovery` 等字样检索未命中；这只说明所查当前文件没有相应文本，未排除其他写法或尚未整理的资料。应先核查版本、数据及许可，再决定是否收录；本轮没有增加网站评测条目。

## 使用者问题与既有工具

1. [社区讨论：LIBERO 轨迹质量](https://www.reddit.com/r/robotics/comments/1uz0cvz/)中，发帖者自述通过损失轨迹和人工检查发现可能存在操作失败的序列，询问是否应删除、以及如何更好地理解数据；回复者提醒失败后的恢复片段可能有训练价值。帖子对训练集及评测数据的判断未经本次独立复核，不能据此断言官方数据错误，也不能将删掉失败轨迹当成普遍正确答案。
2. [roboeval 作者帖子](https://www.reddit.com/r/ROS/comments/1su6jul/)描述因 LIBERO 结果难以比较而制作评估框架，强调在 JSON 中记录依赖、GPU、驱动、随机种子和代码版本；[仓库](https://github.com/sim-too-real/roboeval)列出 LIBERO-Spatial 的运行记录和清单。这是工具作者的自述和已有替代工具，未独立复跑；79/100 与其提到的约 72% 不应被自动解释为同协议显著性能差或官方错误。
3. 该工具原链接 `ActuallyIR/roboeval` 当前跳转至 `sim-too-real/roboeval`；它与本站 [RoboEval](../../content/benchmarks/roboeval.json)双臂仿真任务套件是不同项目，名字相似不足以合并结果或来源。
4. [BenchMend 数据卡](https://huggingface.co/datasets/benchmend/libero)列出作者整理的 400 条原指令及 90 条修改指令的 LIBERO 评测回放，称后者只重跑被改写指令的任务，并保留相应任务、种子、初始状态及原本成功判定。它们是评测回放而非训练示范；其中数据内容和配对关系未经本站重新核验，也不能把两组不等规模记录的总体成功率直接视作随机对照结论。

## 相关研究和判断

[机器人操作基准审计](https://ripl.github.io/manipulation_benchmark_audit/)针对 LIBERO、CALVIN 等研究捷径、统计显著性、过拟合和数据来源依赖；作者报告部分 LIBERO 任务可由没有语言编码器的较小模型取得接近高分，并与 RoboTwin 2.0 等作对照。具体结论受训练数据、模型、指标和实验设计限制，不推及所有任务；[论文限制部分](https://arxiv.org/html/2606.04233)指出其诊断是理想测试的替代。论文可作为为什么要展示评测边界的依据，不能证明使用者需要本站。

可检验的机会是把基准版本、普通执行与失败恢复、训练示范与评测回放、运行设置及原始资料连接起来，让使用者完成一个具体查询；竞争替代包括原论文、现有数据卡和复现工具。是否存在足够读者、是否比这些资料更省时间，仍需真实读者对照测试。
