import io
import sys
import json
from pathlib import Path
sys.path.insert(0,'.scratch/embodied-samples/h5deps')
import h5py
import requests

class RangeFile(io.RawIOBase):
    def __init__(self,url,size):
        self.url=url;self.size=size;self.pos=0;self.cache={};self.session=requests.Session();self.chunk=1048576
    def readable(self): return True
    def seekable(self): return True
    def tell(self): return self.pos
    def seek(self,offset,whence=0):
        self.pos=(0 if whence==0 else self.pos if whence==1 else self.size)+offset
        return self.pos
    def readinto(self,b):
        size=min(len(b),self.size-self.pos)
        for off in range(0,size):
            absolute=self.pos+off;start=(absolute//self.chunk)*self.chunk
            if start not in self.cache:
                end=min(start+self.chunk,self.size)-1
                r=self.session.get(self.url+f'?segment={start}',headers={'Range':f'bytes={start}-{end}'},timeout=60)
                r.raise_for_status()
                if r.status_code!=206:raise ValueError('range request was not respected')
                self.cache[start]=r.content
            b[off]=self.cache[start][absolute-start]
        self.pos+=size
        return size

url='https://huggingface.co/datasets/RoboDojo-Benchmark/RoboDojo/resolve/1127bda94f172d757386945af3eb3a6754d1a4e6/data/RoboDojo/sweep_blocks/arx_x5/data/episode_0000000.hdf5'
with RangeFile(url,694902372) as source:
    with h5py.File(source,'r') as f:
        def describe(name,obj):
            if isinstance(obj,h5py.Dataset): print(name,obj.shape,str(obj.dtype),flush=True)
        f.visititems(describe)
        value=f['instruction'][()]
        if isinstance(value,bytes): value=value.decode('utf-8')
        result={'instruction':value,'frequency':int(f['additional_info/frequency'][()]),'frames':[]}
        for index in (0,351,701):
            result['frames'].append({'frame':index,'state_left_arm':f['state/left_arm_joint_states'][index].tolist(),'action_left_arm':f['action/left_arm_joint_states'][index].tolist(),'state_right_arm':f['state/right_arm_joint_states'][index].tolist(),'action_right_arm':f['action/right_arm_joint_states'][index].tolist()})
        Path('.scratch/embodied-samples/realdata/robodojo-episode0.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
        print(json.dumps(result,ensure_ascii=False),flush=True)
        print('chunks downloaded',len(source.cache),flush=True)
