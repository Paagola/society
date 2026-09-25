/* ==========================================================================
   Society · Animación — guion y escenas
   Cinco capítulos que cuentan el problema del hostelero y cómo lo resuelve
   Society. Cada escena declara su fondo, titular, pie, el estado del
   personaje y qué se dibuja detrás y delante de él.

   Todo lo que depende del guion es función del tiempo `local` de la escena:
   por eso se puede pausar, rebobinar o saltar a un capítulo y el fotograma
   siempre es el mismo. Lo único con memoria son las partículas y la física
   del salto interactivo.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U, E, C, F, A, W, H, SUELO } = S;

  const pj = new S.Personaje();
  const part = new S.Particulas();
  const raton = { x: W / 2, y: H / 2, activo: false, rx: 0, ry: 0 };
  const par = { x: 0, y: 0 }; // desplazamiento de paralaje (suavizado)
  let acumulado = 0;         // emisor de corazones de la escena «Llena más»
  let tActual = 0;

  const colorFondo = f => (f === 'cobalto' ? C.cobalto : C.papel);
  const colorTexto = f => (f === 'cobalto' ? C.papel : C.tinta);
  const colorAcento = f => (f === 'cobalto' ? C.papel : C.cobalto);

  /**
   * Factor de aparición de un elemento: entra con la curva indicada en `ini`
   * y se va con anticipación (inBack) en los últimos 0,4 s de la escena.
   */
  function aparece(local, ini, dur, largo = 0.5, curva = E.rebote) {
    const entra = curva(U.tramo(ini, ini + largo, local));
    const sale = E.entradaAtras(U.tramo(dur - 0.42, dur - 0.04, local));
    return entra * (1 - sale);
  }

  /** Destellos decorativos con parpadeo y paralaje: [x, y, w, h, profundidad, inicio]. */
  function decor(ctx, lista, c) {
    for (const [x, y, w, h, prof, ini] of lista) {
      const k = aparece(c.local, ini, c.dur, 0.5);
      if (k <= 0.001) continue;
      const brillo = 1 + Math.sin(c.t * 3 + x) * 0.1;
      ctx.save();
      ctx.translate(x + par.x * prof, y + par.y * prof);
      ctx.rotate(Math.sin(c.t * 0.8 + y) * 0.08);
      ctx.scale(k * brillo, k * brillo);
      S.destello(ctx, 0, 0, w, h, { color: c.acento, grosor: 4 });
      ctx.restore();
    }
  }

  /** Frase de pie (como «Tu agencia con IA» en el póster de referencia). */
  function pie(ctx, texto, c) {
    const k = U.tramo(0.5, 1.0, c.local) * (1 - U.tramo(c.dur - 0.4, c.dur - 0.05, c.local));
    if (k <= 0) return;
    ctx.save();
    ctx.globalAlpha = k;
    ctx.fillStyle = c.tinta;
    ctx.font = F.ui(30, 500);
    ctx.textAlign = 'center';
    ctx.fillText(texto, W / 2, 1332 + (1 - k) * 12);
    ctx.restore();
  }

  const CLIENTES = [
    { piel: '#F1D9BF', ropa: C.mostaza, pelo: C.tinta },
    { piel: '#8A5636', ropa: C.papelClaro, pelo: C.tinta },
    { piel: '#C68B5E', ropa: C.tinta, pelo: C.cafe },
    { piel: '#E8C39E', ropa: C.mostaza, pelo: '#B5462F' },
  ];

  /* ====================================================================== guion */

  const ESCENAS = [
    /* 1 · EL PROBLEMA — no sabe qué publicar y le llueven los avisos */
    {
      id: 'problema', nombre: 'El problema', dur: 7, fondo: 'papel',
      titular: [{ txt: '¿QUÉ PUBLICO' }, { txt: 'hoy?', serif: true }],
      pie: 'Sin tiempo, sin ideas… y otro día sin publicar.',
      personaje(local) {
        const e = U.tramo(0, 0.7, local);
        return { x: 540, esc: 1.2, animo: 'agobiado', pose: 'telefono', pantalla: 'vacia', dy: (1 - E.rebote(e)) * 560 };
      },
      detras(ctx, c) {
        decor(ctx, [[1005, 470, 40, 58, 1, 0.6], [70, 1110, 34, 50, 0.8, 0.9], [1000, 1170, 28, 42, 0.6, 1.1]], c);
      },
      delante(ctx, c) {
        const avisos = [
          [1.0, 'Llevas 6 días sin publicar', 60, 490, false, 'campana'],
          [1.9, '¿Qué subimos hoy?', 1020, 585, true, 'chat'],
          [2.8, 'Tu competencia ha publicado', 60, 680, false, 'megafono'],
        ];
        for (const [ini, txt, x, y, der, icono] of avisos) {
          A.notificacion(ctx, x, y, txt, aparece(c.local, ini, c.dur, 0.6, E.elastico), c.t,
            { der, icono, rot: der ? 0.02 : -0.02 });
        }
      },
    },

    /* 2 · NADIE TE VE — sin publicar no hay visibilidad; la sala vacía */
    {
      id: 'invisible', nombre: 'Nadie te ve', dur: 6.5, fondo: 'papel',
      titular: [{ txt: 'NADIE VA' }, { txt: 'a donde', serif: true }, { txt: 'NO VE.' }],
      pie: 'Si no publicas, no te encuentran. Y la sala, vacía.',
      personaje() {
        return { x: 290, esc: 1.05, animo: 'triste', pose: 'telefonoBajo', pantalla: 'cero' };
      },
      detras(ctx, c) {
        A.reloj(ctx, 880, 660, 72, c.t, aparece(c.local, 0.7, c.dur, 0.6, E.elastico));
        A.mesa(ctx, 800, SUELO, 0.85, aparece(c.local, 0.4, c.dur, 0.6, E.elastico), c.t, { telaranya: true });
        decor(ctx, [[60, 900, 30, 46, 0.8, 0.5], [1015, 880, 26, 40, 0.6, 0.8]], c);
      },
      delante(ctx, c) {
        A.notificacion(ctx, 60, 565, 'Reservas de hoy: 0', aparece(c.local, 1.6, c.dur, 0.6, E.elastico), c.t,
          { icono: 'calendario', rot: -0.02 });
        const p = U.tramo(1.2, 6.3, c.local);
        if (p > 0 && p < 1) A.rodadora(ctx, U.lerp(1180, -120, p), SUELO, 50, c.t);
      },
    },

    /* 3 · LLEGA SOCIETY — escribe una frase y sale un post listo */
    {
      id: 'society', nombre: 'Llega Society', dur: 6.5, fondo: 'cobalto',
      wipe: { x: 540, y: 780, ini: 0.25, fin: 1.15 },
      retardoTitular: 0.9,
      titular: [{ txt: 'ESCRIBE' }, { txt: 'una frase.', serif: true }],
      pie: 'Tú escribes una frase. Society hace el post.',
      personaje(local) {
        return local < 4.0
          ? { x: 265, esc: 1.0, animo: 'concentrado', pose: 'escribe', pantalla: 'escribe' }
          : { x: 265, esc: 1.0, animo: 'feliz', pose: 'celebra', salto: { amp: 70, periodo: 0.62 } };
      },
      detras(ctx, c) {
        // el bocadillo @society aparece y "abre" el fondo cobalto
        const kb = E.elastico(U.tramo(0, 0.7, c.local));
        const f = U.tramo(0.95, 1.45, c.local);
        if (kb > 0.001 && f < 1) {
          ctx.save();
          ctx.globalAlpha = 1 - f;
          S.bocadillo(ctx, 540, 780 - E.entradaAtras(f) * 500, 4.2 * kb * (1 - f * 0.4), { troquel: true });
          ctx.restore();
        }
        decor(ctx, [[60, 560, 32, 46, 0.8, 1.2], [455, 1215, 30, 44, 0.6, 4.3], [1045, 1235, 26, 38, 0.7, 4.5]], c);
      },
      delante(ctx, c) {
        const L = c.local;
        const texto = 'Hoy tenemos alcachofas a la brasa';

        if (L < 4.3) {
          const fuera = 1 - E.entradaAtras(U.tramo(3.95, 4.3, L));
          const kCaja = aparece(L, 1.1, c.dur, 0.6, E.elastico) * fuera;
          A.cajaTexto(ctx, 530, 520, 495, 250, texto, Math.floor(U.tramo(1.5, 3.3, L) * texto.length), c.t, kCaja);

          // botón mostaza: squash & stretch al pulsarlo
          const kBtn = aparece(L, 1.5, c.dur, 0.6, E.elastico) * fuera;
          const pulsa = Math.sin(Math.PI * U.tramo(3.55, 3.8, L));
          if (kBtn > 0.001) S.botonMostaza(ctx, 778, 845, 400 * kBtn, 96 * kBtn, 'CREAR POST', 1 + pulsa * 0.12, 1 - pulsa * 0.22);

          // mano-cursor que entra, pulsa y se va
          const va = U.tramo(3.0, 3.5, L), vuelve = U.tramo(3.85, 4.2, L);
          if (va > 0 && vuelve < 1) {
            const k = E.salida(va);
            A.manoCursor(ctx, U.lerp(1010, 822, k),
              U.lerp(1320, 868, k) + pulsa * 14 + E.entradaAtras(vuelve) * 520, 1);
          }
        }

        // estallido de destellos al generar el post
        const pb = U.tramo(3.8, 4.6, L);
        if (pb > 0 && pb < 1) {
          for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2 + 0.3, d = E.salida(pb) * 320, s = (1 - pb) * 56;
            S.destello(ctx, 778 + Math.cos(a) * d, 800 + Math.sin(a) * d, s * 0.8, s * 1.1,
              { relleno: i % 2 ? C.mostaza : C.papel });
          }
        }

        // el post, tal y como se verá en Instagram
        const kp = aparece(L, 4.0, c.dur, 0.7, E.elastico);
        if (kp > 0.001) {
          const aplasta = 1 - Math.min(kp, 1);
          ctx.save();
          ctx.translate(755, 830);
          ctx.rotate(aplasta * 0.2 + 0.015);
          ctx.scale(kp * (1 + aplasta * 0.3), kp);
          ctx.translate(-755, -830);
          A.post(ctx, 500, 490, 510, c.t, {
            likes: Math.floor(E.salida(U.tramo(4.7, 6.1, L)) * 1284),
            meGusta: U.tramo(4.7, 5.0, L),
          });
          ctx.restore();
          A.pildora(ctx, 800, 1196, 'LISTO PARA PUBLICAR', -0.05, aparece(L, 4.5, c.dur, 0.5, E.elastico));
        }
      },
    },

    /* 4 · LLENA MÁS — le encuentran, reservan y el bar se llena */
    {
      id: 'resultado', nombre: 'Llena más', dur: 6.5, fondo: 'cobalto',
      titular: [{ txt: 'PUBLICA' }, { txt: 'menos,', serif: true }, { txt: 'LLENA MÁS.' }],
      pie: 'Te encuentran, reservan y se llenan las mesas.',
      personaje() {
        return { x: 540, esc: 0.95, animo: 'feliz', pose: 'celebra', salto: { amp: 50, periodo: 0.7 } };
      },
      detras(ctx, c) {
        const L = c.local;
        const cl = (ini, i) => Object.assign({}, CLIENTES[i], { k: aparece(L, ini, c.dur, 0.6, E.elastico) });
        A.mesa(ctx, 200, SUELO, 0.66, aparece(L, 0.2, c.dur, 0.5, E.elastico), c.t,
          { clientes: [cl(0.7, 0), cl(1.0, 1)], consumiciones: aparece(L, 1.9, c.dur, 0.5) });
        A.mesa(ctx, 880, SUELO, 0.66, aparece(L, 0.35, c.dur, 0.5, E.elastico), c.t,
          { clientes: [cl(1.3, 2), cl(1.6, 3)], consumiciones: aparece(L, 2.2, c.dur, 0.5) });
        decor(ctx, [[600, 560, 30, 44, 0.8, 0.6], [60, 880, 28, 40, 0.6, 0.8]], c);
      },
      delante(ctx, c) {
        const avisos = [
          [1.2, 'Nueva reserva · 4 personas', 60, 545, false, 'calendario'],
          [2.1, 'Mesa para 2 · 21:30', 1020, 625, true, 'calendario'],
          [3.0, '+248 Me gusta', 60, 705, false, 'corazon'],
        ];
        for (const [ini, txt, x, y, der, icono] of avisos) {
          A.notificacion(ctx, x, y, txt, aparece(c.local, ini, c.dur, 0.6, E.elastico), c.t,
            { der, icono, rot: der ? 0.025 : -0.02 });
        }
        S.pegatinaNuevo(ctx, 960, 830, 72, 0.18 + Math.sin(c.t * 3) * 0.04,
          aparece(c.local, 0.9, c.dur, 0.5, E.elastico), 'LLENO');
      },
    },

    /* 5 · CIERRE — marca */
    {
      id: 'cierre', nombre: 'Society', dur: 5, fondo: 'papel',
      wipe: { x: 540, y: 700, ini: 0, fin: 0.9 },
      personaje() {
        return { x: 540, esc: 0.72, animo: 'feliz', pose: 'saluda' };
      },
      detras(ctx, c) {
        decor(ctx, [[150, 400, 44, 62, 1, 0.8], [960, 650, 36, 52, 0.8, 1.0], [120, 740, 26, 38, 0.6, 1.2]], c);
      },
      delante(ctx, c) {
        const L = c.local;
        const kl = aparece(L, 0.35, c.dur, 0.6);
        if (kl > 0.001) {
          ctx.save();
          ctx.translate(540, 560);
          ctx.scale(kl * (1 + (1 - Math.min(kl, 1)) * 0.3), kl);
          S.logo(ctx, 0, 0, 230, C.tinta, E.salida(U.tramo(0.8, 1.4, L)));
          ctx.restore();
        }
        const kb = aparece(L, 1.1, c.dur, 0.6, E.elastico);
        if (kb > 0.001) S.bocadillo(ctx, 868, 330, 3.3 * kb, { troquel: true });

        const kt = aparece(L, 1.0, c.dur, 0.5, E.salida);
        if (kt > 0.001) {
          ctx.save();
          ctx.globalAlpha = U.clamp(kt, 0, 1);
          ctx.textAlign = 'center';
          ctx.fillStyle = C.tinta;
          ctx.font = F.ui(42, 700);
          ctx.fillText('Tu agencia de marketing con IA', 540, 690 + (1 - kt) * 20);
          ctx.fillStyle = C.tintaSuave;
          ctx.font = F.ui(34, 500);
          ctx.fillText('para bares y restaurantes', 540, 742 + (1 - kt) * 20);
          ctx.restore();
        }
        const kBtn = aparece(L, 1.5, c.dur, 0.6, E.elastico);
        if (kBtn > 0.001) {
          const late = 1 + Math.sin(c.t * 4) * 0.03;
          S.botonMostaza(ctx, 540, 850, 520 * kBtn * late, 104 * kBtn * late, 'EMPIEZA HOY');
        }
      },
    },
  ];

  // tiempos absolutos de inicio
  let acum = 0;
  for (const e of ESCENAS) { e.ini = acum; acum += e.dur; }
  const DURACION = acum;

  function indice(t) {
    for (let i = ESCENAS.length - 1; i >= 0; i--) if (t >= ESCENAS[i].ini) return i;
    return 0;
  }

  /* ====================================================================== dibujo */

  /** Fondo plano o transición circular (el cobalto "se abre" desde el bocadillo). */
  function fondo(ctx, i, local) {
    const esc = ESCENAS[i];
    const prev = ESCENAS[(i + ESCENAS.length - 1) % ESCENAS.length];
    const w = esc.wipe;
    if (w && prev.fondo !== esc.fondo && local < w.fin) {
      ctx.fillStyle = colorFondo(prev.fondo);
      ctx.fillRect(0, 0, W, H);
      const p = E.salida(U.tramo(w.ini, w.fin, local));
      if (p > 0) {
        const rMax = Math.hypot(Math.max(w.x, W - w.x), Math.max(w.y, H - w.y));
        ctx.beginPath();
        ctx.arc(w.x, w.y, rMax * p, 0, Math.PI * 2);
        ctx.fillStyle = colorFondo(esc.fondo);
        ctx.fill();
        ctx.lineWidth = 12;
        ctx.strokeStyle = C.tinta;
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = colorFondo(esc.fondo);
      ctx.fillRect(0, 0, W, H);
    }
  }

  /** Estado del personaje, con transición (caminando a saltitos) entre escenas. */
  function estadoPersonaje(i, local) {
    const esc = ESCENAS[i];
    const e = Object.assign({ camina: false, salto: null, dy: 0 }, esc.personaje(local, esc.dur));
    if (i > 0) {
      const ant = ESCENAS[i - 1];
      const pr = ant.personaje(ant.dur, ant.dur);
      const p = U.tramo(0, 0.7, local);
      if (p < 1) {
        const k = E.entradaSalida(p);
        if (Math.abs(e.x - pr.x) > 20) {
          e.camina = true;
          e.salto = e.salto || { amp: 35, periodo: 0.35 };
        }
        e.x = U.lerp(pr.x, e.x, k);
        e.esc = U.lerp(pr.esc, e.esc, k);
      }
    }
    e.suelo = SUELO + e.dy;
    e.mira = raton.activo ? { x: raton.x, y: raton.y } : null;
    return e;
  }

  function dibujar(ctx, t) {
    tActual = t;
    const i = indice(t), esc = ESCENAS[i], local = t - esc.ini;
    fondo(ctx, i, local);
    ctx.drawImage(S.Fondo.textura(), 0, 0, W, H);

    const c = { t, local, dur: esc.dur, tinta: colorTexto(esc.fondo), acento: colorAcento(esc.fondo) };
    if (esc.detras) esc.detras(ctx, c);
    if (esc.titular) {
      const r = esc.retardoTitular || 0;
      S.titular(ctx, esc.titular, local - r, esc.dur - r, c.tinta);
    }
    pj.dibujar(ctx, estadoPersonaje(i, local), t);
    if (esc.delante) esc.delante(ctx, c);
    part.dibujar(ctx);
    if (esc.pie) pie(ctx, esc.pie, c);
  }

  /* ====================================================================== lógica */

  function actualizar(dt, t, reproduciendo) {
    pj.actualizar(dt);
    part.actualizar(dt);

    // paralaje suavizado hacia la posición del ratón
    const k = Math.min(1, dt * 6);
    par.x += ((raton.activo ? (raton.x - W / 2) * -0.05 : 0) - par.x) * k;
    par.y += ((raton.activo ? (raton.y - H / 2) * -0.05 : 0) - par.y) * k;

    // corazones que suben del bar lleno
    const i = indice(t), esc = ESCENAS[i], local = t - esc.ini;
    if (reproduciendo && esc.id === 'resultado' && local > 1 && local < esc.dur - 0.6) {
      acumulado += dt * 7;
      while (acumulado >= 1) {
        acumulado -= 1;
        const origen = [120, 250, 830, 960, 540][Math.floor(Math.random() * 5)];
        part.emitir({
          tipo: 'corazon',
          x: origen + (Math.random() - 0.5) * 60,
          y: 1000 + Math.random() * 80,
          vx: (Math.random() - 0.5) * 40,
          vy: -260 - Math.random() * 160,
          g: -60, arrastre: 0.3, balanceo: 70,
          rot: (Math.random() - 0.5) * 0.5,
          dur: 2 + Math.random(),
          tam: 26 + Math.random() * 18,
          color: Math.random() < 0.5 ? C.papel : C.mostaza,
        });
      }
    }
  }

  function fondoActual() { return ESCENAS[indice(tActual)].fondo; }

  /** Clic: sobre el personaje, salta; en otro sitio, ráfaga de «me gusta». */
  function clic(x, y) {
    const colores = fondoActual() === 'cobalto' ? [C.papel, C.mostaza] : [C.cobalto, C.mostaza];
    if (pj.contiene(x, y)) {
      pj.saltar(1);
      part.rafaga(x, y, 14, colores);
    } else {
      part.rafaga(x, y, 10, colores);
    }
  }

  /** Movimiento del ratón: mirada, paralaje y una estela de destellos. */
  function moverRaton(x, y, activo) {
    raton.activo = activo;
    if (!activo) return;
    raton.x = x;
    raton.y = y;
    if (Math.hypot(x - raton.rx, y - raton.ry) > 60) {
      raton.rx = x;
      raton.ry = y;
      part.emitir({
        tipo: 'destello', x, y,
        vx: (Math.random() - 0.5) * 60, vy: -40,
        g: 160, dur: 0.5, tam: 14 + Math.random() * 10,
        color: colorAcento(fondoActual()),
      });
    }
  }

  function reiniciar() {
    part.vaciar();
    pj.reiniciar();
    acumulado = 0;
  }

  S.Escenas = {
    duracion: DURACION,
    capitulos: ESCENAS.map(e => ({ nombre: e.nombre, ini: e.ini })),
    indice,
    colorFondoEn: t => colorFondo(ESCENAS[indice(t)].fondo),
    dibujar, actualizar, clic, moverRaton, reiniciar,
  };
})(window.Society);
