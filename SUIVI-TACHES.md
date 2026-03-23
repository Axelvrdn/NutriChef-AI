# Suivi global des tâches — NutriFlow

Ce fichier est l’**index** des travaux par zone du dépôt. Le détail vivant (cases à cocher, notes) se trouve dans chaque **`TACHES.md`** du dossier concerné.

## Comment tenir ce suivi à jour

1. Lorsqu’une tâche est terminée : coche `- [x]` dans le `TACHES.md` du dossier.
2. Mettez à jour le **tableau Résumé** en tête de ce même fichier (`Total` / `Fait` / `Reste`).
3. Optionnel : recopiez ici les totaux agrégés (section ci-dessous) pour une vue d’ensemble en un coup d’œil.

## Totaux (mars 2026)

Comptage exact des lignes `- [ ]` / `- [x]` dans tous les `TACHES.md` : **~240** (recalculer avec un script après modification des listes — chiffre indicatif post-ajouts Open Food Facts).

| Zone | Tâches |
| :--- | ---: |
| Racine `src/`, `Docs/`, `Docker/`, `integrations/`, `Mobile/` | ~32 |
| `BackEnd/` (racine + sous-packages) | ~73 |
| `FrontEnd/` (racine + `src/` et sous-dossiers) | ~135 |
| **Total** | **~240** |

## Vue d’ensemble (à recalculer depuis les sous-fichiers)

| Zone | Fichier | Tâches (total) | Fait | Reste |
| :--- | :--- | ---: | ---: | ---: |
| Racine `src/` (legacy) | [`src/TACHES.md`](src/TACHES.md) | 4 | 0 | 4 |
| Documentation | [`Docs/TACHES.md`](Docs/TACHES.md) | 6 | 0 | 6 |
| Docker | [`Docker/TACHES.md`](Docker/TACHES.md) | 5 | 0 | 5 |
| Intégrations (courses, IA externe) | [`integrations/TACHES.md`](integrations/TACHES.md) | 8 | 0 | 8 |
| Mobile | [`Mobile/TACHES.md`](Mobile/TACHES.md) | 5 | 0 | 5 |
| Back-end (Spring) | [`BackEnd/TACHES.md`](BackEnd/TACHES.md) | — | — | — |
| Front-end | [`FrontEnd/TACHES.md`](FrontEnd/TACHES.md) | — | — | — |

Les lignes « — » pour BackEnd / FrontEnd : voir les tableaux récapitulatifs dans [`BackEnd/TACHES.md`](BackEnd/TACHES.md) et [`FrontEnd/TACHES.md`](FrontEnd/TACHES.md).

## Carte des `TACHES.md`

### Back-end (`BackEnd/`)

| Dossier | Fichier |
| :--- | :--- |
| Projet | [`BackEnd/TACHES.md`](BackEnd/TACHES.md) |
| Entités | [`BackEnd/src/main/java/com/nutriflow/backend/entities/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/entities/TACHES.md) |
| DTOs | [`BackEnd/src/main/java/com/nutriflow/backend/dtos/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/dtos/TACHES.md) |
| Repositories | [`BackEnd/src/main/java/com/nutriflow/backend/repositories/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/repositories/TACHES.md) |
| Services | [`BackEnd/src/main/java/com/nutriflow/backend/services/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/services/TACHES.md) |
| Controllers | [`BackEnd/src/main/java/com/nutriflow/backend/controllers/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/controllers/TACHES.md) |
| Config | [`BackEnd/src/main/java/com/nutriflow/backend/config/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/config/TACHES.md) |
| Exceptions | [`BackEnd/src/main/java/com/nutriflow/backend/exception/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/exception/TACHES.md) |
| Ressources | [`BackEnd/src/main/resources/TACHES.md`](BackEnd/src/main/resources/TACHES.md) |
| Tests | [`BackEnd/src/test/java/TACHES.md`](BackEnd/src/test/java/TACHES.md) |

### Front-end (`FrontEnd/src/`)

| Dossier | Fichier |
| :--- | :--- |
| Projet FrontEnd | [`FrontEnd/TACHES.md`](FrontEnd/TACHES.md) |
| Sources | [`FrontEnd/src/TACHES.md`](FrontEnd/src/TACHES.md) |
| `app` | [`FrontEnd/src/app/TACHES.md`](FrontEnd/src/app/TACHES.md) |
| `app/core` | [`FrontEnd/src/app/core/TACHES.md`](FrontEnd/src/app/core/TACHES.md) |
| `app/models` | [`FrontEnd/src/app/models/TACHES.md`](FrontEnd/src/app/models/TACHES.md) |
| `app/shared` | [`FrontEnd/src/app/shared/TACHES.md`](FrontEnd/src/app/shared/TACHES.md) |
| `app/shared/components` | [`FrontEnd/src/app/shared/components/TACHES.md`](FrontEnd/src/app/shared/components/TACHES.md) |
| Features | voir [`FrontEnd/src/app/features/TACHES.md`](FrontEnd/src/app/features/TACHES.md) |
| Composants globaux | [`FrontEnd/src/components/TACHES.md`](FrontEnd/src/components/TACHES.md) |
| Services front | [`FrontEnd/src/services/TACHES.md`](FrontEnd/src/services/TACHES.md) |
| Hooks | [`FrontEnd/src/hooks/TACHES.md`](FrontEnd/src/hooks/TACHES.md) |
| Contexte | [`FrontEnd/src/context/TACHES.md`](FrontEnd/src/context/TACHES.md) |
| Assets | [`FrontEnd/src/assets/TACHES.md`](FrontEnd/src/assets/TACHES.md) |
| Pages (legacy) | [`FrontEnd/src/pages/TACHES.md`](FrontEnd/src/pages/TACHES.md) |

---

*Produit : NutriFlow — ADN culinaire, agenda hybride, IA recettes, Click & Collect, PWA ; données nutritionnelles produits via [Open Food Facts](https://world.openfoodfacts.org/data).*
