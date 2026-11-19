# IndustryEQA：工业仓储视频问答与数据路径

调查日期：2026-11-10。只读论文、项目页和公开数据文件；没有下载视频、运行模型或评委，也没有验证模拟场景符合真实安全规范。

## 评什么

[IndustryEQA 论文](https://arxiv.org/html/2505.20640)基于 Isaac Sim 仿真仓库视频，针对人员安全、设备安全、物体和属性识别、时空理解提出问题。其主要是给定预先拍摄的视频回答问题；论文将主动探索列为未来工作。高分不能解释为机器人已经自主巡检、发现真实现场隐患或达到安全认证要求。

论文描述用 LLM 根据参考答案对直接回答和推理分别打 1—5 分，再归一化为百分数；论文也比较了不同评委的评分趋势。因此这里的百分数是归一化评委分，不应简单说成完全答对的题目比例。

## 题数、视频数与路径核查

[官方数据卡](https://huggingface.co/datasets/IndustryEQA/IndustryEQA)称小仓库 971、大仓库 373 个问答，即 1,344 条；[项目页](https://johnx69.github.io/IndustryEQA/)称对应 60 和 16 个视频，共 76 个。

在 HF 固定版本 [`59d45fb7`](https://huggingface.co/datasets/IndustryEQA/IndustryEQA/tree/59d45fb70571ce1b1e2d2af4fdbbfb2676087b68) 只读解析两份标注 JSON：行数分别是 971 和 373；小、大仓库标注分别涉及 59、15 个不同 `path`，合计 74 个路径。文件仓库 `data/` 递归清单有 81 个 `.mp4` 路径：标注引用的 74 个中，73 个能与清单完全匹配；另有 8 个清单路径未被两份标注引用。这是路径字符串统计，不代表视频内容各不相同、全部可播放或视频场景数量。

具体来说，[大仓库标注](https://huggingface.co/datasets/IndustryEQA/IndustryEQA/blob/59d45fb70571ce1b1e2d2af4fdbbfb2676087b68/large_warehouse_annotation.json)中 ID 250—273 共 24 条指向 `data/large/no_human/large_07/medium_01.mp4`；该固定版本递归文件清单中未发现同名路径，直接只读 HEAD 请求返回 404；同目录 `video_01.mp4` 的 HEAD 返回 200。没有下载观看视频，不能假定后者就是预期视频、断言某个模型结果受影响，也不能排除其他数据包或后续修复。项目页 76、标注 74 和仓库清单 81 统计对象不同，原因未确定。

每行同时包含 `question`、`direct_answer`、`reasoning_answer` 和 `path`。准备测试输入时应依据官方评测代码区分题目与参考答案，不能把包含参考答案的整行直接发送给被测模型；本次未审计评测脚本，不能据此声称官方评测存在泄漏。

另据维护者在[场景文件发布说明](https://huggingface.co/datasets/IndustryEQA/IndustryEQA/discussions/2)，其上传 57 个小仓库和 14 个大仓库的 USD 场景文件，另有 3 个小、2 个大场景文件因协调错误遗失。这里的 USD 是仿真场景资产，与上述标注指向的视频缺失是不同问题；不能据此推断视频无法使用或缺失路径成因，也不能说所有场景无法复现。
