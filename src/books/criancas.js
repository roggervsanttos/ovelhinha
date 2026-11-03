/* =====================================================================
   LIVRO: JESUS E AS CRIANÇAS  (Marcos 10.13-16)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const DISC = [
  { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#5e7d4a' }
];
const PAIS = [
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'short', beardCol: '#1f1612', head: 'cloth', clothCol: '#e9c46a', bandCol: '#8e3b4f', tunic: '#8e3b4f', belt: '#f2c14e' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' }
];
const KIDS = [
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' },
  { kind: 'child', skin: '#b9784c', hairStyle: 'short', hair: '#1f1612', tunic: '#5e9a43', belt: '#7b4a2a' }
];
const MUNDO = [
  { kind: 'child', skin: '#f1c7a2', hairStyle: 'short', hair: '#e0b04a', tunic: '#e5483f', belt: null },
  { kind: 'child', skin: '#6b4430', hairStyle: 'curly', hair: '#1f1612', hi: '#4a3020', tunic: '#f2c14e', belt: null },
  { kind: 'child', skin: '#e8c08e', hairStyle: 'long', hair: '#1f1612', tunic: '#3f93c7', belt: null },
  { kind: 'child', skin: '#a8683e', hairStyle: 'short', hair: '#1f1612', tunic: '#5e9a43', belt: null },
  { kind: 'child', skin: '#d99a6c', hairStyle: 'long', hair: '#8a4a22', tunic: '#8a5fc2', belt: null },
  { kind: 'child', skin: '#4a2e22', hairStyle: 'curly', hair: '#141018', hi: '#3a2a20', tunic: '#e86a9a', belt: null }
];
const jesus = o => person(Object.assign({}, JESUS, o));
const kid = (i, o) => person(Object.assign({}, KIDS[i], o));
const SIT = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
function colina(o = {}) {
  let s = bgDay(Object.assign({ sunX: 650, sunY: 120, sunR: 42 }, o.day || {}));
  s += hill([[-40, 400], [220, 372], [460, 394], [700, 364], [840, 384]], '#a9c4a0');
  s += `<rect x="-40" y="420" width="900" height="60" fill="#6fb0d8"/><path d="M-40,420 L840,420" stroke="#9fd0ec" stroke-width="5"/>`;
  s += hill([[-40, 500], [200, 474], [420, 494], [640, 470], [840, 486]], '#9cc86e') + hill([[-40, 590], [260, 564], [520, 584], [840, 560]], o.grass || '#8cc464');
  s += `<rect x="-40" y="600" width="900" height="300" fill="${o.grass || '#8cc464'}"/>`;
  if (o.arvore !== false) s += olive(o.arvoreX ?? 120, 600, 1.2);
  return s;
}
function caminho() {
  return `<path d="M-40,700 C200,680 420,690 600,660 C700,644 780,630 860,628 L860,700 C780,704 700,716 600,736 C420,768 200,780 -40,790 Z" fill="#e6d6a6"/>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jesus e as Crianças',
  alt: 'Jesus, sentado na erva, abraça várias crianças sorridentes que correm para Ele. Ao fundo vê-se um lago azul.',
  cue: [400, 760],
  art() {
    let s = sky('sky', [[0, '#8ccbed'], [.5, '#cdeefa'], [1, '#effaf0']], 1100);
    s += sun(640, 330, 46, { face: true }) + cloud(170, 290, .9) + cloud(480, 220, .7);
    s += hill([[-40, 700], [220, 672], [460, 694], [700, 664], [840, 684]], '#a9c4a0');
    s += `<rect x="-40" y="720" width="900" height="60" fill="#6fb0d8"/>`;
    s += hill([[-40, 820], [260, 790], [520, 810], [840, 786]], '#9cc86e');
    s += `<rect x="-40" y="840" width="900" height="300" fill="#8cc464"/>`;
    s += jesus({ x: 400, y: 1020, s: 1.18, ...SIT, face: 'joy', look: 0, armL: { a: 70, b: -40 }, armR: { a: 70, b: -40 }, k: 'jesus' });
    s += kid(0, { x: 250, y: 1040, s: 1.05, face: 'laugh', look: .6, armL: { a: 30 }, armR: { a: 80, b: -40 }, k: 'k0' });
    s += kid(1, { x: 560, y: 1046, s: 1.05, flip: true, face: 'laugh', look: .6, armL: { a: 30 }, armR: { a: 80, b: -40 }, k: 'k1' });
    s += kid(3, { x: 150, y: 1070, s: .95, face: 'joy', look: .6, legs: 'run', armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'k2' });
    s += kid(2, { x: 660, y: 1074, s: .95, flip: true, face: 'joy', look: .6, legs: 'run', armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'k3' });
    s += flowerBand(9001, 1075, 1098, 8);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 740, 'heart', 7); api.bubble(400, 640, 'Gosto muito de vocês!', { key: 'j' }); });
    for (let i = 0; i < 4; i++) api.tap(api.q('k' + i), 'Criança', () => { const [x, y, sc] = api.pos(api.q('k' + i)); api.snd('laugh'); api.hop(api.q('k' + i), 16); api.burst(x, y - 170 * sc, 'heart', 3); });
  }
});

/* =====================================================================
   1 — JESUS ENSINAVA
   ===================================================================== */
