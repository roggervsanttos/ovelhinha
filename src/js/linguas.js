/* =====================================================================
   LÍNGUAS — português (de Portugal), espanhol, francês e inglês.
   • Textos da app: T('chave', { n: 3 }) com o dicionário UI, abaixo.
   • Textos dos livros: tr('texto em português') procura a tradução que
     vem com cada livro (src/i18n/<livro>.json, juntada pela montagem).
   • N('texto') só marca um texto para tradução (listas de falas, por exemplo);
     a tradução acontece onde ele é mostrado.
   A língua muda com um toque na bandeira e fica guardada no aparelho.
   ===================================================================== */
const N = s => s;
const LANGS = ['pt', 'es', 'fr', 'en'];
const I18N = {
  lang: 'pt',
  dict: { es: {}, fr: {}, en: {} },
  names: { pt: 'Português', es: 'Español', fr: 'Français', en: 'English' },
  html: { pt: 'pt-PT', es: 'es-ES', fr: 'fr-FR', en: 'en-US' },
  // traduções de um livro: { "texto em português": ["espanhol", "francês", "inglês"] }
  add(map) {
    for (const pt in map) {
      const v = map[pt];
      if (!Array.isArray(v)) continue;
      ['es', 'fr', 'en'].forEach((l, i) => { if (v[i]) this.dict[l][pt] = v[i]; });
    }
  },
  pick() {
    let saved = null;
    try { saved = localStorage.getItem('ov:lingua'); } catch (e) { }
    if (LANGS.includes(saved)) return saved;
    const list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'pt']).map(l => String(l).slice(0, 2).toLowerCase());
    return list.find(l => LANGS.includes(l)) || 'en';
  },
  set(l) {
    if (!LANGS.includes(l)) l = 'pt';
    this.lang = l;
    try { localStorage.setItem('ov:lingua', l); } catch (e) { }
    document.documentElement.lang = this.html[l];
    this.apply();
  },
  // textos fixos da página: data-t (texto), data-th (texto com marcação), data-ta="aria-label:chave;title:chave"
  apply(root = document) {
    root.querySelectorAll('[data-t]').forEach(el => { el.textContent = T(el.dataset.t); });
    root.querySelectorAll('[data-th]').forEach(el => { el.innerHTML = T(el.dataset.th); });
    root.querySelectorAll('[data-ta]').forEach(el => el.dataset.ta.split(';').forEach(p => { const [a, k] = p.split(':'); if (a && k) el.setAttribute(a.trim(), T(k.trim())); }));
    root.querySelectorAll('[data-lang-only]').forEach(el => { el.hidden = el.dataset.langOnly !== this.lang; });
  }
};
function tr(s) {
  if (I18N.lang === 'pt' || typeof s !== 'string') return s;
  const d = I18N.dict[I18N.lang];
  return (d && d[s]) || s;
}
// tradução com partes que mudam: trf('Dia {n}', { n: 3 })
function trf(s, vars) { return tr(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)); }
function T(key, vars) {
  const pack = UI[I18N.lang] || UI.pt;
  let s = pack[key] ?? UI.pt[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  return s;
}

/* bandeiras desenhadas aqui mesmo (os emojis de bandeira não aparecem em todos os computadores) */
const FLAGS = {
  pt: '<rect width="24" height="24" fill="#da291c"/><rect width="9.6" height="24" fill="#046a38"/><circle cx="9.6" cy="12" r="4.6" fill="none" stroke="#ffe000" stroke-width="1.5"/><path d="M7.6,9.8 h4 v3.3 a2,2 0 0 1 -4,0 Z" fill="#fff" stroke="#da291c" stroke-width=".9"/>',
  es: '<rect width="24" height="24" fill="#aa151b"/><rect y="6" width="24" height="12" fill="#f1bf00"/>',
  fr: '<rect width="24" height="24" fill="#fff"/><rect width="8" height="24" fill="#002654"/><rect x="16" width="8" height="24" fill="#ce1126"/>',
  en: '<rect width="24" height="24" fill="#fff"/>' + [0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${(i * 24 / 13).toFixed(2)}" width="24" height="${(24 / 13).toFixed(2)}" fill="#b22234"/>`).join('') + '<rect width="11" height="12.9" fill="#3c3b6e"/><g fill="#fff">' + [[2.2, 2.4], [5.5, 2.4], [8.8, 2.4], [3.8, 5.2], [7.2, 5.2], [2.2, 8], [5.5, 8], [8.8, 8], [3.8, 10.8], [7.2, 10.8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9"/>`).join('') + '</g>'
};
function flagSVG(l) { return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${FLAGS[l]}</svg>`; }

const UI = {
  pt: {
    sub: 'Histórias da Bíblia', mascot: 'A Ovelhinha diz olá', baa: 'Bééé!', start: 'Começar', startAria: 'Começar: ver todas as histórias',
    color: 'Desenhos para colorir', colorSub: 'Toca e pinta!', colorShort: 'Colorir', colorTitle: 'Para colorir', colorPick: 'Escolhe um desenho. Depois escolhe uma cor e toca no desenho para pintar.', colorThis: 'Colorir: {t}', colorBack: 'Voltar aos desenhos', eraser: 'Borracha', undo: 'Desfazer', clearAll: 'Apagar tudo', clearAgain: 'Toca outra vez para apagar o desenho.', palette: 'Cores',
    parents: 'Área dos pais', parentsShort: 'Pais', shelf: 'Estante de livros', shelfFoot: 'Toca num livro para começar.', lang: 'Língua',
    installTitle: 'Instale o Ovelhinha no telemóvel', installSteps: 'No Safari, toque em <i class="kbd">Partilhar</i> e depois em <i class="kbd">Adicionar ao ecrã principal</i>.',
    install: 'Instalar', installClose: 'Fechar o aviso de instalação', appStore: 'Descarregar na App Store', playStore: 'Descarregar no Google Play',
    home: 'Voltar à estante', homeShort: 'Estante', sounds: 'Sons do livro', soundsShort: 'Sons', pages: 'Ver todas as páginas', pagesShort: 'Páginas',
    full: 'Ecrã inteiro', nav: 'Navegação do livro', prev: 'Página anterior', next: 'Página seguinte', allPages: 'Todas as páginas', close: 'Fechar',
    cover: 'Capa', page: 'Página {n}', pageTitle: 'Página {n}: {t}', end: 'Fim', kicker: 'Uma história da Bíblia', open: 'Abrir o livro',
    resume: 'Continuar na página {n}', fact: 'Sabias que…', talk: 'Para conversar', again: 'Ler outra vez', nextBook: 'Próxima: {t}',
    stopped: '{t}. Parou na página {n}.', read: '{t}. Livro lido.', lockedCard: '{t}. História bloqueada.', inAppCard: '{t}. Está na app.',
    ribbon: 'pág. {n}', readSticker: 'Livro lido', lockedBadge: 'Bloqueada',
    soundOn: 'Sons ligados.', soundOff: 'Sons desligados.', noFull: 'O ecrã inteiro não está disponível aqui.', installed: 'Pronto! O Ovelhinha está no ecrã principal.',
    progressCleared: 'O progresso de leitura foi apagado.', emailCopied: 'E-mail copiado.', emailSelected: 'Selecionei o e-mail para o copiar.',
    gateLead: 'Esta parte é para adultos. Responda para entrar:', gateLeadBuy: 'Esta parte é para adultos. Responda para continuar:',
    gateQ: 'Quanto é {a} vezes {b}?', nums: 'zero,um,dois,três,quatro,cinco,seis,sete,oito,nove', del: 'Apagar', ok: 'Confirmar',
    settings: 'Definições', soundMusic: 'Sons e música', extras: 'Histórias extras', restore: 'Restaurar compras',
    progress: 'Progresso de leitura', progressText: 'A página onde cada livro parou e as estrelas dos livros lidos ficam guardadas só neste aparelho.',
    resetAsk: 'Apagar o progresso', resetConfirm: 'Apagar o progresso de todos os livros?', resetYes: 'Apagar', cancel: 'Cancelar',
    installGroup: 'Instalar no telemóvel', installIos: '<b>iPhone e iPad:</b> abra este site no Safari, toque em Partilhar e depois em Adicionar ao ecrã principal.',
    installAndroid: '<b>Android:</b> toque em Instalar quando o navegador oferecer, ou abra o menu do navegador e escolha Instalar aplicação.', installNow: 'Instalar agora',
    about: 'Sobre o Ovelhinha', aboutText: 'Histórias da Bíblia recontadas para crianças, com ilustrações animadas e sons. Tudo funciona sem internet, sem anúncios e sem registo.',
    version: 'Versão {v}', contact: 'Fale connosco:', copy: 'Copiar', emailSoon: '(e-mail em breve)', privacy: 'Política de privacidade', credits: 'Créditos e licenças',
    creditsStories: 'Histórias recontadas para crianças a partir da Bíblia. As citações bíblicas foram adaptadas para a linguagem infantil.',
    creditsFonts: 'Tipos de letra Grandstander (Etcetera Type Co.) e Andika (SIL International), sob a SIL Open Font License 1.1.',
    creditsNative: 'Feito com Capacitor, sob a licença MIT. Compras com o plugin Native Purchases (Capgo), sob a licença MPL 2.0, cujo código está em github.com/Cap-go/capacitor-native-purchases.',
    lockedTitle: 'História bloqueada', adultsTitle: 'Para adultos', getAppTitle: 'Descarregue a app',
    lockedLead: 'Esta história está bloqueada.', lockedAsk: 'Pede a um adulto para a desbloquear.', webLead: 'Esta história está na app Ovelhinha.', webAsk: 'Pede a um adulto para descarregar a app.',
    adult: 'Sou adulto', webBuyTitle: '«{t}» está na app',
    webBuyText: 'Neste site há {f} histórias grátis. Na app Ovelhinha, para Android e iPhone, estão todas as {n}: as mesmas {f} grátis e as outras para desbloquear uma a uma, por {p} cada.',
    soon: ' A app chega em breve à App Store e ao Google Play.', buyTitle: 'Desbloquear «{t}»', buyText: 'Compra única de {p}. A história fica desbloqueada para sempre{w}.',
    buyWhereIos: ', também nos outros aparelhos com a mesma conta da App Store', buyWhereAndroid: ', também nos outros aparelhos com a mesma conta do Google Play',
    demoNote: ' Na pré-visualização, a compra é só uma simulação: nada é cobrado.', buyBtn: 'Comprar por {p}',
    openingIos: 'A abrir a App Store…', openingAndroid: 'A abrir o Google Play…', unlocking: 'A desbloquear…',
    pending: 'A compra está à espera de aprovação. Quando for aprovada, a história desbloqueia-se sozinha.',
    errIos: 'Não foi possível contactar a App Store. Verifique a ligação à internet e tente de novo.', errAndroid: 'Não foi possível contactar o Google Play. Verifique a ligação à internet e tente de novo.', errWeb: 'Não foi possível contactar a loja. Verifique a ligação à internet e tente de novo.',
    searching: 'A procurar compras feitas com esta conta…', notBought: 'Esta história ainda não foi comprada com esta conta.', unlocked: '«{t}» foi desbloqueada!',
    restored: 'Pronto! As compras foram restauradas.', allSet: 'Tudo certo: as histórias compradas já estão desbloqueadas.', noneFound: 'Não foi encontrada nenhuma compra nesta conta.',
    storeLeadNative: '{f} histórias vêm grátis. As outras {n} podem ser desbloqueadas uma a uma. Cada compra é feita uma só vez e vale para sempre.',
    storeLeadDemo: ' Na pré-visualização, as compras são só simuladas.',
    storeLeadWeb: 'Neste site há {f} histórias grátis. As outras {n} estão na app Ovelhinha, para Android e iPhone, onde podem ser desbloqueadas uma a uma, por {p} cada.',
    owned: 'Desbloqueada', inApp: 'Na app', buyAria: 'Comprar {t} por {p}'
  },
  es: {
    sub: 'Historias de la Biblia', mascot: 'La ovejita te saluda', baa: '¡Beee!', start: 'Empezar', startAria: 'Empezar: ver todas las historias',
    color: 'Dibujos para colorear', colorSub: '¡Toca y pinta!', colorShort: 'Colorear', colorTitle: 'Para colorear', colorPick: 'Elige un dibujo. Luego elige un color y toca el dibujo para pintar.', colorThis: 'Colorear: {t}', colorBack: 'Volver a los dibujos', eraser: 'Goma', undo: 'Deshacer', clearAll: 'Borrar todo', clearAgain: 'Toca otra vez para borrar el dibujo.', palette: 'Colores',
    parents: 'Zona para padres', parentsShort: 'Padres', shelf: 'Estantería de libros', shelfFoot: 'Toca un libro para empezar.', lang: 'Idioma',
    installTitle: 'Instala Ovelhinha en el móvil', installSteps: 'En Safari, toca <i class="kbd">Compartir</i> y luego <i class="kbd">Añadir a pantalla de inicio</i>.',
    install: 'Instalar', installClose: 'Cerrar el aviso de instalación', appStore: 'Descargar en el App Store', playStore: 'Disponible en Google Play',
    home: 'Volver a la estantería', homeShort: 'Libros', sounds: 'Sonidos del libro', soundsShort: 'Sonidos', pages: 'Ver todas las páginas', pagesShort: 'Páginas',
    full: 'Pantalla completa', nav: 'Navegación del libro', prev: 'Página anterior', next: 'Página siguiente', allPages: 'Todas las páginas', close: 'Cerrar',
    cover: 'Portada', page: 'Página {n}', pageTitle: 'Página {n}: {t}', end: 'Fin', kicker: 'Una historia de la Biblia', open: 'Abrir el libro',
    resume: 'Seguir en la página {n}', fact: '¿Sabías que…?', talk: 'Para hablar', again: 'Leer otra vez', nextBook: 'Siguiente: {t}',
    stopped: '{t}. Se quedó en la página {n}.', read: '{t}. Libro leído.', lockedCard: '{t}. Historia bloqueada.', inAppCard: '{t}. Está en la app.',
    ribbon: 'pág. {n}', readSticker: 'Libro leído', lockedBadge: 'Bloqueada',
    soundOn: 'Sonidos activados.', soundOff: 'Sonidos desactivados.', noFull: 'La pantalla completa no está disponible aquí.', installed: '¡Listo! Ovelhinha ya está en la pantalla de inicio.',
    progressCleared: 'Se ha borrado el progreso de lectura.', emailCopied: 'Correo copiado.', emailSelected: 'He seleccionado el correo para que lo copies.',
    gateLead: 'Esta parte es para adultos. Responde para entrar:', gateLeadBuy: 'Esta parte es para adultos. Responde para continuar:',
    gateQ: '¿Cuánto es {a} por {b}?', nums: 'cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve', del: 'Borrar', ok: 'Confirmar',
    settings: 'Ajustes', soundMusic: 'Sonidos y música', extras: 'Historias extra', restore: 'Restaurar compras',
    progress: 'Progreso de lectura', progressText: 'La página donde se quedó cada libro y las estrellas de los libros leídos se guardan solo en este dispositivo.',
    resetAsk: 'Borrar el progreso', resetConfirm: '¿Borrar el progreso de todos los libros?', resetYes: 'Borrar', cancel: 'Cancelar',
    installGroup: 'Instalar en el móvil', installIos: '<b>iPhone y iPad:</b> abre este sitio en Safari, toca Compartir y luego Añadir a pantalla de inicio.',
    installAndroid: '<b>Android:</b> toca Instalar cuando el navegador lo ofrezca, o abre el menú del navegador y elige Instalar aplicación.', installNow: 'Instalar ahora',
    about: 'Sobre Ovelhinha', aboutText: 'Historias de la Biblia contadas para niños, con ilustraciones animadas y sonidos. Todo funciona sin internet, sin anuncios y sin registro.',
    version: 'Versión {v}', contact: 'Escríbenos:', copy: 'Copiar', emailSoon: '(correo próximamente)', privacy: 'Política de privacidad', credits: 'Créditos y licencias',
    creditsStories: 'Historias de la Biblia contadas para niños. Las citas bíblicas se han adaptado al lenguaje infantil.',
    creditsFonts: 'Tipografías Grandstander (Etcetera Type Co.) y Andika (SIL International), con la licencia SIL Open Font License 1.1.',
    creditsNative: 'Hecho con Capacitor, con la licencia MIT. Compras con el plugin Native Purchases (Capgo), con la licencia MPL 2.0; su código está en github.com/Cap-go/capacitor-native-purchases.',
    lockedTitle: 'Historia bloqueada', adultsTitle: 'Para adultos', getAppTitle: 'Descarga la app',
    lockedLead: 'Esta historia está bloqueada.', lockedAsk: 'Pide a un adulto que la desbloquee.', webLead: 'Esta historia está en la app Ovelhinha.', webAsk: 'Pide a un adulto que descargue la app.',
    adult: 'Soy adulto', webBuyTitle: '«{t}» está en la app',
    webBuyText: 'En este sitio hay {f} historias gratis. En la app Ovelhinha, para Android y iPhone, están las {n}: las mismas {f} gratis y las demás para desbloquear una a una, por {p} cada una.',
    soon: ' La app llegará pronto al App Store y a Google Play.', buyTitle: 'Desbloquear «{t}»', buyText: 'Compra única de {p}. La historia queda desbloqueada para siempre{w}.',
    buyWhereIos: ', también en otros dispositivos con la misma cuenta del App Store', buyWhereAndroid: ', también en otros dispositivos con la misma cuenta de Google Play',
    demoNote: ' En la vista previa, la compra es solo una simulación: no se cobra nada.', buyBtn: 'Comprar por {p}',
    openingIos: 'Abriendo el App Store…', openingAndroid: 'Abriendo Google Play…', unlocking: 'Desbloqueando…',
    pending: 'La compra está esperando aprobación. Cuando se apruebe, la historia se desbloqueará sola.',
    errIos: 'No se ha podido conectar con el App Store. Comprueba la conexión a internet y vuelve a intentarlo.', errAndroid: 'No se ha podido conectar con Google Play. Comprueba la conexión a internet y vuelve a intentarlo.', errWeb: 'No se ha podido conectar con la tienda. Comprueba la conexión a internet y vuelve a intentarlo.',
    searching: 'Buscando compras hechas con esta cuenta…', notBought: 'Esta historia aún no se ha comprado con esta cuenta.', unlocked: '¡«{t}» se ha desbloqueado!',
    restored: '¡Listo! Se han restaurado las compras.', allSet: 'Todo en orden: las historias compradas ya están desbloqueadas.', noneFound: 'No se ha encontrado ninguna compra en esta cuenta.',
    storeLeadNative: '{f} historias son gratis. Las otras {n} se pueden desbloquear una a una. Cada compra se hace una sola vez y vale para siempre.',
    storeLeadDemo: ' En la vista previa, las compras son solo simuladas.',
    storeLeadWeb: 'En este sitio hay {f} historias gratis. Las otras {n} están en la app Ovelhinha, para Android y iPhone, donde se pueden desbloquear una a una, por {p} cada una.',
    owned: 'Desbloqueada', inApp: 'En la app', buyAria: 'Comprar {t} por {p}'
  },
  fr: {
    sub: 'Histoires de la Bible', mascot: 'La petite brebis dit bonjour', baa: 'Bêêê !', start: 'Commencer', startAria: 'Commencer : voir toutes les histoires',
    color: 'Coloriages', colorSub: 'Touche et colorie !', colorShort: 'Colorier', colorTitle: 'Coloriages', colorPick: 'Choisis un dessin. Puis choisis une couleur et touche le dessin pour colorier.', colorThis: 'Colorier : {t}', colorBack: 'Retour aux dessins', eraser: 'Gomme', undo: 'Annuler', clearAll: 'Tout effacer', clearAgain: 'Touche encore pour effacer le dessin.', palette: 'Couleurs',
    parents: 'Espace parents', parentsShort: 'Parents', shelf: 'Bibliothèque', shelfFoot: 'Touche un livre pour commencer.', lang: 'Langue',
    installTitle: 'Installez Ovelhinha sur votre téléphone', installSteps: 'Dans Safari, touchez <i class="kbd">Partager</i>, puis <i class="kbd">Sur l’écran d’accueil</i>.',
    install: 'Installer', installClose: 'Fermer le message d’installation', appStore: 'Télécharger dans l’App Store', playStore: 'Disponible sur Google Play',
    home: 'Retour à la bibliothèque', homeShort: 'Livres', sounds: 'Sons du livre', soundsShort: 'Sons', pages: 'Voir toutes les pages', pagesShort: 'Pages',
    full: 'Plein écran', nav: 'Navigation du livre', prev: 'Page précédente', next: 'Page suivante', allPages: 'Toutes les pages', close: 'Fermer',
    cover: 'Couverture', page: 'Page {n}', pageTitle: 'Page {n} : {t}', end: 'Fin', kicker: 'Une histoire de la Bible', open: 'Ouvrir le livre',
    resume: 'Reprendre à la page {n}', fact: 'Le savais-tu ?', talk: 'Pour en parler', again: 'Relire', nextBook: 'Suivant : {t}',
    stopped: '{t}. Arrêté à la page {n}.', read: '{t}. Livre lu.', lockedCard: '{t}. Histoire verrouillée.', inAppCard: '{t}. Dans l’application.',
    ribbon: 'p. {n}', readSticker: 'Livre lu', lockedBadge: 'Verrouillée',
    soundOn: 'Sons activés.', soundOff: 'Sons désactivés.', noFull: 'Le plein écran n’est pas disponible ici.', installed: 'C’est fait ! Ovelhinha est sur l’écran d’accueil.',
    progressCleared: 'La progression de lecture a été effacée.', emailCopied: 'E-mail copié.', emailSelected: 'L’e-mail est sélectionné : vous pouvez le copier.',
    gateLead: 'Cette partie est réservée aux adultes. Répondez pour entrer :', gateLeadBuy: 'Cette partie est réservée aux adultes. Répondez pour continuer :',
    gateQ: 'Combien font {a} fois {b} ?', nums: 'zéro,un,deux,trois,quatre,cinq,six,sept,huit,neuf', del: 'Effacer', ok: 'Valider',
    settings: 'Réglages', soundMusic: 'Sons et musique', extras: 'Histoires en plus', restore: 'Restaurer les achats',
    progress: 'Progression de lecture', progressText: 'La page où chaque livre s’est arrêté et les étoiles des livres lus sont gardées uniquement sur cet appareil.',
    resetAsk: 'Effacer la progression', resetConfirm: 'Effacer la progression de tous les livres ?', resetYes: 'Effacer', cancel: 'Annuler',
    installGroup: 'Installer sur le téléphone', installIos: '<b>iPhone et iPad :</b> ouvrez ce site dans Safari, touchez Partager, puis Sur l’écran d’accueil.',
    installAndroid: '<b>Android :</b> touchez Installer quand le navigateur le propose, ou ouvrez le menu du navigateur et choisissez Installer l’application.', installNow: 'Installer maintenant',
    about: 'À propos d’Ovelhinha', aboutText: 'Des histoires de la Bible racontées aux enfants, avec des illustrations animées et des sons. Tout fonctionne sans internet, sans publicité et sans inscription.',
    version: 'Version {v}', contact: 'Écrivez-nous :', copy: 'Copier', emailSoon: '(e-mail bientôt)', privacy: 'Politique de confidentialité', credits: 'Crédits et licences',
    creditsStories: 'Histoires de la Bible racontées aux enfants. Les citations bibliques ont été adaptées au langage des enfants.',
    creditsFonts: 'Polices Grandstander (Etcetera Type Co.) et Andika (SIL International), sous licence SIL Open Font License 1.1.',
    creditsNative: 'Réalisé avec Capacitor, sous licence MIT. Achats avec le plugin Native Purchases (Capgo), sous licence MPL 2.0 ; son code est sur github.com/Cap-go/capacitor-native-purchases.',
    lockedTitle: 'Histoire verrouillée', adultsTitle: 'Pour les adultes', getAppTitle: 'Téléchargez l’application',
    lockedLead: 'Cette histoire est verrouillée.', lockedAsk: 'Demande à un adulte de la déverrouiller.', webLead: 'Cette histoire est dans l’application Ovelhinha.', webAsk: 'Demande à un adulte de télécharger l’application.',
    adult: 'Je suis un adulte', webBuyTitle: '« {t} » est dans l’application',
    webBuyText: 'Sur ce site, il y a {f} histoires gratuites. Dans l’application Ovelhinha, pour Android et iPhone, il y a les {n} : les mêmes {f} gratuites, et les autres à déverrouiller une par une, pour {p} chacune.',
    soon: ' L’application arrive bientôt sur l’App Store et Google Play.', buyTitle: 'Déverrouiller « {t} »', buyText: 'Achat unique de {p}. L’histoire reste déverrouillée pour toujours{w}.',
    buyWhereIos: ', aussi sur vos autres appareils avec le même compte App Store', buyWhereAndroid: ', aussi sur vos autres appareils avec le même compte Google Play',
    demoNote: ' Dans l’aperçu, l’achat est une simple simulation : rien n’est facturé.', buyBtn: 'Acheter pour {p}',
    openingIos: 'Ouverture de l’App Store…', openingAndroid: 'Ouverture de Google Play…', unlocking: 'Déverrouillage…',
    pending: 'L’achat attend une approbation. Une fois approuvé, l’histoire se déverrouillera toute seule.',
    errIos: 'Impossible de joindre l’App Store. Vérifiez la connexion internet et réessayez.', errAndroid: 'Impossible de joindre Google Play. Vérifiez la connexion internet et réessayez.', errWeb: 'Impossible de joindre la boutique. Vérifiez la connexion internet et réessayez.',
    searching: 'Recherche des achats faits avec ce compte…', notBought: 'Cette histoire n’a pas encore été achetée avec ce compte.', unlocked: '« {t} » est déverrouillée !',
    restored: 'C’est fait ! Les achats ont été restaurés.', allSet: 'Tout est en ordre : les histoires achetées sont déjà déverrouillées.', noneFound: 'Aucun achat n’a été trouvé sur ce compte.',
    storeLeadNative: '{f} histoires sont gratuites. Les {n} autres peuvent être déverrouillées une par une. Chaque achat se fait une seule fois et vaut pour toujours.',
    storeLeadDemo: ' Dans l’aperçu, les achats sont seulement simulés.',
    storeLeadWeb: 'Sur ce site, il y a {f} histoires gratuites. Les {n} autres sont dans l’application Ovelhinha, pour Android et iPhone, où elles peuvent être déverrouillées une par une, pour {p} chacune.',
    owned: 'Déverrouillée', inApp: 'Dans l’appli', buyAria: 'Acheter {t} pour {p}'
  },
  en: {
    sub: 'Bible Stories', mascot: 'The little sheep says hello', baa: 'Baa!', start: 'Start', startAria: 'Start: see all the stories',
    color: 'Coloring pages', colorSub: 'Tap and paint!', colorShort: 'Color', colorTitle: 'Coloring', colorPick: 'Pick a picture. Then pick a color and tap the picture to paint it.', colorThis: 'Color: {t}', colorBack: 'Back to the pictures', eraser: 'Eraser', undo: 'Undo', clearAll: 'Clear all', clearAgain: 'Tap again to clear the picture.', palette: 'Colors',
    parents: 'Parents’ area', parentsShort: 'Parents', shelf: 'Bookshelf', shelfFoot: 'Tap a book to start.', lang: 'Language',
    installTitle: 'Install Ovelhinha on your phone', installSteps: 'In Safari, tap <i class="kbd">Share</i>, then <i class="kbd">Add to Home Screen</i>.',
    install: 'Install', installClose: 'Close the install message', appStore: 'Download on the App Store', playStore: 'Get it on Google Play',
    home: 'Back to the bookshelf', homeShort: 'Books', sounds: 'Book sounds', soundsShort: 'Sounds', pages: 'See all pages', pagesShort: 'Pages',
    full: 'Full screen', nav: 'Book navigation', prev: 'Previous page', next: 'Next page', allPages: 'All pages', close: 'Close',
    cover: 'Cover', page: 'Page {n}', pageTitle: 'Page {n}: {t}', end: 'The End', kicker: 'A Bible story', open: 'Open the book',
    resume: 'Continue on page {n}', fact: 'Did you know?', talk: 'Let’s talk', again: 'Read again', nextBook: 'Next: {t}',
    stopped: '{t}. Stopped on page {n}.', read: '{t}. Book read.', lockedCard: '{t}. Locked story.', inAppCard: '{t}. In the app.',
    ribbon: 'p. {n}', readSticker: 'Book read', lockedBadge: 'Locked',
    soundOn: 'Sounds on.', soundOff: 'Sounds off.', noFull: 'Full screen isn’t available here.', installed: 'Done! Ovelhinha is on your home screen.',
    progressCleared: 'Reading progress was cleared.', emailCopied: 'Email copied.', emailSelected: 'The email is selected so you can copy it.',
    gateLead: 'This part is for grown-ups. Answer to come in:', gateLeadBuy: 'This part is for grown-ups. Answer to continue:',
    gateQ: 'What is {a} times {b}?', nums: 'zero,one,two,three,four,five,six,seven,eight,nine', del: 'Delete', ok: 'Confirm',
    settings: 'Settings', soundMusic: 'Sounds and music', extras: 'Extra stories', restore: 'Restore purchases',
    progress: 'Reading progress', progressText: 'The page where each book stopped and the stars for books read are saved only on this device.',
    resetAsk: 'Clear progress', resetConfirm: 'Clear progress for all books?', resetYes: 'Clear', cancel: 'Cancel',
    installGroup: 'Install on your phone', installIos: '<b>iPhone and iPad:</b> open this site in Safari, tap Share, then Add to Home Screen.',
    installAndroid: '<b>Android:</b> tap Install when the browser offers it, or open the browser menu and choose Install app.', installNow: 'Install now',
    about: 'About Ovelhinha', aboutText: 'Bible stories retold for children, with animated pictures and sounds. Everything works offline, with no ads and no sign-up.',
    version: 'Version {v}', contact: 'Contact us:', copy: 'Copy', emailSoon: '(email coming soon)', privacy: 'Privacy policy', credits: 'Credits and licenses',
    creditsStories: 'Stories retold for children from the Bible. Bible quotes were adapted into child-friendly language.',
    creditsFonts: 'Grandstander (Etcetera Type Co.) and Andika (SIL International) fonts, under the SIL Open Font License 1.1.',
    creditsNative: 'Made with Capacitor, under the MIT license. Purchases use the Native Purchases plugin (Capgo), under the MPL 2.0 license; its code is at github.com/Cap-go/capacitor-native-purchases.',
    lockedTitle: 'Locked story', adultsTitle: 'For grown-ups', getAppTitle: 'Get the app',
    lockedLead: 'This story is locked.', lockedAsk: 'Ask a grown-up to unlock it.', webLead: 'This story is in the Ovelhinha app.', webAsk: 'Ask a grown-up to download the app.',
    adult: 'I’m a grown-up', webBuyTitle: '“{t}” is in the app',
    webBuyText: 'This site has {f} free stories. The Ovelhinha app for Android and iPhone has all {n}: the same {f} free ones, and the others to unlock one at a time for {p} each.',
    soon: ' The app is coming soon to the App Store and Google Play.', buyTitle: 'Unlock “{t}”', buyText: 'One-time purchase of {p}. The story stays unlocked forever{w}.',
    buyWhereIos: ', also on your other devices with the same App Store account', buyWhereAndroid: ', also on your other devices with the same Google Play account',
    demoNote: ' In the preview, the purchase is only simulated: nothing is charged.', buyBtn: 'Buy for {p}',
    openingIos: 'Opening the App Store…', openingAndroid: 'Opening Google Play…', unlocking: 'Unlocking…',
    pending: 'The purchase is waiting for approval. Once it’s approved, the story will unlock by itself.',
    errIos: 'Couldn’t reach the App Store. Check your internet connection and try again.', errAndroid: 'Couldn’t reach Google Play. Check your internet connection and try again.', errWeb: 'Couldn’t reach the store. Check your internet connection and try again.',
    searching: 'Looking for purchases made with this account…', notBought: 'This story hasn’t been bought with this account yet.', unlocked: '“{t}” is unlocked!',
    restored: 'Done! Your purchases were restored.', allSet: 'All set: the stories you bought are already unlocked.', noneFound: 'No purchases were found on this account.',
    storeLeadNative: '{f} stories are free. The other {n} can be unlocked one at a time. Each purchase is made once and lasts forever.',
    storeLeadDemo: ' In the preview, purchases are only simulated.',
    storeLeadWeb: 'This site has {f} free stories. The other {n} are in the Ovelhinha app for Android and iPhone, where they can be unlocked one at a time for {p} each.',
    owned: 'Unlocked', inApp: 'In the app', buyAria: 'Buy {t} for {p}'
  }
};
