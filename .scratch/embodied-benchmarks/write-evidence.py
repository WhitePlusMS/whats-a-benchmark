import json
from pathlib import Path
ids=['meta-world','r2r','vlabench','embodiedbench','robotwin-early','rlbench','calvin','behavior-1k','libero-plus','simple-embodied','graspnet-1billion','robotwin-2','suctionnet-1billion','maniskill2','robocasa','robotwin-1','toto','simpler']
lines=['# 具身评测真实样例取证记录','', '核查日期：2026-10-29。以实际下载并读取的记录为准；演示、轨迹、候选标注、单次结果与汇总评测成绩不是同一种数据。部分数据来自第三方格式转换，已在条目中标明；许可证及资产范围以原始来源为准。','']
for id in ids:
 d=json.loads(Path('content/benchmarks',id+'.json').read_text(encoding='utf-8'))
 lines += ['## '+d['name'],'']
 ss=d.get('sampleSet',{}).get('samples',[])
 if ss:
  for s in ss:
   lines += ['- 样例：'+s['title']+'。'+s.get('explanation',''),'- 来源：'+s['source'],'- 范围：'+s.get('split','未注明'),'- 使用条件：'+s.get('license','未核实')]
   raw=s.get('raw',{})
   for k,v in raw.items():
    if ('sha256' in k.lower() or k in ('revision','dataset')) and isinstance(v,str): lines.append('- '+k+'：`'+v+'`')
  for n in d.get('researchNotes',[]):
   lines += ['- 取证：'+n['text']]
 else:
  lines += ['- 尚无站内单条轨迹：'+d['sampleAccess']['reason']]
  lines += ['- 资料：'+u for u in d['sampleAccess'].get('sourceUrls',[])]
 lines += ['']
lines += ['## 取证边界','', '- Meta-World 和 VLABench 已取得并展示原始数据帧；其余案例以数值、轨迹动作、导航路径或标注摘录为主，未经许可确认的媒体没有复制到站内。','- 单条成功标志只属于该轨迹；不得把训练、合成演示、标注候选或单条轨迹当成模型榜单成绩。','- 完整下载文件保留于本机 `.scratch/embodied-benchmarks/`；产品数据中仅存可审阅摘录、出处和校验信息。']
Path('docs/research/2026-10-29-embodied-actual-samples.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
with Path('UPDATE_LOG.md').open('a',encoding='utf-8') as f:f.write('\n### 2026-10-29：记录具身样例取证\n\n- `docs/research/2026-10-29-embodied-actual-samples.md`：汇总原先缺样例的 18 个条目的实际下载、数据来源、版本、哈希、用途和未核实边界。\n- 影响：后续维护可直接复核样例来源，不改变前端交互。\n')
