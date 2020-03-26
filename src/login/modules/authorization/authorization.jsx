import React from "react";
import { checkLoginInputValue, checkTextInputValue, clearError } from "../../../library/logic/validation";
import { login } from "./logic/authorization";

export default class Authorize extends React.Component {
    inputLogin = React.createRef();
    outputLogin = React.createRef();
    inputPassword = React.createRef();
    outputPassword = React.createRef();

    componentDidMount() {
        document.body.addEventListener("keydown", this.onLogIn);
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.onLogIn);
    }

    onLogIn = event => {
        const { inputLogin, outputLogin, inputPassword, outputPassword } = this;

        if (event.type === "click" || event.type === "keydown" && event.key === "Enter") {
            login(inputLogin.current, outputLogin.current, inputPassword.current, outputPassword.current)
        }
    };

    render() {
        const { onLogIn, inputLogin, outputLogin, inputPassword, outputPassword } = this;
        const { toggleModal, changeMode } = this.props;
        const { resources, dialogs } = this.props.dictionary;

        return (
            <div className='main__form'>
                <div className="main__authorization-title">
                    <h3>{resources.authorization}</h3>
                </div>
                <div className="authorization-form-item">
                    <label htmlFor="inputLogin" id="labelLogin">{resources.login}</label>
                    <input ref={inputLogin} className="input-style" id="inputLogin" type="name" maxLength="30" placeholder={resources.inputLogin} onKeyDown={checkLoginInputValue} onChange={() => clearError(inputLogin.current, outputLogin.current)} />
                    <output ref={outputLogin} className="output-style" id="outputLogin">{resources.incorrectLogin}</output>
                </div>
                <div className="authorization-form-item">
                    <label htmlFor="inputPassword" id="labelPassword">{resources.password}</label>
                    <input ref={inputPassword} className="input-style" id="inputPassword" type="password" maxLength="20" placeholder={resources.inputPassword} onKeyDown={checkTextInputValue} onChange={() => clearError(inputPassword.current, outputPassword.current)} />
                    <output ref={outputPassword} className="output-style" id="outputPassword">{resources.incorrectPassword}</output>
                </div>
                <div className="authorization-form-item">
                    <button className="button-style authorization-form" onClick={onLogIn}>{resources.authorization}</button>
                </div>
                <div className="authorization-form-item">
                    <button className="button-style authorization-form" onClick={changeMode}>{resources.registration}</button>
                </div>
                <div className="authorization-form-item link">
                    <a href="#" onClick={toggleModal}>{dialogs.forgotPassword}</a>
                </div>
            </div>
        )
    }
}