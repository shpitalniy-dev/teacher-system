import React from "react";
import PropTypes from "prop-types";
import { sendTime } from "../../../library/requests/requests";
export default class Calculator extends React.Component {
    static propTypes = {
        dictionary: PropTypes.object.isRequired,
        teacher: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.start = 0;
        this.finish = 0;
    }

    componentDidMount() {
        this.start = Date.now();
    }

    componentWillUnmount() {
        const { teacher } = this.props;
        this.finish = Date.now();
        sendTime(teacher, "calculator", this.finish - this.start);
    }

    render() {
        return (
            <div>
                CALCULATOR
            </div>
        )
    }
}
