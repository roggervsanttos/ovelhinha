/* =====================================================================
   LIVRO: O MENINO JESUS NO TEMPLO  (Lucas 2.41-52)
   ===================================================================== */
(() => {
const SCENES = [];
const MENINO = { kind: 'child', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'short', hi: '#6a4a2c', tunic: '#fbf6ea', belt: '#c9a54e', cloak: '#b8312f', cloakTrim: '#f2c14e' };
const MARIA = { kind: 'adult', skin: '#e7b58a', head: 'scarf', clothCol: '#4f86c6', clothStripe: '#f2c14e', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', longSleeves: true, belt: '#4f86c6' };
const JOSE = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', beard: 'short', beardCol: '#4a2c1c', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#8a5a33', tunic: '#8b6a4a', stripes: '#a98a62', belt: '#5b3a2a' };
const MESTRES = [
  { kind: 'adult', skin: '#e2a878', hair: '#d9d4cc', beard: 'long', beardCol: '#ece8e0', head: 'cloth', clothCol: '#f4efe6', clothStripe: '#2f6db5', bandCol: '#2f6db5', tunic: '#2f6db5', stripes: '#9cc4e8', belt: '#f2c14e' },
  { kind: 'adult', skin: '#c98a5a', hair: '#8a8078', beard: 'long', beardCol: '#a8a098', head: 'cloth', clothCol: '#e9c46a', bandCol: '#8a5fc2', tunic: '#8a5fc2', cloak: '#5a3a7a', belt: '#e9c46a' },
  { kind: 'adult', skin: '#d99a6c', hair: '#b8b0a8', beard: 'bushy', beardCol: '#c8c0b8', head: 'cloth', clothCol: '#fbf6ea', bandCol: '#5e9a43', tunic: '#5e9a43', belt: '#d9a33a' }
];
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#d9643f' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' }
];
const p = (who, o) => person(Object.assign({}, who, o));
const SENTA = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
// a fachada do Templo de Jerusalém, com a cortina às cores e degraus
function templo(x, y, s = 1, o = {}) {
  let g = `<rect x="-300" y="-30" width="600" height="30" fill="#e8dcc0" stroke="${OL}" stroke-width="3.4"/><rect x="-270" y="-58" width="540" height="30" fill="#efe4c8" stroke="${OL}" stroke-width="3.4"/>`;
  g += `<rect x="-232" y="-420" width="464" height="364" fill="#f6eedb" stroke="${OL}" stroke-width="4"/><rect x="-120" y="-420" width="240" height="364" fill="#efe2c4" opacity=".7"/>`;
  g += `<rect x="-252" y="-448" width="504" height="32" rx="4" fill="#f2c14e" stroke="${OL}" stroke-width="4"/><rect x="-200" y="-474" width="400" height="28" rx="4" fill="#e9b23a" stroke="${OL}" stroke-width="3.4"/>`;
  g += [-180, -120, -60, 0, 60, 120, 180].map(dx => `<path d="M${dx - 6},-474 L${dx},-494 L${dx + 6},-474 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>`).join('');
  for (const dx of [-200, -150, 150, 200]) g += `<rect x="${dx - 14}" y="-408" width="28" height="350" fill="#e6d6b0" stroke="${OL}" stroke-width="2.8"/><rect x="${dx - 19}" y="-416" width="38" height="12" rx="3" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/><rect x="${dx - 19}" y="-66" width="38" height="10" rx="3" fill="#e9d9b4" stroke="${OL}" stroke-width="2.4"/>`;
  g += `<path d="M-86,-58 L-86,-300 Q0,-366 86,-300 L86,-58 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3.6"/>`;
  g += `<path d="M-68,-58 L-68,-292 Q0,-344 68,-292 L68,-58 Z" fill="#5a4aa8"/><path d="M-46,-58 L-46,-306 M-22,-58 L-22,-322 M2,-58 L2,-328 M26,-58 L26,-320 M50,-58 L50,-302" stroke="#b5402f" stroke-width="9"/><path d="M-34,-58 L-34,-314 M14,-58 L14,-326 M38,-58 L38,-312" stroke="#4f86c6" stroke-width="7"/>`;
  g += `<path d="M-100,-372 C-60,-392 -30,-376 0,-392 C30,-376 60,-392 100,-372" stroke="#e9b23a" stroke-width="8" fill="none" stroke-linecap="round"/>${[-80, -40, 0, 40, 80].map((dx, i) => `<circle cx="${dx}" cy="${-380 + (i % 2) * 8}" r="7" fill="#8a5fc2" stroke="${OL}" stroke-width="2"/>`).join('')}`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${g}${o.k ? hitC(0, -240, 160) : ''}</g></g>`;
}
function jerusalemLonge(x, y, s = 1) {
  let g = `<path d="M-260,40 C-200,-40 -100,-70 0,-74 C100,-70 200,-40 260,40 Z" fill="#c9b27e"/>`;
  g += town(-230, -54, .8, { wall: '#f1dcb2', shade: '#dbc08c', roof: '#e2c696' }) + town(70, -50, .78, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' });
  g += templo(10, -40, .3);
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function patio(o = {}) {
  let s = bgDay(Object.assign({ sunX: 680, sunY: 100, sunR: 36, clouds: false }, o.day || {}));
  s += cloud(120, 120, .8) + cloud(720, 220, .6);
  s += templo(o.tx ?? 400, o.ty ?? 560, o.ts ?? .9, { k: o.tk || '' });
  s += `<rect x="-40" y="${o.chao ?? 556}" width="900" height="400" fill="#efe2c4"/>`;
  let lajes = '';
  for (let r = 0; r < 6; r++) for (let xx = -40 + (r % 2 ? 50 : 0); xx < 860; xx += 100) lajes += `<rect x="${xx}" y="${(o.chao ?? 556) + 8 + r * 44}" width="96" height="40" rx="4"/>`;
  s += `<g fill="none" stroke="#d9c79f" stroke-width="3">${lajes}</g>`;
  return s;
}
// tenda do acampamento; o.k para tocar
function tenda(x, y, s = 1, o = {}) {
  const g = tent(0, 0, 220, 170, { fill: o.fill || '#e7d2b0', stripe: o.stripe || '#b6553f' }) + `<path d="M-22,0 L0,-96 L22,0 Z" fill="#5a3a26" stroke="${OL}" stroke-width="2.6"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${g}${o.k ? hitC(0, -70, 100) : ''}</g></g>`;
}
function banca(x, y, s = 1, k = '') {
  let g = `<rect x="-90" y="-180" width="10" height="180" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="80" y="-180" width="10" height="180" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/>`;
  g += `<path d="M-110,-186 L110,-186 L96,-150 L-96,-150 Z" fill="#e5483f" stroke="${OL}" stroke-width="3"/><path d="M-70,-186 L-64,-150 M-24,-186 L-22,-150 M24,-186 L22,-150 M70,-186 L64,-150" stroke="#fbf6ea" stroke-width="10"/>`;
  g += `<rect x="-96" y="-70" width="192" height="70" fill="#a46e3c" stroke="${OL}" stroke-width="3"/>`;
  g += [[-60, '#f2c14e'], [-30, '#e86a3a'], [0, '#7fae4a'], [30, '#e5483f'], [60, '#f2c14e']].map(([dx, c]) => `<circle cx="${dx}" cy="-80" r="13" fill="${c}" stroke="${OL}" stroke-width="2.4"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -90, 100) : ''}</g></g>`;
}
function poco(x, y, s = 1, k = '') {
  let g = `<ellipse cx="0" cy="-60" rx="80" ry="20" fill="#5a4a3a" stroke="${OL}" stroke-width="3"/><path d="M-80,-60 L-80,0 Q0,18 80,0 L80,-60 Q0,-40 -80,-60 Z" fill="#c9b49a" stroke="${OL}" stroke-width="3"/>`;
  g += `<g stroke="#a8957b" stroke-width="2.4" fill="none"><path d="M-80,-30 Q0,-12 80,-30"/><path d="M-40,-48 L-40,-6 M20,-44 L20,0"/></g>`;
  g += `<rect x="-70" y="-170" width="10" height="110" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="60" y="-170" width="10" height="110" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="-78" y="-178" width="156" height="12" rx="4" fill="#a46e3c" stroke="${OL}" stroke-width="2.6"/>`;
  g += `<path d="M0,-166 L0,-110" stroke="#6b4a33" stroke-width="3"/><path d="M-14,-110 L14,-110 L10,-84 L-10,-84 Z" fill="#c46a3a" stroke="${OL}" stroke-width="2.4"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -80, 90) : ''}</g></g>`;
}
function porta(x, y, s = 1, k = '') {
  let g = `<rect x="-120" y="-240" width="240" height="240" fill="#ecd5a6" stroke="${OL}" stroke-width="3.4"/><rect x="-130" y="-254" width="260" height="18" rx="4" fill="#cdb084" stroke="${OL}" stroke-width="3"/>`;
  g += `<path d="M-50,0 L-50,-140 A50,50 0 0 1 50,-140 L50,0 Z" fill="#7a5236" stroke="${OL}" stroke-width="3"/><circle cx="32" cy="-70" r="5" fill="#f2c14e" stroke="${OL}" stroke-width="2"/>`;
  g += `<path d="M-90,-200 L-90,-160 M90,-200 L90,-160" stroke="#5a3a26" stroke-width="12"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -100, 100) : ''}</g></g>`;
}
function ruaJerusalem(o = {}) {
  let s = bgDay(Object.assign({ sunX: 680, sunY: 100, sunR: 36 }, o.day || {}));
  s += town(-20, 420, 1.3, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' }) + town(520, 410, 1.2, { wall: '#f1dcb2', shade: '#dbc08c', roof: '#e2c696' });
  s += templo(400, 440, .42);
  s += `<rect x="-40" y="520" width="900" height="400" fill="#e2c497"/>`;
  return s;
}
function oficina() {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#e6d2ad"/>`;
  let br = '';
  for (let r = 0; r < 9; r++) for (let x = -40 + (r % 2 ? 40 : 0); x < 840; x += 80) br += `<rect x="${x}" y="${r * 64}" width="76" height="60" rx="6"/>`;
  s += `<g fill="none" stroke="#c9b08a" stroke-width="3" opacity=".6">${br}</g>`;
  s += `<path d="M520,420 L520,240 A80,80 0 0 1 680,240 L680,420 Z" fill="#9fd3ef" stroke="${OL}" stroke-width="4"/>${olive(600, 420, .5)}<path d="M600,160 L600,420 M520,300 L680,300" stroke="#6b4428" stroke-width="7"/>`;
  s += `<g transform="translate(120,200)">${limb(-60, 0, 120, 0, 8, '#8a5a33')}<g transform="translate(-30,0) rotate(8)">${limb(0, 0, 0, 70, 6, '#9a6b3e')}<rect x="-14" y="64" width="28" height="14" rx="3" fill="#8a8f9a" stroke="${OL}" stroke-width="2.6"/></g><g transform="translate(40,4)"><path d="M0,0 L0,40 L-6,40 L-6,96 L46,96 L46,40 L0,40" fill="#cfd5dc" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-6,40 L-6,96" stroke="#8a5a33" stroke-width="8"/></g></g>`;
  s += `<path d="M620,600 L620,380 A60,60 0 0 1 740,380 L740,600 Z" fill="#5a3a26" stroke="${OL}" stroke-width="4"/><path d="M630,600 L630,390 A50,50 0 0 1 730,390 L730,600" fill="#f6e6b8" opacity=".35"/>`;
  s += `<rect x="-40" y="600" width="900" height="300" fill="#b98f62"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/>`;
  s += `<g fill="#f0d9a6" stroke="#c9a46a" stroke-width="2">${[[120, 660], [180, 700], [560, 690], [640, 720], [300, 740]].map(([a, b]) => `<path d="M${a},${b} q8,-10 16,0 q8,-10 16,0"/>`).join('')}</g>`;
  return s;
}
function bancada(x, y, s = 1, k = '') {
  let g = `<rect x="-150" y="-110" width="300" height="24" rx="4" fill="#b07b4a" stroke="${OL}" stroke-width="3.4"/>${limb(-120, -86, -124, 0, 12, '#8a5a33')}${limb(120, -86, 124, 0, 12, '#8a5a33')}`;
  g += `<rect x="-110" y="-128" width="200" height="18" rx="3" fill="#e3bd86" stroke="${OL}" stroke-width="2.6"/><path d="M-100,-119 L80,-119" stroke="#c99a5a" stroke-width="2"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -100, 120) : ''}</g></g>`;
}
const SERROTE = `<g transform="rotate(-70)"><rect x="-10" y="-8" width="24" height="18" rx="6" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><path d="M12,-6 L86,-2 L86,10 L12,10 Z" fill="#cfd5dc" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M14,10 l5,6 l5,-6 l5,6 l5,-6 l5,6 l5,-6 l5,6 l5,-6 l5,6 l5,-6 l5,6 l5,-6 l5,6 l5,-6" fill="none" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/></g>`;
const MARTELO = `<g><path d="M0,12 L0,-30" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M0,12 L0,-30" stroke="#a46e3c" stroke-width="5" stroke-linecap="round"/><rect x="-16" y="-42" width="32" height="14" rx="3" fill="#8a8f9a" stroke="${OL}" stroke-width="2.6"/></g>`;

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'O Menino Jesus no Templo',
  alt: 'No pátio do Templo, o menino Jesus está sentado nos degraus e fala com os mestres, que o ouvem admirados.',
  cue: [400, 860],
  art() {
    let s = sky('sky', [[0, '#8fcbec'], [.5, '#d4eef7'], [1, '#f6efdc']], 1100);
    s += cloud(150, 320, .9) + cloud(640, 280, .7);
    s += templo(400, 820, .84);
    s += `<rect x="-40" y="816" width="900" height="400" fill="#efe2c4"/>`;
    s += dove({ x: 140, y: 520, s: .7, flip: true, cls: 'hover' }) + dove({ x: 680, y: 470, s: .6, cls: 'hover' });
    s += p(MESTRES[1], { x: 150, y: 1060, s: 1, ...SENTA, face: 'surprise', look: .5, armL: { a: 20, item: ITEM.scroll(), ia: -10 }, armR: { a: 40, b: -60 }, k: 'm1' });
    s += p(MESTRES[0], { x: 650, y: 1060, s: 1, ...SENTA, flip: true, face: 'o', look: .5, armL: { a: 20 }, armR: { a: 60, b: -70 }, k: 'm0' });
    s += p(MENINO, { x: 400, y: 1000, s: 1.3, legs: 'sit', face: 'joy', look: 0, armL: { a: 30, b: -30 }, armR: { a: 120, b: -20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('chime', 'E6'); api.burst(400, 720, 'heart', 4); api.bubble(400, 640, 'Gosto tanto de aprender sobre Deus!', { key: 'j' }); });
    api.tap(api.q('m0'), 'Mestre', () => { api.snd('hm'); api.bubble(640, 770, 'Que menino tão sábio!', { key: 'm' }); });
    api.tap(api.q('m1'), 'Mestre', () => { api.snd('hm'); api.bubble(170, 770, 'Como é que ele sabe tanto?', { key: 'm' }); });
  }
});

