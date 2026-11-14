/* =====================================================================
   LIVRO: JESUS ACALMA A TEMPESTADE  (Marcos 4.35-41)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const DISC = [
  { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#5e7d4a' },
  { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'short', beard: 'short', beardCol: '#7a4a22', tunic: '#c9a54e', belt: '#6b4a33' },
  { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', tunic: '#e07a3a', belt: '#7b4a2a' }
];
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' }
];
const CRIANCA = { kind: 'child', skin: '#e2a878', hairStyle: 'curly', hair: '#5a3020', hi: '#8a4a2a', tunic: '#7fb2e0', belt: null };
const jesus = o => person(Object.assign({}, JESUS, o));
const BALDE = `<g transform="translate(0,4) scale(1.6)"><path d="M-16,-6 L16,-6 L12,22 L-12,22 Z" fill="#b9c4cf" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-15,4 L15,4" stroke="#8a96a3" stroke-width="3"/><path d="M-14,-6 Q0,-26 14,-6" stroke="${OL}" stroke-width="2.6" fill="none"/><ellipse cx="0" cy="-6" rx="16" ry="4" fill="#4f9fd0" stroke="${OL}" stroke-width="2"/></g>`;

/* ---------- peças desta história ---------- */
// barco de pesca grande; "dentro" fica atrás do casco (só se vê da cintura para cima)
function barcoGrande(x, y, s = 1, o = {}) {
  let g = limb(-30, -60, -30, -340, 9, '#8a5a33');
  if (o.vela !== false) g += `<g data-k="${o.velaK || 'vela'}"><path d="M-22,-330 Q${o.cheia ? 120 : 50},-230 -22,-130 Z" fill="#f4efe6" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-16,-290 Q${o.cheia ? 70 : 30},-230 -16,-170" stroke="#e2d6bd" stroke-width="4" fill="none"/></g>`;
  else g += limb(-30, -320, 40, -300, 6, '#8a5a33');
  g += o.dentro || '';
  g += `<path d="M-250,-70 L250,-70 Q236,6 160,34 L-160,34 Q-236,6 -250,-70 Z" fill="#9a6b3e" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  g += `<path d="M-244,-48 L244,-48 M-228,-20 L228,-20 M-200,8 L200,8" stroke="#7a4e2c" stroke-width="4"/>`;
  g += `<path d="M-256,-74 L256,-74" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M-256,-74 L256,-74" stroke="#b9875a" stroke-width="7" stroke-linecap="round"/>`;
  if (o.agua != null) g += `<g data-k="aguaDentro" opacity="${o.agua}"><path d="M-240,-66 q30,-14 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 L236,-40 L-236,-40 Z" fill="#4f9fd0" opacity=".85"/>${[-180, -40, 120].map(dx => `<path d="M${dx},-78 c-10,-14 -4,-26 8,-30 c-2,10 6,18 -8,30 Z" fill="#9fd3ef" stroke="${OL}" stroke-width="2"/>`).join('')}</g>`;
  g += o.frente || '';
  const anim = o.rock ? `class="sway" style="--r:${o.rock}deg;--d:${o.d ?? 1.4}s"` : `class="bob" style="${dl(4)}"`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g ${anim}>${g}</g>${o.k ? hitC(0, -150, 200) : ''}</g></g>`;
}
// os discípulos dentro do barco
function tripulacao(o = {}) {
  const P = o.pos || [[-180, 0], [-100, 6], [-20, 0], [60, 6]];
  return P.map(([x, y], i) => person(Object.assign({}, DISC[i], { x, y, s: .78, face: o.face || 'smile', look: o.look ?? .3, armL: o.arms ? o.arms[i] : { a: 20 }, armR: o.arms ? o.arms[i] : { a: 20 }, k: o.k ? 'd' + i : '' }, o.extra ? o.extra[i] : {}))).join('');
}
// Jesus a dormir na popa, com a cabeça numa almofada
function jesusDorme(k = 'jesus') {
  return `<g data-k="${k}"><ellipse cx="240" cy="-86" rx="24" ry="11" fill="#e9c46a" stroke="${OL}" stroke-width="2.6"/><g transform="translate(150,-100) rotate(90)"><g>${jesus({ x: 0, y: 90, s: .66, face: 'sleep', cloak: null, armL: { a: 14 }, armR: { a: 14 } })}</g></g></g>`;
}
function ceuTarde() {
  return sky('sky', [[0, '#f0a066'], [.45, '#f8c98e'], [.75, '#fde3b8'], [1, '#fde3b8']]) + sun(640, 300, 44, { face: true });
}
function lagoCalmo(y = 470, o = {}) {
  let s = hill([[-40, y - 50], [220, y - 84], [460, y - 60], [700, y - 90], [840, y - 66]], o.far || '#a9b8a0');
  s += `<rect x="-40" y="${y - 20}" width="900" height="900" fill="${o.c0 || '#6fb0d8'}"/>`;
  s += waveBand(y + 20, { fill: o.c1 || '#5aa3d2', amp: 8, len: 140, dx: 30, d: 6, foam: '#d6eff9', fw: 4 });
  return s;
}
function ondasCalmas(y = 700) {
  return waveBand(y, { fill: '#4f9ccb', amp: 9, len: 150, dx: 30, d: 6, foam: '#d6eff9', fw: 4 }) + waveBand(y + 50, { fill: '#3f8dbf', amp: 10, len: 170, dx: -30, d: 7, foam: '#cfeaf7', fw: 4 });
}
function ondasBravas(y = 640) {
  return waveBand(y, { fill: '#2f5f86', amp: 34, len: 230, dx: 70, d: 1.8, foam: '#dfe9f2', fw: 6 }) + waveBand(y + 70, { fill: '#26507a', amp: 30, len: 200, dx: -60, d: 1.5, foam: '#d0e0ee', fw: 6 });
}
function ceuTempestade(o = {}) {
  let s = sky('ssky', [[0, '#2c3456'], [.6, '#4f5a7e'], [1, '#5f6a8c']]);
  s += `<rect data-k="flash" x="-40" y="-40" width="900" height="900" fill="#ffffff" opacity="0"/>`;
  const bx = o.bx ?? 560;
  s += `<g data-k="bolt" opacity="0"><path d="M${bx},110 L${bx - 36},220 L${bx + 6},216 L${bx - 44},350 L${bx + 46},192 L${bx + 4},196 L${bx + 40},110 Z" fill="#fff6a8" stroke="#f2c14e" stroke-width="5" stroke-linejoin="round"/></g>`;
  const sets = [[110, 100, 1.25], [330, 70, 1.4], [570, 90, 1.3], [770, 70, 1.2], [220, 190, 1], [470, 180, 1.1], [690, 200, .95]];
  s += sets.map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:${i % 2 ? -22 : 24}px;--d:${5 + i}s;${dl(5)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#3f4664', 0)}${blob([[-22, -24, 18], [18, -20, 16]], '#535a78', 0)}</g></g>`).join('');
  s += `<rect class="hit" data-k="nuvens" x="-40" y="-40" width="900" height="300" fill="#000" fill-opacity="0"/>`;
  return s;
}
function relampago(api) {
  api.anim(api.q('flash'), [{ opacity: 0 }, { opacity: .8 }, { opacity: 0 }, { opacity: .5 }, { opacity: 0 }], { duration: 520 });
  api.anim(api.q('bolt'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 1, offset: .7 }, { opacity: 0 }], { duration: 650 });
  api.snd('thunder');
  api.later(() => api.shake(6), 200);
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jesus Acalma a Tempestade',
  alt: 'Num barco no meio do lago, Jesus levanta a mão e as nuvens escuras abrem-se. Os discípulos olham, admirados.',
  cue: [470, 760],
  art() {
    let s = sky('sky', [[0, '#2c3456'], [.35, '#5f6a8c'], [.6, '#f2c98e'], [1, '#fde3b8']], 1100);
    s += `<defs>${rg('raiosol', [[0, '#fff6c8', .9], [.5, '#ffe28a', .35], [1, '#ffe28a', 0]])}</defs><circle cx="480" cy="560" r="300" fill="${UR('raiosol')}"/>`;
    s += [[120, 180, 1.4], [360, 120, 1.6], [640, 170, 1.5]].map(([x, y, sc]) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:20px;--d:9s;${dl(5)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#4f5a7e', 0)}</g></g>`).join('');
    s += `<rect x="-40" y="760" width="900" height="400" fill="#5aa3d2"/>`;
    const dentro = tripulacao({ face: 'surprise', look: .5, pos: [[-190, 0], [-110, 6], [-30, 0], [190, 6]] }) + jesus({ x: 90, y: 6, s: .86, face: 'smile', look: -.2, armL: { a: 20 }, armR: { a: 160, b: -10 }, k: 'jesus' });
    s += barcoGrande(400, 930, 1.05, { dentro });
    s += ondasCalmas(940);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('choir', ['C4', 'G4', 'C5', 'E5']); api.burst(495, 640, 'spark', 8, { col: '#ffe9a6' }); api.bubble(495, 560, 'Silêncio! Acalma-te!', { key: 'j' }); });
  }
});

