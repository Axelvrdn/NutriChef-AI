# Tâches — `services/`

> **Rôle :** logique métier, orchestration, intégration IA et génération de listes.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 14 |
| **Fait** | 6 |
| **Reste** | 8 |

## Tâches

- [x] Service **Auth** : inscription (hash BCrypt), connexion, émission et rotation des tokens JWT (`AuthService`, `RefreshTokenService`).
- [x] Service **AuthenticatedUser** : résolution de l'utilisateur courant depuis le contexte Spring Security.
- [x] Service **Me** : lecture du profil courant (`MeService`).
- [ ] Service **UserProfile** : CRUD complet ADN culinaire, calcul besoins (macros) si applicable.
- [x] Service **Recipe** : liste et création de base (`RecipeService`) — suggestion selon profil, update/delete à compléter.
- [x] Service **Planner** : lecture semaine courante (`PlanningService`) — ajout/suppression de créneaux à compléter.
- [ ] Service **ShoppingList** : agrégation des ingrédients de la semaine, déduplication, unités.
- [ ] Service **Open Food Facts** (ou client dédié) : résolution par code-barres (EAN), extraction nutriments (`*_100g`), gestion « produit inconnu », cache TTL — voir [doc champs](https://world.openfoodfacts.org/data/data-fields.txt).
- [ ] **IA Recipe Engine** : appel GPT-4o (ou équivalent) pour réécriture selon matériel et durée.
- [ ] Prompts versionnés, garde-fous (refus hors cuisine), logging des tokens.
- [x] Service **Discover** : feed paginé + interactions posts (`DiscoverService`, `PostInteractionService`).
- [ ] Service **Notifications** : préférences + hooks pour rappels (push/email selon stack).
- [ ] Service **Abonnement** : statut premium, dates d'expiration (aligné maquette « vérification requise »).
- [ ] Tests unitaires des règles métier (pure logic + mocks clients IA).
