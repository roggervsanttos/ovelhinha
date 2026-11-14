/* =====================================================================
   LIVRO: JESUS ANDA SOBRE AS ÁGUAS  (Mateus 14.22-33)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
// os mesmos discípulos dos outros livros: Pedro (azul), André (verde), Tiago (amarelo) e João (laranja)
const DISC = [
  { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#5e7d4a' },
  { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'short', beard: 'short', beardCol: '#7a4a22', tunic: '#c9a54e', belt: '#6b4a33' },
  { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', tunic: '#e07a3a', belt: '#7b4a2a' }
];
const PEDRO = DISC[0];
const jesus = o => person(Object.assign({}, JESUS, o));
const p = (who, o) => person(Object.assign({}, who, o));

/* ---------- peças desta história ---------- */
// barco de pesca grande; "dentro" fica atrás do casco (só se vê da cintura para cima)
function barco(x, y, s = 1, o = {}) {
  let g = limb(-30, -60, -30, -340, 9, '#8a5a33');
  if (o.vela !== false) g += `<path d="M-22,-330 Q${o.cheia ? 120 : 50},-230 -22,-130 Z" fill="#f4efe6" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-16,-290 Q${o.cheia ? 70 : 30},-230 -16,-170" stroke="#e2d6bd" stroke-width="4" fill="none"/>`;
  g += o.dentro || '';
  g += `<path d="M-250,-70 L250,-70 Q236,6 160,34 L-160,34 Q-236,6 -250,-70 Z" fill="#9a6b3e" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  g += `<path d="M-244,-48 L244,-48 M-228,-20 L228,-20 M-200,8 L200,8" stroke="#7a4e2c" stroke-width="4"/>`;
  g += `<path d="M-256,-74 L256,-74" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M-256,-74 L256,-74" stroke="#b9875a" stroke-width="7" stroke-linecap="round"/>`;
  g += o.frente || '';
  const anim = o.rock ? `class="sway" style="--r:${o.rock}deg;--d:${o.d ?? 1.4}s"` : `class="bob" style="${dl(4)}"`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g ${anim}>${g}</g>${o.k ? hitC(0, -150, 200) : ''}</g></g>`;
}
// discípulos no barco (i = quais; por omissão os quatro)
function tripulacao(o = {}) {
  const P = o.pos || [[-180, 0], [-100, 6], [-20, 0], [60, 6]];
  const who = o.who || [0, 1, 2, 3];
  return who.map((d, i) => person(Object.assign({}, DISC[d], { x: P[i][0], y: P[i][1], s: .78, face: o.face || 'smile', look: o.look ?? .3, armL: o.arms ? o.arms[i] : { a: 20 }, armR: o.arms ? o.arms[i] : { a: 20 } }, o.extra ? o.extra[i] : {}))).join('');
}
// remos (à frente do casco)
function remos(xs, k = 'remos') {
  return `<g data-k="${k}">${xs.map((x, i) => `<g transform="translate(${x},-70)"><g class="sway" style="--r:12deg;--d:1.2s;animation-delay:${-i * .3}s"><path d="M0,0 L56,120" stroke="${OL}" stroke-width="11" stroke-linecap="round"/><path d="M0,0 L56,120" stroke="#b9875a" stroke-width="6" stroke-linecap="round"/><path d="M48,104 L76,166 L58,172 L38,112 Z" fill="#b9875a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/></g></g>`).join('')}</g>`;
}
function ceuNoite(o = {}) {
  let s = sky('ssky', [[0, '#141a3d'], [.6, '#2b3566'], [1, '#3d4a80']]);
  s += starField(o.seed ?? 7101, 30, 0, 0, 800, 300, { big: .1 });
  if (o.lua !== false) s += moon(o.luaX ?? 640, o.luaY ?? 110, 28);
  const sets = [[110, 110, 1.2], [330, 80, 1.3], [560, 120, 1.15], [760, 80, 1.1], [220, 200, .95], [470, 210, 1]];
  if (o.nuvens !== false) s += `<g data-k="${o.k || 'nuvens'}">${sets.map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:${i % 2 ? -26 : 28}px;--d:${4 + i}s;${dl(5)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#39406a', 0)}${blob([[-22, -24, 18], [18, -20, 16]], '#4a5282', 0)}</g></g>`).join('')}<rect x="-40" y="30" width="900" height="210" fill="#000" fill-opacity="0"/></g>`;
  return s;
}
function lagoNoite(y = 430) {
  return `<rect x="-40" y="${y}" width="900" height="600" fill="#24456e"/><path d="M-40,${y} L840,${y}" stroke="#3f6a96" stroke-width="5"/>`;
}
function ondasBravas(y = 640) {
  return waveBand(y, { fill: '#2f5f86', amp: 30, len: 230, dx: 70, d: 1.8, foam: '#dfe9f2', fw: 6 }) + waveBand(y + 70, { fill: '#26507a', amp: 26, len: 200, dx: -60, d: 1.5, foam: '#d0e0ee', fw: 6 });
}
function ondasCalmas(y = 700, o = {}) {
  return waveBand(y, { fill: o.c1 || '#4f8fbf', amp: 9, len: 150, dx: 30, d: 6, foam: '#d6eff9', fw: 4 }) + waveBand(y + 50, { fill: o.c2 || '#3f7fb0', amp: 10, len: 170, dx: -30, d: 7, foam: '#cfeaf7', fw: 4 });
}
function vento(x, y, k = 'vento') {
  return `<g data-k="${k}" opacity=".8">${[[x, y], [x + 150, y + 46], [x + 40, y + 100]].map(([a, b], i) => `<path class="drift" style="--dx:60px;--d:${1.2 + i * .3}s;${dl(2)}" d="M${a},${b} c40,-16 80,16 120,0 c24,-10 30,-30 10,-34" stroke="#dfe7f2" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}<rect x="${x - 20}" y="${y - 50}" width="320" height="190" fill="#000" fill-opacity="0"/></g>`;
}
// espuma à volta dos pés de quem está em cima da água
const pes = (x, y, w = 70) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${r1(w * .2)}" fill="none" stroke="#dfe9f2" stroke-width="5" opacity=".9"/><ellipse cx="${x}" cy="${y}" rx="${r1(w * .62)}" ry="${r1(w * .12)}" fill="#dfe9f2" opacity=".35"/>`;
const luzJesus = (x, y, r = 170) => `<defs>${rg('lj', [[0, '#fff6c8', .8], [.6, '#ffe28a', .25], [1, '#ffe28a', 0]])}</defs><circle cx="${x}" cy="${y}" r="${r}" fill="${UR('lj')}"/>`;

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jesus Anda sobre as Águas',
  alt: 'De noite, no meio do lago, Jesus está de pé em cima da água e estende a mão ao Pedro, que vem ter com Ele. Ao fundo, os outros discípulos olham do barco.',
  cue: [520, 780],
  art() {
    let s = sky('sky', [[0, '#141a3d'], [.55, '#2b3566'], [1, '#4a5a90']], 1100);
    s += starField(7001, 50, 0, 0, 800, 600, { big: .12 }) + moon(620, 360, 34);
    s += `<rect x="-40" y="720" width="900" height="400" fill="#24456e"/><path d="M-40,720 L840,720" stroke="#3f6a96" stroke-width="5"/>`;
    s += `<g opacity=".95">${barco(150, 760, .5, { dentro: tripulacao({ who: [1, 2, 3], pos: [[-160, 0], [-60, 6], [40, 0]], face: 'surprise', look: .6, arms: [{ a: 150, b: -20 }, { a: 30 }, { a: 140, b: -20 }] }) })}</g>`;
    s += waveBand(820, { fill: '#2f5f86', amp: 16, len: 200, dx: 40, d: 3, foam: '#dfe9f2', fw: 5 });
    s += luzJesus(560, 800, 220);
    s += pes(560, 1000, 80) + jesus({ x: 560, y: 1000, s: 1.2, face: 'smile', look: -.5, armL: { a: 80, b: -10 }, armR: { a: 20 }, k: 'jesus' });
    s += pes(270, 1010, 70) + p(PEDRO, { x: 270, y: 1010, s: 1.1, face: 'joy', look: .6, armL: { a: 30 }, armR: { a: 80, b: -10 }, k: 'pedro' });
    s += waveBand(1030, { fill: '#26507a', amp: 14, len: 180, dx: -40, d: 3, foam: '#d0e0ee', fw: 5 });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(560, 700, 'heart', 4); api.bubble(560, 660, 'Coragem! Sou Eu!', { key: 'j' }); });
    api.tap(api.q('pedro'), 'Pedro', () => { api.snd('laugh'); api.bubble(270, 680, 'Estou a andar sobre a água!', { key: 'p' }); });
  }
});

