import Layout from "./layout.jsx";
import * as selectors from "./selectors";
import * as actions from "./actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    isAuth: selectors.getIsAuth(state),
    locale: selectors.getLocale(state),
    dictionary: selectors.getDictionary(state),
    isModal: selectors.getIsModal(state),
    modal: selectors.getModal(state),
});

const mapDispatchToProps = dispatch => ({
    changeMode: () => dispatch(actions.changeMode()),
    changeLocale: payload => dispatch(actions.changeLocale(payload)),
    toggleModalWindow: () => dispatch(actions.toggleModalWindow()),
    toggleModal: payload => dispatch(actions.toggleModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);