/**
 * ************************************
 *
 * @module  actionTypes.js
 * @author
 * @date
 * @description all the action types
 *
 * ************************************
 */

//subscribe, unsubscribe, message, addClient
export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const PUBLISH_MESSAGE = "PUBLISH_MESSAGE";
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
export const ADD_CLIENT = 'ADD_CLIENT';
export const HANDLE_CLIENT_INPUT = 'HANDLE_CLIENT_INPUT';
export const SET_CLIENT = 'SET_CLIENT';

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';
// export const ADD_CHANNEL_SUBSCRIBER = 'ADD_CHANNEL_SUBSCRIBER'
// export const DELETE_CHANNEL_SUBSCRIBER = 'DELETE_CHANNEL_SUBSCRIBER'
// export const ADD_CHANNEL_MESSAGES = 'ADD_CHANNEL_MESSAGES'

export const PORT_CONNECTED = 'PORT_CONNECTED';
export const ERROR_HANDLER = 'ERROR_HANDLER';
export const CLEAR_ERROR = 'CLEAR_ERROR';