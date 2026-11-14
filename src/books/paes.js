/* =====================================================================
   LIVRO: CINCO PÃES E DOIS PEIXES  (João 6.1-14; 6.35)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const FILIPE = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'short', beard: 'short', beardCol: '#7a4a22', tunic: '#c9a54e', belt: '#6b4a33' };
const ANDRE = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#5e7d4a' };
const PEDRO = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' };
const MENINO = { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e5483f', stripes: '#f2c14e', belt: '#7b4a2a' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' },
  { kind: 'adult', skin: '#a8683e', hair: '#1f1612', beard: 'long', beardCol: '#1f1612', head: 'cloth', clothCol: '#f4efe6', bandCol: '#2f6db5', tunic: '#7a5a8a', belt: '#e9c46a' }
];
const jesus = o => person(Object.assign({}, JESUS, o));
const SIT_A = { legs: 'sit', drop: 30, hemY: -62 };
const sentado = (p, o) => person(Object.assign({}, p, p.kind === 'adult' ? SIT_A : { legs: 'sit' }, o));
const NUM = [N('Um!'), 'Dois!', N('Três!'), N('Quatro!'), 'Cinco!', N('Seis!'), N('Sete!'), N('Oito!'), N('Nove!'), N('Dez!'), N('Onze!'), 'Doze!'];

/* ---------- peças desta história ---------- */
function barco(x, y, s = 1, k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><g class="bob" style="${dl(4)}">${limb(0, -10, 0, -150, 6, '#8a5a33')}<path d="M4,-146 L4,-40 L80,-40 Z" fill="#f4efe6" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-110,-30 L110,-30 L86,12 L-86,12 Z" fill="#9a6b3e" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/><path d="M-100,-16 L100,-16" stroke="#7a4e2c" stroke-width="4"/></g>${k ? hitC(0, -60, 100) : ''}</g></g>`;
}
function galileia(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 120, sunR: 40 }, o.day || {}));
  s += hill([[-40, 404], [220, 372], [460, 394], [700, 364], [840, 384]], o.far || '#a9c4a0');
  s += `<rect x="-40" y="420" width="900" height="140" fill="${o.lake || '#5fa8d8'}"/><path d="M-40,420 L840,420" stroke="${o.lakeHi || '#8fc6e8'}" stroke-width="5"/>`;
  s += `<g stroke="#bfe3f7" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8">${[[60, 452], [230, 476], [430, 448], [600, 480], [740, 456], [330, 500]].map(([x, y]) => `<path d="M${x},${y} q10,-6 20,0 q10,6 20,0"/>`).join('')}</g>`;
  if (o.boat !== false) s += barco(o.boatX ?? 620, o.boatY ?? 476, .5, o.boatK || '');
  const y = o.y ?? 540;
  s += hill([[-40, y], [200, y - 26], [420, y - 6], [640, y - 30], [840, y - 12]], o.grass || '#8cc464') + hill([[-40, y + 90], [260, y + 64], [520, y + 84], [840, y + 60]], o.grass2 || '#7bb456');
  return s;
}
function pao(k = '') {
  return `<g${k ? ` data-k="${k}"` : ''}><g class="act"><ellipse cx="0" cy="0" rx="24" ry="15" fill="#d99a4a" stroke="${OL}" stroke-width="3"/><ellipse cx="-4" cy="-4" rx="12" ry="5" fill="#ebb76a"/><path d="M-10,-6 q4,6 0,12 M2,-8 q4,6 0,14 M14,-6 q4,6 0,12" stroke="#a86a2a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g></g>`;
}
function peixe(k = '', flip = false) {
  return `<g${k ? ` data-k="${k}"` : ''}><g class="act"><g transform="scale(${flip ? -1 : 1},1)"><path d="M-24,0 C-14,-14 14,-14 26,0 C14,14 -14,14 -24,0 Z" fill="#a9b8c6" stroke="${OL}" stroke-width="2.8"/><path d="M-22,0 L-38,-12 L-36,12 Z" fill="#a9b8c6" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-6,-8 q4,8 0,16 M4,-9 q4,9 0,18" stroke="#7f92a6" stroke-width="2.2" fill="none"/><circle cx="16" cy="-3" r="2.6" fill="${OL}"/></g></g></g>`;
}
// cesta com o lanche (itens com data-k p0..p4 e f0..f1 para contar)
const LANCHE = [[-52, -48], [-18, -52], [18, -52], [52, -48], [0, -72]];
const PEIXES = [[-40, -86, -18, false], [40, -86, 18, true]];
function cesta(x, y, s = 1, o = {}) {
  const kp = o.kp ?? 'p', kf = o.kf ?? 'f';
  let g = '';
  if (o.cheia !== false) {
    LANCHE.forEach(([a, b], i) => g += `<g transform="translate(${a},${b})">${pao(o.count ? kp + i : '')}</g>`);
    PEIXES.forEach(([a, b, r, fl], i) => g += `<g transform="translate(${a},${b}) rotate(${r})">${peixe(o.count ? kf + i : '', fl)}</g>`);
    if (o.muito) g += [[-70, -70], [70, -70], [-30, -100], [30, -104], [0, -122]].map(([a, b], i) => `<g transform="translate(${a},${b})">${i % 2 ? peixe('', i % 4 === 1) : pao()}</g>`).join('');
  }
  g = `<ellipse cx="0" cy="-36" rx="80" ry="18" fill="#7a4e2c"/>` + g;
  g += `<path d="M-84,-40 L84,-40 L64,34 L-64,34 Z" fill="#c99a5a" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/>`;
  g += `<g stroke="#a8763c" stroke-width="3" fill="none">${[-20, -2, 16].map(y2 => `<path d="M${-80 + (y2 + 40) * .27},${y2} L${80 - (y2 + 40) * .27},${y2}"/>`).join('')}${[-50, -25, 0, 25, 50].map(x2 => `<path d="M${x2},-38 L${x2 * .8},32"/>`).join('')}</g>`;
  g += `<path d="M-88,-40 C-88,-52 88,-52 88,-40" stroke="${OL}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-88,-40 C-88,-52 88,-52 88,-40" stroke="#d9ab6a" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${g}${o.k ? hitC(0, -40, 96) : ''}</g></g>`;
}
// cestinho das sobras (vazio ou cheio)
function cestinho(x, y, k, s = 1) {
  const cheio = `<g data-k="${k}c" opacity="0">${blob([[-26, -34, 15], [-4, -42, 17], [20, -36, 15], [8, -28, 14], [-14, -26, 13]], '#d99a4a', 2.6)}<path d="M-20,-38 q4,5 0,10 M2,-46 q4,6 0,12 M18,-38 q4,5 0,10" stroke="#a86a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/><g transform="translate(26,-44) rotate(30) scale(.6)">${peixe()}</g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="${k}"><g class="act"><ellipse cx="0" cy="-26" rx="44" ry="11" fill="#5a3a22"/>${cheio}<path d="M-46,-28 L46,-28 L34,14 L-34,14 Z" fill="#c99a5a" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/><g stroke="#a8763c" stroke-width="2.6"><path d="M-40,-12 L40,-12 M-37,2 L37,2"/></g><path d="M-48,-28 C-48,-36 48,-36 48,-28" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-48,-28 C-48,-36 48,-36 48,-28" stroke="#d9ab6a" stroke-width="4" fill="none" stroke-linecap="round"/>${hitC(0, -14, 52)}</g></g>`;
}
function bolsa() {
  return `<g><path d="M-14,-6 C-20,10 -16,26 0,26 C16,26 20,10 14,-6 Z" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><path d="M-12,-6 Q0,-14 12,-6" stroke="#c9a54e" stroke-width="3" fill="none"/><circle cx="-4" cy="10" r="4" fill="#f2c14e" stroke="${OL}" stroke-width="1.6"/><circle cx="5" cy="15" r="4" fill="#f2c14e" stroke="${OL}" stroke-width="1.6"/></g>`;
}
// fileiras de gente pequena (ao longe)
function plateia(rows, seed = 1, o = {}) {
  const R = rng(seed);
  let s = '';
  rows.forEach(([y, sc, xs]) => xs.forEach((x, i) => {
    const p = POVO[Math.floor(R() * POVO.length)];
    const op = { x, y, s: p.kind === 'child' ? sc * 1.15 : sc, face: o.face || (R() < .5 ? 'smile' : 'joy'), look: (R() - .5) * 1.4, armL: { a: 14 }, armR: { a: 14 } };
    s += o.sit ? sentado(p, op) : person(Object.assign({}, p, op));
  }));
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Cinco Pães e Dois Peixes',
  alt: 'À beira de um lago, um menino sorridente mostra um cesto com cinco pães e dois peixes. Jesus sorri ao lado dele, e uma multidão espera no monte.',
  cue: [470, 960],
  art() {
    let s = sky('sky', [[0, '#86cbef'], [.45, '#cdeefa'], [.6, '#effaf0'], [1, '#effaf0']], 1100);
    s += sun(660, 470, 40, { face: true });
    s += hill([[-40, 690], [220, 660], [460, 684], [700, 652], [840, 672]], '#a9c4a0');
    s += `<rect x="-40" y="700" width="900" height="120" fill="#5fa8d8"/><path d="M-40,700 L840,700" stroke="#8fc6e8" stroke-width="5"/>`;
    s += barco(640, 760, .42);
    s += hill([[-40, 820], [200, 796], [420, 812], [640, 790], [840, 806]], '#8cc464');
    s += plateia([[838, .4, [80, 150, 230, 520, 600, 690, 760]]], 7);
    s += hill([[-40, 900], [260, 876], [520, 892], [840, 870]], '#7bb456');
    s += jesus({ x: 270, y: 1050, s: 1.1, face: 'joy', look: .5, armL: { a: 30, b: 20 }, armR: { a: 60, b: -20 }, k: 'jesus' });
    s += person(Object.assign({}, MENINO, { x: 480, y: 1062, s: 1.12, face: 'joy', look: -.3, armL: { a: 16, b: 10 }, armR: { a: 16, b: 10 }, k: 'menino' }));
    s += cesta(480, 1026, .74, { k: 'cesta' });
    return s;
  },
  setup(api) {
    api.tap(api.q('cesta'), 'Cesto com pães e peixes', () => { api.snd('pluck'); api.hop(api.q('cesta'), 10); api.bubble(480, 840, 'Cinco pães e dois peixes!', { key: 'c' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(270, 820, 'heart', 4); api.bubble(270, 790, 'Jesus cuida de ti!', { key: 'j' }); });
    api.tap(api.q('menino'), 'Menino', () => { api.snd('laugh'); api.hop(api.q('menino'), 12); });
  }
});

/* =====================================================================
   1 — MUITA GENTE!
   ===================================================================== */
SCENES.push({
  key: 'multidao', title: 'Muita gente!', ref: 'João 6.1-3; Lucas 9.11', tint: 'water',
  text: [
    'Jesus estava perto de um lago muito grande.',
    'Muita, muita gente foi atrás dele! Jesus recebeu toda a gente com carinho e curou quem estava doente.'
  ],
  fact: 'Esse lago chama-se Mar da Galileia. Pedro e André pescavam lá!',
  hint: 'Toca nas pessoas, em Jesus e no barco.',
  alt: 'No monte verde perto de um lago azul com um barco, Jesus está sentado numa pedra, a sorrir. Do outro lado, uma multidão chega para ver Jesus.',
  cue: [560, 600],
  art() {
    let s = galileia({ boatK: 'barco' });
    s += rock(170, 742, 170, 46, {});
    s += jesus({ x: 170, y: 742, s: 1, ...SIT_A, face: 'joy', look: .6, armL: { a: 30, b: 40 }, armR: { a: 100, b: -40 }, k: 'jesus' });
    s += `<g data-k="povo"><g class="act">${plateia([[600, .56, [360, 440, 520, 600, 680, 760]], [680, .7, [400, 490, 580, 670, 760]], [780, .86, [420, 540, 660]]], 11)}<ellipse class="hit" cx="580" cy="660" rx="250" ry="170" fill="#000" fill-opacity="0"/></g></g>`;
    s += `<g data-k="mais" style="pointer-events:none"><g style="transform:translateX(420px)">${plateia([[740, .8, [880, 970]]], 12)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('povo'), 'Multidão', async () => {
      api.snd('crowd'); api.hop(api.q('povo'), 10);
      api.bubble(560, 470, 'Olha! É Jesus!', { key: 'p' });
      if (api.st.ok) return;
      api.st.ok = true;
      api.anim(api.q('mais').firstElementChild, [{ transform: 'translateX(420px)' }, { transform: 'translateX(-200px)' }], { duration: 1600, fill: 'forwards', easing: 'ease-out' });
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.burst(180, 500, 'heart', 4); api.bubble(180, 486, 'Venham! Deus ama-vos!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('barco'), 'Barco', () => { api.snd('splash'); api.burst(620, 486, 'ripple', 3); });
  }
});

/* =====================================================================
   2 — TODO MUNDO COM FOME
   ===================================================================== */
SCENES.push({
  key: 'fome', title: 'Toda a gente com fome', ref: 'João 6.5-7', tint: 'dusk',
  text: [
    'Fez-se tarde, e toda a gente estava com fome. Ronc, ronc! Jesus perguntou a Filipe:',
    { q: 'Onde vamos comprar pão para toda esta gente?', who: 'jesus' },
    'Filipe respondeu: «Nem com muito dinheiro chegava!»'
  ],
  fact: 'Jesus já sabia o que ia fazer. Queria ver se Filipe ia confiar nele!',
  hint: 'Toca nas pessoas, no Filipe e em Jesus.',
  alt: 'Fim de tarde perto do lago. A multidão no monte está com fome. Jesus conversa com Filipe, que segura uma bolsinha com poucas moedas.',
  cue: [560, 600],
  art() {
    let s = galileia({ day: { sky: [[0, '#f6a46a'], [.5, '#fde2b8'], [1, '#fdf0e2']], sunX: 600, sunY: 380, sunR: 40, clouds: false }, lake: '#5c94c4', far: '#b6a98a' });
    s += `<g data-k="fome"><g class="act">${plateia([[620, .56, [80, 160, 240, 520, 600, 680, 760]], [700, .7, [470, 560, 650, 740]]], 21, { face: 'o' })}<ellipse class="hit" cx="420" cy="620" rx="380" ry="110" fill="#000" fill-opacity="0"/></g></g>`;
    s += jesus({ x: 230, y: 770, s: 1.04, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 60, b: -20 }, k: 'jesus' });
    s += person(Object.assign({}, FILIPE, { x: 400, y: 776, s: 1, face: 'worry', look: -.6, armL: { a: 50, b: -30, item: `<g transform="translate(0,6)">${bolsa()}</g>` }, armR: { a: 20 }, k: 'filipe' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('fome'), 'Pessoas com fome', () => {
      api.snd('grunt');
      [[160, 520], [600, 520], [520, 610]].forEach(([x, y], i) => api.later(() => api.bubble(x, y, 'Ronc!', { key: 'r' + i, size: 30, plain: true, dur: 1100 }), i * 260));
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hm'); api.bubble(230, 500, 'Onde vamos comprar pão?', { key: 'j' }); });
    api.tap(api.q('filipe'), 'Filipe', () => { api.snd('clank'); api.shakeHead(api.q('filipe')); api.bubble(400, 510, 'Nem com muito dinheiro!', { key: 'f' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
  }
});

const CX = 470, CY = 756;
/* =====================================================================
   3 — O LANCHE DO MENINO
   ===================================================================== */
SCENES.push({
  key: 'menino', title: 'O lanche do menino', ref: 'João 6.8-9', tint: 'meadow',
  text: [
    'André, outro amigo de Jesus, encontrou um menino.',
    'O menino tinha um lanche: cinco pães e dois peixinhos. Vamos contar?',
    { q: 'Mas o que é isto para tanta gente?', who: 'outro' }
  ],
  fact: 'Os pães eram de cevada, muito simples. E os peixes eram pequeninos.',
  hint: 'Toca no cesto para contares.',
  alt: 'André põe a mão no ombro de um menino. O menino segura um cesto com cinco pães e dois peixes. Jesus olha a sorrir.',
  cue: [470, 660],
  art() {
    let s = galileia({ boat: false });
    s += plateia([[600, .5, [60, 130, 560, 640, 720]]], 31);
    s += person(Object.assign({}, ANDRE, { x: 140, y: 776, s: 1.02, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 64, b: -10 }, k: 'andre' }));
    s += person(Object.assign({}, MENINO, { x: 300, y: 790, s: 1.1, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 56, b: -14 }, k: 'menino' }));
    s += cesta(CX, CY, 1.05, { k: 'cesta', count: true });
    s += jesus({ x: 660, y: 774, s: 1.04, face: 'joy', look: -.6, armL: { a: 30, b: 20 }, armR: { a: 20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    const ITENS = [...LANCHE.map((p, i) => ['p' + i, p]), ...PEIXES.map((p, i) => ['f' + i, p])];
    let n = 0;
    api.tap(api.q('cesta'), 'Cesto do lanche', async () => {
      if (n >= ITENS.length) { api.snd('tada'); api.bubble(CX, 560, 'Cinco pães e dois peixes!', { key: 'c' }); return; }
      const [k, [a, b]] = ITENS[n], peixe = k[0] === 'f';
      const x = CX + a * 1.05, y = CY + b * 1.05;
      api.snd('chime', ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'C6'][n]);
      api.anim(api.act(api.q(k)), [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 450, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      api.burst(x, y, 'spark', 5);
      api.bubble(x, y - 40, NUM[peixe ? n - 5 : n], { key: 'n', size: 30, plain: true, dur: 900 });
      n++;
      if (n === 5) api.later(() => api.bubble(CX, 560, 'Cinco pães!', { key: 'c' }), 700);
      if (n === ITENS.length) {
        api.later(() => { api.snd('tada'); api.bubble(CX, 560, 'Dois peixes!', { key: 'c' }); }, 700);
        api.later(() => api.bubble(140, 500, 'Mas é tão pouquinho...', { key: 'a' }), 2200);
        api.nudgeNext(4400);
      }
    });
    api.tap(api.q('andre'), 'André', () => { api.snd('hm'); api.bubble(140, 500, 'Mas é tão pouquinho...', { key: 'a' }); });
    api.tap(api.q('menino'), 'Menino', () => { api.snd('laugh'); api.bubble(300, 580, 'É o meu lanche!', { key: 'm' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.bubble(660, 500, 'Que lanche bom!', { key: 'j' }); });
  }
});

const ENT_AL = { a: 46, b: -24 }, ENTREGA = { d: [200, -40] };
/* =====================================================================
   4 — UM PRESENTE PARA JESUS
   ===================================================================== */
SCENES.push({
  key: 'entrega', title: 'Um presente para Jesus', ref: 'João 6.9-11', tint: 'rose',
  text: [
    'O menino deu o lanche a Jesus.',
    'Era pouquinho... Mas nas mãos de Jesus, um pouquinho pode tornar-se muito!'
  ],
  fact: 'Jesus fica feliz quando repartimos o que temos.',
  hint: 'Toca no cesto para dares o lanche a Jesus.',
  alt: 'O menino estende o cesto com o lanche. Jesus baixa-se um bocadinho, sorri e recebe o presente.',
  cue: [372, 640],
  art() {
    let s = galileia({ boat: false });
    s += plateia([[600, .5, [60, 140, 220, 600, 680, 760]]], 41);
    s += person(Object.assign({}, MENINO, { x: 250, y: 790, s: 1.1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 62, b: -16 }, k: 'menino' }));
    s += jesus({ x: 600, y: 770, s: 1.06, face: 'joy', look: -.6, armL: ENT_AL, armR: { a: 20 }, k: 'jesus' });
    const [jx, jy] = handAt('adult', -1, ENT_AL, 1.06, 600, 770);
    ENTREGA.d = [r1(jx - 10 - 372), r1(jy + 30 - 700)];
    s += `<g data-k="presente"><g class="act">${cesta(372, 700, .8)}${hitC(372, 668, 80)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('presente'), 'Cesto do lanche', async () => {
      if (api.st.ok) { api.snd('heart'); api.burst(372 + ENTREGA.d[0], 640 + ENTREGA.d[1], 'heart', 4); return; }
      api.st.ok = true;
      api.snd('gift');
      const [dx, dy] = ENTREGA.d;
      await api.anim(api.act(api.q('presente')), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${dx / 2}px,${dy / 2 - 50}px)`, offset: .5 }, { transform: `translate(${dx}px,${dy}px)` }], { duration: 1000, fill: 'forwards', easing: 'ease-in-out' });
      api.burst(372 + dx, 640 + dy, 'heart', 6);
      api.bubble(600, 480, 'Obrigado, meu amigo!', { key: 'j' });
      api.later(() => api.bubble(250, 560, 'É para ti, Jesus!', { key: 'm' }), 1300);
      api.nudgeNext(3600);
    });
    api.tap(api.q('menino'), 'Menino', () => { api.snd('laugh'); api.hop(api.q('menino'), 12); api.bubble(250, 560, 'É para ti, Jesus!', { key: 'm' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(600, 480, api.st.ok ? 'Obrigado, meu amigo!' : 'Que lindo presente!', { key: 'j' }); });
  }
});

/* =====================================================================
   5 — SENTEM NA GRAMA!
   ===================================================================== */
const GRUPOS = [
  { hx: 300, hy: 640, gente: [[250, 680, .78, 0], [330, 690, .74, 1], [400, 676, .78, 2]] },
  { hx: 560, hy: 590, gente: [[500, 620, .62, 4], [560, 628, .58, 3], [620, 618, .62, 6]] },
  { hx: 640, hy: 750, gente: [[560, 790, .9, 7], [660, 800, .84, 5], [750, 786, .9, 0]] }
];
SCENES.push({
  key: 'grama', title: 'Sentem-se na relva!', ref: 'João 6.10', tint: 'meadow',
  text: [
    'Jesus disse aos amigos: «Peçam ao povo para se sentar na relva.»',
    'E toda a gente se sentou em grupos. Era gente sem fim!'
  ],
  fact: 'Eram uns cinco mil homens, sem contar as mulheres e as crianças!',
  hint: 'Toca nos grupos para eles se sentarem.',
  alt: 'No monte verde, Jesus aponta para a relva. Três grupos de pessoas estão de pé e, a cada toque, um grupo senta-se na relva.',
  cue: [300, 560],
  art() {
    let s = galileia({});
    s += plateia([[560, .44, [40, 100, 160, 700, 760]]], 51, { sit: true });
    GRUPOS.forEach((g, i) => {
      const pe = g.gente.map(([x, y, sc, p]) => person(Object.assign({}, POVO[p], { x, y, s: POVO[p].kind === 'child' ? sc * 1.15 : sc, face: 'smile', look: (x - 400) / -400, armL: { a: 14 }, armR: { a: 14 } }))).join('');
      const sit = g.gente.map(([x, y, sc, p]) => sentado(POVO[p], { x, y, s: POVO[p].kind === 'child' ? sc * 1.15 : sc, face: 'joy', look: (x - 400) / -400, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } })).join('');
      s += `<g data-k="g${i}"><g data-k="pe${i}">${pe}</g><g data-k="sit${i}" opacity="0" style="pointer-events:none">${sit}</g><ellipse class="hit" cx="${g.hx}" cy="${g.hy - 40}" rx="${110 * g.gente[0][2]}" ry="${120 * g.gente[0][2]}" fill="#000" fill-opacity="0"/></g>`;
    });
    s += jesus({ x: 110, y: 790, s: 1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 70, b: 10 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    let n = 0;
    GRUPOS.forEach((g, i) => api.tap(api.q('g' + i), 'Grupo de pessoas', () => {
      if (api.st['s' + i]) { api.snd('laugh'); api.burst(g.hx, g.hy - 100, 'heart', 3); return; }
      api.st['s' + i] = true;
      api.snd('swish');
      api.q('pe' + i).setAttribute('opacity', '0');
      api.anim(api.q('sit' + i), [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 400, fill: 'forwards' });
      api.burst(g.hx, g.hy, 'dust', 4);
      n++;
      api.badge(740, 80, String(n), { key: 'n' });
      if (n === GRUPOS.length) { api.later(() => { api.snd('tada'); api.bubble(400, 420, 'Toda a gente sentada!', { key: 't' }); }, 500); api.nudgeNext(2600); }
    }));
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(130, 520, 'Sentem-se na relva, por favor!', { key: 'j' }); });
  }
});

/* =====================================================================
   6 — OBRIGADO, DEUS!
   ===================================================================== */
SCENES.push({
  key: 'agradece', title: 'Obrigado, Deus!', ref: 'João 6.11; Mateus 14.19', tint: 'gold',
  text: [
    'Jesus pegou nos pães, olhou para o céu e agradeceu a Deus.',
    'E se nós também agradecêssemos antes de comer?'
  ],
  fact: 'Jesus falava sempre com Deus, o seu Pai.',
  hint: 'Toca em Jesus, no menino e na luz.',
  alt: 'Jesus está de pé no meio do povo sentado na relva. Levanta um pão para o céu e agradece. Uma luz dourada desce do céu. O menino junta as mãos e ora.',
  cue: [400, 420],
  art() {
    let s = galileia({ boat: false });
    s += glory(400, 20, 260, 'luz', { rays: [-30, -12, 6, 24] });
    s += plateia([[590, .5, [50, 120, 190, 610, 680, 750]], [680, .66, [60, 160, 640, 740]]], 61, { sit: true });
    s += person(Object.assign({}, ANDRE, { x: 230, y: 774, s: .98, face: 'smile', look: .5, armL: { a: -20, b: -70 }, armR: { a: -20, b: -70 } }));
    s += cesta(232, 704, .62);
    s += jesus({ x: 400, y: 760, s: 1.08, face: 'joy', look: 0, armL: { a: 20 }, armR: { a: 160, b: -6, item: `<g transform="translate(0,-14)">${pao()}</g>` }, k: 'jesus' });
    s += person(Object.assign({}, MENINO, { x: 570, y: 730, s: 1.06, legs: 'kneel', face: 'smile', look: -.4, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'menino' }));
    return s;
  },
  setup(api) {
    const ora = () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(430, 330, 'spark', 10, { col: '#fff1b0' }); api.bubble(400, 420, 'Obrigado, Pai, por esta comida!', { key: 'j', dur: 2600 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    api.tap(api.q('jesus'), 'Jesus', ora);
    api.tap(api.q('luz'), 'Luz do céu', ora);
    api.tap(api.q('menino'), 'Menino a orar', () => { api.snd('anoint'); api.bubble(570, 520, 'Amém!', { key: 'm', size: 32 }); });
  }
});

/* =====================================================================
   7 — O PÃO NÃO ACABA!
   ===================================================================== */
const MILAGRE = { comida: [] };
const MESA = [[90, 640, .72, 0], [200, 652, .7, 1], [320, 640, .72, 2], [480, 642, .72, 4], [600, 652, .7, 3], [720, 640, .72, 6], [130, 770, .84, 7], [690, 776, .84, 5]];
SCENES.push({
  key: 'milagre', title: 'O pão não acaba!', ref: 'João 6.11-12', tint: 'gold',
  text: [
    'Os amigos de Jesus começaram a dividir o pão e o peixe.',
    'E o pão não acabava! E o peixe também não! Toda a gente comeu até encher a barriga.'
  ],
  fact: 'Foi um milagre! Só Jesus pode fazer uma coisa assim.',
  hint: 'Toca no cesto para dares comida a todos.',
  alt: 'O povo está sentado na relva. André segura um cesto que nunca fica vazio: a cada toque, um pão ou um peixe voa até alguém, que come feliz.',
  cue: [400, 640],
  art() {
    let s = galileia({ boat: false });
    s += plateia([[560, .44, [40, 110, 180, 620, 690, 760]]], 71, { sit: true });
    const comida = [];
    MESA.forEach(([x, y, sc, p], i) => {
      const P = POVO[p], ss = P.kind === 'child' ? sc * 1.15 : sc;
      s += sentado(P, { x, y, s: ss, face: 'smile', look: (400 - x) / 400, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'c' + i });
      const [hx, hy] = handAt(P.kind, 1, { a: 30, b: 40 }, ss, x, y, P.kind === 'adult' ? 30 : 0);
      comida.push([r1(hx), r1(hy - 6)]);
      s += `<g transform="translate(${r1(hx)},${r1(hy - 6)}) scale(${r1(ss * .9)})" style="pointer-events:none"><g data-k="m${i}" opacity="0">${i % 3 === 2 ? peixe() : pao()}</g></g>`;
    });
    MILAGRE.comida = comida;
    s += person(Object.assign({}, ANDRE, { x: 400, y: 770, s: 1, face: 'joy', look: 0, armL: { a: 16, b: 10 }, armR: { a: 16, b: 10 } }));
    s += cesta(400, 746, .9, { k: 'cesta', muito: true });
    s += `<g transform="translate(400,640)" style="pointer-events:none"><g data-k="voo" opacity="0">${pao()}</g></g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('cesta'), 'Cesto que nunca fica vazio', async () => {
      api.hop(api.q('cesta'), 8);
      if (n >= MESA.length) { api.snd('tada'); api.burst(400, 600, 'confetti', 12); api.bubble(400, 500, 'Ainda há mais!', { key: 'c' }); return; }
      const i = n++;
      const [x, y] = MILAGRE.comida[i];
      api.snd('whoosh');
      await api.anim(api.q('voo'), [{ opacity: 1, transform: 'translate(0px,0px) scale(.8)' }, { opacity: 1, transform: `translate(${(x - 400) / 2}px,${(y - 640) / 2 - 90}px) scale(1.2) rotate(-14deg)`, offset: .5 }, { opacity: 1, transform: `translate(${x - 400}px,${y - 640}px) scale(1) rotate(8deg)` }], { duration: 650, easing: 'ease-in-out' });
      api.snd('crunch');
      api.anim(api.q('m' + i), [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.3)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 360, fill: 'forwards' });
      const [px, py, ps] = api.pos(api.q('c' + i));
      api.bubble(px, py - 230 * ps, 'Hum!', { key: 'h' + (i % 3), size: 28, plain: true, dur: 1000 });
      api.hop(api.q('c' + i), 8);
      if (n === MESA.length) { api.later(() => { api.snd('victory'); api.burst(400, 560, 'confetti', 18); api.bubble(400, 470, 'O pão não acaba!', { key: 'c' }); }, 500); api.nudgeNext(3000); }
    });
    MESA.forEach((_, i) => api.tap(api.q('c' + i), 'Pessoa sentada', () => { const [px, py, ps] = api.pos(api.q('c' + i)); api.snd('laugh'); api.bubble(px, py - 230 * ps, 'Que delícia!', { key: 'h' + (i % 3), size: 26 }); }));
  }
});
/* =====================================================================
   8 — DOZE CESTOS
   ===================================================================== */
const CESTOS = [];
for (let i = 0; i < 12; i++) CESTOS.push([110 + (i % 6) * 116, i < 6 ? 618 : 726]);
SCENES.push({
  key: 'cestos', title: 'Doze cestos', ref: 'João 6.12-13', tint: 'sand',
  text: [
    'Depois, Jesus disse: «Juntem o que sobrou, para não desperdiçarmos nada.»',
    'Encheram doze cestos com as sobras! Vamos contar?'
  ],
  fact: 'Sobrou muito mais do que o lanche que o menino tinha no princípio!',
  hint: 'Toca nos cestos para os encheres.',
  alt: 'Doze cestos estão na relva, em duas filas. Jesus e Pedro observam. A cada toque, um cesto fica cheio de pães e peixes.',
  cue: [110, 590],
  art() {
    let s = galileia({});
    s += plateia([[560, .44, [300, 360, 420, 480]]], 81, { sit: true });
    s += jesus({ x: 120, y: 560, s: .8, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 60, b: -10 }, k: 'jesus' });
    s += person(Object.assign({}, PEDRO, { x: 690, y: 564, s: .8, face: 'surprise', look: -.6, armL: { a: 150, b: -20 }, armR: { a: 20 }, k: 'pedro' }));
    CESTOS.forEach(([x, y], i) => s += cestinho(x, y, 'k' + i, i < 6 ? .9 : 1));
    return s;
  },
  setup(api) {
    let n = 0;
    CESTOS.forEach(([x, y], i) => api.tap(api.q('k' + i), 'Cesto', () => {
      if (api.st['k' + i]) { api.snd('pluck'); api.hop(api.q('k' + i), 6); return; }
      api.st['k' + i] = true;
      n++;
      api.snd('chime', ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'F6', 'G6'][n - 1]);
      api.anim(api.q('k' + i + 'c'), [{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 380, fill: 'forwards' });
      api.hop(api.q('k' + i), 8);
      api.bubble(x, y - 70, NUM[n - 1], { key: 'n', size: 30, plain: true, dur: 900 });
      api.badge(740, 80, String(n), { key: 'b' });
      if (n === 12) { api.later(() => { api.snd('victory'); api.burst(400, 600, 'confetti', 18); api.bubble(400, 470, 'Doze cestos cheios!', { key: 't' }); }, 600); api.nudgeNext(3000); }
    }));
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(130, 330, 'Não vamos desperdiçar nada!', { key: 'j' }); });
    api.tap(api.q('pedro'), 'Pedro', () => { api.snd('tada'); api.bubble(690, 330, 'Quanta comida!', { key: 'p' }); });
  }
});

