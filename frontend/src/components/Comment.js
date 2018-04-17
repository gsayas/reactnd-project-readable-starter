import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {asyncCastVoteOnComment, removeComment} from "../actions";
import {deleteComment} from '../utils/PostsAPI';
import CreateComment from './CreateComment.js';


class Comment extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = (parentId, commentId, vote) => {
    this.props.dispatch(asyncCastVoteOnComment({postId: parentId, commentId: commentId, vote: vote}));
  };

  handleDelete = (postId, commentId) => {
    if(window.confirm('Are you sure to delete this comment?')){
      deleteComment(commentId)
        .then(() => {
          this.props.dispatch(removeComment({postId, commentId}));
        })
    }
  };

  render() {
    const {comment, postId} = this.props;

    return (
      <div className="comment">
        <div className='links'>
          <CreateComment postId={postId} comment={comment}/>|
          <a href='javascript:void(0)' onClick={() => this.handleDelete(comment.parentId, comment.id)}>delete</a>
        </div>
        <div className="author">{comment.author}</div>
        <div className="comment-body">{comment.body}</div>
        <div className="votes-wrapper">
          <span className="vote-count">Votes: {comment.voteScore}</span>
          <button onClick={() => this.handleVote(comment.parentId, comment.id, true)} className='up-vote'>
            +
          </button>
          <button onClick={() => this.handleVote(comment.parentId, comment.id, false)} className='down-vote'>
            -
          </button>
        </div>
        <div className="comment-timestamp">{(new Date(comment.timestamp)).toDateString()}</div>
      </div>
    )
  }
}
export default connect()(Comment);