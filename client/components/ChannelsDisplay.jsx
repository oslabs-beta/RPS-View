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
        displayArr.push(<OneChannel
        name={props.channelList[i].name}
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