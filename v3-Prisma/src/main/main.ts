import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../prisma/generated/client.js';

const dbPath = path.join(__dirname, '..', '..', 'todo.db');
const adapter = new PrismaBetterSqlite3({ url: 'file:' + dbPath });
const prisma = new PrismaClient({ adapter });

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
    win.loadFile(path.join(__dirname, '..','..', 'renderer', 'dist', 'renderer-app', 'browser', 'index.html'));
}

// 3. Gestionnaires IPC (Communication avec Angular)
ipcMain.handle("todo:getAll", async() => {
    return await prisma.task.findMany();
});

//ajouter une tache
ipcMain.handle('todo:add', async(_event, text: string) => {
    return await prisma.task.create({
        data:{
            text:text,
            completed:false
        }
    })
});

// mettre a jour une tache
ipcMain.handle('todo:update', async(_event, id: number, completed: boolean) => {
    try{
        await prisma.task.update({
            where:{id:id},
            data:{completed:completed}
        });
        return true;
    } catch(e){
        return false;
    }
});

// delete une tache
ipcMain.handle('todo:delete', async(_event, id: number) => {
    try{
        await prisma.task.delete({
            where:{id:id}
        });
        return true;
    } catch (e){
        return false;
    }
});

app.whenReady().then(createWindow);

//fermieture propre de prisma
app.on('before-quit', async() => {
    await prisma.$disconnect();
});
app.on('window-all-closed', () => {
    app.quit();
});
