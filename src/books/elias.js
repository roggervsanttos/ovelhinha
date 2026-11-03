/* =====================================================================
   LIVRO: ELIAS E O FOGO DO CÉU  (1 Reis 17 e 18)
   ===================================================================== */
(() => {
const SCENES = [];
const ELIAS = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', hairStyle: 'long', beard: 'bushy', beardCol: '#3a2520', tunic: '#b79a6a', stripes: '#8a6a44', cloak: '#7a5636', cloakTrim: '#5a3d24', belt: '#3a2a20', shoe: '#5a3f28' };
const ACABE = { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'crown', tunic: '#b6312f', cloak: '#5a1f2e', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' };
const PROFETAS = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'long', beardCol: '#2b1d17', head: 'cloth', clothCol: '#e0662e', bandCol: '#7a2a1a', tunic: '#d9643f', belt: '#7a2a1a', trim: '#f2c14e' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', head: 'cloth', clothCol: '#b6312f', bandCol: '#f2c14e', tunic: '#c7502f', belt: '#f2c14e' },
  { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'cloth', clothCol: '#f08a3a', bandCol: '#7a2a1a', tunic: '#e07a3a', belt: '#7a2a1a' }
];
const VIUVA = { kind: 'adult', skin: '#d39463', head: 'scarf', clothCol: '#6b6b7a', hairStyle: 'long', hair: '#2b1d17', tunic: '#9a9ab0', belt: '#4a4a5a' };
const FILHO = { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#c9a87a', belt: '#7b4a2a' };
const AJUDANTE = { kind: 'child', skin: '#c98a5a', hairStyle: 'short', hair: '#2b1d17', tunic: '#5e9a43', belt: '#7b4a2a' };
const AGUADEIRO = { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#e9c46a', bandCol: '#3f6fb5', tunic: '#3f6fb5', belt: '#e9c46a' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' }
];
const elias = o => person(Object.assign({}, ELIAS, o));
const SIT = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
function rachas(seed, y0, y1, n = 8) {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = r1(20 + R() * 760), y = r1(y0 + R() * (y1 - y0)), w = 30 + R() * 40;
    s += `<path d="M${x},${y} l${r1(w * .3)},${r1(-6 - R() * 6)} l${r1(w * .3)},${r1(8 + R() * 4)} l${r1(w * .4)},${r1(-4 - R() * 6)} M${r1(x + w * .3)},${r1(y - 6)} l4,14" stroke="#b08a52" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }
  return s;
}
// terra seca: céu quente, colinas castanhas e chão rachado
function terraSeca(o = {}) {
  let s = bgDay(Object.assign({ sunX: 640, sunY: 120, sunR: 52, clouds: false, sky: [[0, '#f3b96a'], [.55, '#fbe0a8'], [1, '#fdf0d4']] }, o.day || {}));
  const y0 = o.y0 ?? 470;
  s += hill([[-40, y0 - 50], [200, y0 - 74], [440, y0 - 54], [660, y0 - 82], [840, y0 - 62]], o.far || '#d1ab72');
  s += `<rect x="-40" y="${y0}" width="900" height="500" fill="${o.chao || '#e2c08a'}"/>`;
  s += rachas(o.seed || 11, y0 + 30, 790, o.n ?? 9);
  return s;
}
// o monte Carmelo: o alto do monte, com o mar lá ao fundo
function carmelo(o = {}) {
  let s = o.sky ?? bgDay(Object.assign({ sunX: 650, sunY: 120, sunR: 46, clouds: false, sky: [[0, '#f1c27a'], [.5, '#fbe3b4'], [1, '#fdf2da']] }, o.day || {}));
  s += `<rect x="-40" y="360" width="900" height="80" fill="${o.mar || '#6fb0cf'}"/><g stroke="#bfe3f7" stroke-width="3" stroke-linecap="round" opacity=".7">${[[60, 380], [240, 400], [420, 376], [600, 396], [740, 382]].map(([a, b]) => `<path d="M${a},${b} q10,-5 20,0"/>`).join('')}</g>`;
  s += hill([[-40, 430], [160, 404], [380, 420], [600, 398], [840, 416]], o.far || '#b9a274');
  s += hill([[-40, 520], [240, 488], [520, 500], [840, 480]], o.chao || '#d8bd88');
  if (o.rachas !== false) s += rachas(o.seed || 21, 560, 790, 7);
  return s;
}
// pequena pilha de lenha
function lenha(y = 0) {
  let g = '';
  for (const [x, yy, w] of [[-44, 0, 96], [40, 0, 90], [-2, -16, 104], [-30, -32, 80], [30, -32, 70]]) g += `<rect x="${x - w / 2}" y="${y + yy - 14}" width="${w}" height="16" rx="8" fill="#9a6a3a" stroke="${OL}" stroke-width="2.6"/><ellipse cx="${x + w / 2 - 6}" cy="${y + yy - 6}" rx="5" ry="6.4" fill="#d9b27a" stroke="${OL}" stroke-width="2"/>`;
  return g;
}
// altar de doze pedras (5 + 4 + 3), com lenha e, se quiser, uma vala à volta
function altarPedras(x, y, s = 1, o = {}) {
  let g = '';
  if (o.vala) g += `<ellipse cx="0" cy="8" rx="160" ry="30" fill="#7a5a3a" stroke="${OL}" stroke-width="3"/><g data-k="agua" opacity="${o.agua ?? 0}"><ellipse cx="0" cy="10" rx="150" ry="23" fill="#4f9fd0"/><path d="M-110,8 q12,-6 24,0 M30,14 q12,-6 24,0 M90,4 q10,-5 20,0" stroke="#bfe3f7" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  const cols = ['#b9b1a6', '#c7bfb3', '#aaa296'];
  for (const [n, yy] of [[5, 0], [4, -32], [3, -64]]) for (let i = 0; i < n; i++) {
    const cx = (i - (n - 1) / 2) * 48;
    g += `<rect x="${cx - 23}" y="${yy - 32}" width="46" height="32" rx="10" fill="${cols[(i + n) % 3]}" stroke="${OL}" stroke-width="3"/><path d="M${cx - 12},${yy - 24} q10,-5 20,0" stroke="#e2dcd2" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  if (o.lenha !== false) g += lenha(-98);
  if (o.molhado) g += `<g data-k="molhado" opacity="${o.molhado === true ? 0 : o.molhado}"><path d="M-70,-112 L70,-112 L60,-146 L-60,-146 Z" fill="#3f7fb0" opacity=".35"/>${[-50, -10, 34].map(dx => `<path d="M${dx},-104 c3,6 3,10 0,12 c-3,-2 -3,-6 0,-12 Z" fill="#7fc4ee" stroke="${OL}" stroke-width="1.4"/>`).join('')}</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}>${g}${o.k ? hitC(0, -70, 110) : ''}</g>`;
}
// chamas grandes em cima do altar
function chamas(x, y, s = 1, k = 'chamas', o = {}) {
  const fl = (sc, col, dx = 0) => `<path transform="translate(${dx},0) scale(${sc})" d="M0,-74 C18,-44 32,-22 23,-4 C14,10 -14,10 -23,-4 C-32,-22 -14,-44 0,-74 Z" fill="${col}"/>`;
  return `<defs>${rg('fogoglow', [[0, '#ffb24a', .75], [.45, '#ff8f2e', .25], [1, '#ff7a1a', 0]])}</defs><g transform="translate(${x},${y}) scale(${s})" data-k="${k}"${o.hidden ? ' opacity="0"' : ''}><ellipse cx="0" cy="-70" rx="230" ry="170" fill="${UR('fogoglow')}"/><g class="flicker">${fl(1.7, '#ff6a1a', -52)}${fl(2.2, '#ff8a2a', 0)}${fl(1.6, '#ff6a1a', 54)}${fl(1.3, '#ffb238', -22)}${fl(1.4, '#ffd27a', 20)}${fl(.75, '#fff1a8', 0)}</g>${[0, 1, 2, 3].map(i => `<circle class="rise" style="--d:${1.6 + i * .4}s;--dx:${(i - 1.5) * 18}px;${dl(3)}" cx="0" cy="-120" r="4" fill="#ffd27a"/>`).join('')}</g>`;
}
// coluna de fogo a cair do céu
function fogoCeu(x, y0, y1, k = 'raio', o = {}) {
  return `<defs>${lg('fogoc', [[0, '#fff6c8', 0], [.25, '#ffe28a', .85], [1, '#ff8a2a', 1]])}</defs><g data-k="${k}" style="transform-origin:${x}px ${y0}px"${o.hidden ? ' opacity="0"' : ''}><path d="M${x - 40},${y0} L${x + 40},${y0} L${x + 96},${y1} L${x - 96},${y1} Z" fill="${UR('fogoc')}"/><path d="M${x - 14},${y0} L${x + 14},${y0} L${x + 40},${y1} L${x - 40},${y1} Z" fill="#fff6c8" opacity=".8"/></g>`;
}
// o ídolo Baal: uma estátua dourada que não vê nem ouve
function idolo(x, y, s = 1, k = '') {
  let g = `<rect x="-50" y="-40" width="100" height="40" fill="#a8957b" stroke="${OL}" stroke-width="3"/><rect x="-58" y="-52" width="116" height="14" fill="#c7b59b" stroke="${OL}" stroke-width="3"/>`;
  g += `<path d="M-30,-52 L-24,-150 Q0,-160 24,-150 L30,-52 Z" fill="#e0a72e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  g += `<path d="M-24,-140 L-40,-96 L-30,-92 L-18,-120 Z M24,-140 L40,-96 L30,-92 L18,-120 Z" fill="#e0a72e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  g += `<path d="M-20,-192 C-40,-206 -44,-230 -34,-244 C-30,-226 -20,-212 -8,-204 Z M20,-192 C40,-206 44,-230 34,-244 C30,-226 20,-212 8,-204 Z" fill="#f2d27a" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`;
  g += `<circle cx="0" cy="-180" r="26" fill="#e0a72e" stroke="${OL}" stroke-width="3"/><path d="M-13,-184 L-5,-184 M5,-184 L13,-184 M-8,-168 L8,-168" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>`;
  g += `<path d="M-14,-142 L-10,-62" stroke="#f6d36a" stroke-width="5" opacity=".7"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -130, 70) : ''}</g></g>`;
}
// corvo (com pão no bico)
function corvo(x, y, s = 1, o = {}) {
  let g = `<path d="M-30,4 L-60,16 L-56,-2 Z" fill="#26262e" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`;
  g += `<ellipse cx="-4" cy="0" rx="32" ry="20" fill="#2f2f3a" stroke="${OL}" stroke-width="3"/><circle cx="26" cy="-12" r="15" fill="#2f2f3a" stroke="${OL}" stroke-width="3"/>`;
  g += `<path d="M38,-17 L60,-10 L38,-5 Z" fill="#6a6a78" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="30" cy="-15" r="3.6" fill="#fff"/><circle cx="31" cy="-15" r="1.9" fill="${OL}"/>`;
  if (o.pao) g += `<g data-k="${o.pao}"><ellipse cx="64" cy="-8" rx="14" ry="10" fill="#e0a85a" stroke="${OL}" stroke-width="2.4"/><path d="M57,-11 q5,-4 10,0" stroke="#b97a3a" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
  g += `<g transform="translate(-6,-8)"><g class="flapw" style="${dl(1)}"><path d="M0,0 C-8,-26 -30,-40 -48,-40 C-38,-26 -26,-10 -14,6 Z" fill="#3a3a46" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${g}${o.k ? hitC(10, -6, 60) : ''}</g></g>`;
}
function pao(x, y, s = 1, k = '', o = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}${o.hidden ? ' opacity="0"' : ''}><ellipse cx="0" cy="-10" rx="22" ry="14" fill="#e0a85a" stroke="${OL}" stroke-width="2.6"/><path d="M-10,-16 q5,-5 10,0 M2,-14 q5,-5 10,0" stroke="#b97a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
}
function carne(x, y, s = 1, k = '', o = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}${o.hidden ? ' opacity="0"' : ''}><path d="M-22,-8 C-26,-24 -6,-30 8,-22 C18,-16 18,-4 8,0 C-4,4 -18,6 -22,-8 Z" fill="#b8573a" stroke="${OL}" stroke-width="2.6"/><path d="M8,-10 L26,-14" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M8,-10 L26,-14" stroke="#f4efe6" stroke-width="5" stroke-linecap="round"/><path d="M-12,-14 q6,-4 12,0" stroke="#e08a6a" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
}
// o ribeiro de Querite, entre rochas
function ribeiro() {
  let s = bgDay({ sunX: 650, sunY: 110, sunR: 40, clouds: false, sky: [[0, '#9fd3ef'], [.6, '#e3f1ec'], [1, '#f3ecd8']] });
  s += hill([[-40, 360], [120, 290], [260, 350], [400, 320], [560, 372], [700, 290], [840, 330]], '#b39a74');
  s += hill([[-40, 470], [200, 432], [420, 462], [640, 424], [840, 452]], '#c7ad84');
  s += `<rect x="-40" y="520" width="900" height="400" fill="#d6c196"/>`;
  s += `<path d="M-40,646 C150,616 300,686 460,656 C620,626 700,676 840,656 L840,712 C700,732 620,682 460,712 C300,742 150,672 -40,702 Z" fill="#5fa8d3" stroke="${OL}" stroke-width="3"/>`;
  s += `<g stroke="#d6eefa" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".9">${[[40, 670], [200, 676], [380, 690], [560, 668], [720, 684]].map(([a, b]) => `<path class="drift" style="--dx:26px;--d:2.6s;${dl(3)}" d="M${a},${b} q10,-6 20,0 q10,6 20,0"/>`).join('')}</g>`;
  s += rock(80, 560, 120, 70) + rock(520, 570, 90, 50) + rock(700, 590, 140, 80) + rock(120, 790, 160, 60) + rock(640, 800, 130, 50);
  s += tuft(470, 600, 1.1) + tuft(760, 760, 1.1) + tuft(40, 620, 1) + flower(560, 776, .9, '#f2c14e');
  return s;
}
// pote de farinha e bilha de azeite
function pote(x, y, s = 1, k = '') {
  const g = `<path d="M-30,-70 L30,-70 L26,-58 C48,-48 52,-18 38,0 L-38,0 C-52,-18 -48,-48 -26,-58 Z" fill="#c9773f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-70" rx="30" ry="8" fill="#fbf6ea" stroke="${OL}" stroke-width="3"/><path d="M-40,-36 Q0,-24 40,-36" stroke="#a85a2a" stroke-width="4" fill="none"/><path d="M-24,-50 Q-30,-30 -24,-12" stroke="#e09a62" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -36, 52) : ''}</g></g>`;
}
function bilha(x, y, s = 1, k = '') {
  const g = `<path d="M12,-62 C38,-64 38,-30 22,-24" stroke="${OL}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M12,-62 C38,-64 38,-30 22,-24" stroke="#d9a33a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-10,-80 L10,-80 L8,-64 C30,-56 34,-24 22,0 L-22,0 C-34,-24 -30,-56 -8,-64 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-80" rx="11" ry="4" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/><path d="M-14,-44 Q-18,-26 -12,-10" stroke="#f2cf6a" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -40, 48) : ''}</g></g>`;
}
// cântaro de água (inclinado, a deitar água)
function cantaro(x, y, s = 1, k = '', rot = 0) {
  const g = `<g transform="rotate(${rot})"><path d="M-12,-74 L12,-74 L10,-60 C40,-50 44,-14 26,0 L-26,0 C-44,-14 -40,-50 -10,-60 Z" fill="#c46a3a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-74" rx="13" ry="5" fill="#4f9fd0" stroke="${OL}" stroke-width="2.4"/><path d="M-30,-30 Q0,-20 30,-30" stroke="#a04f2a" stroke-width="4" fill="none"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -36, 56) : ''}</g></g>`;
}
function casinha(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="0" y="-250" width="330" height="250" fill="#ead2a6" stroke="${OL}" stroke-width="3.4"/><rect x="-10" y="-262" width="350" height="16" rx="4" fill="#cdb084" stroke="${OL}" stroke-width="3"/><path d="M110,0 L110,-150 A50,50 0 0 1 210,-150 L210,0 Z" fill="#6b4a33" stroke="${OL}" stroke-width="3"/><rect x="250" y="-200" width="50" height="44" rx="6" fill="#5a3a26" stroke="${OL}" stroke-width="3"/><path d="M20,-60 L80,-60 M30,-120 L70,-120" stroke="#d6bb8a" stroke-width="4"/></g>`;
}
function nuvenzinha(x, y, k) {
  return `<g transform="translate(${x},${y})" data-k="${k}" opacity="0"><g class="act">${blob([[-14, 2, 9], [0, -5, 12], [14, 2, 9]], '#f4f6fb', 2.4)}${hitC(0, 0, 50)}</g></g>`;
}
function nuvensChuva(k = 'nuvens') {
  const sets = [[110, 120, 1.25], [330, 90, 1.4], [560, 120, 1.3], [760, 100, 1.2], [220, 220, 1], [480, 210, 1.1], [680, 230, .95]];
  return `<g data-k="${k}" opacity="0">${sets.map(([x, y, s], i) => `<g transform="translate(${x},${y}) scale(${s})"><g class="drift" style="--dx:${i % 2 ? -22 : 24}px;--d:${9 + i}s;${dl(9)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#7d84a0', 0)}${blob([[-22, -24, 18], [18, -20, 16]], '#959bb4', 0)}</g></g>`).join('')}</g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Elias e o Fogo do Céu',
  alt: 'No alto do monte Carmelo, cai fogo do céu sobre um altar de pedras. À frente, o profeta Elias levanta os braços, contente.',
  cue: [270, 820],
  art() {
    let s = sky('sky', [[0, '#e9884a'], [.4, '#f7c27a'], [.75, '#fde6bd'], [1, '#fde6bd']], 1100);
    s += `<rect x="-40" y="640" width="900" height="70" fill="#7ab4cc"/>`;
    s += hill([[-40, 700], [200, 676], [420, 694], [640, 666], [840, 686]], '#b9a274');
    s += hill([[-40, 860], [260, 830], [540, 844], [840, 822]], '#d8bd88');
    s += fogoCeu(530, -60, 800, 'raio');
    s += altarPedras(530, 968, 1.35, { lenha: true });
    s += chamas(530, 806, 1.25, 'chamas');
    s += `<rect x="-40" y="1000" width="900" height="200" fill="#d8bd88"/>`;
    s += elias({ x: 250, y: 1060, s: 1.2, face: 'joy', look: .4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'elias' });
    return s;
  },
  setup(api) {
    api.tap(api.q('elias'), 'Elias', () => { api.snd('fanfare'); api.hop(api.q('elias'), 16); api.bubble(250, 700, 'O Senhor é Deus!', { key: 'e' }); });
    api.tap(api.q('chamas'), 'Fogo', () => { api.snd('boom'); api.burst(530, 720, 'spark', 10, { col: '#ffb238' }); });
  }
});

