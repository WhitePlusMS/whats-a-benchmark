# 2026-10-21 数据集描述事实核查

> 实施状态：用户已授权应用以下24项建议；本报告保留修改前的审阅记录，实际应用文字及发布检查见[实施与发布记录](../reviews/2026-10-21-dataset-description-release.md)。下文“未改”“未应用”均描述本次实施之前的审阅时点。

## 审阅结论

并非全部准确。215项都已列入本轮逐条比对：**6项有明确错误或版本表述需要修正；18项建议补清范围、字段或精确数；其余191项在本轮已读范围未发现已证实矛盾**。建议尚未应用到正式数据。

这三个数字描述的是审阅结果，不是全面通过率。没有将来源能打开、页面能显示、编译通过或抽到一个案例，当作全体数据集描述准确的证明。

逐项记录仍有177项带来源、版本或文件层面的未决边界；具体边界逐条列于后文。部分是官方本就未披露完整材料，部分是本轮尚未核到，二者不混同。所有条目均有本轮实际读取的一手来源或明确标注版本差异的已读来源。

## 确认需要修正的6项

| 项目 | 哪里有问题 |
| --- | --- |
| PSI / Personal Superintelligence Index | 事实/范围修正。内部指PSI复合指数本身，不能把所有七个组成评估都称为内部评测；公开JobBench就是反例。对完整题集未公开也应限定PSI评测实例和实际运行口径。 |
| Video-MME | 事实修正及字段补齐。官方README直接链接的数据分发页明确含test划分2700条问答；原“官方未报告train/validation/test”没有限定资料范围，且遗漏可读取的真实字段。 |
| CMMLU | 划分和字段错误；规模须绑定版本。现有说明套用了dev/val/test及subject_mapping.json的结构；实际固定v1.0.1公开ZIP只有dev/test两组，CSV列名为大写Question/Answer。该包test为11582条，不能把未标版本的11528当作此包实数。没有据此断言历史论文口径必然错误。 |
| MMMU-Pro | 公开配置范围判断错误。把浏览器默认选中的十选项视图写成唯一可见配置，遗漏同一个固定修订已有的四选项与vision配置。三个配置各1730行，不能当作互斥的5190道独立题目。Standard与Vision输入字段也不同。 |
| Excel Modeling Benchmark (EMB) | 把归档版本称为当前方法。引用页明确标为Archived/Version 1，已由v1.1取代；103题和1/51/51划分仍是该页支持的v1口径，不需要改成猜测的新版题量。 |
| SWE-bench Multilingual | 把并不存在的列名写入数据字段。固定公开Parquet为300行、15列，没有issue_id、issue_url、pr_url。不能把可由仓库信息推导的链接当作文件原字段。 |

## 原来与建议改后

以下完整保留原字段文字；这里只给修改建议，正式JSON、案例及媒体均未改。错误修正与信息补清分开标注。

### 1. PSI / Personal Superintelligence Index（需修正）

**哪里有问题：** 内部指PSI复合指数本身，不能把所有七个组成评估都称为内部评测；公开JobBench就是反例。对完整题集未公开也应限定PSI评测实例和实际运行口径。

字段：`officialDefinition.task`

**原来：**

汇总七项内部个人助理与知识工作评估，生成个人超级智能指数。

**建议改后：**

汇总七项个人助理与知识工作评估结果，形成Meta内部报告的个人超级智能复合指数；各组成项的公开范围分别说明。

字段：`dataProfile.summary`

**原来：**

Meta明确列出七个构件名称；完整题集和合成权重未公开。

**建议改后：**

本次核到的Meta模型卡列出七个组成评估，但未给出PSI合成权重、完整公式和可复现的完整运行配置。各组成评估的数据公开范围分别说明，不将它们全部视为未公开题集。

### 2. Video-MME（需修正）

**哪里有问题：** 官方README直接链接的数据分发页明确含test划分2700条问答；原“官方未报告train/validation/test”没有限定资料范围，且遗漏可读取的真实字段。

字段：`dataProfile.splits`

**原来：**

- 官方未报告 train/validation/test；short、medium、long 是视频时长类别。

**建议改后：**

- 官方README链接的LMMS-Lab分发版本使用videomme配置，test划分包含2700条问答记录；该分发版本未列出train或validation。
- short、medium、long是视频时长分组，不是train/validation/test划分。

字段：`dataProfile.fields`

**原来：**

（空）

**建议改后：**

- video_id
- duration
- domain
- sub_category
- url
- videoID
- question_id
- task_type
- question
- options
- answer

### 3. GPQA（建议补清）

**哪里有问题：** 实际文件确认Diamond⊆Main⊆Extended；Experts CSV为60条专家元信息，没有Question列，不能与三种问题集混为互斥题目划分。原数量未错，需将配置类型分清。

字段：`dataProfile.summary`

**原来：**

GPQA Main 有 448 题；数据卡另列 546 题 Extended、198 题 Diamond 和 Experts 配置。

**建议改后：**

GPQA Main有448道科学选择题，Diamond为其中198道筛选子集，Extended含546道题；另有60条专家资料，不能计入题目数量。

字段：`dataProfile.splits`

**原来：**

- HF 配置包括 gpqa_main、gpqa_extended、gpqa_diamond 和 gpqa_experts；配置之间可能重叠，不是互斥切分。

**建议改后：**

- 固定公开包中Diamond是Main的子集，Main是Extended的子集；三种题目配置不是互斥切分，题数不能相加。
- HF另提供gpqa_experts配置，对应专家资料表，不是额外的问题集。

### 4. GPQA Diamond（建议补清）

**哪里有问题：** HF的条件接受流程属于该获取入口，不能将其条件概括为所有来源的获取要求；本站继续遵循作者不在线展示样例的请求。

字段：`reusePolicy.boundaries`

**原来：**

- 公开网站不转载题目、选项、答案或截图；其他用途应同时遵守 HF 数据访问条件和 CC BY 4.0。

**建议改后：**

- 本站遵循作者不在线展示样例的请求，不转载题目、选项、答案或截图。通过Hugging Face获取文件时，须遵守该入口的访问条件；使用数据应遵守适用的数据许可。

### 5. CMMLU（需修正）

**哪里有问题：** 现有说明套用了dev/val/test及subject_mapping.json的结构；实际固定v1.0.1公开ZIP只有dev/test两组，CSV列名为大写Question/Answer。该包test为11582条，不能把未标版本的11528当作此包实数。没有据此断言历史论文口径必然错误。

字段：`version`

**原来：**

CMMLU

**建议改后：**

CMMLU；数据说明按官方HF固定v1.0.1公开包

字段：`dataProfile.summary`

**原来：**

CMMLU 包含 11,528 道题，覆盖 67 个学科。

**建议改后：**

覆盖67个学科；本条引用的v1.0.1公开包包含335条dev示例和11582条test记录，规模按这个固定发布包说明。

字段：`dataProfile.scale`

**原来：**

- 共 11,528 道选择题，分布于 67 个学科。

**建议改后：**

- 固定v1.0.1公开包：dev为67个CSV、335条；test为67个CSV、11582条。
- 原说明的11528与此包计数不同；历史统计与当前文件不得不标版本地混用。

字段：`dataProfile.splits`

**原来：**

- 官方仓库按 dev、val 和 test 组织数据。
- 各 split 的可用答案及用途需按相应仓库版本核对。

**建议改后：**

- 固定v1.0.1公开包按dev和test组织；该包没有val目录。每个学科的dev为5条。

字段：`dataProfile.fields`

**原来：**

- 每条记录包含 question、A、B、C、D 与 answer。
- subject_mapping.json 将 subject 映射为学科名称和类别。

**建议改后：**

- CSV真实表头：空表头索引列、Question、A、B、C、D、Answer；保留原字段大小写。
- 学科可由CSV文件名识别；不把其他基准的subject_mapping.json描述套到此发布包。

字段：`dataProfile.files`

**原来：**

- 仓库按学科提供 CSV 文件，并含 subject_mapping.json。
- Hugging Face 同步发布 haonan-li/cmmlu 数据集。

**建议改后：**

- cmmlu_v1_0_1.zip，固定HF修订efcc940752ea4a1ea94d2727f11f83858d64fc8e；dev/与test/各含67个学科CSV。

### 6. MMMU-Pro（需修正）

**哪里有问题：** 把浏览器默认选中的十选项视图写成唯一可见配置，遗漏同一个固定修订已有的四选项与vision配置。三个配置各1730行，不能当作互斥的5190道独立题目。Standard与Vision输入字段也不同。

字段：`dataProfile.summary`

**原来：**

MMMU-Pro 发布 Standard 与 Vision-only 两种输入设置；当前 Viewer 仅显示 Standard 10-option test split。

**建议改后：**

MMMU-Pro提供Standard与Vision两类主要输入形式；固定公开修订实际包含standard (10 options)、standard (4 options)和vision三个配置。

字段：`dataProfile.scale`

**原来：**

- 1,730 道筛选题；Standard 与 Vision-only 两种主要形式共 3,460 个输入实例。

**建议改后：**

- 1730道筛选题；三个公开配置的test各1730行，分别是十选项、四选项对照和Vision输入包装，不按配置行数相加为独立题数。

字段：`dataProfile.splits`

**原来：**

- Viewer：standard (10 options) 的 test；论文另报告 Vision-only，并以 Standard 4-option 作对照。

**建议改后：**

- 固定修订0d7426df4ccb3d8704a992fe6850abee7c262127：standard (10 options)、standard (4 options)、vision各有test划分，每个1730行。

字段：`dataProfile.fields`

**原来：**

- id、question、options、explanation、image_1–image_7、img_type、answer、topic_difficulty、subject。

**建议改后：**

- Standard配置：id、question、options、explanation、image_1至image_7、img_type、answer、topic_difficulty、subject。
- Vision配置：id、image、options、answer、subject；不套用Standard的question/image_1等列。

字段：`dataAccess.requirements`

**原来：**

- 官方数据卡及代码仓库公开；Standard 10-option 测试记录可从 Hugging Face 浏览。论文报告 Standard 和 Vision 两个主要设置及 4-option 对照，但浏览器核验到的 Hugging Face Viewer 只显示 Standard 10-option，不据此推断所有官方评测包装都已在该 Viewer 发布。

**建议改后：**

- 三个配置在同一官方公开HF修订中提供；页面默认显示的十选项配置不代表另两个配置未公开。数据与上游图像的使用边界仍按对应许可说明处理。

### 7. Excel Modeling Benchmark (EMB)（需修正）

**哪里有问题：** 引用页明确标为Archived/Version 1，已由v1.1取代；103题和1/51/51划分仍是该页支持的v1口径，不需要改成猜测的新版题量。

字段：`version`

**原来：**

官方当前方法；Template / Scratch 双模式

**建议改后：**

v1.0归档方法；Template / Scratch双模式；v1.1另有评分更新

字段：`dataProfile.summary`

**原来：**

103 个专家题，涵盖 7 类模型；榜单只用 51 个私有测试题。

**建议改后：**

本条按EMB v1.0归档页：103个专家题、7类模型，榜单使用51个私有test任务；该页已不代表最新评分版本。

### 8. SWE-bench Multilingual（需修正）

**哪里有问题：** 固定公开Parquet为300行、15列，没有issue_id、issue_url、pr_url。不能把可由仓库信息推导的链接当作文件原字段。

字段：`dataProfile.fields`

**原来：**

- instance_id、repo、issue_id、base_commit、problem_statement、version、issue_url、pr_url、patch、test_patch、FAIL_TO_PASS、PASS_TO_PASS。

**建议改后：**

- 固定HF修订846e647b9f33c0b51b739d005d13d85493c9af09的实际15列：base_commit、created_at、eval_type、image、instance_id、log_parser、repo、version、patch、test_patch、eval_script、problem_statement、hints_text、FAIL_TO_PASS、PASS_TO_PASS。
- 该发布文件没有issue_id、issue_url或pr_url列；另行构造的链接必须与原字段区分。

### 9. AA-LCR v1.1（建议补清）

**哪里有问题：** 100题规模正确；实际已能核到固定CSV及9列，空字段不宜使读者误以为没有可公开检查的结构。CSV题目与约十万token原文档的版权和获取仍分别说明。

字段：`dataProfile.fields`

**原来：**

（空）

**建议改后：**

- 固定CSV共9列：空表头索引列、document_category、document_set_id、question_id、question、answer、data_source_filenames、data_source_urls、input_tokens。

字段：`dataProfile.files`

**原来：**

（空）

**建议改后：**

- AA-LCR_Dataset.csv：固定修订9a77ef56b717057ade24ceab4d273712a0b4f19e，实际100条记录；原长文档/抽取文本另有资源入口，不能把题目CSV当作完整可运行输入。

### 10. IFBench（建议补清）

**哪里有问题：** 58是OOD约束类型数，原说明没有写错这个单位，但没有交代公开测试记录数和实际输入字段。当前HF测试发布为300行，存储标签train不等于允许作为训练集。

字段：`dataProfile.scale`

**原来：**

- 58 个新的 OOD 测试约束及相应验证函数。
- IF-RLVR 另有 29 个训练约束，不计作 IFBench 测试约束。

**建议改后：**

- 58类OOD测试约束及相应验证函数；当前HF公开测试发布包含300条prompt记录，两种计数单位不同。
- IF-RLVR另有29类训练约束，不与IFBench测试约束或测试题数相加。

字段：`dataProfile.splits`

**原来：**

- 官方提供单轮测试、多轮测试及独立 IF-RLVR 训练数据。

**建议改后：**

- 官方提供单轮测试、多轮约束隔离设置及独立IF-RLVR训练资源；HF IFBench_test的当前文件标签为train（300行），不把存储标签当作模型训练协议。

字段：`dataProfile.fields`

**原来：**

- README 要求测试 JSONL 与 prompt/completion 回复 JSONL；未在本候选中断言统一完整字段 schema。

**建议改后：**

- 公开测试输入：key、prompt、instruction_id_list、kwargs；kwargs保存各约束参数。
- 模型回复文件中的prompt/completion与上述测试输入schema分别说明。

### 11. GSM8K（建议补清）

**哪里有问题：** 作者旧README的8.5K是约数，不能据此改成数据不存在；当前公开元数据能给出精确7473/1319。现有约8.79K并非算错。

字段：`dataProfile.summary`

**原来：**

作者 README 以约数报告约 8.5K 题；当前 HF main 配置显示约 8.79K 行，train 约 7.47K。另有 socratic 配置。

**建议改后：**

作者旧README约称8.5K题；当前官方HF main配置实际为7473条train、1319条test，共8792条。socratic是另一个格式变体，不与main相加。

字段：`dataProfile.scale`

**原来：**

- 作者口径：约 8.5K（约 7.5K train、约 1K test）；当前 HF main：8.79K 行，train 约 7.47K。

**建议改后：**

- 当前HF固定修订740312add88f781978c0658806c59bc2815b9866：main为train 7473、test 1319，共8792条；socratic同样各7473/1319。
- 旧README约8.5K的概述与当前文件精确计数分别标明；当前文件的划分名以元数据/文件中的test为准。

### 12. ArXivLean（建议补清）

**哪里有问题：** 固定Parquet实际46行、7列，answer在46行中均非空。原清单遗漏answer；formal_statement内待证明位置不是完成证明，这一边界仍保留。

字段：`dataProfile.fields`

**原来：**

