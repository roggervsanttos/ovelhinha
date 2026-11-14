/* =====================================================================
   LIVRO: A TORRE DE BABEL  (Gênesis 11.1-9)
   ===================================================================== */
(() => {
const SCENES = [];
// os construtores (as mesmas cores em todas as páginas)
const POVO = [
  { kind: 'adult', skin: '#d39463', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', tunic: '#c0603a', belt: '#6b4a33', head: 'cloth', clothCol: '#efe2c4', bandCol: '#c0603a' },
  { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'long', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'scarf', clothCol: '#e8c86a' },
  { kind: 'adult', skin: '#b97a4e', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', beard: 'bushy', beardCol: '#2b1d17', tunic: '#3f7fb0', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', hairStyle: 'long', tunic: '#a0527a', belt: '#6b4a33', head: 'scarf', clothCol: '#f2d6e2' },
  { kind: 'child', skin: '#d99a6c', hair: '#3a2520', tunic: '#e0a33a', belt: '#7b4a2a' }
];
const p = (i, o) => person(Object.assign({}, POVO[i], o));
const TIJ = '#c9774a', TIJ2 = '#a95f38';

/* ---------- peças desta história ---------- */
// um tijolo solto
const tijolo = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-22" y="-11" width="44" height="22" rx="3" fill="${TIJ}" stroke="${OL}" stroke-width="2.6"/><path d="M-14,-4 L10,-4" stroke="${TIJ2}" stroke-width="3" stroke-linecap="round"/></g>`;
// pilha de tijolos
function pilha(x, y, n = 6, k = '') {
  let g = '';
  const pos = [[-46, 0], [0, 0], [46, 0], [-23, -22], [23, -22], [0, -44], [-46, -22], [46, -22], [-23, -44], [23, -44]];
  for (let i = 0; i < n; i++) g += tijolo(pos[i][0], pos[i][1]);
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}>${g}</g>`;
}
// um andar da torre: largura w, altura h, com fiadas de tijolos e janelinhas
function andar(cx, base, w, h, o = {}) {
  let g = `<rect x="${cx - w / 2}" y="${base - h}" width="${w}" height="${h}" fill="${o.col || '#d8945e'}" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>`;
  for (let y = base - 18; y > base - h + 4; y -= 18) g += `<path d="M${cx - w / 2 + 6},${y} L${cx + w / 2 - 6},${y}" stroke="${TIJ2}" stroke-width="2.4" opacity=".55"/>`;
  for (let y = base - 9, r = 0; y > base - h; y -= 18, r++) for (let x = cx - w / 2 + (r % 2 ? 22 : 40); x < cx + w / 2 - 10; x += 44) g += `<path d="M${x},${y - 9} L${x},${y + 9}" stroke="${TIJ2}" stroke-width="2.2" opacity=".45"/>`;
  if (o.janelas !== false) for (let i = -1; i <= 1; i++) if (w > 120 || i === 0) g += `<path d="M${cx + i * w * .28 - 10},${base - h * .2} L${cx + i * w * .28 - 10},${base - h * .6} Q${cx + i * w * .28},${base - h * .78} ${cx + i * w * .28 + 10},${base - h * .6} L${cx + i * w * .28 + 10},${base - h * .2} Z" fill="#5a3a26" stroke="${OL}" stroke-width="2.4"/>`;
  g += `<rect x="${cx - w / 2 - 8}" y="${base - h - 8}" width="${w + 16}" height="12" rx="3" fill="#e9b07a" stroke="${OL}" stroke-width="3"/>`;
  return g;
}
// a torre: n andares, cada um mais estreito; ks dá data-k a cada andar (para irem aparecendo)
function torre(cx, base, n, o = {}) {
  const W = o.w || 360, H = o.h || 90, dw = o.dw || 56;
  let g = '';
  for (let i = 0; i < n; i++) {
    const w = W - i * dw, b = base - i * (H + 4);
    const a = andar(cx, b, w, H, { col: i % 2 ? '#d08a56' : '#d8945e' });
    g += o.ks ? `<g data-k="${o.ks}${i}"${i >= (o.vis ?? n) ? ' opacity="0"' : ''}>${a}</g>` : a;
  }
  if (o.andaime) g += `<g stroke="#8a5a33" stroke-width="6" stroke-linecap="round">${[-1, 1].map(s => `<path d="M${cx + s * (W / 2 - (n - 1) * dw / 2 + 24)},${base} L${cx + s * (W / 2 - (n - 1) * dw / 2 + 24)},${base - n * (H + 4) - 40}"/>`).join('')}</g>`;
  return g;
}
const planicie = (y = 560, col = '#e2c387') => hill([[-40, y], [200, y - 16], [420, y - 4], [640, y - 20], [840, y - 6]], col) + `<path d="M-40,${y + 120} C200,${y + 100} 600,${y + 130} 840,${y + 104} L840,900 L-40,900 Z" fill="#d6b16e"/>`;
// forno para cozer os tijolos
function forno(x, y, k = 'forno') {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><path d="M-70,0 L-70,-70 Q0,-140 70,-70 L70,0 Z" fill="#b8814e" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-30,0 L-30,-40 Q0,-70 30,-40 L30,0 Z" fill="#3a2520" stroke="${OL}" stroke-width="2.6"/><g transform="translate(0,-6) scale(.5)"><g class="flicker"><path d="M0,-60 C16,-36 26,-18 18,-4 C10,8 -10,8 -18,-4 C-26,-18 -16,-36 0,-60 Z" fill="#ff8f2e"/><path d="M0,-34 C8,-22 12,-12 8,-6 C4,-2 -4,-2 -8,-6 C-12,-12 -8,-22 0,-34 Z" fill="#ffd27a"/></g></g>${hitC(0, -60, 80)}</g></g>`;
}
// forma de madeira com barro (para fazer tijolos)
function forma(x, y, k) {
  return `<g transform="translate(${x},${y}) scale(1.5)" data-k="${k}"><g class="act"><rect x="-34" y="-16" width="68" height="28" rx="3" fill="#8a5a33" stroke="${OL}" stroke-width="2.8"/><rect x="-26" y="-10" width="52" height="16" rx="2" fill="#a8744a" data-k="${k}barro"/>${hitC(0, -4, 52)}</g></g>`;
}
// pessoa pequenina a caminhar ao longe (para a viagem e a separação)
const caminhante = (i, x, y, s, o = {}) => p(i, Object.assign({ x, y, s, legs: 'walk', face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 30 } }, o));

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'A Torre de Babel',
  alt: 'Numa planície ao pôr do sol, uma torre de tijolos muito alta sobe até às nuvens. Em baixo, pessoas carregam tijolos e olham para cima.',
  cue: [400, 640],
  art() {
    let s = sky('sky', [[0, '#7fb8e6'], [.55, '#f4c99a'], [1, '#f6dcae']], 1100);
    s += sun(640, 330, 50) + cloud(160, 260, 1) + cloud(560, 180, .8, { dx: -30, d: 18 });
    s += planicie(820);
    s += `<g data-k="torre"><g class="act">${torre(400, 900, 7, { w: 380, h: 84, dw: 46, andaime: true })}${hitC(400, 600, 160)}</g></g>`;
    s += cloud(300, 420, .9, { d: 16 }) + cloud(520, 360, .7, { dx: -20, d: 14 });
    s += pilha(140, 960, 8);
    s += p(0, { x: 220, y: 1000, s: 1.05, face: 'joy', look: .6, armL: { a: 150, b: -20, item: tijolo(0, 0, .9) }, armR: { a: 30 }, k: 'pa' });
    s += p(4, { x: 610, y: 1010, s: 1.1, face: 'surprise', look: -.6, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'pb' });
    return s;
  },
  setup(api) {
    api.tap(api.q('torre'), 'Torre', () => { api.snd('clank'); api.burst(400, 300, 'dust', 6); api.bubble(400, 260, 'Até ao céu!', { key: 't' }); });
    api.tap(api.q('pa'), 'Construtor', () => { api.snd('hello'); api.hop(api.q('pa')); api.bubble(220, 680, 'Mais um tijolo!', { key: 'a' }); });
    api.tap(api.q('pb'), 'Menino', () => { api.snd('boing'); api.hop(api.q('pb')); api.bubble(610, 700, 'Que alta!', { key: 'b' }); });
  }
});

