import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateComment} from '../utils/PostsAPI';
import {editComment} from "../actions";
import FormModal from "./FormModal";

class EditComment extends Component {

  onModalSubmit = (modalData) => {

    let updatedComment = this.props.comment;
    updatedComment.timestamp = (new Date()).getTime();
    updatedComment.author = modalData.formAuthor;
    updatedComment.body = modalData.formBody;

    updateComment(updatedComment)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editComment({comment: updatedComment, postId: updatedComment.parentId}));
      })
  }

  render() {
    const {comment} = this.props;

    return (
      <div className='create-comment-wrapper'>
        <FormModal
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          comment={comment}
          title='Edit Comment'
          isEditMode={true}
        />
      </div>
    )
  }

}
export default connect()(EditComment)