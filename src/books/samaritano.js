/* =====================================================================
   LIVRO: O BOM SAMARITANO  (Lucas 10.25-37)
   ===================================================================== */
(() => {
const SCENES = [];
const JESUS = { kind: 'adult', skin: '#d39463', hair: '#4a2c1c', hairStyle: 'long', beard: 'short', beardCol: '#4a2c1c', tunic: '#fbf6ea', longSleeves: true, cloak: '#b8312f', cloakTrim: '#f2c14e', belt: '#c9a54e' };
const DOUTOR = { kind: 'adult', skin: '#d39463', hair: '#1f1612', beard: 'long', beardCol: '#1f1612', head: 'cloth', clothCol: '#f4efe6', bandCol: '#2f6db5', tunic: '#5a6fa8', cloak: '#2f3f6a', cloakTrim: '#f2c14e', belt: '#f2c14e', longSleeves: true };
const VIAJANTE = { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'short', beardCol: '#3a2520', tunic: '#e9c46a', belt: '#7b4a2a', head: 'cloth', clothCol: '#f4efe6', bandCol: '#b6553f' };
const LADROES = [
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'bushy', beardCol: '#1f1612', head: 'cloth', clothCol: '#3a3a46', bandCol: '#7a2a2a', tunic: '#4a4a56', belt: '#7a2a2a' },
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', beardCol: '#2b1d17', head: 'cloth', clothCol: '#5a3a3a', bandCol: '#3a3a46', tunic: '#6a4a3a', belt: '#3a3a46' }
];
const SACERDOTE = { kind: 'adult', skin: '#d99a6c', hair: '#3a2520', beard: 'long', beardCol: '#3a2520', head: 'cloth', clothCol: '#fbf6ea', bandCol: '#3f6fb5', tunic: '#fbf6ea', longSleeves: true, belt: '#3f6fb5', trim: '#3f6fb5' };
const LEVITA = { kind: 'adult', skin: '#c98a5a', hair: '#5a3a26', beard: 'short', beardCol: '#5a3a26', head: 'cloth', clothCol: '#e9dcc0', bandCol: '#7a6aa8', tunic: '#7a6aa8', stripes: '#b9aedb', belt: '#e9dcc0' };
const SAMARITANO = { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'bushy', beardCol: '#1f1612', head: 'cloth', clothCol: '#d9643f', bandCol: '#3a9a4a', tunic: '#3a9a4a', stripes: '#9ad0a0', cloak: '#c9773f', cloakTrim: '#8a4a22', belt: '#f2c14e' };
const ESTALAJADEIRO = { kind: 'adult', skin: '#e2a878', hair: '#5a3a26', hairStyle: 'short', beard: 'short', beardCol: '#5a3a26', tunic: '#f4efe6', stripes: '#c9a87a', belt: '#8a5a33' };
const SIT = { legs: 'sit', drop: 30, hemY: -62 };
const jesus = o => person(Object.assign({}, JESUS, o));
const samaritano = o => person(Object.assign({}, SAMARITANO, o));
const viajante = o => person(Object.assign({}, VIAJANTE, o));

/* ---------- peças desta história ---------- */
// a estrada de Jerusalém para Jericó: montes, rochas e um caminho a descer
function estrada(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 110, sunR: 42, sky: [[0, '#8ccbed'], [.6, '#d9eef2'], [1, '#f6ead2']] }, o.day || {}));
  s += hill([[-40, 360], [140, 290], [300, 340], [460, 280], [620, 330], [840, 300]], o.far || '#cbb187');
  s += hill([[-40, 470], [200, 420], [420, 452], [640, 410], [840, 440]], o.mid || '#d9c08e');
  s += `<rect x="-40" y="520" width="900" height="400" fill="${o.chao || '#e4cf9f'}"/>`;
  s += `<path d="M-40,560 C200,530 360,560 520,600 C660,636 760,640 860,640 L860,760 C740,760 620,748 480,712 C320,672 160,650 -40,660 Z" fill="#f1e2bb" stroke="#d9c08e" stroke-width="3"/>`;
  s += `<path d="M380,330 C420,360 470,380 520,400" stroke="#ead7aa" stroke-width="16" fill="none" stroke-linecap="round" opacity=".8"/>`;
  s += rock(90, 560, 140, 70) + rock(730, 560, 120, 60) + rock(660, 820, 170, 70) + rock(60, 830, 150, 60);
  s += tuft(250, 540, 1, '#9a9a4a') + tuft(560, 560, 1, '#9a9a4a') + tuft(420, 800, 1.1, '#9a9a4a');
  return s;
}
// homem ferido deitado à beira da estrada
function caido(x, y, s = 1, k = 'homem', o = {}) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><g transform="rotate(-90) scale(${s})"><g>${viajante({ x: 0, y: 92, s: .8, face: o.face || 'sad', look: .4, head: o.semPano ? null : 'cloth', armL: { a: 14 }, armR: { a: 40, b: -30 }, cls: '' })}</g></g>${hitC(-70 * s, -40 * s, 90 * s)}</g></g>`;
}
function bilha(x, y, s = 1, k = '') {
  const g = `<path d="M12,-62 C38,-64 38,-30 22,-24" stroke="${OL}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M12,-62 C38,-64 38,-30 22,-24" stroke="#d9a33a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-10,-80 L10,-80 L8,-64 C30,-56 34,-24 22,0 L-22,0 C-34,-24 -30,-56 -8,-64 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-80" rx="11" ry="4" fill="#f2c14e" stroke="${OL}" stroke-width="2.4"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, -40, 48) : ''}</g></g>`;
}
function ligaduras(x, y, s = 1, k = '') {
  const g = `<ellipse cx="0" cy="-16" rx="26" ry="18" fill="#fbf6ea" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-16" rx="9" ry="7" fill="#e2d6bd" stroke="${OL}" stroke-width="2.4"/><path d="M22,-8 C40,-2 50,6 60,4" stroke="${OL}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M22,-8 C40,-2 50,6 60,4" stroke="#fbf6ea" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(10, -16, 44) : ''}</g></g>`;
}
function moeda(x, y, k) {
  return `<g transform="translate(${x},${y})" data-k="${k}"><g class="act"><circle r="17" fill="#d6dbe4" stroke="${OL}" stroke-width="3"/><circle r="11" fill="none" stroke="#a9b0bd" stroke-width="2.4"/><path d="${sparkle(6)}" fill="#fff"/>${hitC(0, 0, 36)}</g></g>`;
}
function estalagem(o = {}) {
  let s = bgDay(Object.assign({ sunX: 140, sunY: 120, sunR: 40, sky: [[0, '#9fd3ef'], [.6, '#e3f1ec'], [1, '#f6ead2']] }, o.day || {}));
  s += hill([[-40, 420], [220, 392], [460, 412], [700, 386], [840, 404]], '#cbb98f');
  s += `<rect x="-40" y="600" width="900" height="300" fill="#e4cf9f"/>`;
  s += `<g transform="translate(470,600)"><rect x="0" y="-330" width="360" height="330" fill="#ecd6aa" stroke="${OL}" stroke-width="3.4"/><rect x="-10" y="-344" width="380" height="18" rx="4" fill="#cdb084" stroke="${OL}" stroke-width="3"/><path d="M90,0 L90,-170 A55,55 0 0 1 200,-170 L200,0 Z" fill="#6b4a33" stroke="${OL}" stroke-width="3"/><rect x="250" y="-250" width="70" height="60" rx="8" fill="#ffd27a" stroke="${OL}" stroke-width="3"/><path d="M285,-250 L285,-190 M250,-220 L320,-220" stroke="#8a5a33" stroke-width="5"/>`;
  s += `<g transform="translate(40,-260)"><path d="M0,0 L0,-30 M-40,-30 L40,-30" stroke="#6b4a33" stroke-width="6"/><rect x="-36" y="0" width="72" height="50" rx="6" fill="#f2c14e" stroke="${OL}" stroke-width="3"/><path d="M-22,34 L-22,16 L22,16 L22,34 M-22,24 L22,24" stroke="${OL}" stroke-width="3" fill="none"/><ellipse cx="-12" cy="12" rx="8" ry="5" fill="#fbf6ea" stroke="${OL}" stroke-width="2"/></g></g>`;
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'O Bom Samaritano',
  alt: 'Numa estrada entre montes, um samaritano de roupa verde ajuda um homem ferido, que está sentado com uma ligadura na cabeça. Ao lado, espera um burro.',
  cue: [400, 820],
  art() {
    let s = sky('sky', [[0, '#8ccbed'], [.5, '#cfeaf2'], [1, '#f6ead2']], 1100);
    s += sun(640, 330, 46, { face: true }) + cloud(160, 300, .9);
    s += hill([[-40, 700], [140, 640], [300, 690], [460, 630], [620, 680], [840, 650]], '#cbb187');
    s += hill([[-40, 820], [200, 780], [420, 806], [640, 772], [840, 796]], '#d9c08e');
    s += `<rect x="-40" y="880" width="900" height="300" fill="#e4cf9f"/><path d="M-40,920 C200,900 420,930 840,960 L840,1100 L-40,1100 Z" fill="#f1e2bb"/>`;
    s += equine({ x: 690, y: 990, s: .8, kind: 'donkey', pack: '#d9643f', flip: true, k: 'burro' });
    s += rock(300, 1020, 230, 120, { fill: '#c9bba4', shade: '#ad9f88' });
    s += viajante({ x: 320, y: 1040, s: 1.2, ...SIT, head: null, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 50, b: -40 }, extra: `<path d="M-30,-232 Q0,-246 30,-232" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M-30,-232 Q0,-246 30,-232" stroke="#fbf6ea" stroke-width="8" fill="none" stroke-linecap="round"/>`, k: 'homem' });
    s += samaritano({ x: 510, y: 1070, s: 1.25, legs: 'kneel', hemY: -62, flip: true, face: 'joy', look: .5, armL: { a: 14 }, armR: { a: 70, b: -30 }, k: 'sam' });
    return s;
  },
  setup(api) {
    api.tap(api.q('sam'), 'O samaritano', () => { api.snd('heart'); api.burst(500, 800, 'heart', 5); api.bubble(510, 720, 'Eu ajudo-te!', { key: 's' }); });
    api.tap(api.q('homem'), 'O homem ferido', () => { api.snd('hello'); api.bubble(300, 700, 'Obrigado, amigo!', { key: 'h' }); });
    api.tap(api.q('burro'), 'Burro', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
  }
});

