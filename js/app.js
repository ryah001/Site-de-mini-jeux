/* Opération Hasard — application statique, sans dépendance externe. */
(() => {
  'use strict';

  const CFG = window.OPERATION_CONFIG || {};
  const screen = document.getElementById('screen');
  const toast = document.getElementById('toast');
  const miniProgress = document.getElementById('mini-progress');
  const progressLabel = document.getElementById('progress-label');
  const progressFill = document.getElementById('progress-fill');
  const soundToggle = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  const confettiLayer = document.getElementById('confetti-layer');

  const LEVELS = [
    { id: 1, title: 'Le chaos de WhatsApp', emoji: '📱', type: 'RÉFLEXES', desc: 'Une boîte de réception en état de catastrophe. À toi de sauver la situation.', act: 1, glow: '#fbe2ef', hint: 'Tape sur les messages pour les jeter à la corbeille. Tu as 30 secondes et il faut en supprimer 7.', reward: 'Un badge d’agente spéciale' },
    { id: 2, title: 'Le quiz des mauvaises réponses', emoji: '😂', type: 'QUIZ ABSURDE', desc: 'Ici, l’assurance compte davantage que la logique. Le jury est très peu compétent.', act: 1, glow: '#ffe8ca', hint: 'Choisis la réponse qui te ressemble le plus. Toutes les réponses sont acceptées par un jury douteux.', reward: 'Un diplôme officiel' },
    { id: 3, title: 'Le chaos des réflexes', emoji: '✨', type: 'ARCADE', desc: 'Attrape les étoiles et les cœurs. Évite les bombes : elles ont un très mauvais caractère.', act: 1, glow: '#e4ddff', hint: 'Tape les étoiles, les cœurs et les chats avant qu’ils ne disparaissent. 12 objets à attraper !', reward: 'Une petite découverte' },
    { id: 4, title: 'Le blind test mystérieux', emoji: '🎵', type: 'MUSIQUE', desc: 'Des voix, ton anniversaire, de la K-pop et une belle surprise musicale.', act: 2, glow: '#f5dff3', hint: 'Écoute les quatre extraits, réponds aux questions, puis découvre une question bonus rien que pour toi.', reward: 'Une mini-playlist personnalisée' },
    { id: 5, title: 'Le laboratoire des goûts secrets', emoji: '🔍', type: 'ÉNIGMES', desc: 'Des indices, des emojis et un laboratoire qui manque clairement de budget.', act: 2, glow: '#dff6ef', hint: 'Décode les trois petites énigmes en associant les symboles à la bonne idée.', reward: 'Une découverte étonnante' },
    { id: 6, title: 'Le générateur de mèmes', emoji: '🐱', type: 'CRÉATIVITÉ', desc: 'Choisis un modèle mignon ou importe une photo de ta galerie pour créer ton propre mème.', act: 2, glow: '#ffe7da', hint: 'Choisis une illustration du site ou une image de ton téléphone, ajoute tes légendes et télécharge ton chef-d’œuvre.', reward: 'Un mème à garder' },
    { id: 7, title: 'Le musée des petites surprises', emoji: '🖼️', type: 'MÉMOIRE', desc: 'Un petit jeu de mémoire où chaque paire révèle un minuscule fragment de douceur.', act: 3, glow: '#e6e1ff', hint: 'Retourne les cartes deux par deux et retrouve les six paires. Les paires cachent de petits messages.', reward: 'Une carte postale numérique' },
    { id: 8, title: 'La chasse au trésor', emoji: '🗝️', type: 'EXPLORATION', desc: 'Une scène nocturne, cinq objets cachés et un coffre qui attend depuis beaucoup trop longtemps.', act: 3, glow: '#dcecfb', hint: 'Cherche les cinq petites étincelles sur la scène. Chaque objet découvert donne un indice.', reward: 'Un mini-poème' },
    { id: 9, title: 'Les trois portes mystérieuses', emoji: '🚪', type: 'CHOIX & SURPRISES', desc: 'Une porte pour rire, une pour apprendre, une pour la douceur. Pourquoi choisir une seule ambiance ?', act: 3, glow: '#f4dff0', hint: 'Ouvre les trois portes pour découvrir toutes les surprises et récupérer ton bon spécial.', reward: 'Un bon pour une soirée à la carte' },
    { id: 10, title: 'La dernière bobine', emoji: '🎬', type: 'CINÉMATIQUE', desc: 'Le projecteur s’allume. Les fragments se rassemblent. Une dernière enveloppe t’attend.', act: 3, glow: '#e9dcff', hint: 'Il n’y a plus d’épreuve à réussir. Il ne reste qu’une enveloppe à ouvrir, à ton rythme.', reward: 'La dernière lettre' }
  ];

  const ACTS = {
    1: { title: 'Acte I — L’aventure commence', subtitle: 'Du chaos, des réflexes et des décisions très discutables.' },
    2: { title: 'Acte II — Les surprises deviennent personnelles', subtitle: 'De la musique, des énigmes et une créativité potentiellement dangereuse.' },
    3: { title: 'Acte III — Le trésor prend forme', subtitle: 'On ralentit un peu. Le dossier devient plus doux, mais reste confidentiel.' }
  };

  const QUIZ_QUESTIONS = [
    {
      q: 'Comment neutralise-t-on un harceleur relou sur les réseaux ?',
      choices: [
        'On l’invite à boire un thé pour discuter de ses problèmes d’ego.',
        'On envoie un commando d’élite sur WhatsApp.',
        'On jette son téléphone par la fenêtre et on part vivre dans les bois.',
        'On signe un autographe et on bloque.'
      ],
      replies: [
        'Une tentative de diplomatie très courageuse… mais le bouton Bloquer reste en renfort. 🍵',
        'Exactement, l’arme fatale : le commando WhatsApp entre en action. 🫡📱',
        'Le service des téléphones recommande plutôt de bloquer le spécimen et de garder son appareil. 🌲📵',
        'Classe, rapide et efficace. Le comité applaudit cette stratégie. 👏'
      ]
    },
    {
      q: 'Quel est le super-pouvoir indispensable d’une sauveuse d’inconnu en détresse ?',
      choices: [
        'Avoir un réseau 5G infaillible.',
        'Conserver son calme face aux spécimens du net.',
        'Répondre à un inconnu sur WhatsApp sans flipper (ou presque).',
        'Toutes ces réponses à la fois.'
      ],
      replies: [
        'La 5G aide, mais elle n’est pas encore homologuée comme super-pouvoir. 📶',
        'Le calme face aux spécimens du net : compétence rare, niveau légendaire. 🧘',
        'Du courage, un peu de prudence et un clic sur WhatsApp : une combinaison redoutable. 📱',
        'Exactement : pack complet de super-pouvoirs débloqué ! 🦸‍♀️✨'
      ]
    },
    {
      q: 'D’après Magnificat, quel genre de personne es-tu ?',
      choices: ['Normale.', 'Intéressante.', 'Complexe.', 'Magnifique.'],
      replies: [
        '« Normale » ? Cette hypothèse mérite une enquête approfondie. Le dossier contient beaucoup trop d’indices contraires. 🧐',
        'Intéressante, oui… mais le comité estime qu’il manque encore quelques adjectifs. 👀',
        'Complexe ? C’est déjà un début. Le service informatique a ouvert un ticket pour essayer de comprendre le système. 😂',
        'Exactement : tu es complexe, intrigante, marrante et intelligente. Bref, un bug complet du système. Et pour ça, tu as tout mon respect. 💖'
      ]
    },
    {
      q: 'Que se passe-t-il après une mission de sauvetage réussie ?',
      choices: [
        'On débloque un ami pour la vie (et un site web un peu trop élaboré).',
        'On reçoit une médaille en chocolat.',
        'On oublie tout et on mange une pizza.',
        'Le destin s’enclenche.'
      ],
      replies: [
        'Le scénario le plus improbable… et pourtant, regarde où il nous a menés. 💌',
        'La médaille en chocolat reste une récompense officiellement reconnue par le comité. 🍫',
        'La pizza aurait été une excellente conclusion, mais l’histoire n’était pas finie. 🍕',
        'Le destin, ou un développeur qui a pris cette amitié très au sérieux. ✨'
      ]
    },
    {
      q: 'Face à une situation totalement absurde, quelle est la réaction adéquate ?',
      choices: [
        'Regarder le monde comme un film avec du pop-corn.',
        'Paniquer un peu, puis faire une blague.',
        'Appeler à l’aide en hurlant des citations philosophiques.',
        'Ignorer le problème jusqu’à ce qu’il disparaisse.'
      ],
      replies: [
        'Pop-corn en main : le monde fait son cinéma, et toi tu observes le scénario. 🍿',
        'Une petite panique, une bonne blague : protocole de survie parfaitement crédible. 😂',
        'Le philosophe de garde arrive avec trois citations et zéro plan d’évacuation. 📚',
        'Technique dite « autruche stratégique ». Le comité refuse de la juger. 🪶'
      ]
    },
    {
      q: 'Quel est le carburant secret des grandes discussions nocturnes ?',
      choices: [
        'Le café noir et l’insomnie.',
        'Des pavés de textes envoyés à 3 h du matin.',
        'Des théories sur le sens de la vie.',
        'Un mélange parfaitement instable des trois.'
      ],
      replies: [
        'Le café est innocent. L’insomnie, en revanche, est convoquée par la direction. ☕',
        'Un pavé de texte à 3 h du matin : l’unité de mesure officielle des grandes discussions. 📜',
        'Le sens de la vie à une heure où même les neurones demandent à dormir. 🌌',
        'Exactement : trois ingrédients, une nuit blanche et une conversation qui part dans l’espace. 🚀'
      ]
    }
  ];

  const MUSIC_QUESTIONS = [
    {
      title: 'Une voix qui fait des dégâts', subtitle: 'Un petit extrait vocal pour commencer.', question: 'Cette voix magnifique me fait…', audio: 0, emoji: '🎙️', correct: null,
      choices: ['Mourir de rire.', 'Avoir un fou rire de malade.', 'Kiffer la vie.'],
      replies: [
        'Le comité confirme : cette voix devrait être classée comme arme de fou rire. 🤣',
        'Diagnostic officiel : fou rire de niveau légendaire. Aucun recours possible. 😂',
        'Réponse validée : cette voix améliore le coefficient de kiffage de la vie de 300 %. 💖'
      ]
    },
    {
      title: 'Une date à célébrer', subtitle: 'Shine Bright Like a Leo', question: 'Cette mission te rappelle…', audio: 1, emoji: '🎂', correct: 0,
      choices: ['Ton anniversaire !', 'Une réunion très sérieuse sur les étoiles.', 'L’anniversaire d’un dragon.', 'Une mise à jour du calendrier cosmique.'],
      replies: [
        'Exactement : ton anniversaire ! 🎂 Joyeux anniversaire encore une fois. Le jour de ta naissance est, pour moi, une bénédiction de l’univers. Je te souhaite une année lumineuse, pleine de rires, de belles découvertes et de douceur. ✨',
        'Le calendrier cosmique confirme qu’il s’agit d’une date bien plus personnelle : ton anniversaire ! Joyeux anniversaire encore une fois ! 🎂 Le jour de ta naissance est une bénédiction de l’univers pour moi. ✨',
        'Le dragon a déposé une réclamation : cette musique parle bien de ton anniversaire ! Joyeux anniversaire encore une fois, merveilleuse agente. 🎂🐉',
        'Mise à jour validée : c’est ton anniversaire ! Joyeux anniversaire encore une fois. Le jour de ta naissance est une bénédiction de l’univers pour moi. 💖'
      ]
    },
    {
      title: 'K-pop : question facile pour toi', subtitle: 'La K-pop est dans ton élément.', question: 'Cette musique est de quel groupe ?', audio: 2, emoji: '🖤💗', correct: 0,
      choices: ['BLACKPINK, évidemment.', 'BTS.', 'TWICE.', 'Un groupe de chats très talentueux.'],
      replies: [
        'ÉVIDEMMENT : BLACKPINK ! 🖤💗 Là, on est dans ton élément. K-pop activée, chorégraphie imaginaire lancée et niveau de style au maximum. 🎤✨',
        'Le laboratoire annonce une erreur de casting : c’est BLACKPINK ! 🖤💗 Mais tu as le droit à un deuxième essai mental, parce qu’ici, la K-pop est reine. 🎤',
        'Presque, mais la réponse est BLACKPINK ! 🖤💗 Le dossier vient de passer en mode K-pop. Cette question était faite pour toi. ✨',
        'Nous aimerions beaucoup entendre le groupe de chats, mais ce sont bien BLACKPINK ! 🖤💗 Une agente qui connaît son univers devrait pouvoir réclamer une prime K-pop. 😂'
      ]
    },
    {
      title: 'Une grande chanson', subtitle: 'Andrea Bocelli · interprétation en direct', question: 'Quel est le titre de cette œuvre ?', audio: 3, emoji: '🌹', correct: 0,
      choices: ['Con te partirò — Andrea Bocelli.', 'How You Like That — BLACKPINK.', 'Shine Bright Like a Leo.', 'La ballade officielle du chat ministre.'],
      replies: [
        'Exact : « Con te partirò », interprétée par Andrea Bocelli. 🌹 Une magnifique chanson italienne, ample et émouvante — une petite découverte à garder dans un coin de la tête.',
        'Pas tout à fait ! Il s’agit de « Con te partirò », interprétée par Andrea Bocelli. 🌹 C’est une chanson italienne magnifique, portée par une mélodie ample et une interprétation très expressive.',
        'Le titre que tu entends est « Con te partirò », interprété par Andrea Bocelli. 🌹 Si tu ne la connaissais pas, voilà une belle chanson à découvrir tranquillement.',
        'Le chat ministre n’a pas encore obtenu les droits d’interprétation. C’est « Con te partirò », par Andrea Bocelli. 🌹 Une très belle chanson italienne qui mérite qu’on s’y attarde.'
      ]
    },
    {
      title: 'Question bonus : fiche de personnage', subtitle: 'Fiche de personnage — édition manga.', question: 'Si Mini René était l’héroïne d’un manga, quel serait son pouvoir spécial ?', audio: null, emoji: '🌸', correct: 0,
      choices: ['Être mignonne, intelligente et pleine de surprises.', 'Transformer chaque situation en fou rire.', 'Lancer une chorégraphie K-pop au moment le moins adapté.', 'Tout ça à la fois, évidemment.'],
      replies: [
        'Fiche de personnage validée : mignonne, intelligente et pleine de surprises. Le manga vient de gagner une héroïne mémorable. 🌸📚',
        'Pouvoir secondaire détecté : transformer le chaos en fou rire. Le laboratoire approuve cette compétence. 😂',
        'Pouvoir K-pop débloqué ! La chorégraphie démarre même quand personne ne l’a demandée. 🖤💗',
        'Le comité confirme : personnage complexe, lumineuse, drôle et imprévisible. Beaucoup trop puissante pour un seul manga. 🌸✨'
      ]
    }
  ];

  const RIDDLES = [
    { symbols: ['🌙', '🏰', '🐉', '👑'], question: 'Ces symboles racontent quel genre d’histoire ?', choices: ['Un conte fantastique', 'Un lave-linge royal', 'Le menu d’une cafétéria'], correct: 0, reaction: 'Exact ! Un dragon a été engagé comme conseiller royal. Il demande des congés. 🐉' },
    { symbols: ['🎤', '🎶', '🖤💗'], question: 'Quel groupe de K-pop reconnais-tu derrière ces indices ?', choices: ['BLACKPINK', 'Un club de chats musiciens', 'Les gardiens du grille-pain'], correct: 0, reaction: 'Évidemment : BLACKPINK ! 🖤💗 Le laboratoire a détecté une montée immédiate du niveau de K-pop. C’est ton élément ! 🎤' },
    { symbols: ['📖', '🌸', '🧠'], question: 'Si Mini René était l’héroïne d’un manga, que devrait-on retrouver dans sa fiche de personnage ?', choices: ['Mignonne, intelligente et pleine de surprises', 'Un pouvoir de dormir 23 heures par jour', 'Le talent de perdre ses propres pouvoirs'], correct: 0, reaction: 'Bonne réponse : une héroïne mignonne et intelligente, avec ce petit côté imprévisible qui rend l’histoire encore plus intéressante. 🌸✨' }
  ];

  const MEMORY_PAIRS = [
    { emoji: '🌙', message: 'Même les journées agitées finissent par laisser place à un peu de calme.' },
    { emoji: '📚', message: 'Une bonne découverte peut transformer une journée ordinaire en petite aventure.' },
    { emoji: '🐈', message: 'Le chat responsable du chaos nie absolument toute implication.' },
    { emoji: '🎵', message: 'Une chanson peut être une petite capsule de temps qu’on garde pour soi.' },
    { emoji: '⭐', message: 'Certaines petites lumières n’ont pas besoin d’être très grandes pour se remarquer.' },
    { emoji: '🍓', message: 'Note officielle : les fraises rendent les dossiers secrets au moins 12 % plus mignons.' }
  ];

  const TREASURE_ITEMS = [
    { emoji: '⭐', left: '14%', top: '25%', clue: 'Premier indice : même la plus petite étoile sait se faire remarquer.' },
    { emoji: '🔑', left: '44%', top: '58%', clue: 'Deuxième indice : certaines choses ne s’ouvrent qu’avec la bonne clé.' },
    { emoji: '🍄', left: '73%', top: '27%', clue: 'Troisième indice : dans les histoires, les champignons savent souvent beaucoup de choses.' },
    { emoji: '💎', left: '80%', top: '69%', clue: 'Quatrième indice : la vraie valeur d’un trésor n’est pas toujours son prix.' },
    { emoji: '✨', name: 'Shiro', left: '28%', top: '76%', clue: 'Un petit clin d’œil à Shiro : il fallait bien lui laisser une place dans cette aventure. ✨' }
  ];

  const DOOR_CONTENT = {
    laugh: { title: 'La porte de la joie', emoji: '😂', text: () => CFG.doorLaughText || 'Ce qui fait rire est synonyme de beauté absolue. Et puisque ta voix est magnifique, il faudra m’envoyer plus de vocaux. 🤣🫣' },
    curiosity: { title: 'La porte curieuse', emoji: '🔭', text: () => CFG.doorCuriosityText || 'La curiosité est une jolie façon de voyager sans bouger. 🔭' },
    softness: { title: 'La porte de la douceur', emoji: '💌', text: 'Un petit rappel tout simple : tu as le droit de prendre ton temps, de rire fort, de changer d’avis et de profiter des petites choses. Aucun badge n’est nécessaire pour ça.' }
  };

  const REWARDS = {
    1: { emoji: '📡', title: 'MISSION ACCOMPLIE !', label: 'AGENTE DU HASARD — NIVEAU 1', body: 'La boîte de réception a été remise en ordre. Le service informatique réclame une augmentation et une pause goûter.', personal: () => CFG.firstMeetingMemory || '' },
    2: { emoji: '🏅', title: 'DIPLÔME OFFICIEL', label: 'PERSONNE DÉLICIEUSEMENT IMPRÉVISIBLE', body: 'Par le présent document, le comité très sérieux des choses pas sérieuses certifie que tu possèdes un talent rare : rendre une mission absurde étonnamment agréable.', personal: () => ['Ce diplôme n’a aucune valeur administrative. Mais il est remis avec beaucoup de panache.', CFG.level2Reflection || ''].filter(Boolean).join('\n\n') },
    3: { emoji: '🌟', title: 'TRÉSOR DÉBLOQUÉ', label: 'EXPLORATRICE DES PETITES CURIOSITÉS', body: () => CFG.level3Discovery || 'Les étoiles brillent de mille feux. Certaines surprises n’ont besoin que d’un tout petit clic.', personal: () => ['Bonus : un fond d’écran étoilé à garder si le cœur t’en dit.', CFG.level3Reflection || ''].filter(Boolean).join('\n\n') },
    4: { emoji: '🎧', title: 'TES OREILLES ONT DU TALENT', label: 'CURATRICE OFFICIELLE DES AMBIANCES', body: 'Mission musicale terminée ! Tu as traversé une voix, une célébration, de la K-pop et une grande chanson italienne. Le comité te remet officiellement sa médaille pour curiosité musicale. 🏅', personal: () => [CFG.level4Reflection || 'Il y a des sons qui restent en mémoire. J’espère que cette partie t’a fait rire !', CFG.level4Message || ''].filter(Boolean).join('\n\n') },
    5: { emoji: '🧠', title: 'LABORATOIRE VALIDÉ', label: 'DÉCODEUSE DE MYSTÈRES', body: () => CFG.level5Discovery || 'Les pieuvres ont trois cœurs et un sang bleuté. La nature a visiblement un goût prononcé pour le spectaculaire.', personal: () => 'Fait bonus : les corbeaux peuvent reconnaître des visages humains et s’en souvenir. Le service des ragots du règne animal est très bien organisé.' },
    6: { emoji: '🐈', title: 'CHEF-D’ŒUVRE VALIDÉ', label: 'DIRECTRICE ARTISTIQUE DES MÈMES', body: 'Le comité de l’humour a examiné ton travail. Il a beaucoup ri, puis demandé un exemplaire pour son groupe de discussion.', personal: () => 'Télécharge ton mème et garde-le comme preuve matérielle de ton génie créatif.' },
    7: { emoji: '💌', title: 'UN PETIT SOUVENIR', label: 'CONSERVATRICE DU MUSÉE DES PETITES CHOSES', body: () => CFG.level7PostcardNote || 'Une carte postale numérique, imaginée pour accompagner cette petite aventure.', personal: () => 'Tu peux la télécharger et la garder sur ton téléphone, sans raison particulière.' },
    8: { emoji: '🗝️', title: 'LE COFFRE EST OUVERT', label: 'CHASSEUSE DE TRÉSORS — CLASSE A', body: 'Tu as retrouvé les cinq objets dissimulés dans la scène. Ils t’ouvrent un trésor plus précieux que le coffre lui-même : quelques mots préparés juste pour toi.', personal: () => CFG.level8Poem || 'Un petit clin d’œil à Shiro, glissé dans cette aventure. 🐾' },
    9: { emoji: '🎟️', title: 'TON BON SPÉCIAL EST PRÊT', label: 'INVITATION SANS DATE DE PÉREMPTION', body: () => CFG.level9CouponTitle || 'BON POUR UNE SOIRÉE À LA CARTE', personal: () => CFG.level9CouponText || 'Valable quand tu en as envie, sans date limite et sans obligation : film, jeu, musique ou simple conversation au choix.' }
  };

  let state = loadState();
  let view = 'intro';
  let currentLevel = 1;
  let toastTimer = null;
  let soundOn = false;
  let soundtrack = null;
  let activeClip = null;
  let transIntervals = [];
  let transTimeouts = [];
  let chaosInterval = null;
  let chaosTime = 30;
  let chaosDeleted = 0;
  const chaosTarget = 7;
  let quizPos = 0;
  let quizAnswered = false;
  let musicPos = 0;
  let musicAnswered = false;
  let riddlePos = 0;
  let riddleAnswered = false;
  let arcadeTimer = null;
  let arcadeSpawner = null;
  let arcadeSeconds = 25;
  let arcadeScore = 0;
  let arcadeLives = 3;
  let arcadeRunning = false;
  let latestMemeDataUrl = null;
  let customMemeImageDataUrl = null;
  let memoryDeck = [];
  let memorySelected = [];
  let memoryMatches = 0;
  let memoryLocked = false;
  let treasureFound = new Set();
  let doorsOpened = new Set();

  function loadState() {
    try {
      const raw = localStorage.getItem('operation-hasard-progress-v1.1.0');
      if (!raw) return { started: false, unlocked: 1, completed: [], finalLetterOpen: false };
      const parsed = JSON.parse(raw);
      const completed = Array.isArray(parsed.completed) ? parsed.completed.filter(n => Number.isInteger(n) && n >= 1 && n <= 10) : [];
      return {
        started: !!parsed.started,
        unlocked: Math.min(10, Math.max(1, Number(parsed.unlocked) || 1, ...completed.map(n => Math.min(10, n + 1)))),
        completed: [...new Set(completed)].sort((a, b) => a - b),
        finalLetterOpen: !!parsed.finalLetterOpen
      };
    } catch (_) {
      return { started: false, unlocked: 1, completed: [], finalLetterOpen: false };
    }
  }

  function saveState() {
    try { localStorage.setItem('operation-hasard-progress-v1.1.0', JSON.stringify(state)); }
    catch (_) { /* La partie reste jouable même si le stockage local est bloqué. */ }
    updateHeader();
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function textLines(value) { return escapeHTML(value).replace(/\n/g, '<br>'); }

  // Mélange une copie du tableau avec Fisher–Yates.
  // Cette fonction est utilisée par le jeu de mémoire (niveau 7).
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function getCompletedCount() { return state.completed.length; }
  function isUnlocked(id) { return id <= state.unlocked || state.completed.includes(id); }

  function updateHeader() {
    const count = getCompletedCount();
    miniProgress.hidden = view === 'intro';
    progressLabel.textContent = `${count}/10`;
    progressFill.style.width = `${count * 10}%`;
    const mapBtn = document.querySelector('.map-button');
    if (mapBtn) mapBtn.hidden = view === 'intro';
    soundLabel.textContent = soundOn ? 'On' : 'Son';
    soundToggle.setAttribute('aria-label', soundOn ? 'Désactiver la musique' : 'Activer la musique');
    soundToggle.classList.toggle('sound-active', soundOn);
  }

  function stopTransientTasks() {
    transIntervals.forEach(id => clearInterval(id));
    transTimeouts.forEach(id => clearTimeout(id));
    transIntervals = [];
    transTimeouts = [];
    if (chaosInterval) clearInterval(chaosInterval);
    if (arcadeTimer) clearInterval(arcadeTimer);
    if (arcadeSpawner) clearInterval(arcadeSpawner);
    chaosInterval = null;
    arcadeTimer = null;
    arcadeSpawner = null;
    arcadeRunning = false;
    stopActiveClip();
  }

  function later(fn, ms) {
    const id = setTimeout(() => { transTimeouts = transTimeouts.filter(t => t !== id); fn(); }, ms);
    transTimeouts.push(id);
    return id;
  }

  function notify(message) {
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function burstConfetti(amount = 34) {
    const colors = ['#f19bbd', '#b799e8', '#ffcf9f', '#9edbc7', '#fff0aa', '#d5c3ff'];
    for (let i = 0; i < amount; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
      piece.style.setProperty('--fall', `${1.7 + Math.random() * 2.1}s`);
      piece.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
      piece.style.animationDelay = `${Math.random() * .35}s`;
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 4600);
    }
  }

  function playSfx(kind = 'pop') {
    if (!soundOn) return;
    const path = (CFG.audio || {})[kind] || (CFG.audio || {}).pop;
    if (!path) return;
    try {
      const a = new Audio(path);
      a.volume = kind === 'win' ? 0.42 : 0.27;
      a.play().catch(() => {});
    } catch (_) { /* Le son est une option, jamais une condition de jeu. */ }
  }

  function startSoundtrack(kind = 'menu') {
    const path = (CFG.audio || {})[kind] || (CFG.audio || {}).menu;
    if (!path || !soundOn) return;
    try {
      if (soundtrack) { soundtrack.pause(); soundtrack.currentTime = 0; }
      soundtrack = new Audio(path);
      soundtrack.loop = true;
      soundtrack.volume = kind === 'finale' ? 0.2 : 0.13;
      soundtrack.play().catch(() => notify('Touchez encore le bouton Son si votre navigateur bloque la lecture automatique.'));
    } catch (_) { /* Son facultatif. */ }
  }

  function stopActiveClip() {
    if (activeClip) {
      try { activeClip.pause(); activeClip.currentTime = 0; } catch (_) { /* ignore */ }
    }
    activeClip = null;
    document.querySelectorAll('.music-wave').forEach(el => el.classList.remove('is-playing'));
  }

  function playTrack(index, waveId) {
    stopActiveClip();
    const path = (CFG.audio && CFG.audio.quizTracks || [])[Number(index)];
    if (!path) { notify('Aucun chemin audio n’est configuré pour cet extrait.'); return; }
    try {
      const audioClip = new Audio(path);
      activeClip = audioClip;
      audioClip.volume = 0.75;
      const filename = path.split('/').pop();
      let errorNotified = false;
      audioClip.onerror = () => {
        errorNotified = true;
        if (activeClip === audioClip) activeClip = null;
        if (waveId) document.getElementById(waveId)?.classList.remove('is-playing');
        notify(`Fichier audio introuvable ou illisible : ${filename}. Ajoute-le dans assets/audio/ avec ce nom exact.`);
      };
      audioClip.onended = () => { if (activeClip === audioClip) activeClip = null; if (waveId) document.getElementById(waveId)?.classList.remove('is-playing'); };
      if (waveId) document.getElementById(waveId)?.classList.add('is-playing');
      audioClip.play().then(() => notify('Extrait en cours de lecture 🎵')).catch(() => {
        if (!errorNotified) notify(`Impossible de lire ${filename}. Vérifie que le fichier est bien présent dans assets/audio/.`);
      });
    } catch (_) { notify('Impossible de lire cet extrait sur cet appareil. Vérifie le fichier audio.'); }
  }

  function renderIntro() {
    stopTransientTasks();
    view = 'intro';
    updateHeader();
    const hero = (CFG.images || {}).hero || 'assets/images/hero-illustration.svg';
    screen.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow"><span class="live-dot"></span> DOSSIER CONFIDENTIEL · N° 010</span>
          <h1><span class="title-first">OPÉRATION</span><span class="title-second">HASARD ✦</span></h1>
          <p class="hero-lede">${escapeHTML(CFG.welcomeLine || 'Une aventure secrète préparée rien que pour toi.')}<br><strong>${escapeHTML(CFG.introNote || 'Dix épreuves. Dix surprises. Un dossier beaucoup trop mignon pour être légal.')}</strong></p>
          <div class="hero-stats">
            <span class="stat-pill">🎮 <b>10</b> mini-épreuves</span>
            <span class="stat-pill">🎁 <b>10</b> surprises</span>
            <span class="stat-pill">♡ <b>100 %</b> fait maison</span>
          </div>
          <div class="button-row">
            <button class="btn btn-primary" data-action="accept-mission">J’accepte la mission <span aria-hidden="true">→</span></button>
            <button class="btn btn-soft" data-action="too-beautiful">Je suis trop belle pour ça <span aria-hidden="true">💅</span></button>
          </div>
          <p class="tiny-note">Aucun compte à créer. Prends ton temps : la seule urgence est de t’amuser.</p>
        </div>
        <div class="hero-illustration-wrap" aria-hidden="true">
          <div class="orbit"></div>
          <img class="hero-illustration" src="${escapeHTML(hero)}" alt="">
        </div>
      </section>
      <section class="intro-panel">
        <div class="intro-panel-head">
          <div class="folder-icon">🗂️</div>
          <div><h2>Agente, nous avons besoin de vous.</h2><small>MISSION SPÉCIALE · ACCÈS PERSONNALISÉ</small></div>
        </div>
        <p class="secret-copy">${escapeHTML(CFG.missionIntro || 'Vous avez été sélectionnée pour une mission extrêmement confidentielle. Votre récompense est classée secret défense.')}<br><br><strong>Attention :</strong> certaines épreuves peuvent provoquer des crises de rire, des surprises inattendues et une légère suspicion concernant la personne qui vous a envoyé ce lien.</p>
        <span class="intro-stamp">TOP SECRET ♡</span>
      </section>`;
    screen.focus({ preventScroll: true });
  }

  function renderMap() {
    stopTransientTasks();
    view = 'map';
    updateHeader();
    const actsHTML = [1, 2, 3].map(act => {
      const ids = LEVELS.filter(l => l.act === act);
      return `<section class="act-section">
        <div class="act-heading"><span class="act-number">0${act}</span><div><h2>${escapeHTML(ACTS[act].title)}</h2><p>${escapeHTML(ACTS[act].subtitle)}</p></div></div>
        <div class="level-grid">${ids.map(levelCard).join('')}</div>
      </section>`;
    }).join('');
    const nextLevel = Math.min(10, Math.max(1, state.unlocked));
    const nextAction = state.completed.includes(10) ? 'Revoir la dernière bobine' : state.completed.length ? `Continuer au niveau ${nextLevel}` : 'Commencer le niveau 1';
    const nextLabel = state.completed.includes(10) ? 'Revoir la dernière bobine →' : state.completed.length ? `Reprendre l’aventure →` : 'Entrer dans l’aventure →';
    screen.innerHTML = `
      <section class="map-page">
        <header class="page-heading">
          <div><span class="eyebrow">✦ CARTE DE MISSION</span><h1>Bienvenue, ${escapeHTML(CFG.agentName || 'Agente du Hasard')} ♡</h1><p>Les niveaux se déverrouillent au fil de tes réussites. Chaque badge cache une surprise.</p></div>
          <div class="map-progress-card"><strong>${getCompletedCount()}<span style="font-size:15px;color:#aa9ab6">/10</span></strong><span>épreuves terminées</span><div class="map-progress-track"><span style="width:${getCompletedCount() * 10}%"></span></div></div>
        </header>
        ${actsHTML}
        <div class="map-bottom-callout"><div><strong>Le dossier reste ouvert ✨</strong><span>Ta progression est sauvegardée sur cet appareil. Tu peux revenir quand tu veux.</span></div><button class="btn btn-primary" data-action="map-primary">${nextLabel}</button></div>
        <div style="display:flex;justify-content:flex-end;margin-top:9px"><button class="btn btn-ghost btn-small" data-action="reset-progress">↻ Recommencer depuis le début</button></div>
      </section>`;
  }

  function levelCard(level) {
    const completed = state.completed.includes(level.id);
    const unlocked = isUnlocked(level.id);
    const locked = !unlocked;
    const status = completed ? '✓ TERMINÉ' : locked ? '🔒 VERROUILLÉ' : 'À DÉCOUVRIR';
    return `<button class="level-card ${completed ? 'is-complete' : ''} ${locked ? 'is-locked' : ''}" data-level="${level.id}" style="--card-glow:${level.glow}" aria-label="Niveau ${level.id} : ${escapeHTML(level.title)}${locked ? ', verrouillé' : ''}">
      <span class="level-card-top"><span class="level-emoji">${level.emoji}</span><span class="level-status">${status}</span></span>
      <h3>${String(level.id).padStart(2, '0')}. ${escapeHTML(level.title)}</h3>
      <p>${escapeHTML(level.desc)}</p>
      <span class="level-card-foot"><span>${escapeHTML(level.type)}</span><span>${completed ? '🌟' : locked ? '⌑' : '→'}</span></span>
    </button>`;
  }

  function levelFrame(level, gameMarkup) {
    const count = getCompletedCount();
    return `<section class="level-page" style="--level-soft:${level.glow}">
      <div class="level-toolbar"><button class="back-link" data-action="map">← Retour à la carte</button><div class="level-counter"><strong>NIVEAU ${String(level.id).padStart(2,'0')}</strong><span>/ 10</span><span class="level-progress-track"><span style="width:${level.id * 10}%"></span></span></div></div>
      <header class="level-heading"><span class="level-big-emoji">${level.emoji}</span><h1>${escapeHTML(level.title)}</h1><p>${escapeHTML(level.desc)}</p></header>
      <div class="level-layout">
        <section class="game-card">
          <div class="game-card-top"><strong>🪄 ÉPREUVE EN COURS</strong><span class="game-chip">${escapeHTML(level.type)}</span></div>
          ${gameMarkup}
        </section>
        <aside class="game-aside">
          <section class="aside-card"><div class="aside-title"><span class="aside-icon">💡</span> Règle d’or</div><p>${escapeHTML(level.hint)}</p><p class="hint">Pas de pénalité : si tu rates, le jeu te laisse réessayer. Le comité aime les deuxièmes chances.</p></section>
          <section class="aside-card collectible-card"><div class="aside-title"><span class="aside-icon">🎁</span> Récompense annoncée</div><p>${escapeHTML(level.reward)}.</p><p class="hint">Chaque niveau terminé ajoute une petite étoile à ton dossier.</p></section>
        </aside>
      </div>
    </section>`;
  }

  function renderLevel(id) {
    if (!Number.isInteger(id) || id < 1 || id > 10) return;
    if (!isUnlocked(id)) { notify('Cette épreuve est encore verrouillée. Termine le niveau précédent pour l’ouvrir. 🔐'); return; }
    stopTransientTasks();
    currentLevel = id;
    if (id === 10) {
      renderFinale(state.completed.includes(10));
      return;
    }
    view = 'level';
    updateHeader();
    const level = LEVELS[id - 1];
    let markup = '';
    if (id === 1) markup = renderChaosGame();
    if (id === 2) markup = renderQuizGame();
    if (id === 3) markup = renderArcadeGame();
    if (id === 4) markup = renderMusicGame();
    if (id === 5) markup = renderRiddleGame();
    if (id === 6) markup = renderMemeGame();
    if (id === 7) markup = renderMemoryGame();
    if (id === 8) markup = renderTreasureGame();
    if (id === 9) markup = renderDoorsGame();
    screen.innerHTML = levelFrame(level, markup);
    screen.focus({ preventScroll: true });
    if (id === 6) refreshMemePreview();
  }

  function renderChaosGame() {
    return `<p class="game-instructions">Alerte, alerte ! Les messages absurdes envahissent l’écran. Tape sur <strong>7 messages</strong> pour les envoyer à la corbeille avant la fin du compte à rebours.</p>
      <div class="chaos-board">
        <div class="chaos-head"><div class="chaos-app-name"><span class="chaos-app-icon">✉</span><span>Boîte de réception<br><small style="font-weight:600;color:#a796b3">service des situations improbables</small></span></div><span class="chaos-clock" id="chaos-time">⏱ 30 s</span></div>
        <div class="message-list" id="message-list"><div class="empty-state" style="grid-column:1/-1">La tempête arrive… appuie sur « Lancer le nettoyage » quand tu es prête. 🫧</div></div>
        <div class="chaos-foot"><span id="chaos-feedback">Le comité informatique croit en toi.</span><span id="chaos-count">0 / 7</span></div>
      </div>
      <div class="game-status-row"><span class="game-metric">🗑️ À supprimer : <strong id="chaos-remaining">7</strong></span><span class="game-metric">🧁 Stress officiel : <strong>0 %</strong></span></div>
      <div class="game-actions"><button class="btn btn-primary" data-action="start-chaos">Lancer le nettoyage <span>→</span></button></div>`;
  }

  function renderQuizGame() {
    return `<p class="game-instructions">Six questions ultra-officielles sur une rencontre improbable, des pouvoirs secrets et les grandes théories de 3 h du matin. Choisis au feeling : le jury a un sens très souple de la logique.</p><div id="quiz-host"></div>`;
  }

  function renderArcadeGame() {
    return `<p class="game-instructions">Le ciel est rempli de petits trésors ! Attrape <strong>12 objets gentils</strong> en 25 secondes. Une bombe fait perdre un cœur. Les chats sont toujours du bon côté de l’histoire.</p>
      <div class="game-status-row"><span class="game-metric">⭐ Score : <strong id="arcade-score">0 / 12</strong></span><span class="game-metric">💗 Vies : <strong id="arcade-lives">3</strong></span><span class="game-metric">⏱ <strong id="arcade-time">25</strong>s</span></div>
      <div class="arcade-stage" id="arcade-stage"><div class="stage-instruction" id="arcade-instruction">Prête ? Les étoiles sont très timides…</div></div>
      <div id="arcade-feedback" class="inline-feedback">Tape sur les étoiles, cœurs et chats. Évite les bombes. 💫</div>
      <div class="game-actions"><button class="btn btn-primary" data-action="start-arcade">Lancer l’arcade <span>→</span></button></div>`;
  }

  function renderMusicGame() {
    return `<p class="game-instructions">Quatre extraits choisis pour toi — une voix, ton anniversaire, BLACKPINK et une grande chanson italienne — puis une question bonus digne d’une héroïne de manga. Écoute, réponds et laisse le comité musical essayer de garder son sérieux. 🎵</p><div id="music-quiz-host"></div>`;
  }

  function renderRiddleGame() {
    return `<p class="game-instructions">Le laboratoire est prêt. Trois énigmes visuelles t’attendent, avec des réponses sérieuses… enfin, presque.</p><div id="riddle-host"></div>`;
  }

  function renderMemeGame() {
    const images = CFG.images || {};
    return `<p class="game-instructions">Crée ton propre mème. Modifie les légendes, change d’illustration, puis télécharge le résultat pour le garder dans ta galerie.</p>
      <div class="meme-builder">
        <div class="meme-preview" id="meme-preview"><img id="meme-preview-img" src="${escapeHTML(images.memeCat || 'assets/images/meme-template-cat.svg')}" alt="Illustration choisie"><div class="meme-caption top" id="meme-preview-top">QUAND TU DIS…</div><div class="meme-caption bottom" id="meme-preview-bottom">JE VAIS REGARDER 5 MINUTES</div></div>
        <div class="meme-form">
          <label for="meme-template">Choisis une illustration du site</label><select id="meme-template" data-meme-template><option value="cat">Le chat philosophe</option><option value="moon">La lune épuisée</option><option value="chaos">Le chaos organisé</option></select>
          <label for="meme-upload">Ou choisis une photo dans ton téléphone</label><input id="meme-upload" type="file" accept="image/*" data-meme-upload><small class="form-help">Tu peux utiliser une photo de ta galerie, ou garder l’une des trois illustrations proposées.</small>
          <label for="meme-top">Légende du haut</label><input id="meme-top" data-meme-input="top" maxlength="60" value="QUAND TU DIS…" placeholder="Écris ici…">
          <label for="meme-bottom">Légende du bas</label><input id="meme-bottom" data-meme-input="bottom" maxlength="70" value="JE VAIS REGARDER 5 MINUTES" placeholder="La chute…">
          <div class="game-actions" style="grid-column:1/-1"><button class="btn btn-soft" data-action="meme-download">⬇ Télécharger mon mème</button><button class="btn btn-primary" data-action="finish-meme">Valider le chef-d’œuvre ✨</button></div>
        </div>
      </div>
      <div id="meme-feedback" class="inline-feedback">Conseil de la direction artistique : les majuscules donnent +3 points de dramatisation.</div>`;
  }

  function renderMemoryGame() {
    const deck = shuffle([...MEMORY_PAIRS, ...MEMORY_PAIRS].map((pair, idx) => ({ ...pair, cardId: idx })));
    memoryDeck = deck;
    memorySelected = [];
    memoryMatches = 0;
    memoryLocked = false;
    return `<p class="game-instructions">Retourne deux cartes à la fois pour trouver les six paires. Quand deux symboles identiques se rencontrent, un petit message est révélé.</p>
      <div class="game-status-row"><span class="game-metric">🌸 Paires trouvées : <strong id="memory-score">0 / 6</strong></span><span class="game-metric">🧠 Mémoire : <strong>en fleur</strong></span></div>
      <div class="memory-grid" id="memory-grid">${deck.map((card, index) => `<button class="memory-card" data-memory-card="${index}" aria-label="Carte cachée ${index + 1}"><span class="memory-face">${card.emoji}</span></button>`).join('')}</div>
      <div class="memory-message" id="memory-message">Psst… les paires aiment être trouvées ensemble. ✨</div>
      <div class="game-actions"><button class="btn btn-soft btn-small" data-action="memory-shuffle">Mélanger les cartes ↻</button></div>`;
  }

  function renderTreasureGame() {
    treasureFound = new Set();
    return `<p class="game-instructions">Cinq petits objets se cachent dans cette scène nocturne. Cherche les étincelles scintillantes : chaque découverte te donnera un indice.</p>
      <div class="game-status-row"><span class="game-metric">🗝️ Objets retrouvés : <strong id="treasure-score">0 / 5</strong></span><span class="game-metric">🌙 Mode : <strong>exploration</strong></span></div>
      <div class="treasure-scene" id="treasure-scene" role="group" aria-label="Scène de chasse au trésor">${TREASURE_ITEMS.map((item, i) => `<button class="treasure-hotspot" data-treasure="${i}" style="left:${item.left};top:${item.top}" aria-label="Chercher un objet caché">✦</button>`).join('')}</div>
      <div class="treasure-note" id="treasure-note">La nuit garde ses secrets… Trouve une étincelle pour commencer. ✨</div>`;
  }

  function renderDoorsGame() {
    doorsOpened = new Set();
    return `<p class="game-instructions">Chaque porte cache une mini-surprise. Ouvre-les toutes les trois pour récupérer ton bon spécial. Tu n’as pas à choisir une seule ambiance : c’est la journée de la curiosité.</p>
      <div class="door-grid">
        <button class="door-choice" data-door="laugh"><span class="door-shape">☻</span><strong>La porte du rire</strong><small>Accès : confettis</small></button>
        <button class="door-choice" data-door="curiosity"><span class="door-shape">✧</span><strong>La porte curieuse</strong><small>Accès : découverte</small></button>
        <button class="door-choice" data-door="softness"><span class="door-shape">♡</span><strong>La porte douce</strong><small>Accès : petit mot</small></button>
      </div>
      <div class="door-result" id="door-result">Choisis une porte pour découvrir ce qu’elle cache. Tu pourras ensuite ouvrir les autres.</div>
      <div class="game-status-row"><span class="game-metric">🚪 Portes ouvertes : <strong id="doors-count">0 / 3</strong></span></div>
      <div class="game-actions"><button class="btn btn-primary" id="doors-complete" data-action="complete-doors" hidden>Récupérer mon bon spécial →</button></div>`;
  }

  function renderQuizPanel() {
    const host = document.getElementById('quiz-host');
    if (!host) return;
    const question = QUIZ_QUESTIONS[quizPos];
    quizAnswered = false;
    host.innerHTML = `<div class="game-status-row"><span class="game-metric">🃏 Question : <strong>${quizPos + 1} / ${QUIZ_QUESTIONS.length}</strong></span><div class="quiz-progress-dots">${QUIZ_QUESTIONS.map((_, i) => `<span class="${i <= quizPos ? 'active' : ''}"></span>`).join('')}</div></div>
      <div class="question-card"><div class="question-number">QUESTION ${String(quizPos + 1).padStart(2,'0')} · TRÈS OFFICIELLE</div><h3>${escapeHTML(question.q)}</h3></div>
      <div class="answer-grid">${question.choices.map((choice, i) => `<button class="answer-choice" data-quiz-answer="${i}"><span class="choice-letter">${String.fromCharCode(65 + i)}</span>${escapeHTML(choice)}</button>`).join('')}</div>
      <div id="quiz-response"></div>`;
  }

  function renderMusicPanel() {
    const host = document.getElementById('music-quiz-host');
    if (!host) return;
    const q = MUSIC_QUESTIONS[musicPos];
    musicAnswered = false;
    const isAudioQuestion = Number.isInteger(q.audio);
    const trackPath = isAudioQuestion ? ((CFG.audio && CFG.audio.quizTracks || [])[q.audio] || '') : '';
    host.innerHTML = `<div class="game-status-row"><span class="game-metric">${isAudioQuestion ? '🎼 Extrait' : '🌸 Question bonus'} : <strong>${musicPos + 1} / ${MUSIC_QUESTIONS.length}</strong></span><span class="game-metric">🎧 Volume : <strong>à ton goût</strong></span></div>
      <div class="music-player-card"><div class="music-cover"><span class="music-note">${q.emoji || '🎵'}</span></div><div class="track-meta"><div><strong>${escapeHTML(q.title)}</strong><small>${escapeHTML(q.subtitle)}</small></div>${isAudioQuestion ? `<button class="track-play" data-play-quiz-track="${q.audio}" aria-label="Écouter ${escapeHTML(q.title)}">▶</button>` : '<span class="music-note" aria-hidden="true">♡</span>'}</div>${isAudioQuestion ? `<div class="music-wave" id="music-wave-${musicPos}"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>` : ''}</div>
      <div class="question-card"><div class="question-number">${isAudioQuestion ? 'QUESTION MUSICALE' : 'QUESTION BONUS · PROFIL DE PERSONNAGE'}</div><h3 style="font-size:21px">${escapeHTML(q.question || q.subtitle)}</h3></div>
      <div class="answer-grid" style="margin-top:13px;grid-template-columns:1fr">${q.choices.map((choice, i) => `<button class="answer-choice" data-music-answer="${i}"><span class="choice-letter">${String.fromCharCode(65 + i)}</span>${escapeHTML(choice)}</button>`).join('')}</div>
      <div id="music-response"></div>`;
  }

  function renderRiddlePanel() {
    const host = document.getElementById('riddle-host');
    if (!host) return;
    const q = RIDDLES[riddlePos];
    riddleAnswered = false;
    host.innerHTML = `<div class="game-status-row"><span class="game-metric">🧪 Énigme : <strong>${riddlePos + 1} / 3</strong></span><span class="game-metric">🧠 Réflexion : <strong>activée</strong></span></div>
      <div class="riddle-symbols">${q.symbols.map(s => `<span>${s}</span>`).join('<b style="font-size:15px;color:#b8a0d0">+</b>')}</div>
      <div class="question-card"><div class="question-number">ANALYSE DU LABORATOIRE</div><h3 style="font-size:21px">${escapeHTML(q.question)}</h3></div>
      <div class="answer-grid" style="grid-template-columns:1fr">${q.choices.map((choice, i) => `<button class="answer-choice" data-riddle-answer="${i}"><span class="choice-letter">${String.fromCharCode(65 + i)}</span>${escapeHTML(choice)}</button>`).join('')}</div><div id="riddle-response"></div>`;
  }

  function startChaos() {
    stopTransientTasks();
    chaosTime = 30;
    chaosDeleted = 0;
    const messages = [
      ['PRINCE INCONNU', 'Bonjour, j’ai hérité de 17 chameaux et d’un Wi-Fi.'],
      ['CONCOURS OFFICIEL', 'Félicitations ! Tu as gagné une chèvre premium.'],
      ['URGENCE ABSOLUE', 'Quelqu’un a mangé la dernière part de pizza.'],
      ['SERVICE CLIENT', 'Puis-je te déranger pendant les 47 prochaines années ?'],
      ['MESSAGE GALACTIQUE', 'La lune demande le mot de passe du grille-pain.'],
      ['BANQUE TRÈS DOUTEUSE', 'Pour vérifier ton compte, envoie-nous un croissant.'],
      ['ALERTE CHAT', 'Un chat a été élu ministre des siestes.'],
      ['NOTIFICATION INUTILE', 'Tu as regardé ton téléphone. C’était nous.'],
      ['AGENCE DU HASARD', 'Le destin a laissé un vocal de 3 minutes.']
    ];
    const list = document.getElementById('message-list');
    if (!list) return;
    list.innerHTML = messages.map((m, i) => `<button class="message-card" data-delete-msg="${i}" style="--tilt:${[-1.8,1.3,-.6,1.8,-1.1,.5,1.1,-1.5,.6][i]}deg"><small>✉ ${escapeHTML(m[0])}</small><strong>${escapeHTML(m[1])}</strong><span class="trash-label">✕ envoyer à la corbeille</span></button>`).join('');
    setChaosCounters();
    document.getElementById('chaos-feedback').textContent = 'Les notifications sont officiellement incontrôlables.';
    const startBtn = document.querySelector('[data-action="start-chaos"]');
    if (startBtn) { startBtn.disabled = true; startBtn.textContent = 'Nettoyage en cours…'; }
    chaosInterval = setInterval(() => {
      chaosTime -= 1;
      const timer = document.getElementById('chaos-time');
      if (timer) timer.textContent = `⏱ ${chaosTime} s`;
      if (chaosTime <= 0) {
        clearInterval(chaosInterval); chaosInterval = null;
        const cards = document.querySelectorAll('[data-delete-msg]');
        cards.forEach(card => card.disabled = true);
        const feedback = document.getElementById('chaos-feedback');
        if (feedback) feedback.textContent = 'Le service informatique suggère une pause biscuit et un nouvel essai.';
        const area = document.querySelector('.chaos-board');
        if (area && !area.querySelector('[data-chaos-failed]')) area.insertAdjacentHTML('beforeend', '<div class="inline-feedback fun" data-chaos-failed>⏰ Le temps est écoulé ! Le spam a gagné cette manche, mais nous refusons de le reconnaître. <button class="btn btn-soft btn-small" data-action="retry-chaos" style="margin-left:8px">Réessayer ↻</button></div>');
        if (startBtn) startBtn.disabled = false;
      }
    }, 1000);
  }

  function setChaosCounters() {
    const count = document.getElementById('chaos-count');
    const remaining = document.getElementById('chaos-remaining');
    if (count) count.textContent = `${chaosDeleted} / ${chaosTarget}`;
    if (remaining) remaining.textContent = Math.max(0, chaosTarget - chaosDeleted);
  }

  function deleteMessage(button) {
    if (!button || button.disabled || !chaosInterval) return;
    button.disabled = true;
    button.classList.add('removing');
    chaosDeleted += 1;
    setChaosCounters();
    playSfx('pop');
    const feedback = document.getElementById('chaos-feedback');
    const quips = ['Message éliminé. La chèvre a été interceptée. 🐐', 'Spam neutralisé. Ton efficacité inquiète la hiérarchie. 🫡', 'Encore un ! Le Wi-Fi est désormais en sécurité. 📶', 'Le coffre de la boîte mail respire à nouveau. 💌'];
    if (feedback) feedback.textContent = quips[Math.floor(Math.random() * quips.length)];
    later(() => button.remove(), 180);
    if (chaosDeleted >= chaosTarget) completeLevel(1);
  }

  function handleQuizAnswer(index) {
    if (quizAnswered) return;
    quizAnswered = true;
    const q = QUIZ_QUESTIONS[quizPos];
    document.querySelectorAll('[data-quiz-answer]').forEach(btn => btn.disabled = true);
    const response = document.getElementById('quiz-response');
    if (response) response.innerHTML = `<div class="inline-feedback fun">${escapeHTML(q.replies[index] || 'Le jury applaudit avec beaucoup de sérieux. 👏')}</div><div class="game-actions"><button class="btn btn-primary" data-action="quiz-next">${quizPos === QUIZ_QUESTIONS.length - 1 ? 'Recevoir mon diplôme →' : 'Question suivante →'}</button></div>`;
    playSfx('pop');
  }

  function handleMusicAnswer(index) {
    if (musicAnswered) return;
    musicAnswered = true;
    const q = MUSIC_QUESTIONS[musicPos];
    document.querySelectorAll('[data-music-answer]').forEach(btn => btn.disabled = true);
    const response = document.getElementById('music-response');
    const message = q.replies[index] || 'Le comité musical enregistre cette réponse avec beaucoup de sérieux. 🎼';
    const success = q.correct == null || index === q.correct;
    if (response) response.innerHTML = `<div class="inline-feedback ${success ? 'success' : 'fun'}">${escapeHTML(message)}</div><div class="game-actions"><button class="btn btn-primary" data-action="music-next">${musicPos === MUSIC_QUESTIONS.length - 1 ? 'Débloquer ma surprise musicale →' : (musicPos < 4 ? 'Question suivante →' : 'Question bonus →')}</button></div>`;
    if (success) playSfx('pop'); else playSfx('wrong');
    stopActiveClip();
  }

  function handleRiddleAnswer(index) {
    if (riddleAnswered) return;
    riddleAnswered = true;
    const q = RIDDLES[riddlePos];
    document.querySelectorAll('[data-riddle-answer]').forEach(btn => btn.disabled = true);
    const correct = index === q.correct;
    const response = document.getElementById('riddle-response');
    const text = correct ? q.reaction : 'Hypothèse audacieuse ! Le laboratoire la conserve dans un dossier intitulé « pourquoi pas ». 🔬';
    if (response) response.innerHTML = `<div class="inline-feedback ${correct ? 'success' : 'fun'}">${escapeHTML(text)}</div><div class="game-actions"><button class="btn btn-primary" data-action="riddle-next">${riddlePos === RIDDLES.length - 1 ? 'Récupérer la découverte →' : 'Analyser l’énigme suivante →'}</button></div>`;
    if (correct) playSfx('pop'); else playSfx('wrong');
  }

  function startArcade() {
    stopTransientTasks();
    arcadeSeconds = 25; arcadeScore = 0; arcadeLives = 3; arcadeRunning = true;
    const stage = document.getElementById('arcade-stage');
    if (!stage) return;
    stage.querySelectorAll('.falling-object').forEach(el => el.remove());
    const instruction = document.getElementById('arcade-instruction');
    if (instruction) instruction.textContent = 'ATTRAPE LES ÉTOILES ✦ ÉVITE LES BOMBELETTES';
    const startBtn = document.querySelector('[data-action="start-arcade"]');
    if (startBtn) { startBtn.disabled = true; startBtn.textContent = 'Ça tombe de partout…'; }
    updateArcadeCounters();
    arcadeSpawner = setInterval(spawnArcadeObject, 530);
    arcadeTimer = setInterval(() => {
      arcadeSeconds -= 1;
      const el = document.getElementById('arcade-time'); if (el) el.textContent = arcadeSeconds;
      if (arcadeSeconds <= 0) finishArcade(false);
    }, 1000);
    spawnArcadeObject(); spawnArcadeObject();
  }

  function spawnArcadeObject() {
    if (!arcadeRunning) return;
    const stage = document.getElementById('arcade-stage');
    if (!stage) return;
    const isBad = Math.random() < .22;
    const good = ['⭐','💗','🐱','🌸','🍓','🦋','💎'];
    const emoji = isBad ? '💣' : good[Math.floor(Math.random() * good.length)];
    const obj = document.createElement('button');
    obj.className = `falling-object ${isBad ? 'bad' : ''}`;
    obj.type = 'button'; obj.textContent = emoji;
    obj.dataset.arcadeObject = 'true'; obj.dataset.bad = isBad ? 'true' : 'false';
    obj.setAttribute('aria-label', isBad ? 'Bombe à éviter' : 'Objet à attraper');
    obj.style.setProperty('--x', `${6 + Math.random() * 88}%`);
    obj.style.setProperty('--duration', `${1.8 + Math.random() * 1.5}s`);
    obj.addEventListener('animationend', () => obj.remove(), { once: true });
    stage.appendChild(obj);
  }

  function updateArcadeCounters() {
    const score = document.getElementById('arcade-score'); if (score) score.textContent = `${arcadeScore} / 12`;
    const lives = document.getElementById('arcade-lives'); if (lives) lives.textContent = arcadeLives;
  }

  function arcadeHit(button) {
    if (!arcadeRunning || !button || button.dataset.hit === 'true') return;
    button.dataset.hit = 'true';
    const bad = button.dataset.bad === 'true';
    button.remove();
    const feedback = document.getElementById('arcade-feedback');
    if (bad) {
      arcadeLives -= 1;
      if (feedback) feedback.textContent = ['Ouille ! Cette bombe avait vraiment besoin d’attention. 💣', 'La bombe est maintenant vexée. Évite la prochaine !', 'Aïe ! Même les agents secrets ont droit à une erreur.'][Math.floor(Math.random() * 3)];
      playSfx('wrong');
    } else {
      arcadeScore += 1;
      if (feedback) feedback.textContent = ['Une étoile attrapée ! Le ciel applaudit. ✨', 'Très joli geste. Les astronomes sont impressionnés. ⭐', 'Un petit trésor de plus dans ta collection. 💎'][Math.floor(Math.random() * 3)];
      playSfx('pop');
    }
    updateArcadeCounters();
    if (arcadeScore >= 12) { finishArcade(true); return; }
    if (arcadeLives <= 0) finishArcade(false);
  }

  function finishArcade(won) {
    if (!arcadeRunning) return;
    arcadeRunning = false;
    if (arcadeSpawner) clearInterval(arcadeSpawner);
    if (arcadeTimer) clearInterval(arcadeTimer);
    arcadeSpawner = null; arcadeTimer = null;
    document.querySelectorAll('.falling-object').forEach(el => el.remove());
    const instruction = document.getElementById('arcade-instruction');
    if (instruction) instruction.textContent = won ? 'LE CIEL EST SAUVÉ ✦' : 'MISSION EN PAUSE — ON RECOMMENCE ?';
    const actionArea = document.querySelector('#arcade-stage')?.parentElement;
    const actions = document.querySelector('[data-action="start-arcade"]')?.parentElement;
    if (won) { completeLevel(3); return; }
    const feedback = document.getElementById('arcade-feedback');
    if (feedback) feedback.innerHTML = `La mission est presque réussie ! Tu as attrapé ${arcadeScore} trésors. Pas de panique : les étoiles seront encore là. 🌟`;
    if (actions) actions.innerHTML = '<button class="btn btn-primary" data-action="start-arcade">Réessayer l’arcade ↻</button>';
  }

  function refreshMemePreview() {
    const template = document.getElementById('meme-template');
    const top = document.getElementById('meme-top');
    const bottom = document.getElementById('meme-bottom');
    const img = document.getElementById('meme-preview-img');
    if (!template || !top || !bottom || !img) return;
    const path = memePath(template.value);
    img.src = customMemeImageDataUrl || path;
    const topEl = document.getElementById('meme-preview-top');
    const bottomEl = document.getElementById('meme-preview-bottom');
    if (topEl) topEl.textContent = top.value || ' ';
    if (bottomEl) bottomEl.textContent = bottom.value || ' ';
  }

  function memePath(key) {
    const images = CFG.images || {};
    const paths = { cat: images.memeCat || 'assets/images/meme-template-cat.svg', moon: images.memeMoon || 'assets/images/meme-template-moon.svg', chaos: images.memeChaos || 'assets/images/meme-template-chaos.svg' };
    return paths[key] || paths.cat;
  }

  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, align = 'center') {
    const words = String(text || '').toUpperCase().split(/\s+/);
    let line = '';
    const lines = [];
    words.forEach(word => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else line = test;
    });
    if (line) lines.push(line);
    ctx.textAlign = align;
    let cursorY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach(item => {
      ctx.strokeText(item, x, cursorY, maxWidth);
      ctx.fillText(item, x, cursorY, maxWidth);
      cursorY += lineHeight;
    });
  }

  function buildMemeDataURL(callback) {
    const template = document.getElementById('meme-template');
    const topInput = document.getElementById('meme-top');
    const bottomInput = document.getElementById('meme-bottom');
    const path = customMemeImageDataUrl || (template ? memePath(template.value) : memePath('cat'));
    const topText = topInput ? topInput.value : 'QUAND TU DIS…';
    const bottomText = bottomInput ? bottomInput.value : 'JE VAIS REGARDER 5 MINUTES';
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = 900; canvas.height = 900;
      const ctx = canvas.getContext('2d');
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const dw = img.width * scale; const dh = img.height * scale;
      ctx.fillStyle = '#f5e8ff'; ctx.fillRect(0,0,900,900);
      ctx.drawImage(img, (900 - dw)/2, (900 - dh)/2, dw, dh);
      const drawCaption = (text, y) => {
        ctx.font = '900 48px Impact, "Arial Black", sans-serif';
        ctx.lineJoin = 'round'; ctx.textBaseline = 'middle';
        ctx.lineWidth = 7; ctx.strokeStyle = '#302637'; ctx.fillStyle = '#ffffff';
        drawWrappedText(ctx, text || ' ', 450, y, 810, 53);
      };
      drawCaption(topText, 93);
      drawCaption(bottomText, 805);
      try { const url = canvas.toDataURL('image/png'); latestMemeDataUrl = url; callback(url); }
      catch (_) { notify('Le téléchargement a échoué. Vérifie le fichier image personnalisé.'); }
    };
    img.onerror = () => notify('Image introuvable. Vérifie le nom du modèle dans assets/images/.');
    img.src = path;
  }

  function downloadDataUrl(url, filename) {
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  }

  function downloadMeme(then) {
    buildMemeDataURL(url => {
      downloadDataUrl(url, 'mon-meme-operation-hasard.png');
      notify('Ton mème est prêt à rejoindre la galerie 📸');
      if (typeof then === 'function') then();
    });
  }

  function downloadIllustration(path, filename) {
    const a = document.createElement('a'); a.href = path; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  }

  function drawDownloadCard(title, body, filename, emoji = '✦') {
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 800;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 1200, 800); grad.addColorStop(0, '#fff4f8'); grad.addColorStop(1, '#eee5ff');
    ctx.fillStyle = grad; ctx.fillRect(0,0,1200,800);
    ctx.fillStyle = 'rgba(255,255,255,.83)'; roundedRect(ctx, 65, 55, 1070, 690, 34); ctx.fill();
    ctx.strokeStyle = 'rgba(174,139,205,.4)'; ctx.lineWidth = 3; roundedRect(ctx, 65, 55, 1070, 690, 34); ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = '#a67cc8'; ctx.font = '64px Georgia, serif'; ctx.fillText(emoji, 600, 170);
    ctx.fillStyle = '#59446b'; ctx.font = 'bold 43px Georgia, serif';
    drawWrappedText(ctx, title, 600, 270, 940, 51);
    ctx.fillStyle = '#82728e'; ctx.font = '27px Arial, sans-serif';
    drawWrappedText(ctx, body, 600, 460, 900, 43);
    ctx.fillStyle = '#c27ea7'; ctx.font = 'bold 18px Arial, sans-serif'; ctx.fillText('OPÉRATION HASARD  ·  UN PETIT CADEAU NUMÉRIQUE', 600, 675);
    downloadDataUrl(canvas.toDataURL('image/png'), filename);
  }

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }

  function handleMemoryCard(button) {
    const index = Number(button.dataset.memoryCard);
    if (memoryLocked || button.classList.contains('matched') || button.classList.contains('flipped')) return;
    button.classList.add('flipped');
    const span = button.querySelector('.memory-face'); if (span) span.style.opacity = '1';
    memorySelected.push(index);
    if (memorySelected.length < 2) return;
    memoryLocked = true;
    const [a, b] = memorySelected;
    const cardA = memoryDeck[a]; const cardB = memoryDeck[b];
    const message = document.getElementById('memory-message');
    if (cardA.emoji === cardB.emoji) {
      document.querySelectorAll(`[data-memory-card="${a}"], [data-memory-card="${b}"]`).forEach(el => el.classList.add('matched'));
      memoryMatches += 1;
      const score = document.getElementById('memory-score'); if (score) score.textContent = `${memoryMatches} / 6`;
      if (message) message.textContent = cardA.message;
      playSfx('pop');
      memorySelected = []; memoryLocked = false;
      if (memoryMatches === 6) later(() => completeLevel(7), 900);
    } else {
      if (message) message.textContent = 'Presque ! Ces cartes ont décidé de se faire désirer. Essaie encore. 🌷';
      playSfx('wrong');
      later(() => {
        [a,b].forEach(i => {
          const el = document.querySelector(`[data-memory-card="${i}"]`);
          if (el) { el.classList.remove('flipped'); const face = el.querySelector('.memory-face'); if (face) face.style.opacity = ''; }
        });
        memorySelected = []; memoryLocked = false;
      }, 750);
    }
  }

  function handleTreasure(index, button) {
    if (treasureFound.has(index)) return;
    treasureFound.add(index);
    const item = TREASURE_ITEMS[index];
    button.classList.add('found'); button.textContent = item.name === 'Shiro' ? '✨ Shiro' : item.emoji; button.setAttribute('aria-label', item.name === 'Shiro' ? 'Objet trouvé : Shiro' : `Objet trouvé : ${item.emoji}`);
    const score = document.getElementById('treasure-score'); if (score) score.textContent = `${treasureFound.size} / 5`;
    const note = document.getElementById('treasure-note'); if (note) note.textContent = item.clue;
    playSfx('pop');
    if (treasureFound.size === 5) later(() => completeLevel(8), 700);
  }

  function handleDoor(key, button) {
    const info = DOOR_CONTENT[key]; if (!info || doorsOpened.has(key)) return;
    doorsOpened.add(key);
    button.classList.add('opened');
    const result = document.getElementById('door-result');
    const doorText = typeof info.text === 'function' ? info.text() : info.text;
    if (result) result.innerHTML = `<strong>${info.emoji} ${escapeHTML(info.title)}</strong><br>${textLines(doorText)}`;
    const count = document.getElementById('doors-count'); if (count) count.textContent = `${doorsOpened.size} / 3`;
    playSfx('pop');
    if (doorsOpened.size === 3) {
      const complete = document.getElementById('doors-complete');
      if (complete) complete.hidden = false;
      if (result) result.innerHTML += '<br><br><strong>Les trois portes sont ouvertes !</strong> Le bon spécial t’attend. 🎟️';
      burstConfetti(12);
    }
  }

  function markCompleted(id) {
    if (!state.completed.includes(id)) state.completed.push(id);
    state.completed.sort((a,b) => a-b);
    state.unlocked = Math.max(state.unlocked, Math.min(10, id + 1));
    if (id === 10) { state.unlocked = 10; state.finalLetterOpen = true; }
    state.started = true;
    saveState();
  }

  function completeLevel(id) {
    stopTransientTasks();
    markCompleted(id);
    playSfx('win');
    burstConfetti(id === 10 ? 65 : 32);
    if (id === 10) { renderFinale(true); return; }
    renderReward(id);
  }

  function rewardExtra(id) {
    const images = CFG.images || {};
    if (id === 2) return `<button class="btn btn-soft btn-small" data-action="download-diploma">⬇ Télécharger mon diplôme</button>`;
    if (id === 3) return `<div class="game-actions" style="justify-content:center"><button class="btn btn-soft btn-small" data-action="download-wallpaper">⬇ Fond d’écran étoilé</button></div>`;
    if (id === 4) {
      const tracks = MUSIC_QUESTIONS.filter(q => Number.isInteger(q.audio));
      return `<div class="gift-audio-list">${tracks.map(q => `<div class="gift-track"><div><strong>${escapeHTML(q.emoji || '🎵')} ${escapeHTML(q.title)}</strong><small>${escapeHTML((CFG.audio.quizTracks || [])[q.audio] || 'Fichier à ajouter dans assets/audio/')}</small></div><button data-play-quiz-track="${q.audio}">▶ Réécouter</button></div>`).join('')}</div>`;
    }
    if (id === 6) return `<div style="max-width:290px;margin:18px auto"><div class="meme-preview"><img src="${escapeHTML(latestMemeDataUrl || images.memeCat || 'assets/images/meme-template-cat.svg')}" alt="Aperçu de ton mème créé" style="${latestMemeDataUrl ? 'object-fit:contain;background:#fff' : ''}">${latestMemeDataUrl ? '' : '<div class="meme-caption top">QUAND TU DIS…</div><div class="meme-caption bottom">JE VAIS REGARDER 5 MINUTES</div>'}</div></div><button class="btn btn-soft btn-small" data-action="download-last-meme">⬇ Télécharger le mème</button>`;
    if (id === 7) return `<img class="postcard-img" src="${escapeHTML(images.postcard || 'assets/images/postcard-friendship.svg')}" alt="Carte postale numérique pastel"><button class="btn btn-soft btn-small" data-action="download-postcard">⬇ Garder la carte postale</button>`;
    if (id === 9) return `<button class="btn btn-soft btn-small" data-action="download-coupon">⬇ Télécharger le bon spécial</button>`;
    if (id === 8) return `<img class="postcard-img" src="${escapeHTML(images.treasure || 'assets/images/treasure-scene.svg')}" alt="La scène nocturne de la chasse au trésor">`;
    return '';
  }

  function renderReward(id) {
    stopTransientTasks();
    view = 'reward'; currentLevel = id; updateHeader();
    const reward = REWARDS[id];
    const body = typeof reward.body === 'function' ? reward.body() : reward.body;
    const personal = typeof reward.personal === 'function' ? reward.personal() : reward.personal;
    const nextText = id < 9 ? `Passer au niveau ${id + 1} →` : 'Découvrir la dernière bobine →';
    screen.innerHTML = `<section class="reward-screen"><div class="reward-confetti" aria-hidden="true">✦ ♡ ✧ ✦</div><div class="reward-card">
      <div class="reward-sticker">${reward.emoji}</div><span class="eyebrow"><span class="live-dot"></span> SURPRISE DÉBLOQUÉE · NIVEAU ${String(id).padStart(2,'0')}</span>
      <h1>${escapeHTML(reward.title)}</h1><div class="badge-unlocked">✦ ${escapeHTML(reward.label)} ✦</div>
      <p>${escapeHTML(body)}</p>
      ${personal ? `<div class="reward-personal">${textLines(personal)}</div>` : ''}
      ${rewardExtra(id)}
      <div class="reward-actions"><button class="btn btn-primary" data-action="gift-next">${nextText}</button><button class="btn btn-soft" data-action="map">Retour à la carte</button></div>
    </div></section>`;
    burstConfetti(18);
  }

  function renderFinale(revealLetter) {
    stopTransientTasks();
    view = revealLetter ? 'finale' : 'level'; currentLevel = 10; updateHeader();
    const image = (CFG.images || {}).finale || 'assets/images/finale-illustration.svg';
    const letter = (CFG.finalMessage || []).map(p => `<p>${escapeHTML(p)}</p>`).join('');
    const completedBadge = state.completed.includes(10) ? '<div class="badge-unlocked">✦ 10 / 10 ÉPREUVES TERMINÉES ✦</div>' : '';
    screen.innerHTML = `<section class="final-scene">
      <div class="level-toolbar"><button class="back-link" data-action="map">← Retour à la carte</button><div class="level-counter"><strong>NIVEAU 10</strong><span>/ 10</span><span class="level-progress-track"><span style="width:${getCompletedCount() * 10}%"></span></span></div></div>
      <div class="final-sky"><img src="${escapeHTML(image)}" alt="Une enveloppe parmi des étoiles"><div class="final-caption">DERNIÈRE BOBINE · DOSSIER PERSONNEL</div></div>
      <div class="final-fragments" aria-label="Fragments d'étoiles collectés">${Array.from({length:10}, (_, i) => `<span class="${state.completed.includes(i + 1) || revealLetter ? 'collected' : ''}" title="${state.completed.includes(i + 1) || revealLetter ? 'Fragment collecté' : 'Fragment à découvrir'}">✦</span>`).join('')}</div>
      <span class="eyebrow">🎬 FIN DE LA MISSION</span><h1>La dernière bobine</h1><p class="final-subtitle">Les fragments de l’aventure se rassemblent. Tu es arrivée au bout des épreuves ; il reste une dernière enveloppe à ouvrir, à ton rythme.</p>
      ${!revealLetter ? `<div class="letter-envelope"><span class="envelope-icon">💌</span><h2>Une enveloppe t’attend</h2><p>Ce n’est ni une énigme ni un test. Juste quelques mots sincères, préparés pour conclure cette petite aventure.</p><button class="btn btn-primary" data-action="final-open-letter">Ouvrir l’enveloppe ✨</button></div>` : `<div class="badge-unlocked">✦ 10 / 10 ÉPREUVES TERMINÉES ✦</div><article class="final-letter">${letter}</article><div class="final-souvenir"><h3>🎟️ Un dernier petit cadeau</h3><p>${escapeHTML(CFG.level9CouponText || 'Un bon pour une soirée à la carte, à utiliser quand tu en as envie, sans date limite et sans obligation.')}</p><button class="btn btn-soft btn-small" data-action="download-coupon">⬇ Garder le bon spécial</button></div><div class="reward-actions"><button class="btn btn-primary" data-action="map">Revoir toute l’aventure →</button><button class="btn btn-soft" data-action="final-replay">Relire la lettre ♡</button></div>`}
      </section>`;
    if (revealLetter) startSoundtrack('finale');
  }

  function resetProgress() {
    const sure = window.confirm('Recommencer l’aventure ? Les 10 niveaux seront reverrouillés sur cet appareil.');
    if (!sure) return;
    state = { started: false, unlocked: 1, completed: [], finalLetterOpen: false };
    saveState();
    renderIntro();
    notify('Le dossier a été réinitialisé. Bonne nouvelle mission ! ✨');
  }

  async function handleAction(action, button) {
    switch (action) {
      case 'home': renderIntro(); break;
      case 'map': state.started = true; saveState(); renderMap(); break;
      case 'accept-mission': state.started = true; saveState(); playSfx('pop'); renderMap(); break;
      case 'too-beautiful': notify('Décision prise en compte. Le comité confirme : beauté reconnue. Mais le dossier a l’air beaucoup trop amusant… 💅'); button?.classList.add('wiggle'); break;
      case 'map-primary': renderLevel(state.completed.includes(10) ? 10 : Math.min(10, Math.max(1, state.unlocked))); break;
      case 'reset-progress': resetProgress(); break;
      case 'start-chaos': startChaos(); break;
      case 'retry-chaos': { const failed = document.querySelector('[data-chaos-failed]'); if (failed) failed.remove(); startChaos(); break; }
      case 'quiz-next': if (quizPos < QUIZ_QUESTIONS.length - 1) { quizPos++; renderQuizPanel(); } else completeLevel(2); break;
      case 'start-arcade': startArcade(); break;
      case 'music-next': if (musicPos < MUSIC_QUESTIONS.length - 1) { musicPos++; renderMusicPanel(); } else completeLevel(4); break;
      case 'riddle-next': if (riddlePos < RIDDLES.length - 1) { riddlePos++; renderRiddlePanel(); } else completeLevel(5); break;
      case 'meme-download': downloadMeme(); break;
      case 'finish-meme': buildMemeDataURL(() => completeLevel(6)); break;
      case 'memory-shuffle': renderLevel(7); break;
      case 'complete-doors': if (doorsOpened.size === 3) completeLevel(9); else notify('Il reste une ou plusieurs portes à ouvrir. 🚪'); break;
      case 'gift-next': renderLevel(Math.min(10, currentLevel + 1)); break;
      case 'download-diploma': drawDownloadCard('DIPLÔME OFFICIEL', 'Pour talent rare en matière de réponses improbables\nDécerné à : Mini René — Agente du Hasard', 'diplome-agente-du-hasard.png', '🏅'); notify('Le diplôme vient d’être ajouté à tes téléchargements.'); break;
      case 'download-wallpaper': downloadIllustration((CFG.images || {}).wallpaper || 'assets/images/wallpaper-stars.svg', 'fond-ecran-etoile.svg'); notify('Un petit ciel étoilé à garder sur ton téléphone. 🌙'); break;
      case 'download-postcard': downloadIllustration((CFG.images || {}).postcard || 'assets/images/postcard-friendship.svg', 'carte-postale-operation-hasard.svg'); notify('Carte postale téléchargée. 💌'); break;
      case 'download-coupon': drawDownloadCard(CFG.level9CouponTitle || 'BON POUR UNE SOIRÉE À LA CARTE', CFG.level9CouponText || 'Film, jeu, musique ou simple conversation au choix. Quand tu en as envie, sans obligation.', 'bon-soiree-a-la-carte.png', '🎟️'); notify('Le bon spécial est prêt à être conservé. 🎟️'); break;
      case 'download-last-meme': if (latestMemeDataUrl) downloadDataUrl(latestMemeDataUrl, 'mon-meme-operation-hasard.png'); else notify('Retourne au niveau 6 pour créer ton propre mème.'); break;
      case 'final-open-letter': completeLevel(10); break;
      case 'final-replay': renderFinale(true); break;
      default: break;
    }
  }

  document.addEventListener('click', event => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      event.preventDefault();
      handleAction(actionButton.dataset.action, actionButton);
      return;
    }
    const levelButton = event.target.closest('[data-level]');
    if (levelButton) {
      const id = Number(levelButton.dataset.level);
      if (!isUnlocked(id)) notify('Cette porte est encore verrouillée. Réussis le niveau précédent pour continuer. 🔐');
      else renderLevel(id);
      return;
    }
    const deleteButton = event.target.closest('[data-delete-msg]');
    if (deleteButton) { deleteMessage(deleteButton); return; }
    const quizButton = event.target.closest('[data-quiz-answer]');
    if (quizButton) { handleQuizAnswer(Number(quizButton.dataset.quizAnswer)); return; }
    const arcadeObject = event.target.closest('[data-arcade-object]');
    if (arcadeObject) { arcadeHit(arcadeObject); return; }
    const musicButton = event.target.closest('[data-music-answer]');
    if (musicButton) { handleMusicAnswer(Number(musicButton.dataset.musicAnswer)); return; }
    const playButton = event.target.closest('[data-play-quiz-track]');
    if (playButton) { playTrack(Number(playButton.dataset.playQuizTrack), `music-wave-${musicPos}`); return; }
    const riddleButton = event.target.closest('[data-riddle-answer]');
    if (riddleButton) { handleRiddleAnswer(Number(riddleButton.dataset.riddleAnswer)); return; }
    const memoryButton = event.target.closest('[data-memory-card]');
    if (memoryButton) { handleMemoryCard(memoryButton); return; }
    const treasureButton = event.target.closest('[data-treasure]');
    if (treasureButton) { handleTreasure(Number(treasureButton.dataset.treasure), treasureButton); return; }
    const doorButton = event.target.closest('[data-door]');
    if (doorButton) { handleDoor(doorButton.dataset.door, doorButton); return; }
  });

  document.addEventListener('input', event => {
    if (event.target.matches('[data-meme-input]')) refreshMemePreview();
  });
  document.addEventListener('change', event => {
    if (event.target.matches('[data-meme-template]')) {
      customMemeImageDataUrl = null;
      const upload = document.getElementById('meme-upload');
      if (upload) upload.value = '';
      refreshMemePreview();
    }
    if (event.target.matches('[data-meme-upload]')) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (!file.type || !file.type.startsWith('image/')) {
        notify('Choisis un fichier image (JPG, PNG, WebP…).');
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        customMemeImageDataUrl = String(reader.result || '');
        refreshMemePreview();
        const feedback = document.getElementById('meme-feedback');
        if (feedback) feedback.textContent = `Image chargée : ${file.name}. Ajoute tes légendes, puis télécharge ton mème. 🖼️`;
      };
      reader.onerror = () => notify('Cette image n’a pas pu être chargée. Essaie un fichier JPG ou PNG.');
      reader.readAsDataURL(file);
    }
  });

  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    updateHeader();
    if (soundOn) startSoundtrack(view === 'finale' ? 'finale' : 'menu');
    else if (soundtrack) { soundtrack.pause(); soundtrack = null; }
    notify(soundOn ? 'Ambiance sonore activée. ♫' : 'Ambiance sonore coupée. Tu peux la rallumer quand tu veux.');
  });

  // Initialiser un panneau de jeu après son rendu.
  const originalRenderLevel = renderLevel;
  renderLevel = function patchedRenderLevel(id) {
    originalRenderLevel(id);
    if (id === 2 && view === 'level') { quizPos = 0; renderQuizPanel(); }
    if (id === 4 && view === 'level') { musicPos = 0; renderMusicPanel(); }
    if (id === 5 && view === 'level') { riddlePos = 0; renderRiddlePanel(); }
  };

  // Conserver le suivi de progression même lorsqu'on recharge la page.
  if (state.started || state.completed.length > 0) renderMap(); else renderIntro();
})();
