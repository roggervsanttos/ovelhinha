/* =====================================================================
   COLORIR — desenhos das histórias para pintar com um toque
   Os desenhos são as próprias ilustrações da app, passadas a "linha":
   tudo fica branco com contornos escuros, e cada zona pinta-se com um toque.
   ===================================================================== */

// páginas de cada história que viram desenho para colorir (índices das cenas)
const COLOR_PAGES = {
  adao: [4, 7, 10],
  davi: [1, 3, 10],
  natal: [5, 7, 11],
  ovelha: [2, 7, 9],
  pascoa: [1, 3, 10]
};
const COLORS = ['#e5483f', '#f28c3a', '#f7d04a', '#9bd16b', '#4f9a45', '#8fd3f4', '#3f7fd0', '#8a5cc7', '#f28ab8', '#a0663a', '#f3d1a6', '#b9b9b9', '#4a4a4a'];
const COLOR_NAMES = {
  pt: ['vermelho', 'laranja', 'amarelo', 'verde-claro', 'verde', 'azul-claro', 'azul', 'roxo', 'cor-de-rosa', 'castanho', 'cor de pele', 'cinzento', 'preto'],
  es: ['rojo', 'naranja', 'amarillo', 'verde claro', 'verde', 'celeste', 'azul', 'morado', 'rosa', 'marrón', 'color carne', 'gris', 'negro'],
  fr: ['rouge', 'orange', 'jaune', 'vert clair', 'vert', 'bleu ciel', 'bleu', 'violet', 'rose', 'marron', 'beige', 'gris', 'noir'],
  en: ['red', 'orange', 'yellow', 'light green', 'green', 'sky blue', 'blue', 'purple', 'pink', 'brown', 'tan', 'gray', 'black']
};

