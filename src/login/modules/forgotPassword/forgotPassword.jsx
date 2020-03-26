import React from "react";
import getKeyWord from "./logic/forgotPassword";
import { authorizationValidation } from "../authorization/logic/authorization";
import { checkTextInputValue, checkLoginInputValue, clearError } from "../../../library/logic/validation";

const ForgotPassword = props => {
    const inputLoginModal = React.createRef();
    const outputLoginModal = React.createRef();
    const inputKeyWordModal = React.createRef();
    const outputKeyWordModal = React.createRef();
    const { toggleModal } = props;
    const { resources } = props.dictionary;

    return (
        <div className="main__form">
            <div className="modal-window__item">
                <h3>{resources.restorePassword}</h3>
            </div>
            <div className="modal-window__item">
                <label htmlFor="inputLoginModal" className="label-element" id="forgottenLabelLogin">{resources.inputLogin}</label>
                <input ref={inputLoginModal} className="input-style" id="inputLoginModal" type="text" maxLength="20" onKeyDown={checkLoginInputValue} onChange={() => clearError(inputLoginModal.current, outputLoginModal.current)} placeholder={resources.inputLogin} />
                <output ref={outputLoginModal} id="outputLoginModal" className="output-style">{resources.incorrectLogin}</output>
            </div>
            <div className="modal-window__item">
                <label htmlFor="inputKeyWordModal" className="label-element" id="forgottenLabelPassword">{resources.inputKeyWord}</label>
                <input ref={inputKeyWordModal} className="input-style" id="inputKeyWordModal" type="text" maxLength="20" onKeyDown={checkTextInputValue} onChange={() => clearError(inputKeyWordModal.current, outputKeyWordModal.current)} placeholder={resources.inputKeyWord} />
                <output ref={outputKeyWordModal} id="outputKeyWordModal" className="output-style">{resources.incorrectKeyWord}</output>
            </div>
            <div className="modal-window__item">
                <output className="out" id="output">{resources.password}: <span id="password"></span></output>
            </div>
            <div className="modal-window__item">
                <button className="button-style" id="btnRestorePassword" onClick={getKeyWord}>{resources.restorePassword}</button>
            </div>
            <div className="modal-window__item">
                <button className="button-style" onClick={toggleModal}>{resources.back}</button>
            </div>
        </div>
    )
}

export default ForgotPassword;