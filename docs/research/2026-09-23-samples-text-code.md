# 文本与代码类 benchmark 样例来源核查（2026-09-23）

本批只将能从第一方来源核实记录内容和数据许可的候选列入候选 JSON。所有 `raw` 字段均摘自官方记录/任务配置；中文说明仅概括字段结构。未确认许可的内容不复制进候选 JSON，也不进入正式展示内容。

## 可作为样例候选

| Benchmark | 记录 / split | 样例包含内容 | 官方许可与再发布判断 | 第一方来源 |
|---|---|---|---|---|
| BenchCAD | `threaded_adapter_000240_s4420`、`motor_end_cap_000500_s4420`；官方 QA 配置，fixture 位于 `QA/test_data/records.jsonl` | `record_id`、`family`、`qa_pairs` 中的原题和整数标签 | 官方数据卡标注 CC-BY-4.0，可在署名并保留许可说明后再发布。候选只摘录每条记录的一个问答项。 | [官方记录 JSONL](https://github.com/BenchCAD/BenchCAD-main/blob/main/QA/test_data/records.jsonl)；[官方数据卡/许可](https://huggingface.co/datasets/BenchCAD/BenchCAD) |
| AutomationBench | `simple.email_sf_contact_phone_update`，`example_id=3001`；simple domain | `user_prompt`、模拟邮件与联系人初始状态、`assertion` 评测目标 | 官方 LICENSE 将 Zapier 编写的 benchmark 材料和模拟数据纳入 MIT，同时明确排除第三方 API schema 表示。本候选仅包含 task 提示、模拟案例数据和断言；需署名并附 MIT 许可。 | [官方任务代码](https://github.com/zapier/AutomationBench/blob/main/automationbench/domains/simple/tasks.py)；[官方 LICENSE](https://github.com/zapier/AutomationBench/blob/main/LICENSE) |
| Agents' Last Exam | `demo/hello`；官方 task collection，原始材料没有单独 split 字段 | `taskId`、标题、摘要、类别；评测输出未摘录 | 仓库许可表将 `tasks/` 下 task data 标为 CC-BY-4.0，故可署名并保留许可说明。此记录是官方 demo task，展示时须保留其 demo 属性。 | [官方 task card](https://github.com/rdi-berkeley/agents-last-exam/blob/main/tasks/demo/hello/task_card.json)；[官方仓库许可说明](https://github.com/rdi-berkeley/agents-last-exam) |

## 暂不接入

| Benchmark | 已核实内容 | 暂缓原因 | 第一方来源 |
|---|---|---|---|
| CMMLU | 官方仓库介绍中文多选题及 CSV 字段结构 | 数据许可为 CC-BY-NC-SA-4.0。本站是否满足非商业用途，以及是否能履行相同方式共享条件尚未确认；不复制题目和答案。 | [官方仓库](https://github.com/haonan-li/CMMLU) |
| SciCode | 官方仓库说明项目及数据集获取方式 | 仓库代码许可不自动覆盖 benchmark 数据；未能在第一方来源确认数据再发布许可，不复制记录。 | [官方仓库](https://github.com/scicode-bench/SciCode) |
| AlignBench | 官方发布文件 `data/data_release.jsonl`；包含 question_id、category、subcategory、question、reference 等字段 | 未找到明确覆盖发布数据内容的许可；不复制题面或参考答案。 | [官方仓库](https://github.com/THUDM/AlignBench) |
| SWE-bench Multilingual | 官方说明 300 条、多语言的真实 GitHub issue 任务，并以测试评估补丁 | 记录涉及多个上游仓库的 issue/PR 文本；没有核实到允许本站汇集再发布题面的统一授权，不复制记录。 | [官方 benchmark 页面](https://www.swebench.com/multilingual.html) |
| Arena-Hard-v2 | 官方说明题目来自 Chatbot Arena 用户，公开数据集卡片标注 Apache-2.0 | 用户提示文本的权利/再发布授权边界未由第一方资料明确说明。Apache 标记不足以解决该问题，故不复制记录。数据集体积也不适合批量下载。 | [官方项目仓库](https://github.com/lmarena/arena-hard-auto)；[官方数据目录及许可标签](https://huggingface.co/datasets/lmarena-ai/arena-hard-auto/tree/main/data) |

## 文件与范围

- 候选数据保存在 `artifacts/candidates/samples-text-batch.json`，每条保留 `raw` 原始字段及 source/license URL。
- 本批不需要图片、音频或其他附件，因此没有下载外部文件；不会为了填充数量生成任何模拟 benchmark 记录。
- 本次未修改正式 `content/`、应用代码或 `UPDATE_LOG.md`。
- 许可判断只针对上述字段摘录及其所列范围；如源仓库许可发生变化，应在正式上线前重新核查。