/* =====================================================================
   1 — TODOS FALAVAM A MESMA LÍNGUA
   ===================================================================== */
SCENES.push({
  key: 'lingua', title: 'Todos falavam a mesma língua', ref: 'Gênesis 11.1-2', tint: 'sand',
  text: [
    'Depois do dilúvio, a família de Noé cresceu muito e encheu a terra.',
    'Naquele tempo, todas as pessoas do mundo falavam a mesma língua.',
    'Um dia, chegaram a uma grande planície e ficaram a morar ali.'
  ],
  fact: 'Essa planície ficava num lugar chamado Sinear, perto de dois grandes rios.',
  hint: 'Toca nas pessoas para elas falarem.',
  alt: 'Uma família caminha por uma planície larga, com burros carregados. Todos sorriem e conversam uns com os outros.',
  cue: [300, 520],
  art() {
    let s = bgDay({ sunX: 650, sunY: 170 });
    s += planicie(470);
    s += palm(90, 560, .9) + palm(720, 540, .8);
    s += equine({ x: 600, y: 650, s: .8, kind: 'donkey', flip: true, k: 'burro', pack: '#b6553f' });
    s += caminhante(0, 200, 650, .9, { k: 'c0', look: .6 });
    s += caminhante(1, 320, 660, .86, { k: 'c1', look: -.5 });
    s += caminhante(4, 420, 680, .9, { k: 'c2', face: 'joy' });
    s += caminhante(2, 500, 650, .88, { k: 'c3', look: -.6 });
    s += grassBand(1101, 700, 770, 10, ['#b9a35a', '#c7b26a']);
    return s;
  },
  setup(api) {
    const FALAS = [N('Bom dia!'), N('Que terra tão grande!'), N('Olha, uma planície!'), N('Vamos ficar a morar aqui!')];
    const X = [200, 320, 420, 500];
    const vistos = new Set();
    for (let i = 0; i < 4; i++) api.tap(api.q('c' + i), 'Pessoa', () => {
      api.snd('hello'); api.hop(api.q('c' + i));
      api.bubble(X[i], 400, FALAS[i], { key: 'c', size: 26 });
      vistos.add(i); if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.later(() => api.bubble(400, 300, 'Todos se entendiam!', { key: 'z' }), 1200); api.nudgeNext(3200); }
    });
    api.tap(api.q('burro'), 'Burro', () => { api.snd('heehaw'); api.hop(api.q('burro'), 14); });
  }
});

