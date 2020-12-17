import React from 'react';

import './user.css';

const url = 'http://159.75.1.231:5005';

// data: user
export class LargeUser extends React.Component {
    
    handleClickFollowing() {
        const followingurl = '/'+this.props.data.username+'/following';
        window.location.replace(followingurl);
    }
    
    handleClickFollwers() {
        const followersurl = '/'+this.props.data.username+'/followers';
        window.location.replace(followersurl);
    }
    
    render() {
        const avatarurl = url+'/'+this.props.data.avatar;
        return (
            <div className='LargeUser'>
                <div>username:{this.props.data.username}</div>
                <img src={avatarurl} alt='Avatar'/>
                <div>bio:{this.props.data.bio}</div>
                <div onClick={() => {this.handleClickFollowing()}}>{this.props.data.followingNum} following </div>
                <div onClick={() => {this.handleClickFollwers()}}>{this.props.data.followerNum} followers </div>
            </div>
        );
    }
}

export class MedUser extends React.Component {
    render() {
        const avatarurl = url+'/'+this.props.data.avatar;
        return (
            <div className='MedUser'>
                <div>username:{this.props.data.username}</div>
                <img src={avatarurl} alt='Avatar'/>
                <div>bio:{this.props.data.bio}</div>
            </div>
        );
    }
}

export class SmallUser extends React.Component {
    
    handleClick(){
        const userurl = '/'+this.props.data.username;
        window.location.replace(userurl);
    }
    
    render() {
        const avatarurl = url+'/'+this.props.data.avatar;
        return (
            <div className='SmallUser' onClick={(event) => {
                event.stopPropagation();
                this.handleClick();
            }}>
                <div>username:{this.props.data.username}</div>
                <img src={avatarurl} alt='Avatar'/>
            </div>
        );
    }
}

// data: [user]
export class Users extends React.Component {
    render() {
        const userlist = this.props.data.map((user, key) => <SmallUser data={user} key={key} />)
        return (
            <div>
              {userlist}
            </div>
        );
    }
}

// data: username
export class Followers extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            users: null
        };
        this.FetchData();
    }
    
    FetchData() {
        fetch(url + '/users/'+this.props.data+'/followers', {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                users: info
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.users!=null){
            return (
                <div>
                  Followers
                  <Users data={this.state.users} />
                </div>
            );
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

// data: username
export class Following extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            users: null
        };
        this.FetchData();
    }
    
    FetchData() {
        fetch(url + '/users/'+this.props.data+'/following', {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                users: info
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.users!=null){
            return (
                <div>
                  Following
                  <Users data={this.state.users} />
                </div>
            );
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


