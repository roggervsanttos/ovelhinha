/* =====================================================================
   LIVRO: A OVELHINHA PERDIDA  (Lucas 15.1-7; João 10.11-14)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const PASTOR = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#4f7d2a', tunic: '#8a6a4a', stripes: '#a8875a', cloak: '#5e7d4a', cloakTrim: '#c9a54e', belt: '#4a3226' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' }
];
const ANJO = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', legs: 'none', hemY: -4, hemW: 50, trim: '#f2c14e' };
const jesus = o => person(Object.assign({}, JESUS, o));
const pastor = o => person(Object.assign({}, PASTOR, o));
const NOMES = [N('Branquinha!'), N('Fofinha!'), N('Bolinha!'), N('Nuvenzinha!'), N('Algodão!')];
// a ovelhinha (menor, com lacinho vermelho)
const LACO = `<g transform="translate(30,-30)"><path d="M0,0 L-9,-7 L-9,7 Z M0,0 L9,-7 L9,7 Z" fill="#e5483f" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><circle r="3.2" fill="#e5483f" stroke="${OL}" stroke-width="1.6"/></g>`;
function ovelhinha(o) {
  const d = Object.assign({ x: 0, y: 0, s: .62 }, o);
  const lo = d.pose === 'sleep' || d.pose === 'lie' ? 18 : 0;
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${d.flip ? -d.s : d.s},${d.s})"${d.k ? ` data-k="${d.k}"` : ''}><g class="act">${sheep(Object.assign({}, d, { x: 0, y: 0, s: 1, k: '', flip: false }))}<g transform="translate(0,${lo})">${LACO}</g>${d.k ? `<ellipse class="hit" cx="4" cy="-34" rx="66" ry="50" fill="#000" fill-opacity="0"/>` : ''}</g></g>`;
}

/* ---------- peças desta história ---------- */
function prado(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 130, sunR: 42 }, o.day || {}));
  s += hill([[-40, 450], [200, 420], [440, 446], [660, 414], [840, 436]], o.far || '#a9cf7a');
  s += hill([[-40, 520], [240, 494], [480, 514], [720, 488], [840, 500]], o.mid || '#8cc464');
  s += hill([[-40, 620], [260, 600], [520, 614], [840, 592]], o.near || '#7bb456');
  return s;
}
function noite(o = {}) {
  let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.85, '#3a4889'], [1, '#4a5896']]);
  s += starField(o.seed || 2201, 60, 0, 0, 800, 420, { big: .1 });
  if (o.moon !== false) s += moon(o.mx ?? 620, o.my ?? 120, 30);
  s += hill([[-40, 470], [200, 440], [440, 462], [660, 432], [840, 452]], '#22385c') + hill([[-40, 560], [240, 532], [480, 552], [720, 526], [840, 540]], '#26455a') + hill([[-40, 640], [260, 620], [520, 634], [840, 612]], '#2c584f');
  return s;
}
function rebanho(rows, seed = 1, o = {}) {
  const R = rng(seed);
  let s = '';
  rows.forEach(([y, sc, xs]) => xs.forEach(x => s += sheep({ x, y: y + (R() - .5) * 10, s: sc * (.92 + R() * .16), flip: R() < .4, pose: o.pose || (R() < .3 ? 'graze' : 'stand'), wool: o.wool || '#fffaf0' })));
  return s;
}
// inside: o que fica dentro do curral (atrás do muro), em coordenadas da cena
function curral(x, y, s = 1, inside = '') {
  const pedras = [];
  for (let i = 0; i < 9; i++) pedras.push([-200 + i * 42 + (i % 2) * 8, -30 - (i % 3) * 4]);
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-220,0 C-220,-60 -150,-90 0,-90 C150,-90 220,-60 220,0 Z" fill="#6f7f5a" opacity=".5"/></g>${inside}<g transform="translate(${x},${y}) scale(${s})"><path d="M-230,10 L-230,-46 L-40,-46 L-40,10 Z M40,10 L40,-46 L230,-46 L230,10 Z" fill="#9a9488" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><g fill="#b3ad9f" stroke="${OL}" stroke-width="2.4">${[-210, -170, -130, -90, 60, 100, 140, 180].map((a, i) => `<rect x="${a}" y="${-42 + (i % 2) * 22}" width="34" height="18" rx="5"/>`).join('')}</g>${limb(-40, 12, -40, -70, 9, '#8a5a33')}${limb(40, 12, 40, -70, 9, '#8a5a33')}</g>`;
}
function espinheiro(x, y, s = 1) {
  let sp = '';
  for (let i = 0; i < 14; i++) { const a = -Math.PI * (i / 13), r = 70 + (i % 3) * 10; sp += `<path d="M${r1(Math.cos(a) * r * .8)},${r1(Math.sin(a) * r * .7 - 10)} l${r1(Math.cos(a) * 16)},${r1(Math.sin(a) * 16)}" stroke="#4a3226" stroke-width="3.4" stroke-linecap="round"/>`; }
  return `<g transform="translate(${x},${y}) scale(${s})">${sp}${blob([[-50, -24, 30], [-14, -48, 36], [28, -40, 34], [58, -16, 24], [0, -14, 34]], '#3f5f3a')}<g stroke="#2a3a26" stroke-width="3" stroke-linecap="round" fill="none"><path d="M-40,-30 l-8,-6 M-10,-56 l-4,-9 M24,-50 l6,-8 M46,-26 l8,-4"/></g></g>`;
}
function lanterna(k = '') {
  return `<g${k ? ` data-k="${k}"` : ''}><circle cx="0" cy="34" r="90" fill="#ffd27a" opacity=".2"/><path d="M0,-6 L0,12" stroke="${OL}" stroke-width="3"/><path d="M-12,12 L12,12 L15,40 L-15,40 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g transform="translate(0,34)"><g class="flicker"><path d="M0,-16 C5,-9 6,-4 4,-1 C2,2 -2,2 -4,-1 C-6,-4 -5,-9 0,-16 Z" fill="#ffb238"/></g></g></g>`;
}
function coruja(x, y, s = 1, k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><ellipse cx="0" cy="-26" rx="24" ry="30" fill="#8a6a4a" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-16" rx="14" ry="16" fill="#c9a87a"/><path d="M-20,-50 L-14,-62 L-6,-52 M20,-50 L14,-62 L6,-52" fill="#8a6a4a" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><circle cx="-9" cy="-38" r="9" fill="#fffaf0" stroke="${OL}" stroke-width="2.4"/><circle cx="9" cy="-38" r="9" fill="#fffaf0" stroke="${OL}" stroke-width="2.4"/><g class="eyes" style="${dl(5)}"><circle cx="-8" cy="-38" r="4.4" fill="${OL}"/><circle cx="10" cy="-38" r="4.4" fill="${OL}"/></g><path d="M-4,-30 L0,-24 L4,-30 Z" fill="#f0a43a" stroke="${OL}" stroke-width="1.6"/>${k ? hitC(0, -30, 40) : ''}</g></g>`;
}
function galho(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">${limb(-120, 0, 120, -20, 16, '#6b4a33')}${limb(40, -12, 90, -60, 10, '#6b4a33')}${blob([[96, -66, 18], [116, -50, 14], [80, -78, 12]], '#2f4a3a', 2.6)}</g>`;
}
// pastor com a ovelhinha nos ombros
// pastor com a ovelhinha nos ombros: o corpo de lã fica atrás da cabeça,
// as patinhas caem na frente dos ombros e a cabeça da ovelhinha aparece do lado
function pastorOmbros(o) {
  const ink = '#4b3d38', W = '#fffaf0';
  const back = blob([[-74, -196, 16], [-56, -208, 19], [-32, -216, 21], [-6, -220, 22], [20, -218, 21], [44, -210, 19], [62, -198, 15], [-44, -192, 16], [34, -192, 16]], W) + `<g fill="none" stroke="#e6dcc7" stroke-width="2.6" stroke-linecap="round"><path d="M-66,-206 q6,-6 12,0"/><path d="M-40,-218 q6,-6 12,0"/><path d="M30,-216 q6,-6 12,0"/></g>` + blob([[-90, -200, 7]], W, 2.6);
  let front = limb(-58, -190, -62, -150, 7, ink) + limb(-70, -186, -76, -152, 7, ink) + limb(52, -190, 56, -150, 7, ink) + limb(64, -188, 70, -152, 7, ink);
  front += `<g transform="translate(70,-214) scale(1.05)"><ellipse cx="-3" cy="-5" rx="12" ry="5.4" transform="rotate(-32 -3 -5)" fill="${ink}" stroke="${OL}" stroke-width="2.6"/><ellipse cx="10" cy="4" rx="13.5" ry="17" transform="rotate(-28 10 4)" fill="${ink}" stroke="${OL}" stroke-width="2.8"/><g class="eyes" style="${dl(5)}"><circle cx="13" cy="-3" r="4.4" fill="#fff"/><circle cx="14.2" cy="-3" r="2.5" fill="${OL}"/></g>${blob([[2, -12, 7.5], [10, -14, 6.5]], W, 2.6)}<ellipse cx="22" cy="14" rx="2.6" ry="1.8" fill="#2a1d1d" opacity=".55"/></g>`;
  front += `<g transform="translate(58,-196)"><path d="M0,0 L-9,-7 L-9,7 Z M0,0 L9,-7 L9,7 Z" fill="#e5483f" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><circle r="3.2" fill="#e5483f" stroke="${OL}" stroke-width="1.6"/></g>`;
  return pastor(Object.assign({ backItems: back, front, armL: { a: 135, b: -125 }, armR: { a: 135, b: -125 } }, o));
}
function wings(sc = 1) {
  const w = s => `<path transform="scale(${s},1)" d="M10,-176 C40,-210 110,-228 130,-190 C140,-172 128,-156 112,-150 C128,-140 130,-120 114,-108 C126,-96 120,-78 102,-74 C80,-70 40,-100 10,-140 Z" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path transform="scale(${s},1)" d="M40,-176 C70,-190 100,-196 112,-184 M44,-156 C76,-162 100,-162 110,-150 M48,-134 C76,-136 96,-130 104,-116" stroke="#dfe6f2" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="scale(${sc})"><g class="flapw2" style="${dl(2)}">${w(1)}</g><g class="flapw2" style="${dl(2)}">${w(-1)}</g></g>`;
}
const glowDefs = () => `<defs>${rg('aglow', [[0, '#fff6c8', .95], [.55, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs>`;
function anjo(o) {
  return person(Object.assign({}, ANJO, { backItems: `<circle cx="0" cy="-120" r="150" fill="${UR('aglow')}"/>` + wings(1), cls: 'hover' }, o));
}
function trombeta() {
  return `<g transform="rotate(-60)"><path d="M0,0 L90,-8 L112,-22 L112,10 L90,2 L0,6 Z" fill="#f2c14e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'A Ovelhinha Perdida',
  alt: 'No campo verde, ao nascer do sol, um pastor sorridente leva a ovelhinha perdida aos ombros. Ela tem um lacinho vermelho. Outras ovelhas pastam por perto.',
  cue: [400, 820],
  art() {
    let s = sky('sky', [[0, '#86cbef'], [.45, '#cdeefa'], [.62, '#fdf0d8'], [1, '#fdf0d8']], 1100);
    s += sun(640, 560, 46, { face: true });
    s += hill([[-40, 740], [200, 712], [440, 736], [660, 704], [840, 726]], '#a9cf7a') + hill([[-40, 820], [240, 794], [480, 814], [720, 788], [840, 800]], '#8cc464') + hill([[-40, 910], [260, 890], [520, 904], [840, 882]], '#7bb456');
    s += rebanho([[812, .4, [80, 160, 600, 690, 760]], [890, .5, [60, 700]]], 3);
    s += flowerBand(2301, 960, 1080, 10);
    s += pastorOmbros({ x: 400, y: 1056, s: 1.12, face: 'joy', look: .1, k: 'pastor' });
    s += sheep({ x: 600, y: 1066, s: .7, k: 'ove' });
    return s;
  },
  setup(api) {
    api.tap(api.q('pastor'), 'Pastor com a ovelhinha', () => { api.snd('bleat', 1.4); api.burst(400, 800, 'heart', 5); api.bubble(400, 730, 'Encontrei-te!', { key: 'p' }); });
    api.tap(api.q('ove'), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q('ove'), 10); });
  }
});

/* =====================================================================
   1 — JESUS CONTA UMA HISTÓRIA
   ===================================================================== */
SCENES.push({
  key: 'conta', title: 'Jesus conta uma história', ref: 'Lucas 15.1-3', tint: 'meadow',
  text: [
    'Jesus gostava de contar histórias. Toda a gente se sentava à volta para ouvir.',
    'Um dia, ele contou a história de uma ovelhinha...'
  ],
  fact: 'As histórias que Jesus contava chamam-se parábolas. Ensinam coisas sobre Deus.',
  hint: 'Toca em Jesus, nas crianças e no balão.',
  alt: 'Debaixo de uma árvore, Jesus está sentado e conta uma história. Crianças e adultos sentados na relva escutam. Num balão de pensamento aparece uma ovelhinha.',
  cue: [560, 210],
  art() {
    let s = prado({});
    s += olive(170, 600, 1.4, {});
    s += rock(260, 700, 180, 46, {});
    s += jesus({ x: 260, y: 700, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'joy', look: .6, armL: { a: 30, b: 40 }, armR: { a: 100, b: -40 }, k: 'jesus' });
    s += `<g data-k="balao"><g class="act"><g fill="#fffdf6" stroke="${OL}" stroke-width="3.4"><circle cx="380" cy="380" r="10"/><circle cx="410" cy="340" r="16"/></g>${blob([[480, 230, 50], [540, 200, 60], [610, 220, 54], [650, 270, 40], [580, 280, 52], [510, 280, 44]], '#fffdf6', 3.4)}${ovelhinha({ x: 560, y: 286, s: .56 })}${hitC(560, 240, 100)}</g></g>`;
    POVO.slice(0, 5).forEach((p, i) => {
      const [x, y] = [[460, 700], [560, 690], [660, 704], [520, 790], [700, 796]][i];
      s += person(Object.assign({}, p, p.kind === 'adult' ? { legs: 'sit', drop: 30, hemY: -62 } : { legs: 'sit' }, { x, y, s: p.kind === 'child' ? .9 : .82, face: 'smile', look: -.6, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'p' + i }));
    });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(260, 460, 'Vou contar uma história!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    api.tap(api.q('balao'), 'Balão com a ovelhinha', () => { api.snd('bleat', 1.4); api.hop(api.q('balao'), 10); });
    POVO.slice(0, 5).forEach((_, i) => api.tap(api.q('p' + i), 'Pessoa a escutar', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('laugh'); api.bubble(x, y - 210 * sc, i % 2 ? 'Conta, Jesus!' : 'Que bom! Uma história!', { key: 'p', size: 26 }); }));
  }
});

/* =====================================================================
   2 — CEM OVELHAS
   ===================================================================== */
const FRENTE = [[300, 716, .9], [430, 738, .86], [560, 720, .92], [680, 742, .86], [360, 650, .74]];
SCENES.push({
  key: 'pastor', title: 'Cem ovelhas', ref: 'Lucas 15.4; João 10.3', tint: 'meadow',
  text: [
    'Era uma vez um pastor que tinha cem ovelhas. Cem! São ovelhas sem fim!',
    'Cuidava de cada uma com carinho e sabia o nome de todas.'
  ],
  fact: 'As ovelhas conhecem a voz do seu pastor e seguem-no!',
  hint: 'Toca nas ovelhas para saberes o nome delas.',
  alt: 'Num campo verde, o pastor, com o seu cajado, cuida de um rebanho enorme. À frente, cinco ovelhas e uma ovelhinha pequena com lacinho vermelho.',
  cue: [300, 660],
  art() {
    let s = prado({});
    s += rebanho([[470, .3, [60, 120, 180, 240, 300, 380, 440, 500, 580, 640, 720, 780]], [540, .4, [40, 120, 200, 280, 460, 540, 620, 700, 770]], [620, .52, [60, 160, 500, 600, 720]]], 5);
    s += pastor({ x: 130, y: 750, s: 1.06, face: 'joy', look: .6, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 60, b: -20 }, k: 'pastor' });
    FRENTE.forEach(([x, y, sc], i) => s += sheep({ x, y, s: sc, flip: i % 2 === 1, k: 'o' + i }));
    s += ovelhinha({ x: 486, y: 664, s: .56, k: 'pequena' });
    return s;
  },
  setup(api) {
    FRENTE.forEach(([x, y, sc], i) => api.tap(api.q('o' + i), 'Ovelha', () => { api.snd('bleat', .9 + i * .08); api.hop(api.q('o' + i), 10); api.bubble(x, y - 90 * sc, NOMES[i], { key: 'n', size: 30, plain: true, dur: 1100 }); }));
    api.tap(api.q('pequena'), 'Ovelhinha pequena', () => { api.snd('bleat', 1.5); api.hop(api.q('pequena'), 14); api.bubble(486, 604, 'Pequenina!', { key: 'n', size: 30, plain: true, dur: 1100 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(1800); } });
    api.tap(api.q('pastor'), 'Pastor', () => { api.snd('hello'); api.bubble(140, 480, 'Olá, minhas ovelhinhas!', { key: 'p' }); });
  }
});

/* =====================================================================
   3 — FALTOU UMA!
   ===================================================================== */
const FILA = [[500, 724], [610, 734], [720, 724]];
SCENES.push({
  key: 'noite', title: 'Falta uma!', ref: 'Lucas 15.4', tint: 'dusk',
  text: [
    'Ao fim do dia, o pastor contou as ovelhas que entravam no curral: noventa e sete, noventa e oito, noventa e nove...',
    'Oh! Faltava uma! Faltava a ovelhinha pequenina!'
  ],
  fact: 'O pastor ficava à porta do curral, a contar as ovelhas uma a uma.',
  hint: 'Toca nas ovelhas para elas entrarem no curral.',
  alt: 'No fim da tarde, o pastor fica à porta de um curral de pedras e conta as ovelhas que entram. Três ovelhas esperam na fila. A ovelhinha de lacinho não está lá.',
  cue: [500, 660],
  art() {
    let s = prado({ day: { sky: [[0, '#f6a46a'], [.5, '#fde2b8'], [1, '#fdf0e2']], sunX: 640, sunY: 400, sunR: 44, clouds: false }, far: '#b6b07a', mid: '#9cb46a', near: '#8aa65a' });
    s += curral(250, 640, 1, rebanho([[612, .42, [90, 140, 190, 330, 380, 420]]], 9) + `<g style="pointer-events:none">${[0, 1, 2].map(i => `<g data-k="dentro${i}" opacity="0">${sheep({ x: [230, 160, 360][i], y: 616, s: .44, flip: true })}</g>`).join('')}</g>`);
    s += pastor({ x: 330, y: 740, s: 1.02, face: 'smile', look: .6, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 60, b: -30 }, k: 'pastor' });
    FILA.forEach(([x, y], i) => s += sheep({ x, y, s: .8, flip: true, k: 'f' + i }));
    return s;
  },
  setup(api) {
    let n = 0;
    const entra = async () => {
      if (n >= 3) { api.snd('hm'); api.bubble(330, 500, 'Onde está a ovelhinha pequenina?', { key: 'p' }); return; }
      const i = n++, el = api.q('f' + i);
      api.snd('bleat', 1 + i * .1);
      api.anim(api.act(el), [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: 'translate(-120px,-60px) scale(.8)', opacity: 1, offset: .7 }, { transform: 'translate(-180px,-120px) scale(.5)', opacity: 0 }], { duration: 800, fill: 'forwards' });
      el.style.pointerEvents = 'none';
      api.bubble(330, 520, ['Noventa e sete!', 'Noventa e oito!', 'Noventa e nove!'][i], { key: 'n', size: 30, plain: true, dur: 1200 });
      api.later(() => api.anim(api.q('dentro' + i), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' }), 700);
      if (n === 3) {
        await api.wait(1400);
        api.snd('gulp');
        api.shakeHead(api.q('pastor'));
        api.bubble(330, 500, 'Oh! Falta uma!', { key: 'p', dur: 2400 });
        api.nudgeNext(2800);
      }
    };
    FILA.forEach((_, i) => api.tap(api.q('f' + i), 'Ovelha na fila', entra));
    api.tap(api.q('pastor'), 'Pastor', entra);
  }
});

/* =====================================================================
   4 — PERDIDA NO ESCURO
   ===================================================================== */
SCENES.push({
  key: 'perdida', title: 'Perdida no escuro', ref: 'Lucas 15.4', tint: 'night',
  text: [
    'Onde estava a ovelhinha? Tinha ido passear sozinha, foi para longe... e perdeu-se!',
    'Agora ela estava presa num espinheiro, no escuro. Méééé!'
  ],
  fact: 'Uma ovelha perdida não sabe voltar sozinha. Precisa do pastor!',
  hint: 'Toca na ovelhinha e na coruja.',
  alt: 'Noite escura num monte de pedras. A ovelhinha de lacinho está presa num arbusto de espinhos e chora. Uma coruja observa de um ramo.',
  cue: [420, 640],
  art() {
    let s = noite({ mx: 160, my: 120 });
    s += galho(650, 300, 1.1);
    s += coruja(700, 286, 1.1, 'coruja');
    s += rock(170, 760, 260, 150, { fill: '#6a6a7a', shade: '#55556a', hi: '#8a8a9a' }) + rock(690, 780, 220, 110, { fill: '#6a6a7a', shade: '#55556a', hi: '#8a8a9a' });
    s += espinheiro(440, 690, 1.3);
    s += ovelhinha({ x: 400, y: 716, s: .92, k: 'ovelhinha' });
    s += `<g style="pointer-events:none" stroke-linecap="round">${['M300,650 C340,640 380,666 420,650 C450,640 480,656 520,640', 'M330,710 C360,690 400,706 440,692 C470,684 500,698 540,680'].map(d => `<path d="${d}" stroke="${OL}" stroke-width="9" fill="none"/><path d="${d}" stroke="#6b4a33" stroke-width="4" fill="none"/>`).join('')}<g stroke="#4a3226" stroke-width="3.4">${[[330, 646, -1], [372, 654, 1], [410, 652, -1], [456, 644, 1], [496, 646, -1], [356, 698, 1], [398, 700, -1], [452, 690, 1], [512, 688, -1]].map(([x, y, k]) => `<path d="M${x},${y} l${k * 6},-12"/>`).join('')}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('ovelhinha'), 'Ovelhinha perdida', () => {
      api.snd('bleat', 1.5);
      api.anim(api.act(api.q('ovelhinha')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0px)' }], { duration: 400 });
      api.bubble(400, 590, 'Méééé! Estou com medo!', { key: 'o' });
      if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); }
    });
    api.tap(api.q('coruja'), 'Coruja', () => { api.snd('coo'); api.hop(api.q('coruja'), 8); api.bubble(700, 200, 'Uh-uh!', { key: 'c', size: 30, plain: true, dur: 1100 }); });
  }
});

