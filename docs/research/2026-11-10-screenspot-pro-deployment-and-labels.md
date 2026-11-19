# ScreenSpot-Pro：同项成绩、部署配置与标注疑问

调查日期：2026-11-10。对照本站已发布条目、作者基准、第三方公开测试和开发者讨论；未运行模型或评测，不复制、镜像软件截图。

## 本站已有内容与评测对象

本站 [ScreenSpot-Pro 条目](../../content/benchmarks/screenspot-pro.json)已有高分辨率界面定位说明、三条公开标注记录及坐标字段；未展示第三方软件截图。官方[榜单](https://gui-agent.github.io/grounding-leaderboard/)说明使用 greedy decoding 和 micro-average，并按软件和元素类别展示。

输入是截图和待定位的自然语言指令，输出是目标控件位置；这是一项静态 GUI 定位测试，不能把该准确率解释成多步骤任务完成率。作为不同对象的例子，[Ferret-UI Lite 论文 v1](https://arxiv.org/html/2509.26539v1)报告 ScreenSpot-Pro 53.3% 和 OSWorld 完整任务成功率 19.8%（最多 50 步）。这两个数字来自不同数据集及任务流程，不能作同题分差，更不能把其中任何一个推广为该模型在某个用户桌面上的成功概率。

## 同一模型，运行设置改变

[Eyes-4B 固定版结果说明](https://github.com/deskmind-ai/eyes/blob/391b6af7224326087edae1b514452aca8190f0fb/docs/results.md)由模型开发者报告，而非独立第三方复测：

| 测试 | 条件 | 报告结果 |
| --- | --- | --- |
| 公开基准设置 | 1,581 条，GPU、bf16、原始分辨率、一次推理 | 67.7% |
| 作者称对应 Mac 应用的测试 | 同一组 1,581 条，M4 Pro、4-bit MLX、最长约 200 万像素、一次推理 | 50.9% |
| 分辨率对照 | 同一批 300 条、相同 4-bit 权重；200 万与 400 万像素上限 | 49.3% 与 59.0%；报告的中位延迟分别为 4.7 秒与 11.9 秒 |

全量测试之间同时改变了硬件、精度、框架、提示及图像尺寸，不能把 16.8 个百分点全部归因于缩图或量化；300 条对照只比较了作者描述的那组设置。作者称测试时 Mac 部分时间还运行另一个模型服务，绝对延迟不应当作独立实测。结果文档称 50.9% 使用应用设置，而[同一固定版 README](https://github.com/deskmind-ai/eyes/blob/391b6af7224326087edae1b514452aca8190f0fb/README.md)另有一句称本地服务具体部署设置尚无基准数；二者的准确对应关系仍待作者澄清，不能把 50.9% 当作已验收的所有应用运行结果。

这是成绩记录需要保留配置的具体例子，而不是本站独有发现：项目作者已公开这些结果、设置和部分配对统计。

## 基准标注与维护者回应

[官方 issue #32](https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding/issues/32)中，一名使用者报告固定数据 revision 的若干潜在错标、相近截图和同指令不同标注；其人工核对针对一个模型错过的部分样本，不是全库人工审计。评测维护者回复认可维护勘误或新版本的方向，但表示当时无法立即更新；问题仍显示开放，不能写成已经修复或全部争议均已验证。

本次只读核对该 issue 的三个 ID 对应的[固定版原始 JSON](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro/tree/210e78d3844251110bff86c95835ebd37a6930fa/annotations)：blender_windows_19 的 X 轴指令及 bbox、matlab_macos_41 的字体粗细指令及 bbox、inventor_windows_60 的英文 redo 指令与 bbox 字段均与提问者列出的原始值相符。截图及建议框没有独立核验，因此这只能确认其引用了相应记录，不能独立断言标签错误，也不代表本站现有三条样例有问题。

## 真实问题与已有替代

- [一位开发者的帖子](https://www.reddit.com/r/ClaudeAI/comments/1j6ty1v/claude_computer_use_not_generating_correct/)说自己提供 1024×768 静态 PNG 后得到明显偏离目标的点击坐标，尚未连接虚拟机；评论提出工具建议，但问题原因没有经本站复验。该人没有说自己需要 benchmark 目录。
- [EvalScope 中文文档](https://evalscope.readthedocs.io/zh-cn/latest/benchmarks/screenspot_pro.html)已经提供这项评测的中文介绍、分项、坐标格式、模型输出解析和运行入口。它将 26 个应用/平台文件称为 26 款应用；本站及原论文摘要使用 23 应用的口径，尚未完整核查这两个数字的对应关系，不断言哪一方错误。EvalScope 的适配器设置也不能直接推广成官方所有评测的统一设置。
- [Village LLM Atlas](https://atlas.village.dev/benchmarks/screenspot-pro)已在同一评测页列模型、成绩、推理设置和不同来源链接；其部分行来源是另一模型厂商的报告，因此来源方与被评测模型方未必相同。本次未逐项核验其成绩，且其数据来自多个来源，不能假定一张表的所有结果均由同一平台以相同协议复测。
- [ML Foundations 的榜单查看器说明](https://huggingface.co/spaces/mlfoundations-cua-dev/leaderboard-viewer/blob/main/README.md)列出 ScreenSpot-Pro、分组和训练检查点比较；当次页面显示 Space sleeping，未验证交互或实时结果。

这些材料说明部署选型、坐标解析和数据修订有具体问题，也说明中文说明、公开分数与分组浏览已有替代。可以验证的产品假设是：面向真实 GUI 开发者，链接静态定位、在线任务、模型运行设置及公开勘误，能否减少其理解时间；目前没有本站读者实验、复现或付费证据。
