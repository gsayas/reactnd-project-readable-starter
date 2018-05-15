import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {asyncCastVoteOnPost, removePost, reportMessage} from "../actions/postsActions.js";
import EditPost from './EditPost.js';
import {deletePost} from "../utils/PostsAPI";
import CommentsIcon from 'react-icons/lib/fa/comments';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import {timeAgoFormat} from "../utils/helpers";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = (postId, vote) => {
    this.props.dispatch(asyncCastVoteOnPost({postId: postId, vote: vote}));
  };

  handleDelete = (postId) => {
    if(window.confirm('Are you sure to delete this post?')){
      deletePost(postId)
        .then(() => {
          this.props.dispatch(removePost({postId}));
          this.props.dispatch(reportMessage('Post Successfully deleted'));
        })
    }
  };

  render() {
    const {post, listing} = this.props;

    return (
      <div className="post">
        <div className='links'>
          <EditPost post={post}/>|
          <a href='javascript:void(0)' onClick={() => this.handleDelete(post.id)}>delete</a>
        </div>
        <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
        {!listing && <div className="post-body">{post.body}</div>}
        <div className="post-meta">
          <span className="author">by <strong>{post.author}</strong></span>
          <span className="post-timestamp">{timeAgoFormat(post.timestamp)} </span>
          <span className="category">in <strong>{post.category}</strong> </span>
          <span className="post-commentsCount"><CommentsIcon /> {post.commentCount} </span>
          <span className="votes-wrapper">
            <button onClick={() => this.handleVote(post.id, true)} className='up-vote'>
              <ThumbsUp />
            </button>
            <button onClick={() => this.handleVote(post.id, false)} className='down-vote'>
              <ThumbsDown />
            </button>
            {' ' + post.voteScore}
          </span>
        </div>
      </div>
    )
  }
}
export default connect()(Post);