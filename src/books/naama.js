/* =====================================================================
   LIVRO: NAAMÃ E A MENINA CORAJOSA  (2 Reis 5.1-19)
   ===================================================================== */
(() => {
const SCENES = [];
// o general, com armadura (em casa e no rio, sem ela)
const NAAMA_ROUPA = { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', hairStyle: 'short', beard: 'short', beardCol: '#2b1d17', tunic: '#8e3b4f', belt: '#f2c14e', blush: false };
const NAAMA = Object.assign({}, NAAMA_ROUPA, { head: 'helmetI', cloak: '#2f5f8f', cloakTrim: '#f2c14e', armor: scaleArmor('adult', '#c08a44', '#8d5f27') });
const NAAMA_RIO = Object.assign({}, NAAMA_ROUPA, { tunic: '#f4efe6', belt: '#c9a54e' });
const MENINA = { kind: 'child', skin: '#d39463', hairStyle: 'long', hair: '#3a2520', head: 'scarf', clothCol: '#f4efe6', tunic: '#5fa8d3', belt: '#e9c46a' };
const ESPOSA = { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#e9c46a', hairStyle: 'long', hair: '#2b1d17', tunic: '#8a5fc2', stripes: '#c9a6e0', belt: '#f2c14e' };
const ELISEU = { kind: 'adult', skin: '#d99a6c', hair: '#e2ddd5', hairStyle: 'full', beard: 'long', beardCol: '#ece8e0', tunic: '#7a5a3a', cloak: '#5e4a3a', belt: '#c9a54e' };
const SERVO = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', hairStyle: 'short', tunic: '#a8c46a', belt: '#7b4a2a' };
const SOLDADOS = [
  { kind: 'adult', skin: '#b9784c', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'helmetI', tunic: '#c0504d', belt: '#8a5a33' },
  { kind: 'adult', skin: '#d39463', hair: '#3a2520', beard: 'bushy', beardCol: '#3a2520', head: 'helmetI', tunic: '#c0504d', belt: '#8a5a33' }
];
const EMPREGADOS = [
  { kind: 'adult', skin: '#b9784c', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'cloth', clothCol: '#f4efe6', bandCol: '#8e3b4f', tunic: '#e9c46a', belt: '#8e3b4f' },
  { kind: 'adult', skin: '#d39463', hair: '#5a3020', hairStyle: 'short', tunic: '#7fb2e0', belt: '#7b4a2a' }
];
const p = (who, o) => person(Object.assign({}, who, o));

/* ---------- peças desta história ---------- */
// manchas da doença, na cara e nos braços (coordenadas do personagem adulto)
function manchas(armL, armR, k = 'manchas') {
  const spot = (x, y, r) => `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r}" ry="${r1(r * .8)}" fill="#f2e4d8" stroke="#c99a7a" stroke-width="1.6"/>`;
  let g = spot(-18, -209, 4.6) + spot(18, -213, 4) + spot(7, -183, 3.6);
  for (const [side, A0] of [[-1, armL], [1, armR]]) {
    const A = A0 || { a: 12 }, G = ADULT;
    const rot = (side < 0 ? (A.a ?? 12) : -(A.a ?? 12)) * Math.PI / 180, bend = ((A.b ?? 0) * (side < 0 ? 1 : -1)) * Math.PI / 180;
    const L = A.len ?? G.arm, u = L * .52, f = L - u, sx = side * (G.shW - 4), sy = G.shY + 8;
    const ex = sx - Math.sin(rot) * u, ey = sy + Math.cos(rot) * u, hx = ex - Math.sin(rot + bend) * f, hy = ey + Math.cos(rot + bend) * f;
    g += spot(hx, hy, 3.4) + spot((hx + ex) / 2, (hy + ey) / 2, 3.8);
  }
  return `<g data-k="${k}">${g}</g>`;
}
const naama = (o) => p(NAAMA, Object.assign({}, o, { extra: o.doente === false ? '' : manchas(o.armL, o.armR) }));
// carro de guerra puxado por um cavalo (virado para a direita), com alguém lá dentro
function carro(x, y, s = 1, o = {}) {
  let g = equine({ x: 150, y: 0, s: .82, kind: 'horse', cls: 'bob', k: o.kc || '' });
  g += `<path d="M30,-50 L120,-66" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`;
  g += o.dentro || '';
  g += `<path d="M-74,-74 L36,-74 L36,-22 L-64,-22 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-66,-60 L30,-60" stroke="#8e3b4f" stroke-width="6"/><path d="M-60,-40 L30,-40" stroke="#b9873a" stroke-width="3"/>`;
  g += `<g transform="translate(-14,-22)"><g class="${o.roda ? 'spin' : ''}" style="--d:2s"><circle r="32" fill="none" stroke="${OL}" stroke-width="10"/><circle r="32" fill="none" stroke="#8a5a33" stroke-width="6"/>${[0, 60, 120].map(a => { const c = r1(Math.cos(a * Math.PI / 180) * 30), sn = r1(Math.sin(a * Math.PI / 180) * 30); return `<path d="M${-c},${-sn} L${c},${sn}" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M${-c},${-sn} L${c},${sn}" stroke="#a46e3c" stroke-width="3.4" stroke-linecap="round"/>`; }).join('')}<circle r="7" fill="#d9a33a" stroke="${OL}" stroke-width="2.6"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}><g class="act">${g}</g></g>`;
}
function bau(x, y, s = 1, k = '') {
  let g = `<rect x="-60" y="-56" width="120" height="56" rx="6" fill="#8a5a33" stroke="${OL}" stroke-width="3"/><path d="M-60,-56 Q0,-96 60,-56 Z" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="-8" y="-60" width="16" height="22" rx="3" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/>`;
  g += `<g fill="#f2c14e" stroke="${OL}" stroke-width="2">${[[-30, -62], [-10, -68], [12, -66], [32, -60]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="12" ry="5"/>`).join('')}</g><path d="M-44,-66 C-40,-80 -20,-80 -16,-70" stroke="#d6dde3" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -40, 66) : ''}</g></g>`;
}
function jarro(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M12,-50 C30,-50 30,-26 18,-22" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M12,-50 C30,-50 30,-26 18,-22" stroke="#d9a33a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-9,-60 L9,-60 L8,-48 C26,-40 28,-16 18,0 L-18,0 C-28,-16 -26,-40 -8,-48 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-60" rx="10" ry="4" fill="#4f9fd0" stroke="${OL}" stroke-width="2.2"/></g>`;
}
// casinha do Eliseu; o.janela mostra a cabeça do profeta à janela
function casaEliseu(x, y, s = 1, o = {}) {
  let g = `<rect x="-140" y="-210" width="280" height="210" fill="#e7cfa2" stroke="${OL}" stroke-width="3.4"/><rect x="50" y="-210" width="90" height="210" fill="#d6b983" opacity=".5"/>`;
  g += `<rect x="-150" y="-224" width="300" height="18" rx="4" fill="#cdb084" stroke="${OL}" stroke-width="3"/>`;
  g += `<path d="M-110,0 L-110,-120 A40,40 0 0 1 -30,-120 L-30,0 Z" fill="#7a5236" stroke="${OL}" stroke-width="3"/>`;
  g += `<defs><clipPath id="${ID('janela')}"><rect x="20" y="-170" width="90" height="74" rx="8"/></clipPath></defs><rect x="20" y="-170" width="90" height="74" rx="8" fill="#5a3a26" stroke="${OL}" stroke-width="3"/>`;
  if (o.janela) g += `<g data-k="eliseu"><g clip-path="${UR('janela')}">${p(ELISEU, { x: 66, y: 72, s: .9, face: 'smile', look: -.5, armL: { a: 20 }, armR: { a: 20 } })}</g>${hitC(66, -130, 50)}</g><rect x="20" y="-170" width="90" height="74" rx="8" fill="none" stroke="${OL}" stroke-width="3.4"/>`;
  g += `<path d="M-130,-40 L-60,-40 M80,-60 L120,-60" stroke="#d6b983" stroke-width="4" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function caminho(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 40 }, o.day || {}));
  s += hill([[-40, 430], [200, 392], [440, 418], [680, 384], [840, 404]], o.far || '#b9c98a');
  s += `<rect x="-40" y="${o.chaoY ?? 560}" width="900" height="400" fill="${o.chao || '#e6d3a4'}"/>`;
  return s;
}
// o rio Jordão: wy = linha da água
function jordao(wy = 560, o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 40 }, o.day || {}));
  s += hill([[-40, wy - 140], [200, wy - 176], [440, wy - 150], [680, wy - 186], [840, wy - 160]], '#b9c98a');
  s += `<path d="M-40,${wy - 70} C200,${wy - 90} 520,${wy - 60} 840,${wy - 84} L840,${wy - 10} L-40,${wy - 10} Z" fill="#a8c46a"/>`;
  s += palm(110, wy - 50, .8) + palm(690, wy - 60, .7);
  s += `<rect x="-40" y="${wy - 14}" width="900" height="400" fill="#5fa8d3"/><path d="M-40,${wy - 14} C200,${wy - 24} 520,${wy - 4} 840,${wy - 18}" stroke="#8fc6e8" stroke-width="6" fill="none"/>`;
  return s;
}
function juncos(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><g class="sway" style="--r:3deg;--d:3s;${dl(3)}">${[-16, -6, 4, 14].map((a, i) => `<path d="M${a},0 Q${a + 4},-50 ${a + (i % 2 ? 10 : -6)},-${90 + i * 8}" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${a},0 Q${a + 4},-50 ${a + (i % 2 ? 10 : -6)},-${90 + i * 8}" stroke="#5f9440" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}<ellipse cx="-2" cy="-74" rx="6" ry="16" fill="#8a5a33" stroke="${OL}" stroke-width="2.4"/></g></g>`;
}
// água da frente (tapa o que está dentro do rio)
function aguaFrente(wy, o = {}) {
  return `<path d="M-40,${wy} q50,-12 100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 L840,${wy + 600} L-40,${wy + 600} Z" fill="#4f9fd0" opacity="${o.op ?? .92}"/><g stroke="#cfeaf7" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9">${[[60, 30], [250, 60], [520, 40], [700, 70], [380, 100]].map(([a, b]) => `<path class="drift" style="--dx:20px;--d:3s;${dl(3)}" d="M${a},${wy + b} q10,-6 20,0 q10,6 20,0"/>`).join('')}</g>`;
}
function salaRica() {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#efdcc0"/>`;
  s += `<path d="M-40,-40 L840,-40 L840,60 Q600,110 400,60 Q200,110 -40,60 Z" fill="#8a5fc2" stroke="${OL}" stroke-width="3"/><path d="M-40,60 Q200,110 400,60 Q600,110 840,60" stroke="#f2c14e" stroke-width="6" fill="none"/>`;
  s += column(90, 130, 600, 56) + column(710, 130, 600, 56);
  s += `<path d="M260,420 L260,240 A80,80 0 0 1 540,240 L540,420 Z" fill="#9fd3ef" stroke="${OL}" stroke-width="3.4"/>${palm(330, 420, .55)}${palm(470, 420, .45)}`;
  s += `<rect x="-40" y="590" width="900" height="300" fill="#c9a873"/><path d="M-40,590 L840,590" stroke="${OL}" stroke-width="4"/><path d="M200,596 L600,596 L660,820 L140,820 Z" fill="#b5402f" opacity=".45"/>`;
  return s;
}
function banco(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-64" width="180" height="20" rx="8" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="-80" y="-46" width="14" height="46" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="66" y="-46" width="14" height="46" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="-86" y="-80" width="172" height="18" rx="9" fill="#e9c46a" stroke="${OL}" stroke-width="2.6"/></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Naamã e a Menina Corajosa',
  alt: 'O Naamã está dentro do rio Jordão, de braços no ar, muito contente. Na margem, a menina de Israel bate palmas.',
  cue: [360, 780],
  art() {
    let s = sky('sky', [[0, '#8fcbec'], [.5, '#d4eef7'], [1, '#eef6e6']], 1100);
    s += sun(660, 330, 46, { face: true }) + cloud(160, 320, .9) + cloud(460, 250, .7);
    s += hill([[-40, 690], [200, 650], [440, 676], [680, 640], [840, 664]], '#b9c98a');
    s += `<path d="M-40,760 C200,740 520,770 840,746 L840,800 L-40,800 Z" fill="#a8c46a"/>`;
    s += palm(90, 770, .9) + palm(720, 760, .8);
    s += `<rect x="-40" y="786" width="900" height="400" fill="#5fa8d3"/>`;
    s += p(NAAMA_RIO, { x: 340, y: 1090, s: 1.3, face: 'laugh', look: .3, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'naama' });
    s += aguaFrente(936, { op: 1 });
    s += `<g fill="#cfeaf7" stroke="${OL}" stroke-width="2.4">${[[230, 900], [440, 880], [270, 860], [410, 920]].map(([a, b]) => `<path class="float" style="${dl(3)}" d="M${a},${b} c-8,-14 -2,-26 8,-30 c-2,10 6,18 -8,30 Z"/>`).join('')}</g>`;
    s += `<path d="M560,1100 C580,1000 640,960 840,950 L840,1100 Z" fill="#c9b27e" stroke="${OL}" stroke-width="3"/>`;
    s += juncos(560, 1010, 1) + juncos(780, 980, .9);
    s += p(MENINA, { x: 660, y: 1050, s: 1.2, face: 'laugh', look: -.5, armL: { a: 60, b: -60 }, armR: { a: 60, b: -60 }, k: 'menina' });
    return s;
  },
  setup(api) {
    api.tap(api.q('naama'), 'Naamã', () => { api.snd('splash'); api.burst(340, 760, 'spark', 10, { col: '#ffe9a6' }); api.bubble(340, 640, 'Estou curado!', { key: 'n' }); });
    api.tap(api.q('menina'), 'Menina', () => { api.snd('clap'); api.hop(api.q('menina'), 12); api.bubble(640, 760, 'Deus é bom!', { key: 'm' }); });
  }
});

