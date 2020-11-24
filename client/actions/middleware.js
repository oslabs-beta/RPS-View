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

// import {createAsyncThunk} from '@reduxjs/toolkit';
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

// export const asyncAddClient = createAsyncThunk(
//   '/client/'
// )

export const handleClone = (data) => (dispatch) => {
  const {num, channels, type, nextClientId} = data;
  console.log('in handleClone, vars are: ', num, channels, type, nextClientId)
  //iterate up to num
    //add client of type type
    //subscribe them to each channel in channels

  for (let i = 0; i < num; i ++) {
    dispatch(fetchAddClient({type: type, clientId: nextClientId}));
    // for (let channel of channels) {
    //   dispatch(fetchSubscribe({channelName: channel, selectedAction: 'subscribe', clientId: nextClientId}));
    // }

    
  }
}

// export const asyncClone = async function clone(data){
//   const {num, channels, type, nextClientId} = data;
  
//   await fetchAddClient({type: type, clientId: nextClientId});
//   for (let channel of channels) {
//     await fetchSubscribe({channelName: channel, selectedAction: 'subscribe', clientId: nextClientId});
//   }
  
// }

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
      //dispatch publish middleware
      dispatch(getDate(stateObj))
    } else {
      dispatch(errorActions.errorHandler('Failed to publish!'))
    }
  })
  .catch( error => dispatch(errorActions.errorHandler('Failed to publish!')))
}

export const fetchSubscribe = (stateObj) => (dispatch) => {
  
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
      dispatch(getDate(stateObj))
    } else {
      dispatch(errorActions.errorHandler('Failed to subscribe!'))
    }
    
  })
  .catch( error => {
    
    dispatch(errorActions.errorHandler('Failed to subscribe!'))
  })
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
      dispatch(getDate(stateObj))
    } else {
      dispatch(errorActions.errorHandler('Failed to unsubscribe!'))
    }
  })
  .catch(dispatch(errorActions.errorHandler('Failed to unsubscribe!')))
}

export const socketReceivedMessage = (stateObj) => (dispatch) => {
  //
  dispatch(getDate(stateObj))
}



//message middleware - create new iso string for current time, then call dispatch for message
export const getDate = (stateObj) => (dispatch) => {
  
  const now = new Date(Date.now()).toISOString();
  if(stateObj.selectedAction === 'addMessage'){
    dispatch(clientActions.publishMessage(now));
  }
  else if(stateObj.selectedAction === 'subscribe') {
    dispatch(clientActions.subscribe(now));
  }
  else if(stateObj.selectedAction === 'unsubscribe') {
    dispatch(clientActions.unsubscribe(now));
  }
  else {
    dispatch(clientActions.receivedMessage({...stateObj, now}));
  }
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


//data in form of 
// {clientId: #, type: 'publisher' OR 'subscriber' OR '' defaults to subscriber}
export const fetchAddClient = (data) => (dispatch) => {
  console.log('running fetchAddClient, data: ', data)
  fetch('/menu/addClient', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    //check that below is for sure a string
    body: JSON.stringify({type: data.type, clientId: data.clientId}),
  })
  .then(response => {

    if (response.status === 200) {

      if (data.type === 'subscriber' || data.type === '') {
        dispatch(wsMessage(data));
      } else {
        dispatch(clientActions.addClient('publisher'))
      }
      
      return;
    } else {
      dispatch(dispatch(errorActions.errorHandler('Failed to addClient!')));
      return;
    }
  })
  .catch(err => {
    console.log('error in fetchAddClient', err)
    dispatch(dispatch(errorActions.errorHandler('Failed to addClient!')));
    return;
  })
};

export const wsMessage = (data) => dispatch => {
  //this sends the client id through the websocket to add the connection to ws
  data.ws.send(JSON.stringify({clientId: data.clientId}))
  dispatch(clientActions.addClient('subscriber'))
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


