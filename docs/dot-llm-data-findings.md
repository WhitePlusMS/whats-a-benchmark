# Dot 评测数据核验：第一批非具身证据

核验日期：2026-11-06（UTC）。仓库：<https://github.com/WhitePlusMS/whats-a-benchmark>。
起始基线：`1e132317a0aa45ad88c1013eeb8623c26cdd5066`。独立分支：`codex/dot-llm-data-audit`。

本报告覆盖优先六项及八项热门条目的既有记录抽查，**不是全部317项完成结论**。六项中 SpatialBench Verified 增加1条许可明确的公开任务，其余五项补充已执行核验及边界，没有为覆盖率编造样例。原总清单与具身文件本批不改。下载缓存不提交。

## 六项结果

| 条目 | 本批站内样例变化 | 结论 |
|---|---:|---|
| Dense200 | 0 → 0 | 实读标注并对图，原图与标注转载许可未确认 |
| TIME | 0 → 0 | 确认Australia Solar评估窗口，上游授权仍需澄清 |
| FrontierFinance | 0 → 0 | 格式示例未确认正式成员；固定题目文件401，禁止站外再分享条件 |
| OSWorld 2.1 | 0 → 0 | 108条文件元数据与固定revision已核实，任务正文401 |
| SpatialBench Verified | 0 → 1 | 当前V1清单精确ID匹配，公开题节选按Apache-2.0展示 |
| TapTap Maker | 0 → 0 | 两个实读版本仅榜单汇总，未取得题包与许可 |

## Dense200（2026-11-06 UTC 复核）

**结论：已实际完成一条官方标注与图像文件对应核查，但不新增站内样例；原图作者、原始网页和再发布许可仍无法确认。** 站内目前 0 条样例，维持 `license-pending`。对应核验结论已写入本批JSON。

