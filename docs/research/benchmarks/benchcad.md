# BenchCAD

核验日期：2026-09-23

## 官方身份

BenchCAD 由 BenchCAD 作者团队发布，官方项目仓库、网站、排行榜与 Hugging Face 数据集分别提供实现、说明、模型结果和数据。[官方 README](https://github.com/BenchCAD/BenchCAD-main#benchcad)（行 190–199）；[项目网站](https://benchcad.com/)

## 官方定义与忠实中文概述

BenchCAD 衡量语言及多模态模型理解和编写参数化 CAD 程序（CadQuery）的能力。其核心是将模型输出实际执行为 CAD 几何，再同基准几何比对；问答任务测数值几何理解。评测覆盖视觉感知、参数抽象、可执行建模与 CAD 程序编辑，不由 LLM judge 给分。[README Tasks / Why BenchCAD](https://github.com/BenchCAD/BenchCAD-main#tasks)（行 197–212）

## 任务输入/输出/环境

| 任务 | 输入 | 输出与指标 |
|---|---|---|
| Vision2Code | 零件渲染视图 | CadQuery 程序；执行成 STEP 后计算 voxel IoU |
| CodeEdit | 编辑指令及已有 CadQuery 程序/零件 | 修改后的 CadQuery；按规范化 IoU 改善量评分 |
| Vision-QA | 渲染视图与数值问题 | 数值答案；symmetric ratio accuracy |
| Code-QA | CadQuery 代码与数值问题 | 数值答案；symmetric ratio accuracy |

运行环境由官方仓库固定；README 标示 Python 3.11、uv，公开数据按需从 Hugging Face 获取。[README Tasks / Installation](https://github.com/BenchCAD/BenchCAD-main#tasks)（行 200–240）

## 数据规模/split/字段/文件

官方 README 当前概述：17,900 个执行验证的 CadQuery 程序，106 个工业零件族，来源于 47 项工程标准。具体配置：`code_gen` 17,900；`edit-bench` 748；QA 2,400 个数值问题（图像与代码两种输入模式）。Hugging Face 卡片标出 `edit-bench`、`code_gen`、`QA` 三个配置；QA 当前为一个 split、约 2.4K 行。样例字段包括 `record_id`/`stem`、`family`、代码、视图和 QA 对象；QA 对象含 question、answer、type/source/level 等字段。[README 数据表](https://github.com/BenchCAD/BenchCAD-main#dataset)（行 242–250）；[数据卡 schema 与文件](https://huggingface.co/datasets/BenchCAD/BenchCAD)（行 64–92、237–255）

## 访问状态

代码仓库公开；数据在 Hugging Face 公开，并由评测脚本按需读取。仓库也含少量 test fixtures 用于 smoke run，但不能据其数量推断正式配置规模。[README Installation/Quick Start/Dataset](https://github.com/BenchCAD/BenchCAD-main#installation)（行 213–240、242–250）

## 数据/代码/媒体许可与使用边界

仓库 LICENSE 明确划分：MIT 仅覆盖评测代码、harness、评分与工具；Hugging Face 数据集另以 CC BY 4.0 发布。数据卡也標明 `cc-by-4.0`。[LICENSE 数据许可说明](https://github.com/BenchCAD/BenchCAD-main/blob/main/LICENSE)（行 248–291）；[Hugging Face 数据卡许可及样例](https://huggingface.co/datasets/BenchCAD/BenchCAD)（行 64–92）。因此可以在署名、注明许可及变更的前提下转载授权的数据记录与视图；注意图片需作为该数据集中的媒体归属，不能只引用代码仓库 MIT。

## 官方样例与是否可在公开 GitHub Pages 转载

本地候选 `artifacts/candidates/samples-text-batch.json` 有两条 QA 样例。`threaded_adapter_000240_s4420` 与 `motor_end_cap_000500_s4420` 的 prompt、答案分别逐字段匹配 Hugging Face QA viewer 记录：[第一条](https://huggingface.co/datasets/BenchCAD/BenchCAD)（行 86–91）。本地所指官方仓库 `QA/test_data/records.jsonl` 记录文件作为 fixture；项目 README 说明该 fixture 用于 smoke tests。[官方文件](https://github.com/BenchCAD/BenchCAD-main/blob/main/QA/test_data/records.jsonl)；[README § Dataset](https://github.com/BenchCAD/BenchCAD-main#dataset)（行 242–250）。数据卡和许可证明确覆盖 Dataset，可在公开 GitHub Pages 转载，并保留 CC BY 4.0 署名/链接/修改说明。推荐引用数据卡真实行核对字段，不能只依赖 GitHub 仓库代码许可。

## 指标

Vision2Code 的 IoU 基于模型生成并执行后的 STEP 几何体与 GT STEP 的 voxel 比较；官方榜还同时展示 execution rate 与 composite total。CodeEdit 的 accuracy 是原始到目标 IoU 间隙被关闭的归一化比例。QA 计 symmetric ratio accuracy，整数要求精确命中，比例题有容差；不同任务的指标不应横向合并。[README Tasks](https://github.com/BenchCAD/BenchCAD-main#tasks)（行 200–206）；[官方榜单评分说明](https://github.com/BenchCAD/BenchCAD-main/blob/main/LEADERBOARD.md)（行 190–201、221–258）

## 版本关系

仓库引用论文 arXiv:2605.10865；README 使用配置名而未声明一个统一语义版本号。应将 benchmark 版本记录为数据集 revision/仓库 commit 与 config（code_gen、edit-bench、QA），不从模型厂商报告的 BenchCAD 名称推断配置或版本。[README Citation / Dataset](https://github.com/BenchCAD/BenchCAD-main#citation)（行 242–250 及 Citation 区）。

## 官方来源按角色分组

- 身份、任务、数据规模： [作者仓库 README](https://github.com/BenchCAD/BenchCAD-main#benchcad)（行 190–250）。
- 数据与字段： [Hugging Face 数据卡](https://huggingface.co/datasets/BenchCAD/BenchCAD)（行 64–92、237–255）。
- 评分/排行榜： [作者排行榜](https://github.com/BenchCAD/BenchCAD-main/blob/main/LEADERBOARD.md)（行 190–274）。
- 论文： [arXiv:2605.10865](https://arxiv.org/abs/2605.10865)。
- 数据/代码许可： [仓库 LICENSE](https://github.com/BenchCAD/BenchCAD-main/blob/main/LICENSE)（行 248–291）。

## 模型发布引用

OpenAI GPT-6 Astra 发布页报告 BenchCAD 结果；这属于模型方结果引用。比较前需核实其任务配置、评分聚合和运行工具是否等于作者榜单配置：[OpenAI GPT-6 Astra](https://openai.com/index/gpt-6-astra/)（性能表与 BenchCAD 脚注）。

## 未核实项

- 本轮没有复跑 BenchCAD，也没有将任何厂商报告分数与作者榜单分数做等价判断。
- 仓库与 Hugging Face `main`/数据集 revision 会变化；具体生产记录应固定 revision。
- 当前 Hugging Face 页面公开到 QA 样例字段；所有使用的几何图片文件应维持数据卡及许可出处。

## 研究结论

**PASS** — 任务定义、四种输入输出、规模、关键字段、评测指标、公开访问和独立数据许可均有第一方证据。本站两条 QA 样例与官方数据逐条匹配，CC BY 4.0 许可支持在署名条件下公开转载。
