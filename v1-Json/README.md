# ToDo List App (v1 - JSON)

Ce projet est un **projet scolaire**. Il s'agit d'une application de gestion de tâches (To-Do List) développée avec **Electron** (pour la partie bureau) et **Angular** (pour l'interface utilisateur).

## Fonctionnalités
- Ajouter des tâches
- Marquer des tâches comme terminées
- Supprimer des tâches
- Sauvegarde locale automatique (`saveFile.json` à la racine du sous-projet)

## Comment lancer l'application (Première utilisation)

### Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### Étapes d'installation et de lancement

1. **Ouvrez un terminal** dans le dossier `v1-Json`.

2. **Installez les dépendances du projet principal (Electron)** :
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

Une fenêtre Electron devrait s'ouvrir avec l'application fonctionnelle !
