import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateComment} from '../utils/PostsAPI.js';
import {editComment} from "../actions";
import ModalForm from "./ModalForm.js";

class EditComment extends Component {

  onModalSubmit = (modalData) => {

    let commentUpdater = {};
    commentUpdater.id = this.props.comment.id;
    commentUpdater.timestamp = (new Date()).getTime();
    commentUpdater.body = modalData.body;

    updateComment(commentUpdater)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editComment({comment: commentUpdater, postId: this.props.postId}));
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