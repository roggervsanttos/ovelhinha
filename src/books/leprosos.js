/* =====================================================================
   LIVRO: OS DEZ LEPROSOS  (Lucas 17.11-19)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const DISC = [
  { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', tunic: '#e07a3a', belt: '#7b4a2a' }
];
// os doentes: roupa cinzenta e manchas na cara; curados ficam com roupa de cor
const DOENTES = [
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#cfc8b8', bandCol: '#8a8478' },
  { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', beard: 'bushy', beardCol: '#7a4a22' },
  { kind: 'adult', skin: '#b97a4e', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', beard: 'short', beardCol: '#2b1d17' },
  { kind: 'adult', skin: '#d99a6c', hair: '#4a2c1c', beard: 'short', beardCol: '#4a2c1c', head: 'cloth', clothCol: '#cfc8b8', bandCol: '#8a8478' },
  { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', hairStyle: 'long', beard: 'bushy', beardCol: '#5a3a26' }
];
const CORES = ['#c0603a', '#5d6d8a', '#c9a54e', '#8a4f8f', '#3f93c7'];
const cor = i => i === 0 ? '#3f8f6a' : CORES[i % 5];
// o samaritano que voltou é o primeiro (verde quando curado)
const SAMAR = 0;
const jesus = o => person(Object.assign({}, JESUS, o));
const manchas = `<g fill="#c97a8a" opacity=".8"><circle cx="-14" cy="-206" r="5"/><circle cx="12" cy="-224" r="4"/><circle cx="16" cy="-200" r="3.4"/><circle cx="-6" cy="-234" r="3"/></g><g fill="#c97a8a" opacity=".7"><circle cx="-8" cy="-150" r="6"/><circle cx="10" cy="-120" r="5"/><circle cx="-12" cy="-96" r="4.4"/></g>`;
function doente(i, o = {}) {
  const d = DOENTES[i % 5];
  return person(Object.assign({}, d, { tunic: '#8a8478', belt: '#5a5448', extra: manchas, face: 'sad' }, o));
}
function curado(i, o = {}) {
  const d = DOENTES[i % 5];
  return person(Object.assign({}, d, { tunic: cor(i), belt: '#6b4a33', face: 'joy', clothCol: d.head ? '#f4efe6' : undefined, bandCol: cor(i) }, o));
}

/* ---------- peças desta história ---------- */
const aldeia = (x, y, s = 1) => town(x, y, s);
const estrada = (y = 560) => `<rect x="-40" y="${y}" width="900" height="400" fill="#c9b37a"/><path d="M-40,${y + 120} C200,${y + 90} 600,${y + 150} 840,${y + 110} L840,${y + 190} C600,${y + 230} 200,${y + 170} -40,${y + 200} Z" fill="#e2cf98"/>`;
const campo = (y = 470, col = '#a9c27a') => hill([[-40, y], [200, y - 30], [420, y - 10], [640, y - 40], [840, y - 20]], col);

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Os Dez Leprosos',
  alt: 'Num caminho de terra, um homem ajoelhado agradece a Jesus com as mãos juntas. Ao longe, outros nove homens correm para casa.',
  cue: [460, 760],
  art() {
    let s = bgDay({ sunX: 640, sunY: 280, sunR: 50, sky: [[0, '#86cbef'], [.6, '#fde3b8'], [1, '#fde3b8']] });
    s += campo(700) + aldeia(560, 640, .8);
    s += estrada(760);
    for (let i = 1; i < 10; i++) s += curado(i, { x: 470 + (i % 5) * 60, y: 800 + Math.floor(i / 5) * 20, s: .28, legs: 'run', look: .5, armL: { a: 150, b: -20 }, armR: { a: 40 }, cls: '' });
    s += jesus({ x: 260, y: 1020, s: 1.15, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 60, b: -20 }, k: 'jesus' });
    s += curado(SAMAR, { x: 480, y: 1030, s: 1.1, legs: 'kneel', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'homem' });
    return s;
  },
  setup(api) {
    api.tap(api.q('homem'), 'Homem curado', () => { api.snd('heart'); api.burst(480, 700, 'heart', 5); api.bubble(480, 640, 'Obrigado, Jesus!', { key: 'h' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(260, 640, 'A tua fé salvou-te!', { key: 'j' }); });
  }
});

