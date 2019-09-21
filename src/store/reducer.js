import { ADD_MESSAGE_OPTION, DELETE_MESSAGE_OPTION } from './actionType';

export const defaultState = localStorage.getItem('_itemlist') ? JSON.parse(localStorage.getItem('_itemlist')) : ['学习react', 'hook新特性'];

export default function (state = defaultState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_MESSAGE_OPTION:
            newState.push(action.message);
            return [...newState];
        case DELETE_MESSAGE_OPTION:
            newState.splice(action.index, 1);
            return [...newState];
        default:
            return state;
    }
}