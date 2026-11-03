/* =====================================================================
   LIVRO: A PÁSCOA: JESUS ESTÁ VIVO!  (Mateus 21; 26 a 28; Lucas 22 a 24; João 13; 20)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const PEDRO = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' };
const JOAO = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'short', tunic: '#5e9a43', belt: '#7b4a2a' };
const AMIGOS = [PEDRO, JOAO,
  { kind: 'adult', skin: '#d39463', hair: '#2b1d17', beard: 'short', tunic: '#c9a54e', belt: '#6b4a33' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#8e3b4f', belt: '#e9c46a' },
  { kind: 'adult', skin: '#e2a878', hair: '#5a3020', hairStyle: 'curly', hi: '#8e4b2a', tunic: '#2f8a83', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#8a7f78', beard: 'long', beardCol: '#cfc9c0', browCol: '#cfc9c0', tunic: '#7a5a8a', belt: '#e9c46a', head: 'cloth', clothCol: '#efe4cc', bandCol: '#7a5a8a' }
];
const MADALENA = { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#8e3b4f', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', longSleeves: true, belt: '#8e3b4f' };
const MAE = { kind: 'adult', skin: '#e7b58a', head: 'scarf', clothCol: '#4f86c6', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', longSleeves: true, belt: '#4f86c6' };
const MULHERES = [
  { kind: 'adult', skin: '#c98a5a', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', longSleeves: true, belt: '#b5402f' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#5e9a43', clothStripe: '#e9c46a', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', longSleeves: true, belt: '#5e9a43' }
];
const SOLDADO = { kind: 'adult', skin: '#d39463', hair: '#2b1d17', head: 'helmetG', tunic: '#b8312f', belt: '#7b4a2a', shoe: '#6b4a33' };
const ANJO = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', legs: 'none', hemY: -4, hemW: 50, trim: '#f2c14e' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' }
];
const jesus = o => person(Object.assign({}, JESUS, o));

/* ---------- peças desta história ---------- */
function wings(sc = 1) {
  const w = s => `<path transform="scale(${s},1)" d="M10,-176 C40,-210 110,-228 130,-190 C140,-172 128,-156 112,-150 C128,-140 130,-120 114,-108 C126,-96 120,-78 102,-74 C80,-70 40,-100 10,-140 Z" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path transform="scale(${s},1)" d="M40,-176 C70,-190 100,-196 112,-184 M44,-156 C76,-162 100,-162 110,-150 M48,-134 C76,-136 96,-130 104,-116" stroke="#dfe6f2" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="scale(${sc})"><g class="flapw2" style="${dl(2)}">${w(1)}</g><g class="flapw2" style="${dl(2)}">${w(-1)}</g></g>`;
}
function anjo(o) {
  return person(Object.assign({}, ANJO, { backItems: `<circle cx="0" cy="-120" r="150" fill="${UR('aglow')}"/>` + wings(1), cls: 'hover' }, o));
}
const glowDefs = () => `<defs>${rg('aglow', [[0, '#fff6c8', .95], [.55, '#ffe28a', .35], [1, '#ffe28a', 0]])}${rg('jglow', [[0, '#fffbe6', .95], [.5, '#ffe9a6', .45], [1, '#ffe9a6', 0]])}</defs>`;
const halo = (x, y, r = 170, k = '', op = 1) => `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}${op !== 1 ? ` opacity="${op}"` : ''} style="pointer-events:none"><circle r="${r}" fill="${UR('jglow')}"/></g>`;
function palmBranch(h = 100) {
  let lv = '';
  for (let i = 0; i < 7; i++) {
    const y = -18 - i * (h - 26) / 7, L = 30 - i * 2.8;
    lv += `<path d="M1,${r1(y)} q${r1(-L * .5)},-6 ${r1(-L)},${r1(L * .25)} M2,${r1(y)} q${r1(L * .5)},-6 ${r1(L)},${r1(L * .25)}"/>`;
  }
  return `<g><path d="M0,12 Q4,${r1(-h * .5)} 0,${-h}" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M0,12 Q4,${r1(-h * .5)} 0,${-h}" stroke="#4f8a3a" stroke-width="4.5" fill="none" stroke-linecap="round"/><g fill="none" stroke-linecap="round"><g stroke="${OL}" stroke-width="9">${lv}</g><g stroke="#6fae4a" stroke-width="5">${lv}</g></g></g>`;
}
function palmOnGround(x, y, rot = 0, s = 1) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${palmBranch(90)}</g>`;
}
function temple(x, y, s = 1) {
  let g = `<rect x="-120" y="-150" width="240" height="150" fill="#f4ead2" stroke="${OL}" stroke-width="4"/>`;
  g += `<rect x="-140" y="-176" width="280" height="30" rx="4" fill="#f2c14e" stroke="${OL}" stroke-width="4"/><rect x="-100" y="-196" width="200" height="22" rx="4" fill="#e9b23a" stroke="${OL}" stroke-width="3.4"/>`;
  g += [-90, -45, 45, 90].map(dx => `<rect x="${dx - 9}" y="-146" width="18" height="146" fill="#e6d6b0" stroke="${OL}" stroke-width="2.6"/>`).join('');
  g += `<path d="M-26,0 L-26,-92 Q0,-120 26,-92 L26,0 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3.4"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function jerusalem(o = {}) {
  const y0 = o.y ?? 300, h = o.h ?? 150, gx = o.gate ?? 640;
  let s = town(-10, y0 - 6, .9, { wall: '#ecd5a6', shade: '#d6b983', roof: '#d9bd88', sw: 2.4 });
  s += temple(o.tx ?? 330, y0 + 4, o.ts ?? .9);
  s += town(480, y0 - 2, .7, { wall: '#efdcb4', shade: '#d6b983', roof: '#d9bd88', sw: 2.2 });
  s += `<rect x="-40" y="${y0}" width="900" height="${h}" fill="#e2c497" stroke="${OL}" stroke-width="4"/>`;
  let br = '';
  for (let r = 0; r < Math.floor(h / 32); r++) for (let xx = -40 + (r % 2 ? 26 : 0); xx < 860; xx += 52) br += `<rect x="${xx}" y="${y0 + 6 + r * 32}" width="48" height="28" rx="3" fill="#d6b582"/>`;
  s += `<g opacity=".7">${br}</g>`;
  for (let xx = -40; xx < 860; xx += 40) s += `<rect x="${xx}" y="${y0 - 24}" width="24" height="28" fill="#e2c497" stroke="${OL}" stroke-width="3"/>`;
  s += `<rect x="${gx - 74}" y="${y0 - 50}" width="148" height="${h + 50}" fill="#ead2a6" stroke="${OL}" stroke-width="4"/><path d="M${gx - 46},${y0 + h} L${gx - 46},${y0 + h - 76} A46,46 0 0 1 ${gx + 46},${y0 + h - 76} L${gx + 46},${y0 + h} Z" fill="#5a3a26" stroke="${OL}" stroke-width="3.4"/>`;
  for (const dx of [-64, -28, 8, 44]) s += `<rect x="${gx + dx - 2}" y="${y0 - 74}" width="22" height="28" fill="#ead2a6" stroke="${OL}" stroke-width="3"/>`;
  return s;
}
function room(o = {}) {
  const fy = o.floor ?? 600;
  let s = `<defs>${lg('parede', [[0, o.w1 || '#e6d2ad'], [1, o.w2 || '#cdb38a']])}</defs><rect x="-40" y="-40" width="900" height="${fy + 40}" fill="${UR('parede')}"/>`;
  let br = '';
  for (let r = 0; r < Math.ceil(fy / 64); r++) for (let x = -40 + (r % 2 ? 40 : 0); x < 840; x += 80) br += `<rect x="${x}" y="${r * 64}" width="76" height="60" rx="6"/>`;
  s += `<g fill="none" stroke="${o.line || '#bfa47a'}" stroke-width="3" opacity=".55">${br}</g>`;
  if (o.win) {
    const [wx, wy] = o.win;
    s += `<g transform="translate(${wx},${wy})"><defs>${lg('janela', o.winSky || [[0, '#2c3570'], [1, '#e9906a']])}</defs><path d="M-70,90 L-70,-20 A70,70 0 0 1 70,-20 L70,90 Z" fill="${UR('janela')}" stroke="${OL}" stroke-width="5"/>${o.winArt || ''}<path d="M0,-90 L0,90 M-70,20 L70,20" stroke="#6b4428" stroke-width="7"/><path d="M-80,94 L80,94" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-80,94 L80,94" stroke="#c9a873" stroke-width="5" stroke-linecap="round"/></g>`;
  }
  s += `<rect x="-40" y="${fy}" width="900" height="${900 - fy}" fill="${o.floorCol || '#b98f62'}"/><path d="M-40,${fy} L840,${fy}" stroke="${OL}" stroke-width="4"/>`;
  s += `<g opacity=".35" stroke="#8a6440" stroke-width="3">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${400 + (i - 3) * 70},${fy} L${400 + (i - 3) * 190},900"/>`).join('')}</g>`;
  return s;
}
function hangLamp(x, y, k = '') {
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><path d="M0,-200 L0,-14" stroke="#6b4a33" stroke-width="3"/><circle r="70" fill="#ffd27a" opacity=".2"/><path d="M-26,-6 C-26,-22 26,-24 30,-14 L44,-18 L40,-8 C36,6 -20,10 -26,-6 Z" fill="#c97a4a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g transform="translate(40,-22)"><g class="flicker"><path d="M0,-18 C6,-10 8,-4 5,-1 C2,3 -2,3 -5,-1 C-8,-4 -6,-10 0,-18 Z" fill="#ffb238"/><path d="M0,-10 C3,-6 3,-3 2,-1 C1,0 -1,0 -2,-1 C-3,-3 -3,-6 0,-10 Z" fill="#fff1a8"/></g></g></g>`;
}
function bread(x, y, s = 1, k = '') {
  const loaf = `<path d="M-34,0 C-36,-26 36,-26 34,0 Q0,8 -34,0 Z" fill="#d9a05a" stroke="${OL}" stroke-width="3"/><path d="M-18,-14 l6,8 M0,-17 l6,8 M18,-14 l6,8" stroke="#a8703a" stroke-width="3" stroke-linecap="round"/><path d="M-24,-14 Q-10,-22 4,-20" stroke="#f2c98a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${loaf}${k ? hitC(0, -10, 44) : ''}</g></g>`;
}
function halfBread(side) {
  return `<g transform="scale(${side},1)"><path d="M0,0 L-34,0 C-36,-26 -8,-24 0,-18 L-4,-10 L2,-4 Z" fill="#d9a05a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-20,-14 l6,8" stroke="#a8703a" stroke-width="3" stroke-linecap="round"/></g>`;
}
function cup(x, y, s = 1, k = '') {
  const g = `<path d="M-22,-50 L22,-50 C22,-26 12,-16 4,-14 L4,-4 L16,0 L-16,0 L-4,-4 L-4,-14 C-12,-16 -22,-26 -22,-50 Z" fill="#e3b04a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-50" rx="22" ry="5" fill="#8e2f3f" stroke="${OL}" stroke-width="2.6"/><path d="M-14,-42 Q-12,-28 -6,-22" stroke="#fbe2a0" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -26, 40) : ''}</g></g>`;
}
function basin(x, y, s = 1, k = '') {
  const g = `<path d="M-56,-14 C-52,14 52,14 56,-14 Z" fill="#a8703a" stroke="${OL}" stroke-width="3.4"/><ellipse cx="0" cy="-14" rx="56" ry="13" fill="#7fc4e8" stroke="${OL}" stroke-width="3.4"/><path d="M-30,-16 q10,-5 20,0 M6,-12 q10,-5 20,0" stroke="#e6f6fc" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -10, 60) : ''}</g></g>`;
}
function plateFish(x, y, k = '') {
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act"><ellipse cx="0" cy="0" rx="46" ry="12" fill="#f2ead8" stroke="${OL}" stroke-width="3"/><g data-k="${k}peixe">${fishS(0, -8, .9, '#e9a05a', { still: true })}</g>${k ? hitC(0, -6, 50) : ''}</g></g>`;
}
function torch(len = 70) {
  return `<g>${limb(0, 10, 0, -len, 6, '#8a5a33', 2.6)}<g transform="translate(0,${-len - 4})"><g class="flicker"><path d="M0,-30 C10,-18 13,-8 9,-2 C5,4 -5,4 -9,-2 C-13,-8 -10,-18 0,-30 Z" fill="#ff7a26"/><path d="M0,-18 C5,-11 6,-6 4,-3 C2,0 -2,0 -4,-3 C-6,-6 -5,-11 0,-18 Z" fill="#ffd27a"/></g><circle r="40" fill="#ffb24a" opacity=".22"/></g></g>`;
}
function crosses(x, y, s = 1) {
  const c = (dx, dy, h, w) => `<g transform="translate(${dx},${dy})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="#3a2f40"/><rect x="${-h * .34}" y="${-h * .78}" width="${h * .68}" height="${w * .9}" fill="#3a2f40"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${c(-120, 26, 120, 13)}${c(120, 26, 120, 13)}<g data-k="cruz"><g class="act">${c(0, 0, 170, 17)}${hitC(0, -100, 90)}</g></g></g>`;
}
function tomb(x, y, s = 1, o = {}) {
  let g = `<path d="M-260,40 C-250,-120 -200,-260 -60,-290 C80,-310 220,-250 300,-140 L320,40 Z" fill="${o.rock || '#b9ab98'}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<path d="M60,-300 C180,-280 260,-210 300,-140 L320,40 L160,40 C200,-60 160,-200 60,-300 Z" fill="#000" opacity=".1"/>`;
  g += `<g fill="none" stroke="${o.line || '#8f8270'}" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M-200,-120 q30,-10 60,4"/><path d="M120,-200 q30,0 50,20"/><path d="M-150,-40 q20,-8 40,0"/></g>`;
  g += blob([[-250, 30, 26], [-200, 40, 22], [250, 34, 26], [300, 40, 20]], o.moss || '#6fa04a', 3);
  g += `<path d="M-90,40 L-90,-90 A90,90 0 0 1 90,-90 L90,40 Z" fill="${o.open ? '#3a2a24' : '#4a3a32'}" stroke="${OL}" stroke-width="4.6"/>`;
  if (o.light) g += `<g data-k="${o.light}" opacity="${o.lightOn ? 1 : 0}" style="pointer-events:none"><path d="M-80,40 L-80,-90 A80,80 0 0 1 80,-90 L80,40 Z" fill="${UR('jglow')}"/><g fill="#fff6c8" opacity=".6">${[-60, -20, 20, 60].map(a => `<path d="M0,-40 L${a * 4},300 L${a * 4 + 40},300 Z"/>`).join('')}</g></g>`;
  if (o.cloth) g += `<path d="M-50,26 C-40,10 30,6 52,22 L50,36 L-48,36 Z" fill="#f6efe0" stroke="${OL}" stroke-width="3"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}>${g}</g>`;
}
function stone(r = 112, k = '') {
  let g = `<circle r="${r}" fill="#9a958c" stroke="${OL}" stroke-width="5"/><circle r="${r * .8}" fill="none" stroke="#7d786f" stroke-width="5" opacity=".7"/><path d="M${-r * .5},${-r * .6} Q${-r * .1},${-r * .85} ${r * .35},${-r * .7}" stroke="#c2bdb3" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${r * .2},${r * .1} l${r * .25},${r * .2} M${-r * .4},${r * .3} l${r * .18},-${r * .1}" stroke="#6f6a61" stroke-width="4" stroke-linecap="round"/>`;
  return `<g${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, 0, r) : ''}</g></g>`;
}
function spiceJar() {
  return `<g transform="translate(0,-6)"><path d="M-10,0 C-18,-6 -18,-24 -8,-30 L-8,-38 L8,-38 L8,-30 C18,-24 18,-6 10,0 Z" fill="#c97a4a" stroke="${OL}" stroke-width="2.6"/><rect x="-10" y="-44" width="20" height="8" rx="3" fill="#e9c46a" stroke="${OL}" stroke-width="2.2"/></g>`;
}
function butterfly(x, y, s = 1, col = '#f2c14e', k = '') {
  const wing = side => `<g transform="scale(${side},1)"><path d="M0,0 C10,-26 34,-30 36,-12 C38,2 18,6 0,0 Z" fill="${col}" stroke="${OL}" stroke-width="2.4"/><path d="M0,2 C14,6 28,14 22,26 C14,34 4,20 0,2 Z" fill="${col}" stroke="${OL}" stroke-width="2.4"/><circle cx="20" cy="-12" r="4" fill="#fff" opacity=".8"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><g class="glide" style="--dx:${50}px;--dy:-24px;--d:${(6 + Math.random() * 4).toFixed(1)}s;${dl(6)}"><g class="flutter" style="${dl(1)}">${wing(1)}${wing(-1)}</g><ellipse cx="0" cy="6" rx="4" ry="14" fill="${OL}"/>${k ? hitC(0, 0, 40) : ''}</g></g></g>`;
}
function bud(x, y, s, col, k) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act" style="transform:scale(.35)">${flower(0, 0, s, col)}</g>${hitC(0, -24, 34)}</g>`;
}
function door(x, y, k = '') {
  let g = `<rect x="-70" y="-230" width="140" height="230" fill="#8a5a33" stroke="${OL}" stroke-width="5"/><g stroke="#6b4428" stroke-width="4">${[-35, 0, 35].map(dx => `<path d="M${dx},-226 L${dx},-4"/>`).join('')}</g>`;
  g += `<rect x="-86" y="-140" width="172" height="20" rx="4" fill="#5a3a26" stroke="${OL}" stroke-width="3.4"/><circle cx="46" cy="-100" r="7" fill="#e9c46a" stroke="${OL}" stroke-width="2.4"/>`;
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}>${g}</g>`;
}
function tears(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="#7fc4e8" stroke="${OL}" stroke-width="1.6">${[[-12, 0], [12, 4]].map(([a, b]) => `<path d="M${a},${b - 6} C${a + 4},${b} ${a + 4},${b + 4} ${a},${b + 6} C${a - 4},${b + 4} ${a - 4},${b} ${a},${b - 6} Z"/>`).join('')}</g>`;
}
function gardenNight(o = {}) {
  let s = sky('sky', o.sky || [[0, '#101846'], [.6, '#283276'], [1, '#3a4889']]);
  s += starField(o.seed || 77, 55, 0, 0, 800, 360, { big: .1 });
  return s;
}
const nightOlive = (x, y, s) => olive(x, y, s, { leaf: '#56785a', dark: '#3f5c46', hi: '#6a8a68', trunk: '#6b5646' });

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'A Páscoa: Jesus Está Vivo!',
  alt: 'Amanhecer num jardim florido. A grande pedra do túmulo está rolada para o lado e uma luz sai lá de dentro. Jesus, vivo, abre os braços e sorri; Maria, ajoelhada, sorri de alegria. Borboletas voam.',
  cue: [330, 860],
  art() {
    let s = sky('sky', [[0, '#8fc8ee'], [.42, '#cfe8f6'], [.64, '#ffe3b8'], [.8, '#ffd08a'], [1, '#ffd08a']], 1100) + glowDefs();
    s += sun(560, 700, 56, { face: true });
    s += cloud(150, 500, .9) + cloud(430, 580, .6, { dx: -26 });
    s += hill([[-40, 790], [180, 760], [400, 782], [620, 750], [840, 772]], '#a9cf7a');
    s += tomb(600, 960, .58, { open: true, light: 'luzT', lightOn: true, k: 'tumulo' });
    s += `<g transform="translate(722,936) rotate(28)">${stone(64)}</g>`;
    s += hill([[-40, 930], [200, 905], [420, 925], [640, 900], [840, 916]], '#8cc265');
    s += halo(330, 830, 230);
    s += jesus({ x: 330, y: 1046, s: 1.12, face: 'joy', look: .2, armL: { a: 125, b: -20 }, armR: { a: 125, b: -20 }, k: 'jesus' });
    s += person(Object.assign({}, MADALENA, { x: 130, y: 1062, s: .92, legs: 'kneel', face: 'joy', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'maria' }));
    s += flowerBand(2101, 1040, 1094, 9, ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a', '#8a5fc2']);
    s += butterfly(520, 820, .9, '#f2c14e', 'bor0') + butterfly(180, 760, .75, '#e86a9a', 'bor1');
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('tada'); api.burst(330, 800, 'spark', 12, { col: '#fff1b0' }); api.bubble(330, 760, 'Eu estou vivo!', { key: 'j' }); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('heart'); api.burst(130, 860, 'heart', 5); api.bubble(150, 820, 'Jesus está vivo!', { key: 'm' }); });
    api.tap(api.q('tumulo'), 'Túmulo vazio', () => { api.snd('chime', 'E6'); api.burst(600, 900, 'spark', 10, { col: '#fff6c8' }); api.bubble(600, 800, 'Está vazio!', { key: 't' }); });
    for (const k of ['bor0', 'bor1']) api.tap(api.q(k), 'Borboleta', () => { api.snd('twinkle'); api.hop(api.q(k), 30); });
  }
});

