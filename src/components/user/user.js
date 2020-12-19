import React from 'react';

import './user.css';

import { url } from '../../app.js';

// data: user
export class LargeUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: null,
            following: null
        };
        this.FetchData();
    }
    
    FetchData() {
        fetch(url + '/user/following/'+this.props.data.username, {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage['token']
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            if(info.status=='Mutually following' || info.status=='following'){
                this.setState({
                    user: this.state.user,
                    following: true
                });
            }
            else{
                this.setState({
                    user: this.state.user,
                    following: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                following: undefined
            });
            console.log(error);
        });
        
        fetch(url + '/users/'+this.props.data.username, {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage['token']
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.user = info;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    
    handleClickFollowing() {
        const followingurl = '/'+this.props.data.username+'/following';
        window.location.replace(followingurl);
    }
    
    handleClickFollwers() {
        const followersurl = '/'+this.props.data.username+'/followers';
        window.location.replace(followersurl);
    }
    
    handleFollowAction(action) {
        console.log('follow action');
        
        fetch(url + '/user/following/'+this.props.data.username, {
            method: action,
            headers: {
                'Authorization': window.localStorage['token']
            }
        })
        .then((response) =>  {
            console.log(response);
            this.FetchData();
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.user!=null){
            const avatarurl = url+'/'+this.state.user.avatar;
            let followButton;
            if(this.state.following===null){
                followButton = <div>loading</div>
            }
            else if(this.state.following===undefined){
                followButton = <div>self</div>
            }
            else{
                if(this.state.following) {
                    followButton = <button onClick={() => {this.handleFollowAction('DELETE')}}>Unfollow</button>
                }
                else{
                    followButton = <button onClick={() => {this.handleFollowAction('PUT')}}>Follow</button>
                }
            }
            return (
                <div className='LargeUser'>
                    <div>username:{this.props.data.username}</div>
                    <img src={avatarurl} alt='Avatar'/>
                    <div>bio:{this.props.data.bio}</div>
                    {followButton}
                    <div onClick={() => {this.handleClickFollowing()}}>{this.state.user.followingNum} following </div>
                    <div onClick={() => {this.handleClickFollwers()}}>{this.state.user.followerNum} followers </div>
                </div>
            );
        }
        else{
            return (
              <div>loading</div>
            );
        }
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


