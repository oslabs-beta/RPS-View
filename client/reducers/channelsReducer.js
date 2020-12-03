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
    selectedChannel: null,
    totalChannels : 0,
    channelList : [],
    port: null,
};

const channelsReducer = (state = initialState, action) => {
  let channelList;

    switch(action.type){
        //add channel 
        case types.ADD_CHANNEL:
            if (!action.payload) return state;
            //create a new channel object
            let newChannel = {
                //connect with ws and redis? 
                name : action.payload,
            }

            // check if the new channel name is already an existing channel, if so, return unaltered state to avoid repetition
            if (state.channelList.some(el => {
                return el.name === newChannel.name;
            })) return state;

            channelList = state.channelList.slice();
            channelList.push(newChannel);

            return{
                ...state,
                totalChannels : state.totalChannels + 1,
                channelList
            }
        
        
        
        //delete channel
        case types.DELETE_CHANNEL:
            //create new array
            //iterate through old array
            //add elements that arent the delete name on to new array
            //decrease total channels
            //update state
            let updatedArr = [];
            let currentList = state.channelList;
            currentList.forEach(ele => {
              if(ele.name !== action.payload) {
                updateArr.push(ele)
              }
            })
            return {
                ...state,
                totalChannels : state.totalChannels -1,
                channelList : updatedArr
            }
        
        case types.SELECT_CHANNEL:
            let selected;
            if(action.payload === state.selectedChannel) selected = null;
            else selected = action.payload;
            return{
                ...state,
                selectedChannel : selected
            }
        
        //add channel subscribers
        //delete channel subscribers
        //update channel messages

        //case portConnected
        case types.PORT_CONNECTED:
            return{
                ...state,
                port: action.payload || '6379'
            }

        default:
            return state;
    }

}
  
export default channelsReducer; 