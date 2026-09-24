# IFEval

核验日期：2026-09-23

## 官方身份

IFEval（Instruction-Following Eval）由 Google 研究团队作者提出，用于评估大语言模型遵循可客观验证指令的能力。Google Research 仓库说明此代码库并非 Google 官方支持产品；这不改变论文作者与一手资料的归属。[IFEval 论文](https://arxiv.org/html/2311.07911)；[Google Research 官方仓库 README](https://github.com/google-research/google-research/tree/master/instruction_following_eval)

## 官方定义与忠实中文概述

IFEval 将“按要求输出指定词频”“遵循长度/格式限制”等可由确定性程序检查的要求组合进自然语言提示，并用规则验证回答。它不是主观偏好或通用回答质量评分；原论文列出 25 类可验证指令和 541 个 prompts。[论文摘要与指令列表](https://arxiv.org/html/2311.07911#S2)

## 任务输入/输出/环境

- 输入：prompt 集及待评回答。Google README 的回答 JSONL 示例每行含 `prompt`、`response`，评测入口另接收 prompt 列表和 response 数据。[Google Research README](https://github.com/google-research/google-research/tree/master/instruction_following_eval)
- 输出：官方脚本对每个回答计算 strict 与 loose 两种符合性，并输出 prompt 级和 instruction 级分数。[官方 evaluation_main.py](https://github.com/google-research/google-research/blob/master/instruction_following_eval/evaluation_main.py)；[论文指标定义](https://arxiv.org/html/2311.07911#S2.SS2)
- 环境：Python 评测代码离线检查响应；任务不要求模型执行程序或依赖在线裁判。[官方 README](https://github.com/google-research/google-research/tree/master/instruction_following_eval)

## 数据规模/split/字段/文件

- 原始论文公布 541 个 prompts，每条含一个或多个 verifiable instructions，共 25 类；论文称其为评测 prompts，没有官方 train/dev/test 切分。[论文数据规模](https://arxiv.org/html/2311.07911#S2)
- 仓库 `data/` 提供输入数据及示例模型响应；评测程序将结果分别写入 `eval_results_strict.jsonl` 与 `eval_results_loose.jsonl`。[Google Research 仓库](https://github.com/google-research/google-research/tree/master/instruction_following_eval)；[官方计分脚本](https://github.com/google-research/google-research/blob/master/instruction_following_eval/evaluation_main.py)
- 复现时固定仓库 commit、输入文件、生成时的 system/user prompt、解码配置和 grader 版本；不要以第三方重打包数据集的字段或“train split”标签替代官方描述。

## 访问状态

Google Research 仓库公开代码和数据，并给出直接的本地评测方式。仓库明确标记为“not an officially supported Google product”。[官方 README](https://github.com/google-research/google-research/tree/master/instruction_following_eval)

## 数据/代码/媒体许可与使用边界

Google Research 总仓有 Apache-2.0 许可，IFEval 子目录包含代码和数据，但该子目录没有单独的数据许可说明。仓库 license 文件适用于仓库内受其覆盖的工作；不得据此推断 prompts 引用或涉及的外部文本材料拥有超出原作者/来源条款的权利。页面镜像如需复用完整 prompts，应保留适用许可和署名，并核查相关 prompt 所涉外部文本；保守做法是概述指令类型并链接原仓库。[Google Research 仓库说明](https://github.com/google-research/google-research/tree/master/instruction_following_eval)；[总仓 Apache-2.0 许可](https://github.com/google-research/google-research/blob/master/LICENSE)

## 官方样例与是否可在公开 GitHub Pages 转载

论文列有 prompt 与 response 示例，官方仓库也公开数据文件。[论文示例](https://arxiv.org/html/2311.07911#S2.SS1) **公开页面宜自写简短的抽象例子或链接官方样例，不要批量转载 541 条 prompt 和作者响应。**论文页面标注 CC BY 4.0；这只按论文页面的 CC BY 条款处理论文文字/图表，不能替代仓库数据及外部来源文本的许可判断。[arXiv 论文](https://arxiv.org/html/2311.07911)

## 指标

- **prompt-level strict**：一个 prompt 中所有指令都通过的 prompt 比例；**instruction-level strict**：逐条指令通过的比例。[论文指标定义](https://arxiv.org/html/2311.07911#S2.SS2)
- **loose**：在 strict 规则外，对回答尝试去除 markdown 粗体/斜体标记、首行或末行（及其组合）后再检查，用于减少特定格式导致的假阴性。作者提醒 loose 可能引入假阳性，因此应与 strict 并列报告而非取代它。[论文 loose 定义和限制](https://arxiv.org/html/2311.07911#S2.SS2)
- 共四项：prompt-level strict、instruction-level strict、prompt-level loose、instruction-level loose。对比成绩时需说明选用哪项，尤其不能把“loose”单值写成未注明口径的 IFEval accuracy。[论文结果表与指标](https://arxiv.org/html/2311.07911#S3)

## 版本关系

论文 arXiv 原始版于 2023 年发布，报告 541 个 prompts。Google Research 仓库没有官方语义版本或多版 split 说明；复现实验应锁定数据文件与代码 commit。后续翻译版、扩展版、修订 scorer 均需单独标注，不可默认与原版 541 prompts 同一口径。[论文](https://arxiv.org/html/2311.07911)；[官方仓库](https://github.com/google-research/google-research/tree/master/instruction_following_eval)

## 官方来源按角色分组

- **基准动机、构造、541 题和指标：**[Google 作者论文](https://arxiv.org/html/2311.07911)。
- **官方代码、数据和使用说明：**[google-research/instruction_following_eval](https://github.com/google-research/google-research/tree/master/instruction_following_eval)。
- **strict/loose 及四种聚合分数的计算：**[evaluation_main.py](https://github.com/google-research/google-research/blob/master/instruction_following_eval/evaluation_main.py)；[evaluation_lib.py](https://github.com/google-research/google-research/blob/master/instruction_following_eval/evaluation_lib.py)。

## 模型发布引用

论文报告 GPT-4 和 PaLM 2 Small 的结果，但采集响应的日期不同；应作为论文设定下的基线。厂商或第三方结果需写明四项指标中的具体指标、strict/loose、模型版本、提示封装和采样策略。[原论文结果说明](https://arxiv.org/html/2311.07911#S3)

## 未核实项

- 仓库 README 指向整体 code and data，但当前未发现独立的数据授权声明；Apache-2.0 对每项 prompt 及其潜在外部来源的具体适用边界未逐条拆分。
- 上游主分支可能变动。需在正式对比或公开镜像时保存代码和数据的 commit/hash。
- loose scorer 变换会扩大通过机会；官方明确将其视为补充并指出有假阳性风险。

## 研究结论

**PASS_WITH_LIMITATIONS**：Google 作者论文和官方仓库支持 IFEval 的 541 个 prompts、25 类指令、数据结构和四种确定性指标。代码受 Apache-2.0 覆盖；对子目录数据未找到单独 license 文件，且 loose 指标存在已说明的假阳性风险。本站可自述方法并链接一手资料，完整数据转载前应再核实提示文本的授权范围。
