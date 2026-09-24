# OSWorld

核验日期：2026-09-23。

## 官方身份

OSWorld 是 XLANG Lab 发布的多模态 agent 真实计算机环境与 benchmark，论文发表于 NeurIPS 2024。它面向开放域桌面任务，支持任务初始化、交互执行和基于任务结果的评估。[官方项目页](https://os-world.github.io/)；[官方仓库](https://github.com/xlang-ai/OSWorld)

## 官方定义与忠实中文概述

评测 agent 能否在 Ubuntu、Windows、macOS 等桌面环境中使用真实 web/desktop 应用、操作文件并完成跨应用工作流。官方任务由真实计算机使用场景构造，配有初始状态配置和执行式 evaluator。[官方项目页](https://os-world.github.io/)

## 任务输入/输出/环境

- 输入：自然语言指令、VM 初始状态及任务预置文件/应用状态。
- 操作：agent 通过图形界面与桌面应用交互；官方环境支持截图等多模态交互。
- 输出：桌面/应用最终状态；每项任务的自定义执行 evaluator 判断完成情况。
- 环境：可通过 VMware/VirtualBox、Docker、AWS 等 provider 启动桌面 VM；运行配置须记录 OS、provider、agent 接口和任务版本。[官方 README](https://github.com/xlang-ai/OSWorld)

## 数据规模/split/字段/文件

官方项目页说明 Ubuntu 评测集有 369 项任务，另有 43 项 Windows 分析任务；其中 43 项仅可在激活后使用，受版权限制。369 项中有 8 项 Google Drive 任务可能需手工配置，也可按官方说明排除，形成 361 题运行；报告成绩须写明采用 369 还是 361 项。[官方项目页](https://os-world.github.io/)；[官方 README](https://github.com/xlang-ai/OSWorld)

每条任务包含初始状态配置、任务指令和 execution-based evaluator。任务实现位于官方 repo 的 task/config 文件；具体字段结构应按所固定的代码版本读取，不将 Windows 补充集或后来的 V2 gated 文件混进原始集合。[官方项目页](https://os-world.github.io/)；[官方 GitHub](https://github.com/xlang-ai/OSWorld)

## 访问状态

`dataAccess.url` 和样例入口现指向官方 `evaluation_examples/examples` 任务目录，涵盖原版公开任务配置。Windows 补充集仍受版权限制，Google Drive 任务的运行限制需按 README 处理。[官方任务目录](https://github.com/xlang-ai/OSWorld/tree/main/evaluation_examples/examples)；[官方 README](https://github.com/xlang-ai/OSWorld)

## 数据/代码/媒体许可与使用边界

- OSWorld GitHub repo 标注 Apache-2.0，可按 LICENSE 使用受其覆盖的代码/文件。[官方 LICENSE](https://github.com/xlang-ai/OSWorld/blob/main/LICENSE)
- 官方材料明确指出 Windows 补充任务有版权限制，不能因 repo 为 Apache-2.0 就假定这些任务或引用应用/网站的内容都能转载。
- 本站可链接 repo、项目页和论文；不复制任务提示、初始化资源、第三方网站页面、应用截图、用户数据或公开轨迹。每项资产的具体权利未逐条核查。

## 官方样例与是否可在公开 GitHub Pages 转载

仓库包含公开任务示例和演示页面，但执行环境中的第三方应用界面/页面并非因仓库代码许可而自动获转载权。本站不复制原始任务全文、资产或截图，仅链接官方 viewer 和 README。Windows 补充数据明确有版权限制，不能作为站内样例。[官方项目页](https://os-world.github.io/)；[官方仓库 LICENSE](https://github.com/xlang-ai/OSWorld/blob/main/LICENSE)

## 指标

按任务 execution evaluator 判定成功；总体成功率须以明确的任务集合为分母。官方早期论文页面报告当时最佳模型与人类结果，但它们是论文实验快照，不能直接当作当前 OSWorld-Verified 榜单数据。[官方论文](https://arxiv.org/abs/2404.07972)；[官方项目页](https://os-world.github.io/)

## 版本关系

OSWorld 原始 benchmark 与 2025-07-28 推出的 OSWorld-Verified 是同一项目的不同评测状态：后者修复社区报告问题、扩充 AWS 支持并更新结果，官方要求新运行与新版结果比较。2026-06 项目页再指向独立的 OSWorld 2.0；其长时程任务和 gated Python task classes 属于新版本，不应与 OSWorld 1.0 的公开 JSON/配置任务集合混称或拼接。[官方 README 更新说明](https://github.com/xlang-ai/OSWorld)；[OSWorld 2.0 迁移指南](https://github.com/xlang-ai/OSWorld-V2/blob/main/docs/MIGRATING_FROM_OSWORLD_V1.md)

## 官方来源按角色分组

- 基准定义、任务数量、平台与 Google Drive 例外：[OSWorld 项目页](https://os-world.github.io/)
- 代码、运行环境、OSWorld-Verified 更新和许可：[XLANG Lab 官方仓库](https://github.com/xlang-ai/OSWorld)
- 原始论文：[arXiv:2404.07972](https://arxiv.org/abs/2404.07972)
- V1 与 V2 边界：[OSWorld-V2 迁移指南](https://github.com/xlang-ai/OSWorld-V2/blob/main/docs/MIGRATING_FROM_OSWORLD_V1.md)

## 模型发布引用

本记录不引用模型厂商分数。厂商报告须注明 OSWorld 原始版或 OSWorld-Verified、任务分母、provider 与执行协议；不得拿 OSWorld 2.0 成绩替代。

## 未核实项

- 369 题中逐项的当前初始化可用性、任务级许可证和完整文件清单未重新执行/检查。
- 43 项 Windows 补充任务的开放范围和具体激活流程未在此核查；不转载其内容。
- OSWorld-Verified 当前榜单和各方法运行配置会变动，本报告不抄录当期分数。

## 研究结论

**PASS_WITH_LIMITATIONS** — 第一方来源证实 OSWorld 原始版的 369 项主任务、43 项受版权限制的 Windows 补充任务及 8 项 Drive 初始化例外。Apache-2.0 仓库代码不覆盖所有环境内容；公开站点只链接官方资源，并将原始版、Verified 和 2.0 分开。
