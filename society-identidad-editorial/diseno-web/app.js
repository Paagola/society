/* Manual de la app Society · comportamiento del prototipo.
   Maqueta de la especificación, no código de la app. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Piezas que se repiten en todas las pantallas ------------------------ */
  const ESTADO_HTML = '<span class="estado__hora">9:41</span><span class="estado__isla"></span>' +
    '<svg class="estado__iconos" viewBox="0 0 76 13"><use href="#i-estado"/></svg>';
  $$('.estado').forEach(n => { n.innerHTML = ESTADO_HTML; n.setAttribute('aria-hidden', 'true'); });

  const PESTANAS = [
    ['inicio', 'Inicio', 'i-inicio'],
    ['local', 'Local', 'i-pin'],
    ['semana', 'Semana', 'i-calendario'],
    ['resultados', 'Resultados', 'i-resultados'],
    ['perfil', 'Perfil', 'i-perfil'],
  ];
  $$('.pestanas').forEach(n => {
    const activa = n.dataset.activa;
    const botones = PESTANAS.map(([id, texto, icono]) =>
      `<button class="pestana" type="button" data-ir="${id}"${id === activa ? ' aria-current="page"' : ''}>` +
      `<span class="pestana__icono"><svg aria-hidden="true"><use href="#${icono}"/></svg></span>${texto}</button>`);
    // Versión estudio: botón de crear en el centro de la barra
    if ('crear' in n.dataset) {
      botones.splice(2, 0, '<button class="pestana pestana--crear" type="button" data-ir="que-hay-hoy" aria-label="Crear una pieza">' +
        '<span class="pestana__icono"><svg aria-hidden="true"><use href="#i-mas"/></svg></span></button>');
    }
    n.innerHTML = botones.join('');
  });

  // La lámina es la pieza publicada: el mismo contenido sirve para los cuatro estilos.
  const LAMINA_HTML =
    '<img class="lamina__foto" data-solo="foto" src="img/alcachofas-color.webp" alt="" width="580" height="600">' +
    '<span class="lamina__feed" data-solo="feed"><img src="img/plato-cobalto.webp" alt="" width="400" height="267"><img src="img/plato-trama.webp" alt="" width="720" height="481"></span>' +
    '<img class="lamina__plato" data-solo="papel" src="img/plato-trama.webp" alt="" width="720" height="481">' +
    '<img class="lamina__plato" data-solo="cobalto" src="img/plato-cobalto.webp" alt="" width="400" height="267">' +
    '<span class="lamina__titulo"><span class="lamina__l1">ALCACHOFAS</span><span class="lamina__l2"><span>a la</span><span>BRASA</span></span></span>' +
    '<svg class="lamina__destello" data-solo="papel cobalto feed" viewBox="0 0 40 52"><use href="#i-destello"/></svg>';
  const NOMBRE_ESTILO = { papel: 'póster de papel', cobalto: 'póster cobalto', foto: 'foto', feed: 'feed' };
  function etiquetarLamina(l) {
    if (!l.dataset.estilo) return;
    l.setAttribute('role', 'img');
    l.setAttribute('aria-label', `Pieza «Alcachofas a la brasa», estilo ${NOMBRE_ESTILO[l.dataset.estilo]}`);
  }
  $$('.lamina').forEach(l => {
    if (l.dataset.estilo && !l.children.length) l.innerHTML = LAMINA_HTML;
    etiquetarLamina(l);
  });

  /* 2. Estado compartido: lo que se elige en una pantalla se ve en las demás - */
  const estado = { estilo: 'papel', formato: 'post', texto: 'Hoy tenemos alcachofas\na la brasa' };
  const frase = t => {
    const s = t.replace(/\s+/g, ' ').trim();
    if (!s) return '';
    const c = s.charAt(0).toUpperCase() + s.slice(1);
    return /[.!?…]$/.test(c) ? c : c + '.';
  };

  function aplicar(origen) {
    $$('.post:not([data-fijo])').forEach(p => {
      p.dataset.formato = estado.formato;
      const l = $('.lamina', p);
      if (l) { l.dataset.estilo = estado.estilo; etiquetarLamina(l); }
    });
    $$('.estilo[data-estilo]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.estilo === estado.estilo)));
    $$('.chip[data-formato]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.formato === estado.formato)));
    $$('textarea[data-texto-hoy]').forEach(t => {
      if (t !== origen && t.value !== estado.texto) t.value = estado.texto;
      const campo = t.closest('.campo');
      if (campo) campo.classList.toggle('es-error', t.value.length >= 300);
    });
    $$('[data-contador]').forEach(n => { n.textContent = estado.texto.length; });
    $$('[data-pie-texto]').forEach(n => { n.textContent = frase(estado.texto) || '…'; });
    $$('[data-requiere-texto]').forEach(b => { b.disabled = !estado.texto.trim(); });
  }
  aplicar();

  /* 3. El escenario: un solo móvil con todas las pantallas ---------------- */
  const movil = $('#movil');
  const escenarioMovil = $('#escenario-movil');
  const originales = new Map($$('.pantalla[data-pantalla]', movil).map(p => [p.dataset.pantalla, p]));
  const orden = [...originales.keys()];
  let actual = 'bienvenida';

  function escalar() {
    const completa = document.fullscreenElement === escenarioMovil;
    const ancho = document.documentElement.clientWidth;
    let z;
    if (completa) z = Math.min(1, (window.innerHeight - 90) / 844, (window.innerWidth - 32) / 390);
    else if (ancho > 820) z = Math.min(1, (window.innerHeight - 150) / 844);
    else z = Math.min(1, (ancho - 32) / 390);
    movil.style.setProperty('--z', Math.max(.45, z).toFixed(3));
  }
  escalar();
  window.addEventListener('resize', escalar);
  document.addEventListener('fullscreenchange', escalar);

  function mostrar(id, { animar = true } = {}) {
    const nueva = originales.get(id);
    if (!nueva) return;
    const vieja = originales.get(actual);
    if (vieja && vieja !== nueva) { cerrarHojas(vieja); vieja.hidden = true; }
    nueva.hidden = false;
    const desliza = $('.pantalla__desliza', nueva);
    if (desliza) desliza.scrollTop = 0;
    if (animar && !reducir) {
      nueva.classList.remove('es-entrando');
      void nueva.offsetWidth;
      nueva.classList.add('es-entrando');
    }
    actual = id;
    $$('[data-ver]').forEach(b => {
      if (b.closest('.lista-pantallas')) {
        if (b.dataset.ver === id) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      }
    });
    $$('.escenario__ficha .ficha').forEach(f => { f.hidden = f.dataset.para !== id; });
    const ficha = $('.escenario__ficha');
    if (ficha) ficha.scrollTop = 0;
    const cinta = $('[data-cinta]:not(.pantalla)');
    if (cinta) cinta.textContent = `${nueva.dataset.nombre} · ${nueva.dataset.cinta.replace(/^390 × 844 · /, '')}`;
    aplicar();
  }

  // Tablero: copias quietas de cada pantalla
  function clonar(id) {
    const o = originales.get(id);
    if (!o) return null;
    const c = o.cloneNode(true);
    c.removeAttribute('id');
    c.hidden = false;
    c.classList.remove('es-entrando');
    $$('[id]', c).forEach(n => n.removeAttribute('id'));
    $$('[data-hoja], [data-velo], [data-aviso]', c).forEach(n => { n.hidden = true; });
    c.inert = true;
    c.setAttribute('aria-hidden', 'true');
    return c;
  }
  $$('[data-tablero]').forEach(t => {
    orden.filter(id => originales.get(id).dataset.grupo === t.dataset.tablero).forEach(id => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tablero__item';
      b.dataset.ver = id;
      b.setAttribute('aria-label', `Abrir ${originales.get(id).dataset.nombre} en el prototipo`);
      const m = document.createElement('div');
      m.className = 'movil';
      m.append(clonar(id));
      const s = document.createElement('span');
      s.textContent = originales.get(id).dataset.nombre;
      b.append(m, s);
      t.append(b);
    });
  });
  // Copias quietas para comparar versiones
  $$('[data-copia]').forEach(n => {
    const c = clonar(n.dataset.copia);
    if (!c) return;
    const m = document.createElement('div');
    m.className = 'movil';
    m.append(c);
    n.append(m);
  });
  // Enlaces a la otra versión: archivo local o página publicada
  if (location.protocol !== 'file:') $$('a[data-v1], a[data-v2]').forEach(a => { a.href = a.dataset.v1 || a.dataset.v2; a.target = '_blank'; a.rel = 'noopener'; });

  /* 5. Hojas, avisos y navegación ------------------------------------------ */
  const enPrototipo = p => !!(p && p.closest('#movil'));

  function abrirHoja(p, nombre) {
    const hoja = $(`[data-hoja="${nombre}"]`, p);
    if (!hoja) return;
    const velo = $('[data-velo]', p);
    if (velo) velo.hidden = false;
    hoja.hidden = false;
    const primero = $('button', hoja);
    if (primero) primero.focus({ preventScroll: true });
  }
  function cerrarHojas(p) {
    if (p) $$('[data-hoja], [data-velo]', p).forEach(n => { n.hidden = true; });
  }
  function avisar(p, texto, luego) {
    let a = $('[data-aviso]', p);
    if (!a) {
      a = document.createElement('div');
      a.className = 'aviso';
      a.dataset.aviso = '';
      a.innerHTML = '<span class="aviso__icono"><svg aria-hidden="true"><use href="#i-check"/></svg></span><span data-aviso-texto></span>';
      p.append(a);
    }
    $('[data-aviso-texto]', a).textContent = texto;
    a.setAttribute('role', 'status');
    a.hidden = false;
    clearTimeout(a._espera);
    a._espera = setTimeout(() => { a.hidden = true; if (luego) luego(); }, luego ? 1500 : 2600);
  }

  function navegar(destino, p) {
    cerrarHojas(p);
    if (p && p.closest('#movil')) mostrar(destino);
  }

  const PLANES = {
    local: { nombre: 'Local', base: '', incluye: [
      'Ficha de Google al día: datos, horarios, fotos, publicaciones y carta',
      'Borradores de respuesta a tus reseñas, que apruebas tú',
      'Diagnóstico de tu presencia al empezar',
      'Informe de lo que pasa en tu ficha'] },
    redes: { nombre: 'Redes', base: 'Todo lo de Local, y además:', incluye: [
      'Posts, carruseles e historias en Instagram',
      'Tus fichas en otros sitios, como TripAdvisor',
      'Estilo de marca elegido con tu propio plato',
      'Poco vídeo, sobre todo en historias'] },
    reels: { nombre: 'Reels', base: 'Todo lo de Redes, y además:', incluye: [
      'Reels cada mes: el formato principal',
      'Prueba de voz para la locución',
      'Subtítulos medidos sobre la voz'] },
  };
  function abrirPlan(p, id) {
    const d = PLANES[id];
    const hoja = $('[data-hoja="plan"]', p);
    if (!d || !hoja) return;
    hoja.innerHTML =
      `<p class="hoja__titulo"><span class="t-anton">${d.nombre.toUpperCase()}</span></p>` +
      (d.base ? `<p class="hoja__precio" style="margin-bottom:8px">${d.base}</p>` : '') +
      `<ul class="hoja__lista">${d.incluye.map(x => `<li><svg aria-hidden="true"><use href="#i-check"/></svg>${x}</li>`).join('')}</ul>` +
      '<p class="hoja__precio">Precio y cuotas: por decidir.</p>' +
      `<button class="boton boton--principal boton--ancho" type="button" data-elegir-plan="${id}">Elegir ${d.nombre.toLowerCase()}</button>`;
    abrirHoja(p, 'plan');
  }
  function elegirPlan(p, id) {
    cerrarHojas(p);
    const siguiente = id === 'local' ? 'inicio' : 'que-hay-hoy';
    avisar(p, `Pago confirmado. Plan ${PLANES[id].nombre} activo.`, enPrototipo(p) ? () => navegar(siguiente, p) : null);
  }
  function publicarPieza(p, b) {
    const programar = $('[data-cuando="programar"]', p);
    const esProgramar = programar && programar.getAttribute('aria-checked') === 'true';
    b.classList.add('es-cargando');
    setTimeout(() => {
      b.classList.remove('es-cargando');
      cerrarHojas(p);
      avisar(p, esProgramar ? 'Programada para el jueves a las 19:30.' : 'Publicado en Instagram. Primera medición en 24 h.',
        enPrototipo(p) ? () => navegar('inicio', p) : null);
    }, 900);
  }

  function conmutar(sw) {
    const fila = sw.closest('.red');
    const encendido = sw.getAttribute('aria-checked') === 'true';
    if (!fila) { sw.setAttribute('aria-checked', String(!encendido)); return; }
    const texto = $('.red__estado', fila);
    if (encendido) { sw.setAttribute('aria-checked', 'false'); fila.dataset.estado = 'sin-conectar'; return; }
    sw.classList.add('es-cargando');
    fila.dataset.estado = 'conectando';
    if (texto) texto.textContent = 'Conectando…';
    setTimeout(() => {
      sw.classList.remove('es-cargando');
      sw.setAttribute('aria-checked', 'true');
      fila.dataset.estado = 'conectada';
      if (texto) texto.textContent = 'Conectada como @tu_local';
    }, 900);
  }

  function buscar(i) {
    const p = i.closest('.pantalla');
    if (!p) return;
    const largo = i.value.trim().length;
    const r = $('[data-resultados]', p), a = $('[data-ayuda]', p), x = $('[data-borrar]', p);
    if (r) r.hidden = largo < 3;
    if (a) a.hidden = largo >= 3;
    if (x) x.hidden = largo === 0;
  }

  function filtrarDia(p, dia) {
    const activo = dia.getAttribute('aria-pressed') === 'true';
    $$('.dia', p).forEach(d => d.setAttribute('aria-pressed', 'false'));
    if (!activo) dia.setAttribute('aria-pressed', 'true');
    const filtro = activo ? null : dia.dataset.dia;
    let visibles = 0;
    $$('.pieza[data-dia]', p).forEach(pz => {
      pz.hidden = !!filtro && pz.dataset.dia !== filtro;
      if (!pz.hidden) visibles++;
    });
    const vacio = $('[data-sin-piezas]', p);
    if (vacio) vacio.hidden = visibles > 0;
  }
  function aprobarPieza(pz) {
    if (!pz) return;
    const chip = $('.estado-pieza', pz);
    const b = $('[data-aprobar]', pz);
    if (chip) {
      chip.className = 'estado-pieza estado-pieza--programada';
      chip.innerHTML = '<svg aria-hidden="true"><use href="#i-reloj"/></svg>Programada';
    }
    if (b) b.remove();
  }
  function recontar(p) {
    const b = p && $('[data-aprobar-todo]', p);
    if (!b) return;
    const n = $$('[data-aprobar]', p).length;
    b.textContent = n ? `Aprobar la semana (${n})` : 'Semana aprobada';
    b.disabled = !n;
  }

  /* 6. Pasos, pantalla completa y enlace directo -------------------------- */
  function paso(delta) {
    const i = orden.indexOf(actual);
    mostrar(orden[(i + delta + orden.length) % orden.length]);
  }
  function completa() {
    if (document.fullscreenElement) { document.exitFullscreen().catch(() => {}); return; }
    if (escenarioMovil.requestFullscreen) escenarioMovil.requestFullscreen().catch(() => {});
  }
  const inicial = location.hash.replace(/^#app-/, '');
  mostrar(originales.has(inicial) ? inicial : 'bienvenida', { animar: false });
  if (originales.has(inicial)) escenarioMovil.scrollIntoView({ block: 'start' });

  /* 7. Desliza para empezar: arrastrar el pomo hasta el final ------------- */
  let sinClick = false;
  document.addEventListener('pointerdown', e => {
    const pomo = e.target instanceof Element && e.target.closest('.deslizar__pomo');
    if (!pomo) return;
    const pista = pomo.closest('.deslizar');
    const z = parseFloat(getComputedStyle(pista.closest('.movil') || pista).getPropertyValue('--z')) || 1;
    const max = pista.clientWidth - pomo.offsetWidth - 12;
    const x0 = e.clientX;
    let dx = 0;
    pomo.setPointerCapture(e.pointerId);
    pista.classList.add('es-arrastrando');
    const mover = ev => {
      dx = Math.max(0, Math.min(max, (ev.clientX - x0) / z));
      pomo.style.transform = `translateX(${dx}px)`;
      pista.style.setProperty('--avance', (dx / max).toFixed(3));
    };
    const soltar = () => {
      pomo.removeEventListener('pointermove', mover);
      pista.classList.remove('es-arrastrando');
      if (dx > 4) sinClick = true;
      if (dx > max * .7) {
        pomo.style.transform = `translateX(${max}px)`;
        setTimeout(() => {
          navegar(pista.dataset.ir, pista.closest('.pantalla'));
          pomo.style.transform = '';
          pista.style.removeProperty('--avance');
        }, 180);
      } else {
        pomo.style.transform = '';
        pista.style.removeProperty('--avance');
      }
    };
    pomo.addEventListener('pointermove', mover);
    pomo.addEventListener('pointerup', soltar, { once: true });
    pomo.addEventListener('pointercancel', soltar, { once: true });
  });

  /* 8. Un solo escuchador para todos los toques ---------------------------- */
  document.addEventListener('click', e => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (sinClick) { sinClick = false; if (t.closest('.deslizar')) return; }
    const p = t.closest('.pantalla');

    const ver = t.closest('[data-ver]');
    if (ver) {
      mostrar(ver.dataset.ver);
      if (ver.closest('.tablero')) $('#prototipo').scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    const pasoBoton = t.closest('[data-paso]');
    if (pasoBoton) { paso(Number(pasoBoton.dataset.paso)); return; }
    if (t.closest('[data-completa]')) { completa(); return; }

    const modo = t.closest('[data-modo]');
    if (modo) {
      document.body.dataset.appModo = modo.dataset.modo;
      $$('[data-modo]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.modo === modo.dataset.modo)));
      return;
    }

    const radio = t.closest('[role="radio"]');
    if (radio && !radio.disabled) {
      if (radio.dataset.estilo) { estado.estilo = radio.dataset.estilo; aplicar(); return; }
      if (radio.dataset.formato) { estado.formato = radio.dataset.formato; aplicar(); return; }
      const grupo = radio.closest('[role="radiogroup"]');
      if (grupo) $$('[role="radio"]', grupo).forEach(r => r.setAttribute('aria-checked', String(r === radio)));
      if (radio.dataset.cuando && p) {
        const texto = $('[data-publicar] .boton__texto', p);
        if (texto) texto.textContent = radio.dataset.cuando === 'ahora' ? 'Publicar ahora' : 'Programar';
      }
      return;
    }

    const sw = t.closest('button.interruptor');
    if (sw && !sw.disabled) { conmutar(sw); return; }

    if (!p) return;

    const plan = t.closest('.plan[data-plan]');
    if (plan) { abrirPlan(p, plan.dataset.plan); return; }
    const abrir = t.closest('[data-abrir]');
    if (abrir) { abrirHoja(p, abrir.dataset.abrir); return; }
    if (t.closest('.velo') || t.closest('[data-cerrar-hoja]')) { cerrarHojas(p); return; }
    const elegir = t.closest('[data-elegir-plan]');
    if (elegir) { elegirPlan(p, elegir.dataset.elegirPlan); return; }
    const publicar = t.closest('[data-publicar]');
    if (publicar) { publicarPieza(p, publicar); return; }
    if (t.closest('[data-borrar]')) {
      const i = $('[data-buscador]', p);
      if (i) { i.value = ''; buscar(i); i.focus({ preventScroll: true }); }
      return;
    }
    const dia = t.closest('.dia');
    if (dia) { filtrarDia(p, dia); return; }
    const aprobar = t.closest('[data-aprobar]');
    if (aprobar) { aprobarPieza(aprobar.closest('.pieza')); recontar(p); return; }
    if (t.closest('[data-aprobar-todo]')) {
      $$('[data-aprobar]', p).forEach(b => aprobarPieza(b.closest('.pieza')));
      recontar(p);
      return;
    }
    const ir = t.closest('[data-ir]');
    if (ir) { navegar(ir.dataset.ir, p); return; }

    const boton = t.closest('button');
    if (boton && !boton.disabled) avisar(p, boton.dataset.nota || 'Esta parte está por diseñar.');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarHojas(originales.get(actual));
  });

  document.addEventListener('input', e => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.matches('textarea[data-texto-hoy]')) { estado.texto = t.value; aplicar(t); }
    else if (t.matches('input[data-buscador]')) buscar(t);
  });

  /* 9. Sección actual en la barra superior -------------------------------- */
  const nav = $('.barra nav');
  const enlaces = new Map($$('.barra nav a').map(a => [a.getAttribute('href').slice(1), a]));
  const vigia = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    enlaces.forEach(a => a.classList.remove('es-actual'));
    const a = enlaces.get(e.target.id);
    if (!a) return;
    a.classList.add('es-actual');
    if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: a.offsetLeft - 24, behavior: reducir ? 'auto' : 'smooth' });
  }), { rootMargin: '-45% 0px -50% 0px' });
  enlaces.forEach((a, id) => { const s = document.getElementById(id); if (s) vigia.observe(s); });
})();
