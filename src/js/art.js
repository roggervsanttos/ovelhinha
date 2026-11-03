/* =====================================================================
   KIT DE DESENHO — tudo é SVG gerado por funções (sem imagens externas)
   Regras: nunca animar com CSS um <g> que já tem atributo transform.
   Posição => <g transform>, animação => <g class> interno.
   ===================================================================== */
const OL = '#3a2730';          // tinta do contorno
const SW = 3.2;                // espessura padrão do contorno
let P = 'b0';                  // prefixo de ids por construção
const ID = n => `${P}-${n}`;
const UR = n => `url(#${P}-${n})`;
const r1 = v => Math.round(v * 10) / 10;
const dl = (max = 6) => `animation-delay:${(-Math.random() * max).toFixed(2)}s`;

function rng(seed) {
  let s = (Math.imul(seed + 7, 2654435761) >>> 0) || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

/* ---------- gradientes ---------- */
function lg(name, stops, x2 = 0, y2 = 1, x1 = 0, y1 = 0) {
  return `<linearGradient id="${ID(name)}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
}
function rg(name, stops, cx = .5, cy = .5, r = .5) {
  return `<radialGradient id="${ID(name)}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</radialGradient>`;
}

/* ---------- primitivas ---------- */
// círculos unidos com um único contorno (lã, cabelo, nuvens, copas)
function blob(circles, fill, sw = SW, ol = OL) {
  let o = '', f = '';
  for (const [x, y, r] of circles) {
    if (sw > 0) o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r + sw)}"/>`;
    f += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}"/>`;
  }
  return (sw > 0 ? `<g fill="${ol}">${o}</g>` : '') + `<g fill="${fill}">${f}</g>`;
}
// linha grossa com contorno
function limb(x1, y1, x2, y2, w, col, sw = SW) {
  const d = `M${r1(x1)},${r1(y1)} L${r1(x2)},${r1(y2)}`;
  return `<path d="${d}" stroke="${OL}" stroke-width="${r1(w + 2 * sw)}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${col}" stroke-width="${r1(w)}" stroke-linecap="round" fill="none"/>`;
}
function stroke2(d, w, col, sw = SW) {
  return `<path d="${d}" stroke="${OL}" stroke-width="${r1(w + 2 * sw)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${col}" stroke-width="${r1(w)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
}
const op = (d, fill, sw = SW, extra = '') => `<path d="${d}" fill="${fill}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"${extra}/>`;

function smooth(pts) {
  let d = `M${r1(pts[0][0])},${r1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
  }
  return d;
}
function hill(pts, fill, extra = '', bottom = 1200) {
  const d = smooth(pts) + ` L${pts[pts.length - 1][0]},${bottom} L${pts[0][0]},${bottom} Z`;
  return `<path d="${d}" fill="${fill}"${extra}/>`;
}

/* ---------- céu, sol, lua, estrelas, nuvens ---------- */
function sky(name, stops, h = 800) {
  return `<defs>${lg(name, stops)}</defs><rect x="-50" y="-50" width="900" height="${h + 100}" fill="${UR(name)}"/>`;
}
function cloud(x, y, s = 1, o = {}) {
  const c = o.shape || [[-44, 2, 20], [-18, -14, 27], [14, -12, 24], [40, 2, 19], [-2, 6, 22], [24, 8, 16], [-30, 9, 15]];
  const sh = c.map(([a, b, r]) => `<circle cx="${a}" cy="${b + 6}" r="${r}"/>`).join('');
  const fl = c.map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><g class="drift" style="--dx:${o.dx ?? 36}px;--d:${o.d ?? 16}s;${dl(16)}"><g fill="${o.shade || '#d6e9f4'}">${sh}</g><g fill="${o.fill || '#ffffff'}">${fl}</g></g></g>`;
}
function sun(x, y, r, o = {}) {
  const rays = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30;
    rays.push(`<path d="M-${r * .13},-${r * 1.22} L0,-${r * 1.62} L${r * .13},-${r * 1.22} Z" transform="rotate(${a})"/>`);
  }
  const face = o.face ? `<path d="M${-r * .38},${-r * .05} q${r * .14},${-r * .16} ${r * .28},0 M${r * .1},${-r * .05} q${r * .14},${-r * .16} ${r * .28},0" stroke="#c9771a" stroke-width="${r * .07}" fill="none" stroke-linecap="round"/><path d="M${-r * .28},${r * .22} q${r * .28},${r * .26} ${r * .56},0" stroke="#c9771a" stroke-width="${r * .07}" fill="none" stroke-linecap="round"/><circle cx="${-r * .52}" cy="${r * .16}" r="${r * .1}" fill="#f6a04d" opacity=".6"/><circle cx="${r * .52}" cy="${r * .16}" r="${r * .1}" fill="#f6a04d" opacity=".6"/>` : '';
  return `<defs>${rg('sunglow', [[0, o.glow || '#fff3b0', .9], [.45, o.glow || '#ffe58a', .35], [1, o.glow || '#ffe58a', 0]])}</defs>
  <g transform="translate(${x},${y})" data-k="${o.k || 'sun'}"><circle r="${r * 2.6}" fill="${UR('sunglow')}"/><g class="spin" style="--d:40s"><g fill="${o.ray || '#ffd463'}" opacity=".85">${rays.join('')}</g></g><circle r="${r}" fill="${o.fill || '#ffcf3f'}"/><circle r="${r * .78}" cx="${-r * .08}" cy="${-r * .08}" fill="${o.fill2 || '#ffdf6e'}"/>${face}</g>`;
}
function moon(x, y, r) {
  return `<defs>${rg('moonglow', [[0, '#fff6cf', .55], [.5, '#fff6cf', .16], [1, '#fff6cf', 0]])}</defs><g transform="translate(${x},${y})"><circle r="${r * 3}" fill="${UR('moonglow')}"/><path d="M${r1(r * .25)},${r1(-r * .968)} A${r} ${r} 0 1 0 ${r1(r * .25)},${r1(r * .968)} A${r1(r * 1.1)} ${r1(r * 1.1)} 0 0 1 ${r1(r * .25)},${r1(-r * .968)} Z" fill="#fff4c4"/><circle cx="${-r * .45}" cy="${-r * .2}" r="${r * .1}" fill="#efe0a2"/><circle cx="${-r * .55}" cy="${r * .35}" r="${r * .07}" fill="#efe0a2"/></g>`;
}
function sparkle(r) {
  const k = r * .2;
  return `M0,${-r} Q${k},${-k} ${r},0 Q${k},${k} 0,${r} Q${-k},${k} ${-r},0 Q${-k},${-k} 0,${-r} Z`;
}
function starField(seed, n, x0, y0, x1, y1, o = {}) {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * (x1 - x0), y = y0 + Math.pow(R(), 1.3) * (y1 - y0);
    const big = R() < (o.big ?? .18);
    const r = big ? 5 + R() * 4 : 1.2 + R() * 1.6;
    const col = R() < .25 ? '#ffe8a8' : '#ffffff';
    s += big
      ? `<g transform="translate(${r1(x)},${r1(y)})"><path class="twinkle" style="--d:${(2 + R() * 3).toFixed(1)}s;${dl(5)}" d="${sparkle(r)}" fill="${col}"/></g>`
      : `<circle class="tw2" style="--d:${(2 + R() * 4).toFixed(1)}s;${dl(6)}" cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${col}"/>`;
  }
  return `<g>${s}</g>`;
}
function bird(x, y, s = 1, o = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><g class="glide" style="--dx:${o.dx ?? 60}px;--dy:${o.dy ?? -14}px;--d:${o.d ?? 9}s;${dl(9)}"><g class="flap" style="${dl(1)}"><path d="M-16,0 Q-8,-10 0,0 Q8,-10 16,0" fill="none" stroke="${o.col || '#3d3550'}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></g></g></g>`;
}

