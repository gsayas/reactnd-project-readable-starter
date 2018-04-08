import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {asyncCastVoteOnComment} from "../actions";


class Comment extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = (parentId, commentId, vote) => {
    console.log(commentId);
    this.props.dispatch(asyncCastVoteOnComment({postId: parentId, commentId: commentId, vote: vote}));
  };

  render() {
    const {comment} = this.props;
    // console.log('rendering comment');

    return (
      <div className="comment">
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