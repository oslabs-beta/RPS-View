/**
 * ************************************
 *
 * @module  ClientMenu.jsx
 * @author Lara, Elise
 * @date
 * @description stateful container, has access to clientReducers
 * clientMenu -- loops through each client, gets custom style & renders passing custom style as prop
 * render individual client cards - need currClient and clients from client clientReducer
 * ***TO DO **** they also need access to channels from channels reducer and currChannel from channelsReducer
 * a client card needs setClient action
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import child components
import ClientCard from '../components/ClientCard.jsx';
//import any actions we use
import * as actions from '../actions/actions.js';

//mapState
const mapStateToProps = (state) => {
  const { message, currClient, channel, clients } = state.client;

  return ({
    message,
    currClient,
    channel, 
    clients,
    selectedChannel: state.channels.selectedChannel
  })
};

//mapDispatch
const mapDispatchToProps = dispatch => ({
  setClient: (clientId) => {
    dispatch(actions.setClient(clientId))
  }
})


//class ClientMenu
class ClientMenu extends Component{
  constructor(props){
    super(props)
  }
  //renders cards
  render(){
    const clients = [];
    for (let clientId in this.props.clients) {
      
      clients.push(<ClientCard 
        channels = {this.props.clients[clientId].channels} 
        selectedChannel = {this.props.selectedChannel}
        id={clientId} 
        setClient={this.props.setClient} />)
    }
    return (
      <>
        <h2> these are clients</h2>
        <div className = "clientMenuContainer">
          {clients}
        </div>
      </>
    )
  }
}




//use connect to connect mapState, etc.
export default connect(mapStateToProps, mapDispatchToProps)(ClientMenu);