# OpenCompass 具身评测：实际页面、候选条目和复现线索

核查日期：2026-11-10。以下区分浏览器看到的网页内容、项目方文档和一位开发者的报告；没有运行官方工具、提交评测、复验榜单分数或采访用户。

## 两个不同的“司南”

上海人工智能实验室的 [OpenCompass 具身评测](https://opencompass.org.cn/embodied-intelligence)与此前记录的 [Sinan Robo](https://robo.sinanlab.com/benchmarks) 是不同域名和项目。本轮没有发现足以证明它们为同一团队或同一数据库的证据，不将两者合并统计。OpenCompass 页面自述覆盖操作、导航、感知，以及静态、仿真、真机评测；这只是页面所述体系范围，不表示本次逐项验收了真机服务。

浏览器实际打开 [VLA 操作榜](https://opencompass.org.cn/embodied-intelligence/rank/vla)：页面称汇总 EBench 的模型结果、按 Test 分数排序，并分别列训练步数、种子数、分数与成功率、两个验证划分、移动及灵巧操作分项。浏览时展示 π0.5、InternVLA-A1、π0 和 X-VLA 四行；例如 π0.5 行列 `200K`、3 个种子、Test 分数 45.61、Test 成功率 0.2953。数值属于该页面快照，不是本站测试，也不能将 45.61 当作 45.61% 成功率。页面可能更新；此处不推断训练步数的实际运行细节或榜单覆盖了所有模型。

榜单入口另有“大脑小脑分层模型榜单”，在本次浏览可见多个高层视觉语言模型和低层动作模型的总分。其历史研究 [StaticEmbodiedBench 论文 v1](https://arxiv.org/html/2508.06553v1)同样分开 VLM 与 VLA，后者比较模型生成动作与人工遥操作参考动作的距离并映射为分数：参考轨迹由真机采集，不等于每个模型都控制真机完成任务。这与 EBench 的交互仿真、不同模型和不同测试口径不是同一个分数体系。

## EBench：已有分项、诊断报告和运行工具

[EBench 固定版本 README](https://github.com/InternRobotics/EBench/blob/355fe56d17eee77c659df5cdda980b205bdba3ce/README.md)描述 Isaac Sim 室内操作评测：26 种任务结合不同泛化和划分形成 794 个评测任务实例，不能把 26 与 794 相加。作者称开放 `val_train`、`val_unseen` 用于调参，线上留出 `Test-Mini`；实际运行、访问要求及具体任务组成未独立验证。

同一项目已提供任务图册、四个参考模型、线上评测和多轴诊断。[固定版客户端文档](https://github.com/InternRobotics/genmanip-client/blob/e3f4026017d66261114df1f636666dd3f40c02fd/README.md)称 `gmp analyse` 能展示总指标、训练至测试变化、能力雷达、泛化差异和任务成功率热图；它还能读取逐 episode 结果。文档特别提示没有可用本地运行时会退回参考数据报告，因此生成了 HTML 不等于成功加载用户运行。以上是文档说明，本次没有安装运行或确认每项交互。

这对项目决策是直接竞争反例：中文具身评测、成绩、能力细分、报告、轨迹入口及部分运行工作流均已有相邻方案。EBench 官方做的是自己的特定测试和工具，不能据此认定其覆盖了本站全部基准；本站当前也不具备其评测运行和自动分析能力。

## 静态题目、实际公开数据与本地盘点

[StaticEmbodiedBench 数据卡](https://huggingface.co/datasets/xiaojiahao/StaticEmbodiedBench)称公开了完整集中的 200 条样例，提供常规及 circular 评测入口；当次 Hugging Face Viewer 显示两份 TSV 的列不一致而无法完整生成预览，但同时展示部分行。这是预览生成状态，不证明文件无法下载或官方评测不可运行。数据卡标 MIT；论文、图像上游及可能的衍生使用许可需分别核实。

对当前本地 `content/benchmarks/*.json` 的 `name` 与 `id` 做大小写不敏感精确匹配：`EBench`、`StaticEmbodiedBench`、`MMSI-Bench`、`MMSI-Video-Bench`、`VL-LN-Bench` 及其列出的常见连字符 ID 均未命中，所有 JSON 成功解析。这只说明指定名称字段与别名 ID 未精确命中，不能证明正文、别名或相关数据没有覆盖。本站已有 [LIBERO](../../content/benchmarks/libero.json)、[RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)、[VLABench](../../content/benchmarks/vlabench.json) 等操作仿真条目，但不应把它们与 EBench 当作同一基准或直接比较分数。

## 真实问题与决策边界

[EBench issue #5](https://github.com/InternRobotics/EBench/issues/5)中，一位开发者询问同一 π0.5 的线上和本地评测结果为何不同，并猜测是否与种子或 episode 抽样有关；问题当前显示 Closed，本次未看到公开答复，也没有运行或查明原因。不能将其猜测当成诊断，更不能把它当作对本站的需求或购买意向。

可验证的产品假设仍是让读者针对一个具体模型或任务找到**测量对象、版本、设置、运行者与结果口径**。但官方已经提供大量上述信息与诊断工具，本站能否为目标读者减少查找时间需要对照实验；该研究不构成用户访谈或留存数据。
