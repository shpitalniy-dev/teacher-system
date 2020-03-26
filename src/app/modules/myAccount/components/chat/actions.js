import actionTypes from "../../../../constants/actionTypes";

export const setChats = payload => ({ type: actionTypes.CHAT_INIT, payload });
export const setUsers = payload => ({ type: actionTypes.USERS_INIT, payload });
export const setActiveChat = payload => ({ type: actionTypes.SET_ACTIVE_CHAT, payload });
export const setIsRead = payload => ({ type: actionTypes.SET_IS_READ, payload })