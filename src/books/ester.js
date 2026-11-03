/* =====================================================================
   LIVRO: ESTER, A RAINHA CORAJOSA  (Ester 2 a 9)
   ===================================================================== */
(() => {
const SCENES = [];
const ESTER = { kind: 'adult', skin: '#d99a6c', hairStyle: 'long', hair: '#2b1d17', tunic: '#8a5fc2', trim: '#f2c14e', belt: '#f2c14e', longSleeves: true };
const RAINHA = Object.assign({}, ESTER, { head: 'crown', cloak: '#5a2a8a', cloakTrim: '#f2c14e', tunic: '#b38be0' });
const ESTER_MENINA = { kind: 'child', skin: '#d99a6c', hairStyle: 'long', hair: '#2b1d17', tunic: '#e86a9a', belt: '#7b4a2a' };
const MARDOQUEU = { kind: 'adult', skin: '#c98a5a', hair: '#7a6a5a', beard: 'long', beardCol: '#8a7a6a', browCol: '#6a5a4a', head: 'cloth', clothCol: '#3f6fb5', bandCol: '#f2c14e', tunic: '#5872b8', stripes: '#9cb0e0', belt: '#7b4a2a' };
const MARDOQUEU_REAL = Object.assign({}, MARDOQUEU, { head: 'circlet', tunic: '#fbf6ea', stripes: '#3f93c7', cloak: '#7b4c93', cloakTrim: '#f2c14e', belt: '#f2c14e' });
const XERXES = { kind: 'adult', skin: '#d99a6c', hair: '#1f1612', beard: 'long', beardCol: '#1f1612', head: 'crown', tunic: '#2f5fa8', cloak: '#b6312f', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' };
const HAMA = { kind: 'adult', skin: '#d39463', hair: '#1f1612', beard: 'short', beardCol: '#1f1612', head: 'cloth', clothCol: '#3a3a46', bandCol: '#b6312f', tunic: '#5a2a3a', cloak: '#2a2a36', cloakTrim: '#b6312f', belt: '#b6312f' };
const GUARDAS = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'bushy', beardCol: '#2b1d17', head: 'helmetP', tunic: '#7a3a3a', belt: '#3a2a20', shoe: '#4a3226' },
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'short', beardCol: '#1f1612', head: 'helmetP', tunic: '#5a4a7a', belt: '#3a2a20', shoe: '#4a3226' }
];
const AIAS = [
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#d9a33a' },
  { kind: 'adult', skin: '#b9784c', head: 'scarf', clothCol: '#5e9a43', hairStyle: 'long', hair: '#1f1612', tunic: '#e9c46a', belt: '#5e9a43' }
];
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', tunic: '#5e9a43', belt: '#d9a33a' },
  { kind: 'child', skin: '#c98a5a', head: 'scarf', clothCol: '#f2c14e', hairStyle: 'long', hair: '#2b1d17', tunic: '#f4efe6', belt: '#d9643f' }
];
const SIT = { legs: 'sit', drop: 30, hemY: -62 };
const CETRO = `<path d="M0,40 L0,-150" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M0,40 L0,-150" stroke="#f2c14e" stroke-width="6" stroke-linecap="round"/><circle cy="-158" r="13" fill="#f2c14e" stroke="${OL}" stroke-width="3"/><path d="${sparkle(7)}" transform="translate(0,-158)" fill="#fff6c8"/>`;
const rei = o => person(Object.assign({}, XERXES, o));
const hama = o => person(Object.assign({}, HAMA, o));