/* =====================================================================
   1 — UM GENERAL IMPORTANTE
   ===================================================================== */
SCENES.push({
  key: 'general', title: 'Um general importante', ref: '2 Reis 5.1', tint: 'stone',
  text: [
    'O Naamã era o chefe do exército do rei da Síria. Era um homem forte e muito importante.',
    'Mas tinha uma doença na pele, chamada lepra, e ninguém o conseguia curar.'
  ],
  fact: 'A lepra deixava manchas na pele. Naquele tempo, não havia remédio para ela.',
  hint: 'Toca no Naamã e nos soldados.',
  alt: 'O general Naamã, de capacete e capa azul, está à frente dos seus soldados. Tem manchas claras na cara e nas mãos.',
  cue: [400, 560],
  art() {
    let s = caminho({ far: '#c9b27e', chao: '#e2cfa0' });
    s += town(-20, 520, 1.2, { wall: '#efd9ae', shade: '#d9bd88', roof: '#e2c696' }) + town(520, 512, 1.15, { wall: '#f1dcb2', shade: '#dbc08c', roof: '#e2c696' });
    s += palm(260, 560, .9) + palm(600, 556, .8);
    s += p(SOLDADOS[0], { x: 160, y: 760, s: .94, face: 'determined', look: .4, armL: { a: 14 }, armR: { a: 20, item: ITEM.spear(), ia: 0 }, k: 's0' });
    s += p(SOLDADOS[1], { x: 640, y: 760, s: .94, flip: true, face: 'determined', look: .4, armL: { a: 14 }, armR: { a: 20, item: ITEM.spear(), ia: 0 }, k: 's1' });
    s += naama({ x: 400, y: 776, s: 1.1, face: 'sad', look: 0, armL: { a: 30, b: -60 }, armR: { a: 20 }, k: 'naama' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2600); };
    api.tap(api.q('naama'), 'Naamã', () => { api.snd('hm'); api.shakeHead(api.q('naama')); api.bubble(400, 440, 'Ai, esta doença...', { key: 'n' }); ok('n'); });
    for (const i of [0, 1]) api.tap(api.q('s' + i), 'Soldado', () => { const [x, y, sc] = api.pos(api.q('s' + i)); api.snd('stomp'); api.hop(api.q('s' + i), 10); api.bubble(x, y - 290 * sc, 'Às ordens, general!', { key: 's', size: 26 }); ok('s'); });
  }
});

