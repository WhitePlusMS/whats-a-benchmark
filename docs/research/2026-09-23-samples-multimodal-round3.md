# 多模态样例核验：第三轮

核验日期：2026-09-23  
范围：OmniDocBench、CharXiv、MathVista、MMMU、MMMU-Pro、ScreenSpot-Pro。  
结论：本轮找到多个真实官方记录，但**没有样例能够同时证明单条媒体允许在 BenchAtlas 的公开 GitHub Pages 本地再发布**。因此本轮 `releaseCandidates` 为 0；官方记录和来源留在 [候选档案](../../artifacts/candidates/samples-multimodal-round3.json)，状态均为 link-only/held。没有下载或复制任何媒体。

## 样例与许可判断

| Benchmark | 已核验的真实记录 | 媒体位置/来源 | 权利结论 |
| --- | --- | --- | --- |
| OmniDocBench | 官方 README 指定 `demo_data/omnidocbench_demo` 作为评测示例目录；本轮没有从官方页面完整核实单条记录 ID、题面和答案 | [官方 demo 目录](https://github.com/opendatalab/OmniDocBench/tree/main/demo_data/omnidocbench_demo) | README 说明 PDF 来自公开渠道与社区贡献，并规定数据仅供研究、不得商业使用。仓库 Apache-2.0 是代码许可证据，不能证明每个 PDF 页面的第三方复制权。保留官方链接，暂不镜像。 |
| CharXiv | `figure_id=0`，`val`；元数据含图表说明、论文 ID `2004.10956`、论文题名 *Few-Shot Class-Incremental Learning* | 元数据记载 `images/0.jpg`，来源图路径 `arXiv_src_2004_038/2004/2004.10956/figures/overall3.jpg`；见[官方逐图元数据](https://github.com/princeton-nlp/CharXiv/blob/main/data/image_metadata_val.json)和[源论文](https://arxiv.org/abs/2004.10956) | CharXiv README 明确：CC BY-SA 4.0 适用于原始贡献“图表除外”，图表版权属于原作者。该论文图的单独再发布授权未核实。只链接数据集和论文。 |
| MathVista | `id=39`，`testmini`；题面 `Is this function odd or even?`；选项 `odd / even`；答案 `odd`；metadata 标记 `FunctionQA` 和 `function plot` | 原始记录路径 `images/39.jpg`；[官方 viewer](https://huggingface.co/datasets/AI4Math/MathVista) | 官方卡称新贡献为 CC BY-SA 4.0，同时明确图像和问题版权属于原作者。本条图像的单独权利人/授权未核实。Viewer 图片链接由 Hugging Face 生成短期签名 URL，本轮不能确认稳定直链；不托管或热链。 |
| MMMU | `dev_Accounting_1`；原题要求根据 Company B 的表格补齐缺失金额；四选项 `$63,020`、`$58,410`、`$71,320`、`$77,490`；答案 `D` | 官方数据卡 viewer 的 `image_1`；[官方数据集卡](https://huggingface.co/datasets/MMMU/MMMU) | 官方卡标注 Apache-2.0，但免责声明要求遵循图像初始来源版权与许可，并避开禁止复制、再发布的网站。该教材/课程表格的原始来源和单张许可未核实。仅保留官方 viewer 链接。 |
| MMMU-Pro | `test_Art_113`，`test / standard (10 options)`；题面 `<image 1> of Louis Black, believed to be a formerly enslaved man, was painted by which artist?`；官方 viewer 可见答案 `A`，但选项数组被截断 | 官方数据卡 viewer 的 `image_1`；[官方数据集卡](https://huggingface.co/datasets/MMMU/MMMU_Pro) | 官方卡标注 Apache-2.0，且对初始来源版权有同类免责声明。记录含绘画作品，单幅作品授权没有核实。候选文件只记录能看到的题面和答案，不补写 viewer 中被截断的选项；不复制图像。 |
| ScreenSpot-Pro | 本轮确认官方 HF 卡包含真实截图数据，但没能从轻量官方页面核实一条完整 record id、指令和永久媒体直链 | [官方数据集卡](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)；[官方代码仓库](https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding) | HF 卡 metadata 标注 MIT，论文说明是专业软件的真实高分辨率截图；逐张截图涉及的应用界面/屏幕内容权利没有核实。论文/代码许可不能自动替代每张商业 UI 截图的授权。仅链接官方资源。 |

## 核验依据

- **OmniDocBench**：[官方 README](https://github.com/opendatalab/OmniDocBench)同时给出 demo 数据路径、Apache-2.0 仓库标记，以及独立的 PDF Copyright Statement：数据来自公开渠道和社区投稿，限研究使用、不得商业使用。PDF 来源未逐页列出授权。
- **CharXiv**：[官方 README](https://github.com/princeton-nlp/CharXiv)明确划分代码、数据贡献与图表权利：非图表的原始贡献为 CC BY-SA 4.0，图表版权属于原作者。官方[验证集元数据](https://github.com/princeton-nlp/CharXiv/blob/main/data/image_metadata_val.json)把 `figure_id=0` 指向 arXiv:2004.10956 的具体图路径和说明；本轮没有把作者上传到 arXiv 当作允许第三方再发布该图的证明。
- **MathVista**：[官方项目 README](https://github.com/lupantech/MathVista)与[官方 Hugging Face 卡](https://huggingface.co/datasets/AI4Math/MathVista)都说明：新建数据/标注等贡献采用 CC BY-SA 4.0；图像和问题版权属于原作者，并应查看每项 `metadata` / `source.json`。官方 viewer 的 `id=39` 行含图片路径、题面、选项、答案、子集与 FunctionQA 来源。单条图片许可仍不足。
- **MMMU / MMMU-Pro**：[官方 MMMU 卡](https://huggingface.co/datasets/MMMU/MMMU)与[官方 MMMU-Pro 卡](https://huggingface.co/datasets/MMMU/MMMU_Pro)分别显示 Apache-2.0；两卡免责声明明确要求遵守来源网站的版权/许可，避免禁止复制和再发布的材料。官方 viewer 可读到真实问题、答案和图片列，但没有将图像链接到具体权利人或逐项许可。Hugging Face 返回的图片地址为短期签名 URL，不能作为可靠的公开站点媒体地址。
- **ScreenSpot-Pro**：[官方数据集卡](https://huggingface.co/datasets/likaixin/ScreenSpot-Pro)标注 MIT；[论文](https://arxiv.org/abs/2504.07981)将截图描述为专业应用的真实屏幕图像。官方代码仓库有 MIT LICENSE，但不包含数据本体。就当前证据，仍无法核实第三方软件 UI 截图的逐项公开展示权。

## 处理边界

`artifacts/candidates/samples-multimodal-round3.json` 保存了上述官方记录字段、稳定官方页面、数据划分、许可边界和每项媒体授权状态。对于只能在 viewer 内显示、但媒体链接为临时签名 URL 的样例，档案记录该限制并链接官方数据页；不会伪装成稳定媒体直链。后续要把任何图片加入 `content`，需要取得或找到该图片对应的明确授权，且按许可展示署名与链接。
