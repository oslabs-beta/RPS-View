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
import * as actions from '../actions/clientActions.js';
//import child components
import MessageLogDisplay from '../components/MessageLogDisplay.jsx';
import SubscribedChannels from '../components/SubscribedChannelsDisplay.jsx';
import PublisherActions from './PublisherActions.jsx';
import SubscriberActions from './SubscriberActions.jsx';

//mapstate
const mapStateToProps = (state) => ({
  //either null or a clientId, says what to display
  currClient: state.client.currClient,
  //clients will be the object for the currClient only
  clients: state.client.clients[state.client.currClient],
});

//mapDispatch
const mapDispatchToProps = dispatch => ({
  setClient: (clientId) => {
    dispatch(actions.setClient(clientId))
  }
})

//create class
class ClientWindow extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    if (this.props.currClient !== null) {

      //actions will be the component that renders based on whether pub or sub
      //channelDisplayMessage will be the heading that shows before the Channels Display component rendered
      let actions;
      let channelDisplayMessage;
      let heading;
      if (this.props.clients.type === "publisher") {
        actions = <PublisherActions />;
        channelDisplayMessage = 'Publishes to channels';
        heading = "Publisher";
      }
      else {
        actions = <SubscriberActions />;
        channelDisplayMessage = 'Subscribed channels';
        heading = "Subscriber";
      }


      return (
        <div className = "clientWindow">
          <div className="top">
            <h3 className="clientHeader">Client {this.props.currClient}: {heading}</h3>
            <button id="x" className="secondaryButton" onClick={(e) => {this.props.setClient(this.props.currClient)}}>X</button>
          </div>
          <div className="center">
            <div className="messageLogDisplay">
              <h4 className="clientWindowMessageLabel">Recent Messages</h4>
              <MessageLogDisplay
                log = {this.props.clients.log}
              />
              
            </div>
            <div className="subscribedChannels">
              <h4 className="clientWindowSubscribedLabel">{channelDisplayMessage}</h4>
              <SubscribedChannels channels = {this.props.clients.channels}/>
            </div>
          </div>
          <div className = "bottom">
           
            {actions}
          </div>
        </div>

      )
    } 
    return (<></>)
  }
}
//render MessageLogDisplay
 
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(ClientWindow);