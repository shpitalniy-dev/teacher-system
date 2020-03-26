import config from "../../config";
import actionTypes from "../../constants/actionTypes";

const initialState = {
    activeChat: config.defaultActiveChat,
    chats: config.defaultChats,
    users: config.defaultUsers,
    isRead: config.defaultIsRead,
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHAT_INIT:
            return {
                ...state,
                chats: action.payload,
            };
        case actionTypes.USERS_INIT:
            return {
                ...state,
                users: action.payload,
            };
        case actionTypes.SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.payload,
            };
        case actionTypes.SET_IS_READ:
            return {
                ...state,
                isRead: action.payload,
            }
        default:
            return state;
    }
}