# 更新说明

## 2026-10-20 — 简介修订授权提交与发布检查

- 授权与原因：用户确认本轮简介修改，要求提交推送GitHub、等待自动部署并检查线上；按真实字段差异暂存，不混入README、推广和技能等无关文件。保持最简修改与真实数据原则，不启动开发服务，不使用网页端GPT评审。
- 提交文件：196份`content/benchmarks/*.json`、简介问题/原来/改后对照文档及本日志；Roboflow同步当前五任务协议的关联说明，PSI更正作者自有定义的来源角色。具体196项及修改位置列于对照文档。
- JobBench关联修正：其作者归属、公开状态和前轮已核实的两条原始案例不可拆开，否则简介会与内部标签矛盾；本次一并提交`jobbench.json`的既有完整修正、`content/brands.json`唯一新增JobBench项、`content/assets/logos/jobbench.svg`官网原标识与`content/assets/licenses/jobbench-data-card.txt`数据卡原文。首发日为2026-05-25，Meta引用日单独说明，未生成或改写原始案例。
- 保留范围：GPQA/GPQA Diamond数据访问补核、Video-MME样例入口、PSI相关条目关联仍留本地。除JobBench已有补充随关联修正纳入外，其余214项原始案例与上一提交一致；所有215项与本轮简介核查开始时的案例快照一致。UI与部署配置不改。
- 发布前验证：准确暂存文件树在独立候选目录复用现有依赖完成内容生成/校验（215项、575条案例、19份报告）、严格TypeScript、46项测试及Pages路径生产构建，220个静态页和404通过；215份详情的430处副标题/摘要与审定内容匹配。201份暂存文件及工作区保留项的哈希已核对，git diff --check通过。
- 后续验收：推送后等待该提交对应Actions完成，再检查实际线上正文、资源、桌面和手机显示，完成结果追加本地日志。

## 2026-10-20 — 简介问题与修改前后对照展示

- 原因：用户需要直接看哪里有问题、原文及改后文字，而不是来源依据列表；使用真实修改快照生成对照，不把措辞优化标成事实错误。
- 修改文件：`docs/research/2026-10-20-benchmark-introduction-audit.md`改为全部196项的逐项问题与前后原文对照，包含364处用户可见文字变化，并列19项保留情况；不展示引用或更新时间变动。
- 影响与保留：只改变审阅文档展示。原依据版备份为本地`artifacts/research/2026-10-20-benchmark-introductions/introduction-evidence-report.md`；全部215份benchmark JSON未再次改动，原案例、媒体及正式样式不变。
- 验证：196项各有独立问题说明，所有对照行直接取自修改前快照和当前文件，逐项确认确有差异；215份资料文件哈希不变。更新说明随本次文档调整记录，无提交推送或服务启动。

## 2026-10-20 — 全目录简介与整体任务定义核查

- 原因与授权：用户暂停排版及逐题数据整理，要求核查每个benchmark的简介/abstract，避免从单个案例推断整体定义。遵循最简修改、事实可追溯、任务范围和版本边界明确的原则。
- 核查方法：215项逐一对照作者论文摘要/任务定义、官方README、数据卡或评测方法；GPT-6 LUNA仅提取和描述事实，由主任务判断。未通过来源匹配复核的初稿弃用，补读具名定义；来源打不开与官方未公开分别记录，不编造协议或样例。
- 修改文件：196份`content/benchmarks/*.json`，逐份文件、来源及原因详见[完整核查表](docs/research/2026-10-20-benchmark-introduction-audit.md)。更新155条摘要、194条副标题、4条任务说明、49项定义引用、38项来源列表及196项updatedAt；17项准确内容保留，AIME 2024及Arena-Hard v2两项记录对应年份/版本资料限度。
- 主要内容影响：简介先说明测什么，再交代整体任务与评价方式；区分多任务基准/子集/实施/版本/偏好榜/复合指数。HumanEval保留原论文Python函数与功能正确性范围；ArXivLean明确以预先形式化命题进行证明；MentalHealthBench明确合成对话；MMMU不再限定为选择题；MAI四项保持内部预训练留出文本/BPB边界；历史Speech-to-Speech v1.0不套用当前四组件。
- 必要一致性修正：`roboflow-vision-evals.json`按官方当前五任务协议，将结构化提取归入OCR，同步version、taskContract、dataProfile说明/规模、metric和interpretation的相关文字；`personal-superintelligence-index.json`把Meta作者自有PSI具名定义的来源角色更正为definition。未改这些条目的原始样例、媒体或发布日期。
- 文档与本地材料：新增`docs/research/2026-10-20-benchmark-introduction-audit.md`记录215项判断、修改范围和限度；`artifacts/research/2026-10-20-benchmark-introductions/`保存开始快照、原文件、样例哈希、事实材料、主任务审定清单及检查日志，属于本地工作材料。
- 验证：内容校验215项/575条案例/19份报告通过；生成和严格TypeScript通过；46项测试全通过；SSG构建并核验220页与404；215详情页430处副标题/摘要文本与资料一致。215项sampleSet哈希不变，非目标原文件无意外修改，原始资源、UI/品牌/发布日期/verifiedAt和前序未提交内容保留。默认Prettier的215项不符合项在开始快照中已全部存在，本轮未新增；未做无关格式重排。git diff --check通过。
- 交付边界：本轮只完成本地资料与文档更新，无开发/预览服务启动，无网页端GPT评审，无提交、推送或部署。

## 2026-10-20 — 紧凑目录正式采用与浮现动效保留

- 原因与授权：用户确认上一轮交互预览，授权应用正式页面、检查后提交推送GitHub并等待自动部署，再核验线上和手机；补充要求保留原版浮现小动画。
- 界面范围：将候选13个文件应用到正式src，涵盖ExploreView、CatalogFilters、UiDialog、BenchmarkCard、SampleMedia、SampleImageDialog、SampleViewer、Icon以及base/catalog/benchmark-card/sample-viewer/layout五份样式；复用同一URL筛选、原生dialog、现有案例加载与Lucide图标，不改原始题目/媒体或引入依赖。
- 动效原则：保留标题/搜索区和卡片淡入浮现，缩短位移和时长、限制卡片错开等待；保持原有减少动态效果规则，不屏蔽操作。具体检查和发布结果完成后补充。
- 提交边界：main关联origin=https://github.com/WhitePlusMS/whats-a-benchmark.git；已有README、推广、品牌与5项资料条目等本地改动独立保留，只暂存本次UI与对应说明。artifacts/candidates/2026-10-20-compact-ui-release保存基线、计划和验证证据。
- 发布前检查：正式源码类型与格式通过；准确暂存文件树46项测试、SSG构建和220个静态页/404核验通过。1280/768/844横屏/390/320实际CSS视口无整页横向溢出；组合筛选、条件移除、手机面板/Tab/Esc、9张原图150%滚动、精确位置恢复、换题重置与原始数据逐字一致均通过，页面控制台无警告/错误。浮现280ms、卡片200ms且错开最多120ms，减少动态效果实查关闭。
- 已发布与线上验收：界面提交c54d9b643a7ba5184b624ba9f37d5a908c2333c0正常推送origin/main，[Actions 39292507738](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39292507738)测试/构建/deploy成功。线上桌面及320/390手机、844横屏、768平板、1280桌面筛选/刷新/条件清理/模态键盘均通过；9/9原图完整加载、原尺寸/150%滚动、精确位置恢复通过，页面原始JSON与源一致，控制台无警告或错误。9图与4份案例JSON共13资源HTTP200且原字节一致；主CSS仅作用域ID因源换行不同，等价替换后全文一致，未将其冒充编译产物字节一致。浮现及减少动态效果均实查，4190临时服务已停且视口恢复；本次追加仅提交验收说明，既有资料/README修改保留。

## 2026-10-19 — 原有评测多案例补核提交与上线验收

- 授权与原因：用户明确要求提交推送GitHub，等待自动部署后检查线上案例、图片和音频。沿用main推送触发Pages流程，不改变部署配置。
- 提交范围：第一组为原156项评测数据、11个真实媒体/代码附件、32份许可、移除最多6例限制的schema、三份必要回归测试及多案例维护说明，共204个文件；第二组为156项核验报告、三份来源/撤回归档与UPDATE_LOG，共5个文件。README、推广素材和技能配置等既有本地修改按哈希保护。
- 发布门槛：本地215项、573条展示记录、19份发布资料；严格类型、46项测试、生产构建及156项桌面/手机检查已通过。本轮再核对实际远端、提交清单和内容校验，仅在对应SHA的build/deploy成功并实查线上内容后记录上线成功。
- 原文字节例外：暂存空白检查只提示`content/assets/licenses/longform-writing-license-notice.txt`末尾保留的原空行；与本轮已核对许可文件SHA-256一致，未裁剪原文。将该文件明确登记后，其余203个首组文件的暂存空白检查通过；没有跳过Git hook。
- 已完成发布：案例提交`ddbd703106ee3d40445e07588a16ae5dc3940413`、研究提交`5e576c578443e701b27e71f224e31ab11c063930`正常推送origin/main，远端SHA核对一致。[Actions 39259130236](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39259130236)的npm test、生产构建和deploy均成功，工作流于北京时间2026-10-19 21:20:12更新为成功完成。
- 全站发布数据：对照实际Git对象核对185份案例JSON、573条展示记录，字段和值一致；9张案例图片、7段音频、8份文件与76份许可共100个资源均HTTP 200且与Git字节一致。Design Arena撤下的旧案例文件HTTP 404；NC与GDP.pdf旧例已从当前JSON移除，来源/未确认归档继续保留。
- 线上逐页：原156项详情全部实开，有案例的138页最后一条raw显示值逐一匹配；样例数量、标题、Logo、边界说明与整页宽度正常。CyberBench/MRCR直接长URL探针曾超时，经正常选择器/原始数据控件路径重核，1,662,226/1,317,346字符完整哈希一致，540px滚动区正常；不改应用代码掩盖等待差异。
- 线上手机与媒体：390px下9张原图全部实际加载，7段音频逐段实际播放并检查进度/时长/错误，再暂停或自然结束；全部无媒体错误。8个附件链接正确，MMLU-Pro实际切到第10条、收起上一题答案并切换raw成功，控制台无警告或错误，视口已恢复。
- 验收证据：本地候选目录保存`published-actions-verification.json`、`published-committed-verification.json`、`published-browser-checks.json`、图片/音频/附件/交互记录与截图位置；核验报告追加授权发布结果，明确本地与线上检查范围。78个排除文件仍按发布前哈希保护。
- 收尾安排：这两份验收文档单独提交推送后，会再核对对应最终SHA的自动流程；文档提交不修改已验证应用内容。未启动本地服务，未调用网页端GPT评审。


## 2026-10-19 — 原有156项评测的公开数据与多案例补核

- 原因与授权：用户要求把之前收录的评测全部重新核实，补充遗漏的官方公开数据或具体案例，保留真实原始记录并配简短解析；同一评测可以展示多条案例。本轮以原有156项为范围，不把站内没有记录、测试夹具为空或未发现下载按钮当成官方无数据的证据。
- 原则与过程：复用现有`sampleSet.samples`和展示组件，按不同任务/子集选择真实代表记录，不以任意“一条”限制收录；保存官方原响应、ID/config/split、修订/响应哈希、许可和归属。GPT-6 LUNA负责描述第一方资料与候选数据，主任务核对后采用；明确内部、受控和未取得的具体原因，不编造样例、答案或虚假来源字段。
- 本地跟踪：`artifacts/candidates/2026-10-19-legacy-sample-audit/PLAN.md`记录任务及检查进度，并保存本轮范围、原始内容和哈希基线；正式逐项核验报告为docs/research/2026-10-19-legacy-benchmark-sample-audit.md。保留README、推广素材和技能配置等既有改动，不调用网页端GPT，不启动前后端开发服务。
- 多案例规则：`docs/LOCAL_SAMPLE_IMPORT.md`移除“只提取一条”的旧说明，改为按题型、子任务或输入格式收录多条真实代表记录并逐条解析；`src/content/schema.ts`移除每项最多6条的固定上限，保留最少一条、严格字段和ID去重。现有加载器和选择器均遍历完整样例数组，无需新增组件或分页。
- 交互回归：`tests/sample-viewer.test.ts`增加9条合成记录的发布结构/加载/切到第9条的行为检查，验证前题答案展开状态会重置、原始记录和值保留，同时空数组和重复ID仍被拒绝；这些夹具不作为站点官方案例发布。
- 首批边界修正：`content/benchmarks/mai-held-out-{code,math,qa,stem}.json`、`gpqa.json`、`gpqa-diamond.json`、`cursorbench-4.json`、`code-migration.json`、`mystery-game-puzzles.json`、`openai-internal-coding.json`和`taptap-maker.json`更新2026-10-19实际核查范围与来源；MAI训练诊断图不当作留出案例、CursorBench-3任务不冒充4.0、OpenAI精选能力演示不冒充成对偏好评测。TapTap沿真实公开脚本读取11个版本JSON，确认它们提供成绩而非题面；GPQA依据明确在线披露请求，不以canary或禁止训练概括访问限制。原发布日期、题集身份及样例数量未改。
- 当前检查：移除样例数量上限后严格TypeScript与4项样例查看器测试通过；上述11项具体说明更新后再次严格TypeScript通过。后续真实记录补充及最终全量验收继续执行。
- 首批真实多案例：`aa-lcr.json`新增4条（论文术语、季度利润、公开咨询和行业报告），`aa-briefcase.json`新增3项不同产物任务，`prbench.json`、`prbench-finance.json`、`prbench-legal.json`各新增4条，`human-eval.json`与`mbpp.json`各新增4条，共新增27条（196→223）。实际原始字段/文本独立对照本轮下载响应，去重保留旧ID；PRBench旧首轮题干补全同一官方记录原文，MBPP旧2条数据许可改为CC BY 4.0，不再误用代码Apache许可。逐条解析、缺少长输入或多轮上下文的边界、Lite非计分场景分别说明；本批严格TypeScript通过，完整证据与采用清单保存在本轮候选目录。
- 第二批真实记录：为C-Eval、CMMLU、MMLU、MMLU-Pro、MMMLU、SimpleQA、SimpleQA Verified、AA-Omniscience、MathArena三项、CritPt、SciCode、BFCL、MCP-Atlas、CharXiv及AA Multilingual Index共17项新增67条，累计新增94条（全站290条）；每项实际增量与ID见`adoption-manifest.json`。MMLU-Pro现10条并覆盖八个新增领域；MathArena Lean含sorry的声明仅作为原始证明目标，不显示成完整参考证明；CritPt只收公开题面/模板/定位字段，不发布答案或测试秘密。保留MMLU-Pro源cot中的单位/寄存器笔误并在中文解析说明，未修改作者原值。
- 原始结构修正：MMMLU首条恢复CSV空表头字段名和字符串行号；CharXiv同题合并到旧ID并补真实短答案与图表定位信息，不复制原论文图表。选择题展示直接复用raw内原选项，避免额外拼字母导致重复编号。第二批校验发现BFCL候选多出不支持的`promptOrigin: source`，立即移除多余标记，按既有schema以缺省表示原文，不扩大数据模型。
- 第三批与配套输入：BenchCAD按4个不同零件完整保留48个真实QA及原code_path，补4份逐字节一致的CadQuery代码文本和MIT原文（`.txt`只供查看，未执行）；两条旧单QA投影合并回完整父记录。IFEval新增4种不同约束组合；OSWorld、τ-bench、τ²-bench各新增2条作者任务配置或源代码任务；τ²旧指令恢复完整字符串，SciCode旧Ewald恢复父记录/sub_steps原始层级。本批新增12条（累计106条，全站302条），编译通过。所选作者配置的仓库许可与第三方页面/媒体分别说明，不将仓库许可外推到外部资源。
- 明确披露边界：HealthBench三项重新核对发布页脚注或Professional论文§8，Video-MME重新核对README已展示示例及其转载需批准条款；不以“不转载”误称“官方无公开案例”。ZeroBench Main纠正禁公开答案/禁训练被扩大为全面禁题干的问题，仅新增作者论文§3.2实际15词题文短引，不含图像、答案或受控数据行；标明非完整样例，不接受gated条款。新增该短引后全站303条；这五项与本批数据完成后均再次严格TypeScript通过。

### 第四批：公开任务正文及旧记录结构修正

- 修改 `automationbench`：4 条新增，恢复旧案例及新增案例的完整 Python 字面量记录（200 个定义仅做 AST 静态读取，不导入、不执行），保留 prompt/info.initial_state/info.assertions 层级。明确 simple 不计分，3021 的日期要求不等于其 assertion 验证了日期。
- 修改 `terminal-bench-2`：DNA Assembly 旧拼接节选更换为完整 instruction.md，另增 WAL 恢复、Cython 兼容、压缩器 3 条完整指令，明确输入文件未随案例镜像。
- 修改 `longbench-v2`：新增金融、政府多文档、小说检索 3 条，保留题目/选项/答案原值，不复制长 context；四条不能作为完整独立输入重跑。
- 修改 `finbenchmark`：新增 CAPM、EBITDA、营运资本、CAGR 4 条完整任务目录块，纠正将根 MIT 自动排除作者文档的旧说法，第三方 IFRS 正文仍不复制。
- 修改 `aider-polyglot`：补 4 个不同语言任务的完整官方指令，保留 Exercism 归属与各 track MIT 文件；不镜像外链图片。修改 `simplebench`：恢复旧 prompt 全文、6 条新增记录完整保留六选项与答案，并纠正旧解析把两个说谎者当不同类型的问题。
- 修改 `facts-parametric`：3 条新增、旧记录改为连续原始论文表行，避免把编辑添加的字段标签冒充源格式。修改 `alignbench`：6 条真实短问题及原分类，仅必要短引，不复制参考作答和外部证据。
- 修改 `rapidata-svg`：新增5条不同提示及原始模型名/加权事实值，署名 Yupp AI；旧 horse prompt 从固定历史 Parquet 仅用88,021字节 Range读取验证，源链接改为固定文件。保留大于1的原数值，不私自归一化；不镜像 SVG/PNG 或详细人口统计。
- 新增许可文件 `automationbench-mit.txt`、`finbenchmark-mit.txt`、`simplebench-mit.txt`、`aider-exercism-{cpp,go,javascript,rust,python}-mit.txt`，随案例保留原版权及许可文本。该批净增38条案例，来源与结构逐一匹配后才写入；内容校验结果继续在本轮末记录。

### 第五批：算术、网格、客服构建与评分函数

- 修改 `gsm8k`：核对既有3条完整raw，新增官方test索引3/7/10/18四题（跑步、重启重下、下载量、鸡蛋换算），每条题目与完整解题answer保持源值。
- 修改 `arc-agi-2`：新增3个公开training任务的完整train/test矩阵，原整数颜色值、示范对和测试对均保留，未编造规则或私有题。
- 修改 `hyper-tau-bench`：新增航空、零售、电信、银行4条任务；旧task_description恢复全文，所选字段保留真实层级和环境参数，未镜像外部证据包、模型定价与完整测试场景。附Sierra Research原MIT许可。
- 修改 `programbench`：新增3个实际测试函数片段；逐条说明命令、断言及检查范围，特别指出隐藏文件测试没有断言stdout触发次数，避免将注释当成已验证行为。4函数均未执行。
- 该批净增14条案例；逐条匹配本轮官方文件后采用。
- 编译校验发现 ProgramBench 新记录将可选 licensePath 写成null，已立即改为同一原始许可文件路径；不放宽schema。

### 第六批：固定版本终端任务和可验证约束

- 修改 `terminal-bench-2-1`、`terminal-bench-4`：各新增3项不同任务的完整官方instruction.md，并把原先的DNA/布局配置拼接片段更换为对应固定版本单文件全文；各条保留真实输入路径、交付格式、限制和缺附件边界。2.1新增Cython/棋局/财务文档，4新增CAD/Coq/跨文件匿名化。2.1与4的固定根Apache-2.0许可已保存。
- 修改 `ifbench`：原key=5核验一致，新增1/17/19/22/42五条完整prompt及原kwargs、instruction_id_list；展示关键词频次、数字数量、多个约束及词数范围，未编参考回答，数据许可ODC-BY-1.0与代码Apache分开。
- Git只读ls-remote核实Terminal v3.0.0→2b0442c、v4.0.0→452bf30；v3当时根目录未包含LICENSE，未把v4许可文件写成v3原有文件，该边界继续单独核查。
- 该批净增11条案例，类型检查随批执行。
- 校验发现新增许可文件名带点号不符合项目既有路径规范，已改为 apache-2-0.txt 并同步案例引用；不修改或放宽路径规则。

### 第七批：完整长上下文、真实图表及版本边界

- 修改 `mrcr`、`mrcr-v2`：分别新增2/3条完整原记录，旧prompt/queries/answer恢复官方全文，移除混入raw的中文省略说明。前者为本轮HF响应快照，后者固定GCS generation；源消息JSON字符串、原字段类型与标注答案均不改写。园艺例实际是第二篇故事，已修正初步解析中的“第一篇”。
- 修改 `mmmu`：修复旧options漏美元金额前缀，新增2条完整会计任务字段和真实image_1图。新增 `content/assets/images/mmmu-dev-accounting-2.png`（58357字节）、`mmmu-dev-accounting-3.png`（54776字节），哈希逐字节匹配，不重画；题面与表格公司名不一致也如实说明。
- 修改 `livebench`：补Zebra和空间推理2条完整公开Parquet记录，官方ground_truth保留；旧Web of Lies的2025-04-02移除日期明确为历史成员。
- 修改 `terminal-bench-3`：旧复合片段更换为v3固定指令，补3项原指令。SATB是音乐转谱而非语音转文字，解析已纠正；当前v4 Apache-2.0与v3当时无根LICENSE分开说明，不伪造历史许可。
- 该批净增12条案例。导入辅助在正式写入前用项目完整entrySchema校验内存对象；保留schema严格要求，不为候选错误放宽规则。

- 修改 tests/content.test.ts：夹具从真实MMLU-Pro读取样例，旧断言写死2条与多案例收录冲突；改为核对原entry的实际样例数，继续保留第二条目为0及目录无sampleSet/raw的断言。变更只修正测试假设，不更改生成逻辑。

### 第八批：代码任务、论文rubric与公开职业任务

- 修改 `deep-swe-v1-1`：新增ABS模块加载、Bandit污点检查、FastAPI弃用头3份完整指令；旧ts-pattern固定commit实际重新取回且逐字匹配。依据PROVENANCE中明确的DataCurve原作者任务规格Apache-2.0范围，保留原文，不执行其中建分支/提交命令。FastAPI解析描述该题规定行为，不把题内RFC写法改称通用规范。
- 修改 `paperbench`：补三篇论文完整所选rubric子树，保留公式、权重、null类别与嵌套；旧APT叶子只检查RoBERTa载入，纠正旧解析引用错误ID和扩大含义。附作者MIT许可，论文/实验附件不复制。
- 修改 `mind2web`：增补官网查收据、往返航班、信息检索3条demo，明示无数据行/split，不转发README限制的解压文件或浏览器轨迹。
- 修改 `gdpval`：完整220行实际读取核验后，选3个真实职业任务ID展示必要连续段落（租赁指南、分拣流程图、品牌收集表），不将180字符中断字段冒充完整prompt，不推定缺失的数据许可；旧网页电缆案例与HF行未强行映射。
- 修改 `officeqa-pro`：新增论文UID0005的真实连续短语，保留PDF抽取换行，去掉编辑添加的Question/引号标签；不导出gated CSV或补答案。
- 新增 `paperbench-mit.txt`、`deep-swe-original-apache-2-0.txt` 原许可文本。该批净增13条原始任务、评分配置或公开例题片段。
- 预导入完整schema校验拦下OfficeQA候选的未知type和recordSha256字段，已改为既有record类型并将哈希保留在证据文件；校验通过后才写入该批案例。

### 第九批：情绪对话、写作要求、表格任务与识别虚构前提

- 修改 `eq-bench-4`、`creative-writing-v3`、`longform-writing`、`spreadsheetbench-v2`、`bullshitbench-v2`、`skillsbench`，分别新增4/4/4/2/3/3条，净增20条（全站411条）。恢复旧开场、提示、任务正文与源换行，不把编辑说明混入raw。
- Creative Writing保留基础<SEED>而不伪造展开值；续写例仅引实际写作指令，未转载前置故事。Longform README明确MIT，Creative/EQ的所选数据许可未确认；分别按实际来源标注。
- BullshitBench保留完整问题和官方nonsensical_element，SkillsBench保留原任务正文和格式示例并说明其不是实测答案，未执行其中命令。SpreadsheetBench补官网完整Instruction原句，工作簿未复制。
- 新增 `longform-writing-license-notice.txt`、`bullshitbench-v2-mit.txt`、`skillsbench-v1-1-apache-2-0.txt` 原许可/声明；检索SHA仅存档在证据，不混入严格展示schema。

### 第十批：恢复旧题原文、原始图像与更多任务类型

- 修改MathVista、OmniDocBench、SVGBench、Short-Story、Agents’ Last Exam、AA-AnalystAgent、MMMU-Pro和Arena Vision八项，净增33条（全站444条）。每条raw独立对照本轮原始响应；旧MathVista恢复完整问题，ALE恢复被改写summary与taskPrompt，AA补回题干末尾的舍入要求。
- 新增MathVista的CLEVR-Math原场景图和MMMU-Pro三幅原图，实际查看后逐字节保留；MMMU-Pro水库图最后表头670与题干700的差异如实说明。原图不重画，图中拼写/值不擅改。MathVista其余上游媒体未镜像，不以少数图像的许可外推全部题库。
- OmniDocBench只取四条短标题的真实布局标注，不复制第三方整页；原page_no=1644与文件名后缀46分别保留。Short-Story新四例恢复各自完整十项叙事元素，纠正初步候选把Timeframe写成Setting、混入另一题场景的解析。
- SVGBench采用8个不同主体的真实API提示；Arena Vision补8个公开分类提示并说明缺少配图。ALE三项新业务任务保留完整taskPrompt及CC BY 4.0数据声明；新增许可证文件agents-last-exam-data-cc-by-4-0.txt。AA两公开参考值不冒充整套私有答案。

### 第十一批：真实数学题、棋局与完整软件问题

- AIME 2024/2025、MATH-500分别新增3/2/2道不同题；重复的首题合并到原ID，旧题被截断的条件与官方短答案原值恢复，未复制解答。AIME2025九人冰淇淋题按三种口味人数严格递减的实际条件解析，不沿用初步错标题。
- Chess Puzzles新增3个完整FEN与官方target；从48,757,423字节的公开.eval压缩包只解析任务字段，不复制模型输出/推理。按FEN修正g7/g8为黑车，黑王在e8，不采用初步候选的错误棋子解释。
- FrontierSWE V2新增3项真实任务首段；SWE-bench/Verified/Pro/Multilingual/Rebench各新增3条，恢复旧完整problem_statement并保留Pro要求/interface与Rebench原meta/license_name。对应base_commit的Astropy、Druid、NodeBB、Spectree、Sepal UI原许可分别保存；评测器许可、数据卡和上游issue权利不混为一个结论。
- 该批净增28条（全站472条）。原始诊断中的示例代码是题目输入，未执行；没有将修复补丁或评分当成原题。

### 第十二批：公开专业预览与真实工具/游戏任务

- BioMysteryBench新增preview v11全部5条原始任务行，保留官方rubric、allowed_domains和human_solvable原值；v11替换题目边界明确，发布文章原例单列。新增其CC BY 4.0原许可，不复制生物数据附件或受控90题集。
- Finance Agent v2补6种public.csv问题，Arena Creative Writing补4种官方短提示；原字段与题目完整保留，均不编造答案或映射私有计分行。
- Toolathlon补2份实际任务并恢复旧Alita完整正文；LHTB补2048/对弈2任务并恢复旧LangChain全文，新增Apache原许可。所有任务只作为数据读取，没有执行命令、玩游戏或安装依赖。
- Excel-EMB完整核对scratch/template指令后仅补同题变体说明和固定入口，保持1条案例，不将初始化模式重复计题。
- 本批净增19条（全站491条）。

### 第十三批：法律、税务公开题与作者任务配置

- Harvey LAB补CIM买方分析与诉讼特权审查2项，旧并购题补回完整red-flag-tracker交付要求；固定v1.0原task配置和MIT许可保存，事项附件与评分材料未镜像。
- Tax Agent Bench、Vals Legal Research各新增4条并补全旧P-001。采用实际父级dataset/suite版本及tests嵌套结构，原问题完整保留，未把新建wrapper当源字段，也不把旧首题算成新增。两组public sample均明确不计分。
- 逐题中文解析核对实际人物、时间和交易事实：法律P-001妻子是美国公民，P-005为融资租赁；税务P-002是2023收购在2025触发earn-out。仅解释题目任务，不编造法规答案。
- 本批净增10条（全站501条），新增Harvey v1.0 MIT原许可文本。

### 第十四批：数学公开面板、代码输入与来源通道补证

- FrontierMath三项合计补5个页面案例位置，保留共享样题页实际Problem HTML和数学条件，恢复旧例原文；不编造固定v2行号，不把母项/版本的相同题计为不同题库。
- CyberBench补OpenSC公开摘要；LiveCodeBench补3条完整实际question_content（含官方输入输出示例），纠正“恰好加一次”被写成“最多一次”；LiveCodeBench Pro补2个论文示例，采用HTMLParser按精确SVG元素边界保存每题源码，排除后续其他题和模型分析。
- HLE补主页Classics转写例（原图未镜像）；MirrorCode补3个原命令，并纠正-j为年内日序号而不是儒略历。MysteryMechanism补2个冻结公开例，原始HTML替代自造JSON字段，旧官方公开示意公式来源逐项核对保留。NL2Repo补3类start.md真实请求。
- FrontierCode只恢复同一公开任务原面板，不将指南或运行标题当新题。RWS旧句经独立web工具在官方2026-08-24新闻全文核实，curl空响应不再被误判为原文不存在；修正为语法判断任务，并补论文明确非live探针。
- 本批净增21条（全站522条），新增MirrorCode MIT原许可；每个新增/更正raw均能在原始响应、解码字段或精确源元素中定位。

### 第十五批：纠正同名混用、完整研究指令与第三段真实音频

- NC Bench撤回误置的IBM Natural Conversation basic-0，明确它不是Novelcrafter写作评测；完整原样例另存docs/research/evidence/2026-10-19-withdrawn-nc-bench-example.json。替换为Novelcrafter三个官方run的真实输入片段，源HTML实体/换行保留，不复制模型作品；清除错误IBM许可/入口，目录身份保持不变。
- GeneBench-Pro补4种公开包问题并保留实际任务全文、模板与元数据；synthetic-data声明与题面real experiment措辞并列说明，不伪装真实临床数据。
- WANDR补2份不同研究任务并恢复旧完整instruction；采用Apache作者正文，结果、外部网页和测试未复制。
- Small Overlapping Speech补clip_002真实音频与完整ground_truth。旧clip_000/001的audio_file是原生字段，已经与固定官方100行JSONL逐对象核对相等；不能因HF Rows解码列叫audio就错误删除它。
- 本批新增10条、撤回1条错误关联，净增9条（全站531条）。

### 第十六批：真实偏好任务、动态题面与写作输入

- Arena新增3条真实投票任务，保留prompt原JSON字符串类型，说明winner表示该次偏好而不是题目正确性，未复制两模型回复。Arena-Hard V2补4条原问题，修正初步取行错位带来的其他题解析。
- OpenVibeEval通过官方详情页Prompt Text标签读取并存档2条完整任务输入；静态HTML不含动态面板，不能因下载页面未见题面就认为官方未公开。仪表盘题没有单HTML约束，游戏题才有。
- ToneBench恢复同一旧Script 9原文，并补2个不同输入；TubeLab恢复PFOA原卡片HTML，补JFK卡片，作者页面本身的截断不续写。新增共12条（全站543条），两条旧例纠正。
- clip_002媒体来源改为固定版本原MP3；本地352557字节与官方响应SHA-256一致，未转码。旧两段音频的本轮检查范围单独说明。

