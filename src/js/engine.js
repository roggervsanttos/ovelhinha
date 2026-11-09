/* =====================================================================
   MOTOR DOS LIVROS — sons, páginas e o virar das folhas
   ===================================================================== */
const NS = 'http://www.w3.org/2000/svg';
const RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
const clamp = (lo, v, hi) => Math.max(lo, Math.min(hi, v));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, String(v)); } catch (e) { } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { } }
};
function mk(tag, cls) { const e = document.createElement(tag); if (cls) e.className = cls; return e; }
function svgEl(tag, attrs = {}) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
function wrapText(t, max = 20) {
  const out = []; let line = '';
  for (const w of String(t).split(/[ \t\r\n]+/)) {  // o espaço fixo (antes de ! ? : ; em francês) não quebra a linha
    if (line && (line + ' ' + w).length > max) { out.push(line); line = w; } else line = line ? line + ' ' + w : w;
  }
  if (line) out.push(line);
  return out;
}
function STAR5(r) {
  let d = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + r1(Math.cos(a) * rr) + ',' + r1(Math.sin(a) * rr); }
  return d + 'Z';
}
const HAND = `<path d="M2,2 C1,-6 11,-8 13,-1 L18,17 C20,10 29,11 30,18 C32,12 41,13 41,21 C44,16 52,18 52,26 L52,42 C52,60 40,70 25,70 C12,70 4,62 0,52 L-10,32 C-14,23 -5,18 1,25 L6,31 Z" fill="#fffdf6" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M18,17 L21,30 M30,18 L32,30 M41,21 L42,31" stroke="${OL}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`;

/* anel de foco só para quem navega pelo teclado (dedo e mouse não precisam dele) */
(function () {
  const root = document.documentElement;
  try { if (matchMedia('(pointer: coarse)').matches) root.classList.add('pointer'); } catch (e) { }
  addEventListener('pointerdown', () => root.classList.add('pointer'), true);
  addEventListener('keydown', e => { if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) root.classList.remove('pointer'); }, true);
})();

/* ---------------- os livros do app ---------------- */
const Ov = {
  cfg: window.OV_CONFIG || {},
  books: [],
  addBook(def) { this.books.push(def); },
  book(id) { return this.books.find(b => b.id === id) || null; },
  // o livro pode ser lido? (a loja, em loja.js, troca esta regra pelas histórias grátis e compradas)
  open(id) { return true; },
  ordered() {
    const ord = this.cfg.order || [];
    const k = b => { const i = ord.indexOf(b.id); return i < 0 ? 99 : i; };
    return [...this.books].sort((a, b) => k(a) - k(b));
  },
  // próximo livro: o primeiro ainda não lido depois deste (dando a volta na estante)
  nextBook(id) {
    const o = this.ordered(), i = o.findIndex(b => b.id === id);
    if (i < 0 || o.length < 2) return null;
    const after = [...o.slice(i + 1), ...o.slice(0, i)];
    const open = after.filter(b => this.open(b.id));
    return open.find(b => !Progress.done(b.id)) || open[0] || null;
  }
};

/* ---------------- recursos do aparelho quando é o app instalado (iPhone/Android) ---------------- */
const Native = {
  n() { return window.OvNative || null; },
  is() { return !!window.OvNative; },
  platform() { const n = this.n(); return n ? n.platform : 'web'; },
  tick() { const n = this.n(); if (n && n.Haptics) try { n.Haptics.impact({ style: n.ImpactStyle.Light }).catch(() => { }); } catch (e) { } },
  init() {
    const n = this.n(); if (!n) return;
    document.documentElement.classList.add('native', 'native-' + n.platform);
    const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
    const bar = () => { try { n.StatusBar.setStyle({ style: mq && mq.matches ? n.Style.Dark : n.Style.Light }).catch(() => { }); } catch (e) { } };
    bar(); if (mq && mq.addEventListener) mq.addEventListener('change', bar);
    try { n.App.addListener('backButton', () => { if (!App.back()) n.App.exitApp(); }); } catch (e) { }
    setTimeout(() => { try { n.SplashScreen.hide({ fadeOutDuration: 300 }).catch(() => { }); } catch (e) { } }, 250);
  }
};

