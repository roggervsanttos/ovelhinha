# Gera as fotos das lojas (App Store e Google Play) a partir do app de verdade.
#   node scripts/build.mjs native
#   python3 scripts/store/screens.py                  todas as fotos de todos os aparelhos
#   python3 scripts/store/screens.py iphone moises    só um aparelho e/ou só uma foto
#   python3 scripts/store/screens.py --cru            só a tela do app, sem moldura (para conferir)
#   python3 scripts/store/screens.py --revisao        a tela de compra que a Apple pede para cada compra dentro do app
# Precisa do Playwright (pip install playwright) e do Pillow.
import sys, os, asyncio, threading, functools, shutil, urllib.parse, json, re
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.async_api import async_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TMP = os.path.join(ROOT, 'store', '.tmp')
CFG = json.load(open(os.path.join(ROOT, 'config.json')))
PAID = [b for b in CFG['order'] if CFG.get('free') and b not in CFG['free']]
# nas fotos de dentro dos livros, as histórias extras aparecem destrancadas; a estante e a área dos pais mostram os cadeados
UNLOCK = f"try {{ localStorage.setItem('ov:compras', {json.dumps(json.dumps(PAID))}); }} catch (e) {{ }}"

# tamanho final, área da tela do app dentro da moldura e tamanho da frase
DEVICES = {
    'iphone':  dict(out='store/app-store/iphone-6.9',   w=1320, h=2868, vp=(408, 880),  dsf=2.5, x=150, y=520, r=72, b=26, fs=92,  cy=262, two=True),
    'ipad':    dict(out='store/app-store/ipad-13',      w=2752, h=2064, vp=(1160, 800), dsf=2,   x=216, y=360, r=40, b=22, fs=104, cy=182, two=False),
    'celular': dict(out='store/google-play/celular',    w=1080, h=1920, vp=(390, 765),  dsf=2,   x=150, y=320, r=54, b=20, fs=66,  cy=162, two=True),
    'tablet':  dict(out='store/google-play/tablet-10',  w=2560, h=1440, vp=(1280, 800), dsf=1.3, x=448, y=262, r=34, b=20, fs=96,  cy=132, two=False),
}

# nome, endereço no app, toques (elemento, espera em ms depois do toque), espera final, frase
SHOTS = [
    ('estante', 'estante', [], 900, ('Histórias da Bíblia', 'para ler, tocar e aprender')),
    ('moises', 'moises-10', [('cajado', 3300)], 300, ('Toca no cajado', 'e o mar abre-se!')),
    ('davi', 'davi-2', [('davi', 230), ('davi', 230), ('star1', 160), ('davi', 230), ('z1', 420)], 0, ('Sons e música', 'a cada toque')),
    ('quiz', 'estante', [], 700, ('Um quiz em cada história', 'para aprender a brincar')),
    ('colorir', 'estante', [], 500, ('Desenhos para colorir', 'com um só toque')),
    ('noe', 'noe-12', [('nuvem', 2900)], 200, ('Ilustrações animadas', 'em todas as páginas')),
    ('ovelha', 'ovelha-7', [('pastor', 1200)], 300, ('Histórias que mostram', 'o amor de Deus')),
    ('pais', 'estante', [], 600, ('Área dos pais com', 'tempo de ecrã e sem anúncios')),
]

# quiz: uma pergunta do Davi já respondida (botão verde e estrelas)
QUIZ = """() => { App.showQuiz('davi'); Quiz.cur.order = [1, 0, 2, 3, 4]; Quiz.ask();
  document.querySelector('.qopt[data-ok="0"]').click(); document.querySelector('.qopt[data-ok="1"]').click(); }"""
# colorir: o desenho da festa da Ovelhinha meio pintado com as cores originais
COLORIR = """() => { App.showColor(); Colorir.open('ovelha', 7);
  const seen = new Set();
  for (const el of Colorir.svg.querySelectorAll('[data-ci]')) {
    const g = el.dataset.ci, c = el.dataset.oc || '';
    if (seen.has(g) || !/^rgb/.test(c)) continue; seen.add(g);
    const b = el.getBBox(); if (b.x + b.width / 2 > 520) continue;
    const m = c.match(/[\\d.]+/g).map(Number), hex = '#' + m.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
    Colorir.map[g] = hex; LineArt.paint(Colorir.svg, g, hex);
  }
  Colorir.pick('#3f7fd0'); }"""

CLEAN = '#btnFull, .email, #installCard, svg.scene .cue { display: none !important; } * { caret-color: transparent !important; }'

TAP = """k => {
  const el = document.querySelector(`#book [data-k="${k}"]`);
  if (!el) return false;
  const t = el.classList.contains('tap') ? el : (el.closest('.tap') || el.querySelector('.tap') || el);
  t.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  return true;
}"""

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

def serve():
    srv = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f'http://127.0.0.1:{srv.server_port}'

