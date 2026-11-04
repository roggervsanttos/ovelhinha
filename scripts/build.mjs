// Monta o Ovelhinha a partir de src/:
//   node scripts/build.mjs            -> dist/web, dist/native e dist/artifact
//   node scripts/build.mjs web        -> só o site (GitHub Pages, funciona sem internet)
//   node scripts/build.mjs native     -> só o app (Capacitor copia dist/native para Android e iPhone)
//   node scripts/build.mjs artifact   -> prévia de uma página só (fontes do Google, sem ícones)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = p => fs.existsSync(path.join(ROOT, p));

const cfg = JSON.parse(read('config.json'));
const ALL = ['web', 'native', 'artifact'];
const targets = process.argv.slice(2).filter(a => !a.startsWith('-'));
for (const t of targets) if (!ALL.includes(t)) { console.error(`Alvo desconhecido: ${t} (use ${ALL.join(', ')})`); process.exit(1); }
const want = targets.length ? targets : ALL;

/* ---------- livros: a ordem vem do config.json; livros fora da lista vão para o fim ---------- */
const bookFiles = fs.readdirSync(path.join(SRC, 'books')).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort();
for (const id of cfg.order) if (!bookFiles.includes(id)) { console.error(`config.json pede o livro "${id}", mas src/books/${id}.js não existe.`); process.exit(1); }
const books = [...cfg.order, ...bookFiles.filter(b => !cfg.order.includes(b))];
// histórias grátis (config.json "free"); as outras são destrancadas no app com uma compra única
const FREE = cfg.free || [];
for (const id of FREE) if (!books.includes(id)) { console.error(`config.json diz que "${id}" é grátis, mas esse livro não existe.`); process.exit(1); }
const PAID = FREE.length ? books.filter(b => !FREE.includes(b)) : [];

/* ---------- arquivos de cada parte ---------- */
const CSS_APP = ['src/css/base.css', 'src/css/shell.css'];
const JS = ['art', 'linguas', 'engine', 'loja', 'app'];
// traduções: src/i18n/<livro>.json e src/i18n/_comum.json = { "texto em português": ["espanhol", "francês", "inglês"] }
const I18N_DIR = path.join(SRC, 'i18n');
const I18N_FILES = exists('src/i18n') ? fs.readdirSync(I18N_DIR).filter(f => f.endsWith('.json')).sort() : [];
const LANGS = ['pt', 'es', 'fr', 'en'];
const legalFile = (name, l) => `src/legal/${name}${l === 'pt' ? '' : '.' + l}.body.html`;
const IMG = exists('src/img') ? fs.readdirSync(path.join(SRC, 'img')).filter(f => /\.(png|svg|jpg|webp|ico)$/.test(f)).sort() : [];
const FONTS = fs.readdirSync(path.join(SRC, 'fonts')).sort();

/* ---------- versão: muda sempre que qualquer coisa do app muda ---------- */
const h = crypto.createHash('sha256');
for (const p of [...CSS_APP, 'src/css/art.css', 'src/css/fonts.css', ...JS.map(j => `src/js/${j}.js`), ...books.map(b => `src/books/${b}.js`), ...I18N_FILES.map(f => `src/i18n/${f}`), ...LANGS.map(l => legalFile('privacidade', l)).filter(exists), 'src/index.html', 'src/legal/page.html', 'src/legal/suporte.body.html', 'src/legal/termos.body.html', 'config.json', 'scripts/build.mjs', 'scripts/native-entry.js']) h.update(p + '\0' + read(p));
for (const f of IMG) h.update(f + fs.statSync(path.join(SRC, 'img', f)).size);
const V = `${cfg.version}-${h.digest('hex').slice(0, 8)}`;

