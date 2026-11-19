import json
from pathlib import Path

root=Path('.')
path=root/'content/benchmarks/draco.json'
d=json.loads(path.read_text(encoding='utf-8'))
d['taskContract']['input']='跨领域的开放式研究请求，可能包含时间范围、比较对象、资料来源或成品格式要求。'
d['taskContract']['output']='综合相关资料形成研究回答；每条任务配有专门的评分标准，评分标准不是模型必须逐字输出的答案。'
d['taskContract']['environment']='论文以事实准确性、分析广度与深度、表达质量、引用质量四方面评分；工具、检索范围和评分配置应随结果报告。'
d['taskContract']['sourceUrls']=['https://arxiv.org/abs/2602.11685','https://huggingface.co/datasets/perplexity-ai/draco']
d['dataProfile']['fields']=['id','domain','problem','answer（JSON 编码的任务评分标准）']
d['sampleSet']['samples'][0]['title']='学术研究 · 比较多期双重差分方法'
d['sampleSet']['samples'][0]['explanation']='这道题要求比较多期双重差分方法如何处理处理效应异质性和不同实施时间，并分析平行趋势、提前反应等假设；还要求调查 2020–2024 年劳动与健康经济学论文的方法采用情况及预趋势检验问题。数据中的 answer 是评分细则而非单一标准答案，本页未展开。'
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### DRACO 深度研究任务说明\n\n- 修改 `content/benchmarks/draco.json`：根据作者论文及数据卡补充研究请求的输入、回答形式和四类评分维度，补全数据字段中 domain 与评分标准字段；把既有测试题说明改成具体的多期双重差分比较要求。\n- 保留原始英文问题和 test 划分，不把评分细则当作统一参考答案，也不声称本站完成了题目研究。\n')
