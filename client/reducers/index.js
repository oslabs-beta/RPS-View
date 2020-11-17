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

 const reducers = combineReducers({
   client: clientReducer,
   //add channels reducer here
 })

 export default reducers;