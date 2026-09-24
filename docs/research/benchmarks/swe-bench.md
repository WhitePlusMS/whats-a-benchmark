# SWE-bench

核验日期：2026-09-23。

## 官方身份

SWE-bench 是 Princeton NLP 与 SWE-bench 项目团队发布的软件工程基准，论文发表于 ICLR 2024。它从真实 GitHub issues 及相关 pull requests 构造代码修复任务。此条只描述原始 SWE-bench，不包括 SWE-bench Lite、SWE-bench Verified、Multimodal、Multilingual 或 Scale AI 的 SWE-bench Pro。[官方仓库](https://github.com/SWE-bench/SWE-bench)；[原始论文](https://arxiv.org/abs/2310.06770)

## 官方定义与忠实中文概述

原始 SWE-bench 评估语言模型能否理解开源软件仓库与 issue 描述，编辑代码并生成解决该问题的补丁。论文定义的原始数据集包含 2,294 个问题，来自 12 个常用 Python 仓库；任务解决往往需跨函数或文件理解与修改。[论文摘要](https://arxiv.org/abs/2310.06770)

## 任务输入/输出/环境

- 输入：原始 GitHub issue 文本、修复前代码库和固定 commit；模型/agent 看不到判分测试。
- 输出：可应用于代码库的 patch。测试分为 `FAIL_TO_PASS`（原始状态失败、参考修复后通过）与 `PASS_TO_PASS`（参考修改前后均通过，用来检查回归）；两组都通过才判为已解决。[OpenAI 对原始协议的说明](https://openai.com/index/introducing-swe-bench-verified/)
- 官方 evaluation harness 使用隔离的 Docker 环境准备实例、应用模型补丁、执行测试和生成结果；harness 是参考评测器，不等同于模型解题用的 agent harness。SWE-agent、Agentless、OpenHands 等 scaffold 会影响模型与仓库交互方式，应与 benchmark 数据版本、Docker evaluator 分别记录。[官方 harness 文档](https://github.com/SWE-bench/SWE-bench/blob/main/docs/reference/harness.md)；[官方 quickstart](https://github.com/SWE-bench/SWE-bench/blob/main/docs/guides/quickstart.md)

## 数据规模/split/字段/文件

- 原始论文规模为 2,294 项，12 个 Python 仓库。该数字是论文对原始 benchmark 的定义，不自动代表任何后来发布、过滤或改版数据文件的行数。[原始论文](https://arxiv.org/abs/2310.06770)
- 官方 Hugging Face `princeton-nlp/SWE-bench` 当前展示 `dev` 225 条；官方 repo README 通过 `test` split 读取原始数据。具体发布文件和版本应固定数据 revision 后再记录，不能用 Viewer 默认可见的 `dev` 行数替代论文中的原始 test-set 规模。[官方 HF 数据页](https://huggingface.co/datasets/princeton-nlp/SWE-bench)；[官方仓库](https://github.com/SWE-bench/SWE-bench)
- HF 字段包含 `repo`、`instance_id`、`base_commit`、`patch`、`test_patch`、`problem_statement`、`hints_text`、`created_at`、`version`、`FAIL_TO_PASS`、`PASS_TO_PASS` 与 `environment_setup_commit`。其中 `patch` 是参考解法，`test_patch` 含测试变更，二者用于构造/判分，不属于 agent 的任务输入。[官方数据页](https://huggingface.co/datasets/princeton-nlp/SWE-bench)

## 访问状态

官方 SWE-bench GitHub 仓库、Hugging Face 数据页和 Docker-based evaluation harness 均公开访问；官方 quickstart 明确提供 full、Lite、Verified 等数据读取方法。仓库 2026 年 README 另描述以 task repo 构建镜像的当前 v5 CLI，历史脚本/数据发布与当前 CLI 不应在复现记录中混为同一运行环境。数据公开下载不等于所有第三方原始内容有统一复制许可。[官方仓库](https://github.com/SWE-bench/SWE-bench)；[quickstart](https://github.com/SWE-bench/SWE-bench/blob/main/docs/guides/quickstart.md)

## 数据/代码/媒体许可与使用边界

- 官方 SWE-bench 软件仓库采用 MIT 许可证；该许可证适用于许可证覆盖的仓库代码，不自动改变各个 GitHub 上游项目代码仓库自身许可。[官方 LICENSE](https://github.com/SWE-bench/SWE-bench/blob/main/LICENSE)
- 基准样本同时包含第三方 issue 描述、上游修复 PR 中的参考 patch、测试 patch、测试代码与版本化代码库。当前官方原始 SWE-bench HF 页面未看到统一覆盖这些数据字段的许可证声明。各类资产应分别遵循对应仓库、GitHub issue/PR 内容及数据来源条款；不能以 SWE-bench evaluator 的 MIT 许可推断题面、金补丁、测试或仓库快照可以集中再发布。
- 本站不复制任何真实 issue、参考 patch、测试内容、轨迹或仓库文件，只保留自行撰写的定义与官方来源链接。

## 官方样例与是否可在公开 GitHub Pages 转载

官方论文、README 和 HF Viewer 可查看真实任务及部分参考/测试字段；这不构成本站转载授权。由于题面和解法材料由不同 GitHub 项目贡献，且原数据页未标注统一内容许可，本站不复制单条任务或代码片段。可以链接[官方 Viewer](https://huggingface.co/datasets/princeton-nlp/SWE-bench)和[原始论文](https://arxiv.org/abs/2310.06770)，并用不含上游原文的自写抽象例子解释“issue → patch → 测试”。

## 指标

核心指标为在明确 split 中同时通过 FAIL_TO_PASS 与 PASS_TO_PASS 测试的任务比例（resolved rate）。分数受 agent scaffold、模型输入上下文、工具权限、生成预算、patch 提交规则、容器镜像、测试超时及 evaluator 版本影响；比较时必须标注这些实验配置。论文早期结果只对应论文中的模型、运行参数和历史数据/harness，不可作为当前榜单成绩。[原始论文](https://arxiv.org/abs/2310.06770)；[官方 harness 文档](https://github.com/SWE-bench/SWE-bench/blob/main/docs/reference/harness.md)

## 版本关系

原始 SWE-bench 是 2,294 项、12 个 Python 仓库的基准定义。SWE-bench Lite 是为降低运行成本而抽取的子集；SWE-bench Verified 则是与 OpenAI 合作后对原 test set 中样本做人工质量筛查形成的 500 项子集，筛选目的和 Lite 不同。SWE-bench Multimodal/Multilingual 为另行定义的数据集变体；SWE-bench Pro 由 Scale AI 独立发布，自己的 V1/V2 版本不可因名称相似而并入 SWE-bench。[官方版本公告](https://github.com/SWE-bench/SWE-bench)；[Verified 构造说明](https://openai.com/index/introducing-swe-bench-verified/)；[SWE-bench Pro 官方仓库](https://github.com/scaleapi/SWE-bench_Pro-os)

## 官方来源按角色分组

- **基准定义与初始规模：**[SWE-bench ICLR 2024 论文](https://arxiv.org/abs/2310.06770)。
- **项目范围、数据读取入口与版本公告：**[SWE-bench 官方仓库](https://github.com/SWE-bench/SWE-bench)。
- **当前可见字段与 split Viewer：**[原始 SWE-bench Hugging Face 数据页](https://huggingface.co/datasets/princeton-nlp/SWE-bench)。
- **Docker patch evaluation 参考实现：**[官方 harness 文档](https://github.com/SWE-bench/SWE-bench/blob/main/docs/reference/harness.md)。
- **代码许可：**[官方 LICENSE](https://github.com/SWE-bench/SWE-bench/blob/main/LICENSE)。

## 模型发布引用

厂商只标“SWE-bench”时，不应推定为 SWE-bench Verified。引用须注明具体 dataset id/revision/split、原始或 Lite/Verified 等变体、模型和 agent scaffold、工具与采样预算、Docker evaluator/harness commit 及分母。Pro、Multimodal、Multilingual 成绩不能挂到原始 SWE-bench 名下；没有版本信息的厂商结果应标为未明确变体。

## 未核实项

- 官方原始数据卡没有对 issue 文本、PR patch、test patch 和仓库快照给出统一许可；12 个上游项目、具体 issue/PR 和不同字段的权利未逐项检查。
- 本次未下载并逐项审查原始数据所有 splits，也未重跑 2,294 项评测；论文原始规模与当前 HF Viewer 的 `dev` 展示行数属于不同口径。
- SWE-bench repo 与 CLI 持续演进，旧论文结果所用 harness 和当前 v5 CLI 任务目录模式之间的逐版本迁移/复现兼容性未在本记录核查。

## 研究结论

**PASS_WITH_LIMITATIONS** — 第一方论文、官方仓库、数据页与 evaluator 文档支持原始 SWE-bench 的定义、论文规模、字段结构及判分流程。官方 evaluator 代码许可不覆盖各上游 issue、patch、test 与代码快照的统一转载权；本站只保留原创说明和官方链接。
