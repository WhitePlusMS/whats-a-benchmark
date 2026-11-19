# RoboTwin 图像接口与同任务复现：需求和现有方案

同题补充：[Handover Block 的单次记录、论文成绩与复现讨论](2026-11-10-robotwin-handover-reproduction.md)区分数据生成、Easy/Hard 与不同运行，并只读复算一个第三方诊断的末态条件；未执行仿真。

调研日期：2026-11-09。对照本站 RoboTwin 2.0 / RoboDojo 条目及公开文档、开发者反馈、复现仓库；未运行外部训练、仿真或机器人，也没有对本站用户做访谈。网页和仓库为当时快照。

## 对照本站已有材料

本站 [RoboTwin 2.0](../../content/benchmarks/robotwin-2.json)已有 `beat_block_hammer` 的 `demo_clean` 转换训练示范视频、`adjust_bottle` 的训练轨迹，以及独立的模型运行回放；示范和评测回放有不同来源与用途，不是同一批测试成绩。该转换视频取自 robotensor，数值样例部分取自另一转换集；本次未对其上游原始图像与转换视频逐帧核验，不能根据下述通道问题断言本站视频有错。

本站 [RoboDojo](../../content/benchmarks/robodojo.json)有仿真演示和第三方运行样例。两个 benchmark 不是同一评测，但共享的图像编解码与适配工具会影响使用者如何准备数据。

## 一个已被具体检查的通道问题