/* ---------------- SONS (sintetizados, sem arquivos) ---------------- */
function NOTE(n) {
  if (typeof n === 'number') return n;
  const m = /^([A-G])(#|b)?(\d)$/.exec(n);
  if (!m) return 440;
  const st = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  return 440 * Math.pow(2, ((+m[3] + 1) * 12 + st - 69) / 12);
}
const Sound = {
  on: true, ctx: null, out: null, nb: null, pl: {},
  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { this.ctx = new AC(); } catch (e) { return null; }
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.ratio.value = 4;
      this.out = this.ctx.createGain(); this.out.gain.value = .62;
      this.out.connect(comp); comp.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => { });
    return this.ctx;
  },
  play(name, ...a) {
    if (!this.on || typeof this[name] !== 'function') return;
    const c = this.init(); if (!c) return;
    try { this[name](c, c.currentTime + .02, ...a); } catch (e) { }
  },
  noise(c) {
    if (!this.nb) { const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; this.nb = b; }
    const s = c.createBufferSource(); s.buffer = this.nb; s.loop = true; return s;
  },
  gain(c, t, peak, a, d, hold = 0) {
    const g = c.createGain();
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a);
    if (hold) g.gain.setValueAtTime(peak, t + a + hold);
    g.gain.exponentialRampToValueAtTime(.0001, t + a + hold + d);
    g.connect(this.out); return g;
  },
  osc(c, type, f, t, end) { const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.start(t); o.stop(end); return o; },
  filt(c, type, f, q = 1) { const b = c.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; },
  tone(c, t, f, d, type = 'sine', v = .25, a = .008) { const g = this.gain(c, t, v, a, d); this.osc(c, type, f, t, t + a + d + .05).connect(g); },
  burstN(c, t, d, f, type, v, q = 1) { const s = this.noise(c), fl = this.filt(c, type, f, q), g = this.gain(c, t, v, .003, d); s.connect(fl); fl.connect(g); s.start(t); s.stop(t + d + .05); return fl; },
  // voz de desenho animado: fonte com vibrato e 3 formantes de vogal; os bichos "falam" (méé, muu, quá…)
  cv(c, t, syl, o = {}) {
    const V = { a: [850, 1220, 2810], e: [560, 1950, 2650], i: [320, 2550, 3250], o: [520, 900, 2500], u: [340, 820, 2450] };
    const k = o.k || 1, amp = o.v || .8;
    let tt = t;
    for (const sy of syl) {
      tt += sy.gap || 0;
      const d = sy.d, end = tt + d + .08, f = sy.f;
      const src = this.osc(c, o.src || 'sawtooth', f[0], tt, end);
      f.forEach((fr, i) => { if (i) src.frequency.linearRampToValueAtTime(fr, tt + d * i / (f.length - 1)); });
      if (o.vib) { const v = this.osc(c, 'sine', o.vib[0], tt, end), vg = c.createGain(); vg.gain.value = o.vib[1]; v.connect(vg); vg.connect(src.frequency); }
      const sub = this.osc(c, 'triangle', f[0], tt, end); f.forEach((fr, i) => { if (i) sub.frequency.linearRampToValueAtTime(fr, tt + d * i / (f.length - 1)); });
      const env = this.gain(c, tt, amp, .025, Math.max(.06, d * .35), Math.max(0, d * .6));
      let dst = env;
      if (o.trem) { const am = c.createGain(); am.gain.value = 1 - o.trem[1]; const l = this.osc(c, 'sine', o.trem[0], tt, end), lg = c.createGain(); lg.gain.value = o.trem[1]; l.connect(lg); lg.connect(am.gain); am.connect(env); dst = am; }
      const vs = [sy.v, sy.v2, sy.v3].filter(Boolean);
      [0, 1, 2].forEach(n => {
        const bp = this.filt(c, 'bandpass', V[vs[0]][n] * k, [5, 7, 9][n]);
        vs.forEach((vv, i) => { if (i) bp.frequency.linearRampToValueAtTime(V[vv][n] * k, tt + d * i / (vs.length - 1) * .8); });
        const g = c.createGain(); g.gain.value = [1.6, 1, .45][n]; src.connect(bp); bp.connect(g); g.connect(dst);
      });
      if (o.nasal) { const nb = this.filt(c, 'bandpass', o.nasal, 12), ng = c.createGain(); ng.gain.value = 1.4; src.connect(nb); nb.connect(ng); ng.connect(dst); }
      const sg = c.createGain(); sg.gain.value = .22; sub.connect(sg); sg.connect(dst);
      tt += d;
    }
  },

  bleat(c, t, p = 1) { this.cv(c, t, [{ v: 'u', v2: 'e', d: .62, f: [560 * p, 610 * p, 520 * p] }], { k: 1.18 * p, trem: [17, .5], vib: [6, 6] }); },
  pluck(c, t, n = 'C5', v = .55) {
    const f = NOTE(n), key = Math.round(f);
    let buf = this.pl[key];
    if (!buf) {
      const sr = c.sampleRate, len = Math.floor(sr * 1.6), N = Math.max(2, Math.round(sr / f));
      buf = c.createBuffer(1, len, sr);
      const d = buf.getChannelData(0), ring = new Float32Array(N);
      for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
      for (let p = 0; p < 3; p++) for (let i = 0; i < N; i++) ring[i] = .5 * (ring[i] + ring[(i + 1) % N]);
      let idx = 0;
      for (let i = 0; i < len; i++) { const a = ring[idx], b = ring[(idx + 1) % N]; d[i] = a; ring[idx] = .4985 * (a + b); idx = (idx + 1) % N; }
      this.pl[key] = buf;
    }
    const s = c.createBufferSource(); s.buffer = buf;
    const g = c.createGain(); g.gain.value = v * 1.7;
    s.connect(g); g.connect(this.out); s.start(t);
  },
  chime(c, t, n = 'C6', v = .2) { const f = NOTE(n); this.tone(c, t, f, 1.3, 'sine', v); this.tone(c, t, f * 2.76, .5, 'sine', v * .25); this.tone(c, t, f * 5.4, .25, 'sine', v * .1); },
  count(c, t, n = 1) {
    const g = this.gain(c, t, .3, .005, .28);
    const o = this.osc(c, 'sine', 360 + n * 70, t, t + .35); o.frequency.exponentialRampToValueAtTime(700 + n * 120, t + .09); o.connect(g);
    this.tone(c, t + .06, (700 + n * 120) * 1.5, .25, 'triangle', .07);
  },
  tada(c, t) { ['C5', 'E5', 'G5', 'C6'].forEach((n, i) => { this.tone(c, t + i * .09, NOTE(n), i === 3 ? .8 : .22, 'triangle', .22); this.tone(c, t + i * .09, NOTE(n) * 2, i === 3 ? .5 : .15, 'sine', .05); }); },
  hello(c, t) { this.tone(c, t, NOTE('G5'), .18, 'triangle', .22); this.tone(c, t + .14, NOTE('C6'), .4, 'triangle', .22); },
  snore(c, t) { const s = this.noise(c), f = this.filt(c, 'lowpass', 520, 2), g = this.gain(c, t, .55, .5, .45); s.connect(f); f.connect(g); s.start(t); s.stop(t + 1.1); this.tone(c, t + .1, 110, .7, 'triangle', .06, .3); },
  roar(c, t) { this.cv(c, t, [{ v: 'o', v2: 'a', d: .62, f: [190, 275, 150] }], { k: .98, trem: [30, .32], vib: [7, 8], v: 1 }); },
  whoosh(c, t, p = 1) { const s = this.noise(c), f = this.filt(c, 'bandpass', 500 * p, 2.2); f.frequency.exponentialRampToValueAtTime(2600 * p, t + .25); const g = this.gain(c, t, .8, .1, .2); s.connect(f); f.connect(g); s.start(t); s.stop(t + .4); },
  grunt(c, t) { const o = this.osc(c, 'sawtooth', 140, t, t + .45); o.frequency.exponentialRampToValueAtTime(85, t + .4); const f = this.filt(c, 'lowpass', 520, 4), g = this.gain(c, t, .5, .03, .35); o.connect(f); f.connect(g); },
  boing(c, t, p = 1) {
    const o = this.osc(c, 'sine', 170 * p, t, t + .55); o.frequency.exponentialRampToValueAtTime(420 * p, t + .14);
    const l = this.osc(c, 'sine', 16, t, t + .55), lg = c.createGain(); lg.gain.setValueAtTime(40 * p, t); lg.gain.exponentialRampToValueAtTime(1, t + .5); l.connect(lg); lg.connect(o.frequency);
    o.connect(this.gain(c, t, .28, .01, .45));
  },
  hm(c, t) { const o = this.osc(c, 'triangle', 170, t, t + .65); o.frequency.linearRampToValueAtTime(150, t + .55); const f = this.filt(c, 'lowpass', 600, 1); o.connect(f); f.connect(this.gain(c, t, .3, .08, .45, .1)); },
  pour(c, t) { for (let i = 0; i < 6; i++) { const tt = t + i * .14, o = this.osc(c, 'sine', 420 - i * 22, tt, tt + .12); o.frequency.exponentialRampToValueAtTime(220 - i * 10, tt + .1); o.connect(this.gain(c, tt, .2, .01, .09)); } },
  anoint(c, t) { ['C6', 'D6', 'E6', 'G6', 'A6', 'C7', 'E7'].forEach((n, i) => this.tone(c, t + i * .06, NOTE(n), 1.1, 'sine', .09)); this.tone(c, t, NOTE('C4'), 1.6, 'triangle', .07, .4); this.tone(c, t, NOTE('G4'), 1.6, 'triangle', .05, .4); },
  stomp(c, t) { const o = this.osc(c, 'sine', 90, t, t + .7); o.frequency.exponentialRampToValueAtTime(32, t + .4); o.connect(this.gain(c, t, .95, .005, .55)); this.burstN(c, t, .25, 200, 'lowpass', .6); },
  boom(c, t) { const o = this.osc(c, 'sine', 75, t, t + 1.3); o.frequency.exponentialRampToValueAtTime(26, t + .9); o.connect(this.gain(c, t, 1, .006, 1.1)); this.burstN(c, t, .8, 260, 'lowpass', .7); },
  gulp(c, t) { const o = this.osc(c, 'sine', 640, t, t + .2); o.frequency.exponentialRampToValueAtTime(230, t + .14); o.connect(this.gain(c, t, .28, .01, .14)); },
  clank(c, t, p = 1) { [523, 1176, 1847, 2711, 3420].forEach((f, i) => this.tone(c, t, f * p * (1 + Math.random() * .02), .5 - i * .07, 'sine', .13 - i * .02, .002)); this.burstN(c, t, .06, 3000, 'highpass', .3, .7); },
  plip(c, t) {
    const o = this.osc(c, 'sine', 700, t, t + .2); o.frequency.exponentialRampToValueAtTime(1500, t + .06); o.connect(this.gain(c, t, .3, .005, .14));
    const o2 = this.osc(c, 'sine', 520, t + .08, t + .3); o2.frequency.exponentialRampToValueAtTime(300, t + .2); o2.connect(this.gain(c, t + .08, .16, .005, .16));
  },
  ribbit(c, t) { this.cv(c, t, [{ v: 'o', v2: 'a', d: .17, f: [300, 250] }, { v: 'o', v2: 'a', d: .19, f: [290, 230], gap: .07 }], { k: 1.1, trem: [48, .55] }); },
  laugh(c, t) { for (let i = 0; i < 3; i++) { const tt = t + i * .22, o = this.osc(c, 'sawtooth', 160 - i * 8, tt, tt + .2); o.frequency.exponentialRampToValueAtTime(120 - i * 8, tt + .17); const f = this.filt(c, 'bandpass', 720, 2.5); o.connect(f); f.connect(this.gain(c, tt, .9, .015, .16)); } },
  bonk(c, t) { const o = this.osc(c, 'sine', 900, t, t + .3); o.frequency.exponentialRampToValueAtTime(330, t + .06); o.connect(this.gain(c, t, .45, .002, .2)); this.tone(c, t, 230, .3, 'triangle', .25, .002); },
  victory(c, t) { for (const [n, dt, d] of [['G4', 0, .12], ['C5', .13, .12], ['E5', .26, .12], ['G5', .39, .24], ['E5', .66, .12], ['G5', .79, .7]]) { const f = NOTE(n); this.tone(c, t + dt, f, d + .08, 'square', .05); this.tone(c, t + dt, f, d + .2, 'triangle', .2); } },
  swish(c, t) { const s = this.noise(c), f = this.filt(c, 'bandpass', 1200, 1.4); f.frequency.exponentialRampToValueAtTime(3200, t + .3); s.connect(f); f.connect(this.gain(c, t, .4, .08, .25)); s.start(t); s.stop(t + .45); },
  heart(c, t) { this.tone(c, t, NOTE('E6'), .5, 'sine', .15); this.tone(c, t + .12, NOTE('G6'), .8, 'sine', .15); },
  snip(c, t) { for (let i = 0; i < 2; i++) this.burstN(c, t + i * .09, .03, 4200, 'highpass', .4, .8); },
  tiptoe(c, t) { for (let i = 0; i < 4; i++) this.tone(c, t + i * .2, i % 2 ? 1180 : 980, .06, 'sine', .15, .003); },
  drum(c, t) {
    [0, .2, .3, .5, .7, .8].forEach((dt, i) => { const tt = t + dt, o = this.osc(c, 'sine', i % 2 ? 165 : 115, tt, tt + .3); o.frequency.exponentialRampToValueAtTime(55, tt + .18); o.connect(this.gain(c, tt, .55, .003, .22)); this.burstN(c, tt + .1, .08, 7000, 'highpass', .12, .7); });
    ['C5', 'E5', 'G5', 'E5', 'C6'].forEach((n, i) => this.tone(c, t + .1 + i * .2, NOTE(n), .25, 'triangle', .14));
  },
  fanfare(c, t, i = 0) {
    const f0 = i ? 233 : 175, end = t + 1.3;
    const o = this.osc(c, 'sawtooth', f0, t, end); o.frequency.linearRampToValueAtTime(f0 * 1.5, t + .25); o.frequency.setValueAtTime(f0 * 1.5, t + .55); o.frequency.linearRampToValueAtTime(f0 * 1.53, t + 1.15);
    const v = this.osc(c, 'sine', 6, t, end), vg = c.createGain(); vg.gain.value = 4; v.connect(vg); vg.connect(o.frequency);
    const f = this.filt(c, 'lowpass', 1400, 2); o.connect(f); f.connect(this.gain(c, t, .32, .08, .3, .8));
  },
  clap(c, t) { for (let i = 0; i < 4; i++) this.burstN(c, t + i * .16 + Math.random() * .02, .07, 1400, 'bandpass', .85, 1.1); },
  flip(c, t) { const s = this.noise(c), f = this.filt(c, 'bandpass', 1700, .7); f.frequency.linearRampToValueAtTime(900, t + .45); s.connect(f); f.connect(this.gain(c, t, .13, .16, .3)); s.start(t); s.stop(t + .55); },
  knock(c, t, n = 1) { for (let i = 0; i < n; i++) { const tt = t + i * .17; this.burstN(c, tt, .05, 900, 'bandpass', .7, 2); const o = this.osc(c, 'sine', 190, tt, tt + .14); o.frequency.exponentialRampToValueAtTime(90, tt + .1); o.connect(this.gain(c, tt, .55, .002, .1)); } },
  saw(c, t) { for (let i = 0; i < 4; i++) { const tt = t + i * .22, s = this.noise(c), f = this.filt(c, 'bandpass', i % 2 ? 2400 : 1700, 3); f.frequency.linearRampToValueAtTime(i % 2 ? 1700 : 2500, tt + .2); s.connect(f); f.connect(this.gain(c, tt, .45, .03, .15)); s.start(tt); s.stop(tt + .26); } },
  trumpet(c, t) { this.cv(c, t, [{ v: 'u', v2: 'a', d: .95, f: [420, 660, 600, 500] }], { k: 1.3, src: 'square', vib: [7, 16], v: .75 }); },
  thunder(c, t) {
    const s = this.noise(c), f = this.filt(c, 'lowpass', 900, .7); f.frequency.exponentialRampToValueAtTime(110, t + 1.6);
    const g = c.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.95, t + .04); g.gain.exponentialRampToValueAtTime(.45, t + .45); g.gain.exponentialRampToValueAtTime(.0001, t + 2.2); g.connect(this.out);
    s.connect(f); f.connect(g); s.start(t); s.stop(t + 2.3);
    const o = this.osc(c, 'sine', 52, t, t + 1.5); o.connect(this.gain(c, t, .45, .02, 1.3));
  },
  rain(c, t, d = 1.8) {
    const s = this.noise(c), f = this.filt(c, 'highpass', 1700, .5), g = c.createGain();
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .3); g.gain.setValueAtTime(.18, t + d - .4); g.gain.exponentialRampToValueAtTime(.0001, t + d); g.connect(this.out);
    s.connect(f); f.connect(g); s.start(t); s.stop(t + d + .05);
    for (let i = 0; i < 16; i++) this.tone(c, t + .1 + Math.random() * (d - .3), 1800 + Math.random() * 2600, .03, 'sine', .05, .001);
  },
  splash(c, t) { const s = this.noise(c), f = this.filt(c, 'bandpass', 2000, .8); f.frequency.exponentialRampToValueAtTime(380, t + .5); s.connect(f); f.connect(this.gain(c, t, .95, .005, .55)); s.start(t); s.stop(t + .65); this.bubbles(c, t + .25, 5); },
  bubbles(c, t, n = 6) { for (let i = 0; i < n; i++) { const tt = t + i * .09 + Math.random() * .04, f0 = 380 + Math.random() * 500, o = this.osc(c, 'sine', f0, tt, tt + .1); o.frequency.exponentialRampToValueAtTime(f0 * 2.3, tt + .07); o.connect(this.gain(c, tt, .2, .005, .07)); } },
  coo(c, t) { this.cv(c, t, [{ v: 'u', d: .2, f: [380, 400] }, { v: 'u', d: .38, f: [400, 350, 370], gap: .05 }], { k: 1.15, src: 'triangle', vib: [9, 10], v: .9 }); },
  door(c, t) { const o = this.osc(c, 'sine', 120, t, t + .55); o.frequency.exponentialRampToValueAtTime(46, t + .32); o.connect(this.gain(c, t, .95, .004, .42)); this.burstN(c, t, .12, 600, 'lowpass', .55); this.knock(c, t + .02, 1); },
  heehaw(c, t) { this.cv(c, t, [{ v: 'i', d: .24, f: [640, 720] }, { v: 'o', d: .3, f: [340, 280], gap: .02 }, { v: 'i', d: .24, f: [660, 740], gap: .08 }, { v: 'o', d: .34, f: [350, 270], gap: .02 }], { k: 1.05, vib: [6, 10] }); },
  moo(c, t) { this.cv(c, t, [{ v: 'u', v2: 'o', v3: 'u', d: 1.05, f: [190, 222, 150] }], { k: 1.05, vib: [5, 4], v: .95 }); },
  choir(c, t, chord = ['C4', 'E4', 'G4', 'C5', 'E5']) {
    chord.forEach((n, i) => { const f = NOTE(n); for (const det of [-4, 4]) { const o = this.osc(c, 'triangle', f, t, t + 2.6); o.detune.value = det; const vb = this.osc(c, 'sine', 5 + i * .3, t, t + 2.6), vg = c.createGain(); vg.gain.value = f * .006; vb.connect(vg); vg.connect(o.frequency); const fl = this.filt(c, 'lowpass', 1900, .7); o.connect(fl); fl.connect(this.gain(c, t + i * .05, .055, .5, 1.3, .5)); } });
  },
  lullaby(c, t) { [['E5', 0], ['G5', .36], ['G5', .56], ['E5', .92], ['C5', 1.28], ['D5', 1.64], ['E5', 2.0]].forEach(([n, dt]) => { const f = NOTE(n); this.tone(c, t + dt, f, .9, 'sine', .15); this.tone(c, t + dt, f * 2, .4, 'sine', .045); this.tone(c, t + dt, f * 3, .2, 'sine', .015); }); },
  wind(c, t) { const s = this.noise(c), f = this.filt(c, 'bandpass', 400, 1.4); f.frequency.linearRampToValueAtTime(1200, t + .8); f.frequency.linearRampToValueAtTime(480, t + 1.6); s.connect(f); f.connect(this.gain(c, t, .5, .4, .7, .4)); s.start(t); s.stop(t + 1.7); },
  squeak(c, t, p = 1) { const o = this.osc(c, 'sine', 1400 * p, t, t + .16); o.frequency.exponentialRampToValueAtTime(2300 * p, t + .08); o.connect(this.gain(c, t, .22, .005, .1)); },
  quack(c, t) { this.cv(c, t, [{ v: 'a', d: .15, f: [460, 380] }, { v: 'a', d: .17, f: [470, 370], gap: .09 }], { k: 1.22, nasal: 1250, v: .9 }); },
  twinkle(c, t) { ['C6', 'E6', 'G6', 'C7'].forEach((n, i) => this.tone(c, t + i * .07, NOTE(n), .6, 'sine', .09)); },
  seagull(c, t) { this.cv(c, t, [{ v: 'a', d: .18, f: [950, 1250, 820] }, { v: 'a', d: .18, f: [980, 1280, 840], gap: .06 }, { v: 'a', d: .24, f: [960, 1220, 760], gap: .06 }], { k: 1.45, v: .7 }); },
  gift(c, t) { this.twinkle(c, t); this.tone(c, t, NOTE('G4'), 1.2, 'triangle', .08, .2); },
  tweet(c, t, n = 3) { for (let i = 0; i < n; i++) { const tt = t + i * .13, f0 = 2500 + Math.random() * 700, o = this.osc(c, 'sine', f0, tt, tt + .12); o.frequency.exponentialRampToValueAtTime(f0 * 1.45, tt + .04); o.frequency.exponentialRampToValueAtTime(f0 * .85, tt + .1); o.connect(this.gain(c, tt, .13, .004, .09)); } },
  hiss(c, t, d = .9) { const s = this.noise(c), f = this.filt(c, 'highpass', 4200, .7); s.connect(f); f.connect(this.gain(c, t, .3, .12, d * .5, d * .3)); s.start(t); s.stop(t + d + .2); },
  crowd(c, t, d = 1.6) {
    const s = this.noise(c), f = this.filt(c, 'bandpass', 520, .9), g = c.createGain();
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.24, t + .35); g.gain.setValueAtTime(.24, t + d - .4); g.gain.exponentialRampToValueAtTime(.0001, t + d); g.connect(this.out);
    s.connect(f); f.connect(g); s.start(t); s.stop(t + d + .05);
    for (let i = 0; i < 10; i++) { const tt = t + .1 + Math.random() * (d - .4), f0 = 130 + Math.random() * 140, o = this.osc(c, 'sawtooth', f0, tt, tt + .24); o.frequency.linearRampToValueAtTime(f0 * (Math.random() < .5 ? .8 : 1.25), tt + .2); const fl = this.filt(c, 'bandpass', 700 + Math.random() * 500, 3); o.connect(fl); fl.connect(this.gain(c, tt, .08, .03, .17)); }
  },
  crackle(c, t, d = 1.2) {
    for (let i = 0; i < 18; i++) this.burstN(c, t + Math.random() * d, .012 + Math.random() * .02, 2500 + Math.random() * 3000, 'bandpass', .25 + Math.random() * .3, 1.5);
    const s = this.noise(c), f = this.filt(c, 'lowpass', 420, .7); s.connect(f); f.connect(this.gain(c, t, .2, .2, d * .5, d * .3)); s.start(t); s.stop(t + d + .1);
  },
  tambourine(c, t, n = 4) { for (let i = 0; i < n; i++) { const tt = t + i * .22; this.burstN(c, tt, .14, 7500, 'highpass', .3, .7); [5200, 6600, 8100].forEach(f => this.tone(c, tt, f * (1 + Math.random() * .03), .16, 'triangle', .02, .002)); const o = this.osc(c, 'sine', 180, tt, tt + .12); o.frequency.exponentialRampToValueAtTime(90, tt + .1); o.connect(this.gain(c, tt, .25, .002, .1)); } },
  rush(c, t, d = 2.2) {
    const s = this.noise(c), f = this.filt(c, 'lowpass', 300, .8), g = c.createGain();
    f.frequency.exponentialRampToValueAtTime(1800, t + d * .5); f.frequency.exponentialRampToValueAtTime(500, t + d);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.7, t + d * .4); g.gain.exponentialRampToValueAtTime(.0001, t + d); g.connect(this.out);
    s.connect(f); f.connect(g); s.start(t); s.stop(t + d + .05); this.wind(c, t + .2);
  },
  shh(c, t) { const s = this.noise(c), f = this.filt(c, 'bandpass', 3200, 1.6); s.connect(f); f.connect(this.gain(c, t, .38, .06, .3, .25)); s.start(t); s.stop(t + .7); },
  crunch(c, t) { for (let i = 0; i < 5; i++) this.burstN(c, t + i * .05 + Math.random() * .02, .03, 1800 + Math.random() * 1500, 'bandpass', .5, 1.2); },
  gallop(c, t, n = 9) { for (let i = 0; i < n; i++) { const tt = t + Math.floor(i / 3) * .42 + (i % 3) * .11; this.burstN(c, tt, .04, 700, 'bandpass', .45, 2); const o = this.osc(c, 'sine', 160, tt, tt + .1); o.frequency.exponentialRampToValueAtTime(80, tt + .08); o.connect(this.gain(c, tt, .32, .002, .08)); } }
};

