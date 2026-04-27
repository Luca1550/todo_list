# ToDo List App (v2 - SQLite)

Ce projet est un **projet scolaire**. Il s'agit d'une application de gestion de tâches (To-Do List) développée avec **Electron** (pour la partie bureau), **Angular** (pour l'interface utilisateur) et **SQLite** (pour la base de données).

## Fonctionnalités
- Ajouter des tâches
- Marquer des tâches comme terminées
- Supprimer des tâches
- Sauvegarde locale automatique via une base de données SQLite.

## Comment lancer l'application (Première utilisation)

### Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### Étapes d'installation et de lancement

1. **Ouvrez un terminal** dans le dossier `v2-sqlite`.

2. **Installez les dépendances du projet principal (Electron et SQLite)** :
   ```bash
   npm install
   ```

3. **Installez les dépendances et compilez l'application Angular** :
   ```bash
   cd renderer
   npm install
   npm run build
   cd ..
   ```

4. **Lancez l'application** :
   ```bash
   npm run start
   ```
   *(La commande `npm run start` s'occupera de compiler le code TypeScript (`tsc`) avant de lancer Electron).*

Une fenêtre Electron devrait s'ouvrir avec l'application fonctionnelle !
