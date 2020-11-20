/**
 * ************************************
 *
 * @module  clientReducer.js
 * @author Elise and Lara
 * @date
 * @description all the reducers related to client state
 *
 * ************************************
 */

//import types from constants
import * as types from '../constants/actionTypes.js';

//set up initial state for clients
const initialState = {
  message: '',
  selectedAction: '',
  currClient: null,
  nextClientId: 2, //used to create a serial id for each id
  channel: '',
  /**TODO change channels to a set instead of an array */
  clients: {1: {log: [{channel: 'politics', type: 'received', timestamp: 'DATEHERE', message: 'election called'}], channels: ['politics', 'food']}, 
  2: {log: [{channel: 'Joe', type: 'received', timestamp: 'DATEHERE', message: 'joe sent a message'}, {channel: 'food', type: 'received', timestamp: 'DATEHERE', message: 'how to make pickles'}], channels: ['Joe', 'food']}}, 
  //will have the structure id: {log: [{channel: str, type: 'published'/'received', timestamp: ISO string, message: str}], channels: [arrs]},
  errorMessage: '',
}

const clientReducer = (state = initialState, action) => {
  //subscribe, unsubscribe, message, addClient
  //make a deep copy of state.clients, which will be used to alter state within reducers
  const copyClientList = JSON.parse(JSON.stringify({...state.clients}));
  
  //declare channels
  let channels;

  //switch cases for each reducer
  switch(action.type) {
    
    /**subscribe adds the channel to the client's channels array */
    case types.SUBSCRIBE:
      
      //assign currClient's list of channels to channels
      channels = copyClientList[state.currClient].channels;
      
      //if channels does not include channel
      //push new channel and then sort alphabetically
      if (!channels.includes(state.channel)) {
        channels.push(state.channel);
        channels.sort();
      }

      //return state with updated clients list and reassign message to empty string
      return {
        ...state,
        clients: copyClientList,
        message: '',
      };

    /**unsubscribe removes the channel from the client's channel array*/
    case types.UNSUBSCRIBE:
      //assign currClient's list of channels to channels
      channels = copyClientList[state.currClient].channels;
      
      //find the index in the array that corresponds with the current channel (to be deleted)
      const index = channels.indexOf(state.channel);
      
      //if index is -1 -- it isn't there, do nothing
      if (index !== -1) {
        //remove one element at that index to remove the channel
        channels.splice(index, 1);
      }

      //add the altered copyClientList to the state & reset message
      return {
        ...state,
        clients: copyClientList,
        message: '',
      };
    
    /** Message takes the message, channel, and client in state and adds a message to every client subscribed to that channel */
    case types.MESSAGE:
      /** TODO - we are currently attempting to achieve all functionality
       * by updating state, but we need to do this through an 
       * external call REST request or WS sendMessage (Thunk)
       * */

      //if there is no message, return out
      if (state.message === '') return state;

      //create messages object
      let now = action.payload;
      //adjust for async
      const newMessage = {channel: state.channel, timestamp: now, type: 'received', message: state.message}
     
      //go through all clients
      for (let clientId in copyClientList) {
        
        // declare log, which is the log for the current clientId on iteration
        const newLog = copyClientList[clientId].log;
        
        //if we're on the currClient, add the message with type: published
        if (clientId === state.currClient) {
          const publisherMessage = Object.assign({}, newMessage, {type: 'published'});
          newLog.push(publisherMessage);
        } 

        //are they subscribed to that channel?
        //if so add a message to their log array 
        
        else if (copyClientList[clientId].channels.includes(state.channel)) {
          newLog.push(newMessage);
        };
      };
    
      //reset message to ', reassign clients
      return {
        ...state,
        clients: copyClientList,
        message: '',
      }
     
    /** Add client adds a client to the clients object */
    case types.ADD_CLIENT:
      console.log('reached add_client reducer!')
     if (!action.payload) {
       console.log('client add success!')
       //increment nextClientID from state
       const newNext = state.nextClientId + 1;
       
       //create a new client object with an empty log and empty channels array
       const newClient = {log: [], channels: []};
       
       //add new client object to the copyOfClients object
       copyClientList[newNext] = newClient;
 
       //return updated state with incremented nextClientId and updated clients
       return {
         ...state,
         nextClientId: newNext,
         clients: copyClientList
       }
      }
         return {
          ...state,
          errorMessage: 'Error trying to add a client'
        }

    
    case types.SET_CLIENT:
      
      //set newCurrent equal to the payload, which will be the ID of the new current client
      let newCurrent = action.payload;
      
      //if newCurrent is the same as state.currClient, reset newCurrent to null
      if (newCurrent === state.currClient) newCurrent = null;

      //return updated state with new current client
      return {
        ...state,
        currClient: newCurrent,
        selectedAction: '',
        message: '',
        channel: '',
      }

    case types.HANDLE_CLIENT_INPUT:
      //NOTE: payload will be object with {property: XX, value: XX}
      //set property equal to property on the payload obj
      const property = action.payload.property;
      
      //set value equal to value from the payload obj
      const value = action.payload.value;

      //return state with a key/value pair derived from property and value
      return {
        ...state,
        [property]: value
      }
    
    //set default case
    default:
      return state;
  };
}


//export clientReducer
export default clientReducer;