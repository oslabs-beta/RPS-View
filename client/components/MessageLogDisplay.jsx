/**
 * ************************************
 *
 * @module  MessageLogDisplay.jsx
 * @author Lara, Elise
 * @date
 * @description message log display is a functional component rendering messageBoxes for each message in the message log (TODO -- display fewer? add more with scroll?)
 *
 * ************************************
*/

import React from 'react';
import MessageBox from './MessageBox.jsx';

const MessageLogDisplay = (props) => {
  console.log(props);
  //props.log is an array of objects
  //for each message, display <div> with className = "messageBox"
  //need message, timestamp, type, channel  
  //need messages to display in reverse order (by time)

  const messages = [];
  for (let i = props.log.length - 1; i >= 0; i--){
    let msgObj = props.log[i];
    messages.push(<MessageBox key={`msg${i}`} {...msgObj}/>);
  }

  return (
    <div className = "MessageLogDisplay">
      {messages}
    </div>
  )
}

export default MessageLogDisplay;