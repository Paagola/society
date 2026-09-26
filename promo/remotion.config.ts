import os from 'node:os';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
// Hasta 4 hilos, sin pasar de los núcleos de la máquina (en portátiles o en la nube puede haber 2).
Config.setConcurrency(Math.min(4, os.cpus().length));
// En entornos sin Chrome Headless Shell descargado se puede apuntar a uno local:
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
