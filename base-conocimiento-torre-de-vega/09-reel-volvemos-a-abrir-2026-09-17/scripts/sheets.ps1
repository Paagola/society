param([string]$dir)
Get-ChildItem $dir -Filter *.mp4 | ForEach-Object {
    $dur = [double](& ffprobe -v error -show_entries format=duration -of csv=p=0 $_.FullName)
    # 12 frames over the first min(dur,16) seconds: the part the predictor will score
    $span = [Math]::Min($dur, 16)
    $fps = 12 / $span
    $out = Join-Path $dir ("sheet_" + $_.BaseName + ".jpg")
    & ffmpeg -hide_banner -loglevel error -y -i $_.FullName -t $span -vf "fps=$fps,scale=240:-1,tile=6x2" -frames:v 1 $out
    "{0}  {1:N1}s -> {2}" -f $_.Name, $dur, (Split-Path $out -Leaf)
}
