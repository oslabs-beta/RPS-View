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
            res.locals.message = 'failed to connect to server';
            return next();
        }
        //if no error add message connected to server
        res.locals.message = 'connected to server';
        return next();
    })
}

//middle ware to add a given channel to the redis server given from global port
menuController.addChannel = (req,res,next) => {
    
    if(req.body.channelName === undefined){
        res.locals.message = 'invalid channel name'
        return next()
    }

    let redis = new Redis(globalPort);
    //use subscribe to sudo create channel by subscribing to channel
    redis.subscribe(req.body.channelName, (error, count)=>{
        //if error attach error as res locals and continue
        if(error){
            res.locals.message = 'failed to addChannel';
            return next()
        }
        //if no error add message added channel
        res.locals.message = 'added Channel';
        return next() 
    })

}

//add client to redis
menuController.addClient = (req, res, next) => {
    console.log(req.body)
    //receive client id
        //add it to current client obj
    if(req.body.type === "publisher")pubObj[req.body.clientId] = new Redis(globalPort);
    if(req.body.type === "subscriber")subObj[req.body.clientId] = new Redis(globalPort);
    res.locals.message = "added client"
    return next()
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