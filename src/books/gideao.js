/* =====================================================================
   LIVRO: GIDEÃO E OS 300  (Juízes 6–7)
   ===================================================================== */
(() => {
const SCENES = [];
const GIDEAO = { kind: 'adult', skin: '#d39463', hair: '#5a3a26', beard: 'short', beardCol: '#5a3a26', tunic: '#7a8a3a', belt: '#6b4a33', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#7a8a3a' };
const ANJO = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', legs: 'none', hemY: -4, hemW: 50, trim: '#f2c14e' };
// os soldados de Gideão (cores que se repetem)
const SOLD = [
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', tunic: '#8b6a4a', belt: '#5a3a26', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#b5402f' },
  { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', beard: 'bushy', beardCol: '#7a4a22', tunic: '#5d6d8a', belt: '#5a3a26' },
  { kind: 'adult', skin: '#b97a4e', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', beard: 'short', beardCol: '#2b1d17', tunic: '#a0603a', belt: '#5a3a26' },
  { kind: 'adult', skin: '#d99a6c', hair: '#4a2c1c', beard: 'short', beardCol: '#4a2c1c', tunic: '#6a7a4a', belt: '#5a3a26', head: 'cloth', clothCol: '#d9e4f0', bandCol: '#3f6fb5' }
];
const gid = o => person(Object.assign({}, GIDEAO, o));
const sold = (i, o) => person(Object.assign({}, SOLD[i % 4], o));

/* ---------- peças desta história ---------- */
function wings() {
  const w = s => `<path transform="scale(${s},1)" d="M10,-176 C40,-210 110,-228 130,-190 C140,-172 128,-156 112,-150 C128,-140 130,-120 114,-108 C126,-96 120,-78 102,-74 C80,-70 40,-100 10,-140 Z" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  return `<g class="flapw2" style="${dl(2)}">${w(1)}</g><g class="flapw2" style="${dl(2)}">${w(-1)}</g>`;
}
const anjo = o => person(Object.assign({}, ANJO, { backItems: `<circle cx="0" cy="-120" r="150" fill="${UR('aglow')}"/>` + wings(), cls: 'hover' }, o));
const glowDefs = () => `<defs>${rg('aglow', [[0, '#fff6c8', .95], [.55, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs>`;
// chama de tocha
const chama = (sc = 1) => `<g transform="scale(${sc})"><g class="flicker"><path d="M0,-44 C12,-26 20,-12 14,-2 C8,6 -8,6 -14,-2 C-20,-12 -12,-26 0,-44 Z" fill="#ff8f2e"/><path d="M0,-26 C6,-16 8,-10 6,-5 C3,-1 -3,-1 -6,-5 C-8,-10 -6,-16 0,-26 Z" fill="#ffe08a"/></g></g>`;
const tocha = () => `<g>${limb(0, 30, 0, -10, 7, '#8a5a33')}<g transform="translate(0,-10)">${chama(.9)}</g></g>`;
// cântaro de barro (cobre a tocha)
const cantaro = (col = '#c9774a') => `<g><path d="M-18,-40 C-30,-30 -32,0 -22,16 C-14,26 14,26 22,16 C32,0 30,-30 18,-40 Z" fill="${col}" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><rect x="-12" y="-48" width="24" height="10" rx="3" fill="${col}" stroke="${OL}" stroke-width="2.6"/><path d="M-22,-14 Q0,-6 22,-14" stroke="#a95f38" stroke-width="3" fill="none"/></g>`;
// cacos de barro no chão
const cacos = () => `<g fill="#c9774a" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"><path d="M-30,0 L-14,-10 L-8,4 Z"/><path d="M4,2 L18,-8 L26,4 Z"/><path d="M-6,-14 L4,-20 L8,-8 Z"/></g>`;
// tenda dos midianitas
const tendaM = (x, y, s = 1, k = '') => `<g${k ? ` data-k="${k}"` : ''}>${tent(x, y, 170 * s, 120 * s, { fill: '#8a6a9a', stripe: '#e2c46a' })}</g>`;
// lagar: buraco de pedra onde se esmagavam as uvas
function lagar(x, y) {
  return `<g transform="translate(${x},${y})"><path d="M-220,0 C-220,-50 220,-50 220,0 L200,70 L-200,70 Z" fill="#9a9184" stroke="${OL}" stroke-width="3.4"/><path d="M-200,6 C-200,-30 200,-30 200,6 Z" fill="#6a6258" stroke="${OL}" stroke-width="3"/>${[-150, -60, 40, 130].map((a, i) => `<path d="M${a},40 l40,-4 l6,22 l-44,4 Z" fill="#aaa192" stroke="${OL}" stroke-width="2"/>`).join('')}</g>`;
}
// molho de trigo
const trigo = (x, y, s = 1, k = '') => `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${[-16, -8, 0, 8, 16].map(a => `<path d="M0,0 L${a * 1.6},-90" stroke="#c9a54e" stroke-width="4"/><ellipse cx="${a * 1.7}" cy="-96" rx="7" ry="16" transform="rotate(${a} ${a * 1.7} -96)" fill="#e8c86a" stroke="${OL}" stroke-width="2"/>`).join('')}<path d="M-14,-30 L14,-30" stroke="#8a6a3a" stroke-width="6"/>${k ? hitC(0, -60, 60) : ''}</g></g>`;
// pele de ovelha (velo)
function velo(x, y, k = 'velo', molhado = true) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act">${blob([[-70, 0, 30], [-36, -16, 34], [4, -20, 36], [44, -14, 32], [74, 2, 28], [36, 14, 34], [-20, 16, 34]], molhado ? '#efe4cc' : '#fffaf0', 3)}${molhado ? [-40, 0, 40, -20, 24].map((a, i) => `<circle cx="${a}" cy="${-10 + (i % 2) * 14}" r="4" fill="#7ab8e0"/>`).join('') : ''}${hitC(0, -4, 90)}</g></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Gideão e os 300',
  alt: 'De noite, Gideão levanta uma tocha acesa e toca uma trombeta. Ao lado dele, dois soldados seguram cântaros e tochas. Ao fundo, as tendas do acampamento inimigo.',
  cue: [400, 640],
  art() {
    let s = glowDefs() + sky('sky', [[0, '#141a3d'], [.55, '#2b3566'], [1, '#4a4a7a']], 1100);
    s += starField(9001, 50, 0, 0, 800, 600, { big: .12 }) + moon(150, 300, 32);
    s += hill([[-40, 760], [200, 730], [420, 750], [640, 724], [840, 744]], '#2f3d5a');
    s += tendaM(560, 780, .8) + tendaM(700, 790, .6) + tendaM(420, 790, .55);
    s += `<path d="M-40,820 C200,800 600,830 840,804 L840,1200 L-40,1200 Z" fill="#3f4a3a"/>`;
    s += `<circle cx="400" cy="660" r="200" fill="${UR('aglow')}" opacity=".5"/>`;
    s += sold(1, { x: 170, y: 1010, s: 1, face: 'determined', look: .6, armL: { a: 30, b: -20, item: cantaro() }, armR: { a: 150, b: -10, item: tocha() } });
    s += sold(2, { x: 640, y: 1010, s: 1, face: 'joy', look: -.6, armL: { a: 150, b: -10, item: tocha() }, armR: { a: 30, b: -20, item: cantaro() } });
    s += gid({ x: 400, y: 1040, s: 1.25, face: 'joy', look: 0, armL: { a: 160, b: -10, item: tocha() }, armR: { a: 140, b: 24 }, extra: `<g transform="translate(4,-205) scale(1.15)">${ITEM.shofar()}</g>`, k: 'gid' });
    return s;
  },
  setup(api) {
    api.tap(api.q('gid'), 'Gideão', () => { api.snd('trumpet'); api.burst(480, 700, 'note', 4); api.bubble(400, 640, 'Pelo Senhor!', { key: 'g' }); });
  }
});

/* =====================================================================
   1 — ESCONDIDO NO LAGAR
   ===================================================================== */
SCENES.push({
  key: 'lagar', title: 'Gideão escondido', ref: 'Juízes 6.1-11', tint: 'sand',
  text: [
    'O povo de Israel esqueceu-se de Deus. Então, os midianitas vinham todos os anos e levavam a comida toda.',
    'Gideão tinha medo deles. Por isso, malhava o trigo escondido num lagar, um buraco de pedra.'
  ],
  fact: 'Malhar o trigo é bater nas espigas para soltar os grãos.',
  hint: 'Toca no trigo e no Gideão.',
  alt: 'Gideão está agachado dentro de um buraco de pedra, a bater num molho de trigo com um pau. Espreita para os lados com medo.',
  cue: [470, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 160 });
    s += hill([[-40, 460], [200, 430], [420, 450], [640, 420], [840, 440]], '#a9b86a');
    s += olive(110, 520, .9) + olive(690, 500, .7);
    s += `<rect x="-40" y="520" width="900" height="400" fill="#c9b37a"/>`;
    s += gid({ x: 330, y: 700, s: .95, legs: 'kneel', face: 'worry', look: .8, armL: { a: 120, b: -60 }, armR: { a: 70, b: -40, item: `<g transform="rotate(-60)">${limb(0, 0, 0, -90, 7, '#8a5a33')}</g>` }, k: 'gid' });
    s += trigo(470, 700, 1.1, 'trigo');
    s += lagar(400, 690);
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('trigo'), 'Trigo', () => {
      api.snd('swish'); api.burst(470, 560, 'dust', 6, { col: '#e8c86a' });
      if (++n === 3) { api.bubble(470, 400, 'Já tenho grãos!', { key: 't' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('gid'), 'Gideão', () => { api.snd('shh'); api.shakeHead(api.q('gid')); api.bubble(330, 400, 'Shhh! Que ninguém me veja!', { key: 'g' }); });
  }
});

/* =====================================================================
   2 — HOMEM VALENTE
   ===================================================================== */
SCENES.push({
  key: 'anjo', title: 'Homem valente!', ref: 'Juízes 6.12-16', tint: 'gold',
  text: [
    'De repente, apareceu um anjo debaixo de uma árvore e disse:',
    { q: 'O Senhor está contigo, homem valente!', who: 'anjo' },
    'Gideão admirou-se: «Eu? Sou o mais pequeno da minha família!» Mas Deus disse: «Eu vou estar contigo.»'
  ],
  fact: 'Deus via em Gideão uma coragem que ele próprio ainda não via!',
  hint: 'Toca no anjo e no Gideão.',
  alt: 'Debaixo de um carvalho, um anjo brilhante sorri para Gideão. Gideão, surpreendido, aponta para si mesmo.',
  cue: [250, 420],
  art() {
    let s = glowDefs() + bgDay({ sunX: 660, sunY: 150 });
    s += hill([[-40, 480], [200, 450], [420, 470], [640, 440], [840, 460]], '#9cc36a');
    s += `<rect x="-40" y="540" width="900" height="400" fill="#b6c77a"/>`;
    s += olive(170, 560, 1.4);
    s += anjo({ x: 250, y: 720, s: 1, face: 'joy', look: .6, armL: { a: 30 }, armR: { a: 110, b: -20 }, k: 'anjo' });
    s += gid({ x: 560, y: 740, s: 1.02, face: 'surprise', look: -.6, armL: { a: 20 }, armR: { a: -20, b: -110 }, k: 'gid' });
    s += grassBand(9201, 720, 780, 10);
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); } };
    api.tap(api.q('anjo'), 'Anjo', () => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(250, 480, 'spark', 6, { col: '#ffe9a6' }); api.bubble(250, 360, 'O Senhor está contigo!', { key: 'a' }); ok('a'); });
    api.tap(api.q('gid'), 'Gideão', () => { api.snd('hm'); api.hop(api.q('gid')); api.bubble(560, 380, 'Eu? Valente?', { key: 'g' }); ok('g'); });
  }
});

/* =====================================================================
   3 — A PELE DE OVELHA
   ===================================================================== */
SCENES.push({
  key: 'velo', title: 'A pele de ovelha', ref: 'Juízes 6.36-38', tint: 'meadow',
  text: [
    'Gideão queria ter a certeza. Pôs uma pele de ovelha no chão e pediu:',
    '«Deus, se amanhã só a pele estiver molhada, e o chão seco, eu vou saber que estás comigo.»',
    'De manhã, a pele estava tão molhada que encheu uma taça de água!'
  ],
  fact: 'Na noite seguinte, Deus fez ao contrário: a pele ficou seca e o chão molhado!',
  hint: 'Toca na pele de ovelha para a espremer.',
  alt: 'De manhã cedo, Gideão está ajoelhado ao pé de uma pele de ovelha cheia de gotas de orvalho. Ao lado, uma taça.',
  cue: [400, 640],
  art() {
    let s = sky('sky', [[0, '#9fd0ee'], [.6, '#fde3c0'], [1, '#fdebd0']]) + sun(640, 260, 44);
    s += hill([[-40, 480], [200, 450], [420, 470], [640, 444], [840, 464]], '#b5c98a');
    s += `<rect x="-40" y="540" width="900" height="400" fill="#d6c48a"/>`;
    s += velo(400, 680);
    s += `<g transform="translate(580,700)"><path d="M-46,-20 Q-40,26 0,28 Q40,26 46,-20 Z" fill="#c9774a" stroke="${OL}" stroke-width="3"/><g data-k="agua" transform="scale(1,0)"><ellipse cx="0" cy="-16" rx="40" ry="8" fill="#7ab8e0"/></g><ellipse cx="0" cy="-20" rx="46" ry="9" fill="none" stroke="${OL}" stroke-width="3"/></g>`;
    s += gid({ x: 220, y: 720, s: .95, legs: 'kneel', face: 'joy', look: .7, armL: { a: 60, b: -40 }, armR: { a: 70, b: -40 }, k: 'gid' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('velo'), 'Pele de ovelha', () => {
      if (n >= 3) { api.snd('plip'); return; }
      n++;
      api.snd('pour'); api.burst(500, 660, 'ripple', 2);
      api.anim(api.q('agua'), [{ transform: `scale(1,${(n - 1) / 3})` }, { transform: `scale(1,${n / 3})` }], { duration: 500, fill: 'forwards' });
      if (n === 3) { api.later(() => { api.snd('tada'); api.bubble(400, 420, 'Uma taça cheia!', { key: 'v' }); }, 600); api.nudgeNext(3000); }
    });
    api.tap(api.q('gid'), 'Gideão', () => { api.snd('heart'); api.burst(220, 480, 'heart', 4); api.bubble(220, 380, 'Obrigado, Deus!', { key: 'g' }); });
  }
});

/* =====================================================================
   4 — SOLDADOS DEMAIS
   ===================================================================== */
SCENES.push({
  key: 'muitos', title: 'Soldados demais!', ref: 'Juízes 7.2-3', tint: 'sky',
  text: [
    'Juntaram-se trinta e dois mil soldados para ajudar Gideão.',
    'Mas Deus disse: «São demais! Senão vão pensar que ganharam sozinhos.»',
    '«Quem tiver medo pode voltar para casa.» E muitos foram embora!'
  ],
  fact: 'Ficaram só dez mil soldados. E Deus disse que ainda eram demais!',
  hint: 'Toca nos soldados com medo para irem para casa.',
  alt: 'Uma fila de soldados num monte. Alguns, com cara de medo, viram-se para voltar para casa.',
  cue: [160, 600],
  art() {
    let s = bgDay({ sunX: 660, sunY: 150 });
    s += hill([[-40, 440], [200, 400], [420, 430], [640, 396], [840, 420]], '#9cc36a');
    for (let i = 0; i < 16; i++) s += sold(i, { x: 60 + i * 46, y: 520 + (i % 2) * 8, s: .34, face: 'smile', look: 0, cls: '' });
    s += `<rect x="-40" y="560" width="900" height="400" fill="#b6c77a"/>`;
    const X = [120, 280, 440, 600, 720];
    const MEDO = [true, false, true, true, false];
    X.forEach((x, i) => s += `<g data-k="s${i}"><g data-k="s${i}in">${sold(i, { x, y: 760, s: .8, face: MEDO[i] ? 'scared' : 'determined', look: MEDO[i] ? -.6 : 0, armL: MEDO[i] ? { a: 150, b: -40 } : { a: 20 }, armR: MEDO[i] ? { a: 150, b: -40 } : { a: 20 } })}</g>${hitC(x, 640, 70)}</g>`);
    return s;
  },
  setup(api) {
    const MEDO = [0, 2, 3];
    const X = [120, 280, 440, 600, 720];
    let n = 0;
    for (let i = 0; i < 5; i++) api.tap(api.q('s' + i), 'Soldado', async () => {
      if (!MEDO.includes(i)) { api.snd('stomp'); api.hop(api.q('s' + i)); api.bubble(X[i], 480, 'Eu fico!', { key: 's' + i, size: 26 }); return; }
      if (api.st['s' + i]) return;
      api.st['s' + i] = true;
      api.snd('tiptoe'); api.bubble(X[i], 480, 'Vou para casa!', { key: 's' + i, size: 26 });
      await api.anim(api.q('s' + i + 'in'), [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: 'translate(-120px,40px)', opacity: 0 }], { duration: 1400, easing: 'ease-in', fill: 'forwards' });
      if (++n === 3) { api.snd('chime', 'G5'); api.nudgeNext(2400); }
    });
  }
});

/* =====================================================================
   5 — A ÁGUA DO RIO
   ===================================================================== */
SCENES.push({
  key: 'agua', title: 'A prova da água', ref: 'Juízes 7.4-7', tint: 'water',
  text: [
    'Deus mandou os soldados beber água no rio.',
    'Alguns ajoelharam-se e beberam com a boca na água. Outros levaram a água à boca com a mão, sempre atentos.',
    'Só trezentos beberam com a mão. E Deus disse: «Com estes trezentos vou salvar Israel!»'
  ],
  fact: 'Trezentos soldados contra um exército enorme! Só Deus podia dar a vitória.',
  hint: 'Toca nos soldados que bebem com a mão.',
  alt: 'Junto a um rio, uns soldados bebem de joelhos com a cara na água. Outros levam água à boca com a mão e olham em volta.',
  cue: [220, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 150 });
    s += hill([[-40, 440], [200, 410], [420, 430], [640, 400], [840, 420]], '#9cc36a');
    s += `<rect x="-40" y="460" width="900" height="200" fill="#a9c77a"/>`;
    s += `<rect x="-40" y="712" width="900" height="300" fill="#5aa3d2"/>` + waveBand(720, { fill: '#4f97c7', amp: 8, len: 160, dx: 30, d: 5, foam: '#d6eff9', fw: 4 });
    const mao = { a: 20, b: -150 };
    s += sold(0, { x: 200, y: 680, s: .8, face: 'determined', look: .6, armL: { a: 20 }, armR: mao, k: 'm0' });
    s += sold(1, { x: 420, y: 700, s: .76, legs: 'kneel', face: 'sleep', look: .8, armL: { a: 20, b: -20 }, armR: { a: 30, b: -20 } });
    s += sold(2, { x: 560, y: 690, s: .8, face: 'determined', look: -.4, armL: mao, armR: { a: 20 }, k: 'm1' });
    s += sold(3, { x: 700, y: 700, s: .76, legs: 'kneel', face: 'sleep', look: -.8, armL: { a: 30, b: -20 }, armR: { a: 20, b: -20 } });
    return s;
  },
  setup(api) {
    const X = [200, 560];
    const vistos = new Set();
    for (let i = 0; i < 2; i++) api.tap(api.q('m' + i), 'Soldado atento', () => {
      api.snd('gulp'); api.hop(api.q('m' + i));
      api.burst(X[i], 540, 'ripple', 2);
      api.bubble(X[i], 420, i ? 'Sempre atento!' : 'Eu fico com Gideão!', { key: 'm' + i, size: 26 });
      vistos.add(i); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.later(() => { api.snd('tada'); api.badge(400, 300, '300'); }, 1200); api.nudgeNext(3200); }
    });
  }
});

/* =====================================================================
   6 — TROMBETAS, CÂNTAROS E TOCHAS
   ===================================================================== */
SCENES.push({
  key: 'cantaros', title: 'Trombetas e cântaros', ref: 'Juízes 7.16-18', tint: 'dusk',
  text: [
    'Gideão deu a cada soldado uma trombeta, um cântaro vazio e uma tocha.',
    'A tocha ficava escondida dentro do cântaro, para ninguém ver a luz.',
    '«Façam o que eu fizer!», disse Gideão.'
  ],
  fact: 'Não levaram espadas na mão: só trombetas, cântaros e tochas!',
  hint: 'Toca no cântaro para espreitar lá dentro.',
  alt: 'Ao fim da tarde, Gideão mostra aos soldados um cântaro de barro com uma tocha acesa escondida lá dentro.',
  cue: [400, 520],
  art() {
    let s = sky('sky', [[0, '#3a4a8a'], [.5, '#c27a8a'], [1, '#f2b880']]) + sun(640, 470, 46);
    s += hill([[-40, 480], [200, 450], [420, 470], [640, 444], [840, 464]], '#6a7a5a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#8a8a5a"/>`;
    s += sold(0, { x: 120, y: 760, s: .8, face: 'surprise', look: .6, armL: { a: 20 }, armR: { a: 40, b: -20, item: cantaro() } });
    s += sold(3, { x: 680, y: 760, s: .8, face: 'smile', look: -.6, armL: { a: 40, b: -20, item: cantaro('#b8683e') }, armR: { a: 20 } });
    s += gid({ x: 300, y: 770, s: 1, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 80, b: -20 }, k: 'gid' });
    s += rock(520, 650, 200, 70);
    s += `<g transform="translate(470,556)" data-k="jarro"><g class="act"><g data-k="tocha" transform="translate(0,4) scale(.65)">${tocha()}</g><g data-k="tampa">${cantaro()}</g>${hitC(0, -10, 70)}</g></g>`;
    s += `<g transform="translate(530,578)" data-k="tromb"><g class="act"><g transform="scale(1.1)">${ITEM.shofar()}</g>${hitC(36, -20, 50)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jarro'), 'Cântaro', async () => {
      api.snd('plip');
      await api.anim(api.q('tampa'), [{ transform: 'translateY(0px)' }, { transform: 'translateY(-80px)' }, { transform: 'translateY(-80px)' }, { transform: 'translateY(0px)' }], { duration: 2000, easing: 'ease-in-out' });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(1500); }
    });
    api.tap(api.q('tromb'), 'Trombeta', () => { api.snd('trumpet'); api.burst(620, 560, 'note', 3); });
    api.tap(api.q('gid'), 'Gideão', () => { api.snd('hello'); api.bubble(300, 430, 'Façam como eu!', { key: 'g' }); });
  }
});

/* =====================================================================
   7 — A NOITE DAS LUZES
   ===================================================================== */
SCENES.push({
  key: 'noite', title: 'Pelo Senhor e por Gideão!', ref: 'Juízes 7.19-20', tint: 'night',
  text: [
    'De noite, os trezentos rodearam o acampamento dos midianitas.',
    'Ao sinal de Gideão, tocaram as trombetas e partiram os cântaros. As tochas brilharam no escuro!',
    'E gritaram: «Pelo Senhor e por Gideão!»'
  ],
  fact: 'No meio da noite, parecia que havia luzes e trombetas por todo o lado!',
  hint: 'Toca nos cântaros para os partir.',
  alt: 'De noite, no alto de um monte, soldados partem cântaros e levantam tochas acesas. Lá em baixo, as tendas do acampamento.',
  cue: [160, 560],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.6, '#262f6c'], [1, '#3a4889']]);
    s += starField(9701, 40, 0, 0, 800, 300, { big: .1 }) + moon(660, 120, 26);
    s += tendaM(500, 470, .7) + tendaM(650, 480, .55) + tendaM(330, 480, .5);
    s += `<path d="M-40,520 C200,490 600,520 840,494 L840,900 L-40,900 Z" fill="#2f3d4a"/>`;
    const X = [140, 330, 520, 690];
    X.forEach((x, i) => {
      s += sold(i, { x, y: 770, s: .78, face: 'determined', look: 0, armL: { a: 150, b: -10, item: `<g data-k="t${i}" opacity="0">${tocha()}</g>` }, armR: { a: 140, b: 24 }, extra: `<g transform="translate(4,-205) scale(1.15)">${ITEM.shofar()}</g>` });
      s += `<g transform="translate(${x - 40},790)" data-k="c${i}"><g class="act"><g data-k="c${i}in">${cantaro()}</g><g data-k="c${i}cc" opacity="0">${cacos()}</g>${hitC(0, -14, 50)}</g></g>`;
    });
    return s;
  },
  setup(api) {
    const X = [140, 330, 520, 690];
    let n = 0;
    for (let i = 0; i < 4; i++) api.tap(api.q('c' + i), 'Cântaro', () => {
      if (api.st['c' + i]) { api.snd('trumpet'); api.burst(X[i] + 60, 560, 'note', 2); return; }
      api.st['c' + i] = true;
      api.snd('crunch'); api.burst(X[i] - 40, 770, 'dust', 5, { col: '#c9774a' });
      api.q('c' + i + 'in').setAttribute('opacity', '0');
      api.q('c' + i + 'cc').setAttribute('opacity', '1');
      api.anim(api.q('t' + i), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.later(() => { api.snd('trumpet'); api.burst(X[i] + 60, 560, 'note', 3); }, 300);
      if (++n === 4) { api.later(() => { api.snd('crowd'); api.bubble(400, 330, 'Pelo Senhor e por Gideão!', { key: 'g' }); }, 900); api.nudgeNext(3200); }
    });
  }
});

/* =====================================================================
   8 — FUGIRAM!
   ===================================================================== */
SCENES.push({
  key: 'fuga', title: 'Os inimigos fugiram!', ref: 'Juízes 7.21-22', tint: 'gold',
  text: [
    'Os midianitas acordaram assustados com o barulho e as luzes.',
    'Ficaram tão confusos que fugiram todos, com os camelos e tudo!',
    'Deus deu a vitória a Gideão e aos seus trezentos.'
  ],
  fact: 'Gideão tinha medo, mas confiou em Deus. E Deus fez dele um homem valente!',
  hint: 'Toca nos camelos e nos soldados.',
  alt: 'De manhã, as tendas estão vazias e os camelos fogem a correr. Gideão e os soldados levantam os braços de alegria.',
  cue: [600, 560],
  art() {
    let s = bgDay({ sunX: 400, sunY: 150 });
    s += hill([[-40, 440], [200, 410], [420, 430], [640, 400], [840, 420]], '#c9b37a');
    s += tendaM(560, 520, .7) + tendaM(720, 530, .55);
    s += `<rect x="-40" y="540" width="900" height="400" fill="#d6c48a"/>`;
    s += camel({ x: 560, y: 680, s: .7, k: 'cam0' }) + camel({ x: 720, y: 640, s: .55, k: 'cam1' });
    s += gid({ x: 230, y: 770, s: 1, face: 'laugh', look: .4, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 }, k: 'gid' });
    s += sold(1, { x: 90, y: 760, s: .8, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 30 }, k: 's0' });
    s += sold(2, { x: 370, y: 760, s: .8, face: 'joy', look: .3, armL: { a: 30 }, armR: { a: 150, b: -20, item: tocha() }, k: 's1' });
    return s;
  },
  setup(api) {
    let n = 0;
    for (let i = 0; i < 2; i++) api.tap(api.q('cam' + i), 'Camelo', async () => {
      if (api.st['cam' + i]) return;
      api.st['cam' + i] = true;
      api.snd('gallop');
      await api.anim(api.act(api.q('cam' + i)), [{ transform: 'translateX(0px)' }, { transform: 'translateX(500px)' }], { duration: 1400, easing: 'ease-in', fill: 'forwards' });
      if (++n === 2) { api.snd('tada'); api.nudgeNext(2600); }
    });
    api.tap(api.q('gid'), 'Gideão', () => { api.snd('victory'); api.hop(api.q('gid')); api.burst(230, 460, 'confetti', 8); api.bubble(230, 380, 'Foi Deus que nos ajudou!', { key: 'g' }); });
    for (let i = 0; i < 2; i++) api.tap(api.q('s' + i), 'Soldado', () => { api.snd('laugh'); api.hop(api.q('s' + i)); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite calma e estrelada. Há cacos de cântaro no chão, e uma ovelhinha dorme na erva.',
  cue: [430, 160],
  questions: [
    ['Onde se escondia Gideão para malhar o trigo?', 'Num lagar, um buraco de pedra.'],
    ['O que lhe chamou o anjo?', 'Homem valente!'],
    ['Quantos soldados ficaram com Gideão?', 'Trezentos.'],
    ['O que levavam os soldados nas mãos?', 'Trombetas, cântaros e tochas.'],
    ['Quem deu a vitória a Gideão?', 'Deus!']
  ],
  verse: ['O Senhor está contigo, homem valente!', 'Juízes 6.12'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(9901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#2f3d5a');
    s += `<path d="M-40,640 C200,616 500,630 840,608 L840,900 L-40,900 Z" fill="#3a4a3a"/>`;
    s += `<g transform="translate(560,730)">${cacos()}</g>`;
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
  id: 'gideao',
  title: 'Gideão e os 300',
  cover: { kicker: 'Uma história da Bíblia', title: 'Gideão', small: 'e os 300', sub: 'O Senhor está contigo!' },
  color: '#7a5a2a',
  ref: 'Juízes 6–7',
  scenes: SCENES
});
})();
