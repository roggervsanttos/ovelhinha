/* =====================================================================
   LIVRO: JOSÉ E A TÚNICA COLORIDA  (Gênesis 37 a 46)
   ===================================================================== */
(() => {
const SCENES = [];
const CORES = ['#e5483f', '#f28c28', '#f6cf3e', '#5fb35a', '#3f93c7', '#8a5fc2'];
// faixas coloridas por cima da túnica (personagem adulto)
function tunica(cols, k = '') {
  const w = y => 29 + 13 * ((y + 186) / 174) - 2.4;
  const top = -178, bot = -16, h = (bot - top) / cols.length;
  let s = '';
  cols.forEach((c, i) => {
    const y1 = top + i * h, y2 = y1 + h;
    s += `<path${k ? ` data-k="${k}${i}"` : ''} d="M${r1(-w(y1))},${r1(y1)} L${r1(w(y1))},${r1(y1)} L${r1(w(y2))},${r1(y2)} L${r1(-w(y2))},${r1(y2)} Z" fill="${c}"/>`;
  });
  s += `<path d="M-30,-122 L30,-122" stroke="#7b4a2a" stroke-width="6"/>`;
  return `<g>${s}</g>`;
}
const COLLAR = `<path d="M-31,-191 Q0,-150 31,-191 L35,-178 Q0,-134 -35,-178 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-29,-183 Q0,-148 29,-183" stroke="#2f6db5" stroke-width="4" fill="none"/>`;
const URAEUS = `<g transform="translate(0,${ADULT.headY - 33})"><path d="M-5,12 C-8,0 -3,-9 2,-11 C7,-9 8,-2 3,1 C1,5 3,9 5,12 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/></g>`;
const JOSE = { kind: 'adult', skin: '#e2a878', hair: '#3a2520', hairStyle: 'short', tunic: '#f4efe6', belt: null };
const JOSE_COR = Object.assign({}, JOSE, { front: tunica(CORES) });
const JOSE_EG = { kind: 'adult', skin: '#e2a878', head: 'cloth', clothCol: '#fffaf0', clothStripe: '#f2c14e', bandCol: '#2f6db5', hair: '#3a2520', tunic: '#fffaf0', trim: '#f2c14e', belt: '#2f6db5', extra: COLLAR };
const JACO_V = { kind: 'adult', skin: '#e2a878', hair: '#e9e5de', hairStyle: 'short', beard: 'long', beardCol: '#f3f0ea', browCol: '#f3f0ea', head: 'cloth', clothCol: '#efe4cc', bandCol: '#3f7fb0', tunic: '#3f7fb0', stripes: '#9ccbe8', longSleeves: true, belt: '#7b4a2a' };
const IRMAOS = [
  { kind: 'adult', skin: '#d99a6c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#7a5a3a', stripes: '#9a7a52', belt: '#4a3226' },
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#8a5a33' },
  { kind: 'adult', skin: '#e2a878', hair: '#5a3020', hairStyle: 'curly', hi: '#8e4b2a', beard: 'short', beardCol: '#5a3020', tunic: '#8e3b4f', belt: '#e9c46a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#c9a54e', belt: '#6b4a33' },
  { kind: 'adult', skin: '#d39463', hair: '#2b1d17', beard: 'long', beardCol: '#2b1d17', tunic: '#2f8a83', belt: '#7b4a2a', head: 'cloth', clothCol: '#d9643f', bandCol: '#8e3b2f' }
];
const BENJAMIM = { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#3a2520', tunic: '#3f93c7', belt: '#7b4a2a' };
const FARAO = { kind: 'adult', skin: '#b9784c', head: 'cloth', clothCol: '#f2c14e', clothStripe: '#2f6db5', bandCol: '#2f6db5', tunic: '#fffaf0', trim: '#f2c14e', belt: '#2f6db5', extra: COLLAR + URAEUS };
const MERCADOR = { kind: 'adult', skin: '#a8683e', hair: '#1f1612', beard: 'short', beardCol: '#1f1612', head: 'cloth', clothCol: '#f2c14e', bandCol: '#d9433b', tunic: '#2f8a5a', belt: '#f2c14e' };
const GUARDA = { kind: 'adult', skin: '#b9784c', hair: '#141018', hairStyle: 'short', tunic: '#f4efe6', trim: '#c0392b', belt: '#c0392b' };
const EGIPCIOS = [
  { kind: 'adult', skin: '#a8683e', hair: '#141018', hairStyle: 'short', tunic: '#f6e3b8', belt: '#c0392b' },
  { kind: 'child', skin: '#b9784c', hair: '#141018', hairStyle: 'short', tunic: '#f4efe6', belt: '#2f6db5' }
];
const FAMILIA = [
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#e86a9a', clothStripe: '#fff2c9', hairStyle: 'long', hair: '#2b1d17', tunic: '#f6dfb0', longSleeves: true, belt: '#b5402f' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#5e9a43', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e7b58a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#5a3020', tunic: '#f4efe6', belt: '#d9643f' }
];
const jose = o => person(Object.assign({}, JOSE_COR, o));
const joseEg = o => person(Object.assign({}, JOSE_EG, o));
const irmao = (i, o) => person(Object.assign({}, IRMAOS[i % IRMAOS.length], o));

/* ---------- peças desta história ---------- */
function pyramids(o = {}) {
  const p = (x, y, w, h, c1, c2) => `<path d="M${x - w / 2},${y} L${x},${y - h} L${x + w / 2},${y} Z" fill="${c1}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M${x},${y - h} L${x + w / 2},${y} L${x + w * .1},${y} Z" fill="${c2}"/><path d="M${x - w / 2},${y} L${x},${y - h} L${x + w / 2},${y} Z" fill="none" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  return `<g transform="translate(${o.dx || 0},${o.dy || 0}) scale(${o.s || 1})">${p(560, 430, 300, 190, '#ecd09a', '#d4ae74')}${p(730, 440, 200, 130, '#e8c88a', '#cfa86a')}${p(390, 446, 150, 96, '#f0d8a6', '#d8b67e')}</g>`;
}
function palace(o = {}) {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#ecd6a8"/><rect x="-40" y="-40" width="900" height="110" fill="#2f6db5"/><rect x="-40" y="62" width="900" height="14" fill="#f2c14e"/>`;
  s += [...Array(15)].map((_, i) => `<rect x="${-30 + i * 60}" y="20" width="30" height="30" fill="${i % 2 ? '#c0392b' : '#f2c14e'}" opacity=".85"/>`).join('');
  const col = x => `<rect x="${x - 26}" y="150" width="52" height="${(o.floor ?? 560) - 150}" fill="#f5e7c8" stroke="${OL}" stroke-width="3"/><g stroke="#2f6db5" stroke-width="5">${[200, 260, 320].map(y => `<path d="M${x - 26},${y} L${x + 26},${y}"/>`).join('')}</g><path d="M${x - 26},150 C${x - 60},120 ${x - 60},96 ${x - 44},90 L${x + 44},90 C${x + 60},96 ${x + 60},120 ${x + 26},150 Z" fill="#5e9a43" stroke="${OL}" stroke-width="3"/><path d="M${x - 36},104 L${x + 36},104" stroke="#f2c14e" stroke-width="5"/>`;
  s += col(o.c1 ?? 110) + col(o.c2 ?? 690);
  const fy = o.floor ?? 560;
  s += `<defs>${lg('chao', [[0, '#d9b98a'], [1, '#c49c66']])}</defs><rect x="-40" y="${fy}" width="900" height="${900 - fy}" fill="${UR('chao')}"/><path d="M-40,${fy} L840,${fy}" stroke="${OL}" stroke-width="4"/>`;
  s += `<g opacity=".4">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${400 + (i - 3) * 60},${fy} L${400 + (i - 3) * 200},860" stroke="#a87c4a" stroke-width="3"/>`).join('')}</g>`;
  return s;
}
function throne(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,-60 L-60,-230 Q0,-260 60,-230 L60,-60 Z" fill="#f2c14e" stroke="${OL}" stroke-width="3.4"/><path d="M-44,-80 L-44,-214 Q0,-236 44,-214 L44,-80 Z" fill="#2f6db5"/><g fill="#f2c14e">${[-26, 0, 26].map(dx => `<path d="${sparkle(8)}" transform="translate(${dx},-180)"/>`).join('')}</g><rect x="-80" y="-96" width="160" height="26" rx="6" fill="#d9a33a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 66},-72 L${k * 70},-6 L${k * 56},0 L${k * 52},-72 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`;
}
function sheaf(x, y, s = 1, k = '', o = {}) {
  const c = o.col || '#e9c46a', d = o.dark || '#c9a03a';
  let g = '';
  for (let i = -5; i <= 5; i++) g += `<path d="M${i * 3},20 Q${i * 4},-30 ${i * 7},-70" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${i * 3},20 Q${i * 4},-30 ${i * 7},-70" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  g += [-35, -21, -7, 7, 21, 35].map((x2, i) => `<ellipse cx="${x2}" cy="${-74 - (i % 2) * 8}" rx="7" ry="15" fill="${c}" stroke="${OL}" stroke-width="2.4" transform="rotate(${x2 / 2} ${x2} ${-74 - (i % 2) * 8})"/>`).join('');
  g += `<path d="M-20,-10 Q0,-2 20,-10" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-20,-10 Q0,-2 20,-10" stroke="#b5402f" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -30, 54) : ''}</g></g>`;
}
function sack(x, y, s = 1, k = '') {
  const g = `<path d="M-30,0 C-40,-30 -30,-58 -14,-64 L14,-64 C30,-58 40,-30 30,0 Z" fill="#d9b98a" stroke="${OL}" stroke-width="3"/><path d="M-14,-64 L-18,-76 L18,-76 L14,-64" fill="#d9b98a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-16,-64 L16,-64" stroke="#8a5a33" stroke-width="5"/><g fill="#e9c46a" stroke="${OL}" stroke-width="1.8"><ellipse cx="-8" cy="-84" rx="4" ry="9" transform="rotate(-20 -8 -84)"/><ellipse cx="4" cy="-86" rx="4" ry="9"/><ellipse cx="14" cy="-82" rx="4" ry="9" transform="rotate(20 14 -82)"/></g><path d="M-20,-30 Q0,-24 20,-30" stroke="#b9996a" stroke-width="3" fill="none"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -40, 46) : ''}</g></g>`;
}
function granary(x, y, s = 1, k = '') {
  let g = `<defs><clipPath id="${ID('silo' + k)}"><path d="M-80,0 L-80,-150 C-80,-250 80,-250 80,-150 L80,0 Z"/></clipPath></defs>`;
  g += `<path d="M-80,0 L-80,-150 C-80,-250 80,-250 80,-150 L80,0 Z" fill="#e6cf9e" stroke="${OL}" stroke-width="4"/>`;
  g += `<g clip-path="url(#${ID('silo' + k)})"><g data-k="${k}nivel" style="transform:translateY(240px)"><rect x="-80" y="-240" width="160" height="240" fill="#f2c94e"/>${[-60, -20, 20, 60].map(x2 => `<ellipse cx="${x2}" cy="-236" rx="18" ry="6" fill="#e9b23a"/>`).join('')}</g></g>`;
  g += `<path d="M-80,0 L-80,-150 C-80,-250 80,-250 80,-150 L80,0 Z" fill="none" stroke="${OL}" stroke-width="4"/>`;
  g += `<g stroke="#c9ad7c" stroke-width="3" fill="none" opacity=".8"><path d="M-80,-60 Q0,-50 80,-60"/><path d="M-80,-120 Q0,-110 80,-120"/></g>`;
  g += `<rect x="-26" y="-210" width="52" height="40" rx="8" fill="#5a3a26" stroke="${OL}" stroke-width="3"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}>${g}</g>`;
}
function well(x, y, s = 1) {
  let g = `<ellipse cx="0" cy="0" rx="120" ry="30" fill="#8e8a96" stroke="${OL}" stroke-width="4"/>`;
  g += `<path d="M-120,0 L-120,-70 L120,-70 L120,0 Z" fill="#b9b1a6" stroke="${OL}" stroke-width="4"/>`;
  g += `<g fill="#d8d1c6" stroke="${OL}" stroke-width="2.4">${[[-100, -50], [-50, -44], [0, -52], [50, -46], [96, -50], [-76, -20], [-24, -18], [28, -22], [80, -18]].map(([a, b]) => `<rect x="${a - 22}" y="${b - 12}" width="44" height="22" rx="6"/>`).join('')}</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function dreamCloud(x, y, w, h, content, k = '', col = '#fbf6ff') {
  const pts = [];
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; pts.push([Math.cos(a) * w * .5, Math.sin(a) * h * .5, Math.min(w, h) * (.2 + (i % 3) * .03)]); }
  const fill = blob(pts, col, 3.4, OL) + `<ellipse cx="0" cy="0" rx="${w * .5}" ry="${h * .5}" fill="${col}"/>`;
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}>${fill}${content}</g>`;
}
function bed(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-170,-40 L170,-40 L170,-6 L-170,-6 Z" fill="#2f6db5" stroke="${OL}" stroke-width="3.4"/><path d="M-170,-60 C-170,-90 -120,-96 -110,-60 Z" fill="#f2c14e" stroke="${OL}" stroke-width="3"/><rect x="-170" y="-64" width="340" height="26" rx="10" fill="#fffaf0" stroke="${OL}" stroke-width="3"/>${[-150, 150].map(xx => `<path d="M${xx},-6 L${xx - 6},30 L${xx + 14},30 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`;
}
function thinCow(x, y, s = 1, k = '', flip = false) {
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act"><g transform="scale(.74,1)">${cow({ x: 0, y: 0, s, flip, cls: '' })}<g transform="scale(${flip ? -s : s},${s})" stroke="${OL}" stroke-width="2.4" opacity=".55" fill="none">${[-30, -14, 2, 18].map(rx => `<path d="M${rx},-120 q-4,22 0,44"/>`).join('')}</g></g>${k ? hitC(0, -70 * s, 70 * s) : ''}</g></g>`;
}
function fatCow(x, y, s = 1, k = '', flip = false) {
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act"><g transform="scale(1.12,1)">${cow({ x: 0, y: 0, s, flip, cls: '' })}</g>${k ? hitC(0, -70 * s, 80 * s) : ''}</g></g>`;
}
function cart(x, y, s = 1) {
  const wheel = cx => `<g transform="translate(${cx},-24)"><circle r="30" fill="none" stroke="${OL}" stroke-width="9"/><circle r="30" fill="none" stroke="#8a5a33" stroke-width="5"/>${[0, 60, 120].map(a => `<path d="M0,0 L${r1(Math.cos(a * Math.PI / 180) * 28)},${r1(Math.sin(a * Math.PI / 180) * 28)} M0,0 L${r1(-Math.cos(a * Math.PI / 180) * 28)},${r1(-Math.sin(a * Math.PI / 180) * 28)}" stroke="#8a5a33" stroke-width="3"/>`).join('')}<circle r="6" fill="#f2c14e" stroke="${OL}" stroke-width="2"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-110,-80 L110,-80 L100,-30 L-100,-30 Z" fill="#b07b4a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-104,-60 L104,-60" stroke="#8a5a33" stroke-width="4"/>${sack(-50, -80, .6)}${sack(10, -80, .66)}${sack(64, -80, .58)}${wheel(-60)}${wheel(60)}<path d="M110,-50 L170,-40" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M110,-50 L170,-40" stroke="#8a5a33" stroke-width="3" stroke-linecap="round"/></g>`;
}
function prisonBG() {
  let s = `<defs>${lg('muro', [[0, '#8e8696'], [1, '#6f6878']])}${rg('feixe', [[0, '#fff6c8', .8], [1, '#fff6c8', 0]])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('muro')}"/>`;
  let br = '';
  for (let r = 0; r < 10; r++) for (let x = -40 + (r % 2 ? 50 : 0); x < 840; x += 100) br += `<rect x="${x}" y="${r * 62}" width="96" height="58" rx="8"/>`;
  s += `<g fill="none" stroke="#5f5868" stroke-width="3.4" opacity=".7">${br}</g>`;
  s += `<rect x="-40" y="620" width="900" height="300" fill="#6a6272"/><path d="M-40,620 L840,620" stroke="${OL}" stroke-width="4"/>`;
  s += blob([[160, 640, 40], [220, 646, 34], [270, 640, 30], [120, 650, 26]], '#e9cf73', 3);
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'José e a Túnica Colorida',
  alt: 'José, sorridente, abre os braços com a sua túnica de muitas cores. Atrás dele, um campo de trigo, as pirâmides do Egito e camelos ao longe.',
  cue: [400, 860],
  art() {
    let s = sky('sky', [[0, '#8fd0f2'], [.45, '#d8f0fa'], [.68, '#fdeec8'], [1, '#fdeec8']], 1100);
    s += sun(640, 520, 50, { face: true }) + cloud(160, 520, .9) + cloud(430, 600, .6, { dx: -26 });
    s += pyramids({ dy: 330, s: 1 });
    s += camel({ x: 140, y: 800, s: .4, saddle: '#b8312f' }) + camel({ x: 220, y: 808, s: .36, saddle: '#3f7fb0' });
    s += hill([[-40, 830], [200, 810], [420, 824], [640, 800], [840, 816]], '#e2c890');
    s += sheaf(110, 1010, 1, 'feixe0') + sheaf(690, 1012, 1, 'feixe1') + sheaf(760, 1030, .8);
    s += hill([[-40, 960], [220, 940], [460, 952], [700, 932], [840, 944]], '#c9d98a');
    s += jose({ x: 400, y: 1060, s: 1.2, face: 'joy', look: 0, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'jose' });
    s += flowerBand(2201, 1050, 1094, 7);
    return s;
  },
  setup(api) {
    api.tap(api.q('jose'), 'José', () => { api.snd('tada'); api.hop(api.q('jose'), 14); api.burst(400, 800, 'spark', 12, { col: '#fff1b0' }); api.bubble(400, 720, 'Olha a minha túnica!', { key: 'j' }); });
    for (const k of ['feixe0', 'feixe1']) api.tap(api.q(k), 'Trigo', () => { api.snd('swish'); api.anim(api.act(api.q(k)), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(6deg)' }, { transform: 'rotate(0deg)' }], { duration: 700 }); });
  }
});

/* =====================================================================
   1 — A TÚNICA COLORIDA
   ===================================================================== */
SCENES.push({
  key: 'tunica', title: 'A túnica colorida', ref: 'Gênesis 37.3', tint: 'gold',
  text: [
    'Jacó tinha doze filhos. Um deles chamava-se José.',
    'Um dia, Jacó deu a José uma túnica linda, cheia de cores!',
    'Quantas cores vês?'
  ],
  fact: 'O pai de José é o Jacó que recebeu o nome Israel!',
  hint: 'Toca na túnica de José para pintares as cores.',
  alt: 'Em frente das tendas, o velho Jacó entrega a José uma túnica. A cada toque, a túnica ganha uma cor nova: vermelho, laranja, amarelo, verde, azul e roxo.',
  cue: [470, 560],
  art() {
    let s = bgDay({ sunX: 680, sunY: 120, sunR: 40 });
    s += hill([[-40, 470], [200, 450], [420, 462], [640, 440], [840, 454]], '#c9d98a');
    s += tent(140, 520, 220, 160, { fill: '#e7d2b0', stripe: '#b6553f' }) + tent(680, 500, 170, 130, { fill: '#efdcb8', stripe: '#3f7fb0' });
    s += `<rect x="-40" y="520" width="900" height="380" fill="#d8e3a0"/>`;
    s += person(Object.assign({}, JACO_V, { x: 270, y: 750, s: 1.04, face: 'joy', look: .6, armL: { a: 14, item: ITEM.staff(220, 1) }, armR: { a: 70, b: -30 }, k: 'jaco' }));
    s += person(Object.assign({}, JOSE, { x: 470, y: 760, s: 1.1, face: 'joy', look: -.4, front: tunica(CORES.map(() => '#f4efe6'), 'c'), armL: { a: 30, b: 20 }, armR: { a: 30, b: 20 }, k: 'jose' }));
    s += grassBand(301, 740, 790, 8);
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('jose'), 'Túnica de José', async () => {
      if (n >= CORES.length) { api.snd('tada'); api.hop(api.q('jose'), 14); api.bubble(470, 420, 'Obrigado, pai!', { key: 'j' }); return; }
      const st = api.q('c' + n);
      st.setAttribute('fill', CORES[n]);
      api.anim(st, [{ opacity: .2 }, { opacity: 1 }], { duration: 350 });
      api.snd('chime', ['C5', 'D5', 'E5', 'F5', 'G5', 'A5'][n]);
      api.burst(470, 600, 'spark', 5, { col: CORES[n] });
      n++;
      api.badge(600, 470, String(n), { key: 'b' });
      if (n === CORES.length) { await api.wait(500); api.snd('tada'); api.hop(api.q('jose'), 16); api.bubble(470, 420, 'Que linda! Obrigado, pai!', { key: 'j', dur: 2600 }); api.nudgeNext(2400); }
    });
    api.tap(api.q('jaco'), 'Jacó, o pai de José', () => { api.snd('heart'); api.burst(270, 480, 'heart', 4); api.bubble(270, 430, 'Um presente para ti, filho!', { key: 'p' }); });
  }
});

/* =====================================================================
   2 — OS SONHOS DE JOSÉ
   ===================================================================== */
const ESTRELAS = [];
for (let i = 0; i < 11; i++) { const a = Math.PI * (.14 + .72 * i / 10); ESTRELAS.push([420 + Math.cos(a) * 190, 290 - Math.sin(a) * 105]); }
SCENES.push({
  key: 'sonhos', title: 'Os sonhos de José', ref: 'Gênesis 37.5-11', tint: 'night',
  text: [
    'José teve sonhos muito estranhos.',
    'Num sonho, o sol, a lua e onze estrelas curvavam-se diante dele!',
    'Quando José contou os sonhos, os irmãos ficaram com muitos ciúmes.'
  ],
  fact: 'José também sonhou que o trigo dos irmãos se curvava diante do trigo dele.',
  hint: 'Toca no sol, na lua e nas estrelas.',
  alt: 'De noite, José dorme numa esteira. No sonho dele, dentro de uma nuvem, o sol, a lua e onze estrelas curvam-se diante de uma estrela maior.',
  cue: [190, 230],
  art() {
    let s = sky('sky', [[0, '#141b4a'], [.6, '#2c3570'], [1, '#3a4889']]);
    s += starField(37, 40, 0, 0, 800, 600, { big: .05 });
    let d = `<g data-k="sol" transform="translate(-200,50)"><g class="act">${sun(0, 0, 36, { face: true, k: 'solx' })}${hitC(0, 0, 50)}</g></g>`;
    d += `<g data-k="lua" transform="translate(200,50)"><g class="act">${moon(0, 0, 32)}${hitC(0, 0, 46)}</g></g>`;
    d += `<g transform="translate(0,20)"><path d="${sparkle(34)}" fill="#ffe08a" stroke="${OL}" stroke-width="2.4"/><circle r="8" fill="#fff"/></g>`;
    ESTRELAS.forEach(([x, y], i) => { d += `<g transform="translate(${r1(x - 420)},${r1(y - 290)})" data-k="e${i}"><g class="act"><path d="${sparkle(19)}" fill="#ffe9a6" stroke="${OL}" stroke-width="2"/>${hitC(0, 0, 26)}</g></g>`; });
    s += dreamCloud(420, 290, 560, 340, d, '', '#46509a');
    s += `<g fill="#46509a" stroke="${OL}" stroke-width="3"><circle cx="230" cy="520" r="16"/><circle cx="200" cy="556" r="10"/></g>`;
    s += `<rect x="-40" y="600" width="900" height="300" fill="#4a4466"/>`;
    s += `<path d="M90,640 L470,640 L500,700 L60,700 Z" fill="#b8312f" stroke="${OL}" stroke-width="3"/>`;
    s += `<g transform="translate(270,680) rotate(-90)" data-k="jose"><g>${jose({ x: 0, y: 110, s: .86, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>`;
    s += `<text class="zzz svgtxt" style="--d:3s" x="150" y="590" font-size="30" fill="#ffffff">z</text>`;
    return s;
  },
  setup(api) {
    const done = new Set();
    const bow = (el, k, note) => {
      api.snd('chime', note);
      api.anim(api.act(el), [{ transform: 'translateY(0px) scale(1)' }, { transform: 'translateY(14px) scale(.85)' }, { transform: 'translateY(0px) scale(1)' }], { duration: 700 });
      const [x, y] = api.pos(el);
      api.burst(420 + x, 290 + y, 'spark', 4, { col: '#fff1b0' });
      done.add(k);
      if (done.size === 6 && !api.st.n) { api.st.n = true; api.later(() => { api.bubble(420, 140, 'Todos se curvaram diante de José!', { key: 'z', dur: 2600 }); api.nudgeNext(2600); }, 700); }
    };
    api.tap(api.q('sol'), 'Sol', () => bow(api.q('sol'), 'sol', 'C5'));
    api.tap(api.q('lua'), 'Lua', () => bow(api.q('lua'), 'lua', 'E5'));
    ESTRELAS.forEach((_, i) => api.tap(api.q('e' + i), 'Estrela', () => bow(api.q('e' + i), 'e' + i, ['G5', 'A5', 'B5', 'C6', 'D6', 'E6'][i % 6])));
    api.tap(api.q('jose'), 'José a dormir', () => { api.snd('snore'); api.bubble(240, 560, 'Zzz...', { key: 'j', size: 26, dur: 1300 }); });
  }
});

/* =====================================================================
   3 — NO POÇO
   ===================================================================== */
SCENES.push({
  key: 'poco', title: 'No poço', ref: 'Gênesis 37.12-24', tint: 'sand',
  text: [
    'Um dia, José foi visitar os irmãos no campo.',
    'Os irmãos tiraram-lhe a túnica e atiraram José para um poço sem água. Que maldade!'
  ],
  fact: 'Rúben, o irmão mais velho, não queria que fizessem mal a José.',
  hint: 'Toca no José, no poço.',
  alt: 'No campo, José está dentro de um poço seco e olha para cima, triste. À volta, os irmãos seguram a túnica colorida dele.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 38 });
    s += hill([[-40, 440], [200, 420], [420, 434], [640, 410], [840, 426]], '#c9d98a');
    s += `<rect x="-40" y="440" width="900" height="460" fill="#dfe6a6"/>`;
    s += sheep({ x: 680, y: 480, s: .5, pose: 'graze' }) + sheep({ x: 740, y: 492, s: .46, flip: true });
    s += irmao(1, { x: 120, y: 640, s: .92, face: 'frown', look: .6, armL: { a: 14 }, armR: { a: 20 }, k: 'i0' });
    s += irmao(3, { x: 230, y: 680, s: .96, face: 'frown', look: .6, armL: { a: 40, b: 40, item: `<g transform="translate(-10,-10)">${ITEM.cloth('#f28c28')}</g>` }, armR: { a: 20 }, k: 'i1' });
    s += irmao(4, { x: 660, y: 690, s: .96, face: 'frown', look: -.6, armL: { a: 20 }, armR: { a: 20 }, k: 'i2' });
    s += `<g transform="translate(400,660)"><ellipse cx="0" cy="0" rx="130" ry="36" fill="#5a4e46" stroke="${OL}" stroke-width="4"/><g data-k="jose">${person(Object.assign({}, JOSE, { x: 0, y: 150, s: .8, face: 'sad', look: 0, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } }))}${hitC(0, -60, 70)}</g></g>`;
    s += well(400, 744, 1.12);
    s += `<path d="M260,668 Q400,710 540,668" stroke="${OL}" stroke-width="5" fill="none"/>`;
    s += grassBand(401, 740, 790, 8);
    return s;
  },
  setup(api) {
    api.tap(api.q('jose'), 'José no poço', () => { api.snd('gulp'); api.anim(api.q('jose'), [{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(0px)' }], { duration: 500 }); api.bubble(400, 400, 'Socorro! Tirem-me daqui!', { key: 'j' }); api.nudgeNext(2600); });
    for (let i = 0; i < 3; i++) api.tap(api.q('i' + i), 'Irmão de José', () => { const [x, y, sc] = api.pos(api.q('i' + i)); api.snd('grunt'); api.bubble(x, y - 250 * sc, ['Hunf!', 'Agora já não sonha mais!', 'Hunf!'][i], { key: 'i', size: 26 }); });
  }
});

/* =====================================================================
   4 — A CAMINHO DO EGITO
   ===================================================================== */
SCENES.push({
  key: 'egito', title: 'A caminho do Egito', ref: 'Gênesis 37.25-28', tint: 'sand',
  text: [
    'Depois, passaram uns homens com camelos. Os irmãos venderam José a esses homens.',
    'E os homens levaram José para muito longe, para o Egito.'
  ],
  fact: 'Os irmãos venderam José por vinte moedas de prata.',
  hint: 'Toca nos camelos para a caravana andar.',
  alt: 'No deserto, uma caravana de camelos atravessa as dunas. José caminha junto, triste. Ao longe aparecem as pirâmides do Egito.',
  cue: [560, 560],
  art() {
    let s = sky('sky', [[0, '#8fd0f2'], [.55, '#fdeec8'], [1, '#fdeec8']]);
    s += sun(140, 120, 40, { face: true });
    s += pyramids({ dx: 120, dy: 40, s: .7 });
    s += hill([[-40, 480], [200, 456], [420, 470], [640, 446], [840, 462]], '#ecd09a') + hill([[-40, 560], [240, 530], [480, 548], [720, 520], [840, 534]], '#e8c88a');
    s += `<rect x="-40" y="560" width="900" height="340" fill="#f0d8a6"/>`;
    s += `<g data-k="caravana"><g class="act">`;
    s += camel({ x: 600, y: 700, s: .8, saddle: '#b8312f', k: 'c0' });
    s += person(Object.assign({}, MERCADOR, { x: 720, y: 712, s: .8, legs: 'walk', face: 'smile', look: .5, armL: { a: 30, b: 30 }, armR: { a: 20 } }));
    s += camel({ x: 280, y: 690, s: .74, saddle: '#3f7fb0', k: 'c1' });
    s += person(Object.assign({}, JOSE, { x: 440, y: 724, s: .86, legs: 'walk', face: 'sad', look: .4, armL: { a: 14 }, armR: { a: 14 }, k: 'jose' }));
    s += `</g></g>`;
    s += grassBand(501, 740, 790, 5, ['#b9a85a']);
    return s;
  },
  setup(api) {
    const walk = () => { api.snd('tiptoe'); api.anim(api.act(api.q('caravana')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(36px)' }, { transform: 'translateX(0px)' }], { duration: 1400 }); };
    api.tap(api.q('c0'), 'Camelo', () => { walk(); api.hop(api.q('c0'), 10); });
    api.tap(api.q('c1'), 'Camelo', () => { walk(); api.hop(api.q('c1'), 10); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('jose'), 'José', () => { api.snd('hm'); api.bubble(440, 420, 'Deus, cuida de mim!', { key: 'j' }); });
  }
});

/* =====================================================================
   5 — DEUS ESTAVA COM JOSÉ
   ===================================================================== */
SCENES.push({
  key: 'prisao', title: 'Deus estava com José', ref: 'Gênesis 39.2-4, 20-23', tint: 'stone',
  text: [
    'No Egito, José trabalhava muito bem. Mas um dia foi preso, sem ter feito nada de mal.',
    'Mesmo assim, José não ficou sozinho. Deus estava com ele!'
  ],
  fact: 'A Bíblia diz várias vezes: «O Senhor estava com José».',
  hint: 'Toca na janela e no José.',
  alt: 'Numa prisão de pedra, uma luz dourada entra pela janela com grades e ilumina José, que está sentado na palha e sorri. Um guarda está na porta.',
  cue: [560, 210],
  art() {
    let s = prisonBG() + `<defs>${rg('jluz', [[0, '#fff6c8', .9], [.6, '#ffe28a', .3], [1, '#ffe28a', 0]])}</defs>`;
    s += `<g data-k="feixe" opacity=".55" style="pointer-events:none"><path d="M500,170 L620,170 L560,640 L240,640 Z" fill="#fff3c4" opacity=".55"/><circle cx="560" cy="210" r="150" fill="${UR('jluz')}"/></g>`;
    s += `<g transform="translate(560,210)" data-k="janela"><g class="act"><rect x="-70" y="-60" width="140" height="120" rx="10" fill="#7cc0ea" stroke="${OL}" stroke-width="5"/>${moon(30, -16, 18)}${[-35, 0, 35].map(dx => `<path d="M${dx},-60 L${dx},60" stroke="#4a4458" stroke-width="9"/>`).join('')}${hitC(0, 0, 80)}</g></g>`;
    s += `<rect x="40" y="250" width="150" height="370" rx="8" fill="#5a3a26" stroke="${OL}" stroke-width="5"/><g stroke="#3a2418" stroke-width="5">${[70, 110, 150].map(x => `<path d="M${x},270 L${x},600"/>`).join('')}</g><circle cx="168" cy="440" r="8" fill="#c9a54e" stroke="${OL}" stroke-width="2"/>`;
    s += person(Object.assign({}, GUARDA, { x: 250, y: 650, s: .92, face: 'smile', look: .6, armL: { a: 14, item: ITEM.spear(250, 5), ia: 0 }, armR: { a: 30, b: 30 }, k: 'guarda' }));
    s += person(Object.assign({}, JOSE, { x: 500, y: 676, s: 1.04, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: .2, armL: { a: -24, b: -84 }, armR: { a: -24, b: -84 }, k: 'jose' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('janela'), 'Janela da prisão', () => { api.snd('twinkle'); api.anim(api.q('feixe'), [{ opacity: .55 }, { opacity: 1 }, { opacity: .7 }], { duration: 1400, fill: 'forwards' }); api.burst(560, 240, 'spark', 8, { col: '#fff1b0' }); });
    api.tap(api.q('jose'), 'José', () => { api.snd('anoint'); api.burst(500, 420, 'heart', 5); api.bubble(500, 380, 'Deus está comigo!', { key: 'j' }); api.nudgeNext(2400); });
    api.tap(api.q('guarda'), 'Guarda da prisão', () => { api.snd('hello'); api.bubble(250, 380, 'José, toma conta dos presos por mim!', { key: 'g' }); });
  }
});

/* =====================================================================
   6 — OS SONHOS DO FARAÓ
   ===================================================================== */
SCENES.push({
  key: 'farao', title: 'Os sonhos do faraó', ref: 'Gênesis 41.1-8', tint: 'gold',
  text: [
    'O rei do Egito, o faraó, teve um sonho esquisito: sete vacas gordas e sete vacas magrinhas!',
    'Ninguém sabia o que o sonho queria dizer. Então chamaram José.'
  ],
  fact: 'O faraó sonhou também com sete espigas de trigo cheias e sete espigas secas.',
  hint: 'Toca nas vacas e no faraó.',
  alt: 'O faraó dorme numa cama dourada. No sonho, numa nuvem, há vacas gordas na margem do rio Nilo e vacas magrinhas a chegar.',
  cue: [250, 290],
  art() {
    let s = palace({ floor: 600 });
    let d = `<rect x="-300" y="40" width="600" height="60" fill="#5ab0de"/><path d="M-300,40 Q-150,30 0,40 T300,40" stroke="#d6eff9" stroke-width="4" fill="none"/>`;
    d += fatCow(-200, 44, .6, 'g0') + fatCow(-70, 52, .6, 'g1');
    d += thinCow(90, 50, .6, 'm0', true) + thinCow(210, 44, .6, 'm1', true);
    s += dreamCloud(400, 250, 680, 320, `<g transform="translate(0,-10)">${d}</g>`);
    s += `<g fill="#fffaf0" stroke="${OL}" stroke-width="3"><circle cx="300" cy="460" r="14"/><circle cx="270" cy="500" r="9"/></g>`;
    s += bed(300, 700, 1);
    s += `<g transform="translate(300,640) rotate(-90)" data-k="farao"><g>${person(Object.assign({}, FARAO, { x: 0, y: 110, s: .8, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } }))}</g></g>`;
    s += `<rect x="128" y="644" width="300" height="34" rx="12" fill="#5872b8" stroke="${OL}" stroke-width="3"/>`;
    return s;
  },
  setup(api) {
    const moo = (k, fat) => { api.snd('moo'); api.hop(api.q(k), fat ? 6 : 14); };
    for (const k of ['g0', 'g1']) api.tap(api.q(k), 'Vaca gorda', () => moo(k, true));
    for (const k of ['m0', 'm1']) api.tap(api.q(k), 'Vaca magrinha', () => { moo(k, false); api.st.m = true; });
    api.tap(api.q('farao'), 'Faraó a dormir', () => {
      api.snd('gulp'); api.bubble(300, 520, 'Que sonho esquisito! O que é que quer dizer?', { key: 'f', dur: 2800 });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   7 — JOSÉ EXPLICA O SONHO
   ===================================================================== */
const SACOS = [[300, 700], [360, 712], [420, 700], [480, 714], [330, 650], [390, 660], [450, 650]];
SCENES.push({
  key: 'chefe', title: 'José, o chefe do Egito', ref: 'Gênesis 41.25-49', tint: 'gold',
  text: [
    'José disse: «Quem explica é Deus!» Vão vir sete anos com muita comida. Depois, sete anos sem comida.',
    'O faraó gostou tanto que fez de José o chefe do Egito! E José guardou muito trigo nos celeiros.'
  ],
  fact: 'José tinha trinta anos quando se tornou chefe do Egito.',
  hint: 'Toca nos sacos de trigo para encheres o celeiro.',
  alt: 'José, com roupas egípcias e um colar de ouro, mostra o celeiro. No meio há sacos de trigo; a cada toque, um saco vai para o celeiro e ele fica mais cheio.',
  cue: [300, 640],
  art() {
    let s = sky('sky', [[0, '#8fd0f2'], [.55, '#fdeec8'], [1, '#fdeec8']]);
    s += sun(680, 110, 40, { face: true });
    s += pyramids({ dx: -260, dy: 60, s: .6 });
    s += `<rect x="-40" y="480" width="900" height="420" fill="#ecd09a"/>`;
    s += granary(660, 600, 1.05, 'silo');
    s += `<g opacity=".95">${granary(500, 560, .62)}</g>`;
    s += joseEg({ x: 140, y: 740, s: 1.08, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 100, b: -20 }, k: 'jose' });
    SACOS.forEach(([x, y], i) => s += sack(x, y, .9, 's' + i));
    s += grassBand(701, 740, 790, 5, ['#b9a85a']);
    return s;
  },
  setup(api) {
    let n = 0;
    SACOS.forEach(([x, y], i) => api.tap(api.q('s' + i), 'Saco de trigo', async () => {
      const sk = api.q('s' + i);
      if (sk.dataset.ok) return;
      sk.dataset.ok = 1; n++;
      api.snd('whoosh');
      api.anim(api.act(sk), [{ transform: 'translate(0px,0px) scale(1)', opacity: 1 }, { transform: `translate(${(640 - x) / 2}px,${-120}px) scale(.8)`, opacity: 1, offset: .5 }, { transform: `translate(${640 - x}px,${420 - y}px) scale(.4)`, opacity: 0 }], { duration: 800, fill: 'forwards' });
      sk.style.pointerEvents = 'none';
      await api.wait(700);
      api.snd('pour');
      api.anim(api.q('silonivel'), [{ transform: `translateY(${240 - (n - 1) * 30}px)` }, { transform: `translateY(${240 - n * 30}px)` }], { duration: 500, fill: 'forwards' });
      api.badge(660, 360, String(n), { key: 'b' });
      if (n === SACOS.length) { await api.wait(500); api.snd('tada'); api.bubble(160, 430, 'Agora há comida para toda a gente!', { key: 'j', dur: 2800 }); api.nudgeNext(2600); }
    }));
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(160, 430, 'Quem explica os sonhos é Deus!', { key: 'j' }); });
  }
});

/* =====================================================================
   8 — OS IRMÃOS NO EGITO
   ===================================================================== */
const CURVA = [[110, 744, 0], [220, 752, 1], [330, 744, 2], [440, 756, 3]];
SCENES.push({
  key: 'irmaos', title: 'Os irmãos no Egito', ref: 'Gênesis 42.1-8', tint: 'sand',
  text: [
    'Lá longe, a família de José ficou sem comida. Então os irmãos foram ao Egito comprar trigo.',
    'Curvaram-se diante de José. Mas não sabiam que era ele! Lembras-te do sonho?'
  ],
  fact: 'José reconheceu os irmãos, mas eles não reconheceram José.',
  hint: 'Toca nos irmãos e no José.',
  alt: 'No palácio, José, vestido de egípcio, está sentado num trono. Os irmãos chegam e curvam-se até ao chão, sem saberem quem ele é.',
  cue: [220, 560],
  art() {
    let s = palace({ floor: 620, c1: 760, c2: 900 });
    s += throne(640, 650, .9);
    s += joseEg({ x: 640, y: 640, s: .98, legs: 'sit', drop: 30, hemY: -62, face: 'o', look: -.6, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'jose' });
    CURVA.forEach(([x, y, i]) => s += `<g transform="translate(${x},${y})" data-k="i${i}"><g class="act">${irmao(i, { x: 0, y: 0, s: .9, legs: 'kneel', face: 'worry', look: .6, armL: { a: 40, b: 40 }, armR: { a: 40, b: 40 } })}${hitC(0, -120, 70)}</g></g>`);
    return s;
  },
  setup(api) {
    CURVA.forEach(([x, y, i]) => api.tap(api.q('i' + i), 'Irmão de José', () => {
      api.snd('hm');
      api.anim(api.act(api.q('i' + i)), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(22deg)', offset: .7 }, { transform: 'rotate(0deg)' }], { duration: 1200 });
      api.bubble(x, y - 290, ['Queremos comprar trigo!', 'Viemos de Canaã.', 'Por favor, senhor!', 'Estamos com fome!'][i], { key: 'i', size: 26 });
      api.st.c = (api.st.c || 0) + 1;
      if (api.st.c === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(3000); }
    }));
    api.tap(api.q('jose'), 'José', () => { api.snd('gulp'); api.bubble(640, 330, 'São os meus irmãos!', { key: 'j' }); });
  }
});

/* =====================================================================
   9 — EU SOU JOSÉ!
   ===================================================================== */
const ABRACO = [[150, 750, 0], [270, 760, 2], [560, 760, 4], [680, 750, 3]];
SCENES.push({
  key: 'perdao', title: 'Eu sou José!', ref: 'Gênesis 45.1-15', tint: 'rose',
  text: [
    'José não aguentou e chorou:',
    { q: 'Eu sou José, o vosso irmão! Não tenham medo. Eu perdoo-vos!', who: 'jose' },
    'E José abraçou os irmãos, um a um.'
  ],
  fact: 'José disse: «Vocês queriam fazer-me mal, mas Deus transformou o mal em bem.»',
  hint: 'Toca no José e depois nos irmãos.',
  alt: 'No palácio, José abre os braços e chora de alegria. Os irmãos, primeiro assustados, sorriem e vêm abraçá-lo. O irmão mais novo, Benjamim, está no meio.',
  cue: [400, 500],
  art() {
    let s = palace({ floor: 620 });
    s += `<g data-k="medo">${ABRACO.map(([x, y, i]) => irmao(i, { x, y, s: .92, face: 'scared', look: (400 - x) / 300, armL: { a: 30, b: 50 }, armR: { a: 30, b: 50 } })).join('')}</g>`;
    s += `<g data-k="alegria" opacity="0">${ABRACO.map(([x, y, i], j) => irmao(i, { x, y, s: .92, face: 'joy', look: (400 - x) / 300, armL: { a: 110, b: -20 }, armR: { a: 110, b: -20 }, k: 'i' + j })).join('')}</g>`;
    s += person(Object.assign({}, BENJAMIM, { x: 470, y: 770, s: 1, face: 'o', look: -.4, armL: { a: 20 }, armR: { a: 20 }, k: 'benja' }));
    s += joseEg({ x: 380, y: 760, s: 1.08, face: 'joy', look: 0, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'jose' });
    s += tears(380, 548, 1.1);
    return s;
  },
  setup(api) {
    const reveal = async () => {
      if (api.st.ok) { api.snd('heart'); api.burst(380, 480, 'heart', 6); return; }
      api.st.ok = true;
      api.snd('chime', 'E6');
      api.bubble(380, 330, 'Eu sou José, o vosso irmão!', { key: 'j', dur: 2800 });
      await api.wait(1500);
      api.q('medo').setAttribute('opacity', '0');
      api.anim(api.q('alegria'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('tada'); api.burst(400, 420, 'heart', 10);
      api.nudgeNext(3000);
    };
    api.tap(api.q('jose'), 'José', reveal);
    ABRACO.forEach(([x, y], j) => api.tap(api.q('i' + j), 'Irmão de José', () => {
      if (!api.st.ok) { reveal(); return; }
      api.snd('heart');
      api.anim(api.act(api.q('i' + j)), [{ transform: 'translateX(0px)' }, { transform: `translateX(${x < 400 ? 40 : -40}px)` }, { transform: 'translateX(0px)' }], { duration: 900 });
      api.burst(x, y - 240, 'heart', 4);
      api.bubble(x, y - 270, 'Perdão, José!', { key: 'i', size: 26 });
    }));
    api.tap(api.q('benja'), 'Benjamim', () => { api.snd(api.st.ok ? 'tada' : 'gulp'); api.hop(api.q('benja'), 16); api.bubble(470, 520, api.st.ok ? 'Meu irmão José!' : 'Quem é ele?', { key: 'b', size: 26 }); });
  }
});

/* =====================================================================
   10 — A FAMÍLIA JUNTA DE NOVO
   ===================================================================== */
SCENES.push({
  key: 'juntos', title: 'A família junta outra vez', ref: 'Gênesis 45.25–46.30', tint: 'meadow',
  text: [
    'O velho Jacó também foi para o Egito. Quando viu José, deu-lhe um abraço muito apertado e chorou de alegria!',
    'E a família toda ficou junta outra vez.'
  ],
  fact: 'Jacó achava que nunca mais ia ver José. Que boa surpresa!',
  hint: 'Toca no Jacó e no José.',
  alt: 'Na terra do Egito, perto das pirâmides, chega uma carroça cheia de sacos. O velho Jacó abraça José, e a família toda festeja à volta.',
  cue: [400, 520],
  art() {
    let s = sky('sky', [[0, '#8fd0f2'], [.55, '#fdeec8'], [1, '#fdeec8']]);
    s += sun(140, 110, 40, { face: true }) + cloud(420, 120, .7);
    s += pyramids({ dx: 40, dy: 60, s: .66 });
    s += `<rect x="-40" y="480" width="900" height="420" fill="#dfe6a6"/>`;
    s += cart(140, 640, .9);
    s += person(Object.assign({}, FAMILIA[0], { x: 640, y: 740, s: .9, face: 'joy', look: -.6, armL: { a: 30, b: 50 }, armR: { a: 130, b: -20 }, k: 'f0' }));
    s += person(Object.assign({}, FAMILIA[1], { x: 730, y: 770, s: .8, legs: 'hop', face: 'laugh', look: -.6, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 }, cls: 'bounce', k: 'f1' }));
    s += person(Object.assign({}, FAMILIA[2], { x: 80, y: 770, s: .8, face: 'joy', look: .6, armL: { a: 40 }, armR: { a: 140, b: -20 }, k: 'f2' }));
    s += `<g data-k="abraco"><g class="act">${person(Object.assign({}, JACO_V, { x: 330, y: 760, s: 1.04, face: 'joy', look: .6, armL: { a: 14, item: ITEM.staff(220, -1) }, armR: { a: 70, b: -50 } }))}${joseEg({ x: 450, y: 760, s: 1.04, face: 'joy', look: -.6, armL: { a: 70, b: -50 }, armR: { a: 30 } })}${tears(330, 548, 1)}${hitC(390, 600, 140)}</g></g>`;
    s += grassBand(1001, 740, 790, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('abraco'), 'Jacó e José', () => {
      api.snd('heart');
      api.anim(api.act(api.q('abraco')), [{ transform: 'scale(1)' }, { transform: 'scale(1.04,.98)' }, { transform: 'scale(1)' }], { duration: 700 });
      api.burst(390, 440, 'heart', 8);
      api.bubble(390, 330, 'Meu filho! Estás vivo!', { key: 'a', dur: 2600 });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
    for (let i = 0; i < 3; i++) api.tap(api.q('f' + i), 'Família de José', () => { const [x, y, sc] = api.pos(api.q('f' + i)); api.snd('tada'); api.hop(api.q('f' + i), 16); api.burst(x, y - 220 * sc, 'confetti', 8); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre as pirâmides do Egito; uma ovelhinha dorme perto de um feixe de trigo.',
  cue: [430, 160],
  questions: [
    ['Que presente deu Jacó a José?', 'Uma túnica colorida.'],
    ['Porque é que os irmãos ficaram zangados?', 'Por terem ciúmes de José.'],
    ['Quem estava com José no Egito?', 'Deus!'],
    ['O que é que José guardou nos anos bons?', 'Muito trigo.'],
    ['O que é que José fez quando viu os irmãos?', 'Perdoou-lhes e deu-lhes um abraço!']
  ],
  wrong: [
    ['Uma coroa de ouro.', 'Um cão.', 'Uma espada.'],
    ['Porque José partiu um cântaro.', 'Porque José foi embora.', 'Porque estavam com fome.'],
    ['Ninguém.', 'Os irmãos dele.', 'O pai, Jacó.'],
    ['Muito ouro.', 'Muitos camelos.', 'Muitos brinquedos.'],
    ['Mandou-os para a prisão.', 'Escondeu-se deles.', 'Mandou-os embora sem comida.']
  ],
  verse: ['Vocês queriam fazer-me mal, mas Deus transformou o mal em bem.', 'Gênesis 50.20'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1501, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<g opacity=".9">${pyramids({ dx: 200, dy: 230, s: .6 }).replace(/#ecd09a|#e8c88a|#f0d8a6/g, '#4a4a7a').replace(/#d4ae74|#cfa86a|#d8b67e/g, '#3a3a66')}</g>`;
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += sheaf(560, 700, .9);
    s += sheep({ x: 300, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
    for (let i = 0; i < 7; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${80 + i * 100}" cy="${640 + (i % 3) * 22}" r="3" fill="#f6f39a"/>`;
    return s;
  },
  setup(api) {
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(320, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

function tears(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="#7fc4e8" stroke="${OL}" stroke-width="1.6" style="pointer-events:none">${[[-12, 0], [12, 4]].map(([a, b]) => `<path d="M${a},${b - 6} C${a + 4},${b} ${a + 4},${b + 4} ${a},${b + 6} C${a - 4},${b + 4} ${a - 4},${b} ${a},${b - 6} Z"/>`).join('')}</g>`;
}

Ov.addBook({
  id: 'jose',
  title: 'José e a Túnica Colorida',
  cover: { kicker: 'Uma história da Bíblia', title: 'José', small: 'e a Túnica Colorida', sub: 'Deus transforma o mal em bem' },
  color: '#b5651d',
  ref: 'Gênesis 37 a 46',
  scenes: SCENES
});
})();
