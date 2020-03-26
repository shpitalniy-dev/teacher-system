import React from "react";
import { goToPage } from './logic/header';
import constants from '../../constants/constants';
import logo from "../../../img/wecan.png";
import settingsIcon from "../../../img/settings.png";
import myAccountIcon from "../../../img/myAccount.png";
import backLogo from "../../../img/back.png";
import logoutLogo from "../../../img/logout.png";
import PropTypes from "prop-types";
import Select from "../select/select.jsx";

export default class Header extends React.Component {
    static propTypes = {
        activeMode: PropTypes.string.isRequired,
        dictionary: PropTypes.object.isRequired,
        changeMode: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired,
        isRead: PropTypes.bool.isRequired,
    };

    logOut = () => {
        localStorage.removeItem('teacher');
        goToPage(constants.urlLogOut);
    };

    changeMode = target => {
        const {activeMode, changeMode} = this.props;
        const newMode = typeof target === "object" ? target.value : target;
        if (activeMode === newMode) {
            return;
        }
        changeMode(newMode);
        typeof target === "object" && target.blur();
    };

    openMyAccount = () => {
        const { activeChat, chats, teacher, setIsRead, socket } = this.props;
        let isRead = true;
        if(this.props.isRead === false){
            for(let i = 0; i < chats.length; i++){
                if(activeChat === chats[i].id){
                    chats[i].isRead = true;
                    for(let j = 0; j < chats[i].participants.length; j++){
                        if(chats[i].participants[j].id === teacher.id){
                            chats[i].participants[j].isRead = true;
                        }
                    }
                    socket.emit("READ", { idChat: chats[i].id, idTeacher: teacher.id });
                }
                if(chats[i].isRead === false){
                    isRead = false;
                }
            }
            if(isRead !== this.props.isRead) setIsRead(isRead);
        }
        this.changeMode('account');
    }

    render() {
        const { logOut, changeMode, openMyAccount } = this;
        const { activeMode, toggleModal, dictionary, isRead } = this.props;

        return (
            <div className="header__wrapper header-wrapper">
                <div className="header-wrapper__logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="header-wrapper__mode-selector">
                    {activeMode !== 'account' ? <Select dictionary={dictionary} onChangeCallback={event => changeMode(event.currentTarget.value)} selectValue={activeMode} options={[
                        {value: "main", resourceKey: "table"},
                        {value: "converter", resourceKey: "converter"},
                        {value: "calc", resourceKey: "calculator"},
                        {value: "paint", resourceKey: "paint"},
                    ]}
                    />
                    :
                    null}
                </div>
                <div className="header-wrapper__settings header-settings">
                    <div className="header-settings__logo"
                        style={{position: 'relative'}}>
                        <img className="my-account-logo" src={activeMode === "account" ? backLogo : myAccountIcon}
                            alt="myAccount"
                            height="55"
                            onClick={activeMode === "account" ? () => changeMode("main") : openMyAccount}
                        />
                        {!isRead && activeMode !== "account" ? <div style={{
                            display: 'inline-block',
                            width: '15px',
                            height: '15px',
                            border: '1px solid red',
                            borderRadius: '7.5px',
                            background: 'red',
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }} /> 
                        :
                        null}
                    </div>
                    <div className="header-settings__logo">
                        <img className="settings" src={settingsIcon}
                            alt="settings"
                            height="45"
                            onClick={toggleModal}
                        />
                    </div>
                    <div className="header-settings__logo">
                        <img src={logoutLogo}
                            alt="settings"
                            height="55"
                            onClick={logOut}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
