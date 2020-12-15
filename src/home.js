import React from 'react';

const url = 'http://localhost:8012';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
        this.getUserInfo();
    }
    
    getUserInfo() {
        const token = window.localStorage['token'];
        if(token === undefined){
            return ;
        }
        fetch(url + '/user', {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        })
        .then((response) => (response.json()))
        .then((info) => {
            this.setState({
                username: info.username
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    handleLogOut() {
        window.localStorage['token'] = '';
        window.location.replace('/login');
    }
    
    render() {
        if(this.state.username === '' || this.state.username === null || this.state.username === undefined){
            return (
                <div>Home</div>
            );
        }
        else {
            return (
                <>
                <div>home</div>
                    <div> {this.state.username} </div>
                    <button onClick = {() => { this.handleLogOut(); }}>
                        logout
                    </button>
                </>
            );
        }
    }
}

export default Home;
