#!/usr/bin/env python3
"""Quiz: grava as respostas erradas (scripts/quiz-erradas.txt) no fim de cada livro (campo `wrong`)
e as traduções em src/i18n. Uso: python3 scripts/quiz.py   (depois: node scripts/i18n.mjs)"""
import json, re, subprocess, os, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
W = collections.defaultdict(lambda: collections.defaultdict(list))
for line in open('scripts/quiz-erradas.txt', encoding='utf8'):
    line = line.strip()
    if not line or line.startswith('#'): continue
    key, rest = line.split(':', 1)
    b, q = key.split('.')
    parts = [p.strip() for p in rest.split('|')]
    assert len(parts) == 4, line
    W[b][int(q)].append(parts)

def fr(s):
    s = s.replace("'", '’')
    s = re.sub(r'\s*([!?:;»])', ' \\1', s)
    s = re.sub(r'«\s*', '« ', s)
    return s
def en(s):
    s = s.replace("'", '’')
    s = re.sub(r'"([^"]*)"', '“\\1”', s)
    return s
def es(s): return s.replace("'", '’')

esc = lambda s: s.replace('\\', '\\\\').replace("'", "\\'")
for b, qs in W.items():
    p = f'src/books/{b}.js'; src = open(p, encoding='utf8').read()
    src = re.sub(r"\n  wrong: \[.*?\n  \],?\n", "\n", src, flags=re.S)
    i = src.index('questions: ['); j = src.index('\n  verse:', i)
    rows = ',\n'.join('    [' + ', '.join("'" + esc(w[0]) + "'" for w in qs[k]) + ']' for k in range(5))
    src = src[:j] + f"\n  wrong: [\n{rows}\n  ]," + src[j:]
    open(p, 'w', encoding='utf8').write(src)
subprocess.run(['node', 'scripts/i18n.mjs', '--gravar'], check=False, stdout=subprocess.DEVNULL)  # sai com 1 enquanto há textos por traduzir
comum = json.load(open('src/i18n/_comum.json', encoding='utf8'))
TR = {}
for b, qs in W.items():
    for k, ws in qs.items():
        for pt, e, f, n in ws: TR.setdefault(pt, [es(e), fr(f), en(n)])
filled = 0
for fn in ['_comum'] + list(W):
    path = f'src/i18n/{fn}.json'; d = json.load(open(path, encoding='utf8'))
    for k, v in d.items():
        if k in TR and (not v or not all(v)):
            d[k] = TR[k]; filled += 1
    json.dump(d, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print('traduções novas:', filled)
