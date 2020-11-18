/**
 * ************************************
 *
 * @module  ClientCard.jsx
 * @author
 * @date
 * @description Display a client
 *
 * ************************************
 */

import React from "react";

const ClientCard = (props) => {
  //button with className clientCard
  //name of client 
  //id of clientID
  //key of clientID (react needs unique keys for re rendering)
  //onclick functionality -- setClient (from props) -- pass in the clientId event.target.id
  
  //FIND subbed channel 
  let selectedChannel = props.selectedChannel;
  let channels = props.channels;
  let highlight = 'unhighlighted';
  channels.forEach(element => {
    if(element === selectedChannel){
      highlight = 'highlighted';
    }
  });
  return (
    <button
      className = {`clientCard ${highlight}`}
      // selectedChannel = {this.props.selectedChannel}
      id = {props.id} 
      key = {props.id} 
      onClick = {e => {
        props.setClient(e.target.id);
      }}
    >
      {props.id}

    </button>
  );
}

export default ClientCard;
