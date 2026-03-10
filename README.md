# 🥗 NutriFlow : L'Assistant Culinaire Intelligent & Logistique

**NutriFlow** est une solution web "Full-Stack" moderne conçue pour éliminer la charge mentale liée à l'alimentation. Contrairement aux applications de recettes classiques, NutriFlow fusionne la **planification d'agenda**, l'**intelligence artificielle personnalisée** et la **logistique d'achat (Click & Collect)**.

---

## ✨ Points Forts du Projet

* **🧬 Profil ADN Culinaire :** Adapte les recettes à ton niveau réel (Débutant à Chef), tes allergies et tes objectifs (Kcal, Protéines, Lipides, Glucides).
* **📅 Agenda Hybride :** Planifie ta semaine en distinguant les repas à la **Maison**, au **Resto**, ou **À l'extérieur** pour ne jamais acheter d'ingrédients inutiles.
* **🤖 IA Recipe Engine (GPT-4o) :** Réécrit les instructions de cuisson selon ton matériel et ton temps disponible (ex: transforme une recette de 45min en version express 15min).
* **🛒 Click & Collect Sync :** Connecte ta liste de courses directement aux enseignes (Leclerc Drive, etc.) via un moteur de matching de produits.
* **📱 Expérience PWA :** Interface minimaliste, fluide et installable sur mobile comme une application native.

---

## 🛠 Tech Stack (Architecture Monorepo)

| Secteur | Technologie |
| :--- | :--- |
| **Framework** | [Next.js 15+](https://nextjs.org/) (App Router & Server Actions) |
| **Langage** | TypeScript (Type-safe du front au back) |
| **Design** | Tailwind CSS + Framer Motion (Animations fluides) |
| **Backend/Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Realtime) |
| **IA** | OpenAI API / LangChain |
| **Automation** | Playwright (pour la synchronisation Click & Collect) |
| **Déploiement** | Vercel |

---

## 🗄️ Structure de la Base de Données

```mermaid
erDiagram
    USER ||--o| PROFILE : has
    PROFILE ||--o| AGENDA : fills
    AGENDA ||--o| RECIPE : contains
    RECIPE ||--o| INGREDIENT : uses
---

## 🗺️ Roadmap de Développement

### Phase 1 : Fondations & Profilage (MVP)
- [ ] Setup Next.js + Tailwind + Supabase Auth.
- [ ] Création de l'onboarding "ADN Culinaire" (Quiz de niveau et objectifs).
- [ ] Dashboard minimaliste affichant les macros quotidiennes.

### Phase 2 : L'Agenda Intelligent
- [ ] Vue calendrier hebdomadaire avec gestion des repas "Hors-foyer".
- [ ] Moteur de suggestion de recettes basé sur le temps disponible et les macros.
- [ ] Intégration de l'IA pour la modification dynamique des recettes.

### Phase 3 : Logistique & Courses
- [ ] Générateur de liste de courses intelligente (agrégation des ingrédients).
- [ ] Module de matching avec les produits de grande distribution (EAN/Open Food Facts).
- [ ] Script de synchronisation avec le panier Leclerc Drive (Playwright).

### Phase 4 : Optimisation & PWA
- [ ] Mode Offline (PWA) pour consultation en magasin.
- [ ] Notifications de rappel pour la préparation en amont (Batch Cooking).

---

## 🚀 Installation Locale

1. **Cloner le projet**
```bash
git clone [https://github.com/votre-username/nutriflow.git](https://github.com/votre-username/nutriflow.git)
cd nutriflow


### 2. Installer les dépendances

```bash
npm install

```

### 3. Configurer les variables d'environnement (`.env.local`)

Créez un fichier `.env.local` à la racine et ajoutez vos clés :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
OPENAI_API_KEY=votre_cle_openai
LECLERC_USER=votre_email_drive
LECLERC_PASS=votre_password_drive

```

### 4. Lancer le serveur de développement

```bash
npm run dev

```

---

## 🎨 Principes de Design

* **Minimalisme :** Utilisation massive d'espaces blancs et de typographies claires (Inter/Geist).
* **Fluidité :** Transitions douces entre l'agenda et la fiche recette avec Framer Motion.
* **Accessibilité :** Contrastes élevés pour une lecture facile en cuisine, boutons larges pour le mobile.

---

## ⚠️ Note sur le Click & Collect

L'intégration Leclerc utilise une approche par automatisation de navigateur (Headless Browser via Playwright). Veillez à respecter les conditions d'utilisation de l'enseigne lors du déploiement et à ne pas abuser des requêtes.

```
