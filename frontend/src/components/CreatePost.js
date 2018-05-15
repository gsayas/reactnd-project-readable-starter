import React, { Component } from 'react';
import {connect} from 'react-redux';
import {savePost, getUUID} from '../utils/PostsAPI';
import {addPost} from "../actions/postsActions.js";
import PostModal from "./PostModal.js";
import {reportMessage} from "../actions/postsActions";

class CreatePost extends Component {

  onModalSubmit = (modalData) => {

    let postCreator = {};
    postCreator.id = getUUID();
    postCreator.timestamp = (new Date()).getTime();
    postCreator.author = modalData.author;
    postCreator.body = modalData.body;
    postCreator.title = modalData.title;
    postCreator.category = modalData.category;

    savePost(postCreator)
      .then((savedPost) => {
        this.modal.handleModalClose();
        this.props.dispatch(addPost({post: savedPost}));
        this.props.dispatch(reportMessage('Post successfully added!'));
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
          entity={post}
          title='Add new Post'
          isEditMode={false}
        />
      </div>
    )
  }

}
export default connect()(CreatePost)