/* =====================================================================
   1 — A VIAGEM PARA A FESTA
   ===================================================================== */
SCENES.push({
  key: 'festa', title: 'A viagem para a festa', ref: 'Lucas 2.41-42', tint: 'sand',
  text: [
    'Todos os anos, a Maria e o José iam a Jerusalém para a festa da Páscoa.',
    'Quando Jesus tinha doze anos, foi com eles. Que viagem tão grande!'
  ],
  fact: 'As famílias viajavam juntas, a pé, em grandes grupos. Pelo caminho, cantavam salmos!',
  hint: 'Toca na família de Jesus e no burrinho.',
  alt: 'Num caminho de terra, muitas famílias caminham para Jerusalém, que se vê ao longe, no alto de um monte. Jesus vai com a Maria e o José.',
  cue: [300, 560],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 36 });
    s += hill([[-40, 430], [200, 396], [440, 416], [680, 384], [840, 404]], '#b9cf8a');
    s += jerusalemLonge(600, 420, .8);
    s += `<rect x="-40" y="480" width="900" height="400" fill="#d9c99a"/>`;
    s += `<path d="M-40,800 C120,700 300,620 480,560 C540,540 580,520 600,470 L640,470 C640,540 560,600 500,640 C380,720 260,800 200,900 Z" fill="#efdcb0" stroke="#d2b98a" stroke-width="3"/>`;
    s += olive(80, 520, .8) + olive(740, 560, .7);
    s += `<g data-k="grupo">${p(POVO[0], { x: 470, y: 600, s: .56, legs: 'walk', face: 'joy', look: .6, armL: { a: 16 }, armR: { a: 30 } })}${p(POVO[1], { x: 520, y: 590, s: .54, legs: 'walk', face: 'smile', look: .6, armL: { a: 16 }, armR: { a: 20 } })}${p(POVO[2], { x: 500, y: 612, s: .56, legs: 'walk', face: 'laugh', look: .6, armL: { a: 30 }, armR: { a: 30 } })}${hitC(500, 540, 70)}</g>`;
    s += equine({ x: 140, y: 770, s: .8, kind: 'donkey', pack: '#b6553f', k: 'burro' });
    s += `<g data-k="familia" style="transform-origin:330px 770px">${p(JOSE, { x: 290, y: 760, s: .92, legs: 'walk', face: 'smile', look: .6, armL: { a: 16 }, armR: { a: 16, item: ITEM.staff(190), ia: 0 } })}${p(MENINO, { x: 370, y: 770, s: 1.08, legs: 'walk', face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 30, b: -10 } })}${p(MARIA, { x: 440, y: 762, s: .9, legs: 'walk', face: 'smile', look: .6, armL: { a: 16 }, armR: { a: 16 } })}${hitC(370, 640, 130)}</g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('familia'), 'Jesus, a Maria e o José', async () => {
      if (api.st.busy) return;
      if (n >= 2) { api.snd('chime', 'E6'); api.bubble(370, 440, 'Olha, já se vê Jerusalém!', { key: 'j' }); return; }
      api.st.busy = true; api.snd('tiptoe');
      const t = i => `translate(${i * 60}px,${-i * 40}px) scale(${(1 - i * .1).toFixed(2)})`;
      await api.anim(api.q('familia'), [{ transform: t(n) }, { transform: t(n + 1) }], { duration: 1000, easing: 'ease-in-out', fill: 'forwards' });
      n++; api.st.busy = false;
      if (n === 2) { api.bubble(370, 440, 'Olha, já se vê Jerusalém!', { key: 'j' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('burro'), 'Burrinho', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
    api.tap(api.q('grupo'), 'Família a caminho', () => { api.snd('lullaby'); api.burst(500, 500, 'note', 5); api.bubble(500, 420, 'Vamos cantar!', { key: 'g', size: 26 }); });
  }
});

/* =====================================================================
   2 — A CASA DE DEUS
   ===================================================================== */
SCENES.push({
  key: 'casadeus', title: 'A casa de Deus', ref: 'Lucas 2.42-43', tint: 'gold',
  text: [
    'Em Jerusalém havia um Templo enorme e muito bonito: era a casa de Deus.',
    'A família de Jesus festejou lá a Páscoa, com muita gente.'
  ],
  fact: 'O Templo de Jerusalém era tão grande que lá cabiam milhares de pessoas!',
  hint: 'Toca no Templo, nas pombas e em Jesus.',
  alt: 'Diante do grande Templo branco e dourado, Jesus olha para cima, maravilhado. A Maria, o José e muitas pessoas estão no pátio.',
  cue: [400, 400],
  art() {
    let s = patio({ tk: 'templo' });
    s += dove({ x: 140, y: 240, s: .6, flip: true, cls: 'hover', k: 'd0' }) + dove({ x: 680, y: 300, s: .55, cls: 'hover', k: 'd1' });
    s += p(POVO[3], { x: 80, y: 700, s: .8, face: 'joy', look: .5, armL: { a: 30 }, armR: { a: 130, b: -20 } }) + p(POVO[1], { x: 720, y: 700, s: .8, flip: true, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 30 } });
    s += p(JOSE, { x: 230, y: 776, s: .98, face: 'smile', look: .4, armL: { a: 16 }, armR: { a: 40, b: -30 }, k: 'jose' });
    s += p(MARIA, { x: 570, y: 776, s: .96, flip: true, face: 'joy', look: .4, armL: { a: 16 }, armR: { a: 30, b: -20 }, k: 'maria' });
    s += p(MENINO, { x: 400, y: 790, s: 1.16, face: 'surprise', look: 0, armL: { a: 20 }, armR: { a: 150, b: -20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    api.tap(api.q('templo'), 'Templo', () => { api.snd('choir', ['C4', 'E4', 'G4', 'C5']); api.burst(400, 300, 'spark', 10, { col: '#f2c14e' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(3000); } });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('chime', 'G6'); api.hop(api.q('jesus'), 10); api.bubble(400, 470, 'Que bonito! É a casa de Deus!', { key: 'j' }); });
    for (const i of [0, 1]) api.tap(api.q('d' + i), 'Pomba', () => { api.snd('coo'); api.anim(api.act(api.q('d' + i)), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${i ? -40 : 40}px,-30px)` }, { transform: 'translate(0px,0px)' }], { duration: 900 }); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('hello'); api.bubble(570, 460, 'Que festa tão bonita!', { key: 'm' }); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(230, 460, 'Feliz Páscoa!', { key: 'o' }); });
  }
});

