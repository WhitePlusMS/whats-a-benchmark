# 数据集说明修订与发布验收

日期：2026-10-21。用户授权修正6项确认问题、补清18项说明，检查后提交推送并等待自动部署；原始数据和案例保持。

## 修改文件与影响

| 文件 | 修改及影响 |
| --- | --- |
| `content/benchmarks/personal-superintelligence-index.json` | 纠正：officialDefinition.task, dataProfile.summary, verifiedAt, limitations.0.text；登记所引官方来源。 |
| `content/benchmarks/video-mme.json` | 纠正：dataProfile.splits, dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/gpqa.json` | 补清：dataProfile.summary, dataProfile.splits, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/gpqa-diamond.json` | 补清：reusePolicy.boundaries, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/cmmlu.json` | 纠正：version, dataProfile.summary, dataProfile.scale, dataProfile.splits, dataProfile.fields, dataProfile.files, taskContract.output, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/mmmu-pro.json` | 纠正：dataProfile.summary, dataProfile.scale, dataProfile.splits, dataProfile.fields, dataAccess.requirements, verifiedAt, researchNotes.2.text；登记所引官方来源。 |
| `content/benchmarks/excel-emb.json` | 纠正：version, dataProfile.summary, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/swe-bench-multilingual.json` | 纠正：dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/aa-lcr.json` | 补清：dataProfile.fields, dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/ifbench.json` | 补清：dataProfile.scale, dataProfile.splits, dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/gsm8k.json` | 补清：dataProfile.summary, dataProfile.scale, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/matharena-arxivlean.json` | 补清：dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/swe-bench-multimodal.json` | 补清：dataProfile.summary, dataProfile.splits, dataProfile.fields, dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/finance-agent.json` | 补清：version, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/jailbreakbench.json` | 补清：dataProfile.splits, dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/maeb.json` | 补清：dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/mieb-lite.json` | 补清：dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/legalbench.json` | 补清：dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/toolret.json` | 补清：dataProfile.fields, dataProfile.splits, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/memoryarena.json` | 补清：dataProfile.summary, dataProfile.splits, dataProfile.fields, dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/longmemeval.json` | 补清：dataProfile.fields, dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/locomo.json` | 补清：dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/when2call.json` | 补清：dataProfile.splits, dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/screenspot-pro.json` | 补清：dataProfile.summary, dataProfile.scale, dataProfile.fields, dataProfile.files, verifiedAt, researchNotes.0.text, researchNotes.2.text；登记所引官方来源。 |

- 同一24项中已核实的四份待提交补充一并发布：GPQA两项公开包/访问说明、Video-MME官方案例入口、PSI关联JobBench。
- 新增本文件，更新本轮审阅文档与UPDATE_LOG.md；其他README、Hero、Logo候选、推广及技能内容保留本地。
- 本轮不改变题面、答案、原始字段值、逐题解析、案例数量或媒体字节；不运行上游评测或接受新的gated条件。

## 已完成的内容检查

- 52个审定说明字段已应用；少量措辞调整为正式页面用语，核实事实不变。
- 同步更新4处旧研究范围/限制说明；20个新增证据URL登记到sources，遵循现有内容schema。
- 内容生成与严格TypeScript检查通过；215个sampleSet、218个原媒体/公开文件哈希与本轮开始时相同，非目标191份JSON字节相同。

- 窄屏实测发现SWE-bench Multimodal摘要中的完整HF修订哈希撑宽段落，已移入dataProfile.files的现有换行区域；固定修订与数据计数均保留。

## 后续检查与发布状态

- `npm run validate`通过：215项评测、575个案例、19份报告。
- `npm test`通过：46/46项；最终文字调整后严格TypeScript检查及正式路径构建再次通过，产出220个静态页面与Pages 404。
- 24页分别检查桌面与手机布局，共72次页面尺寸检查；CSS正文宽度1265、375、305像素，引用无缺失，新说明在浏览器与静态HTML均存在。SWE-bench Multimodal窄屏问题已修正并复测。
- `integrity.json`证明24份目标文件与逐字段修改清单一致；215个sampleSet、218个附件哈希不变，24项外191份JSON字节不变。
- 构建保留现有大JS分块提示；本次没有修改应用代码、CSS、依赖或构建流程。
- 本地证据：`artifacts/research/2026-10-21-dataset-description-release/`中的`browser-checks.json`、`integrity.json`、日志和截图。

Git提交、Pages自动部署和线上验收待实际完成后补充。

- 线上一致性复核补充：CMMLU具体任务中残留的subject/answer表述已按同一固定官方CSV包同步为Answer字段和文件名学科信息；不改样例的题面、答案或原始记录。

## 首次提交与一致性补充

- 内容提交：`85826ee2b27e29ef89d7292606f0193e87d76655`，远端main已核对一致。
- [Pages工作流39527486053](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39527486053)的build与deploy均为success（2026-10-21T01:29:03Z完成）。
- 线上复核发现并修正同一CMMLU条目中的旧taskContract.output字段说明，同时补入同一固定官方ZIP引用；补充后严格类型与220页构建再通过。54个修订说明字段在静态HTML存在，全部案例/附件和非目标文件仍与基线相同。
- 一致性补充的推送、部署及最终线上检查待实际结果补充。
