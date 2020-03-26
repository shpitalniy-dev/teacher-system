import React from "react";
import Select from "../select/select.jsx";
import { toast } from 'react-toastify';
import { resetAllDB } from "./logic/settings";
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

    reset = () => {
        const { teacher, groupNames, setUsersRawData, setActiveGroup, setGroupNames } = this.props;
        const { resources } = this.props.dictionary;
        resetAllDB(teacher, groupNames)
            .then(() => setUsersRawData([]))
            .then(() => setGroupNames([]))
            .then(() => setActiveGroup(0))
            .then(() => toast.success(resources.successResetAll, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            }))
            .catch(error => console.log(error));
    }

    render() {
        const { changeLanguage, reset } = this;
        const { toggleModal, locale, setConfirm, dictionary, teacher } = this.props;
        const { resources } = this.props.dictionary;

        return (
            <div className="main__form">
                <div className="modal-window__item">
                    <h3>{resources.settings}</h3>
                </div>
                <div className="modal-window__item">
                    <label htmlFor="selectLanguage" className="label-element">{resources.labelLanguage}</label>
                    <Select dictionary={dictionary} onChangeCallback={changeLanguage} selectValue={locale} options={[{value: "en", resourceKey: "en"}, {value: "ru", resourceKey: "ru"}, {value: "ar", resourceKey: "ar"}]}/>
                </div>
                {teacher.role !== "admin" ? 
                <div className="modal-window__item">
                    <button className="button-style"
                        onClick={() => setConfirm({
                            isOpen: true,
                            message: resources.confirmReset,
                            btnOk: () => { reset(); setConfirm({ isOpen: false }) },
                            btnCancel: () => setConfirm({ isOpen: false })
                        })}
                    >{resources.resetAll}</button>
                </div>
                :
                null}
                <div className="modal-window__item">
                    <button className="button-style" onClick={toggleModal}>{resources.back}</button>
                </div>
            </div>
        )
    }
}