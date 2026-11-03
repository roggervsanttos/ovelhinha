/* =====================================================================
   LIVRO: DANIEL NA COVA DOS LEÕES  (Daniel 6)
   ===================================================================== */
(() => {
const SCENES = [];
const DANIEL = { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', hairStyle: 'short', beard: 'short', beardCol: '#2b1d17', tunic: '#5872b8', stripes: '#9cb0e0', cloak: '#e9c46a', cloakTrim: '#f2c14e', belt: '#f2c14e' };
const REI = { kind: 'adult', skin: '#d99a6c', hair: '#3a2520', beard: 'long', beardCol: '#3a2520', head: 'crown', tunic: '#7b4c93', cloak: '#4e2a6a', cloakTrim: '#f2c14e', trim: '#f2c14e', longSleeves: true, belt: '#f2c14e' };
const INVEJOSOS = [
  { kind: 'adult', skin: '#d39463', hair: '#1f1612', beard: 'short', beardCol: '#1f1612', head: 'cloth', clothCol: '#2f6db5', bandCol: '#f2c14e', tunic: '#b8312f', belt: '#f2c14e' },
  { kind: 'adult', skin: '#c98a5a', hair: '#3a2520', beard: 'long', beardCol: '#3a2520', head: 'cloth', clothCol: '#e9c46a', bandCol: '#8e3b2f', tunic: '#5e7d4a', belt: '#e9c46a' },
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'bushy', beardCol: '#1f1612', tunic: '#8a5fc2', belt: '#f2c14e' }
];
const GUARDA = { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', head: 'helmetI', tunic: '#a8875a', belt: '#7b4a2a', shoe: '#6b4a33' };
const POVO = [
  { kind: 'adult', skin: '#c98a5a', hair: '#2b1d17', beard: 'short', tunic: '#8e3b4f', belt: '#f2c14e', head: 'cloth', clothCol: '#e9c46a' },
  { kind: 'child', skin: '#d39463', hairStyle: 'curly', hair: '#2b1d17', hi: '#5a3020', tunic: '#e86a9a', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#e2a878', head: 'scarf', clothCol: '#5872b8', hairStyle: 'long', hair: '#3a2520', tunic: '#f4efe6', belt: '#5872b8' },
  { kind: 'child', skin: '#e2a878', hairStyle: 'short', hair: '#5a3020', tunic: '#3f93c7', belt: '#7b4a2a' },
  { kind: 'adult', skin: '#b9784c', hair: '#1f1612', beard: 'bushy', beardCol: '#1f1612', head: 'cloth', clothCol: '#5e7d4a', bandCol: '#f2c14e', tunic: '#e9c46a', belt: '#7b4a2a' }
];
const ANJO = { kind: 'adult', skin: '#f0c49c', hairStyle: 'curly', hair: '#e9b23a', hi: '#ffe08a', tunic: '#fffdf6', longSleeves: true, belt: '#f2c14e', legs: 'none', hemY: -4, hemW: 50, trim: '#f2c14e' };
const daniel = o => person(Object.assign({}, DANIEL, o));
const rei = o => person(Object.assign({}, REI, o));

/* ---------- peças desta história ---------- */
function wings(sc = 1) {
  const w = s => `<path transform="scale(${s},1)" d="M10,-176 C40,-210 110,-228 130,-190 C140,-172 128,-156 112,-150 C128,-140 130,-120 114,-108 C126,-96 120,-78 102,-74 C80,-70 40,-100 10,-140 Z" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path transform="scale(${s},1)" d="M40,-176 C70,-190 100,-196 112,-184 M44,-156 C76,-162 100,-162 110,-150 M48,-134 C76,-136 96,-130 104,-116" stroke="#dfe6f2" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="scale(${sc})"><g class="flapw2" style="${dl(2)}">${w(1)}</g><g class="flapw2" style="${dl(2)}">${w(-1)}</g></g>`;
}
function anjo(o) {
  return person(Object.assign({}, ANJO, { backItems: `<circle cx="0" cy="-120" r="150" fill="${UR('aglow')}"/>` + wings(1), cls: 'hover' }, o));
}
const glowDefs = () => `<defs>${rg('aglow', [[0, '#fff6c8', .95], [.55, '#ffe28a', .35], [1, '#ffe28a', 0]])}${rg('luzc', [[0, '#fff6c8', .85], [.6, '#ffe28a', .25], [1, '#ffe28a', 0]])}</defs>`;
// leão de boca aberta (rugindo) ou de boca fechada
function leao(o) {
  let s = lion(Object.assign({ lamb: false }, o));
  if (o.roar) s = s.replace(`<path d="M74,-66 q6,4 12,-2" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`, `<path d="M67,-70 Q79,-34 97,-68 Z" fill="#8c2f39" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M71,-68 l3.5,7 l3.5,-7 M86,-68 l3.5,7 l3.5,-7" fill="#fffaf0" stroke="${OL}" stroke-width="1.4"/><ellipse cx="82" cy="-50" rx="7" ry="4" fill="#e86a7a"/>`);
  return s;
}
function persianHall(o = {}) {
  const fy = o.floor ?? 600;
  let s = `<defs>${lg('salao', [[0, '#e9d7b4'], [1, '#d6bf92']])}</defs><rect x="-40" y="-40" width="900" height="${fy + 40}" fill="${UR('salao')}"/>`;
  s += `<rect x="-40" y="-40" width="900" height="90" fill="#2f5fa8"/><g fill="#f2c14e">${[...Array(14)].map((_, i) => `<path d="${sparkle(10)}" transform="translate(${-10 + i * 62},10)"/>`).join('')}</g><rect x="-40" y="48" width="900" height="12" fill="#c9a54e"/>`;
  s += `<g opacity=".6">${[...Array(9)].map((_, i) => `<rect x="${-20 + i * 100}" y="${fy - 90}" width="70" height="60" rx="6" fill="#5b8fd1"/>`).join('')}</g>`;
  const col = x => `<rect x="${x - 22}" y="120" width="44" height="${fy - 120}" fill="#f4ead2" stroke="${OL}" stroke-width="3"/><g stroke="#c9b48a" stroke-width="3">${[-8, 0, 8].map(d => `<path d="M${x + d},130 L${x + d},${fy - 10}"/>`).join('')}</g><path d="M${x - 46},120 C${x - 46},92 ${x - 20},86 ${x},100 C${x + 20},86 ${x + 46},92 ${x + 46},120 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3"/><rect x="${x - 30}" y="${fy - 18}" width="60" height="18" fill="#e6d6b0" stroke="${OL}" stroke-width="2.6"/>`;
  for (const x of o.cols || [90, 710]) s += col(x);
  s += `<rect x="-40" y="${fy}" width="900" height="${900 - fy}" fill="#c9a873"/><path d="M-40,${fy} L840,${fy}" stroke="${OL}" stroke-width="4"/>`;
  s += `<g opacity=".35" stroke="#9a7a4a" stroke-width="3">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${400 + (i - 3) * 70},${fy} L${400 + (i - 3) * 190},900"/>`).join('')}</g>`;
  return s;
}
function throne(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,-60 L-60,-230 Q0,-260 60,-230 L60,-60 Z" fill="#c9a54e" stroke="${OL}" stroke-width="3.4"/><path d="M-44,-80 L-44,-214 Q0,-236 44,-214 L44,-80 Z" fill="#7b4c93"/><g fill="#f2c14e">${[-26, 0, 26].map(dx => `<path d="${sparkle(8)}" transform="translate(${dx},-180)"/>`).join('')}</g><rect x="-80" y="-96" width="160" height="26" rx="6" fill="#d9a33a" stroke="${OL}" stroke-width="3"/>${[-1, 1].map(k => `<path d="M${k * 66},-72 L${k * 70},-6 L${k * 56},0 L${k * 52},-72 Z" fill="#d9a33a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`;
}
function scrollBig(x, y, s = 1, k = '', o = {}) {
  let g = `<rect x="-70" y="-90" width="140" height="170" fill="#f6ead0" stroke="${OL}" stroke-width="3.4"/><g stroke="#b9a37c" stroke-width="3" stroke-linecap="round">${[-60, -40, -20, 0, 20].map(y2 => `<path d="M-50,${y2} L50,${y2}"/>`).join('')}</g>`;
  g += limb(-78, -100, 78, -100, 12, '#a46e3c', 3) + limb(-78, 90, 78, 90, 12, '#a46e3c', 3);
  g += `<g data-k="${k}selo" opacity="${o.selo ? 1 : 0}"><circle cx="34" cy="50" r="20" fill="#c0392b" stroke="${OL}" stroke-width="3"/><path d="${sparkle(10)}" transform="translate(34,50)" fill="#f2c14e"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"${k ? ` data-k="${k}"` : ''}><g class="act">${g}${k ? hitC(0, 0, 90) : ''}</g></g>`;
}
function houseWindow() {
  let s = `<rect x="118" y="150" width="524" height="468" fill="#e9d2a8" stroke="${OL}" stroke-width="5"/><rect x="96" y="118" width="568" height="40" rx="6" fill="#d9bd88" stroke="${OL}" stroke-width="4"/>`;
  for (const x of [186, 516]) s += `<g transform="translate(${x},262)"><rect x="0" y="0" width="58" height="200" rx="4" fill="#5e8fc7" stroke="${OL}" stroke-width="4"/>${[28, 66, 104, 142, 180].map(y => `<path d="M9,${y} L49,${y}" stroke="#3f6ea8" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`;
  s += `<path d="M248,470 L248,330 A132,132 0 0 1 512,330 L512,470 Z" fill="#6a4e3a" stroke="${OL}" stroke-width="5"/>`;
  return s;
}
function tears(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="#7fc4e8" stroke="${OL}" stroke-width="1.6" style="pointer-events:none">${[[-12, 0], [12, 4]].map(([a, b]) => `<path d="M${a},${b - 6} C${a + 4},${b} ${a + 4},${b + 4} ${a},${b + 6} C${a - 4},${b + 4} ${a - 4},${b} ${a},${b - 6} Z"/>`).join('')}</g>`;
}
function trumpet(len = 110) {
  return `<g><path d="M0,0 L${len},-10 L${len + 26},-26 L${len + 26},12 L${len},2 L0,6 Z" fill="#f2c14e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M14,-4 L${len - 6},-12" stroke="#fff3c4" stroke-width="3" stroke-linecap="round"/></g>`;
}
function den(o = {}) {
  let s = `<defs>${lg('cova', [[0, '#5a4e5e'], [1, '#3a3240']])}</defs><rect x="-40" y="-40" width="900" height="900" fill="${UR('cova')}"/>`;
  s += `<path d="M-40,-40 L300,-40 C300,40 260,80 230,140 C200,220 120,240 60,300 C20,340 -10,420 -40,470 Z" fill="#4a404e" stroke="${OL}" stroke-width="4"/><path d="M840,-40 L500,-40 C500,40 540,80 570,140 C600,220 680,240 740,300 C780,340 810,420 840,470 Z" fill="#4a404e" stroke="${OL}" stroke-width="4"/>`;
  s += `<g data-k="fresta" opacity="${o.open ? 1 : .6}" style="pointer-events:none"><path d="M330,-40 L470,-40 L620,640 L180,640 Z" fill="#fff3c4" opacity="${o.open ? .45 : .12}"/></g>`;
  s += o.open ? '' : `<g transform="translate(400,-30)"><ellipse rx="150" ry="60" fill="#8f8a9c" stroke="${OL}" stroke-width="5"/><path d="M-90,-10 Q-20,-40 60,-20" stroke="#aaa5b6" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  s += `<g fill="#3a3240" opacity=".8">${[[120, 520, 60], [700, 500, 50], [220, 600, 30], [600, 590, 36]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.6}" ry="${r * .6}"/>`).join('')}</g>`;
  s += `<rect x="-40" y="620" width="900" height="300" fill="#5e5464"/><path d="M-40,620 C200,600 600,640 840,616" stroke="${OL}" stroke-width="4" fill="none"/>`;
  s += `<g fill="#7a6e7e" stroke="${OL}" stroke-width="2.4">${[[80, 660, 22], [180, 700, 14], [620, 690, 18], [730, 668, 24]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.4}" ry="${r * .7}"/>`).join('')}</g>`;
  return s;
}
function denTop(o = {}) {
  let s = bgDay(Object.assign({ sunX: 660, sunY: 120, sunR: 42 }, o.day || {}));
  s += hill([[-40, 470], [200, 450], [420, 462], [640, 440], [840, 454]], '#c9d98a');
  s += `<rect x="-40" y="480" width="900" height="420" fill="#d8c79a"/>`;
  s += `<ellipse cx="400" cy="620" rx="210" ry="70" fill="#3a3240" stroke="${OL}" stroke-width="5"/><path d="M190,620 Q400,700 610,620" stroke="#8f8a9c" stroke-width="12" fill="none"/>`;
  return s;
}

/* =====================================================================
   0 — CAPA
   ===================================================================== */
SCENES.push({
  key: 'capa', cover: true, vb: [800, 1100], par: 'xMidYMax slice',
  title: 'Daniel na Cova dos Leões',
  alt: 'Desenho em corte do chão: lá em baixo, numa caverna, Daniel sorri tranquilo entre leões mansinhos. Um leão dorme e o outro recebe festas na juba. Uma luz dourada desce pela abertura da cova.',
  cue: [580, 960],
  art() {
    let s = sky('sky', [[0, '#8fd0f2'], [.38, '#cfe8f6'], [.54, '#f6e7c8'], [1, '#f6e7c8']], 1100) + glowDefs();
    s += `<defs>${lg('terra', [[0, '#c9955e'], [1, '#93623a']])}${lg('covai', [[0, '#62546e'], [1, '#43384e']])}</defs>`;
    s += cloud(150, 210, .9) + cloud(650, 150, .7, { dx: -30, d: 20 });
    s += hill([[-40, 606], [180, 578], [400, 596], [620, 570], [840, 590]], '#c5d78c');
    s += palm(96, 640, .92) + palm(712, 640, .8);
    // a terra em corte
    s += `<rect x="-40" y="626" width="900" height="520" fill="${UR('terra')}"/><rect x="-40" y="612" width="900" height="22" fill="#e8d4a2"/><path d="M-40,634 L840,634" stroke="${OL}" stroke-width="4"/>`;
    s += `<g fill="#7a4e2c" opacity=".55">${[[24, 700, 16], [170, 668, 11], [626, 676, 13], [770, 716, 17], [14, 900, 13], [784, 960, 14], [250, 1086, 15], [560, 1088, 12]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.5}" ry="${r}"/>`).join('')}</g>`;
    // a caverna e a abertura no alto
    s += `<path d="M346,612 L346,716 C206,716 62,762 52,880 C44,980 62,1046 122,1062 L678,1062 C738,1046 756,980 748,880 C738,762 594,716 454,716 L454,612 Z" fill="${UR('covai')}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
    s += `<path d="M90,1010 C260,994 540,994 710,1010 L690,1060 L110,1060 Z" fill="#6f6278"/>`;
    s += `<path d="M346,612 L454,612 L640,1060 L160,1060 Z" fill="#fff3c4" opacity=".3"/><circle cx="400" cy="900" r="250" fill="${UR('luzc')}"/>`;
    s += `<g transform="translate(560,606)"><ellipse rx="78" ry="26" fill="#8f8a9c" stroke="${OL}" stroke-width="4.4"/><path d="M-46,-8 Q0,-22 40,-12" stroke="#aaa5b6" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
    s += leao({ x: 176, y: 1046, s: .9, sleep: true, k: 'l0' });
    s += leao({ x: 600, y: 1042, s: .96, flip: true, k: 'l1' });
    s += daniel({ x: 400, y: 1048, s: 1.08, face: 'joy', look: .3, armL: { a: 30, b: 30 }, armR: { a: 64, b: -30 }, k: 'daniel' });
    return s;
  },
  setup(api) {
    api.tap(api.q('daniel'), 'Daniel', () => { api.snd('hello'); api.bubble(400, 760, 'Deus cuida de mim!', { key: 'd' }); });
    api.tap(api.q('l0'), 'Leão a dormir', () => { api.snd('snore'); api.bubble(196, 900, 'Zzz...', { key: 'l', size: 26, dur: 1200 }); });
    api.tap(api.q('l1'), 'Leão manso', () => { api.snd('heart'); api.burst(560, 930, 'heart', 4); api.hop(api.q('l1'), 8); });
  }
});