/* =====================================================================
   2 — FAZER TIJOLOS
   ===================================================================== */
SCENES.push({
  key: 'tijolos', title: 'Vamos fazer tijolos!', ref: 'Gênesis 11.3', tint: 'sand',
  text: [
    'Ali não havia muitas pedras. Então disseram uns aos outros:',
    { q: 'Vamos fazer tijolos e cozê-los no fogo!', who: 'outro' },
    'Misturavam barro com água, enchiam as formas e punham os tijolos no forno.'
  ],
  fact: 'Os tijolos cozidos no forno ficavam duros como pedra!',
  hint: 'Toca nas formas para fazer tijolos.',
  alt: 'Duas pessoas enchem formas de madeira com barro. Ao lado, um forno aceso e uma pilha de tijolos.',
  cue: [250, 640],
  art() {
    let s = bgDay({ sunX: 160, sunY: 170 });
    s += planicie(480);
    s += forno(620, 640);
    s += `<g data-k="pilha">${pilha(470, 700, 3)}</g>`;
    s += `<g data-k="mais" opacity="0">${pilha(470, 700, 9)}</g>`;
    s += p(2, { x: 170, y: 640, s: .92, face: 'joy', look: .4, legs: 'kneel', armL: { a: 40, b: -40 }, armR: { a: 50, b: -40 } });
    s += forma(250, 690, 'f0') + forma(370, 740, 'f1') + forma(130, 750, 'f2');
    s += p(4, { x: 380, y: 620, s: .85, face: 'smile', look: -.5, armL: { a: 30 }, armR: { a: 120, b: -30 }, k: 'menino' });
    return s;
  },
  setup(api) {
    const feitos = new Set();
    for (let i = 0; i < 3; i++) api.tap(api.q('f' + i), 'Forma com barro', () => {
      if (feitos.has(i)) { api.snd('plip'); return; }
      feitos.add(i);
      api.snd('pour');
      const [x, y] = api.pos(api.q('f' + i));
      api.burst(x, y - 20, 'dust', 5, { col: '#a8744a' });
      api.anim(api.q('f' + i + 'barro'), [{ fill: '#a8744a' }, { fill: TIJ }], { duration: 700, fill: 'forwards' });
      api.badge(x, y - 50, String(feitos.size));
      if (feitos.size === 3) {
        api.later(() => { api.snd('tada'); api.anim(api.q('mais'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' }); api.bubble(400, 420, 'Tantos tijolos!', { key: 'm' }); }, 700);
        api.nudgeNext(3000);
      }
    });
    api.tap(api.q('forno'), 'Forno', () => { api.snd('crackle'); api.burst(620, 560, 'spark', 6, { col: '#ffb24a' }); });
    api.tap(api.q('menino'), 'Menino', () => { api.snd('laugh'); api.hop(api.q('menino')); api.bubble(380, 420, 'Eu também ajudo!', { key: 'm' }); });
  }
});

/* =====================================================================
   3 — UMA TORRE ATÉ AO CÉU
   ===================================================================== */
SCENES.push({
  key: 'torre', title: 'Uma torre até ao céu', ref: 'Gênesis 11.4', tint: 'sky',
  text: [
    'Depois disseram:',
    { q: 'Vamos construir uma cidade e uma torre tão alta que chegue ao céu!', who: 'outro' },
    'E começaram a construir, andar por andar.'
  ],
  fact: 'Torres assim chamavam-se zigurates. Tinham andares cada vez mais pequenos, como uma escada gigante.',
  hint: 'Toca na torre para a fazer crescer.',
  alt: 'Pessoas constroem uma torre de tijolos com andares. Cada vez que crescem, a torre fica mais alta.',
  cue: [400, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 160 });
    s += planicie(560);
    s += `<g data-k="torre"><g class="act">${torre(400, 690, 5, { w: 360, h: 80, dw: 60, ks: 'n', vis: 2 })}<rect x="180" y="250" width="440" height="440" fill="#000" fill-opacity="0"/></g></g>`;
    s += pilha(110, 740, 6);
    s += p(0, { x: 160, y: 760, s: .8, face: 'joy', look: .6, armL: { a: 150, b: -20, item: tijolo(0, 0, .9) }, armR: { a: 30 } });
    s += p(3, { x: 660, y: 760, s: .8, face: 'smile', look: -.6, armL: { a: 30 }, armR: { a: 140, b: -20 } });
    return s;
  },
  setup(api) {
    let n = 2;
    api.tap(api.q('torre'), 'Torre', () => {
      if (n >= 5) { api.snd('clank'); api.bubble(400, 230, 'Mais alta! Mais alta!', { key: 't' }); return; }
      api.snd('clank');
      const el = api.q('n' + n);
      api.anim(el, [{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 500, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' });
      api.burst(400, 690 - n * 84, 'dust', 6);
      n++;
      if (n === 5) { api.later(() => { api.snd('tada'); api.bubble(400, 230, 'Vai chegar ao céu!', { key: 't' }); }, 500); api.nudgeNext(3000); }
    });
  }
});

/* =====================================================================
   4 — FAMOSOS
   ===================================================================== */
SCENES.push({
  key: 'famosos', title: 'Queremos ser famosos!', ref: 'Gênesis 11.4', tint: 'gold',
  text: [
    'Mas eles não estavam a construir para Deus. Diziam:',
    { q: 'Vamos ficar famosos! Assim ninguém nos vai separar.', who: 'outro' },
    'Tinham o coração cheio de orgulho.'
  ],
  fact: 'Deus tinha dito para as pessoas encherem a terra toda. Mas elas queriam ficar todas no mesmo lugar.',
  hint: 'Toca no homem em cima da torre.',
  alt: 'No alto da torre, um homem de peito para fora levanta os braços, todo vaidoso. Em baixo, outros aplaudem.',
  cue: [400, 300],
  art() {
    let s = bgDay({ sunX: 140, sunY: 150, clouds: false }) + cloud(620, 180, .9) + cloud(250, 120, .6);
    s += planicie(600);
    s += torre(400, 760, 4, { w: 380, h: 84, dw: 64 });
    s += p(0, { x: 400, y: 404, s: .82, face: 'laugh', look: 0, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 }, k: 'chefe' });
    s += p(1, { x: 110, y: 760, s: .76, face: 'joy', look: .6, armL: { a: 140, b: -20 }, armR: { a: 150, b: -20 }, k: 'f1' });
    s += p(2, { x: 690, y: 760, s: .76, face: 'joy', look: -.6, armL: { a: 150, b: -20 }, armR: { a: 140, b: -20 }, k: 'f2' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('chefe'), 'Homem vaidoso', () => {
      api.snd('fanfare'); api.hop(api.q('chefe'));
      api.bubble(400, 180, [N('Somos os maiores!'), N('Vejam a nossa torre!'), N('Todos vão falar de nós!')][n % 3], { key: 'c' });
      if (++n === 2) api.nudgeNext(2800);
    });
    api.tap(api.q('f1'), 'Construtora', () => { api.snd('clap'); api.hop(api.q('f1')); });
    api.tap(api.q('f2'), 'Construtor', () => { api.snd('clap'); api.hop(api.q('f2')); });
  }
});

/* =====================================================================
   5 — DEUS VIU
   ===================================================================== */
SCENES.push({
  key: 'deus', title: 'Deus viu a torre', ref: 'Gênesis 11.5-6', tint: 'sky',
  text: [
    'Deus viu a cidade e a torre que as pessoas estavam a construir.',
    'Para Deus, a torre mais alta do mundo é pequenina!',
    'E Deus decidiu fazer uma coisa para as pessoas se espalharem pela terra.'
  ],
  fact: 'Ninguém consegue chegar ao céu com tijolos. Só Deus nos leva até Ele!',
  hint: 'Toca na luz que vem do céu.',
  alt: 'Uma luz dourada desce das nuvens sobre a torre. A torre parece pequenina vista lá de cima.',
  cue: [400, 220],
  art() {
    let s = sky('sky', [[0, '#5aa9e0'], [.6, '#bfe4f6'], [1, '#e8f6ea']]);
    s += cloud(130, 210, 1.1) + cloud(670, 230, 1);
    s += glory(400, 120, 230, 'luz');
    s += planicie(640);
    s += `<g transform="translate(400,770) scale(.42) translate(-400,-770)">${torre(400, 770, 5, { w: 380, h: 84, dw: 56 })}</g>`;
    for (let i = 0; i < 5; i++) s += p(i % 5, { x: 250 + i * 75, y: 790, s: .32, face: 'smile', look: 0, cls: '' });
    return s;
  },
  setup(api) {
    api.tap(api.q('luz'), 'Luz de Deus', () => {
      api.snd('choir', ['C4', 'E4', 'G4']); api.burst(400, 160, 'spark', 8, { col: '#ffe9a6' });
      api.anim(api.act(api.q('luz')), [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 900 });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
  }
});

/* =====================================================================
   6 — MUITAS LÍNGUAS
   ===================================================================== */
SCENES.push({
  key: 'linguas', title: 'Ninguém se entendia!', ref: 'Gênesis 11.7', tint: 'rose',
  text: [
    'De repente, as pessoas começaram a falar línguas diferentes!',
    'Um pedia um tijolo, e o outro trazia um balde de água.',
    'Ninguém se entendia!'
  ],
  fact: 'Hoje há mais de sete mil línguas no mundo!',
  hint: 'Toca nos construtores para os ouvires.',
  alt: 'Ao pé da torre por acabar, quatro construtores falam ao mesmo tempo e fazem caras confusas. Um segura um tijolo, outro um balde.',
  cue: [200, 520],
  art() {
    let s = bgDay({ sunX: 660, sunY: 150 });
    s += planicie(540);
    s += `<g opacity=".9">${torre(400, 660, 4, { w: 340, h: 76, dw: 60, andaime: true })}</g>`;
    const balde = `<g><path d="M-16,-10 L16,-10 L12,22 L-12,22 Z" fill="#8a9aa8" stroke="${OL}" stroke-width="2.6"/><path d="M-16,-10 Q0,-30 16,-10" stroke="${OL}" stroke-width="2.6" fill="none"/></g>`;
    s += p(0, { x: 140, y: 760, s: .88, face: 'shout', look: .6, armL: { a: 30 }, armR: { a: 70, b: -20, item: tijolo(0, 0, .9) }, k: 'w0' });
    s += p(2, { x: 330, y: 770, s: .88, face: 'surprise', look: -.5, armL: { a: 40, b: -10, item: balde }, armR: { a: 150, b: -20 }, k: 'w1' });
    s += p(1, { x: 500, y: 760, s: .86, face: 'worry', look: .4, armL: { a: 150, b: -30 }, armR: { a: 150, b: -30 }, k: 'w2' });
    s += p(3, { x: 670, y: 770, s: .86, face: 'o', look: -.6, armL: { a: 20 }, armR: { a: 60, b: -60 }, k: 'w3' });
    return s;
  },
  setup(api) {
    // cada um fala uma língua diferente: estas falas não se traduzem
    const FALAS = [['Tijolo!', 'Tijolo!'], ['¿Qué?', '¿Ladrillo?'], ['Quoi ?', 'Une brique ?'], ['What?', 'A brick?']];
    const X = [140, 330, 500, 670];
    const n = [0, 0, 0, 0];
    const vistos = new Set();
    for (let i = 0; i < 4; i++) api.tap(api.q('w' + i), 'Construtor', () => {
      api.snd(i % 2 ? 'boing' : 'hm'); api.shakeHead(api.q('w' + i));
      api.bubble(X[i], 470, FALAS[i][n[i]++ % 2], { key: 'w' + i, size: 26 });
      vistos.add(i); if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   7 — ESPALHARAM-SE PELA TERRA
   ===================================================================== */
SCENES.push({
  key: 'espalham', title: 'Espalharam-se pela terra', ref: 'Gênesis 11.8-9', tint: 'meadow',
  text: [
    'Como já não se entendiam, deixaram de construir a torre.',
    'As pessoas que falavam a mesma língua juntaram-se e foram morar para outros lugares.',
    'Aquela cidade ficou a chamar-se Babel, que quer dizer confusão.'
  ],
  fact: 'Foi assim que as famílias se espalharam por toda a terra, como Deus queria.',
  hint: 'Toca nos grupos para eles partirem.',
  alt: 'A torre ficou por acabar. Grupos de pessoas partem em direções diferentes, com burros e trouxas.',
  cue: [160, 560],
  art() {
    let s = bgDay({ sunX: 400, sunY: 150 });
    s += hill([[-40, 470], [160, 430], [380, 460], [600, 420], [840, 450]], '#9cc36a');
    s += planicie(560, '#c9c27a');
    s += `<g opacity=".85">${torre(400, 560, 3, { w: 220, h: 54, dw: 50 })}</g>`;
    s += `<g data-k="g0"><g data-k="g0in">${caminhante(0, 120, 700, .62, { flip: true, look: -.6 })}${caminhante(4, 190, 720, .62, { flip: true, look: -.6 })}</g>${hitC(150, 620, 90)}</g>`;
    s += `<g data-k="g1"><g data-k="g1in">${caminhante(1, 380, 740, .62, { look: 0 })}${caminhante(3, 440, 750, .6, { look: 0 })}</g>${hitC(410, 660, 90)}</g>`;
    s += `<g data-k="g2"><g data-k="g2in">${caminhante(2, 620, 700, .62)}${equine({ x: 700, y: 710, s: .55, kind: 'donkey', pack: '#2f8a83' })}</g>${hitC(650, 620, 100)}</g>`;
    return s;
  },
  setup(api) {
    const DIR = [[-260, -60], [0, 120], [260, -70]];
    const X = [150, 410, 650];
    const FALAS = [N('Vamos para lá!'), N('Até sempre!'), N('Adeus, Babel!')];
    let n = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('g' + i), 'Grupo de pessoas', async () => {
      if (api.st['g' + i]) return;
      api.st['g' + i] = true;
      api.snd('tiptoe');
      api.bubble(X[i], 480, FALAS[i], { key: 'g' + i, size: 26 });
      await api.anim(api.q('g' + i + 'in'), [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: `translate(${DIR[i][0]}px,${DIR[i][1]}px) scale(.7)`, opacity: 0 }], { duration: 1800, easing: 'ease-in', fill: 'forwards' });
      if (++n === 3) { api.snd('chime', 'G5'); api.bubble(400, 330, 'A torre ficou por acabar.', { key: 't' }); api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   8 — TODAS AS LÍNGUAS
   ===================================================================== */
SCENES.push({
  key: 'todas', title: 'Deus ama todas as línguas', ref: 'Apocalipse 7.9-10', tint: 'gold',
  text: [
    'Hoje há pessoas de muitas línguas e de muitos países.',
    'E Deus ama cada uma delas!',
    'A Bíblia diz que, um dia, pessoas de todas as línguas vão louvar a Deus juntas.'
  ],
  fact: 'A Bíblia já foi traduzida para mais de setecentas línguas!',
  hint: 'Toca nas crianças para elas cantarem.',
  alt: 'Crianças de vários países, de mãos dadas à volta do mundo, cantam juntas com notas musicais à volta.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 660, sunY: 150 });
    s += `<g transform="translate(400,500)"><circle r="150" fill="#5aa9e0" stroke="${OL}" stroke-width="4"/>${blob([[-60, -50, 50], [-20, -70, 40], [60, 20, 46], [20, 60, 34], [-80, 40, 30]], '#7cc06a', 3)}<circle r="150" fill="none" stroke="${OL}" stroke-width="4"/></g>`;
    s += hill([[-40, 660], [200, 640], [440, 655], [640, 636], [840, 650]], '#8cc56a');
    const K = [
      { kind: 'child', skin: '#f0c49c', hair: '#e9b23a', tunic: '#e0473e' },
      { kind: 'child', skin: '#8a5a3a', hair: '#2b1d17', hairStyle: 'curly', tunic: '#3f93c7' },
      { kind: 'child', skin: '#e2b98a', hair: '#1f1a17', hairStyle: 'long', tunic: '#f2c14e' },
      { kind: 'child', skin: '#c98a5a', hair: '#5a3020', tunic: '#5fa046' }
    ];
    const X = [130, 310, 490, 670];
    K.forEach((k, i) => s += person(Object.assign({}, k, { x: X[i], y: 780, s: 1, face: 'joy', look: 0, armL: { a: 60, b: -20 }, armR: { a: 60, b: -20 }, k: 'k' + i })));
    return s;
  },
  setup(api) {
    // "Deus é amor" em quatro línguas: estas falas não se traduzem
    const FALAS = ['Deus é amor!', '¡Dios es amor!', 'Dieu est amour !', 'God is love!'];
    const X = [130, 310, 490, 670], NOTAS = ['C5', 'E5', 'G5', 'C6'];
    const vistos = new Set();
    for (let i = 0; i < 4; i++) api.tap(api.q('k' + i), 'Criança', () => {
      api.snd('chime', NOTAS[i]); api.hop(api.q('k' + i));
      api.burst(X[i], 560, 'note', 3);
      api.bubble(X[i], 540, FALAS[i], { key: 'k' + i, size: 24 });
      vistos.add(i); if (vistos.size === 4 && !api.st.n) { api.st.n = true; api.later(() => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(400, 400, 'heart', 8); }, 900); api.nudgeNext(3000); }
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
  alt: 'Noite estrelada sobre a planície. A torre por acabar está ao longe, e uma ovelhinha dorme na erva.',
  cue: [430, 160],
  questions: [
    ['Que língua falavam as pessoas no princípio?', 'Todas falavam a mesma língua.'],
    ['De que era feita a torre?', 'De tijolos cozidos no forno.'],
    ['Porque queriam construir uma torre tão alta?', 'Queriam ficar famosos.'],
    ['O que aconteceu quando Deus mudou as línguas?', 'Ninguém se entendia e pararam a torre.'],
    ['Deus ama pessoas de que línguas?', 'De todas!']
  ],
  wrong: [
    ['Cada um falava uma língua diferente.', 'Ninguém sabia falar.', 'Só falavam por gestos.'],
    ['De ouro.', 'De madeira.', 'De gelo.'],
    ['Para guardar os animais.', 'Para fugir da chuva.', 'Para dar graças a Deus.'],
    ['A torre ficou ainda mais alta.', 'Todos ficaram a cantar juntos.', 'Nada mudou.'],
    ['Só de uma língua.', 'Só das pessoas da torre.', 'De nenhuma.']
  ],
  verse: ['Louvem o Senhor, todas as nações!', 'Salmo 117.1'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#2f3d5a');
    s += `<g opacity=".7" transform="translate(620,600) scale(.3) translate(-400,-760)">${torre(400, 760, 3, { w: 300, h: 80, dw: 60 })}</g>`;
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
  id: 'babel',
  title: 'A Torre de Babel',
  cover: { kicker: 'Uma história da Bíblia', title: 'A Torre', small: 'de Babel', sub: 'Uma torre até ao céu?' },
  color: '#b5673a',
  ref: 'Gênesis 11.1-9',
  scenes: SCENES
});
})();
