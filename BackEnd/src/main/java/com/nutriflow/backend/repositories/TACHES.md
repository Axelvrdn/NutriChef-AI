# Tâches — `repositories/`

> **Rôle :** accès données Spring Data JPA, requêtes dérivées et `@Query` si besoin.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 0 |
| **Reste** | 6 |

## Tâches

- [ ] Repositories pour nouvelles entités (Recipe, Planning, ShoppingList, etc.).
- [ ] Si cache local des fiches produit OFF : repository lecture/écriture par code-barres (TTL ou invalidation alignée sur la politique [Open Food Facts](https://world.openfoodfacts.org/data)).
- [ ] Requêtes : recettes par filtres (repas, saison, tags) et recherche texte.
- [ ] Requêtes : planning par utilisateur et plage de dates.
- [ ] Transactions cohérentes sur opérations multi-lignes (ex. sauvegarde semaine).
- [ ] Tests `@DataJpaTest` sur requêtes critiques.
