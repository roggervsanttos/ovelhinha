/* =====================================================================
   LIVRO: DAVI, O PASTORZINHO
   ===================================================================== */
(() => {
const SCENES = [];
const DAVI = { kind: 'child', hairStyle: 'curly', hair: '#8e3b1b', hi: '#c0612e', skin: '#e3a675', tunic: '#3f93c7', belt: '#7b4a2a' };
const davi = o => person(Object.assign({}, DAVI, o));
const SAMUEL = { kind: 'adult', skin: '#d99a6c', head: 'cloth', clothCol: '#efe4cc', clothStripe: '#5872b8', beard: 'long', beardCol: '#f3f0ea', browCol: '#f6f3ee', hair: '#f3f0ea', tunic: '#7b4c93', longSleeves: true, belt: '#c9a24e' };
const SAUL = { kind: 'adult', skin: '#d79a68', hair: '#3a2820', beard: 'short', head: 'crown', tunic: '#b8312f', cloak: '#7a2230', longSleeves: true, trim: '#f2c14e', belt: '#7a2230' };
const GOLIAS = { kind: 'adult', skin: '#c98b5a', hair: '#2a1e1a', beard: 'bushy', beardCol: '#2a1e1a', head: 'helmetG', tunic: '#a8352c', hemY: -74, hemW: 46, greaves: '#c08a44', shoe: '#5a3a26', belt: '#6b3f22' };
const JONATAS = { kind: 'adult', skin: '#d9a070', hair: '#3b2418', hairStyle: 'short', head: 'circlet', tunic: '#5e9a43', belt: '#7b4a2a' };
const JESSE = { kind: 'adult', skin: '#d39463', head: 'cloth', clothCol: '#e9dcc0', clothStripe: '#a8553a', beard: 'long', beardCol: '#b9b3aa', browCol: '#cfc9c0', hair: '#b9b3aa', tunic: '#8b6a4a', longSleeves: true, belt: '#5b3a2a' };
const goliasArmor = () => scaleArmor('adult');

/* ---------- cenários deste livro ---------- */
function bgCourtyard(o = {}) {
  let s = bgDay({ sky: o.sky, sunX: o.sunX ?? 690, sunY: o.sunY ?? 140, sunR: 42, face: o.face ?? true });
  s += hill([[-40, 470], [160, 440], [360, 462], [560, 438], [840, 455]], '#cfe2ae');
  s += olive(560, 520, .9) + olive(690, 512, .75, { leaf: '#86a35f' });
  // muro de pedra
  s += `<rect x="-40" y="508" width="900" height="56" fill="#d8bd8a"/><rect x="-40" y="500" width="900" height="12" rx="4" fill="#e6d0a2" stroke="${OL}" stroke-width="2.4"/>`;
  let st = '';
  for (let r = 0; r < 2; r++) for (let x = -40 + (r ? 30 : 0); x < 840; x += 62) st += `<rect x="${x}" y="${514 + r * 24}" width="56" height="20" rx="5" fill="#cfb27c"/>`;
  s += `<g opacity=".8">${st}</g>`;
  // casa de Jessé
  s += house(18, 566, 236, 206, { wall: '#efdcb1', shade: '#d9bd88', roof: '#dcc08c', sw: 3 });
  s += `<path d="M170,566 l0,-58 l70,0 l0,58" fill="#c79b5d" opacity=".25"/>`;
  s += `<path d="M18,420 Q60,400 92,428 T170,420 T254,430" stroke="#5f8f3e" stroke-width="10" fill="none" stroke-linecap="round"/>` + [40, 80, 120, 160, 210, 240].map((x, i) => `<ellipse cx="${x}" cy="${424 + (i % 2) * 8}" rx="12" ry="8" fill="${i % 2 ? '#6fa249' : '#83b357'}"/>`).join('');
  // pátio
  s += `<rect x="-40" y="562" width="900" height="300" fill="${o.ground || '#e8d3a3'}"/>`;
  const R = rng(4);
  let fs = '';
  for (let i = 0; i < 26; i++) fs += `<ellipse cx="${r1(R() * 820)}" cy="${r1(585 + R() * 210)}" rx="${r1(18 + R() * 22)}" ry="${r1(6 + R() * 5)}" fill="#dcc391" opacity=".8"/>`;
  return s + fs;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Davi, o Pastorzinho',
  alt: 'O menino Davi a acenar no alto de uma colina, com ovelhas à volta e o sol a nascer atrás de Belém.',
  cue: [400, 700],
  art() {
    let s = sky('sky', [[0, '#76bfe8'], [.4, '#b9e1f3'], [.62, '#fde2b8'], [.74, '#ffd59a'], [1, '#ffd59a']], 1100);
    s += sun(560, 742, 96, { glow: '#ffeab0' });
    s += cloud(150, 470, 1.1, { shade: '#e9dbe9' }) + cloud(650, 395, .92, { dx: -40, d: 18, shade: '#e9dbe9' }) + cloud(420, 575, .62, { d: 13, shade: '#f6dccb' });
    s += bird(250, 600, 1) + bird(300, 626, .8, { d: 11 }) + bird(560, 540, .7, { d: 8, dx: -50 });
    s += hill([[-40, 792], [120, 764], [260, 776], [420, 794], [600, 772], [840, 786]], '#cbdba6');
    s += town(66, 722, .64, { sw: 2.2 }) + palm(230, 778, .42);
    s += hill([[-40, 852], [140, 820], [330, 842], [520, 822], [700, 834], [840, 822]], '#a8cd6e');
    s += hill([[-40, 935], [170, 905], [400, 880], [620, 906], [840, 928]], '#8fbe57');
    s += grassBand(11, 900, 990, 10, ['#6aa246', '#5f9440']);
    s += sheep({ x: 210, y: 978, s: .95, face: '#f1d2bb', k: 'c1', cls: 'bob' });
    s += davi({ x: 400, y: 908, s: 1.66, bag: true, face: 'grin', armL: { a: 6, item: ITEM.staff(180, -1) }, armR: { a: 150, b: -26 }, k: 'davi' });
    s += sheep({ x: 492, y: 942, s: .58, flip: true, face: '#f1d2bb', k: 'c3' });
    s += sheep({ x: 610, y: 990, s: 1.02, flip: true, k: 'c2', cls: 'bob' });
    s += hill([[-40, 1030], [200, 1006], [420, 1022], [640, 1000], [840, 1016]], '#7fb04a');
    s += flowerBand(12, 1030, 1085, 9);
    return s;
  },
  setup(api) {
    const d = api.q('davi');
    api.tap(d, 'Davi', async () => {
      api.wave(d, 'armR');
      api.snd('hello');
      api.bubble(400, 600, 'Olá! Eu sou o Davi!', { key: 'davi' });
    });
    for (const k of ['c1', 'c2', 'c3']) api.tap(api.q(k), 'Ovelha', () => { api.hop(api.q(k)); api.snd('bleat', k === 'c3' ? 1.35 : 1 + Math.random() * .1); });
  }
});

/* =====================================================================
   1 — O PASTORZINHO DE BELÉM
   ===================================================================== */
SCENES.push({
  key: 'belem', title: 'Um pastorzinho em Belém', ref: '1 Samuel 16.11; 17.15', tint: 'meadow',
  text: [
    'Na cidade de Belém, vivia um menino chamado Davi. Era o filho mais novo da família.',
    'Davi era pastor. Todos os dias, levava as ovelhas a comer erva e a beber água fresquinha.',
    'Vamos contar as ovelhas?'
  ],
  fact: 'Muitos anos depois, Jesus nasceu nesta mesma cidade: Belém!',
  hint: 'Toca nas ovelhas para contares quantas são.',
  alt: 'Davi com o seu cajado num pasto verde, perto de cinco ovelhas, com a cidade de Belém ao longe.',
  cue: [520, 640],
  art() {
    let s = bgDay();
    s += bird(300, 230, 1) + bird(345, 252, .75, { d: 11 });
    s += hill([[-40, 425], [110, 392], [240, 410], [380, 430], [540, 405], [700, 420], [840, 400]], '#cfe2ae');
    s += town(70, 352, .6) + palm(262, 414, .36) + palm(286, 420, .28);
    s += hill([[-40, 500], [150, 470], [330, 490], [520, 462], [700, 480], [840, 470]], '#aed37a');
    s += olive(712, 548, 1.05);
    s += hill([[-40, 575], [200, 548], [420, 565], [640, 545], [840, 560]], '#94c45e');
    s += grassBand(21, 570, 660, 14);
    s += sheep({ x: 556, y: 590, s: .74, pose: 'graze', k: 'o1' });
    s += sheep({ x: 420, y: 616, s: .84, face: '#f1d2bb', flip: true, k: 'o2' });
    s += sheep({ x: 650, y: 652, s: .98, flip: true, k: 'o3' });
    s += sheep({ x: 352, y: 684, s: 1.0, pose: 'graze', face: '#f1d2bb', k: 'o4' });
    s += davi({ x: 196, y: 704, s: 1.4, bag: true, face: 'grin', look: .5, armL: { a: 6, item: ITEM.staff(178, -1) }, armR: { a: 34, b: 24 }, k: 'davi' });
    s += sheep({ x: 528, y: 708, s: 1.14, k: 'o5' });
    s += flowerBand(13, 735, 790, 9) + grassBand(14, 720, 790, 10, ['#5f9440']);
    return s;
  },
  setup(api) {
    const ks = ['o1', 'o2', 'o3', 'o4', 'o5'], seen = [];
    for (const k of ks) {
      const el = api.q(k);
      api.tap(el, 'Ovelha', () => {
        const [x, y, s] = api.pos(el);
        api.hop(el);
        if (!seen.includes(k)) {
          seen.push(k);
          const n = seen.length;
          api.snd('count', n);
          api.later(() => api.snd('bleat', .92 + n * .07), 120);
          api.badge(x, y - 96 * s, String(n), { key: k });
          if (n === 5) api.later(() => {
            api.snd('tada');
            api.bubble(196, 420, 'Cinco ovelhas!', { key: 'davi' });
            api.hop(api.q('davi'), 26);
            api.burst(400, 420, 'star', 10);
            ks.forEach((kk, i) => api.later(() => api.hop(api.q(kk)), 200 + i * 110));
          }, 650);
        } else {
          api.snd('bleat', 1 + Math.random() * .15);
          api.bubble(x, y - 92 * s, 'Béé!', { size: 26, dur: 900, key: k });
        }
      });
    }
  }
});

/* =====================================================================
   2 — CANÇÕES DEBAIXO DAS ESTRELAS
   ===================================================================== */
const TWINKLE = ['C5', 'C5', 'G5', 'G5', 'A5', 'A5', 'G5', 'F5', 'F5', 'E5', 'E5', 'D5', 'D5', 'C5'];
SCENES.push({
  key: 'estrelas', title: 'Canções debaixo das estrelas', ref: 'Salmo 19.1; 1 Samuel 16.18', tint: 'night',
  text: [
    'De noite, as ovelhas dormiam. Davi olhava para as estrelas, tocava harpa e cantava:',
    { q: 'O céu mostra como Deus é grande!', who: 'davi' },
    'Davi amava a Deus de todo o coração.'
  ],
  fact: 'Davi fez muitas canções para Deus. Estão na Bíblia, no livro dos Salmos.',
  hint: 'Toca na harpa e nas estrelas para fazeres música.',
  alt: 'À noite, Davi toca harpa sentado numa pedra, perto de uma fogueira, com ovelhas a dormir e muitas estrelas no céu.',
  cue: [452, 600],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.45, '#232d69'], [.68, '#3a4889'], [1, '#3a4889']]);
    s += starField(2, 84, 0, 0, 800, 470, { big: .1 });
    s += moon(132, 150, 40);
    const BIG = [[300, 140], [432, 212], [560, 128], [684, 214], [236, 290], [612, 318]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.6 + i * .37).toFixed(2)}s;${dl(4)}"><path d="${sparkle(17)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += hill([[-40, 470], [140, 440], [330, 462], [520, 432], [700, 452], [840, 440]], '#2b416c');
    s += town(560, 388, .5, { wall: '#4a5582', shade: '#3c456e', roof: '#57628f', winCol: '#ffd66b', doorCol: '#2b304f', sw: 2 });
    s += hill([[-40, 540], [180, 510], [400, 528], [620, 500], [840, 520]], '#244a5b');
    s += hill([[-40, 610], [220, 590], [460, 604], [700, 582], [840, 596]], '#2c584f');
    s += blob([[60, 600, 34], [104, 590, 26], [740, 584, 32], [776, 596, 24]], '#24493f', 0);
    for (let i = 0; i < 9; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${60 + i * 85}" cy="${560 + (i % 3) * 22}" r="3" fill="#f6f39a"/>`;
    s += sheep({ x: 170, y: 706, s: .95, pose: 'sleep', k: 'z1', wool: '#e9ecf6' });
    s += sheep({ x: 712, y: 646, s: .68, pose: 'sleep', flip: true, k: 'z3', wool: '#e3e7f3' });
    s += campfire(312, 676, .86);
    s += rock(458, 702, 128, 48, { fill: '#7c7a8c', shade: '#5f5c70', hi: '#9a98aa' });
    s += davi({ x: 458, y: 702, s: 1.16, legs: 'sit', face: 'joy', front: `<g transform="translate(8,-56) scale(1.2)">${ITEM.lyre()}</g>`, armL: { a: -24, b: -60 }, armR: { a: -6, b: -74 }, k: 'davi' });
    s += sheep({ x: 616, y: 708, s: .86, pose: 'sleep', flip: true, k: 'z2', wool: '#e9ecf6' });
    s += grassBand(23, 715, 790, 8, ['#2f6a4a', '#3a7a52']);
    return s;
  },
  setup(api) {
    const d = api.q('davi');
    let i = 0;
    api.tap(d, 'Harpa de Davi', () => {
      const n = TWINKLE[i % TWINKLE.length]; i++;
      api.snd('pluck', n);
      api.strum(d);
      api.burst(452, 560, 'note', 1);
    });
    const NOTES = ['C6', 'D6', 'E6', 'G6', 'A6', 'E6'];
    for (let k = 0; k < 6; k++) {
      const el = api.q('star' + k);
      api.tap(el, 'Estrela', () => {
        const [x, y] = api.pos(el);
        api.snd('chime', NOTES[k]);
        api.anim(api.act(el), [{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' });
        api.burst(x, y, 'spark', 7, { col: '#ffe9a6' });
      });
    }
    for (const k of ['z1', 'z2', 'z3']) api.tap(api.q(k), 'Ovelha a dormir', () => { const [x, y, s] = api.pos(api.q(k)); api.snd('snore'); api.bubble(x, y - 70 * s, 'Zzz...', { size: 24, dur: 1200, key: k }); });
  }
});

/* =====================================================================
   3 — O LEÃO E O URSO
   ===================================================================== */
SCENES.push({
  key: 'coragem', title: 'Um pastor corajoso', ref: '1 Samuel 17.34-37', tint: 'sand',
  text: [
    'Um dia, um leão apanhou uma ovelhinha! Davi correu atrás dele e salvou a ovelhinha.',
    'Noutro dia, veio um urso. E Davi protegeu as ovelhas outra vez!',
    'Deus dava força e coragem a Davi.'
  ],
  fact: 'O pastor usava um cajado, um bastão comprido, para cuidar das ovelhas.',
  hint: 'Toca no leão e no urso.',
  alt: 'Davi corre com o cajado erguido atrás de um leão que leva uma ovelhinha; um urso espreita atrás de uma pedra.',
  cue: [560, 600],
  art() {
    let s = sky('sky', [[0, '#8fd0f0'], [.5, '#e3f2f1'], [.66, '#f7ecce'], [1, '#f7ecce']]);
    s += sun(118, 140, 40, { face: true }) + cloud(420, 150, .9) + cloud(690, 120, .7, { dx: -30 });
    s += hill([[-40, 430], [120, 400], [260, 420], [420, 392], [600, 418], [840, 396]], '#e6d4a3');
    s += hill([[-40, 490], [180, 462], [380, 484], [580, 450], [840, 470]], '#d8c08a');
    s += rock(690, 470, 230, 112, { k: 'bigrock' });
    s += bearPeek({ x: 682, y: 372, s: .86 });
    s += rock(560, 478, 96, 40);
    s += hill([[-40, 560], [200, 535], [420, 552], [640, 530], [840, 546]], '#bccb78');
    s += grassBand(31, 560, 650, 12, ['#8aa04d', '#9db45a']);
    s += sheep({ x: 92, y: 596, s: .58, k: 'f1' }) + sheep({ x: 168, y: 616, s: .66, face: '#f1d2bb', k: 'f2' }) + sheep({ x: 104, y: 648, s: .62, k: 'f3' });
    s += davi({ x: 292, y: 698, s: 1.32, legs: 'walk', face: 'determined', look: .7, bag: true, armR: { a: 160, b: -20, item: ITEM.staff(172, 1), ia: 0 }, armL: { a: 40, b: 20 }, k: 'davi' });
    s += lion({ x: 530, y: 694, s: 1.0, lamb: false });
    s += `<g transform="translate(626,662)" data-k="lamb"><g class="act"><g transform="rotate(18)">${sheep({ x: 0, y: 0, s: .5, flip: true, face: '#f1d2bb', cls: 'wiggle', k: 'lambIn' })}</g></g></g>`;
    s += flowerBand(32, 730, 790, 7, ['#f2c14e', '#ffffff', '#e0473e']);
    return s;
  },
  setup(api) {
    const st = api.st;
    const lionEl = api.q('lion'), bear = api.q('bear'), d = api.q('davi');
    api.tap(lionEl, 'Leão', async () => {
      if (st.lion) return; st.lion = true;
      api.snd('roar');
      api.bubble(292, 410, 'Larga a ovelhinha!', { key: 'davi' });
      api.anim(api.act(d), [{ transform: 'translateX(0)' }, { transform: 'translateX(130px)', offset: .45 }, { transform: 'translateX(130px)', offset: .6 }, { transform: 'translateX(0)' }], { duration: 1500, easing: 'ease-in-out' });
      await api.wait(420);
      const lamb = api.act(api.q('lamb'));
      api.anim(lamb, [{ transform: 'translate(0,0) rotate(0deg)' }, { transform: 'translate(-210px,-190px) rotate(-200deg)', offset: .5 }, { transform: 'translate(-400px,-18px) rotate(-378deg)' }], { duration: 1100, easing: 'ease-in-out', fill: 'forwards' });
      api.snd('whoosh');
      api.anim(api.act(lionEl), [{ transform: 'translateX(0px)' }, { transform: 'translateX(-14px)', offset: .15 }, { transform: 'translateX(480px)' }], { duration: 1100, easing: 'ease-in', fill: 'forwards' });
      api.burst(560, 690, 'dust', 6);
      await api.wait(1150);
      api.burst(216, 610, 'heart', 5);
      api.snd('bleat', 1.4);
      api.bubble(216, 600, 'Béé! Obrigada, Davi!', { key: 'lamb', size: 26 });
      api.hop(api.q('lambIn'), 18);
    });
    api.tap(bear, 'Urso', async () => {
      if (st.bear) return; st.bear = true;
      api.snd('grunt');
      api.bubble(292, 410, 'Xô, urso! Deixa as ovelhas!', { key: 'davi' });
      api.hop(d, 16);
      await api.wait(300);
      api.anim(api.act(bear), [{ transform: 'translate(0,0)', opacity: 1 }, { transform: 'translate(0,-14px)', opacity: 1, offset: .25 }, { transform: 'translate(70px,40px)', opacity: 0 }], { duration: 800, easing: 'ease-in' });
      api.burst(760, 470, 'dust', 5);
    });
    for (const k of ['f1', 'f2', 'f3']) api.tap(api.q(k), 'Ovelha', () => { api.hop(api.q(k)); api.snd('bleat', 1 + Math.random() * .2); });
  }
});

/* =====================================================================
   4 — DEUS OLHA O CORAÇÃO
   ===================================================================== */
const IRMAOS = [
  { k: 'b4', x: 335, y: 602, s: .68, tunic: '#5d6d8a', hair: '#2b1d17', beard: 'short', skin: '#c98a5a' },
  { k: 'b5', x: 450, y: 596, s: .7, tunic: '#8e3b4f', hair: '#4a2c1c', skin: '#e2a878' },
  { k: 'b6', x: 566, y: 600, s: .69, tunic: '#2f8a83', hair: '#3a2520', beard: 'short', skin: '#d99a6c' },
  { k: 'b7', x: 682, y: 604, s: .66, tunic: '#9a6b3e', hair: '#2b1d17', skin: '#b9784c' },
  { k: 'b2', x: 392, y: 700, s: .8, tunic: '#6f8f3a', hair: '#4a2c1c', skin: '#d99a6c' },
  { k: 'b1', x: 512, y: 704, s: .87, tunic: '#b85c38', hair: '#2b1d17', beard: 'short', skin: '#c98a5a' },
  { k: 'b3', x: 636, y: 700, s: .8, tunic: '#d0a03a', hair: '#3a2520', beard: 'short', skin: '#e2a878' }
];
SCENES.push({
  key: 'coracao', title: 'Deus olha para o coração', ref: '1 Samuel 16.1-10', tint: 'sand',
  text: [
    'Deus mandou o profeta Samuel à casa de Davi. Um dos meninos ia ser o novo rei!',
    'Os irmãos de Davi eram altos e fortes. Mas Deus disse:',
    { q: 'As pessoas olham para a aparência. Eu olho para o coração.', who: 'deus' }
  ],
  fact: 'O pai de Davi tinha oito filhos. Davi era o mais novo!',
  hint: 'Toca nos irmãos de Davi.',
  alt: 'O profeta Samuel, de barba branca, olha para sete irmãos altos em frente à casa de Jessé.',
  cue: [512, 520],
  art() {
    let s = bgCourtyard();
    s += person(Object.assign({}, JESSE, { x: 290, y: 566, s: .6, face: 'smile', look: .4, k: 'jesse' }));
    for (const b of IRMAOS) s += person({ kind: 'adult', x: b.x, y: b.y, s: b.s, tunic: b.tunic, hair: b.hair, beard: b.beard || null, skin: b.skin, face: 'smile', look: -.35, k: b.k, armL: { a: 8 }, armR: { a: 8 } });
    s += person(Object.assign({}, SAMUEL, { x: 140, y: 704, s: .98, face: 'smile', look: .6, armR: { a: 22, b: -62, item: ITEM.horn() }, armL: { a: 8, item: ITEM.staff(232, 1) }, k: 'samuel' }));
    s += flowerBand(41, 745, 790, 5, ['#e0473e', '#f2c14e']);
    return s;
  },
  setup(api) {
    const said = [N('Não é este.'), N('Este também não.'), N('Não... não é este.'), N('Também não.'), N('Não foi este que Deus escolheu.'), N('Este também não é.'), N('Não é nenhum destes!')];
    const seen = new Set();
    const sam = api.q('samuel');
    for (const b of IRMAOS) {
      const el = api.q(b.k);
      api.tap(el, 'Irmão de Davi', async () => {
        api.anim(api.act(el), [{ transform: 'translateY(0) scale(1,1)' }, { transform: 'translateY(-8px) scale(1.06,1.04)', offset: .4 }, { transform: 'translateY(0) scale(1,1)' }], { duration: 600, easing: 'ease-out' });
        api.snd('boing', .8 + Math.random() * .3);
        if (!seen.has(b.k)) seen.add(b.k);
        api.shakeHead(sam);
        api.bubble(160, 470, said[(seen.size - 1) % said.length], { key: 'sam' });
        if (seen.size === 7 && !api.st.end) {
          api.st.end = true;
          await api.wait(1700);
          api.bubble(160, 470, 'Tens mais algum filho?', { key: 'sam', dur: 2600 });
          await api.wait(2400);
          api.bubble(290, 404, 'O mais novo está a tomar conta das ovelhas!', { key: 'jesse', dur: 3200 });
          api.hop(api.q('jesse'), 10);
          api.nudgeNext();
        }
      });
    }
    api.tap(sam, 'Samuel', () => { api.snd('hm'); api.bubble(160, 470, 'Deus vai mostrar-me quem é.', { key: 'sam' }); });
  }
});

/* =====================================================================
   5 — O ESCOLHIDO
   ===================================================================== */
SCENES.push({
  key: 'ungido', title: 'O escolhido de Deus', ref: '1 Samuel 16.11-13', tint: 'gold',
  text: [
    'Então chamaram Davi, que estava com as ovelhas. Quando ele chegou, Deus disse:',
    { q: 'É ele! Este é o que eu escolhi.', who: 'deus' },
    'Samuel derramou azeite na cabeça de Davi. Um dia, Davi ia ser rei!'
  ],
  fact: 'Derramar azeite na cabeça era o sinal de que Deus tinha escolhido o rei.',
  hint: 'Toca no chifre de azeite.',
  alt: 'Davi ajoelhado enquanto o profeta Samuel segura um chifre de azeite sobre a cabeça dele; a família olha.',
  cue: [446, 450],
  art() {
    let s = bgCourtyard({ sky: [[0, '#8ccbec'], [.5, '#f5e6c4'], [.62, '#ffe6b8'], [1, '#ffe6b8']], face: false });
    s += `<defs>${rg('anoint', [[0, '#fff4c2', .95], [.5, '#ffd86b', .45], [1, '#ffcf4a', 0]])}</defs>`;
    s += person(Object.assign({}, JESSE, { x: 110, y: 700, s: .86, face: 'joy', k: 'jesse', armL: { a: 30, b: 60 }, armR: { a: 30, b: 60 } }));
    s += person({ kind: 'adult', x: 700, y: 650, s: .66, tunic: '#2f8a83', hair: '#3a2520', beard: 'short', skin: '#d99a6c', face: 'o', look: -.5 });
    s += person({ kind: 'adult', x: 640, y: 706, s: .8, tunic: '#b85c38', hair: '#2b1d17', beard: 'short', skin: '#c98a5a', face: 'surprise', look: -.6 });
    const sx = 392, sy = 700, ss = 1.1;
    const a = aimArm('adult', 1, ss, sx, sy, 456, 424);
    s += person(Object.assign({}, SAMUEL, { x: sx, y: sy, s: ss, face: 'smile', look: .5, armR: { a }, armL: { a: 10, item: ITEM.staff(232, 1) }, k: 'samuel' }));
    const [hx, hy] = handAt('adult', 1, { a }, ss, sx, sy);
    s += `<g transform="translate(468,548)"><g data-k="glow" opacity="0"><circle r="170" fill="${UR('anoint')}"/></g></g>`;
    s += davi({ x: 468, y: 706, s: 1.2, legs: 'kneel', face: 'smile', look: -.25, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'davi' });
    s += `<g transform="translate(468,486)"><g data-k="crown" opacity="0">${crownSVG(40, 0, 3)}</g></g>`;
    s += `<path data-k="stream" d="M${r1(hx + 4)},${r1(hy + 44)} C${r1(hx + 8)},${r1(hy + 60)} ${r1(hx + 14)},${r1(hy + 72)} 466,500" fill="none" stroke="#f2c230" stroke-width="7" stroke-linecap="round" stroke-dasharray="10 9" opacity="0"/>`;
    s += `<g transform="translate(${r1(hx)},${r1(hy)})"><g data-k="horn"><g transform="rotate(62) scale(1.55)">${ITEM.horn()}</g>${hitC(14, 20, 52)}</g><circle r="${(ADULT.hand + SW) * ss}" fill="${OL}"/><circle r="${ADULT.hand * ss}" fill="${SAMUEL.skin}"/></g>`;
    return s;
  },
  setup(api) {
    const horn = api.q('horn'), glow = api.q('glow'), crown = api.q('crown');
    api.tap(horn, 'Chifre de azeite', async () => {
      if (api.st.busy) return; api.st.busy = true;
      api.anim(horn, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(24deg)' }], { duration: 400, fill: 'forwards' });
      await api.wait(380);
      const [hx, hy] = api.pos(horn.parentNode);
      for (let i = 0; i < 6; i++) api.later(() => api.drop(hx + 4, hy + 46, 466 + (i % 2 ? 7 : -7), 500, '#f2c230'), i * 160);
      api.snd('pour');
      const stream = api.q('stream');
      api.anim(stream, [{ opacity: 0, strokeDashoffset: 0 }, { opacity: 1, strokeDashoffset: -38, offset: .2 }, { opacity: 1, strokeDashoffset: -150, offset: .85 }, { opacity: 0, strokeDashoffset: -190 }], { duration: 1100, easing: 'linear' });
      await api.wait(900);
      api.snd('anoint');
      api.anim(glow, [{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'scale(1.1)' }, { opacity: .85, transform: 'scale(1)' }], { duration: 1100, fill: 'forwards' });
      api.burst(468, 520, 'spark', 14, { col: '#ffd86b' });
      api.anim(crown, [{ opacity: 0, transform: 'translateY(16px) scale(.6)' }, { opacity: .95, transform: 'translateY(-8px) scale(1)' }, { opacity: .75, transform: 'translateY(-4px) scale(1)' }], { duration: 1400, fill: 'forwards' });
      api.bubble(392, 380, 'Este é o escolhido de Deus!', { key: 'sam', dur: 2800 });
      await api.wait(900);
      api.anim(horn, [{ transform: 'rotate(24deg)' }, { transform: 'rotate(0deg)' }], { duration: 500, fill: 'forwards' });
      api.st.busy = false;
    });
    api.tap(api.q('davi'), 'Davi', () => { api.snd('chime', 'E6'); api.burst(468, 500, 'heart', 3); });
    api.tap(api.q('jesse'), 'Jessé', () => { api.hop(api.q('jesse'), 12); api.bubble(110, 440, 'O meu filho mais novo!', { key: 'jesse' }); });
  }
});

/* =====================================================================
   6 — MÚSICA PARA O REI
   ===================================================================== */
function throne(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-64,-60 L-64,-226 Q-64,-266 -30,-278 Q0,-292 30,-278 Q64,-266 64,-226 L64,-60 Z" fill="#8c4f2a" stroke="${OL}" stroke-width="3"/><path d="M-46,-80 L-46,-222 Q-46,-250 -22,-258 Q0,-268 22,-258 Q46,-250 46,-222 L46,-80 Z" fill="#a8312f"/><path d="M-46,-222 Q-46,-250 -22,-258 Q0,-268 22,-258 Q46,-250 46,-222" stroke="#f2c14e" stroke-width="4" fill="none"/><circle cx="0" cy="-286" r="10" fill="#f2c14e" stroke="${OL}" stroke-width="2.6"/><rect x="-86" y="-104" width="172" height="26" rx="8" fill="#a0612f" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<rect x="${k * 82 - 11}" y="-150" width="22" height="74" rx="9" fill="#9a5a2c" stroke="${OL}" stroke-width="3"/><circle cx="${k * 82}" cy="-154" r="14" fill="#f2c14e" stroke="${OL}" stroke-width="2.6"/><rect x="${k * 74 - 7}" y="-80" width="14" height="80" fill="#7d4524" stroke="${OL}" stroke-width="2.6"/>`).join('')}</g>`;
}
function palaceBG() {
  let s = `<defs>${lg('win', [[0, '#8fd0f0'], [1, '#e9f6f8']])}${lg('flr', [[0, '#c48e55'], [1, '#a9733f']])}</defs>`;
  s += `<rect x="-40" y="-40" width="900" height="900" fill="#ecd2a3"/><rect x="-40" y="-40" width="900" height="130" fill="#e3c38e"/><rect x="-40" y="84" width="900" height="16" fill="#c99a5c"/>`;
  s += [...Array(14)].map((_, i) => `<rect x="${-30 + i * 64}" y="88" width="30" height="8" fill="#f2c14e" opacity=".8"/>`).join('');
  s += `<path d="M330,470 L330,262 A70,70 0 0 1 470,262 L470,470 Z" fill="${UR('win')}" stroke="${OL}" stroke-width="3"/>`;
  s += `<path d="M332,430 Q380,402 430,416 T468,404 L468,468 L332,468 Z" fill="#b6d47e"/><path d="M332,452 Q400,436 468,448 L468,468 L332,468 Z" fill="#9cc463"/>`;
  s += `<path d="M330,470 L330,262 A70,70 0 0 1 470,262 L470,470" fill="none" stroke="#c99a5c" stroke-width="10"/><path d="M400,190 L400,470 M330,370 L470,370" stroke="#c99a5c" stroke-width="6"/>`;
  s += column(118) + column(682);
  s += `<path d="M-40,-40 L250,-40 C230,40 160,90 60,120 C20,240 0,330 -40,430 Z" fill="#b3302f" stroke="${OL}" stroke-width="3"/><path d="M200,-40 C170,40 100,100 30,140 M140,-40 C110,60 50,140 -10,260" stroke="#8c1f24" stroke-width="5" fill="none"/>`;
  s += `<path d="M840,-40 L550,-40 C570,40 640,90 740,120 C780,240 800,330 840,430 Z" fill="#b3302f" stroke="${OL}" stroke-width="3"/><path d="M600,-40 C630,40 700,100 770,140 M660,-40 C690,60 750,140 810,260" stroke="#8c1f24" stroke-width="5" fill="none"/>`;
  s += `<rect x="-40" y="560" width="900" height="300" fill="${UR('flr')}"/>` + [590, 628, 676, 736].map(y => `<path d="M-40,${y} L840,${y}" stroke="#9a6534" stroke-width="2.4" opacity=".6"/>`).join('') + [-300, -140, 20, 180, 340, 500, 660, 820, 980].map(x => `<path d="M${400 + (x - 400) * .35},560 L${x},820" stroke="#9a6534" stroke-width="2.4" opacity=".5"/>`).join('');
  s += `<path d="M150,650 L650,650 L720,760 L80,760 Z" fill="#a8312f" stroke="${OL}" stroke-width="2.6"/><path d="M168,662 L632,662 L692,748 L108,748 Z" fill="none" stroke="#f2c14e" stroke-width="4"/>`;
  s += lampStand(205, 600, 170);
  return s;
}
SCENES.push({
  key: 'rei-saul', title: 'Uma música para o rei', ref: '1 Samuel 16.14-23', tint: 'rose',
  text: [
    'O rei Saul andava triste. Então chamaram Davi para tocar harpa no palácio.',
    'Quando Davi tocava, o rei ficava calminho e sentia-se melhor.'
  ],
  fact: 'O rei Saul gostou tanto de Davi que fez dele o seu ajudante.',
  hint: 'Toca na harpa para alegrares o rei.',
  alt: 'No palácio, Davi toca harpa para o rei Saul, que está sentado no trono com uma nuvem escura em cima da cabeça.',
  cue: [252, 600],
  art() {
    let s = palaceBG();
    s += throne(572, 702, 1);
    const saul = { x: 572, y: 702, s: .96, legs: 'sit', drop: 34, hemY: -62, look: -.5, armL: { a: 22, b: 30 }, armR: { a: 22, b: 30 } };
    s += `<g data-k="saulSad">${person(Object.assign({}, SAUL, saul, { face: 'sad' }))}</g>`;
    s += `<g data-k="saulHappy" opacity="0">${person(Object.assign({}, SAUL, saul, { face: 'joy' }))}</g>`;
    s += stormCloud(560, 392, 1);
    s += davi({ x: 244, y: 704, s: 1.16, face: 'joy', look: .4, front: `<g transform="translate(8,-56) scale(1.2)">${ITEM.lyre()}</g>`, armL: { a: -24, b: -60 }, armR: { a: -6, b: -74 }, k: 'davi' });
    return s;
  },
  setup(api) {
    const d = api.q('davi'), storm = api.q('storm');
    let n = 0;
    api.tap(d, 'Harpa de Davi', async () => {
      if (api.st.busy) return; api.st.busy = true;
      ['D4', 'F#4', 'A4', 'D5'].forEach((note, i) => api.later(() => { api.snd('pluck', note); api.strum(d); }, i * 150));
      for (let i = 0; i < 3; i++) api.later(() => api.fly(252, 560, 530 + i * 18, 420, 'note'), i * 220);
      await api.wait(900);
      n++;
      const sc = [1, .68, .4, 0][Math.min(n, 3)];
      api.anim(storm, [{ transform: `scale(${[1, .68, .4, 0][n - 1]})` }, { transform: `scale(${sc})` }], { duration: 600, fill: 'forwards', easing: 'cubic-bezier(.4,1.4,.5,1)' });
      if (n === 3) {
        api.snd('tada');
        api.anim(api.q('saulSad'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
        api.anim(api.q('saulHappy'), [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
        api.burst(560, 420, 'spark', 12, { col: '#ffe08a' });
        api.bubble(572, 436, 'Que música linda! Agora estou em paz.', { key: 'saul', dur: 3000 });
      } else api.bubble(572, 300, n === 1 ? 'Hum...' : 'Continua a tocar...', { key: 'saul', size: 26, dur: 1400 });
      api.st.busy = false;
      if (n >= 3) n = 3;
    });
  }
});

/* =====================================================================
   7 — UM GIGANTE CHAMADO GOLIAS
   ===================================================================== */
function bgElah(o = {}) {
  let s = sky('sky', o.sky || [[0, '#8cc4e6'], [.5, '#e1edf0'], [.62, '#f3e6c8'], [1, '#f3e6c8']]);
  if (o.sun !== false) s += sun(o.sunX ?? 120, o.sunY ?? 130, 38, { face: false });
  s += cloud(330, 150, .9) + cloud(650, 110, .8, { dx: -36, d: 19 });
  s += hill([[-40, 432], [140, 408], [330, 426], [520, 402], [700, 420], [840, 406]], '#dcd5ab');
  s += hill([[-40, 476], [90, 446], [210, 456], [320, 500], [430, 600]], '#b8c67b');
  s += hill([[370, 600], [470, 510], [600, 452], [720, 444], [840, 456]], '#cbb37a');
  s += tent(70, 470, 70, 56, { fill: '#efe1c4', stripe: '#3f6fb5', flag: '#3f6fb5', flagS: .8 }) + tent(170, 460, 60, 48, { fill: '#e8d8b8', stripe: '#3f6fb5' });
  s += tent(640, 452, 70, 56, { fill: '#e9d3b0', stripe: '#b5402f', flag: '#c0392b', flagS: .8 }) + tent(750, 462, 62, 50, { fill: '#e3caa2', stripe: '#b5402f' });
  if (o.armies !== false) {
    for (const [x, y] of [[112, 474], [140, 478], [228, 470]]) s += person({ kind: 'adult', x, y, s: .26, head: 'helmetI', tunic: '#7d7a5a', beard: 'short', hair: '#2b1d17', face: 'o', sw: 4 });
    for (const [x, y] of [[592, 456], [692, 460], [712, 466]]) s += person({ kind: 'adult', x, y, s: .26, head: 'helmetP', tunic: '#a8352c', hair: '#2b1d17', face: 'angry', sw: 4 });
  }
  s += hill([[-40, 604], [200, 588], [400, 602], [600, 584], [840, 598]], '#d8c590');
  s += `<path class="flow" style="--d:4s" d="M-40,640 C120,628 260,652 400,640 C540,628 680,652 840,636" stroke="#7cc5e8" stroke-width="9" fill="none" stroke-dasharray="40 18" stroke-linecap="round"/>`;
  return s;
}
SCENES.push({
  key: 'golias', title: 'Um gigante chamado Golias', ref: '1 Samuel 17.1-11', tint: 'stone',
  text: [
    'Um dia, chegou um exército inimigo. E com ele, um gigante enorme: Golias!',
    'Todos os dias, Golias gritava:',
    { q: 'Quem tem coragem de lutar comigo?', who: 'golias' },
    'E os soldados tremiam de medo.'
  ],
  fact: 'Golias tinha quase três metros de altura. Era mais alto do que uma porta!',
  hint: 'Toca no Golias.',
  alt: 'O gigante Golias, com capacete e lança, grita no vale; soldados de Israel escondem-se atrás dos escudos.',
  cue: [572, 470],
  art() {
    let s = bgElah();
    s += person(Object.assign({}, GOLIAS, { x: 572, y: 704, s: 1.72, face: 'shout', armor: goliasArmor(), extra: `<g transform="translate(46,-104) rotate(176)">${ITEM.sword()}</g>`, armL: { a: 16, item: ITEM.spear(318, 10) }, armR: { a: 28, b: 36 }, k: 'golias' }));
    const sold = [[112, 706, .74], [214, 694, .7], [312, 710, .74]];
    sold.forEach(([x, y, sc], i) => s += person({ kind: 'adult', x, y, s: sc, head: 'helmetI', tunic: ['#7d7a5a', '#8a6a4a', '#6d7d5a'][i], beard: i === 1 ? null : 'short', hair: '#2b1d17', skin: ['#c98a5a', '#e2a878', '#b9784c'][i], face: 'scared', look: .5, cls: 'tremble', front: `<g transform="translate(4,-96)">${ITEM.shield(40, ['#c9934b', '#b98a46', '#cf9c55'][i])}</g>`, armL: { a: -20, b: -50 }, armR: { a: -20, b: -50 }, k: 'sold' + i }));
    s += grassBand(71, 730, 790, 8, ['#9fae5e', '#b0bc6a']);
    return s;
  },
  setup(api) {
    const g = api.q('golias');
    api.tap(g, 'Golias', async () => {
      if (api.st.busy) return; api.st.busy = true;
      await api.anim(api.act(g), [{ transform: 'translateY(0)' }, { transform: 'translateY(-26px)', offset: .45 }, { transform: 'translateY(0)' }], { duration: 520, easing: 'ease-in-out' });
      api.snd('stomp');
      api.shake(12);
      api.burst(572, 704, 'dust', 8);
      api.bubble(572, 236, 'Quem tem coragem de lutar comigo?!', { key: 'g', dur: 2600 });
      for (let i = 0; i < 3; i++) api.anim(api.act(api.q('sold' + i)), [{ transform: 'translateY(0)' }, { transform: 'translateY(16px) scale(.96)', offset: .2 }, { transform: 'translateY(16px) scale(.96)', offset: .8 }, { transform: 'translateY(0)' }], { duration: 1800 });
      await api.wait(700);
      api.st.busy = false;
    });
    for (let i = 0; i < 3; i++) api.tap(api.q('sold' + i), 'Soldado de Israel', () => { api.snd('gulp'); api.bubble(sold(i), 520, ['Que medo!', 'Ele é enorme!', 'Eu não vou!'][i], { key: 's' + i, size: 26 }); });
    function sold(i) { return [112, 214, 312][i]; }
  }
});

/* =====================================================================
   8 — GRANDE DEMAIS!
   ===================================================================== */
function bgTent() {
  let s = `<rect x="-40" y="-40" width="900" height="900" fill="#efdcb4"/>`;
  for (let i = 0; i < 14; i++) s += `<rect x="${-40 + i * 70}" y="-40" width="34" height="620" fill="#d9875a" opacity=".55"/>`;
  s += `<path d="M-40,-40 L840,-40 L840,90 Q400,-10 -40,90 Z" fill="#b4643f" opacity=".55"/>`;
  s += `<rect x="472" y="-40" width="18" height="610" fill="#9a6b3e" stroke="${OL}" stroke-width="2.6"/>`;
  s += `<g transform="translate(300,-40)"><path d="M0,0 L0,170" stroke="#6b4a33" stroke-width="3"/><g transform="translate(0,170)"><g class="sway" style="--r:3deg;--d:3s"><path d="M-20,0 Q0,26 20,0 Z" fill="#d9a33a" stroke="${OL}" stroke-width="2.4"/><g transform="translate(0,-2)"><g class="flicker"><path d="M0,-24 C7,-14 9,-6 6,-1 C3,3 -3,3 -6,-1 C-9,-6 -7,-14 0,-24 Z" fill="#ffb238"/></g></g></g></g><circle cx="0" cy="160" r="60" fill="#ffd27a" opacity=".18"/></g>`;
  s += `<rect x="-40" y="568" width="900" height="300" fill="#c9a873"/>`;
  s += `<path d="M120,640 L700,640 L760,770 L60,770 Z" fill="#6c3f66" stroke="${OL}" stroke-width="2.6"/><path d="M140,652 L680,652 L732,758 L88,758 Z" fill="none" stroke="#f2c14e" stroke-width="4" stroke-dasharray="14 10"/>`;
  s += `<g transform="translate(690,600)"><rect x="-56" y="-52" width="112" height="56" rx="6" fill="#8c4f2a" stroke="${OL}" stroke-width="3"/><rect x="-56" y="-52" width="112" height="16" rx="6" fill="#a0612f" stroke="${OL}" stroke-width="3"/><rect x="-8" y="-40" width="16" height="16" rx="3" fill="#f2c14e" stroke="${OL}" stroke-width="2"/></g>`;
  s += `<g transform="translate(760,560)">${limb(0, 0, 0, -220, 5, '#9a6b3e')}</g><g transform="translate(790,566)">${limb(0, 0, 0, -200, 5, '#9a6b3e')}</g><path d="M748,-50 L760,-82 L772,-50 Z M778,-30 L790,-62 L802,-30 Z" fill="#cfd5dc"/>`;
  return s;
}
function bigMail() {
  const p = `M-36,-122 Q-46,-126 -34,-134 L34,-134 Q46,-126 36,-122 L56,-6 Q0,8 -56,-6 Z`;
  let rows = '';
  for (let y = -124, r = 0; y < -12; y += 10, r++) {
    const w = 34 + (y + 124) / 118 * 20 - 6;
    for (let x = -w + (r % 2 ? 5 : 0); x < w - 4; x += 10) rows += `<path d="M${r1(x)},${y} q5,7 10,0"/>`;
  }
  const sleeves = [-1, 1].map(k => `<path d="M${k * 30},-130 L${k * 58},-104 L${k * 46},-86 L${k * 26},-104 Z" fill="#aeb9c4" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('');
  return `<g data-k="mail"><g data-p="mailAct">${sleeves}${op(p, '#b7c2cc')}<g fill="none" stroke="#7f8b98" stroke-width="2" opacity=".85">${rows}</g><path d="M-30,-118 Q-34,-70 -40,-20" stroke="#dfe6ec" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/></g></g>`;
}
function bigHelm() {
  const R = 46;
  return `<g data-k="helm"><g data-p="helmAct">${helmetDome(R, 3.2, '#c9934b')}<circle cx="0" cy="${-R * 1.12}" r="${R * .14}" fill="#c9934b" stroke="${OL}" stroke-width="3"/></g></g>`;
}
SCENES.push({
  key: 'armadura', title: 'Grande demais!', ref: '1 Samuel 17.17-39', tint: 'rose',
  text: [
    'Davi foi levar comida aos irmãos, que eram soldados. Quando ouviu Golias, disse ao rei:',
    { q: 'Eu vou lutar com o gigante! Deus salvou-me do leão e do urso. Ele vai salvar-me outra vez!', who: 'davi' },
    'O rei deu a sua armadura a Davi... mas era grande demais!'
  ],
  fact: 'A armadura do rei era de metal e muito pesada.',
  hint: 'Toca no Davi para lhe tirares a armadura.',
  alt: 'Dentro da tenda, Davi veste uma armadura enorme: o capacete tapa-lhe os olhos e a espada arrasta pelo chão; o rei Saul observa.',
  cue: [330, 560],
  art() {
    let s = bgTent();
    s += person(Object.assign({}, SAUL, { x: 612, y: 704, s: 1.0, face: 'smile', look: -.6, armR: { a: 24, b: 40 }, armL: { a: -10, b: -128 }, k: 'saul' }));
    s += `<g transform="translate(200,690)"><path d="M-30,0 L-24,-36 L24,-36 L30,0 Z" fill="#b57c46" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M-26,-36 Q0,-50 26,-36" fill="#e9c27a" stroke="${OL}" stroke-width="2.6"/><ellipse cx="-8" cy="-42" rx="12" ry="7" fill="#e9b45a" stroke="${OL}" stroke-width="2.2"/><ellipse cx="10" cy="-44" rx="10" ry="7" fill="#f6e2a8" stroke="${OL}" stroke-width="2.2"/></g>`;
    const sword = `<g transform="translate(-34,-62)"><g data-k="sword"><g transform="rotate(204) scale(1.45)">${ITEM.sword()}</g></g></g>`;
    s += davi({ x: 336, y: 706, s: 1.25, face: 'worry', armor: bigMail(), extra: `<g transform="translate(0,-134)">${bigHelm()}</g>` + sword, armL: { a: 38, b: 10 }, armR: { a: 38, b: 10 }, k: 'davi' });
    return s;
  },
  setup(api) {
    const d = api.q('davi');
    let step = 0;
    api.tap(d, 'Davi com a armadura', async () => {
      if (api.st.busy || step > 2) return; api.st.busy = true;
      if (step === 0) {
        api.snd('clank');
        await api.anim(api.q('helm'), [{ transform: 'translate(0,0) rotate(0deg)' }, { transform: 'translate(-30px,-80px) rotate(-40deg)', offset: .35 }, { transform: 'translate(-92px,112px) rotate(-120deg)' }], { duration: 800, easing: 'ease-in', fill: 'forwards' });
        api.snd('clank', .8);
        api.bubble(336, 400, 'Não consigo ver nada!', { key: 'd', size: 26 });
      } else if (step === 1) {
        api.snd('clank', 1.15);
        await api.anim(api.q('mail'), [{ transform: 'translate(0,0)' }, { transform: 'translate(0,-10px)', offset: .2 }, { transform: 'translate(70px,8px) scale(1,.3)' }], { duration: 700, easing: 'ease-in', fill: 'forwards' });
        api.snd('clank', .7);
        api.bubble(336, 400, 'Que pesado!', { key: 'd', size: 26 });
      } else {
        api.snd('clank', 1.3);
        await api.anim(api.q('sword'), [{ transform: 'translate(0px,0px) rotate(0deg)' }, { transform: 'translate(-4px,34px) rotate(52deg)', offset: .7 }, { transform: 'translate(-8px,50px) rotate(66deg)' }], { duration: 560, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' });
        api.snd('clank', .9);
        api.shake(4);
        api.bubble(336, 420, 'Não estou habituado a isto!', { key: 'd', dur: 2600 });
        api.later(() => api.bubble(612, 440, 'Vai, e o Senhor esteja contigo!', { key: 's' }), 2400);
        api.nudgeNext(3000);
      }
      api.hop(d, 10);
      step++;
      api.st.busy = false;
    });
    api.tap(api.q('saul'), 'Rei Saul', () => api.bubble(612, 440, 'Toma a minha armadura!', { key: 's' }));
  }
});

/* =====================================================================
   9 — CINCO PEDRAS LISAS
   ===================================================================== */
const STONES = [[512, 524], [598, 566], [548, 640], [690, 620], [628, 704]];
function terebinth(x, y, s = 1) {
  const can = [[-60, -150, 44], [-10, -182, 52], [50, -160, 46], [-86, -112, 32], [86, -116, 34], [0, -124, 50], [-40, -110, 36], [44, -108, 36]];
  const dark = can.map(([a, b, r]) => [a + 5, b + 10, r * .92]);
  return `<g transform="translate(${x},${y}) scale(${s})">${op('M-14,0 C-8,-40 -20,-70 -6,-110 L8,-110 C2,-74 14,-40 12,0 Z', '#8b6b4b')}${op('M0,-80 C14,-96 30,-104 52,-112 L54,-104 C34,-96 20,-86 8,-72 Z', '#8b6b4b', 2.6)}<g class="sway" style="--r:1.2deg;--d:7s">${blob(dark, '#5f8a3e')}${blob(can, '#76a64c', 0)}${blob([[-40, -170, 18], [0, -200, 20], [44, -176, 16]], '#93bf62', 0)}</g></g>`;
}
SCENES.push({
  key: 'pedras', title: 'Cinco pedras lisas', ref: '1 Samuel 17.40', tint: 'water',
  text: [
    'Davi tirou a armadura. Pegou no cajado e na funda e foi até ao ribeiro.',
    'Lá, apanhou cinco pedras muito lisinhas e guardou-as no saco. Vamos contar? Um, dois, três, quatro, cinco!'
  ],
  fact: 'A funda é uma tira com dois cordéis. A rodar depressa, atira a pedra para longe!',
  hint: 'Toca nas pedras para as guardares no saco.',
  alt: 'Davi ajoelhado na margem de um ribeiro, a apanhar pedras lisas da água; há juncos, um sapo e um peixe a saltar.',
  cue: [512, 524],
  art() {
    let s = bgDay({ sunX: 118, sunY: 118, sunR: 36 });
    s += hill([[-40, 318], [150, 292], [340, 312], [540, 286], [720, 304], [840, 292]], '#d6e6b6');
    s += hill([[-40, 370], [180, 344], [400, 366], [620, 340], [840, 360]], '#b9d885');
    s += `<defs>${lg('water', [[0, '#8bd6f0'], [1, '#3f9ccc']], .4, 1)}</defs>`;
    s += hill([[-40, 412], [200, 396], [430, 404], [640, 392], [840, 402]], '#9fc865');
    s += terebinth(712, 452, 1.05);
    s += `<path d="M396,402 C428,486 478,626 528,830 L860,830 L860,646 C720,566 560,476 474,402 Z" fill="${UR('water')}" stroke="#2e7fae" stroke-width="3"/>`;
    s += [[430, 450, 520, 470], [452, 520, 640, 560], [478, 600, 760, 640], [500, 680, 840, 716], [516, 760, 840, 790]].map(([x1, y1, x2, y2], i) => `<path class="flow" style="--d:${3 + i * .5}s;--o:-90" d="M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 - 16} ${x2},${y2}" stroke="#d9f3fc" stroke-width="4" fill="none" stroke-dasharray="26 30" stroke-linecap="round" opacity=".85"/>`).join('');
    s += `<path d="M474,402 C560,476 720,566 860,646 L860,402 Z" fill="#a9cf6c"/>`;
    s += rock(842, 650, 120, 40, { fill: '#b9c1a8', shade: '#97a088' }) + rock(398, 438, 70, 26, { fill: '#b9c1a8', shade: '#97a088' });
    s += tuft(420, 470, 1.3, '#4f8a3a') + tuft(446, 560, 1.2, '#4f8a3a') + tuft(560, 430, 1.1, '#4f8a3a') + tuft(790, 626, 1.3, '#4f8a3a');
    s += [[428, 486], [444, 504], [800, 640], [772, 618]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g class="sway" style="--r:3deg;--d:${3 + i * .7}s"><path d="M0,0 L0,-74" stroke="#4f8a3a" stroke-width="4"/><rect x="-5" y="-96" width="10" height="26" rx="5" fill="#8a5a33"/></g></g>`).join('');
    s += `<g transform="translate(700,744)" data-k="frog"><g class="act"><ellipse cx="0" cy="0" rx="40" ry="13" fill="#4f9a48" stroke="${OL}" stroke-width="2.6"/><path d="M0,0 L38,-6" stroke="#3f8238" stroke-width="3"/><g transform="translate(-4,-13)"><ellipse rx="21" ry="15" fill="#7bc263" stroke="${OL}" stroke-width="2.6"/><circle cx="-9" cy="-13" r="7.5" fill="#7bc263" stroke="${OL}" stroke-width="2.4"/><circle cx="9" cy="-13" r="7.5" fill="#7bc263" stroke="${OL}" stroke-width="2.4"/><circle cx="-9" cy="-13" r="3.2" fill="${OL}"/><circle cx="9" cy="-13" r="3.2" fill="${OL}"/><path d="M-8,2 q8,6 16,0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>${hitC(0, -12, 40)}</g></g>`;
    s += `<g transform="translate(626,676)"><g class="fishjump"><path d="M-17,0 Q0,-13 17,0 Q0,13 -17,0 Z M17,0 L30,-10 L30,10 Z" fill="#f28c3a" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="-8" cy="-2" r="2" fill="${OL}"/></g></g>`;
    STONES.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="st${i}"><g class="act"><ellipse class="shine" rx="30" ry="10" cy="5" fill="none" stroke="#e8f8ff" stroke-width="3" style="${dl(3)}"/>${ITEM.stone(14)}${hitC(0, 0, 38)}</g></g>`);
    s += `<g transform="translate(96,712) rotate(-82)">${ITEM.staff(176, 1)}</g>`;
    s += davi({ x: 252, y: 704, s: 1.46, legs: 'kneel', bag: true, face: 'smile', look: .7, armR: { a: 70, b: -14 }, armL: { a: 18 }, k: 'davi' });
    s += flowerBand(91, 742, 792, 5, ['#f2c14e', '#ffffff']);
    return s;
  },
  setup(api) {
    let n = 0;
    const BAG = [252 + 30 * 1.46, 704 - 28 * 1.46];
    STONES.forEach(([x, y], i) => {
      const el = api.q('st' + i);
      api.tap(el, 'Pedra lisa', async () => {
        if (el.dataset.got) return; el.dataset.got = 1;
        api.snd('plip');
        const dx = BAG[0] - x, dy = BAG[1] - y;
        await api.anim(api.act(el), [{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx / 2}px,${dy / 2 - 160}px) scale(1.15)`, opacity: 1, offset: .5 }, { transform: `translate(${dx}px,${dy}px) scale(.55)`, opacity: .15 }], { duration: 760, easing: 'ease-in-out', fill: 'forwards' });
        n++;
        api.snd('count', n);
        api.badge(BAG[0] + 34, BAG[1] - 80, String(n), { key: 'bag' });
        api.hop(api.q('davi'), 8);
        if (n === 5) api.later(() => { api.snd('tada'); api.bubble(252, 440, 'Cinco pedras lisas! Pronto!', { key: 'd' }); api.burst(BAG[0], BAG[1], 'star', 8); }, 500);
      });
    });
    api.tap(api.q('frog'), 'Sapo', () => { api.snd('ribbit'); api.hop(api.q('frog'), 34); api.bubble(700, 700, 'Croac!', { key: 'f', size: 26, dur: 900 }); });
  }
});

/* =====================================================================
   10 — EM NOME DO SENHOR
   ===================================================================== */
SCENES.push({
  key: 'em-nome', title: 'Em nome do Senhor', ref: '1 Samuel 17.41-47', tint: 'gold',
  text: [
    'Golias viu Davi e riu-se:',
    { q: 'Tu és só um menino!', who: 'golias' },
    'Mas Davi respondeu:',
    { q: 'Tu tens uma espada. Mas eu venho em nome do Senhor!', who: 'davi' }
  ],
  fact: 'Davi não confiava na sua própria força. Confiava em Deus!', factLabel: 'Para pensar',
  hint: 'Toca no Golias e no Davi.',
  alt: 'Frente a frente no vale: o pequeno Davi, com cajado e funda, enfrenta o enorme Golias, que se ri dele.',
  cue: [196, 560],
  art() {
    let s = bgElah({ sky: [[0, '#86bfe3'], [.5, '#f0e2c8'], [.62, '#f8d9a8'], [1, '#f8d9a8']], sunX: 400, sunY: 150 });
    s += `<defs>${rg('faith', [[0, '#fff6c8', .95], [.55, '#ffd86b', .4], [1, '#ffcf4a', 0]])}</defs>`;
    const G = { x: 590, y: 706, s: 1.8, armor: goliasArmor(), extra: `<g transform="translate(46,-104) rotate(176)">${ITEM.sword()}</g>`, armL: { a: 16, item: ITEM.spear(318, 10) }, armR: { a: 28, b: 36 } };
    s += `<g data-k="gA">${person(Object.assign({}, GOLIAS, G, { face: 'angry', k: 'golias' }))}</g>`;
    s += `<g data-k="gL" opacity="0" style="pointer-events:none">${person(Object.assign({}, GOLIAS, G, { face: 'laugh', cls: '' }))}</g>`;
    s += `<g transform="translate(196,560)"><g data-k="dglow" opacity="0"><circle r="190" fill="${UR('faith')}"/></g></g>`;
    s += davi({ x: 196, y: 706, s: 1.18, face: 'determined', look: .8, bag: true, armL: { a: 8, item: ITEM.staff(174, -1) }, armR: { a: 26, b: 6, item: ITEM.sling() }, k: 'davi' });
    s += grassBand(101, 730, 790, 8, ['#9fae5e', '#b0bc6a']);
    return s;
  },
  setup(api) {
    api.tap(api.q('golias'), 'Golias', async () => {
      if (api.st.g) return; api.st.g = true;
      api.snd('laugh');
      api.q('gA').style.opacity = 0; api.q('gL').style.opacity = 1;
      api.anim(api.act(api.q('gL').firstElementChild), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-1.5deg)' }, { transform: 'rotate(1.5deg)' }, { transform: 'rotate(-1.5deg)' }, { transform: 'rotate(0deg)' }], { duration: 1200 });
      api.bubble(590, 250, 'Ha, ha, ha! Tu és só um menino!', { key: 'g', dur: 2400 });
      await api.wait(1700);
      api.q('gA').style.opacity = 1; api.q('gL').style.opacity = 0;
      api.st.g = false;
    });
    api.tap(api.q('davi'), 'Davi', async () => {
      api.snd('anoint');
      api.anim(api.q('dglow'), [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.08)', offset: .4 }, { opacity: .8, transform: 'scale(1)' }], { duration: 1200, fill: 'forwards' });
      api.burst(196, 520, 'spark', 10, { col: '#ffe08a' });
      api.bubble(196, 446, 'Eu vou em nome do Senhor!', { key: 'd', dur: 2600 });
      api.hop(api.q('davi'), 10);
    });
  }
});

/* =====================================================================
   11 — UMA PEDRA, UM GIGANTE
   ===================================================================== */
const D11 = { x: 132, y: 706, s: 1.12 };
const ARM11 = { a: 132, b: -22 };
SCENES.push({
  key: 'vitoria', title: 'Uma pedra, um gigante', ref: '1 Samuel 17.48-52', tint: 'sky',
  text: [
    'Davi correu. Pôs uma pedra na funda e rodou, rodou, rodou... e soltou!',
    'A pedra acertou mesmo na testa do gigante. E Golias caiu no chão: TUM!',
    'Os soldados gritaram de alegria. Deus ajudou Davi a vencer!'
  ],
  fact: 'Davi apanhou cinco pedras, mas só precisou de uma!',
  hint: 'Toca na funda de Davi.',
  alt: 'Davi roda a funda por cima da cabeça; do outro lado do vale, o gigante Golias está prestes a cair.',
  cue: [178, 430],
  art() {
    let s = bgElah({ armies: false, sunX: 420, sunY: 140 });
    for (const [x, y, i] of [[60, 478, 0], [100, 470, 1], [140, 476, 2], [186, 468, 3], [226, 474, 4]]) s += `<g data-k="army${i}">${person({ kind: 'adult', x, y, s: .3, head: 'helmetI', tunic: ['#7d7a5a', '#8a6a4a', '#6d7d5a'][i % 3], beard: i % 2 ? 'short' : null, hair: '#2b1d17', face: 'o', sw: 4, armL: { a: 10, item: i % 2 ? ITEM.spear(200, 6) : '' }, armR: { a: 10 } })}</g>`;
    s += person(Object.assign({}, GOLIAS, { x: 654, y: 706, s: 1.74, face: 'laugh', armor: goliasArmor(), extra: `<g transform="translate(46,-104) rotate(176)">${ITEM.sword()}</g><g transform="translate(0,-232)"><g data-k="dizzy" opacity="0"><g class="spin" style="--d:1.2s">${[0, 120, 240].map(a => `<g transform="rotate(${a}) translate(40,0)"><path d="${sparkle(9)}" fill="#ffd84a" stroke="${OL}" stroke-width="1.6"/></g>`).join('')}</g></g></g>`, armL: { a: 16, item: ITEM.spear(318, 10) }, armR: { a: 28, b: 36 }, k: 'golias' }));
    s += davi(Object.assign({}, D11, { face: 'determined', look: .8, bag: true, legs: 'walk', armL: { a: 30, b: 20 }, armR: ARM11, k: 'davi' }));
    const [hx, hy] = handAt('child', 1, ARM11, D11.s, D11.x, D11.y);
    s += `<g transform="translate(${r1(hx)},${r1(hy)}) scale(1.35)"><g data-k="sling"><path d="M0,0 C-8,-16 -6,-34 -4,-48 M0,0 C8,-16 7,-34 4,-48" stroke="#6e4628" stroke-width="2.8" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-52" rx="10" ry="7" fill="#8a5a33" stroke="${OL}" stroke-width="2.2"/><g data-k="pstone"><ellipse cx="0" cy="-56" rx="7" ry="5.6" fill="#9aa4b1" stroke="${OL}" stroke-width="2"/></g>${hitC(0, -20, 54)}</g><circle r="${r1((CHILD.hand + SW) * D11.s)}" fill="${OL}"/><circle r="${r1(CHILD.hand * D11.s)}" fill="${DAVI.skin}"/></g>`;
    s += `<g transform="translate(${r1(hx)},${r1(hy)}) scale(1.35)"><g data-k="stone" opacity="0"><ellipse rx="8" ry="6.4" fill="#9aa4b1" stroke="${OL}" stroke-width="2"/></g></g>`;
    s += `<g transform="translate(690,150)" data-k="again" opacity="0" style="pointer-events:none"><rect x="-78" y="-28" width="156" height="56" rx="28" fill="#fffaf0" stroke="${OL}" stroke-width="3"/><path d="M-46,-8 A12,12 0 1 0 -38,10" stroke="${OL}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M-50,-16 L-46,-8 L-38,-11" stroke="${OL}" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="10" y="9" text-anchor="middle" font-size="26" class="svgtxt" fill="${OL}">${tr('Repetir')}</text></g>`;
    s += grassBand(111, 730, 790, 8, ['#9fae5e', '#b0bc6a']);
    return s;
  },
  setup(api) {
    const sling = api.q('sling'), stone = api.q('stone'), g = api.q('golias'), again = api.q('again'), dz = api.q('dizzy');
    const [hx, hy] = handAt('child', 1, ARM11, D11.s, D11.x, D11.y);
    const target = [654, 316];
    const throwIt = async () => {
      if (api.st.busy || api.st.down) return; api.st.busy = true;
      for (let i = 0; i < 3; i++) api.later(() => api.snd('whoosh', 1 + i * .15), i * 300);
      await api.anim(sling, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(1080deg)' }], { duration: 900, easing: 'cubic-bezier(.4,0,.6,1)' });
      api.q('pstone').style.opacity = 0;
      stone.style.opacity = 1;
      const dx = (target[0] - hx) / 1.35, dy = (target[1] - hy) / 1.35;
      await api.anim(stone, [{ transform: 'translate(0,-50px)' }, { transform: `translate(${dx * .5}px,${dy * .5 - 90}px)`, offset: .5 }, { transform: `translate(${dx}px,${dy}px)` }], { duration: 520, easing: 'linear', fill: 'forwards' });
      stone.style.opacity = 0;
      api.snd('bonk');
      api.burst(target[0], target[1], 'star', 9);
      dz.style.opacity = 1;
      await api.anim(api.act(g), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], { duration: 900 });
      dz.style.opacity = 0;
      await api.anim(api.act(g), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-84deg)' }], { duration: 900, easing: 'cubic-bezier(.55,0,.9,.55)', fill: 'forwards' });
      api.snd('boom');
      api.shake(16);
      api.burst(380, 700, 'dust', 12);
      api.bubble(420, 540, 'TUM!', { key: 'tum', size: 56, dur: 1300, plain: true });
      api.st.down = true;
      await api.wait(500);
      api.snd('victory');
      for (let i = 0; i < 5; i++) api.later(() => api.hop(api.q('army' + i).firstElementChild, 18), i * 120);
      api.bubble(140, 380, 'Viva! Deus deu a vitória!', { key: 'army', dur: 2800 });
      api.burst(132, 440, 'spark', 12, { col: '#ffe08a' });
      api.hop(api.q('davi'), 24);
      api.later(() => { again.style.pointerEvents = 'auto'; api.anim(again, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' }); }, 1600);
      api.st.busy = false;
    };
    api.tap(sling, 'Funda de Davi', throwIt);
    api.tap(api.q('davi'), 'Davi', throwIt);
    api.tap(again, 'Jogar outra vez', async () => {
      if (!api.st.down) return;
      api.anim(again, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      again.style.pointerEvents = 'none';
      await api.anim(api.act(g), [{ transform: 'rotate(-84deg)' }, { transform: 'rotate(0deg)' }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      api.q('pstone').style.opacity = 1;
      api.st.down = false;
    });
  }
});

/* =====================================================================
   12 — AMIGOS PARA SEMPRE
   ===================================================================== */
function cape(kind, col, k, op = 1) {
  const G = kind === 'adult' ? ADULT : CHILD;
  const sY = G.shY, hY = G.hemY, sW = G.shW + 6, hW = G.hemW + 12;
  const p = `M${-sW},${sY + 4} Q${-sW - 4},${sY - 6} ${-sW + 12},${sY - 4} L${sW - 12},${sY - 4} Q${sW + 4},${sY - 6} ${sW},${sY + 4} L${hW},${hY + 2} Q0,${hY + 10} ${-hW},${hY + 2} Z`;
  return `<g data-k="${k}" opacity="${op}"><path d="${p}" fill="${col}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M${-hW + 4},${hY} Q0,${hY + 7} ${hW - 4},${hY}" stroke="#000" opacity=".15" stroke-width="5" fill="none"/></g>`;
}
function palaceFacade() {
  let s = `<rect x="110" y="300" width="580" height="270" fill="#f1dfb8" stroke="${OL}" stroke-width="3"/><rect x="560" y="300" width="130" height="270" fill="#dcc192" opacity=".5"/>`;
  s += [...Array(12)].map((_, i) => `<rect x="${110 + i * 50}" y="276" width="30" height="26" fill="#f1dfb8" stroke="${OL}" stroke-width="2.6"/>`).join('');
  s += `<rect x="100" y="296" width="600" height="14" fill="#c99a5c" stroke="${OL}" stroke-width="2.4"/>`;
  s += [190, 300, 500, 610].map(x => column(x, 340, 560, 34)).join('');
  s += `<path d="M350,570 L350,420 A50,50 0 0 1 450,420 L450,570 Z" fill="#6b4a33" stroke="${OL}" stroke-width="3"/><path d="M400,372 L400,570" stroke="#4a3226" stroke-width="3"/>`;
  s += flag(140, 278, '#3f6fb5', .9) + flag(660, 278, '#3f6fb5', .9);
  return s;
}
SCENES.push({
  key: 'jonatas', title: 'Amigos para sempre', ref: '1 Samuel 18.1-4', tint: 'meadow',
  text: [
    'Jônatas, o filho do rei, ficou muito amigo de Davi.',
    'Ele deu a Davi a sua capa, a sua espada e o seu arco. E os dois prometeram ser amigos para sempre!'
  ],
  fact: 'Jônatas era príncipe, mas ficou feliz porque Deus escolheu Davi para ser rei.',
  hint: 'Toca nos dois amigos.',
  alt: 'No jardim do palácio, o príncipe Jônatas, de capa azul, sorri para Davi.',
  cue: [405, 540],
  art() {
    let s = bgDay({ sunX: 110, sunY: 120, sunR: 38 });
    s += hill([[-40, 450], [200, 420], [420, 440], [640, 416], [840, 432]], '#cfe2ae');
    s += palaceFacade();
    s += palm(70, 600, .85) + palm(745, 600, .8);
    s += `<rect x="-40" y="568" width="900" height="300" fill="#a9cf6c"/><path d="M300,568 L500,568 L620,820 L180,820 Z" fill="#e8d3a3"/>`;
    s += blob([[150, 590, 34], [196, 584, 28], [612, 586, 30], [656, 592, 34]], '#6f9e46', 3) + blob([[140, 578, 12], [640, 576, 12]], '#86b657', 0);
    s += flowerBand(121, 600, 640, 6, ['#e0473e', '#f2c14e', '#e86a9a']);
    s += `<g transform="translate(292,706) scale(1.06)">${cape('adult', '#2f62b0', 'capeJ')}</g>`;
    s += person(Object.assign({}, JONATAS, { x: 292, y: 706, s: 1.06, face: 'grin', look: .5, armor: `<g data-k="lapelsJ">${cloakFront(ADULT, { cloak: '#2f62b0' }, SW)}</g>`, backItems: `<g transform="translate(24,-150) rotate(12)">${ITEM.bow()}</g>`, extra: `<g transform="translate(-40,-112) rotate(168)">${ITEM.sword()}</g>`, armL: { a: 14 }, armR: { a: 22, b: 30 }, k: 'jonatas' }));
    s += `<g transform="translate(516,710) scale(1.32)">${cape('child', '#2f62b0', 'capeD', 0)}</g>`;
    s += davi({ x: 516, y: 710, s: 1.32, face: 'grin', look: -.5, armor: `<g data-k="lapelsD" opacity="0">${cloakFront(CHILD, { cloak: '#2f62b0' }, SW)}</g>`, armL: { a: 22, b: 30 }, armR: { a: 14 }, k: 'davi' });
    s += flowerBand(122, 740, 790, 6, ['#e0473e', '#ffffff', '#f2c14e']);
    return s;
  },
  setup(api) {
    const J = api.q('jonatas'), D = api.q('davi');
    const hug = async () => {
      if (api.st.busy) return; api.st.busy = true;
      if (!api.st.gave) {
        api.st.gave = true;
        api.snd('swish');
        api.anim(api.q('capeJ'), [{ transform: 'translate(0,0)', opacity: 1 }, { transform: 'translate(60px,-60px)', opacity: .6, offset: .5 }, { transform: 'translate(110px,-20px)', opacity: 0 }], { duration: 800, fill: 'forwards' });
        api.anim(api.q('capeD'), [{ transform: 'translate(-90px,-50px)', opacity: 0 }, { transform: 'translate(-40px,-50px)', opacity: .5, offset: .5 }, { transform: 'translate(0px,0px)', opacity: 1 }], { duration: 900, fill: 'forwards' });
        api.anim(api.q('lapelsJ'), [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
        api.anim(api.q('lapelsD'), [{ opacity: 0 }, { opacity: 0, offset: .5 }, { opacity: 1 }], { duration: 900, fill: 'forwards' });
        api.bubble(292, 400, 'Esta capa agora é tua!', { key: 'j' });
        await api.wait(1300);
      }
      api.snd('heart');
      await Promise.all([
        api.anim(api.act(J), [{ transform: 'translateX(0)' }, { transform: 'translateX(58px)', offset: .35 }, { transform: 'translateX(58px)', offset: .75 }, { transform: 'translateX(0)' }], { duration: 1700 }),
        api.anim(api.act(D), [{ transform: 'translateX(0)' }, { transform: 'translateX(-46px)', offset: .35 }, { transform: 'translateX(-46px)', offset: .75 }, { transform: 'translateX(0)' }], { duration: 1700 }),
        api.wait(500).then(() => { api.burst(408, 470, 'heart', 7); api.bubble(408, 420, 'Amigos para sempre!', { key: 'j', dur: 2200 }); })
      ]);
      api.st.busy = false;
    };
    api.tap(J, 'Jônatas', hug);
    api.tap(D, 'Davi', hug);
  }
});

/* =====================================================================
   13 — UM CORAÇÃO BONDOSO
   ===================================================================== */
SCENES.push({
  key: 'caverna', title: 'Um coração bondoso', ref: '1 Samuel 24.1-12', tint: 'dusk',
  text: [
    'Mas o rei Saul ficou com ciúmes e começou a perseguir Davi.',
    'Um dia, Saul entrou numa caverna. E Davi estava escondido lá dentro! Davi podia fazer mal ao rei, mas não fez. Só lhe cortou um pedacinho da capa.',
    'Davi escolheu ser bondoso.'
  ],
  fact: 'Davi foi bom até para quem era mau para ele.', factLabel: 'Para pensar',
  hint: 'Toca no Davi.',
  alt: 'Dentro de uma caverna escura, Davi anda em bicos de pés atrás do rei Saul, que está de costas na entrada iluminada.',
  cue: [236, 560],
  art() {
    let s = sky('sky', [[0, '#8fd0f0'], [.6, '#eaf6f2'], [1, '#f7ecce']]);
    s += sun(700, 260, 34, { face: false });
    s += hill([[440, 520], [560, 488], [680, 500], [840, 480]], '#bcd38a') + hill([[440, 590], [600, 560], [840, 572]], '#a6c46e');
    s += `<defs>${rg('cave', [[0, '#5a4a5c'], [.6, '#3a2f40'], [1, '#2a2230']], .85, .55, .8)}${lg('ray', [[0, '#fff3c4', .45], [1, '#fff3c4', 0]], 0, 0, 1, 0)}</defs>`;
    s += `<path fill-rule="evenodd" d="M-40,-40 L860,-40 L860,860 L-40,860 Z M478,712 C462,590 474,420 548,330 C600,262 700,236 780,268 C820,284 850,300 860,310 L860,712 Z" fill="${UR('cave')}"/>`;
    s += `<path d="M478,712 C462,590 474,420 548,330 C600,262 700,236 780,268 C820,284 850,300 860,310" fill="none" stroke="#6e5a6e" stroke-width="18" stroke-linecap="round"/>`;
    s += `<path d="M560,340 L120,560 L140,712 L520,712 Z" fill="${UR('ray')}" opacity=".55"/><path d="M600,300 L40,420 L60,500 L560,420 Z" fill="${UR('ray')}" opacity=".35"/>`;
    s += [[60, -40, 50, 130], [150, -40, 36, 96], [260, -40, 44, 120], [360, -40, 30, 80], [440, -40, 40, 140]].map(([x, y, w, h]) => `<path d="M${x - w / 2},${y} L${x},${y + h} L${x + w / 2},${y} Z" fill="#4a3d4e"/>`).join('');
    s += blob([[40, 300, 60], [120, 240, 50], [20, 420, 50]], '#3f3346', 0) + blob([[740, 760, 70], [620, 790, 60]], '#3f3346', 0);
    s += `<rect x="-40" y="700" width="900" height="200" fill="#352a3a"/>`;
    for (const [x, y] of [[92, 520], [148, 548]]) s += `<g transform="translate(${x},${y})"><g class="eyes" style="${dl(5)}"><ellipse cx="-7" cy="0" rx="4" ry="5" fill="#fff6c8"/><ellipse cx="7" cy="0" rx="4" ry="5" fill="#fff6c8"/><circle cx="-6" cy="1" r="2" fill="#2a2230"/><circle cx="8" cy="1" r="2" fill="#2a2230"/></g></g>`;
    const capeP = `M-38,-178 Q-44,-188 -26,-190 L26,-190 Q44,-188 38,-178 L56,-6 Q0,6 -56,-6 Z`;
    const saulCape = `${op(capeP, '#9b2a33')}<path d="M-30,-170 Q-36,-90 -44,-12 M0,-180 L0,-8 M30,-170 Q36,-90 44,-12" stroke="#7a1f28" stroke-width="3" fill="none" opacity=".7"/><path d="M-56,-6 Q0,6 56,-6" stroke="#f2c14e" stroke-width="5" fill="none"/>`;
    s += `<g transform="translate(626,706)"><path d="M-54,-6 C-120,-4 -170,0 -206,8 L-200,-10 C-160,-18 -110,-22 -56,-22 Z" fill="#9b2a33" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g data-k="corner"><path d="M-206,8 L-200,-10 L-176,-15 L-180,6 Z" fill="#9b2a33" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/></g></g>`;
    s += person(Object.assign({}, SAUL, { x: 626, y: 706, s: 1.0, back: true, cloak: null, extra: saulCape, armL: { a: 8 }, armR: { a: 8 }, k: 'saul' }));
    const DA = { a: -16, b: -148 };
    s += davi({ x: 236, y: 706, s: 1.14, legs: 'tiptoe', face: 'determined', look: .7, armL: DA, armR: { a: 40, b: 30 }, k: 'davi', extra: `<g transform="translate(${r1(handPos('child', 1, { a: 40, b: 30 })[0])},${r1(handPos('child', 1, { a: 40, b: 30 })[1])})"><g data-k="piece" opacity="0">${ITEM.cloth('#9b2a33')}</g></g>` });
    return s;
  },
  setup(api) {
    const D = api.q('davi');
    api.tap(D, 'Davi', async () => {
      if (api.st.busy) return; api.st.busy = true;
      if (!api.st.cut) {
        api.snd('tiptoe');
        const steps = [];
        for (let i = 0; i <= 6; i++) steps.push({ transform: `translate(${i * 32 / 1.14}px,${i % 2 ? -8 : 0}px)` });
        await api.anim(api.act(D), steps, { duration: 1300, easing: 'linear', fill: 'forwards' });
        api.snd('snip');
        await api.anim(api.q('corner'), [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
        api.q('piece').style.opacity = 1;
        await api.wait(300);
        const back = [];
        for (let i = 6; i >= 0; i--) back.push({ transform: `translate(${i * 32 / 1.14}px,${i % 2 ? -8 : 0}px)` });
        api.snd('tiptoe');
        await api.anim(api.act(D), back, { duration: 1200, easing: 'linear', fill: 'forwards' });
        api.st.cut = true;
      }
      api.bubble(236, 440, 'Não vou fazer mal ao rei.', { key: 'd', dur: 2600 });
      api.burst(236, 470, 'heart', 4);
      api.st.busy = false;
    });
    api.tap(api.q('saul'), 'Rei Saul', () => { api.snd('hm'); api.bubble(626, 420, 'Hum... onde está Davi?', { key: 's' }); });
  }
});

/* =====================================================================
   14 — VIVA O REI DAVI!
   ===================================================================== */
function jerusalem() {
  let s = '';
  const crenel = (x0, x1, y) => { let c = ''; for (let x = x0; x < x1; x += 34) c += `<rect x="${x}" y="${y - 20}" width="20" height="22" fill="#ead3a2" stroke="${OL}" stroke-width="2.4"/>`; return c; };
  s += crenel(-40, 840, 392) + `<rect x="-40" y="390" width="900" height="180" fill="#e6cd99" stroke="${OL}" stroke-width="2.6"/>`;
  let st = '';
  for (let r = 0; r < 6; r++) for (let x = -40 + (r % 2 ? 26 : 0); x < 840; x += 52) st += `<rect x="${x}" y="${398 + r * 28}" width="48" height="24" rx="3" fill="#dcc08a"/>`;
  s += `<g opacity=".7">${st}</g>`;
  for (const x of [120, 680]) s += crenel(x - 60, x + 60, 300) + `<rect x="${x - 62}" y="298" width="124" height="272" fill="#efd9a8" stroke="${OL}" stroke-width="2.6"/><rect x="${x - 12}" y="340" width="24" height="40" rx="12" fill="#5a3a26"/>` + flag(x, 280, '#3f6fb5', 1);
  s += `<path d="M320,570 L320,470 A80,80 0 0 1 480,470 L480,570 Z" fill="#5a3a26" stroke="${OL}" stroke-width="3"/><path d="M336,570 L336,472 A64,64 0 0 1 464,472 L464,570" fill="none" stroke="#7a5236" stroke-width="5"/>`;
  return s;
}
function ark(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">${limb(-110, 0, 110, 0, 8, '#c9933c')}<rect x="-54" y="-44" width="108" height="56" rx="4" fill="#f2c14e" stroke="${OL}" stroke-width="3"/><rect x="-46" y="-36" width="92" height="40" rx="3" fill="none" stroke="#d99a1c" stroke-width="3"/><rect x="-60" y="-54" width="120" height="12" rx="3" fill="#f6d36a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 46},-54 C${k * 40},-92 ${k * 14},-106 ${k * 4},-84 C${k * 18},-80 ${k * 28},-70 ${k * 30},-54 Z" fill="#f6d36a" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`).join('')}</g>`;
}
SCENES.push({
  key: 'rei-davi', title: 'Viva o rei Davi!', ref: '2 Samuel 5.3-4; 6.12-15', tint: 'sky',
  text: [
    'Os anos passaram, e Davi tornou-se rei!',
    'O povo fez uma festa, com trombetas e muita música.',
    'E Davi dançou de alegria para Deus, com todas as suas forças!'
  ],
  fact: 'Davi foi rei durante quarenta anos!',
  hint: 'Toca no Davi e nas trombetas.',
  alt: 'Diante das muralhas de Jerusalém, o rei Davi dança de alegria; homens tocam trombetas e o povo bate palmas enquanto a arca chega.',
  cue: [400, 520],
  art() {
    let s = bgDay({ sunX: 110, sunY: 120, sunR: 40 });
    s += jerusalem();
    s += `<rect x="-40" y="568" width="900" height="300" fill="#e6cf9a"/><path d="M300,568 L500,568 L640,820 L160,820 Z" fill="#efdcae"/>`;
    s += person(Object.assign({}, { kind: 'adult', skin: '#d79a68', head: 'cloth', clothCol: '#f4efe6', tunic: '#f4efe6', beard: 'short', hair: '#3a2820', belt: '#3f6fb5' }, { x: 548, y: 600, s: .52, face: 'joy', armL: { a: 168 }, armR: { a: 168 } }));
    s += person(Object.assign({}, { kind: 'adult', skin: '#c98a5a', head: 'cloth', clothCol: '#f4efe6', tunic: '#f4efe6', beard: 'short', hair: '#2b1d17', belt: '#3f6fb5' }, { x: 676, y: 600, s: .52, face: 'joy', armL: { a: 168 }, armR: { a: 168 } }));
    s += ark(612, 474, .9);
    const sh = (x, y, sc, i) => person({ kind: 'adult', x, y, s: sc, skin: ['#d99a6c', '#c98a5a'][i], head: 'cloth', clothCol: ['#e9dcc0', '#d9e4f0'][i], clothStripe: ['#b5402f', '#3f6fb5'][i], beard: 'short', hair: '#2b1d17', tunic: ['#8b6a4a', '#5d6d8a'][i], face: 'o', look: .4, armL: { a: -40, b: -100 }, armR: { a: -10, b: -120 }, extra: `<g transform="translate(14,-214)"><g data-k="horn${i}"><g transform="rotate(-6)">${ITEM.shofar()}</g></g></g>`, k: 'tr' + i });
    s += sh(214, 690, .76, 1) + sh(110, 706, .8, 0);
    s += davi({ x: 400, y: 706, s: 1.26, head: 'crown', tunic: '#f4efe6', trim: '#3f6fb5', belt: '#3f6fb5', face: 'joy', legs: 'hop', armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'davi' });
    const clap = (x, y, sc, o) => person(Object.assign({ kind: 'adult', x, y, s: sc, face: 'joy', look: -.4, armL: { a: -36, b: -96 }, armR: { a: -36, b: -96 }, cls: 'breath' }, o));
    s += clap(640, 704, .78, { skin: '#e2a878', head: 'scarf', clothCol: '#d9643f', hairStyle: 'long', hair: '#2b1d17', tunic: '#3d7fb0', k: 'p1' });
    s += clap(712, 690, .72, { skin: '#b9784c', hair: '#2b1d17', beard: 'short', tunic: '#6f8f3a', k: 'p2' });
    const R = rng(14);
    for (let i = 0; i < 12; i++) s += `<g transform="translate(${r1(R() * 800)},${r1(-20 - R() * 60)})"><g class="petal" style="--d:${(6 + R() * 5).toFixed(1)}s;--dx:${r1(-40 + R() * 80)}px;${dl(10)}"><ellipse rx="6" ry="3.6" fill="${['#e0473e', '#f2c14e', '#ffffff', '#e86a9a'][i % 4]}"/></g></g>`;
    return s;
  },
  setup(api) {
    const D = api.q('davi');
    api.tap(D, 'Rei Davi', async () => {
      if (api.st.busy) return; api.st.busy = true;
      api.snd('drum');
      api.burst(400, 460, 'note', 4);
      api.burst(400, 360, 'confetti', 18);
      await api.anim(api.act(D), [
        { transform: 'translateY(0) rotate(0deg) scaleX(1)' },
        { transform: 'translateY(-34px) rotate(-8deg) scaleX(1)', offset: .2 },
        { transform: 'translateY(0) rotate(0deg) scaleX(1)', offset: .35 },
        { transform: 'translateY(-20px) rotate(0deg) scaleX(-1)', offset: .55 },
        { transform: 'translateY(0) rotate(0deg) scaleX(-1)', offset: .7 },
        { transform: 'translateY(-30px) rotate(8deg) scaleX(1)', offset: .85 },
        { transform: 'translateY(0) rotate(0deg) scaleX(1)' }
      ], { duration: 1600, easing: 'ease-in-out' });
      api.st.busy = false;
    });
    for (const i of [0, 1]) api.tap(api.q('tr' + i), 'Trombeta', () => {
      api.snd('fanfare', i);
      const [x, y, s] = api.pos(api.q('tr' + i));
      api.burst(x + 78 * s, y - 262 * s, 'wave', 3);
    });
    for (const k of ['p1', 'p2']) api.tap(api.q(k), 'Povo a festejar', () => { api.snd('clap'); api.hop(api.q(k), 16); api.bubble(api.pos(api.q(k))[0], 450, 'Viva o rei!', { key: k, size: 26 }); });
  }
});

/* =====================================================================
   15 — O SENHOR É O MEU PASTOR
   ===================================================================== */
SCENES.push({
  key: 'pastor', title: 'O Senhor é o meu pastor', ref: 'Salmo 23.1', tint: 'gold',
  text: [
    'Davi fez uma canção muito bonita. Começa assim:',
    { q: 'O Senhor é o meu pastor. Nada me vai faltar.', who: 'davi' },
    'Davi cuidava das ovelhas com carinho. Assim também Deus cuida de ti!'
  ],
  fact: 'Jesus nasceu da família de Davi. E Jesus disse: «Eu sou o bom pastor.»',
  hint: 'Toca na ovelhinha e no sol.',
  alt: 'Ao pôr do sol, Davi está sentado debaixo de uma árvore com uma ovelhinha ao colo, perto de águas tranquilas e de ovelhas a descansar.',
  cue: [282, 580],
  art() {
    let s = sky('sky', [[0, '#f4a978'], [.35, '#fbd39c'], [.58, '#fff0cf'], [1, '#fff0cf']]);
    s += sun(590, 448, 58, { fill: '#ffc24a', fill2: '#ffd86e', glow: '#ffe7a8', k: 'sun' });
    s += hitC(590, 430, 70).replace('class="hit"', 'class="hit" data-k="sunhit"');
    s += cloud(160, 140, .85, { fill: '#fff4e4', shade: '#f6cfae' }) + cloud(680, 130, .65, { fill: '#fff4e4', shade: '#f6cfae', dx: -30 });
    s += bird(320, 260, .9, { col: '#5b4256' }) + bird(360, 285, .7, { col: '#5b4256', d: 10 });
    s += `<g transform="translate(400,232)"><g data-k="psalm" opacity="0"><text text-anchor="middle" class="psalm" font-size="52" y="0">${tr('O Senhor é o meu pastor;')}</text><text text-anchor="middle" class="psalm" font-size="52" y="62">${tr('nada me faltará.')}</text></g></g>`;
    s += hill([[-40, 470], [160, 446], [360, 462], [560, 440], [840, 458]], '#d9c49a');
    s += `<defs>${lg('lake', [[0, '#ffd9a3'], [1, '#9fd2e4']])}</defs><path d="M-40,478 C200,468 600,466 840,478 L840,560 C600,572 200,572 -40,560 Z" fill="${UR('lake')}"/>`;
    s += [[480, 500, 90], [600, 516, 70], [520, 532, 110], [640, 548, 60]].map(([x, y, w], i) => `<path class="shine" style="${dl(3)}" d="M${x - w / 2},${y} L${x + w / 2},${y}" stroke="#fff6dc" stroke-width="5" stroke-linecap="round"/>`).join('');
    s += `<g data-k="lakehit">${hitC(560, 520, 60)}</g>`;
    s += hill([[-40, 556], [200, 548], [420, 566], [640, 546], [840, 560]], '#a7cf6a') + hill([[-40, 640], [260, 620], [520, 640], [840, 618]], '#94c45e');
    s += olive(150, 712, 2.2, { leaf: '#86a85e', dark: '#6b8a4c', hi: '#a5c27c' });
    s += sheep({ x: 452, y: 698, s: .8, pose: 'lie', k: 'r1' }) + sheep({ x: 704, y: 652, s: .68, pose: 'lie', flip: true, face: '#f1d2bb', k: 'r3' });
    const lamb = `<g transform="translate(-4,-58)"><g data-k="lamb">${sheep({ x: 0, y: 30, s: .46, face: '#f1d2bb', flip: true })}</g></g>`;
    s += davi({ x: 286, y: 710, s: 1.32, legs: 'sit', face: 'smile', look: .2, front: lamb, armL: { a: -28, b: -72 }, armR: { a: -28, b: -72 }, k: 'davi' });
    s += sheep({ x: 588, y: 714, s: .86, pose: 'sleep', flip: true, k: 'r2' });
    for (const [x, y, c, i] of [[420, 600, '#e86a9a', 0], [640, 610, '#7fb4e8', 1]]) s += `<g transform="translate(${x},${y})"><g class="wander" style="--d:${10 + i * 3}s;${dl(8)}"><g class="flutter" style="${dl(1)}"><path d="M0,0 C-14,-18 -24,-4 -10,4 C-20,10 -10,20 0,6 C10,20 20,10 10,4 C24,-4 14,-18 0,0 Z" fill="${c}" stroke="${OL}" stroke-width="1.8"/></g></g></g>`;
    s += flowerBand(151, 730, 790, 8, ['#ffffff', '#f2c14e', '#e0473e']);
    return s;
  },
  setup(api) {
    const lamb = api.q('lamb');
    api.tap(api.q('davi'), 'Ovelhinha ao colo de Davi', () => {
      api.snd('bleat', 1.4);
      api.anim(lamb, [{ transform: 'translateY(0)' }, { transform: 'translateY(-8px)' }, { transform: 'translateY(0)' }], { duration: 400 });
      api.burst(286, 500, 'heart', 5);
    });
    const showPsalm = () => {
      api.snd('anoint');
      api.anim(api.q('psalm'), [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 900, fill: 'forwards' });
      api.burst(590, 430, 'spark', 12, { col: '#fff1b0' });
    };
    api.tap(api.q('sun'), 'Sol', showPsalm);
    api.tap(api.q('sunhit'), 'Sol', showPsalm);
    api.tap(api.q('lakehit'), 'Águas tranquilas', () => { api.snd('plip'); api.burst(560, 520, 'ripple', 3); });
    for (const k of ['r1', 'r2', 'r3']) api.tap(api.q(k), 'Ovelha a descansar', () => { const [x, y, s] = api.pos(api.q(k)); api.snd('bleat', .9 + Math.random() * .2); api.burst(x, y - 60 * s, 'heart', 2); });
  }
});

/* =====================================================================
   16 — FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite tranquila sobre Belém: uma ovelhinha dorme ao lado da harpa e do cajado de Davi.',
  cue: [560, 170],
  questions: [
    ['De que é que Davi cuidava quando era menino?', 'Das ovelhas.'],
    ['Deus olha para a aparência ou para o coração?', 'Para o coração!'],
    ['Quantas pedras apanhou Davi no ribeiro?', 'Cinco.'],
    ['Quem ajudou Davi a vencer o gigante?', 'Deus!'],
    ['Quando tiveres medo, o que podes fazer?', 'Orar e confiar em Deus, como Davi.']
  ],
  verse: ['As pessoas olham para a aparência, mas o Senhor olha para o coração.', '1 Samuel 16.7'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.5, '#262f6c'], [.7, '#3a4889'], [1, '#3a4889']]);
    s += starField(16, 90, 0, 0, 800, 480, { big: .1 });
    s += moon(660, 140, 36);
    s += `<g transform="translate(0,0)"><g class="shooting"><path d="M0,0 L-90,30" stroke="url(#${P}-shoot)" stroke-width="4" stroke-linecap="round"/><circle r="4" fill="#fff"/></g></g><defs>${lg('shoot', [[0, '#ffffff', 1], [1, '#ffffff', 0]], 1, 0)}</defs>`;
    const BIG = [[180, 160], [300, 110], [430, 170], [560, 100], [250, 280]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += `<text x="400" y="380" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 470], [140, 440], [330, 462], [520, 432], [700, 452], [840, 440]], '#2b416c');
    s += town(520, 390, .62, { wall: '#4a5582', shade: '#3c456e', roof: '#57628f', winCol: '#ffd66b', doorCol: '#2b304f', sw: 2 });
    s += hill([[-40, 560], [200, 532], [420, 552], [640, 526], [840, 546]], '#244a5b');
    s += hill([[-40, 640], [240, 618], [480, 634], [720, 612], [840, 624]], '#2c584f');
    s += rock(430, 706, 170, 70, { fill: '#7c7a8c', shade: '#5f5c70', hi: '#9a98aa' });
    s += `<g transform="translate(372,690) rotate(-14) scale(1.3)">${ITEM.lyre(54, 70, 'lyre')}</g>`;
    s += `<g transform="translate(520,700) rotate(16)">${ITEM.staff(190, -1)}</g>`;
    s += sheep({ x: 430, y: 742, s: .9, pose: 'sleep', k: 'lamb', wool: '#e9ecf6' });
    for (let i = 0; i < 8; i++) s += `<circle class="firefly" style="--d:${(4 + i % 4).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;--dy:${-16 - i * 3}px;${dl(6)}" cx="${60 + i * 95}" cy="${600 + (i % 3) * 22}" r="3" fill="#f6f39a"/>`;
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
    api.tap(api.q('lamb'), 'Ovelhinha a dormir', () => { api.snd('snore'); api.bubble(470, 640, 'Zzz...', { key: 'l', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'davi',
  title: 'Davi, o Pastorzinho',
  cover: { kicker: 'Uma história da Bíblia', title: 'Davi,', small: 'o Pastorzinho', sub: 'O menino que confiou em Deus' },
  color: '#253273',
  ref: '1 Samuel 16 a 2 Samuel 6',
  scenes: SCENES
});
})();