[OpenWAM issue #13](https://github.com/OpenWAM-Official/OpenWAM/issues/13)提出者观察到 RoboTwin 与 RoboDojo 的两个读取器采用不同 JPEG 解码方式，最初明确表示没有 RoboDojo 轨迹，不能确定哪一条正确。维护者随后报告对照数据自带的预览视频：10 个真机数据 episode、4 个仿真样本中，其查看的饱和色区域更接近 `cv2.imdecode` 的结果而非 PIL 的结果；预览视频与轨迹 JPEG 使用不同路径，且视频压缩会带来残差。以上是维护者报告，本项目没有获取文件自行复算。

针对该仓库的 RoboDojo 数据读取器，[修复 PR #17](https://github.com/OpenWAM-Official/OpenWAM/pull/17)于 2026-09-08 合并。维护者称旧测试夹具由 PIL 按另一编码约定生成，因此读取器和测试能相互通过，却没有覆盖实际录像的存储约定；修复包含相应测试。维护者同时指出旧 checkpoint 的训练输入分布发生变化，旧权重需要结合其训练和部署处理判断，不能简单认为换解码器就会使旧权重效果改善。

同一位提问者还在 [XPolicyLab issue #116](https://github.com/XPolicyLab/XPolicyLab/issues/116)追踪相近路径；两条 issue 不能当成两个独立用户。OpenWAM 维护者在 issue 中说无法完整还原以前 XPolicyLab 评测是否调整过图像处理，计划重跑；未看到这一说法本身给出重跑后的完整模型结果。因此不能断言历史榜单成绩全部错误，也不能推断红蓝通道变化一定影响某个具体成绩多少。

## RoboTwin 官方处理的两个字节格式

[RoboTwin 官方 README](https://github.com/RoboTwin-Platform/RoboTwin#getting-data)指出下载或自采集图像可能有两种字节格式：旧格式保存时通道约定与 JPEG 常规读取不同，较新的标准格式带 `XPL-RGB1` 标识。官方建议配对使用 `decode_image_bit` / `encode_image_bit`，而非自行假设一种解码方式适用于所有数据。这个说明提供现有解决方案，并不是本站发现的新缺陷。

实用的问题是：“这条数据来自哪一个格式，训练和部署两侧是否使用一致约定？”这仍需结合具体数据修订、转码代码和模型检查点核对；仅看一个数值或视频画面，不足以认定完整数据管线正确。

## 已有的同任务复现与记录

[第三方 RoboTwin 复现仓库](https://github.com/KQuaneo/robotwin_repo)围绕本站已有的 `beat_block_hammer` 展示 50 条示范、不同策略的训练、运行、同 seed 比较和扰动实验。其表格报告 π0.5 LoRA 45/100、Diffusion Policy 26/100，ACT 13/46 标为暂停的部分结果：第三者不是完成的 100 次实验，不宜直接与前两行作完整排名。作者称使用不同 GPU 训练，原始大视频、权重和数据未包含在公开仓库；这是作者自报的单任务特定设置，本站没有复跑，也不能由此推断全 RoboTwin 或实机能力。

[RoboSeed](https://github.com/PrimitiveX/RoboSeed)已将多个机器人模型的 checkpoint 来源、训练配方、模型运行接口、训练 GPU 小时、测试次数及跨 LIBERO、RoboTwin、RoboCasa 和 CALVIN 的结果组织到同一入口，并链接实验记录和权重。例如其 LIBERO-plus 结果注明复用 LIBERO 权重、扰动按实际数量加权，CALVIN 则单列连续任务指标。不同 benchmark 的百分比不应直接排成统一榜。这是现有的直接竞争/参考方案，其运行与结果为作者报告，本站未审计所有配置或复现。

[EgoWAM 的 RoboTwin 说明](https://github.com/GaTech-RL2/EgoWAM/blob/main/docs/robotwin.md)提供固定的 100 个保留 seed 和已发布 checkpoint；作者报告动作块直接以错误方式喂给逐点规划控制器时成功率接近零，改为与数据原频率一致的流式执行后改善。没有提供可以直接归因的完整前后对照表，不能将其作为通用提升数值。它说明动作频率、控制器和模型 checkpoint 一样需要记录，具体效果仍取决于环境及实现。

## 实际复现问题与现有选型说明

- 在 [FastWAM issue #65](https://github.com/yuantianyuan01/FastWAM/issues/65)，一位开发者自报从头训练后，RoboTwin 50 项的 clean 和 random 平均分别为 67.04% 和 66.26%，低于他引述的论文总成绩约 91.8%。他称主要已知区别是全局 batch 256 对 1024，并请求训练曲线；同帖另一位参与者称遇到类似问题。这里的成绩和设置是各自自报，未复算、未验证两次实验其他条件相同，不能据此认定 batch 是原因或官方分数错误。
- 项目作者回复称其训练样本总量大致接近，但不能确定差距原因；建议尝试梯度累积，并表示可以提供训练曲线。另一位评论者自报较小 batch 在单项任务达到不同成绩；单任务结果与完整平均不是同一指标。回复是排查建议而非已确认根因，当前 issue 显示开放。
- [RoboTwin 官方榜单](https://robotwin-platform.github.io/leaderboard.html)说明固定训练演示、clean/random 两种评测、默认均值及 co-train 和 single-task 共榜；同时提供深度输入标记与逐任务结果入口。[Physical AI Lab 的已有说明](https://physicalailab.io/en/robotwin-leaderboard-cotrain-single-clean2random/)已解释共训与单任务、clean2clean 和 clean2random 的区别，文中的相同均分示例明确标为假设数值；其[中文首页](https://physicalailab.io/zh/)也提供具身入门资料，本次未确认该篇逐条中文翻译是否存在。
- 这些资料表明，复现者关心训练曲线、算力和条件，读榜者也需要区分赛道与环境；但官方和第三方已有部分答案。要验证本站价值，应让真实读者围绕同一问题比较寻找信息所需时间与正确率，而不是把一个 issue 或现有文章视作本站用户与付费证据。

## 项目机会与边界

同任务训练、运行成本、checkpoint 和评测协议的整理已有实际项目实践，不能把这些字段本身当成本站独家壁垒。可以测试的一项阅读任务是：给读者本站 `beat_block_hammer` 训练示范及第三方同任务评测表，要求区分示范与模型评测、完整与部分运行，以及图像和动作配置仍缺什么；再与原始官方文档及复现仓库比较答案和耗时。当前只是验证设想，没有读者实验、复现结果或付费证据。
