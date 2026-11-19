import pickle,io
class R(pickle.Unpickler):
 def find_class(self, module, name):
  if module in ('numpy.core.numeric','numpy._core.numeric') and name=='_frombuffer':
   import numpy; return numpy.core.numeric._frombuffer
  if module=='numpy' and name in ('dtype','ndarray'):
   import numpy; return getattr(numpy,name)
  if module in ('numpy.core.multiarray','numpy._core.multiarray') and name in ('_reconstruct','scalar'):
   import numpy; return getattr(numpy.core.multiarray,name)
  raise pickle.UnpicklingError(f'unsupported {module}.{name}')
with open('.scratch/embodied-benchmarks/toto-scooping-parsed.pkl','rb') as f: d=R(f).load()
print(type(d),len(d)); print(d[0].keys()); print({k:(str(getattr(v,'shape',None)),str(v)[:250]) for k,v in d[0].items()})
