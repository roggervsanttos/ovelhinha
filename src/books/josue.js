/* =====================================================================
   LIVRO: JOSUÉ E AS MURALHAS DE JERICÓ  (Josué 1 a 6)
   ===================================================================== */
(() => {
const SCENES = [];
const JOSUE = { kind: 'adult', skin: '#c98a5a', hair: '#4a3020', hairStyle: 'short', beard: 'short', beardCol: '#4a3020', tunic: '#a8875a', armor: scaleArmor('adult'), cloak: '#b6312f', cloakTrim: '#f2c14e', belt: '#7b4a2a', shoe: '#6b4a33' };
const JOSUE_VELHO = Object.assign({}, JOSUE, { hair: '#d8d2c8', beardCol: '#e9e4dc', browCol: '#cfc9c0', beard: 'long', armor: null, tunic: '#d9c49c', stripes: '#b6312f' });
const RAABE = { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#e5483f', hairStyle: 'long', hair: '#2b1d17', tunic: '#f2c14e', belt: '#b5402f' };
const ESPIOES = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'cloth', clothCol: '#8a7a5a', bandCol: '#4a3a2a', tunic: '#6b5a46', belt: '#3a2a20', shoe: '#4a3226' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', head: 'cloth', clothCol: '#6a7a8a', bandCol: '#3a4a5a', tunic: '#55687a', belt: '#3a2a20', shoe: '#4a3226' }
];
const SACERDOTE = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'long', beardCol: '#3a2520', head: 'cloth', clothCol: '#fbf6ea', bandCol: '#3f6fb5', tunic: '#fbf6ea', longSleeves: true, belt: '#3f6fb5', trim: '#3f6fb5' };
const SACERDOTE2 = Object.assign({}, SACERDOTE, { skin: '#d99a6c', hair: '#5a3a26', beard: 'short', beardCol: '#5a3a26' });
const SOLDADO = { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'helmetI', tunic: '#a8875a', belt: '#7b4a2a', shoe: '#6b4a33' };
const GUARDA = { kind: 'adult', skin: '#d39463', hair: '#2b1d17', beard: 'bushy', beardCol: '#2b1d17', head: 'helmetG', tunic: '#7a3a3a', belt: '#3a2a20' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' }
];
const josue = o => person(Object.assign({}, JOSUE, o));
const raabe = o => person(Object.assign({}, RAABE, o));
// sacerdote a tocar a trombeta de chifre (o chifre fica junto à boca)
const HORN = `<g transform="translate(4,-205) scale(1.15)">${ITEM.shofar()}</g>`;
const tocador = (p, o) => person(Object.assign({}, p, { armR: { a: 140, b: 24 }, armL: { a: -40, b: -130 }, extra: HORN, face: 'o', look: .4 }, o));

/* ---------- peças desta história ---------- */
function deserto(o = {}) {
  let s = bgDay(Object.assign({ sunX: 650, sunY: 130, sunR: 42, sky: [[0, '#8ccbed'], [.55, '#d4ecf5'], [1, '#f6ead2']] }, o.day || {}));
  s += hill([[-40, 430], [180, 400], [420, 424], [640, 392], [840, 414]], o.far || '#d9c08e');
  s += hill([[-40, 520], [220, 500], [480, 516], [720, 492], [840, 504]], o.mid || '#e4cd9c');
  s += hill([[-40, 610], [260, 592], [520, 606], [840, 586]], o.near || '#ead7aa');
  return s;
}
function tendas(list, o = {}) {
  return list.map(([x, y, w, h], i) => tent(x, y, w, h, { fill: ['#e7d2b0', '#dcc39a', '#efdcbc'][i % 3], stripe: ['#b6553f', '#3f6fb5', '#5e7d4a'][i % 3], flag: o.flags && i % 2 === 0 ? ['#e5483f', '#3f93c7', '#f2c14e'][i % 3] : '' })).join('');
}
function arca(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">${limb(-110, 0, 110, 0, 8, '#c9933c')}<rect x="-54" y="-44" width="108" height="56" rx="4" fill="#f2c14e" stroke="${OL}" stroke-width="3"/><rect x="-46" y="-36" width="92" height="40" rx="3" fill="none" stroke="#d99a1c" stroke-width="3"/><rect x="-60" y="-54" width="120" height="12" rx="3" fill="#f6d36a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 46},-54 C${k * 40},-92 ${k * 14},-106 ${k * 4},-84 C${k * 18},-80 ${k * 28},-70 ${k * 30},-54 Z" fill="#f6d36a" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`).join('')}</g>`;
}
// dois sacerdotes a levar a arca aos ombros
function levaArca(x, y, s = 1, k = '') {
  const pa = { a: 160, b: -30 };
  let g = person(Object.assign({}, SACERDOTE, { x: -86, y: 0, armL: pa, armR: pa, face: 'smile', look: .4, legs: 'walk' }));
  g += person(Object.assign({}, SACERDOTE2, { x: 86, y: 0, armL: pa, armR: pa, face: 'smile', look: .4, legs: 'walk' }));
  g += arca(0, -196, 1);
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -200, 110) : ''}</g></g>`;
}
// as muralhas de Jericó vistas de frente, em partes que podem cair (data-k m0, m1, ...)
function muralha(o = {}) {
  const top = o.top ?? 300, bot = o.bot ?? 560, x0 = o.x0 ?? -40, x1 = o.x1 ?? 840, n = o.n ?? 6, gate = o.gate ?? 400;
  const w = (x1 - x0) / n, h = bot - top;
  let s = '';
  if (o.casas !== false) s += `<g data-k="casas" opacity=".95">${town(x0 + 60, top - 72, 1, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' })}${town(x0 + 420, top - 66, .9, { wall: '#f1dcb2', shade: '#dbc08c', roof: '#e2c696' })}</g>`;
  for (let i = 0; i < n; i++) {
    const a = x0 + i * w;
    let br = '';
    for (let r = 0; r < Math.floor(h / 30); r++) for (let xx = (r % 2 ? 26 : 0); xx < w; xx += 52) br += `<rect x="${r1(xx - w / 2)}" y="${-h + 8 + r * 30}" width="${r1(Math.min(48, w - xx))}" height="26" rx="3"/>`;
    let cr = '';
    for (let xx = 4; xx < w - 10; xx += 38) cr += `<rect x="${r1(xx - w / 2)}" y="${-h - 26}" width="24" height="28" fill="#e6c995" stroke="${OL}" stroke-width="3"/>`;
    const body = `${cr}<rect x="${r1(-w / 2)}" y="${-h}" width="${r1(w + 1)}" height="${h}" fill="#e2c497" stroke="${OL}" stroke-width="3.4"/><g fill="#d3b07c" opacity=".75">${br}</g>${o.cracks ? `<path d="M${r1(-w * .2)},${-h} l10,${h * .3} l-14,${h * .2} l12,${h * .25}" stroke="${OL}" stroke-width="2.4" fill="none" opacity=".55"/>` : ''}`;
    s += `<g transform="translate(${r1(a + w / 2)},${bot})" data-k="m${i}"><g class="act">${body}</g></g>`;
  }
  // torres e portão
  for (const tx of o.towers || []) s += `<g transform="translate(${tx},${bot})">${[...Array(4)].map((_, j) => `<rect x="${-56 + j * 30}" y="${-h - 96}" width="22" height="30" fill="#ead2a6" stroke="${OL}" stroke-width="3"/>`).join('')}<rect x="-58" y="${-h - 70}" width="116" height="${h + 70}" fill="#ead2a6" stroke="${OL}" stroke-width="3.4"/><rect x="-10" y="${-h - 40}" width="20" height="34" rx="10" fill="#5a3a26"/></g>`;
  if (o.gate !== false) s += `<g data-k="portao"><path d="M${gate - 62},${bot} L${gate - 62},${bot - 130} A62,62 0 0 1 ${gate + 62},${bot - 130} L${gate + 62},${bot} Z" fill="#6b4a33" stroke="${OL}" stroke-width="3.6"/><path d="M${gate},${bot - 190} L${gate},${bot}" stroke="#4a3226" stroke-width="4"/><g stroke="#4a3226" stroke-width="3">${[-40, -14, 14, 40].map(dx => `<path d="M${gate + dx},${bot - 170 + Math.abs(dx) * .6} L${gate + dx},${bot}"/>`).join('')}</g><path d="M${gate - 58},${bot - 70} L${gate + 58},${bot - 70}" stroke="#3a2a20" stroke-width="8"/>${hitC(gate, bot - 90, 70)}</g>`;
  return s;
}
// casa da Raabe em cima da muralha, com janela e corda vermelha
function casaRaabe(x, y, o = {}) {
  let g = `<rect x="-70" y="-120" width="140" height="120" fill="#efd6a8" stroke="${OL}" stroke-width="3.4"/><rect x="-76" y="-128" width="152" height="12" rx="3" fill="#dcc08c" stroke="${OL}" stroke-width="2.6"/>`;
  g += `<rect x="-26" y="-92" width="52" height="46" rx="6" fill="${o.noite ? '#ffd27a' : '#5a3a26'}" stroke="${OL}" stroke-width="3"/>`;
  if (o.corda !== false) g += `<g data-k="corda">${stroke2(`M-6,-52 C-14,${o.len ? o.len * .3 : 60} 10,${o.len ? o.len * .6 : 140} -4,${o.len || 210}`, 6, '#d7333f', 2.6)}${hitC(-4, (o.len || 210) * .55, 44)}</g>`;
  return `<g transform="translate(${x},${y})">${g}</g>`;
}
function rio(y, o = {}) {
  const h = o.h ?? 120;
  let s = `<rect x="-40" y="${y}" width="900" height="${h}" fill="#c9b48a"/>`;
  s += `<g fill="#a8957b">${[[60, 20], [180, 60], [300, 30], [420, 80], [540, 40], [660, 74], [760, 24]].map(([a, b]) => `<ellipse cx="${a}" cy="${y + b}" rx="22" ry="9"/>`).join('')}</g>`;
  s += `<g data-k="agua"><rect x="-40" y="${y}" width="900" height="${h}" fill="#4f9fd0"/><g stroke="#bfe3f7" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85">${[[40, 26], [200, 56], [360, 30], [520, 70], [680, 40], [300, 96], [600, 100]].map(([a, b]) => `<path class="drift" style="--dx:30px;--d:3s;${dl(3)}" d="M${a},${y + b} q12,-7 24,0 q12,7 24,0"/>`).join('')}</g></g>`;
  return s;
}
function chifre(x, y, s = 1, k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${ITEM.shofar()}${k ? hitC(36, -24, 46) : ''}</g></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Josué e as Muralhas de Jericó',
  alt: 'As grandes muralhas de Jericó começam a cair numa nuvem de pó. À frente, Josué levanta o braço, contente, e um sacerdote toca uma trombeta de chifre.',
  cue: [400, 640],
  art() {
    let s = sky('sky', [[0, '#f2a25e'], [.4, '#fbd09a'], [.7, '#fdecc8'], [1, '#fdecc8']], 1100);
    s += sun(640, 330, 50, { face: true }) + cloud(160, 300, .9) + cloud(470, 220, .7, { dx: -26 });
    s += hill([[-40, 760], [200, 740], [420, 754], [640, 734], [840, 748]], '#d9c08e');
    s += `<g transform="translate(0,290)">${muralha({ top: 330, bot: 560, n: 5, towers: [130, 670], gate: 400, cracks: true })}</g>`;
    s += `<g opacity=".9">${[[160, 600], [300, 560], [500, 590], [640, 570]].map(([x, y], i) => `<g transform="translate(${x},${y + 290}) rotate(${(i % 2 ? 1 : -1) * 18})"><rect x="-22" y="-14" width="44" height="28" rx="3" fill="#e2c497" stroke="${OL}" stroke-width="3"/></g>`).join('')}</g>`;
    s += `<rect x="-40" y="850" width="900" height="300" fill="#ead7aa"/>`;
    s += tocador(SACERDOTE, { x: 600, y: 1040, s: 1.02, k: 'sacerdote' });
    s += josue({ x: 280, y: 1060, s: 1.14, face: 'joy', look: .3, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 160, b: -20 }, k: 'josue' });
    s += flowerBand(1601, 1070, 1095, 6, ['#f2c14e', '#e0473e', '#ffffff']);
    return s;
  },
  setup(api) {
    api.tap(api.q('josue'), 'Josué', () => { api.snd('fanfare'); api.hop(api.q('josue'), 16); api.bubble(280, 740, 'O Senhor deu-nos a vitória!', { key: 'j' }); });
    api.tap(api.q('sacerdote'), 'Sacerdote com a trombeta', () => { api.snd('trumpet'); api.burst(560, 760, 'note', 4); });
  }
});

