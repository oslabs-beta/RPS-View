/**
 * ************************************
 *
 * @module  ClientActionBar.jsx
 * @author
 * @date
 * @description Stateful component that handles subscribe, unsubscribe, message, addClient
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import actions
import * as actions from '../actions/clientActions.js';
import * as middleware from '../actions/middleware.js';

//mapstate
const mapStateToProps = (state) => ({
  currClient: state.client.currClient,
  channels: state.channels.channelList,
  message: state.client.message,
  channel: state.client.channel,
  selectedAction: state.client.selectedAction,
});

//map dispatch
const mapDispatchToProps = (dispatch) => ({
  //handleClientInput => handles messages and channels
  handleClientInput: (payload) => dispatch(actions.handleClientInput(payload)),
  //subscribe
  subscribe: () => dispatch(actions.subscribe),
  //unsubscribe
  unsubscribe: () => dispatch(actions.unsubscribe),
  //publish
  addMessage: () => dispatch(actions.addMessage),
  //get handleGoClick
  handleGoClick: (selectedAction) => dispatch(middleware.handleGoClick(selectedAction))
});

class ClientActionBar extends Component{
  constructor(props){
    super(props);
    // this.handleGoClick = this.handleGoClick.bind(this);
  }

  render(){
    
    //create arr of option value elements
    let channels = this.props.channels;
    
    let channelsArray = [];
    
    channels.forEach((channel, i) => {
      channelsArray.push(<option key={`channelId${i}`} value={channel.name}>{channel.name}</option>)
    })
    
    return (
      <div className="actionBar">
        {/* two drop downs, input, and button */}
        {/* dropdown menu to select channel */}
        <select className="dropDown"
          value={this.props.channel}
          onChange={(e) => this.props.handleClientInput(
            {property: 'channel', value: e.target.value}
          )}
        >
          <option value="selectChannel">Choose Channel</option>
          {channelsArray}
        </select>

        {/* dropdown menu to select action */}
        <select 
          className="dropDown" 
          value={this.props.selectedAction} 
          onChange={(e) => this.props.handleClientInput(
            {property: 'selectedAction', value: e.target.value}
          )}
        >
          <option value="">Choose Action</option>
          <option value="addMessage">Add Message</option>
          <option value="subscribe">Subscribe</option>
          <option value="unsubscribe">Unsubscribe</option>
        </select>

        <input type="text" 
          id="actionBarInput" 
          name="actionBarInput" 
          placeholder="Add message here"
          value = {this.props.message}
          onChange={(e) => this.props.handleClientInput(
            {property: 'message', value: e.target.value}
          )}/>

        <button 
          className = "primaryButton" 
          id = "goButton"
          onClick={() => {this.props.handleGoClick({ selectedAction: this.props.selectedAction, currClient: this.props.currClient, 
          message: this.props.message, channel: this.props.channel })}}
        >
          Go
        </button>
        
      </div>
    )
  }
}






  

export default connect(mapStateToProps, mapDispatchToProps)(ClientActionBar);
