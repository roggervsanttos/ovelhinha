# Ovelhinha: Histórias da Bíblia

Livros infantis animados para ler e tocar. São 35 histórias da Bíblia, contadas com frases curtas
para crianças pequenas: Adão e Eva, Noé e a Grande Arca, A Torre de Babel, Abraão e as Estrelas,
Jacó e o Novo Nome, José e a Túnica Colorida, Moisés e o Mar Vermelho, Josué e as Muralhas de Jericó,
Gideão e os 300, Rute e Noemi, Samuel, o Menino que Ouviu Deus, Davi, o Pastorzinho, Elias e o Fogo
do Céu, Naamã e a Menina Corajosa, Jonas e o Grande Peixe, Os Três Amigos na Fornalha, Daniel na Cova
dos Leões, Ester, a Rainha Corajosa, O Nascimento de Jesus, O Menino Jesus no Templo, Pedro, Tiago e
João no Barquinho, A Casa na Rocha, Jesus Acalma a Tempestade, Jesus e a Filha de Jairo, Cinco Pães e
Dois Peixes, Jesus Anda sobre as Águas, O Bom Samaritano, Os Dez Leprosos, A Ovelhinha Perdida, O Filho
que Voltou, Jesus e as Crianças, Jesus e o Cego Bartimeu, Zaqueu, o Homem Pequenino, A Páscoa: Jesus
Está Vivo! e Paulo e Silas na Prisão.

A app está em quatro línguas: português (de Portugal, com os nomes bíblicos como no Brasil: Davi,
Jacó, Isaque…), espanhol, francês e inglês. Muda-se de língua tocando na bandeira, no ecrã inicial ou no topo da estante.

A app abre num ecrã inicial, com a ovelhinha no prado e o botão **Começar**, que leva à estante com todas as histórias
(o endereço `#estante` abre direto a estante; o botão Voltar do Android, na estante, regressa ao ecrã inicial).

Cinco histórias são grátis e aparecem primeiro na estante; as outras 25 vêm a seguir e são
desbloqueadas na app, uma a uma, por 0,99 € cada (veja **Histórias grátis e compras**).

O mesmo código dá origem a três coisas:

| Versão | Onde fica | Como é gerada |
| --- | --- | --- |
| Site instalável (funciona sem internet), só com as histórias grátis | GitHub Pages, em https://roggervsanttos.github.io/ovelhinha/ | `.github/workflows/site.yml`, a cada alteração |
| App de Android (.aab e .apk) | Google Play | Actions > **Android** > Run workflow |
| App de iPhone e iPad | App Store (TestFlight) | Actions > **iPhone e iPad** > Run workflow |

O contacto público é ovelhinha.app@gmail.com. O site fica no endereço grátis do GitHub Pages (sem domínio próprio desde nov. 2026;
o domínio aovelhinha.com e o Google Workspace foram cancelados). Em Settings > Pages, o campo Custom domain tem de ficar vazio.

## Pastas

- `src/` a app: `index.html`, estilos (`css/`), motor dos livros (`js/engine.js`), desenhos (`js/art.js`),
  línguas e textos dos botões (`js/linguas.js`), histórias extra e compras (`js/loja.js`), ecrã inicial, estante e área dos pais (`js/app.js`)
- `src/books/` um ficheiro por livro (`adao.js`, `noe.js`, `babel.js`, `abraao.js`, `jaco.js`, `jose.js`, `moises.js`,
  `josue.js`, `gideao.js`, `rute.js`, `samuel.js`, `davi.js`, `elias.js`, `naama.js`, `jonas.js`, `fornalha.js`, `daniel.js`, `ester.js`,
  `natal.js`, `templo.js`, `pesca.js`, `rocha.js`, `tempestade.js`, `jairo.js`, `paes.js`, `aguas.js`, `samaritano.js`, `leprosos.js`, `ovelha.js`,
  `prodigo.js`, `criancas.js`, `cego.js`, `zaqueu.js`, `pascoa.js`, `paulo.js`)
- `src/i18n/` as traduções: um ficheiro por livro e `_comum.json` para os textos que aparecem em mais de um livro
- `src/legal/` política de privacidade (nas quatro línguas) e página de suporte
- `config.json` nome, versão, e-mail de contacto, endereços das lojas, ordem dos livros na estante, histórias grátis e preço
- `android/` e `ios/` projetos nativos (Capacitor)
- `store/` ícones, imagens e textos das lojas (`store/TEXTOS.md`, nas quatro línguas)
- `scripts/` montagem (`build.mjs`), verificação das traduções (`i18n.mjs`), envio para a Apple (`apple.mjs`, `ios-enviar.sh`),
  arte do ícone (`brand/`) e fotos das lojas (`store/`)

