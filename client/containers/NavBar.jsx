/**
 * ************************************
 *
 * @module  NavBar.jsx
 * @author
 * @date
 * @description Stateful component that handles addPort, addClient, addChannel
 *
 * ************************************
 */


import React, { Component } from "react";
import { connect } from "react-redux";
import * as channelActions from "../actions/channelActions";
import * as errorActions from "../actions/errorActions";
import * as clientActions from "../actions/clientActions.js";
import * as middleware from "../actions/middleware.js";
// const URL = 'ws://localhost:3030'

const mapStateToProps = (state) => ({
  portErrorMessage: state.channels.portErrorMessage,
  nextClientId: state.client.nextClientId,
  errorMessage: state.client.errorMessage,
  channels: state.channels.channelList,
  connectPort: state.channels.port,
})

const mapDispatchToProps = (dispatch) => ({
    addChannel: (e)=>{
        dispatch(channelActions.addChannel(e))
    },
    // data {type, clientId}
    fetchAddClient: (data)=>{
        dispatch(middleware.fetchAddClient(data))
    },
    fetchConnect: (port) => {
      dispatch(middleware.fetchConnect(port))
    },
    fetchAddChannel: (channelText) => {
      dispatch(middleware.fetchAddChannel(channelText))
    },
    // socketReceivedMessage: (stateObj) => {
    //   dispatch(middleware.socketReceivedMessage(stateObj))
    // }

});

class NavBar extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      //temp input tracking
      channelText: '',
      port: '',
      type: '',
    }
  }

  // ws = new WebSocket(URL)

  // componentDidMount(){
  //   this.ws.onopen = () => { 
  //     console.log('Now connected'); 
  //     // this.ws.send(JSON.stringify({hi:"hi"}))
  //     this.ws.onmessage = (event) => {
  //       const messages = JSON.parse(event.data);
  //       this.props.socketReceivedMessage(messages);
  //     };
  //     };
  // }

  

 
  //trigger fetch request and add port to state when connect button is clicked
  handlePortSubmit = (event) => {
    event.preventDefault();
    this.props.fetchConnect(this.state.port);
    this.setState({...this.state, port: ''});
  }

  handleChannelChange = (event, key) => {
    //   console.log(this.state)
      this.setState({
          [key]: event.target.value
      })
  }

  handleChannelSubmit = event => {
    //   console.log(this.state)
      event.preventDefault();
      //TODO add check for repeated channels
      this.props.fetchAddChannel(this.state.channelText);
      this.props.addChannel(this.state.channelText)
      this.setState({
        ...this.state,
        channelText: '',
      })
  }

  render(){
      console.log('navbar rendering, props are', this.props)
      //if client state is empty string, display 'input server ip' and connect
        //button should fetch connect
      //if port state is not empty, display port number and DISCONNECT
        //button should refresh the page, which disconnect from server
      let servePort;
      if(this.props.connectPort === null) {
        servePort = 
        <div className="navLeftTop">
              <input 
                className="serverInput" 
                placeholder = "Input Server IP" 
                value = {this.state.port} 
                onChange={event => this.handleChannelChange(event, 'port')}/>
              {/* add fetchconnect to onclick */}
              <button 
                className="primaryButton" 
                type="button" 
                onClick={event => this.handlePortSubmit(event)}>CONNECT
              </button>
            </div>
      } else {
        servePort =
        <div className="navLeftTop">
              <input 
                className="serverInput" 
                //placeholder should show the PORT connected 
                placeholder = {this.props.connectPort}
                value = {this.state.port} 
                onChange={event => this.handleChannelChange(event, 'port')}/>
              {/* add fetchconnect to onclick */}
              <button 
                //update className to style disconnect different 
                className="primaryButton" 
                type="button" 
                onClick={(event) => window.location.reload()}>DISCONNECT
              </button>
            </div>
      }
      return(
        <div className="navBar">
          <div className="navLeft">
          {/* connect to server, require input and a submit button */}
            {servePort}
          </div>

          <div className="navCenter">
          {/* add channel, require input and a submit button
              connect to channel reducer */}
          <input 
            className="channelInput" 
            placeholder="Input Channel Name" 
            value ={this.state.channelText} 
            onChange={event => this.handleChannelChange(event, 'channelText')} />
          <button 
            className = "secondaryButton" 
            type="button" 
            onClick= {event=>this.handleChannelSubmit(event)}>Add Channel
          </button>
          </div>

          <div className="navRight">
          {/* add client, require input and a submit button
              connect to client reducer */}
          {/* <input className="clientInput" placeholder = "Input Client Name"/> */}
          <select
          
            className="dropDown" 
            value={this.state.type} 
            onChange={(e) => 
              this.handleChannelChange(e, 'type')
            }
          >
            <option value="">Choose Client Type</option>
            <option value="publisher">Publisher</option>
            <option value="subscriber">Subscriber</option>
       
          </select>
          <button 
            className="secondaryButton" 
            type="button" 
            onClick={() => {
              console.log('add client button clicked!')
              this.props.fetchAddClient(
                {type: this.state.type, clientId: this.props.nextClientId, ws: this.props.ws})
                this.setState({...this.state, type: ''});
              }}
          >
            Add Client</button>
          </div>
          
        </div>
      )
  }
  
}


// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)