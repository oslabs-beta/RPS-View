/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */


//import actionType constants
import * as types from '../constants/actionTypes';

export const addChannel = (channelName) => ({
    type: types.ADD_CHANNEL,
    payload: channelName,
  });

export const deleteChannel = (channelName) => ({
    type: types.DELETE_CHANNEL,
    payload: channelName,
});

// export const addChannelSubscriber = (channelName, userName) => ({
//     type: types.ADD_CHANNEL_SUBSCRIBER,
//     payload: {
//         channelName,
//         userName
//     },
// });

// export const deleteChannelSubscriber = (channelName, userName) => ({
//     type: types.DELETE_CHANNEL_SUBSCRIBER,
//     payload: {
//         channelName,
//         userName
//     },
// });

