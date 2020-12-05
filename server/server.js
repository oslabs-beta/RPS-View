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
// const db = require('./models/model')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const WebSocket = require('ws')
const { MongoClient } = require('mongodb')
const middleware = require('./models/middleware.js')
const uri = "mongodb+srv://admin:admin123@cluster0.9cgyw.mongodb.net/student?retryWrites=true&w=majority"

const client = new MongoClient(uri);
// console.log('client is', client)

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


const app = express();

const menuRouter = require('./routes/menuRouter');
const clientRouter = require('./routes/clientRouter');
const { subObj } = require('./controllers/menuController');

//mongo connection
async function run() {
  try {
    await client.connect();
    const database = client.db('student');
    const collection = database.collection('students');
    // Query for a movie that has the title 'Back to the Future'
    
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
    
    app.get('/findStudent/:firstName', 
    (req, res, next) => {
      res.locals.collection = collection;
      return next();
    },
    middleware.findStudent)
    
    app.use('/', (req, res) => {
      console.log('Bad URL');
      res.sendStatus(404);
    })
    
  } 
  finally {
    // Ensures that the client will close when you finish/error
    console.log('running finally')
    // await client.close();
  }
}

// //test mongo
// app.use('/mongo', async (req, res) => {
//   console.log('db is', db)
//   const collection = db.sessionData;
//   console.log('collection is', collection)
//   //insert a document to see if client is connected
//   //declare document
//   const pizzaDocument = {
//     name: "Neapolitan pizza",
//     shape: "round",
//     toppings: [ "San Marzano tomatoes", "mozzarella di bufala cheese" ],
//   };
//   //attempt to insert
//   const result = await collection.insertOne(pizzaDocument);
// })

//404
run().catch(console.dir);
//listen on port 3000
app.listen(3000, () => {
  console.log('listening on port 3000')
})




