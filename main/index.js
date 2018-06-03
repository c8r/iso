const fs = require('fs')
const url = require('url')
const path = require('path')
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const log = require('electron-log')
const Store = require('electron-store')

log.transports.file.level = 'info'

const store = new Store({
  name: 'iso',
  defaults: {
    window: {
      width: 1280,
      height: 720
    },
    dirname: app.getPath('home'),
    recents: [],
    uiColor: '#111',
    styledComponents: true
  }
})

let splash
const createSplash = () => {
  const width = 16 * 48
  const splashURI = require('./splash')
  splash = new BrowserWindow({
    width,
    height: width / 2,
    resizable: false,
    vibrancy: 'dark',
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  })
  splash.loadURL(splashURI)
  splash.on('close', () => {
    splash = null
  })
}

let win
const createWindow = () => {
  const opts = Object.assign({
    minWidth: 768,
    minHeight: 512,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'dark',
    webPreferences: {
      scrollBounce: true
    }
  }, store.store.window)

  win = new BrowserWindow(opts)

  const URL = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file',
    slashes: true,
    query: {}
  })

  win.loadURL(URL)

  win.webContents.on('did-finish-load', e => {
    if (splash) splash.close()
  })

  win.on('close', e => {
    const bounds = win.getBounds()
    store.set('window', bounds)
    win = null
    if (splash) splash.close()
  })

  win.webContents.on('will-navigate', e => {
    e.preventDefault()
  })
}

app.on('ready', () => {
  createSplash()
  createWindow()
})

ipcMain.on('WINDOW_ERROR', (e, err) => {
  log.error(err)
})

ipcMain.on('write-file', (e, { filename, content }) => {
  if (!filename || !content) return
  fs.writeFile(filename, content, err => {
    if (err) log.error(err)
  })
})

ipcMain.on('export-html', (e, state) => {
  const exportHTML = require('./export')
  state.outDir = state.outDir || app.getPath('home')
  exportHTML(state)
    .then(stats => {
      log.info('exported')
      e.sender.send('html-exported')
    })
    .catch(err => {
      log.error(err)
      e.sender.send('export-error', err)
    })
})

require('update-electron-app')({
  repo: 'c8r/iso'
})
