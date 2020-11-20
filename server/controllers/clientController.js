/**
 * ************************************
 *
 * @module  clientController
 * @author Mark, Joe
 * @date 11/18
 * @description controller for client menu.
 *
 * ************************************
 */

const {subObj, pubObj} = require('./menuController')

let clientController = {};


//router for client unsub to redis channel
clientController.unsubscribe = (req, res, next) => {
  const clientId = req.body.clientId
  const channelName = req.body.channelName
  //client ID and channel name is received from the front end 
    //double check if clientID exist in the database, if it doesn't send back error

  //if clientID exist, call redis to unsub
    //passing in the channel name, and redis should return count of channel client is subscribe to
  if(subObj[clientId] === undefined) {
    res.locals.message = 'error, client does not exist';
    return next()
  } else {
    subObj[clientId].unsubscribe(channelName, (error, count) => {
      if(error) {
        res.locals.message = 'failed to unsubscribe';
        return next()
      } 
      res.locals.message = 'channel unsubscribed :\(!';
      return next()
    })
  }
};

//router for subscribe to redis channel
clientController.subscribe = (req, res, next) => {
  const clientId = req.body.clientId
  const channelName = req.body.channelName
  //check if client exist
  //if clientId matches client DB
    //call subscribe to redis with passed in channelName
    //redis will return count for client subbed channel

  //server message is passed to the router for response
  if(subObj[clientId] === undefined) {
    res.locals.message = 'error, client does not exist';
    return next()
  } else {
    subObj[clientId].subscribe(channelName, (error, count) => {
      if(error) {
        res.locals.message = 'failed to subscribe';
        return next()
      } 
      res.locals.message = 'channel Subscribed!';
      return next()
    })
  }

};

//router for client to publish on redis server
clientController.publish = (req, res, next) => {
  const clientId = req.body.clientId
  const channelName = req.body.channelName
  const message = req.body.message
  //if clientID match client DB
    //publish to redis using redis commands 

  //return server message to frontend
  if(pubObj[clientId] === undefined) {
    res.locals.message = 'error, client does not exist';
    return next()
  } else {
    pubObj[clientId].publish( channelName, message, (error, count) => {
      if(error) {
        res.locals.message = 'failed to publish';
        return next()
      } 
      res.locals.message = 'message published!';
      return next()
    })
  }

};

module.exports = clientController;