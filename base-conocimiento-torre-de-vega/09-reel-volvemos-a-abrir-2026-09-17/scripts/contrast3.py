import subprocess
import numpy as np
W, H = 1080, 1920
src = r"C:\Users\victo\OpenMontage\remotion-composer\public\reel09\v1_multitoma.mp4"
def frame(t):
    raw = subprocess.run(["ffmpeg","-v","error","-ss",f"{t:.3f}","-i",src,"-frames:v","1","-f","rawvideo","-pix_fmt","gray","-"],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(H,W)
fr=[frame(t) for t in np.arange(0.4,2.8,0.2)]
tw=760; x0=(W-tw)//2; res=[]
for yc in range(260,1500,20):
    worst=max(float((f[yc-37:yc+37,x0:x0+tw]>170).mean()) for f in fr)
    res.append((worst,yc))
res.sort(); print(" | ".join(f"y={y} {w*100:.1f}%" for w,y in res[:8]))
