/* =====================================================================
   LIVRO: JESUS E O CEGO BARTIMEU  (Marcos 10.46-52; Lucas 18.35-43)
   ===================================================================== */
(() => {
const SCENES = [];
const REMENDOS = `<g stroke="${OL}" stroke-width="2" stroke-linejoin="round"><rect x="-22" y="-128" width="16" height="14" fill="#8a7a5a" transform="rotate(-8 -14 -121)"/><rect x="8" y="-70" width="18" height="15" fill="#b9a67e" transform="rotate(10 17 -62)"/></g><g stroke="#5a4a3a" stroke-width="1.4"><path d="M-20,-126 l3,3 M-12,-126 l3,3 M12,-67 l3,3 M20,-67 l3,3"/></g>`;
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const BARTIMEU = { kind: 'adult', skin: '#c98a5a', hair: '#3a2a20', hairStyle: 'short', beard: 'bushy', beardCol: '#3a2a20', tunic: '#a8987a', belt: '#6b4a33', front: REMENDOS, shut: true, shoe: '#6b4a33' };
const PEDRO = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'bushy', beardCol: '#5a3a26', tunic: '#3f7fb0', belt: '#7b4a2a' };
const JOAO = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'short', tunic: '#5e9a43', belt: '#7b4a2a' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'adult', skin: '#d99a6c', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#e9c46a', belt: '#b5402f' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#8a7f78', beard: 'long', beardCol: '#cfc9c0', browCol: '#cfc9c0', tunic: '#7a5a8a', belt: '#e9c46a', head: 'cloth', clothCol: '#efe4cc', bandCol: '#7a5a8a' }
];
const jesus = o => person(Object.assign({}, JESUS, o));
const bart = o => person(Object.assign({}, BARTIMEU, o));

