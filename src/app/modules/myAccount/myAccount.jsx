import React from 'react';
// import AddInfo from './components/addInfo/AddInfo.jsx';
import Chat from './components/chat/index.jsx';
import Game from './components/game/Game.jsx';
import UserProfile from './components/userProfile/index.jsx';
import AddInfo from './components/addInfo/index.jsx';
import {getTeacherInfoToMyAccount} from "./logic/helpers/helpers";
import { sendTime } from "../../../library/requests/requests";
import "./myAccount.less";

export default class MyAccount extends React.Component {
    constructor(props){
        super(props);
        this.start = 0;
        this.finish = 0;
    }

    componentDidMount() {
        getTeacherInfoToMyAccount();
        this.start = Date.now();
    }

    componentWillUnmount() {
        const { teacher } = this.props;
        this.finish = Date.now();
        sendTime(teacher, "account", this.finish - this.start);
    }

    render() {
        const {socket, teacher} = this.props;
        return (
            <div className="account-container">
                <div className="account-container__left-side left-side">
                    <div className="left-side__user-profile">
                        <UserProfile/>
                    </div>
                    <div className="left-side__add-info add-info">
                        <AddInfo/>
                    </div>
                </div>
                <div className="account-container__right-side right-side">
                    <div className="right-side__chat">
                        <Chat socket={socket} teacher={teacher}/>
                    </div>
                    <div className="right-side__game">
                        <Game/>
                    </div>
                </div>
            </div>
        )
    }
}