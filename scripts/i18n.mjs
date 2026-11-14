// Textos para tradução (espanhol, francês e inglês).
//   node scripts/i18n.mjs                 confere todos os livros: o que falta traduzir e o que sobrou
//   node scripts/i18n.mjs noe davi        só esses livros
//   node scripts/i18n.mjs --gravar        acrescenta os textos novos (vazios) em src/i18n/<livro>.json e tira os que sobraram
//   node scripts/i18n.mjs --lista noe     mostra os textos do livro, na ordem em que aparecem
// Os textos saem dos campos do livro (títulos, páginas, dicas, curiosidades, perguntas, versículo, capa)
// e do código das cenas: api.bubble(..., 'fala'), api.tap(el, 'nome', ...), N('texto') e tr('texto').
// Um texto que aparece em mais de um livro fica em src/i18n/_comum.json.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const cfg = JSON.parse(read('config.json'));
const files = fs.readdirSync(path.join(ROOT, 'src/books')).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
export const BOOKS = [...cfg.order.filter(b => files.includes(b)), ...files.filter(b => !cfg.order.includes(b)).sort()];

/* ---------- os livros, lidos no Node ---------- */
export function loadDefs(ids = BOOKS) {
  const got = [];
  const ctx = vm.createContext({ console, Math, JSON, Number, String, Array, Object, Set, Map });
  vm.runInContext(read('src/js/art.js'), ctx, { filename: 'art.js' });
  ctx.Ov = { addBook: d => got.push(d) };
  ctx.RM = { matches: false }; ctx.svgEl = () => null; ctx.N = s => s; ctx.tr = s => s; ctx.trf = s => s;
  for (const b of ids) vm.runInContext(read(`src/books/${b}.js`), ctx, { filename: `${b}.js` });
  return Object.fromEntries(got.map(d => [d.id, d]));
}

/* ---------- textos dos campos do livro ---------- */
export function structured(d) {
  const out = [];
  const add = s => { if (typeof s === 'string' && s.trim()) out.push(s); };
  add(d.title); const c = d.cover || {}; add(c.kicker); add(c.pre); add(c.title); add(c.small); add(c.sub); add(d.ref);
  for (const sc of d.scenes) {
    add(sc.title); add(sc.ref);
    for (const p of sc.text || []) add(typeof p === 'string' ? p : p && p.q);
    add(sc.factLabel); add(sc.fact); add(sc.hint); add(sc.alt);
    for (const [q, a] of sc.questions || []) { add(q); add(a); }
    if (sc.verse) { add(sc.verse[0]); add(sc.verse[1]); }
    for (const w of sc.wrong || []) for (const s of w) add(s);
  }
  return out;
}

