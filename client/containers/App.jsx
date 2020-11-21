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


// let ws = new WebSocket('ws://'+location.host+"/")
// let ws = new WebSocket('ws://localhost:3030')


// {/* <script>
// const getElement = (id) => document.getElementById(id);
// const addMessage = (message) => {
// const pTag = document.createElement('p');
// pTag.appendChild(document.createTextNode(message));
// getElement('messages').appendChild(pTag);
// };
// const ws = new WebSocket('ws://localhost:3030');
// ws.onopen = () => { 
// console.log('Now connected'); 
// };
// ws.onmessage = (event) => {
// const messages = JSON.parse(event.data);
// messages.forEach(addMessage);
// };
// const fire = () => {
// const username = getElement('name').value || '???'
// ws.send(`${username}: ${getElement('message').value}`);
// getElement('message').value = '';
// };


// </script> */}


class App extends Component {
  
  render(){
    return (
      <>
      <div className="left">
        <div className="logo">
          {/* logo here later */}
        </div>
        <ChannelContainer />
      </div>
      <div className="middle">
        <NavBar/>
        <ClientWindow />
      </div>
      <div className="right">
        <ClientMenu />
      </div>
        
        
        
        
      </>
      
    )
    
  }
}

export default App;
