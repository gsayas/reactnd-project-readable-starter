import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateComment} from '../utils/PostsAPI.js';
import {editComment} from "../actions";
import CommentModal from "./CommentModal.js";

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
        <CommentModal
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          entity={comment}
          title='Edit Comment'
          isEditMode={true}
        />
      </div>
    )
  }

}
export default connect()(EditComment)