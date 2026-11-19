# LIBERO-Plus：分类数量、逐任务成绩和权重匹配

核查日期：2026-11-09。依据本站当前条目、论文、固定版本分类文件和公开开发者提问；没有运行评测、复核具体权重或获得论文作者解释。这里的差异不自动证明论文分数错误或所有后续版本都有相同差异。

## 一个可复算的具体差异

[论文表 7](https://arxiv.org/html/2510.13626)统计 10,030 个评测任务；[issue #76](https://github.com/sylvestf/LIBERO-plus/issues/76) 中，一位复现者指出论文表格与公开分类文件在任务组数量上不同。为了核实这一点，本次用 Python `requests` 将 [提交 `1461c0c` 的 `task_classification.json`](https://raw.githubusercontent.com/sylvestf/LIBERO-plus/1461c0c/libero/libero/benchmark/task_classification.json)读入内存，按顶层任务组与每行 `category` 计数；所读文件 SHA-256 为 `b1673038ec7be57a4990197028a5769c8a665095214d536ac2a6c2f443f6da97`。

| 分类 | 论文表 7 | 固定版本文件 | 差值（文件减论文） |
| --- | ---: | ---: | ---: |
| Spatial 总数 | 2,293 | 2,402 | +109 |
| Object 总数 | 2,576 | 2,518 | −58 |
| Goal 总数 | 2,569 | 2,591 | +22 |
| Long / 文件中 `libero_10` 总数 | 2,592 | 2,519 | −73 |
| 合计 | 10,030 | 10,030 | 0 |
| Spatial 的 Objects Layout | 312 | 385 | +73 |
| Spatial 的 Language Instructions | 354 | 390 | +36 |

四组文件内的总数加起来同为 10,030，**总数相同并不证明每组、每种扰动的任务集合相同**。上表属于文件统计和论文数字的直接对照，尚未逐项比较任务 ID、确认论文所用文件修订或求证数据发布历史；不能给出差异的成因。

issue 提到论文表 10 中 Spatial / Layout 的 40.7、93.9、82.7。我们独立检查了整数分子：假设每任务只跑一次、每次二元成功、直接计算百分比再保留一位小数，那么 312 次分别可由 127、293、258 次成功得到；385 次中没有整数成功次数可按这一方式得到上述三项。该计算**只能排除这些特定假设下的 385 次简单比例**，不能据此确定论文真实分母、断言有错误，也不排除其他汇总、四舍五入或重复试验方式。论文和 issue 中的评测结果未由本站复跑。

## 开发者还需要什么

- [issue #76](https://github.com/sylvestf/LIBERO-plus/issues/76)的提问者请求当时使用的任务 ID 列表及图像裁剪配置，并报告其复现数字；本次可见页面没有作者答复。提问者的实测与论文分差尚未独立复验，不能归因于任务分类或裁剪。
- [issue #63](https://github.com/sylvestf/LIBERO-plus/issues/63)请求公开模型逐变体成功/失败记录，以研究组合扰动；当前可读讨论没有答复。逐任务原始结果不是本站现成能从总分推出的数据。
- [issue #66](https://github.com/sylvestf/LIBERO-plus/issues/66)询问某论文平均成绩是否按任务组匹配不同 OpenVLA-OFT checkpoint。评论者提出了一种可能做法，但本次未见论文作者确认，不能把评论推测作为该论文已证实的评测配置。

这些是不同人的公开问题，不能由此估计需求数量或认为他们需要本项目。要可靠回答具体分数需要原始任务列表、实际 checkpoint、运行配置与结果，而资料站无法凭空补齐未公开信息。

## 同项中文资料与其他工具

本站 [LIBERO-Plus](../../content/benchmarks/libero-plus.json)说明七种扰动并展示训练轨迹与一次第三方仿真测试，不能将单次记录作为全基准成绩。[中文机器人笔记的 LIBERO 页面](https://github.com/ImChong/Robotics_Notebooks/blob/main/wiki/entities/libero-benchmark.md)也介绍 LIBERO-Plus 与不同研究成绩，并提醒跨页模型、训练和子集不同；其数据未逐项核验，因此“中文解读及可比性提示”不是本站独有。

[AWS 开源仿真示例](https://github.com/aws-samples/sample-rfm-simulation-on-aws/blob/main/docs/targets.md)已列 Spatial 的七类变体数量，包含 Layout 385 与 Language 390；其属于作者文档，测试运行和具体版本本次未验收。它与本次固定文件计数一致，但不是对论文实际分母的确认。

### 2026-11-10：同项中文名词表与论文成绩

[具身智能新手名词表](https://embodiedterms.com/)首页自称收录 2,947 条术语、14 个类别，事实截止 2026-09-30；其中的仿真与评测分类包含 LIBERO、LIBERO-Plus、CALVIN、RLBench 等站内已有项目。这个数字包含模型、硬件和其他术语，**不是 2,947 个 benchmark**，不能与本站评测条目数比较；搜索及全站链接本次未逐项验收。

其 [LIBERO-Plus 条目](https://embodiedterms.com/t/libero-plus/)提供中文定义、七类扰动、论文和代码链接，并称 OpenVLA 从原始条件 **76.5%** 降到相机扰动 **1.1%**。[作者论文表 1](https://arxiv.org/html/2510.13626)确实列出该模型和这两个数；这是作者报告的仿真条件对照，不是本站复跑，也不应推广成所有模型的效果。同表的 OpenVLA-OFT 相机扰动成绩是 59.7%，不能把原版 OpenVLA 的 1.1% 标成 OFT。名词表的 [LIBERO 条目](https://embodiedterms.com/t/libero-benchmark/)也给出了 97.1% 和 76.5%，并关联原始资料；本次未重新验证每项训练协议是否相同。

两边内容侧重点不同：本站 [LIBERO-Plus](../../content/benchmarks/libero-plus.json)已有扰动说明、训练轨迹和第三方单次测试样例；名词表已有简短中文解释、关联术语、论文及示例成绩，且将事实截至时间写出。本站当前样例不是模型整体成绩，不能仅因展示视频就声称更适合读者。名词表声明内容经 AI 辅助整理且部分条目经其独立事实核查；这些是对方的流程自述，本次只以论文核对上述两个分数。[首页](https://embodiedterms.com/)标注内容采用 CC BY-NC 4.0，转载需依其具体许可和使用方式另行核对；这里仅链接并进行事实比较。

此处进一步说明“中文解释＋关联来源＋模型发布数字”并非本站独有，而具备具体样例是否更易理解仍待读者任务测试；不能据任何一页对照推断全站品质或市场需求。

对产品而言，可以测试读者能否从本站说明、论文和现有资料准确判断“10,030 是否意味着每一子类都相同”与“是否能仅凭总分生成逐任务结果”。这是候选阅读任务，尚无对照实验、回访或付费证据，不据此建议立即扩建机器人评测运行平台。
