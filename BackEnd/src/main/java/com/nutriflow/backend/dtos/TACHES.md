# Tâches — `dtos/`

> **Rôle :** objets de transfert API (request/response), découplage des entités JPA.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 7 |
| **Fait** | 0 |
| **Reste** | 7 |

## Tâches

- [ ] DTOs profil / ADN culinaire (lecture + mise à jour partielle).
- [ ] DTOs recette (liste, détail, création édition) avec validation Bean Validation.
- [ ] DTOs **réponse nutrition produit** : sous-ensemble stable des nutriments issus d’Open Food Facts ([champs documentés](https://world.openfoodfacts.org/data/data-fields.txt)), sans exposer la payload brute OFF au client si inutile.
- [ ] DTOs planning hebdomadaire (slots + recette optionnelle).
- [ ] DTOs liste de courses (agrégation, export vers intégration Leclerc).
- [ ] DTOs pagination et filtres (recherche recettes, chips catégories / saison).
- [ ] Mapper MapStruct (ou manuel) entité ↔ DTO, tests de mapping.
