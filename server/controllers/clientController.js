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
  if(channelName === undefined || clientId === undefined) return res.status(400).send('undefined input');
  if(subObj[clientId] === undefined) {
    return res.status(400).send('client does not exist');
  } else {
    subObj[clientId].unsubscribe(channelName, (error, count) => {
      if(error) {
        return res.status(400).send('unable to unsubscribe');
      } 
      return res.status(200).send(clientId+ 'Successfully unsubscribed to ' + channelName + '. Cleint is now subscribed to '+ count +'channels');
    })
  }
};

//router for subscribe to redis channel
clientController.subscribe = (req, res, next) => {
  const clientId = req.body.clientId
  const channelName = req.body.channelName
  // console.log(clientId,channelName)
  // console.log(subObj)
  //check if client exist
  //if clientId matches client DB
    //call subscribe to redis with passed in channelName
    //redis will return count for client subbed channel

  //server message is passed to the router for response
  if(channelName === undefined || clientId === undefined) return res.status(400).send('undefined input');
  if(subObj[clientId] === undefined) {

    return res.status(400).send('client does not exist');
  } else {
    subObj[clientId].subscribe(channelName, (error, count) => {
      if(error) {
        return res.status(400).send('failed to subscribe');
      } 
      return res.status(200).send(clientId+ 'Successfully subscribed to ' + channelName + '. Cleint is now subscribed to '+ count +'channels');
    })
  }

};

//router for client to publish on redis server
clientController.publish = (req, res, next) => {``
  const clientId = req.body.clientId
  const channelName = req.body.channelName
  const message = req.body.message
  //if clientID match client DB
    //publish to redis using redis commands 

  //return server message to frontend
  if(channelName === undefined || clientId === undefined || message === undefined) return res.status(400).send('undefined input');
  if(pubObj[clientId] === undefined) {
    //send fail status and message to the frontend
    return res.status(400).send('error, client does not exist')
  } else {
    pubObj[clientId].publish( channelName, message, (error, count) => {
      if(error) {
        return res.status(400).send('failed to publish!')
      } 
      console.log(count)
      return res.status(200).send('message published to ' + channelName + '. message published to ' + count + 'channel');
    })
  }
};

module.exports = clientController;