/* =====================================================================
   1 — QUEM É O MEU PRÓXIMO?
   ===================================================================== */
SCENES.push({
  key: 'pergunta', title: 'Quem é o meu próximo?', ref: 'Lucas 10.25-29', tint: 'sand',
  text: [
    'Um homem que conhecia muito bem a lei de Deus perguntou a Jesus: «A lei diz para amar o próximo. Mas quem é o meu próximo?»',
    'Então, Jesus contou-lhe uma história.'
  ],
  fact: 'O «próximo» é qualquer pessoa que encontramos e que precisa de ajuda.',
  hint: 'Toca no homem e em Jesus.',
  alt: 'Debaixo de uma oliveira, um homem de manto azul, com um rolo na mão, faz uma pergunta a Jesus. Algumas crianças ouvem, sentadas.',
  cue: [560, 520],
  art() {
    let s = bgDay({ sunX: 660, sunY: 110, sunR: 40 });
    s += hill([[-40, 420], [220, 392], [460, 412], [700, 386], [840, 404]], '#b9cf8a');
    s += `<rect x="-40" y="470" width="900" height="400" fill="#c9d08e"/>`;
    s += olive(220, 560, 1.6);
    s += jesus({ x: 230, y: 760, s: 1.04, ...SIT, face: 'smile', look: .6, armL: { a: 30, b: 40 }, armR: { a: 70, b: -20 }, k: 'jesus' });
    s += person(Object.assign({}, DOUTOR, { x: 560, y: 770, s: 1.04, flip: true, face: 'o', look: .5, armL: { a: 30, b: -40, item: ITEM.scroll() }, armR: { a: 100, b: -20 }, k: 'doutor' }));
    s += person({ kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a', x: 380, y: 790, s: .82, legs: 'kneel', face: 'smile', look: -.5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } });
    s += person({ kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a', x: 690, y: 800, s: .82, legs: 'kneel', face: 'smile', look: -.5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 } });
    s += flowerBand(7101, 770, 800, 6);
    return s;
  },
  setup(api) {
    api.tap(api.q('doutor'), 'O homem que conhecia a lei', () => { api.snd('hm'); api.bubble(560, 440, 'Quem é o meu próximo?', { key: 'd' }); });
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('hello'); api.bubble(240, 460, 'Vou contar-te uma história.', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
  }
});

/* =====================================================================
   2 — UMA VIAGEM PERIGOSA
   ===================================================================== */
SCENES.push({
  key: 'viagem', title: 'Uma viagem perigosa', ref: 'Lucas 10.30', tint: 'sand',
  text: [
    'Um homem ia de Jerusalém para Jericó.',
    'A estrada atravessava montes e rochas, e era muito perigosa.'
  ],
  fact: 'A estrada de Jerusalém para Jericó era sempre a descer, e tinha muitos esconderijos nas rochas.',
  hint: 'Toca no viajante.',
  alt: 'Um homem caminha sozinho numa estrada que desce entre montes e grandes rochas.',
  cue: [300, 520],
  art() {
    let s = estrada({});
    s += viajante({ x: 300, y: 650, s: .95, legs: 'walk', face: 'smile', look: .6, armL: { a: 20, item: ITEM.staff(190, 1) }, armR: { a: 30 }, bag: true, k: 'homem' });
    return s;
  },
  setup(api) {
    api.tap(api.q('homem'), 'O viajante', async () => {
      api.snd('tiptoe');
      api.bubble(320, 360, 'Que caminho tão comprido!', { key: 'h' });
      if (api.st.foi) return;
      api.st.foi = true;
      await api.anim(api.act(api.q('homem')), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(120px,20px)' }], { duration: 1600, fill: 'forwards', easing: 'ease-in-out' });
      api.nudgeNext(2000);
    });
  }
});

/* =====================================================================
   3 — OS LADRÕES
   ===================================================================== */
SCENES.push({
  key: 'ladroes', title: 'Os ladrões', ref: 'Lucas 10.30', tint: 'dusk',
  text: [
    'De repente, apareceram uns ladrões! Tiraram-lhe tudo o que tinha e deixaram-no ferido à beira da estrada.',
    'Coitado! Ele não se conseguia levantar.'
  ],
  fact: 'Os ladrões escondiam-se atrás das rochas, à espera de quem passava.',
  hint: 'Toca no homem caído.',
  alt: 'O homem está caído à beira da estrada, ferido. Ao longe, dois ladrões fogem com o saco dele.',
  cue: [330, 640],
  art() {
    let s = estrada({ day: { sky: [[0, '#f2b98a'], [.6, '#f8dcb8'], [1, '#f6ead2']] } });
    s += `<g data-k="ladroes">${person(Object.assign({}, LADROES[0], { x: 620, y: 470, s: .55, legs: 'run', flip: true, face: 'grin', look: -.4, armL: { a: 60, b: -20 }, armR: { a: 40 }, bag: true }))}${person(Object.assign({}, LADROES[1], { x: 700, y: 460, s: .55, legs: 'run', flip: true, face: 'grin', look: -.4, armL: { a: 60, b: -20 }, armR: { a: 40 } }))}</g>`;
    s += caido(330, 690, 1, 'homem', { semPano: true });
    return s;
  },
  setup(api) {
    api.later(() => api.anim(api.q('ladroes'), [{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(220px)', opacity: 0 }], { duration: 3000, fill: 'forwards', easing: 'ease-in' }), 800);
    api.tap(api.q('homem'), 'O homem ferido', () => { api.snd('hm'); api.bubble(330, 520, 'Ai... Ajudem-me!', { key: 'h' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
  }
});

/* =====================================================================
   4 — NINGUÉM PAROU
   ===================================================================== */
SCENES.push({
  key: 'passaram', title: 'Ninguém parou', ref: 'Lucas 10.31-32', tint: 'sand',
  text: [
    'Passou por ali um sacerdote. Viu o homem caído... e foi pelo outro lado da estrada.',
    'Depois, passou um levita, que ajudava no templo. Também olhou... e seguiu caminho.'
  ],
  fact: 'Os dois conheciam bem as leis de Deus, mas não pararam para ajudar.',
  hint: 'Toca no sacerdote e no levita.',
  alt: 'O homem ferido continua caído à beira da estrada. Um sacerdote vestido de branco e um levita passam ao longe, pelo outro lado.',
  cue: [560, 420],
  art() {
    let s = estrada({});
    s += caido(250, 720, 1, 'homem', { semPano: true });
    s += person(Object.assign({}, SACERDOTE, { x: 560, y: 600, s: .8, legs: 'walk', face: 'frown', look: -.6, armL: { a: 20 }, armR: { a: 30 }, k: 'sacerdote' }));
    s += person(Object.assign({}, LEVITA, { x: 700, y: 610, s: .78, legs: 'walk', face: 'frown', look: -.6, armL: { a: 20, item: ITEM.scroll() }, armR: { a: 30 }, k: 'levita' }));
    return s;
  },
  setup(api) {
    let n = 0;
    const passa = async (k, txt, x) => {
      if (api.st[k]) return;
      api.st[k] = true;
      api.snd('tiptoe');
      api.bubble(x, 360, txt, { key: k });
      await api.anim(api.act(api.q(k)), [{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(260px)', opacity: 0 }], { duration: 1800, fill: 'forwards', easing: 'ease-in' });
      if (++n === 2) { api.bubble(250, 520, 'Ninguém me ajuda...', { key: 'h' }); api.nudgeNext(2400); }
    };
    api.tap(api.q('sacerdote'), 'O sacerdote', () => passa('sacerdote', N('Estou com pressa...'), 560));
    api.tap(api.q('levita'), 'O levita', () => passa('levita', N('Isto não é comigo...'), 690));
    api.tap(api.q('homem'), 'O homem ferido', () => { api.snd('hm'); api.bubble(250, 520, 'Ai... Ajudem-me!', { key: 'h' }); });
  }
});

/* =====================================================================
   5 — O SAMARITANO PAROU
   ===================================================================== */
SCENES.push({
  key: 'parou', title: 'O samaritano parou', ref: 'Lucas 10.33', tint: 'meadow',
  text: [
    'Depois, chegou um samaritano com o seu burro. Os judeus e os samaritanos não se davam bem.',
    'Mas, quando viu o homem ferido, teve muita pena dele e parou!'
  ],
  fact: 'Os samaritanos viviam numa terra chamada Samaria, e muitos judeus não falavam com eles.',
  hint: 'Toca no samaritano.',
  alt: 'Um samaritano de roupa verde e manto cor de laranja chega com o seu burro. Ao ver o homem caído, ajoelha-se ao lado dele.',
  cue: [560, 520],
  art() {
    let s = estrada({});
    s += caido(250, 720, 1, 'homem', { semPano: true });
    s += equine({ x: 690, y: 690, s: .62, kind: 'donkey', pack: '#d9643f', flip: true, k: 'burro' });
    s += `<g data-k="pe">${samaritano({ x: 560, y: 700, s: .95, legs: 'walk', face: 'surprise', look: -.6, armL: { a: 20 }, armR: { a: 60, b: -30 } })}</g>`;
    s += `<g data-k="ajoelhado" opacity="0" style="pointer-events:none">${samaritano({ x: 370, y: 730, s: .95, legs: 'kneel', hemY: -62, flip: true, face: 'worry', look: .5, armL: { a: 30 }, armR: { a: 70, b: -10 } })}</g>`;
    s += `<rect class="hit" data-k="sam" x="480" y="430" width="160" height="280" fill="#000" fill-opacity="0"/>`;
    return s;
  },
  setup(api) {
    api.tap(api.q('sam'), 'O samaritano', async () => {
      if (api.st.feito) { api.snd('heart'); api.burst(370, 560, 'heart', 4); return; }
      api.st.feito = true;
      api.snd('whoosh');
      api.anim(api.q('pe'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      await api.anim(api.q('ajoelhado'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.q('sam').setAttribute('x', '300'); api.q('sam').setAttribute('y', '470');
      api.snd('heart');
      api.burst(370, 560, 'heart', 6);
      api.bubble(380, 400, 'Coitado! Eu vou ajudar-te.', { key: 's' });
      api.nudgeNext(2600);
    });
    api.tap(api.q('burro'), 'Burro', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
  }
});

/* =====================================================================
   6 — ELE CUIDOU DO HOMEM
   ===================================================================== */
SCENES.push({
  key: 'cuidou', title: 'Ele cuidou do homem', ref: 'Lucas 10.34', tint: 'rose',
  text: [
    'O samaritano tratou as feridas do homem com azeite e vinho e pôs-lhe ligaduras.',
    'Depois, ajudou-o a subir para o seu burro.'
  ],
  fact: 'Naquele tempo, usava-se azeite e vinho para tratar as feridas.',
  hint: 'Toca no azeite e nas ligaduras.',
  alt: 'O homem ferido está sentado junto a uma rocha. O samaritano, ajoelhado, trata-lhe as feridas. No chão há uma bilha de azeite e um rolo de ligaduras.',
  cue: [470, 700],
  art() {
    let s = estrada({});
    s += rock(200, 740, 200, 110, { fill: '#c9bba4', shade: '#ad9f88' });
    s += viajante({ x: 250, y: 760, s: 1, ...SIT, head: null, face: 'sad', look: .5, armL: { a: 30, b: 40 }, armR: { a: 40, b: -20 }, k: 'homem' });
    s += `<g data-k="pano" opacity="0" style="pointer-events:none"><path d="M220,553 Q250,540 280,553" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M220,553 Q250,540 280,553" stroke="#fbf6ea" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M290,660 L300,690" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M290,660 L300,690" stroke="#fbf6ea" stroke-width="11" stroke-linecap="round"/></g>`;
    s += samaritano({ x: 420, y: 770, s: 1, legs: 'kneel', hemY: -62, flip: true, face: 'smile', look: .5, armL: { a: 30 }, armR: { a: 70, b: -10 }, k: 'sam' });
    s += bilha(520, 780, .9, 'azeite');
    s += ligaduras(600, 780, 1, 'ligadura');
    s += equine({ x: 700, y: 640, s: .55, kind: 'donkey', pack: '#d9643f', flip: true, k: 'burro' });
    return s;
  },
  setup(api) {
    const feito = new Set();
    const fim = () => { if (feito.size === 2 && !api.st.n) { api.st.n = true; api.bubble(250, 450, 'Obrigado! Já me sinto melhor.', { key: 'h' }); api.burst(260, 560, 'heart', 5); api.nudgeNext(2600); } };
    api.tap(api.q('azeite'), 'Bilha de azeite', () => { api.snd('pour'); api.hop(api.q('azeite'), 8); for (let k = 0; k < 3; k++) api.drop(510, 700, 280 + k * 10, 640, '#f2c230'); feito.add('a'); fim(); });
    api.tap(api.q('ligadura'), 'Ligaduras', () => { api.snd('swish'); api.hop(api.q('ligadura'), 8); api.anim(api.q('pano'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' }); feito.add('l'); fim(); });
    api.tap(api.q('homem'), 'O homem ferido', () => { api.snd('hm'); api.bubble(250, 450, feito.size === 2 ? 'Obrigado! Já me sinto melhor.' : 'Ai, dói...', { key: 'h' }); });
    api.tap(api.q('sam'), 'O samaritano', () => { api.snd('heart'); api.bubble(420, 450, 'Vai ficar tudo bem!', { key: 's' }); });
    api.tap(api.q('burro'), 'Burro', () => { api.snd('heehaw'); api.hop(api.q('burro'), 10); });
  }
});

/* =====================================================================
   7 — NA ESTALAGEM
   ===================================================================== */
SCENES.push({
  key: 'estalagem', title: 'Na estalagem', ref: 'Lucas 10.34-35', tint: 'gold',
  text: [
    'Levou-o para uma estalagem e cuidou dele durante a noite.',
    'No dia seguinte, deu duas moedas ao dono da estalagem: «Cuida dele. Se gastares mais, eu pago-te quando voltar.»'
  ],
  fact: 'Uma estalagem era uma casa onde os viajantes podiam comer e dormir.',
  hint: 'Toca nas moedas.',
  alt: 'De manhã, à porta de uma estalagem, o samaritano dá duas moedas de prata ao dono. O homem, já com ligaduras, descansa sentado num banco.',
  cue: [440, 560],
  art() {
    let s = estalagem({});
    s += `<rect x="150" y="700" width="170" height="20" rx="6" fill="#a46e3c" stroke="${OL}" stroke-width="3"/><rect x="164" y="718" width="14" height="50" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/><rect x="292" y="718" width="14" height="50" fill="#8a5a33" stroke="${OL}" stroke-width="2.6"/>`;
    s += viajante({ x: 235, y: 770, s: .92, ...SIT, head: null, face: 'smile', look: .5, armL: { a: 30, b: 40 }, armR: { a: 30, b: 40 }, extra: `<path d="M-30,-232 Q0,-246 30,-232" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M-30,-232 Q0,-246 30,-232" stroke="#fbf6ea" stroke-width="8" fill="none" stroke-linecap="round"/>`, k: 'homem' });
    s += samaritano({ x: 430, y: 780, s: 1.02, face: 'smile', look: .6, armL: { a: 14 }, armR: { a: 70, b: -30 }, k: 'sam' });
    s += person(Object.assign({}, ESTALAJADEIRO, { x: 640, y: 780, s: 1.02, flip: true, face: 'joy', look: .5, armL: { a: 14 }, armR: { a: 60, b: -40 }, k: 'dono' }));
    s += moeda(500, 560, 'm0') + moeda(530, 580, 'm1');
    return s;
  },
  setup(api) {
    let n = 0;
    for (let i = 0; i < 2; i++) api.tap(api.q('m' + i), 'Moeda de prata', async () => {
      if (api.st['m' + i]) return;
      api.st['m' + i] = true;
      api.snd('gift');
      await api.anim(api.act(api.q('m' + i)), [{ transform: 'translate(0px,0px)' }, { transform: `translate(${80 - i * 30}px,-60px)`, offset: .5 }, { transform: `translate(${100 - i * 30}px,${10 - i * 20}px)` }], { duration: 700, fill: 'forwards' });
      n++;
      api.badge(560, 420, String(n), { key: 'n' });
      if (n === 2) { api.bubble(640, 440, 'Eu cuido dele!', { key: 'd' }); api.nudgeNext(2600); }
    });
    api.tap(api.q('sam'), 'O samaritano', () => { api.snd('hello'); api.bubble(430, 440, 'Cuida bem dele!', { key: 's' }); });
    api.tap(api.q('dono'), 'O dono da estalagem', () => { api.snd('hello'); api.bubble(640, 440, 'Bom dia!', { key: 'd' }); });
    api.tap(api.q('homem'), 'O homem', () => { api.snd('laugh'); api.bubble(235, 480, 'Obrigado, amigo!', { key: 'h' }); });
  }
});

/* =====================================================================
   8 — VAI E FAZ O MESMO!
   ===================================================================== */
SCENES.push({
  key: 'mesmo', title: 'Vai e faz o mesmo!', ref: 'Lucas 10.36-37', tint: 'meadow',
  text: [
    'Jesus perguntou: «Qual destes três foi o próximo do homem ferido?» O homem respondeu: «O que teve pena dele.»',
    'E Jesus disse:',
    { q: 'Vai e faz o mesmo!', who: 'jesus' }
  ],
  fact: 'Tu também podes ser um bom próximo: ajudar quem precisa, mesmo que não seja teu amigo!',
  hint: 'Toca em Jesus e no homem.',
  alt: 'Debaixo da oliveira, Jesus sorri e aponta para o caminho. O homem do rolo ouve com atenção.',
  cue: [240, 520],
  art() {
    let s = bgDay({ sunX: 660, sunY: 110, sunR: 40 });
    s += hill([[-40, 420], [220, 392], [460, 412], [700, 386], [840, 404]], '#b9cf8a');
    s += `<rect x="-40" y="470" width="900" height="400" fill="#c9d08e"/>`;
    s += olive(220, 560, 1.6);
    s += jesus({ x: 240, y: 770, s: 1.06, face: 'joy', look: .6, armL: { a: 14 }, armR: { a: 110, b: -10 }, k: 'jesus' });
    s += person(Object.assign({}, DOUTOR, { x: 560, y: 770, s: 1.04, flip: true, face: 'smile', look: .5, armL: { a: 14, item: ITEM.scroll() }, armR: { a: 30 }, k: 'doutor' }));
    s += flowerBand(7801, 770, 800, 8);
    return s;
  },
  setup(api) {
    api.tap(api.q('jesus'), 'Jesus', () => { api.snd('heart'); api.burst(250, 560, 'heart', 5); api.bubble(250, 450, 'Vai e faz o mesmo!', { key: 'j' }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2600); } });
    api.tap(api.q('doutor'), 'O homem que conhecia a lei', () => { api.snd('hm'); api.bubble(560, 440, 'O que teve pena dele!', { key: 'd' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre os montes. A estalagem tem a janela acesa, e uma ovelhinha dorme ao lado de um burro.',
  cue: [430, 160],
  questions: [
    ['Para onde ia o homem da história?', 'Para Jericó.'],
    ['Quem passou e não ajudou?', 'Um sacerdote e um levita.'],
    ['Quem parou para ajudar?', 'O samaritano.'],
    ['Com que tratou ele as feridas?', 'Com azeite, vinho e ligaduras.'],
    ['O que nos disse Jesus para fazer?', '«Vai e faz o mesmo!»']
  ],
  verse: ['Ama o teu próximo como a ti mesmo.', 'Lucas 10.27'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(7901, 80, 0, 0, 800, 440, { big: .12 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 560], [160, 520], [360, 548], [560, 500], [840, 540]], '#29475a');
    s += `<g opacity=".9"><rect x="520" y="560" width="220" height="140" fill="#3a3a5a"/><rect x="510" y="550" width="240" height="14" fill="#2c2c46"/><rect x="640" y="600" width="50" height="40" rx="6" fill="#ffd27a" opacity=".8"/></g>`;
    s += hill([[-40, 690], [240, 664], [480, 680], [720, 656], [840, 672]], '#2c584f');
    s += `<g opacity=".85">${equine({ x: 420, y: 740, s: .5, kind: 'donkey', cls: '' })}</g>`;
    s += sheep({ x: 230, y: 744, s: .9, pose: 'sleep', k: 'ove', wool: '#e9ecf6' });
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
    api.tap(api.q('ove'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(250, 660, 'Zzz...', { key: 'o', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'samaritano',
  title: 'O Bom Samaritano',
  cover: { kicker: 'Uma história da Bíblia', pre: 'O Bom', title: 'Samaritano', sub: 'Ama o teu próximo' },
  color: '#2f8f6f',
  ref: 'Lucas 10.25-37',
  scenes: SCENES
});
})();
