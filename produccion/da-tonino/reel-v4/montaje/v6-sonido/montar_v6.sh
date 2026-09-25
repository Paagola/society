#!/usr/bin/env bash
# Montaje de la v6 de Da Tonino (25/09/2026). Proyecto OpenMontage: projects/da-tonino-reel-v6 (pipeline hybrid, revisión de `edit`).
# 1) Audio: quitar_E.py → audio_v6.wav (sonido E de la porción quitado; el resto, idéntico a la v5).
# 2) Logo: logo_carrusel.py → ../logo-carrusel-4k.png (tipografía del carrusel: Cinzel + Pinyon Script + Montserrat Light).
# 3) Imagen: 0–9,375 s de la v5 copiados sin reencodar (fotograma clave en 9,375 s, GOP cerrado → 225 paquetes)
#    + plano de la sala rehecho desde el clip de Seedance 4K 94fa925f sin logo, con el etalonaje de la v5 reajustado
#    (sala_v5.cube + vignette 0.93 en RGB + gblur 0.7 + grano), mismos tiempos de fundido y logo que la v5,
#    codificado con los mismos ajustes de x264 que la v5 (leídos de su cabecera SEI).
# Material que no está en el repo (descargar):
#   v5_4k.mp4    https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/4ac9c8b1-e18b-4c1b-ab3b-112cf162d8ae.mp4
#   v5_1080.mp4  (en esta carpeta)
#   seedance_original.mp4 = reescalado ByteDance 4K 94fa925f (en esta carpeta)
set -euo pipefail
SRC=seedance_original.mp4
FC="[0:v]format=rgb24,lut1d=file=sala_v5.cube,vignette=angle=0.93,format=yuv420p,gblur=sigma=0.7,noise=c0s=5:c0f=t+u,fade=t=out:st=1.425:d=1.25,tpad=stop_mode=add:stop_duration=2,trim=duration=4.166667,setpts=PTS-STARTPTS[sala];[1:v]format=rgba,fade=t=in:st=0.575:d=0.85:alpha=1,fade=t=out:st=3.225:d=0.83:alpha=1[logo];[sala][logo]overlay=0:0:format=auto,format=yuv420p"
IN="-ss 9.375 -t 2.689 -i $SRC -loop 1 -framerate 24 -t 4.166667 -i ../logo-carrusel-4k.png"

ffmpeg -y $IN -filter_complex "$FC,setpts=N/24/TB[v]" -map "[v]" -r 24 -video_track_timescale 12288 \
  -c:v libx264 -preset medium -crf 16 -profile:v high -level 5.1 -pix_fmt yuv420p cola_4k.mp4
ffmpeg -y $IN -filter_complex "$FC,scale=1080:1920:flags=lanczos,setpts=N/24/TB[v]" -map "[v]" -r 24 -video_track_timescale 12288 \
  -c:v libx264 -preset slow -crf 17 -profile:v high -level 5.0 -pix_fmt yuv420p cola_1080.mp4

for v in 4k 1080; do
  ffmpeg -y -i v5_$v.mp4 -map 0:v -frames:v 225 -c:v copy cabeza_$v.mp4
  printf "file 'cabeza_%s.mp4'\nfile 'cola_%s.mp4'\n" $v $v > lista_$v.txt
  ffmpeg -y -f concat -safe 0 -i lista_$v.txt -i audio_v6.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k \
    -movflags +faststart da-tonino-reel-v6-$v.mp4
done

# Verificación: 325 fotogramas, 0 errores, 0–9,375 s idénticos a la v5
for v in 4k 1080; do
  ffmpeg -v error -i da-tonino-reel-v6-$v.mp4 -f null -
  a=$(ffmpeg -loglevel error -i v5_$v.mp4 -map 0:v -frames:v 225 -f framemd5 - | grep -v '^#' | awk -F, '{print $6}' | md5sum)
  b=$(ffmpeg -loglevel error -i da-tonino-reel-v6-$v.mp4 -map 0:v -frames:v 225 -f framemd5 - | grep -v '^#' | awk -F, '{print $6}' | md5sum)
  [ "$a" = "$b" ] && echo "$v: cabeza idéntica a la v5" || echo "$v: CABEZA DISTINTA"
done
