/* =====================================================================
   APLICATIVO OVELHINHA — estante, área dos pais, instalação e app nativo
   ===================================================================== */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 2800);
}
const TARGET = Ov.cfg.target || 'web';

/* ---------------- título da capa desenhado dentro do SVG (estante) ---------------- */
function coverTitleSVG(c, color, vw = 800) {
  const fit = (txt, max, k) => Math.min(max, 712 / Math.max(1, txt.length * k));
  const parts = [];
  let y = 86;
  const line = (txt, fs, fill, weight = 900) => {
    y += fs * .86;
    const sw = r1(fs * .17);
    parts.push(`<text x="${vw / 2}" y="${r1(y + fs * .07)}" text-anchor="middle" font-size="${r1(fs)}" font-weight="${weight}" fill="${color}" class="ctx">${esc(txt)}</text>`);
    parts.push(`<text x="${vw / 2}" y="${r1(y)}" text-anchor="middle" font-size="${r1(fs)}" font-weight="${weight}" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" class="ctx">${esc(txt)}</text>`);
    y += fs * .2;
  };
  const pre = c.pre && tr(c.pre), title = tr(c.title), small = c.small && tr(c.small);
  if (pre) line(pre, fit(pre, 86, .56), '#ffd86b');
  line(title, fit(title, 168, .6), '#fff7e2');
  if (small) line(small, fit(small, 92, .55), '#ffd86b');
  return `<g class="ctitle-svg" aria-hidden="true">${parts.join('')}</g>`;
}

/* ---------------- ESTANTE ---------------- */
const Shelf = {
  init() {
    this.grid = document.getElementById('shelfGrid');
    document.getElementById('mascotArt').innerHTML = mascot();
    const m = document.getElementById('mascot');
    m.onclick = () => {
      Sound.init(); Sound.play('bleat', 1.25);
      try { m.animate([{ transform: 'translateY(0) rotate(0deg)' }, { transform: 'translateY(-14px) rotate(-6deg)', offset: .4 }, { transform: 'translateY(0) rotate(4deg)', offset: .75 }, { transform: 'translateY(0) rotate(0deg)' }], { duration: 520, easing: 'ease-out' }); } catch (e) { }
      const b = document.getElementById('mascotSay');
      b.hidden = false; clearTimeout(this.mt); this.mt = setTimeout(() => { b.hidden = true; }, 1400);
    };
    document.getElementById('btnParents').onclick = () => Parents.open();
    Langs.init();
  },
  render() {
    this.grid.innerHTML = '';
    for (const b of Ov.ordered()) {
      const sc = b.scenes[0], [vw, vh] = sc.vb || [800, 1100];
      const open = Ov.open(b.id);
      const page = open ? Progress.page(b.id) : 0, done = open && Progress.done(b.id), n = b.scenes.length - 2;
      const card = mk('button', 'bookcard' + (open ? '' : ' locked')); card.type = 'button';
      card.dataset.book = b.id;
      const t = tr(b.title);
      const label = !open ? T(Loja.mode === 'web' ? 'inAppCard' : 'lockedCard', { t }) : page > 1 && page <= n ? T('stopped', { t, n: page }) : done ? T('read', { t }) : t;
      card.setAttribute('aria-label', label);
      P = 'sh' + b.id;
      card.innerHTML = `<span class="cv" style="--cover:${b.color}"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sc.art()}${coverTitleSVG(b.cover, b.color, vw)}</svg>${page > 1 && page <= n ? `<span class="ribbon">${esc(T('ribbon', { n: page }))}</span>` : ''}${done ? `<span class="sticker" title="${esc(T('readSticker'))}">${ICON.star}</span>` : ''}${open ? '' : `<span class="lockbadge" title="${esc(T('lockedBadge'))}">${ICON.lock}</span>`}</span><span class="plank" aria-hidden="true"></span>`;
      card.onclick = () => {
        Sound.init();
        if (!Ov.open(b.id)) { Sound.play('pluck', 'G4', .4); Unlock.open(b.id); return; }
        Sound.play('chime', 'E6'); App.openBook(b.id, 0);
      };
      this.grid.append(card);
    }
  }
};

