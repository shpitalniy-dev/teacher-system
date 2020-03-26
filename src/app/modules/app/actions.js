import actionTypes from "../../constants/actionTypes";

export const setGroupNames = payload => ({ type: actionTypes.SET_GROUP_NAMES, payload });
export const setActiveGroup = payload => ({ type: actionTypes.SET_ACTIVE_GROUP, payload });
export const setUsersRawData = payload => ({ type: actionTypes.SET_USERS_RAW_DATA, payload });
export const setUpdateStudent = payload => ({ type: actionTypes.SET_UPDATE_STUDENT, payload});
export const setConfirm = payload => ({type: actionTypes.TOGGLE_CONFIRM, payload});
export const changeButtonSidebarState = () => ({ type: actionTypes.CHANGE_BUTTON_ACCOUNT_SIDEBAR});
export const changeButtonChatState = () => ({ type: actionTypes.CHANGE_BUTTON_ACCOUNT_CHAT});

export const changeBtnActions = () => ({ type: actionTypes.CHANGE_BUTTON});