/* =====================================================================
   2 — A MENINA DE ISRAEL
   ===================================================================== */
SCENES.push({
  key: 'menina', title: 'A menina de Israel', ref: '2 Reis 5.2-3', tint: 'rose',
  text: [
    'Em casa do Naamã vivia uma menina de Israel, longe da sua família. Ela ajudava a mulher do Naamã.',
    'Um dia, a menina disse: «Se o meu senhor fosse ter com o profeta Eliseu, em Israel, ficava curado!»'
  ],
  fact: 'A menina vivia longe de casa, mas continuou a confiar em Deus. E teve coragem de falar de Deus!',
  hint: 'Toca na menina e na senhora.',
  alt: 'Numa sala bonita, a mulher do Naamã está sentada. A menina de Israel, com um jarro na mão, fala-lhe do profeta Eliseu.',
  cue: [560, 600],
  art() {
    let s = salaRica();
    s += banco(290, 812, .9);
    s += p(ESPOSA, { x: 290, y: 780, s: 1, legs: 'sit', drop: 30, hemY: -62, face: 'surprise', look: .5, armL: { a: 20, b: -20 }, armR: { a: 40, b: -60 }, k: 'esposa' });
    s += p(MENINA, { x: 560, y: 770, s: 1.24, flip: true, face: 'joy', look: .5, armL: { a: 20, b: -40 }, armR: { a: 70, b: -20 }, k: 'menina' });
    s += jarro(612, 668, .9);
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2600); };
    api.tap(api.q('menina'), 'Menina', () => { api.snd('hello'); api.hop(api.q('menina'), 10); api.bubble(560, 450, 'O Deus de Israel pode curar o meu senhor!', { key: 'm' }); ok('m'); });
    api.tap(api.q('esposa'), 'Mulher do Naamã', () => { api.snd('hm'); api.bubble(290, 470, 'A sério? Vou contar ao Naamã!', { key: 'e' }); ok('e'); });
  }
});