const EMAIL = cfg.emailConfirmed ? cfg.email : '';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fill = s => s.replaceAll('{{V}}', V).replaceAll('{{VERSION}}', `${cfg.version} (${cfg.build})`).replaceAll('{{EMAILRAW}}', esc(EMAIL)).replaceAll('{{EMAIL}}', EMAIL ? esc(EMAIL) : '(e-mail em breve)');
// traduções de um livro (ou as comuns); no site, um livro pago leva só as da capa
const json = f => { try { return JSON.parse(read(`src/i18n/${f}.json`)); } catch (e) { if (exists(`src/i18n/${f}.json`)) throw new Error(`src/i18n/${f}.json não é um JSON válido: ${e.message}`); return {}; } };
function i18nOf(id, onlyCover) {
  const all = json(id);
  if (!onlyCover) return all;
  const d = defs()[id], keep = new Set([d.title, d.ref, ...Object.values(d.cover || {})]);
  return Object.fromEntries(Object.entries(all).filter(([k]) => keep.has(k)));
}

function out(dir, rel, data) {
  const p = path.join(dir, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, data);
}
function copy(dir, from, rel) { out(dir, rel, fs.readFileSync(path.join(ROOT, from))); }
function clean(dir) { fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true }); }
function size(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) n += e.isDirectory() ? size(path.join(dir, e.name)) : fs.statSync(path.join(dir, e.name)).size;
  return n;
}

const SITE_DESC = 'Livros infantis animados para ler e tocar: histórias da Bíblia, de Adão e Eva até à Páscoa, com Noé, Davi, Jonas, Ester, o nascimento de Jesus e muito mais. Em português, espanhol, francês e inglês.';
const GOOGLE_FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika:ital,wght@0,400;0,700;1,400&family=Grandstander:wght@600;700;800;900&display=swap">';

