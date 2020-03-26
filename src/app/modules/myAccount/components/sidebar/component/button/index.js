import ButtonSidebar from "./ButtonSidebar.jsx";
import {connect} from "react-redux";
import * as actions from "../../../../../app/actions";

const mapStateToProps = state => ({
    isStateButton: state.account.isStateButtonSidebar,

     isStateBtn :  state.account.isStateBtnInState,
});

const mapDispatchToProps = dispatch => ({
    checkKnowledge: () => dispatch(actions.changeBtnActions()),
    changeStateButton: () => dispatch(actions.changeButtonSidebarState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSidebar);