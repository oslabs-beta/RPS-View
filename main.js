const { BrowserWindow, app } = require('electron')
require('dotenv').config();
// const express = require('./server/server.js')

let mainWindow = null

function main() {
  
  // express
  mainWindow = new BrowserWindow({ width: 1200, height: 800 })
  mainWindow.loadURL(`http://localhost:3000/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)