/* =====================================================================
   3 — A VIAGEM ATÉ ISRAEL
   ===================================================================== */
SCENES.push({
  key: 'viagem', title: 'A viagem até Israel', ref: '2 Reis 5.5-9', tint: 'sand',
  text: [
    'O Naamã partiu para Israel com cavalos, carros e muitos presentes.',
    'Foi até à casa do profeta Eliseu e parou à porta.'
  ],
  fact: 'O Naamã levou ouro, prata e dez fatos novos para dar de presente.',
  hint: 'Toca no carro do Naamã e no baú dos presentes.',
  alt: 'O Naamã chega num carro puxado por um cavalo e para em frente da casa simples do profeta Eliseu. Atrás, um empregado traz um baú com presentes.',
  cue: [250, 600],
  art() {
    let s = caminho({ chaoY: 560 });
    s += `<path d="M-40,700 C200,660 460,650 840,640 L840,740 C460,750 200,760 -40,800 Z" fill="#efdcb0" stroke="#d2b98a" stroke-width="3"/>`;
    s += casaEliseu(640, 640, .9) + olive(770, 650, .7);
    s += p(EMPREGADOS[1], { x: 80, y: 720, s: .72, face: 'smile', look: .5, armL: { a: 30 }, armR: { a: 60, b: -30 } }) + bau(110, 770, .8, 'bau');
    s += carro(250, 740, 1.05, { k: 'carro', dentro: naama({ x: -14, y: -24, s: .74, face: 'determined', look: .6, armL: { a: 70, b: -20 }, armR: { a: 70, b: -20 }, cls: '' }) });
    return s;
  },
  setup(api) {
    api.tap(api.q('carro'), 'Carro do Naamã', async () => {
      api.snd('stomp'); api.bubble(250, 420, 'É aqui que vive o profeta?', { key: 'n' });
      if (api.st.foi) return;
      api.st.foi = true;
      await api.anim(api.act(api.q('carro')), [{ transform: 'translateX(-60px)' }, { transform: 'translateX(0px)' }], { duration: 900, easing: 'ease-out' });
      api.nudgeNext(2600);
    });
    api.tap(api.q('bau'), 'Baú dos presentes', () => { api.snd('gift'); api.hop(api.q('bau'), 10); api.burst(110, 700, 'spark', 8, { col: '#f2c14e' }); api.bubble(150, 560, 'Ouro e prata!', { key: 'b' }); });
  }
});

