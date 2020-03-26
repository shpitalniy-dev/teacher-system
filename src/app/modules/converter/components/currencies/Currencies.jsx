import React from "react";
import PropTypes from "prop-types";
import { clearError } from "../../../../../library/logic/validation";
import { convertCurrencies, setCurrencyExchange } from "../../logic/logic";
import "./currencies.less";

export default class Currencies extends React.Component {
    static propTypes = {
        onConvert: PropTypes.func.isRequired,
        dictionary: PropTypes.object.isRequired,
        currenciesInputs: PropTypes.object.isRequired,
        onChangeInputCallback: PropTypes.func.isRequired,
        onChangeSelectCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        setCurrencyExchange();
    }

    render() {
        const {
            onConvert,
            dictionary,
            currenciesInputs,
            onChangeInputCallback,
            onChangeSelectCallback,
        } = this.props;
        const inputTo = React.createRef();
        const selectTo = React.createRef();
        const inputFrom = React.createRef();
        const selectFrom = React.createRef();
        const outputFrom = React.createRef();

        return (
            <>
                <div className="converter-currencies">
                    <div className="converter-currencies__block-from block-from">
                        <div className="control-panel__item">
                            <label htmlFor="currency-input">{dictionary.resources.value}:</label>
                            <input ref={inputFrom} className="block-from__input-value input-style" type="text"
                                onChange={event => {
                                    clearError(inputFrom.current, outputFrom.current);
                                    onChangeInputCallback(event);
                                }}
                                maxLength="12"
                                id="currency-input"
                                />
                            <output ref={outputFrom} className="output-style">{dictionary.resources.incorrectValue}</output>
                        </div>
                        <select ref={selectFrom} className="block-from__select-type input-style" size="1" onChange={onChangeSelectCallback}>
                            <option value="grivna">{dictionary.resources.grivna}</option>
                            <option value="dollar">{dictionary.resources.dollar}</option>
                            <option value="euro">{dictionary.resources.euro}</option>
                            <option value="rubl">{dictionary.resources.rubl}</option>
                        </select>
                    </div>
                    <div className="converter-currencies__block-to block-to">
                        <div className="control-panel__item">
                            <label>{dictionary.resources.result}:</label>
                            <input ref={inputTo} className="block-to__input-value input-style" type="number" disabled />
                            <output className="output-style">Incorrect</output>
                        </div>
                        <select ref={selectTo} className="block-to__select-type input-style" size="1" onChange={onChangeSelectCallback}>
                            <option value="grivna">{dictionary.resources.grivna}</option>
                            <option value="dollar">{dictionary.resources.dollar}</option>
                            <option value="euro">{dictionary.resources.euro}</option>
                            <option value="rubl">{dictionary.resources.rubl}</option>
                        </select>
                    </div>
                </div>
                <div className="converter-currencies__button-container button-container">
                    <div className="control-panel__item">
                        <button className="button-container__convert-button button-style" onClick={() => convertCurrencies(inputFrom.current, outputFrom.current, inputTo.current, selectFrom.current, selectTo.current, onConvert)}>{dictionary.resources.convert}</button>
                    </div>
                </div>
            </>
        );
    };
};