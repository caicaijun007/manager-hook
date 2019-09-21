import { ADD_MESSAGE_OPTION, DELETE_MESSAGE_OPTION } from './actionType';

export function addMessageOption(message) {
    return {
        type: ADD_MESSAGE_OPTION,
        message
    }
}

export function deleteMessageOption(index) {
    return {
        type: DELETE_MESSAGE_OPTION,
        index
    }
}