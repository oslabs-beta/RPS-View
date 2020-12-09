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

  let theDate = props.timestamp.substr(0, 15);
  let theTime = props.timestamp.substr(16, 8);

  if (props.type === "received") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType"><span className="bold">RECEIVED</span></p>
        <p className="messageBoxChannel">on <span className="bold">{props.channel} </span></p>
        <p className="messageBoxTime">on <span className="bold">{theDate}</span> at <span className="bold">{theTime}</span></p>
        <p className="messageBoxMessage">"{props.message}"</p>
      </div>
    )
  }
  if (props.type === "published") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType"><span className="bold">PUBLISHED</span></p>
        <p className="messageBoxChannel">on <span className="bold">{props.channel} </span></p>
        <p className="messageBoxTime">on <span className="bold">{theDate}</span> at <span className="bold">{theTime}</span></p>
        <p className="messageBoxMessage">"{props.message}"</p>
      </div>
    )
  }
  if (props.type === "subscribed") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType"><span className="bold">SUBSCRIBED</span></p>
        <p className="messageBoxChannel">to <span className="bold">{props.channel} </span></p>
        <p className="messageBoxTime">on <span className="bold">{theDate}</span> at <span className="bold">{theTime}</span></p>
      </div>
    )
  }
  if (props.type === "unsubscribed") {
    return (
      <div className ="messageBox">
        <p className="messageBoxType"><span className="bold">UNSUBSCRIBED</span></p>
        <p className="messageBoxChannel">from <span className="bold">{props.channel} </span></p>
        <p className="messageBoxTime">on <span className="bold">{theDate}</span> at <span className="bold">{theTime}</span></p>
      </div>
    )
  }

}

export default MessageBox;