- 固定六月数据的实际字段为 problem_idx、problem、formal_statement、source、title、authors；formal_statement 含待完成证明的 sorry，不是完整答案。

**建议改后：**

- 固定六月数据实际7列：problem_idx、problem、answer、formal_statement、source、title、authors。
- answer与formal_statement是不同字段；formal_statement中待完成的证明位置不能当作模型已获完整证明，字段具体语义按官方工具协议解释。

### 13. SWE-bench Multimodal（建议补清）

**哪里有问题：** 论文617任务是历史论文口径，不能改成当前发布包580而不说明版本；现有dev100本身没错，但遗漏已可核验的test480和多模态素材字段。官方指南还写test500，三者差额原因未确认。

字段：`dataProfile.summary`

**原来：**

论文报告617个多模态软件缺陷修复任务；官方 HF 数据卡记录 issue、补丁、测试补丁和图像资产等字段，当前可见 dev split 为100行，不等于论文总量。

**建议改后：**

论文报告617项、17个JavaScript库；本次实际读取HF修订4e6662d51c48e475f7f346e4fa09a6f8b31fcaa5，dev为100行、test为480行。论文、指南和实际文件的数量分别说明。

字段：`dataProfile.splits`

**原来：**

- The paper reports 617 task instances across 17 JavaScript repositories.
- The current HF viewer shows a 100-row dev split; this is not the paper total.

**建议改后：**

- 论文口径：617项；官方指南另列dev 100/test 500。
- 固定HF修订实际文件：dev 100、test 480，共580行；与论文和指南的差额原因未核实，不补造删题或版本迁移解释。

字段：`dataProfile.fields`

**原来：**

- instance_id
- repo
- base_commit
- version
- eval_type
- problem_statement
- FAIL_TO_PASS
- PASS_TO_PASS

**建议改后：**

- 固定发布包含instance_id、repo、base_commit、version、problem_statement、patch、test_patch、FAIL_TO_PASS、PASS_TO_PASS等任务/评分字段。
- image_assets保存patch、problem_statement与test_patch相关的图像资源信息；另有image等环境字段。多模态资源列不能从数据说明中省略成纯文本任务。

### 14. Finance Agent（建议补清）

**哪里有问题：** 927项与27/450/450已明确按v2描述，不是题数错误；版本栏过于笼统，应说明所引页为归档v2，不能自动冒充v2.1。

字段：`version`

**原来：**

Finance Agent 官方任务集

**建议改后：**

Finance Agent v2归档任务集；927项口径，不与v2.1混用

### 15. JailbreakBench（建议补清）

**哪里有问题：** 现有列名真实存在，但只属于judge_comparison/test，不是100个主要误用行为的字段。不能把裁判对比样本误写成整个benchmark的统一schema。

字段：`dataProfile.splits`

**原来：**

（空）

**建议改后：**

- HF主behaviors配置包含harmful和benign，各100条；裁判比较另有judge_comparison/test 300条，三种记录用途不同，不相加为误用行为数量。

字段：`dataProfile.fields`

**原来：**

- Index
- goal
- prompt
- target_response
- human1
- human2
- human3
- human_majority
- harmbench_cf
- gpt4_cf
- llamaguard2_cf
- llama3_cf

**建议改后：**

- 主behaviors字段：Behavior、Category、Goal、Index、Source、Target。
- 本站所选judge_comparison/test案例字段：Index、goal、prompt、target_response、human1、human2、human3、human_majority、harmbench_cf、gpt4_cf、llamaguard2_cf、llama3_cf；这是裁判对比记录。

### 16. MAEB（建议补清）

**哪里有问题：** 整体简介已说明包含多个子任务；字段栏却直接列出所选案例的列名，容易被读成全套数据统一结构。保留真实列名并明确其所属子任务即可，不新增推测字段。

字段：`dataProfile.fields`

**原来：**

- primary_label
- secondary_labels
- type
- recording
- collection
- rating
- url
- scientific_name
- common_name
- author
- license
- inat_taxon_id
- class_name

**建议改后：**

- 以下仅为本站所选上游mteb/birdclef25-mini记录字段，不是MAEB全部30项任务的统一schema。
- primary_label
- secondary_labels
- type
- recording
- collection
- rating
- url
- scientific_name
- common_name
- author
- license
- inat_taxon_id
- class_name

### 17. MIEB-lite（建议补清）

**哪里有问题：** 整体简介已说明包含多个子任务；字段栏却直接列出所选案例的列名，容易被读成全套数据统一结构。保留真实列名并明确其所属子任务即可，不新增推测字段。

字段：`dataProfile.fields`

**原来：**

- image
- label
- image_id

**建议改后：**

- 以下仅为本站所选上游mteb/resisc45记录字段，不是MIEB-lite全部51项任务的统一schema。
- image
- label
- image_id

### 18. LegalBench（建议补清）

**哪里有问题：** 整体简介已说明包含多个子任务；字段栏却直接列出所选案例的列名，容易被读成全套数据统一结构。保留真实列名并明确其所属子任务即可，不新增推测字段。

字段：`dataProfile.fields`

**原来：**

- index
- answer
- text
- slice

**建议改后：**

- 以下仅为本站所选LegalBench hearsay/test记录字段；162项任务按各自输入输出结构发布，不将这四列当作统一schema。
- index
- answer
- text
- slice

### 19. ToolRet（建议补清）

**哪里有问题：** 只列id和labels没有体现检索时真正使用的query/instruction，也没有限定该列清单为query数据。当前公开metadata支持五个字段；论文约7.6k与当前7961行之间不能无依据归为同一版本。

字段：`dataProfile.fields`

**原来：**

- id
- labels

**建议改后：**

- 当前官方ToolRet-Queries各query配置字段为id、query、instruction、labels、category；labels与检索输入分别说明。工具语料和训练实例由各自数据资源定义，不套用这五列。

字段：`dataProfile.splits`

**原来：**

（空）

**建议改后：**

- 当前公开ToolRet-Queries的35个配置合计7961条queries记录；与论文约7.6k检索任务的范围/版本关系尚未核定，不与约43k工具或超过200k训练实例相加。

### 20. MemoryArena（建议补清）

**哪里有问题：** 766是原说明明确标作论文报告的数，不能直接判为错误；但当前五个公开文件仅701行，并且附加字段因配置而异。现有三列只对应progressive_search，需补版本和各配置结构。

字段：`dataProfile.summary`

**原来：**

论文报告766个任务，平均每个任务6.9个子任务，其中57个任务含相互依赖子任务；项目页展示五种数据配置。

**建议改后：**

论文报告766个任务；本次所读官方HF固定修订的五个公开文件共701行。两者的版本/范围映射未核实，不能把公开文件行数直接改称论文总任务数。

字段：`dataProfile.splits`

**原来：**

（空）

**建议改后：**

- HF修订da1a37c8b19280e18627ca01cf368195a5e1d92e：bundled_shopping 150、formal_reasoning_math 40、formal_reasoning_phys 20、group_travel_planner 270、progressive_search 221，共701条公开文件记录。
- 上述行数与论文766任务之间的差额原因未确认；不将questions数组中的子问题数与外层记录数混计。

字段：`dataProfile.fields`

**原来：**

- id
- questions
- answers

**建议改后：**

- 共同字段为id、questions、answers。
- bundled_shopping另有category；两个formal_reasoning配置另有backgrounds、paper_name；group_travel_planner另有base_person；不能将progressive_search的三列当作全部配置的完整schema。

### 21. LongMemEval（建议补清）

**哪里有问题：** 固定oracle文件可核实500行和haystack_dates列；该文件不能替代S/M长上下文设置。原500题规模没有错，字段清单漏了会话日期。

字段：`dataProfile.fields`

**原来：**

- question_id
- question_type
- question
- answer
- question_date
- haystack_session_ids
- haystack_sessions
- answer_session_ids

**建议改后：**

- 固定oracle文件字段：question_id、question_type、question、answer、question_date、haystack_session_ids、haystack_sessions、haystack_dates、answer_session_ids。
- 这是oracle发布文件的列清单，S/M完整长历史的文件、长度与运行配置另行固定。

字段：`dataProfile.files`

**原来：**

（空）

**建议改后：**

- longmemeval_oracle.json：固定修订98d7416c24c778c2fee6e6f3006e7a073259d48f，500条记录；不能将Oracle取样输入直接说成115k或1.5M tokens的完整上下文。

### 22. LoCoMo（建议补清）

**哪里有问题：** 原50段明确属于论文描述；固定locomo10.json实际为10条外层对话记录，不能用这一个文件证明全部50段都在该公开包，也不能把10条解释成仅10个问答。

字段：`dataProfile.files`

**原来：**

（空）

**建议改后：**

- 本站所选固定locomo10.json包含10条外层对话记录（每条含conversation和qa等）；论文报告50段对话。该固定文件与论文50段的完整映射未核实，不把两者当同一范围。

### 23. When2Call（建议补清）

**哪里有问题：** held_out_param是真实可选列，不能因首行没有就删除。主任务完整遍历两个固定测试文件：它分别出现在100/300与1062/3652行。仅凭首条记录无法断言完整schema；两种评估文件也不等于互斥题目划分。

字段：`dataProfile.splits`

**原来：**

- The pinned NVIDIA dataset card exposes train/test data and an llm_judge subset; viewer row counts depend on subset/split.

**建议改后：**

- 固定HF修订ca9b4b48225b8236ed7a3d3bc0b78986c19991d7：when2call_test_llm_judge.jsonl有300行，when2call_test_mcq.jsonl有3652行；这是两种评估文件，重叠/派生关系未按ID逐条核实，不将3952行说成去重后的独立题数。

字段：`dataProfile.fields`

**原来：**

- uuid
- source
- source_id
- question
- correct_answer
- answers
- target_tool
- tools
- held_out_param

**建议改后：**

- 共同字段：uuid、source、source_id、question、correct_answer、answers、target_tool、tools。
- 可选字段：orig_tools、orig_question、held_out_param；完整遍历固定测试文件确认held_out_param实际存在，不能用首行字段推断其不存在。

### 24. ScreenSpot-Pro（建议补清）

**哪里有问题：** 当前Viewer未配置的说法不等于只有1K至10K的范围。主任务完整读取固定修订26个公开annotations JSON，实际可核1581条标注对象及10个字段；这里没有把跨文件标注数当作去重后的独立任务数。

字段：`dataProfile.summary`

**原来：**

数据卡按应用组织截图标注文件，但未提供可确认的完整 schema、split 或精确条目数。

**建议改后：**

ScreenSpot-Pro按应用/平台提供公开截图标注JSON；即使Viewer未配置，也可以从实际文件检查字段和标注条数。

字段：`dataProfile.scale`

**原来：**

- 覆盖 23 个应用、5 个行业和 3 种操作系统；数据卡仅给出 1K<n<10K 的样本范围。

**建议改后：**

- 论文/数据卡报告23个应用、5个行业、3种操作系统；对应分组与文件数不是同一个单位。
- 固定HF修订210e78d3844251110bff86c95835ebd37a6930fa共有26个annotations JSON，逐文件解析共1581条标注对象；未据此宣称1581个去重独立任务。

字段：`dataProfile.fields`

**原来：**

（空）

**建议改后：**

- 固定公开annotations文件的字段并集：application、bbox、group、id、img_filename、img_size、instruction、instruction_cn、platform、ui_type；具体记录的可选字段以原文件为准。

字段：`dataProfile.files`

**原来：**

- 按应用组织的 annotations JSON 与图片目录；Dataset Viewer 未配置。

**建议改后：**

