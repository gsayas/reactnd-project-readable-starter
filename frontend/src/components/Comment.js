import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {asyncCastVoteOnComment, removeComment} from "../actions/commentsActions.js";
import {deleteComment} from '../utils/PostsAPI';
import EditComment from './EditComment.js';
import {timeAgoFormat} from "../utils/helpers";
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import {reportMessage} from "../actions/postsActions";


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
          this.props.dispatch(reportMessage('Comment successfully deleted'));
        })
    }
  };

  render() {
    const {comment} = this.props;
    // console.log(postId);

    return (
      <div className="comment">
        <div className='links'>
          <EditComment postId={comment.parentId} comment={comment}/>|
          <a href='javascript:void(0)' onClick={() => this.handleDelete(comment.parentId, comment.id)}>delete</a>
        </div>
        <div className="comment-body">{comment.body}</div>
        <div className="comment-meta">
          <span className="author">by <strong>{comment.author}</strong> </span>
          <span className="comment-timestamp">{timeAgoFormat(comment.timestamp)} </span>
          <span className="votes-wrapper">
            <button onClick={() => this.handleVote(comment.parentId, comment.id, true)} className='up-vote'>
              <ThumbsUp />
            </button>
            <button onClick={() => this.handleVote(comment.parentId, comment.id, false)} className='down-vote'>
              <ThumbsDown />
            </button>
            {' ' + comment.voteScore}
          </span>
        </div>
      </div>
    )
  }
}
export default connect()(Comment);