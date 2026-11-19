import json
from pathlib import Path
p = Path('content/benchmarks/rlbench.json')
data = json.loads(p.read_text(encoding='utf-8'))
for asset in data['sampleSet']['samples'][0]['assets']:
    asset.update({'alt': asset['caption'], 'width': 128, 'height': 128})
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
with Path('UPDATE_LOG.md').open('a', encoding='utf-8') as out:
    out.write('\n- 为 RLBench 新增相机帧补齐图片替代文本及 128×128 尺寸，以满足内容校验并改善无障碍展示。\n')
