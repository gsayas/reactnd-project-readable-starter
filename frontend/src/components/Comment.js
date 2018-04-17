import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {asyncCastVoteOnComment} from "../actions";
import {Link} from 'react-router-dom';
import CreateComment from './CreateComment.js';


class Comment extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = (parentId, commentId, vote) => {
    this.props.dispatch(asyncCastVoteOnComment({postId: parentId, commentId: commentId, vote: vote}));
  };

  render() {
    const {comment, postId} = this.props;

    return (
      <div className="comment">
        <div className='links'>
          <CreateComment postId={postId} comment={comment}/>|
          <Link to={'/delete/' + postId}>delete</Link>
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