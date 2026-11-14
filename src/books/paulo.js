/* =====================================================================
   LIVRO: PAULO E SILAS NA PRISÃO  (Atos 16.11-34)
   ===================================================================== */
(() => {
const SCENES = [];
const PAULO = { kind: 'adult', skin: '#d39463', hair: '#5a3a26', hairStyle: 'short', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f6f9a', belt: '#7b4a2a', cloak: '#c9a54e', cloakTrim: '#8a5a33' };
const SILAS = { kind: 'adult', skin: '#b97a4e', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', beard: 'short', beardCol: '#2b1d17', tunic: '#a0603a', belt: '#5a3a26' };
const GUARDA = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', beard: 'short', beardCol: '#7a4a22', tunic: '#9a3a32', belt: '#5a3a26', head: 'helmetI' };
const ESPOSA = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'long', tunic: '#5e7d4a', belt: '#6b4a33', head: 'scarf', clothCol: '#f2d6e2' };
const FILHOS = [
  { kind: 'child', skin: '#e2a878', hair: '#7a4a22', tunic: '#e0a33a', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'long', tunic: '#e86a9a', belt: '#a0406a' }
];
const PRESO = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#7a7266', belt: '#4a443a' };
const GENTE = [
  { kind: 'adult', skin: '#d99a6c', hair: '#3a2520', hairStyle: 'long', tunic: '#8a4f8f', belt: '#6b4a33', head: 'scarf', clothCol: '#e8c86a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#4a2c1c', beard: 'short', beardCol: '#4a2c1c', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#efe2c4', bandCol: '#5e7d4a' },
  { kind: 'child', skin: '#d39463', hair: '#3a2520', tunic: '#3f93c7', belt: '#7b4a2a' }
];
const paulo = o => person(Object.assign({}, PAULO, o));
const silas = o => person(Object.assign({}, SILAS, o));
const guarda = o => person(Object.assign({}, GUARDA, o));
const p = (who, o) => person(Object.assign({}, who, o));
// sentado no chão
const SENTA = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
// parede de pedra da prisão
function cela(o = {}) {
  let s = `<rect x="-40" y="-40" width="900" height="980" fill="${o.wall || '#5a5f72'}"/>`;
  for (let r = 0; r < 14; r++) for (let c = -1; c < 9; c++) {
    const x = c * 110 + (r % 2 ? 55 : 0), y = r * 50;
    s += `<rect x="${x + 4}" y="${y + 4}" width="102" height="42" rx="8" fill="${o.stone || '#686e83'}" opacity=".85"/>`;
  }
  s += `<rect x="-40" y="640" width="900" height="400" fill="${o.floor || '#4a4e5e'}"/><path d="M-40,640 L840,640" stroke="#3a3e4c" stroke-width="6"/>`;
  return s;
}
// janela com grades (com a lua lá fora)
function janela(x, y) {
  return `<g transform="translate(${x},${y})"><rect x="-60" y="-50" width="120" height="100" rx="6" fill="#1a2250" stroke="${OL}" stroke-width="4"/><circle cx="18" cy="-12" r="16" fill="#fdf2c4"/><circle cx="26" cy="-18" r="14" fill="#1a2250"/>${[-30, 0, 30].map(a => `<path d="M${a},-50 L${a},50" stroke="#2a2a30" stroke-width="7"/>`).join('')}</g>`;
}
// porta de madeira com grades; aberta = rodada
function porta(x, y, k = 'porta', aberta = false) {
  const d = `<rect x="0" y="-260" width="150" height="260" rx="6" fill="#7a4c2c" stroke="${OL}" stroke-width="4"/><path d="M50,-260 L50,0 M100,-260 L100,0" stroke="#5a3a22" stroke-width="4"/><rect x="40" y="-220" width="70" height="60" fill="#2a2a30" stroke="${OL}" stroke-width="3"/>${[58, 75, 92].map(a => `<path d="M${a},-220 L${a},-160" stroke="#8a8a90" stroke-width="5"/>`).join('')}<circle cx="128" cy="-120" r="9" fill="#c9a54e" stroke="${OL}" stroke-width="2.4"/><rect x="-6" y="-240" width="16" height="22" rx="3" fill="#3a3a40"/><rect x="-6" y="-50" width="16" height="22" rx="3" fill="#3a3a40"/>`;
  return `<g transform="translate(${x},${y})"><rect x="-8" y="-268" width="166" height="272" fill="#1f2230" stroke="${OL}" stroke-width="3"/>${aberta ? `<rect x="0" y="-260" width="150" height="260" fill="#ffe7a0" opacity=".7"/>` : ''}<g data-k="${k}"><g class="act"${aberta ? ' transform="skewY(-8) scale(.35,1)"' : ''}>${d}${hitC(75, -130, 110)}</g></g></g>`;
}
// tronco de madeira que prende os pés de quem está sentado
const tronco = (x, y, w = 260, k = '') => `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><rect x="${-w / 2}" y="-40" width="${w}" height="44" rx="6" fill="#8a5a33" stroke="${OL}" stroke-width="3.4"/><path d="M${-w / 2 + 10},-18 L${w / 2 - 10},-18" stroke="#6a4224" stroke-width="3"/></g>`;
// corrente
const corrente = (x1, y1, x2, y2) => {
  const n = 7; let s = '';
  for (let i = 0; i <= n; i++) { const x = x1 + (x2 - x1) * i / n, y = y1 + (y2 - y1) * i / n + Math.sin(i / n * Math.PI) * 18; s += `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${i % 2 ? 7 : 9}" ry="${i % 2 ? 9 : 6}" fill="none" stroke="#8a8a90" stroke-width="4"/>`; }
  return s;
};
// candeeiro de azeite na mão (só a luz)
const candeia = () => `<g><path d="M-18,0 C-18,-12 18,-14 22,-6 L32,-10 L28,0 C20,10 -14,10 -18,0 Z" fill="#c9774a" stroke="${OL}" stroke-width="2.6"/><g transform="translate(28,-12)"><g class="flicker"><path d="M0,-18 C6,-10 8,-4 5,-1 C2,2 -2,2 -5,-1 C-8,-4 -6,-10 0,-18 Z" fill="#ffb238"/></g></g></g>`;
const luzDefs = () => `<defs>${rg('lc', [[0, '#ffe7a0', .8], [.6, '#ffd27a', .25], [1, '#ffd27a', 0]])}</defs>`;
const notas = (x, y) => `<g opacity=".9">${[[0, 0, '#ffe08a'], [40, -40, '#ffd0e0'], [-30, -70, '#bfe4ff']].map(([dx, dy, c], i) => `<g transform="translate(${x + dx},${y + dy}) scale(1.6)"><g class="bob" style="${dl(3)}">${note(c)}</g></g>`).join('')}</g>`;

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Paulo e Silas na Prisão',
  alt: 'De noite, numa prisão de pedra, Paulo e Silas estão sentados e cantam a sorrir. As correntes estão partidas, a porta está aberta e entra uma luz dourada.',
  cue: [400, 760],
  art() {
    let s = luzDefs() + `<g transform="translate(0,200)">${cela()}</g><rect x="-40" y="-40" width="900" height="260" fill="#5a5f72"/>`;
    s += janela(200, 460);
    s += porta(560, 840, 'porta', true);
    s += `<circle cx="635" cy="700" r="260" fill="${UR('lc')}"/>`;
    s += paulo(Object.assign({ x: 250, y: 1020, s: 1.15, face: 'laugh', look: .3, armL: { a: 150, b: -20 }, armR: { a: 60, b: -30 }, k: 'paulo' }, SENTA));
    s += silas(Object.assign({ x: 470, y: 1030, s: 1.1, face: 'joy', look: -.3, armL: { a: 60, b: -30 }, armR: { a: 150, b: -20 }, k: 'silas' }, SENTA));
    s += `<g transform="translate(120,1040)">${corrente(0, 0, 90, -10)}</g><g transform="translate(560,1050)">${corrente(0, 0, 100, 0)}</g>`;
    s += notas(360, 640);
    return s;
  },
  setup(api) {
    api.tap(api.q('paulo'), 'Paulo', () => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(250, 720, 'note', 4); api.bubble(250, 640, 'Louvado seja Deus!', { key: 'p' }); });
    api.tap(api.q('silas'), 'Silas', () => { api.snd('choir', ['E4', 'G4', 'C5']); api.burst(470, 720, 'note', 4); api.bubble(470, 640, 'Aleluia!', { key: 's' }); });
  }
});

/* =====================================================================
   1 — EM FILIPOS
   ===================================================================== */
SCENES.push({
  key: 'filipos', title: 'Em Filipos', ref: 'Atos 16.11-15', tint: 'sky',
  text: [
    'Depois de Jesus voltar para o céu, Paulo e o seu amigo Silas viajavam de cidade em cidade.',
    'Contavam a todos a boa notícia de que Jesus nos ama e nos salva.',
    'Um dia, chegaram a uma cidade chamada Filipos.'
  ],
  fact: 'Paulo escreveu muitas cartas que estão na Bíblia. Uma delas foi para os cristãos de Filipos!',
  hint: 'Toca no Paulo e nas pessoas.',
  alt: 'Numa praça com colunas, Paulo fala de braços abertos. Silas está ao lado, e várias pessoas ouvem com atenção.',
  cue: [250, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 140 });
    s += column(470, 200, 560, 50) + column(600, 200, 560, 50) + column(730, 200, 560, 50);
    s += `<rect x="420" y="180" width="380" height="30" fill="#ece4d4" stroke="${OL}" stroke-width="3"/><path d="M420,180 L610,110 L800,180 Z" fill="#e6dccb" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
    s += `<rect x="-40" y="560" width="900" height="400" fill="#d9cfb8"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 110 - 20},560 L${i * 110 - 60},900" stroke="#c4b99e" stroke-width="3"/>`).join('')}`;
    s += paulo({ x: 220, y: 760, s: 1, face: 'joy', look: .6, armL: { a: 120, b: -20 }, armR: { a: 130, b: -20 }, k: 'paulo' });
    s += silas({ x: 90, y: 760, s: .9, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 30 }, k: 'silas' });
    const X = [430, 560, 690];
    X.forEach((x, i) => s += p(GENTE[i], { x, y: 770, s: i === 2 ? 1 : .88, face: i === 1 ? 'surprise' : 'smile', look: -.6, armL: { a: 20 }, armR: { a: i === 2 ? 140 : 20, b: i === 2 ? -20 : 0 }, k: 'g' + i }));
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    let n = 0;
    api.tap(api.q('paulo'), 'Paulo', () => { api.snd('hello'); api.bubble(220, 420, [N('Jesus ama-vos!'), N('Jesus está vivo!'), N('Ele salva-nos!')][n++ % 3], { key: 'p' }); ok('p'); });
    api.tap(api.q('silas'), 'Silas', () => { api.snd('hello'); api.bubble(110, 460, 'É verdade!', { key: 's' }); ok('s'); });
    const X = [430, 560, 690];
    const FALAS = [N('Conta mais!'), N('Que notícia tão boa!'), N('Eu quero conhecer Jesus!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('g' + i), 'Pessoa', () => { api.snd('hm'); api.hop(api.q('g' + i)); api.bubble(X[i], 460, FALAS[i], { key: 'g', size: 26 }); ok('g'); });
  }
});

