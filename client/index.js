/**Entry point for application, app should be rendered from here */

import React from 'react';
import { render } from 'react-dom';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import store from './store.js';
=======
import { Provider } from "react-redux";
import App from './containers/App.jsx';
import store from "./store";

>>>>>>> 8b14b9d2723fd8981cf70db04f7a457c18236bdb

// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
<<<<<<< HEAD
  <Provider store = { store }>
=======

  <Provider store={store}>
>>>>>>> 8b14b9d2723fd8981cf70db04f7a457c18236bdb
    <App />
  </Provider>,
  document.getElementById('root')
);
