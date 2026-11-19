# Industrial Atlas 与 AssetOpsBench 同题对照

调查日期：2026-11-10。页面、论文和小文件只读核查，未操作目录筛选或比较交互、运行 IBM 评测、连接真实设备，也未证明站点覆盖完整。

## 工业目录也是直接竞品

[Industrial Atlas 的工业数据集目录](https://www.indatlas.com/datasets/)展示按领域、设备、数据模态、任务、来源、许可和是否为 benchmark 的筛选项，以及并列比较入口；另有[工业基准目录](https://www.indatlas.com/benchmarks/)。不同页面与缓存显示的条目数量和栏目不一致，可能对应不同页面快照，故不把某一次数字当固定规模。

例如其 [SKAB 页面](https://www.indatlas.com/datasets/skab/)说明测试台、水泵、传感器、标签、真实数据来源及原始项目链接，另提供相似数据集；[AssetOpsBench 页面](https://www.indatlas.com/datasets/assetopsbench/)列用途、来源、示例、模拟环境和相关数据。它直接覆盖「帮人找到工业评测、了解数据和来源」的一部分需求；本次未逐字段审计其内容，也未验证筛选比较功能是否按页面描述工作。本站如补充工业说明，不应将「工业评测目录、资料筛选」视为尚无人提供。

## IBM AssetOpsBench 的不同数量和来源

[IBM 仓库](https://github.com/IBM/AssetOpsBench)提供工业资产运维智能体、工具和场景，示例包括列站点设备、查询泵失效模式、分析冷机时序和生成工单；这些任务与仓储机器人控制不同。仓库称 v1.0 于 2025 年发布 141 个场景，当前简介又称 460 多个场景；[HF 数据页面](https://huggingface.co/datasets/ibm-research/AssetOpsBench)当次 `scenarios` 子集显示 152 行，页面整体另显示 467 行及六个子集。不同版本与子集计数不能直接合并，也未核实 460 多项的具体枚举和彼此重叠。

[论文](https://arxiv.org/html/2506.03828)描述其评测环境是模拟容器，同时称早期评测材料包含数据中心传感器、运维记录等多源工业数据。应区分「真实来源数据」和「模型在模拟接口内执行」，不能一概称全是真实设备在线运行，也不能把「模拟环境」误解成所有底层数据全为合成。该项目现有排名页标注更新中，仓库说明使用模型裁判和六项轨迹评价；实际计分、现有榜单交互和真实数据的全量开放范围均未复验。

## 固定版本的一条具体不一致

只读获取 HF 固定修订 [`5e25bb7f` 的 `data/scenarios/all_utterance.jsonl`](https://huggingface.co/datasets/ibm-research/AssetOpsBench/blob/5e25bb7f2cd37fb68b9a9e1f99d170ca5be7ce17/data/scenarios/all_utterance.jsonl)，解析得到 152 行、152 个不同 ID。其中 ID 42 的用户问题要求 **2020-09-19** 某时刻的温度，`characteristic_form` 所写预期结果却是 **2015-09-19**。ID 10 也在用户问题中指定 2020 年 6 月第一周，而预期说明写「上周」。这说明这些记录的文字存在日期描述不一致；尚未检查特定评分器实际使用哪个字段、其他配置是否覆盖、现行评测结果是否受影响，不能推断 IBM 榜单分数错误或项目不可使用。

这类同条记录对照可以帮助读者审视评测任务和预期是否一致，但工业目录、作者仓库和其他来源本身也已提供资料与纠错入口；是否有人愿意专门使用本站的核查说明，仍待用户测试。
