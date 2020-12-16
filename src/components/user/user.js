import React from 'react';

import './user.css';

const url = 'http://159.75.1.231:5005';

export class SmallUser extends React.Component {
    // data is an user
    render() {
        return (
            <div>
                <div>username:{this.props.data.username}</div>
                <img src={this.props.data.Avatar} alt='Avatar'/>
                <div>bio:{this.props.data.bio}</div>
            </div>
        );
    }
}

export class MedUser extends React.Component {
    // data is an user
    render() {
        return (
            <div>
                <div>username:{this.props.data.username}</div>
                <img src={this.props.data.Avatar} alt='Avatar'/>
                <div>bio:{this.props.data.bio}</div>
            </div>
        );
    }
}

export class LargeUser extends React.Component {
    // data is an user
    render() {
        return (
            <div>
                <div>username:{this.props.data.username}</div>
                <img src={this.props.data.Avatar} alt='Avatar'/>
                <div>bio:{this.props.data.bio}</div>
            </div>
        );
    }
}
