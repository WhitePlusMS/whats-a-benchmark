import json
import shutil
from pathlib import Path

root=Path('.')
path=root/'content/benchmarks/behavior-1k.json'
d=json.loads(path.read_text(encoding='utf-8'))
base='https://huggingface.co/datasets/behavior-1k/2026-challenge-demos/blob/4f50b44796641a4d526a19d9aeadc8aa51e2f2c2'
video=base+'/videos/observation.rgb.zed_link_camera_0/chunk-000/file-000.mp4'
episodes=base+'/meta/episodes/chunk-000/file-000.parquet'
info=base+'/meta/info.json'
for label,url in [('官方头部相机视频分片',video),('官方轨迹元数据',episodes),('官方数据划分与帧率',info)]: d['sources'].append({'label':label,'url':url,'role':'data'})
d['sampleAccess']['reason']='已核对官方技能标注，以及同任务的独立训练轨迹及其头部相机画面；两者的对应关系尚未确认。'
d['sampleAccess']['sourceUrls'] += [video,episodes,info]
d['reusePolicy']['scope']='本站展示官方演示集中的技能标注节选，以及从同任务视频分片提取的三帧画面，并保留来源和许可。'
d['reusePolicy']['boundaries']=['场景和对象模型可能有独立协议；本站展示的是演示数据集中的视频帧，不代表已获得场景资产的再发布权。','视频元数据中的 episode 10 与现有技能标注文件名相同，但时长不同；两者对应关系尚未确认。']
assets=[]
for sec in (760,800,840):
    file=f'behavior-2026-radio-episode10-{sec}.png'
    shutil.copyfile(root/f'.scratch/embodied-samples/realdata/behavior-episode10-{sec}.png',root/f'content/assets/images/{file}')
    assets.append({'kind':'image','path':f'images/{file}','alt':f'打开收音机演示头部相机在源分片 {sec} 秒处的画面','width':720,'height':720,'caption':f'头部相机 · 源视频分片 {sec} 秒','source':video})
d['sampleSet']['samples'].insert(0,{'id':'behavior-2026-radio-video-episode10','title':'打开收音机 · 训练演示画面','type':'record','promptOrigin':'editorial','prompt':'在家庭仿真环境中操作桌上的收音机。','explanation':'官方 LeRobot 元数据将这条 turning_on_radio 轨迹标为 episode 10，共 2769 帧、30 Hz；三幅画面从其头部相机分片的对应时间范围提取。这是人类遥操作训练示范，不是模型评测结果。另一个技能标注文件的时长不同，尚不能确认与本视频逐帧对应。','raw':{'task':'turning_on_radio','episode_index':10,'length':2769,'fps':30,'video_camera':'observation.rgb.zed_link_camera_0','chunk_index':0,'file_index':0,'video_from_timestamp':754.8333333333333,'video_to_timestamp':847.1333333333332,'extracted_video_timestamps':[760,800,840]},'source':episodes,'license':'BEHAVIOR-1K 2026 Challenge Demos 官方数据卡标注 MIT；本站保留来源及许可证。','licensePath':'licenses/behavior-2026-demos-mit.txt','split':'train / task-0000 / episode_index 10；人类遥操作演示。','excerpt':True,'assets':assets})
d['researchNotes'].append({'text':'固定版本中 info.json 标注 train；meta/episodes 的 episode 10 记录 task=turning_on_radio、2769 帧及头部视频分片时间 754.833–847.133 秒。已取得该分片并提取 760、800、840 秒帧；annotations/task-0000/episode_00000010.json 标注持续 1776 帧，尚未确认与视频索引是否逐帧对应。','sourceUrls':[info,episodes,video]})
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### BEHAVIOR-1K 收音机训练轨迹画面\n\n- 修改 `content/benchmarks/behavior-1k.json`：核对官方 LeRobot 轨迹元数据、train 划分及头部相机时间索引，为 turning_on_radio 的 episode 10 增加独立视觉样例。\n- 新增 `content/assets/images/behavior-2026-radio-episode10-{760,800,840}.png`：从固定版本视频分片的对应时间提取，三帧均已查看；保留数据集 MIT 许可和具体来源。\n- 技能标注文件的 1776 帧与视频索引的 2769 帧不一致，现有证据不能证明二者逐帧对应，故页面明确分开展示并保留差异；不是模型评测成绩。\n')
