import React, { Component } from "react";
import { connect } from "react-redux";
import * as channelActions from "../actions/channelActions";
import * as errorActions from "../actions/errorActions";
import * as clientActions from "../actions/clientActions";
import * as middleware from "../actions/middleware";


const mapStateToProps = (state) => ({
  portErrorMessage: state.channels.portErrorMessage,
  nextClientId: state.client.nextClientId,
  errorMessage: state.client.errorMessage,
  channels: state.channels.channelList,
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
    } 
});

class NavBar extends Component {
  constructor(props) {
    super(props) 
    
  }

  state = {
    channelText: '',
    port: '',
    type: '',
  }

 
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
      return(
        <div className="navBar">
          <div className="navLeft">
          {/* connect to server, require input and a submit button */}
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
            <div className="navLeftBotton"> 
              <p>{this.props.portErrorMessage}</p>
            </div>
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
                {type: this.state.type, clientId: this.props.nextClientId})
                this.setState({...this.state, type: ''});
              }}
          >
            Add Client</button>
            <div > 
              <p>{this.props.errorMessage}</p>
            </div>
          </div>
          
        </div>
      )
  }
  
}


// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)