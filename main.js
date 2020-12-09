// const { BrowserWindow, app } = require('electron')
// // const express = require('./server/server.js')

// let mainWindow = null

// function main() {
//   // express
//   mainWindow = new BrowserWindow({ width: 800, height: 600 })
//   mainWindow.loadURL(`http://localhost:8080/`)
//   mainWindow.on('close', event => {
//     mainWindow = null
//   })
// }


// app.on('ready', main)



const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
 
const path = require('path');
const isDev = require('electron-is-dev');
 
let mainWindow;
 
function createWindow() {
  // const db = require('./models/model')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const WebSocket = require('ws')






const socketServer = new WebSocket.Server({port:3030});

// Register event for client connection
socketServer.on('connection', function connection(ws) {

  // broadcast on web socket when receving a Redis PUB/SUB Event
  // console.log(5)
  // for(const key in subObj){
  //   console.log(key)  
    // subObj[key].on('message', function(channel, message){
    //   console.log(message);
    //   ws.send({
    //     message: message,
    //     key: key
    //   });
    // })
  // }

  //websocket receives message from front end
  //accept an array of id's (run foreach)
  ws.on('message',(message)=>{
    console.log(message)
    console.log(JSON.parse(message))
    message = JSON.parse(message)

    //if message is array, this is a set of clients to add, 
    //add each of them
    if (Array.isArray(message)){
      for (let el of message) {
        
        subObj[el.clientId].on('message', function(channel, message){
          // console.log(message);
          
          let sendId = el.clientId;
          socketServer.clients.forEach(client=>{
            // this.options.name = "yo"
            console.log(this.clientId)
            if(client.readyState === WebSocket.OPEN){
              client.send(JSON.stringify({message, channel, clientId: this.clientId}));
            }
          });
        });
      };
    }
    //single client
    else {
      subObj[message.clientId].on('message', function(channel, message){
        // console.log(message);
        
        let sendId = message.clientId;
        socketServer.clients.forEach(client=>{
          // this.options.name = "yo"
          console.log(this.clientId)
          if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify({message, channel, clientId:this.clientId}));
          }
        })
        
        })

    }
    
  });

  ws.on("close", function(){
    for(let key in subObj){
      // console.log(key)
      // subObj[key].removeListener('message',event)
      subObj[key].quit()
      delete subObj[key]
    }
  })

});


const expressapp = express();

const menuRouter = require('./server/routes/menuRouter');
const clientRouter = require('./server/routes/clientRouter');
const { subObj } = require('./server/controllers/menuController');


//handle parsing request body
expressapp.use(bodyParser.json());
expressapp.use(bodyParser.urlencoded({ extended: true }));

//serve index
// expressapp.use('/static', express.static(path.resolve(__dirname,'../static')));

// expressapp.get('/', (req, res) => {
//   res.set({ 'Content-Type': 'text/html; charset=utf-8' })
//   .sendFile(path.resolve(__dirname, '../index.html'));
// })

//serve static from webpack build folder or on webpack dev the publicPath /build
// expressapp.use('/build', express.static(path.resolve(__dirname, '../build')));

expressapp.use('/menu', menuRouter);
expressapp.use('/client', clientRouter);


//404
expressapp.use('/', (req, res) => {
  console.log('Bad URL');
  res.sendStatus(404);
})

//listen on port 3000
expressapp.listen(3000, () => {
  console.log('listening on port 3000')
})


  mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
  });
      console.log('I WAS HERE', process.env.NODE_ENV)
      mainWindow.loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`);
      if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
      }
      
 
  mainWindow.setMenu(null);
  mainWindow.on('closed', () => mainWindow = null);
}
 
app.on('ready', createWindow);
 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 
app.on('activate', () => {
  if (mainWindow === null) {
    console.log('NOT HERE')
    console.log(`file://${path.join(__dirname, './build/index.html')}`)
    createWindow();
  }
});