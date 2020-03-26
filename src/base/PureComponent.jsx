import React from "react";
import equal from 'deep-equal';

const deepEqual = (a, b) => equal(a, b);

export default class PureComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let isEqual = deepEqual(nextProps, this.props);
        isEqual = isEqual && deepEqual(nextState, this.state);
        isEqual = isEqual && deepEqual(nextContext, this.context);
        return !isEqual;
    }
}