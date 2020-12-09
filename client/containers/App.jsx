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
import { connect } from "react-redux";
import '../styles/styles.scss';
import ClientMenu from './ClientMenu.jsx';
import ChannelContainer from './ChannelContainer.jsx';
import ClientWindow from './ClientWindow.jsx';
import NavBar from './NavBar.jsx';
import img from '../../static/RPS_View_logo.png';
import ErrorBox from './ErrorBox.jsx';
import * as middleware from '../actions/middleware.js';

const URL = 'ws://localhost:3030';


const mapDispatchToProps = (dispatch) => ({
  socketReceivedMessage: (stateObj) => {
    dispatch(middleware.socketReceivedMessage(stateObj))
  },
})

class App extends Component {
  constructor (props) {
    super(props);
    this.ws = new WebSocket(URL)
  }


  componentDidMount(){
    this.ws.onopen = () => { 
      this.ws.onmessage = (event) => {
        const messages = JSON.parse(event.data);
        this.props.socketReceivedMessage(messages);
      };
      };
  }

  componentWillUnmount(){
    this.ws.close();
  }
  
  render(){
    return (
      <>
      <div className="left">
        {/* <div className="logo">
          {/* logo here later */}
          {/* <img className="logoImg" src={img} alt="Logo"></img> */} 
        {/* </div> */}
        <ChannelContainer />
      </div>
      <div className="middle">
        <NavBar ws={this.ws}/>
        <ClientWindow ws={this.ws}/>
        <ErrorBox />
      </div>
      <div className="right">
        <ClientMenu />
      </div>
        
        
        
        
      </>
      
    )
    
  }
}

export default connect(null, mapDispatchToProps)(App);
