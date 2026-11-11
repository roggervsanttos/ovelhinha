# Grava um vídeo vertical (1080x1920, MP4) de uma história, com som e música.
#   python3 -I scripts/video/gravar.py adao 0,1,5,6,8,9 pt saida.mp4 [--seg=8] [--ritmo=1300]
# Precisa do servidor da raiz do projeto em http://localhost:8766 (python3 -m http.server 8766).
import asyncio, base64, json, os, subprocess, sys, tempfile, time, wave
from playwright.async_api import async_playwright

args = [a for a in sys.argv[1:] if not a.startswith('--')]
opts = dict(a[2:].split('=', 1) for a in sys.argv[1:] if a.startswith('--'))
book, cenas, lang, out = args
seg = opts.get('seg', '8'); ritmo = opts.get('ritmo', '1300'); K = float(opts.get('k', '3'))
BASE = 'http://localhost:8766'

# áudio: repete os sons registados num OfflineAudioContext e junta uma música suave por baixo
AUDIO_JS = r"""async ([log, dur]) => {
  const sr = 44100, ctx = new OfflineAudioContext(2, Math.ceil(sr * dur), sr);
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.connect(ctx.destination);
  const fxOut = ctx.createGain(); fxOut.gain.value = .62; fxOut.connect(comp);
  const musOut = ctx.createGain(); musOut.gain.value = .55; musOut.connect(comp);
  Sound.nb = null;
  // música: acordes de Dó, Lá menor, Fá e Sol, em arpejos lentos (72 bpm)
  Sound.out = musOut;
  const N = n => 440 * Math.pow(2, (n - 69) / 12);
  const prog = [[48, 60, 64, 67], [45, 57, 60, 64], [41, 57, 60, 65], [43, 55, 59, 62]];
  const beat = 60 / 72;
  for (let bar = 0, t = 0; t < dur - 1; bar++) {
    const ch = prog[bar % 4];
    Sound.tone(ctx, t, N(ch[0]), beat * 3.6, 'sine', .09, .05);
    [1, 2, 3, 2, 1, 2, 3, 2].forEach((k, i) => Sound.tone(ctx, t + i * beat / 2, N(ch[k] + 12), beat * .9, 'triangle', .035, .01));
    if (bar % 2 === 1) [76, 74, 72, 74].forEach((m, i) => Sound.tone(ctx, t + i * beat, N(m - (bar % 4 === 3 ? 2 : 0)), beat * .8, 'sine', .03, .02));
    t += beat * 4;
  }
  Sound.out = fxOut;
  for (const e of log) { try { Sound[e.name](ctx, e.t + .02, ...(e.a || [])); } catch (err) { } }
  const buf = await ctx.startRendering();
  // desvanece no fim
  const L = buf.getChannelData(0), R = buf.getChannelData(1), fade = sr * 1.5;
  for (let i = 0; i < fade; i++) { const g = i / fade, j = L.length - 1 - i; L[j] *= g; R[j] *= g; }
  const i16 = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { i16[2 * i] = Math.max(-1, Math.min(1, L[i])) * 32767; i16[2 * i + 1] = Math.max(-1, Math.min(1, R[i])) * 32767; }
  const u8 = new Uint8Array(i16.buffer); let bin = '';
  for (let i = 0; i < u8.length; i += 8192) bin += String.fromCharCode(...u8.subarray(i, i + 8192));
  return btoa(bin);
}"""

# câmara lenta para todas as molduras (também a app dentro do iframe)
SLOW_JS = '''(function(){ const K=__K__; if(K===1) return;
  const st=window.setTimeout.bind(window), si=window.setInterval.bind(window), pn=performance.now.bind(performance), t0=pn(), dn=Date.now, d0=dn();
  window.setTimeout=(f,ms=0,...a)=>st(f,(+ms||0)*K,...a); window.setInterval=(f,ms=0,...a)=>si(f,(+ms||0)*K,...a);
  performance.now=()=>t0+(pn()-t0)/K; Date.now=()=>d0+(dn()-d0)/K; })();'''

async def main():
    tmp = tempfile.mkdtemp(prefix='ovvid-')
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        ctx = await b.new_context(viewport={'width': 1080, 'height': 1920}, record_video_dir=tmp, record_video_size={'width': 1080, 'height': 1920})
        t_page = time.time()
        promo = book == 'promo'
        if promo:
            # vídeo de apresentação: a app de teste corre num "telemóvel" dentro de promo.html
            import shutil
            here = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(os.path.dirname(here))
            shutil.copy(os.path.join(here, 'promo.html'), os.path.join(root, 'dist/teste/promo.html'))
            shutil.copy(os.path.join(root, 'assets/icon-only.png'), os.path.join(root, 'dist/teste/icon-512.png'))
            await ctx.add_init_script(SLOW_JS.replace('__K__', f'{K:g}'))
        pg = await ctx.new_page()
        cdp = await ctx.new_cdp_session(pg)
        await cdp.send('Animation.enable'); await cdp.send('Animation.setPlaybackRate', {'playbackRate': 1 / K})
        if promo:
            fim = opts.get('fim', '')
            await pg.goto(f'http://localhost:8767/promo.html?lang={lang}' + (f'&fim={fim}' if fim else ''))
        else:
            await pg.goto(f'{BASE}/scripts/video/video.html?book={book}&cenas={cenas}&lang={lang}&seg={seg}&ritmo={ritmo}&k={K:g}')
        await pg.wait_for_function('window.READY === true', timeout=90000)
        await pg.wait_for_timeout(400)
        t_go = time.time()
        await pg.evaluate('window.GO = true')
        await pg.wait_for_function('window.DONE', timeout=1800000, polling=500)
        dur = await pg.evaluate('window.DONE'); log = await pg.evaluate('window.LOG')
        vpath = await pg.video.path()
        t_end = time.time()
        await ctx.close()
        # áudio numa página à parte (o motor de som é o mesmo da app)
        ap = await b.new_page()
        await ap.goto(f'{BASE}/.test/scene.html?book={"adao" if promo else book}&i=0')
        pcm = base64.b64decode(await ap.evaluate(AUDIO_JS, [log, dur + .3]))
        await b.close()
    wav = os.path.join(tmp, 'som.wav')
    with wave.open(wav, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(44100); w.writeframes(pcm)
    # o início do vídeo é o fim do ecrã preto (o ecrã preto desaparece no instante em que a história começa)
    bd = subprocess.run(['ffmpeg', '-i', vpath, '-vf', 'blackdetect=d=0.1:pix_th=0.05', '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
    import re
    m = re.search(r'black_start:[\d.]+ black_end:([\d.]+)', bd)
    off = float(m.group(1)) if m else max(0, t_go - t_page)
    # o gravador do Chromium estica o tempo do vídeo; corrige-se comparando a duração do ficheiro com o relógio real
    raw = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', vpath], capture_output=True, text=True).stdout)
    f = (raw - off) / max(1, t_end - t_go)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{off:.2f}', '-i', vpath, '-i', wav, '-t', f'{dur:.2f}',
                    '-filter:v', f'setpts=(PTS-STARTPTS)/{f * K:.5f}', '-map', '0:v', '-map', '1:a', '-r', '30', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium',
                    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], check=True)
    print(json.dumps({'saida': out, 'duracao': round(dur, 1), 'sons': len(log), 'corte_inicio': round(off, 2), 'esticado': round(f, 3)}))

asyncio.run(main())
