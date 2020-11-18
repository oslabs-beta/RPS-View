/**
 * ************************************
 *
 * @module  ChannelContainer
 * @authors joeseph & mark
 * @date 
 * @description stateful component that reders 
 *
 * ************************************
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import ChannelsDisplay from "../components/ChannelsDisplay.jsx";
import * as actions from "../actions/actions";


const mapStateToProps = (store) => ({
    totalChannels : store.channels.totalChannels,
    channelList : store.channels.channelList,
    selectedChannel: store.channels.selectedChannel
})

const mapDispatchToProps = (dispatch) => ({
  selectChannel: (e)=>{
    dispatch(actions.selectChannel(e.target.innerText))
  }
});

class ChannelContainer extends Component{
    constructor(props){
        super(props);
    }
    render () {
      return (
        <div>
          <h1>Channel Bar</h1>
          <ChannelsDisplay 
          totalChannels = {this.props.totalChannels}
          channelList = {this.props.channelList}
          selectedChannel = {this.props.selectedChannel}
          
          selectChannel = {this.props.selectChannel}
          />
        </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer)