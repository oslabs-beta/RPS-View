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
import * as actions from '../actions/clientActions.js';

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
    const clients = {pubs:[], subs:[]};
    let pub
    let sub
    for (let clientId in this.props.clients) {
      
      if(this.props.clients[clientId].type === "subscriber"){
        sub = "Subscribers";
        clients.subs.push(<ClientCard 
          channels = {this.props.clients[clientId].channels} 
          type = {this.props.clients[clientId].type}
          selectedChannel = {this.props.selectedChannel}
          id={clientId} 
          key={`ClientCard${clientId}`}
          setClient={this.props.setClient} />
        )
      }else if (this.props.clients){
        pub = "Publishers";
        clients.pubs.push(<ClientCard 
          channels = {this.props.clients[clientId].channels} 
          type = {this.props.clients[clientId].type}
          selectedChannel = {this.props.selectedChannel}
          id={clientId} 
          key={`ClientCard${clientId}`}
          setClient={this.props.setClient} />
        )
      }
      
    }
    return (
      
      <div className = "clientMenu">
        <div className = "clientLabel">
          <h2>Clients</h2>
        </div>
        
          {pub === 'Publishers' && 
          <div className = "clientMiniLabel">
            <h3 className="miniLabelText">{pub}</h3>
          </div>}
          {clients.pubs}
        
          {sub === 'Subscribers' && 
          <div className = "clientMiniLabel">
            <h3 className="miniLabelText">{sub}</h3>
          </div>}
          {clients.subs}
        
      </div>
      
    )
  }
}




//use connect to connect mapState, etc.
export default connect(mapStateToProps, mapDispatchToProps)(ClientMenu);