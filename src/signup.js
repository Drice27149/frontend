import React from 'react';
import { withRouter } from 'react-router-dom'
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Container, Row, Col } from 'reactstrap';
import './login.css'


import { url } from './app.js';
const eventsArr = [
	    //按钮点击事件
	    "handleSubmit",
	    //user name输入改变
	    "handleChangeName",
	    //password输入改变
	    "handleChangePassword"
	];

export class SignUp extends React.Component {
	
	constructor(props) {
	    super(props);
		
		eventsArr.map((ev) => {
		            this[ev] = this[ev].bind(this);
		            return "";
		        });
				
		this.state = {
			userName : '',
			passWord : '',
			errMsg : ''
		};
	}
	
	
	handleChangeName(event){
	   this.setState(
	   	{
	   		userName:event.target.value,
			passWord:this.state.passWord
	   	}
	   );
	}
	
	handleChangePassword(event){
		
	    this.setState(
	    	{
				userName:this.state.userName,
	    		passWord:event.target.value
	    	}
	    );
	}
	
	handleSubmit(event) {
	    event.preventDefault();
		var a=this.state.userName;
		var b=this.state.passWord;
		console.log(this.state.userName);
		console.log(this.state.passWord);
	    fetch(url + '/users/signup', {
	        method: 'POST',
	        body: JSON.stringify({
	            username: this.state.userName,
	            password: this.state.passWord
	        })
	    })
	    .then((response) => (response.json()))
	    .then((info) => {
			console.log(info);
	        if(info.status === 'success') {
	            window.localStorage['token'] = info.token;
	            console.log('logup succeed');
	            console.log('token: ' + info.token);
	            window.location.replace('/login')
	        }
	        else {
	            console.log('sign up failed');
	        }
	    })
	    .catch((error) => {
	        console.log(error);
	    });
		
	}
	
	render(){
		return(
			<Container className="signin-body">
			                <Row>
			                    <Col md={{ size: 4, offset: 4 }}>
			                        <div className="signin-title">
			                            Sign up
			                        </div>
			                    </Col>
			                </Row>
			                <Row>
			                    <Col md={{ size: 4, offset: 4 }}>
			                        <div className="signin-content">
			                            <TextField label="User Name" Value={this.state.userName}   onChange={this.handleChangeName} />
			                            <TextField label="Password" value={this.state.passWord} type="Password" onChange={this.handleChangePassword}  />
			                            <DefaultButton className="signin-button" text="Sign Up" onClick={this.handleSubmit} />
										<DefaultButton className="signup-button" text="Return" onClick = {() => { window.location.replace('/login') }} />
			                        </div>
			                    </Col>
			                </Row>
			</Container>
	
		);
	}
}


/*
import React from 'react';

import { url } from './app.js';

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '',
                    password: ''};
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value,
                    password: this.state.password});
    }
  
    handlePasswordChange(event) {
        this.setState({username: this.state.username,
                    password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(url + '/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => (response.json()))
        .then((info) => {
            if(info.status === 'success') {
                console.log('sign up succeed');
                window.location.replace('/login');
            }
            else {
                console.log('sign up failed');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

  render() {
    return (
    <>
      <div>sign up</div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
            <div>
                name:
                <input type="text" value={this.state.username} onChange={(event) => this.handleUsernameChange(event)} />
            </div>
            <div>
                password:
                <input type="text" value={this.state.password} onChange={(event) => this.handlePasswordChange(event)} />
            </div>
        </label>
        <input type="submit" value="submit" />
        </form>
    </>
    );
  }
}
*/