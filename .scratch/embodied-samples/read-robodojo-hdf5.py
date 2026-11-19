import sys
sys.path.insert(0,'.scratch/embodied-samples/h5deps')
import fsspec
import h5py

url='https://huggingface.co/datasets/RoboDojo-Benchmark/RoboDojo/resolve/1127bda94f172d757386945af3eb3a6754d1a4e6/data/RoboDojo/sweep_blocks/arx_x5/data/episode_0000000.hdf5'
with fsspec.open(url,'rb',block_size=1024*1024) as remote:
    with h5py.File(remote,'r') as f:
        def describe(name,obj):
            if isinstance(obj,h5py.Dataset): print(name,obj.shape,str(obj.dtype))
        f.visititems(describe)
