import AdminTable from "./adminTable.jsx";
import * as selectors from "./selectors";
import * as actions from "./actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    adminRawData: selectors.getAdminRawData(state),
});

const mapDispatchToProps = dispatch => ({
    setAdminRawData: payload => dispatch(actions.setAdminRawData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);