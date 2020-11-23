/**
 * ************************************
 *
 * @module  clientActions.js
 * @author
 * @date
 * @description actions related to clientReducers
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


export const publishMessage = (messageData) => ({
  type: types.PUBLISH_MESSAGE,
  payload: messageData
})

export const receivedMessage = (messageData) => ({
  type: types.RECEIVED_MESSAGE,
  payload: messageData,
});

export const addClient = (pubOrSub) => ({
  type: types.ADD_CLIENT,
  payload: pubOrSub,
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
