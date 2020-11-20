/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description all the actions for the app
 *
 * ************************************
 */
import * as types from '../constants/actionTypes.js';

/**OVERVIEW of actions relate to clients
 * subscribe
 * unsubscribe
 * message (channel, message already set, take in userid)
 * addClient
 * handleInput (works for channel or message)
 * setClient (changes the current client that we're working on)
 * each action is exported, has a type and payload
 */

 /**TODO later: Add a cloneClient action */

export const subscribe = () => ({
  type: types.SUBSCRIBE
});

export const unsubscribe = () => ({
  type: types.UNSUBSCRIBE
});

export const addMessage = (dateString) => ({
  type: types.MESSAGE,
  payload: dateString,
});

export const addClient = (error) => ({
  type: types.ADD_CLIENT,
  payload: error,
});

export const setClient = (clientID) => ({
  type: types.SET_CLIENT,
  payload: clientID
});

//input will be an object that property in state that needs to be updated and the corresponding new value
//ex payload could be {property: 'message', value: 'hello'} --> this would be used to reset message in state to hello
export const handleClientInput = (payload) => ({
  type: types.HANDLE_CLIENT_INPUT,
  payload: payload

})



/**These are the channel related actions */

export const selectChannel = (channelName) => ({
  type : types.SELECT_CHANNEL,
  payload: channelName
})

export const addChannel = (channelName) => ({
    type: types.ADD_CHANNEL,
    payload: channelName,
  });

export const deleteChannel = (channelName) => ({
    type: types.DELETE_CHANNEL,
    payload: channelName,
});

//portConnected
export const portConnected = (port) => ({
  type: types.PORT_CONNECTED,
  payload: port,
});

//portError
export const portError = (port) => ({
  type: types.PORT_ERROR,
  payload: port,
});

// export const addChannelSubscriber = (channelName, userName) => ({
//     type: types.ADD_CHANNEL_SUBSCRIBER,
//     payload: {
//         channelName,
//         userName
//     },
// });

// export const deleteChannelSubscriber = (channelName, userName) => ({
//     type: types.DELETE_CHANNEL_SUBSCRIBER,
//     payload: {
//         channelName,
//         userName
//     },
// });

  
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
      console.log('published failed!')
    }
  })
  .catch( error => console.log(error))
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
      dispatch(subscribe())
    } else {
      console.log('subscribe failed!')
    }
  })
  .catch( error => console.log(error))
}

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
      dispatch(unsubscribe())
    } else {
      console.log('unsubscribe failed!')
    }
  })
  .catch( error => console.log(error))
}

//message middleware - create new iso string for current time, then call dipsatch for message
export const getDate = () => (dispatch) => {
  const date = new Date(Date.now()).toISOString();
  dispatch(addMessage(date));
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
      dispatch(portConnected(port));
    } else dispatch(portError(port));
  })
  .catch((error) => {
    console.log("Error: ", error);
    dispatch(portError(port));
  })
  
}

//fetchAddClient
//data in form of 
// {clientId: #, type: 'publisher' OR 'subscriber'}
export const fetchAddClient = (data) => (dispatch) => {
  console.log('fetchAddClient is running, data: ', data)
  fetch('/menu/addClient', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    //check that below is for sure a string
    body: JSON.stringify(data),
  })
  .then(response => {
    
    if (response.status === 200) {
      dispatch(addClient());
      return;
    } else {
      dispatch(addClient({error: 'unsuccessful'}));
      return;
    }
  })
  .catch(err => {
    dispatch(addClient({error: 'unsuccessful'}));
    return;
  })
};

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
      dispatch(addChannel(channelName));
    } 
    if (response.status >= 400 && response.status < 500) {
      console.log("Bad URL");
    } 
    else if (response.status >= 500) {
      console.log("server error");
    }
  })
  .catch((error) => {
    console.log("Error: ", error);
  })
}

