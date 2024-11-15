import { app } from 'electron';
import { createMainWindow } from './window';
import {setupUpdater} from './updater';
import { setupIpcHandlers } from './handlers';

let mainWindow: Electron.BrowserWindow | null = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    mainWindow = createMainWindow();
    setupIpcHandlers(mainWindow);
    setupUpdater();

    app.on('activate', () => {
      if (mainWindow === null) mainWindow = createMainWindow();
    });
  })
  .catch(console.log);
