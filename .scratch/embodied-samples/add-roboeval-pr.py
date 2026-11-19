import json
import shutil
from pathlib import Path

root=Path('.')
path=root/'content/benchmarks/roboeval-bimanual-challenge.json'
d=json.loads(path.read_text(encoding='utf-8'))
base='https://huggingface.co/datasets/helen9975/roboeval_ee_delta_20hz_scaled'
rev='918b4072cd1d15f28b1f96a440ac7aa84591ce92'
prefix=f'{base}/blob/{rev}/LiftPotPositionAndOrientation'
data=f'{prefix}/data/chunk-000/file-000.parquet'
episodes=f'{prefix}/meta/episodes/chunk-000/file-000.parquet'
info=f'{prefix}/meta/info.json'
for label,url in [('抬锅位置与姿态变体轨迹',data),('抬锅变体轨迹元数据',episodes),('抬锅变体数据划分与帧率',info)]:
    d['sources'].append({'label':label,'url':url,'role':'data'})
d['sampleAccess']['reason']='展示官方任务演示，以及挑战赛位置与姿态组合变体中的一条训练轨迹和对应图像。'
d['sampleAccess']['sourceUrls'] += [data,episodes,info]
d['reusePolicy']['scope']='本站展示 RoboEval 官方任务示范和挑战赛指定变体的一条训练轨迹图像；许可按资源类型分别核对。'
frames=json.loads((root/'.scratch/embodied-samples/realdata/pot-pr-frames.json').read_text(encoding='utf-8'))
assets=[]
for frame in (0,115):
    filename=f'roboeval-challenge-pot-episode0-{frame}.png'
    shutil.copyfile(root/f'.scratch/embodied-samples/realdata/pot-pr-{frame}.png',root/f'content/assets/images/{filename}')
    assets.append({'kind':'image','path':f'images/{filename}','alt':f'抬锅演示轨迹 0 的第 {frame} 帧头部相机画面','width':256,'height':256,'caption':f'位置与姿态变体 · episode 0 · 第 {frame} 帧 · 头部相机','source':data})
d['sampleSet']['samples'].insert(0,{'id':'roboeval-challenge-liftpot-pr-train-episode0','title':'双臂抬锅 · 位置与姿态变体训练轨迹','type':'record','promptOrigin':'editorial','prompt':'双臂分别抓住锅的两侧，将锅抬离台面。','explanation':'挑战赛使用的位置与姿态组合变体中，官方演示数据 episode 0 共 116 帧、20 Hz；图像与动作来自同一条轨迹。末帧记录 reward=1、is_terminal=true，只描述这次演示，不是模型挑战赛得分。','raw':{'dataset':'helen9975/roboeval_ee_delta_20hz_scaled','variant':'LiftPotPositionAndOrientation','episode_index':0,'task':'Grip the pot on both sides and elevate it above the counter.','length':116,'fps':20,'frames':frames},'source':data,'license':'RoboEval 挑战赛官方规则声明评测资源与示范数据采用 MIT。','licensePath':'licenses/roboeval-media-mit.txt','split':'train / LiftPotPositionAndOrientation / episode 0；人类演示。','excerpt':True,'assets':assets})
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### RoboEval 挑战赛指定变体真实样例\n\n- 修改 `content/benchmarks/roboeval-bimanual-challenge.json`，依据固定版本任务与 episode 元数据加入位置和姿态联合扰动的抬锅训练轨迹，展示指令、帧号、夹爪状态、动作、奖励和结束标志，并标注真实 train 划分。\n- 从同一 Parquet 记录提取头部相机第 0 与第 115 帧，新增 `content/assets/images/roboeval-challenge-pot-episode0-{0,115}.png`；两帧均已查看，保留原始 PNG 和数据来源。\n- 目的：让挑战赛条目包含实际指定变体的数据与画面，避免把普通演示或单次示范的奖励解释成模型测试成绩。\n')