/* ---------------- TELA INICIAL: aparece ao abrir a app, antes da estante ---------------- */
function hopEl(el, h = 14) {
  try { el.animate([{ transform: 'translateY(0px)' }, { transform: `translateY(${-h}px)`, offset: .4 }, { transform: 'translateY(0px)' }], { duration: 420, easing: 'ease-out' }); } catch (e) { }
}
const Start = {
  init() {
    this.el = document.getElementById('startView');
    P = 'st';
    document.getElementById('startSky').innerHTML = this.sky();
    document.getElementById('startMeadow').innerHTML = this.meadow();
    document.getElementById('startMascotArt').innerHTML = `<g class="breath">${mascot({ body: true })}</g>`;
    const m = document.getElementById('startMascot'), say = document.getElementById('startSay');
    m.onclick = () => {
      Sound.init(); Sound.play('bleat', 1.25);
      hopEl(m.querySelector('svg'), 16);
      say.hidden = false; clearTimeout(this.t); this.t = setTimeout(() => { say.hidden = true; }, 1400);
    };
    // as ovelhas do prado também respondem
    document.getElementById('startMeadow').addEventListener('click', e => {
      const k = e.target.closest('[data-k]'); if (!k) return;
      Sound.init(); Sound.play('bleat', 1.35 + Math.random() * .35);
      hopEl(k.querySelector('.act') || k, 14);
    });
    document.getElementById('startBtn').onclick = () => this.go();
  },
  go() {
    if (this.busy) return;
    this.busy = true;
    Sound.init(); Sound.play('chime', 'E6');
    let fast = false; try { fast = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { }
    this.el.classList.add('leaving');
    setTimeout(() => {
      this.busy = false; this.el.classList.remove('leaving');
      App.showShelf();
      const c = document.querySelector('#shelfGrid .bookcard'); if (c) c.focus({ preventScroll: true });
    }, fast ? 0 : 300);
  },
  // céu: sol e nuvens de dia, lua à noite (o fundo de estrelas é o mesmo da estante)
  sky() {
    const c = (cls, d, dx) => `<svg class="day ${cls}" viewBox="-70 -48 140 84"><g class="drift" style="--d:${d}s;--dx:${dx}px">${cloud(0, 0, 1)}</g></svg>`;
    return `<svg class="day sun" viewBox="-150 -150 300 300">${sun(0, 0, 56, { face: true })}</svg>`
      + `<svg class="night moon" viewBox="-110 -110 220 220">${moon(0, 0, 34)}</svg>`
      + c('c1', 19, 34) + c('c2', 23, -26) + c('c3', 17, 20);
  },
  // prado com ovelhas; as colinas usam as cores do tema (dia ou noite)
  meadow() {
    let s = `<path class="hill1" d="M-40,205 C150,140 360,128 560,168 C760,208 960,138 1240,150 L1240,440 L-40,440 Z"/>`;
    s += olive(150, 200, .78) + olive(1062, 170, .7);
    s += sheep({ x: 262, y: 188, s: .5, flip: true, pose: 'graze', k: 's0' }) + sheep({ x: 418, y: 186, s: .55, pose: 'graze', k: 's1' })
      + sheep({ x: 792, y: 204, s: .52, flip: true, k: 's2' }) + sheep({ x: 958, y: 176, s: .5, pose: 'graze', k: 's3' });
    s += `<path class="hill2" d="M-40,300 C190,236 420,246 600,258 C800,270 1010,228 1240,252 L1240,440 L-40,440 Z"/>`;
    const R = rng(911), cols = ['#e0473e', '#f2c14e', '#ffffff', '#e86a9a'];
    for (let i = 0; i < 34; i++) {
      const x = r1(R() * 1200), y = r1(292 + R() * 100);
      s += i % 3 ? tuft(x, y, .8 + R() * .5, '#5f9440') : flower(x, y, .9 + R() * .5, cols[i % 4]);
    }
    s += sheep({ x: 132, y: 352, s: .8, pose: 'graze', k: 's4' }) + sheep({ x: 362, y: 334, s: .86, k: 's5' })
      + sheep({ x: 846, y: 326, s: .82, flip: true, pose: 'graze', k: 's6' }) + sheep({ x: 1078, y: 348, s: .84, flip: true, k: 's7' });
    return s;
  }
};

/* ---------------- ÁREA DOS PAIS (com trava para adultos) ---------------- */
const Parents = {
  init() {
    this.el = document.getElementById('parents');
    document.getElementById('closeParents').onclick = () => this.close();
    this.el.addEventListener('click', e => { if (e.target === this.el) this.close(); });
    document.addEventListener('keydown', e => { if (!this.el.hidden && e.key === 'Escape' && !Unlock.isOpen()) { e.preventDefault(); this.close(); } });
    this.gate = makeGate(document.getElementById('gate'), () => this.unlock(), 'gateLead');
    // ajustes
    const tSound = document.getElementById('setSound');
    tSound.onchange = () => { Settings.set('sound', tSound.checked); Tools.sync(); if (tSound.checked) Sound.play('chime', 'E6'); };
    // histórias extras
    document.getElementById('buyList').addEventListener('click', e => { const b = e.target.closest('[data-buy]'); if (b) Unlock.open(b.dataset.buy, 'parents'); });
    document.getElementById('restoreBtn').onclick = async () => {
      const m = document.getElementById('storeMsg');
      m.textContent = T('searching');
      const had = new Set(Loja.owned), ok = await Loja.restore();
      const back = [...Loja.owned].filter(id => !had.has(id)).length;
      m.textContent = T(!ok ? 'err' + Loja.plat() : back ? 'restored' : Loja.owned.size ? 'allSet' : 'noneFound');
      this.renderStore();
    };
    const rz = document.getElementById('resetAsk'), rc = document.getElementById('resetConfirm');
    rz.onclick = () => { rc.hidden = false; rz.hidden = true; };
    document.getElementById('resetNo').onclick = () => { rc.hidden = true; rz.hidden = false; };
    document.getElementById('resetYes').onclick = () => { Progress.reset(); rc.hidden = true; rz.hidden = false; Shelf.render(); toast(T('progressCleared')); };
    const cp = document.getElementById('copyEmail');
    cp.hidden = !Ov.cfg.email;
    cp.onclick = () => {
      const t = Ov.cfg.email || '';
      const sel = () => { const r = document.createRange(); r.selectNodeContents(document.getElementById('emailText')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(t).then(() => toast(T('emailCopied')), () => { sel(); toast(T('emailSelected')); }); } catch (e) { sel(); toast(T('emailSelected')); }
    };
  },
  isOpen() { return !this.el.hidden; },
  // textos que dependem da língua e não estão no HTML
  texts() {
    document.getElementById('emailText').textContent = Ov.cfg.email || T('emailSoon');
    const v = document.getElementById('verText'); v.textContent = T('version', { v: v.dataset.v });
    if (!document.getElementById('gate').hidden) this.gate.text();
    if (!document.getElementById('pmain').hidden) this.renderStore();
  },
  open() {
    Sound.init();
    this.el.hidden = false;
    document.getElementById('pmain').hidden = true;
    document.getElementById('gate').hidden = false;
    this.gate.reset(); this.gate.focus();
    this.texts();
  },
  close() { this.el.hidden = true; const b = document.getElementById('btnParents'); if (b && App.view === 'shelf') b.focus(); },
  unlock() {
    document.getElementById('gate').hidden = true;
    const m = document.getElementById('pmain'); m.hidden = false;
    document.getElementById('setSound').checked = !!Settings.v.sound;
    document.getElementById('installGroup').hidden = !(TARGET === 'web' && !Install.standalone());
    document.getElementById('storeMsg').textContent = '';
    this.texts();
    m.scrollTop = 0;
    const h = m.querySelector('h4'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
  },
  // histórias extras: o que já está destrancado e o botão de compra de cada uma
  renderStore() {
    const g = document.getElementById('storeGroup');
    const paid = Loja.mode === 'aberto' ? [] : Loja.paidBooks();
    g.hidden = !paid.length;
    if (!paid.length) return;
    const nf = Loja.freeCount(), web = Loja.mode === 'web';
    document.getElementById('storeLead').textContent = web
      ? T('storeLeadWeb', { f: nf, n: paid.length, p: Loja.price(paid[0].id) })
      : T('storeLeadNative', { f: nf, n: paid.length }) + (Loja.mode === 'demo' ? T('storeLeadDemo') : '');
    document.getElementById('buyList').innerHTML = paid.map(b => {
      const own = Loja.has(b.id), t = tr(b.title), p = Loja.price(b.id);
      const act = own ? `<span class="owned">${ICON.check}<span>${esc(T('owned'))}</span></span>` : web ? `<span class="inapp">${esc(T('inApp'))}</span>` : `<button class="pbtn buy" type="button" data-buy="${b.id}" aria-label="${esc(T('buyAria', { t, p }))}">${esc(p)}</button>`;
      return `<li><span class="bt">${esc(t)}</span>${act}</li>`;
    }).join('');
    document.getElementById('buyActs').hidden = Loja.mode !== 'native';
  }
};

/* ---------------- BOTÕES DO LEITOR ---------------- */
const Tools = {
  init() {
    this.bS = document.getElementById('btnSound');
    const bP = document.getElementById('btnPages'), bF = document.getElementById('btnFull');
    document.getElementById('btnHome').onclick = () => App.home();
    this.bS.onclick = () => {
      Settings.set('sound', !Sound.on); this.sync();
      if (Sound.on) Sound.play('chime', 'E6');
      toast(T(Sound.on ? 'soundOn' : 'soundOff'));
    };
    bP.onclick = () => Index.open();
    document.getElementById('closeIndex').onclick = () => Index.close();
    document.getElementById('index').addEventListener('click', e => { if (e.target.id === 'index') Index.close(); });
    if (Native.is() || !document.fullscreenEnabled || !document.documentElement.requestFullscreen) bF.hidden = true;
    bF.onclick = () => {
      try {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
        else document.documentElement.requestFullscreen().catch(() => toast(T('noFull')));
      } catch (e) { toast(T('noFull')); }
    };
    document.addEventListener('fullscreenchange', () => bF.setAttribute('aria-pressed', String(!!document.fullscreenElement)));
    this.sync();
  },
  sync() {
    this.bS.setAttribute('aria-pressed', String(Sound.on));
  }
};

/* ---------------- BANDEIRAS: a língua muda com um toque ---------------- */
const Langs = {
  init() {
    const row = LANGS.map(l => `<button type="button" class="flag" data-lang="${l}" aria-label="${esc(I18N.names[l])}" title="${esc(I18N.names[l])}" lang="${I18N.html[l]}">${flagSVG(l)}</button>`).join('');
    this.row = document.getElementById('langs'); this.pop = document.getElementById('langPop'); this.btn = document.getElementById('btnLang');
    const rows = [this.row, this.pop, document.getElementById('startLangs')].filter(Boolean);
    const pickFlag = e => { const b = e.target.closest('[data-lang]'); if (!b) return; this.closePop(); this.choose(b.dataset.lang); };
    for (const r of rows) { r.innerHTML = row; r.addEventListener('click', pickFlag); }
    this.btn.onclick = e => { e.stopPropagation(); this.popOpen() ? this.closePop() : this.openPop(); };
    document.addEventListener('click', e => { if (this.popOpen() && !this.pop.contains(e.target)) this.closePop(); });
    document.addEventListener('keydown', e => { if (this.popOpen() && e.key === 'Escape') { e.preventDefault(); this.closePop(); this.btn.focus(); } });
    this.sync();
  },
  choose(l) {
    Sound.init(); Sound.play('chime', 'G5');
    if (l === I18N.lang) return;
    I18N.set(l);
    App.relang();
  },
  sync() {
    document.querySelectorAll('.flag[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === I18N.lang)));
    document.getElementById('langNow').innerHTML = flagSVG(I18N.lang);
  },
  popOpen() { return this.pop && !this.pop.hidden; },
  openPop() { this.pop.hidden = false; this.btn.setAttribute('aria-expanded', 'true'); const f = this.pop.querySelector('[aria-pressed="true"]') || this.pop.querySelector('.flag'); if (f) f.focus(); },
  closePop() { if (!this.pop) return; this.pop.hidden = true; this.btn.setAttribute('aria-expanded', 'false'); }
};

/* ---------------- INSTALAR (só na versão de site) ---------------- */
const Install = {
  evt: null,
  standalone() {
    try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; }
  },
  ios() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); },
  init() {
    const card = document.getElementById('installCard');
    const steps = document.getElementById('installSteps');
    this.stores();
    const stores = Ov.cfg.appStore || Ov.cfg.playStore;
    if (TARGET !== 'web') return;
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      try { navigator.serviceWorker.register('sw.js').catch(() => { }); } catch (e) { }
    }
    if (this.standalone()) return;
    const dismissed = store.get('ov:instalar-fechado') === '1';
    const btn = document.getElementById('installBtn');
    const showCard = () => { if (!dismissed) card.hidden = false; };
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault(); this.evt = e;
      btn.hidden = false; steps.hidden = true; showCard();
      document.querySelectorAll('[data-install-now]').forEach(b => b.hidden = false);
    });
    btn.onclick = () => this.prompt();
    document.querySelectorAll('[data-install-now]').forEach(b => b.onclick = () => this.prompt());
    document.getElementById('installClose').onclick = () => { card.hidden = true; store.set('ov:instalar-fechado', '1'); };
    if (this.ios()) { btn.hidden = true; steps.hidden = false; showCard(); }
    else if (stores) showCard();
    window.addEventListener('appinstalled', () => { card.hidden = true; toast(T('installed')); });
  },
  // botões das lojas (aviso de instalação e área dos pais)
  stores() {
    const html = [Ov.cfg.appStore && `<a class="storebtn" href="${esc(Ov.cfg.appStore)}" target="_blank" rel="noopener">${ICON.phone}<span>${esc(T('appStore'))}</span></a>`, Ov.cfg.playStore && `<a class="storebtn" href="${esc(Ov.cfg.playStore)}" target="_blank" rel="noopener">${ICON.phone}<span>${esc(T('playStore'))}</span></a>`].filter(Boolean).join('');
    document.querySelectorAll('[data-stores]').forEach(x => { x.innerHTML = html; x.hidden = !html; });
  },
  prompt() {
    const e = this.evt; if (!e) return;
    e.prompt();
    (e.userChoice || Promise.resolve()).then(() => { this.evt = null; document.getElementById('installCard').hidden = true; }).catch(() => { });
  }
};

