import config from "../../config";
import actionTypes from "../../constants/actionTypes";

const initialState = {
    activeMode: config.modules.converter.defaultMode,
    values: {
        inputToValue: '',
        inputFromValue: '',
        selectTo: config.modules.converter.valuesSelectTo,
        selectFrom: config.modules.converter.valuesSelectFrom,
    },
    currencies: {
        inputToValue: '',
        inputFromValue: '',
        selectTo: config.modules.converter.currenciesSelectTo,
        selectFrom: config.modules.converter.currenciesSelectFrom,
    }
};

export const converterReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_CONVERTER_MODE:
            return {
                ...state,
                activeMode: action.payload,
            };
        case actionTypes.SAVE_CONVERTER_VALUES_INPUTS:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload.inputName]: action.payload.inputValue,
                },
            };
        case actionTypes.SAVE_CONVERTER_CURRENCIES_INPUTS:
            return {
                ...state,
                currencies: {
                    ...state.currencies,
                    [action.payload.inputName]: action.payload.inputValue,
                },
            };
        case actionTypes.SAVE_CONVERTER_VALUES_SELECTS:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload.selectName]: action.payload.selectValue,
                },
            };
        case actionTypes.SAVE_CONVERTER_CURRENCIES_SELECTS:
            return {
                ...state,
                currencies: {
                    ...state.currencies,
                    [action.payload.selectName]: action.payload.selectValue,
                },
            };
        default:
            return state;
    }
};