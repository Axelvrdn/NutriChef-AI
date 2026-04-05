# Tâches — `entities/`

> **Rôle :** modèle JPA : utilisateur, profil « ADN culinaire », aliments, repas, recettes, planning, etc.

## Résumé

| Métrique  | Valeur |
| --------- | ------ |
| **Total** | 9      |
| **Fait**  | 7      |
| **Reste** | 2      |


## Tâches

- [x] Modéliser **Recipe** (titre, étapes, temps, macros, niveau cuisine, tags saison, imageUrl, category, difficulty).
- [x] Modéliser **Ingredient** / lien recette-ingrédient (`RecipeIngredient` avec quantité et unité).
- [x] Option **référence produit OFF** : entité `Food` avec code-barres, snapshot nutriments (`rawPayload jsonb`), `sourceLicense`, `lastSyncedAt` — cache aligné sur [Open Food Facts](https://world.openfoodfacts.org/data).
- [x] Étendre **UserProfile** : `subtitle`, `bio`, `avatarUrl`, `cookingLevel`, `dietPreferences`, `intolerances`, `allergies` (jsonb), objectifs kcal / protéines / glucides / lipides / hydratation.
- [x] Entité **MealSlot** : jour, type (matin/midi/soir), FK vers `Recipe`.
- [x] Entité **WeeklyPlan** + liaison agenda ↔ recettes.
- [x] Entité **ShoppingList** + **ShoppingListItem** (ingrédient, quantité, statut coché, mapping produit drive).
- [ ] Entité **NotificationPreference** (rappels repas, liste auto, actus) si persistées côté serveur.
- [ ] Vérifier / compléter les contraintes d'intégrité, indexes composites, et stratégies lazy/eager documentées.
