# 仓储调度与无人机：具身候选评测

调查日期：2026-11-10。未运行模拟器或模型；未新增正式 benchmark 条目。

后续补充：[三维仓库路径、订单与路径联合仿真及从业者访谈](./2026-11-10-warehouse-3d-and-order-coupling.md)。

## WareMax：仓储多机器人任务分配

[WareMax](https://github.com/Skelf-Research/waremax/tree/abaa4fdaa5c62b9dc32782969203e7f2d53cfbc2)是开发者公开的离散事件仓储调度仿真和强化学习环境，涉及 AMR 任务分配、拥堵、货架、站台、时效及不同启发式基线。README 提供种子控制、结果文件与时延拆分等说明；作者同时承认此前有影响可复现性的哈希迭代问题，并称已修复。本次没有运行或复验其确定性与结果，也不能将仓库自述的仿真逼真度视为现场验证。

只读解析固定提交中的 [runs.csv](https://github.com/Skelf-Research/waremax/blob/abaa4fdaa5c62b9dc32782969203e7f2d53cfbc2/crates/waremax-gym/python/results/runs.csv)，有 83 行汇总记录、4 个 scenario 名称、每行 `n_eval=8`。例如 `standard_tight` 下，`round_robin` 的 `on_time_pct_mean` 为 98.2065、`least_busy` 为 81.4849；CSV 的对应标准差分别为 3.4127、13.7709。这只是作者提交的该条件汇总，不是实时仓库的 SLA、所有其他场景的排名，亦不是本次重复运行或统计显著性检验。这里同一任务的传统启发式也可能表现较强，不能假定用了 AI 一定更好。

## WareFly-VLA：仓储无人机开环预测

[WareFly-VLA 论文](https://arxiv.org/html/2610.08526)在单个 Isaac Sim 仓库内收集 507 条人工遥控仿真轨迹、8,504 个 1 FPS 非终止动作转移，按 episode 划分为 431 条训练、76 条验证；同一批 episode 的 10 FPS 版本转移数量不同。任务是根据外观描述搜索和跟随人物，涉及无遮挡、遮挡及高度变化等，不能描述为真实仓库飞行数据。

论文主要以真实参考帧进行逐步动作误差分析，并将预测动作积分为**开环**轨迹计算偏差；局限章节明确尚未做仿真或真机闭环部署。正文个别地方把偏差称作 closed-loop，但相应表 8 标题及计算过程均是 open-loop；不应把该表成绩当成闭环任务成功率。论文报告不同采样频率下逐步动作幅度变化，不能直接把 1 FPS 和 10 FPS 的原始误差高低解释为模型变强或变弱。

论文称评审期间数据和代码需申请、接受后公开；指向的 [HF 地址](https://huggingface.co/datasets/SIMOGroup/WareFly-VLA)本次未能验证公开访问状态，没有申请权限或下载。按名称检索 `content/benchmarks` 和现有研究文档未发现 WareMax 或 WareFly-VLA 的同名独立记录；这只是有限字符串搜索，不证明没有别名或相关内容。

## 多载 AGV 和四向穿梭车调度

[多载 AGV 调度数据仓库](https://github.com/zhangyb0705-tech/multi-load-agv-resilience-data/tree/836b1709a199a8b17c4ae35df1cf9bdc5899ff76)发布匿名配置与六种优先策略的汇总结果，场景含 9 台车、25 个普通订单及插入紧急订单。固定版本的 [结果表](https://github.com/zhangyb0705-tech/multi-load-agv-resilience-data/blob/836b1709a199a8b17c4ae35df1cf9bdc5899ff76/data/strategy_results.json)显示：线性权重加奖励选择记录吞吐 3.26 托盘/分钟、紧急订单插入时间 4018.6 秒；对数权重加概率选择分别是 3.13、2888.6。各指标定义、优先级与现场目标均需连同原文看，不宜把吞吐单列当作统一最优。

作者明确指出企业原始作业记录、完整订单需求矩阵、坐标、随机种子、模型权重及事件日志不公开或未在现有资料中找到，因此该发布物只能检查配置和报告表，**不足以完整复训或复现**；本次未运行作者校验脚本，也未读取论文原始表。

[四向穿梭车调度研究](https://pmc.ncbi.nlm.nih.gov/articles/PMC10006453/)以真实仓库为参考，模拟一个包含 2 项入库和 2 项出库的任务批次，并对两种遗传算法各运行 15 次；它是特定设备、任务及仿真下的运筹优化实验，不是大语言模型成绩或现场性能验收。这类材料可以扩展仓储评测目录，但是否有人希望把传统运筹基准和 AI 模型资料放在一起，仍需要用户验证。
