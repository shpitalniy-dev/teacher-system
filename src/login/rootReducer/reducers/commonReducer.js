import config from "../../config";
import actionTypes from "../../constants/actionTypes";

const initialState = {
    isAuth: config.defaultIsAuth,
    isModal: config.defaultIsModal,
    modal: config.defaultModal
}

export const commonReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_MODE: 
            return {
                ...state,
                isAuth: !state.isAuth,
            };
        case actionTypes.TOGGLE_MODAL_WINDOW: 
            return {
                ...state,
                isModal: !state.isModal,
            };
        case actionTypes.TOGGLE_MODAL:
            return {
                ...state,
                modal: {
                    isOpen: action.payload.isOpen,
                    content: action.payload.content
                }
            }
        default:
            return state;
    }
}