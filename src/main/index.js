'use strict'

import { app, globalShortcut, ipcMain, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import keytar from 'keytar'
import path from 'path'
import { execFile } from 'child_process'
import log from 'electron-log'
import getPort from 'get-port'
import fkill from 'fkill'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: 'RepoCMD',
    titleBarStyle: 'hidden',
    width: 1200,
    height: 800,
    backgroundColor: '#282828',
    show: false
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

/**
 * The API Server
 */
let serverProc

function killServerProc () {
  if (serverProc) {
    fkill(serverProc.pid, { force: true })
      .then(() => {
        serverProc = null
      })
  }
}

ipcMain.on('server-start', (event, token) => {
  let execPath
  if (process.env.NODE_ENV !== 'development') {
    execPath = path.join(process.resourcesPath, 'bin/repocmd')
  } else {
    execPath = path.join(process.cwd(), 'resources/mac/repocmd')
  }

  if (process.env.REPOCMD_PORT) {
    event.sender.send('server-started', process.env.REPOCMD_PORT, token)
    return
  }

  getPort().then(port => {
    const env = { 'PORT': port, 'GITHUB_TOKEN': token }
    serverProc = execFile(execPath, { env }, (error) => {
      if (error) {
        if (process.env.NODE_ENV !== 'development') {
          log.error(error)
        }
      }
    })
    event.sender.send('server-started', port, token)
  })
})

ipcMain.on('server-stop', () => {
  killServerProc()
})

/**
 * Main process message handling
 */
const APP_NAME = 'repocmd'

ipcMain.on('keychain-set-token', (event, arg) => {
  const { key, token } = arg
  keytar.setPassword(APP_NAME, key, token)
})

ipcMain.on('keychain-get-token', async (event, service) => {
  const token = await keytar.getPassword(APP_NAME, service)
  event.returnValue = token
})

ipcMain.on('keychain-delete-token', (event, service) => {
  keytar.deletePassword(APP_NAME, service)
})

ipcMain.on('keychain-delete-token', (event, service) => {
  keytar.deletePassword(APP_NAME, service)
})

/**
 * App lifecycle hooks
 */
app.on('ready', () => {
  createWindow()
  globalShortcut.register('CommandOrControl+,', () => {
    mainWindow.webContents.send('shortcut-settings')
  })
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdates()
  }
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    killServerProc()
  } else {
    app.quit()
  }
})

app.on('will-quit', () => {
  killServerProc()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})
