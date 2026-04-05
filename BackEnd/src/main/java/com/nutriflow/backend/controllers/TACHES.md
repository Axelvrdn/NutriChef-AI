# Tâches — `controllers/`

> **Rôle :** couche REST, codes HTTP, sécurité par endpoint.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 11 |
| **Fait** | 4 |
| **Reste** | 7 |

## Tâches

- [x] **Auth** : `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh` — JWT access + refresh tokens, rotation.
- [x] **Me** : `GET /api/me` — profil de l'utilisateur authentifié.
- [ ] Endpoints **profil / paramètres** : `PATCH /api/me` (ADN culinaire, notifications, compte).
- [x] Endpoints **recettes** : `GET /api/recipes`, `POST /api/recipes` — liste et création. Update (`PUT`), suppression (`DELETE`), détail (`GET /{id}`) et favoris/collections à ajouter.
- [x] Endpoints **planning** : `GET /api/planning/current-week` — semaine courante. Ajout/suppression de créneaux à compléter.
- [x] Endpoints **journal alimentaire** : `GET/POST /api/meal-log` (`MealLogController`).
- [x] Endpoints **interactions posts** : likes, bookmarks, commentaires (`PostInteractionController`).
- [ ] Endpoint **génération liste de courses** + statut export drive.
- [ ] Endpoint(s) **nutrition produit** : code-barres → agrégat kcal / macros (proxy vers [Open Food Facts](https://world.openfoodfacts.org/data), ne pas exposer le client final directement à l'API OFF).
- [ ] Endpoint **feed « Découvrir »** : `GET /api/discover/feed` ✅ — pagination avancée + filtres à ajouter.
- [ ] Gestion d'erreurs centralisée (`@ControllerAdvice`) + réponses RFC 7807 ou format interne stable.
- [ ] Documentation OpenAPI / Swagger (optionnelle).
