/* =====================================================================
   LIVRO: MOISÉS E O MAR VERMELHO  (Êxodo 1 a 20)
   ===================================================================== */
(() => {
const SCENES = [];
const COLLAR = `<path d="M-31,-191 Q0,-150 31,-191 L35,-178 Q0,-134 -35,-178 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-29,-183 Q0,-148 29,-183" stroke="#2f6db5" stroke-width="4" fill="none"/>`;
const URAEUS = `<g transform="translate(0,${ADULT.headY - 33})"><path d="M-5,12 C-8,0 -3,-9 2,-11 C7,-9 8,-2 3,1 C1,5 3,9 5,12 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/></g>`;
const MOISES = { kind: 'adult', skin: '#c98a5a', hair: '#d8d0c4', hairStyle: 'short', beard: 'long', beardCol: '#ece7df', browCol: '#ece7df', tunic: '#b8483a', stripes: '#e0956a', cloak: '#e9dcc0', cloakTrim: '#c9a54e', belt: '#e9c46a' };
const ARAO = { kind: 'adult', skin: '#d39463', hair: '#8a7f78', beard: 'bushy', beardCol: '#c9c4bc', browCol: '#c9c4bc', head: 'cloth', clothCol: '#5872b8', bandCol: '#f2c14e', tunic: '#5872b8', stripes: '#9cb0e0', belt: '#f2c14e' };
const MIRIA_M = { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#e86a9a', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#e86a9a' };
const MIRIA = { kind: 'adult', skin: '#c98a5a', head: 'scarf', clothCol: '#e86a9a', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#8a7f78', tunic: '#f4efe6', longSleeves: true, belt: '#e86a9a' };
const MAE = { kind: 'adult', skin: '#c98a5a', head: 'scarf', clothCol: '#5e9a43', clothStripe: '#e9c46a', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9dcc0', longSleeves: true, belt: '#5e9a43' };
const PRINCESA = { kind: 'adult', skin: '#b9784c', hair: '#141018', hairStyle: 'long', head: 'circlet', tunic: '#fffaf0', trim: '#f2c14e', belt: '#2f6db5', extra: COLLAR };
const CRIADA = { kind: 'adult', skin: '#a8683e', hair: '#141018', hairStyle: 'long', tunic: '#f6e3b8', belt: '#c0392b' };
const FARAO = { kind: 'adult', skin: '#b9784c', head: 'cloth', clothCol: '#f2c14e', clothStripe: '#2f6db5', bandCol: '#2f6db5', tunic: '#fffaf0', trim: '#f2c14e', belt: '#2f6db5', extra: COLLAR + URAEUS };
const CAPATAZ = { kind: 'adult', skin: '#b9784c', hair: '#141018', hairStyle: 'short', tunic: '#f4efe6', trim: '#c0392b', belt: '#c0392b' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#a8875a', belt: '#6b4a33', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#8a5a33' },
  { kind: 'adult', skin: '#d39463', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#8a7a5a', belt: '#5b3a2a' },
  { kind: 'adult', skin: '#b9784c', head: 'scarf', clothCol: '#c96a3a', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9dcc0', belt: '#c96a3a' },
  { kind: 'child', skin: '#c98a5a', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#9a8a6a', belt: '#6b4a33' }
];
const LIVRES = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#3f7fb0', belt: '#e9c46a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#3f7fb0' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#e86a9a', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#e86a9a' },
  { kind: 'child', skin: '#c98a5a', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e9c46a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#d39463', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#2b1d17', tunic: '#f6dfb0', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#5a3020', tunic: '#f4efe6', belt: '#d9643f' }
];
const moises = o => person(Object.assign({}, MOISES, o));
const arao = o => person(Object.assign({}, ARAO, o));
const farao = o => person(Object.assign({}, FARAO, o));

/* ---------- peças desta história ---------- */
function pyramids(o = {}) {
  const p = (x, y, w, h, c1, c2) => `<path d="M${x - w / 2},${y} L${x},${y - h} L${x + w / 2},${y} Z" fill="${c1}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M${x},${y - h} L${x + w / 2},${y} L${x + w * .1},${y} Z" fill="${c2}"/><path d="M${x - w / 2},${y} L${x},${y - h} L${x + w / 2},${y} Z" fill="none" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  return `<g transform="translate(${o.dx || 0},${o.dy || 0}) scale(${o.s || 1})">${p(560, 430, 300, 190, '#ecd09a', '#d4ae74')}${p(730, 440, 200, 130, '#e8c88a', '#cfa86a')}${p(390, 446, 150, 96, '#f0d8a6', '#d8b67e')}</g>`;
}
function brick(x, y, c = '#c0703a') { return `<rect x="${x - 17}" y="${y - 9}" width="34" height="18" rx="3" fill="${c}" stroke="${OL}" stroke-width="2.4"/><path d="M${x - 11},${y - 3} l8,0" stroke="#e0956a" stroke-width="2.4" stroke-linecap="round"/>`; }
function reeds(x, y, s = 1, n = 5, seed = 1) {
  const R = rng(seed); let g = '';
  for (let i = 0; i < n; i++) {
    const dx = (i - n / 2) * 15 + R() * 8, h = 120 + R() * 70, lean = (R() - .5) * 24;
    const d = `M${r1(dx)},0 Q${r1(dx + lean / 2)},${r1(-h / 2)} ${r1(dx + lean)},${r1(-h)}`;
    g += `<path d="${d}" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#7aa34a" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    g += `<g transform="translate(${r1(dx + lean)},${r1(-h)})">${[-56, -28, 0, 28, 56].map(a => `<path d="M0,0 L${r1(Math.sin(a * Math.PI / 180) * 24)},${r1(-Math.cos(a * Math.PI / 180) * 24)}" stroke="#5f8f3a" stroke-width="3.4" stroke-linecap="round"/>`).join('')}</g>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})"><g class="sway" style="--r:2deg;--d:${(3 + R() * 2).toFixed(1)}s;${dl(4)}">${g}</g></g>`;
}
function babyIn(x, y, s = 1, face = 'smile') {
  const d = Object.assign({}, PDEF, { skin: '#d9a070', hair: '#2b1d17', hairStyle: 'short', face, blush: true });
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-6,8 C-6,-12 50,-14 56,6 Z" fill="#f4ead6" stroke="${OL}" stroke-width="2.6"/><g transform="translate(-12,-6)">${headSVG({ R: 17 }, d, 2.4)}</g></g>`;
}
function basket(x, y, s = 1, o = {}) {
  let g = `<path d="M-74,-10 C-74,28 74,28 74,-10 Z" fill="#c98f57" stroke="${OL}" stroke-width="3.4"/>`;
  g += `<g stroke="#a46e3c" stroke-width="3" fill="none">${[-50, -25, 0, 25, 50].map(xx => `<path d="M${xx},-8 q5,16 0,28"/>`).join('')}<path d="M-66,4 Q0,14 66,4"/></g>`;
  if (o.baby) g += babyIn(-30, -12, 1, o.face || 'smile');
  g += `<ellipse cx="0" cy="-10" rx="74" ry="9" fill="none" stroke="${OL}" stroke-width="3.4"/>`;
  g += `<g data-p="lid"${o.open ? ' style="transform:translate(70px,-50px) rotate(30deg)"' : ''}><path d="M-70,-12 C-64,-52 64,-52 70,-12 Z" fill="#d9a56a" stroke="${OL}" stroke-width="3.4"/><g stroke="#b9854a" stroke-width="3" fill="none"><path d="M-46,-22 q46,-26 92,0"/><path d="M-30,-34 q30,-14 60,0"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g class="${o.cls ?? 'float'}">${g}${o.k ? hitC(0, -16, 70) : ''}</g></g></g>`;
}
function nile(y, o = {}) {
  return `<rect x="-40" y="${y}" width="900" height="${900 - y}" fill="${o.deep || '#3f93c7'}"/>` + waveBand(y, { fill: o.fill || '#5ab0de', amp: 7, len: 110, dx: 24, d: 6, foam: '#d6eff9', fw: 4 }) + waveBand(y + 70, { fill: o.deep || '#3f93c7', amp: 8, len: 140, dx: -26, d: 7, foam: '#cfeaf7', fw: 3 });
}
function burningBush(x, y, s = 1) {
  const fl = (sc, col, dx = 0) => `<path transform="translate(${dx},0) scale(${sc})" d="M0,-90 C22,-56 38,-28 28,-6 C18,12 -18,12 -28,-6 C-38,-28 -22,-56 0,-90 Z" fill="${col}"/>`;
  let g = `<defs>${rg('sarca', [[0, '#ffe08a', .9], [.5, '#ff9a3a', .35], [1, '#ff7a1a', 0]])}</defs><circle cx="0" cy="-60" r="190" fill="${UR('sarca')}"/>`;
  g += blob([[-56, -20, 30], [-20, -40, 36], [24, -36, 34], [58, -16, 26], [0, -10, 34]], '#4f7a3a') + blob([[-24, -54, 12], [22, -48, 10]], '#6a9a4a', 0);
  g += `<g data-k="chamas">${[[-40, -40, .75], [0, -60, 1.1], [40, -42, .8]].map(([dx, dy, sc], i) => `<g transform="translate(${dx},${dy})"><g class="flicker" style="${dl(1)}">${fl(sc, '#ff7a26')}${fl(sc * .7, '#ffb238')}${fl(sc * .4, '#fff1a8')}</g></g>`).join('')}</g>`;
  g += [-30, 0, 30].map((dx, i) => `<circle class="rise" style="--d:${1.8 + i * .4}s;--dx:${dx / 3}px;${dl(3)}" cx="${dx}" cy="-110" r="3" fill="#ffd27a"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="sarca"><g class="act">${g}${hitC(0, -60, 90)}</g></g>`;
}
function palace(o = {}) {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#ecd6a8"/><rect x="-40" y="-40" width="900" height="110" fill="#2f6db5"/><rect x="-40" y="62" width="900" height="14" fill="#f2c14e"/>`;
  s += [...Array(15)].map((_, i) => `<rect x="${-30 + i * 60}" y="20" width="30" height="30" fill="${i % 2 ? '#c0392b' : '#f2c14e'}" opacity=".85"/>`).join('');
  const glyph = (x, y, t) => {
    if (t === 0) return `<path d="M${x - 14},${y} Q${x},${y - 12} ${x + 14},${y} Q${x},${y + 10} ${x - 14},${y} Z M${x},${y + 6} l-6,12" fill="none" stroke="#8a5a33" stroke-width="3"/><circle cx="${x}" cy="${y}" r="4" fill="#8a5a33"/>`;
    if (t === 1) return `<path d="M${x},${y - 14} a6,6 0 1 1 0.1,0 M${x},${y - 2} L${x},${y + 16} M${x - 9},${y + 2} L${x + 9},${y + 2}" fill="none" stroke="#8a5a33" stroke-width="3"/>`;
    if (t === 2) return `<path d="M${x - 14},${y} l7,-6 l7,6 l7,-6 l7,6" fill="none" stroke="#2f6db5" stroke-width="3"/><path d="M${x - 14},${y + 10} l7,-6 l7,6 l7,-6 l7,6" fill="none" stroke="#2f6db5" stroke-width="3"/>`;
    return `<path d="M${x - 12},${y + 12} C${x - 12},${y - 6} ${x + 10},${y - 10} ${x + 12},${y - 14} M${x + 4},${y - 2} l8,4" fill="none" stroke="#8a5a33" stroke-width="3" stroke-linecap="round"/><circle cx="${x + 8}" cy="${y - 12}" r="2.6" fill="#8a5a33"/>`;
  };
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += glyph(250 + c * 60, 140 + r * 60, (r + c) % 4);
  const col = x => `<rect x="${x - 26}" y="150" width="52" height="410" fill="#f5e7c8" stroke="${OL}" stroke-width="3"/><g stroke="#2f6db5" stroke-width="5">${[200, 260, 320].map(y => `<path d="M${x - 26},${y} L${x + 26},${y}"/>`).join('')}</g><path d="M${x - 26},150 C${x - 60},120 ${x - 60},96 ${x - 44},90 L${x + 44},90 C${x + 60},96 ${x + 60},120 ${x + 26},150 Z" fill="#5e9a43" stroke="${OL}" stroke-width="3"/><path d="M${x - 36},104 L${x + 36},104" stroke="#f2c14e" stroke-width="5"/>`;
  s += col(110) + col(690);
  s += `<defs>${lg('chao', [[0, '#d9b98a'], [1, '#c49c66']])}</defs><rect x="-40" y="560" width="900" height="300" fill="${UR('chao')}"/><path d="M-40,560 L840,560" stroke="${OL}" stroke-width="4"/>`;
  s += `<g opacity=".4">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${400 + (i - 3) * 60},560 L${400 + (i - 3) * 200},860" stroke="#a87c4a" stroke-width="3"/>`).join('')}</g>`;
  return s;
}
function throne(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,-60 L-60,-230 Q0,-260 60,-230 L60,-60 Z" fill="#f2c14e" stroke="${OL}" stroke-width="3.4"/><path d="M-44,-80 L-44,-214 Q0,-236 44,-214 L44,-80 Z" fill="#2f6db5"/><g fill="#f2c14e">${[-26, 0, 26].map(dx => `<path d="${sparkle(8)}" transform="translate(${dx},-180)"/>`).join('')}</g><rect x="-80" y="-96" width="160" height="26" rx="6" fill="#d9a33a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 66},-72 L${k * 70},-6 L${k * 56},0 L${k * 52},-72 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`;
}
function staffGround(x, y, k = 'cajado') {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><g transform="rotate(84)">${ITEM.staff(196, -1)}</g>${hitC(-60, 0, 70)}</g></g>`;
}
function pillar(x, y, s = 1) {
  const puffs = [[0, -30, 56], [-34, -70, 44], [30, -96, 48], [-20, -140, 50], [26, -180, 46], [-24, -222, 48], [22, -262, 44], [-14, -300, 46], [20, -336, 40], [-30, -350, 36], [36, -364, 34], [0, -384, 40], [-60, -20, 34], [62, -16, 32]];
  const cloudP = blob(puffs.map(([a, b, r]) => [a + 6, b + 8, r]), '#cfd6e6', 3) + blob(puffs, '#ffffff', 0) + blob([[-14, -60, 18], [10, -200, 16], [-6, -330, 16]], '#f2f6ff', 0);
  const edge = side => [[52, 0], [64, -60], [46, -120], [60, -180], [40, -240], [48, -300], [22, -360], [0, -410]].map(([a, b], i) => [side * a * (i % 2 ? 1 : .94), b]);
  const L = edge(-1), Rt = edge(1).reverse();
  const flameD = (k) => smooth(L.map(([a, b]) => [a * k, b * (.9 + k * .1)])) + ' L' + smooth(Rt.map(([a, b]) => [a * k, b * (.9 + k * .1)])).slice(1) + ' Z';
  const fire = `<g class="flicker">${`<path d="${flameD(1)}" fill="#ff7a26" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="${flameD(.66)}" fill="#ffb238"/><path d="${flameD(.34)}" fill="#fff1a8"/>`}</g>${[-30, 0, 30].map((dx, i) => `<circle class="rise" style="--d:${2 + i * .4}s;--dx:${dx / 3}px;${dl(3)}" cx="${dx}" cy="-380" r="4" fill="#ffd27a"/>`).join('')}`;
  return `<defs>${rg('pglow', [[0, '#ffe7a8', .8], [.6, '#ffd27a', .25], [1, '#ffd27a', 0]])}</defs><g transform="translate(${x},${y}) scale(${s})" data-k="coluna"><g class="act"><circle cx="0" cy="-190" r="250" fill="${UR('pglow')}" data-k="pglow" opacity=".5"/><g data-k="nuvemP">${cloudP}</g><g data-k="fogoP" opacity="0">${fire}</g>${hitC(0, -190, 100)}</g></g>`;
}
function chariot(x, y, s = 1) {
  let g = equine({ x: -40, y: 0, s: .8, kind: 'horse', flip: true, cls: 'bob' });
  g += `<path d="M30,-70 L120,-70 L120,-20 L40,-20 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M40,-58 L112,-58" stroke="#c0392b" stroke-width="5"/>`;
  g += `<path d="M-50,-60 L40,-46" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`;
  g += `<g transform="translate(76,-20)"><circle r="30" fill="none" stroke="${OL}" stroke-width="9"/><circle r="30" fill="none" stroke="#8a5a33" stroke-width="5"/>${[0, 60, 120].map(a => `<path d="M0,0 L${r1(Math.cos(a * Math.PI / 180) * 28)},${r1(Math.sin(a * Math.PI / 180) * 28)} M0,0 L${r1(-Math.cos(a * Math.PI / 180) * 28)},${r1(-Math.sin(a * Math.PI / 180) * 28)}" stroke="#8a5a33" stroke-width="3"/>`).join('')}<circle r="6" fill="#f2c14e" stroke="${OL}" stroke-width="2"/></g>`;
  g += `<g transform="translate(80,-56)">${person(Object.assign({}, CAPATAZ, { s: .5, face: 'angry', look: -.6, head: 'helmetI', armL: { a: 60, b: 20 }, armR: { a: 60, b: 20 }, cls: '' }))}</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function tambourine(k = '') {
  return `<g${k ? ` data-k="${k}"` : ''}><circle r="18" fill="#e9c46a" stroke="${OL}" stroke-width="3"/><circle r="12" fill="#f6e3b8"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${r1(Math.cos(a * Math.PI / 180) * 18)}" cy="${r1(Math.sin(a * Math.PI / 180) * 18)}" r="4" fill="#cfd5dc" stroke="${OL}" stroke-width="1.6"/>`).join('')}</g>`;
}
function tablets(x, y, s = 1) {
  const slab = dx => `<path d="M${dx - 52},0 L${dx - 52},-104 Q${dx - 52},-136 ${dx - 20},-136 L${dx + 20},-136 Q${dx + 52},-136 ${dx + 52},-104 L${dx + 52},0 Z" fill="#c9c4bc" stroke="${OL}" stroke-width="3.6"/><path d="M${dx - 40},-20 L${dx - 40},-100 Q${dx - 40},-124 ${dx - 16},-124" stroke="#e6e2da" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const NUM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  let g = slab(-56) + slab(56);
  NUM.forEach((n, i) => { const side = i < 5 ? -56 : 56, row = i % 5; g += `<text data-k="m${i}" x="${side}" y="${-104 + row * 21}" text-anchor="middle" font-size="18" class="svgtxt" fill="#7a746a">${n}</text>`; });
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="tabuas"><g class="act">${g}${hitC(0, -68, 110)}</g></g>`;
}
function sinai(o = {}) {
  let s = `<path d="M60,620 L330,210 Q400,170 470,210 L760,620 Z" fill="#9a8a7a" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  s += `<path d="M400,190 L470,210 L760,620 L560,620 Z" fill="#000" opacity=".12"/>`;
  s += `<path d="M330,210 Q400,170 470,210 L440,260 L400,240 L360,262 Z" fill="#c9bfb2" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  return s;
}
// paredes de água em perspectiva, com o caminho seco no meio
const HZ = 400;
function seabed() {
  return `<path d="M230,900 L380,${HZ} L420,${HZ} L570,900 Z" fill="#e8d4a2"/><g stroke="#cdb57f" stroke-width="3" fill="none" opacity=".8">${[480, 560, 650, 760].map((y, i) => { const t = (y - HZ) / (900 - HZ), xl = 380 - t * 150, xr = 420 + t * 150; return `<path d="M${r1(xl + 20)},${y} Q400,${y - 6} ${r1(xr - 20)},${y}"/>`; }).join('')}</g><g fill="#b9a275">${[[350, 520], [440, 610], [330, 700], [470, 790]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5"/>`).join('')}</g>`;
}
function wallL(seed = 1) {
  const top = smooth([[-40, 150], [60, 136], [160, 168], [250, 214], [330, 290], [380, HZ - 6]]);
  const d = top + ` L380,${HZ} L230,900 L-40,900 Z`;
  let s = `<defs>${lg('parede', [[0, '#c8ecf8'], [.25, '#5ab0de'], [1, '#1f5f96']])}</defs><path d="${d}" fill="${UR('parede')}" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>`;
  s += `<path d="${top}" fill="none" stroke="#f2fbff" stroke-width="7" stroke-linecap="round"/>`;
  s += `<path d="M378,${HZ + 4} L234,896" stroke="#e6f6fc" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;
  s += `<g stroke="#8fd0f2" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round">${[[60, 300], [140, 420], [40, 560], [170, 680], [90, 800]].map(([x, y]) => `<path d="M${x - 40},${y} q20,-12 40,0 t40,0"/>`).join('')}</g>`;
  const R = rng(seed), cols = ['#f28c3a', '#f2c14e', '#e86a9a', '#3fbf9a', '#9a6fd6'];
  [[90, 330, .9], [190, 470, 1], [70, 620, 1.1], [180, 760, .9]].forEach(([x, y, sc], i) => s += fishS(x, y, sc, cols[(i + Math.floor(R() * 5)) % 5], { dx: 18, d: 4 + i, flip: i % 2 === 1 }));
  for (let i = 0; i < 6; i++) s += `<circle class="rise" style="--d:${(3 + i * .5).toFixed(1)}s;--dx:4px;${dl(6)}" cx="${40 + i * 40}" cy="${560 + (i % 3) * 80}" r="${4 + (i % 3) * 2}" fill="none" stroke="#e6f6fc" stroke-width="3" opacity=".8"/>`;
  return s;
}
const wallR = (seed = 2) => `<g transform="translate(800,0) scale(-1,1)">${wallL(seed)}</g>`;
function crowd(list, pts, o = {}) {
  return pts.map(([x, y, sc], i) => person(Object.assign({}, list[i % list.length], { x, y, s: sc, face: (o.faces || ['joy', 'smile', 'grin'])[i % 3], look: o.look ?? 0, armL: o.armL || { a: 14 }, armR: o.armR || { a: 14 }, k: o.k ? o.k + i : '' }, o.extra ? o.extra(i) : {}))).join('');
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Moisés e o Mar Vermelho',
  alt: 'O mar aberto em duas paredes de água com peixes dentro; no meio, um caminho seco por onde passa o povo. À frente, Moisés ergue o cajado.',
  cue: [400, 860],
  art() {
    let s = sky('sky', [[0, '#5aa0d8'], [.45, '#bfe5f5'], [.7, '#fdebc8'], [1, '#fdebc8']], 1100);
    s += `<g transform="translate(0,300)">`;
    s += sun(400, HZ - 70, 40, { face: true }) + `<rect x="-40" y="${HZ}" width="900" height="600" fill="#e2cf9a"/>`;
    s += seabed() + wallL(3) + wallR(4);
    s += crowd(LIVRES, [[400, 470, .26], [430, 500, .3], [470, 560, .4], [500, 610, .46]], { look: 0, armR: { a: 150, b: -20 } });
    s += `</g>`;
    s += moises({ x: 260, y: 1050, s: 1.12, face: 'determined', look: 0, armL: { a: 14 }, armR: { a: 156, b: -10, item: ITEM.staff(220, 1), ia: 0 }, k: 'moises' });
    s += sheep({ x: 110, y: 1074, s: .8, k: 'ove' }) + sheep({ x: 640, y: 1076, s: .74, flip: true, face: '#f1d2bb', k: 'ove2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('moises'), 'Moisés', () => { api.snd('rush'); api.hop(api.q('moises'), 10); api.bubble(260, 720, 'Olá! Eu sou o Moisés!', { key: 'm' }); });
    for (const k of ['ove', 'ove2']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat', k === 'ove2' ? 1.3 : 1); api.hop(api.q(k)); });
  }
});

/* =====================================================================
   1 — O POVO DE DEUS NO EGITO
   ===================================================================== */
SCENES.push({
  key: 'egito', title: 'Trabalho pesado no Egito', ref: 'Êxodo 1.8-14; 2.23-25', tint: 'sand',
  text: [
    'O povo de Deus vivia no Egito. O rei de lá, o faraó, era muito mau para eles.',
    'O povo tinha de fazer tijolos o dia inteiro, sem descansar.',
    'O povo chorava e pedia ajuda a Deus.'
  ],
  fact: 'Os tijolos eram feitos de barro com palha e secavam ao sol.',
  hint: 'Toca nos tijolos e nas pessoas.',
  alt: 'No Egito, perto das pirâmides, o povo de Israel carrega tijolos debaixo do sol quente, enquanto um capataz egípcio aponta com uma vara.',
  cue: [560, 640],
  art() {
    let s = sky('sky', [[0, '#8fc2e6'], [.55, '#f8e2b8'], [1, '#f8e2b8']]);
    s += sun(680, 120, 46, { fill: '#ffcf3f', face: true });
    s += `<g data-k="luzG" opacity="0">${glory(160, 70, 220, 'luz')}</g>`;
    s += hill([[-40, 440], [200, 424], [400, 436], [620, 418], [840, 432]], '#e3c890');
    s += pyramids();
    s += `<rect x="-40" y="470" width="900" height="420" fill="#e8d4a2"/><path d="M-40,470 L840,470" stroke="#d2b880" stroke-width="4"/>`;
    s += palm(70, 520, .55);
    let wall = '';
    for (let r = 0; r < 5; r++) { let row = ''; for (let c = 0; c < 6; c++) row += brick(470 + c * 36 + (r % 2 ? 18 : 0), 700 - r * 18); wall += `<g data-k="fila${r}"${r > 1 ? ' opacity="0"' : ''}>${row}</g>`; }
    s += `<g data-k="muro">${wall}${hitC(570, 660, 90)}</g>`;
    s += person(Object.assign({}, CAPATAZ, { x: 740, y: 700, s: .96, flip: true, face: 'angry', look: .5, armL: { a: 14 }, armR: { a: 96, b: 0, item: `<path d="M0,0 L0,80" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M0,0 L0,80" stroke="#8a5a33" stroke-width="4" stroke-linecap="round"/>`, ia: -90 }, k: 'capataz' }));
    const carry = `<g transform="translate(0,-14)">${brick(0, 0)}${brick(0, -18, '#b8653a')}</g>`;
    s += person(Object.assign({}, POVO[0], { x: 150, y: 720, s: .94, legs: 'walk', face: 'sad', look: .5, armL: { a: 150, b: -40, item: carry, ia: 0 }, armR: { a: 20 }, k: 'p0' }));
    s += person(Object.assign({}, POVO[1], { x: 300, y: 740, s: .96, face: 'worry', look: .5, armL: { a: -30, b: -60 }, armR: { a: -30, b: -60 }, front: `<g transform="translate(0,-110)">${brick(-10, 0)}${brick(18, 0, '#b8653a')}</g>`, k: 'p1' }));
    s += person(Object.assign({}, POVO[3], { x: 410, y: 760, s: .9, face: 'sad', look: .3, armL: { a: 150, b: -40, item: `<g transform="translate(0,-10)">${brick(0, 0)}</g>`, ia: 0 }, armR: { a: 20 }, k: 'p2' }));
    return s;
  },
  setup(api) {
    let rows = 2;
    api.tap(api.q('muro'), 'Tijolos', () => {
      api.snd('knock', 2);
      if (rows < 5) { api.anim(api.q('fila' + rows), [{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 400, fill: 'forwards' }); rows++; }
      api.burst(560, 640, 'dust', 4);
      if (rows === 5 && !api.st.w) { api.st.w = true; api.bubble(740, 430, 'Mais tijolos! Mais rápido!', { key: 'c' }); }
    });
    api.tap(api.q('capataz'), 'Capataz egípcio', () => { api.snd('grunt'); api.bubble(740, 430, 'Trabalhem mais!', { key: 'c' }); });
    const said = [N('Estou tão cansado...'), N('Deus, ajuda-nos!'), N('Que tijolo pesado!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('p' + i), 'Pessoa do povo de Israel', () => {
      const [x] = api.pos(api.q('p' + i));
      api.snd('hm'); api.hop(api.q('p' + i), 8);
      api.bubble(x, 470, said[i], { key: 'p' });
      if (i === 1 && !api.st.g) { api.st.g = true; api.later(() => { api.anim(api.q('luzG'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, fill: 'forwards' }); api.snd('anoint'); }, 900); api.nudgeNext(2600); }
    });
    api.tap(api.q('luz'), 'Deus ouviu o povo', () => { api.snd('chime', 'E6'); api.burst(160, 100, 'spark', 8, { col: '#fff1b0' }); api.bubble(180, 200, 'Eu ouvi o meu povo.', { key: 'd', below: true }); });
  }
});

/* =====================================================================
   2 — UM CESTINHO NO RIO
   ===================================================================== */
SCENES.push({
  key: 'cesto', title: 'Um cestinho no rio', ref: 'Êxodo 1.22–2.4', tint: 'water',
  text: [
    'O faraó deu uma ordem muito má contra os bebés do povo de Deus.',
    'Então uma mãe escondeu o seu bebé. Fez um cestinho que não deixava entrar a água.',
    'E pôs o bebé no cestinho, no meio das plantas do rio.'
  ],
  fact: 'A irmã do bebé ficou escondidinha, a olhar de longe.',
  hint: 'Toca no cestinho para ele flutuar.',
  alt: 'Na margem do rio Nilo, uma mãe ajoelhada põe um cestinho na água, no meio dos juncos. A irmã, Miriã, espreita escondida.',
  cue: [420, 640],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.6, '#e9f6f0'], [1, '#e9f6f0']]);
    s += sun(120, 110, 36, { face: true }) + cloud(560, 120, .8);
    s += hill([[-40, 420], [200, 404], [420, 416], [640, 398], [840, 412]], '#c9cf8a');
    s += pyramids({ s: .6, dx: 300, dy: 150 });
    s += `<rect x="-40" y="440" width="900" height="80" fill="#c4cf86"/>`;
    s += nile(520);
    s += reeds(560, 640, 1.1, 6, 3) + reeds(700, 620, 1, 5, 4) + reeds(80, 600, 1, 4, 5);
    s += `<path d="M-40,560 C80,540 180,560 300,620 C360,650 360,720 300,760 L-40,780 Z" fill="#b8a46a" stroke="${OL}" stroke-width="3"/>`;
    s += basket(420, 650, .9, { k: 'cesto' });
    s += person(Object.assign({}, MAE, { x: 270, y: 700, s: .96, legs: 'kneel', face: 'sad', look: .6, armL: { a: 40, b: 20 }, armR: { a: 70, b: 20 }, k: 'mae' }));
    s += `<g data-k="miriaG">${person(Object.assign({}, MIRIA_M, { x: 690, y: 610, s: .78, face: 'o', look: -.6, armL: { a: -20, b: -80 }, armR: { a: 14 }, k: 'miria' }))}</g>`;
    s += reeds(660, 640, 1.15, 5, 7);
    return s;
  },
  setup(api) {
    api.tap(api.q('cesto'), 'Cestinho', async () => {
      if (api.st.go) { api.snd('plip'); api.burst(620, 640, 'ripple', 2); return; }
      api.st.go = true;
      api.snd('splash');
      await api.anim(api.act(api.q('cesto')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(90px,10px)' }, { transform: 'translate(200px,0px)' }], { duration: 2400, fill: 'forwards', easing: 'ease-in-out' });
      api.burst(620, 650, 'ripple', 3);
      api.bubble(270, 450, 'Deus, cuida do meu bebé!', { key: 'm', dur: 2600 });
      api.nudgeNext(2600);
    });
    api.tap(api.q('mae'), 'Mãe do bebé', () => { api.snd('lullaby'); api.burst(270, 520, 'heart', 4); });
    api.tap(api.q('miria'), 'Miriã', () => { api.snd('tiptoe'); api.hop(api.q('miria'), 10); api.bubble(690, 400, 'Vou ficar a olhar!', { key: 'i', size: 26 }); });
  }
});

/* =====================================================================
   3 — A PRINCESA ENCONTRA O BEBÊ
   ===================================================================== */
SCENES.push({
  key: 'princesa', title: 'A princesa e o bebé', ref: 'Êxodo 2.5-10', tint: 'rose',
  text: [
    'A princesa, filha do faraó, foi ao rio e encontrou o cestinho. Lá dentro estava um bebé a chorar!',
    'A irmã do bebé chamou a própria mãe dele para cuidar dele.',
    'E a princesa deu um nome ao menino: Moisés.'
  ],
  fact: 'Moisés quer dizer «tirado das águas».',
  hint: 'Toca no cestinho.',
  alt: 'Na margem do rio, a princesa do Egito, de vestido branco e colar dourado, olha para um cestinho com um bebé lá dentro. Uma criada segura um leque, e Miriã aproxima-se.',
  cue: [400, 620],
  art() {
    let s = sky('sky', [[0, '#8fc2e6'], [.6, '#fbe9dc'], [1, '#fbe9dc']]);
    s += sun(680, 110, 38, { face: true });
    s += hill([[-40, 420], [200, 404], [420, 416], [640, 398], [840, 412]], '#c9cf8a');
    s += `<rect x="-40" y="440" width="900" height="80" fill="#c4cf86"/>` + nile(520);
    s += reeds(90, 640, 1.1, 6, 11) + reeds(740, 620, 1, 5, 12);
    s += `<path d="M300,900 C300,760 420,700 560,690 C680,684 760,700 860,700 L860,900 Z" fill="#b8a46a" stroke="${OL}" stroke-width="3"/>`;
    s += person(Object.assign({}, CRIADA, { x: 690, y: 726, s: .9, face: 'smile', look: -.6, armL: { a: 14 }, armR: { a: 150, b: -10, item: `<g transform="translate(0,-70)"><path d="M0,70 L0,0" stroke="${OL}" stroke-width="7"/><path d="M0,70 L0,0" stroke="#8a5a33" stroke-width="3"/><path d="M-40,-10 Q0,-60 40,-10 Q0,-26 -40,-10 Z" fill="#5e9a43" stroke="${OL}" stroke-width="3"/></g>`, ia: 0 } }));
    s += person(Object.assign({}, PRINCESA, { x: 540, y: 732, s: 1, face: 'o', look: -.6, armL: { a: 60, b: 30 }, armR: { a: 30, b: 20 }, k: 'princesa' }));
    s += basket(390, 640, .95, { k: 'cesto', baby: true, face: 'open' });
    s += person(Object.assign({}, MIRIA_M, { x: 200, y: 760, s: .86, legs: 'run', face: 'joy', look: .6, armL: { a: 30, b: 20 }, armR: { a: 120, b: -20 }, k: 'miria' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('cesto'), 'Cestinho', async () => {
      if (!api.st.open) {
        api.st.open = true;
        await api.anim(api.part(api.q('cesto'), 'lid'), [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: 'translate(70px,-50px) rotate(30deg)' }], { duration: 600, fill: 'forwards', easing: 'ease-out' });
      }
      api.snd('squeak', .9); api.later(() => api.snd('squeak', 1), 250);
      api.bubble(360, 560, 'Uáá! Uáá!', { key: 'b', size: 30 });
      if (!api.st.said) { api.st.said = true; api.later(() => api.bubble(540, 440, 'Que bebé tão lindo! Vou chamar-lhe Moisés.', { key: 'p', dur: 3000 }), 1300); api.nudgeNext(3600); }
    });
    api.tap(api.q('princesa'), 'Princesa do Egito', () => { api.snd('heart'); api.burst(540, 480, 'heart', 5); api.bubble(540, 440, 'Pobrezinho! Vou cuidar dele.', { key: 'p' }); });
    api.tap(api.q('miria'), 'Miriã', () => { api.snd('hello'); api.hop(api.q('miria'), 12); api.bubble(200, 480, 'Quer que eu chame alguém para cuidar dele?', { key: 'i', dur: 3000 }); });
  }
});

/* =====================================================================
   4 — A SARÇA QUE NÃO SE QUEIMAVA
   ===================================================================== */
SCENES.push({
  key: 'sarca', title: 'O arbusto de fogo', ref: 'Êxodo 3.1-10', tint: 'gold',
  text: [
    'Moisés cresceu e tornou-se pastor de ovelhas.',
    'Um dia, viu um arbusto a arder. Mas o arbusto não se queimava! Do meio do fogo, Deus falou:',
    { q: 'Moisés, vai falar com o faraó. Tira o meu povo do Egito!', who: 'deus' }
  ],
  fact: 'Deus pediu a Moisés que tirasse as sandálias, porque aquele lugar era santo.',
  hint: 'Toca no fogo e depois no Moisés.',
  alt: 'No deserto, perto de um monte, Moisés, com o seu cajado, olha para um arbusto em chamas que não se queima. As ovelhas pastam por perto.',
  cue: [560, 560],
  art() {
    let s = sky('sky', [[0, '#9fc6e8'], [.55, '#f8dcae'], [1, '#f8dcae']]);
    s += `<path d="M-40,520 L120,300 Q170,250 230,300 L420,520 Z" fill="#b49a7a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M200,280 L230,300 L420,520 L330,520 Z" fill="#000" opacity=".1"/>`;
    s += hill([[-40, 500], [200, 480], [420, 494], [640, 470], [840, 488]], '#cdb98a');
    s += `<rect x="-40" y="540" width="900" height="400" fill="#e2cf9a"/><path d="M-40,540 L840,540" stroke="#c9b07c" stroke-width="4"/>`;
    s += burningBush(570, 690, 1.1);
    s += `<g data-k="sandalias" opacity="0"><g transform="translate(330,770)"><ellipse cx="0" cy="0" rx="22" ry="8" fill="#8a5a33" stroke="${OL}" stroke-width="2.4"/><ellipse cx="34" cy="4" rx="22" ry="8" fill="#8a5a33" stroke="${OL}" stroke-width="2.4"/></g></g>`;
    s += moises({ x: 260, y: 730, s: 1.02, face: 'surprise', look: .6, armL: { a: 14, item: ITEM.staff(200, -1) }, armR: { a: 70, b: -30 }, k: 'moises' });
    s += sheep({ x: 100, y: 770, s: .7, k: 'ove' }) + sheep({ x: 740, y: 780, s: .64, flip: true, pose: 'graze', face: '#f1d2bb' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('sarca'), 'Arbusto a arder', () => {
      api.snd('crackle');
      api.anim(api.q('chamas'), [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 700 });
      api.burst(570, 600, 'spark', 8, { col: '#ffd27a' });
      const said = [N('Moisés! Moisés!'), N('Tira as sandálias. Este lugar é santo.'), N('Vai ao faraó e tira o meu povo do Egito!')];
      api.later(() => { api.snd('choir', ['C4', 'G4', 'C5']); api.bubble(570, 470, said[n % 3], { key: 'd', dur: 2600 }); n++; }, 300);
    });
    api.tap(api.q('moises'), 'Moisés', () => {
      if (n < 2) { api.snd('hm'); api.bubble(260, 450, 'Aqui estou!', { key: 'm' }); return; }
      if (!api.st.sand) { api.st.sand = true; api.anim(api.q('sandalias'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' }); api.snd('tiptoe'); api.bubble(260, 450, 'Tirei as sandálias, Senhor.', { key: 'm' }); api.nudgeNext(2400); return; }
      api.snd('hm'); api.bubble(260, 450, 'Aqui estou, Senhor!', { key: 'm' });
    });
    api.tap(api.q('ove'), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q('ove')); });
  }
});

/* =====================================================================
   5 — EU ESTAREI COM VOCÊ
   ===================================================================== */
SCENES.push({
  key: 'cajado', title: 'Eu estarei contigo', ref: 'Êxodo 3.11–4.17', tint: 'sand',
  text: [
    'Moisés ficou com medo:',
    { q: 'Eu não sei falar bem!', who: 'moises' },
    'Mas Deus disse:',
    { q: 'Eu vou estar contigo.', who: 'deus' },
    'Deus mandou Arão, o irmão de Moisés, para o ajudar. E transformou o cajado numa cobra!'
  ],
  fact: 'Quando Moisés agarrou a cobra pela cauda, ela voltou a ser um cajado!',
  hint: 'Toca no cajado de Moisés.',
  alt: 'No deserto, o cajado de Moisés transforma-se numa cobra no chão, e Moisés dá um salto de susto. Ao longe, o irmão Arão vem a chegar.',
  cue: [420, 740],
  art() {
    let s = sky('sky', [[0, '#9fc6e8'], [.55, '#f8dcae'], [1, '#f8dcae']]);
    s += glory(620, 70, 220, 'luz');
    s += hill([[-40, 460], [200, 440], [420, 454], [640, 430], [840, 448]], '#cdb98a');
    s += `<rect x="-40" y="500" width="900" height="400" fill="#e2cf9a"/><path d="M-40,500 L840,500" stroke="#c9b07c" stroke-width="4"/>`;
    s += arao({ x: 680, y: 580, s: .56, legs: 'walk', face: 'joy', look: -.6, armL: { a: 14, item: ITEM.staff(200, 1) }, armR: { a: 150, b: -20 }, k: 'arao' });
    s += moises({ x: 230, y: 730, s: 1.02, face: 'worry', look: .6, armL: { a: 14 }, armR: { a: 30, b: 40 }, k: 'moises' });
    s += staffGround(470, 760);
    s += `<g data-k="cobraG" opacity="0" style="pointer-events:none">${snake({ x: 440, y: 770, s: .9, col: '#8a6a3a', dark: '#5a4426', belly: '#d9c08a', sly: false, pts: [[-110, 0], [-70, -14], [-30, 6], [10, -10], [40, -26], [56, -50]], k: 'cobra' })}</g>`;
    return s;
  },
  setup(api) {
    const st = api.q('cajado'), cb = api.q('cobraG');
    api.tap(st, 'Cajado de Moisés', async () => {
      api.snd('hiss'); api.snd('boing', .8);
      api.anim(api.act(st), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      st.style.pointerEvents = 'none';
      await api.anim(cb, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      cb.style.pointerEvents = 'auto';
      api.anim(api.act(api.q('moises')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-30px,-30px)' }, { transform: 'translate(-40px,0px)' }], { duration: 500, fill: 'forwards' });
      api.bubble(220, 450, 'Uma cobra!', { key: 'm', size: 32 });
    });
    api.tap(api.q('cobra'), 'Cobra', async () => {
      api.snd('chime', 'G5');
      api.anim(cb, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      cb.style.pointerEvents = 'none';
      await api.anim(api.act(st), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      st.style.pointerEvents = 'auto';
      api.anim(api.act(api.q('moises')), [{ transform: 'translate(-40px,0px)' }, { transform: 'translate(0px,0px)' }], { duration: 500, fill: 'forwards' });
      api.bubble(220, 450, 'Voltou a ser um cajado!', { key: 'm' });
      if (!api.st.ok) { api.st.ok = true; api.nudgeNext(2400); }
    });
    api.tap(api.q('arao'), 'Arão', () => { api.snd('hello'); api.hop(api.q('arao'), 10); api.bubble(680, 380, 'Eu vou contigo, irmão!', { key: 'a', size: 26 }); });
    api.tap(api.q('moises'), 'Moisés', () => { api.snd('hm'); api.bubble(220, 450, 'Eu não sei falar bem...', { key: 'm' }); });
    api.tap(api.q('luz'), 'Deus a falar', () => { api.snd('choir', ['C4', 'G4', 'C5']); api.burst(620, 100, 'spark', 8, { col: '#fff1b0' }); api.bubble(620, 200, 'Eu estarei contigo!', { key: 'd', below: true }); });
  }
});

/* =====================================================================
   6 — DEIXE O MEU POVO IR!
   ===================================================================== */
SCENES.push({
  key: 'farao', title: 'Deixa o meu povo ir!', ref: 'Êxodo 5.1-2', tint: 'rose',
  text: [
    'Moisés e Arão foram falar com o faraó:',
    { q: 'Deus mandou dizer: deixa o meu povo ir!', who: 'moises' },
    'Mas o faraó era teimoso:',
    { q: 'Não vou deixar!', who: 'farao' }
  ],
  fact: 'Faraó era o nome dos reis do Egito.',
  hint: 'Toca no Moisés e no faraó.',
  alt: 'No palácio do Egito, cheio de colunas e pinturas, o faraó está sentado no trono dourado. Moisés e Arão, com os seus cajados, falam com ele.',
  cue: [250, 520],
  art() {
    let s = palace();
    s += throne(580, 700, 1);
    s += farao({ x: 580, y: 700, s: 1, legs: 'sit', drop: 34, hemY: -62, face: 'frown', look: -.5, armL: { a: 20, b: 30 }, armR: { a: 20, b: 30 }, k: 'farao' });
    s += moises({ x: 250, y: 740, s: 1, face: 'determined', look: .6, armL: { a: 14, item: ITEM.staff(220, -1) }, armR: { a: 70, b: -10 }, k: 'moises' });
    s += arao({ x: 120, y: 750, s: .92, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 14, item: ITEM.staff(210, 1) }, k: 'arao' });
    return s;
  },
  setup(api) {
    api.tap(api.q('moises'), 'Moisés', () => { api.snd('trumpet'); api.bubble(250, 440, 'Deixa o meu povo ir!', { key: 'm' }); });
    api.tap(api.q('farao'), 'Faraó', () => {
      api.snd('grunt'); api.shakeHead(api.q('farao'));
      api.bubble(580, 410, 'Não! Eu não vou deixar!', { key: 'f' });
      if (!api.st.ok) { api.st.ok = true; api.nudgeNext(2200); }
    });
    api.tap(api.q('arao'), 'Arão', () => { api.snd('hello'); api.bubble(120, 470, 'Assim diz o Senhor!', { key: 'a', size: 26 }); });
  }
});

/* =====================================================================
   7 — RÃS POR TODO LADO!
   ===================================================================== */
const RAS = [[150, 760, 1.1], [300, 790, 1], [460, 770, 1.2], [640, 790, 1], [740, 740, .9], [560, 560, .8], [430, 360, .7], [270, 560, .8], [90, 600, .8], [700, 600, .9], [580, 290, .6], [350, 640, .7]];
SCENES.push({
  key: 'pragas', title: 'Rãs por todo o lado!', ref: 'Êxodo 7–11', tint: 'meadow',
  text: [
    'O faraó não obedecia. Então Deus mandou coisas muito estranhas para o Egito.',
    'A água do rio ficou vermelha. Vieram mosquitos, moscas, pedras de gelo e escuridão.',
    'E rãs! Rãs na cama, rãs na cozinha, rãs por todo o lado! Croac!'
  ],
  fact: 'Foram dez coisas assim, chamadas pragas. Depois da última, o faraó deixou o povo ir.',
  hint: 'Toca nas rãs.',
  alt: 'O palácio do faraó está cheio de rãs verdes: no chão, no trono e até em cima da coroa do faraó, que está zangado.',
  cue: [150, 740],
  art() {
    let s = palace();
    s += throne(470, 640, .9);
    s += farao({ x: 470, y: 640, s: .9, legs: 'sit', drop: 34, hemY: -62, face: 'angry', look: 0, armL: { a: 150, b: -30 }, armR: { a: 150, b: -30 }, k: 'farao' });
    s += `<g transform="translate(250,560)"><path d="M-40,0 L40,0 L30,40 L-30,40 Z" fill="#c98f57" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="0" rx="40" ry="10" fill="#e9c46a" stroke="${OL}" stroke-width="3"/></g>`;
    RAS.forEach(([x, y, sc], i) => s += `<g data-k="rv${i}"${i > 1 ? ' opacity="0" style="pointer-events:none"' : ''}>${frog(x, y, sc, 'ra' + i)}</g>`);
    return s;
  },
  setup(api) {
    let shown = 2;
    RAS.forEach(([x, y], i) => api.tap(api.q('ra' + i), 'Rã', async () => {
      api.snd('ribbit'); api.hop(api.q('ra' + i), 30);
      for (let k = 0; k < 2 && shown < RAS.length; k++) {
        const j = shown++;
        api.q('rv' + j).style.pointerEvents = 'auto'; api.q('ra' + j).setAttribute('tabindex', '0');
        api.anim(api.q('rv' + j), [{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 400, delay: k * 200, fill: 'forwards' });
        api.later(() => api.snd('ribbit'), 200 + k * 200);
      }
      if (shown >= RAS.length && !api.st.done) { api.st.done = true; await api.wait(800); api.snd('grunt'); api.bubble(470, 330, 'Chega de rãs!', { key: 'f', size: 34 }); api.nudgeNext(2200); }
    }));
    RAS.forEach((r, i) => { if (i > 1) api.q('ra' + i).setAttribute('tabindex', '-1'); });
    api.tap(api.q('farao'), 'Faraó', () => { api.snd('grunt'); api.bubble(470, 330, 'Croac? Que coisa!', { key: 'f', size: 30 }); });
  }
});

/* =====================================================================
   8 — FINALMENTE, LIVRES!
   ===================================================================== */
SCENES.push({
  key: 'saida', title: 'Finalmente, livres!', ref: 'Êxodo 12.31-42; 13.21-22', tint: 'sky',
  text: [
    'O faraó deixou o povo ir! As famílias saíram do Egito, com as ovelhas e os bois.',
    'Deus ia à frente: de dia, numa nuvem muito alta. De noite, num fogo, para iluminar o caminho.'
  ],
  fact: 'A nuvem e o fogo nunca deixaram o povo sozinho.',
  hint: 'Toca na coluna de nuvem e nas famílias.',
  alt: 'Uma longa fila de famílias sai do Egito com sacos, ovelhas e jumentos. À frente deles, uma coluna de nuvem mostra o caminho.',
  cue: [130, 420],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.6, '#f6ead0'], [1, '#f6ead0']]);
    s += `<g data-k="noite" opacity="0"><rect x="-40" y="-40" width="900" height="900" fill="#1d2454"/>${starField(811, 50, 0, 0, 800, 380, { big: .1 })}</g>`;
    s += pyramids({ s: .7, dx: 330, dy: 120 });
    s += hill([[-40, 450], [200, 430], [420, 444], [640, 420], [840, 438]], '#d8c08c');
    s += `<rect x="-40" y="470" width="900" height="420" fill="#e2cf9a"/><path d="M-40,780 C200,700 480,620 860,560 L860,620 C520,660 260,740 60,820 Z" fill="#efdfb6"/>`;
    s += pillar(130, 560, .9);
    s += crowd(LIVRES, [[640, 640, .62], [540, 660, .66], [740, 660, .6]], { look: -.5, k: 'q', armR: { a: 150, b: -20 } });
    s += sheep({ x: 400, y: 700, s: .6 }) + equine({ x: 300, y: 720, s: .44, kind: 'donkey', pack: '#c0392b' });
    s += crowd(LIVRES.slice(3), [[470, 760, .76], [640, 780, .8], [760, 770, .74]], { look: -.5, k: 'r', armL: { a: 30, b: 20 } });
    s += `<rect data-k="sombra" x="-40" y="440" width="900" height="460" fill="#141c4a" opacity="0" style="pointer-events:none"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('coluna'), 'Coluna de nuvem', () => {
      const night = !api.st.night; api.st.night = night;
      api.snd(night ? 'crackle' : 'wind');
      const f = night ? [0, 1] : [1, 0];
      api.anim(api.q('noite'), [{ opacity: f[0] }, { opacity: f[1] }], { duration: 900, fill: 'forwards' });
      api.anim(api.q('sombra'), [{ opacity: f[0] * .35 }, { opacity: f[1] * .35 }], { duration: 900, fill: 'forwards' });
      api.anim(api.q('fogoP'), [{ opacity: f[0] }, { opacity: f[1] }], { duration: 600, fill: 'forwards' });
      api.anim(api.q('nuvemP'), [{ opacity: f[1] }, { opacity: f[0] }], { duration: 600, fill: 'forwards' });
      api.anim(api.q('pglow'), [{ opacity: .5 + f[0] * .5 }, { opacity: .5 + f[1] * .5 }], { duration: 600, fill: 'forwards' });
      if (!api.st.seen) { api.st.seen = true; api.nudgeNext(2600); }
    });
    const said = [N('Estamos livres!'), N('Obrigado, Senhor!'), N('Vamos!')];
    for (const k of ['q0', 'q1', 'q2', 'r0', 'r1', 'r2']) api.tap(api.q(k), 'Família a sair do Egito', () => { const [x] = api.pos(api.q(k)); api.snd('clap'); api.hop(api.q(k), 14); api.bubble(x, 420, said[(k.charCodeAt(0) + +k[1]) % 3], { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   9 — ENCURRALADOS!
   ===================================================================== */
SCENES.push({
  key: 'cerco', title: 'Sem saída!', ref: 'Êxodo 14.5-14', tint: 'stone',
  text: [
    'Mas o faraó mudou de ideia e foi atrás do povo, com os carros de guerra!',
    'À frente, o mar. Atrás, o faraó. E agora? Moisés disse:',
    { q: 'Não tenham medo! Vejam o que Deus vai fazer!', who: 'moises' }
  ],
  fact: 'A nuvem de Deus ficou entre o povo e o exército do faraó.',
  hint: 'Toca no Moisés e nos carros de guerra.',
  alt: 'Na praia do Mar Vermelho, o povo assustado olha para trás: carros de guerra egípcios vêm a levantar pó. Moisés, com o cajado, acalma toda a gente.',
  cue: [260, 520],
  art() {
    let s = sky('sky', [[0, '#7a8fb0'], [.6, '#e6d6c0'], [1, '#e6d6c0']]);
    s += `<rect x="-40" y="380" width="520" height="520" fill="#3f93c7"/>` + `<g>${waveBand(380, { fill: '#5ab0de', amp: 8, len: 120, dx: 24, d: 6, foam: '#d6eff9', fw: 4, bottom: 900 })}</g>`;
    s += `<path d="M300,900 C380,700 440,520 520,380 L860,380 L860,900 Z" fill="#e2cf9a" stroke="${OL}" stroke-width="3"/>`;
    s += hill([[420, 380], [560, 350], [700, 360], [860, 340], [860, 380]], '#cdb98a', '', 380);
    s += `<g transform="translate(700,420)" data-k="carros"><g class="act">${blob([[-80, -20, 40], [-20, -40, 50], [50, -20, 44], [110, 0, 34]], '#e8d8b8', 0)}${chariot(-40, 40, .5)}${chariot(60, 50, .46)}${hitC(10, 0, 110)}</g></g>`;
    s += crowd(LIVRES, [[420, 700, .76], [520, 690, .72], [620, 720, .78], [500, 790, .84]], { faces: ['scared', 'worry', 'o'], look: .6, k: 'p', armL: { a: 120, b: -60 }, armR: { a: 20 } });
    s += moises({ x: 260, y: 744, s: 1.04, face: 'determined', look: .6, armL: { a: 14 }, armR: { a: 150, b: -20, item: ITEM.staff(220, 1), ia: 0 }, k: 'moises' });
    return s;
  },
  setup(api) {
    api.tap(api.q('carros'), 'Carros de guerra do faraó', () => { api.snd('gallop'); api.shake(5); api.burst(700, 420, 'dust', 8); });
    const said = [N('Socorro!'), N('Não há saída!'), N('O que vamos fazer?'), N('Estou com medo!')];
    for (let i = 0; i < 4; i++) api.tap(api.q('p' + i), 'Pessoa assustada', () => { const [x] = api.pos(api.q('p' + i)); api.snd('gulp'); api.bubble(x, 470, said[i], { key: 'p', size: 26 }); });
    api.tap(api.q('moises'), 'Moisés', () => {
      api.snd('trumpet');
      api.bubble(260, 440, 'Não tenham medo! O Senhor vai lutar por vocês!', { key: 'm', dur: 3000 });
      if (!api.st.ok) { api.st.ok = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   10 — O MAR SE ABRIU!
   ===================================================================== */
SCENES.push({
  key: 'mar', title: 'O mar abriu-se!', ref: 'Êxodo 14.15-22', tint: 'water',
  text: [
    'Moisés levantou o cajado. Deus mandou um vento muito forte. Fuuuu!',
    'E o mar abriu-se em dois! A água ficou de pé, como duas paredes. No meio, apareceu um caminho seco.'
  ],
  fact: 'O povo passou sem molhar os pés!',
  hint: 'Toca no cajado de Moisés.',
  alt: 'Moisés ergue o cajado sobre o mar. Com um vento forte, a água abre-se em duas paredes altas, e aparece um caminho seco no meio.',
  cue: [230, 470],
  art() {
    const skyS = sky('sky', [[0, '#3a4a8a'], [.5, '#8a8ac0'], [1, '#c9b8d0']]);
    let s = skyS + `<rect x="-40" y="${HZ}" width="900" height="600" fill="#e2cf9a"/>` + seabed();
    s += `<g transform="translate(0,900)"><g data-k="wl" style="transform:translateX(230px) scaleY(.35)"><g transform="translate(0,-900)">${wallL(5)}</g></g></g>`;
    s += `<g transform="translate(0,900)"><g data-k="wr" style="transform:translateX(-230px) scaleY(.35)"><g transform="translate(0,-900)">${wallR(6)}</g></g></g>`;
    s += `<g data-k="calmo"><g transform="translate(0,0)">${skyS.replace(ID('sky'), ID('sky2')).replace(UR('sky'), UR('sky2'))}</g><rect x="-40" y="${HZ}" width="900" height="600" fill="#2f7fb8"/>${waveBand(HZ, { fill: '#4fa3d4', amp: 8, len: 120, dx: 26, d: 6, foam: '#d6eff9', fw: 4, bottom: 900 })}${waveBand(HZ + 120, { fill: '#3f93c7', amp: 10, len: 150, dx: -30, d: 7, foam: '#cfeaf7', fw: 4, bottom: 900 })}${waveBand(HZ + 260, { fill: '#2f7fb8', amp: 12, len: 170, dx: 30, d: 8, foam: '#cfeaf7', fw: 4, bottom: 900 })}</g>`;
    s += `<path d="M-40,900 L-40,700 C40,690 160,700 260,740 C300,760 320,820 330,900 Z" fill="#c9b07c" stroke="${OL}" stroke-width="3"/>`;
    s += moises({ x: 200, y: 790, s: 1.06, face: 'determined', look: .6, armL: { a: 14 }, armR: { a: 140, b: -30, item: ITEM.staff(230, 1), ia: 0 }, k: 'moises' });
    const [hx, hy] = handAt('adult', 1, { a: 140, b: -30 }, 1.06, 200, 790);
    s += hitC(r1(hx), r1(hy - 60), 70).replace('class="hit"', 'class="hit" data-k="cajado"');
    s += crowd(LIVRES, [[620, 840, .7], [720, 830, .66]], { faces: ['o', 'surprise', 'o'], look: -.4, k: 'p' });
    return s;
  },
  setup(api) {
    const open = async () => {
      if (api.st.open) { api.snd('splash'); api.burst(400, 520, 'ripple', 3); return; }
      api.st.open = true;
      api.snd('rush'); api.later(() => api.snd('wind'), 900);
      for (let i = 0; i < 4; i++) api.later(() => api.burst(160 + i * 160, 300 + (i % 2) * 60, 'wave', 3), i * 250);
      api.anim(api.q('calmo'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1500, fill: 'forwards' });
      api.q('calmo').style.pointerEvents = 'none';
      api.anim(api.q('wl'), [{ transform: 'translateX(230px) scaleY(.35)' }, { transform: 'translateX(0px) scaleY(1)' }], { duration: 2200, fill: 'forwards', easing: 'cubic-bezier(.3,.1,.3,1)' });
      await api.anim(api.q('wr'), [{ transform: 'translateX(-230px) scaleY(.35)' }, { transform: 'translateX(0px) scaleY(1)' }], { duration: 2200, fill: 'forwards', easing: 'cubic-bezier(.3,.1,.3,1)' });
      api.snd('tada');
      api.bubble(230, 480, 'Podem passar!', { key: 'm' });
      api.nudgeNext(2200);
    };
    api.tap(api.q('cajado'), 'Cajado de Moisés', open);
    api.tap(api.q('moises'), 'Moisés', open);
    for (let i = 0; i < 2; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x] = api.pos(api.q('p' + i)); api.snd('gulp'); api.bubble(x, 600, api.st.open ? 'Uau!' : 'O que vai acontecer?', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   11 — PELO MEIO DO MAR
   ===================================================================== */
const FAM = [[400, 600, .52, 0], [330, 720, .66, 1], [470, 790, .74, 2]];
SCENES.push({
  key: 'travessia', title: 'Pelo meio do mar', ref: 'Êxodo 14.22-31', tint: 'water',
  text: [
    'O povo atravessou o mar pelo chão seco, com paredes de água dos dois lados.',
    'Quando o exército do faraó tentou ir atrás, a água voltou ao seu lugar. Chuá! O povo de Deus estava salvo!'
  ],
  fact: 'Era gente sem fim: muitas, muitas famílias!',
  hint: 'Toca nas famílias para elas atravessarem.',
  alt: 'Famílias caminham pelo caminho seco no meio do mar, entre duas paredes de água cheias de peixes coloridos.',
  cue: [330, 640],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.6, '#e9f6f0'], [1, '#e9f6f0']]);
    s += sun(400, HZ - 80, 36, { face: true }) + `<rect x="-40" y="${HZ}" width="900" height="600" fill="#e2cf9a"/>` + hill([[300, HZ], [360, HZ - 26], [440, HZ - 20], [500, HZ]], '#c4cf86', '', HZ + 2);
    s += seabed() + wallL(7) + wallR(8);
    FAM.forEach(([x, y, sc, i]) => {
      const a = LIVRES[i * 2], b = LIVRES[i * 2 + 1];
      s += `<g transform="translate(${x},${y})" data-k="fam${i}"><g class="act">${person(Object.assign({}, a, { x: -36, y: 0, s: sc, face: 'joy', look: 0, armR: { a: 150, b: -20 } }))}${person(Object.assign({}, b, { x: 36, y: 6, s: sc * .92, face: 'grin', look: 0 }))}${i === 1 ? sheep({ x: 90, y: 10, s: sc * .7 }) : ''}${hitC(0, -120 * sc, 150 * sc)}</g></g>`;
    });
    return s;
  },
  setup(api) {
    let crossed = 0;
    FAM.forEach(([x, y, sc, i]) => api.tap(api.q('fam' + i), 'Família a atravessar o mar', async () => {
      const el = api.q('fam' + i);
      api.snd('tiptoe');
      if (el.dataset.gone) return; el.dataset.gone = 1; crossed++;
      api.anim(api.act(el), [{ transform: 'translate(0px,0px) scale(1)' }, { transform: `translate(${400 - x}px,${HZ + 30 - y}px) scale(.2)`, opacity: .2 }], { duration: 2600, fill: 'forwards', easing: 'ease-in' });
      if (crossed === FAM.length) { await api.wait(2400); api.snd('victory'); api.burst(400, 300, 'confetti', 18); api.bubble(400, 260, 'Salvos!', { key: 's', size: 60, plain: true, dur: 2000 }); api.nudgeNext(2000); }
    }));
  }
});

/* =====================================================================
   12 — UMA CANÇÃO DE VITÓRIA
   ===================================================================== */
const DANCAS = [[300, 730, .9], [470, 740, .86], [620, 730, .88]];
SCENES.push({
  key: 'festa', title: 'Uma festa de alegria', ref: 'Êxodo 15.1-21', tint: 'gold',
  text: [
    'Do outro lado do mar, o povo fez uma festa!',
    'Miriã, a irmã de Moisés, tocou pandeireta. E as mulheres dançaram e cantaram:',
    { q: 'Cantem ao Senhor! Ele é maravilhoso!', who: 'outro' }
  ],
  fact: 'Esta é uma das canções mais antigas da Bíblia!',
  hint: 'Toca na Miriã e nas bailarinas.',
  alt: 'Na praia, depois do mar, Miriã toca pandeireta e dança com outras mulheres. Moisés canta de braços abertos, e o mar está calmo atrás deles.',
  cue: [150, 520],
  art() {
    let s = bgDay({ sunX: 660, sunY: 110, sunR: 40 });
    s += `<rect x="-40" y="380" width="900" height="140" fill="#3f93c7"/>` + waveBand(380, { fill: '#5ab0de', amp: 8, len: 120, dx: 24, d: 6, foam: '#d6eff9', fw: 4, bottom: 520 });
    s += `<rect x="-40" y="500" width="900" height="400" fill="#e2cf9a"/><path d="M-40,500 C200,490 600,510 840,496" stroke="${OL}" stroke-width="3" fill="none"/>`;
    s += palm(60, 560, .6) + palm(760, 560, .55);
    s += moises({ x: 716, y: 704, s: .86, face: 'joy', look: -.6, armL: { a: 150, b: -20 }, armR: { a: 14, item: ITEM.staff(200, 1) }, k: 'moises' });
    s += person(Object.assign({}, MIRIA, { x: 150, y: 740, s: 1, legs: 'hop', face: 'laugh', look: .4, armL: { a: 30, b: 20 }, armR: { a: 150, b: -10, item: tambourine('pand'), ia: 0 }, k: 'miria' }));
    const DAN = [LIVRES[1], LIVRES[4], LIVRES[5]];
    DANCAS.forEach(([x, y, sc], i) => s += person(Object.assign({}, DAN[i], { x, y, s: sc, legs: i % 2 ? 'hop' : 'tiptoe', face: i % 2 ? 'joy' : 'laugh', look: i % 2 ? .4 : -.4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20, item: i === 1 ? tambourine() : '', ia: 0 }, k: 'd' + i })));
    s += flowerBand(1201, 770, 795, 5);
    return s;
  },
  setup(api) {
    const seen = new Set();
    const party = async () => {
      if (seen.size < 4 || api.st.done) return; api.st.done = true;
      await api.wait(500);
      api.snd('victory'); api.burst(400, 300, 'confetti', 22);
      api.bubble(400, 330, 'Cantem ao Senhor!', { key: 'c', dur: 2600 });
      api.nudgeNext(2400);
    };
    api.tap(api.q('miria'), 'Miriã com a pandeireta', () => { api.snd('tambourine', 6); api.hop(api.q('miria'), 20); api.burst(150, 460, 'note', 4); seen.add('m'); party(); });
    DANCAS.forEach(([x, y], i) => api.tap(api.q('d' + i), 'Mulher a dançar', () => { api.snd(i === 1 ? 'tambourine' : 'clap'); api.hop(api.q('d' + i), 22); api.burst(x, y - 260, 'note', 2); seen.add(i); party(); }));
    api.tap(api.q('moises'), 'Moisés', () => { api.snd('choir', ['C4', 'E4', 'G4', 'C5']); api.bubble(716, 450, 'O Senhor é a minha força!', { key: 'm' }); });
  }
});

/* =====================================================================
   13 — OS DEZ MANDAMENTOS
   ===================================================================== */
SCENES.push({
  key: 'tabuas', title: 'Os dez mandamentos', ref: 'Êxodo 19–20; 31.18', tint: 'stone',
  text: [
    'No deserto, Deus chamou Moisés para o alto de um monte.',
    'Lá, Deus escreveu dez regras em duas pedras: os dez mandamentos.',
    'Os mandamentos ensinam a amar a Deus e a amar as pessoas.'
  ],
  fact: 'Jesus disse que o mais importante é amar a Deus e amar as pessoas.',
  hint: 'Toca nas tábuas de pedra.',
  alt: 'No alto do monte Sinai, com nuvens e trovões, Moisés segura duas tábuas de pedra com os dez mandamentos. Lá em baixo, as tendas do povo.',
  cue: [400, 420],
  art() {
    let s = sky('sky', [[0, '#6a6a8a'], [.6, '#c9b8a8'], [1, '#e2d2bc']]);
    s += sinai();
    s += `<g transform="translate(400,170)" data-k="nuvem"><g class="act"><g class="storm">${blob([[-150, 10, 50], [-90, -30, 64], [-10, -50, 72], [80, -30, 62], [150, 10, 48], [0, 20, 60], [-70, 24, 46], [74, 24, 46]], '#5d6280', 3)}${blob([[-60, -50, 26], [20, -70, 24], [100, -40, 18]], '#767b98', 0)}</g>${hitC(0, -10, 130)}</g></g>`;
    s += `<g data-k="raio" opacity="0"><path d="M520,170 L490,250 L520,246 L480,330 L560,230 L526,234 L556,170 Z" fill="#fff6a8" stroke="#f2c14e" stroke-width="4" stroke-linejoin="round"/></g>`;
    s += moises({ x: 400, y: 560, s: .92, face: 'joy', look: 0, armL: { a: 14 }, armR: { a: 14 } });
    s += tablets(400, 470, .9);
    s += `<rect x="-40" y="620" width="900" height="300" fill="#d8c08c"/><path d="M-40,620 L840,620" stroke="#c0a070" stroke-width="4"/>`;
    s += [[90, 700], [210, 720], [600, 714], [720, 700]].map(([x, y], i) => tent(x, y, 120, 90, { fill: i % 2 ? '#efe0c4' : '#e7d2b0', flag: i === 1 ? '#3f7fb0' : '' })).join('');
    s += crowd(LIVRES, [[330, 780, .5], [400, 790, .52], [470, 780, .5]], { faces: ['o', 'joy', 'o'], look: 0, armL: { a: 150, b: -20 } });
    return s;
  },
  setup(api) {
    let n = 0;
    const NOTES = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6'];
    api.tap(api.q('tabuas'), 'Tábuas dos dez mandamentos', async () => {
      if (n >= 10) { api.snd('chime', 'C6'); api.burst(400, 410, 'spark', 8, { col: '#fff1b0' }); return; }
      for (let k = 0; k < 2 && n < 10; k++, n++) {
        const t = api.q('m' + n), note = NOTES[n];
        api.later(() => { t.setAttribute('fill', '#c47a00'); api.snd('chime', note); }, k * 260);
      }
      api.badge(520, 330, String(n), { key: 'c' });
      if (n === 10 && !api.st.done) { api.st.done = true; await api.wait(700); api.snd('choir', ['C4', 'E4', 'G4', 'C5', 'E5']); api.burst(400, 400, 'star', 12, { col: '#ffe08a' }); api.bubble(400, 230, 'Os dez mandamentos!', { key: 'm', below: true, dur: 2600 }); api.nudgeNext(2400); }
    });
    api.tap(api.q('nuvem'), 'Nuvem no monte', () => { api.anim(api.q('raio'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 1, offset: .7 }, { opacity: 0 }], { duration: 650 }); api.snd('thunder'); api.later(() => api.shake(6), 200); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas e na coluna de fogo.',
  alt: 'Noite estrelada no deserto. As tendas do povo de Israel brilham perto da coluna de fogo, e uma ovelhinha dorme.',
  cue: [430, 160],
  questions: [
    ['Onde é que a mãe de Moisés pôs o bebé?', 'Num cestinho, no rio.'],
    ['Quem encontrou o bebé?', 'A princesa, filha do faraó.'],
    ['O que é que Moisés viu no deserto?', 'Um arbusto a arder que não se queimava.'],
    ['O que é que aconteceu quando Moisés levantou o cajado?', 'O mar abriu-se!'],
    ['O que é que Deus deu a Moisés no monte?', 'Os dez mandamentos.']
  ],
  verse: ['O Senhor vai lutar por vocês. Fiquem tranquilos!', 'Êxodo 14.14'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(911, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 480], [140, 450], [330, 470], [520, 440], [700, 460], [840, 450]], '#2b416c');
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#4a4466');
    s += pillar(660, 640, .62);
    s += [[120, 640], [260, 660], [420, 650]].map(([x, y]) => tent(x, y, 130, 96, { fill: '#6a5a7a', stripe: '#4a3a5a' })).join('');
    s += hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#3a3a5a');
    s += sheep({ x: 300, y: 744, s: .86, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
    return s;
  },
  setup(api) {
    api.q('fogoP').setAttribute('opacity', '1'); api.q('nuvemP').setAttribute('opacity', '0'); api.q('pglow').setAttribute('opacity', '1');
    const NOTES = ['C6', 'E6', 'G6', 'A6', 'D6'];
    for (let k = 0; k < 5; k++) {
      const el = api.q('star' + k);
      api.tap(el, 'Estrela', () => {
        const [x, y] = api.pos(el);
        api.snd('chime', NOTES[k]);
        api.anim(api.act(el), [{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' });
        api.burst(x, y, 'spark', 7, { col: '#ffe9a6' });
      });
    }
    api.tap(api.q('coluna'), 'Coluna de fogo', () => { api.snd('crackle'); api.burst(660, 520, 'spark', 8, { col: '#ffb24a' }); });
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(320, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'moises',
  title: 'Moisés e o Mar Vermelho',
  cover: { kicker: 'Uma história da Bíblia', title: 'Moisés', small: 'e o Mar Vermelho', sub: 'Deus liberta o seu povo' },
  color: '#17707a',
  ref: 'Êxodo 1 a 20',
  scenes: SCENES
});
})();
