export type Channels = 'ipc-example';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage: (channel: Channels, ...args: unknown[]) => void;
        on: (channel: Channels, func: (...args: unknown[]) => void) => () => void;
        once: (channel: Channels, func: (...args: unknown[]) => void) => void;
      };
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
      };
      window:{
        minimize: () => void;
        maximize: () => void;
        close: () => void;
        restore: () => void;
        isMaximized: () => Promise<boolean>;
        getIconPath: () => void;
      };
    };
  }
}

export {};
