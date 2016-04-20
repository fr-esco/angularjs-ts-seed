'use strict';
const electron = require('electron');
const BrowserWindow = require('browser-window');
// const app = electron.app;
const app = require('app');

// adds debug features like hotkeys for triggering dev tools and reload
// require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 2048,
    height: 1536,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false
    }
  });

  //win.loadURL(`file://${__dirname}/index.html`);
  win.loadURL('http://localhost:5555/');

  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});
