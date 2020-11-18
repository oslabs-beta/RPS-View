/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index.js';
import ReduxThunk from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(ReduxThunk))

const store = createStore(
  reducers, composedEnhancer
);

export default store;
