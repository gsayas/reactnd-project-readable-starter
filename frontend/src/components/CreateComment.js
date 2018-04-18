import React, { Component } from 'react';
import {connect} from 'react-redux';
import {saveComment, getUUID} from '../utils/PostsAPI';
import {addComment} from "../actions";
import FormModal from "./FormModal";

class CreateComment extends Component {

  onModalSubmit = (modalData) => {

    this.setState(() => ({ savingComment: true }))

    let newComment = {};
    newComment.id = getUUID();
    newComment.parentId = this.props.postId;
    newComment.timestamp = (new Date()).getTime();
    newComment.author = modalData.formAuthor;
    newComment.body = modalData.formBody;

    saveComment(newComment)
      .then((savedComment) => {
        this.modal.handleModalClose();
        this.props.dispatch(addComment({comment: savedComment, postId: this.props.postId}));
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
          title='Add New Comment'
          editMode={false}
        />
      </div>
    )
  }

}
export default connect()(CreateComment)