async def app_shot(b, base, dev, shot, path, dsf):
    name, where, taps, settle, _ = shot
    ctx = await b.new_context(viewport={'width': dev['vp'][0], 'height': dev['vp'][1]}, device_scale_factor=dsf, color_scheme='light', locale='pt-PT')
    if name not in ('estante', 'pais', 'colorir'): await ctx.add_init_script(UNLOCK)
    pg = await ctx.new_page()
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto(f'{base}/dist/native/index.html' + (f'#{where}' if where else ''))
    await pg.add_style_tag(content=CLEAN)
    await pg.evaluate('document.fonts.ready')
    await pg.wait_for_timeout(1400)
    if name == 'pais':
        await pg.evaluate("() => { store.set('ov:tempo', '30'); Parents.open(); Parents.unlock(); }")
        await pg.wait_for_timeout(300)
        await pg.evaluate("() => { const g = document.getElementById('tempoOpts'); g.closest('.group').scrollIntoView({ block: 'center' }); }")
    if name == 'quiz': await pg.evaluate(QUIZ)
    if name == 'colorir': await pg.evaluate(COLORIR)
    for k, ms in taps:
        if not await pg.evaluate(TAP, k): errs.append(f'não achei o elemento "{k}"')
        await pg.wait_for_timeout(ms)
    await pg.wait_for_timeout(settle)
    await pg.screenshot(path=path)
    await ctx.close()
    if errs: print(f'  atenção em {name}:', *errs)

async def frame(b, base, dev, cap, raw, out):
    pg = await b.new_page(viewport={'width': dev['w'], 'height': dev['h']})
    iw, ih = round(dev['vp'][0] * dev['dsf']), round(dev['vp'][1] * dev['dsf'])
    q = dict(w=dev['w'], h=dev['h'], x=dev['x'], y=dev['y'], iw=iw, ih=ih, r=dev['r'], b=dev['b'], fs=dev['fs'], cy=dev['cy'],
             cap='|'.join(cap) if dev['two'] else ' '.join(cap), img='/' + os.path.relpath(raw, ROOT).replace(os.sep, '/'))
    await pg.goto(f'{base}/scripts/store/frame.html?' + urllib.parse.urlencode(q))
    await pg.evaluate('document.fonts.ready')
    await pg.evaluate('window.frameReady')
    await pg.wait_for_timeout(250)
    await pg.screenshot(path=out)
    await pg.close()
    Image.open(out).convert('RGB').save(out, optimize=True)   # as lojas não aceitam transparência

# tela de compra para a revisão da Apple (iPhone 6,7 polegadas, sem moldura)
NUM = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
async def review_shot(b, base):
    ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=3, color_scheme='light', locale='pt-PT')
    await ctx.add_init_script("window.OvNative = { platform: 'ios', App: { addListener() {}, exitApp() {} }, Haptics: { impact: () => Promise.resolve() }, ImpactStyle: {}, SplashScreen: { hide: () => Promise.resolve() }, StatusBar: { setStyle: () => Promise.resolve() }, Style: {} };")
    pg = await ctx.new_page()
    await pg.goto(f'{base}/dist/native/index.html#estante')
    await pg.add_style_tag(content=CLEAN)
    await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(1200)
    await pg.locator(f'#shelfGrid [data-book="{PAID[0]}"]').click(); await pg.wait_for_timeout(300)
    await pg.locator('#ulAdult').click(); await pg.wait_for_timeout(200)
    m = re.search(r'Quanto é (\S+) vezes (\S+)\?', await pg.locator('#ulGate .gate-q').text_content())
    n = NUM.index(m.group(1)) * NUM.index(m.group(2))
    for d in str(n): await pg.locator(f'#ulGate .pad button[data-k="{d}"]').click()
    if n < 10: await pg.locator('#ulGate .pad button[data-k="ok"]').click()
    await pg.wait_for_timeout(600)
    out = os.path.join(ROOT, 'store', 'app-store', 'compra-revisao.png')
    await pg.screenshot(path=out)
    await ctx.close()
    Image.open(out).convert('RGB').save(out, optimize=True)
    w, h = Image.open(out).size
    print(f'revisão  {w}x{h}  {os.path.relpath(out, ROOT)}')

async def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    cru = '--cru' in sys.argv
    if '--revisao' in sys.argv:
        srv, base = serve()
        try:
            async with async_playwright() as p:
                b = await p.chromium.launch(); await review_shot(b, base); await b.close()
        finally: srv.shutdown()
        return
    devs = [d for d in DEVICES if d in args] or list(DEVICES)
    shots = [s for s in SHOTS if s[0] in args] or SHOTS
    if not os.path.exists(os.path.join(ROOT, 'dist', 'native', 'index.html')):
        sys.exit('Rode antes: node scripts/build.mjs native')
    os.makedirs(TMP, exist_ok=True)
    srv, base = serve()
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            for d in devs:
                dev = DEVICES[d]
                outdir = os.path.join(ROOT, dev['out']); os.makedirs(outdir, exist_ok=True)
                for i, shot in enumerate(SHOTS):
                    if shot not in shots: continue
                    raw = os.path.join(TMP, f'{d}-{shot[0]}.png')
                    await app_shot(b, base, dev, shot, raw, dev['dsf'])
                    if cru:
                        print(d, shot[0], '->', os.path.relpath(raw, ROOT)); continue
                    out = os.path.join(outdir, f'{i + 1}-{shot[0]}.png')
                    await frame(b, base, dev, shot[4], raw, out)
                    w, h = Image.open(out).size
                    print(f'{d:8} {w}x{h}  {os.path.relpath(out, ROOT)}')
            await b.close()
    finally:
        srv.shutdown()
        if not cru: shutil.rmtree(TMP, ignore_errors=True)

asyncio.run(main())