/* =====================================================================
   3 — ONDE ESTÁ JESUS?
   ===================================================================== */
SCENES.push({
  key: 'perdido', title: 'Onde está Jesus?', ref: 'Lucas 2.43-45', tint: 'dusk',
  text: [
    'No fim da festa, a Maria e o José voltaram para casa com o grupo. Pensavam que Jesus vinha com os primos e os amigos.',
    'À noite, procuraram-no por todo o lado... mas Jesus não estava lá!'
  ],
  fact: 'Jesus tinha ficado em Jerusalém, mas a Maria e o José não sabiam.',
  hint: 'Toca nas tendas para procurar Jesus.',
  alt: 'Ao fim do dia, num acampamento com tendas e uma fogueira, a Maria e o José, preocupados, procuram Jesus.',
  cue: [130, 560],
  art() {
    let s = sky('sky', [[0, '#3a4a8a'], [.5, '#c27a8a'], [1, '#f2b880']]);
    s += starField(5301, 24, 0, 0, 800, 220, { big: .1 }) + moon(680, 100, 26);
    s += hill([[-40, 450], [200, 420], [440, 440], [680, 410], [840, 430]], '#8a7a8a');
    s += `<rect x="-40" y="500" width="900" height="400" fill="#c9b08a"/>`;
    s += tenda(130, 600, .9, { k: 't0' }) + tenda(400, 580, .8, { k: 't1', fill: '#d9c49a', stripe: '#5872b8' }) + tenda(670, 600, .9, { k: 't2', fill: '#e2c9a0', stripe: '#5e9a43' });
    s += campfire(400, 700, 1);
    s += p(JOSE, { x: 260, y: 780, s: 1, face: 'worry', look: .5, armL: { a: 16 }, armR: { a: 110, b: -30 }, k: 'jose' });
    s += p(MARIA, { x: 560, y: 780, s: 1, flip: true, face: 'worry', look: .5, armL: { a: 40, b: -70 }, armR: { a: 40, b: -70 }, k: 'maria' });
    return s;
  },
  setup(api) {
    const FALAS = [N('Aqui não está!'), N('Também não o vi!'), N('Não sei dele...')];
    const vistas = new Set();
    for (let i = 0; i < 3; i++) api.tap(api.q('t' + i), 'Tenda', () => {
      const [x, y, sc] = api.pos(api.q('t' + i));
      api.snd('hm'); api.hop(api.q('t' + i), 6);
      api.bubble(x, y - 210 * sc, FALAS[i], { key: 't' });
      vistas.add(i);
      if (vistas.size === 3 && !api.st.n) { api.st.n = true; api.later(() => { api.snd('hello'); api.bubble(260, 450, 'Vamos voltar a Jerusalém!', { key: 'o' }); }, 1300); api.nudgeNext(3600); }
    });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('hm'); api.bubble(560, 450, 'Jesus! Onde estás?', { key: 'm' }); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hm'); api.bubble(260, 450, 'Ninguém o viu!', { key: 'o' }); });
  }
});

