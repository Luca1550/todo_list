# ToDo List App (v3 - Prisma & Vite)

Ce projet est un **projet scolaire**. Il s'agit d'une application de gestion de tâches (To-Do List) développée avec **Electron Forge**, **Vite**, **Angular** (pour l'interface utilisateur), et **Prisma ORM** (avec SQLite pour la base de données).

## Fonctionnalités
- Ajouter des tâches
- Marquer des tâches comme terminées
- Supprimer des tâches
- Sauvegarde locale automatique via une base de données SQLite gérée par l'ORM Prisma.

## Comment lancer l'application (Première utilisation)

### Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### Étapes d'installation et de lancement

1. **Ouvrez un terminal** dans le dossier `v3-Prisma`.

2. **Installez les dépendances du projet principal** :
   ```bash
   npm install
   ```

3. **Générez le client Prisma et initialisez la base de données** :
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Installez les dépendances et compilez l'application Angular** :
   ```bash
   npm run build:angular
   ```
   *(Cette commande est un raccourci défini dans le `package.json` qui installe et build le dossier `renderer`)*.

5. **Lancez l'application** :
   ```bash
   npm run start
   ```

Une fenêtre Electron devrait s'ouvrir avec l'application fonctionnelle !

### Commandes supplémentaires
- `npm run package` : Pour packager l'application pour distribution.
- `npm run make` : Pour créer des installateurs pour votre système d'exploitation.
- `npm run prisma:studio` : Pour ouvrir Prisma Studio et visualiser la base de données.
