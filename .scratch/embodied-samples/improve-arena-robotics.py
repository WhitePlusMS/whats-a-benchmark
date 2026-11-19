import json
from pathlib import Path

root=Path('.')
def read(name):
    path=root/f'content/benchmarks/{name}.json'
    return path,json.loads(path.read_text(encoding='utf-8'))
def save(path,value):
    path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

path,d=read('aa-robotics')
d['taskContract']['input']='桌面任务目标、简要机械臂接口说明，以及三路桌面相机和一路腕部相机的画面。'
d['taskContract']['output']='在隔离容器中编写并运行代码，通过 HTTP 接口控制真实机械臂；完成后提交任务供人工按目标条件评分。'
d['taskContract']['environment']='真实 Hiwonder NexArm；作者研究预览的各次任务为零样本，任务结束状态按通过条件或部分进展计分。'
d['sampleSet']['samples'].append({'id':'aa-robotics-press-button-gpt6-astra','title':'红色按钮 · 一次公开评测结果','type':'record','promptOrigin':'editorial','prompt':'控制夹爪按下红色按钮，使按钮闪亮。','explanation':'官方结果表记录 GPT-6 Astra 在这项任务得 100 分；这是该模型在单一任务上的公开结果，不代表其他任务的成绩。官方页面提供该任务的可切换模型及相机视角录像。','raw':{'task':'Press the red button','model':'GPT-6 Astra','score':100,'maximum_score':100},'source':'https://artificialanalysis.ai/articles/aa-robotics/','license':'结果和任务条件依据官方公开表格整理；视频留在官方页面观看。','split':'AA-Robotics v0.1 官方实机评测结果；非训练数据。','excerpt':True})
save(path,d)

path,d=read('roboarena')
d['taskContract']['input']='评估者自选真实场景和语言任务；中心服务为同一任务抽取两种待比较策略，策略接收机器人观测。'
d['taskContract']['output']='两种策略依次控制机器人执行同一任务；评估者记录每个策略的进展分、两者偏好和文字反馈。'
d['taskContract']['environment']='分布式真实机器人双盲比较；单次成对实验维持可比场景，不同评估场次的场景和任务可以不同。'
d['sampleAccess']['reason']='展示论文任务例子及官方数据快照中的一次真实评测录像和结果字段；单条记录不代表整套评测成绩。'
save(path,d)
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### AA-Robotics 与 RoboArena 具体评测流程\n\n- 修改 `content/benchmarks/aa-robotics.json`：依据官方文章补足相机输入、容器代码与 HTTP 控制、零样本及评分流程；新增官方结果表中 GPT-6 Astra 按按钮单项 100 分的记录，并明确其不是整体成绩。\n- 修改 `content/benchmarks/roboarena.json`：依据论文补足真实场景中的策略配对、顺序执行和评估者反馈，更新已有视频样例的获取说明。\n- 原因：替换通用模板，使读者理解实际任务和结果范围；不转载未核实许可的视频。\n')
