import React from "react";
import PropTypes from "prop-types";
import Values from "./components/values/Values.jsx";
import Currencies from "./components/currencies/Currencies.jsx";
import classNames from "classnames";
import "./converter.less";
import ErrorBoundary from "../../../base/ErrorBoundary.jsx";
import PureComponent from "../../../base/PureComponent.jsx";
import { sendTime } from "../../../library/requests/requests";

@ErrorBoundary
export default class Converter extends PureComponent {
    static propTypes = {
        dictionary: PropTypes.object.isRequired,
        activeMode: PropTypes.string.isRequired,
        valuesInputs: PropTypes.object.isRequired,
        currenciesInputs: PropTypes.object.isRequired,
        changeActiveMode: PropTypes.func.isRequired,
        teacher: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.start = 0;
        this.finish = 0;
    }

    componentDidMount() {
        this.start = Date.now();
    }

    componentWillUnmount() {
        const { teacher } = this.props;
        this.finish = Date.now();
        sendTime(teacher, "converter", this.finish - this.start);
    }

    onConvertValues = inputValue => {
        const { saveValuesInputs } = this.props;
        saveValuesInputs({
            inputName: "inputToValue",
            inputValue,
        });
    };

    onChangeValuesCallback = event => {
        const { saveValuesInputs } = this.props;
        saveValuesInputs({
            inputName: "inputFromValue",
            inputValue: event.currentTarget.value,
        });
    };

    onChangeValuesSelectCallback = event => {
        const { saveValuesSelects } = this.props;
        if (event.currentTarget.className.includes("block-from")) {
            saveValuesSelects({
                selectName: "selectFrom",
                selectValue: event.currentTarget.value,
            });
        } else {
            saveValuesSelects({
                selectName: "selectTo",
                selectValue: event.currentTarget.value,
            });
        }
    };

    onConvertCurrencies = inputValue => {
        const { saveCurrenciesInputs } = this.props;
        saveCurrenciesInputs({
            inputName: "inputToValue",
            inputValue,
        });
    };

    onChangeCurrenciesInputCallback = event => {
        const { saveCurrenciesInputs } = this.props;
        saveCurrenciesInputs({
            inputName: "inputFromValue",
            inputValue: event.currentTarget.value,
        });
    };

    onChangeCurrenciesSelectCallback = event => {
        const { saveCurrenciesSelects } = this.props;
        if (event.currentTarget.className.includes("block-from")) {
            saveCurrenciesSelects({
                selectName: "selectFrom",
                selectValue: event.currentTarget.value,
            });
        } else {
            saveCurrenciesSelects({
                selectName: "selectTo",
                selectValue: event.currentTarget.value,
            });
        }
    };

    getContent = () => {
        const { activeMode, dictionary, valuesInputs, currenciesInputs } = this.props;
        switch (activeMode) {
            case "values": return <Values onConvert={this.onConvertValues} onChangeSelectCallback={this.onChangeValuesSelectCallback} onChangeInputCallback={this.onChangeValuesCallback} valuesInputs={valuesInputs} dictionary={dictionary}/>;
            case "currencies": return <Currencies onConvert={this.onConvertCurrencies} onChangeSelectCallback={this.onChangeCurrenciesSelectCallback} onChangeInputCallback={this.onChangeCurrenciesInputCallback} currenciesInputs={currenciesInputs} dictionary={dictionary}/>;
        }
    };

    onChangeMode = event => {
        if (!event || !event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const { activeMode, changeActiveMode } = this.props;

        if (activeMode === event.currentTarget.accessKey) {
            return;
        }
        changeActiveMode(event.currentTarget.accessKey);
    };

    render() {
        const { onChangeMode, getContent } = this;
        const { dictionary, activeMode } = this.props;

        const valuesTabClassName = classNames(
            "converter-header__tab-values",
            {"converter-header__tab-values--active": activeMode === "values"},
        );
        const currenciesTabClassName = classNames(
            "converter-header__tab-currencies",
            {"converter-header__tab-currencies--active": activeMode === "currencies"},
        );

        return (
            <div className="converter">
                <div className="converter__converter-header converter-header">
                    <div accessKey="values" className={valuesTabClassName} onClick={onChangeMode}>{dictionary.resources.lengths}</div>
                    <div accessKey="currencies" className={currenciesTabClassName} onClick={onChangeMode}>{dictionary.resources.currencies}</div>
                </div>
                <div className="converter__converter-body">
                    {getContent()}
                </div>
            </div>
        )
    }
};
