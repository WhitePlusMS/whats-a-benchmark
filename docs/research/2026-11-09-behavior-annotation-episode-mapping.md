# BEHAVIOR-1K：演示编号、标注对应关系与既有资料

核查日期：2026-11-09。项目已有 BEHAVIOR-1K 训练演示画面与技能标注，之前只知道两者都带数字 10、长度不同，未确认关联。本次直接读取官方固定版本元数据，解决“应先关联哪个文件”的问题；没有逐帧核验，也没有修改产品内容。

## 官方元数据的两条记录

直接读取 [官方固定版本 episode 元数据 parquet](https://huggingface.co/datasets/behavior-1k/2026-challenge-demos/blob/4f50b44796641a4d526a19d9aeadc8aa51e2f2c2/meta/episodes/chunk-000/file-000.parquet)，使用 `episode_index`、`raw_episode_id`、`annotation_path` 和头部视频时间字段作对照：

| LeRobot episode_index | raw_episode_id | 元数据指定的标注 | 视频帧数 | 标注 task_duration |
| --- | --- | --- | ---: | ---: |
| 0 | 10 | [episode_00000010.json](https://huggingface.co/datasets/behavior-1k/2026-challenge-demos/blob/4f50b44796641a4d526a19d9aeadc8aa51e2f2c2/annotations/task-0000/episode_00000010.json) | 1956 | 1776 |
| 10 | 120 | [episode_00000120.json](https://huggingface.co/datasets/behavior-1k/2026-challenge-demos/blob/4f50b44796641a4d526a19d9aeadc8aa51e2f2c2/annotations/task-0000/episode_00000120.json) | 2769 | 2769 |

两条均在 `task-0000`，任务为 `turning_on_radio`。站内 [BEHAVIOR-1K 条目](../../content/benchmarks/behavior-1k.json)的视频画面引用的是第二行，现有技能标注引用的是第一行。因此**不能按相同数字 10 将两者当成同一次轨迹**。官方元数据直接给出所引用视频的关联标注 120，但文件长度相同并不证明每个帧区间都已准确对齐；第一行 1956 与 1776 的差异原因也尚未核实，不能因此断定标注损坏。

第二行视频在分片中的时间范围是 754.833333… 至 847.133333… 秒；站内已提取的 760、800、840 秒都位于该范围内。本次未重新读取或逐帧检视视频。标注 120 的技能帧区间包括间隙，不能凭此认定每一帧都有技能标签。所有资料是仿真训练演示，不是模型评测成绩。

## 可复制的只读核查

使用 Python `requests` 将固定版本的 parquet 和两份 JSON 读入内存，用 `pyarrow.parquet.read_table` 选取元数据列；筛选 `episode_index` 0 和 10，再检查其 `annotation_path` 与两个 JSON 的 `meta_data.task_duration`。数据获取成功，但没有读取 3 TB 全量数据、没有调用机器人或仿真服务。分析基于指定 revision，不推断未来版本不变。

## 这类整理已有哪些替代方案

- 一篇[中文 BEHAVIOR-1K 数据说明](https://blog.csdn.net/HETUW/article/details/166136318)已经解释 `raw_episode_id` 与 `annotation_path`，并列出第一行元数据；因此“中文解释这种编号”也不是空白。本文自己的关联结论以固定版本官方 parquet 为依据，未逐项审计该文章的其他结论。
- [Embodied Data Atlas 同项页面](https://embodieddataatlas.com/datasets/behavior-1k/?lang=en)已组织数据格式、任务与许可边界、版本和来源。它属于现有目录型方案，并未因此证明其全部信息无误。
- 一个[第三方 20 条演示子集](https://huggingface.co/datasets/harpreetsahota/behavior-1k-2026-demos-20ep)用于可视化同一“打开收音机”任务，数据卡说明其不含原技能标注。另一个[第三方预处理包](https://huggingface.co/datasets/mahgoobi/b1k_2026_extras)自述提供技能片段表、覆盖统计和各任务多相机预览；本次未下载或复算其总量和覆盖率。
- [一份公开训练记录](https://huggingface.co/umegan/behavior2026-pi05-run1)报告对演示进行过滤，并将部分技能标注用于训练提示；这是单个模型作者的工作流，不证明所有开发者这样做或本站用户需要类似功能。

## 对产品判断的影响

这次排查说明具体样例和来源指针有助于发现编号上的误解，但同项中文说明及多种工具已存在。可以把“找到正确的演示及对应标注”作为候选读者任务，与官方数据及现有中文资料对照；尚未做用户实验，也未证明本站更快或更可靠。站内原文只是提示关联未确认，没有把这两条明确宣称为同一录像；后续若完善站内说明，应保留上述帧级未核验边界。
