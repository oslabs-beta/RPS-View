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
    totalChannels : 0,
    channelList : [{name:"Joe"}],
    //add state for currently clicked channel
};

const channelsReducer = (state = initialState, action) => {
  let channelList;

    switch(action.type){
        //add channel 
        case types.ADD_CHANNEL:
            
            //create a new channel object
            let newChannel = {
                //connect with ws and redis? 
                name : action.payload,
            }

            channelList = state.channelList.slice();
            channelList.push(newChannel);

            return{
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
                totalChannels : state.totalChannels -1,
                channelList : updatedArr
            }
        
        //add channel subscribers

        //delete channel subscribers
        //update channel messages
        default:
            return state;
    }

}
  
export default channelsReducer; 