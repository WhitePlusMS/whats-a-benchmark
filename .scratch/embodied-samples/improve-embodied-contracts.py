import json
from pathlib import Path

root=Path('.')
changes={
 'gm-100':('指定的真实机器人操作任务及多相机观测；可使用项目提供的专家遥操作演示训练策略。','控制对应机械臂完成任务，例如搬运试管、击球或切割；按具体任务的条件评估。'),
 'roboeval':('双臂仿真操作任务和相应机器人观测，任务包含举托盘、装箱、旋转阀门等变体。','控制双臂完成任务；除成功与否外，还可根据任务阶段检查对齐、抓取和双臂协同等行为。'),
 'roboquest':('移动操作任务指令与相机观测；目标位置、容器打开方式等关键信息可能在初始时隐藏。','通过移动、搜索、检查和物体操作收集所需信息并完成任务，最后使用 SUBMIT 结束该次尝试。'),
 'robochallenge-table30-v2':('实机任务目标与对应机器人和相机观测；任务依设备使用单臂或双臂。','控制机器人完成指定操作，例如按颜色顺序按按钮、涂抹果酱或整理物品，并按对应任务条件评分。')
}
for name,(input_text,output_text) in changes.items():
    path=root/f'content/benchmarks/{name}.json'
    d=json.loads(path.read_text(encoding='utf-8'))
    d['taskContract']['input']=input_text
    d['taskContract']['output']=output_text
    if name=='robochallenge-table30-v2': d['taskContract']['sourceUrls'].append('https://huggingface.co/datasets/RoboChallenge/Table30v2')
    path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 四项具身评测的任务输入与输出\n\n- 修改 `content/benchmarks/gm-100.json`、`roboeval.json`、`roboquest.json` 和 `robochallenge-table30-v2.json`：依据各项目官方任务页面和数据说明，将统一的占位输入输出改成各自的机器人观测、操作目标和任务反馈。\n- 分别说明真实机器人演示、双臂仿真诊断、隐藏信息搜索和单臂／双臂实机任务；新增内容不改变训练集、验证集或实机成绩的既有划分。\n')
