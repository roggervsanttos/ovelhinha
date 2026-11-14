/* =====================================================================
   LIVRO: A CASA NA ROCHA  (Mateus 7.24-27)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const SABIO = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', head: 'cloth', clothCol: '#f4efe6', bandCol: '#2f6db5', tunic: '#3f93c7', belt: '#8a5a33' };
const TOLO = { kind: 'adult', skin: '#e2a878', hair: '#7a4a22', hairStyle: 'curly', hi: '#a46a3a', tunic: '#e07a3a', belt: '#8a5a33' };
const POVO = [
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#c98a5a', hairStyle: 'long', hair: '#3a2520', tunic: '#f2c14e', belt: '#b5402f' }
];
const p = (who, o) => person(Object.assign({}, who, o));
const SIT = { legs: 'sit', drop: 30, hemY: -62 };

/* ---------- peças desta história ---------- */
// casa de pedra, em cinco partes (p0 alicerce, p1 parede de baixo, p2 parede de cima, p3 porta e janela, p4 telhado)
function casaPedra(x, y, s = 1, o = {}) {
  const hid = i => (o.partes ?? 5) > i ? '' : ' opacity="0"';
  const pre = o.k || 'p';
  let g = `<g data-k="${pre}0"${hid(0)}><rect x="-116" y="-26" width="232" height="26" fill="#9a958c" stroke="${OL}" stroke-width="3"/>${[-90, -40, 10, 60].map(a => `<path d="M${a},-26 L${a},0" stroke="#7a756c" stroke-width="3"/>`).join('')}</g>`;
  g += `<g data-k="${pre}1"${hid(1)}><rect x="-104" y="-104" width="208" height="80" fill="#d9cbb0" stroke="${OL}" stroke-width="3"/>${[[-104, -64, 70], [-34, -64, 70], [36, -64, 68], [-70, -104, 70], [0, -104, 70]].map(([a, b, w]) => `<rect x="${a}" y="${b}" width="${w}" height="40" fill="none" stroke="#bfae8e" stroke-width="2.4"/>`).join('')}</g>`;
  g += `<g data-k="${pre}2"${hid(2)}><rect x="-104" y="-176" width="208" height="74" fill="#e4d6ba" stroke="${OL}" stroke-width="3"/>${[[-104, -140, 70], [-34, -140, 70], [36, -140, 68], [-70, -176, 70], [0, -176, 70]].map(([a, b, w]) => `<rect x="${a}" y="${b}" width="${w}" height="36" fill="none" stroke="#cbbb9a" stroke-width="2.4"/>`).join('')}</g>`;
  g += `<g data-k="${pre}3"${hid(3)}><path d="M-26,-26 L-26,-98 A26,26 0 0 1 26,-98 L26,-26 Z" fill="#7a5236" stroke="${OL}" stroke-width="3"/><circle cx="14" cy="-60" r="4" fill="#f2c14e"/><rect x="44" y="-150" width="42" height="36" rx="5" fill="${o.luz ? '#ffd27a' : '#5a3a26'}" stroke="${OL}" stroke-width="3"/>${o.janela || ''}</g>`;
  g += `<g data-k="${pre}4"${hid(4)}><rect x="-118" y="-194" width="236" height="20" rx="4" fill="#b8573a" stroke="${OL}" stroke-width="3"/><rect x="-104" y="-210" width="208" height="18" rx="3" fill="#cf6a44" stroke="${OL}" stroke-width="2.6"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
// casa de madeira (a do homem tolo), toda de uma vez
function casaMadeira(x, y, s = 1, o = {}) {
  let g = `<rect x="-100" y="-160" width="200" height="160" fill="#d9a35a" stroke="${OL}" stroke-width="3"/>${[-70, -40, -10, 20, 50, 80].map(a => `<path d="M${a},-160 L${a},0" stroke="#b9823e" stroke-width="3"/>`).join('')}`;
  g += `<path d="M-24,0 L-24,-80 L24,-80 L24,0 Z" fill="#7a5236" stroke="${OL}" stroke-width="3"/><rect x="44" y="-130" width="40" height="34" rx="4" fill="#5a3a26" stroke="${OL}" stroke-width="3"/>`;
  g += `<path d="M-120,-150 L0,-220 L120,-150 Z" fill="#e5483f" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-90,-162 L0,-206 L90,-162" stroke="#f2a03a" stroke-width="5" fill="none"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${o.k ? ` data-k="${o.k}"` : ''}${o.hidden ? ' opacity="0"' : ''}><g class="act" style="transform-origin:0px 0px">${g}${o.k ? hitC(0, -100, 120) : ''}</g></g>`;
}
function rocha(x, y, w, h) {
  return rock(x, y, w, h, { fill: '#a8a39a', shade: '#8a857c', hi: '#c6c1b8' });
}
function areia(y0 = 640) {
  return `<path d="M-40,${y0} C200,${y0 - 20} 500,${y0 + 14} 840,${y0 - 16} L840,900 L-40,900 Z" fill="#ecd9a8" stroke="${OL}" stroke-width="3"/><g fill="#d6c08e">${[[90, 50], [300, 90], [520, 60], [700, 110], [180, 130], [620, 150]].map(([a, b]) => `<ellipse cx="${a}" cy="${y0 + b}" rx="9" ry="5"/>`).join('')}</g>`;
}
function pilhaPedras(x, y, k = '') {
  let g = [[-40, 0], [0, 0], [40, 0], [-20, -26], [20, -26], [0, -52]].map(([a, b]) => `<rect x="${a - 20}" y="${b - 24}" width="40" height="24" rx="4" fill="#a8a39a" stroke="${OL}" stroke-width="2.6"/>`).join('');
  return `<g transform="translate(${x},${y})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -30, 60) : ''}</g></g>`;
}
function ceuTempestade(o = {}) {
  let s = sky('ssky', [[0, '#2c3456'], [.6, '#4f5a7e'], [1, '#5f6a8c']]);
  s += `<rect data-k="flash" x="-40" y="-40" width="900" height="900" fill="#ffffff" opacity="0"/>`;
  const bx = o.bx ?? 560;
  s += `<g data-k="bolt" opacity="0"><path d="M${bx},110 L${bx - 36},220 L${bx + 6},216 L${bx - 44},350 L${bx + 46},192 L${bx + 4},196 L${bx + 40},110 Z" fill="#fff6a8" stroke="#f2c14e" stroke-width="5" stroke-linejoin="round"/></g>`;
  const sets = [[110, 100, 1.25], [330, 70, 1.4], [570, 90, 1.3], [770, 70, 1.2], [220, 190, 1], [470, 180, 1.1], [690, 200, .95]];
  s += `<g data-k="${o.k || 'nuvens'}">${sets.map(([x, y, sc], i) => `<g transform="translate(${x},${y}) scale(${sc})"><g class="drift" style="--dx:${i % 2 ? -22 : 24}px;--d:${5 + i}s;${dl(5)}">${blob([[-56, 6, 30], [-20, -18, 40], [26, -12, 36], [60, 8, 28], [0, 16, 34]], '#3f4664', 0)}${blob([[-22, -24, 18], [18, -20, 16]], '#545c7c', 0)}</g></g>`).join('')}<rect x="-40" y="20" width="900" height="200" fill="#000" fill-opacity="0"/></g>`;
  return s;
}
function relampago(api) {
  api.anim(api.q('flash'), [{ opacity: 0 }, { opacity: .8 }, { opacity: 0 }, { opacity: .5 }, { opacity: 0 }], { duration: 520 });
  api.anim(api.q('bolt'), [{ opacity: 0 }, { opacity: 1 }, { opacity: 1, offset: .7 }, { opacity: 0 }], { duration: 650 });
  api.snd('thunder');
  api.later(() => api.shake(6), 200);
}
function vento(y, k = 'vento') {
  return `<g data-k="${k}" stroke="#dfe7f2" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8">${[[40, y], [200, y + 50], [80, y + 110]].map(([a, b], i) => `<path class="drift" style="--dx:60px;--d:${1.2 + i * .3}s;${dl(2)}" d="M${a},${b} c40,-16 80,16 120,0 c24,-10 30,-30 10,-34"/>`).join('')}<rect x="20" y="${y - 50}" width="300" height="200" fill="#000" fill-opacity="0" stroke="none"/></g>`;
}
// bloco com uma palavra (para a casa da última página)
function bloco(x, y, txt, col, k) {
  return `<g data-k="${k}" opacity="0"><g transform="translate(${x},${y})"><rect x="-120" y="-52" width="240" height="52" rx="8" fill="${col}" stroke="${OL}" stroke-width="3.4"/><rect x="-112" y="-46" width="224" height="10" rx="4" fill="#fff" opacity=".25"/><text x="0" y="-17" text-anchor="middle" font-size="24" class="svgtxt" fill="#3a2730">${txt}</text></g></g>`;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'A Casa na Rocha',
  alt: 'Uma casa de pedra está firme em cima de uma grande rocha. As nuvens da tempestade vão-se embora e aparece um arco-íris. O homem sábio, ao lado, acena contente.',
  cue: [420, 760],
  art() {
    let s = sky('sky', [[0, '#7fb8dc'], [.5, '#c9e6f2'], [1, '#eef6ea']], 1100);
    s += rainbow(400, 760, 330, { w: 16 });
    s += sun(660, 330, 44, { face: true }) + `<g opacity=".9">${stormCloud(150, 300, 1.1, 'n0')}</g>` + cloud(480, 240, .7);
    s += hill([[-40, 860], [200, 830], [440, 850], [680, 820], [840, 840]], '#a9c98a');
    s += `<rect x="-40" y="880" width="900" height="300" fill="#7fae54"/>`;
    s += rocha(420, 1020, 520, 190);
    s += casaPedra(420, 836, 1.1);
    s += p(SABIO, { x: 610, y: 850, s: .74, flip: true, face: 'joy', look: .4, armL: { a: 16 }, armR: { a: 150, b: -20 }, k: 'sabio' });
    s += flowerBand(6001, 960, 1080, 6) + tuft(120, 990) + tuft(700, 1000);
    return s;
  },
  setup(api) {
    api.tap(api.q('sabio'), 'Homem sábio', () => { api.snd('hello'); api.bubble(600, 620, 'A minha casa está firme!', { key: 's' }); });
    api.tap(api.q('n0'), 'Nuvem', () => { api.snd('thunder'); api.anim(api.q('n0'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-60px)' }, { transform: 'translateX(0px)' }], { duration: 1200 }); });
  }
});

/* =====================================================================
   1 — JESUS CONTA UMA HISTÓRIA
   ===================================================================== */
SCENES.push({
  key: 'monte', title: 'Jesus conta uma história', ref: 'Mateus 5.1-2; 7.24', tint: 'meadow',
  text: [
    'Um dia, Jesus estava num monte a ensinar muita gente.',
    'Então, contou uma história sobre dois homens que queriam construir uma casa.'
  ],
  fact: 'Jesus gostava de contar histórias para ensinar coisas importantes. Essas histórias chamam-se parábolas.',
  hint: 'Toca em Jesus e nas pessoas.',
  alt: 'Num monte verde, Jesus está sentado numa pedra e fala para muitas pessoas, sentadas na erva.',
  cue: [560, 520],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 38 });
    s += hill([[-40, 420], [200, 380], [440, 400], [680, 360], [840, 384]], '#a9c98a');
    s += `<path d="M-40,520 C200,470 520,460 840,490 L840,900 L-40,900 Z" fill="#8fbf5e"/>`;
    s += grassBand(6101, 520, 780, 18) + flowerBand(6102, 540, 780, 8);
    s += rock(560, 640, 150, 70);
    s += p(JESUS, { x: 560, y: 650, s: .96, ...SIT, face: 'joy', look: -.4, armL: { a: 20 }, armR: { a: 120, b: -30 }, k: 'jesus' });
    const PV = [[130, 700, 1, .8], [260, 720, 0, .86], [340, 690, 3, .8], [180, 780, 2, .9], [380, 790, 4, .9]];
    PV.forEach(([x, y, i, sc], j) => s += p(POVO[i], Object.assign({}, POVO[i].kind === 'adult' ? SIT : { legs: 'sit' }, { x, y, s: sc, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, k: 'p' + j })));
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(560, 340, 'Ouçam esta história!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    for (let i = 0; i < 5; i++) api.tap(api.q('p' + i), 'Pessoa a ouvir', () => { const [x, y, sc] = api.pos(api.q('p' + i)); api.snd('hm'); api.hop(api.q('p' + i), 8); api.bubble(x, y - 230 * sc, 'Vamos ouvir!', { key: 'p', size: 26 }); });
  }
});

