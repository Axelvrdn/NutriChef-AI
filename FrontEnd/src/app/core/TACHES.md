# Tâches — `app/core/`

> **Rôle :** transversal technique : HTTP, auth, garde de routes, intercepteurs. Les sous-dossiers `services/`, `interceptors/` et `guards/` n’ont pas de fichier séparé : les tâches ci-dessous les couvrent.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 9 |
| **Fait** | 0 |
| **Reste** | 9 |

## Tâches

### `services/` (client API)

- [ ] Client HTTP configuré (base URL, headers JSON, gestion 401).
- [ ] Règle : **aucun** appel direct du navigateur vers l’API Open Food Facts — la nutrition produit transite par le backend NutriFlow ([réf. Data](https://world.openfoodfacts.org/data)).
- [ ] Rafraîchissement token ou redirection login si session expirée.

### `interceptors/` (ou middleware équivalent)

- [ ] Interceptor request : JWT ou cookies selon stratégie back-end.
- [ ] Interceptor response : normalisation des erreurs API.

### `guards/`

- [ ] Protection des routes privées (redirection si non connecté).
- [ ] Garde « onboarding complété » avant accès dashboard.

### Transversal `core/`

- [ ] Constantes (routes, clés stockage local).
- [ ] Utilitaires date / semaine ISO pour l’agenda.
