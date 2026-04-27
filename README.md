# Projet ToDo List - 3 Versions

Ce dépôt contient trois versions d'un projet de To-Do List développé avec **Electron** et **Angular**. Chaque version utilise une méthode de stockage des données différente pour illustrer plusieurs approches de persistance locale :

- **[v1-Json](./v1-Json/)** : Utilise un simple fichier JSON (`saveFile.json`) pour la persistance des données.
- **[v2-sqlite](./v2-sqlite/)** : Utilise la bibliothèque `better-sqlite3` pour stocker les données dans une base de données locale SQLite.
- **[v3-Prisma](./v3-Prisma/)** : Utilise **Prisma ORM** (avec SQLite) et **Vite** via Electron Forge pour une architecture plus robuste et moderne.

## Instructions pour chaque projet

Chaque dossier contient son propre projet indépendant. **Veuillez vous référer au fichier `README.md` situé dans le dossier de chaque version** pour obtenir les instructions d'installation et de lancement spécifiques :

- 📖 [Instructions pour la v1 (JSON)](./v1-Json/README.md)
- 📖 [Instructions pour la v2 (SQLite)](./v2-sqlite/README.md)
- 📖 [Instructions pour la v3 (Prisma)](./v3-Prisma/README.md)
