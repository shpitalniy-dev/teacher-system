import Paint from "./Paint.jsx";
import * as selectors from "./selectors";
import * as actions from "./actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    lines: selectors.getLines(state),
});

const mapDispatchToProps = dispatch => ({
    setLines: payload => dispatch(actions.setLines(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Paint);