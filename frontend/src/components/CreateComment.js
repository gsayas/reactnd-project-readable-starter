import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading'
import {connect} from 'react-redux';
import {saveComment, updateComment, getUUID} from '../utils/PostsAPI';
import {fetchComments, loadPost, addComment} from "../actions";

class CreateComment extends Component {
  state = {
    modalOpen: false,
    savingComment: false,
    formBody: '',
    formAuthor: '',
    formPristine: true
  }
  handleModalOpen = () => {
    const {comment} = this.props;
    this.setState(() => ({
      modalOpen: true,
      formAuthor: comment !== undefined ? comment.author: '',
      formBody: comment !== undefined ? comment.body: ''
    }));
  }
  handleModalClose = () => {
    this.setState(() => ({
      modalOpen: false,
      formAuthor: '',
      formBody: ''
    }));
  }
  handleChange = (newState) => {
    this.setState(newState);
  }
  handleSubmitComment = (e) => {
    // if (!this.input.value) {
    //   return
    // }
    //TODO: Validate form here

    e.preventDefault();

    this.setState(() => ({ savingComment: true }))

    let newComment = this.props.comment;
    if(newComment === undefined) {
      newComment = {};
      newComment.id = getUUID();
      newComment.parentId = this.props.postId;
    }

    newComment.timestamp = (new Date()).getTime();
    newComment.author = this.state.formAuthor;
    newComment.body = this.state.formBody;

    if(this.props.comment === undefined) {
      saveComment(newComment)
        .then((savedComment) => {
          this.afterSave(savedComment);
        })
    }else {
      updateComment(newComment)
        .then((savedComment) => {
          this.afterSave(savedComment);
        })
    }
  }
  afterSave = (newComment) => {
    this.setState(() => ({
      modalOpen: false,
      savingComment: false,
    }));
    this.props.dispatch(addComment({comment: newComment, postId: this.props.postId}));
    //this.props.dispatch(loadPost(this.props.postId));
    //this.props.dispatch(updateComment(this.props.postId, commentId));
  }
  render() {
    const {modalOpen, savingComment} = this.state;
    const {comment} = this.props;

    return (
      <div className='create-comment-wrapper'>
        {comment !== undefined
        ?<a
          href='javascript:void(0)'
          onClick={()=>this.handleModalOpen()}>
          edit
        </a>
        :<button
          onClick={()=>this.handleModalOpen()}
          className='leave-comment'>
          Leave a comment!
        </button>}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={()=>this.handleModalClose()}
          contentLabel='Modal'
        >
          <div>
            {savingComment === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form onSubmit={this.handleSubmitComment}>
                  <h3 className='sub-header'>
                    Add new comment
                  </h3>
                  <div className='comment-form'>
                    <input
                      className='comment-author-input'
                      type='text'
                      placeholder='Author'
                      value={this.state.formAuthor}
                      onChange={(event)=>this.handleChange({formAuthor: event.target.value})}
                      ref={(input) => this.author = input}
                    />
                    <textarea
                      rows="4"
                      cols="30"
                      className='comment-body-input'
                      placeholder='Insert your comment here'
                      value={this.state.formBody}
                      onChange={(event)=>this.handleChange({formBody: event.target.value})}
                      ref={(input) => this.commentBody = input}
                    />
                    <button type="submit" disabled={false || savingComment}>{/*TODO: disable submit if form is empty*/}
                      Submit
                    </button>
                  </div>
                </form>}
          </div>
        </Modal>
      </div>
    )
  }

}
export default connect()(CreateComment)