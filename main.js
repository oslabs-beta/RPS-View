const { BrowserWindow, app } = require('electron')
// const express = require('./server/server.js')

let mainWindow = null

function main() {
  let url = (process.env.NODE_ENV === 'development' ? `http://localhost:8080/` : `http://localhost:3000/`)
  // express
  mainWindow = new BrowserWindow({ width: 1200, height: 800 })
  mainWindow.loadURL(url)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)