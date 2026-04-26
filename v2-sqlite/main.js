const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const saveFile = path.join(__dirname, 'saveFile.json');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 650,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    // modifier en dist/ pour que electron lise angular apres le ng build
    win.loadFile('renderer/dist/renderer-app/browser/index.html');
}

ipcMain.handle("todo:getAll", () => {
    let save = [];
    try {
        if (fs.existsSync(saveFile)) {
            const fileData = fs.readFileSync(saveFile, "utf-8");
            // Correction : on parse les données du fichier et non son chemin
            save = JSON.parse(fileData);
        }
    } catch (e) {
        console.error("Erreur lors de la lecture des sauvegardes : ", e);
    }
    return save;
});


ipcMain.handle("todo:add", (event, text) => {
    let save = [];

    try {
        if (fs.existsSync(saveFile)) {
            const fileData = fs.readFileSync(saveFile, 'utf-8');
            save = JSON.parse(fileData);
        }
    } catch (e) {
        console.error("Erreur lors de la lecture des sauvegardes :", e);
    }

    // On crée un objet tâche plus complet
    const newTask = {
        id: Date.now(), // Un identifiant unique
        text: text,
        completed: false // Par défaut, la tâche n'est pas terminée
    };

    save.push(newTask);

    try {
        // Correction : on sauvegarde le tableau complet au format JSON
        fs.writeFileSync(saveFile, JSON.stringify(save, null, 2));
    } catch (e) {
        console.error("Erreur lors de la sauvegarde :", e);
    }

    return newTask;
});


ipcMain.handle("todo:update", (event, id, completed) => {
    let save = [];

    // 1. Lire le fichier existant
    try {
        if (fs.existsSync(saveFile)) {
            const fileData = fs.readFileSync(saveFile, 'utf-8');
            save = JSON.parse(fileData);
        }
    } catch (e) {
        console.error("Erreur lors de la lecture des sauvegardes :", e);
        return false;
    }

    // 2. Chercher la tâche par son ID
    const taskIndex = save.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
        // 3. Mettre à jour l'état de la tâche
        save[taskIndex].completed = completed;

        // 4. Sauvegarder les modifications
        try {
            fs.writeFileSync(saveFile, JSON.stringify(save, null, 2));
            return true; // Succès
        } catch (e) {
            console.error("Erreur lors de la sauvegarde :", e);
            return false; // Échec
        }
    }

    return false; // Tâche non trouvée
});


// Handler pour supprimer une tâche
ipcMain.handle("todo:delete", (event, id) => {
    let save = [];
    try {
        if (fs.existsSync(saveFile)) {
            const fileData = fs.readFileSync(saveFile, 'utf-8');
            save = JSON.parse(fileData);
        }
    } catch (e) {
        console.error("Erreur lors de la lecture des sauvegardes :", e);
        return false;
    }

    // On utilise filter pour conserver toutes les tâches sauf celle avec l'id
    const newSave = save.filter(task => task.id !== id);

    try {
        fs.writeFileSync(saveFile, JSON.stringify(newSave, null, 2));
        return true; // Succès
    } catch (e) {
        console.error("Erreur lors de la sauvegarde :", e);
        return false; // Échec
    }
});



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});