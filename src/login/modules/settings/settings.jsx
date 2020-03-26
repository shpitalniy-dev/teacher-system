import React from "react";
import Select from "../select/select.jsx";
import { setLSData, changeDirection } from "../../helpers/utils";

export default class Settings extends React.Component {
    changeLanguage = event => {
        const { changeLocale } = this.props;
        if (event.target) {
            const selectedLocale = event.target.value;
            try {
                setLSData("language", selectedLocale);
                changeDirection(selectedLocale);
            } catch (e) {
                console.error(e.message);
            }
            changeLocale(selectedLocale);
        }
    }

    render() {
        const { changeLanguage } = this;
        const { toggleModal, locale } = this.props;
        const { resources } = this.props.dictionary;

        return (
            <div className="main__form">
                <div className="modal-window__item">
                    <h3>{resources.settings}</h3>
                </div>
                <div className="modal-window__item">
                    <label htmlFor="selectLanguage" className="label-element">{resources.labelLanguage}</label>
                    <Select locale={locale}
                        changeLanguage={changeLanguage}
                    />
                </div>
                <div className="modal-window__item">
                    <button className="button-style" onClick={toggleModal}>{resources.back}</button>
                </div>
            </div>
        )
    }
}