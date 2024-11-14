/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import Store from 'electron-store';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const isDev = process.env.NODE_ENV !== 'production';

const store = new Store({
  cwd: isDev ? path.join(__dirname, '../electron-store') : undefined
});

// Define the data to be saved in the store
const data = {
  formats: [
    { key: "A4", value: "A4" },
    { key: "A5", value: "A5" },
    { key: "A6", value: "A6" }
  ],
  //TODO: later implement different languages functionality with the help of useContext from react
  cards: [
    { key: "День Рождения", value: "Дорогой [Имя], Поздравляю тебя с Днем Рождения! Пусть этот особенный день принесет массу радостных мгновений, а весь год впереди будет полон успехов, удачи и счастливых событий. Желаю крепкого здоровья, исполнения самых заветных желаний и вдохновения на новые свершения. Пусть твоя жизнь будет как сказка, полна любви, добра и светлых перспектив. Счастья тебе и удачи во всех начинаниях! С любовью, [Твое имя] [Дата]" },
    { key: "9 мая", value: "Дорогой [Имя], Поздравляю тебя с Днем Победы! Этот день напоминает нам о героизме и мужестве тех, кто боролся за нашу свободу. Пусть память о Великой Победе всегда живет в наших сердцах, а каждый новый день приносит только мир, счастье и благополучие. Желаю крепкого здоровья, долгих лет жизни и вдохновения на каждый день. Пусть твоя жизнь будет наполнена радостью, удачей и только светлыми моментами. С праздником! С уважением, [Твое имя] 9 мая 2024" },
    { key: "Новый Год", value: "Дорогой [Имя], С Новым годом! Пусть 2024 год принесет тебе только положительные эмоции, здоровье и удачу. Пусть сбудутся все мечты, а каждый день будет полон ярких событий и радостных моментов. Желаю тебе достижения новых высот в личной жизни и на работе. Пусть рядом будут верные друзья и любящие люди, а впереди — только светлое будущее. Пусть этот год будет щедрым на счастье, успех и вдохновение. С праздником! С любовью, [Твое имя] 1 января 2024" }
  ],
};

store.set('settings', data);

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});


ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
