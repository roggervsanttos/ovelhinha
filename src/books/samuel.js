/* =====================================================================
   LIVRO: SAMUEL, O MENINO QUE OUVIU DEUS  (1 Samuel 1 a 3)
   ===================================================================== */
(() => {
const SCENES = [];
const ANA = { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#5872b8' };
const ELCANA = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#efe2c4', bandCol: '#7a5a8a', tunic: '#7a5a8a', belt: '#e9c46a' };
const ELI = { kind: 'adult', skin: '#d39463', hair: '#e9e4dc', beard: 'long', beardCol: '#f4f1ea', browCol: '#cfc9c0', head: 'cloth', clothCol: '#fbf6ea', bandCol: '#d9a33a', tunic: '#fbf6ea', longSleeves: true, cloak: '#3f6fb5', cloakTrim: '#f2c14e', belt: '#d9a33a', trim: '#3f6fb5' };
const SAMUEL = { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#3f93c7', stripes: '#f2c14e', belt: '#7b4a2a' };
const SAMUEL_GRANDE = { kind: 'adult', skin: '#d39463', hair: '#2b1d17', hairStyle: 'short', beard: 'short', beardCol: '#2b1d17', tunic: '#3f93c7', stripes: '#f2c14e', cloak: '#fbf6ea', cloakTrim: '#d9a33a', belt: '#7b4a2a' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5e9a43', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5e9a43' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#e5483f', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' }
];
const ana = o => person(Object.assign({}, ANA, o));
const eli = o => person(Object.assign({}, ELI, o));
const samuel = o => person(Object.assign({}, SAMUEL, o));
const SIT = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
// a casa de Deus em Siló: uma tenda grande com cortinas coloridas e um pátio de linho branco
function casaDeDeus(x, y, s = 1, o = {}) {
  let g = '';
  g += `<path d="M-200,-170 L-200,0 L200,0 L200,-170 Q0,-200 -200,-170 Z" fill="#8a6a4a" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/>`;
  g += `<path d="M-200,-170 Q0,-200 200,-170 L200,-150 Q0,-178 -200,-150 Z" fill="#a8875a"/>`;
  g += `<g>${[['#3f4f9a', -200], ['#7b4c93', -120], ['#b8312f', -40], ['#7b4c93', 40], ['#3f4f9a', 120]].map(([c, a]) => `<rect x="${a}" y="-150" width="80" height="150" fill="${c}" opacity=".9"/>`).join('')}</g>`;
  g += `<g stroke="#f2c14e" stroke-width="3" opacity=".7">${[-160, -80, 0, 80, 160].map(a => `<path d="M${a},-140 L${a},-6"/>`).join('')}</g>`;
  g += `<path d="M-200,-150 L200,-150" stroke="${OL}" stroke-width="3"/>`;
  g += `<rect x="-52" y="-150" width="104" height="150" fill="#f4efe6" stroke="${OL}" stroke-width="3"/><g stroke-width="8">${['#3f4f9a', '#7b4c93', '#b8312f'].map((c, i) => `<path d="M${-36 + i * 36},-146 L${-36 + i * 36},-4" stroke="${c}"/>`).join('')}</g>`;
  if (o.patio !== false) {
    g += `<g>${[-300, -240, -180, 180, 240, 300].map(a => `<rect x="${a - 5}" y="-90" width="10" height="90" fill="#d9a33a" stroke="${OL}" stroke-width="2.4"/>`).join('')}<path d="M-306,-82 L-174,-82 L-174,0 L-306,0 Z M174,-82 L306,-82 L306,0 L174,0 Z" fill="#fbf6ea" stroke="${OL}" stroke-width="3" opacity=".95"/></g>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
// o candelabro de ouro com sete chamas (a lâmpada de Deus)
function candelabro(x, y, s = 1, k = '') {
  let g = `<circle cx="0" cy="-120" r="150" fill="#ffd27a" opacity=".16"/><circle cx="0" cy="-120" r="90" fill="#ffd27a" opacity=".16"/>`;
  g += limb(0, 0, 0, -120, 9, '#e0a72e');
  for (const k2 of [1, 2, 3]) g += `<path d="M${-k2 * 22},-120 L${-k2 * 22},${-100 + k2 * 12} Q${-k2 * 22},${-60 + k2 * 6} 0,${-60 + k2 * 6} Q${k2 * 22},${-60 + k2 * 6} ${k2 * 22},${-100 + k2 * 12} L${k2 * 22},-120" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M${-k2 * 22},-120 L${-k2 * 22},${-100 + k2 * 12} Q${-k2 * 22},${-60 + k2 * 6} 0,${-60 + k2 * 6} Q${k2 * 22},${-60 + k2 * 6} ${k2 * 22},${-100 + k2 * 12} L${k2 * 22},-120" stroke="#e0a72e" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  g += `<path d="M-30,6 L30,6 L18,-10 L-18,-10 Z" fill="#e0a72e" stroke="${OL}" stroke-width="3"/>`;
  for (const k2 of [-3, -2, -1, 0, 1, 2, 3]) g += `<g transform="translate(${k2 * 22},-124)"><ellipse cx="0" cy="2" rx="8" ry="4" fill="#e0a72e" stroke="${OL}" stroke-width="2.4"/><g class="flicker" style="${dl(2)}"><path d="M0,-18 C6,-10 7,-4 5,-1 C3,2 -3,2 -5,-1 C-7,-4 -6,-10 0,-18 Z" fill="#ffb238"/><path d="M0,-10 C3,-6 3,-3 2,-1 C1,0 -1,0 -2,-1 C-3,-3 -3,-6 0,-10 Z" fill="#fff1a8"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -100, 80) : ''}</g></g>`;
}
function esteira(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-120,0 L120,0 L110,-18 L-110,-18 Z" fill="#c9a87a" stroke="${OL}" stroke-width="3"/><g stroke="#a8875a" stroke-width="2.4">${[-90, -60, -30, 0, 30, 60, 90].map(a => `<path d="M${a},-16 L${a},-2"/>`).join('')}</g><ellipse cx="-96" cy="-24" rx="30" ry="12" fill="#f4efe6" stroke="${OL}" stroke-width="2.6"/></g>`;
}
function cobertor(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,-6 C-60,-40 90,-46 104,-14 L108,0 L-62,0 Z" fill="#e5483f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-50,-14 C-20,-30 50,-32 96,-16" stroke="#f2c14e" stroke-width="4" fill="none"/></g>`;
}
function quarto(o = {}) {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="${o.wall || '#3a3266'}"/>`;
  s += `<g opacity=".45">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${-20 + i * 110}" y="-40" width="54" height="640" fill="${['#4a3f80', '#5a3f7a'][i % 2]}"/>`).join('')}</g>`;
  s += `<g stroke="#f2c14e" stroke-width="3" opacity=".35">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${34 + i * 110},-40 L${34 + i * 110},600"/>`).join('')}</g>`;
  s += `<rect x="-40" y="600" width="900" height="300" fill="${o.floor || '#5a4a3a'}"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/>`;
  return s;
}
function cadeira(x, y, s = 1) {
  let g = `${[-74, 62].map(a => `<rect x="${a}" y="-176" width="12" height="120" rx="4" fill="#8a5a33" stroke="${OL}" stroke-width="3"/>`).join('')}<rect x="-80" y="-182" width="160" height="18" rx="7" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="-66" y="-140" width="132" height="10" rx="4" fill="#8a5a33" stroke="${OL}" stroke-width="2.4"/>`;
  g += `<rect x="-84" y="-70" width="168" height="16" rx="6" fill="#a46e3c" stroke="${OL}" stroke-width="3"/>${[-76, 64].map(a => `<rect x="${a}" y="-56" width="12" height="56" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/>`).join('')}`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function bebe(x, y, s = 1, k = '', face = 'sleep') {
  const eyes = face === 'sleep' ? `<path d="M-36,-26 q3,3 6,0 M-27,-26 q3,3 6,0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` : `<circle cx="-33" cy="-27" r="2.6" fill="${OL}"/><circle cx="-24" cy="-27" r="2.6" fill="${OL}"/>`;
  const mouth = face === 'sleep' ? `<path d="M-32,-19 q3,2 6,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>` : `<path d="M-34,-20 q5,7 10,0 Z" fill="#8c2f39" stroke="${OL}" stroke-width="2"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><path d="M-44,-6 C-44,-30 -20,-36 0,-36 C30,-36 48,-26 48,-8 C48,8 30,12 0,12 C-26,12 -44,8 -44,-6 Z" fill="#fbf6ea" stroke="${OL}" stroke-width="3.2"/><path d="M-20,-30 C-8,-10 10,-6 30,-14 M-30,-4 C-10,6 18,4 40,-4" stroke="#e2d6bd" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-26" r="17" fill="#e8b48a" stroke="${OL}" stroke-width="3"/><path d="M-40,-36 C-36,-46 -22,-46 -18,-38" stroke="#2b1d17" stroke-width="4" fill="none" stroke-linecap="round"/>${eyes}${mouth}<ellipse cx="-40" cy="-21" rx="4.5" ry="3" fill="#ef7d78" opacity=".5"/>${k ? hitC(0, -14, 54) : ''}</g></g>`;
}
function tunica(x, y, s = 1, col = '#3f93c7', k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><path d="M-30,-60 L-12,-66 Q0,-56 12,-66 L30,-60 L46,-36 L30,-28 L28,10 L-28,10 L-30,-28 L-46,-36 Z" fill="${col}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-14,-62 L-16,8 M14,-62 L16,8" stroke="#f2c14e" stroke-width="5"/>${k ? hitC(0, -26, 54) : ''}</g></g>`;
}
function siloDia(o = {}) {
  let s = bgDay(Object.assign({ sunX: 670, sunY: 110, sunR: 38 }, o.day || {}));
  s += hill([[-40, 380], [200, 352], [440, 374], [660, 344], [840, 366]], o.far || '#b9cf8a');
  s += olive(70, 420, .8) + olive(760, 410, .7);
  s += `<rect x="-40" y="430" width="900" height="400" fill="${o.chao || '#e2d3a6'}"/>`;
  return s;
}
// a voz de Deus: uma luz suave no alto do quarto
function voz(x, y, k = 'voz') {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><circle r="110" fill="#ffe9a6" opacity=".14"/><circle r="70" fill="#ffe9a6" opacity=".2"/><g class="twinkle" style="--d:3s"><path d="${sparkle(26)}" fill="#fff4c4"/></g>${hitC(0, 0, 80)}</g></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Samuel, o Menino que Ouviu Deus',
  alt: 'De noite, dentro da casa de Deus, o menino Samuel está ajoelhado na sua esteira, de mãos juntas, e olha para uma luz dourada. Ao lado, o candelabro de ouro brilha.',
  cue: [400, 820],
  art() {
    let s = quarto({});
    s += `<rect x="-40" y="-40" width="900" height="1200" fill="#2e2856"/>`;
    s += `<g opacity=".45">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${-20 + i * 110}" y="-40" width="54" height="900" fill="${['#4a3f80', '#5a3f7a'][i % 2]}"/>`).join('')}</g>`;
    s += `<rect x="-40" y="860" width="900" height="300" fill="#5a4a3a"/><path d="M-40,860 L840,860" stroke="${OL}" stroke-width="4"/>`;
    s += starField(2501, 18, 80, 520, 720, 700, { big: .3 });
    s += voz(560, 560, 'luz');
    s += candelabro(150, 900, 1.1);
    s += esteira(420, 1060, 1.3);
    s += cobertor(500, 1046, 1);
    s += samuel({ x: 400, y: 1040, s: 1.3, legs: 'kneel', face: 'joy', look: .5, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'samuel' });
    return s;
  },
  setup(api) {
    api.tap(api.q('samuel'), 'Samuel', () => { api.snd('hello'); api.bubble(400, 760, 'Fala, Senhor!', { key: 's' }); });
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(560, 560, 'spark', 8, { col: '#ffe9a6' }); });
  }
});

