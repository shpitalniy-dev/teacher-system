import actionTypes from "../../constants/actionTypes";

export const changeConverterActiveMode = payload => ({ type: actionTypes.CHANGE_CONVERTER_MODE, payload });
export const saveConverterValuesInputs = payload => ({ type: actionTypes.SAVE_CONVERTER_VALUES_INPUTS, payload });
export const saveConverterValuesSelects = payload => ({ type: actionTypes.SAVE_CONVERTER_VALUES_SELECTS, payload });
export const saveConverterCurrenciesInputs = payload => ({ type: actionTypes.SAVE_CONVERTER_CURRENCIES_INPUTS, payload });
export const saveConverterCurrenciesSelects = payload => ({ type: actionTypes.SAVE_CONVERTER_CURRENCIES_SELECTS, payload });