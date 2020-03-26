import {connect} from "react-redux";
import Component from "./AddInfo.jsx";
import * as actions from "./actions.js";
import * as selectors from "../userProfile/selectors";

const mapStateToProps = state => ({
    isStateButton: state.addInfo.isStateButtonAddInfo,
    dictionary: state.translates.dictionary
});

const mapDispatchToProps = dispatch => ({
    changeStateButton: () => dispatch(actions.changeButtonAddInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);