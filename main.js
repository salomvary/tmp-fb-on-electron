'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

var mainWindow = null

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1290,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
})
