/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import {combineReducers} from 'redux';

import clientReducer  from './clientReducer.js';
import channelsReducer from './channelsReducer';
import errorReducer from './errorReducer';

const reducers = combineReducers({
  client: clientReducer,
  //add channels reducer here
  channels: channelsReducer,
  //adding error reducer
  error: errorReducer,
})


// make the combined reducers available for import
export default reducers;

