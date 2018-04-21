import React, { Component } from 'react';
import {connect} from 'react-redux';
import {saveComment, getUUID} from '../utils/PostsAPI.js';
import {addComment} from "../actions";
import ModalForm from "./ModalForm.js";

class CreateComment extends Component {

  onModalSubmit = (modalData) => {

    this.setState(() => ({ isSavingForm: true }))

    let newComment = {};
    newComment.id = getUUID();
    newComment.parentId = this.props.postId;
    newComment.timestamp = (new Date()).getTime();
    newComment.author = modalData.author;
    newComment.body = modalData.body;

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
        <button
          onClick={()=>this.modal.handleModalOpen()}
          className='leave-comment'>
          Leave a comment!
        </button>
        <ModalForm
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          entity={comment}
          title='Add New Comment'
          editMode={false}
          showTitleField={false}
        />
      </div>
    )
  }

}
export default connect()(CreateComment)