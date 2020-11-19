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
    IPtext: '',
  }

  handleChannelChange = (event, key) =>{
    //   console.log(this.state)
      this.setState({
          [key]: event.target.value
      })
  }

  handleChannelSubmit = event => {
    //   console.log(this.state)
      event.preventDefault();
      this.props.addChannel(this.state.channelText)
      this.setState({
        ...this.state,
        channelText: '',
      })
  }

  render(){
      
      return(
        <div className="navBar">
          <div className="navLeft">
          {/* connect to server, require input and a submit button */}
          <input className="serverInput" placeholder = "Input Server IP" value = {this.state.IPtext} onChange={event => this.handleChannelChange(event, 'IPtext')}/>
          <button className="primaryButton" type="button" onClick={(e) => {this.setState({...this.state, IPtext: ''})}}>CONNECT</button>
          </div>

          <div className="navCenter">
          {/* add channel, require input and a submit button
              connect to channel reducer */}
          <input className="channelInput" placeholder="Input Channel Name" value ={this.state.channelText} onChange={event => this.handleChannelChange(event, 'channelText')} />
          <button className = "secondaryButton" type="button" onClick= {event=>this.handleChannelSubmit(event)}>Add Channel</button>
          </div>

          <div className="navRight">
          {/* add client, require input and a submit button
              connect to client reducer */}
          {/* <input className="clientInput" placeholder = "Input Client Name"/> */}
          <button className="secondaryButton" type="button" onClick={this.props.addClient}>Add Client</button>
          </div>
          
        </div>
      )
  }
  
}


// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)