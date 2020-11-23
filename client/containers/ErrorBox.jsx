/**
 * ************************************
 *
 * @module  ErrorBox.jsx
 * @author Lara, Elise
 * @date 11/20
 * @description Stateful component that displays errors
 *
 * ************************************
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as errorActions from "../actions/errorActions.js";

//map state
const mapStateToProps = (state) => ({
  errorMessage: state.error.errorMessage,
})

//map dispatch
const mapDispatchToProps = (dispatch) => ({
  //errorHandler
  errorHandler: (payload) => dispatch(errorActions.errorHandler(payload)),
  //clearError
  clearError: () => dispatch(errorActions.clearError())
});

class ErrorBox extends Component{
  constructor(props){
    super(props);
  }

  render() {
    if (!this.props.errorMessage) return <></>;
    return (
      <div className="errorBox">
        <div className="errorComponents">
          <p>{this.props.errorMessage}</p>
          <button 
            className="errorButton" 
            onClick={() => {this.props.clearError()}}>
              Got It
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);
