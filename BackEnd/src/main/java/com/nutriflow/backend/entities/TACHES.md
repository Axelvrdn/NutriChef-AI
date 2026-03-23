# Tâches — `entities/`

> **Rôle :** modèle JPA : utilisateur, profil « ADN culinaire », aliments, repas, recettes, planning, etc.

## Résumé


| Métrique  | Valeur |
| --------- | ------ |
| **Total** | 9      |
| **Fait**  | 0      |
| **Reste** | 9      |


## Tâches

- [ ] Modéliser **Recipe** (titre, étapes, temps, macros, niveau cuisine, tags saison).
- [ ] Modéliser **Ingredient** / lien recette-ingrédient (quantité, unité).
- [ ] Option **référence produit OFF** : code-barres, snapshot des nutriments de référence (cache aligné sur l’API [Open Food Facts](https://world.openfoodfacts.org/data)), horodatage de dernière synchro si besoin.
- [ ] Étendre **UserProfile** : préférences alimentaires, intolérances, objectif kcal, hydratation, niveau cuisine.
- [ ] Entité **MealSlot** ou équivalent : jour, type (matin/midi/soir), lieu (maison/resto/extérieur).
- [ ] Entité **WeeklyPlan** / liaison agenda ↔ recettes.
- [ ] Entité **ShoppingList** + lignes (ingrédient, quantité, statut coché, mapping produit drive).
- [ ] Entité **NotificationPreference** (rappels repas, liste auto, actus) si persistées côté serveur.
- [ ] Contraintes d’intégrité, indexes, et relations lazy/eager documentées.

