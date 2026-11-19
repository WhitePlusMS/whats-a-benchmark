import json,subprocess,shutil
from pathlib import Path
import yaml
P=Path('content/benchmarks')
# 每个条目只摘录官方任务名；中文解释区分任务目标与执行结果。
specs={
'dexarena':('OpenLaptop','笔记本电脑最初打开约 40°–50°；机械手将屏幕打开至至少 90°，随后保持至少 85°，连续满足 4 次检查。','论文给出的是单阶段成功条件，不代表某个策略已经完成。','https://arxiv.org/html/2611.02629'),
'embodied-playground':('P5','让 Panda 机械臂将挂钩穿过杯柄，松手后杯子稳定悬挂。','该仿真任务考察路径、姿态和释放后的稳定性。','https://arxiv.org/html/2610.27039'),
'aa-robotics':('Tidy the blocks into the box','将四块积木全部放入盒子，盖回盒盖；通过条件是积木均在盒内且盒盖平整盖好。','官方列出具体目标和通过条件，属于真实机器人评测任务。','https://artificialanalysis.ai/articles/aa-robotics/'),
'libero-max':('Camera shift','机器人执行操作时，摄像机视角发生变化；继续完成原本的操作目标。','该扰动用于考察运行中的视角变化，具体物体与目标由所选基础任务决定。','https://liberomax.github.io/'),
'codeactionbench':('blocks_ranking_size','用机器人操作代码把三块不同大小的积木从左到右按由大到小排列。','考察代码控制、物体大小判断与最终排列；颜色和初始位置可能变化。','https://arxiv.org/html/2609.33807'),
'robodojo':('Sweep Blocks','机器人先拿起扫帚并交到右手，左手抓住簸箕，再把积木扫进簸箕。','官方仿真任务将双手交接、工具使用和收集组合在一起。','https://robodojo-benchmark.com/doc/sim-tasks/sweep-blocks/'),
'rle-bench':('DefrostByCategory','把土豆和玉米放进台面上的碗，再把橙子和香蕉放入水槽，在流动水下为水果解冻。','这是官方 T01 演示的具体目标；页面另有机器人视频，任务说明本身不代表一定成功。','https://rle-bench.github.io/blog/'),
'embodiedx':('Track 1A: π0.5-LIBERO','使用 LIBERO 轨迹中的两路 224×224 图像，运行指定的 π0.5 策略；闭环动作推理 p99 不超过 250 毫秒，且须通过输出相似度门槛。','这是推理效率赛道的公开测试配置，不是抓取任务的成功率样例；具体精度和分组条件以赛规为准。','https://efficient-embodied-ai.github.io/challenge/'),
'roboeval':('Stack Two Cubes','双臂操作场景中把两个方块堆叠起来，并在不同位置或姿态配置下评估表现。','官方挑战赛任务清单中的操作例子；不同变体有不同配置，本例不虚构距离阈值。','https://robo-eval.github.io/challenge.html'),
'roboeval-bimanual-challenge':('Rotate Valve','使用双臂完成旋转阀门任务，挑战赛通过位置与姿态等组合变化考察策略的适应能力。','这是挑战赛公开的任务类别；具体变体与判定以官方配置为准。','https://robo-eval.github.io/challenge.html'),
'maniskill3':('PegInsertionSide-v1','从侧面把横放的插销插入盒子孔中。插销和盒子的桌面位置及朝向会随机变化；插销白色端距离盒中心小于 0.015 米是成功条件之一。','这是官方文档中的仿真任务及判定条件；完整条件与随机化细节见原文。','https://maniskill.readthedocs.io/en/v3.0.0b20/tasks/table_top_gripper/'),
'habitat-3':('Social Rearrangement','机器人与虚拟人物共同在室内完成物品整理，需要在移动和操作时考虑另一位参与者。','这是官方提出的人机协作整理场景，不是某一条实机轨迹。','https://aihabitat.org/habitat3/'),
'ebim':('Thermal Pad Placement','在电子设备装配场景中放置导热垫，考察机械臂针对柔性材料的操作。','这是官方 FAQ 列出的任务类别；具体物体布局与判定细则请查看对应赛道。','https://ebim-benchmark.github.io/faq.html'),
'roboarena':('Put the yellow ducks in mug','真实实验场景中的指令：把黄色小鸭放进杯子。评估者可比较两个机器人策略在同一任务上的表现。','论文将这一指令列为低光照场景的例子；该文本不代表任一策略的成功结果。','https://arxiv.org/html/2506.18123'),
'robochallenge':('Stamp on paper','使用印章在纸上盖印，要求机器人完成工具抓取、对准和接触操作。','这是 Table30 V2 技术报告列出的真实任务名称；具体评分和版本以官方报告为准。','https://robochallenge.ai/robochallenge_techreport_V2.pdf'),
'robochallenge-table30-v2':('Spread jam','使用工具完成涂抹果酱任务；任务关注机器人对工具和食物的操作。','任务名称来自 Table30 V2 官方技术报告；不推断官方未在此摘录中说明的通过阈值。','https://robochallenge.ai/robochallenge_techreport_V2.pdf'),
'gm-100':('Transferring Test Tubes','转移试管：机器人需要操作试管并完成转移目标。','这是官方 GM-100 结果页面列出的任务名称；具体布置和评分请查看该任务页面。','https://www.rhos.ai/research/gm-100/results/'),
'roboquest':('Puzzle Box','打开被一串滑动插销锁住的木盒，把里面的橘子取出并竖放在托盘中，松开物体后按红色 SUBMIT。','插销之间存在先后阻挡关系，需要尝试并观察；首次提交即结束，提交错误或不提交都失败。','https://arxiv.org/html/2610.10388'),
'robotarena-infinity':('Put the stuffed dog in the pot','将毛绒小狗放入锅中；官方展示由真实视频转换得到的对应仿真场景。','这里描述官网公开示例及场景转换，不代表某次模型执行成功。','https://robotarenainf.github.io/'),
'humanoidbench':('basketball','人形机器人在仿真环境中完成接球与投篮等篮球操作。','官方论文将篮球列为全身操作示例，涉及移动、平衡和手部动作；具体奖励由环境定义。','https://www.roboticsproceedings.org/rss20/p061.pdf'),
'bigym':('dishwasher_load_plates','将盘子放入洗碗机下层托盘，并松开盘子。','该任务要求盘子接触下层托盘，体现移动、双手操作与家电交互。','https://arxiv.org/html/2407.07788'),
'bigym-2':('dishwasher load cups','在洗碗机场景中装入杯子；该任务与打开抽屉、搬动盘子等并列出现在官方任务结果表中。','这里仅说明任务目标；BiGym 2.0 的完整判定请以其版本配置为准。','https://bigym2.github.io/'),
'colosseum':('slide_block_to_target','把方块滑到目标位置；可在不同光照、桌面纹理、干扰物和方块尺寸条件下比较表现。','论文用该任务研究单项和组合扰动对机器人泛化的影响。','https://arxiv.org/html/2402.08191'),
'manipulationnet':('Peg-in-Hole Assembly','将不同形状的销钉插入透明亚克力板的对应孔中；官方设置了 3、1、0.1 和 0.02 毫米四档配合间隙。','这是实物精密装配任务，难点包括透明物体感知、几何对准和接触控制。','https://arxiv.org/html/2603.04363'),
}
for ident,(title,prompt,explanation,url) in specs.items():
 path=P/(ident+'.json'); d=json.loads(path.read_text(encoding='utf-8'))
 sample={'id':ident+'-concrete-task','title':title,'type':'record','promptOrigin':'editorial','prompt':prompt,'explanation':explanation,'raw':title,'source':url,'license':'原始任务名称来自官方资料；中文说明依据原资料整理。','split':'官方公开任务示例；不推断训练或测试划分。','excerpt':True}
 if not any(x['url']==url and x['role']=='data' for x in d['sources']): d['sources'].append({'label':'官方样例与任务细则','url':url,'role':'data'})
 sa=d['sampleAccess']; sa['status']='local'; sa['reason']='展示根据官方任务配置或论文整理的真实案例；中文为本站解读，任务说明不代表运行结果。'; sa.setdefault('sourceUrls',[])
 if url not in sa['sourceUrls']: sa['sourceUrls'].append(url)
 ss=d.setdefault('sampleSet',{'retrievedAt':'2026-11-05','samples':[]}); ss['retrievedAt']='2026-11-05'; ss['samples']=[s for s in ss['samples'] if s['id']!=sample['id']]; ss['samples'].append(sample)
 path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
