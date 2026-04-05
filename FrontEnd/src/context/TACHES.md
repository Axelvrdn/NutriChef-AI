# Tâches — `context/`

> **Rôle :** état global léger (thème, utilisateur, préférences UI) si pas de Zustand/Redux.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 4 |
| **Fait** | 1 |
| **Reste** | 3 |

## Tâches

- [x] `AuthContext` / `AuthProvider` : session utilisateur, tokens JWT, profil minimal, hook `useAuth`.
- [ ] `UIProvider` : état sidebar repliée/ouverte, modals globaux (si besoin).
- [ ] Éviter le sur-contexte : préférer données serveur cache (React Query / SWR) quand possible — à évaluer lors de l'implémentation des features.
- [ ] Tests de rendu des providers (smoke) avec React Testing Library.
