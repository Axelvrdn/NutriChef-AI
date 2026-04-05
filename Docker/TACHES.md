# Tâches — `Docker/`

> **Rôle :** conteneurisation ; `docker-compose.yml` et `docker-compose.prod.yml` sont à la racine — ce dossier peut accueillir Dockerfiles et overrides.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 5 |
| **Fait** | 3 |
| **Reste** | 2 |

## Tâches

- [ ] Ajouter un `Dockerfile` pour l'API Spring (multi-stage : build Maven → image JRE slim, profil prod).
- [x] Service `backend` dans `docker-compose.prod.yml` avec `SPRING_PROFILES_ACTIVE=prod` et variables d'env DB / JWT.
- [x] Variables d'environnement via `.env.example` (sans secrets) documentées et `.env` ignoré par `.gitignore`.
- [ ] Option : image front (Node/nginx) pour environnement de démo unifié.
- [x] Volumes et stratégie de reset DB documentés dans README (`docker-compose down -v && docker-compose up -d db`).
