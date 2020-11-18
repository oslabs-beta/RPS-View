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
  2: {log: [{channel: 'Joe', type: 'received', timestamp: 'DATEHERE', message: 'joe sent a message'}, {channel: 'food', type: 'received', timestamp: 'DATEHERE', message: 'how to make pickles'}], channels: ['Joe', 'food']}}, //will have the structure id: {log: [{channel: str, type: 'published'/'received', timestamp: ISO string, message: str}], channels: [arrs]}
}

const clientReducer = (state = initialState, action) => {
//subscribe, unsubscribe, message, addClient
  const copyClientList = JSON.parse(JSON.stringify({...state.clients}));
  let copyOfChannelsForClient;
  switch(action.type) {
    /**subscribe adds the channel to the client's channels array */
    case types.SUBSCRIBE:
      //some functionality adding a given channel to the appropriate client obj
      //take channel from state & currClient from state to find the right client object
      //push the channel onto their channels array and arrange alphabetically
      
      //TODO: optimize the re-render
      //make shallow copy of channels
      copyOfChannelsForClient = [...copyClientList[state.currClient].channels]
      //push new channel and then sort alphabetically
      copyOfChannelsForClient.push(state.channel);
      copyOfChannelsForClient.sort();
      
      //reassign the channels property on currClient to copyOfChannelsForClient
      copyClientList[state.currClient].channels = copyOfChannelsForClient;

      return {
        ...state,
        //reassign channels key 
        clients: copyClientList,
        message: '',
      };

    /**unsubscribe removes the channel from the client's channel array
     * care taken to ensure that we are using shallow copies, not updating state directly
     */
    case types.UNSUBSCRIBE:
      //set new copyClientList variable equal to clients from state
      // const copyClientList = {...state.clients};
      //initialize a variablle equal to the channels of a particular client (this will be an array)
      copyOfChannelsForClient = [...copyClientList[state.currClient].channels]
      //find the index in the array that corresponds with the current channel (to be deleted)
      const index = copyOfChannelsForClient.indexOf(state.channel);
      //remove one element at that index to remove the channel
      copyOfChannelsForClient.splice(index, 1);
      //add the new array to the copyClientList object
      copyClientList[state.currClient].channels = copyOfChannelsForClient;

      //add the altered copyClientListObject to the updated state
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
      //create messages object
      let now = new Date().toISOString;
      const newMessage = {channel: state.channel, timestamp: now, type: 'received', message: state.message}
      //new object
      // const copyOfClients = {...state.clients}
      //go through all clients
      for (let clientId in copyOfClients) {
        const newLog = [...client.log];
        
        //if we're on the currClient, add the message with type: published
        if (clientId === state.currClient) {
          const publisherMessage = Object.assign({}, newMessage, {type: 'published'});
          const updated = newLog.concat([publisherMessage]);
          client.log = updated;
        } 

        //are they subscribed to that channel?
        //if so add a message to their log array 
        if (state.channel in copyOfClients[clientId][channels] && clientId !== state.currClient) {
          client.log = updated;
          const updated = newLog.concat(newMessage);
        };
      };
      //reset message to '' after external call, reassign clients
      return {
        ...state,
        clients: copyOfClients,
        message: '',
      }
     
    /** Add client adds a client to the clients object */
    case types.ADD_CLIENT:
      //increment nextClientID from state
      const newNext = state.nextClientId + 1;
      //create a new client object with an empty log and empty channels array
      const newClient = {log: [], channels: []};
      //initialize a copyOfClients object, made from clients in state
      const copyOfClients = {...state.clients};
      //add new client object to the copyOfClients object
      copyOfClients[newNext] = newClient;
      //return updated state with incremented nextClientId and updated clients
      return {
        ...state,
        nextClientId: newNext,
        clients: copyOfClients
      }
    
    case types.SET_CLIENT:
      //set newCurrent equal to the payload, which will be the ID of the new current client
      const newCurrent = action.payload;
      
      //return updated state with new current client
      return {
        ...state,
        currClient: newCurrent
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

    default:
      return state;
  };
}


//export clientReducer
export default clientReducer;