/**
 * ************************************
 *
 * @module  One Channel
 * @author Joe and Mark
 * @date 11/16
 * @description presentation component that renders a single box for each Channel
 *
 * ************************************
 */

import React from "react";

const OneChannel = (props)=>{
    return(
    <div className="OneChannel">
        <button id={props.color} onClick={props.selectChannel}>{props.name}</button>
      
    </div>
    )
}

export default OneChannel;