/**
 * ************************************
 *
 * @module  channelReducer
 * @author Mark, Joe
 * @date 11/16.
 * @description reducer for market data
 *
 * ************************************
 */

import * as types from "../constants/actionTypes";

const initialState = {
    totalChannels = 0,
    channelList = [],
};

const channelsReducer = (state = initialState, action) => { 
    //add channel 
    //delete channel
    //update channel subscribers
    //update channel messages
}
  
export default channelsReducer; 