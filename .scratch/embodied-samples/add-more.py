import json
import shutil
from pathlib import Path
import pyarrow.parquet as pq

root = Path('.')
scratch = root / '.scratch/embodied-samples/realdata'
assets = root / 'content/assets'

def load(name):
    return json.loads((root / f'content/benchmarks/{name}.json').read_text(encoding='utf-8'))

def save(name, data):
    (root / f'content/benchmarks/{name}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def register(entry, label, url):
    if not any(x['url'] == url for x in entry['sources']):
        entry['sources'].append({'label': label, 'url': url, 'role': 'data'})

cal = load('calvin')
base = 'https://huggingface.co/datasets/InternRobotics/InternData-Calvin_ABC'
rev = 'fd844a43912c1823ff8355873b6f013a5cce127a'
file_url = f'{base}/blob/{rev}/data/chunk-000/episode_000000.parquet'
video_url = f'{base}/blob/{rev}/videos/chunk-000/observation.images.rgb_static/episode_000000.mp4'
meta_url = f'{base}/blob/{rev}/meta/episodes.jsonl'
info_url = f'{base}/blob/{rev}/meta/info.json'
for label, url in [('InternRobotics 转换集数据卡',base),('CALVIN 转换轨迹数据',file_url),('CALVIN 转换轨迹元数据',meta_url),('CALVIN 转换集划分',info_url),('CALVIN 转换轨迹静态相机视频',video_url)]: register(cal,label,url)
shutil.copyfile(scratch/'calvin-0.mp4', assets/'videos/calvin-abc-episode0.mp4')
cal['reusePolicy'] = {'status':'permitted','license':'本视频来源的 InternRobotics 转换集数据卡标注 MIT；另一个转换集标注 Apache-2.0。CALVIN 上游演示数据的独立许可尚未核实。','scope':'本站转载 InternRobotics 转换集的第 0 条轨迹视频；许可声明来自该转换集。','boundaries':['许可声明不代表已核实上游所有素材的权利范围。'],'sourceUrls':[base,'https://huggingface.co/datasets/CollisionCode/calvin_d_d_lerobot_v2.1']}
cal['sampleAccess']['reason'] = '已下载两条第三方转换的训练轨迹；其中一条提供原始相机视频及状态和动作节选。'
cal['sampleAccess']['sourceUrls'] += [file_url,meta_url,info_url,base]
calrow = pq.read_table(scratch/'calvin-0.parquet').slice(0,1).to_pylist()[0]
calepisode = json.loads((scratch/'calvin-episodes.jsonl').read_text(encoding='utf-8').splitlines()[0])
cal['sampleSet']['samples'].insert(0, {'id':'calvin-abc-pink-block-episode0','title':'推动粉色积木 · 训练轨迹 0','type':'record','promptOrigin':'editorial','prompt':'让机械臂将粉色积木向左推。','explanation':'第三方将 CALVIN ABC 数据转换为 LeRobot 格式；第 0 条轨迹有 46 帧、每秒 10 帧。视频、任务和首帧状态来自同一条轨迹，元数据将其划为训练数据，并非评测结果。','raw':{'episode':calepisode,'first_frame':calrow},'source':file_url,'license':'InternRobotics 转换集数据卡标注 MIT；CALVIN 上游数据的独立许可尚未核实。','split':'train / episode 0 / 第三方转换集','excerpt':True,'assets':[{'kind':'video','path':'videos/calvin-abc-episode0.mp4','caption':'第 0 条轨迹：静态相机视角，46 帧','source':video_url}]})
save('calvin',cal)

rl = load('rlbench')
base = 'https://huggingface.co/datasets/daixianjie/rlbench_lerobot_test'
rev = 'b9864f3dde6a07ee20ce9753783e1ec96ac0582f'
file_url = f'{base}/blob/{rev}/data/chunk-000/episode_000000.parquet'
meta_url = f'{base}/blob/{rev}/meta/episodes.jsonl'
info_url = f'{base}/blob/{rev}/meta/info.json'
for label,url in [('RLBench 转换集数据卡',base),('放杯子轨迹数据',file_url),('放杯子轨迹元数据',meta_url),('转换集划分说明',info_url)]: register(rl,label,url)
for idx in (0,242,484): shutil.copyfile(scratch/f'rlbench-episode0-{idx}.png', assets/f'images/rlbench-place-cups-episode0-{idx}.png')
episode = json.loads((scratch/'rl-meta-episodes.jsonl').read_text(encoding='utf-8').splitlines()[0])
table = pq.read_table(scratch/'rl-data-chunk-000-episode_000000.parquet')
row = {k:v for k,v in table.slice(0,1).to_pylist()[0].items() if k not in ('image','wrist_image')}
rl['reusePolicy'] = {'status':'permitted','license':'本图像来源的第三方转换数据卡标注 Apache-2.0；RLBench 软件许可包含非商业研究限制，源数据许可范围须分别核对。','scope':'本站展示第三方转换轨迹的三个相机帧；许可声明来自该转换集。','boundaries':['数据卡的 Apache 声明不代表已核实上游所有素材的权利范围。'],'sourceUrls':[base,'https://github.com/stepjam/RLBench/blob/master/README.md']}
rl['sampleAccess']['reason'] = '已下载两条第三方转换轨迹，展示真实状态、动作和一条轨迹的原始图像。'
rl['sampleAccess']['sourceUrls'] += [file_url,meta_url,info_url,base]
rl['sampleSet']['samples'].insert(0, {'id':'rlbench-place-two-cups-converted-episode0','title':'把两个杯子放上杯架 · 轨迹 0','type':'record','promptOrigin':'editorial','prompt':'把两个杯子放到杯架上。','explanation':'这条第三方转换轨迹共 485 帧、每秒 10 帧；下方三张图片分别来自第 0、242 和 484 帧，状态与动作摘自首帧。仓库名称含 test，但其内部元数据将轨迹划为 train，未证实与原版 RLBench 测试划分的对应关系。','raw':{'episode':episode,'first_frame':row},'source':file_url,'license':'第三方转换数据卡标注 Apache-2.0；上游素材的许可范围须分别核对。','split':'train / episode 0 / 第三方转换集','excerpt':True,'assets':[{'kind':'image','path':f'images/rlbench-place-cups-episode0-{idx}.png','caption':f'第 {idx} 帧：轨迹相机图像','source':file_url} for idx in (0,242,484)]})
save('rlbench',rl)

with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### CALVIN 与 RLBench 真实转换轨迹\n\n- 修改 `content/benchmarks/calvin.json`，下载并接入 InternRobotics 的 CALVIN ABC 第 0 条训练轨迹静态相机视频、任务和首帧状态；文件 `content/assets/videos/calvin-abc-episode0.mp4` 来自该轨迹。补充固定版本来源、转换集许可及上游许可边界。\n- 修改 `content/benchmarks/rlbench.json`，从第三方转换集的第 0 条轨迹导出 0、242、484 三帧，保存至 `content/assets/images/rlbench-place-cups-episode0-*.png`，并关联同一轨迹的任务与首帧字段。数据仓库名称虽含 test，元数据实际标记 train，页面明确说明两者区别及上游许可边界。\n- 原因：让读者直接查看真实记录与对应画面；影响：两项评测增加可追溯的训练轨迹展示，不将其描述为验证结果或模型得分。\n')
