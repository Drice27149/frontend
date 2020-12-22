import React from 'react';

import {MedUser, SmallUser} from '../user/user.js';
import { Comments, PostComment } from '../comment/comment.js';
import Modal from 'react-modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import './content.css';
import '../../css/app.css'

import { url } from '../../app.js';


// data: [url]
class PreviewImages extends React.Component {
    render() {
        const imagelist = this.props.data.map((url) => <img className='Preview' alt='' src={url} />)
        return (
          <div className='PreviewImages'>
            Preview Images
            {imagelist}
          </div>
        ); 
    }
}

export class PostContent extends React.Component {
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
            <div>Post Content</div>
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
                <input type="file" onChange={(event) => this.handleImageChange(event)} />
              </div>
            </label>
            <input type="submit" value="submit" />
            </form>
          </div>
        )
    }
}

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
        fetch(url + '/contents?type=user&username=' + this.props.data, {
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

// data: [(short)url]
export class ImageBlock extends React.Component {
    render() {
        const imagelist = this.props.data.map((imgurl, key) => <img src={url+'/'+imgurl} alt='' key={key} />);
        return (
          <div className='ImageBlock'>
            {imagelist}
          </div>
        );
    }
}

// data: [(short)url]
export class StatusImages extends React.Component {
    render() {
        return (
          <div>
            <div>Images:</div>
            <ImageBlock data={this.props.data} />
          </div>
        );
    }
}

// data: contentID, can be undefined
export class Status extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            historyID: null,
            authUser: null, 
            content: null,
            openModal: false,
            openDelete: false,
            like: false,
        };
        
        if(this.props.data===undefined || this.props.data===null) {
            this.FetchData();
        }
    }
    
    handleOpenModal() {
        const newState = this.state;
        newState.openModal = true;
        this.setState(newState);
    }
    
    handleCloseModal() {
        const newState = this.state;
        newState.openModal = false;
        this.setState(newState);
    }

    handleDelete() {
        const token = window.localStorage['token'];
        fetch(url + '/contents/' + this.state.content.contentID, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.openDelete = true;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleLike() {
        const token = window.localStorage['token'];
        fetch(url + '/contents/' + this.state.content.contentID + '/like', {
            method: 'PUT',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.like = true;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleDisLike() {
        const token = window.localStorage['token'];
        fetch(url + '/contents/' + this.state.content.contentID + '/like', {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.like = false;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    FetchData() {
        const { contentID } = this.props.match.params;
        fetch(url + '/contents/'+contentID, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.content = info;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });

        const token = window.localStorage['token'];

        fetch(url + '/contents/' + contentID + '/like', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.like = info.liked;
            this.setState(newState);
        })
        
        
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
    
    RefreshData(contentID) {
        console.log('Receive ID');
        console.log(contentID);
        fetch(url + '/contents/'+contentID, {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.content = info;
            this.setState(newState);
        })
        .catch((error) => {
            console.log(error);
        });

        const token = window.localStorage['token'];

        fetch(url + '/contents/' + contentID + '/like', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            const newState = this.state;
            newState.like = info.liked;
            this.setState(newState);
        })
        
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
    
    render() {
        console.log('ReRender');
        if(this.state.content!=null) {
            let LikeButton;
            let DislikeButton;
            let DeleteButton;
            if(this.state.authUser==null){
                DeleteButton = <div>loading</div>
            }
            else{
                if(this.state.like === true){
                    DislikeButton = <div className='DislikeButton'><DefaultButton onClick={() => {this.handleDisLike()}}>DisLike</DefaultButton></div>;
                    LikeButton = <div></div>
                }
                else{
                    LikeButton = <div className='LikeButton'><DefaultButton onClick={() => {this.handleLike()}}>Like</DefaultButton></div>;
                    DislikeButton = <div></div>;
                }

                if(this.state.authUser.username===this.state.content.author.username){
                    DeleteButton = <div className='DeleteButton'><DefaultButton onClick={() => {this.handleDelete()}}>Delete</DefaultButton></div>
                }
                else{
                    DeleteButton = <div></div>
                }
            }

            return (
              <div className='RightPart'>
              <div>Status</div>
              <div className='Status'>
                <MedUser data={this.state.content.author} />
                <div>Text:<br/>{this.state.content.text}</div>
                <StatusImages data={this.state.content.images} />
                {DeleteButton}
                <Modal isOpen={this.state.openDelete}>
                  <div>Delete Succeed</div>
                  <DefaultButton onClick={() => {
                      const newState = this.state;
                      newState.openDelete = false;
                      window.location.replace('/');
                  }}>
                    close
                  </DefaultButton>
                </Modal>
                {LikeButton}{DislikeButton}
                {
                  this.state.like ?
                  <div>You've liked this content</div> : null
                }
              </div>
              <div>
                <div>Comments</div>
                <DefaultButton onClick={() => {this.handleOpenModal()}}>
                  Post Comment
                </DefaultButton>
                <Modal isOpen={this.state.openModal}>
                  <PostComment data={this.state.content.contentID}/>
                  <DefaultButton onClick={() => {this.handleCloseModal()}}>Close</DefaultButton>
                </Modal>
                <Comments data={this.state.content.contentID}/>
              </div>
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
    handleClick() {
        const statusurl = '/status/'+this.props.data.contentID;
        window.location.replace(statusurl);
    }
    
    render() {
        return (
            <div className='Content' onClick={() => {this.handleClick()}}>
              <div><SmallUser data={this.props.data.author} /></div>
              <div>{this.props.data.text} </div>
              <br></br>
              <ImageBlock data={this.props.data.images} />
            </div>
        );
    }
}
