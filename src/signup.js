import React from 'react';

const url = 'http://localhost:8012';

class SignUp extends React.Component {
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
        fetch(url + '/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => (response.json()))
        .then((info) => {
            if(info.status === 'succeed') {
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

export default SignUp;
