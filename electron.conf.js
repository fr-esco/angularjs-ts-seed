'use strict';

const electron = require('electron')
const {app, BrowserWindow, globalShortcut, ipcMain, nativeImage} = electron
const client = require('electron-connect').client
const handleRedirect = require('./electron.extra.navigate')

const path = require('path')

// adds debug features like hotkeys for triggering dev tools and reload
//require('electron-debug')({showDevTools: true, enabled: true});

// prevent window being garbage collected
let mainWindow;

function icon() {
  const shell = ['app', 'assets', 'logo', 'ng-256x256.ico']
  const exe = ['resources'].concat(shell)

  let image
  try {
    require('fs').statSync(`.${path.sep}${path.join(...exe)}`)
    image = nativeImage.createFromPath(`.${path.sep}${path.join(...exe)}`)
  } catch (e) {
    image = nativeImage.createFromPath(`.${path.sep}${path.join(...shell)}`)
  }
  return image
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 2048,
    height: 1536,
    icon: icon(),

    title: 'Angularjs 1.5 TypeScript Seed',
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/electron.preload.js',
      webSecurity: false
    }
  });

  //mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL('http://localhost:8080/');
  // mainWindow.toggleDevTools();
  client.create(mainWindow)

  if (process.argv.some(arg => arg.indexOf('devtools') > -1))
    globalShortcut.register('CmdOrCtrl+Shift+I', () => mainWindow.webContents.toggleDevTools())

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('new-window', handleRedirect)
  mainWindow.webContents.on('will-navigate', handleRedirect)

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
