const { BrowserWindow, app } = require('electron')
// const express = require('./server/server.js')

let mainWindow = null

function main() {
  // express
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL(`http://localhost:8080/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)