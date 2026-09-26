import type {Linea} from '../anuncio/piezas';

// «La pizza que nadie vio» — anuncio de Society (concepto A con los cambios de Víctor del 26/09/2026).
// Plan: produccion/society-anuncio/plan.yaml. Todo corte cae en un tiempo de musica.m4a (~132,5 BPM).
export const FPS = 30;
const BPM = 132.5;
const T0 = 0.012;
export const b = (k: number) => Math.round((T0 + (60 / BPM) * k) * FPS);

// Planos, en tiempos de la canción: [inicio, fin).
export const PLANO = {
  diez: [0, 4],
  cuatro: [4, 10],
  carta: [10, 15],
  persiana: [15, 20],
  // «LA MISMA foto.» incluye el proceso (tiempos 25-28): la foto se plancha, se reencuadra en vertical
  // y una barra le cambia la luz; la diferencia se ve con la foto partida entre el antes y el después.
  misma: [20, 28],
  altura: [28, 32],
  reel: [32, 36],
  carrusel: [36, 41],
  historia: [41, 46],
  publica: [46, 52],
  firma: [52, 57],
} as const;

// Pasos del proceso, en fotogramas desde el inicio de «LA MISMA foto.».
export const PROCESO = {plancha: b(25) - b(20), encuadre: b(26) - b(20), luz: b(27) - b(20) - 4, fin: b(28) - b(20)};

export const DURACION = b(57);

// La canción suena mientras la pizza es real; se corta en seco con el clic del móvil y vuelve cuando la
// bola cae en Society, desde el mismo punto de la canción, como si no hubiera dejado de sonar.
export const MUSICA_CORTA = b(4);
export const MUSICA_VUELVE = b(21);

export const TEXTO = {
  diez: [{t: 'ESTA PIZZA', s: 200}, {t: 'es de', it: true, s: 170}] as Linea[],
  cuatro: [{t: 'EN EL MÓVIL,', s: 196}, {t: 'de', it: true, s: 170}, {t: 'CUATRO.', s: 300}] as Linea[],
  carta: [{t: '3 DE CADA 4', s: 205}, {t: 'miran la carta', it: true, s: 128}, {t: 'ANTES DE RESERVAR.', s: 118}] as Linea[],
  nadie: [{t: 'NADIE VA', s: 296}, {t: 'a donde', it: true, s: 250}, {t: 'NO VE.', s: 296}] as Linea[],
  misma: [{t: 'LA MISMA', s: 250}, {t: 'foto.', it: true, s: 250}] as Linea[],
  altura: [{t: 'por fin,', it: true, s: 200}, {t: 'A SU ALTURA.', s: 196}] as Linea[],
  reel: [{t: 'UN REEL.', s: 250}] as Linea[],
  carrusel: [{t: 'UN CARRUSEL.', s: 196}] as Linea[],
  historia: [{t: 'UNA HISTORIA.', s: 186}] as Linea[],
  publica: [{t: 'PUBLICA', s: 262}, {t: 'menos,', it: true, s: 225}, {t: 'LLENA MÁS.', s: 212}] as Linea[],
};

// Tramos del reel v6 de Da Tonino (segundos) para «UN REEL.»: un corte por tiempo.
export const REEL = [3.55, 4.45, 5.9, 8.05];