- 作者依据：Rex-Omni 论文 [arXiv:2510.12798v1](https://arxiv.org/html/2510.12798v1) 的 §5.2 将 Dense200 描述为该团队人工收集的 200 张图像。作者为 Qing Jiang 等 IDEA 研究团队；这不能证明各原始照片版权也属于该团队。
- 官方成员链已核对：[作者评估指南](https://github.com/IDEA-Research/Rex-Omni/blob/6508981c1e0c3fbb2dbe7b962a4bb745005f3e2e/evaluation/README.md)明确指向 `Mountchicken/Rex-Omni-EvalData`，并以 `--dataset Dense200 --eval_type box_eval` 运行。数据快照 `daff862ba483f56ccaba9af5a12e118a9372ede8`。未将 `point_eval`、`visual_prompt_eval` 当作新图片或独立样例。
- 亲自读取：[固定版本 box_eval/Dense200.jsonl](https://huggingface.co/datasets/Mountchicken/Rex-Omni-EvalData/resolve/daff862ba483f56ccaba9af5a12e118a9372ede8/_annotations/box_eval/Dense200.jsonl)，2026-11-06 02:12:46 UTC，HTTP 200，973,702 字节、200 行，SHA-256 `c10545c598fbd14f757fc55953bdf5de3acd692f755a2df9fb626641ad840ba6`，与先前清单一致，不新增一份重复下载记录冒充新数据。
- 对应第 1 行 `image_path=dense200/1.Group-A-at-feeder (1).jpg`、类别 `chicken`、`dataset_name=Dense200`、`task_name=common_object_detection`。通过[同快照图像包](https://huggingface.co/datasets/Mountchicken/Rex-Omni-EvalData/resolve/daff862ba483f56ccaba9af5a12e118a9372ede8/dense200.tar.gz)的流式读取，仅保存该成员，没有保存完整压缩包。2026-11-06 02:14:06 UTC，HTTP 200；成员 364,484 字节，SHA-256 `9612570b797d81aa4af3f0afc31301d0efec8a2a363b939475ee2cb4c2308f02`。
- 本地解码图像尺寸为 918×1234，人工查看确实为鸡群沿饲槽进食；标注包含 40 个 chicken 框，坐标全部在图片边界内。只确认文件对应、类别和边界合理，**没有声称逐框标注质量全面正确，也没有运行模型或产生评测成绩**。图像没有 EXIF 信息可补充摄影者/出处。
- 权利范围：该数据仓库 API/根目录未提供 README 或 LICENSE；检查过作者评估指南与[代码仓库 LICENSE](https://github.com/IDEA-Research/Rex-Omni/blob/6508981c1e0c3fbb2dbe7b962a4bb745005f3e2e/LICENSE)。IDEA License 1.0 的软件/文档研究用途授权不是这张第三方照片及 Dense200 标注的明确转载许可。论文 CC BY 4.0 也不能直接外推至外部图像包。精确文件名搜索未找到可确认的原始摄影来源。第三方 Grounding-EvalData 的 notice 只能作为辅助核查记录，不能作为原版权人授权。
- 下一步条件：需要作者给出这张图的原始来源及图片/标注许可，或取得明确覆盖本站公开展示的许可。此轮不复制图片或坐标到站内，不将“许可未确认”写成“禁止使用”或“数据私有”。


## TIME / Australia_Solar（2026-11-06 UTC 复核）

**结论：明确该 CSV 的上游来源、精确官方测试/验证窗口规则；仍不在本站复制太阳能数值或把一条原始时序称作测试题。** 站内目前 0 条样例，维持 `license-pending`。对应核验结论已写入本批JSON。

- 主数据快照 `83e3d0b3be28d11c7182bffcc1892d19b36c4da1`，CSV 快照 `683bb21b470f5a26586e1ab2295f0a2a1529ef0f`；两 API 当次 HTTP 200，仍与前人一致。主数据卡标 CC BY-NC-4.0，并记载 2026-05-25 修改许可以适配数据提供者；CSV 卡标 Apache-2.0。主卡明确 CSV 用于参考或自定义流水线，不是独立的固定测试题包。
- [固定 CSV](https://huggingface.co/datasets/Real-TSF/TIME-ProcessedCSV/resolve/683bb21b470f5a26586e1ab2295f0a2a1529ef0f/Australia_Solar/H/item0.csv)于 2026-11-06 02:13:02 UTC 重新实际读取：HTTP 200，1,777,299 字节，SHA-256 `b0ecd12298c14a06419f70b08991e016af0d37f3dbfd8ae05ed1e649ee5f72ed`；35,064 行，字段 `timestamp, solar_63726, solar_51616, solar_31378`，时间戳从 2021-04-01 00:00:00 至 2025-03-31 23:00:00，逐相邻时间差均为 1 小时。本轮不复制序列数值。
- 上游依据：[论文 v4 附录 B.2](https://arxiv.org/html/2602.12147v4)声明 Australia Solar 来自 PVOutput Data Service API，含澳大利亚 3 个光伏站的小时发电记录。该来源关系是作者声明；本轮**没有使用 PVOutput API、没有取得或核对三个站的原始上游数据**。
- 官方代码通过 git 只读克隆，固定提交 `a246570202a8287d3cb83ef0aa558b5ac7697bc3`。[任务配置](https://github.com/zqiao11/TIME/blob/a246570202a8287d3cb83ef0aa558b5ac7697bc3/src/timebench/config/datasets.yaml#L186-L194)：`test_length=2520`、`val_length=2520`，short/medium/long 的 `prediction_length` 分别为 24/72/168。
- [切分实现](https://github.com/zqiao11/TIME/blob/a246570202a8287d3cb83ef0aa558b5ac7697bc3/src/timebench/evaluation/data.py#L302-L320)按 `floor(length / prediction_length)` 算窗口数，因此此数据的测试窗口数为 105/35/15。[test_data 与 val_data](https://github.com/zqiao11/TIME/blob/a246570202a8287d3cb83ef0aa558b5ac7697bc3/src/timebench/evaluation/data.py#L368-L397)分别从末尾 2520 步和末尾 5040 步切出模板，以预测长度作为相邻窗口步长，验证区位于测试区之前。
- 按已读取 CSV 的连续小时索引及上述配置推导：测试目标区为 2024-12-17 00:00:00 至 2025-03-31 23:00:00；验证目标区为 2024-09-03 00:00:00 至 2024-12-16 23:00:00；更早的数据是历史上下文。**这些日期是对 CSV 应用官方索引规则的推导，并非本轮完整运行 GluonTS/模型得出的实验结果；未下载主 Arrow 文件逐值验证与 CSV 完全相同。** 不应把 `train` 文件夹或整份 CSV 直接称为训练集/测试题。
- 额外边界：代码另有 `training_dataset` 和 `validation_dataset` 历史接口，其 offset 不是 `val_data` 的 2520 步验证区定义。此次只描述 `test_data/val_data` 的评估窗口规则，不将接口名称混为统一训练/验证三分法。默认评测为零样本预测，不证明模型从未在这些数据上预训练。
- 实际读取[PVOutput 服务条款](https://www.pvoutput.org/help/terms_of_service.html)，2026-11-06 02:15:16 UTC，HTTP 200，19,802 字节，SHA-256 `cba1f529903eeb1c00cc0f6e98fe4d428e6a90ae014676f2363565138e7b58b4`。页面标 Last Updated 1st May 2017；Data Service Subscription 条款允许**有有效订阅者**在自己的服务/网站/产品使用数据，并注明 PVOUTPUT.ORG 后以书面形式再发布；并非无条件向所有下游用户授予转载权。本轮没有有效订阅及可下游转授的证据，因此 Apache-2.0 CSV 标签不足以单独确认本站转载数值获准。主数据 CC BY-NC 也不自动解决全部上游条件。
- 下一步条件：先明确本站用途是否满足非商业条件，并取得/确认覆盖本站下游公开展示的 PVOutput 数据授权或提供者澄清，再选一个完整输入上下文与未来目标窗口；不能只截首行数值当测试样例。


### 附：源码文件核验

| 文件（均为上述固定提交） | 字节 | SHA-256 |
| --- | ---: | --- |
| TIME `src/timebench/config/datasets.yaml` | 10,933 | `672329579e78e15b29e9e3af9efd1730dcadb1632e7dafad388e05863262915e` |
| TIME `src/timebench/evaluation/data.py` | 14,321 | `68c9e9d4018dfc774b4923e00d44eda312498c88a691d8184f9d33551e31148f` |
| Rex-Omni `evaluation/README.md` | 3,246 | `87186ac66c35b1e2aa6026108a4dc452b68810eb83be5fbce2bb35669105f64f` |
| Rex-Omni `LICENSE` | 6,996 | `5249a075efeaf24ad885ce64cc4fd32d9e9c9023e8fa06f94767237d1ac4247f` |


## FrontierFinance（frontierfinance）

核查时间：2026-11-06 02:12–02:15 UTC。本站基线无 `sampleSet.samples`；本轮建议仍为 0，不新增题目。

- 官方 HF API 当前 revision 为 `36afd6dc1cbb2c4512536daf917dc28b1225a720`，`gated: auto`、`license: cc-by-4.0`。数据卡 `extra_gated_prompt` 同时明确为避免污染和数据泄漏，不得在 HF gated/private 仓库以外再分享该数据集。不能只读许可标签而忽略此限制。
- 亲自访问公开数据卡页面 HTTP 200，实际可读 `Data format → Example`。该例有 `query_id: ac8e1799814fee95`、`query_date: 2025-06-23`，展示一个 rubric。它处于格式说明中，不是本轮下载并核对到的正式 JSONL 行；无法独立证明该示例属于正式 220 题、rubric 是否完整或训练/验证/测试划分。数据卡所列 220 个问题、11,543 个 rubrics 是作者声明，不是本轮实数统计。不要转载题面或把一条 rubric 当完整标准答案。
- 亲自请求固定版本 `frontier_finance_public.jsonl` 返回 HTTP 401，未读取数据。raw README 也返回 401；公开页面与受控文件入口有不同访问状态。未登录、未申请访问、未绕过限制。
- 官方 GitHub README 固定提交 `8b71342dc7730eb1803dd3934e17bc71c9922ec5` 的 `Input formats` 另有 `query_id: 85bc71fb95e1a5c4` 的格式示例，rubric 文本带省略号；同样不能当完整正式题。该 README 仍称无需登录下载，但这与本轮 401 结果和 HF 条件冲突，按实际受控入口记录。
- 同提交 `NOTICE` 明确 Apache-2.0 仅适用于 grader，数据集另适用 CC-BY-4.0；不能用评分代码许可替数据题目授权。当前不把外部再分享限制自行解释成可以公开转载样例。
- 下一步条件：由用户在官方 HF 页面接受资料分享和使用条件后才可访问完整行；公开站点转载还需作者明确允许的范围。仅获得文件访问权限不等于获准在此站再发布。

固定来源：
- https://huggingface.co/datasets/samaya-ai/FrontierFinance
- https://huggingface.co/api/datasets/samaya-ai/FrontierFinance
- https://huggingface.co/datasets/samaya-ai/FrontierFinance/resolve/36afd6dc1cbb2c4512536daf917dc28b1225a720/frontier_finance_public.jsonl
- https://github.com/samaya-ai/frontier-finance/blob/8b71342dc7730eb1803dd3934e17bc71c9922ec5/README.md
- https://github.com/samaya-ai/frontier-finance/blob/8b71342dc7730eb1803dd3934e17bc71c9922ec5/NOTICE

实际下载：
| 文件 | HTTP | 字节 | SHA-256 |
| --- | --- | ---: | --- |
| GitHub 固定 README | 200 | 8424 | `99b9d9f77c1a3ff5f788d77a15617aab5f0e9f96d2ddc4842e91b8034a8955c0` |
| GitHub 固定 NOTICE | 200 | 718 | `c7da5f2f11811d18b00fbf13f4a5418f3caaad824b2ee0b886ed91503b9a9bea` |
| HF 固定 JSONL 请求的错误响应（不是数据文件） | 401 | 135 | `628db7e6128200c1ec242f6c3ae8589f1e01d66f3dfd46651dab29e76ccc9977` |


## OSWorld 2.1（osworld-2-1）

核查时间：2026-11-06 02:13–02:15 UTC。本站基线无 `sampleSet.samples`；本轮仍无可发布且确认属于 2.1 的真实完整任务，不新增样例或媒体。

- 官方 `osworld-v2.1` Git tag 当前解析为 `3d778a3c9a34a079316f70df023b166700445792`。实际读取该提交的 README、`benchmark_releases/osworld-v2.1.json`、`benchmark_releases/osworld-v2.1.task_hashes.json`、`docs/PUBLIC_EVALUATION_GUIDELINE_v2.1.md`。公开 release manifest 可确认 2.1 的组件成员关系，而不是靠文件名或 main 推断。
- 2.1 manifest 指定任务仓库 revision `0a1aadad95aa79b00b3783e717d865089ab06e26`，完整 gated assets 为 `384b3834faba5700a7b589e6cc181490c9808949`，公开 runtime assets 为 `3a140a3df8f351b22bb5b9526846f078e738777f`，网站为 `60c89fe6a8ed934668619d8d26132848239eb8ee`。公开 runtime assets 不是完整题目资产快照。
- 亲自解析公开 hash manifest 的 `files`，恰有 108 个 `task_*.py` 文件条目，`source_revision` 与 release manifest 的任务 revision 一致；下载 hash manifest 的 SHA-256 与 release manifest 声明一致。这仅验证元数据和版本关系，不等于读取、执行或核验 108 个任务正文。
- 对上述精确任务 revision 的 `task_001.py` 匿名请求 HTTP 401，未读取任务。公开 hash manifest 声明该文件为 8611 字节、SHA-256 `9f8731d02aacb37f6eed0e6e4c7738758c3d7c9fb1b1fa83a9ea08751af19839`；这是作者提供的预期值，不是本轮下载文件的实测。
- 固定 README 说明任务类不在公开 GitHub checkout 中，要求分别登录同意 `osworld_v2_tasks` 与 `osworld_v2_assets_gated` 的访问条件；说明 gated 是为避免代理在网上找到任务答案、setup 和 evaluator。HF 任务卡可公开查看，元数据标 Apache-2.0，但不能据此将未取得的任务内容、媒体和完整资产一概认作可公开复制。
- 实际读取项目页 `https://osworld-v2.xlang.ai/`，标题仍明确 OSWorld 2.0，展示 Task035 与 Task008 轨迹。2.1 hash manifest 包含对应任务文件名，但没有取得两版正文或一致性证明；相同编号不能证明这些轨迹、题面、状态和素材仍与 2.1 对应。因此不将 2.0 公共演示挪入 2.1。
- 未运行桌面任务、未下载 VM/大资产、未取得完整题面；没有核实训练/验证/测试 split，不将全部 108 工作流直接标成 test split。作者 release 中所述 326 tests、108 文件核验、VM 限制是作者报告，不是本轮执行结果。
- 下一步条件：用户按官方指引获取两个 HF 仓库授权后，核对上述精确 revision 的任务和资产，并明确可公开展示范围；公开演示还需逐条证明对应 2.1。

固定来源：
- https://github.com/xlang-ai/OSWorld-V2/releases/tag/osworld-v2.1
- https://github.com/xlang-ai/OSWorld-V2/blob/3d778a3c9a34a079316f70df023b166700445792/README.md
- https://github.com/xlang-ai/OSWorld-V2/blob/3d778a3c9a34a079316f70df023b166700445792/benchmark_releases/osworld-v2.1.json
- https://github.com/xlang-ai/OSWorld-V2/blob/3d778a3c9a34a079316f70df023b166700445792/benchmark_releases/osworld-v2.1.task_hashes.json
- https://github.com/xlang-ai/OSWorld-V2/blob/3d778a3c9a34a079316f70df023b166700445792/docs/PUBLIC_EVALUATION_GUIDELINE_v2.1.md
- https://huggingface.co/datasets/xlangai/osworld_v2_tasks/resolve/0a1aadad95aa79b00b3783e717d865089ab06e26/task_001.py
- https://huggingface.co/datasets/xlangai/osworld_v2_tasks
- https://osworld-v2.xlang.ai/

实际下载：
| 文件 | HTTP | 字节 | SHA-256 |
| --- | --- | ---: | --- |
| 固定 README | 200 | 22045 | `0d1d3e91e8786720a167b8bc26a41bd27832eefae652ab1c166193073e99b2b4` |
| 固定 release manifest | 200 | 4426 | `978686683bdf9f946703c1d316cbbd29c0e3ea97396e48d940ee92c597806ecf` |
| 固定 task hash manifest | 200 | 14519 | `c54d428329be5ca72742a6becd49ee83cf739df5dea429bba182e1f3f21badfb` |
| 固定 public evaluation guideline | 200 | 15132 | `85e072aac7e53d97bedbc75b3cfaa616695397807a0ff5a17b6454fa114c78d7` |
| HF 固定 task_001.py 请求的错误响应（不是任务文件） | 401 | 134 | `2b45280025b4e6363e2246a596e6b6496c282e77159487355b01711abf5185b3` |


## SpatialBench Verified

- 站内原有样例为 0。此次找到官方逐项成员证据，可增加 1 条公开任务节选，但必须保留版本边界。
- 实际链路：官方仓库 README 链接 `https://benchmarks.bio/spatial`；该页面加载 `/assets/index-BFNo4jVi.js`，脚本的 `L4` 列表包含 `spatialbench`，`Ah(e)` 请求 `/data/v1/${e}.json`。实际读取 `https://benchmarks.bio/data/v1/spatialbench.json`：`title=SpatialBench-Verified`、`evalCount=115`，`evals` 长度与唯一 ID 均为 115，包含 `xenium_kidney_spatial_cn7_composition_day14`。这是官方当前 V1 清单的精确 ID 成员证明，不再仅靠任务分配表推测。
- 下载时间 2026-11-06 02:16:40 UTC；HTTP 200；405,296 字节；SHA-256 `5f447ba6d61519bff30bd35685424d597f350c693e60ba4d6d61c15f4e8e2aa0`。该 URL 可变，哈希固定本次所读内容；不能宣称它是永久 revision URL。官方结果快照 `https://benchmarks.bio/benchmarks/spatialbench/latest.json` 显示 `resultVersion=v1`、`dataUpdatedAt=2026-11-05`、`generatedAt=2026-11-05T18:02:18.829Z`。
- 公开任务固定仓库提交 `baa9841efc99fa03b2f9ec25684c8ec52a2245df`，路径 `example_evals/spatial_analysis/xenium_kidney_spatial_cn7_composition_day14.json`。实际读出 `task`、`metadata`、`grader`、`data_node` 和 `canary`，题目要求分析小鼠肾脏 CN7 的丰度及相对同条件背景的富集。原评分器给出四个参考值与绝对容差；并未亲自运行任务或核实生物学结果。
- 许可：同一固定提交 README 明确公开代表任务并标 Apache 2.0；根 LICENSE 包含 `Copyright 2024 Latch Bio`。未发现该公开任务的单独限制许可或 NOTICE。允许按该许可节选公开任务，保留版权、完整许可、防训练污染 canary 和本站整理说明。底层 `latch://193707279.node` 实验数据没有下载或转载，不能把代码/任务许可扩张至其数据或媒体。
- 原版公开 manifest 有 18 行、16 个唯一 ID；其中 10 个唯一 ID 出现在当前 V1 的 115 个成员中。仅增加上述 1 条，未为覆盖率复制其余 9 条。遍历本站全部 `sampleSet.samples` 精确 ID 并搜索 CN7 未发现已有题目；非样例 `researchNotes` 曾提到此 ID，不算站内样例。
- 历史边界：作者 2026-05-29 文章报告两轮人工复核产生 115 题；当前 V1 的 115 ID 清单与当时完整逐项通过记录之间未取得完整版本映射，不能用“都为 115”证明两版完全相同，也不保证公开任务快照与最新计分任务逐字一致。保留该限制，而非继续断言所有公开任务都无成员证据。
- 反向核查：博客指向的 `supplemental/verified_human_solutions` 在固定 `baa9841…` 的 GitHub contents API 返回 HTTP 404；该提交完整树（`truncated=false`）无 `supplemental`/`human`/`verified` 路径。该路径 commits API 返回 HTTP 200、空数组。分配表只有任务名与分配人，不能替代最终通过证明。博客 direct HTTP 403，本轮通过网页检索工具读取其公开正文，没有绕过授权。
- 原始人类解题数据与完整训练/验证/测试切分未取得；本样例 split 应写“公开代表样例；ID 列入官方 Current V1 SpatialBench-Verified 清单”，不标 train/test。


## TapTap Maker Benchmark

- 站内样例 0，建议维持 0；未取得可确认的公开题包或任务复用许可。不是断言所有公开渠道永远没有题包。
- 2026-11-06 实际读取官方 methodology、editions 页面、editions.js、board.js、latest/index JSON，以及现条目 `2026-09-10-v5-ds-v41-evolving` 和最新 `2026-11-05-v6-hy4` 两个快照。索引现在有 13 个 edition；此次并非重新下载全部 13 个。
- 两个快照顶层均为 `snapshot_version`、`edition`、`main_board`、`boards`。遍历完整 JSON 键与结构，内容是模型成绩、成本、速度、用量、类别、难度及 heldout 汇总，未见任务题面、任务输入文件或答案记录。二者 dataset_version 均为 `0.2.3`，dataset_hash_prefix 均为 `de38ba84`；该前缀不是完整数据集哈希，更不是题包下载地址。
- 当前条目绑定旧版，不能用最新版本日期替换其历史 edition。可增加“2026-11-06 查询最新索引”的研究说明及新来源，同时保留既有 `version`。
- 官方方法依旧区分公开题和 held-out；held-out 的题面、答案、轨迹不公开，harness 闭源。此声明不是公开题下载许可。所读页面、脚本与快照没有提供公开题包链接或明确任务转载授权。未猜测私有目录、未破解请求、未登录，也未复制榜单充作样例。
- 下一步所需：官方提供可核对 ID/版本的公开题包与适用许可，或者作者授权；在此之前只能链接公开方法与版本资料。未运行引擎、未复核模型成绩。

## 下载清单

下表均为 2026-11-06 的实际读取；HTTP 状态与文件内容摘要各自区分。下载缓存不提交。

| 文件 / 来源 | UTC 时间 | HTTP | 字节 | SHA-256 |
|---|---|---:|---:|---|
| [taptap_methodology](https://maker.taptap.cn/leaderboard/methodology.html) | 2026-11-06T02:13:04.781076+00:00 | 200 | 21561 | `41b6ed2053f809e3004e42d96ca36eb92e1e3fd52e58240b79002968c4052d77` |
| [taptap_index](https://maker.taptap.cn/leaderboard/data/editions/index.json) | 2026-11-06T02:13:12.341646+00:00 | 200 | 2397 | `675cbcd69245a61309962860f74dc3dc2ccedc4715ddd3aabf31b45a3e02d144` |
| [2026-11-05-v6-hy4.json](https://maker.taptap.cn/leaderboard/data/editions/2026-11-05-v6-hy4.json) | 2026-11-06T02:14:07.135867+00:00 | 200 | 117341 | `e1efab6ec765a7b9f48deb3dea3c697ed42065dfec7e628c5f5acbad520cf85a` |
| [2026-09-10-v5-ds-v41-evolving.json](https://maker.taptap.cn/leaderboard/data/editions/2026-09-10-v5-ds-v41-evolving.json) | 2026-11-06T02:14:19.088136+00:00 | 200 | 97604 | `ca6d39c4df11ce9da4ac53fc4166c013f6f09603bc33aac1d195ae2c9b728602` |
| [spatial_supplement](https://api.github.com/repos/latchbio/spatialbench/contents/supplemental/verified_human_solutions?ref=baa9841efc99fa03b2f9ec25684c8ec52a2245df) | 2026-11-06T02:14:54.748396+00:00 | 404 | 127 | `e45906ce02e79f16fb87a838d86bb4e497e37a9591f97608fa013bbcd8b9cbc2` |
| [spatial_v1.json](https://benchmarks.bio/data/v1/spatialbench.json) | 2026-11-06T02:16:40.636379+00:00 | 200 | 405296 | `5f447ba6d61519bff30bd35685424d597f350c693e60ba4d6d61c15f4e8e2aa0` |
| [spatial_task.json](https://raw.githubusercontent.com/latchbio/spatialbench/baa9841efc99fa03b2f9ec25684c8ec52a2245df/example_evals/spatial_analysis/xenium_kidney_spatial_cn7_composition_day14.json) | 2026-11-06T02:17:53.598950+00:00 | 200 | 6416 | `19ffed66980a5309203b2d8cf8c23a9d25721ac9ecfac096c26bca8907d3d244` |
| [spatial_license.txt](https://raw.githubusercontent.com/latchbio/spatialbench/baa9841efc99fa03b2f9ec25684c8ec52a2245df/LICENSE) | 2026-11-06T02:18:04.680568+00:00 | 200 | 9668 | `351e1f87816584d1c1a36cbc55aea8914d189c8ec12a04a99ce493160c986055` |
| [spatial_readme.md](https://raw.githubusercontent.com/latchbio/spatialbench/baa9841efc99fa03b2f9ec25684c8ec52a2245df/README.md) | 2026-11-06T02:18:08.801495+00:00 | 200 | 4625 | `b3b688b2069acff7458facedbdedc1644bb54f20fb1734c2c75ff236ecb83f00` |
| [spatial_manifest.json](https://raw.githubusercontent.com/latchbio/spatialbench/baa9841efc99fa03b2f9ec25684c8ec52a2245df/example_evals/manifest.json) | 2026-11-06T02:18:23.815874+00:00 | 200 | 2089 | `e99bf005639dc37d1269a679b199acd0002e3597c0ac28f608034bb28a76a964` |

## 热门已有样例的逐字段核对

本批核对的是站内已选记录的raw字段与实际响应，不是全题库重评；不把标注答案等同独立科学正确性验证。HF rows动态响应仅以下载时间和SHA-256固定当次证据，另查到的仓库HEAD不冒充该响应revision。未新增这些条目的题目或媒体。

| 条目 | 实际匹配 | 划分与范围 |
|---|---:|---|
| mmlu | 4/4 | anatomy/test |
| mmlu-pro | 10/10 | validation；10条非test题 |
| gsm8k | 7/7 | 作者test.jsonl |
| math-500 | 3/3 | rows入口500后改读固定test.jsonl，共500行，匹配站内3行 |
| aime-2024 | 4/4 | MathArena再发布的AIME I题；其文件split=train不代表竞赛题是训练数据 |
| swe-bench-verified | 4/4 | test；4条Astropy issue记录，未执行修复/测试 |
| frontierscience | 5/5 | 固定olympiad/test 2条＋research/test 3条 |
| frontierscience-research | 3/3 | 固定research/test 3条；与总条目共享同3个task_group_id |

许可与重复边界：
- MMLU、GSM8K原许可已重新读取；MMLU-Pro论文v6附录A.5说数据集MIT，但当前代码LICENSE实际为Apache-2.0，已纠正旧条目“代码仓库也有MIT许可”的错误，既有许可文本本来就是Apache，不改原题。
- MATH-500、AIME原竞赛题及SWE issue文本的完整再发布许可没有因此得到统一确认；保留现有unknown及上游边界，不新增全文。
- FrontierScience固定数据卡标Apache-2.0并明确不进入训练语料。总条目与Research子条目的3个完全相同task_group_id属于已存在的跨总集/子集展示复用，本批不新增、不计成6个独立原题，也不在未确定页面保留策略时删除；全量去重阶段需统一处理。

### 本批读取的原始响应

| 来源 | UTC下载时间 | HTTP | 字节 | SHA-256 |
|---|---|---:|---:|---|
| [mmlu](https://datasets-server.huggingface.co/rows?dataset=cais%2Fmmlu&config=anatomy&split=test&offset=0&length=5) | 2026-11-06T02:13:54.582226+00:00 | 200 | 1999 | `77eab1b642e7b8350bee0645b77eed475f662227ba1cd93472f0add09e5c117f` |
| [mmlu-pro](https://datasets-server.huggingface.co/rows?dataset=TIGER-Lab%2FMMLU-Pro&config=default&split=validation&offset=0&length=100) | 2026-11-06T02:13:54.592133+00:00 | 200 | 69547 | `a3eaffdab1706508ffcce4ddbc9437a941393747ff8d8def31d9f60faf69089e` |
| [gsm8k](https://raw.githubusercontent.com/openai/grade-school-math/master/grade_school_math/data/test.jsonl) | 2026-11-06T02:13:53.651600+00:00 | 200 | 749738 | `3730d312f6e3440559ace48831e51066acaca737f6eabec99bccb9e4b3c39d14` |
| [math-500](https://datasets-server.huggingface.co/rows?dataset=HuggingFaceH4%2FMATH-500&config=default&split=test&offset=0&length=6) | 本轮请求 | HTTP Error 500: Internal Server Error | 未取得 | `未取得` |
| [aime-2024](https://datasets-server.huggingface.co/rows?dataset=MathArena%2Faime_2024_I&config=default&split=train&offset=0&length=6) | 2026-11-06T02:13:54.536027+00:00 | 200 | 3687 | `e0bc6dac8b5321e3f463a5861237a39d68be5879ad81acc85aacefabd53cace4` |
| [swe-bench-verified](https://datasets-server.huggingface.co/rows?dataset=SWE-bench%2FSWE-bench_Verified&config=default&split=test&offset=0&length=6) | 2026-11-06T02:14:05.062042+00:00 | 200 | 178349 | `a6a31fd9db945b468d3744d7ab0355a6c70eee2b08f2829183f7a2d51dfc1eda` |
| [frontierscience](https://huggingface.co/datasets/openai/frontierscience/resolve/25ed67db7da8f4591484e764008ff585544f5a30/olympiad/test.jsonl) | 2026-11-06T02:14:17.076675+00:00 | 200 | 142436 | `450e7fceb53c8140283a752f0d62a3abc69a85e252d4dbbd5d9dfbfb762db4e4` |
| [frontierscience](https://huggingface.co/datasets/openai/frontierscience/resolve/25ed67db7da8f4591484e764008ff585544f5a30/research/test.jsonl) | 2026-11-06T02:14:27.020722+00:00 | 200 | 372607 | `96c0434abfcbadd6ef6f59a03cc374be4caf9c1f2d5e62d8fe921e768f66aa46` |
| [math-500固定文件](https://huggingface.co/datasets/HuggingFaceH4/MATH-500/resolve/6e4ed1a2a79af7d8630a6b768ec859cb5af4d3be/test.jsonl) | 2026-11-06T02:15:51.779621+00:00 | 200 | 446564 | `35dc41080a3680858b27fa7e0533d2d547825316fc5dafe5d316f4ccc5a06132` |
| [gsm8k固定文件](https://raw.githubusercontent.com/openai/grade-school-math/3101c7d5072418e28b9008a6636bde82a006892c/grade_school_math/data/test.jsonl) | 2026-11-06T02:16:10.335470+00:00 | 200 | 749738 | `3730d312f6e3440559ace48831e51066acaca737f6eabec99bccb9e4b3c39d14` |

## 验证与审核记录

- 按锁文件运行npm ci成功（临时缓存），未修改依赖或锁文件。
- 标准npm run typecheck调用tsx CLI时被本环境本地IPC管道EPERM阻止；改用相同tsx loader直接执行原生成/验证脚本及vue-tsc，不改项目命令。最终结果随本批审核更新。
- code-review指定skill：仓库与当前环境未发现；存在review-agent只读审核skill。将分别派发Standards与Spec两个独立只读审核，但不冒称原指定skill门禁已完成。
- 不运行dev/start:dev、不部署、不推main；仅本分支交付用户审阅。

### 第一批最终执行结果（2026-11-06）

- `node --import tsx scripts/generate-content.ts`：通过，317条公开条目。
- `node node_modules/vue-tsc/bin/vue-tsc.js --noEmit`：通过。
- `node --import tsx scripts/validate-content.ts`：通过，769条样例、19份报告。
- `git diff --check`：通过。
- `node --import tsx scripts/build-site.ts`：通过，核验323个静态页及404页。标准npm脚本入口的tsx IPC限制仍需披露，不记为npm run命令原样通过。
- 真实浏览器尝试访问本次静态构建的SpatialBench页：两次受限回环预览均ERR_CONNECTION_REFUSED，未完成浏览器验收。没有新图/视频，本轮也未声称做过媒体播放测试。仅启动并关闭本次自有临时服务，未动他人服务。
- 未申请向网络公开预览；共享绑定被安全检查拒绝后改用受限回环，未扩大访问范围。当前不需要用户为研究结果开放网络，但浏览器验收仍未完成。
