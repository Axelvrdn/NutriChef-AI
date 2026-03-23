# Tâches — `context/`

> **Rôle :** état global léger (thème, utilisateur, préférences UI) si pas de Zustand/Redux.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 4 |
| **Fait** | 0 |
| **Reste** | 4 |

## Tâches

- [ ] `AuthProvider` : session et profil minimal.
- [ ] `UIProvider` : sidebar repliée, modals globaux (si besoin).
- [ ] Éviter le sur-contexte : préférer données serveur cache (React Query) quand possible.
- [ ] Tests de rendu des providers (smoke).
