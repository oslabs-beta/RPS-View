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
import * as actions from "../actions/channelActions.js";


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
        <>
          <ChannelsDisplay 
            {...this.props}
          />
        </>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer)