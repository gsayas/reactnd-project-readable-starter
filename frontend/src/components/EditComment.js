import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateComment} from '../utils/PostsAPI';
import {editComment} from "../actions";
import FormModal from "./FormModal";

class EditComment extends Component {

  onModalSubmit = (modalData) => {

    let newComment = this.props.comment;
    newComment.timestamp = (new Date()).getTime();
    newComment.author = modalData.formAuthor;
    newComment.body = modalData.formBody;

    updateComment(newComment)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editComment({comment: newComment, postId: newComment.parentId}));
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
          editMode={true}
        />
      </div>
    )
  }

}
export default connect()(EditComment)