/* =====================================================================
   LIVRO: ZAQUEU, O HOMEM PEQUENINO  (Lucas 19.1-10)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const ZAQUEU = { kind: 'adult', skin: '#d39463', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#f2c14e', bandCol: '#8a5fc2', tunic: '#8a5fc2', stripes: '#c9a6e0', cloak: '#5a3a7a', cloakTrim: '#f2c14e', belt: '#f2c14e' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' },
  { kind: 'adult', skin: '#a8683e', hair: '#1f1612', beard: 'long', beardCol: '#1f1612', head: 'cloth', clothCol: '#f4efe6', bandCol: '#2f6db5', tunic: '#7a5a8a', belt: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' }
];
const POBRES = [
  { kind: 'adult', skin: '#c98a5a', hair: '#8a7a6a', beard: 'long', beardCol: '#9a8a7a', tunic: '#9a8a6a', belt: '#5a4a3a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#8a8a7a', hairStyle: 'long', hair: '#3a2520', tunic: '#a89a7a', belt: '#5a4a3a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'short', hair: '#2b1d17', tunic: '#b9a98a', belt: '#5a4a3a' }
];
const ZS = .76;
const jesus = o => person(Object.assign({}, JESUS, o));
const zaqueu = o => person(Object.assign({}, ZAQUEU, { s: ZS }, o));
const SIT = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
function jerico(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 42, sky: [[0, '#8ccbed'], [.6, '#d9eef2'], [1, '#f6ead2']] }, o.day || {}));
  s += hill([[-40, 400], [220, 376], [460, 396], [700, 370], [840, 388]], '#d9c08e');
  s += town(-10, 470, 1.15, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' }) + town(470, 466, 1.1, { wall: '#f1dcb2', shade: '#dbc08c', roof: '#e2c696' });
  s += palm(o.palmX ?? 260, 520, 1) + palm(700, 520, .9);
  s += `<rect x="-40" y="${o.chaoY ?? 560}" width="900" height="400" fill="${o.chao || '#ead7aa'}"/>`;
  return s;
}
// o sicómoro: árvore de tronco grosso e ramos baixos (o "ramo" é onde o Zaqueu se senta)
function sicomoro(x, y, s = 1, o = {}) {
  let g = `<path d="M-34,0 C-30,-120 -40,-220 -26,-330 L26,-330 C36,-220 30,-120 40,0 Z" fill="#8b6b4b" stroke="${OL}" stroke-width="4"/>`;
  g += `<path d="M-20,-300 C-80,-320 -140,-310 -190,-330" stroke="${OL}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M-20,-300 C-80,-320 -140,-310 -190,-330" stroke="#8b6b4b" stroke-width="18" fill="none" stroke-linecap="round"/>`;
  g += `<path d="M20,-320 C80,-350 120,-360 170,-400" stroke="${OL}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M20,-320 C80,-350 120,-360 170,-400" stroke="#8b6b4b" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  g += blob([[-150, -430, 90], [-40, -480, 110], [90, -450, 100], [180, -420, 80], [-200, -380, 60], [40, -390, 80]], '#5f9a46');
  g += blob([[-110, -470, 30], [10, -520, 34], [120, -480, 28]], '#77b257', 0);
  if (o.figos !== false) g += [[-160, -400], [-60, -440], [60, -420], [150, -440], [-10, -380]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="8" fill="#a8c46a" stroke="${OL}" stroke-width="2"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
// folhas da frente (para tapar um pouco o Zaqueu quando está no ramo)
function folhasFrente(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" style="pointer-events:none">${blob([[-222, -318, 30], [-176, -306, 26]], '#5f9a46')}${blob([[-214, -328, 10]], '#77b257', 0)}</g>`;
}
function mesaImpostos(x, y) {
  let g = `<rect x="-120" y="-90" width="240" height="22" rx="6" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="-104" y="-70" width="18" height="70" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="86" y="-70" width="18" height="70" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/>`;
  g += `<g transform="translate(-60,-96)"><rect x="-26" y="-14" width="52" height="16" fill="#f6ead0" stroke="${OL}" stroke-width="2.4"/>${limb(-30, -6, 30, -6, 7, '#a46e3c', 2)}</g>`;
  return `<g transform="translate(${x},${y})">${g}</g>`;
}
function pilhaMoedas(x, y, k = '') {
  let g = '';
  for (let i = 0; i < 4; i++) g += `<ellipse cx="0" cy="${-i * 7}" rx="16" ry="6" fill="#f2c14e" stroke="${OL}" stroke-width="2.2"/>`;
  g += `<ellipse cx="26" cy="0" rx="16" ry="6" fill="#f2c14e" stroke="${OL}" stroke-width="2.2"/><ellipse cx="26" cy="-7" rx="16" ry="6" fill="#f6d36a" stroke="${OL}" stroke-width="2.2"/>`;
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(12, -10, 40) : ''}</g></g>`;
}
function bau(x, y, k = '') {
  let g = `<rect x="-60" y="-56" width="120" height="56" rx="6" fill="#8a5a33" stroke="${OL}" stroke-width="3"/><path d="M-60,-56 Q0,-96 60,-56 Z" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="-8" y="-60" width="16" height="22" rx="3" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/>`;
  g += `<g fill="#f2c14e" stroke="${OL}" stroke-width="2">${[[-30, -60], [-10, -66], [12, -64], [32, -58]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="12" ry="5"/>`).join('')}</g>`;
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -40, 66) : ''}</g></g>`;
}
function salaZaqueu(o = {}) {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#f1dcb2"/><rect x="-40" y="-40" width="900" height="70" fill="#8a5fc2" opacity=".55"/>`;
  s += `<path d="M120,400 L120,220 A70,70 0 0 1 260,220 L260,400 Z" fill="#8fd0f0" stroke="${OL}" stroke-width="3.4"/>${palm(200, 400, .5)}`;
  s += `<path d="M560,400 L560,220 A70,70 0 0 1 700,220 L700,400 Z" fill="#8fd0f0" stroke="${OL}" stroke-width="3.4"/>`;
  s += `<rect x="-40" y="580" width="900" height="300" fill="#c9a873"/><path d="M-40,580 L840,580" stroke="${OL}" stroke-width="4"/>`;
  s += `<path d="M260,584 L540,584 L600,820 L200,820 Z" fill="#8a5fc2" opacity=".5"/>`;
  if (o.lampadas) s += lampStand(60, 580, 170) + lampStand(760, 580, 170);
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Zaqueu, o Homem Pequenino',
  alt: 'O pequeno Zaqueu está sentado num ramo de uma grande árvore e acena, contente. Lá em baixo, Jesus olha para cima e chama-o.',
  cue: [420, 640],
  art() {
    let s = sky('sky', [[0, '#8ccbed'], [.5, '#cdeefa'], [1, '#f6ead2']], 1100);
    s += sun(170, 330, 44, { face: true }) + cloud(640, 290, .8);
    s += hill([[-40, 760], [220, 736], [460, 756], [700, 730], [840, 748]], '#d9c08e');
    s += town(-10, 820, 1.1, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' });
    s += `<rect x="-40" y="880" width="900" height="300" fill="#ead7aa"/>`;
    s += sicomoro(600, 1060, 1.05);
    s += zaqueu({ x: 420, y: 750, s: .9, ...SIT, face: 'joy', look: -.4, armL: { a: 30, b: 40 }, armR: { a: 150, b: -20 }, k: 'zaqueu' });
    s += folhasFrente(600, 1060, 1.05);
    s += jesus({ x: 250, y: 1060, s: 1.12, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 150, b: -30 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('zaqueu'), 'Zaqueu', () => { api.snd('laugh'); api.hop(api.q('zaqueu'), 12); api.bubble(420, 560, 'Olá, Jesus!', { key: 'z' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(250, 690, 'Zaqueu, desce depressa!', { key: 'j' }); });
  }
});

/* =====================================================================
   1 — UM HOMEM RICO EM JERICÓ
   ===================================================================== */
