import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updatePost} from '../utils/PostsAPI';
import {editPost} from "../actions";
import PostModal from "./PostModal";

class EditPost extends Component {

  onModalSubmit = (modalData) => {

    let updatedPost = this.props.post;
    updatedPost.timestamp = (new Date()).getTime();
    updatedPost.author = modalData.formAuthor;
    updatedPost.body = modalData.formBody;
    updatedPost.title = modalData.formTitle;

    updatePost(updatedPost)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editPost({post: updatedPost}));
      })
  }

  render() {
    const {post} = this.props;

    return (
      <div className='edit-post-wrapper'>
        <a
          href='javascript:void(0)'
          onClick={()=>this.modal.handleModalOpen()}>
          edit
        </a>
        <PostModal
          onModalSubmit={(modalData)=>this.onModalSubmit(modalData)}
          onRef={ref => {this.modal = ref}}
          post={post}
          title='Edit Post'
          isEditMode={true}
        />
      </div>
    )
  }

}
export default connect()(EditPost)