/* =====================================================================
   4 — TRÊS DIAS À PROCURA
   ===================================================================== */
SCENES.push({
  key: 'procura', title: 'Três dias à procura', ref: 'Lucas 2.45-46', tint: 'stone',
  text: [
    'A Maria e o José voltaram a Jerusalém, muito preocupados.',
    'Procuraram Jesus pelas ruas da cidade, durante três dias!'
  ],
  fact: 'Por causa da festa, Jerusalém estava cheia de gente. Era difícil encontrar alguém!',
  hint: 'Toca na banca, no poço e na porta para procurar Jesus.',
  alt: 'Numa rua de Jerusalém, com uma banca de fruta, um poço e uma porta, a Maria e o José procuram Jesus. Ao fundo vê-se o Templo.',
  cue: [140, 600],
  art() {
    let s = ruaJerusalem();
    s += banca(140, 700, .9, 'l0') + poco(410, 700, .9, 'l1') + porta(670, 700, .8, 'l2');
    s += p(JOSE, { x: 300, y: 790, s: .9, face: 'worry', look: -.5, armL: { a: 16 }, armR: { a: 70, b: -30 } });
    s += p(MARIA, { x: 520, y: 790, s: .88, flip: true, face: 'worry', look: .5, armL: { a: 30, b: -60 }, armR: { a: 16 } });
    return s;
  },
  setup(api) {
    const LUGAR = [[140, 500], [410, 500], [670, 480]];
    const FALAS = [N('Não está aqui!'), N('Aqui também não!'), N('Onde estará Jesus?')];
    const vistos = new Set();
    for (let i = 0; i < 3; i++) api.tap(api.q('l' + i), [N('Banca de fruta'), N('Poço'), N('Porta')][i], () => {
      if (!vistos.has(i)) { vistos.add(i); api.badge(LUGAR[i][0], LUGAR[i][1] + 90, String(vistos.size), { key: 'd' + i }); }
      api.snd('count', vistos.size); api.hop(api.q('l' + i), 6);
      api.bubble(LUGAR[i][0], LUGAR[i][1] - 20, FALAS[i], { key: 'l' });
      if (vistos.size === 3 && !api.st.n) { api.st.n = true; api.later(() => { api.snd('chime', 'E6'); api.bubble(400, 230, 'E se formos ao Templo?', { key: 'l' }); }, 1300); api.nudgeNext(3600); }
    });
  }
});

