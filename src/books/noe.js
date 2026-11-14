/* =====================================================================
   LIVRO: NOÉ E A GRANDE ARCA  (Gênesis 6 a 9)
   ===================================================================== */
(() => {
const SCENES = [];
const NOE = { kind: 'adult', skin: '#d9a070', head: 'cloth', clothCol: '#efe4cc', bandCol: '#3f7fb0', beard: 'long', beardCol: '#f3f0ea', browCol: '#f6f3ee', hair: '#f3f0ea', tunic: '#a8643c', stripes: '#c98a52', longSleeves: true, belt: '#efe4cc' };
const ESPOSA = { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#d9643f', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#8a7f78', tunic: '#e9c46a', longSleeves: true, belt: '#b5402f' };
const FILHOS = [
  { kind: 'adult', skin: '#d39463', hair: '#3a2520', beard: 'short', tunic: '#3d7fb0', belt: '#7b4a2a', name: N('Sem') },
  { kind: 'adult', skin: '#b9784c', hair: '#2b1d17', beard: 'short', tunic: '#b85c38', belt: '#7b4a2a', name: N('Cam') },
  { kind: 'adult', skin: '#e2a878', hair: '#5a3020', beard: 'short', tunic: '#5e9a43', belt: '#7b4a2a', name: N('Jafé') }
];
const NORAS = [
  { kind: 'adult', skin: '#e7b58a', head: 'scarf', clothCol: '#7aa7d6', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#3f7fb0' },
  { kind: 'adult', skin: '#c98a5a', head: 'scarf', clothCol: '#e86a9a', hairStyle: 'long', hair: '#2b1d17', tunic: '#f6dfb0', belt: '#b5402f' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#8fc46a', hairStyle: 'long', hair: '#5a3020', tunic: '#efe4cc', belt: '#5e9a43' }
];
const noe = o => person(Object.assign({}, NOE, o));

/* ---------- a arca ---------- */
// y = fundo do casco. o.build: quantas fileiras de tábuas já estão pregadas (0 a 5); o.door: 'open' | 'closed' | 'none'
function arca(x, y, s = 1, o = {}) {
  const wood = '#b8743f', woodD = '#8a5030', woodL = '#d39a5e', roofC = '#7d4428';
  const hull = 'M-300,-152 L300,-152 Q298,-120 272,-74 Q238,-14 186,-6 L-186,-6 Q-238,-14 -272,-74 Q-298,-120 -300,-152 Z';
  const build = o.build ?? 5;
  let g = '';
  if (o.giraffes) g += o.giraffes;
  if (build >= 5) {
    g += `<rect x="-196" y="-272" width="392" height="124" fill="${woodL}" stroke="${OL}" stroke-width="4"/>`;
    g += `<g stroke="${wood}" stroke-width="3" opacity=".75">${[-147, -98, -49, 0, 49, 98, 147].map(xx => `<path d="M${xx},-270 L${xx},-150"/>`).join('')}</g>`;
    [-140, -70, 0, 70, 140].forEach((xx, i) => {
      const lit = o.lit ? '#ffd46b' : '#4a2e1c';
      g += `<path d="M${xx - 19},-212 L${xx - 19},-236 Q${xx},-252 ${xx + 19},-236 L${xx + 19},-212 Z" fill="${lit}" stroke="${OL}" stroke-width="3.4" data-k="win${i}"/>`;
      if (o.peek && o.peek[i]) g += `<g transform="translate(${xx},-212)">${o.peek[i]}</g>`;
    });
    g += `<path d="M-226,-266 L0,-340 L226,-266 Z" fill="${roofC}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
    g += `<g stroke="#5e321d" stroke-width="3" opacity=".8"><path d="M-150,-290 L150,-290"/><path d="M-80,-314 L80,-314"/></g>`;
  }
  g += `<defs><clipPath id="${ID('hull')}"><path d="${hull}"/></clipPath></defs>`;
  if (build < 5) {
    g += `<g stroke="${OL}" stroke-width="3">${[-250, -170, -90, -10, 70, 150, 230].map(xx => `<path d="M${xx},-152 Q${xx + (xx < 0 ? 10 : -10)},-60 ${xx * .72},-6" fill="none" stroke="${woodD}" stroke-width="11" stroke-linecap="round"/>`).join('')}</g>`;
    g += `<path d="M-200,-6 L200,-6" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M-200,-6 L200,-6" stroke="${woodD}" stroke-width="11" stroke-linecap="round"/>`;
  }
  g += `<g clip-path="${UR('hull')}">`;
  for (let r = 0; r < 5; r++) {
    const y0 = -152 + r * 30;
    g += `<g data-k="row${r}"${r >= build ? ' opacity="0"' : ''}><rect x="-310" y="${y0}" width="620" height="31" fill="${r % 2 ? wood : '#c07b44'}"/><path d="M-310,${y0 + 30} L310,${y0 + 30}" stroke="${woodD}" stroke-width="3"/>${[-240, -120, 0, 120, 240].map(xx => `<circle cx="${xx + r * 17}" cy="${y0 + 15}" r="2.6" fill="${woodD}"/>`).join('')}</g>`;
  }
  g += `</g>`;
  if (build >= 5) g += `<path d="${hull}" fill="none" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  g += `<rect x="-312" y="-166" width="624" height="18" rx="6" fill="${woodD}" stroke="${OL}" stroke-width="4"${build < 5 ? ' opacity="0"' : ''}/>`;
  if (build >= 5 && o.door !== 'none') {
    g += `<rect x="72" y="-142" width="78" height="102" rx="6" fill="#3e2416" stroke="${OL}" stroke-width="3.6"/>`;
    if (o.inside) g += `<g transform="translate(111,-40)">${o.inside}</g>`;
    g += `<g transform="translate(72,-142)"><g data-k="door" style="transform: scaleX(${o.door === 'closed' ? 1 : .07})"><rect x="0" y="0" width="78" height="102" rx="6" fill="${woodD}" stroke="${OL}" stroke-width="3.6"/><path d="M8,20 L70,20 M8,80 L70,80 M10,22 L68,78" stroke="#6e3c22" stroke-width="6" stroke-linecap="round"/></g></g>`;
    if (o.ramp) g += `<path d="M76,-40 L146,-40 L${o.rampX ?? 250},${o.rampY ?? 40} L${(o.rampX ?? 250) - 72},${o.rampY ?? 40} Z" fill="${woodL}" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/><g stroke="${wood}" stroke-width="3">${[.25, .5, .75].map(t => `<path d="M${r1(76 + t * ((o.rampX ?? 250) - 148))},${r1(-40 + t * ((o.rampY ?? 40) + 40))} l70,0"/>`).join('')}</g>`;
  }
  const flip = o.flip ? -s : s;
  return `<g transform="translate(${x},${y}) scale(${flip},${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g class="${o.cls || ''}">${g}</g></g></g>`;
}
function giraffeTop(x, k = '') {
  return `<g transform="translate(${x},-292)"${k ? ` data-k="${k}"` : ''}><g class="act"><g class="bob" style="${dl(3)}"><path d="M-12,40 L-14,-70 L14,-70 L12,40 Z" fill="#f3c45c" stroke="${OL}" stroke-width="3.4"/><g fill="#c47a35"><ellipse cx="0" cy="-20" rx="6" ry="5"/><ellipse cx="-3" cy="-50" rx="5" ry="4"/></g><path d="M-6,-74 l-4,-18 M6,-74 l4,-18" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><path d="M-6,-74 l-4,-18 M6,-74 l4,-18" stroke="#b8732e" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="-93" r="4.5" fill="#7a4a2a" stroke="${OL}" stroke-width="2"/><circle cx="10" cy="-93" r="4.5" fill="#7a4a2a" stroke="${OL}" stroke-width="2"/><ellipse cx="0" cy="-74" rx="20" ry="16" fill="#f3c45c" stroke="${OL}" stroke-width="3.2"/><ellipse cx="0" cy="-64" rx="12" ry="8" fill="#e9b778"/>${eyeDot(-8, -78, 3.6)}${eyeDot(8, -78, 3.6)}</g></g></g>`;
}
const trunkPeek = `<g data-k="trunk"><g class="act"><circle cx="0" cy="-8" r="18" fill="#a9aab9" stroke="${OL}" stroke-width="3"/>${eyeDot(-6, -14, 3)}${eyeDot(6, -14, 3)}<path d="M0,-2 C2,16 22,22 30,8" stroke="${OL}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M0,-2 C2,16 22,22 30,8" stroke="#a9aab9" stroke-width="9" fill="none" stroke-linecap="round"/></g></g>`;
const sheepPeek = `<g><ellipse cx="0" cy="-8" rx="12" ry="14" fill="#4b3d38" stroke="${OL}" stroke-width="2.6"/>${blob([[-6, -20, 7], [6, -21, 7]], '#fffaf0', 2.4)}<circle cx="-4" cy="-8" r="2.4" fill="#fff"/><circle cx="4" cy="-8" r="2.4" fill="#fff"/></g>`;
const lionPeek = `<g>${blob([[-14, -10, 9], [14, -10, 9], [0, -22, 10], [-10, -22, 8], [10, -22, 8]], '#b7601f', 2.4)}<circle cx="0" cy="-8" r="13" fill="#e3a33c" stroke="${OL}" stroke-width="2.6"/>${eyeDot(-5, -11, 2.6)}${eyeDot(5, -11, 2.6)}<ellipse cx="0" cy="-3" rx="5" ry="3" fill="#5a3326"/></g>`;
const birdPeek = `<g><circle cx="0" cy="-10" r="11" fill="#3f93c7" stroke="${OL}" stroke-width="2.6"/><path d="M8,-11 L18,-8 L8,-5 Z" fill="#f0a43a" stroke="${OL}" stroke-width="1.6"/>${eyeDot(3, -13, 2.6)}</g>`;

function mountain(x, y, w, h, o = {}) {
  const c = o.fill || '#9a8f86', sn = o.snow ?? '#fbfbf8';
  let s = `<path d="M${-w / 2},0 L${-w * .1},${-h} Q0,${-h - 14} ${w * .08},${-h} L${w / 2},0 Z" fill="${c}" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>`;
  s += `<path d="M${w * .02},${-h - 8} L${w * .3},${-h * .32} L${w / 2},0 L${w * .06},0 Z" fill="#000" opacity=".1"/>`;
  if (sn) s += `<path d="M${-w * .24},${-h * .62} L${-w * .1},${-h} Q0,${-h - 14} ${w * .08},${-h} L${w * .22},${-h * .64} L${w * .1},${-h * .7} L0,${-h * .6} L${-w * .1},${-h * .7} Z" fill="${sn}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  return `<g transform="translate(${x},${y})">${s}</g>`;
}
function altar(x, y, s = 1, fire = true) {
  let g = '';
  const st = [[-44, -12, 30, 18], [0, -12, 34, 18], [44, -12, 30, 18], [-24, -40, 30, 17], [22, -40, 32, 17], [0, -66, 30, 15]];
  for (const [cx, cy, w, h] of st) g += `<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${h}" fill="#b9b1a6" stroke="${OL}" stroke-width="3"/><path d="M${cx - w * .5},${cy - h * .3} q${w * .3},${-h * .4} ${w * .6},0" stroke="#d8d1c6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (fire) g += `<g transform="translate(0,-74)"><g class="flicker"><path d="M0,-48 C12,-30 20,-16 14,-4 C8,6 -8,6 -14,-4 C-20,-16 -12,-30 0,-48 Z" fill="#ff8a2a"/><path d="M0,-28 C6,-18 9,-10 6,-4 C3,1 -3,1 -6,-4 C-9,-10 -6,-18 0,-28 Z" fill="#ffe08a"/></g>${[0, 1, 2].map(i => `<circle class="rise" style="--d:${3 + i}s;--dx:${(i - 1) * 14}px;${dl(4)}" cx="0" cy="-50" r="${9 - i * 2}" fill="#e9e6ef" opacity=".7"/>`).join('')}</g>`;
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="altar">${g}</g>`;
}
function bush(x, y, s = 1, col = '#6aa246') {
  return `<g transform="translate(${x},${y}) scale(${s})">${blob([[-34, -18, 24], [0, -30, 30], [34, -18, 24], [-14, -6, 22], [16, -6, 22]], col)}${blob([[-10, -36, 10], [20, -28, 8]], '#86bd5a', 0)}</g>`;
}
function darkClouds(o = {}) {
  const sets = o.sets || [[110, 150, 1.25], [330, 110, 1.4], [560, 140, 1.3], [760, 120, 1.2], [220, 250, 1], [480, 240, 1.1], [680, 260, .95]];
  return sets.map(([x, y, s], i) => `<g transform="translate(${x},${y}) scale(${s})"><g class="drift" style="--dx:${i % 2 ? -22 : 24}px;--d:${9 + i}s;${dl(9)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], o.col || '#6f7590', 0)}${blob([[-22, -24, 18], [18, -20, 16]], o.hi || '#868ca6', 0)}</g></g>`).join('');
}
function family(list, x0, step, y, o = {}) {
  return list.map((p, i) => person(Object.assign({}, p, { x: x0 + i * step, y: y + (o.dy ? o.dy[i] || 0 : 0), s: (o.s && o.s[i]) || .74, face: (o.face && o.face[i]) || 'smile', look: o.look ?? 0, k: o.k ? o.k + i : '', armL: { a: 10 }, armR: { a: 10 } }, o.extra ? o.extra[i] || {} : {}))).join('');
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Noé e a Grande Arca',
  alt: 'A grande arca de madeira sobre uma colina verde, com um arco-íris atrás; girafas espreitam pelo telhado, Noé acena e uma pombinha voa com uma folha no bico.',
  cue: [250, 860],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.45, '#bfe5f5'], [.7, '#fde6c2'], [1, '#fde6c2']], 1100);
    s += sun(660, 460, 52, { face: true });
    s += rainbow(400, 900, 470, { w: 24 });
    s += cloud(90, 880, 1.6, { shade: '#e8dfee' }) + cloud(720, 888, 1.5, { shade: '#e8dfee', dx: -30 }) + cloud(410, 470, .7, { d: 13 });
    s += bird(170, 520, .9) + bird(214, 548, .7, { d: 11 });
    s += hill([[-40, 905], [160, 880], [400, 868], [640, 884], [840, 900]], '#b6d77e');
    const gir = giraffeTop(-40, 'g1') + giraffeTop(36, 'g2');
    s += arca(404, 958, .8, { giraffes: gir, door: 'none', peek: [trunkPeek, sheepPeek, '', lionPeek, birdPeek], k: 'arca' });
    s += hill([[-40, 985], [200, 960], [420, 978], [640, 958], [840, 972]], '#93c45c');
    s += grassBand(61, 980, 1060, 10, ['#6aa246', '#5f9440']);
    s += rabbit({ x: 112, y: 1052, s: 1.1, k: 'c1' }) + rabbit({ x: 160, y: 1060, s: 1.05, col: '#c9b8a6', dark: '#a8957f', k: 'c2' });
    s += noe({ x: 250, y: 1046, s: 1.18, face: 'grin', look: .4, armR: { a: 152, b: -26 }, armL: { a: 10, item: ITEM.staff(196, -1) }, k: 'noe' });
    s += sheep({ x: 590, y: 1064, s: .95, flip: true, k: 'c3', cls: 'bob' }) + sheep({ x: 680, y: 1050, s: .8, flip: true, face: '#f1d2bb', k: 'c4' });
    s += dove({ x: 560, y: 640, s: 1.1, leaf: true, k: 'pomba', cls: 'hover' });
    s += flowerBand(62, 1060, 1095, 8);
    return s;
  },
  setup(api) {
    const n = api.q('noe');
    api.tap(n, 'Noé', () => { api.wave(n, 'armR'); api.snd('hello'); api.bubble(250, 700, 'Olá! Eu sou o Noé!', { key: 'n' }); });
    api.tap(api.q('trunk'), 'Elefante na janela', () => { api.snd('trumpet'); api.hop(api.q('trunk'), 8); });
    for (const k of ['g1', 'g2']) api.tap(api.q(k), 'Girafa', () => { api.snd('squeak', .7); api.hop(api.q(k), 16); });
    api.tap(api.q('pomba'), 'Pombinha', () => { api.snd('coo'); api.burst(560, 630, 'heart', 3); });
    for (const k of ['c1', 'c2']) api.tap(api.q(k), 'Coelho', () => { api.snd('squeak', 1.2); api.hop(api.q(k), 24); });
    for (const k of ['c3', 'c4']) api.tap(api.q(k), 'Ovelha', () => { api.snd('bleat', k === 'c4' ? 1.3 : 1); api.hop(api.q(k)); });
  }
});

