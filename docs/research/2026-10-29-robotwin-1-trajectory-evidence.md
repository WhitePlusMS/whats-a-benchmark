# RoboTwin 1.0 相关真实采样记录核查

核查时间：2026-10-29。

## 数据来源和版本边界

- [第三方数据集固定版本说明](https://huggingface.co/datasets/YimouWu/RoboTwin_instruct-pix2pix/blob/9cd520acee16ed28721c10c01b65cc37e028ab68/README.md)由 Shenghao Yang 和 Yimou Wu 发布，说明从 RoboTwin 的 `block_hammer_beat` 等任务采样、`save_freq: 50`，并提供采样 PKL 与 JPEG；该卡标注 MIT，却没有说明采集时上游 Git commit，且称为单臂模拟器。
- HF 数据集元数据中创建于 2025-05-03；[官方版本时间线](https://github.com/RoboTwin-Platform/RoboTwin/blob/main/README.md)列出 2.0 于 2025-06-21 发布；[1.0 固定分支](https://github.com/RoboTwin-Platform/RoboTwin/blob/65a6f5bb74794ba193c6bf17d8eae3b74fc2df70/README.md)包含 `block_hammer_beat`。时间与任务名支持其为 1.0 相关数据，但不能单凭这些证明严格使用了 1.0 某个 commit。
- [数据索引](https://huggingface.co/datasets/YimouWu/RoboTwin_instruct-pix2pix/blob/9cd520acee16ed28721c10c01b65cc37e028ab68/block_hammer_beat_D435_pkl/dataset.jsonl)训练集的一条配对记录指向 `episode0/15.pkl` 和 `episode0/16.pkl`，这是第三方采样对，不是官方测试集或模型评测成绩。

## 实际下载和核验

- 两个 PKL 各 3,405,850 字节：[15.pkl](https://huggingface.co/datasets/YimouWu/RoboTwin_instruct-pix2pix/blob/9cd520acee16ed28721c10c01b65cc37e028ab68/block_hammer_beat_D435_pkl/episode0/15.pkl)，SHA-256 `7cd1332fadb356acbda8eaf4722cc7b2dc1f7ec84a656b747563cc9b4cc56031`；[16.pkl](https://huggingface.co/datasets/YimouWu/RoboTwin_instruct-pix2pix/blob/9cd520acee16ed28721c10c01b65cc37e028ab68/block_hammer_beat_D435_pkl/episode0/16.pkl)，SHA-256 `f8ab9fbf9fb0d1a3839bf3b7c7bf6f327a3ffe46928391b657da94b126490565`。
- 采用只允许 NumPy 重建函数的受限反序列化读取：每个记录包含四路相机 RGB/深度与标定信息、1024×6 点云、14 维 `joint_action` 和 14 维 `endpose`。这些是两次采样，并非连续全量轨迹。
- 直接比较 PKL 的 `head_camera.rgb` 与同编号预览 JPEG：15 号平均绝对 RGB 差约 26.32，16 号约 2.40；15 号并非同一画面。站内图片直接无损导出 PKL 的 RGB 数组，不将 JPEG 与 PKL 混配。原始时间戳不可见，卡片所称 50 帧间隔尚未从记录中独立验证。
- 数据集卡标 MIT，未发现独立版权声明；图像内仿真场景和第三方资产的权利范围仍需单独核实。

## 追加核查：明确标注 1.0 的完整预处理演示

- [D-Robotics 项目固定版本 README](https://github.com/D-Robotics-AI-Lab/DRRM/blob/8e71cd63419e87740449e1fca39d19a980f5d54b/README.md)明确列出 `drrm_robotwin1.0_D435_200_rgb` 与 `drrm_robotwin1.0_D435_200_pcd`，并指向 [DRRM 数据集](https://huggingface.co/datasets/D-Robotics/DRRM)；该数据由第三方发布，是预处理训练演示。数据卡标记 Apache-2.0，仿真资产权利需另核。
- 实际下载 [episode_000000.parquet](https://huggingface.co/datasets/D-Robotics/DRRM/blob/e483263d52cf8e730cb0edf871f911f2204ecdea/drrm_robotwin1.0_D435_200_rgb/block_hammer_beat/data/chunk-000/episode_000000.parquet)，21,981,592 字节，SHA-256 `704b188ffec183d418913729f0d58a48e6c2c6ed44416368b5685dee68504062`。解析 211 行，`episode_index` 均为 0、`frame_index` 从 0 到 210 连续，且与 [episodes.jsonl](https://huggingface.co/datasets/D-Robotics/DRRM/blob/e483263d52cf8e730cb0edf871f911f2204ecdea/drrm_robotwin1.0_D435_200_rgb/block_hammer_beat/meta/episodes.jsonl)的长度 211 一致；[info.json](https://huggingface.co/datasets/D-Robotics/DRRM/blob/e483263d52cf8e730cb0edf871f911f2204ecdea/drrm_robotwin1.0_D435_200_rgb/block_hammer_beat/meta/info.json)标注 30 FPS。文件包含 head_cam、front_cam、agent_pos、action、endpose 和时间索引等。
- 站内下载附件 `robotwin-1-drrm-block-hammer-episode-0.json` 包含全部 211 帧数值字段，不包含相机图片；原始 Parquet 包含完整头部和前方相机数据，三张站内图片直接提取自原始文件。该序列是训练演示，不是模型成绩，也没有根据最后一帧自行判断成功。
- 为核对旧 YimouWu 样本，比较其 0、1、15、16 号 PKL 的 `joint_action`、`endpose` 与 DRRM 同号帧：0 完全相同，1 最大绝对差约 2e-12；15 和 16 不一致。前两帧相同不足以证明相同轨迹或上游 commit，旧样本维持版本未锁定。
