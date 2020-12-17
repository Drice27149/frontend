import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import {LargeUser, Following, Followers} from './components/user/user.js';
import {UserContents} from './components/content/content.js';

const url = 'http://159.75.1.231:5005';

// data: null
export class Profile extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            user: null
        };
        this.FetchData();
    }
    
    FetchData() {
        const { username } = this.props.match.params
        fetch(url + '/users/'+username, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                user: info
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.user!=null){
            return (
              <Router>
                  <div>
                    User Profile
                    <LargeUser data={this.state.user} />
                    <br></br>
                    <Switch>
                      <Route exact path="/:username/">
                        <UserContents data={this.state.user.username} />
                      </Route>
                      <Route exact path="/:username/following">
                        <Following data={this.state.user.username} />
                      </Route>
                      <Route exact path="/:username/followers">
                        <Followers data={this.state.user.username} />
                      </Route>
                    </Switch>
                  </div>
                </Router>
            );
        }
        else {
            return (
              <div>
              loading
              </div>
            )
        }
    }
}