/* =====================================================================
   1 — NOÉ AMAVA A DEUS
   ===================================================================== */
SCENES.push({
  key: 'amava', title: 'Noé amava a Deus', ref: 'Gênesis 6.5-10', tint: 'meadow',
  text: [
    'Há muito tempo, as pessoas esqueceram-se de Deus. Faziam muitas coisas erradas, e Deus ficou triste.',
    'Mas Noé era diferente. Noé amava a Deus e obedecia a Deus.'
  ],
  fact: 'Noé tinha três filhos: Sem, Cam e Jafé.',
  hint: 'Toca no Noé e na família dele.',
  alt: 'Noé, de barba branca, com os braços erguidos para o céu, ao lado da esposa e dos três filhos, perto da casa deles.',
  cue: [214, 470],
  art() {
    let s = bgDay({ sunX: 668, sunY: 150, sunR: 44 });
    s += `<defs>${lg('beam', [[0, '#fff3c4', .85], [1, '#fff3c4', 0]])}</defs><path data-k="beam" d="M150,-20 L290,-20 L300,700 L120,700 Z" fill="${UR('beam')}" opacity=".45"/>`;
    s += hill([[-40, 430], [150, 402], [340, 420], [540, 396], [840, 418]], '#cfe2ae');
    s += house(520, 470, 150, 120, { wall: '#ecd5a6', sw: 3 }) + olive(712, 486, .8);
    s += hill([[-40, 500], [200, 476], [420, 494], [640, 470], [840, 488]], '#aed37a');
    s += hill([[-40, 580], [220, 556], [460, 572], [700, 552], [840, 566]], '#94c45e');
    s += grassBand(71, 590, 680, 12);
    s += noe({ x: 214, y: 702, s: 1.0, face: 'joy', armL: { a: 150, b: -18 }, armR: { a: 150, b: -18 }, k: 'noe' });
    s += person(Object.assign({}, ESPOSA, { x: 340, y: 700, s: .86, face: 'smile', look: -.5, armL: { a: -30, b: -80 }, armR: { a: -30, b: -80 }, k: 'esposa' }));
    FILHOS.forEach((f, i) => s += person(Object.assign({}, f, { x: 448 + i * 92, y: 696 - (i % 2) * 6, s: .8 - i * .02, face: ['grin', 'smile', 'grin'][i], look: -.4, k: 'filho' + i })));
    s += flowerBand(72, 724, 790, 7);
    return s;
  },
  setup(api) {
    const n = api.q('noe');
    api.tap(n, 'Noé', () => {
      api.snd('anoint');
      api.anim(api.q('beam'), [{ opacity: .45 }, { opacity: .95 }, { opacity: .6 }], { duration: 1400, fill: 'forwards' });
      api.burst(214, 470, 'heart', 6);
      api.bubble(214, 440, 'Senhor, eu amo-te!', { key: 'n' });
    });
    api.tap(api.q('esposa'), 'Mulher de Noé', () => { api.hop(api.q('esposa'), 14); api.snd('hello'); api.bubble(340, 460, 'Nós também amamos a Deus!', { key: 'e' }); });
    FILHOS.forEach((f, i) => api.tap(api.q('filho' + i), f.name, () => { api.hop(api.q('filho' + i), 16); api.snd('count', i + 1); api.bubble(448 + i * 92, 470, f.name + '!', { key: 'f', size: 30, dur: 1200 }); }));
  }
});

