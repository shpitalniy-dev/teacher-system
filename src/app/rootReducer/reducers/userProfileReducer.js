import actionTypes from "../../constants/actionTypes";
import config from "../../config";

const initialState = {
    isChangeMode: false,
    isStateButtonUserProfile: config.defaultStateButtonUserProfile,
};


export const userProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TOGGLE_MODE_USER_PROFILE:
            return {
                ...state,
                isChangeMode: !state.isChangeMode,
            };

        case actionTypes.CHANGE_BUTTON_ACCOUNT_USER_PROFILE:
            return {
                ...state,
                isStateButtonUserProfile: !state.isStateButtonUserProfile,
            };
        default:
            return state;
    }
};