/* ---------- passar uma ilustração a desenho de linhas ---------- */
const LineArt = {
  // luminosidade de uma cor css (rgb(...)); 1 = branco
  lum(c) { const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(c || ''); return m ? (.299 * m[1] + .587 * m[2] + .114 * m[3]) / 255 : 1; },
  isOL(c) { const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(c || ''); return !!m && Math.abs(m[1] - 58) + Math.abs(m[2] - 39) + Math.abs(m[3] - 48) < 40; },
  area(el) { try { const b = el.getBBox(); return b.width * b.height; } catch (e) { return 0; } },
  alpha(el, stop) { let a = 1; for (let p = el; p && p !== stop; p = p.parentElement) { const o = parseFloat(getComputedStyle(p).opacity); if (!isNaN(o)) a *= o; } return a; },
  // svg: elemento <svg> já no documento, com o desenho dentro. Devolve o número de zonas para pintar.
  convert(svg) {
    svg.querySelectorAll('.fx, .hit, filter, mask').forEach(e => e.remove());
    const shapes = [...svg.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line')];
    const groups = new Map(); let gid = 0;
    const info = shapes.map(el => {
      const cs = getComputedStyle(el);
      return { el, fill: cs.fill, stroke: cs.stroke, sw: parseFloat(cs.strokeWidth) || 0, fo: parseFloat(cs.fillOpacity), a: this.alpha(el, svg) };
    });
    for (const s of info) {
      const { el, fill, stroke, sw } = s;
      const noFill = !fill || fill === 'none' || s.fo < .05;
      if (noFill && (!stroke || stroke === 'none')) { el.remove(); continue; }
      // brilhos, sombras e clarões (meio transparentes) saem
      if (s.a < .55) { el.remove(); continue; }
      el.removeAttribute('filter'); el.style.filter = 'none';
      if (noFill) {
        // traço grosso de cor (pernas, braços, cajados): fica branco com o contorno que já tem por baixo
        if (this.lum(stroke) > .28 && sw >= 3) { el.dataset.oc = stroke; el.style.stroke = '#ffffff'; this.region(el, 'stroke', groups, () => gid++); }
        // linhas finas de cor (raios, cortinas, cordas) passam a linhas escuras
        else if (!this.isOL(stroke)) el.style.stroke = OL;
        continue;
      }
      // zonas escuras (contornos, olhos, bocas) ficam como estão
      // (a não ser que sejam grandes, como um céu de noite: essas ficam brancas para pintar)
      if (!/url\(/.test(fill) && this.lum(fill) < .28 && (this.isOL(fill) || this.area(el) < 2500)) {
        // linhas retas (braços, pernas) têm o preenchimento por omissão, que não se vê: conta o traço
        if (stroke && stroke !== 'none' && this.lum(stroke) > .28 && !this.isOL(stroke)) {
          if (sw >= 3) { el.dataset.oc = stroke; el.style.stroke = '#ffffff'; this.region(el, 'stroke', groups, () => gid++); } else el.style.stroke = OL;
        }
        continue;
      }
      el.style.fill = '#ffffff'; el.style.fillOpacity = '1';
      if (stroke && stroke !== 'none' && this.lum(stroke) > .28) el.style.stroke = OL;
      // formas grandes sem contorno (colinas, céu, mar) ganham uma linha para se verem as zonas
      if (!stroke || stroke === 'none') {
        if (this.area(el) > 9000) { el.style.stroke = OL; el.style.strokeWidth = '1.8'; el.setAttribute('vector-effect', 'non-scaling-stroke'); }
      }
      el.dataset.oc = fill; // cor original (usada nas fotos das lojas para mostrar um desenho já meio pintado)
      this.region(el, 'fill', groups, () => gid++, fill);
    }
    this.ink(svg);
    return gid;
  },
  // contornos bem marcados a preto: todas as linhas escuras ficam pretas e mais grossas
  ink(svg) {
    const INK = '#120d10';
    for (const el of [...svg.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line')]) {
      if (el.dataset.ck === 'stroke') continue;
      const cs = getComputedStyle(el), st = cs.stroke, sw = parseFloat(cs.strokeWidth) || 0;
      if (!el.dataset.ci && cs.fill !== 'none' && !/url\(/.test(cs.fill) && this.lum(cs.fill) < .28) el.style.fill = INK;
      if (st && st !== 'none' && this.lum(st) < .28) {
        el.style.stroke = INK;
        if (el.getAttribute('vector-effect') === 'non-scaling-stroke') el.style.strokeWidth = '1.8';
        else if (sw > 0) el.style.strokeWidth = String(Math.max(sw * 1.12, sw + .4));
      } else if (el.dataset.ci && el.dataset.ck === 'fill' && (!st || st === 'none')) {
        // zona sem contorno encostada a outras: ganha uma linha fina para se ver onde acaba
        // (as formas feitas de várias bolas já têm o contorno por baixo, por isso ficam de fora)
        const same = svg.querySelectorAll(`[data-ci="${el.dataset.ci}"]`);
        if (same.length === 1) { el.style.stroke = INK; el.style.strokeWidth = '1.6'; el.setAttribute('vector-effect', 'non-scaling-stroke'); }
        else if (el === same[0]) {
          // formas feitas de várias bolas (nuvens, lã): uma cópia escura por baixo desenha o contorno de fora
          for (const m of same) {
            if (m.parentElement !== el.parentElement) continue;
            const c = m.cloneNode(false); delete c.dataset.ci; delete c.dataset.ck;
            c.style.fill = INK; c.style.stroke = INK; c.style.strokeWidth = '3.2'; c.setAttribute('vector-effect', 'non-scaling-stroke');
            c.style.pointerEvents = 'none'; el.parentElement.insertBefore(c, el);
          }
        }
      }
    }
  },
  // formas irmãs com a mesma cor original (por ex. as bolas de uma nuvem) pintam-se juntas
  region(el, kind, groups, next, orig = '') {
    const par = el.parentElement;
    if (!par.__cid) par.__cid = Math.random().toString(36).slice(2);
    const key = par.__cid + '|' + kind + '|' + orig;
    if (!groups.has(key)) groups.set(key, next());
    el.dataset.ci = groups.get(key); el.dataset.ck = kind;
  },
  paint(svg, gid, color) {
    svg.querySelectorAll(`[data-ci="${gid}"]`).forEach(e => { if (e.dataset.ck === 'stroke') e.style.stroke = color; else e.style.fill = color; });
  }
};

/* ---------- desenhos guardados no aparelho ---------- */
const ColorStore = {
  key: (b, i) => `ov:colorir:${b}:${i}`,
  get(b, i) { try { return JSON.parse(store.get(this.key(b, i)) || '{}'); } catch (e) { return {}; } },
  set(b, i, m) { if (Object.keys(m).length) store.set(this.key(b, i), JSON.stringify(m)); else store.del(this.key(b, i)); }
};

/* ---------- desenho pronto (para a galeria e para pintar) ---------- */
function colorSVG(bookId, i, cls = '') {
  const def = Ov.book(bookId), sc = def.scenes[i], [vw, vh] = sc.vb || [800, 800];
  P = 'cl' + bookId + i;
  const svg = svgEl('svg', { class: 'scene coloring ' + cls, viewBox: `0 0 ${vw} ${vh}`, preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true' });
  svg.innerHTML = sc.art();
  return svg;
}

const Colorir = {
  pages() {
    const out = [];
    for (const b of Ov.ordered()) if (COLOR_PAGES[b.id] && Ov.open(b.id)) for (const i of COLOR_PAGES[b.id]) if (b.scenes[i]) out.push([b.id, i]);
    return out;
  },
  init() {
    this.view = document.getElementById('colorView');
    this.gal = document.getElementById('cGallery'); this.paintBox = document.getElementById('cPaint');
    this.stage = document.getElementById('cStage'); this.pal = document.getElementById('cPalette');
    document.getElementById('btnColor').onclick = () => { App.showColor(); };
    document.getElementById('cBack').onclick = () => this.back();
    document.getElementById('cHome').onclick = () => App.showShelf();
    document.getElementById('cUndo').onclick = () => this.undo();
    document.getElementById('cClear').onclick = () => this.clear();
    this.color = COLORS[2];
    this.stage.addEventListener('click', e => this.tap(e));
    this.gal.addEventListener('click', e => { const c = e.target.closest('[data-cp]'); if (c) { const [b, i] = c.dataset.cp.split(':'); this.open(b, +i); } });
    this.pal.addEventListener('click', e => { const s = e.target.closest('[data-color]'); if (!s) return; this.pick(s.dataset.color); });
  },
  isPainting() { return !this.paintBox.hidden; },
  // galeria com todos os desenhos (com as cores que já foram pintadas)
  showGallery() {
    this.paintBox.hidden = true; this.gal.hidden = false; this.cur = null;
    document.getElementById('cTitle').textContent = T('colorTitle');
    document.getElementById('cBack').hidden = true;
    this.gal.innerHTML = `<p class="clead">${esc(T('colorPick'))}</p>`;
    const todo = []; let grid = null, last = '';
    for (const [b, i] of this.pages()) {
      // um bloco por história, com o título por cima
      if (b !== last) {
        last = b; const sec = mk('section', 'cbook'), def = Ov.book(b);
        sec.style.setProperty('--bk', def.color || '#f6c85f');
        sec.innerHTML = `<h3>${esc(tr(def.title))}</h3><div class="cgrid"></div>`;
        this.gal.append(sec); grid = sec.querySelector('.cgrid');
      }
      const card = mk('button', 'ccard'); card.type = 'button'; card.dataset.cp = b + ':' + i;
      card.setAttribute('aria-label', T('colorThis', { t: tr(Ov.book(b).title) }));
      grid.append(card); todo.push([card, b, i]);
    }
    // os desenhos fazem-se aos poucos, para a galeria abrir logo
    let k = 0;
    const step = () => {
      if (this.gal.hidden || k >= todo.length) return;
      const [card, b, i] = todo[k++];
      const svg = colorSVG(b, i); card.append(svg); LineArt.convert(svg);
      const m = ColorStore.get(b, i); for (const g in m) LineArt.paint(svg, g, m[g]);
      setTimeout(step, 0);
    };
    step();
  },
  open(b, i) {
    this.cur = { b, i }; this.hist = [];
    this.gal.hidden = true; this.paintBox.hidden = false;
    document.getElementById('cTitle').textContent = tr(Ov.book(b).title);
    document.getElementById('cBack').hidden = false; this.view.scrollTop = 0;
    this.stage.innerHTML = '';
    const svg = colorSVG(b, i, 'cpaint-svg'); this.stage.append(svg);
    LineArt.convert(svg); this.svg = svg;
    this.map = ColorStore.get(b, i);
    for (const g in this.map) LineArt.paint(svg, g, this.map[g]);
    this.palette();
  },
  palette() {
    const names = COLOR_NAMES[I18N.lang] || COLOR_NAMES.pt;
    this.pal.innerHTML = COLORS.map((c, k) => `<button type="button" class="swatch" data-color="${c}" style="--c:${c}" aria-label="${esc(names[k])}" aria-pressed="${c === this.color}"></button>`).join('')
      + `<button type="button" class="swatch eraser" data-color="#ffffff" aria-label="${esc(T('eraser'))}" aria-pressed="${this.color === '#ffffff'}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 15.5l9-9 6 6-7 7H8z"/><path d="M9.5 10l6 6M8 19.5h12"/></svg></button>`;
  },
  pick(c) { this.color = c; this.pal.querySelectorAll('.swatch').forEach(s => s.setAttribute('aria-pressed', String(s.dataset.color === c))); },
  tap(e) {
    if (!this.cur) return;
    const el = e.target.closest('[data-ci]'); if (!el) return;
    const g = el.dataset.ci, before = this.map[g] || '#ffffff';
    if (before === this.color) return;
    this.hist.push([g, before]); if (this.hist.length > 60) this.hist.shift();
    this.set(g, this.color);
    // um pequeno salto na zona pintada
    try { el.animate([{ opacity: .55 }, { opacity: 1 }], { duration: 260 }); } catch (err) { }
  },
  set(g, c) {
    if (c === '#ffffff') delete this.map[g]; else this.map[g] = c;
    LineArt.paint(this.svg, g, c);
    ColorStore.set(this.cur.b, this.cur.i, this.map);
  },
  undo() { const h = this.hist.pop(); if (!h) return; this.set(h[0], h[1]); },
  clear() {
    if (!this.cur || !Object.keys(this.map).length) return;
    if (!this.clearArm) { this.clearArm = true; toast(T('clearAgain')); clearTimeout(this.ct); this.ct = setTimeout(() => { this.clearArm = false; }, 2600); return; }
    this.clearArm = false;
    for (const g of Object.keys(this.map)) LineArt.paint(this.svg, g, '#ffffff');
    this.map = {}; this.hist = []; ColorStore.set(this.cur.b, this.cur.i, this.map);
  },
  back() { if (this.isPainting()) this.showGallery(); else App.showShelf(); },
  relang() { if (this.view.hidden) return; if (this.isPainting()) { document.getElementById('cTitle').textContent = tr(Ov.book(this.cur.b).title); this.palette(); } else this.showGallery(); }
};
