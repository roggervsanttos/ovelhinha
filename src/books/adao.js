/* =====================================================================
   LIVRO: ADÃO E EVA  (Gênesis 1 a 3)
   ===================================================================== */
(() => {
const SCENES = [];

/* ---------- roupas de folhas e pessoas ---------- */
function leafy(col = '#4f8a3a') {
  const G = ADULT, hy = G.hemY, hw = G.hemW;
  let s = '';
  for (let i = 0; i < 7; i++) { const x = -hw + 6 + i * (2 * hw - 12) / 6; s += `<path d="M${r1(x)},${hy - 9} q-8,10 0,19 q8,-9 0,-19 Z" fill="${col}" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>`; }
  for (const x of [-16, 0, 16]) s += `<path d="M${x},${G.shY - 1} q-7,8 0,16 q7,-8 0,-16 Z" fill="${col}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>`;
  return s;
}
const hairFlower = `<g transform="translate(25,${ADULT.headY - 20})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-6" rx="4.6" ry="6.4" transform="rotate(${a})" fill="#fffaf0" stroke="${OL}" stroke-width="1.6"/>`).join('')}<circle r="3.6" fill="#f2c14e" stroke="${OL}" stroke-width="1.4"/></g>`;
const ADAO = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'short', tunic: '#6aa246', belt: '#8a5a33', shoe: '#b97a4e', front: leafy('#4f8a3a') };
const EVA = { kind: 'adult', skin: '#e7b58a', hair: '#8a4a22', hairStyle: 'long', tunic: '#86c05a', belt: '#8a5a33', shoe: '#cf9468', front: leafy('#5a9a3e'), extra: hairFlower };
const PELE = { tunic: '#a8774a', stripes: '#8a5a33', longSleeves: true, front: '', belt: '#6b4a33', shoe: '#7a4a2a' };
const adao = o => person(Object.assign({}, ADAO, o));
const eva = o => person(Object.assign({}, EVA, o));

/* ---------- peças desta história ---------- */
function eden(o = {}) {
  let s = sky('sky', o.sky || [[0, '#86cbef'], [.5, '#cdeefa'], [.62, '#f3fbe8'], [1, '#f3fbe8']]);
  if (o.sun !== false) s += sun(o.sunX ?? 660, o.sunY ?? 140, o.sunR ?? 42, { face: true });
  s += cloud(170, 150, .9) + cloud(450, 100, .7, { dx: -30, d: 21 });
  s += hill([[-40, 450], [160, 420], [380, 440], [600, 412], [840, 432]], o.h1 || '#bfe08e');
  s += hill([[-40, 520], [200, 494], [420, 512], [640, 488], [840, 504]], o.h2 || '#a6d474');
  return s;
}
function river(o = {}) {
  const d = 'M-40,560 C120,540 260,600 380,580 C520,556 600,610 860,590 L860,650 C600,670 520,616 380,640 C250,662 120,600 -40,622 Z';
  return `<path d="${d}" fill="${o.fill || '#5ab0de'}" stroke="${OL}" stroke-width="3"/><path d="M40,586 C120,578 180,600 240,604 M440,600 C520,590 580,620 660,624" stroke="#d6f0fb" stroke-width="5" fill="none" stroke-linecap="round" class="flow" style="stroke-dasharray:30 40;--o:-140;--d:4s"/>`;
}
function ladybug(x, y, s = 1, k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><g class="bob"><circle cx="14" cy="0" r="7" fill="${OL}"/><ellipse cx="0" cy="0" rx="14" ry="11" fill="#e5483f" stroke="${OL}" stroke-width="2.4"/><path d="M0,-11 L0,11" stroke="${OL}" stroke-width="2"/><circle cx="-6" cy="-3" r="2.8" fill="${OL}"/><circle cx="6" cy="4" r="2.8" fill="${OL}"/><circle cx="-5" cy="6" r="2.2" fill="${OL}"/><circle cx="5" cy="-5" r="2.2" fill="${OL}"/>${k ? hitC(4, 0, 26) : ''}</g></g></g>`;
}
function whale(x, y, s = 1, k = 'baleia') {
  const c = '#5b7fc0', belly = '#dbe7f5';
  let g = `<path d="M-150,-10 C-180,-40 -200,-70 -222,-74 C-210,-40 -212,-14 -200,4 C-214,22 -218,50 -228,74 C-200,66 -176,30 -150,10 Z" fill="${c}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  g += `<path d="M-160,0 C-150,-80 -40,-110 60,-100 C140,-92 186,-50 190,0 C192,46 140,76 40,80 C-60,86 -164,60 -160,0 Z" fill="${c}" stroke="${OL}" stroke-width="4.5"/>`;
  g += `<path d="M-120,40 C-60,72 60,74 150,48 C120,70 70,80 30,82 C-40,84 -96,66 -120,40 Z" fill="${belly}"/>`;
  g += `<g stroke="#a9bfdf" stroke-width="3" fill="none" opacity=".9"><path d="M-40,52 L-36,74"/><path d="M0,56 L2,78"/><path d="M40,54 L42,76"/><path d="M80,48 L82,70"/></g>`;
  g += `<path d="M10,30 C0,60 30,82 64,76 C56,60 50,44 44,26 Z" fill="#4a6db0" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>`;
  g += eyeDot(120, -24, 7) + `<path d="M132,22 Q160,30 182,8" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="138" cy="4" rx="12" ry="6" fill="#ef7d78" opacity=".45"/>`;
  g += `<g data-k="jato" opacity="0"><path d="M60,-104 C50,-140 30,-160 10,-170 M60,-104 C64,-146 70,-170 64,-190 M60,-104 C74,-140 96,-158 116,-166" stroke="#e6f6fc" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="${k}"><g class="act"><g class="bob">${g}${hitC(0, -10, 150)}</g></g></g>`;
}
function seaweed(x, y, h = 120, col = '#3f9a5a') {
  return `<g transform="translate(${x},${y})"><g class="sway" style="--r:7deg;--d:${(3 + Math.random() * 2).toFixed(1)}s;${dl(4)}"><path d="M0,0 C-16,${-h * .25} 16,${-h * .5} 0,${-h * .75} C-10,${-h * .88} 6,${-h} 0,${-h}" stroke="${OL}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M0,0 C-16,${-h * .25} 16,${-h * .5} 0,${-h * .75} C-10,${-h * .88} 6,${-h} 0,${-h}" stroke="${col}" stroke-width="9" fill="none" stroke-linecap="round"/></g></g>`;
}
function starfish(x, y, s = 1, col = '#f28c3a') {
  let d = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 9 : 22; d += (i ? 'L' : 'M') + r1(Math.cos(a) * r) + ',' + r1(Math.sin(a) * r); }
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="${d}Z" fill="${col}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><circle r="2.6" fill="#ffd9a8"/></g>`;
}
// medalhões dos sete dias
function dayIcon(i) {
  const bg = ['#20264f', '#7cc4ec', '#bfe08e', '#ffd86b', '#5ab0de', '#f6c99a', '#9a8ad0'][i];
  let g = `<circle r="42" fill="${bg}" stroke="${OL}" stroke-width="4"/>`;
  if (i === 0) g += `<path d="M-42,0 A42,42 0 0 1 42,0 Z" fill="#fff3c4" transform="rotate(-30)"/><path d="${sparkle(20)}" fill="#ffd84a" stroke="${OL}" stroke-width="2"/>`;
  if (i === 1) g += `<path d="M-40,12 q10,-10 20,0 t20,0 t20,0 t20,0 L40,40 L-40,40 Z" fill="#3f93c7"/><circle cx="-10" cy="-14" r="10" fill="#fff"/><circle cx="6" cy="-18" r="12" fill="#fff"/>`;
  if (i === 2) g += `<path d="M0,26 L0,-4" stroke="#4f8a3a" stroke-width="5" stroke-linecap="round"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-15" rx="7" ry="10" transform="translate(0,-8) rotate(${a})" fill="#e86a9a" stroke="${OL}" stroke-width="2"/>`).join('')}<circle cy="-8" r="6" fill="#f2c14e" stroke="${OL}" stroke-width="2"/><path d="M0,14 q-14,-4 -18,-14 q14,0 18,14 Z" fill="#6aa246" stroke="${OL}" stroke-width="2"/>`;
  if (i === 3) g += `<circle cx="-10" cy="-6" r="17" fill="#ffcf3f" stroke="${OL}" stroke-width="2.6"/><path d="M22,-24 A16,16 0 1 0 22,10 A12,12 0 1 1 22,-24 Z" fill="#fff4c4" stroke="${OL}" stroke-width="2.4" transform="translate(-4,10)"/>`;
  if (i === 4) g += `<g transform="translate(-8,14) scale(.8)"><path d="M-22,0 C-12,-16 14,-16 24,0 C14,16 -12,16 -22,0 Z" fill="#f28c3a" stroke="${OL}" stroke-width="2.8"/><path d="M-20,0 L-36,-12 L-34,12 Z" fill="#f28c3a" stroke="${OL}" stroke-width="2.6"/><circle cx="12" cy="-3" r="3" fill="${OL}"/></g><path d="M2,-22 q8,-10 16,0 q8,-10 16,0" fill="none" stroke="${OL}" stroke-width="3.4" stroke-linecap="round" transform="translate(-14,0)"/>`;
  if (i === 5) g += `<g transform="translate(-14,12) scale(.42)">${blob([[-18, -20, 20], [10, -24, 20], [-4, -2, 20]], '#fffaf0', 4)}<ellipse cx="26" cy="-6" rx="14" ry="17" fill="#4b3d38" stroke="${OL}" stroke-width="4"/></g><g transform="translate(16,-2)"><circle cy="-10" r="11" fill="#d39463" stroke="${OL}" stroke-width="2.6"/><path d="M-12,22 Q-12,4 0,4 Q12,4 12,22 Z" fill="#6aa246" stroke="${OL}" stroke-width="2.6"/></g>`;
  if (i === 6) g += `<path d="M10,-26 A22,22 0 1 0 10,20 A16,16 0 1 1 10,-26 Z" fill="#fff4c4" stroke="${OL}" stroke-width="2.4" transform="translate(-6,4)"/><text x="16" y="-6" font-size="22" font-weight="800" class="svgtxt" fill="#ffffff">z</text><text x="26" y="-22" font-size="15" font-weight="800" class="svgtxt" fill="#ffffff">z</text>`;
  return g;
}
const DAYS = [[100, 168], [200, 128], [300, 104], [400, 96], [500, 104], [600, 128], [700, 168]];
const DAY_NAMES = [N('Luz!'), N('Céu e mar!'), N('Plantas!'), N('Sol, lua e estrelas!'), N('Peixes e passarinhos!'), N('Animais e pessoas!'), N('Descanso!')];

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Adão e Eva',
  alt: 'No jardim do Éden, Adão e Eva sorriem debaixo de uma grande árvore cheia de fruta, perto de um rio; um leão deitado, uma ovelha, coelhos e uma girafa estão por perto.',
  cue: [290, 860],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.45, '#bfe5f5'], [.72, '#f3fbe8'], [1, '#f3fbe8']], 1100);
    s += sun(660, 470, 46, { face: true });
    s += cloud(150, 470, 1) + cloud(460, 540, .7, { dx: -30 });
    s += bird(230, 560, .9) + bird(276, 590, .7, { d: 11 });
    s += hill([[-40, 780], [160, 752], [380, 770], [600, 744], [840, 762]], '#bfe08e');
    s += giraffe({ x: 650, y: 860, s: .62, flip: true, k: 'girafa' });
    s += fruitTree(400, 848, 1.45, { k: 'arvore' });
    s += hill([[-40, 850], [200, 832], [420, 846], [640, 826], [840, 840]], '#a6d474');
    s += `<g transform="translate(0,326)">${river()}</g>`;
    s += hill([[-40, 960], [200, 940], [420, 954], [640, 936], [840, 950]], '#93c45c');
    s += lion({ x: 130, y: 1048, s: .6, lamb: false, face: 'smile', k: 'leao', cls: 'breath' });
    s += adao({ x: 300, y: 1046, s: 1.02, face: 'grin', look: .4, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'adao' });
    s += eva({ x: 470, y: 1050, s: .98, face: 'joy', look: -.4, armL: { a: 30, b: 30 }, armR: { a: 20 }, k: 'eva' });
    s += sheep({ x: 640, y: 1070, s: .86, flip: true, k: 'ove' }) + rabbit({ x: 720, y: 1078, s: 1, k: 'coelho', flip: true });
    s += flowerBand(31, 1062, 1095, 8);
    return s;
  },
  setup(api) {
    api.tap(api.q('adao'), 'Adão', () => { api.wave(api.q('adao'), 'armR'); api.snd('hello'); api.bubble(300, 740, 'Olá! Eu sou o Adão!', { key: 'a' }); });
    api.tap(api.q('eva'), 'Eva', () => { api.snd('heart'); api.hop(api.q('eva'), 12); api.bubble(470, 740, 'E eu sou a Eva!', { key: 'e' }); });
    api.tap(api.q('leao'), 'Leão', () => { api.snd('roar'); api.hop(api.q('leao'), 10); });
    api.tap(api.q('ove'), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q('ove')); });
    api.tap(api.q('coelho'), 'Coelho', () => { api.snd('squeak', 1.2); api.hop(api.q('coelho'), 24); });
    api.tap(api.q('girafa'), 'Girafa', () => { api.snd('squeak', .7); api.hop(api.q('girafa'), 12); });
    api.tap(api.q('arvore'), 'Árvore com fruta', () => { api.snd('chime', 'G5'); api.burst(400, 640, 'spark', 10, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   1 — NO COMEÇO DE TUDO
   ===================================================================== */
SCENES.push({
  key: 'luz', title: 'No princípio de tudo', ref: 'Gênesis 1.1-5', tint: 'night',
  text: [
    'No princípio, não havia nada. Nem céu, nem terra, nem pessoas. Tudo era escuro.',
    'Então Deus falou:',
    { q: 'Que haja luz!', who: 'deus' },
    'E a luz apareceu! Que lindo!'
  ],
  fact: 'Deus chamou dia à luz e noite ao escuro. Foi o primeiro dia!',
  hint: 'Toca no escuro para a luz aparecer.',
  alt: 'Tudo está escuro sobre as águas profundas. Quando Deus fala, um brilho dourado enche o céu e as águas ficam azuis.',
  cue: [400, 380],
  art() {
    let s = `<defs>${lg('fundo', [[0, '#05071c'], [.6, '#10163e'], [1, '#1a2350']])}${lg('ceu', [[0, '#9fd2ee'], [.55, '#fdf3d4'], [1, '#fdf3d4']])}${rg('clarao', [[0, '#ffffff', 1], [.3, '#fff3c4', .9], [.7, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs>`;
    s += `<rect x="-40" y="-40" width="900" height="900" fill="${UR('fundo')}"/>`;
    s += `<defs>${rg('quase', [[0, '#3a4a9a', .55], [.6, '#26306a', .2], [1, '#26306a', 0]])}</defs><circle cx="400" cy="340" r="300" fill="${UR('quase')}"/>`;
    s += [[150, 170, 1.2], [560, 120, 1.4], [700, 330, 1.1], [120, 420, .9]].map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:${i % 2 ? -26 : 26}px;--d:${11 + i}s;${dl(10)}">${blob([[-56, 6, 30], [-20, -14, 38], [24, -10, 34], [58, 8, 26], [0, 14, 30]], '#1a2252', 0)}</g></g>`).join('');
    for (let i = 0; i < 5; i++) s += `<circle class="firefly" style="--d:${(5 + i).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (30 + i * 6)}px;--dy:${-10 - i * 4}px;${dl(6)}" cx="${150 + i * 130}" cy="${520 + (i % 2) * 30}" r="3" fill="#cfd8ff" opacity=".6"/>`;
    s += waveBand(600, { fill: '#121a45', amp: 10, len: 140, dx: 30, d: 8 }) + waveBand(670, { fill: '#0c1336', amp: 12, len: 160, dx: -30, d: 9 });
    s += `<g data-k="dia" opacity="0"><rect x="-40" y="-40" width="900" height="900" fill="${UR('ceu')}"/><circle cx="400" cy="300" r="380" fill="${UR('clarao')}"/>`;
    s += [-50, -25, 0, 25, 50].map(a => `<path d="M400,300 L${r1(400 + Math.sin(a * Math.PI / 180) * 900)},${r1(300 + Math.cos(a * Math.PI / 180) * 900)}" stroke="#fff6d8" stroke-width="40" opacity=".3"/>`).join('');
    s += waveBand(600, { fill: '#5ab0de', amp: 10, len: 140, dx: 30, d: 8, foam: '#e3f4fb', fw: 4 }) + waveBand(670, { fill: '#3f93c7', amp: 12, len: 160, dx: -30, d: 9, foam: '#d6eff9', fw: 4 }) + `</g>`;
    s += `<rect data-k="escuro" x="-40" y="-40" width="900" height="900" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('escuro'), 'Escuridão', async () => {
      if (api.st.lit) { api.snd('twinkle'); api.burst(400, 300, 'spark', 10, { col: '#fff1b0' }); return; }
      api.st.lit = true;
      api.snd('choir', ['C4', 'G4', 'C5', 'E5', 'G5']);
      api.bubble(400, 420, 'Que haja luz!', { key: 'h', size: 70, plain: true, dur: 2000 });
      await api.wait(450);
      api.anim(api.q('dia'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1600, fill: 'forwards', easing: 'ease-out' });
      api.burst(400, 300, 'spark', 16, { col: '#fff6c8' });
      api.later(() => api.snd('anoint'), 600);
      api.nudgeNext(2600);
    });
  }
});

/* =====================================================================
   2 — O CÉU, O MAR E A TERRA
   ===================================================================== */
const SEEDS = [[130, 690], [320, 650], [520, 676], [690, 648]];
SCENES.push({
  key: 'terra', title: 'O céu, o mar e a terra', ref: 'Gênesis 1.6-13', tint: 'meadow',
  text: [
    'Depois, Deus fez o céu bem azul.',
    'Juntou as águas e fez o mar. E apareceu a terra!',
    'Na terra, Deus fez nascer relva, flores e árvores cheias de fruta.'
  ],
  fact: 'O sol ainda não existia! A luz vinha de Deus.',
  hint: 'Toca nos montinhos de terra para as plantas crescerem.',
  alt: 'O céu azul, o mar e uma terra nova ainda sem plantas, com quatro montinhos de terra; uma luz dourada brilha no céu.',
  cue: [320, 620],
  art() {
    let s = sky('sky', [[0, '#8fd0f2'], [.55, '#d8f0fa'], [1, '#d8f0fa']]);
    s += glory(160, 90, 220, 'luz', { rays: [-20, 0, 20, 40] });
    s += cloud(520, 150, .9) + cloud(700, 230, .6, { d: 13 });
    s += waveBand(420, { fill: '#5ab0de', amp: 8, len: 120, dx: 26, d: 6, foam: '#e3f4fb', fw: 4 });
    s += hill([[160, 900], [230, 520], [420, 470], [620, 490], [860, 450]], '#c9b07c', '', 900);
    s += hill([[-40, 900], [-40, 600], [160, 560], [400, 590], [600, 560], [860, 580]], '#d8c08c', '', 900);
    s += `<g opacity=".45">${[[80, 700], [250, 760], [480, 720], [660, 760]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="40" ry="8" fill="#b89a66"/>`).join('')}</g>`;
    s += `<g data-k="verde" opacity="0" style="pointer-events:none">${hill([[160, 900], [230, 520], [420, 470], [620, 490], [860, 450]], '#a6d474', '', 900)}${hill([[-40, 900], [-40, 600], [160, 560], [400, 590], [600, 560], [860, 580]], '#94c45e', '', 900)}${grassBand(202, 600, 790, 14)}${flowerBand(203, 720, 795, 7)}</g>`;
    const plants = [
      [-50, -24, 0, 24, 48].map((x, i) => flower(x, i % 2 ? 4 : -4, 1.7, ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a', '#8a5fc2'][i])).join('') + [-36, 12, 40].map(x => tuft(x, 6, 1.4)).join(''),
      fruitTree(0, 0, 1),
      palm(0, 0, .85),
      shrub(0, 0, 1.35, '#5fa046', { flowers: ['#e86a9a', '#ffffff', '#f2c14e'] })
    ];
    SEEDS.forEach(([x, y], i) => {
      s += `<g transform="translate(${x},${y})"><g data-k="p${i}" style="transform:scale(0)">${plants[i]}</g></g>`;
      s += `<g transform="translate(${x},${y})" data-k="s${i}"><g class="act" transform="scale(1.35)"><path d="M-34,6 Q0,-26 34,6 Z" fill="#a8875a" stroke="${OL}" stroke-width="3"/><path d="M0,-12 q-2,-12 -12,-16 M0,-12 q2,-10 10,-14" stroke="#5f9440" stroke-width="3.4" fill="none" stroke-linecap="round"/><g class="twinkle" style="--d:2.4s;${dl(3)}"><path d="${sparkle(8)}" transform="translate(22,-24)" fill="#fff6c8"/></g>${hitC(0, -6, 46)}</g></g>`;
    });
    return s;
  },
  setup(api) {
    let n = 0;
    SEEDS.forEach(([x, y], i) => api.tap(api.q('s' + i), 'Montinho de terra', async () => {
      const sd = api.q('s' + i);
      if (sd.dataset.done) return; sd.dataset.done = 1; n++;
      api.snd('boing', 1 + i * .15); api.snd('twinkle');
      api.anim(api.act(sd), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      api.anim(api.q('p' + i), [{ transform: 'scale(0)' }, { transform: 'scale(1.12)', offset: .7 }, { transform: 'scale(1)' }], { duration: 750, fill: 'forwards', easing: 'ease-out' });
      api.burst(x, y - 40, 'spark', 7, { col: '#fff6c8' });
      if (n === SEEDS.length) { await api.wait(700); api.anim(api.q('verde'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, fill: 'forwards' }); await api.wait(600); api.snd('tada'); api.bubble(180, 130, 'Isto é bom!', { key: 'd', below: true, dur: 2600 }); api.nudgeNext(2200); }
    }));
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('chime', 'E6'); api.burst(160, 100, 'spark', 8, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   3 — SOL, LUA E ESTRELAS
   ===================================================================== */
SCENES.push({
  key: 'sol', title: 'Sol, lua e estrelas', ref: 'Gênesis 1.14-19', tint: 'sky',
  text: [
    'Deus fez o sol para brilhar de dia.',
    'E fez a lua e as estrelas para brilharem de noite.',
    'Quantas estrelas! Ninguém as consegue contar.'
  ],
  fact: 'Deus conhece cada estrela pelo nome!',
  hint: 'Toca no sol e, de noite, na lua.',
  alt: 'Um vale com árvores e flores debaixo do sol. Quando anoitece, aparecem a lua e um céu cheio de estrelas.',
  cue: [600, 170],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.55, '#d3effa'], [1, '#d3effa']]);
    s += sun(600, 170, 52, { face: true, k: 'sol' });
    s += cloud(190, 180, .9) + cloud(380, 110, .6, { dx: -26 });
    s += `<g data-k="noite" opacity="0" style="pointer-events:none"><defs>${lg('ceun', [[0, '#0f1640'], [.6, '#2a3478'], [1, '#3e4a8c']])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('ceun')}"/>${starField(301, 90, 0, 0, 800, 470, { big: .12 })}`;
    s += [[110, 90], [330, 60], [470, 210], [720, 110], [260, 300]].map(([x, y], i) => `<g transform="translate(${x},${y})" data-k="st${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(15)}" fill="#ffe9a6"/><circle r="4.4" fill="#fff"/></g>${hitC(0, 0, 34)}</g></g>`).join('');
    s += `<g transform="translate(560,200)" data-k="lua"><g class="act">${moon(0, 0, 44)}${hitC(0, 0, 70)}</g></g></g>`;
    s += hill([[-40, 470], [160, 430], [380, 452], [600, 420], [840, 446]], '#bfe08e');
    s += olive(140, 520, .8) + fruitTree(690, 540, .7, { fruit: '#f28c3a' });
    s += hill([[-40, 560], [220, 534], [460, 552], [700, 528], [840, 540]], '#a6d474');
    s += hill([[-40, 660], [220, 630], [460, 650], [700, 622], [840, 640]], '#93c45c');
    s += palm(560, 650, .5) + shrub(260, 650, .8, '#5fa046', { flowers: ['#e86a9a', '#fff', '#f2c14e'] });
    s += grassBand(311, 680, 780, 12) + flowerBand(312, 700, 790, 8);
    // a sombra da noite começa suave no céu, para escurecer também a copa das árvores sem deixar uma linha
    s += `<defs>${lg('sombra', [[0, '#141c4a', 0], [.22, '#141c4a', 1], [1, '#141c4a', 1]])}</defs><rect data-k="sombra" x="-40" y="300" width="900" height="600" fill="${UR('sombra')}" opacity="0" style="pointer-events:none"/>`;
    return s;
  },
  setup(api) {
    const night = api.q('noite'), shade = api.q('sombra');
    const set = on => {
      api.st.night = on;
      api.anim(night, [{ opacity: on ? 0 : 1 }, { opacity: on ? 1 : 0 }], { duration: 1200, fill: 'forwards' });
      api.anim(shade, [{ opacity: on ? 0 : .5 }, { opacity: on ? .5 : 0 }], { duration: 1200, fill: 'forwards' });
      night.style.pointerEvents = on ? 'auto' : 'none';
    };
    api.tap(api.q('sol'), 'Sol', () => {
      if (api.st.night) return;
      api.snd('lullaby'); set(true);
      api.later(() => api.burst(400, 200, 'spark', 10, { col: '#ffe9a6' }), 900);
      if (!api.st.seen) { api.st.seen = true; api.nudgeNext(3200); }
    });
    api.tap(api.q('lua'), 'Lua', () => { api.snd('hello'); set(false); api.burst(600, 170, 'spark', 8, { col: '#fff3b0' }); });
    const NOTES = ['C6', 'E6', 'G6', 'A6', 'D6'];
    for (let i = 0; i < 5; i++) api.tap(api.q('st' + i), 'Estrela', () => {
      const [x, y] = api.pos(api.q('st' + i));
      api.snd('chime', NOTES[i]);
      api.anim(api.act(api.q('st' + i)), [{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      api.burst(x, y, 'spark', 6, { col: '#ffe9a6' });
    });
  }
});

/* =====================================================================
   4 — PEIXES E PASSARINHOS
   ===================================================================== */
const FISH = [[150, 560, '#f28c3a', 1.2], [300, 650, '#f2c14e', 1], [560, 700, '#e86a9a', 1.1], [680, 560, '#3fbf9a', 1], [430, 520, '#9a6fd6', .9], [110, 720, '#e5483f', .9]];
const BIRDS = [[170, 150, '#3f93c7'], [380, 110, '#e5483f'], [640, 170, '#f2c14e']];
SCENES.push({
  key: 'mar', title: 'Peixes e passarinhos', ref: 'Gênesis 1.20-23', tint: 'water',
  text: [
    'Deus encheu o mar de peixes. Peixes grandes, peixes pequenos... e baleias enormes!',
    'E encheu o céu de passarinhos. Piu, piu, piu!'
  ],
  fact: 'A baleia-azul é o maior animal que existe!',
  hint: 'Toca nos peixes, na baleia e nos passarinhos.',
  alt: 'Em cima, passarinhos coloridos voam no céu; em baixo, no fundo do mar, nadam peixes de várias cores e uma baleia sorridente, entre algas e estrelas-do-mar.',
  cue: [300, 650],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [1, '#d3effa']], 360);
    s += sun(700, 80, 34, { face: true }) + cloud(520, 90, .7) + cloud(120, 70, .6, { d: 13 });
    s += `<defs>${lg('agua', [[0, '#4fa8dc'], [.5, '#2f7fb8'], [1, '#1f5f96']])}</defs><rect x="-40" y="330" width="900" height="560" fill="${UR('agua')}"/>`;
    s += [[200, 470], [520, 430], [700, 640]].map(([x, y]) => `<path d="M${x - 60},${y} q60,-30 120,0" stroke="#7fc4ea" stroke-width="6" fill="none" opacity=".35" stroke-linecap="round"/>`).join('');
    s += waveBand(332, { fill: '#5ab0de', amp: 9, len: 120, dx: 26, d: 6, foam: '#e3f4fb', fw: 5, bottom: 360 });
    s += `<path d="M-40,780 C120,760 260,790 420,772 C580,754 700,780 840,770 L840,880 L-40,880 Z" fill="#e8d4a2" stroke="${OL}" stroke-width="3"/>`;
    s += seaweed(60, 784, 150) + seaweed(90, 790, 110, '#4fae6a') + seaweed(740, 776, 160) + seaweed(700, 786, 110, '#4fae6a') + seaweed(470, 776, 90);
    s += starfish(300, 790, 1) + starfish(620, 786, .8, '#e86a9a');
    s += whale(470, 560, .78, 'baleia');
    FISH.forEach(([x, y, c, sc], i) => s += fishS(x, y, sc, c, { k: 'f' + i, flip: i % 2 === 1, dx: 24 + i * 4, d: 4 + i * .6 }));
    for (let i = 0; i < 8; i++) s += `<circle class="rise" style="--d:${(3 + i * .4).toFixed(1)}s;--dx:${(i % 2 ? 6 : -6)}px;${dl(6)}" cx="${60 + i * 100}" cy="${700 + (i % 3) * 20}" r="${5 + (i % 3) * 2}" fill="none" stroke="#e6f6fc" stroke-width="3" opacity=".8"/>`;
    BIRDS.forEach(([x, y, c], i) => s += `<g transform="translate(${x},${y})"><g class="glide" style="--dx:${i % 2 ? -40 : 40}px;--dy:-10px;--d:${7 + i}s;${dl(6)}">${dove({ x: 0, y: 0, s: .9, flip: i === 2, col: c, wing: c, k: 'b' + i })}</g></g>`);
    return s;
  },
  setup(api) {
    FISH.forEach((f, i) => api.tap(api.q('f' + i), 'Peixe', () => { const [x, y] = api.pos(api.q('f' + i)); api.snd('plip'); api.hop(api.q('f' + i), 22); api.burst(x, y - 20, 'ripple', 2); }));
    BIRDS.forEach((b, i) => api.tap(api.q('b' + i), 'Passarinho', () => { api.snd('tweet', 3 + i); api.hop(api.q('b' + i), 18); api.burst(b[0], b[1], 'note', 2); }));
    api.tap(api.q('baleia'), 'Baleia', async () => {
      api.snd('bubbles', 8); api.snd('splash');
      const j = api.q('jato');
      await api.anim(j, [{ opacity: 0, transform: 'scaleY(.2)' }, { opacity: 1, transform: 'scaleY(1)' }, { opacity: 0, transform: 'scaleY(1.2)' }], { duration: 1200 });
    });
  }
});

/* =====================================================================
   5 — BICHOS DE TODO TIPO
   ===================================================================== */
const BICHOS = [
  ['ele', N('Elefante'), 'trumpet', 190, 500], ['gir', 'Girafa', ['squeak', .7], 560, 290], ['leao', 'Leão', 'roar', 440, 600],
  ['zeb', N('Zebra'), 'heehaw', 650, 590], ['coe', 'Coelho', ['squeak', 1.25], 110, 640], ['tar', N('Tartaruga'), 'plip', 300, 706],
  ['ove', 'Ovelha', 'bleat', 520, 690], ['joa', N('Joaninha'), 'twinkle', 724, 660]
];
SCENES.push({
  key: 'bichos', title: 'Animais de todo o tipo', ref: 'Gênesis 1.24-25', tint: 'meadow',
  text: [
    'Depois, Deus fez os animais da terra.',
    'Animais grandalhões, como o elefante e a girafa. E animais pequeninos, como o coelho e a joaninha.',
    'E Deus viu que tudo era bom!'
  ],
  fact: 'Ainda hoje as pessoas descobrem animais novos que Deus fez!',
  hint: 'Toca nos animais para ouvires cada um.',
  alt: 'Num campo verde, um elefante, uma girafa, um leão, uma zebra, uma ovelha, um coelho, uma tartaruga e uma joaninha numa flor.',
  cue: [420, 560],
  art() {
    let s = bgDay({ sunX: 690, sunY: 120, sunR: 40 });
    s += hill([[-40, 430], [160, 404], [380, 420], [600, 396], [840, 416]], '#cfe2ae');
    s += olive(80, 440, .7) + palm(760, 440, .5);
    s += hill([[-40, 500], [200, 476], [420, 494], [640, 470], [840, 488]], '#aed37a');
    s += giraffe({ x: 600, y: 560, s: .82, flip: true, k: 'gir' });
    s += hill([[-40, 600], [220, 576], [460, 592], [700, 572], [840, 586]], '#94c45e');
    s += elephant({ x: 190, y: 640, s: .74, k: 'ele' });
    s += lion({ x: 400, y: 700, s: .66, lamb: false, k: 'leao' });
    s += equine({ x: 660, y: 720, s: .56, kind: 'zebra', flip: true, k: 'zeb' });
    s += sheep({ x: 520, y: 760, s: .74, flip: true, k: 'ove' });
    s += rabbit({ x: 110, y: 740, s: 1.05, k: 'coe' }) + turtle({ x: 300, y: 770, s: .95, k: 'tar' });
    s += `<g transform="translate(720,760)">${flower(0, 0, 2, '#ffffff')}</g>` + ladybug(724, 704, 1, 'joa');
    s += grassBand(321, 740, 790, 8) + flowerBand(322, 760, 795, 5);
    return s;
  },
  setup(api) {
    const seen = new Set();
    for (const [k, name, snd, bx, by] of BICHOS) api.tap(api.q(k), name, async () => {
      Array.isArray(snd) ? api.snd(...snd) : api.snd(snd);
      api.hop(api.q(k), k === 'joa' ? 26 : 14);
      if (seen.has(k)) return;
      seen.add(k);
      api.badge(bx, by, String(seen.size), { key: 'b' + k });
      if (seen.size === BICHOS.length) { await api.wait(700); api.snd('tada'); api.burst(400, 300, 'confetti', 18); api.bubble(400, 330, 'Muito bom!', { key: 'fim', size: 64, plain: true, dur: 2200 }); api.nudgeNext(1800); }
    });
  }
});

/* =====================================================================
   6 — DEUS FEZ O HOMEM
   ===================================================================== */
SCENES.push({
  key: 'homem', title: 'Deus fez o homem', ref: 'Gênesis 1.26-27; 2.7', tint: 'gold',
  text: [
    'Então Deus fez uma coisa muito especial.',
    'Com o pó da terra, Deus formou um homem. Depois soprou nele, e ele ficou vivo!',
    'O nome dele era Adão. Deus fez Adão para ser seu amigo.'
  ],
  fact: 'Deus fez cada pessoa parecida com ele. Tu és muito especial para Deus!',
  hint: 'Toca no pó brilhante.',
  alt: 'Num jardim, uma luz dourada brilha sobre um montinho de terra cheio de brilhos. Depois, Adão aparece, abre os olhos e sorri.',
  cue: [400, 660],
  art() {
    let s = eden({ sun: false });
    s += glory(400, 60, 300, 'luz');
    s += fruitTree(120, 560, .9) + fruitTree(690, 560, .85, { fruit: '#f2c14e' });
    s += hill([[-40, 600], [220, 576], [460, 592], [700, 572], [840, 586]], '#94c45e');
    s += grassBand(331, 620, 760, 12);
    s += `<g transform="translate(400,700)" data-k="po"><g class="act"><path d="M-110,10 C-80,-40 -30,-56 0,-56 C40,-56 86,-36 110,10 Z" fill="#b5835a" stroke="${OL}" stroke-width="3.4"/><g fill="#d6a77a">${[[-60, -10], [-20, -30], [30, -24], [70, -4], [0, -6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`).join('')}</g>${[[-50, -56], [10, -80], [60, -50], [-10, -40]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g class="twinkle" style="--d:${(1.8 + i * .3).toFixed(1)}s;${dl(2)}"><path d="${sparkle(10)}" fill="#fff6c8"/></g></g>`).join('')}${hitC(0, -30, 90)}</g></g>`;
    s += `<g data-k="sono" opacity="0" style="pointer-events:none">${adao({ x: 400, y: 704, s: 1.1, face: 'sleep', armL: { a: 12 }, armR: { a: 12 } })}</g>`;
    s += `<g data-k="acordado" opacity="0" style="pointer-events:none">${adao({ x: 400, y: 704, s: 1.1, face: 'joy', look: 0, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'adao' })}</g>`;
    s += flowerBand(332, 730, 790, 8);
    return s;
  },
  setup(api) {
    api.tap(api.q('po'), 'Pó brilhante', async () => {
      if (api.st.made) return; api.st.made = true;
      api.snd('anoint');
      api.burst(400, 650, 'dust', 10); api.burst(400, 600, 'spark', 12, { col: '#fff6c8' });
      api.anim(api.act(api.q('po')), [{ opacity: 1 }, { opacity: .25 }], { duration: 900, fill: 'forwards' });
      await api.anim(api.q('sono'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1100, fill: 'forwards' });
      await api.wait(500);
      api.snd('wind');
      api.anim(api.act(api.q('luz')), [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 1400 });
      api.burst(400, 440, 'spark', 10, { col: '#ffffff' });
      await api.wait(900);
      api.q('sono').setAttribute('opacity', '0');
      api.q('acordado').style.pointerEvents = 'auto';
      api.anim(api.q('acordado'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('tada'); api.burst(400, 420, 'heart', 6);
      api.bubble(400, 410, 'Que mundo lindo!', { key: 'a', dur: 2600 });
      api.nudgeNext(2600);
    });
    api.tap(api.q('adao'), 'Adão', () => { if (!api.st.made) return; api.snd('hello'); api.hop(api.q('adao'), 14); api.bubble(400, 410, 'Obrigado, Deus!', { key: 'a' }); });
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('chime', 'E6'); api.burst(400, 90, 'spark', 8, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   7 — ADÃO DÁ NOME AOS BICHOS
   ===================================================================== */
const NOMES = [['n0', N('Elefante!'), 'trumpet'], ['n1', N('Girafa!'), ['squeak', .7]], ['n2', N('Leão!'), 'roar'], ['n3', N('Coelho!'), ['squeak', 1.25]], ['n4', N('Tartaruga!'), 'plip'], ['n5', N('Vaca!'), 'moo']];
SCENES.push({
  key: 'nomes', title: 'Adão dá nome aos animais', ref: 'Gênesis 2.8-20', tint: 'meadow',
  text: [
    'Deus plantou um jardim lindo, chamado Éden. Adão cuidava do jardim.',
    'Deus trouxe os animais até Adão. E Adão deu um nome a cada um!',
    'Sabes o nome destes animais?'
  ],
  fact: 'Um rio passava pelo jardim e regava todas as plantas.',
  hint: 'Toca nos animais para Adão lhes dar um nome.',
  alt: 'No jardim do Éden, perto de um rio, Adão aponta para os animais: um elefante, uma girafa, um leão, uma vaca, um coelho e uma tartaruga.',
  cue: [460, 560],
  art() {
    let s = eden({ sunX: 690, sunY: 110, sunR: 38 });
    s += fruitTree(90, 520, .75) + fruitTree(330, 470, .55, { fruit: '#f2c14e' });
    s += giraffe({ x: 560, y: 540, s: .76, flip: true, k: 'n1' });
    s += elephant({ x: 700, y: 560, s: .62, flip: true, k: 'n0' });
    s += river();
    s += hill([[-40, 660], [220, 640], [460, 654], [700, 634], [840, 646]], '#94c45e');
    s += lion({ x: 450, y: 720, s: .6, lamb: false, flip: true, face: 'smile', k: 'n2' });
    s += cow({ x: 650, y: 740, s: .56, flip: true, k: 'n5' });
    s += rabbit({ x: 330, y: 760, s: 1, flip: true, k: 'n3' }) + turtle({ x: 560, y: 778, s: .9, flip: true, k: 'n4' });
    s += adao({ x: 180, y: 744, s: 1.04, face: 'grin', look: .5, armR: { a: 112, b: -14 }, armL: { a: 14 }, k: 'adao' });
    s += flowerBand(341, 770, 795, 6);
    return s;
  },
  setup(api) {
    const named = new Set();
    for (const [k, name, snd] of NOMES) api.tap(api.q(k), 'Animal sem nome', async () => {
      Array.isArray(snd) ? api.snd(...snd) : api.snd(snd);
      api.hop(api.q(k), 14);
      api.wave(api.q('adao'), 'armR');
      api.bubble(190, 460, name, { key: 'a', size: 34, dur: 1500 });
      if (named.has(k)) return;
      named.add(k);
      api.q(k).setAttribute('aria-label', name.replace('!', ''));
      if (named.size === NOMES.length) { await api.wait(1600); api.snd('tada'); api.bubble(190, 460, 'Todos têm um nome!', { key: 'a', dur: 2600 }); api.nudgeNext(2000); }
    });
    api.tap(api.q('adao'), 'Adão', () => { api.snd('hello'); api.bubble(190, 460, 'Que nome lhe vou dar?', { key: 'a' }); });
  }
});

/* =====================================================================
   8 — DEUS FEZ EVA
   ===================================================================== */
SCENES.push({
  key: 'eva', title: 'Deus fez Eva', ref: 'Gênesis 2.18-23', tint: 'rose',
  text: [
    'Mas não havia ninguém igual a Adão. Deus disse:',
    { q: 'Não é bom o homem ficar sozinho. Vou fazer uma companheira para ele.', who: 'deus' },
    'Deus fez Adão adormecer. Zzz... E fez a mulher. O nome dela era Eva. Adão ficou muito feliz!'
  ],
  fact: 'Eva quer dizer «vida».',
  hint: 'Toca no Adão para ele acordar.',
  alt: 'Adão dorme na relva debaixo de uma árvore. Quando acorda, Eva está ao lado dele, e os dois sorriem felizes.',
  cue: [300, 690],
  art() {
    let s = eden({ sun: false, sky: [[0, '#f6c4b0'], [.5, '#fbe3cf'], [1, '#fdf2e2']] });
    s += glory(560, 70, 260, 'luz');
    s += fruitTree(150, 640, 1.1, { fruit: '#e86a9a' });
    s += hill([[-40, 640], [220, 616], [460, 632], [700, 610], [840, 626]], '#94c45e');
    s += grassBand(351, 650, 770, 12);
    s += `<g transform="translate(300,712) rotate(-90)" data-k="dorme"><g>${adao({ x: 0, y: 100, s: .86, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>`;
    s += `<g data-k="zz"><text class="zzz svgtxt" style="--d:3s" x="200" y="660" font-size="34" fill="#ffffff">z</text><text class="zzz svgtxt" style="--d:3s;animation-delay:-1.5s" x="222" y="630" font-size="26" fill="#ffffff">z</text></g>`;
    s += `<g data-k="acordado" opacity="0" style="pointer-events:none">${adao({ x: 320, y: 720, s: 1, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'adao' })}</g>`;
    s += `<g data-k="evaG" opacity="0" style="pointer-events:none">${eva({ x: 520, y: 722, s: .98, face: 'joy', look: -.5, armL: { a: 150, b: -20 }, armR: { a: 20 }, k: 'eva' })}</g>`;
    s += flowerBand(352, 740, 792, 7, ['#e86a9a', '#ffffff', '#f2c14e']);
    return s;
  },
  setup(api) {
    const wake = async () => {
      if (api.st.awake) return; api.st.awake = true;
      api.snd('snore');
      await api.wait(1000);
      api.snd('anoint');
      api.q('evaG').style.pointerEvents = 'auto';
      api.anim(api.q('evaG'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1000, fill: 'forwards' });
      api.burst(520, 560, 'spark', 14, { col: '#fff6c8' });
      await api.wait(1000);
      api.q('dorme').setAttribute('opacity', '0'); api.q('zz').setAttribute('opacity', '0');
      api.q('acordado').style.pointerEvents = 'auto';
      api.anim(api.q('acordado'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('tada'); api.burst(420, 470, 'heart', 8);
      api.bubble(320, 440, 'Agora tenho alguém como eu!', { key: 'a', dur: 2800 });
      api.nudgeNext(2800);
    };
    api.tap(api.q('dorme'), 'Adão a dormir', wake);
    api.tap(api.q('adao'), 'Adão', () => { if (!api.st.awake) return; api.snd('heart'); api.burst(320, 470, 'heart', 4); api.bubble(320, 440, 'Que alegria!', { key: 'a' }); });
    api.tap(api.q('eva'), 'Eva', () => { if (!api.st.awake) return; api.snd('hello'); api.hop(api.q('eva'), 12); api.bubble(520, 440, 'Olá, Adão!', { key: 'e' }); });
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('chime', 'E6'); api.burst(560, 100, 'spark', 8, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   9 — TUDO ERA MUITO BOM
   ===================================================================== */
SCENES.push({
  key: 'dias', title: 'Tudo era muito bom!', ref: 'Gênesis 1.31–2.3', tint: 'gold',
  text: [
    'Em seis dias, Deus fez tudo! Ele olhou e viu que tudo era muito bom.',
    'No sétimo dia, Deus descansou.'
  ],
  fact: 'O sétimo dia é para descansar e agradecer a Deus.',
  hint: 'Toca nos sete dias da criação.',
  alt: 'Sete medalhas no céu mostram os dias da criação: a luz, o céu e o mar, as plantas, o sol e a lua, os peixes e as aves, os animais e as pessoas, e o descanso. Em baixo, Adão e Eva olham para o pôr do sol.',
  cue: [100, 168],
  art() {
    let s = sky('sky', [[0, '#7fb6e6'], [.45, '#f6c99a'], [.75, '#fbe0b6'], [1, '#fbe0b6']]);
    s += sun(400, 450, 56, { fill: '#ffb84a', fill2: '#ffcf6e', glow: '#ffe2a8', face: true });
    s += hill([[-40, 470], [160, 440], [380, 462], [600, 430], [840, 452]], '#b4c97a');
    s += fruitTree(120, 520, .66, { fruit: '#e5483f' }) + palm(700, 530, .5);
    s += hill([[-40, 560], [220, 532], [460, 550], [700, 526], [840, 540]], '#9cbd62');
    s += elephant({ x: 650, y: 640, s: .46, flip: true }) + giraffe({ x: 560, y: 610, s: .5, flip: true });
    s += hill([[-40, 640], [220, 612], [460, 630], [700, 604], [840, 622]], '#86b357');
    s += adao({ x: 330, y: 740, s: .9, face: 'joy', look: .2, armL: { a: 20 }, armR: { a: 40, b: 20 }, k: 'adao' });
    s += eva({ x: 450, y: 744, s: .86, face: 'joy', look: -.2, armL: { a: 40, b: 20 }, armR: { a: 20 }, k: 'eva' });
    s += sheep({ x: 170, y: 760, s: .7, k: 'ove' }) + rabbit({ x: 610, y: 770, s: .9, flip: true });
    s += flowerBand(361, 760, 795, 7);
    DAYS.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="d${i}"><g class="act">${dayIcon(i)}${hitC(0, 0, 46)}</g></g>`);
    return s;
  },
  setup(api) {
    const done = new Set();
    DAYS.forEach(([x, y], i) => api.tap(api.q('d' + i), trf('Dia {n}', { n: i + 1 }), async () => {
      api.snd('count', i + 1);
      api.anim(api.act(api.q('d' + i)), [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      api.badge(x + 34, y - 34, String(i + 1), { key: 'b' + i });
      api.bubble(x, y + 40, DAY_NAMES[i], { key: 'n', below: true, size: 26, dur: 1500 });
      done.add(i);
      if (done.size === 7 && !api.st.done) {
        api.st.done = true;
        await api.wait(1500);
        api.snd('victory'); api.burst(400, 300, 'confetti', 20);
        api.bubble(390, 470, 'Tudo é muito bom!', { key: 'e', dur: 2800 });
        api.nudgeNext(2400);
      }
    }));
    api.tap(api.q('adao'), 'Adão', () => { api.snd('hello'); api.hop(api.q('adao'), 12); api.bubble(330, 480, 'Que lindo!', { key: 'e' }); });
    api.tap(api.q('eva'), 'Eva', () => { api.snd('heart'); api.burst(450, 520, 'heart', 4); });
    api.tap(api.q('ove'), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q('ove')); });
  }
});

/* =====================================================================
   10 — A ÚNICA REGRA
   ===================================================================== */
const TREE_A = [130, 560, .95], TREE_B = [680, 560, .9], BASKET = [400, 760];
const FR = [[-56, -140], [-20, -186], [30, -170], [62, -138], [6, -128], [-34, -112]];
SCENES.push({
  key: 'arvore', title: 'A única regra', ref: 'Gênesis 2.9, 16-17', tint: 'meadow',
  text: [
    'No jardim havia muitas árvores com fruta saborosa.',
    'Mesmo no meio, havia uma árvore especial. Deus disse:',
    { q: 'Vocês podem comer de todas as árvores. Só não comam desta aqui.', who: 'deus' }
  ],
  fact: 'Deus deu esta regra porque amava Adão e Eva.',
  hint: 'Toca nas frutas para as colheres.',
  alt: 'Adão e Eva no jardim, entre duas árvores cheias de fruta e um cesto. No meio, uma árvore diferente brilha, com frutos dourados.',
  cue: [126, 420],
  art() {
    let s = eden({ sunX: 400, sunY: 90, sunR: 36 });
    s += fruitTree(400, 520, 1.15, { k: 'especial', leaf: '#7a9a4a', dark: '#5f7a3a', fruit: '#f2c14e', glow: '#fff3c4', fruits: [[-50, -150], [-6, -192], [44, -160], [10, -128]] });
    s += hill([[-40, 560], [220, 540], [460, 552], [700, 534], [840, 546]], '#94c45e');
    s += fruitTree(TREE_A[0], TREE_A[1], TREE_A[2], { kf: 'fa', fruits: FR });
    s += fruitTree(TREE_B[0], TREE_B[1], TREE_B[2], { kf: 'fb', fruit: '#f28c3a', fruits: FR });
    s += grassBand(371, 600, 760, 10);
    s += adao({ x: 250, y: 744, s: .96, face: 'smile', look: .4, armL: { a: 20 }, armR: { a: 30, b: 30 }, k: 'adao' });
    s += eva({ x: 560, y: 748, s: .92, face: 'smile', look: -.4, armL: { a: 30, b: 30 }, armR: { a: 20 }, k: 'eva' });
    s += `<g transform="translate(${BASKET[0]},${BASKET[1]})" data-k="cesta"><g class="act"><path d="M-46,-34 C-46,-80 46,-80 46,-34" stroke="${OL}" stroke-width="9" fill="none"/><path d="M-46,-34 C-46,-80 46,-80 46,-34" stroke="#c98f57" stroke-width="5" fill="none"/><path d="M-54,-38 L54,-38 L42,6 L-42,6 Z" fill="#c98f57" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-50,-24 L50,-24 M-46,-10 L46,-10" stroke="#a46e3c" stroke-width="3"/><g data-k="dentro"></g>${hitC(0, -24, 50)}</g></g>`;
    s += flowerBand(372, 770, 795, 6);
    return s;
  },
  setup(api) {
    let n = 0;
    const inside = api.q('dentro');
    const pick = (tree, key, col) => FR.forEach(([fx, fy], i) => {
      const el = api.q(key + i);
      api.tap(el, 'Fruta', async () => {
        if (el.dataset.done) return; el.dataset.done = 1;
        const [tx, ty, ts] = tree, ax = tx + fx * ts, ay = ty + fy * ts;
        api.snd('pluck', ['C5', 'E5', 'G5', 'A5', 'D5', 'F5'][i]);
        await api.anim(api.act(el), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${(BASKET[0] - ax) / ts * .5}px,${(BASKET[1] - 60 - ay) / ts * .5 - 60}px)`, offset: .5 }, { transform: `translate(${(BASKET[0] - ax) / ts}px,${(BASKET[1] - 50 - ay) / ts}px)` }], { duration: 650, easing: 'ease-in', fill: 'forwards' });
        el.setAttribute('opacity', '0');
        n++;
        const c = svgEl('circle', { cx: -30 + ((n - 1) % 6) * 12, cy: -40 - Math.floor((n - 1) / 6) * 10, r: 10, fill: col, stroke: OL, 'stroke-width': 2.2 });
        inside.append(c);
        api.badge(BASKET[0] + 50, BASKET[1] - 90, String(n), { key: 'cnt' });
        if (n % 4 === 0) { api.snd('crunch'); api.bubble(n % 8 ? 250 : 560, 480, n % 8 ? 'Hum, que delícia!' : 'Que fruta tão boa!', { key: 'c' }); }
        if (n === 12) { api.snd('tada'); api.nudgeNext(1600); }
      });
    });
    pick(TREE_A, 'fa', '#e5483f');
    pick(TREE_B, 'fb', '#f28c3a');
    api.tap(api.q('especial'), 'Árvore do conhecimento do bem e do mal', () => {
      api.snd('hm'); api.shakeHead(api.q('eva')); api.shakeHead(api.q('adao'));
      api.bubble(560, 490, 'Desta árvore, não! Deus disse.', { key: 'e', dur: 2400 });
    });
    api.tap(api.q('adao'), 'Adão', () => { api.snd('hello'); api.hop(api.q('adao'), 12); api.bubble(250, 480, 'Obrigado pela fruta, Deus!', { key: 'c' }); });
    api.tap(api.q('eva'), 'Eva', () => { api.snd('heart'); api.burst(560, 520, 'heart', 4); });
  }
});

/* =====================================================================
   11 — A SERPENTE ESPERTA
   ===================================================================== */
SCENES.push({
  key: 'serpente', title: 'A serpente manhosa', ref: 'Gênesis 3.1-6', tint: 'stone',
  text: [
    'Um dia, uma serpente mentirosa falou com Eva:',
    { q: 'Come esta fruta! Vais ficar igual a Deus.', who: 'serpente' },
    'Eva comeu a fruta. Depois deu-a a Adão, e ele também comeu.'
  ],
  fact: 'Adão e Eva não obedeceram a Deus. A Bíblia chama a isso pecado.',
  hint: 'Toca na serpente e depois na fruta.',
  alt: 'Uma serpente verde, enrolada num ramo da árvore do meio do jardim, fala com Eva. Eva olha para uma fruta dourada; Adão está logo atrás.',
  cue: [560, 330],
  art() {
    let s = eden({ sun: false, sky: [[0, '#a9c3cf'], [.6, '#e6ecd8'], [1, '#e6ecd8']], h1: '#b4c98a', h2: '#9cbd70' });
    s += cloud(150, 130, .9, { fill: '#f2f2ee', shade: '#d6dbe0' });
    s += fruitTree(520, 640, 1.65, { leaf: '#7a9a4a', dark: '#5f7a3a', fruit: '#f2c14e', fruits: [[-60, -150], [40, -206], [64, -150], [-30, -200]] });
    s += hill([[-40, 660], [220, 640], [460, 652], [700, 636], [840, 646]], '#8fb85a');
    s += snake({ x: 560, y: 420, s: .95, pts: [[-120, -40], [-80, -10], [-40, -36], [0, -6], [36, -30], [50, -70]], k: 'cobra' });
    s += `<g transform="translate(454,456)" data-k="fruta"><g class="act"><circle r="15" fill="#f2c14e" stroke="${OL}" stroke-width="2.8"/><path d="M-4,-8 q-4,-4 -6,-1" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M0,-15 q5,-10 12,-7 q-3,7 -12,7" fill="#5f9a3a" stroke="${OL}" stroke-width="1.8"/><g class="twinkle" style="--d:2s"><path d="${sparkle(9)}" transform="translate(16,-16)" fill="#fffbe8"/></g>${hitC(0, 0, 30)}</g></g>`;
    s += adao({ x: 140, y: 744, s: .92, face: 'smile', look: .4, armL: { a: 14 }, armR: { a: 20 }, k: 'adao' });
    s += eva({ x: 330, y: 748, s: 1.02, face: 'o', look: .6, armL: { a: 20 }, armR: { a: 128, b: -10 }, k: 'eva' });
    s += grassBand(381, 690, 780, 10, ['#6a9440']);
    s += `<rect data-k="nublado" x="-40" y="-40" width="900" height="900" fill="#3a4a6a" opacity="0" style="pointer-events:none"/>`;
    return s;
  },
  setup(api) {
    const said = [N('Será que Deus disse mesmo...?'), N('Come! Vais saber tudo!'), N('Só uma dentadinha...')];
    let n = 0;
    api.tap(api.q('cobra'), 'Serpente', () => {
      api.snd('hiss');
      api.anim(api.part(api.q('cobra'), 'head'), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(10px,-8px)' }, { transform: 'translate(0px,0px)' }], { duration: 700 });
      api.bubble(600, 300, said[n++ % said.length], { key: 's', dur: 2200 });
    });
    api.tap(api.q('fruta'), 'Fruta da árvore do meio', async () => {
      if (api.st.ate) return; api.st.ate = true;
      const f = api.q('fruta');
      await api.anim(api.act(f), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-60px,24px)' }], { duration: 700, easing: 'ease-in-out', fill: 'forwards' });
      api.snd('crunch');
      api.bubble(330, 480, 'Nhac!', { key: 'e', size: 30, dur: 1100 });
      await api.wait(1100);
      api.snd('crunch');
      await api.anim(api.act(f), [{ transform: 'translate(-60px,24px)' }, { transform: 'translate(-280px,70px)', opacity: 1 }, { transform: 'translate(-300px,80px)', opacity: 0 }], { duration: 900, fill: 'forwards' });
      api.snd('thunder');
      api.anim(api.q('nublado'), [{ opacity: 0 }, { opacity: .26 }], { duration: 1600, fill: 'forwards' });
      api.bubble(330, 480, 'Ai... o que é que nós fizemos?', { key: 'e', dur: 2800 });
      api.nudgeNext(2600);
    });
    api.tap(api.q('eva'), 'Eva', () => { api.snd('hm'); api.bubble(330, 480, api.st.ate ? 'Nós desobedecemos...' : 'Hum... será?', { key: 'e' }); });
    api.tap(api.q('adao'), 'Adão', () => { api.snd('hm'); api.bubble(140, 500, api.st.ate ? 'Que tristeza...' : 'Eva, cuidado!', { key: 'a' }); });
  }
});

/* =====================================================================
   12 — ONDE VOCÊ ESTÁ?
   ===================================================================== */
SCENES.push({
  key: 'esconde', title: 'Onde estás?', ref: 'Gênesis 3.8-13', tint: 'dusk',
  text: [
    'Adão e Eva ficaram com vergonha e com medo. Esconderam-se atrás das plantas.',
    'Mas Deus chamou:',
    { q: 'Adão, onde estás?', who: 'deus' }
  ],
  fact: 'Ninguém se consegue esconder de Deus. Ele procura-nos porque nos ama!',
  hint: 'Toca nos arbustos para encontrares Adão e Eva.',
  alt: 'No fim da tarde, o jardim fica alaranjado. Adão e Eva estão escondidos atrás de dois arbustos, e uma luz suave chega do céu.',
  cue: [240, 650],
  art() {
    let s = eden({ sun: false, sky: [[0, '#7a6aa8'], [.5, '#f0a07a'], [.8, '#fbd3a2'], [1, '#fbd3a2']], h1: '#9cab6a', h2: '#86a05a' });
    s += glory(640, 120, 230, 'luz');
    s += fruitTree(110, 560, .8, { leaf: '#5f8f42', dark: '#4a7434' }) + fruitTree(470, 520, .62, { leaf: '#5f8f42', dark: '#4a7434', fruit: '#f28c3a' });
    s += hill([[-40, 600], [220, 580], [460, 594], [700, 574], [840, 588]], '#7a9a4e');
    s += `<g data-k="adaoP">${adao({ x: 262, y: 786, s: .9, face: 'worry', look: .3, armL: { a: -20, b: -80 }, armR: { a: -20, b: -80 } })}</g>`;
    s += shrub(250, 742, 1.8, '#4f8a3a', { k: 'arb0', hi: '#6aa246' });
    s += `<g data-k="evaP">${eva({ x: 570, y: 787, s: .88, face: 'worry', look: -.3, armL: { a: -20, b: -80 }, armR: { a: -20, b: -80 } })}</g>`;
    s += shrub(580, 742, 1.8, '#4f8a3a', { k: 'arb1', hi: '#6aa246', flip: true });
    s += grassBand(391, 730, 790, 8, ['#5f8a3e']);
    return s;
  },
  setup(api) {
    const found = new Set();
    const said = [N('Tive medo e escondi-me.'), N('A serpente enganou-me...')];
    ['adaoP', 'evaP'].forEach((k, i) => api.tap(api.q('arb' + i), 'Arbusto', async () => {
      const x = i ? 580 : 250;
      api.snd('swish');
      api.anim(api.act(api.q('arb' + i)), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], { duration: 500 });
      if (!found.has(k)) {
        found.add(k);
        api.q(k).style.transform = 'translateY(0px)';
        await api.anim(api.q(k), [{ transform: 'translateY(0px)' }, { transform: 'translateY(-150px)' }], { duration: 600, fill: 'forwards', easing: 'cubic-bezier(.3,1.4,.5,1)' });
      }
      api.bubble(x, 300, said[i], { key: 'p', dur: 2600 });
      if (found.size === 2 && !api.st.done) { api.st.done = true; api.nudgeNext(2800); }
    }));
    api.tap(api.q('luz'), 'Deus a chamar', () => { api.snd('choir', ['C4', 'G4', 'C5']); api.burst(640, 140, 'spark', 8, { col: '#fff1b0' }); api.bubble(640, 250, 'Adão, onde estás?', { key: 'd', below: true, dur: 2600 }); });
  }
});

/* =====================================================================
   13 — DEUS CONTINUOU AMANDO
   ===================================================================== */
SCENES.push({
  key: 'promessa', title: 'Deus continuou a amar', ref: 'Gênesis 3.15, 21-23', tint: 'gold',
  text: [
    'Adão e Eva tiveram de sair do jardim. Que tristeza!',
    'Mas Deus continuou a amá-los. Ele próprio lhes fez roupas.',
    'E Deus prometeu: um dia, ia enviar alguém para vencer o mal.'
  ],
  fact: 'Quem é que Deus prometeu enviar? Jesus!',
  hint: 'Toca nas roupas que Deus fez e depois na luz.',
  alt: 'Na saída do jardim, Adão e Eva olham para trás. Ao lado deles, numa pedra, estão roupas quentinhas que Deus fez. No céu, uma luz dourada brilha.',
  cue: [460, 690],
  art() {
    let s = sky('sky', [[0, '#9fc6e8'], [.55, '#fde2b8'], [1, '#fde2b8']]);
    s += glory(400, 80, 280, 'luz');
    s += hill([[-40, 480], [180, 450], [400, 470], [620, 446], [840, 466]], '#c9cf8a');
    s += `<defs>${rg('edenluz', [[0, '#ffffff', 1], [.5, '#fff3c4', .9], [1, '#ffe28a', .5]])}</defs><g transform="translate(610,560)"><path d="M-130,40 L-130,-180 C-130,-250 130,-250 130,-180 L130,40 Z" fill="${UR('edenluz')}"/>${fruitTree(0, 30, .5, { fruit: '#f2c14e' })}${blob([[-150, -120, 40], [-120, -200, 46], [-50, -250, 50], [30, -256, 52], [110, -214, 46], [150, -130, 40]], '#5f9a3a')}${blob([[-80, -240, 16], [60, -240, 14]], '#8cc464', 0)}${limb(-130, 40, -128, -150, 26, '#8b6b4b')}${limb(130, 40, 128, -150, 26, '#8b6b4b')}</g>`;
    s += hill([[-40, 600], [220, 576], [460, 592], [700, 572], [840, 586]], '#b8c27a');
    s += `<path d="M-40,780 C160,700 360,650 560,620 L620,640 C420,680 220,740 60,820 Z" fill="#e2cf9a"/>`;
    s += `<g data-k="folha">${adao({ x: 220, y: 744, s: .98, face: 'sad', look: .6, armL: { a: 14 }, armR: { a: 20 } })}${eva({ x: 340, y: 750, s: .94, face: 'sad', look: .6, armL: { a: 14 }, armR: { a: 20 } })}</g>`;
    s += `<g data-k="pele" opacity="0">${adao(Object.assign({}, PELE, { x: 220, y: 744, s: .98, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 150, b: -20 } }))}${eva(Object.assign({}, PELE, { tunic: '#b8865a', x: 340, y: 750, s: .94, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 20 }, extra: hairFlower }))}</g>`;
    s += `<g transform="translate(470,720)" data-k="roupas"><g class="act">${rock(0, 26, 120, 60)}<g transform="translate(0,-36)"><path d="M-46,0 C-40,-18 40,-18 46,0 L42,14 L-42,14 Z" fill="#a8774a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-40,-14 C-30,-30 30,-30 40,-14 L36,-2 L-36,-2 Z" fill="#b8865a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-26,-6 l8,4 M0,-8 l8,4 M22,-6 l8,4" stroke="#8a5a33" stroke-width="3" stroke-linecap="round"/></g>${hitC(0, -20, 70)}</g></g>`;
    s += flowerBand(401, 770, 795, 5);
    return s;
  },
  setup(api) {
    api.tap(api.q('roupas'), 'Roupas que Deus fez', async () => {
      if (api.st.dressed) return; api.st.dressed = true;
      api.snd('gift');
      api.anim(api.act(api.q('roupas')), [{ opacity: 1 }, { opacity: 0, transform: 'translateY(-20px)' }], { duration: 600, fill: 'forwards' });
      api.anim(api.q('folha'), [{ opacity: 1 }, { opacity: 0 }], { duration: 700, fill: 'forwards' });
      api.anim(api.q('pele'), [{ opacity: 0 }, { opacity: 1 }], { duration: 700, fill: 'forwards' });
      api.burst(280, 560, 'heart', 8);
      await api.wait(800);
      api.bubble(220, 470, 'Obrigado, Deus! Que quentinho!', { key: 'a', dur: 2600 });
    });
    api.tap(api.q('luz'), 'Luz de Deus', async () => {
      api.snd('choir', ['C4', 'E4', 'G4', 'C5', 'E5']);
      api.burst(400, 120, 'star', 12, { col: '#ffe08a' });
      api.bubble(400, 230, 'Um dia, vou enviar um Salvador!', { key: 'd', below: true, dur: 3200 });
      if (!api.st.promise) { api.st.promise = true; api.nudgeNext(3200); }
    });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'O céu da noite cheio de estrelas sobre as colinas; uma ovelhinha dorme debaixo de uma árvore com fruta.',
  cue: [430, 160],
  questions: [
    ['O que Deus fez no primeiro dia?', 'A luz!'],
    ['Como se chamava o jardim?', 'Éden.'],
    ['Quem deu nome aos animais?', 'Adão.'],
    ['Adão e Eva obedeceram a Deus?', 'Não. Comeram a fruta que Deus lhes tinha dito para não comerem.'],
    ['Deus deixou de amar Adão e Eva?', 'Não! Deus continuou a amá-los.']
  ],
  verse: ['Deus olhou para tudo o que tinha feito, e tudo era muito bom.', 'Gênesis 1.31'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(411, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 200, 34);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 480], [140, 450], [330, 470], [520, 440], [700, 460], [840, 450]], '#2b416c');
    s += fruitTree(600, 600, .9, { leaf: '#2f5a4a', dark: '#24483c', hi: '#3a6a58', fruit: '#c06a4a', trunk: '#5a4a5a' });
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += sheep({ x: 300, y: 740, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' }) + rabbit({ x: 470, y: 744, s: .9, col: '#cfd4e6', dark: '#aab0c8' });
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

Ov.addBook({
  id: 'adao',
  title: 'Adão e Eva',
  cover: { kicker: 'Uma história da Bíblia', title: 'Adão e Eva', small: 'no Jardim do Éden', sub: 'Deus fez tudo com muito amor' },
  color: '#2f6b3a',
  ref: 'Gênesis 1 a 3',
  scenes: SCENES
});
})();
