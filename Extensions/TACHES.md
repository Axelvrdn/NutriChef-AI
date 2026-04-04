# Tâches — `Extensions/` (Browser Extension Drive Sync)

> **Rôle :** extension navigateur (Chrome en priorité, architecture compatible Edge/Brave) synchronisée avec NutriFlow pour automatiser le remplissage du panier drive sur plusieurs enseignes.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 12 |
| **Fait** | 0 |
| **Reste** | 12 |

## Tâches

- [ ] Créer le squelette extension **Manifest V3** (`service_worker`, `content_scripts`, permissions minimales).
- [ ] Définir le protocole de sync avec l’API NutriFlow (auth, récupération liste, statut d’exécution, retries).
- [ ] Concevoir une architecture **adaptateurs multi-drive** (`DriveConnector` + implémentations par enseigne).
- [ ] Ajouter un connecteur initial (MVP) puis un second connecteur pour valider le modèle multi-enseignes.
- [ ] Implémenter un mapping stable entre items NutriFlow et champs UI des sites drive (quantité, unité, substitution).
- [ ] Prévoir un mode **semi-automatique** (validation utilisateur) pour limiter les effets de bord d’automatisation.
- [ ] Gestion d’erreurs robuste : login expiré, DOM modifié, produit introuvable, blocage anti-bot.
- [ ] Journalisation côté extension + corrélation avec logs backend (id de sync).
- [ ] Écran d’options extension : activation par enseigne, compte connecté, mode dry-run.
- [ ] Sécurité : aucun secret persistant en clair, tokens courts, permissions strictes, revue RGPD.
- [ ] Packaging et publication Chrome Web Store (process, assets, versioning).
- [ ] Stratégie de portage vers autres navigateurs Chromium et préparation Firefox (si besoin produit).
