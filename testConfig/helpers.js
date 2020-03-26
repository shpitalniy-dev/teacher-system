import { mount, shallow, configure } from 'enzyme';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import mochaSnapshots from 'mocha-snapshots';

// ------------------
// React
// ------------------
global.React = React;
global.ReactDOM = ReactDOM;
global.PropTypes = PropTypes;

// ------------------
// Mocha Snapshots
// ------------------
global.mochaSnapshots = mochaSnapshots;
mochaSnapshots.setup({ sanitizeClassNames: false });

// ------------------
// Sinon
// ------------------
global.sinon = sinon;

// ------------------
// Chai
// ------------------
global.expect = expect;
global.assert = assert;

// ------------------
// Enzyme
// ------------------
configure({ adapter: new Adapter() });
global.mount = mount;
global.shallow = shallow;

// ------------------
// Helpers
// ------------------
global.createSnapshot = Component => {
    const wrapper = shallow(Component);
    expect(wrapper).to.matchSnapshot();
};
global.shallowRender = Component => {
    return shallow(Component);
};
global.mountRender = Component => {
    return mount(Component);
};