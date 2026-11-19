import json
from pathlib import Path

root=Path('.')
changes={
 'frontiercode-1-1-extended':('源自开源项目真实 PR 的代码仓库状态和维护者提出的开发任务。','修改代码以满足功能和质量要求；未满足阻断性标准时该次结果记零。','1.1 允许合理查阅文档，但禁止检索可直接揭示任务解法的上游补丁；比较时区分 Main 与 Extended。'),
 'kora-v2':('按风险类别和年龄组构造的模拟儿童情境及多轮对话。','被测聊天模型逐轮回复；评估流程再按风险机制和对应标准判断对话表现。','使用 V2 的 2.2.0 场景与评测流程；场景和对话为模拟，评审模型与配置应随结果记录。'),
 'posttrainbench-1-2':('基础语言模型、后训练目标及指定算力和时间预算。','智能体编写并运行后训练流程，提交训练后的模型权重，由评测系统计算下游分数。','官方设置提供四个小型基础模型、单张 H100 和 10 小时预算；v1.2 对最终模型使用多随机种子评估。'),
 'voice-code-bench':('英语工作场景的人声录音，包含电话号码、网址、文件路径或命令等结构化实体。','语音识别系统生成转写；评测程序检查能否从转写中恢复目标实体，并计算 CTEM、TSR 与 WER。','主设置只向系统提供音频，不提供目标实体列表、领域标签、自定义词表或额外纠错。')
}
for name,(inp,out,env) in changes.items():
    p=root/f'content/benchmarks/{name}.json';d=json.loads(p.read_text(encoding='utf-8'))
    d['taskContract']['input']=inp;d['taskContract']['output']=out;d['taskContract']['environment']=env
    if name=='posttrainbench-1-2':
        url='https://posttrainbench.com/'
        d['sources'].append({'label':'官方基础模型与算力设置','url':url,'role':'definition'});d['taskContract']['sourceUrls'].append(url)
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 四项模型评测的输入输出与运行条件\n\n- 修改 `content/benchmarks/frontiercode-1-1-extended.json`：说明真实 PR 来源、代码质量阻断规则与 1.1 公平联网要求。\n- 修改 `kora-v2.json`：说明模拟儿童情境、多轮回复及风险机制评估，保留 V2 版本与受控数据边界。\n- 修改 `posttrainbench-1-2.json`：依据官网补充四个基础模型、单卡 H100、十小时预算及 v1.2 多随机种子评估。\n- 修改 `voice-code-bench.json`：说明纯音频输入、转写输出和由评测程序计算的实体恢复指标。\n- 目的：替换泛化运行提示；这些说明不代表本站复跑评测。\n')
