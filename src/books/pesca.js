/* =====================================================================
   LIVRO: PEDRO, TIAGO E JOÃO NO BARQUINHO — a pesca milagrosa  (Lucas 5.1-11)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
// os mesmos discípulos do livro da tempestade
const PEDRO = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' };
const ANDRE = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e7d4a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#5e7d4a' };
const TIAGO = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'short', beard: 'short', beardCol: '#7a4a22', tunic: '#c9a54e', belt: '#6b4a33' };
const JOAO = { kind: 'adult', skin: '#d99a6c', hair: '#2b1d17', hairStyle: 'curly', hi: '#5a3020', tunic: '#e07a3a', belt: '#7b4a2a' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' }
];
const NOMES = [N('Pedro'), N('Tiago'), N('João')];
const p = (who, o) => person(Object.assign({}, who, o));
const SIT = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
function peixe(x, y, s = 1, col = '#9fb4c8', o = {}) {
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})"${o.k ? ` data-k="${o.k}"` : ''}${o.hidden ? ' opacity="0"' : ''}><path d="M-22,0 C-12,-14 14,-14 24,0 C14,14 -12,14 -22,0 Z" fill="${col}" stroke="${OL}" stroke-width="2.6"/><path d="M-20,0 L-34,-11 L-32,11 Z" fill="${col}" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><path d="M2,-10 Q-2,0 2,10" stroke="#fff" stroke-width="2.6" fill="none" opacity=".6"/>${eyeDot(13, -3, 2.6)}</g>`;
}
const CORES = ['#9fb4c8', '#c9d6e0', '#e0a85a', '#8aa0b8', '#b8c9a0'];
// monte de peixes dentro do barco (aparece por cima da borda)
function monte(seed, n = 14, w = 380, k = '', hidden = false) {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = r1(-w / 2 + R() * w), y = r1(-84 - R() * 34), a = r1((R() - .5) * 70);
    s += `<g transform="translate(${x},${y}) rotate(${a})">${peixe(0, 0, .9 + R() * .3, CORES[i % CORES.length], { flip: R() < .5 })}</g>`;
  }
  return `<g${k ? ` data-k="${k}"` : ''}${hidden ? ' opacity="0"' : ''}>${s}</g>`;
}
// barco de pesca; "dentro" fica atrás do casco, "carga" (os peixes) entre as pessoas e o casco
function barco(x, y, s = 1, o = {}) {
  let g = limb(-30, -60, -30, -340, 9, '#8a5a33');
  g += `<path d="M-22,-330 Q${o.cheia ? 110 : 46},-230 -22,-130 Z" fill="#f4efe6" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-16,-290 Q${o.cheia ? 64 : 28},-230 -16,-170" stroke="#e2d6bd" stroke-width="4" fill="none"/>`;
  if (o.lanterna) g += `<g transform="translate(-30,-250)"><circle r="60" fill="#ffd27a" opacity=".22"/><circle r="34" fill="#ffd27a" opacity=".3"/><path d="M-6,-26 L6,-26 L4,-18 L-4,-18 Z" fill="#6b4a33"/><rect x="-11" y="-18" width="22" height="30" rx="5" fill="#ffd27a" stroke="${OL}" stroke-width="2.6"/><g class="flicker"><path d="M0,-8 C4,-3 4,2 0,5 C-4,2 -4,-3 0,-8 Z" fill="#ff9a2a"/></g></g>`;
  g += o.dentro || '';
  g += o.carga || '';
  g += `<path d="M-250,-70 L250,-70 Q236,6 160,34 L-160,34 Q-236,6 -250,-70 Z" fill="${o.casco || '#9a6b3e'}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  g += `<path d="M-244,-48 L244,-48 M-228,-20 L228,-20 M-200,8 L200,8" stroke="#7a4e2c" stroke-width="4"/>`;
  g += `<path d="M-256,-74 L256,-74" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M-256,-74 L256,-74" stroke="#b9875a" stroke-width="7" stroke-linecap="round"/>`;
  g += o.frente || '';
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g class="bob" style="${dl(4)}">${g}</g>${o.k ? hitC(0, -150, 220) : ''}</g></g>`;
}
// rede dentro de água: (x, y) = centro da fila de boias, à superfície
function rede(x, y, o = {}) {
  const w = o.w ?? 240, h = o.h ?? 160, k = o.k || 'rede';
  const bag = `M${-w / 2},0 C${-w / 2},${r1(h * .7)} ${r1(-w * .25)},${h} 0,${h} C${r1(w * .25)},${h} ${w / 2},${r1(h * .7)} ${w / 2},0 Z`;
  let g = `<defs><clipPath id="${ID('rede' + k)}"><path d="${bag}"/></clipPath></defs>`;
  g += `<path d="${bag}" fill="#1f4f73" opacity=".22"/>`;
  g += `<g data-k="${k}Peixes">${o.peixes || ''}</g>`;
  let m = '';
  for (let i = -w; i <= w; i += 22) m += `<path d="M${i},0 l${h},${h}"/><path d="M${i},0 l${-h},${h}"/>`;
  g += `<g clip-path="${UR('rede' + k)}" stroke="#efe6cf" stroke-width="2.2" opacity=".8" fill="none">${m}</g>`;
  g += `<path d="${bag}" fill="none" stroke="#efe6cf" stroke-width="3.4"/>`;
  for (let i = 0; i <= 8; i++) g += `<ellipse cx="${r1(-w / 2 + i * w / 8)}" cy="0" rx="9" ry="7" fill="${i % 2 ? '#fbf6ea' : '#e5483f'}" stroke="${OL}" stroke-width="2.2"/>`;
  return `<g transform="translate(${x},${y})" data-k="${k}"${o.hidden ? ' opacity="0"' : ''}><g class="act" style="transform-origin:0px 0px">${g}${hitC(0, h * .45, Math.max(w, h) * .55)}</g></g>`;
}
// peixes dentro da rede, em grupos que aparecem um de cada vez (data-k g0, g1...)
function peixesNaRede(grupos = 4, porGrupo = 3, w = 240, h = 160) {
  const R = rng(77);
  let s = '';
  for (let gI = 0; gI < grupos; gI++) {
    let f = '';
    for (let i = 0; i < porGrupo; i++) {
      const x = r1((R() - .5) * w * .7), y = r1(h * .25 + R() * h * .6);
      f += peixe(x, y, .9 + R() * .3, CORES[(gI * porGrupo + i) % CORES.length], { flip: R() < .5 });
    }
    s += `<g data-k="g${gI}" opacity="0">${f}</g>`;
  }
  return s;
}
function lagoDia(o = {}) {
  const y = o.agua ?? 400;
  let s = bgDay(Object.assign({ sunX: 650, sunY: 120, sunR: 42 }, o.day || {}));
  s += hill([[-40, y - 10], [200, y - 40], [440, y - 18], [680, y - 48], [840, y - 26]], o.far || '#a9c4a0');
  s += `<rect x="-40" y="${y}" width="900" height="900" fill="${o.c0 || '#6fb0d8'}"/><path d="M-40,${y} L840,${y}" stroke="#8fc6e8" stroke-width="5"/>`;
  s += `<g stroke="#d6eff9" stroke-width="4" stroke-linecap="round" fill="none" opacity=".75">${[[60, 30], [230, 54], [430, 26], [600, 58], [740, 34], [330, 80], [120, 96], [520, 110]].map(([a, b]) => `<path class="drift" style="--dx:24px;--d:4s;${dl(4)}" d="M${a},${y + b} q10,-6 20,0 q10,6 20,0"/>`).join('')}</g>`;
  return s;
}
function areia(y0 = 600) {
  let s = `<path d="M-40,${y0} C200,${y0 - 22} 500,${y0 + 12} 840,${y0 - 18} L840,900 L-40,900 Z" fill="#e8d4a8" stroke="${OL}" stroke-width="3"/>`;
  s += `<path d="M-40,${y0 + 8} C200,${y0 - 14} 500,${y0 + 20} 840,${y0 - 10}" stroke="#f6ead0" stroke-width="5" fill="none"/>`;
  s += `<g fill="#cdb488">${[[90, 70], [300, 120], [520, 90], [700, 140], [180, 170], [620, 190]].map(([a, b]) => `<ellipse cx="${a}" cy="${y0 + b}" rx="9" ry="5"/>`).join('')}</g>`;
  return s;
}
function ondas(y = 700, o = {}) {
  return waveBand(y, { fill: o.c1 || '#4f9ccb', amp: 9, len: 150, dx: 30, d: 6, foam: '#d6eff9', fw: 4 }) + waveBand(y + 50, { fill: o.c2 || '#3f8dbf', amp: 10, len: 170, dx: -30, d: 7, foam: '#cfeaf7', fw: 4 });
}
function lagoNoite() {
  let s = sky('sky', [[0, '#0f1640'], [.55, '#26306a'], [1, '#3a4889']]);
  s += starField(7101, 60, 0, 0, 800, 380, { big: .15 }) + moon(640, 120, 28);
  s += hill([[-40, 390], [200, 362], [440, 384], [680, 352], [840, 374]], '#2a3f5f');
  s += `<rect x="-40" y="400" width="900" height="900" fill="#25466e"/><path d="M-40,400 L840,400" stroke="#3f6a96" stroke-width="5"/>`;
  s += `<g stroke="#5a86b6" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7">${[[80, 440], [260, 470], [460, 430], [640, 480], [720, 440]].map(([a, b]) => `<path d="M${a},${b} q10,-5 20,0 q10,5 20,0"/>`).join('')}</g>`;
  s += `<g fill="#fff6c8" opacity=".3">${[[640, 416, 42], [646, 438, 30], [636, 460, 22], [642, 482, 12]].map(([a, b, w]) => `<ellipse class="twinkle" style="--d:3s;${dl(3)}" cx="${a}" cy="${b}" rx="${w}" ry="3"/>`).join('')}</g>`;
  return s;
}
function redeSeca(x, y, s = 1, k = '') {
  let g = `<path d="M-90,0 C-100,-30 -60,-56 -20,-50 C10,-70 70,-60 86,-30 C100,-10 96,0 90,0 Z" fill="#d9cba8" stroke="${OL}" stroke-width="3"/>`;
  g += `<g stroke="#a8977a" stroke-width="2" opacity=".8">${[-70, -46, -22, 2, 26, 50, 74].map(a => `<path d="M${a},-4 l14,-40 M${a},-4 l-12,-38"/>`).join('')}</g>`;
  g += [-60, -20, 20, 60].map((a, i) => `<ellipse cx="${a}" cy="${-44 - (i % 2) * 8}" rx="8" ry="6" fill="${i % 2 ? '#fbf6ea' : '#e5483f'}" stroke="${OL}" stroke-width="2"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -30, 70) : ''}</g></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Pedro, Tiago e João no Barquinho',
  alt: 'Num barco cheio de peixes, o Pedro, o Tiago e o João levantam os braços, contentes. Jesus está com eles e sorri.',
  cue: [400, 860],
  art() {
    let s = sky('sky', [[0, '#f7b27a'], [.45, '#fcd9a6'], [.8, '#fdeccf'], [1, '#fdeccf']], 1100);
    s += sun(620, 600, 50, { face: true }) + cloud(170, 420, .9) + cloud(520, 330, .7);
    s += hill([[-40, 720], [200, 690], [440, 712], [680, 682], [840, 704]], '#a9b8a0');
    s += `<rect x="-40" y="730" width="900" height="400" fill="#6fb0d8"/><path d="M-40,730 L840,730" stroke="#8fc6e8" stroke-width="5"/>`;
    const up = { a: 150, b: -20 };
    const dentro = p(PEDRO, { x: -170, y: 4, s: .8, face: 'laugh', look: .3, armL: up, armR: up, k: 'pedro' }) + p(TIAGO, { x: -80, y: 8, s: .78, face: 'joy', look: .3, armL: up, armR: up }) + p(JOAO, { x: 10, y: 6, s: .78, face: 'laugh', look: .3, armL: up, armR: { a: 40, b: -20 } }) + p(JESUS, { x: 140, y: 4, s: .84, face: 'joy', look: -.3, armL: { a: 20 }, armR: { a: 80, b: -30 }, k: 'jesus' });
    s += barco(400, 1000, 1.3, { dentro, carga: monte(7201, 18), cheia: true, k: 'barco' });
    s += ondas(1010);
    for (const [x, y, f] of [[86, 820, false], [724, 806, true], [610, 1072, true]]) s += `<g transform="translate(${x},${y}) rotate(${f ? 20 : -20})">${peixe(0, 0, 1.2, '#c9d6e0', { flip: f })}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(582, 740, 'heart', 4); api.bubble(582, 650, 'Venham comigo!', { key: 'j' }); });
    api.tap(api.q('barco'), 'Barco', () => { api.snd('splash'); api.burst(400, 1010, 'ripple', 3); api.bubble(220, 650, 'Tantos peixes!', { key: 'b' }); });
  }
});

/* =====================================================================
   1 — TRÊS AMIGOS PESCADORES
   ===================================================================== */
