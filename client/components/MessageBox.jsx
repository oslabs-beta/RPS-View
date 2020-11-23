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
        <p className="messageBoxType">RECEIVED</p>
        <p className="messageBoxChannel">on <span className="accentColor">{props.channel} </span></p>
        <p className="messageBoxTime">at <span className="accentColor">{props.timestamp}</span></p>
        <p className="messageBoxMessage">{props.message}</p>
      </div>
    )
  }
  if (props.type === "published") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType">PUBLISHED</p>
        <p className="messageBoxChannel">on {props.channel} </p>
        <p className="messageBoxTime">at {props.timestamp}</p>
        <p className="messageBoxMessage">{props.message}</p>
      </div>
    )
  }
  if (props.type === "subscribed") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType">SUBSCRIBED</p>
        <p className="messageBoxChannel">to {props.channel} </p>
        <p className="messageBoxTime">at {props.timestamp}</p>
      </div>
    )
  }
  if (props.type === "unsubscribed") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType">UNSUBSCRIBED</p>
        <p className="messageBoxChannel">from {props.channel} </p>
        <p className="messageBoxTime">at {props.timestamp}</p>
      </div>
    )
  }

}

export default MessageBox;