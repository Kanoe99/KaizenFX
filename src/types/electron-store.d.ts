declare module 'electron-store' {
    export default class ElectronStore<T = any> {
      constructor(options?: { cwd?: string | false});
      get(key: string): T;
      set(key: string, value: any): void;
    }
  }
  