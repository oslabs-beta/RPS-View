/**
 * ************************************
 *
 * @module  SubscribedChannelsDisplay.jsx
 * @author Lara, Elise
 * @date
 * @description subscribed channels display gets a prop channels, displays each channel in a list
 *
 * ************************************
*/

import React from 'react';

const SubscribedChannelsDisplay = (props) => {
  
  //props will be an array of strings, each of which is a channel
  //for each string (i.e. element of array), add a <li> to a <ul>
  let channels = props.channels;
  let channelsArray = [];
  
  channels.forEach((channel, i) => {
    channelsArray.push(<li key={`channel${i}`}>{channel}</li>)
  });

  return (
    <ul className="subList">
      {channelsArray}
    </ul>
  )

}

export default SubscribedChannelsDisplay;