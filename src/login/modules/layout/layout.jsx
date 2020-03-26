import React from "react";
import PropTypes from "prop-types";
import { loginUrl } from "../authorization/logic/constants/constants";
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Authorize from '../authorization/authorization.jsx';
import Registration from '../registration/registration.jsx';
import ForgotPassword from '../forgotPassword/forgotPassword.jsx';
import ModalManager from "../modalManager/modalManager.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default class Layout extends React.Component {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        isModal: PropTypes.bool.isRequired,
        locale: PropTypes.string.isRequired,
        dictionary: PropTypes.object.isRequired,
        changeMode: PropTypes.func.isRequired,
        changeLocale: PropTypes.func.isRequired,
        toggleModalWindow: PropTypes.func.isRequired,
        modal: PropTypes.object.isRequired,
        toggleModal: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        if (localStorage.getItem('teacher') !== null) {
            document.location.href = loginUrl;
        }
    }

    render() {
        const { isAuth, isModal, locale, dictionary, changeLocale, changeMode, toggleModalWindow, modal, toggleModal } = this.props;

        return (
            <React.Fragment>
                <div className="page-wrapper">
                    <header className="page-wrapper__header header">
                        <Header
                            toggleModal={() => toggleModal({ isOpen: true, content: "settings" })}
                        />
                    </header>
                    <main className="page-wrapper__main main">
                        {isAuth ?
                            <Authorize changeMode={changeMode}
                                dictionary={dictionary}
                                toggleModal={() => toggleModal({ isOpen: true, content: "forgotPassword" })}
                            /> :
                            <Registration changeMode={changeMode}
                                dictionary={dictionary}
                            />
                        }
                    </main>
                    <footer className="page-wrapper__footer footer">
                        <Footer dictionary={dictionary} />
                    </footer>
                </div>
                <ModalManager
                    isOpen={modal.isOpen}
                    content={modal.content}
                    toggleModal={() => toggleModal({ isOpen: false, content: "any" })}
                    dictionary={dictionary}
                    locale={locale}
                    changeLocale={changeLocale}
                />
                <ToastContainer />
            </React.Fragment>
        );
    }
}
