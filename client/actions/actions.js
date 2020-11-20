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

export const addClient = () => ({
  type: types.ADD_CLIENT
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
export const handleGoClick = (selectedAction) => (dispatch) => {
  console.log('handle go click running, selected action is ', selectedAction)
  switch (selectedAction){
    case "addMessage":
      dispatch(getDate());
      return;
    case "subscribe":
      dispatch(subscribe());
      return;
    case "unsubscribe":
      dispatch(unsubscribe());
      return;
    default: 
      return;
  }
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