/* =====================================================================
   5 — JESUS COM OS MESTRES
   ===================================================================== */
SCENES.push({
  key: 'mestres', title: 'Jesus com os mestres', ref: 'Lucas 2.46-47', tint: 'gold',
  text: [
    'Por fim, encontraram Jesus no Templo! Estava sentado no meio dos mestres, a ouvir e a fazer perguntas.',
    'Todos ficavam admirados com o que Jesus sabia e respondia.'
  ],
  fact: 'Os mestres eram homens que estudavam a Palavra de Deus e a ensinavam ao povo.',
  hint: 'Toca nos mestres e em Jesus.',
  alt: 'No pátio do Templo, o menino Jesus está sentado nos degraus. À volta dele, três mestres de barba branca ouvem-no, admirados.',
  cue: [400, 600],
  art() {
    let s = patio({ ty: 520, ts: .8, chao: 516 });
    s += p(MESTRES[2], { x: 570, y: 680, s: .84, ...SENTA, flip: true, face: 'o', look: .5, armL: { a: 20 }, armR: { a: 40, b: -70 }, k: 'm2' });
    s += p(MESTRES[1], { x: 150, y: 776, s: .98, ...SENTA, face: 'surprise', look: .5, armL: { a: 20, item: ITEM.scroll(), ia: -10 }, armR: { a: 40, b: -60 }, k: 'm1' });
    s += p(MESTRES[0], { x: 690, y: 780, s: 1, ...SENTA, flip: true, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 60, b: -70 }, k: 'm0' });
    s += p(MENINO, { x: 400, y: 700, s: 1.2, legs: 'sit', face: 'joy', look: 0, armL: { a: 30, b: -30 }, armR: { a: 120, b: -20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 3) api.nudgeNext(2600); };
    const FALAS = [N('Que menino tão sábio!'), N('Como é que ele sabe tanto?'), N('E só tem doze anos!')];
    for (let i = 0; i < 3; i++) api.tap(api.q('m' + i), 'Mestre', () => { const [x, y, sc] = api.pos(api.q('m' + i)); api.snd('hm'); api.shakeHead(api.q('m' + i)); api.bubble(x, y - 260 * sc, FALAS[i], { key: 'm', size: 26 }); ok('m' + i); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('chime', 'E6'); api.burst(400, 470, 'heart', 4); api.bubble(400, 400, 'Gosto tanto de aprender sobre Deus!', { key: 'j' }); ok('j'); });
  }
});