/* ---------- natureza ---------- */
function tuft(x, y, s = 1, col = '#5f9440') {
  return `<g transform="translate(${x},${y}) scale(${s})"><g class="sway" style="--r:4deg;--d:${(2.5 + Math.random() * 2).toFixed(1)}s;${dl(4)}"><path d="M0,0 Q-3,-12 -10,-20 M0,0 Q0,-14 2,-24 M0,0 Q4,-10 11,-17" fill="none" stroke="${col}" stroke-width="3.4" stroke-linecap="round"/></g></g>`;
}
function flower(x, y, s = 1, col = '#e0473e', o = {}) {
  const pet = [0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-6.5" rx="4.6" ry="6.5" transform="rotate(${a})"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><g class="sway" style="--r:6deg;--d:${(3 + Math.random() * 2).toFixed(1)}s;${dl(4)}"><path d="M0,0 Q-2,-12 0,-24" stroke="#4f8a3a" stroke-width="3" fill="none" stroke-linecap="round"/><g transform="translate(0,-28)"><g fill="${col}" stroke="${OL}" stroke-width="1.6">${pet}</g><circle r="3.6" fill="${o.center || '#2c2230'}"/></g></g></g>`;
}
function rock(x, y, w, h, o = {}) {
  const c = o.fill || '#c7b59b', sh = o.shade || '#a8957b', hi = o.hi || '#ddd0b8';
  const d = `M${-w / 2},0 C${-w / 2},${-h * .55} ${-w * .32},${-h} ${-w * .02},${-h} C${w * .3},${-h} ${w * .5},${-h * .62} ${w / 2},0 Z`;
  const sd = `M${w * .05},${-h * .98} C${w * .32},${-h * .95} ${w * .5},${-h * .6} ${w / 2},0 L${w * .1},0 C${w * .22},${-h * .4} ${w * .2},${-h * .7} ${w * .05},${-h * .98} Z`;
  return `<g transform="translate(${x},${y})"${o.k ? ` data-k="${o.k}"` : ''}><path d="${d}" fill="${c}"${o.ol === false ? '' : ` stroke="${OL}" stroke-width="${o.sw ?? SW}" stroke-linejoin="round"`}/><path d="${sd}" fill="${sh}" opacity=".7"/><path d="M${-w * .3},${-h * .55} C${-w * .25},${-h * .8} ${-w * .12},${-h * .9} ${w * .02},${-h * .9}" stroke="${hi}" stroke-width="${Math.max(3, h * .06)}" fill="none" stroke-linecap="round"/></g>`;
}
function olive(x, y, s = 1, o = {}) {
  const ol = o.ol !== false;
  const trunk = `M-9,0 C-4,-26 -20,-44 -10,-74 L-2,-74 C-6,-56 4,-34 1,-18 C10,-36 20,-46 30,-58 L34,-54 C18,-36 12,-18 12,0 Z`;
  const can = [[-46, -96, 30], [-8, -118, 38], [34, -102, 32], [-64, -76, 20], [62, -80, 22], [8, -84, 34], [-28, -78, 26], [36, -74, 24]];
  const dark = can.map(([a, b, r]) => [a + 4, b + 8, r * .92]);
  return `<g transform="translate(${x},${y}) scale(${s})">${op(trunk, o.trunk || '#8b6b4b', ol ? SW : 0)}<g class="sway" style="--r:1.4deg;--d:6s;${dl(6)}">${blob(dark, o.dark || '#6f8a50', ol ? SW : 0)}${blob(can, o.leaf || '#93ab6a', 0)}${blob([[-30, -104, 14], [4, -128, 16], [36, -110, 12]], o.hi || '#adc287', 0)}</g></g>`;
}
function palm(x, y, s = 1) {
  const fr = [-150, -120, -80, -50, -20, 10, 40].map((a, i) => `<path d="M0,0 Q${40 * Math.cos(a * Math.PI / 180) + 10},${40 * Math.sin(a * Math.PI / 180) - 20} ${80 * Math.cos(a * Math.PI / 180)},${80 * Math.sin(a * Math.PI / 180) + 10}" stroke="${i % 2 ? '#5f8f3e' : '#6fa249'}" stroke-width="13" fill="none" stroke-linecap="round"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-6,0 C-2,-60 6,-120 0,-180 L10,-180 C14,-120 8,-60 8,0 Z" fill="#9a7650"/><g transform="translate(4,-182)"><g class="sway" style="--r:3deg;--d:5s;${dl(5)}">${fr}</g></g></g>`;
}
function house(x, y, w, h, o = {}) {
  const wall = o.wall || '#ecd5a6', shade = o.shade || '#d6b983', ol = o.ol === false ? '' : ` stroke="${OL}" stroke-width="${o.sw ?? 2.4}" stroke-linejoin="round"`;
  let s = `<rect x="0" y="${-h}" width="${w}" height="${h}" fill="${wall}"${ol}/>`;
  s += `<rect x="${w * .72}" y="${-h}" width="${w * .28}" height="${h}" fill="${shade}" opacity=".55"/>`;
  s += `<rect x="-3" y="${-h - 7}" width="${w + 6}" height="9" rx="2" fill="${o.roof || '#d9bd88'}"${ol}/>`;
  if (o.door !== false) s += `<path d="M${w * .2},0 L${w * .2},${-h * .45} Q${w * .2 + w * .1},${-h * .62} ${w * .4},${-h * .45} L${w * .4},0 Z" fill="${o.doorCol || '#7a4c2c'}"${ol}/>`;
  if (o.win !== false) s += `<rect x="${w * .56}" y="${-h * .72}" width="${w * .16}" height="${w * .14}" rx="2" fill="${o.winCol || '#5a3a26'}"${ol}/>`;
  return `<g transform="translate(${x},${y})">${s}</g>`;
}
function town(x, y, s = 1, o = {}) {
  const hs = [[0, 0, 46, 40], [40, -18, 54, 44], [88, 4, 40, 34], [118, -10, 58, 50], [170, 2, 42, 36], [20, 22, 50, 36], [72, 28, 60, 40], [134, 30, 52, 38]];
  return `<g transform="translate(${x},${y}) scale(${s})">${hs.map(([a, b, w, h]) => house(a, b + h, w, h, { ...o, sw: o.sw ?? 2.6 })).join('')}</g>`;
}
function tent(x, y, w, h, o = {}) {
  const c = o.fill || '#e7d2b0', st = o.stripe || '#b6553f';
  const d = `M${-w / 2},0 C${-w * .42},${-h * .45} ${-w * .12},${-h * .9} 0,${-h} C${w * .12},${-h * .9} ${w * .42},${-h * .45} ${w / 2},0 Z`;
  let s = op(d, c, o.sw ?? 2.6);
  s += `<path d="M${-w * .2},${-h * .66} Q${-w * .25},${-h * .3} ${-w * .3},0 M${w * .2},${-h * .66} Q${w * .25},${-h * .3} ${w * .3},0" stroke="${st}" stroke-width="${w * .06}" fill="none"/>`;
  s += `<path d="M${-w * .12},0 Q0,${-h * .62} ${w * .12},0 Z" fill="#4a3226"/>`;
  if (o.flag) s += flag(0, -h, o.flag, o.flagS || 1);
  return `<g transform="translate(${x},${y})">${s}</g>`;
}
function flag(x, y, col, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 L0,-46" stroke="#6b4a33" stroke-width="3"/><g transform="translate(0,-44)"><g class="wave" style="${dl(3)}"><path d="M0,0 C10,-4 20,4 34,0 L30,9 L34,18 C20,22 10,14 0,18 Z" fill="${col}" stroke="${OL}" stroke-width="2"/></g></g></g>`;
}

/* ---------- partículas desenhadas ---------- */
const HEART = 'M0,7 C-15,-4 -10,-17 0,-9 C10,-17 15,-4 0,7 Z';
function note(col = '#2f6db5') {
  return `<g><ellipse cx="-4" cy="6" rx="7" ry="5.4" transform="rotate(-20 -4 6)" fill="${col}"/><path d="M2,5 L2,-20 Q12,-16 14,-8" stroke="${col}" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>`;
}

/* =====================================================================
   PERSONAGENS
   ===================================================================== */
const CHILD = { headY: -152, R: 35, shY: -116, hemY: -40, shW: 24, hemW: 34, waistY: -78, arm: 46, armW: 13, hand: 7.5, legX: 10, legW: 11 };
const ADULT = { headY: -218, R: 30, shY: -186, hemY: -12, shW: 29, hemW: 42, waistY: -122, arm: 70, armW: 14, hand: 7.5, legX: 12, legW: 12 };

const PDEF = {
  x: 0, y: 0, s: 1, flip: false, kind: 'child', skin: '#e3a675', hair: '#5a3020', hi: null, hairStyle: 'short',
  beard: null, beardCol: null, tunic: '#3f93c7', trim: null, stripes: null, belt: '#7b4a2a', cloak: null, cloakTrim: null,
  head: null, clothCol: null, clothStripe: null, face: 'smile', look: 0, armL: { a: 12 }, armR: { a: 12 }, legs: 'stand',
  front: '', backItems: '', bag: false, sw: SW, cls: 'breath', k: '', back: false, browCol: null, longSleeves: false,
  hemY: null, hemW: null, greaves: null, shoe: null, armor: null, crownY: null, blush: true, extra: '', drop: 0
};

function person(o) {
  const d = Object.assign({}, PDEF, o);
  const G = d.kind === 'adult' ? ADULT : CHILD;
  const sw = d.sw;
  let back = '', mid = '';
  if (d.cloak) back += cloakBack(G, d, sw);
  if (d.backItems) back += d.backItems;
  let legs = d.legs === 'kneel' || d.legs === 'none' ? '' : legsSVG(G, d, sw);
  if (d.legs === 'kneel') legs = kneelSVG(G, d, sw);
  if (d.legs === 'sit') legs = sitSVG(G, d, sw);
  mid += bodySVG(G, d, sw);
  if (d.armor) mid += d.armor;
  if (d.bag) mid += bagSVG(G, d, sw);
  if (d.cloak) mid += cloakFront(G, d, sw);
  if (d.front) mid += d.front;
  mid += `<g transform="translate(0,${G.headY})"><g data-p="head">${headSVG(G, d, sw)}</g></g>`;
  mid += armSVG(G, d, -1, d.armL, sw) + armSVG(G, d, 1, d.armR, sw);
  mid += d.extra;
  const drop = d.legs === 'kneel' ? (d.kind === 'adult' ? 44 : 30) : d.drop;
  const sx = d.flip ? -d.s : d.s;
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${sx},${d.s})"${d.k ? ` data-k="${d.k}"` : ''}><g class="act"><g class="${d.cls}" style="${dl(4)}">${legs}<g transform="translate(0,${drop})">${back}${mid}</g></g></g></g>`;
}

function legsSVG(G, d, sw) {
  const lw = G.legW, top = (d.hemY ?? G.hemY) - 6;
  let feet;
  switch (d.legs) {
    case 'walk': feet = [[-G.legX - 8, 0], [G.legX + 8, -4]]; break;
    case 'run': feet = [[-G.legX - 20, -14], [G.legX + 18, 0]]; break;
    case 'tiptoe': feet = [[-G.legX - 7, -12], [G.legX + 5, -2]]; break;
    case 'wide': feet = [[-G.legX - 12, 0], [G.legX + 12, 0]]; break;
    case 'hop': feet = [[-G.legX + 2, -10], [G.legX - 2, -10]]; break;
    default: feet = [[-G.legX, 0], [G.legX, 0]];
  }
  const col = d.greaves || d.skin;
  let ol = '', fl = '', shoes = '';
  for (const [fx, fy] of feet) {
    const x0 = Math.sign(fx) * G.legX * .8, p = `M${x0},${top} L${fx},${fy - 6}`;
    ol += `<path d="${p}" stroke="${OL}" stroke-width="${lw + 2 * sw}" stroke-linecap="round"/>`;
    fl += `<path d="${p}" stroke="${col}" stroke-width="${lw}" stroke-linecap="round"/>`;
    const cx = fx + Math.sign(fx) * 3;
    shoes += `<ellipse cx="${cx}" cy="${fy - 4}" rx="${r1(lw * .95 + sw)}" ry="${r1(5.6 + sw)}" fill="${OL}"/><ellipse cx="${cx}" cy="${fy - 4}" rx="${r1(lw * .95)}" ry="5.6" fill="${d.shoe || '#7a4a2a'}"/>`;
  }
  return `<g data-p="legs"><g fill="none">${ol}${fl}</g>${shoes}</g>`;
}
function kneelSVG(G, d, sw) {
  const w = (d.hemW ?? G.hemW) + 6;
  return `<ellipse cx="0" cy="-6" rx="${w}" ry="10" fill="${OL}" opacity=".18"/><path d="M${-w},-2 Q${-w},-20 ${-w + 14},-22 L${w - 14},-22 Q${w},-20 ${w},-2 Z" fill="${d.tunic}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/><path d="M${-w + 6},-8 Q0,-2 ${w - 6},-8" stroke="${OL}" stroke-width="${sw * .7}" fill="none" opacity=".35"/>`;
}
function sitSVG(G, d, sw) {
  const top = (d.hemY ?? G.hemY), lw = G.legW, kx = G.legX + 4;
  let s = '';
  for (const sgn of [-1, 1]) {
    s += limb(sgn * kx, top - 2, sgn * (kx + 3), -8, lw, d.longSleeves ? d.tunic : d.skin, sw);
  }
  for (const sgn of [-1, 1]) s += `<ellipse cx="${sgn * (kx + 5)}" cy="-4" rx="${r1(lw + sw)}" ry="${r1(5.6 + sw)}" fill="${OL}"/><ellipse cx="${sgn * (kx + 5)}" cy="-4" rx="${lw}" ry="5.6" fill="${d.shoe || '#7a4a2a'}"/>`;
  return s;
}

function bodySVG(G, d, sw) {
  const sY = G.shY, hY = d.hemY ?? G.hemY, sW = G.shW, hW = d.hemW ?? G.hemW;
  const path = `M${-sW},${sY + 11} Q${-sW},${sY} ${-sW + 11},${sY} L${sW - 11},${sY} Q${sW},${sY} ${sW},${sY + 11} L${hW},${hY - 5} Q${hW + 1},${hY + 2} ${hW - 7},${hY + 2} Q0,${hY + 7} ${-hW + 7},${hY + 2} Q${-hW - 1},${hY + 2} ${-hW},${hY - 5} Z`;
  let o = `<path d="${path}" fill="${d.tunic}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  o += `<path d="M${r1(sW * .3)},${sY + 1.6} L${sW - 10},${sY + 1.6} Q${sW - 1.6},${sY + 1.6} ${sW - 1.6},${sY + 11} L${hW - 1.6},${hY - 5} Q${hW - 1},${hY} ${hW - 8},${hY} Q${r1(hW * .5)},${hY + 3} ${r1(hW * .4)},${hY + 3} Z" fill="#1d1030" opacity=".11"/>`;
  if (d.stripes) for (const s of [-1, 1]) o += `<path d="M${r1(s * sW * .45)},${sY + 1} L${r1(s * hW * .45)},${hY + 2}" stroke="${d.stripes}" stroke-width="5"/>`;
  if (d.trim) o += `<path d="M${-hW + 3},${hY - 4} Q0,${hY + 3} ${hW - 3},${hY - 4}" fill="none" stroke="${d.trim}" stroke-width="6"/>`;
  o += `<path d="M-9,${sY + 1} Q0,${sY + 12} 9,${sY + 1}" fill="none" stroke="${OL}" stroke-width="${r1(sw * .8)}" stroke-linecap="round" opacity=".55"/>`;
  if (d.belt) {
    const t = (G.waistY - sY) / (hY - sY), w = sW + (hW - sW) * t, y = G.waistY;
    o += `<path d="M${r1(-w - .6)},${y - 3.6} L${r1(w + .6)},${y - 3.6} L${r1(w + 1.2)},${y + 3.6} L${r1(-w - 1.2)},${y + 3.6} Z" fill="${d.belt}" stroke="${OL}" stroke-width="${r1(sw * .8)}" stroke-linejoin="round"/>`;
    o += `<path d="M${r1(-w * .35)},${y + 3} l-3,12 M${r1(-w * .35)},${y + 3} l4,11" stroke="${d.belt}" stroke-width="3.6" stroke-linecap="round"/><circle cx="${r1(-w * .35)}" cy="${y}" r="4.2" fill="${d.belt}" stroke="${OL}" stroke-width="${r1(sw * .7)}"/>`;
  }
  return o;
}
function bagSVG(G, d, sw) {
  const bx = G.hemW - 4, by = G.waistY + 20;
  return `<path d="M${-G.shW + 7},${G.shY + 3} L${bx - 4},${by - 8}" stroke="${OL}" stroke-width="${5 + 2 * sw}" stroke-linecap="round"/><path d="M${-G.shW + 7},${G.shY + 3} L${bx - 4},${by - 8}" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/><g data-p="bag" transform="translate(${bx},${by})"><path d="M-13,-10 L13,-10 Q15,10 9,13 L-9,13 Q-15,10 -13,-10 Z" fill="#b57c46" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/><path d="M-13,-10 L13,-10 L11,1 Q0,6 -11,1 Z" fill="#9b6436" stroke="${OL}" stroke-width="${r1(sw * .8)}" stroke-linejoin="round"/><circle cx="0" cy="1" r="2.6" fill="#e9c27a" stroke="${OL}" stroke-width="1.4"/></g>`;
}
function cloakBack(G, d, sw) {
  const sY = G.shY, hY = (d.hemY ?? G.hemY), sW = G.shW + 6, hW = (d.hemW ?? G.hemW) + 12;
  const p = `M${-sW},${sY + 4} Q${-sW - 4},${sY - 6} ${-sW + 12},${sY - 4} L${sW - 12},${sY - 4} Q${sW + 4},${sY - 6} ${sW},${sY + 4} L${hW},${hY + 2} Q0,${hY + 10} ${-hW},${hY + 2} Z`;
  return `<path d="${p}" fill="${d.cloak}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/><path d="M${-hW + 4},${hY} Q0,${hY + 7} ${hW - 4},${hY}" stroke="#000" opacity=".15" stroke-width="5" fill="none"/>`;
}
function cloakFront(G, d, sw) {
  const sY = G.shY, sW = G.shW + 6;
  const t = d.cloakTrim || '#f2c14e';
  return `<path d="M${-sW},${sY + 4} Q${-sW + 6},${sY - 4} ${-sW + 16},${sY - 3} L${-10},${sY + 6} Q${-sW + 10},${sY + 14} ${-sW + 2},${sY + 40} Z" fill="${d.cloak}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/><path d="M${sW},${sY + 4} Q${sW - 6},${sY - 4} ${sW - 16},${sY - 3} L10,${sY + 6} Q${sW - 10},${sY + 14} ${sW - 2},${sY + 40} Z" fill="${d.cloak}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/><circle cx="0" cy="${sY + 6}" r="5" fill="${t}" stroke="${OL}" stroke-width="${r1(sw * .8)}"/>`;
}

/* ---------- cabeça ---------- */
function curlRing(R) {
  const c = [];
  for (let a = 152; a <= 388; a += 21.5) {
    const t = a * Math.PI / 180;
    c.push([Math.cos(t) * R * .86, Math.sin(t) * R * .86 - R * .05, R * .34]);
  }
  c.push([0, -R * .45, R * .58]);
  return c;
}
function headSVG(G, d, sw) {
  const R = G.R, hc = d.hair, hs = d.hairStyle;
  let o = '';
  if (d.head === 'cloth' || d.head === 'scarf') o += clothBack(R, d, sw);
  else if (hs === 'curly') o += blob(curlRing(R), hc, sw);
  else if (hs === 'short' || hs === 'full') o += `<path d="M${r1(-R * 1.05)},${r1(R * .22)} C${r1(-R * 1.12)},${r1(-R * 1.24)} ${r1(R * 1.12)},${r1(-R * 1.24)} ${r1(R * 1.05)},${r1(R * .22)} Z" fill="${hc}" stroke="${OL}" stroke-width="${sw}"/>`;
  else if (hs === 'long') o += `<path d="M${r1(-R * 1.06)},${r1(R * .1)} C${r1(-R * 1.16)},${r1(-R * 1.26)} ${r1(R * 1.16)},${r1(-R * 1.26)} ${r1(R * 1.06)},${r1(R * .1)} L${r1(R * 1.14)},${r1(R * 1.3)} Q0,${r1(R * 1.45)} ${r1(-R * 1.14)},${r1(R * 1.3)} Z" fill="${hc}" stroke="${OL}" stroke-width="${sw}"/>`;
  const hideEars = ['cloth', 'scarf', 'helmetG'].includes(d.head) || hs === 'long';
  if (!hideEars) for (const s of [-1, 1]) o += `<circle cx="${r1(s * R * .96)}" cy="${r1(R * .1)}" r="${r1(R * .2 + sw)}" fill="${OL}"/><circle cx="${r1(s * R * .96)}" cy="${r1(R * .1)}" r="${r1(R * .2)}" fill="${d.skin}"/>`;
  o += `<circle r="${r1(R + sw)}" fill="${OL}"/><circle r="${R}" fill="${d.skin}"/>`;
  if (d.back) {
    o += `<path d="M${r1(-R * 1.02)},${r1(R * .5)} C${r1(-R * 1.2)},${r1(-R * 1.3)} ${r1(R * 1.2)},${r1(-R * 1.3)} ${r1(R * 1.02)},${r1(R * .5)} Q0,${r1(R * .95)} ${r1(-R * 1.02)},${r1(R * .5)} Z" fill="${hc}" stroke="${OL}" stroke-width="${sw}"/><path d="M${r1(-R * .4)},${r1(-R * .6)} q${r1(R * .2)},${r1(R * .5)} 0,${r1(R * 1.1)} M${r1(R * .3)},${r1(-R * .7)} q${r1(-R * .15)},${r1(R * .6)} ${r1(R * .05)},${r1(R * 1.2)}" stroke="${OL}" stroke-width="2" fill="none" opacity=".3"/>`;
  } else {
    if (d.beard) o += beardSVG(R, d, sw);
    o += faceSVG(R, d, sw);
    if (d.beard) o += mustache(R, d, sw);
    o += hairFront(R, d, sw);
  }
  o += headwear(R, d, sw);
  return o;
}
function hairFront(R, d, sw) {
  const hc = d.hair, hs = d.hairStyle;
  if (d.head === 'cloth' || d.head === 'scarf' || d.head === 'helmetG' || d.head === 'helmetI') return '';
  if (hs === 'curly') {
    const fr = [[-R * .54, -R * .64, R * .26], [-R * .18, -R * .76, R * .28], [R * .18, -R * .76, R * .28], [R * .54, -R * .64, R * .26], [-R * .86, -R * .28, R * .21], [R * .86, -R * .28, R * .21]];
    const hi = d.hi || '#c0612e';
    return blob(fr, hc, sw) + `<g fill="none" stroke="${hi}" stroke-width="${r1(R * .07)}" stroke-linecap="round"><path d="M${r1(-R * .66)},${r1(-R * .72)} q${r1(R * .1)},${r1(-R * .1)} ${r1(R * .2)},0"/><path d="M${r1(-R * .27)},${r1(-R * .86)} q${r1(R * .1)},${r1(-R * .1)} ${r1(R * .2)},0"/><path d="M${r1(R * .1)},${r1(-R * .86)} q${r1(R * .1)},${r1(-R * .1)} ${r1(R * .2)},0"/><path d="M${r1(-R * .55)},${r1(-R * 1.18)} q${r1(R * .12)},${r1(-R * .1)} ${r1(R * .24)},0"/><path d="M${r1(R * .2)},${r1(-R * 1.24)} q${r1(R * .12)},${r1(-R * .1)} ${r1(R * .24)},0"/></g>`;
  }
  if (hs === 'short' || hs === 'long') {
    return `<path d="M${r1(-R * .99)},${r1(-R * .02)} C${r1(-R * 1.03)},${r1(-R * 1.14)} ${r1(R * 1.03)},${r1(-R * 1.14)} ${r1(R * .99)},${r1(-R * .02)} Q${r1(R * .9)},${r1(-R * .4)} ${r1(R * .5)},${r1(-R * .5)} Q${r1(R * .2)},${r1(-R * .36)} ${r1(-R * .08)},${r1(-R * .54)} Q${r1(-R * .55)},${r1(-R * .52)} ${r1(-R * .82)},${r1(-R * .3)} Q${r1(-R * .95)},${r1(-R * .18)} ${r1(-R * .99)},${r1(-R * .02)} Z" fill="${hc}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  }
  return '';
}
function faceSVG(R, d, sw) {
  const e = d.face, lx = (d.look || 0) * R * .17;
  const ex = R * .34, ey = R * .02;
  let o = '';
  if (d.blush) for (const s of [-1, 1]) o += `<ellipse cx="${r1(lx + s * R * .57)}" cy="${r1(R * .3)}" rx="${r1(R * .16)}" ry="${r1(R * .095)}" fill="#ef7d78" opacity=".42"/>`;
  const up = e === 'laugh' || e === 'joy', down = e === 'sleep' || (d.shut && !up);
  if (up || down) {
    const k = up ? -1 : 1;
    for (const s of [-1, 1]) o += `<path d="M${r1(lx + s * ex - R * .13)},${r1(ey)} q${r1(R * .13)},${r1(k * R * .14)} ${r1(R * .26)},0" fill="none" stroke="${OL}" stroke-width="${r1(sw * .95)}" stroke-linecap="round"/>`;
  } else {
    const big = e === 'surprise' || e === 'o' || e === 'scared';
    const rx = R * (big ? .12 : .105), ry = R * (big ? .16 : .14);
    o += `<g class="eyes" style="${dl(5)}">`;
    for (const s of [-1, 1]) o += `<ellipse cx="${r1(lx + s * ex)}" cy="${r1(ey)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${OL}"/><circle cx="${r1(lx + s * ex + R * .04)}" cy="${r1(ey - R * .05)}" r="${r1(R * .045)}" fill="#fff"/>`;
    o += `</g>`;
  }
  // sobrancelhas
  const by = ey - R * .29, bc = d.browCol || OL;
  let inner = 0, outer = .02;
  if (e === 'worry' || e === 'sad' || e === 'scared') { inner = -.09; outer = .03; }
  if (e === 'angry' || e === 'frown' || e === 'determined' || e === 'shout') { inner = .08; outer = -.04; }
  if (e === 'surprise' || e === 'o') { inner = -.08; outer = -.06; }
  if (e === 'laugh' || e === 'joy') { inner = -.03; outer = -.02; }
  for (const s of [-1, 1]) {
    const xi = lx + s * (ex - R * .12), xo = lx + s * (ex + R * .14);
    o += `<path d="M${r1(xo)},${r1(by + outer * R)} Q${r1((xi + xo) / 2)},${r1(by - R * .06 + (inner + outer) * R / 2)} ${r1(xi)},${r1(by + inner * R)}" fill="none" stroke="${bc}" stroke-width="${r1(sw * (d.browCol ? 1.6 : 1))}" stroke-linecap="round"/>`;
  }
  // nariz
  o += `<path d="M${r1(lx - R * .06)},${r1(R * .16)} q${r1(R * .07)},${r1(R * .08)} ${r1(R * .13)},0" fill="none" stroke="${OL}" stroke-opacity=".5" stroke-width="${r1(sw * .7)}" stroke-linecap="round"/>`;
  // boca
  if (d.beard) o += `<ellipse cx="${r1(lx)}" cy="${r1(R * .47)}" rx="${r1(R * .24)}" ry="${r1(R * .15)}" fill="${d.skin}"/>`;
  const my = R * .4;
  const M = (w, h) => `M${r1(lx - w)},${r1(my)} Q${r1(lx)},${r1(my + h)} ${r1(lx + w)},${r1(my)} Z`;
  switch (e) {
    case 'grin': case 'joy': case 'open':
      o += `<path d="${M(R * .22, R * .36)}" fill="#8c2f39" stroke="${OL}" stroke-width="${r1(sw * .8)}" stroke-linejoin="round"/><ellipse cx="${r1(lx)}" cy="${r1(my + R * .17)}" rx="${r1(R * .09)}" ry="${r1(R * .05)}" fill="#e8737a"/>`; break;
    case 'laugh': case 'shout':
      o += `<path d="${M(R * .3, R * .55)}" fill="#8c2f39" stroke="${OL}" stroke-width="${r1(sw * .8)}" stroke-linejoin="round"/><ellipse cx="${r1(lx)}" cy="${r1(my + R * .28)}" rx="${r1(R * .13)}" ry="${r1(R * .07)}" fill="#e8737a"/>`; break;
    case 'o': case 'surprise': case 'scared':
      o += `<ellipse cx="${r1(lx)}" cy="${r1(my + R * .08)}" rx="${r1(R * .09)}" ry="${r1(R * .12)}" fill="#8c2f39" stroke="${OL}" stroke-width="${r1(sw * .7)}"/>`; break;
    case 'frown': case 'sad': case 'angry':
      o += `<path d="M${r1(lx - R * .16)},${r1(my + R * .14)} Q${r1(lx)},${r1(my - R * .02)} ${r1(lx + R * .16)},${r1(my + R * .14)}" fill="none" stroke="${OL}" stroke-width="${r1(sw * .9)}" stroke-linecap="round"/>`; break;
    case 'worry':
      o += `<path d="M${r1(lx - R * .17)},${r1(my + R * .08)} q${r1(R * .085)},${r1(-R * .07)} ${r1(R * .17)},0 t${r1(R * .17)},0" fill="none" stroke="${OL}" stroke-width="${r1(sw * .85)}" stroke-linecap="round"/>`; break;
    case 'determined':
      o += `<path d="M${r1(lx - R * .15)},${r1(my + R * .06)} Q${r1(lx + R * .03)},${r1(my + R * .14)} ${r1(lx + R * .17)},${r1(my + R * .01)}" fill="none" stroke="${OL}" stroke-width="${r1(sw * .9)}" stroke-linecap="round"/>`; break;
    case 'sleep':
      o += `<ellipse cx="${r1(lx)}" cy="${r1(my + R * .08)}" rx="${r1(R * .06)}" ry="${r1(R * .05)}" fill="#8c2f39"/>`; break;
    default:
      o += `<path d="M${r1(lx - R * .19)},${r1(my)} Q${r1(lx)},${r1(my + R * .19)} ${r1(lx + R * .19)},${r1(my)}" fill="none" stroke="${OL}" stroke-width="${r1(sw * .9)}" stroke-linecap="round"/>`;
  }
  return o;
}
function beardSVG(R, d, sw) {
  const c = d.beardCol || d.hair, t = d.beard;
  const b = t === 'long' ? R * 1.85 : t === 'bushy' ? R * 1.5 : R * 1.2;
  const p = `M${r1(-R * .98)},${r1(-R * .1)} C${r1(-R * 1.04)},${r1(R * .75)} ${r1(-R * .58)},${r1(b)} 0,${r1(b)} C${r1(R * .58)},${r1(b)} ${r1(R * 1.04)},${r1(R * .75)} ${r1(R * .98)},${r1(-R * .1)} L${r1(R * .82)},${r1(R * .06)} Q${r1(R * .55)},${r1(R * .3)} ${r1(R * .28)},${r1(R * .3)} Q0,${r1(R * .27)} ${r1(-R * .28)},${r1(R * .3)} Q${r1(-R * .55)},${r1(R * .3)} ${r1(-R * .82)},${r1(R * .06)} Z`;
  let o = `<path d="${p}" fill="${c}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  if (t === 'bushy') {
    const cs = [];
    for (let a = 10; a <= 170; a += 20) { const tt = a * Math.PI / 180; cs.push([Math.cos(tt) * R * .9, Math.sin(tt) * R * .95 + R * .35, R * .26]); }
    o = blob(cs, c, sw) + `<path d="${p}" fill="${c}"/>`;
  }
  o += `<g stroke="${OL}" stroke-width="1.6" opacity=".28" fill="none"><path d="M${r1(-R * .5)},${r1(R * .7)} q${r1(R * .05)},${r1(R * .25)} ${r1(R * .12)},${r1(R * .4)}"/><path d="M${r1(R * .45)},${r1(R * .72)} q${r1(-R * .04)},${r1(R * .25)} ${r1(-R * .1)},${r1(R * .4)}"/><path d="M0,${r1(R * .82)} l0,${r1(R * .35)}"/></g>`;
  return o;
}
function mustache(R, d, sw) {
  const c = d.beardCol || d.hair;
  return `<path d="M0,${r1(R * .31)} C${r1(-R * .12)},${r1(R * .23)} ${r1(-R * .36)},${r1(R * .25)} ${r1(-R * .43)},${r1(R * .44)} C${r1(-R * .26)},${r1(R * .37)} ${r1(-R * .1)},${r1(R * .41)} 0,${r1(R * .37)} C${r1(R * .1)},${r1(R * .41)} ${r1(R * .26)},${r1(R * .37)} ${r1(R * .43)},${r1(R * .44)} C${r1(R * .36)},${r1(R * .25)} ${r1(R * .12)},${r1(R * .23)} 0,${r1(R * .31)} Z" fill="${c}" stroke="${OL}" stroke-width="${r1(sw * .75)}" stroke-linejoin="round"/>`;
}
function clothBack(R, d, sw) {
  const c = d.clothCol || '#efe2c4';
  const p = `M${r1(-R * 1.1)},${r1(-R * .3)} C${r1(-R * 1.16)},${r1(-R * 1.36)} ${r1(R * 1.16)},${r1(-R * 1.36)} ${r1(R * 1.1)},${r1(-R * .3)} L${r1(R * 1.34)},${r1(R * 1.45)} Q0,${r1(R * 1.62)} ${r1(-R * 1.34)},${r1(R * 1.45)} Z`;
  let o = `<path d="${p}" fill="${c}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  if (d.clothStripe) for (const s of [-1, 1]) o += `<path d="M${r1(s * R * 1.14)},${r1(R * .1)} L${r1(s * R * 1.27)},${r1(R * 1.38)}" stroke="${d.clothStripe}" stroke-width="${r1(R * .12)}"/>`;
  return o;
}
function crownSVG(R, y0, sw, col = '#f4c542') {
  const w = R * .64, h = R * .52;
  const d = `M${r1(-w)},${r1(y0)} L${r1(-w * 1.1)},${r1(y0 - h)} L${r1(-w * .5)},${r1(y0 - h * .52)} L0,${r1(y0 - h * 1.18)} L${r1(w * .5)},${r1(y0 - h * .52)} L${r1(w * 1.1)},${r1(y0 - h)} L${r1(w)},${r1(y0)} Q0,${r1(y0 + R * .1)} ${r1(-w)},${r1(y0)} Z`;
  let o = `<path d="${d}" fill="${col}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  o += `<path d="M${r1(-w * .9)},${r1(y0 - h * .2)} Q0,${r1(y0 - h * .12)} ${r1(w * .9)},${r1(y0 - h * .2)}" stroke="#d99a1c" stroke-width="${r1(R * .06)}" fill="none"/>`;
  for (const [x, c] of [[-w * .52, '#d7333f'], [0, '#2f7fd1'], [w * .52, '#d7333f']]) o += `<circle cx="${r1(x)}" cy="${r1(y0 - h * .3)}" r="${r1(R * .085)}" fill="${c}" stroke="${OL}" stroke-width="1.4"/>`;
  for (const [x, y] of [[-w * 1.1, y0 - h], [0, y0 - h * 1.18], [w * 1.1, y0 - h]]) o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(R * .075)}" fill="${col}" stroke="${OL}" stroke-width="1.6"/>`;
  return o;
}
function helmetDome(R, sw, col = '#c9934b', k = 1) {
  const p = `M${r1(-R * 1.08 * k)},${r1(-R * .2)} C${r1(-R * 1.1 * k)},${r1(-R * 1.38)} ${r1(R * 1.1 * k)},${r1(-R * 1.38)} ${r1(R * 1.08 * k)},${r1(-R * .2)} Q0,${r1(-R * .46)} ${r1(-R * 1.08 * k)},${r1(-R * .2)} Z`;
  return `<path d="${p}" fill="${col}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/><path d="M${r1(-R * 1.02 * k)},${r1(-R * .3)} Q0,${r1(-R * .58)} ${r1(R * 1.02 * k)},${r1(-R * .3)}" stroke="#9c6a2e" stroke-width="${r1(R * .1)}" fill="none"/><path d="M${r1(-R * .55)},${r1(-R * .95)} Q${r1(-R * .25)},${r1(-R * 1.2)} ${r1(R * .1)},${r1(-R * 1.18)}" stroke="#f0c98a" stroke-width="${r1(R * .09)}" fill="none" stroke-linecap="round"/>`;
}
function headwear(R, d, sw) {
  const h = d.head;
  if (!h) return '';
  if (h === 'crown') return crownSVG(R, d.crownY ?? (d.hairStyle === 'curly' ? -R * .86 : -R * .74), sw);
  if (h === 'circlet') return `<path d="M${r1(-R * .99)},${r1(-R * .34)} Q0,${r1(-R * .88)} ${r1(R * .99)},${r1(-R * .34)}" fill="none" stroke="${OL}" stroke-width="${r1(R * .13 + 2 * sw)}" stroke-linecap="round"/><path d="M${r1(-R * .99)},${r1(-R * .34)} Q0,${r1(-R * .88)} ${r1(R * .99)},${r1(-R * .34)}" fill="none" stroke="#f2c14e" stroke-width="${r1(R * .13)}" stroke-linecap="round"/><circle cx="0" cy="${r1(-R * .62)}" r="${r1(R * .1)}" fill="#2f7fd1" stroke="${OL}" stroke-width="1.6"/>`;
  if (h === 'cloth' || h === 'scarf') {
    const c = d.clothCol || '#efe2c4';
    let o = `<path d="M${r1(-R * 1.08)},${r1(-R * .16)} C${r1(-R * 1.12)},${r1(-R * 1.32)} ${r1(R * 1.12)},${r1(-R * 1.32)} ${r1(R * 1.08)},${r1(-R * .16)} Q${r1(R * .55)},${r1(-R * .64)} 0,${r1(-R * .62)} Q${r1(-R * .55)},${r1(-R * .64)} ${r1(-R * 1.08)},${r1(-R * .16)} Z" fill="${c}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    if (h === 'cloth') o += stroke2(`M${r1(-R * 1.03)},${r1(-R * .42)} Q0,${r1(-R * .92)} ${r1(R * 1.03)},${r1(-R * .42)}`, R * .12, d.bandCol || '#5b3a2a', sw * .8);
    return o;
  }
  if (h === 'helmetI') return helmetDome(R, sw) + `<circle cx="0" cy="${r1(-R * 1.12)}" r="${r1(R * .14)}" fill="#c9934b" stroke="${OL}" stroke-width="${sw}"/>`;
  if (h === 'helmetG') {
    let o = '';
    o += `<path d="M${r1(-R * .2)},${r1(-R * 1.0)} C${r1(-R * .4)},${r1(-R * 1.9)} ${r1(R * .9)},${r1(-R * 2.05)} ${r1(R * 1.4)},${r1(-R * 1.25)} C${r1(R * 1.05)},${r1(-R * 1.55)} ${r1(R * .45)},${r1(-R * 1.45)} ${r1(R * .25)},${r1(-R * .95)} Z" fill="#c0392b" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    for (const s of [-1, 1]) o += `<path d="M${r1(s * R * 1.08)},${r1(-R * .32)} L${r1(s * R * 1.12)},${r1(R * .38)} Q${r1(s * R * 1.0)},${r1(R * .62)} ${r1(s * R * .78)},${r1(R * .46)} L${r1(s * R * .82)},${r1(-R * .22)} Z" fill="#b98340" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    return o + helmetDome(R, sw, '#c08a44', 1.04);
  }
  if (h === 'helmetP') {
    let o = '';
    for (let i = -4; i <= 4; i++) o += `<path d="M${r1(i * R * .2)},${r1(-R * .55)} L${r1(i * R * .24)},${r1(-R * 1.45)}" stroke="${i % 2 ? '#f3efe6' : '#c0392b'}" stroke-width="${r1(R * .2)}" stroke-linecap="round"/>`;
    return `<g stroke="${OL}" stroke-width="${r1(R * .2 + 2 * sw)}" stroke-linecap="round">${[...Array(9)].map((_, j) => `<path d="M${r1((j - 4) * R * .2)},${r1(-R * .55)} L${r1((j - 4) * R * .24)},${r1(-R * 1.45)}"/>`).join('')}</g>${o}` + stroke2(`M${r1(-R * 1.0)},${r1(-R * .38)} Q0,${r1(-R * .82)} ${r1(R * 1.0)},${r1(-R * .38)}`, R * .2, '#e0b04a', sw * .8);
  }
  return '';
}

/* ---------- braços e objetos ---------- */
function armSVG(G, d, side, A, sw) {
  if (!A || A.hide) return '';
  const out = A.a ?? 12;
  const rot = side < 0 ? out : -out;
  const bend = (A.b ?? 0) * (side < 0 ? 1 : -1);
  const L = A.len ?? G.arm, u = L * .52, f = L - u, W = G.armW;
  const sleeve = A.sleeve || d.tunic;
  const fore = A.fore || (d.longSleeves ? sleeve : d.skin);
  const hand = `<circle cx="0" cy="${r1(f)}" r="${r1(G.hand + sw)}" fill="${OL}"/><circle cx="0" cy="${r1(f)}" r="${G.hand}" fill="${d.skin}"/>`;
  const item = A.item ? `<g transform="translate(0,${r1(f)}) rotate(${r1(-(rot + bend) + (A.ia ?? 0))})">${A.item}</g>` : '';
  const foreG = `<g transform="translate(0,${r1(u)}) rotate(${r1(bend)})"><g data-p="${side < 0 ? 'foreL' : 'foreR'}"><path d="M0,0 L0,${r1(f)}" stroke="${OL}" stroke-width="${r1(W + 2 * sw)}" stroke-linecap="round"/><path d="M0,0 L0,${r1(f)}" stroke="${fore}" stroke-width="${W - 1}" stroke-linecap="round"/>${A.handFirst ? hand + item : item + hand}</g></g>`;
  const up = `<path d="M0,0 L0,${r1(u)}" stroke="${OL}" stroke-width="${r1(W + 2 * sw)}" stroke-linecap="round"/><path d="M0,0 L0,${r1(u * .62)}" stroke="${OL}" stroke-width="${r1(W + 2 + 2 * sw)}" stroke-linecap="round"/>`;
  const upSkin = `<path d="M0,0 L0,${r1(u)}" stroke="${fore}" stroke-width="${W - 1}" stroke-linecap="round"/>`;
  const sl = d.longSleeves || A.sleeve ? u + 2 : u * .62;
  const upF = `<path d="M0,0 L0,${r1(sl)}" stroke="${sleeve}" stroke-width="${W + 2}" stroke-linecap="round"/>`;
  return `<g transform="translate(${side * (G.shW - 4)},${G.shY + 8}) rotate(${r1(rot)})"><g data-p="${side < 0 ? 'armL' : 'armR'}">${up}${upSkin}${foreG}${upF}</g></g>`;
}
// posição da mão (coordenadas locais do personagem)
function handPos(kind, side, A, drop = 0) {
  const G = kind === 'adult' ? ADULT : CHILD;
  const out = A.a ?? 12, rot = (side < 0 ? out : -out) * Math.PI / 180;
  const bend = ((A.b ?? 0) * (side < 0 ? 1 : -1)) * Math.PI / 180;
  const L = A.len ?? G.arm, u = L * .52, f = L - u;
  const sx = side * (G.shW - 4), sy = G.shY + 8;
  const ex = sx - Math.sin(rot) * u, ey = sy + Math.cos(rot) * u;
  return [ex - Math.sin(rot + bend) * f, ey + Math.cos(rot + bend) * f + drop];
}
const ITEM = {
  staff(len = 176, dir = -1) {
    const top = -(len - 46);
    const p = `M0,46 L0,${top} C0,${top - 30} ${dir * 30},${top - 32} ${dir * 30},${top - 8}`;
    return `<path d="${p}" fill="none" stroke="${OL}" stroke-width="${7 + 2 * SW}" stroke-linecap="round"/><path d="${p}" fill="none" stroke="#a46e3c" stroke-width="7" stroke-linecap="round"/><path d="M-1.6,38 L-1.6,${top}" stroke="#c99257" stroke-width="2" opacity=".75"/>`;
  },
  sling(k = '') {
    return `<g${k ? ` data-k="${k}"` : ''}><path d="M0,0 C-7,16 -5,32 -4,44 M0,0 C7,16 6,32 4,44" stroke="#6e4628" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="47" rx="9" ry="6.5" fill="#8a5a33" stroke="${OL}" stroke-width="2"/></g>`;
  },
  horn(k = '') {
    return `<g${k ? ` data-k="${k}"` : ''}><path d="M-36,-18 C-20,-12 4,-12 28,-9 L31,11 C6,9 -16,4 -34,-13 Z" fill="#f2e3c1" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><g stroke="#c9ad7c" stroke-width="2.4" fill="none"><path d="M-14,-14 Q-11,-6 -12,1"/><path d="M0,-12 Q3,-3 2,5"/><path d="M14,-11 Q17,-1 16,7"/></g><ellipse cx="29.5" cy="1" rx="4" ry="10" fill="#e8b93a" stroke="${OL}" stroke-width="2.2"/></g>`;
  },
  spear(len = 250, w = 5, k = '') {
    const top = -len + 60;
    return `<g${k ? ` data-k="${k}"` : ''}>${limb(0, 60, 0, top, w, '#9a6b3e')}<path d="M${-w * 1.5},${top + 2} L0,${top - w * 7} L${w * 1.5},${top + 2} Z" fill="#cfd5dc" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/></g>`;
  },
  sword(k = '') {
    return `<g${k ? ` data-k="${k}"` : ''}><path d="M-3.5,-6 L-3.5,-62 L0,-72 L3.5,-62 L3.5,-6 Z" fill="#dfe5ea" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><rect x="-12" y="-8" width="24" height="7" rx="3" fill="#d9a33a" stroke="${OL}" stroke-width="2.4"/><rect x="-3" y="-2" width="6" height="15" rx="2" fill="#7a4a2a" stroke="${OL}" stroke-width="2.2"/></g>`;
  },
  lyre(w = 54, h = 70, k = 'lyre') {
    const yk = x => -h + 2 - ((x + w / 2 + 12) / (w + 24)) * 10;
    let strs = '';
    for (let i = 0; i < 5; i++) {
      const x = -w / 2 + 12 + i * ((w - 24) / 4);
      strs += `<path class="str" data-s="${i}" d="M${r1(x)},-15 L${r1(x)},${r1(yk(x) + 3)}" stroke="#fff4d8" stroke-width="1.8"/>`;
    }
    const arm = s => `M${s * (w / 2 - 6)},-14 C${s * (w / 2 + 10)},${-h * .42} ${s * (w / 2 - 2)},${-h * .76} ${s * (w / 2 + 6)},${r1(yk(s * (w / 2 + 6)) + 2)}`;
    return `<g data-k="${k}">${stroke2(arm(-1), 7, '#b06f37')}${stroke2(arm(1), 7, '#b06f37')}${stroke2(`M${-w / 2 - 12},${r1(yk(-w / 2 - 12))} L${w / 2 + 12},${r1(yk(w / 2 + 12))}`, 6, '#9a5d2c')}<path d="M${-w / 2},-17 Q${-w / 2},0 ${-w / 2 + 8},0 L${w / 2 - 8},0 Q${w / 2},0 ${w / 2},-17 Z" fill="#c07c3e" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><circle cx="0" cy="-8" r="3.4" fill="#5a3320"/>${strs}</g>`;
  },
  shofar(k = '') {
    return `<g${k ? ` data-k="${k}"` : ''}><path d="M0,-3 C18,-6 36,-16 50,-38 C56,-48 70,-52 74,-44 C68,-40 66,-30 60,-22 C46,-4 22,6 0,4 Z" fill="#ecd7a6" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><g stroke="#b99360" stroke-width="2.2" fill="none"><path d="M18,-7 Q22,-1 20,4"/><path d="M34,-16 Q40,-9 38,-3"/><path d="M48,-30 Q55,-24 54,-17"/></g><ellipse cx="68" cy="-46" rx="6" ry="9" transform="rotate(35 68 -46)" fill="#5a3a26" stroke="${OL}" stroke-width="2"/></g>`;
  },
  scroll(k = '') {
    return `<g${k ? ` data-k="${k}"` : ''}><rect x="-26" y="-18" width="52" height="34" fill="#f6ead0" stroke="${OL}" stroke-width="2.6"/><g stroke="#b9a37c" stroke-width="2" stroke-linecap="round"><path d="M-18,-8 L16,-8"/><path d="M-18,0 L12,0"/><path d="M-18,8 L16,8"/></g>${limb(-28, -24, -28, 22, 7, '#a46e3c', 2.4)}${limb(28, -24, 28, 22, 7, '#a46e3c', 2.4)}</g>`;
  },
  bow() {
    return `<g><path d="M0,-58 Q34,0 0,58" stroke="${OL}" stroke-width="${6 + 2 * SW}" fill="none" stroke-linecap="round"/><path d="M0,-58 Q34,0 0,58" stroke="#a5683a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0,-58 L0,58" stroke="#efe6d4" stroke-width="1.6"/></g>`;
  },
  cloth(col = '#b6312f') {
    return `<path d="M-10,-6 L12,-10 L14,8 L-8,12 Z" fill="${col}" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-6,4 L10,1" stroke="#f2c14e" stroke-width="2.4"/>`;
  },
  stone(r = 7) {
    return `<ellipse cx="0" cy="0" rx="${r * 1.2}" ry="${r}" fill="#9aa4b1" stroke="${OL}" stroke-width="2.2"/><ellipse cx="${-r * .35}" cy="${-r * .35}" rx="${r * .4}" ry="${r * .22}" fill="#d7dde4"/>`;
  }
};

