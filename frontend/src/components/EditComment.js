import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateComment} from '../utils/PostsAPI.js';
import {editComment} from "../actions";
import ModalForm from "./ModalForm.js";

class EditComment extends Component {

  onModalSubmit = (modalData) => {

    let updatedComment = this.props.comment;
    updatedComment.timestamp = (new Date()).getTime();
    updatedComment.author = modalData.author;
    updatedComment.body = modalData.body;

    updateComment(updatedComment)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editComment({comment: updatedComment, postId: updatedComment.parentId}));
      })
  }

  render() {
    const {comment} = this.props;

    return (
      <div className='edit-comment-wrapper'>
        <a
          href='javascript:void(0)'
          onClick={()=>this.modal.handleModalOpen()}>
          edit
        </a>
        <ModalForm
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          entity={comment}
          title='Edit Comment'
          isEditMode={true}
          showTitleField={false}
        />
      </div>
    )
  }

}
export default connect()(EditComment)