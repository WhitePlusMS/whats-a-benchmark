# 数据集说明修订与发布验收

日期：2026-10-21。已将6项确认问题改正、18项说明补清，按已核实的官方资料实施并发布，线上验收通过。原始数据、案例和附件保持原样。

## 修改文件、原因与影响

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
| `content/benchmarks/memoryarena.json` | 补清：dataProfile.summary, dataProfile.splits, dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/longmemeval.json` | 补清：dataProfile.fields, dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/locomo.json` | 补清：dataProfile.files, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/when2call.json` | 补清：dataProfile.splits, dataProfile.fields, verifiedAt；登记所引官方来源。 |
| `content/benchmarks/screenspot-pro.json` | 补清：dataProfile.summary, dataProfile.scale, dataProfile.fields, dataProfile.files, verifiedAt, researchNotes.0.text, researchNotes.2.text；登记所引官方来源。 |

- 应用52个审定说明字段；同步4处旧核查范围/限制说明，登记20个新增来源。SWE-bench Multimodal完整修订哈希移入文件说明，避免摘要在手机窄屏撑宽；CMMLU任务输出说明与同一固定CSV包的Answer字段、文件名学科信息同步，并补该段引用。
- 同一24项中原已核实的四份待提交补充一并发布：GPQA两项公开包/访问说明、Video-MME官方案例入口、PSI关联JobBench。
- 不改变题面、答案、原始字段值、逐题解析、案例数量和媒体字节；没有新增或编造样例。不改变页面组件、CSS、依赖和部署流程。
- 审阅前后对照保留在[原审阅记录](../research/2026-10-21-dataset-description-audit.md)。本文件及UPDATE_LOG.md记录实施和验收。README、Hero、Logo候选、推广和技能内容保留本地。

## 本地验证

- 内容校验通过：215项评测、575个案例、19份报告；现有测试46/46通过。
- 最终修订后严格TypeScript检查、正式路径构建通过，检查220个静态页面和Pages 404。保留既有大JS分块提示。
- 24份目标JSON与逐字段修改清单一致；215个sampleSet哈希、218个原附件/公开源文件哈希与修改前一致；24项外191份JSON字节相同。
- 静态HTML包含54个修订说明字段：原52项、哈希位置调整1项、CMMLU任务段落同步1项。
- 本地24页桌面/手机共72次尺寸检查通过，CMMLU同步说明另在3个宽度复测。没有缺失引用或新字段溢出。

## 提交和自动部署

- `85826ee2b27e29ef89d7292606f0193e87d76655`：24项说明与审阅记录，远端main已核对一致。[Pages工作流39527486053](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39527486053)的build、deploy均success。
- `55dc9cb27a86fb5b8c02833eafc308c4529da40d`：同步CMMLU任务段落与固定CSV表头，远端main已核对一致。[Pages工作流39527939034](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39527939034)的build、deploy均success，2026-10-21T01:33:52Z完成。
- 本验收记录与日志的后续提交只记录已经完成的检查，不改变页面内容；其最终工作流状态保存在本地final-workflow.json。

## 线上实际验证

- 24页、54个修订说明字段在服务器返回HTML中均存在。
- 浏览器逐页检查24项的桌面和两档手机宽度，共72次通过；CSS正文宽度1265、375、305像素。引用编号目标均存在，主要字段、版本及固定修订换行正常。
- 186份线上案例JSON与本地构建逐字节一致。214个实际发布附件均返回成功且内容类型不是HTML；另4个既有许可来源文本没有进入构建，未将其当成线上附件。全部218个源附件仍与修改前相同。
- CMMLU真实案例、选项和小解析在浏览器正常显示；本轮没有更改任何案例或媒体。
- [线上CMMLU数据说明](https://whiteplusms.github.io/whats-a-benchmark/benchmarks/cmmlu/#data)已保留在浏览器。截图：本地证据目录的live-final.png、live-mobile.png。
- 未调用网页端GPT，未启动前后端开发服务。自建只读静态预览进程34388已停止，4191端口无监听；用户原有服务未操作。

## 本地证据

`artifacts/research/2026-10-21-dataset-description-release/`保留baseline.json、24份原文件、applied-descriptions.json、integrity.json、browser-checks.json、live-http-checks.json、构建/测试日志、两次内容工作流状态及截图。此目录按仓库现有规则忽略。
