import React from "react";
import PropTypes from "prop-types";
import { clearError } from "../../../../../library/logic/validation";
import { convertValues } from "../../logic/logic";
import "./values.less";

const Values = props => {
    const {
        onConvert,
        dictionary,
        valuesInputs,
        onChangeInputCallback,
        onChangeSelectCallback,
    } = props;
    const inputTo = React.createRef();
    const selectTo = React.createRef();
    const inputFrom = React.createRef();
    const selectFrom = React.createRef();
    const outputFrom = React.createRef();

    return (
        <>
            <div className="converter-values">
                <div className="converter-values__block-from block-from">
                    <div className="control-panel__item">
                        <label htmlFor="values-input">{dictionary.resources.value}:</label>
                        <input ref={inputFrom} className="block-from__input-value input-style" type="text"
                            onChange={event => {
                                clearError(inputFrom.current, outputFrom.current);
                                onChangeInputCallback(event);
                            }}
                            maxLength="12"
                            id="values-input"
                        />
                        <output ref={outputFrom} className="output-style">{dictionary.resources.incorrectValue}</output>
                    </div>
                    <select ref={selectFrom} className="block-from__select-type input-style" size="1" onChange={onChangeSelectCallback}>
                        <option value="versts">{dictionary.resources.versts}</option>
                        <option value="meters">{dictionary.resources.meters}</option>
                        <option value="yards">{dictionary.resources.yards}</option>
                        <option value="foots">{dictionary.resources.foots}</option>
                        <option value="miles">{dictionary.resources.miles}</option>
                    </select>
                </div>
                <div className="converter-values__block-to block-to">
                    <div className="control-panel__item">
                        <label>{dictionary.resources.result}:</label>
                        <input ref={inputTo} className="block-to__input-value input-style" type="number" disabled />
                        <output className="output-style">Incorrect</output>
                    </div>
                    <select ref={selectTo} className="block-to__select-type input-style" size="1" onChange={onChangeSelectCallback}>
                        <option value="versts">{dictionary.resources.versts}</option>
                        <option value="meters">{dictionary.resources.meters}</option>
                        <option value="yards">{dictionary.resources.yards}</option>
                        <option value="foots">{dictionary.resources.foots}</option>
                        <option value="miles">{dictionary.resources.miles}</option>
                    </select>
                </div>
            </div>
            <div className="converter-values__button-container button-container">
                <div className="control-panel__item">
                    <button className="button-container__convert-button button-style" onClick={() => convertValues(inputFrom.current, outputFrom.current, inputTo.current, selectFrom.current, selectTo.current, onConvert)}>{dictionary.resources.convert}</button>
                </div>
            </div>
        </>
    );
};

Values.propTypes = {
    onConvert: PropTypes.func.isRequired,
    dictionary: PropTypes.object.isRequired,
    valuesInputs: PropTypes.object.isRequired,
    onChangeInputCallback: PropTypes.func.isRequired,
    onChangeSelectCallback: PropTypes.func.isRequired,
};

export default React.memo(Values);