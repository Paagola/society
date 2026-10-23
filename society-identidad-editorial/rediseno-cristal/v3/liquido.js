// Cristal líquido para las maquetas (no es código de la app).
// A cada elemento .liquido le añade dos capas por detrás de su contenido:
//  · .lente: recoge el fondo con un margen extra y lo dobla en los bordes con un mapa de
//    desplazamiento de su misma forma, como el canto de una lente. Así el fondo de fuera
//    entra curvado por el borde, igual que en el Liquid Glass de Apple.
//  · .brillo: velo de esmerilado, reflejo especular y canto de luz.
// Solo funciona en Chromium (backdrop-filter con url()).
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  document.body.appendChild(svg);

  // Mapa de desplazamiento: neutro (128) en el centro; en el bisel apunta hacia fuera,
  // con más fuerza cuanto más cerca del canto.
  function mapa(W, H, P, w, h, r, bisel) {
    const k = 2;
    const cw = Math.round(W * k), ch = Math.round(H * k);
    const c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const ctx = c.getContext('2d'); const img = ctx.createImageData(cw, ch); const d = img.data;
    const hx = w / 2, hy = h / 2, rr = Math.min(r, hx, hy);
    const sdf = (x, y) => {
      const qx = Math.abs(x - P - hx) - (hx - rr), qy = Math.abs(y - P - hy) - (hy - rr);
      return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rr;
    };
    for (let j = 0; j < ch; j++) for (let i = 0; i < cw; i++) {
      const x = (i + .5) / k, y = (j + .5) / k, s = sdf(x, y), o = (j * cw + i) * 4;
      let dx = 0, dy = 0;
      if (s < 0 && -s < bisel) {
        const e = .5, nx = sdf(x + e, y) - sdf(x - e, y), ny = sdf(x, y + e) - sdf(x, y - e);
        const l = Math.hypot(nx, ny) || 1, t = 1 + s / bisel; // 1 en el canto, 0 al final del bisel
        const m = Math.pow(t, 2.4);
        dx = nx / l * m; dy = ny / l * m; // hacia fuera
      }
      d[o] = Math.round(128 + dx * 127); d[o + 1] = Math.round(128 + dy * 127); d[o + 2] = 128; d[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0); return c.toDataURL();
  }

  // Máscara con la forma exacta (clip-path no redondea bien el fondo filtrado en Chromium)
  function mascara(W, H, P, w, h, r) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}'><rect x='${P}' y='${P}' width='${w}' height='${h}' rx='${r}' fill='#000'/></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  let n = 0;
  document.querySelectorAll('.liquido').forEach(el => {
    const cs = getComputedStyle(el);
    const w = el.offsetWidth, h = el.offsetHeight;
    const r = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, w / 2, h / 2);
    const v = (p, def) => { const x = cs.getPropertyValue(p).trim(); return x ? parseFloat(x) : def; };
    const bisel = v('--bisel', Math.min(26, h / 2.2));
    const escala = v('--refraccion', 44);
    const desen = v('--desenfoque', 6);
    const P = Math.ceil(Math.abs(escala) / 2) + 4;
    const W = w + 2 * P, H = h + 2 * P;
    const bl = parseFloat(cs.borderLeftWidth) || 0, bt = parseFloat(cs.borderTopWidth) || 0;

    const id = 'lente' + (n++);
    const f = document.createElementNS(NS, 'filter');
    f.setAttribute('id', id);
    f.setAttribute('x', '0'); f.setAttribute('y', '0'); f.setAttribute('width', W); f.setAttribute('height', H);
    f.setAttribute('filterUnits', 'userSpaceOnUse'); f.setAttribute('primitiveUnits', 'userSpaceOnUse');
    f.setAttribute('color-interpolation-filters', 'sRGB');
    f.innerHTML = `<feImage href="${mapa(W, H, P, w, h, r, bisel)}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none" result="m"/>
      <feDisplacementMap in="SourceGraphic" in2="m" scale="${escala}" xChannelSelector="R" yChannelSelector="G"/>`;
    svg.appendChild(f);

    if (cs.position === 'static') el.style.position = 'relative';
    if (cs.zIndex === 'auto') el.style.zIndex = '0';
    const lente = document.createElement('i');
    lente.className = 'lente';
    lente.style.cssText = `position:absolute;left:${-P - bl}px;top:${-P - bt}px;width:${W}px;height:${H}px;` +
      `-webkit-mask:url("${mascara(W, H, P, w, h, r)}") 0 0/100% 100% no-repeat;mask:url("${mascara(W, H, P, w, h, r)}") 0 0/100% 100% no-repeat;z-index:-2;pointer-events:none;` +
      `backdrop-filter:${desen ? 'blur(' + desen + 'px) ' : ''}url(#${id}) saturate(var(--saturacion,170%)) brightness(var(--brillo,1.03))`;
    const brillo = document.createElement('i');
    brillo.className = 'brillo';
    brillo.style.cssText = `position:absolute;inset:${-bt}px ${-bl}px;border-radius:${r}px;z-index:-1;pointer-events:none`;
    el.prepend(brillo); el.prepend(lente);
  });
  window.lentesListas = true;
})();
