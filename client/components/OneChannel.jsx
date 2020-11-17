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
        <p>Name of Channel: {props.name}</p>
      
    </div>
    )
}

export default OneChannel;