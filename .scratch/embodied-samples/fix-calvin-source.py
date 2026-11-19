from pathlib import Path
p = Path('content/benchmarks/calvin.json')
text = p.read_text(encoding='utf-8').replace('observation.images.rgb_static/episode_000000.mp4', 'video.image_base/episode_000000.mp4')
p.write_text(text, encoding='utf-8')
with Path('UPDATE_LOG.md').open('a', encoding='utf-8') as out:
    out.write('\n- 按 CALVIN 转换集的 `info.json` 将视频来源中的相机字段修正为 `video.image_base`，并通过 SHA-256 核对站内视频与固定版本源文件一致。\n')
