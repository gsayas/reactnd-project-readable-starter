import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updatePost} from '../utils/PostsAPI';
import {editPost} from "../actions";
import ModalForm from "./ModalForm.js";

class EditPost extends Component {

  onModalSubmit = (modalData) => {

    let postUpdater = {};
    postUpdater.id = this.props.post.id;
    postUpdater.timestamp = (new Date()).getTime();
    postUpdater.body = modalData.body;
    postUpdater.title = modalData.title;
    postUpdater.category = modalData.category;

    updatePost(postUpdater)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editPost({post: postUpdater}));
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