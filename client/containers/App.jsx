/**
 * ************************************
 *
 * @module  App.jsx
 * @author All
 * @date
 * @description renders React app
 *
 * ************************************
 */

import React, {Component} from 'react';
import '../styles/styles.scss';
import ClientMenu from './ClientMenu.jsx';
import ChannelContainer from './ChannelContainer.jsx';
import ClientWindow from './ClientWindow.jsx';
import NavBar from './NavBar.jsx';
import img from '../../static/RPS_View_logo.png';
// import ErrorBox from './ErrorBox.jsx'
import ErrorBox from './ErrorBox.jsx'

class App extends Component {
  
  render(){
    return (
      <>
      <div className="left">
        <div className="logo">
          {/* logo here later */}
          <img className="logoImg" src={img} alt="Logo"></img>
        </div>
        <ChannelContainer />
      </div>
      <div className="middle">
        <NavBar/>
        <ClientWindow />
        <ErrorBox />
      </div>
      <div className="right">
        <ClientMenu />
      </div>
        
        
        
        
      </>
      
    )
    
  }
}

export default App;
