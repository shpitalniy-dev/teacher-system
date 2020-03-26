import config from "../../config";
import actionTypes from "../../constants/actionTypes";

const getCurrentTeacher = () => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    return teacher ? teacher : config.defaultTeacher;
}

const currentTeacher = getCurrentTeacher();

const initialState = {
    teacher: currentTeacher,
    update: config.defaultUpdate,
    activeGroup: config.defaultActiveGroup,
    groupNames: config.defaultGroupNames,
    usersRawData: config.defaultUsersRawData,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GROUP_NAMES:
            return {
                ...state,
                groupNames: action.payload
            };
        case actionTypes.SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroup: action.payload
            }
        case actionTypes.SET_USERS_RAW_DATA:
            return {
                ...state,
                usersRawData: action.payload
            }
        case actionTypes.SET_UPDATE_STUDENT:
            return{
                ...state,
                update: action.payload
            }
        default:
            return state;
    }
}