/* ---------- animais ---------- */
function sheep(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, face: '#4b3d38', wool: '#fffaf0', pose: 'stand', k: '', cls: '', head: 1 }, o);
  const ink = d.face;
  let legs = '';
  if (d.pose !== 'sleep' && d.pose !== 'lie') for (const [lx, i] of [[-28, 0], [-13, 1], [15, 2], [30, 3]]) legs += limb(lx, -26, lx + (i % 2 ? 1.5 : -1.5), -4, 7.5, ink);
  const lo = d.pose === 'sleep' || d.pose === 'lie' ? 18 : 0;
  const wool = [[-32, -42, 17], [-14, -52, 19], [8, -53, 19], [27, -46, 17], [35, -33, 13], [-38, -30, 14], [-20, -27, 17], [4, -26, 19], [24, -28, 16], [-46, -44, 8]];
  let body = blob(wool.map(([a, b, r]) => [a, b + lo, r]), d.wool);
  body += `<g fill="none" stroke="#e6dcc7" stroke-width="2.6" stroke-linecap="round"><path d="M-34,${-46 + lo} q6,-6 12,0"/><path d="M-6,${-54 + lo} q6,-6 12,0"/><path d="M12,${-38 + lo} q6,-6 12,0"/><path d="M-26,${-30 + lo} q6,-6 12,0"/></g>`;
  const sleep = d.pose === 'sleep';
  const eye = sleep ? `<path d="M7,-3 q5,4 10,0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>` : `<g class="eyes" style="${dl(5)}"><circle cx="13" cy="-3" r="4.4" fill="#fff"/><circle cx="14.2" cy="-3" r="2.5" fill="${OL}"/></g>`;
  const hy = sleep ? -30 + lo + 10 : -44 + lo;
  const head = `<g transform="translate(38,${hy}) scale(${d.head})"><g class="${d.pose === 'graze' ? 'graze' : ''}" style="${dl(8)}"><ellipse cx="-3" cy="-5" rx="12" ry="5.4" transform="rotate(-32 -3 -5)" fill="${ink}" stroke="${OL}" stroke-width="2.6"/><ellipse cx="10" cy="4" rx="13.5" ry="17" transform="rotate(${sleep ? -60 : -28} 10 4)" fill="${ink}" stroke="${OL}" stroke-width="2.8"/>${eye}${blob([[2, -12, 7.5], [10, -14, 6.5]], d.wool, 2.6)}<ellipse cx="22" cy="14" rx="2.6" ry="1.8" fill="#2a1d1d" opacity=".55"/></g></g>`;
  const zz = sleep ? `<g transform="translate(46,${-70 + lo})"><text class="zzz" style="${dl(3)}" font-size="22" font-weight="800" fill="#ffffff">z</text></g>` : '';
  const hit = d.k ? `<ellipse class="hit" cx="4" cy="${-34 + lo / 2}" rx="62" ry="46" fill="#000" fill-opacity="0"/>` : '';
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${d.flip ? -d.s : d.s},${d.s})"${d.k ? ` data-k="${d.k}"` : ''}><g class="act"><g class="${d.cls}" style="${dl(3)}">${legs}${body}${head}${zz}${hit}</g></g></g>`;
}
function lion(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: 'lion', lamb: true, face: 'sneaky', mane: true, cls: 'breath' }, o);
  const gold = d.gold || '#e3a33c', mane = d.mane ? '#b7601f' : (d.gold || '#e3a33c'), light = '#f5d38f';
  let s = '';
  s += `<path d="M-60,-58 C-82,-62 -88,-88 -100,-96" stroke="${OL}" stroke-width="${8 + 2 * SW}" fill="none" stroke-linecap="round"/><path d="M-60,-58 C-82,-62 -88,-88 -100,-96" stroke="${gold}" stroke-width="8" fill="none" stroke-linecap="round"/>${blob([[-102, -100, 10], [-96, -106, 8]], mane)}`;
  for (const [x, i] of [[-44, 0], [-26, 1], [30, 2], [48, 3]]) s += limb(x, -40, x + (i % 2 ? 4 : -4), -6, 15, i % 2 ? gold : '#d69432');
  s += `<ellipse cx="0" cy="-56" rx="66" ry="31" fill="${gold}" stroke="${OL}" stroke-width="${SW}"/><ellipse cx="4" cy="-44" rx="48" ry="14" fill="${light}" opacity=".55"/>`;
  const mc = [];
  for (let a = 0; a < 360; a += 30) { const t = a * Math.PI / 180; mc.push([60 + Math.cos(t) * 31, -82 + Math.sin(t) * 31, 15]); }
  s += `<g data-p="head">${d.mane ? blob(mc, mane) : `<circle cx="44" cy="-104" r="9" fill="${gold}" stroke="${OL}" stroke-width="2.6"/><circle cx="74" cy="-106" r="9" fill="${gold}" stroke="${OL}" stroke-width="2.6"/>`}<circle cx="60" cy="-82" r="27" fill="${gold}" stroke="${OL}" stroke-width="${SW}"/><circle cx="49" cy="-104" r="7" fill="${gold}" stroke="${OL}" stroke-width="2.4"/>`;
  s += `<ellipse cx="78" cy="-72" rx="16" ry="12" fill="${light}" stroke="${OL}" stroke-width="2.6"/><path d="M84,-82 L94,-80 Q92,-72 87,-73 Z" fill="#5a3326" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>`;
  s += d.sleep ? `<path d="M61,-89 q5,4 10,0" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/>` : `<g class="eyes" style="${dl(5)}"><ellipse cx="66" cy="-90" rx="3.6" ry="4.6" fill="${OL}"/><circle cx="67.2" cy="-91.6" r="1.4" fill="#fff"/></g>`;
  s += `<path d="M58,-99 q6,-4 13,0" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M74,-66 q6,4 12,-2" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  if (d.lamb) s += `<g transform="translate(92,-64)"><g data-k="lamb">${sheep({ x: 0, y: 34, s: .5, flip: true, cls: 'wiggle', face: '#f1d2bb' })}</g></g>`;
  s += `</g>`;
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${d.flip ? -d.s : d.s},${d.s})" data-k="${d.k}"><g class="act"><g class="${d.cls}" style="${dl(4)}">${s}</g></g></g>`;
}
function bearPeek(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, k: 'bear' }, o);
  const fur = '#8a5a3c', lt = '#c9a07a';
  let s = '';
  for (const sx of [-1, 1]) s += `<circle cx="${sx * 25}" cy="-60" r="13" fill="${fur}" stroke="${OL}" stroke-width="${SW}"/><circle cx="${sx * 25}" cy="-60" r="6" fill="${lt}"/>`;
  s += `<circle cx="0" cy="-36" r="36" fill="${fur}" stroke="${OL}" stroke-width="${SW}"/><ellipse cx="0" cy="-22" rx="17" ry="13" fill="${lt}" stroke="${OL}" stroke-width="2.4"/><ellipse cx="0" cy="-29" rx="7" ry="5" fill="#2e1d18"/><path d="M-6,-16 q6,5 12,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  s += `<g class="eyes" style="${dl(5)}"><ellipse cx="-13" cy="-44" rx="3.8" ry="4.8" fill="${OL}"/><ellipse cx="13" cy="-44" rx="3.8" ry="4.8" fill="${OL}"/><circle cx="-12" cy="-45.6" r="1.4" fill="#fff"/><circle cx="14" cy="-45.6" r="1.4" fill="#fff"/></g>`;
  for (const sx of [-1, 1]) s += `<g transform="translate(${sx * 34},2)"><ellipse rx="15" ry="10" fill="${fur}" stroke="${OL}" stroke-width="${SW}"/><path d="M-7,-4 l0,6 M0,-5 l0,7 M7,-4 l0,6" stroke="${OL}" stroke-width="2" opacity=".6"/></g>`;
  return `<g transform="translate(${d.x},${d.y}) scale(${d.s})" data-k="${d.k}"><g class="act"><g class="peek" style="${dl(4)}">${s}</g></g></g>`;
}

/* ---------- utilidades de pose ---------- */
// ângulo 'a' para o braço apontar para um alvo (coordenadas da cena)
function aimArm(kind, side, s, x, y, tx, ty, drop = 0) {
  const G = kind === 'adult' ? ADULT : CHILD;
  const sx = x + side * (G.shW - 4) * s, sy = y + (G.shY + 8 + drop) * s;
  const dx = tx - sx, dy = ty - sy;
  return side > 0 ? Math.atan2(dx, dy) * 180 / Math.PI : Math.atan2(-dx, dy) * 180 / Math.PI;
}
function handAt(kind, side, A, s, x, y, drop = 0) {
  const [hx, hy] = handPos(kind, side, A, drop);
  return [x + hx * s, y + hy * s];
}
ITEM.shield = (r = 30, col = '#c9934b', k = '') => `<g${k ? ` data-k="${k}"` : ''}><circle r="${r + SW}" fill="${OL}"/><circle r="${r}" fill="${col}"/><circle r="${r * .78}" fill="none" stroke="#9c6a2e" stroke-width="${r * .08}"/><circle r="${r * .22}" fill="#e3b268" stroke="${OL}" stroke-width="2.2"/><path d="M${-r * .5},${-r * .55} Q${-r * .2},${-r * .78} ${r * .15},${-r * .72}" stroke="#f0c98a" stroke-width="${r * .1}" fill="none" stroke-linecap="round"/></g>`;
function scaleArmor(kind = 'adult', col = '#c08a44', dark = '#8d5f27', k = '') {
  const G = kind === 'adult' ? ADULT : CHILD;
  const sY = G.shY - 2, w1 = G.shW + 3, y2 = G.waistY + 20, w2 = G.shW + 8;
  const p = `M${-w1},${sY + 12} Q${-w1},${sY} ${-w1 + 12},${sY} L${w1 - 12},${sY} Q${w1},${sY} ${w1},${sY + 12} L${w2},${y2} Q0,${y2 + 9} ${-w2},${y2} Z`;
  let rows = '';
  for (let y = sY + 12, row = 0; y < y2 - 2; y += 9, row++) {
    const t = (y - sY) / (y2 - sY), w = w1 + (w2 - w1) * t - 5;
    for (let x = -w + (row % 2 ? 5 : 0); x < w - 4; x += 10) rows += `<path d="M${r1(x)},${r1(y)} q5,7 10,0"/>`;
  }
  return `<g${k ? ` data-k="${k}"` : ''}>${op(p, col)}<g fill="none" stroke="${dark}" stroke-width="2" opacity=".75">${rows}</g><path d="M${-w1 + 6},${sY + 8} Q${-w1 + 4},${sY + 40} ${-w1 + 10},${sY + 60}" stroke="#e6b773" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
}

