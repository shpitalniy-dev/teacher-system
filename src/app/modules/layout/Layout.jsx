import React from "react";
import PropTypes from "prop-types";
import Header from '../header/Header.jsx';
import Footer from '../footer/footer.jsx';
import App from '../app/index.jsx';
import MyAccount from '../myAccount/MyAccount.jsx';
import ModalManager from "../modalManager/modalManager.jsx";
import ConfirmManager from "../confirmManager/confirmManager.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import io from 'socket.io-client';
import Calculator from "../calculator/Calculator.jsx";
import Converter from "../converter/index.jsx";
import Paint from "../paint/index.jsx";
import AdminTable from "../adminTable/index.jsx";
import { getBrowser, getUserInformation, getDevice } from "./logic/helpers";
export default class Layout extends React.Component {
    static propTypes = {
        activeMode: PropTypes.string.isRequired,
        isModal: PropTypes.bool.isRequired,
        locale: PropTypes.string.isRequired,
        dictionary: PropTypes.object.isRequired,
        changeMode: PropTypes.func.isRequired,
        changeLocale: PropTypes.func.isRequired,
        toggleModalWindow: PropTypes.func.isRequired,
        modal: PropTypes.object.isRequired,
        toggleModal: PropTypes.func.isRequired,
        confirm: PropTypes.object.isRequired,
        setConfirm: PropTypes.func.isRequired,
        teacher: PropTypes.object.isRequired,
        groupNames: PropTypes.array.isRequired,
        setGroupNames: PropTypes.func.isRequired,
        setActiveGroup: PropTypes.func.isRequired,
        setUsersRawData: PropTypes.func.isRequired,
        chatUsers: PropTypes.array.isRequired,
        chats: PropTypes.array.isRequired,
        setChatUsers: PropTypes.func.isRequired,
        setChats: PropTypes.func.isRequired,
        activeChat: PropTypes.number.isRequired,
        setActiveChat: PropTypes.func.isRequired,
        isRead: PropTypes.bool.isRequired,
        setIsRead: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);

        if (localStorage.getItem('teacher') === null) {
            document.location.href = "./login.html";
        }
    }

    socket = io('http://localhost:3001');

    componentDidMount() {
        const { socket } = this;
        const { teacher, setChatUsers, setChats, setActiveChat, setIsRead } = this.props;
        socket.on('connect', async () => {
            teacher.socket = socket.id;
            teacher.browser = getBrowser();
            teacher.device = getDevice();
            await getUserInformation()
            .then(result => {
                teacher.city = result.geoplugin_city;
                teacher.ip = result.geoplugin_request;
                teacher.latitude = String(result.geoplugin_latitude);
                teacher.longitude = String(result.geoplugin_longitude);
            })
            socket.emit('INIT_USER', teacher);
        });

        socket.on('SHOW_USERS', users => {
            const uniqueUsers = [];
            users.forEach(item => {
                if (item.id === teacher.id) return;

                let exist = false;
                for (let i = 0; i < uniqueUsers.length; i++) {
                    if (item.id === uniqueUsers[i].id) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) uniqueUsers.push(item);
            })
            setChatUsers(uniqueUsers);
        });

        socket.on("SHOW_CHATS", dataChats => {
            console.log(dataChats);
            const { activeMode, activeChat } = this.props;
            let indexGeneralChat = 0;
            let exist = false;
            let isRead = true;
            for (let i = 0; i < dataChats.length; i++) {
                if (dataChats[i].type === "General") {
                    indexGeneralChat = dataChats[i].id;
                }
                if (dataChats[i].id === activeChat) {
                    exist = true;
                }
                for (let j = 0; j < dataChats[i].participants.length; j++) {
                    if (dataChats[i].participants[j].id === teacher.id && dataChats[i].participants[j].isRead === false) {
                        if (dataChats[i].id === activeChat && activeMode === "account") {
                            dataChats[i].isRead = true;
                            socket.emit('READ', { idChat: dataChats[i].id, idTeacher: teacher.id });
                            return;
                        }else{
                            dataChats[i].isRead = false;
                            isRead = false;
                        }
                    } else if (dataChats[i].participants[j].id === teacher.id && dataChats[i].participants[j].isRead === true) {
                        dataChats[i].isRead = true;
                    }
                }
            }

            if (isRead !== this.props.isRead) {
                setIsRead(isRead);
            }

            if (!exist) {
                setActiveChat(indexGeneralChat);
            }

            setChats(dataChats);
        });

        socket.on('disconnect', () => console.log("disconnect"));
    };

    getContent = () => {
        const { activeMode, teacher, dictionary } = this.props;
        const { socket } = this;

        switch (activeMode) {
            case "calc": return <Calculator 
                teacher={teacher}
                />;
            case "paint": return <Paint 
                dictionary={dictionary} 
                teacher={teacher}
                socket={socket}
                />;
            case "account": return <MyAccount
                socket={socket}
                teacher={teacher}
            />;
            case "converter": return <Converter 
                dictionary={dictionary} 
                teacher={teacher}
                />;
            default: return <App />
        }
    };

    render() {
        const { socket } = this;
        const { activeMode, locale, dictionary, changeLocale, changeMode, modal, toggleModal, confirm,
            setConfirm, teacher, groupNames, setGroupNames, setActiveGroup, setUsersRawData, isRead, setIsRead,
            chats, activeChat } = this.props;
        return (
            <React.Fragment>
                <div className="page-wrapper">
                    <header className="page-wrapper__header header">
                        <Header
                            activeMode={activeMode}
                            dictionary={dictionary}
                            changeMode={changeMode}
                            isRead={isRead}
                            socket={socket}
                            setIsRead={setIsRead}
                            chats={chats}
                            activeChat={activeChat}
                            teacher={teacher}
                            toggleModal={() => toggleModal({ isOpen: true, content: "settings" })}
                        />
                    </header>
                    <main className="page-wrapper__main main">
                        {teacher.role === 'admin' && activeMode === "main" ? 
                         <AdminTable 
                            dictionary={dictionary}
                         />
                        : 
                        this.getContent()}
                    </main>
                    <footer className="page-wrapper__footer footer">
                        <Footer dictionary={dictionary} />
                    </footer>
                </div>
                <ModalManager
                    isOpen={modal.isOpen}
                    content={modal.content}
                    toggleModal={() => toggleModal({ isOpen: false, content: "any" })}
                    changeLocale={changeLocale}
                    locale={locale}
                    dictionary={dictionary}
                    setConfirm={setConfirm}
                    teacher={teacher}
                    groupNames={groupNames}
                    setUsersRawData={setUsersRawData}
                    setActiveGroup={setActiveGroup}
                    setGroupNames={setGroupNames}
                />
                <ConfirmManager
                    dictionary={dictionary}
                    confirm={confirm}
                />
                <ToastContainer />
            </React.Fragment>
        );
    }
}
