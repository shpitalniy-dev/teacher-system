import React from 'react';
import PropTypes from "prop-types";
import './styles/chat.less';
export default class Chat extends React.Component {
  static propTypes = {
    chats: PropTypes.array.isRequired,
    chatUsers: PropTypes.array.isRequired,
    setChats: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
    activeChat: PropTypes.number.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    isRead: PropTypes.bool.isRequired,
    setIsRead: PropTypes.func.isRequired,
    dictionary: PropTypes.object.isRequired,
  }

  inputMessage = React.createRef();

  componentDidMount = () => {
    const { socket } = this.props;
    socket.on('chat-message', responseMessage => {
      console.log(responseMessage);
      document.getElementById('chat-ouput').innerHTML += responseMessage;
    })

    socket.on('join-private', responseMessage => {
      console.log(responseMessage);
    })

    socket.on('send-private', responseMessage => {
      console.log(responseMessage);
      document.getElementById('chat-ouput').innerHTML += responseMessage;
    })
  }


  sendMessage = () => {
    const { inputMessage } = this;
    const { activeChat, teacher, socket } = this.props;
    const messageData = {};
    messageData.message = inputMessage.current.value.trim();
    messageData.idRoom = activeChat;
    messageData.idTeacher = teacher.id;
    messageData.login = teacher.login;

    inputMessage.current.value = "";
    if (messageData.message === "") return false;

    socket.emit('SEND_MESSAGE', messageData);
  }

  createPrivateChat = user => {
    const { activeChat, teacher, socket, chats, setActiveChat } = this.props;
    const messageData = {};
    messageData.id = performance.now();
    messageData.type = "Private";
    messageData.name = user.login + " & " + teacher.login;
    messageData.participants = [{
      id: teacher.id,
      login: teacher.login,
      socket: teacher.socket,
      isRead: true
    }, {
      id: user.id,
      login: user.login,
      socket: user.socket,
      isRead: false,
    }];
    messageData.messages = [];

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].type === "General") continue;
      for (let j = 0; j < chats[i].participants.length; j++) {
        if (chats[i].participants[j].id === user.id) {
          for (let y = 0; y < chats[i].participants.length; y++) {
            if (chats[i].participants[y].id === teacher.id) {
              return;
            }
          }
          break;
        }
      }
    }

    setActiveChat(messageData.id);
    socket.emit('ADD_PRIVATE_CHAT', messageData);
  }

  getMessages = () => {
    const { activeChat, chats } = this.props;
    for (let i = 0; i < chats.length; i++) {
      if (activeChat === chats[i].id) {
        return chats[i].messages;
      }
    }
    return [];
  }

  leaveChat = () => {
    const { activeChat, socket } = this.props;
    socket.emit('LEAVE_CHAT', activeChat);
  }

  switchChat = () => {
    const { chats, teacher, setActiveChat, socket, setIsRead } = this.props;
    const idChat = +event.target.accessKey;
    let isRead = true;
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].id === idChat && chats[i].isRead === false) {
        chats[i].isRead = true;
        for (let j = 0; j < chats[i].participants.length; j++) {
          if (chats[i].participants[j].id === teacher.id) {
            chats[i].participants[j].isRead = true;
          }
        }
        setActiveChat(idChat);
        socket.emit('READ', { idChat: idChat, idTeacher: teacher.id });
        return;
      }
      // if(chats[i].isRead === false){
      //   isRead = false;
      // }
    }
    // if(isRead !== this.props.isRead) setIsRead(isRead);
    setActiveChat(idChat);
  }

  render() {
    const { socket, teacher, chatUsers, chats, activeChat } = this.props;
    const { clickMe, inputMessage, sendMessage, getMessages, createPrivateChat, leaveChat, switchChat } = this;
    const { resources, dialogs } = this.props.dictionary;
    return (
      <div className="chat-container">
        <div className="chat-container__chat-settings chat-settings">
          <div className="chat-settings__chat-elements chat-elements">
            <div className="chat-elements__title">
              <h3>{resources.online}</h3>
            </div>
            <div className="chat-elements__elements-block elements-block">
              {chatUsers.map(item =>
                <div className="elements-block__element"
                  name={item.login}
                  key={item.id}
                  onContextMenu={() => {
                    createPrivateChat(item);
                    event.preventDefault();
                  }}
                >{item.login}</div>
              )}
            </div>
          </div>
          <div className="chat-settings__chat-elements chat-elements">
            <div className="chat-elements__title">
              <h3>{resources.chats}</h3>
            </div>
            <div className="chat-elements__elements-block elements-block">
              {chats.map(item =>
                item.id === activeChat ?
                  <div className="elements-block__element"
                    style={{ color: "#fff", backgroundColor: "#3ba5b2" }}
                    key={item.id}
                    accessKey={item.id}
                    onClick={switchChat}
                  >{item.name}</div>
                  :
                  item.isRead === true ?
                    <div className="elements-block__element"
                      accessKey={item.id}
                      key={item.id}
                      onClick={switchChat}
                    >{item.name}</div>
                    :
                    <div className="elements-block__element"
                      style={{ fontWeight: "bold" }}
                      accessKey={item.id}
                      key={item.id}
                      onClick={switchChat}
                    >
                      <div style={{
                        display: 'inline-block',
                        width: '4px',
                        height: '4px',
                        border: '1px solid red',
                        borderRadius: '4px',
                        background: 'red',
                        position: 'absolute',
                        top: 'calc(50% - 3px)',
                        left: '1px',
                      }} />
                      {item.name}
                    </div>
              )}
            </div>
          </div>
        </div>
        <div className="chat-container__chat-block chat-block">
          <div className="chat-block__title">
            {chats.map(item =>
              item.id === activeChat ?
                <h3
                  key={performance.now()}
                  style={{ width: "calc(100% - 150px)", overflow: "hidden" }}
                >{item.name}</h3>
                :
                null
            )}
            {chats.map(item =>
              item.id === activeChat && item.type !== "General" ?
                <button
                  key={performance.now()}
                  className="button-style"
                  style={{ width: "150px" }}
                  onClick={leaveChat}
                >{resources.leave}</button>
                :
                null
            )}
          </div>
          <div className="chat-block__chat-messages chat-messages">
            {getMessages().map(item =>
              item.login != teacher.login ?
                <div key={performance.now()} className="chat-messages__message message">
                  <div key={Math.floor(Math.random() * performance.now())} className="message__element"><b>{item.login}: </b>{item.message}</div>
                </div>
                :
                <div key={performance.now()} style={{ justifyContent: "flex-end" }} className="chat-messages__message message">
                  <div key={Math.floor(Math.random() * performance.now())} className="message__element"><b style={{ color: "red" }}>Me: </b>{item.message}</div>
                </div>
            ).reverse()}
          </div>
          <div className="chat-block__chat-input-block">
            <div className="chat-input-block__chat-input chat-input">
              <input type="text" className="chat-input__element" 
              placeholder={dialogs.enterYourMessageHere} 
              ref={inputMessage} 
              onKeyPress={() => event.key === "Enter" ? sendMessage() : null}
              maxLength="100"></input>
            </div>
            <div className="chat-input-block__chat-button chat-button">
              <button className="chat-button__element"
                onClick={sendMessage}
              >{resources.send}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}