/* ---------- textos do código das cenas ---------- */
// lê a partir de i (logo depois do parêntese) e devolve os argumentos da chamada, como texto, e onde ela termina
function callArgs(src, i) {
  const args = []; let depth = 0, start = i;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "'" || ch === '"') { i = skipStr(src, i); continue; }
    if (ch === '`') { i = skipTpl(src, i); continue; }
    if (ch === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') {
      if (depth === 0) { args.push(src.slice(start, i)); return { args, end: i }; }
      depth--;
    } else if (ch === ',' && depth === 0) { args.push(src.slice(start, i)); start = i + 1; }
    i++;
  }
  return { args, end: i };
}
function skipStr(src, i) {
  const q = src[i]; i++;
  while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; }
  return i + 1;
}
function skipTpl(src, i) {
  i++;
  while (i < src.length && src[i] !== '`') {
    if (src[i] === '\\') { i += 2; continue; }
    if (src[i] === '$' && src[i + 1] === '{') {
      let depth = 1; i += 2;
      while (i < src.length && depth) {
        const ch = src[i];
        if (ch === "'" || ch === '"') { i = skipStr(src, i); continue; }
        if (ch === '`') { i = skipTpl(src, i); continue; }
        if (ch === '{') depth++; else if (ch === '}') depth--;
        i++;
      }
      continue;
    }
    i++;
  }
  return i + 1;
}
// todos os textos entre aspas de um pedaço de código (os de template com ${} são avisados à parte)
function literals(code, warn) {
  const out = [];
  for (let i = 0; i < code.length;) {
    const ch = code[i];
    if (ch === "'" || ch === '"') { const j = skipStr(code, i); out.push(vm.runInNewContext(code.slice(i, j))); i = j; continue; }
    if (ch === '`') {
      const j = skipTpl(code, i), lit = code.slice(i, j);
      if (lit.includes('${')) { if (/[A-Za-zÀ-ÿ]{3,}\s/.test(lit.replace(/\$\{[^}]*\}/g, ''))) warn(lit); }
      else out.push(vm.runInNewContext(lit));
      i = j; continue;
    }
    i++;
  }
  return out;
}
export function codeStrings(src) {
  const out = [], warns = [];
  const scan = (re, argIdx) => {
    for (let m; (m = re.exec(src));) {
      const { args } = callArgs(src, m.index + m[0].length);
      const a = args[argIdx];
      if (a != null) for (const s of literals(a, w => warns.push(w))) if (s.trim()) out.push([m.index, s]);
    }
  };
  scan(/\bapi\.bubble\(/g, 2);
  scan(/\bapi\.tap\(/g, 1);
  scan(/\bapi\.badge\(/g, 2);
  scan(/(?<![\w.])N\(/g, 0);
  scan(/(?<![\w.])tr\(/g, 0);
  scan(/(?<![\w.])trf\(/g, 0);
  out.sort((a, b) => a[0] - b[0]);
  return { list: out.map(x => x[1]), warns };
}

/* ---------- o que parece texto e não está marcado (para conferir à mão) ---------- */
// tira os ${...} de um template, respeitando chaves dentro deles
function stripInterp(t) {
  let out = '', i = 0;
  while (i < t.length) {
    if (t[i] === '$' && t[i + 1] === '{') {
      let depth = 1; i += 2;
      while (i < t.length && depth) { if (t[i] === '{') depth++; else if (t[i] === '}') depth--; i++; }
      out += '\u0000'; continue;
    }
    out += t[i++];
  }
  return out;
}
export function candidates(src, known) {
  const out = new Set();
  const looks = s => /[A-Za-zÀ-ÿ]{3}|[A-Za-zÀ-ÿ][!?.…]$/.test(s) && (/\s/.test(s) || /[!?.…]$/.test(s) || /[À-ÿ]/.test(s) || /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s))
    && !/[<>{}=#;]|^\s*[MLCQZmlcqz][\d\s,.-]/.test(s) && !/^[A-G][#b]?\d$/.test(s) && !/\w\([^)]*\)/.test(s) && !/^x(Min|Mid|Max)Y/.test(s);
  for (let i = 0; i < src.length;) {
    const ch = src[i];
    if (ch === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (ch === '/' && src[i + 1] === '*') { const j = src.indexOf('*/', i + 2); i = j < 0 ? src.length : j + 2; continue; }
    if (ch === "'" || ch === '"') { const j = skipStr(src, i); let s = ''; try { s = vm.runInNewContext(src.slice(i, j)); } catch (e) { } if (looks(s) && !known.has(s)) out.add(s); i = j; continue; }
    if (ch === '`') {
      const j = skipTpl(src, i), lit = stripInterp(src.slice(i + 1, j - 1));
      // texto solto dentro de desenhos: <text ...>Fim</text>
      for (const m of lit.matchAll(/>([^<>\u0000]*[A-Za-zÀ-ÿ]{2,}[^<>\u0000]*)</g)) { const s = m[1].trim(); if (s && !known.has(s) && s !== 'z') out.add('<svg> ' + s); }
      i = j; continue;
    }
    i++;
  }
  return [...out];
}

export function textsOf(id, d, src) {
  const st = structured(d), { list, warns } = codeStrings(src);
  const all = [...new Set([...st, ...list])];
  return { all, warns, cand: candidates(src, new Set(all)) };
}

/* ---------- linha de comando ---------- */
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2);
  const only = args.filter(a => !a.startsWith('--'));
  const gravar = args.includes('--gravar'), lista = args.includes('--lista');
  const ids = only.length ? only : BOOKS;
  const defs = loadDefs(BOOKS);
  const per = {};
  for (const id of BOOKS) per[id] = textsOf(id, defs[id], read(`src/books/${id}.js`));
  if (lista) { for (const id of ids) console.log(JSON.stringify(per[id].all, null, 1)); process.exit(0); }
  // texto usado em mais de um livro vai para _comum
  const count = new Map();
  for (const id of BOOKS) for (const s of per[id].all) count.set(s, (count.get(s) || 0) + 1);
  const comum = new Set([...count].filter(([, n]) => n > 1).map(([s]) => s));
  const jpath = id => path.join(ROOT, 'src/i18n', id + '.json');
  const load = id => { try { return JSON.parse(fs.readFileSync(jpath(id), 'utf8')); } catch (e) { return {}; } };
  const C = load('_comum'), oldC = JSON.stringify(C);
  let falta = 0;
  for (const id of ids) {
    const want = per[id].all.filter(s => !comum.has(s));
    const J = load(id), keys = Object.keys(J);
    const missing = want.filter(s => !J[s] && !C[s]);
    const empty = want.filter(s => J[s] && (!Array.isArray(J[s]) || J[s].length < 3 || J[s].some(x => !x)));
    const stale = keys.filter(k => !want.includes(k));
    falta += missing.length + empty.length;
    console.log(`${id}: ${want.length} textos, ${missing.length} sem tradução, ${empty.length} incompletos, ${stale.length} sobrando`);
    for (const w of per[id].warns) console.log('   texto com variável (use tr com o texto fixo):', w.slice(0, 120));
    for (const c of per[id].cand) console.log('   parece texto e não está marcado:', c.slice(0, 120));
    if (gravar) {
      const out = {};
      for (const s of want) out[s] = J[s] || C[s] || ['', '', ''];
      fs.mkdirSync(path.dirname(jpath(id)), { recursive: true });
      fs.writeFileSync(jpath(id), JSON.stringify(out, null, 1) + '\n');
    }
  }
  const allWant = new Set(BOOKS.flatMap(id => per[id].all));
  for (const s of comum) if (!C[s]) { C[s] = ['', '', '']; for (const id of BOOKS) { const J = load(id); if (J[s] && J[s].every(Boolean)) { C[s] = J[s]; break; } } }
  for (const k of Object.keys(C)) if (!allWant.has(k)) delete C[k];
  const cm = [...comum].filter(s => !C[s] || C[s].some(x => !x));
  console.log(`_comum: ${comum.size} textos usados em mais de um livro, ${cm.length} sem tradução completa`);
  if (gravar && JSON.stringify(C) !== oldC) fs.writeFileSync(jpath('_comum'), JSON.stringify(Object.fromEntries([...comum].map(s => [s, C[s]])), null, 1) + '\n');
  if (falta + cm.length) process.exitCode = 1;
}
