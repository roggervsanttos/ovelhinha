/* =====================================================================
   LIVRO: OS TRÊS AMIGOS NA FORNALHA  (Daniel 3)
   ===================================================================== */
(() => {
const SCENES = [];
const AMIGOS = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', hairStyle: 'short', beard: 'short', beardCol: '#2b1d17', head: 'cloth', clothCol: '#d9433b', bandCol: '#f2c14e', tunic: '#d9433b', stripes: '#f2a09a', belt: '#f2c14e' },
  { kind: 'adult', skin: '#d39463', hair: '#3a2520', hairStyle: 'short', head: 'cloth', clothCol: '#3f6fb5', bandCol: '#f2c14e', tunic: '#3f6fb5', stripes: '#9cb0e0', belt: '#f2c14e' },
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', hairStyle: 'short', beard: 'short', beardCol: '#1f1612', head: 'cloth', clothCol: '#3a9a4a', bandCol: '#f2c14e', tunic: '#3a9a4a', stripes: '#9ad0a0', belt: '#f2c14e' }
];
const NOMES = [N('Sadraque'), N('Mesaque'), N('Abede-Nego')];
const NABUCO = { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', beard: 'long', beardCol: '#2b1d17', head: 'crown', tunic: '#c7502f', cloak: '#6a2a7a', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' };
const SOLDADO = { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'bushy', beardCol: '#2b1d17', head: 'helmetP', tunic: '#7a3a3a', belt: '#3a2a20', shoe: '#4a3226' };
const ANJO = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', trim: '#f2c14e' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'bushy', beardCol: '#1f1612', head: 'cloth', clothCol: '#5e7d4a', bandCol: '#f2c14e', tunic: '#e9c46a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#8a5fc2', belt: '#f2c14e' },
  { kind: 'adult', skin: '#d39463', hair: '#3a2520', beard: 'long', beardCol: '#3a2520', head: 'cloth', clothCol: '#2f6db5', bandCol: '#f2c14e', tunic: '#5e9a43', belt: '#f2c14e' }
];
const amigo = (i, o) => person(Object.assign({}, AMIGOS[i], o));
const rei = o => person(Object.assign({}, NABUCO, o));
const CETRO = `<path d="M0,40 L0,-150" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M0,40 L0,-150" stroke="#fbe08a" stroke-width="6" stroke-linecap="round"/><circle cy="-158" r="13" fill="#fbe08a" stroke="${OL}" stroke-width="3"/>`;
const CORDA = `<path d="M-36,-150 L36,-150 M-38,-128 L38,-128" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M-36,-150 L36,-150 M-38,-128 L38,-128" stroke="#c9a06a" stroke-width="5" stroke-linecap="round"/>`;

/* ---------- peças desta história ---------- */
// muralha azul da Babilônia, com leões dourados
function leaozinho(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="#f2c14e" opacity=".9"><ellipse cx="0" cy="0" rx="26" ry="11"/><circle cx="26" cy="-8" r="11"/><path d="M-20,6 L-22,20 M-8,8 L-8,20 M10,8 L10,20 M20,6 L22,20" stroke="#f2c14e" stroke-width="5" stroke-linecap="round"/><path d="M-26,-2 Q-40,-10 -36,-20" stroke="#f2c14e" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
}
function babilonia(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 42, clouds: false, sky: [[0, '#8ccbed'], [.6, '#d6eef5'], [1, '#f6ead2']] }, o.day || {}));
  s += palm(60, 470, 1.1) + palm(760, 480, 1.2);
  const top = o.top ?? 250, bot = o.bot ?? 560;
  s += `<g>${[...Array(16)].map((_, i) => `<rect x="${-40 + i * 56}" y="${top - 30}" width="34" height="34" fill="#2f5fa8" stroke="${OL}" stroke-width="3"/>`).join('')}</g>`;
  s += `<rect x="-40" y="${top}" width="900" height="${bot - top}" fill="#2f5fa8" stroke="${OL}" stroke-width="3.4"/>`;
  s += `<g stroke="#244c8a" stroke-width="2.4" opacity=".7">${[...Array(Math.floor((bot - top) / 26))].map((_, r) => `<path d="M-40,${top + 26 * (r + 1)} L840,${top + 26 * (r + 1)}"/>`).join('')}</g>`;
  s += `<rect x="-40" y="${top + 24}" width="900" height="10" fill="#f2c14e" opacity=".8"/><rect x="-40" y="${bot - 34}" width="900" height="10" fill="#f2c14e" opacity=".8"/>`;
  for (const [x, y, f] of [[90, top + 110, 1], [230, top + 190, -1], [580, top + 110, 1], [720, top + 190, -1]]) s += `<g transform="translate(${x},${y}) scale(${f},1)">${leaozinho(0, 0, 1.3)}</g>`;
  if (o.gate !== false) s += `<path d="M330,${bot} L330,${top + 110} A70,70 0 0 1 470,${top + 110} L470,${bot} Z" fill="#6b4a33" stroke="${OL}" stroke-width="3.6"/><path d="M322,${top + 110} A78,78 0 0 1 478,${top + 110}" stroke="#f2c14e" stroke-width="10" fill="none"/>`;
  s += `<rect x="-40" y="${bot}" width="900" height="400" fill="${o.chao || '#e8d4a8'}"/><path d="M-40,${bot} L840,${bot}" stroke="${OL}" stroke-width="3"/>`;
  return s;
}
// a planície de Dura, com a cidade ao longe
function dura(o = {}) {
  let s = bgDay(Object.assign({ sunX: 680, sunY: 110, sunR: 42, sky: [[0, '#8ccbed'], [.6, '#d6eef5'], [1, '#f6ead2']] }, o.day || {}));
  s += hill([[-40, 440], [200, 424], [440, 436], [660, 418], [840, 430]], '#d9c08e');
  s += town(560, 430, .8, { wall: '#c9d6e8', shade: '#9fb3d1', roof: '#b9c8de' }) + town(20, 436, .7, { wall: '#c9d6e8', shade: '#9fb3d1', roof: '#b9c8de' });
  s += palm(250, 450, .7) + palm(520, 446, .6);
  s += `<rect x="-40" y="470" width="900" height="400" fill="${o.chao || '#ead7aa'}"/>`;
  return s;
}
// a grande estátua de ouro do rei, em cima de um pedestal
function estatua(x, y, s = 1, k = '') {
  let g = `<rect x="-90" y="-60" width="180" height="60" fill="#c7b59b" stroke="${OL}" stroke-width="3.4"/><rect x="-70" y="-110" width="140" height="52" fill="#ddd0b8" stroke="${OL}" stroke-width="3.4"/>`;
  g += person(Object.assign({}, NABUCO, { y: -110, s: 1.25, skin: '#e0a72e', hair: '#c98a1c', beardCol: '#c98a1c', tunic: '#f0bf45', cloak: '#d99a1c', cloakTrim: '#fbe08a', trim: '#fbe08a', belt: '#fbe08a', shoe: '#c98a1c', browCol: '#a8701a', blush: false, cls: '', face: 'determined', armL: { a: 12 }, armR: { a: 40, b: -60, item: CETRO } }));
  g += `<path d="M-30,-300 L-24,-160" stroke="#fff3c4" stroke-width="7" opacity=".5" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -260, 110) : ''}</g></g>`;
}
// a fornalha: forno grande de tijolo com a boca a arder; "dentro" vai desenhado dentro da boca
function forno(x, y, s = 1, o = {}) {
  const tag = o.tag || 'f';
  const body = 'M-180,0 L-180,-210 Q-180,-340 0,-340 Q180,-340 180,-210 L180,0 Z';
  const mouth = 'M-96,0 L-96,-120 A96,96 0 0 1 96,-120 L96,0 Z';
  let g = `<defs><clipPath id="${ID('fb' + tag)}"><path d="${body}"/></clipPath><clipPath id="${ID('fm' + tag)}"><path d="${mouth}"/></clipPath>${rg('fogo' + tag, [[0, '#fff3b0'], [.5, '#ffb238'], [1, '#e8561f']], .5, .7, .7)}</defs>`;
  g += `<g transform="translate(70,-330)"><rect x="-26" y="-70" width="52" height="80" fill="#9a4a2e" stroke="${OL}" stroke-width="3"/>${[0, 1, 2].map(i => `<circle class="rise" style="--d:${3 + i}s;--dx:${(i - 1) * 16}px;${dl(4)}" cx="0" cy="-80" r="${16 - i * 3}" fill="#a9a29a" opacity=".7"/>`).join('')}</g>`;
  g += `<path d="${body}" fill="#b5603a" stroke="${OL}" stroke-width="4"/>`;
  g += `<g clip-path="${UR('fb' + tag)}" stroke="#93492b" stroke-width="3" opacity=".8">${[...Array(12)].map((_, r) => `<path d="M-200,${-28 * (r + 1)} L200,${-28 * (r + 1)}"/>${[...Array(8)].map((_, c) => `<path d="M${-190 + c * 54 + (r % 2) * 27},${-28 * (r + 1)} l0,28"/>`).join('')}`).join('')}</g>`;
  g += `<path d="M-120,0 L-120,-126 A120,120 0 0 1 120,-126 L120,0" fill="none" stroke="#8a3f24" stroke-width="20"/>`;
  g += `<path d="${mouth}" fill="${UR('fogo' + tag)}" stroke="${OL}" stroke-width="3.4"/>`;
  g += `<g clip-path="${UR('fm' + tag)}">`;
  g += `<g data-k="lume" style="transform-origin:0px 0px"><g class="flicker">${[-70, -30, 10, 50, 80].map((dx, i) => `<path transform="translate(${dx},0) scale(${1.1 + (i % 2) * .4})" d="M0,-74 C18,-44 32,-22 23,-4 C14,10 -14,10 -23,-4 C-32,-22 -14,-44 0,-74 Z" fill="${['#ff8a2a', '#ffb238', '#ff6a1a', '#ffd27a', '#ff8a2a'][i]}"/>`).join('')}</g></g>`;
  if (o.dentro) g += o.dentro;
  g += `<g opacity="${o.dentro ? .45 : .75}"><g class="flicker" style="${dl(1)}">${[-80, -10, 60].map(dx => `<path transform="translate(${dx},4) scale(${o.dentro ? .5 : .9})" d="M0,-60 C14,-36 24,-18 18,-4 C11,8 -11,8 -18,-4 C-24,-18 -14,-36 0,-60 Z" fill="#ffd27a"/>`).join('')}</g></g>`;
  g += `</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}>${g}${o.k ? hitC(0, -110, 120) : ''}</g>`;
}
function anjo(o) {
  return person(Object.assign({}, ANJO, { backItems: `<circle cx="0" cy="-120" r="140" fill="#fff6c8" opacity=".55"/><circle cx="0" cy="-120" r="90" fill="#fffbe6" opacity=".6"/>`, face: 'joy' }, o));
}
function salao(o = {}) {
  const fy = o.floor ?? 600;
  let s = `<rect x="-40" y="-40" width="900" height="${fy + 40}" fill="#e9d7b4"/>`;
  s += `<rect x="-40" y="-40" width="900" height="100" fill="#2f5fa8"/><g>${[...Array(9)].map((_, i) => leaozinho(10 + i * 100, 20, .9)).join('')}</g><rect x="-40" y="56" width="900" height="12" fill="#c9a54e"/>`;
  const col = x => `<rect x="${x - 24}" y="120" width="48" height="${fy - 120}" fill="#f4ead2" stroke="${OL}" stroke-width="3"/><g stroke="#c9b48a" stroke-width="3">${[-9, 0, 9].map(d => `<path d="M${x + d},130 L${x + d},${fy - 10}"/>`).join('')}</g><path d="M${x - 48},120 C${x - 48},92 ${x - 20},86 ${x},100 C${x + 20},86 ${x + 48},92 ${x + 48},120 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3"/>`;
  for (const x of o.cols || [80, 720]) s += col(x);
  s += `<rect x="-40" y="${fy}" width="900" height="${900 - fy}" fill="#c9a873"/><path d="M-40,${fy} L840,${fy}" stroke="${OL}" stroke-width="4"/>`;
  s += `<g opacity=".35" stroke="#9a7a4a" stroke-width="3">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${400 + (i - 3) * 70},${fy} L${400 + (i - 3) * 190},900"/>`).join('')}</g>`;
  return s;
}
function trono(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-62,-60 L-62,-236 Q0,-266 62,-236 L62,-60 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3.4"/><path d="M-46,-80 L-46,-218 Q0,-240 46,-218 L46,-80 Z" fill="#6a2a7a"/><rect x="-82" y="-96" width="164" height="26" rx="6" fill="#d9a33a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 68},-72 L${k * 72},-6 L${k * 58},0 L${k * 54},-72 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`;
}
// os quatro dentro do fogo (os três amigos e o anjo), escondidos até tocar
function quatroDentro(o = {}) {
  const P = [[-66, 0], [-22, 4], [22, 2], [66, 4]];
  return [3, 0, 1, 2].map(i => [P[i], i]).map(([[x, y], i]) => `<g data-k="d${i}"${o.visivel ? '' : ' opacity="0"'}>${i === 3 ? anjo({ x, y, s: .54, armL: { a: 30 }, armR: { a: 40, b: -20 }, look: -.3, legs: 'walk' }) : amigo(i, { x, y, s: .54, face: 'joy', look: .2, armL: { a: 20 }, armR: { a: 30 }, legs: 'walk' })}</g>`).join('');
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Os Três Amigos na Fornalha',
  alt: 'Uma grande fornalha a arder. Lá dentro, os três amigos passeiam no meio das chamas, contentes, com uma quarta pessoa que brilha. Ao lado, o rei olha muito espantado.',
  cue: [440, 860],
  art() {
    let s = sky('sky', [[0, '#f2a25e'], [.45, '#fbd09a'], [.8, '#fdecc8'], [1, '#fdecc8']], 1100);
    s += sun(660, 330, 46, { face: true }) + cloud(170, 290, .9);
    s += hill([[-40, 760], [200, 740], [420, 754], [640, 734], [840, 748]], '#d9c08e');
    s += `<rect x="-40" y="900" width="900" height="300" fill="#ead7aa"/>`;
    s += forno(450, 1000, 1.45, { k: 'forno', tag: 'c', dentro: quatroDentro({ visivel: true }) });
    s += rei({ x: 120, y: 1070, s: 1.05, face: 'surprise', look: .6, armL: { a: 14 }, armR: { a: 120, b: -10 }, k: 'rei' });
    return s;
  },
  setup(api) {
    api.tap(api.q('forno'), 'Fornalha', () => { api.snd('crackle'); api.burst(450, 780, 'spark', 8, { col: '#ffd27a' }); api.bubble(450, 520, 'Deus está connosco!', { key: 'f' }); });
    api.tap(api.q('rei'), 'Rei Nabucodonosor', () => { api.snd('hm'); api.bubble(160, 720, 'Estou a ver quatro!', { key: 'r' }); });
  }
});

