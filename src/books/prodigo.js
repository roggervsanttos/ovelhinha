/* =====================================================================
   LIVRO: O FILHO QUE VOLTOU  (Lucas 15.11-32)
   ===================================================================== */
(() => {
const SCENES = [];
const PAI = { kind: 'adult', skin: '#c98a5a', hair: '#d8d2c8', beard: 'long', beardCol: '#e9e4dc', browCol: '#cfc9c0', head: 'cloth', clothCol: '#fbf6ea', bandCol: '#8a4bb5', tunic: '#7b4c93', stripes: '#c9a6e0', cloak: '#c9a54e', cloakTrim: '#8a6a2a', belt: '#f2c14e' };
const FILHO = { kind: 'adult', skin: '#d39463', hair: '#3a2520', hairStyle: 'curly', hi: '#6a4030', tunic: '#3f93c7', stripes: '#9ccbe8', belt: '#7b4a2a' };
const FILHO_RICO = Object.assign({}, FILHO, { cloak: '#b6312f', cloakTrim: '#f2c14e', belt: '#f2c14e', bag: true });
const FILHO_POBRE = Object.assign({}, FILHO, { tunic: '#9a8a6a', stripes: '#7a6a4a', belt: '#5a4a3a', shoe: '#5a4a3a' });
const FILHO_FESTA = Object.assign({}, FILHO, { tunic: '#fbf6ea', stripes: '#f2c14e', cloak: '#b6312f', cloakTrim: '#f2c14e', belt: '#f2c14e', shoe: '#c9a54e' });
const IRMAO = { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', tunic: '#5e7d4a', stripes: '#9ab88a', belt: '#7b4a2a', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#5e7d4a' };
const AMIGOS = [
  { kind: 'adult', skin: '#e2a878', hair: '#1f1612', hairStyle: 'short', tunic: '#e86a9a', belt: '#f2c14e', head: 'cloth', clothCol: '#f2c14e', bandCol: '#e86a9a' },
  { kind: 'adult', skin: '#b9784c', head: 'scarf', clothCol: '#8a5fc2', hairStyle: 'long', hair: '#1f1612', tunic: '#f2c14e', belt: '#8a5fc2' },
  { kind: 'adult', skin: '#d99a6c', hair: '#5a3a26', beard: 'short', beardCol: '#5a3a26', tunic: '#3a9a8a', belt: '#f2c14e' }
];
const SERVOS = [
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', hairStyle: 'short', tunic: '#e9dcc0', belt: '#8a5a33', head: 'cloth', clothCol: '#c9a87a', bandCol: '#8a5a33' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#d9643f' }
];
const pai = o => person(Object.assign({}, PAI, o));
const SACO = `<g transform="translate(0,14)"><path d="M-16,-6 C-22,6 -22,24 -8,28 L8,28 C22,24 22,6 16,-6 Z" fill="#b57c46" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-12,-6 Q0,-14 12,-6" stroke="${OL}" stroke-width="2.4" fill="#9b6436"/><circle cx="0" cy="12" r="6" fill="#f2c14e" stroke="${OL}" stroke-width="2"/></g>`;

/* ---------- peças desta história ---------- */
function casaQuinta(x, y, s = 1, o = {}) {
  let g = `<rect x="-150" y="-200" width="300" height="200" fill="#ecd6aa" stroke="${OL}" stroke-width="3.4"/><path d="M-170,-196 L0,-270 L170,-196 Z" fill="#c46a3a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>`;
  g += `<path d="M-40,0 L-40,-110 A40,40 0 0 1 40,-110 L40,0 Z" fill="#6b4a33" stroke="${OL}" stroke-width="3"/>`;
  const win = o.noite ? '#ffd27a' : '#5a3a26';
  g += `<rect x="-120" y="-150" width="50" height="44" rx="6" fill="${win}" stroke="${OL}" stroke-width="3"/><rect x="70" y="-150" width="50" height="44" rx="6" fill="${win}" stroke="${OL}" stroke-width="3"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function vedacao(y, x0 = -40, x1 = 840) {
  let s = `<path d="M${x0},${y - 30} L${x1},${y - 30} M${x0},${y - 12} L${x1},${y - 12}" stroke="#8a5a33" stroke-width="7"/>`;
  for (let x = x0 + 20; x < x1; x += 70) s += `<rect x="${x - 6}" y="${y - 46}" width="12" height="48" rx="3" fill="#a46e3c" stroke="${OL}" stroke-width="2.4"/>`;
  return s;
}
function quinta(o = {}) {
  let s = bgDay(Object.assign({ sunX: 140, sunY: 120, sunR: 42 }, o.day || {}));
  s += hill([[-40, 400], [200, 366], [440, 390], [680, 356], [840, 380]], o.far || '#a9c97a');
  s += `<g opacity=".9">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${-40 + i * 150},430 L${40 + i * 150},430 L${120 + i * 150},520 L${-120 + i * 150},520 Z" fill="${i % 2 ? '#d9c86a' : '#bcd07a'}"/>`).join('')}</g>`;
  if (o.casa !== false) s += casaQuinta(o.casaX ?? 640, o.casaY ?? 520, o.casaS ?? .8, { noite: o.noite });
  s += `<rect x="-40" y="520" width="900" height="400" fill="${o.chao || '#b6d47e'}"/>`;
  s += olive(70, 540, .8) + olive(o.oliveX ?? 400, 520, .6, {});
  if (o.vedacao !== false) s += vedacao(560);
  return s;
}
function porco(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, flip: false, k: '', cls: 'breath' }, o);
  const c = '#f3a9b4', cd = '#e08a98';
  let g = limb(-36, -40, -38, -6, 14, cd) + limb(30, -40, 32, -6, 14, cd);
  g += `<path d="M-62,-58 c-14,-6 -16,-20 -6,-22 c8,-2 8,10 -2,10" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-62,-58 c-14,-6 -16,-20 -6,-22 c8,-2 8,10 -2,10" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  g += `<ellipse cx="-4" cy="-56" rx="62" ry="38" fill="${c}" stroke="${OL}" stroke-width="${SW}"/>`;
  g += limb(-50, -36, -52, -6, 14, c) + limb(18, -36, 20, -6, 14, c);
  for (const fx of [-52, 20, -38, 32]) g += `<rect x="${fx - 7}" y="-12" width="14" height="8" rx="3" fill="#8a5a5a" stroke="${OL}" stroke-width="2.2"/>`;
  g += `<g data-p="head"><path d="M44,-92 L52,-114 L64,-90 Z M70,-94 L86,-110 L88,-84 Z" fill="${cd}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><circle cx="66" cy="-70" r="30" fill="${c}" stroke="${OL}" stroke-width="${SW}"/><ellipse cx="90" cy="-62" rx="14" ry="11" fill="#f7c0c8" stroke="${OL}" stroke-width="2.6"/><ellipse cx="86" cy="-62" rx="2.6" ry="3.6" fill="${OL}"/><ellipse cx="95" cy="-62" rx="2.6" ry="3.6" fill="${OL}"/>${eyeDot(60, -80, 4)}${eyeDot(76, -82, 4)}</g>`;
  return critter(d, g, [16, -56, 90, 50]);
}
function lampadas(y = 110) {
  let s = `<path d="M-40,${y} Q200,${y + 60} 400,${y} Q600,${y + 60} 840,${y}" stroke="${OL}" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 16; i++) {
    const x = -20 + i * 56, t = ((x + 40) % 440) / 440, yy = y + Math.sin(t * Math.PI) * 30;
    s += `<g transform="translate(${x},${r1(yy + 14)})"><circle r="16" fill="#ffd27a" opacity=".3"/><circle r="8" fill="${['#ffd27a', '#ff9a8a', '#a8e0ff'][i % 3]}" stroke="${OL}" stroke-width="2"/></g>`;
  }
  return s;
}
function moedaChao(x, y, k) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><ellipse cx="0" cy="0" rx="18" ry="8" fill="#f2c14e" stroke="${OL}" stroke-width="2.6"/><ellipse cx="0" cy="-5" rx="18" ry="8" fill="#f6d36a" stroke="${OL}" stroke-width="2.6"/><path d="${sparkle(5)}" transform="translate(0,-5)" fill="#fff8d6"/></g></g>`;
}
function bandeja(x, y, item, k) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act">${item}${hitC(0, -20, 46)}</g></g>`;
}
const ROUPA = `<path d="M-30,-50 L-12,-56 Q0,-46 12,-56 L30,-50 L46,-26 L30,-18 L28,16 L-28,16 L-30,-18 L-46,-26 Z" fill="#fbf6ea" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-14,-52 L-16,14 M14,-52 L16,14" stroke="#f2c14e" stroke-width="5"/><path d="M-30,10 L30,10" stroke="#b6312f" stroke-width="6"/>`;
const ANEL = `<g transform="translate(0,-14)"><circle r="20" fill="none" stroke="${OL}" stroke-width="11"/><circle r="20" fill="none" stroke="#f2c14e" stroke-width="6"/><circle cy="-20" r="9" fill="#e5483f" stroke="${OL}" stroke-width="2.6"/><path d="${sparkle(5)}" transform="translate(-3,-23)" fill="#fff"/></g>`;
const SANDALIAS = `<g transform="translate(0,-10)">${[-18, 18].map(dx => `<g transform="translate(${dx},0) rotate(${dx > 0 ? 8 : -8})"><ellipse cx="0" cy="0" rx="12" ry="26" fill="#c9a54e" stroke="${OL}" stroke-width="2.6"/><path d="M-11,-8 L11,-8 M-10,8 L10,8" stroke="#8a5a33" stroke-width="4"/></g>`).join('')}</g>`;
function pensamento(x, y, k) {
  return `<g transform="translate(${x},${y})"><g data-k="${k}" opacity="0"><circle cx="-70" cy="90" r="9" fill="#fff" stroke="${OL}" stroke-width="2.4"/><circle cx="-52" cy="66" r="14" fill="#fff" stroke="${OL}" stroke-width="2.4"/>${blob([[-60, 0, 46], [-10, -24, 54], [50, -6, 50], [10, 26, 46], [-40, 30, 36]], '#ffffff', 3)}<g transform="translate(0,22) scale(.34)">${casaQuinta(0, 0, 1, {})}</g><g transform="translate(-78,6) scale(.3)">${pai({ face: 'joy', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, cls: '' })}</g></g></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'O Filho que Voltou',
  alt: 'Diante da casa da quinta, um pai idoso abraça com força o filho que voltou. O filho tem a roupa velha e rota, e o pai sorri, cheio de alegria.',
  cue: [400, 800],
  art() {
    let s = sky('sky', [[0, '#f2a25e'], [.45, '#fbd09a'], [.8, '#fdecc8'], [1, '#fdecc8']], 1100);
    s += sun(400, 560, 60, { face: true });
    s += hill([[-40, 760], [200, 720], [440, 744], [680, 710], [840, 730]], '#a9c97a');
    s += casaQuinta(640, 850, .8);
    s += `<rect x="-40" y="850" width="900" height="300" fill="#b6d47e"/><path d="M200,1100 C300,960 360,900 420,860" stroke="#e6d6a6" stroke-width="80" fill="none"/>`;
    s += `<g data-k="abraco">${person(Object.assign({}, FILHO_POBRE, { x: 360, y: 1050, s: 1.22, face: 'sad', look: .6, armL: { a: 60, b: -70 }, armR: { a: 70, b: -60 } }))}${pai({ x: 450, y: 1050, s: 1.26, flip: true, face: 'joy', look: .6, armL: { a: 30 }, armR: { a: 80, b: -80 } })}${hitC(400, 820, 150)}</g>`;
    s += flowerBand(8001, 1060, 1095, 8);
    return s;
  },
  setup(api) {
    api.tap(api.q('abraco'), 'O pai e o filho', () => { api.snd('heart'); api.burst(400, 760, 'heart', 7); api.bubble(450, 700, 'O meu filho voltou!', { key: 'p' }); });
  }
});

/* =====================================================================
   1 — UM PAI E DOIS FILHOS
   ===================================================================== */
SCENES.push({
  key: 'familia', title: 'Um pai e dois filhos', ref: 'Lucas 15.11', tint: 'meadow',
  text: [
    'Jesus contou esta história: um pai tinha dois filhos. Viviam numa quinta grande, com campos e animais.',
    'O filho mais novo estava sempre a sonhar com terras distantes.'
  ],
  fact: 'Jesus contava histórias assim, chamadas parábolas, para ensinar como Deus é.',
  hint: 'Toca no pai e nos dois filhos.',
  alt: 'Diante da casa da quinta, estão o pai de barba branca, o filho mais velho de verde e o filho mais novo de azul.',
  cue: [400, 520],
  art() {
    let s = quinta({});
    s += cow({ x: 560, y: 600, s: .45, flip: true }) + sheep({ x: 330, y: 610, s: .5 });
    s += person(Object.assign({}, IRMAO, { x: 200, y: 780, s: 1.02, face: 'smile', look: .4, armL: { a: 14, item: ITEM.staff(200, -1) }, armR: { a: 20 }, k: 'irmao' }));
    s += pai({ x: 400, y: 776, s: 1.06, face: 'joy', look: 0, armL: { a: 40, b: -10 }, armR: { a: 40, b: -10 }, k: 'pai' });
    s += person(Object.assign({}, FILHO, { x: 600, y: 786, s: .98, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 120, b: -20 }, k: 'filho' }));
    s += flowerBand(8101, 780, 800, 6);
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const visto = k => { vistos.add(k); if (vistos.size === 3) api.nudgeNext(2400); };
    api.tap(api.q('pai'), 'O pai', () => { api.snd('heart'); api.burst(400, 560, 'heart', 4); api.bubble(400, 440, 'Gosto muito dos meus filhos!', { key: 'b' }); visto('p'); });
    api.tap(api.q('irmao'), 'O filho mais velho', () => { api.snd('hello'); api.bubble(210, 450, 'Eu trabalho nos campos.', { key: 'b' }); visto('i'); });
    api.tap(api.q('filho'), 'O filho mais novo', () => { api.snd('hello'); api.bubble(600, 460, 'Um dia vou ver o mundo!', { key: 'b' }); visto('f'); });
  }
});

/* =====================================================================
   2 — «DÁ-ME A MINHA PARTE!»
   ===================================================================== */
SCENES.push({
  key: 'parte', title: '«Dá-me a minha parte!»', ref: 'Lucas 15.12', tint: 'sand',
  text: [
    'Um dia, o filho mais novo disse: «Pai, dá-me já a minha parte da herança!»',
    'O pai ficou triste, mas deu-lhe a parte dele.'
  ],
  fact: 'A herança é o que os pais deixam aos filhos. Normalmente, só se recebe muito mais tarde!',
  hint: 'Toca no saco de moedas.',
  alt: 'O pai, com ar triste, entrega um saco de moedas ao filho mais novo, que estende a mão todo contente.',
  cue: [470, 560],
  art() {
    let s = quinta({ casaX: 420, casaS: .9, vedacao: false, oliveX: 760 });
    s += pai({ x: 300, y: 776, s: 1.06, face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 70, b: -20 }, k: 'pai' });
    s += `<g transform="translate(468,590)" data-k="saco"><g class="act">${SACO.replace('translate(0,14)', 'translate(0,0) scale(1.6)')}${hitC(0, 18, 50)}</g></g>`;
    s += person(Object.assign({}, FILHO, { x: 600, y: 786, s: .98, flip: true, face: 'grin', look: .5, armL: { a: 14 }, armR: { a: 80, b: -20 }, k: 'filho' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('saco'), 'Saco de moedas', () => {
      api.snd('gift'); api.hop(api.q('saco'), 10);
      api.burst(470, 600, 'spark', 8, { col: '#f2c14e' });
      api.bubble(600, 450, 'Obrigado! Vou-me embora!', { key: 'f' });
      api.later(() => api.bubble(300, 440, 'Vou ter saudades tuas...', { key: 'p' }), 1400);
      if (!api.st.n) { api.st.n = true; api.nudgeNext(3200); }
    });
    api.tap(api.q('pai'), 'O pai', () => { api.snd('hm'); api.bubble(300, 440, 'Vou ter saudades tuas...', { key: 'p' }); });
    api.tap(api.q('filho'), 'O filho mais novo', () => { api.snd('laugh'); api.bubble(600, 450, 'Dá-me a minha parte!', { key: 'f' }); });
  }
});

/* =====================================================================
   3 — GASTOU TUDO!
   ===================================================================== */
SCENES.push({
  key: 'festas', title: 'Gastou tudo!', ref: 'Lucas 15.13-14', tint: 'night',
  text: [
    'O filho foi para uma terra muito longe. Lá, gastou o dinheiro todo em festas e em coisas de que não precisava.',
    'Quando o dinheiro acabou, os amigos foram-se embora. E veio uma grande fome àquela terra.'
  ],
  fact: 'Os amigos que só gostam do nosso dinheiro não são amigos de verdade.',
  hint: 'Toca nas moedas.',
  alt: 'Numa festa à noite, com luzinhas coloridas, o filho mais novo dança com amigos. No chão há moedas que vão desaparecendo.',
  cue: [400, 740],
  art() {
    let s = sky('sky', [[0, '#1f2350'], [.6, '#3a3a7a'], [1, '#5a4a8a']]) + starField(8301, 30, 0, 0, 800, 300, { big: .2 });
    s += town(40, 470, 1.1, { wall: '#5a5a8a', shade: '#4a4a7a', roof: '#6a6a9a' }) + town(440, 460, 1.1, { wall: '#5a5a8a', shade: '#4a4a7a', roof: '#6a6a9a' });
    s += lampadas(90);
    s += `<rect x="-40" y="560" width="900" height="300" fill="#6a5a7a"/>`;
    s += `<g data-k="amigos">${AMIGOS.map((a, i) => person(Object.assign({}, a, { x: [150, 640, 730][i], y: [770, 776, 760][i], s: .92, flip: i > 0, face: 'laugh', look: i ? .4 : .4, legs: i === 1 ? 'hop' : 'wide', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, cls: 'bob' }))).join('')}</g>`;
    s += `<g data-k="alegre">${person(Object.assign({}, FILHO_RICO, { x: 400, y: 776, s: 1, face: 'laugh', look: 0, legs: 'wide', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } }))}</g>`;
    s += `<g data-k="triste" opacity="0" style="pointer-events:none">${person(Object.assign({}, FILHO_POBRE, { x: 400, y: 776, s: 1, face: 'sad', look: 0, armL: { a: 14 }, armR: { a: 14 } }))}</g>`;
    [[300, 770], [350, 782], [450, 782], [500, 770], [400, 790]].forEach(([x, y], i) => s += moedaChao(x, y, 'm' + i));
    s += `<rect class="hit" data-k="moedas" x="260" y="740" width="280" height="60" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    let n = 5;
    api.tap(api.q('moedas'), 'Moedas', async () => {
      if (n <= 0) { api.snd('hm'); api.bubble(400, 460, 'Já não tenho nada...', { key: 'f' }); return; }
      if (api.st.busy) return;
      api.st.busy = true;
      n--;
      const m = api.q('m' + n);
      api.snd('chime', ['C6', 'D6', 'E6', 'G6', 'A6'][n]);
      await api.anim(api.act(m), [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: `translate(${(n % 2 ? 1 : -1) * 120}px,-200px)`, opacity: 0 }], { duration: 600, fill: 'forwards' });
      api.badge(400, 150, String(n), { key: 'n' });
      api.st.busy = false;
      if (n === 0) {
        api.anim(api.q('amigos'), [{ opacity: 1 }, { opacity: 0 }], { duration: 1200, fill: 'forwards' });
        api.anim(api.q('alegre'), [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' });
        await api.anim(api.q('triste'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
        api.bubble(400, 460, 'Já não tenho nada...', { key: 'f' });
        api.nudgeNext(2800);
      }
    });
  }
});

