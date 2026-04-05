# Tâches — `BackEnd/src/test/java/`

> **Rôle :** tests unitaires, slice tests, tests d'intégration API.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 1 |
| **Reste** | 5 |

## Tâches

- [x] Tests `@WebMvcTest` sur contrôleurs critiques (avec mocks services) — `AuthControllerTest` et `MeControllerTest` créés.
- [ ] Tests `@DataJpaTest` sur repositories complexes (requêtes par filtres, planning par dates).
- [ ] Test d'intégration `@SpringBootTest` + Testcontainers Postgres (optionnel mais recommandé pour le flux auth complet).
- [ ] Tests contrat ou smoke sur flux auth + profil (register → login → /api/me).
- [ ] Tests du client Open Food Facts avec **MockWebServer** (JSON produit d'exemple, 404, timeouts) — conformité aux usages décrits sur [world.openfoodfacts.org/data](https://world.openfoodfacts.org/data).
- [ ] Pipeline CI : `mvn test` obligatoire sur chaque PR (GitHub Actions ou équivalent).