/* =====================================================================
   1 — HOSANA!
   ===================================================================== */
const RAMOS = [[86, 740, 1, 0], [196, 778, .86, 1], [620, 744, .98, 2], [730, 782, .86, 3]];
SCENES.push({
  key: 'chegada', title: 'Hosana!', ref: 'Mateus 21.1-11', tint: 'gold',
  text: [
    'Jesus chegou à cidade de Jerusalém montado num burrinho.',
    'O povo abanava folhas de palmeira e gritava:',
    { q: 'Hosana! Viva o Rei que vem em nome do Senhor!', who: 'outro' }
  ],
  fact: '«Hosana» quer dizer «salva-nos, por favor!»',
  hint: 'Toca nas pessoas para elas abanarem as folhas.',
  alt: 'Diante das muralhas de Jerusalém, Jesus chega montado num burrinho. O povo, dos dois lados do caminho, abana folhas de palmeira; no chão há capas coloridas e ramos.',
  cue: [196, 560],
  art() {
    let s = bgDay({ sunX: 120, sunY: 110, sunR: 38 });
    s += jerusalem({ y: 250, h: 140, gate: 640 });
    s += `<rect x="-40" y="390" width="900" height="510" fill="#e2cf9a"/><path d="M-40,620 C200,560 500,520 860,480 L860,600 C520,640 220,700 -40,780 Z" fill="#efdfb6"/>`;
    s += [[150, 716, '#b8312f'], [300, 676, '#3f7fb0'], [480, 640, '#e9c46a'], [640, 604, '#5e9a43']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="62" ry="14" fill="${c}" stroke="${OL}" stroke-width="2.6"/>`).join('');
    s += palmOnGround(250, 720, -70, .9) + palmOnGround(560, 650, -80, .8);
    s += equine({ x: 360, y: 740, s: .98, kind: 'donkey', k: 'burro' });
    s += `<g data-k="jesusB">${jesus({ x: 360, y: 692, s: .9, legs: 'none', hemY: -80, hemW: 40, face: 'smile', look: .4, armL: { a: 30, b: 40 }, armR: { a: 110, b: -40 } })}${limb(372, 616, 384, 690, 12, '#fbf6ea')}${limb(384, 672, 388, 700, 11, '#d39463')}<ellipse cx="392" cy="704" rx="12" ry="7" fill="#7a4a2a" stroke="${OL}" stroke-width="2.4"/></g>`;
    RAMOS.forEach(([x, y, sc, i]) => s += person(Object.assign({}, POVO[[0, 1, 2, 3][i]], { x, y, s: sc, face: i % 2 ? 'joy' : 'grin', look: x < 400 ? .6 : -.6, armL: { a: 20 }, armR: { a: 150, b: -10, item: palmBranch(100) }, k: 'p' + i })));
    return s;
  },
  setup(api) {
    const seen = new Set();
    RAMOS.forEach(([x, y, sc, i]) => api.tap(api.q('p' + i), 'Pessoa com folha de palmeira', async () => {
      api.wave(api.q('p' + i), 'armR');
      api.snd('chime', ['C5', 'E5', 'G5', 'C6'][i]);
      api.burst(x, y - 200 * sc, 'note', 3);
      api.bubble(x, y - 250 * sc, 'Hosana!', { key: 'p' + i, size: 28, dur: 1300 });
      seen.add(i);
      if (seen.size === RAMOS.length && !api.st.done) {
        api.st.done = true; await api.wait(900);
        api.snd('choir', ['C4', 'E4', 'G4', 'C5', 'E5']); api.burst(400, 300, 'confetti', 16);
        api.bubble(400, 300, 'Hosana! Viva o Rei!', { key: 'todos', size: 40, plain: true, dur: 2400 });
        api.nudgeNext(2200);
      }
    }));
    const go = () => { api.snd('heehaw'); api.anim(api.act(api.q('burro')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(26px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); api.anim(api.q('jesusB'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(26px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); };
    api.tap(api.q('burro'), 'Burrinho', go);
    api.tap(api.q('jesusB'), 'Jesus no burrinho', () => { api.snd('heart'); api.burst(370, 400, 'heart', 4); go(); });
  }
});

/* =====================================================================
   2 — JESUS LAVA OS PÉS
   ===================================================================== */
SCENES.push({
  key: 'pes', title: 'Jesus lava os pés', ref: 'João 13.1-15', tint: 'sand',
  text: [
    'Num jantar com os amigos, Jesus pegou numa bacia com água.',
    'E lavou os pés dos amigos, um a um! Depois disse:',
    { q: 'Façam como eu: ajudem-se uns aos outros.', who: 'jesus' }
  ],
  fact: 'Lavar os pés era trabalho de criado. Jesus quis servir os amigos!',
  hint: 'Toca na bacia de água.',
  alt: 'Numa sala de pedra, ao entardecer, Jesus está ajoelhado com uma bacia de água e lava os pés de Pedro, que está sentado, surpreendido. Outros amigos olham.',
  cue: [330, 640],
  art() {
    let s = room({ win: [640, 200], winSky: [[0, '#5a4a8a'], [.6, '#e9906a'], [1, '#f6c27a']] });
    s += hangLamp(160, 230);
    s += `<rect x="40" y="560" width="300" height="40" rx="6" fill="#9a6b3e" stroke="${OL}" stroke-width="3.6"/>`;
    s += person(Object.assign({}, AMIGOS[1], { x: 110, y: 600, s: .9, legs: 'sit', drop: 30, hemY: -62, face: 'o', look: .6, armL: { a: 20, b: 30 }, armR: { a: 20, b: 30 }, k: 'joao' }));
    s += person(Object.assign({}, PEDRO, { x: 280, y: 640, s: 1.04, legs: 'sit', drop: 30, hemY: -62, face: 'surprise', look: .6, armL: { a: 30, b: 40 }, armR: { a: 60, b: -40 }, k: 'pedro' }));
    s += basin(330, 668, 1.05, 'bacia');
    s += `<g data-k="limpos" opacity="0" style="pointer-events:none">${[[300, 630], [326, 640], [350, 626]].map(([x, y]) => `<g transform="translate(${x},${y})"><path d="${sparkle(9)}" fill="#ffffff"/></g>`).join('')}</g>`;
    s += jesus({ x: 432, y: 712, s: 1.04, flip: true, legs: 'kneel', face: 'smile', look: .7, armL: { a: 24, b: -36 }, armR: { a: 44, b: -56 }, cloak: null, k: 'jesus' });
    s += person(Object.assign({}, AMIGOS[2], { x: 640, y: 690, s: .92, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: -.6, armL: { a: 20, b: 30 }, armR: { a: 20, b: 30 }, k: 'amigo' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('bacia'), 'Bacia de água', async () => {
      api.snd('splash'); api.burst(330, 650, 'ripple', 3);
      api.anim(api.q('limpos'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 1400 });
      api.anim(api.part(api.q('jesus'), 'armR'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-14deg)' }, { transform: 'rotate(0deg)' }], { duration: 600 });
      if (!api.st.p) { api.st.p = true; api.bubble(280, 380, 'Senhor, vais lavar-me os pés?', { key: 'p', dur: 2600 }); return; }
      if (!api.st.j) { api.st.j = true; await api.wait(300); api.snd('chime', 'E6'); api.bubble(450, 400, 'Façam como eu: ajudem-se uns aos outros!', { key: 'j', dur: 3000 }); api.nudgeNext(2800); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(450, 460, 'heart', 4); api.bubble(450, 400, 'Eu amo-vos!', { key: 'j' }); });
    api.tap(api.q('pedro'), 'Pedro', () => { api.snd('hm'); api.bubble(280, 380, api.st.j ? 'Obrigado, Senhor!' : 'Os meus pés, Senhor?', { key: 'p' }); });
    for (const k of ['joao', 'amigo']) api.tap(api.q(k), 'Amigo de Jesus', () => { api.snd('hello'); api.hop(api.q(k), 10); });
  }
});

/* =====================================================================
   3 — O PÃO E O CÁLICE
   ===================================================================== */
const MESA = [[150, 626, .9, 2], [262, 612, .94, 0], [538, 612, .94, 1], [650, 626, .9, 3]];
SCENES.push({
  key: 'ceia', title: 'O pão e o cálice', ref: 'Lucas 22.14-20', tint: 'dusk',
  text: [
    'Depois, Jesus partiu o pão e deu-o aos amigos. E passou o cálice para todos beberem.',
    { q: 'Façam isto para se lembrarem de mim.', who: 'jesus' },
    'Jesus sabia que uma coisa muito triste ia acontecer.'
  ],
  fact: 'Ainda hoje, as igrejas celebram a Santa Ceia para se lembrarem de Jesus.',
  hint: 'Toca no pão e no cálice.',
  alt: 'À noite, numa sala iluminada por lamparinas, Jesus está sentado à mesa com os amigos. Na mesa há pão, um cálice, pratos e uvas.',
  cue: [356, 580],
  art() {
    let s = room({ win: [400, 170], winSky: [[0, '#141b4a'], [1, '#3a4889']], winArt: starField(5, 10, -60, -80, 60, 80, { big: .2 }), w1: '#d9c19a', w2: '#bfa47a' });
    s += hangLamp(160, 210) + hangLamp(640, 210);
    s += MESA.map(([x, y, sc, a], i) => person(Object.assign({}, AMIGOS[a], { x, y, s: sc, face: i % 2 ? 'o' : 'smile', look: (400 - x) / 300, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'a' + i }))).join('');
    s += jesus({ x: 400, y: 606, s: 1, face: 'smile', look: 0, armL: { a: 40, b: 50 }, armR: { a: 40, b: 50 }, k: 'jesus' });
    s += `<path d="M90,560 L710,560 L740,600 L60,600 Z" fill="#9a6b3e" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><rect x="60" y="598" width="680" height="110" fill="#f4ead6" stroke="${OL}" stroke-width="4"/><path d="M60,620 L740,620" stroke="#d9c6a0" stroke-width="5"/>`;
    s += [[160, 590], [260, 590], [540, 590], [640, 590]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="8" fill="#e9dcc0" stroke="${OL}" stroke-width="2.6"/>`).join('');
    s += `<g transform="translate(560,584)">${blob([[-10, -8, 8], [2, -10, 8], [-4, -18, 8], [8, -20, 7], [-14, -20, 6]], '#7a4a8a', 2.4)}</g>`;
    s += `<g transform="translate(350,588)" data-k="pao"><g class="act"><g data-k="paoInteiro">${bread(0, 0, 1)}</g><g data-k="metades" opacity="0"><g data-k="metL">${halfBread(1)}</g><g data-k="metR">${halfBread(-1)}</g></g>${hitC(0, -10, 50)}</g></g>`;
    s += cup(448, 590, 1, 'calice');
    return s;
  },
  setup(api) {
    api.tap(api.q('pao'), 'Pão', async () => {
      api.snd('crunch');
      if (!api.st.p) {
        api.st.p = true;
        api.q('paoInteiro').setAttribute('opacity', '0'); api.q('metades').setAttribute('opacity', '1');
        api.anim(api.q('metL'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-16px)' }], { duration: 500, fill: 'forwards' });
        api.anim(api.q('metR'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(16px)' }], { duration: 500, fill: 'forwards' });
      }
      api.burst(350, 560, 'spark', 6, { col: '#ffe08a' });
      api.bubble(400, 360, 'Comam e lembrem-se de mim.', { key: 'j', dur: 2400 });
      if (api.st.c && !api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
    api.tap(api.q('calice'), 'Cálice', () => {
      api.snd('chime', 'G5'); api.st.c = true;
      api.anim(api.act(api.q('calice')), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(0deg)' }], { duration: 700 });
      api.burst(448, 540, 'spark', 8, { col: '#fff1b0' });
      api.bubble(400, 360, 'Bebam todos e lembrem-se de mim.', { key: 'j', dur: 2400 });
      if (api.st.p && !api.st.n) { api.st.n = true; api.nudgeNext(2600); }
    });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 420, 'heart', 4); });
    MESA.forEach(([x, y, sc], i) => api.tap(api.q('a' + i), 'Amigo de Jesus', () => { api.snd('hm'); api.hop(api.q('a' + i), 8); api.burst(x, y - 220 * sc, 'heart', 2); }));
  }
});

/* =====================================================================
   4 — NO JARDIM, DE NOITE
   ===================================================================== */
SCENES.push({
  key: 'jardim', title: 'No jardim, de noite', ref: 'Mateus 26.36-56', tint: 'night',
  text: [
    'De noite, Jesus foi orar num jardim. Os amigos adormeceram. Zzz...',
    'Jesus orou:',
    { q: 'Pai, seja feita a tua vontade.', who: 'jesus' },
    'Depois, uns homens chegaram com tochas e levaram Jesus.'
  ],
  fact: 'O jardim chamava-se Getsêmani. Lá havia muitas oliveiras.',
  hint: 'Toca em Jesus e nos amigos a dormir.',
  alt: 'Noite num jardim de oliveiras. Jesus, ajoelhado junto a uma pedra, ora a olhar para o céu, com uma luz suave sobre ele. Os amigos dormem na relva. Ao longe, aparecem homens com tochas.',
  cue: [330, 560],
  art() {
    let s = gardenNight({ seed: 26 }) + moon(650, 120, 34) + glowDefs();
    s += hill([[-40, 520], [200, 496], [420, 512], [640, 490], [840, 504]], '#26405a');
    s += nightOlive(110, 560, 1.1) + nightOlive(700, 540, 1.2);
    s += `<g data-k="tochas" opacity="0" style="pointer-events:none"><g data-k="tochasM">${[0, 1, 2].map(i => person(Object.assign({}, SOLDADO, { x: 40 + i * 44, y: 540 + (i % 2) * 8, s: .36, face: 'frown', look: .5, armL: { a: 20 }, armR: { a: 110, b: -70, item: torch(60) }, cls: '' }))).join('')}</g></g>`;
    s += hill([[-40, 600], [220, 580], [460, 596], [700, 574], [840, 588]], '#2c4f4a');
    s += halo(320, 420, 180, 'luzJ', .6);
    s += rock(330, 690, 240, 100, { fill: '#7d7a8c', shade: '#5f5c70', hi: '#9a98aa' });
    s += jesus({ x: 330, y: 650, s: 1.02, legs: 'kneel', face: 'worry', look: .2, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, cloak: '#8e2f2f', k: 'jesus' });
    s += `<g transform="translate(560,720) rotate(-90)" data-k="d0"><g>${person(Object.assign({}, PEDRO, { x: 0, y: 100, s: .78, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } }))}</g></g>`;
    s += `<g transform="translate(700,730) rotate(-90)" data-k="d1"><g>${person(Object.assign({}, JOAO, { x: 0, y: 100, s: .74, face: 'sleep', armL: { a: 14 }, armR: { a: 14 } }))}</g></g>`;
    s += `<text class="zzz svgtxt" style="--d:3s" x="560" y="600" font-size="32" fill="#ffffff">z</text><text class="zzz svgtxt" style="--d:3s;animation-delay:-1.5s" x="700" y="610" font-size="28" fill="#ffffff">z</text>`;
    s += grassBand(401, 700, 790, 10, ['#2f5a46', '#3a6a52']);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus a orar', async () => {
      api.snd('anoint');
      api.anim(api.q('luzJ'), [{ opacity: .6 }, { opacity: 1 }, { opacity: .8 }], { duration: 1400, fill: 'forwards' });
      api.burst(330, 380, 'spark', 8, { col: '#fff1b0' });
      api.bubble(330, 300, 'Pai, seja feita a tua vontade.', { key: 'j', dur: 2800 });
      if (api.st.t) return;
      api.st.t = true;
      await api.wait(2600);
      api.snd('crackle');
      api.anim(api.q('tochas'), [{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: 'forwards' });
      api.anim(api.q('tochasM'), [{ transform: 'translateX(-40px)' }, { transform: 'translateX(40px)' }], { duration: 2600, fill: 'forwards', easing: 'ease-out' });
      api.nudgeNext(3000);
    });
    for (const k of ['d0', 'd1']) api.tap(api.q(k), 'Amigo a dormir', () => { api.snd('snore'); api.bubble(k === 'd0' ? 560 : 700, 560, 'Zzz...', { key: k, size: 26, dur: 1300 }); });
  }
});

/* =====================================================================
   5 — JESUS MORREU NA CRUZ
   ===================================================================== */
SCENES.push({
  key: 'cruz', title: 'Jesus morreu na cruz', ref: 'Lucas 23.33-49', tint: 'stone',
  text: [
    'Algumas pessoas não gostavam de Jesus. Pregaram Jesus numa cruz. E Jesus morreu.',
    'Os amigos de Jesus ficaram muito, muito tristes.',
    'Mas Jesus fez isto por amor: para perdoar os nossos pecados.'
  ],
  fact: 'Na cruz, Jesus orou: «Pai, perdoa-lhes.»',
  hint: 'Toca na cruz e nos amigos de Jesus.',
  alt: 'Um céu escuro de fim de tarde. Ao longe, num monte, aparecem três cruzes. À frente, Maria, a mãe de Jesus, o amigo João e outras mulheres estão juntos, tristes.',
  cue: [400, 260],
  art() {
    let s = sky('sky', [[0, '#2f2a46'], [.5, '#5a4f72'], [.8, '#a8746a'], [1, '#a8746a']]) + glowDefs();
    s += `<g opacity=".5">${cloud(160, 120, .9, { fill: '#7a6f8e', shade: '#5f5578' })}${cloud(620, 90, .7, { fill: '#7a6f8e', shade: '#5f5578' })}</g>`;
    s += halo(400, 250, 200, 'luzC', .45);
    s += hill([[-40, 470], [220, 400], [400, 320], [580, 400], [840, 470]], '#4a4058');
    s += crosses(400, 330, 1);
    s += hill([[-40, 560], [200, 530], [440, 548], [680, 520], [840, 536]], '#3c4a4a');
    s += `<g opacity=".7">${town(-30, 520, .7, { wall: '#5d566e', shade: '#4d4760', roof: '#6a6380', winCol: '#2c2640', doorCol: '#2c2640', sw: 2 })}</g>`;
    s += hill([[-40, 640], [240, 620], [480, 632], [720, 612], [840, 624]], '#4f5a48');
    s += `<g data-k="amigos">${person(Object.assign({}, MADALENA, { x: 170, y: 780, s: .96, face: 'sad', look: .4, armL: { a: -20, b: -70 }, armR: { a: -20, b: -70 } }))}${person(Object.assign({}, MAE, { x: 330, y: 790, s: 1, face: 'sad', look: .2, armL: { a: -24, b: -80 }, armR: { a: -24, b: -80 } }))}${person(Object.assign({}, JOAO, { x: 470, y: 790, s: 1, face: 'sad', look: -.3, armL: { a: 56, b: 30 }, armR: { a: 14 } }))}${person(Object.assign({}, MULHERES[0], { x: 620, y: 786, s: .94, face: 'sad', look: -.4, armL: { a: -20, b: -70 }, armR: { a: -20, b: -70 } }))}${hitC(400, 560, 230)}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('cruz'), 'Cruz de Jesus', () => {
      api.snd('heart');
      api.anim(api.q('luzC'), [{ opacity: .45 }, { opacity: .95 }, { opacity: .6 }], { duration: 1600, fill: 'forwards' });
      api.burst(400, 220, 'heart', 6);
      api.bubble(400, 470, 'Jesus ama-nos muito!', { key: 'c', dur: 2400 });
    });
    api.tap(api.q('amigos'), 'Amigos de Jesus', () => { api.snd('hm'); api.bubble(400, 500, 'Que tristeza...', { key: 'a', dur: 1800 }); api.nudgeNext(2400); });
  }
});

/* =====================================================================
   6 — A PEDRA GRANDE
   ===================================================================== */
SCENES.push({
  key: 'tumulo', title: 'A pedra grande', ref: 'Mateus 27.57-66', tint: 'night',
  text: [
    'Os amigos puseram o corpo de Jesus num túmulo, uma gruta na rocha.',
    'Depois rolaram uma pedra enorme para a entrada. E esperaram: um dia, dois dias...'
  ],
  fact: 'Uns soldados ficaram a vigiar o túmulo, para ninguém mexer na pedra.',
  hint: 'Toca na lua para os dias passarem.',
  alt: 'Noite num jardim. Uma caverna na rocha está fechada por uma pedra redonda enorme. Dois soldados vigiam, com sono. A lua brilha no céu.',
  cue: [640, 130],
  art() {
    let s = gardenNight({ seed: 61 }) + glowDefs();
    s += `<g transform="translate(640,130)" data-k="lua"><g class="act">${moon(0, 0, 36)}${hitC(0, 0, 60)}</g></g>`;
    s += hill([[-40, 540], [200, 520], [420, 534], [640, 508], [840, 520]], '#26405a');
    s += nightOlive(90, 560, 1) + nightOlive(250, 540, .8);
    s += tomb(560, 700, 1, { rock: '#8f8a9c', line: '#6f6a7c', moss: '#3f6a4a' });
    s += `<g transform="translate(560,630)">${stone(112, 'pedra')}</g>`;
    s += grassBand(611, 700, 790, 10, ['#2f5a46', '#3a6a52']);
    s += person(Object.assign({}, SOLDADO, { x: 300, y: 744, s: .9, face: 'o', look: .5, armL: { a: 14, item: ITEM.spear(250, 5), ia: 0 }, armR: { a: 20 }, k: 's0' }));
    s += person(Object.assign({}, SOLDADO, { x: 170, y: 754, s: .86, face: 'sleep', look: .3, armL: { a: 20 }, armR: { a: 14, item: ITEM.spear(240, 5), ia: 0 }, k: 's1' }));
    return s;
  },
  setup(api) {
    let d = 0;
    api.tap(api.q('lua'), 'Lua', async () => {
      if (d >= 3) { api.snd('twinkle'); return; }
      d++;
      api.snd('chime', ['C5', 'E5', 'G5'][d - 1]);
      api.anim(api.act(api.q('lua')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-60px)' }, { transform: 'translateX(0px)' }], { duration: 900 });
      api.badge(640, 210, String(d), { key: 'd' });
      api.bubble(400, 220, ['Um dia...', 'Dois dias...', 'Três dias!'][d - 1], { key: 'b', size: 34, plain: true, dur: 1500 });
      if (d === 3) { await api.wait(1200); api.bubble(400, 260, 'Domingo de manhã!', { key: 'dom', dur: 2400 }); api.nudgeNext(2200); }
    });
    api.tap(api.q('pedra'), 'Pedra do túmulo', () => { api.snd('stomp'); api.anim(api.act(api.q('pedra')), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], { duration: 500 }); api.bubble(300, 440, 'Que pedra pesada!', { key: 's' }); });
    api.tap(api.q('s0'), 'Soldado', () => { api.snd('grunt'); api.bubble(300, 440, 'Ninguém mexe nesta pedra!', { key: 's' }); });
    api.tap(api.q('s1'), 'Soldado com sono', () => { api.snd('snore'); api.bubble(170, 480, 'Uaaah...', { key: 's1', size: 26, dur: 1300 }); });
  }
});

/* =====================================================================
   7 — DOMINGO DE MANHÃ
   ===================================================================== */
SCENES.push({
  key: 'domingo', title: 'Domingo de manhã', ref: 'Mateus 28.1-7', tint: 'gold',
  text: [
    'No domingo, muito cedinho, umas mulheres foram ao túmulo.',
    'De repente, a terra tremeu, e a pedra rolou! Um anjo disse:',
    { q: 'Não tenham medo! Jesus não está aqui. Ele está vivo!', who: 'anjo' }
  ],
  fact: 'O anjo sentou-se em cima da pedra. A roupa dele era branquinha como a neve!',
  hint: 'Toca na pedra.',
  alt: 'Amanhecer no jardim. Três mulheres chegam com potes de perfume. A pedra rola para o lado, uma luz forte sai do túmulo vazio e um anjo brilhante aparece sentado na pedra.',
  cue: [560, 620],
  art() {
    let s = sky('sky', [[0, '#7cc0ea'], [.5, '#ffd6b0'], [1, '#ffe9c8']]) + glowDefs();
    s += sun(120, 420, 44, { face: true });
    s += cloud(260, 160, .8) + cloud(560, 110, .6, { dx: -24 });
    s += hill([[-40, 540], [200, 520], [420, 534], [640, 508], [840, 520]], '#a9cf7a');
    s += tomb(560, 700, 1, { open: true, light: 'luzT', cloth: true });
    s += `<g transform="translate(560,630)" data-k="pedraG">${stone(112, 'pedra')}</g>`;
    s += `<g data-k="anjoG" opacity="0" style="pointer-events:none"><g transform="translate(0,0)">${anjo({ x: 720, y: 620, s: .78, face: 'joy', look: -.6, armL: { a: 30 }, armR: { a: 120, b: -30 }, k: 'anjo' })}</g></g>`;
    s += grassBand(711, 700, 790, 10) + flowerBand(712, 720, 790, 6);
    s += person(Object.assign({}, MULHERES[1], { x: 80, y: 760, s: .86, face: 'surprise', look: .6, armL: { a: 14 }, armR: { a: 40, b: 50, item: spiceJar(), ia: 0 }, k: 'm0' }));
    s += person(Object.assign({}, MULHERES[0], { x: 190, y: 770, s: .9, face: 'surprise', look: .6, armL: { a: 14 }, armR: { a: 40, b: 50, item: spiceJar(), ia: 0 }, k: 'm1' }));
    s += person(Object.assign({}, MADALENA, { x: 310, y: 760, s: .92, face: 'surprise', look: .6, armL: { a: 14 }, armR: { a: 40, b: 50, item: spiceJar(), ia: 0 }, k: 'm2' }));
    return s;
  },
  setup(api) {
    const open = async () => {
      if (api.st.open) { api.snd('chime', 'E6'); api.bubble(720, 380, 'Ele está vivo!', { key: 'a' }); return; }
      api.st.open = true;
      api.snd('boom'); api.shake(14);
      api.anim(api.act(api.q('pedra')), [{ transform: 'translateX(0px) rotate(0deg)' }, { transform: 'translateX(190px) rotate(150deg)' }], { duration: 1400, fill: 'forwards', easing: 'cubic-bezier(.3,.1,.3,1)' });
      api.q('pedra').style.pointerEvents = 'none';
      await api.wait(900);
      api.snd('choir', ['C4', 'G4', 'C5', 'E5', 'G5']);
      api.anim(api.q('luzT'), [{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: 'forwards' });
      api.burst(560, 560, 'spark', 16, { col: '#fff6c8' });
      await api.wait(600);
      api.q('anjoG').style.pointerEvents = 'auto';
      api.anim(api.q('anjoG'), [{ opacity: 0 }, { opacity: 1 }], { duration: 800, fill: 'forwards' });
      await api.wait(700);
      api.bubble(720, 380, 'Não tenham medo! Jesus está vivo!', { key: 'a', dur: 3000 });
      api.nudgeNext(3000);
    };
    api.tap(api.q('pedra'), 'Pedra do túmulo', open);
    api.tap(api.q('anjo'), 'Anjo', () => { api.snd('twinkle'); api.burst(720, 420, 'spark', 8, { col: '#fff6c8' }); api.bubble(720, 380, 'Ele está vivo!', { key: 'a' }); });
    for (let i = 0; i < 3; i++) api.tap(api.q('m' + i), 'Mulher com perfume', () => { const [x] = api.pos(api.q('m' + i)); api.snd(api.st.open ? 'tada' : 'gulp'); api.hop(api.q('m' + i), 12); api.bubble(x, 480, api.st.open ? 'Vamos contar a todos!' : 'Quem vai tirar a pedra?', { key: 'm' }); });
  }
});

/* =====================================================================
   8 — MARIA VIU JESUS!
   ===================================================================== */
SCENES.push({
  key: 'maria', title: 'Maria viu Jesus!', ref: 'João 20.11-18', tint: 'rose',
  text: [
    'Maria estava a chorar perto do túmulo. Então alguém chamou:',
    { q: 'Maria!', who: 'jesus' },
    'Era Jesus! Maria ficou tão feliz! Correu a contar: «Eu vi Jesus!»'
  ],
  fact: 'Maria Madalena foi a primeira pessoa a ver Jesus vivo.',
  hint: 'Toca em Jesus e na Maria.',
  alt: 'Num jardim florido de manhã, Maria chora ajoelhada perto do túmulo aberto. Jesus, vivo e sorridente, está atrás dela e chama-a pelo nome.',
  cue: [560, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 120, sunR: 40, sky: [[0, '#8fd0f2'], [.55, '#fde2d0'], [1, '#fdf0e2']] }) + glowDefs();
    s += hill([[-40, 470], [200, 450], [420, 462], [640, 440], [840, 454]], '#bfe08e');
    s += tomb(150, 560, .55, { open: true });
    s += `<g transform="translate(270,560) rotate(30)">${stone(62)}</g>`;
    s += fruitTree(720, 520, .7, { fruit: '#e86a9a' });
    s += hill([[-40, 560], [220, 540], [460, 552], [700, 532], [840, 544]], '#a9cf7a');
    s += shrub(80, 640, .9, '#5fa046', { flowers: ['#e86a9a', '#ffffff'] });
    s += halo(560, 520, 200, 'luzJ', .7);
    s += jesus({ x: 560, y: 750, s: 1.1, face: 'smile', look: -.6, armL: { a: 14 }, armR: { a: 60, b: -20 }, k: 'jesus' });
    s += `<g data-k="triste">${person(Object.assign({}, MADALENA, { x: 330, y: 760, s: 1.02, legs: 'kneel', face: 'sad', look: -.3, armL: { a: -24, b: -90 }, armR: { a: -24, b: -90 } }))}${tears(330, 548, 1)}</g>`;
    s += `<g data-k="feliz" opacity="0" style="pointer-events:none">${person(Object.assign({}, MADALENA, { x: 330, y: 760, s: 1.02, legs: 'kneel', face: 'joy', look: .6, armL: { a: 130, b: -20 }, armR: { a: 130, b: -20 } }))}</g>`;
    s += hitC(330, 580, 90).replace('class="hit"', 'class="hit" data-k="maria"');
    s += flowerBand(811, 700, 790, 9, ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a']);
    return s;
  },
  setup(api) {
    const call = async () => {
      if (api.st.ok) { api.snd('heart'); api.burst(450, 420, 'heart', 6); return; }
      api.st.ok = true;
      api.snd('chime', 'E6');
      api.bubble(560, 330, 'Maria!', { key: 'j', size: 36, dur: 2000 });
      await api.wait(1200);
      api.q('triste').setAttribute('opacity', '0');
      api.anim(api.q('feliz'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('tada'); api.burst(330, 520, 'heart', 8);
      api.bubble(330, 380, 'Mestre! És tu!', { key: 'm', dur: 2600 });
      api.nudgeNext(2800);
    };
    api.tap(api.q('jesus'), 'Jesus', call);
    api.tap(api.q('maria'), 'Maria', () => { if (!api.st.ok) { api.snd('hm'); api.bubble(330, 380, 'Onde está Jesus?', { key: 'm' }); return; } api.snd('hello'); api.bubble(330, 380, 'Eu vi Jesus!', { key: 'm' }); });
  }
});

/* =====================================================================
   9 — A PAZ ESTEJA COM VOCÊS
   ===================================================================== */
const SALA = [[110, 744, .92, 0], [230, 720, .9, 3], [570, 720, .9, 1], [690, 744, .92, 2]];
SCENES.push({
  key: 'amigos', title: 'A paz esteja com vocês', ref: 'Lucas 24.36-43; João 20.19-20', tint: 'sky',
  text: [
    'Os amigos estavam numa casa, com a porta fechada. De repente, Jesus apareceu no meio deles!',
    { q: 'A paz esteja com vocês!', who: 'jesus' },
    'Que alegria! Jesus estava vivo de verdade!'
  ],
  fact: 'Jesus até comeu um pedaço de peixe, para mostrar que estava vivo de verdade!',
  hint: 'Toca na luz e depois nos amigos.',
  alt: 'Numa sala com a porta trancada, os amigos de Jesus estão sentados, tristes. Uma luz aparece no meio da sala e Jesus surge, a sorrir. Os amigos saltam de alegria.',
  cue: [400, 560],
  art() {
    let s = room({ floor: 620, w1: '#e9d8b6', w2: '#d2b98f' }) + glowDefs();
    s += door(400, 620);
    s += hangLamp(180, 200) + hangLamp(620, 200);
    s += `<rect x="170" y="430" width="150" height="18" rx="4" fill="#9a6b3e" stroke="${OL}" stroke-width="3"/><path d="M190,448 L210,470 M300,448 L280,470" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>` + plateFish(245, 428, 'prato');
    s += `<g data-k="tristes">${SALA.map(([x, y, sc, i]) => person(Object.assign({}, AMIGOS[i], { x, y, s: sc, legs: 'sit', drop: 30, hemY: -62, face: 'worry', look: (400 - x) / 300, armL: { a: 20, b: 40 }, armR: { a: 20, b: 40 } }))).join('')}</g>`;
    s += `<g data-k="alegres" opacity="0">${SALA.map(([x, y, sc, i]) => person(Object.assign({}, AMIGOS[i], { x, y, s: sc, legs: 'sit', drop: 30, hemY: -62, face: 'joy', look: (400 - x) / 300, armL: { a: 140, b: -20 }, armR: { a: 140, b: -20 }, k: 'a' + i }))).join('')}</g>`;
    s += halo(400, 560, 160, 'luz', .5);
    s += `<g data-k="jesusG" opacity="0" style="pointer-events:none">${halo(400, 520, 210)}${jesus({ x: 400, y: 760, s: 1.08, face: 'joy', look: 0, armL: { a: 70, b: -20 }, armR: { a: 70, b: -20 }, k: 'jesus' })}</g>`;
    s += hitC(400, 560, 90).replace('class="hit"', 'class="hit" data-k="luzHit"');
    return s;
  },
  setup(api) {
    const appear = async () => {
      if (api.st.on) return;
      api.st.on = true;
      api.snd('anoint');
      api.anim(api.q('luz'), [{ opacity: .5 }, { opacity: 1 }], { duration: 700, fill: 'forwards' });
      api.burst(400, 520, 'spark', 14, { col: '#fff6c8' });
      await api.wait(500);
      api.q('jesusG').style.pointerEvents = 'auto'; api.q('luzHit').style.pointerEvents = 'none';
      api.anim(api.q('jesusG'), [{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: 'forwards' });
      await api.wait(900);
      api.bubble(400, 330, 'A paz esteja com vocês!', { key: 'j', dur: 2600 });
      await api.wait(1200);
      api.q('tristes').setAttribute('opacity', '0');
      api.anim(api.q('alegres'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('victory'); api.burst(400, 400, 'confetti', 18);
      api.nudgeNext(2800);
    };
    api.tap(api.q('luzHit'), 'Luz', appear);
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 460, 'heart', 5); api.bubble(400, 330, 'Sou mesmo eu!', { key: 'j' }); });
    SALA.forEach(([x, y, sc, i]) => api.tap(api.q('a' + i), 'Amigo de Jesus', () => { if (!api.st.on) return; api.snd('tada'); api.hop(api.q('a' + i), 14); api.bubble(x, y - 260 * sc, 'Jesus está vivo!', { key: 'a', size: 26 }); }));
    api.tap(api.q('prato'), 'Prato com peixe', () => {
      if (!api.st.on) { api.snd('plip'); return; }
      if (api.st.comeu) { api.snd('plip'); return; }
      api.st.comeu = true; api.snd('crunch');
      api.anim(api.q('pratopeixe'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      api.bubble(400, 330, 'Hum! Que peixe tão bom!', { key: 'j' });
    });
  }
});

/* =====================================================================
   10 — JESUS ESTÁ VIVO!
   ===================================================================== */
const FLORES = [[110, 720, '#e0473e'], [250, 760, '#f2c14e'], [540, 762, '#e86a9a'], [690, 724, '#8a5fc2'], [400, 780, '#ffffff']];
SCENES.push({
  key: 'vivo', title: 'Jesus está vivo!', ref: 'Mateus 28.18-20', tint: 'meadow',
  text: [
    'Jesus venceu a morte! Ele está vivo para sempre.',
    'Antes de voltar para o céu, Jesus prometeu:',
    { q: 'Eu estou com vocês todos os dias!', who: 'jesus' }
  ],
  fact: 'A Páscoa é a festa da alegria: Jesus está vivo!',
  hint: 'Toca em Jesus, nas flores e nas crianças.',
  alt: 'No alto de um monte, ao nascer do sol, Jesus abre os braços, rodeado de luz. Os amigos e as crianças festejam à volta, entre flores e borboletas.',
  cue: [250, 700],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.5, '#cdeefa'], [.75, '#fff0c8'], [1, '#fff0c8']]) + glowDefs();
    s += `<g transform="translate(400,300)" data-k="raios" opacity=".55" style="pointer-events:none"><g class="spin" style="--d:60s">${[...Array(12)].map((_, i) => `<path d="M0,0 L${r1(Math.cos(i * 30 * Math.PI / 180) * 900)},${r1(Math.sin(i * 30 * Math.PI / 180) * 900)} L${r1(Math.cos((i * 30 + 10) * Math.PI / 180) * 900)},${r1(Math.sin((i * 30 + 10) * Math.PI / 180) * 900)} Z" fill="#fff6c8" opacity=".5"/>`).join('')}</g></g>`;
    s += cloud(140, 140, .8) + cloud(660, 110, .7, { dx: -24 });
    s += hill([[-40, 640], [160, 560], [400, 480], [640, 560], [840, 640]], '#a9cf7a');
    s += halo(400, 380, 230);
    s += jesus({ x: 400, y: 560, s: 1, face: 'joy', look: 0, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 }, k: 'jesus' });
    s += hill([[-40, 700], [200, 660], [420, 680], [640, 650], [840, 670]], '#8cc265');
    s += person(Object.assign({}, PEDRO, { x: 90, y: 740, s: .9, face: 'joy', look: .6, armL: { a: 140, b: -20 }, armR: { a: 20 }, k: 'k0' }));
    s += person(Object.assign({}, POVO[1], { x: 200, y: 770, s: .78, legs: 'hop', face: 'laugh', look: .6, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 }, cls: 'bounce', k: 'k1' }));
    s += person(Object.assign({}, POVO[3], { x: 600, y: 772, s: .78, face: 'joy', look: -.6, armL: { a: 150, b: -10 }, armR: { a: 40 }, k: 'k2' }));
    s += person(Object.assign({}, MADALENA, { x: 710, y: 744, s: .88, face: 'joy', look: -.6, armL: { a: 20 }, armR: { a: 140, b: -20 }, k: 'k3' }));
    FLORES.forEach(([x, y, c], i) => s += bud(x, y, 2.2, c, 'f' + i));
    s += butterfly(250, 320, .8, '#f2c14e') + butterfly(580, 260, .7, '#e86a9a') + butterfly(680, 420, .6, '#5fb3e0');
    return s;
  },
  setup(api) {
    let n = 0;
    FLORES.forEach(([x, y], i) => api.tap(api.q('f' + i), 'Flor', async () => {
      const f = api.q('f' + i);
      if (f.dataset.ok) { api.snd('twinkle'); return; }
      f.dataset.ok = 1; n++;
      api.snd('chime', ['C5', 'D5', 'E5', 'G5', 'C6'][n - 1]);
      api.anim(api.act(f), [{ transform: 'scale(.35)' }, { transform: 'scale(1.15)', offset: .7 }, { transform: 'scale(1)' }], { duration: 700, fill: 'forwards', easing: 'ease-out' });
      api.burst(x, y - 40, 'spark', 5, { col: '#fff1b0' });
      if (n === FLORES.length) { await api.wait(500); api.snd('victory'); api.burst(400, 300, 'confetti', 20); api.bubble(400, 230, 'Jesus está vivo!', { key: 'fim', size: 44, plain: true, dur: 2400 }); api.nudgeNext(2400); }
    }));
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('choir', ['C4', 'E4', 'G4', 'C5']); api.anim(api.q('raios'), [{ opacity: .55 }, { opacity: 1 }, { opacity: .55 }], { duration: 1600 }); api.bubble(400, 200, 'Eu estou com vocês todos os dias!', { key: 'j', dur: 2800 }); });
    for (let i = 0; i < 4; i++) api.tap(api.q('k' + i), 'Amigo de Jesus', () => { const [x, y, sc] = api.pos(api.q('k' + i)); api.snd('tada'); api.hop(api.q('k' + i), 18); api.burst(x, y - 220 * sc, 'heart', 4); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o jardim. O túmulo aberto brilha de leve, com flores à volta; uma ovelhinha dorme na relva.',
  cue: [430, 160],
  questions: [
    ['Como é que Jesus chegou a Jerusalém?', 'Montado num burrinho.'],
    ['O que é que o povo gritava?', '«Hosana!»'],
    ['Porque é que Jesus morreu na cruz?', 'Por amor, para perdoar os nossos pecados.'],
    ['O que é que as mulheres viram no domingo?', 'A pedra fora do lugar e o túmulo vazio!'],
    ['Jesus está vivo?', 'Sim! Jesus está vivo para sempre!']
  ],
  verse: ['Ele não está aqui. Ele ressuscitou!', 'Mateus 28.6'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]) + glowDefs();
    s += starField(1401, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 480], [140, 450], [330, 470], [520, 440], [700, 460], [840, 450]], '#2b416c');
    s += tomb(610, 610, .42, { open: true, light: 'luzF', lightOn: true, rock: '#7d7a8c', line: '#5f5c70', moss: '#3f6a4a' });
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += flowerBand(1402, 690, 760, 7, ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a']);
    s += sheep({ x: 300, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
  id: 'pascoa',
  title: 'A Páscoa: Jesus Está Vivo!',
  cover: { kicker: 'Uma história da Bíblia', pre: 'A Páscoa:', title: 'Jesus', small: 'está vivo!', sub: 'O maior amor do mundo' },
  color: '#b8323c',
  ref: 'Mateus 21 a 28; Lucas 22 a 24; João 13 e 20',
  scenes: SCENES
});
})();
