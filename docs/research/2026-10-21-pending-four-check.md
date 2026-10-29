# 四项未提交补充检查

检查日期：2026-10-21（Asia/Shanghai）。检查对象为`76c69e6`之后仍留在本地的四份JSON差异；本轮没有修改它们、没有提交或推送。

## 主任务判断

四项补充的数据结构、公开入口和PSI组成关联均有第一方依据，隔离构建与本地页面检查通过。本轮没有新增真实案例：GPQA两项保留作者不在线展示样例的请求；Video-MME链接官方已有示例；PSI新增成员关联，不把指数当成独立题集。

| 项目 | 原来 | 待提交补充 | 本次检查结果 |
| --- | --- | --- | --- |
| GPQA | 主数据入口为HF，状态gated；真实字段列表为空 | 改用作者GitHub公开数据包说明，标为public；增加真实列名、文件结构和固定修订来源 | 重新下载固定修订ZIP，用作者公开密码在内存读取；Main为448行、78列，哈希/全部列名与前次记录一致；公开下载与本站不转载题目分别显示 |
| GPQA Diamond | 同样仅以HF条件入口描述获取方式；字段为空 | 指向同一作者公开包；补198行、78列及固定修订记录 | Diamond独立CSV核对通过，与Main是筛选关系，不能把二者题数相加；页面仍无题目或答案值 |
| Video-MME | 样例区无专门url，回退至官方仓库主页 | 补`#-dataset-examples`直达入口 | 官方README当前有“📐 Dataset Examples”，HTML锚点存在，页面实际生成“查看官方样例入口”；原有先获批准再转载的说明保留 |
| PSI | 有3个关联成员：Agents’ Last Exam、AutomationBench-AA、GDP.pdf | 加入第4个关联JobBench | 模型卡列明7个组成项，第5页JobBench实际PDF链接指向官方项目；本地4个关系目标均存在，实际点击JobBench成功；总成员数仍是7，并未声称所有成员原题、权重或运行revision已公开 |

GPQA包同时核对Extended 546行、78列，以及Experts 60行、11列。Experts表为专家相关元数据，不能作为额外60道问题计入题量。本次只保存结构、计数和哈希，未输出或写入任何题面、答案或个人记录值。

## 一处旧文案需澄清（尚未修改）

位置：`content/benchmarks/gpqa-diamond.json`的`reusePolicy.boundaries[0]`。该句在HEAD中已经存在，不是这次未提交补充引入的问题。

问题：前半句是本站遵循作者请求的展示边界，后半句却把HF入口的访问条件泛化到“其他用途”；容易让人把公开GitHub下载也理解为必须先接受HF条件。应把获取渠道的条件和数据使用许可分别写清。

- 原来：公开网站不转载题目、选项、答案或截图；其他用途应同时遵守 HF 数据访问条件和 CC BY 4.0。
- 建议改后（未应用）：本站遵循作者不在线展示样例的请求，不转载题目、选项、答案或截图。通过Hugging Face获取文件时，须遵守该入口的访问条件；使用数据应遵守适用的数据许可。

## 本次实测

- 候选内容：从当前HEAD的原始Git对象导出，仅覆盖四份待提交JSON；复用已有依赖，未安装依赖，README、推广素材和技能等既有改动不纳入候选。
- 内容生成/校验：215项、575条案例、19份报告；严格TypeScript及生产构建通过，220个静态页和404核验通过；46项测试全部通过。
- 浏览器：四项在桌面和手机布局分别检查，共10份记录；实际CSS宽度为1405、417、316px。浏览器原有缩放使控制器请求宽度与实际CSS宽度不同，本记录以DOM测量为准，不把控制器参数冒充实测CSS宽度。
- 实际显示：GPQA两项为“公开访问”并保留“原题限制公开”；真实字段、文件统计和入口有显示；Video-MME官方样例按钮href正确；PSI关联不自动继承或生成独立题目。四项无整页横向溢出，控制台无警告或错误。
- 完整性：四份目标JSON字节与本轮开始时相同；全目录215项sampleSet哈希相同，核查仅新增此报告、更新说明和本地忽略材料。
- 临时预览：仅在127.0.0.1:4191提供隔离生产静态文件，不运行npm开发服务；结束前关闭本轮浏览器页、恢复视口并终止该进程，收尾状态存本地verification-summary.json。

## 复查资料与本地记录

- [GPQA作者公开下载说明](https://github.com/idavidrein/gpqa#dataset-download)；[固定修订文件](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/dataset.zip)。本次ZIP为2,348,038字节，SHA-256与前次一致；逐CSV计数和哈希见`fresh-source-verification.json`。
- [GPQA作者HF数据卡](https://huggingface.co/datasets/Idavidrein/gpqa)：公开页面区分维护者请求、HF文件访问条件以及CC BY 4.0标示；本轮未接受gated条件、未下载HF受控文件。
- [Video-MME官方样例入口](https://github.com/MME-Benchmarks/Video-MME#-dataset-examples)及同一README的Dataset许可段；官方页面可访问不等于本站可复制其媒体与标注。
- [Meta Muse Wonder模型卡](https://research.meta.ai/static/muse-wonder-model-card)：七成员列于第4页；本次重新下载PDF并读取第5页JobBench链接注释，目标为`https://job-bench.github.io/`。
- `artifacts/research/2026-10-21-pending-four-check/`：开始快照、LUNA事实描述、第一方证据、原文件完整性及主任务核验；LUNA不负责最终判断。
- `artifacts/candidates/2026-10-21-pending-four-check/evidence/`：构建/测试、浏览器DOM测量、截图及服务收尾。
