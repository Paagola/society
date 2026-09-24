/* ==========================================================================
   Society · Animación — motor
   · Bucle requestAnimationFrame con delta time (recortado para que un
     tirón o volver a la pestaña no haga saltar la animación).
   · El lienzo se adapta al contenedor con ResizeObserver y devicePixelRatio;
     la escena lógica 1080 × 1350 se encaja centrada ("contain").
   · Controles: play/pausa, reiniciar, línea de tiempo arrastrable,
     capítulos y atajos de teclado. En pausa la historia se congela, pero
     Cortado sigue mirando al ratón y reaccionando a los clics.
   · Depuración: #t=12 en la URL abre la animación pausada en el segundo 12.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U, W, H } = S;
  const DUR = S.Escenas.duracion;

  const $ = id => document.getElementById(id);
  const escenario = $('escenario');
  const lienzo = $('lienzo');
  const ctx = lienzo.getContext('2d', { alpha: false });
  const btnPlay = $('btn-play');
  const btnReiniciar = $('btn-reiniciar');
  const linea = $('linea');
  const relleno = $('linea-relleno');
  const marcas = $('linea-marcas');
  const tiempoEl = $('tiempo');
  const listaCap = $('capitulos');
  const carga = $('carga');

  const est = {
    t: 0,
    reproduciendo: true,
    ultimo: 0,
    dpr: 1, escala: 1, ox: 0, oy: 0,
    fps: 60, verFps: false,
    capitulo: -1, segundo: -1,
  };

  /* ---------------------------------------------------------------- tamaño */

  function redimensionar() {
    const r = escenario.getBoundingClientRect();
    est.dpr = Math.min(window.devicePixelRatio || 1, 2); // más de 2× no se nota y cuesta
    lienzo.width = Math.max(1, Math.round(r.width * est.dpr));
    lienzo.height = Math.max(1, Math.round(r.height * est.dpr));
    est.escala = Math.min(r.width / W, r.height / H);
    est.ox = (r.width - W * est.escala) / 2;
    est.oy = (r.height - H * est.escala) / 2;
  }
  new ResizeObserver(redimensionar).observe(escenario);

  /** Coordenadas del puntero → coordenadas lógicas de la escena. */
  function aLogico(e) {
    const r = lienzo.getBoundingClientRect();
    return {
      x: (e.clientX - r.left - est.ox) / est.escala,
      y: (e.clientY - r.top - est.oy) / est.escala,
    };
  }

  /* ---------------------------------------------------------------- bucle */

  function cuadro(ahora) {
    const dt = est.ultimo ? Math.min((ahora - est.ultimo) / 1000, 1 / 20) : 1 / 60;
    est.ultimo = ahora;
    est.fps = U.lerp(est.fps, 1 / Math.max(dt, 1e-3), 0.05);

    if (est.reproduciendo) {
      est.t += dt;
      if (est.t >= DUR) est.t -= DUR; // bucle
    }
    S.Escenas.actualizar(dt, est.t, est.reproduciendo);
    pintar();
    actualizarUI();
    requestAnimationFrame(cuadro);
  }

  function pintar() {
    // fondo del "letterbox" del color de la escena
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = S.Escenas.colorFondoEn(est.t);
    ctx.fillRect(0, 0, lienzo.width, lienzo.height);

    const k = est.dpr * est.escala;
    ctx.setTransform(k, 0, 0, k, est.dpr * est.ox, est.dpr * est.oy);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.clip();
    S.Escenas.dibujar(ctx, est.t);
    ctx.restore();

    if (est.verFps) {
      ctx.fillStyle = 'rgba(20,20,20,0.8)';
      ctx.fillRect(20, 20, 150, 50);
      ctx.fillStyle = '#fff';
      ctx.font = S.F.ui(28, 700);
      ctx.fillText(`${Math.round(est.fps)} FPS`, 34, 56);
    }
  }

  /* ---------------------------------------------------------------- interfaz */

  const formato = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  function actualizarUI() {
    relleno.style.transform = `scaleX(${est.t / DUR})`;
    const seg = Math.floor(est.t);
    if (seg !== est.segundo) {
      est.segundo = seg;
      tiempoEl.textContent = `${formato(est.t)} / ${formato(DUR)}`;
      linea.setAttribute('aria-valuenow', seg);
      linea.setAttribute('aria-valuetext', `${formato(est.t)} de ${formato(DUR)}`);
    }
    const cap = S.Escenas.indice(est.t);
    if (cap !== est.capitulo) {
      est.capitulo = cap;
      listaCap.querySelectorAll('button').forEach((b, i) => {
        if (i === cap) b.setAttribute('aria-current', 'step');
        else b.removeAttribute('aria-current');
      });
    }
  }

  function ponerReproduccion(activo) {
    est.reproduciendo = activo;
    btnPlay.setAttribute('aria-pressed', String(activo));
    btnPlay.querySelector('.boton__icono').textContent = activo ? '❚❚' : '▶';
    btnPlay.querySelector('.boton__texto').textContent = activo ? 'Pausa' : 'Play';
  }

  function ir(t) {
    est.t = U.clamp(t, 0, DUR - 0.001);
  }

  function reiniciar() {
    ir(0);
    S.Escenas.reiniciar();
    ponerReproduccion(true);
  }

  // capítulos y marcas en la línea de tiempo
  S.Escenas.capitulos.forEach((c, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `${i + 1}. ${c.nombre}`;
    b.addEventListener('click', () => { ir(c.ini + 0.01); ponerReproduccion(true); });
    li.appendChild(b);
    listaCap.appendChild(li);
    if (i > 0) {
      const m = document.createElement('span');
      m.style.left = `${(c.ini / DUR) * 100}%`;
      marcas.appendChild(m);
    }
  });
  linea.setAttribute('aria-valuemax', Math.floor(DUR));

  btnPlay.addEventListener('click', () => ponerReproduccion(!est.reproduciendo));
  btnReiniciar.addEventListener('click', reiniciar);

  // línea de tiempo: clic y arrastre
  const buscar = e => {
    const r = linea.getBoundingClientRect();
    ir(((e.clientX - r.left) / r.width) * DUR);
  };
  linea.addEventListener('pointerdown', e => {
    linea.setPointerCapture(e.pointerId);
    buscar(e);
  });
  linea.addEventListener('pointermove', e => { if (linea.hasPointerCapture(e.pointerId)) buscar(e); });
  linea.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      ir(est.t + (e.key === 'ArrowRight' ? 2 : -2));
    }
  });

  // interacción con el lienzo
  lienzo.addEventListener('pointermove', e => {
    const p = aLogico(e);
    S.Escenas.moverRaton(p.x, p.y, true);
  });
  lienzo.addEventListener('pointerleave', () => S.Escenas.moverRaton(0, 0, false));
  lienzo.addEventListener('pointerdown', e => {
    const p = aLogico(e);
    S.Escenas.moverRaton(p.x, p.y, true);
    S.Escenas.clic(p.x, p.y);
  });

  // atajos de teclado (sin pisar a los botones, que ya usan Espacio)
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('button')) return;
    if (e.code === 'Space') { e.preventDefault(); ponerReproduccion(!est.reproduciendo); }
    else if (e.key === 'r' || e.key === 'R') reiniciar();
    else if (e.key === 'ArrowRight') ir(est.t + 2);
    else if (e.key === 'ArrowLeft') ir(est.t - 2);
    else if (e.key === 'f' || e.key === 'F') est.verFps = !est.verFps;
  });

  /* ---------------------------------------------------------------- arranque */

  async function cargarFuentes() {
    if (!document.fonts) return;
    const pedidos = [
      '100px Anton',
      'italic 900 100px "Playfair Display"',
      '600 30px "Schibsted Grotesk"',
    ].map(f => document.fonts.load(f));
    // si las fuentes tardan o fallan, arrancamos con las alternativas del sistema
    await Promise.race([Promise.allSettled(pedidos), new Promise(r => setTimeout(r, 2500))]);
  }

  const inicio = /(?:^|[#&])t=([\d.]+)/.exec(location.hash);
  if (inicio) { ir(parseFloat(inicio[1])); ponerReproduccion(false); }
  else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) ponerReproduccion(false);

  cargarFuentes().then(() => {
    S.reiniciarMedidas();
    S.Fondo.textura();
    carga.hidden = true;
    redimensionar();
    requestAnimationFrame(cuadro);
  });
})(window.Society);
