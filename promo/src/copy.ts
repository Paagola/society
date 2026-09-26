import type {Line} from './components';

// Todo el texto del vídeo en un solo sitio, para retocarlo sin tocar la animación.
// Regla de la guía: mayúsculas condensadas + una sola palabra (o grupo) en cursiva.
export const COPY = {
  // Apertura: el turno real de Da Tonino, sin marca, hasta la ruptura (Víctor, 25/09/2026).
  apertura: {
    hueco: [{t: 'OTRA NOCHE'}, {t: 'que no subo nada.', it: true}] as Line[],
    frase: 'Pizza recién salida 🍕',
  },
  folio: {
    numero: 'Nº 01 · Otoño 2026',
    seccion: 'Agencia de IA para bares y restaurantes',
  },
  portada: {
    titular: [{t: 'TU BAR'}, {t: 'merece', it: true}, {t: 'QUE LO VEAN.'}] as Line[],
  },
  problema: {
    pregunta: [{t: '¿QUÉ'}, {t: 'publico', it: true}, {t: 'HOY?'}] as Line[],
    tareas: [{verbo: 'GRABAR'}, {verbo: 'EDITAR'}, {verbo: 'PUBLICAR'}, {verbo: 'MEDIR'}, {verbo: 'RESPONDER'}],
    remate: [{t: 'Y ADEMÁS,'}, {t: 'cocinar.', it: true}] as Line[],
  },
  marca: {
    lema: 'tu agencia con IA',
    sello: ['Más', 'mesas'],
  },
  // Caso real: Da Tonino (25/09/2026). Todo el material sale de produccion/da-tonino y pruebas/*-da-tonino-*.
  // Orden: fotos → propuestas → selección → carrusel → reel → historia (las seis aprobadas son las del carrusel).
  caso: {
    etiqueta: 'Caso real · Da Tonino',
    titular: [{t: 'DE 4 FOTOS'}, {t: 'a un reel.', it: true}] as Line[],
    fotos: {num: '01', titular: [{t: 'TUS'}, {t: 'fotos.', it: true}] as Line[], sello: ['Del', 'local'], platos: ['Pizza', 'Paella', 'Rigatoni', 'Sala']},
    crea: {num: '02', titular: [{t: 'LA IA'}, {t: 'propone.', it: true}] as Line[], descartada: 'DESCARTADA', sello: ['Con', 'IA']},
    aprueba: {num: '03', titular: [{t: 'TÚ'}, {t: 'eliges.', it: true}] as Line[]},
    carrusel: {num: '04', titular: [{t: 'Y SALE'}, {t: 'el carrusel.', it: true}] as Line[], listo: 'Listo'},
    reel: {num: '05', titular: [{t: 'Y EL'}, {t: 'reel.', it: true}] as Line[]},
    historia: {
      num: '06',
      problema: [{t: 'UN REEL'}, {t: 'no basta.', it: true}] as Line[],
      solucion: [{t: 'Y LA'}, {t: 'historia.', it: true}] as Line[],
    },
    resultado: {
      titular: [{t: '4 FOTOS'}, {t: 'reales.', it: true}] as Line[],
      remate: [{t: '1 REEL + 1'}, {t: 'carrusel.', it: true}] as Line[],
      // Etiquetas de la cadena: foto real → imagen generada aprobada → lámina lista (aún no publicada).
      cadena: ['Real', 'Con IA', 'Lista'],
      sello: ['En un', 'día'],
    },
  },
  planes: {
    titular: [{t: 'TU'}, {t: 'plan', it: true}] as Line[],
    lista: [
      {nombre: 'GOOGLE', img: 'bar-esquina.png'},
      {nombre: 'REDES', img: 'movil-mano.png'},
      {nombre: 'REELS', img: 'coctel.png'},
    ],
    // Pendiente de decisión (README raíz §5): los nombres de plan son provisionales.
    recomendado: 'Recomendado',
  },
  cierre: {
    titular: [{t: 'MARKETING QUE'}, {t: 'llena tus mesas.', it: true}] as Line[],
    boton: 'Empezar',
    fecha: 'Enero 2027',
  },
};