- annotations/*.json保存应用/平台标注，screenshots/保存关联截图；Dataset Viewer没有配置不会阻止读取这些公开JSON。

## 核对后应保留的典型信息

- GPQA的Main 448、Diamond 198、Extended 546均正确；问题是需要将专家资料的60行与题目分开、明确包含关系。
- HumanEval原始公开题库确有164道手写Python函数题；函数补全与功能测试是其任务定义，不能因为一个案例印象相反而改成其他任务。主任务解析了全部164条的字段。
- LiveCodeBench Pro截至2025-04-25的584题有论文多个章节支持；HF后来有六个时间窗口，不能把窗口行数直接相加后推翻历史快照。
- MMLU原说明的15908/1540/14079来自原论文；当前HF文件数不同，应区分来源和版本。原论文自述总数与其各split相加也不完全一致，本轮不替作者补出差额。
- FrontierMath历史350题与v2的338题、CritPt总71挑战与70个计分挑战，现有说明已分开，不能当作简单计数错误。
- When2Call的held_out_param真实存在于部分行；首行没有该列不能证明它不存在。保留真实可选字段，不按首行重造schema。

## 全部215项覆盖矩阵

“未发现已证实错误”只覆盖本轮实际读取内容；待核栏保留具体边界。完整来源、访问状态和主任务判断另存本地root-review-matrix.json。

| # | 项目 | 主审结果 | 本轮核到的内容 | 仍待核或不可外推之处 |
| --- | --- | --- | --- | --- |
| 1 | API-Bank (`api-bank`) | 未发现已证实错误 | 论文区分可运行评测系统：73 APIs、314 工具使用对话、753 API calls；训练集另为 1,888 对话、2,138 APIs、1,000 domains。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 2 | b³ Agent Security (`b3-agent-security`) | 未发现已证实错误 | 论文页面为 v2（2026-02-24 修订），v1 于 2025-10-26 提交。；摘要称 b³ benchmark 建立于 194,331 条独特众包对抗攻击。 | dataProfile：论文总体攻击数与公开 weak 子集 630 行的筛选关系需继续核对作者数据卡。 |
| 3 | BFCL (`bfcl`) | 未发现已证实错误 | 作者 README 将数据分为多个 JSON 文件，每行一个 JSON 对象；每个文件代表一个测试类别。；README 列 BFCL V1、V2、V3、V4 为不同版本方向，并标示原始发布日期 2024-02-26、最新版本发布日期 2025-07-17。 | dataProfile：各版本当前精确条目数、具体V4 schema仍需以固定数据文件核验。 |
| 4 | BrowseComp (`browsecomp`) | 未发现已证实错误 | OpenAI 发布页日期为 2025-04-10；说明 benchmark 有 1,266 道挑战问题并公开于 simple-evals。 | dataProfile：simple-evals harness 与题面数据载荷的精确公开形式需继续读代码及作者数据文件；公开实现入口本身不确定题目明文可读。 |
| 5 | BrowseComp-ZH (`browsecomp-zh`) | 未发现已证实错误 | 作者官方 README 可达；该文件同时提供中文说明和项目数据访问说明入口。 | dataProfile：加密文件记录数、字段、可访问方式与论文样例关系尚未从页面正文逐字段摘取。 |
| 6 | Cybench (`cybench`) | 未发现已证实错误 | 论文 v1 提交于 2024-08-15，当前页面 v4 修订于 2025-04-12。；作者称包含来自4场CTF竞赛的40项专业级任务，每项有描述、starter files及执行环境。 | dataProfile：当前仓库任务计数、题面许可及初始论文版本与当前工作树的对应需对固定commit核验。 |
| 7 | DeepSearchQA (`deepsearchqa`) | 未发现已证实错误 | Google DeepMind技术报告自述DeepSearchQA为900 prompts、17 fields，任务以可核验ground-truth answer sets构成。；论文正文统计段亦报900 prompts与领域覆盖；题目规模描述以prompt计，不表示模型运行trajectory数。 | HF发布文件与Kaggle leaderboard包的关系：本轮确认HF版单eval split及其viewer字段，未比较HF版本与Kaggle提交/榜单数据包的文件级一致性或许可条款。 |
| 8 | Earthborne Rangers (EBR-bench) (`ebr-bench`) | 未发现已证实错误 | Epoch当前页面称每次样本默认十局：八局学习、两局计分；topline为最后两局中的较高分，样本数当前5（早期运行10）。；当前实验每局覆盖Earthborne Rangers战役最初五个游戏日，最多21个目标；完整战役为20–25日。 | 任务卡片及完整游戏文件的官方发布范围：官方网页明确说明不分发底层游戏材料；本轮未进一步读取单个案例文章/素材文件。 |
| 9 | EVA-Bench (`eva-bench`) | 未发现已证实错误 | 官方数据说明称每个测试案例（scenario）是评测记录，包含 User Goal，并以具体目标决策树指导 user simulator 对话。 | dataProfile：论文213场景/三个企业领域与当前仓库 data 目录规模需区分版本并读具体数据清单；本轮目录读取受工具限制。 |
| 10 | FocusBench (`focusbench`) | 未发现已证实错误 | Meta Muse Wonder model card describes evaluation protocols/results and includes model-specific evaluation coverage; the card is model-provider material, not an author benchmark dataset card. | dataProfile：The current source read does not provide FocusBench task count, fields, split, or task files. |
| 11 | GAIA (`gaia`) | 未发现已证实错误 | Author HF card says access requires agreeing to conditions and says not to reshare validation/test data in crawlable form.；Original paper describes 466 questions, with questions released while answers to 300 are retained for leaderboard. | dataProfile：Task access is gated by agreement; exact current split row counts and schema require accepted-content dataset view. |
| 12 | Long-Horizon Terminal-Bench (LHTB) (`lhtb`) | 未发现已证实错误 | 作者当前README称LHTB 2.0有77项任务，由46项original tasks与31项new tasks组成；2.0新增30项reconstruction tasks，并开放四个新领域。；README称任务在容器化终端中运行数百步，使用hidden、rebuild-from-artifact verifiers；continue-until-timeout harness可在verifier未通过后给二元拒绝并继续。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 13 | LiveClawBench (`liveclawbench`) | 未发现已证实错误 | Paper page is v2, last revised 2026-06-25; abstract describes a benchmark intended to match real assistant task distribution and execution semantics, including stateful/personalized environments. | dataProfile：The paper abstract excerpt does not state task count or public release version; current repository commit should be checked separately. |
| 14 | MCP-Atlas (`mcp-atlas`) | 未发现已证实错误 | Paper current v3 revised 2026-05-19; abstract reports 1,000 natural-language tasks across 36 real MCP servers and 220 tools. | dataProfile：Current HF train row count/schema and any later post-publication changes need pinned dataset file/card. |
| 15 | Mind2Web (`mind2web`) | 未发现已证实错误 | 作者README称Mind2Web含2000+ open-ended tasks、137个网站、31个领域。；README split统计分别为train 1009、test_task 252、test_website 177、test_domain 912；并解释后三者分别对应跨任务、跨网站、跨领域评测。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 16 | OSWorld (`osworld`) | 未发现已证实错误 | OSWorld v1官网注明OSWorld 2.0于2026-06-26提供、OSWorld-Verified于2025-07-28升级。；官网描述OSWorld为真实计算机环境下的多模态agent任务，支持任务配置与执行式评测。 | dataProfile：本轮未再次读取v1完整任务目录与各系统子集计数。 |
| 17 | OSWorld 2.0 (`osworld-2`) | 未发现已证实错误 | OSWorld V2官方task classes在HF gated发布；作者说明公开仓库保留task loader、helper utilities与文档。 | dataProfile：需分别关联V2.0任务快照与V2.1修订。 |
| 18 | OSWorld 2.1 (`osworld-2-1`) | 未发现已证实错误 | 官方HF卡要求同意条款访问文件；task_*.py实现为gated，公开GitHub仓库保留loader/helpers/docs。；卡片说明发布不包含deprecated backup/prev_tasks目录。 | dataProfile：需分开记V2.1与V2任务列表及仓库版本。 |
| 19 | PaperBench (`paperbench`) | 未发现已证实错误 | OpenAI公告（2025-04-02）称PaperBench覆盖20篇ICML 2024 Spotlight/Oral论文复现、共8,316个可评分子任务；rubric由对应论文作者共同开发。 | dataProfile：20篇复现任务与8,316评分子任务是不同统计单位；Code-Dev变体另需核对。 |
| 20 | PostTrainBench (`posttrainbench`) | 未发现已证实错误 | 论文v2修订2026-03-10，任务预算描述为单H100、10小时的自主后训练实验。 | dataProfile：摘要未给公开任务条目总数、split、字段或文件清单。 |
| 21 | SkillsBench (`skillsbench`) | 未发现已证实错误 | 官方v1.1公告称87个task.md任务包、8个领域；18种model-harness配置。；registry显示任务难度汇总easy 6、medium 53、hard 28，合计87。 | dataProfile：任务数与模型harness配置数分别计量。 |
| 22 | Speech Agent Arena (`speech-agent-arena`) | 未发现已证实错误 | 官方公告（2026-08-24）称15个agentic与20个non-agentic场景。；除一个New Patient Dental Booking示例外，场景提示、工具schema与参与者说明为private；Task Success Rate用于agentic场景。 | dataProfile：公告场景数不等于当前完整逐条公开题集。 |
| 23 | SPEED-Bench (`speed-bench`) | 未发现已证实错误 | 论文v1提交2026-02-10、v2修订2026-05-28；摘要提及按语义多样性选择的Qualitative data split。 | dataProfile：HF当前不同split行数与字段需另读固定版本数据卡。 |
| 24 | τ-bench (`tau-bench`) | 未发现已证实错误 | 论文v1表1列τ-retail有115项task、τ-airline有50项task；同表另列两个领域各自数据库与API数量。；论文将该工作称为两个模拟领域任务评测，并指出该基准偏向少量高质量task、以多次运行观察pass^k；task数与运行轨迹数属于不同统计对象。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 25 | τ-Voice (`tau-voice`) | 未发现已证实错误 | 论文日期2026-03-14；描述全双工语音agent任务，包含真实任务完成、全双工互动、真实音频和可控语音用户模拟器。 | dataProfile：摘要未列任务/场景总数；不可由τ²-bench计数推算。 |
| 26 | τ²-bench (`tau2-bench`) | 未发现已证实错误 | 论文v1表1列Retail 115、Airline 50、Telecom 114个采样task；Telecom完整组合空间2285项，论文另说明由15个atomic subtask groups程序化生成，再平衡抽取114项。；论文将任务正确性定义为最终状态满足断言；每个task可使用不同成功判据，Telecom以assertion functions评估。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 27 | Terminal-Bench 2.0 (`terminal-bench-2`) | 未发现已证实错误 | 2.1作者公告写2.0共89项，并报告2.1修订其中28项。 | dataProfile：2.0当前文件任务计数和task schema需要以固定commit的完整仓库文件为准。 |
| 28 | Terminal-Bench 2.1 (`terminal-bench-2-1`) | 未发现已证实错误 | 官方2.1公告说它修复Terminal-Bench 2.0的89项任务中的28项。 | dataProfile：89是2.0任务基数，28是修订覆盖数，不是2.1增量新增任务数。 |
| 29 | Terminal-Bench 3.0 (`terminal-bench-3`) | 未发现已证实错误 | 官方3.0公告称首发版含74项任务、分布于7个领域。；公告称Terminal-Bench 3.0为持续更新基准；公告描述任务由环境执行，任务产物交由独立verifier容器判定。 | 当前3.0完整任务数：3.0公告披露“首发74项”，README指向持续维护的latest版本；本轮未读取3.0固定发布数据全目录以确认当前精确总数。 |
| 30 | Terminal-Bench 4.0 (`terminal-bench-4`) | 未发现已证实错误 | 4.0公告称版本调整任务时间、CPU和内存资源，修订任务并移除饱和任务；所有任务设定8小时agent timeout。；公告称从前版移除8项任务、修复19项任务；把任务集变化定义为需重新运行试验的breaking change。 | 4.0精确总任务数：本轮公告给出移除与修复数量，未给出4.0完整总数；未读取官方release任务目录逐项计数。 |
| 31 | Toolathlon-Verified (`toolathlon-verified`) | 未发现已证实错误 | 作者README说明仓库对应Toolathlon-Verified final release，基准基于真实软件环境工具，介绍部分称600+ diverse tools。；README记载Verified最终版于2026-06-30发布，称任务提示、ground truths和evaluators经过review/alignment，并链接8个模型轨迹及独立trajectory数据集。 | Verified final release任务总数：README确认final release及其审校范围，但未列最终总任务数；论文摘要108项对应论文版本，未由当前README证明等于final release数量。；轨迹数与任务数：README将模型轨迹作为单独的HF数据资源发布，本轮未读取其具体公开版本文件清单/记录总数。 |
| 32 | ToolRet (`toolret`) | 建议补清 | 论文v2摘要区分7.6k retrieval tasks、43k tool corpus与超过200k training instances，三者是不同统计对象。；论文版本为arXiv v2（2025-05-26）；正文包含benchmark construction、statistics、task format和data card章节。 | 约7.6k/43k/200k统计的精确组成及当前仓库版本字段：论文摘要读到三个统计量，但未在本轮抽取附录data card各子集逐项数字；HF README raw路径404。 |
| 33 | ToolSandbox (`toolsandbox`) | 未发现已证实错误 | 作者论文描述有状态工具执行环境、工具交互、多轮对话及任务/状态里程碑式评估。；固定commit源码将单次调用场景定义为ScenarioExtension，关联base_scenario、消息、tool_allow_list和milestones。 | 场景总数、数据split与当前版本总场景schema：本轮读取的是固定commit中一个场景模块，不是完整场景目录计数或所有扩展文件。 |
| 34 | VBT (Verifiable Browsing Task) (`vbt`) | 未发现已证实错误 | Meta Muse Wonder模型卡将VBT列为PSI七个组成评估之一，并将VBT描述为内部评估。；模型卡对VBT描述使用search、open和find浏览操作及列表式信息请求；本轮所读模型卡没有列出VBT完整任务量、数据split或独立评分公式。 | VBT任务数量、完整数据/字段及评分公式：本轮所读第一方材料为Meta模型卡，未提供这些细节；未取得VBT独立公开题集/数据卡。 |
| 35 | Vending-Bench 2 (`vending-bench-2`) | 未发现已证实错误 | 作者官方页面描述模型在模拟自动售货机业务中运营一年，以年末银行余额为评分依据。；官方当前页面中的排行榜呈现跨运行平均值；该描述涉及运行结果聚合，并未给出固定公开题集的行数、字段schema或train/dev/test拆分。 | 固定题集、运行数、记录字段及split：本轮官方页面只读到模拟任务及排行说明，未取得机器可读基准数据卡。 |
| 36 | WANDR (`wandr`) | 未发现已证实错误 | 论文v2正文称输出为500个public task packages，任务纵向表为多标签统计，标签计数允许总和超过500。；论文将每项任务描述为较大规模实体发现需求与逐记录深度核验的组合；代码/任务指标章节给出不同系统在计划500任务中的完成数。 | 论文500与当前固定commit目录条目数关系：论文说明500项public packages；本轮未逐项枚举仓库/Harbor注册表以验证当前目录与论文版完全同一任务集合。 |
| 37 | WebArena Verified (`webarena-verified`) | 未发现已证实错误 | 固定commit公开JSON顶层为任务对象数组；首个对象含sites、task_id、intent_template_id、start_urls、intent、intent_template、instantiation_dict、eval及revision字段。；示例eval包含evaluator、results_schema与expected对象；本条只说明所读文件样例的字段结构，不摘录任务题面或答案。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 38 | When2Call (`when2call`) | 建议补清 | 主任务完整遍历固定两个test JSONL：300/3652行；held_out_param分别存在100/1062行，属于可选字段。没有采信首行缺字段就认定不存在的误报。；NVIDIA公开HF卡标示CC-BY-4.0；卡片总体大小级别显示10K-100K。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 39 | AgentHarm (`agentharm`) | 未发现已证实错误 | 论文当前页面为 v3，末次修订 2025-04-18；v1 提交于 2024-10-11。；摘要称 110 项恶意 agent tasks，增强后 440 项，覆盖 11 个危害类别，并链接公开发布。 | dataProfile：本轮读取当前HF revision的六个配置/切分及各自行数与字段；这些viewer切分与论文增强总量的对应关系仍未核实。 |
| 40 | AlignBench (`alignbench`) | 未发现已证实错误 | 论文当前为 v4，摘要称八个主要类别、683 个真实场景查询和人工核验参考答案，并称评测代码、数据和模型生成可用。 | dataProfile：仓库当前 data_release 与 data_v1.1_release 文件各自计数/字段仍需按固定 revision 全量读取。 |
| 41 | Chatbot Arena (`arena`) | 未发现已证实错误 | 官方 Arena 页面标注 2023-05-04 发布、2025-08-02 更新。；初始结果基于 4.7K 投票数据；页面定义匿名随机众包对战和 Elo 排名。 | dataProfile：本轮未重新读取两份公开数据集卡，无法复核其实际行数和schema。 |
| 42 | Arena-Hard v2.0 (`arena-hard-v2`) | 未发现已证实错误 | 作者README于2025-04-23记录Arena-Hard-v2.0发布；称v2.0包含500个hard real-world user queries及250个Chatbot Arena来源的creative-writing queries。；README说明采用自动judge；另列官方模型配置，judge选择与版本结果展示分设。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 43 | EQ-Bench 4 (`eq-bench-4`) | 未发现已证实错误 | 官方 README 将 EQ-Bench 4 定义为与模拟用户 persona 进行多轮角色扮演对话，评估应用情感与社交智能。 | dataProfile：120 persona、8轮、数据字段与测试输出文件需读取README余下章节及test.json固定revision。 |
| 44 | IFBench (`ifbench`) | 建议补清 | 作者README将IFBench分为OOD Constraints和可选的两轮Multiturn Constraint Isolation；前者列58项新约束，后者将prompt与约束拆至两轮。；README另列IF-RLVR的29项训练约束，且说明测试JSONL随Python wheel提供；训练约束与OOD测试约束分别描述。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 45 | IFEval (`ifeval`) | 未发现已证实错误 | The author paper identifies IFEval as an instruction-following evaluation benchmark and describes verifiable instructions; it is the 2023-11-14 v1 paper view.；该固定文件含541条非空JSONL记录。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 46 | JailbreakBench (`jailbreakbench`) | 建议补清 | Paper page currently v5 (2024-10-31 revision); abstract describes an evolving repository of jailbreak artifacts, a dataset of 100 behaviors, framework, and leaderboard.；behaviors/harmful split的API报告num_rows_total=100。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 47 | MentalHealthBench (`mentalhealthbench`) | 未发现已证实错误 | OpenAI announcement dated 2026-09-23 calls MentalHealthBench an open benchmark developed with more than 80 licensed mental health experts for realistic mental-health conversations. | dataProfile：The announcement excerpt does not specify dataset size, split, fields, or row-level public access; paper/data source needs separate reading. |
| 48 | Multi-IF (`multi-if`) | 未发现已证实错误 | 论文v2称4,501段多语言会话，每段三轮，由英文提示扩到另7种语言。；HF当前viewer列4.5K train rows、8种语言和turn_1/2/3 prompt及instruction/kwargs字段。 | dataProfile：论文会话计数和HF当前行数是两种标注，需数据卡说明关联方式。 |
| 49 | StrongREJECT (`strongreject`) | 未发现已证实错误 | 作者README称包包含多个越狱评估器，并含来自六类有害行为的prompt数据集；README列出六类标签。；README区分基于rubric的LLM评估器与fine-tuned评估器；后者依赖访问受限的Gemma仓库。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 50 | Aider Polyglot (`aider-polyglot`) | 未发现已证实错误 | 作者页称题目来自 Exercism，覆盖 C++、Go、Java、JavaScript、Python、Rust 六种语言。；作者页称从六种语言的697道练习中选取最困难的225题。 | dataProfile.scale / files / fields：本轮只读作者介绍和仓库根 README/目录，未逐文件检查所列语言分项题数、练习文件结构和关联测试。 |
| 51 | Code Migration (`code-migration`) | 未发现已证实错误 | Vals页面更新时间显示2026-10-18，页面标注Version 1。；页面顶部明确Code Migration v1.0已被v1.1取代；v1.1运行Pi agent harness并修订测试套件，取代v1.0进入Vals Index v2.2的Coding sector。 | dataProfile.scale / splits / fields：需继续读取方法部分并确认所列任务数量及测试计数究竟对应当前v1.0、v1.1或此前网页快照。 |
| 52 | CursorBench 4.0 (`cursorbench-4`) | 未发现已证实错误 | Cursor页面将当前版本标为CursorBench 4.0，描述为基于真实Cursor sessions的含歧义多文件agent任务。；Changelog列出2026-09-10引入4.0，加入长时程任务，涉及编辑、重构、调查、意图理解、job管理与设计遵循。 | dataProfile.scale / splits / fields：官方页未公开总题数、划分及schema；网页成绩表不是任务集结构说明。 |
| 53 | CWE-bench v1 (`cwe-bench-v1`) | 未发现已证实错误 | 发布方文章日期为2026-09-28。；作者称v1包含120个held-out audit-and-patch任务，覆盖73种CWE、OWASP Top 10 2025十类及八种语言。 | dataProfile.fields / files：作者文章给出任务总量和覆盖范围，但本轮未读取具体任务文件与字段schema。 |
| 54 | CyberBench Patch v1.1 (`cyberbench-patch-v1-1`) | 未发现已证实错误 | Vals页面标记CyberBench Version 1.1，更新于2026-10-12。；页面说明v1.1取代v1：保留60-task PoC track，并公布56-task Patch roster；任务沙箱离线且grader采用hardened clean-room设置。 | dataProfile.files：页面只展示方法案例，未发布完整56项任务及隐藏holdout输入文件；完整文件字段无法从网页核验。 |
| 55 | CyberGym-E2E (`cybergym-e2e`) | 未发现已证实错误 | 本轮实际打开的是arXiv v2，日期2026-07-17。；论文称扩展基准目前有920个真实漏洞、139个开源项目；构建过程中先形成615项初始集合，之后持续扩展至920项。 | dataProfile.fields / files / version：inventory未固定到论文修订版或数据集仓库commit；本轮打开v2论文，不能据此证明早期版本文件结构相同。 |
| 56 | DeepSWE v1.1 (`deep-swe-v1-1`) | 未发现已证实错误 | 作者仓库称DeepSWE有113项任务，覆盖TypeScript、Go、Python、JavaScript、Rust，并使用隔离环境与程序verifier。；task.toml记仓库、base commit、语言、镜像和限制；instruction.md是agent可见任务指令；environment、tests、solution分别提供环境、verifier/held-out测试和参考解。 | dataProfile.scale / version：本轮未核实官网列出的91个仓库是否与当前main中的113任务集合保持一致，也未读取全部任务清单。 |
| 57 | FrontierCode 1.1 Main (`frontiercode-1-1-main`) | 未发现已证实错误 | Cognition发布FrontierCode 1.1并说明该版本修订了互联网使用、公平评分方法，审查1000余项评分标准并放宽75项。；作者明确后续报告Main与Extended子集的1.1方法结果，并不再报告Diamond子集。 | dataProfile.scale / fields / files：未在本轮来源中核实100/150题量，也未找到完整任务文件或统一schema。 |
| 58 | FrontierSWE v2 (`frontierswe-v2`) | 未发现已证实错误 | 发布方标注v2日期为2026-09-02，新增21项任务，总量达到34项。；v2评估方法以20小时为任务时间预算，并通过Proximus harness展示任务运行情况。 | dataProfile.scale / splits / fields / files：本轮文章未说明全量任务统一的五次重复协议、机器schema或下载包清单。 |
| 59 | HumanEval (`human-eval`) | 未发现已证实错误 | 主任务实际解析官方HumanEval.jsonl.gz：164条；全部含task_id、prompt、canonical_solution、test、entry_point。164道Python函数题的描述有依据。；论文称164道手写题；每题含函数签名、docstring、函数体及若干单测，平均每题7.7个测试。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 60 | τ^τ-bench (Hyper-τ) (`hyper-tau-bench`) | 未发现已证实错误 | README描述外层Developer根据政策文档、支持对话、录音、截图、流程图及REST API构建客服agent，之后以内层τ³-bench held-out客服任务评分。；README列4域，外层release共53项，分布6 airline_plus、6 retail_plus、6 telecom、35 banking_knowledge；称每个任务JSON是冻结可执行契约。 | dataProfile.fields / files：仅抽读一个task JSON，未枚举其他任务的可选字段及所有manifest/证据文件。；version：本轮使用可变main路径而非固定tag/commit，现有2026-09版本标记需与具体commit绑定。 |
| 61 | LiveCodeBench (`livecodebench`) | 未发现已证实错误 | 作者README列Code Generation、Code Execution、Test Output Prediction三种数据场景。；README列release_v1=400题（2023-05至2024-03）至v6=1055题（至2025-04），可通过release_version选择，默认release_latest。 | dataProfile.fields / files：未读取版本化记录或官方数据结构定义；未运行任意Python加载脚本。；version：条目未指定release，所读HF卡版本到v5而GitHub README有v6。；dataProfile.fields / files：当前HF API列出六个JSONL路径但未返回schema或版本-文件映射；未执行加载脚本，字段与每文件记录数仍待官方数据定义支持。 |
| 62 | LiveCodeBench Pro (`livecodebench-pro`) | 未发现已证实错误 | 主任务读完整论文的多处584上下文：引言、§2和§7.1明确截至2025-04-25的584总体口径。不能仅取§7.3的subset措辞推翻原说明。；引言称基准在2025-04-25之前包含584道高质量题目。 | dataProfile.scale / version：论文截至2025-04-25的584题规模明确；HF当前README六个时间窗split记录的重叠/去重映射及与论文快照的版本关系仍未核实。；dataAccess：本轮读取了HF README metadata，但未能读取Parquet底层内容；不能据此核实完整样本内容。 |
| 63 | Microsoft MAI Held-Out Code (`mai-held-out-code`) | 未发现已证实错误 | 官方文章日期为2026-10-15，介绍MAI-Base-2 held-out评测。；报告称Held-Out Code取自MAI自己的codebase，以bits-per-byte计分，并称评测集做了训练污染去除。 | dataProfile.scale / splits / fields / files：本轮所读官方报告只披露来源概述、指标和汇总图，没有样本数、split、schema或下载文件。；version：报告日期2026-10-15，未说明内部codebase题集版本或和历史MAI报告是否相同。 |
| 64 | MBPP (`mbpp`) | 未发现已证实错误 | Google Research README称约1000道crowd-sourced Python题，每题有任务说明、代码解答及3个自动测试；sanitized-mbpp.json为人工核验子集。；README按task_id指定1-10 few-shot、11-510 test、511-600 validation、601-974 train；sanitized子集继承这些分组。 | dataProfile.fields / files：本轮未打开作者实际JSONL和sanitized JSON文件核各格式key；HF viewer当前只展示full train部分。 |
| 65 | MirrorCode (`mirrorcode`) | 未发现已证实错误 | Epoch称完整基准有25个target program，22个公开、3个private；所述网页榜单配置为15个Medium/Large目标×两种语言=30项。；论文配置与leaderboard配置不同：论文用25目标及六种agent编程语言，榜单只取30项任务；公开任务资料和harness位于官方仓库。 | dataProfile.fields：本轮未检查各公开任务目录中的目标程序清单/JSON结构；私有目标无法从公开仓库核验。 |
| 66 | NL2Repo-Bench (`nl2repo-bench`) | 未发现已证实错误 | 作者论文描述从公开GitHub项目选取Python仓库并撰写项目规格，经过环境构建、验证和修订；本轮打开论文正文。；该论文是题量/规格字段/难度的第一方研究来源；具体数量需与所引当前论文版本和公开仓库文件修订关联。 | dataProfile.scale / fields / files：本轮虽读论文及仓库主页，但未复核精确任务清单和每种Project Description/Supports/API Usage Guide/Implementation Notes字段是否在当前发布文件中同名齐全。 |
| 67 | OpenAI 前端偏好评测 (`openai-internal-coding`) | 未发现已证实错误 | 报告介绍GPT-5前端工程能力评估和人工偏好比较；该内容为发布报告中的评估摘要。；当前官方页面未随本轮所读内容提供可下载任务集或逐题数据schema。 | dataProfile.scale / splits / fields / files：本轮未在官方报告正文发现公开任务数据或复现文件；具体样本规模、任务清单和偏好标注结构不明。 |
| 68 | PinchBench (`pinchbench`) | 未发现已证实错误 | Kilo 2026-05-11的v2发布文称版本2.0有148 tasks，并描述v1曾按23任务运行；两版基准任务数量不同。；官方代码仓库被描述为将PinchBench用于评估OpenClaw coding agents的benchmark system；本轮未固定task文件revision逐条比对。 | dataProfile.fields / files：本轮未打开固定SHA任务Markdown文件；任务提示、预期行为和自动检查字段需要在指定v2提交再核。 |
| 69 | ProgramBench (`programbench`) | 未发现已证实错误 | 本轮打开了Facebook Research项目文档页；可见来源为官方项目仓库docs/README。；本轮未进入公开HF测试集底层文件或README到具体字段段落。 | dataProfile.scale / fields / files：本轮未从页面可见部分核实200任务、248K测试数或test_results输出字段；HF viewer不可用。 |
| 70 | SciCode (`scicode`) | 未发现已证实错误 | HF页面标注SciCode，英文JSON格式，并链接arXiv 2407.13168；本轮读取其公开数据页。；本轮打开作者GitHub仓库首页；后续应以其problems_dev.jsonl/problems_test.jsonl具体文件核对源split与HF转换split的映射。 | dataProfile.splits / fields：本轮未打开具体dev/test JSONL或HF viewer/schema来确认源文件split与viewer validation标签是否对应，故保留待核。 |
| 71 | SciCode-Verified (`scicode-verified`) | 未发现已证实错误 | 官方HF页可见数据仓库名SciCode-Verified，文本生成任务、JSON格式、英语，许可标Apache-2.0，并引用arXiv 2608.04975及原论文2407.13168。；本轮没有打开具体JSONL行、manifest或HDF5测试目标。 | dataProfile.scale / splits / fields / files：公开页首页metadata不足以核实64主题、287子题、排除题、manifest与HDF5 target的版本关系；固定resolve文件本轮未读。 |
| 72 | SWE-Atlas-QnA (`swe-atlas-qna`) | 未发现已证实错误 | Scale称SWE-Atlas-QnA是针对真实代码库的代码理解问答子基准，并讨论仓库级问题及专家参考答案。；当前公开metadata API未返回datasetInfo/features/splits计数；文件清单可见数据文件入口。 | dataProfile.scale / fields / splits：本轮读取的发布文章及HF当前metadata不足以独立复核124行、11个仓库与完整rubric字段；此前inventory的rows响应不是本轮读取证据。 |
| 73 | SWE-bench (`swe-bench`) | 未发现已证实错误 | 论文报告SWE-bench包含2,294个软件工程任务，来自12个Python仓库。；schema包括repo、instance_id、base_commit、patch、test_patch、problem_statement、hints_text、created_at、version、FAIL_TO_PASS、PASS_TO_PASS、environment_setup_commit。 | dataProfile.splits对应的具体固定版本：本轮读取论文、指南及HF当前metadata；未定位inventory中“作者原始数据读取入口为test”所对应的版本化文件或测试集提交。 |
| 74 | SWE-bench Multilingual (`swe-bench-multilingual`) | 需修正 | 主任务实际读取固定Parquet metadata：test 300、15列；issue_id/issue_url/pr_url不在该schema。；SWE-bench官方页面称该基准覆盖42个仓库、9种语言，共300个任务。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 75 | SWE-bench Multimodal (`swe-bench-multimodal`) | 建议补清 | 主任务实际读取固定dev与test Parquet metadata：100和480；含image_assets。与指南test 500、论文617的差额保留未决。；论文报告617个多模态软件缺陷修复任务，涉及17个JavaScript库。 | 论文617、指南600、HF metadata 580之间的版本/范围关系：本轮来源没有给出能对齐论文总量、指南split数字与当前revision split数字的变更记录或过滤规则。 |
| 76 | SWE-bench Pro (`swe-bench-pro`) | 未发现已证实错误 | 论文介绍SWE-bench Pro，并将开源、私有数据分别纳入基准讨论；论文规模口径与公开HF子集口径不同。；本轮读取论文版本页面标识v2，不能据论文总量推断全部数据公开。 | 论文1,865与公开版本数字映射：本轮读取论文和README不足以确定论文总量、公开V1/V2条数之间的精确版本/可见性分解。 |
| 77 | SWE-bench Pro v2-Hard (`swe-bench-pro-v2-hard`) | 未发现已证实错误 | README将HARD-51描述为公开V2 hard子集，并在配置/数据集说明中分别列出default与hard口径。；HF metadata列出default、hard及旧版相关配置；hard配置schema含hard布尔字段和version字段。 | dataProfile.splits中的固定revision：本轮读到的是仓库当前README和当前metadata revision；inventory未声明所用数据文件的固定提交。 |
| 78 | SWE-bench Verified (`swe-bench-verified`) | 未发现已证实错误 | OpenAI说明Verified由SWE-bench原始test样本经过人工审阅筛选形成；文章报告先人工标注1,699项，再选出500项作为Verified。；1,699是筛选期间标注样本池数字；500是发布子集数字。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 79 | SWE-ContextBench (`swe-contextbench`) | 未发现已证实错误 | 论文v3报告1,100个基础任务和376个相关任务。；论文介绍任务基于SWE-bench问题构建，并以相关任务关系用于上下文评估。 | HF files与论文任务子集映射：本轮未逐个解析HF Parquet行数或数据构建脚本，不能解释viewer展示数与论文数量的映射。 |
| 80 | SWE-rebench (`swe-rebench`) | 未发现已证实错误 | 论文报告SWE-rebench V2包含32,079项任务、20种编程语言和3,617个仓库。；论文将静态发布的数据集与持续更新的评测流程分别说明。 | inventory未列出的嵌套字段：本轮metadata显示install_config和meta为嵌套结构；未读取数据行确认嵌套子字段的非空性与具体版本约束。 |
| 81 | TapTap Maker Benchmark (`taptap-maker`) | 未发现已证实错误 | TapTap Maker评测AI agent依据自然语言提示编写Lua游戏代码，并由UrhoX游戏引擎运行评估。；方法页说明多个任务类别和三个难度等级，并区分公开题榜与私有held-out题榜。 | edition版本、数量、schema：公开历史入口未定位到指定edition对应的机器可读数据文件；不可从方法页推定全体任务规模或字段。 |
| 82 | Vibe Code Bench 1–100 (`vibe-code-bench-1-100`) | 未发现已证实错误 | 官方页面介绍100条应用演进链、939条请求及11,299个浏览器工作流，其中7,552项新功能检查、3,747项回归检查。；页面将任务分为50个test场景和50个validation场景，榜单报告test子集；每项工作流最多10轮迭代。 | dataProfile.fields / files：本轮官方页面未公布完整机器可读schema或完整任务文件；不能从公开演示外推全数据格式。 |
| 83 | Vibe Code Bench v1.1 (`vibe-code-bench-v1-1`) | 未发现已证实错误 | Vals将v1.1描述为以自然语言产品规格构建可运行Web应用，并由浏览器工作流检验用户功能的基准。；官方页面公开Zeeter与Breathing Exercise演示，完整测试集标为专有数据。 | dataProfile.scale / splits / fields：官方页面与论文摘要未提供完整v1.1题集行数、split映射或字段schema。 |
| 84 | WeirdML v2 (`weirdml-v2`) | 未发现已证实错误 | 作者页将WeirdML v2定义为新颖机器学习任务上的代码编写评测，任务要求生成PyTorch训练代码并通过多轮提交改进。；作者结果摘要以17项任务平均；页面报告每run五次提交，提供前四轮反馈。 | dataProfile.scale中17任务的完整映射：作者页结果摘要使用17任务平均，但任务介绍另有早期与新增任务分组；本轮来源没有给出逐任务公开清单或固定v2全量清单。；taskContract.environment中的具体执行限制：作者页与Epoch登记页记录的运行时间/重复数口径不同，需按具体榜单结果确定，不能通用化。 |
| 85 | AA-LCR v1.1 (`aa-lcr`) | 建议补清 | 主任务解析固定CSV：100行、9列（含空表头索引）；题目CSV不是完整长文档材料。；数据卡显示 1 个 test split、100 行。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 86 | GDP.pdf (`gdp-pdf`) | 未发现已证实错误 | Surge describes GDP.pdf as a multimodal reasoning benchmark using real-world prompts and PDFs from professional workflows. | dataProfile：The task/data count and file schema are not in the opened page excerpt; HF data card was not opened this turn. |
| 87 | LoCoMo (`locomo`) | 建议补清 | Paper abstract describes conversations of 300 turns and 9K tokens on average, up to 35 sessions, and benchmark tasks for QA, event summarization, and multimodal dialogue generation.；固定revision的locomo10.json顶层数组含10个对象。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 88 | LongBench (`longbench`) | 未发现已证实错误 | Paper currently v2 (2024-06-19 revision); abstract says LongBench contains 21 datasets across 6 categories in English and Chinese, with average context lengths stated separately for each language. | dataProfile：Current repository/Hub v1 dataset counts and exact split/schema were not read this turn. |
| 89 | LongBench v2 (`longbench-v2`) | 未发现已证实错误 | 当前HF数据页标示Apache-2.0，显示单一train split、503 rows；viewer提示parquet row group大小超出其读取上限，故未展示记录。；数据卡称LongBench v2有503道多选题、六类任务、上下文长度约8k至2M words（多数低于128k）；加载说明使用THUDM/LongBench-v2的train split。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 90 | LongMemEval (`longmemeval`) | 建议补清 | Paper current v2 revised 2025-03-04; abstract states 500 curated questions embedded in scalable user-assistant chat histories and lists five memory abilities.；固定revision的longmemeval_oracle.json顶层数组含500条记录。 | dataProfile：本轮固定oracle文件提供500条记录及字段名；该文件与论文报告的其他评测版本/子集如何对应尚未核实。 |
| 91 | MemoryArena (`memoryarena`) | 建议补清 | HF card viewer currently exposes 5 subsets; shown bundled_shopping test split has 150 rows. Fields include id, questions, answers, category.；当前MemoryArena API列出bundled_shopping、progressive_search、group_travel_planner、formal_reasoning_math、formal_reasoning_phys五个config，并对应五个data.jsonl文件。 | dataProfile：本轮按当前HF revision读取五个公开data.jsonl文件，分别记录行数和字段；这些文件与论文报告766个任务的版本/范围关系未核实。 |
| 92 | MemoryBench (Meta) (`memorybench-meta`) | 未发现已证实错误 | Meta model card is a disclosure of the provider’s evaluations of Muse Wonder and records benchmark references in that model evaluation context. | dataProfile：The read model card does not give MemoryBench task records, task count, schema, split, or whether this is a full benchmark release. |
| 93 | MLCR-AA (`mlcr-aa`) | 未发现已证实错误 | Artificial Analysis页面把MLCR-AA标为Private Dataset，并称其测试Wisedocs发布的MLCR公开基准中的难长病历推理。；页面称合成病例约25,000至64,000 tokens；回答在长度限制内由三位LLM judge依据专家标注ground truth判定准确性和完整性。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 94 | MRCR（OpenAI 公开集） (`mrcr`) | 未发现已证实错误 | HF viewer当前列1个train split、约2.4K rows；字段含prompt、answer、n_needles、desired_msg_index、total_messages、n_chars、date_added。；viewer中n_needles范围为2至8。 | dataProfile：当前viewer单split名称不代表有独立标准train/test。 |
| 95 | MRCR v2（DeepMind） (`mrcr-v2`) | 未发现已证实错误 | README称Google DeepMind公开其内部MRCR任务版本，并提供生成其他任务版本的代码。；README描述输入由连续user-assistant轮次组成，最后要求复现某次assistant输出；每个query的回复彼此不同，输出前还需先输出特定随机字符串。 | dataProfile规模/字段：本轮已读取完整README和download.sh，二者说明任务、版本报告窗口、needle数、上下文长度分组及CSV命名；未读取CSV资源文件，因此文件级行数和字段未核。 |
| 96 | PersonaMem-v2 (`personamem-v2`) | 未发现已证实错误 | HF卡标示CC-BY-4.0、6个split；benchmark_multimodal展示约5K rows。；viewer含persona_id、chat history链接、user_query、correct_answer、incorrect_answers、preference、conversation_scenario及token计数字段。 | dataProfile：论文统计单位与HF当前特定split行数之间映射未在本轮核实。 |
| 97 | RULER (`ruler`) | 未发现已证实错误 | 作者论文按needle retrieval、variable tracking、aggregation与question answering组织任务类型。 | dataProfile：本轮未读取每个生成配置的题数、长度范围或split。 |
| 98 | AA Cyber Index (`aa-cyber-index`) | 未发现已证实错误 | AA Cyber Index方法页v1列CWE-Bench-AA、DeepsecBench-AA和CyberGym-E2E-AA三项，等权各1/3。；方法表称CWE-Bench-AA为120项held-out任务；DeepsecBench-AA为private evaluation，按专家核验golden set计分；CyberGym-E2E-AA为从920-instance CyberGym-E2E数据筛选的131项、每项目一项。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 99 | Artificial Analysis Intelligence Index (`aa-intelligence-index`) | 未发现已证实错误 | 当前方法页版本标题为Artificial Analysis Intelligence Index v4.3.2，称主指数包含10项评测，四组权重为Agents 30%、Coding 20%、Scientific Reasoning 20%、General 30%。；表格给各评测的题数/任务数、重复次数、指数权重、工具使用和Private属性；列示AA-Briefcase、GDPval-AA、AutomationBench-AA、Terminal-Bench 4.0、SciCode、AA-Omniscience、GDP.pdf、AA-LCR、HLE、CritPt。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 100 | Artificial Analysis Multilingual Index (`aa-multilingual-index`) | 未发现已证实错误 | 数据卡标示 CohereLabs 发布、parquet、Apache-2.0；viewer 显示 23 个 subset 示例、test 为 400 rows。；公开字段包括 sample_id、subject、question、option_a–d、answer、required_knowledge、reference、culture、region、country 等。 | dataProfile：AA 当前支持语言与 Global-MMLU-Lite 仓库所有语言/数据总量之间的对应关系需继续查 AA 方法当前正文。 |
| 101 | Artificial Analysis Coding Agent Index (`artificial-analysis-coding-agent-index`) | 未发现已证实错误 | Coding Agent Index v1.5为DeepSWE v1.1、Terminal-Bench 4.0、SWE-Atlas-QnA三项等权平均。；方法表列三项分别113、66、124个task，每项每task运行3次；分别采用program verifier、test suite、Scale AI Task Resolve Rate二元判分。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 102 | Artificial Analysis Speech-to-Speech Index (`artificial-analysis-speech-to-speech-index`) | 未发现已证实错误 | 当前方法列四个组成项且各占25%：Speech Reasoning、Agentic Performance (τ-Voice)、Arena Preference、Task Success Rate。；官方说明缺少任何一项有效结果的模型不会进入指数。 | dataProfile：本轮尚未逐版本定位当前方法中 v1/v2 的变更日期，需核当前记录所绑版本。 |
| 103 | Jev Decision Index · 公开复现榜0.3 (`jev-decision-index`) | 未发现已证实错误 | Current methodology file header calls Decision Index 0.4 a score from private parts only, with 60% same skills and 40% new domains, revised new-domain tasks, and 0.3.2 retained as an archive edition. | dataProfile：Exact component weights and task counts for archived 0.3 are not documented by current 0.4 excerpt. |
| 104 | LiveBench (`livebench`) | 未发现已证实错误 | 作者datasheet称LiveBench有六类（数学、推理、编程、数据分析、语言、指令遵循）；该文档说初次评估34个LLM并发布raw model outputs与judgments。；datasheet列总计960道问题；每个实例为英语问题、ground truth和metadata，并称许多任务的实例为从既有分布/集合抽样。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 105 | PSI / Personal Superintelligence Index (`personal-superintelligence-index`) | 需修正 | 主任务读Meta模型卡：internal限定composite；JobBench等成员有自己的公开资料，不能全称内部题集。未发现PSI权重或完整运行配置披露。；Meta model card称PSI是七项personal/knowledge-work evaluations构成的internal composite，列出Agents’ Last Exam、AutomationBench-AA、FocusBench、JobBench、GDP.pdf、VBT和DRACO。 | dataProfile：该来源未给PSI统一任务文件、完整独立题集行数或index权重公式。 |
| 106 | Vals Index (`vals-index`) | 未发现已证实错误 | 官方v2页面标为Proprietary、Version 2，显示更新时间2026-09-27；总览描述按Finance、Coding、Legal三行业GDP份额加权。；方法段明确索引由五项private和两项public benchmark构成，并列出Finance Agent v2、Excel Modeling Benchmark、Terminal-Bench 2.1、Vibe Code Bench、Code Migration、Legal Research Bench与HLAB。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 107 | AA-Omniscience (`aa-omniscience`) | 未发现已证实错误 | 主任务解析固定CSV：600行、6列，与正式6000题分开；CSV本身没有train列，HF发布标签的含义不能当作训练用途。；官方页定义为跨领域事实回忆与幻觉基准，奖励准确、惩罚错误猜测。 | dataProfile.splits：固定README及CSV支持这是600题公开子集，但原CSV字段不包含split标签；未确认inventory中的train是平台配置标签还是来源文件原字段。 |
| 108 | BRIGHT (`bright`) | 未发现已证实错误 | 作者站定义BRIGHT为需要密集推理的文本检索基准。；作者站称收集1,385条真实查询，来源包括StackExchange、LeetCode和数学竞赛，并与网页或数学定理标签等相关文档配对。 | dataProfile.splits / fields / files：作者站简介页未给出HF具体split、schema和文件清单；需读取论文/官方仓库或数据卡核定版本化结构。 |
| 109 | BullshitBench v2 (`bullshitbench-v2`) | 未发现已证实错误 | 官方仓库将项目定义为测量模型是否会质疑荒谬提示而非自信回答。；仓库有 data、docs、scripts、tests 等目录，并列出多个按版本区分的配置文件；本轮根页面没有展示 questions.v2.json 的实际内容。 | dataProfile.scale / fields / files：需要读取V2固定问题文件和manifest的实际内容；仓库根页不足以核对记录数和schema。 |
| 110 | C-Eval (`ceval`) | 未发现已证实错误 | 作者仓库README称C-Eval有13,948道选择题、52个学科及4个难度等级。；README新闻记录称完整test set于2025-07-27向社区发布。 | dataProfile.scale / splits / fields：本轮未读取固定版本HF数据卡及Parquet/CSV实际列；1,346条val数和每学科dev样例数未从当前打开的主源正文逐项核对。 |
| 111 | CMMLU (`cmmlu`) | 需修正 | 主任务完整遍历固定v1.0.1 ZIP内134个CSV：dev 335、test 11582；目录、表头和行数均直接核过。历史11528的来源/版本仍不推断。；作者仓库中文README称基准覆盖67个主题，评估中文语境下的知识与推理，并特别包含中国本地化知识。 | dataProfile.scale / version：论文/README中的11,528总量与固定revision v1.0.1 test文件实计11,582并另有335 dev的关系，尚未从发布说明中确认是版本、统计范围还是旧口径差异。；dataProfile.fields：只核验固定zip中67科目CSV共同表头；未发现subject_mapping文件但本轮并未穷举仓库历史版本或其他附加文件。 |
| 112 | FACTS Parametric (`facts-parametric`) | 未发现已证实错误 | Google DeepMind于2025-12-09介绍FACTS Benchmark Suite；Parametric测试模型不使用外部工具时的事实问答能力。；官方说明Parametric采用trivia-style事实问题，可由Wikipedia回答。 | dataProfile.fields / files：官方博文给出Parametric分集规模与任务性质，未列逐条字段schema或文件名；本轮未读取Kaggle公开文件。 |
| 113 | GPQA (`gpqa`) | 建议补清 | 主任务重新解析作者固定公开ZIP：Main 448×78、Diamond 198×78、Extended 546×78、Experts 60×11；核过ID集合，Diamond⊆Main⊆Extended。Experts无Question列。；作者论文称GPQA Main为448道多选题，Extended为546题，Diamond为198题。 | dataProfile.fields / files：本轮未读取作者仓库固定commit ZIP或实际CSV；Main/Extended/Diamond题量来自论文，当前78列及Experts文件细节未核。 |
| 114 | GPQA Diamond (`gpqa-diamond`) | 建议补清 | 主任务重新解析同一固定作者ZIP并核对198行、78列及与Main的包含关系；HF入口受控不代表作者另行发布的ZIP不存在。；作者论文列出GPQA Extended 546题、Main 448题、Diamond 198题。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 115 | Humanity’s Last Exam (`hle`) | 未发现已证实错误 | 论文称公开题集2500题、跨百余学科，含短答与多选；约14%含图像、约24%为选择题。；作者分别描述公开题集与private held-out题集。 | dataProfile.fields / files / splits：库存列出的字段及具体公开test布局不能从本轮打开的文件确认；HF文件要求受控访问，本轮未接受。；dataProfile.scale：论文未给private held-out的题量，本轮未找到相关规模资料。 |
| 116 | Microsoft MAI Held-Out QA (`mai-held-out-qa`) | 未发现已证实错误 | 官方文章日期为2026-10-15，介绍MAI-Base-2 held-out评测。；报告将QA列为held-out文本评估，以bits-per-byte计分；称QA由供应商委托制作，并对评估集做训练数据去污染。 | dataProfile.scale / splits / fields / files：官方报告未披露样本数、划分、schema或文件，未找到公开数据文件。 |
| 117 | MMLU (`mmlu`) | 未发现已证实错误 | 主任务独立读原论文全文：15908总量、val 1540、test 14079均是论文自述。当前HF all配置的test 14042/val 1531/dev 285为另一个发布口径；不以HF数反推论文写错。；作者论文定义MMLU为57个学科的多项选择题评测；本轮所读官方论文网页定位到其task description。 | dataProfile.scale / splits / fields / files：本轮没打开原始官方CSV或逐科文件目录，因此未复核15908总题量、各split条数、原始列头；不能以第三方合并格式代替。 |
| 118 | MMLU-Pro (`mmlu-pro`) | 未发现已证实错误 | metadata列default test=12032、validation=70，列question_id、question、options、answer、answer_index、cot_content、category、src。；作者README总结12,032道题；其中6810源自MMLU、5222为新增，14个学科。 | dataProfile.fields / version：当前main未固定提交；未确认官方论文v6和所用HF文件revision的逐题差异。 |
| 119 | MMMLU (`mmmlu`) | 未发现已证实错误 | OpenAI README声明其为MMLU test set的14种专业人工翻译，并给出14 locale及各locale的test/*.csv文件名映射。；README声明发布翻译和用于评测的代码；每个locale配置split为test。 | dataProfile.scale：viewer显示聚合default约197k行，不等于单locale的MMLU题目数量；本轮未查看14个locale各自行数。 |
| 120 | MTEB Code (`mteb-code`) | 未发现已证实错误 | MTEB官方API文档将benchmark定义为任务列表及benchmark元数据对象，并支持按名称读取benchmark；对象tasks字段由若干task组成。；该对象层级本身不定义一个统一数据集schema或固定样本数。 | dataProfile.scale / splits / fields / files：inventory未附MTEB(Code)精确任务名和仓库commit，因此不能在不固定任务集合时汇总唯一规模或schema。 |
| 121 | RWS M-GATE (`rws-mgate`) | 未发现已证实错误 | 本轮读取M-GATE作者论文网页，确认其研究对象是多语言语法判断、翻译准确性与效率评估。；论文提供多个task章节，语法与翻译是不同评估任务；其公开论文和实时测试材料是不同对象。 | dataProfile.scale / splits / fields：本轮未读取论文所述30种语言/每语100句的详细计数表、公开non-live示例文件或当前live页面；具体题集结构未核。 |
| 122 | SimpleQA (`simpleqa`) | 未发现已证实错误 | OpenAI论文将SimpleQA定义为用于评估模型简短事实问答准确性与校准性的基准。；论文报告4,326个问题。 | dataProfile.files版本：本轮读取的是官方CSV当前响应，未验证inventory记录的旧ETag与SHA-256是否对应当前字节。 |
| 123 | SimpleQA Verified (`simpleqa-verified`) | 未发现已证实错误 | 主任务解析固定simpleqa_verified.csv：1000行、8列，匹配原说明。；本轮打开Google发布的SimpleQA Verified官方HF数据页，页面关联arXiv 2509.07968并标为CSV格式英文QA数据。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 124 | Arena Vision (`arena-vision`) | 未发现已证实错误 | Vision Arena比较可对视觉输入推理的模型；页面类别含captioning、diagram、entity recognition、OCR，并显示动态票数和模型数。 | dataProfile：完整对话、图像和投票快照未核。 |
| 125 | BabyVision (`babyvision`) | 未发现已证实错误 | 作者论文v2于2026-07-07修订；摘要列388项、22子类、4大类，并提出BabyVision-Gen与自动评测工具。 | scale/splits：Gen与Mini当前数据卡规模和split未核。 |
| 126 | BenchCAD (`benchcad`) | 未发现已证实错误 | HF页列三个任务子集；QA单split约2.4k行，schema示例含stem、family、gt_code、composite_png、standard、qa、qa_level、qa_id。；HF数据卡列edit-bench、code_gen、QA三个配置；代码生成配置公开17,900个合成CadQuery样本，覆盖106个机械零件族。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 127 | Big Bench Audio (BBA) (`big-bench-audio`) | 未发现已证实错误 | HF页列Audio/Text、英语、train单split 1k行；字段audio/category/official_answer/id；标记MIT。 | dataProfile：音频记录与上游BBH问题数关系及许可范围未继续核。 |
| 128 | Chartography (`chartography`) | 未发现已证实错误 | 作者论文摘要称100项任务，专业图表配专业人士编写问题并经另三位专家核验；发布任务、图像、出处元数据和评测代码。 | splits：未直接读HF split，任务与图表素材数是否一一对应待核。 |
| 129 | ChartQAPro (`chartqapro`) | 未发现已证实错误 | 论文v2摘要报告1,341张来自157个不同来源的图表及1,948个问题；问题类型包括多选、对话式、假设性和不可回答问题。；HF当前default/test共1,948行、6列。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 130 | CharXiv (`charxiv`) | 未发现已证实错误 | 作者论文摘要称2,323张arXiv图表，设描述与推理两类问题，经过人工筛选整理及专家核验；图表数不等于问答数。；作者HF README称CharXiv有2,323张从arXiv预印本人工选取的图表；每图配4道描述题（3可回答、1不可回答）及1道推理题。 | 仓库图像文件目录计数；全量test样本的答案字段状态：HF当前validation/test公开Parquet合计2,323行；只检查test首行reasoning_a为空值，未遍历全量字段值，也未逐数作者GitHub仓库中的图片文件。 |
| 131 | Full-Duplex-Bench (`full-duplex-bench`) | 未发现已证实错误 | 作者论文当前v3(2025-08修订)测pause handling、backchannel、turn-taking、interruptions；自动指标；论文称公开benchmark和代码。 | version/scale：论文摘要未列v1、v1.5、v2、v3各版本音频和协议详情。 |
| 132 | LVBench (`lvbench`) | 未发现已证实错误 | 论文当前v3(2025-08修订)称基准使用公开来源视频，评估长视频理解和信息提取；论文说数据及代码公开，但摘要没有数量或六类能力细目。 | scale/splits：视频数量、QA数、仓库元数据和获取条件仍未读。 |
| 133 | MAEB (`maeb`) | 建议补清 | 论文摘要称 MAEB 有30项任务、覆盖100多种语言；MAEB+是包含98项任务的更广集合。；MTEB/Jina 官方说明列出 MIEB 的130项任务和 Multilingual、eng、lite三种基准；这与 MAEB 属不同项目。 | MAEB+任务集版本关系：本轮摘要可确认任务规模，未逐一读取 MAEB 与 MAEB+任务定义文件。 |
| 134 | MathVista (`mathvista`) | 未发现已证实错误 | 论文v3于2024-01-21修订，摘要报告6,141个例子，来自28个既有多模态数据集及IQTest、FunctionQA、PaperQA三个新建集合。；HF官方数据当前default配置共6,141行、12列；testmini有1,000行、test有5,141行。 | 全部test行答案字段状态及受限测试答案的发布政策：本轮仅检查HF first-rows的首行answer字段空值，不外推至全量test，不接受其他授权条款。 |
| 135 | MIEB-lite (`mieb-lite`) | 建议补清 | 作者README称 MIEB 在发布时有130项任务、8类任务，并提供 Multilingual、eng、lite三种基准。；该段未提供 lite 的51项清单。 | lite具体任务及各自样本数：本轮读到榜单任务总数，但未逐项打开 MTEB 任务注册表和上游数据集。 |
| 136 | MMMU (`mmmu`) | 未发现已证实错误 | 官方仓库列出 development 150、validation 900、test 10,500，共11,550条。；官方README当前说明 test answers and explanations 已发布，可通过 answer_dict_test.json 本地评估。 | 各学科具体行数和题型分布：读取了整库总量、schema和官方split总数，但本轮未逐个聚合30个学科配置或计算多选/开放题型占比。 |
| 137 | MMMU-Pro (`mmmu-pro`) | 需修正 | 主任务核对同一固定修订的3个配置，各test 1730；Standard与Vision使用不同schema。；作者论文描述 MMMU-Pro 通过过滤文本可答问题、扩展选项及增加 Vision-only 输入来构造鲁棒评测。 | MMMU-Pro题数、Standard/Vision-only行数及当前test split答案：本轮读取论文摘要和项目README导航，未直接读取 Pro 论文正文或 Pro 的 HF 数据卡/rows。 |
| 138 | OmniDocBench (`omnidocbench`) | 未发现已证实错误 | 作者README报告1,651个PDF页面，覆盖10类文档、5类版面、5种语言。；README报告28种block级和4种span级元素定位标注，并含页面/文本/表格属性标签及阅读顺序。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 139 | Pronunciation Robustness (`pronunciation-robustness`) | 未发现已证实错误 | 官方方法概览按四类发音挑战组织固定测试句。；方法说明多数样本至少由3名评审判断；完整句集未公开。 | 完整句数、评审协议和当前版本日期：本轮打开概览页，未核对文中链接的详细方法附录或版本记录。 |
| 140 | Roboflow Vision Evals (`roboflow-vision-evals`) | 未发现已证实错误 | Roboflow页面提供当前五类视觉任务：目标检测、计数、实体识别、OCR和视觉推理。；站点保留legacy分类并提供按任务查看结果的入口。 | 图像总数、每类样本数和标准答案下载：当前页面为在线榜单/演示，未在本轮打开公开数据包或行计数接口。 |
| 141 | ScreenSpot-Pro (`screenspot-pro`) | 建议补清 | 主任务读原论文摘要，确认23应用/5行业/3系统；完整解析固定26个公开标注JSON：1581条标注对象、10个字段的并集，未推称1581个去重独立任务。；作者论文摘要描述GUI定位评测，按应用软件界面元素定位模型能力。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 142 | Small Overlapping Speech Bench (`small-overlapping-speech-bench`) | 未发现已证实错误 | HF README declares CC-BY-4.0 and a default config with split=test.；README describes100段音频片段，每段3名同时讲话者、3种欧洲语言，单声道16 kHz MP3，约15–26秒；六种源语言为德、法、西、意、荷、葡。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 143 | Video-MME (`video-mme`) | 需修正 | 主任务实际读取官方README所链接分发的公开metadata：videomme/test=2700，11个真实字段。；官方数据介绍区分视频素材、字幕和问答标注：900段视频、744份字幕、2,700条QA，总时长254小时。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 144 | ZeroBench Main (`zerobench-main`) | 未发现已证实错误 | 已有本轮审计笔记记录数据卡v3于2025-12-23更新，主问题与部分子问题措辞有调整；此版本日期与论文首次公开时间不同。；已有审计记录标注HF API公开字段主split 100行、子问题split 334行；题面/答案共享存在作者数据卡限制，本轮不复述受限题目内容。 | 此次对话中的本轮直接复核范围：该数据卡证据来自同一2026-10-21审计内较早的实际读取与留存笔记；本轮后半段未重开URL。若批次要求严格按最后20项读取时间切分，标注sourceCoverage供父任务审定。 |
| 145 | AIME 2024 (`aime-2024`) | 未发现已证实错误 | MAA当前介绍称AIME为15题考试，按两个部分管理，每部分90分钟；这属于当前网页描述。；该页面解释AIME在AMC 10/12之后的邀请赛序列中。 | dataProfile.scale / splits / fields / files：本轮未找到并读取2024原卷或官方结构化 benchmark 数据包；当前MAA赛事页不能确定模型评测具体覆盖 AIME I、II 或两卷。 |
| 146 | AIME 2025 (`aime-2025`) | 未发现已证实错误 | MAA公告标注2024年12月13日发布并于2025年1月6日更新。；公告称2025年AIME I于2月6日举行，alternate AIME II于2月12日举行。 | dataProfile.scale / splits / fields / files：本轮读取的MAA一手公告只确认赛事安排，没有读取2025试卷、字段schema或具体模型评测协议。 |
| 147 | AIME 2026 (`aime-2026`) | 未发现已证实错误 | MAA发布2025-26 AIME资格分数公告；inventory将AIME I、II分别记为2026-02-05和2026-02-11。；所读公告是资格分数/日期消息，不是AI benchmark结构化题集说明。 | dataProfile.splits / fields / files：未读取2026 I/II原卷或结构化数据文件，也未确认模型评测是否使用两卷全部题目。 |
| 148 | ARC-AGI-2 (`arc-agi-2`) | 未发现已证实错误 | 官方仓库README称有1,000个公开training任务和120个公开evaluation任务；另有semi-private与fully-private各一套，均不在仓库。；任务首次作答时要求为该任务所有test输入生成正确output grid；每个test输入允许两次尝试。 | dataProfile.files：本轮打开仓库README和目录索引，未读取所列具体JSON文件；dataProfile中的单文件示例与字段细节仍需按固定commit核对。 |
| 149 | ARC-AGI-3 (`arc-agi-3`) | 未发现已证实错误 | 官方技术报告首页标注2026-04-22，并定义ARC-AGI-3为交互式、回合制环境基准，要求agent探索环境、推断目标并规划动作序列。；本轮只读取报告摘要和开头部分，未读取第5、6页环境规模统计或schema。 | dataProfile.scale / splits / fields / files：本轮尚未读取官方技术报告与版本化schema正文，现有关于环境数量及字段的描述未获得本轮来源事实支持。 |
| 150 | Chess Puzzles (`chess-puzzles`) | 未发现已证实错误 | Epoch页面称基准含100个新颖棋局，程序生成，每题只有一个最佳下一步。；页面称模型选择最佳下一步；局面由Epoch生成且不出现在其他来源，最佳着法由Stockfish判定。 | dataProfile.fields / files：本轮只读Epoch基准说明，没有读取具体棋局文件、数据schema或发布文件。 |
| 151 | CritPt (`critpt`) | 未发现已证实错误 | 作者仓库README称CritPt包括71个挑战、190个checkpoint，由50余名研究人员参与制作。；同一README称公开evaluation pipeline和challenge dataset，并区分一个example challenge及70个test challenges。 | dataProfile.fields / files：当前打开的README不列Parquet schema；需读取inventory所指固定版本数据文件才能逐字段核实。 |
| 152 | FrontierMath (`frontiermath`) | 未发现已证实错误 | Epoch的历史About页面仍描述350道原创数学题，Tier 4有50题。；该页面将题目描述为自然语言问题，答案为可封闭形式表达式；称题目为原创且未发表。 | dataProfile.splits / files：本轮未读取完整题集或verifier下载文件；当前只核到Epoch公开网页说明。 |
| 153 | FrontierMath v2 · Tier 4 (`frontiermath-v2-tier-4`) | 未发现已证实错误 | Epoch在2026-06-12发布v2修订，完整集合338题，其中Tiers 1-3为295题、Tier 4为43题。；公开题共12道：Tiers 1-3十题、Tier 4两题；其余private set，除特别说明外页面结果对应private set。 | dataProfile.fields / files：页面未给出全体题库的机器可读schema或完整verifier文件；仅描述答案函数接口及公开例题。 |
| 154 | FrontierMath v2 · Tiers 1–3 (`frontiermath-v2-tiers-1-3`) | 未发现已证实错误 | Epoch称v2完整集合338题；Tiers 1-3共295题，Tier 4共43题；公开12题中10题来自Tiers 1-3。；2026-06-12的v2修订纠正Tiers 1-3中的123题并移除5题。 | dataProfile.fields / files：本轮页面没有提供完整可下载机器可读题库或统一数据列schema。 |
| 155 | GraphWalks (`graphwalks`) | 未发现已证实错误 | OpenAI数据卡称GraphWalks让模型从有向边表及操作指令计算节点集合。；README schema表列prompt、answer、prompt_chars、problem_type；网页自动转换的viewer显示answer_nodes列，并有date_added字段。 | dataProfile.fields / files：本轮没有读取固定仓库提交下的底层Parquet列schema；网页README与viewer名称存在不同，需以版本化文件核定。 |
| 156 | GSM8K (`gsm8k`) | 建议补清 | 主任务读取公开HF metadata：main/socratic均train 7473、test 1319；约8.79K并非算错。；作者称约8.5K题，7.5K训练、1K测试；每行JSON含question和answer，答案用####标最终数值。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 157 | Microsoft MAI Held-Out Math (`mai-held-out-math`) | 未发现已证实错误 | 官方文章日期为2026-10-15，介绍MAI-Base-2 held-out评测。；报告列Held-Out Math并以BPB计分；称Math由供应商委托制作，并与训练数据做去污染处理。 | dataProfile.scale / splits / fields / files：官方报告只公开来源概述、BPB汇总和去污染说明，未披露数学题集结构或规模。；version：2026-10-15为报告时间，不等于内部数据集版本；是否沿用历史题集未说明。 |
| 158 | Microsoft MAI Held-Out STEM (`mai-held-out-stem`) | 未发现已证实错误 | 官方文章日期为2026-10-15，介绍MAI-Base-2 held-out评测。；报告列Held-Out STEM并以BPB计分；方法段称STEM评估由供应商委托制作并对评估集去污染。 | dataProfile.scale / splits / fields / files：官方报告公开评估指标和来源类型，但没有题集结构、数量、字段或文件。 |
| 159 | MATH-500 (`math-500`) | 未发现已证实错误 | OpenAI称从MATH test均匀随机选500道作为held-out评测；其余4500道MATH test题加入PRM800K训练集，故PRM项目使用非标准MATH train/test split。；README给math_splits/train.jsonl与test.jsonl路径，并提示需Git LFS取得这些文件。 | dataProfile.fields / version：本轮未固定HF revision或核两种发布的行ID对应关系；HF viewer列名不能直接替代PRM JSONL底层schema。 |
| 160 | ArXivLean (`matharena-arxivlean`) | 建议补清 | 主任务实际读取固定Parquet：46行、7列；answer列在46行均非空。未把formal_statement当成完整证明。；viewer显示train标签46行，字段problem_idx、problem、answer、formal_statement、source、title、authors。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 161 | ArXivMath (`matharena-arxivmath`) | 未发现已证实错误 | viewer显示train标签48行，列problem_idx、answer、problem、source、title、authors。；页面标注来源论文arXiv:2605.00674及Parquet格式。 | dataProfile.files / version：本轮读取当前viewer公开schema/行数，未固定commit并检查Parquet底层记录或六月快照具体tag。 |
| 162 | BrokenArXiv (`matharena-brokenarxiv`) | 未发现已证实错误 | viewer显示train标签54行，字段problem_idx、points、problem、original_problem、source、title、authors。；页面标注arXiv:2605.00674及Parquet格式。 | dataProfile.files / version：只读当前viewer schema和行数；未固定commit、遍历全部数据，故无法核验points在全体是否恒定或精确字段语义。 |
| 163 | Mystery Game Puzzles (`mystery-game-puzzles`) | 未发现已证实错误 | Epoch页面称基准含100个来自某款知名游戏变体的局面，要求选出唯一最佳下一步。；方法说明局面由随机对局前滚到中局并过滤到唯一最佳着；模型以文本状态输入、用工具提交动作、归一后与答案对比。 | dataProfile.splits / fields / files：官方有意不发布prompt、样例局面、轨迹及数据文件；本轮只核读方法页，无法从数据文件确认字段。 |
| 164 | MysteryMechanism (`mysterymechanism`) | 未发现已证实错误 | Vals页面标记Proprietary，更新日期2026-10-12；描述222个机制，覆盖生物、物理、化学、工程、生态及抽象动力学。；任务给匿名变量、物理边界、两条被动观测、持久shell，并允许d维机制2d+1次实验，最终提交可执行关系式。 | dataProfile.fields / files：专有题集未公开机器schema；本轮只读官方协议与公开例说明，没有读完整222机制文件。 |
| 165 | Riemann-bench (`riemann-bench`) | 未发现已证实错误 | 作者论文于2026-04-08提交、2026-06-23修订至v3；本轮读取其标题、日期和摘要入口。；Surge官方页面顶部并列显示2026-09-16与2026-03-24两日期，并称发布Riemann-bench数学评测；本页面公开benchmark链接/研究论文链接。 | dataProfile.scale / files：本轮未读论文正文统计、官网全部方法段或题集文件，不能据当前打开的摘要验证25题或公开案例数量。 |
| 166 | SimpleBench (`simplebench`) | 未发现已证实错误 | 官方主页把SimpleBench描述为多选文本benchmark，称完整集合超过200题，涵盖时空推理、社交智能和语言对抗鲁棒/陷阱题。；主页链接Public Dataset与代码仓库，当前主页还有模型成绩与评测设置信息。 | dataProfile.scale / fields：虽然作者公开主页称完整集>200、数据页提供public subset，本轮未核JSON的10条、字段key及其与全集的映射。 |
| 167 | AA-AnalystAgent (`aa-analyst-agent`) | 未发现已证实错误 | 80题、14个商业与科学领域；每题绑定来源表格和文档文件夹；题集与答案除示例外私有；每题独立运行5次，主指标为五次全部答对比例。 | dataProfile：未逐项核对公开示例与完整运行环境细节。 |
| 168 | AA-Briefcase v1.1 (`aa-briefcase`) | 未发现已证实错误 | 4个多周项目、91项任务、数千输入文件；交付物经rubric二元检查、分析质量和呈现质量评分；第五公开情境仅为示例且不计正式结果。 | dataProfile：未逐项读四个正式情境的任务文件。 |
| 169 | Agents’ Last Exam (`agents-last-exam`) | 未发现已证实错误 | 官方README列original v1与v1.1两个入口，仓库包含v1.1发布目录及任务目录。 | version/scale：未读取原论文和版本化任务清单，当前页面无法核对公开任务规模。 |
| 170 | APEX-Agents (`apex-agents`) | 未发现已证实错误 | 固定修订的数据卡把仓库配置列为 default，文件 tasks_and_rubrics.json 对应 train split。；数据卡报告480项任务，investment banking、law、management consulting各160项；33个world（10、12、11个）。 | gated task contents：本轮未接受数据访问条件；未读取tasks_and_rubrics.json、gold outputs或world资产，不能核定实际数据行字段和值。 |
| 171 | APEX-Agents 1.1 (`apex-agents-1-1`) | 未发现已证实错误 | 数据卡列240任务（三职业领域各80）、31个world、955项二元rubric及每任务专家gold；world含应用状态、文件、工具；数据以Harbor任务包分发。页面提示需接受条件查看数据内容。 | dataAccess：未接受条款或访问受控任务内容。 |
| 172 | AutomationBench (`automationbench`) | 未发现已证实错误 | 官方README称任务模拟六类业务流程，初始化业务环境，覆盖47种SaaS工具并检查终态。；当前README描述600个计分公开任务：六个业务领域各100题，环境涉及47个模拟SaaS工具。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 173 | AutomationBench-AA (`automationbench-aa`) | 未发现已证实错误 | AA称657任务、六个业务领域、模拟SaaS环境；主指标为目标完成比例且不得触发guardrail违规；与Zapier榜单完全完成率不同。 | version：页面未标固定AA任务快照版本。 |
| 174 | BioMysteryBench (`biomysterybench`) | 未发现已证实错误 | 官方卡列90题；v11(2026-07)删除9题、修改24题；字段包括id/question/answer_rubric/allowed_domains/human_solvable并关联匿名数据zip。内容访问需先接受条件。 | dataAccess：未访问受控内容，未核题面、答案或数据文件。 |
| 175 | Excel Modeling Benchmark (EMB) (`excel-emb`) | 需修正 | 主任务读到官网归档标记及v1/v1.1替代说明；同页支持103题、Public 1/Validation 51/Test 51。；Vals页面标记Archived Benchmark / Version 1，说明v1.0已被v1.1取代；页面更新时间2026-10-18，评测Excel金融建模。 | dataProfile：未读当前v1.1数据卡或任务文件。 |
| 176 | Finance Agent (`finance-agent`) | 建议补清 | 页面标记v2为Archived Benchmark，并称已被v2.1取代、不再用于新模型发布。 | scale/splits：未读取具体任务清单。 |
| 177 | FinanceBenchmark (`finbenchmark`) | 未发现已证实错误 | 官方方法称v2有73题、8领域；3次运行、温度0；每类留出3题，公开catalog是子集，榜单在完整私有集上运行；Harness 0.2.0，Task sets v2/v3。 | scale：仓库任务目录119题/17类未读清单。 |
| 178 | Finch (FinWorkBench) (`finch-finworkbench`) | 未发现已证实错误 | 当前论文v5(2026-04-15)：172个复合workflow、384任务、1710个电子表格约2700万单元格，另有PDF及其他工件；经专家流程构建。 | files：未读数据卡或工件清单。 |
| 179 | GDPval (`gdpval`) | 未发现已证实错误 | OpenAI称完整集1320任务、44职业、9行业，gold公开集220题；任务基于真实工作产品、带参考文件，交付物可为文档、slides、图表、表格、多媒体；首版为one-shot。；OpenAI公开HF当前train split为220行、12列。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 180 | GDPval-AA (`gdpval-aa`) | 未发现已证实错误 | 当前AA页面明确展示GDPval-AA v2.1：220题，44职业、9行业，输出多种文件交付物，Elo来自盲化pairwise。 | splits：未读HF发布行和train标签语义。 |
| 181 | GDPval-AA v2.1 (`gdpval-aa-v2-1`) | 未发现已证实错误 | AA v2.1以OpenAI开发的220任务测试44职业/9行业，模型产出文档、幻灯片、图表、电子表格等工作物；工具运行并进行盲pairwise比较。页面转述上游完整GDPval为1320任务。 | splits：AA具体样本拆分未在本次所读段落中说明。 |
| 182 | GeneBench-Pro (`genebench-pro`) | 未发现已证实错误 | OpenAI介绍页(2026-06-30)称129个计算生物问题，10领域、21子领域；每题给复杂数据、实验背景、目标estimand；公开10个代表案例；数据生成过程基于已知合成因果结构。 | sampleAccess：未读取10个案例文件与grader。 |
| 183 | Harvey Legal Agent Benchmark (LAB) (`harvey-lab`) | 未发现已证实错误 | Harvey于2026-05-06介绍开放首版：1200+任务、24执业领域、75000+专家rubric；任务含指令、client matter资料和需审阅的工作成果；首发不含排行榜。 | version：本次只核首发资料，未读取inventory所称当前main和lab-core 1.2文档。 |
| 184 | Harvey LAB-AA v1.1 (`harvey-lab-aa-v1-1`) | 未发现已证实错误 | AA v1.1使用Harvey提供的120个私有任务及v1.1.0数据；加入幻觉检查、三名LLM评审rubric；评分已变更，与v1.0不直接可比；AA复现不含Harvey专用工具/文档技能脚本。 | taskContract：未读完整方法页中的输入文件类型和运行工具配置。 |
| 185 | HealthBench (`healthbench`) | 未发现已证实错误 | 母集5000段多轮健康对话、48562唯一医生编写rubric、7主题；合成生成与真人对抗测试共同构造；262名医生来自60国，覆盖49种语言、26个医学专科。；固定修订的公开文件名为consensus_2025-05-09-20-00-46.jsonl，本次逐行计数得到3,671条JSONL记录。 | splits：未读取公开原始数据以核验Hard/Consensus实际行数。 |
| 186 | HealthBench Hard (`healthbench-hard`) | 未发现已证实错误 | 作者论文将Hard称作HealthBench变体；母集为5000对话、48562唯一rubric、自由回答，不是选择题。摘要没有给Hard样本数。；固定修订的公开文件名为hard_2025-05-08-21-00-10.jsonl，本次逐行计数得到1,000条JSONL记录。 | files：本轮已核1000条；未对其完整JSON schema和逐条内容作复现验证。 |
| 187 | HealthBench Professional (`healthbench-professional`) | 未发现已证实错误 | 论文称525个任务由15079候选筛选；care consult、writing/documentation、medical research三类；约三分之一red teaming；真实医生使用ChatGPT for Clinicians的对话，三名以上医生写作/裁定rubric；任务可单轮或多轮。 | splits：未从论文确认私有留出集数量。 |
| 188 | JobBench (`jobbench`) | 未发现已证实错误 | Meta卡将JobBench列入PSI内部七项工作评测之一；该段不披露JobBench数据规模或拆分。；作者数据卡描述约35种职业；main split为65项完整任务，easy split为63项简化任务。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 189 | LABBench2 (`labbench2`) | 未发现已证实错误 | 论文v2(2026-05-05)称近1900项科学研究任务，为LAB-Bench更真实的延续；论文链接公开HF数据和评测harness。 | schema/version：未读当前HF卡和公开任务文件，后续数据修改未核。 |
| 190 | Legal Research Bench (Vals AI) (`legal-research-vals`) | 未发现已证实错误 | 官方称413个专家编写且同行评审问题：5公开、200可许可验证、208私有测试；结果只按私有test报告。拆分保留题型、执业领域和难度分布。 | sample：未打开5道公开样题原文件/schema。 |
| 191 | LegalBench (`legalbench`) | 建议补清 | 作者摘要称162项任务覆盖六类法律推理，由跨学科协作收集，任务由法律专家手工构造。 | contributors/license：摘要未确认贡献者人数及源任务许可，需读官方仓库或论文正文。 |
| 192 | LifeSciBench (`lifescibench`) | 未发现已证实错误 | 750个专家撰写任务，7 workflows/7生物领域；1062附件、173位科学贡献者、19020 rubric criteria、453位专家审阅；每题科学prompt、上下文/附件及自由回答，53%需至少一项附件。 | access：未读取数据包和数据许可。 |
| 193 | MedCode (`medcode`) | 未发现已证实错误 | 页面将 MedCode 描述为医疗诊断编码支持评测；其数据规模表述为2,755个诊断编码。；本页语境为编码项，不等于患者或病历条数。 | 2,755条目的内部字段和split：已打开官方方法页，未发现可公开读取的样例schema或数据卡。 |
| 194 | MedScribe (`medscribe`) | 未发现已证实错误 | 官方页描述面向临床医疗文档生成/质量评估。；页面分别提到100份专家rubric与80段用于真实性研究的对话；两项是不同单位。 | 100份rubric与完整评分任务的映射：页面未在本轮实际读取的内容中给出公开完整数据表与逐项schema。 |
| 195 | OfficeQA Pro (`officeqa-pro`) | 未发现已证实错误 | Databricks README列三套：OfficeQA Pro 133题、OfficeQA Full 246题、OfficeQA Pro V2 90题。；Pro每题标为hard；Full是Pro的严格超集，含133 hard和113 easy。 | 共享697期公报的准确文件计数口径：README提到697份文档，但未检查gated corpus清单。 |
| 196 | PLawBench (`plawbench`) | 未发现已证实错误 | 论文摘要描述850道法律实务问题、13种场景及约12,500项rubric检查点。；摘要将问题归入法律咨询、案件分析与法律文书等专业任务。 | 题目公开数量、标注schema与版本修订：本轮直接读取论文摘要，未读取项目README、数据卡或数据文件。 |
| 197 | PRBench (`prbench`) | 未发现已证实错误 | 项目页发布日期为2025-11-13。；页面报告1,100项专家撰写任务、19,356项专家策展criteria、182名专业贡献者；任务覆盖114个国家及美国47个司法辖区。 | 已读范围内未另列未决字段；不表示逐题内容、复现运行或全部上游许可已验证。 |
| 198 | PRBench Finance (`prbench-finance`) | 未发现已证实错误 | Scale Labs官方页说明PRBench含金融与法律两个高风险专业推理领域，共1,100项专家撰写任务与19,356项专家策展criteria。；任务来源于182名具备JD、CFA或至少6年经验的专业人士的实际客户工作。 | Finance 600、Hard 300和字段数：官方项目页没有按域分拆计数；本轮未读取Finance HF数据卡或任务schema。 |
| 199 | PRBench Legal (`prbench-legal`) | 未发现已证实错误 | Scale Labs官方页说明PRBench含金融与法律两个高风险专业推理领域，共1,100项专家撰写任务与19,356项专家策展criteria。；任务由182名具备JD、CFA或至少6年经验的专业人士根据真实客户工作贡献。 | Legal 500、Hard 250及criteria字段/数量：官方项目页未披露分域计数；本轮未读取Legal HF卡片或schema。 |
| 200 | SpreadsheetBench 2 (`spreadsheetbench-v2`) | 未发现已证实错误 | 官方README描述端到端业务电子表格工作流，要求跨表推理并交付结构化模型、修复表格或可视化。；四类目录为Debugging、Financial_Model、Template、Visualization；每类应有dataset.json及spreadsheet文件。 | 321任务的逐类计数、工作簿平均sheet数和待改单元格数：本轮读取官方README结构段，未打开论文HTML及dataset.json计数文件。 |
| 201 | τ³-Banking (`tau3-banking`) | 未发现已证实错误 | 页面将τ³-Banking描述为τ-Knowledge框架中的金融科技客户支持评测，要求在非结构化知识库中检索政策并执行多步工具调用。；银行语料约700份相互关联政策文件、约195K tokens、21个产品类别。 | 数据文件schema、样本可访问方式及评分版本修订：本轮读取AA方法介绍，未读取官方GitHub任务文件或论文版本变更记录。 |
| 202 | Tax Agent Bench (`tax-agent-bench`) | 未发现已证实错误 | Vals官方页面标注Tax Agent Bench为Proprietary，页面更新时间为2026-10-19。；页面称其评估研究级美国企业税务问题的智能体；该页同时呈现模型榜单。 | 391题及公开样本/许可验证/私有测试三分划分：本轮实际读取的官方页面概览标记为proprietary，未打开题集文件或公开方法附件确认库存描述。 |
| 203 | Terminal-Bench-Science 0.1 (`terminal-bench-science-0-1`) | 未发现已证实错误 | 官方发布页称首版0.1有70项任务，覆盖生命、物理、地球、数学和工程科学。；任务由科学研究实践工作流构成；科学家通过公开流程贡献，经领域、技术及质量把关。 | 任务目录中每项交付物及来源作者/文件schema：本轮读取官方发布页任务说明，未逐项读取GitHub release中70个任务文件。 |
| 204 | Arena Creative Writing (`arena-creative-writing`) | 未发现已证实错误 | 实时榜将Creative Writing列为Text Arena类别，页面显示动态投票数、模型数和排名；它不是固定题集快照。 | scale：类别筛选后的提示与完整投票集合未读取。 |
| 205 | Arena WebDev (`arena-webdev`) | 未发现已证实错误 | 用户提交请求，两模型生成交互式web应用，用户体验后投票并形成实时榜；使用pairwise比较和Bradley-Terry。文章发布2025-03-10、更新2025-06-13。 | dataAccess：完整当前提示和投票数据开放状态未由此文确定。 |
| 206 | Creative Writing v3 (`creative-writing-v3`) | 未发现已证实错误 | 官方仓库页面列data/results目录、历史运行包和实现入口；本轮未读取提示JSON或README正文。；作者README说明v3包含32个不同写作提示，每个提示生成3次，总计96项生成内容。 | scale/version：提示数、生成次数、裁判数据与冻结榜单版本需固定commit和原始提示文件核。 |
| 207 | Design Arena (`design-arena`) | 未发现已证实错误 | 官方方法称用户输入prompt并选类别、随机抽4个模型；最多五场pairwise比较，每场一票进入胜率与Bradley-Terry；Builder走单次比较。 | dataAccess：未核完整投票数据库、媒体提示与输出的开放状态。 |
| 208 | Longform Writing (`longform-writing`) | 未发现已证实错误 | README描述规划、人物资料和8章故事（约每章1000词）；共13生成步骤；榜单使用Claude Sonnet 4作裁判，逐章及全文评分。 | version：未读v1.11发布日期和提示模板，未核2026-02修订细节。 |
| 209 | NC Bench (`nc-bench`) | 未发现已证实错误 | Novelcrafter说明NC Bench包含 Creative Writing、Instruction Following、Utility、Tooling、Language类别。；测试重点包括文本编辑/生成/摘要/翻译，不以完整故事生成作为主要测试目标。 | 完整测试条目数量和数据下载范围：About页未给出全站项目总数；本轮未读取 Tests各页或导出文件。 |
| 210 | OpenVibeEval (`openvibeeval`) | 未发现已证实错误 | 方法页面说明榜单由真实提示、生成结果和成对偏好评价组成，按模型/提示/日期等记录运行。；项目持续更新，展示记录属于具体评测运行，不是稳定的固定原始题集规模。 | 截至发布日期的固定提示/比较数量：站点持续变化，方法页未列版本锁定的发布总数；本轮未导出历史快照。 |
| 211 | Rapidata SVG Generation (`rapidata-svg`) | 未发现已证实错误 | HF发布数据为train split；单项包含SVG生成比较相关内容，静态数据集和持续更新的live榜单是不同对象。；公开字段包含SVG代码、渲染图和偏好比较信息。 | 当前HF行数和精确字段schema：本轮读取数据卡摘要，未加载Dataset Viewer样本行或统计API。 |
| 212 | Lech Mazur Short-Story (`short-story`) | 未发现已证实错误 | 作者仓库说明短篇写作榜按相同提示下故事的成对比较汇总。；仓库包含提示/故事记录、评分数据以及历史存档，当前参赛模型与裁判会随更新变化。 | 当前提示数、故事数、评分总数和裁判版本覆盖：本轮未读取数据文件行数或历史归档清单，动态当前记录数不可直接视为首发规模。 |
| 213 | svgbench.ai (`svgbench`) | 未发现已证实错误 | 页面在本次访问时显示376个模型、27个prompt、8,125次生成和13,373票；这些是页面当前动态计数。；方法说明同prompt、同system prompt和固定画布假设下进行盲测，两张SVG渲染图配对供用户投票。 | 基准首发时任务数及可下载任务/投票文件：页面未提供固定发布日期快照或导出文件，本次计数属于动态页面。 |
| 214 | ToneBench (`tonebench`) | 未发现已证实错误 | 方法页标注更新于2026-10-20，并说明其指标基于当时榜单构建数据。；当前方法摘要列135个模型配置、10个参考脚本、每脚本5次草稿、共6,750草稿，每篇由4位裁判评分，累计27,000次判断。 | 9维rubric逐项内容及全部10份原始参考脚本：本轮仅读取方法页概览，未逐条展开评分项、裁判章节或脚本附件。 |
| 215 | TubeLab Scriptwriting Benchmark (`tubelab`) | 未发现已证实错误 | 页面标注2026年9月更新，称比较不同AI模型的YouTube脚本写作质量。；榜单说明对12项任务评分；脚本围绕真实视频制作，涉及六项写作能力及与原视频的独立匹配度。 | 12项任务的完整任务描述、rubric权重及公开完整输出：已打开官方基准页正文，但未逐一访问所有脚本任务和方法FAQ。 |

## 对照项的来源索引

主表优先给出问题、原来和建议改后。这里集中列定位入口，便于后续应用建议时复核固定版本。

- **PSI / Personal Superintelligence Index**：[一手来源1](https://research.meta.ai/static/muse-wonder-model-card)；[一手来源2](https://job-bench.github.io/)。
- **Video-MME**：[一手来源1](https://github.com/MME-Benchmarks/Video-MME)；[一手来源2](https://huggingface.co/datasets/lmms-lab/Video-MME)；[一手来源3](https://huggingface.co/api/datasets/lmms-lab/Video-MME)。
- **GPQA**：[一手来源1](https://github.com/idavidrein/gpqa/blob/56686c06f5e19865c153de0fdb11be3890014df7/dataset.zip)；[一手来源2](https://huggingface.co/api/datasets/Idavidrein/gpqa)。
- **GPQA Diamond**：[一手来源1](https://github.com/idavidrein/gpqa#dataset-download)；[一手来源2](https://huggingface.co/datasets/Idavidrein/gpqa)。
- **CMMLU**：[一手来源1](https://huggingface.co/datasets/haonan-li/cmmlu/resolve/efcc940752ea4a1ea94d2727f11f83858d64fc8e/cmmlu_v1_0_1.zip)。
- **MMMU-Pro**：[一手来源1](https://huggingface.co/datasets/MMMU/MMMU_Pro/resolve/0d7426df4ccb3d8704a992fe6850abee7c262127/README.md)；[一手来源2](https://huggingface.co/api/datasets/MMMU/MMMU_Pro)。
- **Excel Modeling Benchmark (EMB)**：[一手来源1](https://www.vals.ai/benchmarks/emb)。
- **SWE-bench Multilingual**：[一手来源1](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual/resolve/846e647b9f33c0b51b739d005d13d85493c9af09/data/test-00000-of-00001.parquet)。
- **AA-LCR v1.1**：[一手来源1](https://huggingface.co/datasets/ArtificialAnalysis/AA-LCR/resolve/9a77ef56b717057ade24ceab4d273712a0b4f19e/AA-LCR_Dataset.csv)。
- **IFBench**：[一手来源1](https://huggingface.co/api/datasets/allenai/IFBench_test)；[一手来源2](https://raw.githubusercontent.com/allenai/IFBench/main/README.md)。
- **GSM8K**：[一手来源1](https://huggingface.co/api/datasets/openai/gsm8k)；[一手来源2](https://huggingface.co/datasets/openai/gsm8k/resolve/740312add88f781978c0658806c59bc2815b9866/README.md)。
- **ArXivLean**：[一手来源1](https://huggingface.co/datasets/MathArena/arxivlean-0626/resolve/1ced46a1d45d57c6de242d51c0baf574b96022ea/data/train-00000-of-00001.parquet)。
- **SWE-bench Multimodal**：[一手来源1](https://arxiv.org/abs/2410.03859)；[一手来源2](https://www.swebench.com/SWE-bench/guides/datasets/)；[一手来源3](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multimodal/resolve/4e6662d51c48e475f7f346e4fa09a6f8b31fcaa5/data/test-00000-of-00001.parquet)。
- **Finance Agent**：[一手来源1](https://www.vals.ai/benchmarks/fabv2)。
- **JailbreakBench**：[一手来源1](https://huggingface.co/datasets/JailbreakBench/JBB-Behaviors)；[一手来源2](https://datasets-server.huggingface.co/rows?dataset=JailbreakBench%2FJBB-Behaviors&config=behaviors&split=harmful&offset=0&length=1)；[一手来源3](https://datasets-server.huggingface.co/rows?dataset=JailbreakBench%2FJBB-Behaviors&config=judge_comparison&split=test&offset=0&length=1)。
- **MAEB**：[一手来源1](https://huggingface.co/datasets/mteb/birdclef25-mini)。
- **MIEB-lite**：[一手来源1](https://datasets-server.huggingface.co/rows?dataset=mteb%2Fresisc45&config=default&split=test&offset=0&length=1)。
- **LegalBench**：[一手来源1](https://datasets-server.huggingface.co/rows?dataset=nguha%2Flegalbench&config=hearsay&split=test&offset=0&length=1)。
- **ToolRet**：[一手来源1](https://huggingface.co/api/datasets/hugFu/ToolRet-Queries)；[一手来源2](https://arxiv.org/html/2503.01763)。
- **MemoryArena**：[一手来源1](https://huggingface.co/datasets/ZexueHe/memoryarena/tree/da1a37c8b19280e18627ca01cf368195a5e1d92e)；[一手来源2](https://arxiv.org/abs/2602.16313)。
- **LongMemEval**：[一手来源1](https://huggingface.co/datasets/xiaowu0162/longmemeval-cleaned/resolve/98d7416c24c778c2fee6e6f3006e7a073259d48f/longmemeval_oracle.json)。
- **LoCoMo**：[一手来源1](https://raw.githubusercontent.com/snap-research/locomo/3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376/data/locomo10.json)；[一手来源2](https://arxiv.org/abs/2402.17753)。
- **When2Call**：[一手来源1](https://huggingface.co/datasets/nvidia/When2Call/resolve/ca9b4b48225b8236ed7a3d3bc0b78986c19991d7/test/when2call_test_llm_judge.jsonl)；[一手来源2](https://huggingface.co/datasets/nvidia/When2Call/resolve/ca9b4b48225b8236ed7a3d3bc0b78986c19991d7/test/when2call_test_mcq.jsonl)。
- **ScreenSpot-Pro**：[一手来源1](https://arxiv.org/abs/2504.07981)；[一手来源2](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro/tree/210e78d3844251110bff86c95835ebd37a6930fa/annotations)。

## 本轮操作范围与保留检查

- 基线为Git提交76c69e6a0b7c8d4f246727565654feba1f3d5421及开始时215份完整JSON快照；包含GPQA、GPQA Diamond、Video-MME、PSI四项已有未提交补充。
- 一手材料按74项技术、71项交互/上下文/安全、70项多模态/工作/写作分组读取；GPT-6 LUNA只描述来源，修改建议由主任务审定。主任务对可疑差异重新读固定文件/metadata，撤回首行推schema、单个段落推总量等误报。
- 主任务取得76个HF公开metadata端点中的74个；两个401（surgeai/chartography与surgeai/GDP.pdf）只作为此次访问状态，不当作官方从未公开的证明。没有申请或接受任何新的gated访问条件。
- 实际文件只提取计数、列名、集合包含关系或字段出现次数；未向报告添加题面、答案、健康对话、专家个人信息、图片或音频。既有原始案例保持。
- 本轮仅新增本地研究文档及忽略目录的审计材料、更新UPDATE_LOG.md；没有应用正式JSON建议，没有提交推送或部署，没有启动服务，没有调用网页端GPT。
- 这是内容事实核查；本轮无TypeScript/功能代码变更，不以运行构建或页面测试替代内容准确性检查。最终哈希与差异检查结果见同目录integrity-check.json。
