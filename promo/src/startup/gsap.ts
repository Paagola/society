import {useLayoutEffect, useRef} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';
import {CustomEase} from 'gsap/CustomEase';
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin';

// GSAP dentro de Remotion (skills oficiales greensock/gsap-skills: gsap-core, gsap-timeline, gsap-plugins).
// Cada acto construye UNA línea de tiempo en pausa al montarse; en cada fotograma se coloca el cabezal
// en frame / fps. Así el render es determinista aunque Remotion pinte los fotogramas en otro orden.

gsap.registerPlugin(SplitText, CustomEase, DrawSVGPlugin);

// Curvas de la pieza: entrada larga y frenada (texto, tarjetas) y corte seco (pases de plano).
CustomEase.create('entra', '0.16,1,0.3,1');
CustomEase.create('corte', '0.76,0,0.24,1');
CustomEase.create('cae', '0.55,0,0.9,0.4');
gsap.defaults({ease: 'entra', duration: 0.6});

export type Selector = (sel: string) => HTMLElement[];

export const useLinea = (construir: (tl: gsap.core.Timeline, q: Selector) => void) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const raiz = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t = gsap.timeline({paused: true});
      construir(t, gsap.utils.selector(raiz) as Selector);
      tl.current = t;
    }, raiz);
    return () => ctx.revert();
    // la línea se construye una sola vez por acto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => {
    tl.current?.seek(frame / fps, false);
  }, [frame, fps]);
  return raiz;
};

// Texto por palabras que sube desde detrás de su máscara (SplitText con mask: 'words').
export const palabras = (tl: gsap.core.Timeline, el: HTMLElement | undefined, en: number, stagger = 0.06, dur = 0.7) => {
  if (!el) return;
  const s = SplitText.create(el, {type: 'words', mask: 'words'});
  tl.fromTo(s.words, {yPercent: 115}, {yPercent: 0, duration: dur, stagger, ease: 'entra'}, en);
  return s;
};

// Texto ya en pantalla (viene del acto anterior): se parte en palabras solo para poder sacarlo.
export const partir = (el: HTMLElement | undefined) => (el ? SplitText.create(el, {type: 'words', mask: 'words'}) : undefined);

// Salida del mismo texto: las palabras suben y desaparecen por arriba de su máscara.
export const salir = (tl: gsap.core.Timeline, s: SplitText | undefined, en: number) => {
  if (!s) return;
  tl.to(s.words, {yPercent: -115, duration: 0.4, stagger: 0.03, ease: 'power3.in'}, en);
};

export {gsap, SplitText};
