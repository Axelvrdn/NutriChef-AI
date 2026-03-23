# Tâches — `services/`

> **Rôle :** logique métier, orchestration, intégration IA et génération de listes.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 11 |
| **Fait** | 0 |
| **Reste** | 11 |

## Tâches

- [ ] Service **UserProfile** : CRUD ADN culinaire, calcul besoins (macros) si applicable.
- [ ] Service **Recipe** : CRUD, suggestion selon profil et contraintes temps/macros.
- [ ] Service **Planner** : affectation recettes aux créneaux, gestion « hors foyer » (pas d’ingrédients).
- [ ] Service **ShoppingList** : agrégation des ingrédients de la semaine, déduplication, unités.
- [ ] Service **Open Food Facts** (ou client dédié) : résolution par **code-barres** (EAN), extraction des nutriments pertinents (énergie kcal, protéines, glucides, lipides, sel, etc. — champs type `*_100g` selon [la doc des champs](https://world.openfoodfacts.org/data/data-fields.txt)), gestion « produit inconnu », cache TTL.
- [ ] **IA Recipe Engine** : appel GPT-4o (ou équivalent) pour réécriture selon matériel et durée.
- [ ] Prompts versionnés, garde-fous (refus hors cuisine), logging des tokens.
- [ ] Service **Discover / feed** : contenus personnalisés ou curated (stub puis règles).
- [ ] Service **Notifications** : préférences + hooks pour rappels (push/email selon stack).
- [ ] Service **Abonnement** : statut premium, dates d’expiration (aligné maquette « vérification requise »).
- [ ] Tests unitaires des règles métier (pure logic + mocks clients IA).