/* =====================================================================
   1 — VAMOS PARA O OUTRO LADO!
   ===================================================================== */
SCENES.push({
  key: 'partida', title: 'Vamos para o outro lado!', ref: 'Marcos 4.35-36', tint: 'dusk',
  text: [
    'Jesus passou o dia inteiro a ensinar as pessoas, junto ao lago da Galileia. Ao fim da tarde, disse aos discípulos:',
    { q: 'Vamos para o outro lado do lago!', who: 'jesus' },
    'Então, entraram todos no barco e partiram.'
  ],
  fact: 'O lago da Galileia é tão grande que também lhe chamam mar!',
  hint: 'Toca na vela do barco e nas pessoas.',
  alt: 'Ao pôr do sol, Jesus e os discípulos estão num barco junto à margem. Na margem, algumas pessoas dizem adeus.',
  cue: [330, 380],
  art() {
    let s = ceuTarde();
    s += lagoCalmo(470);
    const dentro = tripulacao({ look: .3 }) + jesus({ x: 150, y: 6, s: .82, face: 'joy', look: -.3, armL: { a: 20 }, armR: { a: 70, b: -20 } });
    s += barcoGrande(300, 700, .9, { dentro, cheia: false, velaK: 'vela' });
    s += ondasCalmas(720);
    s += `<path d="M560,560 C620,548 720,540 840,544 L840,900 L470,900 C520,800 540,640 560,560 Z" fill="#e2c891" stroke="${OL}" stroke-width="3"/><path d="M540,640 C560,620 600,606 640,600" stroke="#f4e6c2" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    s += tuft(800, 600, 1.1, '#7a9a4a') + tuft(620, 790, 1, '#7a9a4a');
    const PV = [[620, 720, 0], [700, 706, 2], [770, 724, 1], [690, 770, 3]];
    PV.forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: POVO[p].kind === 'adult' ? .82 : .86, flip: true, face: 'joy', look: .4, armL: { a: 14 }, armR: { a: 150, b: -20 }, k: 'p' + i })));
    s += `<rect class="hit" data-k="velaHit" x="250" y="380" width="160" height="200" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('velaHit'), 'Vela do barco', () => {
      api.snd('wind');
      api.anim(api.q('vela'), [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.5)' }, { transform: 'scaleX(1.2)' }], { duration: 900, fill: 'forwards' });
      if (!api.st.foi) {
        api.st.foi = true;
        api.nudgeNext(2600);
      }
      api.bubble(330, 300, 'Vamos!', { key: 'j' });
    });
    for (let i = 0; i < 4; i++) api.tap(api.q('p' + i), 'Pessoa na margem', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('hello'); api.wave(api.q('p' + i)); api.bubble(x, y - 250 * sc, 'Adeus, Jesus!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   2 — JESUS ADORMECEU
   ===================================================================== */
SCENES.push({
  key: 'dorme', title: 'Jesus adormeceu', ref: 'Marcos 4.38', tint: 'dusk',
  text: [
    'Jesus estava muito cansado. Deitou-se na parte de trás do barco, com a cabeça numa almofada...',
    '...e adormeceu!'
  ],
  fact: 'Jesus era Deus, mas também era homem: também ficava cansado e com sono.',
  hint: 'Toca em Jesus e nos discípulos.',
  alt: 'O barco navega no lago ao entardecer. Na parte de trás, Jesus dorme com a cabeça numa almofada. Os discípulos conversam baixinho.',
  cue: [560, 560],
  art() {
    let s = sky('sky', [[0, '#5a6aa8'], [.5, '#d98a8a'], [.8, '#f2b98a'], [1, '#f2b98a']]);
    s += moon(150, 150, 22);
    s += lagoCalmo(460, { far: '#7a7f9a', c0: '#5a8ec0', c1: '#4f86ba' });
    const dentro = tripulacao({ k: true, look: .4, face: 'smile' });
    s += barcoGrande(380, 700, 1, { dentro, frente: jesusDorme('jesus') });
    s += ondasCalmas(730);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus a dormir', () => { api.snd('snore'); api.bubble(560, 480, 'Zzz...', { key: 'j', size: 30, dur: 1400 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
    for (let i = 0; i < 4; i++) api.tap(api.q('d' + i), 'Discípulo', () => { const [x, y, sc] = api.pos(api.q('d' + i)); api.snd('shh'); api.bubble(x, y - 260 * sc, 'Chiu! Jesus está a dormir.', { key: 'd', size: 26 }); });
  }
});

/* =====================================================================
   3 — VEM AÍ UMA TEMPESTADE!
   ===================================================================== */
SCENES.push({
  key: 'tempestade', title: 'Vem aí uma tempestade!', ref: 'Marcos 4.37', tint: 'stone',
  text: [
    'De repente, começou a soprar um vento muito forte. Veio uma grande tempestade!',
    'As ondas eram enormes e batiam contra o barco.'
  ],
  fact: 'No lago da Galileia, as tempestades podem aparecer de repente, por causa do vento que desce dos montes.',
  hint: 'Toca nas nuvens e nas ondas.',
  alt: 'Nuvens escuras, relâmpagos e ondas enormes. O barco abana muito, e os discípulos estão cheios de medo.',
  cue: [400, 150],
  art() {
    let s = ceuTempestade({});
    s += `<rect x="-40" y="520" width="900" height="400" fill="#3a6a96"/>`;
    const dentro = tripulacao({ face: 'scared', look: 0, arms: [{ a: 150, b: -20 }, { a: 60, b: -60 }, { a: 150, b: -30 }, { a: 40, b: -70 }] });
    s += barcoGrande(400, 690, .95, { dentro, frente: jesusDorme('jesus'), rock: 7, d: 1.2, cheia: true });
    s += `<g data-k="onda">${ondasBravas(680)}</g>`;
    s += `<g style="pointer-events:none">${rainSheet({ n: 60, seed: 11, col: '#c9d8ea' })}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => relampago(api));
    api.tap(api.q('onda'), 'Ondas', () => { api.snd('splash'); api.burst(400, 640, 'ripple', 3); api.bubble(300, 380, 'Socorro!', { key: 'd', size: 30 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('jesus'), 'Jesus a dormir', () => { api.snd('snore'); api.bubble(560, 470, 'Zzz...', { key: 'j', size: 30, dur: 1400 }); });
  }
});

/* =====================================================================
   4 — O BARCO ENCHE-SE DE ÁGUA
   ===================================================================== */
SCENES.push({
  key: 'agua', title: 'O barco enche-se de água', ref: 'Marcos 4.37', tint: 'stone',
  text: [
    'O barco começou a encher-se de água. Os discípulos tiravam a água com baldes, mas a água não parava de entrar!',
    'E Jesus? Continuava a dormir...'
  ],
  fact: 'Alguns discípulos eram pescadores e conheciam bem o lago. Mesmo assim, tiveram muito medo!',
  hint: 'Toca nos baldes para tirar a água.',
  alt: 'No meio da tempestade, os discípulos tiram água do barco com baldes. Jesus continua a dormir na parte de trás.',
  cue: [220, 520],
  art() {
    let s = ceuTempestade({ bx: 640 });
    s += `<rect x="-40" y="520" width="900" height="400" fill="#3a6a96"/>`;
    const dentro = tripulacao({ face: 'worry', look: -.3, k: true, arms: [{ a: 150, b: -40 }, { a: 40, b: -60 }, { a: 150, b: -40 }, { a: 40, b: -60 }], extra: [{ armL: { a: 150, b: -40, item: BALDE } }, {}, { armL: { a: 150, b: -40, item: BALDE } }, {}] });
    s += barcoGrande(400, 690, .95, { dentro, frente: jesusDorme('jesus'), rock: 5, d: 1.3, cheia: true, agua: .4 });
    s += ondasBravas(690);
    s += `<g style="pointer-events:none">${rainSheet({ n: 60, seed: 12, col: '#c9d8ea' })}</g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    for (const i of [0, 2]) api.tap(api.q('d' + i), 'Discípulo com um balde', () => {
      const [x, y, sc] = api.pos(api.q('d' + i));
      api.snd('splash');
      api.hop(api.q('d' + i), 10);
      for (let k = 0; k < 4; k++) api.drop(x - 40 * sc, y - 230 * sc, x - 200 + k * 30, 770, '#7fc4ee');
      api.anim(api.q('aguaDentro'), [{ opacity: .4 }, { opacity: .15 }, { opacity: .45 }], { duration: 1600 });
      if (++n === 3) { api.bubble(400, 360, 'A água não para de entrar!', { key: 'b' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => relampago(api));
    api.tap(api.q('jesus'), 'Jesus a dormir', () => { api.snd('snore'); api.bubble(560, 470, 'Zzz...', { key: 'j', size: 30, dur: 1400 }); });
  }
});

/* =====================================================================
   5 — MESTRE, ACORDA!
   ===================================================================== */
SCENES.push({
  key: 'acorda', title: 'Mestre, acorda!', ref: 'Marcos 4.38', tint: 'stone',
  text: [
    'Cheios de medo, os discípulos acordaram Jesus:',
    { q: 'Mestre, não Te importas? Vamos afundar-nos!', who: 'outro' }
  ],
  fact: 'Os discípulos podiam ter falado com Jesus logo no início da tempestade!',
  hint: 'Toca nos discípulos para acordarem Jesus.',
  alt: 'No barco a abanar, os discípulos rodeiam Jesus, que estava a dormir, e chamam-no muito aflitos.',
  cue: [300, 520],
  art() {
    let s = ceuTempestade({ bx: 240 });
    s += `<rect x="-40" y="520" width="900" height="400" fill="#3a6a96"/>`;
    const dentro = tripulacao({ face: 'shout', look: .6, k: true, pos: [[-200, 0], [-120, 6], [-40, 0], [40, 6]], arms: [{ a: 70, b: -20 }, { a: 150, b: -20 }, { a: 70, b: -20 }, { a: 90, b: -10 }] });
    s += barcoGrande(400, 690, .95, { dentro, frente: `<g data-k="dormindo">${jesusDorme('jesus')}</g><g data-k="acordado" opacity="0" style="pointer-events:none">${jesus({ x: 170, y: 6, s: .82, face: 'smile', look: -.4, armL: { a: 20 }, armR: { a: 40, b: -20 } })}</g>`, rock: 6, d: 1.2, cheia: true, agua: .5 });
    s += ondasBravas(690);
    s += `<g style="pointer-events:none">${rainSheet({ n: 60, seed: 13, col: '#c9d8ea' })}</g>`;
    return s;
  },
  setup(api) {
    const acorda = async (i) => {
      if (i != null) { const [x, y, sc] = api.pos(api.q('d' + i)); api.hop(api.q('d' + i), 12); api.bubble(x, y - 260 * sc, 'Mestre, acorda!', { key: 'd', size: 26 }); }
      api.snd('grunt');
      if (api.st.feito) return;
      api.st.feito = true;
      await api.wait(900);
      api.anim(api.q('dormindo'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('acordado'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('hm');
      api.nudgeNext(2600);
    };
    for (let i = 0; i < 4; i++) api.tap(api.q('d' + i), 'Discípulo', () => acorda(i));
    api.tap(api.q('jesus'), 'Jesus', () => acorda(null));
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => relampago(api));
  }
});

/* =====================================================================
   6 — SILÊNCIO! ACALMA-TE!
   ===================================================================== */
SCENES.push({
  key: 'silencio', title: 'Silêncio! Acalma-te!', ref: 'Marcos 4.39', tint: 'water',
  text: [
    'Jesus levantou-se e disse ao vento e ao mar:',
    { q: 'Silêncio! Acalma-te!', who: 'jesus' },
    'E logo o vento parou, e ficou tudo calmo.'
  ],
  fact: 'Jesus não precisou de remos nem de velas. Bastou uma palavra!',
  hint: 'Toca em Jesus para acalmar a tempestade.',
  alt: 'Jesus está de pé no barco, com o braço estendido. A tempestade para, as nuvens desaparecem e o lago fica calmo.',
  cue: [540, 420],
  art() {
    let s = `<g data-k="calmo">${sky('csky', [[0, '#1f2f66'], [.6, '#3f5a9a'], [1, '#6f8ac0']])}${starField(6101, 40, 0, 0, 800, 420, { big: .2 })}${moon(640, 140, 26)}<rect x="-40" y="520" width="900" height="400" fill="#3f7fb0"/>${ondasCalmas(690)}</g>`;
    s += `<g data-k="tempest">${ceuTempestade({ bx: 200 })}<rect x="-40" y="520" width="900" height="400" fill="#3a6a96"/></g>`;
    const dentro = tripulacao({ face: 'scared', look: .5, pos: [[-200, 0], [-120, 6], [-40, 0], [40, 6]] });
    const jesusPe = jesus({ x: 170, y: 6, s: .86, face: 'determined', look: -.2, armL: { a: 20 }, armR: { a: 120, b: -10 }, k: 'jesus' });
    s += barcoGrande(380, 690, .95, { dentro: dentro + jesusPe, cheia: true });
    s += `<g data-k="ondasB">${ondasBravas(690)}</g>`;
    s += `<g data-k="chuva" style="pointer-events:none">${rainSheet({ n: 60, seed: 14, col: '#c9d8ea' })}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', async () => {
      api.bubble(560, 330, 'Silêncio! Acalma-te!', { key: 'j' });
      if (api.st.feito) { api.snd('chime', 'G6'); return; }
      api.st.feito = true;
      api.snd('choir', ['C4', 'G4', 'C5', 'E5']);
      api.burst(540, 420, 'spark', 10, { col: '#ffe9a6' });
      api.anim(api.q('chuva'), [{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' });
      api.anim(api.q('ondasB'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1600, fill: 'forwards' });
      await api.anim(api.q('tempest'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1800, fill: 'forwards' });
      api.q('nuvens').style.pointerEvents = 'none';
      api.bubble(250, 330, 'Uau!', { key: 'd', size: 34, plain: true });
      api.nudgeNext(2600);
    });
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => { if (!api.st.feito) relampago(api); });
  }
});

/* =====================================================================
   7 — QUEM É ESTE?
   ===================================================================== */
SCENES.push({
  key: 'quem', title: 'Quem é Este?', ref: 'Marcos 4.40-41', tint: 'night',
  text: [
    'Jesus perguntou: «Porque tiveram tanto medo? Ainda não confiam em mim?»',
    'Os discípulos ficaram admirados: «Quem é Este, que até o vento e o mar Lhe obedecem?»'
  ],
  fact: 'Jesus é o Filho de Deus. Até o vento e o mar Lhe obedecem!',
  hint: 'Toca nos discípulos e em Jesus.',
  alt: 'Noite calma e estrelada. No barco, os discípulos olham para Jesus, muito admirados.',
  cue: [560, 470],
  art() {
    let s = sky('sky', [[0, '#1f2f66'], [.6, '#3f5a9a'], [1, '#6f8ac0']]) + starField(6201, 50, 0, 0, 800, 420, { big: .2 }) + moon(150, 140, 26);
    s += `<rect x="-40" y="520" width="900" height="400" fill="#3f7fb0"/>`;
    const dentro = tripulacao({ face: 'o', look: .6, k: true, pos: [[-200, 0], [-120, 6], [-40, 0], [40, 6]] }) + jesus({ x: 170, y: 6, s: .86, face: 'smile', look: -.4, armL: { a: 20 }, armR: { a: 40, b: -20 }, k: 'jesus' });
    s += barcoGrande(380, 690, .95, { dentro, cheia: false });
    s += ondasCalmas(700);
    return s;
  },
  setup(api) {
    for (let i = 0; i < 4; i++) api.tap(api.q('d' + i), 'Discípulo', () => { const [x, y, sc] = api.pos(api.q('d' + i)); api.snd('hm'); api.bubble(x + 20, y - 260 * sc, 'Quem é Este?', { key: 'd', size: 28 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(545, 520, 'heart', 4); api.bubble(545, 420, 'Confiem em mim!', { key: 'j' }); });
  }
});

/* =====================================================================
   8 — QUANDO TIVERES MEDO
   ===================================================================== */
SCENES.push({
  key: 'medo', title: 'Quando tiveres medo', ref: 'Salmo 56.3', tint: 'night',
  text: [
    'E tu? Às vezes também tens medo? Do escuro, de uma trovoada, de alguma coisa nova?',
    'Lembra-te: Jesus está sempre contigo, e podes falar com Ele em qualquer momento!'
  ],
  fact: 'Podes fazer uma oração curtinha: «Jesus, eu confio em Ti!»',
  hint: 'Toca na criança para ela orar.',
  alt: 'De noite, uma criança está sentada na cama durante uma trovoada. Depois de orar, fica calma e a tempestade lá fora acalma.',
  cue: [400, 560],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#3d3a6a"/><g opacity=".35">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${-20 + i * 110}" y="-40" width="54" height="640" fill="#4d4a80"/>`).join('')}</g>`;
    s += `<g transform="translate(560,120)"><rect x="0" y="0" width="200" height="220" rx="10" fill="#1e2a5a" stroke="${OL}" stroke-width="4"/><g data-k="trovoada"><rect x="4" y="4" width="192" height="212" fill="#3a4060"/>${[[50, 60], [140, 50]].map(([x, y]) => `<g transform="translate(${x},${y})">${blob([[-30, 4, 18], [-6, -8, 22], [18, -4, 18], [34, 6, 14]], '#5a6080', 0)}</g>`).join('')}<path data-k="raioJ" d="M110,70 L94,120 L112,118 L92,180 L130,108 L112,110 L128,70 Z" fill="#fff6a8" stroke="#f2c14e" stroke-width="3" opacity="0"/><defs><clipPath id="${ID('janela')}"><rect x="4" y="4" width="192" height="212"/></clipPath></defs><g clip-path="${UR('janela')}">${rainSheet({ n: 70, seed: 21, col: '#9fb4d0' })}</g></g><g data-k="estrelas" opacity="0"><rect x="4" y="4" width="192" height="212" fill="#1e2a5a"/>${starField(6301, 12, 14, 14, 186, 200, { big: .4 })}${moon(140, 60, 16)}</g><path d="M100,0 L100,220 M0,110 L200,110" stroke="#8a6a4a" stroke-width="10"/></g>`;
    s += `<rect x="-40" y="600" width="900" height="300" fill="#6a5a7a"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/>`;
    // cama
    s += `<g transform="translate(400,760)"><rect x="-250" y="-210" width="30" height="230" rx="8" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="220" y="-140" width="30" height="160" rx="8" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="-240" y="-90" width="470" height="70" rx="12" fill="#f4efe6" stroke="${OL}" stroke-width="3"/><ellipse cx="-150" cy="-110" rx="70" ry="30" fill="#fbf6ea" stroke="${OL}" stroke-width="3"/></g>`;
    s += `<g data-k="assustada">${person(Object.assign({}, CRIANCA, { x: 310, y: 700, s: 1, face: 'scared', look: .5, armL: { a: -20, b: -60 }, armR: { a: -20, b: -60 } }))}</g>`;
    s += `<g data-k="calma" opacity="0" style="pointer-events:none">${person(Object.assign({}, CRIANCA, { x: 310, y: 700, s: 1, face: 'sleep', look: 0, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } }))}</g>`;
    s += `<g transform="translate(400,760)"><path d="M-200,-100 C-120,-130 120,-130 230,-96 L236,-20 L-206,-20 Z" fill="#e5483f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-180,-96 C-80,-118 100,-118 210,-90" stroke="#f2c14e" stroke-width="5" fill="none"/></g>`;
    s += sheep({ x: 560, y: 650, s: .55, k: 'ove', wool: '#fffaf0' });
    s += `<rect class="hit" data-k="crianca" x="230" y="440" width="170" height="220" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.later(() => { api.anim(api.q('raioJ'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 500 }); api.snd('thunder'); }, 900);
    api.tap(api.q('crianca'), 'Criança', async () => {
      api.bubble(320, 380, 'Jesus, eu confio em Ti!', { key: 'c' });
      if (api.st.feito) { api.snd('heart'); api.burst(320, 470, 'heart', 4); return; }
      api.st.feito = true;
      api.snd('heart');
      api.anim(api.q('assustada'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('calma'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.burst(320, 470, 'heart', 5);
      await api.wait(600);
      await api.anim(api.q('estrelas'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, fill: 'forwards' });
      api.snd('lullaby');
      api.nudgeNext(2600);
    });
    api.tap(api.q('ove'), 'Ovelhinha de peluche', () => { api.snd('bleat'); api.hop(api.q('ove'), 10); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite calma e estrelada sobre o lago. Um barquinho descansa na água e uma ovelhinha dorme na margem.',
  cue: [430, 160],
  questions: [
    ['Para onde iam Jesus e os discípulos?', 'Para o outro lado do lago.'],
    ['O que fazia Jesus durante a tempestade?', 'Estava a dormir numa almofada.'],
    ['O que disse Jesus ao vento e ao mar?', '«Silêncio! Acalma-te!»'],
    ['O que aconteceu depois?', 'O vento parou e ficou tudo calmo.'],
    ['O que podes fazer quando tens medo?', 'Falar com Jesus e confiar n’Ele.']
  ],
  wrong: [
    ['Para Jerusalém.', 'Para o Egito.', 'Para pescar no mar alto.'],
    ['Estava a remar.', 'Estava a pescar.', 'Estava a cantar.'],
    ['«Mais forte!»', '«Vamos fugir!»', 'Não disse nada.'],
    ['O barco afundou-se.', 'Choveu ainda mais.', 'Apareceu um peixe enorme.'],
    ['Esconder-me debaixo da cama.', 'Gritar muito alto.', 'Não contar a ninguém.']
  ],
  verse: ['Quando eu tiver medo, confiarei em ti.', 'Salmo 56.3'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(6401, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#29475a');
    s += `<rect x="-40" y="580" width="900" height="300" fill="#2d4f7a"/>${waveBand(600, { fill: '#2a4a72', amp: 6, len: 140, dx: 20, d: 7, foam: '#5a7aa6', fw: 3 })}`;
    s += `<g opacity=".9">${barcoGrande(560, 640, .4, { vela: false })}</g>`;
    s += hill([[-40, 720], [160, 690], [360, 712], [480, 740], [480, 900], [-40, 900]], '#2c584f');
    s += sheep({ x: 210, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(230, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'tempestade',
  title: 'Jesus Acalma a Tempestade',
  cover: { kicker: 'Uma história da Bíblia', title: 'Jesus Acalma', small: 'a Tempestade', sub: 'Até o vento e o mar Lhe obedecem' },
  color: '#3f6f9f',
  ref: 'Marcos 4.35-41',
  scenes: SCENES
});
})();