/* =====================================================================
   1 — NÃO VAI CHOVER
   ===================================================================== */
SCENES.push({
  key: 'seca', title: 'Não vai chover!', ref: '1 Reis 16.30-33; 17.1', tint: 'sand',
  text: [
    'O rei Acabe não amava a Deus. Ele e muita gente adoravam uma estátua chamada Baal.',
    'Então, Deus mandou o profeta Elias dizer ao rei:',
    { q: 'Não vai cair chuva nenhuma, até Deus mandar!', who: 'davi' }
  ],
  fact: 'Baal era só uma estátua feita por pessoas: não via, não ouvia e não podia ajudar ninguém.',
  hint: 'Toca no Elias, no rei e na estátua.',
  alt: 'No palácio, o rei Acabe, de coroa, está zangado. Atrás dele há uma estátua dourada de Baal. O profeta Elias aponta para o céu.',
  cue: [220, 560],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#ecd6aa"/><rect x="-40" y="-40" width="900" height="110" fill="#b6312f" opacity=".85"/><path d="M-40,70 L840,70" stroke="#f2c14e" stroke-width="10"/>`;
    s += `<g opacity=".5">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${40 + i * 150},90 L${40 + i * 150},600" stroke="#d9bd8a" stroke-width="40"/>`).join('')}</g>`;
    s += column(70, 110, 600, 62) + column(470, 110, 600, 62);
    s += `<rect x="-40" y="600" width="900" height="300" fill="#b98a55"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/><g stroke="#a3784a" stroke-width="3">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${i * 130},600 L${i * 160 - 120},820"/>`).join('')}</g>`;
    s += idolo(690, 600, 1, 'idolo');
    s += person(Object.assign({}, ACABE, { x: 560, y: 760, s: 1.05, flip: true, face: 'angry', look: .4, armL: { a: 20 }, armR: { a: 40, b: -60 }, k: 'rei' }));
    s += elias({ x: 220, y: 760, s: 1.05, face: 'determined', look: .5, armL: { a: 14 }, armR: { a: 165, b: -10 }, k: 'elias' });
    return s;
  },
  setup(api) {
    api.tap(api.q('elias'), 'Elias', () => { api.snd('hm'); api.bubble(240, 430, 'Não vai chover!', { key: 'e' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('rei'), 'Rei Acabe', () => { api.snd('grunt'); api.shakeHead(api.q('rei')); api.bubble(560, 430, 'Hmpf! Não acredito!', { key: 'r' }); });
    api.tap(api.q('idolo'), 'Estátua de Baal', () => { api.snd('bonk'); api.bubble(690, 330, '...', { key: 'i', size: 36, plain: true, dur: 1200 }); });
  }
});

/* =====================================================================
   2 — OS CORVOS TRAZEM COMIDA
   ===================================================================== */
SCENES.push({
  key: 'corvos', title: 'Os corvos trazem comida', ref: '1 Reis 17.2-6', tint: 'meadow',
  text: [
    'Deus mandou o Elias esconder-se junto a um ribeiro chamado Querite.',
    'O Elias bebia a água do ribeiro. E, de manhã e à tarde, uns corvos traziam-lhe pão e carne!'
  ],
  fact: 'Foi Deus que mandou os corvos levar comida ao Elias. Deus cuida de nós!',
  hint: 'Toca nos corvos para levarem comida ao Elias.',
  alt: 'O Elias está sentado numa pedra junto a um pequeno ribeiro. Dois corvos pretos voam até ele com pão no bico.',
  cue: [600, 230],
  art() {
    let s = ribeiro();
    s += rock(250, 612, 180, 50, { fill: '#b9ab94', shade: '#9d8f78' });
    s += elias({ x: 250, y: 600, s: .92, ...SIT, face: 'smile', look: .6, armL: { a: 30, b: 40 }, armR: { a: 60, b: -10 }, k: 'elias' });
    s += rock(390, 620, 110, 34, { fill: '#c9bba4', shade: '#ad9f88' });
    s += pao(360, 594, .9, 'f0', { hidden: true }) + carne(410, 596, .9, 'f1', { hidden: true }) + pao(388, 580, .8, 'f2', { hidden: true }) + carne(352, 578, .8, 'f3', { hidden: true });
    s += corvo(600, 220, .95, { k: 'c0', flip: true, pao: 'p0' });
    s += corvo(700, 330, .85, { k: 'c1', flip: true, pao: 'p1' });
    return s;
  },
  setup(api) {
    let n = 0;
    const POS = [[600, 220, .95], [700, 330, .85]];
    for (let i = 0; i < 2; i++) {
      const el = api.q('c' + i);
      api.tap(el, 'Corvo', async () => {
        if (api.st['v' + i]) return;
        api.st['v' + i] = true;
        api.snd('flip');
        const [x, y, sc] = POS[i], TX = 390, TY = 520;
        const tx = r1((TX - x) / -sc), ty = r1((TY - y) / sc);
        await api.anim(api.act(el), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${tx}px,${ty}px)` }], { duration: 1000, easing: 'ease-in-out', fill: 'forwards' });
        api.q('p' + i).setAttribute('opacity', '0');
        if (n < 4) {
          const f = api.q('f' + n);
          api.anim(f, [{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 400, fill: 'forwards' });
          n++;
        }
        api.snd('plip');
        if (n === 1) api.bubble(250, 330, 'Obrigado, Deus!', { key: 'e' });
        await api.anim(api.act(el), [{ transform: `translate(${tx}px,${ty}px)` }, { transform: 'translate(0px,0px)' }], { duration: 1000, easing: 'ease-in-out', fill: 'forwards' });
        api.q('p' + i).setAttribute('opacity', '1');
        api.st['v' + i] = false;
        if (n === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(1800); }
      });
    }
    api.tap(api.q('elias'), 'Elias', () => { api.snd('hello'); api.bubble(250, 330, 'Deus cuida de mim!', { key: 'e' }); });
  }
});

/* =====================================================================
   3 — A FARINHA QUE NÃO ACABAVA
   ===================================================================== */
SCENES.push({
  key: 'viuva', title: 'A farinha que não acabava', ref: '1 Reis 17.8-16', tint: 'rose',
  text: [
    'Depois, Deus mandou o Elias a casa de uma viúva pobre. Ela só tinha um bocadinho de farinha e de azeite.',
    'Mesmo assim, ela partilhou com o Elias. E, até voltar a chover, a farinha e o azeite nunca acabaram!'
  ],
  fact: 'A viúva vivia com o filho numa terra chamada Sarepta.',
  hint: 'Toca no pote e na bilha para fazer pão.',
  alt: 'À porta de uma casinha, uma viúva e o filho estão com o Elias. No chão há um pote de farinha, uma bilha de azeite e um prato com pães.',
  cue: [380, 680],
  art() {
    let s = terraSeca({ y0: 520, n: 5, seed: 31 });
    s += town(40, 470, .9, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' });
    s += casinha(460, 600, 1);
    s += person(Object.assign({}, VIUVA, { x: 150, y: 750, s: 1.02, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 40, b: -20 }, k: 'viuva' }));
    s += person(Object.assign({}, FILHO, { x: 250, y: 760, s: .8, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 30 }, k: 'filho' }));
    s += elias({ x: 650, y: 750, s: 1, flip: true, face: 'joy', look: .5, armL: { a: 14, item: ITEM.staff(220, -1) }, armR: { a: 50, b: -20 }, k: 'elias' });
    s += pote(370, 700, 1, 'pote');
    s += bilha(470, 704, .95, 'bilha');
    s += `<ellipse cx="420" cy="758" rx="96" ry="18" fill="#e9dcc0" stroke="${OL}" stroke-width="3"/>`;
    const P = [[372, 760], [410, 764], [448, 760], [486, 756], [392, 746], [430, 748]];
    P.forEach(([x, y], i) => s += pao(x, y, .8, 'pao' + i, { hidden: true }));
    return s;
  },
  setup(api) {
    let n = 0;
    const faz = (k, x, y) => {
      api.hop(api.q(k), 8);
      if (k === 'pote') { api.snd('swish'); api.burst(x, y, 'dust', 4); }
      else { api.snd('pour'); api.drop(x + 4, y, 420, 744, '#f2c230'); }
      if (n < 6) {
        api.anim(api.q('pao' + n), [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 360, fill: 'forwards' });
        n++;
        if (n === 3) { api.bubble(150, 430, 'A farinha nunca acaba!', { key: 'v' }); api.nudgeNext(2600); }
        if (n === 6) api.bubble(250, 520, 'Que bom!', { key: 'f' });
      } else api.burst(420, 730, 'heart', 3);
    };
    api.tap(api.q('pote'), 'Pote de farinha', () => faz('pote', 370, 624));
    api.tap(api.q('bilha'), 'Bilha de azeite', () => faz('bilha', 470, 624));
    api.tap(api.q('viuva'), 'A viúva', () => { api.snd('hello'); api.bubble(150, 430, 'Obrigada, Deus!', { key: 'v' }); });
    api.tap(api.q('filho'), 'O filho da viúva', () => { api.snd('laugh'); api.hop(api.q('filho'), 12); api.bubble(250, 520, 'Que bom!', { key: 'f' }); });
    api.tap(api.q('elias'), 'Elias', () => { api.snd('hello'); api.bubble(640, 440, 'Deus cuida de nós!', { key: 'e' }); });
  }
});

/* =====================================================================
   4 — O DESAFIO NO MONTE CARMELO
   ===================================================================== */
SCENES.push({
  key: 'desafio', title: 'O desafio no monte Carmelo', ref: '1 Reis 18.19-24', tint: 'gold',
  text: [
    'Passaram três anos sem chuva. Então, o Elias chamou o povo e os profetas de Baal ao monte Carmelo.',
    'Fizeram dois altares com lenha, mas sem fogo. E o Elias disse:',
    { q: 'O Deus que responder com fogo é o verdadeiro Deus!', who: 'davi' }
  ],
  fact: 'Os profetas de Baal eram 450. O Elias estava sozinho, mas Deus estava com ele!',
  hint: 'Toca no Elias, nos profetas e no povo.',
  alt: 'No alto do monte Carmelo há dois altares de pedra com lenha. À esquerda estão os profetas de Baal, à direita o Elias. Ao meio, o povo observa.',
  cue: [690, 520],
  art() {
    let s = carmelo({});
    s += altarPedras(190, 610, .72);
    s += altarPedras(600, 610, .72);
    const PV = [[360, 640, 2], [420, 652, 1], [470, 638, 4]];
    PV.forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: POVO[p].kind === 'adult' ? .66 : .7, face: 'o', look: i % 2 ? .3 : -.3, armL: { a: 14 }, armR: { a: 20 }, k: 'pv' + i })));
    s += person(Object.assign({}, PROFETAS[0], { x: 70, y: 780, s: .86, face: 'grin', look: .5, armL: { a: 20 }, armR: { a: 60, b: -20 }, k: 'pr0' }));
    s += person(Object.assign({}, PROFETAS[1], { x: 190, y: 800, s: .82, face: 'grin', look: .5, armL: { a: 14 }, armR: { a: 20 }, k: 'pr1' }));
    s += person(Object.assign({}, PROFETAS[2], { x: 310, y: 784, s: .86, face: 'grin', look: .5, armL: { a: 30 }, armR: { a: 14 }, k: 'pr2' }));
    s += elias({ x: 690, y: 770, s: 1.02, flip: true, face: 'determined', look: .4, armL: { a: 14 }, armR: { a: 165, b: -10 }, k: 'elias' });
    return s;
  },
  setup(api) {
    api.tap(api.q('elias'), 'Elias', () => { api.snd('hm'); api.bubble(670, 440, 'Quem responder com fogo é o verdadeiro Deus!', { key: 'e' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
    for (let i = 0; i < 3; i++) api.tap(api.q('pr' + i), 'Profeta de Baal', () => { const [x, y, sc] = api.pos(api.q('pr' + i)); api.snd('grunt'); api.hop(api.q('pr' + i), 10); api.bubble(x, y - 270 * sc, 'Baal vai ganhar!', { key: 'p' }); });
    for (let i = 0; i < 3; i++) api.tap(api.q('pv' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('pv' + i)); api.snd('hm'); api.hop(api.q('pv' + i), 8); api.bubble(x, y - 260 * sc, 'Vamos ver!', { key: 'v', size: 26 }); });
  }
});

/* =====================================================================
   5 — BAAL NÃO RESPONDE
   ===================================================================== */
SCENES.push({
  key: 'baal', title: 'Baal não responde', ref: '1 Reis 18.26-29', tint: 'sand',
  text: [
    'Os profetas de Baal gritaram e dançaram à volta do altar, desde a manhã até à tarde: «Ó Baal, responde-nos!»',
    'Mas não aconteceu nada. Nenhuma voz, nenhuma resposta, nenhum fogo!'
  ],
  fact: 'O Elias até brincou: «Gritem mais alto! Talvez Baal esteja a dormir!»',
  hint: 'Toca nos profetas de Baal.',
  alt: 'Os profetas de Baal saltam e gritam à volta do seu altar, mas a lenha continua apagada. O Elias espera, sentado numa pedra.',
  cue: [300, 560],
  art() {
    let s = carmelo({ day: { sun: false } });
    s += `<g data-k="sol">${sun(130, 150, 42, { face: true, k: 'sol0' })}</g>`;
    s += altarPedras(330, 600, .85);
    s += rock(700, 724, 160, 50, { fill: '#c9bba4', shade: '#ad9f88' });
    s += elias({ x: 700, y: 712, s: .92, ...SIT, flip: true, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'elias' });
    const P = [[120, 770, .95], [330, 800, .86], [530, 770, .95]];
    P.forEach(([x, y, sc], i) => s += person(Object.assign({}, PROFETAS[i], { x, y, s: sc, face: 'shout', look: i === 2 ? -.4 : .4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, legs: i === 1 ? 'wide' : 'hop', k: 'pr' + i })));
    return s;
  },
  setup(api) {
    let n = 0;
    const GRITOS = [N('Ó Baal, responde!'), N('Baal, ouve-nos!'), N('Manda fogo, Baal!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('pr' + i), 'Profeta de Baal', async () => {
      if (api.st.busy) return;
      api.st.busy = true;
      const [x, y, sc] = api.pos(api.q('pr' + i));
      api.snd('drum'); api.hop(api.q('pr' + i), 22);
      api.bubble(x, y - 280 * sc, GRITOS[i], { key: 'p' });
      if (n < 4) { n++; api.anim(api.q('sol'), [{ transform: `translateX(${(n - 1) * 130}px)` }, { transform: `translateX(${n * 130}px)` }], { duration: 900, fill: 'forwards', easing: 'ease-in-out' }); }
      await api.wait(1200);
      api.snd('hm');
      api.bubble(330, 400, '...', { key: 'nada', size: 40, plain: true, dur: 1200 });
      await api.wait(600);
      api.st.busy = false;
      if (n === 3) { api.bubble(670, 440, 'Gritem mais alto! Talvez ele esteja a dormir!', { key: 'e', dur: 3200 }); api.nudgeNext(3200); }
    });
    api.tap(api.q('elias'), 'Elias', () => { api.snd('laugh'); api.bubble(670, 440, 'Gritem mais alto! Talvez ele esteja a dormir!', { key: 'e', dur: 3200 }); });
  }
});

/* =====================================================================
   6 — ÁGUA POR CIMA DO ALTAR
   ===================================================================== */
SCENES.push({
  key: 'agua', title: 'Água por cima do altar', ref: '1 Reis 18.30-35', tint: 'water',
  text: [
    'Então, o Elias fez um altar com doze pedras e cavou uma vala à volta.',
    'Depois, mandou deitar água por cima da lenha. Uma vez, duas vezes, três vezes! Ficou tudo encharcado!'
  ],
  fact: 'As doze pedras eram uma por cada tribo do povo de Israel.',
  hint: 'Toca no cântaro três vezes para deitar água.',
  alt: 'O Elias está ao lado do seu altar de doze pedras. Um homem despeja um cântaro de água por cima da lenha, e a vala à volta enche-se de água.',
  cue: [560, 420],
  art() {
    let s = carmelo({});
    s += altarPedras(400, 690, 1.1, { vala: true, molhado: true, k: 'altar' });
    s += person(Object.assign({}, AGUADEIRO, { x: 620, y: 760, s: 1, flip: true, face: 'smile', look: .4, armL: { a: 150, b: -40 }, armR: { a: 130, b: -30 }, k: 'homem' }));
    s += cantaro(548, 500, 1, 'cantaro', -110);
    s += elias({ x: 160, y: 770, s: 1.04, face: 'smile', look: .5, armL: { a: 30 }, armR: { a: 70, b: -10 }, k: 'elias' });
    return s;
  },
  setup(api) {
    let n = 0;
    const deita = async () => {
      if (n >= 3 || api.st.busy) { api.snd('plip'); return; }
      api.st.busy = true;
      n++;
      api.snd('pour');
      api.badge(400, 110, String(n), { key: 'n' });
      api.anim(api.act(api.q('cantaro')), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-14deg)', offset: .3 }, { transform: 'rotate(-14deg)', offset: .7 }, { transform: 'rotate(0deg)' }], { duration: 1200 });
      for (let k = 0; k < 6; k++) { api.drop(484 - k * 4, 520, 350 + k * 18, 566, '#7fc4ee'); await api.wait(110); }
      api.anim(api.q('agua'), [{ opacity: (n - 1) / 3 }, { opacity: n / 3 }], { duration: 500, fill: 'forwards' });
      api.anim(api.q('molhado'), [{ opacity: (n - 1) / 3 }, { opacity: n / 3 }], { duration: 500, fill: 'forwards' });
      api.burst(400, 690, 'ripple', 2);
      await api.wait(400);
      api.st.busy = false;
      if (n === 3) { api.bubble(170, 440, 'Agora está tudo molhado!', { key: 'e' }); api.nudgeNext(2600); }
    };
    api.tap(api.q('cantaro'), 'Cântaro de água', deita);
    api.tap(api.q('homem'), 'Homem com o cântaro', deita);
    api.tap(api.q('elias'), 'Elias', () => { api.snd('hm'); api.bubble(170, 440, n < 3 ? 'Mais água!' : 'Agora está tudo molhado!', { key: 'e' }); });
  }
});

/* =====================================================================
   7 — FOGO DO CÉU
   ===================================================================== */
SCENES.push({
  key: 'fogo', title: 'Fogo do céu!', ref: '1 Reis 18.36-39', tint: 'gold',
  text: [
    'O Elias orou: «Senhor, mostra hoje que Tu és Deus!» E logo caiu fogo do céu! Queimou a lenha, as pedras e até a água!',
    'O povo ajoelhou-se e gritou:',
    { q: 'O Senhor é Deus! O Senhor é Deus!', who: 'davi' }
  ],
  fact: 'O Elias fez uma oração curtinha, e Deus respondeu logo!',
  hint: 'Toca no Elias para ele orar.',
  alt: 'Do céu cai uma grande chama sobre o altar do Elias, que arde com força. O Elias levanta os braços e o povo ajoelha-se.',
  cue: [170, 560],
  art() {
    let s = carmelo({});
    s += `<rect data-k="escuro" x="-40" y="-40" width="900" height="900" fill="#fff1c4" opacity="0"/>`;
    s += altarPedras(370, 690, 1.05, { vala: true, agua: 1, molhado: 1 });
    s += fogoCeu(370, -60, 600, 'raio', { hidden: true });
    s += chamas(370, 594, 1.05, 'chamas', { hidden: true });
    s += elias({ x: 160, y: 770, s: 1.04, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'elias' });
    const PV = [[590, 760, 0], [690, 766, 2], [630, 800, 1], [740, 800, 3]];
    s += `<g data-k="pe">${PV.map(([x, y, p]) => person(Object.assign({}, POVO[p], { x, y, s: POVO[p].kind === 'adult' ? .8 : .84, face: 'o', look: -.5, armL: { a: 20 }, armR: { a: 30 } }))).join('')}</g>`;
    s += `<g data-k="joelhos" opacity="0" style="pointer-events:none">${PV.map(([x, y, p]) => person(Object.assign({}, POVO[p], { x, y, s: POVO[p].kind === 'adult' ? .8 : .84, legs: 'kneel', hemY: POVO[p].kind === 'adult' ? -62 : null, face: 'joy', look: -.5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } }))).join('')}</g>`;
    s += `<rect class="hit" data-k="povo" x="540" y="560" width="280" height="250" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    const fogo = async () => {
      if (api.st.feito) { api.snd('crackle'); api.burst(370, 520, 'spark', 8, { col: '#ffb238' }); return; }
      api.st.feito = true;
      api.snd('choir', ['C4', 'G4', 'C5']);
      api.bubble(170, 400, 'Senhor, mostra que Tu és Deus!', { key: 'e' });
      await api.wait(1400);
      api.snd('boom');
      api.anim(api.q('escuro'), [{ opacity: 0 }, { opacity: .5 }, { opacity: 0 }], { duration: 900 });
      await api.anim(api.q('raio'), [{ opacity: 0, transform: 'scaleY(.1)' }, { opacity: 1, transform: 'scaleY(1)' }], { duration: 500, fill: 'forwards', easing: 'ease-in' });
      api.snd('crackle');
      api.anim(api.q('chamas'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.anim(api.q('agua'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1400, fill: 'forwards' });
      api.anim(api.q('molhado'), [{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' });
      api.burst(370, 600, 'spark', 12, { col: '#ffb238' });
      api.burst(370, 700, 'dust', 6);
      await api.wait(700);
      api.anim(api.q('raio'), [{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' });
      api.anim(api.q('pe'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('joelhos'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('crowd');
      api.bubble(680, 450, 'O Senhor é Deus!', { key: 'p' });
      api.nudgeNext(2800);
    };
    api.tap(api.q('elias'), 'Elias', fogo);
    api.tap(api.q('chamas'), 'Fogo', fogo);
    api.tap(api.q('povo'), 'O povo', () => { if (!api.st.feito) { api.snd('hm'); api.bubble(680, 450, 'O que vai acontecer?', { key: 'p' }); return; } api.snd('crowd'); api.burst(680, 560, 'heart', 4); api.bubble(680, 450, 'O Senhor é Deus!', { key: 'p' }); });
  }
});

/* =====================================================================
   8 — UMA NUVEM PEQUENINA
   ===================================================================== */
SCENES.push({
  key: 'chuva', title: 'Uma nuvem pequenina', ref: '1 Reis 18.41-45', tint: 'water',
  text: [
    'O Elias subiu ao alto do monte e orou a pedir chuva. E mandou o ajudante olhar para o mar.',
    'Sete vezes ele foi olhar. À sétima vez, viu uma nuvem pequenina, do tamanho de uma mão. E depois... veio uma grande chuva!'
  ],
  fact: 'Depois de três anos e meio sem chuva, Deus mandou chuva outra vez, como tinha prometido.',
  hint: 'Toca no ajudante sete vezes para ele olhar para o mar.',
  alt: 'No alto do monte Carmelo, o Elias está ajoelhado a orar. O ajudante olha para o mar, onde aparece uma nuvem pequenina. Depois, começa a chover.',
  cue: [560, 560],
  art() {
    let s = carmelo({ rachas: true, seed: 41 });
    s += `<rect data-k="cinza" x="-40" y="-40" width="900" height="480" fill="#8d96b0" opacity="0"/>`;
    s += nuvensChuva('nuvens');
    s += nuvenzinha(720, 340, 'nuvem');
    s += `<g data-k="verde" opacity="0">${hill([[-40, 520], [240, 488], [520, 500], [840, 480]], '#a9c97a')}${grassBand(4101, 560, 790, 22)}${flowerBand(4102, 600, 790, 10)}</g>`;
    s += `<g data-k="ora">${elias({ x: 190, y: 760, s: 1.04, legs: 'kneel', hemY: -62, face: 'sleep', look: .3, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'elias' })}</g>`;
    s += `<g data-k="feliz" opacity="0" style="pointer-events:none">${elias({ x: 190, y: 760, s: 1.04, face: 'joy', look: .3, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })}</g>`;
    s += person(Object.assign({}, AJUDANTE, { x: 560, y: 770, s: .92, face: 'smile', look: .7, armL: { a: 14 }, armR: { a: 130, b: -110 }, k: 'ajudante' }));
    s += `<g data-k="chuva" opacity="0" style="pointer-events:none">${rainSheet({ n: 70, seed: 7 })}</g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    const chover = async () => {
      if (api.st.choveu) { api.snd('rain'); api.burst(400, 600, 'ripple', 2); return; }
      api.st.choveu = true;
      api.snd('thunder');
      api.anim(api.q('cinza'), [{ opacity: 0 }, { opacity: .55 }], { duration: 1200, fill: 'forwards' });
      await api.anim(api.q('nuvens'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, fill: 'forwards' });
      api.snd('rain');
      api.anim(api.q('chuva'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
      api.anim(api.q('verde'), [{ opacity: 0 }, { opacity: 1 }], { duration: 2200, fill: 'forwards' });
      api.anim(api.q('ora'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('feliz'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.bubble(200, 440, 'Obrigado, Senhor!', { key: 'e' });
      api.nudgeNext(3000);
    };
    api.tap(api.q('ajudante'), 'O ajudante', async () => {
      if (n >= 7) { chover(); return; }
      if (api.st.busy) return;
      api.st.busy = true;
      n++;
      api.snd('tiptoe');
      api.hop(api.q('ajudante'), 10);
      api.badge(400, 110, String(n), { key: 'n' });
      if (n < 7) api.bubble(560, 480, 'Não há nada...', { key: 'a', dur: 1000 });
      else {
        api.snd('chime', 'G6');
        await api.anim(api.q('nuvem'), [{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 600, fill: 'forwards' });
        api.bubble(560, 480, 'Uma nuvem pequenina!', { key: 'a', dur: 2000 });
      }
      await api.wait(500);
      api.st.busy = false;
    });
    api.tap(api.q('nuvem'), 'Nuvem pequenina', () => { if (n >= 7) chover(); });
    api.tap(api.q('elias'), 'Elias', () => { api.snd('hm'); api.bubble(200, 440, 'Senhor, manda chuva!', { key: 'e' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o monte Carmelo. Junto a um pequeno altar de pedras, uma ovelhinha dorme na erva molhada.',
  cue: [430, 160],
  questions: [
    ['Quem levava comida ao Elias junto ao ribeiro?', 'Os corvos!'],
    ['O que nunca acabou em casa da viúva?', 'A farinha e o azeite.'],
    ['Quantas pedras usou o Elias para fazer o altar?', 'Doze pedras.'],
    ['Quem respondeu com fogo: Baal ou Deus?', 'Deus! Baal era só uma estátua.'],
    ['O que viu o ajudante à sétima vez?', 'Uma nuvem pequenina, do tamanho de uma mão.']
  ],
  verse: ['O Senhor é Deus! O Senhor é Deus!', '1 Reis 18.39'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(3101, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [160, 520], [360, 548], [560, 500], [840, 540]], '#29475a') + hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 670]], '#2c584f');
    s += `<g opacity=".8">${altarPedras(560, 690, .55, { lenha: false })}</g>`;
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
  id: 'elias',
  title: 'Elias e o Fogo do Céu',
  cover: { kicker: 'Uma história da Bíblia', title: 'Elias', small: 'e o Fogo do Céu', sub: 'Só o Senhor é Deus' },
  color: '#c2412d',
  ref: '1 Reis 17 e 18',
  scenes: SCENES
});
})();