/* =====================================================================
   1 — LONGE DE TODOS
   ===================================================================== */
SCENES.push({
  key: 'longe', title: 'Longe de todos', ref: 'Lucas 17.11-12', tint: 'stone',
  text: [
    'Jesus ia a caminho de Jerusalém.',
    'À entrada de uma aldeia, estavam dez homens com lepra, uma doença da pele.',
    'Quem tinha lepra não podia morar perto das outras pessoas. Por isso, viviam longe de todos.'
  ],
  fact: 'Naquele tempo, ninguém sabia curar a lepra.',
  hint: 'Toca nos homens doentes.',
  alt: 'Fora da aldeia, junto a umas rochas, dez homens de roupa cinzenta estão tristes. Ao longe, as casas da aldeia.',
  cue: [250, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 160, sky: [[0, '#a8c8e0'], [.6, '#e6eadc'], [1, '#e6eadc']] });
    s += campo(470) + aldeia(560, 470, .9);
    s += `<rect x="-40" y="520" width="900" height="400" fill="#c9b37a"/>`;
    s += rock(110, 600, 200, 120) + rock(300, 580, 140, 80);
    for (let i = 5; i < 10; i++) s += doente(i, { x: 70 + (i - 5) * 80, y: 640, s: .56, look: .3 });
    const X = [120, 250, 380, 510];
    X.forEach((x, i) => s += doente(i, { x, y: 770, s: .86, look: .5, armL: { a: 10 }, armR: { a: 14 }, k: 'd' + i }));
    return s;
  },
  setup(api) {
    const X = [120, 250, 380, 510];
    const FALAS = [N('Ninguém se chega perto de nós.'), N('Tenho saudades da minha família.'), N('Estamos tão sozinhos.'), N('Quem nos pode ajudar?')];
    const vistos = new Set();
    for (let i = 0; i < 4; i++) api.tap(api.q('d' + i), 'Homem doente', () => {
      api.snd('hm'); api.bubble(X[i], 470, FALAS[i], { key: 'd', size: 24 });
      vistos.add(i); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   2 — TEM PENA DE NÓS!
   ===================================================================== */
SCENES.push({
  key: 'gritam', title: 'Tem pena de nós!', ref: 'Lucas 17.13', tint: 'sand',
  text: [
    'Quando viram Jesus a chegar, os dez homens ficaram ao longe e gritaram bem alto:',
    { q: 'Jesus, Mestre, tem pena de nós!', who: 'outro' }
  ],
  fact: 'Eles não se podiam aproximar. Mas sabiam que Jesus os podia ajudar!',
  hint: 'Toca nos homens para gritarem.',
  alt: 'De um lado do caminho, os dez homens doentes acenam e gritam. Do outro lado, Jesus e os discípulos param a olhar.',
  cue: [200, 560],
  art() {
    let s = bgDay({ sunX: 400, sunY: 150 });
    s += campo(470);
    s += estrada(520);
    for (let i = 5; i < 10; i++) s += doente(i, { x: 50 + (i - 5) * 70, y: 640, s: .5, look: .6, armL: { a: 150, b: -20 }, armR: { a: 20 } });
    s += `<g data-k="grupo">${[0, 1, 2].map(i => doente(i, { x: 90 + i * 110, y: 770, s: .82, face: 'shout', look: .7, armL: { a: 20 }, armR: { a: 150, b: -20 } })).join('')}${hitC(200, 640, 170)}</g>`;
    s += person(Object.assign({}, DISC[0], { x: 720, y: 720, s: .8, face: 'surprise', look: -.6 })) + person(Object.assign({}, DISC[1], { x: 630, y: 740, s: .8, face: 'o', look: -.6 }));
    s += jesus({ x: 530, y: 760, s: .94, face: 'smile', look: -.7, armL: { a: 20 }, armR: { a: 20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('grupo'), 'Homens doentes', () => {
      api.snd('crowd', .8); api.shake(3);
      api.bubble(200, 440, [N('Jesus, Mestre!'), N('Tem pena de nós!'), N('Ajuda-nos!')][n % 3], { key: 'g' });
      if (++n === 2) api.nudgeNext(2800);
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(530, 480, 'heart', 4); api.bubble(530, 420, 'Eu ouço-vos!', { key: 'j' }); });
  }
});

/* =====================================================================
   3 — VÃO MOSTRAR-SE AOS SACERDOTES
   ===================================================================== */
SCENES.push({
  key: 'vao', title: 'Vão!', ref: 'Lucas 17.14', tint: 'sky',
  text: [
    'Jesus olhou para eles e disse:',
    { q: 'Vão mostrar-se aos sacerdotes.', who: 'jesus' },
    'Os sacerdotes eram quem dizia se alguém já estava curado. Os dez homens ainda estavam doentes, mas confiaram em Jesus e foram.'
  ],
  fact: 'Eles obedeceram antes de ver a cura. Isso é ter fé!',
  hint: 'Toca nos homens para irem pelo caminho.',
  alt: 'Jesus aponta para a estrada. Os dez homens, ainda doentes, começam a caminhar para a cidade.',
  cue: [300, 600],
  art() {
    let s = bgDay({ sunX: 160, sunY: 150 });
    s += campo(460) + aldeia(600, 470, .7);
    s += estrada(520);
    s += jesus({ x: 120, y: 760, s: .94, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 80, b: -10 }, k: 'jesus' });
    s += `<g data-k="grupo"><g data-k="grupoIn">${[5, 6, 7].map((i, k) => doente(i, { x: 330 + k * 60, y: 640, s: .5, legs: 'walk', face: 'worry', look: .6 })).join('')}${[0, 1, 2].map(i => doente(i, { x: 270 + i * 110, y: 770, s: .8, legs: 'walk', face: 'worry', look: .6, armL: { a: 20 }, armR: { a: 30 } })).join('')}</g>${hitC(390, 650, 170)}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('grupo'), 'Homens doentes', async () => {
      if (api.st.foi) { api.snd('tiptoe'); return; }
      api.st.foi = true;
      api.snd('tiptoe'); api.bubble(400, 440, 'Vamos, como Jesus disse!', { key: 'g' });
      await api.anim(api.q('grupoIn'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(160px)' }], { duration: 2200, easing: 'ease-in-out', fill: 'forwards' });
      api.nudgeNext(2000);
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(130, 420, 'Vão!', { key: 'j' }); });
  }
});

/* =====================================================================
   4 — CURADOS NO CAMINHO
   ===================================================================== */
SCENES.push({
  key: 'curados', title: 'Curados pelo caminho!', ref: 'Lucas 17.14', tint: 'gold',
  text: [
    'E, enquanto iam pelo caminho, aconteceu uma coisa maravilhosa:',
    'as manchas desapareceram, e a pele ficou nova e limpinha!',
    'Os dez estavam curados!'
  ],
  fact: 'Jesus curou os dez de uma vez, sem sequer lhes tocar!',
  hint: 'Toca em cada homem para ver a cura.',
  alt: 'Na estrada, os homens olham para as mãos e para os braços. As manchas desaparecem e as roupas ficam coloridas.',
  cue: [140, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 150 });
    s += campo(460);
    s += estrada(520);
    s += `<g data-k="tras">${[5, 6, 7, 8, 9].map((i, k) => doente(i, { x: 160 + k * 120, y: 640, s: .48, look: 0 })).join('')}</g>`;
    s += `<g data-k="trasOk" opacity="0">${[5, 6, 7, 8, 9].map((i, k) => curado(i, { x: 160 + k * 120, y: 640, s: .48, look: 0, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })).join('')}</g>`;
    const X = [120, 260, 400, 540, 680];
    X.forEach((x, i) => {
      s += `<g data-k="h${i}"><g data-k="h${i}a">${doente(i, { x, y: 780, s: .8, face: 'worry', look: 0, armL: { a: 60, b: -60 }, armR: { a: 20 } })}</g><g data-k="h${i}b" opacity="0">${curado(i, { x, y: 780, s: .8, face: 'laugh', look: 0, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })}</g>${hitC(x, 660, 66)}</g>`;
    });
    return s;
  },
  setup(api) {
    const X = [120, 260, 400, 540, 680];
    const FALAS = [N('Estou curado!'), N('A minha pele!'), N('Olha as minhas mãos!'), N('Já não tenho manchas!'), N('Que maravilha!')];
    let n = 0;
    for (let i = 0; i < 5; i++) api.tap(api.q('h' + i), 'Homem', () => {
      if (api.st['h' + i]) { api.snd('laugh'); api.hop(api.q('h' + i)); return; }
      api.st['h' + i] = true;
      api.snd('twinkle'); api.burst(X[i], 620, 'spark', 7, { col: '#ffe9a6' });
      api.q('h' + i + 'a').setAttribute('opacity', '0');
      api.anim(api.q('h' + i + 'b'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.bubble(X[i], 480, FALAS[i], { key: 'h', size: 26 });
      if (++n === 5) {
        api.later(() => { api.snd('tada'); api.q('tras').setAttribute('opacity', '0'); api.anim(api.q('trasOk'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' }); api.burst(400, 520, 'confetti', 10); }, 900);
        api.nudgeNext(3200);
      }
    });
  }
});

/* =====================================================================
   5 — UM VOLTOU
   ===================================================================== */
SCENES.push({
  key: 'volta', title: 'Um voltou para agradecer', ref: 'Lucas 17.15-16', tint: 'meadow',
  text: [
    'Um deles, quando viu que estava curado, voltou para trás a louvar a Deus em voz alta.',
    'Ajoelhou-se aos pés de Jesus e disse: «Obrigado!»',
    'Este homem era samaritano, alguém de outro povo.'
  ],
  fact: 'Os judeus e os samaritanos não se davam bem. Mas Jesus ama toda a gente!',
  hint: 'Toca no homem para ele voltar para Jesus.',
  alt: 'Um homem de roupa verde vem a correr pela estrada, de braços no ar, para onde Jesus está.',
  cue: [600, 560],
  art() {
    let s = bgDay({ sunX: 160, sunY: 150 });
    s += campo(460);
    s += estrada(520);
    s += jesus({ x: 160, y: 770, s: .96, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 50, b: -20 }, k: 'jesus' });
    s += `<g data-k="homem"><g data-k="corre">${curado(SAMAR, { x: 620, y: 770, s: .9, legs: 'run', flip: true, look: .6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })}</g><g data-k="ajoelha" opacity="0">${curado(SAMAR, { x: 330, y: 780, s: .9, legs: 'kneel', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } })}</g>${hitC(620, 640, 80)}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('homem'), 'Homem curado', async () => {
      if (api.st.ok) { api.snd('heart'); api.burst(330, 520, 'heart', 4); api.bubble(330, 440, 'Obrigado, Jesus!', { key: 'h' }); return; }
      api.st.ok = true;
      api.snd('tiptoe'); api.bubble(620, 440, 'Glória a Deus!', { key: 'h' });
      await api.anim(api.q('corre'), [{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(-290px)', opacity: 1 }], { duration: 1500, easing: 'ease-in-out', fill: 'forwards' });
      api.q('corre').setAttribute('opacity', '0');
      api.anim(api.q('corre'), [{ opacity: 0 }, { opacity: 0 }], { duration: 10, fill: 'forwards' });
      await api.anim(api.q('ajoelha'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('heart'); api.burst(330, 520, 'heart', 6);
      api.bubble(330, 440, 'Obrigado, Jesus!', { key: 'h' });
      api.nudgeNext(2800);
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(160, 420, api.st.ok ? 'Levanta-te!' : 'Olha quem vem aí!', { key: 'j' }); });
  }
});

/* =====================================================================
   6 — ONDE ESTÃO OS OUTROS NOVE?
   ===================================================================== */
SCENES.push({
  key: 'nove', title: 'Onde estão os outros nove?', ref: 'Lucas 17.17-18', tint: 'sky',
  text: [
    'Jesus perguntou:',
    { q: 'Não foram dez os que ficaram curados? Onde estão os outros nove?', who: 'jesus' },
    'Só um tinha voltado para agradecer a Deus.'
  ],
  fact: 'Os outros nove também receberam um presente enorme. Mas esqueceram-se de dizer obrigado.',
  hint: 'Toca nos homens que vão ao longe e em Jesus.',
  alt: 'Ao longe, nove homens felizes correm para casa sem olhar para trás. Perto, Jesus está com o homem que voltou.',
  cue: [560, 500],
  art() {
    let s = bgDay({ sunX: 160, sunY: 150 });
    s += campo(460) + aldeia(600, 470, .8);
    s += estrada(520);
    s += `<g data-k="nove">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, k) => curado(i, { x: 470 + (k % 5) * 60, y: 600 + Math.floor(k / 5) * 34, s: .4, legs: 'run', look: .6, armL: { a: 150, b: -20 }, armR: { a: 40 } })).join('')}<rect x="420" y="480" width="340" height="150" fill="#000" fill-opacity="0"/></g>`;
    s += jesus({ x: 160, y: 770, s: .96, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 80, b: -20 }, k: 'jesus' });
    s += curado(SAMAR, { x: 330, y: 780, s: .9, legs: 'kneel', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    api.tap(api.q('nove'), 'Os outros nove', () => {
      api.snd('tiptoe');
      api.anim(api.q('nove'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(30px)' }, { transform: 'translateX(0px)' }], { duration: 900 });
      api.bubble(590, 400, 'Vamos para casa!', { key: 'n' }); ok('n');
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hm'); api.bubble(160, 420, 'Onde estão os outros nove?', { key: 'j' }); ok('j'); });
  }
});

/* =====================================================================
   7 — A TUA FÉ SALVOU-TE
   ===================================================================== */
SCENES.push({
  key: 'fe', title: 'A tua fé salvou-te!', ref: 'Lucas 17.19', tint: 'gold',
  text: [
    'Então Jesus disse ao homem que voltou:',
    { q: 'Levanta-te e vai. A tua fé salvou-te.', who: 'jesus' },
    'O homem foi para casa feliz, com o corpo curado e o coração cheio de alegria!'
  ],
  fact: 'Aquele homem ganhou duas coisas: a cura e a amizade com Jesus!',
  hint: 'Toca no homem e em Jesus.',
  alt: 'O homem curado levanta-se de braços no ar, a sorrir. Jesus sorri para ele e acena.',
  cue: [460, 560],
  art() {
    let s = bgDay({ sunX: 640, sunY: 150 });
    s += campo(460);
    s += estrada(520);
    s += jesus({ x: 230, y: 770, s: 1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 140, b: -20 }, k: 'jesus' });
    s += curado(SAMAR, { x: 480, y: 780, s: 1, face: 'laugh', look: -.4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'homem' });
    return s;
  },
  setup(api) {
    api.tap(api.q('homem'), 'Homem curado', () => {
      api.snd('victory'); api.hop(api.q('homem'), 30); api.burst(480, 500, 'heart', 6);
      api.bubble(480, 400, 'Obrigado, Senhor!', { key: 'h' });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.wave(api.q('jesus')); api.bubble(230, 400, 'Vai em paz!', { key: 'j' }); });
  }
});

/* =====================================================================
   8 — E TU?
   ===================================================================== */
SCENES.push({
  key: 'tu', title: 'E tu, já disseste obrigado?', ref: '1 Tessalonicenses 5.18', tint: 'rose',
  text: [
    'Deus dá-nos tantos presentes todos os dias!',
    'A comida, a família, o sol, os amigos...',
    'Vamos lembrar-nos sempre de dizer: «Obrigado, Deus!»'
  ],
  fact: 'Agradecer deixa o coração alegre!',
  hint: 'Toca no pão, no sol e na família.',
  alt: 'Uma família está sentada à mesa com pão e fruta. Pela janela entra o sol. O menino junta as mãos para agradecer.',
  cue: [400, 640],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="980" fill="#f2dcb0"/><rect x="-40" y="620" width="900" height="400" fill="#c9a77a"/><path d="M-40,620 L840,620" stroke="#a8875a" stroke-width="6"/>`;
    s += `<g transform="translate(400,220)"><rect x="-110" y="-90" width="220" height="180" rx="8" fill="#9fd0ee" stroke="${OL}" stroke-width="4"/>${sun(40, -20, 34, { face: true })}<path d="M0,-90 L0,90 M-110,0 L110,0" stroke="#8a5a33" stroke-width="8"/><rect x="-118" y="90" width="236" height="14" rx="3" fill="#b9875a" stroke="${OL}" stroke-width="3"/></g>`;
    s += `<g data-k="sol"><rect x="290" y="130" width="220" height="190" fill="#000" fill-opacity="0"/></g>`;
    s += person({ kind: 'adult', skin: '#d99a6c', hair: '#3a2520', hairStyle: 'long', tunic: '#a0527a', head: 'scarf', clothCol: '#e8c86a', x: 160, y: 760, s: .92, face: 'joy', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'mae' });
    s += person({ kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', tunic: '#3f5a8a', x: 650, y: 760, s: .92, face: 'joy', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'pai' });
    s += person({ kind: 'child', skin: '#e3a675', hair: '#5a3020', tunic: '#3f93c7', x: 400, y: 740, s: .9, face: 'sleep', look: 0, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } });
    s += `<g transform="translate(400,700)"><rect x="-230" y="-20" width="460" height="24" rx="6" fill="#9a6b3e" stroke="${OL}" stroke-width="3.4"/><path d="M-200,4 L-200,90 M200,4 L200,90" stroke="#8a5a33" stroke-width="12"/></g>`;
    s += `<g data-k="menino">${hitC(400, 600, 50)}</g>`;
    s += `<g data-k="pao"><g class="act"><g transform="translate(330,672)"><ellipse rx="46" ry="20" fill="#d8954a" stroke="${OL}" stroke-width="3"/><path d="M-24,-6 Q-18,-14 -10,-6 M0,-8 Q6,-16 14,-8" stroke="#a8682e" stroke-width="3" fill="none"/></g><g transform="translate(470,676)"><ellipse rx="40" ry="14" fill="#e8dcc8" stroke="${OL}" stroke-width="3"/><circle cx="-14" cy="-12" r="12" fill="#e0473e" stroke="${OL}" stroke-width="2.4"/><circle cx="8" cy="-14" r="11" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/><circle cx="22" cy="-8" r="9" fill="#7bc263" stroke="${OL}" stroke-width="2.4"/></g>${hitC(400, 660, 90)}</g></g>`;
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.later(() => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(400, 400, 'heart', 8); }, 900); api.nudgeNext(3000); } };
    api.tap(api.q('pao'), 'Comida', () => { api.snd('chime', 'C6'); api.burst(400, 620, 'spark', 5); api.bubble(400, 470, 'Obrigado pela comida!', { key: 'b' }); ok('p'); });
    api.tap(api.q('sol'), 'Sol', () => { api.snd('chime', 'E6'); api.burst(440, 200, 'spark', 6, { col: '#ffe9a6' }); api.bubble(400, 380, 'Obrigado pelo sol!', { key: 'b' }); ok('s'); });
    const fam = () => { api.snd('heart'); api.burst(400, 480, 'heart', 5); api.bubble(400, 470, 'Obrigado pela minha família!', { key: 'b' }); ok('f'); };
    api.tap(api.q('mae'), 'Mãe', fam);
    api.tap(api.q('pai'), 'Pai', fam);
    api.tap(api.q('menino'), 'Menino', fam);
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre uma aldeia com as janelas acesas. Uma ovelhinha dorme na erva.',
  cue: [430, 160],
  questions: [
    ['Quantos homens doentes encontraram Jesus?', 'Dez.'],
    ['O que gritaram eles a Jesus?', 'Jesus, Mestre, tem pena de nós!'],
    ['Quando ficaram curados?', 'Enquanto iam pelo caminho.'],
    ['Quantos voltaram para agradecer?', 'Só um.'],
    ['E tu, por que coisas queres agradecer a Deus hoje?', 'Pela família, pela comida, pelos amigos...']
  ],
  wrong: [
    ['Dois.', 'Cinco.', 'Cem.'],
    ['Vai-te embora!', 'Dá-nos dinheiro!', 'Não gritaram nada.'],
    ['Antes de verem Jesus.', 'Só no dia seguinte.', 'Nunca.'],
    ['Todos os dez.', 'Cinco.', 'Nenhum.'],
    ['Por nada.', 'Só pelos brinquedos novos.', 'Só quando ganho alguma coisa.']
  ],
  verse: ['Deem graças ao Senhor, porque Ele é bom!', 'Salmo 107.1'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1701, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#2f3d5a');
    s += town(500, 560, .7, { wall: '#7a7266', roof: '#6a6258', winCol: '#ffd27a', doorCol: '#4a3226' });
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
  id: 'leprosos',
  title: 'Os Dez Leprosos',
  cover: { kicker: 'Uma história da Bíblia', title: 'Os Dez', small: 'Leprosos', sub: 'Obrigado, Jesus!' },
  color: '#3a7f6a',
  ref: 'Lucas 17.11-19',
  scenes: SCENES
});
})();