SCENES.push({
  key: 'rico', title: 'Um homem rico em Jericó', ref: 'Lucas 19.1-2', tint: 'gold',
  text: [
    'Em Jericó vivia um homem chamado Zaqueu. Era o chefe dos cobradores de impostos, e era muito rico.',
    'Mas cobrava às pessoas mais dinheiro do que devia...'
  ],
  fact: 'Os cobradores de impostos recolhiam dinheiro para os romanos, e muitas vezes cobravam a mais.',
  hint: 'Toca no Zaqueu e nas moedas.',
  alt: 'Numa rua de Jericó, o pequeno Zaqueu, de roupa roxa, está atrás de uma mesa cheia de moedas. Um homem entrega-lhe mais dinheiro, com cara de poucos amigos.',
  cue: [450, 640],
  art() {
    let s = jerico({ palmX: 120 });
    s += zaqueu({ x: 400, y: 740, s: .9, face: 'grin', look: .5, armL: { a: 30, b: -40 }, armR: { a: 60, b: -40 }, k: 'zaqueu' });
    s += mesaImpostos(400, 780);
    s += pilhaMoedas(440, 690, 'moedas') + pilhaMoedas(340, 692);
    s += person(Object.assign({}, POVO[2], { x: 620, y: 780, s: 1, flip: true, face: 'frown', look: .5, armL: { a: 14 }, armR: { a: 70, b: -30 }, k: 'p0' }));
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('moedas'), 'Moedas', () => { api.snd('chime', ['C6', 'E6', 'G6'][n++ % 3]); api.hop(api.q('moedas'), 10); api.burst(450, 660, 'spark', 6, { col: '#f2c14e' }); if (n === 2) api.nudgeNext(2400); });
    api.tap(api.q('zaqueu'), 'Zaqueu', () => { api.snd('laugh'); api.bubble(400, 470, 'Mais moedas para mim!', { key: 'z' }); });
    api.tap(api.q('p0'), 'Homem a pagar', () => { api.snd('grunt'); api.bubble(620, 440, 'Outra vez tanto dinheiro?!', { key: 'p' }); });
  }
});