/* =====================================================================
   CENÁRIOS E PEÇAS COMPARTILHADOS ENTRE OS LIVROS
   ===================================================================== */
const hitC = (x, y, r) => `<circle class="hit" cx="${x}" cy="${y}" r="${r}" fill="#000" fill-opacity="0"/>`;

function bgDay(o = {}) {
  let s = sky('sky', o.sky || [[0, '#86cbef'], [.5, '#cdeefa'], [.62, '#effaf0'], [1, '#effaf0']]);
  if (o.sun !== false) s += sun(o.sunX ?? 655, o.sunY ?? 155, o.sunR ?? 46, { face: o.face ?? true });
  if (o.clouds !== false) s += cloud(170, 170, 1) + cloud(440, 120, .78, { dx: -30, d: 21 }) + cloud(730, 265, .6, { d: 13 });
  return s;
}

function campfire(x, y, s = 1) {
  const sparks = [-14, 6, 18, -4].map((dx, i) => `<circle class="rise" style="--d:${1.8 + i * .4}s;--dx:${dx}px;${dl(3)}" cx="${dx / 2}" cy="-40" r="2.6" fill="#ffd27a"/>`).join('');
  const fl = (sc, col) => `<path transform="scale(${sc})" d="M0,-74 C18,-44 32,-22 23,-4 C14,10 -14,10 -23,-4 C-32,-22 -14,-44 0,-74 Z" fill="${col}"/>`;
  return `<defs>${rg('fireglow', [[0, '#ffb24a', .7], [.45, '#ff8f2e', .22], [1, '#ff7a1a', 0]])}</defs><g transform="translate(${x},${y}) scale(${s})" data-k="fire"><ellipse cx="0" cy="-40" rx="170" ry="130" fill="${UR('fireglow')}"/>${[-34, -12, 12, 34].map(a => `<ellipse cx="${a}" cy="0" rx="12" ry="8" fill="#8e8a96" stroke="${OL}" stroke-width="2.4"/>`).join('')}${limb(-34, -6, 28, -16, 12, '#7a4a2a')}${limb(-28, -16, 34, -6, 12, '#8a5530')}<g transform="translate(0,-12)"><g class="flicker">${fl(1, '#ff7a26')}${fl(.72, '#ffb238')}${fl(.42, '#fff1a8')}</g></g>${sparks}</g>`;
}

