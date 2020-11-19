let Redis = require('ioredis');

let menuController = {}
let globalPort;
menuController.connect = (req,res,next) => {
    globalPort = req.body.port;
    console.log(globalPort)
    let redis = new Redis(globalPort)
    redis.subscribe('sup', (error, count)=>{
        if(error){
            console.log(error)
        }
        console.log(count)
        next()
    })
}

menuController.addChannel = (req,res,next) => {
    let redis = new Redis(globalPort);
    redis.subscribe(req.body.channelName, (error, count)=>{
        if(error){
            console.log(error)
        }
        console.log(count)
        
        next() 
    })

}

menuController.test = (req,res,next) => {
    let redis = new Redis(globalPort);
    redis.pubsub('channels', (err, channels) => {
        if (err) {
            console.log
        } else {
            console.log('Channels:', channels); // array
        }
        next()
    });
}

module.exports = {menuController, globalPort}