/* =====================================================================
   2 — NA PRISÃO
   ===================================================================== */
SCENES.push({
  key: 'presos', title: 'Na prisão', ref: 'Atos 16.19-24', tint: 'stone',
  text: [
    'Mas alguns homens da cidade ficaram zangados com Paulo e Silas.',
    'Levaram-nos aos chefes da cidade, e os dois foram maltratados e postos na prisão.',
    'O carcereiro prendeu-lhes os pés num tronco de madeira e fechou a porta à chave.'
  ],
  fact: 'Paulo e Silas não tinham feito nada de mal. Só falavam de Jesus!',
  hint: 'Toca na porta e no carcereiro.',
  alt: 'Numa cela escura, Paulo e Silas estão sentados no chão com os pés presos num tronco de madeira. O carcereiro fecha a porta.',
  cue: [600, 520],
  art() {
    let s = cela();
    s += janela(180, 230);
    s += porta(520, 640, 'porta');
    s += guarda({ x: 470, y: 780, s: .96, face: 'frown', look: .7, armL: { a: 20 }, armR: { a: 70, b: -30 }, k: 'guarda' });
    s += paulo(Object.assign({ x: 140, y: 790, s: .9, face: 'sad', look: .5, armL: { a: 20 }, armR: { a: 20 } }, SENTA));
    s += silas(Object.assign({ x: 290, y: 790, s: .88, face: 'sad', look: .5, armL: { a: 20 }, armR: { a: 20 } }, SENTA));
    s += tronco(215, 790, 320);
    return s;
  },
  setup(api) {
    api.tap(api.q('porta'), 'Porta da prisão', () => {
      api.snd('clank'); api.shake(2);
      api.anim(api.act(api.q('porta')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(0px)' }], { duration: 300 });
      api.bubble(600, 300, 'Clic! Fechada à chave!', { key: 'p' });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
    api.tap(api.q('guarda'), 'Carcereiro', () => { api.snd('stomp'); api.bubble(470, 420, 'Daqui ninguém foge!', { key: 'g' }); });
  }
});

/* =====================================================================
   3 — CÂNTICOS À MEIA-NOITE
   ===================================================================== */
SCENES.push({
  key: 'cantam', title: 'Cânticos à meia-noite', ref: 'Atos 16.25', tint: 'night',
  text: [
    'À meia-noite, em vez de se queixarem, Paulo e Silas oravam e cantavam a Deus.',
    'Os outros presos estavam todos a ouvi-los.'
  ],
  fact: 'Mesmo num lugar escuro e triste, podemos louvar a Deus!',
  hint: 'Toca no Paulo e no Silas para cantarem.',
  alt: 'De noite, na cela, Paulo e Silas cantam de olhos fechados. Ao fundo, outros presos encostados à parede escutam.',
  cue: [220, 560],
  art() {
    let s = luzDefs() + cela({ wall: '#3a3f55', stone: '#454b63', floor: '#33374a' });
    s += janela(560, 220);
    s += `<circle cx="560" cy="230" r="180" fill="#9fb6ff" opacity=".08"/>`;
    s += p(PRESO, Object.assign({ x: 560, y: 700, s: .7, face: 'sleep', look: 0, armL: { a: 20 }, armR: { a: 20 }, k: 'preso' }, SENTA));
    s += p(Object.assign({}, PRESO, { skin: '#e2a878', hair: '#7a4a22', beardCol: '#7a4a22' }), Object.assign({ x: 700, y: 700, s: .7, face: 'surprise', look: -.6, armL: { a: 20 }, armR: { a: 20 } }, SENTA));
    s += paulo(Object.assign({ x: 160, y: 790, s: .92, face: 'sleep', look: 0, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'paulo' }, SENTA));
    s += silas(Object.assign({ x: 320, y: 790, s: .9, face: 'joy', look: 0, armL: { a: 140, b: -20 }, armR: { a: 60, b: -40 }, k: 'silas' }, SENTA));
    s += tronco(240, 790, 330);
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.later(() => api.bubble(600, 420, 'Que bonito!', { key: 'x' }), 1200); api.nudgeNext(3600); } };
    api.tap(api.q('paulo'), 'Paulo', () => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(160, 560, 'note', 4); api.bubble(170, 440, 'Senhor, nós confiamos em Ti!', { key: 'p', size: 26 }); ok('p'); });
    api.tap(api.q('silas'), 'Silas', () => { api.snd('choir', ['E4', 'G4', 'C5']); api.burst(320, 560, 'note', 4); api.bubble(330, 440, 'Louvado sejas, Senhor!', { key: 's', size: 26 }); ok('s'); });
    api.tap(api.q('preso'), 'Preso', () => { api.snd('hm'); api.bubble(560, 480, 'Estão a cantar?', { key: 'x' }); });
  }
});

/* =====================================================================
   4 — O TERRAMOTO
   ===================================================================== */
SCENES.push({
  key: 'terremoto', title: 'A terra tremeu!', ref: 'Atos 16.26', tint: 'stone',
  text: [
    'De repente, houve um grande terramoto!',
    'A prisão tremeu toda. As portas abriram-se e as correntes de todos os presos soltaram-se!'
  ],
  fact: 'Deus mandou o terramoto para mostrar que estava com Paulo e Silas.',
  hint: 'Toca no chão para a terra tremer.',
  alt: 'A prisão treme. Caem pedrinhas, a porta abre-se e o tronco de madeira parte-se. Paulo e Silas olham surpreendidos.',
  cue: [400, 700],
  art() {
    let s = cela({ wall: '#3a3f55', stone: '#454b63', floor: '#33374a' });
    s += janela(180, 220);
    s += `<g data-k="fechada">${porta(520, 640, 'p0')}</g>`;
    s += `<g data-k="aberta" opacity="0">${porta(520, 640, 'p1', true)}</g>`;
    s += paulo(Object.assign({ x: 160, y: 790, s: .92, face: 'surprise', look: .5, armL: { a: 20 }, armR: { a: 20 } }, SENTA));
    s += silas(Object.assign({ x: 320, y: 790, s: .9, face: 'surprise', look: .5, armL: { a: 20 }, armR: { a: 20 } }, SENTA));
    s += `<g data-k="tronco">${tronco(240, 790, 330)}</g>`;
    s += `<g data-k="partido" opacity="0"><g transform="translate(140,800) rotate(-12)">${tronco(0, 0, 150)}</g><g transform="translate(360,806) rotate(10)">${tronco(0, 0, 150)}</g></g>`;
    s += `<g data-k="chao"><rect x="-40" y="640" width="900" height="300" fill="#000" fill-opacity="0"/></g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('chao'), 'Chão', async () => {
      api.snd('thunder'); api.shake(10);
      api.burst(200 + Math.random() * 400, 120, 'dust', 6, { col: '#8a8a9a' });
      if (++n < 2 || api.st.ok) return;
      api.st.ok = true;
      await api.wait(500);
      api.snd('door');
      api.q('fechada').setAttribute('opacity', '0');
      api.anim(api.q('aberta'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('clank');
      api.q('tronco').setAttribute('opacity', '0');
      api.anim(api.q('partido'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.bubble(250, 440, 'Estamos livres!', { key: 'l' });
      api.nudgeNext(2800);
    });
  }
});

/* =====================================================================
   5 — ESTAMOS TODOS AQUI!
   ===================================================================== */
SCENES.push({
  key: 'carcereiro', title: 'Estamos todos aqui!', ref: 'Atos 16.27-28', tint: 'night',
  text: [
    'O carcereiro acordou e viu as portas abertas. Pensou que os presos tinham fugido e ficou muito assustado!',
    'Mas Paulo gritou:',
    { q: 'Não te faças mal nenhum! Estamos todos aqui!', who: 'outro' }
  ],
  fact: 'Paulo e Silas podiam ter fugido. Mas ficaram, para ajudar o carcereiro!',
  hint: 'Toca no carcereiro e no Paulo.',
  alt: 'O carcereiro, de candeia na mão, entra assustado pela porta aberta. Paulo e Silas, de pé, levantam a mão para o acalmar.',
  cue: [560, 520],
  art() {
    let s = luzDefs() + cela({ wall: '#3a3f55', stone: '#454b63', floor: '#33374a' });
    s += janela(180, 220);
    s += porta(560, 640, 'porta', true);
    s += `<circle cx="560" cy="520" r="170" fill="${UR('lc')}"/>`;
    s += guarda({ x: 560, y: 780, s: .96, face: 'scared', look: -.6, armL: { a: 80, b: -20, item: candeia() }, armR: { a: 150, b: -40 }, k: 'guarda' });
    s += paulo({ x: 200, y: 780, s: .96, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 130, b: -10 }, k: 'paulo' });
    s += silas({ x: 330, y: 780, s: .92, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 40 } });
    s += `<g transform="translate(250,800)">${corrente(0, 0, 80, 6)}</g>`;
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    api.tap(api.q('guarda'), 'Carcereiro', () => { api.snd('boing'); api.shakeHead(api.q('guarda')); api.bubble(560, 420, 'Fugiram todos!', { key: 'g' }); ok('g'); });
    api.tap(api.q('paulo'), 'Paulo', () => { api.snd('hello'); api.wave(api.q('paulo')); api.bubble(200, 420, 'Estamos todos aqui!', { key: 'p' }); ok('p'); });
  }
});

/* =====================================================================
   6 — O QUE DEVO FAZER?
   ===================================================================== */
SCENES.push({
  key: 'pergunta', title: 'O que devo fazer?', ref: 'Atos 16.29-31', tint: 'gold',
  text: [
    'O carcereiro ajoelhou-se a tremer diante de Paulo e Silas e perguntou:',
    '«Senhores, o que devo fazer para ser salvo?»',
    'Eles responderam:',
    { q: 'Crê no Senhor Jesus, e serás salvo, tu e a tua família!', who: 'outro' }
  ],
  fact: 'Não é preciso fazer coisas difíceis para ser salvo. É confiar em Jesus!',
  hint: 'Toca no carcereiro e no Silas.',
  alt: 'Com a candeia no chão, o carcereiro está ajoelhado. Paulo põe-lhe a mão no ombro e Silas sorri.',
  cue: [440, 560],
  art() {
    let s = luzDefs() + cela({ wall: '#4a4f66', stone: '#565c75', floor: '#3a3e50' });
    s += `<circle cx="400" cy="560" r="260" fill="${UR('lc')}"/>`;
    s += paulo({ x: 250, y: 780, s: 1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 70, b: -20 }, k: 'paulo' });
    s += silas({ x: 640, y: 780, s: .96, face: 'joy', look: -.6, armL: { a: 60, b: -20 }, armR: { a: 20 }, k: 'silas' });
    s += guarda({ x: 440, y: 790, s: .96, legs: 'kneel', face: 'worry', look: -.4, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'guarda' });
    s += `<g transform="translate(540,790)">${candeia()}</g>`;
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    api.tap(api.q('guarda'), 'Carcereiro', () => { api.snd('hm'); api.bubble(440, 440, 'O que devo fazer?', { key: 'g' }); ok('g'); });
    api.tap(api.q('silas'), 'Silas', () => { api.snd('heart'); api.burst(640, 480, 'heart', 4); api.bubble(620, 400, 'Crê no Senhor Jesus!', { key: 's' }); ok('s'); });
    api.tap(api.q('paulo'), 'Paulo', () => { api.snd('heart'); api.burst(250, 480, 'heart', 4); api.bubble(250, 400, 'Tu e a tua família!', { key: 'p' }); ok('s'); });
  }
});

/* =====================================================================
   7 — UMA FAMÍLIA FELIZ
   ===================================================================== */
SCENES.push({
  key: 'familia', title: 'Uma família feliz', ref: 'Atos 16.32-34', tint: 'rose',
  text: [
    'O carcereiro levou Paulo e Silas para a sua casa e tratou das feridas deles.',
    'Paulo e Silas falaram de Jesus a toda a família, e todos creram em Jesus!',
    'Depois, comeram juntos, cheios de alegria.'
  ],
  fact: 'Naquela noite, a prisão tremeu, mas o maior milagre foi o coração do carcereiro mudar!',
  hint: 'Toca na família do carcereiro.',
  alt: 'Em casa do carcereiro, à luz das candeias, a família dele e Paulo e Silas estão à mesa, a sorrir e a comer pão.',
  cue: [520, 560],
  art() {
    let s = luzDefs() + `<rect x="-40" y="-40" width="900" height="980" fill="#e8c896"/><rect x="-40" y="620" width="900" height="400" fill="#b98a5a"/><path d="M-40,620 L840,620" stroke="#9a6b3e" stroke-width="6"/>`;
    s += `<circle cx="400" cy="300" r="320" fill="${UR('lc')}"/>`;
    s += `<g transform="translate(180,170)">${candeia()}</g><g transform="translate(600,170)">${candeia()}</g>`;
    s += paulo({ x: 110, y: 760, s: .9, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 60, b: -30 } });
    s += silas({ x: 690, y: 760, s: .88, face: 'joy', look: -.5, armL: { a: 60, b: -30 }, armR: { a: 20 } });
    s += guarda({ x: 270, y: 760, s: .9, head: null, face: 'laugh', look: .4, armL: { a: 30 }, armR: { a: 60, b: -30 }, k: 'guarda' });
    s += p(ESPOSA, { x: 540, y: 760, s: .88, face: 'joy', look: -.4, armL: { a: 60, b: -30 }, armR: { a: 20 }, k: 'esposa' });
    s += p(FILHOS[0], { x: 370, y: 740, s: .8, face: 'laugh', look: .3, armL: { a: 150, b: -20 }, armR: { a: 40 }, k: 'f0' });
    s += p(FILHOS[1], { x: 450, y: 740, s: .78, face: 'joy', look: -.3, armL: { a: 40 }, armR: { a: 150, b: -20 }, k: 'f1' });
    s += `<g transform="translate(400,720)"><rect x="-260" y="-20" width="520" height="24" rx="6" fill="#9a6b3e" stroke="${OL}" stroke-width="3.4"/><path d="M-230,4 L-230,90 M230,4 L230,90" stroke="#8a5a33" stroke-width="12"/><ellipse cx="-80" cy="-30" rx="40" ry="16" fill="#d8954a" stroke="${OL}" stroke-width="3"/><ellipse cx="60" cy="-30" rx="44" ry="14" fill="#e8dcc8" stroke="${OL}" stroke-width="3"/><circle cx="48" cy="-42" r="11" fill="#7a3a7a" stroke="${OL}" stroke-width="2.4"/><circle cx="70" cy="-42" r="11" fill="#7a3a7a" stroke="${OL}" stroke-width="2.4"/></g>`;
    return s;
  },
  setup(api) {
    const QUEM = [['guarda', 270, N('Agora conheço Jesus!')], ['esposa', 540, N('Que alegria!')], ['f0', 370, N('Jesus ama-me!')], ['f1', 450, N('Eu também creio!')]];
    const vistos = new Set();
    QUEM.forEach(([k, x, fala]) => api.tap(api.q(k), 'Família', () => {
      api.snd(k[0] === 'f' ? 'laugh' : 'heart'); api.hop(api.q(k)); api.burst(x, 520, 'heart', 4);
      api.bubble(x, 440, fala, { key: 'f', size: 26 });
      vistos.add(k); if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.later(() => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(400, 400, 'confetti', 10); }, 900); api.nudgeNext(3200); }
    }));
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre a cidade. Uma casa tem a janela acesa, e uma ovelhinha dorme na erva.',
  cue: [430, 160],
  questions: [
    ['De quem falavam Paulo e Silas?', 'De Jesus.'],
    ['O que faziam Paulo e Silas na prisão à meia-noite?', 'Oravam e cantavam a Deus.'],
    ['O que aconteceu de repente?', 'Um terramoto! As portas abriram-se.'],
    ['Paulo e Silas fugiram?', 'Não, ficaram para ajudar o carcereiro.'],
    ['O que respondeu Paulo ao carcereiro?', 'Crê no Senhor Jesus, e serás salvo!']
  ],
  wrong: [
    ['Do rei.', 'Do tempo.', 'De dinheiro.'],
    ['Dormiam.', 'Choravam.', 'Tentavam fugir.'],
    ['Começou a nevar.', 'Chegou o rei.', 'Apagaram-se as estrelas.'],
    ['Sim, fugiram a correr.', 'Sim, esconderam-se.', 'Ficaram a dormir.'],
    ['«Foge depressa!»', '«Deixa-nos em paz!»', 'Não respondeu nada.']
  ],
  verse: ['Crê no Senhor Jesus, e serás salvo, tu e a tua família.', 'Atos 16.31'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1601, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#2f3d5a');
    s += house(500, 640, 160, 120, { wall: '#8a7a6a', winCol: '#ffd27a', doorCol: '#4a3226' });
    s += `<path d="M-40,640 C200,616 500,630 840,608 L840,900 L-40,900 Z" fill="#3a4a3a"/>`;
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
  id: 'paulo',
  title: 'Paulo e Silas na Prisão',
  cover: { kicker: 'Uma história da Bíblia', title: 'Paulo e Silas', small: 'na Prisão', sub: 'Cânticos à meia-noite' },
  color: '#4a4f7a',
  ref: 'Atos 16.11-34',
  scenes: SCENES
});
})();