## No computador

```bash
npm ci
node scripts/i18n.mjs           # confirma que todos os textos têm tradução
node scripts/build.mjs          # gera dist/web, dist/native e dist/artifact
npx cap sync                    # copia dist/native para os projetos de Android e iPhone
```

Para ver o site: `cd dist/web && python3 -m http.server 8765` e abra http://localhost:8765.

Para refazer as fotos das lojas depois de mudar os livros (precisa de Python com Playwright e Pillow):

```bash
node scripts/build.mjs native
python3 scripts/store/screens.py
```

## Línguas

Os livros são escritos em português, e cada texto em português é a chave da tradução. Em `src/i18n/<livro>.json`
fica, para cada texto, a lista `[espanhol, francês, inglês]`:

```json
{ "Toca na estrela.": ["Toca la estrella.", "Touche l’étoile.", "Tap the star."] }
```

- Ao mudar uma frase em português num livro, mude também a chave no ficheiro de traduções
  (senão a frase aparece em português nas outras línguas).
- `node scripts/i18n.mjs` mostra, livro a livro, os textos sem tradução ou com traduções a mais.
- Os nomes dos botões e das mensagens da app estão em `src/js/linguas.js`.
- Em francês, use um espaço fixo antes de `! ? : ;` e dentro de `« »` (como nos ficheiros que já existem).
- Nas traduções, cada língua usa os nomes que as crianças dessa língua conhecem (David, Noah, Moïse…).

## Histórias grátis e compras

Em `config.json`, `free` lista as histórias grátis, `price` é o preço mostrado enquanto a loja ainda não respondeu
(na app vale sempre o preço que a App Store ou o Google Play indicarem) e `productPrefix` é o início do ID de
cada produto: a história `moises` é vendida como `livro_moises`. Para mudar as histórias grátis, basta
mudar a lista `free` e montar de novo. A estante segue a ordem de `order`: hoje, primeiro as cinco grátis
e depois as pagas, cada grupo pela ordem da Bíblia (se mudar a lista `free`, mude também a `order`).

- **App (iPhone e Android):** as histórias pagas aparecem com um cadeado. A compra começa sempre depois da
  pergunta para adultos (uma exigência das lojas para apps infantis): tocando no livro com cadeado e em
  "Sou adulto", ou na Área dos pais, em **Histórias extras**, onde também está **Restaurar compras**.
  As compras usam o plugin `@capgo/native-purchases` (StoreKit 2 e Google Play Billing), sem servidor:
  a app pergunta à loja o que a conta já comprou e guarda a lista no dispositivo.
- **Site:** os livros pagos levam só a capa (o desenho já pronto, sem as páginas) e encaminham para a app.
- **Pré-visualização:** a compra é só simulada.

Cada produto tem de ser criado na App Store Connect e no Play Console com o mesmo ID (lista em `store/TEXTOS.md`).

## Desenhos para colorir

- Na estante, o cartão «Desenhos para colorir» abre uma galeria com desenhos das histórias que a criança já tem (grátis ou compradas).
- Os desenhos são as próprias ilustrações dos livros, passadas a linhas brancas em `src/js/colorir.js`: escolhe-se uma cor e toca-se numa zona para a pintar. Há borracha, desfazer e apagar tudo.
- As páginas de cada livro estão em `COLOR_PAGES` (no início de `colorir.js`); para pôr desenhos de outro livro, junte lá o livro e os números das cenas.
- As pinturas ficam guardadas no aparelho.

## Livro novo

1. Crie `src/books/<nome>.js` no mesmo formato dos outros (`Ov.addBook({ id, title, cover, color, ref, scenes })`).
2. Ponha o `id` em `order`, no `config.json`, na posição em que ele deve aparecer na estante.
3. Se for grátis, ponha o `id` também em `free`. Se for pago, crie o produto `livro_<id>` nas duas lojas.
4. Crie `src/i18n/<nome>.json` com as traduções e confirme com `node scripts/i18n.mjs`.
5. Atualize a descrição do site em `scripts/build.mjs` e `store/TEXTOS.md` (a lista da página de suporte é feita sozinha).
6. Se uma personagem nova tiver falas (`{ q, who }`), crie a cor do balão dela em `src/css/shell.css` (veja `.tp .q.rei`).

## Nova versão

1. Aumente `version` em `config.json` (por exemplo `1.1.0`).
2. Corra os processos **Android** e **iPhone e iPad** em Actions. O número de build sobe sozinho.

As chaves de assinatura ficam só nos segredos do repositório (Settings > Secrets and variables > Actions),
nunca nos ficheiros.