/* =====================================================================
   1 — SÊ FORTE E CORAJOSO
   ===================================================================== */
SCENES.push({
  key: 'forte', title: 'Sê forte e corajoso!', ref: 'Josué 1.1-9', tint: 'gold',
  text: [
    'Moisés tinha guiado o povo de Deus pelo deserto durante muitos anos. Agora, Deus escolheu Josué para ser o novo chefe.',
    'Deus disse-lhe:',
    { q: 'Sê forte e corajoso! Eu estou contigo, tal como estive com Moisés.', who: 'deus' }
  ],
  fact: 'Josué era o ajudante de Moisés desde que era jovem.',
  hint: 'Toca no Josué e na luz.',
  alt: 'De manhã, no deserto, Josué está de pé numa rocha com o seu cajado e olha para uma luz dourada que vem do céu. Lá em baixo, há muitas tendas do povo de Israel.',
  cue: [640, 170],
  art() {
    let s = deserto({ day: { sun: false } });
    s += glory(660, 120, 230, 'luz');
    s += tendas([[90, 560, 120, 80], [230, 540, 100, 66], [520, 556, 120, 78], [650, 540, 96, 64], [760, 566, 110, 74], [360, 600, 90, 60]], { flags: true });
    s += rock(300, 760, 330, 120, {});
    s += josue({ x: 300, y: 652, s: 1.1, face: 'determined', look: .7, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 120, b: -40 }, k: 'josue' });
    s += grassBand(1701, 700, 790, 10, ['#b8a46a', '#c9b47a']);
    return s;
  },
  setup(api) {
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(660, 140, 'spark', 8, { col: '#ffe9a6' }); api.bubble(600, 300, 'Eu estou contigo!', { key: 'd' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('josue'), 'Josué', () => { api.snd('hello'); api.hop(api.q('josue'), 10); api.bubble(300, 340, 'Sim, Senhor! Vou ser corajoso!', { key: 'j' }); });
  }
});

