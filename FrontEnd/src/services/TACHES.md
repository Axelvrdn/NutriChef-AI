# Tâches — `services/`

> **Rôle :** appels API métiers côté front (si non colocalisés dans chaque feature).

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 7 |
| **Fait** | 0 |
| **Reste** | 7 |

## Tâches

- [ ] Module `api/recipes.ts` (liste, détail, CRUD).
- [ ] Module `api/profile.ts` (profil, préférences, notifications).
- [ ] Module `api/planner.ts` (semaine, slots).
- [ ] Module `api/shopping.ts` (liste, export Leclerc).
- [ ] Module `api/nutrition.ts` ou `api/products.ts` : **résolution par code-barres via l’API NutriFlow** uniquement (pas d’appel direct du navigateur à Open Food Facts — voir [Data](https://world.openfoodfacts.org/data)).
- [ ] Module `api/discover.ts` (feed).
- [ ] Typage strict des réponses (voir `app/models`).
