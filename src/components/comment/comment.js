import React from 'react';

import { SmallUser } from '../user/user.js';
import Modal from 'react-modal';

import './comment.css'

import { url } from '../../app.js';

// data: contentID
export class PostComment extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: ""
        };
    }
    
    handleSubmit() {
        const token = window.localStorage['token'];
        if(token != undefined && token != null) {
            fetch(url + '/comments', {
                method: 'POST',
                headers: {
                    'Authorization': token
                }, 
                body: JSON.stringify({
                    contentID: this.props.data, 
                    text: this.state.text
                })
            })
            .then((response) => (response.json()))
            .then((info) => {
                if(info.status === 'success') {
                    console.log('post comment succeed');
                }
                else {
                    console.log('post comment');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    
    handleTextChange(event) {
        this.setState({
           text: event.target.value 
        });
    }
    
    render() {
        return (
          <div>
            Post Comment
            <form onSubmit={(event) => {
                // event.preventDefault();
                this.handleSubmit()
            }}>
            <label>
              <div>
                text
                <input type="text" value={this.state.text} onChange={(event) => this.handleTextChange(event)} />
              </div>
            </label>
            <input type="submit" value="submit" />
            </form>
          </div>
        );
    }
}

// data: [contentID]
export class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null
        }
        this.FetchData = this.FetchData.bind(this);
        this.FetchData();
    }
    
    FetchData() {
        fetch(url + '/comments?contentID=' + this.props.data, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({ comments: info });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.comments!=null){
            const commentlist = this.state.comments.map((comment, key) => 
            <Comment data={comment} UpdateParent={this.FetchData} key={key}/>);
            return (
              <div className='CommentList'>
                {commentlist}
              </div>
            );
        }
        else{
            return (
              <div>
              loading
              </div>
            );
        }
    }
}

// data: comment
export class Comment extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            authUser: null,
            openModal: false
        };
        this.FetchData();
    }
    
    FetchData() {
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
            const newState = this.state;
            newState.authUser = info;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    handleDelete() {
        const token = window.localStorage['token'];
        fetch(url + '/comments/' + this.props.data.commentID, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.openModal = true;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        let DeleteButton;
        if(this.state.authUser==null){
            DeleteButton = <div>loading</div>
        }
        else{
            if(this.state.authUser.username==this.props.data.creator.username){
                DeleteButton = <button className='DeleteButton' onClick={() => {
                    this.handleDelete();
                }}>
                  Delete
                </button>
            }
            else{
                DeleteButton = <div></div>
            }
        }
        return (
          <div className='Comment'>
            <SmallUser data={this.props.data.creator} />
            <div>{this.props.data.text}</div> 
            {DeleteButton}
            <Modal isOpen={this.state.openModal}>
              <div>
                Delete Succeed
              </div>
              <button onClick={() => {
                  this.props.UpdateParent();
                  const newState = this.state;
                  newState.openModal = false;
                  this.setState(newState);
              }}>
                close
              </button>
            </Modal>
          </div>
        );
    }
}
