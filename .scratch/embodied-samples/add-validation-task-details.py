import json
from pathlib import Path

root = Path('.')
def read(name):
    return json.loads((root / f'content/benchmarks/{name}.json').read_text(encoding='utf-8'))
def write(name, value):
    (root / f'content/benchmarks/{name}.json').write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

alfred = read('alfred')
row = json.loads((root / '.scratch/embodied-benchmarks/alfred-val/traj_data.json').read_text(encoding='utf-8'))
assert row['task_id'] == 'trial_T20190907_004321_405868'
assert row['pddl_params']['object_target'] == 'SoapBottle' and row['pddl_params']['parent_target'] == 'Toilet'
alfred['sampleSet']['samples'].insert(0, {
    'id': 'alfred-valid-unseen-soap-405868', 'title': '把洗手液瓶移到马桶上 · 未见场景验证集', 'type': 'record', 'promptOrigin': 'editorial',
    'prompt': '在浴室中拿起两只水池之间的洗手液瓶，再转向马桶，将瓶子放在马桶水箱后部。',
    'explanation': '从官方 Lite 包的 valid_unseen 目录解出这条专家轨迹；页面按其中一份语言标注整理步骤，并保留任务参数和场景编号。Lite 包不含此轨迹的视频或原始图像；这不是模型运行结果。',
    'raw': {'task_id': row['task_id'], 'task_type': row['task_type'], 'pddl_params': row['pddl_params'], 'scene': {'floor_plan': row['scene']['floor_plan'], 'scene_num': row['scene']['scene_num']}},
    'source': 'https://ai2-vision-alfred.s3-us-west-2.amazonaws.com/json_2.1.0.7z',
    'license': '数据包的独立转载许可尚未核实；仅展示任务参数与本站整理的步骤。',
    'split': 'valid_unseen / json_2.1.0 / trial_T20190907_004321_405868', 'excerpt': True
})
alfred['sampleAccess']['reason'] = '已从官方 Lite 轨迹包中分别核对训练集和未见场景验证集记录，展示任务参数及步骤解读。'
alfred['researchNotes'].append({'text': '从官方 Lite 包中提取 valid_unseen/pick_and_place_simple-SoapBottle-None-Toilet-424/trial_T20190907_004321_405868/traj_data.json，核对任务参数、场景及标注步骤；Lite 数据不包含原始图像。', 'sourceUrls': ['https://github.com/askforalfred/alfred/blob/master/data/README.md', 'https://ai2-vision-alfred.s3-us-west-2.amazonaws.com/json_2.1.0.7z']})
write('alfred', alfred)

locomo = read('locomo')
locomo['taskContract']['input'] = '跨多次会话的双人对话及时间信息；问答设置还会提供针对对话内容的问题。'
locomo['taskContract']['output'] = '按任务回答关于对话事实和时间的问题、总结说话人的重要事件，或生成后续多模态对话。'
locomo['taskContract']['environment'] = '官方问答脚本可使用截断的对话作为上下文；检索增强实验也可分别使用对话、观测或会话摘要作为检索库。具体配置须随成绩报告。'
locomo['taskContract']['sourceUrls'] = ['https://arxiv.org/abs/2402.17753','https://github.com/snap-research/locomo']
locomo['dataProfile']['files'][0] = '官方现行公开的 locomo10.json 包含 10 段对话；作者说明它是早期 50 段公开对话中筛选出的子集。数据提供图片网址、描述和检索词，但不发布图片文件。'
write('locomo',locomo)

ocr = read('ocrbench-v2')
ocr['officialDefinition']['summary'] = '双语视觉文字评测，考查模型识别、定位和理解图像中文字，并据此完成推理。'
ocr['taskContract']['input'] = '包含文字的图像和相应问题；场景包括街景、收据、公式及图表等。'
ocr['taskContract']['output'] = '根据题目返回识别文字、文字位置或利用图中文字推理得到的答案。'
ocr['taskContract']['environment'] = '按官方定义的任务类型及语言分别评分和汇总；公开数据与私有评测集应分别注明。'
write('ocrbench-v2',ocr)

with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 官方验证轨迹与任务说明补充\n\n- 修改 `content/benchmarks/alfred.json`：从已下载的官方 Lite 包核实 `valid_unseen` 轨迹，新增洗手液瓶放置任务、真实场景和参数。Lite 包不含图像，页面明确说明；新增案例不会被误认为模型成绩。\n- 修改 `content/benchmarks/locomo.json`：按作者仓库补足跨会话问答、事件总结、多模态生成及检索设置，纠正现行 10 段公开对话与原始 50 段的关系和图片开放范围。\n- 修改 `content/benchmarks/ocrbench-v2.json`：按作者资料补充题目输入、输出及街景、收据、公式、图表等场景，并提示公开/私有数据应分开报告。目的均为让读者具体理解评测任务，不改变评测或评分协议。\n')
