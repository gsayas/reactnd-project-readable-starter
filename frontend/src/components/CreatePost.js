import React, { Component } from 'react';
import {connect} from 'react-redux';
import {savePost, getUUID} from '../utils/PostsAPI';
import {addPost} from "../actions";
import ModalForm from "./ModalForm.js";

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