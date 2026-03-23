# Tâches — `resources/`

> **Rôle :** `application.properties` / `application.yml`, migrations, messages.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 6 |
| **Fait** | 0 |
| **Reste** | 6 |

## Tâches

- [ ] Externaliser toute configuration sensible via variables d’environnement.
- [ ] Propriétés `openfoodfacts.*` (URL de base de l’API produit, identifiant d’app pour `User-Agent`) — réf. [Open Food Facts Data](https://world.openfoodfacts.org/data).
- [ ] Scripts Flyway/Liquibase : schéma initial NutriFlow.
- [ ] Jeux de données de démo (optionnel) pour développement.
- [ ] Fichiers `messages_fr.properties` si messages d’erreur i18n.
- [ ] `logback-spring.xml` ou équivalent : niveaux de log par package.
