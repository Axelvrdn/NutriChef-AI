# Tâches — `resources/`

> **Rôle :** `application.properties` / `application.yml`, migrations, messages.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 3 |
| **Reste** | 3 |

## Tâches

- [x] Externaliser toute configuration sensible via variables d'environnement (`application-prod.properties` : DB, JWT secret, CORS via env vars).
- [ ] Propriétés `openfoodfacts.*` (URL de base API produit, identifiant d'app pour `User-Agent`) — réf. [Open Food Facts Data](https://world.openfoodfacts.org/data).
- [x] Scripts Flyway/Liquibase : schéma initial NutriFlow complet dans `db/migration/V1__init_schema.sql` (22 tables, contraintes et index).
- [x] Jeux de données de démo : `DataSeeder.java` (`@Profile("dev")`) insère 3 users, 6 recettes, planning, 5 posts, 4 collections, 4 follows.
- [ ] Fichiers `messages_fr.properties` si messages d'erreur i18n.
- [ ] `logback-spring.xml` ou équivalent : niveaux de log par package, format JSON pour prod.