/* ---------- peças desta história ---------- */
function salaoPersa(o = {}) {
  const fy = o.floor ?? 600;
  let s = `<defs>${lg('salao', [[0, '#e9d7b4'], [1, '#d6bf92']])}</defs><rect x="-40" y="-40" width="900" height="${fy + 40}" fill="${UR('salao')}"/>`;
  s += `<rect x="-40" y="-40" width="900" height="90" fill="#2f5fa8"/><g fill="#f2c14e">${[...Array(14)].map((_, i) => `<path d="${sparkle(10)}" transform="translate(${-10 + i * 62},10)"/>`).join('')}</g><rect x="-40" y="48" width="900" height="12" fill="#c9a54e"/>`;
  if (o.cortinas !== false) s += `<g opacity=".85">${[[150, '#8a5fc2'], [650, '#8a5fc2']].map(([x, c]) => `<path d="M${x - 70},60 Q${x},130 ${x + 70},60 L${x + 60},${fy} L${x - 60},${fy} Z" fill="${c}" opacity=".35"/>`).join('')}</g>`;
  const col = x => `<rect x="${x - 22}" y="120" width="44" height="${fy - 120}" fill="#f4ead2" stroke="${OL}" stroke-width="3"/><g stroke="#c9b48a" stroke-width="3">${[-8, 0, 8].map(d => `<path d="M${x + d},130 L${x + d},${fy - 10}"/>`).join('')}</g><path d="M${x - 46},120 C${x - 46},92 ${x - 20},86 ${x},100 C${x + 20},86 ${x + 46},92 ${x + 46},120 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3"/><rect x="${x - 30}" y="${fy - 18}" width="60" height="18" fill="#e6d6b0" stroke="${OL}" stroke-width="2.6"/>`;
  for (const x of o.cols || [60, 740]) s += col(x);
  s += `<rect x="-40" y="${fy}" width="900" height="${1300 - fy}" fill="#c9a873"/><path d="M-40,${fy} L840,${fy}" stroke="${OL}" stroke-width="4"/>`;
  s += `<g opacity=".35" stroke="#9a7a4a" stroke-width="3">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${400 + (i - 3) * 70},${fy} L${400 + (i - 3) * 190},${fy + 300}"/>`).join('')}</g>`;
  if (o.tapete !== false) s += `<path d="M300,${fy + 4} L500,${fy + 4} L560,${fy + 220} L240,${fy + 220} Z" fill="#b6312f" opacity=".8"/><path d="M310,${fy + 14} L490,${fy + 14} L544,${fy + 220} L256,${fy + 220} Z" fill="none" stroke="#f2c14e" stroke-width="4" opacity=".8"/>`;
  return s;
}
function trono(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-62,-60 L-62,-236 Q0,-266 62,-236 L62,-60 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3.4"/><path d="M-46,-80 L-46,-218 Q0,-240 46,-218 L46,-80 Z" fill="#2f5fa8"/><g fill="#f2c14e">${[-24, 0, 24].map(dx => `<path d="${sparkle(8)}" transform="translate(${dx},-180)"/>`).join('')}</g><rect x="-82" y="-96" width="164" height="26" rx="6" fill="#d9a33a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 68},-72 L${k * 72},-6 L${k * 58},0 L${k * 54},-72 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`;
}
function coroa(s = 1) {
  return `<g transform="scale(${s})"><path d="M-30,0 L-34,-30 L-18,-14 L0,-36 L18,-14 L34,-30 L30,0 Z" fill="#f2c14e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><rect x="-31" y="-6" width="62" height="10" rx="3" fill="#e0a72e" stroke="${OL}" stroke-width="2.6"/>${[[-34, -30], [0, -36], [34, -30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#e5483f" stroke="${OL}" stroke-width="2"/>`).join('')}<circle cx="0" cy="-1" r="3.6" fill="#3f93c7"/></g>`;
}
function almofada(x, y, k = '') {
  return `<g transform="translate(${x},${y})"><rect x="-26" y="-70" width="52" height="70" fill="#d9a33a" stroke="${OL}" stroke-width="3"/><rect x="-40" y="-82" width="80" height="14" rx="4" fill="#e9c46a" stroke="${OL}" stroke-width="3"/><path d="M-46,-84 Q0,-108 46,-84 Q0,-74 -46,-84 Z" fill="#b6312f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>${k ? `<g transform="translate(0,-94)" data-k="${k}"><g class="act">${coroa(1)}${hitC(0, -14, 48)}</g></g>` : ''}</g>`;
}
function casinhaDentro() {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#ecd9b2"/><rect x="520" y="-40" width="340" height="900" fill="#e2cb9e" opacity=".6"/>`;
  s += `<path d="M110,420 L110,230 A70,70 0 0 1 250,230 L250,420 Z" fill="#8fd0f0" stroke="${OL}" stroke-width="3.4"/><path d="M112,380 Q180,350 248,370 L248,418 L112,418 Z" fill="#b6d47e"/>${palm(200, 420, .45)}`;
  s += `<rect x="-40" y="580" width="900" height="300" fill="#c9a873"/><path d="M-40,580 L840,580" stroke="${OL}" stroke-width="4"/>`;
  s += lampStand(720, 580, 170);
  s += `<g transform="translate(600,580)"><path d="M-40,0 L-34,-64 L34,-64 L40,0 Z" fill="#c46a3a" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-64" rx="34" ry="8" fill="#a04f2a" stroke="${OL}" stroke-width="2.6"/></g>`;
  return s;
}
function portaoRei(o = {}) {
  let s = bgDay(Object.assign({ sunX: 670, sunY: 110, sunR: 40, sky: [[0, '#8ccbed'], [.6, '#d6eef5'], [1, '#f6ead2']] }, o.day || {}));
  s += `<rect x="-40" y="220" width="900" height="360" fill="#e6d2a8" stroke="${OL}" stroke-width="3.4"/><rect x="-40" y="220" width="900" height="40" fill="#2f5fa8"/><g fill="#f2c14e">${[...Array(15)].map((_, i) => `<path d="${sparkle(8)}" transform="translate(${-10 + i * 60},240)"/>`).join('')}</g>`;
  s += `<path d="M310,580 L310,380 A90,90 0 0 1 490,380 L490,580 Z" fill="#6b4a33" stroke="${OL}" stroke-width="3.6"/><path d="M400,300 L400,580" stroke="#4a3226" stroke-width="4"/><g fill="#f2c14e">${[340, 370, 430, 460].map(x => `<circle cx="${x}" cy="480" r="5"/>`).join('')}</g>`;
  s += `<g>${[150, 650].map(x => `<rect x="${x - 26}" y="280" width="52" height="300" fill="#f4ead2" stroke="${OL}" stroke-width="3"/><path d="M${x - 46},284 C${x - 46},262 ${x - 20},258 ${x},268 C${x + 20},258 ${x + 46},262 ${x + 46},284 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3"/>`).join('')}</g>`;
  s += `<rect x="-40" y="580" width="900" height="300" fill="${o.chao || '#e8d4a8'}"/><path d="M-40,580 L840,580" stroke="${OL}" stroke-width="3"/>`;
  return s;
}
function mesa(x, y, w = 420) {
  let s = `<rect x="${x - w / 2}" y="${y - 24}" width="${w}" height="24" rx="8" fill="#b57c46" stroke="${OL}" stroke-width="3"/><path d="M${x - w / 2 + 6},${y - 22} L${x + w / 2 - 6},${y - 22}" stroke="#f2c14e" stroke-width="5"/>`;
  s += `<rect x="${x - w / 2 + 14}" y="${y}" width="22" height="70" fill="#8a5a33" stroke="${OL}" stroke-width="3"/><rect x="${x + w / 2 - 36}" y="${y}" width="22" height="70" fill="#8a5a33" stroke="${OL}" stroke-width="3"/>`;
  // comida
  s += `<g transform="translate(${x - 110},${y - 30})"><ellipse cx="0" cy="0" rx="46" ry="11" fill="#f4ead2" stroke="${OL}" stroke-width="2.6"/>${[[-20, -12, '#7a3a8a'], [0, -18, '#5e9a43'], [18, -12, '#e5483f'], [-6, -8, '#f2c14e']].map(([a, b, c]) => `<circle cx="${a}" cy="${b}" r="11" fill="${c}" stroke="${OL}" stroke-width="2.4"/>`).join('')}</g>`;
  s += `<g transform="translate(${x + 10},${y - 30})"><ellipse cx="0" cy="0" rx="40" ry="10" fill="#f4ead2" stroke="${OL}" stroke-width="2.6"/><ellipse cx="-10" cy="-10" rx="22" ry="12" fill="#e0a85a" stroke="${OL}" stroke-width="2.4"/><ellipse cx="14" cy="-8" rx="16" ry="9" fill="#e0a85a" stroke="${OL}" stroke-width="2.4"/></g>`;
  s += `<g transform="translate(${x + 120},${y - 24})"><path d="M-12,-40 L12,-40 L8,-14 L-8,-14 Z" fill="#f2c14e" stroke="${OL}" stroke-width="2.6"/><rect x="-3" y="-14" width="6" height="12" fill="#f2c14e" stroke="${OL}" stroke-width="2"/><ellipse cx="0" cy="0" rx="12" ry="4" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/></g>`;
  return s;
}
function bandeirolas(y = 120) {
  const cols = ['#e5483f', '#f2c14e', '#3f93c7', '#5e9a43', '#e86a9a'];
  let s = `<path d="M-40,${y} Q200,${y + 50} 400,${y} Q600,${y + 50} 840,${y}" stroke="${OL}" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 18; i++) {
    const x = -20 + i * 50, t = ((x + 40) % 440) / 440, yy = y + Math.sin(t * Math.PI) * 24;
    s += `<path d="M${x - 14},${r1(yy)} L${x + 14},${r1(yy)} L${x},${r1(yy + 30)} Z" fill="${cols[i % 5]}" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>`;
  }
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Ester, a Rainha Corajosa',
  alt: 'A rainha Ester, de coroa e manto roxo, está no palácio diante do rei, que lhe estende o cetro de ouro.',
  cue: [300, 760],
  art() {
    let s = salaoPersa({ floor: 840, cols: [60, 740] });
    s += trono(600, 1010, 1.05);
    s += rei({ x: 600, y: 1000, s: 1.1, flip: true, ...SIT, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 90, b: 0, item: CETRO, ia: 70 }, k: 'rei' });
    s += person(Object.assign({}, RAINHA, { x: 270, y: 1060, s: 1.2, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 40, b: -20 }, k: 'ester' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('ester'), 'Rainha Ester', () => { api.snd('heart'); api.burst(270, 760, 'heart', 5); api.bubble(270, 690, 'Deus está comigo!', { key: 'e' }); });
    api.tap(api.q('rei'), 'Rei Xerxes', () => { api.snd('fanfare'); api.bubble(600, 640, 'Bem-vinda, rainha Ester!', { key: 'r' }); });
  }
});

/* =====================================================================
   1 — UMA MENINA CHAMADA ESTER
   ===================================================================== */
SCENES.push({
  key: 'menina', title: 'Uma menina chamada Ester', ref: 'Ester 2.5-7', tint: 'rose',
  text: [
    'Ester era uma menina judia que vivia na Pérsia. Não tinha pai nem mãe.',
    'Mas o primo Mardoqueu cuidava dela como se fosse sua filha.'
  ],
  fact: 'O nome hebraico da Ester era Hadassa, que quer dizer «murta», uma planta de flores brancas.',
  hint: 'Toca na Ester e no Mardoqueu.',
  alt: 'Dentro de uma casa simples, o Mardoqueu, de barba comprida, sorri para a pequena Ester.',
  cue: [300, 560],
  art() {
    let s = casinhaDentro();
    s += person(Object.assign({}, MARDOQUEU, { x: 470, y: 760, s: 1.06, flip: true, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 50, b: -20 }, k: 'mardoqueu' }));
    s += person(Object.assign({}, ESTER_MENINA, { x: 290, y: 770, s: 1.04, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 30 }, k: 'ester' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('ester'), 'Ester', () => { api.snd('heart'); api.burst(290, 560, 'heart', 4); api.bubble(290, 500, 'Obrigada por cuidares de mim!', { key: 'e' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('mardoqueu'), 'Mardoqueu', () => { api.snd('hello'); api.bubble(480, 430, 'Gosto muito de ti, Ester!', { key: 'm' }); });
  }
});

/* =====================================================================
   2 — ESTER, A NOVA RAINHA
   ===================================================================== */
SCENES.push({
  key: 'rainha', title: 'Ester, a nova rainha', ref: 'Ester 2.15-18', tint: 'gold',
  text: [
    'Quando cresceu, a Ester tornou-se uma jovem bonita e bondosa.',
    'O rei Xerxes gostou tanto dela que a escolheu para ser a nova rainha!'
  ],
  fact: 'O rei fez uma grande festa em honra da rainha Ester.',
  hint: 'Toca na coroa.',
  alt: 'No palácio, o rei Xerxes sorri de braços abertos. Ao lado da Ester há uma almofada vermelha com uma coroa de ouro.',
  cue: [470, 470],
  art() {
    let s = salaoPersa({});
    s += rei({ x: 640, y: 770, s: 1.06, flip: true, face: 'joy', look: .5, armL: { a: 70, b: -20 }, armR: { a: 70, b: -20 }, k: 'rei' });
    s += almofada(470, 640, 'coroa');
    s += `<g data-k="semCoroa">${person(Object.assign({}, ESTER, { x: 300, y: 770, s: 1.04, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 30 } }))}</g>`;
    s += `<g data-k="comCoroa" opacity="0" style="pointer-events:none">${person(Object.assign({}, RAINHA, { x: 300, y: 770, s: 1.04, face: 'joy', look: .5, armL: { a: 60, b: -20 }, armR: { a: 60, b: -20 } }))}</g>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('coroa'), 'Coroa', async () => {
      if (api.st.feito) { api.snd('chime', 'E6'); return; }
      api.st.feito = true;
      api.snd('whoosh');
      await api.anim(api.act(api.q('coroa')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-90px,-120px)', offset: .5 }, { transform: 'translate(-170px,-60px)' }], { duration: 800, fill: 'forwards', easing: 'ease-in-out' });
      api.q('coroa').setAttribute('opacity', '0');
      api.anim(api.q('semCoroa'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      await api.anim(api.q('comCoroa'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('fanfare');
      api.burst(300, 520, 'spark', 10);
      api.bubble(630, 430, 'Viva a rainha Ester!', { key: 'r' });
      api.nudgeNext(2600);
    });
    api.tap(api.q('rei'), 'Rei Xerxes', () => { api.snd('hello'); api.bubble(630, 430, api.st.feito ? 'Viva a rainha Ester!' : 'A Ester vai ser a nova rainha!', { key: 'r' }); });
  }
});

/* =====================================================================
   3 — MARDOQUEU SALVA O REI
   ===================================================================== */
SCENES.push({
  key: 'salva', title: 'Mardoqueu salva o rei', ref: 'Ester 2.21-23', tint: 'sky',
  text: [
    'Um dia, à porta do palácio, o Mardoqueu ouviu dois guardas a combinar fazer mal ao rei.',
    'Contou tudo à Ester, e o rei foi salvo! E isso ficou escrito no livro do rei.'
  ],
  fact: 'Mais tarde, o rei leu esse livro e deu uma grande honra ao Mardoqueu!',
  hint: 'Toca nos guardas e no Mardoqueu.',
  alt: 'À porta do palácio, dois guardas cochicham. Escondido junto a uma coluna, o Mardoqueu põe a mão atrás da orelha para ouvir.',
  cue: [600, 520],
  art() {
    let s = portaoRei({});
    s += person(Object.assign({}, GUARDAS[0], { x: 540, y: 770, s: 1, face: 'grin', look: .4, armL: { a: 14, item: ITEM.spear(250) }, armR: { a: 50, b: -40 }, k: 'g0' }));
    s += person(Object.assign({}, GUARDAS[1], { x: 650, y: 776, s: 1, flip: true, face: 'grin', look: .4, armL: { a: 14, item: ITEM.spear(250) }, armR: { a: 50, b: -40 }, k: 'g1' }));
    s += person(Object.assign({}, MARDOQUEU, { x: 190, y: 770, s: 1.02, face: 'surprise', look: .7, armL: { a: 14 }, armR: { a: 150, b: -150 }, k: 'mardoqueu' }));
    return s;
  },
  setup(api) {
    const psst = () => { api.snd('shh'); api.bubble(595, 450, 'Psst... psst...', { key: 'g', size: 28 }); };
    api.tap(api.q('g0'), 'Guarda', psst);
    api.tap(api.q('g1'), 'Guarda', psst);
    api.tap(api.q('mardoqueu'), 'Mardoqueu', () => { api.snd('hm'); api.bubble(210, 440, 'Querem fazer mal ao rei! Vou avisar a Ester!', { key: 'm' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
  }
});

/* =====================================================================
   4 — O MALVADO HAMÃ
   ===================================================================== */
SCENES.push({
  key: 'hama', title: 'O malvado Hamã', ref: 'Ester 3.1-11', tint: 'dusk',
  text: [
    'Hamã era um homem muito orgulhoso. Queria que todos se curvassem diante dele.',
    'Mas o Mardoqueu não se curvava. Então, o Hamã ficou furioso e fez um plano malvado contra todo o povo judeu.'
  ],
  fact: 'O Hamã enganou o rei, e o rei carimbou a lei com o seu anel.',
  hint: 'Toca no Hamã e no Mardoqueu.',
  alt: 'À porta do palácio, o orgulhoso Hamã passa de nariz no ar. Duas pessoas curvam-se diante dele, mas o Mardoqueu continua de pé.',
  cue: [430, 520],
  art() {
    let s = portaoRei({});
    s += person(Object.assign({}, POVO[0], { x: 600, y: 770, s: .9, legs: 'kneel', hemY: -62, face: 'sleep', look: -.4, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'p0' }));
    s += person(Object.assign({}, POVO[2], { x: 700, y: 780, s: .9, legs: 'kneel', hemY: -62, face: 'sleep', look: -.4, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'p1' }));
    s += hama({ x: 430, y: 770, s: 1.06, face: 'angry', look: -.5, armL: { a: 20 }, armR: { a: 100, b: -10 }, k: 'hama' });
    s += person(Object.assign({}, MARDOQUEU, { x: 170, y: 770, s: 1.02, face: 'determined', look: .5, armL: { a: 14 }, armR: { a: 14 }, k: 'mardoqueu' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('hama'), 'Hamã', () => { api.snd('grunt'); api.shakeHead(api.q('hama')); api.bubble(430, 430, 'Curvem-se diante de mim!', { key: 'h' }); });
    api.tap(api.q('mardoqueu'), 'Mardoqueu', () => { api.snd('hm'); api.bubble(190, 430, 'Eu só me curvo diante de Deus!', { key: 'm' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    for (let i = 0; i < 2; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => { api.snd('hm'); api.bubble(650, 520, 'Sim, senhor Hamã...', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   5 — PARA UM MOMENTO COMO ESTE
   ===================================================================== */
SCENES.push({
  key: 'momento', title: 'Para um momento como este', ref: 'Ester 4.13-16', tint: 'night',
  text: [
    'O Mardoqueu mandou dizer à Ester:',
    { q: 'Quem sabe se não foi para um momento como este que chegaste a rainha?', who: 'davi' },
    'A Ester pediu a todos que orassem por ela. Depois, ia falar com o rei, mesmo sendo perigoso.'
  ],
  fact: 'Ninguém podia ir ter com o rei sem ser chamado. Era muito perigoso!',
  hint: 'Toca na Ester para ela orar.',
  alt: 'De noite, no seu quarto do palácio, a rainha Ester está ajoelhada a orar. Duas aias oram com ela.',
  cue: [400, 560],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#4a3a70"/><g opacity=".4">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${-20 + i * 110}" y="-40" width="54" height="640" fill="${['#5a4a80', '#6a4a7a'][i % 2]}"/>`).join('')}</g>`;
    s += `<path d="M330,380 L330,200 A70,70 0 0 1 470,200 L470,380 Z" fill="#1e2a5a" stroke="${OL}" stroke-width="3.4"/>${starField(5301, 8, 340, 150, 460, 370, { big: .3 })}${moon(430, 230, 16)}`;
    s += `<rect x="-40" y="600" width="900" height="300" fill="#5a4a6a"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/>`;
    s += lampStand(110, 600, 180) + lampStand(690, 600, 180);
    s += person(Object.assign({}, AIAS[0], { x: 210, y: 760, s: .9, legs: 'kneel', hemY: -62, face: 'sleep', look: .3, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'aia0' }));
    s += person(Object.assign({}, AIAS[1], { x: 590, y: 760, s: .9, legs: 'kneel', hemY: -62, face: 'sleep', look: -.3, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'aia1' }));
    s += person(Object.assign({}, RAINHA, { x: 400, y: 780, s: 1.1, legs: 'kneel', hemY: -62, face: 'sleep', look: 0, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'ester' }));
    return s;
  },
  setup(api) {
    api.tap(api.q('ester'), 'Rainha Ester', () => { api.snd('heart'); api.burst(400, 520, 'heart', 5); api.bubble(400, 440, 'Senhor, ajuda-me a ser corajosa!', { key: 'e' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    for (let i = 0; i < 2; i++) api.tap(api.q('aia' + i), 'Aia', () => { api.snd('heart'); api.bubble(i ? 590 : 210, 520, 'Estamos a orar por ti!', { key: 'a', size: 26 }); });
  }
});

/* =====================================================================
   6 — O CETRO DE OURO
   ===================================================================== */
SCENES.push({
  key: 'cetro', title: 'O cetro de ouro', ref: 'Ester 5.1-3', tint: 'gold',
  text: [
    'A Ester vestiu-se de rainha e foi ter com o rei. Toda a gente ficou à espera...',
    'O rei estendeu o cetro de ouro: estava tudo bem! «O que queres, rainha Ester?»'
  ],
  fact: 'Se o rei estendesse o cetro de ouro, a pessoa podia aproximar-se.',
  hint: 'Toca no cetro do rei.',
  alt: 'Na sala do trono, o rei Xerxes está sentado com um cetro de ouro na mão. A rainha Ester espera à entrada.',
  cue: [560, 500],
  art() {
    let s = salaoPersa({});
    s += trono(620, 752, 1);
    s += `<g data-k="reiA">${rei({ x: 620, y: 740, s: 1.06, flip: true, ...SIT, face: 'o', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: -20, item: CETRO, ia: 0 } })}</g>`;
    s += `<g data-k="reiB" opacity="0" style="pointer-events:none">${rei({ x: 620, y: 740, s: 1.06, flip: true, ...SIT, face: 'joy', look: .5, armL: { a: 30, b: 40 }, armR: { a: 90, b: 0, item: CETRO, ia: 70 } })}</g>`;
    s += `<rect class="hit" data-k="cetro" x="500" y="300" width="220" height="300" fill="#000" fill-opacity="0"/>`;
    s += `<g data-k="ester">${person(Object.assign({}, RAINHA, { x: 220, y: 770, s: 1.06, face: 'worry', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } }))}</g>`;
    s += `<g data-k="esterB" opacity="0" style="pointer-events:none">${person(Object.assign({}, RAINHA, { x: 300, y: 770, s: 1.06, face: 'joy', look: .6, armL: { a: 20 }, armR: { a: 90, b: -10 } }))}</g>`;
    return s;
  },
  setup(api) {
    const estende = async () => {
      if (api.st.feito) { api.snd('chime', 'G6'); api.burst(460, 500, 'spark', 6); return; }
      api.st.feito = true;
      api.snd('chime', 'E6');
      api.anim(api.q('reiA'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      await api.anim(api.q('reiB'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.burst(470, 520, 'spark', 8);
      await api.wait(500);
      api.anim(api.q('ester'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('esterB'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('heart');
      api.bubble(620, 400, 'O que queres, rainha Ester?', { key: 'r' });
      api.nudgeNext(2800);
    };
    api.tap(api.q('cetro'), 'Cetro do rei', estende);
    api.tap(api.q('ester'), 'Rainha Ester', () => { if (!api.st.feito) { api.snd('hm'); api.bubble(220, 430, 'Será que o rei me vai receber?', { key: 'e' }); } });
  }
});

/* =====================================================================
   7 — UM JANTAR ESPECIAL
   ===================================================================== */
SCENES.push({
  key: 'jantar', title: 'Um jantar especial', ref: 'Ester 7.1-6', tint: 'rose',
  text: [
    'A Ester convidou o rei e o Hamã para um jantar especial.',
    'Ali, contou tudo ao rei: «Há alguém que quer fazer mal ao meu povo. É ele: o malvado Hamã!»'
  ],
  fact: 'O rei ficou tão zangado que se levantou da mesa e foi para o jardim.',
  hint: 'Toca na Ester, no rei e no Hamã.',
  alt: 'À volta de uma mesa cheia de comida estão o rei, a rainha Ester e o Hamã. A Ester aponta para o Hamã, que fica cheio de medo.',
  cue: [400, 470],
  art() {
    let s = salaoPersa({ tapete: false });
    s += rei({ x: 170, y: 700, s: 1, ...SIT, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'rei' });
    s += person(Object.assign({}, RAINHA, { x: 400, y: 700, s: 1, ...SIT, face: 'determined', look: .6, armL: { a: 30, b: 40 }, armR: { a: 95, b: -5 }, k: 'ester' }));
    s += `<g data-k="hamaA">${hama({ x: 630, y: 700, s: 1, ...SIT, flip: true, face: 'grin', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } })}</g>`;
    s += `<g data-k="hamaB" opacity="0" style="pointer-events:none">${hama({ x: 630, y: 700, s: 1, ...SIT, flip: true, face: 'scared', look: .5, armL: { a: 150, b: -30 }, armR: { a: 150, b: -30 } })}</g>`;
    s += `<rect class="hit" data-k="hama" x="560" y="430" width="150" height="260" fill="#000" fill-opacity="0"/>`;
    s += mesa(400, 690, 640);
    return s;
  },
  setup(api) {
    const conta = async () => {
      api.snd('hm');
      api.bubble(400, 400, 'É ele: o malvado Hamã!', { key: 'e' });
      if (api.st.feito) return;
      api.st.feito = true;
      await api.wait(900);
      api.anim(api.q('hamaA'), [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      await api.anim(api.q('hamaB'), [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      api.snd('boing');
      api.bubble(640, 420, 'Oh, não!', { key: 'h', size: 32 });
      api.nudgeNext(2600);
    };
    api.tap(api.q('ester'), 'Rainha Ester', conta);
    api.tap(api.q('rei'), 'Rei Xerxes', () => { api.snd('grunt'); api.shakeHead(api.q('rei')); api.bubble(180, 400, api.st.feito ? 'Que coisa tão má!' : 'Que jantar tão bom!', { key: 'r' }); });
    api.tap(api.q('hama'), 'Hamã', () => { api.snd(api.st.feito ? 'boing' : 'laugh'); api.bubble(640, 420, api.st.feito ? 'Oh, não!' : 'Que honra jantar com a rainha!', { key: 'h' }); });
  }
});

/* =====================================================================
   8 — O POVO FOI SALVO!
   ===================================================================== */
SCENES.push({
  key: 'festa', title: 'O povo foi salvo!', ref: 'Ester 8 e 9', tint: 'meadow',
  text: [
    'O rei castigou o Hamã e deu ao Mardoqueu um lugar muito importante no reino.',
    'Fez uma nova lei para proteger os judeus, e o povo fez uma grande festa!'
  ],
  fact: 'Ainda hoje, os judeus lembram esta história numa festa chamada Purim.',
  hint: 'Toca nas pessoas para festejar.',
  alt: 'Na rua enfeitada com bandeirolas, o povo faz uma grande festa. A rainha Ester e o Mardoqueu, com roupas reais, sorriem.',
  cue: [560, 560],
  art() {
    let s = portaoRei({ chao: '#ead7aa' });
    s += bandeirolas(110);
    s += person(Object.assign({}, RAINHA, { x: 200, y: 770, s: 1.04, face: 'joy', look: .4, armL: { a: 60, b: -20 }, armR: { a: 150, b: -20 }, k: 'ester' }));
    s += person(Object.assign({}, MARDOQUEU_REAL, { x: 330, y: 776, s: 1.02, face: 'joy', look: .3, armL: { a: 30 }, armR: { a: 150, b: -20 }, k: 'mardoqueu' }));
    const P = [[480, 790, 1], [570, 776, 0], [660, 790, 3], [750, 776, 2]];
    P.forEach(([x, y, p], i) => s += person(Object.assign({}, POVO[p], { x, y, s: POVO[p].kind === 'adult' ? .9 : .92, face: 'laugh', look: -.3, legs: i % 2 ? 'hop' : 'stand', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'p' + i })));
    return s;
  },
  setup(api) {
    let n = 0;
    for (let i = 0; i < 4; i++) api.tap(api.q('p' + i), 'Pessoa do povo', () => {
      const [x, y, sc] = api.pos(api.q('p' + i));
      api.snd('tambourine'); api.hop(api.q('p' + i), 16);
      api.burst(x, y - 220 * sc, 'confetti', 10);
      if (++n === 3) api.nudgeNext(2400);
    });
    api.tap(api.q('ester'), 'Rainha Ester', () => { api.snd('heart'); api.burst(200, 540, 'heart', 5); api.bubble(210, 430, 'Deus salvou o Seu povo!', { key: 'e' }); });
    api.tap(api.q('mardoqueu'), 'Mardoqueu', () => { api.snd('fanfare'); api.bubble(340, 430, 'Vamos fazer festa!', { key: 'm' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o palácio do rei. Uma ovelhinha dorme junto a uma coroa de ouro.',
  cue: [430, 160],
  questions: [
    ['Quem cuidou da Ester quando ela era pequena?', 'O primo Mardoqueu.'],
    ['Quem queria fazer mal ao povo de Deus?', 'O malvado Hamã.'],
    ['O que estendeu o rei para receber a Ester?', 'O cetro de ouro.'],
    ['Onde é que a Ester contou tudo ao rei?', 'Num jantar especial.'],
    ['Como se chama a festa que lembra esta história?', 'Purim.']
  ],
  verse: ['Quem sabe se não foi para um momento como este que chegaste a rainha?', 'Ester 4.14'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(5401, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += `<g opacity=".9"><rect x="420" y="520" width="380" height="180" fill="#2a3a6a"/><path d="M420,520 L800,520" stroke="#f2c14e" stroke-width="5" opacity=".6"/>${[460, 540, 620, 700, 780].map(x => `<rect x="${x - 14}" y="560" width="28" height="44" rx="14" fill="#ffd27a" opacity=".55"/>`).join('')}</g>`;
    s += hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 672]], '#2c584f');
    s += `<g transform="translate(360,742)">${coroa(.9)}</g>`;
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
  id: 'ester',
  title: 'Ester, a Rainha Corajosa',
  cover: { kicker: 'Uma história da Bíblia', title: 'Ester', small: 'a Rainha Corajosa', sub: 'Deus tem um plano para ti' },
  color: '#8a4bb5',
  ref: 'Ester 2 a 9',
  scenes: SCENES
});
})();
