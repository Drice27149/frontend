import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { App } from './app.js';
import { Login } from './login.js';
import { SignUp } from './signup.js';

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
                  <Route path="/">
                    <App />
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
