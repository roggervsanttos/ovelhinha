/* =====================================================================
   LIVRO: JESUS E A FILHA DE JAIRO  (Marcos 5.21-43)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const JAIRO = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#3f5a8a', belt: '#c9a54e', cloak: '#6a4a8a', cloakTrim: '#e2c46a', head: 'cloth', clothCol: '#f4efe6', bandCol: '#3f5a8a' };
const MAE = { kind: 'adult', skin: '#d99a6c', hair: '#3a2520', hairStyle: 'long', tunic: '#a0527a', belt: '#6b4a33', head: 'scarf', clothCol: '#e8c86a' };
const MENINA = { kind: 'child', skin: '#d99a6c', hair: '#3a2520', hairStyle: 'long', tunic: '#f2a6b8', belt: '#c06080' };
const MULHER = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', hairStyle: 'long', tunic: '#8a8a7a', belt: '#5a3a26', head: 'scarf', clothCol: '#b9b09a' };
const DISC = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' };
const GENTE = [
  { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', beard: 'short', beardCol: '#7a4a22', tunic: '#c0603a', belt: '#6b4a33', head: 'cloth', clothCol: '#efe2c4', bandCol: '#c0603a' },
  { kind: 'adult', skin: '#b97a4e', hair: '#2b1d17', hairStyle: 'long', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'scarf', clothCol: '#d9e4f0' },
  { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'curly', hi: '#5a3020', beard: 'short', beardCol: '#4a2c1c', tunic: '#c9a54e', belt: '#6b4a33' },
  { kind: 'child', skin: '#e3a675', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' }
];
const jesus = o => person(Object.assign({}, JESUS, o));
const p = (who, o) => person(Object.assign({}, who, o));

/* ---------- peças desta história ---------- */
// quarto da menina
function quarto(o = {}) {
  let s = `<rect x="-40" y="-40" width="900" height="980" fill="${o.wall || '#ecd5a6'}"/>`;
  s += `<rect x="-40" y="600" width="900" height="400" fill="#c9a77a"/><path d="M-40,600 L840,600" stroke="#a8875a" stroke-width="6"/>`;
  s += `<g transform="translate(620,200)"><rect x="-70" y="-70" width="140" height="150" rx="6" fill="#9fd0ee" stroke="${OL}" stroke-width="4"/><path d="M0,-70 L0,80 M-70,4 L70,4" stroke="#8a5a33" stroke-width="8"/><rect x="-78" y="80" width="156" height="12" rx="3" fill="#b9875a" stroke="${OL}" stroke-width="3"/></g>`;
  return s;
}
// cama baixa com colchão
function cama(x, y, w = 360) {
  return `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="-40" width="${w}" height="40" rx="6" fill="#9a6b3e" stroke="${OL}" stroke-width="3.4"/><rect x="${-w / 2 - 6}" y="-64" width="${w + 12}" height="30" rx="14" fill="#f4efe6" stroke="${OL}" stroke-width="3"/><path d="M${-w / 2 + 10},0 L${-w / 2 + 10},30 M${w / 2 - 10},0 L${w / 2 - 10},30" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M${-w / 2 + 10},0 L${-w / 2 + 10},30 M${w / 2 - 10},0 L${w / 2 - 10},30" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/><ellipse cx="${-w / 2 + 50}" cy="-70" rx="46" ry="20" fill="#fbf6ea" stroke="${OL}" stroke-width="3"/></g>`;
}
// a menina deitada a dormir (cabeça para a esquerda), com cobertor
function deitada(x, y) {
  return `<g transform="translate(${x},${y}) rotate(-90)">${p(MENINA, { s: .9, face: 'sleep', look: 0, armL: { a: 0 }, armR: { a: 0 }, cls: '' })}</g><path d="M${x + 16},${y + 30} C${x + 12},${y - 44} ${x - 86},${y - 44} ${x - 92},${y + 30} Z" fill="#7ab0d8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
}
// rua com casas (para a multidão)
function rua() {
  let s = bgDay({ sunX: 660, sunY: 140 });
  s += house(-20, 520, 170, 170) + house(140, 500, 140, 140, { wall: '#e6c896' }) + house(560, 510, 150, 150, { wall: '#f0dcb0' }) + house(700, 520, 160, 180);
  s += `<rect x="-40" y="520" width="900" height="400" fill="#d9c08a"/>`;
  return s;
}
const lagoa = () => `<rect x="-40" y="430" width="900" height="120" fill="#6fb0d8"/>` + waveBand(440, { fill: '#5aa3d2', amp: 6, len: 140, dx: 20, d: 6, foam: '#d6eff9', fw: 3 }) + `<path d="M-40,520 C200,500 600,530 840,506 L840,900 L-40,900 Z" fill="#e2cf98"/>`;

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jesus e a Filha de Jairo',
  alt: 'Num quarto, Jesus segura a mão de uma menina que se levanta da cama, toda contente. Os pais dela olham com alegria.',
  cue: [400, 720],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="300" fill="#ecd5a6"/>` + `<g transform="translate(0,200)">${quarto()}</g>` + `<rect x="-40" y="800" width="900" height="400" fill="#c9a77a"/>`;
    s += cama(420, 1000, 380);
    s += p(MAE, { x: 110, y: 1040, s: 1, face: 'joy', look: .6, armL: { a: 150, b: -30 }, armR: { a: 140, b: -40 } });
    s += p(JAIRO, { x: 700, y: 1040, s: 1, face: 'laugh', look: -.6, armL: { a: 140, b: -30 }, armR: { a: 150, b: -30 } });
    s += p(MENINA, { x: 470, y: 940, s: 1.2, face: 'joy', look: -.4, armL: { a: 80, b: -10 }, armR: { a: 30 }, k: 'menina' });
    s += jesus({ x: 270, y: 1020, s: 1.1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 80, b: -10 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('menina'), 'Menina', () => { api.snd('laugh'); api.hop(api.q('menina')); api.burst(470, 700, 'heart', 4); api.bubble(470, 640, 'Já estou boa!', { key: 'm' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.bubble(270, 640, 'Menina, levanta-te!', { key: 'j' }); });
  }
});

/* =====================================================================
   1 — O PEDIDO DE JAIRO
   ===================================================================== */
SCENES.push({
  key: 'pedido', title: 'O pedido de Jairo', ref: 'Marcos 5.21-23', tint: 'water',
  text: [
    'Um dia, Jesus estava à beira do lago, rodeado de gente.',
    'Chegou um homem chamado Jairo, que era chefe da sinagoga. Ajoelhou-se aos pés de Jesus e pediu:',
    { q: 'A minha filhinha está muito doente. Vem, por favor, pôr as mãos nela!', who: 'outro' }
  ],
  fact: 'A filha de Jairo tinha doze anos e era a única filha que ele tinha.',
  hint: 'Toca no Jairo e em Jesus.',
  alt: 'À beira do lago, Jairo está ajoelhado aos pés de Jesus, com as mãos juntas a pedir ajuda. Atrás, pessoas olham.',
  cue: [480, 560],
  art() {
    let s = bgDay({ sunX: 150, sunY: 150 });
    s += lagoa();
    s += p(GENTE[0], { x: 90, y: 690, s: .8, face: 'smile', look: .6 }) + p(GENTE[1], { x: 690, y: 690, s: .8, face: 'surprise', look: -.6 });
    s += jesus({ x: 300, y: 740, s: 1, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 60, b: -20 }, k: 'jesus' });
    s += p(JAIRO, { x: 500, y: 750, s: 1, legs: 'kneel', face: 'worry', look: -.7, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'jairo' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    api.tap(api.q('jairo'), 'Jairo', () => { api.snd('hm'); api.bubble(500, 420, 'Ajuda a minha filha!', { key: 'a' }); ok('a'); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(300, 470, 'heart', 4); api.bubble(300, 400, 'Eu vou contigo.', { key: 'j' }); ok('j'); });
  }
});

/* =====================================================================
   2 — TANTA GENTE!
   ===================================================================== */
SCENES.push({
  key: 'multidao', title: 'Tanta gente!', ref: 'Marcos 5.24', tint: 'sand',
  text: [
    'Jesus foi logo com Jairo.',
    'Mas havia tanta gente à volta deles que mal se conseguia andar!',
    'Todos queriam estar perto de Jesus.'
  ],
  fact: 'Jairo devia estar aflito: queria chegar a casa depressa!',
  hint: 'Toca nas pessoas para abrirem caminho.',
  alt: 'Numa rua estreita, uma multidão aperta-se à volta de Jesus e de Jairo, que tentam passar.',
  cue: [160, 600],
  art() {
    let s = rua();
    s += jesus({ x: 400, y: 700, s: .9, legs: 'walk', face: 'smile', look: .4, armL: { a: 20 }, armR: { a: 30 } });
    s += p(JAIRO, { x: 500, y: 700, s: .86, legs: 'walk', face: 'worry', look: .6, armL: { a: 20 }, armR: { a: 60, b: -20 } });
    const X = [140, 260, 640, 740];
    X.forEach((x, i) => s += p(GENTE[i], { x, y: 760 + (i % 2) * 10, s: i === 3 ? 1.05 : .9, face: 'joy', look: i < 2 ? .6 : -.6, armL: { a: 30 }, armR: { a: 140, b: -20 }, k: 'g' + i }));
    return s;
  },
  setup(api) {
    const X = [140, 260, 640, 740];
    const FALAS = [N('Deixem passar!'), N('Quero ver Jesus!'), N('Com licença!'), N('Eu também!')];
    const vistos = new Set();
    for (let i = 0; i < 4; i++) api.tap(api.q('g' + i), 'Pessoa', () => {
      api.snd('boing');
      api.anim(api.act(api.q('g' + i)), [{ transform: 'translateX(0px)' }, { transform: `translateX(${i < 2 ? -40 : 40}px)` }, { transform: 'translateX(0px)' }], { duration: 900 });
      api.bubble(X[i], 470, FALAS[i], { key: 'g' + i, size: 26 });
      vistos.add(i); if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
  }
});

/* =====================================================================
   3 — QUEM ME TOCOU?
   ===================================================================== */
SCENES.push({
  key: 'manto', title: 'Quem me tocou?', ref: 'Marcos 5.25-34', tint: 'gold',
  text: [
    'No meio da multidão estava uma mulher que andava doente há doze anos.',
    'Ela pensou: «Se eu tocar só na roupa de Jesus, vou ficar boa!» Tocou, e ficou curada!',
    'Jesus disse-lhe com carinho: «Filha, a tua fé curou-te. Vai em paz.»'
  ],
  fact: 'Nenhum médico tinha conseguido curar aquela mulher. Mas Jesus curou!',
  hint: 'Toca no manto de Jesus.',
  alt: 'Uma mulher de lenço cinzento estende a mão e toca na ponta do manto vermelho de Jesus. Jesus vira-se para ela.',
  cue: [470, 640],
  art() {
    let s = rua();
    s += p(GENTE[2], { x: 120, y: 740, s: .86, face: 'surprise', look: .6 }) + p(GENTE[0], { x: 700, y: 740, s: .86, face: 'o', look: -.6 });
    s += jesus({ x: 330, y: 760, s: 1, face: 'surprise', look: .7, armL: { a: 20 }, armR: { a: 30 }, k: 'jesus' });
    s += `<g data-k="manto"><g class="act"><path d="M360,600 C380,640 380,700 372,756 L330,760 Z" fill="#000" fill-opacity="0"/>${hitC(380, 690, 60)}</g></g>`;
    s += `<g data-k="doente">${p(MULHER, { x: 520, y: 770, s: .9, legs: 'kneel', face: 'worry', look: -.7, armL: { a: 20 }, armR: { a: 70, b: -10 } })}</g>`;
    s += `<g data-k="boa" opacity="0">${p(Object.assign({}, MULHER, { tunic: '#7ab0d8', clothCol: '#f4efe6' }), { x: 520, y: 770, s: .9, legs: 'kneel', face: 'joy', look: -.7, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } })}</g>`;
    s += `<g data-k="mulher"><rect x="440" y="520" width="160" height="260" fill="#000" fill-opacity="0"/></g>`;
    return s;
  },
  setup(api) {
    const cura = async () => {
      if (api.st.cura) { api.snd('heart'); api.bubble(330, 420, 'A tua fé curou-te!', { key: 'j' }); return; }
      api.st.cura = true;
      api.snd('twinkle'); api.burst(450, 620, 'spark', 8, { col: '#ffe9a6' });
      api.anim(api.q('doente'), [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' });
      await api.anim(api.q('boa'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
      api.bubble(330, 420, 'Quem me tocou?', { key: 'j' });
      api.later(() => api.bubble(540, 470, 'Fui eu. Estou curada!', { key: 'm' }), 1500);
      api.later(() => { api.snd('heart'); api.bubble(330, 420, 'Vai em paz, filha.', { key: 'j' }); }, 3200);
      api.nudgeNext(4800);
    };
    api.tap(api.q('manto'), 'Manto de Jesus', cura);
    api.tap(api.q('mulher'), 'Mulher doente', cura);
    api.tap(api.q('jesus'), 'Jesus', () => { if (api.st.cura) { api.snd('heart'); api.bubble(330, 420, 'Vai em paz, filha.', { key: 'j' }); } else { api.snd('hm'); api.bubble(330, 420, 'Alguém me tocou...', { key: 'j' }); } });
  }
});

/* =====================================================================
   4 — NÃO TENHAS MEDO
   ===================================================================== */
SCENES.push({
  key: 'medo', title: 'Não tenhas medo!', ref: 'Marcos 5.35-36', tint: 'stone',
  text: [
    'Nisto, chegaram uns homens da casa de Jairo com uma notícia muito triste:',
    '«A tua filha morreu. Já não vale a pena incomodar o Mestre.»',
    'Mas Jesus disse a Jairo:',
    { q: 'Não tenhas medo. Continua a confiar!', who: 'jesus' }
  ],
  fact: 'Para Jesus, nunca é tarde demais!',
  hint: 'Toca em Jesus para animar o Jairo.',
  alt: 'Dois homens trazem uma notícia triste e Jairo põe as mãos na cara. Jesus põe a mão no ombro dele.',
  cue: [300, 560],
  art() {
    let s = sky('sky', [[0, '#9fb6cc'], [.6, '#d6dde6'], [1, '#e6e4dc']]) + cloud(180, 160, 1, { col: '#e6e9ee' }) + cloud(600, 130, .8);
    s += house(-20, 520, 170, 170) + house(600, 520, 220, 170, { wall: '#e6c896' });
    s += `<rect x="-40" y="520" width="900" height="400" fill="#d9c08a"/>`;
    s += p(GENTE[0], { x: 580, y: 750, s: .86, face: 'sad', look: -.6, armL: { a: 20 }, armR: { a: 40 } }) + p(GENTE[2], { x: 700, y: 740, s: .86, face: 'sad', look: -.6, armL: { a: 20 }, armR: { a: 20 } });
    s += jesus({ x: 260, y: 760, s: 1, face: 'smile', look: .7, armL: { a: 20 }, armR: { a: 70, b: -20 }, k: 'jesus' });
    s += `<g data-k="triste">${p(JAIRO, { x: 420, y: 760, s: 1, face: 'sad', look: -.3, armL: { a: -20, b: -140 }, armR: { a: -20, b: -140 } })}</g>`;
    s += `<g data-k="confia" opacity="0">${p(JAIRO, { x: 420, y: 760, s: 1, face: 'determined', look: -.6, armL: { a: 20 }, armR: { a: -30, b: -84 } })}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', async () => {
      api.snd('heart'); api.burst(340, 470, 'heart', 5);
      api.bubble(260, 400, 'Não tenhas medo!', { key: 'j' });
      if (api.st.ok) return;
      api.st.ok = true;
      await api.wait(900);
      api.anim(api.q('triste'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      await api.anim(api.q('confia'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
      api.bubble(440, 430, 'Eu confio em Ti!', { key: 'a' });
      api.nudgeNext(2800);
    });
  }
});

/* =====================================================================
   5 — ELA ESTÁ A DORMIR
   ===================================================================== */
SCENES.push({
  key: 'casa', title: 'Ela está a dormir', ref: 'Marcos 5.38-40', tint: 'rose',
  text: [
    'Em casa de Jairo, muita gente chorava alto.',
    'Jesus disse: «Porque choram? A menina não morreu, está a dormir.»',
    'Mas as pessoas riram-se dele. Então Jesus mandou-as sair.'
  ],
  fact: 'Jesus levou para dentro só os pais da menina e três discípulos: Pedro, Tiago e João.',
  hint: 'Toca nas pessoas e em Jesus.',
  alt: 'À porta de uma casa, pessoas choram e outras riem-se. Jesus está calmo e aponta para dentro.',
  cue: [600, 560],
  art() {
    let s = bgDay({ sunX: 140, sunY: 150, sky: [[0, '#a8c8e0'], [.6, '#efe2d4'], [1, '#efe2d4']] });
    s += house(220, 560, 360, 260, { wall: '#ecd5a6', win: false });
    s += `<rect x="-40" y="560" width="900" height="400" fill="#d9c08a"/>`;
    s += p(GENTE[1], { x: 110, y: 770, s: .9, face: 'sad', look: .4, armL: { a: -20, b: -140 }, armR: { a: 20 }, k: 'c0' });
    s += p(GENTE[2], { x: 250, y: 780, s: .9, face: 'laugh', look: .6, armL: { a: 20 }, armR: { a: 40, b: -90 }, k: 'c1' });
    s += p(GENTE[0], { x: 690, y: 770, s: .9, face: 'laugh', look: -.6, armL: { a: 40, b: -90 }, armR: { a: 20 }, k: 'c2' });
    s += jesus({ x: 500, y: 780, s: 1, face: 'smile', look: -.4, armL: { a: 70, b: -10 }, armR: { a: 20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    const X = [110, 250, 690];
    const FALAS = [N('Buá! Buá!'), N('A dormir? Ah, ah!'), N('Ele não sabe o que diz!')];
    const vistos = new Set();
    for (let i = 0; i < 3; i++) api.tap(api.q('c' + i), 'Pessoa', () => {
      api.snd(i ? 'laugh' : 'hm'); api.bubble(X[i], 470, FALAS[i], { key: 'c' + i, size: 26 });
      vistos.add(i); if (vistos.size === 2 && api.st.j && !api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => {
      api.snd('hello'); api.bubble(500, 420, 'Ela está a dormir.', { key: 'j' });
      api.st.j = true; if (vistos.size >= 1 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   6 — MENINA, LEVANTA-TE!
   ===================================================================== */
SCENES.push({
  key: 'levanta', title: 'Menina, levanta-te!', ref: 'Marcos 5.41-42', tint: 'gold',
  text: [
    'Jesus entrou no quarto, pegou na mão da menina e disse:',
    { q: 'Talitá cumi! Que quer dizer: Menina, levanta-te!', who: 'jesus' },
    'E a menina levantou-se logo e começou a andar!'
  ],
  fact: '«Talitá cumi» é aramaico, a língua que Jesus falava em casa.',
  hint: 'Toca na mão de Jesus.',
  alt: 'No quarto, a menina está deitada na cama. Jesus segura-lhe a mão. A mãe está ao lado, de mãos juntas.',
  cue: [330, 560],
  art() {
    let s = quarto();
    s += jesus({ x: 400, y: 700, s: .95, face: 'smile', look: -.6, armL: { a: 60, b: -10 }, armR: { a: 20 }, k: 'jesus' });
    s += cama(430, 720, 380);
    s += p(MAE, { x: 690, y: 780, s: .9, face: 'worry', look: -.6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'mae' });
    s += `<g data-k="dorme">${deitada(450, 628)}</g>`;
    s += `<g data-k="acorda" opacity="0">${p(MENINA, { x: 250, y: 650, s: 1, face: 'joy', look: -.5, armL: { a: 80, b: -10 }, armR: { a: 140, b: -20 } })}</g>`;
    return s;
  },
  setup(api) {
    const levanta = async () => {
      if (api.st.ok) { api.snd('laugh'); api.burst(250, 480, 'heart', 4); api.bubble(250, 400, 'Mãe! Pai!', { key: 'm' }); return; }
      api.st.ok = true;
      api.snd('choir', ['C4', 'E4', 'G4']);
      api.bubble(400, 360, 'Menina, levanta-te!', { key: 'j' });
      await api.wait(1200);
      api.snd('twinkle'); api.burst(400, 560, 'spark', 10, { col: '#ffe9a6' });
      api.anim(api.q('dorme'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      await api.anim(api.q('acorda'), [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 600, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' });
      api.bubble(250, 400, 'Mãe! Pai!', { key: 'm' });
      api.nudgeNext(3000);
    };
    api.tap(api.q('jesus'), 'Mão de Jesus', levanta);
    api.tap(api.q('dorme'), 'Menina', levanta);
    api.tap(api.q('mae'), 'Mãe', () => { api.snd(api.st.ok ? 'laugh' : 'hm'); api.bubble(690, 420, api.st.ok ? 'A minha filha!' : 'Ajuda-a, Jesus!', { key: 'p' }); });
  }
});

/* =====================================================================
   7 — DEEM-LHE DE COMER
   ===================================================================== */
SCENES.push({
  key: 'comer', title: 'Deem-lhe de comer!', ref: 'Marcos 5.42-43', tint: 'meadow',
  text: [
    'Os pais da menina ficaram espantados e muito felizes!',
    'Jesus disse-lhes: «Deem-lhe alguma coisa para comer.»',
    'A menina estava viva e cheia de saúde!'
  ],
  fact: 'Jesus cuidou de tudo, até da fome da menina!',
  hint: 'Toca no pão e na família.',
  alt: 'A família está feliz à volta da mesa, onde há um pão. A menina sorri, e Jesus olha para eles contente.',
  cue: [470, 620],
  art() {
    let s = quarto({ wall: '#f2dcb0' });
    s += `<g transform="translate(470,700)"><rect x="-90" y="-10" width="180" height="16" rx="4" fill="#9a6b3e" stroke="${OL}" stroke-width="3"/><path d="M-70,6 L-70,70 M70,6 L70,70" stroke="#8a5a33" stroke-width="10"/></g>`;
    s += `<g data-k="pao"><g class="act"><g transform="translate(470,676)"><ellipse rx="44" ry="20" fill="#d8954a" stroke="${OL}" stroke-width="3"/><path d="M-24,-6 Q-18,-14 -10,-6 M0,-8 Q6,-16 14,-8" stroke="#a8682e" stroke-width="3" fill="none"/></g>${hitC(470, 670, 56)}</g></g>`;
    s += jesus({ x: 160, y: 780, s: 1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 40 }, k: 'jesus' });
    s += p(MAE, { x: 610, y: 780, s: .96, face: 'laugh', look: -.6, armL: { a: 40, b: -40 }, armR: { a: 30 }, k: 'mae' });
    s += p(JAIRO, { x: 720, y: 780, s: .96, face: 'joy', look: -.6, armL: { a: 60, b: -30 }, armR: { a: 30 }, k: 'pai' });
    s += p(MENINA, { x: 330, y: 780, s: .95, face: 'joy', look: .4, armL: { a: 30 }, armR: { a: 70, b: -30 }, k: 'menina' });
    return s;
  },
  setup(api) {
    api.tap(api.q('pao'), 'Pão', () => {
      api.snd('crunch'); api.burst(400, 600, 'heart', 3);
      api.bubble(330, 450, 'Hum, que bom!', { key: 'm' });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
    api.tap(api.q('menina'), 'Menina', () => { api.snd('laugh'); api.hop(api.q('menina')); api.bubble(330, 450, 'Tenho tanta fome!', { key: 'm' }); });
    api.tap(api.q('mae'), 'Mãe', () => { api.snd('heart'); api.burst(610, 480, 'heart', 4); api.bubble(610, 420, 'Obrigada, Jesus!', { key: 'p' }); });
    api.tap(api.q('pai'), 'Jairo', () => { api.snd('heart'); api.burst(720, 480, 'heart', 4); api.bubble(690, 420, 'Obrigado, Jesus!', { key: 'p' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(160, 420, 'Deem-lhe de comer!', { key: 'j' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre uma casa com a janela acesa. Uma ovelhinha dorme na erva.',
  cue: [430, 160],
  questions: [
    ['O que pediu Jairo a Jesus?', 'Que fosse curar a filha dele.'],
    ['Em que tocou a mulher doente?', 'Na roupa de Jesus.'],
    ['O que disse Jesus a Jairo quando chegou a notícia triste?', 'Não tenhas medo!'],
    ['O que disse Jesus à menina?', 'Menina, levanta-te!'],
    ['O que mandou Jesus dar à menina?', 'Alguma coisa para comer.']
  ],
  wrong: [
    ['Que lhe desse dinheiro.', 'Que fosse jantar a casa dele.', 'Que contasse uma história.'],
    ['Na mão de Pedro.', 'No barco.', 'Numa árvore.'],
    ['Vamos embora!', 'Já é tarde demais!', 'Chora muito!'],
    ['Menina, dorme mais!', 'Menina, vai brincar!', 'Não disse nada.'],
    ['Um brinquedo novo.', 'Um vestido bonito.', 'Um cachorrinho.']
  ],
  verse: ['Não tenhas medo. Continua a confiar!', 'Marcos 5.36'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(5901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#2f3d5a');
    s += house(520, 640, 150, 110, { wall: '#8a7a6a', winCol: '#ffd27a', doorCol: '#4a3226' });
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
  id: 'jairo',
  title: 'Jesus e a Filha de Jairo',
  cover: { kicker: 'Uma história da Bíblia', title: 'A Filha', small: 'de Jairo', sub: 'Menina, levanta-te!' },
  color: '#8a4f8f',
  ref: 'Marcos 5.21-43',
  scenes: SCENES
});
})();
