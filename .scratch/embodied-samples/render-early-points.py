import io
import pickle
import zipfile
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

class RestrictedUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module in ('numpy.core.multiarray', 'numpy._core.multiarray') and name in ('_reconstruct', 'scalar'):
            return getattr(np._core.multiarray, name)
        if module in ('numpy.core.numeric', 'numpy._core.numeric') and name == '_frombuffer':
            return np._core.numeric._frombuffer
        if module == 'numpy' and name in ('dtype', 'ndarray'):
            return getattr(np, name)
        raise pickle.UnpicklingError(f'unsupported {module}.{name}')

root=Path('.scratch/embodied-benchmarks')
with zipfile.ZipFile(root/'robotwin-early-diverse-bottles.zip') as z:
    points=[]
    for frame in (0,93,185):
        entry=f'diverse_bottles_pick_pkl/episode0/{frame}.pkl'
        cloud=RestrictedUnpickler(io.BytesIO(z.read(entry))).load()['pointcloud']
        assert cloud.shape == (1024,6) and np.isfinite(cloud).all()
        points.append((frame,cloud))

xyz=np.concatenate([p[:,:3] for _,p in points])
lo,hi=np.percentile(xyz,[1,99],axis=0)
for frame,cloud in points:
    fig=plt.figure(figsize=(6,6),dpi=140)
    ax=fig.add_subplot(111,projection='3d')
    ax.scatter(cloud[:,0],cloud[:,1],cloud[:,2],c=np.clip(cloud[:,3:6],0,1),s=3,depthshade=False)
    ax.set(xlabel='x',ylabel='y',zlabel='z',xlim=(lo[0],hi[0]),ylim=(lo[1],hi[1]),zlim=(lo[2],hi[2]))
    ax.set_box_aspect(hi-lo)
    ax.view_init(elev=24,azim=-65)
    fig.tight_layout()
    fig.savefig(root/f'early-pointcloud-{frame}.png')
    plt.close(fig)
