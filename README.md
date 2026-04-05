# NutriFlow : assistant culinaire intelligent et logistique

**NutriFlow** est une solution « full stack » visant à réduire la charge mentale liée à l'alimentation. Le projet combine **planification d'agenda**, **personnalisation (profil « ADN culinaire »)** et **logistique d'achat (Click & Collect)**.

---

## Stack technique

Le dépôt est un **monorepo** : API Java, client web en cours de montage, dossiers réservés pour Docker, mobile et intégrations externes.

| Zone | Technologie |
| :--- | :--- |
| **API** | [Spring Boot](https://spring.io/projects/spring-boot) **3.2.x**, **Java 21** — Web + Spring Data JPA ([`BackEnd/pom.xml`](BackEnd/pom.xml)) |
| **Base de données** | [PostgreSQL](https://www.postgresql.org/) via Docker — schéma géré par Hibernate (dev) / Flyway (prod) |
| **Front web** | [Tailwind CSS](https://tailwindcss.com/) v4 + PostCSS — framework UI (React / Next.js) à initialiser |
| **Extension navigateur** | [`Extensions/`](Extensions/) — Chromium (Chrome/Edge/Brave), sync multi-drive |
| **Intégrations** | [`integrations/`](integrations/) — Open Food Facts, Click & Collect, Playwright |
| **IA** | Appels OpenAI depuis le backend uniquement (HTTP, quotas, timeouts) |

> L'API à lancer est sous **`BackEnd/`**. Un `pom.xml` existe aussi à la racine mais n'est pas le module applicatif principal.

### Données nutritionnelles (Open Food Facts)

Les données de référence produits (kcal, macros pour 100 g) viennent de [**Open Food Facts**](https://world.openfoodfacts.org/data) (licence ODbL). Les appels transitent **uniquement par le backend** — jamais depuis le navigateur.

---

## Installation

### Prérequis

- **JDK 21** (`java -version` doit retourner 21.x)
- **Docker Desktop** ou **OrbStack**
- **Maven** (le wrapper `mvnw` est inclus dans le repo)
- **Node.js** (pour le front, une fois le framework ajouté)

### 1. Cloner le dépôt

```bash
git clone git@github.com:Axelvrdn/NutriChef-AI.git
cd NutriChef-AI
```

### 2. Démarrer la base de données

```bash
# Lance PostgreSQL + pgAdmin en arrière-plan
docker-compose up -d

# Vérifier que le conteneur est prêt (status = healthy)
docker ps
```

> pgAdmin est accessible sur [http://localhost:8081](http://localhost:8081)
> Email : `nael@nutri.com` — mot de passe : `admin`
> Connexion interne : host `db`, port `5432`, user `nael`, password `password123`

### 3. Lancer le backend (profil dev par défaut)

```bash
cd BackEnd
./mvnw spring-boot:run
```

Au premier démarrage sur une BDD vide, le `DataSeeder` se déclenche automatiquement et insère le jeu de données de développement (utilisateurs, recettes, planning, feed…).

---

## Commandes importantes

### Docker

| Commande | Description |
| :--- | :--- |
| `docker-compose up -d` | Démarre PostgreSQL + pgAdmin en arrière-plan |
| `docker-compose up -d db` | Démarre uniquement PostgreSQL (sans pgAdmin) |
| `docker-compose down` | Arrête les conteneurs (données conservées dans le volume) |
| `docker-compose down -v` | Arrête les conteneurs **et supprime les données** (BDD réinitialisée) |
| `docker ps` | Liste les conteneurs en cours d'exécution |
| `docker logs nutriflow-db` | Logs du conteneur PostgreSQL |

**Accès direct à la BDD en ligne de commande :**

```bash
docker exec -it nutriflow-db psql -U nael -d nutriflow_db
```

Commandes utiles une fois dans psql :

```sql
\dt                          -- lister toutes les tables
\d nom_de_la_table           -- décrire une table
SELECT COUNT(*) FROM users;  -- vérifier le seed
\q                           -- quitter
```

---

### Backend Spring Boot

| Commande | Description |
| :--- | :--- |
| `./mvnw spring-boot:run` | Lance l'API en profil **dev** (défaut) |
| `./mvnw spring-boot:run -Dspring-boot.run.profiles=prod` | Lance en profil **prod** (nécessite les variables d'env) |
| `./mvnw test` | Exécute les tests unitaires |
| `./mvnw clean package` | Compile et génère le JAR dans `target/` |
| `./mvnw clean package -DskipTests` | Compile sans lancer les tests |
| `./mvnw dependency:tree` | Affiche l'arbre des dépendances Maven |

**Switcher de profil via variable d'environnement (alternative) :**

```bash
SPRING_PROFILES_ACTIVE=prod ./mvnw spring-boot:run
```

---

### Profils dev / prod

Le fichier [`BackEnd/src/main/resources/application.properties`](BackEnd/src/main/resources/application.properties) définit le profil actif par défaut (`dev`). Chaque profil a son fichier dédié :

| Fichier | Profil | Comportement |
| :--- | :--- | :--- |
| `application-dev.properties` | `dev` | BDD locale Docker, SQL visible dans les logs, seed automatique, auth simplifiée |
| `application-prod.properties` | `prod` | BDD via variables d'env, `ddl-auto=validate`, pas de seed, auth stricte (JWT) |

**Changer le profil par défaut** dans `application.properties` :

```properties
spring.profiles.active=prod   # ← changer ici
```

---

### Jeu de données dev (DataSeeder)

Le seed se déclenche automatiquement au démarrage si la BDD est vide. Pour le **réinitialiser** :

```bash
# 1. Supprimer les données et relancer la BDD
docker-compose down -v && docker-compose up -d db

# 2. Relancer Spring Boot — le seed se relance automatiquement
cd BackEnd && ./mvnw spring-boot:run
```

Données insérées par le seed :

| Donnée | Détail |
| :--- | :--- |
| 3 utilisateurs | Elena Rose (Premium, expire dans 3 jours), Julianne Morel, Marcus Chen |
| 6 recettes | Quinoa Tahini, Velouté Courge, Linguine Roquette, etc. avec images et catégories |
| Planning semaine | Lun/Mar/Mer avec créneaux matin/midi/soir |
| 5 posts Découvrir | 2 posts mockup + 3 éditos curatés pour la section Inspirations |
| 4 collections | Rituels du Matin, Dîners Légers, Cuisine Solaire, Secrets d'Herboriste |
| 4 abonnements | Relations follower/followed entre les 3 utilisateurs |

---

### Production (docker-compose.prod.yml)

```bash
# Copier et remplir le fichier de secrets
cp .env.example .env
# Éditer .env avec les vraies valeurs (DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD)

# Lancer l'environnement de production
docker-compose -f docker-compose.prod.yml up -d
```

---

### Git — conventions du projet

Les branches suivent la convention `feat/`, `fix/`, `chore/` :

```bash
git checkout -b feat/nom-de-la-feature   # créer une branche
git push -u origin feat/nom-de-la-feature # pousser et suivre la remote
```

Branches existantes notables :

| Branche | Contenu |
| :--- | :--- |
| `main` | Code stable |
| `develop` | Intégration continue |
| `feat/bdd-domain-model-jpa-entities` | Schéma BDD complet + entités JPA + seed + JWT + endpoints REST |
| `feat/frontend-next-foundation` | Scaffolding Next.js, services, AuthContext, routes |

---

## Structure du projet

```
NutriChef-AI/
├── BackEnd/               API Spring Boot (Java 21)
│   └── src/main/
│       ├── java/.../
│       │   ├── config/        DataSeeder, SecurityConfig, profils
│       │   ├── entities/      Entités JPA (User, Recipe, WeeklyPlan, DiscoverPost, etc.)
│       │   ├── repositories/  Spring Data JPA
│       │   ├── services/      Auth, Me, Recipe, Planning, Discover, MealLog…
│       │   ├── controllers/   Auth, Me, Recipe, Planning, Discover, MealLog, PostInteraction
│       │   ├── dtos/          auth/, me/, recipes/, planning/, discover/
│       │   └── security/      JwtService, JwtAuthenticationFilter, CustomUserDetailsService
│       └── resources/
│           ├── application.properties          profil actif (dev par défaut)
│           ├── application-dev.properties      config dev
│           ├── application-prod.properties     config prod
│           └── db/migration/V1__init_schema.sql Flyway placeholder
├── FrontEnd/              Next.js App Router + TypeScript + Tailwind v4
│   └── src/
│       ├── app/(app)/     Tableau de bord, Recettes, Agenda, Découvrir, Paramètres
│       ├── app/(auth)/    Login, Register
│       ├── app/(onboarding)/
│       ├── context/       AuthContext
│       ├── services/      http, auth, recipes, planning, discover, user, mealLog…
│       └── types/         api.ts
├── Extensions/            Extension navigateur Chrome (Manifest V3)
├── integrations/          Click & Collect, Open Food Facts, Playwright
├── Docs/                  BDD-CONCEPTION.md, documentation technique
├── Docker/                Réservé (Dockerfiles futurs)
├── docker-compose.yml     Environnement dev (PostgreSQL + pgAdmin)
├── docker-compose.prod.yml Environnement prod (backend + DB conteneurisés)
└── .env.example           Template variables d'environnement prod
```

---

## Suivi des tâches

Des fichiers **`TACHES.md`** décrivent le travail par zone. L'index central est [`SUIVI-TACHES.md`](SUIVI-TACHES.md). La conception de la BDD est dans [`Docs/BDD-CONCEPTION.md`](Docs/BDD-CONCEPTION.md).

---

## Roadmap

### Phase 1 — fondations ✅ *complète*
- [x] Schéma BDD PostgreSQL (entités JPA, ERD complet — social, collections, abonnements, journal, logistique)
- [x] Jeu de données dev + profils dev/prod (`DataSeeder`, `application-dev/prod.properties`)
- [x] Sécurité JWT : Spring Security, `JwtAuthenticationFilter`, access + refresh tokens avec rotation
- [x] Premiers endpoints REST : `/auth/*`, `GET /api/me`, `GET/POST /api/recipes`, `GET /api/planning/current-week`, `GET /api/discover/feed`, `POST /api/meal-log`, interactions posts
- [x] Frontend : initialisation Next.js App Router + TypeScript + Tailwind v4, routes scaffoldées, `AuthContext`, services HTTP
- [x] Migrations Flyway complètes — `V1__init_schema.sql` contient le DDL initial complet, Flyway activé en `dev` et `prod`
- [x] Gestion d'erreurs centralisée (`@RestControllerAdvice`, format `ErrorResponse`)

### Phase 2 — agenda et recettes *(en cours)*
- [ ] Endpoints complets recettes : `PUT`, `DELETE`, `GET /{id}`, filtres et pagination
- [ ] Endpoints planning : ajout/suppression de créneaux, vue par semaine arbitraire
- [ ] PATCH `/api/me` : mise à jour profil ADN culinaire
- [ ] Intégration IA côté serveur (appel GPT-4o, prompts versionnés, garde-fous)
- [ ] Vues planning / calendrier côté frontend (feature `agenda/`)
- [ ] Vues recettes côté frontend (feature `recipes/`)

### Phase 3 — logistique et courses
- [ ] Génération liste de courses depuis le planning (service + endpoint)
- [ ] Proxy Open Food Facts : résolution EAN, cache TTL, endpoint `/api/nutrition/{barcode}`
- [ ] Extension navigateur drive sync (Manifest V3, multi-enseignes)
- [ ] Parcours scan code-barres côté front

### Phase 4 — robustesse
- [ ] Migrations Flyway : passer `ddl-auto=validate` en prod avec scripts versionnés
- [ ] PWA (manifest, service worker, mode hors-ligne lecture recettes)
- [ ] Notifications et rappels (push / email)
- [ ] Observabilité (Spring Boot Actuator, métriques, logs structurés)
- [ ] CI/CD : `mvn test` + lint front sur chaque PR, pipeline GitHub Actions

---

## Note légale — Click & Collect

Toute automatisation de navigateur (Playwright) sur un site marchand doit respecter les **conditions d'utilisation** de l'enseigne, limiter la fréquence des requêtes et traiter les identifiants comme des **secrets** (jamais dans le repo).
