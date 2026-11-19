import hashlib
import json
import shutil
from pathlib import Path

root=Path('.')
path=root/'content/benchmarks/fleurs.json'
d=json.loads(path.read_text(encoding='utf-8'))
archive='https://huggingface.co/datasets/google/fleurs/blob/70bb2e84b976b7e960aa89f1c648e09c59f894dd/data/en_us/audio/test.tar.gz'
d['sources'].append({'label':'英语测试录音归档（固定版本）','url':archive,'role':'data'})
d['sampleAccess']['reason']='已核对作者英语测试集中的转写和同名录音，本站提供录音及参考转写。'
d['sampleAccess']['sourceUrls'].append(archive)
s=d['sampleSet']['samples'][0]
s['prompt']='听取英语测试集中的朗读录音，将听到的内容转写成文字。'
s['explanation']='记录 1980 对应一段讨论交通流研究的英语朗读。识别系统需要根据录音生成文字，再与规范化参考转写比较。音频来自同名测试文件，并转换为 16 位 PCM 以便浏览器播放。'
s['assets']=[{'kind':'audio','path':'audio/fleurs-en-us-test-1980.wav','caption':'英语测试集录音 1980 · 12.64 秒','transcript':'Unfortunately, studying traffic flow is difficult because driver behavior cannot be predicted with one-hundred percent certainty.','source':archive}]
src=root/'.scratch/embodied-samples/realdata/fleurs-sample-pcm.wav'
target=root/'content/assets/audio/fleurs-en-us-test-1980.wav'
target.parent.mkdir(parents=True,exist_ok=True)
shutil.copyfile(src,target)
d['researchNotes'].append({'text':'从固定版本 en_us/audio/test.tar.gz 中提取 test/12741024238657315067.wav；原文件 SHA-256 3e76cc5728bfd7c24f1039b5c9a47e8d79c7f225605862e977833a4f79249bff，202240 采样点、16 kHz、12.64 秒；本站转换为 16 位 PCM。','sourceUrls':[archive]})
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
with (root/'UPDATE_LOG.md').open('a',encoding='utf-8') as out:
    out.write('\n### FLEURS 英语测试录音\n\n- 修改 `content/benchmarks/fleurs.json`：核对 en_us/test 中记录 1980 的文件名、原始转写和录音，补充固定版本归档来源、12.64 秒时长与转码说明。\n- 添加 `content/assets/audio/fleurs-en-us-test-1980.wav`：从官方测试归档提取同名录音并转为 16 位 PCM，供站内播放；保留 CC BY 4.0 归属及参考转写。该样本为测试数据，不代表模型运行结果。\n')
