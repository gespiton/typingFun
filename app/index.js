import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import App from "./component/Layout";
import createStore from './redux/store';
require('./styles/main.sass');

const store = createStore();
render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={App}/>
      </Router>
    </Provider>,
    document.getElementById('app')
);
