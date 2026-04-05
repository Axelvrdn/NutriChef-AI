# Tâches — `config/`

> **Rôle :** beans Spring, sécurité, CORS, clients HTTP, propriétés.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 7 |
| **Fait** | 3 |
| **Reste** | 4 |

## Tâches

- [x] Configuration **Security** : `SecurityFilterChain`, routes publiques vs protégées, `JwtAuthenticationFilter`, `BCryptPasswordEncoder`, `AuthenticationManager`.
- [x] **CORS** : origines front configurées par profil (`application-dev.properties` / `application-prod.properties`).
- [ ] Client **RestTemplate** / **WebClient** pour OpenAI avec timeout et gestion quotas.
- [ ] Client HTTP **Open Food Facts** : URL de base API (voir [Data](https://world.openfoodfacts.org/data)), timeouts, **`User-Agent`** / contact application (recommandé par la plateforme).
- [x] Profils Spring `dev` / `prod` + `DataSeeder` (`@Profile("dev")`, idempotent) et fichiers de config associés.
- [ ] Chiffrement ou stockage sécurisé des secrets en prod (Vault, Secret Manager ou équivalent — ne pas hardcoder).
- [ ] Configuration cache (optionnel) pour catalogues ou recettes populaires.
