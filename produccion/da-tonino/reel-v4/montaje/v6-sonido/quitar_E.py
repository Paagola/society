"""v6: quita el sonido E (toma Porción) del v5 sin tocar la canción.
Método b del prompt: puerta espectral limitada en banda y tiempo.
- El stem 'other' de Demucs localiza el sonido colado (lo que sobresale >1,25x de su suelo local).
- Esa parte se resta de la MEZCLA ORIGINAL (no se resintetiza desde stems).
- Solo dentro de 3,57–4,57 s (el tramo que Víctor escuchó y confirmó), con fundidos de 18 ms.
- Fuera de la ventana de trabajo el audio queda idéntico bit a bit.
"""
import numpy as np, soundfile as sf

sr = 44100
mix, _ = sf.read("v5_audio.wav")
other, _ = sf.read("sep/htdemucs_ft/v5_audio/other.wav")
EDIT_A, EDIT_B, PAD, FADE = 3.57, 4.57, 0.30, 0.018
n_fft, hop = 2048, 256
win = np.hanning(n_fft)

def stft(x):
    n = 1 + (len(x)-n_fft)//hop
    return np.array([np.fft.rfft(x[i*hop:i*hop+n_fft]*win) for i in range(n)])

def istft(S, length):
    y = np.zeros(length); w = np.zeros(length)
    for i in range(S.shape[0]):
        y[i*hop:i*hop+n_fft] += np.fft.irfft(S[i])*win
        w[i*hop:i*hop+n_fft] += win**2
    w[w < 1e-8] = 1
    return y/w

i0, i1 = int((EDIT_A-PAD)*sr), int((EDIT_B+PAD)*sr)
a_rel, b_rel = int(EDIT_A*sr)-i0, int(EDIT_B*sr)-i0
fN = int(FADE*sr)
full = mix.copy()
W = int(0.5*sr/hop)
for ch in range(2):
    seg_mix, seg_o = mix[i0:i1, ch], other[i0:i1, ch]
    O = stft(seg_o); mag, ph = np.abs(O), np.angle(O)
    padm = np.pad(mag, ((W//2, W//2), (0, 0)), mode="edge")
    base = np.stack([np.percentile(padm[t:t+W], 20, axis=0) for t in range(mag.shape[0])])
    excess = np.clip(mag - 1.25*base, 0, None)
    M = stft(seg_mix)
    Mn = M - excess*np.exp(1j*ph)
    low = np.abs(Mn) < 0.05*np.abs(M)
    Mn[low] = 0.05*M[low]
    new = istft(Mn, len(seg_mix))
    out = seg_mix.copy()
    ca, cb = a_rel+fN, b_rel-fN
    out[ca:cb] = new[ca:cb]
    r = np.linspace(0, 1, fN)
    out[a_rel:ca] = seg_mix[a_rel:ca]*(1-r) + new[a_rel:ca]*r
    out[cb:b_rel] = seg_mix[cb:b_rel]*r[::-1] + new[cb:b_rel]*(1-r[::-1])
    full[i0:i1, ch] = out

np.clip(full, -1, 1, out=full)
sf.write("audio_v6_premaster.wav", full, sr)
e0, e1 = int(EDIT_A*sr), int(EDIT_B*sr)
print("fuera de 3,57–4,57 s idéntico:", np.array_equal(mix[:e0], full[:e0]) and np.array_equal(mix[e1:], full[e1:]))
sf.write("candidatos/E_antes.wav", mix[e0:e1], sr)
sf.write("candidatos/E_despues.wav", full[e0:e1], sr)
def band_rms(x, lo):
    s = np.abs(np.fft.rfft(x.mean(axis=1))); f = np.fft.rfftfreq(len(x), 1/sr)
    return 20*np.log10(np.sqrt((s[f>lo]**2).sum())+1e-9)
print(f"energía >1,5 kHz en el tramo: antes {band_rms(mix[e0:e1],1500):.1f} dB · después {band_rms(full[e0:e1],1500):.1f} dB")
print(f"energía <300 Hz (bajo de la canción): antes {band_rms(mix[e0:e1],0)-0:.1f} dB total · después {band_rms(full[e0:e1],0):.1f} dB total")
