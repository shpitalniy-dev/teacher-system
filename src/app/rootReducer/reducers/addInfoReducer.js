import actionTypes from "../../constants/actionTypes";
import config from "../../config";

const initialState = {
    isStateButtonAddInfo: config.defaultAddInfoButton,
};

export const addInfoReducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.CHANGE_BUTTON_ADD_INFO:
            return {
                ...state,
                isStateButtonAddInfo: !state.isStateButtonAddInfo,
            };
        default:
            return state;
    }
    console.log("+@+@+@", isStateButtonUserProfile)
};