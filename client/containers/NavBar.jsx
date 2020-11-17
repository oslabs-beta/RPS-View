import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";


const mapStateToProps = (store) => ({})
const mapDispatchToProps = (dispatch) => ({
    addChannel: (e)=>{
        dispatch(actions.addChannel(e))
    },
    addClient: ()=>{
        dispatch(actions.addClient())
    }
});

class NavBar extends Component {
  constructor(props) {
    super(props) 
    
  }

  state = {
    channelText: '',
    
  }

  handleChannelChange = event =>{
    //   console.log(this.state)
      this.setState({
          channelText: event.target.value
      })
  }

  handleChannelSubmit = event => {
    //   console.log(this.state)
      event.preventDefault();
      this.props.addChannel(this.state.channelText)
  }

  render(){
      
      return(
        <div className="navBar">
          {/* connect to server, require input and a submit button */}
          <input className="serverInput" placeholder = "Input Server IP"/>
          <button type="button">CONNECT</button>
          {/* add client, require input and a submit button
              connect to client reducer */}
          {/* <input className="clientInput" placeholder = "Input Client Name"/> */}
          <button type="button" onClick={this.props.addClient}>Add Client</button>
          {/* add channel, require input and a submit button
              connect to channel reducer */}
          <input className="channelInput" placeholder="Input Channel Name" onChange={event => this.handleChannelChange(event)} />
          <button type="button" onClick= {event=>this.handleChannelSubmit(event)}>Add Channel</button>

        </div>
      )
  }
  
}


// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)