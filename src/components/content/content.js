import React from 'react';

import {LargeUser, MedUser, SmallUser} from '../user/user.js';
import { Comments } from '../comment/comment.js';

import './content.css';

const url = 'http://159.75.1.231:5005';

// data: username
export class UserContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: null
        }
        this.FetchData();
    }
    
    FetchData() {
        fetch(url + '/contents?username=' + this.props.data, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({ contents: info });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        if(this.state.contents!=null){
            return (
                <div>
                  <div>User contents</div>
                  <Contents data={this.state.contents} />
                </div>
            )
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

// data: content, can be undefined
export class Status extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: null
        };
        
        if(this.props.data==undefined || this.props.data==null) {
            this.FetchData();
        }
    }

    FetchData() {
        const { contentID } = this.props.match.params;
        fetch(url + '/contents/'+contentID, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                content: info
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.content!=null) {
            return (
              <div>
                <Content data={this.state.content} />
                  <div>
                    Comments
                  </div>
                <Comments data={this.state.content.contentID} />
              </div>
            );
        }
        else {
            return (
              <div>
                loading
              </div>
            );
        }
    }
}

// data: [cotent]
export class Contents extends React.Component {
    render() {
        const contentlist = this.props.data.map((content, key) => <Content data={content} key={key} />)
        console.log(contentlist);
        return (
            <div>
              {contentlist}
            </div>
        );
    }
}

// data: content
export class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleClick() {
        const statusurl = '/status/'+this.props.data.contentID;
        window.location.replace(statusurl);
    }
    
    render() {
        return (
            <div className='Content' onClick={() => {this.handleClick()}}>
              <div><SmallUser data={this.props.data.author} /></div>
              <div>title: {this.props.data.title} </div>
              <div>text: {this.props.data.text} </div>
              <br></br>
            </div>
        );
    }
}
