# Tâches — `FrontEnd/`

> **Rôle :** application web NutriFlow (layout sidebar, pages maquettes, PWA). Next.js App Router + TypeScript + Tailwind CSS v4.

## Résumé module

| Métrique | Valeur |
| :--- | ---: |
| **Total (vue d'ensemble)** | 8 |
| **Fait** | 3 |
| **Reste** | 5 |

## Sous-dossiers `src/` (détail)

| Zone | Fichier | Total (indicatif) | Fait |
| :--- | :--- | ---: | ---: |
| Sources | [`src/TACHES.md`](src/TACHES.md) | 4 | 0 |
| `app` | [`src/app/TACHES.md`](src/app/TACHES.md) | 5 | 3 |
| `app/core` | [`src/app/core/TACHES.md`](src/app/core/TACHES.md) | 9 | 0 |
| `app/models` | [`src/app/models/TACHES.md`](src/app/models/TACHES.md) | 6 | 0 |
| `app/shared` | [`src/app/shared/TACHES.md`](src/app/shared/TACHES.md) | 7 | 0 |
| `app/shared/components` | [`src/app/shared/components/TACHES.md`](src/app/shared/components/TACHES.md) | 6 | 0 |
| `app/features` | [`src/app/features/TACHES.md`](src/app/features/TACHES.md) | 3 | 0 |
| Features enfants | voir chaque sous-dossier | 55 | 0 |
| `components` | [`src/components/TACHES.md`](src/components/TACHES.md) | 8 | 0 |
| `services` | [`src/services/TACHES.md`](src/services/TACHES.md) | 7 | 4 |
| `hooks` | [`src/hooks/TACHES.md`](src/hooks/TACHES.md) | 5 | 1 |
| `context` | [`src/context/TACHES.md`](src/context/TACHES.md) | 4 | 1 |
| `assets` | [`src/assets/TACHES.md`](src/assets/TACHES.md) | 4 | 0 |
| `pages` | [`src/pages/TACHES.md`](src/pages/TACHES.md) | 3 | 0 |

## Tâches (niveau projet)

- [x] Initialiser le framework : Next.js App Router + TypeScript + Tailwind CSS v4 + PostCSS + ESLint — scaffolding complet sur `feat/frontend-next-foundation`.
- [ ] Design system complet : couleurs maquette (fond `#F9F8F3`, accent `#3D5245`), rayons, ombres — variables CSS Tailwind à définir.
- [ ] Layout global fonctionnel : sidebar (navigation + bouton « Générer la liste Leclerc »), header (cloche, profil), footer légal.
- [x] Routage vers : Tableau de bord, Mes recettes, Calendrier, Découvrir, Paramètres — routes `(app)/` créées et scaffoldées.
- [ ] PWA : manifest, service worker, icônes, mode hors-ligne lecture recettes (objectif phase 4).
- [x] Variables d'environnement front : `.env.local.example` avec `NEXT_PUBLIC_API_URL`.
- [ ] Parcours **scan / saisie code-barres** : affichage macros et kcal via l'API NutriFlow (backend → [Open Food Facts](https://world.openfoodfacts.org/data)), jamais d'appel direct OFF depuis le client.
- [ ] Qualité : Prettier, tests composants (Vitest / Testing Library), CI lint + test.
