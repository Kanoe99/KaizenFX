import { ipcMain } from 'electron';
import {store} from './store';


const setupIpcHandlers = (mainWindow: Electron.BrowserWindow | null) => {
  ipcMain.on('ipc-example', (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('electron-store-get', (event, key) => {
    event.returnValue = store.get(key);
  });

  ipcMain.on('electron-store-set', (event, key, val) => {
    store.set(key, val);
  });

  ipcMain.handle('window-is-maximized', () => mainWindow?.isMaximized() || false);

  ipcMain.on('window-minimize', () => mainWindow?.minimize());
  ipcMain.on('window-maximize', () => mainWindow?.maximize());
  ipcMain.on('window-close', () => mainWindow?.close());
  ipcMain.on('window-restore', () => mainWindow?.restore());
}

export {setupIpcHandlers};