/* =====================================================================
   1 — DANIEL E O REI
   ===================================================================== */
SCENES.push({
  key: 'daniel', title: 'Daniel e o rei', ref: 'Daniel 6.1-3', tint: 'gold',
  text: [
    'Daniel vivia longe da sua terra, na cidade do rei Dario.',
    'Daniel trabalhava para o rei. Era honesto e muito trabalhador. O rei gostava muito dele!'
  ],
  fact: 'Daniel era um dos três chefes mais importantes do reino.',
  hint: 'Toca no rei e no Daniel.',
  alt: 'No palácio de colunas, o rei Dario, de coroa, está sentado no trono e sorri para Daniel, que segura um pergaminho.',
  cue: [560, 480],
  art() {
    let s = persianHall({ cols: [80, 720] });
    s += throne(560, 640, .95);
    s += rei({ x: 560, y: 630, s: .98, legs: 'sit', drop: 30, hemY: -62, face: 'joy', look: -.6, armL: { a: 30, b: 40 }, armR: { a: 60, b: -20 }, k: 'rei' });
    s += daniel({ x: 280, y: 740, s: 1.06, face: 'smile', look: .6, armL: { a: 40, b: 50, item: `<g transform="translate(0,-14)">${ITEM.scroll()}</g>` }, armR: { a: 20 }, k: 'daniel' });
    return s;
  },
  setup(api) {
    api.tap(api.q('rei'), 'Rei Dario', () => { api.snd('fanfare'); api.bubble(560, 330, 'Daniel é o meu melhor ajudante!', { key: 'r' }); api.nudgeNext(2600); });
    api.tap(api.q('daniel'), 'Daniel', () => { api.snd('hello'); api.hop(api.q('daniel'), 10); api.bubble(280, 420, 'Eu faço tudo com muito cuidado!', { key: 'd' }); });
  }
});

