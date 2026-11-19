import json
import shutil
from pathlib import Path

root=Path('.')
path=root/'content/benchmarks/robotwin-early.json'
d=json.loads(path.read_text(encoding='utf-8'))
s=d['sampleSet']['samples'][0]
url='https://huggingface.co/datasets/YaoMarkMu/robotwin_dataset/blob/53fda493155c73c4a1829a6638535f787ca11009/diverse_bottles_pick.zip'
s['explanation']='官方点云包中 episode0 含 186 帧；本站展示第 0、93、185 帧的关节动作、末端位姿和点云。图像是依据每帧 1,024 个 XYZRGB 点绘制的三维散点图，不是相机照片；三图采用同一视角与三帧合并后坐标的 1%–99% 分位显示范围。该记录不是模型总体成功率。'
s['assets']=[]
for frame in (0,93,185):
    filename=f'robotwin-early-pointcloud-{frame}.png'
    shutil.copyfile(root/f'.scratch/embodied-benchmarks/early-pointcloud-{frame}.png',root/f'content/assets/images/{filename}')
    s['assets'].append({'kind':'image','path':f'images/{filename}','alt':f'第 {frame} 帧点云三维散点图','width':840,'height':840,'caption':f'轨迹 0 · 第 {frame} 帧 · 从点云绘制，非相机照片','source':url})
d['reusePolicy']['scope']='站内展示演示的关节、末端位姿和点云数值节选，以及从同一轨迹点云绘制的三帧图像；其他场景素材需单独核对。'
d['sampleAccess']['reason']='已取得早期版官方 Diverse Bottles Pick 数据包，展示同一条演示的三帧数值和点云渲染图。'
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

path=root/'content/benchmarks/mmlu-prox.json'
d=json.loads(path.read_text(encoding='utf-8'))
d['officialDefinition']['summary']='基于 MMLU-Pro 构建的多语言选择题评测，比较模型跨语言的专业知识和推理能力。'
d['taskContract']['input']='指定语言的专业知识与推理选择题，原始数据提供最多十个候选选项。'
d['taskContract']['output']='选择与题目相符的选项；结果可按语言和学科分类统计。'
d['taskContract']['environment']='数据按语言提供 validation 和 test；作者提供 lm-evaluation-harness 的复现方法，比较时应记录语言、划分和推理设置。'
d['sampleSet']['samples'][0]['explanation']='T 将多项式乘以 x，S 对多项式求导。由乘积求导法则，ST(p)=(xp)′=p+xp′，而 TS(p)=xp′，所以 ST−TS 对任意 p 都等于 p，即恒等映射，选 H。'
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 早期 RoboTwin 点云与 MMLU-ProX 任务说明\n\n- 修改 `content/benchmarks/robotwin-early.json` 并添加 `content/assets/images/robotwin-early-pointcloud-{0,93,185}.png`：使用官方数据包同一条轨迹的 1,024 点 XYZRGB 数据绘制三帧三维图，统一视角和坐标范围，并明确这些是点云渲染而非相机照片。\n- 修改 `content/benchmarks/mmlu-prox.json`：依据作者数据卡补足多语言选择题的输入、输出与运行条件，为英语 validation 样例加入乘积求导法则的具体解释。\n- 目的：将已有可追溯的数据变成可直接理解的画面和任务说明；原始训练/验证划分和许可边界保持可见。\n')
