/* =====================================================================
   LIVRO: O NASCIMENTO DE JESUS  (Lucas 1 e 2; Mateus 1 e 2)
   ===================================================================== */
(() => {
const SCENES = [];
const MARIA = { kind: 'adult', skin: '#e7b58a', head: 'scarf', clothCol: '#4f86c6', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', longSleeves: true, belt: '#4f86c6' };
const JOSE = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', beard: 'short', beardCol: '#4a2c1c', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#8a5a33', tunic: '#8b6a4a', stripes: '#a98a62', belt: '#5b3a2a' };
const ANJO = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', legs: 'none', hemY: -4, hemW: 50, trim: '#f2c14e' };
const PASTORES = [
  { kind: 'adult', skin: '#c98a5a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#a8553a', beard: 'long', beardCol: '#cfc9c0', browCol: '#cfc9c0', hair: '#cfc9c0', tunic: '#7a5a3a', stripes: '#a07a4a', belt: '#5b3a2a' },
  { kind: 'adult', skin: '#d99a6c', head: 'cloth', clothCol: '#d9643f', bandCol: '#8e3b2f', beard: 'short', hair: '#2b1d17', tunic: '#5e7d4a', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e3a675', hairStyle: 'curly', hair: '#5a3020', hi: '#8e4b2a', tunic: '#c9a54e', belt: '#7b4a2a' }
];
const MAGOS = [
  { kind: 'adult', skin: '#e2a878', hair: '#cfc9c0', beard: 'long', beardCol: '#e9e5de', browCol: '#e9e5de', head: 'crown', tunic: '#7b4c93', cloak: '#4e2a6a', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' },
  { kind: 'adult', skin: '#8a5a3c', hair: '#1f1612', beard: 'short', beardCol: '#1f1612', head: 'cloth', clothCol: '#f2c14e', bandCol: '#d9433b', tunic: '#2f8a5a', cloak: '#1f5f43', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' },
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', head: 'crown', tunic: '#b8312f', cloak: '#7a2230', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' }
];
const maria = o => person(Object.assign({}, MARIA, o));
const jose = o => person(Object.assign({}, JOSE, o));

/* ---------- peças desta história ---------- */
function wings(sc = 1) {
  const w = s => `<path transform="scale(${s},1)" d="M10,-176 C40,-210 110,-228 130,-190 C140,-172 128,-156 112,-150 C128,-140 130,-120 114,-108 C126,-96 120,-78 102,-74 C80,-70 40,-100 10,-140 Z" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path transform="scale(${s},1)" d="M40,-176 C70,-190 100,-196 112,-184 M44,-156 C76,-162 100,-162 110,-150 M48,-134 C76,-136 96,-130 104,-116" stroke="#dfe6f2" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="scale(${sc})"><g class="flapw2" style="${dl(2)}">${w(1)}</g><g class="flapw2" style="${dl(2)}">${w(-1)}</g></g>`;
}
function anjo(o) {
  const glow = `<circle cx="0" cy="-120" r="150" fill="${UR('aglow')}"/>`;
  return person(Object.assign({}, ANJO, { backItems: glow + wings(1), cls: 'hover' }, o));
}
const aglowDefs = () => `<defs>${rg('aglow', [[0, '#fff6c8', .95], [.55, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs>`;
function baby(x, y, s = 1, k = 'bebe') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><circle cx="0" cy="-20" r="70" fill="${UR('babyglow')}"/><path d="M-44,-6 C-44,-30 -20,-36 0,-36 C30,-36 48,-26 48,-8 C48,8 30,12 0,12 C-26,12 -44,8 -44,-6 Z" fill="#fbf4e4" stroke="${OL}" stroke-width="3.2"/><path d="M-20,-30 C-8,-10 10,-6 30,-14 M-30,-4 C-10,6 18,4 40,-4" stroke="#e3d6bc" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-26" r="17" fill="#f0c49c" stroke="${OL}" stroke-width="3"/><path d="M-40,-36 C-36,-46 -22,-46 -18,-38" stroke="#7a4a2a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-36,-26 q3,3 6,0 M-27,-26 q3,3 6,0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-32,-19 q3,2 6,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/><ellipse cx="-40" cy="-21" rx="4.5" ry="3" fill="#ef7d78" opacity=".5"/>${hitC(0, -14, 54)}</g></g>`;
}
function manger(x, y, s = 1, withBaby = true, k = 'bebe') {
  let g = `<path d="M-74,0 L-40,-64 M74,0 L40,-64 M-60,0 L-20,-56 M60,0 L20,-56" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-74,0 L-40,-64 M74,0 L40,-64 M-60,0 L-20,-56 M60,0 L20,-56" stroke="#9a6b3e" stroke-width="6" stroke-linecap="round"/>`;
  g += blob([[-50, -76, 18], [-20, -84, 20], [16, -84, 20], [48, -76, 18]], '#e9cf73', 3);
  if (withBaby) g += baby(4, -82, .9, k);
  g += `<path d="M-72,-80 L72,-80 L60,-46 L-60,-46 Z" fill="#b07b4a" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/><path d="M-66,-64 L66,-64" stroke="#8a5a33" stroke-width="3"/>`;
  g += `<g stroke="#c9a54e" stroke-width="3" stroke-linecap="round"><path d="M-60,-82 l-8,-12 M-30,-90 l-2,-12 M40,-88 l6,-12 M62,-82 l10,-8"/></g>`;
  return `<defs>${rg('babyglow', [[0, '#fff6c8', .9], [.6, '#ffe28a', .3], [1, '#ffe28a', 0]])}</defs><g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function stable(o = {}) {
  let s = '';
  s += `<path d="M90,700 L90,250 L710,250 L710,700 Z" fill="#7a5034"/>`;
  s += `<g stroke="#5e3a24" stroke-width="4" opacity=".7">${[300, 350, 400, 450, 500, 550, 600, 650].map(y => `<path d="M90,${y} L710,${y}"/>`).join('')}</g>`;
  if (o.window) s += `<g transform="translate(400,320)"><rect x="-70" y="-50" width="140" height="100" rx="8" fill="#141a3d" stroke="${OL}" stroke-width="5"/>${o.window}<path d="M0,-50 L0,50 M-70,0 L70,0" stroke="#6b4428" stroke-width="7"/></g>`;
  s += `<path d="M40,270 L400,120 L760,270 L730,290 L400,160 L70,290 Z" fill="#c9a54e" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><g stroke="#a8873a" stroke-width="4">${[120, 200, 280, 520, 600, 680].map(x => `<path d="M${x},${270 - Math.abs(400 - x) * .0 - (400 - Math.abs(400 - x)) * .42} l-10,26"/>`).join('')}</g>`;
  s += `<path d="M96,290 L96,700 M704,290 L704,700" stroke="${OL}" stroke-width="22"/><path d="M96,290 L96,700 M704,290 L704,700" stroke="#9a6b3e" stroke-width="14"/>`;
  s += `<rect x="-40" y="690" width="900" height="200" fill="#c9a873"/>`;
  s += `<g opacity=".9">${blob([[140, 700, 26], [190, 704, 22], [600, 702, 26], [660, 700, 22], [700, 706, 18]], '#e9cf73', 0)}</g>`;
  return s;
}
function lantern(x, y, k = '') {
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act"><circle cx="0" cy="10" r="70" fill="#ffd27a" opacity=".22"/><path d="M-14,-12 L14,-12 L18,22 L-18,22 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3"/><path d="M-10,-12 Q0,-28 10,-12" stroke="${OL}" stroke-width="3" fill="none"/><g transform="translate(0,14)"><g class="flicker"><path d="M0,-16 C5,-9 6,-4 4,-1 C2,2 -2,2 -4,-1 C-6,-4 -5,-9 0,-16 Z" fill="#ffb238"/></g></g>${k ? hitC(0, 4, 34) : ''}</g></g>`;
}
function bigStar(x, y, r = 30, k = 'estrela') {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => `<path d="M0,0 L${r1(Math.cos(a * Math.PI / 180) * (i % 2 ? r * 2.6 : r * 4.2))},${r1(Math.sin(a * Math.PI / 180) * (i % 2 ? r * 2.6 : r * 4.2))}" stroke="#fff3c4" stroke-width="${i % 2 ? 3 : 5}" stroke-linecap="round" opacity=".8"/>`).join('');
  return `<defs>${rg('starglow', [[0, '#fff6cf', .95], [.4, '#ffe9a6', .4], [1, '#ffe9a6', 0]])}</defs><g transform="translate(${x},${y})" data-k="${k}"><g class="act"><circle r="${r * 4}" fill="${UR('starglow')}"/><g class="twinkle" style="--d:3.4s">${rays}</g><path d="${sparkle(r * 1.4)}" fill="#fff6cf"/><circle r="${r * .4}" fill="#ffffff"/>${hitC(0, 0, r * 2)}</g></g>`;
}
function dunes(o = {}) {
  return hill([[-40, 520], [160, 488], [360, 510], [560, 480], [840, 506]], o.c1 || '#3d3a6e') + hill([[-40, 600], [220, 566], [460, 590], [700, 560], [840, 580]], o.c2 || '#4a4479') + hill([[-40, 690], [240, 660], [500, 680], [760, 650], [840, 664]], o.c3 || '#57508a');
}
function gift(x, y, type, k) {
  let g = '';
  if (type === 'ouro') g = `<rect x="-30" y="-36" width="60" height="36" rx="5" fill="#b07b4a" stroke="${OL}" stroke-width="3.2"/><g data-p="lid"><path d="M-32,-36 C-32,-58 32,-58 32,-36 Z" fill="#c98f57" stroke="${OL}" stroke-width="3.2"/></g><rect x="-30" y="-24" width="60" height="7" fill="#f2c14e"/><rect x="-6" y="-40" width="12" height="14" rx="2" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/>`;
  else if (type === 'incenso') g = `<path d="M-22,0 C-30,-20 -26,-44 -14,-50 L14,-50 C26,-44 30,-20 22,0 Z" fill="#e3d6bc" stroke="${OL}" stroke-width="3.2"/><path d="M-26,-26 L26,-26" stroke="#5872b8" stroke-width="5"/><g data-p="lid"><path d="M-16,-50 C-16,-66 16,-66 16,-50 Z" fill="#5872b8" stroke="${OL}" stroke-width="3"/><circle cx="0" cy="-66" r="5" fill="#f2c14e" stroke="${OL}" stroke-width="2"/></g>`;
  else g = `<path d="M-12,0 C-26,-6 -28,-30 -12,-40 L-8,-58 L8,-58 L12,-40 C28,-30 26,-6 12,0 Z" fill="#8e3b4f" stroke="${OL}" stroke-width="3.2"/><path d="M-20,-22 Q0,-14 20,-22" stroke="#f2c14e" stroke-width="4" fill="none"/><g data-p="lid"><rect x="-10" y="-70" width="20" height="14" rx="4" fill="#f2c14e" stroke="${OL}" stroke-width="2.6"/></g>`;
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act">${g}${hitC(0, -30, 40)}</g></g>`;
}
function nightSky(seed, o = {}) {
  let s = sky('sky', o.stops || [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
  s += starField(seed, o.n ?? 70, 0, 0, 800, o.h ?? 420, { big: .1 });
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'O Nascimento de Jesus',
  alt: 'Noite estrelada em Belém: debaixo de uma estrela brilhante, Maria e José olham para o bebé Jesus na manjedoura, com um burrinho, uma vaca e ovelhas.',
  cue: [400, 900],
  art() {
    let s = sky('sky', [[0, '#141b4a'], [.45, '#2c3a7a'], [.7, '#5a5fa0'], [1, '#5a5fa0']], 1100);
    s += starField(41, 70, 0, 380, 800, 820, { big: .1 });
    s += bigStar(560, 520, 26, 'estrela');
    s += hill([[-40, 760], [160, 730], [360, 750], [560, 724], [840, 744]], '#2c3f6e');
    s += town(470, 690, .6, { wall: '#4a5582', shade: '#3c456e', roof: '#57628f', winCol: '#ffd66b', doorCol: '#2b304f', sw: 2 });
    s += `<g transform="translate(0,380)">${stable().replace('<rect x="-40" y="690" width="900" height="200" fill="#c9a873"/>', '<rect x="-40" y="690" width="900" height="300" fill="#c9a873"/>')}</g>`;
    s += manger(400, 1066, 1.15, true, 'bebe');
    s += maria({ x: 268, y: 1072, s: .92, legs: 'kneel', face: 'smile', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'maria' });
    s += jose({ x: 540, y: 1068, s: .92, face: 'smile', look: -.6, armL: { a: 12, item: ITEM.staff(200, 1) }, armR: { a: 24, b: 40 }, k: 'jose' });
    s += equine({ x: 160, y: 1060, s: .54, kind: 'donkey', k: 'burro' }) + cow({ x: 660, y: 1062, s: .5, flip: true, k: 'vaca' });
    s += sheep({ x: 300, y: 1094, s: .7, pose: 'lie', k: 'ove' }) + sheep({ x: 500, y: 1094, s: .62, pose: 'lie', flip: true, face: '#f1d2bb', k: 'ove2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('bebe'), 'Bebé Jesus', () => { api.snd('lullaby'); api.burst(400, 960, 'heart', 5); });
    api.tap(api.q('estrela'), 'Estrela de Belém', () => { api.snd('twinkle'); api.burst(560, 520, 'spark', 12, { col: '#fff1b0' }); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('heart'); api.bubble(268, 800, 'Jesus nasceu!', { key: 'm' }); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.hop(api.q('jose'), 10); });
    api.tap(api.q('burro'), 'Burrinho', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
    api.tap(api.q('vaca'), 'Vaca', () => { api.snd('moo'); api.hop(api.q('vaca'), 10); });
    for (const k of ['ove', 'ove2']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat', 1.2); api.hop(api.q(k), 10); });
  }
});

/* =====================================================================
   1 — UM ANJO VISITA MARIA
   ===================================================================== */
SCENES.push({
  key: 'gabriel', title: 'Um anjo visita Maria', ref: 'Lucas 1.26-38', tint: 'sky',
  text: [
    'Em Nazaré, vivia uma jovem chamada Maria. Um dia, o anjo Gabriel apareceu e disse:',
    { q: 'Não tenhas medo, Maria! Vais ter um bebé. O nome dele vai ser Jesus. Ele é o Filho de Deus!', who: 'anjo' },
    { q: 'Sim! Que aconteça como Deus quer.', who: 'outro' }
  ],
  fact: 'Gabriel é um dos anjos que a Bíblia chama pelo nome.',
  hint: 'Toca no anjo e na Maria.',
  alt: 'No pátio da casa de Maria, um anjo brilhante de asas brancas aparece no ar; Maria, de manto azul, olha surpresa ao lado de um jarro de água.',
  cue: [560, 400],
  art() {
    let s = sky('sky', [[0, '#a7d8f0'], [.6, '#fbeed6'], [1, '#fbeed6']]) + aglowDefs();
    s += hill([[-40, 430], [200, 400], [420, 420], [640, 396], [840, 412]], '#d7e6b4');
    s += town(330, 394, .45) + palm(180, 440, .5);
    s += `<rect x="-40" y="440" width="900" height="420" fill="#ecdcb2"/><rect x="-40" y="430" width="900" height="16" fill="#d8bd8a" stroke="${OL}" stroke-width="2.4"/>`;
    s += house(40, 700, 220, 250, { wall: '#efdcb1', shade: '#d9bd88', roof: '#dcc08c', sw: 3, door: false });
    s += `<path d="M90,700 L90,560 Q140,520 190,560 L190,700 Z" fill="#7a4c2c" stroke="${OL}" stroke-width="3"/>`;
    s += `<g transform="translate(150,520)">${flowerBand(151, 0, 0, 0)}</g>`;
    s += `<g transform="translate(330,700)"><path d="M-22,0 C-34,-20 -30,-50 -14,-58 L-14,-70 L14,-70 L14,-58 C30,-50 34,-20 22,0 Z" fill="#c97a4a" stroke="${OL}" stroke-width="3.2"/><path d="M-26,-34 Q0,-26 26,-34" stroke="#e9c46a" stroke-width="5" fill="none"/></g>`;
    s += maria({ x: 300, y: 702, s: 1.02, face: 'surprise', look: .6, armL: { a: 30, b: 40 }, armR: { a: -20, b: -110 }, k: 'maria' });
    s += anjo({ x: 570, y: 600, s: .96, face: 'joy', look: -.5, armR: { a: 150, b: -20 }, armL: { a: 30, b: 30 }, k: 'anjo' });
    s += flowerBand(152, 730, 790, 7, ['#f2c14e', '#ffffff', '#e86a9a']);
    return s;
  },
  setup(api) {
    api.tap(api.q('anjo'), 'Anjo Gabriel', () => { api.snd('choir'); api.burst(570, 360, 'spark', 12, { col: '#fff1b0' }); api.bubble(570, 270, 'Não tenhas medo, Maria!', { key: 'a' }); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('heart'); api.burst(300, 460, 'heart', 5); api.bubble(300, 430, 'Que aconteça como Deus quer!', { key: 'm' }); });
  }
});

/* =====================================================================
   2 — JOSÉ, O CARPINTEIRO
   ===================================================================== */
SCENES.push({
  key: 'jose', title: 'José, o carpinteiro', ref: 'Mateus 1.18-25', tint: 'dusk',
  text: [
    'José era carpinteiro: fazia coisas de madeira. Ia casar com Maria.',
    'Uma noite, um anjo falou com José num sonho:',
    { q: 'José, podes casar com Maria. O bebé vem de Deus!', who: 'anjo' },
    'José acordou e fez tudo o que o anjo disse.'
  ],
  fact: 'José cuidou de Jesus como um pai cuida do filho.',
  hint: 'Toca na nuvem do sonho e no José.',
  alt: 'Na oficina de carpintaria, à noite, José dorme numa esteira; uma nuvem de sonho mostra um anjo a falar com ele.',
  cue: [470, 300],
  art() {
    let s = `<defs>${lg('wall', [[0, '#5a4466'], [1, '#3e2f4a']])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('wall')}"/>` + aglowDefs();
    s += `<g transform="translate(640,170)"><rect x="-74" y="-60" width="148" height="120" rx="10" fill="#141a3d" stroke="${OL}" stroke-width="5"/>${starField(43, 12, -66, -52, 66, 52, { big: 0 })}${moon(30, -20, 16)}<path d="M0,-60 L0,60 M-74,0 L74,0" stroke="#6b4a5a" stroke-width="7"/></g>`;
    s += `<g transform="translate(140,250)">${limb(-40, 0, 80, 0, 10, '#8a5a33')}${limb(-30, 0, -30, 70, 5, '#6b4a33')}<g transform="translate(-10,0) rotate(12)">${limb(0, 0, 0, 64, 6, '#9a6b3e')}<rect x="-12" y="58" width="24" height="12" rx="3" fill="#8a8f9a" stroke="${OL}" stroke-width="2.6"/></g><g transform="translate(40,4)"><path d="M0,0 L0,58 L-30,82 L30,82 L0,58" fill="#cfd5dc" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/></g></g>`;
    s += `<rect x="-40" y="680" width="900" height="200" fill="#4a3446"/><path d="M-40,680 L840,680" stroke="${OL}" stroke-width="5"/>`;
    s += `<g transform="translate(600,680)"><rect x="-90" y="-60" width="180" height="22" rx="4" fill="#b07b4a" stroke="${OL}" stroke-width="3.4"/>${limb(-70, -38, -70, 0, 10, '#8a5a33')}${limb(70, -38, 70, 0, 10, '#8a5a33')}<path d="M-60,-62 L40,-62" stroke="#e3bd86" stroke-width="8"/><path d="M-80,-70 q10,-14 24,0 q10,-14 24,0" stroke="#e9cf73" stroke-width="4" fill="none"/></g>`;
    s += `<path d="M140,690 C200,664 460,664 520,690 Z" fill="#a8873a" stroke="${OL}" stroke-width="3.4"/>`;
    s += `<g transform="translate(320,670) rotate(-90)" data-k="dorme"><g>${jose({ x: 0, y: 95, s: .82, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>`;
    s += `<g data-k="acordado" opacity="0">${jose({ x: 330, y: 704, s: 1.02, face: 'grin', look: .4, armL: { a: 150, b: -20 }, armR: { a: 30, b: 40 } })}</g>`;
    s += `<g data-k="zz"><text class="zzz svgtxt" style="--d:3s" x="300" y="560" font-size="34" fill="#fffaf0">z</text><text class="zzz svgtxt" style="--d:3s;animation-delay:-1.5s" x="320" y="530" font-size="26" fill="#fffaf0">z</text></g>`;
    s += `<g transform="translate(470,300)" data-k="sonho"><g class="act">${blob([[-150, 10, 60], [-80, -50, 76], [10, -70, 84], [100, -40, 74], [150, 20, 56], [60, 40, 70], [-40, 40, 70]], '#f4f1fb', 4)}${[[-150, 120, 16], [-180, 170, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f4f1fb" stroke="${OL}" stroke-width="3"/>`).join('')}<g data-k="anjosonho" opacity=".2"><g transform="translate(0,90) scale(.5)">${anjo({ x: 0, y: 0, s: 1, face: 'joy', armR: { a: 150, b: -20 }, armL: { a: 30, b: 30 }, cls: '' })}</g></g>${hitC(0, -10, 150)}</g></g>`;
    return s;
  },
  setup(api) {
    const show = async () => {
      api.snd('choir', ['E4', 'G4', 'B4', 'E5']);
      await api.anim(api.q('anjosonho'), [{ opacity: .2 }, { opacity: 1 }], { duration: 900, fill: 'forwards' });
      api.burst(470, 260, 'spark', 8, { col: '#fff1b0' });
      api.bubble(470, 140, 'Não tenhas medo, José!', { key: 'a', below: false });
    };
    api.tap(api.q('sonho'), 'Sonho de José', show);
    api.tap(api.q('dorme'), 'José a dormir', async () => {
      if (api.st.awake) return;
      api.snd('snore');
      await api.wait(900);
      api.st.awake = true;
      api.q('dorme').setAttribute('opacity', '0'); api.q('zz').setAttribute('opacity', '0'); api.q('acordado').setAttribute('opacity', '1');
      api.snd('tada');
      api.bubble(330, 430, 'Eu vou cuidar de Maria e do bebé!', { key: 'j', dur: 3000 });
      api.nudgeNext(2600);
    });
    api.tap(api.q('acordado'), 'José', () => { api.snd('hello'); api.bubble(330, 430, 'Vou fazer o que Deus mandou!', { key: 'j' }); });
  }
});

/* =====================================================================
   3 — A VIAGEM PARA BELÉM
   ===================================================================== */
SCENES.push({
  key: 'viagem', title: 'A viagem para Belém', ref: 'Lucas 2.1-5', tint: 'sand',
  text: [
    'O imperador mandou contar todas as pessoas. Cada um tinha de ir para a cidade da sua família.',
    'Então José e Maria foram para Belém. Era uma viagem muito longa!'
  ],
  fact: 'José era da família do rei Davi. Por isso foram para Belém.',
  hint: 'Toca no burrinho para seguirem viagem.',
  alt: 'No fim da tarde, José caminha com um cajado, a puxar um burrinho; Maria vai montada nele. Ao longe, Belém aparece num monte.',
  cue: [400, 560],
  art() {
    let s = sky('sky', [[0, '#6f9fd8'], [.45, '#f6c99a'], [.7, '#fbe0b6'], [1, '#fbe0b6']]);
    s += sun(640, 330, 46, { fill: '#ffb84a', fill2: '#ffcf6e', glow: '#ffe2a8' });
    s += cloud(180, 140, .8, { fill: '#fff4e4', shade: '#f6cfae' }) + cloud(500, 100, .6, { fill: '#fff4e4', shade: '#f6cfae', dx: -24 });
    s += hill([[-40, 420], [160, 396], [360, 410], [560, 380], [840, 400]], '#d6b98a');
    s += `<g data-k="belem">${town(560, 330, .55)}${hitC(620, 330, 70)}</g>`;
    s += hill([[-40, 480], [200, 456], [420, 472], [640, 450], [840, 464]], '#c9a873');
    s += `<rect x="-40" y="520" width="900" height="340" fill="#e2cf9a"/><path d="M-40,760 C200,700 420,640 860,600 L860,640 C460,690 240,760 -40,820 Z" fill="#efdfb6"/>`;
    s += olive(110, 560, .8) + palm(760, 560, .55);
    const mariaRide = `<g transform="translate(-4,-94)">${maria({ x: 0, y: 0, s: .7, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: .4, armL: { a: 30, b: 50 }, armR: { a: 30, b: 50 } })}</g>`;
    s += `<g transform="translate(400,700) scale(.86)" data-k="burro"><g class="act">${equine({ x: 0, y: 0, s: 1, kind: 'donkey', cls: '' })}${mariaRide}${hitC(20, -120, 120)}</g></g>`;
    s += jose({ x: 580, y: 706, s: .96, legs: 'walk', face: 'smile', look: -.5, armL: { a: 70, b: 0 }, armR: { a: 12, item: ITEM.staff(200, 1) }, k: 'jose' });
    s += grassBand(161, 720, 790, 6, ['#a8a85a']);
    return s;
  },
  setup(api) {
    const b = api.q('burro');
    let steps = 0;
    api.tap(b, 'Burrinho com Maria', async () => {
      if (api.st.busy) return; api.st.busy = true;
      api.snd('heehaw');
      steps++;
      const dx = Math.min(steps, 3) * 40;
      api.anim(api.act(b), [{ transform: `translateX(${(dx - 40) / .86}px) translateY(0px)` }, { transform: `translateX(${(dx - 20) / .86}px) translateY(-8px)` }, { transform: `translateX(${dx / .86}px) translateY(0px)` }], { duration: 700, fill: 'forwards' });
      api.anim(api.act(api.q('jose')), [{ transform: `translateX(${(dx - 40) / .96}px)` }, { transform: `translateX(${dx / .96}px)` }], { duration: 700, fill: 'forwards' });
      await api.wait(700);
      if (steps === 3) { api.bubble(580, 430, 'Olha, Maria! Belém já está perto!', { key: 'j', dur: 3000 }); api.nudgeNext(2400); }
      api.st.busy = false;
    });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(580, 430, 'Falta pouco, Maria!', { key: 'j' }); });
    api.tap(api.q('belem'), 'Belém', () => { api.snd('twinkle'); api.burst(620, 320, 'spark', 8, { col: '#fff1b0' }); api.bubble(620, 240, 'Belém!', { key: 'b', size: 28 }); });
  }
});

/* =====================================================================
   4 — NÃO HÁ LUGAR
   ===================================================================== */
SCENES.push({
  key: 'lugar', title: 'Não há lugar!', ref: 'Lucas 2.6-7', tint: 'night',
  text: [
    'Belém estava cheia de gente! José bateu a muitas portas. Toc, toc!',
    'Mas não havia lugar para eles. Então ficaram num sítio onde dormiam os animais.'
  ],
  fact: 'Naquele tempo, muitas casas tinham um cantinho para os animais dormirem.',
  hint: 'Toca nas portas para o José bater.',
  alt: 'À noite, numa rua de Belém, José e Maria procuram lugar; três casas têm portas fechadas e janelas iluminadas.',
  cue: [200, 520],
  art() {
    let s = nightSky(47, { h: 300 });
    s += moon(680, 100, 30);
    const doors = [[200, 'p0'], [420, 'p1'], [640, 'p2']];
    s += `<rect x="-40" y="600" width="900" height="300" fill="#4a4a6a"/><g opacity=".5">${[[80, 640], [260, 700], [500, 660], [700, 720]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="8" fill="#5a5a7c"/>`).join('')}</g>`;
    doors.forEach(([x, k], i) => {
      s += house(x - 100, 600, 200, 300 - i * 20, { wall: ['#c9b48c', '#bfa983', '#cbb690'][i], shade: '#a8946e', roof: '#d6c29a', winCol: '#ffd66b', door: false, sw: 3 });
      s += `<g transform="translate(${x},600)" data-k="${k}"><g class="act"><path d="M-36,0 L-36,-110 Q0,-140 36,-110 L36,0 Z" fill="#5a3a26" stroke="${OL}" stroke-width="3.4"/><circle cx="22" cy="-50" r="4" fill="#f2c14e"/>${hitC(0, -60, 60)}</g></g>`;
      s += `<g data-k="${k}face" opacity="0"><g transform="translate(${x + 56},${600 - (300 - i * 20) * .62})"><rect x="-24" y="-22" width="48" height="44" rx="4" fill="#ffd66b" stroke="${OL}" stroke-width="3"/><circle cx="0" cy="-2" r="13" fill="${['#d99a6c', '#c98a5a', '#e2a878'][i]}" stroke="${OL}" stroke-width="2.6"/><path d="M-5,-4 l0,2 M5,-4 l0,2" stroke="${OL}" stroke-width="2.6" stroke-linecap="round"/><path d="M-5,6 q5,${i === 2 ? 4 : -3} 10,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g></g>`;
    });
    s += `<g transform="translate(760,610)">${lantern(0, -110)}<path d="M-60,0 L-60,-70 L60,-70 L60,0 Z" fill="#7a5034" stroke="${OL}" stroke-width="3"/><path d="M-70,-70 L0,-110 L70,-70 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/></g>`;
    s += maria({ x: 300, y: 720, s: .82, face: 'worry', look: -.3, armL: { a: -30, b: -80 }, armR: { a: -30, b: -80 }, k: 'maria' });
    s += jose({ x: 130, y: 724, s: .9, face: 'worry', look: .3, armR: { a: 40, b: 30 }, armL: { a: 12, item: ITEM.staff(200, 1) }, k: 'jose' });
    return s;
  },
  setup(api) {
    const said = [N('Não há lugar aqui!'), N('Aqui também não!'), N('Não tenho quarto... mas podem ficar com os animais!')];
    let n = 0;
    ['p0', 'p1', 'p2'].forEach((k, i) => api.tap(api.q(k), 'Porta', async () => {
      api.snd('knock', 3);
      api.hop(api.q('jose'), 8);
      await api.wait(600);
      api.anim(api.q(k + 'face'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd(i === 2 ? 'chime' : 'hm', i === 2 ? 'E6' : undefined);
      const [x] = api.pos(api.q(k));
      api.bubble(x, 300, said[i], { key: 'd', dur: 2800 });
      if (!api.q(k).dataset.ok) { api.q(k).dataset.ok = 1; n++; }
      if (i === 2) api.later(() => { api.bubble(760, 380, 'Vamos para lá!', { key: 'm', size: 26 }); api.nudgeNext(1200); }, 2900);
    }));
    api.tap(api.q('maria'), 'Maria', () => { api.snd('hm'); api.bubble(300, 460, 'Estou cansada, José.', { key: 'm' }); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(140, 440, 'Vamos encontrar um lugar!', { key: 'j' }); });
  }
});

/* =====================================================================
   5 — JESUS NASCEU!
   ===================================================================== */
SCENES.push({
  key: 'nasceu', title: 'Jesus nasceu!', ref: 'Lucas 2.6-7', tint: 'gold',
  text: [
    'Ali, naquela noite, Jesus nasceu!',
    'Maria embrulhou o bebé em paninhos e deitou-o numa manjedoura, a caixinha onde os animais comiam.'
  ],
  fact: 'O nome Jesus quer dizer «Deus salva».',
  hint: 'Toca no bebé Jesus e nos animais.',
  alt: 'Dentro do estábulo, à luz de uma lamparina, Maria e José olham para o bebé Jesus deitado na manjedoura; um burrinho, uma vaca e ovelhas estão por perto.',
  cue: [400, 600],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#1d2454"/>${starField(53, 30, 0, 0, 800, 240, { big: .1 })}`;
    s += stable({ window: bigStar(30, -20, 10, 'estrela').replace('data-k="estrela"', 'data-k="estrela"') });
    s += lantern(170, 330, 'lampada');
    s += manger(400, 702, 1.2, true, 'bebe');
    s += maria({ x: 250, y: 706, s: 1, legs: 'kneel', face: 'smile', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'maria' });
    s += jose({ x: 560, y: 704, s: 1.02, face: 'smile', look: -.6, armL: { a: 12, item: ITEM.staff(220, 1) }, armR: { a: 30, b: 40 }, k: 'jose' });
    s += equine({ x: 160, y: 690, s: .5, kind: 'donkey', k: 'burro' }) + cow({ x: 668, y: 690, s: .48, flip: true, k: 'vaca' });
    s += sheep({ x: 300, y: 742, s: .62, pose: 'lie', k: 'ove' }) + sheep({ x: 520, y: 750, s: .58, pose: 'lie', flip: true, face: '#f1d2bb', k: 'ove2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('bebe'), 'Bebé Jesus', () => { api.snd('lullaby'); api.burst(404, 560, 'heart', 6); api.bubble(400, 470, 'Jesus nasceu!', { key: 'b' }); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('heart'); api.burst(250, 470, 'heart', 3); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(560, 430, 'Que bebé tão lindo!', { key: 'j' }); });
    api.tap(api.q('burro'), 'Burrinho', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
    api.tap(api.q('vaca'), 'Vaca', () => { api.snd('moo'); api.hop(api.q('vaca'), 10); });
    for (const k of ['ove', 'ove2']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat', 1.25); api.hop(api.q(k), 10); });
    api.tap(api.q('lampada'), 'Lamparina', () => { api.snd('chime', 'A5'); api.burst(170, 340, 'spark', 6, { col: '#ffd88a' }); });
    api.tap(api.q('estrela'), 'Estrela', () => { api.snd('twinkle'); api.burst(430, 300, 'spark', 8, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   6 — PASTORES NO CAMPO
   ===================================================================== */
SCENES.push({
  key: 'pastores', title: 'Pastores no campo', ref: 'Lucas 2.8', tint: 'night',
  text: [
    'Perto de Belém, uns pastores cuidavam das ovelhas no campo.',
    'Era uma noite muito sossegada. Shhh...'
  ],
  fact: 'O rei Davi também foi pastor nos campos de Belém!',
  hint: 'Toca nos pastores e nas ovelhas.',
  alt: 'À noite, num campo perto de Belém, três pastores aquecem-se numa fogueira enquanto as ovelhas dormem sob as estrelas.',
  cue: [380, 610],
  art() {
    let s = nightSky(59, { n: 80, h: 440 });
    s += moon(130, 120, 32);
    s += hill([[-40, 470], [140, 440], [330, 462], [520, 432], [700, 452], [840, 440]], '#2b416c');
    s += town(560, 414, .5, { wall: '#4a5582', shade: '#3c456e', roof: '#57628f', winCol: '#ffd66b', doorCol: '#2b304f', sw: 2 });
    s += hill([[-40, 560], [200, 530], [420, 548], [640, 520], [840, 540]], '#244a5b') + hill([[-40, 630], [220, 610], [460, 624], [700, 602], [840, 616]], '#2c584f');
    s += campfire(380, 680, .82);
    s += person(Object.assign({}, PASTORES[0], { x: 230, y: 706, s: .94, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: .6, armL: { a: -20, b: -60 }, armR: { a: 20, item: ITEM.staff(200, -1) }, k: 'pa0' }));
    s += person(Object.assign({}, PASTORES[1], { x: 540, y: 706, s: .92, face: 'smile', look: -.5, armL: { a: 10, item: ITEM.staff(210, 1) }, armR: { a: 30, b: 40 }, k: 'pa1' }));
    s += person(Object.assign({}, PASTORES[2], { x: 460, y: 730, s: .9, legs: 'sit', face: 'joy', look: -.3, armL: { a: -20, b: -70 }, armR: { a: -20, b: -70 }, k: 'pa2' }));
    s += sheep({ x: 130, y: 740, s: .82, pose: 'sleep', k: 'o1', wool: '#e9ecf6' }) + sheep({ x: 680, y: 720, s: .74, pose: 'sleep', flip: true, k: 'o2', wool: '#e3e7f3' }) + sheep({ x: 300, y: 762, s: .6, pose: 'sleep', face: '#f1d2bb', k: 'o3', wool: '#e9ecf6' });
    for (let i = 0; i < 6; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${80 + i * 120}" cy="${600 + (i % 3) * 22}" r="3" fill="#f6f39a"/>`;
    return s;
  },
  setup(api) {
    const said = [N('Que noite tranquila!'), N('As ovelhas estão a dormir.'), N('Olha quantas estrelas!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('pa' + i), 'Pastor', () => { const [x] = api.pos(api.q('pa' + i)); api.snd('hello'); api.hop(api.q('pa' + i), 10); api.bubble(x, 440, said[i], { key: 'p' }); });
    for (const k of ['o1', 'o2', 'o3']) api.tap(api.q(k), 'Ovelha a dormir', () => { const [x, y, sc] = api.pos(api.q(k)); api.snd('snore'); api.bubble(x, y - 70 * sc, 'Zzz...', { key: k, size: 24, dur: 1200 }); });
    api.tap(api.q('fire'), 'Fogueira', () => { api.snd('pour'); api.burst(380, 600, 'spark', 6, { col: '#ffb24a' }); });
  }
});

/* =====================================================================
   7 — UMA NOTÍCIA DE ALEGRIA
   ===================================================================== */
SCENES.push({
  key: 'noticia', title: 'Uma notícia de alegria', ref: 'Lucas 2.9-12', tint: 'gold',
  text: [
    'De repente, apareceu um anjo, e uma luz brilhou! Os pastores ficaram com medo. Mas o anjo disse:',
    { q: 'Não tenham medo! Hoje nasceu o Salvador! Vão encontrar o bebé deitado numa manjedoura.', who: 'anjo' }
  ],
  hint: 'Toca no anjo.',
  alt: 'Um anjo brilhante aparece no céu da noite; os pastores, de joelhos, protegem os olhos da luz forte, e as ovelhas olham para cima.',
  cue: [420, 300],
  art() {
    let s = nightSky(61, { n: 60, h: 440 }) + aglowDefs();
    s += `<defs>${rg('gloria', [[0, '#fff6c8', .9], [.5, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs><circle data-k="luz" cx="420" cy="300" r="380" fill="${UR('gloria')}" opacity=".55"/>`;
    s += hill([[-40, 520], [200, 490], [420, 508], [640, 480], [840, 500]], '#2a4d62') + hill([[-40, 610], [220, 588], [460, 602], [700, 580], [840, 594]], '#2f5d55');
    s += anjo({ x: 420, y: 440, s: 1.0, face: 'joy', look: 0, armL: { a: 140, b: -20 }, armR: { a: 140, b: -20 }, k: 'anjo' });
    s += person(Object.assign({}, PASTORES[0], { x: 160, y: 704, s: .88, legs: 'kneel', face: 'surprise', look: .6, armL: { a: 120, b: -60 }, armR: { a: 150, b: -60 }, k: 'pa0' }));
    s += person(Object.assign({}, PASTORES[1], { x: 640, y: 704, s: .9, legs: 'kneel', face: 'scared', look: -.6, armL: { a: 150, b: -60 }, armR: { a: 120, b: -60 }, k: 'pa1' }));
    s += person(Object.assign({}, PASTORES[2], { x: 290, y: 730, s: .86, face: 'o', look: .4, armL: { a: 150, b: -10 }, armR: { a: 30, b: 40 }, k: 'pa2' }));
    s += sheep({ x: 480, y: 742, s: .72, k: 'o1' }) + sheep({ x: 560, y: 760, s: .6, flip: true, face: '#f1d2bb', k: 'o2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('anjo'), 'Anjo', () => {
      api.snd('choir');
      api.anim(api.q('luz'), [{ opacity: .55 }, { opacity: 1 }, { opacity: .8 }], { duration: 1600, fill: 'forwards' });
      api.burst(420, 240, 'spark', 14, { col: '#fff1b0' });
      api.bubble(420, 140, 'Hoje nasceu o Salvador!', { key: 'a', below: true, dur: 3000 });
    });
    for (let i = 0; i < 3; i++) api.tap(api.q('pa' + i), 'Pastor', () => { const [x] = api.pos(api.q('pa' + i)); api.snd('gulp'); api.bubble(x, 470, ['Um anjo!', 'Que luz forte!', 'Uau!'][i], { key: 'p', size: 28 }); });
    for (const k of ['o1', 'o2']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat', 1.1); api.hop(api.q(k), 12); });
  }
});

/* =====================================================================
   8 — GLÓRIA A DEUS!
   ===================================================================== */
const CORO = [[140, 300, .5], [270, 210, .56], [400, 160, .62], [530, 210, .56], [660, 300, .5], [210, 420, .44], [590, 420, .44]];
SCENES.push({
  key: 'gloria', title: 'Glória a Deus!', ref: 'Lucas 2.13-14', tint: 'gold',
  text: [
    'Então apareceram muitos, muitos anjos, a cantar:',
    { q: 'Glória a Deus no céu, e paz na terra!', who: 'anjo' }
  ],
  fact: 'Os anjos cantaram de alegria porque Jesus nasceu!',
  hint: 'Toca nos anjos para eles cantarem.',
  alt: 'O céu da noite enche-se de anjos brilhantes a cantar; lá em baixo, os pastores olham maravilhados.',
  cue: [400, 160],
  art() {
    let s = sky('sky', [[0, '#2a3478'], [.6, '#5a5fa0'], [1, '#6d6aa8']]) + aglowDefs();
    s += starField(67, 60, 0, 0, 800, 520, { big: .12 });
    s += `<defs>${rg('ceu', [[0, '#fff6c8', .7], [.6, '#ffe28a', .2], [1, '#ffe28a', 0]])}</defs><circle data-k="luz" cx="400" cy="260" r="420" fill="${UR('ceu')}" opacity=".5"/>`;
    CORO.forEach(([x, y, sc], i) => s += anjo({ x, y: y + 230 * sc, s: sc, face: i % 2 ? 'joy' : 'open', look: (400 - x) / 400, armL: { a: 140 - i * 5, b: -20 }, armR: { a: 140 - i * 5, b: -20 }, k: 'an' + i }));
    s += hill([[-40, 640], [200, 610], [420, 628], [640, 600], [840, 620]], '#2a4d62') + hill([[-40, 720], [240, 700], [480, 714], [720, 692], [840, 706]], '#2f5d55');
    s += PASTORES.map((p, i) => person(Object.assign({}, p, { x: 300 + i * 100, y: 752, s: .5, face: 'o', look: 0, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 } }))).join('');
    return s;
  },
  setup(api) {
    const NOTES = ['C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'A5'];
    const sung = new Set();
    CORO.forEach(([x, y, sc], i) => api.tap(api.q('an' + i), 'Anjo a cantar', async () => {
      api.snd('chime', NOTES[i]); api.snd('choir', [NOTES[i].replace(/\d/, '4'), NOTES[i]]);
      api.burst(x, y, 'note', 2);
      api.hop(api.q('an' + i), 14);
      sung.add(i);
      if (sung.size === CORO.length && !api.st.done) {
        api.st.done = true;
        await api.wait(900);
        api.snd('choir', ['C4', 'G4', 'C5', 'E5', 'G5', 'C6']);
        api.anim(api.q('luz'), [{ opacity: .5 }, { opacity: 1 }], { duration: 1400, fill: 'forwards' });
        api.burst(400, 300, 'spark', 16, { col: '#fff1b0' });
        api.bubble(400, 470, 'Glória a Deus nas alturas!', { key: 'g', dur: 3200 });
        api.nudgeNext(2400);
      }
    }));
  }
});

/* =====================================================================
   9 — OS PASTORES VISITAM JESUS
   ===================================================================== */
SCENES.push({
  key: 'visita', title: 'Os pastores visitam Jesus', ref: 'Lucas 2.15-20', tint: 'night',
  text: [
    'Os pastores correram para Belém. E encontraram Maria, José e o bebé na manjedoura, tal e qual como o anjo disse!',
    'Depois, foram contar a notícia a toda a gente!'
  ],
  hint: 'Toca nos pastores e no carneirinho.',
  alt: 'No estábulo, os pastores ajoelham-se diante do bebé Jesus na manjedoura; um pastorzinho traz um carneirinho ao colo; Maria e José sorriem.',
  cue: [600, 560],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#1d2454"/>${starField(71, 30, 0, 0, 800, 240, { big: .1 })}`;
    s += stable({ window: bigStar(0, -10, 10, 'estrela') });
    s += manger(330, 702, 1.1, true, 'bebe');
    s += maria({ x: 170, y: 706, s: .92, legs: 'kneel', face: 'smile', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'maria' });
    s += jose({ x: 250, y: 690, s: .82, face: 'smile', look: .5, armL: { a: 12, item: ITEM.staff(220, -1) }, armR: { a: 20 }, k: 'jose' });
    s += person(Object.assign({}, PASTORES[0], { x: 490, y: 706, s: .9, legs: 'kneel', face: 'joy', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'pa0' }));
    const lamb = `<g transform="translate(-4,-50)"><g data-k="carneiro">${sheep({ x: 0, y: 26, s: .42, face: '#f1d2bb', flip: true })}</g></g>`;
    s += person(Object.assign({}, PASTORES[2], { x: 610, y: 712, s: 1.04, face: 'joy', look: -.6, front: lamb, armL: { a: -28, b: -72 }, armR: { a: -28, b: -72 }, k: 'pa2' }));
    s += person(Object.assign({}, PASTORES[1], { x: 690, y: 700, s: .86, face: 'grin', look: -.6, armL: { a: 12, item: ITEM.staff(210, -1) }, armR: { a: 20 }, k: 'pa1' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('bebe'), 'Bebé Jesus', () => { api.snd('lullaby'); api.burst(334, 560, 'heart', 6); });
    const said = { pa0: N('É o Salvador!'), pa1: N('Vamos contar a toda a gente!'), pa2: N('Trouxe um carneirinho para o bebé!') };
    for (const k of ['pa0', 'pa1', 'pa2']) api.tap(api.q(k), 'Pastor', () => { const [x] = api.pos(api.q(k)); api.snd('hello'); api.hop(api.q(k), 10); api.bubble(x, 420, said[k], { key: 'p' }); });
    api.tap(api.q('carneiro'), 'Carneirinho', () => { api.snd('bleat', 1.45); api.burst(610, 560, 'heart', 3); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('heart'); api.burst(170, 470, 'heart', 3); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(250, 420, 'Bem-vindos!', { key: 'j' }); });
    api.tap(api.q('estrela'), 'Estrela', () => { api.snd('twinkle'); api.burst(400, 310, 'spark', 8, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   10 — UMA ESTRELA DIFERENTE
   ===================================================================== */
SCENES.push({
  key: 'estrela', title: 'Uma estrela diferente', ref: 'Mateus 2.1-2', tint: 'dusk',
  text: [
    'Muito longe dali, uns homens sábios viram uma estrela diferente no céu.',
    'Perceberam que um grande rei tinha nascido. E foram atrás da estrela.'
  ],
  fact: 'A Bíblia não diz quantos sábios eram. Como foram três presentes, muita gente imagina que eram três.',
  hint: 'Toca na estrela e nos camelos.',
  alt: 'No deserto, à noite, três homens sábios em camelos seguem uma estrela muito brilhante.',
  cue: [560, 170],
  art() {
    let s = nightSky(73, { stops: [[0, '#151c50'], [.6, '#3a3f86'], [1, '#6a5a9a']], n: 70, h: 480 });
    s += bigStar(560, 170, 30, 'estrela');
    s += dunes();
    s += palm(110, 560, .6);
    const rider = (m, i) => `<g transform="translate(-6,-170)">${person(Object.assign({}, m, { s: .62, legs: 'sit', drop: 30, hemY: -62, face: i === 1 ? 'grin' : 'smile', look: .6, armL: { a: 40, b: 40 }, armR: { a: i === 0 ? 140 : 40, b: i === 0 ? -30 : 40 } }))}</g>`;
    [[180, 700, .7], [380, 690, .64], [560, 700, .7]].forEach(([x, y, sc], i) => s += `<g transform="translate(${x},${y}) scale(${sc})" data-k="cam${i}"><g class="act"><g class="bob" style="${dl(2)}">${camel({ x: 0, y: 0, s: 1, cls: '', saddle: ['#7b4c93', '#2f8a5a', '#b8312f'][i] })}${rider(MAGOS[i], i)}${hitC(30, -160, 140)}</g></g></g>`);
    return s;
  },
  setup(api) {
    api.tap(api.q('estrela'), 'Estrela', () => {
      api.snd('twinkle');
      api.anim(api.act(api.q('estrela')), [{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
      api.burst(560, 170, 'spark', 14, { col: '#fff1b0' });
      api.bubble(400, 330, 'Vamos seguir a estrela!', { key: 's' });
    });
    let walked = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('cam' + i), 'Camelo com um sábio', async () => {
      const el = api.q('cam' + i);
      api.snd('grunt');
      if (el.dataset.w) { api.hop(el, 10); return; }
      el.dataset.w = 1; walked++;
      api.anim(api.act(el), [{ transform: 'translateX(0px)' }, { transform: 'translateX(40px) translateY(-6px)', offset: .5 }, { transform: 'translateX(80px)' }], { duration: 1200, fill: 'forwards' });
      const [x] = api.pos(el);
      api.bubble(x + 40, 400, ['Para o oeste!', 'Que estrela linda!', 'Um rei nasceu!'][i], { key: 'c', size: 26 });
      if (walked === 3) api.nudgeNext(1600);
    });
  }
});

/* =====================================================================
   11 — PRESENTES PARA O REI
   ===================================================================== */
SCENES.push({
  key: 'presentes', title: 'Presentes para o Rei', ref: 'Mateus 2.9-11', tint: 'rose',
  text: [
    'A estrela parou em cima da casa onde estava Jesus.',
    'Os sábios ajoelharam-se e adoraram Jesus. E deram-lhe presentes: ouro, incenso e mirra.'
  ],
  fact: 'Incenso e mirra eram perfumes caros, presentes para um rei.',
  hint: 'Toca nos presentes para os abrires.',
  alt: 'Numa casa iluminada, Maria tem o menino Jesus ao colo; três sábios ajoelhados oferecem um baú de ouro, um pote de incenso e um frasco de mirra.',
  cue: [440, 640],
  art() {
    let s = `<defs>${lg('wall', [[0, '#d9b98a'], [1, '#c9a576']])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('wall')}"/>`;
    s += `<g opacity=".35">${[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3, 4, 5, 6, 7].map(c => `<rect x="${-40 + c * 120 + (r % 2 ? 60 : 0)}" y="${r * 80}" width="112" height="72" rx="6" fill="#c49c66"/>`).join('')).join('')}</g>`;
    s += `<g transform="translate(560,190)"><rect x="-90" y="-80" width="180" height="160" rx="12" fill="#141a3d" stroke="${OL}" stroke-width="6"/>${starField(79, 10, -84, -74, 84, 74, { big: 0 })}${bigStar(0, -10, 14, 'estrela')}<path d="M0,-80 L0,80 M-90,0 L90,0" stroke="#8a5a33" stroke-width="8"/></g>`;
    s += `<rect x="-40" y="660" width="900" height="240" fill="#a8703f"/><path d="M-40,660 L840,660" stroke="${OL}" stroke-width="5"/><path d="M80,700 L420,700 L460,780 L40,780 Z" fill="#b8312f" stroke="${OL}" stroke-width="3"/>`;
    s += `<g transform="translate(160,668)"><rect x="-74" y="-40" width="148" height="40" rx="10" fill="#8a5a33" stroke="${OL}" stroke-width="3.4"/><path d="M-66,-30 L66,-30" stroke="#a46e3c" stroke-width="4"/></g>`;
    const kid = `<g transform="translate(10,-44)"><g data-k="jesus">${person({ kind: 'child', x: 0, y: 0, s: .6, skin: '#e3a675', hairStyle: 'curly', hair: '#5a3020', hi: '#8e4b2a', tunic: '#fffdf6', belt: '#f2c14e', legs: 'sit', face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 40, b: 40 } })}<circle cx="0" cy="-90" r="60" fill="#fff6c8" opacity=".25"/></g></g>`;
    s += maria({ x: 160, y: 668, s: .96, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: .5, front: kid, armL: { a: -24, b: -76 }, armR: { a: -24, b: -76 }, k: 'maria' });
    s += jose({ x: 60, y: 660, s: .78, face: 'smile', look: .6, armL: { a: 12 }, armR: { a: 20 }, k: 'jose' });
    const kneel = [[380, 706, .9], [520, 712, .88], [660, 702, .9]];
    MAGOS.forEach((m, i) => { const [x, y, sc] = kneel[i]; s += person(Object.assign({}, m, { x, y, s: sc, legs: 'kneel', face: 'joy', look: -.6, armL: { a: -50, b: -50 }, armR: { a: -50, b: -50 }, k: 'mago' + i })); });
    s += gift(330, 742, 'ouro', 'g0') + gift(470, 750, 'incenso', 'g1') + gift(610, 742, 'mirra', 'g2');
    return s;
  },
  setup(api) {
    const names = [N('Ouro!'), N('Incenso!'), N('Mirra!')];
    const opened = new Set();
    for (let i = 0; i < 3; i++) {
      const g = api.q('g' + i);
      api.tap(g, trf('Presente: {n}', { n: tr(names[i]).replace(/[¡!]/g, '').trim() }), async () => {
        const [x, y] = api.pos(g);
        api.snd('gift');
        api.anim(g.querySelector('[data-p="lid"]'), [{ transform: 'translateY(0px) rotate(0deg)' }, { transform: 'translateY(-24px) rotate(-18deg)' }, { transform: 'translateY(-10px) rotate(-12deg)' }], { duration: 600, fill: 'forwards' });
        api.burst(x, y - 50, 'spark', 10, { col: i === 0 ? '#ffd84a' : i === 1 ? '#e6e3ef' : '#f3b2c2' });
        api.bubble(x, y - 110, names[i], { key: 'g', size: 30, dur: 1600 });
        opened.add(i);
        if (opened.size === 3 && !api.st.done) { api.st.done = true; await api.wait(1400); api.snd('tada'); api.bubble(400, 300, 'Presentes para o Rei Jesus!', { key: 'end', dur: 3000 }); api.nudgeNext(2400); }
      });
    }
    api.tap(api.q('jesus'), 'Menino Jesus', () => { api.snd('heart'); api.burst(170, 500, 'heart', 5); api.bubble(170, 400, 'O Rei Jesus!', { key: 'k', size: 28 }); });
    api.tap(api.q('estrela'), 'Estrela', () => { api.snd('twinkle'); api.burst(560, 180, 'spark', 8, { col: '#fff1b0' }); });
    for (let i = 0; i < 3; i++) api.tap(api.q('mago' + i), 'Sábio', () => { const [x] = api.pos(api.q('mago' + i)); api.snd('hm'); api.bubble(x, 420, ['Viemos adorar o Rei!', 'Seguimos a estrela!', 'Que alegria!'][i], { key: 'm', size: 26 }); });
  }
});

/* =====================================================================
   12 — O MAIOR PRESENTE
   ===================================================================== */
SCENES.push({
  key: 'presente', title: 'O maior presente', ref: 'João 3.16', tint: 'gold',
  text: [
    'Jesus é o presente de Deus para toda a gente! A Bíblia diz:',
    { q: 'Deus amou tanto o mundo que deu o seu Filho.', who: 'deus' },
    'E Deus também te ama!'
  ],
  hint: 'Toca na estrela.',
  alt: 'Todos juntos à volta do bebé Jesus na manjedoura: Maria, José, os pastores, os sábios e os animais, debaixo de uma grande estrela brilhante.',
  cue: [400, 130],
  art() {
    let s = nightSky(83, { n: 50, h: 300 });
    s += bigStar(400, 130, 28, 'estrela');
    s += `<g data-k="faixa" opacity="0"><g transform="translate(400,286)"><path d="M-250,-30 L250,-30 L230,0 L250,30 L-250,30 L-230,0 Z" fill="#d9433b" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><text x="0" y="13" text-anchor="middle" font-size="40" class="svgtxt" fill="#fffaf0">${tr('Jesus nasceu!')}</text></g></g>`;
    s += hill([[-40, 470], [200, 440], [420, 460], [640, 432], [840, 452]], '#2b416c') + `<rect x="-40" y="520" width="900" height="400" fill="#7a5034"/><path d="M-40,520 L840,520" stroke="${OL}" stroke-width="4"/>`;
    s += `<rect x="-40" y="690" width="900" height="200" fill="#c9a873"/>`;
    s += manger(400, 706, 1, true, 'bebe');
    s += maria({ x: 290, y: 708, s: .82, legs: 'kneel', face: 'joy', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'p0' });
    s += jose({ x: 510, y: 706, s: .82, face: 'joy', look: -.6, armL: { a: 12, item: ITEM.staff(200, 1) }, armR: { a: 150, b: -20 }, k: 'p1' });
    s += person(Object.assign({}, MAGOS[0], { x: 170, y: 700, s: .7, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 20 }, k: 'p2' }));
    s += person(Object.assign({}, PASTORES[1], { x: 630, y: 700, s: .72, face: 'joy', look: -.5, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'p3' }));
    s += person(Object.assign({}, PASTORES[2], { x: 700, y: 730, s: .8, face: 'joy', look: -.5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'p4' }));
    s += person(Object.assign({}, MAGOS[1], { x: 96, y: 716, s: .68, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'p5' }));
    s += sheep({ x: 350, y: 760, s: .6, pose: 'lie', k: 'ove' }) + equine({ x: 570, y: 770, s: .4, kind: 'donkey', flip: true, k: 'burro' });
    return s;
  },
  setup(api) {
    api.tap(api.q('estrela'), 'Estrela', async () => {
      api.snd('twinkle'); api.snd('choir', ['C4', 'E4', 'G4', 'C5', 'E5']);
      api.burst(400, 130, 'star', 12, { col: '#ffe08a' });
      for (let i = 0; i < 6; i++) api.later(() => api.burst(140 + i * 104, 200 + (i % 2) * 40, 'spark', 4, { col: '#fff1b0' }), i * 140);
      if (!api.st.f) { api.st.f = true; api.anim(api.q('faixa'), [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 600, fill: 'forwards' }); }
    });
    api.tap(api.q('bebe'), 'Bebé Jesus', () => { api.snd('lullaby'); api.burst(404, 580, 'heart', 7); });
    for (let i = 0; i < 6; i++) api.tap(api.q('p' + i), 'Pessoa a festejar', () => { const [x] = api.pos(api.q('p' + i)); api.snd('clap'); api.hop(api.q('p' + i), 14); api.burst(x, 440, 'heart', 3); });
    api.tap(api.q('ove'), 'Ovelha', () => { api.snd('bleat', 1.2); api.hop(api.q('ove'), 10); });
    api.tap(api.q('burro'), 'Burrinho', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Belém dorme debaixo de um céu estrelado; uma estrela grande brilha sobre o estábulo iluminado.',
  cue: [560, 140],
  questions: [
    ['Que anjo visitou Maria?', 'O anjo Gabriel.'],
    ['Em que cidade nasceu Jesus?', 'Em Belém.'],
    ['Onde é que Maria deitou o bebé?', 'Numa manjedoura.'],
    ['Quem visitou Jesus naquela noite?', 'Os pastores.'],
    ['Qual é o maior presente de Deus?', 'Jesus!']
  ],
  wrong: [
    ['O anjo Miguel.', 'Um pastor.', 'Um rei.'],
    ['Em Nazaré.', 'Em Jerusalém.', 'Em Roma.'],
    ['Numa cama de ouro.', 'Num barco.', 'Num cesto no rio.'],
    ['Os soldados.', 'Os pescadores.', 'O rei Herodes.'],
    ['Uma coroa.', 'Muitos brinquedos.', 'Uma estrela.']
  ],
  verse: ['Hoje nasceu o vosso Salvador: Cristo, o Senhor!', 'Lucas 2.11'],
  art() {
    let s = nightSky(89, { n: 80, h: 440 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += bigStar(560, 150, 22, 'grande');
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 480], [140, 450], [330, 470], [520, 440], [700, 460], [840, 450]], '#2b416c');
    s += town(120, 470, .62, { wall: '#4a5582', shade: '#3c456e', roof: '#57628f', winCol: '#ffd66b', doorCol: '#2b304f', sw: 2 });
    s += `<g transform="translate(560,560)"><path d="M-90,0 L-90,-70 L90,-70 L90,0 Z" fill="#5a4a6a" stroke="${OL}" stroke-width="3"/><path d="M-110,-66 L0,-130 L110,-66 Z" fill="#8a7a9a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><rect x="-40" y="-56" width="80" height="56" fill="#ffd66b" stroke="${OL}" stroke-width="3"/><circle cx="0" cy="-30" r="90" fill="#ffd66b" opacity=".18"/></g>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += sheep({ x: 260, y: 740, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('grande'), 'Estrela de Belém', () => { api.snd('twinkle'); api.burst(560, 150, 'spark', 12, { col: '#fff1b0' }); });
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(280, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'natal',
  title: 'O Nascimento de Jesus',
  cover: { kicker: 'Uma história da Bíblia', pre: 'O Nascimento de', title: 'Jesus', sub: 'O maior presente de Deus para o mundo' },
  color: '#2c2f73',
  ref: 'Lucas 1 e 2; Mateus 1 e 2',
  scenes: SCENES
});
})();