### 第十七至二十批：原案例逐项纠正与交互/专业案例补充

- 恢复OpenVibeEval原Digital Garden完整题面；BrowseComp-ZH按实际渲染论文Figure 1逐字核对两条中文题目和公布答案，新增影视题，旧艺术题纠正错字；视觉转录证据与机器文本响应匹配分开记录。
- Terminal-Bench-Science三条完整Hub instruction按实际响应保存，新增2条并替换旧概述；注明各Hub修订/version与固定0.1.0归档不同。Arena-Hard旧例只保留真实连续提示前缀，剔除截断字符串冒充完整字段的问题，不镜像嵌入的第三方AoC整题。
- BabyVision补6种公开视觉题；RULER补4种作者表格示意；ScreenSpot-Pro补2条native标注，旧Blur Dissolve修正为源ui_type=text，bbox不改。GAIA恢复真实A4.T1表片段；EBR、OSWorld2、ARC3、Vending、MLCR逐项去除自建标签/跨块拼贴，恢复能在源响应定位的连续原文。原图、完整环境、回放帧或病历未附时逐题明确。
- Roboflow通过官方页面逐个展开5个控件，实读题目及标准值，新增4条并补全旧图纸题；静态HTML未含动态控件不能作为未公开的判断。答案分别保留1、1/2、2.742、left、10，未猜测缺图条件或图纸单位。
- LongBench补QASPER/2WikiMQA/TREC-E三条，保留原input/answers/元数据并注明未复制context；旧Multi-News的input实为空，改用真实context连续25词短引，保留原换行，不能把上下文句子改名为input。
- τ³-Banking补2种用户情境并替换旧期望动作片段，完整保留作者id/user_scenario/user_tools/required_documents原值和层级；按根MIT保留Sierra归属及原许可，第三方知识正文未复制。MedScribe纠正为先出现的Doctor首轮，未编患者对话或SOAP答案。
- LifeSciBench恢复旧空间转录组题实际连续片段，补官方AAV9网页演示；不采用只有五词通用开头的弱候选。AA AutomationBench补2种公开工作流并把旧Finance例改回真实请求，657私有题未公开，Zapier许可不外推至AA网页。
- 本段净增27条（543→570），每条新增/纠正均以正式采用前的源匹配或单独视觉证据核查；各批严格TypeScript检查通过。

### 最终来源复核与归档

- 新增完整156项逐项报告及526条当前原评测展示记录的来源/原值SHA-256证据；全站573条，新增380个展示位置、撤回3条，净增377。共享版本/成员、论文示意和未配齐输入明确说明，不算作独立新题库。
- 剩余旧例逐条补核：AA-Briefcase旧全文、AA-Multilingual固定Parquet17字段、MathArena额外offset响应、Rapidata历史Parquet prompt列、τ-bench AST和Short-Story元数据分别核对；两版Apex只有历史verifier线索，当前响应未重核，显著标注。
- GDP.pdf撤下无法确认的旧炸锅例，改为CC BY 4.0论文Table5三条真实task sketch；Design Arena旧tournament归档并改为unverified入口，不断言其虚构。FinBenchmark旧题恢复全部四选项，GDPval/OfficeQA/SpreadsheetBench/BrowseComp去除标签拼贴，MLCR另补两段实际公开问题。
- 所有原156项补充具体取样结论、公开/私有/访问/版本边界和2026-10-19核验日期；原发布日期、身份、版本、品牌不改，复合指数继续复用真实成员。未知许可状态不外推授权。

### 最终验收与收尾

- 测试夹具：`tests/sample-origin.test.ts`显式构造无选项的record片段，避免FinBenchmark恢复真实四选题后被首条题型偶然影响；未知许可下的选择题/媒体限制保持不变。`tests/content.test.ts`按真实样例数核对，不再写死MMLU-Pro为2条。未放宽正式内容schema或新增前端查看器。
- 自动检查：`npm run validate`通过215项、573条展示记录和19份发布资料；严格TypeScript通过，46/46全量测试通过，生产构建生成221个路由并核验220个明确静态页面及Pages 404。保留既有Vite包体积提示，未调整依赖或部署配置。
- 真实浏览器：原156项逐页完成1280px桌面和390px手机检查；案例数量、最后记录、Logo及整页宽度正常。桌面逐项核对最后一条raw显示值，百万字符记录分段读取后哈希一致，原始文本区高度保持540px内滚动。实际验证第10条切换、答案重置与原始数据按钮；指数借用成员案例、内部未公开和未核实入口显示正确，控制台无警告或错误。
- 媒体与附件：8张现有/新增原图实载正常；新增clip_002实际播放并推进至7秒，无媒体错误。原ground_truth记为21.792秒，浏览器MP3容器显示21.892375秒，分别保留实际值。新增11个媒体/代码原文件与32份许可文本共43个资源均HTTP 200且逐字节一致，未执行CadQuery或题内命令。
- 报告与证据：`docs/research/2026-10-19-legacy-benchmark-sample-audit.md`保存156项旧→新与来源/边界；`docs/research/evidence/2026-10-19-legacy-sample-provenance.json`保存526个原有评测当前展示位置的来源及raw规范化哈希；两份撤回/未核实归档保留原对象。最终检查记录与桌面/手机截图位置见本地候选目录`verification-summary.json`。
- 范围保护：68个受保护文件哈希一致，包含上一轮59项和既有README/品牌/发布资料/查看器；原156项的id/name/kind/publisher/year/version/brandIds均与基线一致。本轮不更新发布身份或品牌，不把检查日期误写成发布日期。
- 清理与交付：仅启动临时生产预览4187用于验收，现已停止且端口无监听；未启动开发服务。视口已恢复，本轮临时来源/预览标签已关闭。暂存区为空，未提交、未推送或部署本轮改动；保留原有推广和技能文件修改。


## 2026-10-19 — 发布评测扩充与真实案例补核结果

- 授权与范围：用户明确要求推送Git。本次在`main`提交并推送本轮官方评测收录、真实案例、品牌/附件、最小展示支持及相关研究文档；以显式文件清单暂存，保留README、推广素材、技能配置等既有未提交改动。
- 提交组织：评测及真实案例、Logo、原始附件与许可、GDPval-AA引用修正、xlsx附件校验和复合指数空样例提示为一组；近半月官方来源研究、严格复核、逐项收录/案例报告及本更新记录为一组。无需改工作流，沿用`main`推送触发的Pages自动构建与部署。
- 发布门槛：正式目录215项、样例196条（新增47条），前一轮严格TypeScript、45项测试、生产构建及59页桌面/手机检查均通过；发布前再次核对暂存差异、实际远端分支和内容校验。只有对应推送SHA的Actions构建/部署成功、线上数据与本地发布文件核对后才报告部署完成。
- 原文空白检查：暂存检查仅发现AgentHarm与b3两份官方LICENSE原文各有一行行尾空格，源响应及SHA-256与取证原文件一致，因此保留原文字节；将这两个逐字复制文件单独登记，其余提交文件的`git diff --cached --check`通过。未跳过Git hook或改写全局Git设置。
- 文档格式：`docs/research/2026-10-18-model-release-audit-media.md`仅去除文件末尾多余空行，研究正文、官方来源和证据内容未变。
- 已完成发布：内容提交`5c73407c8d563004b86f3c503bdb785cdc6f20b7`、研究文档提交`86999fd7d90d04f8185e3b6b87c6e685059f71d0`正常推送`origin/main`，远端SHA核对一致。对应[GitHub Actions 39201521277](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39201521277)的build/deploy均成功，部署于北京时间2026-10-19 12:51:45完成。
- 线上内容核对：47份样例JSON、9个真实附件、30个Logo和12份许可文件共98个资源均HTTP 200，与实际发布Git版本逐字节一致；两份Full-Duplex JSON及八份许可相对Windows工作区仅有CRLF→LF归一化，JSON字段和值一致。工作簿、音频与图像字节保持一致；命令行直连受本机网络影响时使用现有本地代理读取，没有修改网络配置。
- 线上页面验收：逐页检查59个详情页，47项原始记录与正式数据一致，解析与Logo正常、无整页横向溢出；390px手机抽查LoCoMo、Finch和Full-Duplex正常。Full-Duplex两段语音实际加载/播放，时长4.72/4.70秒，无媒体错误；首页显示215项评测、196条真实样例，浏览器控制台无警告或错误。
- 交付证据：本轮候选目录保存`published-actions-verification.json`、`published-committed-verification.json`、`published-browser-checks.json`、手机/音频记录；可视化目录保存`2026-10-19-published-benchmark-catalog.jpg`正式站点截图。78个排除发布的本地文件哈希不变。本验收日志单独提交后会按现有工作流再次构建同一应用内容，最终流水线另行核对；没有启动本地服务。

## 2026-10-19 — 逐项补核59项的官方真实数据与样例

- 原因：用户指出上一轮新增59项只有定义、入口和“未附样例”，没有完成网站核心的真实数据展示与简短解析。此次以真实第一方记录为依据，逐项实际查询HF数据文件/真实rows、官方仓库任务、加载代码及文章/论文已公开案例，不从本地测试夹具或站内空状态推断官方无数据。
- 范围与原则：沿用现有sampleSet、原始数据tab和媒体展示；能拿到已公开真实记录的就保留原字段、嵌套与值并配小解析，长输入/缺附件仅明确节选。内部/私有全集仍单独查公开代表案例，未知或访问受限需记录实际请求、来源和具体障碍，禁止编题或用一般方法说明充当样例。指数复用已明确成员的真实案例，不伪造独立题目。
- 准备与证据：`artifacts/candidates/2026-10-19-real-sample-audit`锁定59项、保存当前条目快照与哈希，分三组用GPT-6 LUNA整理原始源响应、记录定位和许可依据；主任务核对后才采用。不调用网页端GPT，不启动开发服务，不提交推送或部署。
- 首批实际补充：Harvey LAB-AA v1.1税务来源/提交/重大幻觉判定、Pronunciation Robustness两处St.的独立发音标注、Speech Agent Arena官方牙科预约场景；均保留真实短片段及中文解析，纠正将改写句当原文、将两种发音当任选的问题。Vals Index按官方v2公式完整登记七个组成项，复用成员真实案例，不增加指数独立题。
- 附件支持：`src/content/schema.ts`仅给既有file附件增加xlsx扩展名，继续复用`SampleMedia`下载组件；`docs/LOCAL_SAMPLE_IMPORT.md`说明原始工作簿及HF完整rows与revision溯源区别。用于展示Finch实际输入及参考工作簿，不新增编辑器、不转换原始文件、不执行公式。
- 核心样例：新增19项真实案例，逐项采用清单见本轮`core-adoption.json`。GraphWalks保留完整有向图、`answer_nodes`与源内计数字段；LoCoMo保留问答/证据会话及相对日期解析；LongMemEval保留oracle三段原会话，明确非完整干扰历史；LegalBench保留hearsay分类；MemoryArena保留原`questions/answers`并说明答案字段含生成响应；PersonaMem-v2保留偏好线索及正误候选。Finch提供原始输入/参考xlsx，并实际读取参考表的核对公式；ChartQAPro提供原图。其余安全、代码、视频与健康案例分别注明控制集、官方演示、文本标注或配置示例边界。JBB修正为judge_comparison真实来源；SWE-Atlas未获完整再分发许可时仅保留真实标识/操作节选与任务解读，不把自写答案当原始参考回答。
- 额外公开例证：CWE-bench官网公开BlurHash解码器训练示例及8个真实输入，明确不是120道私有留出题；Riemann展示原图中的真实公式/数值条件节选及解读，完整原图保留出处链接，不冒用论文CC BY许可覆盖独立题图。首次整批校验暴露b3样例标题遗漏，已立即补齐再编译。
- 专项与版本：补齐20项专项真实记录及AIME 2026、SciCode-Verified、SWE-bench Pro v2 Hard三项真实案例；API-Bank使用原始JSONL，ToolSandbox保留真实场景源码，PinchBench保留原任务及内嵌CSV，WebArena-Verified保留任务JSON与目标。SPEED的Go/27与固定HumanEvalPack Parquet逐字节一致并按上游MIT展示；BRIGHT改用examples配置并记录Stack Exchange原作者及CC BY-SA4归属，检索目标用真实gold_ids。Full-Duplex保留两份JSON和两段WAV；MAEB精确映射BirdCLEF成员、核对iNaturalist录音作者isa_piga及CC BY-NC；MIEB-lite排除错误Caltech101映射，采用确属lite的RESISC45标注，未复制许可未知原图。SWE-MM仅展示任务文字与原图出处，不将第三方截图许可推作已确认；τ-Voice展示任务与语音配置而非波形；SWE-Context明确base与related缺口。
- 59项结果：47项各增1条真实记录/具体官方案例，样例149→196，目录215项及19份报告不变；6个复合指数不造独立题，3项直接复用composition成员案例，PSI/Jev/AA Cyber分别提供明确成员或上游入口及实施差异；其余6项保留具体缺口（2项gated、4项Meta内部评测未找到可归属题目），不借旧版/能力演示补位。逐项来源、ID/split和边界写入`docs/research/2026-10-19-real-benchmark-sample-audit.md`，最终采用清单为本轮`final-adoption-manifest.json`。
- 一致性复核：完整读取59条后清理候选工作台措辞；多源JSON/JSONL保留独立来源并将主链接指向包含各文件的官方目录。CWE/Riemann的数据访问改为“部分公开”，同时明确全集私有；Riemann官网图版本未标，不冒称论文v1快照。原始字段不会因编辑文案而改值，旧149条样例继续保留。
- 最终来源复查：`full-duplex-bench.json`移除误混入的MTEB总览链接，明确原始数据栏仅展示`output.json`的`text/chunks`对象，`pause.json`和`output.json`分别作为原文件附件；修正旧说明中“raw依次保留两个JSON”的错误表述，没有改动原始数据或媒体字节。修改后严格TypeScript编译通过。
- 手机媒体说明：实际播放两段Full-Duplex WAV并展开作者转写，确认时长4.72/4.70秒、媒体无解码错误。将会在手机中被截断的64位哈希说明缩为语音用途/时长，完整源文件哈希继续保留在本轮证据中；未改通用组件或媒体文件。
- 最终验证：内容校验通过215项、196条样例和19份发布资料；严格TypeScript通过，45项既有测试通过，最终生产构建核验220个静态页及Pages 404。沿用已有Vite大包提示；未调整依赖、构建或部署配置。逐一检查59页1280px桌面与390px手机布局，47项原始数据栏与正式JSON值一致，解析及Logo正常，无整页横向溢出；16个已提供参考答案实际展开并核对原值，指数与受控/未核实案例状态显示正确，控制台无警告或错误。
- 附件及下载：9个新增附件及12份许可文件通过实际HTTP读取并与本地字节/取证副本哈希核对一致；4段音频可播放且无解码错误，ChartQAPro图像627×442正常显示。Finch输入通过页面真实下载，79,613 bytes及SHA-256与官方源文件一致；没有运行工作簿公式、模型、训练、benchmark任务或PoC。
- 基线保护：原有156项及149条样例、brands/releases、README/宣传SVG和既有DetailView修改均与本轮开始的字节哈希一致。59项ID、名称、发布日期、年份、版本和品牌归属未变；本轮应用代码仅给schema已有附件增加xlsx扩展名，没有增加重复展示模块。
- 验收与收尾：本轮候选目录保存完整逐项清单、来源响应、哈希、浏览器/媒体/下载记录和`verification-summary.json`；Codex可视化目录保存原始JSON、Finch下载及手机音频三张实际页面截图。已恢复视口、关闭检查标签，核对命令行后仅终止本轮4181预览PID23660，确认进程退出和端口释放；未启动开发服务，未调用网页端GPT，未提交、推送或部署，保留其他既有工作区修改。



## 2026-10-19 — 收录官方评测、机构评测、复合指数及版本

- 用户授权范围：严格复核确认的40项基准、8项机构评测、6项复合指数及6项已有系列版本/实施；共60项，不含另列的传统数据集或未确认候选。
- 原则：沿用单条JSON、共享品牌和现有详情页，不编造样例、日期、题量、数据字段或许可；指数、内部与未公开情况分别说明，版本不覆盖母项。
- 正式收录：新增59个 `content/benchmarks/*.json`（40项基准/套件、8项机构评测、6项复合指数、5项已有系列版本/实施），逐文件清单、日期依据及标识对应见 `docs/research/2026-10-19-official-benchmark-catalog-expansion.md`。补充任务契约、已披露规模/真实字段、指标、访问与许可、版本差异和一方资料，不创建任何新sampleSet。
- 去重修正：`content/benchmarks/gdpval-aa.json`补充NVIDIA Bolt报告摘要的GDPVal v2简称与Figure 5/Table 7的GDPval-AA v2具名引用；不另建独立GDPVal v2，不推断AA v2与v2.1相同。旧复核中的Jet名称更正为Jev，按社区公开复现榜0.3记录，不冒称TypeSafe/Hugging Face官方榜单。
- 品牌素材：`content/brands.json`登记30个项目、发布机构或正式维护账户标识；新增对应 `content/assets/logos/*` 原始素材，59条均关联可用标识。对无独立Logo的项目注明账户/机构归属，不生成Logo。SWE-ContextBench原GitHub头像全白，改用作者正式HF数据账户实际显示的SVG标识；JailbreakBench白色Logo配置深色底，宽版Full-Duplex-Bench使用已有wide配置。
- 日期边界：57个新增条目有YYYY-MM-DD，并说明是论文首投、公开版本提交、正式公告或模型卡披露版。Coding Agent Index v1.5只披露2026年9月、Pronunciation Robustness未找到日级公告，两者不填假日期，版本文字明确说明；AA Speech-to-Speech固定v1.0首次公开定义日，后续v2.0的日期缺口另述。
- 本轮证据：在 `artifacts/candidates/2026-10-19-official-expansion` 保存授权清单、三批候选、日期页面、标识原图/哈希、采用清单与基线哈希；GPT-6 LUNA整理及交叉描述证据，主任务复核采用，未调用网页端GPT。
- 显示修正：`src/views/DetailView.vue`仅在指数确有组成项站内样例时提示“下面展示真实案例”；没有样例时提示通过组成项查看官方入口，避免空样例区作出不实承诺。JobBench发布方缩短为Meta模型卡披露；OSWorld2.1、SWE-bench Pro v2-Hard、SciCode-Verified改为实际作者/机构仓库样例入口，不因本站未转载而标为原题限制公开。
- 身份与访问复核：清理EVA-A/EVA-X指标、SWE-ContextBench Lite Related子集及未证实τ²-Voice同义映射；SWE-ContextBench采用论文v3的2026-05-06日期，与1,100基础/376相关任务一致，v1日期另述。指数无独立题集与私有组成项分别解释；Speech Agent Arena的完整样例入口、PLawBench数据入口未确认时标为未知，不凭未转载推定发布方限制。
- 最终验证：内容校验、严格TypeScript编译、45项既有测试与生产构建通过，目录156→215条，原有样例149条及19份发布资料不变，构建核验220个静态页面及Pages 404。保留既有Vite大包提示，没有调整依赖或构建配置。新增研究报告已运行Prettier，Git差异空白检查通过。
- 实际页面：逐一检查59个新增详情页的390px手机与1280px桌面布局，另回归MAI Held-Out Code、ZeroBench Main；所有标识加载、日期/内部与未公开提示正常，无整页横向溢出，控制台无警告或错误。复查指数有/无真实组成案例两条显示分支，目录别名与年份搜索正确，“复合指数”独立返回本轮6项。
- 验收证据：`browser-checks.json`、`browser-search-checks.json`与`verification-summary.json`保存在本轮候选目录；Codex可视化目录保存`2026-10-19-benchmark-expansion-desktop.jpg`和`2026-10-19-benchmark-expansion-mobile.jpg`。161个基线原始字节哈希仅GDPval-AA与brands变化，旧155项、README/推广SVG、releases未变；GDPval-AA原样例结构与HEAD一致，30标识与原取证副本SHA-256一致。
- 收尾与影响：恢复浏览器视口和外观、关闭本轮检查标签，并终止4181生产预览进程40476；未启动前后端开发服务，未调用网页端GPT，未提交、推送或部署。应用代码仅修改上述空组成样例提示，不改样式、依赖或部署流程；保留其他既有工作区修改。

## 2026-10-19 — 按官方机构来源严格复核模型与评测漏项

- 原因与原则：用户质疑广泛发现清单是否混入个人练习模型或随意自编评测，要求重新确认实际漏项。按最简、第一方来源、身份去重与如实披露原则复核；GPT-6 LUNA只提供发布者/论文/目录证据，最终分组由主任务决定；未调用网页端GPT。
- 新增 docs/research/2026-10-19-model-publisher-recheck.md、2026-10-19-core-benchmark-recheck.md、2026-10-19-specialist-benchmark-recheck.md：分别记录33条发布者/日期事件、36个核心名称和45个专项名称的出处、定义、公开性、相邻已有项与未决信息。ChartQAPro、CWE-bench v1、Riemann-bench、Full-Duplex-Bench等补回原发布者/论文来源，避免只凭模型图标签判定。
- 新增 docs/research/2026-10-19-official-benchmark-recheck.md：以156项正式目录为基线，按规范身份确认40项基准/套件缺项，另列8项机构非公开或部分公开评测、10项传统数据任务；9项模型/日期边界、6项复合指数、6组已有系列版本/实施、8项定义待核分开记录，共87个规范复核记录。40项不等于本窗口新发布的40个benchmark，58项也不合称新公开题库。PinchBench明确为Kilo支持的行业/社区项目，不冒称同行评审基准。
- 模型边界：严格主名单保留29条官方发布/披露记录，合并同次型号为27组事件。Step5、SemanTok按首次披露日期边界另列，Voxtral Arabic首次可用日仍待核，Iris保守移出重点统计但不定性为虚假或个人玩票；社区LoRA/量化不算新基础模型，MAI仅为研究披露。
- docs/research/2026-10-18-model-release-benchmark-coverage.md：顶部增加更正，明确33条型号、129份图片、300条引用是广泛发现快照，以新复核为准。
- artifacts/research/2026-10-18-model-release-audit/recheck/：新增三份证据JSON、strict-coverage.json/csv、静态HTML表、报告副本与build-recheck.mjs。每个确认项保留基准定义来源和合格模型引用；别名/复合安全表合并，版本差异独立记录。build-gallery.mjs及生成index.html仅在顶部增加严格复核入口与计数说明，原图/原表继续留存。同步汇总副本和原下载ZIP，避免旧包遗漏更正。
- 静态检查：87个规范身份唯一、分组合计一致，所有确认项有定义及合格模型引用，395个本地HTML资源/文件链接有效；129份原图SHA-256均未变，原始33/129/300计数不变。两个研究脚本语法检查通过，Git差异空白检查通过。ZIP重建后逐文件CRC检查通过。
- 显示边界：浏览器安全策略拒绝自动打开file协议本地页面，本轮没有绕过策略或声称完成浏览器显示回归；仅完成静态核验。原有截图/HTTP验证属于上一轮，不用来替代本轮验收。
- 影响与收尾：正式content、src、tests、scripts及部署配置均无本轮差异，目录仍为156项。仅研究文档和离线取证材料变化，未自动收录、提交、推送、部署或启动服务；保留README、推广素材及其他既有工作区修改。

## 2026-10-19 — 近半月模型发布成绩图与评测目录覆盖核查

- 原因与范围：用户要求围绕 2026-10-18 检索近半月新模型，收集官方发布页的 benchmark 图片、逐图阅读并检查漏项。发布窗口固定为 2026-10-04—2026-10-18，跨至 10-19 凌晨完成取证；遵循最简、第一方事实与未披露内容保持未知的原则。
- 研究文件：新增 `docs/research/2026-10-18-model-release-audit-china.md`、`2026-10-18-model-release-audit-global.md`、`2026-10-18-model-release-audit-media.md`、`2026-10-18-model-release-audit-specialist.md`，分别保存国内、海外、媒体/专项及决策/代码补漏证据；新增 `2026-10-18-model-release-benchmark-coverage.md` 汇总精确日期、来源、遗漏、已有版本、名称待确认和检索缺口。
- 本地证据：`artifacts/research/2026-10-18-model-release-audit/` 保存四组 manifest、官方原图/SVG、官方 PDF 与渲染页、官方网页区域截图及源页面；`audit.json` 合并逐图元数据和 SHA-256，`coverage.csv` 保留逐次引用的名称/版本/工具/子集/框架条件与目录判断；`index.html` 是可离线打开、搜索和分组的图册。`decisions.json` 记录主任务的名称/版本判定，`supplements.json` 保存附加视觉证据，`build-gallery.mjs` 仅生成本地研究交付物，不进入站点构建。
- 主要发现：PostTrainBench、LABBench 2、GraphWalks、多项记忆/法律/语音/嵌入/决策任务等目录未覆盖；OSWorld 2.1、SciCode-Verified、GDPVal v2、SWE Bench Pro v2-Hard、AIME 2026 及 Harvey LAB-AA 存在版本/实施差异。纠正 IFBench、AA-LCR、Terminal-Bench Science 0.1、Finance Agent v2、HealthBench Consensus 等误报风险；Apex/CMB/未标版 Vibe Code Bench 继续保留不确定性。图片文件名的 v3、bbox 和 Finch 不冒充正式版本号。
- 日期与读图边界：区分初发、权重公开、GA、仓库创建、研究披露和产品提速。较早的 OpenAI Sol/Luna 博文图、Step 5、SemanTok 单列关联或日期边界，不与当期分数混算；Voxtral Arabic 仅证实仓库创建日期。Mistral 法律图 404、Step 完整评测页超时、未发现图表及尚未确证线索均如实说明。官方内部评测/延迟/价格/组合指标不伪装成独立公开题库，不编造样例或分数。
- 验证与影响：四份 manifest 和合并 JSON 可解析；图像解码/原始 SVG XML、路径与内容校验另见交付清单。使用临时本地静态图册服务检查图片加载、搜索与分组，结束前关闭标签和该临时服务。仅研究资料/日志变动，不修改 `content/`、`src/`、测试、依赖或工作流，因此未重复运行应用编译/业务测试。没有启动前后端开发服务，没有调用网页端 GPT，没有提交、推送或部署本轮研究；保留原有 README、推广素材和技能目录的未提交改动。
- 分发：仅将本次研究证据目录与报告副本打包为 `artifacts/2026-10-18-model-release-audit.zip`。该证据目录及 zip 沿用既有 Git 忽略规则，未强制暂存，也未改写 `.gitignore`。
- 最终清单：33 条型号/披露记录、129 个图像文件、300 条评测引用记录；图像数包括时间边界关联图，不等于新 benchmark 数。129 张均有实际视觉查看记录，全部解码及本地 HTTP SHA-256 核验通过。图册搜索/分组、特殊字符文件路径、xAI 三张成绩表/图加载正常，无页面横向溢出和控制台警告/错误。内嵌 SVG 脱离官网上下文无法独立显示时保留源片段，改用官方网页截图作图册预览，未改造原成绩图。

## 2026-10-18 — 评测更新已推送并通过线上显示验收

- 提交与推送：新增内容提交 `51974d8`（18 个已列明文件）及发布前日志提交 `95d593c`，已正常推送 `origin/main`；远端核对为 `95d593cf1b8c5cb79ff514ccf05c0e6843a76580`。既有 6 个界面提交随祖先历史正常发布，README/推广素材/技能配置的未提交改动继续留在本地。
- 自动部署：[GitHub Actions 39136996029](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/39136996029) 对应上述精确 SHA，build、deploy 均为 success；工作流于北京时间 2026-10-18 22:40:37 完成。此处记载实际已完成的内容发布；本条验收日志单独提交推送后会按现有配置再次触发同内容构建，最终流水线结果在交付时另行核对。
- HTTP 与资产：线上四个 MAI 详情、ZeroBench Main、AutomationBench、发布索引及两份新增 Logo 均为 HTTP 200。ZeroBench PNG 与本地源字节一致；MAI SVG 线上为 LF、本地为 CRLF，规范换行后完全一致（1897/1901 bytes），不是路径丢失或标识变化。
- 实际浏览器：公开站点首页为 156 项评测、149 条样例。搜索 Microsoft MAI 恰有四项、共用官网 MAI 图像，四项日期均为 2026年10月15日；四个详情明确内部评测、题目未公开、结构官方未公开，不生成样例。1280px 桌面与 390px 手机检查无整页横向溢出，手机四项 Logo 与标题间距为 15px，无重叠。
- ZeroBench/AutomationBench：两项截图别名搜索均唯一命中正确条目；ZeroBench v3 显示 2025年12月23日、受控访问和公开答案限制，官方 Logo 在桌面/手机卡片、列表及详情正常加载；手机明暗外观正常。AutomationBench 显示 1.0.6 与 2026年7月31日，原有公开 simple 样例加载成功。
- 发布资料：DeepSeek 2026-10-17 资料链接 10 项并保留 Apex 未确认说明、工具条件和 Pass@5；MAI 2026-10-15 资料链接四项并说明报告日期/数据披露边界。相关页面无浏览器控制台警告或错误。线上首次直达页面曾等待导航超时，随后读取确认目标页面已经成功显示，后续跳转正常；未据此修改代码或配置。
- 验收记录：桌面 MAI、桌面 ZeroBench、手机 ZeroBench 截图及核验 JSON 保存在本任务 Codex 可视化目录 `2026/10/16/01a14391-64c0-7622-bc39-139e3ee727af`，不混入源码提交。恢复临时外观及视口；本轮没有启动前后端开发服务或临时预览。
- 影响：本次收尾仅更新本日志，不修改应用、评测、依赖或部署配置；发布实现与构建内容不变。

## 2026-10-18 — 授权提交并发布评测更新（发布前检查）

- 原因与原则：用户明确授权将本次更新提交推送至 GitHub、等待自动部署并检查线上显示。遵循最简范围、保留既有历史与明确区分本机构建/实际上线的原则，不使用网页端 GPT。
- 提交范围：四个 `content/benchmarks/mai-held-out-*.json`、`zerobench-main.json`、`automationbench.json`，共享 `content/brands.json` 与 `content/releases.json`，`content/assets/logos/microsoft-ai.svg` 与 `zerobench.png`，`src/content/schema.ts`、`src/components/BenchmarkCard.vue`、`src/views/DetailView.vue`、`src/styles/detail.css`、`tests/content.test.ts`、`docs/CONTENT_MAINTENANCE.md` 和 2026-10-16/17 两份研究记录，共 18 个内容/实现/研究文件；更新日志独立提交。保留 README、推广素材、技能目录及相关文件的未提交改动。
- 分支与历史：目标为 `origin/main`（`https://github.com/WhitePlusMS/whats-a-benchmark.git`）。fetch 后本地领先 6、落后 0；e89dba6、1f3e823、6f8fe19、e456421、1433605、d0bdf75 为既有本地界面/主题/图标/字体/搜索提交，正常推送会包含这些祖先提交，不改写、不强推。
- 验证：内容校验通过 156 项评测、149 条样例与 19 份发布资料；45 项测试全部通过。以 `BASE_PATH=/whats-a-benchmark/` 和真实站点地址执行严格 TypeScript 与完整生产构建，通过 161 个静态页面及 GitHub Pages 404 检查；保留既有 Vite 大包提示。Luna 只读盘点文件与证据，主任务复核范围；无新增依赖、工作流变更或开发服务。
- 暂存检查：清理 DeepSeek 研究记录日期行的 Markdown 行尾空格，正文不变；对包括新增文件的暂存差异重新检查空白。
- 发布步骤：先提交已核实的评测/显示更新及本日志，再正常推送 main；以该提交 SHA 对照 GitHub Actions 的 build/deploy 结果，成功后实际检查公开站点。此段只记录发布前结果，部署与线上显示结果待完成后补记。

