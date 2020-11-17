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

const reducers = combineReducers({
  client: clientReducer,
  //add channels reducer here
  channels: channelsReducer,
})


// make the combined reducers available for import
export default reducers;

