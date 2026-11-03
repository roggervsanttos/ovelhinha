/* =====================================================================
   LIVRO: ABRAÃO E AS ESTRELAS  (Gênesis 12 a 21)
   ===================================================================== */
(() => {
const SCENES = [];
const ABRAAO = { kind: 'adult', skin: '#c98a5a', hair: '#dcd7cf', hairStyle: 'short', beard: 'long', beardCol: '#eeeae3', browCol: '#eeeae3', head: 'cloth', clothCol: '#f4efe6', bandCol: '#3d3478', tunic: '#9a4a3a', stripes: '#e2b07a', cloak: '#e9dcc0', cloakTrim: '#c9a54e', belt: '#f2c14e' };
const SARA = { kind: 'adult', skin: '#e2a878', hairStyle: 'long', hair: '#d8d2c8', head: 'scarf', clothCol: '#7b5aa6', tunic: '#e8a0b8', trim: '#c0507a', belt: '#c0507a', longSleeves: true };
const VISITAS = [
  { kind: 'adult', skin: '#d9a07a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#ffffff', bandCol: '#f2c14e', tunic: '#fbf6ea', trim: '#f2c14e', belt: '#f2c14e', longSleeves: true },
  { kind: 'adult', skin: '#c98a5a', hair: '#1f1612', beard: 'long', beardCol: '#1f1612', head: 'cloth', clothCol: '#f4efe6', bandCol: '#c9a54e', tunic: '#f4efe6', cloak: '#e9dcc0', belt: '#c9a54e', longSleeves: true },
  { kind: 'adult', skin: '#b9784c', hair: '#2b1d17', beard: 'bushy', beardCol: '#2b1d17', head: 'cloth', clothCol: '#fffaf0', bandCol: '#8fb3d6', tunic: '#fffaf0', trim: '#8fb3d6', belt: '#8fb3d6', longSleeves: true }
];
const CRIANCAS = [
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a3a', belt: '#7b4a2a' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'long', hair: '#3a2520', tunic: '#3f93c7', belt: '#f2c14e' }
];
const SERVA = { kind: 'adult', skin: '#b9784c', head: 'scarf', clothCol: '#e9c46a', hairStyle: 'long', hair: '#2b1d17', tunic: '#2f8a83', belt: '#e9c46a' };
const ISAQUE = { kind: 'child', skin: '#e2a878', hairStyle: 'curly', hair: '#3a2520', hi: '#6a3a24', tunic: '#f2c14e', stripes: '#e5483f', belt: '#7b4a2a' };
const abraao = o => person(Object.assign({}, ABRAAO, o));
const sara = o => person(Object.assign({}, SARA, o));
const NUM = [N('Uma'), N('Duas'), N('Três'), N('Quatro'), N('Cinco'), N('Seis'), N('Sete'), N('Oito'), N('Nove'), N('Dez')];

/* ---------- peças desta história ---------- */
function nightSky(seed = 1301, n = 50, h = 440) {
  return sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.85, '#3a4889'], [1, '#4a5896']]) + starField(seed, n, 0, 0, 800, h, { big: .1 });
}
function dunes(y = 470) {
  return hill([[-40, y], [180, y - 30], [400, y - 4], [620, y - 34], [840, y - 14]], '#e8cf98') + hill([[-40, y + 60], [240, y + 36], [480, y + 54], [720, y + 30], [840, y + 42]], '#dcbf84');
}
function mat(x, y, w = 240, col = '#b8312f') {
  return `<g transform="translate(${x},${y})"><path d="M${-w / 2},0 L${w / 2},0 L${w / 2 + 24},44 L${-w / 2 - 24},44 Z" fill="${col}" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M${-w / 2 + 4},12 L${w / 2 + 6},12 M${-w / 2 - 6},32 L${w / 2 + 16},32" stroke="#f2c14e" stroke-width="4"/></g>`;
}
function oak(x, y, s = 1) {
  return olive(x, y, s, { leaf: '#7fae4a', dark: '#4f7d2a', hi: '#a3c86a' });
}
function bread(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="15" fill="#d99a4a" stroke="${OL}" stroke-width="3"/><path d="M-12,-8 q4,6 0,12 M0,-10 q4,6 0,14 M12,-8 q4,6 0,12" stroke="#a86a2a" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`;
}
function jug(x, y, s = 1, col = '#c8643c') {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-12,-52 L12,-52 L10,-40 C26,-32 28,-10 18,0 L-18,0 C-28,-10 -26,-32 -10,-40 Z" fill="${col}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-14,-24 L14,-24" stroke="#f2e3c1" stroke-width="4"/><path d="M18,-38 C32,-38 32,-18 22,-14" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M18,-38 C32,-38 32,-18 22,-14" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
}
function bowl(x, y, s = 1, fill = '#fffaf0') {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-10" rx="24" ry="7" fill="${fill}" stroke="${OL}" stroke-width="2.6"/><path d="M-24,-10 C-22,6 22,6 24,-10" fill="#9a6b3e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/></g>`;
}
function grapes(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">${blob([[-8, -8, 7], [6, -8, 7], [-1, 2, 7], [-12, 4, 6], [10, 4, 6], [-1, 12, 6]], '#8a5fc2', 2.2)}<path d="M0,-14 q2,-8 8,-10" stroke="#5f9a3a" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
}
// o bebê Isaque enroladinho
function bebe(x, y, s = 1, k = '', face = 'sleep') {
  const eyes = face === 'sleep' ? `<path d="M-36,-26 q3,3 6,0 M-27,-26 q3,3 6,0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` : `<circle cx="-33" cy="-27" r="2.6" fill="${OL}"/><circle cx="-24" cy="-27" r="2.6" fill="${OL}"/>`;
  const mouth = face === 'sleep' ? `<path d="M-32,-19 q3,2 6,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>` : `<path d="M-34,-20 q5,7 10,0 Z" fill="#8c2f39" stroke="${OL}" stroke-width="2"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><path d="M-44,-6 C-44,-30 -20,-36 0,-36 C30,-36 48,-26 48,-8 C48,8 30,12 0,12 C-26,12 -44,8 -44,-6 Z" fill="#cfe3f5" stroke="${OL}" stroke-width="3.2"/><path d="M-20,-30 C-8,-10 10,-6 30,-14 M-30,-4 C-10,6 18,4 40,-4" stroke="#a9c8e6" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-26" r="17" fill="#f0c49c" stroke="${OL}" stroke-width="3"/><path d="M-40,-36 C-36,-46 -22,-46 -18,-38" stroke="#3a2520" stroke-width="4" fill="none" stroke-linecap="round"/>${eyes}${mouth}<ellipse cx="-40" cy="-21" rx="4.5" ry="3" fill="#ef7d78" opacity=".5"/>${k ? hitC(0, -14, 54) : ''}</g></g>`;
}
// silhuetas da grande família (para a cena das estrelas)
function silhouettes(seed, y, s, n, cols) {
  const R = rng(seed);
  let g = '';
  for (let i = 0; i < n; i++) {
    const x = 20 + (i + .2 + R() * .6) * (760 / n), kid = R() < .35, h = (kid ? 70 : 104) * (.9 + R() * .2), col = cols[i % cols.length];
    g += `<g transform="translate(${r1(x)},${y}) scale(${s})"><path d="M${kid ? -17 : -24},0 C${kid ? -17 : -24},${-h * .62} ${kid ? -12 : -18},${-h * .74} 0,${-h * .74} C${kid ? 12 : 18},${-h * .74} ${kid ? 17 : 24},${-h * .62} ${kid ? 17 : 24},0 Z" fill="${col}" stroke="#141c36" stroke-width="2.4"/><circle cx="0" cy="${r1(-h * .86)}" r="${kid ? 13 : 16}" fill="#8a6a5a" stroke="#141c36" stroke-width="2.4"/></g>`;
  }
  return g;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
const CAPA_ESTRELAS = [[120, 420], [300, 380], [520, 430], [690, 390], [420, 560]];
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Abraão e as Estrelas',
  alt: 'Noite cheia de estrelas no deserto. O velhinho Abraão aponta para o céu, Sara sorri ao lado dele, e uma ovelhinha dorme perto da tenda.',
  cue: [520, 430],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.5, '#262f6c'], [.75, '#3a4889'], [1, '#3a4889']], 1100);
    s += starField(1201, 130, 0, 0, 800, 780, { big: .14 });
    CAPA_ESTRELAS.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="e${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(18)}" fill="#ffe9a6"/><circle r="5" fill="#fff"/></g>${hitC(0, 0, 40)}</g></g>`);
    s += hill([[-40, 870], [200, 842], [420, 862], [640, 830], [840, 850]], '#2a3f66') + hill([[-40, 940], [240, 916], [480, 930], [720, 908], [840, 920]], '#2c584f');
    s += tent(640, 950, 230, 190, { fill: '#c9b089', stripe: '#8e3b2f' });
    s += campfire(540, 1018, .5);
    s += sara({ x: 190, y: 1056, s: 1, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 40, b: 30 }, k: 'sara' });
    s += abraao({ x: 330, y: 1052, s: 1.1, face: 'joy', look: .3, armL: { a: 14, item: ITEM.staff(220, -1) }, armR: { a: 156, b: -8 }, k: 'abraao' });
    s += sheep({ x: 680, y: 1062, s: .72, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
    return s;
  },
  setup(api) {
    CAPA_ESTRELAS.forEach(([x, y], i) => api.tap(api.q('e' + i), 'Estrela', () => {
      api.snd('chime', ['C6', 'E6', 'G6', 'A6', 'D6'][i]);
      api.anim(api.act(api.q('e' + i)), [{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      api.burst(x, y, 'spark', 7, { col: '#ffe9a6' });
    }));
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('hello'); api.bubble(330, 790, 'Quantas estrelas!', { key: 'a' }); });
    api.tap(api.q('sara'), 'Sara', () => { api.snd('laugh'); api.bubble(190, 820, 'Que lindo!', { key: 's' }); });
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(700, 960, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

/* =====================================================================
   1 — DEUS FALA COM ABRAÃO
   ===================================================================== */
SCENES.push({
  key: 'chamado', title: 'Deus fala com Abraão', ref: 'Gênesis 12.1-3', tint: 'sky',
  text: [
    'Abraão morava numa cidade chamada Harã. Um dia, Deus falou com ele:',
    { q: 'Sai da tua terra e vai para o lugar que eu te vou mostrar. Eu vou abençoar-te!', who: 'deus' }
  ],
  fact: 'No princípio, o nome dele era Abrão. Depois, Deus mudou-o para Abraão, que quer dizer «pai de muita gente».',
  hint: 'Toca na luz do céu e no Abraão.',
  alt: 'Perto da cidade de Harã, uma luz forte desce do céu. Abraão, velhinho de barba branca, levanta a mão e escuta. Sara olha surpresa, ao lado de uma ovelha.',
  cue: [200, 120],
  art() {
    let s = bgDay({ sunX: 690, sunY: 140, sunR: 38 });
    s += hill([[-40, 470], [200, 440], [420, 462], [640, 432], [840, 452]], '#bcd38a');
    s += town(470, 392, 1.2);
    s += `<rect x="-40" y="520" width="900" height="400" fill="#d9c79a"/><path d="M-40,520 L840,520" stroke="#c4b081" stroke-width="4"/>`;
    s += glory(200, 30, 250, 'luz', { rays: [-14, 4, 22, 40] });
    s += abraao({ x: 380, y: 744, s: 1.08, face: 'surprise', look: -.5, armL: { a: 150, b: -20 }, armR: { a: 14, item: ITEM.staff(220, -1) }, k: 'abraao' });
    s += sara({ x: 560, y: 752, s: .98, face: 'o', look: -.6, armL: { a: 40, b: 40 }, armR: { a: 20 }, k: 'sara' });
    s += sheep({ x: 690, y: 784, s: .8, k: 'ove' });
    s += grassBand(1101, 760, 820, 8, ['#a8a85a']);
    return s;
  },
  setup(api) {
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('choir', ['C4', 'G4', 'C5']); api.burst(220, 140, 'spark', 10, { col: '#fff1b0' }); api.bubble(250, 230, 'Abraão, vai! Eu vou cuidar de ti!', { key: 'd', dur: 2600 }); });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('hello'); api.hop(api.q('abraao'), 10); api.bubble(380, 470, 'Sim, Senhor! Eu vou!', { key: 'a' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('sara'), 'Sara', () => { api.snd('hm'); api.bubble(560, 490, 'Para onde vamos?', { key: 's' }); });
    api.tap(api.q('ove'), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q('ove'), 10); });
  }
});

/* =====================================================================
   2 — A GRANDE VIAGEM
   ===================================================================== */
SCENES.push({
  key: 'viagem', title: 'A grande viagem', ref: 'Gênesis 12.4-5', tint: 'sand',
  text: [
    'Abraão confiou em Deus. Arrumou tudo e partiu com Sara, a sua mulher.',
    'Lá foram eles: camelos, ovelhas, cabras e muita gente! Não sabiam o caminho. Mas Deus sabia!'
  ],
  fact: 'Abraão tinha 75 anos quando partiu nesta viagem!',
  hint: 'Toca nos animais e no Abraão.',
  alt: 'No deserto, uma caravana segue pela estrada: duas ovelhas, uma cabra, um camelo com sela, Sara e, à frente, Abraão com o cajado.',
  cue: [420, 560],
  art() {
    let s = bgDay({ sky: [[0, '#8fd0f2'], [.5, '#e6eef0'], [.62, '#f3e6c8'], [1, '#f3e6c8']], sunX: 120, sunY: 130, sunR: 40 });
    s += dunes(470);
    s += palm(730, 520, .7);
    s += `<rect x="-40" y="560" width="900" height="360" fill="#e2c88e"/><path d="M-40,628 C200,600 600,650 840,610 L840,690 C600,730 200,682 -40,710 Z" fill="#cfae74" opacity=".7"/>`;
    s += sheep({ x: 70, y: 718, s: .62, k: 'o0' }) + sheep({ x: 150, y: 736, s: .66, k: 'o1' });
    s += goat({ x: 232, y: 704, s: .62, k: 'cabra' });
    s += camel({ x: 362, y: 690, s: .86, saddle: '#3d3478', k: 'camelo' });
    s += sara({ x: 550, y: 716, s: .96, legs: 'walk', face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 30, b: 20 }, k: 'sara' });
    s += abraao({ x: 690, y: 712, s: 1.04, legs: 'walk', face: 'joy', look: .6, armL: { a: 14, item: ITEM.staff(220, -1) }, armR: { a: 60, b: -20 }, k: 'abraao' });
    return s;
  },
  setup(api) {
    for (const k of ['o0', 'o1']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q(k), 10); });
    api.tap(api.q('cabra'), 'Cabra', () => { api.snd('bleat', 1.3); api.hop(api.q('cabra'), 12); api.bubble(254, 590, 'Méééé!', { key: 'c', size: 30, plain: true, dur: 1000 }); });
    api.tap(api.q('camelo'), 'Camelo', () => { api.snd('grunt'); api.hop(api.q('camelo'), 6); api.bubble(470, 460, 'Rrrronc!', { key: 'm', size: 30, plain: true, dur: 1100 }); });
    api.tap(api.q('sara'), 'Sara', () => { api.snd('hello'); api.bubble(550, 460, 'Vamos juntos!', { key: 's' }); });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('tada'); api.hop(api.q('abraao'), 10); api.bubble(690, 440, 'Deus vai mostrar-nos o caminho!', { key: 'a' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
  }
});

/* =====================================================================
   3 — SEM FILHOS
   ===================================================================== */
SCENES.push({
  key: 'semfilhos', title: 'Um sonho grande', ref: 'Gênesis 15.1-3', tint: 'dusk',
  text: [
    'Abraão e Sara viviam em tendas. Tinham muitas ovelhas e muitos camelos.',
    'Mas uma coisa deixava-os tristes: não tinham filhos. E já estavam muito velhinhos.'
  ],
  fact: 'Naquele tempo, toda a gente sonhava ter uma família muito grande.',
  hint: 'Toca na Sara, no Abraão e nas crianças.',
  alt: 'Ao pôr do sol, Abraão e Sara estão sentados num tapete em frente da tenda, com ar de saudade. Mais longe, duas crianças brincam com um carneirinho.',
  cue: [600, 640],
  art() {
    let s = sky('sky', [[0, '#f6a46a'], [.5, '#fde2b8'], [1, '#fdf0e2']]);
    s += sun(640, 330, 44, { face: true, fill: '#ffb347', fill2: '#ffc56a' });
    s += hill([[-40, 470], [200, 446], [420, 466], [640, 440], [840, 458]], '#d9b77a');
    s += tent(560, 470, 150, 120, { fill: '#e2c497', stripe: '#5e7d4a' }) + tent(720, 480, 130, 104, { fill: '#e7d2b0', stripe: '#8e3b2f' });
    s += `<rect x="-40" y="500" width="900" height="400" fill="#e2c88e"/>`;
    s += tent(210, 640, 340, 300, { fill: '#e7d2b0', stripe: '#3d3478' });
    s += mat(230, 690, 250);
    s += abraao({ x: 160, y: 716, s: .96, legs: 'sit', drop: 30, hemY: -62, face: 'sad', look: .5, armL: { a: 30, b: 40 }, armR: { a: 40, b: 50 }, k: 'abraao' });
    s += sara({ x: 300, y: 720, s: .92, legs: 'sit', drop: 30, hemY: -62, face: 'sad', look: .5, armL: { a: 40, b: 50 }, armR: { a: 30, b: 40 }, k: 'sara' });
    s += `<g data-k="criancas"><g class="act">${person(Object.assign({}, CRIANCAS[0], { x: 540, y: 770, s: .82, legs: 'run', face: 'laugh', look: .5, armL: { a: 60, b: 10 }, armR: { a: 130, b: -20 } }))}${sheep({ x: 640, y: 790, s: .5, wool: '#fffaf0' })}${person(Object.assign({}, CRIANCAS[1], { x: 720, y: 776, s: .8, legs: 'hop', face: 'laugh', look: -.5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } }))}${hitC(630, 700, 140)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('sara'), 'Sara', () => { api.snd('hm'); api.bubble(300, 500, 'Como eu queria um bebé...', { key: 's' }); });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('hm'); api.bubble(160, 480, 'Deus prometeu... Vamos esperar!', { key: 'a' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('criancas'), 'Crianças a brincar', () => { api.snd('laugh'); api.hop(api.q('criancas'), 12); api.burst(630, 620, 'heart', 4); });
  }
});