/* =====================================================================
   1 — TRÊS AMIGOS CORAJOSOS
   ===================================================================== */
SCENES.push({
  key: 'amigos', title: 'Três amigos corajosos', ref: 'Daniel 1.6-7; 2.49', tint: 'sky',
  text: [
    'Sadraque, Mesaque e Abede-Nego eram três amigos que viviam na Babilônia, longe da sua terra.',
    'Trabalhavam para o rei, mas amavam a Deus acima de tudo.'
  ],
  fact: 'Eram amigos do Daniel, aquele que foi atirado para a cova dos leões!',
  hint: 'Toca nos três amigos.',
  alt: 'Diante das muralhas azuis da Babilônia, decoradas com leões dourados, estão três amigos: um de vermelho, um de azul e um de verde.',
  cue: [400, 560],
  art() {
    let s = babilonia({});
    for (let i = 0; i < 3; i++) s += amigo(i, { x: 250 + i * 150, y: 770 + (i === 1 ? 10 : 0), s: 1.02, face: 'joy', look: i === 0 ? .4 : i === 2 ? -.4 : 0, armL: { a: i === 1 ? 14 : 30 }, armR: { a: i === 1 ? 14 : 30 }, k: 'a' + i });
    s += flowerBand(5101, 770, 795, 6);
    return s;
  },
  setup(api) {
    let vistos = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), NOMES[i], () => {
      api.snd('hello'); api.hop(api.q('a' + i), 12);
      api.bubble(250 + i * 150, 470, trf('Eu sou o {n}!', { n: tr(NOMES[i]) }), { key: 'a' });
      if (!api.st['v' + i]) { api.st['v' + i] = true; if (++vistos === 3) api.nudgeNext(2400); }
    });
  }
});

