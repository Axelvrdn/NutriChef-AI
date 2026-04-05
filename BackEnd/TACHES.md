# Tâches — `BackEnd/` (API Spring Boot)

> **Rôle :** API REST, persistance, règles métier NutriFlow (profil, repas, recettes, listes).

## Résumé module

| Métrique | Valeur |
| :--- | ---: |
| **Total (vue d'ensemble)** | 8 |
| **Fait** | 4 |
| **Reste** | 4 |

## Sous-dossiers (détail + comptage local)

| Dossier | Total tâches (fichier) | Fait |
| :--- | ---: | ---: |
| [`entities/`](src/main/java/com/nutriflow/backend/entities/TACHES.md) | 9 | 7 |
| [`dtos/`](src/main/java/com/nutriflow/backend/dtos/TACHES.md) | 9 | 4 |
| [`repositories/`](src/main/java/com/nutriflow/backend/repositories/TACHES.md) | 6 | 2 |
| [`services/`](src/main/java/com/nutriflow/backend/services/TACHES.md) | 14 | 6 |
| [`controllers/`](src/main/java/com/nutriflow/backend/controllers/TACHES.md) | 11 | 4 |
| [`config/`](src/main/java/com/nutriflow/backend/config/TACHES.md) | 7 | 3 |
| [`exception/`](src/main/java/com/nutriflow/backend/exception/TACHES.md) | 4 | 2 |
| [`resources/`](src/main/resources/TACHES.md) | 6 | 3 |
| [`test`](src/test/java/TACHES.md) | 6 | 1 |

**Somme des sous-modules : 72** (recalculer si listes locales modifiées).

## Tâches (niveau projet)

- [x] Finaliser la stack : Spring Data JPA, validation, sécurité JWT, CORS avec le front.
- [x] Migrations Flyway complètes (`ddl-auto=validate` en prod) — script `V1__init_schema.sql` rédigé + Flyway activé.
- [ ] Couverture des parcours : CRUD profil ADN, journal alimentaire complet, shopping list.
- [ ] Client HTTP ou file d'attente pour appels OpenAI (IA recettes) avec timeouts et quotas.
- [x] Données nutritionnelles produits : dépendance [**Open Food Facts**](https://world.openfoodfacts.org/data) — entité `Food` (cache), repository et client HTTP à finaliser.
- [ ] Endpoint ou job pour génération de liste de courses agrégée (entrée : planning + recettes).
- [ ] Healthcheck et métriques (Actuator) pour déploiement.
- [ ] Harmoniser avec le dossier `src/` à la racine du repo (voir [`../src/TACHES.md`](../src/TACHES.md)).
