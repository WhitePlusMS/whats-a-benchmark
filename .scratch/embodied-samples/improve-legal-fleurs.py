import json
from pathlib import Path

root=Path('.')
def load(name):
    path=root/f'content/benchmarks/{name}.json'
    return path,json.loads(path.read_text(encoding='utf-8'))
def save(path,value):
    path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

path,d=load('legalbench')
d['taskContract']['input']='依子任务提供法律材料和问题，例如证据情景、法条文本或关于法律规则的问题。'
d['taskContract']['output']='按子任务回答：例如判断证据是否属于传闻、法条是否包含私人诉权，或回答规则问题。'
d['taskContract']['environment']='各任务有独立输入输出格式及评估方法；比较结果需注明任务子集、提示词和评分脚本。'
d['taskContract']['sourceUrls']=['https://arxiv.org/abs/2308.11462','https://hazyresearch.stanford.edu/legalbench/']
save(path,d)

path,d=load('fleurs')
d['taskContract']['input']='指定语言的朗读语音录音；语音识别设置使用录音作为输入，参考转写用于评分。'
d['taskContract']['output']='将听到的语音转为文字；数据也可用于语言识别等任务，任务和指标应分别标明。'
d['taskContract']['environment']='按语言选择训练、验证或测试划分；报告语音识别结果时注明语言、文本规范化方式及词或字符错误率。'
s=d['sampleSet']['samples'][0]
s['prompt']='将英语测试集中的这段朗读录音转写成文字；录音未在本站提供，参考转写和文件名可在原始数据节选中查看。'
s['explanation']='记录 1980 对应一段讨论交通流研究的英语朗读。自动语音识别需要根据录音生成文字，再与规范化参考转写比较；本站目前仅展示转写记录，无法在本页收听原始语音。'
s['split']='en_us / test / id 1980'
save(path,d)
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### LegalBench 与 FLEURS 的具体任务\n\n- 修改 `content/benchmarks/legalbench.json`：参照官方任务目录，补充证据传闻判断、法条私人诉权及法律规则问答等输入输出示例，并注明子任务和评分差异。\n- 修改 `content/benchmarks/fleurs.json`：说明语音录音是识别输入、转写是参考答案，注明按语言与划分比较，并为现有英语测试记录补充任务说明和具体划分；当前样例未提供音频。\n- 目的：避免仅显示泛化的输入输出，让读者知道模型实际接收什么、应完成什么。\n')
