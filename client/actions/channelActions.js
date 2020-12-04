/**
 * ************************************
 *
 * @module  channelActions.js
 * @author Lara, Elise
 * @date 11/20
 * @description channel-related actions
 *
 * ************************************
 */
import * as types from '../constants/actionTypes.js';


export const selectChannel = (channelName) => ({
  type : types.SELECT_CHANNEL,
  payload: channelName
})

export const addChannel = (channelName) => ({
    type: types.ADD_CHANNEL,
    payload: channelName,
  });

export const deleteChannel = (channelName) => ({
    type: types.DELETE_CHANNEL,
    payload: channelName,
});

//portConnected
export const portConnected = (data) => ({
  type: types.PORT_CONNECTED,
  payload: data,
});