/* =====================================================================
   2 — OS ESPIÕES E RAABE
   ===================================================================== */
SCENES.push({
  key: 'raabe', title: 'Os espiões e Raabe', ref: 'Josué 2', tint: 'night',
  text: [
    'Do outro lado do rio ficava Jericó, uma cidade com muralhas enormes.',
    'Josué mandou dois espiões ver a cidade. Uma mulher chamada Raabe escondeu-os em casa e ajudou-os a fugir por uma corda vermelha.'
  ],
  fact: 'Raabe acreditou que o Deus de Israel era o Deus verdadeiro.',
  hint: 'Toca na corda vermelha e na Raabe.',
  alt: 'De noite, na muralha de Jericó, Raabe está à janela da sua casa. Uma corda vermelha desce da janela, e dois espiões descem por ela.',
  cue: [470, 470],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.6, '#283270'], [1, '#3a4889']]);
    s += starField(1801, 50, 0, 0, 800, 300, { big: .1 }) + moon(130, 110, 28);
    s += `<g opacity=".95">${muralha({ top: 330, bot: 700, n: 3, x0: 300, x1: 840, gate: false, casas: false })}</g>`;
    s += casaRaabe(470, 330, { noite: true, len: 330 });
    s += `<defs><clipPath id="${ID('janela')}"><rect x="444" y="238" width="52" height="46" rx="6"/></clipPath></defs><g data-k="raabe"><g clip-path="${UR('janela')}">${raabe({ x: 466, y: 352, s: .44, face: 'worry', look: -.6, armL: { a: 60, b: -40 }, armR: { a: 20 } })}</g>${hitC(470, 262, 46)}</g>`;
    s += `<rect x="-40" y="700" width="900" height="200" fill="#2c3f52"/>` + hill([[-40, 720], [200, 700], [400, 716]], '#2f4a46');
    s += person(Object.assign({}, ESPIOES[0], { x: 456, y: 560, s: .8, face: 'scared', look: -.3, armL: { a: 168, b: 10 }, armR: { a: 172, b: 6 }, legs: 'hop', k: 'e0' }));
    s += person(Object.assign({}, ESPIOES[1], { x: 360, y: 740, s: .86, face: 'worry', look: .4, armL: { a: 30 }, armR: { a: 120, b: -60 }, legs: 'walk', k: 'e1' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('corda'), 'Corda vermelha', async () => {
      if (api.st.desceu) { api.snd('swish'); api.hop(api.q('corda'), 6); return; }
      api.st.desceu = true;
      api.snd('whoosh');
      await api.anim(api.act(api.q('e0')), [{ transform: 'translateY(0px)' }, { transform: 'translateY(170px)' }], { duration: 900, easing: 'ease-in', fill: 'forwards' });
      api.snd('stomp');
      api.bubble(420, 520, 'Obrigado, Raabe!', { key: 'e' });
      api.nudgeNext(2400);
    });
    api.tap(api.q('raabe'), 'Raabe', () => { api.snd('shh'); api.bubble(470, 180, 'Depressa! Fujam para o monte!', { key: 'r' }); });
    api.tap(api.q('e1'), 'Espião', () => { api.snd('tiptoe'); api.bubble(360, 470, 'Chiu! Ninguém nos viu!', { key: 'e' }); });
    api.tap(api.q('e0'), 'Espião', () => { api.snd('tiptoe'); api.hop(api.q('e0'), 6); });
  }
});