SCENES.push({
  key: 'pescadores', title: 'Três amigos pescadores', ref: 'Lucas 5.1-2, 10', tint: 'sky',
  text: [
    'Pedro, Tiago e João eram pescadores. Viviam junto a um lago grande, na Galileia.',
    'Tiago e João eram irmãos. O Pedro era amigo e sócio deles. Tinham dois barcos e pescavam juntos.'
  ],
  fact: 'Tiago e João eram filhos de um pescador chamado Zebedeu. E o Pedro tinha um irmão, o André, que também era pescador.',
  hint: 'Toca no Pedro, no Tiago e no João.',
  alt: 'Na margem do lago, de manhã, três pescadores estão junto às redes: o Pedro, de azul, e os irmãos Tiago e João. Na água há dois barcos.',
  cue: [170, 560],
  art() {
    let s = lagoDia({});
    s += barco(230, 560, .42, {}) + barco(600, 548, .4, { casco: '#8a5f36' });
    s += areia(590);
    s += redeSeca(370, 760, 1, 'rede');
    s += p(PEDRO, { x: 170, y: 770, s: 1.04, face: 'joy', look: .4, armL: { a: 20 }, armR: { a: 50, b: -20 }, k: 'f0' });
    s += p(TIAGO, { x: 540, y: 770, s: 1.02, flip: true, face: 'smile', look: .4, armL: { a: 20 }, armR: { a: 30 }, k: 'f1' });
    s += p(JOAO, { x: 660, y: 778, s: 1, flip: true, face: 'joy', look: .4, armL: { a: 20 }, armR: { a: 60, b: -30 }, k: 'f2' });
    return s;
  },
  setup(api) {
    let vistos = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('f' + i), NOMES[i], () => {
      const [x, y, sc] = api.pos(api.q('f' + i));
      api.snd('hello'); api.hop(api.q('f' + i), 12);
      api.bubble(x, y - 270 * sc, trf('Eu sou o {n}!', { n: tr(NOMES[i]) }), { key: 'f' });
      if (!api.st['v' + i]) { api.st['v' + i] = true; if (++vistos === 3) api.nudgeNext(2400); }
    });
    api.tap(api.q('rede'), 'Rede', () => { api.snd('swish'); api.hop(api.q('rede'), 8); api.bubble(370, 600, 'Esta noite vamos pescar!', { key: 'f' }); });
  }
});

