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
import ClientMenu from './ClientMenu.jsx';
import ChannelContainer from './ChannelContainer.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  render(){
    return (
      <>
        <h2>hello the app is loading</h2>
        <NavBar/>
        <ClientMenu />
        <ChannelContainer />
      </>
      
    )
    
  }
}

export default App;