/* =====================================================================
   6 — NA CASA DO MEU PAI
   ===================================================================== */
SCENES.push({
  key: 'pai', title: 'Na casa do meu Pai', ref: 'Lucas 2.48-50', tint: 'rose',
  text: [
    'A Maria disse: «Filho, andávamos tão aflitos à tua procura!» E Jesus respondeu:',
    { q: 'Não sabiam que Eu devia estar na casa do meu Pai?', who: 'jesus' }
  ],
  fact: 'Jesus estava a falar de Deus. Deus é o Pai de Jesus, e o Templo era a casa de Deus.',
  hint: 'Toca na Maria, em Jesus e no José.',
  alt: 'À porta do Templo, a Maria abraça Jesus com alívio. O José sorri ao lado deles.',
  cue: [420, 560],
  art() {
    let s = patio({ ty: 540, ts: .86 });
    s += p(JOSE, { x: 630, y: 778, s: 1.02, flip: true, face: 'joy', look: .5, armL: { a: 16 }, armR: { a: 40, b: -40 }, k: 'jose' });
    s += p(MARIA, { x: 330, y: 780, s: 1.04, face: 'joy', look: .5, armL: { a: 16 }, armR: { a: 74, b: -30 }, k: 'maria' });
    s += p(MENINO, { x: 450, y: 786, s: 1.12, face: 'smile', look: -.5, armL: { a: 60, b: -30 }, armR: { a: 20 }, k: 'jesus' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2800); };
    api.tap(api.q('maria'), 'Maria', () => { api.snd('heart'); api.burst(390, 520, 'heart', 6); api.bubble(330, 450, 'Que susto, filho!', { key: 'm' }); ok('m'); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('chime', 'G6'); api.bubble(470, 470, 'Eu estava na casa do meu Pai!', { key: 'j' }); ok('j'); });
    api.tap(api.q('jose'), 'José', () => { api.snd('hello'); api.bubble(630, 440, 'Graças a Deus, encontrámos-te!', { key: 'o' }); });
  }
});