/* =====================================================================
   1 — JESUS VAI ORAR
   ===================================================================== */
SCENES.push({
  key: 'orar', title: 'Jesus vai orar', ref: 'Mateus 14.22-23', tint: 'dusk',
  text: [
    'Depois de dar de comer à multidão, Jesus disse aos discípulos: «Vão de barco para o outro lado do lago.»',
    'E Jesus subiu sozinho a um monte, para orar.'
  ],
  fact: 'Jesus gostava de falar com Deus, o seu Pai, num lugar sossegado.',
  hint: 'Toca em Jesus e no barco.',
  alt: 'Ao pôr do sol, Jesus está de joelhos no alto de um monte, a orar. Lá em baixo, no lago, o barco dos discípulos afasta-se.',
  cue: [200, 360],
  art() {
    let s = sky('sky', [[0, '#3a4a8a'], [.5, '#c27a8a'], [1, '#f2b880']]);
    s += starField(7102, 16, 0, 0, 800, 200, { big: .1 }) + sun(560, 420, 50);
    s += `<rect x="-40" y="420" width="900" height="500" fill="#5a7aa6"/><path d="M-40,420 L840,420" stroke="#8aa6c8" stroke-width="5"/>`;
    s += `<path d="M560,436 L540,600 L580,600 Z" fill="#ffd27a" opacity=".25"/>`;
    s += barco(560, 520, .42, { k: 'barco', dentro: tripulacao({ face: 'joy', look: -.6, arms: [{ a: 150, b: -20 }, { a: 20 }, { a: 140, b: -20 }, { a: 20 }] }) });
    s += waveBand(560, { fill: '#4f6f9a', amp: 8, len: 140, dx: 20, d: 6, foam: '#a8c0de', fw: 3 });
    s += `<path d="M-40,900 L-40,420 C40,380 160,320 240,330 C330,340 360,430 420,520 C460,600 500,700 560,900 Z" fill="#6a7a5a" stroke="${OL}" stroke-width="3"/>`;
    s += olive(80, 470, .7);
    s += jesus({ x: 210, y: 470, s: .9, legs: 'kneel', hemY: -62, face: 'sleep', look: 0, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('choir', ['C4', 'E4', 'G4']); api.burst(210, 250, 'spark', 6, { col: '#ffe9a6' }); api.bubble(210, 160, 'Pai, obrigado por este dia.', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
    api.tap(api.q('barco'), 'Barco dos discípulos', () => { api.snd('hello'); api.bubble(560, 300, 'Até já, Mestre!', { key: 'b' }); });
  }
});

/* =====================================================================
   2 — O VENTO CONTRA O BARCO
   ===================================================================== */
SCENES.push({
  key: 'vento', title: 'O vento contra o barco', ref: 'Mateus 14.24', tint: 'night',
  text: [
    'A noite chegou, e o barco estava no meio do lago.',
    'O vento soprava contra eles, e as ondas abanavam o barco.'
  ],
  fact: 'Os discípulos remaram durante horas, mas o vento não os deixava avançar.',
  hint: 'Toca no barco para remar e no vento.',
  alt: 'De noite, no meio do lago, o barco abana nas ondas. Os discípulos remam com força contra o vento.',
  cue: [400, 520],
  art() {
    let s = ceuNoite({ lua: false });
    s += lagoNoite(430);
    const rema = { a: 60, b: -30 };
    s += barco(400, 660, .95, { k: 'barco', rock: 5, d: 1.3, vela: false, dentro: tripulacao({ face: 'worry', look: .5, arms: [rema, rema, rema, rema] }), frente: remos([-190, -40, 110]) });
    s += ondasBravas(650);
    s += vento(60, 330);
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('barco'), 'Barco', () => {
      api.snd('splash'); api.burst(400, 680, 'ripple', 3);
      api.anim(api.act(api.q('barco')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(14px)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(0px)' }], { duration: 900 });
      api.bubble(400, 280, [N('Rema!'), N('Mais força!'), N('O vento não nos deixa avançar!')][Math.min(n, 2)], { key: 'b' });
      if (++n === 3) api.nudgeNext(2600);
    });
    api.tap(api.q('vento'), 'Vento', () => { api.snd('wind'); api.anim(api.q('vento'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(80px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); });
  }
});

/* =====================================================================
   3 — UM FANTASMA?!
   ===================================================================== */
SCENES.push({
  key: 'fantasma', title: 'Um fantasma?!', ref: 'Mateus 14.25-26', tint: 'night',
  text: [
    'De madrugada, Jesus foi ter com eles, a andar por cima da água!',
    'Os discípulos assustaram-se muito e gritaram: «É um fantasma!»'
  ],
  fact: 'Ninguém consegue andar por cima da água. Mas Jesus é o Filho de Deus!',
  hint: 'Toca no vulto em cima da água e nos discípulos.',
  alt: 'Ao longe, no meio da névoa, um vulto vem a andar por cima das ondas. No barco, os discípulos assustados apontam e gritam.',
  cue: [600, 520],
  art() {
    let s = ceuNoite({ luaX: 160 });
    s += lagoNoite(430);
    const medo = [{ a: 150, b: -20 }, { a: 140, b: -10 }, { a: 60, b: -60 }, { a: 150, b: -20 }];
    s += barco(270, 660, .85, { k: 'barco', rock: 4, d: 1.4, vela: false, dentro: tripulacao({ face: 'scared', look: .7, arms: medo }) });
    s += `<g data-k="vulto" opacity=".45"><g data-k="vultoIn">${pes(610, 600, 54)}${jesus({ x: 610, y: 600, s: .78, face: 'smile', look: -.6, armL: { a: 20 }, armR: { a: 20 } })}</g>${hitC(610, 480, 90)}</g>`;
    s += `<g opacity=".55" style="pointer-events:none">${blob([[520, 560, 60], [600, 520, 70], [690, 560, 60], [600, 590, 60]], '#c9d6e6', 0)}</g>`;
    s += ondasBravas(660);
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2800); };
    api.tap(api.q('vulto'), 'Vulto em cima da água', async () => {
      api.snd('wind');
      await api.anim(api.q('vulto'), [{ opacity: .45 }, { opacity: .9 }], { duration: 900, fill: 'forwards' });
      api.bubble(610, 300, 'Quem será?', { key: 'v' });
      ok('v');
    });
    api.tap(api.q('barco'), 'Discípulos assustados', () => { api.snd('boing'); api.shake(4); api.bubble(270, 300, 'Socorro! É um fantasma!', { key: 'b' }); ok('b'); });
  }
});

/* =====================================================================
   4 — CORAGEM! SOU EU!
   ===================================================================== */
SCENES.push({
  key: 'coragem', title: 'Coragem! Sou Eu!', ref: 'Mateus 14.27', tint: 'night',
  text: [
    'Mas Jesus falou-lhes logo:',
    { q: 'Coragem! Sou Eu. Não tenham medo!', who: 'jesus' }
  ],
  fact: 'Quando temos medo, podemos lembrar-nos de que Jesus está connosco.',
  hint: 'Toca em Jesus.',
  alt: 'Jesus, rodeado de luz, está de pé em cima da água e levanta a mão. No barco, os discípulos olham para Ele.',
  cue: [560, 520],
  art() {
    let s = ceuNoite({ luaX: 160 });
    s += lagoNoite(430);
    s += `<g data-k="medo">${barco(250, 670, .85, { rock: 3, d: 1.4, vela: false, dentro: tripulacao({ face: 'scared', look: .7, arms: [{ a: 150, b: -20 }, { a: 60, b: -60 }, { a: 140, b: -10 }, { a: 150, b: -20 }] }) })}</g>`;
    s += `<g data-k="alivio" opacity="0" style="pointer-events:none">${barco(250, 670, .85, { rock: 3, d: 1.4, vela: false, dentro: tripulacao({ face: 'joy', look: .7, arms: [{ a: 30 }, { a: 20 }, { a: 140, b: -20 }, { a: 30 }] }) })}</g>`;
    s += `<g data-k="luz" opacity=".6">${luzJesus(580, 480, 200)}</g>`;
    s += pes(580, 640, 70) + jesus({ x: 580, y: 640, s: 1, face: 'smile', look: -.6, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'jesus' });
    s += ondasBravas(680);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', async () => {
      api.snd('heart');
      api.anim(api.q('luz'), [{ opacity: .6 }, { opacity: 1 }, { opacity: .8 }], { duration: 900, fill: 'forwards' });
      api.bubble(580, 300, 'Coragem! Sou Eu!', { key: 'j' });
      if (api.st.ok) return;
      api.st.ok = true;
      await api.wait(700);
      api.anim(api.q('medo'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      await api.anim(api.q('alivio'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
      api.bubble(250, 320, 'É Jesus!', { key: 'b' });
      api.nudgeNext(2600);
    });
  }
});

/* =====================================================================
   5 — O PEDRO ANDA SOBRE A ÁGUA
   ===================================================================== */
SCENES.push({
  key: 'pedro', title: 'O Pedro anda sobre a água', ref: 'Mateus 14.28-29', tint: 'night',
  text: [
    'O Pedro disse: «Senhor, se és Tu, manda-me ir ter contigo por cima da água!» E Jesus disse: «Vem!»',
    'O Pedro saiu do barco e começou a andar por cima da água, na direção de Jesus.'
  ],
  fact: 'O Pedro foi o único discípulo que teve coragem de sair do barco!',
  hint: 'Toca no Pedro para ele ir ter com Jesus.',
  alt: 'O Pedro saiu do barco e anda por cima das ondas na direção de Jesus, que o espera de braço estendido.',
  cue: [300, 560],
  art() {
    let s = ceuNoite({ luaX: 400 });
    s += lagoNoite(430);
    s += barco(130, 640, .7, { rock: 3, d: 1.4, vela: false, dentro: tripulacao({ who: [1, 2, 3], pos: [[-160, 0], [-60, 6], [40, 0]], face: 'surprise', look: .7, arms: [{ a: 140, b: -10 }, { a: 60, b: -60 }, { a: 150, b: -20 }] }) });
    s += luzJesus(650, 500, 150);
    s += pes(650, 650, 64) + jesus({ x: 650, y: 650, s: .96, face: 'joy', look: -.6, armL: { a: 80, b: -10 }, armR: { a: 20 }, k: 'jesus' });
    s += `<g data-k="pedro">${pes(310, 690, 60)}${p(PEDRO, { x: 310, y: 690, s: .96, legs: 'walk', face: 'determined', look: .6, armL: { a: 40 }, armR: { a: 60, b: -10 } })}${hitC(310, 560, 90)}</g>`;
    s += ondasBravas(700);
    return s;
  },
  setup(api) {
    api.tap(api.q('pedro'), 'Pedro', async () => {
      if (api.st.foi) { api.snd('laugh'); api.bubble(460, 330, 'Estou a andar sobre a água!', { key: 'p' }); return; }
      api.st.foi = true;
      api.snd('tiptoe');
      api.bubble(330, 330, 'Senhor, aí vou eu!', { key: 'p' });
      await api.anim(api.q('pedro'), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(150px,-30px)' }], { duration: 1600, easing: 'ease-in-out', fill: 'forwards' });
      api.snd('laugh');
      api.bubble(460, 330, 'Estou a andar sobre a água!', { key: 'p' });
      api.nudgeNext(2800);
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(650, 330, 'Vem!', { key: 'j' }); });
  }
});

/* =====================================================================
   6 — SENHOR, SALVA-ME!
   ===================================================================== */
SCENES.push({
  key: 'afunda', title: 'Senhor, salva-me!', ref: 'Mateus 14.30-31', tint: 'stone',
  text: [
    'Mas, quando viu o vento forte, o Pedro teve medo e começou a afundar-se: «Senhor, salva-me!»',
    'Logo, Jesus estendeu a mão e agarrou-o.'
  ],
  fact: 'Enquanto olhou para Jesus, o Pedro andou sobre a água. Quando olhou para o vento, afundou-se!',
  hint: 'Toca na mão de Jesus para salvar o Pedro.',
  alt: 'Com o vento forte, o Pedro está a afundar-se na água e levanta os braços. Jesus, ao lado, estende-lhe a mão.',
  cue: [470, 470],
  art() {
    let s = ceuNoite({ lua: false });
    s += lagoNoite(430);
    s += vento(40, 300);
    s += pes(560, 690, 70) + jesus({ x: 560, y: 690, s: 1.04, face: 'smile', look: -.6, armL: { a: 70, b: -20 }, armR: { a: 20 }, k: 'jesus' });
    s += `<g data-k="pedro"><g data-k="pedroIn">${p(PEDRO, { x: 360, y: 820, s: 1, face: 'scared', look: .6, armL: { a: 150, b: -20 }, armR: { a: 120, b: -20 } })}</g>${hitC(360, 600, 80)}</g>`;
    s += `<g data-k="agua">${waveBand(720, { fill: '#2f5f86', amp: 26, len: 220, dx: 60, d: 1.8, foam: '#dfe9f2', fw: 6 })}</g>`;
    s += waveBand(780, { fill: '#26507a', amp: 22, len: 200, dx: -50, d: 1.6, foam: '#d0e0ee', fw: 6 });
    return s;
  },
  setup(api) {
    const salva = async () => {
      if (api.st.salvo) { api.snd('heart'); api.burst(460, 520, 'heart', 4); api.bubble(560, 330, 'Porque duvidaste, Pedro?', { key: 'j' }); return; }
      api.st.salvo = true;
      api.snd('whoosh');
      await api.anim(api.q('pedroIn'), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(40px,-110px)' }], { duration: 900, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' });
      api.snd('heart'); api.burst(460, 520, 'heart', 6);
      api.bubble(560, 330, 'Porque duvidaste, Pedro?', { key: 'j' });
      api.later(() => api.bubble(300, 300, 'Obrigado, Senhor!', { key: 'p' }), 1500);
      api.nudgeNext(3600);
    };
    api.tap(api.q('jesus'), 'Mão de Jesus', salva);
    api.tap(api.q('pedro'), 'Pedro', () => { if (!api.st.salvo) { api.snd('splash'); api.burst(360, 700, 'ripple', 3); api.bubble(300, 300, 'Senhor, salva-me!', { key: 'p' }); } else salva(); });
    api.tap(api.q('vento'), 'Vento', () => { api.snd('wind'); api.anim(api.q('vento'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(80px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); });
  }
});

/* =====================================================================
   7 — O VENTO PAROU
   ===================================================================== */
SCENES.push({
  key: 'calma', title: 'O vento parou', ref: 'Mateus 14.32', tint: 'water',
  text: [
    'Jesus e o Pedro subiram para o barco, e o vento parou logo.',
    'O lago ficou calminho, e o céu começou a clarear.'
  ],
  fact: 'O vento e a água obedecem a Jesus, porque Ele é o Filho de Deus!',
  hint: 'Toca nas nuvens para as afastar.',
  alt: 'Ao amanhecer, o lago está calmo. Jesus e os discípulos estão no barco, e as nuvens vão-se embora.',
  cue: [400, 160],
  art() {
    let s = sky('sky', [[0, '#5a6aa8'], [.5, '#e9a8a0'], [1, '#fbd9a6']]);
    s += sun(400, 440, 56);
    s += `<g data-k="nuvens">${[[150, 140, 1.2], [400, 110, 1.3], [650, 140, 1.2], [270, 220, 1], [540, 230, 1]].map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g data-k="nv${i}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#6a72a0', 0)}</g></g>`).join('')}<rect x="-40" y="40" width="900" height="240" fill="#000" fill-opacity="0"/></g>`;
    s += `<rect x="-40" y="440" width="900" height="500" fill="#6f9cc8"/><path d="M-40,440 L840,440" stroke="#9fc0de" stroke-width="5"/><path d="M400,452 L380,600 L420,600 Z" fill="#ffe0a0" opacity=".4"/>`;
    const dentro = tripulacao({ who: [1, 2, 3, 0], pos: [[-190, 0], [-110, 6], [-30, 0], [130, 6]], face: 'joy', look: .3 }) + jesus({ x: 50, y: 4, s: .84, face: 'joy', look: 0, armL: { a: 30 }, armR: { a: 30 } });
    s += barco(400, 680, .9, { vela: false, dentro });
    s += ondasCalmas(700, { c1: '#5f8fbf', c2: '#4f80b0' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('nuvens'), 'Nuvens', async () => {
      if (n >= 5) { api.snd('chime', 'G6'); return; }
      api.snd('whoosh');
      const i = n++;
      api.anim(api.q('nv' + i), [{ transform: 'translateX(0px)', opacity: 1 }, { transform: `translateX(${i % 2 ? 300 : -300}px)`, opacity: 0 }], { duration: 900, easing: 'ease-in', fill: 'forwards' });
      if (n === 3) { await api.wait(500); api.snd('tada'); api.bubble(400, 330, 'Que calma!', { key: 'c' }); api.nudgeNext(2600); }
    });
  }
});

/* =====================================================================
   8 — TU ÉS O FILHO DE DEUS!
   ===================================================================== */
SCENES.push({
  key: 'filho', title: 'Tu és o Filho de Deus!', ref: 'Mateus 14.33', tint: 'gold',
  text: [
    'Os discípulos ajoelharam-se diante de Jesus e disseram:',
    { q: 'Tu és mesmo o Filho de Deus!', who: 'outro' }
  ],
  fact: 'Jesus esteve com os discípulos na tempestade. E também está connosco quando temos medo!',
  hint: 'Toca nos discípulos e em Jesus.',
  alt: 'De manhã, com o lago calmo, os discípulos estão de mãos juntas no barco, a olhar para Jesus.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 640, sunY: 130, sunR: 44, sky: [[0, '#8fcbec'], [.6, '#fde3b8'], [1, '#fde3b8']] });
    s += hill([[-40, 430], [200, 400], [440, 420], [680, 392], [840, 412]], '#a9b8a0');
    s += `<rect x="-40" y="440" width="900" height="500" fill="#6fb0d8"/>`;
    const maos = { a: -30, b: -84 };
    const dentro = tripulacao({ who: [0, 1, 2, 3], pos: [[-190, 6], [-110, 10], [100, 10], [180, 6]], face: 'joy', look: .3, arms: [maos, maos, maos, maos], extra: [{ k: 'd0' }, { k: 'd1' }, { k: 'd2' }, { k: 'd3' }] }) + jesus({ x: 0, y: 0, s: .9, face: 'joy', look: 0, armL: { a: 50, b: -20 }, armR: { a: 50, b: -20 }, k: 'jesus' });
    s += barco(400, 690, 1, { vela: false, dentro });
    s += ondasCalmas(710, { c1: '#5aa3d2', c2: '#4f97c7' });
    return s;
  },
  setup(api) {
    const FALAS = [N('Tu és o Filho de Deus!'), N('Salvaste o Pedro!'), N('Até o vento Te obedece!'), N('Obrigado, Jesus!')];
    const vistos = new Set();
    for (let i = 0; i < 4; i++) api.tap(api.q('d' + i), 'Discípulo', () => {
      const x = 400 + [-190, -110, 100, 180][i];
      api.snd('hello'); api.bubble(x, 380, FALAS[i], { key: 'd', size: 26 });
      vistos.add(i); if (vistos.size === 2 && !api.st.n) { api.st.n = true; api.nudgeNext(2800); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 480, 'heart', 6); api.bubble(400, 380, 'Eu estou sempre convosco!', { key: 'j' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite calma e estrelada sobre o lago. Um barco descansa junto à margem, e uma ovelhinha dorme na areia.',
  cue: [430, 160],
  questions: [
    ['Onde foi Jesus enquanto os discípulos iam de barco?', 'Foi orar a um monte.'],
    ['Como foi Jesus ter com o barco?', 'A andar por cima da água!'],
    ['O que pensaram os discípulos quando o viram?', 'Que era um fantasma.'],
    ['Quem saiu do barco para ir ter com Jesus?', 'O Pedro.'],
    ['O que fez Jesus quando o Pedro se afundou?', 'Estendeu a mão e salvou-o.']
  ],
  wrong: [
    ['Foi dormir a casa.', 'Foi pescar.', 'Foi à cidade comprar pão.'],
    ['A nadar.', 'Noutro barco.', 'Às costas de um peixe.'],
    ['Que era um peixe enorme.', 'Que era um pescador.', 'Que era o vento.'],
    ['O João.', 'Todos os discípulos.', 'Ninguém.'],
    ['Ficou a olhar.', 'Foi-se embora.', 'Atirou-lhe uma corda.']
  ],
  verse: ['Coragem! Sou Eu. Não tenham medo!', 'Mateus 14.27'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(7901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#29475a');
    s += `<rect x="-40" y="570" width="900" height="300" fill="#2d4f7a"/>${waveBand(590, { fill: '#2a4a72', amp: 6, len: 140, dx: 20, d: 7, foam: '#5a7aa6', fw: 3 })}`;
    s += `<path d="M-40,700 C200,676 500,690 840,668 L840,900 L-40,900 Z" fill="#3a5a52"/>`;
    s += `<g opacity=".85">${barco(560, 690, .38, { vela: false })}</g>`;
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
  id: 'aguas',
  title: 'Jesus Anda sobre as Águas',
  cover: { kicker: 'Uma história da Bíblia', title: 'Jesus Anda', small: 'sobre as Águas', sub: 'Coragem! Não tenham medo!' },
  color: '#2f4f8f',
  ref: 'Mateus 14.22-33',
  scenes: SCENES
});
})();
