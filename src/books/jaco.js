/* =====================================================================
   LIVRO: JACÓ E O NOVO NOME  (Gênesis 25 a 33)
   ===================================================================== */
(() => {
const SCENES = [];
const ISAQUE = { kind: 'adult', skin: '#d9a070', hair: '#e9e5de', beard: 'long', beardCol: '#f3f0ea', browCol: '#f3f0ea', head: 'cloth', clothCol: '#efe4cc', bandCol: '#8a5a33', tunic: '#8b6a4a', stripes: '#a98a62', longSleeves: true, belt: '#efe4cc' };
const REBECA = { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#b8312f', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', longSleeves: true, belt: '#b8312f' };
const ESAU = { kind: 'adult', skin: '#d99a6c', hair: '#c0612e', hairStyle: 'curly', hi: '#e08a4a', beard: 'bushy', beardCol: '#c0612e', browCol: '#a8501f', tunic: '#7a5a3a', stripes: '#9a7a52', belt: '#4a3226' };
const JACO = { kind: 'adult', skin: '#e2a878', hair: '#3a2520', hairStyle: 'short', beard: 'short', tunic: '#3f7fb0', stripes: '#9ccbe8', belt: '#7b4a2a' };
const RAQUEL = { kind: 'adult', skin: '#e7b58a', head: 'scarf', clothCol: '#e86a9a', clothStripe: '#fff2c9', hairStyle: 'long', hair: '#2b1d17', tunic: '#f6dfb0', longSleeves: true, belt: '#b5402f' };
const HOMEM = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', trim: '#f2c14e', shoe: '#c9a54e' };
const ESAU_M = { kind: 'child', skin: '#d99a6c', hairStyle: 'curly', hair: '#c0612e', hi: '#e08a4a', tunic: '#7a5a3a', belt: '#4a3226' };
const JACO_M = { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#3a2520', tunic: '#3f7fb0', stripes: '#9ccbe8', belt: '#7b4a2a' };
const FILHOS = [
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#3a2520', tunic: '#d9643f', belt: '#7b4a2a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#5e9a43', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e7b58a', hairStyle: 'short', hair: '#5a3020', tunic: '#e9c46a', belt: '#7b4a2a' },
  { kind: 'child', skin: '#c98a5a', hairStyle: 'curly', hair: '#3a2520', hi: '#5a3020', tunic: '#8a5fc2', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e2a878', head: 'scarf', clothCol: '#e86a9a', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#e86a9a' },
  { kind: 'child', skin: '#d99a6c', hairStyle: 'short', hair: '#2b1d17', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'curly', hair: '#5a3020', hi: '#8e4b2a', tunic: '#b8312f', belt: '#7b4a2a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'short', hair: '#3a2520', tunic: '#2f8a83', belt: '#7b4a2a' }
];
const isaque = o => person(Object.assign({}, ISAQUE, o));
const rebeca = o => person(Object.assign({}, REBECA, o));
const esau = o => person(Object.assign({}, ESAU, o));
const jaco = o => person(Object.assign({}, JACO, o));
const raquel = o => person(Object.assign({}, RAQUEL, o));

/* ---------- peças desta história ---------- */
const fogoDefs = () => `<defs>${rg('hglow', [[0, '#fff6c8', .95], [.55, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs>`;
function homem(o) {
  const glow = `<circle cx="0" cy="-120" r="160" fill="${UR('hglow')}"/>`;
  return person(Object.assign({}, HOMEM, { backItems: glow }, o));
}
function wings(sc = 1) {
  const w = s => `<path transform="scale(${s},1)" d="M10,-176 C40,-210 110,-228 130,-190 C140,-172 128,-156 112,-150 C128,-140 130,-120 114,-108 C126,-96 120,-78 102,-74 C80,-70 40,-100 10,-140 Z" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  return `<g transform="scale(${sc})"><g class="flapw2" style="${dl(2)}">${w(1)}</g><g class="flapw2" style="${dl(2)}">${w(-1)}</g></g>`;
}
function anjo(o) {
  return person(Object.assign({}, HOMEM, { legs: 'none', hemY: -4, hemW: 50, backItems: `<circle cx="0" cy="-120" r="150" fill="${UR('hglow')}"/>` + wings(1), cls: 'hover' }, o));
}
function tentInside() {
  let s = `<defs>${lg('lona', [[0, '#c98a5a'], [1, '#a86a3e']])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('lona')}"/>`;
  s += `<g stroke="#8a5530" stroke-width="5" opacity=".55" fill="none">${[60, 200, 340, 480, 620, 760].map(x => `<path d="M${x},-40 Q${x + 20},300 ${x - 10},600"/>`).join('')}</g>`;
  s += `<path d="M-40,-40 L840,-40 L840,60 Q400,140 -40,60 Z" fill="#8a5530" opacity=".5"/>`;
  s += `<rect x="-40" y="600" width="900" height="300" fill="#7a5034"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/>`;
  s += `<path d="M120,640 L680,640 L740,760 L60,760 Z" fill="#b8312f" stroke="${OL}" stroke-width="3"/><path d="M140,652 L660,652 L712,748 L88,748 Z" fill="none" stroke="#f2c14e" stroke-width="4" stroke-dasharray="14 10"/>`;
  return s;
}
function lamp(x, y) {
  return `<g transform="translate(${x},${y})"><circle cx="0" cy="-20" r="80" fill="#ffd27a" opacity=".18"/><path d="M-22,0 C-22,-14 22,-14 22,0 C22,8 -22,8 -22,0 Z" fill="#c98f57" stroke="${OL}" stroke-width="3"/><path d="M18,-4 L34,-10" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><g transform="translate(32,-14)"><g class="flicker"><path d="M0,-18 C6,-10 7,-4 5,-1 C3,2 -3,2 -5,-1 C-7,-4 -6,-10 0,-18 Z" fill="#ffb238"/></g></g></g>`;
}
function babyHead(x, y, o) {
  const d = Object.assign({}, PDEF, { skin: '#f0c49c', hair: '#3a2520', hairStyle: 'short', face: 'smile', blush: true }, o);
  return `<g transform="translate(${x},${y})">${headSVG({ R: 26 }, d, 2.8)}</g>`;
}
function cradle(o = {}) {
  let g = `<path d="M-170,-40 C-170,40 170,40 170,-40 Z" fill="#c98f57" stroke="${OL}" stroke-width="4"/>`;
  g += `<g stroke="#a46e3c" stroke-width="3" fill="none">${[-130, -80, -30, 20, 70, 120].map(x => `<path d="M${x},-36 q8,30 0,58"/>`).join('')}</g>`;
  g += `<path d="M-176,-44 L176,-44" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-176,-44 L176,-44" stroke="#d9a56a" stroke-width="7" stroke-linecap="round"/>`;
  return g;
}
function cookPot(x, y, s = 1) {
  let g = campfire(0, 0, .7);
  g += `<g transform="translate(0,-56)"><path d="M-50,-40 C-56,10 -36,34 0,34 C36,34 56,10 50,-40 Z" fill="#4a4a5a" stroke="${OL}" stroke-width="4"/><ellipse cx="0" cy="-40" rx="50" ry="13" fill="#c0392b" stroke="${OL}" stroke-width="4"/><ellipse cx="-14" cy="-42" rx="9" ry="4" fill="#e5674f"/><ellipse cx="16" cy="-38" rx="7" ry="3" fill="#e5674f"/>`;
  g += [-20, 0, 20].map((dx, i) => `<path class="rise" style="--d:${2.4 + i * .5}s;--dx:${dx / 2}px;${dl(3)}" d="M${dx},-56 q-8,-14 0,-26 q8,-12 0,-24" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>`).join('');
  g += `</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="panela"><g class="act">${g}${hitC(0, -80, 70)}</g></g>`;
}
function well(x, y, s = 1) {
  let g = `<ellipse cx="0" cy="0" rx="120" ry="30" fill="#8e8a96" stroke="${OL}" stroke-width="4"/>`;
  g += `<path d="M-120,0 L-120,-70 L120,-70 L120,0 Z" fill="#b9b1a6" stroke="${OL}" stroke-width="4"/>`;
  g += `<g fill="#d8d1c6" stroke="${OL}" stroke-width="2.4">${[[-100, -50], [-50, -44], [0, -52], [50, -46], [96, -50], [-76, -20], [-24, -18], [28, -22], [80, -18]].map(([a, b]) => `<rect x="${a - 22}" y="${b - 12}" width="44" height="22" rx="6"/>`).join('')}</g>`;
  g += `<ellipse cx="0" cy="-70" rx="120" ry="30" fill="#9a928a" stroke="${OL}" stroke-width="4"/><ellipse cx="0" cy="-70" rx="92" ry="20" fill="#2f4f6a"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function trough(x, y) {
  return `<g transform="translate(${x},${y})"><path d="M-110,-40 L110,-40 L96,0 L-96,0 Z" fill="#a46e3c" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path data-k="agua" d="M-100,-34 L100,-34 L96,-24 L-96,-24 Z" fill="#5ab0de" opacity="0"/></g>`;
}
function nameBanner(x, y, txt, k, col = '#d9433b') {
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act"><path d="M-200,-34 L200,-34 L180,0 L200,34 L-200,34 L-180,0 Z" fill="${col}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><text x="0" y="16" text-anchor="middle" font-size="48" class="svgtxt" fill="#fffaf0">${tr(txt)}</text>${k ? hitC(0, 0, 110) : ''}</g></g>`;
}
function stairway() {
  let s = `<defs>${lg('degrau', [[0, '#fff6c8', .95], [1, '#ffe28a', .55]], 0, 1)}${rg('topo', [[0, '#ffffff', 1], [.4, '#fff3c4', .85], [1, '#ffe28a', 0]])}</defs>`;
  s += `<circle data-k="ceu" cx="470" cy="30" r="230" fill="${UR('topo')}"/>`;
  const n = 12;
  for (let i = 0; i < n; i++) {
    const t0 = i / n, t1 = (i + 1) / n;
    const y0 = 700 - t0 * 680, y1 = 700 - t1 * 680, w0 = 120 - t0 * 80, w1 = 120 - t1 * 80, cx0 = 560 - t0 * 90, cx1 = 560 - t1 * 90;
    s += `<path d="M${r1(cx0 - w0)},${r1(y0)} L${r1(cx0 + w0)},${r1(y0)} L${r1(cx1 + w1)},${r1(y1)} L${r1(cx1 - w1)},${r1(y1)} Z" fill="${UR('degrau')}" opacity="${(.82 - t0 * .3).toFixed(2)}"/>`;
    s += `<path d="M${r1(cx0 - w0)},${r1(y0)} L${r1(cx0 + w0)},${r1(y0)}" stroke="#fffbe8" stroke-width="3" opacity=".9"/>`;
  }
  s += `<path d="M440,700 L430,20 M680,700 L510,20" stroke="#fff3c4" stroke-width="8" stroke-linecap="round" opacity=".7"/>`;
  return s;
}
function riverNight(y, col = '#2b4a7a', foam = '#6a8ac0') {
  return `<path d="M-40,${y} C200,${y - 20} 420,${y + 20} 860,${y - 10} L860,${y + 90} C420,${y + 110} 200,${y + 70} -40,${y + 90} Z" fill="${col}" stroke="${OL}" stroke-width="3"/><path d="M60,${y + 30} C160,${y + 20} 240,${y + 40} 320,${y + 38} M480,${y + 44} C560,${y + 36} 640,${y + 54} 720,${y + 50}" stroke="${foam}" stroke-width="5" fill="none" stroke-linecap="round" class="flow" style="stroke-dasharray:30 40;--o:-140;--d:5s"/>`;
}
function herd(i) {
  if (i === 0) return goat({ x: -50, y: 0, s: .62 }) + goat({ x: 10, y: 14, s: .66, col: '#f2ead8', dark: '#cbbfa6', patch: '' }) + goat({ x: 70, y: 4, s: .6, col: '#5a4a42', dark: '#3a2e28', patch: '#8a7a6a' });
  if (i === 1) return sheep({ x: -50, y: 0, s: .62 }) + sheep({ x: 20, y: 14, s: .66, face: '#f1d2bb' }) + sheep({ x: 84, y: 2, s: .58 });
  if (i === 2) return camel({ x: 0, y: 0, s: .5, saddle: '#b8312f' }) + camel({ x: 90, y: 10, s: .44, saddle: '#3f7fb0' });
  return cow({ x: -30, y: 0, s: .46 }) + equine({ x: 70, y: 10, s: .42, kind: 'donkey', pack: '#2f8a83' });
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jacó e o Novo Nome',
  alt: 'O sol nasce sobre um rio. Jacó, de túnica azul às riscas, ergue o cajado e sorri; perto dele há ovelhas, cabras, um camelo e as tendas da família.',
  cue: [400, 860],
  art() {
    let s = sky('sky', [[0, '#5a6fb0'], [.38, '#c98aa8'], [.58, '#ffc98a'], [.75, '#ffe6b8'], [1, '#ffe6b8']], 1100);
    s += sun(560, 720, 70, { fill: '#ffb84a', fill2: '#ffcf6e', glow: '#ffe2a8', face: true });
    s += cloud(170, 520, .9, { fill: '#fff0e0', shade: '#f6cfae' }) + cloud(660, 470, .7, { fill: '#fff0e0', shade: '#f6cfae', dx: -24 });
    s += bird(250, 600, .9, { col: '#6a5a80' }) + bird(296, 626, .7, { col: '#6a5a80', d: 11 });
    s += hill([[-40, 760], [160, 732], [380, 752], [600, 726], [840, 746]], '#c8a978');
    s += tent(120, 820, 170, 130, { flag: '#3f7fb0' }) + tent(250, 800, 120, 96, { fill: '#efe0c4', stripe: '#3f7fb0' });
    s += camel({ x: 690, y: 850, s: .52, flip: true, k: 'camelo', saddle: '#b8312f' });
    s += `<g transform="translate(0,300)">${riverNight(560, '#5aa6d6', '#d6eff9')}</g>`;
    s += hill([[-40, 960], [200, 940], [420, 954], [640, 936], [840, 950]], '#b8c27a');
    s += `<g data-k="faixa">${nameBanner(400, 690, N('Israel'), '', '#d9433b')}${hitC(400, 690, 90)}</g>`;
    s += jaco({ x: 400, y: 1046, s: 1.12, face: 'joy', look: 0, armL: { a: 14, item: ITEM.staff(200, -1) }, armR: { a: 150, b: -20 }, k: 'jaco' });
    s += goat({ x: 160, y: 1060, s: .8, k: 'cabra' }) + sheep({ x: 600, y: 1070, s: .9, flip: true, k: 'ove' }) + sheep({ x: 700, y: 1060, s: .72, flip: true, face: '#f1d2bb', k: 'ove2' });
    s += flowerBand(51, 1062, 1095, 7, ['#f2c14e', '#ffffff', '#e86a9a']);
    return s;
  },
  setup(api) {
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('hello'); api.hop(api.q('jaco'), 12); api.bubble(400, 740, 'Olá! Eu sou o Jacó!', { key: 'j' }); });
    api.tap(api.q('camelo'), 'Camelo', () => { api.snd('grunt'); api.hop(api.q('camelo'), 10); });
    api.tap(api.q('faixa'), 'Nome novo: Israel', () => { api.snd('twinkle'); api.burst(400, 690, 'star', 10, { col: '#ffe08a' }); });
    api.tap(api.q('cabra'), 'Cabra', () => { api.snd('bleat', 1.35); api.hop(api.q('cabra'), 14); });
    for (const k of ['ove', 'ove2']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat', k === 'ove2' ? 1.3 : 1); api.hop(api.q(k)); });
  }
});

/* =====================================================================
   1 — DOIS BEBÊS GÊMEOS
   ===================================================================== */
SCENES.push({
  key: 'gemeos', title: 'Dois bebés gémeos', ref: 'Gênesis 25.21-26', tint: 'rose',
  text: [
    'Isaque e Rebeca pediram um filho a Deus. E Deus deu-lhes dois de uma vez: gémeos!',
    'Primeiro nasceu Esaú, vermelhinho e cabeludo. Depois nasceu Jacó, agarrado ao pezinho do irmão!'
  ],
  fact: 'O nome Jacó lembra a palavra «calcanhar», a parte de trás do pé.',
  hint: 'Toca nos bebés.',
  alt: 'Dentro da tenda, Rebeca e Isaque sorriem para dois bebés num berço: Esaú, vermelhinho e de cabelo ruivo, e Jacó, que segura o pezinho do irmão.',
  cue: [330, 560],
  art() {
    let s = tentInside();
    s += lamp(120, 330);
    s += `<g transform="translate(150,700)"><path d="M-70,0 C-70,-40 70,-40 70,0 Z" fill="#e9c46a" stroke="${OL}" stroke-width="3.4"/><path d="M-56,-18 Q0,-8 56,-18" stroke="#d9a33a" stroke-width="4" fill="none"/></g>`;
    s += rebeca({ x: 150, y: 694, s: .98, legs: 'sit', drop: 30, hemY: -62, face: 'joy', look: .6, armL: { a: 20, b: 20 }, armR: { a: 60, b: 30 }, k: 'rebeca' });
    s += isaque({ x: 680, y: 700, s: 1, face: 'joy', look: -.6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'isaque' });
    s += `<g transform="translate(420,680)">${cradle()}</g>`;
    s += `<g transform="translate(420,640)"><path d="M-150,-10 C-150,-50 150,-50 150,-10 L150,10 L-150,10 Z" fill="#f4ead6" stroke="${OL}" stroke-width="3.4"/><path d="M-120,-20 Q0,-6 120,-20" stroke="#e3d6bc" stroke-width="4" fill="none"/></g>`;
    s += `<g transform="translate(420,606)"><ellipse cx="0" cy="0" rx="13" ry="9" fill="#e08a6a" stroke="${OL}" stroke-width="2.6"/><g data-k="maozinha">${limb(50, 8, 18, 2, 10, '#f0c49c')}<circle cx="14" cy="1" r="8" fill="#f0c49c" stroke="${OL}" stroke-width="2.6"/></g></g>`;
    s += `<g data-k="esau"><g class="act">${babyHead(330, 572, { skin: '#e08a6a', hairStyle: 'curly', hair: '#c0612e', hi: '#e08a4a', face: 'open' })}${hitC(330, 572, 50)}</g></g>`;
    s += `<g data-k="jacob"><g class="act">${babyHead(505, 580, { skin: '#f0c49c', hairStyle: 'short', hair: '#3a2520', face: 'smile', look: -.6 })}${hitC(505, 580, 50)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('esau'), 'Bebé Esaú', () => { api.snd('squeak', .9); api.hop(api.q('esau'), 10); api.bubble(330, 520, 'Uáá! Eu sou o Esaú!', { key: 'b', size: 28 }); api.burst(330, 540, 'heart', 3); });
    api.tap(api.q('jacob'), 'Bebé Jacó', () => {
      api.snd('squeak', 1.2); api.hop(api.q('jacob'), 10);
      api.anim(api.q('maozinha'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0px)' }], { duration: 500 });
      api.bubble(505, 520, 'Agarrei o calcanhar!', { key: 'b', size: 28 });
    });
    api.tap(api.q('rebeca'), 'Rebeca', () => { api.snd('lullaby'); api.burst(160, 470, 'heart', 5); api.bubble(160, 440, 'Gémeos!', { key: 'r' }); });
    api.tap(api.q('isaque'), 'Isaque', () => { api.snd('tada'); api.hop(api.q('isaque'), 12); api.bubble(680, 430, 'Deus ouviu a nossa oração!', { key: 'i' }); });
  }
});

/* =====================================================================
   2 — TÃO DIFERENTES
   ===================================================================== */
SCENES.push({
  key: 'diferentes', title: 'Irmãos tão diferentes', ref: 'Gênesis 25.27-28', tint: 'meadow',
  text: [
    'Os meninos cresceram. Mas eram muito diferentes!',
    'Esaú gostava de caçar e de correr no campo. Jacó gostava de ficar quietinho, perto das tendas.'
  ],
  fact: 'O pai gostava mais de Esaú, e a mãe gostava mais de Jacó. Isso deu muita confusão!',
  hint: 'Toca no Esaú e no Jacó.',
  alt: 'De um lado, Esaú corre pelo campo com um arco nas costas, atrás de um coelho. Do outro, Jacó mexe uma panela perto das tendas.',
  cue: [220, 540],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += hill([[-40, 440], [160, 410], [380, 430], [600, 400], [840, 424]], '#cfe2ae');
    s += olive(90, 470, .8) + olive(260, 450, .6);
    s += tent(560, 520, 190, 150, { flag: '#3f7fb0' }) + tent(730, 510, 140, 110, { fill: '#efe0c4' });
    s += hill([[-40, 540], [200, 516], [420, 534], [640, 510], [840, 528]], '#aed37a');
    s += grassBand(61, 560, 760, 12);
    s += rabbit({ x: 60, y: 690, s: 1, flip: true, k: 'coelho' });
    s += person(Object.assign({}, ESAU_M, { x: 230, y: 700, s: 1.05, legs: 'run', face: 'grin', look: -.4, backItems: `<g transform="translate(-6,-90) rotate(28)">${ITEM.bow()}</g>`, armL: { a: 70, b: 20 }, armR: { a: 130, b: -30 }, k: 'esau' }));
    s += cookPot(470, 720, .9);
    s += person(Object.assign({}, JACO_M, { x: 620, y: 720, s: 1.05, face: 'smile', look: -.5, armL: { a: 60, b: 30, item: `<path d="M0,0 L-46,-40" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M0,0 L-46,-40" stroke="#c98f57" stroke-width="5" stroke-linecap="round"/>`, ia: 0 }, armR: { a: 20 }, k: 'jaco' }));
    s += flowerBand(62, 740, 795, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('esau'), 'Esaú', async () => {
      if (api.st.run) return; api.st.run = true;
      api.snd('tiptoe'); api.snd('whoosh');
      api.bubble(230, 470, 'Vou caçar!', { key: 'e', size: 30 });
      api.anim(api.act(api.q('coelho')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-40px,-30px)' }, { transform: 'translate(-90px,0px)' }], { duration: 600, fill: 'forwards' });
      await api.anim(api.act(api.q('esau')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-60px) translateY(-10px)' }, { transform: 'translateX(-110px)' }, { transform: 'translateX(0px)' }], { duration: 1600 });
      api.st.run = false;
    });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('pour'); api.burst(470, 560, 'spark', 4, { col: '#ffffff' }); api.bubble(620, 470, 'Eu gosto de ficar aqui!', { key: 'j' }); });
    api.tap(api.q('panela'), 'Panela', () => { api.snd('pour'); api.bubble(470, 520, 'Hum, que cheiro bom!', { key: 'p', size: 26 }); });
    api.tap(api.q('coelho'), 'Coelho', () => { api.snd('squeak', 1.25); api.hop(api.q('coelho'), 24); });
  }
});

/* =====================================================================
   3 — UMA SOPA VERMELHA
   ===================================================================== */
SCENES.push({
  key: 'sopa', title: 'Uma sopa vermelha', ref: 'Gênesis 25.29-34', tint: 'sand',
  text: [
    'Um dia, Esaú chegou com muita fome. Jacó tinha feito uma sopa vermelha. Hum, que cheiro bom!',
    'Jacó disse:',
    { q: 'Eu dou-te a sopa, mas tu dás-me o teu lugar de filho mais velho.', who: 'jaco' },
    'E Esaú trocou uma coisa muito importante por um prato de sopa!'
  ],
  fact: 'O filho mais velho recebia uma bênção especial do pai.',
  hint: 'Toca no Esaú, no Jacó e na sopa.',
  alt: 'Perto das tendas, Jacó mexe uma panela de sopa vermelha no fogo. Esaú chega do campo com o arco nas costas, cansado e com fome.',
  cue: [600, 540],
  art() {
    let s = sky('sky', [[0, '#8fc2e6'], [.55, '#f6dcb0'], [1, '#f6dcb0']]);
    s += sun(140, 140, 40, { fill: '#ffb84a', fill2: '#ffcf6e', face: true });
    s += hill([[-40, 450], [160, 420], [380, 440], [600, 412], [840, 432]], '#d6c08a');
    s += tent(140, 540, 200, 160, { flag: '#3f7fb0' });
    s += `<rect x="-40" y="530" width="900" height="400" fill="#e2cf9a"/><path d="M-40,530 L840,530" stroke="#c9b07c" stroke-width="4"/>`;
    s += cookPot(400, 720, 1);
    s += jaco({ x: 230, y: 730, s: 1.02, face: 'smile', look: .5, armR: { a: 60, b: 20 }, armL: { a: 14 }, k: 'jaco' });
    s += `<g data-k="tigela" opacity="0"><g transform="translate(560,600)"><path d="M-30,-8 C-28,16 28,16 30,-8 Z" fill="#c98f57" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-8" rx="30" ry="8" fill="#c0392b" stroke="${OL}" stroke-width="3"/></g></g>`;
    s += esau({ x: 610, y: 730, s: 1.04, face: 'worry', look: -.5, backItems: `<g transform="translate(-10,-150) rotate(30)">${ITEM.bow()}</g>`, armL: { a: 40, b: 50 }, armR: { a: 20, b: 10 }, k: 'esau' });
    s += grassBand(71, 740, 790, 6, ['#a8a85a']);
    return s;
  },
  setup(api) {
    const step = async () => {
      if (!(api.st.e && api.st.j) || api.st.done) return;
      api.st.done = true;
      await api.wait(1800);
      api.snd('pour');
      await api.anim(api.q('tigela'), [{ opacity: 0, transform: 'translateX(-120px)' }, { opacity: 1, transform: 'translateX(0px)' }], { duration: 700, fill: 'forwards' });
      api.snd('gulp'); api.later(() => api.snd('gulp'), 300);
      api.bubble(610, 450, 'Podes ficar com ele! Eu quero a sopa!', { key: 'e', dur: 2800 });
      api.nudgeNext(2600);
    };
    api.tap(api.q('esau'), 'Esaú', () => { api.snd('grunt'); api.hop(api.q('esau'), 8); api.bubble(610, 450, 'Estou a morrer de fome!', { key: 'e' }); api.st.e = true; step(); });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('hm'); api.bubble(230, 450, 'Eu dou-te a sopa... se me deres o teu lugar de filho mais velho!', { key: 'j', dur: 3200 }); api.st.j = true; step(); });
    api.tap(api.q('panela'), 'Panela de sopa', () => { api.snd('pour'); api.burst(400, 600, 'spark', 4, { col: '#ffffff' }); api.bubble(400, 530, 'Sopa de lentilhas!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   4 — JACÓ ENGANOU O PAI
   ===================================================================== */
const PELUDO = `<g stroke="#5a3a26" stroke-width="2.4" stroke-linecap="round">${[[-6, 8], [6, 14], [-4, 22], [5, 28]].map(([a, b]) => `<path d="M${a},${b} l-4,-5 M${a + 3},${b} l3,-6"/>`).join('')}</g>`;
SCENES.push({
  key: 'bencao', title: 'Jacó enganou o pai', ref: 'Gênesis 27.1-29', tint: 'dusk',
  text: [
    'O pai, Isaque, ficou velhinho e quase não via. Queria abençoar Esaú.',
    'Mas Jacó vestiu a roupa do irmão e pôs pele de cabrito nos braços, para ficar peludo como Esaú.',
    'Assim, Jacó enganou o pai e ficou com a bênção.'
  ],
  fact: 'Quando Esaú descobriu, ficou muito zangado. A mentira separou os irmãos.',
  hint: 'Toca no braço peludo do Jacó.',
  alt: 'Dentro da tenda, o velho Isaque, sentado, toca no braço de Jacó, que está coberto com pele de cabrito. Rebeca espreita pela porta.',
  cue: [452, 560],
  art() {
    let s = tentInside();
    s += `<path d="M640,600 L640,300 Q700,250 760,300 L760,600 Z" fill="#f6dcb0" stroke="${OL}" stroke-width="3"/>`;
    s += rebeca({ x: 700, y: 640, s: .8, face: 'worry', look: -.6, armL: { a: -20, b: -90 }, armR: { a: 20 }, k: 'rebeca' });
    s += lamp(120, 300);
    s += `<g transform="translate(250,640)"><path d="M-150,0 C-150,-60 120,-60 130,0 Z" fill="#e9c46a" stroke="${OL}" stroke-width="3.4"/><path d="M-120,-30 Q0,-18 110,-30" stroke="#d9a33a" stroke-width="4" fill="none"/></g>`;
    s += isaque({ x: 250, y: 660, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'smile', shut: true, look: .5, armL: { a: 20, b: 20 }, armR: { a: 70, b: 10 }, k: 'isaque' });
    s += jaco({ x: 470, y: 704, s: 1, legs: 'kneel', tunic: '#7a5a3a', stripes: '#9a7a52', face: 'worry', look: -.6, armL: { a: 60, b: 10, fore: '#8a6440', sleeve: '#7a5a3a', item: PELUDO, handFirst: true }, armR: { a: 20, fore: '#8a6440', sleeve: '#7a5a3a' }, k: 'jaco' });
    s += `<g transform="translate(560,700)"><ellipse cx="0" cy="0" rx="40" ry="10" fill="#c98f57" stroke="${OL}" stroke-width="3"/><path d="M-26,-6 q26,-18 52,0" fill="#8a4a2a" stroke="${OL}" stroke-width="2.6"/></g>`;
    const [bx, by] = handAt('adult', -1, { a: 60, b: 10 }, 1, 470, 704, 44);
    s += hitC(r1(bx + 10), r1(by - 30), 52).replace('class="hit"', 'class="hit" data-k="braco"');
    return s;
  },
  setup(api) {
    api.tap(api.q('braco'), 'Braço peludo de Jacó', () => {
      api.snd('hm');
      api.anim(api.part(api.q('isaque'), 'armR'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'rotate(0deg)' }], { duration: 700 });
      api.bubble(250, 380, 'A voz é de Jacó, mas os braços são de Esaú...', { key: 'i', dur: 3000 });
    });
    api.tap(api.q('isaque'), 'Isaque', () => {
      if (api.st.ok) return; api.st.ok = true;
      api.snd('anoint'); api.burst(470, 470, 'spark', 12, { col: '#fff1b0' });
      api.bubble(250, 380, 'Que Deus te abençoe, meu filho!', { key: 'i', dur: 2800 });
      api.nudgeNext(2800);
    });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('gulp'); api.bubble(470, 420, 'Sou eu, o Esaú...', { key: 'j', size: 26 }); });
    api.tap(api.q('rebeca'), 'Rebeca', () => { api.snd('shh'); api.bubble(700, 400, 'Shhh!', { key: 'r', size: 28 }); });
  }
});

/* =====================================================================
   5 — JACÓ FOGE DE CASA
   ===================================================================== */
SCENES.push({
  key: 'fuga', title: 'Jacó foge de casa', ref: 'Gênesis 27.41–28.5', tint: 'dusk',
  text: [
    'Esaú ficou tão zangado que Jacó teve de fugir para muito longe.',
    'Jacó foi sozinho, só com o seu cajado, para a casa do tio Labão.'
  ],
  fact: 'A viagem levava muitos dias, a pé!',
  hint: 'Toca no Jacó para ele seguir viagem.',
  alt: 'No fim da tarde, Jacó sai de casa com um cajado e uma trouxa. Rebeca acena da tenda, e Esaú, de braços cruzados, está zangado.',
  cue: [420, 560],
  art() {
    let s = sky('sky', [[0, '#6f7fc0'], [.5, '#f0a98a'], [.75, '#fbd3a2'], [1, '#fbd3a2']]);
    s += sun(700, 380, 46, { fill: '#ffa64a', fill2: '#ffc06e', glow: '#ffd2a8' });
    s += hill([[-40, 440], [160, 410], [380, 430], [600, 400], [840, 424]], '#b49a7a');
    s += hill([[400, 900], [560, 470], [700, 480], [860, 460]], '#a8907a', '', 900);
    s += tent(110, 560, 210, 170, { flag: '#3f7fb0' });
    s += `<rect x="-40" y="540" width="900" height="400" fill="#d9c08c"/><path d="M200,900 C320,700 520,600 860,520 L860,580 C560,640 400,740 360,900 Z" fill="#e8d4a2"/>`;
    s += esau({ x: 90, y: 700, s: .9, face: 'angry', look: .5, armL: { a: -30, b: -96 }, armR: { a: -30, b: -96 }, k: 'esau' });
    s += rebeca({ x: 230, y: 712, s: .92, face: 'sad', look: .6, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'rebeca' });
    s += jaco({ x: 430, y: 716, s: 1, legs: 'walk', bag: true, face: 'sad', look: .6, armL: { a: 20 }, armR: { a: 20, item: ITEM.staff(200, 1) }, k: 'jaco' });
    return s;
  },
  setup(api) {
    let steps = 0;
    api.tap(api.q('jaco'), 'Jacó', async () => {
      if (api.st.busy || steps >= 3) return; api.st.busy = true;
      steps++;
      api.snd('tiptoe');
      const dx = steps * 70;
      await api.anim(api.act(api.q('jaco')), [{ transform: `translate(${dx - 70}px,0px)` }, { transform: `translate(${dx - 35}px,-8px)` }, { transform: `translate(${dx}px,0px) scale(${1 - steps * .08})` }], { duration: 700, fill: 'forwards' });
      if (steps === 1) api.bubble(240, 450, 'Vai para casa do teu tio Labão!', { key: 'r', dur: 2400 });
      if (steps === 3) { api.bubble(640, 460, 'Adeus, mãe!', { key: 'j' }); api.nudgeNext(2000); }
      api.st.busy = false;
    });
    api.tap(api.q('rebeca'), 'Rebeca', () => { api.snd('heart'); api.wave(api.q('rebeca'), 'armR'); api.bubble(240, 450, 'Que Deus cuide de ti, filho!', { key: 'r' }); });
    api.tap(api.q('esau'), 'Esaú', () => { api.snd('grunt'); api.shakeHead(api.q('esau')); api.bubble(100, 470, 'Hunf!', { key: 'e', size: 30 }); });
  }
});

/* =====================================================================
   6 — A ESCADA ATÉ O CÉU
   ===================================================================== */
const ANJOS = [[540, 620, .34], [510, 470, .3], [490, 320, .26], [470, 180, .22]];
SCENES.push({
  key: 'escada', title: 'A escada até ao céu', ref: 'Gênesis 28.10-17', tint: 'night',
  text: [
    'De noite, Jacó dormiu no chão, com uma pedra como almofada.',
    'Sonhou com uma escada que ia até ao céu. Os anjos subiam e desciam! E Deus disse:',
    { q: 'Eu estou contigo. Vou cuidar de ti onde quer que vás.', who: 'deus' }
  ],
  fact: 'Jacó deu àquele lugar o nome de Betel, que quer dizer «casa de Deus».',
  hint: 'Toca nos anjos e depois no Jacó.',
  alt: 'À noite, Jacó dorme no chão com a cabeça numa pedra. Uma escada de luz sobe da terra até ao céu, e anjos sobem e descem por ela.',
  cue: [540, 600],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.6, '#26306a'], [1, '#3a4889']]) + fogoDefs();
    s += starField(611, 70, 0, 0, 800, 520, { big: .1 });
    s += hill([[-40, 600], [200, 570], [420, 590], [640, 560], [840, 580]], '#2b416c');
    s += stairway();
    ANJOS.forEach(([x, y, sc], i) => s += anjo({ x, y, s: sc, face: i % 2 ? 'joy' : 'smile', look: i % 2 ? -.4 : .4, armL: { a: i % 2 ? 140 : 30, b: i % 2 ? -20 : 30 }, armR: { a: i % 2 ? 30 : 140, b: i % 2 ? 30 : -20 }, k: 'an' + i }));
    s += hill([[-40, 690], [220, 668], [460, 682], [700, 660], [840, 672]], '#2c584f');
    s += `<g transform="translate(158,742)">${rock(0, 0, 70, 40, { fill: '#8e8a96', shade: '#6e6a76', hi: '#b0acb8' })}</g>`;
    s += `<g transform="translate(250,742) rotate(-90)" data-k="dorme"><g>${jaco({ x: 0, y: 112, s: .8, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>`;
    s += `<g data-k="zz"><text class="zzz svgtxt" style="--d:3s" x="180" y="690" font-size="32" fill="#ffffff">z</text><text class="zzz svgtxt" style="--d:3s;animation-delay:-1.5s" x="200" y="660" font-size="24" fill="#ffffff">z</text></g>`;
    s += `<g data-k="acordado" opacity="0" style="pointer-events:none">${jaco({ x: 230, y: 742, s: .9, legs: 'kneel', face: 'surprise', look: .6, armL: { a: 150, b: -40 }, armR: { a: 150, b: -40 } })}</g>`;
    return s;
  },
  setup(api) {
    const NOTES = ['C5', 'E5', 'G5', 'C6'];
    ANJOS.forEach(([x, y, sc], i) => api.tap(api.q('an' + i), 'Anjo na escada', () => {
      api.snd('chime', NOTES[i]);
      const up = i % 2 ? 1 : -1;
      api.anim(api.act(api.q('an' + i)), [{ transform: 'translateY(0px)' }, { transform: `translateY(${up * 60}px)` }, { transform: 'translateY(0px)' }], { duration: 900, easing: 'ease-in-out' });
      api.burst(x, y - 60 * sc * 3, 'spark', 5, { col: '#fff1b0' });
    }));
    api.tap(api.q('ceu'), 'Luz de Deus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(470, 60, 'spark', 10, { col: '#fff1b0' }); api.bubble(470, 140, 'Eu estou contigo!', { key: 'd', below: true, dur: 2600 }); });
    api.tap(api.q('dorme'), 'Jacó a dormir', async () => {
      if (api.st.awake) return;
      api.snd('snore');
      await api.wait(900);
      api.st.awake = true;
      api.q('dorme').setAttribute('opacity', '0'); api.q('zz').setAttribute('opacity', '0');
      api.anim(api.q('acordado'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('anoint');
      api.bubble(230, 460, 'Deus está neste lugar, e eu não sabia!', { key: 'j', dur: 3000 });
      api.nudgeNext(2800);
    });
  }
});

/* =====================================================================
   7 — RAQUEL E AS OVELHAS
   ===================================================================== */
SCENES.push({
  key: 'raquel', title: 'Raquel e as ovelhas', ref: 'Gênesis 29.1-20', tint: 'meadow',
  text: [
    'Perto da casa do tio, Jacó viu um poço e uma rapariga com as ovelhas do pai. Era Raquel!',
    'Jacó tirou a pedra pesada do poço e deu água às ovelhas.',
    'Jacó amou Raquel e trabalhou sete anos para casar com ela.'
  ],
  fact: 'Os sete anos passaram num instante, de tanto que Jacó amava Raquel!',
  hint: 'Toca na pedra do poço e depois nas ovelhas.',
  alt: 'Num campo, Jacó está ao lado de um poço de pedra tapado por uma pedra grande. Raquel, com um cajado, cuida de um rebanho de ovelhas.',
  cue: [400, 560],
  art() {
    let s = bgDay({ sunX: 120, sunY: 120, sunR: 40 });
    s += hill([[-40, 440], [160, 410], [380, 430], [600, 400], [840, 424]], '#cfe2ae');
    s += town(560, 400, .5) + palm(470, 450, .5);
    s += hill([[-40, 520], [200, 496], [420, 514], [640, 490], [840, 508]], '#aed37a');
    s += grassBand(81, 540, 760, 12);
    s += well(400, 660, 1);
    s += `<g transform="translate(400,592)" data-k="pedra"><g class="act"><ellipse cx="0" cy="0" rx="104" ry="26" fill="#8e8a96" stroke="${OL}" stroke-width="4"/><ellipse cx="-20" cy="-6" rx="50" ry="10" fill="#aaa6b2"/>${hitC(0, 0, 80)}</g></g>`;
    s += trough(640, 740);
    s += jaco({ x: 230, y: 712, s: 1, face: 'smile', look: .4, armL: { a: 14, item: ITEM.staff(200, -1) }, armR: { a: 60, b: 20 }, k: 'jaco' });
    s += raquel({ x: 580, y: 640, s: .86, face: 'smile', look: -.5, armL: { a: 14 }, armR: { a: 14, item: ITEM.staff(190, 1) }, k: 'raquel' });
    [[540, 770, .7], [660, 690, .62], [760, 760, .72]].forEach(([x, y, sc], i) => s += sheep({ x, y, s: sc, flip: true, face: i === 1 ? '#f1d2bb' : '#4b3d38', k: 'ov' + i }));
    s += flowerBand(82, 760, 795, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('pedra'), 'Pedra do poço', async () => {
      if (api.st.open) { api.snd('plip'); return; }
      api.st.open = true;
      api.snd('grunt'); api.hop(api.q('jaco'), 10);
      await api.anim(api.act(api.q('pedra')), [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: 'translate(-60px,-30px) rotate(-12deg)' }, { transform: 'translate(-150px,100px) rotate(-20deg)' }], { duration: 900, fill: 'forwards', easing: 'ease-in' });
      api.snd('stomp'); api.burst(250, 700, 'dust', 6);
      api.bubble(230, 440, 'Pronto! Água para as ovelhas!', { key: 'j' });
    });
    let drank = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('ov' + i), 'Ovelha', async () => {
      const el = api.q('ov' + i);
      api.snd('bleat', 1 + i * .15); api.hop(el, 12);
      if (!api.st.open) { api.bubble(580, 400, 'O poço está tapado!', { key: 'r', size: 26 }); return; }
      if (el.dataset.d) return; el.dataset.d = 1; drank++;
      api.snd('pour');
      api.anim(api.q('agua'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.burst(640, 700, 'ripple', 2);
      if (drank === 3) { await api.wait(600); api.snd('heart'); api.burst(420, 520, 'heart', 7); api.bubble(580, 400, 'Obrigada, Jacó!', { key: 'r' }); api.nudgeNext(2200); }
    });
    api.tap(api.q('raquel'), 'Raquel', () => { api.snd('hello'); api.bubble(580, 400, 'O meu nome é Raquel!', { key: 'r' }); });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('heart'); api.bubble(230, 440, 'Eu sou Jacó, filho de Rebeca!', { key: 'j' }); });
  }
});

/* =====================================================================
   8 — UMA FAMÍLIA GRANDE
   ===================================================================== */
SCENES.push({
  key: 'familia', title: 'Uma família grande', ref: 'Gênesis 30.43; 31.3', tint: 'gold',
  text: [
    'Os anos passaram. Jacó teve muitos filhos e muitos animais: ovelhas, cabras, camelos e jumentos!',
    'Então Deus disse:',
    { q: 'Volta para a tua terra. Eu estou contigo.', who: 'deus' }
  ],
  fact: 'Jacó teve doze filhos!',
  hint: 'Toca nos filhos de Jacó para os contares.',
  alt: 'Jacó e Raquel estão diante das tendas com oito crianças, muitas ovelhas, cabras e camelos, debaixo de uma luz dourada.',
  cue: [250, 690],
  art() {
    let s = sky('sky', [[0, '#9fd2ee'], [.55, '#f8ecd0'], [1, '#f8ecd0']]);
    s += glory(620, 90, 240, 'luz');
    s += hill([[-40, 440], [160, 410], [380, 430], [600, 400], [840, 424]], '#d7d49a');
    s += tent(110, 470, 170, 130, { flag: '#3f7fb0' }) + tent(260, 460, 140, 110, { fill: '#efe0c4' }) + tent(700, 470, 160, 120, { flag: '#e86a9a' });
    s += camel({ x: 470, y: 470, s: .44, saddle: '#b8312f' }) + camel({ x: 560, y: 480, s: .4, saddle: '#3f7fb0' });
    s += hill([[-40, 510], [200, 486], [420, 504], [640, 480], [840, 498]], '#c4cf86');
    s += [[90, 540, .5], [200, 552, .46], [640, 548, .5], [740, 540, .46]].map(([x, y, sc], i) => i % 2 ? goat({ x, y, s: sc }) : sheep({ x, y, s: sc, flip: i > 1 })).join('');
    s += hill([[-40, 570], [220, 548], [460, 562], [700, 544], [840, 556]], '#b4c47a');
    s += jaco({ x: 330, y: 646, s: .92, beard: 'long', face: 'joy', look: .3, armL: { a: 14, item: ITEM.staff(200, -1) }, armR: { a: 150, b: -20 }, k: 'jaco' });
    s += raquel({ x: 460, y: 650, s: .86, face: 'joy', look: -.3, armL: { a: 30, b: 20 }, armR: { a: 20 }, k: 'raquel' });
    FILHOS.forEach((f, i) => { const x = 70 + i * 94, y = 760 + (i % 2) * 18; s += person(Object.assign({}, f, { x, y, s: .66 + (i % 3) * .06, face: i % 2 ? 'grin' : 'joy', look: (400 - x) / 600, k: 'f' + i })); });
    return s;
  },
  setup(api) {
    const seen = new Set();
    FILHOS.forEach((f, i) => api.tap(api.q('f' + i), 'Filho de Jacó', async () => {
      const [x, y, sc] = api.pos(api.q('f' + i));
      api.hop(api.q('f' + i), 18);
      if (seen.has(i)) { api.snd('boing', 1 + i * .06); return; }
      seen.add(i);
      api.snd('count', seen.size);
      api.badge(x, y - 200 * sc, String(seen.size), { key: 'b' + i });
      if (seen.size === FILHOS.length) { await api.wait(600); api.snd('tada'); api.bubble(330, 370, 'Que família grande!', { key: 'j', dur: 2400 }); }
    }));
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(620, 120, 'spark', 10, { col: '#fff1b0' }); api.bubble(620, 220, 'Volta para a tua terra!', { key: 'd', below: true, dur: 2600 }); api.nudgeNext(2600); });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('hello'); api.bubble(330, 370, 'Deus foi muito bom comigo!', { key: 'j' }); });
    api.tap(api.q('raquel'), 'Raquel', () => { api.snd('heart'); api.burst(460, 440, 'heart', 4); });
  }
});