/* =====================================================================
   3 — O RIO JORDÃO
   ===================================================================== */
SCENES.push({
  key: 'jordao', title: 'O rio Jordão', ref: 'Josué 3.14-17', tint: 'water',
  text: [
    'Para chegar a Jericó, o povo tinha de atravessar o rio Jordão. Mas o rio estava muito cheio!',
    'Os sacerdotes levaram a arca da aliança para dentro do rio. E a água parou! Todo o povo passou pelo chão seco.'
  ],
  fact: 'Foi como no Mar Vermelho, no tempo de Moisés!',
  hint: 'Toca na arca para a água parar.',
  alt: 'Sacerdotes vestidos de branco levam a arca dourada aos ombros e entram no rio Jordão. A água para e aparece um caminho seco com pedras. O povo espera na margem.',
  cue: [400, 400],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += hill([[-40, 400], [200, 380], [440, 396], [660, 372], [840, 390]], '#b9cf8a');
    s += olive(70, 470, .7) + palm(740, 470, .55);
    s += `<rect x="-40" y="470" width="900" height="40" fill="#cdb98a"/>`;
    s += rio(500, { h: 150 });
    s += `<rect x="-40" y="650" width="900" height="200" fill="#d9c79a"/>` + grassBand(1901, 660, 700, 8, ['#8fae5a', '#a0bc6a']);
    s += levaArca(400, 640, .82, 'arca');
    s += crowdJ([[90, 780, .66], [180, 800, .7], [620, 790, .68], [720, 770, .64]], 'p');
    return s;
  },
  setup(api) {
    api.tap(api.q('arca'), 'Arca da aliança', async () => {
      if (api.st.seco) { api.snd('chime', 'E6'); api.burst(400, 440, 'spark', 6); return; }
      api.st.seco = true;
      api.snd('rush');
      await api.anim(api.q('agua'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1200, fill: 'forwards' });
      api.snd('tada');
      api.burst(400, 520, 'spark', 10, { col: '#ffe9a6' });
      api.bubble(400, 300, 'A água parou!', { key: 'a' });
      api.nudgeNext(2400);
    });
    for (let i = 0; i < 4; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('laugh'); api.hop(api.q('p' + i), 14); if (api.st.seco) api.bubble(x, y - 190 * sc, i % 2 ? 'Vamos passar!' : 'Que milagre!', { key: 'p', size: 26 }); });
  }
});
function crowdJ(pts, k = '', o = {}) {
  return pts.map(([x, y, sc], i) => person(Object.assign({}, POVO[(i + (o.off || 0)) % POVO.length], { x, y, s: sc, face: (o.faces || ['joy', 'smile', 'grin'])[i % 3], look: x < 400 ? .6 : -.6, armL: o.armL || { a: 14 }, armR: o.armR || { a: 14 }, k: k ? k + i : '' }, o.extra ? o.extra(i) : {}))).join('');
}

