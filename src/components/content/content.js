import React from 'react';

import {LargeUser, MedUser, SmallUser} from '../user/user.js';

const url = 'http://159.75.1.231:5005';

export class MyContents extends React.Component {
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
                  <div>My contents</div>
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

export class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
              <div>contentID: {this.props.data.contentID}</div>
              <div><MedUser data={this.props.data.author} /></div>
              <div>title: {this.props.data.title} </div>
              <div>text: {this.props.data.text} </div>
              <br></br>
            </div>
        );
    }
}
