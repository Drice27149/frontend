import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from './home.js';
import Login from './login.js';
import SignUp from './signup.js';

import './index.css';

class Routes extends React.Component {
    render() {
        return (
           <Router>
              <div>
                <Switch>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <Route path="/home">
                    <Home />
                  </Route>
                </Switch>
              </div>
           </Router>
        )
    }
}

// ========================================

ReactDOM.render(
  <Routes />, 
  document.getElementById('root')
);
