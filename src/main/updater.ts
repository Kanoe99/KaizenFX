import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

const setupUpdater = () => {
  log.transports.file.level = 'info';
  autoUpdater.logger = log;
  autoUpdater.checkForUpdatesAndNotify();
}

export {setupUpdater};
