/**
 * ************************************
 *
 * @module  errorActions.js
 * @author
 * @date
 * @description actions related to errorReducers
 *
 * ************************************
*/

import * as types from '../constants/actionTypes.js';

//globalError
export const errorHandler = (string) => ({
  type: types.ERROR_HANDLER,
  payload: string,
});

//clear global error
export const clearError = () => ({
  type: types.CLEAR_ERROR,
})