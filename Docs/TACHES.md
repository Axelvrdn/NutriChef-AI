# Tâches — `Docs/`

> **Rôle :** documentation produit, architecture, API, guides contributeurs.

## Résumé

| Métrique | Valeur |
| :--- | ---: |
| **Total** | 7 |
| **Fait** | 2 |
| **Reste** | 5 |

## Tâches

- [ ] Rédiger une architecture cible (front ↔ API ↔ BDD ↔ intégrations Leclerc / OpenAI / **Open Food Facts** pour les données nutritionnelles produits — [page Data](https://world.openfoodfacts.org/data)).
- [x] Documenter le modèle de données : `BDD-CONCEPTION.md` complet avec ERD, toutes les tables (social, collections, abonnements, journal, logistique) et stratégie Flyway.
- [ ] Spécifier les endpoints REST (contrat OpenAPI / Swagger) une fois stabilisés.
- [x] Guide d'installation locale : `README.md` à la racine couvre DB, profils, commandes Docker et Maven.
- [ ] Charte UI / tokens couleur issus des maquettes (fond `#F9F8F3`, vert `#3D5245`, etc.).
- [ ] Politique de sécurité et confidentialité (données santé, credentials Drive).
- [ ] Fiche intégration **Open Food Facts** : flux proxy backend, champs nutriments utilisés, licence ODbL / attribution, distinction **API live** vs **exports** pour gros volumes ([référence](https://world.openfoodfacts.org/data)).
