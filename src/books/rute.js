/* =====================================================================
   LIVRO: RUTE E NOEMI  (Rute 1–4)
   ===================================================================== */
(() => {
const SCENES = [];
const RUTE = { kind: 'adult', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#c0504d', belt: '#f2c14e' };
const NOEMI = { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#b9aea6', tunic: '#7a5a8a', belt: '#e9c46a' };
const ORFA = { kind: 'adult', skin: '#d39463', head: 'scarf', clothCol: '#5e9a43', hairStyle: 'long', hair: '#3a2520', tunic: '#e9c46a', belt: '#5e9a43' };
const BOAZ = { kind: 'adult', skin: '#d39463', hair: '#5a4030', beard: 'long', beardCol: '#8a7262', head: 'cloth', clothCol: '#f4efe6', bandCol: '#2f6db5', tunic: '#2f6db5', stripes: '#9cc4e8', cloak: '#8a5a33', cloakTrim: '#f2c14e', belt: '#f2c14e' };
const CEIF = [
  { kind: 'adult', skin: '#b9784c', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'cloth', clothCol: '#f4efe6', bandCol: '#8a5a33', tunic: '#e9dcc0', belt: '#8a5a33' },
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#a8c46a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#d99a6c', hair: '#5a3020', hairStyle: 'short', beard: 'short', beardCol: '#5a3020', head: 'cloth', clothCol: '#e9c46a', bandCol: '#b5402f', tunic: '#d9a35a', belt: '#7b4a2a' }
];
const VIZINHAS = [
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' },
  { kind: 'adult', skin: '#c98a5a', head: 'scarf', clothCol: '#e86a9a', hairStyle: 'long', hair: '#3a2520', tunic: '#8fb5d9', belt: '#e86a9a' }
];
const p = (who, o) => person(Object.assign({}, who, o));
const NOMES = [N('Rute'), N('Orfa')];

/* ---------- peças desta história ---------- */
// foice dos ceifeiros (na mão)
const FOICE = `<g><path d="M0,16 L0,-8" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M0,16 L0,-8" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/><path d="M0,-8 C2,-34 34,-44 50,-22" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M0,-8 C2,-34 34,-44 50,-22" stroke="#d6dde3" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
// uma espiga de cevada, com as barbas; o.a deita-a no chão
function espiga(x, y, s = 1, o = {}) {
  const c = o.col || '#eab84c', st = o.stem || '#cf9a36', h = o.h ?? 80, b = o.bend ?? 6;
  let g = `<path d="M0,0 Q${b},${-h / 2} 0,${-h}" stroke="${OL}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M0,0 Q${b},${-h / 2} 0,${-h}" stroke="${st}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  g += `<g transform="translate(0,${-h})"><g stroke="#d4a243" stroke-width="1.8" stroke-linecap="round" fill="none">${[0, 1, 2, 3].map(i => `<path d="M-3,${-4 - i * 8} l-8,-15 M3,${-4 - i * 8} l8,-15"/>`).join('')}</g>`;
  g += `<path d="M0,3 C-9,-5 -10,-26 0,-38 C10,-26 9,-5 0,3 Z" fill="${c}" stroke="${OL}" stroke-width="2.2"/><path d="M-5,-7 L0,-11 L5,-7 M-5,-17 L0,-21 L5,-17 M-4,-27 L0,-31 L4,-27" stroke="#c48d2c" stroke-width="1.8" fill="none" stroke-linejoin="round"/></g>`;
  const inner = o.still ? g : `<g class="sway" style="--r:${o.r ?? 3}deg;--d:${(o.d ?? 2.6 + (Math.abs(x) % 9) * .15).toFixed(2)}s;${dl(3)}">${g}</g>`;
  const k = o.k ? ` data-k="${o.k}"` : '';
  return `<g transform="translate(${r1(x)},${r1(y)}) scale(${s}) rotate(${o.a ?? 0})"${k}${o.hidden ? ' opacity="0"' : ''}><g class="act">${inner}${o.k ? hitC(0, -h * .6, 52) : ''}</g></g>`;
}
// fila de espigas (a frente da seara)
// espiga caída no chão, dentro de um grupo próprio (data-k) que se pode animar com translate
function caida(x, y, a, k, o = {}) {
  const L = 118 * (o.s ?? .9), r = a * Math.PI / 180;
  return `<g data-k="${k}"${o.hidden ? ' opacity="0"' : ''}>${espiga(x, y, o.s ?? .9, { a, still: true })}${hitC(r1(x + Math.sin(r) * L / 2), r1(y - Math.cos(r) * L / 2), 46)}</g>`;
}
function espigas(seed, y0, y1, n, s = 1, o = {}) {
  const R = rng(seed), list = [];
  for (let i = 0; i < n; i++) list.push([r1((o.x0 ?? -20) + R() * ((o.x1 ?? 820) - (o.x0 ?? -20))), r1(y0 + R() * (y1 - y0)), s * (.8 + R() * .35), (R() - .5) * 12]);
  list.sort((a, b) => a[1] - b[1]);
  return list.map(([x, y, sc, a]) => espiga(x, y, sc, { bend: a * .6, h: 70 + (sc * 14) })).join('');
}
// a seara ao longe: espigas pequenas sem contorno
function searaLonge(seed, y0, y1, n) {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = r1(-20 + R() * 840), y = r1(y0 + R() * (y1 - y0)), h = r1(14 + (y - y0) / (y1 - y0 + 1) * 18);
    s += `<path d="M${x},${y} l0,${-h}" stroke="#cf9a36" stroke-width="1.6"/><ellipse cx="${x}" cy="${r1(y - h - 5)}" rx="${r1(2.2 + h * .08)}" ry="${r1(5 + h * .2)}" fill="${i % 3 ? '#f0c95e' : '#dcaa45'}"/>`;
  }
  return `<g>${s}</g>`;
}
// molho de espigas atado
function molho(x, y, s = 1, o = {}) {
  let g = [-44, -26, -9, 9, 26, 44].map(a => `<g transform="translate(0,-82) rotate(${a})"><path d="M0,0 L0,-16" stroke="${OL}" stroke-width="4.6" stroke-linecap="round"/><path d="M0,0 L0,-16" stroke="#cf9a36" stroke-width="2.2"/><path d="M0,-12 C-8,-18 -8,-36 0,-46 C8,-36 8,-18 0,-12 Z" fill="#eab84c" stroke="${OL}" stroke-width="2.2"/></g>`).join('');
  g += `<path d="M-28,0 L-12,-44 L-22,-86 L22,-86 L12,-44 L28,0 Z" fill="#e2b04a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  g += `<g stroke="#c48d2c" stroke-width="2.2" fill="none">${[-16, -6, 4, 14].map(a => `<path d="M${a},-4 L${r1(a * .4)},-44 L${r1(a * .9)},-82"/>`).join('')}</g>`;
  g += `<rect x="-15" y="-50" width="30" height="11" rx="4" fill="#a8743a" stroke="${OL}" stroke-width="2.6"/>`;
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s}) rotate(${o.a ?? 0})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${g}${o.k ? hitC(0, -60, 56) : ''}</g></g>`;
}
// cesto da Rute (as espigas apanhadas aparecem lá dentro: data-k "c0".."c5")
function cesto(x, y, s = 1, n = 6) {
  let g = '';
  for (let i = 0; i < n; i++) g += `<g data-k="c${i}" opacity="0"><g transform="translate(${-30 + i * 12},-20) rotate(${-20 + i * 8})">${espiga(0, 0, .55, { still: true, h: 50 })}</g></g>`;
  g += `<path d="M-50,-26 L50,-26 L40,6 L-40,6 Z" fill="#c9924f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  g += `<g stroke="#a8743a" stroke-width="2.4" fill="none"><path d="M-46,-14 L46,-14 M-43,-3 L43,-3"/>${[-30, -12, 6, 24].map(a => `<path d="M${a},-24 L${a - 2},4"/>`).join('')}</g>`;
  g += `<ellipse cx="0" cy="-26" rx="50" ry="8" fill="#b37a3c" stroke="${OL}" stroke-width="3"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="cesto"><g class="act">${g}</g></g>`;
}
function saco(x, y, s = 1, k = '') {
  let g = `<path d="M-44,0 C-58,-30 -54,-70 -34,-84 C-20,-92 20,-92 34,-84 C54,-70 58,-30 44,0 Z" fill="#c9a46a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  g += `<g stroke="#b08a52" stroke-width="2" opacity=".8">${[-30, -18, -6, 6, 18, 30].map(a => `<path d="M${a},-80 L${a * 1.1},-4"/>`).join('')}${[-60, -40, -20].map(b => `<path d="M-48,${b} Q0,${b + 6} 48,${b}"/>`).join('')}</g>`;
  g += `<path d="M-30,-84 C-34,-104 -10,-112 0,-104 C10,-112 34,-104 30,-84 Z" fill="#eab84c" stroke="${OL}" stroke-width="2.6"/><path d="M-14,-98 l6,-6 M2,-100 l4,-8 M14,-96 l6,-6" stroke="#c48d2c" stroke-width="2"/>`;
  g += `<path d="M-32,-84 Q0,-74 32,-84" stroke="#8a5a33" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -50, 62) : ''}</g></g>`;
}
function cantaro(x, y, s = 1, k = '') {
  const g = `<path d="M-12,-74 L12,-74 L10,-60 C40,-50 44,-14 26,0 L-26,0 C-44,-14 -40,-50 -10,-60 Z" fill="#c46a3a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-74" rx="13" ry="5" fill="#4f9fd0" stroke="${OL}" stroke-width="2.4"/><path d="M-30,-30 Q0,-20 30,-30" stroke="#a04f2a" stroke-width="4" fill="none"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -36, 56) : ''}</g></g>`;
}
function bebe(x, y, s = 1, k = '', face = 'sleep') {
  const eyes = face === 'sleep' ? `<path d="M-36,-26 q3,3 6,0 M-27,-26 q3,3 6,0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` : `<circle cx="-33" cy="-27" r="2.6" fill="${OL}"/><circle cx="-24" cy="-27" r="2.6" fill="${OL}"/>`;
  const mouth = face === 'sleep' ? `<path d="M-32,-19 q3,2 6,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>` : `<path d="M-34,-20 q5,7 10,0 Z" fill="#8c2f39" stroke="${OL}" stroke-width="2"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><path d="M-44,-6 C-44,-30 -20,-36 0,-36 C30,-36 48,-26 48,-8 C48,8 30,12 0,12 C-26,12 -44,8 -44,-6 Z" fill="#fbf6ea" stroke="${OL}" stroke-width="3.2"/><path d="M-20,-30 C-8,-10 10,-6 30,-14 M-30,-4 C-10,6 18,4 40,-4" stroke="#e2d6bd" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-24" r="17" fill="#e2a878" stroke="${OL}" stroke-width="3"/><path d="M-44,-30 C-40,-44 -22,-46 -16,-36" stroke="#5a3020" stroke-width="5" fill="none" stroke-linecap="round"/>${eyes}${mouth}<circle cx="-40" cy="-20" r="3.4" fill="#f28c8f" opacity=".6"/>${k ? hitC(0, -14, 50) : ''}</g></g>`;
}
// casa de Belém (paredes claras, telhado plano, porta e janela)
function casa(x, y, s = 1, o = {}) {
  let g = `<rect x="-150" y="-230" width="300" height="230" fill="${o.wall || '#ecd5a6'}" stroke="${OL}" stroke-width="3.4"/><rect x="60" y="-230" width="90" height="230" fill="#d6b983" opacity=".55"/>`;
  g += `<rect x="-160" y="-244" width="320" height="18" rx="4" fill="#cdb084" stroke="${OL}" stroke-width="3"/>`;
  g += `<path d="M-40,0 L-40,-130 A44,44 0 0 1 48,-130 L48,0 Z" fill="${o.porta || '#7a5236'}" stroke="${OL}" stroke-width="3"/><circle cx="30" cy="-62" r="5" fill="#f2c14e" stroke="${OL}" stroke-width="2"/>`;
  g += `<rect x="80" y="-180" width="46" height="40" rx="6" fill="${o.janela || '#5a3a26'}" stroke="${OL}" stroke-width="3"/>`;
  if (o.luz) g += `<rect x="80" y="-180" width="46" height="40" rx="6" fill="#ffd27a" opacity=".85"/><circle cx="103" cy="-160" r="44" fill="#ffd27a" opacity=".18"/>`;
  g += `<path d="M-130,-40 L-90,-40 M-120,-100 L-80,-100" stroke="#d6b983" stroke-width="4" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function belemMonte(x, y, s = 1) {
  let g = `<path d="M-200,40 C-150,-40 -70,-70 0,-72 C70,-70 150,-40 200,40 Z" fill="#c9b27e"/>`;
  g += town(-112, -60, .95, { wall: '#f1dcb2', shade: '#dbc08c', roof: '#e2c696' });
  g += `<path d="M-120,-24 L120,-24" stroke="#bfa16c" stroke-width="5" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function moabe(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 40, sky: [[0, '#93cdeb'], [.6, '#e6f0e6'], [1, '#f6e6c8']] }, o.day || {}));
  s += hill([[-40, 420], [120, 340], [280, 400], [440, 330], [620, 392], [840, 344]], '#b79a8a');
  s += hill([[-40, 500], [220, 452], [460, 480], [700, 446], [840, 466]], '#cdb58e');
  s += `<rect x="-40" y="540" width="900" height="400" fill="#e2cfa0"/>`;
  return s;
}
function seara(o = {}) {
  const y0 = o.y0 ?? 440;
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 42 }, o.day || {}));
  s += hill([[-40, y0 - 50], [200, y0 - 86], [440, y0 - 60], [680, y0 - 96], [840, y0 - 70]], o.far || '#b9cf8a');
  if (o.belem) s += belemMonte(o.belem[0], o.belem[1], o.belem[2] ?? .8);
  s += `<path d="M-40,${y0} C200,${y0 - 16} 520,${y0 + 10} 840,${y0 - 12} L840,900 L-40,900 Z" fill="#e9c35c"/>`;
  s += searaLonge(o.seed ?? 3101, y0 - 4, y0 + 70, 150);
  if (o.ceifado) s += `<path d="M-40,${o.ceifado} C200,${o.ceifado - 20} 520,${o.ceifado + 12} 840,${o.ceifado - 14} L840,900 L-40,900 Z" fill="#efd28a"/><g stroke="#c9a04a" stroke-width="3" stroke-linecap="round">${(() => { const R = rng(55); let t = ''; for (let i = 0; i < 60; i++) { const x = r1(R() * 820), y = r1(o.ceifado + 20 + R() * 260); t += `<path d="M${x},${y} l-3,-9 M${x + 5},${y} l2,-10"/>`; } return t; })()}</g>`;
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Rute e Noemi',
  alt: 'Num campo de cevada dourada, a Rute leva um molho de espigas nos braços e sorri. Ao lado dela, a Noemi apoia-se num cajado. Ao longe, vê-se Belém.',
  cue: [470, 820],
  art() {
    let s = sky('sky', [[0, '#8fcbec'], [.5, '#d4eef7'], [.8, '#f8ecd0'], [1, '#f8ecd0']], 1100);
    s += sun(640, 330, 46, { face: true }) + cloud(170, 300, .9) + cloud(470, 240, .65);
    s += hill([[-40, 640], [200, 600], [440, 626], [680, 590], [840, 612]], '#b9cf8a');
    s += belemMonte(560, 660, .8);
    s += `<path d="M-40,680 C200,664 520,690 840,668 L840,1200 L-40,1200 Z" fill="#e9c35c"/>`;
    s += searaLonge(3001, 676, 760, 160);
    s += molho(110, 830, .9) + molho(700, 820, .85, { flip: true });
    s += espigas(3002, 900, 980, 18, 1, { x0: 560, x1: 820 }) + espigas(3003, 900, 980, 10, 1, { x0: -20, x1: 140 });
    s += p(NOEMI, { x: 260, y: 1066, s: 1.18, face: 'joy', look: .5, armL: { a: 16, item: ITEM.staff(196), ia: 0 }, armR: { a: 40, b: -30 }, k: 'noemi' });
    s += p(RUTE, { x: 500, y: 1070, s: 1.22, face: 'joy', look: -.3, armL: { a: 30, b: -100 }, armR: { a: 30, b: -100 }, k: 'rute' });
    s += molho(500, 952, .82, { a: 12 });
    s += espigas(3004, 1040, 1110, 10, 1.3, { x0: 620, x1: 820 }) + espigas(3005, 1040, 1110, 6, 1.3, { x0: -20, x1: 110 });
    return s;
  },
  setup(api) {
    api.tap(api.q('rute'), 'Rute', () => { api.snd('heart'); api.burst(480, 700, 'heart', 4); api.bubble(480, 640, 'Aonde fores, eu irei!', { key: 'r' }); });
    api.tap(api.q('noemi'), 'Noemi', () => { api.snd('hello'); api.bubble(250, 680, 'Deus cuida de nós!', { key: 'n' }); });
  }
});

