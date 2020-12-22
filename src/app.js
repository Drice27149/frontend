import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from './home.js';
import { Profile } from './profile.js';
import { Status } from './components/content/content.js';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Container, Row, Col } from 'reactstrap';

import './css/app.css';

// export const url = 'http://localhost:5005';
export const url = 'http://159.75.1.231:5005';

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
                  <div className='SideBar'>
                    <DefaultButton className="Button" onClick={() => {this.handleClickHome()}}>Home</DefaultButton>
                    <DefaultButton className="Button" onClick={() => {this.handleClickProfile()}}>Profile</DefaultButton>
                  </div>
                  <div className='DashBoard'>
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
                <Container className="tips-content">
                	<Row>
                		<Col md={{size:4, offset:4}}>
                			<div className="tips-title">
                				Please Login
                			</div>
                		</Col>
                	</Row>
                	<Row>
                		<Col md={{size:4, offset:4}}>
                			<div>
                				<DefaultButton className="tips-button" text="login" onClick={() => {window.location.replace('/login')}} />
                			</div>
                		</Col>
                	</Row>
                </Container>
            )
        }
    }
}

export default App;
