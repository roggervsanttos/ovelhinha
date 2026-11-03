/* =====================================================================
   HISTÓRIAS EXTRAS — algumas histórias são grátis; as outras são
   desbloqueadas uma a uma, com uma compra única (config.json: free, price).
   • Na app (iPhone e Android) a compra é feita pela App Store ou pelo Google Play.
   • Na pré-visualização a compra é só uma simulação: nada é cobrado.
   • No site os livros pagos vêm só com a capa e levam para a app.
   Toda compra começa atrás da pergunta para adultos (exigência das lojas para apps infantis).
   ===================================================================== */

/* ---------------- pergunta para adultos ---------------- */
// leadKey: a frase de cima (chave do dicionário de textos, em linguas.js)
function makeGate(box, onPass, leadKey) {
  box.innerHTML = `<p class="gate-lead"></p><p class="gate-q"></p><div class="gate-ans" aria-live="polite"><span></span><span></span></div><div class="pad"></div>`;
  const lead = box.querySelector('.gate-lead'), q = box.querySelector('.gate-q'), ans = box.querySelector('.gate-ans'), pad = box.querySelector('.pad');
  pad.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'del', 0, 'ok'].map(k => k === 'del' ? `<button type="button" data-k="del" data-ta="aria-label:del">${ICON.back}</button>` : k === 'ok' ? `<button type="button" data-k="ok" class="ok" data-ta="aria-label:ok">${ICON.check}</button>` : `<button type="button" data-k="${k}">${k}</button>`).join('');
  const g = { ans: 0, typed: '', a: 3, b: 3 };
  const show = () => { const s = ans.querySelectorAll('span'); s[0].textContent = g.typed[0] || ''; s[1].textContent = g.typed[1] || ''; };
  // os textos na língua escolhida (a conta continua a mesma)
  g.text = () => {
    const nums = T('nums').split(',');
    lead.textContent = T(leadKey);
    q.textContent = T('gateQ', { a: nums[g.a], b: nums[g.b] });
    I18N.apply(pad);
  };
  g.reset = () => {
    let a, b;
    do { a = 3 + Math.floor(Math.random() * 7); b = 3 + Math.floor(Math.random() * 7); } while (a * b === g.ans);
    g.ans = a * b; g.a = a; g.b = b; g.typed = '';
    g.text(); show();
  };
  const check = () => {
    if (g.typed && +g.typed === g.ans) { onPass(); return; }
    try { ans.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(0)' }], { duration: 380 }); } catch (e) { }
    setTimeout(g.reset, 400);
  };
  pad.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const k = b.dataset.k;
    if (k === 'del') { g.typed = g.typed.slice(0, -1); show(); return; }
    if (k === 'ok') { check(); return; }
    if (g.typed.length >= 2) return;
    g.typed += k; show();
    if (g.typed.length === 2) setTimeout(check, 160);
  });
  g.focus = () => { const f = pad.querySelector('button'); if (f) f.focus(); };
  g.reset();
  return g;
}