/* =====================================================================
   2 — NINGUÉM GOSTAVA DELE
   ===================================================================== */
SCENES.push({
  key: 'sozinho', title: 'Ninguém gostava dele', ref: 'Lucas 19.7', tint: 'stone',
  text: [
    'As pessoas não gostavam do Zaqueu, porque ele as enganava.',
    'Por isso, o Zaqueu andava sempre sozinho.'
  ],
  fact: 'Mesmo sendo rico, o Zaqueu não era feliz.',
  hint: 'Toca nas pessoas e no Zaqueu.',
  alt: 'Na rua, um grupo de pessoas vira as costas ao Zaqueu, que fica sozinho e triste.',
  cue: [600, 600],
  art() {
    let s = jerico({ palmX: 380 });
    s += zaqueu({ x: 200, y: 770, s: .86, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 }, k: 'zaqueu' });
    [[520, 770, 0], [620, 780, 1], [720, 770, 4]].forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: .98, flip: true, back: false, face: 'frown', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'p' + i })));
    return s;
  },
  setup(api) {
    for (let i = 0; i < 3; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('grunt'); api.shakeHead(api.q('p' + i)); api.bubble(x, y - 270 * sc, 'Hmpf!', { key: 'p', size: 28 }); });
    api.tap(api.q('zaqueu'), 'Zaqueu', () => { api.snd('hm'); api.bubble(210, 520, 'Ninguém gosta de mim...', { key: 'z' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
  }
});

/* =====================================================================
   3 — JESUS ESTÁ A CHEGAR!
   ===================================================================== */
SCENES.push({
  key: 'chega', title: 'Jesus está a chegar!', ref: 'Lucas 19.3', tint: 'sand',
  text: [
    'Um dia, Jesus passou por Jericó, e juntou-se uma multidão enorme.',
    'O Zaqueu queria muito ver Jesus, mas era baixinho e não conseguia ver nada!'
  ],
  fact: 'O Zaqueu era tão pequeno que as outras pessoas lhe tapavam a vista.',
  hint: 'Toca no Zaqueu para ele saltar.',
  alt: 'Uma multidão enche a rua para ver Jesus. Atrás das pessoas, o pequeno Zaqueu dá saltos para tentar ver alguma coisa.',
  cue: [150, 600],
  art() {
    let s = jerico({ palmX: 120 });
    s += zaqueu({ x: 150, y: 760, s: .8, face: 'worry', look: .6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'zaqueu' });
    const P = [[250, 780, 0], [340, 790, 2], [430, 776, 1], [520, 792, 3], [610, 780, 4], [700, 790, 2]];
    P.forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: 1.02, back: true, armL: { a: 14 }, armR: { a: i % 2 ? 150 : 14, b: -20 }, k: 'p' + i })));
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('zaqueu'), 'Zaqueu', () => {
      api.snd('boing'); api.hop(api.q('zaqueu'), 70);
      api.bubble(160, 440, n++ % 2 ? 'Daqui não vejo nada!' : 'Não consigo ver!', { key: 'z' });
      if (n === 2) api.nudgeNext(2400);
    });
    for (let i = 0; i < 6; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { api.snd('crowd'); api.bubble(500, 420, 'Jesus vem aí!', { key: 'p', size: 28 }); });
  }
});