/* =====================================================================
   2 — TRÊS VEZES POR DIA
   ===================================================================== */
const HORAS = [['#8fd0f2', '#d8f0fa', N('De manhã!')], ['#f6a46a', '#fde2b8', N('De tarde!')], ['#141b4a', '#3a4889', N('De noite!')]];
SCENES.push({
  key: 'ora', title: 'Três vezes por dia', ref: 'Daniel 6.10', tint: 'sky',
  text: [
    'Daniel amava a Deus. Três vezes por dia, abria a janela, ajoelhava-se e orava.',
    'De manhã, de tarde e de noite. Daniel conversava com Deus!'
  ],
  fact: 'Daniel orava virado para Jerusalém, a cidade do templo de Deus.',
  hint: 'Toca no céu para mudares a hora do dia.',
  alt: 'Daniel está ajoelhado no quarto, diante de uma janela aberta, a orar. Pela janela, o céu muda: manhã, tarde e noite.',
  cue: [560, 200],
  art() {
    let s = `<rect x="-40" y="-40" width="900" height="900" fill="#e9d7b4"/>`;
    s += `<g stroke="#d4bf96" stroke-width="3" opacity=".7">${[...Array(10)].map((_, i) => `<path d="M-40,${i * 70} L840,${i * 70}"/>`).join('')}</g>`;
    s += `<g transform="translate(560,240)"><defs><clipPath id="${ID('jan')}"><path d="M-150,170 L-150,-40 A150,150 0 0 1 150,-40 L150,170 Z"/></clipPath></defs><g clip-path="url(#${ID('jan')})">`;
    HORAS.forEach(([a, b], i) => { s += `<g data-k="h${i}"${i ? ' opacity="0"' : ''}><defs>${lg('ceu' + i, [[0, a], [1, b]])}</defs><rect x="-160" y="-200" width="320" height="380" fill="${UR('ceu' + i)}"/></g>`; });
    s += `<g data-k="astro"><g transform="translate(60,-70)">${sun(0, 0, 30, { face: true, k: 'sol' })}</g></g><g data-k="lua" opacity="0">${moon(70, -80, 26)}${starField(9, 12, -140, -180, 140, 60, { big: .2 })}</g>`;
    s += hill([[-160, 120], [-60, 96], [40, 110], [160, 90]], '#a9cf7a', '', 200) + `<g transform="translate(-40,100) scale(.4)">${jerusalemMini()}</g>`;
    s += `</g><path d="M-150,170 L-150,-40 A150,150 0 0 1 150,-40 L150,170 Z" fill="none" stroke="${OL}" stroke-width="8"/><path d="M-150,170 L-150,-40 A150,150 0 0 1 150,-40 L150,170 Z" fill="none" stroke="#8a5a33" stroke-width="4"/><path d="M-170,176 L170,176" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M-170,176 L170,176" stroke="#c9a873" stroke-width="9" stroke-linecap="round"/>${hitC(0, 0, 150).replace('class="hit"', 'class="hit" data-k="ceu"')}</g>`;
    s += `<rect x="-40" y="600" width="900" height="300" fill="#b98f62"/><path d="M-40,600 L840,600" stroke="${OL}" stroke-width="4"/>`;
    s += `<path d="M300,640 L700,640 L740,720 L260,720 Z" fill="#b8312f" stroke="${OL}" stroke-width="3"/>`;
    s += daniel({ x: 500, y: 700, s: 1.1, legs: 'kneel', face: 'smile', look: .4, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, cloak: null, k: 'daniel' });
    s += `<g transform="translate(150,600)"><rect x="-40" y="-150" width="80" height="150" fill="#9a6b3e" stroke="${OL}" stroke-width="3"/><g transform="translate(0,-150)">${ITEM.scroll()}</g></g>`;
    return s;
  },
  setup(api) {
    let h = 0, n = 0;
    const pray = () => { api.snd('anoint'); api.burst(500, 420, 'spark', 6, { col: '#fff1b0' }); api.bubble(500, 360, 'Obrigado, Deus! Eu amo-te!', { key: 'd' }); };
    api.tap(api.q('ceu'), 'Céu pela janela', async () => {
      if (n >= 3) { pray(); return; }
      if (n > 0) {
        const nx = h + 1;
        api.anim(api.q('h' + nx), [{ opacity: 0 }, { opacity: 1 }], { duration: 800, fill: 'forwards' });
        if (nx === 1) api.anim(api.q('astro'), [{ transform: 'translate(0px,0px)' }, { transform: 'translate(-120px,40px)' }], { duration: 800, fill: 'forwards' });
        if (nx === 2) { api.anim(api.q('astro'), [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' }); api.anim(api.q('lua'), [{ opacity: 0 }, { opacity: 1 }], { duration: 800, fill: 'forwards' }); }
        h = nx;
      }
      n++;
      api.snd('chime', ['C5', 'E5', 'G5'][n - 1]);
      api.badge(700, 120, String(n), { key: 'b' });
      api.bubble(560, 100, HORAS[n - 1][2], { key: 'h', size: 34, plain: true, dur: 1400 });
      await api.wait(700);
      pray();
      if (n === 3) api.nudgeNext(2600);
    });
    api.tap(api.q('daniel'), 'Daniel a orar', pray);
  }
});
function jerusalemMini() {
  return `<rect x="-200" y="-60" width="400" height="80" fill="#e2c497" stroke="${OL}" stroke-width="5"/>${[-180, -120, -60, 0, 60, 120, 160].map(x => `<rect x="${x}" y="-84" width="30" height="28" fill="#e2c497" stroke="${OL}" stroke-width="4"/>`).join('')}<rect x="-60" y="-150" width="120" height="90" fill="#f4ead2" stroke="${OL}" stroke-width="5"/><rect x="-74" y="-166" width="148" height="20" fill="#f2c14e" stroke="${OL}" stroke-width="4"/>`;
}

/* =====================================================================
   3 — UMA LEI CONTRA DANIEL
   ===================================================================== */
SCENES.push({
  key: 'inveja', title: 'Uma lei contra Daniel', ref: 'Daniel 6.4-9', tint: 'stone',
  text: [
    'Mas uns homens do rei tinham inveja de Daniel. Inventaram uma lei:',
    { q: 'Durante trinta dias, ninguém pode orar a Deus. Só pedir coisas ao rei!', who: 'farao' },
    'Quem desobedecesse ia para a cova dos leões. E o rei assinou a lei.'
  ],
  fact: 'As leis daquele reino não podiam ser mudadas, nem pelo próprio rei!',
  hint: 'Toca nos homens e na lei.',
  alt: 'No palácio, três homens invejosos cochicham e mostram ao rei uma lei escrita num pergaminho. O rei sela a lei com o anel.',
  cue: [470, 560],
  art() {
    let s = persianHall({ cols: [60, 740] });
    s += throne(620, 640, .9);
    s += rei({ x: 620, y: 630, s: .94, legs: 'sit', drop: 30, hemY: -62, face: 'smile', look: -.6, armL: { a: 60, b: -20 }, armR: { a: 30, b: 40 }, k: 'rei' });
    s += scrollBig(470, 560, .9, 'lei');
    INVEJOSOS.forEach((d, i) => s += person(Object.assign({}, d, { x: 110 + i * 105, y: 740 + (i % 2) * 10, s: .94, face: i === 1 ? 'grin' : 'determined', look: .6, armL: { a: 20 }, armR: { a: i === 2 ? 70 : 30, b: i === 2 ? -20 : 30 }, k: 'm' + i })));
    return s;
  },
  setup(api) {
    api.tap(api.q('lei'), 'Lei do rei', () => {
      api.snd('stomp');
      api.anim(api.q('leiselo'), [{ opacity: 0, transform: 'scale(2)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 400, fill: 'forwards' });
      api.bubble(470, 380, 'PLAFT!', { key: 'p', size: 48, plain: true, dur: 1200 });
      if (!api.st.n) { api.st.n = true; api.later(() => { api.bubble(620, 330, 'Pronto, a lei está assinada!', { key: 'r' }); api.nudgeNext(2400); }, 900); }
    });
    INVEJOSOS.forEach((_, i) => api.tap(api.q('m' + i), 'Homem invejoso', () => { const [x, y, sc] = api.pos(api.q('m' + i)); api.snd('shh'); api.bubble(x, y - 270 * sc, ['Psiu, psiu...', 'Agora o Daniel vai ver!', 'Assina aqui, ó rei!'][i], { key: 'm', size: 26 }); }));
    api.tap(api.q('rei'), 'Rei Dario', () => { api.snd('hm'); api.bubble(620, 330, 'Uma lei só para mim? Que bom!', { key: 'r' }); });
  }
});

/* =====================================================================
   4 — DANIEL CONTINUOU ORANDO
   ===================================================================== */
SCENES.push({
  key: 'continua', title: 'Daniel continuou a orar', ref: 'Daniel 6.10-11', tint: 'sky',
  text: [
    'Daniel soube da lei. Mas sabes o que ele fez?',
    'Abriu a janela e orou, como sempre! Daniel confiava em Deus.',
    'Os homens invejosos espreitaram e viram Daniel a orar.'
  ],
  fact: 'Daniel não teve medo de continuar a fazer o que era certo.',
  hint: 'Toca no Daniel e no muro.',
  alt: 'Pela janela aberta da casa, vemos Daniel ajoelhado, a orar de mãos juntas. Atrás de um muro, os homens invejosos espreitam.',
  cue: [700, 600],
  art() {
    let s = bgDay({ sunX: 690, sunY: 110, sunR: 40 });
    s += `<rect x="-40" y="600" width="900" height="300" fill="#d8c79a"/>`;
    s += houseWindow();
    s += daniel({ x: 380, y: 560, s: .94, face: 'smile', look: 0, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, cloak: null, k: 'daniel' });
    s += `<rect x="246" y="472" width="268" height="143" fill="#e9d2a8"/>`;
    s += `<rect x="236" y="458" width="288" height="22" rx="6" fill="#c9a873" stroke="${OL}" stroke-width="4"/>`;
    s += `<g transform="translate(486,458)"><path d="M-18,0 L-14,-28 L14,-28 L18,0 Z" fill="#c8643c" stroke="${OL}" stroke-width="3"/>${flower(-6, -34, .9, '#e0473e')}${flower(8, -40, .8, '#f2c14e')}</g>`;
    s += `<g data-k="espioes"><g class="act" style="transform:translateY(4px)">${INVEJOSOS.slice(0, 2).map((d, i) => person(Object.assign({}, d, { x: 660 + i * 100, y: 800, s: .86, face: 'o', look: -.7, armL: { a: 20 }, armR: { a: 20 } }))).join('')}</g>${hitC(706, 640, 110)}</g>`;
    s += `<rect x="580" y="640" width="280" height="130" fill="#cbb48a" stroke="${OL}" stroke-width="4"/><g stroke="#a8916a" stroke-width="3">${[640, 700, 760, 820].map((x, i) => `<path d="M${x},${i % 2 ? 640 : 705} L${x},${i % 2 ? 705 : 770}"/>`).join('')}<path d="M580,705 L860,705"/></g>`;
    s += grassBand(901, 790, 830, 6, ['#a8a85a']);
    return s;
  },
  setup(api) {
    api.tap(api.q('daniel'), 'Daniel a orar', () => { api.snd('anoint'); api.burst(380, 380, 'spark', 8, { col: '#fff1b0' }); api.bubble(380, 300, 'Senhor, eu confio em ti!', { key: 'd' }); });
    api.tap(api.q('espioes'), 'Homens a espreitar', async () => {
      if (api.st.busy) return;
      api.st.busy = true;
      api.snd('gulp');
      await api.anim(api.act(api.q('espioes')), [{ transform: 'translateY(4px)' }, { transform: 'translateY(-40px)' }], { duration: 400, fill: 'forwards' });
      api.bubble(706, 470, 'Olha! Ele está a orar!', { key: 'e' });
      await api.wait(1400);
      await api.anim(api.act(api.q('espioes')), [{ transform: 'translateY(-40px)' }, { transform: 'translateY(4px)' }], { duration: 400, fill: 'forwards' });
      api.st.busy = false;
      if (!api.st.n) { api.st.n = true; api.nudgeNext(1200); }
    });
  }
});

/* =====================================================================
   5 — O REI FICOU TRISTE
   ===================================================================== */
SCENES.push({
  key: 'triste', title: 'O rei ficou triste', ref: 'Daniel 6.12-16', tint: 'dusk',
  text: [
    'Os homens contaram tudo ao rei. O rei ficou muito triste, porque gostava de Daniel.',
    'Mas a lei não podia mudar. Então o rei disse a Daniel:',
    { q: 'Que o teu Deus, que tu sempre adoras, te salve!', who: 'rei' }
  ],
  fact: 'O rei passou o dia inteiro à procura de uma maneira de salvar Daniel.',
  hint: 'Toca no rei e no Daniel.',
  alt: 'Ao entardecer, o rei aperta as mãos, triste, com lágrimas nos olhos. Dois guardas levam Daniel, que está calmo.',
  cue: [300, 480],
  art() {
    let s = persianHall({ cols: [60, 740] });
    s += `<rect x="-40" y="-40" width="900" height="900" fill="#f6a46a" opacity=".18"/>`;
    s += rei({ x: 300, y: 740, s: 1.06, face: 'sad', look: .6, armL: { a: -30, b: -84 }, armR: { a: -30, b: -84 }, k: 'rei' });
    s += tears(300, 516, 1.06);
    s += person(Object.assign({}, GUARDA, { x: 470, y: 744, s: .94, face: 'frown', look: .5, armL: { a: 14, item: ITEM.spear(240, 5), ia: 0 }, armR: { a: 40, b: 20 } }));
    s += daniel({ x: 570, y: 744, s: 1.04, face: 'smile', look: -.6, armL: { a: 14 }, armR: { a: 14 }, k: 'daniel' });
    s += person(Object.assign({}, GUARDA, { x: 680, y: 748, s: .94, face: 'frown', look: -.5, armL: { a: 40, b: 20 }, armR: { a: 14, item: ITEM.spear(240, 5), ia: 0 } }));
    return s;
  },
  setup(api) {
    api.tap(api.q('rei'), 'Rei Dario', () => { api.snd('hm'); api.bubble(300, 400, 'Que o teu Deus te salve, Daniel!', { key: 'r', dur: 2800 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
    api.tap(api.q('daniel'), 'Daniel', () => { api.snd('heart'); api.burst(570, 480, 'heart', 3); api.bubble(570, 420, 'Eu confio em Deus.', { key: 'd' }); });
  }
});

/* =====================================================================
   6 — NA COVA DOS LEÕES
   ===================================================================== */
const LEOES = [[160, 730, .9, false], [650, 724, .92, true], [420, 790, .8, false]];
SCENES.push({
  key: 'cova', title: 'Na cova dos leões', ref: 'Daniel 6.16-17', tint: 'night',
  text: [
    'Então puseram Daniel numa cova cheia de leões. Roar!',
    'Fecharam a cova com uma pedra muito grande. Mas Daniel não estava sozinho...'
  ],
  fact: 'O rei selou a pedra com o seu anel, para ninguém a abrir.',
  hint: 'Toca nos leões e no Daniel.',
  alt: 'No fundo de uma cova escura, Daniel está de pé, calmo, de mãos juntas. Leões grandes rugem à volta dele. No alto, uma pedra fecha a entrada.',
  cue: [160, 600],
  art() {
    let s = den();
    s += daniel({ x: 400, y: 680, s: 1, face: 'smile', look: 0, armL: { a: -34, b: -84 }, armR: { a: -34, b: -84 }, k: 'daniel' });
    LEOES.forEach(([x, y, sc, fl], i) => s += leao({ x, y, s: sc, flip: fl, roar: true, k: 'l' + i }));
    return s;
  },
  setup(api) {
    LEOES.forEach(([x, y, sc], i) => api.tap(api.q('l' + i), 'Leão', () => {
      api.snd('roar');
      api.anim(api.part(api.q('l' + i), 'head'), [{ transform: 'translateY(0px)' }, { transform: 'translateY(-8px)' }, { transform: 'translateY(0px)' }], { duration: 500 });
      api.bubble(x + (x < 400 ? 40 : -40), y - 160 * sc, 'ROAR!', { key: 'l' + i, size: 40, plain: true, dur: 1000 });
      api.st.r = (api.st.r || 0) + 1;
      if (api.st.r === 2 && !api.st.n) { api.st.n = true; api.later(() => api.bubble(400, 330, 'Deus está comigo. Não tenho medo!', { key: 'd', dur: 2800 }), 1200); api.nudgeNext(3600); }
    }));
    api.tap(api.q('daniel'), 'Daniel', () => { api.snd('anoint'); api.bubble(400, 330, 'Deus está comigo. Não tenho medo!', { key: 'd', dur: 2600 }); });
  }
});

/* =====================================================================
   7 — DEUS MANDOU UM ANJO
   ===================================================================== */
SCENES.push({
  key: 'anjo', title: 'Deus mandou um anjo', ref: 'Daniel 6.22', tint: 'night',
  text: [
    'Deus mandou um anjo, que fechou a boca dos leões!',
    'Os leões ficaram mansinhos, como gatinhos. Daniel passou a noite em paz.'
  ],
  fact: 'Os leões nem tocaram em Daniel!',
  hint: 'Toca no anjo e depois nos leões.',
  alt: 'Na cova escura, um anjo brilhante aparece. Os leões fecham a boca, deitam-se e dormem. Daniel faz festas na juba de um leão.',
  cue: [400, 260],
  art() {
    let s = den() + glowDefs();
    s += anjo({ x: 400, y: 430, s: .8, face: 'joy', look: 0, armL: { a: 110, b: -20 }, armR: { a: 110, b: -20 }, k: 'anjo' });
    s += daniel({ x: 400, y: 680, s: 1, face: 'joy', look: .3, armL: { a: 14 }, armR: { a: 40, b: -10 }, k: 'daniel' });
    s += `<g data-k="bravos">${LEOES.map(([x, y, sc, fl]) => leao({ x, y, s: sc, flip: fl, roar: true, k: '' })).join('')}</g>`;
    s += `<g data-k="mansos" opacity="0" style="pointer-events:none">${LEOES.map(([x, y, sc, fl], i) => leao({ x, y, s: sc, flip: fl, sleep: true, k: 'm' + i })).join('')}</g>`;
    return s;
  },
  setup(api) {
    const calm = async () => {
      if (api.st.ok) { api.snd('twinkle'); api.burst(400, 300, 'spark', 8, { col: '#fff6c8' }); return; }
      api.st.ok = true;
      api.snd('choir', ['C4', 'G4', 'C5', 'E5']);
      api.burst(400, 300, 'spark', 16, { col: '#fff6c8' });
      await api.wait(700);
      api.q('bravos').setAttribute('opacity', '0');
      api.q('mansos').style.pointerEvents = 'auto';
      api.anim(api.q('mansos'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
      api.snd('snore');
      api.bubble(400, 230, 'Leões, fechem a boca!', { key: 'a', dur: 2400 });
      api.nudgeNext(3200);
    };
    api.tap(api.q('anjo'), 'Anjo', calm);
    LEOES.forEach(([x, y, sc], i) => api.tap(api.q('m' + i), 'Leão mansinho', () => { api.snd('snore'); api.burst(x, y - 140 * sc, 'heart', 3); api.bubble(x, y - 170 * sc, 'Rrrr...', { key: 'm' + i, size: 26, dur: 1200 }); }));
    api.tap(api.q('daniel'), 'Daniel', () => { api.snd('heart'); api.bubble(560, 420, api.st.ok ? 'Obrigado, Deus!' : 'Deus vai proteger-me!', { key: 'd' }); });
  }
});

/* =====================================================================
   8 — DE MANHÃZINHA
   ===================================================================== */
SCENES.push({
  key: 'manha', title: 'De manhãzinha', ref: 'Daniel 6.18-20', tint: 'gold',
  text: [
    'O rei não conseguiu dormir a noite toda.',
    'De manhãzinha, correu até à cova e gritou:',
    { q: 'Daniel! O teu Deus conseguiu salvar-te?', who: 'rei' }
  ],
  fact: 'Naquela noite, o rei não quis comer nem ouvir música.',
  hint: 'Toca no rei e na pedra.',
  alt: 'Ao nascer do sol, o rei chega a correr à cova dos leões, ainda fechada por uma pedra grande e redonda, e chama Daniel.',
  cue: [400, 560],
  art() {
    let s = denTop({ day: { sky: [[0, '#f6b37a'], [.5, '#fde2b8'], [1, '#fdf0e2']], sunX: 640, sunY: 300, sunR: 40 } });
    s += `<g transform="translate(400,600)" data-k="pedra"><g class="act"><ellipse rx="200" ry="74" fill="#8f8a9c" stroke="${OL}" stroke-width="5"/><path d="M-120,-20 Q-30,-56 80,-34" stroke="#aaa5b6" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="60" cy="10" r="14" fill="#c0392b" stroke="${OL}" stroke-width="3"/>${hitC(0, 0, 120)}</g></g>`;
    s += palm(730, 500, .9);
    s += rei({ x: 150, y: 760, s: 1.04, legs: 'run', face: 'worry', look: .6, armL: { a: 60, b: 20 }, armR: { a: 130, b: -30 }, k: 'rei' });
    return s;
  },
  setup(api) {
    api.tap(api.q('rei'), 'Rei Dario', () => { api.snd('trumpet'); api.bubble(190, 420, 'Daniel! Estás bem?', { key: 'r', dur: 2400 }); });
    api.tap(api.q('pedra'), 'Pedra da cova', async () => {
      if (api.st.ok) return;
      api.st.ok = true;
      api.snd('stomp');
      api.anim(api.act(api.q('pedra')), [{ transform: 'translateX(0px)' }, { transform: 'translateX(250px)' }], { duration: 1000, fill: 'forwards', easing: 'ease-out' });
      await api.wait(1000);
      api.bubble(400, 560, 'Estou aqui!', { key: 'd', size: 32 });
      api.nudgeNext(2200);
    });
  }
});

/* =====================================================================
   9 — DANIEL ESTÁ BEM!
   ===================================================================== */
SCENES.push({
  key: 'salvo', title: 'Daniel está bem!', ref: 'Daniel 6.21-23', tint: 'meadow',
  text: [
    'Lá de dentro, Daniel respondeu:',
    { q: 'Estou bem, ó rei! Deus mandou um anjo, e ele fechou a boca dos leões!', who: 'daniel' },
    'O rei ficou muito feliz! Tiraram Daniel da cova, sem nenhum arranhão.'
  ],
  fact: 'Daniel não se magoou porque confiou em Deus.',
  hint: 'Toca na corda para puxares o Daniel.',
  alt: 'De manhã, à beira da cova aberta, o rei e um guarda puxam duas cordas. Daniel sobe a sorrir, sem nenhum ferimento.',
  cue: [400, 600],
  art() {
    let s = denTop();
    s += `<g data-k="sobe"><g style="transform:translateY(84px)">${daniel({ x: 400, y: 760, s: .96, face: 'joy', look: 0, armL: { a: 160, b: -4 }, armR: { a: 160, b: -4 } })}</g></g>`;
    s += `<path d="M190,620 Q400,700 610,620 L610,900 L190,900 Z" fill="#d8c79a"/><path d="M190,620 Q400,700 610,620" stroke="#8f8a9c" stroke-width="12" fill="none"/>`;
    const AR = { a: 70, b: -10 }, AG = { a: 70, b: -10 };
    const [rx, ry] = handAt('adult', -1, AR, 1, 640, 740), [gx, gy] = handAt('adult', 1, AG, .92, 150, 744);
    const rope = d => `<path d="${d}" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#c9a05a" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="9 5"/>`;
    s += `<g data-k="corda"><g class="act"><g data-k="cordas">${rope(`M${r1(rx)},${r1(ry)} Q${r1((rx + 424) / 2)},${r1(ry + 40)} 424,560`)}${rope(`M${r1(gx)},${r1(gy)} Q${r1((gx + 376) / 2)},${r1(gy + 40)} 376,560`)}</g>${hitC(400, 600, 110)}</g></g>`;
    s += rei({ x: 640, y: 740, s: 1, face: 'joy', look: -.6, armL: AR, armR: { a: 30 }, k: 'rei' });
    s += person(Object.assign({}, GUARDA, { x: 150, y: 744, s: .92, face: 'smile', look: .6, armL: { a: 14 }, armR: AG }));
    return s;
  },
  setup(api) {
    api.tap(api.q('corda'), 'Corda', async () => {
      if (api.st.ok) { api.snd('tada'); api.burst(400, 300, 'confetti', 10); return; }
      api.st.ok = true;
      api.snd('whoosh');
      api.anim(api.q('cordas'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      await api.anim(api.q('sobe').firstElementChild, [{ transform: 'translateY(84px)' }, { transform: 'translateY(-200px)' }], { duration: 1600, fill: 'forwards', easing: 'ease-out' });
      api.snd('victory'); api.burst(400, 300, 'confetti', 18);
      api.bubble(400, 230, 'Nem um arranhão!', { key: 'd', dur: 2400 });
      api.nudgeNext(2600);
    });
    api.tap(api.q('rei'), 'Rei Dario', () => { api.snd('tada'); api.hop(api.q('rei'), 14); api.bubble(640, 420, 'Que alegria!', { key: 'r' }); });
  }
});

/* =====================================================================
   10 — O DEUS VIVO
   ===================================================================== */
SCENES.push({
  key: 'louvor', title: 'O Deus vivo', ref: 'Daniel 6.25-27', tint: 'gold',
  text: [
    'Então o rei escreveu uma carta para todo o reino:',
    { q: 'O Deus de Daniel é o Deus vivo! Ele salva e faz maravilhas!', who: 'rei' }
  ],
  fact: 'Até o rei aprendeu a respeitar o Deus de Daniel!',
  hint: 'Toca nas cornetas, na carta e no povo.',
  alt: 'No palácio, em cima de um estrado, o rei mostra uma carta com o selo real. Daniel festeja ao lado dele, dois músicos tocam cornetas e o povo faz a festa.',
  cue: [320, 520],
  art() {
    let s = persianHall({ cols: [60, 740], floor: 600 });
    s += `<rect x="96" y="590" width="608" height="20" fill="#e6cf9c" stroke="${OL}" stroke-width="4"/><rect x="96" y="610" width="608" height="70" fill="#b98f62" stroke="${OL}" stroke-width="4"/><g fill="#f2c14e">${[...Array(8)].map((_, i) => `<path d="${sparkle(9)}" transform="translate(${140 + i * 74},645)"/>`).join('')}</g>`;
    const corneta = (x, fl, k) => `<g data-k="${k}"><g class="act">${person(Object.assign({}, GUARDA, { head: 'cloth', clothCol: '#f2c14e', x, y: 598, s: .82, flip: fl, face: 'grin', look: .5, armL: { a: 14 }, armR: { a: 100, b: -20, item: `<g transform="rotate(-70)">${trumpet()}</g>` } }))}${hitC(x + (fl ? -20 : 20), 450, 80)}</g></g>`;
    s += corneta(156, false, 't0') + corneta(644, true, 't1');
    s += rei({ x: 320, y: 598, s: .92, face: 'joy', look: .3, armL: { a: 40, b: 50 }, armR: { a: 40, b: 50 }, k: 'rei' });
    s += scrollBig(320, 522, .5, 'carta', { selo: true });
    s += daniel({ x: 480, y: 598, s: .92, face: 'joy', look: -.3, armL: { a: 150, b: -20 }, armR: { a: 150, b: -20 }, k: 'daniel' });
    const GENTE = [POVO[0], POVO[1], POVO[4], POVO[3], POVO[2]];
    s += `<g data-k="povo">${GENTE.map((d, i) => person(Object.assign({}, d, { x: [80, 230, 400, 570, 720][i], y: d.kind === 'child' ? 850 : 836, s: d.kind === 'child' ? .74 : .84, face: 'joy', look: i < 2 ? .5 : -.5, armL: { a: 150, b: -10 }, armR: { a: 150, b: -10 } }))).join('')}<ellipse class="hit" cx="400" cy="770" rx="420" ry="110" fill="#000" fill-opacity="0"/></g>`;
    return s;
  },
  setup(api) {
    for (const k of ['t0', 't1']) api.tap(api.q(k), 'Corneta', () => { api.snd('fanfare'); api.hop(api.q(k), 8); api.burst(k === 't0' ? 236 : 564, 330, 'note', 4); });
    api.tap(api.q('carta'), 'Carta do rei', () => { api.snd('swish'); api.bubble(320, 360, 'O Deus de Daniel é o Deus vivo!', { key: 'c', dur: 2600 }); if (!api.st.n) { api.st.n = true; api.nudgeNext(2800); } });
    api.tap(api.q('povo'), 'Povo a festejar', () => { api.snd('crowd'); api.burst(400, 640, 'confetti', 14); });
    api.tap(api.q('daniel'), 'Daniel', () => { api.snd('tada'); api.hop(api.q('daniel'), 14); api.bubble(480, 360, 'Deus é maravilhoso!', { key: 'd' }); });
    api.tap(api.q('rei'), 'Rei Dario', () => { api.snd('hello'); api.bubble(320, 360, 'Todos devem respeitar o Deus de Daniel!', { key: 'c' }); });
  }
});

/* =====================================================================
   FIM
   ===================================================================== */
SCENES.push({
  key: 'fim', end: true, title: 'Fim', tint: 'night',
  text: [],
  hint: 'Toca nas estrelas.',
  alt: 'Noite estrelada sobre o palácio. Um leão dorme encolhido ao lado de uma ovelhinha.',
  cue: [430, 160],
  questions: [
    ['Quantas vezes por dia Daniel orava?', 'Três vezes!'],
    ['O que é que a lei dizia?', 'Que ninguém podia orar a Deus.'],
    ['Daniel deixou de orar?', 'Não! Continuou a orar.'],
    ['Quem fechou a boca dos leões?', 'Um anjo que Deus mandou.'],
    ['Tu também podes falar com Deus?', 'Sim! A qualquer hora.']
  ],
  verse: ['O meu Deus mandou o seu anjo, e ele fechou a boca dos leões.', 'Daniel 6.22'],
  art() {
    let s = sky('sky', [[0, '#0f1640'], [.55, '#262f6c'], [.8, '#3a4889'], [1, '#3a4889']]);
    s += starField(1601, 80, 0, 0, 800, 440, { big: .1 });
    const BIG = [[160, 120], [290, 80], [430, 160], [680, 90], [240, 250]];
    BIG.forEach(([x, y], i) => s += `<g transform="translate(${x},${y})" data-k="star${i}"><g class="act"><g class="twinkle" style="--d:${(2.4 + i * .4).toFixed(2)}s;${dl(4)}"><path d="${sparkle(16)}" fill="#ffe9a6"/><circle r="4.5" fill="#fff"/></g>${hitC(0, 0, 36)}</g></g>`);
    s += moon(600, 220, 30);
    s += `<g opacity=".85"><rect x="560" y="440" width="230" height="120" fill="#3e4878"/>${[580, 640, 700, 760].map(x => `<rect x="${x - 11}" y="404" width="22" height="156" fill="#4a5486"/>`).join('')}<rect x="550" y="396" width="250" height="14" fill="#56609a"/></g>`;
    s += `<text x="400" y="390" text-anchor="middle" class="fimtxt">${tr('Fim')}</text>`;
    s += hill([[-40, 600], [200, 572], [420, 592], [640, 566], [840, 586]], '#244a5b') + hill([[-40, 690], [240, 668], [480, 682], [720, 660], [840, 672]], '#2c584f');
    s += leao({ x: 520, y: 740, s: .7, flip: true, sleep: true, k: 'leao' });
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
    api.tap(api.q('leao'), 'Leão a dormir', () => { api.snd('snore'); api.bubble(520, 640, 'Rrrr...', { key: 'l', size: 26, dur: 1200 }); });
  }
});

Ov.addBook({
  id: 'daniel',
  title: 'Daniel na Cova dos Leões',
  cover: { kicker: 'Uma história da Bíblia', title: 'Daniel', small: 'e os Leões', sub: 'Deus cuida de quem confia nele' },
  color: '#6e2c5c',
  ref: 'Daniel 6',
  scenes: SCENES
});
})();
