import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(__dirname, '..', 'todo.db');
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER DEFAULT 0
    )
`);

function createWindow(): void {
    const win = new BrowserWindow({
        width: 800,
        height: 650,
        webPreferences: {
            // .js car une fois compilé, preload sera un fichier JS à côté de main.js
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    // Chemin vers l'application Angular compilée
    win.loadFile(path.join(__dirname, '..', 'renderer', 'dist', 'renderer-app', 'browser', 'index.html'));
}

// 3. Gestionnaires IPC (Communication avec Angular)
ipcMain.handle("todo:getAll", () => {
    const stmt = db.prepare('SELECT * FROM tasks');
    const tasks = stmt.all() as any[];
    // SQLite stocke les booléens sous forme de 0 ou 1.
    // On les convertit en true/false pour Angular.
    return tasks.map(t => ({
        ...t,
        completed: t.completed === 1
    }));
});

//ajouter une tache
ipcMain.handle('todo:add', (_event, text: string) => {
    const stmt = db.prepare('INSERT INTO tasks (text,completed) VALUES (?,0)');
    const info = stmt.run(text);

    return {
        id: info.lastInsertRowid,
        text: text,
        completed: false
    };
});

// mettre a jour une tache
ipcMain.handle('todo:update', (_event, id: number, completed: boolean) => {
    const stmt = db.prepare('UPDATE tasks SET completed = ? WHERE id = ?');
    const info = stmt.run(completed ? 1 : 0, id);
    return info.changes > 0;
});

// delete une tache
ipcMain.handle('todo:delete', (_event, id: number) => {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    const info = stmt.run(id);

    return info.changes > 0;
});

app.whenReady().then(createWindow);

//fermieture propre de la db
app.on('before-quit', () => {
    db.close();
});
app.on('window-all-closed', () => {
    app.quit();
});