/* =====================================================================
   2 — UMA ESTÁTUA ENORME DE OURO
   ===================================================================== */
SCENES.push({
  key: 'estatua', title: 'Uma estátua enorme de ouro', ref: 'Daniel 3.1-3', tint: 'gold',
  text: [
    'O rei Nabucodonosor mandou fazer uma estátua de ouro enorme, mais alta do que um prédio!',
    'Depois, chamou toda a gente importante do reino para a festa da estátua.'
  ],
  fact: 'A estátua era tão alta como um prédio de nove andares!',
  hint: 'Toca na estátua e no rei.',
  alt: 'Numa planície, ergue-se uma estátua de ouro gigante, em cima de um pedestal. O rei Nabucodonosor abre os braços, todo orgulhoso.',
  cue: [520, 300],
  art() {
    let s = dura({});
    s += estatua(530, 640, 1.18, 'estatua');
    s += rei({ x: 170, y: 770, s: 1.06, face: 'joy', look: .5, armL: { a: 110, b: -20 }, armR: { a: 110, b: -20 }, k: 'rei' });
    const P = [[340, 780, 0], [420, 800, 2], [690, 790, 3]];
    P.forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: .78, face: 'o', look: .4, armL: { a: 20 }, armR: { a: 30 }, k: 'p' + i })));
    return s;
  },
  setup(api) {
    api.tap(api.q('estatua'), 'Estátua de ouro', () => { api.snd('chime', 'E6'); api.burst(530, 300, 'spark', 10, { col: '#ffe08a' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('rei'), 'Rei Nabucodonosor', () => { api.snd('fanfare'); api.bubble(170, 440, 'Que estátua tão bonita! É toda de ouro!', { key: 'r' }); });
    for (let i = 0; i < 3; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('hm'); api.hop(api.q('p' + i), 8); api.bubble(x, y - 250 * sc, 'Que grande!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   3 — QUANDO A MÚSICA TOCAR
   ===================================================================== */
SCENES.push({
  key: 'musica', title: 'Quando a música tocar...', ref: 'Daniel 3.4-12', tint: 'gold',
  text: [
    'Um mensageiro gritou: «Quando ouvirem a música, todos se devem ajoelhar e adorar a estátua!»',
    'A música tocou, e toda a gente se ajoelhou... menos três!'
  ],
  fact: 'Tocavam trompas, flautas, harpas e liras, todas ao mesmo tempo!',
  hint: 'Toca nos músicos para a música começar.',
  alt: 'Diante da estátua de ouro, os músicos tocam. Toda a gente se ajoelha, menos os três amigos, que ficam de pé.',
  cue: [130, 580],
  art() {
    let s = dura({});
    s += estatua(420, 560, .82);
    const HORN = `<g transform="translate(4,-205) scale(1.15)">${ITEM.shofar()}</g>`;
    s += person(Object.assign({}, POVO[4], { x: 70, y: 770, s: .9, armR: { a: 140, b: 24 }, armL: { a: -40, b: -130 }, extra: HORN, face: 'o', look: .4, k: 'm0' }));
    s += person(Object.assign({}, POVO[3], { x: 170, y: 790, s: .9, face: 'joy', look: .4, front: `<g transform="translate(16,-112) scale(1.4)">${ITEM.lyre()}</g>`, armL: { a: -24, b: -60 }, armR: { a: -6, b: -74 }, k: 'm1' }));
    const PV = [[570, 770, 0], [650, 780, 1], [725, 770, 2], [610, 810, 3]];
    s += `<g data-k="pe">${PV.map(([x, y, p]) => person(Object.assign({}, POVO[p], { x, y, s: .84, face: 'smile', look: -.4, armL: { a: 14 }, armR: { a: 20 } }))).join('')}</g>`;
    s += `<g data-k="joelhos" opacity="0" style="pointer-events:none">${PV.map(([x, y, p]) => person(Object.assign({}, POVO[p], { x, y, s: .84, legs: 'kneel', hemY: -62, face: 'sleep', look: -.4, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } }))).join('')}</g>`;
    for (let i = 0; i < 3; i++) s += amigo(i, { x: 330 + i * 90, y: 790 + (i === 1 ? 10 : 0), s: .9, face: 'determined', look: 0, armL: { a: 14 }, armR: { a: 14 }, k: 'a' + i });
    return s;
  },
  setup(api) {
    const toca = async (k) => {
      api.snd(k === 'm0' ? 'trumpet' : 'pluck');
      const [x, y, sc] = api.pos(api.q(k));
      api.burst(x + 20, y - 230 * sc, 'note', 4);
      if (api.st.feito) return;
      api.st.feito = true;
      api.anim(api.q('pe'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      await api.anim(api.q('joelhos'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
      await api.wait(500);
      api.bubble(420, 470, 'Nós só adoramos a Deus!', { key: 'a' });
      api.nudgeNext(2800);
    };
    api.tap(api.q('m0'), 'Músico com a trompa', () => toca('m0'));
    api.tap(api.q('m1'), 'Músico com a harpa', () => toca('m1'));
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), NOMES[i], () => { api.snd('hm'); api.bubble(420, 470, api.st.feito ? 'Nós só adoramos a Deus!' : 'Vamos ver o que acontece.', { key: 'a' }); });
  }
});

/* =====================================================================
   4 — NÃO NOS VAMOS AJOELHAR
   ===================================================================== */
SCENES.push({
  key: 'coragem', title: 'Não nos vamos ajoelhar!', ref: 'Daniel 3.13-18', tint: 'rose',
  text: [
    'O rei ficou furioso: «Ajoelhem-se diante da estátua, ou vão para a fornalha de fogo!»',
    'Mas os três amigos responderam:',
    { q: 'O nosso Deus pode salvar-nos. Mas, mesmo que não salve, não vamos adorar a estátua!', who: 'davi' }
  ],
  fact: 'Os três amigos tiveram muita coragem, porque confiavam em Deus.',
  hint: 'Toca no rei e nos três amigos.',
  alt: 'No palácio, o rei Nabucodonosor aponta, furioso. Os três amigos estão de pé à frente dele, calmos e corajosos.',
  cue: [600, 520],
  art() {
    let s = salao({});
    s += trono(640, 600, 1);
    s += rei({ x: 600, y: 770, s: 1.1, flip: true, face: 'angry', look: .5, armL: { a: 20 }, armR: { a: 100, b: -10 }, k: 'rei' });
    for (let i = 0; i < 3; i++) s += amigo(i, { x: 130 + i * 120, y: 780 + (i === 1 ? 10 : 0), s: .98, face: 'determined', look: .5, armL: { a: 14 }, armR: { a: 14 }, k: 'a' + i });
    return s;
  },
  setup(api) {
    api.tap(api.q('rei'), 'Rei Nabucodonosor', () => { api.snd('grunt'); api.shakeHead(api.q('rei')); api.bubble(590, 420, 'Ajoelhem-se, ou vão para a fornalha!', { key: 'r' }); });
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), NOMES[i], () => {
      api.snd('heart'); api.burst(130 + i * 120, 560, 'heart', 3);
      api.bubble(250, 420, 'O nosso Deus pode salvar-nos!', { key: 'a' });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
  }
});

/* =====================================================================
   5 — SETE VEZES MAIS QUENTE
   ===================================================================== */
SCENES.push({
  key: 'quente', title: 'Sete vezes mais quente', ref: 'Daniel 3.19-23', tint: 'dusk',
  text: [
    'Então, o rei mandou aquecer a fornalha sete vezes mais do que o costume.',
    'Os soldados amarraram os três amigos e atiraram-nos para o meio do fogo!'
  ],
  fact: 'O fogo estava tão quente que ninguém conseguia chegar perto!',
  hint: 'Toca na fornalha e nos três amigos.',
  alt: 'Uma enorme fornalha de tijolo arde com chamas muito fortes. Ao lado, os três amigos, amarrados com cordas, esperam calmos. Um soldado guarda-os.',
  cue: [490, 620],
  art() {
    let s = sky('sky', [[0, '#d9643f'], [.5, '#f2a25e'], [1, '#fbd09a']]);
    s += hill([[-40, 470], [200, 452], [440, 466], [660, 446], [840, 460]], '#c9a06a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#e2c08a"/>`;
    s += forno(500, 760, 1.2, { k: 'forno', tag: 'q' });
    for (let i = 0; i < 3; i++) s += amigo(i, { x: 70 + i * 90, y: 780 + (i === 1 ? 10 : 0), s: .86, face: 'smile', look: .4, armL: { a: 6 }, armR: { a: 6 }, extra: CORDA, k: 'a' + i });
    s += person(Object.assign({}, SOLDADO, { x: 720, y: 780, s: .92, flip: true, face: 'frown', look: .4, armL: { a: 14, item: ITEM.spear(260) }, armR: { a: 20 }, k: 'soldado' }));
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('forno'), 'Fornalha', () => {
      api.snd('crackle');
      api.burst(500, 560, 'spark', 8, { col: '#ffb238' });
      if (n < 3) { n++; api.anim(api.q('lume'), [{ transform: `scale(${1 + (n - 1) * .18})` }, { transform: `scale(${1 + n * .18})` }], { duration: 500, fill: 'forwards' }); }
      if (n === 3 && !api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), NOMES[i], () => { api.snd('heart'); api.bubble(160, 470, 'Deus está connosco!', { key: 'a' }); });
    api.tap(api.q('soldado'), 'Soldado', () => { api.snd('grunt'); api.bubble(700, 470, 'Que calor!', { key: 's' }); });
  }
});

/* =====================================================================
   6 — QUATRO NO FOGO!
   ===================================================================== */
SCENES.push({
  key: 'quatro', title: 'Quatro no fogo!', ref: 'Daniel 3.24-25', tint: 'gold',
  text: [
    'O rei espreitou e ficou de boca aberta: «Não atirámos três homens para o fogo? Estou a ver quatro, a passear no meio das chamas!»',
    'O quarto brilhava como um anjo. Deus estava com eles!'
  ],
  fact: 'As cordas queimaram-se, mas os três amigos não!',
  hint: 'Toca na fornalha para contares quantos são.',
  alt: 'Dentro da fornalha a arder, os três amigos passeiam contentes, e uma quarta pessoa brilha ao lado deles. O rei aponta, espantado.',
  cue: [460, 600],
  art() {
    let s = sky('sky', [[0, '#d9643f'], [.5, '#f2a25e'], [1, '#fbd09a']]);
    s += hill([[-40, 470], [200, 452], [440, 466], [660, 446], [840, 460]], '#c9a06a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#e2c08a"/>`;
    s += forno(470, 780, 1.6, { k: 'forno', tag: 'x', dentro: quatroDentro({}) });
    s += rei({ x: 100, y: 790, s: 1, face: 'surprise', look: .6, armL: { a: 14 }, armR: { a: 110, b: -10 }, k: 'rei' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('forno'), 'Fornalha', async () => {
      if (n >= 4) { api.snd('choir', ['C5', 'E5', 'G5']); api.burst(570, 640, 'spark', 8, { col: '#fff3b0' }); return; }
      if (api.st.busy) return;
      api.st.busy = true;
      const el = api.q('d' + n);
      n++;
      api.snd('chime', ['C6', 'E6', 'G6', 'C7'][n - 1]);
      api.badge(700, 130, String(n), { key: 'n' });
      await api.anim(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      if (n === 4) {
        api.snd('choir', ['C4', 'G4', 'C5', 'E5']);
        api.burst(572, 650, 'spark', 10, { col: '#fff3b0' });
        api.bubble(140, 470, 'Um, dois, três... quatro! Estou a ver quatro!', { key: 'r', dur: 3000 });
        api.nudgeNext(3000);
      }
      api.st.busy = false;
    });
    api.tap(api.q('rei'), 'Rei Nabucodonosor', () => { api.snd('hm'); api.bubble(140, 470, n < 4 ? 'O que é aquilo?' : 'Estou a ver quatro!', { key: 'r' }); });
  }
});

/* =====================================================================
   7 — NEM CHEIRO A FUMO!
   ===================================================================== */
SCENES.push({
  key: 'saem', title: 'Nem cheiro a fumo!', ref: 'Daniel 3.26-27', tint: 'meadow',
  text: [
    'O rei chamou: «Saiam daí!» E os três amigos saíram do fogo.',
    'Não tinham nem um cabelo queimado. As roupas estavam perfeitas, e nem sequer cheiravam a fumo!'
  ],
  fact: 'O fogo só queimou as cordas que os prendiam. Ficaram livres!',
  hint: 'Toca nos amigos para veres se cheiram a fumo.',
  alt: 'Os três amigos saem da fornalha, sorridentes e sem uma única queimadura. O rei e os seus conselheiros olham, admirados.',
  cue: [400, 560],
  art() {
    let s = dura({ day: { clouds: false } });
    s += forno(130, 640, .8, { tag: 's' });
    for (let i = 0; i < 3; i++) s += amigo(i, { x: 280 + i * 100, y: 780 + (i === 1 ? 10 : 0), s: .98, face: 'joy', look: .3, armL: { a: 30 }, armR: { a: 30 }, legs: 'walk', k: 'a' + i });
    s += person(Object.assign({}, POVO[4], { x: 730, y: 760, s: .86, flip: true, face: 'o', look: .4, armL: { a: 20 }, armR: { a: 20 } }));
    s += rei({ x: 630, y: 772, s: 1.02, flip: true, face: 'surprise', look: .4, armL: { a: 20 }, armR: { a: 60, b: -30 }, k: 'rei' });
    return s;
  },
  setup(api) {
    let vistos = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), NOMES[i], () => {
      api.snd('shh'); api.hop(api.q('a' + i), 10);
      api.burst(280 + i * 100, 600, 'spark', 6, { col: '#ffe9a6' });
      api.bubble(280 + i * 100, 480, 'Nem cheiro a fumo!', { key: 'a' });
      if (!api.st['v' + i]) { api.st['v' + i] = true; if (++vistos === 3) api.nudgeNext(2400); }
    });
    api.tap(api.q('rei'), 'Rei Nabucodonosor', () => { api.snd('hm'); api.bubble(630, 440, 'Nem um cabelo queimado!', { key: 'r' }); });
  }
});

/* =====================================================================
   8 — O REI LOUVA A DEUS
   ===================================================================== */
SCENES.push({
  key: 'louvor', title: 'O rei louva a Deus', ref: 'Daniel 3.28-30', tint: 'gold',
  text: [
    'O rei disse: «Bendito seja o Deus destes três amigos! Nenhum outro deus consegue salvar assim!»',
    'E deu-lhes trabalhos ainda mais importantes no reino.'
  ],
  fact: 'Deus não tirou os amigos do problema, mas esteve com eles no meio do fogo.',
  hint: 'Toca no rei e nos três amigos.',
  alt: 'No palácio, o rei Nabucodonosor levanta os braços a louvar a Deus. Os três amigos, com mantos novos, sorriem.',
  cue: [610, 520],
  art() {
    let s = salao({});
    s += trono(640, 600, 1);
    s += rei({ x: 610, y: 770, s: 1.08, flip: true, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'rei' });
    for (let i = 0; i < 3; i++) s += amigo(i, { x: 130 + i * 120, y: 780 + (i === 1 ? 10 : 0), s: .98, face: 'joy', look: .5, cloak: '#f2c14e', cloakTrim: '#fbe08a', armL: { a: 30 }, armR: { a: 30 }, k: 'a' + i });
    return s;
  },
  setup(api) {
    api.tap(api.q('rei'), 'Rei Nabucodonosor', () => { api.snd('fanfare'); api.bubble(600, 420, 'Bendito seja o Deus deles!', { key: 'r' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), NOMES[i], () => { api.snd('laugh'); api.hop(api.q('a' + i), 12); api.burst(130 + i * 120, 560, 'heart', 4); api.bubble(250, 420, 'Deus é fiel!', { key: 'a' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre as muralhas da Babilônia. Uma ovelhinha dorme junto a uma palmeira.',
  cue: [430, 160],
  questions: [
    ['Como se chamavam os três amigos?', 'Sadraque, Mesaque e Abede-Nego.'],
    ['De que era feita a estátua do rei?', 'De ouro.'],
    ['Porque é que os três amigos não se ajoelharam?', 'Porque só adoravam a Deus.'],
    ['Quantas pessoas viu o rei dentro do fogo?', 'Quatro!'],
    ['Os amigos cheiravam a fumo?', 'Não! Nem um bocadinho.']
  ],
  wrong: [
    ['Pedro, Tiago e João.', 'Davi, Saul e Jónatas.', 'Gaspar, Belchior e Baltasar.'],
    ['De pedra.', 'De madeira.', 'De areia.'],
    ['Porque estavam cansados.', 'Porque não ouviram a música.', 'Porque estavam a dormir.'],
    ['Três.', 'Uma.', 'Nenhuma.'],
    ['Sim, muito!', 'Só um bocadinho.', 'Ficaram todos pretos.']
  ],
  verse: ['Quando passares pelo fogo, não te queimarás. Eu estou contigo.', 'Isaías 43.2'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(5201, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += `<g opacity=".9"><g>${[...Array(16)].map((_, i) => `<rect x="${-40 + i * 56}" y="520" width="34" height="30" fill="#1f3a6a"/>`).join('')}</g><rect x="-40" y="546" width="900" height="120" fill="#1f3a6a"/></g>`;
    s += hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 672]], '#2c584f');
    s += `<g opacity=".85">${palm(650, 700, .9)}</g>`;
    s += sheep({ x: 250, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(270, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'fornalha',
  title: 'Os Três Amigos na Fornalha',
  cover: { kicker: 'Uma história da Bíblia', title: 'Os Três Amigos', small: 'na Fornalha', sub: 'Deus está connosco no meio do fogo' },
  color: '#d9643f',
  ref: 'Daniel 3',
  scenes: SCENES
});
})();
