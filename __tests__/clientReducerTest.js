/**
 * ************************************
 *
 * @module  test for client reducers
 * @author Elise and Lara
 * @date 12/5
 * @description unit tests for client reducers
 *
 * ************************************
*/

import subject from '../client/reducers/clientReducer';

describe('client reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      message: '',
      selectedAction: '',
      currClient: null,
      nextClientId: 1, 
      channel: '',
      clients: {}, 
       /**will have the structure {id: 
       * {
       * log: [{channel: str, timestamp: ISO string (MIDDLEWARE), message: str}], 
       * channels: [channels]
       * type: 'publisher' OR 'subscriber'
       * }
       * */
    }
  });

  describe('default state given an undefined or empty action', () => {
    it('when action type is invalid string, should return original state', () => {
      const action = {type: "bad string"};
      const newState = subject(state, action);
      expect(newState).toBe(state);
    });
    it('when action type is undefined, should return original state', () => {
      const action = {type: undefined};
      const newState = subject(state, action);
      expect(newState).toBe(state);
    });
  });

  //subscribe tests
  describe('test action.type SUBSCRIBE', () => {
    //change initial state to reflect situation before a client subscribes to a channel
    let newState;
    beforeEach(() => {
      state.selectedAction = 'subscribe';
      state.currClient = 1;
      state.nextClientId = 2;
      state.channel = 'test';
      state.clients = {
        '1': {
          log: [],
          channels: [],
          type: 'subscriber'
        }
      }
      //assign newState
      newState = subject(state, action);
    });
    //set action variable
    const action = {type: 'SUBSCRIBE'};
        
    //test to see if state is altered
    it('new state should be different from previous state', () => {
      expect(newState).not.toBe(state);
    })
    //check to see if message log length increases by 1
    it('should increase length of message log array by 1', () => {
      expect(newState['clients']['1']['log'].length).toBe(1);
    })
    //check to see if channel appears on client's subscribed channels list
    it('new channel should appear in channels array', () => {
      expect(newState['clients']['1']['channels'][0]).toBe('test');
    })
  })

  //publish
  describe('test action.type PUBLISH_MESSAGE', () => {
    beforeEach(() => {
      state.selectedAction = 'publish';
      state.currClient = 1;
      state.nextClientId = 2;
      state.channel = 'test';
      state.message = 'a message'
      state.clients = {
        '1': {
          log: [],
          channels: [],
          type: 'subscriber'
        }
      }
      
    });

    const action = {type: 'PUBLISH_MESSAGE', payload: '10-20-2000'};
    it('resets message', () => {
      const {message} = subject(state, action);
      expect(message).toBe('');
    });

    it('adds a message to the log', () => {
      const {clients} = subject(state, action);
      expect(clients["1"].log.length).toBe(1);
    });

    it('adds a message of correct type with non null values', () => {
      const {clients} = subject(state, action);
      const expectedMessage = {
        message: expect.any(String),
        timestamp: expect.any(String),
        type: 'published',  
        channel: expect.any(String)
      }
      expect(clients["1"].log[0]).toMatchObject(expectedMessage)
    });

    it('adds a channel to the channels array if first time publishing', () => {
      const { clients } = subject(state, action);
      //does the clients object at the curr client at the channels contain 'test' in its array?
      expect(clients["1"].channels.includes('test')).toBe(true);
    })
  })
})