/* =====================================================================
   4 — O RECADO DO ELISEU
   ===================================================================== */
SCENES.push({
  key: 'recado', title: 'O recado do Eliseu', ref: '2 Reis 5.10', tint: 'sand',
  text: [
    'O Eliseu nem saiu de casa. Mandou um empregado dizer ao Naamã:',
    { q: 'Vai lavar-te sete vezes no rio Jordão, e ficarás curado!', who: 'davi' }
  ],
  fact: 'O rio Jordão é o rio onde, muitos anos depois, Jesus foi batizado.',
  hint: 'Toca no empregado do Eliseu e na janela.',
  alt: 'À porta da casa do Eliseu, um empregado dá o recado ao Naamã, que está no seu carro. O profeta espreita à janela.',
  cue: [520, 560],
  art() {
    let s = caminho({ chaoY: 560 });
    s += casaEliseu(560, 640, 1.15, { janela: true });
    s += `<rect x="-40" y="636" width="900" height="300" fill="#e6d3a4"/>`;
    s += olive(780, 640, .7);
    s += carro(120, 770, .95, { k: 'carro', dentro: naama({ x: -14, y: -24, s: .74, face: 'surprise', look: .6, armL: { a: 30, b: -40 }, armR: { a: 20 }, cls: '' }) });
    s += p(SERVO, { x: 470, y: 776, s: 1, flip: true, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 110, b: -20 }, k: 'servo' });
    return s;
  },
  setup(api) {
    api.tap(api.q('servo'), 'Empregado do Eliseu', () => { api.snd('hello'); api.bubble(470, 440, 'Sete vezes no rio Jordão!', { key: 's' }); api.later(() => api.bubble(150, 420, 'O quê? Só isso?', { key: 'n' }), 1400); if (!api.st.n) { api.st.n = true; api.nudgeNext(3400); } });
    api.tap(api.q('eliseu'), 'Eliseu', () => { api.snd('heart'); api.burst(636, 470, 'heart', 3); api.bubble(636, 340, 'Deus vai curar-te!', { key: 'e' }); });
    api.tap(api.q('carro'), 'Carro do Naamã', () => { api.snd('stomp'); api.bubble(150, 420, 'O profeta nem vem falar comigo?', { key: 'n' }); });
  }
});

