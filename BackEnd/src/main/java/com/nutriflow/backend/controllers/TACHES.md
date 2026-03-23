# Tâches — `controllers/`

> **Rôle :** couche REST, codes HTTP, sécurité par endpoint.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 9 |
| **Fait** | 0 |
| **Reste** | 9 |

## Tâches

- [ ] Auth : inscription, connexion, refresh (selon choix JWT/session).
- [ ] Endpoints profil / paramètres (ADN, notifications, compte).
- [ ] Endpoints recettes (liste, détail, création, favoris / collections).
- [ ] Endpoints planning / calendrier (semaine, ajout/suppression créneau).
- [ ] Endpoint génération liste de courses + statut export drive.
- [ ] Endpoint(s) **nutrition produit** : code-barres → agrégat kcal / macros (proxy vers [Open Food Facts](https://world.openfoodfacts.org/data), ne pas exposer le client final directement à l’API OFF).
- [ ] Endpoint feed « Découvrir » (pagination).
- [ ] Gestion d’erreurs centralisée + réponses problème (RFC 7807 ou format interne stable).
- [ ] Documentation OpenAPI / Swagger optionnelle.
