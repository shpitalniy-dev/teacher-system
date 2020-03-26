import config from "../../config";
import actionTypes from "../../constants/actionTypes";
import { getTranslatesByLocale } from "../../translates/translates";

const getCurrentLocale = () => {
    const language = localStorage.getItem("language");
    return language ? language : config.defaultLocale;
}
const currentLocale = getCurrentLocale();

const initialState = {
    locale: currentLocale,
    dictionary: getTranslatesByLocale(currentLocale),
}

export const translatesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_LOCALE: 
            return {
                ...state,
                locale: action.payload,
                dictionary: getTranslatesByLocale(action.payload),
            };
        default:
            return state;
    }
}