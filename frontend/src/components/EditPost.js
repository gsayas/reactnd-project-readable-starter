import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updatePost} from '../utils/PostsAPI';
import {editPost} from "../actions/postsActions.js";
import PostModal from "./PostModal.js";
import {reportMessage} from "../actions/postsActions";

class EditPost extends Component {

  onModalSubmit = (modalData) => {

    let postUpdater = {};
    postUpdater.id = this.props.post.id;
    postUpdater.timestamp = (new Date()).getTime();
    postUpdater.body = modalData.body;
    postUpdater.title = modalData.title;
    postUpdater.category = modalData.category;

    updatePost(postUpdater)
      .then(() => {
        this.modal.handleModalClose();
        this.props.dispatch(editPost({post: postUpdater}));
        this.props.dispatch(reportMessage('Post successfully edited'));
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
          entity={post}
          title='Edit Post'
          isEditMode={true}
        />
      </div>
    )
  }

}
export default connect()(EditPost)