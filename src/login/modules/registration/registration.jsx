import React from "react";
import { toast } from 'react-toastify';
import { createTeacher } from "./logic/registration";
import { checkTextInputValue, checkNumberInputValue, checkMailInputValue, checkLoginInputValue, clearError } from "../../../library/logic/validation";

export default class Registration extends React.Component {
    inputLogin = React.createRef();
    outputLogin = React.createRef();
    inputPassword = React.createRef();
    outputPassword = React.createRef();
    inputConfirmPassword = React.createRef();
    outputConfirmPassword = React.createRef();
    inputMail = React.createRef();
    outputMail = React.createRef();
    inputPhone = React.createRef();
    outputPhone = React.createRef();

    registration = () => {
        const { changeMode } = this.props;
        const { resources } = this.props.dictionary;
        if (createTeacher()) {
            changeMode();
            toast.success(resources.successRegistration, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    render() {
        const { registration, inputLogin, outputLogin, inputPassword, outputPassword, inputConfirmPassword, outputConfirmPassword, inputMail, outputMail, inputPhone, outputPhone } = this;
        const { changeMode } = this.props;
        const { resources } = this.props.dictionary;
        const { dialogs } = this.props.dictionary;

        return (
            <div className='main__form'>
                <div className="main__regis-title">
                    <h3 id="title">{resources.registration}</h3>
                </div>
                <div className="registration-form__item">
                    <label htmlFor="login" id="loginLabel">{resources.inputLogin}</label>
                    <input ref={inputLogin} className="input-style" type="text" placeholder={resources.inputLogin} id="login" onKeyDown={checkLoginInputValue} onChange={() => clearError(inputLogin.current, outputLogin.current)} maxLength="30" />
                    <output ref={outputLogin} className="output-style" id="outputLogin">{resources.incorrectLogin}</output>
                </div>
                <div className="registration-form__item">
                    <label htmlFor="password" id="passLabel">{resources.inputPassword}</label>
                    <input ref={inputPassword} className="input-style" type="password" placeholder={resources.inputPassword} id="password" required onKeyDown={checkTextInputValue} onChange={() => clearError(inputPassword.current, outputPassword.current)} maxLength="20" />
                    <output ref={outputPassword} className="output-style" id="outputPassword">{resources.incorrectPassword}</output>
                </div>
                <div className="registration-form__item">
                    <label htmlFor="confirmPassword" id="pass2Label">{resources.confirmPassword}</label>
                    <input ref={inputConfirmPassword} className="input-style" type="password" placeholder={resources.confirmPassword} id="confirmPassword" required onKeyDown={checkTextInputValue} onChange={() => clearError(inputConfirmPassword.current, outputConfirmPassword.current)} maxLength="20" />
                    <output ref={outputConfirmPassword} className="output-style" id="outputConfirmPassword">{resources.incorrectPassword}</output>
                </div>
                <div className="registration-form__item">
                    <label htmlFor="mail" id="emailLabel">{resources.inputEmail}</label>
                    <input ref={inputMail} className="input-style" type="email" placeholder={resources.inputEmail} id="mail" required onKeyDown={checkMailInputValue} onChange={() => clearError(inputMail.current, outputMail.current)} maxLength="30" />
                    <output ref={outputMail} className="output-style" id="outputMail">{resources.incorrectMail}</output>
                </div>
                <div className="registration-form__item">
                    <label htmlFor="phoneNumber" id="phoneLabel">{resources.inputPhone}</label>
                    <div className="phone-number">
                        <select className="input-style phone-number__code">
                            <option value="ukr">+380</option>
                        </select>
                        <input ref={inputPhone} className="input-style phone-number__number" type="tel" placeholder={resources.inputPhone} id="phoneNumber" required onKeyDown={checkNumberInputValue} onChange={() => clearError(inputPhone.current, outputPhone.current)} maxLength="9" />
                    </div>
                    <output ref={outputPhone} className="output-style" id="outputPhoneNumber">{resources.incorreсtPhone}</output>
                </div>
                <div className="registration-form__item">
                    <label htmlFor="keyWord" id="keywordLabel">{resources.inputKeyWord}</label>
                    <input className="input-style" type="text" placeholder={resources.inputKeyWord} id="keyWord" onKeyDown={checkTextInputValue} maxLength="30" />
                    <output style={{visibility: "visible"}} className="output-style">{resources.keyWordMessage}</output>
                </div>
                <div className="registration-form__item">
                    <button className="button-style" id="button" onClick={registration}>{resources.registration}</button>
                </div>
                <div className="registration-form__item">
                    <button className="button-style" id="btnReturn" onClick={changeMode}>{resources.back}</button>
                </div>
            </div>
        )
    }
}