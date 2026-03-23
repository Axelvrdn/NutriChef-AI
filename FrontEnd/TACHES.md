# Tâches — `FrontEnd/`

> **Rôle :** application web NutriFlow (layout sidebar, pages maquettes, PWA). Le `package.json` actuel est minimal ; aligner avec la stack cible (ex. Next.js + Tailwind comme dans le README racine).

## Résumé module

| Métrique | Valeur |
| :--- | ---: |
| **Total (vue d’ensemble)** | 8 |
| **Fait** | 0 |
| **Reste** | 8 |

## Sous-dossiers `src/` (détail)

Voir [`src/TACHES.md`](src/TACHES.md) et les `TACHES.md` dans `src/app/`, `src/components/`, etc.

| Zone | Fichier | Total (indicatif) |
| :--- | :--- | ---: |
| Sources | [`src/TACHES.md`](src/TACHES.md) | 4 |
| `app` | [`src/app/TACHES.md`](src/app/TACHES.md) | 5 |
| `app/core` | [`src/app/core/TACHES.md`](src/app/core/TACHES.md) | 9 |
| `app/models` | [`src/app/models/TACHES.md`](src/app/models/TACHES.md) | 6 |
| `app/shared` | [`src/app/shared/TACHES.md`](src/app/shared/TACHES.md) | 7 |
| `app/shared/components` | [`src/app/shared/components/TACHES.md`](src/app/shared/components/TACHES.md) | 6 |
| `app/features` | [`src/app/features/TACHES.md`](src/app/features/TACHES.md) | 3 |
| Features enfants | voir chaque sous-dossier | 55 |
| `components` | [`src/components/TACHES.md`](src/components/TACHES.md) | 8 |
| `services` | [`src/services/TACHES.md`](src/services/TACHES.md) | 7 |
| `hooks` | [`src/hooks/TACHES.md`](src/hooks/TACHES.md) | 5 |
| `context` | [`src/context/TACHES.md`](src/context/TACHES.md) | 4 |
| `assets` | [`src/assets/TACHES.md`](src/assets/TACHES.md) | 4 |
| `pages` | [`src/pages/TACHES.md`](src/pages/TACHES.md) | 3 |

## Tâches (niveau projet)

- [ ] Initialiser le framework (Next.js App Router ou équivalent) + TypeScript + Tailwind + Framer Motion si prévu.
- [ ] Design system : couleurs maquette (fond `#F9F8F3`, accent `#3D5245`), rayons, ombres.
- [ ] Layout global : sidebar (navigation + bouton « Générer la liste Leclerc »), header (cloche, profil), footer légal.
- [ ] Routage vers : Tableau de bord, Mes recettes, Calendrier, Découvrir, Paramètres.
- [ ] PWA : manifest, service worker, icônes, mode hors-ligne lecture recettes (objectif phase 4 README).
- [ ] Variables d’environnement front (`NEXT_PUBLIC_API_URL` ou équivalent).
- [ ] Parcours **scan / saisie code-barres** : affichage des macros et kcal via **l’API NutriFlow** (backend → [Open Food Facts](https://world.openfoodfacts.org/data)), jamais d’appel direct OFF depuis le client.
- [ ] Qualité : ESLint, Prettier, tests composants (optionnel).
