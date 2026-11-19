import json
import math
from pathlib import Path

def normalize(value):
    if isinstance(value, float) and value == 0 and math.copysign(1, value) < 0:
        return 0.0
    if isinstance(value, list):
        return [normalize(item) for item in value]
    if isinstance(value, dict):
        return {key: normalize(item) for key, item in value.items()}
    return value

for name in ['libero', 'roboeval', 'calvin', 'rlbench', 'robotwin-2', 'bigym-2', 'gm-100', 'roboquest']:
    path = Path(f'content/benchmarks/{name}.json')
    original = json.loads(path.read_text(encoding='utf-8'))
    normalized = normalize(original)
    before = json.dumps(original, ensure_ascii=False, indent=2) + '\n'
    after = json.dumps(normalized, ensure_ascii=False, indent=2) + '\n'
    if before != after:
        path.write_text(after, encoding='utf-8')
with Path('UPDATE_LOG.md').open('a', encoding='utf-8') as out:
    out.write('\n- 将新增轨迹中的数值负零规范化为零，避免 JSON 序列化改变负零符号后触发产物一致性检查；不改变数值大小。\n')
