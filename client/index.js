/**Entry point for application, app should be rendered from here */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import App from './containers/App.jsx';
import store from "./store";


render(

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
