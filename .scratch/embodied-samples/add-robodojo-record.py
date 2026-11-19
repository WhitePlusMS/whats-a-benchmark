import json
from pathlib import Path

root=Path('.')
def load(name):
    path=root/f'content/benchmarks/{name}.json'
    return path,json.loads(path.read_text(encoding='utf-8'))
def save(path,d):
    path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

path,d=load('robodojo')
url='https://huggingface.co/datasets/RoboDojo-Benchmark/RoboDojo/blob/1127bda94f172d757386945af3eb3a6754d1a4e6/data/RoboDojo/sweep_blocks/arx_x5/data/episode_0000000.hdf5'
d['sources'].append({'label':'扫积木演示轨迹 HDF5 固定版本','url':url,'role':'data'})
d['sampleAccess']['sourceUrls'].append(url)
d['sampleAccess']['reason']='已核对官方扫积木演示的视频和同编号 HDF5，展示轨迹指令、左右臂状态与动作节选。'
d['taskContract']['input']='选定的仿真或实机操作任务、机器人观测及评测配置；任务涉及物体、环境或技能泛化。'
d['taskContract']['output']='控制机器人完成抓取、工具使用或多步骤操作；分别按仿真任务和真实任务的成功条件评估。'
s=d['sampleSet']['samples'][1]
source=json.loads((root/'.scratch/embodied-samples/realdata/robodojo-episode0.json').read_text(encoding='utf-8'))
s['title']='扫积木 · 仿真演示轨迹 0'
s['explanation']='官方数据集中 arx_x5 的 episode 0 共 702 帧、25 Hz；画面与下面的任务指令、首／中／末帧左右臂状态及动作来自同编号轨迹。它是仿真演示，不代表模型评测成绩；数据源未在此文件中标明训练或测试划分。'
s['raw']={'dataset':'RoboDojo-Benchmark/RoboDojo','task':'sweep_blocks','robot':'arx_x5','episode_index':0,'frame_count':702,**source}
s['source']=url
s['split']='sweep_blocks / arx_x5 / episode 0；官方演示数据，未确认 train 或 test 划分。'
d['researchNotes'].append({'text':'对固定版本 episode_0000000.hdf5 按 HTTP Range 读取元数据和三个时刻的状态与动作，确认 702 帧、25 Hz 和扫积木指令；同编号头部相机视频已在站内展示。','sourceUrls':[url]})
save(path,d)

path,d=load('rle-bench')
d['taskContract']['input']='机器人学习工程任务目标、代码与仿真环境，以及任务指定的工具、算力和时间预算。'
d['taskContract']['output']='编写、运行并调整控制代码、学习方案、感知或机械设计，利用仿真反馈完成任务并提交相应成果。'
save(path,d)

path,d=load('robotarena-infinity')
d['taskContract']['input']='由真实演示重建的仿真场景、机器人任务指令及策略所需观测。'
d['taskContract']['output']='策略在重建场景及受控扰动下执行操作，结果由视觉语言模型和人类偏好比较进行评估。'
save(path,d)
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### RoboDojo 原始轨迹与任务流程\n\n- 修改 `content/benchmarks/robodojo.json`：对已有扫积木视频对应的官方 HDF5 使用分段读取，核对 episode 0 的指令、702 帧、25 Hz 和首／中／末帧左右臂关节状态与动作；关联固定版本文件，明确为仿真演示及未知训练／测试划分。\n- 修改 `content/benchmarks/rle-bench.json` 和 `robotarena-infinity.json`：根据官方论文与项目说明补充代码工程任务和真实到仿真的策略评测输入输出。\n- 影响：样例的视频和数字记录可以交叉核对，任务说明不再依赖通用占位模板；未运行任何模型评测。\n')
