# Suivi global des tâches — NutriFlow

Ce fichier est l'**index** des travaux par zone du dépôt. Le détail vivant (cases à cocher, notes) se trouve dans chaque **`TACHES.md`** du dossier concerné.

## Comment tenir ce suivi à jour

1. Lorsqu'une tâche est terminée : coche `- [x]` dans le `TACHES.md` du dossier.
2. Mettez à jour le **tableau Résumé** en tête de ce même fichier (`Total` / `Fait` / `Reste`).
3. Recopiez ici les totaux agrégés (section ci-dessous) pour une vue d'ensemble en un coup d'œil.

## Totaux (mars 2026 — mis à jour)

| Zone | Total | Fait | Reste |
| :--- | ---: | ---: | ---: |
| Racine `src/`, `Docs/`, `Docker/`, `integrations/`, `Mobile/`, `Extensions/` | 48 | 5 | 43 |
| `BackEnd/` (racine + sous-packages) | 72 | 33 | 39 |
| `FrontEnd/` (racine + `src/` et sous-dossiers) | 135 | 9 | 126 |
| **Total** | **255** | **47** | **208** |

> Les chiffres sont indicatifs ; recalculer via `grep -r '^\- \[x\]' */TACHES.md` après modification.

## Vue d'ensemble par zone

| Zone | Fichier | Total | Fait | Reste |
| :--- | :--- | ---: | ---: | ---: |
| Documentation | [`Docs/TACHES.md`](Docs/TACHES.md) | 7 | 2 | 5 |
| Docker | [`Docker/TACHES.md`](Docker/TACHES.md) | 5 | 3 | 2 |
| Intégrations (courses, IA externe) | [`integrations/TACHES.md`](integrations/TACHES.md) | 12 | 0 | 12 |
| Mobile | [`Mobile/TACHES.md`](Mobile/TACHES.md) | 6 | 0 | 6 |
| Extension navigateur | [`Extensions/TACHES.md`](Extensions/TACHES.md) | 12 | 0 | 12 |
| Back-end (Spring) | [`BackEnd/TACHES.md`](BackEnd/TACHES.md) | — | — | — |
| Front-end | [`FrontEnd/TACHES.md`](FrontEnd/TACHES.md) | — | — | — |

Les lignes « — » pour BackEnd / FrontEnd : voir les tableaux récapitulatifs dans [`BackEnd/TACHES.md`](BackEnd/TACHES.md) et [`FrontEnd/TACHES.md`](FrontEnd/TACHES.md).

## Vue d'ensemble — Back-end

| Dossier | Fichier | Total | Fait | Reste |
| :--- | :--- | ---: | ---: | ---: |
| Projet | [`BackEnd/TACHES.md`](BackEnd/TACHES.md) | 8 | 4 | 4 |
| Entités | [`BackEnd/.../entities/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/entities/TACHES.md) | 9 | 7 | 2 |
| DTOs | [`BackEnd/.../dtos/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/dtos/TACHES.md) | 9 | 4 | 5 |
| Repositories | [`BackEnd/.../repositories/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/repositories/TACHES.md) | 6 | 2 | 4 |
| Services | [`BackEnd/.../services/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/services/TACHES.md) | 14 | 6 | 8 |
| Controllers | [`BackEnd/.../controllers/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/controllers/TACHES.md) | 11 | 4 | 7 |
| Config | [`BackEnd/.../config/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/config/TACHES.md) | 7 | 3 | 4 |
| Exceptions | [`BackEnd/.../exception/TACHES.md`](BackEnd/src/main/java/com/nutriflow/backend/exception/TACHES.md) | 4 | 2 | 2 |
| Ressources | [`BackEnd/.../resources/TACHES.md`](BackEnd/src/main/resources/TACHES.md) | 6 | 3 | 3 |
| Tests | [`BackEnd/src/test/java/TACHES.md`](BackEnd/src/test/java/TACHES.md) | 6 | 1 | 5 |
| **Sous-total** | | **80** | **36** | **44** |

## Vue d'ensemble — Front-end

| Zone | Fichier | Total | Fait | Reste |
| :--- | :--- | ---: | ---: | ---: |
| Projet FrontEnd | [`FrontEnd/TACHES.md`](FrontEnd/TACHES.md) | 8 | 3 | 5 |
| Services | [`FrontEnd/src/services/TACHES.md`](FrontEnd/src/services/TACHES.md) | 7 | 4 | 3 |
| Context | [`FrontEnd/src/context/TACHES.md`](FrontEnd/src/context/TACHES.md) | 4 | 1 | 3 |
| Hooks | [`FrontEnd/src/hooks/TACHES.md`](FrontEnd/src/hooks/TACHES.md) | 5 | 1 | 4 |
| App (routes) | [`FrontEnd/src/app/TACHES.md`](FrontEnd/src/app/TACHES.md) | 5 | 3 | 2 |
| Features (toutes) | voir sous-dossiers | 55 | 0 | 55 |
| Composants globaux | [`FrontEnd/src/components/TACHES.md`](FrontEnd/src/components/TACHES.md) | 8 | 0 | 8 |
| autres sous-dossiers | modèles, shared, assets, pages | 43 | 0 | 43 |
| **Sous-total** | | **135** | **12** | **123** |

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

### Extensions navigateur (`Extensions/`)

| Dossier | Fichier |
| :--- | :--- |
| Extension Drive Sync | [`Extensions/TACHES.md`](Extensions/TACHES.md) |

---

*Produit : NutriFlow — ADN culinaire, agenda hybride, IA recettes, Click & Collect, PWA ; données nutritionnelles produits via [Open Food Facts](https://world.openfoodfacts.org/data).*