/* ---------- peças desta história ---------- */
function jericho(o = {}) {
  let s = '';
  s += `<rect x="${o.x0 ?? -40}" y="250" width="${o.w ?? 560}" height="200" fill="#e2c497" stroke="${OL}" stroke-width="4"/>`;
  let br = '';
  for (let r = 0; r < 6; r++) for (let xx = (o.x0 ?? -40) + (r % 2 ? 26 : 0); xx < (o.x0 ?? -40) + (o.w ?? 560); xx += 52) br += `<rect x="${xx}" y="${256 + r * 32}" width="48" height="28" rx="3" fill="#d6b582"/>`;
  s += `<g opacity=".7">${br}</g>`;
  for (let xx = o.x0 ?? -40; xx < (o.x0 ?? -40) + (o.w ?? 560); xx += 40) s += `<rect x="${xx}" y="226" width="24" height="28" fill="#e2c497" stroke="${OL}" stroke-width="3"/>`;
  const gx = o.gate ?? 260;
  s += `<rect x="${gx - 70}" y="200" width="140" height="250" fill="#ead2a6" stroke="${OL}" stroke-width="4"/><path d="M${gx - 46},450 L${gx - 46},330 A46,46 0 0 1 ${gx + 46},330 L${gx + 46},450 Z" fill="#5a3a26" stroke="${OL}" stroke-width="3.4"/>`;
  for (const dx of [-60, -24, 12, 48]) s += `<rect x="${gx + dx - 2}" y="176" width="22" height="28" fill="#ead2a6" stroke="${OL}" stroke-width="3"/>`;
  return s;
}
function road(o = {}) {
  return `<path d="M-40,${o.y0 ?? 560} C200,${(o.y0 ?? 560) - 10} 600,${(o.y0 ?? 560) + 10} 860,${(o.y0 ?? 560) - 6} L860,${o.y1 ?? 700} C600,${(o.y1 ?? 700) + 10} 200,${(o.y1 ?? 700) - 10} -40,${o.y1 ?? 700} Z" fill="#efdfb6"/><g fill="#d8c08c" opacity=".7">${[[90, 600], [260, 650], [470, 620], [690, 660]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="6"/>`).join('')}</g>`;
}
function bowl(x, y, k = 'tigela', coins = 2) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><path d="M-28,-6 C-26,16 26,16 28,-6 Z" fill="#b07b4a" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-6" rx="28" ry="8" fill="#7a5034" stroke="${OL}" stroke-width="3"/><g data-k="moedas">${[...Array(coins)].map((_, i) => `<circle cx="${-8 + i * 10}" cy="-8" r="5" fill="#f2c14e" stroke="${OL}" stroke-width="1.6"/>`).join('')}</g>${hitC(0, -4, 40)}</g></g>`;
}
function cloakFlat(x, y, s = 1, k = '') {
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act"><path d="M-90,0 C-80,-26 -40,-34 0,-30 C40,-34 80,-26 92,0 C60,12 -60,12 -90,0 Z" fill="#6a5a8a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-70,-6 Q0,-18 70,-6" stroke="#8a7aa8" stroke-width="5" fill="none"/>${k ? hitC(0, -10, 70) : ''}</g></g>`;
}
function oilLamp(x, y, k) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><g data-k="${k}luz" opacity="0"><g transform="translate(26,-20)"><g class="flicker"><path d="M0,-22 C7,-12 9,-5 6,-1 C3,3 -3,3 -6,-1 C-9,-5 -7,-12 0,-22 Z" fill="#ffb238"/><path d="M0,-12 C3,-7 4,-4 3,-2 C1,0 -1,0 -3,-2 C-4,-4 -3,-7 0,-12 Z" fill="#fff1a8"/></g></g></g><path d="M-26,-6 C-26,-22 26,-24 30,-14 L44,-18 L40,-8 C36,6 -20,10 -26,-6 Z" fill="#c97a4a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-14" rx="8" ry="3" fill="#5a3a26"/>${hitC(10, -14, 40)}</g></g>`;
}
function soundIcon(i) {
  if (i === 0) return dove({ x: -6, y: 14, s: 1.4, col: '#3f93c7', wing: '#2f7fb8', cls: '' });
  if (i === 1) return `<g transform="translate(-72,108) scale(.62)">${equine({ x: 0, y: 0, s: 1, kind: 'donkey', cls: '' })}</g>`;
  if (i === 2) return `<g transform="translate(-26,64)">${person(Object.assign({}, POVO[2], { s: .52, face: 'laugh', cls: '' }))}</g><g transform="translate(30,70)">${person(Object.assign({}, POVO[5], { s: .5, face: 'joy', cls: '' }))}</g>`;
  if (i === 3) return `<g transform="translate(0,10)"><path d="M-22,0 C-34,-20 -30,-50 -14,-58 L-14,-70 L14,-70 L14,-58 C30,-50 34,-20 22,0 Z" fill="#c97a4a" stroke="${OL}" stroke-width="3.2" transform="translate(0,40)"/><path d="M-26,6 Q0,14 26,6" stroke="#e9c46a" stroke-width="5" fill="none"/><g fill="#5ab0de">${[[-30, -40], [30, -30], [0, -56]].map(([a, b]) => `<path d="M${a},${b - 8} C${a + 5},${b} ${a + 6},${b + 5} ${a},${b + 8} C${a - 6},${b + 5} ${a - 5},${b} ${a},${b - 8} Z" stroke="${OL}" stroke-width="1.6"/>`).join('')}</g></g>`;
  if (i === 4) return `<g transform="translate(-30,10)"><ellipse rx="24" ry="10" fill="#8a5a33" stroke="${OL}" stroke-width="2.6" transform="rotate(-20)"/></g><g transform="translate(26,30)"><ellipse rx="24" ry="10" fill="#8a5a33" stroke="${OL}" stroke-width="2.6" transform="rotate(-20)"/></g><path d="M-50,-20 q10,-10 20,0 M14,4 q10,-10 20,0" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(0,90) scale(.7)">${palm(0, 0, 1)}</g>`;
}
const SONS = [[180, 170, 'tweet', N('Piu-piu!')], [610, 210, 'heehaw', N('Ió-ió!')], [210, 450, 'laugh', N('Ha-ha-ha!')], [420, 330, 'pour', N('Glub-glub!')], [610, 470, 'tiptoe', N('Toc-toc!')], [400, 120, 'wind', N('Fuuu!')]];
const SONS_NOMES = ['Passarinho', 'Burro', N('Crianças a rir'), N('Água no jarro'), N('Passos na estrada'), N('Vento nas palmeiras')];

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Jesus e o Cego Bartimeu',
  alt: 'Na estrada de Jericó, cheia de palmeiras, Jesus sorri para Bartimeu, que abre os braços de alegria porque agora consegue ver. Brilhos coloridos enchem o ar.',
  cue: [560, 860],
  art() {
    let s = sky('sky', [[0, '#7cc4ec'], [.45, '#c4e8f6'], [.72, '#fdecc8'], [1, '#fdecc8']], 1100);
    s += sun(660, 470, 46, { face: true }) + cloud(170, 480, .9) + cloud(450, 560, .6, { dx: -26 });
    s += `<g transform="translate(0,420)">${jericho({ x0: -40, w: 420, gate: 170 })}</g>`;
    s += palm(470, 880, .8) + palm(740, 870, .7) + palm(60, 900, .6);
    s += hill([[-40, 880], [200, 866], [420, 878], [640, 860], [840, 872]], '#c9b07c');
    s += `<rect x="-40" y="878" width="900" height="300" fill="#e2cf9a"/>` + `<g transform="translate(0,360)">${road({ y0: 560, y1: 720 })}</g>`;
    s += crowd2([[90, 980, .56], [150, 990, .6], [700, 980, .58]]);
    s += jesus({ x: 300, y: 1050, s: 1.1, face: 'joy', look: .5, armL: { a: 14 }, armR: { a: 80, b: -20 }, k: 'jesus' });
    s += bart({ x: 540, y: 1056, s: 1.06, shut: false, face: 'grin', look: -.4, armL: { a: 140, b: -20 }, armR: { a: 140, b: -20 }, k: 'bart' });
    s += flowerBand(1301, 1066, 1095, 7);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(300, 760, 'heart', 5); api.bubble(300, 720, 'A tua fé curou-te!', { key: 'j' }); });
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('tada'); api.hop(api.q('bart'), 16); api.burst(540, 760, 'spark', 10, { col: '#fff1b0' }); api.bubble(540, 720, 'Eu consigo ver!', { key: 'b' }); });
  }
});
function crowd2(pts, o = {}) {
  return pts.map(([x, y, sc], i) => person(Object.assign({}, POVO[(i + (o.off || 0)) % POVO.length], { x, y, s: sc, face: (o.faces || ['joy', 'smile', 'grin'])[i % 3], look: o.look ?? 0, armL: o.armL || { a: 14 }, armR: o.armR || { a: 14 }, k: o.k ? o.k + i : '', legs: o.legs || 'stand' }, o.extra ? o.extra(i) : {}))).join('');
}

/* =====================================================================
   1 — NA BEIRA DA ESTRADA
   ===================================================================== */
