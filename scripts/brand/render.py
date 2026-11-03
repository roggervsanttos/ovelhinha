# Gera os ícones, as telas de abertura e as imagens das lojas a partir de brand.html.
# Precisa de um servidor na raiz do projeto: python3 -m http.server 8766   (e depois: python3 scripts/brand/render.py [tipos...])
import sys, asyncio, os
from playwright.async_api import async_playwright
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
JOBS = [
    # tipo, largura, altura, saídas, fundo transparente
    ('icon', 1024, 1024, ['assets/icon-only.png', 'store/app-store/icone-1024.png'], False),
    ('icon-fg', 1024, 1024, ['assets/icon-foreground.png'], True),
    ('icon-bg', 1024, 1024, ['assets/icon-background.png'], False),
    ('splash', 2732, 2732, ['assets/splash.png'], False),
    ('splash-dark', 2732, 2732, ['assets/splash-dark.png'], False),
    ('icon', 512, 512, ['src/img/icon-512.png', 'store/google-play/icone-512.png'], False),
    ('icon', 192, 192, ['src/img/icon-192.png'], False),
    ('icon', 180, 180, ['src/img/apple-touch-icon.png'], False),
    ('maskable', 512, 512, ['src/img/icon-maskable-512.png'], False),
    ('og', 1200, 630, ['src/img/og.png'], False),
    ('feature', 1024, 500, ['store/google-play/destaque-1024x500.png'], False),
]
async def main():
    only = sys.argv[1:]
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for kind, w, h, outs, transparent in JOBS:
            if only and kind not in only: continue
            pg = await b.new_page(viewport={'width': w, 'height': h})
            await pg.goto(f'http://localhost:8766/scripts/brand/brand.html?kind={kind}&w={w}&h={h}')
            await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300)
            first = os.path.join(ROOT, outs[0]); os.makedirs(os.path.dirname(first), exist_ok=True)
            await pg.screenshot(path=first, omit_background=transparent)
            im = Image.open(first)
            if not transparent: im = im.convert('RGB')   # a App Store não aceita ícone com transparência
            im.save(first, optimize=True)
            for o in outs[1:]:
                path = os.path.join(ROOT, o); os.makedirs(os.path.dirname(path), exist_ok=True); im.save(path, optimize=True)
            print(kind, w, 'x', h, '->', ', '.join(outs))
            await pg.close()
        await b.close()
asyncio.run(main())