/* ---------------- O APP ---------------- */
const App = {
  view: 'start', state: {}, pushed: false,
  init(data) {
    Settings.load();
    I18N.set(I18N.pick());
    Book.init();
    Shelf.init();
    Start.init();
    Parents.init();
    Unlock.init();
    Tools.init();
    Install.init();
    Native.init();
    Loja.init();
    Colorir.init();
    window.addEventListener('popstate', e => this.onPop(e));
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && Sound.ctx && Sound.ctx.state !== 'running') try { Sound.ctx.resume().catch(() => { }); } catch (e) { }
    });
    let book = null, page = 0;
    if (data && data.book && Ov.book(data.book)) { book = data.book; page = data.page | 0; }
    else {
      const m = /^#([a-z]+)(?:-(\d+))?$/.exec(location.hash || '');
      if (m && Ov.book(m[1])) { book = m[1]; page = +(m[2] || 0); }
    }
    if (book) this.openBook(book, page, true);
    else if ((data && data.view === 'shelf') || location.hash === '#estante') this.showShelf();
    else this.showStart();
    document.documentElement.classList.add('ready');
  },
  remember(id, page) { this.state = { book: id, page }; },
  openBook(id, page = 0, initial) {
    const def = Ov.book(id); if (!def) { this.showShelf(); return; }
    // livro trancado: volta para a estante e mostra o cadeado
    if (!Ov.open(id)) { if (this.view !== 'shelf') this.showShelf(); else Shelf.render(); Unlock.open(id); return; }
    if (Book.active) Book.close();
    if (Index.isOpen()) Index.close();
    this.view = 'reader'; this.state = { book: id, page };
    this.show('readerView');
    Book.open(def, page);
    if (!initial && !this.pushed) { try { history.pushState({ ovBook: id }, '', '#' + id); this.pushed = true; } catch (e) { this.pushed = false; } }
    else if (this.pushed) { try { history.replaceState({ ovBook: id }, '', '#' + id); } catch (e) { } }
    if (!initial) { const h = document.getElementById('btnHome'); if (h) h.focus({ preventScroll: true }); }
  },
  // só uma das três telas fica à vista: a inicial, a estante ou o leitor
  show(id) { for (const v of ['startView', 'shelfView', 'readerView', 'colorView']) document.getElementById(v).hidden = v !== id; },
  showStart() {
    if (Book.active) Book.close();
    if (Index.isOpen()) Index.close();
    this.view = 'start'; this.state = {};
    this.show('startView');
    Shelf.render();   // a estante fica pronta por trás
  },
  showShelf() {
    if (Book.active) Book.close();
    if (Index.isOpen()) Index.close();
    this.view = 'shelf'; this.state = {};
    this.show('shelfView');
    Shelf.render();
  },
  // desenhos para colorir (galeria e pintura)
  showColor() {
    if (Book.active) Book.close();
    if (Index.isOpen()) Index.close();
    this.view = 'color'; this.state = {};
    this.show('colorView');
    Colorir.showGallery();
    document.getElementById('colorView').scrollTop = 0;
  },
  home() {
    if (this.pushed) { this.pushed = false; try { history.back(); } catch (e) { } }
    this.showShelf();
    try { if (location.hash) history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
  },
  onPop(e) {
    const st = e.state || {};
    if (st.ovBook && this.view !== 'reader') { this.openBook(st.ovBook, 0, true); this.pushed = true; }
    else if (!st.ovBook && this.view === 'reader') { this.pushed = false; this.showShelf(); }
  },
  // a língua mudou: tudo o que está na tela é refeito na língua nova
  relang() {
    Langs.sync();
    Index.reset();
    if (this.view !== 'reader') Shelf.render();
    if (this.view === 'color') Colorir.relang();
    else if (Book.active && Book.def) Book.open(Book.def, Book.cur);
    if (Parents.isOpen()) Parents.texts();
    Unlock.relang();
    Install.stores();
  },
  back() {
    if (Langs.popOpen()) { Langs.closePop(); return true; }
    if (Index.isOpen()) { Index.close(); return true; }
    if (Unlock.isOpen()) { Unlock.close(); return true; }
    if (Parents.isOpen()) { Parents.close(); return true; }
    if (this.view === 'reader') { this.home(); return true; }
    if (this.view === 'color') { Colorir.back(); return true; }
    if (this.view === 'shelf') { this.showStart(); return true; }
    return false;
  }
};

function start(data) { App.init(data || {}); }
if (window.claude && window.claude.hot && window.claude.hot.snapshot) { try { window.claude.hot.snapshot(() => (App.view === 'reader' ? { book: App.state.book, page: Book.cur } : App.view === 'shelf' ? { view: 'shelf' } : {})); } catch (e) { } }
if (window.claude && window.claude.hot && window.claude.hot.ready) window.claude.hot.ready(start);
else start((window.claude && window.claude.hot && window.claude.hot.data) || {});
