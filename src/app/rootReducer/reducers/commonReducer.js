import config from "../../config";
import actionTypes from "../../constants/actionTypes";

const initialState = {
    activeMode: config.defaultMode,
    isModal: config.defaultIsModal,
    modal: config.defaultModal,
    confirm: config.defaultConfirm,
};

export const commonReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_MODE: 
            return {
                ...state,
                activeMode: action.payload,
            };
        case actionTypes.TOGGLE_MODAL_WINDOW: 
            return {
                ...state,
                isModal: !state.isModal,
            };
        case actionTypes.TOGGLE_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case actionTypes.TOGGLE_CONFIRM:
            return {
                ...state,
                confirm: action.payload
            }
        default:
            return state;
    }
}