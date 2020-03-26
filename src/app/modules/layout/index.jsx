import Layout from "./Layout.jsx";
import * as selectors from "./selectors";
import * as actions from "./actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    activeMode: selectors.getActiveMode(state),
    locale: selectors.getLocale(state),
    dictionary: selectors.getDictionary(state),
    isModal: selectors.getIsModal(state),
    modal: selectors.getModal(state),
    confirm: selectors.getConfirm(state),
    teacher: selectors.getTeacher(state),
    groupNames: selectors.getGroups(state),
    chatUsers: selectors.getChatUsers(state),
    chats: selectors.getChats(state),
    activeChat: selectors.getActiveChat(state),
    isRead: selectors.getIsRead(state),
});

const mapDispatchToProps = dispatch => ({
    changeMode: payload => dispatch(actions.changeMode(payload)),
    changeLocale: payload => dispatch(actions.changeLocale(payload)),
    toggleModalWindow: () => dispatch(actions.toggleModalWindow()),
    toggleModal: payload => dispatch(actions.toggleModal(payload)),
    setConfirm: payload => dispatch(actions.setConfirm(payload)),
    setGroupNames: payload => dispatch(actions.setGroupNames(payload)),
    setActiveGroup: payload => dispatch(actions.setActiveGroup(payload)),
    setUsersRawData: payload => dispatch(actions.setUsersRawData(payload)),
    setChatUsers: payload => dispatch(actions.setChatUsers(payload)),
    setChats: payload => dispatch(actions.setChats(payload)),
    setActiveChat: payload => dispatch(actions.setActiveChat(payload)),
    setIsRead: payload => dispatch(actions.setIsRead(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);