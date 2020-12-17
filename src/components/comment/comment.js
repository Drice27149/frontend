import React from 'react';

import { SmallUser } from '../user/user.js';

import './comment.css'

const url = 'http://159.75.1.231:5005';

// data: [contentID]
export class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null
        }
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
            const commentlist = this.state.comments.map((comment, key) => <Comment data={comment} key={key}/>);
            return (
              <div>
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
    render() {
        return (
          <div className='Comment'>
            <SmallUser data={this.props.data.creator} />
            <div>{this.props.data.text}</div> 
          </div>
        );
    }
}