/* =====================================================================
   4 — A TOMAR CONTA DOS PORCOS
   ===================================================================== */
SCENES.push({
  key: 'porcos', title: 'A tomar conta dos porcos', ref: 'Lucas 15.15-16', tint: 'stone',
  text: [
    'Para não passar fome, arranjou trabalho a tomar conta de porcos.',
    'Tinha tanta fome que até queria comer a comida dos porcos! Mas ninguém lhe dava nada.'
  ],
  fact: 'Para os judeus, tomar conta de porcos era um dos piores trabalhos que havia.',
  hint: 'Toca nos porcos e no filho.',
  alt: 'Num curral com lama, o filho mais novo, com a roupa velha e rota, está sentado triste. À volta dele há três porcos cor-de-rosa.',
  cue: [250, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 120, sunR: 38, clouds: false, sky: [[0, '#b9c4cc'], [.6, '#dfe3dc'], [1, '#ece4cc']] });
    s += hill([[-40, 420], [220, 396], [460, 414], [700, 390], [840, 406]], '#c9b98f');
    s += `<rect x="-40" y="470" width="900" height="400" fill="#c9b07a"/><ellipse cx="520" cy="720" rx="260" ry="60" fill="#8a6a4a" opacity=".7"/><ellipse cx="560" cy="712" rx="160" ry="30" fill="#7a5a3a" opacity=".6"/>`;
    s += vedacao(560);
    s += `<g transform="translate(700,600)"><path d="M-70,0 L-60,-40 L60,-40 L70,0 Z" fill="#8a5a33" stroke="${OL}" stroke-width="3"/><path d="M-56,-36 L56,-36" stroke="#5a3a26" stroke-width="6"/></g>`;
    s += rock(220, 760, 170, 50, { fill: '#b9ab94', shade: '#9d8f78' });
    s += person(Object.assign({}, FILHO_POBRE, { x: 220, y: 748, s: .98, ...{ legs: 'sit', drop: 30, hemY: -62 }, face: 'sad', look: .4, armL: { a: -20, b: -40 }, armR: { a: -20, b: -40 }, k: 'filho' }));
    s += porco({ x: 450, y: 720, s: .8, k: 'p0' }) + porco({ x: 640, y: 760, s: .9, flip: true, k: 'p1' }) + porco({ x: 560, y: 650, s: .7, k: 'p2' });
    return s;
  },
  setup(api) {
    for (let i = 0; i < 3; i++) api.tap(api.q('p' + i), 'Porco', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('grunt'); api.hop(api.q('p' + i), 10); api.bubble(x + 30, y - 130 * sc, 'Oinc, oinc!', { key: 'p', size: 26, plain: true, dur: 1000 }); });
    api.tap(api.q('filho'), 'O filho mais novo', () => { api.snd('hm'); api.bubble(230, 460, 'Tenho tanta fome...', { key: 'f' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2400); } });
  }
});

