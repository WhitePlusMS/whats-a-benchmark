import json
import hashlib
from pathlib import Path

root=Path('.')
path=root/'content/benchmarks/robochallenge-table30-v2.json'
d=json.loads(path.read_text(encoding='utf-8'))
dataset='https://huggingface.co/datasets/RoboChallenge/Table30v2'
archive='https://huggingface.co/datasets/RoboChallenge/task_table30v2_press_the_button/blob/a6b1b95c0a9ddff34df3a0b308ae633e2959bc38/press_the_button.tar.part-0000'
for label,url in [('Table30 v2 官方数据集说明',dataset),('按按钮任务官方分卷固定版本',archive)]:
    d['sources'].append({'label':label,'url':url,'role':'data'})
d['dataProfile']['summary']='官方数据集说明列出 30 项操作任务、4 类机器人；各任务包含多条演示轨迹。'
d['dataProfile']['scale']=['30 项任务，4 类机器人；各任务包含多条真实机器人演示轨迹。']
d['dataProfile']['fields']=['任务描述、机器人状态、轨迹元数据和多视角相机视频。']
d['dataProfile']['files']=['按任务提供分卷归档，内部按 episode 保存状态、元数据和视频；公开说明未给出统一训练／验证划分。']
d['dataProfile']['sourceUrls']=[dataset]
d['dataAccess']['requirements']=['官方公开各任务演示分卷；实际下载、使用和再发布条件应分别核对。']
d['dataAccess']['sourceUrls']=[dataset]
d['sampleAccess']['reason']='展示官方任务说明和已核实的实机演示记录；站内中文为解读，视频因再发布许可未明确而未转载。'
d['sampleAccess']['sourceUrls'] += [dataset,archive]
d['researchNotes'].append({'text':'固定版本按按钮任务首个分卷以 HTTP Range 读取开头 16 MiB，核对任务描述、30 fps 视频元数据，并提取 episode_000188 全局相机视频检查画面；视频 SHA-256 '+hashlib.sha256((root/'.scratch/embodied-samples/realdata/press-188.mp4').read_bytes()).hexdigest()+'。仓库未明确视频再发布许可，站内不复制视频。','sourceUrls':[dataset,archive]})
d['sampleSet']['samples'].insert(0,{'id':'table30v2-press-button-episode188','title':'按顺序按按钮 · 实机演示 188','type':'record','promptOrigin':'editorial','prompt':'机器人依次按粉色、蓝色、绿色和黄色按钮。','explanation':'官方按按钮任务包中的 episode_000188 包含全局、侧面和机械臂相机视频。本站实际检查了全局相机画面，可见单臂机器人与四个按钮；这是一条演示记录，不能代表模型成绩或保证该次操作成功。视频再发布许可未明确，原始分卷可从来源获取。','raw':{'task_name':'press_the_button','episode':'episode_000188','robot':'ARX5','fps':30,'global_video':'press_the_button/data/episode_000188/videos/cam_global_rgb.mp4','side_video':'press_the_button/data/episode_000188/videos/cam_side_rgb.mp4','wrist_video':'press_the_button/data/episode_000188/videos/cam_arm_rgb.mp4'},'source':archive,'license':'官方数据包未明确视频再发布许可；这里只展示任务与轨迹文件信息。','split':'Table30 v2 官方实机演示；包内未确认 train、validation 或 test 划分。','excerpt':True})
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### Table30 v2 按按钮实机演示\n\n- 修改 `content/benchmarks/robochallenge-table30-v2.json`：读取官方分卷中的任务描述与 episode_000188 全局相机视频，补充按钮顺序、机器人型号、帧率、相机路径、具体数据来源和未知划分；数据概况同步说明 30 项任务及四类机器人。\n- 由于官方数据包未明确视频再发布许可，本次仅在临时目录核验画面，页面展示任务与文件信息和官方分卷入口，不把演示结果当作模型成绩。\n')