function grassBand(seed, y0, y1, n = 16, cols = ['#5f9440', '#6ea64a']) {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) s += tuft(r1(R() * 800), r1(y0 + R() * (y1 - y0)), .8 + R() * .6, cols[i % cols.length]);
  return s;
}

function flowerBand(seed, y0, y1, n = 8, cols = ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a']) {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) s += flower(r1(40 + R() * 720), r1(y0 + R() * (y1 - y0)), .8 + R() * .5, cols[i % cols.length]);
  return s;
}

function column(x, top = 150, bot = 560, w = 52) {
  const flutes = [-.3, 0, .3].map(f => `<path d="M${x + f * w},${top + 30} L${x + f * w},${bot - 22}" stroke="#d9c49c" stroke-width="3"/>`).join('');
  return `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${bot - top}" fill="#f5e7c8" stroke="${OL}" stroke-width="2.6"/><rect x="${x + w * .12}" y="${top}" width="${w * .38}" height="${bot - top}" fill="#e4cfa4" opacity=".7"/>${flutes}<rect x="${x - w * .72}" y="${top - 18}" width="${w * 1.44}" height="22" rx="4" fill="#f0dcb4" stroke="${OL}" stroke-width="2.6"/><circle cx="${x - w * .62}" cy="${top - 2}" r="9" fill="#f0dcb4" stroke="${OL}" stroke-width="2.4"/><circle cx="${x + w * .62}" cy="${top - 2}" r="9" fill="#f0dcb4" stroke="${OL}" stroke-width="2.4"/><rect x="${x - w * .66}" y="${bot - 14}" width="${w * 1.32}" height="18" rx="3" fill="#f0dcb4" stroke="${OL}" stroke-width="2.6"/>`;
}