SCENES.push({
  key: 'estrada', title: 'À beira da estrada', ref: 'Marcos 10.46', tint: 'sand',
  text: [
    'Perto da cidade de Jericó, um homem ficava sentado à beira da estrada. Chamava-se Bartimeu.',
    'Bartimeu era cego: os olhos dele não viam nada. Todos os dias, pedia ajuda a quem passava.'
  ],
  fact: 'Jericó era a cidade das palmeiras.',
  hint: 'Toca no Bartimeu e na tigela.',
  alt: 'Na saída da cidade de Jericó, com muralhas e palmeiras, Bartimeu está sentado à beira da estrada, de olhos fechados, com uma tigela à frente. Pessoas passam pela estrada.',
  cue: [560, 640],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += jericho();
    s += palm(560, 470, .7) + palm(720, 460, .62);
    s += `<rect x="-40" y="450" width="900" height="450" fill="#e2cf9a"/>` + road({ y0: 470, y1: 610 });
    s += `<g data-k="passa">${person(Object.assign({}, POVO[1], { x: 150, y: 590, s: .7, legs: 'walk', face: 'smile', look: .5, armL: { a: 150, b: -30, item: `<g transform="translate(0,-30)"><path d="M-14,0 C-22,-14 -20,-34 -10,-40 L-10,-48 L10,-48 L10,-40 C20,-34 22,-14 14,0 Z" fill="#c97a4a" stroke="${OL}" stroke-width="2.6"/></g>`, ia: 0 }, armR: { a: 20 } }))}${hitC(150, 500, 60)}</g>`;
    s += equine({ x: 330, y: 600, s: .5, kind: 'donkey', pack: '#2f8a83', k: 'burro' });
    s += bird(260, 160, 1) + bird(310, 190, .8, { d: 11 });
    s += cloakFlat(560, 730, 1.05);
    s += bart({ x: 560, y: 724, s: 1.04, legs: 'sit', drop: 30, hemY: -62, face: 'sad', look: -.2, armL: { a: 30, b: 40 }, armR: { a: 60, b: -30 }, k: 'bart' });
    s += bowl(650, 742, 'tigela');
    s += grassBand(1401, 740, 790, 6, ['#a8a85a']);
    return s;
  },
  setup(api) {
    let coins = 2;
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('hm'); api.bubble(560, 450, 'Uma ajuda, por favor!', { key: 'b' }); });
    api.tap(api.q('tigela'), 'Tigela de Bartimeu', () => {
      api.snd('clank', 1.6);
      if (coins < 6) { const c = svgEl('circle', { cx: -14 + coins * 6, cy: -10 - (coins % 2) * 3, r: 5, fill: '#f2c14e', stroke: OL, 'stroke-width': 1.6 }); api.q('moedas').append(c); coins++; }
      api.bubble(560, 450, 'Obrigado! Deus o abençoe!', { key: 'b' });
    });
    api.tap(api.q('passa'), 'Mulher com um jarro', () => { api.snd('tiptoe'); api.anim(api.q('passa'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(40px)' }, { transform: 'translateX(0px)' }], { duration: 1200 }); });
    api.tap(api.q('burro'), 'Burro', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
  }
});

/* =====================================================================
   2 — UM MUNDO DE SONS
   ===================================================================== */
SCENES.push({
  key: 'sons', title: 'Um mundo de sons', ref: 'Marcos 10.46', tint: 'night',
  text: [
    'Bartimeu não via as cores. Não via o céu. Não via o rosto das pessoas.',
    'Mas ouvia tudo! Os passarinhos, os passos na estrada, o burro e as crianças a brincar.',
    'Consegues descobrir os sons?'
  ],
  fact: 'Quem não vê aprende a conhecer o mundo pelos sons, pelos cheiros e pelo toque.',
  hint: 'Toca nos sons para descobrires o que são.',
  alt: 'Uma página escura, como o mundo de Bartimeu. Círculos de som mostram, um a um, um passarinho, um burro, crianças a rir, um jarro de água, passos na estrada e o vento nas palmeiras.',
  cue: [180, 170],
  art() {
    let s = `<defs>${rg('escuro', [[0, '#2a3160'], [.7, '#161b3c'], [1, '#0e1230']])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('escuro')}"/>`;
    SONS.forEach(([x, y], i) => {
      s += `<defs><clipPath id="${ID('som' + i)}"><circle r="70"/></clipPath></defs>`;
      s += `<g transform="translate(${x},${y})" data-k="som${i}"><g class="act"><circle class="pulse" r="40" fill="none" stroke="#9aa6e0" stroke-width="5" style="${dl(2)}"/><circle class="pulse" style="animation-delay:-.8s" r="40" fill="none" stroke="#c9d0f4" stroke-width="4"/><path d="M-10,-14 q16,14 0,28 M4,-24 q26,24 0,48" stroke="#c9d0f4" stroke-width="5" fill="none" stroke-linecap="round" transform="translate(-6,0)"/><g data-k="vis${i}" opacity="0"><circle r="74" fill="#fdf3d4" stroke="${OL}" stroke-width="4"/><g clip-path="${UR('som' + i)}"><rect x="-80" y="-80" width="160" height="160" fill="${['#cfe8f4', '#f6e3b8', '#e9f4dc', '#f6e3b8', '#efdfb6', '#cfe8f4'][i]}"/>${soundIcon(i)}</g></g>${hitC(0, 0, 74)}</g></g>`;
    });
    s += `<defs>${rg('foco', [[0, '#fff3c4', .35], [1, '#fff3c4', 0]])}</defs><circle cx="400" cy="720" r="200" fill="${UR('foco')}"/>`;
    s += bart({ x: 400, y: 830, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: 0, armL: { a: 30, b: 40 }, armR: { a: 130, b: -60 }, k: 'bart' });
    return s;
  },
  setup(api) {
    const found = new Set();
    SONS.forEach(([x, y, snd, label], i) => api.tap(api.q('som' + i), SONS_NOMES[i], async () => {
      Array.isArray(snd) ? api.snd(...snd) : api.snd(snd);
      api.bubble(x, y - 50, label, { key: 'l' + i, size: 30, plain: true, dur: 1400 });
      if (found.has(i)) return;
      found.add(i);
      api.anim(api.q('vis' + i), [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 500, fill: 'forwards', easing: 'cubic-bezier(.3,1.4,.5,1)' });
      if (found.size === SONS.length) { await api.wait(1200); api.snd('hm'); api.bubble(400, 560, 'Como será tudo isto?', { key: 'b', dur: 2800 }); api.nudgeNext(2600); }
    }));
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('hm'); api.bubble(400, 560, 'Eu oiço tudinho!', { key: 'b' }); });
  }
});

/* =====================================================================
   3 — QUEM ESTÁ PASSANDO?
   ===================================================================== */
