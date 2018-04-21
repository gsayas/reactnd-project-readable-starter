import React, { Component } from 'react';
import {connect} from 'react-redux';
import {savePost, getUUID} from '../utils/PostsAPI';
import {addPost} from "../actions";
import ModalForm from "./ModalForm.js";

class CreatePost extends Component {

  onModalSubmit = (modalData) => {

    let newPost = {};
    newPost.id = getUUID();
    newPost.timestamp = (new Date()).getTime();
    newPost.author = modalData.author;
    newPost.body = modalData.body;
    newPost.title = modalData.title;

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
        <ModalForm
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          entity={post}
          title='Add new Post'
          isEditMode={false}
          showTitleField={true}
        />
      </div>
    )
  }

}
export default connect()(CreatePost)