/* =====================================================================
   2 — O HOMEM SÁBIO
   ===================================================================== */
SCENES.push({
  key: 'sabio', title: 'O homem sábio', ref: 'Mateus 7.24', tint: 'sky',
  text: [
    'O primeiro homem era sábio. Escolheu construir a casa em cima da rocha.',
    'Deu muito trabalho, mas ele não desistiu!'
  ],
  fact: 'A rocha é dura e forte. Uma casa construída em cima dela fica bem segura.',
  hint: 'Toca no homem sábio para construir a casa.',
  alt: 'O homem sábio, de roupa azul, constrói uma casa de pedra em cima de uma grande rocha. Ao lado há uma pilha de pedras.',
  cue: [190, 560],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 38 });
    s += hill([[-40, 470], [200, 440], [440, 460], [680, 430], [840, 450]], '#a9c98a');
    s += `<rect x="-40" y="540" width="900" height="400" fill="#8fbf5e"/>`;
    s += rocha(500, 780, 480, 170);
    s += casaPedra(500, 616, 1, { partes: 0 });
    s += pilhaPedras(110, 780, 'pedras');
    s += p(SABIO, { x: 220, y: 780, s: 1, face: 'determined', look: .5, armL: { a: 20 }, armR: { a: 100, b: -40, item: `<g transform="rotate(-20)">${`<path d="M0,12 L0,-30" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M0,12 L0,-30" stroke="#a46e3c" stroke-width="5" stroke-linecap="round"/><rect x="-16" y="-42" width="32" height="14" rx="3" fill="#8a8f9a" stroke="${OL}" stroke-width="2.6"/>`}</g>`, ia: 0 }, k: 'sabio' });
    s += tuft(700, 780) + flower(760, 760, .9, '#f2c14e');
    return s;
  },
  setup(api) {
    let n = 0;
    const FALAS = [N('Primeiro, um alicerce forte.'), N('Agora, as paredes.'), N('Mais pedras!'), N('Uma porta e uma janela.'), N('E o telhado. Já está!')];
    const constroi = async () => {
      if (api.st.busy) return;
      if (n >= 5) { api.snd('tada'); api.bubble(500, 330, 'Que casa tão forte!', { key: 'c' }); return; }
      api.st.busy = true;
      api.snd(n % 2 ? 'saw' : 'knock');
      api.bubble(220, 450, FALAS[n], { key: 's' });
      await api.anim(api.q('p' + n), [{ opacity: 0, transform: 'translateY(-40px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 450, easing: 'ease-in', fill: 'forwards' });
      api.burst(500, 600 - n * 34, 'dust', 4);
      n++; api.st.busy = false;
      if (n === 5) { api.snd('tada'); api.nudgeNext(2600); }
    };
    api.tap(api.q('sabio'), 'Homem sábio', constroi);
    api.tap(api.q('pedras'), 'Pedras', constroi);
  }
});

/* =====================================================================
   3 — O HOMEM TOLO
   ===================================================================== */
SCENES.push({
  key: 'tolo', title: 'O homem tolo', ref: 'Mateus 7.26', tint: 'sand',
  text: [
    'O segundo homem era tolo. Construiu a casa na areia, depressa e sem cuidado.',
    'Pensava ele: «Assim é muito mais fácil!»'
  ],
  fact: 'A areia é mole e mexe-se com a água. Não é um bom chão para uma casa!',
  hint: 'Toca no homem tolo.',
  alt: 'Na areia, perto de um rio, o homem tolo, de roupa cor de laranja, faz uma casa de madeira num instante e deita-se a descansar.',
  cue: [270, 560],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 38 });
    s += hill([[-40, 470], [200, 440], [440, 460], [680, 430], [840, 450]], '#b9cf8a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#6fb0d8"/><path d="M-40,520 L840,520" stroke="#8fc6e8" stroke-width="5"/>`;
    s += areia(600);
    s += casaMadeira(530, 760, 1, { hidden: true, k: 'casa' });
    s += `<g data-k="pe">${p(TOLO, { x: 270, y: 780, s: 1, face: 'grin', look: .5, armL: { a: 20 }, armR: { a: 60, b: -40 } })}</g>`;
    s += `<g data-k="deitado" opacity="0" style="pointer-events:none"><g transform="translate(170,736) rotate(84)">${p(TOLO, { x: 0, y: 0, s: .9, face: 'sleep', armL: { a: 150, b: 30 }, armR: { a: 150, b: 30 } })}</g><text class="zzz svgtxt" style="--d:3s" x="380" y="660" font-size="32" fill="#3a2730">z</text><text class="zzz svgtxt" style="--d:3s;animation-delay:-1.5s" x="400" y="630" font-size="24" fill="#3a2730">z</text></g>`;
    s += `<rect class="hit" data-k="tolo" x="190" y="500" width="160" height="290" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('tolo'), 'Homem tolo', async () => {
      if (!api.st.casa) {
        api.st.casa = true; api.snd('boing');
        api.bubble(270, 460, 'Pronto! Já está!', { key: 't' });
        api.anim(api.q('casa'), [{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
        await api.anim(api.act(api.q('casa')), [{ transform: 'scale(.6)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'cubic-bezier(.3,1.5,.5,1)' });
        return;
      }
      if (!api.st.dorme) {
        api.st.dorme = true; api.snd('snore');
        api.bubble(270, 460, 'Agora vou descansar...', { key: 't' });
        api.anim(api.q('pe'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
        await api.anim(api.q('deitado'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
        api.nudgeNext(2600);
        return;
      }
      api.snd('snore'); api.bubble(380, 580, 'Zzz...', { key: 't', size: 26, dur: 1200 });
    });
    api.tap(api.q('casa'), 'Casa na areia', () => { if (!api.st.casa) return; api.snd('knock'); api.bubble(530, 500, 'Que casa tão fácil de fazer!', { key: 'c' }); });
  }
});

/* =====================================================================
   4 — VEM A TEMPESTADE
   ===================================================================== */
SCENES.push({
  key: 'tempestade', title: 'Vem a tempestade', ref: 'Mateus 7.25-27', tint: 'stone',
  text: [
    'Um dia, veio uma grande tempestade.',
    'Caiu muita chuva, os rios encheram e o vento soprou com força.'
  ],
  fact: 'Em Israel, há rios que ficam secos no verão e enchem de repente quando chove muito.',
  hint: 'Toca nas nuvens e no vento.',
  alt: 'Uma tempestade escura: chove muito, há relâmpagos e vento. À esquerda, a casa de pedra está em cima da rocha; à direita, a casa de madeira está na areia, junto ao rio.',
  cue: [330, 140],
  art() {
    let s = ceuTempestade({ bx: 420 });
    s += hill([[-40, 470], [200, 440], [440, 460], [680, 430], [840, 450]], '#5f7a5a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#4f6a7e"/>`;
    s += rocha(190, 720, 360, 150) + casaPedra(190, 572, .8);
    s += `<path d="M380,620 C500,600 640,610 840,596 L840,900 L380,900 Z" fill="#c9b98a" stroke="${OL}" stroke-width="3"/>`;
    s += casaMadeira(620, 690, .8);
    s += `<g data-k="rio">${waveBand(740, { fill: '#3f6a8e', amp: 16, len: 160, dx: 40, d: 2, foam: '#cfe0ee', fw: 4, bottom: 930 })}</g>`;
    s += vento(330) + rainSheet({ seed: 61, n: 70, col: '#cfe0f2' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2800); };
    api.tap(api.q('nuvens'), 'Nuvens de tempestade', () => { relampago(api); api.snd('rain'); ok('n'); });
    api.tap(api.q('vento'), 'Vento', () => { api.snd('wind'); api.anim(api.q('vento'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(80px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); ok('v'); });
    api.tap(api.q('rio'), 'Rio', () => { api.snd('rush'); api.anim(api.q('rio'), [{ transform: 'translateY(0px)' }, { transform: 'translateY(-30px)' }, { transform: 'translateY(0px)' }], { duration: 1400 }); });
  }
});

/* =====================================================================
   5 — A CASA NA ROCHA NÃO CAIU
   ===================================================================== */
SCENES.push({
  key: 'firme', title: 'A casa na rocha não caiu', ref: 'Mateus 7.25', tint: 'sky',
  text: [
    'A chuva e o vento bateram na casa do homem sábio.',
    'Mas a casa não caiu, porque estava construída em cima da rocha!'
  ],
  fact: 'Quando a tempestade passa, a casa na rocha continua firme. Lá dentro, o homem sábio está seguro.',
  hint: 'Toca na chuva e na janela da casa.',
  alt: 'A chuva e o vento batem na casa de pedra, em cima da rocha. A casa não se mexe, e o homem sábio acena, contente, da janela.',
  cue: [470, 470],
  art() {
    let s = ceuTempestade({ bx: 640, k: 'chuva' });
    s += hill([[-40, 470], [200, 440], [440, 460], [680, 430], [840, 450]], '#5f7a5a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#4f6a7e"/>`;
    s += rocha(400, 800, 560, 200);
    const janela = `<g data-k="janela"><defs><clipPath id="${ID('jan')}"><rect x="44" y="-150" width="42" height="36" rx="5"/></clipPath></defs><g clip-path="${UR('jan')}">${p(SABIO, { x: 64, y: -76, s: .3, face: 'joy', look: 0, armL: { a: 16 }, armR: { a: 150, b: -20 } })}</g>${hitC(64, -132, 34)}</g>`;
    s += casaPedra(400, 604, 1.3, { luz: true, janela });
    s += vento(360) + rainSheet({ seed: 62, n: 80, col: '#cfe0f2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('chuva'), 'Chuva', () => { relampago(api); api.snd('rain'); api.later(() => api.bubble(480, 330, 'A casa não se mexe!', { key: 'c' }), 700); if (!api.st.n) { api.st.n = true; api.nudgeNext(3400); } });
    api.tap(api.q('janela'), 'Homem sábio à janela', () => { api.snd('hello'); api.bubble(484, 330, 'Estamos seguros!', { key: 'c' }); });
    api.tap(api.q('vento'), 'Vento', () => { api.snd('wind'); api.anim(api.q('vento'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(80px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); });
  }
});

/* =====================================================================
   6 — A CASA NA AREIA CAIU
   ===================================================================== */
SCENES.push({
  key: 'caiu', title: 'A casa na areia caiu', ref: 'Mateus 7.27', tint: 'stone',
  text: [
    'A chuva e o vento bateram também na casa do homem tolo.',
    'E a casa caiu! Que grande queda!'
  ],
  fact: 'O homem tolo ficou sem casa. Se a tivesse construído na rocha, a casa não teria caído.',
  hint: 'Toca na casa de madeira.',
  alt: 'Na tempestade, a água do rio leva a areia e a casa de madeira cai. O homem tolo, todo molhado, olha para ela, triste.',
  cue: [450, 520],
  art() {
    let s = ceuTempestade({ bx: 300 });
    s += hill([[-40, 470], [200, 440], [440, 460], [680, 430], [840, 450]], '#5f7a5a');
    s += `<rect x="-40" y="520" width="900" height="400" fill="#4f6a7e"/>`;
    s += `<path d="M-40,640 C200,620 500,654 840,626 L840,900 L-40,900 Z" fill="#c9b98a" stroke="${OL}" stroke-width="3"/>`;
    s += casaMadeira(460, 700, 1.1, { k: 'casa' });
    s += `<g data-k="agua">${waveBand(730, { fill: '#3f6a8e', amp: 16, len: 160, dx: 40, d: 2, foam: '#cfe0ee', fw: 4 })}</g>`;
    s += p(TOLO, { x: 160, y: 780, s: 1, face: 'scared', look: .6, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'tolo' });
    s += vento(340) + rainSheet({ seed: 63, n: 80, col: '#cfe0f2' });
    return s;
  },
  setup(api) {
    api.tap(api.q('casa'), 'Casa na areia', async () => {
      if (api.st.caiu) { api.snd('splash'); api.burst(460, 700, 'ripple', 2); return; }
      api.st.caiu = true;
      relampago(api);
      await api.wait(500);
      api.snd('crunch');
      await api.anim(api.act(api.q('casa')), [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: 'translate(10px,10px) rotate(8deg)', offset: .3 }, { transform: 'translate(40px,170px) rotate(24deg)' }], { duration: 1100, easing: 'ease-in', fill: 'forwards' });
      api.burst(500, 700, 'dust', 10);
      api.snd('splash');
      api.bubble(160, 450, 'Ai, a minha casa!', { key: 't' });
      api.nudgeNext(2800);
    });
    api.tap(api.q('tolo'), 'Homem tolo', () => { api.snd('hm'); api.hop(api.q('tolo'), 8); api.bubble(160, 450, api.st.caiu ? N('Ai, a minha casa!') : N('A água está a levar a areia!'), { key: 't' }); });
    api.tap(api.q('vento'), 'Vento', () => { api.snd('wind'); api.anim(api.q('vento'), [{ transform: 'translateX(0px)' }, { transform: 'translateX(80px)' }, { transform: 'translateX(0px)' }], { duration: 900 }); });
  }
});

/* =====================================================================
   7 — OUVIR E FAZER
   ===================================================================== */
SCENES.push({
  key: 'ouvir', title: 'Ouvir e fazer', ref: 'Mateus 7.24-27', tint: 'meadow',
  text: [
    'No fim da história, Jesus explicou:',
    { q: 'Quem ouve as minhas palavras e faz o que Eu digo é como o homem sábio, que construiu a casa na rocha.', who: 'jesus' }
  ],
  fact: 'Ouvir Jesus é bom. Fazer o que Ele diz é ainda melhor!',
  hint: 'Toca em Jesus e nas crianças.',
  alt: 'No monte, Jesus fala com algumas crianças. Ao fundo, vê-se a casa de pedra em cima da rocha, ao sol.',
  cue: [400, 560],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 38 });
    s += rainbow(620, 470, 200, { w: 12 });
    s += hill([[-40, 440], [200, 400], [440, 420], [680, 390], [840, 410]], '#a9c98a');
    s += rocha(640, 500, 200, 70) + casaPedra(640, 432, .42);
    s += `<path d="M-40,520 C200,480 520,470 840,500 L840,900 L-40,900 Z" fill="#8fbf5e"/>`;
    s += grassBand(6701, 520, 780, 14) + flowerBand(6702, 540, 780, 6);
    s += p(JESUS, { x: 400, y: 776, s: 1.1, face: 'joy', look: 0, armL: { a: 50, b: -30 }, armR: { a: 50, b: -30 }, k: 'jesus' });
    s += p(POVO[0], { x: 180, y: 780, s: 1.1, face: 'joy', look: .5, armL: { a: 20 }, armR: { a: 140, b: -20 }, k: 'c0' });
    s += p(POVO[2], { x: 620, y: 780, s: 1.12, flip: true, face: 'laugh', look: .5, armL: { a: 20 }, armR: { a: 60, b: -30 }, k: 'c1' });
    return s;
  },
  setup(api) {
    const vistos = new Set();
    const ok = k => { vistos.add(k); if (vistos.size === 2) api.nudgeNext(2600); };
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(400, 480, 'heart', 4); api.bubble(400, 420, 'Ouvir e fazer!', { key: 'j' }); ok('j'); });
    api.tap(api.q('c0'), 'Criança', () => { api.snd('hello'); api.hop(api.q('c0'), 10); api.bubble(180, 500, 'Eu quero ser sábio!', { key: 'c', size: 26 }); ok('c'); });
    api.tap(api.q('c1'), 'Criança', () => { api.snd('laugh'); api.hop(api.q('c1'), 10); api.bubble(620, 500, 'E eu também!', { key: 'c', size: 26 }); ok('c'); });
  }
});

/* =====================================================================
   8 — A MINHA CASA NA ROCHA
   ===================================================================== */
SCENES.push({
  key: 'tu', title: 'A tua casa na rocha', ref: 'Mateus 22.37-39', tint: 'gold',
  text: [
    'Jesus ensina-nos a amar a Deus e a amar os outros, a partilhar e a perdoar.',
    'Quando fazemos o que Ele diz, somos como a casa na rocha: firmes e seguros!'
  ],
  fact: 'Cada vez que fazes o que Jesus ensina, é como se pusesses mais uma pedra na tua casa!',
  hint: 'Toca nas pedras para construir a casa.',
  alt: 'Em cima de uma rocha, há quatro pedras grandes para empilhar, cada uma com uma palavra: amar a Deus, amar os outros, partilhar e perdoar.',
  cue: [140, 700],
  art() {
    let s = bgDay({ sunX: 680, sunY: 100, sunR: 38 });
    s += `<g data-k="arco" opacity="0">${rainbow(400, 560, 330, { w: 14 })}</g>`;
    s += hill([[-40, 480], [200, 450], [440, 470], [680, 440], [840, 460]], '#a9c98a');
    s += `<rect x="-40" y="560" width="900" height="400" fill="#8fbf5e"/>`;
    s += rocha(400, 800, 520, 130);
    const B = [[tr('Amar a Deus'), '#f2c14e'], [tr('Amar os outros'), '#e86a9a'], [tr('Partilhar'), '#7fb2e0'], [tr('Perdoar'), '#8fd07a']];
    B.forEach(([t, c], i) => s += bloco(400, 670 - i * 54, t, c, 'b' + i));
    s += `<g data-k="telhado" opacity="0"><g transform="translate(400,${670 - 4 * 54})"><path d="M-150,0 L0,-90 L150,0 Z" fill="#b8573a" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/></g></g>`;
    s += `<g data-k="pedras">${pilhaPedras(140, 760)}${hitC(140, 720, 90)}</g>`;
    return s;
  },
  setup(api) {
    let n = 0;
    api.tap(api.q('pedras'), 'Pedras', async () => {
      if (api.st.busy) return;
      if (n >= 4) { api.snd('chime', 'G6'); api.burst(400, 300, 'heart', 6); return; }
      api.st.busy = true;
      api.snd('knock');
      await api.anim(api.q('b' + n), [{ opacity: 0, transform: 'translateY(-50px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 420, easing: 'ease-in', fill: 'forwards' });
      api.snd('count', n + 1);
      n++; api.st.busy = false;
      if (n === 4) {
        await api.anim(api.q('telhado'), [{ opacity: 0, transform: 'translateY(-40px)' }, { opacity: 1, transform: 'translateY(0px)' }], { duration: 420, fill: 'forwards' });
        api.anim(api.q('arco'), [{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: 'forwards' });
        api.snd('tada'); api.burst(400, 300, 'confetti', 16);
        api.nudgeNext(3000);
      }
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
  alt: 'Noite estrelada e calma. A casa de pedra está firme em cima da rocha, com a janela acesa, e uma ovelhinha dorme ao lado.',
  cue: [430, 160],
  questions: [
    ['Onde construiu a casa o homem sábio?', 'Em cima da rocha.'],
    ['Onde construiu a casa o homem tolo?', 'Na areia.'],
    ['Que casa caiu na tempestade?', 'A casa na areia.'],
    ['Quem é como o homem sábio?', 'Quem ouve Jesus e faz o que Ele diz.'],
    ['O que nos ensina Jesus?', 'A amar a Deus e a amar os outros.']
  ],
  wrong: [
    ['Na areia.', 'Dentro do rio.', 'Numa nuvem.'],
    ['Em cima da rocha.', 'Numa árvore.', 'Numa gruta.'],
    ['A casa na rocha.', 'As duas.', 'Nenhuma.'],
    ['Quem tem a casa maior.', 'Quem sabe nadar.', 'Quem constrói mais depressa.'],
    ['A construir casas grandes.', 'A ganhar sempre.', 'A não sair à chuva.']
  ],
  verse: ['Quem ouve as minhas palavras e as põe em prática é como um homem sábio que construiu a sua casa sobre a rocha.', 'Mateus 7.24'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(6901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#3a4560');
    s += `<path d="M-40,640 C200,616 520,640 840,618 L840,900 L-40,900 Z" fill="#3a5a52"/>`;
    s += `<g opacity=".9">${rocha(590, 720, 260, 90)}${casaPedra(590, 632, .55, { luz: true })}</g>`;
    s += sheep({ x: 250, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(270, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'rocha',
  title: 'A Casa na Rocha',
  cover: { kicker: 'Uma história da Bíblia', title: 'A Casa', small: 'na Rocha', sub: 'Ouvir Jesus e fazer o que Ele diz' },
  color: '#5a7a9a',
  ref: 'Mateus 7.24-27',
  scenes: SCENES
});
})();
