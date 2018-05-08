import React, { Component } from 'react';
import {connect} from 'react-redux';
import {saveComment, getUUID} from '../utils/PostsAPI.js';
import {addComment} from "../actions";
import CommentModal from "./CommentModal.js";

class CreateComment extends Component {

  onModalSubmit = (modalData) => {

    this.setState(() => ({ isSavingForm: true }))

    let commentCreator = {};
    commentCreator.id = getUUID();
    commentCreator.parentId = this.props.postId;
    commentCreator.timestamp = (new Date()).getTime();
    commentCreator.author = modalData.author;
    commentCreator.body = modalData.body;

    saveComment(commentCreator)
      .then((savedComment) => {
        this.modal.handleModalClose();
        this.props.dispatch(addComment({comment: savedComment, postId: this.props.postId}));
      })

  }
  render() {
    const {comment} = this.props;

    return (
      <div className='create-comment-wrapper'>
        <button
          onClick={()=>this.modal.handleModalOpen()}
          className='leave-comment'>
          Leave a comment!
        </button>
        <CommentModal
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          entity={comment}
          title='Add New Comment'
          editMode={false}
        />
      </div>
    )
  }

}
export default connect()(CreateComment)