# REAL-Bench 官方 YAML 中选取原字段，保留实际任务配置而非伪造运行记录。
path=P/'real-bench.json';d=json.loads(path.read_text(encoding='utf-8')); samples=[]
sha='9c362043786af2d609fbaa5b680b27a00463e07b'
for family,num,title,prompt in [('FDP',1,'寻找并搬运浅蓝色泰迪熊','去电视前的沙发找到浅蓝色绒毛泰迪熊，将它送到长方形桌子；场景中还有另一张桌子和其他玩具熊。'),('FDO',100,'寻找零食并放入洗衣机','前往灰黑色床寻找零食，将它放进洗衣机并关门；配置中还存在另一张床作为干扰。')]:
 f=f'benchmark/tasks/{family}/verify_task_{num}.yaml'; text=subprocess.check_output(['git','-C','.scratch/embodied-samples/real','show',f'HEAD:{f}'],text=True,encoding='utf-8'); ep=yaml.safe_load(text)['episodes'][0]
 raw={k:ep[k] for k in ['task_id','episode_idx','task_description','src','src_distractors','dest','dest_distractors','execution_plan'] if k in ep}
 url=f'https://github.com/InternRobotics/REAL/blob/{sha}/{f}'
 samples.append({'id':f'real-bench-{family.lower()}-{num}','title':title,'type':'record','promptOrigin':'editorial','prompt':prompt,'explanation':'原始字段摘自官方 YAML：src 和 dest 是任务起点和目标，execution_plan 是配置内的计划，不是机器人实际运行记录。','raw':raw,'source':url,'license':'MIT License，Copyright (c) 2026 REAL Contributors；场景和模型资产另行适用各自许可。','licensePath':'licenses/real-bench-mit.txt','split':'官方公开任务配置，未推断训练或测试划分。','excerpt':True})
 d['sources'].append({'label':'官方任务 YAML','url':url,'role':'data'}); d['sampleAccess'].setdefault('sourceUrls',[]).append(url)
