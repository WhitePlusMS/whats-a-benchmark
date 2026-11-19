import json
from pathlib import Path

root=Path('.')
changes={
 'habitat-3':('家庭仿真场景中的协作任务、机器人观测和人体虚拟角色；人类可通过键鼠或 VR 参与。','依任务寻找并跟随人物且保持距离，或与人物协作移动物体到目标位置。'),
 'maniskill3':('指定仿真任务和所选观测模式，例如状态、RGB-D 或点云；具体模式由运行配置确定。','输出机器人控制动作，在仿真中完成抓取、放置或插销等任务；按该环境成功条件评估。'),
 'robochallenge':('所选挑战的操作任务、真实机器人和相机观测；模型接口及设备按挑战版本确定。','控制机器人执行任务并由平台记录任务得分或成功情况；不同实机和仿真赛道须分别比较。'),
 'roboeval-bimanual-challenge':('八类任务的位置与朝向组合变体、任务指令、机器人本体状态和策略声明使用的相机画面。','提交策略控制双臂执行任务；按结果、安全稳定、效率和双臂协调四类指标计算诊断分。')
}
for name,(inp,out) in changes.items():
    p=root/f'content/benchmarks/{name}.json';d=json.loads(p.read_text(encoding='utf-8'))
    d['taskContract']['input']=inp;d['taskContract']['output']=out
    if name=='maniskill3':
        url='https://maniskill.readthedocs.io/en/latest/user_guide/concepts/observation.html'
        d['sources'].append({'label':'官方观测模式文档','url':url,'role':'readme'});d['taskContract']['sourceUrls'].append(url)
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 具身评测通用任务模板补全\n\n- 修改 `content/benchmarks/habitat-3.json`、`maniskill3.json`、`robochallenge.json` 与 `roboeval-bimanual-challenge.json`：核对官方页面及 ManiSkill 观测文档，补充人机协作、仿真观测模式、实机挑战和双臂诊断各自的输入与输出。\n- 保留各项目现有示例及来源边界，不将网站演示改称数据集测试成绩。\n')
