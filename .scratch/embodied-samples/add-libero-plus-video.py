import json
import shutil
from pathlib import Path

root = Path('.')
path = root/'content/benchmarks/libero-plus.json'
d = json.loads(path.read_text(encoding='utf-8'))
base = 'https://huggingface.co/datasets/Sylvest/libero_plus_lerobot'
rev = '22c57433fef692b5b9ecc0795344daac7fa867a5'
video = f'{base}/blob/{rev}/videos/chunk-000/observation.images.front/episode_000000.mp4'
episodes = f'{base}/blob/{rev}/meta/episodes.jsonl'
info = f'{base}/blob/{rev}/meta/info.json'
for label,url in [('训练轨迹前置相机视频',video),('训练轨迹元数据',episodes),('训练数据划分与帧率',info)]:
    d['sources'].append({'label':label,'url':url,'role':'data'})
d['reusePolicy'] = {'status':'permitted','license':'LIBERO-Plus 链接的训练数据卡标注 MIT；LIBERO 上游数据与场景素材的独立许可需一并核对。','scope':'展示该训练数据的第 0 条轨迹及其前置相机视频。','boundaries':['数据卡许可声明不自动覆盖所有上游场景资产。'],'sourceUrls':[base,'https://github.com/sylvestf/LIBERO-plus']}
d['sampleAccess']['reason'] = '已下载官方链接训练集中的轨迹与对应相机视频，展示同一轨迹的状态、动作及画面。'
d['sampleAccess']['sourceUrls'] += [episodes,info,video]
s=d['sampleSet']['samples'][0]
s['explanation'] = '这是 LIBERO-Plus 公开链接的 LeRobot 训练数据；同一 episode 共 277 帧、20 Hz。前置相机视频与状态、动作来自同一条轨迹；视频已转码。它不是鲁棒性测试的模型成绩。原始动作中的负零以字符串 -0.0 保留。'
s['license'] = '训练集数据卡标注 MIT；上游 LIBERO 数据和场景资产的许可范围需一并核对。'
s['raw']['episode_metadata'] = {'episode_index':0,'tasks':['put the white mug on the left plate and put the yellow and white mug on the right plate'],'length':277,'fps':20}
s['assets'] = [{'kind':'video','path':'videos/libero-plus-episode0-front.mp4','caption':'训练轨迹 0：前置相机，277 帧','source':video}]
shutil.copyfile(root/'.scratch/embodied-samples/realdata/plus-front-h264.mp4',root/'content/assets/videos/libero-plus-episode0-front.mp4')
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### LIBERO-Plus 训练轨迹视频\n\n- 修改 `content/benchmarks/libero-plus.json`：依据固定版本 `episodes.jsonl` 和 `info.json` 核对任务、277 帧、20 Hz 及 train 划分，为已有 episode 0 样例关联前置相机视频及来源。\n- 添加 `content/assets/videos/libero-plus-episode0-front.mp4`：从对应原始视频转码生成，以便在常见浏览器播放。页面标注数据卡 MIT 及上游素材许可范围需分别核对，不将训练示范描述为模型评测成绩。\n')
