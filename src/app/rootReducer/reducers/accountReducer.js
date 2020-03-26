import actionTypes from "../../constants/actionTypes";
import config from "../../config";

const initialState = {
    isStateButtonSidebar: config.defaultAccountSideBarButton,
    isStateButtonChat: config.defaultAccountChatButton,

    isStateBtnInState: config.defaultIsStateBtnInState
}

export const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_BUTTON_ACCOUNT_SIDEBAR:
            return {
            ...state,
                isStateButtonSidebar: !state.isStateButtonSidebar,
//               isStateButton: action.payload,
           };
           case actionTypes.CHANGE_BUTTON_ACCOUNT_CHAT:
                       return {
                       ...state,
                           isStateButtonChat: !state.isStateButtonChat,
           //               isStateButton: action.payload,
                      };
            case actionTypes.CHANGE_BUTTON:
            return {
                       ...state,
                           isStateBtnInState: !state.isStateBtnInState,
           //               isStateButton: action.payload,
                      };
        default:
            return state;
    }
}