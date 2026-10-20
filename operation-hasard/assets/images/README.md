# Dossier images — rôle de chaque fichier

Toutes les illustrations actuelles sont des SVG autonomes créés pour ce projet. Le site fonctionne sans ajouter d'autres images.

| Fichier | Utilisation | Pour le personnaliser |
|---|---|---|
| `hero-illustration.svg` | Illustration principale de la page d'accueil. | Remplace l'illustration ou change `images.hero` dans `assets/js/config.js`. |
| `meme-template-cat.svg` | Modèle « chat philosophe » du générateur de mèmes. | Remplace-le par un SVG ou pointe la configuration vers un JPG/PNG personnel. |
| `meme-template-moon.svg` | Modèle « lune épuisée » du générateur de mèmes. | Même principe que le modèle du chat. |
| `meme-template-chaos.svg` | Modèle « chaos organisé » du générateur de mèmes. | Même principe que le modèle du chat. |
| `postcard-friendship.svg` | Carte postale à afficher et à télécharger au niveau 7. | Tu peux remplacer cette carte par une illustration spécialement créée pour ton amie. |
| `treasure-scene.svg` | Décor nocturne de la chasse au trésor et illustration de récompense. | Garde un décor assez horizontal ; les zones cliquables sont positionnées dans le code du niveau 8. |
| `finale-illustration.svg` | Enveloppe lumineuse de la cinématique finale. | Remplace-la par une illustration d'enveloppe ou de constellation. |
| `wallpaper-stars.svg` | Fond d'écran vertical à télécharger au niveau 3. | Format conseillé : portrait 9:16 ou 1080 × 1920 px. |

## Remplacer une image par une photo JPG ou PNG

1. Copie le nouveau fichier dans ce dossier, par exemple `photo-souvenir.jpg`.
2. Ouvre `assets/js/config.js`.
3. Dans l'objet `images`, change la clé concernée pour utiliser le chemin `assets/images/photo-souvenir.jpg`.
4. Enregistre et recharge le site.

Les images affichées dans le générateur de mèmes sont également utilisées pour fabriquer un PNG téléchargeable. Utilise de préférence des fichiers locaux du dépôt. Évite les images distantes, car certaines restrictions de sécurité du navigateur peuvent empêcher la génération du PNG.

Pour les cartes et illustrations servant de souvenir, n'intègre des photos personnelles que si tu es certain que leur utilisation sera bienvenue et respectueuse de la vie privée de ton amie.
