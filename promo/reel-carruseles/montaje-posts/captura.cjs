// node shot.js E2 E6 ... → out/<id>.png (1856x2304) y out/<id>.jpg (1080x1350)
const path = require('path');
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1856, height: 2304 } });
  for (const id of process.argv.slice(2)) {
    await p.goto('file://' + path.resolve('html', id + '.html'));
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => Promise.all([...document.querySelectorAll('.f')].map((d) => new Promise((r) => {
      const u = getComputedStyle(d).backgroundImage.slice(5, -2); const im = new Image(); im.onload = im.onerror = r; im.src = u; }))));
    await p.waitForTimeout(150);
    await p.screenshot({ path: 'out/' + id + '.png' });
  }
  await b.close();
})();
