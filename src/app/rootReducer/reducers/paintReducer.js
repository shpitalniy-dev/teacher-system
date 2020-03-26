import actionTypes from "../../constants/actionTypes";
import config from "../../config";

const initialState = {
    lines: config.defaultLines,
}

export const paintReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_LINES:
            return {
                ...state,
                lines: action.payload,
           };
        default:
            return state;
    }
}