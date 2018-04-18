import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading'
import {connect} from 'react-redux';
import {saveComment, getUUID} from '../utils/PostsAPI';
import {addComment} from "../actions";

class CreateComment extends Component {
  state = {
    modalOpen: false,
    savingComment: false,
    formBody: '',
    formAuthor: '',
    formPristine: true
  }
  handleModalOpen = () => {
    this.setState(() => ({
      modalOpen: true,
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

    let newComment = {};
    newComment.id = getUUID();
    newComment.parentId = this.props.postId;
    newComment.timestamp = (new Date()).getTime();
    newComment.author = this.state.formAuthor;
    newComment.body = this.state.formBody;

    saveComment(newComment)
      .then((savedComment) => {
        this.setState(() => ({
          modalOpen: false,
          savingComment: false,
        }));
        this.props.dispatch(addComment({comment: savedComment, postId: this.props.postId}));
      })

  }
  render() {
    const {modalOpen, savingComment} = this.state;
    const {comment} = this.props;

    return (
      <div className='create-comment-wrapper'>
        <button
          onClick={()=>this.handleModalOpen()}
          className='leave-comment'>
          Leave a comment!
        </button>
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
                    {comment === undefined
                      ?<input
                        className='comment-author-input'
                        type='text'
                        placeholder='Author'
                        value={this.state.formAuthor}
                        onChange={(event)=>this.handleChange({formAuthor: event.target.value})}
                      />:''}
                      <textarea
                        rows="4"
                        cols="30"
                        className='comment-body-input'
                        placeholder='Insert your comment here'
                        value={this.state.formBody}
                        onChange={(event)=>this.handleChange({formBody: event.target.value})}
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