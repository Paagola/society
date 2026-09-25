import type {Line} from './components';

// Todo el texto del vídeo en un solo sitio, para retocarlo sin tocar la animación.
// Regla de la guía: mayúsculas condensadas + una sola palabra (o grupo) en cursiva.
export const COPY = {
  folio: {
    numero: 'Nº 01 · Otoño 2026',
    seccion: 'Agencia de IA para bares y restaurantes',
  },
  portada: {
    titular: [{t: 'TU BAR'}, {t: 'merece', it: true}, {t: 'QUE LO VEAN.'}] as Line[],
    entradilla: 'Posts, historias y reels hechos a partir de tu local real.',
  },
  problema: {
    pregunta: [{t: '¿QUÉ'}, {t: 'publico', it: true}, {t: 'HOY?'}] as Line[],
    tareas: [
      {verbo: 'GRABAR', nota: 'El plato, la sala, la barra'},
      {verbo: 'EDITAR', nota: 'Cortes, rótulos, subtítulos'},
      {verbo: 'PUBLICAR', nota: 'Cada día, a su hora'},
      {verbo: 'MEDIR', nota: 'Qué funciona y qué no'},
      {verbo: 'RESPONDER', nota: 'Reseñas y comentarios'},
    ],
    remate: [{t: 'Y ADEMÁS,'}, {t: 'cocinar.', it: true}] as Line[],
  },
  marca: {
    lema: 'tu agencia con IA',
    bajada: 'Hace el trabajo de una agencia de marketing para tu bar. Tú sigues a lo tuyo.',
  },
  pasos: [
    {
      num: '01',
      titular: [{t: 'SOLO'}, {t: 'un nombre.', it: true}] as Line[],
      nota: 'Busca tu local. Society lee tu ficha de Google, tus redes y tu imagen.',
    },
    {
      num: '02',
      titular: [{t: 'SOLO'}, {t: 'una frase.', it: true}] as Line[],
      nota: 'Cuéntale qué hay hoy y súbele una foto del plato.',
    },
    {
      num: '03',
      titular: [{t: 'Y YA'}, {t: 'está.', it: true}] as Line[],
      nota: 'Un post con tu marca, listo para publicar o retocar.',
    },
  ],
  app: {
    busqueda: 'Madrid',
    local: 'La Taberna del Patio',
    direccion: 'Calle Mayor, 12',
    frase: 'Hoy tenemos alcachofas a la brasa',
    plato: [{t: 'ALCACHOFAS'}, {t: 'a la', it: true}, {t: 'BRASA'}] as Line[],
    pie: 'Hoy tenemos alcachofas a la brasa. Sabor, temporada y buena compañía.',
    tags: '#Alcachofas #Madrid #Hoy',
    cuenta: 'latabernadelpatio',
  },
  feed: {
    titular: [{t: 'TU FEED,'}, {t: 'hecho.', it: true}] as Line[],
  },
  principios: [
    {
      titular: [{t: 'NADA'}, {t: 'inventado.', it: true}] as Line[],
      texto: 'Todo parte de tu local real: tus fotos, tu carta y tu marca. Quien entra encuentra lo que vio en redes.',
    },
    {
      titular: [{t: 'CRITERIO'}, {t: 'de agencia.', it: true}] as Line[],
      texto: 'Estrategia, guion, producción, revisión y medición. No imágenes sueltas.',
    },
    {
      titular: [{t: 'CADA DÍA,'}, {t: 'sin agencia.', it: true}] as Line[],
      texto: 'Un ritmo y un coste que una agencia tradicional no alcanza.',
    },
  ],
  planes: {
    titular: [{t: 'TU'}, {t: 'plan', it: true}] as Line[],
    lista: [
      {nombre: 'GOOGLE', texto: 'Tu ficha, tus fotos, tu carta y tus reseñas al día.', img: 'bar-esquina.png'},
      {nombre: 'REDES', texto: 'Google + posts, carruseles e historias.', img: 'movil-mano.png'},
      {nombre: 'REELS', texto: 'Todo lo anterior + reels cada mes.', img: 'coctel.png'},
    ],
  },
  cierre: {
    titular: [{t: 'MARKETING QUE'}, {t: 'llena tus mesas.', it: true}] as Line[],
    boton: 'Empezar',
    fecha: 'Enero 2027',
  },
};