/* =====================================================================
   4 — CONTE AS ESTRELAS
   ===================================================================== */
const DEZ = [[150, 160], [300, 116], [470, 150], [640, 124], [720, 250], [560, 264], [380, 250], [210, 290], [90, 360], [470, 360]];
SCENES.push({
  key: 'estrelas', title: 'Conta as estrelas!', ref: 'Gênesis 15.5-6', tint: 'night',
  text: [
    'Uma noite, Deus levou Abraão para fora da tenda e disse:',
    { q: 'Olha para o céu e conta as estrelas, se conseguires! Assim vai ser a tua família!', who: 'deus' },
    'E Abraão acreditou em Deus.'
  ],
  fact: 'Numa noite muito escura, sem luzes da cidade, conseguem ver-se mais de duas mil estrelas!',
  hint: 'Toca no céu para contares as estrelas.',
  alt: 'Noite no deserto. Abraão está fora da tenda, a olhar para o céu e a apontar. A cada toque, aparece uma estrela nova, até o céu ficar cheio delas.',
  cue: [470, 240],
  art() {
    let s = nightSky(1401, 26, 380);
    s += `<rect class="hit" data-k="ceu" x="-40" y="-40" width="900" height="460" fill="#000" fill-opacity="0"/>`;
    s += `<g style="pointer-events:none">`;
    DEZ.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})"><g data-k="s${i}" opacity="0"><g class="twinkle" style="--d:${(2.2 + i % 4 * .5).toFixed(1)}s;${dl(4)}"><path d="${sparkle(22)}" fill="#ffe9a6"/><circle r="6" fill="#fff"/></g></g></g>`);
    s += `<g data-k="muitas" opacity="0">${starField(1402, 150, 0, 0, 800, 470, { big: .2 })}</g></g>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 520], [840, 540]], '#22385c') + hill([[-40, 640], [240, 616], [480, 630], [720, 606], [840, 618]], '#2c584f');
    s += `<rect x="-40" y="680" width="900" height="240" fill="#2c4a46"/>`;
    s += tent(630, 690, 260, 220, { fill: '#a8946f', stripe: '#6a2e26' });
    s += abraao({ x: 330, y: 760, s: 1.12, face: 'joy', look: .2, armL: { a: 14, item: ITEM.staff(220, -1) }, armR: { a: 156, b: -8 }, k: 'abraao' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('ceu'), 'Céu da noite', async () => {
      if (n >= DEZ.length) { api.snd('twinkle'); api.burst(400, 200, 'star', 8); return; }
      const [x, y] = DEZ[n];
      api.snd('chime', ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6'][n]);
      api.anim(api.q('s' + n), [{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1.3)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 500, fill: 'forwards' });
      api.bubble(x, y + 64, NUM[n] + '!', { key: 'n', size: 30, plain: true, dur: 900 });
      n++;
      if (n === DEZ.length) {
        await api.wait(900);
        api.snd('choir', ['C4', 'G4', 'C5', 'E5']);
        api.anim(api.q('muitas'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1400, fill: 'forwards' });
        api.burst(400, 220, 'star', 14);
        api.bubble(400, 420, 'Não se conseguem contar! São muitas!', { key: 'a', dur: 2600 });
        api.later(() => api.bubble(400, 150, 'Assim vai ser a tua família!', { key: 'd', dur: 2800 }), 2700);
        api.nudgeNext(5600);
      }
    });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('hello'); api.bubble(330, 480, n ? 'Quantas estrelas!' : 'Vou contar!', { key: 'a' }); });
  }
});

/* =====================================================================
   5 — TRÊS VISITANTES
   ===================================================================== */
SCENES.push({
  key: 'visitas', title: 'Três visitantes', ref: 'Gênesis 18.1-8', tint: 'gold',
  text: [
    'Num dia muito quente, Abraão viu chegar três visitantes.',
    'Correu para os receber:',
    { q: 'Fiquem um bocadinho! Vou trazer-vos água e comida!', who: 'abraao' }
  ],
  fact: 'Abraão recebia as visitas com muito carinho. Lavava-lhes os pés e preparava-lhes comida!',
  hint: 'Toca no Abraão, nos visitantes e no sol.',
  alt: 'Dia de muito sol, perto de uma árvore grande. Abraão sai a correr da tenda para receber três visitantes vestidos de branco. Uma jarra, pão e fruta aparecem num tapete.',
  cue: [330, 520],
  art() {
    let s = bgDay({ sky: [[0, '#7cc6f0'], [.6, '#d9f0fa'], [1, '#fdf3dc']], sunX: 420, sunY: 110, sunR: 54, clouds: false });
    s += hill([[-40, 470], [200, 450], [420, 466], [640, 440], [840, 458]], '#c9d98a');
    s += `<rect x="-40" y="500" width="900" height="400" fill="#e6d29c"/>`;
    s += oak(640, 560, 1.6);
    s += tent(170, 660, 300, 270, { fill: '#e7d2b0', stripe: '#3d3478' });
    s += `<g data-k="comida" opacity="0" style="pointer-events:none">${mat(420, 726, 150, '#3d3478')}${jug(370, 754, .8)}${bread(430, 750, .9)}${grapes(480, 750, 1)}</g>`;
    s += abraao({ x: 320, y: 752, s: 1.04, legs: 'run', face: 'joy', look: .6, armL: { a: 60, b: 10 }, armR: { a: 120, b: -30 }, k: 'abraao' });
    VISITAS.forEach((v, i) => s += person(Object.assign({}, v, { x: 560 + i * 92, y: 744 + (i % 2) * 10, s: .96, face: 'smile', look: -.5, armL: { a: 14, item: i === 1 ? ITEM.staff(220, -1) : '' }, armR: { a: i === 0 ? 70 : 20, b: i === 0 ? -20 : 0 }, k: 'v' + i })));
    return s;
  },
  setup(api) {
    api.tap(api.q('abraao'), 'Abraão', async () => {
      api.snd('hello');
      api.bubble(320, 470, 'Bem-vindos! Fiquem aqui!', { key: 'a' });
      if (api.st.ok) return;
      api.st.ok = true;
      await api.wait(900);
      api.snd('pour');
      api.anim(api.q('comida'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 600, fill: 'forwards' });
      api.burst(420, 700, 'spark', 8);
      api.nudgeNext(2400);
    });
    VISITAS.forEach((_, i) => api.tap(api.q('v' + i), 'Visitante', () => { const [x, y, sc] = api.pos(api.q('v' + i)); api.snd('hello'); api.bubble(x, y - 260 * sc, 'A paz esteja contigo!', { key: 'v', size: 26 }); }));
    api.tap(api.q('sun'), 'Sol', () => { api.snd('boing'); api.bubble(420, 230, 'Que calor!', { key: 'sol', size: 32, plain: true, dur: 1200 }); });
  }
});

/* =====================================================================
   6 — SARA DÁ RISADA
   ===================================================================== */
SCENES.push({
  key: 'risada', title: 'Sara ri-se', ref: 'Gênesis 18.9-15', tint: 'meadow',
  text: [
    'Enquanto os visitantes comiam, Deus disse:',
    { q: 'Daqui a um ano, Sara vai ter um filho!', who: 'deus' },
    'Sara ouviu e riu-se baixinho: «Eu? Tão velhinha?» Mas Deus disse:',
    { q: 'Existe alguma coisa difícil demais para Deus?', who: 'deus' }
  ],
  fact: 'Sara tinha 90 anos, e Abraão, quase 100!',
  hint: 'Toca na tenda e nos visitantes.',
  alt: 'Debaixo da árvore grande, os três visitantes comem sentados num tapete, e Abraão está de pé perto deles. Da porta da tenda, Sara espreita e ri-se com a mão na boca.',
  cue: [190, 560],
  art() {
    let s = bgDay({ sunX: 690, sunY: 120, sunR: 42 });
    s += hill([[-40, 470], [200, 450], [420, 466], [640, 440], [840, 458]], '#c9d98a');
    s += `<rect x="-40" y="500" width="900" height="400" fill="#e6d29c"/>`;
    s += oak(600, 560, 1.6);
    s += `<g data-k="tenda"><g class="act">${tent(170, 690, 320, 300, { fill: '#e7d2b0', stripe: '#3d3478' })}<path d="M112,690 C112,566 146,520 170,520 C194,520 228,566 228,690 Z" fill="#4a3226" stroke="${OL}" stroke-width="3"/><g data-k="sara" opacity="0">${sara({ x: 170, y: 690, s: .66, face: 'laugh', look: .7, armL: { a: -20, b: -110 }, armR: { a: 14 } })}</g><path d="M112,690 C112,566 146,520 170,520 C150,560 136,620 130,690 Z" fill="#d9bf94" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>${hitC(170, 560, 140)}</g></g>`;
    s += mat(600, 708, 300, '#3d3478');
    VISITAS.forEach((v, i) => s += person(Object.assign({}, v, { x: 500 + i * 100, y: 716 + (i === 1 ? 8 : 0), s: .92, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: i === 0 ? -.6 : -.3, armL: { a: 30, b: 40 }, armR: { a: 40, b: 50 }, k: 'v' + i })));
    s += bread(560, 760, .8) + jug(640, 776, .7) + grapes(600, 770, .9);
    s += abraao({ x: 360, y: 752, s: 1.02, face: 'smile', look: .6, armL: { a: 20 }, armR: { a: 40, b: 40 }, k: 'abraao' });
    return s;
  },
  setup(api) {
    const fala = () => { api.snd('choir', ['C4', 'G4', 'C5']); api.bubble(600, 470, 'Daqui a um ano, Sara vai ter um filho!', { key: 'v', dur: 2800 }); };
    VISITAS.forEach((_, i) => api.tap(api.q('v' + i), 'Visitante', fala));
    api.tap(api.q('tenda'), 'Tenda', async () => {
      const el = api.q('sara');
      api.snd('laugh');
      api.anim(el, [{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }], { duration: 2600 });
      api.bubble(190, 420, 'Hi, hi, hi! Eu? Tão velhinha?', { key: 's', dur: 2400 });
      if (!api.st.n) { api.st.n = true; api.later(() => api.bubble(600, 470, 'Existe alguma coisa difícil demais para Deus?', { key: 'v', dur: 3000 }), 2600); api.nudgeNext(5800); }
    });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('hello'); api.bubble(360, 480, 'Para Deus, nada é difícil!', { key: 'a' }); });
  }
});

/* =====================================================================
   7 — ISAQUE NASCEU!
   ===================================================================== */
SCENES.push({
  key: 'isaque', title: 'Isaque nasceu!', ref: 'Gênesis 21.1-7', tint: 'rose',
  text: [
    'E Deus cumpriu a promessa! Sara teve um bebé.',
    'Chamou-se Isaque, que quer dizer «ele ri». Sara disse:',
    { q: 'Deus fez-me rir de alegria! Toda a gente vai rir comigo!', who: 'sara' }
  ],
  fact: 'Quando Isaque nasceu, Abraão tinha 100 anos!',
  hint: 'Toca no bebé, no Abraão e na pandeireta.',
  alt: 'Festa em frente das tendas. Sara tem o bebé Isaque ao colo e ri de alegria. Abraão salta de felicidade, uma rapariga toca pandeireta e uma criança dança.',
  cue: [372, 600],
  art() {
    let s = bgDay({ sunX: 680, sunY: 120, sunR: 42 });
    s += hill([[-40, 470], [200, 450], [420, 466], [640, 440], [840, 458]], '#c9d98a');
    s += tent(140, 520, 220, 180, { fill: '#e2c497', stripe: '#5e7d4a' }) + tent(660, 510, 240, 196, { fill: '#e7d2b0', stripe: '#3d3478', flag: '#e5483f' });
    s += `<rect x="-40" y="520" width="900" height="400" fill="#e6d29c"/>`;
    s += flowerBand(1701, 780, 830, 8);
    s += `<g data-k="pandeiro"><g class="act">${person(Object.assign({}, SERVA, { x: 140, y: 760, s: .94, face: 'laugh', look: .5, armL: { a: 20 }, armR: { a: 150, b: -30, item: `<g transform="rotate(30)"><circle r="20" fill="#e9c46a" stroke="${OL}" stroke-width="3"/><circle r="12" fill="#f6e3b8"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${r1(Math.cos(a * Math.PI / 180) * 16)}" cy="${r1(Math.sin(a * Math.PI / 180) * 16)}" r="3" fill="#c9a54e" stroke="${OL}" stroke-width="1.4"/>`).join('')}</g>` } }))}${hitC(150, 600, 90)}</g></g>`;
    s += sara({ x: 370, y: 756, s: 1.06, face: 'laugh', look: .2, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, front: bebe(16, -146, .95, 'bebe', 'joy') });
    s += abraao({ x: 530, y: 756, s: 1.06, legs: 'hop', face: 'laugh', look: -.4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'abraao' });
    s += person(Object.assign({}, CRIANCAS[0], { x: 680, y: 780, s: .8, legs: 'hop', face: 'laugh', look: -.5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'crianca' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('bebe'), 'Bebé Isaque', () => { api.snd('laugh'); api.burst(372, 560, 'heart', 6); api.bubble(372, 500, 'Hi, hi!', { key: 'b', size: 30 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('tada'); api.hop(api.q('abraao'), 16); api.bubble(530, 470, 'O meu filho! Obrigado, Deus!', { key: 'a' }); });
    api.tap(api.q('pandeiro'), 'Pandeireta', () => { api.snd('tambourine'); api.hop(api.q('pandeiro'), 8); api.burst(200, 560, 'note', 5); });
    api.tap(api.q('crianca'), 'Criança a dançar', () => { api.snd('boing'); api.hop(api.q('crianca'), 18); });
  }
});

/* =====================================================================
   8 — UMA FAMÍLIA DO TAMANHO DO CÉU
   ===================================================================== */
SCENES.push({
  key: 'familia', title: 'Uma família enorme', ref: 'Gênesis 22.17; Gálatas 3.7', tint: 'night',
  text: [
    'Isaque cresceu. E a família de Abraão foi crescendo, crescendo... e ficou enorme, como as estrelas do céu!',
    'E sabes que mais? Quem confia em Deus, como Abraão, também faz parte desta família.'
  ],
  fact: 'Muitos anos depois, Jesus nasceu nesta família!',
  hint: 'Toca no céu para a família crescer.',
  alt: 'Noite estrelada. Abraão, velhinho, e o menino Isaque olham para o céu. A cada toque, aparecem mais e mais pessoas da família, a encher as colinas.',
  cue: [400, 160],
  art() {
    let s = nightSky(1801, 90, 460);
    s += `<rect class="hit" data-k="ceu" x="-40" y="-40" width="900" height="470" fill="#000" fill-opacity="0"/>`;
    s += hill([[-40, 520], [200, 494], [420, 512], [640, 486], [840, 504]], '#22385c');
    s += `<g data-k="f0" opacity="0" style="pointer-events:none">${silhouettes(1, 520, .7, 16, ['#4a4f7a', '#5a4a6a', '#3f5a6a', '#6a5a4a'])}</g>`;
    s += hill([[-40, 590], [240, 566], [480, 582], [720, 560], [840, 572]], '#26455a');
    s += `<g data-k="f1" opacity="0" style="pointer-events:none">${silhouettes(2, 596, .86, 12, ['#5a5f8a', '#6a4f6f', '#4a6a72', '#7a6450'])}</g>`;
    s += hill([[-40, 670], [240, 648], [480, 664], [720, 640], [840, 652]], '#2c584f');
    s += `<g data-k="f2" opacity="0" style="pointer-events:none">${silhouettes(3, 690, 1, 9, ['#6a6f9a', '#7a5a7a', '#56787a', '#8a7058'])}</g>`;
    s += `<rect x="-40" y="700" width="900" height="220" fill="#2f5f55"/>`;
    s += abraao({ x: 300, y: 790, s: 1.06, face: 'joy', look: .3, armL: { a: 30, b: 30 }, armR: { a: 150, b: -10 }, k: 'abraao' });
    s += person(Object.assign({}, ISAQUE, { x: 440, y: 796, s: .9, face: 'joy', look: -.3, armL: { a: 150, b: -20 }, armR: { a: 20 }, k: 'isaque' }));
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('ceu'), 'Céu da noite', () => {
      api.snd('chime', ['C5', 'E5', 'G5', 'C6'][Math.min(n, 3)]);
      api.burst(200 + Math.random() * 400, 120 + Math.random() * 160, 'star', 8);
      if (n < 3) {
        api.anim(api.q('f' + n), [{ opacity: 0 }, { opacity: 1 }], { duration: 700, fill: 'forwards' });
        n++;
        if (n === 3) { api.later(() => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.bubble(400, 420, 'A família de Abraão!', { key: 'f', dur: 2600 }); }, 800); api.nudgeNext(3600); }
      }
    });
    api.tap(api.q('abraao'), 'Abraão', () => { api.snd('hello'); api.bubble(300, 520, 'Deus cumpriu tudo!', { key: 'a' }); });
    api.tap(api.q('isaque'), 'Isaque', () => { api.snd('laugh'); api.hop(api.q('isaque'), 14); api.bubble(440, 600, 'Eu sou o Isaque!', { key: 'i' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre as tendas. Um camelo descansa e uma ovelhinha dorme.',
  cue: [430, 160],
  questions: [
    ['O que é que Deus pediu a Abraão?', 'Mudar-se para uma terra nova.'],
    ['O que é que Abraão tentou contar no céu?', 'As estrelas!'],
    ['Porque é que Sara se riu?', 'Achou que era velhinha demais para ter um bebé.'],
    ['Como se chamava o bebé?', 'Isaque, que quer dizer «ele ri».'],
    ['Deus cumpre o que promete?', 'Sim! Sempre!']
  ],
  verse: ['Existe alguma coisa difícil demais para o Senhor?', 'Gênesis 18.14'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1901, 90, 0, 0, 800, 460, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += tent(680, 640, 170, 140, { fill: '#a8946f', stripe: '#6a2e26' });
    s += camel({ x: 470, y: 744, s: .5, saddle: '#3d3478', k: 'camelo' });
    s += sheep({ x: 280, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(300, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
    api.tap(api.q('camelo'), 'Camelo', () => { api.snd('grunt'); api.hop(api.q('camelo'), 6); });
  }
});

Ov.addBook({
  id: 'abraao',
  title: 'Abraão e as Estrelas',
  cover: { kicker: 'Uma história da Bíblia', title: 'Abraão', small: 'e as Estrelas', sub: 'Deus cumpre sempre o que promete' },
  color: '#3d3478',
  ref: 'Gênesis 12 a 21',
  scenes: SCENES
});
})();
