import type {Linea} from './piezas';

// «La 1:47» — anuncio de Society. Plan: produccion/society-anuncio/plan.yaml (concepto B).
// Todos los cortes caen en un tiempo de musica.m4a (~132,5 BPM medidos; primer tiempo a 0,012 s).
export const FPS = 30;
const BPM = 132.5;
const T0 = 0.012;
export const b = (k: number) => Math.round((T0 + (60 / BPM) * k) * FPS);

export const DURACION = b(67);

// La canción se corta en seco al bajar la persiana y vuelve un tiempo después de la notificación,
// desde un tiempo de la canción que cae en la misma rejilla (tiempo k del anuncio = k + 1 de la canción).
export const MUSICA_CORTA = b(9);
export const MUSICA_VUELVE = b(35);
export const MUSICA_DESDE = Math.round((T0 + (60 / BPM) * 36) * FPS);

// Tramos del reel v6 (segundos): tramos útiles del inventario del plan.
export const REEL = {rucula: 0, porcion: 3.55, cana: 8.0, paella: 7.0, emplatado: 6.0, jamon: 2.5};

export const TEXTO = {
  cocina: [{t: 'COCINA,', s: 250}, {t: 'cerrada.', it: true, s: 215}] as Linea[],
  instagram: [{t: 'INSTAGRAM,', s: 186}, {t: 'pendiente.', it: true, s: 180}] as Linea[],
  pregunta: [{t: '¿Y HOY', s: 236}, {t: 'qué', it: true, s: 205}, {t: 'PUBLICO?', s: 236}] as Linea[],
  esto: [{t: '¿ESTO?', s: 330}] as Linea[],
  manana: [{t: 'MAÑANA.', s: 300}] as Linea[],
  nadie: [{t: 'NADIE VA', s: 296}, {t: 'a donde', it: true, s: 266}, {t: 'NO VE.', s: 296, fondo: true}] as Linea[],
  cafe: [{t: '9:00,', s: 290}, {t: 'con el café:', it: true, s: 138}] as Linea[],
  misma: [{t: 'DE TU', s: 250}, {t: 'misma', it: true, s: 215}, {t: 'FOTO.', s: 250}] as Linea[],
  // «Tu semana, lista.»: la semana contada día a día, cada formato con su marco.
  lunes: [{t: 'LUNES,', s: 250}, {t: 'el reel.', it: true, s: 190}] as Linea[],
  miercoles: [{t: 'MIÉRCOLES,', s: 212}, {t: 'el carrusel.', it: true, s: 160}] as Linea[],
  viernes: [{t: 'VIERNES,', s: 250}, {t: 'la historia.', it: true, s: 175}] as Linea[],
  publica: [{t: 'PUBLICA', s: 262}, {t: 'menos,', it: true, s: 225}, {t: 'LLENA MÁS.', s: 212}] as Linea[],
  cierre: [{t: '01:47.', s: 290}, {t: 'Esta vez,', it: true, s: 158}, {t: 'NADA PENDIENTE.', s: 128}] as Linea[],
};
