/* =====================================================================
   TEMPO DE ECRÃ — limite por dia escolhido na área dos pais
   Conta só o tempo com a app à vista. Quando acaba, aparece o ecrã de descanso;
   um adulto pode dar mais 15 minutos (com a mesma pergunta da área dos pais).
   ===================================================================== */
const Tempo = {
  OPTS: [0, 15, 30, 45, 60],
  limit() { return +(store.get('ov:tempo') || 0); },
  today() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; },
  use() {
    let u; try { u = JSON.parse(store.get('ov:uso') || '{}'); } catch (e) { u = {}; }
    if (u.d !== this.today()) u = { d: this.today(), s: 0, x: 0 };
    return u;
  },
  saveUse(u) { store.set('ov:uso', JSON.stringify(u)); },
  init() {
    this.el = document.getElementById('rest');
    this.gate = makeGate(document.getElementById('restGate'), () => this.more(), 'gateLeadTime');
    document.getElementById('restAdult').onclick = () => { document.getElementById('restKid').hidden = true; document.getElementById('restGate').hidden = false; this.gate.reset(); };
    document.getElementById('tempoOpts').addEventListener('click', e => {
      const b = e.target.closest('[data-min]'); if (!b) return;
      store.set('ov:tempo', b.dataset.min); this.renderOpts();
    });
    this.last = Date.now();
    setInterval(() => this.tick(), 5000);
    document.addEventListener('visibilitychange', () => { this.last = Date.now(); });
    this.check();
  },
  tick() {
    const now = Date.now(), dt = Math.min(now - this.last, 15000); this.last = now;
    if (document.visibilityState !== 'visible' || !this.limit() || !this.el.hidden) return;
    const u = this.use(); u.s += dt / 1000; this.saveUse(u);
    this.check();
  },
  left() { const u = this.use(); return this.limit() * 60 + u.x - u.s; },
  check() { if (this.limit() && this.left() <= 0 && this.el.hidden) this.show(); },
  show() {
    if (Book.active) { try { Sound.stopAll && Sound.stopAll(); } catch (e) { } }
    document.getElementById('restKid').hidden = false; document.getElementById('restGate').hidden = true;
    this.texts(); this.el.hidden = false;
  },
  // mais 15 minutos a contar de agora
  more() { if (this.el.hidden) return; const u = this.use(); u.x = Math.max(u.x, u.s - this.limit() * 60) + 15 * 60; this.saveUse(u); this.el.hidden = true; toast(T('timeMore')); },
  texts() {
    document.getElementById('restTitle').textContent = T('restTitle'); document.getElementById('restText').textContent = T('restText');
    if (!document.getElementById('restGate').hidden) this.gate.text();
  },
  // botões da área dos pais
  renderOpts() {
    const cur = this.limit(), box = document.getElementById('tempoOpts');
    box.innerHTML = this.OPTS.map(m => `<button type="button" class="pbtn${m === cur ? ' on' : ''}" data-min="${m}" aria-pressed="${m === cur}">${esc(m ? T('minutes', { n: m }) : T('noLimit'))}</button>`).join('');
    const u = this.use();
    document.getElementById('tempoUsed').textContent = T('todayUsed', { n: Math.floor(u.s / 60) });
  }
};
