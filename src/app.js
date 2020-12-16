import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home } from './home.js';
import { Profile } from './profile.js';

const url = 'http://159.75.1.231:5005';

export class App extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
              <div>
                <ul>
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/profile">profile</Link>
                  </li>
                </ul>

                <hr />

                {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                </Switch>
              </div>
            </Router>
        )
    }
}

export default App;
