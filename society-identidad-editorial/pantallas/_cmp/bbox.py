import sys, numpy as np
from PIL import Image
i=sys.argv[1]; mode=sys.argv[2]  # dark|light|blue|yellow
regs=[tuple(map(int,r.split(','))) for r in sys.argv[3:]]
def load(p): return np.asarray(Image.open(p).convert('RGB').resize((390,844))).astype(int)
A=load(f'_ref/ref{i}.png'); B=load(f'_cmp/f{i}.png')
def mask(X):
    r,g,b=X[...,0],X[...,1],X[...,2]; l=(r+g+b)/3
    if mode=='dark': return l<70
    if mode=='light': return l>190
    if mode=='blue': return (b>150)&(r<90)
    if mode=='yellow': return (r>200)&(g>150)&(b<90)
for (x0,y0,x1,y1) in regs:
    out=[]
    for X in (A,B):
        m=mask(X)[y0:y1,x0:x1]
        ys,xs=np.where(m)
        if len(xs)<10: out.append(None); continue
        # robust: drop 0.3% outliers
        out.append((x0+int(np.percentile(xs,0.3)),y0+int(np.percentile(ys,0.3)),x0+int(np.percentile(xs,99.7)),y0+int(np.percentile(ys,99.7))))
    print((x0,y0,x1,y1),'ref',out[0],'fig',out[1])
