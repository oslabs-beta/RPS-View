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
    channelList : [{name:"Joe"}, {name:"politics"}, {name:"food"}],
    //add state for currently clicked channel
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
            
            //check if the new channel name is already an existing channel, if so, return unaltered state to avoid repetition
            // let isRepeated = false;
            // state.channelList.forEach((el) => {
            //     if (el.name === newChannel.name) isRepeated = true;
            // })
            
            // if (isRepeated === true) return state;

            
            if (state.channelList.some(el => {
                console.log('the el is ', el);
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
            return{
                ...state,
                selectedChannel : action.payload
            }
        
        //add channel subscribers

        //delete channel subscribers
        //update channel messages
        default:
            return state;
    }

}
  
export default channelsReducer; 