/* ---------------- a loja ---------------- */
const Loja = {
  // native: compra de verdade · demo: compra simulada (prévia) · web: site, sem compras · aberto: tudo liberado
  mode: Ov.cfg.store || 'web',
  free: new Set(Ov.cfg.free || []),
  owned: new Set(), prices: {}, busy: false, key: 'ov:compras',
  pid(id) { return (Ov.cfg.productPrefix || 'livro_') + id; },
  idOf(pid) { const p = Ov.cfg.productPrefix || 'livro_'; return typeof pid === 'string' && pid.startsWith(p) ? pid.slice(p.length) : null; },
  paidBooks() { return Ov.ordered().filter(b => !this.free.has(b.id)); },
  freeCount() { return Ov.books.filter(b => this.free.has(b.id)).length; },
  has(id) {
    if (this.mode === 'aberto') return true;
    const b = Ov.book(id);
    return !!b && !b.stub && (this.free.has(id) || this.owned.has(id));
  },
  // o preço que a loja informa (já na moeda e no formato do país); antes disso, o de config.json
  price(id) {
    if (this.prices[id]) return this.prices[id];
    const v = Ov.cfg.price ?? .99, cur = Ov.cfg.currency || 'EUR';
    try { return new Intl.NumberFormat(I18N.html[I18N.lang], { style: 'currency', currency: cur }).format(v); } catch (e) { return v + ' ' + cur; }
  },
  // sufixo das chaves de texto que mudam com a loja: Ios, Android ou Web
  plat() { const p = Native.platform(); return p === 'ios' ? 'Ios' : p === 'android' ? 'Android' : 'Web'; },
  plugin() { const n = window.OvNative; return n && n.NativePurchases ? n.NativePurchases : null; },
  load() { try { for (const id of JSON.parse(store.get(this.key) || '[]') || []) if (typeof id === 'string') this.owned.add(id); } catch (e) { } },
  save() { store.set(this.key, JSON.stringify([...this.owned].sort())); },
  init() {
    if (!this.free.size) this.mode = 'aberto';
    Ov.open = id => this.has(id);
    if (this.mode === 'aberto' || this.mode === 'web') return;
    this.load();
    if (this.mode === 'native') this.initNative();
  },
  initNative() {
    const P = this.plugin(); if (!P) return;
    // compra aprovada depois (pedido de compra para os pais, pagamento pendente) ou devolvida
    try { P.addListener('transactionUpdated', t => this.onTx(t)); } catch (e) { }
    this.refresh(true).then(() => this.loadPrices());
    // ao voltar para o app, confere de novo (compra feita em outro aparelho, pagamento aprovado)
    try { window.OvNative.App.addListener('resume', () => this.refresh(true)); } catch (e) { }
  },
  onTx(t) {
    const id = t && this.idOf(t.productIdentifier); if (!id) return;
    if (t.revocationDate) this.owned.delete(id); else this.owned.add(id);
    this.save(); this.changed(id);
  },
  // pergunta à loja o que esta conta já comprou; sem internet (ou sem conta), fica o que estava guardado
  async refresh(confirm) {
    const P = this.plugin(); if (!P) return false;
    const android = Native.platform() === 'android';
    try {
      // no Android, confirma compras que ficaram sem confirmação (senão o Google devolve o dinheiro em 3 dias)
      if (confirm && android) { try { await P.restorePurchases(); } catch (e) { } }
      const r = await P.getPurchases({ productType: 'inapp', onlyCurrentEntitlements: true });
      const now = new Set();
      for (const t of (r && r.purchases) || []) {
        const id = this.idOf(t.productIdentifier); if (!id) continue;
        if (android && t.purchaseState != null && String(t.purchaseState) !== '1') continue;
        if (t.revocationDate) continue;
        now.add(id);
      }
      const was = [...this.owned].sort().join();
      this.owned = now; this.save();
      if (was !== [...now].sort().join()) this.changed();
      return true;
    } catch (e) { return false; }
  },
  async loadPrices() {
    const P = this.plugin(); if (!P) return;
    try {
      const r = await P.getProducts({ productIdentifiers: this.paidBooks().map(b => this.pid(b.id)), productType: 'inapp' });
      for (const p of (r && r.products) || []) { const id = this.idOf(p.identifier); if (id && p.priceString) this.prices[id] = p.priceString; }
      this.changed();
    } catch (e) { }
  },
  // resultado: ok · cancelou · pendente · erro
  async buy(id) {
    if (this.busy) return 'ocupado';
    this.busy = true;
    try {
      if (this.mode === 'demo') {
        await new Promise(r => setTimeout(r, 600));
        this.owned.add(id); this.save(); this.changed(id);
        return 'ok';
      }
      const P = this.plugin(); if (!P) return 'erro';
      try {
        const t = await P.purchaseProduct({ productIdentifier: this.pid(id), productType: 'inapp', quantity: 1 });
        if (Native.platform() === 'android' && t && t.purchaseState != null && String(t.purchaseState) !== '1') return 'pendente';
        this.owned.add(id); this.save(); this.changed(id);
        return 'ok';
      } catch (e) {
        const m = `${(e && e.code) || ''} ${(e && e.message) || e || ''}`.toLowerCase();
        if (/cancel/.test(m)) return 'cancelou';
        if (/pending/.test(m)) return 'pendente';
        if (/already_owned|already owned/.test(m)) { await this.refresh(false); this.owned.add(id); this.save(); this.changed(id); return 'ok'; }
        return 'erro';
      }
    } finally { this.busy = false; }
  },
  // "Restaurar compras": no iPhone pede a senha da conta da Apple; devolve false se a loja não respondeu
  async restore() {
    if (this.mode === 'demo') return true;
    const P = this.plugin(); if (!P) return false;
    try { await P.restorePurchases(); } catch (e) { return false; }
    return this.refresh(false);
  },
  changed(id) {
    if (typeof App !== 'undefined' && App.view === 'shelf') Shelf.render();
    if (typeof Parents !== 'undefined' && Parents.isOpen()) Parents.renderStore();
    Unlock.changed(id);
  }
};