## 2026-10-18 — 核查 GitHub 推送与 Pages 部署状态

- 原因与原则：用户要求确认新增评测是否已推送并自动部署。本轮只读核对本地 Git、远端分支、GitHub Actions 与线上地址，仅补记本日志，不执行提交、推送或部署。
- 本地状态：`main` 的 HEAD 为 `d0bdf75fe9077e0c77c5e43e00c2a6b5cc68d8b6`；ZeroBench、微软四项内部评测、Logo、发布资料及相关页面改动仍有未提交文件。远端 `main` 为 `23074223169cd21e26b63b4ef695fc022007050d`，不能将本地构建通过视为已上线。
- GitHub 证据：最新 main 工作流为 [run 37898607735](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/37898607735)，对应远端上述提交。build 与 deploy 均成功，deploy 完成于北京时间 2026-10-09 15:22:46。现有 `.github/workflows/pages.yml` 配置为推送 main 后测试、构建并部署 Pages；本次新增内容尚未触发该流程。
- 线上核验：远端 `content/benchmarks/zerobench-main.json`、Pages 的 `/benchmarks/zerobench-main/` 和 `/benchmarks/mai-held-out-code/` 均返回 HTTP 404，确认本批新增条目尚未上线。公开 REST 请求遇到限流后，使用现有 GitHub 连接只读取得工作流和任务结果。
- 范围与影响：本轮仅更新本日志，无应用代码、评测内容或工作流改动；未启动服务，未重复运行编译或业务测试，保留所有既有工作区修改。

## 2026-10-17 — 核查 DeepSeek 1017 评测并补录 ZeroBench Main

- 原因与原则：用户要求确认并补齐截图中的评测。先按官方模型卡逐行对照，再核查评测发布者资料；沿用 JSON、共享品牌与发布索引，不凭近名合并、不编造样例，不调用网页端 GPT。
- `content/benchmarks/zerobench-main.json`：新增 100 道主问题 split 的条目，与 334 道子问题区分；版本为数据卡 v3，版本日期 2025-12-23，核验日期 2026-10-17。记录图文输入、答案判定、pass@1/pass@5/pass^5 区别、受控访问与答案披露/训练限制，不包含 sampleSet 或题库附件。DeepSeek 只披露 main、w/tools、Pass@5，所用具体数据修订保持未知。
- `content/assets/logos/zerobench.png`、`content/brands.json`：采用 ZeroBench 官方网页实际引用的 favicon/社交分享图，登记单一共享品牌和来源 URL，保留原始 PNG；图像未单独声明许可，不扩展为题库授权。
- `content/benchmarks/automationbench.json`：将通用 1.0 说明更新为已核实的 1.0.6，版本日期 2026-07-31，增加截图名称别名、固定提交 CHANGELOG 与方法差异证据。保留现有真实 simple 样例；不修改 AutomationBench-AA 私有实施条目或把 DeepSeek 分数记为 AA 成绩。
- `content/releases.json`：新增 DeepSeek-V4.1-Flash-1017（2026-10-17），链接 10 项已确认评测，保留 HLE 无工具/纯文本子集、TB4 Claude Code、DeepSWE Mini-SWE-V2、三项视觉评测 w/tools、ZeroBench Pass@5。Apex Bench v1.1 未确认对应 Mercor，发布卡如实注明未关联。
- `docs/research/2026-10-17-deepseek-flash-1017-coverage.md` 与 `artifacts/candidates/2026-10-17-zerobench/`：保存 11 行原表、固定修订、版本及运行条件、候选来源与证据缺口；未将基础版技术报告当作 1017 版全部配置。
- 影响：仅补充内容、品牌素材、研究记录与日志；不修改应用代码、依赖或部署配置，保留已有工作区改动。验证结果：严格 TypeScript、内容校验、全部 45 项测试和生产构建通过；156 项评测、149 条样例、19 份发布资料，构建核验 161 个静态页面及 GitHub Pages 404。保留既有 Vite 大包提示。
- 专项核对：ZeroBench 的别名唯一命中，AutomationBench 与 AA 分开，Apex Bench v1.1 不误命中 Mercor；新条目无 sampleSet 或生成样例 JSON，发布 Logo 与候选及源文件字节一致。除 AutomationBench 外，原有 154 项评测源文件哈希不变；既有 README/推广封面不变。
- 实际页面：临时生产预览 4181 检查 ZeroBench 1280px 桌面及 390px 手机详情、手机明暗外观、目录别名搜索、发布资料卡及 AutomationBench 日期/版本。Logo 加载、日期与 10 项关联正常，无整页横向溢出；手机标题与 Logo 间距 15px，控制台无警告或错误。恢复外观和视口、关闭检查标签并终止本轮临时预览；未启动开发服务、未提交推送或部署。

## 2026-10-16 — 为微软四项内部评测补充官网共享 MAI 标识

- 原因与原则：用户要求依据微软文章网页补齐 Logo，四项共用一个并检查显示。遵循最简、复用共享品牌和真实素材原则，增加官网标识及引用，并修复实际检查发现的详情标题布局问题；不更改评测内容、日期或样例。
- `content/assets/logos/microsoft-ai.svg`：从用户指定官方文章页眉的 `Home MAI link` 内联 SVG 提取横向 MAI 字标，保留原始 viewBox（56×26）和全部三个 path。原标识通过 currentColor 继承颜色；为独立图片补充官网实际计算颜色 `#5d524b`，不重绘、不替换轮廓。官网页眉实际底色为 `#fef9ed`。
- `content/brands.json`：登记唯一 `microsoft-ai` 共享品牌，使用 `wide: true` 和已核实的官网承载底色。`sourceUrl` 与 `assetUrl` 均指向原文，因为素材是页面内联 SVG，没有独立图片下载 URL；对应位置与取色依据在本日志记录。
- `content/benchmarks/mai-held-out-code.json`、`mai-held-out-qa.json`、`mai-held-out-stem.json`、`mai-held-out-math.json`：仅将 `brandIds` 从空数组改为 `["microsoft-ai"]`。现有 PublisherMarks 组件、生成与静态资源校验流程负责目录和详情显示，不新增重复映射或单项专用样式。
- `src/styles/detail.css`：390px 手机实际检查发现横向标识的外层可收缩、内层固定 84px，导致 Logo 越过容器与标题重叠。仅为详情标题行的标识设 `flex-shrink: 0`，为标题文字容器设 `min-width: 0`，让文字在剩余空间换行；复用所有品牌的公共详情布局，不改 Logo 组件及各项独立样式。
- 验证结果：严格 TypeScript 与生产构建通过，继续生成 155 项评测并核验 160 个静态页面和 GitHub Pages 404。四项除 brandIds 外的全部解析字段 SHA-256 与本轮开始时一致；源素材、生成目录和 dist 中的 SVG SHA-256 均为 `3BB3A55071C74762ABB073A55DA2867FB8E7A00DC41D7B0B5F8F36031D543F98`。JSON 格式、引用与差异空白检查通过；CSS 只增加必要布局约束，不对旧样式全文重排。
- 实际页面：复用已有 4173 本机预览服务，检查桌面与 390px 手机的卡片、列表、详情和浅/深色外观；四项图片均加载成功且指向同一路径，使用 contain 保持比例。修复后四项手机详情的标识与标题间距均为 13px，桌面为 18px，无重叠或横向溢出；CMMLU、GPQA Diamond 两个已有详情也通过手机布局回查，浏览器无警告或错误。临时视口与外观选择恢复后关闭检查标签。
- 范围与收尾：仅增加共享素材/品牌、四项引用和上述详情公共布局修正；本轮未新增或运行重复的业务测试，验证覆盖编译、构建、资产一致性及实际浏览器显示。未调用网页端 GPT、提交推送或部署，未启动前后端开发服务，保留已有工作区修改。

## 2026-10-16 — 收录微软四项内部预训练评测并显示版本发布日期

- 原因与原则：用户授权收录 Held-Out Code、QA、STEM、Math，要求如实标明微软内部评测、未公开内容、不编造样例，并将发布日期精确到年月日。沿用单条 JSON 内容源、共享 schema 和现有页面，遵循最简、严格类型和有据表述原则。
- `content/benchmarks/mai-held-out-code.json`、`mai-held-out-qa.json`、`mai-held-out-stem.json`、`mai-held-out-math.json`：新增四个 published / internal 条目，分别归入编程、知识、数理分类；发布方均为 Microsoft AI / 微软，指标为 BPB（越低越好）。数据访问和样例状态均为 private，结构为 not-public，题量、划分、字段和文件列表留空，复用许可记录为 unknown；不添加 `sampleSet`、样题、附件、虚构访问入口或模型分数。
- 四项版本均限定为 MAI-Base-2 报告，`releaseDate` 为官方报告的 2026-10-15，`verifiedAt` / `updatedAt` 为实际核验编辑日 2026-10-16。版本说明明确报告日期不等于内部评测首次启用日期，前代同名评测的数据版本对应关系未确认；前代 YOLO / 题目解答类型仅放在核验背景，未冒充本次题集规范。复用现有发布方文字显示，未添加未经核验的 Logo。
- `content/releases.json`：新增 MAI-Base-2 预训练报告资料，记录精确日期并关联上述四项，注明数据来源、后训练检查点比较及未公开边界。
- `src/content/schema.ts`：新增可选 `releaseDate`，复用真实 ISO 日期校验；其语义为当前版本发布日期，只有年份证据的其他条目不补造月日。`src/components/BenchmarkCard.vue`、`src/views/DetailView.vue`：有日期时复用 `formatDate` 显示年月日和语义化 time，详情标签为“版本发布日期”；其他条目继续显示已有年份。对 not-public 数据画像的缺失栏目显示“官方未公开”，避免误写成本站尚未整理。
- `docs/CONTENT_MAINTENANCE.md`：补充版本发布日期的填写、证据和展示规则。`tests/content.test.ts`：扩充原有更新投影与严格日期测试，检查精确日期在生成目录中保留，并拒绝 2026-02-30 等不存在的日期。
- 验证结果：内容生成与完整 `npm run typecheck` 通过，公开条目为 155 项；全部 45 项测试通过；生产构建通过并核验 160 个静态页面及 GitHub Pages 404。首次检查出现的 V8 Zone 内存错误在单独编译与后续完整检查中均未复现；未修改运行时或系统配置。Vite 仍提示现有主包超过 500 kB，未扩大为本轮优化任务。
- 专项核对：四项源文件均没有 `sampleSet`，生成目录均为 `sampleCount: 0` 且无对应样例 JSON；结构数组保持空值、许可 unknown、访问 private；原有 17 份发布资料的解析内容逐条未变，新增报告后为 18 份。只保留相关代码与文档的必要差异，撤销了格式化工具对旧内容的无关重排。
- 实际页面：复用已在运行的本机 4173 预览服务检查生产构建；搜索 Microsoft MAI 恰有四项，卡片、四项详情与关联报告均显示 2026年10月15日。四个详情均显示题目未公开与官方未公开的结构栏目，桌面无横向溢出，当前应用页面无新增浏览器错误或警告；未进行手机专项或线上部署验收。
- 范围与收尾：保留本轮之前的 README、推广素材等工作区修改；不调用网页端 GPT，不提交、推送或部署，不启动前后端开发服务。

## 2026-10-16 — 微软 MAI 内部留出评测公开资料核查

- 原因与原则：用户要求寻找 Frontier Pre-training at Microsoft AI 文章中四组 benchmark 的详细内容。遵循最简与可验证来源原则，区分新报告明确披露、前代报告补充和未公开信息；不据相似名称或二手报道推定题集身份。
- `docs/research/2026-10-16-microsoft-mai-held-out-evaluations.md`：新增第一方来源研究记录，覆盖 Held-Out Code、QA、STEM、Math 的数据来源、BPB/NLL 评分、前代技术报告中的内容类型，以及题量、样例、许可、评估脚本和下载入口的检索边界；附官方链接、报告节号及页码。明确前代说明不能证明本次使用完全相同的数据版本，YOLO 指 MAI 自研训练框架。
- 影响：仅新增研究记录并更新本日志，不新增正式评测条目或样例，不改应用代码、生成目录、依赖或部署配置；保留工作区已有修改。未找到公开入口表示本轮检索结果，不作为永久未公开的断言。
- 核验：对照微软原文、13 页 PDF 与前代 MAI-Thinking-1 技术报告；检索对应评测名及微软官方 GitHub / Hugging Face 数据集入口。研究报告经 Prettier 整理并通过格式检查，日志差异空白检查通过。仅文档变更，未运行编译、业务测试或生产构建；未启动服务、调用网页端 GPT、提交或推送。

## 2026-10-14 — oil-cover Agent 自主模式三画幅推广封面

- 原因与原则：用户明确要求 oil-cover Agent 自主模式、复用现有素材、最小改动且不夸大功能。只新增推广图片和配套生成记录，保留已有 README、SVG、应用代码、内容与工作区修改。
- 素材与表达：使用现有 `artifacts/screenshots/2026-10-09-readme-home.jpg`，以真实 HumanEval / SWE-bench Verified 任务卡片说明用途；项目原始书本标识从 `public/favicon.svg` 转成参考 PNG。主标题“到底测什么？”，副标题“任务 · 样例 · 评分”，不加入实测、跑分、排名或覆盖承诺；未启用创作者头像。
- `artifacts/screenshots/2026-10-09-readme-home.oil-cover/`：新增分析、封面方案、三份完整提示词和 Logo 参考图；生图前先保存 sidecar，按 3:4、4:3、16:9 分别调用内置 imagegen，不使用外部服务 Key、不修改用户默认配置或全局技能文件。
- 最终图片：在同一截图目录新增 `2026-10-09-readme-home_3x4.png`（1086×1448，1,773,631 字节）、`2026-10-09-readme-home_4x3.png`（1448×1086，1,699,730 字节）、`2026-10-09-readme-home_16x9.png`（1672×941，1,596,162 字节）；前两版比例精确，宽横版为内置工具的整数像素近似 16:9，原样交付，不本地裁切。
- 生成记录：工作目录保留三张无人物底图和 `generation-record.json`，记录工具实际返回的保存路径提示、尺寸、来源、提示词哈希和逐图检查；`cover_plan.md` 列出最终图片、实际比例和使用范围。HumanEval 卡片保留截图内的发布方标识，不作为外层联合品牌；项目书本 Logo 由模型重绘，非像素级复制。
- 检查结果：三张最终 PNG 完整解码，复制后的文件与原始工具输出/底图 SHA-256 一致。逐图查看确认主标题可读、任务名称和介绍对应现有截图、无人物、虚构成绩或功能夸大；两版 README、SVG、营销上下文和推广文稿哈希均未变化。严格 TypeScript、sidecar 文档/JSON 格式与 Git 差异空白检查通过，三张最终图、底图和提示词均存在。
- 影响与边界：只新增推广封面及 sidecar，并更新本日志；生成图是推广重构图，不作为网站原始截图或模型实测证据。不使用本地贴字、贴 Logo、拼图、裁切或视觉修补；本轮不启动服务、不调用网页端 GPT、不提交、推送或外发。

## 2026-10-14 — 项目定位、推广文稿与双语 README / SVG 封面完善

- 原因与原则：用户要求使用 product-marketing 梳理定位、目标读者和核心卖点，再结合 oil-tone 优化推广文稿与 README/SVG。遵循最简、真实功能与文案一致、双语同步原则；必要的大量源码搜索与完整阅读由 GPT-6 LUNA 执行，仅收集描述，主代理复核最终表述。
- `.agents/product-marketing.md`：新增 v1 营销上下文，记录中文 AI 评测资料库定位、主次目标读者、任务/评分条件/官方来源三个价值主题、使用场景、边界与证据。受众、痛点与传播目标明确标为工作假设；没有虚构客户、访谈、收入、口碑或增长数据。
- `docs/PROMOTION.md`：项目没有现成独立推广稿，新增通用介绍与短版文稿。以阅读模型报告为场景，使用 HumanEval 说明实际功能，保留网站和仓库入口；按 oil-tone 避免夸大能力、虚构开发经历或贬低第三方产品。
- `README.md`、`README_ZH.md`：同步增加目标读者和真实例子，按任务/评分条件/关系与来源组织价值说明，保留网站入口、真实首页截图、搜索与对比分享、来源及反馈。明确中文界面、按条目提供的样例、不执行评测和不生成统一模型排行榜，不加入开发命令或内部审计细节。
- `assets/readme/hero.svg`：改为 1200×580 的静态资料页构图，复用书本轮廓和鸢尾紫，用 HumanEval/0 的输入、阈值、预期结果及 pass@k 表现阅读内容；包含 title/desc 与分组注释。两版 README 直接展示 SVG，使本轮文案与封面一致；既有 GIF 与动画规范作为历史素材保留，本轮未制作新动画。
- 事实核对：当前作者源与生成目录一致，共 151 项已发布评测、10 类能力、149 条站内样例记录分布于 138 个条目、17 组发布资料；公开文稿不以易过期的数量为卖点。修改前严格 TypeScript 通过，公开页面可访问并显示同样的目录数量。
- `docs/reviews/2026-10-14-marketing-readme-review.md`：保存定位与功能证据、数量口径、素材/链接验证、实际浏览器检查及交付边界；新增独立 HTML 预览与 PNG 仅保存在本轮 Codex 可视化目录，不进入应用或部署。
- 验证结果：修改后严格 TypeScript、四份成稿 Markdown 格式、两版 README 与推广稿的 oil-tone、README 素材审计和 Git 差异空白检查通过。每版各 3 个本地引用存在，5 个外部地址 GET 均为 200；SVG XML、可访问名称、静态资源检查及 900/360 px 渲染通过。
- 实际浏览器：中英文×桌面/手机×明暗共 8 组均为单 H1、图片加载成功、无横向溢出或意外 Markdown 标记；推广稿手机深色预览正常；控制台无警告/错误。正文完整提供封面例题细节，手机图片无需承担唯一说明。审核记录保留外部框/实际文档宽度，未将预览说成线上发布验收。
- 环境收尾：临时服务已终止，端口 7350 无监听；浏览器检查标签已关闭、临时视口已恢复。未启动前后端开发服务、未调用网页端 GPT；本轮未重新执行完整业务测试或生产构建。范围仅为文案与视觉素材，未提交、推送或外发。

## 2026-10-09 — 授权提交与推送 README 更新

- 原因与原则：用户明确要求“推送吧，到 git”；将已确认的中英文 README、真实截图、GIF Hero 及审核记录作为同一项文档更新提交，遵循最简、保留既有历史和明确授权原则。
- 提交文件：`README.md`、`README_ZH.md`、`artifacts/screenshots/2026-10-09-readme-home.jpg`、`assets/readme/hero.svg`、`assets/readme/hero.gif`、`assets/readme/hero-motion.json`、`docs/reviews/2026-10-09-readme-review.md`、`UPDATE_LOG.md`，共 8 个文件。
- 文档补充：本日志记录授权、目标和提交范围；审核记录明确其中的远端页面观察与未推送状态属于提交前快照，保留原始检查结果。
- 远端核对：拉取远端引用后，本地 `main` 与 `origin/main` 一致（领先 0、落后 0），目标为 `https://github.com/WhitePlusMS/whats-a-benchmark.git`；没有其他暂存改动或待发布的本地提交。
- 验证依据：此前的严格 TypeScript、两版 README 素材/链接审计、Markdown 格式和 7 个实际浏览器视图均已通过；本轮提交前再核对文档格式、图片引用及暂存范围。
- 发布方式与影响：使用现有 `main` 分支正常提交和推送，不强制推送；现有 Pages 工作流由 `main` 推送自动触发。没有应用代码、评测数据、依赖或工作流改动，没有启动开发服务或额外执行本地生产构建。

## 2026-10-09 — 接入 GIF Hero 并全文审核中英文 README

- 原因与原则：用户先确认将 Hero 加入 README，随后明确要求调用 `beautify-github-readme` 全文审核并更新；在现有介绍方向上按项目价值、真实预览、功能、在线使用、资料来源与反馈组织内容，沿用既有素材和最简原则。
- `README.md`、`README_ZH.md`：将已确认的 `assets/readme/hero.gif` 接入顶部，并链接用户指定的 GitHub Pages 地址；保留可搜索的 Markdown 标题和简介，补充静态封面链接及有意义的图片替代文字。真实首页截图前移，移除开头手写目录，功能长表改为手机上易读的列表；明确样例媒体与参考答案按条目提供，保留中文界面、原始材料语言、免登录和来源标注说明。
- 来源核对：代码搜索与功能证据由 GPT6 Luna 只读提取，主代理核对表述；能力分类核对 `content/categories.json`，已确认网站、Issues 和维护者三个外部地址均返回 HTTP 200。素材使用用户刚确认的 GIF/SVG，没有新建或替换视觉风格。
- `docs/reviews/2026-10-09-readme-review.md`：新增完整审核记录，保存最终调整、功能表述的本地依据、样例条件、链接与结构结果、真实浏览器验证和发布边界；另记录公开仓库独立 About 文案仍写 84 项，此次未修改仓库设置。
- 渲染修正：实际 GFM 预览发现中文简介的加粗标记与后文紧邻而显示星号，去掉这处多余强调；两版复验均无意外标记。其余标题与正文保持可搜索、可复制，图片有有意义的替代文字。
- 完整验证：技能素材审计两版均通过（各 2 个本地图片），语言切换、静态封面和全部本地文件目标存在；各 1 个 H1、6 个正文章节，没有长段落表格或非必要脚本/iframe/object。三个外部地址 GET 均为 200，严格 TypeScript、Markdown 格式及 git diff --check 通过。
- 实际浏览器：核对中英文桌面/手机、中文手机正文与功能区、深色桌面，共 7 个视图；桌面 Hero 为 900px，手机视口 390px（实际图片约 343px），所有页面 scrollWidth=clientWidth，无整页横向溢出，动图与首页图片全部加载/解码成功。临时预览及记录保存于既有忽略目录 `artifacts/candidates/readme-review-20261009/`。
- 环境收尾：本轮仅使用临时 Markdown 预览服务，现已终止并确认端口 7340 关闭；临时标签已关闭、视口已恢复。没有启动前后端开发服务；本地 GFM 预览不等于已推送后的 GitHub 页面验收。
- 范围：仅 README 与文档更新，保留此前已有的未提交修改；不改应用实现、不启动前后端开发服务、不提交、推送或发布。

## 2026-10-09 — animated GIF Hero 素材制作与预览（仅素材，已完成）

- 原因与原则：用户明确调用 `beautify-github-readme`，要求保持 README 不变，仅制作一个 animated GIF Hero 并保留 SVG 源文件，先展示渲染预览；沿用现有项目视觉和真实内容，遵循最简与范围约束。
- `assets/readme/hero.svg`：新增 1200×420 的静态可编辑源文件，复用现有书本轮廓、鸢尾紫和界面文字/背景色，采用展开的书页构图；项目名称和定位固定展示，以真实 HumanEval/0 节选和 pass@k 字段说明任务、样例与评分，不虚构模型成绩或评测执行。
- `assets/readme/hero-motion.json`：记录设计依据、配色、文字与形状、来源及三个动画层的时间轴；指定 30 FPS、5.4 秒、256 色、稳定透明边界，三层依次进入后静止阅读，再共同退出形成循环。
- `assets/readme/hero.gif`：新增 1200×420、5.4 秒的循环动图，共 495,293 字节（约 484 KiB）；30 FPS 源时间轴生成 162 帧，编码时合并相同停留帧，实际 GIF 为 77 个编码帧，播放时长保持 5,400 毫秒。
- 渲染方式：复用技能 `render_motion_gif.py` 的分层抽取、祖先样式、缓出时间轴和透明轮廓检查；本机未提供独立 ffmpeg/rsvg-convert 命令，因此临时适配器使用已有的 bundled sharp/librsvg 渲染 SVG、已有 Pillow 编码共享调色板 GIF。没有安装依赖、修改技能脚本或在项目中新增运行逻辑，素材依然保留标准 SVG 和动画规范。
- 视觉检查：已查看进入、完整停留、退出、循环边界，以及 900px/360px、浅色/深色背景预览；项目名称、关键标签和书页主体可辨，中文文字没有裁切。手机宽度下右页例题细节属于辅助内容，项目名称与“任务·样例·评分”保留主要信息。
- 数据与循环验证：实际题目节选和 pass@k 均核对仓库字段；70 个停留源帧逐字节哈希相同，GIF 解码后的停留帧 RGBA 字节相同；源帧与 GIF 的首尾 RGBA 字节均完全相同，全部编码帧的透明轮廓一致、四角均透明。SVG XML、动画层 ID、安全标签/资源检查、动画 JSON 格式和 `git diff --check` 均通过，严格 TypeScript 检查通过。
- 验证资料：静态稿、阶段帧、宽窄/明暗预览和 `validation.json` 保存于本机临时目录 `C:\Users\admin\AppData\Local\Temp\readme-hero-e947520b28074d4ab0699771718e9f38`；正式交付仅为 `hero.svg`、`hero.gif` 和 `hero-motion.json` 三个素材文件。
- 范围核对：两份 README 与本轮开始时的 SHA-256 完全一致（英文 `94C9B4DD4E44B4EBA10B2E145624FACC29FF661580ECDB8D811296345FA91F1B`；中文 `749EF4B07B5CC64E0085A87B858967236E74DD111C3D4AC5E55C3D202E120317`），没有插入素材或改变链接，保留此前已有未提交修改。本轮未启动服务、未生产构建、未提交、推送或发布。

## 2026-10-09 — 安装 beautify-github-readme 技能

