import json
from pathlib import Path

root=Path('.')
changes={
 'codeactionbench':('操作任务、RGB 相机视图、相机标定及受限机器人接口。','智能体编写和运行控制代码，通过观察、几何估计和受限动作完成双臂操作；由物理结果验证器判断。'),
 'dexarena':('指定的阶段或长流程灵巧操作任务，以及对应仿真场景、相机观测和机器人状态。','控制机械手执行阶段技能或组合完整动作序列；按物理成功条件分别评估阶段、跨场景和完整任务。'),
 'ebim':('线缆布放、导热垫放置或辅助喂食任务中的双臂机器人观测和场景。','提交操作策略完成指定任务；项目安排仿真评测及后续跨地点真实机器人验证，需区分阶段。'),
 'embodied-playground':('任务目标、声明允许访问的相机图像和机器人状态；观察及工具权限由运行配置限定。','通过 describe、observe、step 和 finish 等接口组织控制与观察，满足任务规则和物理成功条件。'),
 'embodiedlab':('物理实验目标、实验装置与相机观测；实验实例的待测参数在开始时隐藏。','操纵机械臂、读取仪器并提交实验结果；同时核对测量误差、轨迹证据和最终台面状态。'),
 'libero-max':('原始 LIBERO 任务与机器人观测；运行中会发生目标位置、相机、光照或障碍物等变化。','控制策略在变化后继续执行并争取完成任务；与相同初始设置及前缀的无变化对照进行比较。')
}
for name,(inp,out) in changes.items():
    p=root/f'content/benchmarks/{name}.json';d=json.loads(p.read_text(encoding='utf-8'))
    d['taskContract']['input']=inp;d['taskContract']['output']=out
    if name=='dexarena':
        base='https://huggingface.co/datasets/SIPAIR/DexArena'
        info=base+'/blob/f949677d5a51436813fab4f77c57772f44bf1226/data/sharpa/CabinetPouringOpenCabinet-Sharpa-v1/meta/info.json'
        d['sources'] += [{'label':'官方轨迹数据集与申请入口','url':base,'role':'data'},{'label':'固定版本轨迹元数据（受控访问）','url':info,'role':'data'}]
        d['dataAccess']['requirements']=['项目网站与代码公开；Hugging Face 官方轨迹数据需登录并获得访问权限。']
        d['dataAccess']['url']=base;d['dataAccess']['sourceUrls'] += [base,info]
        d['dataProfile']['files']=['官方数据集说明包含各阶段遥操作轨迹、状态及多视角视频；具体文件访问受控。']
        d['dataProfile']['sourceUrls'].append(base)
        d['researchNotes'].append({'text':'2026-11-05 核对官方数据集固定版本 f949677d5a51436813fab4f77c57772f44bf1226，数据集为受控访问；匿名请求具体 info.json 返回 HTTP 401，未取得该轨迹文件。','sourceUrls':[base,info]})
        for s in d['sampleSet']['samples']:
            s['license']=s['license'].replace('本站原样转载并标明来源','本站展示缩短后的片段并标明来源')
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 六项具身评测的交互流程及 DexArena 数据入口\n\n- 修改 `codeactionbench.json`、`dexarena.json`、`ebim.json`、`embodied-playground.json`、`embodiedlab.json` 和 `libero-max.json`：依据各自官方页面，将通用输入输出替换为实际观测、动作及评估流程。\n- DexArena 官方数据集元数据请求返回 401，页面补充受控访问与固定版本入口；修正网站演示视频为经过缩短的片段，避免误称原样转载。未将未取得的轨迹宣称为已核验。\n')
