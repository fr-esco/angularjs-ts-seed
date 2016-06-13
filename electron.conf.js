'use strict';

const PATH = require('./tasks/PATH');
const url = [PATH.dest.server.host, PATH.dest.server.port].join(':');

const electron = require('electron');
const BrowserWindow = require('browser-window');
// const app = electron.app;
const app = require('app');
const client = require('electron-connect').client;

const open = electron.shell.openExternal;

// adds debug features like hotkeys for triggering dev tools and reload
// require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function handleRedirect(e, url) {
  console.log('I am', mainWindow.getURL());
  console.log('I go to', url);
  console.log('OPEN', open);
  if (url != mainWindow.getURL()) {
    e.preventDefault();
    open(url);
  }
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

  // win.loadURL(`file://${__dirname}/dist/dev/index.html`);
  win.loadURL(url);

  client.create(win);

  win.on('closed', onClosed);

  win.webContents.on('will-navigate', handleRedirect);
  win.webContents.on('new-window', handleRedirect);

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
