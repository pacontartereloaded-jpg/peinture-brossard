# Peinture Brossard

Site vitrine premium pour une entreprise de peinture résidentielle et commerciale à Brossard, Rive-Sud, Québec.

**Live:** https://peinturebrossard.ca _(à venir)_

## Langues
- 🇨🇦 Français (par défaut) — `/`
- 🇬🇧 English — `/en/`
- 🇪🇸 Español — `/es/`

## Stack
- HTML / CSS / JavaScript pur, sans framework
- Polices Google Fonts (Cormorant Garamond + Inter)
- Carte interactive Google Maps embed
- Aucune dépendance npm

## Structure
```
.
├── index.html            # Version française (racine)
├── en/index.html         # Version anglaise
├── es/index.html         # Version espagnole
├── hero.html             # Démo standalone du hero
├── css/styles.css        # Feuille de style partagée
├── js/main.js            # Scripts partagés
├── img/                  # Images générées (avant/après hero, intérieur)
└── vercel.json           # Config de déploiement Vercel
```

## Animations
- **Brush Reveal** sur le H1 du hero
- **Roller Wipe** au chargement de page
- **Auto-paint reveal** sur la maison du hero (clip-path 2.6s)
- **Click-to-paint** sur la pièce de la section intro
- **Paint fill horizontal** sur les questions FAQ
- **Paint fill vertical** sur les boutons CTA et les cartes de services
- **Scroll reveal** type peinture qui sèche sur chaque section
- **Tags interactifs** qui mettent à jour la carte Google Maps en direct

## Contact
- 📞 (450) 912-9165
- ✉️ info@peinturebrossard.ca

## Déploiement Vercel
1. Importer ce repo dans Vercel
2. Pas de build command nécessaire (site statique)
3. Output Directory: laisser vide (racine)
4. `vercel.json` gère les `cleanUrls` et le cache des assets

## Licence
© Peinture Brossard. Tous droits réservés.
