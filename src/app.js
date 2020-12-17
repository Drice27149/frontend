import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home } from './home.js';
import { Profile } from './profile.js';
import { Status } from './components/content/content.js';

const url = 'http://159.75.1.231:5005';

export class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
        this.FetchData();
    }
    
    FetchData(){
        const token = window.localStorage['token'];
        fetch(url + '/user', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                username: info.username
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    handleClickHome() {
        const homeurl = '/';
        window.location.replace(homeurl);
    }
    
    handleClickProfile() {
        const userurl = '/'+this.state.username;
        window.location.replace(userurl);
    }
    
    render() {
        if(this.state.username!=null){
            return (
                <Router>
                  <div>
                    <div onClick={() => {this.handleClickHome()}}>Home</div>
                    <div onClick={() => {this.handleClickProfile()}}>Profile</div>
                    <hr />
                    
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route path="/status/:contentID" component={Status}/>
                      <Route path="/:username" component={Profile} />
                    </Switch>
                  </div>
                </Router>
            )
        }
        else{
            return (
                <div>
                  loading
                </div>
            )
        }
    }
}

export default App;
