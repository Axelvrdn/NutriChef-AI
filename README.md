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
