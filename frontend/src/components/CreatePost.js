import React, { Component } from 'react';
import {connect} from 'react-redux';
import {savePost, getUUID} from '../utils/PostsAPI';
import {addPost} from "../actions";
import PostModal from "./PostModal";

class CreatePost extends Component {

  onModalSubmit = (modalData) => {

    let newPost = {};
    newPost.id = getUUID();
    newPost.timestamp = (new Date()).getTime();
    newPost.author = modalData.formAuthor;
    newPost.body = modalData.formBody;
    newPost.title = modalData.formTitle;

    savePost(newPost)
      .then((savedPost) => {
        this.modal.handleModalClose();
        this.props.dispatch(addPost({post: savedPost}));
      })
  }

  render() {
    const {post} = this.props;

    return (
      <div className='create-post-wrapper'>
        <button
          onClick={()=>this.modal.handleModalOpen()}
          className='add-post'>
          Add a new Post
        </button>
        <PostModal
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          post={post}
          title='Add new Post'
          isEditMode={false}
        />
      </div>
    )
  }

}
export default connect()(CreatePost)