const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
 
const path = require('path');
const isDev = require('electron-is-dev');
 
let mainWindow;
 
function createWindow() {

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const WebSocket = require('ws')

  const socketServer = new WebSocket.Server({port:3030});

  // Register event for client connection
  socketServer.on('connection', function connection(ws) {

    //websocket receives message from front end
    //accept an array of id's (run foreach)
    ws.on('message',(message)=>{
      message = JSON.parse(message)

      //if message is array, this is a set of clients to add, 
      //add each of them
      if (Array.isArray(message)){
        for (let el of message) {
          
          subObj[el.clientId].on('message', function(channel, message){
          
            let sendId = el.clientId;
            socketServer.clients.forEach(client=>{

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
          
          let sendId = message.clientId;
          socketServer.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN){
              client.send(JSON.stringify({message, channel, clientId:this.clientId}));
            }
          })
          
          })

      }
      
    });

    ws.on("close", function(){
      for(let key in subObj){
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
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
  });

  mainWindow.loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${path.join(__dirname, './build/index.html')}`);
      

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
    createWindow();
  }
});