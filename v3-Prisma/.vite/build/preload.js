let electron = require("electron");
//#region src/preload/preload.ts
electron.contextBridge.exposeInMainWorld("todoService", {
	getAll: () => electron.ipcRenderer.invoke("todo:getAll"),
	add: (text) => electron.ipcRenderer.invoke("todo:add", text),
	update: (id, completed) => electron.ipcRenderer.invoke("todo:update", id, completed),
	delete: (id) => electron.ipcRenderer.invoke("todo:delete", id)
});
//#endregion