/* =====================================================================
   1 — UMA FAMÍLIA EM MOABE
   ===================================================================== */
SCENES.push({
  key: 'moabe', title: 'Uma família em Moabe', ref: 'Rute 1.1-5', tint: 'sand',
  text: [
    'Há muito tempo, a Noemi foi viver para Moabe com a família, porque em Belém não havia comida.',
    'Lá, os filhos dela casaram com a Rute e a Orfa. Mais tarde, o marido e os filhos da Noemi morreram, e as três ficaram sozinhas.'
  ],
  fact: 'Moabe ficava do outro lado do mar Morto. O povo de lá não adorava o Deus de Israel.',
  hint: 'Toca na Noemi, na Rute e na Orfa.',
  alt: 'Diante de uma casa na terra de Moabe, a Noemi, de lenço azul, está triste. As noras, a Rute e a Orfa, estão ao lado dela.',
  cue: [400, 560],
  art() {
    let s = moabe();
    s += casa(400, 600, .9, { wall: '#e7cfa2' });
    s += olive(90, 600, .9) + olive(720, 590, .8);
    s += tuft(150, 640) + tuft(640, 650) + flower(580, 700, .9, '#e86a9a');
    s += p(ORFA, { x: 190, y: 770, s: 1, face: 'sad', look: .4, armL: { a: 14 }, armR: { a: 30, b: -40 }, k: 'f1' });
    s += p(NOEMI, { x: 400, y: 780, s: 1.04, face: 'sad', look: 0, armL: { a: 20, b: -30 }, armR: { a: 20, b: -30 }, k: 'noemi' });
    s += p(RUTE, { x: 610, y: 772, s: 1, face: 'worry', look: -.4, armL: { a: 30, b: -40 }, armR: { a: 14 }, k: 'f0' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = id => { vistos.add(id); if (vistos.size === 3) api.nudgeNext(2600); };
    for (const i of [0, 1]) api.tap(api.q('f' + i), NOMES[i], () => {
      const [x, y, sc] = api.pos(api.q('f' + i));
      api.snd('hello'); api.hop(api.q('f' + i), 10);
      api.bubble(x, y - 280 * sc, trf('Eu sou a {n}!', { n: tr(NOMES[i]) }), { key: 'f' });
      ok('f' + i);
    });
    api.tap(api.q('noemi'), 'Noemi', () => { api.snd('hm'); api.bubble(400, 450, 'Estou tão triste...', { key: 'f' }); ok('n'); });
  }
});

/* =====================================================================
   2 — VOU VOLTAR PARA BELÉM
   ===================================================================== */
SCENES.push({
  key: 'despedida', title: 'Vou voltar para Belém', ref: 'Rute 1.6-14', tint: 'sand',
  text: [
    'Um dia, a Noemi soube que em Belém já havia comida. Então, decidiu voltar para a sua terra.',
    'Disse às noras: «Voltem para casa das vossas mães.» A Orfa despediu-se com um beijo e voltou. Mas a Rute ficou!'
  ],
  fact: 'A Noemi era a sogra da Rute. Sogra é a mãe do marido ou da mulher.',
  hint: 'Toca na Orfa para ela se despedir.',
  alt: 'Num caminho de terra, a Orfa acena e volta para trás, para Moabe. A Rute fica ao lado da Noemi.',
  cue: [210, 560],
  art() {
    let s = moabe();
    s += `<path d="M-40,690 C140,640 300,620 420,612 C560,602 700,560 840,520 L840,600 C700,628 560,660 430,672 C300,684 160,716 -40,770 Z" fill="#ecdcb4" stroke="#d2b98a" stroke-width="3"/>`;
    s += casa(60, 560, .34, { wall: '#e7cfa2' }) + olive(700, 540, .7);
    s += tuft(330, 600) + tuft(740, 640) + flower(520, 740, .9, '#f2c14e');
    s += `<g data-k="orfa">${p(ORFA, { x: 220, y: 760, s: 1, legs: 'walk', face: 'sad', look: .6, armL: { a: 14 }, armR: { a: 150, b: -20 } })}${hitC(220, 640, 100)}</g>`;
    s += p(NOEMI, { x: 470, y: 772, s: 1.04, face: 'worry', look: -.5, armL: { a: 30, b: -20 }, armR: { a: 16, item: ITEM.staff(196), ia: 0 }, k: 'noemi' });
    s += p(RUTE, { x: 640, y: 768, s: 1, face: 'determined', look: -.5, armL: { a: 50, b: -10 }, armR: { a: 14 }, k: 'rute' });
    return s;
  },
  setup(api) {
    api.tap(api.q('orfa'), 'Orfa', async () => {
      api.bubble(220, 460, 'Adeus, Noemi!', { key: 'o' });
      if (api.st.foi) return;
      api.st.foi = true;
      api.snd('tiptoe');
      await api.anim(api.q('orfa'), [{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(-240px)', opacity: 0 }], { duration: 1800, easing: 'ease-in', fill: 'forwards' });
      api.snd('hm');
      api.bubble(640, 470, 'Eu não te deixo!', { key: 'r' });
      api.nudgeNext(2600);
    });
    api.tap(api.q('noemi'), 'Noemi', () => { api.snd('hm'); api.bubble(470, 450, 'Voltem para casa, minhas filhas.', { key: 'n' }); });
    api.tap(api.q('rute'), 'Rute', () => { api.snd('hello'); api.hop(api.q('rute'), 8); api.bubble(640, 470, 'Eu não te deixo!', { key: 'r' }); });
  }
});

/* =====================================================================
   3 — AONDE FORES, EU IREI
   ===================================================================== */
SCENES.push({
  key: 'fiel', title: 'Aonde fores, eu irei', ref: 'Rute 1.16-17', tint: 'rose',
  text: [
    'A Rute abraçou a Noemi e disse:',
    { q: 'Aonde fores, eu irei. O teu povo será o meu povo, e o teu Deus será o meu Deus!', who: 'sara' }
  ],
  fact: 'A Rute escolheu ficar com a Noemi e confiar no Deus de Israel. Isso é ser fiel!',
  hint: 'Toca na Rute e na Noemi.',
  alt: 'Ao pôr do sol, no caminho, a Rute abraça a Noemi com carinho.',
  cue: [340, 560],
  art() {
    let s = sky('sky', [[0, '#f4a96e'], [.5, '#fbd3a0'], [1, '#fde9c8']]);
    s += sun(400, 470, 70) + cloud(150, 200, .8) + cloud(620, 150, .6);
    s += hill([[-40, 480], [200, 450], [440, 470], [680, 440], [840, 460]], '#c9a07a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#e8c890"/>`;
    s += `<path d="M260,900 C320,700 380,600 400,520 C420,600 480,700 540,900 Z" fill="#f2dcac"/>`;
    s += olive(110, 600, .9) + olive(700, 590, .85);
    s += p(NOEMI, { x: 470, y: 780, s: 1.12, flip: true, face: 'joy', look: .3, armL: { a: 64, b: -24 }, armR: { a: 20 }, k: 'noemi' });
    s += p(RUTE, { x: 340, y: 778, s: 1.12, face: 'joy', look: .4, armL: { a: 20 }, armR: { a: 66, b: -24 }, k: 'rute' });
    return s;
  },
  setup(api) {
    let vistos = 0;
    const ok = k => { if (!api.st[k]) { api.st[k] = true; if (++vistos === 2) api.nudgeNext(2600); } };
    api.tap(api.q('rute'), 'Rute', () => { api.snd('heart'); api.burst(400, 440, 'heart', 5); api.bubble(300, 420, 'Eu fico contigo!', { key: 'r' }); ok('r'); });
    api.tap(api.q('noemi'), 'Noemi', () => { api.snd('heart'); api.burst(440, 440, 'heart', 5); api.bubble(520, 420, 'Obrigada, Rute!', { key: 'n' }); ok('n'); });
  }
});

/* =====================================================================
   4 — A CAMINHO DE BELÉM
   ===================================================================== */
SCENES.push({
  key: 'caminho', title: 'A caminho de Belém', ref: 'Rute 1.19-22', tint: 'gold',
  text: [
    'A Rute e a Noemi caminharam muitos dias até chegarem a Belém.',
    'Chegaram no tempo da ceifa da cevada, quando os campos estavam todos dourados.'
  ],
  fact: 'Ceifar é cortar a cevada ou o trigo quando já estão maduros. Em Belém, a ceifa da cevada era na primavera.',
  hint: 'Toca na Rute e na Noemi para continuarem a caminhar.',
  alt: 'Um caminho sobe até Belém, uma cidadezinha no alto de um monte, rodeada de campos dourados. A Rute e a Noemi caminham juntas.',
  cue: [300, 560],
  art() {
    let s = seara({ y0: 470, belem: [560, 420, .9] });
    s += `<path d="M120,900 C200,760 380,640 480,560 C520,530 540,500 560,470 L590,470 C590,510 560,560 520,600 C430,690 330,780 330,900 Z" fill="#efdcb0" stroke="#d2b98a" stroke-width="3"/>`;
    s += molho(90, 640, .7) + molho(700, 610, .66, { flip: true }) + molho(760, 700, .8);
    s += `<g data-k="viz">${p(VIZINHAS[0], { x: 500, y: 520, s: .42, face: 'surprise', look: .3, armL: { a: 14 }, armR: { a: 140, b: -20 } })}${p(VIZINHAS[1], { x: 540, y: 516, s: .4, flip: true, face: 'joy', look: -.3, armL: { a: 14 }, armR: { a: 40 } })}${hitC(520, 480, 50)}</g>`;
    s += `<g data-k="par" style="transform-origin:325px 770px">${p(NOEMI, { x: 270, y: 770, s: .92, legs: 'walk', face: 'smile', look: .5, armL: { a: 16 }, armR: { a: 16, item: ITEM.staff(190), ia: 0 } })}${p(RUTE, { x: 380, y: 760, s: .9, legs: 'walk', bag: true, face: 'joy', look: .5, armL: { a: 16 }, armR: { a: 30, b: -20 } })}${hitC(325, 640, 140)}</g>`;
    s += espigas(3401, 760, 860, 14, 1.15, { x0: -20, x1: 220 }) + espigas(3402, 760, 860, 14, 1.15, { x0: 560, x1: 820 });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('par'), 'A Rute e a Noemi', async () => {
      if (api.st.busy) return;
      if (n >= 2) { api.snd('chime', 'E6'); api.bubble(330, 440, 'Já estamos quase a chegar!', { key: 'p' }); return; }
      api.st.busy = true; api.snd('tiptoe');
      const from = `translate(${n * 70}px,${-n * 60}px) scale(${(1 - n * .12).toFixed(2)})`, to = `translate(${(n + 1) * 70}px,${-(n + 1) * 60}px) scale(${(1 - (n + 1) * .12).toFixed(2)})`;
      n++;
      await api.anim(api.q('par'), [{ transform: from }, { transform: to }], { duration: 1100, easing: 'ease-in-out', fill: 'forwards' });
      api.st.busy = false;
      if (n === 2) { api.bubble(560, 340, 'Olha, é a Noemi!', { key: 'v' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('viz'), 'Mulheres de Belém', () => { api.snd('hello'); api.bubble(560, 340, 'Olha, é a Noemi!', { key: 'v' }); });
  }
});

const CHAO = [[110, 690, 80], [250, 730, -70], [330, 650, 100], [380, 728, 76], [170, 600, -96], [210, 620, 64]];
/* =====================================================================
   5 — A RUTE APANHA ESPIGAS
   ===================================================================== */
SCENES.push({
  key: 'espigas', title: 'A Rute apanha espigas', ref: 'Rute 2.2-7', tint: 'gold',
  text: [
    'A Rute disse: «Vou ao campo apanhar as espigas que os ceifeiros deixam cair.»',
    'E trabalhou o dia inteiro no campo de um homem chamado Boaz.'
  ],
  fact: 'A lei de Deus mandava deixar algumas espigas no campo, para os pobres as poderem apanhar.',
  hint: 'Toca nas espigas no chão para a Rute as apanhar.',
  alt: 'Num campo de cevada dourada, os ceifeiros cortam as espigas. A Rute, de lenço amarelo, apanha as espigas que ficaram no chão.',
  cue: [330, 700],
  art() {
    let s = seara({ y0: 430, ceifado: 560 });
    s += molho(150, 590, .7) + molho(250, 600, .74) + molho(720, 600, .72, { flip: true });
    s += p(CEIF[0], { x: 450, y: 600, s: .62, face: 'smile', look: .4, armL: { a: 30 }, armR: { a: 70, b: -40, item: FOICE, ia: 20 } });
    s += p(CEIF[1], { x: 600, y: 596, s: .6, flip: true, face: 'joy', look: .4, armL: { a: 20 }, armR: { a: 80, b: -30, item: FOICE, ia: 20 } });
    s += espigas(3501, 552, 576, 22, .6, { x0: 330, x1: 820 });
    s += p(RUTE, { x: 540, y: 766, s: 1.02, legs: 'kneel', hemY: -62, face: 'smile', look: -.4, armL: { a: 40, b: -30 }, armR: { a: 20 }, k: 'rute' });
    s += cesto(660, 752, 1.1);
    CHAO.forEach(([x, y, a], i) => s += caida(x, y, a, 'e' + i, { s: 1.15 }));
    return s;
  },
  setup(api) {
    let n = 0;
    for (let i = 0; i < 6; i++) api.tap(api.q('e' + i), 'Espiga', async () => {
      if (api.st['e' + i]) return;
      api.st['e' + i] = true;
      api.snd('pluck', ['C5', 'D5', 'E5', 'G5', 'A5', 'C6'][n]);
      const el = api.q('e' + i), [x, y] = CHAO[i], dx = 650 - x, dy = 720 - y;
      api.anim(el, [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: `translate(${dx / 2}px,${dy / 2 - 140}px)`, opacity: 1, offset: .5 }, { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }], { duration: 700, easing: 'ease-in-out', fill: 'forwards' });
      await api.wait(650);
      api.anim(api.q('c' + n), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      n++;
      api.badge(660, 610, String(n), { key: 'n' });
      if (n === 6) { api.snd('tada'); api.bubble(560, 440, 'Que bom! Já tenho muitas espigas!', { key: 'r' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('rute'), 'Rute', () => { api.snd('hello'); api.bubble(560, 440, 'Vou apanhar as espigas!', { key: 'r' }); });
  }
});

/* =====================================================================
   6 — O BOAZ É BONDOSO
   ===================================================================== */
SCENES.push({
  key: 'boaz', title: 'O Boaz é bondoso', ref: 'Rute 2.8-16', tint: 'meadow',
  text: [
    'O Boaz viu a Rute e disse-lhe: «Fica no meu campo. Quando tiveres sede, bebe da nossa água.»',
    'E disse aos ceifeiros: «Deixem cair mais espigas para ela!»'
  ],
  fact: 'O Boaz era da família do marido da Noemi. Era um homem bom, que amava a Deus.',
  hint: 'Toca no Boaz, nos ceifeiros e no cântaro.',
  alt: 'No campo, o Boaz, de roupa azul, fala com a Rute com bondade e oferece-lhe água. Ao lado, os ceifeiros deixam cair espigas de propósito.',
  cue: [220, 560],
  art() {
    let s = seara({ y0: 430, ceifado: 540, seed: 3601 });
    s += molho(60, 600, .7) + molho(770, 580, .7, { flip: true });
    s += p(BOAZ, { x: 220, y: 776, s: 1.06, face: 'smile', look: .5, armL: { a: 16 }, armR: { a: 110, b: -30 }, k: 'boaz' });
    s += cantaro(340, 780, 1, 'agua');
    s += p(RUTE, { x: 440, y: 776, s: 1, flip: true, legs: 'kneel', hemY: -62, face: 'surprise', look: .4, armL: { a: -20, b: -70 }, armR: { a: -20, b: -70 }, k: 'rute' });
    s += p(CEIF[2], { x: 620, y: 700, s: .8, flip: true, face: 'grin', look: .5, armL: { a: 30 }, armR: { a: 60, b: -20, item: FOICE, ia: 20 }, k: 'c0' });
    s += p(CEIF[0], { x: 740, y: 690, s: .76, flip: true, face: 'laugh', look: .5, armL: { a: 40, b: -20 }, armR: { a: 30, item: FOICE, ia: 20 }, k: 'c1' });
    [[540, 720, 80], [600, 760, -70], [690, 750, 96], [640, 790, -84]].forEach(([x, y, a], i) => s += caida(x, y, a, 'x' + i, { s: .8, hidden: true }));
    return s;
  },
  setup(api) {
    let caiu = 0;
    const cair = async (i, x, y) => {
      api.snd('swish');
      api.bubble(x, y, 'Ups! Caíram mais umas!', { key: 'c' });
      for (const j of [i * 2, i * 2 + 1]) {
        if (api.st['x' + j]) continue;
        api.st['x' + j] = true; caiu++;
        api.anim(api.q('x' + j), [{ opacity: 0, transform: 'translate(0px,-60px)' }, { opacity: 1, transform: 'translate(0px,0px)' }], { duration: 500, easing: 'ease-in', fill: 'forwards' });
        await api.wait(200);
      }
      if (caiu === 4 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    };
    api.tap(api.q('c0'), 'Ceifeiro', () => cair(0, 620, 440));
    api.tap(api.q('c1'), 'Ceifeiro', () => cair(1, 700, 440));
    api.tap(api.q('boaz'), 'Boaz', () => { api.snd('hello'); api.wave(api.q('boaz')); api.bubble(220, 430, 'O Senhor esteja convosco!', { key: 'b' }); api.later(() => api.bubble(660, 440, 'O Senhor te abençoe!', { key: 'c' }), 1400); });
    api.tap(api.q('agua'), 'Cântaro de água', () => { api.snd('pour'); api.hop(api.q('agua'), 8); api.burst(340, 700, 'ripple', 2); api.bubble(440, 480, 'Obrigada, Boaz!', { key: 'r' }); });
    api.tap(api.q('rute'), 'Rute', () => { api.snd('heart'); api.burst(440, 560, 'heart', 3); api.bubble(440, 480, 'Obrigada, Boaz!', { key: 'r' }); });
  }
});

/* =====================================================================
   7 — MUITA CEVADA PARA A NOEMI
   ===================================================================== */
SCENES.push({
  key: 'cevada', title: 'Muita cevada para a Noemi', ref: 'Rute 2.17-20', tint: 'dusk',
  text: [
    'À noite, a Rute voltou para casa com um saco cheio de cevada.',
    'A Noemi ficou tão contente! «Deus é bom! O Boaz é da nossa família!»'
  ],
  fact: 'Com a cevada, faziam-se pães. A Rute trouxe tanta que dava pão para muitos dias!',
  hint: 'Toca no saco de cevada e na Noemi.',
  alt: 'Ao fim do dia, à porta de casa, a Rute mostra à Noemi um saco cheio de cevada. A Noemi levanta as mãos, feliz.',
  cue: [420, 680],
  art() {
    let s = sky('sky', [[0, '#3a4a8a'], [.5, '#c27a8a'], [1, '#f2b880']]);
    s += starField(3701, 24, 0, 0, 800, 220, { big: .1 }) + moon(130, 110, 26);
    s += hill([[-40, 470], [200, 440], [440, 460], [680, 430], [840, 450]], '#8a7a8a');
    s += casa(420, 640, 1.2, { wall: '#e2c79a', luz: true });
    s += `<rect x="-40" y="630" width="900" height="300" fill="#d9bf8e"/><path d="M-40,632 L840,632" stroke="${OL}" stroke-width="3" opacity=".4"/>`;
    s += olive(70, 640, .8);
    s += p(NOEMI, { x: 240, y: 780, s: 1.04, face: 'laugh', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'noemi' });
    s += p(RUTE, { x: 600, y: 780, s: 1, flip: true, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 50, b: -20 }, k: 'rute' });
    s += saco(430, 776, .95, 'saco');
    return s;
  },
  setup(api) {
    api.tap(api.q('saco'), 'Saco de cevada', () => {
      api.snd('pour'); api.hop(api.q('saco'), 10);
      api.burst(430, 660, 'spark', 10, { col: '#eab84c' });
      api.bubble(430, 560, 'Tanta cevada!', { key: 's' });
      if (!api.st.s) { api.st.s = true; api.nudgeNext(3000); }
    });
    api.tap(api.q('noemi'), 'Noemi', () => { api.snd('laugh'); api.hop(api.q('noemi'), 10); api.bubble(240, 440, 'Deus é bom!', { key: 'n' }); });
    api.tap(api.q('rute'), 'Rute', () => { api.snd('hello'); api.bubble(600, 450, 'O Boaz foi muito bom para mim!', { key: 'r' }); });
  }
});

/* =====================================================================
   8 — UMA FAMÍLIA NOVA
   ===================================================================== */
SCENES.push({
  key: 'familia', title: 'Uma família nova', ref: 'Rute 4.13-17', tint: 'rose',
  text: [
    'Mais tarde, o Boaz casou com a Rute, e Deus deu-lhes um bebé: o Obede.',
    'A Noemi pegou no netinho ao colo e ficou muito feliz. Deus não se tinha esquecido dela!'
  ],
  fact: 'O Obede foi o avô do rei Davi! E, muitos anos depois, Jesus nasceu desta família.',
  hint: 'Toca no bebé, na Noemi, na Rute e no Boaz.',
  alt: 'À porta de casa, a Noemi segura ao colo o bebé Obede. A Rute e o Boaz estão ao lado, sorridentes.',
  cue: [420, 610],
  art() {
    let s = bgDay({ sunX: 660, sunY: 110, sunR: 40 });
    s += hill([[-40, 430], [200, 400], [440, 420], [680, 392], [840, 412]], '#b9cf8a');
    s += casa(420, 600, 1.1, { wall: '#ecd5a6' });
    s += `<rect x="-40" y="590" width="900" height="300" fill="#e2d3a6"/>`;
    s += fruitTree(80, 640, .8, { fruit: '#e86a9a' }) + shrub(740, 640, .8, '#5fa046', { flowers: ['#e86a9a', '#f2c14e'] });
    s += flowerBand(3801, 700, 790, 8);
    s += p(BOAZ, { x: 610, y: 776, s: 1.04, face: 'joy', look: -.4, armL: { a: 40, b: -30 }, armR: { a: 16 }, k: 'boaz' });
    s += p(RUTE, { x: 210, y: 774, s: 1, face: 'joy', look: .4, armL: { a: 16 }, armR: { a: 50, b: -40 }, k: 'rute' });
    s += p(NOEMI, { x: 420, y: 780, s: 1.06, face: 'laugh', look: 0, armL: { a: 40, b: -90 }, armR: { a: 40, b: -90 }, k: 'noemi' });
    s += bebe(440, 640, .95, 'bebe', 'smile');
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 4) api.nudgeNext(2600); };
    api.tap(api.q('bebe'), 'Bebé Obede', () => { api.snd('laugh'); api.hop(api.q('bebe'), 8); api.burst(420, 590, 'heart', 5); api.bubble(420, 470, 'Olá, Obede!', { key: 'b' }); ok('b'); });
    api.tap(api.q('noemi'), 'Noemi', () => { api.snd('heart'); api.bubble(420, 470, 'Deus não se esqueceu de mim!', { key: 'b' }); ok('n'); });
    api.tap(api.q('rute'), 'Rute', () => { api.snd('hello'); api.bubble(210, 450, 'Obrigada, Deus!', { key: 'r' }); ok('r'); });
    api.tap(api.q('boaz'), 'Boaz', () => { api.snd('laugh'); api.bubble(610, 440, 'Que família feliz!', { key: 'o' }); ok('o'); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre os campos de Belém. Um molho de espigas descansa no campo, e uma ovelhinha dorme ao lado.',
  cue: [430, 160],
  questions: [
    ['Quem não deixou a Noemi sozinha?', 'A Rute.'],
    ['O que disse a Rute à Noemi?', 'Aonde fores, eu irei!'],
    ['O que fazia a Rute no campo?', 'Apanhava espigas.'],
    ['Quem era o dono do campo?', 'O Boaz.'],
    ['Como se chamava o bebé da Rute?', 'Obede.']
  ],
  wrong: [
    ['O Boaz.', 'As vizinhas.', 'Ninguém.'],
    ['Adeus, vou-me embora!', 'Fica tu sozinha!', 'Vou dormir!'],
    ['Apanhava flores.', 'Guardava ovelhas.', 'Brincava às escondidas.'],
    ['A Noemi.', 'O rei.', 'Um soldado.'],
    ['Davi.', 'Samuel.', 'Boaz.']
  ],
  verse: ['O teu povo será o meu povo, e o teu Deus será o meu Deus.', 'Rute 1.16'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(3901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#3a4560');
    s += `<g opacity=".85">${belemMonte(620, 560, .6)}</g>`;
    s += `<path d="M-40,620 C200,600 520,630 840,604 L840,900 L-40,900 Z" fill="#7a6a4a"/>`;
    s += `<g opacity=".85">${molho(560, 760, .9)}</g>`;
    s += sheep({ x: 260, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
    for (let i = 0; i < 7; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${80 + i * 100}" cy="${660 + (i % 3) * 22}" r="3" fill="#f6f39a"/>`;
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(280, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'rute',
  title: 'Rute e Noemi',
  cover: { kicker: 'Uma história da Bíblia', title: 'Rute', small: 'e Noemi', sub: 'Aonde fores, eu irei' },
  color: '#c9822f',
  ref: 'Rute 1–4',
  scenes: SCENES
});
})();