/* =====================================================================
   5 — CADÊ VOCÊ?
   ===================================================================== */
const MOITAS = [[160, 700, 1], [420, 660, .9], [650, 720, 1.1]];
SCENES.push({
  key: 'procura', title: 'Onde estás?', ref: 'Lucas 15.4', tint: 'night',
  text: [
    'O pastor deixou as noventa e nove no campo e foi procurar a ovelhinha.',
    'Subiu montes, desceu vales, olhou atrás das moitas: «Ovelhinha! Onde estás?»'
  ],
  fact: 'Um bom pastor não desiste. Procura até encontrar!',
  hint: 'Toca nas moitas para procurares.',
  alt: 'De noite, o pastor anda com uma lanterna e procura atrás de três moitas. Atrás delas aparecem um coelho, um sapo e, finalmente, a ovelhinha.',
  cue: [160, 640],
  art() {
    let s = noite({ seed: 2501 });
    s += pastor({ x: 300, y: 560, s: .8, legs: 'walk', face: 'worry', look: .6, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 60, b: -60, item: lanterna() }, k: 'pastor' });
    MOITAS.forEach(([x, y, sc], i) => {
      const achados = `<g data-k="m${i}a" opacity="0">${rabbit({ x: 0, y: -40, s: .8 })}</g><g data-k="m${i}b" opacity="0">${frog(0, -60, 1.1)}</g><g data-k="m${i}c" opacity="0">${ovelhinha({ x: -10, y: -40, s: .6 })}</g>`;
      s += `<g transform="translate(${x},${y}) scale(${sc})" data-k="m${i}"><g style="pointer-events:none">${achados}</g><g data-k="m${i}f"><g class="act">${shrub(0, 0, 1.1, ['#3f6a3a', '#4a7a42', '#3a6246'][i], { hi: '#5a8a50' })}</g></g>${hitC(0, -40, 80)}</g>`;
    });
    return s;
  },
  setup(api) {
    let n = 0;
    MOITAS.forEach(([x, y, sc], i) => api.tap(api.q('m' + i), 'Moita', async () => {
      if (api.st['m' + i]) { api.snd('swish'); api.hop(api.q('m' + i + 'f'), 6); return; }
      api.st['m' + i] = true;
      const ach = ['a', 'b', 'c'][n++];
      api.snd('swish');
      await api.anim(api.act(api.q('m' + i + 'f')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-8px,0px) rotate(-3deg)' }, { transform: 'translate(8px,0px) rotate(3deg)' }, { transform: 'translate(70px,10px)' }], { duration: 600, fill: 'forwards' });
      api.anim(api.q('m' + i + ach), [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 400, fill: 'forwards' });
      if (ach === 'a') { api.snd('boing'); api.bubble(x, y - 150 * sc, 'Um coelho!', { key: 'b' }); }
      if (ach === 'b') { api.snd('ribbit'); api.bubble(x, y - 150 * sc, 'Um sapo!', { key: 'b' }); }
      if (ach === 'c') { api.snd('tada'); api.burst(x, y - 70, 'heart', 8); api.bubble(x, y - 150 * sc, 'Encontrei-te!', { key: 'b' }); api.nudgeNext(2400); }
    }));
    api.tap(api.q('pastor'), 'Pastor', () => { api.snd('hm'); api.bubble(310, 360, 'Ovelhinha! Onde estás?', { key: 'p' }); });
  }
});