/* =====================================================================
   9 — O PÃO DA VIDA
   ===================================================================== */
const CRIANCAS = [[570, 790, MENINO], [250, 796, POVO[1]], [660, 800, POVO[5]]];
SCENES.push({
  key: 'paodavida', title: 'O pão da vida', ref: 'João 6.35', tint: 'dusk',
  text: [
    'Depois, Jesus explicou:',
    { q: 'Eu sou o pão da vida. Quem vem a mim nunca mais vai ter fome.', who: 'jesus' },
    'O pão enche a barriga. E Jesus enche o nosso coração de amor!'
  ],
  fact: 'Jesus estava a falar de outro tipo de fome: a fome de amor e de Deus.',
  hint: 'Toca em Jesus e nas crianças.',
  alt: 'Pôr do sol no lago. Jesus está sentado numa pedra, rodeado de crianças felizes. Corações sobem no ar.',
  cue: [400, 520],
  art() {
    let s = galileia({ day: { sky: [[0, '#f6a46a'], [.5, '#fde2b8'], [1, '#fdf0e2']], sunX: 220, sunY: 380, sunR: 40, clouds: false }, lake: '#5c94c4', far: '#b6a98a', boatX: 660 });
    s += rock(400, 772, 190, 48, {});
    s += jesus({ x: 400, y: 772, s: 1.04, ...SIT_A, face: 'joy', look: .3, armL: { a: 70, b: -20 }, armR: { a: 70, b: -20 }, k: 'jesus' });
    CRIANCAS.forEach(([x, y, p], i) => s += person(Object.assign({}, p, { x, y, s: 1, face: 'joy', look: x < 400 ? .6 : -.6, legs: i === 1 ? 'hop' : 'stand', armL: { a: i === 1 ? 150 : 30, b: i === 1 ? -20 : 30 }, armR: { a: i === 1 ? 150 : 40, b: i === 1 ? -20 : 40 }, k: 'k' + i })));
    s += cesta(150, 800, .6);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 520, 'heart', 8); api.bubble(400, 460, 'Eu sou o pão da vida!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    const FALAS = [N('Eu amo Jesus!'), N('Jesus cuida de mim!'), N('Obrigado, Jesus!')];
    CRIANCAS.forEach(([x], i) => api.tap(api.q('k' + i), 'Criança', () => { api.snd('laugh'); api.hop(api.q('k' + i), 14); api.bubble(x, 560, FALAS[i], { key: 'k' }); }));
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o lago. Um barquinho descansa na água, um cesto de pão fica na relva e uma ovelhinha dorme.',
  cue: [430, 160],
  questions: [
    ['Quantos pães tinha o menino?', 'Cinco!'],
    ['E quantos peixes?', 'Dois!'],
    ['O que é que Jesus fez antes de dividir a comida?', 'Agradeceu a Deus.'],
    ['Quantos cestos sobraram?', 'Doze!'],
    ['O que é que podes repartir com alguém?', 'O meu lanche, os meus brinquedos e muito mais!']
  ],
  wrong: [
    ['Dois.', 'Doze.', 'Cem.'],
    ['Cinco!', 'Dez!', 'Nenhum!'],
    ['Comeu um pão.', 'Mandou as pessoas embora.', 'Foi comprar mais comida.'],
    ['Nenhum!', 'Um!', 'Três!'],
    ['Nada, é tudo meu!', 'Só o que não quero.', 'Só com quem me dá coisas.']
  ],
  verse: ['Eu sou o pão da vida.', 'João 6.35'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(2001, 80, 0, 0, 800, 420, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 470], [220, 446], [460, 462], [700, 440], [840, 454]], '#244a5b');
    s += `<rect x="-40" y="470" width="900" height="140" fill="#1f3a66"/><path d="M-40,470 L840,470" stroke="#3a5a8a" stroke-width="4"/><path d="M570,490 L630,490 M560,520 L640,520 M580,550 L620,550" stroke="#fff4c4" stroke-width="5" stroke-linecap="round" opacity=".5"/>`;
    s += barco(560, 540, .42, 'barco');
    s += hill([[-40, 610], [200, 588], [420, 604], [640, 582], [840, 598]], '#2c584f') + hill([[-40, 700], [240, 680], [480, 694], [720, 672], [840, 684]], '#2f5f55');
    s += cesta(470, 742, .5);
    s += sheep({ x: 280, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(300, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
    api.tap(api.q('barco'), 'Barquinho', () => { api.snd('splash'); api.burst(560, 548, 'ripple', 3); });
  }
});

Ov.addBook({
  id: 'paes',
  title: 'Cinco Pães e Dois Peixes',
  cover: { kicker: 'Uma história da Bíblia', title: 'Cinco Pães', small: 'e Dois Peixes', sub: 'Jesus cuida de toda a gente' },
  color: '#7a5a12',
  ref: 'João 6.1-14',
  scenes: SCENES
});
})();
