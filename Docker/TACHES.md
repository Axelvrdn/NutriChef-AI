# Tâches — `Docker/`

> **Rôle :** conteneurisation ; aujourd’hui `docker-compose.yml` est à la racine — ce dossier peut accueillir Dockerfiles et overrides.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 5 |
| **Fait** | 0 |
| **Reste** | 5 |

## Tâches

- [ ] Ajouter un `Dockerfile` pour l’API Spring (multi-stage, profil prod).
- [ ] Ajouter un service `api` dans `docker-compose` (ou fichier `compose.override`) relié à Postgres.
- [ ] Variables d’environnement via `.env.example` (sans secrets) documentées.
- [ ] Option : image front (nginx ou Node) pour environnement de démo unifié.
- [ ] Volumes et stratégie de reset DB pour développement local.