SCENES.push({
  key: 'ensina', title: 'Jesus ensinava', ref: 'Marcos 10.1', tint: 'meadow',
  text: [
    'Muitas pessoas vinham ouvir Jesus. Ele ensinava-lhes como Deus as amava.',
    'Todos queriam estar perto d’Ele!'
  ],
  fact: 'Jesus falava de maneira simples, para que todos O pudessem entender.',
  hint: 'Toca em Jesus e nas pessoas.',
  alt: 'Numa colina junto ao lago, Jesus fala para um grupo de pessoas sentadas na erva, que O ouvem com atenção.',
  cue: [250, 520],
  art() {
    let s = colina({ arvoreX: 100 });
    s += jesus({ x: 240, y: 760, s: 1.08, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 110, b: -30 }, k: 'jesus' });
    const P = [[460, 760, PAIS[0]], [560, 770, PAIS[1]], [660, 760, PAIS[2]], [520, 800, DISC[0]], [640, 806, DISC[1]]];
    P.forEach(([x, y, p], i) => s += person(Object.assign({}, p, SIT, { x, y, s: .84, face: 'smile', look: -.6, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'p' + i })));
    s += flowerBand(9101, 770, 800, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(250, 430, 'Deus ama-vos muito!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    const FALAS = [N('Que bonito!'), N('Vamos ouvir!'), N('Jesus fala tão bem!'), N('Que bom!'), N('Amém!')];
    for (let i = 0; i < 5; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('hm'); api.hop(api.q('p' + i), 8); api.bubble(x, y - 230 * sc, FALAS[i], { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   2 — VAMOS VER JESUS!
   ===================================================================== */
SCENES.push({
  key: 'vamos', title: 'Vamos ver Jesus!', ref: 'Marcos 10.13', tint: 'meadow',
  text: [
    'Algumas mães e alguns pais pegaram nos filhos e levaram-nos a Jesus.',
    'Queriam que Jesus os abençoasse.'
  ],
  fact: 'Abençoar é pedir a Deus coisas boas para alguém.',
  hint: 'Toca nas crianças.',
  alt: 'Pais e mães caminham por um caminho de terra com as crianças pela mão. As crianças vão saltitando, contentes.',
  cue: [300, 560],
  art() {
    let s = colina({ arvoreX: 700 });
    s += caminho();
    s += person(Object.assign({}, PAIS[0], { x: 160, y: 740, s: 1, legs: 'walk', face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 40, b: -10 } }));
    s += kid(0, { x: 260, y: 752, s: .92, legs: 'hop', face: 'joy', look: .5, armL: { a: 60, b: -20 }, armR: { a: 120, b: -20 }, k: 'k0' });
    s += person(Object.assign({}, PAIS[1], { x: 430, y: 720, s: .96, legs: 'walk', face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 40, b: -10 } }));
    s += kid(1, { x: 530, y: 726, s: .9, legs: 'walk', face: 'joy', look: .5, armL: { a: 50, b: -20 }, armR: { a: 30 }, k: 'k1' });
    s += kid(2, { x: 630, y: 700, s: .86, legs: 'hop', face: 'laugh', look: .5, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'k2' });
    return s;
  },
  setup(api) {
    let vistos = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('k' + i), 'Criança', () => {
      const [x, y, sc] = api.pos(api.q('k' + i));
      api.snd('laugh'); api.hop(api.q('k' + i), 18);
      api.bubble(x, y - 210 * sc, 'Vamos ver Jesus!', { key: 'k', size: 26 });
      if (!api.st['v' + i]) { api.st['v' + i] = true; if (++vistos === 2) api.nudgeNext(2400); }
    });
  }
});

/* =====================================================================
   3 — «AGORA NÃO!»
   ===================================================================== */
SCENES.push({
  key: 'agora', title: '«Agora não!»', ref: 'Marcos 10.13', tint: 'stone',
  text: [
    'Mas os discípulos não os deixaram passar: «Agora não! Jesus está muito ocupado!»',
    'As crianças ficaram tristes.'
  ],
  fact: 'Os discípulos achavam que Jesus não tinha tempo para crianças.',
  hint: 'Toca nos discípulos e nas crianças.',
  alt: 'Dois discípulos, de braços abertos, impedem a passagem das famílias. As crianças ficam tristes.',
  cue: [560, 520],
  art() {
    let s = colina({ arvoreX: 120 });
    s += person(Object.assign({}, PAIS[2], { x: 120, y: 760, s: 1, face: 'worry', look: .5, armL: { a: 14 }, armR: { a: 30 } }));
    s += kid(0, { x: 220, y: 770, s: .9, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 }, k: 'k0' });
    s += kid(2, { x: 320, y: 776, s: .88, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 }, k: 'k1' });
    s += person(Object.assign({}, DISC[0], { x: 520, y: 770, s: 1.02, flip: true, face: 'frown', look: .5, armL: { a: 90, b: -10 }, armR: { a: 90, b: -10 }, k: 'd0' }));
    s += person(Object.assign({}, DISC[1], { x: 650, y: 776, s: 1.02, flip: true, face: 'frown', look: .5, armL: { a: 90, b: -10 }, armR: { a: 60, b: -60 }, k: 'd1' }));
    return s;
  },
  setup(api) {
    for (let i = 0; i < 2; i++) api.tap(api.q('d' + i), 'Discípulo', () => { api.snd('grunt'); api.shakeHead(api.q('d' + i)); api.bubble(590, 440, 'Agora não! Jesus está muito ocupado!', { key: 'd' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
    for (let i = 0; i < 2; i++) api.tap(api.q('k' + i), 'Criança', () => { api.snd('hm'); api.bubble(260, 520, 'Mas nós queremos ver Jesus...', { key: 'k', size: 26 }); });
  }
});

/* =====================================================================
   4 — «DEIXEM AS CRIANÇAS VIR A MIM!»
   ===================================================================== */
SCENES.push({
  key: 'deixem', title: '«Deixem as crianças vir a mim!»', ref: 'Marcos 10.14', tint: 'gold',
  text: [
    'Quando Jesus viu isto, não gostou nada e disse:',
    { q: 'Deixem as crianças vir a mim! Não as impeçam!', who: 'jesus' }
  ],
  fact: 'O Reino de Deus é das pessoas que são como as crianças.',
  hint: 'Toca em Jesus.',
  alt: 'Jesus chega e abre os braços. Os discípulos afastam-se, e as crianças sorriem, cheias de alegria.',
  cue: [650, 520],
  art() {
    let s = colina({ arvoreX: 760 });
    s += `<g data-k="tristes">${kid(0, { x: 140, y: 770, s: .9, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 } })}${kid(2, { x: 240, y: 776, s: .88, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 } })}${kid(1, { x: 330, y: 770, s: .9, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 } })}</g>`;
    s += `<g data-k="felizes" opacity="0" style="pointer-events:none">${kid(0, { x: 140, y: 770, s: .9, face: 'laugh', look: .5, legs: 'hop', armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 } })}${kid(2, { x: 240, y: 776, s: .88, face: 'joy', look: .5, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 } })}${kid(1, { x: 330, y: 770, s: .9, face: 'laugh', look: .5, legs: 'hop', armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 } })}</g>`;
    s += `<g data-k="disc">${person(Object.assign({}, DISC[0], { x: 450, y: 770, s: .98, flip: true, face: 'frown', look: .5, armL: { a: 90, b: -10 }, armR: { a: 90, b: -10 } }))}</g>`;
    s += jesus({ x: 640, y: 770, s: 1.08, flip: true, face: 'smile', look: .5, armL: { a: 110, b: -20 }, armR: { a: 110, b: -20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', async () => {
      api.bubble(640, 430, 'Deixem as crianças vir a mim!', { key: 'j' });
      if (api.st.feito) { api.snd('heart'); return; }
      api.st.feito = true;
      api.snd('choir', ['C4', 'G4', 'C5']);
      await api.anim(api.q('disc'), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(40px,-90px) scale(.9)' }], { duration: 900, fill: 'forwards', easing: 'ease-in-out' });
      api.anim(api.q('tristes'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('felizes'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('laugh');
      api.burst(240, 560, 'heart', 6);
      api.nudgeNext(2600);
    });
  }
});

/* =====================================================================
   5 — JESUS ABRAÇOU AS CRIANÇAS
   ===================================================================== */
SCENES.push({
  key: 'abraca', title: 'Jesus abraçou as crianças', ref: 'Marcos 10.16', tint: 'rose',
  text: [
    'As crianças correram para Jesus! Ele pegou nelas ao colo e abraçou-as com muito carinho.',
    'Jesus nunca está ocupado demais para ti!'
  ],
  fact: 'Jesus gostava de brincar, de rir e de estar com as crianças.',
  hint: 'Toca nas crianças para irem ter com Jesus.',
  alt: 'Jesus está sentado de braços abertos. À volta dele, as crianças correm para lhe dar um abraço.',
  cue: [150, 560],
  art() {
    let s = colina({ arvoreX: 680 });
    s += jesus({ x: 400, y: 740, s: 1.1, ...SIT, face: 'joy', look: 0, armL: { a: 80, b: -30 }, armR: { a: 80, b: -30 }, k: 'jesus' });
    const P = [[110, 780, 0, false], [210, 800, 3, false], [620, 790, 1, true], [720, 780, 2, true]];
    P.forEach(([x, y, i, f], j) => s += kid(i, { x, y, s: .88, flip: f, face: 'joy', look: .6, legs: 'run', armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'k' + j }));
    return s;
  },
  setup(api) {
    let n = 0;
    const DEST = [[227, -40], [148, -50], [-148, -40], [-295, -36]];
    for (let j = 0; j < 4; j++) api.tap(api.q('k' + j), 'Criança', async () => {
      if (api.st['k' + j]) { api.snd('laugh'); return; }
      api.st['k' + j] = true;
      api.snd('tiptoe');
      const [dx, dy] = DEST[j];
      await api.anim(api.act(api.q('k' + j)), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${j < 2 ? dx : -dx}px,${dy}px)` }], { duration: 800, fill: 'forwards', easing: 'ease-out' });
      api.snd('heart');
      api.burst(400, 560, 'heart', 4);
      if (++n === 4) { api.bubble(400, 400, 'Gosto tanto de vocês!', { key: 'j' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.bubble(400, 400, 'Venham cá!', { key: 'j' }); });
  }
});

/* =====================================================================
   6 — JESUS ABENÇOOU AS CRIANÇAS
   ===================================================================== */
SCENES.push({
  key: 'abencoa', title: 'Jesus abençoou as crianças', ref: 'Marcos 10.16', tint: 'gold',
  text: [
    'Depois, Jesus pôs as mãos sobre a cabeça de cada criança e abençoou-as.',
    'Pediu a Deus que cuidasse delas e lhes desse muitas coisas boas.'
  ],
  fact: 'Ainda hoje, muitos pais oram pelos filhos e pedem a Deus que os abençoe.',
  hint: 'Toca em Jesus e na criança.',
  alt: 'Jesus, ajoelhado, põe a mão sobre a cabeça de uma menina sorridente. À volta deles há uma luz dourada.',
  cue: [380, 470],
  art() {
    let s = colina({ arvoreX: 120 });
    s += glory(400, 520, 220, 'luz', { rays: [-30, -10, 10, 30] });
    s += jesus({ x: 330, y: 770, s: 1.08, legs: 'kneel', hemY: -62, face: 'smile', look: .6, armL: { a: 30 }, armR: { a: 110, b: -40 }, k: 'jesus' });
    s += kid(2, { x: 470, y: 776, s: .95, flip: true, face: 'joy', look: .5, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'menina' });
    s += kid(0, { x: 620, y: 780, s: .88, flip: true, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 30 } });
    s += kid(3, { x: 720, y: 790, s: .86, flip: true, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 30 } });
    s += flowerBand(9601, 780, 800, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('choir', ['C5', 'E5', 'G5']); api.burst(450, 520, 'spark', 8, { col: '#ffe9a6' }); api.bubble(330, 430, 'Que Deus te abençoe!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('menina'), 'Menina', () => { api.snd('heart'); api.burst(470, 560, 'heart', 4); api.bubble(480, 470, 'Obrigada, Jesus!', { key: 'm' }); });
    api.tap(api.q('luz'), 'Luz', () => { api.snd('chime', 'E6'); api.burst(400, 520, 'spark', 6, { col: '#ffe9a6' }); });
  }
});

/* =====================================================================
   7 — COMO UMA CRIANÇA
   ===================================================================== */
SCENES.push({
  key: 'como', title: 'Como uma criança', ref: 'Marcos 10.15', tint: 'meadow',
  text: [
    'Jesus disse aos adultos: «Para entrar no Reino de Deus, é preciso ser como uma criança.»',
    'Ou seja: confiar em Deus e amá-Lo de todo o coração, como uma criança confia nos pais.'
  ],
  fact: 'As crianças acreditam com o coração inteiro. É assim que Deus quer que confiemos n’Ele.',
  hint: 'Toca na criança e nos adultos.',
  alt: 'Jesus, sentado, tem uma criança ao colo e fala com os adultos, que O ouvem admirados.',
  cue: [430, 540],
  art() {
    let s = colina({ arvoreX: 400 });
    s += jesus({ x: 400, y: 760, s: 1.1, ...SIT, face: 'smile', look: -.3, armL: { a: 40, b: -70 }, armR: { a: 50, b: -60 }, k: 'jesus' });
    s += kid(1, { x: 420, y: 700, s: .78, legs: 'sit', face: 'joy', look: .3, armL: { a: 30 }, armR: { a: 120, b: -20 }, k: 'crianca' });
    s += person(Object.assign({}, DISC[0], { x: 150, y: 776, s: .98, face: 'o', look: .6, armL: { a: 14 }, armR: { a: 30 }, k: 'a0' }));
    s += person(Object.assign({}, PAIS[1], { x: 640, y: 776, s: .96, flip: true, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 30 }, k: 'a1' }));
    s += person(Object.assign({}, PAIS[0], { x: 740, y: 786, s: .94, flip: true, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 30 }, k: 'a2' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('crianca'), 'Criança', () => { api.snd('laugh'); api.burst(420, 520, 'heart', 4); api.bubble(430, 440, 'Eu confio em Ti, Jesus!', { key: 'c' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    for (let i = 0; i < 3; i++) api.tap(api.q('a' + i), 'Adulto', () => { const [x, y, sc] = api.pos(api.q('a' + i)); api.snd('hm'); api.bubble(x, y - 250 * sc, 'Como uma criança...', { key: 'a', size: 26 }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(400, 430, 'Sejam como as crianças!', { key: 'c' }); });
  }
});

/* =====================================================================
   8 — CRIANÇAS DE TODO O MUNDO
   ===================================================================== */
SCENES.push({
  key: 'mundo', title: 'Crianças de todo o mundo', ref: 'Marcos 10.14', tint: 'sky',
  text: [
    'Jesus gosta de todas as crianças do mundo: grandes e pequenas, de todas as cores e de todos os países.',
    'E também gosta muito de ti!'
  ],
  fact: 'Podes falar com Jesus a qualquer hora, como se fala com um amigo.',
  hint: 'Toca nas crianças.',
  alt: 'Debaixo de um arco-íris, seis crianças de vários países, de mãos dadas, sorriem e acenam.',
  cue: [130, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 110, sunR: 40 });
    s += rainbow(400, 560, 380, { w: 20 });
    s += hill([[-40, 540], [200, 510], [420, 530], [640, 504], [840, 524]], '#9cc86e') + `<rect x="-40" y="560" width="900" height="300" fill="#8cc464"/>`;
    MUNDO.forEach((m, i) => s += person(Object.assign({}, m, { x: 90 + i * 124, y: 770 + (i % 2) * 14, s: .92, face: i % 2 ? 'laugh' : 'joy', look: 0, armL: { a: 60, b: -10 }, armR: { a: 60, b: -10 }, k: 'm' + i })));
    s += flowerBand(9801, 780, 800, 10);
    return s;
  },
  setup(api) {
    let vistos = 0;
    for (let i = 0; i < 6; i++) api.tap(api.q('m' + i), 'Criança', () => {
      const [x, y, sc] = api.pos(api.q('m' + i));
      api.snd('chime', ['C6', 'D6', 'E6', 'G6', 'A6', 'C7'][i]); api.hop(api.q('m' + i), 16);
      api.burst(x, y - 180 * sc, 'heart', 3);
      api.bubble(x, y - 220 * sc, 'Jesus gosta de mim!', { key: 'm', size: 24 });
      if (!api.st['v' + i]) { api.st['v' + i] = true; if (++vistos === 3) api.nudgeNext(2400); }
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
  alt: 'Noite estrelada sobre a colina junto ao lago. Uma ovelhinha dorme na erva.',
  cue: [430, 160],
  questions: [
    ['Quem levou as crianças a Jesus?', 'As mães e os pais.'],
    ['O que disseram os discípulos?', '«Agora não! Jesus está ocupado!»'],
    ['O que respondeu Jesus?', '«Deixem as crianças vir a mim!»'],
    ['O que fez Jesus às crianças?', 'Abraçou-as e abençoou-as.'],
    ['Jesus gosta de ti?', 'Sim! Muito, muito!']
  ],
  verse: ['Deixem as crianças vir a mim.', 'Marcos 10.14'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(9901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#29475a');
    s += `<rect x="-40" y="580" width="900" height="60" fill="#2d4f7a"/>`;
    s += hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 672]], '#2c584f');
    s += `<g opacity=".8">${olive(640, 700, .9, { leaf: '#56785a', dark: '#3f5c46', hi: '#6a8a68', trunk: '#6b5646' })}</g>`;
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
  id: 'criancas',
  title: 'Jesus e as Crianças',
  cover: { kicker: 'Uma história da Bíblia', title: 'Jesus', small: 'e as Crianças', sub: 'Jesus gosta muito de ti' },
  color: '#e05a8a',
  ref: 'Marcos 10.13-16',
  scenes: SCENES
});
})();
