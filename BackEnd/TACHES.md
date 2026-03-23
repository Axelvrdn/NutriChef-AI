# Tâches — `BackEnd/` (API Spring Boot)

> **Rôle :** API REST, persistance, règles métier NutriFlow (profil, repas, recettes, listes).

## Résumé module

| Métrique | Valeur |
| :--- | ---: |
| **Total (vue d’ensemble)** | 8 |
| **Fait** | 0 |
| **Reste** | 8 |

## Sous-dossiers (détail + comptage local)

| Dossier | Total tâches (fichier) |
| :--- | ---: |
| [`entities/`](src/main/java/com/nutriflow/backend/entities/TACHES.md) | 9 |
| [`dtos/`](src/main/java/com/nutriflow/backend/dtos/TACHES.md) | 7 |
| [`repositories/`](src/main/java/com/nutriflow/backend/repositories/TACHES.md) | 6 |
| [`services/`](src/main/java/com/nutriflow/backend/services/TACHES.md) | 11 |
| [`controllers/`](src/main/java/com/nutriflow/backend/controllers/TACHES.md) | 9 |
| [`config/`](src/main/java/com/nutriflow/backend/config/TACHES.md) | 7 |
| [`exception/`](src/main/java/com/nutriflow/backend/exception/TACHES.md) | 4 |
| [`resources/`](src/main/resources/TACHES.md) | 6 |
| [`test`](src/test/java/TACHES.md) | 6 |

**Somme des sous-modules : 65** (à ajuster si vous modifiez les listes locales).

## Tâches (niveau projet)

- [ ] Finaliser la stack : Spring Data JPA, validation, sécurité (JWT ou session), CORS avec le front.
- [ ] Migrations : Flyway ou Liquibase pour le schéma aligné sur les entités métier NutriFlow.
- [ ] Couverture des parcours : inscription / profil ADN, journal alimentaire, planning, recettes.
- [ ] Client HTTP ou file d’attente pour appels OpenAI (IA recettes) avec timeouts et quotas.
- [ ] Données nutritionnelles produits : intégration [**Open Food Facts**](https://world.openfoodfacts.org/data) (API JSON/XML documentée sur la page Data) — client serveur, cache, en-tête contact ; pas d’appel direct depuis le front.
- [ ] Endpoint ou job pour génération de liste de courses agrégée (entrée : planning + recettes).
- [ ] Healthcheck et métriques (Actuator) pour déploiement.
- [ ] Harmoniser avec le dossier `src/` à la racine du repo (voir [`../src/TACHES.md`](../src/TACHES.md)).
