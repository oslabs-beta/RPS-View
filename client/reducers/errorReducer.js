/**
 * ************************************
 *
 * @module  errorReducer
 * @author Lara, Elise
 * @date 11/20.
 * @description reducer for error handling
 *
 * ************************************
 */

 import * as types from "../constants/actionTypes";

 const intialState = {
   errorMessage: '',
 }

 const errorReducer = (state = initialState, action) => {
    switch(action.type) {

      //take in an error message and add it to state
      case types.ERROR_HANDLER:

        //return state updated with current error message from action
        return {
          ...state,
          errorMessage: action.payload
        }
      
      //clears error message from state  
      case types.CLEAR_ERROR:

        return {
          ...state,
          errorMessage: '',
        }

    }
 }