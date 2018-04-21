import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updatePost} from '../utils/PostsAPI';
import {editPost} from "../actions";
import ModalForm from "./ModalForm.js";

class EditPost extends Component {

  onModalSubmit = (modalData) => {

    let updatedPost = this.props.post;//TODO: objects in redux store shouldn't be modified directly
    updatedPost.timestamp = (new Date()).getTime();
    updatedPost.author = modalData.author;
    updatedPost.body = modalData.body;
    updatedPost.title = modalData.title;

    updatePost(updatedPost)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editPost({post: updatedPost}));
      })
  }

  render() {
    const {post} = this.props;

    return (
      <div className='edit-post-wrapper'>
        <a
          href='javascript:void(0)'
          onClick={()=>this.modal.handleModalOpen()}>
          edit
        </a>
        <ModalForm
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          entity={post}
          title='Edit Post'
          isEditMode={true}
          showTitleField={true}
        />
      </div>
    )
  }

}
export default connect()(EditPost)