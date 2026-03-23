# Tâches — `app/models/`

> **Rôle :** types TypeScript alignés sur les DTOs API (profil, recette, planning, liste).

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 0 |
| **Reste** | 6 |

## Tâches

- [ ] Types **User** / **Profile** (ADN culinaire, intolérances, objectifs).
- [ ] Types **Recipe**, **IngredientLine**, **NutritionSummary** (champs alignés sur le **contrat API NutriFlow** pour les produits, lui-même basé sur les nutriments [Open Food Facts](https://world.openfoodfacts.org/data) — ex. valeurs pour 100 g / portion).
- [ ] Types **MealSlot**, **WeekPlan**.
- [ ] Types **ShoppingListItem**, statut export drive.
- [ ] Types **DiscoverPost** / auteur / interactions (like, commentaire).
- [ ] Zod ou schémas runtime pour valider les réponses API (optionnel mais utile).
