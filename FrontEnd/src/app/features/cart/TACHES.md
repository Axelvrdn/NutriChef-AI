# Tâches — `features/cart/`

> **Rôle :** liste de courses intelligente, bouton sidebar « Générer la liste Leclerc », suivi d’export vers le drive. Pour les lignes liées à un **produit identifié** (code-barres), les infos nutritionnelles de référence proviennent d’[**Open Food Facts**](https://world.openfoodfacts.org/data) via le backend.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 8 |
| **Fait** | 0 |
| **Reste** | 8 |

## Tâches

- [ ] Vue liste : ingrédients agrégés, quantités, cases cochées.
- [ ] Action **Générer** depuis le planning (pré-remplissage).
- [ ] Déclenchement **Générer la liste Leclerc** : appel API / job qui délègue à `integrations/`.
- [ ] États : en cours, succès, échec partiel (produits non matchés).
- [ ] Ligne produit : affichage optionnel kcal / macros (100 g ou portion) quand l’EAN est résolu via [Open Food Facts](https://world.openfoodfacts.org/data) (données fournies par l’API NutriFlow).
- [ ] Affichage des substitutions suggérées (optionnel).
- [ ] Historique des exports (optionnel).
- [ ] UX mobile : liste utilisable en magasin (PWA).
