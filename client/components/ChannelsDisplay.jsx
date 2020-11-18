/**
 * ************************************
 *
 * @module  ChannelsDisplay
 * @author joe, mark
 * @date 11/16.
 * @description presentation component that renders in ChannelContainer
 *
 * ************************************
 */

import React from "react";
import OneChannel from "./OneChannel.jsx";

const ChannelsDisplay = (props) => {
    
    const displayArr = [];
    for(let i = 0; i < props.channelList.length; i++){
        let changecolor = 'red';
        console.log(props.selectedChannel === props.channelList[i].name)
        if(props.selectedChannel === props.channelList[i].name){
            changecolor = 'blue'
        }

        displayArr.push(<OneChannel
        selectChannel = {props.selectChannel}
        name={props.channelList[i].name}
        color = {changecolor}
        key={i}
        />)
    }

    return (
        <div className = "channelBarDisplay">
            <p>Display all Channels</p>
            {displayArr}
        </div>
    )
}

export default ChannelsDisplay;