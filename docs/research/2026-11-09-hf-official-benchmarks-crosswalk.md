# Hugging Face 已注册 benchmark 与本站来源对照

核查日期：2026-11-09。通过 [HF 官方文档](https://huggingface.co/docs/hub/en/leaderboard-data-guide)列出的 `GET /api/datasets?filter=benchmark:official` 只读查询，当次请求返回一页共 **58 个不同数据集 ID**、未出现下一页链接；这是平台当时的筛选快照，不是全球全部 benchmark，也不是各个数据集都由原 benchmark 作者运营或都经过独立评测。平台数据可随时变化。

对本地 `content/benchmarks` 的已发布 JSON 全字段递归提取 `https://huggingface.co/datasets/{owner}/{repo}`，将仓库 ID 忽略大小写后与这 58 项精确比较，得到 **11 个 HF ID 对应 14 个本地条目**。这是“文件中直接引用了同一数据集仓库”的统计，不代表身份、数据修订和分数协议均已验证；不同本地版本引用同一数据集会重复计数。未直接命中可能只是换了发布组织、使用 GitHub、论文链接或本地数据卡，不能解读为没有收录。

## 直接数据集 ID 命中

| HF 数据集 ID | 本地条目 ID |
| --- | --- |
| [cais/hle](https://huggingface.co/datasets/cais/hle) | hle |
| [Idavidrein/gpqa](https://huggingface.co/datasets/Idavidrein/gpqa) | gpqa、gpqa-diamond |
| [likaixin/ScreenSpot-Pro](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro) | screenspot-pro |
| [mercor/apex-agents](https://huggingface.co/datasets/mercor/apex-agents) | apex-agents、apex-agents-1-1 |
| [MME-Benchmarks/Video-MME-v2](https://huggingface.co/datasets/MME-Benchmarks/Video-MME-v2) | video-mme-v2 |
| [MMMU/MMMU_Pro](https://huggingface.co/datasets/MMMU/MMMU_Pro) | mmmu-pro |
| [openai/gsm8k](https://huggingface.co/datasets/openai/gsm8k) | gsm8k |
| [ScaleAI/SWE-bench_Pro](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro) | swe-bench-pro、swe-bench-pro-v2-hard |
| [SWE-bench/SWE-bench_Multilingual](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multilingual) | swe-bench-multilingual |
| [SWE-bench/SWE-bench_Multimodal](https://huggingface.co/datasets/SWE-bench/SWE-bench_Multimodal) | swe-bench-multimodal |
| [TIGER-Lab/MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro) | mmlu-pro |

这些行的版本关系仍须逐条核查：比如一个数据集 ID 可能有多个子集，而本地分别为 GPQA 和 Diamond 建条目；不能把一条仓库命中当作两份独立数据集。HF 的 [GPQA 数据页](https://huggingface.co/datasets/Idavidrein/gpqa)同页已有成绩榜单及数据说明，因此这一类资料与本站有直接重叠。

## 未直接匹配的 47 个 ID（仅表示引用路径未命中）

`actava/chi-bench`、`agents-last-exam/agents-last-exam`、`allenai/olmOCR-bench`、`ARTPARK-IISc/Vaani-Benchmark-V1.0`、`benchflow/skillsbench`、`ChrisHayduk/nanofold-public`、`claw-eval/Claw-Eval`、`collinear-ai/cwe-bench`、`collinear-ai/yc-bench`、`crosbylegal/RedlineBench`、`datacurve/deep-swe`、`Delores-Lin/MDPBench`、`facebook/mmi`、`FutureMa/EvasionBench`、`google/physical-engineerings-last-exam`、`harborframework/terminal-bench`、`harborframework/terminal-bench-2.0`、`harborframework/terminal-bench-2.1`、`harborframework/terminal-bench-science`、`harness-hub/safeagents-judge-bench`、`hf-audio/open-asr-leaderboard`、`hkust-nlp/Toolathlon`、`hongzhuyi/VDEBench`、`IntelligenceLab/Long-Horizon-Terminal-Bench`、`internlm/WildClawBench`、`InternScience/ResearchClawBench`、`joelniklaus/LEXam-hard`、`LEXam-Benchmark/LEXam`、`LiquidAI/ifstruct-v1.0`、`llamaindex/ExtractBench`、`llamaindex/ParseBench`、`LocalLLaMA/typed-decisions`、`MathArena/aime_2026`、`MathArena/hmmt_feb_2026`、`meituan-longcat/WBench`、`Menlo/asimov-locomotion-bench`、`mercor/ACE`、`mercor/APEX-v1-extended`、`mteb/arguana`、`mteb/BRIGHT`、`multimodalart/decision-index-leaderboard`、`multimodalart/decision-index-vision-leaderboard`、`PaddlePaddle/Real5-OmniDocBench`、`SWE-bench/SWE-bench_Verified`、`tiiuae/PBench`、`VCLab-PolyU/OmniCompass`、`VLABench/vlabench_primitive_ft_lerobot_video`。

例如，本站 [SWE-bench Verified](../../content/benchmarks/swe-bench-verified.json)引用 `princeton-nlp/SWE-bench_Verified`，名称与 HF 筛选里的 `SWE-bench/SWE-bench_Verified` 对应，但这次没有逐条比较两仓库的数据版本及内容，故未计入精确 ID 命中。本站 [Terminal-Bench 2.1](../../content/benchmarks/terminal-bench-2-1.json)引用 Harbor 的 GitHub 和任务资料，而未引用筛选出的同名 HF 仓库。类似名称与资料属于待查关联，不计入精确匹配。

## 具身个案：VLABench 的训练轨迹和成绩在同一页

本地 [VLABench](../../content/benchmarks/vlabench.json) 已引用官方预训练轨迹与单独的 VLM 评测样例；筛选结果中的 [VLABench 训练集页面](https://huggingface.co/datasets/VLABench/vlabench_primitive_ft_lerobot_video)是另一仓库，数据卡称包含 10 类基础操作的 5,000 条训练演示，且页面同时显示 `nvidia/GR00T-N1-2B` 的 39.7 结果。[对应 PR](https://huggingface.co/nvidia/GR00T-N1-2B/discussions/7/files)将该结果关联此数据集的 `overall`，来源链接指向 AllenAI 的 VLA 榜单；只读榜单 API 当次返回一条该记录，`verified: false`、`pullRequest: 7`。AllenAI 页面通过动态脚本加载，本次未直接看到同一行或核对 39.7 的具体测试设置、指标及其对应的底层模型版本；不能将这项数值当作该训练集单条示范成功率、全套 100 类任务的成绩或本次独立复测。

该数据卡描述 10 类基础任务，而其 `meta/info.json` 示例列 `total_tasks: 128`；这两个字段的统计单位尚未从原始任务表核实，不能相互替换或认定矛盾。另在[固定修订的 `eval.yaml`](https://huggingface.co/datasets/VLABench/vlabench_primitive_ft_lerobot_video/blob/9846a2f6bead3873251dc4fe3079359d57326b7c/eval.yaml)页面读取时，HF 提示 `evaluation_framework: none` 不符合当时可接受的枚举；同一时点数据卡和 API 仍展示上面的结果。该元数据提示不证明训练数据错误或全部榜单不可用，状态之后也可能变化。

## 已有跨榜入口与产品判断

[HF 官方文档](https://huggingface.co/docs/hub/en/leaderboard-data-guide)提供数据集榜单 API 和跨 benchmark 数据访问方法；[社区榜单地图](https://huggingface.co/spaces/quantid/huggingface-official-benchmark-leaderboards)与 [OpenEvals 汇总站](https://huggingface.co/spaces/OpenEvals/every-leaderboards)也是现有入口，本次只核实空间页面和代码说明，未完整体验交互或验证全部数据。能把评测、模型和成绩关联已有多个实现；本站是否能在中文解释、训练/测试区分和来源归属上更好，仍需具体读者测试。

### HLE：同一模型的两种条件

2026-11-10 对 [HLE 榜单 API](https://huggingface.co/api/datasets/cais/hle/leaderboard)进行一次未认证只读请求，返回 103 条记录，均带 `verified: false`；响应未给出下一页链接，这是当次响应快照，而不是对全部历史提交或独立评测的普查。HF 文档将该字段解释为是否经过独立验证；`false` 仅表明接口没有标为已验证，不能证明该数字从未被其他机构评测。

其中同一 `moonshotai/Kimi-K3.1-Pro` 出现两行：**70.0** 的备注是使用工具，**51.1** 的备注是不使用工具，均注明 HLE 全集并指向同一[模型卡](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)。模型卡也将两数分别列在 HLE-Full w/ tools 与 HLE-Full 行；这是模型发布方报告及 HF 的来源标记，不是本站实测。相同模型和数据集名称不意味着两条记录属于同一条件；本次未验证全部提示、工具配置、模型版本和采样条件，也不能仅凭分差证明工具是唯一变化因素。

这一例子说明接口能节省发现和结构化读取的工作，但仍需区分每条成绩的来源、测试设置、是否标记验证与更新时间。HF 文档支持按数据集或模型读取及嵌入部分官方榜单；接口可访问不代表可以忽略各数据、成绩来源及平台条款。本次没有调用 AA 的付费接口或发布任何数据；AA 自身 API 页对免费层和再分发有不同条件，见[产品对照](2026-11-09-artificial-analysis-product-comparison.md)。
