import React from 'react';

import './css/home.css';

const url = 'http://159.75.1.231:5005';

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
            <PostContent />

          </div>
        );
    }
}

// data: [url]
export class PreviewImages extends React.Component {
    render() {
        const imagelist = this.props.data.map((url) => <img className='Preview' src={url} />)
        return (
          <div className='PreviewImages'>
            Preview Images
            {imagelist}
          </div>
        ); 
    }
}

class PostContent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            images: [],
            urls: []
        };
    }
    
    handleSubmit() {
        console.log('called');
        const data = new FormData()
        data.append('title', '');
        data.append('text', this.state.text);
        this.state.images.forEach((image) => {
            data.append('images',image);
        });
        
        const token = window.localStorage['token'];
        
        fetch(url + '/contents', {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: data
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            if(info.status === 'success') {
                console.log('Post succeed');
                window.location.replace('/');
            }
            else {
                console.log('Post failed');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    handleTextChange(event) {
        this.setState({
            text: event.target.value,
            images: this.state.images,
            urls: this.state.urls
        });    
    }
    
    handleImageChange(event) {
        const newImages = this.state.images;
        newImages.push(event.target.files[0]);
        const newUrls = this.state.urls;
        newUrls.push(URL.createObjectURL(event.target.files[0]));
        this.setState({
            text: this.state.text,
            images: newImages, 
            urls: newUrls
        }); 
        console.log(this.state.images);
        console.log(this.state.urls);
        event.target.value = null;
    }

    render() {
        return (
          <div className='PostContent'>
            <div>Post</div>
            <form onSubmit={(event) => {
                event.preventDefault();
                this.handleSubmit()
            }}>
            <label>
              <div>
                text
                <input type="text" value={this.state.text} onChange={(event) => this.handleTextChange(event)} />
              </div>
              <PreviewImages data={this.state.urls}/>
              <div>
                image
                <input type="file" value={this.state.image} onChange={(event) => this.handleImageChange(event)} />
              </div>
            </label>
            <input type="submit" value="submit" />
            </form>
          </div>
        )
    }
}

