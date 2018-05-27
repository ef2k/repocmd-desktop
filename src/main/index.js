'use strict'

import { app, ipcMain, BrowserWindow } from 'electron'
import keytar from 'keytar'
import path from 'path'
import { execFile } from 'child_process'

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
    height: 800,
    width: 600,
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

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
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

let serverProc

ipcMain.on('server-start', (event, token) => {
  console.log('server-start requested')
  const p = path.join(process.cwd(), 'lib', 'repocmd_darwin')
  const port = '3000'
  const env = { 'PORT': port, 'GITHUB_TOKEN': token }

  serverProc = execFile(p, { env }, (error) => {
    if (error) {
      console.log(error)
    }
  })

  event.sender.send('server-started', token)
})

ipcMain.on('server-stop', () => {
  if (serverProc) {
    serverProc.kill()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
