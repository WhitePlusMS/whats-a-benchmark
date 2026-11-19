import json
import shutil
from pathlib import Path

root = Path('.')
path = root / 'content/benchmarks/robocasa.json'
data = json.loads(path.read_text(encoding='utf-8'))
base = 'https://huggingface.co/datasets/DAVIAN-Robotics/robocasa-MG_100'
rev = '510a2940a66e0debc9818803cdb62b140a6c4bb6'
video = f'{base}/blob/{rev}/videos/observation.images.robot0_agentview_left_image/chunk-000/file-000.mp4'
episodes = f'{base}/blob/{rev}/meta/episodes/chunk-000/file-000.parquet'
info = f'{base}/blob/{rev}/meta/info.json'
for label, url in [('转换集左侧相机视频分片',video),('转换轨迹与视频时间索引',episodes),('转换数据划分与帧率',info),('转换集许可声明',base)]:
    data['sources'].append({'label':label,'url':url,'role':'data'})
data['reusePolicy'] = {'status':'permitted','license':'DAVIAN-Robotics 转换数据卡标注 Apache-2.0；RoboCasa 原版和第三方场景资产的转载范围须分别核实。','scope':'展示转换集第 0 条轨迹的左侧相机片段，许可声明来自转换数据卡。','boundaries':['转换数据卡的许可声明不代表已核实所有上游场景和物品素材的权利范围。'],'sourceUrls':[base,'https://github.com/robocasa/robocasa']}
data['sampleAccess']['reason'] = '已下载原版 RoboCasa 的第三方转换演示，展示第 0 条轨迹的相机视频、状态和动作。'
data['sampleAccess']['sourceUrls'] += [episodes,info,video]
sample = data['sampleSet']['samples'][0]
sample['explanation'] = '这是原版 RoboCasa 的 MG_100 合成演示经第三方转换后的 episode 0，共 415 帧、20 Hz。视频由左侧相机分片的 0 至 20.75 秒截取并转码；转换集元数据将轨迹划为 train。它不是模型评测成绩，也不能与 RoboCasa365 混同。'
sample['raw']['episode_video'] = {'episode_index':0,'tasks':['close the cabinet doors'],'length':415,'camera':'observation.images.robot0_agentview_left_image','chunk_index':0,'file_index':0,'from_timestamp':0.0,'to_timestamp':20.75}
sample['split'] = 'train / MG_100 / episode_index 0 / 第三方转换集'
sample['assets'] = [{'kind':'video','path':'videos/robocasa-mg100-episode0.mp4','caption':'关闭橱柜门：轨迹 0 的左侧相机，原分片 0–20.75 秒','source':video}]
shutil.copyfile(root/'.scratch/embodied-samples/realdata/robocasa-episode0.mp4',root/'content/assets/videos/robocasa-mg100-episode0.mp4')
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n- 修改 `content/benchmarks/robocasa.json`，依据转换集的 episode 索引，从左侧相机视频分片截取 episode 0 的 0–20.75 秒并转码至 `content/assets/videos/robocasa-mg100-episode0.mp4`；明确数据为 train 合成演示，补充视频、元数据、数据卡及许可边界。目的是使已有动作记录对应可观看画面，不将演示解释为模型成绩。\n')
