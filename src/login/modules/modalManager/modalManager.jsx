import React from "react";
import Modal from "react-modal";
import ForgotPassword from "../forgotPassword/forgotPassword.jsx";
import Settings from "../settings/settings.jsx";

export default class ModalManager extends React.Component {
    getContent = () => {
        const { content, dictionary, toggleModal, locale, changeLocale } = this.props;

        switch (content) {
            case "forgotPassword":
                return <ForgotPassword
                    toggleModal={toggleModal}
                    dictionary={dictionary}
                />;
            case "settings":
                return <Settings
                    toggleModal={toggleModal}
                    dictionary={dictionary}
                    locale={locale}
                    changeLocale={changeLocale}
                />;
            default:
                return <h1>HELLO WORLD</h1>;
        }
    }

    render() {
        const { isOpen, toggleModal } = this.props;
        const customStyles = {
            content: {
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '60%',
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
                onRequestClose={toggleModal}
                ariaHideApp={false}
            >
                {this.getContent()}
            </Modal>
        )
    }
}