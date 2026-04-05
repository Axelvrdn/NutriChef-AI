# Tâches — `repositories/`

> **Rôle :** accès données Spring Data JPA, requêtes dérivées et `@Query` si besoin.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 2 |
| **Reste** | 4 |

## Tâches

- [x] Repositories pour entités métier : `UserProfileRepository`, `RecipeRepository`, `WeeklyPlanRepository`, `MealSlotRepository`, `DiscoverPostRepository`, `RefreshTokenRepository`, `UserFollowRepository`, `RecipeCollectionRepository`, `UserSubscriptionRepository`, `MealLogRepository`, `MealLogItemRepository`.
- [ ] Repositories manquants : `ShoppingListRepository`, `ShoppingListItemRepository`, `IngredientRepository`, `FoodRepository` (cache OFF).
- [ ] Si cache local OFF : repository lecture/écriture par code-barres (TTL ou invalidation alignée sur la politique [Open Food Facts](https://world.openfoodfacts.org/data)).
- [ ] Requêtes avancées : recettes par filtres (repas, saison, tags) et recherche texte full-text.
- [x] Requêtes planning : `findByUserIdAndWeekStartDate` — OK. Plage de dates à compléter.
- [ ] Tests `@DataJpaTest` sur requêtes critiques.