/* =====================================================================
   4 — PARA CIMA DA ÁRVORE!
   ===================================================================== */
SCENES.push({
  key: 'arvore', title: 'Para cima da árvore!', ref: 'Lucas 19.4', tint: 'meadow',
  text: [
    'Então, o Zaqueu teve uma ideia: correu à frente de todos e subiu a uma árvore!',
    'Lá de cima, ia conseguir ver Jesus a passar.'
  ],
  fact: 'A árvore era um sicómoro, uma espécie de figueira com ramos baixos, fácil de subir.',
  hint: 'Toca no Zaqueu para ele subir à árvore.',
  alt: 'Junto a uma grande árvore de ramos baixos, o pequeno Zaqueu prepara-se para subir. Depois, fica sentado num ramo, lá no alto.',
  cue: [450, 640],
  art() {
    let s = jerico({ palmX: 120, chaoY: 580 });
    s += sicomoro(600, 800, 1);
    s += `<g data-k="ramo" opacity="0" style="pointer-events:none">${zaqueu({ x: 420, y: 500, s: .8, ...SIT, face: 'laugh', look: -.4, armL: { a: 30, b: 40 }, armR: { a: 150, b: -20 } })}</g>`;
    s += folhasFrente(600, 800, 1);
    s += `<g data-k="chao">${zaqueu({ x: 450, y: 780, s: .8, face: 'determined', look: .6, armL: { a: 150, b: -10 }, armR: { a: 130, b: -10 } })}</g>`;
    s += `<rect class="hit" data-k="zaqueu" x="380" y="560" width="150" height="230" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('zaqueu'), 'Zaqueu', async () => {
      if (api.st.feito) { api.snd('laugh'); api.bubble(420, 260, 'Daqui vejo tudo!', { key: 'z' }); return; }
      api.st.feito = true;
      api.snd('whoosh');
      await api.anim(api.q('chao'), [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: 'translate(-20px,-220px)', opacity: 1, offset: .8 }, { transform: 'translate(-30px,-260px)', opacity: 0 }], { duration: 1100, fill: 'forwards', easing: 'ease-in-out' });
      await api.anim(api.q('ramo'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      const z = api.q('zaqueu'); z.setAttribute('y', '330'); z.setAttribute('x', '340');
      api.snd('laugh');
      api.bubble(420, 260, 'Daqui vejo tudo!', { key: 'z' });
      api.nudgeNext(2400);
    });
  }
});

/* =====================================================================
   5 — «ZAQUEU, DESCE DEPRESSA!»
   ===================================================================== */
SCENES.push({
  key: 'desce', title: '«Zaqueu, desce depressa!»', ref: 'Lucas 19.5-6', tint: 'gold',
  text: [
    'Quando Jesus chegou perto da árvore, olhou para cima e disse:',
    { q: 'Zaqueu, desce depressa! Hoje vou ficar em tua casa!', who: 'jesus' },
    'O Zaqueu desceu a correr, cheio de alegria!'
  ],
  fact: 'Jesus sabia o nome do Zaqueu, mesmo antes de alguém lho dizer!',
  hint: 'Toca em Jesus.',
  alt: 'Debaixo da árvore, Jesus olha para cima e chama o Zaqueu, que está no ramo. O Zaqueu desce, todo contente.',
  cue: [230, 520],
  art() {
    let s = jerico({ palmX: 120, chaoY: 580 });
    s += sicomoro(600, 800, 1);
    s += `<g data-k="ramo">${zaqueu({ x: 420, y: 500, s: .8, ...SIT, face: 'o', look: -.4, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } })}</g>`;
    s += folhasFrente(600, 800, 1);
    s += `<g data-k="chao" opacity="0" style="pointer-events:none">${zaqueu({ x: 380, y: 780, s: .8, face: 'laugh', look: -.5, legs: 'hop', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })}</g>`;
    s += jesus({ x: 220, y: 780, s: 1.06, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 150, b: -30 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', async () => {
      api.bubble(230, 420, 'Zaqueu, desce depressa! Hoje vou ficar em tua casa!', { key: 'j' });
      if (api.st.feito) { api.snd('hello'); return; }
      api.st.feito = true;
      api.snd('hello');
      await api.wait(1600);
      api.snd('whoosh');
      await api.anim(api.q('ramo'), [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: 'translate(-30px,200px)', opacity: 0 }], { duration: 800, fill: 'forwards', easing: 'ease-in' });
      await api.anim(api.q('chao'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('laugh');
      api.burst(380, 600, 'heart', 6);
      api.bubble(450, 545, 'Vem à minha casa, Jesus!', { key: 'z' });
      api.nudgeNext(2600);
    });
  }
});

/* =====================================================================
   6 — AS PESSOAS RESMUNGARAM
   ===================================================================== */
SCENES.push({
  key: 'resmungam', title: 'As pessoas resmungaram', ref: 'Lucas 19.7', tint: 'stone',
  text: [
    'As pessoas começaram a resmungar: «Jesus foi para casa daquele homem que engana toda a gente!»',
    'Mas Jesus gostava do Zaqueu e queria ajudá-lo a mudar.'
  ],
  fact: 'Jesus veio precisamente para ajudar quem tinha feito coisas erradas.',
  hint: 'Toca nas pessoas e em Jesus.',
  alt: 'Jesus e o pequeno Zaqueu caminham juntos, contentes. Atrás deles, algumas pessoas resmungam, de braços cruzados.',
  cue: [160, 600],
  art() {
    let s = jerico({ palmX: 380 });
    [[100, 770, 0], [200, 780, 3], [300, 770, 2]].forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: .95, face: 'frown', look: .5, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'p' + i })));
    s += zaqueu({ x: 520, y: 780, s: .8, face: 'joy', look: .5, legs: 'walk', armL: { a: 14 }, armR: { a: 50, b: -20 }, k: 'zaqueu' });
    s += jesus({ x: 640, y: 780, s: 1.04, flip: true, face: 'smile', look: .5, legs: 'walk', armL: { a: 14 }, armR: { a: 50, b: -40 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    const QUEIXAS = [N('Com aquele?!'), N('Não pode ser!'), N('Ele engana toda a gente!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('grunt'); api.shakeHead(api.q('p' + i)); api.bubble(x, y - 270 * sc, QUEIXAS[i], { key: 'p', size: 26 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(600, 560, 'heart', 4); api.bubble(640, 450, 'Vim para ajudar!', { key: 'j' }); });
    api.tap(api.q('zaqueu'), 'Zaqueu', () => { api.snd('laugh'); api.hop(api.q('zaqueu'), 14); });
  }
});

/* =====================================================================
   7 — UM CORAÇÃO NOVO
   ===================================================================== */
SCENES.push({
  key: 'coracao', title: 'Um coração novo', ref: 'Lucas 19.8', tint: 'rose',
  text: [
    'Em casa, o Zaqueu levantou-se e disse: «Senhor, vou dar metade do que tenho aos pobres.»',
    '«E a quem eu enganei, vou devolver quatro vezes mais!»'
  ],
  fact: 'Quando deixamos Jesus entrar no nosso coração, nós mudamos!',
  hint: 'Toca no baú para o Zaqueu dar moedas.',
  alt: 'Em casa do Zaqueu, Jesus sorri. O Zaqueu abre um baú cheio de moedas e dá-as a pessoas pobres, que ficam muito contentes.',
  cue: [400, 700],
  art() {
    let s = salaZaqueu({});
    s += jesus({ x: 150, y: 780, s: 1.04, face: 'joy', look: .5, armL: { a: 14 }, armR: { a: 40, b: -20 }, k: 'jesus' });
    s += zaqueu({ x: 300, y: 790, s: .86, face: 'joy', look: .5, armL: { a: 60, b: -20 }, armR: { a: 110, b: -20 }, k: 'zaqueu' });
    s += bau(420, 800, 'bau');
    s += `<g data-k="tristes">${POBRES.map((p, i) => person(Object.assign({}, p, { x: [570, 680, 760][i], y: [780, 790, 796][i], s: p.kind === 'adult' ? .92 : .86, flip: true, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 60, b: -40 } }))).join('')}</g>`;
    s += `<g data-k="contentes" opacity="0" style="pointer-events:none">${POBRES.map((p, i) => person(Object.assign({}, p, { x: [570, 680, 760][i], y: [780, 790, 796][i], s: p.kind === 'adult' ? .92 : .86, flip: true, face: 'laugh', look: .5, legs: 'hop', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } }))).join('')}</g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('bau'), 'Baú das moedas', async () => {
      if (n >= 4) { api.snd('gift'); api.burst(420, 720, 'spark', 6, { col: '#f2c14e' }); return; }
      n++;
      api.snd('chime', ['C6', 'E6', 'G6', 'C7'][n - 1]);
      api.hop(api.q('bau'), 8);
      for (let k = 0; k < 3; k++) api.drop(420, 730, 560 + k * 90, 640, '#f2c230');
      api.badge(420, 600, String(n), { key: 'n' });
      if (n === 4) {
        api.anim(api.q('tristes'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
        await api.anim(api.q('contentes'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
        api.snd('laugh');
        api.bubble(680, 450, 'Obrigado, Zaqueu!', { key: 'p' });
        api.nudgeNext(2600);
      }
    });
    api.tap(api.q('zaqueu'), 'Zaqueu', () => { api.snd('hello'); api.bubble(300, 480, 'Quero ser bom, como Jesus!', { key: 'z' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(150, 560, 'heart', 4); });
  }
});

/* =====================================================================
   8 — A SALVAÇÃO CHEGOU!
   ===================================================================== */
SCENES.push({
  key: 'salvacao', title: 'Hoje a salvação chegou!', ref: 'Lucas 19.9-10', tint: 'gold',
  text: [
    'Jesus disse: «Hoje a salvação entrou nesta casa!»',
    'Jesus veio procurar e salvar os que estavam perdidos, como o Zaqueu. E também veio por ti!'
  ],
  fact: 'O nome Zaqueu quer dizer «puro». Com Jesus, o coração dele ficou limpo!',
  hint: 'Toca em Jesus e no Zaqueu.',
  alt: 'Em casa do Zaqueu há festa: à volta de uma mesa com comida, Jesus, o Zaqueu e os amigos sorriem.',
  cue: [400, 480],
  art() {
    let s = salaZaqueu({ lampadas: true });
    s += person(Object.assign({}, POVO[1], { x: 130, y: 700, s: .9, ...SIT, face: 'joy', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } }));
    s += jesus({ x: 310, y: 700, s: 1, ...SIT, face: 'joy', look: .4, armL: { a: 30, b: 40 }, armR: { a: 110, b: -20 }, k: 'jesus' });
    s += zaqueu({ x: 490, y: 700, s: .8, ...SIT, face: 'laugh', look: -.3, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'zaqueu' });
    s += person(Object.assign({}, POBRES[0], { x: 660, y: 700, s: .9, ...SIT, flip: true, face: 'joy', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } }));
    s += `<rect x="60" y="680" width="680" height="24" rx="8" fill="#b57c46" stroke="${OL}" stroke-width="3"/><rect x="80" y="704" width="22" height="70" fill="#8a5a33" stroke="${OL}" stroke-width="3"/><rect x="698" y="704" width="22" height="70" fill="#8a5a33" stroke="${OL}" stroke-width="3"/>`;
    s += `<g transform="translate(220,676)"><ellipse cx="0" cy="0" rx="46" ry="11" fill="#f4ead2" stroke="${OL}" stroke-width="2.6"/>${[[-20, -12, '#7a3a8a'], [0, -18, '#5e9a43'], [18, -12, '#e5483f'], [-6, -8, '#f2c14e']].map(([a, b, c]) => `<circle cx="${a}" cy="${b}" r="11" fill="${c}" stroke="${OL}" stroke-width="2.4"/>`).join('')}</g>`;
    s += `<g transform="translate(580,676)"><ellipse cx="0" cy="0" rx="40" ry="10" fill="#f4ead2" stroke="${OL}" stroke-width="2.6"/><ellipse cx="-10" cy="-10" rx="22" ry="12" fill="#e0a85a" stroke="${OL}" stroke-width="2.4"/><ellipse cx="14" cy="-8" rx="16" ry="9" fill="#e0a85a" stroke="${OL}" stroke-width="2.4"/></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(310, 480, 'spark', 8, { col: '#ffe9a6' }); api.bubble(310, 380, 'Hoje a salvação entrou nesta casa!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('zaqueu'), 'Zaqueu', () => { api.snd('tambourine'); api.hop(api.q('zaqueu'), 16); api.burst(490, 520, 'confetti', 10); api.bubble(490, 420, 'Que dia tão feliz!', { key: 'z' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre Jericó. Uma ovelhinha dorme debaixo da grande árvore do Zaqueu.',
  cue: [430, 160],
  questions: [
    ['Em que cidade vivia o Zaqueu?', 'Em Jericó.'],
    ['Porque é que o Zaqueu subiu à árvore?', 'Porque era baixinho e queria ver Jesus.'],
    ['O que disse Jesus ao Zaqueu?', '«Desce depressa! Hoje vou ficar em tua casa!»'],
    ['O que prometeu o Zaqueu?', 'Dar metade aos pobres e devolver quatro vezes mais.'],
    ['Quem veio Jesus procurar e salvar?', 'Os que estavam perdidos. E também a ti!']
  ],
  wrong: [
    ['Em Belém.', 'Em Nazaré.', 'Em Nínive.'],
    ['Para apanhar fruta.', 'Para se esconder de Jesus.', 'Para brincar.'],
    ['«Fica aí em cima!»', '«Vai-te embora!»', 'Não disse nada.'],
    ['Ficar com o dinheiro todo.', 'Comprar uma árvore maior.', 'Não prometeu nada.'],
    ['Só as pessoas boazinhas.', 'Só os ricos.', 'Só os adultos.']
  ],
  verse: ['O Filho do Homem veio procurar e salvar o que estava perdido.', 'Lucas 19.10'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(9701, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b');
    s += `<g opacity=".7">${town(20, 620, .9, { wall: '#3a3a5a', shade: '#2c2c46', roof: '#4a4a6a' })}</g>`;
    s += hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 672]], '#2c584f');
    s += `<g opacity=".85">${sicomoro(600, 760, .55, { figos: false }).replace(/#5f9a46/g, '#3f6a46').replace(/#77b257/g, '#4f7a56').replace(/#8b6b4b/g, '#5b4b3b')}</g>`;
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

Ov.addBook({
  id: 'zaqueu',
  title: 'Zaqueu, o Homem Pequenino',
  cover: { kicker: 'Uma história da Bíblia', title: 'Zaqueu', small: 'o homem pequenino', sub: 'Jesus veio procurar-te' },
  color: '#5e9a43',
  ref: 'Lucas 19.1-10',
  scenes: SCENES
});
})();
