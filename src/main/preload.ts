// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
 
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    get(key:string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property:string, val:string) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  window: {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    restore: () => ipcRenderer.send('window-restore'),
    isMaximized: async () => await ipcRenderer.invoke('window-is-maximized'),
    getIconPath: () => ipcRenderer.invoke('get-icon-path'),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

ipcRenderer.on('window-maximized', (_event, isMaximized) => {
  window.dispatchEvent(new CustomEvent('windowMaximized', { detail: isMaximized }));
});

export type ElectronHandler = typeof electronHandler;
