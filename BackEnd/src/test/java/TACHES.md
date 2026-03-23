# Tâches — `BackEnd/src/test/java/`

> **Rôle :** tests unitaires, slice tests, tests d’intégration API.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 0 |
| **Reste** | 6 |

## Tâches

- [ ] Tests `@WebMvcTest` sur contrôleurs critiques (avec mocks services).
- [ ] Tests `@DataJpaTest` sur repositories complexes.
- [ ] Test d’intégration `@SpringBootTest` + Testcontainers Postgres (optionnel mais recommandé).
- [ ] Tests contrat ou smoke sur flux auth + profil.
- [ ] Tests du client Open Food Facts avec **MockWebServer** (JSON produit d’exemple, 404, timeouts) — conformité aux usages décrits sur [world.openfoodfacts.org/data](https://world.openfoodfacts.org/data).
- [ ] Pipeline CI : `mvn test` obligatoire sur chaque PR.
