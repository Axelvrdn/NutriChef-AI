# Tâches — `dtos/`

> **Rôle :** objets de transfert API (request/response), découplage des entités JPA.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 9 |
| **Fait** | 4 |
| **Reste** | 5 |

## Tâches

- [x] DTOs **auth** : `RegisterRequest`, `LoginRequest`, `RefreshTokenRequest`, `AuthResponse`, `AuthUserResponse`.
- [ ] DTOs **profil / ADN culinaire** (lecture + mise à jour partielle) — seul `MeResponse` existe, PATCH profile manquant.
- [x] DTOs **recette** : `CreateRecipeRequest`, `RecipeResponse` — validation Bean Validation à compléter (update/delete).
- [ ] DTOs **réponse nutrition produit** : sous-ensemble stable des nutriments issus d'Open Food Facts ([champs documentés](https://world.openfoodfacts.org/data/data-fields.txt)), sans exposer la payload brute OFF.
- [x] DTOs **planning hebdomadaire** : `MealSlotResponse`, `CurrentWeekPlanResponse`.
- [x] DTOs **discover / feed** : `DiscoverFeedItemResponse`.
- [ ] DTOs **liste de courses** (agrégation, export vers intégration Leclerc).
- [ ] DTOs **pagination et filtres** (recherche recettes, chips catégories / saison).
- [ ] Mapper MapStruct (ou manuel) entité ↔ DTO, tests de mapping.
