# LLM Benchmark Costco：中文评测百科的直接竞品对照

核查日期：2026-11-09。对照当前本地工作树、外部仓库固定提交及公开帖子；没有对外站全部内容验真、执行真实读者对照或确认本站线上已同步。

## 为什么它与本站直接竞争

[作者 V2EX 介绍](https://www.v2ex.com/t/1240170)称，选 Agent benchmark 时需要在论文、仓库、数据集间查任务、工具及判分，因此建设 [LLM Benchmark Costco](https://joe1chief.github.io/llm-benchmark-costco/)；其[公开仓库](https://github.com/joe1chief/llm-benchmark-costco)提供中英说明、论文入口、分类、版本关系及构建/评测流程图。网站首页及交互本次未完整验收，以上结合作者介绍、仓库内容和可检索页面，不将所有页面或流程图准确性当成已验证事实。

它与本站当前“解释 benchmark、任务、数据、来源”的定位高度相近，不只是与未来可能增加的模型成绩竞争。作者提出的跨来源阅读困难是自述和项目动机；帖子当次未见评论，不能当作独立用户访谈或需求规模证明。

## 有限名称对照，可重复核查

2026-11-09 使用 `git ls-remote` 取得对方 main 提交 `d38571bbcfa893dd5b57dd33d8e55f8ce2093177`；读取其[固定版 benchmarks.json](https://github.com/joe1chief/llm-benchmark-costco/blob/d38571bbcfa893dd5b57dd33d8e55f8ce2093177/client/public/benchmarks.json)，7,791,835 字节，SHA-256 `695be12b3ce241a27461a669a20403c7bc3859875bf8bb6124b4b6e14f783c90`，共 610 条。本站当前 `content/benchmarks` 中 `status=published` 为 318 条，包含不同版本及当前未跟踪文件。

比较双方 `name`：先 Unicode NFKC、casefold，将 `+` 换成 `plus`、`*` 换成 `star`，只保留字母数字；得到 **81 个本地名称候选匹配，涉及 81 个对方规范化名称**。这不是经来源逐项确认的同一评测数量，也不是总体覆盖率：未处理缩写、别名、家族与版本关系；两个数据源的统计单位可能不同。对方 README 自述数量及分类是快照，不能用 610 与 318 比较内容质量。

对本站 50 个带 `embodied` 字段的发布条目采用同一规则，没有匹配到对方名称。对方可能以别名、相关基准、未标具身条目或后续版本覆盖；没有匹配不能推论对方完全不涉足机器人，也不保证本站覆盖全面。类似 `HumanEval` 与 `HumanEval+`、`V*Bench` 与 `VBench` 若粗暴删除符号会误配，本次保留其区别；不同评测即使候选同名也需逐条核实。

81 个名称候选（本站显示名，未经逐条验明身份）：

AA-Omniscience、ARC-AGI-2、AgentHarm、Aider Polyglot、AlignBench、ArXivMath、AutomationBench、BenchCAD、BioMysteryBench、BrowseComp、BrowseComp-ZH、C-Eval、CMMLU、CharXiv、ChartQAPro、Chatbot Arena、CritPt、CyScenarioBench、Cybench、DeepSearchQA、ExploitBench、FrontierMath、FrontierScience、GAIA、GDPval、GPQA、GPQA Diamond、GSM8K、GraphWalks、HealthBench、HealthBench Hard、HealthBench Professional、HumanEval、IFBench、IFEval、LABBench2、LVBench、LinuxArena、LiveBench、LiveCodeBench、LiveCodeBench Pro、LongBench、LongBench v2、MATH-500、MATH-Vision、MBPP、MCP-Atlas、MILU、MMLU、MMLU-Pro、MMLU-ProX、MMLongBench-Doc、MMMLU、MMMU、MMMU-Pro、MathVista、Multi-IF、NL2Repo-Bench、OCRBench v2、OSWorld、OfficeQA Pro、OmniDocBench、PaperBench、ProgramBench、RULER、Riemann-bench、SHADE-Arena、SPEED-Bench、SWE-bench、SWE-bench Pro、SWE-bench Verified、SciCode、SimpleQA、SimpleQA Verified、SkillsBench、SpatialBench Verified、StrongREJECT、Terminal-Bench 2.0、ToolSandbox、Video-MME、WebArena Verified。

## 同题：AutomationBench

本站 [AutomationBench](../../content/benchmarks/automationbench.json) 提供任务背景、输入输出、公开/私有集合、指标与五条 simple 样例，注明 simple 不计正式分；这些是模拟任务和其规则，不是模型真实运行成绩。

对方的[固定版中文流程数据](https://raw.githubusercontent.com/joe1chief/llm-benchmark-costco/d38571bbcfa893dd5b57dd33d8e55f8ce2093177/client/public/drawio/AutomationBench/AutomationBench.zh.arch.json)包含构建与运行阶段、600 个公开计分任务、200 个 simple 基线、工具调用与断言、部分分及严格通过分。它对流程的拆解比只列数字更具体；本次读取的是数据文件，未在浏览器逐步验证交互，也未逐节点审计准确性。

一个本站已保存的具体样例是 `simple.sf_create_followup_task:3021`：[Zapier 固定版源码](https://raw.githubusercontent.com/zapier/AutomationBench/4a8e1061254004d9dac807054eed33fad7d1ff14/automationbench/domains/simple/tasks.py)显示用户指令要求截止日期，而该样例断言只检查主题包含指定文字及联系人 ID；本站保留了这项差异。这是单个不计分的 simple 例子，不能据此推断正式分数必然有误、所有断言存在缺陷或对方网站全部页面没有类似说明。

由此可提出待验证假设：对研究“计分流程”的读者，流程图可能有帮助；对研究“某个任务实际上检查什么”的读者，带原始任务和断言的样例可能有帮助。两者是否比直接查原仓库更快、是否有人反复使用，需要真实读者对照，不构成已证明的竞争优势。

## 产品判断

这项竞品进一步削弱“只要中文解释、评测背景或流程说明就有差异”的假设。是否继续值得做，取决于目标读者和其真实任务：保留现有资料有学习与个人知识库价值；若要吸引重复访问或商业化，须与 AA、Costco、Eval Handbook、官方资料等比较实际查找效率、准确性和持续更新成本。不能仅以具身名称未匹配或单个样例更细就断言找到护城河。