/* ---------------- janela da história trancada ---------------- */
const Unlock = {
  id: null, from: '',
  init() {
    this.el = document.getElementById('unlock');
    document.getElementById('closeUnlock').onclick = () => this.close();
    this.el.addEventListener('click', e => { if (e.target === this.el) this.close(); });
    document.addEventListener('keydown', e => { if (!this.el.hidden && e.key === 'Escape') { e.preventDefault(); this.close(); } });
    this.gate = makeGate(document.getElementById('ulGate'), () => this.step('buy'), 'gateLeadBuy');
    document.getElementById('ulAdult').onclick = () => { Sound.play('chime', 'E6'); this.step('gate'); };
    document.getElementById('ulBuyBtn').onclick = () => this.buy();
    document.getElementById('ulRestore').onclick = () => this.restore();
  },
  isOpen() { return !this.el.hidden; },
  // from: 'shelf' (a criança tocou num livro trancado) ou 'parents' (o adulto já passou pela pergunta)
  open(id, from = 'shelf') {
    const b = Ov.book(id); if (!b) return;
    this.id = id; this.from = from;
    const sc = b.scenes[0], [vw, vh] = sc.vb || [800, 1100];
    P = 'ul' + id;
    document.getElementById('ulCover').innerHTML = `<span class="cv" style="--cover:${b.color}"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMax slice">${sc.art()}${coverTitleSVG(b.cover, b.color, vw)}</svg><span class="lockbadge">${ICON.lock}</span></span>`;
    this.msg('');
    this.el.hidden = false;
    this.step(from === 'parents' ? 'buy' : 'kid');
  },
  texts() {
    const web = Loja.mode === 'web', s = this.cur;
    document.getElementById('ulLead').textContent = T(web ? 'webLead' : 'lockedLead');
    document.getElementById('ulAsk').textContent = T(web ? 'webAsk' : 'lockedAsk');
    document.getElementById('unlockTitle').textContent = T(s === 'buy' ? (web ? 'getAppTitle' : 'extras') : s === 'gate' ? 'adultsTitle' : 'lockedTitle');
  },
  step(s) {
    this.cur = s;
    document.getElementById('ulKid').hidden = s !== 'kid';
    document.getElementById('ulGate').hidden = s !== 'gate';
    document.getElementById('ulBuy').hidden = s !== 'buy';
    this.texts();
    if (s === 'kid') { const a = document.getElementById('ulAdult'); a.focus(); }
    if (s === 'gate') { this.gate.reset(); this.gate.focus(); }
    if (s === 'buy') { this.renderBuy(); const t = document.getElementById('ulBuyTitle'); t.setAttribute('tabindex', '-1'); t.focus(); }
  },
  // a língua mudou com a janela aberta
  relang() {
    if (!this.isOpen()) return;
    const b = Ov.book(this.id);
    if (b) { P = 'ul' + this.id; const sc = b.scenes[0], [vw, vh] = sc.vb || [800, 1100]; document.getElementById('ulCover').innerHTML = `<span class="cv" style="--cover:${b.color}"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMax slice">${sc.art()}${coverTitleSVG(b.cover, b.color, vw)}</svg><span class="lockbadge">${ICON.lock}</span></span>`; }
    this.texts();
    if (this.cur === 'gate') this.gate.text();
    if (this.cur === 'buy') this.renderBuy();
  },
  renderBuy() {
    const b = Ov.book(this.id), price = Loja.price(this.id);
    const title = document.getElementById('ulBuyTitle'), text = document.getElementById('ulBuyText');
    const btn = document.getElementById('ulBuyBtn'), rs = document.getElementById('ulRestore'), st = document.getElementById('ulStores');
    const t = tr(b.title);
    if (Loja.mode === 'web') {
      title.textContent = T('webBuyTitle', { t });
      const stores = [Ov.cfg.appStore && `<a class="storebtn" href="${esc(Ov.cfg.appStore)}" target="_blank" rel="noopener">${ICON.phone}<span>${esc(T('appStore'))}</span></a>`, Ov.cfg.playStore && `<a class="storebtn" href="${esc(Ov.cfg.playStore)}" target="_blank" rel="noopener">${ICON.phone}<span>${esc(T('playStore'))}</span></a>`].filter(Boolean).join('');
      text.textContent = T('webBuyText', { f: Loja.freeCount(), n: Ov.books.length, p: price }) + (stores ? '' : T('soon'));
      st.innerHTML = stores; st.hidden = !stores;
      btn.hidden = true; rs.hidden = true;
      return;
    }
    st.hidden = true; btn.hidden = false;
    title.textContent = T('buyTitle', { t });
    const where = Loja.mode === 'native' && Loja.plat() !== 'Web' ? T('buyWhere' + Loja.plat()) : '';
    text.textContent = T('buyText', { p: price, w: where }) + (Loja.mode === 'demo' ? T('demoNote') : '');
    btn.innerHTML = `${ICON.lock}<span>${esc(T('buyBtn', { p: price }))}</span>`;
    btn.disabled = false;
    rs.hidden = Loja.mode !== 'native';
  },
  msg(t) { document.getElementById('ulMsg').textContent = t; },
  async buy() {
    const btn = document.getElementById('ulBuyBtn'), id = this.id;
    btn.disabled = true;
    this.msg(Loja.mode === 'native' && Loja.plat() !== 'Web' ? T('opening' + Loja.plat()) : T('unlocking'));
    const r = await Loja.buy(id);
    btn.disabled = false;
    if (r === 'ok') this.done(id);
    else if (r === 'cancelou' || r === 'ocupado') this.msg('');
    else if (r === 'pendente') this.msg(T('pending'));
    else this.msg(T('err' + Loja.plat()));
  },
  async restore() {
    const id = this.id;
    this.msg(T('searching'));
    const ok = await Loja.restore();
    if (Loja.has(id)) { this.done(id); return; }
    this.msg(ok ? T('notBought') : T('err' + Loja.plat()));
  },
  done(id) {
    const b = Ov.book(id), from = this.from;
    this.close(true);
    Sound.play('chime', 'C6');
    toast(T('unlocked', { t: tr(b.title) }));
    if (from === 'shelf') App.openBook(id, 0);
  },
  // a loja mudou (compra aprovada depois, por exemplo): se esta janela é da história liberada, ela fecha
  changed(id) {
    if (!this.isOpen() || !this.id || !Loja.has(this.id)) return;
    if (id && id !== this.id) return;
    this.done(this.id);
  },
  close(silent) {
    if (this.el.hidden) return;
    this.el.hidden = true;
    document.getElementById('ulCover').innerHTML = '';
    if (silent) return;
    if (this.from === 'parents') { const b = document.querySelector(`#buyList [data-buy="${this.id}"]`); if (b) b.focus(); }
    else { const b = document.querySelector(`#shelfGrid [data-book="${this.id}"]`); if (b && App.view === 'shelf') b.focus(); }
  }
};