function lampStand(x, y, h = 150) {
  return `<g transform="translate(${x},${y})">${limb(0, 0, 0, -h, 6, '#c9933c')}<path d="M-18,${-h} Q0,${-h + 18} 18,${-h} Z" fill="#d9a33a" stroke="${OL}" stroke-width="2.4"/><g transform="translate(0,${-h - 2})"><g class="flicker"><path d="M0,-30 C8,-18 11,-8 7,-2 C3,4 -3,4 -7,-2 C-11,-8 -8,-18 0,-30 Z" fill="#ffb238"/><path d="M0,-18 C4,-11 5,-6 3,-3 C1,0 -1,0 -3,-3 C-5,-6 -4,-11 0,-18 Z" fill="#fff1a8"/></g></g><circle cx="0" cy="${-h - 12}" r="38" fill="#ffd27a" opacity=".16"/></g>`;
}

function stormCloud(x, y, s = 1, k = 'storm') {
  const c = [[-50, 6, 30], [-18, -16, 38], [24, -10, 34], [56, 8, 26], [0, 14, 30]];
  const rain = [-40, -16, 8, 32, 52].map((dx, i) => `<path class="rain" style="${dl(1)}" d="M${dx},40 l-5,16" stroke="#7fb1e0" stroke-width="4" stroke-linecap="round"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><g data-k="${k}"><g class="storm">${rain}${blob(c, '#757a92', 3)}${blob([[-22, -22, 18], [16, -18, 16]], '#8d92a8', 0)}<path d="M-12,4 q6,-6 12,0 M8,4 q6,-6 12,0" stroke="#4a4d60" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-6,22 q10,-8 20,0" stroke="#4a4d60" stroke-width="3" fill="none" stroke-linecap="round"/></g></g></g>`;
}

/* ---------- a Ovelhinha, mascote do app (vista de frente) ---------- */
function mascot(o = {}) {
  const face = o.face || '#f6dac6', wool = o.wool || '#fffdf7', pink = '#f4a2a6', sw = o.sw ?? 5;
  const ear = s => `<g transform="translate(${s * 64},-2) rotate(${s * 24})"><ellipse rx="34" ry="16" fill="${face}" stroke="${OL}" stroke-width="${sw}"/><ellipse cx="${s * 5}" cy="1" rx="20" ry="8" fill="${pink}"/></g>`;
  let g = '';
  if (o.body) g += blob([[-74, 104, 40], [-34, 122, 46], [14, 124, 46], [58, 108, 40], [86, 80, 28], [-90, 80, 28], [-12, 90, 52], [30, 88, 46]], wool, sw);
  g += `<g class="ears">${ear(-1)}${ear(1)}</g>`;
  g += `<path d="M-58,8 C-60,-38 -30,-56 0,-56 C30,-56 60,-38 58,8 C56,52 30,74 0,74 C-30,74 -56,52 -58,8 Z" fill="${face}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  g += blob([[-46, -46, 25], [-18, -64, 29], [16, -66, 29], [44, -48, 25], [0, -42, 28], [-60, -24, 15], [60, -24, 15], [-30, -32, 18], [30, -32, 18]], wool, sw);
  g += `<g fill="none" stroke="#e9dcc6" stroke-width="4.5" stroke-linecap="round"><path d="M-40,-54 q8,-8 16,0"/><path d="M2,-72 q8,-8 16,0"/><path d="M28,-46 q8,-8 16,0"/><path d="M-16,-40 q7,-7 14,0"/></g>`;
  g += `<g class="eyes"><ellipse cx="-22" cy="12" rx="11.5" ry="14.5" fill="${OL}"/><ellipse cx="22" cy="12" rx="11.5" ry="14.5" fill="${OL}"/><circle cx="-17.5" cy="6" r="4.8" fill="#fff"/><circle cx="26.5" cy="6" r="4.8" fill="#fff"/><circle cx="-25" cy="18.5" r="2.1" fill="#fff"/><circle cx="19" cy="18.5" r="2.1" fill="#fff"/></g>`;
  g += `<ellipse cx="-39" cy="36" rx="11" ry="7" fill="#f28c8f" opacity=".55"/><ellipse cx="39" cy="36" rx="11" ry="7" fill="#f28c8f" opacity=".55"/>`;
  g += `<path d="M-8.5,33 Q0,29 8.5,33 Q5,41 0,41.5 Q-5,41 -8.5,33 Z" fill="${pink}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  g += `<path d="M0,41.5 L0,47 M-10.5,49 Q-5.5,55 0,48.5 Q5.5,55 10.5,49" fill="none" stroke="${OL}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g class="mascot-art">${g}</g>`;
}

/* =====================================================================
   BICHOS (vista de lado, olhando para a direita; y = chão)
   ===================================================================== */
function critter(d, g, hit) {
  const h = hit && d.k ? `<ellipse class="hit" cx="${hit[0]}" cy="${hit[1]}" rx="${hit[2]}" ry="${hit[3]}" fill="#000" fill-opacity="0"/>` : '';
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${d.flip ? -d.s : d.s},${d.s})"${d.k ? ` data-k="${d.k}"` : ''}><g class="act"><g class="${d.cls}" style="${dl(4)}">${g}${h}</g></g></g>`;
}
const eyeDot = (x, y, r = 4.4) => `<g class="eyes" style="${dl(5)}"><ellipse cx="${x}" cy="${y}" rx="${r1(r * .82)}" ry="${r}" fill="${OL}"/><circle cx="${r1(x + r * .32)}" cy="${r1(y - r * .38)}" r="${r1(r * .34)}" fill="#fff"/></g>`;

function elephant(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath', col: '#a9aab9', dark: '#8d8ea2' }, o);
  const c = d.col, cd = d.dark, pink = '#eab0ba';
  let g = '';
  g += limb(-50, -54, -52, -8, 25, cd) + limb(42, -54, 44, -8, 25, cd);
  g += `<path d="M-94,-92 C-106,-80 -110,-62 -107,-48" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-94,-92 C-106,-80 -110,-62 -107,-48" stroke="${c}" stroke-width="3.6" fill="none" stroke-linecap="round"/>${blob([[-107, -46, 6]], OL, 0)}`;
  g += `<ellipse cx="-8" cy="-88" rx="92" ry="58" fill="${c}" stroke="${OL}" stroke-width="${SW}"/>`;
  g += `<path d="M-60,-124 Q-10,-142 40,-126" stroke="#c4c5d2" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>`;
  g += limb(-72, -48, -74, -8, 27, c) + limb(20, -48, 22, -8, 27, c);
  for (const fx of [-74, 22]) g += `<path d="M${fx - 9},-8 l3,-5 M${fx},-8 l0,-6 M${fx + 9},-8 l-3,-5" stroke="#eceaf2" stroke-width="3" stroke-linecap="round"/>`;
  let h = `<circle cx="76" cy="-104" r="43" fill="${c}" stroke="${OL}" stroke-width="${SW}"/>`;
  h += stroke2('M108,-88 C126,-70 128,-40 120,-22 C116,-10 128,-2 138,-12', 19, c);
  h += `<path d="M98,-76 q10,8 2,18" stroke="#fffaf0" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M98,-76 q10,8 2,18" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>`;
  h += `<path d="M58,-142 C22,-150 2,-112 12,-80 C20,-54 54,-52 66,-72 C74,-88 72,-124 58,-142 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M52,-130 C30,-134 18,-108 24,-86 C30,-70 50,-70 58,-82 C62,-96 60,-118 52,-130 Z" fill="${pink}" opacity=".75"/>`;
  h += d.sleep ? `<path d="M85,-113 q7,6 14,0" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>` : eyeDot(92, -114, 5);
  h += `<ellipse cx="102" cy="-98" rx="7" ry="4.5" fill="#ef7d78" opacity=".4"/>`;
  g += `<g data-p="head">${h}</g>`;
  return critter(d, g, [10, -80, 120, 70]);
}
function giraffe(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath' }, o);
  const c = '#f3c45c', sp = '#c47a35', cd = '#e2ad45';
  let g = '';
  g += limb(-34, -118, -36, -8, 12, cd) + limb(36, -118, 40, -8, 12, cd);
  g += `<path d="M-62,-136 C-74,-122 -78,-104 -76,-92" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-62,-136 C-74,-122 -78,-104 -76,-92" stroke="${c}" stroke-width="3" fill="none"/>${blob([[-76, -88, 6]], '#5a3a26', 2.4)}`;
  g += `<path d="M-64,-136 C-66,-164 -30,-172 6,-170 C40,-168 66,-160 66,-134 C66,-112 40,-104 2,-104 C-34,-104 -62,-112 -64,-136 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  g += `<path d="M30,-156 C46,-196 66,-248 76,-292 L102,-286 C94,-246 74,-190 60,-142 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  g += `<path d="M80,-288 C68,-240 50,-196 36,-160" stroke="#9a5a2a" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="9 7"/>`;
  const spots = [[-40, -146, 13, 9], [-14, -156, 11, 8], [14, -150, 12, 9], [40, -140, 10, 8], [-30, -122, 10, 7], [0, -124, 12, 8], [28, -120, 9, 7], [-52, -128, 7, 6], [60, -184, 8, 7], [70, -220, 7, 7], [84, -256, 6, 6], [50, -160, 7, 6]];
  g += `<g fill="${sp}" opacity=".9">${spots.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${(x * 7) % 40 - 20} ${x} ${y})"/>`).join('')}</g>`;
  g += limb(-48, -114, -50, -8, 13, c) + limb(22, -114, 24, -8, 13, c);
  for (const fx of [-50, 24, -36, 40]) g += `<rect x="${fx - 7}" y="-14" width="14" height="10" rx="3" fill="#5a3a26" stroke="${OL}" stroke-width="2.4"/>`;
  let h = '';
  h += `<path d="M84,-300 l-6,-24 M98,-298 l2,-24" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M84,-300 l-6,-24 M98,-298 l2,-24" stroke="#b8732e" stroke-width="3.5" stroke-linecap="round"/><circle cx="78" cy="-326" r="5.5" fill="#7a4a2a" stroke="${OL}" stroke-width="2.4"/><circle cx="100" cy="-324" r="5.5" fill="#7a4a2a" stroke="${OL}" stroke-width="2.4"/>`;
  h += `<ellipse cx="70" cy="-300" rx="12" ry="6" transform="rotate(-30 70 -300)" fill="${c}" stroke="${OL}" stroke-width="2.6"/>`;
  h += `<path d="M76,-308 C96,-318 124,-304 128,-288 C132,-276 120,-268 104,-270 C90,-272 76,-284 76,-308 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  h += `<ellipse cx="118" cy="-280" rx="11" ry="9" fill="#e9b778"/><circle cx="122" cy="-283" r="2" fill="${OL}"/>`;
  h += eyeDot(98, -296, 4.6);
  g += `<g data-p="head">${h}</g>`;
  return critter(d, g, [30, -180, 90, 150]);
}
function rabbit(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath', col: '#f4efe6', dark: '#d9cfc2' }, o);
  const c = d.col;
  let g = '';
  g += `<g data-p="ears"><ellipse cx="20" cy="-70" rx="7" ry="21" transform="rotate(-12 20 -70)" fill="${c}" stroke="${OL}" stroke-width="2.8"/><ellipse cx="20" cy="-70" rx="3.2" ry="14" transform="rotate(-12 20 -70)" fill="#f3a5ab"/><ellipse cx="33" cy="-68" rx="7" ry="21" transform="rotate(14 33 -68)" fill="${c}" stroke="${OL}" stroke-width="2.8"/><ellipse cx="33" cy="-68" rx="3.2" ry="14" transform="rotate(14 33 -68)" fill="#f3a5ab"/></g>`;
  g += blob([[-6, -24, 23], [12, -30, 17], [-24, -20, 10]], c, 2.8);
  g += blob([[-30, -24, 9]], '#ffffff', 2.6);
  g += blob([[26, -44, 16]], c, 2.8);
  g += `<ellipse cx="8" cy="-4" rx="11" ry="5" fill="${d.dark}" stroke="${OL}" stroke-width="2.4"/><ellipse cx="-16" cy="-4" rx="12" ry="5" fill="${d.dark}" stroke="${OL}" stroke-width="2.4"/>`;
  g += eyeDot(30, -47, 3.8);
  g += `<circle cx="41" cy="-40" r="3" fill="#ef8a92"/><ellipse cx="32" cy="-36" rx="5" ry="3" fill="#ef7d78" opacity=".4"/>`;
  return critter(d, g, [6, -36, 40, 40]);
}
function turtle(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: '', col: '#5f9a48' }, o);
  let g = '';
  for (const [lx] of [[-26], [22]]) g += `<ellipse cx="${lx}" cy="-6" rx="10" ry="7" fill="#9cc26a" stroke="${OL}" stroke-width="2.6"/>`;
  g += `<path d="M-46,-12 L-58,-8 L-46,-4 Z" fill="#9cc26a" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>`;
  g += `<g data-p="head"><path d="M34,-20 C40,-34 62,-36 66,-22 C68,-12 58,-8 48,-10 C40,-11 34,-14 34,-20 Z" fill="#9cc26a" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>${eyeDot(55, -24, 3.6)}<path d="M58,-15 q4,2 7,-1" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
  g += `<path d="M-46,-10 C-46,-44 -22,-52 0,-52 C22,-52 46,-44 46,-10 Z" fill="${d.col}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  g += `<g fill="none" stroke="#3f7a32" stroke-width="2.8" stroke-linejoin="round"><path d="M-12,-44 L12,-44 L20,-28 L12,-14 L-12,-14 L-20,-28 Z"/><path d="M-20,-28 L-40,-26 M20,-28 L40,-26 M-12,-44 L-18,-50 M12,-44 L18,-50"/></g>`;
  g += `<rect x="-50" y="-14" width="100" height="8" rx="4" fill="#c9a54e" stroke="${OL}" stroke-width="2.6"/>`;
  return critter(d, g, [6, -24, 64, 34]);
}
// cavalo, jumento ou zebra
function equine(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath', kind: 'donkey', pack: '' }, o);
  const zebra = d.kind === 'zebra', donkey = d.kind === 'donkey';
  const c = zebra ? '#fbfaf6' : donkey ? '#a39b93' : '#b57744', cd = zebra ? '#e6e3dc' : donkey ? '#8a827a' : '#9a6236', muzzle = zebra ? '#4a4248' : donkey ? '#e3ddd3' : '#e7c9a4';
  let g = '';
  g += limb(-42, -74, -44, -8, 13, cd) + limb(44, -74, 46, -8, 13, cd);
  g += `<path d="M-70,-96 C-84,-84 -88,-66 -86,-52" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-70,-96 C-84,-84 -88,-66 -86,-52" stroke="${c}" stroke-width="3" fill="none"/>${blob([[-86, -50, 7]], zebra || donkey ? OL : '#5a3420', zebra || donkey ? 0 : 2.4)}`;
  const body = 'M-72,-98 C-74,-126 -40,-132 0,-130 C40,-128 70,-122 72,-96 C74,-72 44,-62 0,-62 C-40,-62 -70,-70 -72,-98 Z';
  g += `<path d="${body}" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  const neck = 'M38,-120 C52,-136 66,-158 78,-176 L104,-160 C92,-140 80,-116 66,-94 Z';
  g += `<path d="${neck}" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if (zebra) {
    g += `<g stroke="#2e2830" stroke-width="7" stroke-linecap="round" fill="none"><path d="M-50,-126 q-6,24 2,52"/><path d="M-26,-130 q-6,28 0,64"/><path d="M-2,-130 q-5,30 0,66"/><path d="M22,-129 q-4,26 2,60"/><path d="M46,-124 q-2,20 4,40"/><path d="M58,-140 l22,14"/><path d="M68,-156 l22,12"/></g>`;
  }
  if (d.pack) g += `<path d="M-30,-132 C-34,-150 26,-152 22,-132 L26,-100 C8,-92 -14,-92 -34,-100 Z" fill="${d.pack}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-32,-112 L24,-112" stroke="#f2c14e" stroke-width="5"/>`;
  g += limb(-56, -70, -58, -8, 14, c) + limb(28, -70, 30, -8, 14, c);
  if (zebra) g += `<g stroke="#2e2830" stroke-width="5" stroke-linecap="round"><path d="M-64,-40 l12,0 M-64,-26 l12,0 M22,-40 l14,0 M22,-26 l14,0"/></g>`;
  for (const fx of [-58, 30, -44, 46]) g += `<rect x="${fx - 7}" y="-14" width="14" height="10" rx="3" fill="#4a3226" stroke="${OL}" stroke-width="2.4"/>`;
  let h = '';
  const mane = zebra ? '#2e2830' : donkey ? '#5a524c' : '#5a3420';
  h += `<path d="M74,-188 C62,-168 50,-146 36,-124" stroke="${OL}" stroke-width="${zebra ? 15 : 12}" stroke-linecap="round" fill="none"/><path d="M74,-188 C62,-168 50,-146 36,-124" stroke="${mane}" stroke-width="${zebra ? 9 : 6}" stroke-linecap="round" fill="none"${zebra ? ' stroke-dasharray="6 5"' : ''}/>`;
  if (donkey) h += `<ellipse cx="76" cy="-214" rx="7.5" ry="24" transform="rotate(-18 76 -214)" fill="${c}" stroke="${OL}" stroke-width="2.8"/><ellipse cx="76" cy="-214" rx="3.4" ry="16" transform="rotate(-18 76 -214)" fill="#d9a7a0"/><ellipse cx="92" cy="-214" rx="7.5" ry="24" transform="rotate(14 92 -214)" fill="${c}" stroke="${OL}" stroke-width="2.8"/>`;
  else h += `<ellipse cx="80" cy="-196" rx="6" ry="13" transform="rotate(-10 80 -196)" fill="${c}" stroke="${OL}" stroke-width="2.6"/>`;
  h += `<path d="M70,-186 C82,-200 106,-196 120,-176 C132,-158 136,-142 128,-134 C118,-124 100,-132 90,-146 C82,-158 66,-168 70,-186 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if (zebra) h += `<g stroke="#2e2830" stroke-width="5" stroke-linecap="round"><path d="M86,-182 l10,-10 M98,-172 l12,-8"/></g>`;
  h += `<path d="M114,-150 C120,-146 130,-142 132,-136 C130,-128 118,-126 110,-134 Z" fill="${muzzle}"/><circle cx="124" cy="-140" r="2.2" fill="${OL}"/>`;
  h += eyeDot(98, -176, 4.4);
  g += `<g data-p="head">${h}</g>`;
  return critter(d, g, [16, -110, 110, 100]);
}
function cow(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath' }, o);
  const c = '#f6efe3', spot = '#7a5240';
  let g = '';
  g += limb(-48, -62, -50, -8, 15, '#e3dace') + limb(42, -62, 44, -8, 15, '#e3dace');
  g += `<path d="M-78,-92 C-90,-80 -94,-62 -92,-48" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-78,-92 C-90,-80 -94,-62 -92,-48" stroke="${c}" stroke-width="3" fill="none"/>${blob([[-92, -46, 6]], spot, 2.4)}`;
  g += `<path d="M-80,-94 C-80,-128 -40,-134 0,-132 C44,-130 76,-122 78,-92 C80,-64 46,-54 0,-54 C-44,-54 -80,-62 -80,-94 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  g += `<g fill="${spot}"><path d="M-46,-128 C-24,-128 -18,-106 -34,-96 C-50,-88 -66,-104 -62,-118 Z"/><path d="M14,-130 C34,-124 36,-102 22,-98 C8,-96 0,-112 4,-124 Z"/><path d="M-12,-80 C2,-80 6,-66 -6,-62 C-18,-60 -24,-74 -12,-80 Z"/></g>`;
  g += `<ellipse cx="-4" cy="-56" rx="14" ry="7" fill="#f3b2b6" stroke="${OL}" stroke-width="2.2"/>`;
  g += limb(-64, -58, -66, -8, 16, c) + limb(26, -58, 28, -8, 16, c);
  for (const fx of [-66, 28, -50, 44]) g += `<rect x="${fx - 8}" y="-14" width="16" height="10" rx="3" fill="#4a3226" stroke="${OL}" stroke-width="2.4"/>`;
  let h = '';
  h += `<path d="M70,-134 C62,-150 66,-160 74,-162 M104,-134 C112,-150 108,-160 100,-162" stroke="${OL}" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M70,-134 C62,-150 66,-160 74,-162 M104,-134 C112,-150 108,-160 100,-162" stroke="#e8dcc2" stroke-width="4.5" stroke-linecap="round" fill="none"/>`;
  h += `<ellipse cx="58" cy="-122" rx="14" ry="7" transform="rotate(-20 58 -122)" fill="${c}" stroke="${OL}" stroke-width="2.6"/><ellipse cx="116" cy="-122" rx="14" ry="7" transform="rotate(20 116 -122)" fill="${c}" stroke="${OL}" stroke-width="2.6"/>`;
  h += `<path d="M66,-132 C70,-146 104,-146 108,-132 C112,-112 112,-96 104,-86 L70,-86 C62,-96 62,-112 66,-132 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  h += `<path d="M62,-96 C62,-80 112,-80 112,-96 C112,-108 62,-108 62,-96 Z" fill="#f3b2b6" stroke="${OL}" stroke-width="2.8"/><ellipse cx="77" cy="-95" rx="3.4" ry="4.4" fill="${OL}"/><ellipse cx="97" cy="-95" rx="3.4" ry="4.4" fill="${OL}"/>`;
  h += eyeDot(76, -120, 4.4) + eyeDot(98, -120, 4.4);
  g += `<g data-p="head">${h}</g>`;
  return critter(d, g, [16, -96, 104, 70]);
}
function camel(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath', saddle: '#b6312f' }, o);
  const c = '#d9a862', cd = '#c18f4c';
  let g = '';
  g += limb(-40, -96, -44, -8, 13, cd) + limb(44, -96, 48, -8, 13, cd);
  g += `<path d="M-70,-118 C-82,-104 -84,-90 -82,-80" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-70,-118 C-82,-104 -84,-90 -82,-80" stroke="${c}" stroke-width="3" fill="none"/>`;
  g += `<path d="M-72,-118 C-76,-150 -50,-166 -28,-182 C-12,-196 12,-196 24,-180 C36,-164 66,-156 70,-124 C72,-96 44,-88 0,-88 C-40,-88 -70,-94 -72,-118 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if (d.saddle) g += `<path d="M-40,-150 C-30,-176 30,-176 40,-150 L36,-116 C12,-108 -14,-108 -38,-116 Z" fill="${d.saddle}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-38,-128 L36,-128" stroke="#f2c14e" stroke-width="5"/><g fill="#f2c14e">${[-30, -10, 10, 30].map(x => `<circle cx="${x}" cy="-112" r="4" stroke="${OL}" stroke-width="1.6"/>`).join('')}</g>`;
  g += `<path d="M48,-136 C70,-140 84,-170 88,-200 L110,-196 C106,-160 92,-122 64,-104 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  g += limb(-56, -92, -60, -8, 14, c) + limb(28, -92, 32, -8, 14, c);
  for (const fx of [-60, 32, -44, 48]) g += `<ellipse cx="${fx}" cy="-8" rx="10" ry="6" fill="${cd}" stroke="${OL}" stroke-width="2.4"/>`;
  let h = `<ellipse cx="92" cy="-214" rx="5" ry="9" fill="${c}" stroke="${OL}" stroke-width="2.4"/>`;
  h += `<path d="M86,-210 C96,-226 124,-224 134,-206 C142,-192 138,-180 126,-178 C112,-176 96,-184 88,-194 Z" fill="${c}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  h += `<path d="M128,-186 q6,4 4,10" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="130" cy="-196" rx="2" ry="3" fill="${OL}"/>`;
  h += eyeDot(108, -206, 4.2) + `<path d="M102,-214 q6,-4 12,0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  g += `<g data-p="head">${h}</g>`;
  return critter(d, g, [20, -130, 110, 110]);
}
// pássaro: pomba branca (com folha de oliveira opcional) ou passarinho colorido
function dove(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: '', col: '#fbfbf8', wing: '#e6e8ef', beak: '#f0a43a', leaf: false, flying: true }, o);
  let g = '';
  if (d.flying) g += `<g transform="translate(-2,-6)"><g class="flapw" style="${dl(1)}"><path d="M0,0 C-6,-22 -26,-40 -44,-42 C-34,-28 -24,-12 -14,4 Z" fill="${d.wing}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/></g></g>`;
  g += `<path d="M-30,2 L-50,-6 L-48,8 L-30,10 Z" fill="${d.wing}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`;
  g += `<ellipse cx="-2" cy="2" rx="28" ry="15" fill="${d.col}" stroke="${OL}" stroke-width="2.8"/>`;
  g += `<circle cx="24" cy="-8" r="11" fill="${d.col}" stroke="${OL}" stroke-width="2.8"/>`;
  g += `<path d="M33,-10 L44,-6 L33,-3 Z" fill="${d.beak}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>`;
  if (d.leaf) g += `<g transform="translate(42,-5) rotate(18)"><path d="M0,0 C8,-8 22,-8 30,0 C22,6 8,6 0,0 Z" fill="#7fae4a" stroke="${OL}" stroke-width="2"/><path d="M2,0 L26,0" stroke="#4f7d2f" stroke-width="1.6"/></g>`;
  g += eyeDot(27, -11, 3);
  if (d.flying) g += `<g transform="translate(4,-4)"><g class="flapw" style="${dl(1)}"><path d="M0,0 C-2,-26 14,-44 34,-50 C30,-32 22,-14 12,4 Z" fill="${d.col}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/></g></g>`;
  else g += `<path d="M-20,-4 C-6,-12 10,-8 16,4 C4,10 -10,10 -20,-4 Z" fill="${d.wing}" stroke="${OL}" stroke-width="2.4"/>`;
  return critter(d, g, d.k ? [0, -10, 40, 34] : null);
}

