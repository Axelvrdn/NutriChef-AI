# Tâches — `services/`

> **Rôle :** appels API métiers côté front (modules par domaine).

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 7 |
| **Fait** | 4 |
| **Reste** | 3 |

## Tâches

- [x] Module `recipes.ts` : liste et création (GET/POST `/api/recipes`).
- [x] Module `user.ts` : profil courant (GET `/api/me`) et préférences.
- [x] Module `planning.ts` : semaine courante (GET `/api/planning/current-week`).
- [ ] Module `shopping.ts` : liste de courses, export Leclerc.
- [ ] Module `nutrition.ts` / `products.ts` : **résolution par code-barres via l'API NutriFlow uniquement** (pas d'appel direct du navigateur à Open Food Facts — voir [Data](https://world.openfoodfacts.org/data)).
- [x] Module `discover.ts` : feed paginé (GET `/api/discover/feed`).
- [ ] Typage strict complet des réponses (étendre `src/types/api.ts` au fur et à mesure des nouveaux endpoints).