/* =====================================================================
   7 — DE VOLTA A NAZARÉ
   ===================================================================== */
SCENES.push({
  key: 'nazare', title: 'De volta a Nazaré', ref: 'Lucas 2.51', tint: 'sand',
  text: [
    'Depois, Jesus voltou para Nazaré com a Maria e o José, e obedecia-lhes em tudo.',
    'Em casa, ajudava, aprendia e brincava, como os outros meninos.'
  ],
  fact: 'O José era carpinteiro. Jesus também aprendeu a trabalhar a madeira!',
  hint: 'Toca no José, em Jesus e na Maria.',
  alt: 'Na oficina de carpintaria, o José serra uma tábua e Jesus ajuda-o com um martelo. A Maria acena, à porta.',
  cue: [470, 560],
  art() {
    let s = oficina();
    s += bancada(330, 700, 1);
    s += p(JOSE, { x: 240, y: 770, s: 1, face: 'smile', look: .5, armL: { a: 16 }, armR: { a: 60, b: -50, item: SERROTE, ia: 0 }, k: 'jose' });
    s += p(MENINO, { x: 470, y: 774, s: 1.1, face: 'joy', look: -.5, armL: { a: 30 }, armR: { a: 110, b: -40, item: MARTELO, ia: 0 }, k: 'jesus' });
    s += p(MARIA, { x: 680, y: 776, s: .98, flip: true, face: 'joy', look: .5, armL: { a: 16 }, armR: { a: 150, b: 10 }, k: 'maria' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2600); };
    api.tap(api.q('jose'), 'José', () => { api.snd('saw'); api.anim(api.act(api.q('jose')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(0px)' }], { duration: 500 }); api.burst(330, 590, 'dust', 6); ok('o'); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('knock'); api.hop(api.q('jesus'), 6); api.bubble(470, 450, 'Pum, pum, pum!', { key: 'j' }); ok('j'); });
    api.tap(api.q('maria'), 'Maria', () => { api.snd('hello'); api.bubble(680, 450, 'Está na hora do jantar!', { key: 'm' }); });
  }
});

/* =====================================================================
   8 — JESUS CRESCIA
   ===================================================================== */
SCENES.push({
  key: 'crescia', title: 'Jesus crescia', ref: 'Lucas 2.52', tint: 'meadow',
  text: [
    'E Jesus crescia: ficava cada vez mais alto e mais sábio.',
    'Deus e as pessoas gostavam muito de Jesus.'
  ],
  fact: 'Tu também estás a crescer! E Deus gosta muito de ti, em todas as idades.',
  hint: 'Toca em Jesus para ver como ele cresce.',
  alt: 'Encostado a uma parede de casa, o menino Jesus mede a sua altura. Há marcas na parede, e ele está cada vez maior.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 38 });
    s += hill([[-40, 430], [200, 400], [440, 420], [680, 392], [840, 412]], '#b9cf8a');
    s += `<rect x="230" y="330" width="440" height="350" fill="#ecd5a6" stroke="${OL}" stroke-width="3.4"/><rect x="560" y="330" width="110" height="350" fill="#d6b983" opacity=".5"/><rect x="218" y="316" width="464" height="18" rx="4" fill="#cdb084" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="540" y="420" width="70" height="60" rx="8" fill="#5a3a26" stroke="${OL}" stroke-width="3"/><path d="M250,640 L300,640 M600,560 L640,560" stroke="#d6b983" stroke-width="4" stroke-linecap="round"/>`;
    s += `<rect x="-40" y="660" width="900" height="300" fill="#e2d3a6"/>`;
    s += fruitTree(110, 700, .9, { fruit: '#e5483f' }) + shrub(720, 690, .8, '#5fa046', { flowers: ['#e86a9a', '#f2c14e'] });
    s += `<g stroke="#8a5a33" stroke-width="5" stroke-linecap="round">${[556, 531, 506].map((y, i) => `<path data-k="marca${i}" opacity="${i ? 0 : 1}" d="M448,${y} l36,0"/>`).join('')}</g>`;
    s += `<g data-k="jesus" style="transform-origin:400px 760px">${p(MENINO, { x: 400, y: 760, s: 1.05, face: 'joy', look: .4, armL: { a: 16 }, armR: { a: 150, b: -20 } })}${hitC(400, 640, 110)}</g>`;
    s += flowerBand(5801, 720, 790, 6);
    s += dove({ x: 640, y: 200, s: .5, cls: 'hover' });
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('jesus'), 'Jesus', async () => {
      if (n >= 2) { api.snd('laugh'); api.burst(400, 440, 'heart', 4); api.bubble(400, 330, 'Deus gosta muito de mim!', { key: 'j' }); return; }
      n++;
      api.snd('chime', ['E6', 'G6'][n - 1]);
      await api.anim(api.q('jesus'), [{ transform: `scale(${(1 + (n - 1) * .12).toFixed(2)})` }, { transform: `scale(${(1 + n * .12).toFixed(2)})` }], { duration: 600, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'forwards' });
      api.anim(api.q('marca' + n), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.burst(470, [556, 531, 506][n], 'spark', 5, { col: '#f2c14e' });
      if (n === 2) { api.bubble(400, 330, 'Olha como estou crescido!', { key: 'j' }); api.nudgeNext(2600); }
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
  alt: 'Noite estrelada sobre Jerusalém, com o Templo ao longe. Uma ovelhinha dorme no campo.',
  cue: [430, 160],
  questions: [
    ['Que idade tinha Jesus quando foi à festa?', 'Doze anos.'],
    ['Em que cidade ficou Jesus?', 'Em Jerusalém.'],
    ['Quantos dias procuraram Jesus?', 'Três dias!'],
    ['Onde estava Jesus?', 'No Templo, com os mestres.'],
    ['Que trabalho fazia o José?', 'Era carpinteiro.']
  ],
  wrong: [
    ['Três anos.', 'Trinta anos.', 'Sete anos.'],
    ['Em Belém.', 'Em Nazaré.', 'Em Roma.'],
    ['Um dia.', 'Sete dias.', 'Quarenta dias.'],
    ['A brincar na rua.', 'A dormir debaixo de uma árvore.', 'No mercado, a comprar pão.'],
    ['Era pescador.', 'Era rei.', 'Era soldado.']
  ],
  verse: ['Jesus crescia em sabedoria e em tamanho, e era amado por Deus e pelas pessoas.', 'Lucas 2.52'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(5901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#3a4560');
    s += `<g opacity=".8">${jerusalemLonge(560, 580, .7)}</g>`;
    s += `<path d="M-40,640 C200,616 520,640 840,618 L840,900 L-40,900 Z" fill="#3a5a52"/>`;
    s += sheep({ x: 280, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
    for (let i = 0; i < 7; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${80 + i * 100}" cy="${680 + (i % 3) * 22}" r="3" fill="#f6f39a"/>`;
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
  }
});

Ov.addBook({
  id: 'templo',
  title: 'O Menino Jesus no Templo',
  cover: { kicker: 'Uma história da Bíblia', pre: 'O Menino', title: 'Jesus', small: 'no Templo', sub: 'Na casa do meu Pai' },
  color: '#b5862f',
  ref: 'Lucas 2.41-52',
  scenes: SCENES
});
})();