/* =====================================================================
   1 — ANA QUERIA UM BEBÉ
   ===================================================================== */
SCENES.push({
  key: 'ana', title: 'Ana queria um bebé', ref: '1 Samuel 1.1-17', tint: 'rose',
  text: [
    'Ana estava muito triste, porque não tinha filhos.',
    'Um dia, foi à casa de Deus e orou com todo o coração:',
    { q: 'Senhor, dá-me um filho! Ele vai ser teu para sempre.', who: 'outro' }
  ],
  fact: 'Ana orava tão baixinho que só os lábios dela se mexiam.',
  hint: 'Toca na Ana para ela orar.',
  alt: 'À porta da casa de Deus, em Siló, Ana está de pé a orar, de mãos juntas e com o rosto triste. O velho sacerdote Eli está sentado numa cadeira, ali perto.',
  cue: [300, 560],
  art() {
    let s = siloDia({});
    s += casaDeDeus(470, 520, 1.05);
    s += cadeira(680, 744, .96);
    s += eli({ x: 680, y: 740, s: .96, ...SIT, flip: true, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'eli' });
    s += ana({ x: 300, y: 744, s: 1.04, face: 'sad', look: .4, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'ana' });
    s += flowerBand(2601, 760, 790, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('ana'), 'Ana', () => { api.snd('heart'); api.burst(300, 480, 'heart', 4); api.bubble(300, 440, 'Senhor, ouve a minha oração...', { key: 'a' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('eli'), 'Eli, o sacerdote', () => { api.snd('hm'); api.bubble(660, 480, 'Vai em paz. Que Deus te dê o que pediste!', { key: 'e' }); });
  }
});

/* =====================================================================
   2 — DEUS OUVIU A ANA
   ===================================================================== */
SCENES.push({
  key: 'bebe', title: 'Deus ouviu a Ana', ref: '1 Samuel 1.19-20', tint: 'gold',
  text: [
    'Deus ouviu a oração da Ana! Pouco tempo depois, ela teve um bebé.',
    'Chamou-lhe Samuel, que quer dizer «Deus ouviu».'
  ],
  fact: 'Ana cantou uma canção de alegria para agradecer a Deus.',
  hint: 'Toca no bebé Samuel.',
  alt: 'Dentro de casa, Ana embala o bebé Samuel nos braços e sorri. Elcana, o pai, olha feliz para o bebé.',
  cue: [400, 470],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#f1dcb2"/><rect x="560" y="-40" width="300" height="900" fill="#e6cc9c" opacity=".6"/>`;
    s += `<path d="M90,400 L90,220 A70,70 0 0 1 230,220 L230,400 Z" fill="#8fd0f0" stroke="${OL}" stroke-width="3.4"/><path d="M92,360 Q160,330 228,350 L228,398 L92,398 Z" fill="#b6d47e"/>${sun(170, 230, 22)}`;
    s += `<rect x="-40" y="560" width="900" height="300" fill="#c9a873"/><path d="M-40,560 L840,560" stroke="${OL}" stroke-width="4"/>`;
    s += lampStand(700, 560, 170);
    s += person(Object.assign({}, ELCANA, { x: 560, y: 740, s: 1.02, flip: true, face: 'joy', look: .6, armL: { a: 30 }, armR: { a: 60, b: -40 }, k: 'elcana' }));
    s += ana({ x: 330, y: 750, s: 1.06, face: 'joy', look: .5, armL: { a: -30, b: -80 }, armR: { a: -30, b: -80 } });
    s += bebe(368, 612, 1.1, 'bebe', 'smile');
    return s;
  },
  setup(api) {
    api.tap(api.q('bebe'), 'Bebé Samuel', () => { api.snd('laugh'); api.burst(380, 500, 'heart', 6); api.bubble(360, 480, 'Hi, hi!', { key: 'b', size: 30, plain: true, dur: 1100 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('elcana'), 'Elcana, o pai', () => { api.snd('hello'); api.bubble(560, 440, 'O nosso filho! Obrigado, Deus!', { key: 'e' }); });
  }
});

/* =====================================================================
   3 — SAMUEL VAI PARA A CASA DE DEUS
   ===================================================================== */
SCENES.push({
  key: 'leva', title: 'Na casa de Deus', ref: '1 Samuel 1.24-28', tint: 'sand',
  text: [
    'Quando o Samuel cresceu um pouco, Ana levou-o à casa de Deus, como tinha prometido.',
    'O menino ficou lá a ajudar o sacerdote Eli.'
  ],
  fact: 'Ana disse: «Pedi este menino ao Senhor, e Ele deu-mo!»',
  hint: 'Toca no Samuel e no Eli.',
  alt: 'Ana leva o pequeno Samuel pela mão até à casa de Deus. O velho Eli recebe-os à porta, de braços abertos.',
  cue: [330, 600],
  art() {
    let s = siloDia({});
    s += casaDeDeus(470, 520, 1.05);
    s += eli({ x: 600, y: 740, s: 1, flip: true, face: 'joy', look: .5, armL: { a: 70, b: -20 }, armR: { a: 70, b: -20 }, k: 'eli' });
    s += ana({ x: 200, y: 740, s: 1, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 40, b: -10 } });
    s += samuel({ x: 330, y: 744, s: .78, face: 'joy', look: .6, armL: { a: 40, b: -10 }, armR: { a: 20 }, k: 'samuel' });
    s += flowerBand(2701, 760, 790, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('samuel'), 'Samuel', () => { api.snd('hello'); api.hop(api.q('samuel'), 12); api.bubble(330, 560, 'Eu vou ajudar!', { key: 's' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('eli'), 'Eli, o sacerdote', () => { api.snd('hello'); api.bubble(600, 460, 'Bem-vindo, Samuel!', { key: 'e' }); });
  }
});

/* =====================================================================
   4 — UMA TÚNICA NOVA TODOS OS ANOS
   ===================================================================== */
SCENES.push({
  key: 'tunica', title: 'Uma túnica nova todos os anos', ref: '1 Samuel 2.18-19, 26', tint: 'meadow',
  text: [
    'O Samuel ajudava o Eli todos os dias: abria as portas, varria e cuidava das lâmpadas.',
    'Todos os anos, a mãe fazia-lhe uma túnica nova, um bocadinho maior, porque o Samuel estava a crescer!'
  ],
  fact: 'O Samuel crescia e era amado por Deus e pelas pessoas.',
  hint: 'Toca na túnica para veres o Samuel crescer.',
  alt: 'Ana mostra uma túnica nova ao Samuel. A cada toque, o Samuel fica mais crescido, com uma túnica maior.',
  cue: [250, 560],
  art() {
    let s = siloDia({});
    s += casaDeDeus(560, 500, .8);
    s += ana({ x: 200, y: 740, s: 1, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 70, b: -30 } });
    s += tunica(262, 600, .9, '#3f93c7', 'tunica');
    const tam = [.66, .78, .9];
    tam.forEach((sc, i) => s += `<g data-k="sam${i}" opacity="${i ? 0 : 1}" style="pointer-events:none">${samuel({ x: 440, y: 744, s: sc, face: 'joy', look: -.6, armL: { a: 14 }, armR: { a: 20, item: i === 2 ? ITEM.staff(150, -1) : '' } })}</g>`);
    s += `<g transform="translate(580,744) rotate(8)">${limb(0, -40, 0, -190, 6, '#a46e3c')}<path d="M-6,-44 L6,-44 L22,0 L-22,0 Z" fill="#d9b25a" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-12,-20 L12,-20 M-2,-40 L-8,-2 M2,-40 L8,-2" stroke="#a8803a" stroke-width="2.4"/></g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('tunica'), 'Túnica nova', async () => {
      api.snd('gift');
      api.hop(api.q('tunica'), 10);
      if (n >= 2) { api.burst(440, 560, 'heart', 4); return; }
      api.anim(api.q('sam' + n), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      n++;
      await api.anim(api.q('sam' + n), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.burst(440, 560, 'spark', 6);
      api.bubble(440, 520 - n * 40, n === 1 ? 'Estou a crescer!' : 'Obrigado, mãe!', { key: 's' });
      if (n === 2) api.nudgeNext(2400);
    });
  }
});

/* =====================================================================
   5 — UMA VOZ DE NOITE
   ===================================================================== */
function noiteSamuel(o = {}) {
  let s = quarto({});
  s += `<rect x="470" y="300" width="200" height="300" fill="#241e44" stroke="${OL}" stroke-width="4"/>`;
  s += `<g transform="translate(570,560) rotate(-90)" style="pointer-events:none"><g>${eli({ x: 0, y: 80, s: .62, face: o.eliAcordado ? 'surprise' : 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>`;
  s += `<path d="M480,590 L660,590" stroke="#8a6a4a" stroke-width="14"/>`;
  s += candelabro(150, 600, 1);
  s += esteira(330, 740, 1.1);
  return s;
}
SCENES.push({
  key: 'voz', title: 'Uma voz de noite', ref: '1 Samuel 3.1-5', tint: 'night',
  text: [
    'Uma noite, o Samuel estava a dormir perto da lâmpada de Deus. De repente, alguém chamou:',
    { q: 'Samuel!', who: 'deus' },
    'O Samuel correu até ao Eli: «Aqui estou! Chamaste-me?» Mas o Eli disse: «Não te chamei. Volta a dormir.»'
  ],
  fact: 'A lâmpada de Deus ficava acesa durante a noite.',
  hint: 'Toca no Samuel para ele ir ter com o Eli.',
  alt: 'De noite, dentro da casa de Deus, o candelabro dourado brilha. O menino Samuel acorda na sua esteira. Ao lado, o velho Eli dorme noutro quarto.',
  cue: [330, 680],
  art() {
    let s = noiteSamuel({});
    s += `<g data-k="deitado"><g transform="translate(300,712) rotate(-90)"><g>${samuel({ x: 0, y: 70, s: .74, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>${cobertor(350, 736, 1)}</g>`;
    s += `<g data-k="acordado" opacity="0" style="pointer-events:none">${samuel({ x: 400, y: 744, s: .8, legs: 'run', face: 'surprise', look: .6, armL: { a: 40, b: -40 }, armR: { a: 50, b: -50 } })}</g>`;
    s += `<rect class="hit" data-k="samuel" x="200" y="600" width="240" height="160" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.later(() => api.bubble(300, 260, 'Samuel!', { key: 'v', size: 36, plain: true, dur: 1400 }), 900);
    api.tap(api.q('samuel'), 'Samuel', async () => {
      if (api.st.foi) { api.snd('tiptoe'); return; }
      api.st.foi = true;
      api.snd('whoosh');
      api.anim(api.q('deitado'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      await api.anim(api.q('acordado'), [{ opacity: 0, transform: 'translateX(0px)' }, { opacity: 1, transform: 'translateX(0px)', offset: .2 }, { opacity: 1, transform: 'translateX(90px)' }], { duration: 900, fill: 'forwards' });
      api.bubble(470, 480, 'Aqui estou! Chamaste-me?', { key: 's' });
      await api.wait(1800);
      api.bubble(570, 260, 'Não te chamei. Volta a dormir.', { key: 'e' });
      api.nudgeNext(2600);
    });
  }
});

/* =====================================================================
   6 — OUTRA VEZ!
   ===================================================================== */
SCENES.push({
  key: 'tres', title: 'Outra vez!', ref: '1 Samuel 3.6-8', tint: 'night',
  text: [
    'A voz chamou outra vez: «Samuel!» E o Samuel correu outra vez até ao Eli.',
    'Aconteceu três vezes! Então o Eli percebeu: era Deus que estava a chamar o menino!'
  ],
  fact: 'O Samuel ainda não conhecia a voz de Deus.',
  hint: 'Toca três vezes na luz para a voz chamar.',
  alt: 'De noite, o Samuel vai e volta entre a sua esteira e o quarto do Eli. Um contador mostra as vezes: um, dois, três.',
  cue: [300, 230],
  art() {
    let s = noiteSamuel({ eliAcordado: true });
    s += voz(300, 230);
    s += samuel({ x: 330, y: 744, s: .8, face: 'surprise', look: .6, armL: { a: 30 }, armR: { a: 30 }, k: 'samuel' });
    return s;
  },
  setup(api) {
    let n = 0;
    const chama = async () => {
      if (n >= 3 || api.st.busy) { api.snd('chime', 'E6'); return; }
      api.st.busy = true;
      n++;
      api.snd('chime', ['C6', 'E6', 'G6'][n - 1]);
      api.badge(400, 120, String(n), { key: 'n' });
      api.bubble(300, 160, 'Samuel!', { key: 'v', size: 34, plain: true, dur: 1200 });
      await api.anim(api.act(api.q('samuel')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(180px)', offset: .5 }, { transform: 'translateX(0px)' }], { duration: 1400 });
      api.st.busy = false;
      if (n === 3) {
        api.snd('hm');
        api.bubble(570, 260, 'É Deus que te chama!', { key: 'e', dur: 2600 });
        api.nudgeNext(2800);
      }
    };
    api.tap(api.q('voz'), 'Voz de Deus', chama);
    api.tap(api.q('samuel'), 'Samuel', chama);
  }
});

/* =====================================================================
   7 — FALA, SENHOR!
   ===================================================================== */
SCENES.push({
  key: 'fala', title: 'Fala, Senhor!', ref: '1 Samuel 3.9-10', tint: 'gold',
  text: [
    'O Eli ensinou-lhe: «Se Ele te chamar, responde: Fala, Senhor, que o teu servo está a ouvir.»',
    'Deus chamou de novo, e o Samuel respondeu:',
    { q: 'Fala, Senhor, que o teu servo está a ouvir!', who: 'davi' }
  ],
  fact: 'Deus também fala connosco, por exemplo quando lemos a Bíblia.',
  hint: 'Toca na luz e no Samuel.',
  alt: 'O menino Samuel está ajoelhado na esteira, de mãos juntas, a olhar para uma luz dourada que enche o quarto.',
  cue: [470, 300],
  art() {
    let s = quarto({ wall: '#4a3a70' });
    s += glory(470, 250, 300, 'luz');
    s += candelabro(130, 600, 1);
    s += esteira(400, 744, 1.2);
    s += cobertor(480, 730, .9);
    s += samuel({ x: 380, y: 728, s: 1, legs: 'kneel', face: 'joy', look: .5, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'samuel' });
    return s;
  },
  setup(api) {
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(470, 250, 'spark', 10, { col: '#ffe9a6' }); api.bubble(470, 120, 'Samuel! Samuel!', { key: 'v', size: 32, plain: true, dur: 1300 }); });
    api.tap(api.q('samuel'), 'Samuel', () => { api.snd('heart'); api.burst(400, 520, 'heart', 5); api.bubble(400, 470, 'Fala, Senhor, que eu estou a ouvir!', { key: 's' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
  }
});

/* =====================================================================
   8 — SAMUEL CRESCEU
   ===================================================================== */
SCENES.push({
  key: 'profeta', title: 'Samuel cresceu', ref: '1 Samuel 3.19-21', tint: 'meadow',
  text: [
    'O Samuel cresceu, e Deus estava sempre com ele.',
    'Todo o povo de Israel sabia que o Samuel era um profeta de Deus: ouvia Deus e contava às pessoas o que Deus dizia.'
  ],
  fact: 'Foi o Samuel que, muitos anos depois, escolheu o menino Davi para ser rei!',
  hint: 'Toca no Samuel e nas pessoas.',
  alt: 'Samuel, já crescido, fala com o povo debaixo de uma árvore. As pessoas ouvem com atenção.',
  cue: [230, 520],
  art() {
    let s = siloDia({ chao: '#c9d08e' });
    s += olive(240, 600, 1.5);
    s += person(Object.assign({}, SAMUEL_GRANDE, { x: 230, y: 760, s: 1.08, face: 'joy', look: .6, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 110, b: -40 }, k: 'samuel' }));
    const P = [[440, 760, 0], [560, 770, 5], [680, 760, 4], [500, 800, 1], [620, 806, 3]];
    P.forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], POVO[p].kind === 'adult' ? SIT : { legs: 'kneel' }, { x, y, s: POVO[p].kind === 'adult' ? .82 : .86, face: 'smile', look: -.6, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'p' + i })));
    s += flowerBand(2801, 770, 800, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('samuel'), 'Samuel', () => { api.snd('hello'); api.bubble(230, 450, 'Ouçam o que Deus diz!', { key: 's' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    const FALAS = [N('Samuel é um profeta!'), N('Vamos ouvir!'), N('Deus fala com ele!'), N('Que bom!'), N('Obrigado, Deus!')];
    for (let i = 0; i < 5; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('laugh'); api.hop(api.q('p' + i), 10); api.bubble(x, y - 190 * sc, FALAS[i], { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre a casa de Deus em Siló; uma luz dourada brilha lá dentro e uma ovelhinha dorme.',
  cue: [430, 160],
  questions: [
    ['Como se chamava a mãe do Samuel?', 'Ana.'],
    ['O que quer dizer o nome Samuel?', '«Deus ouviu».'],
    ['Quem chamou o Samuel durante a noite?', 'Deus!'],
    ['Quantas vezes o Samuel correu até ao Eli?', 'Três vezes.'],
    ['O que o Samuel respondeu a Deus?', '«Fala, Senhor, que o teu servo está a ouvir!»']
  ],
  wrong: [
    ['Rute.', 'Sara.', 'Maria.'],
    ['«Menino forte».', '«Ele ri».', '«Pequeno rei».'],
    ['O Eli.', 'A mãe dele.', 'Um vizinho.'],
    ['Uma vez.', 'Sete vezes.', 'Dez vezes.'],
    ['«Agora não, estou a dormir!»', 'Não respondeu nada.', '«Quem és tu?»']
  ],
  verse: ['Fala, Senhor, que o teu servo está a ouvir.', '1 Samuel 3.10'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(2901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += `<g opacity=".85">${casaDeDeus(560, 690, .62, { patio: false })}</g><circle cx="560" cy="640" r="70" fill="#ffd27a" opacity=".18"/>`;
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
  id: 'samuel',
  title: 'Samuel, o Menino que Ouviu Deus',
  cover: { kicker: 'Uma história da Bíblia', title: 'Samuel', small: 'o menino que ouviu Deus', sub: 'Deus fala com quem quer ouvir' },
  color: '#3f6fb5',
  ref: '1 Samuel 1 a 3',
  scenes: SCENES
});
})();
