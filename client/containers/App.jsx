/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description renders React app
 *
 * ************************************
 */

import React, {Component} from 'react';
import '../styles/styles.scss';
import ChannelContainer from './ChannelContainer.jsx';

class App extends Component {
  render(){
    return (
      <div>
        <h2>hello the app is loading</h2>
        <ChannelContainer />
      </div>
    )
    
  }
}

export default App;
