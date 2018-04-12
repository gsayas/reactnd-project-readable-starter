import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading'
import { connect } from 'react-redux';
import { saveComment, getUUID } from '../utils/PostsAPI';
import {fetchComments} from "../actions";

class CreateComment extends Component {
  state = {
    modalOpen: false,
    savingComment: false
  }
  toggleModalOpen = (isOpen) => {
    this.setState(() => ({
      modalOpen: isOpen,
    }))
  }
  saveComment = (e) => {
    // if (!this.input.value) {
    //   return
    // }
    //TODO: Validate form here

    e.preventDefault()

    this.setState(() => ({ savingComment: true }))
    console.log(this.commentBody.value);
    console.log(this.author.value);

    const comment = {
      id: getUUID(),
      timestamp: (new Date()).getTime(),
      author: this.author.value,
      body: this.commentBody.value,
      parentId: this.props.postId
    }

    saveComment(comment)
      .then(() => {
        this.setState(() => ({
          modalOpen: false,
          savingComment: false,
        }));
        this.props.dispatch(fetchComments(this.props.postId));
      })
  }
  render() {
    const {modalOpen, savingComment} = this.state;

    return (
      <div className='create-comment-wrapper'>
        <button
          onClick={()=>this.toggleModalOpen(true)}
          className='leave-comment'>
          Leave a comment!
        </button>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={()=>this.toggleModalOpen(false)}
          contentLabel='Modal'
        >
          <div>
            {savingComment === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form onSubmit={this.saveComment}>
                  <h3 className='sub-header'>
                    Add new comment
                  </h3>
                  <div className='comment-form'>
                    <input
                      className='comment-author-input'
                      type='text'
                      placeholder='Author'
                      ref={(input) => this.author = input}
                    />
                    <textarea
                      rows="4"
                      cols="30"
                      className='comment-body-input'
                      placeholder='Insert your comment here'
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