import React from 'react';
import ReactDOM from "react-dom";
import Layout from "./modules/layout/index.jsx";
import './styles/style.less';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer/rootReducer";

const store = createStore(rootReducer);
window.store = store;

ReactDOM.render(
    <Provider store={store}><Layout /></Provider>,
    document.getElementById("root")
);
