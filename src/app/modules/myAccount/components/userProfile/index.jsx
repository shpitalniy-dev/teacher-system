import {connect} from "react-redux";
import Component from "./UserProfile.jsx";
import * as actions from "./actions.js";
import * as selectors from "./selectors.js";
import config from "../../../../config";


const mapStateToProps = state => ({
    isChangeMode: selectors.getUserProfileMode(state),
    //isStateButton: config.defaultStateButtonUserProfile,
    isStateButton: state.userProfile.isStateButtonUserProfile,
    dictionary: state.translates.dictionary
});

const mapDispatchToProps = dispatch => ({
    toggleUserProfileMode: () => dispatch(actions.toggleUserProfileMode()),
    changeStateButton: () => dispatch(actions.changeButtonUserProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);