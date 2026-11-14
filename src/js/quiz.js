/* =====================================================================
   QUIZ — perguntas de escolha múltipla sobre cada história
   As perguntas e as respostas certas são as da página do fim de cada livro
   (campo `questions`); as erradas estão no campo `wrong` (scripts/quiz-erradas.txt).
   ===================================================================== */

const QuizStore = {
  key: b => `ov:quiz:${b}`,
  best(b) { return +(store.get(this.key(b)) || 0); },
  save(b, n) { if (n > this.best(b)) store.set(this.key(b), String(n)); }
};

// estrelas do fim (1 a 3) a partir das estrelas de cada pergunta (até 3 por pergunta)
const quizStars = (got, max) => got >= max * .85 ? 3 : got >= max * .55 ? 2 : 1;

const Quiz = {
  init() {
    this.view = document.getElementById('quizView');
    this.gal = document.getElementById('qGallery'); this.play = document.getElementById('qPlay');
    document.getElementById('btnQuiz').onclick = () => App.showQuiz();
    document.getElementById('qHome').onclick = () => App.showShelf();
    document.getElementById('qBack').onclick = () => this.back();
    this.gal.addEventListener('click', e => { const c = e.target.closest('[data-qb]'); if (c) this.start(c.dataset.qb); });
  },
  books() { return Ov.ordered().filter(b => Ov.open(b.id) && this.endOf(b)); },
  endOf(b) { const e = b.scenes.find(s => s.end); return e && e.questions && e.wrong && e.wrong.length === e.questions.length ? e : null; },
  isPlaying() { return !this.play.hidden; },
  showGallery() {
    this.play.hidden = true; this.gal.hidden = false; this.cur = null;
    document.getElementById('qBack').hidden = true;
    document.getElementById('qTitle').textContent = T('quizTitle');
    let h = `<p class="clead">${esc(T('quizPick'))}</p><div class="qgrid">`;
    for (const b of this.books()) {
      const sc = b.scenes[0], [vw, vh] = sc.vb || [800, 1100], best = QuizStore.best(b.id), max = this.endOf(b).questions.length * 3;
      P = 'qg' + b.id;
      const st = best ? quizStars(best, max) : 0;
      h += `<button type="button" class="qcard" data-qb="${b.id}" aria-label="${esc(T('quizThis', { t: tr(b.title) }))}${st ? ' · ' + esc(T('quizScore', { n: st })) : ''}"><span class="cv" style="--cover:${b.color}"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sc.art()}${coverTitleSVG(b.cover, b.color, vw)}</svg></span><span class="qstars" aria-hidden="true">${[1, 2, 3].map(k => `<i class="${k <= st ? 'on' : ''}">${ICON.star}</i>`).join('')}</span></button>`;
    }
    this.gal.innerHTML = h + '</div>';
  },
  // escolhe a página da história que mais tem a ver com a pergunta (palavras em comum), para a ilustração
  sceneFor(def, q, a) {
    const words = s => new Set(String(s).toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').match(/[a-z]{4,}/g) || []);
    const qa = words(q + ' ' + a);
    let best = 1, score = -1;
    def.scenes.forEach((sc, i) => {
      if (!i || sc.end || sc.cover) return;
      const w = words([sc.title, ...(sc.text || []).map(p => typeof p === 'string' ? p : p.q)].join(' '));
      let n = 0; for (const x of qa) if (w.has(x)) n++;
      if (n > score) { score = n; best = i; }
    });
    return best;
  },
  start(id) {
    const def = Ov.book(id), end = this.endOf(def);
    if (!end) return;
    this.cur = { id, def, end, i: 0, got: 0, order: end.questions.map((_, k) => k) };
    this.gal.hidden = true; this.play.hidden = false;
    document.getElementById('qBack').hidden = false;
    document.getElementById('qTitle').textContent = tr(def.title);
    this.view.scrollTop = 0;
    this.ask();
  },
  ask() {
    const c = this.cur, k = c.order[c.i], [q, a] = c.end.questions[k], wrong = c.end.wrong[k];
    const opts = [a, ...wrong].map(s => [s, s === a]);
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
    c.tries = 0; c.done = false;
    const si = this.sceneFor(c.def, q, a), sc = c.def.scenes[si], [vw, vh] = sc.vb || [800, 800];
    P = 'qz' + c.id + si;
    const n = c.end.questions.length;
    this.play.innerHTML = `<div class="qillus"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g class="world">${sc.art()}</g></svg></div>
      <div class="qcardq"><div class="eyebrow">${ICON.star}<span>${esc(T('quizEyebrow'))} · ${esc(T('quizOf', { n: c.i + 1, t: n }))}</span></div>
      <h2>${esc(tr(q))}</h2>
      <div class="qopts">${opts.map(([s, ok]) => `<button type="button" class="qopt" data-ok="${ok ? 1 : 0}">${esc(tr(s))}</button>`).join('')}</div>
      <div class="qfeed" aria-live="polite"></div>
      <div class="qnav"><span class="qdots">${Array.from({ length: n }, (_, k2) => `<i class="${k2 < c.i ? 'done' : k2 === c.i ? 'now' : ''}"></i>`).join('')}</span><button type="button" class="again gold qnext" hidden><span>${esc(T(c.i + 1 < n ? 'quizNext' : 'quizFinish'))}</span>${ICON.next}</button></div></div>`;
    this.play.querySelectorAll('.qopt').forEach(b => b.onclick = () => this.pick(b));
    this.play.querySelector('.qnext').onclick = () => { c.i++; if (c.i < n) { this.ask(); this.view.scrollTop = 0; } else this.finish(); };
  },
  pick(b) {
    const c = this.cur; if (c.done || b.disabled) return;
    const feed = this.play.querySelector('.qfeed');
    if (b.dataset.ok === '1') {
      c.done = true;
      const st = Math.max(1, 3 - c.tries); c.got += st;
      b.classList.add('right'); b.insertAdjacentHTML('beforeend', ICON.check);
      this.play.querySelectorAll('.qopt').forEach(o => { if (o !== b) o.disabled = true; });
      const praise = T('quizRight').split('|');
      feed.className = 'qfeed ok';
      feed.innerHTML = `<span class="qst">${[1, 2, 3].map(k => `<i class="${k <= st ? 'on' : ''}">${ICON.star}</i>`).join('')}</span><span>${esc(praise[Math.floor(Math.random() * praise.length)])}</span>`;
      try { b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 320 }); } catch (e) { }
      const nx = this.play.querySelector('.qnext'); nx.hidden = false;
      setTimeout(() => { try { nx.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { } }, 60);
    } else {
      c.tries++;
      b.classList.add('wrong'); b.disabled = true;
      feed.className = 'qfeed no'; feed.textContent = T('quizWrong');
      try { b.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(0)' }], { duration: 360 }); } catch (e) { }
    }
  },
  finish() {
    const c = this.cur, max = c.end.questions.length * 3, st = quizStars(c.got, max);
    QuizStore.save(c.id, c.got);
    const nx = this.books().map(b => b.id), next = nx[(nx.indexOf(c.id) + 1) % nx.length];
    const sc = c.def.scenes[0], [vw, vh] = sc.vb || [800, 1100];
    P = 'qf' + c.id;
    this.play.innerHTML = `<div class="qend"><span class="cv" style="--cover:${c.def.color}"><svg class="scene" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sc.art()}${coverTitleSVG(c.def.cover, c.def.color, vw)}</svg></span>
      <h2>${esc(T('quizDone'))}</h2>
      <div class="qbig" aria-label="${esc(T('quizScore', { n: st }))}">${[1, 2, 3].map(k => `<i class="${k <= st ? 'on' : ''}">${ICON.star}</i>`).join('')}</div>
      <p>${esc(T(st === 3 ? 'quizEnd3' : st === 2 ? 'quizEnd2' : 'quizEnd1'))}</p>
      <div class="endacts"><button class="again" type="button" data-qa>${ICON.replay}<span>${esc(T('quizAgain'))}</span></button>${next && next !== c.id ? `<button class="again gold" type="button" data-qn><span>${esc(T('quizOther'))}</span>${ICON.next}</button>` : ''}</div></div>`;
    this.play.querySelector('[data-qa]').onclick = () => this.start(c.id);
    const qn = this.play.querySelector('[data-qn]'); if (qn) qn.onclick = () => this.start(next);
    try { this.play.querySelectorAll('.qbig i.on').forEach((s, k) => s.animate([{ transform: 'scale(0)' }, { transform: 'scale(1.25)', offset: .7 }, { transform: 'scale(1)' }], { duration: 420, delay: 150 + k * 180, fill: 'backwards', easing: 'ease-out' })); } catch (e) { }
  },
  back() { if (this.isPlaying()) this.showGallery(); else App.showShelf(); },
  relang() { if (this.view.hidden) return; if (this.isPlaying() && this.cur) { document.getElementById('qTitle').textContent = tr(this.cur.def.title); if (this.cur.i < this.cur.end.questions.length) this.ask(); } else this.showGallery(); }
};
