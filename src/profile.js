import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Modal from 'react-modal';

import {LargeUser, Following, Followers} from './components/user/user.js';
import {UserContents} from './components/content/content.js';
import { url } from './app.js';

import './css/profile.css';

// data: null
export class Profile extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            user: null,
            authUser: null,
            editProfile: false // determine if editprofile pop up
        };
        this.FetchData();
    }
    
    FetchData() {
        const { username } = this.props.match.params
        fetch(url + '/users/'+username, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                user: info,
                authUser: this.state.authUser,
                editProfile: this.state.editProfile
            });
        })
        .catch((error) => {
            console.log(error);
        });
        
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
                user: this.state.user,
                authUser: info,
                editProfile: this.state.editProfile
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    handleOpenModal() {
        const newState = this.state;
        newState.editProfile = true;
        this.setState(newState);
    }
    
    handleCloseModal() {
        const newState = this.state;
        newState.editProfile = false;
        this.setState(newState);
    }
    
    render() {
        if(this.state.user!=null && this.state.authUser!=null){
            let EditProfileButton;
            if(this.state.user.username == this.state.authUser.username){
                EditProfileButton = <button onClick={() => {this.handleOpenModal()}}>Edit Profile</button>
            }
            else{
                EditProfileButton = <br></br>
            }
            return (
              <Router>
                  <div className='RightPart'>
                    <div>User Profile</div>
                    {EditProfileButton}
                    <LargeUser data={this.state.user} />
                    <br></br>
                    <Modal isOpen={this.state.editProfile} ariaHideApp={false}>
                      <EditProfile data={this.state.user} />
                      <button onClick={() => {this.handleCloseModal()}}>Close</button>
                    </Modal>
                    <Switch>
                      <Route exact path="/:username/">
                        <UserContents data={this.state.user.username} />
                      </Route>
                      <Route exact path="/:username/following">
                        <Following data={this.state.user.username} />
                      </Route>
                      <Route exact path="/:username/followers">
                        <Followers data={this.state.user.username} />
                      </Route>
                    </Switch>
                  </div>
                </Router>
            );
        }
        else {
            return (
              <div>
              loading
              </div>
            )
        }
    }
}

// data: user
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            image: null,
            avatar: url+'/'+this.props.data.avatar,
            bio: this.props.data.bio
        };
    }
    
    handleSubmit() {
        const token = window.localStorage['token'];
        console.log(token);
        fetch(url + '/user/info/bio', {
            method: 'PUT',
            headers: {
                'Authorization': token
            },
            body: JSON.stringify({
                bio: this.state.bio
            })
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
        })
        .catch((error) => {
            console.log(error);
        });
        
        if(this.state.image != null){
            const data = new FormData()
            data.append('avatar', this.state.image);
            
            fetch(url + '/user/info/avatar', {
                method: 'PUT',
                headers: {
                    'Authorization': window.localStorage['token']
                },
                body: data
            })
            .then((response) => (response.json()))
            .then((info) => {
                console.log(info);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    
    handleBioChange(event) {
        this.setState({
            image: this.state.image,
            avatar: this.state.avatar,
            bio: event.target.value
        });
    }
    
    handleAvatarChange(event) {
        const newImage = event.target.files[0];
        const newAvatar = URL.createObjectURL(event.target.files[0]);
        this.setState({
            image: newImage,
            avatar: newAvatar,
            bio: this.state.bio
        });
        event.target.value = null;
    }
    
    render() {
        return (
          <div className='EditProfile'>
            <div>Edit Profile</div>
            <form onSubmit={(event) => {
                this.handleSubmit()
            }}>
            <label>
              <img src={this.state.avatar} />
              <div>
                change avatar
                <input type="file" onChange={(event) => this.handleAvatarChange(event)} />
              </div>
              <div>
                bio
                <input type="text" value={this.state.bio} onChange={(event) => this.handleBioChange(event)} />
              </div>
            </label>
            <input type="submit" value="submit"/>
            </form>
          </div>
        )
    }
}