/* =====================================================================
   4 — UM PLANO DIFERENTE
   ===================================================================== */
SCENES.push({
  key: 'plano', title: 'Um plano diferente', ref: 'Josué 6.1-5', tint: 'sand',
  text: [
    'As portas de Jericó estavam bem fechadas. Ninguém entrava, ninguém saía.',
    'Então Deus deu a Josué um plano muito diferente:',
    { q: 'Marchem à volta da cidade uma vez por dia, durante seis dias. No sétimo dia, deem sete voltas e gritem!', who: 'deus' }
  ],
  fact: 'As trombetas eram feitas de chifre de carneiro.',
  hint: 'Toca no portão e no Josué.',
  alt: 'Josué olha para as muralhas altas de Jericó, com o portão bem fechado. Por cima das muralhas, guardas espreitam. Uma luz dourada vem do céu.',
  cue: [400, 480],
  art() {
    let s = bgDay({ sunX: 120, sunY: 110, sunR: 36 });
    s += glory(700, 60, 200, '', { rays: [-20, 0, 20] });
    s += hill([[-40, 330], [300, 310], [840, 320]], '#d9c08e');
    s += muralha({ top: 260, bot: 560, n: 5, towers: [140, 660], gate: 400 });
    s += person(Object.assign({}, GUARDA, { x: 140, y: 214, s: .5, face: 'frown', look: .4, armL: { a: 14 }, armR: { a: 14, item: ITEM.spear(200) }, k: 'g0', legs: 'none' }));
    s += person(Object.assign({}, GUARDA, { x: 660, y: 214, s: .5, face: 'frown', look: -.4, armL: { a: 14 }, armR: { a: 14, item: ITEM.spear(200) }, k: 'g1', legs: 'none', tunic: '#3a5a7a' }));
    s += `<rect x="-40" y="560" width="900" height="300" fill="#ead7aa"/>` + grassBand(2001, 580, 620, 8, ['#b8a46a', '#c9b47a']);
    s += josue({ x: 560, y: 770, s: 1.1, flip: true, face: 'worry', look: .5, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 40, b: -90 }, k: 'josue' });
    return s;
  },
  setup(api) {
    api.tap(api.q('portao'), 'Portão de Jericó', () => { api.snd('knock', 3); api.bubble(400, 360, 'Fechado!', { key: 'g', size: 30, plain: true, dur: 1200 }); });
    for (const [k, x] of [['g0', 140], ['g1', 660]]) api.tap(api.q(k), 'Guarda de Jericó', () => { api.snd('grunt'); api.bubble(x, 120, 'Ninguém entra!', { key: 'g' }); });
    api.tap(api.q('josue'), 'Josué', () => { api.snd('hm'); api.bubble(540, 470, 'Vou fazer o que Deus mandou!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
  }
});

/* =====================================================================
   5 — UMA VOLTA POR DIA
   ===================================================================== */
SCENES.push({
  key: 'voltas', title: 'Uma volta por dia', ref: 'Josué 6.8-14', tint: 'sand',
  text: [
    'O povo obedeceu. À frente iam os soldados, depois os sacerdotes com as trombetas e a arca.',
    'Todos marchavam em silêncio. Só se ouviam as trombetas: tuuu, tuuu! Uma volta por dia, durante seis dias.'
  ],
  fact: 'Ninguém podia falar enquanto marchava. Que silêncio!',
  hint: 'Toca no povo para marchar à volta da cidade.',
  alt: 'Diante das muralhas de Jericó, passa uma procissão: soldados, sacerdotes a tocar trombetas de chifre e outros a levar a arca dourada. Um contador mostra o dia.',
  cue: [400, 640],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 36 });
    s += hill([[-40, 300], [300, 286], [840, 296]], '#d9c08e');
    s += muralha({ top: 250, bot: 480, n: 5, towers: [160, 640], gate: 400 });
    s += `<rect x="-40" y="480" width="900" height="400" fill="#ead7aa"/>` + grassBand(2101, 490, 520, 8, ['#b8a46a', '#c9b47a']);
    let g = '';
    g += person(Object.assign({}, SOLDADO, { x: 80, y: 740, s: .72, legs: 'walk', face: 'determined', look: .6, armR: { a: 14, item: ITEM.spear(220) }, armL: { a: 20, item: ITEM.shield(24) } }));
    g += person(Object.assign({}, SOLDADO, { x: 180, y: 744, s: .72, legs: 'walk', face: 'determined', look: .6, tunic: '#8a6a4a', armR: { a: 14, item: ITEM.spear(220) }, armL: { a: 20, item: ITEM.shield(24, '#b98340') } }));
    g += tocador(SACERDOTE, { x: 300, y: 744, s: .72, legs: 'walk' });
    g += tocador(SACERDOTE2, { x: 400, y: 744, s: .72, legs: 'walk' });
    g += levaArca(560, 744, .62);
    g += person(Object.assign({}, POVO[0], { x: 720, y: 740, s: .7, legs: 'walk', face: 'smile', look: .6 }));
    s += `<g data-k="marcha"><g class="act">${g}<rect class="hit" x="20" y="520" width="760" height="240" fill="#000" fill-opacity="0"/></g></g>`;
    return s;
  },
  setup(api) {
    let dia = 0;
    api.tap(api.q('marcha'), 'Povo a marchar', async () => {
      if (api.st.busy) return;
      api.st.busy = true;
      dia = dia % 6 + 1;
      api.snd('trumpet');
      api.burst(350, 560, 'note', 3);
      await api.anim(api.act(api.q('marcha')), [{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(420px)', opacity: 0, offset: .45 }, { transform: 'translateX(-420px)', opacity: 0, offset: .55 }, { transform: 'translateX(0px)', opacity: 1 }], { duration: 2000 });
      api.badge(400, 130, String(dia), { key: 'dia' });
      api.bubble(400, 90, trf('Dia {n}', { n: dia }), { key: 'd', size: 30, plain: true, dur: 1200 });
      api.st.busy = false;
      if (dia === 6 && !api.st.n) { api.st.n = true; api.nudgeNext(1800); }
    });
  }
});

/* =====================================================================
   6 — O SÉTIMO DIA
   ===================================================================== */
SCENES.push({
  key: 'setimo', title: 'O sétimo dia', ref: 'Josué 6.15-16', tint: 'gold',
  text: [
    'No sétimo dia, acordaram muito cedinho. E deram sete voltas à cidade!',
    'Na sétima volta, os sacerdotes tocaram as trombetas, e Josué disse:',
    { q: 'Gritem! O Senhor deu-vos a cidade!', who: 'davi' }
  ],
  fact: 'Sete voltas num só dia: era uma caminhada muito comprida!',
  hint: 'Toca nas trombetas sete vezes.',
  alt: 'Ao nascer do sol, sacerdotes tocam trombetas de chifre diante das muralhas. Josué levanta o braço. Um contador mostra as voltas, de uma a sete.',
  cue: [250, 520],
  art() {
    let s = sky('sky', [[0, '#7aa4d8'], [.5, '#f7c48a'], [.75, '#fde2b8'], [1, '#fdf0e2']]);
    s += sun(660, 330, 44, { face: true });
    s += hill([[-40, 330], [300, 316], [840, 326]], '#d9b98a');
    s += muralha({ top: 270, bot: 470, n: 5, towers: [160, 640], gate: 400 });
    s += `<rect x="-40" y="470" width="900" height="400" fill="#ead7aa"/>`;
    s += `<g data-k="trombetas"><g class="act">${tocador(SACERDOTE, { x: 160, y: 760, s: .92 })}${tocador(SACERDOTE2, { x: 330, y: 770, s: .92 })}${hitC(250, 560, 150)}</g></g>`;
    s += josue({ x: 600, y: 770, s: 1.04, flip: true, face: 'determined', look: .4, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 40 }, k: 'josue' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('trombetas'), 'Trombetas', () => {
      if (n >= 7) { api.snd('trumpet'); api.burst(250, 500, 'note', 4); return; }
      n++;
      api.snd('trumpet');
      api.burst(250, 500, 'note', 3);
      api.badge(400, 130, String(n), { key: 'volta' });
      if (n === 7) {
        api.later(() => {
          const j = api.q('josue');
          api.anim(api.part(j, 'armR'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-110deg)' }], { duration: 400, fill: 'forwards' });
          api.snd('fanfare');
          api.bubble(600, 450, 'Gritem! O Senhor deu-vos a cidade!', { key: 'j', dur: 3200 });
          api.nudgeNext(3200);
        }, 700);
      }
    });
    api.tap(api.q('josue'), 'Josué', () => { api.snd('hm'); if (n < 7) api.bubble(600, 450, trf('Faltam {n} voltas!', { n: 7 - n }), { key: 'j' }); });
  }
});

/* =====================================================================
   7 — AS MURALHAS CAÍRAM!
   ===================================================================== */
SCENES.push({
  key: 'caiu', title: 'As muralhas caíram!', ref: 'Josué 6.20', tint: 'rose',
  text: [
    'O povo deu um grito muito forte: «Aaaah!»',
    'E as muralhas de Jericó caíram! CRASH! Deus deu a vitória ao seu povo.'
  ],
  fact: 'Ninguém empurrou as muralhas: foi Deus que as fez cair!',
  hint: 'Toca no povo para gritar.',
  alt: 'O povo grita com os braços no ar, os sacerdotes tocam as trombetas e as grandes muralhas de Jericó desabam numa nuvem de pó.',
  cue: [400, 640],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 38 });
    s += hill([[-40, 320], [300, 300], [840, 312]], '#d9c08e');
    s += muralha({ top: 220, bot: 480, n: 6, gate: false, cracks: true });
    s += `<rect x="-40" y="480" width="900" height="400" fill="#ead7aa"/>`;
    s += tocador(SACERDOTE, { x: 90, y: 720, s: .8 }) + tocador(SACERDOTE2, { x: 710, y: 720, s: .8, flip: true });
    s += `<g data-k="povo"><g class="act">${crowdJ([[220, 760, .82], [330, 780, .9], [450, 776, .86], [560, 760, .82], [280, 690, .66], [500, 690, .66]], '', { faces: ['laugh', 'shout', 'laugh'], armL: { a: 160, b: -20 }, armR: { a: 160, b: -20 } })}${hitC(390, 600, 220)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('povo'), 'Povo a gritar', async () => {
      if (api.st.caiu) { api.snd('crowd'); api.hop(api.q('povo'), 10); api.burst(400, 520, 'confetti', 12); return; }
      api.st.caiu = true;
      api.snd('crowd');
      api.hop(api.q('povo'), 16);
      api.bubble(400, 470, 'Aaaah!', { key: 'g', size: 40, plain: true, dur: 1200 });
      await api.wait(500);
      api.snd('boom');
      api.shake(12);
      const pr = [];
      for (let i = 0; i < 6; i++) {
        const el = api.act(api.q('m' + i)), dir = i < 3 ? -1 : 1;
        pr.push(api.anim(el, [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: `translate(${dir * 10}px,${60 + i * 6}px) rotate(${dir * (8 + i * 3)}deg)`, opacity: 1, offset: .6 }, { transform: `translate(${dir * 18}px,${170}px) rotate(${dir * (14 + i * 4)}deg)`, opacity: .0 }], { duration: 1100 + i * 90, easing: 'ease-in', fill: 'forwards', delay: i * 110 }));
        api.later(() => { api.burst(-40 + (i + .5) * 146.7, 470, 'dust', 6); api.snd('stomp'); }, 600 + i * 110);
      }
      api.anim(api.q('casas'), [{ transform: 'translateY(0px)', opacity: .95 }, { transform: 'translateY(140px)', opacity: 0 }], { duration: 1300, easing: 'ease-in', fill: 'forwards', delay: 300 });
      await Promise.all(pr);
      api.snd('victory');
      api.burst(400, 420, 'confetti', 18);
      api.bubble(400, 260, 'As muralhas caíram!', { key: 'v', dur: 2600 });
      api.nudgeNext(2800);
    });
  }
});

/* =====================================================================
   8 — RAABE FOI SALVA
   ===================================================================== */
SCENES.push({
  key: 'salva', title: 'Raabe foi salva', ref: 'Josué 6.22-25', tint: 'meadow',
  text: [
    'Josué lembrou-se da promessa. Os dois espiões foram buscar Raabe e toda a família dela.',
    'Ninguém da casa da corda vermelha se magoou. Raabe passou a viver com o povo de Deus.'
  ],
  fact: 'Muitos anos depois, Jesus nasceu da família de Raabe!',
  hint: 'Toca na Raabe e na família dela.',
  alt: 'Raabe, com a corda vermelha na mão, sai com a família, guiada pelos dois espiões. Josué recebe-os de braços abertos. Atrás, as muralhas caídas.',
  cue: [330, 540],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 38 });
    s += hill([[-40, 380], [300, 360], [840, 372]], '#d9c08e');
    s += `<g opacity=".95">${[[60, 420, -12], [170, 440, 8], [300, 410, -6], [430, 440, 10], [560, 420, -8], [690, 438, 6], [790, 412, -10]].map(([x, y, r]) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-56" y="-24" width="112" height="48" rx="6" fill="#e2c497" stroke="${OL}" stroke-width="3"/><path d="M-30,-24 L-30,24 M8,-24 L8,24" stroke="#d3b07c" stroke-width="5"/></g>`).join('')}</g>`;
    s += `<rect x="470" y="400" width="180" height="80" fill="#e2c497" stroke="${OL}" stroke-width="3.4"/><g fill="#d3b07c" opacity=".75"><rect x="478" y="408" width="48" height="26" rx="3"/><rect x="534" y="408" width="48" height="26" rx="3"/><rect x="590" y="408" width="48" height="26" rx="3"/><rect x="504" y="440" width="48" height="26" rx="3"/><rect x="560" y="440" width="48" height="26" rx="3"/></g>`;
    s += casaRaabe(560, 400, { corda: false });
    s += `<rect x="-40" y="470" width="900" height="400" fill="#e9d9a6"/>` + flowerBand(2201, 700, 790, 8);
    s += person(Object.assign({}, ESPIOES[0], { x: 110, y: 760, s: .9, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 60, b: -20 } }));
    s += raabe({ x: 280, y: 770, s: 1, face: 'joy', look: .6, armL: { a: 30, item: `<g transform="rotate(20)">${stroke2('M0,0 C-10,20 10,40 -4,60', 5, '#d7333f', 2.2)}</g>` }, armR: { a: 40, b: -20 }, k: 'raabe' });
    s += `<g data-k="familia"><g class="act">${person(Object.assign({}, POVO[4], { x: 420, y: 760, s: .9, face: 'smile', look: .6 }))}${person(Object.assign({}, POVO[3], { x: 380, y: 790, s: .82, face: 'joy', look: .6 }))}${person(Object.assign({}, POVO[5], { x: 480, y: 794, s: .78, face: 'joy', look: .6 }))}${hitC(430, 680, 90)}</g></g>`;
    s += josue({ x: 660, y: 770, s: 1.04, flip: true, face: 'joy', look: .5, armL: { a: 70, b: -20 }, armR: { a: 70, b: -20 }, k: 'josue' });
    return s;
  },
  setup(api) {
    api.tap(api.q('raabe'), 'Raabe', () => { api.snd('heart'); api.burst(280, 520, 'heart', 5); api.bubble(280, 470, 'Obrigada, Deus do céu!', { key: 'r' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('familia'), 'Família de Raabe', () => { api.snd('laugh'); api.hop(api.q('familia'), 12); api.bubble(430, 540, 'Estamos salvos!', { key: 'f' }); });
    api.tap(api.q('josue'), 'Josué', () => { api.snd('hello'); api.bubble(650, 470, 'Bem-vindos ao povo de Deus!', { key: 'j' }); });
  }
});

/* =====================================================================
   9 — DEUS É FIEL
   ===================================================================== */
SCENES.push({
  key: 'fiel', title: 'Deus é fiel', ref: 'Josué 21.45; 24.15', tint: 'gold',
  text: [
    'Deus cumpriu tudo o que tinha prometido. O povo ganhou uma terra boa para viver.',
    'Já velhinho, Josué disse:',
    { q: 'Eu e a minha família vamos servir ao Senhor!', who: 'davi' }
  ],
  fact: 'Nenhuma das promessas de Deus falhou. Nenhuma!',
  hint: 'Toca no Josué e nas crianças.',
  alt: 'Ao pôr do sol, Josué, já velhinho, fala com famílias sentadas à frente das tendas. As crianças ouvem com atenção.',
  cue: [250, 520],
  art() {
    let s = sky('sky', [[0, '#e88a5a'], [.45, '#f7c48a'], [.75, '#fde2b8'], [1, '#fdf0e2']]);
    s += sun(640, 380, 46, { face: true });
    s += hill([[-40, 420], [200, 396], [440, 414], [660, 390], [840, 406]], '#a9b86a') + hill([[-40, 500], [260, 480], [520, 494], [840, 474]], '#98ae5c');
    s += tendas([[520, 520, 150, 100], [700, 506, 130, 90]]);
    s += olive(90, 520, .8);
    s += `<rect x="-40" y="560" width="900" height="300" fill="#b8c477"/>` + flowerBand(2301, 740, 790, 7);
    s += person(Object.assign({}, JOSUE_VELHO, { x: 240, y: 760, s: 1.04, face: 'joy', look: .6, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 110, b: -40 }, k: 'josue' }));
    const SIT = { legs: 'sit', drop: 30, hemY: -62 };
    s += person(Object.assign({}, POVO[0], SIT, { x: 470, y: 760, s: .8, face: 'smile', look: -.6 }));
    s += person(Object.assign({}, POVO[6], SIT, { x: 600, y: 770, s: .8, face: 'smile', look: -.6 }));
    s += person(Object.assign({}, POVO[1], { legs: 'sit', x: 410, y: 790, s: .8, face: 'joy', look: -.6, k: 'c0' }));
    s += person(Object.assign({}, POVO[3], { legs: 'sit', x: 540, y: 800, s: .8, face: 'grin', look: -.6, k: 'c1' }));
    s += person(Object.assign({}, POVO[5], { legs: 'sit', x: 680, y: 800, s: .78, face: 'joy', look: -.6, k: 'c2' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('josue'), 'Josué', () => { api.snd('hello'); api.bubble(240, 440, 'Deus cumpriu todas as promessas!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    const FALAS = [N('Nós também vamos servir a Deus!'), N('Deus é fiel!'), N('Obrigado, Senhor!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('c' + i), 'Criança', () => { const [x, y, sc] = api.pos(api.q('c' + i)); api.snd('laugh'); api.hop(api.q('c' + i), 12); api.bubble(x, y - 170 * sc, FALAS[i], { key: 'c', size: 26 }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre as pedras caídas das muralhas de Jericó; uma ovelhinha dorme perto de uma tenda.',
  cue: [430, 160],
  questions: [
    ['Quem guiou o povo depois de Moisés?', 'Josué.'],
    ['Quem escondeu os espiões?', 'Raabe, a da corda vermelha.'],
    ['Quantas voltas deram à cidade no sétimo dia?', 'Sete!'],
    ['O que aconteceu quando o povo gritou?', 'As muralhas caíram!'],
    ['O que Deus disse a Josué?', '«Sê forte e corajoso!»']
  ],
  verse: ['Sê forte e corajoso! O Senhor, teu Deus, está contigo por onde quer que andares.', 'Josué 1.9'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(2401, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += `<g opacity=".85">${[[520, 640, -10], [610, 660, 8], [700, 636, -4], [650, 610, 14]].map(([x, y, r]) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-44" y="-18" width="88" height="36" rx="5" fill="#8a8aa0" stroke="${OL}" stroke-width="3"/></g>`).join('')}</g>`;
    s += tent(180, 700, 160, 110, { fill: '#9a9ab4', stripe: '#6a6a8a' });
    s += sheep({ x: 330, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(350, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'josue',
  title: 'Josué e as Muralhas de Jericó',
  cover: { kicker: 'Uma história da Bíblia', title: 'Josué', small: 'e as Muralhas de Jericó', sub: 'Com Deus, somos corajosos' },
  color: '#b5602f',
  ref: 'Josué 1 a 6',
  scenes: SCENES
});
})();
