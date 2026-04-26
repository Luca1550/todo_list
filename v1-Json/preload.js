const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('todoService',{
    getAll: () => ipcRenderer.invoke('todo:getAll'),
    add: (text) => ipcRenderer.invoke('todo:add', text),
    update: (id, completed) => ipcRenderer.invoke('todo:update', id, completed),
    delete: (id) => ipcRenderer.invoke('todo:delete', id)
})