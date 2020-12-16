import React from 'react';

export class Home extends React.Component {

    handleLogOut() {
        window.localStorage['token'] = '';
        window.location.replace('/login');
    }
    
    render() {
        return (
            <div>
              <button onClick={() => {this.handleLogOut()}}>
              logout
              </button>
            </div>
        );
    }
}

