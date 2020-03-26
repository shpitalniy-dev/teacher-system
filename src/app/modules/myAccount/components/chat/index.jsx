import Chat from "./Chat.jsx";
import { connect } from "react-redux";
import * as selectors from "./selectors";
import * as actions from "./actions";

const mapStateToProps = state => ({
    chats: selectors.getChats(state),
    chatUsers: selectors.getUsers(state),
    teacher: selectors.getTeacher(state),
    activeChat: selectors.getActiveChat(state),
    isRead: selectors.getIsRead(state),
    dictionary: selectors.getDictionary(state),
})

const mapDispatchToProps = dispatch => ({
    setChats: payload => dispatch(actions.setChats(payload)),
    setUsers: payload => dispatch(actions.setUsers(payload)),
    setActiveChat: payload => dispatch(actions.setActiveChat(payload)),
    setIsRead: payload => dispatch(actions.setIsRead(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);