/* ---------------- O QUE FICA GUARDADO NO APARELHO ---------------- */
const Settings = {
  v: { sound: true },
  load() {
    try { Object.assign(this.v, JSON.parse(store.get('ov:ajustes') || '{}')); } catch (e) { }
    Sound.on = !!this.v.sound;
  },
  set(k, val) {
    this.v[k] = val; store.set('ov:ajustes', JSON.stringify(this.v));
    Sound.on = !!this.v.sound;
  }
};
const Progress = {
  page(id) { return +store.get('ov:pagina:' + id) || 0; },
  setPage(id, i) { store.set('ov:pagina:' + id, i); },
  done(id) { return store.get('ov:lido:' + id) === '1'; },
  setDone(id) { store.set('ov:lido:' + id, '1'); },
  reset() { for (const b of Ov.books) { store.del('ov:pagina:' + b.id); store.del('ov:lido:' + b.id); } }
};

/* ---------------- FERRAMENTAS PARA AS CENAS ---------------- */
function makeApi(root, sc) {
  const svg = root.querySelector('svg'), fx = svg.querySelector('.fx'), world = svg.querySelector('.world');
  const timers = new Set(), bubbles = {}, badges = {};
  let dead = false;
  const vb = svg.viewBox && svg.viewBox.baseVal ? [svg.viewBox.baseVal.width || 800, svg.viewBox.baseVal.height || 800] : [800, 800];
  const api = {
    svg, fx, st: {}, touched: false, cueEl: null,
    q: k => svg.querySelector(`[data-k="${k}"]`),
    act: el => el ? (el.querySelector(':scope > .act') || el) : null,
    part: (el, p) => el ? el.querySelector(`[data-p="${p}"]`) : null,
    later(fn, ms) { const t = setTimeout(() => { timers.delete(t); if (!dead) fn(); }, RM.matches ? Math.min(ms, 200) : ms); timers.add(t); return t; },
    wait(ms) { return new Promise(r => api.later(r, ms)); },
    anim(el, frames, o = {}) {
      if (!el || dead) return Promise.resolve();
      const opt = Object.assign({ duration: 600, easing: 'ease-in-out' }, o);
      if (RM.matches) { opt.duration = Math.min(opt.duration, 160); opt.delay = 0; }
      try { return el.animate(frames, opt).finished.catch(() => { }); } catch (e) { return Promise.resolve(); }
    },
    snd: (...a) => Sound.play(...a),
    tap(el, label, fn) {
      if (!el) return;
      el.classList.add('tap');
      el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0'); el.setAttribute('aria-label', tr(label));
      const go = e => {
        e.stopPropagation();
        if (dead || Book.busy || performance.now() - Book.swipedAt < 450) return;
        Sound.init(); api.touched = true; api.hideCue();
        try { fn(e); } catch (err) { console.error(err); }
      };
      el.addEventListener('click', go);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); } });
    },
    pos(el) {
      const t = (el && el.getAttribute('transform')) || '';
      const m = /translate\(\s*([-\d.]+)[\s,]+([-\d.]+)\s*\)/.exec(t), s = /scale\(\s*([-\d.]+)/.exec(t);
      return [m ? +m[1] : 0, m ? +m[2] : 0, s ? Math.abs(+s[1]) : 1];
    },
    hop(el, h = 22) {
      return api.anim(api.act(el), [{ transform: 'translateY(0px) scale(1,1)' }, { transform: `translateY(${-h}px) scale(.96,1.04)`, offset: .4 }, { transform: 'translateY(0px) scale(1.04,.96)', offset: .8 }, { transform: 'translateY(0px) scale(1,1)' }], { duration: 440, easing: 'ease-out' });
    },
    wave(el, part = 'armR') { return api.anim(api.part(el, part), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-24deg)' }, { transform: 'rotate(14deg)' }, { transform: 'rotate(-24deg)' }, { transform: 'rotate(0deg)' }], { duration: 1000 }); },
    shakeHead(el) { return api.anim(api.part(el, 'head'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(0deg)' }], { duration: 700 }); },
    strum(el) {
      el.querySelectorAll('.str').forEach((s, i) => api.anim(s, [{ transform: 'translateX(0px)' }, { transform: 'translateX(1.8px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(1px)' }, { transform: 'translateX(0px)' }], { duration: 300, delay: i * 25 }));
      api.anim(api.part(el, 'foreR'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-16deg)' }, { transform: 'rotate(0deg)' }], { duration: 260 });
    },
    shake(px = 10) {
      api.anim(world, [{ transform: 'translate(0px,0px)' }, { transform: `translate(${-px}px,${px * .5}px)` }, { transform: `translate(${px * .8}px,${-px * .4}px)` }, { transform: `translate(${-px * .5}px,${px * .3}px)` }, { transform: `translate(${px * .3}px,0px)` }, { transform: 'translate(0px,0px)' }], { duration: 460 });
    },
    nudgeNext(delay = 600) { api.later(() => Book.nudge(root), delay); },
    bubble(x, y, text, o = {}) {
      if (dead) return null;
      text = tr(text);
      const key = o.key || 'b';
      if (bubbles[key]) bubbles[key].remove();
      const fs = o.size || 30, lh = fs * 1.16;
      const g = svgEl('g', { class: 'bub', transform: `translate(${r1(x)},${r1(y)})` }), inner = svgEl('g');
      g.append(inner); fx.append(g);
      const lines = o.plain ? [text] : wrapText(text, o.wrap || 20);
      const t = svgEl('text', { 'font-size': fs, 'text-anchor': 'middle' });
      lines.forEach((ln, i) => { const ts = svgEl('tspan', { x: 0, dy: i ? lh : 0 }); ts.textContent = ln; t.append(ts); });
      if (o.plain) {
        t.setAttribute('class', 'plain'); inner.append(t);
        api.anim(inner, [{ transform: 'translateY(0px) scale(.3)', opacity: 0 }, { transform: 'translateY(-20px) scale(1.2)', opacity: 1, offset: .3 }, { transform: 'translateY(-60px) scale(1)', opacity: 0 }], { duration: o.dur || 1200, fill: 'forwards' }).then(() => g.remove());
        return g;
      }
      inner.append(t);
      let bb; try { bb = t.getBBox(); } catch (e) { bb = null; }
      if (!bb || !bb.width) bb = { x: -text.length * fs * .27, y: -fs * .8, width: Math.min(text.length, 20) * fs * .54, height: lh * lines.length };
      const px = fs * .62, py = fs * .42, w = bb.width + px * 2, h = bb.height + py * 2, tail = fs * .75;
      const V = svg.viewBox.baseVal, vTop = svg.dataset.vw ? V.y : 0, vX = svg.dataset.vw ? V.x : 0, vW = svg.dataset.vw ? V.width : vb[0];
      const up = !o.below && (y - tail - h >= Math.max(118, vTop + 10));
      const by = up ? y - tail - h : y + tail;
      const half = w / 2, cx = clamp(Math.max(78, vX + 16) + half, x, Math.min(vb[0] - 78, vX + vW - 16) - half), bx = cx - half;
      const tx = clamp(bx + fs * .7, x, bx + w - fs * .7) - x;
      const ry = by - y, edge = up ? ry + h - 1.5 : ry + 1.5;
      const tailD = `M${r1(tx - fs * .34)},${r1(edge)} L0,0 L${r1(tx + fs * .34)},${r1(edge)}`;
      const tailS = svgEl('path', { d: tailD, fill: '#fffdf6', stroke: OL, 'stroke-width': 3.4, 'stroke-linejoin': 'round' });
      const rect = svgEl('rect', { x: r1(bx - x), y: r1(ry), width: r1(w), height: r1(h), rx: r1(Math.min(h / 2, fs * .8)), fill: '#fffdf6', stroke: OL, 'stroke-width': 3.4 });
      const tailF = svgEl('path', { d: tailD + 'Z', fill: '#fffdf6' });
      inner.insertBefore(tailS, t); inner.insertBefore(rect, t); inner.insertBefore(tailF, t);
      t.setAttribute('transform', `translate(${r1(cx - x)},${r1(ry + py - bb.y)})`);
      bubbles[key] = g;
      api.anim(inner, [{ transform: 'scale(.2)', opacity: 0 }, { transform: 'scale(1.07)', opacity: 1, offset: .7 }, { transform: 'scale(1)', opacity: 1 }], { duration: 320, easing: 'ease-out' });
      const dur = o.dur ?? Math.max(1700, 900 + text.length * 55);
      api.later(() => {
        if (bubbles[key] !== g) return;
        api.anim(inner, [{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' }).then(() => { g.remove(); if (bubbles[key] === g) delete bubbles[key]; });
      }, dur);
      return g;
    },
    burst(x, y, kind, n = 6, o = {}) {
      if (dead) return;
      const R = Math.random;
      for (let i = 0; i < n; i++) {
        const g = svgEl('g', { transform: `translate(${r1(x)},${r1(y)})`, class: 'fxp' }), p = svgEl('g');
        g.append(p);
        let shape = '', frames, dur = 1100, easing = 'ease-out', delay = 0;
        if (kind === 'heart') {
          shape = `<path d="${HEART}" transform="scale(1.3)" fill="${['#e8475f', '#ff7aa2', '#f25c78'][i % 3]}" stroke="${OL}" stroke-width="1.8"/>`;
          const dx = (R() - .5) * 130, dy = -90 - R() * 90, s = .9 + R() * .6;
          frames = [{ transform: 'translate(0px,0px) scale(.3)', opacity: 0 }, { transform: `translate(${dx * .4}px,${dy * .4}px) scale(${s})`, opacity: 1, offset: .3 }, { transform: `translate(${dx}px,${dy}px) scale(${s * .8})`, opacity: 0 }];
          dur = 1200 + R() * 400; delay = i * 60;
        } else if (kind === 'note') {
          shape = `<g transform="scale(1.4)">${note(['#2f6db5', '#d9433b', '#3a9a4a', '#8a4bb5'][(i + Math.floor(R() * 4)) % 4])}</g>`;
          const dx = (R() - .5) * 100, dy = -120 - R() * 70;
          frames = [{ transform: 'translate(0px,0px) rotate(0deg) scale(.5)', opacity: 0 }, { transform: `translate(${dx * .5}px,${dy * .5}px) rotate(${(R() - .5) * 30}deg) scale(1.1)`, opacity: 1, offset: .35 }, { transform: `translate(${dx}px,${dy}px) rotate(${(R() - .5) * 40}deg) scale(1)`, opacity: 0 }];
          dur = 1400; delay = i * 90;
        } else if (kind === 'spark' || kind === 'star') {
          const col = o.col || '#ffd84a';
          shape = kind === 'star' ? `<path d="${STAR5(14)}" fill="${col}" stroke="${OL}" stroke-width="2"/>` : `<path d="${sparkle(15)}" fill="${col}" stroke="#fffbe8" stroke-width="2"/><circle r="4" fill="#fffbe8"/>`;
          const a = (i / n) * Math.PI * 2 + R() * .5, d = 70 + R() * 70;
          frames = [{ transform: 'translate(0px,0px) scale(.2) rotate(0deg)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(${1 + R() * .6}) rotate(${(R() - .5) * 180}deg)`, opacity: 0 }];
          dur = 850 + R() * 300;
        } else if (kind === 'dust') {
          shape = `<circle r="${r1(15 + R() * 12)}" fill="#ece0c6" opacity=".95"/>`;
          const dx = (R() - .5) * 240, dy = -14 - R() * 46;
          frames = [{ transform: 'translate(0px,0px) scale(.3)', opacity: .95 }, { transform: `translate(${dx}px,${dy}px) scale(${1.5 + R()})`, opacity: 0 }];
          dur = 900 + R() * 400;
        } else if (kind === 'confetti') {
          shape = `<rect x="-6" y="-3.5" width="12" height="7" rx="2" fill="${['#e0473e', '#f2c14e', '#3f93c7', '#5fb35a', '#e86a9a'][i % 5]}"/>`;
          const dx = (R() - .5) * 420, up = -60 - R() * 100, dn = 300 + R() * 200;
          frames = [{ transform: 'translate(0px,0px) rotate(0deg)', opacity: 1 }, { transform: `translate(${dx * .5}px,${up}px) rotate(${R() * 360}deg)`, opacity: 1, offset: .3 }, { transform: `translate(${dx}px,${dn}px) rotate(${R() * 720}deg)`, opacity: 0 }];
          dur = 1900 + R() * 700; easing = 'linear';
        } else if (kind === 'wave') {
          shape = `<path d="M0,-20 Q14,0 0,20" fill="none" stroke="#fffaf0" stroke-width="6" stroke-linecap="round"/>`;
          frames = [{ transform: 'translate(0px,0px) scale(.5)', opacity: 0 }, { transform: 'translate(34px,-24px) scale(1.4)', opacity: 1, offset: .35 }, { transform: 'translate(80px,-56px) scale(2.1)', opacity: 0 }];
          dur = 900; delay = i * 170;
        } else if (kind === 'ripple') {
          shape = `<ellipse rx="22" ry="8" fill="none" stroke="#ffffff" stroke-width="3.4"/>`;
          frames = [{ transform: 'scale(.3)', opacity: 1 }, { transform: `scale(${2.6 + i * .5})`, opacity: 0 }];
          dur = 1200; delay = i * 220;
        }
        p.innerHTML = shape; fx.append(g);
        try { p.animate(frames, { duration: RM.matches ? 200 : dur, easing, delay: RM.matches ? 0 : delay, fill: 'both' }).finished.then(() => g.remove(), () => g.remove()); } catch (e) { g.remove(); }
      }
    },
    badge(x, y, txt, o = {}) {
      const key = o.key || txt;
      txt = tr(String(txt));
      if (badges[key]) badges[key].remove();
      const g = svgEl('g', { transform: `translate(${r1(x)},${r1(y)})`, class: 'badge' }), p = svgEl('g');
      g.append(p);
      p.innerHTML = `<circle r="27" fill="#ffd84a" stroke="${OL}" stroke-width="3.4"/><text y="12" text-anchor="middle" font-size="34" fill="${OL}">${esc(txt)}</text>`;
      fx.append(g); badges[key] = g;
      api.anim(p, [{ transform: 'scale(0)' }, { transform: 'scale(1.35)', offset: .6 }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
      return g;
    },
    drop(x1, y1, x2, y2, col = '#f2c230') {
      if (dead) return;
      const g = svgEl('g', { transform: `translate(${r1(x1)},${r1(y1)})` }), p = svgEl('g');
      g.append(p);
      p.innerHTML = `<path d="M0,-11 C7,-2 9,5 0,9 C-9,5 -7,-2 0,-11 Z" transform="scale(1.5)" fill="${col}" stroke="${OL}" stroke-width="1.4"/>`;
      fx.append(g);
      api.anim(p, [{ transform: 'translate(0px,0px) scale(.5)', opacity: 1 }, { transform: `translate(${x2 - x1}px,${y2 - y1}px) scale(1)`, opacity: 1 }], { duration: 430, easing: 'cubic-bezier(.5,0,1,1)', fill: 'forwards' }).then(() => { g.remove(); api.burst(x2, y2, 'spark', 3, { col }); });
    },
    fly(x1, y1, x2, y2) {
      if (dead) return;
      const g = svgEl('g', { transform: `translate(${r1(x1)},${r1(y1)})` }), p = svgEl('g');
      g.append(p);
      p.innerHTML = `<g transform="scale(1.4)">${note(['#2f6db5', '#d9433b', '#3a9a4a', '#8a4bb5'][Math.floor(Math.random() * 4)])}</g>`;
      fx.append(g);
      const dx = x2 - x1, dy = y2 - y1;
      api.anim(p, [{ transform: 'translate(0px,0px) scale(.6)', opacity: 0 }, { transform: `translate(${dx * .5}px,${dy * .5 - 80}px) scale(1.2) rotate(-12deg)`, opacity: 1, offset: .5 }, { transform: `translate(${dx}px,${dy}px) scale(.9) rotate(10deg)`, opacity: 0 }], { duration: 1100, fill: 'forwards' }).then(() => g.remove());
    },
    showCue() {
      if (dead || !sc.cue) return;
      api.hideCue(true);
      const [x, y] = sc.cue;
      const g = svgEl('g', { class: 'cue', transform: `translate(${x},${y})` });
      g.innerHTML = `<circle class="pulse" r="42" fill="none" stroke="#ffffff" stroke-width="7"/><circle class="pulse" style="animation-delay:.8s" r="42" fill="none" stroke="#ffd84a" stroke-width="6"/><g transform="translate(10,14) rotate(-16)"><g class="tapme">${HAND}</g></g>`;
      fx.append(g); api.cueEl = g;
    },
    hideCue(now) {
      const g = api.cueEl; if (!g) return; api.cueEl = null;
      if (now) g.remove(); else api.anim(g, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).then(() => g.remove());
    },
    destroy() { dead = true; timers.forEach(clearTimeout); timers.clear(); }
  };
  return api;
}

/* ---------------- ÍCONES DA INTERFACE ---------------- */
const IC = (d, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"${extra}>${d}</svg>`;
const ICON = {
  scroll: IC('<path d="M7 4h11a2 2 0 0 1 0 4h-1v10a2 2 0 0 1-2 2H6a2 2 0 0 1 0-4h1z"/><path d="M7 16V4M10 8h4M10 12h4"/>'),
  star: IC('<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8L3.6 9.6l5.8-.8z" fill="currentColor" stroke="none"/>'),
  hand: IC('<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.9-2.6L4.4 15a1.6 1.6 0 0 1 2.6-1.8L9 15"/>'),
  chat: IC('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'),
  replay: IC('<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>'),
  book: IC('<path d="M3 5.5C5.5 4 8.5 4 12 6c3.5-2 6.5-2 9-.5V19c-2.5-1.5-5.5-1.5-9 .5-3.5-2-6.5-2-9-.5z"/><path d="M12 6v13.5"/>'),
  shelf: IC('<path d="M4 20h16M5 20V5.5h4V20M10 20V8h4v12M15.2 20l-1-11.6 3.8-.5 1.2 11.6"/>'),
  next: IC('<path d="M5 12h13M13 6l6 6-6 6"/>'),
  lock: IC('<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'),
  close: IC('<path d="M6 6l12 12M18 6L6 18"/>', ' stroke-width="2.6"'),
  check: IC('<path d="M5 12.5l4.5 4.5L19 7.5"/>', ' stroke-width="2.8"'),
  back: IC('<path d="M10 7l-5 5 5 5M5 12h14"/>'),
  copy: IC('<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>'),
  phone: IC('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'),
  share: IC('<path d="M12 15V3.5M8 7.5l4-4 4 4"/><path d="M7 11H5.5v9.5h13V11H17"/>')
};

/* ---------------- O LEITOR DE LIVROS ---------------- */
let BUILD = 0;
function moveKeep(el, parent) {
  if (!el) return;
  const isCss = a => (typeof CSSAnimation !== 'undefined' && a instanceof CSSAnimation) || !!a.animationName;
  let before = null;
  try { before = el.getAnimations({ subtree: true }).filter(isCss).map(a => a.currentTime); } catch (e) { }
  parent.appendChild(el);
  if (before && before.length) {
    try {
      const after = el.getAnimations({ subtree: true }).filter(isCss);
      if (after.length === before.length) after.forEach((a, i) => { if (before[i] != null) a.currentTime = before[i]; });
    } catch (e) { }
  }
}
// quando a ilustração não é quadrada, corta mais em cima (céu) do que em baixo (chão, pés, animais)
const CROP_TOP = .78;
const cropRO = typeof ResizeObserver === 'function' ? new ResizeObserver(es => { for (const e of es) cropScene(e.target); }) : null;
function cropScene(svg) {
  const vw = +svg.dataset.vw, vh = +svg.dataset.vh, w = svg.clientWidth, h = svg.clientHeight;
  if (!vw || !vh || !w || !h) return;
  const k = Math.max(w / vw, h / vh), cw = w / k, ch = h / k;
  svg.setAttribute('viewBox', `${((vw - cw) / 2).toFixed(1)} ${((vh - ch) * CROP_TOP).toFixed(1)} ${cw.toFixed(1)} ${ch.toFixed(1)}`);
}
function destroyEl(el) {
  if (!el) return;
  const all = [el, ...el.querySelectorAll('.illus')];
  for (const x of all) { if (x._api) x._api.destroy(); const sv = x.querySelector && x.querySelector('svg.scene[data-vw]'); if (sv && cropRO) cropRO.unobserve(sv); }
  el.remove();
}
function coverTitleHTML(c) {
  return `${c.pre ? `<span class="pre">${esc(tr(c.pre))}</span>` : ''}${esc(tr(c.title))}${c.small ? `<span>${esc(tr(c.small))}</span>` : ''}`;
}
// aspas do versículo em cada língua
function quoted(t) { return { pt: `«${t}»`, es: `«${t}»`, fr: `«\u00a0${t}\u00a0»` }[I18N.lang] || `“${t}”`; }

const Book = {
  def: null, scenes: [], cur: 0, mode: '', busy: false, swipedAt: 0, N: 0, active: false,
  init() {
    this.stage = document.getElementById('stage');
    this.book = document.getElementById('book');
    this.prevB = document.getElementById('prev');
    this.nextB = document.getElementById('next');
    this.dotsEl = document.getElementById('dots');
    this.countEl = document.getElementById('count');
    this.titleEl = document.getElementById('bookTitle');
    this.prevB.onclick = () => this.prev();
    this.nextB.onclick = () => this.next();
    window.addEventListener('resize', () => { clearTimeout(this.rt); this.rt = setTimeout(() => { if (this.active) this.layout(); }, 140); });
    try { document.fonts.ready.then(() => { if (this.active) this.refit(); }); } catch (e) { }
    const st = this.stage;
    st.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button) return; this.sw = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    st.addEventListener('pointercancel', () => { this.sw = null; });
    st.addEventListener('pointerup', e => {
      const s = this.sw; this.sw = null; if (!s || !this.active) return;
      const dx = e.clientX - s.x, dy = e.clientY - s.y, dt = performance.now() - s.t;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 900) { this.swipedAt = performance.now(); dx < 0 ? this.next() : this.prev(); }
    });
    document.addEventListener('keydown', e => {
      if (!this.active || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (!document.getElementById('index').hidden) { if (e.key === 'Escape') Index.close(); return; }
      if (!document.getElementById('parents').hidden) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); this.next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); this.prev(); }
      else if (e.key === 'Home') { e.preventDefault(); this.go(0); }
      else if (e.key === 'End') { e.preventDefault(); this.go(this.N - 1); }
      else if (e.key === 'Escape') { e.preventDefault(); App.home(); }
    });
  },
  open(def, page = 0) {
    this.def = def; this.scenes = def.scenes; this.N = def.scenes.length;
    this.cur = clamp(0, page | 0, this.N - 1);
    this.active = true;
    this.titleEl.textContent = tr(def.title);
    this.dotsEl.innerHTML = this.scenes.map((s, i) => `<button class="dot" type="button" aria-label="${esc(i ? (s.end ? T('end') : T('pageTitle', { n: i, t: tr(s.title) })) : T('cover'))}"></button>`).join('');
    [...this.dotsEl.children].forEach((d, i) => d.onclick = () => this.go(i));
    Index.reset();
    this.mode = '';
    this.layout(true);
  },
  close() {
    this.active = false; this.busy = false;
    clearTimeout(this.ct);
    [...this.book.children].forEach(destroyEl);
  },
  layout(force) {
    const r = this.stage.getBoundingClientRect(), W = r.width, H = r.height, b = this.book.style;
    if (!W || !H) return;
    const mode = W >= 660 && W / H >= 1.08 ? 'wide' : 'stack';
    if (mode === 'wide') {
      // celular deitado (tela baixa): páginas mais largas para o texto caber
      let ph = Math.min(H - 18, 880), pw = Math.min(ph * (H < 420 ? 1.36 : .86), (W - 8) / 2);
      ph = Math.min(ph, pw / .74);
      pw = Math.floor(pw); ph = Math.floor(ph);
      b.setProperty('--pw', pw + 'px'); b.setProperty('--bw', 2 * pw + 'px'); b.setProperty('--bh', ph + 'px');
      b.setProperty('--fs', clamp(15, Math.min(ph * .034, pw * .041), 26).toFixed(1) + 'px');
      b.setProperty('--cfs', clamp(12, Math.min(pw * .046, ph * .036), 26).toFixed(1) + 'px');
    } else {
      const sw = Math.floor(Math.max(Math.min(W, 320), Math.min(W, 640, (H - 300) / .7))), sh = Math.floor(Math.min(H - 8, sw * 2.2));
      const ih = Math.round(clamp(sw * .78, sh - 330, sw * .98));
      b.setProperty('--pw', sw + 'px'); b.setProperty('--bw', sw + 'px'); b.setProperty('--bh', sh + 'px'); b.setProperty('--ih', ih + 'px');
      b.setProperty('--fs', clamp(15, sw * .045, 20).toFixed(1) + 'px');
      b.setProperty('--cfs', clamp(12, Math.min(sw * .052, sh * .03), 23).toFixed(1) + 'px');
    }
    if (force || mode !== this.mode) { this.mode = mode; this.renderNow(this.cur); }
    else this.refit();
  },
  // se o texto não couber: no celular em pé a ilustração encolhe um pouco (até 72% da largura);
  // depois, se ainda faltar espaço, a letra diminui um pouco (até 13,5 px)
  fit(el) {
    if (!el || !el.isConnected || !el.classList) return;
    const tp = el.classList.contains('sheet') ? el.querySelector(':scope > .tp') : el;
    if (!tp || !tp.classList.contains('tp')) return;
    const sheet = tp.parentElement && tp.parentElement.classList.contains('sheet') ? tp.parentElement : null;
    tp.style.fontSize = '';
    if (sheet) {
      sheet.style.gridTemplateRows = '';
      const cs = getComputedStyle(this.book);
      const ih = parseFloat(cs.getPropertyValue('--ih')) || 0, pw = parseFloat(cs.getPropertyValue('--pw')) || sheet.clientWidth;
      const over = tp.scrollHeight - tp.clientHeight;
      if (over > 1 && ih) {
        const nh = Math.max(Math.round(pw * .78), Math.round(ih - over - 6));
        if (nh < ih) sheet.style.gridTemplateRows = `${nh}px minmax(0, 1fr)`;
      }
    }
    let fs = parseFloat(getComputedStyle(tp).fontSize) || 16, n = 0;
    while (tp.scrollHeight - tp.clientHeight > 1 && fs > 13.5 && n++ < 16) { fs -= .5; tp.style.fontSize = fs + 'px'; }
    // ainda não coube: a página rola e o fim fica esmaecido até a criança rolar até o fim
    const more = () => tp.classList.toggle('more', tp.scrollTop + tp.clientHeight < tp.scrollHeight - 2);
    more(); tp.onscroll = more;
  },
  refit() {
    if (this.mode === 'stack') { if (this.S) this.fit(this.S.firstElementChild); }
    else if (this.R) { const t = this.R.querySelector(':scope > .tp'); if (t) this.fit(t); }
  },
  renderNow(i) {
    [...this.book.children].forEach(destroyEl);
    this.book.className = 'book' + (this.mode === 'stack' ? ' stack' : '');
    if (this.mode === 'wide') {
      this.L = mk('div', 'slot l'); this.R = mk('div', 'slot r'); this.book.append(this.L, this.R);
      if (i === 0) { this.R.append(this.mkCover()); this.book.classList.add('closed'); }
      else { this.L.append(this.mkIllus(i)); const t = this.mkText(i); this.R.append(t); this.fit(t); }
    } else {
      this.S = mk('div', 'slot s'); this.book.append(this.S);
      const sh = this.mkSheet(i); this.S.append(sh); this.fit(sh);
    }
    this.cur = i;
    this.settle();
  },
  mkIllus(i, thumb) {
    const sc = this.scenes[i];
    P = 'b' + (++BUILD);
    const [vw, vh] = sc.vb || [800, 800];
    const el = mk('div', 'pg illus');
    el.innerHTML = `<svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="${sc.par || 'xMidYMid slice'}"${sc.par ? '' : ` data-vw="${vw}" data-vh="${vh}"`} role="group" aria-label="${esc(tr(sc.alt || sc.title))}"><g class="world">${sc.art()}</g><g class="fx"></g></svg>`;
    if (!sc.par && cropRO) cropRO.observe(el.firstElementChild);
    if (!thumb) {
      const api = makeApi(el, sc); el._api = api;
      try { sc.setup && sc.setup(api); } catch (e) { console.error(e); }
    }
    return el;
  },
  mkCover() {
    const c = this.def.cover, el = mk('div', 'pg cover');
    el.style.setProperty('--cover', this.def.color || '');
    const il = this.mkIllus(0); il.classList.remove('pg');
    el.innerHTML = '<div class="spine"></div>';
    el.append(il);
    const t = mk('div', 'ctitle');
    t.innerHTML = `<span class="kicker">${esc(c.kicker ? tr(c.kicker) : T('kicker'))}</span><h1>${coverTitleHTML(c)}</h1>${c.sub ? `<p class="sub">${esc(tr(c.sub))}</p>` : ''}`;
    const a = mk('div', 'cact');
    const saved = Progress.page(this.def.id);
    a.innerHTML = `<button class="cbtn" type="button" data-open>${ICON.book}<span>${esc(T('open'))}</span></button>` + (saved > 1 && saved < this.N - 1 ? `<button class="cbtn alt" type="button" data-resume>${esc(T('resume', { n: saved }))}</button>` : '');
    a.querySelector('[data-open]').onclick = () => { Sound.init(); this.go(1); };
    const rs = a.querySelector('[data-resume]');
    if (rs) rs.onclick = () => { Sound.init(); this.go(saved); };
    el.append(t, a);
    return el;
  },
  mkText(i) {
    const sc = this.scenes[i], el = mk('div', 'pg tp');
    el.dataset.tint = sc.tint || 'sand';
    if (sc.end) return this.mkEnd(sc, el);
    let h = `<div class="eyebrow">${ICON.scroll}<span>${esc(tr(sc.ref))}</span></div><h2>${esc(tr(sc.title))}</h2><div class="body">`;
    for (const p of sc.text) h += typeof p === 'string' ? `<p>${esc(tr(p))}</p>` : `<p class="q ${p.who}">${esc(tr(p.q))}</p>`;
    h += `</div><div class="foot">`;
    if (sc.fact) h += `<button class="fact" type="button" aria-expanded="false"><span class="tag">${ICON.star}<span>${esc(sc.factLabel ? tr(sc.factLabel) : T('fact'))}</span></span><span class="ft">${esc(tr(sc.fact))}</span></button>`;
    h += `<div class="hintbar"><button class="hint" type="button">${ICON.hand}<span>${esc(tr(sc.hint))}</span></button><span class="pnum" aria-label="${esc(T('page', { n: i }))}">${i}</span></div></div>`;
    el.innerHTML = h;
    const f = el.querySelector('.fact');
    if (f) f.onclick = () => { const o = f.getAttribute('aria-expanded') !== 'true'; f.setAttribute('aria-expanded', String(o)); this.fit(el); if (o) Sound.play('chime', 'A5'); };
    el.querySelector('.hint').onclick = () => this.cue(true);
    return el;
  },
  mkEnd(sc, el) {
    el.classList.add('end');
    const nx = Ov.nextBook(this.def.id);
    let h = `<h2>${esc(T('end'))}</h2><div class="eyebrow">${ICON.chat}<span>${esc(T('talk'))}</span></div><ul class="qs">`;
    sc.questions.forEach(([q, a]) => h += `<li><button type="button" aria-expanded="false"><b>${esc(tr(q))}</b><span>${esc(tr(a))}</span></button></li>`);
    h += `</ul><div class="verse"><span>${esc(quoted(tr(sc.verse[0])))}</span><small>${esc(tr(sc.verse[1]))}</small></div><div class="endacts"><button class="again" type="button" data-again>${ICON.replay}<span>${esc(T('again'))}</span></button><button class="again alt" type="button" data-home>${ICON.shelf}<span>${esc(T('homeShort'))}</span></button>${nx ? `<button class="again gold" type="button" data-next><span>${esc(T('nextBook', { t: tr(nx.title) }))}</span>${ICON.next}</button>` : ''}</div>`;
    el.innerHTML = h;
    el.querySelectorAll('.qs button').forEach(b => b.onclick = () => {
      const o = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(o));
      this.fit(el);
      if (o) Sound.play('chime', 'G5');
    });
    el.querySelector('[data-again]').onclick = () => this.go(0);
    el.querySelector('[data-home]').onclick = () => App.home();
    const n = el.querySelector('[data-next]');
    if (n) n.onclick = () => App.openBook(nx.id, 0);
    return el;
  },
  mkSheet(i) {
    if (i === 0) return this.mkCover();
    const el = mk('div', 'pg sheet');
    const il = this.mkIllus(i); il.classList.remove('pg');
    const tx = this.mkText(i); tx.classList.remove('pg');
    el.append(il, tx);
    return el;
  },
  next() { this.go(this.cur + 1); },
  prev() { this.go(this.cur - 1); },
  go(i) {
    i = clamp(0, i, this.N - 1);
    if (!this.active || this.busy || i === this.cur) return;
    Sound.init();
    this.hideCue();
    const from = this.cur;
    Native.tick();
    if (RM.matches) { this.renderNow(i); return; }
    this.busy = true;
    this.book.classList.add('flipping');
    Sound.play('flip');
    const run = this.mode === 'wide' ? this.flipWide(from, i) : this.flipStack(from, i);
    run.catch(e => { console.error(e); }).then(() => {
      this.book.classList.remove('flipping', 'anim-slide');
      this.busy = false;
      if (!this.active) return;
      if (this.cur !== i) this.cur = i;
      this.settle();
    });
  },
  leaf() {
    const leaf = mk('div', 'leaf'), front = mk('div', 'face front'), back = mk('div', 'face back');
    const fs = mk('div', 'shade'), bs = mk('div', 'shade');
    leaf.append(front, back);
    return { leaf, front, back, fs, bs };
  },
  async flipWide(from, to) {
    const D = 920, ease = 'cubic-bezier(.42,.04,.3,1)';
    const { leaf, front, back, fs, bs } = this.leaf();
    if (to > from) {
      const curR = this.R.firstElementChild, nIl = this.mkIllus(to), nR = this.mkText(to);
      moveKeep(curR, front); front.append(fs);
      back.append(nIl, bs);
      this.R.append(nR); this.fit(nR);
      this.book.append(leaf);
      if (from === 0) { this.book.classList.add('anim-slide'); this.book.classList.remove('closed'); }
      const a = leaf.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }], { duration: D, easing: ease, fill: 'forwards' });
      fs.animate([{ opacity: 0 }, { opacity: .55, offset: .5 }, { opacity: .55 }], { duration: D, easing: ease, fill: 'forwards' });
      bs.animate([{ opacity: .5 }, { opacity: .5, offset: .5 }, { opacity: 0 }], { duration: D, easing: ease, fill: 'forwards' });
      await a.finished;
      const oldL = this.L.firstElementChild;
      moveKeep(nIl, this.L);
      destroyEl(oldL); destroyEl(curR); leaf.remove();
    } else {
      const curL = this.L.firstElementChild, curR = this.R.firstElementChild;
      const nR = to === 0 ? this.mkCover() : this.mkText(to), nIl = to === 0 ? null : this.mkIllus(to);
      leaf.style.transform = 'rotateY(-180deg)';
      moveKeep(curL, back); back.append(bs);
      front.append(nR, fs);
      if (nIl) this.L.append(nIl);
      this.book.append(leaf); this.fit(nR);
      if (to === 0) { this.book.classList.add('anim-slide'); this.book.classList.add('closed'); }
      const a = leaf.animate([{ transform: 'rotateY(-180deg)' }, { transform: 'rotateY(0deg)' }], { duration: D, easing: ease, fill: 'forwards' });
      bs.animate([{ opacity: 0 }, { opacity: .5, offset: .5 }, { opacity: .5 }], { duration: D, easing: ease, fill: 'forwards' });
      fs.animate([{ opacity: .55 }, { opacity: .55, offset: .5 }, { opacity: 0 }], { duration: D, easing: ease, fill: 'forwards' });
      await a.finished;
      moveKeep(nR, this.R);
      destroyEl(curR); destroyEl(curL); leaf.remove();
    }
    this.cur = to;
  },
  async flipStack(from, to) {
    const D = 780, ease = 'cubic-bezier(.4,.05,.4,1)';
    const { leaf, front, back, fs, bs } = this.leaf();
    back.append(mk('div', 'pg'), bs);
    const cur = this.S.firstElementChild, nx = this.mkSheet(to);
    if (to > from) {
      moveKeep(cur, front); front.append(fs);
      this.S.append(nx); this.fit(nx);
      this.book.append(leaf);
      const a = leaf.animate([{ transform: 'rotateY(0deg)', opacity: 1 }, { transform: 'rotateY(-110deg)', opacity: 1, offset: .62 }, { transform: 'rotateY(-180deg)', opacity: 0 }], { duration: D, easing: ease, fill: 'forwards' });
      fs.animate([{ opacity: 0 }, { opacity: .5, offset: .5 }, { opacity: .5 }], { duration: D, fill: 'forwards' });
      await a.finished;
      destroyEl(cur); leaf.remove();
    } else {
      front.append(nx, fs);
      leaf.style.transform = 'rotateY(-180deg)';
      this.book.append(leaf); this.fit(nx);
      const a = leaf.animate([{ transform: 'rotateY(-180deg)', opacity: 0 }, { transform: 'rotateY(-110deg)', opacity: 1, offset: .38 }, { transform: 'rotateY(0deg)', opacity: 1 }], { duration: D, easing: ease, fill: 'forwards' });
      fs.animate([{ opacity: .5 }, { opacity: .5, offset: .5 }, { opacity: 0 }], { duration: D, fill: 'forwards' });
      await a.finished;
      moveKeep(nx, this.S);
      destroyEl(cur); leaf.remove();
    }
    this.cur = to;
  },
  currentIllus() {
    if (this.mode === 'wide') return this.cur === 0 ? this.book.querySelector('.slot.r .illus') : this.book.querySelector('.slot.l > .illus');
    return this.book.querySelector('.slot.s .illus');
  },
  currentText() { return this.book.querySelector(this.mode === 'wide' ? '.slot.r > .tp' : '.slot.s .tp'); },
  settle() {
    const i = this.cur, id = this.def.id;
    this.prevB.disabled = i === 0;
    this.nextB.disabled = i === this.N - 1;
    this.nextB.classList.remove('nudge');
    [...this.dotsEl.children].forEach((d, k) => d.setAttribute('aria-current', k === i ? 'page' : 'false'));
    this.countEl.textContent = i === 0 ? T('cover') : i === this.N - 1 ? T('end') : `${i} / ${this.N - 2}`;
    if (i > 0 && i < this.N - 1) Progress.setPage(id, i);
    else if (i === this.N - 1) { Progress.setPage(id, 0); Progress.setDone(id); }
    App.remember(id, i);
    const ls = i <= 1 ? .5 : Math.min(1.7, .5 + (i - 1) * .1), rs = Math.min(1.7, .5 + (this.N - 1 - i) * .1);
    this.book.style.setProperty('--ls', ls.toFixed(2)); this.book.style.setProperty('--rs', rs.toFixed(2));
    clearTimeout(this.ct); this.ct = setTimeout(() => this.cue(false), 1100);
  },
  cue(force) { const il = this.currentIllus(); if (il && il._api && (force || !il._api.touched)) il._api.showCue(); },
  hideCue() { clearTimeout(this.ct); const il = this.currentIllus(); if (il && il._api) il._api.hideCue(true); },
  nudge(root) {
    const il = this.currentIllus();
    if (!il || il !== root || this.nextB.disabled) return;
    this.nextB.classList.remove('nudge'); void this.nextB.offsetWidth; this.nextB.classList.add('nudge');
  }
};

/* ---------------- ÍNDICE DE PÁGINAS ---------------- */
const Index = {
  reset() { const box = document.getElementById('thumbs'); if (box) box.innerHTML = ''; },
  open() {
    const box = document.getElementById('thumbs');
    if (!box.childElementCount) {
      Book.scenes.forEach((sc, i) => {
        const b = mk('button', 'thumb'); b.type = 'button';
        P = 't' + Book.def.id + i;
        const [vw, vh] = sc.vb || [800, 800];
        b.innerHTML = `<div class="ti"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="${i === 0 ? 'xMidYMax slice' : 'xMidYMid slice'}" aria-hidden="true">${sc.art()}</svg></div><span><i>${i && !sc.end ? i + '.' : ''}</i>${esc(i === 0 ? T('cover') : sc.end ? T('end') : tr(sc.title))}</span>`;
        b.onclick = () => { this.close(); Book.go(i); };
        box.append(b);
      });
    }
    [...box.children].forEach((b, k) => b.setAttribute('aria-current', k === Book.cur ? 'page' : 'false'));
    document.getElementById('index').hidden = false;
    const c = box.children[Book.cur]; if (c) c.focus();
  },
  isOpen() { return !document.getElementById('index').hidden; },
  close() { document.getElementById('index').hidden = true; const b = document.getElementById('btnPages'); if (b) b.focus(); }
};
