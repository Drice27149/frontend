import React from 'react';

import {LargeUser} from './components/user/user.js';
import {MyContents} from './components/content/content.js';

const url = 'http://159.75.1.231:5005';

export class Profile extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            user: null
        };
        this.FetchData();
    }
    
    FetchData() {
        const token = window.localStorage['token'];
        fetch(url + '/users', {
            method: 'GET',
            headers: {
                'Authorization': token
            },
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
              <div>
                My Profile
                <LargeUser data={this.state.user} />
                <br></br>
                <MyContents data={this.state.user.username}/>
              </div>
            )
        }
        else {
            return (
              <div>
                loading
              </div>
            );
        }
    }
}