/* =====================================================================
   5 — O NAAMÃ FICA ZANGADO
   ===================================================================== */
SCENES.push({
  key: 'zangado', title: 'O Naamã fica zangado', ref: '2 Reis 5.11-13', tint: 'stone',
  text: [
    'O Naamã ficou zangado: «Os rios da minha terra são melhores! Vou-me embora!»',
    'Mas os empregados disseram-lhe: «Senhor, experimenta! Lava-te no rio e ficarás curado!»'
  ],
  fact: 'Às vezes, é difícil fazer o que Deus diz. Mas obedecer a Deus é sempre o melhor!',
  hint: 'Toca nos empregados para convencerem o Naamã.',
  alt: 'Num caminho perto do rio, o Naamã, zangado, cruza os braços. Os seus empregados pedem-lhe que experimente lavar-se no rio.',
  cue: [210, 560],
  art() {
    let s = caminho({ far: '#b9c98a' });
    s += `<path d="M560,560 C620,540 760,530 840,536 L840,600 C760,596 640,600 560,604 Z" fill="#5fa8d3" stroke="#8fc6e8" stroke-width="4"/>`;
    s += palm(700, 560, .7) + juncos(600, 590, .7);
    s += p(EMPREGADOS[0], { x: 200, y: 770, s: .96, face: 'worry', look: .5, armL: { a: 30, b: -60 }, armR: { a: 70, b: -20 }, k: 'e0' });
    s += p(EMPREGADOS[1], { x: 640, y: 776, s: .96, flip: true, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 80, b: -30 }, k: 'e1' });
    s += `<g data-k="zangado">${naama({ x: 420, y: 780, s: 1.08, face: 'angry', look: 0, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 } })}</g>`;
    s += `<g data-k="decidido" opacity="0" style="pointer-events:none">${naama({ x: 420, y: 780, s: 1.08, face: 'determined', look: .5, armL: { a: 20 }, armR: { a: 50, b: -40 } })}</g>`;
    s += `<rect class="hit" data-k="naama" x="340" y="460" width="160" height="330" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const decide = async () => {
      if (api.st.ok) return;
      api.st.ok = true;
      await api.wait(900);
      api.anim(api.q('zangado'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('decidido'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('chime', 'E6'); api.bubble(420, 430, 'Está bem. Vou experimentar!', { key: 'n' });
      api.nudgeNext(2600);
    };
    const pede = (i, txt) => () => { const [x, y, sc] = api.pos(api.q('e' + i)); api.snd('hello'); api.hop(api.q('e' + i), 10); api.bubble(x, y - 290 * sc, txt, { key: 'e' + i, size: 26 }); vistos.add(i); if (vistos.size === 2) decide(); };
    api.tap(api.q('e0'), 'Empregado', pede(0, N('Senhor, experimenta!')));
    api.tap(api.q('e1'), 'Empregado', pede(1, N('É tão fácil! Vamos ao rio!')));
    api.tap(api.q('naama'), 'Naamã', () => { if (api.st.ok) { api.snd('chime', 'E6'); api.bubble(420, 430, 'Está bem. Vou experimentar!', { key: 'n' }); return; } api.snd('grunt'); api.shakeHead(api.q('zangado')); api.bubble(420, 430, 'Os rios da minha terra são melhores!', { key: 'n' }); });
  }
});

/* =====================================================================
   6 — SETE VEZES NO RIO JORDÃO
   ===================================================================== */
SCENES.push({
  key: 'jordao', title: 'Sete vezes no rio Jordão', ref: '2 Reis 5.14', tint: 'water',
  text: [
    'Então, o Naamã entrou no rio Jordão e mergulhou uma vez, duas, três... até sete vezes!',
    'E ficou curado! A pele dele ficou limpinha, como a pele de um menino.'
  ],
  fact: 'Foi Deus que curou o Naamã, quando ele fez o que o profeta tinha dito.',
  hint: 'Toca no Naamã sete vezes para ele mergulhar.',
  alt: 'O Naamã está dentro do rio Jordão, com água até à cintura. Mergulha sete vezes e, no fim, as manchas desaparecem.',
  cue: [400, 520],
  art() {
    let s = jordao(520);
    s += p(EMPREGADOS[0], { x: 110, y: 500, s: .6, face: 'joy', look: .5, armL: { a: 30 }, armR: { a: 130, b: -20 } }) + p(EMPREGADOS[1], { x: 700, y: 496, s: .6, flip: true, face: 'smile', look: .5, armL: { a: 20 }, armR: { a: 60, b: -40 } });
    const A = { a: 30, b: -50 };
    s += `<g data-k="naama">${p(NAAMA_RIO, { x: 400, y: 846, s: 1.1, face: 'determined', look: 0, armL: A, armR: A, extra: manchas(A, A) })}${hitC(400, 640, 110)}</g>`;
    s += aguaFrente(724, { op: 1 });
    s += juncos(40, 790, 1.1) + juncos(770, 800, 1.1);
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('naama'), 'Naamã', async () => {
      if (api.st.busy) return;
      if (n >= 7) { api.snd('chime', 'G6'); api.burst(400, 600, 'spark', 8, { col: '#ffe9a6' }); api.bubble(400, 400, 'Estou curado! Obrigado, Deus!', { key: 'n' }); return; }
      api.st.busy = true;
      const el = api.act(api.q('naama'));
      api.snd('splash');
      await api.anim(el, [{ transform: 'translateY(0px)' }, { transform: 'translateY(290px)' }], { duration: 380, easing: 'ease-in', fill: 'forwards' });
      n++;
      api.badge(520, 520, String(n), { key: 'c' });
      api.snd('count', n);
      if (n === 7) api.q('manchas').setAttribute('opacity', '0');
      api.burst(400, 724, 'ripple', 3);
      await api.anim(el, [{ transform: 'translateY(290px)' }, { transform: 'translateY(0px)' }], { duration: 420, easing: 'ease-out', fill: 'forwards' });
      api.st.busy = false;
      if (n === 7) {
        api.snd('tada'); api.burst(400, 600, 'spark', 14, { col: '#ffe9a6' });
        api.bubble(400, 400, 'Estou curado! Obrigado, Deus!', { key: 'n', dur: 3000 });
        api.nudgeNext(3200);
      }
    });
  }
});

/* =====================================================================
   7 — SÓ HÁ UM DEUS!
   ===================================================================== */
SCENES.push({
  key: 'umdeus', title: 'Só há um Deus!', ref: '2 Reis 5.15-19', tint: 'gold',
  text: [
    'O Naamã voltou à casa do Eliseu, muito feliz, e disse:',
    { q: 'Agora sei que só há um Deus: o Deus de Israel!', who: 'outro' }
  ],
  fact: 'O Naamã quis dar presentes ao Eliseu, mas ele não aceitou. O que Deus dá é de graça!',
  hint: 'Toca no Naamã, no Eliseu e no baú.',
  alt: 'Diante da casa do Eliseu, o Naamã, curado, levanta os braços de alegria. O profeta Eliseu, careca e de barba branca, sorri.',
  cue: [280, 560],
  art() {
    let s = caminho({ chaoY: 560 });
    s += casaEliseu(660, 640, .9);
    s += `<rect x="-40" y="636" width="900" height="300" fill="#e6d3a4"/>`;
    s += bau(380, 780, .9, 'bau');
    s += naama({ x: 220, y: 776, s: 1.08, doente: false, face: 'laugh', look: .4, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'naama' });
    s += p(ELISEU, { x: 580, y: 776, s: 1.04, flip: true, face: 'joy', look: .5, armL: { a: 16, item: ITEM.staff(196), ia: 0 }, armR: { a: 60, b: -30 }, k: 'eliseu' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2600); };
    api.tap(api.q('naama'), 'Naamã', () => { api.snd('fanfare'); api.hop(api.q('naama'), 12); api.burst(220, 480, 'spark', 8, { col: '#ffe9a6' }); api.bubble(220, 420, 'Obrigado, Deus!', { key: 'n' }); ok('n'); });
    api.tap(api.q('eliseu'), 'Eliseu', () => { api.snd('hello'); api.bubble(580, 430, 'Vai em paz!', { key: 'e' }); ok('e'); });
    api.tap(api.q('bau'), 'Baú dos presentes', () => { api.snd('gift'); api.hop(api.q('bau'), 8); api.shakeHead(api.q('eliseu')); api.bubble(580, 430, 'Não, obrigado! Deus cura de graça!', { key: 'e' }); });
  }
});

/* =====================================================================
   8 — DE VOLTA A CASA
   ===================================================================== */
SCENES.push({
  key: 'casa', title: 'De volta a casa', ref: '2 Reis 5.19', tint: 'rose',
  text: [
    'O Naamã voltou para casa curado e muito feliz.',
    'E tudo começou com uma menina pequenina, que teve coragem de falar de Deus!'
  ],
  fact: 'Tu também podes falar de Deus aos outros, mesmo sendo pequenino!',
  hint: 'Toca na menina, no Naamã e na senhora.',
  alt: 'Em casa, o Naamã, curado, está ao lado da mulher. A menina de Israel bate palmas, contente.',
  cue: [590, 600],
  art() {
    let s = salaRica();
    s += p(ESPOSA, { x: 400, y: 776, s: 1.02, face: 'joy', look: -.4, armL: { a: 40, b: -40 }, armR: { a: 16 }, k: 'esposa' });
    s += p(NAAMA_ROUPA, { x: 220, y: 776, s: 1.1, cloak: '#2f5f8f', cloakTrim: '#f2c14e', face: 'laugh', look: .5, armL: { a: 16 }, armR: { a: 60, b: -40 }, k: 'naama' });
    s += p(MENINA, { x: 590, y: 776, s: 1.22, flip: true, face: 'laugh', look: .5, armL: { a: 60, b: -60 }, armR: { a: 60, b: -60 }, k: 'menina' });
    s += flowerBand(4801, 700, 790, 5);
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 3) api.nudgeNext(2600); };
    api.tap(api.q('menina'), 'Menina', () => { api.snd('clap'); api.hop(api.q('menina'), 12); api.burst(590, 520, 'heart', 4); api.bubble(590, 450, 'Viva! Deus curou-o!', { key: 'm' }); ok('m'); });
    api.tap(api.q('naama'), 'Naamã', () => { api.snd('laugh'); api.bubble(220, 420, 'Obrigado, menina!', { key: 'n' }); ok('n'); });
    api.tap(api.q('esposa'), 'Mulher do Naamã', () => { api.snd('heart'); api.burst(400, 520, 'heart', 3); api.bubble(400, 440, 'Que alegria!', { key: 'e' }); ok('e'); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o rio Jordão. Os juncos dançam na margem, e uma ovelhinha dorme ao lado.',
  cue: [430, 160],
  questions: [
    ['Que doença tinha o Naamã?', 'Uma doença na pele, a lepra.'],
    ['Quem falou do profeta Eliseu?', 'A menina de Israel.'],
    ['Em que rio se lavou o Naamã?', 'No rio Jordão.'],
    ['Quantas vezes mergulhou o Naamã?', 'Sete vezes!'],
    ['O que aprendeu o Naamã?', 'Que só há um Deus!']
  ],
  wrong: [
    ['Uma dor de dentes.', 'Uma perna partida.', 'Uma constipação.'],
    ['O rei da Síria.', 'Um soldado.', 'A mulher do Naamã.'],
    ['No rio Nilo.', 'No mar.', 'Numa piscina do palácio.'],
    ['Uma vez.', 'Três vezes.', 'Doze vezes.'],
    ['Que a água do rio é mágica.', 'Que o ouro cura tudo.', 'Que há muitos deuses.']
  ],
  verse: ['Agora sei que em toda a terra não há outro Deus, senão o Deus de Israel.', '2 Reis 5.15'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(4901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#29475a');
    s += `<rect x="-40" y="580" width="900" height="300" fill="#2d4f7a"/>${waveBand(600, { fill: '#2a4a72', amp: 6, len: 140, dx: 20, d: 7, foam: '#5a7aa6', fw: 3 })}`;
    s += `<path d="M-40,700 C200,676 500,690 840,668 L840,900 L-40,900 Z" fill="#3a5a52"/>`;
    s += `<g opacity=".85">${juncos(520, 720, 1) + juncos(600, 730, .9) + juncos(120, 730, .9)}</g>`;
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
  id: 'naama',
  title: 'Naamã e a Menina Corajosa',
  cover: { kicker: 'Uma história da Bíblia', title: 'Naamã', small: 'e a Menina Corajosa', sub: 'Deus cura e ama toda a gente' },
  color: '#2f8a8a',
  ref: '2 Reis 5',
  scenes: SCENES
});
})();
