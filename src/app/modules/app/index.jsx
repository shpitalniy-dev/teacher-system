import App from "./App.jsx";
import * as selectors from "./selectors";
import * as actions from "./actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    groupNames: selectors.getGroupNames(state),
    activeGroup: selectors.getActiveGroup(state),
    usersRawData: selectors.getUsersRawData(state),
    dictionary: selectors.getDictionary(state),
    teacher: selectors.getTeacher(state),
    update: selectors.getUpdate(state),
});

const mapDispatchToProps = dispatch => ({
    setGroupNames: payload => dispatch(actions.setGroupNames(payload)),
    setActiveGroup: payload => dispatch(actions.setActiveGroup(payload)),
    setUsersRawData: payload => dispatch(actions.setUsersRawData(payload)),
    setUpdateStudent: payload => dispatch(actions.setUpdateStudent(payload)),
    setConfirm: payload => dispatch(actions.setConfirm(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);