- 原因与原则：用户明确要求安装 `oil-oil/beautify-github-readme`；复用 Codex 已有 skill-installer 安装流程，不另外安装一套管理工具。
- 来源与位置：通过官方本地安装脚本，从 [oil-oil/beautify-github-readme](https://github.com/oil-oil/beautify-github-readme) 的 `main` 分支、`skills/beautify-github-readme` 目录安装到 `C:\Users\admin\.codex\skills\beautify-github-readme`。
- 文件范围：全局技能目录新增 12 个文件，包含 `SKILL.md`、`agents/openai.yaml`、2 个配套 Python 脚本和 8 份参考文档；项目内只在 `UPDATE_LOG.md` 新增本节记录，保留此前 README 和截图改动。
- 功能说明：技能提供整篇 README 整理与美化、仅生成视觉素材两种模式；要求依据真实项目材料，不虚构功能，提交、推送、PR 或发布须遵守用户明确授权。
- 验证：安装脚本退出码为 0；已完整读取入口说明，技能名称匹配，8 份唯一引用文档与 3 个必需配套文件均存在，安装总文件数为 12。安装后从下一条消息起可使用 `$beautify-github-readme`；本轮未执行该技能的美化流程、未运行配套脚本或服务、未提交或推送。

## 2026-10-09 — 按常见 GitHub README 结构整理并突出网站入口

- 原因与原则：用户要求加入并突出自己的 GitHub Pages 链接，同时参考其他项目的 README 格式；遵循最简和项目介绍优先原则，采用清楚的 Markdown 标题、目录、图片、功能表和链接组织内容。
- 参考资料：[GitHub 官方 README 说明](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)、[Immich README](https://github.com/immich-app/immich/blob/main/README.md)、[LobeHub README](https://github.com/lobehub/lobehub/blob/main/README.md)。参考项目介绍、在线入口、目录、功能及反馈信息的组织方式，没有复制其他项目的文案或素材。
- `README.md`、`README_ZH.md`：在标题与语言切换下方单独列出完整网站地址 `https://whiteplusms.github.io/whats-a-benchmark`，使用方式中也链接同一地址；同步整理为目录、项目简介、页面预览、主要功能、使用方式、资料来源、参与贡献，功能改用便于阅读的表格，补充 GitHub Issues 反馈入口及维护者链接。继续介绍项目用途和实际功能，没有重新加入技术栈、开发命令、构建或部署教程。
- `artifacts/screenshots/2026-10-09-readme-home.jpg`：新增真实公开网站首页截图，展示当前项目名称、目录搜索、能力分类及评测卡片，供两版 README 共用；使用仓库相对图片路径，不复用带旧项目名的历史首页截图，不生成或加工界面图。
- `UPDATE_LOG.md`：新增本节，记录本次结构调整、参考出处、入口与截图来源、修改影响和验证结果。
- 影响：只修改两份 README、更新日志并新增一张预览图，网站功能、评测源数据、依赖及部署配置未变。网站链接从语言切换行中独立出来，读者可直接识别和点击完整地址。
- 验证：用户指定的网站地址 HTTP 200，实际浏览器打开后确认当前公开首页并保存截图；严格 TypeScript 检查通过；两版 README 的 Prettier 格式检查通过，12 个目录锚点、4 个本地文档/图片引用均有效，每版均包含 2 个完全匹配用户地址的链接，技术内容残留检查与 `git diff --check` 通过。本轮未启动服务、未运行生产构建或业务测试、未提交或推送；README 调整仍为本地文件修改。

## 2026-10-09 — 中英文 README 改为项目介绍

- 原因与原则：用户指出 README 混入过多技术细节，要求只介绍项目；遵循最简、文档与实际功能一致原则，让仓库首页面向希望了解项目的读者。
- `README.md`：重写英文介绍，说明项目用途、面向读者、评测介绍、具体样例、评分方法、版本对比、官方资料、阅读指南与浏览步骤；保留资料标注和网站语言说明，增加沿用项目现有记录的在线浏览入口。
- `README_ZH.md`：同步对应中文介绍，与英文版保持相同的内容结构及语言切换链接；用读者视角介绍实际可浏览的内容，不把双语 README 描述为英文网站界面。
- 两版删除：内部覆盖统计与审计过程、运行环境与安装命令、开发/测试/构建命令表、目录结构、技术栈与数据生成实现、内容维护命令、部署步骤和环境变量、面向开发者的操作要求及技术文档索引。资料来源与样例说明收为简短介绍，不再展开内部维护和许可核对流程。
- `UPDATE_LOG.md`：新增本节，记录修改文件、原因、具体删改内容、影响与验证结果，保留既有历史记录。
- 影响：只调整项目介绍文档；应用功能、评测源数据、依赖和部署配置没有修改。中英文版均提供在线浏览入口，说明网站当前使用简体中文、原始样例保留来源语言。
- 验证：`npm run typecheck` 通过（生成 151 个公开条目后执行严格 TypeScript 检查）；两版 README 的 Prettier 格式检查通过，2 个本地语言切换链接目标均存在，技术内容残留检查与 `git diff --check` 通过。本轮未启动服务、未运行业务测试或生产构建、未提交或推送；线上入口沿用既有记录，本轮未重新进行线上验收。

## 2026-10-09 — GitHub Pages应用发布完成与线上验收

- 提交与推送：61909a7c768b56685c98627a6bfa235302154c48（feat(benchmarks): 补齐评测图片标识并优化占位展示）已正常推送origin/main；已有3个本地提交通过ff-only保留历史并一并发布。推送后本地HEAD与git ls-remote的main一致，工作区干净。
- GitHub结果：[Actions 37886898415](https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/37886898415)的head_sha精确对应61909a7，npm test、生产build、Pages产物上传及deploy均success；github-pages部署6953412375最新状态success，环境URL为https://whiteplusms.github.io/whats-a-benchmark/。
- 提交内容核对：26项benchmark只改变brandIds，其他解析字段逐条不变；21份新增原素材的暂存Git对象与下载文件SHA逐条一致。修正暂存时Windows换行格式造成的差异放大，未混入整文件格式修改；原始SVG的CRLF保留，使用cr-at-eol检查原文件，实际新增代码/文档无尾部空白错误。
- 线上资源：21/21份新增素材HTTP 200，其SHA-256与61909a7内的文件逐条一致。线上比对以已发布Git对象为准，避免本地checkout把部分SVG的LF转换为CRLF而误判成部署差异。
- 实际浏览器：公开首页显示151评测、10类能力、149条记录；151个标识容器、156张图片均已解码，加载失败0、文字回退0。DataCurve标识及DeepSWE详情和任务案例加载正常，详情可直接刷新；LongBench能切换原始JSON节选，显示_id/input两字段并更新sampleView=raw URL。抽查过程中浏览器error日志为空，不将此抽查扩大为全部样例的逐项语义验收。
- 验收资料：本节更新UPDATE_LOG.md；新增artifacts/screenshots/2026-10-09-pages-datacurve.jpg，保存当前线上页面的原生IAB截图。此阶段只补充发布证据，无应用代码变动；沿用原有GitHub Actions发布流程。
- 后续交付核对：本验收资料单独提交并正常推送main；交付前再核对最终文档提交对应的Actions及github-pages部署成功。最终提交/运行/部署回执保存到本地artifacts/candidates/2026-10-09-pages-release-verification.json，按既有候选目录规则忽略，不引入运行时版本或第二套发布机制。本轮未启动前后端服务。

## 2026-10-09 — GitHub Pages发布前核对与生产构建

- 原因：用户明确要求提交、推送并确认GitHub已部署最新版本；复用现有main分支与Pages工作流，保留功能分支上的已有提交历史，不新增发布机制。
- 文件范围：本轮提交包含26项图片映射、21份原始素材、品牌登记、PublisherMarks毛玻璃回退与横向显示修正、Brand背景字段、来源/覆盖文档、实际浏览器截图及本更新日志；此前已提交的内容扩充、原始数据和界面改版随main快进一并发布。
- 远端核对：git fetch后origin/main为1f8d2fa，当前功能分支领先3个提交、落后0个；GitHub默认分支为main，Pages使用GitHub Actions，唯一现有工作流仅由main推送或手动运行触发。远端最近成功部署仍是旧提交1f8d2fa。
- 构建验证：使用BASE_PATH=/whats-a-benchmark/及SITE_URL=https://whiteplusms.github.io/whats-a-benchmark/执行npm run build，严格TypeScript通过，生成151条公开目录，SSG构建完成并核验156个静态页面及Pages 404。git diff --check通过；保留既有大包体积提示，不将warning称为失败。上一轮47项测试和内容校验已通过；发布工作流会再次运行现有测试及生产构建。
- 发布步骤：先提交当前已核对的改动，再将功能分支以ff-only合入main并正常推送；等待本次提交对应的build/deploy成功，随后核对公开页面、真实图片和案例资源。此时尚未执行推送或声称最新版本已上线。
- 环境边界：本轮不启动前后端服务，不修改Pages保护规则、工作流、依赖或版本机制；.generated、dist和候选审计仍按原有.gitignore处理。

## 2026-10-09 — 26项图片标识接入完成与验收

- 结果：缺图从26项降至0项，151/151条目有图片映射；新增21份原素材、复用3种已有品牌，登记素材58→79。26项除brandIds外的字段及sampleSet哈希逐条不变，21份源素材与生成文件SHA逐条一致。
- 文件与职责：`content/brands.json`登记21项及wide/必要背景；下表列出全部26份条目文件与21份原始素材。`src/content/schema.ts`只增加严格HEX可选背景字段，`src/components/PublisherMarks.vue`复用原容器底色与wide选择器，失败仍显示原毛玻璃文字。`artifacts/candidates/2026-10-09-logo-assets.json`保存来源、下载、哈希、采纳及验证证据；`docs/LOGO_SOURCES.md`和`docs/reviews/2026-10-09-logo-coverage.md`更新当前状态与身份边界；`artifacts/screenshots/2026-10-09-datacurve-logo.jpg`保存实际浏览器截图。

| 修改条目文件 | brandIds绑定 | 本地素材文件 | 图片类型 |
| --- | --- | --- | --- |
| content/benchmarks/agents-last-exam.json | agents-last-exam | content/assets/logos/agents-last-exam.png | 项目标识 |
| content/benchmarks/aime-2024.json | maa | content/assets/logos/maa.webp | 机构官方账户标识 |
| content/benchmarks/aime-2025.json | maa | content/assets/logos/maa.webp | 机构官方账户标识 |
| content/benchmarks/apex-agents.json | mercor | 复用mercor原素材 | 已注册发布方标识 |
| content/benchmarks/babyvision.json | babyvision | content/assets/logos/babyvision.png | 项目标识 |
| content/benchmarks/benchcad.json | benchcad | content/assets/logos/benchcad.svg | 项目标识 |
| content/benchmarks/browsecomp-zh.json | palin2018 | content/assets/logos/palin2018.png | 维护者账户identicon |
| content/benchmarks/cmmlu.json | cmmlu | content/assets/logos/cmmlu.jpg | 官方项目标题图 |
| content/benchmarks/critpt.json | critpt | content/assets/logos/critpt.png | 项目标识 |
| content/benchmarks/deep-swe-v1-1.json | datacurve | content/assets/logos/datacurve.png | 发布方标识 |
| content/benchmarks/gdp-pdf.json | surge-ai | 复用surge-ai原素材 | 已注册发布方标识 |
| content/benchmarks/gpqa.json | david-rein | content/assets/logos/david-rein.jpg | 维护者头像 |
| content/benchmarks/gpqa-diamond.json | david-rein | content/assets/logos/david-rein.jpg | 维护者头像 |
| content/benchmarks/ifbench.json | ai2 | content/assets/logos/ai2.png | 发布方网站标识 |
| content/benchmarks/livecodebench.json | livecodebench | content/assets/logos/livecodebench.svg | 官方项目网站图标 |
| content/benchmarks/livecodebench-pro.json | livecodebench-pro-maintainer | content/assets/logos/livecodebench-pro-maintainer.jpg | 维护者账户自选图片 |
| content/benchmarks/mind2web.json | osu-nlp-group | content/assets/logos/osu-nlp-group.jpg | 发布组织账户标识 |
| content/benchmarks/mmlu.json | dan-hendrycks | content/assets/logos/dan-hendrycks.jpg | 维护者头像 |
| content/benchmarks/nl2repo-bench.json | map | content/assets/logos/map.png | 发布组织账户标识 |
| content/benchmarks/officeqa-pro.json | officeqa | content/assets/logos/officeqa.png | 系列项目标识 |
| content/benchmarks/paperbench.json | openai | 复用openai原素材 | 已注册发布方标识 |
| content/benchmarks/scicode.json | scicode | content/assets/logos/scicode.png | 官方项目网站图标 |
| content/benchmarks/skillsbench.json | skillsbench | content/assets/logos/skillsbench.svg | 官方项目网站图标 |
| content/benchmarks/small-overlapping-speech-bench.json | laion | content/assets/logos/laion.svg | 发布方标识 |
| content/benchmarks/toolathlon-verified.json | toolathlon | content/assets/logos/toolathlon.svg | 项目标识 |
| content/benchmarks/vending-bench-2.json | andon-labs | content/assets/logos/andon-labs.svg | 发布方网站标识 |

- 验证：`npm run typecheck`通过并同步生成151项；`npm run validate`通过（151项、149样例、17报告）；既有测试47/47通过。浏览器目录有151个标识容器、156张已解码图片、文字回退0、加载失败0；列表wide缩略图44px、详情wide84px；DataCurve PNG及CritPt深底浅字已实际查看，390px小屏无横向溢出；当前浏览器错误日志为空。
- 来源边界：GPQA/Diamond、MMLU、BrowseComp-ZH、LiveCodeBench Pro这5项使用官方维护者身份图片，title/alt明确维护者，未称专属Logo；MAA使用官网明确认证账户的原标识；CMMLU为官方README标题图。未造图、未改原图色彩/比例、未借模型厂商品牌。
- 未做生产build、发布或提交。工具管理的临时Vite进程及验收页面已关闭，5173连接返回ECONNREFUSED；下载辅助脚本和临时验图文件已清理。验收进程仍有既有Vue Router `next()`弃用提示，未出现浏览器错误日志或标识加载失败。


## 2026-10-09 — 补齐26项Benchmark图片标识（过程记录，已完成）

- 原因：用户授权将上一轮盘点的26项缺图全部接入；沿用原有品牌登记、brandIds映射、内容生成和PublisherMarks展示。
- 文件：新增 `artifacts/candidates/2026-10-09-logo-assets.json`，逐项登记21种新素材的第一方来源、标识主体和类型，以及3项已有素材复用。待下载原始素材至 `content/assets/logos/`，再统一登记 `content/brands.json` 和26项条目映射。
- 来源边界：优先真实项目/发布方图形。GPQA及Diamond、MMLU、BrowseComp-ZH、LiveCodeBench Pro本轮只定位到官方维护者账户图片，按真实身份命名与登记；MAA使用其官网指南明确列出的机构官方账户原图，不称AIME专属Logo。排除Mind2Web空SVG、论文图表、第三方图库、被测模型厂商图标和自动社交缩略图。
- 当时状态：保存来源计划，尚未登记品牌或更新生成目录；不增加组件、依赖或第二套运行时映射。现已完成接入，最新状态见上节。
- 素材下载与检查：21份原文件已下载并记录GET状态、媒体类型、字节数、SHA-256；新增原文件合计2,697,500字节。Agents’ Last Exam官网.jpg链接误报JPEG、实际为PNG，改用官方仓库原PNG；未转换或重绘。15份栅格图已实际查看，SVG检查图形节点及主动/远程内容。
- 展示必要调整：`src/content/schema.ts` 的Brand增加可选六位HEX `background`，用于CritPt浅色透明字标；`src/components/PublisherMarks.vue`沿用既有标识容器设置该底色，图片失败时仍用原毛玻璃文字占位。提高既有wide选择器优先级，避免详情页large和移动端规则把横向Logo压成方形。没有新增组件或替代映射，`vue-tsc --noEmit`通过。
- wide覆盖仅对large详情容器提高优先级，保留目录列表视图原有44px缩略图覆盖；复用同一组宽度声明，不引入第二份样式实现。调整后 `vue-tsc --noEmit`再次通过。

## 2026-10-09 — Benchmark图片标识缺项统计与来源核查

- 原因：用户要求统计没有LOGO的benchmark，并指出DataCurve AI应有真实标识；先核对现状与官方来源。
- 文件：新增 `docs/reviews/2026-10-09-logo-coverage.md`，记录151项中125项有图片映射、26项为空、58种素材、引用资源缺失0项；包含26项完整名称、分类、发布方、第一方来源与图片线索。源条目与生成目录的brandIds逐项一致。
- 发现：10项已定位正式项目或发布方素材，其中PaperBench/OpenAI、GDP.pdf/Surge AI、APEX-Agents/Mercor这3项本地素材已存在但未绑定；DataCurve官网有真实SVG标识。另3项有官方站点图标线索、2项有MAA机构Logo指南但独立图片未核实、11项尚需确认。Mind2Web的200 SVG实际没有图形节点，不能当作可用素材；125项已配图片中包含5项已登记的作者头像/identicon，不统一称作专属Logo。
- 影响：本轮只写盘点报告和更新日志，未修改品牌注册、条目映射、图片素材、组件或生成数据；后续沿用现有brandIds/brands/PublisherMarks链路。
- 验证：读取当前内容与生成目录、检查引用文件存在；26项均核对第一方来源线索，新素材记录HEAD/GET状态与类型，DataCurve及站点SVG核对正文。未下载或接入新图、未进行所有图片的浏览器验图、未运行构建或启停服务。

## 2026-10-09 — 文字占位标识改为毛玻璃效果

- 原因：用户反馈黑色描边过于生硬，要求改为毛玻璃；按最简原则复用现有文字占位组件和主题变量。
- 文件：`src/components/PublisherMarks.vue`；`.publisher-name` 改用不透明度60%的主题表面底色、半透明浅色边缘、8px圆角、12px背景模糊及轻柔阴影。图片加载失败的 `.publisher-logo.is-fallback` 底色改为透明，让玻璃效果透出背景。
- 影响：目录与详情页中的发布方文字占位统一采用柔和的玻璃样式；占位尺寸和文字排版保持原有结构，正常图片标识的样式不变。
- 验证：`vue-tsc --noEmit`通过；本地浏览器核对LiveCodeBench Pro占位为60%半透明底、12px模糊和8px圆角，尺寸仍为110px × 46px，文字换行正常。现有5173预览服务保持运行，供用户审核。

## 2026-10-09 — 文字占位标识增加黑色细描边

- 原因：无Logo时的发布方文字占位缺少边界，按用户截图要求以最简样式修正。
- 文件：`src/components/PublisherMarks.vue`；复用已有 `.publisher-name`，增加 `1px solid #000` 边框、`4px 6px` 内边距及块状展示，不新增组件或分支。
- 影响：目录和详情页中无Logo、图片加载失败的文字占位统一显示细黑边框。
- 验证：`vue-tsc --noEmit`通过；实际浏览器中的LiveCodeBench Pro占位边框为`1px solid rgb(0, 0, 0)`，宽110px、高46px，文字正常换行。现有5173预览服务保持运行，供用户审核。

## 2026-10-09 — 原始来源投影恢复（进行中）

- 原因：用户要求来源节选展示真实原始数据的精简内容，便于核对任务结构。Root更新 `src/content/schema.ts` 与 `src/composables/sampleLoader.ts`，移除 editorial raw 只能为字符串和240字符上限的限制，同时仍要求 raw 非空；`src/components/SampleViewer.vue` 统一显示原始数据与来源节选，并保留媒体许可校验。`tests/sample-loader.test.ts`、`tests/sample-origin.test.ts` 覆盖原生结构接收及媒体/数据许可边界；`docs/LOCAL_SAMPLE_IMPORT.md` 同步模式说明。Root报告 `vue-tsc --noEmit` 通过、专项测试6/6通过。该改动允许按源格式展示结构，不改变许可状态。
- `artifacts/candidates/2026-10-08-raw-source-b.json`：本轮为其余范围逐项补录原生来源投影；覆盖真实JSON字段、网页/PDF任务标签与内容、Markdown/YAML/TOML原文块。包含LongBench v1固定revision行的 `_id`/`input`有限字段投影，以及Harbor DNA assembly、OfficeQA Pro UID0013、OSWorld 2.0 Task035、WANDR JSONL任务格式等事实；Terminal-Bench 4在既有投影中补入instruction.md真实JSON格式片段。逐项记录来源定位、SHA-256及省略范围，不伪造JSON、不补答案、不变更许可状态。EBR-Bench仅留官方页面查验事实，因当前已查页未定位逐题prompt或replay，不冒充题面已恢复；LongBench-v2未改，按root另行处理。
- `docs/research/2026-10-08-raw-source-b.md` 追加本阶段31项真实来源投影范围、原生内容示例与未定位字段边界。修改范围仅研究候选、研究说明和本日志，未修改正式benchmark样例/目录、共享代码或许可状态。复核JSON解析、候选ID唯一性、每项投影格式和已记录SHA长度；具体采纳/覆盖数字等待root最终核对。未运行服务、构建或测试，保留用户预览所需服务运行状态。
- 依据root对原始来源展示的复核意见，校正候选投影的节选范围与载体表达：artifacts/candidates/2026-10-08-raw-source-b.json 中 Terminal-Bench 2.1 保留来源原句及两条精确约束并省略另一约束；OfficeQA Pro UID0013仅保留图中标签和连续逐字短片段，不把解读转成伪JSON。检查所有native-blocks不含sourceFacts，原生块均有实际文本和来源路径；Terminal-Bench 4保留instruction.md中的原始JSON代码示例。docs/research/2026-10-08-raw-source-b.md 与本日志记录上述边界；EBR-Bench仍标为查验事实，未定位具体prompt/replay，不当作恢复了原题。原因是让界面展示可核对的源格式并清楚显示省略范围；仅候选与研究记录变化，许可和正式样例不变。仅做JSON解析与结构核对，未运行服务、构建或测试。

- 依root新核对要求，继续修正 `artifacts/candidates/2026-10-08-raw-source-b.json` 中7项原始投影：AutomationBench-AA改为Zapier公开finance任务源的实际cells键值；BrowseComp-ZH、BrowseComp、GDPval替换为官方图示/网页逐字题面或答案；GAIA使用Table 1真实列；OfficeQA逐字符核对Figure 3 SVG的ASCII连字符；RULER保留Table 2已核实的S-NIAH标签和Configuration单元格原值。`docs/research/2026-10-08-raw-source-b.md`同步原生路径、省略项和版本/成员边界。原因是修复旧投影中的摘要、拼接表值和未验证标点；影响限候选与审计文档，不改正式样例、分类或许可。

- Root于2026-10-09报告原始投影恢复完成：96/96条editorial案例按实际来源格式恢复（32项原生JSON字段、64项原文/表格/配置片段），既有53条source样例未改；核对记录见 `artifacts/2026-10-09-raw-data-adoption.json`。完整展示审计、统计与校验材料为 `docs/reviews/2026-10-09-raw-data-display.md`、`artifacts/2026-10-09-raw-data-summary.json` 和 `artifacts/2026-10-09-raw-data-validation.json`。Root更新 `docs/CONTENT_MAINTENANCE.md`、`docs/LOCAL_SAMPLE_IMPORT.md` 和旧覆盖报告，修正editorial原始投影旧限制说明。当前151个目录项、149条记录；139项详情可显示真实案例，仍有12项缺口，未称151项全覆盖。42个原Source条目的完整JSON SHA与2026-10-08快照逐条一致；138个生成样例文件/149条记录均与源sampleSet逐条一致。Root报告 `vue-tsc --noEmit`、`validate`（151/149/17）、全量47/47测试与 `git diff --check`通过。真实IAB核对确认LongBench的11个原始JSON字段与rawURL刷新、tau2嵌套actions/assertions值、Terminal-Bench 4原TOML及完整1739字符原JSON注释占位符代码块；未见样例加载错误。控制台有现有依赖路径触发的Vue Router `next()`弃用警告。HTTP页面和root数据均为200；用户授权保留5173预览服务运行。未做生产build或发布。

## 2026-10-08 — 全量评测真实案例补齐（进行中）

- 用户目标：151项已发布评测每项至少有1项真实、具体案例；开始盘点时已有25项、36例。
- 按 `coding/reasoning/knowledge` 46项、`agents/work/context` 50项、`writing/multimodal/alignment/general` 30项三组，依据官方公开事实开展取证；不改151项目录，不伪造私有数据，不把 `no-train` 自动视为披露禁令。
- 复用现有 `sampleSet`、`content/assets/` 与 `SampleViewer` 架构。取证候选记录为 `artifacts/candidates/2026-10-08-all-cases-a2.json`、`2026-10-08-all-cases-b2.json`、`2026-10-08-all-cases-c2.json`、`root-verified-records`，并形成 `docs/research/` 下三份审计记录。
- 取证展示接入基础已核验：`src/lib/sampleAccess.ts` 增加 `compositionSample`，只读取 `composition.items` 明确成员且具有本地 `sampleSet`/样例计数的成员；`DetailView.vue` 指数样例区域复用成员的 `SampleViewer` 并标示原评测名称和许可，同时保留组成评测链接；`tests/sample-access.test.ts` 覆盖成员缺失、无本地样例及普通关联不继承。理由是避免把组合评测或相关链接误当成其组成评测的题目；影响为仅明确组成成员的可用本地样例可在组合评测详情展示。`vue-tsc --noEmit` 已通过。AA组合评测四条真实案例已完成接入；后续日志项记录实际文件与验证。
- 第二批官方取证候选：`artifacts/candidates/2026-10-08-all-cases-b2.json` 增加 `excel-emb`、`finance-agent`、`finbenchmark`、`gaia`、`gdp-pdf`、`gdpval-aa-v2-1`、`gdpval-aa`、`gdpval`、`harvey-lab`、`healthbench-hard` 共10条；`docs/research/2026-10-08-all-cases-b.md` 增加对应来源事实、版本及许可边界和证据缺口。修改原因是逐条留存可复核的官方具体任务材料；影响仅为候选与审计文档扩充，不进入已发布评测目录或站内样例。JSON重新解析后共20项、第二批10项且ID无重复；未运行应用构建或服务。
- Root 已确认新增4条源记录样例：AA-Omniscience（CSV原行question_id=1，public 600条，Apache-2.0）、C-Eval（computer_network dev第0条，原选项/答案/解析，CC BY-NC-SA 4.0，数据卡固定版本一致）、MMLU（CAIS anatomy test第0条，MIT数据卡，格式为Parquet）、SimpleQA（OpenAI CSV首行，4,326行，保留metadata原始字符串，README标明benchmark MIT）。文件包括4项评测JSON、`content/assets/licenses/{id}-sample-source.txt`、`artifacts/candidates/2026-10-08-root-verified-records.json` 和 `artifacts/candidates/2026-10-08-all-cases-adoption.json`；root说明重新解析了固定源文件的原始记录并保存SHA。验证报告为 `vue-tsc --noEmit`、151项生成、151条内容校验、40条例样及17份报告内容校验、45/45测试通过；页面当前有29条本地样例和AA指数组成样例1条共30条可见，121页仍待补。
- Root 后续完成 `src/content/schema.ts`、`src/composables/sampleLoader.ts`、`src/components/SampleViewer.vue` 与 `tests/sample-loader.test.ts` 修改：为少数评测官方公开的具体任务演示增加 `promptOrigin="editorial"`，要求摘录必须来自真实来源、保留 `excerpt`，且 `raw` 为来源节选字符串，拒绝拼造原始记录对象；查看器显示“官方公开案例·本站解读”或“具体任务·本站根据官方案例整理”，并将原始数据标签调整为“来源节选”。原因是部分私有评测虽公开具体演示，但公开演示不等同整套题库或第三方附件授权；影响是展示范围与原始记录/题库许可范围分开标示，不扩大许可声明。新增3项畸形 editorial 回归（未标 excerpt、raw 为对象、非法 origin）；root报告 `vue-tsc --noEmit` 通过、专项测试5/5通过。以上为展示机制事实，不将尚未采纳的候选写成已完成案例。
- 第三批取证候选追加到 `artifacts/candidates/2026-10-08-all-cases-b2.json`：`healthbench-professional`、`healthbench`、`legal-research-vals`、`lhtb`、`lifescibench`、`longbench-v2`、`longbench`、`medcode`、`medscribe`、`mind2web` 共10项；`docs/research/2026-10-08-all-cases-b.md` 记录公开任务/记录、版本与许可范围及查找边界。已定位Legal Research P-001公开问题、LHTB LangChain迁移指令、LifeSciBench官方论文具体分析示例、LongBench-v2官方Rows API记录（_id `66fcffd9bb02136c067c94c5`，503行数据中的转换split首条）、MedScribe官方Sample Doctor-Patient Transcript及Mind2Web项目页示例任务；HealthBench系列按官方在线不披露请求不复制样例。LongBench v1的官方viewer/rows尝试返回404且官方文件树列出113,932,529字节全量包，本轮未下载；MedCode检查的Vals官方页未呈现可定位病例题面，均按有限查找范围记录缺口，不写作“无公开演示”。理由是批次留存每项可回查的一手事实和许可/缺失范围；影响仅候选与研究文档扩充，未进入正式内容或站内样例。结构复核为累计30项、30个唯一ID、第三批10项且必需字段/许可字段齐全；未运行服务、构建或测试。
- 第四批取证候选追加到 `artifacts/candidates/2026-10-08-all-cases-b2.json`：`mlcr-aa`、`officeqa-pro`、`osworld-2`、`osworld`、`paperbench`、`prbench`、`ruler`、`skillsbench`、`spreadsheetbench-v2`、`tau2-bench` 共10项；`docs/research/2026-10-08-all-cases-b.md` 增加对应来源事实、具体任务描述、修订/许可边界及缺项。公开事实包括MLCR-AA官方Example Task、Databricks OfficeQA hard题例（未证明属于Pro子集）、OSWorld Chrome官方test_all记录、OpenAI PaperBench rubric的adaptive-pruning复现任务、Scale AI PRBench Viewer行、RULER论文NIAH合成演示、SkillsBench sec-financial-report、SpreadsheetBench 2金融建模示例，以及Sierra telecom任务文件。OSWorld 2.1任务类按官方说明受gated访问，本轮不登录/申请/接受条款；τ²记录来自当前已演进为τ³时代的官方main，未声称属于原始2025 τ²快照；RULER区分论文演示与固定eval row。原因是逐条留下可公开复核案例或边界清晰的查找事实；影响仅候选和研究审计文档增加，不进入正式内容或站内样例。JSON解析通过，累计40项、40个唯一benchmarkId、必需结构字段齐全；未运行构建、服务或测试。
- 依据重新打开的OpenAI GDPval页面完整任务结尾，更正 `artifacts/candidates/2026-10-08-all-cases-b2.json` 的GDPval条目与 `docs/research/2026-10-08-all-cases-b.md` 对应记录：原说明误把过程中的3D概念/PPT要求写成最终提交物；修正为任务提及3D建模与PowerPoint，但最终仅上传带3D快照的PDF摘要，原生3D文件无需提交。原因是官方原文在任务末段明确区分工作过程和上传交付；影响为候选任务描述与审计表准确，未改正式评测内容。核对依据为OpenAI GDPval页面末段，候选JSON重新解析通过。
- Root新增4条实际源记录样例：AA-Briefcase Lite `w1_t1`（原任务brief、不含附件/非计分第五场景、Apache-2.0）、AA-LCR公开test question 1（原CSV题目/答案/元数据、不含约94k正文、question-set Apache-2.0）、AA Multilingual Global-MMLU-Lite zh/test row 9（business_ethics、固定Parquet、Apache-2.0，明确与MMMLU分开）、IFBench key 5（物理题及5类并列连词约束、不含模型输出、ODC-BY研究/教育许可）。Root说明已更新4个评测JSON、4份许可原文、root取证和采用记录，`vue-tsc`及151项内容生成通过；当前33项自有样例加指数成员1项，共34项页面可见。
- Root另完成11条官方公开具体案例解读的采用，包括AA-AnalystAgent、APEX-Agents及1.1、AutomationBench-AA、BioMysteryBench、Excel-EMB、Finance Agent、GDP.pdf、GAIA、BrowseComp、GDPval；11条均标记为公开案例解读，使用来源必要短引并保留真实节选字符串，许可限定于本站解读/短引，不声明完整题库或附件许可。Root复核纠正APEX management为SKU生命周期分析、GDPval最终只交PDF摘要、GDP.pdf不把错误模型回答当gold、BrowseComp作者独立创题演示不冒充数据集行并保留官方在线披露限制。涉及11条JSON、公开案例来源指纹及采用日志；`vue-tsc`与151项内容生成通过。当前页面为44项自有样例、指数成员1项，共45条页面可见案例/55条样例记录；全量schema和测试尚待所有批次采纳后验证。
- 全量目标尚未完成，候选材料待逐批采纳与核验。
- 第五批取证追加至artifacts/candidates/2026-10-08-all-cases-b2.json，含 tau3-banking、tax-agent-bench、terminal-bench-2、terminal-bench-2-1、terminal-bench-3、terminal-bench-4、terminal-bench-science-0-1、toolathlon-verified、vending-bench-2、wandr 共10条；docs/research/2026-10-08-all-cases-b.md 增加对应公开记录/演示、版本、许可范围和缺项。许可字段区分仓库软件LICENSE与任务数据/第三方材料，未单列范围记为未核实。修改原因是补齐原B组最后10项取证并保存可回查事实；影响仅为候选与审计文档增加，不代表采纳或151项目标完成。修改前完整读取UPDATE_LOG.md、候选JSON和审计文档；JSON解析、ID唯一性及必要字段/许可结构检查通过；未运行服务、构建或测试。
- 全量目标尚未完成，候选材料待逐批采纳与核验。


- Root选定的B组公开任务事实解读第一批已接入8项：`finbenchmark`、`gdpval-aa`、`gdpval-aa-v2-1`、`harvey-lab`、`legal-research-vals`、`lhtb`、`lifescibench`、`longbench-v2`。分别新增或补充对应 `content/benchmarks/{id}.json` 的 `sampleSet`、本地样例入口和来源登记；所有样例均为 `type=record`、`promptOrigin=editorial`、`excerpt=true`，`raw` 是逐字来源短节选字符串，未创建原始记录对象。修改原因是把官方可定位的真实题目/任务演示转成本站可复核的具体案例；影响为本批8条可在条目中展示，`reusePolicy` 仅许可本站原创解读与必要短引，代码许可、底层题库、参考文件和附件按已核实范围分别说明。
- 特别边界：GDPval-AA v2与v2.1样例均指向同一上游Task 1乐队舞台图演示；AA当前任务页标示v2.1，v2协议差异依据2026-06-15 v4.1公告另行说明，不将该演示称作冻结v2页面或v2版评分行。LongBench-v2按官方Rows API行 `_id=66fcffd9bb02136c067c94c5` 展示真实四选项及答案D，省略语法书长上下文；四选项置于解读正文以遵守现有 `record` schema。Harvey任务附件未复制，Vals P-001不冒充私有评分题，LifeSciBench不复制附件/rubric，LHTB不声称已运行任务。
- `artifacts/candidates/2026-10-08-b-cases-adoption-proof.json` 保存本批源URL、HTTP状态、原始响应字节数/SHA-256、记录定位、短引逐字核验和内容投影。修改中按内容管线要求，将已核验的source URL登记在各条目 `sources`；未改分类、kind、definition或共享schema。
- 验证：`node_modules/.bin/vue-tsc.cmd --noEmit --pretty false`通过；`npm run validate`通过，核验151项公开条目、71条样例和17份报告。验证首次发现source URL登记缺失及LongBench-v2的 `record` 类型不可带 `options` 字段，均按既有schema修正后复验通过。未运行服务、构建或生成器。


- 第二批官方公开任务事实解读已接入8项：`medscribe`、`mind2web`、`mlcr-aa`、`osworld`、`paperbench`、`prbench`、`ruler`、`skillsbench`。对应评测JSON新增本地 `sampleSet`，补齐使用到的官方source登记；proof在 `artifacts/candidates/2026-10-08-b-cases-adoption-proof.json` 追加各源SHA-256、响应大小/时间、定位、短引字面核对和投影。修改原因是把官方页面/记录中可定位的具体任务目标展示为本站原创案例解读；影响限于这8条站内案例，不改分类、kind、definition或共享schema，许可状态只覆盖解读/必要短引或官方明确标注的数据集许可。
- 边界记录：MedScribe的公开对话例未标明真实/模拟，未复制逐字对话、SOAP输出或患者记录；Mind2Web示例按CC BY 4.0注明归属，未复制第三方网站素材；MLCR-AA示例不映射到private held-out评分题或Wisedocs公开行；OSWorld仅记录Chrome任务目标与expected true，不代表已执行；PaperBench只摘要APT论文复现目标；PRBench仅概述公开finance行首轮CCAR任务事实，不含回复、scratchpad、rubric或canary值，核对的HF数据卡与官方README未出现在线披露禁令；RULER标记为Table 2合成示意而非固定test row；SkillsBench只概述SEC季度分析任务和具名子问题，不提供答案或申报文件。
- 验证：`node_modules/.bin/vue-tsc.cmd --noEmit --pretty false`通过；`npm run validate`通过，核验151项公开条目、79条样例及17份报告。未运行服务、构建或生成器。


- 第三批官方任务事实解读接入8项：`spreadsheetbench-v2`、`tau3-banking`、`tax-agent-bench`、`terminal-bench-2`、`terminal-bench-2-1`、`terminal-bench-3`、`terminal-bench-4`、`terminal-bench-science-0-1`。对应条目JSON新增本地editorial record样例和实际引用来源登记，`artifacts/candidates/2026-10-08-b-cases-adoption-proof.json`追加源响应状态、SHA-256/字节数、检索时间、定位、逐字短引及投影。修改原因是把可定位的官方具体任务目标以原创说明接入图鉴；影响限于8项样例，不改条目分类/kind/definition或共享schema，任务数据与代码许可分别表述。
- 具体范围：SpreadsheetBench 2使用Version 2 / Example 1 Financial Modeling公开指令；τ³只写官方`banking_knowledge`域和当前主分支`task_001`（源路径仍为`data/tau2/...`），记录其版本/检索配置未锁定，不冒称其他银行快照；Tax Agent Bench为suite v2的P-001公开非计分题，无答案。Terminal-Bench 2.0与2.1分别以各自任务目录核对dna-assembly成员身份，并明确同一slug也出现在两版，不标为2.1独有；Terminal-Bench 3固定v3.0.0/commit 2b0442c的foodstuff-beta-activity；Terminal-Bench 4依据v4.0.0任务清单和Harbor详情整理layout-config-recreation2；Science以v0.1.0发布清单核对symbolic-regression，详情页标明revision 2、固定seed合成数据，不将其描述为现实观测或隐藏规则答案。
- 数据边界：未复制Spreadsheet工作簿、task序列/fixture/tests/solutions、Sr-90输入文件、设计图稿/字体、Science数据及reference solution；没有运行任何任务或将任务期望动作/输出冒充模型结果。Terminal-Bench公开页面出现的training-corpora/canary标记没有被误作在线披露禁令，也未复制其marker。许可状态仅覆盖本站原创解读/必要短引；底层任务、第三方材料和附件范围按来源证据分别保留未知或受限。
- 验证：`node_modules/.bin/vue-tsc.cmd --noEmit --pretty false`通过；`npm run validate`通过，核验151项公开条目、87条样例和17份报告。未运行服务、构建或生成器。

- 第四批B组官方案例接入2项：toolathlon-verified 的 find-alita-paper 公开任务，以及 vending-bench-2 官方文章中的过期Snickers退款运行示例。修改 content/benchmarks/toolathlon-verified.json、content/benchmarks/vending-bench-2.json 为 type=record、promptOrigin=editorial、excerpt=true；仅保存实际来源短引字符串，不加入答案或拼造原始记录。原因是官方公开源中已定位具体任务约束和具体模拟事件；影响为两个评测新增可见案例，并在复用声明中将许可严格限于本站原创解读和必要短引，未扩展到任务池、运行轨迹、邮件全文、附件或模型推理。
- Toolathlon案例标明 main 未固定版本，README Quick Example 与官方 task.md 两处交叉定位；task.md和仓库根 LICENSE 均未显示适用于任务数据的许可声明，不推断整个Verified题库授权。Vending-Bench 2案例来自 Andon Labs 2026-02-05公开文章：顾客因过期Snickers申请退款，模型邮件承诺$3.50、文章记载未实际付款；不把该行为当gold，且注明Arena为独立变体。Wandr当时未在本批次接入；经root复核，固定指令本身规定18+平台、每平台至少3项工作流主张及两类证据，是一项开放研究任务。先前未采纳不表示任务缺少具体要求；root在后续20项案例批次中已接入该任务的editorial案例。仓库Apache-2.0仍不自动覆盖第三方网页。
- artifacts/candidates/2026-10-08-b-cases-adoption-proof.json 追加两条采用投影和一条Wandr未接入证据，记录来源HTTP状态、响应字节数/SHA-256、时间、定位、逐字短引及投影；现有proof累计26条采用记录，另列1项未接入。未修改分类、kind、definition、151项目录、共享schema或生成器。
- 验证：node_modules/.bin/vue-tsc.cmd --noEmit --pretty false通过；npm run validate通过，核验151项公开条目、89条样例和17份报告。未运行服务、构建或生成器。全量目标仍未完成。

- Root更新纯 editorial 样例许可校验：src/content/schema.ts 允许仅含本站任务解读和真实短引的 editorial record 在底层数据许可为 unknown/restricted 时展示；若样例含原始数据、options、assets 或 gridTask，reusePolicy 仍须为 permitted。样例raw短引限240字符。src/composables/sampleLoader.ts 同步校验editorial标记、节选字符串和长度上限；src/lib/sampleAccess.ts 将本地样例区和操作入口命名为“真实案例”；src/components/SampleViewer.vue 区分“官方公开案例·本站解读”和“来源节选”，案例编号标为“本页案例编号”。tests/sample-origin.test.ts 覆盖未知数据许可下可展示原创解读及缺失标记、增加options、超长raw均拒绝。影响是将站内文字许可与底层题目数据许可分开。Root报告专项6/6和vue-tsc通过。
- 按root核对的原始许可事实修正37项纯editorial条目的reusePolicy：longbench-v2、mind2web、prbench、ruler限定于已确认Apache-2.0/CC BY 4.0覆盖的公开字段或论文片段，4项permitted；browsecomp、finance-agent、legal-research-vals、medscribe按官方披露限制/Proprietary边界记restricted；其余29项记unknown，包括lhtb（虽有仓库Apache-2.0，但任务数据授权未单独确认）。代码许可证没有扩展为任务数据授权；未改样例内容、case ID、sample.license或C组条目。
- 更正 artifacts/candidates/2026-10-08-b-cases-adoption-proof.json 中Wandr的历史批次状态：保留“本批未接入”，不再描述为缺乏具体要求；root已确认其公开instruction是含18+平台、每平台3+ workflow claims和两类证据要求的开放研究任务，editorial样例由root后续处理。仅更新必要的研究状态说明。
- 两项过期研究备注同步到当前核验范围：content/benchmarks/gdp-pdf.json 更正“样例可用性未核验”为已定位官方fryer wiring-diagram示例、题目/附件和第三方手册许可仍未知；content/benchmarks/terminal-bench-science-0-1.json 区分已查当前symbolic-regression rev2任务页与未下载完整v0.1.0包，并登记对应任务页来源。没有扩展成全包许可结论。
- 验证：node_modules/.bin/vue-tsc.cmd --noEmit --pretty false通过；npm run validate通过，核验151项公开条目、96条样例和17份报告。样例总数包含并行C组同期新增项；本批未运行生成器、构建或服务，全量151项目标尚未完成。

- Root新增20项官方公开任务事实解读：`bullshitbench-v2`、`swe-bench`、`swe-bench-verified`、`swe-bench-multilingual`、`swe-bench-pro`、`facts-parametric`、`mirrorcode`、`mysterymechanism`、`frontiercode-1-1-main`、`nl2repo-bench`、`frontierswe-v2`、`simplebench`、`weirdml-v2`、`rws-mgate`、`cyberbench-patch-v1-1`、`hyper-tau-bench`、`vibe-code-bench-1-100`、`vibe-code-bench-v1-1`、`hle`、`wandr`。对应20份 `content/benchmarks/<id>.json` 增加 `type=record` 的 editorial 案例及实际来源登记；`raw` 保留来源原文短引字符串，`excerpt=true`，未拼造原始记录对象，也未改条目 kind/category。原因是这些第一方来源可定位到具体任务要求或公开演示；影响限于对应条目展示本站原创中文事实解读和必要短引，底层数据/第三方材料许可继续按各自证据保留。HLE只取公开生态学演示事实与不超过10词的短引，不含gated行或标准答案；WANDR按固定公开指令记录18+平台、每平台3+主张及两类证据等实际任务要求，不再沿用此前“缺少具体任务”的阶段性排除描述。
- `artifacts/candidates/2026-10-08-all-cases-adoption.json` 追加逐项locator、revision、source与文件事实；来源登记使用已核对的精确URL并参照a2与second-pass核验。维护指南 `docs/CONTENT_MAINTENANCE.md` 现区分Source原始记录与editorial解读：纯文字editorial可在底层许可unknown/restricted下展示，但必须有官方公开且可定位的具体任务事实、本站原创说明和必要短引，`raw`是240字符以内来源字符串；原始数据、题面、选项、网格和媒体仍须有相应许可，明确在线展示禁令仍遵守。指数只复用明确composition成员已有样例。导入指南 `docs/LOCAL_SAMPLE_IMPORT.md` 将84项/18项/27条例及A/B/C等级标为2026-09-23历史快照，解释`no-train`/`canary`单独不自动构成在线展示禁令，并保留明确在线披露限制。
- 验证：Root报告上述两批各自执行 `node_modules/.bin/vue-tsc.cmd --noEmit --pretty false` 与 `npm run validate` 均通过；当前为151项公开条目、116条样例记录、17份报告。文档本轮仅做说明与历史口径更新，未改样例正文、评测分类、kind、schema、生成器或服务。151项每项至少一例的目标尚未完成。
- 本轮追加官方来源缺口与版本事实核验，新增 `artifacts/candidates/2026-10-08-final-gap-b.json` 和 `docs/research/2026-10-08-final-gap-b.md`，涵盖 EBR-bench、MedCode、Code Migration、CursorBench 4.0 及 FrontierMath 系列/v2两子集。原因是补齐最后缺口的可复核来源与记录定位，并纠正旧FrontierMath Tier 3短摘录缺少前置定义的问题；影响仅增加候选证据和研究说明，不改正式评测条目、样例、许可状态或151项目录。
- 证据事实：EBR官方更新报告GPT-6 Astra在原版取得100%并利用绕过时间限制的一张卡，官方方法页记录2026-09-22转v4且当前默认禁卡；MedCode与Code Migration官方Vals页均标注Proprietary，但已查页面未定位患者记录或具体迁移源仓库/题面，仅保留查找范围缺口；Cursor官方4.0 changelog列任务类别，官方博客明确其生产版本3.1，未把3.x示例映射到4.0。FrontierMath候选改用完整Tier 2递归排列题、Tier 1有限域计数题及Tier 4 BMO优化题，记录所有数学输入与约束；v2 hubs只验证tier级公开题数并链接公共题页，未发现题名到固定行ID映射。许可字段分别保留Epoch通用数据许可与题目/答案创作者权利的官方区分，不下具体题目许可结论。
- 校验：JSON重新解析确认7个唯一benchmarkId、必需证据/定位字段齐全；对10个官方页面进行公开HTTP GET，均返回200并记录响应SHA-256及检查日期。FrontierMath公共题页的三个短标题引用合计18个英文词，每项不超过10词。没有运行服务、构建、生成器或测试；以上为候选阶段取证，后续root采纳状态见下文。
- Root后续接入的实际案例事实按其提供的记录补入本节：B组共26项（先前20项及后续6项）；A组五项原始来源案例为CMMLU、Deep-SWE、CritPt、SWE-rebench、ProgramBench，前三项见 `artifacts/candidates/2026-10-08-a-source-adoption-proof.json`，SWE-rebench见 `artifacts/candidates/2026-10-08-swe-rebench-adoption-proof.json`，ProgramBench见 `artifacts/candidates/2026-10-08-second-pass-adoption-proof.json`；C组新增14项，ArenaVision加入一条公开博客示例，ToneBench撤下Script 7并改为Script 9。对应案例仍使用各自内容JSON与采用/来源proof；C组图像来源范围未核实的条目不据此宣称媒体可复用。Root另接入3项FrontierMath公开题解读和1项EBR公开运行事件；均保留版本、输入事实和来源范围边界，不将模型报告值写成题库标准答案。上述为root提供的实际修改与事实记录，未扩成151项完成结论。
- 阶段快照（OSWorld 2.0与OfficeQA Pro新增案例采纳前）：151项评测、136项含自有 `sampleSet`、147条记录；原始来源42项/53条，editorial 94项/94条；AA Intelligence Index另展示1条明确组成成员案例，共137页有案、14页待补。此前146条的验证结果早于BrowseComp-ZH论文Figure 1记录并行接入；该记录解释了本地计数比先前验证多1条。
- Root后来采纳OSWorld 2.0官方Task035，保持当前条目 `version=2.0`；具体事实和独立来源proof见 `artifacts/candidates/2026-10-08-osworld-2-public-case-proof.json`，没有把2.1版本任务归到2.0。另采纳OfficeQA Pro论文v1第4页Figure 3中可定位的UID0013任务：OLS任务覆盖1929–1942年联邦个人所得税净收入，要求按千位分隔格式输出；无答案，未读取受限CSV。旧2025年博客示例仍未映射为该Pro任务。proof见 `artifacts/candidates/2026-10-08-officeqa-pro-public-case-proof.json`。
- 最终计数（root已重生成并校验）：151项评测中138项含自有 `sampleSet`、共有149条记录；原始来源42项/53条，editorial解读96项/96条。AA Intelligence Index另通过明确composition成员展示1条，因此139页有真实案例、12页待补：GPQA / GPQA Diamond、HealthBench / HealthBench Hard / HealthBench Professional、Video-MME、MedCode、Code Migration、CursorBench 4.0、Mystery Game Puzzles、TapTap Maker、OpenAI internal coding。`docs/reviews/2026-10-08-all-cases-coverage.md` 与 `artifacts/2026-10-08-all-cases-coverage.json` 保存覆盖清单；两份README已更新计数及Source/editorial模式说明。
- Root报告最新验证：`vue-tsc --noEmit`通过；`npm run validate`核验151项/149条样例/17份报告；内容生成151项；全量测试46/46通过；`git -c core.safecrlf=false diff --check`通过且staged为空。Root还报告相对HEAD原有27条样例的prompt/raw/answer/assets及文件存在性均保留、0差异，当前新增122条。未启动服务、构建或发布；浏览器验收待完成。全量目标仍缺12项。
- 最终投影对照已通过，记录见 `artifacts/2026-10-08-all-cases-validation.json`：151条catalog entry、138个样例JSON文件/149条记录，逐项与源 `sampleSet` 完全一致；没有缺失或孤立样例文件。4个媒体素材（2个原有音频、2个新增PNG）与源文件的字节及SHA-256一致；45个许可引用准确对应35个独立许可文件；151条源JSON SHA与覆盖审计匹配；catalog投影不含样例正文。临时8个root采纳/核对Python脚本已从指定Temp根目录定点清理，正式数据与采集proof保留。未检测到本项目Node服务，也未启动服务。浏览器验收和生产build未执行；全量目标仍缺12项。
- 用户明确要求启动项目供其查看后，Root在工作目录 `E:\项目demo\benchmark show` 执行 `npm.cmd run dev -- --host 127.0.0.1`；Vite 8.3.0 ready，地址为 `http://127.0.0.1:5173/`，会话93172持续运行以供查看。启动时由现有 `predev` 脚本重新生成151项公开数据；没有修改业务代码或配置，也未执行生产build或部署。服务按用户要求保持运行。
- 本轮继续核查MedCode、Code Migration和CursorBench 4.0的官方公开UI/实际声明加载脚本，更新 `artifacts/candidates/2026-10-08-final-gap-b.json` 与 `docs/research/2026-10-08-final-gap-b.md`。修改原因是确认此前Vals页面缺口是否可沿其公开客户端路径定位样例，并校对Cursor具体演示的版本；影响仅为取证状态补充，不改正式benchmark内容、案例、分类、许可字段或共享schema。
- MedCode与Code Migration官方Vals页面（更新于2026-10-06、均标注Proprietary）SSR均为 `data-has-examples=false` / `data-active-view=results`。候选记录页面实际声明的40字节 `page.Vn21zqoU.js` 与1,539字节 `hoisted.CoU7OQMV.js` 的HTTP状态、SHA-256及行为：模块只初始化共享client，脚本读取页面examples标志；公开页面false时保留results，已检查路径没有病例/迁移任务载荷。只记所查页面与脚本路径的范围，不推断Vals其他页面没有公开演示。
- Cursor官方4.0榜单/变更记录列模型汇总分数及任务类别，没有逐项task ID或prompt；官方博客写明当时生产版本3.1。Composer 2官方报告确有Appendix C.1具体任务，但报告明确把结果标为CursorBench-3，因此不将其映射为4.0样例。候选同时标注该PDF公开解析、未下载完整文件。JSON结构复核仍为7个唯一项目、必需字段齐全；未运行服务、构建、生成器或测试。

## 2026-10-08 — 新增评测的内容深度、图标与真实样例补齐

- 原因：用户要求逐项说明上一轮新增59项是否联网、有无图标和具体内容，并按现有架构落实。基线盘点确认59条已进入原内容投影，但57条 `brandIds` 为空、2条复用Epoch图标，新增站内样例为0；170条来源登记与152个不同URL不能单独证明任务内容完整。上一轮“完成”只覆盖收录/分类/基础说明，未完成图标与可许可原题接入。
- 架构核对：完整读取既有品牌表、严格schema、内容生成/资产校验管线、`PublisherMarks`、卡片/详情及样例组件和维护规则。继续使用 `content/brands.json`、`content/assets/logos/`、条目 `brandIds` 与 `sampleSet`、独立生成样例文件和原加载器；不增加页面、字段、图标映射服务、样例渲染器或依赖。
- `content/brands.json`、`content/assets/logos/`、`docs/LOGO_SOURCES.md`：从第一方真实链接核验并新增27种标识（品牌总计58），覆盖33项新条目；其它26项复用既有发布方标识。59项均已通过原 `brandIds` 绑定；新增标识中11为项目标识、11为发布方Logo、1为作者头像、4为官方账户identicon，四个identicon不称专属Logo。默认React图、空白图及TubeLab的404素材已排除，SVG/图片格式与哈希核验通过。
- `content/benchmarks/`精确59项内容深化：复核并改善354个内容字段，22条补真实字段结构、31条补具体文件/运行产物，补任务输入输出、执行步骤、评分公式、实际官方入口和私有边界。ProgramBench交付路径、Hyper-τ任务配置、PR固定多轮历史末轮作答、EQ提示/章节/persona、SWE环境与测试清单等均回第一方核对。Longform更新为v1.11/Sonnet4.6；真实浏览器核对LiveBench当前2026-06-25为7类23任务，与首发6类18任务分开；ArXivLean六月数据没有完整answer，形式化目标不冒作证明答案。
- `sampleSet`与 `content/assets/licenses/*-sample-source.txt`：主agent用原固定Parquet/CSV重新核对9条源文件、完整原记录、题面/答案、raw投影和许可材料哈希，全部一致后采用。MathArena三项、PRBench Finance/Legal、SimpleQA Verified、LiveBench共7条目展示9条站内样例；原有27条不变，全站36条/25个评测有站内样例。PR排除第三方参考文本和模型结果，不生成标准作答；ArXivLean题面直接用formal_statement原字段，含sorry仅为待完成目标；LiveBench旧release明确展示题型，不冒作当期完整题集。许可材料共7份，按已有asset管线发布。
- 事实候选：`artifacts/candidates/2026-10-08-expansion-completeness-facts.json`、`2026-10-08-brand-architecture-facts.json`、`2026-10-08-expansion-brand-assets.json`、`2026-10-08-public-sample-records.json` 保存盘点与核验材料；单项联网/完整内容/官方入口/站内原题/图标将分别统计，不用链接数或schema通过代替。
- 验证与执行边界：各品牌和内容批次直接 `vue-tsc --noEmit` 与严格schema检查通过；最终生成、内容校验、样例原文与素材、实际页面验收完成后补记。复用当前项目服务，未新启开发服务、未生产构建、未调用网页端GPT、未提交推送发布。
- 当前自动检查：严格TypeScript、151公开条目/36真实样例/17报告内容校验、现有44/44测试通过；独立源文件/原记录/题面/许可哈希9/9通过，原18个带样例的源JSON整文件SHA-256未改变。`README.md`、`README_ZH.md` 更新36样例/25评测快照；`docs/reviews/2026-10-08-expansion-deep-audit.md` 逐项列59个名称、第一方依据、内容、标识类型和真实样例状态，原覆盖记录标注为第一轮阶段。
- 浏览器地址核查：5173已被另一个RAG项目占用，5174也显示RAG；已通过进程路径确认不属于本仓库，因此没有停止这些服务。UI验收尚待图鉴现有地址，未把其它页面或上轮截图当作本轮通过证明，未绕过约束启动开发服务。

## 2026-10-08 — 引用位置收拢，取消独立编号行

- 原因：用户指出论文式编号仍大量单独成行，要求按阅读内容保留、移动或删除；本轮继续共用模板和公共提示层，不改逐条数据或来源库存。
- `EvidenceLinks.vue` 删除block属性和独立行样式，引用始终参与行内排版；编号可逐个自然换行，保留统一hover、键盘与点击定位。
- `DetailView.vue`：任务来源放在任务标题旁，并排除紧邻定义已有的完全相同来源；组成表依据放在说明句末；数据画像依据放在概述句末；访问的额外依据放在卡片标题旁；许可依据放在许可记录句末；关系依据放在关系说明句末，说明移出主链接以避免嵌套链接。
- 删除本地样例和综合指数样例区外围重复编号。本地样例已有原始记录出处/许可，综合指数已有组成方法与成员链接；结构化来源仍完整保留。
- `SampleViewer.vue`：非本地样例的必要补充依据贴在获取说明句末，排除已有官方入口；不新增独立引用行。
- 当前内容源为105个已发布条目，本轮验收覆盖最新目录；原有其他任务新增内容、分类、README等改动保留。
- 手机检查发现自然断行仍可能使单个编号落到末行；公共引用组件为直接包含引用的说明段落、许可记录和标题启用text-wrap:pretty，不逐页设置换行。完成时目录进一步更新为151项，全部按当前页面重新核对。
- 进一步精简：数据获取卡排除已在数据概况引用的相同URL；关系卡排除已在本条定义或版本说明引用的相同URL。仅减少重复显示，保留新出处、不同hash及所有结构化来源；共用模板自动适用于151项及后续新增条目。维护文档同步取消block模式和更新保留/去重规则。
- 按实际行矩形复核，自动换行仍会把部分编号独立推到末行，最终改用公共 `CitedText.vue` / `lib/citationText.ts`：Intl按词分段，完整句末词、尾部标点与引用不可分行，其他正文自然换行；取消尝试的text-wrap:pretty规则。所有共用文本位置接入，不改写原文。新增句末词测试覆盖中文、英文、组合字符、emoji、空文本和原文完整性。
- 最终验证：严格TypeScript、44/44测试、151条目/27样例/17报告校验、git diff --check通过；151页最终桌面1280×720与手机390×844全部实开，按正文词和引用的行矩形逐一测量2,475个保留入口，无独立编号行、横向溢出或失效引用目标。折叠研究记录不计入可见行测量，来源库存保留。
- 交付 `artifacts/citation-placement-validation.json` 与 `artifacts/citation-placement-preview.jpg`，保存最终逐页结果和960×884实际任务区截图。重新定位的组成引用支持聚焦提示、Esc关闭与点击原来源。
- 验收中原预览服务停止，已检查端口空闲后恢复用户预览；本轮没有编辑正式内容JSON或来源资料，不改其他任务的目录扩充。未运行生产构建、提交、推送或部署。

## 2026-10-08 — Benchmark 来源补齐与分类优化

- 原因：用户确认对 AIHOT 评测来源目录的遗漏与分类分析后，授权全部优化；在本轮开始时已有未提交修改上继续工作，不覆盖原有界面、样例或引用优化。
- `content/categories.json`：新增 `writing`（写作与设计）及 `general`（综合评测与指数），复用现有图标；数理分类纳入物理推理，多模态分类名称纳入音频，指令与偏好描述补充情绪交流。影响目录筛选、分类名称和详情面包屑；不新增字段或依赖。
- `CONTEXT.md`、`docs/CONTENT_MAINTENANCE.md`：明确主分类、能力标签和综合指数的含义，按主要任务选择分类；区分自然语言和编程语言、创作长篇和长文理解、评测本体和机构运行协议，保留已有版本 ID 与来源约束。
- `content/benchmarks/`：新增 59 个条目，覆盖编程/科研 19 项、专业工作/知识 20 项、创作/设计/视觉/语言 17 项，另拆出 APEX-Agents 1.1 与 FrontierMath v2 两个难度子集。原条目 ID 保留；新增数据均只解释公开任务协议，不复制题目、模型输出或媒体。完整文件与 90 项来源映射见 `docs/research/2026-10-08-aihot-coverage.md`。
- 既有分类：AA 智能指数转入 `general`；APEX-Agents、AutomationBench、AutomationBench-AA 和 Terminal-Bench-Science 转入 `work`。通用终端与多工具评测仍归 `agents`；新增 LHTB 依据跨领域任务范围归 `agents`。HLE/GPQA、长文本与界面定位保留既有测量目标分类。
- 既有版本与关系：APEX 原版只保留 480 题范围，1.1 独立说明 240 题与 Harbor/裁判修订；任务指令与评分参考材料分开。FrontierMath v2 明确 295+43=338 题及 10+2 个公开示例，清理错误标注的发布来源和子条目无关来源。Arena 三专项、SimpleQA Verified、τ³-Banking 与 AA 多语言指数通过 `related` 连接原条目；机构复测在已有 Terminal-Bench 条目中说明，不重复建题库。
- 独立本地内容审查修正：M-GATE 语法主指标为 MCC/F1，解析失败用裁判归一化标签；APEX 许可采用 `restricted`，区分官方明确禁令与本站不复制范围；SpreadsheetBench 2 采用 V2 论文和仓库依据，区分 297 项编辑指标和 321 项含可视化汇总；Code Migration CLI/COBOL 权重为 75%/25%；删除未核实的 Mercor 专属别名与重复引用。
- PRBench 保留首发项目的 19,356 项准则与当前 HF 卡 18,692 两种来源快照，不推断差异原因；Finbenchmark 删除未核实的作者姓名，WeirdML 将评测作者与 Epoch 复测/登记方职责分开，避免把报告者当原发布者。
- `src/views/GuideView.vue`：复用现有任务入口与案例结构，新增写作设计和综合评测入口及两个读榜案例，通用工具入口与专业工作分类含义统一；没有新增筛选状态、组件或样式。`README.md`、`README_ZH.md` 更新 151 条/10 类快照，原有 27 条样例、18 个站内样例评测和 17 份报告数量不变。
- 名称与关系编辑覆盖 15 个既有条目：`aa-intelligence-index`、`apex-agents`、`arena`、`automationbench-aa`、`automationbench`、`critpt`、`finance-agent`、`frontiercode-1-1-main`、`frontiermath`、`hle`、`scicode`、`simpleqa`、`tau2-bench`、`terminal-bench-4`、`terminal-bench-science-0-1`。AIHOT 的展示名称作为已核实的搜索别名接入；LiveBench 分项回到同一体系，未核实的 Mercor 专属名称不伪装为同义名。
- 最终自动验证：严格 `vue-tsc --noEmit`、151 公开条目/0 草稿生成、151 条目/27 样例/17 报告校验、43/43 全套测试、12/12 搜索与分类专项、`git diff --check` 通过。使用实际 `recognizeNames` 核对 90 行：89 行唯一精确命中、1 行仅本体对应且专属协议未核验；全库没有跨条目归一化名称冲突。
- 信息完整性：对本轮开始时 92 个条目的 `sampleSet` 逐项比较序列化 SHA-256，没有变化；原有27条任务的题面、答案、raw、选项、素材、来源、许可和取样日期保留。两个 `artifacts/candidates/2026-10-08-aihot-*.json` 仅为事实候选，不作为未复核即自动发布的输入。
- 实际浏览器：1365×900、390×844 下实开78路径，共156视图，覆盖全部59新详情、15旧条目及首页/新分类/指南；标题、分类计数、指南6入口/12案例、内部锚点与整页溢出均通过，无捕获运行异常。额外两种宽度实开三个新/综合条目对比，手机展开全部10分类筛选通过；截图逐张查看。首次后台帧等待超时的空记录不计为验收，最终完整重跑成功。
- 验收文件：`artifacts/2026-10-08-aihot-source-audit.json`、`artifacts/2026-10-08-aihot-browser-validation.json`、`artifacts/2026-10-08-aihot-extra-ui-validation.json`、`artifacts/aihot-expansion-desktop.jpg`、`artifacts/aihot-expansion-mobile.jpg`；覆盖报告为可提交文档，候选与截图仍按项目现有目录约定保存。
- 收尾：复用原先运行的本项目 Vite完成验收，并按项目约束停止该服务；未另启动服务。浏览器视口覆盖已清除，临时请求/检查脚本删除；未生产构建、未运行真实benchmark、未下载受控任务、未检测全部外链存活或验证线上状态。
- 执行边界：不启动开发服务、不运行生产构建、不调用网页端 GPT；不提交、推送或发布。许可未核实的任务不复制为站内样例，原有样例保留。

## 2026-10-08 — 全站论文式引用与公共悬停提示

- 原因：用户要求所有正文依据编号改为论文式上标，并在框架公共层统一hover，不逐页定制；继续使用修复分支和原始来源编号。
- 新增 `src/components/UiTooltip.vue`、`src/styles/tooltip.css`，并通过 `src/styles/main.css` 全局加载提示样式。公共组件负责悬停/键盘聚焦、原生hint顶层、屏幕边缘定位、移入浮层持续显示、Esc/失焦/导航关闭和监听清理；不新增依赖。
- `EvidenceLinks.vue` 统一渲染sup引用，去掉“依据”文字和按钮边框；提示展示来源编号、类型、名称和域名，aria-describedby关联说明，不再同时输出原生title。点击保留现有参考资料锚点及URL查询状态，实际触发区域至少24×24px。
- `DetailView.vue` 仅调整共用模板14个引用位置：段落编号放到句末，表格/卡片整体依据使用紧凑脚注；全部92个详情一起生效，没有逐条修改内容或页面。`detail.css` 删除旧引用间距和触发宽度覆盖，防止破坏新的统一样式。
- 验证：第一批组件和公共样式修改后严格TypeScript检查通过；本批完成后继续类型、既有测试和实际浏览器hover/键盘/边界验收。
- 最终验证：严格vue-tsc --noEmit、43/43既有测试、92条目/27样例/17报告内容校验通过。全部92详情在1280×720、390×844实开，核对2,171个上标入口的来源名称/类型/域名、aria-describedby、编号目标与唯一提示ID，无遗漏、空提示或整页溢出；898×884与1365×900补充交互检查。
- 鼠标与键盘：悬停触发、移入提示继续阅读、移出关闭、键盘聚焦与Tab切换只显示一个提示、Esc关闭且保留焦点均通过。手机长来源标题和屏幕左边缘定位正常；Arena折叠定位点击后展开；MMMLU原始样例查询参数在引用跳转后保持，导航不会遗留浮层。
- `docs/CONTENT_MAINTENANCE.md` 补上标/脚注和公共静态提示的复用约定，避免后续重新出现页面私有hover实现。原始内容与来源库存未改；未运行生产构建、提交、推送或发布。本轮复用用户已打开的预览服务，没有另启开发服务。
- 验收证据：`artifacts/citation-validation.json` 保存92页桌面/手机检查及交互结果，`artifacts/citation-hover-preview.jpg` 保存898×884真实悬停截图；与上一轮全站修复的证据分别记录。
- 收尾：浏览器error列表为空，临时验收页关闭、视口覆盖恢复；已重新打开AA指数的评分区域供用户查看上标及悬停提示。沿用用户浏览预览，未另启服务。

## 2026-10-08 — 按用户要求打开修复后网页

- 原因：用户要求打开网页查看本轮UI/UX修复结果；复用现有本地Vite，无源码修改。
- 确认5173端口空闲后启动127.0.0.1:5173，在浏览器打开首页并保留页面；已确认显示92个评测、8类能力和27条真实样例。
- 本次为用户浏览启动，预览保持运行；上一轮修复验收服务已结束，本次启动单独记录。未提交、推送或部署。

## 2026-10-08 — UI/UX 全量修复验收与交付

- 分支：`codex/uiux-audit-fixes`。沿用修复前已有未提交修改，所有统计与完整性检查均比较本轮开始时的工作树快照。
- 交付 `docs/reviews/2026-10-08-uiux-fixes.md`：逐项对应原审查问题，列明源码/样式/测试/维护文件职责，以及全部92个内容文件的编辑字段、摘要长度和外链前后数量。原审查报告继续保留修改前状态。
- 交付 `artifacts/uiux-fixes-validation.json`、`artifacts/uiux-fixes-desktop.jpg`、`artifacts/uiux-fixes-mobile.jpg`：保存逐页DOM验收数字、27条样例状态、10个指南目标及17个发布卡定位，截图来自实际修复后的页面。
- 全量文案结果：85个条目有编辑变化，49条摘要缩短；全部摘要不超过80字符，最大79。23条样例解读围绕题目任务，161条研究过程限制进入折叠记录。
- 信息完整性：27条样例的原题、raw、选项、答案、图格、媒体、来源、许可及取样日期均与快照一致；270条原限制的文字及来源保留在正文或记录。名称、版本、任务协议、指标、关系、来源库存和verifiedAt均未改变。
- 范围保护：对快照中本轮范围以外的302个文件逐个比较SHA-256，全部一致；README、原内容管线、模板、架构说明及既有截图没有附带改写。
- 引用结果：92页外链DOM节点由2,869降至862（约70%）；AA指数16→2、Terminal-Bench 4.0 58→11、MMMLU 33→10。原库存中同页不同hash定位完整可达，因此逐页唯一完整地址之和637→671；不是新增资料或HTTP请求量。
- 自动验证：严格vue-tsc --noEmit、内容生成92公开/0草稿、92条目/27样例/17报告校验、全套43/43测试、git diff --check均通过；未增加依赖。
- 浏览器验证：98个明确路由在1365×900和390×844实开，无整页横向溢出；92页无失效内部编号或空画像卡；27条样例分别在两种视口显示，答案默认收起。样例分享刷新/第二题/历史返回、折叠引用定位与刷新、对比空行/混合缺项/键盘固定表头、搜索播报/列表/目录返回、指南10个案例定位均通过。
- 验证边界：浏览器error列表为空；保留原有vite-ssg触发的Vue Router next()弃用提示。未进行生产构建、全部外链HTTP存活检测、真实基准运行、真机安全区或线上验收。
- 清理：仅终止本轮启动的Vite，确认127.0.0.1:5173不再监听；浏览器视口已恢复、临时页已关闭。未提交、未推送、未部署。

## 2026-10-08 — UI/UX 修复（五）：许可文案复查

- `content/benchmarks/mmmlu.json`：数据访问只说明 CSV 获取，许可记录、转载范围与代码许可边界各表达一项；测试污染说明保留在评分限制和原始核验记录，避免许可区再重复两次。
- `content/benchmarks/genebench-pro.json`：许可区只说明适用材料和归属要求；10/129 题范围和公开参考答案继续由数据概况说明。站内样例原因改为题面范围，不再声称题旁的解读会讲核验冲突；原标题与原题面冲突仍保留在核验记录。
- 原因与影响：浏览器和文案复查发现仍有职责交叉；以现有事实收拢表述，不改变来源、许可状态、原题、答案或研究记录。

## 2026-10-08 — UI/UX 修复（四）：全量文案职责整理

- 修改 `content/benchmarks/` 中 85 个条目的编辑文案：49 条超过80字符的摘要改为任务与关键区别；具体筛选、研究工作流、长对话和来源计数仍在对应任务/数据/限制中说明。
- 75 个条目的161条研究过程限制迁移到带原来源的 `researchNotes`；任务/版本/评分比较所需条件按原说明保留短句。数据和样例字段中的本轮下载/哈希/权限核验过程亦集中记录，41处字段按职责改写，数据访问要求删去过程流水。
- 23 条真实样例的 explanation 改为该题的任务与判断要点，需保留的原取样/节选/许可边界进入核验记录；未改变 prompt、raw、选项、答案、图格、媒体、来源或许可字段。GAIA 等许可 scope 已逐句包含的 boundaries 不再重复列出。
- 本轮仅更新实际编辑条目的 `updatedAt`，不改 `verifiedAt`；此操作不声称重新研究外部资料或独立运行基准。来源库存与已登记外链均保留。
- `App.vue`、`PublisherMarks.vue`、`BenchmarkCard.vue` 补品牌/评测名称的禁翻译；`sample-viewer.css` 补维护说明折叠样式并删无用外部状态标题样式；`main.ts` 使用现有稳定ASCII锚点，避免无效转义引发解析异常。
- 验证：内容生成92项、严格 TypeScript检查、92项/27样例/17报告校验通过；样例加载/模式/URL专项8项通过。接下来执行全套自动测试、修改前后信息完整性与实际页面检查。

## 2026-10-08 — UI/UX 修复（三）：样例分享与维护约束

- 新增 `src/lib/sampleLocation.ts`；`SampleViewer.vue` 用原始记录 ID 和 read/raw 模式更新现有 URL，加载完成/历史返回恢复状态，连续操作使用最新题目；答案展开与选项仍本地保存。
- 样例区删去与状态标签相同的小标题；解读标题改为任务导向，原题/答案/raw/编号禁用自动翻译；维护者收集样例说明改为折叠，选择控件补属性，样例数量变化提供 polite 播报。
- 新增 `tests/sample-location.test.ts` 验证延迟加载、分享地址、连续换题/模式和历史恢复；更新 `content.test.ts` 图片合法夹具和 `sample-loader.test.ts` 无效尺寸案例。
- 修改 `docs/CONTENT_MAINTENANCE.md`：明确短摘要、研究记录、字段职责、编号引用、原始图像宽高和样例分享地址，减少后续内容重新引入重复说明。
- 验证状态：本轮结构和尺寸修改后严格 TypeScript 检查通过；本批继续执行类型与样例专项测试，最终统一记录。

## 2026-10-08 — UI/UX 修复（二）：详情职责与对比定位

- 修改 `DetailView.vue`：阅读顺序调整为任务、样例、评分、数据、版本、资料；评分者/比较条件并入评分，公开核验归数据，版本解读归关系；只渲染非空画像并集中说明缺项。综合指数样例区直接定位成员样例，按钮按真实动作命名。
- 详情采用 `SourceList.vue`，编号可到达每个原始段落；数据/外部样例主入口从邻近依据中排除。模型发布引用改为 `/releases/#<release.id>`，评分指南改为 `/guide/#metrics`。
- 修改 `CompareView.vue`：全空读分维度隐藏，局部缺项用一次说明和短标记；关键限制分条展示前两项，完整内容在现有详情；参考资料入口覆盖全部来源。`reading.css` 固定首列和表头，限定局部纵向滚动，并增加月份/指南目录样式。
- 修改 `ReleasesView.vue`：按月份组织17份资料，增加月份目录和稳定卡片 ID，日期采用 UTC 中文 Intl 格式。`main.ts` 的深链接滚动按响应式偏移，自动展开目标的 details 祖先。
- 修改 `schema.ts`：研究过程新增可选且带来源的 `researchNotes`，限制数组允许为空以避免虚构占位事实；图片素材必须提供正整数宽高。`SampleMedia.vue`、`sampleLoader.ts` 和 `sample-viewer.test.ts` 同步图片尺寸展示/运行时校验/夹具。
- 修改 `detail.css`：编号来源卡和折叠定位、集中核验记录、评分解读和组成样例入口的样式均归详情域。
- 验证：第一轮和详情结构完成后直接执行严格 `vue-tsc --noEmit`，均通过；内容调整与样例分享仍在实施。

## 2026-10-08 — UI/UX 修复（一）：引用与基础交互

- 原因与原则：按全站审查结果修复重复呈现和规范缺项；沿用现有组件、路由与视觉，使用静态编号引用保留精确来源。
- 分支与基线：创建 `codex/uiux-audit-fixes`；已有修改原样保留，并在系统临时目录保存修改前文件快照，供本轮增量核对。
- 新增 `src/lib/sourceReferences.ts`、`src/components/SourceList.vue`：同一页面合并资料卡，原始 URL/hash 各自保留编号和定位；`EvidenceLinks.vue` 改为简短内部引用，支持排除同区块主入口。
- 新增 `src/lib/displayFormats.ts`、`src/lib/sampleAccess.ts`：集中稳定的中文日期/计数和样例动作命名；`BenchmarkCard.vue` 的样例入口改为明确动作并禁止翻译名称。
- 修改 `ExploreView.vue`：常规结果数量增加 polite 状态播报；搜索、批量输入及筛选补 name/autocomplete，批量占位符补省略号。
- 修改 `GuideView.vue`：10 个课程新增稳定 ID 和页内目录，案例跳到相应任务、评分、数据或组成栏目；`AboutView.vue` 合并重复来源/核验说明。
- 修改 `tokens.css`、`base.css`、`layout.css`、`benchmark-card.css`、`index.html`：焦点环改用可读紫色；补触摸动作、focus 滚动留白、safe-area、屏外卡片 content-visibility、标题平衡和统一主题底色。
- 验证状态：本轮实现中；类型检查和最终浏览器记录后续补充。未提交、未推送、未部署。

## 2026-10-08 — UI/UX 全站审查与重复内容分析

- 原因：用户主动调用 web-design-guidelines，要求详细审查每页 UI/UX，重点检查卡片详情的说明、文字、外链与重复信息；遵循最简原则，本轮只形成审查文档，不修改业务界面或内容数据。
- 新增 `docs/reviews/2026-10-08-uiux-audit.md`：记录最新规范来源、主页面逐项分析、92 个详情的统计附表、27 条样例核验、问题对应文件行号、重复引用与重复入口的区别，以及建议的最小实施顺序。
- 审查发现：78/92 页数据访问入口与邻近依据链接精确重合，68/74 个非站内样例页存在同样情况；AA Intelligence Index 页同一方法地址生成 16 个外链节点；30 个详情的数据画像产生 61 个重复占位；对比固定读分行产生重复空值说明；部分摘要过长，核验过程说明多处进入主要正文；还记录焦点对比度、搜索结果播报及精确导航等规范/体验问题。
- 验证：本地 vue-tsc --noEmit 退出码 0；实际打开全部 92 个详情的 1365px、898px、390px 布局和其余 6 主路由的桌面/手机布局；18 个评测中的 27 条真实样例逐条切换，无整页横向溢出或媒体错误提示；验证搜索 URL、键盘对比、刷新恢复、表格键盘滚动及答案/原始数据切换。
- 统计复核：报告附表包含 92 个唯一条目 ID，无缺漏；外链 DOM 节点合计 2,869，逐页唯一地址数相加 637；包括折叠区域中的链接，不能解释为网络请求次数或全站唯一地址数。
- 影响与边界：仅新增审查报告并追加本条日志；业务文件集合在文档写入前后 SHA-256 一致，保留既有未提交改动。未运行生产构建、自动测试套件、全部外链存活检测、线上部署或网页版 GPT 评审。浏览器 error 列表为空，存在 Vue Router next() 弃用警告，未修改依赖。
- 服务：用户本轮明确回复“你自己启动”后使用本地 Vite CLI 启动 127.0.0.1:5173；检查完成已终止本次服务，确认该端口不再监听；没有运行内容生成管线或 npm run build。

## 2026-09-28 — 标题去除火箭与 Logo 候选设计

- 原因：按用户要求简化标题，并提供差异化 Logo 供选择，遵循最小改动原则。
- 修改 src/App.vue：仅删除站点标题后的火箭装饰，保留名称、副标题和现有图标。
- 使用内置 GPT Image 生成一张 4×4、01–16 编号的候选图；包含几何、字母、书籍、量尺、像素、印章、线条与立体等不同设计方向，待用户选定后再接入正式 Logo。
- 验证：内容生成与严格 TypeScript 检查通过；App.vue 差异检查通过。未启动服务，未提交或部署。

## 2026-09-28 — 评测读分模板与综合指数补全

- 原因：文章对照发现综合指数组成、评分者、运行条件与版本变更缺少集中展示；本轮复用现有内容管线、详情、对比与指南，不引入模型成绩库或重复页面。
- 状态：实现、内容核对与本地验收已完成；未提交、推送或部署。
- `src/content/schema.ts`、`src/content/interpretation.ts`：增加逐栏目带来源的可选读分解读，以及总权重必须为 100% 的指数组成；详情与对比共用栏目定义。
- `scripts/content-pipeline.ts`：指数成员进入现有引用校验和删除保护，避免产生指向草稿、缺失条目或自身的公开链接。
- `src/views/DetailView.vue`、`src/views/CompareView.vue`、`src/styles/detail.css`：复用 EvidenceLinks 和现有网格展示读分提示；通用组成表链接到已有详情，窄屏可局部横向滚动。
- 本轮按要求未使用网页端 GPT 评审。
- `content/benchmarks/`：新增 AA 智能指数、AA-Briefcase、AA-Omniscience、AA-LCR、GDP.pdf、CritPt、AutomationBench-AA、Terminal-Bench 3.0 共 8 项；目录增至 92 项。未增加原题转载，27 条站内样例保持不变。既有 `arena.json`、`gdpval-aa-v2-1.json`、`terminal-bench-4.json` 补读分说明及编辑日期，不把局部核对冒充整条重新核验。
- `content/templates/benchmark.json`：草稿提供四个读分栏目，正式发布前逐项填依据或删除未整理栏目。
- `GuideView.vue`、`ExploreView.vue`、`reading.css`：增加四个工作任务入口，直接复用目录分类 URL；原指南增添综合分、真人偏好、不确定性与任务成本案例。
- `tests/content.test.ts`、`tests/search.test.ts`：覆盖权重、来源、成员失效、撤回/删除保护、投影和名称版本隔离。
- `README.md`、`README_ZH.md` 同步 92 项内容与新功能；`docs/CONTENT_MAINTENANCE.md`、`docs/ARCHITECTURE.md` 记录可选字段、模板填法和引用保护；`docs/research/2026-09-28-score-reading.md` 保存本轮第一方证据与未核实边界。
- 最终验证：严格 TypeScript 与内容生成通过，92 条目、27 条样例；42 项自动测试全部通过。生产构建完成 98 个路由，核验 97 个静态页面及 Pages 404；git diff --check 通过。主包仍有体积提示（694.30 kB，gzip 193.55 kB），本轮未扩大到打包架构改造。
- 真实浏览器：桌面读分卡片、指数组成与成员跳转正常；390px 视口下详情组成表与两项对比局部滚动，页面实际宽度和内容宽度均为 375px。指南任务入口进入现有分类，AA-LCR/GDP.pdf 加入对比后显示共用解读与来源；控制台无警告或错误。视口已恢复，临时页面已关闭，截图保存在 artifacts/score-reading-preview.png。
- 边界修正：GDP.pdf 官方数据卡返回 401，访问与样例标为受阻/未核验，不推断为私有；移除 AA 指数和 AutomationBench-AA 将方法页误当数据入口的 URL，复用访问说明回退。详情空栏目统一说明本站尚未整理，避免暗示官方未披露。
- 临时生产预览已停止；没有启动开发服务，没有变更线上站点。

## 2026-09-23 — 无站内样例入口修复与五条官方数据接入

- 原因：用户发现“没有站内样例”可能被误读为“benchmark 没有数据”，并要求所有无样例条目提供准确外部入口，同时研究用户自行下载官方数据后选取一条真实记录公开展示的合规流程。
- 逐项复核 71 个无 `sampleSet` 条目的 `dataAccess`、`sampleAccess` 与证据链接。专项 197 个去重入口没有确认失效链接；13 个 403 属官方站访问策略，2 个 HEAD 客户端失败经 GET 为 200。审计明细写入 `artifacts/source-link-audit.json`。
- 14 个重点条目修正泛主页、错误的数据含义或缺失的访问入口；另为 DeepSWE、SkillsBench、Terminal-Bench 2/2.1、MathVista、LifeSciBench、MMMU、MCP-Atlas、MMMLU 增加精确官方任务页、示例页或 Viewer。相关 `content/benchmarks/*.json`、`docs/research/benchmarks/*.md` 和存在的候选副本保持同步。
- 全站审计发现 BFCL 两个旧博客锚点底页已 404，改用官方 GitHub 数据 README 的 V1 分类和 Evaluation 位置；同步修正 BFCL V4 计分 Agentic 与非计分 Format Sensitivity 的规模口径。新链接均返回 200。最终覆盖更新 `artifacts/source-link-audit.json`，复核 547 个来源/发布链接；唯一 HEAD 404 为 GET 200 的 StepFun 官方页面，没有剩余经 GET 确认的 404。
- `SampleViewer.vue` 对没有专用样例入口的条目使用 `sampleAccess.sourceUrls[0]` 显示“查看官方说明”；`DetailView.vue` 对没有专用数据入口的条目显示“查看官方访问说明”。只有数据公开且 `reusePolicy=permitted` 时才提示用户提交本地下载文件复核，避免鼓励复制受限数据。
- `content/benchmarks/genebench-pro.json`、`mcp-atlas.json`、`mmmlu.json`、`mrcr.json`、`mrcr-v2.json` 各新增一条来自官方固定版本的真实记录，并同步 reaudit 候选与研究档案。长上下文使用明确标注的真实节选；MCP-Atlas 不含 claims、trajectory 或外部服务返回。
- `content/assets/licenses/` 新增或复用覆盖数据本身的 MIT、CC BY 4.0、Apache-2.0 许可原文；`artifacts/research/` 保存 MRCR 两项的下载版本、文件哈希、行位置与行哈希。当前站内样例由 13 个 benchmark、22 条增至 18 个 benchmark、27 条。
- 新增 `docs/research/2026-09-23-downloadable-sample-candidates.md` 与 `docs/LOCAL_SAMPLE_IMPORT.md`：接入前 71 项分为 A 类 5 项、B 类 44 项、C 类 22 项；A 类已完成接入，当前剩余 66 项。README、产品设计和内容维护手册同步当前数量及用户本地数据导入门槛。
- 最终检查通过：84 条公开内容、27 条样例、17 份发布资料；75 份 reaudit 候选；严格 TypeScript；12 项自动测试；生产构建 90 个路由并通过 89 个静态页面与 Pages 404 检查。全局 `npm`/`npx` 启动器仍指向缺失文件，本轮使用项目内执行器，未改用户全局环境。
- 真实浏览器覆盖五条新增样例、SkillsBench、GPQA 与 OpenAI 内部评测；375px 宽度无整页横向溢出，控制台无警告或错误。4173 启动时被其他进程占用，本轮改用 4174 并只停止自己启动的预览；最终 4173/4174 均无监听。重新生成 `artifacts/benchatlas-static.zip`：3,165,615 字节、263 个条目，含 84 个详情页、18 份样例 JSON、11 份许可、首页、404 与 `.nojekyll`。

## 2026-09-23 — 国内六家模型发布页与九项 benchmark 扩展

- 原因：用户要求继续核查智谱、DeepSeek、Kimi、MiniMax、阶跃星辰和通义千问的官方模型发布页，从厂商公开成绩表中识别尚未收录的 benchmark，并继续遵守真实来源、版本分离和不编造样例的要求。
- 新增三份厂商研究记录：`docs/research/2026-09-23-china-releases-zhipu-deepseek.md`、`2026-09-23-china-releases-kimi-minimax.md`、`2026-09-23-china-releases-stepfun-qwen.md`。所有搜索、发现和官方来源核对由 GPT-6 Luna 完成，主任务负责证据审核、正式内容集成与验收。
- `content/releases.json` 新增 `glm53-flash`、`deepseek-v41-flash`、`kimi-k3`、`minimax-m3`、`step5-preview`、`qwen38` 六份官方发布资料，发布记录总数由 11 增至 17。厂商材料统一标为 `vendor-report`，只表达“该厂商发布资料引用了此评测”。
- `content/benchmarks/` 新增 `babyvision.json`、`deep-swe-v1-1.json`、`ifbench.json`、`nl2repo-bench.json`、`paperbench.json`、`skillsbench.json`、`terminal-bench-2-1.json`、`toolathlon-verified.json`、`vending-bench-2.json`，目录由 75 项增至 84 项。
- 九项均新增同 ID 的 `docs/research/benchmarks/<id>.md` 研究档案，并在 `artifacts/candidates/domestic-release-expansion/` 保留隔离候选。正式内容逐项记录官方定义、任务协议、数据范围、访问/复用边界、指标、版本关系及厂商引用。
- 保留 Terminal-Bench 2.0、2.1、4.0 为三个独立版本；IFBench 与 IFEval 只建立关系；Step 5 明确为 Preview/API 可用且开放权重仍是页面计划；智谱 GLM-5.3-Flash 专题页与官方仓库日期冲突没有静默合并。
- 九项未加入 `sampleSet`。原因是本轮没有同时核实到可公开再分发、可定位至真实记录且不会违反数据卫生或受控访问要求的样例；站内仍为 13 个 benchmark、22 条真实记录，没有用模型生成内容补数量。
- `tests/search.test.ts` 新增九个正式名称的唯一匹配回归，并检查 Terminal-Bench 2.0、2.1、4.0 不互相碰撞；`README.md`、`docs/PRODUCT_DESIGN.md`、`docs/CHINA_MODEL_RELEASE_PROGRESS.md` 与 `docs/VERIFICATION.md` 同步数量、采用范围和维护边界。
- 最终检查通过：84 条公开内容、22 条样例、17 份发布资料；严格 TypeScript；12 项自动测试；生产构建渲染 90 个路由，静态检查确认 89 个页面和 Pages 404。全局 `npm`/`npx` 启动器损坏，本轮使用项目内执行器完成检查，未改动用户全局环境。
- 真实浏览器覆盖桌面首页、17 张发布资料卡、Terminal-Bench 2.1 详情，以及 375px 实际内容宽度下的九个新增详情页；无整页横向溢出，控制台无警告或错误。临时视口已恢复，验收标签已关闭。
- 重新生成 `artifacts/benchatlas-static.zip`：3,142,760 字节、253 个条目，包含 84 个详情页、13 份样例 JSON、根首页、404 与 `.nojekyll`。本轮没有部署、推送或启动开发服务；验收用 4173 预览已停止，4173/4174 均无监听。

## 2026-09-23 — 75 项 benchmark 官方来源重审与证据结构迁移

- 原因：现有详情把任务、数据格式、访问状态和样例说明压在少数字段中，部分文字无法稳定回指 benchmark 官方 README、数据卡或论文；用户要求逐项按官方材料重审，禁止用模型厂商报告或推测补齐。
- 新增 `docs/BENCHMARK_REAUDIT_PROGRESS.md` 作为唯一进度台账。75 项均建立同 ID 的 `docs/research/benchmarks/<id>.md` 证据记录，并在 `artifacts/candidates/reaudit/` 保留与正式内容逐字符串一致的审核候选。
- `src/content/schema.ts` 已切换为唯一正式结构：官方定义、任务合同、数据概况、访问状态、复用政策、样例状态、指标、限制、关系和来源角色。旧字段与临时双 schema 已删除，不保留向后兼容。
- `scripts/validate-reaudit-candidates.ts` 与 `content:reaudit-check` 全量核对 75 份候选、研究结论、迁移前稳定身份、证据 URL、来源角色、数据栏目、复用范围和样例许可组合；三组各 25 项的 GPT-6 Luna 交叉复核及最终全量校验均通过。
- 75 份正式内容已一次性迁移到新结构；迁移前版本保存在 `artifacts/content-pre-reaudit/benchmarks/`，只用于稳定身份审计。网站、搜索、卡片、详情、对比和样例组件均只读取新结构。
- 详情页按“官方定义—任务协议—数据与使用边界—真实样例—评分方法—关系—官方资料”展示，每个事实区块直接列出依据；模型厂商报告单独列为“模型发布资料中的引用”，不再混入 benchmark 官方资料。
- 样例复核后保留 13 个 benchmark 的 22 条真实记录。Finance Agent、MCP-Atlas、MMLU、MMMLU、SWE-bench Verified 的 8 条旧样例因回源、split 或转载证据不足撤回，没有用推测内容补位。
- 更新 `BenchmarkCard.vue`、`DetailView.vue`、`CompareView.vue`、`ExploreView.vue`、`SampleViewer.vue`、`EvidenceLinks.vue`、搜索与标签映射，使目录状态、来源角色、访问/复用边界和部分核验状态可见。
- 最终验证：75 份候选严格校验、75 条正式内容与 22 条样例校验、严格 TypeScript、11 项测试和生产构建全部通过；构建生成 81 个路由页面并通过静态产物检查。
- 重新生成 `artifacts/benchatlas-static.zip`：3,063,798 字节、147 个条目；压缩包内含 75 个详情页、13 个样例 JSON、根首页、404 与 `.nojekyll`。
- 真实浏览器验收覆盖 APEX-Agents、GSM8K、HealthBench 和双条目对比：官方来源分区、真实样例、禁止转载说明及模型报告分离均正确。390px 宽度无整页横向溢出，刷新后控制台无错误。
- 搜索、资料探寻、残留扫描和三组内容交叉复核均由 GPT-6 Luna 执行；主任务负责结构设计、正式迁移、自动检查和浏览器验收。只启动了本任务临时生产预览，并在验收后停止；未启动开发服务、未部署或推送。

## 2026-09-23 — 第一批五项 benchmark 官方来源研究

- 原因：BenchAtlas 官方来源重审按批次推进，需要将评测定义、访问状态、数据/代码/媒体许可、版本与公开样例边界逐项追溯到第一方资料。
- 新增 `docs/research/benchmarks/apex-agents.md`、`arc-agi-2.md`、`arc-agi-3.md`、`arena-hard-v2.md`、`chatbot-arena.md`：分别整理五项评测统一栏目、官方来源与逐项位置锚点、未核实项和研究状态。
- APEX-Agents 明确区分原版 480 tasks/33 worlds 与 1.1 版 240 tasks/31 worlds；记录 HF gated 需要同意分享联系信息，及 CC-BY-4.0 标签与 evaluation-only、禁止爬取/抓取限制并存，未访问受限文件。
- ARC-AGI-2 区分公开 training/evaluation 和非公开 holdout，记录公开仓库 Apache-2.0 与 evaluation 泄漏边界；ARC-AGI-3 区分交互任务、135 环境数据划分、MIT 工具代码和未获数据/媒体许可的环境记录。
- Arena-Hard-v2.0 明确官方名称为 v2.0-Preview、500 hard + 250 creative-writing prompts、judge/config 影响和题源许可待逐条确认；Chatbot Arena 区分动态平台与 33K/57.5K 两个公开快照、评分方法和数据使用边界。
- 本批只新增 research Markdown 和更新说明；未改 `content`、源码、生成产物，也未读取 gated benchmark 数据。各条样例转载结论均按官方来源及现有授权证据给出。

## 2026-09-23 — 启动 75 项 benchmark 官方来源重审

- 原因：用户通过 APEX-Agents 发现现有任务概述没有稳定回指 benchmark 官方 README/数据卡，参考资料也缺少直接数据入口并混入模型厂商报告。问题涉及全目录，不能只修单条。
- 新增 `docs/BENCHMARK_REAUDIT_PROGRESS.md`：列出全部 75 项评测的研究、正式内容和验收状态，并写明统一完成标准、架构任务与执行记录。后续所有批次以此文件为唯一进度台账。
- 本步骤只建立跟踪基线，没有修改正式 benchmark 内容、页面或生成产物；下一步先完成新 schema 与 APEX-Agents 试点，再按五批逐项研究和迁移。
- 搜索、资料探寻和官方来源查证全部交由 GPT-6 Luna；主任务负责结构设计、证据复核、正式内容集成和验证。
- 第一批 15 项已新增独立证据记录至 `docs/research/benchmarks/`：1 项 PASS、12 项 PASS_WITH_LIMITATIONS、2 项 PARTIAL。APEX-Agents 已区分原版 480 任务/33 worlds 与 1.1 的 240/31；AIME 2024/2025 因缺少 MAA 第一方 AI 数据包、split 和转载授权保持 PARTIAL，不再用模型报告补齐。
- 第一批同时逐字段复核了 BenchCAD、BFCL、AutomationBench 的站内真实样例；BrowseComp 与 BrowseComp-ZH 保持防泄漏边界。当前仅更新研究证据和进度台账，正式内容迁移等待新 schema 一次性落地。
- 第二批 15 项独立研究记录已完成并登记到进度台账，全部为 PASS_WITH_LIMITATIONS。重点澄清 GDPval 原始 benchmark 与 GDPval-AA 第三方 Agent 协议、GeneBench-Pro 完整集与公开代表案例、GPQA 的禁止在线披题要求，以及 CMMLU/FrontierMath 的官方来源冲突；冲突未被静默合并。
- 第三批 15 项独立研究记录已完成并登记到进度台账，全部为 PASS_WITH_LIMITATIONS。记录 HealthBench 系列和 HLE 的公开披露限制、LifeSciBench 的许可/隐私/专有/生物安全附件边界、LiveCodeBench 竞赛题权利、LongBench 21 个上游来源，以及 MATH-500、MathVista、MBPP 的数据与媒体许可范围。
- 第四批 15 项独立研究记录已完成并登记到进度台账，全部为 PASS_WITH_LIMITATIONS。研究发现 MCP-Atlas 现有样例把官方 500 条公开子集误标为 `train`，MMMLU 第二条样例的题面、标题和答案语义不一致，正式迁移前必须纠正或撤回；同时区分 MMMU 媒体权利、MRCR 两种实现、OfficeQA gated 变体和 OSWorld 各版本。
- 第五批 15 项独立研究记录已完成。全目录现有 75 份与正式 benchmark ID 同名的证据文件，每份均通过 13 栏结构检查；结论为 1 项 PASS、70 项 PASS_WITH_LIMITATIONS、4 项 PARTIAL。修正 4 个研究文件 ID（C-Eval、Chatbot Arena、CursorBench 4.0、HumanEval），确保后续迁移可与正式内容一一映射。
- 第五批复核了 SciCode、Small Overlapping Speech Bench 与 τ-bench 的现有样例；ScreenSpot-Pro、SimpleQA 保持 PARTIAL。SWE-bench、Terminal-Bench 各版本分别记录，Video-MME 与 WANDR 的媒体/第三方材料边界未被代码许可证覆盖。
- `docs/BENCHMARK_REAUDIT_PROGRESS.md` 新增唯一候选结构：官方定义、任务合同、数据概况、访问状态、复用政策、样例状态、带来源的指标/限制/关系和明确来源角色。候选先隔离在 `artifacts/candidates/reaudit`，避免正式内容在迁移中同时支持新旧结构。
- `schema.ts` 新增隔离候选的严格 `reauditedEntrySchema`，`validate-reaudit-candidates.ts` 与 `content:reaudit-check` 提供逐文件校验。它拒绝旧字段、中文自由状态值、未登记的证据 URL、模型厂商报告冒充非内部官方定义、样例状态/许可不一致和缺少访问入口；当前正式站点仍只读取旧 schema，候选全部通过后再一次性切换。
- 首轮 75 份候选全部生成，但严格校验发现各小组宽泛自检未统一枚举、数组类型、证据引用和旧字段删除，未进入正式内容。校验脚本增加按 ID 分组执行能力，要求三个小组分别修复到零错误后再进行全量审核。
- 三组候选均按严格 schema 重构后，全量输出 `[reaudit] 75 candidates passed strict validation.`；候选与现有正式内容的稳定 ID、名称、顺序、分类、发布方、年份和类型核对为零差异。研究状态同步为 1 项 PASS、70 项 PASS_WITH_LIMITATIONS、4 项 PARTIAL。
- 样例重审后候选保留 13 项共 22 条真实样例；Finance Agent、MCP-Atlas、MMLU、MMMLU、SWE-bench Verified 共 8 条旧样例因无法满足当前第一方回源、split 或第三方转载证据门槛而撤回，未用推测修补。

## 2026-09-23 — 代理类 benchmark 第二轮真实样例核验

- 原因：用户要求展示尽可能多的真实 benchmark 记录，并明确禁止编撰；本轮仅做官方来源和许可证据整理，不改正式内容或源码。
- 新增 `artifacts/candidates/samples-agent-round2.json`：保存 MCP-Atlas 的官方 CC-BY-4.0 真实记录字段、Terminal-Bench 2.0 有条件候选，以及 τ²-bench、OSWorld 2、OfficeQA、GDPval、SWE-bench Multilingual、WANDR、Terminal-Bench Science/4.0 的暂缓原因和官方证据 URL。
- 新增 `docs/research/2026-09-23-samples-agent-round2.md`：记录每条样例的 ID、split、原始字段、精确第一方来源及许可结论；明确排除参考解法、隐藏测试、答案键、工具轨迹和来源许可不清的第三方材料。
- MCP-Atlas 数据卡直接声明 CC-BY-4.0，因此题面与 TASK ID 可署名展示；其 GTFA_CLAIMS 和 TRAJECTORY 不进入候选字段，控制答案泄漏。
- Terminal-Bench 2.0 的题目位于根许可证标注 Apache-2.0 的官方任务仓库，但未发现独立数据卡；因此只列有条件候选，不将其写成独立数据许可证。
- OfficeQA 的访问条件限制答案键使用；OpenAI GDPval 数据卡未声明再发布许可；OSWorld V2 任务/素材 gated；其他项目分别存在第三方来源授权、canary 防污染或数据许可范围未明问题。本轮均不将其并入正式内容。

## 2026-09-23 — 扩展真实样例与多媒体展示

- 原因：用户要求尽可能多地展示 benchmark 官方真实记录，并支持文字、代码、图片、音频、视频及附件；严格禁止编撰。
- 进度：[x] 现有样例架构审查；[x] 多媒体 schema 与组件；[x] 三轮真实数据采用与排除审查；[x] 扩大公开数据核验；[x] 完整构建与浏览器验收。
- `src/content/schema.ts`：样例类型新增 `audio`、`video`、`record`；媒体统一为严格 `assets` 联合结构，支持图片、音频、视频、字幕、海报和普通附件。媒体型样例必须包含同类型真实附件；每项评测精选样例上限由 3 条调整为 6 条。
- `SampleViewer.vue`：使用浏览器原生控件展示媒体，禁止自动播放；支持官方字幕、官方转录文本、附件链接、媒体独立来源及加载失败提示。本站说明继续与原始记录分开。
- `content-pipeline.ts`、`verify-public-output.ts`：媒体、海报、字幕和附件全部进入安全路径、引用复制与产物残留检查；单个发布附件设置 25 MiB 项目预算，超限时必须采用经许可的轻量真实片段或官方入口。
- `tests/content.test.ts`：更新图片结构测试，新增音频、视频、字幕及媒体类型不匹配的校验用例。现有正式内容没有图片型样例，因此本次不需要旧字段迁移。
- 新增 `docs/research/2026-09-23-sample-architecture-audit.md`；来源搜索与样例发现按用户要求由 GPT-6 Luna 执行，主任务负责真实性、许可与正式接入审核。
- `content/benchmarks/benchcad.json`：接入官方 `QA/test_data/records.jsonl` 的 2 条真实问答记录，保留 record_id、family、qa_pairs 与数值答案标签，并增加官方数据文件和 CC BY 4.0 数据集卡来源。
- `content/benchmarks/automationbench.json`：接入官方 simple domain 的 example_id 3001，展示原始用户请求、模拟邮件、联系人初始状态和验收断言；许可说明明确排除第三方 API schema 材料。
- `content/benchmarks/agents-last-exam.json`：接入官方 `demo/hello` task card 的真实字段，仅将 summary 作为任务摘要展示，不扩写完整题目或答案。
- 新增 `docs/research/2026-09-23-samples-text-code.md`、`docs/research/2026-09-23-samples-media.md` 与两份候选清单。首轮媒体核验发现 Chartography、ARC-AGI-3 等虽有官方可视内容，但独立媒体再发布权未确认，因此仅保留研究记录，没有下载、热链或写入正式样例。
- `docs/CONTENT_MAINTENANCE.md`：同步 8 种样例形式、每项最多 6 条、媒体目录/字幕/25 MiB 限制，以及第一方来源与数据许可双重核验规则。
- 第一批接入后验证：74 条公开内容完成生成，TypeScript 检查和 11 项生命周期/结构测试通过；站内真实样例由 19 条增至 23 条。
- `content-pipeline.ts`、`types/benchmark.ts`、`ExploreView.vue`：目录投影新增自动计算的 `sampleCount`；首页由“拥有样例的评测数”改为展示真实样例记录总数，并同时注明覆盖评测数，避免把 13 个样例组误读成只有 13 条数据。
- `tests/content.test.ts`：为目录 `sampleCount` 增加有样例和无样例两种断言，保证后续增删数据时首页总数跟随正式内容自动变化。
- `content/benchmarks/bfcl.json`：接入 BFCL V4 `simple_python_0`、`simple_python_1` 两条官方数据记录，原样保留 question 与 function；源记录没有标准答案，因此页面不补造调用结果。条目公开状态依据 BFCL 数据目录的 Apache-2.0 声明完成核实。
- `content/benchmarks/mcp-atlas.json`：接入官方公开 train split 的任务 `689f4d693e212e8ef3390731`；只展示原始 TASK 与 PROMPT，不复制 GTFA_CLAIMS、TRAJECTORY 或工具清单。
- 新增 `content/benchmarks/small-overlapping-speech-bench.json`、两段 `content/assets/audio/` 原始 MP3 与本地署名许可说明：加入 LAION Small Overlapping Speech Bench 及 `clip_000`、`clip_001` 两条 test 记录，播放器、参考 transcript、逐说话人时间与原始字段均可核对。官方没有给出年份、版本或别名，因此不推测补齐。
- 两段音频从候选中已核验的官方固定 URL 下载，未转码或裁剪；文件分别为 422,253、335,853 字节，SHA-256 为 `96CE8FE481481559BD3F2B2B566380AB1B83DE7A7D6F67AED4D1A530FE635DAA`、`AD8E304656636F7C1D944FFD064B266A8FBDA0271F518C8EDD594F6A52AA7288`，均带 MP3 ID3 头。
- `content/benchmarks/scicode.json`：接入官方 dev 数据中的 `ewald_summation` 子任务 10.1，只保留逐字题面与身份字段，不公开 ground-truth code、测试或参考输出。
- `content/benchmarks/tau-bench.json`：接入原版 retail `TASKS_DEV[0]` 的真实 instruction 与 user_id，排除 actions 参考结果，并明确标注官方已将该批任务列为过时版本。
- 第三轮另核验 CMMLU 真题，但 CC BY-NC-SA 的非商业和相同方式共享条件尚未确认适用于本站，因此只保留条件候选；APEX、GAIA、BrowseComp-ZH、Terminal-Bench 等发布方限制抓取、重分享或训练语料收录的内容继续不转载。
- `README.md`、`AboutView.vue`、`PRODUCT_DESIGN.md`、`VERIFICATION.md`：同步 75 个 benchmark、18 组 30 条真实样例、8 种展示类型、媒体权利边界、音频校验值和本轮构建/测试结果；上一轮 74 条内容的验收记录保留为历史快照。
- 浏览器目视验收发现音频初始显示 `0:00 / 0:00` 容易被误认为加载失败；`SampleViewer.vue` 将音频预载由 `none` 调整为 `metadata`，进入页面即可显示官方文件时长，仍不自动播放或预下载完整音频。
- 真实浏览器验收：首页显示 75 个评测、30 条真实样例和覆盖 18 个评测；两段音频可播放/暂停、显示 0:26/0:20 时长，换题会收起答案并重置模式；参考 transcript、原始 JSON、记录 ID、test split、CC BY 4.0 与本地许可链接均可展开。BFCL、MCP-Atlas、SciCode、τ-bench 的新增题面和来源也已逐页加载核对。
- 浏览器没有样例、媒体或运行错误。开发页导航会报告 `vite-ssg` 内部仍使用 `next()` 的 Vue Router 弃用警告，定位在依赖包 `node_modules/vite-ssg/dist/index.mjs`，项目自己的守卫未使用该旧写法；未修改依赖产物掩盖警告。
- 首次类型检查没有进入 TypeScript，因为当前系统 npm wrapper 错误指向不可读取的 `%AppData%` npm 副本；改为显式调用项目本地 `vue-tsc` 后发现并立即修复媒体引用的两处真实编译错误，复查通过。未安装或修改全局工具。
- 最终验收：内容生成得到 75 条公开评测、18 份样例文件和 30 条真实记录；严格 TypeScript、11 项测试、生产构建及产物校验全部通过。最终根路径构建含 80 个静态路由与独立 404；`artifacts/benchatlas-static.zip` 为 2,838,520 字节、154 个压缩条目，已核对 75 个详情页、18 个样例 JSON、两段音频、许可文件、`index.html`、`404.html` 与 `.nojekyll`。本轮没有启动或停止用户服务，没有提交、推送或部署。

## 2026-09-23 — 从官方模型发布资料扩展评测收录

- 原因：用户提供的 Claude Opus 5.5 官方成绩表暴露新评测与版本缺口，要求通过多家官方发布表广泛搜集评测资料。
- 进度（当前工具无 TodoWrite）：[x] 确定来源与版本核验规则；[x] 多厂商候选研究；[x] 内容与报告映射审核合并；[x] 类型/内容/构建与浏览器验证；[x] 更新数量与交付记录。
- 使用 research 技能组织来源研究；第一批任务因额度限制中断。用户指定后，所有搜索探寻任务改由 GPT-6 Luna 执行，主任务负责审核和集成，不调用网页端 GPT。
- 新增 `docs/RESEARCH_WORKFLOW.md`，说明从官方报告发现、追溯原始评测、区分版本与运行设置、核验样例许可及候选审核流程；复用现有单文件内容架构，不新增后台或成绩排名数据库。
- `tests/search.test.ts` 新增官方 Opus 5.5 九行名称回归测试，要求每行准确且唯一映射，并确认 Terminal-Bench 2.0、OSWorld、GDPval-AA 旧条目仍可独立识别；防止扩充内容导致同名版本误匹配。
- `docs/research/2026-09-23-collection-summary.md` 汇总三组来源、截图九项逐条映射、采纳修正和未收录边界；三个厂商组研究文档保存具体原始链接与候选形成过程，供后续新增和核验复用。

- 最终验证：74 条、19 个样例、11 份报告通过内容校验，TypeScript 与 11 项测试通过；根路径构建完成 80 个页面及独立 404。SSG 清理占用由现有有限重试处理，完整产物检查通过。
- 真实浏览器验证：截图九名称均唯一匹配；74 张目录卡片和 61 个 Logo 实例加载，11 张报告卡；FrontierCode 私有提示/数据结构、Cursor 手机搜索、OSWorld 新旧版本跳转与刷新正常。1280px 桌面和 390px 手机无整页横向溢出，正常流程控制台无警告或错误。
- `docs/VERIFICATION.md`、采集汇总和 `artifacts/benchatlas-static.zip` 同步交付：静态包 2,193,675 字节、142 项，已打开核对 74 个详情、31 个 Logo、10 个样例文件及 Pages 必备文件。
- 临时视口已恢复、验收标签已关闭、本任务 4173 生产预览已停止；未启动开发服务，未操作用户已有服务，未提交、推送或部署。

## 2026-09-22 — 单条内容文件与维护生命周期

- 原因：新增、更新、删除涉及多处登记，旧采集脚本可以覆盖正式内容；按最简原则保留 Vue 页面和静态架构，统一内容入口与发布校验。
- 进度清单（当前工具无 TodoWrite）：[x] 数据无损迁移；[x] 结构/引用校验与公开产物生成；[x] 新建/发布/归档/删除工具；[x] 页面接入与题型声明；[x] 测试、构建、浏览器验收；[x] 维护文档与交付。
- 第一阶段：通过一次性脚本导出原始 49 条记录与样例核对基线，迁移至 `content/benchmarks`，共享分类、标识、发布资料和附件集中在 `content`；添加构建期结构校验依赖，避免手写两套字段定义。
- `src/content/schema.ts`、`scripts/content-pipeline.ts`：统一字段结构、题型检查、ID/引用/日期/附件校验；草稿在生成前过滤，样例独立输出，标识与许可仅发布被引用的素材。`.generated` 是可重建产物，页面只读取其中的已验证数据。
- 页面接入：目录只显示已发布条目，归档详情保留并说明本站归档原因；移除全局核验日期；代码题按 type 渲染，并实现已声明的图片题型。迁移接入中暴露 About 页旧日期导入，已立即修复，TypeScript 通过。
- `content-maintenance.ts`、`content-cli.ts` 与模板：提供新建草稿、发布、转草稿、归档、删除影响查询及阻止有引用条目的删除；状态切换先校验再保存，操作追加更新日志。
- `verify-public-output.ts`、`postbuild.ts`：检查实际构建目录中的详情、样例、附件清单和样例内容，阻止遗漏、陈旧数据与删除残留；来源检查脚本直接读取正式内容。
- 迁移逐字段与哈希核对通过：49 条原有元数据、19 个样例的题面/答案/来源/许可、顺序及 33 个附件内容不变。旧 public 样例/附件目录与两份登记文件移至忽略的 `artifacts/content-migration-backup`，不再参与构建，结果见 `artifacts/content-migration-check.json`。
- 两份 prepare 脚本改为仅写入 `artifacts/candidates`，不触碰正式内容与登记清单；候选不会进入构建。本轮未重新采集上游数据。
- 浏览器自查补齐归档行为：DetailView 隐藏归档条目的新增对比入口，归档原因单独显示以避免重复句号；CompareView 对历史链接中的归档条目标注状态。子路径构建出现一次 Windows 临时目录 EBUSY，重新执行后通过，没有修改依赖或绕过检查。
- 后续完整构建复现 SSG 临时目录清理 EBUSY：检查已安装 vite-ssg 实现与 Node 官方 rm 文档后，新增 `scripts/build-site.ts`，构建前精确清理自有临时目录，仅对构建末尾该目录的 EBUSY/rmdir 执行最多 5 次退避清理，并强制执行原产物校验。其他错误继续失败；不修改依赖、不全局替换文件系统方法。
- 连续子路径/根路径构建进一步暴露 Vite 清理旧 dist 时同类 EBUSY；构建前将自有 dist 同样以 Node 有限重试方式清理，避免依赖内部不重试的同步清理。临时目录和 dist 均拒绝符号链接，不触及作者内容。
- `tests/content.test.ts`：新增 7 项生命周期和数据边界测试，连同 3 项既有搜索测试，10 项全部通过。覆盖草稿隔离、失败发布不改源文件、独立日期、引用阻止删除、归档、样例撤回、旧产物残留及非法题型结构。
- `README.md`、`docs/CONTENT_MAINTENANCE.md`、`docs/adr/0003-content-lifecycle.md`：补全逐字段说明、命令、版本规则、样例题型、共享资源和候选发布边界；更新 Logo 文档和旧设计文档的架构替代说明，避免维护者继续编辑旧登记文件。
- 完成临时条目的新建→发布→归档→删除实测；真实浏览器确认归档不参与搜索、详情提示与历史对比状态、图片题型、390px 布局，以及正式 MMMLU 单选/答案/原始数据/切题重置。1920px 最终目录有 49 张卡片，Logo 全部成功加载；HumanEval 依据 type 显示代码格式。正常流程无浏览器警告或错误。
- 根路径与项目子路径构建通过；最终根路径构建实际触发临时清理重试并通过完整产物检查。49 个正式条目、10 组共 19 个样例、33 个附件保留；测试内容和图片均已删除，源目录、生成目录和 dist 均无测试标记。
- 更新 `docs/VERIFICATION.md` 与静态包 `artifacts/benchatlas-static.zip`：2,065,175 字节、112 项，核对 49 个详情、26 个 Logo、10 个样例文件、404.html 与 .nojekyll。已停止本任务生产预览，4173/4174 无监听；浏览器视口已恢复。未启动开发服务，未提交、推送或上线。

## 2026-09-22 — 优化资料站文案、页面层级与连续查阅

- 用户确认实施上一轮参考 VibeHub 得出的优化方向。保留现有数据、来源与 Vue 3 静态架构，优先改善查阅效率。
- `ExploreView.vue`、`BenchmarkCard.vue`：删除大型宣传区、重复副标题与导读句；首页前置搜索和目录；对比操作增加文字；列表视图进入 URL，清空筛选保留视图和排序。
- `DetailView.vue`、`SampleViewer.vue`：改用“任务概述、任务样例、评分方法、版本与衍生评测、参考资料”等中性栏目，样例优先展示，数据结构与记录许可按需展开；原题、中文说明、答案、来源及许可继续区分。
- `GuideView.vue`、`AboutView.vue`、`ReleasesView.vue`、`CompareView.vue`、`App.vue`：统一页面名称和对比操作名称，移除装饰性英文标题与面向读者无用的实现说明。
- 新增 `src/composables/catalogNavigation.ts`，更新 `src/main.ts`：按应用实例记录目录 URL 与离开时的滚动位置，让详情返回目录恢复筛选、排序、视图和位置；静态预生成之间不共享状态。
- `main.css`、`responsive.css`：删除旧首页宣传图样式，压缩页头和空白，统一中性色，保留品牌强调色，文字按钮与手机布局适配。
- 当前工具未提供 TodoWrite，以本节记录进度：文案、目录、详情、视觉集成、构建、浏览器验收和自行审核均完成。依照用户最新要求，本轮不以网页版 GPT 复审作为完成条件。
- 已完成阶段性 TypeScript 检查，无编译错误；未启动开发服务。
- `ArcTask.vue`、六组样例 JSON 与两份样例制备脚本：精简中文解读中的重复自证句，统一“原始数据”用词；原始任务字段、来源、许可和答案数据保持原样，ARC 中文操作提示同步更新。
- `README.md`：同步资料站定位、URL 浏览状态和样例交互。`scripts/postbuild.ts` 将旧标题文本检查改为稳定任务/样例栏目检查；首轮构建在旧标题断言处失败，修正后完整构建通过。
- 样例选择题使用原生单选与可点击标签，切题或切换评测清空选择；不计算分数。真实浏览器已确认 SWE-bench 样例与数据结构可展开、原始数据可切换。锚点调整移除重复顶部偏移，防止样例跳转多留空白。
- 独立源码复核发现中等屏宽下两列卡片规则会覆盖列表单列规则，改为 `.cards.list-view` 明确列表优先级，并纳入浏览器验收。
- 自查修正 `App.vue` 的目录链接：在目录页使用当前 URL，在详情页使用已记录的目录 URL，避免当前筛选被旧状态替换。用户最新要求本轮自行审核，后续以源码自查、自动检查与真实浏览器结果验收。
- 自动检查：TypeScript、内容校验、3 项既有名称识别测试、根路径与 `/benchmark-show/` 子路径生产构建均通过；49 个条目、10 组共 19 个样例与 55 个预生成页面保持完整。
- 浏览器验收：1440px 桌面、1000px 平板列表及 390px 手机布局；搜索、排序、视图与目录返回位置恢复；手机筛选选择后收起；两项评测对比；MMMLU 单选、答案、原始数据、切题重置；SWE-bench 样例与数据结构；ARC 测试输出隐藏/展开；GPQA 转载限制、未公开题目提示均通过。
- 目录位置恢复实测为离开前后 384px；1000px 屏宽的列表卡片与父区域均为约 709.8px。最新桌面首页 45 个 Logo 图片实例全部成功加载，无整页横向溢出；正常操作无浏览器警告或错误。详情样例锚点顶部为 148px，位于固定导航下方。
- 子路径真实浏览器确认筛选 URL、详情跳转、样例加载、Logo 与许可路径正确，刷新后列表视图保留；目录导航最新修正已复测。
- 新增 `artifacts/screenshots/ux-desktop.png`、`ux-mobile.png`、`ux-detail.png`，更新 `docs/VERIFICATION.md`，记录本轮实际结果；`.gitignore` 排除临时复审输入。
- 更新根路径静态包 `artifacts/benchatlas-static.zip`（2,064,069 字节），核对 112 个压缩条目，包含 26 个 Logo、49 个详情、404.html 和 .nojekyll。未远程推送或部署。
- 已终止本轮全部生产预览，确认 4173/4174 无监听；未启动开发服务，浏览器临时视口已恢复。

## 2026-09-22 — 开始产品实现

- 新建 `src/lib/search.ts`、`src/composables/compare.ts` 与卡片、图标、样例组件，实现名称规范化、别名检索、批量名称识别、最多三项对照和带取消保护的样例加载。
- 新建 `src/views` 下的图鉴、详情、对照、发布会索引、入门指南、关于、404 页面；更新 `src/main.ts` 与 `src/App.vue`，建立静态路由、页头、导航和对照浮层。
- 新建 `src/content/releases.ts`，将官方模型发布资料映射到真实评测条目；新增样例准备脚本、样例清单、实际样例与许可文本。
- 新建 `src/styles`，实现原创图鉴视觉、分类卡片、任务示意、详情阅读区和数据格式视图。
- 原始资料新增发现：HealthBench 也要求避免公开转载样例，因此相关条目明确使用官方阅读入口。

- `package.json` / `package-lock.json`：锁定依赖；将 TypeScript 固定为 5.9.3，修复当前 vue-tsc 不兼容 TypeScript 7 的实际编译错误；采用图标包的新名称 `@lucide/vue`。
- `src/content/catalog.ts`：录入分类、来源、任务形式、指标解释、版本关系、官方访问入口；包含厂商衍生评测和明确标注的内部评测。
- `scripts/research-samples.mjs`：增加公开数据的有界采集脚本，原始候选暂存在 `artifacts/research`，不直接发布未审核记录。
- 验证：基础项目及目录类型检查通过；已经通过浏览器查看 Claude Opus 4.6 官方成绩表原图，识别 MCP-Atlas、Finance Agent、GDPval-AA 等名称。

- 用户确认直接开工，授权自主完成产品与资料研究。
- 新建 `package.json`、`tsconfig.json`、`vite.config.ts`、`index.html`、`.gitignore`，建立 Vue 3 + TypeScript + Vite 静态项目。
- 新建 `src/main.ts`、`src/App.vue`、`public/favicon.svg`，建立应用入口与原创站点标识。
- 新建 `src/types/benchmark.ts`，明确评测、来源、样例、发布资料的类型；原始样例与中文解读分开。
- 新建 `scripts/validate-content.ts`、`scripts/postbuild.ts` 的初始入口，后续随内容完善校验与静态产物。
- 本步骤原因：先建立最小可编译项目，再增加资料和交互；不启动开发服务。

## 2026-09-22 — AI 评测图鉴需求梳理与网站设计

### 本轮范围

遵循用户调用的 grill-with-docs 技能，完成需求分析、代表性原始资料研究、领域术语梳理和可供确认的网站设计。用户已将首版范围交由设计者决定；方案选择以评测解读和样例浏览为主，通过官方链接查看成绩。

### 文件与影响

| 文件 | 修改内容 | 原因 | 影响 |
| --- | --- | --- | --- |
| `CONTEXT.md` | 新建评测、榜单、版本、子集、衍生、样例、配置、报告与来源等术语 | 防止内容采集和页面设计混用概念 | 为后续内容类型与中文解释提供统一词汇 |
| `docs/PRODUCT_DESIGN.md` | 新建首版范围、用户流程、页面、卡片示意、样例交互、视觉、候选内容、技术方案与验收清单 | 将口头需求变成可执行和可核对的设计 | 明确约 40 条首批采集目标、纯前端边界、内容质量规则和实施检查点 |
| `docs/RESEARCH_NOTES.md` | 新建十组代表性评测的原始来源及影响设计的事实 | 防止依赖名称印象设计样例和版本关系 | 明确 GPQA/BrowseComp 的转载限制，以及题目、环境和报告的差异 |
| `docs/adr/0001-benchmark-identity.md` | 记录评测、版本关系与报告分别建模的决策 | 避免把厂商运行设置当作新评测或丢失真实衍生关系 | 后续条目可以保留来源、配置与版本语义 |
| `docs/adr/0002-static-pages.md` | 记录基于 Vue + Vite 的静态详情页预生成方案 | 支持 GitHub Pages 上的详情直达与正文可读取性 | 增加构建阶段静态生成，无运行时后端 |
| `UPDATE_LOG.md` | 新建本轮变更、原因、影响和验证边界 | 满足项目更新记录要求 | 保留本轮设计工作的可追踪记录 |

### 验证与边界

- 工作区原为空目录，不存在已初始化的 Git 仓库或应用代码。
- 已阅读用户指定技能及其引用的 grilling、domain-modeling 说明和文档格式要求。
- 已通过官方项目页面、原始发布、官方仓库和官方数据卡研究十组代表性内容；约 40 条是首批采集目标，不是本轮已收录数量。
- 已检查 6 份 Markdown 文档的本地链接，断链数量为 0；已核对设计状态、首批目标和待实施事项的表述一致。
- 仅新增 Markdown 文档，未安装依赖、未修改应用代码、未执行编译、未进行浏览器运行验收。
- 未启动、停止或重启任何服务；未创建远程仓库、推送或部署。
- 当前工具无 TodoWrite，设计文档末尾使用阶段清单跟踪。
- 网站实现与内容采集待设计确认后进入；没有将文档完成表述为网站完成。

### 编译与交互收尾

- `src/views/DetailView.vue`：将来源域名格式化移入脚本，修复 Vue 模板中直接使用 URL 构造器引起的类型错误；类型检查已通过。
- `src/main.ts`、`src/styles/main.css`、`src/styles/responsive.css`：按正确顺序加载响应式覆盖，提高正文对比度，补齐手机筛选、单列卡片、详情、样例与对照布局，支持减少动态效果偏好。
- `scripts/validate-content.ts`：校验唯一 ID、分类、来源、关系、样例清单、真实记录字段以及发布资料关联，阻止未审阅样例误入发布目录。
- `scripts/postbuild.ts`：检查每条详情的预生成正文，生成 Pages 404 和 .nojekyll；仅在提供真实 SITE_URL 时生成 sitemap/robots。
- `tests/search.test.ts`：覆盖发布图名称差异、版本区分、批量分隔符与未知名称等真实使用边界。

### 真实样例与发布资料补充

- 新增 `src/components/ArcTask.vue`：把 ARC 官方公开训练题的实际矩阵渲染为彩色网格，测试输出随答案展开显示；支持原始 JSON 核对。
- `src/content/catalog.ts`、样例清单、类型、SampleViewer：新增 MMMLU 和与 MMLU/MMMU 的关系，接入中文原始题面与 ARC 任务；共 48 条评测、10 组样例。根据 Scale 原始发布资料确认 MCP-Atlas 首次发布为 2025 年。
- `scripts/prepare-extra-samples.mjs`、`public/samples`、`public/licenses`：保存两组经许可核对的实际记录及 ARC 许可；原样例脚本保留新增清单，修正 GSM8K 解读中的鸭蛋笔误。
- `src/content/releases.ts`、`ReleasesView.vue`：增加 Gemini 3.1 Pro 官方模型卡索引、Claude 原图入口，并补上成绩图中的 MMMLU。
- `.github/workflows/pages.yml`、`README.md`：添加 Pages 发布流程与维护说明，路径和 sitemap 使用真实 Pages 元数据。未执行远程发布。
- `.gitignore`：排除未发布的研究候选；新增 `scripts/audit-sources.ts`，供维护时检查来源 HTTP 状态。

### 来源复核与代码可维护性

- `src/content/catalog.ts`：C-Eval 官网连接不稳定，改用已核对可访问的官方仓库与数据卡；同步官方 2025 年公开完整测试集的说明。
- `package.json` / 锁文件新增固定版本 Prettier；格式化全部源码、脚本与测试，保持易读的统一代码风格，未改变运行行为。
- `artifacts/source-link-audit.json`：70 个来源链接的检查结果，无 404；部分官方站点对自动 HEAD 请求返回 403，不将其误判为不存在。
- 子路径生产构建通过：48 条详情、19 个真实样例、4 组发布资料，含独立 404 和带实际测试地址的 sitemap。

### 部署权限与异常路径验收

- `.github/workflows/pages.yml`：构建阶段增加 `pages: read`，用于 configure-pages 读取真实部署地址；发布权限仍仅放在部署阶段。
- 浏览器已验证 `/benchmark-show/` 子路径下详情直达、样例加载、对照上限与分享刷新、手机筛选和列表、横向表格滚动及未知地址页面。
- 通过临时阻止单个样例请求复现失败提示，再解除阻止并点击重试，真实样例成功恢复；测试阻止规则已清除。

### 交付文档与视觉记录

- `docs/PRODUCT_DESIGN.md`、`docs/adr/0002-static-pages.md`：同步实际实施状态和集中式内容文件方案，区分本地验收与未执行的线上发布。
- `docs/RESEARCH_NOTES.md`：补充模型官方成绩图、MMMLU、ARC 公开任务、许可和 Pages 资料。
- `docs/VERIFICATION.md`：记录构建、19 个真实样例、真实浏览器交互、失败重试、手机和子路径结果及验证边界。
- `artifacts/screenshots/desktop.png` / `mobile-check.png`：保存实际桌面与手机首页截图。
- 键盘验收：Tab 首先到达“跳到正文”，Enter 后继续 Tab 能到正文搜索框；搜索框与批量识别按钮可通过键盘访问。

### 可读性修正

- `src/styles/main.css`、`src/styles/responsive.css`：根据实际浏览器计算的对比度结果，加深偏浅的前景文字（页头副标题、辅助说明、数量、页脚等）；保留彩色背景、分类图标及深底按钮的白色文字。原因是低对比度会降低普通读者的阅读体验，属于必要修正。
- `src/components/ArcTask.vue`：同步加深隐藏答案提示文字，修复该组件局部样式中的低对比度。首页和 GSM8K 详情实际文字对比度复测无低于 4.5:1 的检测项。

### 独立复审修正与版本核验

- `src/content/catalog.ts`、`releases.ts`：拆开 OpenAI MRCR 与 DeepMind MRCR v2；保留 Anthropic 报告指向 OpenAI 的实际链接，Gemini 指向 DeepMind 实现，共 49 条。补齐 MATH-500 的 OpenAI 原始子集出处与 2023 年份。
- `SampleViewer.vue`：ARC 操作说明标为本站提示；原始格式明确包含参考答案，防止误读。
- 样例类型、两份制备脚本及 9 组带本地许可的样例：分离 licensePath 与署名文字，添加适配部署子路径的许可链接；内容校验检查真实许可文件。原始题目与答案未改写。
- 名称识别测试新增 MRCR 不同实现的区分；README、产品设计与验收文档同步数量及答案展示说明。

### 最终验收与交付

- 最终根路径与 `/benchmark-show/` 子路径构建均通过：49 个条目、10 组 19 个样例、55 个预生成页面；3 项名称识别测试通过。
- 真实浏览器确认 ARC 标签、原始答案提示、MRCR 消歧，以及子路径许可链接实际打开 Apache 正文；正常页面无控制台错误。
- 网页版 GPT 增量复审结论 PASS，原 3 项必须修复与 2 项建议均关闭，MRCR 拆分通过，无剩余 MUST_FIX。验收记录保存复审链接及证据边界。
- 更新桌面/手机截图，新增真实 ARC 样例截图；生成并检查 `artifacts/benchatlas-static.zip`（根路径构建）。
- 终止本任务启动的两项生产预览，4173/4174 已无监听；未启动开发服务，未操作其他服务。
- 最后同步产品设计与验收文档状态。没有远程推送或部署。

## 2026-09-22 — 用真实发布方标识替换评测通用图标

- 用户反馈卡片分类图标辨识度不足，要求采用发布机构 Logo。按最简原则复用一个 PublisherMarks 组件，应用于评测卡片、详情标题与首页 SWE-bench 示例；联合发布并排展示，未核实标识使用发布方文字。
- 新增 `src/content/brand-assets.json`、`brands.ts` 与 `public/logos/`：保存原始机构/项目素材、明确条目关联和官方来源，不根据作者个人所属机构猜测发布方。
- `main.css`、`responsive.css`：删除失去用途的分类图标样式；Logo 组件保持素材比例、原色，并适配列表与手机。
- `validate-content.ts`：构建时检查标识来源、文件路径、文件存在、条目关联与 SVG 的主动内容。
- `AboutView.vue`、`README.md`：同步真实 Logo 的来源规则与权利说明；`.gitignore` 排除临时复审附件。已完成首轮 TypeScript 检查，最终构建与浏览器验收待记录。

- 最终接入 26 个真实标识，覆盖 43 个条目，6 个条目使用发布方文字；Aider 横向字标按原比例呈现，C-Eval 使用官方账号的圆形标识。`docs/LOGO_SOURCES.md` 保存完整出处与回退原因。
- 真实浏览器：桌面卡片、390px 手机卡片/列表/联合Logo详情均无横向溢出；首页 47 个标识实例（含首页示例与联合发布）全部加载。模拟 OpenAI/SWE-bench 图片失败后正确显示发布方文字，阻止规则已清理。
- `/benchmark-show/` 子路径构建及浏览器检查通过，全部 Logo 路径带正确前缀，无破图。保存 `publisher-logos-desktop.png`、`publisher-logos-mobile.png`。

- 专项复审发现 scoped CSS 中 `:global(.list-view)` 的后续选择器被编译丢弃；改为对完整选择器使用 :global，实测构建 CSS 已变为 `.list-view .publisher-marks` 等精确规则，避免列表被错误设为 44px 宽。
- 联合标识改为逐个图片回退对应机构名称，即使只失败一张也保留各方身份；不再通过过滤失败图片隐藏其中一方。

- 为静态首屏图片增加函数 ref 检查，覆盖错误发生在 Vue 绑定监听器之前的情况。经真实浏览器暂停/恢复脚本验证，预先失败图片正确转为 OpenAI 文字。最终列表宽度与父区域一致，保留截图 publisher-logos-list.png。首轮仅检查横向溢出不足以发现窄容器问题，验收记录已如实补充。

- 最终网页版 GPT 增量复审 PASS，三项问题全部关闭；docs/VERIFICATION.md 记录修正依据与边界。静态包已更新为 2,090,952 字节并核对包含 26 个标识资源。本轮启动的生产预览已停止，没有启动开发服务。

- 2026-09-22T08:38:27.810Z 内容维护：新建 content/benchmarks/maintenance-check.json 草稿，尚不公开。需重新构建后发布生效。

- 2026-09-22T08:38:27.958Z 内容维护：content/benchmarks/maintenance-check.json 状态更新为 published。需重新构建后发布生效。

- 2026-09-22T08:38:28.067Z 内容维护：content/benchmarks/maintenance-check.json 状态更新为 archived，原因：临时验收：验证归档详情与图片样例，验收后移除。。需重新构建后发布生效。

- 2026-09-22T08:38:28.070Z 内容维护：新建 content/benchmarks/maintenance-draft-check.json 草稿，尚不公开。需重新构建后发布生效。

- 2026-09-22T08:43:51.966Z 内容维护：删除 content/benchmarks/maintenance-check.json；重新构建将移除页面、样例及失去引用的公开附件，共享素材源文件保留。需重新构建后发布生效。

- 2026-09-22T08:43:53.616Z 内容维护：删除 content/benchmarks/maintenance-draft-check.json；重新构建将移除页面、样例及失去引用的公开附件，共享素材源文件保留。需重新构建后发布生效。

### 本轮首批采用（2026-09-23）

- `content/benchmarks/` 新增 Anthropic 9 条、Google/国内来源 8 条；各自保留核验日、原始来源、指标限制和版本关系，旧条目不覆盖。
- `content/brands.json` 与 `content/assets/logos/` 新增 Cognition、Cursor、Zapier、Surge AI、Perplexity 官方标识，供发布方显示复用。
- `content/releases.json` 增补 Gemini 三项关联，并新增 DeepSeek-V3.2-Exp、Qwen3、Kimi K2 官方资料摘录；日期按所链接资料的公开日期。
- 原因：将模型发布表中出现的评测追溯为可查阅条目；影响仅为静态内容和资源增加，无页面结构或后台变更。

- `content/releases.json` 新增 Claude Opus 5.5，映射九行表格与正文 WANDR；官方以 HTML 表格呈现，未找到对应独立图像素材，因此不添加伪原图链接。Qwen3/Kimi K2 标题注明技术报告，避免把论文日期误读为模型首发日。
- `docs/LOGO_SOURCES.md` 补全五个新增 Logo 的官方出处与实际素材链接；`docs/CONTENT_MAINTENANCE.md` 连接新的采集流程。首批 66 条内容类型检查与 11 项测试通过。

- `README.md` 同步首批 66 条 / 8 份报告数量、候选目录边界与采集流程入口；待 OpenAI 最终审核后更新完整数量。

- 最终采用 OpenAI 8 条，新增 GPT-5.4、GPT-5.6、GPT-6 Astra 三份发布资料；`content/benchmarks/benchcad.json` 的 IoU/准确率方向统一为越高越好。当前总量 74 条、11 份报告、31 个 Logo；`README.md` 同步最终数量。
- 报告只关联已明确版本的评测；保留 OfficeQA 命名推断依据，排除没有注明版本的 Mind2Web 速度关联；未将 GDPval-AA v2 合并为 v2.1。新增条目均未搬运未经逐题核验转载许可的样例。

## 2026-09-24 — 确认并统一项目名称

- 原因：用户确认英文名称为 `what's a benchmark?`，中文名称为“到底测什么？”，以日常提问表达资料站定位。遵循最简原则，仅调整命名和对应说明。
- `src/App.vue`：更新页眉、页脚及首页链接无障碍名称，保留英文全小写和问号。
- `index.html`、`src/views/ExploreView.vue`：更新站点标题、首页主标题和默认描述；目录分类回退文字改为“评测目录”。
- `src/views/DetailView.vue`、`CompareView.vue`、`AboutView.vue`、`GuideView.vue`、`ReleasesView.vue`、`NotFoundView.vue`：同步各页面标题；关于页使用中文站名；详情默认描述与返目录文案保持自然语句。
- `package.json`、`package-lock.json`：内部包名统一为 `whats-a-benchmark`，依赖与版本不变。`tests/content.test.ts` 同步临时目录前缀及其安全清理断言。
- `.github/workflows/pages.yml`：同步工作流显示名称，发布路径与行为不变。
- `README.md`、`CONTEXT.md`、`docs/PRODUCT_DESIGN.md`、`docs/LOCAL_SAMPLE_IMPORT.md`：同步项目名称；产品设计中的暂定提案更新为用户已确认的命名。
- `content/assets/licenses/small-overlapping-speech-bench.txt`：本站再发布说明的主语改为 This site；原发布方、许可证、来源及未转码未裁剪事实不变。
- 历史研究、验收、更新日志和旧交付快照保留当时名称；当前构建产物随构建更新。目录路由、内容数据、样例、筛选与对比逻辑不变。
- 验证：类型检查、生产构建、12 项现有测试及真实浏览器检查已通过；两处内容称谓收尾后再次通过类型检查、90 路由构建及静态产物校验。当前工具无 TodoWrite，以本条记录跟踪改名与验收。
- 收尾复查：`content/benchmarks/screenspot-pro.json` 与 `content/benchmarks/swe-bench-multilingual.json` 中两处旧站名改为“本站”，仅更新本站称谓，评测事实与来源核验日期不变。
- 首轮验证：TypeScript、生产构建和 12 项现有测试通过；浏览器桌面与 390px 视口（实际内容宽 375px）确认首页、页眉、页脚与关于页新名称正常，根节点 scrollWidth 与 clientWidth 均为 375，无横向溢出，控制台无警告或错误。已恢复视口、关闭测试标签并停止临时预览。
## 2026-09-24 — 页眉增加版本点缀 🚀

- 原因：用户希望为本次大版本稍加火箭元素，遵循最简原则。
- `src/App.vue`：仅在页眉英文站名后添加一个 🚀，作为装饰并设置 aria-hidden；正式名称、页面标题、页脚和导航行为不变，不新增动画或样式。
- 验证：待类型检查、构建与浏览器确认。
## 2026-09-24 — 架构、样式与状态管理优化

- 原因：样式覆盖分散、组件承担多种职责、目录查询规则集中于页面、对比链接与选择栏状态不一致。遵循最简、单一职责及严格类型原则，不引入新框架或向后兼容层。
- 进度：[x] 只读梳理与原件备份；[x] 样式归属及样例职责调整；[x] 查询/对比规则集成；[x] 全量类型、测试与生产构建；[x] 桌面/手机浏览器验收；[x] 最终变更清单及服务清理。
- 本轮开始时目录无 Git 元数据，原件备份于用户临时目录 benchmark-architecture-20260924；随后按用户要求建立 Git 基线。保留既有站名、火箭装饰和正式评测内容。
- src/styles/main.css 改为唯一全局样式入口；新增 tokens.css、base.css、shared.css、layout.css、catalog.css、reading.css、detail.css，按职责集中基础规则及断点。删除 responsive.css，原非媒体查询的颜色/字号覆盖已合入对应基础规则。
- src/styles/benchmark-card.css 与 src/components/BenchmarkCard.vue：卡片专属样式由组件加载，保留列表父容器上下文；状态标签使用明确状态选择器，修复文字色和边框色被基础标签覆盖。
- src/styles/sample-viewer.css 与 src/components/SampleViewer.vue：样例专属基础、交互及响应式样式集中，并由组件 scoped 加载；src/main.ts 移除旧 responsive.css 导入。
- src/composables/sampleLoader.ts：集中样例请求、取消、错误、重试和过期响应保护，保留客户端挂载门控及构建时 schema 校验，不把完整校验库引入客户端。
- src/components/SampleMedia.vue：集中图片/音频/视频/附件、字幕/来源与媒体失败展示；SampleViewer 保留题目选择、模式和答案交互。tests/sample-loader.test.ts 覆盖挂载门控、取消、旧响应、卸载、错误和重试，两项通过。
- 本阶段类型检查通过；最终构建、浏览器结果将在下方补齐。
- src/lib/catalogQuery.ts、src/composables/catalogQuery.ts、src/views/ExploreView.vue：集中查询参数解析、有限筛选键、排序/视图类型、筛选交集、清空行为和统计；继续以 URL 为唯一筛选来源，保留分类收起及清空时的排序/视图。
- src/lib/comparison.ts、src/composables/compare.ts、src/App.vue、src/views/CompareView.vue：对比页 URL 驱动表格与底栏，直接打开/刷新分享链接恢复选择；移除及清空同步 URL，离开后保留本次应用选择；上限与 ID 去重校验统一，实例隔离并清理路由订阅，挂载后读取分享参数以保持静态页面水合一致。
- tests/catalog-query.test.ts、tests/comparison.test.ts：新增六项用例，覆盖参数边界、筛选交集和排序、分享恢复、移除与清空、导航历史、上限及实例隔离；均通过。
- src/lib/search.ts：预计算标准化名称及搜索语料，批量名称查询复用索引；保留原匹配字段、版本区分及排名规则，减少输入时重复计算。
- 本阶段类型检查通过；样式与本轮修改文件已格式化。
- Git：按用户要求初始化本地仓库，并从本轮修改前原件构造初始源码基线 43ddeef；本轮优化保留为未提交差异。未配置远程、未推送。`.gitignore` 补充本地 .env 文件和 artifacts/*.zip 忽略，保留 .env.example。
- README.md、docs/ARCHITECTURE.md：补齐内容链路、模块职责、样式文件归属、URL 状态语义、样例请求生命周期及验证约定。完整目录元数据仍随首页加载，作为规模增长后的可测量优化项，不为当前目录增加第二套数据链路。
- 样式收尾：合组相邻且声明完全相同的选择器，删除无引用的 .sample-image 与已被覆盖的选项旧规则；对外部样例说明使用明确选择器，维持 scoped 迁移前的间距优先级。
- 已完成首轮全量 20 项自动测试、严格 TypeScript、90 路由生产构建和 89 个静态页面及 Pages 404 检查；构建仍提示主包超过 500 kB，未隐藏该告警。
- 最终样式收尾后再次通过严格 TypeScript 与生产构建：90 个路由、89 个静态页面及 Pages 404 核验成功。公开内容仍为 84 项、27 条样例、17 份发布资料，未修改评测数据。
- 真实浏览器：1440px 视口比较目录 30 个节点与详情/样例 15 个节点的尺寸、显示方式、字号和文字色；详情基线完全一致，目录仅状态标签文字色按预期修复。验证对比分享刷新恢复、移除和清空同步表格/底栏，搜索/列表状态从详情返回后恢复。
- 390px 视口（实际内容宽 375px）验证分类筛选后收起、7 项数学结果、ARC 网格答案从 5 个增至 6 个、音频样例原生控件且不自动播放、查询链接刷新、17 张发布资料卡、阅读指南和关于页；已测页面无整页横向溢出。
- 临时阻止 ARC 样例请求后显示加载失败，解除阻止并点击重试恢复成功。正常操作控制台无警告/错误；故障模拟仅产生预期的 samples 请求失败日志。阻止规则与视口覆盖已恢复，验收标签已关闭。
- 本地分支使用 main，与既有 Pages 工作流一致；初始基线 43ddeef 已提交，本轮优化保持未提交，可直接查看完整 Git diff。未添加远程或推送。
- 结束前停止本轮临时生产预览，确认 4173 端口无监听；未启动开发服务。git diff --check 通过，原件备份保留供核对。

## 2026-09-24 — improve-codebase-architecture 候选审查

- 原因：用户主动调用该技能，要求在现有架构优化基础上，按 module/interface/depth/seam/locality/leverage 与 deletion test 检查深化机会。
- 范围：读取 CONTEXT.md、三个 ADR、Git 基线与最近未提交变更；搜索探查由 GPT-6 Luna 执行。仓库仅有初始基线，未推断长期提交热点。
- 产物：HTML 报告位于 C:\Users\admin\AppData\Local\Temp\architecture-review-20260924-092624.html，报告不进入仓库；含两个候选的前后结构图、文件证据、删除检验、收益和优先建议。
- 结论：目录查询的真实 Router seam 测试覆盖、任务样例重置与媒体失败状态寿命，均为 Worth exploring，没有 Strong 候选。保留现有评测对比、样式归属、静态内容管道及三个 ADR。
- 验证：HTML 静态解析、候选数、前后图容器及推荐区检查通过；已请求在 Codex 文件面板显示报告。内置浏览器因本地 file URL 安全策略拒绝预览，未绕过该限制，未声称 CDN 图形完成视觉验收。
- 本轮只更新本日志，未修改业务代码或实施候选，未启停服务；按技能流程等待用户选择深入讨论的候选。

## 2026-09-24 — 落实架构审查的全部候选

- 原因：用户明确要求全部修复。遵循单一职责、最简与严格类型原则，落实报告中的目录查询接口验证、样例交互生命周期两个候选。
- `src/lib/catalogQuery.ts`、`src/composables/catalogQuery.ts`、`src/views/ExploreView.vue`：目录页面统一消费 URL 查询接口的结果、统计及操作，真实 Router 由应用注入；连续筛选合并未完成目标，防止不同条件相互覆盖，界面仍只读取已生效的 URL。
- `tests/catalog-query.test.ts`：增加真实内存路由的生产接口测试，覆盖连续筛选、空结果、清空保留排序和视图及历史恢复。
- `src/composables/sampleViewer.ts`：集中加载结果、当前任务与交互状态；新结果回到第一题，切题重置展示模式、选项、答案及媒体失败记录，模式切换保留状态。
- `src/components/SampleViewer.vue`：移除重复状态重置逻辑，消费统一查看接口；`src/components/SampleMedia.vue`：只读失败列表加错误事件代替可写双向数组，失败去重及当前题目资产校验由父级状态模块负责。
- `tests/sample-viewer.test.ts`：新增两项生产接口生命周期测试，覆盖挂载门控、模式保留、切题、重试、评测切换、停用与无关媒体错误。
- `docs/ARCHITECTURE.md`：同步模块职责、单向媒体错误通信及验证约定。
- 阶段验证：严格 TypeScript 通过，样例加载及查看接口四项测试通过；全量构建和浏览器验证待下方补齐。未新增依赖、未修改正式评测内容。
- 最终验证：严格 TypeScript、全量 24 项自动测试通过；生产生成 90 个路由，89 个静态页面与 GitHub Pages 404 校验通过。保留既有主包约 652.52 kB（gzip 185.81 kB）的体积提示。
- 目录接口附加测试验证连续筛选后立即离开页面，不会被待完成筛选拉回目录；使用 Router 自带的导航取消，不引入串行导航队列。
- 真实浏览器：目录搜索/列表/年份排序从详情返回后恢复，清空筛选保留视图与排序并恢复 84 项；MMMLU 选项与答案展开跨任务/原始模式保留；HumanEval 从原始模式切到第二题回到任务内容并收起答案。
- 媒体故障验收：临时阻止 clip_000 音频请求后显示失败提示；解除阻止再切换模式，失败提示仍保留且不重新挂载音频；切到 clip_001 再返回 clip_000，失败记录清除，音频 readyState=4。正常操作控制台无警告/错误，375px 实际内容宽度下无整页横向溢出。
- 已解除网络阻止、恢复视口并关闭临时验收标签；临时生产预览已停止。未启动开发服务，未新增依赖或修改正式内容。
- Git 差异检查通过；本轮新文件纳入可审查差异，优化改动仍未提交，未配置远程或推送。两个审查候选已全部落实。

## 2026-09-24 — 第二轮深入架构复审（只读）

- 原因：用户再次调用 improve-codebase-architecture，要求扩大和加深审查。采用 codebase-design 的 module/interface/seam 与 deletion test，按 CONTEXT.md 和三个 ADR 判断实际收益；未修改业务代码、内容或测试。
- 范围：三条 GPT-6 Luna 审查线分别检查内容 schema/维护与生成链路、前端状态/路由/样例生命周期、样式归属及页面模块依赖。仓库仅有 43ddeef 基线，不推断长期提交热点，重点依据当前架构优化差异。
- Strong：src/content/schema.ts 的 draftRelationSchema 拒绝 published 关系中的 sourceUrls；scripts/content-maintenance.ts 的 setStatus 保留关系只改状态，经 loadContent 内存覆盖复现转草稿先报 unknown sourceUrls。aime-2025 还有合法入向关系和发布报告引用，本报告不声称该条目当前可直接撤回；结构冲突与正常引用阻止必须分开。现有 tests/content.test.ts 夹具清空 related，未覆盖有来源关系的状态往返。
- Worth exploring（低优先）：src/composables/compare.ts 的连续同步 toggle 都读取旧 URL；真实 memory Router 从 mmmlu,swe-bench-verified,gpqa-diamond 连续移除前两项后，仍得到 mmmlu,gpqa-diamond。当前无异步守卫，普通独立点击通常不会触发，不扩大为常见 UI 故障。现有测试每次等待导航，缺少交叠调用覆盖。
- 保留结论：样式单入口、分域规则、局部 scoped、列表祖先上下文、搜索索引、当前样例/媒体分工、公开投影及静态站路线没有新增足够证据支持继续重构。未将目录水合猜测或测试覆盖边界冒充已确认故障。
- 验证：重跑目录查询、对比、样例加载及样例查看共 12 项测试，全部通过；额外只读探针复现上述两个缺口。未重新构建、未启动或停止服务，未做线上或浏览器交互验收。
- 报告：C:\Users\admin\AppData\Local\Temp\architecture-review-20260924-130253.html。包含 2 个候选、4 个前后示意、证据与 ADR/删除检验；jsdom 静态 DOM、数量及锚点检查通过，已请求在 Codex 文件面板打开。CDN Mermaid 图形没有完成浏览器视觉验收，未绕过此前本地 file URL 安全限制。
- 本轮仓库只追加本日志；候选尚未实施，Git 优化改动继续保留未提交状态，未推送。建议优先修复内容状态转换约束，报告不预先设计新 interface。

## 2026-09-24 — 全量代码功能审查（逐文件覆盖）

- 原因：用户指出前两轮仅为架构热点抽查，没有覆盖全部代码功能。本轮改为当前磁盘全量代码清单、逐文件职责/异常/验证矩阵及定向故障复现，未修改业务实现。
- 新增 `docs/CODE_FUNCTION_REVIEW.md`：覆盖 66 个唯一代码/配置/测试文件（40 src、13 scripts、6 tests、5根配置、1 HTML、1工作流），逐项保存当前行数和 SHA-256 前缀，给出页面、状态、媒体、内容生命周期、采集和发布流程的功能结论与未验证边界。锁文件只做结构/顶层依赖核对，不冒充第三方依赖源码审计。
- 搜索、目录盘点和三条分工审查均由 GPT-6 Luna 执行；主审复核关键实现及报告措辞，纠正手工行数、搜索索引字段范围和普通点击与同步调用的区别。已删除 responsive.css 不计入当前文件，第三方依赖和生成产物不计入第一方源码。
- 确认 8 项：F1 草稿关系不接受正式 sourceUrls；F2 采集失败仍 exit 0 且保留可能被复用的旧记录；F3 批量纯符号名称误给目录前五项；F4 版本关系未在本栏目显示依据；F5 畸形样例对象被当成成功加载；F6 对比连续同步移除覆盖；F7 日志写入失败时源修改已经落盘；F8 缺 favicon 时生成失败先清空旧输出。各项有触发条件、影响范围及测试缺口，F4为模板静态确认，其余使用无副作用内存或TEMP夹具探针，不声称真实项目已遭遇注入故障。
- 验证：严格 TypeScript 通过；全部24项自动测试通过；三个mjs语法检查通过；实际内容校验通过84条目/27样例/17报告；直接verifyBuild检查现有dist通过；jsdom遍历90个现有页面，单一H1、当前页锚点、2043个站内链接目标均通过。
- 未重新生成或构建真实项目，未启动/停止服务，未请求外部数据源或部署；没有把静态审查等同于全分支动态验证。图片/视频/字幕/file实载、Vue自动挂载、水合、浏览器键盘/视觉、远端Pages、部分文件锁和写盘失败分支仍明确列为覆盖缺口。
- 本轮仓库仅新增审查报告并追加本日志；代码/配置快照校验未变化，发现项尚未修复。既有Git优化改动保持未提交，未推送。

## 2026-09-24 — 全量审查修复（F1–F8 已完成）

- 原因：用户要求修复全量代码功能报告的全部 8 项问题。遵循最简、单一职责、严格类型原则，保留此前 Git 未提交差异与静态站架构。
- F1：src/content/schema.ts 的草稿关系复用正式关系定义，仅将 sourceUrls 设为可选；有来源的正式条目撤回时不再丢失或拒绝关系证据。tests/content.test.ts 验证发布→草稿→发布、来源保留和公开样例退出。
- F7：scripts/content-maintenance.ts 在内容已经成功写入后，单独捕获日志追加失败并明确警告“内容操作已完成、请手工补记、不要重复执行”，避免附属日志故障误报整个变更失败。测试覆盖新建、归档和删除三个实际落盘结果。
- F8：scripts/content-pipeline.ts 在清理旧生成结果前读取并验证 favicon，后续写入已读取的内容；缺失或空文件立即中止。测试逐文件比较旧输出字节不变，再恢复输入验证成功生成。此为输入失败保护，不宣称任意磁盘写入中断均可事务回滚。
- F4：src/views/DetailView.vue 的每条关系复用 EvidenceLinks 展示精确依据；src/styles/detail.css 增加关系容器、独立导航链接与窄屏换行，避免嵌套链接并保留既有卡片外观。
- 阶段检查：严格 TypeScript 通过；内容专项 10/10 通过。其余修复、全量构建及浏览器验收继续执行，结果随后补记。
- docs/CONTENT_MAINTENANCE.md、docs/ARCHITECTURE.md：补充草稿关系来源保留、日志失败时的实际成功语义和生成输入失败保护边界；修正文档中“尚未初始化 Git”的过期描述。
- F2：scripts/research-samples.mjs 使用新增 scripts/research-batch.mjs 记录 running/success/failed 批次及各来源结果，任一失败返回非零退出码；scripts/research-batch.d.mts 提供测试导入的明确类型。scripts/prepare-samples.mjs 在任何下载、建目录或写候选前核验批次与八项所需输入，阻止旧研究文件被当成本批成功结果。tests/research-samples.test.ts 使用 TEMP 与 mock fetch 验证全失败、部分失败、成功、旧文件拒绝及真实 CLI 退出码，不请求外网。维护手册同步批次操作说明。
- F2 复核补充：前置检查也拒绝空 rows，避免上游空数据在整理中途才报错；6 项采集专项测试通过。所有采集故障测试均在 TEMP 与模拟网络下完成，正式研究数据未改写。
- F3：src/lib/search.ts 在批量名称标准化为空时返回无匹配，普通空搜索保持全目录；tests/search.test.ts 补纯符号回归。
- F5：src/composables/sampleLoader.ts 检查必要的非空展示字段、题型、选项、媒体记录及网格输入输出结构；损坏记录进入现有错误/重试流程，不在客户端引入完整内容 schema。tests/sample-loader.test.ts 保留错误 ID、取消/过期响应覆盖，新增畸形记录、空标题、媒体/网格容器及重试；tests/sample-viewer.test.ts 验证查看接口错误后恢复。修正测试断言跨异步重试引起的 TypeScript never 收窄，严格类型通过。TEMP 探针验证18个正式样例文件、27条记录全部可被新加载器接受。
- F6：src/composables/compare.ts 对连续操作合并尚未完成的目标选择，界面继续只读生效的URL；直接替换导航保留Router取消语义。tests/comparison.test.ts 覆盖同步移除、清空/添加组合与离开页面后的取消，不引入串行导航队列。
- 最终自动检查：全量39/39测试通过；收尾测试断言修正后相关12/12再通过；严格TypeScript、三个变更mjs语法检查、内容校验（84条目/27样例/17报告）通过。
- 生产构建：90个路由成功，postbuild核验89个明确静态页面与Pages404；保留主包652.69kB、gzip185.88kB体积告警。磁盘共有91个HTML，即90路由页加独立404.html副本，不把副本混入路由数。
- 全量新产物核验：84个详情、2,051个站内链接与hash目标、34条关系的证据URL及顺序全部通过；每页单H1，解析后DOM无嵌套链接。关系源码额外确认导航与证据链接为兄弟元素。
- 真实浏览器：MMLU-Pro关系来源准确，桌面与390px视口（375px实际内容宽）无整页横向溢出；批量输入 -;___;MMLU-Pro 前两项无候选而第三项准确识别；三项对比分享刷新后恢复，依次移除前两项仅保留GPQA Diamond，清空同步URL和底栏。临时阻止样例请求出现失败提示，解除后重试恢复两条样例及答案展开。
- 正常交互控制台无警告/错误；故障注入仅出现预期fetch失败日志。网络阻止已清除、视口已恢复、临时标签已关闭，生产预览已停止。未启动开发服务、未修改正式评测内容、未访问真实采集上游或部署。
- docs/CODE_FUNCTION_REVIEW.md 保留原审查快照并追加F1–F8修复验收；docs/ARCHITECTURE.md、docs/CONTENT_MAINTENANCE.md同步当前约定。全部8项已修复，测试数从24增至39。任意磁盘写入故障的事务回滚、真实上游和远端部署不属于本轮已验证范围。
- 最终收尾：4173/4174 均无监听；git diff --check 通过。新增采集批次模块、类型声明和测试已纳入 Git 可审查差异（intent-to-add），本轮全部优化仍为未提交修改；未配置远程、未推送。

## 2026-09-24 — GitHub 中英文 README 完善

- 原因：用户准备创建 GitHub 仓库，要求补齐 README 与 README_ZH；按真实实现整理公开项目入口，遵循最简、文档与实现一致原则。
- README.md：改为完整英文项目说明，包含产品定位、带日期的收录统计、实际功能、运行要求、快速开始、命令表、目录结构、内容维护、GitHub Pages/静态托管、贡献与来源权利说明。
- README_ZH.md：新增对应中文说明，顶部与英文版互相切换；明确网站界面目前为中文，原始任务保留来源语言，不把双语文档描述为已支持英文网站。
- 两份文档核对现有 package.json、Pages 工作流与维护手册；明确 publish 只改本地状态、build 不代替测试、正式构建不抓取上游数据、候选不部署。未编造仓库地址、在线演示、构建状态或源码许可证；未修改功能、内容数据或部署配置。
- 验证通过：实际源文件统计为84条published、8类、18项含27条样例、17份报告；两版各15个本地Markdown链接共30个目标均存在，命令和部署环境变量与实现一致。两份Markdown格式、严格TypeScript及git diff --check通过；文档变更未重跑业务测试或生产构建，未启动服务。
- Git：README_ZH.md 已纳入可审查差异，本轮仅修改README.md、README_ZH.md和本更新日志；保留原有工作区修改，未提交、未推送。

## 2026-09-24 — 绑定 GitHub 远程仓库

- 原因：用户指定 GitHub 仓库 WhitePlusMS/whats-a-benchmark，要求配置 origin。
- .git/config：新增 origin，fetch/push 地址均为 https://github.com/WhitePlusMS/whats-a-benchmark.git；配置前无远程仓库，当前分支为 main。
- 验证：git remote -v 确认地址正确。本次仅配置本地远程地址并记录说明，未提交、拉取或推送，未验证远程访问权限；现有工作区修改保持不变。

## 2026-09-24 — 首次推送并启用 GitHub Pages 自动部署

- 原因：用户明确要求将已完成的项目推送到 WhitePlusMS/whats-a-benchmark，并自动执行 Pages 部署。
- 提交范围：本轮已审查的架构与样式优化、F1–F8修复、39项回归测试、中英文README及维护/审查文档，保留初始基线历史。docs/CONTENT_MAINTENANCE.md 同步已绑定的实际远程仓库与main推送触发规则。
- 推送前验证：严格TypeScript、39/39自动测试和git diff --check通过。既有生产构建及浏览器验收记录见上文；GitHub Actions 将对推送提交重新安装依赖、测试、构建与部署。
- 部署结果以对应提交的GitHub Actions结论与实际站点访问为准，记录本段时尚未推送，不预先宣称上线成功。

- 发布完成：提交 dda3c34 已推送 origin/main，远端 HEAD 与本地一致，main 已建立跟踪关系。通过既有本地代理完成推送，未修改全局 Git/网络配置。
- GitHub Pages 已选择 GitHub Actions。首次构建与测试成功；空仓库初始化的 github-pages 环境规则仍指向不存在的 mater，已精确改为 main（仅允许该分支，未取消分支限制），重跑失败的部署任务后成功。
- 验证记录：工作流 https://github.com/WhitePlusMS/whats-a-benchmark/actions/runs/35975671314 的第2次尝试为 Success；站点 https://whiteplusms.github.io/whats-a-benchmark/ 已用真实浏览器打开，84项目录、MMMLU详情及动态真实样例正常加载。
- 后续 main 推送会自动执行测试、构建、部署。工作流仍有上游 Actions Node 20 运行时迁移警告，但本次已在平台提供的运行时成功执行；不将告警写成部署失败。本次未启动本地服务。