d['sampleAccess']['status']='local';d['sampleAccess']['reason']='展示官方 YAML 的真实任务配置与计划；不是模型实测轨迹。';d['sampleSet']={'retrievedAt':'2026-11-05','samples':samples}
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lic=Path('content/assets/licenses/real-bench-mit.txt');lic.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile('.scratch/embodied-samples/real/LICENSE',lic)
# EmbodiedLab 的任务卡是含变量的官方模板，不虚构具体实验读数。
path=P/'embodiedlab.json';d=json.loads(path.read_text(encoding='utf-8'));sha='5dd50ff33ec1211685f47ee38d9abf8db75656bf';f='experiments/hooke_k/task_card.md'; txt=subprocess.check_output(['git','-C','.scratch/embodied-samples/lab','show',f'HEAD:{f}'],text=True,encoding='utf-8');print('TASK CARD:',txt[:1800])
url=f'https://github.com/HexaFuture/EmbodiedLab/blob/{sha}/{f}'
sample={'id':'embodiedlab-hooke-card','title':'弹簧刚度测量任务卡','type':'record','promptOrigin':'editorial','prompt':'通过多组不同载荷测量弹簧形变，估计弹簧刚度；静止观察并记录证据，再提交结果。','explanation':'官方任务卡是包含占位符的实验模板，具体负载数与参数由实例确定；这里没有伪造测量值或实验结果。','raw':'Spring stiffness','source':url,'license':'Apache License 2.0；仅引用任务卡名称，第三方仿真资产许可另行核查。','split':'公开任务卡模板。','excerpt':True}
d['sources'].append({'label':'官方实验任务卡','url':url,'role':'data'});d['sampleAccess']['sourceUrls'].append(url);d['sampleAccess']['reason']='展示官方任务及任务卡模板；中文为本站解读，不代表实验运行结果。';d['sampleSet']['samples'].append(sample);path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
log=Path('UPDATE_LOG.md'); old=log.read_text(encoding='utf-8'); new='''\n## 2026-11-05：补充具身评测真实任务样例\n\n- 修改 `content/benchmarks/` 下 dexarena、embodiedlab、embodied-playground、aa-robotics、libero-max、codeactionbench、robodojo、rle-bench、embodiedx、roboeval、roboeval-bimanual-challenge、maniskill3、habitat-3、ebim、roboarena、robochallenge、robochallenge-table30-v2、gm-100、roboquest、robotarena-infinity、humanoidbench、bigym、bigym-2、colosseum、real-bench、manipulationnet 的 JSON：根据官方文档、论文、配置补充具体任务、场景或判定条件，登记样例来源；部分原本仅跳转官网的条目现可直接阅读。\n- REAL-Bench 直接摘取官方 MIT 许可 YAML 的任务字段和计划，增加 `content/assets/licenses/real-bench-mit.txt`；场景资产许可不由此推定。动作计划明确标注为配置而非实测轨迹。EmbodiedLab 的公开任务卡为模板，不虚构实验数据。\n- 为便于理解，补充阈值、扰动及多步骤任务的中文说明；仅在来源明确时列出成功条件，不把任务示例解释为模型成绩。其他示例仅引用必要的官方任务名称，不复制第三方媒体。\n- 影响：评测详情页的本地样例和来源链接增加；不改变评分、排行榜或运行接口。\n''';log.write_text(old.rstrip()+'\n'+new,encoding='utf-8')
print('updated',len(specs)+2,'benchmarks')
