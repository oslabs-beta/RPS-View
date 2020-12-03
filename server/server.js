/**
 * ************************************
 *
 * @module  server
 * @author Mark, Joe
 * @date 11/18
 * @description Main entry point for backend. uses express to connect to routers which use controller middleware.
 *
 * ************************************
 */

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

});


const app = express();

const menuRouter = require('./routes/menuRouter');
const clientRouter = require('./routes/clientRouter');
const { subObj } = require('./controllers/menuController');

//handle parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//serve index
app.use('/static', express.static(path.resolve(__dirname,'../static')));

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=utf-8' })
  .sendFile(path.resolve(__dirname, '../index.html'));
})

//serve static from webpack build folder or on webpack dev the publicPath /build
app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/menu', menuRouter);
app.use('/client', clientRouter);


// //serve styles

//404
app.use('/', (req, res) => {
  console.log('Bad URL');
  res.sendStatus(404);
})

//listen on port 3000
app.listen(3000, () => {
  console.log('listening on port 3000')
})




