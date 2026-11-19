import json
from pathlib import Path

root=Path('.')
def load(name):
    path=root/f'content/benchmarks/{name}.json'
    return path,json.loads(path.read_text(encoding='utf-8'))
def save(path,data):
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

path,d=load('global-mmlu')
d['officialDefinition']['summary']='将 MMLU 选择题扩展到多种语言，并为部分问题加入文化敏感性标注，用于分析跨语言知识评测表现。'
d['taskContract']['input']='指定语言的学科问题与四个候选答案；部分记录还附文化敏感性、地区等标注。'
d['taskContract']['output']='针对每道题选择一个答案选项；按语言、学科或文化敏感性分组分析时须说明使用的子集。'
d['taskContract']['environment']='作者数据提供不同语言及 dev、test 等划分；语言版本的翻译和后编辑情况不同，应随成绩注明配置。'
d['sampleSet']['samples'][0]['explanation']='题目要求判断模 3 的多项式商环何时构成域。二次多项式在 Z₃ 上不可约时商环为域；c=1 时 x²+1 在 0、1、2 均无根，因此选 B。c=0 或 2 时多项式有根。'
d['sampleSet']['samples'][0]['split']='en / dev / abstract_algebra/dev/0'
save(path,d)

path,d=load('hle-diamond')
d['officialDefinition']['summary']='从 Humanity’s Last Exam 整理出的专家级问题子集，分别衡量推理与专业知识。'
d['taskContract']['input']='跨学科专家级问题，部分题目包含图像；数据另标记推理或知识分区。'
d['taskContract']['output']='针对问题给出答案，答案类型依题目而定；按准确率统计，并可分别报告推理与知识两部分。'
d['taskContract']['environment']='作者发布的主要比较采用不使用工具的设置；其他运行方式应明确报告，避免混比。数据访问需要申请。'
save(path,d)

with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 模型评测任务说明补充\n\n- 修改 `content/benchmarks/global-mmlu.json`：按照作者数据卡补足多语言选择题输入、输出及分组条件，将抽象代数验证样例的通用占位解释替换为具体解题依据，并明确英语 dev 划分。\n- 修改 `content/benchmarks/hle-diamond.json`：依据作者公开说明，补足专家级题目、推理和知识分区、回答形式及官方主要比较不使用工具的条件；受控题目未转载。\n- 目的：让读者理解评测具体要求及样例考点，同时避免把某一运行条件推广为所有可能配置。\n')
