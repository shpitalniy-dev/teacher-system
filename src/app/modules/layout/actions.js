import actionTypes from "../../constants/actionTypes";

export const changeMode = payload => ({ type: actionTypes.CHANGE_MODE, payload });
export const changeLocale = payload => ({ type: actionTypes.CHANGE_LOCALE, payload });
export const toggleModalWindow = () => ({ type: actionTypes.TOGGLE_MODAL_WINDOW });
export const initUsers = payload => ({ type: actionTypes.INIT_USERS, payload });
export const toggleModal = payload => ({ type: actionTypes.TOGGLE_MODAL, payload });
export const setConfirm = payload => ({ type: actionTypes.TOGGLE_CONFIRM, payload });
export const setGroupNames = payload => ({ type: actionTypes.SET_GROUP_NAMES, payload });
export const setActiveGroup = payload => ({ type: actionTypes.SET_ACTIVE_GROUP, payload });
export const setUsersRawData = payload => ({ type: actionTypes.SET_USERS_RAW_DATA, payload });
export const setChatUsers = payload => ({ type: actionTypes.USERS_INIT, payload });
export const setChats = payload => ({ type: actionTypes.CHAT_INIT, payload });
export const setActiveChat = payload => ({ type: actionTypes.SET_ACTIVE_CHAT, payload });
export const setIsRead = payload => ({ type: actionTypes.SET_IS_READ, payload });
