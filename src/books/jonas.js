/* =====================================================================
   LIVRO: JONAS E O GRANDE PEIXE  (Jonas 1 a 4)
   ===================================================================== */
(() => {
const SCENES = [];
const JONAS = { kind: 'adult', skin: '#d39463', hair: '#3a2520', hairStyle: 'short', beard: 'short', tunic: '#2f8a83', stripes: '#7cc4b8', belt: '#d9a33a' };
const jonas = o => person(Object.assign({}, JONAS, o));
const MARUJOS = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', head: 'cloth', clothCol: '#d9643f', bandCol: '#b5402f', beard: 'short', tunic: '#f4efe6', stripes: '#3f7fb0', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', hair: '#5a3020', head: 'cloth', clothCol: '#3f7fb0', bandCol: '#2f5f8f', tunic: '#e9c46a', stripes: '#b5402f', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#2b1d17', beard: 'bushy', beardCol: '#2b1d17', tunic: '#b85c38', belt: '#5b3a2a' }
];
const CAPITAO = { kind: 'adult', skin: '#d79a68', hair: '#9a9590', beard: 'bushy', beardCol: '#c9c4bc', browCol: '#c9c4bc', head: 'cloth', clothCol: '#2f4f7f', bandCol: '#f2c14e', tunic: '#2f4f7f', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' }
];
const SACO = '#8f7756', SACO_D = '#6f5c43';

/* ---------- peças desta história ---------- */
function bigFish(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: 'peixe', cls: 'bob', open: false }, o);
  const c = '#4f87b8', cd = '#3d6f9c', belly = '#cfe7f1', fin = '#3f78a8';
  let g = '';
  g += `<path d="M-236,-6 C-270,-40 -300,-96 -332,-112 C-318,-60 -316,-30 -300,-4 C-316,24 -320,60 -334,106 C-298,92 -266,40 -236,10 Z" fill="${fin}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<path d="M-96,-126 C-66,-198 26,-210 72,-128 Z" fill="${fin}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<path d="M-250,0 C-244,-104 -80,-150 70,-136 C170,-126 248,-70 262,-6 C268,40 214,104 80,124 C-70,146 -244,104 -250,0 Z" fill="${c}" stroke="${OL}" stroke-width="5"/>`;
  g += `<path d="M-222,34 C-160,98 0,122 120,106 C190,94 238,62 256,24 C200,62 60,82 -60,72 C-140,64 -190,48 -222,34 Z" fill="${belly}"/>`;
  g += `<g fill="#78a9d4" opacity=".8">${[[-150, -60, 16], [-90, -90, 12], [-30, -62, 18], [-110, -26, 11], [30, -96, 12], [-190, -20, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
  g += `<path d="M110,-92 C82,-42 84,40 118,94" stroke="${cd}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  g += `<path d="M18,34 C-2,74 28,112 76,102 C66,82 60,58 52,32 Z" fill="${fin}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>`;
  g += `<g class="eyes" style="${dl(5)}"><circle cx="170" cy="-46" r="30" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="180" cy="-42" r="16" fill="${OL}"/><circle cx="186" cy="-50" r="6" fill="#fff"/></g>`;
  g += `<ellipse cx="194" cy="14" rx="18" ry="10" fill="#ef7d78" opacity=".45"/>`;
  g += `<path d="M206,44 Q236,58 262,26" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round" data-p="smile"/>`;
  g += `<g transform="translate(250,20)"><g data-p="mouth" style="transform: scaleY(${d.open ? 1 : 0})"><ellipse cx="0" cy="0" rx="40" ry="44" fill="#4a1e2a" stroke="${OL}" stroke-width="5"/><ellipse cx="-2" cy="24" rx="24" ry="13" fill="#e8737a"/>${d.inside ? `<defs><clipPath id="${ID('boca')}"><ellipse cx="0" cy="0" rx="38" ry="42"/></clipPath></defs><g clip-path="${UR('boca')}">${d.inside}</g>` : ''}</g></g>`;
  const h = d.k ? `<ellipse class="hit" cx="0" cy="-6" rx="300" ry="150" fill="#000" fill-opacity="0"/>` : '';
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${d.flip ? -d.s : d.s},${d.s})"${d.k ? ` data-k="${d.k}"` : ''}><g class="act"><g class="${d.cls}" style="${dl(4)}">${g}${h}</g></g></g>`;
}
function fishSmall(x, y, s = 1, col = '#f28c3a', o = {}) {
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g class="swim" style="--dx:${o.dx ?? 30}px;--d:${o.d ?? 5}s;${dl(5)}"><path d="M-22,0 C-12,-16 14,-16 24,0 C14,16 -12,16 -22,0 Z" fill="${col}" stroke="${OL}" stroke-width="2.8"/><path d="M-20,0 L-36,-12 L-34,12 Z" fill="${col}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M0,-12 Q-4,0 0,12" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>${eyeDot(12, -3, 3)}${o.k ? hitC(0, 0, 30) : ''}</g></g></g>`;
}
function seaweed(x, y, h = 120, col = '#3f9a5a') {
  return `<g transform="translate(${x},${y})"><g class="sway" style="--r:7deg;--d:${(3 + Math.random() * 2).toFixed(1)}s;${dl(4)}"><path d="M0,0 C-16,${-h * .25} 16,${-h * .5} 0,${-h * .75} C-10,${-h * .88} 6,${-h} 0,${-h}" stroke="${OL}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M0,0 C-16,${-h * .25} 16,${-h * .5} 0,${-h * .75} C-10,${-h * .88} 6,${-h} 0,${-h}" stroke="${col}" stroke-width="9" fill="none" stroke-linecap="round"/></g></g>`;
}
function bubbles(seed, n, x0, x1, y0, y1) {
  const R = rng(seed); let s = '';
  for (let i = 0; i < n; i++) s += `<circle class="rise" style="--d:${(3 + R() * 3).toFixed(1)}s;--dx:${r1(-10 + R() * 20)}px;${dl(6)}" cx="${r1(x0 + R() * (x1 - x0))}" cy="${r1(y0 + R() * (y1 - y0))}" r="${r1(4 + R() * 8)}" fill="none" stroke="#e6f6fc" stroke-width="3" opacity=".8"/>`;
  return s;
}
function ship(x, y, s = 1, o = {}) {
  const hullC = '#8a4f2c', rail = '#c98f57';
  let g = '';
  g += `<path d="M0,-62 L0,-372" stroke="${OL}" stroke-width="20" stroke-linecap="round"/><path d="M0,-62 L0,-372" stroke="#9a6b3e" stroke-width="12" stroke-linecap="round"/>`;
  g += `<path d="M0,-366 L246,-98 M0,-366 L-246,-98" stroke="#6e4628" stroke-width="3"/>`;
  g += `<g transform="translate(0,-344)"><g data-k="sail" style="transform: scaleY(${o.furled ? .16 : 1})"><path d="M-136,0 Q0,22 136,0 L124,214 Q0,240 -124,214 Z" fill="#f6ead0" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-62,10 Q-60,120 -58,228 M58,10 Q60,120 58,228" stroke="#d9433b" stroke-width="26"/><path d="M-136,0 Q0,22 136,0 L124,214 Q0,240 -124,214 Z" fill="none" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/></g></g>`;
  g += `<path d="M-148,-344 L148,-344" stroke="${OL}" stroke-width="14" stroke-linecap="round"/><path d="M-148,-344 L148,-344" stroke="#9a6b3e" stroke-width="8" stroke-linecap="round"/>`;
  g += `<g transform="translate(0,-372)"><path d="M0,0 L0,-30" stroke="#6b4a33" stroke-width="3"/><g transform="translate(0,-30)"><g class="wave" style="${dl(3)}"><path d="M0,0 C10,-4 20,4 34,0 L30,9 L34,18 C20,22 10,14 0,18 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2"/></g></g></g>`;
  if (o.crew) g += o.crew;
  g += `<path d="M-252,-100 C-238,-92 -226,-78 -216,-62 L216,-62 C226,-78 238,-92 252,-100 C248,-40 212,12 150,16 L-150,16 C-212,12 -248,-40 -252,-100 Z" fill="${hullC}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<path d="M-228,-40 L228,-40" stroke="#e9c46a" stroke-width="10"/><g fill="#3a2418" stroke="${OL}" stroke-width="3">${[-150, -75, 0, 75, 150].map(xx => `<circle cx="${xx}" cy="-12" r="9"/>`).join('')}</g>`;
  g += `<path d="M-220,-64 L220,-64" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-220,-64 L220,-64" stroke="${rail}" stroke-width="6" stroke-linecap="round"/>`;
  if (o.cargo) g += o.cargo;
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g class="${o.cls || ''}">${g}</g></g></g>`;
}
function crate(x, y, s = 1, k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><rect x="-26" y="-48" width="52" height="48" rx="4" fill="#c98f57" stroke="${OL}" stroke-width="3.4"/><path d="M-22,-44 L22,-4 M22,-44 L-22,-4" stroke="#a46e3c" stroke-width="5"/><rect x="-26" y="-48" width="52" height="48" rx="4" fill="none" stroke="${OL}" stroke-width="3.4"/>${k ? hitC(0, -24, 36) : ''}</g></g>`;
}
function barrel(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-24,-64 C-32,-44 -32,-20 -24,0 L24,0 C32,-20 32,-44 24,-64 Z" fill="#a46e3c" stroke="${OL}" stroke-width="3.4"/><path d="M-29,-48 L29,-48 M-29,-16 L29,-16" stroke="#6b4a33" stroke-width="5"/></g>`;
}
function stormSky(o = {}) {
  let s = sky('ssky', [[0, '#353e62'], [.6, '#5f6a8c'], [1, '#5f6a8c']]);
  s += `<rect data-k="flash" x="-40" y="-40" width="900" height="900" fill="#ffffff" opacity="0"/>`;
  s += `<g data-k="bolt" opacity="0"><path d="M${o.bx ?? 560},120 L${(o.bx ?? 560) - 36},230 L${(o.bx ?? 560) + 6},226 L${(o.bx ?? 560) - 44},360 L${(o.bx ?? 560) + 46},202 L${(o.bx ?? 560) + 4},206 L${(o.bx ?? 560) + 40},120 Z" fill="#fff6a8" stroke="#f2c14e" stroke-width="5" stroke-linejoin="round"/></g>`;
  const sets = [[110, 110, 1.25], [330, 80, 1.4], [570, 100, 1.3], [770, 80, 1.2], [220, 200, 1], [470, 190, 1.1], [690, 210, .95]];
  s += sets.map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:${i % 2 ? -22 : 24}px;--d:${9 + i}s;${dl(9)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#474e6b', 0)}${blob([[-22, -24, 18], [18, -20, 16]], '#59607e', 0)}</g></g>`).join('');
  s += hitC(400, 140, 140).replace('class="hit"', 'class="hit" data-k="nuvens"');
  return s;
}
function lightning(api) {
  api.anim(api.q('flash'), [{ opacity: 0 }, { opacity: .8 }, { opacity: 0 }, { opacity: .5 }, { opacity: 0 }], { duration: 520 });
  api.anim(api.q('bolt'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 1, offset: .7 }, { opacity: 0 }], { duration: 650 });
  api.snd('thunder');
  api.later(() => api.shake(6), 200);
}
function nineveh(x, y, s = 1) {
  let g = '';
  g += `<g transform="translate(200,-170)">${[0, 1, 2, 3].map(i => `<rect x="${-150 + i * 30}" y="${-70 - i * 56}" width="${300 - i * 60}" height="60" fill="${['#d9b98a', '#e2c497', '#e9cfa4', '#efd9b0'][i]}" stroke="${OL}" stroke-width="3.4"/>`).join('')}<rect x="-14" y="-294" width="28" height="40" fill="#5872b8" stroke="${OL}" stroke-width="3"/></g>`;
  g += `<g transform="translate(-250,-150)">${[0, 1].map(i => `<rect x="${-80 + i * 26}" y="${-60 - i * 50}" width="${160 - i * 52}" height="56" fill="${['#e2c497', '#ead2a6'][i]}" stroke="${OL}" stroke-width="3.4"/>`).join('')}</g>`;
  g += `<rect x="-420" y="-180" width="840" height="180" fill="#e2c497" stroke="${OL}" stroke-width="4"/>`;
  let br = '';
  for (let r = 0; r < 6; r++) for (let xx = -420 + (r % 2 ? 26 : 0); xx < 420; xx += 52) br += `<rect x="${xx}" y="${-174 + r * 30}" width="48" height="26" rx="3" fill="#d6b582"/>`;
  g += `<g opacity=".75">${br}</g>`;
  for (let xx = -420; xx < 420; xx += 40) g += `<rect x="${xx}" y="-206" width="24" height="28" fill="#e2c497" stroke="${OL}" stroke-width="3"/>`;
  for (const tx of [-300, 300]) g += `<rect x="${tx - 50}" y="-250" width="100" height="250" fill="#ead2a6" stroke="${OL}" stroke-width="4"/>${[-50, -20, 10, 40].map(dx => `<rect x="${tx + dx - 2}" y="-276" width="22" height="28" fill="#ead2a6" stroke="${OL}" stroke-width="3"/>`).join('')}<rect x="${tx - 10}" y="-210" width="20" height="34" rx="10" fill="#5a3a26"/>`;
  g += `<path d="M-80,0 L-80,-110 A80,80 0 0 1 80,-110 L80,0 Z" fill="#3f5fa8" stroke="${OL}" stroke-width="4"/><path d="M-56,0 L-56,-104 A56,56 0 0 1 56,-104 L56,0 Z" fill="#5a3a26" stroke="${OL}" stroke-width="3.4"/>`;
  g += `<g fill="#f2c14e">${[[-66, -60], [66, -60], [-60, -130], [60, -130], [0, -176]].map(([a, b]) => `<path d="${sparkle(9)}" transform="translate(${a},${b})"/>`).join('')}</g>`;
  g += flag(-300, -276, '#d9433b', .9) + flag(300, -276, '#d9433b', .9);
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function booth(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-80,0 L-70,-150 M80,0 L70,-150 M0,0 L0,-170" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-80,0 L-70,-150 M80,0 L70,-150 M0,0 L0,-170" stroke="#9a6b3e" stroke-width="5" stroke-linecap="round"/><path d="M-100,-140 Q-40,-190 0,-176 Q40,-190 100,-140 Q60,-128 0,-136 Q-60,-128 -100,-140 Z" fill="#e3c99a" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/></g>`;
}
function vine() {
  const leaf = (x, y, r, a) => `<g transform="translate(${x},${y}) rotate(${a}) scale(${r})"><path d="M0,0 C-26,-10 -34,-40 -14,-52 C-6,-56 0,-48 0,-40 C0,-48 6,-56 14,-52 C34,-40 26,-10 0,0 Z" fill="#6aa246" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/><path d="M0,-4 L0,-38" stroke="#4f8a3a" stroke-width="2.6"/></g>`;
  let g = `<path d="M0,0 C-10,-80 20,-150 -10,-210 C-40,-260 -150,-260 -190,-210" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M0,0 C-10,-80 20,-150 -10,-210 C-40,-260 -150,-260 -190,-210" stroke="#5f8f3e" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  g += [[4, -60, 1, 30], [-4, -120, 1.1, -30], [8, -170, 1.2, 40], [-30, -238, 1.3, -10], [-80, -258, 1.3, 10], [-130, -250, 1.25, -20], [-176, -226, 1.15, -60], [-50, -200, 1, 160], [-110, -210, 1, 190]].map(p => leaf(...p)).join('');
  return g;
}
function crab(x, y, s = 1, k = 'caranguejo') {
  return `<g transform="translate(${x},${y}) scale(${s})" data-k="${k}"><g class="act"><g class="bob">${[-1, 1].map(sg => `<path d="M${sg * 16},-10 l${sg * 14},10 M${sg * 18},-16 l${sg * 16},4 M${sg * 14},-4 l${sg * 10},14" stroke="${OL}" stroke-width="3.2" stroke-linecap="round"/>`).join('')}${[-1, 1].map(sg => `<path d="M${sg * 14},-26 l${sg * 12},-16" stroke="${OL}" stroke-width="3.4" stroke-linecap="round"/><circle cx="${sg * 28}" cy="-46" r="10" fill="#e5483f" stroke="${OL}" stroke-width="3"/><path d="M${sg * 24},-52 l${sg * 10},-4" stroke="${OL}" stroke-width="2.6"/>`).join('')}<ellipse cx="0" cy="-16" rx="24" ry="15" fill="#e5483f" stroke="${OL}" stroke-width="3"/><path d="M-6,-30 l0,-10 M6,-30 l0,-10" stroke="${OL}" stroke-width="2.6"/><circle cx="-6" cy="-42" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="6" cy="-42" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="-5.4" cy="-41.4" r="1.8" fill="${OL}"/><circle cx="6.6" cy="-41.4" r="1.8" fill="${OL}"/>${hitC(0, -24, 36)}</g></g></g>`;
}
function calmSea(y, o = {}) {
  return waveBand(y, { fill: o.c1 || '#4fa3d4', amp: 8, len: 120, dx: 26, d: 6, foam: '#d6eff9', fw: 4 }) + waveBand(y + 40, { fill: o.c2 || '#3f93c7', amp: 9, len: 150, dx: -30, d: 7, foam: '#cfeaf7', fw: 4 });
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jonas e o Grande Peixe',
  alt: 'Um peixe enorme e sorridente salta no mar azul; Jonas acena de dentro da boca do peixe; ao longe, um navio e gaivotas.',
  cue: [560, 840],
  art() {
    let s = sky('sky', [[0, '#6fc0ea'], [.5, '#bfe6f6'], [.72, '#ffe9c4'], [1, '#ffe9c4']], 1100);
    s += sun(640, 470, 50, { face: true });
    s += cloud(150, 460, 1.1) + cloud(470, 560, .7, { dx: -30 });
    s += bird(250, 560, .9, { col: '#5b6680' }) + bird(300, 590, .7, { d: 11, col: '#5b6680' });
    s += ship(170, 720, .26, { k: 'navio', cls: 'rock' });
    s += waveBand(722, { fill: '#5ab0de', amp: 10, len: 120, dx: 30, d: 6, foam: '#e3f4fb', fw: 4, bottom: 1300 });
    const peek = `<g data-k="jonas">${jonas({ x: -4, y: 170, s: .8, face: 'joy', look: .3, armR: { a: 150, b: -20 }, armL: { a: 20 } })}</g>`;
    s += bigFish({ x: 330, y: 872, s: 1.18, open: true, inside: peek, k: 'peixe', cls: 'hover' });
    s += waveBand(930, { fill: '#3f93c7', amp: 14, len: 140, dx: -40, d: 7, foam: '#d6eff9', bottom: 1300 });
    s += waveBand(1010, { fill: '#2f7fb4', amp: 16, len: 160, dx: 40, d: 8, foam: '#cfeaf7', bottom: 1300 });
    s += bubbles(5, 10, 120, 700, 960, 1080);
    s += fishSmall(150, 1040, 1.1, '#f2c14e', { k: 'p1' }) + fishSmall(640, 1060, 1, '#e86a9a', { flip: true, k: 'p2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('peixe'), 'Peixe grande', () => { api.snd('bubbles', 8); api.hop(api.q('peixe'), 18); api.burst(620, 820, 'spark', 6, { col: '#e6f6fc' }); });
    api.tap(api.q('jonas'), 'Jonas', () => { api.snd('hello'); api.bubble(620, 660, 'Olá! Eu sou o Jonas!', { key: 'j' }); });
    api.tap(api.q('navio'), 'Navio', () => { api.snd('seagull'); api.hop(api.q('navio'), 10); });
    for (const k of ['p1', 'p2']) api.tap(api.q(k), 'Peixinho', () => { api.snd('plip'); api.hop(api.q(k), 20); });
  }
});

/* =====================================================================
   1 — VÁ PARA NÍNIVE!
   ===================================================================== */
SCENES.push({
  key: 'ordem', title: 'Vai para Nínive!', ref: 'Jonas 1.1-2', tint: 'gold',
  text: [
    'Jonas era um profeta: levava os recados de Deus. Um dia, Deus disse:',
    { q: 'Vai à cidade de Nínive. Diz ao povo que pare de fazer coisas más.', who: 'deus' },
    'Mas Jonas não quis ir.'
  ],
  fact: 'Nínive era uma cidade enorme!',
  hint: 'Toca no Jonas.',
  alt: 'Numa vila com casas e palmeiras, Jonas cruza os braços, de cara fechada, enquanto uma luz dourada vem do céu; uma tabuleta aponta para Nínive.',
  cue: [400, 470],
  art() {
    let s = sky('sky', [[0, '#9fd2ee'], [.55, '#f7ead0'], [1, '#f7ead0']]);
    s += `<defs>${rg('glory', [[0, '#fff6c8', 1], [.5, '#ffe28a', .45], [1, '#ffe28a', 0]])}</defs><circle data-k="luz" cx="600" cy="90" r="240" fill="${UR('glory')}"/>`;
    s += cloud(560, 100, 1.1, { shade: '#f6e3b8' }) + cloud(700, 140, .8, { shade: '#f6e3b8' }) + cloud(150, 180, .8, { d: 13 });
    s += hill([[-40, 470], [200, 444], [420, 462], [640, 440], [840, 456]], '#dfe5b4');
    s += town(70, 380, .55) + palm(250, 470, .44);
    s += house(560, 520, 130, 110, { wall: '#ecd5a6', sw: 3 }) + palm(706, 520, .5);
    s += `<rect x="-40" y="520" width="900" height="340" fill="#e6d3a2"/><path d="M300,860 C340,700 420,600 520,520 L600,520 C520,600 470,700 470,860 Z" fill="#efdfb6"/>`;
    s += `<g transform="translate(650,620)" data-k="placa"><g class="act">${limb(0, 0, 0, -120, 8, '#9a6b3e')}<path d="M-6,-120 L96,-120 L120,-100 L96,-80 L-6,-80 Z" fill="#c98f57" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><text x="50" y="-91" text-anchor="middle" font-size="22" class="svgtxt" fill="${OL}">${tr('Nínive')}</text>${hitC(50, -80, 60)}</g></g>`;
    s += jonas({ x: 400, y: 704, s: 1.12, face: 'frown', look: -.3, armL: { a: -30, b: -96 }, armR: { a: -30, b: -96 }, k: 'jonas' });
    s += grassBand(141, 700, 790, 6, ['#9aae5a']);
    return s;
  },
  setup(api) {
    const j = api.q('jonas');
    api.tap(j, 'Jonas', () => { api.shakeHead(j); api.snd('hm'); api.bubble(400, 420, 'Nínive? Eu não quero ir!', { key: 'j' }); });
    api.tap(api.q('luz'), 'Luz de Deus', () => { api.snd('anoint'); api.burst(600, 120, 'spark', 10, { col: '#fff1b0' }); });
    api.tap(api.q('placa'), 'Tabuleta', () => { api.snd('knock', 1); api.bubble(690, 440, 'Nínive é para ali!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   2 — JONAS FUGIU
   ===================================================================== */
SCENES.push({
  key: 'fugiu', title: 'Jonas fugiu', ref: 'Jonas 1.3', tint: 'water',
  text: [
    'Jonas correu para o porto e entrou num navio. O navio ia para muito longe!',
    'Jonas queria fugir de Deus. Mas ninguém consegue se esconder de Deus!'
  ],
  fact: 'O navio ia para o lado contrário de Nínive.',
  hint: 'Toca no Jonas e depois no navio.',
  alt: 'No porto, Jonas corre pelo cais com um saco até um navio de vela às riscas; gaivotas voam sobre o mar.',
  cue: [210, 560],
  art() {
    let s = bgDay({ sunX: 680, sunY: 120, sunR: 40 });
    s += `<g data-k="gaivotas">${bird(200, 200, 1.1, { col: '#5b6680' }) + bird(260, 230, .9, { col: '#5b6680', d: 10 }) + bird(520, 180, .8, { col: '#5b6680', d: 8 })}${hitC(250, 210, 70)}</g>`;
    s += hill([[-40, 470], [120, 450], [240, 470], [330, 520]], '#d8cfa2', '', 900);
    s += `<rect x="-40" y="520" width="900" height="340" fill="#4fa3d4"/>`;
    s += ship(560, 600, .78, { furled: true, k: 'navio', cls: 'bob', crew: `<g transform="translate(150,-64)">${person(Object.assign({}, MARUJOS[0], { s: .9, face: 'smile', look: -.6, armR: { a: 150, b: -20 } }))}</g>` });
    s += calmSea(600);
    s += `<g><rect x="-40" y="560" width="380" height="26" fill="#b07b4a" stroke="${OL}" stroke-width="4"/>${[0, 70, 140, 210, 280].map(xx => `<rect x="${xx}" y="586" width="20" height="200" fill="#8a5a33" stroke="${OL}" stroke-width="3.4"/>`).join('')}<g stroke="#8a5a33" stroke-width="3">${[30, 90, 150, 210, 270, 320].map(xx => `<path d="M${xx},562 L${xx},584"/>`).join('')}</g></g>`;
    s += `<path d="M330,566 L412,532" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M330,566 L412,532" stroke="#c98f57" stroke-width="10" stroke-linecap="round"/>`;
    s += jonas({ x: 210, y: 562, s: .9, legs: 'run', face: 'worry', look: .6, armL: { a: 40, b: 50, item: `<g transform="translate(0,4)"><path d="M-16,-6 L16,-6 Q20,18 12,22 L-12,22 Q-20,18 -16,-6 Z" fill="#b57c46" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/></g>` }, armR: { a: 70, b: 30 }, k: 'jonas' });
    return s;
  },
  setup(api) {
    const j = api.q('jonas'), nav = api.q('navio');
    api.tap(j, 'Jonas', async () => {
      if (api.st.on) return; api.st.on = true;
      api.snd('tiptoe');
      await api.anim(api.act(j), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(60px,-10px)', offset: .25 }, { transform: 'translate(120px,0px)', offset: .5 }, { transform: 'translate(200px,-46px)', offset: .8 }, { transform: 'translate(250px,-60px) scale(.7)', opacity: 0 }], { duration: 1500, easing: 'linear', fill: 'forwards' });
      api.bubble(560, 270, 'Bem-vindo a bordo!', { key: 'm' });
      api.nudgeNext(4000);
    });
    api.tap(nav, 'Navio', async () => {
      if (!api.st.on) { api.bubble(560, 270, 'Esperem pelo Jonas!', { key: 'm', size: 26 }); return; }
      if (api.st.gone) return; api.st.gone = true;
      api.snd('wind');
      await api.anim(api.q('sail'), [{ transform: 'scaleY(.16)' }, { transform: 'scaleY(1)' }], { duration: 900, fill: 'forwards', easing: 'ease-out' });
      api.anim(api.act(nav), [{ transform: 'translateX(0px)' }, { transform: 'translateX(420px)' }], { duration: 3400, fill: 'forwards', easing: 'ease-in' });
      api.snd('seagull');
    });
    api.tap(api.q('gaivotas'), 'Gaivotas', () => api.snd('seagull'));
  }
});

/* =====================================================================
   3 — UMA TEMPESTADE ENORME
   ===================================================================== */
SCENES.push({
  key: 'tempestade', title: 'Uma tempestade enorme', ref: 'Jonas 1.4-5', tint: 'stone',
  text: [
    'No meio do mar, veio um vento forte. Fuuu! E uma tempestade enorme!',
    'As ondas sacudiam o navio. Os marinheiros ficaram com medo e atiraram a carga ao mar.'
  ],
  fact: 'Os marinheiros nunca tinham visto uma tempestade assim!',
  hint: 'Toca nas caixas e nas nuvens.',
  alt: 'Na tempestade, o navio balança entre ondas enormes; marinheiros assustados seguram caixas no convés; relâmpagos cortam o céu.',
  cue: [470, 470],
  art() {
    let s = stormSky({ bx: 600 });
    s += rainSheet({ seed: 11, n: 70, col: '#cfe0f2', w: 3 });
    s += waveBand(520, { fill: '#2f6f9e', amp: 22, len: 150, dx: 50, d: 4, foam: '#a9d6ee' });
    const crew = `<g transform="translate(-110,-64)">${person(Object.assign({}, MARUJOS[0], { s: .95, face: 'scared', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } }))}</g><g transform="translate(110,-64)">${person(Object.assign({}, MARUJOS[1], { s: .95, face: 'worry', look: -.5, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 }, flip: true }))}</g>`;
    const cargo = crate(-30, -64, 1, 'cx0') + crate(34, -64, .9, 'cx1') + crate(2, -108, .85, 'cx2');
    s += ship(400, 600, .74, { k: 'navio', cls: 'rock', crew, cargo });
    s += waveBand(600, { fill: '#2a6593', amp: 24, len: 170, dx: -60, d: 5, foam: '#bfe2f4' });
    s += waveBand(690, { fill: '#245a86', amp: 26, len: 190, dx: 70, d: 6, foam: '#cfeaf7' });
    return s;
  },
  setup(api) {
    let n = 0;
    for (let i = 0; i < 3; i++) {
      const c = api.q('cx' + i);
      api.tap(c, 'Caixa de carga', async () => {
        if (c.dataset.out) return; c.dataset.out = 1;
        api.snd('grunt');
        const dir = i === 1 ? 1 : -1;
        await api.anim(api.act(c), [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: `translate(${dir * 160}px,-160px) rotate(${dir * 90}deg)`, offset: .45 }, { transform: `translate(${dir * 330}px,180px) rotate(${dir * 200}deg)`, opacity: 0 }], { duration: 1000, easing: 'ease-in', fill: 'forwards' });
        api.snd('splash');
        api.burst(400 + dir * 250, 640, 'ripple', 3);
        n++;
        if (n === 3) api.bubble(400, 200, 'Atirem tudo ao mar!', { key: 'm' });
      });
    }
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => lightning(api));
    api.tap(api.q('navio'), 'Navio', () => { api.snd('splash'); api.anim(api.act(api.q('navio')), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(0deg)' }], { duration: 1200 }); });
  }
});

/* =====================================================================
   4 — JONAS DORMIA
   ===================================================================== */
SCENES.push({
  key: 'dormia', title: 'Jonas dormia', ref: 'Jonas 1.5-6', tint: 'dusk',
  text: [
    'E Jonas? Estava a dormir lá em baixo, no fundo do navio! Ronc, ronc...',
    'O capitão desceu a correr:',
    { q: 'Acorda, Jonas! Ora ao teu Deus!', who: 'outro' }
  ],
  fact: 'Jonas dormia tanto que nem deu pela tempestade.',
  hint: 'Toca no capitão para acordar o Jonas.',
  alt: 'No porão do navio, entre barris e caixas, Jonas dorme numa rede; o capitão desce a escada, preocupado.',
  cue: [610, 500],
  art() {
    let s = `<defs>${lg('hold', [[0, '#6e4128'], [1, '#4e2d1c']])}${rg('lamp', [[0, '#ffd88a', .6], [.6, '#ffc25e', .15], [1, '#ffc25e', 0]])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('hold')}"/>`;
    s += `<g stroke="#432617" stroke-width="3" opacity=".6">${[70, 150, 230, 310, 390, 470, 550, 630].map(y => `<path d="M-40,${y} L840,${y}"/>`).join('')}</g>`;
    s += `<g transform="translate(300,40)"><path d="M0,-60 L0,0" stroke="${OL}" stroke-width="4"/><g data-k="lampiao"><g class="sway" style="--r:9deg;--d:2s"><circle cx="0" cy="40" r="160" fill="${UR('lamp')}"/><path d="M-18,0 L18,0 L24,40 L-24,40 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3"/><g transform="translate(0,30)"><g class="flicker"><path d="M0,-20 C6,-11 8,-5 5,-1 C2,3 -2,3 -5,-1 C-8,-5 -6,-11 0,-20 Z" fill="#ffb238"/></g></g></g></g></g>`;
    s += `<rect x="-40" y="700" width="900" height="200" fill="#5e3420"/><path d="M-40,700 L840,700" stroke="${OL}" stroke-width="5"/>`;
    s += barrel(90, 700, 1.1) + barrel(150, 700, .95) + crate(110, 636, 1) + crate(720, 700, 1.1) + barrel(660, 700, 1);
    s += `<g transform="translate(560,700)">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${i * 22},${-i * 70} L${i * 22 + 70},${-i * 70}" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M${i * 22},${-i * 70} L${i * 22 + 70},${-i * 70}" stroke="#a46e3c" stroke-width="6" stroke-linecap="round"/>`).join('')}<path d="M0,0 L120,-400 M70,0 L190,-400" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M0,0 L120,-400 M70,0 L190,-400" stroke="#9a6b3e" stroke-width="5" stroke-linecap="round"/></g>`;
    s += `<path d="M160,330 L160,700 M520,330 L520,700" stroke="${OL}" stroke-width="16"/><path d="M160,330 L160,700 M520,330 L520,700" stroke="#8a5a33" stroke-width="10"/>`;
    s += `<path d="M168,420 C250,520 430,520 512,420" stroke="#e9dcc0" stroke-width="5" fill="none"/>`;
    s += `<g transform="translate(340,480) rotate(-90)" data-k="dorme"><g>${jonas({ x: 0, y: 95, s: .78, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } })}</g></g>`;
    s += `<g transform="translate(340,480) rotate(-90)" data-k="acorda" opacity="0"><g>${jonas({ x: 0, y: 95, s: .78, face: 'surprise', armL: { a: 60, b: -30 }, armR: { a: 60, b: -30 } })}</g></g>`;
    s += `<path d="M168,420 C240,560 440,560 512,420 C440,520 240,520 168,420 Z" fill="#c9a87a" stroke="${OL}" stroke-width="4"/><g stroke="#a88a5e" stroke-width="2.4">${[220, 270, 320, 370, 420, 470].map(x => `<path d="M${x},${x < 340 ? 470 + (x - 168) * .25 : 470 + (512 - x) * .25} l0,${30}"/>`).join('')}</g>`;
    s += `<g data-k="zz"><text class="zzz svgtxt" style="--d:3s" x="420" y="380" font-size="34" fill="#fffaf0">z</text><text class="zzz svgtxt" style="--d:3s;animation-delay:-1.5s" x="440" y="350" font-size="26" fill="#fffaf0">z</text></g>`;
    s += hitC(340, 470, 120).replace('class="hit"', 'class="hit" data-k="jonasHit"');
    s += person(Object.assign({}, CAPITAO, { x: 630, y: 560, s: .92, face: 'worry', look: -.7, armL: { a: 60, b: 30 }, armR: { a: 20 }, k: 'capitao' }));
    return s;
  },
  setup(api) {
    const cap = api.q('capitao');
    const wake = async () => {
      if (api.st.awake) { api.bubble(340, 300, 'Que tempestade é esta?!', { key: 'j' }); api.snd('gulp'); return; }
      api.st.awake = true;
      api.snd('tiptoe');
      await api.anim(api.act(cap), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-60px,60px)', offset: .5 }, { transform: 'translate(-110px,130px)' }], { duration: 900, fill: 'forwards' });
      api.bubble(500, 330, 'Acorda, Jonas!', { key: 'c' });
      api.snd('boing', .8);
      api.q('dorme').setAttribute('opacity', '0'); api.q('acorda').setAttribute('opacity', '1'); api.q('zz').setAttribute('opacity', '0');
      api.hop(api.q('acorda').firstElementChild.firstElementChild, 12);
      api.later(() => api.bubble(340, 300, 'Hã? O quê?!', { key: 'j', size: 28 }), 900);
      api.nudgeNext(2600);
    };
    api.tap(cap, 'Capitão', wake);
    api.tap(api.q('jonasHit'), 'Jonas a dormir', () => { if (api.st.awake) { wake(); return; } api.snd('snore'); api.bubble(340, 330, 'Zzz...', { key: 'j', size: 28, dur: 1300 }); });
    api.tap(api.q('lampiao'), 'Lampião', () => { api.snd('chime', 'A5'); api.burst(300, 90, 'spark', 6, { col: '#ffd88a' }); });
  }
});

/* =====================================================================
   5 — JOGUEM-ME NO MAR
   ===================================================================== */
SCENES.push({
  key: 'culpa', title: 'Atirem-me ao mar!', ref: 'Jonas 1.7-14', tint: 'stone',
  text: [
    'Jonas contou aos marinheiros:',
    { q: 'Fugi de Deus. A tempestade é por minha causa. Atirem-me ao mar, e o mar vai acalmar.', who: 'jonas' },
    'Os marinheiros não queriam. Remaram com força, mas o mar ficou ainda mais bravo.'
  ],
  hint: 'Toca nos marinheiros e no Jonas.',
  alt: 'No convés molhado, Jonas aponta para si mesmo e fala com os marinheiros, que remam com força no meio das ondas.',
  cue: [400, 450],
  art() {
    let s = stormSky({ bx: 180 });
    s += rainSheet({ seed: 13, n: 60, col: '#cfe0f2', w: 3 });
    s += waveBand(440, { fill: '#2f6f9e', amp: 26, len: 160, dx: 50, d: 4, foam: '#a9d6ee' });
    s += `<rect x="-40" y="520" width="900" height="360" fill="#9a6234"/><g stroke="#7a4a2a" stroke-width="4">${[580, 640, 700, 760].map(y => `<path d="M-40,${y} L840,${y}"/>`).join('')}</g>`;
    s += `<path d="M-40,520 L840,520" stroke="${OL}" stroke-width="20"/><path d="M-40,520 L840,520" stroke="#c98f57" stroke-width="12"/>${[40, 160, 640, 760].map(x => `<rect x="${x - 8}" y="470" width="16" height="54" fill="#c98f57" stroke="${OL}" stroke-width="3.4"/>`).join('')}<path d="M-40,470 L840,470" stroke="${OL}" stroke-width="14"/><path d="M-40,470 L840,470" stroke="#c98f57" stroke-width="8"/>`;
    const oar = `<g transform="translate(0,6)">${limb(0, 0, -90, 120, 9, '#9a6b3e')}<ellipse cx="-96" cy="130" rx="12" ry="26" transform="rotate(36 -96 130)" fill="#9a6b3e" stroke="${OL}" stroke-width="3"/></g>`;
    s += `<g data-k="m0">${person(Object.assign({}, MARUJOS[0], { x: 170, y: 716, s: .94, face: 'worry', look: .6, armL: { a: 40, b: 30 }, armR: { a: 50, b: 20, item: oar } }))}</g>`;
    s += `<g data-k="m1">${person(Object.assign({}, MARUJOS[2], { x: 640, y: 720, s: .96, face: 'determined', look: -.6, flip: true, armL: { a: 40, b: 30 }, armR: { a: 50, b: 20, item: oar } }))}</g>`;
    s += jonas({ x: 400, y: 706, s: 1.06, face: 'sad', look: 0, armR: { a: -20, b: -110 }, armL: { a: 14 }, k: 'jonas' });
    s += `<g data-k="onda">${hitC(140, 440, 80)}${hitC(660, 440, 80)}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jonas'), 'Jonas', () => { api.snd('hm'); api.bubble(400, 420, 'A culpa é minha. Atirem-me ao mar!', { key: 'j', dur: 2800 }); });
    const row = k => api.tap(api.q(k), 'Marinheiro a remar', () => {
      api.anim(api.q(k).firstElementChild.querySelector('[data-p="armR"]'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-26deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-26deg)' }, { transform: 'rotate(0deg)' }], { duration: 1400 });
      api.snd('splash');
      api.bubble(k === 'm0' ? 170 : 640, 430, 'Rema! Rema!', { key: k, size: 28 });
    });
    row('m0'); row('m1');
    api.tap(api.q('onda'), 'Ondas', () => { api.snd('splash'); api.burst(400, 470, 'ripple', 3); lightning(api); });
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => lightning(api));
  }
});

/* =====================================================================
   6 — SPLASH!
   ===================================================================== */
SCENES.push({
  key: 'splash', title: 'Splash!', ref: 'Jonas 1.15-16', tint: 'water',
  text: [
    'Então os marinheiros atiraram Jonas ao mar. Splash!',
    'Na mesma hora, o mar ficou calminho. E os marinheiros agradeceram a Deus.'
  ],
  hint: 'Toca no Jonas.',
  alt: 'Jonas cai no mar com um grande salpico; a tempestade passa e o sol aparece; no navio, os marinheiros olham admirados.',
  cue: [300, 300],
  art() {
    let s = sky('calm', [[0, '#8fd0f0'], [.6, '#e6f5f6'], [1, '#e6f5f6']]);
    s += sun(640, 140, 46, { face: true });
    s += cloud(220, 140, .9) + cloud(480, 200, .7);
    s += `<g data-k="tempo">${sky('dark', [[0, '#3f4868'], [.6, '#6c7895'], [1, '#6c7895']])}${[[110, 110, 1.2], [330, 80, 1.3], [560, 110, 1.2], [760, 90, 1.1]].map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:${i % 2 ? -22 : 24}px;--d:${9 + i}s">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#4b526e', 0)}</g></g>`).join('')}${rainSheet({ seed: 17, n: 50, col: '#cfe0f2', w: 3 })}</g>`;
    s += ship(620, 560, .62, { k: 'navio', cls: 'bob', crew: `<g transform="translate(-130,-64)">${person(Object.assign({}, MARUJOS[0], { s: .95, face: 'o', look: -.6, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 } }))}</g><g transform="translate(-40,-64)">${person(Object.assign({}, MARUJOS[1], { s: .95, face: 'surprise', look: -.6, armL: { a: 40, b: 30 }, armR: { a: 150, b: -10 } }))}</g>` });
    s += `<g data-k="bravo">${waveBand(560, { fill: '#2f6f9e', amp: 24, len: 160, dx: 50, d: 4, foam: '#a9d6ee' })}${waveBand(640, { fill: '#2a6593', amp: 26, len: 180, dx: -60, d: 5, foam: '#bfe2f4' })}</g>`;
    s += `<g data-k="calmo" opacity="0">${calmSea(560, { c1: '#5ab0de', c2: '#4aa2d4' })}</g>`;
    s += `<g transform="translate(300,300)" data-k="jonas"><g class="act"><g transform="rotate(160)">${jonas({ x: 0, y: 110, s: .7, face: 'surprise', armL: { a: 150 }, armR: { a: 150 } })}</g>${hitC(0, 0, 80)}</g></g>`;
    return s;
  },
  setup(api) {
    const j = api.q('jonas');
    api.tap(j, 'Jonas', async () => {
      if (api.st.done) { api.snd('bubbles', 6); return; }
      api.st.done = true;
      api.snd('whoosh');
      await api.anim(api.act(j), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-30px,180px)', offset: .7 }, { transform: 'translate(-40px,300px) scale(.4)', opacity: 0 }], { duration: 800, easing: 'ease-in', fill: 'forwards' });
      api.snd('splash');
      api.burst(260, 590, 'ripple', 4); api.burst(260, 580, 'dust', 8);
      api.bubble(260, 470, 'SPLASH!', { key: 's', size: 54, dur: 1300, plain: true });
      await api.wait(700);
      api.snd('wind');
      api.anim(api.q('tempo'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1800, fill: 'forwards' });
      api.anim(api.q('bravo'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1800, fill: 'forwards' });
      api.anim(api.q('calmo'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1800, fill: 'forwards' });
      await api.wait(1800);
      api.snd('tada');
      api.bubble(560, 300, 'O mar acalmou-se! O Deus de Jonas é poderoso!', { key: 'm', dur: 3200 });
      api.nudgeNext(2800);
    });
    api.tap(api.q('navio'), 'Navio', () => { api.hop(api.q('navio'), 10); api.snd('seagull'); });
  }
});

/* =====================================================================
   7 — UM PEIXE ENORME!
   ===================================================================== */
SCENES.push({
  key: 'peixe', title: 'Um peixe enorme!', ref: 'Jonas 1.17', tint: 'water',
  text: [
    'Mas Deus não se esqueceu de Jonas. Mandou um peixe enorme!',
    'E o peixe engoliu Jonas inteirinho. Glup!'
  ],
  fact: 'A Bíblia não diz que peixe era. Só diz que era muito, muito grande!',
  hint: 'Toca no peixe grande.',
  alt: 'No fundo do mar, entre algas e peixinhos, Jonas afunda enquanto um peixe gigante e simpático nada até ele de boca aberta.',
  cue: [560, 480],
  art() {
    let s = `<defs>${lg('deep', [[0, '#5cc3e6'], [.5, '#2f86bf'], [1, '#1d4f86']])}${lg('ray', [[0, '#e9fbff', .45], [1, '#e9fbff', 0]])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('deep')}"/>`;
    s += `<path d="M-40,60 Q60,44 160,60 T360,60 T560,60 T760,60 T960,60 L960,-40 L-40,-40 Z" fill="#9fdcf2"/>`;
    s += [[160, 40], [380, 30], [600, 50]].map(([x, w]) => `<path d="M${x},60 L${x + w},60 L${x + w + 120},800 L${x - 60},800 Z" fill="${UR('ray')}" opacity=".5"/>`).join('');
    s += `<path d="M-40,760 C120,730 260,750 400,740 C560,728 700,750 840,736 L840,860 L-40,860 Z" fill="#d9c68e"/>`;
    s += seaweed(80, 760, 170) + seaweed(130, 770, 120, '#5fb35a') + seaweed(700, 750, 190) + seaweed(740, 770, 120, '#5fb35a') + seaweed(420, 750, 90, '#2f8a5a');
    s += `<g opacity=".95">${bubbles(21, 14, 60, 760, 160, 760)}</g>`;
    s += fishSmall(160, 220, 1.1, '#f2c14e', { k: 'p1', dx: 40 }) + fishSmall(640, 160, 1, '#e86a9a', { flip: true, k: 'p2', dx: -30 }) + fishSmall(220, 640, .9, '#f28c3a', { k: 'p3' });
    s += `<g transform="translate(270,380)" data-k="jonas"><g class="act"><g class="bob">${jonas({ x: 0, y: 110, s: .74, face: 'o', look: .5, armL: { a: 150, b: -20 }, armR: { a: 120, b: -20 } })}</g>${hitC(0, 20, 70)}</g></g>`;
    s += `<g transform="translate(330,330)" opacity=".9">${bubbles(23, 5, -10, 30, -40, 40)}</g>`;
    s += bigFish({ x: 600, y: 500, s: .8, flip: true, k: 'peixe', cls: 'hover' });
    return s;
  },
  setup(api) {
    const f = api.q('peixe'), j = api.q('jonas');
    api.tap(f, 'Peixe grande', async () => {
      if (api.st.done) { api.snd('bubbles', 6); api.hop(f, 12); return; }
      api.st.done = true;
      const mouth = f.querySelector('[data-p="mouth"]');
      api.anim(mouth, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 500, fill: 'forwards' });
      api.snd('whoosh', .7);
      await api.anim(api.act(f), [{ transform: 'translateX(0px)' }, { transform: 'translateX(70px)' }], { duration: 700, fill: 'forwards', easing: 'ease-in' });
      api.anim(api.act(j), [{ transform: 'translate(0px,0px) scale(1)', opacity: 1 }, { transform: 'translate(70px,110px) scale(.35)', opacity: 0 }], { duration: 450, fill: 'forwards', easing: 'ease-in' });
      await api.wait(380);
      api.anim(mouth, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 300, fill: 'forwards' });
      api.snd('gulp'); api.snd('bubbles', 8);
      api.bubble(420, 330, 'GLUP!', { key: 'g', size: 56, dur: 1300, plain: true });
      api.burst(420, 470, 'spark', 8, { col: '#e6f6fc' });
      await api.anim(api.act(f), [{ transform: 'translateX(70px)' }, { transform: 'translateX(20px)' }], { duration: 900, fill: 'forwards' });
      api.nudgeNext(1400);
    });
    api.tap(j, 'Jonas', () => { api.snd('bubbles', 4); api.bubble(270, 250, 'Socorro!', { key: 'j', size: 28 }); });
    for (const k of ['p1', 'p2', 'p3']) api.tap(api.q(k), 'Peixinho', () => { api.snd('plip'); const [, , sc] = api.pos(api.q(k)); api.anim(api.act(api.q(k)), [{ transform: 'translateX(0px)' }, { transform: `translateX(${90 / sc}px)` }, { transform: 'translateX(0px)' }], { duration: 900 }); });
  }
});

/* =====================================================================
   8 — DENTRO DO PEIXE
   ===================================================================== */
SCENES.push({
  key: 'dentro', title: 'Dentro do peixe', ref: 'Jonas 1.17; 2.1-9', tint: 'rose',
  text: [
    'Jonas ficou dentro do peixe três dias e três noites.',
    'Lá dentro, Jonas orou:',
    { q: 'Senhor, ajuda-me! Eu vou obedecer!', who: 'jonas' },
    'E Deus ouviu a oração de Jonas.'
  ],
  fact: 'Jonas orou até dentro de um peixe! Podemos falar com Deus em qualquer lugar.',
  hint: 'Toca no Jonas para ele orar.',
  alt: 'Dentro da barriga do peixe, entre costelas curvas, algas e bolhas, Jonas ajoelhado ora; uma luz suave brilha sobre ele.',
  cue: [400, 470],
  art() {
    let s = `<defs>${rg('belly', [[0, '#e9919a'], [.7, '#b9505f'], [1, '#7e2c3d']], .5, .45, .75)}${rg('pray', [[0, '#fff3c4', .9], [.6, '#ffe28a', .3], [1, '#ffe28a', 0]])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('belly')}"/>`;
    for (let i = 0; i < 6; i++) { const x = 40 + i * 144; s += `<path d="M${x - 40},-40 C${x - 70},200 ${x - 70},500 ${x - 30},820" stroke="${OL}" stroke-width="30" fill="none" opacity=".25"/><path d="M${x - 40},-40 C${x - 70},200 ${x - 70},500 ${x - 30},820" stroke="#f6dccf" stroke-width="18" fill="none" opacity=".75"/>`; }
    s += `<path d="M-40,690 C120,660 280,700 420,684 C580,666 700,700 840,680 L840,860 L-40,860 Z" fill="#d97887"/><ellipse cx="200" cy="740" rx="80" ry="16" fill="#c4606f"/><ellipse cx="610" cy="760" rx="90" ry="18" fill="#c4606f"/>`;
    s += seaweed(130, 720, 90, '#5fb35a') + seaweed(660, 714, 110, '#3f9a5a');
    s += `<g opacity=".9">${bubbles(31, 12, 60, 760, 120, 680)}</g>`;
    s += `<circle data-k="luz" cx="400" cy="420" r="230" fill="${UR('pray')}" opacity=".35"/>`;
    s += jonas({ x: 400, y: 702, s: 1.12, legs: 'kneel', face: 'sad', look: 0, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'triste' });
    s += `<g data-k="alegre" opacity="0">${jonas({ x: 400, y: 702, s: 1.12, legs: 'kneel', face: 'joy', armL: { a: 150, b: -14 }, armR: { a: 150, b: -14 } })}</g>`;
    s += fishSmall(600, 660, .9, '#f2c14e', { k: 'p1', dx: 10, d: 2 }) + fishSmall(210, 660, .8, '#a5d0e8', { flip: true, k: 'p2', dx: -10, d: 2.4 });
    s += `<g transform="translate(560,120) scale(.5)">${[0, 1].map(i => `<g data-k="bolha${i}" transform="translate(${i * 120},${i * 60})"><g class="act"><g class="bob" style="${dl(3)}"><circle r="46" fill="#ffffff" fill-opacity=".18" stroke="#ffffff" stroke-width="7"/><circle cx="-14" cy="-16" r="10" fill="#ffffff" opacity=".7"/>${hitC(0, 0, 60)}</g></g></g>`).join('')}</g>`;
    return s;
  },
  setup(api) {
    const pray = async () => {
      api.snd('anoint');
      api.anim(api.q('luz'), [{ opacity: .35 }, { opacity: 1 }], { duration: 1200, fill: 'forwards' });
      api.bubble(400, 400, 'Senhor, ajuda-me! Eu vou obedecer.', { key: 'j', dur: 2800 });
      api.burst(400, 420, 'spark', 10, { col: '#fff1b0' });
      if (api.st.prayed) return;
      api.st.prayed = true;
      await api.wait(1800);
      api.q('triste').setAttribute('opacity', '0'); api.q('alegre').setAttribute('opacity', '1');
      api.snd('heart');
      api.burst(400, 380, 'heart', 6);
      api.nudgeNext(1600);
    };
    api.tap(api.q('triste'), 'Jonas', pray);
    api.tap(api.q('alegre'), 'Jonas', pray);
    for (const k of ['p1', 'p2']) api.tap(api.q(k), 'Peixinho', () => { api.snd('squeak', 1.3); api.hop(api.q(k), 30); });
    for (const k of ['bolha0', 'bolha1']) api.tap(api.q(k), 'Bolha', () => { api.snd('plip'); api.anim(api.act(api.q(k)), [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.6)', opacity: 0 }, { transform: 'scale(1)', opacity: 0, offset: .99 }, { transform: 'scale(1)', opacity: 1 }], { duration: 1800 }); });
  }
});

/* =====================================================================
   9 — NA PRAIA!
   ===================================================================== */
SCENES.push({
  key: 'praia', title: 'Na praia!', ref: 'Jonas 2.10', tint: 'sky',
  text: [
    'Deus deu uma ordem ao peixe. E o peixe cuspiu Jonas para a praia. Bluuup!',
    'Jonas estava salvo!'
  ],
  hint: 'Toca no peixe.',
  alt: 'Numa praia cheia de sol, com palmeiras, o peixe gigante, à beira-mar, prepara-se para cuspir Jonas para a areia; um caranguejo passeia.',
  cue: [560, 500],
  art() {
    let s = bgDay({ sunX: 140, sunY: 120, sunR: 42 });
    s += `<rect x="-40" y="430" width="900" height="400" fill="#4fa3d4"/>`;
    s += calmSea(430, { c1: '#5ab0de', c2: '#4aa2d4' });
    s += bigFish({ x: 640, y: 560, s: .62, flip: true, k: 'peixe', cls: 'bob' });
    s += `<path d="M-40,520 C120,500 260,540 380,600 C460,640 520,700 560,860 L-40,860 Z" fill="#f1dca6"/><path d="M380,600 C460,640 520,700 560,860" stroke="#e3f4fb" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>`;
    s += palm(90, 600, .9) + palm(170, 620, .66);
    s += `<g opacity=".8">${[[110, 700], [260, 660], [330, 760], [200, 780]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="5" fill="#e3c88e"/>`).join('')}</g>`;
    s += `<g transform="translate(330,700)">${[0, 1, 2].map(i => `<path transform="rotate(${i * 70 - 70}) translate(0,-14)" d="M0,0 C-8,-6 -8,-18 0,-22 C8,-18 8,-6 0,0 Z" fill="#f6b0b6" stroke="${OL}" stroke-width="2"/>`).join('')}</g>`;
    s += crab(160, 740, 1);
    const weed = `<g transform="translate(0,-262)"><path d="M-30,-6 C-20,-26 0,-30 6,-10 C12,-30 30,-28 34,-8" stroke="#3f9a5a" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
    s += `<g data-k="jonas" opacity="0" style="transform-box: fill-box; transform-origin: 50% 50%">${jonas({ x: 290, y: 704, s: .92, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, extra: weed })}</g>`;
    return s;
  },
  setup(api) {
    const f = api.q('peixe'), j = api.q('jonas');
    api.tap(f, 'Peixe grande', async () => {
      if (api.st.done) { api.snd('bubbles', 6); api.hop(f, 12); return; }
      api.st.done = true;
      const mouth = f.querySelector('[data-p="mouth"]');
      await api.anim(mouth, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 400, fill: 'forwards' });
      api.snd('splash');
      api.bubble(470, 470, 'BLUUUP!', { key: 'b', size: 50, dur: 1300, plain: true });
      j.setAttribute('opacity', '1');
      await api.anim(j, [{ transform: 'translate(190px,-60px) scale(.4) rotate(-40deg)' }, { transform: 'translate(90px,-280px) scale(.8) rotate(-200deg)', offset: .5 }, { transform: 'translate(0px,0px) scale(1) rotate(-360deg)' }], { duration: 1200, easing: 'ease-out', fill: 'forwards' });
      api.anim(mouth, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 300, fill: 'forwards' });
      api.snd('boing', .9); api.burst(290, 700, 'dust', 8);
      await api.wait(400);
      api.bubble(290, 420, 'Obrigado, Senhor! Estou salvo!', { key: 'j', dur: 2800 });
      api.nudgeNext(2400);
    });
    api.tap(j, 'Jonas', () => { if (!api.st.done) return; api.snd('hello'); api.bubble(290, 420, 'Agora eu vou para Nínive!', { key: 'j' }); });
    api.tap(api.q('caranguejo'), 'Caranguejo', () => { api.snd('tiptoe'); api.anim(api.act(api.q('caranguejo')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(60px)' }, { transform: 'translateX(-30px)' }, { transform: 'translateX(0px)' }], { duration: 1200 }); });
  }
});

/* =====================================================================
   10 — JONAS OBEDECE
   ===================================================================== */
SCENES.push({
  key: 'obedece', title: 'Jonas obedece', ref: 'Jonas 3.1-4', tint: 'sand',
  text: [
    'Deus falou outra vez: «Vai a Nínive.» E desta vez Jonas foi!',
    'Andou pela cidade a dizer:',
    { q: 'Parem de fazer coisas más e voltem para Deus!', who: 'jonas' }
  ],
  fact: 'Nínive era tão grande que eram precisos três dias para atravessar a cidade a pé.',
  hint: 'Toca no Jonas e no povo.',
  alt: 'Diante das muralhas e do grande portão azul de Nínive, Jonas, em cima de uma pedra, fala com o povo que se junta para ouvir.',
  cue: [400, 450],
  art() {
    let s = sky('sky', [[0, '#8fcbec'], [.55, '#f7e6c4'], [1, '#f7e6c4']]);
    s += sun(660, 110, 38, {});
    s += cloud(170, 120, .8) + cloud(520, 90, .6, { dx: -24 });
    s += nineveh(400, 520, .9);
    s += `<rect x="-40" y="518" width="900" height="340" fill="#e2cf9a"/>`;
    s += palm(60, 560, .7) + palm(760, 560, .66);
    s += rock(400, 640, 150, 60, { fill: '#c9b48c', shade: '#ad976d' });
    s += jonas({ x: 400, y: 600, s: .96, face: 'open', look: .2, armR: { a: 160, b: -10 }, armL: { a: 20 }, k: 'jonas' });
    const spots = [[150, 690, .78, .6], [250, 720, .74, .4], [560, 706, .5, -.4], [650, 690, .78, -.6], [470, 742, .72, -.2]];
    POVO.forEach((p, i) => { const [x, y, sc, lk] = spots[i]; s += person(Object.assign({}, p, { x, y, s: p.kind === 'child' ? sc * 1.25 : sc, face: ['o', 'smile', 'surprise', 'worry', 'o'][i], look: lk, k: 'pv' + i })); });
    return s;
  },
  setup(api) {
    api.tap(api.q('jonas'), 'Jonas', () => { api.snd('hello'); api.bubble(400, 260, 'Parem de fazer coisas más e voltem para Deus!', { key: 'j', dur: 3000 }); for (let i = 0; i < 5; i++) api.later(() => api.hop(api.q('pv' + i), 10), 300 + i * 120); });
    const says = [N('Ele é um profeta!'), N('Vamos ouvir!'), N('O que é que ele disse?'), N('Nós vamos mudar!'), N('Deus falou com ele!')];
    for (let i = 0; i < 5; i++) api.tap(api.q('pv' + i), 'Pessoa de Nínive', () => { const [x] = api.pos(api.q('pv' + i)); api.hop(api.q('pv' + i), 14); api.snd('boing', 1 + i * .08); api.bubble(x, 480, says[i], { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   11 — A CIDADE INTEIRA OROU
   ===================================================================== */
SCENES.push({
  key: 'perdao', title: 'A cidade inteira orou', ref: 'Jonas 3.5-10', tint: 'gold',
  text: [
    'O povo de Nínive acreditou em Deus. Do rei até às crianças, todos deixaram de fazer o mal e oraram.',
    'E Deus, que é cheio de amor, perdoou a cidade!'
  ],
  fact: 'Até os animais ficaram sem comer enquanto o povo orava!',
  hint: 'Toca no rei e no povo para eles orarem.',
  alt: 'O rei de Nínive, sem coroa e vestido de saco, ajoelha-se para orar, com o povo e até uma vaca e uma ovelha cobertas de pano de saco.',
  cue: [400, 470],
  art() {
    let s = sky('sky', [[0, '#9fd2ee'], [.6, '#f9e9c8'], [1, '#f9e9c8']]);
    s += `<defs>${rg('perdao', [[0, '#fff6c8', .95], [.55, '#ffe28a', .4], [1, '#ffe28a', 0]])}</defs><circle data-k="luz" cx="400" cy="200" r="420" fill="${UR('perdao')}" opacity="0"/>`;
    s += cloud(140, 120, .8) + cloud(660, 100, .7, { dx: -24 });
    s += `<g opacity=".9">${nineveh(400, 470, .6)}</g>`;
    s += `<rect x="-40" y="468" width="900" height="400" fill="#e6d3a2"/>`;
    const rei = { kind: 'adult', skin: '#c98a5a', hair: '#2a1e1a', beard: 'bushy', beardCol: '#2a1e1a', tunic: SACO, stripes: SACO_D, belt: '#6f5c43' };
    s += person(Object.assign({}, rei, { x: 400, y: 702, s: 1.08, legs: 'kneel', face: 'sad', armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'rei' }));
    s += `<g transform="translate(500,716)">${crownSVG(30, 0, 3)}</g>`;
    const kneel = [[170, 680, .82], [260, 716, .72], [600, 700, .78], [680, 670, .74]];
    [POVO[0], POVO[2], POVO[1], POVO[3]].forEach((p, i) => { const [x, y, sc] = kneel[i]; s += person(Object.assign({}, p, { tunic: i % 2 ? p.tunic : SACO, x, y, s: p.kind === 'child' ? sc * 1.2 : sc, legs: 'kneel', face: 'sad', look: i < 2 ? .4 : -.4, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'pv' + i })); });
    s += `<g transform="translate(560,600)">${cow({ x: 0, y: 0, s: .5, k: 'vaca' })}<path d="M-34,-64 C-30,-74 26,-74 30,-64 L28,-36 C6,-30 -12,-30 -32,-36 Z" fill="${SACO}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/></g>`;
    s += `<g transform="translate(240,600)">${sheep({ x: 0, y: 0, s: .62, flip: true, k: 'ovelha' })}<path d="M-34,-48 C-30,-60 26,-60 30,-48 L26,-24 C6,-18 -12,-18 -30,-24 Z" fill="${SACO}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/></g>`;
    return s;
  },
  setup(api) {
    const keys = ['rei', 'pv0', 'pv1', 'pv2', 'pv3'];
    const done = new Set();
    for (const k of keys) api.tap(api.q(k), k === keys[0] ? 'Rei de Nínive' : 'Pessoa de Nínive', async () => {
      const el = api.q(k), [x, y, sc] = api.pos(el);
      api.snd('chime', ['C5', 'E5', 'G5', 'A5', 'C6'][keys.indexOf(k)]);
      api.burst(x, y - 200 * sc, 'heart', 3);
      api.bubble(x, y - 250 * sc, k === keys[0] ? 'Perdão, Senhor! Nós vamos mudar.' : 'Perdão, Senhor!', { key: 'p', size: 26 });
      done.add(k);
      if (done.size === keys.length && !api.st.end) {
        api.st.end = true;
        await api.wait(1400);
        api.snd('anoint');
        api.anim(api.q('luz'), [{ opacity: 0 }, { opacity: 1 }], { duration: 1500, fill: 'forwards' });
        api.burst(400, 220, 'spark', 14, { col: '#fff1b0' });
        await api.wait(1200);
        api.snd('tada');
        api.bubble(400, 240, 'Deus perdoou Nínive!', { key: 'fim', dur: 3000 });
        api.nudgeNext(2200);
      }
    });
    api.tap(api.q('vaca'), 'Vaca', () => { api.snd('moo'); api.hop(api.q('vaca'), 10); });
    api.tap(api.q('ovelha'), 'Ovelha', () => { api.snd('bleat'); api.hop(api.q('ovelha'), 12); });
  }
});

/* =====================================================================
   12 — DEUS AMA TODO MUNDO
   ===================================================================== */
SCENES.push({
  key: 'ama', title: 'Deus ama toda a gente', ref: 'Jonas 4', tint: 'meadow',
  text: [
    'Jonas ficou amuado. Não queria que Deus perdoasse Nínive.',
    'Deus fez crescer uma planta para dar sombra a Jonas. E ensinou:',
    { q: 'Eu amo todas as pessoas de Nínive.', who: 'deus' }
  ],
  fact: 'Deus ama as pessoas de todos os lugares do mundo!',
  hint: 'Toca na plantinha perto do Jonas.',
  alt: 'Num monte fora de Nínive, Jonas está sentado de cara fechada debaixo de uma cabaninha, ao sol quente; ao lado, uma plantinha começa a crescer.',
  cue: [320, 690],
  art() {
    let s = sky('sky', [[0, '#7cc3ea'], [.55, '#fbe3b6'], [1, '#fbe3b6']]);
    s += sun(650, 130, 56, { face: true, k: 'sol', fill: '#ffc43a', fill2: '#ffd86b' });
    s += `<g opacity=".8">${nineveh(660, 470, .36)}</g>`;
    s += hill([[-40, 480], [200, 450], [420, 472], [640, 466], [840, 476]], '#d9c88e');
    s += hill([[-40, 560], [200, 520], [400, 540], [600, 580], [840, 600]], '#c9b878');
    s += `<rect x="-40" y="700" width="900" height="200" fill="#c2b06e"/>`;
    s += `<g opacity=".7">${[0, 1, 2].map(i => `<path class="rise" style="--d:${2.6 + i * .4}s;--dx:4px;${dl(3)}" d="M${470 + i * 50},640 q8,-12 0,-24 q-8,-12 0,-24" stroke="#fff3c4" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
    s += booth(230, 700, 1.1);
    s += `<g transform="translate(330,702)"><g data-k="planta" style="transform: scale(.12)">${vine()}</g></g>`;
    s += `<g transform="translate(330,702)" data-k="broto"><g class="act">${limb(0, 0, 0, -26, 5, '#5f8f3e')}<path d="M0,-24 C-14,-30 -18,-44 -6,-46 C0,-46 0,-38 0,-32 Z M0,-24 C14,-30 18,-44 6,-46 C0,-46 0,-38 0,-32 Z" fill="#6aa246" stroke="${OL}" stroke-width="2.6"/>${hitC(0, -24, 40)}</g></g>`;
    s += `<g data-k="bravo">${jonas({ x: 220, y: 704, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'frown', look: .2, armL: { a: -30, b: -96 }, armR: { a: -30, b: -96 } })}</g>`;
    s += `<g data-k="feliz" opacity="0">${jonas({ x: 220, y: 704, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'joy', look: .4, armL: { a: 40, b: 40 }, armR: { a: 40, b: 40 } })}</g>`;
    s += hitC(220, 600, 80).replace('class="hit"', 'class="hit" data-k="jonasHit"');
    return s;
  },
  setup(api) {
    api.tap(api.q('broto'), 'Plantinha', async () => {
      if (api.st.grown) { api.snd('chime', 'E6'); return; }
      api.st.grown = true;
      api.snd('anoint');
      api.anim(api.q('broto'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('planta'), [{ transform: 'scale(.12)' }, { transform: 'scale(1.06)', offset: .8 }, { transform: 'scale(1)' }], { duration: 1600, easing: 'ease-out', fill: 'forwards' });
      api.q('bravo').setAttribute('opacity', '0'); api.q('feliz').setAttribute('opacity', '1');
      api.burst(240, 470, 'heart', 4);
      api.bubble(220, 420, 'Que sombra boa!', { key: 'j' });
    });
    api.tap(api.q('jonasHit'), 'Jonas', () => {
      if (!api.st.grown) { api.snd('hm'); api.bubble(220, 420, 'Hunf! Que calor!', { key: 'j' }); return; }
      api.snd('heart'); api.bubble(220, 420, 'Agora percebi: Deus ama toda a gente!', { key: 'j', dur: 3000 });
    });
    api.tap(api.q('sol'), 'Sol quente', () => { api.snd('wind'); api.burst(650, 130, 'spark', 8, { col: '#fff1b0' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas e no peixe.',
  alt: 'Noite calma no mar: o peixe grande salta feliz sob a lua, um barquinho com lanterna flutua e o céu está cheio de estrelas.',
  cue: [560, 140],
  questions: [
    ['Para onde é que Deus mandou Jonas?', 'Para a cidade de Nínive.'],
    ['O que é que Jonas fez em vez de obedecer?', 'Fugiu num navio.'],
    ['Quem engoliu Jonas?', 'Um peixe enorme!'],
    ['O que é que Jonas fez dentro do peixe?', 'Orou a Deus.'],
    ['Deus ama só algumas pessoas?', 'Não! Deus ama toda a gente.']
  ],
  verse: ['O Senhor é bondoso e cheio de amor.', 'Jonas 4.2'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.5, '#262f6c'], [.7, '#3a4889'], [1, '#3a4889']]);
    s += starField(29, 80, 0, 0, 800, 440, { big: .1 });
    s += moon(660, 130, 34);
    const BIG = [[160, 120], [290, 80], [430, 150], [560, 90], [230, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += `<rect x="-40" y="500" width="900" height="400" fill="#1f4f7a"/>`;
    s += waveBand(500, { fill: '#245a86', amp: 10, len: 140, dx: 30, d: 7, foam: '#7fb4d8', fw: 3 });
    s += `<path d="M560,520 Q620,500 660,520 Q620,600 560,520 Z" fill="#fff6cf" opacity=".25"/>`;
    s += bigFish({ x: 450, y: 620, s: .5, k: 'peixe', cls: 'hover' });
    s += waveBand(590, { fill: '#1d4f7c', amp: 12, len: 160, dx: -30, d: 8, foam: '#6fa6cf', fw: 3 });
    s += `<g transform="translate(180,640)" data-k="barco"><g class="act"><g class="rock"><path d="M-70,-30 L70,-30 Q60,0 40,6 L-40,6 Q-60,0 -70,-30 Z" fill="#b07b4a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>${limb(40, -30, 40, -90, 4, '#6b4a33')}<g transform="translate(40,-96)"><path d="M-10,0 L10,0 L12,22 L-12,22 Z" fill="#d9a33a" stroke="${OL}" stroke-width="2.4"/><circle cx="0" cy="12" r="22" fill="#ffd27a" opacity=".3"/><g transform="translate(0,16)"><g class="flicker"><path d="M0,-12 C4,-6 5,-3 3,0 C1,2 -1,2 -3,0 C-5,-3 -4,-6 0,-12 Z" fill="#ffb238"/></g></g></g>${hitC(0, -30, 70)}</g></g></g>`;
    s += waveBand(680, { fill: '#173f66', amp: 12, len: 180, dx: 30, d: 9, foam: '#5f95c0', fw: 3 });
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
    api.tap(api.q('peixe'), 'Peixe grande', async () => {
      api.snd('splash');
      await api.anim(api.act(api.q('peixe')), [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: 'translate(60px,-260px) rotate(-20deg)', offset: .45 }, { transform: 'translate(120px,0px) rotate(10deg)' }], { duration: 1300, easing: 'ease-in-out' });
      api.snd('splash'); api.burst(510, 600, 'ripple', 3);
    });
    api.tap(api.q('barco'), 'Barquinho', () => { api.snd('chime', 'A5'); api.hop(api.q('barco'), 10); });
  }
});

Ov.addBook({
  id: 'jonas',
  title: 'Jonas e o Grande Peixe',
  cover: { kicker: 'Uma história da Bíblia', title: 'Jonas', small: 'e o Grande Peixe', sub: 'Deus ama toda a gente e dá uma nova oportunidade' },
  color: '#1f5f8f',
  ref: 'Jonas 1 a 4',
  scenes: SCENES
});
})();
