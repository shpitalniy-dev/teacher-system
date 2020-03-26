import React from "react";
import Modal from "react-modal";
import Settings from "../settings/settings.jsx";

const confirmManager = props => {
    const { isOpen, message, btnOk, btnCancel } = props.confirm;
    const { resources } = props.dictionary;
    const customStyles = {
        content: {
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={btnCancel}
            ariaHideApp={false}
        >
            <div className="main__form">
                <div className="confirm-window__item">
                    <h3>{resources.confirm}</h3>
                </div>
                <div className="confirm-window__item">
                    <label htmlFor="selectLanguage" className="label-element">{message}</label>
                </div>
                <div className="confirm-window__item">
                    <button className="button-style" onClick={btnOk}>{resources.btnOk}</button>
                    <button className="button-style" onClick={btnCancel}>{resources.btnCancel}</button>
                </div>
            </div>
        </Modal>
    )
}

export default confirmManager;