/* =====================================================================
   2 — FAÇA UMA ARCA!
   ===================================================================== */
SCENES.push({
  key: 'faca', title: 'Faz uma arca!', ref: 'Gênesis 6.13-22', tint: 'gold',
  text: [
    'Um dia, Deus falou com Noé:',
    { q: 'Faz um barco muito grande! Vai chover muito. Mas eu vou cuidar de ti e da tua família.', who: 'deus' },
    'E Noé fez tudo como Deus mandou.'
  ],
  fact: 'A arca era enorme: maior do que um campo de futebol!',
  hint: 'Toca no plano que o Noé está a segurar.',
  alt: 'Noé, num monte, segura um rolo com o desenho da arca e olha para a luz dourada que vem das nuvens.',
  cue: [432, 560],
  art() {
    let s = sky('sky', [[0, '#9fd2ee'], [.5, '#f8ecd0'], [1, '#f8ecd0']]);
    s += `<defs>${rg('glory', [[0, '#fff6c8', 1], [.5, '#ffe28a', .5], [1, '#ffe28a', 0]])}</defs><circle data-k="glory" cx="560" cy="110" r="260" fill="${UR('glory')}"/>`;
    s += [[-30, 0], [-12, 1], [8, 2], [26, 3]].map(([a]) => `<path d="M560,110 L${r1(560 + Math.sin(a * Math.PI / 180) * 900)},${r1(110 + Math.cos(a * Math.PI / 180) * 900)}" stroke="#fff3c4" stroke-width="34" opacity=".25"/>`).join('');
    s += cloud(470, 130, 1.1, { shade: '#f6e3b8' }) + cloud(660, 100, 1.2, { shade: '#f6e3b8' }) + cloud(170, 200, .8, { d: 13 });
    const bp = ['M180,330 L620,330 Q614,374 592,404 Q566,432 530,436 L270,436 Q234,432 208,404 Q186,374 180,330 Z', 'M250,330 L250,262 L550,262 L550,330', 'M232,264 L400,206 L568,264', 'M200,460 L600,460', 'M200,450 L200,470 M600,450 L600,470'];
    s += `<g data-k="plan" opacity="0" style="pointer-events:none">${bp.map(d => `<path d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}<text x="400" y="184" text-anchor="middle" font-size="38" class="svgtxt" fill="#ffffff" stroke="#2f6db5" stroke-width="7" paint-order="stroke">${tr('bem grande!')}</text></g>`;
    s += hill([[-40, 560], [180, 530], [400, 548], [620, 520], [840, 540]], '#b6d47e');
    s += hill([[-40, 640], [200, 600], [380, 588], [560, 610], [840, 590]], '#9cc463');
    s += grassBand(81, 640, 700, 10);
    s += noe({ x: 340, y: 704, s: 1.14, face: 'o', look: .6, armL: { a: 52, b: -50 }, armR: { a: 20, b: -40 }, k: 'noe' });
    s += `<g transform="translate(432,560) rotate(-8)" data-k="scroll"><g class="act">${ITEM.scroll()}<path d="M-16,-6 L16,-6 L10,8 L-10,8 Z" fill="none" stroke="#8a5a33" stroke-width="2"/>${hitC(0, 0, 40)}</g></g>`;
    s += flowerBand(82, 724, 790, 6, ['#f2c14e', '#ffffff']);
    return s;
  },
  setup(api) {
    const plan = api.q('plan');
    const show = async () => {
      if (api.st.shown) { api.snd('chime', 'G5'); api.burst(400, 360, 'spark', 8, { col: '#ffffff' }); return; }
      api.st.shown = true;
      api.snd('anoint');
      plan.setAttribute('opacity', '1');
      const paths = [...plan.querySelectorAll('path')];
      paths.forEach((p, i) => api.anim(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 900, delay: i * 350, fill: 'forwards', easing: 'ease-in-out' }));
      api.anim(plan.querySelector('text'), [{ opacity: 0 }, { opacity: 0, offset: .6 }, { opacity: 1 }], { duration: 2200, fill: 'forwards' });
      await api.wait(2000);
      api.bubble(340, 400, 'Vou fazer como Deus mandou!', { key: 'n', dur: 2800 });
    };
    api.tap(api.q('scroll'), 'Plano da arca', show);
    api.tap(api.q('noe'), 'Noé', show);
    api.tap(api.q('glory'), 'Luz de Deus', () => { api.snd('chime', 'E6'); api.burst(560, 160, 'spark', 10, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   3 — TOC, TOC, TOC!
   ===================================================================== */
const PLANKS = [[140, 640, -6], [206, 668, 4], [126, 708, 3], [300, 704, -5], [222, 736, 6]];
SCENES.push({
  key: 'toc', title: 'Toc, toc, toc!', ref: 'Gênesis 6.14-22', tint: 'sand',
  text: [
    'Noé e os filhos trabalharam muito. Cortaram madeira. Serraram. Martelaram.',
    'Toc, toc, toc! Pouco a pouco, a arca ficou pronta.'
  ],
  fact: 'Noé passou uma tinta grossa na arca, por dentro e por fora, para a água não entrar.',
  hint: 'Toca nas tábuas para as pregares na arca.',
  alt: 'A arca ainda em construção, só com o esqueleto de madeira; Noé martela e os filhos trazem tábuas e serram um tronco.',
  cue: [150, 640],
  art() {
    let s = bgDay({ sunX: 120, sunY: 120, sunR: 38 });
    s += hill([[-40, 470], [200, 440], [420, 460], [640, 436], [840, 456]], '#dfe8b8');
    s += hill([[-40, 540], [220, 520], [460, 532], [700, 512], [840, 526]], '#c9dc96');
    s += `<rect x="-40" y="560" width="900" height="300" fill="#e2cf9a"/>`;
    s += `<g opacity=".7">${[[120, 600], [300, 720], [520, 610], [690, 730], [430, 760]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="7" fill="#d4bd84"/>`).join('')}</g>`;
    s += arca(404, 560, .7, { build: 0, door: 'none', k: 'arca' });
    s += `<g transform="translate(230,560)"><path d="M-10,0 L20,-150 M30,0 L60,-150" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-10,0 L20,-150 M30,0 L60,-150" stroke="#9a6b3e" stroke-width="5" stroke-linecap="round"/>${[30, 60, 90, 120].map(y => `<path d="M${-10 + y / 5},${-y} L${30 + y / 5},${-y}" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M${-10 + y / 5},${-y} L${30 + y / 5},${-y}" stroke="#9a6b3e" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`;
    s += noe({ x: 262, y: 470, s: .74, face: 'determined', look: .7, armR: { a: 120, b: -40, item: `<g data-k="hammer" transform="rotate(-30)">${limb(0, 8, 0, -40, 6, '#9a6b3e')}<rect x="-14" y="-52" width="28" height="14" rx="3" fill="#8a8f9a" stroke="${OL}" stroke-width="3"/></g>`, ia: 0 }, armL: { a: 60, b: -30 }, k: 'noe' });
    s += person(Object.assign({}, FILHOS[0], { x: 456, y: 704, s: .8, face: 'determined', look: -.3, legs: 'walk', armL: { a: 150, b: 10 }, armR: { a: 150, b: 10 }, extra: `<g transform="translate(0,-262)">${limb(-120, 0, 110, -6, 16, '#c98f57')}</g>`, k: 'filho0' }));
    s += `<g transform="translate(590,666)"><path d="M-46,0 L-36,-50 M-26,0 L-36,-50 M26,0 L36,-50 M46,0 L36,-50" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M-46,0 L-36,-50 M-26,0 L-36,-50 M26,0 L36,-50 M46,0 L36,-50" stroke="#9a6b3e" stroke-width="5" stroke-linecap="round"/><rect x="-74" y="-70" width="148" height="28" rx="14" fill="#b07b4a" stroke="${OL}" stroke-width="3.4"/><ellipse cx="74" cy="-56" rx="9" ry="14" fill="#e3bd86" stroke="${OL}" stroke-width="3"/></g>`;
    s += person(Object.assign({}, FILHOS[2], { x: 652, y: 724, s: .7, face: 'grin', look: -.6, armL: { a: 40, b: 40 }, armR: { a: 40, b: 40 }, k: 'filho2' }));
    PLANKS.forEach(([x, y, a], i) => s += `<g transform="translate(${x},${y}) rotate(${a})" data-k="pl${i}"><g class="act"><rect x="-56" y="-9" width="112" height="18" rx="5" fill="#c98f57" stroke="${OL}" stroke-width="3.2"/><path d="M-40,-2 L30,-2" stroke="#a46e3c" stroke-width="2.4"/>${hitC(0, 0, 44)}</g></g>`);
    return s;
  },
  setup(api) {
    let n = 0;
    const rowY = r => 560 + (-152 + r * 30 + 15) * .7;
    PLANKS.forEach(([x, y], i) => {
      const el = api.q('pl' + i);
      api.tap(el, 'Tábua', async () => {
        if (el.dataset.used || api.st.busy) return; el.dataset.used = 1; api.st.busy = true;
        const r = n, tx = 404 - x, ty = rowY(r) - y;
        api.snd('whoosh');
        await api.anim(api.act(el), [{ transform: 'translate(0px,0px) scale(1)', opacity: 1 }, { transform: `translate(${tx / 2}px,${ty / 2 - 120}px) scale(1.4) rotate(10deg)`, opacity: 1, offset: .5 }, { transform: `translate(${tx}px,${ty}px) scale(3.4,1.4)`, opacity: 0 }], { duration: 650, easing: 'ease-in-out', fill: 'forwards' });
        const row = api.q('row' + r);
        api.anim(row, [{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
        api.snd('knock', 3);
        api.burst(404, rowY(r), 'dust', 4);
        n++; api.st.busy = false;
        api.badge(560, 300, String(n), { key: 'b' });
        if (n === 5) {
          await api.wait(500);
          api.snd('tada');
          api.burst(404, 460, 'star', 10);
          api.bubble(262, 260, 'O casco está pronto!', { key: 'n' });
          api.nudgeNext(1500);
        }
      });
    });
    api.tap(api.q('noe'), 'Noé a martelar', () => {
      const hm = api.q('hammer');
      api.anim(hm, [{ transform: 'rotate(-30deg)' }, { transform: 'rotate(30deg)' }, { transform: 'rotate(-30deg)' }, { transform: 'rotate(30deg)' }, { transform: 'rotate(-30deg)' }], { duration: 800 });
      api.snd('knock', 3);
      api.bubble(262, 260, 'Toc, toc, toc!', { key: 'n', size: 30 });
    });
    api.tap(api.q('filho0'), 'Sem a carregar uma tábua', () => { api.hop(api.q('filho0'), 10); api.snd('grunt'); api.bubble(456, 420, 'Que tábua pesada!', { key: 'f' }); });
    api.tap(api.q('filho2'), 'Jafé a serrar', () => { api.snd('saw'); api.bubble(652, 500, 'Zip, zip!', { key: 'j', size: 28 }); });
  }
});

/* =====================================================================
   4 — OS ANIMAIS CHEGAM
   ===================================================================== */
SCENES.push({
  key: 'chegam', title: 'Os animais chegam', ref: 'Gênesis 7.1-9', tint: 'meadow',
  text: [
    'Então os animais começaram a chegar, uns atrás dos outros.',
    'Os elefantes! As girafas! Os leões!',
    'Vamos levar os animais para a arca?'
  ],
  fact: 'A girafa é o animal mais alto do mundo!',
  hint: 'Toca nos animais para os levares até à arca.',
  alt: 'Pares de elefantes, girafas e leões caminham em fila até à rampa da arca, onde Noé os espera.',
  cue: [190, 640],
  art() {
    let s = bgDay({ sunX: 140, sunY: 120, sunR: 38 });
    s += hill([[-40, 450], [200, 420], [420, 440], [640, 414], [840, 430]], '#cfe2ae');
    s += arca(690, 560, .6, { flip: true, ramp: true, rampX: 230, rampY: 150, door: 'open', k: 'arca' });
    s += hill([[-40, 560], [220, 536], [460, 552], [700, 540], [840, 548]], '#a9cf6c');
    s += `<rect x="-40" y="600" width="900" height="260" fill="#9cc865"/>`;
    s += giraffe({ x: 270, y: 566, s: .6, k: 'gir1' }) + giraffe({ x: 346, y: 572, s: .56, k: 'gir2' });
    s += noe({ x: 520, y: 690, s: .72, face: 'grin', look: -.7, armL: { a: 60, b: 30 }, armR: { a: 12 }, k: 'noe' });
    s += elephant({ x: 150, y: 702, s: .6, k: 'ele1' }) + elephant({ x: 262, y: 714, s: .5, k: 'ele2' });
    s += lion({ x: 360, y: 722, s: .54, lamb: false, k: 'leo1' }) + lion({ x: 440, y: 732, s: .5, lamb: false, mane: false, k: 'leo2' });
    s += grassBand(91, 730, 790, 8);
    return s;
  },
  setup(api) {
    const pairs = [['ele1', 'ele2', 'trumpet', N('Elefantes')], ['gir1', 'gir2', 'squeak', N('Girafas')], ['leo1', 'leo2', 'roar', N('Leões')]];
    let gone = 0;
    pairs.forEach(([a, b, snd, label]) => {
      const go = async () => {
        const A = api.q(a), B = api.q(b);
        if (A.dataset.gone) return; A.dataset.gone = B.dataset.gone = 1;
        api.snd(snd, snd === 'squeak' ? .7 : 1);
        api.hop(A, 14); api.hop(B, 14);
        await api.wait(380);
        for (const el of [A, B]) {
          const [x, y, sc] = api.pos(el);
          api.anim(api.act(el), [{ transform: 'translate(0px,0px) scale(1)', opacity: 1 }, { transform: `translate(${(572 - x) / sc}px,${(650 - y) / sc}px) scale(.9)`, opacity: 1, offset: .62 }, { transform: `translate(${(624 - x) / sc}px,${(520 - y) / sc}px) scale(.5)`, opacity: 0 }], { duration: 1600, easing: 'ease-in-out', fill: 'forwards' });
        }
        await api.wait(1500);
        gone++;
        api.snd('count', gone);
        api.badge(640, 300, String(gone), { key: 'g' });
        if (gone === 3) { api.snd('tada'); api.bubble(600, 400, 'Entrem, entrem! Há lugar para todos!', { key: 'n', dur: 3000 }); api.nudgeNext(1800); }
      };
      api.tap(api.q(a), label, go); api.tap(api.q(b), label, go);
    });
    api.tap(api.q('noe'), 'Noé', () => { api.wave(api.q('noe'), 'armL'); api.bubble(600, 400, 'Venham, animais!', { key: 'n' }); });
  }
});

/* =====================================================================
   5 — GRANDES E PEQUENININHOS
   ===================================================================== */
const DUOS = [
  { k: 'zeb', label: N('Zebra'), snd: ['heehaw', 1], x: 200, y: 580, s: .56, f: o => equine(Object.assign({ kind: 'zebra' }, o)), dx: 96 },
  { k: 'ove', label: 'Ovelha', snd: ['bleat', 1], x: 470, y: 600, s: .72, f: o => sheep(o), dx: 86 },
  { k: 'coe', label: 'Coelho', snd: ['squeak', 1.2], x: 160, y: 720, s: 1.1, f: o => rabbit(o), dx: 64 },
  { k: 'tar', label: N('Tartaruga'), snd: ['plip', 1], x: 400, y: 730, s: 1, f: o => turtle(o), dx: 92 },
  { k: 'pas', label: N('Passarinho'), snd: ['coo', 1], x: 620, y: 420, s: .9, f: o => dove(Object.assign({ col: '#f2c14e', wing: '#e09a2a', flying: false }, o)), dx: 70 }
];
SCENES.push({
  key: 'pares', title: 'Dois a dois', ref: 'Gênesis 6.19-21; 7.14-15', tint: 'meadow',
  text: [
    'Vieram zebras, ovelhas, coelhos, tartarugas e passarinhos.',
    'Os animais vinham de dois em dois. Consegues encontrar o par de cada um?'
  ],
  fact: 'Noé levou comida para todos os animais e para a família dele.',
  hint: 'Toca nos animais para encontrares o par de cada um.',
  alt: 'Um campo com moitas: uma zebra, uma ovelha, um coelho, uma tartaruga e um passarinho; o par de cada um está escondido atrás das moitas.',
  cue: [200, 520],
  art() {
    let s = bgDay({ sunX: 650, sunY: 130, sunR: 40 });
    s += hill([[-40, 430], [200, 404], [420, 424], [640, 400], [840, 416]], '#cfe2ae');
    s += arca(560, 470, .3, { door: 'open', lit: false });
    s += hill([[-40, 500], [220, 478], [460, 492], [700, 474], [840, 486]], '#aed37a');
    s += `<rect x="-40" y="520" width="900" height="340" fill="#9cc865"/>`;
    s += `<g transform="translate(660,560)"><path d="M-8,0 C-4,-40 -18,-60 -8,-110 L6,-110 C2,-70 14,-40 10,0 Z" fill="#8b6b4b" stroke="${OL}" stroke-width="3"/>${blob([[-40, -130, 34], [0, -150, 40], [40, -130, 34], [0, -112, 34]], '#6aa246')}<path d="M-54,-110 L58,-112" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M-54,-110 L58,-112" stroke="#8b6b4b" stroke-width="5" stroke-linecap="round"/></g>`;
    for (const d of DUOS) {
      const px = d.x + d.dx;
      s += `<g data-k="${d.k}B" opacity="0">${d.f({ x: px, y: d.y, s: d.s * .96, flip: true, k: '' })}</g>`;
      if (d.k !== 'pas') s += bush(px + 10, d.y + 6, d.s * 1.05 + .2, '#5f9a3e');
      s += d.f({ x: d.x, y: d.y, s: d.s, k: d.k + 'A' });
    }
    s += grassBand(101, 740, 790, 6);
    return s;
  },
  setup(api) {
    let n = 0;
    for (const d of DUOS) {
      const A = api.q(d.k + 'A'), B = api.q(d.k + 'B');
      api.tap(A, d.label, async () => {
        api.snd(...d.snd);
        api.hop(A, 16);
        if (A.dataset.found) return; A.dataset.found = 1;
        await api.wait(250);
        api.snd('boing', 1.1);
        api.anim(B, [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'translateY(-14px)', offset: .6 }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 520, fill: 'forwards', easing: 'ease-out' });
        api.burst(d.x + d.dx, d.y - 40, 'heart', 4);
        n++;
        api.badge(d.x + d.dx / 2, d.y - (d.k === 'zeb' ? 170 : 110) * d.s, String(n), { key: 'b' + n });
        if (n === DUOS.length) { await api.wait(600); api.snd('tada'); api.bubble(400, 260, 'Todos os animais têm o seu par!', { key: 'end', dur: 3000 }); api.nudgeNext(1800); }
      });
    }
  }
});

/* =====================================================================
   6 — DEUS FECHOU A PORTA
   ===================================================================== */
SCENES.push({
  key: 'porta', title: 'Deus fechou a porta', ref: 'Gênesis 7.7-16', tint: 'stone',
  text: [
    'Noé e a família dele entraram na arca, com todos os animais.',
    'Então Deus fechou a porta. Bum!'
  ],
  fact: 'Oito pessoas entraram na arca: Noé, a esposa, os três filhos e as três noras.',
  hint: 'Toca na porta da arca.',
  alt: 'A arca pronta, com a porta aberta e animais nas janelas; nuvens escuras aproximam-se.',
  cue: [478, 520],
  art() {
    let s = sky('sky', [[0, '#7c869e'], [.55, '#c4c3c8'], [1, '#c4c3c8']]);
    s += darkClouds({ sets: [[110, 120, 1.1], [330, 90, 1.3], [570, 110, 1.2], [770, 90, 1.1], [230, 200, .9], [470, 190, 1], [690, 210, .85]] });
    s += hill([[-40, 470], [200, 444], [420, 462], [640, 440], [840, 456]], '#a5b38a');
    s += `<g data-k="rain" opacity="0">${rainSheet({ seed: 6, n: 50, col: '#e2eef8', w: 2.6 })}</g>`;
    s += `<rect x="-40" y="600" width="900" height="260" fill="#8fae66"/>`;
    s += arca(400, 640, .74, { door: 'open', ramp: true, rampX: 230, rampY: 76, peek: [trunkPeek, sheepPeek, birdPeek, lionPeek, sheepPeek], inside: person(Object.assign({}, NORAS[2], { s: .42, face: 'smile', back: true, armL: { a: 8 }, armR: { a: 8 } })), k: 'arca' });
    s += `<g data-k="litwin" opacity="0" style="pointer-events:none">${[-140, -70, 0, 70, 140].map(xx => `<circle cx="${400 + xx * .74}" cy="${640 - 226 * .74}" r="40" fill="#ffd46b" opacity=".35"/>`).join('')}</g>`;
    s += hitC(483, 573, 56).replace('class="hit"', 'class="hit" data-k="doorHit"');
    s += grassBand(111, 690, 790, 8, ['#6f8f4a', '#7da152']);
    return s;
  },
  setup(api) {
    const close = async () => {
      if (api.st.closed) { api.snd('knock', 2); return; }
      api.st.closed = true;
      api.snd('swish');
      await api.anim(api.q('door'), [{ transform: 'scaleX(.07)' }, { transform: 'scaleX(1)' }], { duration: 700, easing: 'cubic-bezier(.5,0,.7,1)', fill: 'forwards' });
      api.snd('door'); api.shake(8);
      api.anim(api.q('litwin'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
      api.bubble(400, 280, 'BUM!', { key: 'bum', size: 54, dur: 1200, plain: true });
      await api.wait(900);
      api.snd('rain', 2.4);
      api.anim(api.q('rain'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1600, fill: 'forwards' });
      api.nudgeNext(2200);
    };
    api.tap(api.q('doorHit'), 'Porta da arca', close);
    api.tap(api.q('door'), 'Porta da arca', close);
    api.tap(api.q('trunk'), 'Elefante na janela', () => { api.snd('trumpet'); });
  }
});

/* =====================================================================
   7 — CHUVA, CHUVA, CHUVA!
   ===================================================================== */
SCENES.push({
  key: 'chuva', title: 'Chuva, chuva, chuva!', ref: 'Gênesis 7.11-24', tint: 'water',
  text: [
    'Então começou a chover. Plic, ploc! Choveu, choveu, choveu...',
    'Foram quarenta dias e quarenta noites de chuva!',
    'A água subiu, subiu... e a arca flutuava em cima da água.'
  ],
  fact: 'Quarenta dias são mais de um mês de chuva sem parar!',
  hint: 'Toca nas nuvens e na arca.',
  alt: 'Uma tempestade com relâmpagos e muita chuva; a arca balança sobre ondas grandes.',
  cue: [400, 170],
  art() {
    let s = sky('sky', [[0, '#3a4366'], [.6, '#6c7895'], [1, '#6c7895']]);
    s += `<rect data-k="flash" x="-40" y="-40" width="900" height="900" fill="#ffffff" opacity="0"/>`;
    s += `<g data-k="bolt" opacity="0"><path d="M440,180 L404,290 L446,286 L396,420 L486,262 L444,266 L480,180 Z" fill="#fff6a8" stroke="#f2c14e" stroke-width="5" stroke-linejoin="round"/></g>`;
    s += darkClouds({ col: '#4b526e', hi: '#5d6582' });
    s += hitC(400, 150, 120).replace('class="hit"', 'class="hit" data-k="clouds"');
    s += rainSheet({ seed: 7, n: 80, col: '#cfe0f2', w: 3 });
    s += waveBand(530, { fill: '#2f6f9e', amp: 18, len: 140, dx: 50, d: 5, foam: '#a9d6ee' });
    s += arca(400, 600, .66, { door: 'closed', lit: true, cls: 'rock', k: 'arca' });
    s += hitC(400, 470, 150).replace('class="hit"', 'class="hit" data-k="arcaHit"');
    s += waveBand(600, { fill: '#2a6593', amp: 20, len: 160, dx: -60, d: 6, foam: '#bfe2f4' });
    s += waveBand(680, { fill: '#245a86', amp: 22, len: 180, dx: 70, d: 7, foam: '#cfeaf7' });
    s += `<g data-k="water">${hitC(200, 720, 90)}${hitC(600, 720, 90)}</g>`;
    return s;
  },
  setup(api) {
    const storm = async () => {
      api.anim(api.q('flash'), [{ opacity: 0 }, { opacity: .8 }, { opacity: 0 }, { opacity: .5 }, { opacity: 0 }], { duration: 520 });
      api.anim(api.q('bolt'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 1, offset: .7 }, { opacity: 0 }], { duration: 650 });
      api.snd('thunder');
      await api.wait(200); api.shake(6);
    };
    api.tap(api.q('clouds'), 'Nuvens de chuva', storm);
    api.tap(api.q('arcaHit'), 'A arca', () => {
      api.anim(api.act(api.q('arca')), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(0deg)' }], { duration: 1400, easing: 'ease-in-out' });
      api.snd('splash');
      api.bubble(400, 260, 'Aqui dentro estamos seguros!', { key: 'a' });
    });
    api.tap(api.q('water'), 'Ondas', e => { api.snd('splash'); api.burst(e && e.target && e.target.getAttribute('cx') ? +e.target.getAttribute('cx') : 400, 690, 'ripple', 3); });
  }
});

/* =====================================================================
   8 — SEGUROS COM DEUS (dentro da arca)
   ===================================================================== */
SCENES.push({
  key: 'seguros', title: 'Seguros com Deus', ref: 'Gênesis 7.23; 8.1', tint: 'dusk',
  text: [
    'Lá fora, chovia sem parar. Mas dentro da arca estava tudo bem.',
    'Deus cuidava de Noé e dos animais. Deus não se esqueceu deles nem um minutinho!'
  ],
  fact: 'A arca tinha três andares, cheios de animais!',
  hint: 'Toca no Noé e nos animais a dormir.',
  alt: 'Dentro da arca, à luz de uma lamparina: Noé leva feno aos animais; o elefante, os leões e as ovelhas dormem, e pombas descansam numa viga.',
  cue: [600, 600],
  art() {
    let s = `<defs>${lg('wall', [[0, '#8a5634'], [1, '#6e4128']])}${rg('lamp', [[0, '#ffd88a', .7], [.6, '#ffc25e', .18], [1, '#ffc25e', 0]])}</defs>`;
    s += `<rect x="-40" y="-40" width="900" height="900" fill="${UR('wall')}"/>`;
    s += `<g stroke="#5e3420" stroke-width="3" opacity=".55">${[60, 130, 200, 270, 340, 410, 480, 550, 620, 690, 760].map(y => `<path d="M-40,${y} L840,${y}"/>`).join('')}</g>`;
    s += `<g transform="translate(110,150)"><rect x="-56" y="-48" width="112" height="96" rx="10" fill="#2c3554" stroke="${OL}" stroke-width="5"/><g clip-path="url(#${P}-winclip)"><g transform="translate(-66,-64) scale(.15)">${rainSheet({ seed: 8, n: 30, col: '#a9c6e6', w: 14 })}</g></g><defs><clipPath id="${P}-winclip"><rect x="-52" y="-44" width="104" height="88" rx="8"/></clipPath></defs><path d="M0,-48 L0,48 M-56,0 L56,0" stroke="#5e3420" stroke-width="8"/></g>`;
    s += `<rect x="-40" y="352" width="900" height="26" fill="#9a6234" stroke="${OL}" stroke-width="4"/>`;
    s += `<g transform="translate(400,60)"><path d="M0,-80 L0,0" stroke="${OL}" stroke-width="4"/><g data-k="lamp"><g class="sway" style="--r:5deg;--d:2.6s"><circle cx="0" cy="40" r="170" fill="${UR('lamp')}"/><path d="M-20,0 L20,0 L26,40 L-26,40 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3"/><g transform="translate(0,30)"><g class="flicker"><path d="M0,-22 C6,-12 8,-6 5,-1 C2,3 -2,3 -5,-1 C-8,-6 -6,-12 0,-22 Z" fill="#ffb238"/></g></g></g></g></g>`;
    s += `<path d="M-40,250 L840,250" stroke="${OL}" stroke-width="18"/><path d="M-40,250 L840,250" stroke="#a8703f" stroke-width="10"/>`;
    s += dove({ x: 500, y: 236, s: 1.15, flying: false, k: 'pom1' }) + dove({ x: 590, y: 236, s: 1.1, flying: false, flip: true, k: 'pom2' });
    s += sheep({ x: 250, y: 348, s: 1.05, pose: 'sleep', k: 'ov1' }) + sheep({ x: 400, y: 348, s: .98, pose: 'sleep', face: '#f1d2bb', flip: true, k: 'ov2' });
    s += `<g transform="translate(700,352)">${blob([[-40, -14, 22], [0, -22, 26], [40, -14, 22]], '#e9cf73', 3)}<g stroke="#c9a54e" stroke-width="3" stroke-linecap="round"><path d="M-30,-24 l10,-10 M-4,-34 l6,-12 M22,-26 l10,-8"/></g></g>`;
    s += `<rect x="-40" y="700" width="900" height="200" fill="#7a4a2a"/><path d="M-40,700 L840,700" stroke="${OL}" stroke-width="5"/>`;
    s += elephant({ x: 200, y: 700, s: .78, sleep: true, cls: 'breath', k: 'ele' });
    s += `<text class="zzz svgtxt" style="--d:3s" x="300" y="560" font-size="30" fill="#fffaf0">z</text>`;
    s += lion({ x: 420, y: 702, s: .55, lamb: false, sleep: true, k: 'leo1' }) + lion({ x: 450, y: 712, s: .5, lamb: false, mane: false, sleep: true, flip: true, k: 'leo2' });
    s += noe({ x: 620, y: 702, s: .86, face: 'smile', look: -.6, armL: { a: 64, b: 30, item: `<g transform="translate(0,6)">${blob([[-14, 0, 12], [0, -6, 14], [14, 0, 12]], '#e9cf73', 2.6)}</g>` }, armR: { a: 14 }, k: 'noe' });
    return s;
  },
  setup(api) {
    api.tap(api.q('noe'), 'Noé', () => { api.snd('lullaby'); api.bubble(620, 420, 'Boa noite, animais. Deus cuida de nós!', { key: 'n', dur: 3000 }); api.burst(620, 470, 'heart', 4); });
    api.tap(api.q('lamp'), 'Lamparina', () => { api.snd('chime', 'A5'); api.burst(400, 110, 'spark', 8, { col: '#ffd88a' }); });
    const zz = (k, x, y) => api.tap(api.q(k), 'Animal a dormir', () => { api.snd('snore'); api.bubble(x, y, 'Zzz...', { key: k, size: 26, dur: 1300 }); });
    zz('ele', 220, 520); zz('leo1', 420, 600); zz('leo2', 470, 610); zz('ov1', 250, 280); zz('ov2', 400, 280);
    for (const k of ['pom1', 'pom2']) api.tap(api.q(k), 'Pomba', () => { api.snd('coo'); api.hop(api.q(k), 8); });
  }
});

/* =====================================================================
   9 — A CHUVA PAROU
   ===================================================================== */
SCENES.push({
  key: 'parou', title: 'A chuva parou', ref: 'Gênesis 8.1-5', tint: 'sky',
  text: [
    'Um dia, a chuva parou! Deus mandou um vento, e a água começou a baixar.',
    'A arca parou em cima de umas montanhas.'
  ],
  fact: 'As montanhas onde a arca parou chamam-se Ararate.',
  hint: 'Toca no sol para a água baixar.',
  alt: 'O sol aparece entre as nuvens; a arca descansa no alto de uma montanha cercada de água.',
  cue: [620, 150],
  art() {
    let s = sky('sky', [[0, '#8fd0f0'], [.6, '#dff1f6'], [1, '#dff1f6']]);
    s += sun(620, 150, 54, { face: true, k: 'sol' });
    s += cloud(170, 130, 1, {}) + cloud(380, 210, .7, { dx: -30 }) + cloud(760, 260, .8);
    s += mountain(170, 640, 380, 300, { fill: '#8f9a8c' }) + mountain(640, 640, 420, 330, { fill: '#9a9186' });
    s += mountain(400, 640, 520, 420, { fill: '#a39a8e', snow: '#fbfbf8' });
    s += hill([[-40, 618], [200, 596], [400, 606], [600, 590], [840, 604]], '#9cc865') + hill([[-40, 700], [240, 680], [480, 694], [720, 676], [840, 688]], '#8bbd55');
    s += arca(404, 236, .3, { door: 'closed', lit: true, k: 'arca' });
    s += `<g data-k="water">${waveBand(400, { fill: '#3f8fc2', amp: 12, len: 120, dx: 40, d: 6, foam: '#bfe2f4', bottom: 1400 })}${waveBand(470, { fill: '#3584b8', amp: 14, len: 150, dx: -40, d: 7, foam: '#cfeaf7', bottom: 1400 })}</g>`;
    s += `<g data-k="birds" opacity="0">${bird(240, 260, .9) + bird(290, 290, .7, { d: 10 })}</g>`;
    return s;
  },
  setup(api) {
    let level = 0;
    const go = async () => {
      if (api.st.busy || level >= 2) { api.snd('chime', 'E6'); api.burst(620, 150, 'spark', 8, { col: '#fff1b0' }); return; }
      api.st.busy = true; level++;
      api.snd('wind');
      api.anim(api.q('sol'), [{ transform: 'translate(620px,150px) scale(1)' }, { transform: 'translate(620px,150px) scale(1.15)' }, { transform: 'translate(620px,150px) scale(1)' }], { duration: 900 });
      await api.anim(api.q('water'), [{ transform: `translateY(${(level - 1) * 170}px)` }, { transform: `translateY(${level * 170}px)` }], { duration: 2000, fill: 'forwards', easing: 'ease-in-out' });
      if (level === 2) {
        api.anim(api.q('birds'), [{ opacity: 0 }, { opacity: 1 }], { duration: 800, fill: 'forwards' });
        api.snd('tada');
        api.bubble(404, 120, 'A terra está a aparecer!', { key: 'a', below: true });
        api.nudgeNext(1600);
      }
      api.st.busy = false;
    };
    api.tap(api.q('sol'), 'Sol', go);
    api.tap(api.q('arca'), 'A arca', () => { api.hop(api.q('arca'), 10); api.snd('knock', 1); });
  }
});

/* =====================================================================
   10 — A POMBINHA VOLTOU
   ===================================================================== */
SCENES.push({
  key: 'pomba', title: 'A pombinha voltou', ref: 'Gênesis 8.6-12', tint: 'sky',
  text: [
    'Noé abriu a janela e soltou uma pombinha.',
    'Ao fim da tarde, ela voltou com uma folha verde no bico! A terra estava a secar.'
  ],
  fact: 'Depois, Noé soltou a pombinha outra vez. Ela não voltou mais: tinha encontrado uma casinha!',
  hint: 'Toca na pombinha.',
  alt: 'Noé na janela da arca segura uma pomba branca; ao longe, uma oliveira aparece num monte acima da água.',
  cue: [356, 330],
  art() {
    let s = sky('sky', [[0, '#9bd4f0'], [.55, '#fbe3c0'], [1, '#fbe3c0']]);
    s += sun(560, 140, 40, {});
    s += cloud(470, 220, .8) + cloud(720, 120, .7, { dx: -30 });
    s += hill([[440, 470], [560, 412], [680, 400], [840, 430]], '#a7c776', '', 900);
    s += olive(640, 418, .8, {});
    s += waveBand(470, { fill: '#5aa6d2', amp: 10, len: 110, dx: 30, d: 6, foam: '#d6eff9' });
    s += `<rect x="-40" y="-40" width="330" height="900" fill="#c98f57" stroke="${OL}" stroke-width="5"/><g stroke="#a46e3c" stroke-width="4" opacity=".8">${[60, 160, 260, 360, 460, 560, 660, 760].map(y => `<path d="M-40,${y} L290,${y}"/>`).join('')}</g>`;
    s += `<path d="M290,-40 L290,860" stroke="${OL}" stroke-width="5"/>`;
    s += `<rect x="40" y="220" width="200" height="300" rx="16" fill="#3e2416" stroke="${OL}" stroke-width="5"/>`;
    s += noe({ x: 150, y: 640, s: 1.14, face: 'grin', look: .8, armR: { a: 100, b: -24 }, armL: { a: 30, b: 40 }, k: 'noe' });
    s += `<rect x="20" y="510" width="250" height="34" rx="8" fill="#a46e3c" stroke="${OL}" stroke-width="5"/>`;
    s += `<rect x="-40" y="544" width="330" height="320" fill="#c98f57"/><g stroke="#a46e3c" stroke-width="4" opacity=".8">${[600, 680, 760].map(y => `<path d="M-40,${y} L290,${y}"/>`).join('')}</g>`;
    s += dove({ x: 356, y: 330, s: 1.3, flying: true, k: 'pomba' });
    s += `<g data-k="pomba2" opacity="0">${dove({ x: 0, y: 0, s: 1.3, flying: true, leaf: true })}</g>`;
    return s;
  },
  setup(api) {
    const pa = api.q('pomba'), pb = api.q('pomba2');
    const fly = async () => {
      if (api.st.busy) return; api.st.busy = true;
      if (api.st.done) { api.snd('coo'); api.burst(356, 320, 'heart', 3); api.st.busy = false; return; }
      api.snd('coo');
      await api.anim(api.act(pa), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(160px,-120px)', offset: .5 }, { transform: 'translate(290px,30px) scale(.5)', opacity: 0 }], { duration: 1600, easing: 'ease-in-out', fill: 'forwards' });
      api.burst(640, 340, 'spark', 6, { col: '#bfe08a' });
      await api.wait(500);
      pb.setAttribute('opacity', '1');
      await api.anim(pb, [{ transform: 'translate(640px,340px) scale(.5) scaleX(-1)' }, { transform: 'translate(500px,200px) scale(.9) scaleX(-1)', offset: .5 }, { transform: 'translate(356px,330px) scale(1) scaleX(-1)' }], { duration: 1600, easing: 'ease-in-out', fill: 'forwards' });
      api.snd('tada');
      api.bubble(150, 300, 'Uma folha de oliveira! A terra está a secar!', { key: 'n', dur: 3200 });
      api.st.done = true; api.st.busy = false;
      api.nudgeNext(2600);
    };
    api.tap(pa, 'Pombinha', fly);
    api.tap(api.q('noe'), 'Noé', fly);
  }
});

/* =====================================================================
   11 — TODOS PARA FORA!
   ===================================================================== */
SCENES.push({
  key: 'fora', title: 'Todos para fora!', ref: 'Gênesis 8.15-19', tint: 'meadow',
  text: [
    'Então Deus disse:',
    { q: 'Sai da arca, tu, a tua família e todos os animais!', who: 'deus' },
    'Que festa! Os animais correram, saltaram e voaram.'
  ],
  fact: 'Os animais tiveram crias e encheram a terra outra vez.',
  hint: 'Toca nos animais para eles saírem a correr.',
  alt: 'A arca no chão seco; a família de Noé acena enquanto elefante, girafa, zebra, coelhos e pássaros saem pela rampa.',
  cue: [520, 640],
  art() {
    let s = bgDay({ sunX: 140, sunY: 130, sunR: 42 });
    s += hill([[-40, 420], [200, 396], [420, 412], [640, 390], [840, 404]], '#cfe2ae');
    s += arca(640, 520, .6, { door: 'open', ramp: true, rampX: 160, rampY: 150, flip: true, lit: true });
    s += hill([[-40, 520], [220, 500], [460, 512], [700, 496], [840, 506]], '#a9cf6c');
    s += `<rect x="-40" y="540" width="900" height="320" fill="#9cc865"/>`;
    s += noe({ x: 132, y: 640, s: .82, face: 'joy', look: .7, armR: { a: 150, b: -20 }, k: 'noe' }) + person(Object.assign({}, ESPOSA, { x: 220, y: 650, s: .74, face: 'joy', look: .6, armL: { a: 150, b: -20 }, k: 'esp' }));
    s += giraffe({ x: 500, y: 604, s: .52, flip: true, k: 'a1' });
    s += equine({ x: 610, y: 664, s: .5, kind: 'zebra', flip: true, k: 'a2' });
    s += elephant({ x: 470, y: 724, s: .58, flip: true, k: 'a3' });
    s += rabbit({ x: 600, y: 744, s: 1, flip: true, k: 'a4' }) + rabbit({ x: 650, y: 752, s: .95, col: '#c9b8a6', dark: '#a8957f', flip: true, k: 'a5' });
    s += dove({ x: 520, y: 380, s: .8, col: '#3f93c7', wing: '#2f6db5', k: 'a6' }) + dove({ x: 600, y: 330, s: .7, col: '#e5483f', wing: '#b8312f', k: 'a7' });
    s += flowerBand(121, 750, 795, 6);
    return s;
  },
  setup(api) {
    const run = [['a1', 'squeak', -170, -10], ['a2', 'heehaw', -280, 6], ['a3', 'trumpet', -140, 8], ['a4', 'squeak', -300, -6], ['a5', 'squeak', -210, 4], ['a6', 'coo', -150, -190], ['a7', 'coo', 60, -170]];
    let n = 0;
    for (const [k, snd, dx, dy] of run) {
      const el = api.q(k);
      api.tap(el, 'Animal a sair da arca', async () => {
        if (el.dataset.out) return; el.dataset.out = 1;
        api.snd(snd, snd === 'squeak' ? .9 + Math.random() * .3 : 1);
        const [, , sc] = api.pos(el);
        await api.anim(api.act(el), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${-dx * .3 / sc}px,${(dy * .3 - 30) / sc}px)`, offset: .25 }, { transform: `translate(${-dx * .6 / sc}px,${dy * .6 / sc}px)`, offset: .5 }, { transform: `translate(${-dx * .85 / sc}px,${(dy * .85 - 24) / sc}px)`, offset: .75 }, { transform: `translate(${-dx / sc}px,${dy / sc}px)` }], { duration: 1300, easing: 'ease-in-out', fill: 'forwards' });
        n++;
        if (n === run.length) { api.snd('victory'); api.burst(400, 300, 'confetti', 20); api.bubble(132, 380, 'Obrigado, Senhor!', { key: 'n' }); }
      });
    }
    api.tap(api.q('noe'), 'Noé', () => { api.wave(api.q('noe'), 'armR'); api.bubble(132, 380, 'Que festa!', { key: 'n' }); });
    api.tap(api.q('esp'), 'Mulher de Noé', () => { api.hop(api.q('esp'), 14); api.snd('clap'); });
  }
});

/* =====================================================================
   12 — O ARCO-ÍRIS DA PROMESSA
   ===================================================================== */
SCENES.push({
  key: 'arcoiris', title: 'O arco-íris da promessa', ref: 'Gênesis 8.20; 9.8-17', tint: 'gold',
  text: [
    'Noé agradeceu a Deus.',
    'Então Deus pôs um arco-íris no céu e prometeu:',
    { q: 'Nunca mais vou mandar uma chuva para cobrir toda a terra.', who: 'deus' }
  ],
  fact: 'Quando vires um arco-íris, lembra-te: Deus cumpre sempre o que promete!',
  hint: 'Toca nas nuvens para veres o arco-íris.',
  alt: 'Noé e a sua família oram ao lado de um altar de pedras; nuvens brancas no céu, onde vai aparecer um arco-íris.',
  cue: [400, 200],
  art() {
    let s = sky('sky', [[0, '#8ccdf0'], [.6, '#eef7f3'], [1, '#eef7f3']]);
    s += rainbow(400, 560, 360, { w: 24, k: 'rb', hidden: true });
    s += cloud(120, 540, 1.5) + cloud(690, 540, 1.5, { dx: -24 });
    s += cloud(400, 170, 1.15);
    s += hitC(400, 200, 130).replace('class="hit"', 'class="hit" data-k="nuvem"');
    s += hill([[-40, 540], [200, 512], [420, 530], [640, 506], [840, 524]], '#b6d77e');
    s += hill([[-40, 600], [220, 580], [460, 592], [700, 574], [840, 586]], '#9cc865');
    s += altar(520, 700, 1);
    s += person(Object.assign({}, NOE, { x: 340, y: 704, s: .96, legs: 'kneel', face: 'joy', look: .5, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 }, k: 'noe' }));
    s += person(Object.assign({}, ESPOSA, { x: 220, y: 700, s: .82, legs: 'kneel', face: 'smile', look: .5, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'esp' }));
    s += FILHOS.map((f, i) => person(Object.assign({}, f, { x: 640 + i * 54, y: 690 + i * 8, s: .62, face: 'smile', look: -.5, k: 'fi' + i }))).join('');
    s += flowerBand(131, 730, 790, 8);
    return s;
  },
  setup(api) {
    const NOTES = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
    const show = async () => {
      if (api.st.busy) return; api.st.busy = true;
      for (let i = 0; i < 7; i++) {
        const arc = api.svg.querySelector(`[data-k="rb${i}"]`);
        api.snd('chime', NOTES[i]);
        api.anim(arc, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
        await api.wait(220);
      }
      if (!api.st.shown) {
        api.st.shown = true;
        api.burst(400, 220, 'spark', 14, { col: '#ffffff' });
        await api.wait(500);
        api.bubble(400, 330, 'Deus cumpre sempre o que promete!', { key: 'p', dur: 3200 });
      }
      api.st.busy = false;
    };
    api.tap(api.q('nuvem'), 'Nuvens', show);
    api.tap(api.q('noe'), 'Noé a orar', () => { api.snd('anoint'); api.burst(340, 470, 'heart', 5); api.bubble(340, 450, 'Obrigado, Senhor!', { key: 'n' }); });
    api.tap(api.q('altar'), 'Altar', () => { api.snd('chime', 'E6'); api.burst(520, 600, 'spark', 6, { col: '#ffd27a' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Fim de tarde: a arca descansa no monte, um arco-íris suave aparece no céu e uma pombinha dorme num ramo.',
  cue: [600, 150],
  questions: [
    ['O que é que Deus mandou Noé fazer?', 'Um barco enorme: a arca!'],
    ['Como é que os animais entraram na arca?', 'De dois em dois.'],
    ['Quantos dias choveu?', 'Quarenta dias e quarenta noites.'],
    ['O que é que a pombinha trouxe no bico?', 'Uma folha verde.'],
    ['O que é que o arco-íris nos lembra?', 'Que Deus cumpre sempre o que promete.']
  ],
  wrong: [
    ['Uma torre muito alta.', 'Uma casa na árvore.', 'Um poço fundo.'],
    ['Todos a correr de uma vez.', 'Um de cada vez.', 'De dez em dez.'],
    ['Um dia e uma noite.', 'Sete dias.', 'Cem dias e cem noites.'],
    ['Um peixe.', 'Uma pedra.', 'Uma flor vermelha.'],
    ['Que vai chover outra vez.', 'Que é hora de dormir.', 'Que há um tesouro no fim.']
  ],
  verse: ['Eu pus o meu arco nas nuvens. Ele é o sinal da minha promessa.', 'Gênesis 9.13'],
  art() {
    let s = sky('sky', [[0, '#1f2a63'], [.45, '#6a5a9a'], [.75, '#f2a27a'], [1, '#f2a27a']]);
    s += starField(19, 60, 0, 0, 800, 330, { big: .12 });
    const BIG = [[180, 120], [320, 80], [470, 140], [600, 150], [700, 90]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += `<g opacity=".45">${rainbow(400, 560, 330, { w: 16 })}</g>`;
    s += mountain(400, 640, 560, 230, { fill: '#5d5878', snow: '#e9e3f2' });
    s += arca(404, 416, .26, { door: 'closed', lit: true });
    s += `<text x="400" y="330" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 580], [420, 592], [640, 572], [840, 586]], '#3f5f58');
    s += hill([[-40, 680], [240, 660], [480, 672], [720, 652], [840, 664]], '#33504a');
    s += `<g transform="translate(590,690)"><path d="M-160,0 C-110,-30 -40,-40 30,-30" stroke="${OL}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M-160,0 C-110,-30 -40,-40 30,-30" stroke="#6b4a33" stroke-width="8" fill="none" stroke-linecap="round"/>${[[-120, -24], [-70, -34], [-20, -38]].map(([x, y]) => `<g transform="translate(${x},${y})"><path d="M0,0 C8,-8 22,-8 30,0 C22,6 8,6 0,0 Z" fill="#7fae4a" stroke="${OL}" stroke-width="2"/></g>`).join('')}</g>`;
    s += dove({ x: 530, y: 650, s: 1.1, flying: false, k: 'pomba' });
    s += sheep({ x: 250, y: 712, s: 1, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
    for (let i = 0; i < 7; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${80 + i * 100}" cy="${640 + (i % 3) * 30}" r="3" fill="#f6f39a"/>`;
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
    api.tap(api.q('pomba'), 'Pombinha', () => { api.snd('coo'); api.burst(530, 610, 'heart', 3); });
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(270, 640, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'noe',
  title: 'Noé e a Grande Arca',
  cover: { kicker: 'Uma história da Bíblia', title: 'Noé', small: 'e a Grande Arca', sub: 'Deus cuida de nós e cumpre o que promete' },
  color: '#6b3a1f',
  ref: 'Gênesis 6 a 9',
  scenes: SCENES
});
})();
