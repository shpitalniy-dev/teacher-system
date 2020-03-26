import actionTypes from "../../constants/actionTypes";
import config from "../../config";

const initialState = {
    adminRawData: config.defaultAdminRawData,
}

export const adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_ADMIN_RAW_DATA:
            return {
                ...state,
                adminRawData: action.payload,
           };
        default:
            return state;
    }
}