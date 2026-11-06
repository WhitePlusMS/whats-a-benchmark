import json,hashlib
from pathlib import Path
import metaworld, imageio.v2 as iio, numpy as np
from metaworld.policies import SawyerLeverPullV3Policy
out=Path('.scratch/embodied-samples/metaworld-ml10');out.mkdir(parents=True,exist_ok=True)
bench=metaworld.ML10(seed=42);name='lever-pull-v3';tasks=[t for t in bench.test_tasks if t.env_name==name]
env=bench.test_classes[name](render_mode='rgb_array',camera_name='topview',width=480,height=480);env.set_task(tasks[0]);obs,info=env.reset(seed=42);policy=SawyerLeverPullV3Policy();frames=[env.render()];steps=[]
for i in range(150):
 action=policy.get_action(obs);obs,reward,terminated,truncated,info=env.step(action);frames.append(env.render());steps.append({'step':i+1,'action':[float(x) for x in action],'reward':float(reward),'success':float(info['success'])})
 if info['success'] or terminated or truncated:break
iio.mimsave(str(out/'lever-test.mp4'),frames,fps=20,codec='libx264',macro_block_size=1)
iio.imwrite(out/'lever-start.png',frames[0]);iio.imwrite(out/'lever-end.png',frames[-1]);env.close()
record={'benchmark':'ML10','split':'test','task':name,'benchmark_seed':42,'reset_seed':42,'test_task_index_for_environment':0,'num_test_tasks_for_environment':len(tasks),'steps':len(steps),'final_success':steps[-1]['success'],'frame_count':len(frames),'fps':20,'note':'official scripted expert, not trained policy or leaderboard result','first_step':steps[0],'last_step':steps[-1]};(out/'record.json').write_text(json.dumps(record,indent=2),encoding='utf8');(out/'steps.json').write_text(json.dumps(steps,indent=2),encoding='utf8');print(json.dumps(record))