function page(target) {
  let t = read('src/index.html');
  // loja: compra de verdade no app, simulada na prévia; o site não vende (os livros pagos levam para o app)
  const config = { target, version: cfg.version, build: cfg.build, email: EMAIL, site: cfg.site || '', appStore: cfg.appStore || '', playStore: cfg.playStore || '', order: books,
    free: FREE, price: cfg.price ?? .99, currency: cfg.currency || 'EUR', productPrefix: cfg.productPrefix || 'livro_', store: target === 'native' ? 'native' : target === 'artifact' ? 'demo' : 'web' };
  const webOnly = target === 'web' ? [
    '<meta name="theme-color" content="#8fd0f2" media="(prefers-color-scheme: light)">',
    '<meta name="theme-color" content="#0e1438" media="(prefers-color-scheme: dark)">',
    '<link rel="manifest" href="manifest.webmanifest">',
    '<link rel="icon" href="img/icon-192.png" type="image/png">',
    '<link rel="apple-touch-icon" href="img/apple-touch-icon.png">',
    '<meta name="apple-mobile-web-app-title" content="Ovelhinha">',
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${esc(cfg.fullName)}">`,
    `<meta property="og:description" content="${esc(SITE_DESC)}">`,
    `<meta property="og:image" content="${cfg.site ? esc(cfg.site.replace(/\/?$/, '/')) : ''}img/og.png">`,
    '<meta name="twitter:card" content="summary_large_image">'
  ].join('\n') : target === 'native' ? '<meta name="theme-color" content="#8fd0f2">' : '';
  t = t.replace('<!--WEBONLY-->', webOnly);
  t = t.replace('<!--FONTS-->', target === 'artifact' ? GOOGLE_FONTS : '<link rel="stylesheet" href="css/fonts.css?v={{V}}">');
  // a política de privacidade em cada língua; a app mostra a da língua escolhida
  t = t.replace('<!--POLICY-->', LANGS.filter(l => exists(legalFile('privacidade', l))).map(l => `<div data-lang-only="${l}"${l === 'pt' ? '' : ' hidden'}>${read(legalFile('privacidade', l)).trim()}</div>`).join('\n'));
  t = t.replace('<!--CONFIG-->', `<script>window.OV_CONFIG = ${JSON.stringify(config)};</script>`);
  t = t.replace('<!--BOOKS-->', books.map(b => `<script src="books/${b}.js?v={{V}}"></script>`).join('\n'));
  t = t.replace('<!--NATIVE-->', target === 'native' ? '<script src="js/native.js?v={{V}}"></script>' : '');
  t = fill(t);
  if (target === 'artifact') {
    // a prévia ganha o esqueleto da página na hora de publicar: fica só o conteúdo
    t = t.slice(t.indexOf('<!--HEAD-START-->') + '<!--HEAD-START-->'.length)
      .replace('</head>', '').replace('<body>', '').replace('</body>', '').replace('</html>', '')
      .replaceAll(`?v=${V}`, '').trim() + '\n';
  } else t = t.replace('<!--HEAD-START-->\n', '');
  if (/\{\{|<!--[A-Z]+-->/.test(t)) throw new Error(`Sobrou um marcador sem trocar em ${target}/index.html`);
  return t;
}

function common(dir, target) {
  out(dir, 'index.html', page(target));
  out(dir, 'css/app.css', CSS_APP.map(read).join('\n'));
  copy(dir, 'src/css/art.css', 'css/art.css');
  for (const j of JS) out(dir, `js/${j}.js`, read(`src/js/${j}.js`) + (j === 'linguas' ? `\nI18N.add(${JSON.stringify(json('_comum'))});\n` : ''));
  for (const b of books) {
    // no site, os livros pagos vão só com a capa (o livro inteiro fica na app)
    const pago = target === 'web' && PAID.includes(b);
    out(dir, `books/${b}.js`, (pago ? stub(b) : read(`src/books/${b}.js`)) + `\nI18N.add(${JSON.stringify(i18nOf(b, pago))});\n`);
  }
  if (target !== 'artifact') {
    copy(dir, 'src/css/fonts.css', 'css/fonts.css');
    for (const f of FONTS) copy(dir, `src/fonts/${f}`, `fonts/${f}`);
  }
}

/* os livros lidos aqui mesmo, no Node (títulos para os textos e capas para o site) */
let DEFS = null, setP = null;
function defs() {
  if (!DEFS) {
    const got = [];
    const ctx = vm.createContext({ console, Math, JSON, Number, String, Array, Object, Set, Map });
    vm.runInContext(read('src/js/art.js') + '\n;globalThis.__setP = v => { P = v; };', ctx, { filename: 'art.js' });
    ctx.Ov = { addBook: d => got.push(d) };
    ctx.RM = { matches: false }; ctx.svgEl = () => null; ctx.N = s => s; ctx.tr = s => s; ctx.trf = s => s;
    for (const b of books) vm.runInContext(read(`src/books/${b}.js`), ctx, { filename: `${b}.js` });
    DEFS = Object.fromEntries(got.map(d => [d.id, d])); setP = ctx.__setP;
  }
  return DEFS;
}
/* capa de um livro pago para o site: o desenho da capa já pronto, sem as páginas */
function stub(id) {
  const d = defs()[id];
  if (!d) throw new Error(`Não consegui montar a capa de ${id} para o site.`);
  setP('sh' + d.id);
  const sc = d.scenes[0];
  const def = { id: d.id, title: d.title, cover: d.cover, color: d.color, ref: d.ref, stub: true };
  return `/* ${d.title}: no site só a capa; o livro inteiro está no app */\nOv.addBook(Object.assign(${JSON.stringify(def)}, { scenes: [{ vb: ${JSON.stringify(sc.vb || [800, 1100])}, art: () => ${JSON.stringify(sc.art())} }] }));\n`;
}
/* "A, B e C" e números por extenso para os textos */
const lista = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1];
const EXTENSO = ['zero', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezasseis', 'dezassete', 'dezoito', 'dezanove', 'vinte', 'vinte e uma', 'vinte e duas', 'vinte e três', 'vinte e quatro',
  'vinte e cinco', 'vinte e seis', 'vinte e sete', 'vinte e oito', 'vinte e nove', 'trinta',
  ...['quarenta', 'cinquenta'].flatMap((d, i) => [
    ...['uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'].map(u => `${i ? 'quarenta' : 'trinta'} e ${u}`), d])];
const extenso = n => EXTENSO[n] || String(n);
const cap = t => t.charAt(0).toUpperCase() + t.slice(1);

function legal(dir) {
  const tpl = read('src/legal/page.html');
  const t = id => `«${defs()[id].title}»`;
  for (const [file, title] of [['privacidade', 'Política de privacidade'], ['termos', 'Termos de utilização'], ['suporte', 'Suporte']]) {
    const body = read(`src/legal/${file}.body.html`).trim()
      .replaceAll('{{LIVROS}}', lista(books.map(t)))
      .replaceAll('{{N_LIVROS}}', String(books.length))
      .replaceAll('{{GRATIS}}', lista(FREE.map(t)))
      .replaceAll('{{N_GRATIS}}', cap(extenso(FREE.length)))
      .replaceAll('{{N_PAGAS}}', extenso(PAID.length))
      .replace(/([!?])\./g, '$1');   // "Jesus Está Vivo!." -> "Jesus Está Vivo!"
    out(dir, `${file}.html`, fill(tpl.replaceAll('{{TITLE}}', title).replace('{{BODY}}', body)));
  }
}

function buildWeb() {
  const dir = path.join(DIST, 'web'); clean(dir);
  common(dir, 'web');
  for (const f of IMG) copy(dir, `src/img/${f}`, `img/${f}`);
  legal(dir);
  const icon = (src, sz, purpose) => IMG.includes(src) ? [{ src: `img/${src}`, sizes: sz, type: 'image/png', purpose }] : [];
  out(dir, 'manifest.webmanifest', JSON.stringify({
    name: cfg.fullName, short_name: cfg.appName, description: SITE_DESC, lang: 'pt-PT', dir: 'ltr',
    id: './', start_url: './', scope: './', display: 'standalone', orientation: 'any',
    background_color: '#8fd0f2', theme_color: '#8fd0f2', categories: ['books', 'education', 'kids'],
    icons: [...icon('icon-192.png', '192x192', 'any'), ...icon('icon-512.png', '512x512', 'any'), ...icon('icon-maskable-512.png', '512x512', 'maskable')]
  }, null, 2));
  out(dir, '.nojekyll', '');
  // service worker: guarda tudo na primeira visita para funcionar sem internet
  const files = ['./', 'index.html', 'manifest.webmanifest', 'privacidade.html', 'termos.html', 'suporte.html', 'css/app.css', 'css/art.css', 'css/fonts.css',
    ...JS.map(j => `js/${j}.js`), ...books.map(b => `books/${b}.js`), ...FONTS.filter(f => f.endsWith('.woff2')).map(f => `fonts/${f}`), ...IMG.map(f => `img/${f}`)];
  out(dir, 'sw.js', `// Ovelhinha ${V}: guarda o app no aparelho para funcionar sem internet
const CACHE = 'ovelhinha-${V}';
const FILES = ${JSON.stringify(files)};
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('ovelhinha-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).catch(() => caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
`);
  return dir;
}

async function buildNative() {
  const dir = path.join(DIST, 'native'); clean(dir);
  common(dir, 'native');
  const esbuild = await import('esbuild');
  await esbuild.build({ entryPoints: [path.join(ROOT, 'scripts/native-entry.js')], bundle: true, minify: true, format: 'iife', target: ['es2019', 'safari15'], outfile: path.join(dir, 'js/native.js'), logLevel: 'warning', legalComments: 'none' });
  return dir;
}

function buildArtifact() {
  const dir = path.join(DIST, 'artifact'); clean(dir);
  common(dir, 'artifact');
  return dir;
}

const kb = n => (n / 1024).toFixed(0) + ' KB';
for (const t of want) {
  const dir = t === 'web' ? buildWeb() : t === 'native' ? await buildNative() : buildArtifact();
  console.log(`${t.padEnd(8)} ${V}  ${kb(size(dir))}  ${path.relative(ROOT, dir)}`);
}
console.log(`livros: ${books.join(', ')}`);
if (PAID.length) console.log(`grátis: ${FREE.join(', ')} · para destrancar (${cfg.price || '0,99 €'}): ${PAID.join(', ')}`);
