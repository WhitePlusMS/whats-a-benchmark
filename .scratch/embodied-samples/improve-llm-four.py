import json
from pathlib import Path

root=Path('.')
changes={
 'milu':('指定印度语言的一道多项选择题及候选选项，涵盖一般知识和印度文化相关学科。','选择与题目相符的答案选项，按语言与学科汇总准确率。','作者将 test 用于评测，validation 可提供少样本示例；数据文件需登录并接受访问条件。'),
 'ocr-reasoning':('包含文字或图表的图像及相关问题，需要结合文字内容与视觉布局。','给出问题答案及推理过程；题目覆盖空间、数值、数学、枚举、逻辑与跨学科知识等推理。','作者提供集成 VLMEvalKit 的评测脚本；运行时需取得图片和标注，记录模型及评分配置。'),
 'wmt24pp':('英语源文本及指定目标语言或地区语言配置；来源覆盖新闻、社交、演讲和文学等领域。','生成目标语言译文，并与人工后编辑参考译文或无参考指标比较。','按语言对分别评估；作者建议排除 is_bad_source=true 的记录，参考译文默认使用 target。'),
 'video-mme-v2':('视频采样帧及同一视频的关联选择题；字幕设置下还提供字幕文本。','对各问题选择答案；默认提示要求输出选项字母，推理设置另要求给出推理与最终选项。','作者分别提供有字幕、无字幕和推理设置；比较时记录视频采样方式、提示词和题组评分协议。')
}
for name,(inp,out,env) in changes.items():
    p=root/f'content/benchmarks/{name}.json';d=json.loads(p.read_text(encoding='utf-8'))
    d['taskContract']['input']=inp;d['taskContract']['output']=out;d['taskContract']['environment']=env
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### 四项模型评测任务协议\n\n- 修改 `content/benchmarks/milu.json`：根据作者数据卡说明多语言选择题、test 与 validation 用途及受控访问条件。\n- 修改 `ocr-reasoning.json`：补充富文本图像、答案与推理评测以及作者 VLMEvalKit 运行方式；原图的独立权利限制不变。\n- 修改 `wmt24pp.json`：说明英译目标语言、后编辑参考译文和低质量源句过滤。\n- 修改 `video-mme-v2.json`：说明视频帧、字幕、关联选择题及有无字幕和推理设置；未转载受限题目或视频。\n- 目的：替换笼统运行提示，让读者了解各项评测的实际任务和比较条件。\n')
