import Component from "./Converter.jsx";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    dictionary: selectors.getDictionary(state),
    activeMode: selectors.getConverterActiveMode(state),
    valuesInputs: selectors.getConverterValuesInputs(state),
    currenciesInputs: selectors.getConverterCurrenciesInputs(state),
});

const mapDispatchToProps = dispatch => ({
    changeActiveMode: payload => dispatch(actions.changeConverterActiveMode(payload)),
    saveValuesInputs: payload => dispatch(actions.saveConverterValuesInputs(payload)),
    saveValuesSelects: payload => dispatch(actions.saveConverterValuesSelects(payload)),
    saveCurrenciesInputs: payload => dispatch(actions.saveConverterCurrenciesInputs(payload)),
    saveCurrenciesSelects: payload => dispatch(actions.saveConverterCurrenciesSelects(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);