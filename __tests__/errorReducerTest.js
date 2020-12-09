/**
 * ************************************
 *
 * @module  test for reducers
 * @author Elise and Lara
 * @date 12/5
 * @description unit tests for reducers
 *
 * ************************************
*/


import subject from '../client/reducers/errorReducer'
//test error Reducer to ensure that error handler && clear error correctly update reducer state

describe('Error Reducer', () => {
  let state;

  //reset state using beforeEach
  beforeEach(() => {
    state = {
      errorMessage: ''
    }
  })

  describe('test action.type CLEAR_ERROR', () => {
    //initialize mock action obj
    const action = {type : 'CLEAR_ERROR'}
    it('should clear the errorMessage in state', () => {
    state.errorMessage = "test error";
    const newState = subject(state, action);
    expect(newState.errorMessage).toBe(''); 
    })
    //check to see if new copy of state is returned (not the original state object)
    it ('should return new state object', ()  => {
      const newState = subject(state, action);
      expect(newState).not.toBe(state);
    })
  })

  describe('test action.type ERROR_HANDLER', () => {
  //check that if we give the function a payload, it replaces the errorMessage with the new payload. This should work if original errorMessage is an empty string or a previous message
  //test empty string scenario
  const action = {type: 'ERROR_HANDLER', payload: 'test message'};
  it('should add new errorMessage if previous is empty string', () => {
    const newState = subject(state, action);
    expect(newState.errorMessage).toBe('test message');
  })
  //test previous errorMessage is string scenario
  it('should add new errorMessage if previous is string with characters', () => {
    state.errorMessage = "some previous error";
    const newState = subject(state, action);
    expect(newState.errorMessage).toBe('test message');
  })
  })
})