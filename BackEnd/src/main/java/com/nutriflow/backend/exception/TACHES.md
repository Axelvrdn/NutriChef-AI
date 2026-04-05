# Tâches — `exception/`

> **Rôle :** exceptions métier, handlers globaux, messages utilisables par le front.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 4 |
| **Fait** | 2 |
| **Reste** | 2 |

## Tâches

- [ ] Hiérarchie d’exceptions métier (ex. `RecipeNotFound`, `PlanningConflict`).
- [x] `@ControllerAdvice` : mapping HTTP centralisé via `GlobalExceptionHandler` (`404`, `409`, `400`, `403`, `500`).
- [x] Pas d’exposition de stack trace en production (message générique sur `500`, payload stable `ErrorResponse`).
- [ ] Codes d’erreur stables pour le client (enum ou chaînes documentées).