/* =====================================================================
   6 — ACHOU!
   ===================================================================== */
SCENES.push({
  key: 'achou', title: 'Encontrou-a!', ref: 'Lucas 15.5', tint: 'gold',
  text: [
    'O pastor encontrou a ovelhinha e ficou muito feliz! Não ralhou com ela.',
    'Pegou na ovelhinha com carinho e pô-la aos ombros.'
  ],
  fact: 'Levar a ovelha aos ombros era a maneira mais segura de a levar para casa.',
  hint: 'Toca no pastor.',
  alt: 'Ao amanhecer. O pastor ajoelha-se e abraça a ovelhinha. Depois, levanta-se com a ovelhinha aos ombros, os dois muito felizes.',
  cue: [420, 520],
  art() {
    let s = sky('sky', [[0, '#5a6aa8'], [.45, '#f6b37a'], [.7, '#fde2b8'], [1, '#fdf0e2']]);
    s += sun(600, 470, 46, { face: true });
    s += hill([[-40, 470], [200, 444], [440, 466], [660, 436], [840, 456]], '#8a9a7a') + hill([[-40, 560], [240, 532], [480, 552], [720, 526], [840, 540]], '#7a9a6a') + hill([[-40, 640], [260, 620], [520, 634], [840, 612]], '#6f8f5a');
    s += espinheiro(650, 720, .9);
    s += `<g data-k="abraco">${pastor({ x: 360, y: 690, s: 1.06, legs: 'kneel', face: 'joy', look: .5, armL: { a: 14, item: ITEM.staff(230, -1) }, armR: { a: 64, b: -20 } })}${ovelhinha({ x: 476, y: 736, s: .74, flip: true })}</g>`;
    s += `<g data-k="ombros" opacity="0" style="pointer-events:none">${pastorOmbros({ x: 400, y: 740, s: 1.08, face: 'laugh', look: .1 })}</g>`;
    s += `<rect class="hit" data-k="toque" x="250" y="360" width="320" height="400" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('toque'), 'Pastor e ovelhinha', async () => {
      if (api.st.ok) { api.snd('bleat', 1.5); api.burst(400, 470, 'heart', 5); return; }
      api.st.ok = true;
      api.snd('whoosh');
      api.anim(api.q('abraco'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      await api.anim(api.q('ombros'), [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 500, fill: 'forwards' });
      api.snd('tada');
      api.burst(400, 480, 'heart', 8);
      api.bubble(400, 400, 'Vamos para casa!', { key: 'p' });
      api.nudgeNext(2400);
    });
  }
});

/* =====================================================================
   7 — FESTA!
   ===================================================================== */
const VIZ = [[85, 770, 0], [180, 796, 1], [610, 786, 3], [715, 770, 2]];
SCENES.push({
  key: 'festa', title: 'Venham fazer festa!', ref: 'Lucas 15.6', tint: 'rose',
  text: [
    'O pastor voltou para casa e chamou os amigos e os vizinhos:',
    { q: 'Venham fazer festa comigo! Encontrei a minha ovelha perdida!', who: 'pastor' }
  ],
  fact: 'Quando encontramos uma coisa muito importante, apetece contar a toda a gente!',
  hint: 'Toca nos amigos, no pastor e na pandeireta.',
  alt: 'De manhã, na vila, o pastor chega com a ovelhinha aos ombros. Amigos e vizinhos saltam de alegria, batem palmas e tocam pandeireta.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += hill([[-40, 470], [200, 450], [420, 466], [640, 440], [840, 458]], '#a9cf7a');
    s += house(40, 560, 170, 150, {}) + house(600, 560, 180, 160, {});
    s += `<rect x="-40" y="560" width="900" height="360" fill="#e2cf9f"/>`;
    s += `<g stroke="${OL}" stroke-width="2">${[[120, 0], [200, 1], [280, 2], [520, 3], [600, 4], [680, 0]].map(([x, c], i) => `<path d="M${x},${300 + (i % 2) * 14} l-14,24 l28,0 Z" fill="${['#e5483f', '#f2c14e', '#3f93c7', '#5fb35a', '#e86a9a'][c]}"/>`).join('')}</g><path d="M60,296 Q400,350 740,296" stroke="${OL}" stroke-width="3" fill="none"/>`;
    s += pastorOmbros({ x: 440, y: 776, s: 1.08, face: 'laugh', look: 0, k: 'pastor' });
    VIZ.forEach(([x, y, p], i) => {
      const P = POVO[p];
      s += person(Object.assign({}, P, { x, y, s: P.kind === 'child' ? .9 : .96, legs: i % 2 ? 'hop' : 'stand', face: 'laugh', look: x < 400 ? .6 : -.6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'v' + i }));
    });
    s += `<g data-k="pandeiro"><g class="act">${person(Object.assign({}, POVO[6], { x: 290, y: 690, s: .8, face: 'laugh', look: .5, armL: { a: 20 }, armR: { a: 150, b: -30, item: `<g transform="rotate(30)"><circle r="20" fill="#e9c46a" stroke="${OL}" stroke-width="3"/><circle r="12" fill="#f6e3b8"/></g>` } }))}${hitC(300, 560, 70)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('pastor'), 'Pastor', () => { api.snd('fanfare'); api.bubble(440, 480, 'Encontrei a minha ovelha perdida!', { key: 'p' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    VIZ.forEach(([x], i) => api.tap(api.q('v' + i), 'Amigo', () => { api.snd('clap'); api.hop(api.q('v' + i), 16); api.burst(x, 560, 'confetti', 10); }));
    api.tap(api.q('pandeiro'), 'Pandeireta', () => { api.snd('tambourine'); api.hop(api.q('pandeiro'), 8); api.burst(330, 500, 'note', 5); });
  }
});

/* =====================================================================
   8 — FESTA NO CÉU
   ===================================================================== */
SCENES.push({
  key: 'ceu', title: 'Festa no céu', ref: 'Lucas 15.7,10', tint: 'sky',
  text: [
    'Jesus explicou: Deus é como este pastor. Ama cada pessoa e vai atrás de quem está perdido.',
    'E quando alguém volta para Deus, há festa no céu!'
  ],
  fact: 'Para Deus, cada pessoa é importante. Até a mais pequenina!',
  hint: 'Toca nos anjos e no coração.',
  alt: 'No céu azul cheio de nuvens, anjos alegres tocam trombetas. No meio, um coração grande brilha.',
  cue: [400, 400],
  art() {
    let s = sky('sky', [[0, '#7cc6f0'], [.6, '#cdeefa'], [1, '#fff6e0']]) + glowDefs();
    s += cloud(120, 640, 1.6) + cloud(400, 700, 2) + cloud(680, 640, 1.6) + cloud(250, 160, 1) + cloud(600, 140, .9);
    s += `<g transform="translate(400,400)" data-k="coracao"><g class="act"><circle r="150" fill="${UR('aglow')}"/><path d="${'M0,30 C-50,-10 -80,-40 -60,-70 C-40,-100 -10,-90 0,-60 C10,-90 40,-100 60,-70 C80,-40 50,-10 0,30 Z'}" transform="scale(1.6)" fill="#e8475f" stroke="${OL}" stroke-width="2.6"/>${hitC(0, -40, 110)}</g></g>`;
    s += anjo({ x: 170, y: 560, s: .82, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 110, b: -30, item: trombeta() }, k: 'a0' });
    s += anjo({ x: 630, y: 560, s: .82, flip: true, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 110, b: -30, item: trombeta() }, k: 'a1' });
    return s;
  },
  setup(api) {
    for (const k of ['a0', 'a1']) api.tap(api.q(k), 'Anjo', () => { api.snd('fanfare'); api.burst(k === 'a0' ? 260 : 540, 330, 'note', 5); });
    api.tap(api.q('coracao'), 'Coração', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.anim(api.act(api.q('coracao')), [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 600 }); api.burst(400, 340, 'heart', 10); api.burst(400, 340, 'confetti', 14); if (!api.st.n) { api.st.n = true; api.bubble(400, 180, 'Deus ama-te!', { key: 'c' }); api.nudgeNext(2600); } });
  }
});

/* =====================================================================
   9 — O BOM PASTOR
   ===================================================================== */
const CRIANCAS = [[200, 790, POVO[1]], [600, 790, POVO[3]], [700, 800, POVO[5]]];
SCENES.push({
  key: 'bompastor', title: 'O bom pastor', ref: 'João 10.11,14', tint: 'meadow',
  text: [
    'Jesus também disse:',
    { q: 'Eu sou o bom pastor. Eu conheço as minhas ovelhas, e elas conhecem-me.', who: 'jesus' },
    'Jesus é o nosso bom pastor. Ele conhece-te pelo nome!'
  ],
  fact: 'Jesus cuida de nós como um pastor cuida das ovelhas: com muito amor.',
  hint: 'Toca na ovelhinha, em Jesus e nas crianças.',
  alt: 'Num campo florido, Jesus tem a ovelhinha de lacinho ao colo e sorri. Crianças felizes estão à volta dele.',
  cue: [440, 610],
  art() {
    let s = prado({});
    s += rebanho([[520, .4, [60, 140, 640, 720]], [600, .5, [90, 700]]], 11);
    s += flowerBand(2901, 700, 800, 10);
    s += jesus({ x: 400, y: 780, s: 1.1, face: 'joy', look: .3, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'jesus' });
    s += ovelhinha({ x: 420, y: 650, s: .62, k: 'ovelhinha' });
    CRIANCAS.forEach(([x, y, p], i) => s += person(Object.assign({}, p, { x, y, s: 1, face: 'joy', look: x < 400 ? .6 : -.6, legs: i === 1 ? 'hop' : 'stand', armL: { a: i === 1 ? 150 : 30, b: i === 1 ? -20 : 30 }, armR: { a: i === 1 ? 150 : 40, b: i === 1 ? -20 : 40 }, k: 'k' + i })));
    return s;
  },
  setup(api) {
    api.tap(api.q('ovelhinha'), 'Ovelhinha', () => { api.snd('bleat', 1.5); api.burst(430, 590, 'heart', 6); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.bubble(400, 470, 'Eu cuido de ti!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    const FALAS = [N('Jesus conhece-me!'), N('Jesus é o meu pastor!'), N('Eu amo Jesus!')];
    CRIANCAS.forEach(([x], i) => api.tap(api.q('k' + i), 'Criança', () => { api.snd('laugh'); api.hop(api.q('k' + i), 14); api.bubble(x, 560, FALAS[i], { key: 'k' }); }));
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada. No curral de pedras, as ovelhas dormem. A ovelhinha de lacinho dorme à frente, quentinha e segura.',
  cue: [430, 160],
  questions: [
    ['Quantas ovelhas tinha o pastor?', 'Cem!'],
    ['Quantas se perderam?', 'Uma, a ovelhinha pequenina.'],
    ['O que é que o pastor fez?', 'Procurou até a encontrar!'],
    ['Onde é que ele levou a ovelhinha?', 'Aos ombros, todo feliz!'],
    ['Quem é o nosso bom pastor?', 'Jesus!']
  ],
  wrong: [
    ['Dez.', 'Cinco.', 'Mil.'],
    ['Nenhuma.', 'Dez ovelhas.', 'Todas.'],
    ['Foi dormir.', 'Esqueceu-se dela.', 'Comprou outra ovelha.'],
    ['Puxada por uma corda.', 'Num carro.', 'Ficou lá sozinha.'],
    ['O rei.', 'O lobo.', 'Um soldado.']
  ],
  verse: ['Eu sou o bom pastor.', 'João 10.11'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(3001, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += `<g opacity=".9">${curral(600, 700, .6)}</g>`;
    s += rebanho([[684, .32, [540, 590, 650]]], 13, { pose: 'sleep', wool: '#d9dcea' });
    s += ovelhinha({ x: 300, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
  id: 'ovelha',
  title: 'A Ovelhinha Perdida',
  cover: { kicker: 'Uma história da Bíblia', title: 'A Ovelhinha', small: 'Perdida', sub: 'Deus procura cada um de nós' },
  color: '#4f7d2a',
  ref: 'Lucas 15.1-7; João 10.11-14',
  scenes: SCENES
});
})();
