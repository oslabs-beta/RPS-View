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
  nextClientId: 1, //used to create a serial id for each id
  channel: '',
  /**TODO change channels to a set instead of an array */
  clients: {}, 
  /**will have the structure {id: 
   * {
   * log: [{channel: str, timestamp: ISO string (MIDDLEWARE), message: str}], 
   * channels: [arrs]
   * type: 'publisher' OR 'subscriber'
   * }
   * */

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

      //TODO add timestamp payload to function call
      //initialize a new message
      let subMessage = {
        channel: state.channel,
        timestamp: action.payload,
        type: 'subscribed',
        message: `Subscribed to ${state.channel}`
      }
      console.log('subMessage: ', subMessage);

      //push new message to correct client log
      copyClientList[state.currClient].log.push(subMessage);

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
      //initialize a new message
      let unsubMessage = {
        channel: state.channel,
        timestamp: action.payload,
        type: 'unsubscribed',
        message: `Unsubscribed from ${state.channel}`
      }
      console.log("unsubMessage: ", unsubMessage);

      //push new message to correct client log
      copyClientList[state.currClient].log.push(unsubMessage);
      //add the altered copyClientList to the state & reset message
      return {
        ...state,
        clients: copyClientList,
        message: '',
      };
    
    case types.PUBLISH_MESSAGE:
      //action.payload will be the date string

      //create new message using date and state components
      const newPubMessage = {
        channel: state.channel,
        timestamp: action.payload,
        type: 'published',
        message: state.message,
      }
      //push new message to correct client log
      copyClientList[state.currClient].log.push(newPubMessage);
      //return altered state
        //note: clear message
      return {
        ...state,
        clients: copyClientList,
        message: '',
      }


    /** Message is dispatched after web socket receives data, adds newMessage to the client's log*/
    case types.RECEIVED_MESSAGE:
      //create messages object
      /**
       * action.payload format
       * {
        * now: TIMESTAMP from middleware,
        * channel: 'string',
        * message: 'string'
        * clientid: int
       * }
       */
      const {now, channel, message, clientId} = action.payload;

      const newMessage = {
        channel, 
        timestamp: now, 
        type: 'received', 
        message
      }

      copyClientList[clientId].log.push(newMessage);
      
      return {
        ...state,
        clients: copyClientList,
      }
     
    /** Add client adds a client to the clients object */
    case types.ADD_CLIENT:
      
      //create a new client object with an empty log and empty channels array
      const newClient = {log: [], channels: []};
      
      //add new client object to the copyOfClients object
      copyClientList[state.nextClientId] = newClient;
      
      //increment nextClientID from state
      const newNext = state.nextClientId + 1;

      //return updated state with incremented nextClientId and updated clients
      return {
        ...state,
        nextClientId: newNext,
        clients: copyClientList
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