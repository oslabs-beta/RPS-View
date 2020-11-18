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


const mapStateToProps = (store) => ({
    totalChannels : store.channels.totalChannels,
    channelList : store.channels.channelList
})

const mapDispatchToProps = (dispatch) => ({});

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
          />
        </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer)