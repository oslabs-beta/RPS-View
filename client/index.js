/**Entry point for application, app should be rendered from here */

import React from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';


// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('root')
);