/* =====================================================================
   5 — VOU VOLTAR PARA CASA!
   ===================================================================== */
SCENES.push({
  key: 'volta', title: 'Vou voltar para casa!', ref: 'Lucas 15.17-20', tint: 'sand',
  text: [
    'Então, ele pensou: «Em casa do meu pai, até os trabalhadores têm comida com fartura! Vou voltar e dizer-lhe: Pai, fiz mal. Já não mereço ser teu filho.»',
    'E pôs-se a caminho de casa.'
  ],
  fact: 'Pedir desculpa é o primeiro passo para voltar para quem amamos.',
  hint: 'Toca no filho para ele se lembrar de casa.',
  alt: 'O filho mais novo, de roupa rota, pensa na casa do pai: num balão de pensamento aparecem a quinta e o pai de braços abertos.',
  cue: [300, 560],
  art() {
    let s = bgDay({ sunX: 660, sunY: 120, sunR: 38, sky: [[0, '#b9d4e4'], [.6, '#e8eedf'], [1, '#ece4cc']] });
    s += hill([[-40, 420], [220, 396], [460, 414], [700, 390], [840, 406]], '#c9b98f');
    s += `<rect x="-40" y="470" width="900" height="400" fill="#d6c196"/><path d="M-40,700 C200,680 400,690 560,660 C680,640 760,600 840,580 L840,640 C760,660 680,700 560,720 C400,750 200,760 -40,770 Z" fill="#ead7aa"/>`;
    s += pensamento(520, 260, 'pensa');
    s += person(Object.assign({}, FILHO_POBRE, { x: 300, y: 740, s: 1, face: 'worry', look: .5, armL: { a: 14 }, armR: { a: 150, b: -140 }, k: 'filho' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('filho'), 'O filho mais novo', async () => {
      api.bubble(300, 440, 'Vou voltar para casa do meu pai!', { key: 'f' });
      if (api.st.feito) { api.snd('hello'); return; }
      api.st.feito = true;
      api.snd('chime', 'E6');
      await api.anim(api.q('pensa'), [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 600, fill: 'forwards' });
      await api.wait(1600);
      api.snd('tiptoe');
      await api.anim(api.act(api.q('filho')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(260px,-60px)' }], { duration: 2200, fill: 'forwards', easing: 'ease-in-out' });
      api.nudgeNext(1600);
    });
  }
});

/* =====================================================================
   6 — O PAI CORREU!
   ===================================================================== */
SCENES.push({
  key: 'correu', title: 'O pai correu!', ref: 'Lucas 15.20-21', tint: 'gold',
  text: [
    'Ainda ele estava longe quando o pai o viu. O pai teve muita pena dele, correu ao seu encontro, abraçou-o e deu-lhe muitos beijinhos!',
    'O filho disse: «Pai, fiz mal. Já não mereço ser teu filho.»'
  ],
  fact: 'O pai devia olhar para a estrada todos os dias, à espera do filho!',
  hint: 'Toca no pai para ele correr.',
  alt: 'Junto à quinta, o pai de barba branca corre de braços abertos para o filho, que vem a chegar pela estrada.',
  cue: [600, 520],
  art() {
    let s = quinta({ casaX: 660, casaS: .75 });
    s += `<path d="M-40,760 C160,740 360,720 560,640 L620,640 C440,740 220,790 -40,800 Z" fill="#e6d6a6"/>`;
    s += `<g data-k="filho">${person(Object.assign({}, FILHO_POBRE, { x: 170, y: 770, s: .9, legs: 'walk', face: 'sad', look: .5, armL: { a: 14 }, armR: { a: 14 } }))}</g>`;
    s += `<g data-k="pai">${pai({ x: 620, y: 700, s: .9, flip: true, legs: 'run', face: 'joy', look: .5, armL: { a: 120, b: -20 }, armR: { a: 120, b: -20 } })}${hitC(620, 600, 90)}</g>`;
    s += `<g data-k="abraco" opacity="0" style="pointer-events:none">${person(Object.assign({}, FILHO_POBRE, { x: 230, y: 770, s: .95, face: 'sad', look: .6, armL: { a: 60, b: -70 }, armR: { a: 70, b: -60 } }))}${pai({ x: 300, y: 770, s: .98, flip: true, face: 'joy', look: .6, armL: { a: 30 }, armR: { a: 80, b: -80 } })}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('pai'), 'O pai', async () => {
      if (api.st.feito) { api.snd('heart'); api.burst(265, 560, 'heart', 5); return; }
      api.st.feito = true;
      api.snd('gallop');
      api.bubble(620, 400, 'O meu filho!', { key: 'p' });
      await api.anim(api.q('pai'), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-330px,70px)' }], { duration: 1300, fill: 'forwards', easing: 'ease-in' });
      api.anim(api.q('pai'), [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      api.anim(api.q('filho'), [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      await api.anim(api.q('abraco'), [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
      api.snd('heart');
      api.burst(265, 560, 'heart', 8);
      api.bubble(250, 420, 'Pai, fiz mal...', { key: 'f' });
      api.nudgeNext(2800);
    });
  }
});

/* =====================================================================
   7 — UMA GRANDE FESTA!
   ===================================================================== */
SCENES.push({
  key: 'festa', title: 'Uma grande festa!', ref: 'Lucas 15.22-24', tint: 'gold',
  text: [
    'Mas o pai disse aos empregados: «Tragam depressa a melhor roupa, um anel e sandálias! Vamos fazer uma festa!»',
    '«O meu filho estava perdido e foi encontrado!»'
  ],
  fact: 'O anel mostrava que ele continuava a ser filho, e não um empregado.',
  hint: 'Toca na roupa, no anel e nas sandálias.',
  alt: 'No pátio da quinta, os empregados trazem roupa nova, um anel e sandálias para o filho que voltou. O pai sorri de braços abertos.',
  cue: [560, 600],
  art() {
    let s = quinta({ casaX: 400, casaS: .9, vedacao: false, oliveX: 760 });
    s += lampadas(80);
    s += pai({ x: 170, y: 776, s: 1.04, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'pai' });
    s += `<g data-k="pobre">${person(Object.assign({}, FILHO_POBRE, { x: 340, y: 786, s: 1, face: 'o', look: .5, armL: { a: 14 }, armR: { a: 14 } }))}</g>`;
    s += `<g data-k="novo" opacity="0" style="pointer-events:none">${person(Object.assign({}, FILHO_FESTA, { x: 340, y: 786, s: 1, face: 'joy', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } }))}<g transform="translate(395,560)"><circle r="9" fill="none" stroke="#f2c14e" stroke-width="5"/></g></g>`;
    s += person(Object.assign({}, SERVOS[0], { x: 560, y: 786, s: .95, flip: true, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 70, b: -40 } }));
    s += person(Object.assign({}, SERVOS[1], { x: 690, y: 780, s: .95, flip: true, face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 70, b: -40 } }));
    s += bandeja(500, 640, ROUPA, 'roupa') + bandeja(620, 620, ANEL, 'anel') + bandeja(740, 650, SANDALIAS, 'sandalias');
    return s;
  },
  setup(api) {
    let n = 0;
    const POS = { roupa: [500, 640], anel: [620, 620], sandalias: [740, 650] };
    for (const k of ['roupa', 'anel', 'sandalias']) api.tap(api.q(k), { roupa: N('Roupa nova'), anel: N('Anel'), sandalias: N('Sandálias') }[k], async () => {
      if (api.st[k]) return;
      api.st[k] = true;
      const [x, y] = POS[k];
      api.snd('gift');
      await api.anim(api.act(api.q(k)), [{ transform: 'translate(0px,0px) scale(1)', opacity: 1 }, { transform: `translate(${340 - x}px,${580 - y}px) scale(.5)`, opacity: 0 }], { duration: 700, fill: 'forwards' });
      api.burst(340, 580, 'spark', 6);
      if (++n === 3) {
        api.anim(api.q('pobre'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
        await api.anim(api.q('novo'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
        api.snd('tambourine');
        api.burst(340, 520, 'confetti', 14);
        api.bubble(180, 430, 'O meu filho estava perdido e foi encontrado!', { key: 'p', dur: 3200 });
        api.nudgeNext(3200);
      }
    });
    api.tap(api.q('pai'), 'O pai', () => { api.snd('fanfare'); api.bubble(180, 430, 'Vamos fazer uma festa!', { key: 'p' }); });
  }
});

/* =====================================================================
   8 — DEUS É COMO ESSE PAI
   ===================================================================== */
SCENES.push({
  key: 'irmao', title: 'Deus é como esse pai', ref: 'Lucas 15.25-32', tint: 'dusk',
  text: [
    'O irmão mais velho ficou zangado e não quis entrar na festa. Mas o pai foi falar com ele: «Filho, tu estás sempre comigo, e tudo o que é meu é teu.»',
    'Deus é como esse pai: quando nos afastamos, Ele espera por nós de braços abertos!'
  ],
  fact: 'Jesus contou esta história para mostrar o quanto Deus nos ama, a todos!',
  hint: 'Toca no irmão e no pai.',
  alt: 'Ao entardecer, cá fora, o irmão mais velho está de braços cruzados. O pai fala com ele com carinho. Da casa iluminada sai música.',
  cue: [560, 520],
  art() {
    let s = quinta({ casaX: 260, casaS: .9, oliveX: 640, noite: true, day: { sunX: 700, sunY: 300, sky: [[0, '#5a6aa8'], [.5, '#e08a7a'], [.8, '#f2b98a'], [1, '#f2b98a']] } });
    s += `<g data-k="notas">${[0, 1, 2].map(i => `<g transform="translate(${200 + i * 60},${330 - i * 20})"><g class="float" style="--d:${2.4 + i * .5}s;${dl(3)}">${note(['#2f6db5', '#d9433b', '#3a9a4a'][i])}</g></g>`).join('')}</g>`;
    s += pai({ x: 450, y: 776, s: 1.04, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 80, b: -30 }, k: 'pai' });
    s += `<g data-k="zangado">${person(Object.assign({}, IRMAO, { x: 620, y: 780, s: 1.02, flip: true, face: 'angry', look: .5, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } }))}</g>`;
    s += `<g data-k="contente" opacity="0" style="pointer-events:none">${person(Object.assign({}, IRMAO, { x: 620, y: 780, s: 1.02, flip: true, face: 'smile', look: .5, armL: { a: 30 }, armR: { a: 60, b: -30 } }))}</g>`;
    s += `<rect class="hit" data-k="irmao" x="550" y="500" width="150" height="290" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('irmao'), 'O irmão mais velho', () => { api.snd('grunt'); api.bubble(620, 440, api.st.feito ? 'Está bem, pai. Eu vou à festa!' : 'Não é justo!', { key: 'i' }); });
    api.tap(api.q('pai'), 'O pai', async () => {
      api.snd('heart'); api.burst(450, 560, 'heart', 5);
      api.bubble(430, 430, 'Filho, tu estás sempre comigo!', { key: 'p' });
      if (api.st.feito) return;
      api.st.feito = true;
      await api.wait(1400);
      api.anim(api.q('zangado'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('contente'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.nudgeNext(2600);
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
  alt: 'Noite estrelada sobre a quinta. As janelas da casa estão acesas, e uma ovelhinha dorme junto à vedação.',
  cue: [430, 160],
  questions: [
    ['O que pediu o filho mais novo ao pai?', 'A sua parte da herança.'],
    ['O que aconteceu ao dinheiro?', 'Gastou-o todo em festas.'],
    ['De que animais tomou ele conta?', 'De porcos.'],
    ['O que fez o pai quando o viu ao longe?', 'Correu, abraçou-o e deu-lhe beijinhos!'],
    ['Que presentes lhe deu o pai?', 'Roupa nova, um anel e sandálias.']
  ],
  verse: ['O meu filho estava perdido e foi encontrado!', 'Lucas 15.24'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(8901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b');
    s += `<g opacity=".9">${casaQuinta(600, 680, .55, { noite: true })}</g>`;
    s += hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 672]], '#2c584f');
    s += `<g opacity=".6">${vedacao(720, -40, 420)}</g>`;
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
  id: 'prodigo',
  title: 'O Filho que Voltou',
  cover: { kicker: 'Uma história da Bíblia', title: 'O Filho', small: 'que Voltou', sub: 'O amor do Pai não tem fim' },
  color: '#c76b2a',
  ref: 'Lucas 15.11-32',
  scenes: SCENES
});
})();
