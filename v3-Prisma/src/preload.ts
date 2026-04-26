import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('todoService', {
    getAll: () => ipcRenderer.invoke('todo:getAll'),
    add: (text: string) => ipcRenderer.invoke('todo:add', text),
    update: (id: number, completed: boolean) => ipcRenderer.invoke('todo:update', id, completed),
    delete: (id: number) => ipcRenderer.invoke('todo:delete', id)
});