/* ---------- mar, chuva e arco-íris ---------- */
function waveBand(y, o = {}) {
  const amp = o.amp ?? 14, len = o.len ?? 120, x0 = -260, x1 = 1060;
  let p = `M${x0},${y}`;
  for (let x = x0; x < x1; x += len) p += ` q${len / 4},${-amp} ${len / 2},0 t${len / 2},0`;
  p += ` L${x1},${o.bottom ?? 1200} L${x0},${o.bottom ?? 1200} Z`;
  const foam = o.foam ? `<path d="${p.split(' L')[0]}" fill="none" stroke="${o.foam}" stroke-width="${o.fw ?? 5}" stroke-linecap="round" opacity=".9"/>` : '';
  return `<g class="swell" style="--dx:${o.dx ?? 60}px;--d:${o.d ?? 6}s;${dl(6)}"><path d="${p}" fill="${o.fill || '#3f9ccc'}"/>${foam}</g>`;
}
function rainSheet(o = {}) {
  const R = rng(o.seed || 3), n = o.n || 60;
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = r1(-40 + R() * 900), y = r1(-80 + R() * 880), l = 18 + R() * 16;
    s += `<path d="M${x},${y} l-6,${r1(l)}" stroke="${o.col || '#cfe6f7'}" stroke-width="${o.w || 3}" stroke-linecap="round" opacity="${(.5 + R() * .4).toFixed(2)}"/>`;
  }
  return `<g class="rainfall" style="--d:${o.d ?? .55}s">${s}<g transform="translate(0,-880)">${s}</g></g>`;
}
function rainbow(cx, cy, r, o = {}) {
  const cols = ['#e5483f', '#f28c28', '#f6cf3e', '#5fb35a', '#3f93c7', '#5a5fc2', '#9a5fc2'];
  const w = o.w ?? 18;
  return `<g transform="translate(${cx},${cy})"${o.k ? ` data-k="${o.k}"` : ''}>${cols.map((c, i) => { const rr = r - i * w; return `<path data-k="${o.k ? o.k + i : ''}" d="M${-rr},0 A${rr},${rr} 0 0 1 ${rr},0" fill="none" stroke="${c}" stroke-width="${w + .6}"${o.hidden ? ' opacity="0"' : ''}/>`; }).join('')}</g>`;
}

