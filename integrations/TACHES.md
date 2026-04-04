# Tâches — `integrations/`

> **Rôle :** Click & Collect, catalogues produits, automatisation (Playwright et extension navigateur). Les **données nutritionnelles de référence** (kcal, protéines, glucides, lipides, etc.) pour les produits identifiés viennent d’[**Open Food Facts**](https://world.openfoodfacts.org/data) — voir la page officielle [Data & API](https://world.openfoodfacts.org/data) (licence ODbL, règles d’usage de l’API vs exports).

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 12 |
| **Fait** | 0 |
| **Reste** | 12 |

## Tâches

- [ ] Définir le flux « ingrédients agrégés → produits drive » (règles de matching, fallbacks).
- [ ] Prototype d’API ou script d’export de panier (format intermédiaire JSON/CSV).
- [ ] Recherche conformité CGU Leclerc Drive / limites d’automatisation.
- [ ] PoC Playwright (connexion, ajout panier) en environnement isolé et sécurisé.
- [ ] Cadrage OFF : consommation via **l’API backend NutriFlow** uniquement ; respect des [conditions de réutilisation](https://world.openfoodfacts.org/data) et de la politique API (pas de scraping massif via l’API — dumps / exports pour gros volumes).
- [ ] Mapping « ligne liste de courses / EAN drive » → champs nutritionnels normalisés (alignés sur la réponse API produit OFF : ex. nutriments pour 100 g).
- [ ] En cas de besoin hors ligne : évaluer réplication locale à partir des [exports](https://world.openfoodfacts.org/data) (JSONL, CSV, Parquet) plutôt que multiplier les appels live.
- [ ] Contrat d’API de sync pour l’extension navigateur (start job, progression, résultat détaillé par item).
- [ ] Format commun « connector » pour supporter plusieurs drives sans dupliquer la logique métier.
- [ ] Journalisation et gestion d’erreurs (échec login, produit introuvable).
- [ ] Secrets : jamais en repo ; vault ou variables CI uniquement.
- [ ] Tests de non-régression sur le script quand l’UI du drive change.
