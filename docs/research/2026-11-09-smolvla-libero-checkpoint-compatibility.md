# SmolVLA 与 LIBERO：同名模型的检查点和接口

调查日期：2026-11-09。核对本地资料、公开开发讨论与固定版本配置；未下载权重、运行策略、操作机器人或采访用户。配置字段不是兼容性保证，版本也可能更新。

## 从本站已有的 LIBERO 数据出发

本站 [LIBERO 条目](../../content/benchmarks/libero.json)展示一条第三方转换的仿真训练示范：首帧 `observation.state` 为 8 维、`action` 为 7 维；另有不同来源的一次 π0.5 测试记录。示范不是 SmolVLA 成绩，也不能仅从相同维度认定其输入语义、机器人坐标系或训练协议完全一致。

[LeRobot issue #2246](https://github.com/huggingface/lerobot/issues/2246) 中，一名用户尝试在 LIBERO 环境评测 `smolvla_base` 时遇到异常。2025 年协作者解释具体调用中基础检查点的 6 维动作与 LIBERO 所需 7 维动作不一致，建议使用针对 LIBERO 微调的 [smolvla_libero](https://huggingface.co/HuggingFaceVLA/smolvla_libero) 或自行微调。线程中还讨论相机字段重命名；用户后续称重命名有效，但不能将这句话解读为对所有动作兼容、成功率或真机安全性的确认。

## 直接核对两个检查点配置

本次查询 Hugging Face 模型 API 获取各仓库当时的 HEAD，再读取相应固定提交的 `config.json`：

| 配置字段 | [smolvla_base 固定版本](https://huggingface.co/lerobot/smolvla_base/blob/5e8d12a6e2975b0e5e5fce7c8caf47c371d257b6/config.json) | [smolvla_libero 固定版本](https://huggingface.co/HuggingFaceVLA/smolvla_libero/blob/6721902bc4d61e50a3bfdb11dfb4cb626f05d102/config.json) |
| --- | --- | --- |
| 输出动作 shape | `[6]` | `[7]` |
| 状态输入 shape | `[6]` | `[8]` |
| 图像字段 | `camera1`、`camera2`、`camera3`，各 `[3,256,256]` | `image`、`image2`，各 `[3,256,256]` |
| `chunk_size` / `n_action_steps` | 50 / 50 | 50 / 1 |

这些是配置文件声明，并非测得的延迟、成功率或机器人实际关节数；动作和状态维数也不是同一种量。当前配置与当年 issue 提到的动作维度相符，但本次未核实该 issue 当年实际使用的文件哈希，也未证明其他代码版本一定有相同报错。即使观察到本站示范的 8/7 维度与微调配置相同，单位、相机顺序、归一化、动作表达及运行时版本仍需分别核对。

## 使用者在部署中遇到的不止是维度

- [LeRobot #1763](https://github.com/huggingface/lerobot/issues/1763) 的使用者在 SO-101 上询问相机视角及顺序，自报保持采集顺序时结果较好；本人之后查看部分预训练数据，发现视角不同。没有受控复验或普遍结论，关闭 issue 也不等于所有顺序问题已解决。
- [LeRobot #5082](https://github.com/huggingface/lerobot/issues/5082)报告微调后动作幅度异常；一名贡献者分享自己曾遇到采集与推理标定文件变化，同时提出归一化和视觉编码器等排查方向。提出方向不等于已经证实该 issue 的根因；本次未运行。
- 相关 [PR #5091](https://github.com/huggingface/lerobot/pull/5091)截至本次查看仍开放，提出在微调覆盖处理器统计量时增加提示；不能将未合并的提议称为已发布修复，警告也不等于自动解决动作异常。

## 现有替代工具和机会边界

[SmolVLA 基础模型卡](https://huggingface.co/lerobot/smolvla_base)已经标明这是用于具体场景微调的基础模型；[LIBERO 微调模型卡](https://huggingface.co/HuggingFaceVLA/smolvla_libero)已有模型、评测和使用入口。[lerobot-doctor](https://github.com/jashshah999/lerobot-doctor)项目自述可针对多种策略检查数据维度、短轨迹和归一化等；本次未安装，不应断言能诊断以上每个 issue。现有 [CanIEmbody](https://caniembody.pages.dev/) 作者也在整理模型—机器人证据矩阵；本次未逐格验证其状态。

对本站可检验的方向：在 LIBERO 解释页附近，帮助读者连接“某个 benchmark 成绩对应哪一个 checkpoint、哪些输入输出、是否微调、在仿真还是真机测试”。这比单独展示模型分数更接近以上问题，但会与模型卡、工具和社区文档竞争；尚无读者对照、需求规模或付费证据，也不能承诺诊断真实设备。

## 补充：不同模型团队的复现提问与已有结果页

- [VLA-0 issue #29](https://github.com/NVlabs/vla0/issues/29)中，提问者报告论文平均 94.7、使用发布检查点得到 92.7，询问检查点与批量评测设置。协作者分享了批量脚本并自报重新测试为 93.9（1,879/2,000），之后推测 GPU 差异可能相关，但明确未确认。三者不是本站重复运行，不能认定硬件是原因或论文成绩错误。
- [QuantVLA issue #4](https://github.com/AIoT-MLSys-Lab/QuantVLA/issues/4)中，另一位提问者试图复现 π0.5 的 FP16 基线，报告 LIBERO-Long 为 84.4%，其引用论文为 93.5%，请求公开完整评测脚本、检查点、推理设置和随机种子。另一评论者表示也有类似困难；本次读取仍为 Open，未见作者给出结论。两人的报告未验证条件一致，也不等于已查明差异来源；不能将 FP16 基线分差直接解读为量化带来的损失。
- 针对其他 SmolVLA 复现讨论，[lerobot-bench](https://github.com/jashshah999/lerobot-bench)作者在 [LeRobot #3264](https://github.com/huggingface/lerobot/issues/3264)推荐其工具比较检查点、分析既有结果及统计区间；这是作者自荐的已有工具，本次未安装或验证其统计假设，也不能认定它解决了上面两个不同项目的问题。
- 已有中文 [LIBERO-Spatial 相机消融结果页](https://chaoshengsc.github.io/libero-camera-ablation/dashboard/?lang=en)和[项目仓库](https://github.com/chaoshengsc/libero-camera-ablation)展示同一具身基准的检查点、干预、逐任务结果及数据链接。作者强调各实验覆盖不一：例如部分相机干预只测 π0 和 π0.5，不能推广到四个模型；不同权重与管线的对照也不能单独归因于某一因素。该页面本身是“成绩加条件、图表与证据”的现有同题替代；本站未复跑、重新计算其统计量或完整验收页面交互。
- 同一项目作者提出 [LeRobot #5118](https://github.com/huggingface/lerobot/issues/5118)：特定输入缺少靠前相机时，其他图像可能被放进不同槽位。[修复 PR #5129](https://github.com/huggingface/lerobot/pull/5129)读取时仍 Open，其描述对 SmolVLA 明列 `empty_cameras` 预算限制，不能称为所有缺失输入已修复。issue、实验页和 PR 由同一作者关联，不当作多个独立用户需求，也不能自动把它归为上述 VLA-0 或 QuantVLA 分差的原因。

## 进一步的公开复现记录：同一检查点、不同推理设置

一位开发者建立的 [SmolVLA–LIBERO 评测记录](https://github.com/zuoxingdong/smolvla-libero-eval)列出评测依赖、固定检查点、相机映射、控制设置、逐任务汇总和部分视频。作者称这些细节会影响两个运行的可比性；该仓库是作者自报的实验记录，并非本次独立复验，也不能认定就是 issue #2354 提问者或问题的答案。

作者固定 `HuggingFaceVLA/smolvla_libero` 的版本为 `6721902bc4d61e50a3bfdb11dfb4cb626f05d102`，在 LIBERO-Spatial 的 10 个任务中各进行 20 个 episode。其[默认式配置汇总](https://github.com/zuoxingdong/smolvla-libero-eval/blob/main/results/summaries/p3_nas1_ns10_200ep.json)报告 75.5%，[另一配置汇总](https://github.com/zuoxingdong/smolvla-libero-eval/blob/main/results/summaries/p3_nas1_ns1_200ep.json)报告 81.5%；仓库说明该对照的 `n_action_steps` 均为 1，`num_steps` 分别为 10 和 1，后者是模型生成动作块时的去噪步数，而不是机器人实际走了几步。两行作者报告共 200 次各自的仿真测试，不是 400 次真机实验或两种模型的比较。

## 评测设置和读者实际问题补查

[LeRobot issue #4614](https://github.com/huggingface/lerobot/issues/4614)的报告者使用 `lerobot/smolvla_libero`，称在相同任务和初始条件下改变 `n_action_steps`：LIBERO-Object 上 10 步为 42/50，50 步为 32/50；Spatial 则分别为 115/150 和 80/150。另两位评论者报告在不同硬件／设置下观察到同方向差异，但结果幅度不同；另一人仅运行 10 步条件，不能当作对差异的配对复现。以上均为参与者自报，本站未运行或验证初始状态、统计量及依赖，不能将差额作为所有 SmolVLA 成绩的修正值。

[SmolVLA 论文表 13](https://arxiv.org/html/2506.01844)也分别报告每次执行 1、10、30、50 个动作的仿真成绩；它是作者实验，与 issue 中后续模型文件及各参与者运行不能当作同一次实验。[固定修订模型配置](https://huggingface.co/lerobot/smolvla_libero/blob/a24f1f380461b665158d52acd140152c79e8b36d/config.json)列 `chunk_size=50`、`n_action_steps=50`、`num_steps=10`，用户命令可覆盖配置；三个值分别用于动作块长度、执行长度与生成过程，不能混为一个指标。

讨论里有人明确建议在评测输出或模型卡给出动作执行长度、任务次数和 seed；后来一位使用者表示该讨论帮他定位配置并提供了自己的 Object 结果。评论者还撤回了对所有 `n_action_steps == chunk_size` 情况统一告警的建议，理由是其他策略也可能合法采用该默认值。这支持“分数需带运行配置”的具体用户问题，但不证明受访者会使用本站，也不能据此判定目前所有版本缺少这些元数据。

汇总还显示任务 6 从 75% 降到 65%，任务 9 从 65% 升到 75%，各是 20 次；因此总体高 6 个百分点并不表示每个任务都更好。该仓库对照的是特定环境、依赖、初态和参数，不证明任意任务都应使用同样设置。我们仅核对作者的说明和两个汇总文件，未运行代码、复查逐次 outcome 或检验差异统计显著性。

这是一道可以验证产品价值的具体问题：给读者两条成绩，能否快速找到它们是不是同一模型、各做了多少任务和 episode、不同配置是什么，以及能否用于真机判断？但作者仓库已经直接提供这些信息，本站必须通过对照阅读实验检验是否真的减少查找时间，不能把整理一张表本身当作独占优势。

## 补充：复现清单和单次结果并不自动证明可复现

[roboeval 作者的社区帖子](https://www.reddit.com/r/ROS/comments/1su6jul/roboeval_reproducible_robot_policy_evaluation/)称其因 LIBERO 数字难以比较而建设评测工具；这是作者自荐和个人需求，不是独立受访者或市场规模证据。其[仓库](https://github.com/sim-too-real/roboeval)说明可记录检查点、硬件、依赖、任务结果和种子，并生成本地静态榜单；它与本站不是同一产品，但已提供运行和成绩追溯的替代路径。

只读解析固定提交 `6e9d9daf1526ff344b3742b935fde167faeffb13` 的 [SmolVLA 结果](https://github.com/sim-too-real/roboeval/blob/6e9d9daf1526ff344b3742b935fde167faeffb13/results/smolvla_libero_spatial.json)：100 条 episode 中成功 79 条，对应文件中 `success_rate=0.79`；10 个任务各 10 条，逐任务成功次数依次为 7、8、8、7、8、10、9、6、9、7。文件 SHA-256 为 `32774e83ef899bc16ae55b483a6427b123f65771dd833a31dc99bb38fbd15d37`。这是对作者提供的标记做算术核对，不是重新执行测试或验证每次成功判定。

该文件记录 `HuggingFaceVLA/smolvla_libero`、依赖列表、GPU 和命令，但 `container_digest` 是 `null`；命令也未给出模型仓库的固定 revision。作者的[运行脚本](https://github.com/sim-too-real/roboeval/blob/6e9d9daf1526ff344b3742b935fde167faeffb13/scripts/run_smolvla_libero_spatial.py)允许指定 revision，不能据此推断本次历史运行加载了当前权重，或者说缺少容器摘要就一定无法复现。README 的 schema 校验与哈希命令检查文件格式和内容一致性，不等于在另一台机器重新运行得到相同结果；本次没有实际运行这些命令。

一个特别容易误读的对照：结果文件中 Spatial 第 0 任务、记录 seed 7 的 SmolVLA episode 标为失败、220 步；本站 [LIBERO 样例](../../content/benchmarks/libero.json)引用另一第三方 π0.5 记录，同任务的 trial 0 也写 seed 7，标为成功、79 步。二者是**不同策略、不同运行和不同来源**；相同任务描述及 seed 数字不足以证明初始状态和评测协议相同，不能算作配对实验或模型优劣结论。

另一个已有方案 [VSArena](https://github.com/ONISCOR/VSArena)项目作者称其提供浏览器工作台、仿真叠方块和带来源的正式结果；README 区分调试工作台与正式成绩，称正式轨道使用官方 harness，并明确回放是稀疏位姿而非 RGB 视频。这是作者文档与[自荐帖子](https://www.reddit.com/r/robotics/comments/1w9og8d/vsarena_v060_a_new_studio_for_running_and/)所述，本次未运行或验证榜单签名、实时可用性及评分完整性；同一作者跨社区发帖不能计作多个独立需求。
