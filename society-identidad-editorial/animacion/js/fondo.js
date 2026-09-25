/* ==========================================================================
   Society · Animación — fondo de papel arrugado
   La textura se genera UNA vez en un canvas fuera de pantalla (manchas,
   pliegues con luz y sombra, grano y viñeta) y cada fotograma se pinta con
   un solo drawImage encima del color plano. Así vale igual sobre papel
   que sobre cobalto y no cuesta rendimiento.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U } = S;

  function crearTextura(W, H) {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const g = c.getContext('2d');
    const r = U.semilla(20260923);

    // 1. Manchas amplias de luz y sombra (volumen del papel arrugado)
    for (let i = 0; i < 70; i++) {
      const x = r() * W, y = r() * H, rad = 90 + r() * 280;
      const claro = r() < 0.5;
      const gr = g.createRadialGradient(x, y, 0, x, y, rad);
      // el color final lleva el mismo RGB con alfa 0: si fuera negro transparente,
      // Canvas interpolaría hacia gris y el papel se ensuciaría
      const rgb = claro ? '255,255,255' : '0,0,0';
      gr.addColorStop(0, `rgba(${rgb},${claro ? 0.1 : 0.05})`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr;
      g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }

    // 2. Pliegues: líneas quebradas con una arista oscura y otra clara
    const trazo = (pts, color, ancho, dx, dy) => {
      g.beginPath();
      pts.forEach(([x, y], i) => (i ? g.lineTo(x + dx, y + dy) : g.moveTo(x + dx, y + dy)));
      g.strokeStyle = color;
      g.lineWidth = ancho;
      g.stroke();
    };
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.filter = 'blur(1.4px)'; // si el navegador no lo soporta, se ignora sin romper nada
    for (let i = 0; i < 38; i++) {
      let x = r() * W, y = r() * H, a = r() * Math.PI * 2;
      const pts = [[x, y]];
      const n = 3 + Math.floor(r() * 4);
      for (let k = 0; k < n; k++) {
        a += (r() - 0.5) * 0.9;
        const l = 60 + r() * 220;
        x += Math.cos(a) * l;
        y += Math.sin(a) * l;
        pts.push([x, y]);
      }
      trazo(pts, 'rgba(0,0,0,0.07)', 2.4, 0, 0);
      trazo(pts, 'rgba(255,255,255,0.20)', 2.2, 1.8, 1.8);
    }
    g.filter = 'none';

    // 3. Grano: una tesela de ruido repetida
    const tesela = document.createElement('canvas');
    tesela.width = tesela.height = 192;
    const tg = tesela.getContext('2d');
    const img = tg.createImageData(192, 192);
    for (let i = 0; i < img.data.length; i += 4) {
      // sobre fondo claro el negro oscurece mucho más de lo que aclara el blanco:
      // 1 grano oscuro por cada 3 claros y alfa baja para no ensuciar el papel
      const oscuro = r() < 0.25;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = oscuro ? 0 : 255;
      img.data[i + 3] = Math.floor(r() * (oscuro ? 14 : 30));
    }
    tg.putImageData(img, 0, 0);
    g.fillStyle = g.createPattern(tesela, 'repeat');
    g.fillRect(0, 0, W, H);

    // 4. Viñeta suave
    const v = g.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.8);
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,0.08)');
    g.fillStyle = v;
    g.fillRect(0, 0, W, H);

    return c;
  }

  let textura = null;
  S.Fondo = {
    /** Textura perezosa: se crea la primera vez que se pide. */
    textura() {
      if (!textura) textura = crearTextura(S.W, S.H);
      return textura;
    },
  };
})(window.Society);