/* =====================================================================
   PEÇAS DOS LIVROS NOVOS (Adão e Eva, Jacó, Moisés, Bartimeu)
   ===================================================================== */
// peixinho de lado
function fishS(x, y, s = 1, col = '#f28c3a', o = {}) {
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act"><g class="${o.still ? '' : 'swim'}" style="--dx:${o.dx ?? 30}px;--d:${o.d ?? 5}s;${dl(5)}"><path d="M-22,0 C-12,-16 14,-16 24,0 C14,16 -12,16 -22,0 Z" fill="${col}" stroke="${OL}" stroke-width="2.8"/><path d="M-20,0 L-36,-12 L-34,12 Z" fill="${col}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M0,-12 Q-4,0 0,12" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>${eyeDot(12, -3, 3)}${o.k ? hitC(0, 0, 30) : ''}</g></g></g>`;
}
// serpente: o corpo segue os pontos de o.pts; a cabeça fica no último ponto, olhando para a direita
function snake(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: '', col: '#6dbb4a', dark: '#3f8a35', belly: '#e9e08a', w: 20, pts: [[-110, 0], [-70, -16], [-30, 6], [8, -8], [36, -34], [46, -64]], sly: true }, o);
  const p = smooth(d.pts);
  const [hx, hy] = d.pts[d.pts.length - 1];
  let g = `<path d="${p}" stroke="${OL}" stroke-width="${d.w + 2 * SW}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${p}" stroke="${d.col}" stroke-width="${d.w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  g += `<path d="${p}" stroke="${d.belly}" stroke-width="${r1(d.w * .28)}" fill="none" stroke-linecap="round" transform="translate(0,${r1(d.w * .22)})" opacity=".9"/>`;
  g += `<path d="${p}" stroke="${d.dark}" stroke-width="${r1(d.w * .32)}" fill="none" stroke-linecap="round" stroke-dasharray="${r1(d.w * .3)} ${r1(d.w * 1.1)}" transform="translate(0,${r1(-d.w * .16)})"/>`;
  const R = d.w * 1.05;
  let h = `<g transform="translate(${r1(hx + R * .55)},${r1(hy - R * .1)})"><g class="flick" style="${dl(3)}"><path d="M${r1(R * .9)},${r1(R * .22)} L${r1(R * 1.7)},${r1(R * .2)} L${r1(R * 2.05)},${r1(R * .02)} M${r1(R * 1.7)},${r1(R * .2)} L${r1(R * 2.05)},${r1(R * .4)}" stroke="#d9433b" stroke-width="${r1(R * .14)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  h += `<ellipse cx="0" cy="0" rx="${r1(R * 1.18)}" ry="${r1(R * .84)}" fill="${d.col}" stroke="${OL}" stroke-width="${SW}"/><path d="M${r1(-R * .6)},${r1(R * .5)} Q${r1(R * .3)},${r1(R * .78)} ${r1(R * 1.06)},${r1(R * .26)}" stroke="${d.belly}" stroke-width="${r1(R * .2)}" fill="none" stroke-linecap="round"/>`;
  h += `<path d="M${r1(R * .2)},${r1(R * .28)} Q${r1(R * .6)},${r1(R * .5)} ${r1(R * .98)},${r1(R * .2)}" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  for (const ex of [R * .05, R * .55]) {
    h += `<g class="eyes" style="${dl(5)}"><ellipse cx="${r1(ex)}" cy="${r1(-R * .42)}" rx="${r1(R * .24)}" ry="${r1(R * .28)}" fill="#fffbe8" stroke="${OL}" stroke-width="2.2"/><circle cx="${r1(ex + R * .08)}" cy="${r1(-R * .38)}" r="${r1(R * .12)}" fill="${OL}"/></g>`;
    if (d.sly) h += `<path d="M${r1(ex - R * .27)},${r1(-R * .44)} Q${r1(ex)},${r1(-R * .8)} ${r1(ex + R * .27)},${r1(-R * .44)} Z" fill="${d.col}" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>`;
  }
  g += `<g data-p="head">${h}</g></g>`;
  const hit = d.k ? hitC(r1(hx), r1(hy), R * 3) : '';
  return `<g transform="translate(${r1(d.x)},${r1(d.y)}) scale(${d.flip ? -d.s : d.s},${d.s})"${d.k ? ` data-k="${d.k}"` : ''}><g class="act"><g class="${d.cls}" style="${dl(4)}"><g>${g}${hit}</g></g></g></g>`;
}
// arbusto redondo
function shrub(x, y, s = 1, col = '#5fa046', o = {}) {
  const fl = o.flowers ? [[-40, -40], [10, -60], [44, -30], [-12, -20]].map(([a, b], i) => `<circle cx="${a}" cy="${b}" r="6" fill="${o.flowers[i % o.flowers.length]}" stroke="${OL}" stroke-width="1.8"/>`).join('') : '';
  return `<g transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${blob([[-46, -22, 30], [-10, -40, 38], [32, -34, 34], [60, -14, 24], [-62, -8, 20], [0, -14, 34]], col)}${blob([[-20, -52, 12], [24, -46, 10]], o.hi || '#7cbb5a', 0)}${fl}${o.k ? hitC(0, -26, 66) : ''}</g></g>`;
}
// árvore com frutas; o.kf dá um data-k para cada fruta (kf0, kf1, ...)
function fruitTree(x, y, s = 1, o = {}) {
  const leaf = o.leaf || '#6fae4a', dark = o.dark || '#4f8f3a', fruit = o.fruit || '#e5483f';
  const can = [[-62, -150, 46], [-30, -198, 52], [26, -202, 54], [66, -156, 46], [0, -156, 60], [-46, -116, 34], [46, -116, 36]];
  let g = op('M-15,0 C-10,-40 -18,-84 -12,-118 L12,-118 C18,-84 10,-40 15,0 Z', o.trunk || '#8b6b4b');
  g += `<path d="M-4,-70 C-20,-90 -34,-100 -46,-120 M4,-84 C18,-102 30,-110 42,-128" stroke="${OL}" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M-4,-70 C-20,-90 -34,-100 -46,-120 M4,-84 C18,-102 30,-110 42,-128" stroke="${o.trunk || '#8b6b4b'}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  let c = blob(can.map(([a, b, r]) => [a + 4, b + 8, r * .94]), dark) + blob(can, leaf, 0) + blob([[-30, -214, 18], [20, -222, 16], [-60, -166, 12]], o.hi || '#8cc464', 0);
  const fr = o.fruits || [[-56, -140], [-20, -186], [30, -170], [62, -138], [6, -128], [-34, -112], [40, -208], [-62, -186]];
  fr.forEach(([a, b], i) => {
    const f = `<circle r="${o.fr || 11}" fill="${fruit}" stroke="${OL}" stroke-width="2.4"/><path d="M-3,-${(o.fr || 11) * .5} q-3,-3 -4,-1" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".75"/><path d="M0,-${o.fr || 11} q4,-8 10,-6 q-2,6 -10,6" fill="#5f9a3a" stroke="${OL}" stroke-width="1.6"/>`;
    c += o.kf ? `<g transform="translate(${a},${b})" data-k="${o.kf}${i}"><g class="act">${f}${hitC(0, 0, 22)}</g></g>` : `<g transform="translate(${a},${b})">${f}</g>`;
  });
  g += `<g class="sway" style="--r:1.2deg;--d:6s;transform-origin:0 0;${dl(6)}">${c}</g>`;
  const glow = o.glow ? `<defs>${rg('tglow', [[0, o.glow, .95], [.55, o.glow, .45], [1, o.glow, 0]])}</defs><circle cx="0" cy="-150" r="170" fill="${UR('tglow')}"/>` : '';
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}>${glow}${g}</g>`;
}
// cabra (vista de lado, olhando para a direita)
function goat(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath', col: '#b98a5e', dark: '#8f6440', horn: '#e2d2b0', patch: '#f4ead6' }, o);
  let g = '';
  g += limb(-28, -38, -30, -6, 8, d.dark) + limb(26, -38, 28, -6, 8, d.dark);
  g += `<path d="M-42,-62 L-54,-80 L-36,-70 Z" fill="${d.col}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`;
  g += `<ellipse cx="-2" cy="-56" rx="48" ry="23" fill="${d.col}" stroke="${OL}" stroke-width="${SW}"/>`;
  if (d.patch) g += `<path d="M-20,-74 C-4,-78 10,-70 6,-58 C2,-48 -16,-48 -24,-58 C-28,-66 -26,-72 -20,-74 Z" fill="${d.patch}" opacity=".9"/>`;
  g += limb(-20, -40, -22, -6, 8.5, d.col) + limb(34, -40, 36, -6, 8.5, d.col);
  for (const fx of [-30, 28, -22, 36]) g += `<rect x="${fx - 5}" y="-10" width="10" height="7" rx="2" fill="#3a2a22" stroke="${OL}" stroke-width="1.8"/>`;
  let h = `<path d="M24,-70 C30,-86 38,-98 46,-104 L60,-92 C52,-84 46,-72 40,-56 Z" fill="${d.col}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  h += `<path d="M50,-110 C44,-128 30,-134 20,-128" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M50,-110 C44,-128 30,-134 20,-128" stroke="${d.horn}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  h += `<ellipse cx="42" cy="-98" rx="13" ry="6" transform="rotate(38 42 -98)" fill="${d.dark}" stroke="${OL}" stroke-width="2.4"/>`;
  h += `<path d="M48,-108 C62,-114 76,-102 78,-90 C80,-80 72,-76 64,-78 C56,-80 48,-90 48,-108 Z" fill="${d.col}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  h += `<path d="M66,-78 L70,-62 L60,-74 Z" fill="${d.dark}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><circle cx="76" cy="-88" r="2" fill="${OL}"/>`;
  h += eyeDot(62, -98, 3.6);
  g += `<g data-p="head">${h}</g>`;
  return critter(d, g, [12, -64, 70, 50]);
}
// sapo (vista de frente)
function frog(x, y, s = 1, k = '', col = '#7bc263') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><ellipse cx="0" cy="0" rx="40" ry="13" fill="#4f9a48" stroke="${OL}" stroke-width="2.6"/><g transform="translate(-4,-13)"><ellipse rx="21" ry="15" fill="${col}" stroke="${OL}" stroke-width="2.6"/><circle cx="-9" cy="-13" r="7.5" fill="${col}" stroke="${OL}" stroke-width="2.4"/><circle cx="9" cy="-13" r="7.5" fill="${col}" stroke="${OL}" stroke-width="2.4"/><g class="eyes" style="${dl(5)}"><circle cx="-9" cy="-13" r="3.2" fill="${OL}"/><circle cx="9" cy="-13" r="3.2" fill="${OL}"/></g><path d="M-8,2 q8,6 16,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>${k ? hitC(0, -12, 40) : ''}</g></g>`;
}
// luz de Deus vinda do céu (raios suaves)
function glory(x, y, r = 260, k = 'luz', o = {}) {
  const rays = (o.rays ?? [-34, -16, 2, 20, 38]).map(a => `<path d="M0,0 L${r1(Math.sin(a * Math.PI / 180) * 1100)},${r1(Math.cos(a * Math.PI / 180) * 1100)}" stroke="#fff3c4" stroke-width="36" opacity=".22"/>`).join('');
  return `<defs>${rg('glory', [[0, '#fff6c8', 1], [.5, '#ffe28a', .45], [1, '#ffe28a', 0]])}</defs><g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act">${rays}<circle r="${r}" fill="${UR('glory')}"/>${k ? hitC(0, 0, Math.min(r * .5, 120)) : ''}</g></g>`;
}
