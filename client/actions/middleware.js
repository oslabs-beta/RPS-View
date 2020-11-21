/**
 * ************************************
 *
 * @module  middleware.js
 * @author
 * @date 
 * @description all the middleware that dispatches actions
 *
 * ************************************
 */
import * as types from '../constants/actionTypes.js';
import * as errorActions from './errorActions.js';
import * as clientActions from './clientActions.js';
import * as channelActions from './channelActions.js';

//redux thunk for handleGoClick determines which reducer case to call
export const handleGoClick = (stateObj) => (dispatch) => {
 

  switch (stateObj.selectedAction){
    case "addMessage":
      dispatch(fetchMessage(stateObj));
      return;
    case "subscribe":
      dispatch(fetchSubscribe(stateObj));
      return;
    case "unsubscribe":
      dispatch(fetchUnsubscribe(stateObj));
      return;
    default: 
      return;
  }
}

export const fetchMessage = (stateObj) => (dispatch) => {
  fetch("/client/publish", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: stateObj.currClient,
      channelName: stateObj.channel,
      message: stateObj.message
    })
  })
  .then ( response => {
    if(response.status === 200){
      console.log('message published!')
      dispatch(getDate());
    } else {
      dispatch(errorActions.errorHandler('Failed to publish!'))
    }
  })
  .catch( error => dispatch(errorActions.errorHandler('Failed to publish!')))
}

export const fetchSubscribe = (stateObj) => (dispatch) => {
  console.log(stateObj.currClient)
  fetch("/client/subscribe", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: stateObj.currClient,
      channelName: stateObj.channel
    })
  })
  .then( response => {
    if(response.status === 200) {
      console.log('client subscribed')
      dispatch(clientActions.subscribe())
    } else {
      dispatch(errorActions.errorHandler('Failed to publish!'))
    }
    
  })
  .catch( error => dispatch(errorActions.errorHandler('Failed to publish!')))
}

//middleware to add on message event listener to backend for subscriber client
//will be dispatched from fetchsubscribe and will dispatch subscribe
//needs to be passed ws so can message backend



export const fetchUnsubscribe = (stateObj) => (dispatch) => {
  
  fetch("/client/unsubscribe", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: stateObj.currClient,
      channelName: stateObj.channel
    })
  })
  .then( response => {
    if(response.status === 200) {
      console.log('client unsubscribed :\(!')
      dispatch(clientActions.unsubscribe())
    } else {
      dispatch(errorActions.errorHandler('Failed to unsubscribe!'))
    }
  })
  .catch(dispatch(errorActions.errorHandler('Failed to unsubscribe!')))
}

//message middleware - create new iso string for current time, then call dipsatch for message
export const getDate = () => (dispatch) => {
  const date = new Date(Date.now()).toISOString();
  dispatch(clientActions.addMessage(date));
}

//run fetch requests, then dispatch reducer

//fetchConnect
export const fetchConnect = (port) => (dispatch) => {
  //fetch
  fetch('/menu/connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //check that below is for sure a string
    body: JSON.stringify({port}),
  })
  .then(response => {
    if (response.status === 200) {
      console.log("port connected");
      dispatch(channelActions.portConnected(port));
    } else dispatch(errorActions.errorHandler(`Failed to connect to ${port}`));
  })
  .catch((error) => {
    dispatch(errorActions.errorHandler(`Failed to connect to ${port}`));
  })
  
}

//fetchAddClient
//data in form of 
// {clientId: #, type: 'publisher' OR 'subscriber'}
export const fetchAddClient = (data) => (dispatch) => {
  
  fetch('/menu/addClient', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    //check that below is for sure a string
    body: JSON.stringify({type:data.type,clientId:data.clientId}),
  })
  .then(response => {
    
    if (response.status === 200) {
      if (data.type === 'subscriber') {
        dispatch(wsMessage(data));
      } else {
        dispatch(clientActions.addClient())
      }
      
      return;
    } else {
      dispatch(dispatch(errorActions.errorHandler('Failed to addClient!')));
      return;
    }
  })
  .catch(err => {
    dispatch(dispatch(errorActions.errorHandler('Failed to addClient!')));
    return;
  })
};

export const wsMessage = (data) => dispatch => {
  
  data.ws.send(JSON.stringify({clientId:data.clientId}))
  dispatch(clientActions.addClient())
}


//fetchAddChannel
export const fetchAddChannel = (channelName) => (dispatch) => {
  fetch('/menu/addChannel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({channelName}),
  })
  .then(response => {
    if (response.status === 200) {
      console.log("channel added");
      dispatch(channelActions.addChannel(channelName));
    } 
    else {
      dispatch(errorActions.errorHandler("Error adding channel"))
    } 
  })
  .catch((error) => {
    dispatch(errorActions.errorHandler("Error adding channel"))
  })
}


