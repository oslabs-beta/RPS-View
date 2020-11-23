/**
 * ************************************
 *
 * @module  menuController
 * @author Mark, Joe
 * @date 11/18
 * @description controller for nav menu
 *
 * ************************************
 */


let Redis = require('ioredis');

//create variables to pass into routers and client controller
//global port is the port number which the redis server is spun up on
let globalPort;
//subscriberObj is an object that will store all redis clients
let subObj = {};
let pubObj = {};

//create controller object
let menuController = {}
//middleware to test to see if port given from front end is correct
menuController.connect = (req,res,next) => {

    //grab port number
    globalPort = req.body.port;

    //use subscribe in order to test connection
    let redis = new Redis(globalPort)
    redis.subscribe('sup', (error, count)=>{
        //if error attach error as res locals and continue
        if(error){
            
            return res.status(400).send('failed to connect');
            // next();
        }
        //if no error add message connected to server
        
        return res.status(200).send('connected')
        // next();
    })
}

//middle ware to add a given channel to the redis server given from global port
menuController.addChannel = (req,res,next) => {

    if(req.body.channelName === ''){
        return res.status(400).send('invalid channel name');
    }

    let redis = new Redis(globalPort);
    //use subscribe to sudo create channel by subscribing to channel
    redis.subscribe(req.body.channelName, (error, count)=>{
        //if error attach error as res locals and continue
        if(error){
            return res.status(400).send('failed to addChannel');
        }
        //if no error add message added channel
        
        return res.status(200).send('added Channel')
    })

}

//add client to redis
menuController.addClient = (req, res, next) => {
    // console.log(req.body);
    //if clientId from fetch body is incorrect, send back invalid input
    if(req.body.clientId === undefined){
        return res.status(200).send('invalid inputs');
    }


    let redis = new Redis(globalPort)
    redis.subscribe('sup', (error, count)=>{
        //if error trying to add client, server is not connected
        if(error){
            return res.status(400).send('server not connected');
            // next();
        }
        //if no error add client
        
        //receive client id
            //add it to current client obj
        if(req.body.type === "publisher"){
            pubObj[req.body.clientId] = new Redis(globalPort);
            pubObj[req.body.clientId].clientId=req.body.clientId;
        }
        if(req.body.type === "subscriber"){
            subObj[req.body.clientId] = new Redis(globalPort);
            subObj[req.body.clientId].clientId=req.body.clientId;
        }
        //UPDATE. if client type is not selected(which default to empty string), default to sub. 
        if(req.body.type === '') {
            subObj[req.body.clientId] = new Redis(globalPort);
            subObj[req.body.clientId].clientId=req.body.clientId;
        }
        return res.status(200).send('added client')
        // next();
    })
  };


//test middleware that will not be needed in production
//used to test number of channels in the active redis db
menuController.test = (req,res,next) => {
    let redis = new Redis(globalPort);
    redis.pubsub('channels', (err, channels) => {
        if (err) {
            console.log
        } else {
            console.log('Channels:', channels); // array
        }
        return next()
    });
}

//export the controller for middleware
//export global port 
module.exports = {menuController, globalPort, pubObj, subObj}