/* =====================================================================
   2 — UMA NOITE SEM PEIXES
   ===================================================================== */
SCENES.push({
  key: 'noite', title: 'Uma noite sem peixes', ref: 'Lucas 5.5', tint: 'night',
  text: [
    'Uma noite, foram todos pescar no lago. Lançaram as redes uma vez, e outra, e outra...',
    'Mas não apanharam nem um peixinho! De manhã, estavam cansados e tristes.'
  ],
  fact: 'No lago da Galileia, os pescadores trabalhavam de noite, porque era quando se apanhava mais peixe.',
  hint: 'Toca na rede três vezes para a puxar.',
  alt: 'De noite, num barco com uma lanterna, o Pedro e o irmão, André, puxam a rede, mas ela vem vazia. Ao longe, no outro barco, o Tiago e o João também não apanham nada.',
  cue: [640, 680],
  art() {
    let s = lagoNoite();
    const dentro2 = p(TIAGO, { x: -90, y: 4, s: .84, face: 'sad', look: -.3, armL: { a: 20 }, armR: { a: 30 } }) + p(JOAO, { x: 40, y: 6, s: .82, face: 'worry', look: -.3, armL: { a: 30 }, armR: { a: 20 } });
    s += `<g opacity=".9">${barco(640, 470, .36, { dentro: dentro2, lanterna: true, casco: '#8a5f36', k: 'barco2' })}</g>`;
    const puxa = { a: 80, b: -10 };
    const dentro = p(ANDRE, { x: 40, y: 6, s: .8, face: 'worry', look: .6, armL: puxa, armR: puxa, k: 'andre' }) + p(PEDRO, { x: 140, y: 4, s: .82, face: 'worry', look: .6, armL: puxa, armR: puxa, k: 'pedro' });
    s += barco(300, 650, .95, { dentro, lanterna: true });
    s += ondas(668, { c1: '#2f5a86', c2: '#28507a' });
    s += rede(640, 640, { k: 'rede', w: 210, h: 120 });
    return s;
  },
  setup(api) {
    let n = 0;
    const FALAS = [N('Nada...'), N('Outra vez nada!'), N('Nem um peixinho!')];
    api.tap(api.q('rede'), 'Rede', async () => {
      if (api.st.busy) return;
      api.st.busy = true;
      api.snd('splash');
      await api.anim(api.act(api.q('rede')), [{ transform: 'translateY(0px)' }, { transform: 'translateY(-70px)' }], { duration: 500, easing: 'ease-out', fill: 'forwards' });
      api.snd('hm');
      api.bubble(430, 340, FALAS[Math.min(n, 2)], { key: 'p' });
      n++;
      await api.wait(700);
      await api.anim(api.act(api.q('rede')), [{ transform: 'translateY(-70px)' }, { transform: 'translateY(0px)' }], { duration: 500, easing: 'ease-in', fill: 'forwards' });
      api.burst(640, 670, 'ripple', 2);
      api.st.busy = false;
      if (n === 3) api.nudgeNext(2200);
    });
    api.tap(api.q('pedro'), 'Pedro', () => { api.snd('hm'); api.bubble(430, 340, 'Que noite tão comprida...', { key: 'p' }); });
    api.tap(api.q('andre'), 'André', () => { api.snd('snore'); api.bubble(340, 380, 'Estou tão cansado...', { key: 'p', size: 26 }); });
    api.tap(api.q('barco2'), 'Barco do Tiago e do João', () => { api.snd('hm'); api.bubble(600, 300, 'Nós também não temos nada!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   3 — JESUS ENTRA NO BARCO
   ===================================================================== */
SCENES.push({
  key: 'jesus', title: 'Jesus entra no barco', ref: 'Lucas 5.1-3', tint: 'sky',
  text: [
    'De manhã, chegou Jesus, e muita gente veio ouvi-Lo. Eram tantas pessoas que Jesus entrou no barco do Pedro.',
    'Sentado no barco, um bocadinho afastado da margem, Jesus ensinava as pessoas.'
  ],
  fact: 'Na água, a voz de Jesus ouvia-se bem até à margem, onde as pessoas estavam sentadas.',
  hint: 'Toca em Jesus e nas pessoas.',
  alt: 'Jesus está sentado no barco do Pedro, perto da margem, e fala para as pessoas sentadas na areia.',
  cue: [220, 520],
  art() {
    let s = lagoDia({});
    const dentro = p(JESUS, { x: -60, y: 20, s: .86, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 110, b: -30 }, k: 'jesus' }) + p(PEDRO, { x: 140, y: 6, s: .8, face: 'smile', look: -.4, armL: { a: 14 }, armR: { a: 30 }, k: 'pedro' });
    s += barco(270, 640, .84, { dentro });
    s += ondas(660);
    s += `<path d="M480,900 C500,760 560,640 660,600 C720,578 790,574 840,574 L840,900 Z" fill="#e8d4a8" stroke="${OL}" stroke-width="3"/><path d="M500,860 C520,750 574,656 664,616" stroke="#f6ead0" stroke-width="5" fill="none"/>`;
    const PV = [[640, 690, 0, .74], [730, 680, 2, .74], [600, 770, 1, .8], [710, 772, 3, .8], [790, 760, 4, .74]];
    PV.forEach(([x, y, i, sc], j) => s += p(POVO[i], Object.assign({}, POVO[i].kind === 'adult' ? SIT : { legs: 'sit' }, { x, y, s: sc, face: 'smile', look: -.5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'p' + j })));
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(220, 470, 'heart', 4); api.bubble(240, 360, 'Deus ama-vos muito!', { key: 'p' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('pedro'), 'Pedro', () => { api.snd('hello'); api.bubble(390, 380, 'Bom dia, Mestre!', { key: 'p', size: 26 }); });
    for (let i = 0; i < 5; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('hm'); api.hop(api.q('p' + i), 8); api.bubble(x, y - 230 * sc, 'Vamos ouvir!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   4 — LANCEM AS REDES!
   ===================================================================== */
SCENES.push({
  key: 'redes', title: 'Lancem as redes!', ref: 'Lucas 5.4-5', tint: 'water',
  text: [
    'Jesus disse ao Pedro: «Vai para onde é mais fundo e lancem as redes.» E o Pedro respondeu:',
    { q: 'Mestre, não apanhámos nada a noite toda. Mas, porque Tu o dizes, vou lançar as redes.', who: 'outro' }
  ],
  fact: 'O Pedro era pescador e sabia que, de dia, era difícil apanhar peixe. Mesmo assim, confiou em Jesus!',
  hint: 'Toca no Pedro para ele lançar a rede.',
  alt: 'No meio do lago, o Pedro, de pé no barco, lança a rede à água. Jesus, sentado, aponta para o lugar.',
  cue: [450, 540],
  art() {
    let s = lagoDia({ agua: 380, day: { clouds: true } });
    const dentro = p(JESUS, { x: -160, y: 20, s: .86, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 95, b: -5 }, k: 'jesus' }) + p(ANDRE, { x: -30, y: 6, s: .8, face: 'o', look: .5, armL: { a: 14 }, armR: { a: 30 } }) + p(PEDRO, { x: 120, y: 4, s: .84, face: 'determined', look: .5, armL: { a: 60, b: -40 }, armR: { a: 100, b: -60 }, k: 'pedro' });
    s += barco(330, 650, 1, { dentro });
    s += ondas(668);
    s += rede(640, 630, { k: 'rede', hidden: true, w: 230, h: 120 });
    s += `<g transform="translate(470,520)" style="pointer-events:none"><g data-k="voo" opacity="0">${redeSeca(0, 0, .6)}</g></g>`;
    return s;
  },
  setup(api) {
    const lanca = async () => {
      api.bubble(450, 330, 'Porque Tu o dizes, vou lançar as redes!', { key: 'p' });
      if (api.st.feito) { api.snd('splash'); api.burst(640, 640, 'ripple', 2); return; }
      api.st.feito = true;
      api.snd('whoosh');
      await api.anim(api.q('voo'), [{ opacity: 1, transform: 'translate(0px,0px) rotate(0deg)' }, { opacity: 1, transform: 'translate(90px,-80px) rotate(20deg)', offset: .5 }, { opacity: 1, transform: 'translate(170px,100px) rotate(40deg)', offset: .92 }, { opacity: 0, transform: 'translate(170px,110px) rotate(40deg)' }], { duration: 850, easing: 'ease-in-out', fill: 'forwards' });
      api.snd('splash');
      api.burst(640, 640, 'ripple', 3);
      await api.anim(api.q('rede'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
      api.nudgeNext(2600);
    };
    api.tap(api.q('pedro'), 'Pedro', lanca);
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(180, 350, 'Lancem as redes ali!', { key: 'j' }); });
  }
});

/* =====================================================================
   5 — TANTOS PEIXES!
   ===================================================================== */
SCENES.push({
  key: 'peixes', title: 'Tantos peixes!', ref: 'Lucas 5.6', tint: 'water',
  text: [
    'Mal lançaram as redes, apanharam tantos, tantos peixes, que as redes até começaram a rasgar-se!',
    'O Pedro e o André puxavam com toda a força!'
  ],
  fact: 'Ainda hoje, há um peixe do lago da Galileia a que chamam «peixe de São Pedro».',
  hint: 'Toca na rede para veres quantos peixes vêm.',
  alt: 'A rede, dentro de água ao lado do barco, enche-se de peixes. O Pedro e o André puxam-na, espantados.',
  cue: [640, 680],
  art() {
    let s = lagoDia({ agua: 380 });
    const puxa = { a: 90, b: -10 };
    const dentro = p(JESUS, { x: -160, y: 20, s: .86, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 40, b: -20 }, k: 'jesus' }) + p(ANDRE, { x: 20, y: 6, s: .8, face: 'surprise', look: .6, armL: puxa, armR: puxa }) + p(PEDRO, { x: 120, y: 4, s: .84, face: 'surprise', look: .6, armL: puxa, armR: puxa, k: 'pedro' });
    s += barco(300, 650, 1, { dentro });
    s += ondas(668);
    s += rede(640, 630, { k: 'rede', w: 240, h: 120, peixes: peixesNaRede(4, 3, 240, 120) });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('rede'), 'Rede', async () => {
      if (n >= 4) { api.snd('splash'); api.burst(640, 650, 'ripple', 2); api.bubble(470, 340, 'Tantos peixes!', { key: 'p' }); return; }
      api.snd('splash');
      api.anim(api.q('g' + n), [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 400, fill: 'forwards' });
      n++;
      api.badge(640, 560, String(n * 3), { key: 'n' });
      api.anim(api.act(api.q('rede')), [{ transform: `scale(1,${(1 + (n - 1) * .07).toFixed(2)})` }, { transform: `scale(1,${(1 + n * .07).toFixed(2)})` }], { duration: 400, fill: 'forwards' });
      api.burst(640, 650, 'ripple', 2);
      if (n === 4) { await api.wait(400); api.snd('boing'); api.bubble(470, 340, 'A rede está a rasgar-se!', { key: 'p', dur: 2600 }); api.nudgeNext(2800); }
    });
    api.tap(api.q('pedro'), 'Pedro', () => { api.snd('grunt'); api.bubble(470, 340, 'Puxa, André!', { key: 'p' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('laugh'); api.burst(140, 460, 'heart', 3); });
  }
});

/* =====================================================================
   6 — VENHAM AJUDAR!
   ===================================================================== */
SCENES.push({
  key: 'ajuda', title: 'Venham ajudar!', ref: 'Lucas 5.7', tint: 'water',
  text: [
    'O Pedro chamou os amigos do outro barco: «Tiago! João! Venham ajudar!»',
    'Encheram os dois barcos de peixes. Eram tantos que os barcos quase se afundavam!'
  ],
  fact: 'Em 1986, encontraram na lama do lago da Galileia um barco de pesca do tempo de Jesus!',
  hint: 'Toca no barco do Tiago e do João.',
  alt: 'O barco do Pedro está cheio de peixes. Ao longe, o barco do Tiago e do João vem ajudar, e também fica cheio.',
  cue: [700, 480],
  art() {
    let s = lagoDia({ agua: 380 });
    const dentro1 = p(JESUS, { x: -170, y: 20, s: .86, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 40, b: -20 } }) + p(ANDRE, { x: -40, y: 6, s: .8, face: 'joy', look: .5, armL: { a: 30 }, armR: { a: 30 } }) + p(PEDRO, { x: 90, y: 4, s: .84, face: 'shout', look: .6, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'pedro' });
    s += `<g data-k="barco1">${barco(250, 660, .8, { dentro: dentro1, carga: monte(7301, 16, 400) })}</g>`;
    const dentro2 = p(TIAGO, { x: -90, y: 4, s: .84, face: 'joy', look: -.4, armL: { a: 30 }, armR: { a: 150, b: -20 } }) + p(JOAO, { x: 40, y: 6, s: .82, face: 'laugh', look: -.4, armL: { a: 150, b: -20 }, armR: { a: 30 } });
    s += barco(700, 520, .4, { dentro: dentro2, carga: monte(7302, 16, 400, 'carga2', true), casco: '#8a5f36', k: 'barco2' });
    s += ondas(684);
    return s;
  },
  setup(api) {
    const vem = async () => {
      if (api.st.feito) { api.snd('laugh'); api.bubble(580, 330, 'Que pescaria!', { key: 'b' }); return; }
      api.st.feito = true;
      api.snd('hello');
      api.bubble(330, 330, 'Tiago! João! Venham ajudar!', { key: 'p' });
      await api.wait(600);
      api.snd('whoosh');
      await api.anim(api.act(api.q('barco2')), [{ transform: 'translate(0px,0px) scale(1)' }, { transform: 'translate(-300px,350px) scale(1.8)' }], { duration: 1600, easing: 'ease-in-out', fill: 'forwards' });
      api.snd('splash');
      await api.anim(api.q('carga2'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
      api.anim(api.q('barco1'), [{ transform: 'translateY(0px)' }, { transform: 'translateY(12px)' }], { duration: 800, fill: 'forwards' });
      api.burst(580, 600, 'ripple', 3);
      api.bubble(580, 330, 'Que pescaria!', { key: 'b' });
      api.nudgeNext(2800);
    };
    api.tap(api.q('barco2'), 'Barco do Tiago e do João', vem);
    api.tap(api.q('pedro'), 'Pedro', vem);
  }
});

/* =====================================================================
   7 — NÃO TENHAS MEDO!
   ===================================================================== */
SCENES.push({
  key: 'medo', title: 'Não tenhas medo!', ref: 'Lucas 5.8-10', tint: 'gold',
  text: [
    'O Pedro ficou espantado e ajoelhou-se: «Senhor, afasta-Te de mim, que eu sou um pecador!»',
    'Mas Jesus disse-lhe:',
    { q: 'Não tenhas medo!', who: 'jesus' }
  ],
  fact: 'Um pecador é alguém que faz coisas erradas. Jesus não afastou o Pedro: chamou-o para ficar com Ele!',
  hint: 'Toca no Pedro e em Jesus.',
  alt: 'Na margem, junto aos barcos cheios de peixe, o Pedro ajoelha-se diante de Jesus. O Tiago e o João olham, admirados.',
  cue: [380, 560],
  art() {
    let s = lagoDia({ agua: 380 });
    s += barco(170, 520, .4, { carga: monte(7401, 14, 400) }) + barco(420, 510, .38, { carga: monte(7402, 14, 400), casco: '#8a5f36' });
    s += areia(560);
    s += p(TIAGO, { x: 110, y: 760, s: .96, face: 'o', look: .5, armL: { a: 20 }, armR: { a: 30 } });
    s += p(JOAO, { x: 210, y: 772, s: .94, face: 'surprise', look: .5, armL: { a: 30 }, armR: { a: 20 } });
    s += `<g data-k="pe">${p(PEDRO, { x: 380, y: 770, s: 1.02, face: 'surprise', look: .5, armL: { a: 20 }, armR: { a: 30 } })}</g>`;
    s += `<g data-k="joelhos" opacity="0" style="pointer-events:none">${p(PEDRO, { x: 400, y: 774, s: 1.02, legs: 'kneel', hemY: -62, face: 'sad', look: .5, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } })}</g>`;
    s += `<rect class="hit" data-k="pedro" x="310" y="500" width="160" height="290" fill="#000" fill-opacity="0"/>`;
    s += p(JESUS, { x: 600, y: 770, s: 1.06, flip: true, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 70, b: -20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('pedro'), 'Pedro', async () => {
      api.bubble(400, 400, 'Senhor, eu sou um pecador!', { key: 'p' });
      if (api.st.joelhos) { api.snd('hm'); return; }
      api.st.joelhos = true;
      api.snd('hm');
      api.anim(api.q('pe'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('joelhos'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
    });
    api.tap(api.q('jesus'), 'Jesus', () => {
      api.snd('heart'); api.burst(560, 520, 'heart', 5);
      api.bubble(600, 400, 'Não tenhas medo!', { key: 'j' });
      if (api.st.joelhos && !api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
  }
});

/* =====================================================================
   8 — PESCADORES DE PESSOAS
   ===================================================================== */
SCENES.push({
  key: 'seguir', title: 'Pescadores de pessoas', ref: 'Lucas 5.10-11', tint: 'meadow',
  text: [
    'Jesus disse ao Pedro: «A partir de agora, vais ser pescador de pessoas!»',
    'Então, o Pedro, o Tiago e o João puxaram os barcos para terra, deixaram tudo e foram com Jesus.'
  ],
  fact: '«Pescar pessoas» quer dizer ajudar os outros a conhecer Jesus. Tu também podes fazer isso!',
  hint: 'Toca nos três amigos para irem com Jesus.',
  alt: 'Jesus caminha pela margem do lago, e o Pedro, o Tiago e o João vão com Ele. Os barcos ficaram na areia.',
  cue: [160, 560],
  art() {
    let s = lagoDia({ agua: 380 });
    s += areia(520);
    s += barco(120, 600, .4, {}) + barco(330, 590, .36, { casco: '#8a5f36' });
    s += p(JESUS, { x: 640, y: 770, s: 1.06, face: 'joy', look: -.3, legs: 'walk', armL: { a: 20 }, armR: { a: 120, b: -20 }, k: 'jesus' });
    const W = [[PEDRO, 140, 780], [TIAGO, 260, 772], [JOAO, 380, 782]];
    W.forEach(([who, x, y], i) => s += p(who, { x, y, s: 1, face: 'joy', look: .6, legs: 'walk', armL: { a: 30 }, armR: { a: 20 }, k: 'f' + i }));
    return s;
  },
  setup(api) {
    let n = 0;
    for (let i = 0; i < 3; i++) api.tap(api.q('f' + i), NOMES[i], async () => {
      const [x, y, sc] = api.pos(api.q('f' + i));
      api.snd('tiptoe');
      api.bubble(x, y - 270 * sc, 'Vamos com Jesus!', { key: 'f', size: 26 });
      if (api.st['v' + i]) return;
      api.st['v' + i] = true;
      await api.anim(api.act(api.q('f' + i)), [{ transform: 'translateX(0px)' }, { transform: 'translateX(70px)' }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      if (++n === 3) { api.snd('fanfare'); api.bubble(640, 440, 'Venham comigo!', { key: 'j' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(640, 520, 'heart', 4); api.bubble(640, 440, 'Venham comigo!', { key: 'j' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o lago. Um barco descansa na areia, e uma ovelhinha dorme ao lado das redes.',
  cue: [430, 160],
  questions: [
    ['Quantos peixes apanhou o Pedro durante a noite?', 'Nenhum!'],
    ['De quem era o barco onde Jesus entrou?', 'Do Pedro.'],
    ['O que aconteceu quando lançaram as redes?', 'Apanharam tantos peixes que as redes se rasgavam!'],
    ['Quem veio ajudar no outro barco?', 'O Tiago e o João.'],
    ['O que disse Jesus que o Pedro ia ser?', 'Pescador de pessoas!']
  ],
  verse: ['Venham comigo, e eu farei de vocês pescadores de pessoas.', 'Mateus 4.19'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(7501, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#29475a');
    s += `<rect x="-40" y="570" width="900" height="300" fill="#2d4f7a"/>${waveBand(590, { fill: '#2a4a72', amp: 6, len: 140, dx: 20, d: 7, foam: '#5a7aa6', fw: 3 })}`;
    s += `<path d="M-40,700 C200,676 500,690 840,668 L840,900 L-40,900 Z" fill="#3a5a52"/>`;
    s += `<g opacity=".85">${barco(560, 690, .38, {})}</g>`;
    s += `<g opacity=".8">${redeSeca(400, 744, .7)}</g>`;
    s += sheep({ x: 230, y: 750, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(250, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'pesca',
  title: 'Pedro, Tiago e João no Barquinho',
  cover: { kicker: 'Uma história da Bíblia', title: 'Pedro, Tiago', small: 'e João no Barquinho', sub: 'Pescadores de pessoas' },
  color: '#2f86b8',
  ref: 'Lucas 5.1-11',
  scenes: SCENES
});
})();