/* =====================================================================
   9 — PRESENTES PARA ESAÚ
   ===================================================================== */
const HERDS = [[180, 560], [400, 590], [600, 560], [300, 690]];
SCENES.push({
  key: 'presentes', title: 'Com medo de Esaú', ref: 'Gênesis 32.3-21', tint: 'sand',
  text: [
    'No caminho, Jacó soube que Esaú vinha com quatrocentos homens. Que medo!',
    'Jacó orou:',
    { q: 'Senhor, protege-me!', who: 'jaco' },
    'Depois, mandou muitos presentes ao irmão: cabras, ovelhas, camelos, vacas e jumentos.'
  ],
  fact: 'Jacó mandou mais de quinhentos animais de presente!',
  hint: 'Toca nos animais para mandares os presentes.',
  alt: 'Jacó, ajoelhado, ora com as mãos juntas. À frente dele, grupos de cabras, ovelhas, camelos, uma vaca e um jumento estão prontos para seguir até Esaú.',
  cue: [180, 520],
  art() {
    let s = sky('sky', [[0, '#9fc2e6'], [.55, '#f6dcb0'], [1, '#f6dcb0']]);
    s += sun(620, 120, 38, { fill: '#ffcf3f', face: true });
    s += hill([[-40, 430], [160, 404], [380, 424], [600, 396], [840, 418]], '#cdb98a');
    s += `<g transform="translate(720,410)" data-k="poeira"><g class="act">${blob([[-50, 0, 26], [-10, -12, 32], [36, -4, 26], [10, 10, 24]], '#e8d8b8', 0)}${[-30, 0, 30].map((x, i) => `<g transform="translate(${x},${4 + (i % 2) * 6}) scale(.22)">${person({ kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#7a5a3a', face: 'smile', cls: '' })}</g>`).join('')}${hitC(0, -10, 60)}</g></g>`;
    s += `<rect x="-40" y="480" width="900" height="420" fill="#e2cf9a"/><path d="M-40,480 L840,480" stroke="#c9b07c" stroke-width="4"/><path d="M0,900 C200,720 480,560 860,470 L860,520 C500,600 260,740 120,900 Z" fill="#efdfb6"/>`;
    HERDS.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="h${i}"><g class="act">${herd(i)}${hitC(20, -50, 90)}</g></g>`);
    s += jaco({ x: 600, y: 760, s: 1, legs: 'kneel', beard: 'long', face: 'worry', look: -.2, armL: { a: -40, b: -100 }, armR: { a: -40, b: -100 }, k: 'jaco' });
    return s;
  },
  setup(api) {
    let sent = 0;
    const SND = [['bleat', 1.35], ['bleat', 1], ['grunt'], ['moo']];
    HERDS.forEach(([x, y], i) => api.tap(api.q('h' + i), 'Presente para Esaú', async () => {
      const el = api.q('h' + i);
      api.snd(...SND[i]);
      if (el.dataset.gone) return; el.dataset.gone = 1; sent++;
      api.snd('gallop');
      api.anim(api.act(el), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${720 - x}px,${410 - y}px) scale(.2)`, opacity: 0 }], { duration: 2200, fill: 'forwards', easing: 'ease-in' });
      if (sent === HERDS.length) { await api.wait(1800); api.bubble(600, 480, 'Agora está nas mãos de Deus!', { key: 'j' }); api.nudgeNext(2000); }
    }));
    api.tap(api.q('jaco'), 'Jacó a orar', () => { api.snd('anoint'); api.burst(600, 520, 'spark', 8, { col: '#fff1b0' }); api.bubble(600, 480, 'Senhor, protege-me do meu irmão!', { key: 'j', dur: 2600 }); });
    api.tap(api.q('poeira'), 'Esaú a chegar ao longe', () => { api.snd('gallop'); api.shake(4); api.bubble(700, 300, 'O Esaú vem aí!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   10 — UMA LUTA ATÉ O AMANHECER
   ===================================================================== */
SCENES.push({
  key: 'luta', title: 'Uma luta até ao amanhecer', ref: 'Gênesis 32.22-26', tint: 'night',
  text: [
    'De noite, perto do rio, um homem apareceu e lutou com Jacó a noite inteira!',
    'Quando o sol ia nascer, Jacó disse:',
    { q: 'Só te solto se me abençoares!', who: 'jaco' }
  ],
  fact: 'Aquele homem era um mensageiro de Deus.',
  hint: 'Toca na luta até o sol nascer.',
  alt: 'À noite, na margem de um rio, Jacó e um homem brilhante agarram-se pelos ombros, a lutar. Aos poucos, o céu clareia e o sol nasce.',
  cue: [400, 520],
  art() {
    let s = sky('sky', [[0, '#9fc6e8'], [.55, '#fde2b8'], [1, '#fde2b8']]) + fogoDefs();
    s += `<g data-k="sol" style="transform:translateY(160px)">${sun(620, 360, 50, { fill: '#ffb84a', fill2: '#ffcf6e', glow: '#ffe2a8', face: true })}</g>`;
    s += `<g data-k="noite"><rect x="-40" y="-40" width="900" height="900" fill="#141c4a"/>${starField(711, 60, 0, 0, 800, 420, { big: .1 })}${moon(150, 120, 30)}</g>`;
    s += hill([[-40, 470], [160, 440], [380, 460], [600, 430], [840, 452]], '#4a5a7a');
    s += riverNight(500);
    s += `<rect x="-40" y="590" width="900" height="300" fill="#5a6a5a"/><path d="M-40,590 C200,580 600,600 840,586" stroke="${OL}" stroke-width="3" fill="none"/>`;
    s += `<g data-k="luta"><g class="act">`;
    s += `<g transform="rotate(-9 476 744)">${homem({ x: 466, y: 744, s: 1.08, flip: true, legs: 'wide', face: 'determined', look: .6, armL: { a: -50, b: -70 }, armR: { a: 70, b: 10 } })}</g>`;
    s += `<g transform="rotate(9 330 744)">${jaco({ x: 340, y: 744, s: 1.08, beard: 'long', legs: 'wide', face: 'determined', look: .6, armL: { a: -50, b: -70 }, armR: { a: 70, b: 10 } })}</g>`;
    s += hitC(400, 560, 150) + `</g></g>`;
    s += `<rect data-k="tinta" x="-40" y="380" width="900" height="520" fill="#141c4a" opacity=".45" style="pointer-events:none"/>`;
    return s;
  },
  setup(api) {
    let n = 0;
    const night = api.q('noite'), tint = api.q('tinta'), sol = api.q('sol');
    api.tap(api.q('luta'), 'Jacó a lutar', async () => {
      if (api.st.busy) return; api.st.busy = true;
      api.snd('grunt'); api.snd('whoosh');
      api.anim(api.act(api.q('luta')), [{ transform: 'translateX(0px) rotate(0deg)' }, { transform: 'translateX(-12px) rotate(-2deg)' }, { transform: 'translateX(12px) rotate(2deg)' }, { transform: 'translateX(0px) rotate(0deg)' }], { duration: 600 });
      api.burst(400, 560, 'dust', 5);
      if (n < 4) {
        const a = 1 - n / 4, b = 1 - (n + 1) / 4;
        n++;
        api.anim(night, [{ opacity: a }, { opacity: b }], { duration: 900, fill: 'forwards' });
        api.anim(tint, [{ opacity: a * .45 }, { opacity: b * .45 }], { duration: 900, fill: 'forwards' });
        api.anim(sol, [{ transform: `translateY(${160 - (n - 1) * 40}px)` }, { transform: `translateY(${160 - n * 40}px)` }], { duration: 900, fill: 'forwards' });
        if (n < 4) api.badge(400, 360, String(n), { key: 'n' });
        if (n === 4) {
          api.snd('choir', ['C4', 'E4', 'G4', 'C5']);
          await api.wait(700);
          api.bubble(330, 430, 'Só te solto se me abençoares!', { key: 'j', dur: 3200 });
          api.nudgeNext(3000);
        }
      }
      await api.wait(650); api.st.busy = false;
    });
  }
});

/* =====================================================================
   11 — UM NOME NOVO
   ===================================================================== */
SCENES.push({
  key: 'israel', title: 'Um nome novo', ref: 'Gênesis 32.27-31', tint: 'gold',
  text: [
    'O homem perguntou: «Como te chamas?» Ele respondeu: «Jacó».',
    { q: 'Agora o teu nome é Israel, porque lutaste com Deus e venceste.', who: 'deus' },
    'E ali mesmo ele abençoou Jacó.'
  ],
  fact: 'Israel quer dizer «aquele que luta com Deus». Depois disso, Jacó passou a coxear um bocadinho.',
  hint: 'Toca no nome de Jacó.',
  alt: 'O sol nasce sobre o rio. O homem brilhante abençoa Jacó com a mão erguida. Por cima deles, uma faixa vermelha mostra o nome Jacó, que passa a ser Israel.',
  cue: [400, 170],
  art() {
    let s = sky('sky', [[0, '#8fc2ea'], [.45, '#ffd6a8'], [.7, '#ffe9c8'], [1, '#ffe9c8']]) + fogoDefs();
    s += sun(400, 470, 70, { fill: '#ffb84a', fill2: '#ffcf6e', glow: '#ffe2a8', face: true });
    s += hill([[-40, 470], [160, 444], [380, 462], [600, 436], [840, 456]], '#c9b07c');
    s += riverNight(500, '#5aa6d6', '#d6eff9');
    s += `<rect x="-40" y="590" width="900" height="300" fill="#b8c27a"/><path d="M-40,590 C200,580 600,600 840,586" stroke="${OL}" stroke-width="3" fill="none"/>`;
    s += homem({ x: 540, y: 744, s: 1.06, flip: true, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 130, b: -30 }, k: 'homem' });
    s += jaco({ x: 300, y: 750, s: 1.04, legs: 'kneel', beard: 'long', face: 'joy', look: .6, armL: { a: 150, b: -30 }, armR: { a: 150, b: -30 }, k: 'jaco' });
    s += `<g data-k="nome0">${nameBanner(400, 170, N('Jacó'), '', '#8a6a4a')}</g>`;
    s += `<g data-k="nome1" opacity="0">${nameBanner(400, 170, N('Israel'), '', '#d9433b')}</g>`;
    s += hitC(400, 170, 120).replace('class="hit"', 'class="hit" data-k="faixa"');
    s += grassBand(721, 620, 790, 8) + flowerBand(722, 760, 795, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('faixa'), 'Nome de Jacó', async () => {
      if (api.st.novo) { api.snd('twinkle'); api.burst(400, 170, 'star', 8, { col: '#ffe08a' }); return; }
      api.st.novo = true;
      api.snd('anoint');
      api.anim(api.q('nome0'), [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.6)' }], { duration: 500, fill: 'forwards' });
      await api.wait(350);
      api.anim(api.q('nome1'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
      api.snd('choir', ['C4', 'E4', 'G4', 'C5', 'E5']);
      api.burst(400, 170, 'star', 12, { col: '#ffe08a' });
      api.bubble(300, 470, 'Israel! Que nome lindo!', { key: 'j', dur: 2600 });
      api.nudgeNext(2600);
    });
    api.tap(api.q('homem'), 'O homem de Deus', () => { api.snd('chime', 'E6'); api.burst(540, 500, 'spark', 10, { col: '#fff1b0' }); api.bubble(540, 450, 'Agora o teu nome é Israel!', { key: 'h' }); });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('heart'); api.burst(300, 520, 'heart', 4); api.bubble(300, 470, 'Eu vi Deus face a face!', { key: 'j' }); });
  }
});

/* =====================================================================
   12 — O ABRAÇO DOS IRMÃOS
   ===================================================================== */
SCENES.push({
  key: 'abraco', title: 'O abraço dos irmãos', ref: 'Gênesis 33.1-11', tint: 'rose',
  text: [
    'Quando Jacó viu Esaú, curvou-se até ao chão, sete vezes.',
    'Mas Esaú correu, abraçou Jacó e deu-lhe um beijo. Os dois choraram de alegria!',
    'Deus mudou o coração dos dois irmãos.'
  ],
  fact: 'Jacó disse a Esaú: «Ver o teu rosto é como ver o rosto de Deus!»',
  hint: 'Toca no Esaú.',
  alt: 'Num campo, Jacó curva-se até ao chão enquanto Esaú vem a correr. Depois, os dois irmãos abraçam-se felizes, com corações à volta.',
  cue: [600, 520],
  art() {
    let s = bgDay({ sunX: 660, sunY: 110, sunR: 40, sky: [[0, '#9fd2ee'], [.55, '#fbe3cf'], [1, '#fbe3cf']] });
    s += hill([[-40, 440], [160, 410], [380, 430], [600, 400], [840, 424]], '#d7d49a');
    s += [[620, 420], [680, 428], [740, 418]].map(([x, y]) => `<g transform="translate(${x},${y}) scale(.24)">${person({ kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#7a5a3a', face: 'smile', cls: '' })}</g>`).join('');
    s += tent(90, 480, 150, 110, { flag: '#3f7fb0' });
    s += hill([[-40, 520], [200, 496], [420, 514], [640, 490], [840, 508]], '#c4cf86');
    s += grassBand(731, 540, 760, 12);
    s += `<g data-k="antes">`;
    s += jaco({ x: 250, y: 740, s: 1, legs: 'kneel', beard: 'long', face: 'worry', look: .6, armL: { a: -40, b: -100 }, armR: { a: -40, b: -100 }, k: 'jaco' });
    s += esau({ x: 610, y: 730, s: 1.04, legs: 'run', flip: true, face: 'joy', look: .5, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'esau' });
    s += `</g>`;
    s += `<g data-k="abraco" opacity="0">`;
    s += esau({ x: 448, y: 742, s: 1.04, flip: true, face: 'joy', look: .2, armL: { a: 20 }, armR: { a: 76, b: 40 } });
    s += jaco({ x: 362, y: 744, s: 1, beard: 'long', face: 'joy', look: .2, armL: { a: 20 }, armR: { a: 76, b: 40 } });
    s += hitC(400, 560, 110).replace('class="hit"', 'class="hit" data-k="irmaos"') + `</g>`;
    s += flowerBand(732, 760, 795, 7, ['#e86a9a', '#ffffff', '#f2c14e']);
    return s;
  },
  setup(api) {
    api.tap(api.q('esau'), 'Esaú', async () => {
      if (api.st.hug) return; api.st.hug = true;
      api.snd('tiptoe');
      await api.anim(api.act(api.q('esau')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(130px) translateY(-10px)' }, { transform: 'translateX(220px)' }], { duration: 900, fill: 'forwards', easing: 'ease-in' });
      api.anim(api.q('antes'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      api.anim(api.q('abraco'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.q('antes').style.pointerEvents = 'none';
      api.snd('victory'); api.burst(400, 470, 'heart', 10);
      api.later(() => api.bubble(400, 440, 'Meu irmão! Que saudades!', { key: 'e', dur: 2800 }), 500);
      api.nudgeNext(3000);
    });
    api.tap(api.q('jaco'), 'Jacó', () => { api.snd('hm'); api.bubble(250, 470, 'Meu irmão, perdoa-me!', { key: 'j' }); });
    api.tap(api.q('irmaos'), 'Jacó e Esaú abraçados', () => { if (!api.st.hug) return; api.snd('heart'); api.burst(400, 470, 'heart', 6); api.bubble(400, 440, 'Irmãos para sempre!', { key: 'e' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre as tendas da família de Jacó; uma ovelhinha e uma cabra dormem perto da fogueira.',
  cue: [430, 160],
  questions: [
    ['Como se chamava o irmão gémeo de Jacó?', 'Esaú.'],
    ['Com o que é que Jacó sonhou?', 'Com uma escada até ao céu, cheia de anjos.'],
    ['O que é que Deus prometeu a Jacó?', 'Que ia estar com ele para onde quer que fosse.'],
    ['Qual foi o nome novo de Jacó?', 'Israel.'],
    ['Como acabou a zanga dos irmãos?', 'Com um abraço!']
  ],
  verse: ['Eu estou contigo e vou cuidar de ti onde quer que vás.', 'Gênesis 28.15'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(741, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 32);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 480], [140, 450], [330, 470], [520, 440], [700, 460], [840, 450]], '#2b416c');
    s += tent(140, 560, 180, 130, { fill: '#5a5a8a', stripe: '#3a3a6a' }) + tent(660, 560, 150, 110, { fill: '#5a5a8a', stripe: '#3a3a6a' });
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += campfire(420, 700, .55);
    s += sheep({ x: 260, y: 744, s: .86, pose: 'sleep', k: 'ove', wool: '#e9ecf6' }) + goat({ x: 590, y: 744, s: .7, flip: true, col: '#8a7a8a', dark: '#6a5a6a', patch: '', cls: '' });
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
    api.tap(api.q('fire'), 'Fogueira', () => { api.snd('crackle'); api.burst(420, 640, 'spark', 6, { col: '#ffb24a' }); });
  }
});

Ov.addBook({
  id: 'jaco',
  title: 'Jacó e o Novo Nome',
  cover: { kicker: 'Uma história da Bíblia', title: 'Jacó', small: 'e o Novo Nome', sub: 'Deus pode mudar o nosso coração' },
  color: '#8a3d2b',
  ref: 'Gênesis 25 a 33',
  scenes: SCENES
});
})();
