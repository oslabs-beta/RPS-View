/**
 * ************************************
 *
 * @module  MessageBox.jsx
 * @author Lara, Elise
 * @date
 * @description 
 *
 * ************************************
*/

import React from 'react';

const MessageBox = (props) => {
  //determine whether type is "received" or "published"

  //if received
    //<p>RECEIVED</p>
    //<p>by {channel} </p>
    //<p>at DATE/TIME</p>
    //<p>message</p>
  
    //if published
    //<p>PUBLISHED</p>
    //<p>to {channel} </p>
    //<p>at DATE/TIME</p>
    //<p>message</p>
  
  if (props.type === "received") {
    return (
      <div className ="messageBox">
        <p>RECEIVED</p>
        <p>on {props.channel} </p>
        <p>at {props.timestamp}</p>
        <p>{props.message}</p>
      </div>
    )
  }
  if (props.type === "published") {
    return (
      <div className ="messageBox">
        <p>PUBLISHED</p>
        <p>on {props.channel} </p>
        <p>at {props.timestamp}</p>
        <p>{props.message}</p>
      </div>
    )
  }

}

export default MessageBox;