SCENES.push({
  key: 'multidao', title: 'Quem está a passar?', ref: 'Marcos 10.46-47; Lucas 18.36-37', tint: 'sand',
  text: [
    'Um dia, Bartimeu ouviu um grande barulho de gente a andar. Perguntou o que era. Alguém respondeu:',
    { q: 'É Jesus que está a passar!', who: 'outro' }
  ],
  fact: 'Muita gente andava com Jesus.',
  hint: 'Toca na multidão e no Bartimeu.',
  alt: 'Uma multidão vem pela estrada com Jesus no meio. Sentado à beira do caminho, Bartimeu põe a mão atrás da orelha para ouvir melhor.',
  cue: [250, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#d7c48e');
    s += palm(90, 470, .6) + palm(760, 470, .55);
    s += `<rect x="-40" y="460" width="900" height="440" fill="#e2cf9a"/>` + road({ y0: 480, y1: 640 });
    s += `<g data-k="povo"><g class="act">${blob([[120, 560, 40], [240, 540, 50], [360, 560, 40]], '#efe2c0', 0)}`;
    s += crowd2([[90, 600, .66], [200, 586, .64], [330, 604, .62], [130, 650, .74], [370, 660, .72]], { look: .4, legs: 'walk' });
    s += person(Object.assign({}, PEDRO, { x: 300, y: 640, s: .72, legs: 'walk', face: 'smile', look: .5 }));
    s += jesus({ x: 240, y: 660, s: .8, legs: 'walk', face: 'smile', look: .5, armL: { a: 14 }, armR: { a: 20 } });
    s += person(Object.assign({}, JOAO, { x: 170, y: 680, s: .74, legs: 'walk', face: 'joy', look: .5 }));
    s += `${hitC(240, 560, 150)}</g></g>`;
    s += cloakFlat(620, 750, 1);
    s += bart({ x: 620, y: 744, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'o', look: -.6, armL: { a: 40, b: 60 }, armR: { a: 150, b: -100 }, k: 'bart' });
    s += person(Object.assign({}, POVO[3], { x: 740, y: 740, s: .9, face: 'grin', look: -.6, armL: { a: 14 }, armR: { a: 110, b: -30 }, k: 'vizinho' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('povo'), 'Multidão com Jesus', () => { api.snd('crowd'); api.burst(240, 640, 'dust', 6); api.anim(api.act(api.q('povo')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(24px)' }, { transform: 'translateX(0px)' }], { duration: 1200 }); });
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('hm'); api.bubble(620, 470, 'O que está a acontecer?', { key: 'b' }); api.st.b = true; });
    api.tap(api.q('vizinho'), 'Homem ao lado de Bartimeu', () => {
      api.snd('hello'); api.hop(api.q('vizinho'), 10);
      api.bubble(700, 440, 'É Jesus que está a passar!', { key: 'v', dur: 2800 });
      if (!api.st.ok) { api.st.ok = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   4 — BARTIMEU GRITOU BEM ALTO
   ===================================================================== */
SCENES.push({
  key: 'grito', title: 'Bartimeu gritou muito alto', ref: 'Marcos 10.47-48', tint: 'rose',
  text: [
    'Bartimeu começou a gritar:',
    { q: 'Jesus, Filho de Davi, tem pena de mim!', who: 'outro' },
    'O povo mandou-o ficar calado. Mas Bartimeu gritou ainda mais alto!'
  ],
  fact: '«Filho de Davi» quer dizer que Jesus é o Salvador que Deus prometeu.',
  hint: 'Toca no Bartimeu para ele gritar mais alto.',
  alt: 'Bartimeu, de joelhos e de braços erguidos, grita a chamar Jesus. As pessoas à volta fazem «chiu» com o dedo na boca.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40, sky: [[0, '#9fd2ee'], [.55, '#fbe3cf'], [1, '#fbe3cf']] });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#d7c48e');
    s += crowd2([[600, 470, .44], [660, 480, .46], [720, 470, .44]], { look: -.5, off: 3 }) + jesus({ x: 640, y: 490, s: .5, face: 'smile', look: -.5 });
    s += `<rect x="-40" y="480" width="900" height="420" fill="#e2cf9a"/>` + road({ y0: 500, y1: 640 });
    const shh = { armL: { a: 14 }, armR: { a: -20, b: -132 } };
    s += crowd2([[150, 720, .9], [650, 720, .92]], { faces: ['frown', 'frown', 'frown'], look: 0, k: 'psiu', extra: i => Object.assign({ look: i ? -.6 : .6 }, shh) });
    s += cloakFlat(400, 770, 1.05);
    s += bart({ x: 400, y: 770, s: 1.06, legs: 'kneel', face: 'shout', look: .4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'bart' });
    return s;
  },
  setup(api) {
    let n = 0;
    const said = [N('Jesus!'), N('Jesus, Filho de Davi!'), 'Jesus, Filho de Davi, tem pena de mim!'];
    api.tap(api.q('bart'), 'Bartimeu a gritar', () => {
      const i = Math.min(n, 2); n++;
      api.snd('trumpet'); api.shake(3 + i * 3);
      api.burst(400, 470, 'wave', 2 + i);
      api.bubble(400, 470, said[i], { key: 'b', size: 28 + i * 6, dur: 2400 });
      if (n === 3) api.nudgeNext(2800);
    });
    for (let i = 0; i < 2; i++) api.tap(api.q('psiu' + i), 'Pessoa a pedir silêncio', () => { const [x] = api.pos(api.q('psiu' + i)); api.snd('shh'); api.bubble(x, 470, 'Chiu! Fica calado!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   5 — JESUS PAROU
   ===================================================================== */
SCENES.push({
  key: 'parou', title: 'Jesus parou', ref: 'Marcos 10.49', tint: 'gold',
  text: [
    'No meio de toda aquela gente, Jesus parou e mandou chamar Bartimeu.',
    'O povo disse:',
    { q: 'Coragem! Levanta-te! Jesus está a chamar-te!', who: 'outro' }
  ],
  fact: 'Jesus ouviu Bartimeu no meio de todo aquele barulho. Jesus também te ouve a ti!',
  hint: 'Toca em Jesus e depois nas pessoas.',
  alt: 'Jesus para no meio da estrada e estende a mão na direção de Bartimeu. A multidão também para e olha.',
  cue: [330, 500],
  art() {
    let s = bgDay({ sunX: 120, sunY: 110, sunR: 40 });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#d7c48e');
    s += palm(720, 470, .6);
    s += `<rect x="-40" y="460" width="900" height="440" fill="#e2cf9a"/>` + road({ y0: 480, y1: 640 });
    s += crowd2([[90, 640, .7], [200, 620, .66], [500, 630, .68], [590, 650, .72]], { look: .5, off: 1 });
    s += person(Object.assign({}, PEDRO, { x: 220, y: 720, s: .86, face: 'o', look: .5, k: 'pedro' }));
    s += jesus({ x: 340, y: 744, s: 1.04, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 96, b: -10 }, k: 'jesus' });
    s += person(Object.assign({}, JOAO, { x: 470, y: 736, s: .86, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 120, b: -20 }, k: 'joao' }));
    s += `<g transform="translate(700,760)" data-k="bartLonge"><g class="act">${cloakFlat(0, 0, .7)}${bart({ x: 0, y: -4, s: .7, legs: 'kneel', face: 'o', look: -.6, armL: { a: 150, b: -20 }, armR: { a: 30, b: 30 } })}${hitC(0, -100, 70)}</g></g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => {
      api.snd('chime', 'E6');
      api.bubble(340, 460, 'Chamem esse homem.', { key: 'j' });
      api.st.j = true;
    });
    const call = () => {
      api.snd('clap');
      api.bubble(470, 470, 'Coragem! Levanta-te! Jesus está a chamar-te!', { key: 'p', dur: 3000 });
      api.later(() => { api.hop(api.q('bartLonge'), 30); api.snd('boing'); }, 1200);
      if (api.st.j && !api.st.ok) { api.st.ok = true; api.nudgeNext(3200); }
    };
    api.tap(api.q('joao'), 'João, amigo de Jesus', call);
    api.tap(api.q('pedro'), 'Pedro, amigo de Jesus', call);
    api.tap(api.q('bartLonge'), 'Bartimeu', () => { api.snd('gulp'); api.bubble(700, 520, 'Jesus está a chamar-me?', { key: 'b', size: 26 }); });
  }
});

/* =====================================================================
   6 — BARTIMEU JOGOU A CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa-fora', title: 'Bartimeu atirou a capa', ref: 'Marcos 10.50', tint: 'sky',
  text: [
    'Bartimeu atirou a capa para longe, deu um salto e foi até Jesus. Hop!'
  ],
  fact: 'A capa era muito importante para Bartimeu: era o seu cobertor. Mas deixou tudo para ir ter com Jesus!',
  hint: 'Toca na capa de Bartimeu.',
  alt: 'Bartimeu dá um salto e atira a capa ao ar. Do outro lado da estrada, Jesus espera por ele de braços abertos.',
  cue: [270, 620],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#d7c48e');
    s += `<rect x="-40" y="460" width="900" height="440" fill="#e2cf9a"/>` + road({ y0: 480, y1: 640 });
    s += crowd2([[460, 600, .6], [560, 590, .58], [760, 600, .6]], { look: -.5, off: 2 });
    s += jesus({ x: 650, y: 720, s: 1, face: 'joy', look: -.6, armL: { a: 70, b: -10 }, armR: { a: 70, b: -10 }, k: 'jesus' });
    s += `<g data-k="sentado">${bart({ x: 250, y: 740, s: 1.02, legs: 'sit', drop: 30, hemY: -62, face: 'open', look: .6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })}</g>`;
    s += `<g data-k="pe" opacity="0">${bart({ x: 270, y: 724, s: 1.04, legs: 'hop', face: 'laugh', look: .6, armL: { a: 150, b: -20 }, armR: { a: 120, b: -20 }, k: 'bart' })}</g>`;
    s += cloakFlat(250, 752, 1.1, 'capa');
    return s;
  },
  setup(api) {
    api.tap(api.q('capa'), 'Capa de Bartimeu', async () => {
      if (api.st.gone) return; api.st.gone = true;
      api.snd('whoosh');
      api.anim(api.act(api.q('capa')), [{ transform: 'translate(0px,0px) rotate(0deg)', opacity: 1 }, { transform: 'translate(-120px,-260px) rotate(-200deg)', opacity: 1, offset: .6 }, { transform: 'translate(-220px,-120px) rotate(-320deg)', opacity: 0 }], { duration: 1300, fill: 'forwards', easing: 'ease-out' });
      api.q('sentado').setAttribute('opacity', '0');
      api.anim(api.q('pe'), [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
      api.hop(api.q('bart'), 40); api.snd('boing');
      api.bubble(270, 450, 'Já vou, Jesus!', { key: 'b' });
      await api.wait(900);
      api.anim(api.act(api.q('bart')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(120px) translateY(-14px)' }, { transform: 'translateX(230px)' }], { duration: 1400, fill: 'forwards', easing: 'ease-in-out' });
      api.snd('tiptoe');
      api.nudgeNext(2600);
    });
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('hello'); api.bubble(400, 450, 'Jesus chamou-me!', { key: 'b' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(650, 470, 'heart', 4); api.bubble(650, 450, 'Vem!', { key: 'j' }); });
  }
});

/* =====================================================================
   7 — O QUE VOCÊ QUER?
   ===================================================================== */
SCENES.push({
  key: 'pergunta', title: 'O que queres?', ref: 'Marcos 10.51', tint: 'rose',
  text: [
    'Jesus perguntou:',
    { q: 'O que queres que eu faça por ti?', who: 'jesus' },
    'Bartimeu respondeu:',
    { q: 'Eu quero ver!', who: 'outro' }
  ],
  fact: 'Podemos pedir tudo a Jesus quando oramos.',
  hint: 'Toca em Jesus e no Bartimeu.',
  alt: 'Jesus e Bartimeu estão frente a frente. Jesus sorri e pergunta, com carinho, o que Bartimeu quer; Bartimeu junta as mãos para pedir.',
  cue: [280, 520],
  art() {
    let s = bgDay({ sunX: 640, sunY: 110, sunR: 38, sky: [[0, '#9fd2ee'], [.55, '#fbe3cf'], [1, '#fbe3cf']] });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#d7c48e');
    s += palm(90, 470, .62) + palm(730, 470, .58);
    s += `<rect x="-40" y="460" width="900" height="440" fill="#e2cf9a"/>` + road({ y0: 480, y1: 640 });
    s += crowd2([[120, 600, .56], [690, 600, .56], [760, 610, .54]], { look: 0, off: 4, faces: ['o', 'smile', 'o'] });
    s += jesus({ x: 290, y: 744, s: 1.12, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 60, b: -20 }, k: 'jesus' });
    s += bart({ x: 520, y: 750, s: 1.08, face: 'worry', look: -.6, armL: { a: -40, b: -100 }, armR: { a: -40, b: -100 }, k: 'bart' });
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('chime', 'E6'); api.bubble(290, 440, 'O que queres que eu faça por ti?', { key: 'j', dur: 3000 }); api.st.j = true; });
    api.tap(api.q('bart'), 'Bartimeu', () => {
      api.snd('hm');
      api.bubble(520, 440, 'Mestre, eu quero ver!', { key: 'b', dur: 2800 });
      if (api.st.j && !api.st.ok) { api.st.ok = true; api.nudgeNext(2800); }
    });
  }
});

/* =====================================================================
   8 — EU CONSIGO VER!
   ===================================================================== */
SCENES.push({
  key: 'cura', title: 'Eu consigo ver!', ref: 'Marcos 10.52', tint: 'gold',
  text: [
    'Jesus disse:',
    { q: 'Podes ir. A tua fé curou-te.', who: 'jesus' },
    'Na mesma hora, os olhos de Bartimeu abriram-se. Conseguia ver!'
  ],
  fact: 'Bartimeu estava mesmo à frente de Jesus. Já pensaste o que é ver o rosto de Jesus pela primeira vez?',
  hint: 'Toca nos olhos de Bartimeu.',
  alt: 'Tudo começa cinzento e desfocado, como Bartimeu via. Quando Jesus o cura, o mundo enche-se de cores e Bartimeu sorri de olhos abertos para Jesus.',
  cue: [520, 470],
  art() {
    let s = `<defs><filter id="${ID('cinza')}" filterUnits="userSpaceOnUse" x="-40" y="-40" width="900" height="900"><feColorMatrix type="saturate" values="0"><animate attributeName="values" from="0" to="1" dur="1.8s" begin="indefinite" fill="freeze"/></feColorMatrix><feGaussianBlur stdDeviation="6"><animate attributeName="stdDeviation" from="6" to="0" dur="1.8s" begin="indefinite" fill="freeze"/></feGaussianBlur></filter></defs>`;
    s += `<g data-k="mundo" filter="${UR('cinza')}">`;
    s += bgDay({ sunX: 660, sunY: 120, sunR: 44 });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#bfe08e');
    s += palm(90, 480, .66) + palm(740, 480, .6);
    s += `<rect x="-40" y="460" width="900" height="440" fill="#d8e8a8"/>` + road({ y0: 480, y1: 640 });
    s += flowerBand(1801, 650, 790, 10);
    s += crowd2([[130, 620, .58], [680, 616, .58]], { look: 0, off: 5 });
    s += jesus({ x: 300, y: 744, s: 1.12, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 100, b: -40 }, k: 'jesus' });
    s += `<g data-k="cego">${bart({ x: 520, y: 750, s: 1.08, face: 'smile', look: -.6, armL: { a: -40, b: -100 }, armR: { a: -40, b: -100 } })}</g>`;
    s += `<g data-k="vendo" opacity="0">${bart({ x: 520, y: 750, s: 1.08, shut: false, face: 'grin', look: -.6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 } })}</g>`;
    s += `</g>`;
    s += hitC(520, 500, 60).replace('class="hit"', 'class="hit" data-k="olhos"');
    return s;
  },
  setup(api) {
    const heal = async () => {
      if (api.st.ok) { api.snd('heart'); api.burst(520, 480, 'heart', 5); api.bubble(520, 420, 'Obrigado, Jesus!', { key: 'b' }); return; }
      api.st.ok = true;
      api.snd('anoint');
      api.burst(520, 500, 'spark', 14, { col: '#fff6c8' });
      const m = api.q('mundo');
      if (RM.matches) m.removeAttribute('filter');
      else { m.querySelectorAll('animate').forEach(a => { try { a.beginElement(); } catch (e) { m.removeAttribute('filter'); } }); api.later(() => m.removeAttribute('filter'), 1900); }
      await api.wait(700);
      api.q('cego').setAttribute('opacity', '0');
      api.anim(api.q('vendo'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      await api.wait(900);
      api.snd('victory'); api.burst(400, 300, 'confetti', 18);
      api.bubble(520, 420, 'Eu consigo ver!', { key: 'b', dur: 2600 });
      api.nudgeNext(2600);
    };
    api.tap(api.q('olhos'), 'Olhos de Bartimeu', heal);
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('chime', 'E6'); api.bubble(300, 430, api.st.ok ? 'A tua fé curou-te!' : 'Podes ir. A tua fé curou-te.', { key: 'j' }); if (!api.st.ok) api.later(heal, 1400); });
  }
});

/* =====================================================================
   9 — UM MUNDO CHEIO DE CORES
   ===================================================================== */
const VE = [['ceu', N('O céu é azul!'), 'twinkle'], ['passaro', N('Então assim é um passarinho!'), ['tweet', 4]], ['jumento', N('Que burro tão engraçado!'), 'heehaw'], ['criancas', N('Crianças a brincar!'), 'laugh'], ['flores', N('Quantas cores!'), 'chime'], ['palmeira', N('As palmeiras balançam!'), 'wind']];
SCENES.push({
  key: 'cores', title: 'Um mundo cheio de cores', ref: 'Marcos 10.52', tint: 'meadow',
  text: [
    'Bartimeu olhou para o céu azul, para as árvores, para as flores e para as pessoas.',
    'Tudo o que só conhecia pelos sons, agora podia ver! Que lindo!'
  ],
  fact: 'Jesus fez muitos milagres para mostrar que Deus ama as pessoas.',
  hint: 'Toca nas coisas que o Bartimeu está a ver.',
  alt: 'Um dia colorido na estrada de Jericó: céu azul, palmeiras, flores, um passarinho, um burro e crianças a brincar. Bartimeu, de olhos bem abertos, aponta para tudo, maravilhado.',
  cue: [600, 520],
  art() {
    let s = sky('sky', [[0, '#5fb6ea'], [.55, '#c4e8f6'], [1, '#e9f6f0']]) + hitC(400, 120, 110).replace('class="hit"', 'class="hit" data-k="ceu"');
    s += sun(660, 120, 44, { face: true }) + cloud(200, 150, .9) + cloud(430, 110, .6, { dx: -24 });
    s += `<g transform="translate(250,250)"><g class="glide" style="--dx:60px;--dy:-12px;--d:8s">${dove({ x: 0, y: 0, s: 1.1, col: '#3f93c7', wing: '#2f7fb8', k: 'passaro' })}</g></g>`;
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#bfe08e');
    s += `<g data-k="palmeira">${palm(110, 500, .8)}${palm(220, 470, .6)}${hitC(130, 380, 80)}</g>`;
    s += `<rect x="-40" y="460" width="900" height="440" fill="#d8e8a8"/>` + road({ y0: 480, y1: 640 });
    s += equine({ x: 640, y: 600, s: .56, kind: 'donkey', pack: '#e86a9a', flip: true, k: 'jumento' });
    s += `<g data-k="criancas"><g class="act">${person(Object.assign({}, POVO[2], { x: 120, y: 700, s: .8, legs: 'hop', face: 'laugh', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, cls: 'bounce' }))}${person(Object.assign({}, POVO[5], { x: 220, y: 712, s: .78, legs: 'run', face: 'joy', look: -.5, armL: { a: 120, b: -20 }, armR: { a: 40, b: 30 } }))}${hitC(170, 620, 90)}</g></g>`;
    s += `<g data-k="flores"><g class="act">${flowerBand(1901, 720, 790, 12, ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a', '#8a5fc2'])}${hitC(560, 760, 80)}</g></g>`;
    s += bart({ x: 430, y: 744, s: 1.06, shut: false, face: 'grin', look: .3, armL: { a: 20 }, armR: { a: 112, b: -20 }, k: 'bart' });
    return s;
  },
  setup(api) {
    const seen = new Set();
    const P = { ceu: [400, 140], passaro: [250, 250], jumento: [640, 500], criancas: [170, 560], flores: [560, 720], palmeira: [130, 360] };
    VE.forEach(([k, said, snd]) => api.tap(api.q(k), ({ ceu: 'Céu', passaro: 'Passarinho', jumento: 'Burro', criancas: 'Crianças', flores: 'Flores', palmeira: 'Palmeiras' })[k], async () => {
      Array.isArray(snd) ? api.snd(...snd) : api.snd(snd);
      if (k !== 'ceu' && k !== 'palmeira') api.hop(api.q(k), 16);
      api.burst(P[k][0], P[k][1], 'spark', 6, { col: '#fff1b0' });
      api.bubble(430, 430, said, { key: 'b', dur: 2200 });
      seen.add(k);
      if (seen.size === VE.length && !api.st.done) { api.st.done = true; await api.wait(2300); api.snd('tada'); api.bubble(430, 430, 'Que mundo lindo Deus fez!', { key: 'b', dur: 2600 }); api.nudgeNext(2400); }
    }));
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('heart'); api.hop(api.q('bart'), 14); api.bubble(430, 430, 'Eu consigo ver tudo!', { key: 'b' }); });
  }
});

/* =====================================================================
   10 — BARTIMEU SEGUIU JESUS
   ===================================================================== */
SCENES.push({
  key: 'seguiu', title: 'Bartimeu seguiu Jesus', ref: 'Marcos 10.52; Lucas 18.43', tint: 'gold',
  text: [
    'Bartimeu não voltou para a beira da estrada. Foi com Jesus, a cantar para Deus!',
    'E toda a gente que viu também louvou a Deus.'
  ],
  fact: 'Bartimeu deixou a capa para trás e ganhou um caminho novo: seguir Jesus.',
  hint: 'Toca no Bartimeu e no povo.',
  alt: 'Pela estrada, Jesus caminha com os amigos e a multidão. Logo atrás, Bartimeu salta de alegria, a louvar a Deus, e o povo bate palmas.',
  cue: [250, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 110, sunR: 40 });
    s += hill([[-40, 440], [160, 416], [380, 432], [600, 408], [840, 428]], '#d7c48e');
    s += palm(60, 470, .6);
    s += `<rect x="-40" y="460" width="900" height="440" fill="#e2cf9a"/>` + road({ y0: 480, y1: 640 });
    s += jesus({ x: 560, y: 640, s: .86, legs: 'walk', face: 'joy', look: .4, armL: { a: 14 }, armR: { a: 20 }, k: 'jesus' });
    s += person(Object.assign({}, PEDRO, { x: 660, y: 630, s: .78, legs: 'walk', face: 'smile', look: .4 })) + person(Object.assign({}, JOAO, { x: 470, y: 650, s: .78, legs: 'walk', face: 'joy', look: .4 }));
    s += crowd2([[720, 700, .8], [380, 720, .84], [620, 740, .86]], { look: -.3, k: 'p', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, faces: ['joy', 'laugh', 'grin'] });
    s += bart({ x: 230, y: 744, s: 1.06, shut: false, legs: 'hop', face: 'grin', look: .5, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'bart' });
    s += `<g transform="translate(90,780)">${cloakFlat(0, 0, .7)}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('bart'), 'Bartimeu', () => { api.snd('victory'); api.hop(api.q('bart'), 36); api.burst(230, 480, 'note', 4); api.bubble(230, 440, 'Glória a Deus!', { key: 'b' }); if (!api.st.ok) { api.st.ok = true; api.nudgeNext(2600); } });
    for (let i = 0; i < 3; i++) api.tap(api.q('p' + i), 'Pessoa a louvar a Deus', () => { const [x] = api.pos(api.q('p' + i)); api.snd('clap'); api.hop(api.q('p' + i), 18); api.bubble(x, 470, ['Aleluia!', 'Que maravilha!', 'Louvado seja Deus!'][i], { key: 'p', size: 26 }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(560, 420, 'heart', 4); });
  }
});

/* =====================================================================
   11 — JESUS É A LUZ DO MUNDO
   ===================================================================== */
const LAMPS = [[170, 690], [330, 720], [500, 716], [660, 690]];
SCENES.push({
  key: 'luz', title: 'Jesus é a luz do mundo', ref: 'João 8.12', tint: 'night',
  text: [
    'Jesus disse:',
    { q: 'Eu sou a luz do mundo. Quem me segue não anda no escuro.', who: 'jesus' },
    'Tu também podes chamar Jesus. Ele ouve sempre!'
  ],
  fact: 'Jesus ajuda-nos a ver com os olhos e também com o coração.',
  hint: 'Toca nas lamparinas para as acenderes.',
  alt: 'No fim do dia, Jesus está sentado com crianças. Cada criança segura uma lamparina, e as luzes vão-se acendendo uma a uma.',
  cue: [196, 670],
  art() {
    let s = sky('sky', [[0, '#1d2454'], [.5, '#4a4a8a'], [.8, '#c98a8a'], [1, '#e8b48a']]);
    s += starField(1101, 40, 0, 0, 800, 300, { big: .1 }) + moon(660, 120, 30);
    s += hill([[-40, 470], [160, 444], [380, 462], [600, 436], [840, 456]], '#5a5a7a');
    s += `<g data-k="noite"><rect x="-40" y="460" width="900" height="440" fill="#4a4466"/></g>`;
    s += rock(400, 640, 160, 70, { fill: '#7a7088', shade: '#5a5068', hi: '#9a90a8' });
    s += jesus({ x: 400, y: 630, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'joy', look: 0, armL: { a: 60, b: 30 }, armR: { a: 60, b: 30 }, k: 'jesus' });
    s += `<defs>${rg('lglow', [[0, '#ffd27a', .7], [.6, '#ffd27a', .22], [1, '#ffd27a', 0]])}</defs>`;
    LAMPS.forEach(([x, y], i) => s += `<circle data-k="brilho${i}" cx="${x + 20}" cy="${y - 30}" r="110" fill="${UR('lglow')}" opacity="0" style="pointer-events:none"/>`);
    LAMPS.forEach(([x, y], i) => {
      s += person(Object.assign({}, POVO[[2, 5, 2, 5][i]], { x, y: y + 60, s: .74, face: 'joy', look: (400 - x) / 400, armL: { a: -20, b: -70 }, armR: { a: -20, b: -70 }, hairStyle: i % 2 ? 'short' : 'curly', tunic: ['#e86a9a', '#3f93c7', '#f2c14e', '#5e9a43'][i] }));
      s += oilLamp(x, y, 'lamp' + i);
    });
    return s;
  },
  setup(api) {
    let lit = 0;
    LAMPS.forEach(([x, y], i) => api.tap(api.q('lamp' + i), 'Lamparina', async () => {
      const g = api.q('lamp' + i + 'luz');
      if (g.dataset.on) { api.snd('chime', 'A5'); api.burst(x + 26, y - 40, 'spark', 4, { col: '#ffd27a' }); return; }
      g.dataset.on = 1; lit++;
      api.snd('chime', ['C5', 'E5', 'G5', 'C6'][i]);
      api.anim(g, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
      api.anim(api.q('brilho' + i), [{ opacity: 0 }, { opacity: 1 }], { duration: 700, fill: 'forwards' });
      api.burst(x + 26, y - 40, 'spark', 6, { col: '#ffd27a' });
      if (lit === LAMPS.length) { await api.wait(600); api.snd('choir', ['C4', 'E4', 'G4', 'C5', 'E5']); api.anim(api.q('noite'), [{ opacity: 1 }, { opacity: .55 }], { duration: 1200, fill: 'forwards' }); api.bubble(400, 360, 'Eu sou a luz do mundo!', { key: 'j', dur: 2800 }); api.nudgeNext(2600); }
    }));
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 400, 'heart', 5); api.bubble(400, 360, 'Eu ouço-vos sempre!', { key: 'j' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre as palmeiras de Jericó; uma ovelhinha dorme à beira da estrada.',
  cue: [430, 160],
  questions: [
    ['Como se chamava o homem cego?', 'Bartimeu.'],
    ['O que é que ele gritou quando Jesus passou?', '«Jesus, Filho de Davi, tem pena de mim!»'],
    ['O que é que o povo mandou Bartimeu fazer?', 'Ficar calado. Mas ele gritou mais alto!'],
    ['O que é que Jesus perguntou?', '«O que queres que eu faça por ti?»'],
    ['O que é que Bartimeu fez depois de ver?', 'Foi com Jesus, a louvar a Deus.']
  ],
  verse: ['O Senhor abre os olhos dos cegos.', 'Salmo 146.8'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1201, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 480], [140, 450], [330, 470], [520, 440], [700, 460], [840, 450]], '#2b416c');
    s += `<g opacity=".9">${palm(120, 600, .7)}${palm(640, 600, .62)}${palm(720, 610, .5)}</g>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
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
  id: 'cego',
  title: 'Jesus e o Cego Bartimeu',
  cover: { kicker: 'Uma história da Bíblia', pre: 'Jesus e o cego', title: 'Bartimeu', sub: 'Jesus abre os nossos olhos' },
  color: '#8a2a45',
  ref: 'Marcos 10.46-52',
  scenes: SCENES
});
})();
