# Tâches — `exception/`

> **Rôle :** exceptions métier, handlers globaux, messages utilisables par le front.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 4 |
| **Fait** | 0 |
| **Reste** | 4 |

## Tâches

- [ ] Hiérarchie d’exceptions métier (ex. `RecipeNotFound`, `PlanningConflict`).
- [ ] `@ControllerAdvice` : mapping vers HTTP 4xx/5xx cohérent.
- [ ] Pas d’exposition de stack trace en production.
- [ ] Codes d’erreur stables pour le client (enum ou chaînes documentées).
