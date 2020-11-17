/**
 * ************************************
 *
 * @module  ClientWindow.jsx
 * @author Lara, Elise
 * @date
 * @description stateful component with access to clientReducers actions
 * subscribe, 
 * unsubscribe, 
 * message, 
 * handleClientInput
 * 
 * access to state (client)
 * currClient ( only displays if currClient is not null)
 * 
 * access to state (channelss)
 * currClient ( only displays if currClient is not null)
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import actions
import * as actions from '../actions/actions.js';
//import child components
import MessageLogDisplay from '../components/MessageLogDisplay.jsx'

//mapstate
const mapStateToProps = (state) => ({
  //either null or a clientId, says what to display
  currClient: state.client.currClient,
  //clients will be the object for the currClient only
  clients: state.client.clients[state.client.currClient],
  channels: state.channels.channels,
});

//map dispatch
const mapDispatchToProps = (dispatch) => ({
  
});

//create class
class ClientWindow extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.currClient !== null) {
      return (
        <div className="messageLogDisplay">
          <MessageLogDisplay
            log = {this.props.clients.log}
          />
        </div>
      )
    } 
    return (<></>)
  }
}
//render MessageLogDisplay
 
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(ClientWindow);